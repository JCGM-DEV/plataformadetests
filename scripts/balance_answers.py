#!/usr/bin/env python3
"""
balance_answers.py — Equilibra las longitudes de respuestas en bancos de tests.

PROBLEMA: La respuesta correcta siempre es la mas larga (87% de 2054 preguntas).

ESTRATEGIA COMBINADA (por orden de preferencia):
  1. Acortar la correcta si encuentra un punto de corte semantico claro.
  2. Alargar las incorrectas con frases neutras y plausibles que no delatan su falsedad.

TARGET: que la correcta no sea la mas larga.
"""

import re, glob, shutil, os
from pathlib import Path

# ── Parametros ──
TRIGGER_RATIO = 1.3   # Actuar si correcta > max_incorrecta * TRIGGER_RATIO
TARGET_AFTER  = 1.05  # Objetivo tras editar: correcta <= max_incorrecta * TARGET_AFTER
MIN_CORRECT   = 55    # La correcta nunca queda <55 chars
MIN_FRAC_KEEP = 0.30  # Conservar al menos 30% del original
BACKUP_SUFFIX = ".bak"

# ── Patrones para acortar la correcta ──
# (patron_regex, modo):
#   'sub' → eliminar el texto que matchea
#   'cut' → cortar desde la posicion del match
CUT_PATTERNS = [
    # Eliminar ejemplos parentizados
    (r'\s*\(ej[.:][^)]{0,300}\)',            'sub'),
    (r"\s*\(ej[:\.][^']{0,300}\)",           'sub'),
    (r'\s*\(por ejemplo[^)]{0,300}\)',        'sub'),
    (r'\s*\(ejemplo[^)]{0,300}\)',            'sub'),
    (r'\s*\(habitualmente[^)]{0,150}\)',      'sub'),
    (r"\s*\(habitualmente\s+\w[^']{0,100}\)", 'sub'),
    # Inciso de consecuencia tras punto y coma
    (r';\s*si\s+(?:la\s+TIR|el\s+VAN|tu\s|su\s|VAN\b|TIR\b|CAC\b|LTV\b)', 'cut'),
    (r';\s*si\s+\w+\s+(?:es|está|son)\b',    'cut'),
    (r';\s*a\s+partir\s+de\b',               'cut'),
    (r';\s*cuanto\s+m[aá]s\b',               'cut'),
    (r';\s*a\s+diferencia\b',                'cut'),
    (r';\s*no\s+reserva\b',                  'cut'),
    (r';\s*es\s+el\s+indicador\b',           'cut'),
    (r';\s*es\s+uno\s+de\b',                 'cut'),
    (r';\s*permite\b',                       'cut'),
    (r';\s*proporciona\b',                   'cut'),
    (r';\s*buscan\b',                        'cut'),
    (r';\s*abre\b',                          'cut'),
    (r';\s*conserva\b',                      'cut'),
    (r';\s*crea\b',                          'cut'),
    (r';\s*aporta\b',                        'cut'),
    (r';\s*demuestra\b',                     'cut'),
    (r';\s*evita\b',                         'cut'),
    (r';\s*asegura\b',                       'cut'),
    (r';\s*previene\b',                      'cut'),
    (r';\s*otorgando\b',                     'cut'),
    (r';\s*no\s+se\b',                       'cut'),
    (r';\s*lo\s+que\b',                      'cut'),
    (r';\s*donde\b',                         'cut'),
    (r';\s*al\s+cumplir\b',                  'cut'),
    (r';\s*\w+\s+el\s+\d+%',                'cut'),
    # Gerundios/relativos al final precedidos de coma
    (r',\s+donde\s+',                        'cut'),
    (r',\s+permitiendo\s+',                  'cut'),
    (r',\s+otorgando\s+al\b',               'cut'),
    (r',\s+sirviendo\s+como\b',             'cut'),
    (r',\s+siendo\s+',                       'cut'),
    (r',\s+asumiendo\s+la\b',              'cut'),
    # Enumeracion o definicion tras dos puntos (solo cuando la parte anterior ya tiene >70 chars)
    (r':\s+\d+\.\s+\w',                     'cut'),
    (r'(?<=.{70}):\s+[\'\']\w',             'cut'),  # '...: 'Term' ...
    (r'(?<=.{70}):\s+\w{3,15}(?:\s+y\s+|\s+de\s+|\s+del\s+)', 'cut'),
    # Segundo "que" muy explicativo
    (r'\s+que\s+los\s+(?:emprendedores|fundadores|inversores|candidatos|reclutadores|evaluadores)\b', 'cut'),
    (r'\s+para\s+que\s+quien\b',            'cut'),
]

# ── Coletillas neutras para alargar incorrectas ──
# Se eligen segun el inicio de la respuesta incorrecta.
# IMPORTANTE: las coletillas deben sonar plausibles (no delatar que son incorrectas).
PADDING_RULES = [
    # Frases que empiezan con negacion → darles un giro neutral
    (r'^No\s+hay\b',      ', aunque algunos enfoques establecen matices al respecto'),
    (r'^No\s+existe\b',   ', si bien existen aproximaciones relacionadas'),
    (r'^No\s+tiene\b',    ', aunque en otros contextos puede tener cierta relevancia'),
    (r'^Nunca\s+',        ', salvo en situaciones muy especificas del sector'),
    # Respuestas muy cortas tipo "El X" / "La X" / "Un X" / "Una X"
    (r'^(?:El|La)\s+(?:precio|coste|valor|tipo|nivel|sueldo|dia|hora|pago)\b',
     ', que puede confundirse con este termino en contabilidad general'),
    (r'^(?:El|La)\s+(?:dia|hora|periodo|plazo|tiempo|fecha)\b',
     ', aunque este indicador se calcula de forma diferente'),
    (r'^(?:El|La|Los|Las)\s+\w+\s+de\b',
     ', concepto que se aplica en un contexto distinto'),
    (r'^(?:Un|Una)\s+(?:impuesto|contrato|prestamo|seguro|recibo|folleto|hoja|cartel)\b',
     ', que pertenece a un ambito distinto del aqui estudiado'),
    (r'^(?:Un|Una)\s+(?:software|programa|sistema|aplicacion)\b',
     ', que aunque es una herramienta util, no corresponde a esta definicion'),
    (r'^(?:Un|Una)\s+\w+$',
     ', concepto que no se corresponde con la definicion correcta'),
    # Plurales/conjuntos: "Los X, Y y Z"
    (r'^(?:Los|Las)\s+(?:\w+\s*,\s*){2}',
     ', aunque pueden confundirse con los componentes reales del concepto'),
    # Acciones o verbos en infinitivo
    (r'^(?:Apostar|Montar|Comprar|Vender|Pedir|Enviar|Esperar|Presentarse|Salir|Instalar|Hacer|Decir|Cobrar)\b',
     ' es una accion que no define correctamente este concepto'),
    # Frases que son nombres de herramientas o matrices
    (r'^Matriz\s+\w',    ', herramienta distinta a la que se pregunta'),
    (r'^Analisis\s+',    ', metodologia diferente a la descrita'),
    # Sintagmas que expresan equivalencias erroneas
    (r'^Son\s+sinonimos\b', ', aunque en la practica presentan diferencias clave'),
    # Generico de ultimo recurso
    (r'.+',              ', concepto diferente al que se describe en esta pregunta'),
]


def try_shorten(text, target_max):
    """Acortar text usando patrones semanticos hasta target_max. Devuelve texto acortado o None."""
    if len(text) <= target_max:
        return None  # No hace falta acortar

    min_len = max(int(len(text) * MIN_FRAC_KEEP), MIN_CORRECT)
    best = None  # mejor candidata (puede superar target_max)

    for pattern, mode in CUT_PATTERNS:
        if mode == 'sub':
            candidate = re.sub(pattern, '', text, flags=re.IGNORECASE).strip()
            candidate = re.sub(r'\s{2,}', ' ', candidate).rstrip(',;:')
        else:  # cut
            m = re.search(pattern, text, re.IGNORECASE)
            if not m:
                continue
            cut_pos = m.start()
            if cut_pos < min_len:
                continue
            candidate = text[:cut_pos].strip().rstrip(',;:')

        clen = len(candidate)
        if clen < MIN_CORRECT:
            continue

        if clen <= target_max:
            return candidate  # Objetivo alcanzado

        if best is None or clen < len(best):
            best = candidate  # Mejor candidata aunque supere target

    # Intentar corte en separador dentro de target_max sobre la mejor candidata
    if best and len(best) > target_max:
        for sep in ['; ', '. ', ', ']:
            idx = best.rfind(sep, 0, target_max + 20)
            if idx >= MIN_CORRECT:
                cand2 = best[:idx].strip().rstrip(',;:')
                if len(cand2) >= MIN_CORRECT:
                    return cand2

    return best  # None si no encontramos nada


def try_pad(text, target_min):
    """Alargar text con una coletilla neutra hasta aprox target_min."""
    if len(text) >= target_min:
        return None

    for pattern, suffix in PADDING_RULES:
        if re.match(pattern, text, re.IGNORECASE):
            candidate = text + suffix
            if len(candidate) > len(text):
                return candidate

    return text + ', concepto diferente al que se describe en esta pregunta'


def process_question_block(q_str):
    opts_match = re.search(r'(options:\s*\[)(.*?)(\])', q_str, re.DOTALL)
    correct_match = re.search(r'correct:\s*(\d+)', q_str)
    if not opts_match or not correct_match:
        return q_str, False

    opts_raw = opts_match.group(2)
    correct_idx = int(correct_match.group(1))

    str_re = re.compile(r'"((?:[^"\\]|\\.)*)"')
    matches = list(str_re.finditer(opts_raw))

    if correct_idx >= len(matches):
        return q_str, False

    strings = [m.group(1) for m in matches]
    correct_len = len(strings[correct_idx])
    others_lens = [len(s) for i, s in enumerate(strings) if i != correct_idx]
    if not others_lens:
        return q_str, False

    max_other = max(others_lens)

    if correct_len <= max_other * TRIGGER_RATIO:
        return q_str, False  # Desequilibrio aceptable

    new_strings = list(strings)
    modified = False

    # 1. Intentar acortar la correcta
    target_max = max(int(max_other * TARGET_AFTER), MIN_CORRECT)
    shortened = try_shorten(strings[correct_idx], target_max)
    if shortened and shortened != strings[correct_idx]:
        new_strings[correct_idx] = shortened
        modified = True

    # 2. Alargar incorrectas muy cortas para equilibrar
    new_correct_len = len(new_strings[correct_idx])
    target_min_incor = int(new_correct_len * 0.72)


    for i in range(len(new_strings)):
        if i == correct_idx:
            continue
        if len(new_strings[i]) < target_min_incor:
            padded = try_pad(new_strings[i], target_min_incor)
            if padded and padded != new_strings[i]:
                new_strings[i] = padded
                modified = True

    if not modified:
        return q_str, False

    # Reconstruir options usando start(0)/end(0) con offset acumulado
    result = opts_raw
    offset = 0
    for i, (m, new_s) in enumerate(zip(matches, new_strings)):
        if new_s == strings[i]:
            continue
        repl = '"' + new_s + '"'
        s = m.start(0) + offset
        e = m.end(0) + offset
        result = result[:s] + repl + result[e:]
        offset += len(repl) - (e - s)

    new_q = q_str[:opts_match.start(2)] + result + q_str[opts_match.end(2):]
    return new_q, True


def _show_diff(old_q, new_q):
    for label, q in [('ANTES ', old_q), ('DESPUES', new_q)]:
        opts_m = re.search(r'options:\s*\[(.*?)\]', q, re.DOTALL)
        if not opts_m:
            continue
        strs = re.findall(r'"((?:[^"\\]|\\.)*)"', opts_m.group(1))
        cidx_m = re.search(r'correct:\s*(\d+)', q)
        cidx = int(cidx_m.group(1)) if cidx_m else -1
        print(f"\n  {label}:")
        for i, s in enumerate(strs):
            mark = '✓' if i == cidx else ' '
            print(f"    [{mark}]({len(s):3d}ch) {s[:95]}")


def process_file(filepath, dry_run=False, verbose=False):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    block_re = re.compile(r'\{[^{}]*?concept_id[^{}]*?\}', re.DOTALL)
    blocks = list(block_re.finditer(content))
    total_count = len(blocks)
    modified_count = 0
    changes = []

    for m in blocks:
        q_str = m.group(0)
        new_q, was_modified = process_question_block(q_str)
        if was_modified:
            modified_count += 1
            changes.append((m.start(), m.end(), new_q))
            if verbose:
                _show_diff(q_str, new_q)

    new_content = content
    for start, end, repl in reversed(changes):
        new_content = new_content[:start] + repl + new_content[end:]

    if not dry_run and changes:
        bp = filepath + BACKUP_SUFFIX
        if not os.path.exists(bp):
            shutil.copy2(filepath, bp)
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)

    return {'total': total_count, 'modified': modified_count}


def audit_lengths(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    block_re = re.compile(r'\{[^{}]*?concept_id[^{}]*?\}', re.DOTALL)
    total = correct_longer = still_2x = 0

    for m in block_re.finditer(content):
        q_str = m.group(0)
        opts_m = re.search(r'options:\s*\[(.*?)\]', q_str, re.DOTALL)
        cor_m  = re.search(r'correct:\s*(\d+)', q_str)
        if not opts_m or not cor_m:
            continue
        strs = re.findall(r'"((?:[^"\\]|\\.)*)"', opts_m.group(1))
        cidx = int(cor_m.group(1))
        if cidx >= len(strs):
            continue
        total += 1
        clen = len(strs[cidx])
        others = [len(s) for i, s in enumerate(strs) if i != cidx]
        if others:
            mx = max(others)
            if clen > mx:      correct_longer += 1
            if clen > mx * 2:  still_2x       += 1

    return {'total': total, 'correct_longer': correct_longer, 'still_2x': still_2x,
            'pct':   100 * correct_longer / total if total else 0,
            'pct_2x': 100 * still_2x / total if total else 0}


def main():
    import argparse
    p = argparse.ArgumentParser(description='Equilibra longitudes de respuestas en bancos de tests')
    p.add_argument('--dry-run', action='store_true', help='No guardar cambios')
    p.add_argument('--verbose', '-v', action='store_true', help='Mostrar cada cambio')
    p.add_argument('--files', nargs='*', default=None, help='Archivos a procesar')
    args = p.parse_args()

    files = args.files or sorted(glob.glob('data/test_bank_*.js'))
    tag = '[DRY RUN] ' if args.dry_run else ''
    print(f"{tag}Procesando {len(files)} archivos...\n")

    grand_total = grand_modified = 0
    for filepath in files:
        if args.verbose:
            print(f"\n{'─'*62}\n  {Path(filepath).name}\n{'─'*62}")
        stats = process_file(filepath, dry_run=args.dry_run, verbose=args.verbose)
        grand_total    += stats['total']
        grand_modified += stats['modified']
        print(f"  {Path(filepath).name}: {stats['modified']}/{stats['total']} modificadas")

    print(f"\n{'='*62}")
    print(f"TOTAL: {grand_modified}/{grand_total} modificadas ({100*grand_modified/grand_total:.1f}%)")

    print("\nAuditando resultado...")
    tr = lr = r2x = 0
    for filepath in files:
        a = audit_lengths(filepath)
        tr  += a['total'];  lr  += a['correct_longer'];  r2x += a['still_2x']

    pct   = 100 * lr  / tr if tr else 0
    pct2x = 100 * r2x / tr if tr else 0
    print(f"  Correcta mas larga (>1x max_incorrecta): {lr}/{tr}  ({pct:.1f}%)")
    print(f"  Correcta aun 2x o mas larga:             {r2x}/{tr}  ({pct2x:.1f}%)")
    if not args.dry_run:
        print(f"\n  ANTES: 87.2% → AHORA: {pct:.1f}%")


if __name__ == '__main__':
    main()
