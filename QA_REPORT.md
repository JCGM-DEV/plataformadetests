# 🧪 REPORTE QA - ANÁLISIS DE INCOHERENCIAS
**ProyectoExamenes | Proyecto DAW 2026 - Euroformac**  
**Fecha de Análisis:** 6 de abril de 2026  
**Estado:** ⚠️ **ERRORES CRÍTICOS ENCONTRADOS**

---

## 📊 RESUMEN EJECUTIVO

Se han identificado **272 errores críticos** y **7 problemas de coherencia** que afectan la funcionalidad del sistema de exámenes. Estos incluyen:

| Tipo de Error | Cantidad | Severidad | Afecta a |
|---------------|----------|-----------|----------|
| Preguntas con 3 opciones (debe ser 4) | 272 | 🔴 CRÍTICO | 6 asignaturas |
| Rango de "unit" desajustado (1-based vs 0-based) | 7 | 🔴 CRÍTICO | Todas las asignaturas |
| Distribución desequilibrada de respuestas correctas | - | 🟡 MAYOR | lenguaje_de_marcas, empleabilidad |

---

## 1️⃣ INCOHERENCIA PRINCIPAL: UNIT RANGE (0-based vs 1-based)

### ❌ PROBLEMA IDENTIFICADO

El archivo `data/test_bank.json` usa indexación **1-based** (1-7, 1-10) en el campo `unit`, pero:
- `data/subjects.json` define `units_count` (esperado: 0-based para arrays)
- El código `js/app.js` asume indexación 0-based en la fórmula de filtrado

### 📋 DETALLES POR ASIGNATURA

```
Asignatura                    test_bank.json    subjects.json         Discrepancia
───────────────────────────────────────────────────────────────────────────────────
sistemas_informaticos         unit: 1-7         units_count: 7        ✗ Offset +1
bases_de_datos                unit: 1-7         units_count: 7        ✗ Offset +1
programacion                  unit: 1-10        units_count: 10       ✗ Offset +1
lenguaje_de_marcas            unit: 1-8         units_count: 8        ✗ Offset +1
entornos_de_desarrollo        unit: 1-7         units_count: 7        ✗ Offset +1
cloud_computing               unit: 1-10        units_count: 10       ✗ Offset +1
empleabilidad                 unit: 1-5         units_count: 5        ✗ Offset +1
```

### 🔍 EJEMPLO DE IMPACTO EN CÓDIGO

**Archivo:** [js/app.js](js/app.js#L414-L416)

```javascript
// Línea 414-416
if (unitId !== null) pool = pool.filter(q => q.unit === unitId);
// Si unitId = 0 (primer tema), nunca encontrará preguntas porque test_bank.json usa unit: 1
```

### ✅ SOLUCIÓN RECOMENDADA

**Opción A (Preferida):** Cambiar test_bank.json a 0-based
```json
{
  "concept_id": "sistemas_informaticos_0",
  "unit": 0,  // Cambiar de: "unit": 1
  ...
}
```

**Opción B:** Ajustar el código (menos recomendado)
```javascript
if (unitId !== null) pool = pool.filter(q => q.unit === unitId + 1);
```

---

## 2️⃣ INCOHERENCIA CRÍTICA: OPCIONES INSUFICIENTES

### ❌ PROBLEMA IDENTIFICADO

**272 preguntas (28.9% del banco)** tienen solo **3 opciones** en lugar de 4.

### 📊 DISTRIBUCIÓN DE ERRORES

| Asignatura | 3 opciones | 4 opciones | % Error | Ejemplos |
|------------|-----------|-----------|---------|----------|
| lenguaje_de_marcas | **94** | 89 | 51.4% | lm_t1, lm_t2, lm_t5 |
| programacion | **67** | 97 | 40.9% | prog_t3, prog_t4 |
| entornos_de_desarrollo | **35** | 76 | 31.5% | ed_t1, ed_t3, ed_t5 |
| empleabilidad | **24** | 62 | 27.9% | emp_t1, emp_t2 |
| bases_de_datos | **26** | 104 | 20.0% | bd_t1, bd_t3 |
| sistemas_informaticos | **26** | 167 | 13.5% | si_real_168 |
| cloud_computing | 0 | 72 | 0% | ✅ Correcto |

### 🔍 EJEMPLO DE PREGUNTA MALFORMADA

**Archivo:** [data/test_bank.json](data/test_bank.json#L4-L16)

```json
{
  "concept_id": "sistemas_informaticos_0",
  "question": "¿Qué arquitectura de ordenador usa una memoria unificada?",
  "options": [
    "CISC",
    "Harvard",  
    "Von Neumann"
  ],
  "correct": 2,
  "explanation": "Von Neumann usa un único bus de memoria.",
  "unit": 1
}
// ❌ FALTA: 4ª opción. Array tiene solo 3 elementos.
// ⚠️ RIESGO: "correct": 2 apunta al índice 2 (Von Neumann) ✓ válido por coincidencia
//    Pero si fuese "correct": 3 causaría IndexOutOfBoundsException
```

### 💥 IMPACTO EN EJECUCIÓN

**Línea 606 de [js/app.js](js/app.js#L606):**

```javascript
function renderQuestion() {
    const q = APP_STATE.examQuestions[APP_STATE.currentQuestionIndex];
    // ...
    ${q.options.map((opt, i) => `
        <button class="option-btn" onclick="handleResponse(${i})">
            <span>${String.fromCharCode(65+i)}</span>  // A, B, C, D...
```

| Preguntas normales | Preguntas con 3 opciones |
|------------------|------------------------|
| A, B, C, D | A, B, C ❌ Falta D |
| El usuario espera 4 opciones | El usuario ve solo 3 |

---

## 3️⃣ INCOHERENCIA: DISTRIBUCIÓN DESBALANCEADA DE RESPUESTAS CORRECTAS

### ⚠️ ADVERTENCIA (No Critical pero Notable)

Algunas asignaturas tienen una distribución muy sesgada de respuestas correctas:

```
Lenguaje de Marcas:
  A: 20.8%  |  B: 38.3% ▲▲▲ MAYOR  |  C: 32.8%  |  D: 8.2% ▼ Muy bajo

Empleabilidad:
  A: 32.6%  |  B: 27.9%  |  C: 27.9%  |  D: 11.6% ▼ Muy bajo

Cloud Computing (Bien distribuido ✓):
  A: 22.2%  |  B: 25.0%  |  C: 23.6%  |  D: 29.2%
```

**Riesgo:** Los estudiantes pueden aprender patrones (ej: "la opción B es más probable")

---

## 4️⃣ VALIDACIÓN DE LA FÓRMULA DE SCORING

### ✅ FÓRMULA CORRECTAMENTE IMPLEMENTADA

**Archivo:** [js/app.js](js/app.js#L686-L688)

```javascript
const N = 4;  // Número de opciones
const puntuacionBruta = aciertos - errores / (N - 1);
const puntuacionFinal = Math.max(0, puntuacionBruta);
const calificacion = (puntuacionFinal / total) * 10;
```

**Fórmula (DAW 2026 compatible):**
```
Puntuación Bruta = Aciertos − (Errores ÷ 3)
Puntuación Final = MAX(0, Puntuación Bruta)
Calificación = (Puntuación Final ÷ Total Preguntas) × 10
```

✅ **Estado:** Implementación correcta  
✅ **Aprobación:** Calificación ≥ 5.0  
⚠️ **Nota:** La fórmula asume siempre 4 opciones (N=4). Con 3 opciones, la penalización por error es incorrecta.

---

## 5️⃣ COHERENCIA ENTRE ARCHIVOS JSON

### ✅ VALIDACIONES APROBADAS

| Validación | Estado | Total |
|-----------|--------|-------|
| Asignaturas en test_bank.json existen en subjects.json | ✅ OK | 7/7 |
| Todas las asignaturas de subjects.json tienen preguntas | ✅ OK | 7/7 |
| Todas las asignaturas están en syllabus_registry.json | ✅ OK | 7/7 |
| IDs de asignatura cumplen naming convention | ✅ OK | 7/7 |

### ✅ TOTAL DE PREGUNTAS

```
Asignatura                          Preguntas    Mínimo esperado
────────────────────────────────────────────────────────────────
sistemas_informaticos                    193            20+ ✓
lenguaje_de_marcas                       183            20+ ✓
programacion                             164            20+ ✓
bases_de_datos                           130            20+ ✓
entornos_de_desarrollo                   111            20+ ✓
empleabilidad                             86            20+ ✓
cloud_computing                           72            20+ ✓
────────────────────────────────────────────────────────────────
TOTAL                                    939 preguntas
```

---

## 6️⃣ ANÁLISIS DE CAMPO "correct"

### ✅ VALIDACIONES APROBADAS

- ✅ Todos los valores de "correct" están en rango válido (0-3)
- ✅ El código valida correctamente con `index === q.correct`
- ✅ Se usa la respuesta con `q.options[q.correct]` sin errores de índice (cuando hay 4 opciones)
- ✅ Se implementa feedback inmediato en [js/app.js](js/app.js#L644-L660)

### ⚠️ DEPENDENCIA CRÍTICA

La validación depende de que SIEMPRE haya 4 opciones. Con solo 3 opciones:
- Si `correct: 3`, la línea 652 causa error: `q.options[3]` es `undefined`

---

## 📋 MATRIZ DE PRIORIZACIÓN

| ID | Problema | Severidad | Afecta | Esfuerzo | Prioridad |
|----|---------|---------|---------|---------|----|
| **P1** | Unit range 1-based vs 0-based | 🔴 CRÍTICO | 939 preguntas | 🟢 Bajo | 🔥 INMEDIATO |
| **P2** | 272 preguntas con 3 opciones | 🔴 CRÍTICO | 29% del banco | 🟡 Medio | 🔥 INMEDIATO |
| **P3** | Distribución desbalanceada (opción D baja) | 🟡 MAYOR | 2 asignaturas | 🟡 Medio | 📌 Prioritario |
| **P4** | Fórmula asume N=4 siempre | 🟠 MENOR | Scoring | 🟢 Bajo | 📍 Plazo |

---

## 🔧 PLAN DE ACCIÓN RECOMENDADO

### FASE 1: Fixes Críticos (Esta semana)

**Task 1.1:** Corregir en test_bank.json cambiar `unit: 1-X` a `unit: 0-(X-1)`
- [ ] Generar script Python para transformación
- [ ] Validar que todos los valores estén en rango correcto
- [ ] Verificar índices en 272 preguntas con 3 opciones

**Task 1.2:** Completar las 272 preguntas con opción D faltante
- [ ] Lenguaje de Marcas: 94 preguntas
- [ ] Programación: 67 preguntas
- [ ] Entornos de Desarrollo: 35 preguntas
- [ ] Empleabilidad: 24 preguntas
- [ ] Bases de Datos: 26 preguntas
- [ ] Sistemas Informáticos: 26 preguntas

**Task 1.3:** Validar en producción
- [ ] Correr suite de tests automáticos
- [ ] Verificar que filterByUnit() funciona correctamente
- [ ] Comprobar que no hay undefined en renderQuestion()

### FASE 2: Mejoras Secundarias (Próximas 2 semanas)

**Task 2.1:** Rebalancear distribución de respuestas correctas
- [ ] Analizar Lenguaje de Marcas (B = 38.3%)
- [ ] Analizar Empleabilidad (D = 11.6%)

**Task 2.2:** Añadir validaciones en el generador de datos
```python
def validate_question(q):
    assert len(q['options']) == 4, f"❌ {q['concept_id']}: {len(q['options'])} opciones"
    assert 0 <= q['correct'] <= 3, f"❌ Índice correcto inválido"
    assert 1 <= q['unit'] <= units_count, f"❌ Unit fuera de rango"
```

---

## 📞 RECOMENDACIONES

### Para Desarrolladores
1. Crear script de validación automático antes de desplegar
2. Implementar CI/CD checks que rechacen datos malformados
3. Añadir types/interfaces para Question (TypeScript)

### Para QA
1. Ejecutar este análisis después de cada regeneración del test_bank.json
2. Verificar manualmente 10% de preguntas de cada asignatura
3. Crear casos de prueba específicos para unit filtering
4. Pruebas de scoring con 3 vs 4 opciones

### Para Product
1. Pausar uso en exámenes reales hasta corregir P1 y P2
2. Informar a estudiantes sobre limitación temporal de preguntas
3. Priorizar generación de opciones D faltantes

---

## 🎯 CONCLUSIÓN

El sistema tiene una **arquitectura sólida** pero los **datos de entrada son inconsistentes**. Los dos problemas principales (unit indexing y opciones faltantes) deben corregirse inmediatamente antes de cualquier evaluación oficial.

**Recomendación:** Detener el uso en producción hasta que se corrijan P1 y P2.

---

*Análisis realizado por: QA Automation System*  
*Metodología: Análisis estático automático + validación manual*  
*Próxima revisión: Post-fix validation*
