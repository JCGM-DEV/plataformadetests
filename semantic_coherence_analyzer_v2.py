#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Enhanced Semantic Coherence Analyzer - V2
Detecta preguntas con opciones verdaderamente incongruentes usando categorización temática
"""

import json
import re
from collections import defaultdict

# Diccionario de dominios temáticos para cada sujeto/tema
DOMAIN_KEYWORDS = {
    'sistemas_informaticos': {
        'arquitectura': ['von neumann', 'harvard', 'cisc', 'risc', 'x86', 'arm', 'cpu', 'memoria'],
        'redes': ['osi', 'tcp/ip', 'dhcp', 'dns', 'arp', 'icmp', 'ftp', 'http', 'smtp', 'ip', 'mac', 'puerto', 'protocolo'],
        'sistemas': ['unix', 'linux', 'windows', 'kernel', 'proceso', 'thread', 'syscall'],
    },
    'bases_de_datos': {
        'sql': ['select', 'insert', 'delete', 'where', 'join', 'group', 'order', 'query'],
        'normalizacion': ['primera', 'segunda', 'tercera', 'boyce', 'codd', 'clave', 'dependencia'],
        'transacciones': ['acid', 'atomicidad', 'consistencia', 'aislamiento', 'durabilidad', 'transaccion'],
        'conceptos': ['tabla', 'registro', 'campo', 'clave', 'relacion', 'esquema', 'índice'],
    },
    'programacion': {
        'lenguajes': ['java', 'python', 'c', 'cpp', 'javascript', 'php', 'ruby'],
        'oop': ['clase', 'objeto', 'herencia', 'polimorfismo', 'encapsulacion', 'interfaz'],
        'control': ['if', 'for', 'while', 'switch', 'case', 'bucle', 'condición'],
        'datos': ['array', 'lista', 'pila', 'cola', 'arbol', 'grafo', 'estructura', 'tipo'],
    },
    'lenguaje_de_marcas': {
        'html': ['html', 'tags', 'elemento', 'atributo', 'div', 'span', 'body', 'head', 'meta'],
        'xml': ['xml', 'dtd', 'schema', 'xsd', 'validacion', 'elemento', 'atributo'],
        'css': ['css', 'selector', 'propiedad', 'clase', 'id', 'estilos', 'color', 'tamaño'],
        'web': ['navegador', 'cliente', 'servidor', 'request', 'response', 'http'],
    },
    'entornos_de_desarrollo': {
        'git': ['git', 'commit', 'push', 'pull', 'merge', 'branch', 'repositorio', 'github'],
        'ide': ['ide', 'editor', 'compilador', 'depuracion', 'visual studio', 'eclipse', 'maven'],
        'testing': ['test', 'unittest', 'pytest', 'mock', 'cobertura', 'assert'],
        'devops': ['docker', 'jenkins', 'ci/cd', 'contenedor', 'despliegue', 'pipeline'],
    },
    'cloud_computing': {
        'cloud': ['cloud', 'nube', 'aws', 'azure', 'gcp', 'iaas', 'paas', 'saas'],
        'virtualizacion': ['virtualizacion', 'maquina virtual', 'hipervisor', 'contenedor'],
        'infraestructura': ['instancia', 'servidor', 'almacenamiento', 's3', 'ec2'],
    },
    'empleabilidad': {
        'soft_skills': ['liderazgo', 'comunicacion', 'trabajo', 'equipo', 'resolucion', 'conflicto'],
        'profesional': ['cv', 'linkedin', 'entrevista', 'negociacion', 'carrera', 'profesional'],
        'desarrollo': ['aprendizaje', 'formacion', 'certificacion', 'skill', 'competencia'],
    }
}

# Mapeo inverso: palabra -> categorías
KEYWORD_TO_CATEGORY = {}
for subject, categories in DOMAIN_KEYWORDS.items():
    for category, keywords in categories.items():
        for keyword in keywords:
            if keyword not in KEYWORD_TO_CATEGORY:
                KEYWORD_TO_CATEGORY[keyword] = set()
            KEYWORD_TO_CATEGORY[keyword].add((subject, category))

def extract_domain_categories(text):
    """Extrae las categorías temáticas de un texto"""
    text_lower = text.lower()
    categories = set()
    
    for keyword, cats in KEYWORD_TO_CATEGORY.items():
        if keyword in text_lower:
            categories.update(cats)
    
    return categories

def check_option_incoherence(question, options, subject_id):
    """
    Detecta si una opción es incoherente con la pregunta
    Retorna: (is_incoherent, details)
    """
    question_categories = extract_domain_categories(question)
    
    # Si no detectamos categorías, lo consideramos coherente (default)
    if not question_categories:
        return False, "No se pudo determinar contexto temático"
    
    # Revisar cada opción
    option_categories_list = []
    for i, option in enumerate(options):
        opt_cats = extract_domain_categories(option)
        option_categories_list.append((i, opt_cats))
    
    # Detectar si una opción está completamente fuera del contexto
    issues = []
    
    for opt_idx, opt_cats in option_categories_list:
        # Si la opción tiene categorías pero ninguna coincide con la pregunta
        if opt_cats and not (opt_cats & question_categories):
            # Podría ser incoherente
            issues.append({
                'option': opt_idx,
                'text': options[opt_idx],
                'reason': 'Diferente contexto temático',
                'question_domains': list(question_categories),
                'option_domains': list(opt_cats)
            })
    
    # Si hay opciones de contextos MUY diferentes, es incoherente
    if len(issues) > 0 and len(issues) >= len(options) * 0.75:
        return True, {
            'type': 'Opciones de contextos diferentes',
            'details': issues
        }
    
    # Si no hay problemas detectados
    if not issues:
        return False, "Paso prueba de coherencia temática"
    
    return False, "Posible inconsistencia (revisar)"

def main():
    with open('data/test_bank.json', 'r', encoding='utf-8') as f:
        test_bank = json.load(f)
    
    incoherent_questions = defaultdict(list)
    flagged_count = 0
    
    print("🔍 ANÁLISIS MEJORADO DE COHERENCIA TEMÁTICA")
    print("=" * 80)
    
    for subject_id, questions in test_bank.items():
        print(f"\n📚 {subject_id.upper()}")
        print("-" * 80)
        
        subject_flagged = 0
        
        for idx, q_data in enumerate(questions):
            question = q_data.get('question', '')
            options = q_data.get('options', [])
            
            is_incoherent, details = check_option_incoherence(question, options, subject_id)
            
            if is_incoherent:
                subject_flagged += 1
                flagged_count += 1
                incoherent_questions[subject_id].append({
                    'index': idx,
                    'question': question,
                    'options': options,
                    'correct': q_data.get('correct', -1),
                    'details': details
                })
        
        print(f"Preguntas con posibles incoherencias: {subject_flagged}/{len(questions)}")
    
    # Resumen
    print("\n" + "=" * 80)
    print("📊 RESUMEN")
    print("=" * 80)
    
    total = sum(len(q) for q in test_bank.values())
    print(f"Total preguntas: {total}")
    print(f"Preguntas flaggeadas: {flagged_count}")
    print(f"Porcentaje: {(flagged_count/total)*100:.2f}%")
    
    # Mostrar ejemplos
    print("\n" + "=" * 80)
    print("🚨 EJEMPLOS D INCOHERENCIAS DETECTADAS")
    print("=" * 80)
    
    for subject_id, items in incoherent_questions.items():
        if items:
            print(f"\n📚 {subject_id}")
            for item in items[:5]:
                print(f"\n  Pregunta #{item['index']}")
                print(f"  Q: {item['question']}")
                for i, opt in enumerate(item['options']):
                    mark = " ✓" if i == item['correct'] else ""
                    print(f"  [{i}] {opt}{mark}")
                print(f"  Issue: {item['details']}")
    
    # Guardar reporte
    report = {
        'summary': {
            'total_questions': total,
            'flagged_count': flagged_count,
            'percentage': (flagged_count/total)*100
        },
        'by_subject': {
            subject: {
                'Total': len(test_bank[subject]),
                'Flagged': len(items),
                'Examples': items[:10]
            }
            for subject, items in incoherent_questions.items() if items
        }
    }
    
    with open('COHERENCIA_REPORT_V2.json', 'w', encoding='utf-8') as f:
        json.dump(report, f, ensure_ascii=False, indent=2)
    
    print(f"\n✅ Reporte detallado guardado: COHERENCIA_REPORT_V2.json")

if __name__ == '__main__':
    main()
