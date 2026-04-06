#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Semantic Coherence Analyzer para ProyectoExamenes
Detecta preguntas cuyas opciones no son coherentes temáticamente
"""

import json
import re
from collections import defaultdict
from difflib import SequenceMatcher

def extract_keywords(text):
    """Extrae palabras clave de un texto"""
    # Convertir a minúsculas
    text = text.lower()
    
    # Remover puntuación
    text = re.sub(r'[^\w\s]', ' ', text)
    
    # Palabras comunes a ignorar
    stopwords = {
        'el', 'la', 'de', 'que', 'y', 'a', 'en', 'se', 'qué', 'es', 'al', 
        'para', 'del', 'es', 'por', 'con', 'como', 'una', 'un', 'cuando',
        'realiza', 'realización', 'produce', 'producción', 'ocurre', 'sucede',
        'hace', 'hecha', 'hace', 'donde', 'cuál', 'cuáles', 'o', 'u'
    }
    
    # Extraer palabras
    words = text.split()
    keywords = [w for w in words if len(w) > 2 and w not in stopwords]
    
    return set(keywords)

def semantic_similarity(text1, text2):
    """Calcula similitud semántica simple (0-1)"""
    keys1 = extract_keywords(text1)
    keys2 = extract_keywords(text2)
    
    if not keys1 or not keys2:
        return 0.5  # Neutral
    
    intersection = len(keys1 & keys2)
    union = len(keys1 | keys2)
    
    return intersection / union if union > 0 else 0

def text_similarity(s1, s2):
    """Similitud de texto directa"""
    return SequenceMatcher(None, s1.lower(), s2.lower()).ratio()

def analyze_question_coherence(question_data):
    """Analiza la coherencia de una pregunta individual"""
    question = question_data.get('question', '')
    options = question_data.get('options', [])
    correct = question_data.get('correct', -1)
    
    results = {
        'question': question,
        'options': options,
        'correct': correct,
        'coherence_scores': [],
        'average_coherence': 0,
        'is_coherent': True,
        'issues': []
    }
    
    if not options or len(options) < 2:
        results['issues'].append('Menos de 2 opciones')
        results['is_coherent'] = False
        return results
    
    # Calcular similitud de cada opción con la pregunta
    for i, option in enumerate(options):
        similarity = semantic_similarity(question, option)
        results['coherence_scores'].append({
            'option': i,
            'text': option[:60] + '...' if len(option) > 60 else option,
            'score': similarity
        })
    
    # Calcular promedio
    avg = sum(s['score'] for s in results['coherence_scores']) / len(results['coherence_scores'])
    results['average_coherence'] = avg
    
    # Detectar si hay opciones muy desconectadas
    min_coherence = min(s['score'] for s in results['coherence_scores'])
    max_coherence = max(s['score'] for s in results['coherence_scores'])
    
    # Si hay una brecha grande, hay problema
    if max_coherence - min_coherence > 0.6:
        results['is_coherent'] = False
        results['issues'].append(f'Brecha temática {max_coherence - min_coherence:.2f} entre opciones')
    
    # Si el promedio es muy bajo
    if avg < 0.15:
        results['is_coherent'] = False
        results['issues'].append('Promedio de coherencia muy bajo (<0.15)')
    
    return results

def main():
    # Cargar test_bank.json
    with open('data/test_bank.json', 'r', encoding='utf-8') as f:
        test_bank = json.load(f)
    
    incoherent_count = 0
    incoherent_by_subject = defaultdict(list)
    overall_coherence = []
    
    print("🔍 ANALIZANDO COHERENCIA SEMÁNTICA")
    print("=" * 80)
    
    # Analizar cada sujeto
    for subject_id, questions in test_bank.items():
        print(f"\n📚 {subject_id.upper()}")
        print("-" * 80)
        
        subject_incoherent = []
        
        for idx, question_data in enumerate(questions):
            analysis = analyze_question_coherence(question_data)
            overall_coherence.append(analysis['average_coherence'])
            
            if not analysis['is_coherent']:
                incoherent_count += 1
                subject_incoherent.append({
                    'index': idx,
                    'analysis': analysis
                })
        
        incoherent_by_subject[subject_id] = subject_incoherent
        
        print(f"Total preguntas: {len(questions)}")
        print(f"Incoherentes detectadas: {len(subject_incoherent)}")
        if subject_incoherent:
            print(f"⚠️  {len(subject_incoherent)} preguntas con problemas temáticos")
    
    # Resumen general
    print("\n" + "=" * 80)
    print("📊 RESUMEN GENERAL")
    print("=" * 80)
    
    total_questions = sum(len(q) for q in test_bank.values())
    print(f"Total preguntas analizadas: {total_questions}")
    print(f"Preguntas incoherentes: {incoherent_count}")
    print(f"Porcentaje de incoherencia: {(incoherent_count/total_questions)*100:.2f}%")
    
    if overall_coherence:
        avg_coherence = sum(overall_coherence) / len(overall_coherence)
        print(f"Coherencia promedio (0-1): {avg_coherence:.3f}")
    
    # Mostrar ejemplos incoherentes (máx 5 por sujeto)
    print("\n" + "=" * 80)
    print("🚨 EJEMPLOS DE INCOHERENCIAS DETECTADAS")
    print("=" * 80)
    
    total_shown = 0
    for subject_id, incoherent_list in incoherent_by_subject.items():
        if incoherent_list and total_shown < 15:
            print(f"\n📚 {subject_id}")
            for item in incoherent_list[:3]:
                analysis = item['analysis']
                print(f"\n  Pregunta #{item['index']}:")
                print(f"  📝 {analysis['question'][:80]}...")
                print(f"  Issues: {', '.join(analysis['issues'])}")
                print(f"  Coherencia: {analysis['average_coherence']:.3f}")
                print(f"  Opciones:")
                for score in analysis['coherence_scores']:
                    print(f"    [{score['option']}] {score['text']} (similitud: {score['score']:.3f})")
                total_shown += 1
                if total_shown >= 15:
                    break
    
    # Salvar reporte detallado
    report = {
        'summary': {
            'total_questions': total_questions,
            'incoherent_count': incoherent_count,
            'incoherence_percentage': (incoherent_count/total_questions)*100,
            'average_coherence': sum(overall_coherence) / len(overall_coherence) if overall_coherence else 0
        },
        'by_subject': {}
    }
    
    for subject_id, incoherent_list in incoherent_by_subject.items():
        report['by_subject'][subject_id] = {
            'total': len(test_bank[subject_id]),
            'incoherent': len(incoherent_list),
            'issues': [
                {
                    'question_index': item['index'],
                    'question': item['analysis']['question'],
                    'issues': item['analysis']['issues'],
                    'coherence_score': item['analysis']['average_coherence'],
                    'correct_option': item['analysis']['correct'],
                    'options_scores': item['analysis']['coherence_scores']
                }
                for item in incoherent_list
            ]
        }
    
    with open('COHERENCIA_REPORT.json', 'w', encoding='utf-8') as f:
        json.dump(report, f, ensure_ascii=False, indent=2)
    
    print(f"\n✅ Reporte detallado guardado en: COHERENCIA_REPORT.json")

if __name__ == '__main__':
    main()
