#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Misalignment Detector - Encuentra preguntas cuyas opciones podrían no pertenecer
"""

import json
from difflib import SequenceMatcher

def text_similarity(s1, s2):
    """Similitud de strings (0-1)"""
    return SequenceMatcher(None, s1.lower(), s2.lower()).ratio()

def option_question_resonance(question, options):
    """
    Calcula qué tan bien resuenan las opciones con la pregunta
    Retorna: (average_similarity, details)
    """
    similarities = []
    
    for i, option in enumerate(options):
        sim = text_similarity(question, option)
        similarities.append({
            'option_idx': i,
            'option_text': option[:60] + '...' if len(option) > 60 else option,
            'similarity': sim
        })
    
    avg_similarity = sum(s['similarity'] for s in similarities) / len(similarities) if similarities else 0
    
    return avg_similarity, similarities

def main():
    with open('data/test_bank.json', 'r', encoding='utf-8') as f:
        test_bank = json.load(f)
    
    suspicious_questions = []
    low_resonance_threshold = 0.15  # Muy baja similitud
    high_variance_threshold = 0.4   # Alta varianza entre opciones
    
    print("🔎 ANÁLISIS DE DESALINEACIÓN PREGUNTA-OPCIONES")
    print("=" * 80)
    
    for subject_id, questions in test_bank.items():
        print(f"\n📚 {subject_id.upper()}")
        print("-" * 80)
        
        subject_suspicious = 0
        
        for idx, q_data in enumerate(questions):
            question = q_data.get('question', '')
            options = q_data.get('options', [])
            
            avg_sim, sims = option_question_resonance(question, options)
            
            # Detectar baja resonancia general
            if avg_sim < low_resonance_threshold:
                subject_suspicious += 1
                suspicious_questions.append({
                    'subject': subject_id,
                    'index': idx,
                    'question': question,
                    'options': options,
                    'correct': q_data.get('correct', -1),
                    'avg_similarity': avg_sim,
                    'similarities': sims,
                    'reason': 'Baja resonancia general'
                })
            
            # Detectar alta varianza (una opción muy diferente)
            similarities_vals = [s['similarity'] for s in sims]
            variance = max(similarities_vals) - min(similarities_vals)
            
            if variance > high_variance_threshold and avg_sim < 0.25:
                subject_suspicious += 1
                suspicious_questions.append({
                    'subject': subject_id,
                    'index': idx,
                    'question': question,
                    'options': options,
                    'correct': q_data.get('correct', -1),
                    'avg_similarity': avg_sim,
                    'similarities': sims,
                    'reason': 'Alta varianza entre opciones'
                })
        
        print(f"Preguntas sospechosas: {subject_suspicious}/{len(questions)}")
    
    # Mostrar resultados
    print("\n" + "=" * 80)
    print(f"📊 TOTAL SOSPECHOSAS: {len(suspicious_questions)}")
    print("=" * 80)
    
    if suspicious_questions:
        print(f"\nMostrando primeras 20:")
        for item in suspicious_questions[:20]:
            print(f"\n{'='*80}")
            print(f"📚 {item['subject']} - Pregunta #{item['index']}")
            print(f"Razón: {item['reason']}")
            print(f"Similitud promedio: {item['avg_similarity']:.3f}")
            print(f"\n❓ {item['question']}")
            print(f"\nOpciones (resonancia):")
            for sim in item['similarities']:
                ok = "✓" if sim['similarity'] > 0.2 else "✗"
                print(f"  {ok} [{sim['option_idx']}] {sim['option_text']:<55} ({sim['similarity']:.3f})")
    
    # Salvar reporte
    with open('MISALIGNMENT_REPORT.json', 'w', encoding='utf-8') as f:
        json.dump({
            'total_suspicious': len(suspicious_questions),
            'examples': suspicious_questions[:50]
        }, f, ensure_ascii=False, indent=2)
    
    print(f"\n✅ Reporte guardado: MISALIGNMENT_REPORT.json")

if __name__ == '__main__':
    main()
