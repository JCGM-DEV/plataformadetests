# 📑 ÍNDICE QA - ACCESO A REPORTES Y HERRAMIENTAS
**ProyectoExamenes | QA Testing Documentation**

---

## 🎯 COMIENZA AQUÍ

### Para gerentes/PM
**→ Lee:** [QA_SUMMARY.md](QA_SUMMARY.md) (5 min)
- Resumen ejecutivo
- Top 3 problemas
- Estimaciones de esfuerzo
- Action items prioritarios

### Para desarrolladores
**→ Lee:** [QA_REPORT.md](QA_REPORT.md) (15 min)
- Análisis detallado de cada incoherencia
- Ejemplos de código problemático
- Soluciones recomendadas
- Matriz de priorización

### Para QA/Testers
**→ Lee:** [REPRODUCCION_PROBLEMAS.md](REPRODUCCION_PROBLEMAS.md) (20 min)
- Pasos para reproducir cada problema
- Verificación manual
- Test cases
- Screenshots de errores

---

## 🛠️ HERRAMIENTAS DISPONIBLES

### 1. Validador Automático
```bash
cd /home/thebrave/Escritorio/ProyectoExamenes
python3 qa_validator.py
```

**Qué hace:**
- ✅ Valida número de opciones (debe ser 4)
- ✅ Verifica rango de "correct" (0-3)
- ✅ Detecta desajuste en "unit" (1-based vs 0-based)
- ✅ Analiza distribución de respuestas correctas

**Salida esperada:**
- Con problemas: ❌ 272 ERRORES CRÍTICOS
- Después de fix: ✅ VALIDACIÓN EXITOSA

---

## 📊 DOCUMENTOS GENERADOS

| Documento | Tipo | Tamaño | Audiencia | Uso |
|-----------|------|--------|-----------|-----|
| [QA_SUMMARY.md](QA_SUMMARY.md) | Markdown | 6.6 KB | PM, Managers | Decisiones rápidas |
| [QA_REPORT.md](QA_REPORT.md) | Markdown | 11 KB | Developers, QA | Análisis detallado |
| [REPRODUCCION_PROBLEMAS.md](REPRODUCCION_PROBLEMAS.md) | Markdown | 9.2 KB | QA, Testers | Casos de prueba |
| [qa_validator.py](qa_validator.py) | Python | 13 KB | DevOps, CI/CD | Validación automatizada |

---

## 🔍 PROBLEMAS ENCONTRADOS (RESUMEN)

### 🔴 CRÍTICOS (Requieren fix inmediato)

#### Problema #1: Unit Range Desajustado
- **Archivo:** `data/test_bank.json`
- **Línea:** varies (ejemplo línea 14)
- **Afecta:** 939 preguntas (100%)
- **Síntoma:** "Por Tema" no funciona
- **Solución:** Ver [QA_REPORT.md](QA_REPORT.md#1-incoherencia-principal-unit-range-0-based-vs-1-based)
- **Reproducción:** Ver [REPRODUCCION_PROBLEMAS.md#problema-1](REPRODUCCION_PROBLEMAS.md#problema-1-unit-range-desajustado-crítico)

#### Problema #2: Opciones Incompletas
- **Archivo:** `data/test_bank.json`
- **Cantidad:** 272 preguntas (28.9%)
- **Distribución:** Lenguaje de Marcas (94), Programación (67), etc
- **Síntoma:** Algunos exámenes muestran solo 3 botones
- **Solución:** Ver [QA_REPORT.md](QA_REPORT.md#2-incoherencia-crítica-opciones-insuficientes)
- **Reproducción:** Ver [REPRODUCCION_PROBLEMAS.md#problema-2](REPRODUCCION_PROBLEMAS.md#problema-2-opciones-incompletas-crítico)

### 🟡 MAYORES (Importante pero no bloqueante)

#### Problema #3: Distribución Desbalanceada
- **Archivo:** `data/test_bank.json`
- **Afecta:** Lenguaje de Marcas (B: 38.3%), Empleabilidad (D: 11.6%)
- **Síntoma:** Estudiantes pueden aprender patrones
- **Solución:** Ver [QA_REPORT.md](QA_REPORT.md#3-incoherencia-distribución-desbalanceada-de-respuestas-correctas)
- **Reproducción:** Ver [REPRODUCCION_PROBLEMAS.md#problema-3](REPRODUCCION_PROBLEMAS.md#problema-3-distribución-desbalanceada-advertencia)

### 🟠 MENORES (Verificado correctamente)

#### Problema #4: Fórmula de Scoring
- **Archivo:** `js/app.js` (línea 686)
- **Estado:** ✅ Correctamente implementada
- **Nota:** Depende de que todos los exámenes tengan 4 opciones
- **Reproducción:** Ver [REPRODUCCION_PROBLEMAS.md#problema-4](REPRODUCCION_PROBLEMAS.md#problema-4-fórmula-de-scoring-con-n-variable)

---

## 📈 ESTADÍSTICAS DE ANÁLISIS

```
Total de preguntas analizadas:      939
Preguntas con errores:              272 (28.9%)
Asignaturas analizadas:             7
Archivos JSON validados:            3
Líneas de código analizadas:        ~2000
```

### Distribución de Errores por Asignatura
```
Lenguaje de Marcas:        ████████████████████████ 94 (51.4%)
Programación:              ███████████████████████ 67 (40.9%)
Entornos de Desarrollo:    █████████████ 35 (31.5%)
Empleabilidad:             ██████████ 24 (27.9%)
Sistemas Informáticos:     ████████ 26 (13.5%)
Bases de Datos:            ████████ 26 (20.0%)
Cloud Computing:           ✓ 0 (0%)
```

---

## 🚀 SIGUIENTE PASOS

### Paso 1: Confirmación (5 minutos)
```bash
# Ejecutar validador para confirmar problemas
python3 qa_validator.py
# Resultado esperado: ❌ 272 errores críticos
```

### Paso 2: Priorización (10 minutos)
- [ ] Leer QA_SUMMARY.md
- [ ] Discutir en equipo
- [ ] Asignar tareas

### Paso 3: Implementación (3-5 horas)
- [ ] Fix #1: Cambiar unit de 1-based a 0-based (30 min)
- [ ] Fix #2: Completar opciones faltantes (2-4 horas)
- [ ] Validación: Ejecutar qa_validator.py nuevamente (10 min)

### Paso 4: Verificación (1 hora)
- [ ] Testing manual de todas las funciones
- [ ] Prueba en browser (todas las asignaturas)
- [ ] Verificar que no hay errores en consola

### Paso 5: Cierre (5 minutos)
```bash
# Confirmar que todos los errores están solucionados
python3 qa_validator.py
# Resultado esperado: ✅ VALIDACIÓN EXITOSA
```

---

## 📞 REFERENCIAS RÁPIDAS

### Líneas de Código Problemáticas
- Unit filtering: [js/app.js:414-416](js/app.js#L414-L416)
- Question rendering: [js/app.js:606-617](js/app.js#L606-L617)
- Scoring formula: [js/app.js:686-688](js/app.js#L686-L688)

### Ejemplos en JSON
- Pregunta con 3 opciones: [data/test_bank.json:~línea 2500+](data/test_bank.json)
- Unit indexing: [data/test_bank.json:línea 14](data/test_bank.json#L14)

### Archivos Relacionados
- Subjects config: [data/subjects.json](data/subjects.json)
- Test bank: [data/test_bank.json](data/test_bank.json)
- Syllabus: [data/syllabus_registry.json](data/syllabus_registry.json)

---

## 🎓 APRENDIZAJES CLAVE

1. **Indexación:** JSON con datos educativos debe usar 0-based arrays
2. **Validación:** Automatizar antes de desplegar
3. **Testing:** Todas las preguntas deben tener exactamente 4 opciones
4. **Distribución:** Las respuestas correctas deben estar equilibradas (~25% cada una)

---

## 📋 CHECKLIST DE CIERRE

### Antes de Producción
- [ ] Ejecutar `python3 qa_validator.py` → 0 errores
- [ ] Prueba manual: Simulacro Completo
- [ ] Prueba manual: Por Tema (todas las asignaturas)
- [ ] Prueba manual: Repaso de Fallos
- [ ] Consola del browser sin errores (F12)
- [ ] Scoring test: verificar penalizaciones correctas
- [ ] Sign-off del equipo QA

### Comunicación
- [ ] Informar a stakeholders del downtime (si aplica)
- [ ] Actualizar changelog
- [ ] Documentar cambios realizados

---

**Análisis realizado:** 6 de abril de 2026  
**Status:** ✋ En espera de correcciones  
**Próxima revisión:** Post-fix validation  
**Criticidad:** 🔴 BLOQUEANTE PARA PRODUCCIÓN

