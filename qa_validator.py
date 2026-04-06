#!/usr/bin/env python3
"""
QA Validator - Validación automática del banco de preguntas
ProyectoExamenes | DAW 2026 Euroformac

Uso: python3 qa_validator.py

Detecta automáticamente:
- Preguntas con opciones incompletas
- Índices de respuesta fuera de rango
- Inconsistencias en unit numbering
- Distribución desequilibrada de respuestas
"""

import json
import sys
from collections import defaultdict
from pathlib import Path

# Colores para terminal
class Colors:
    RED = '\033[91m'
    GREEN = '\033[92m'
    YELLOW = '\033[93m'
    BLUE = '\033[94m'
    CYAN = '\033[96m'
    RESET = '\033[0m'
    BOLD = '\033[1m'

class QAValidator:
    def __init__(self, project_root="."):
        self.project_root = Path(project_root)
        self.errors = []
        self.warnings = []
        self.subjects = {}
        self.questions = {}
        
    def load_data(self):
        """Cargar archivos JSON necesarios"""
        try:
            with open(self.project_root / "data" / "subjects.json") as f:
                subjects_list = json.load(f)
                self.subjects = {s['id']: s for s in subjects_list}
            
            with open(self.project_root / "data" / "test_bank.json") as f:
                self.questions = json.load(f)
            
            print(f"{Colors.GREEN}✓{Colors.RESET} Archivos cargados correctamente")
            return True
        except Exception as e:
            print(f"{Colors.RED}✗ Error cargando archivos:{Colors.RESET} {e}")
            return False
    
    def validate_options(self):
        """Verificar que todas las preguntas tengan 4 opciones"""
        print(f"\n{Colors.CYAN}=== VALIDACIÓN: Número de opciones ==={Colors.RESET}")
        
        issues_by_subject = defaultdict(list)
        
        for subject_id, questions in self.questions.items():
            for q in questions:
                if len(q.get('options', [])) != 4:
                    issues_by_subject[subject_id].append({
                        'concept_id': q['concept_id'],
                        'options_count': len(q.get('options', []))
                    })
        
        if not issues_by_subject:
            print(f"{Colors.GREEN}✓ Todas las preguntas tienen 4 opciones{Colors.RESET}")
            return True
        
        total_issues = sum(len(v) for v in issues_by_subject.values())
        print(f"{Colors.RED}✗ {total_issues} preguntas con opciones incompletas:{Colors.RESET}")
        
        for subject_id, issues in sorted(issues_by_subject.items()):
            print(f"\n  {Colors.BOLD}{subject_id}{Colors.RESET}: {len(issues)} problemas")
            for issue in issues[:3]:  # Mostrar solo los primeros 3
                print(f"    - {issue['concept_id']}: {issue['options_count']} opciones")
            if len(issues) > 3:
                print(f"    ... y {len(issues) - 3} más")
        
        self.errors.extend([
            f"[OPTIONS] {subject_id}/{issue['concept_id']}: {issue['options_count']} opciones"
            for subject_id, issues in issues_by_subject.items()
            for issue in issues
        ])
        
        return False
    
    def validate_correct_index(self):
        """Verificar que 'correct' esté en rango [0-3]"""
        print(f"\n{Colors.CYAN}=== VALIDACIÓN: Índice de respuesta correcta ==={Colors.RESET}")
        
        issues = []
        
        for subject_id, questions in self.questions.items():
            for q in questions:
                correct = q.get('correct', -1)
                options_count = len(q.get('options', []))
                
                if not (0 <= correct < 4):
                    issues.append({
                        'subject_id': subject_id,
                        'concept_id': q['concept_id'],
                        'correct': correct,
                        'type': 'out_of_range'
                    })
                elif correct >= options_count:
                    issues.append({
                        'subject_id': subject_id,
                        'concept_id': q['concept_id'],
                        'correct': correct,
                        'options': options_count,
                        'type': 'exceeds_options'
                    })
        
        if not issues:
            print(f"{Colors.GREEN}✓ Todos los índices 'correct' son válidos{Colors.RESET}")
            return True
        
        print(f"{Colors.RED}✗ {len(issues)} preguntas con 'correct' inválido:{Colors.RESET}")
        for issue in issues[:5]:
            if issue['type'] == 'out_of_range':
                print(f"  - {issue['concept_id']}: correct={issue['correct']}")
            else:
                print(f"  - {issue['concept_id']}: correct={issue['correct']} pero solo {issue['options']} opciones")
        
        if len(issues) > 5:
            print(f"  ... y {len(issues) - 5} más")
        
        self.errors.extend([
            f"[CORRECT] {issue['subject_id']}/{issue['concept_id']}: invalid index {issue['correct']}"
            for issue in issues
        ])
        
        return False
    
    def validate_unit_range(self):
        """Verificar que 'unit' esté en rango válido"""
        print(f"\n{Colors.CYAN}=== VALIDACIÓN: Rango de unidades (unit) ==={Colors.RESET}")
        
        issues_by_subject = defaultdict(list)
        unit_ranges = {}
        
        for subject_id, questions in self.questions.items():
            units = set()
            for q in questions:
                unit = q.get('unit', -1)
                units.add(unit)
                
                expected_max = self.subjects.get(subject_id, {}).get('units_count', 0)
                
                # Detectar si es 1-based o 0-based
                if unit >= 1 and unit <= expected_max:
                    unit_type = "1-based"
                elif unit >= 0 and unit < expected_max:
                    unit_type = "0-based"
                else:
                    issues_by_subject[subject_id].append({
                        'concept_id': q['concept_id'],
                        'unit': unit,
                        'expected_max': expected_max
                    })
                    continue
            
            if units:
                unit_ranges[subject_id] = (min(units), max(units), unit_type)
        
        # Mostrar análisis
        indexing_types = defaultdict(int)
        for subject_id, (min_unit, max_unit, unit_type) in unit_ranges.items():
            indexing_types[unit_type] += 1
            expected_max = self.subjects.get(subject_id, {}).get('units_count', 0)
            
            if unit_type == "1-based" and expected_max > 0:
                print(f"  {Colors.YELLOW}⚠{Colors.RESET} {subject_id}: unit={min_unit}-{max_unit} ({unit_type}), esperado 0-{expected_max-1}")
                self.warnings.append(f"[UNIT] {subject_id}: indexación 1-based encontrada, esperado 0-based")
            else:
                print(f"  {Colors.GREEN}✓{Colors.RESET} {subject_id}: unit={min_unit}-{max_unit} (correcto)")
        
        if issues_by_subject:
            print(f"\n{Colors.RED}✗ Unidades fuera de rango:{Colors.RESET}")
            for subject_id, issues in issues_by_subject.items():
                print(f"  {subject_id}: {len(issues)} preguntas")
                for issue in issues[:2]:
                    print(f"    - {issue['concept_id']}: unit={issue['unit']}")
            
            self.errors.extend([
                f"[UNIT] {subject_id}/{issue['concept_id']}: unit={issue['unit']}"
                for subject_id, issues in issues_by_subject.items()
                for issue in issues
            ])
            return False
        
        return True
    
    def validate_distribution(self):
        """Analizar distribución de respuestas correctas"""
        print(f"\n{Colors.CYAN}=== ANÁLISIS: Distribución de respuestas correctas ==={Colors.RESET}")
        
        for subject_id, questions in self.questions.items():
            distribution = [0, 0, 0, 0]
            for q in questions:
                correct = q.get('correct', -1)
                if 0 <= correct <= 3:
                    distribution[correct] += 1
            
            total = sum(distribution)
            percentages = [f"{(c/total)*100:.1f}%" if total > 0 else "0%" for c in distribution]
            
            # Detectar desequilibrio (una opción muy diferente del 25%)
            if total > 0:
                worst_pct = min(distribution) / total * 100
                best_pct = max(distribution) / total * 100
                
                if worst_pct < 15 or best_pct > 35:
                    print(f"  {Colors.YELLOW}⚠{Colors.RESET} {subject_id}: A:{percentages[0]} B:{percentages[1]} C:{percentages[2]} D:{percentages[3]}")
                    self.warnings.append(f"[DIST] {subject_id}: distribución desbalanceada")
                else:
                    print(f"  {Colors.GREEN}✓{Colors.RESET} {subject_id}: A:{percentages[0]} B:{percentages[1]} C:{percentages[2]} D:{percentages[3]}")
        
        return True
    
    def run_all_validations(self):
        """Ejecutar todas las validaciones"""
        print(f"\n{Colors.BOLD}{Colors.CYAN}════════════════════════════════════════════{Colors.RESET}")
        print(f"{Colors.BOLD}{Colors.CYAN}  QA VALIDATOR - Banco de Preguntas Exámenes{Colors.RESET}")
        print(f"{Colors.BOLD}{Colors.CYAN}════════════════════════════════════════════{Colors.RESET}")
        
        if not self.load_data():
            return False
        
        results = {
            'options': self.validate_options(),
            'correct_index': self.validate_correct_index(),
            'unit_range': self.validate_unit_range(),
        }
        
        self.validate_distribution()
        
        # Resumen final
        print(f"\n{Colors.BOLD}{Colors.CYAN}════════════════════════════════════════════{Colors.RESET}")
        print(f"{Colors.BOLD}RESUMEN FINAL:{Colors.RESET}")
        print(f"{Colors.BOLD}{Colors.CYAN}════════════════════════════════════════════{Colors.RESET}")
        
        if self.errors:
            print(f"\n{Colors.RED}{Colors.BOLD}❌ ERRORES CRÍTICOS: {len(self.errors)}{Colors.RESET}")
            for error in self.errors[:10]:
                print(f"   {Colors.RED}•{Colors.RESET} {error}")
            if len(self.errors) > 10:
                print(f"   ... y {len(self.errors) - 10} más")
        else:
            print(f"\n{Colors.GREEN}{Colors.BOLD}✅ Sin errores críticos{Colors.RESET}")
        
        if self.warnings:
            print(f"\n{Colors.YELLOW}{Colors.BOLD}⚠️  ADVERTENCIAS: {len(self.warnings)}{Colors.RESET}")
            for warning in self.warnings[:10]:
                print(f"   {Colors.YELLOW}•{Colors.RESET} {warning}")
            if len(self.warnings) > 10:
                print(f"   ... y {len(self.warnings) - 10} más")
        else:
            print(f"\n{Colors.GREEN}{Colors.BOLD}✓ Sin advertencias{Colors.RESET}")
        
        overall_status = all(results.values()) and not self.errors
        
        print(f"\n{Colors.BOLD}{Colors.CYAN}════════════════════════════════════════════{Colors.RESET}")
        if overall_status:
            print(f"{Colors.GREEN}{Colors.BOLD}✓ VALIDACIÓN EXITOSA{Colors.RESET}")
            return True
        else:
            print(f"{Colors.RED}{Colors.BOLD}✗ VALIDACIÓN FALLIDA - REQUIERE ATENCIÓN{Colors.RESET}")
            return False

if __name__ == "__main__":
    # Buscar proyecto desde el directorio actual o padres
    project_root = Path.cwd()
    
    # Si no estamos en el proyecto, intentar encontrarlo
    if not (project_root / "data" / "test_bank.json").exists():
        print(f"{Colors.YELLOW}Buscando ruta del proyecto...{Colors.RESET}")
        # Buscar hacia arriba
        for parent in project_root.parents:
            if (parent / "data" / "test_bank.json").exists():
                project_root = parent
                break
    
    validator = QAValidator(project_root)
    success = validator.run_all_validations()
    
    sys.exit(0 if success else 1)
