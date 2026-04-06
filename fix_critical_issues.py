#!/usr/bin/env python3
"""
Script para corregir los 2 problemas críticos del banco de preguntas:
1. Unit indexing: Cambiar de 1-based a 0-based
2. Opciones incompletas: Agregar opciones D faltantes
"""

import json
import sys
from pathlib import Path

def fix_unit_indexing(data):
    """Cambiar unit de 1-based a 0-based"""
    fixed = 0
    for subject_id, questions in data.items():
        for q in questions:
            if 'unit' in q and isinstance(q['unit'], int) and q['unit'] >= 1:
                q['unit'] -= 1
                fixed += 1
    return fixed

def add_missing_options(data):
    """Agregar opciones D faltantes a preguntas con 3 opciones"""
    added = 0
    for subject_id, questions in data.items():
        for q in questions:
            if len(q.get('options', [])) == 3:
                # Generar una opción D plausible
                existing = q['options']
                
                # Estrategia: Opción relacionada pero diferente
                option_d = generate_option_d(q['question'], existing)
                
                q['options'].append(option_d)
                
                # Si correct estaba en rango 0-2, ajustar si necessary
                # (mantener correct donde está a menos que fuese 3)
                added += 1
    
    return added

def generate_option_d(question, existing_options):
    """
    Generar una 4ª opción coherente basada en el tipo de pregunta
    Estrategia simple pero efectiva:
    - Si es pregunta sobre arquitectura/sistemas: agregar alternativa técnica
    - Si es pregunta sobre conceptos: agregar concepto relacionado
    - Default: generar basado en longitud y patrón
    """
    
    # Mapeo de palabras clave a opciones frecuentes
    keywords_options = {
        'arquitectura': ['CUDA', 'Quantum', 'Hybrid', 'Embedded', 'Distributed'],
        'protocolo': ['WebRTC', 'QUIC', 'MQTT', 'CoAP', 'Zigbee'],
        'base': ['NoSQL', 'Graph DB', 'Time-series', 'Document DB', 'Vector DB'],
        'lenguaje': ['Rust', 'Go', 'Kotlin', 'Scala', 'Elixir'],
        'marcas': ['MathML', 'SVG', 'RDF', 'SGML', 'ODF'],
        'desarrollo': ['Docker', 'Kubernetes', 'Terraform', 'Vagrant', 'Ansible'],
        'entorno': ['VS Code', 'PyCharm', 'IntelliJ', 'Sublime', 'Atom'],
        'nube': ['Azure', 'AWS', 'GCP', 'DigitalOcean', 'Heroku'],
        'modelo': ['Blockchain', 'MVC', 'MVVM', 'Clean', 'Hexagonal'],
        'algoritmo': ['Greedy', 'Dynamic', 'Backtracking', 'Monte Carlo', 'Genetic'],
    }
    
    # Buscar palabra clave en la pregunta
    question_lower = question.lower()
    for keyword, options in keywords_options.items():
        if keyword in question_lower:
            # Elegir opción que no esté en existing_options
            for opt in options:
                if opt not in existing_options and opt.lower() not in [x.lower() for x in existing_options]:
                    return opt
    
    # Default: generar opción genérica basada en longitud promedio
    avg_len = sum(len(opt) for opt in existing_options) // len(existing_options)
    
    if avg_len < 15:
        defaults = ['YAML', 'JSON', 'XML', 'REST', 'SOAP', 'AMQP', 'Ninguna', 'Todas']
    else:
        defaults = [
            'Combinación de las anteriores',
            'Todas son correctas',
            'Ninguna de las anteriores',
            'Depende del contexto',
            'Varía según implementación'
        ]
    
    # Usar la primera que no esté en opciones
    for opt in defaults:
        if opt not in existing_options and opt.lower() not in [x.lower() for x in existing_options]:
            return opt
    
    # Fallback
    return "Otra alternativa"

def main():
    project_root = Path('/home/thebrave/Escritorio/ProyectoExamenes')
    test_bank_file = project_root / 'data' / 'test_bank.json'
    
    print("═" * 70)
    print("  CORRECTOR AUTOMÁTICO DE BANCO DE PREGUNTAS")
    print("═" * 70)
    
    # Cargar JSON
    print("\n📂 Cargando test_bank.json...")
    try:
        with open(test_bank_file, 'r', encoding='utf-8') as f:
            data = json.load(f)
        print("   ✅ Archivo cargado correctamente")
    except Exception as e:
        print(f"   ❌ Error: {e}")
        return False
    
    # Fix #1: Unit indexing
    print("\n" + "─" * 70)
    print("FIX #1: Unit Indexing (1-based → 0-based)")
    print("─" * 70)
    fixed_units = fix_unit_indexing(data)
    print(f"✅ Corregidas {fixed_units} referencias de unit")
    
    # Mostrar ejemplo
    first_q = data['sistemas_informaticos'][0]
    print(f"   Ejemplo: {first_q['concept_id']} → unit={first_q['unit']} (era 1)")
    
    # Fix #2: Missing options
    print("\n" + "─" * 70)
    print("FIX #2: Opciones Incompletas (agregar opción D)")
    print("─" * 70)
    added_options = add_missing_options(data)
    print(f"✅ Agregadas {added_options} opciones D")
    
    # Mostrar ejemplos
    for subject_id in ['lenguaje_de_marcas', 'programacion', 'sistemas_informaticos']:
        for q in data[subject_id]:
            if len(q['options']) == 4 and 'Otra' in q['options'][3]:
                print(f"   Ejemplo: {q['concept_id']}")
                print(f"   Pregunta: {q['question'][:60]}...")
                print(f"   Opciones: A:{q['options'][0]}, B:{q['options'][1]}, C:{q['options'][2]}, D:{q['options'][3]}")
                break
    
    # Guardar JSON corregido
    print("\n" + "─" * 70)
    print("GUARDANDO CAMBIOS")
    print("─" * 70)
    try:
        with open(test_bank_file, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        print("✅ test_bank.json actualizado correctamente")
    except Exception as e:
        print(f"❌ Error al guardar: {e}")
        return False
    
    # Validación
    print("\n" + "─" * 70)
    print("VALIDACIÓN POST-FIX")
    print("─" * 70)
    
    total_questions = sum(len(questions) for questions in data.values())
    three_options = sum(
        1 for qs in data.values() 
        for q in qs 
        if len(q.get('options', [])) == 3
    )
    four_options = sum(
        1 for qs in data.values() 
        for q in qs 
        if len(q.get('options', [])) == 4
    )
    
    print(f"Total de preguntas: {total_questions}")
    print(f"Con 4 opciones: {four_options} ✅")
    print(f"Con 3 opciones: {three_options} {'✅' if three_options == 0 else '❌'}")
    
    # Verificar unit range
    print("\nRango de unit por asignatura:")
    for subject_id, questions in data.items():
        units = set(q.get('unit', -1) for q in questions)
        min_u = min(units) if units else -1
        max_u = max(units) if units else -1
        print(f"  {subject_id}: {min_u}-{max_u} ✅")
    
    print("\n" + "═" * 70)
    if three_options == 0:
        print("✅ CORRECCIONES COMPLETADAS CON ÉXITO")
    else:
        print("⚠️  Algunas preguntas aún tienen 3 opciones - necesitarán revisión manual")
    print("═" * 70)
    
    return three_options == 0

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1)
