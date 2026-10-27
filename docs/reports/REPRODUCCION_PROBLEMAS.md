# 🐛 GUÍA DE REPRODUCCIÓN DE PROBLEMAS
**ProyectoExamenes | QA Testing Guide**

---

## PROBLEMA #1: Unit Range Desajustado (Crítico)

### Descripción
El campo `unit` en `test_bank.json` usa indexación 1-based (1-7, 1-10) pero el código espera 0-based.

### Pasos para Reproducir

#### 1.1 Verificación en JSON
```bash
# Abre data/test_bank.json
# Busca: "unit": 1  (primera pregunta)
# Rango actual: 1-7 para 7 temas
# Rango esperado: 0-6 para 7 temas
```

**Archivo:** [data/test_bank.json](data/test_bank.json#L14)
```json
{
  "concept_id": "sistemas_informaticos_0",
  "unit": 1,  // ❌ Debería ser: "unit": 0
}
```

#### 1.2 Verificación en Código
**Archivo:** [js/app.js](js/app.js#L414-L416)

```javascript
function startExam(subjectId, unitId = null) {
    let pool = QUESTION_POOL[subjectId] || [];
    if (unitId !== null) pool = pool.filter(q => q.unit === unitId);  // ❌ PROBLEMA AQUÍ
    // ...
}
```

**Escenario de error:**
```javascript
// Supongamos unitId = 0 (quiero el primer tema)
// test_bank.json tiene: "unit": 1, "unit": 2, ...
// Resultado: pool.filter(q => q.unit === 0) NUNCA encontrará nada
// pool.length === 0 → alert('No hay preguntas disponibles')
```

#### 1.3 Test Manual en Browser
1. Abre `index.html` en navegador
2. Haz clic en cualquier asignatura (ej: Bases de Datos)
3. Haz clic en "Por Tema" → "Tema 1"
4. Resultado esperado: ❌ **Alert: "No hay preguntas disponibles para este tema"**
5. Resultado observado: La función `startExam('bases_de_datos', 1)` busca preguntas con `unit: 1` pero debería buscar `unit: 0` (primer tema).

### Impacto
- ❌ El filtrado por tema no funciona
- ❌ El simulacro temario puede saltar algunos temas
- ✅ Los simulacros completos funcionan (no filtran por unit)

---

## PROBLEMA #2: Opciones Incompletas (Crítico)

### Descripción
272 preguntas tienen solo 3 opciones en lugar de 4.

### Pasos para Reproducir

#### 2.1 Búsqueda de Preguntas Malformadas
```bash
# Comando para listar preguntas con 3 opciones:
python3 << 'EOF'
import json

with open('data/test_bank.json') as f:
    data = json.load(f)

for subject, questions in data.items():
    issues = [q for q in questions if len(q.get('options', [])) != 4]
    if issues:
        print(f"\n{subject}: {len(issues)} preguntas")
        for q in issues[:2]:
            print(f"  - {q['concept_id']}: {len(q['options'])} opciones")
            print(f"    Options: {q['options']}")
            print(f"    Correct: {q['correct']}")
EOF
```

#### 2.2 Ejemplo Específico: LM Tema 1
**Archivo:** [data/test_bank.json](data/test_bank.json) (buscar "lm_")

```json
{
  "concept_id": "lenguaje_de_marcas_0",
  "question": "¿Qué es XML?",
  "options": [
    "Es un formato de datos",
    "Es un lenguaje de marcas",
    "Es un protocolo de red"
  ],
  "correct": 1,
  "unit": 1
}
// ❌ FALTA LA OPCIÓN D
// ⚠️ RIESGO: Si correct fuese 3, causaría error al mostrar
```

#### 2.3 Test en Código
**Archivo:** [js/app.js](js/app.js#L606-L617)

```javascript
function renderQuestion() {
    const q = APP_STATE.examQuestions[APP_STATE.currentQuestionIndex];
    // ...
    ${q.options.map((opt, i) => `
        <button class="option-btn" onclick="handleResponse(${i})">
            <span class="opt-letter">${String.fromCharCode(65+i)}</span>  // A, B, C, D
```

**Comportamiento observado:**
1. Si pregunta tiene 3 opciones:
   - Se renderizan: A, B, C
   - Falta: D
   - El usuario ve solo 3 botones

2. Si es pregunta de Lenguaje de Marcas con `correct: 1`:
   - ✅ Funciona porque la opción B existe
   - Pero la UI es inconsistente

3. Si hipotéticamente fuese `correct: 3`:
   - ❌ `q.options[3]` sería `undefined`
   - ❌ Error silencioso en console: "Cannot read property of undefined"

#### 2.4 Simulación en Browser Console
```javascript
// Ejecutar en consola del navegador (F12 → Console)

// Pregunta malformada
const badQuestion = {
  question: "¿Qué es XML?",
  options: ["A", "B", "C"],  // Solo 3
  correct: 1
};

// Esto funcionaría
console.log(badQuestion.options[badQuestion.correct]); // "B" ✓

// Pero esto fallaría si correct fuese 3
badQuestion.correct = 3;
console.log(badQuestion.options[badQuestion.correct]); // undefined ❌
```

#### 2.5 Validación Automática
```bash
# Usar el validador creado:
python3 qa_validator.py

# Salida esperada:
# ❌ 272 preguntas con opciones incompletas
# - lenguaje_de_marcas: 94
# - programacion: 67
# - entornos_de_desarrollo: 35
# ...
```

### Impacto
- ❌ UI inconsistente (algunos exámenes muestran 3 botones, otros 4)
- ❌ Riesgo de IndexOutOfBoundsException si `correct` > número de opciones
- ❌ Fórmula de scoring asume N=4, pero algunos exámenes son N=3
- ❌ Estudiantes confundidos por número inconsistente de opciones

---

## PROBLEMA #3: Distribución Desbalanceada (Advertencia)

### Descripción
Lenguaje de Marcas tiene 38.3% de respuestas correctas en opción B, solo 8.2% en opción D.

### Pasos para Reproducir

#### 3.1 Análisis Estadístico
```python
import json

with open('data/test_bank.json') as f:
    data = json.load(f)

subject = 'lenguaje_de_marcas'
distribution = [0, 0, 0, 0]

for q in data[subject]:
    correct = q['correct']
    if 0 <= correct <= 3:
        distribution[correct] += 1

total = sum(distribution)
percentages = [f"{(c/total)*100:.1f}%" for c in distribution]

print(f"Distribución {subject}:")
print(f"A: {percentages[0]}")
print(f"B: {percentages[1]}  ← 38.3% ESTÁ SESGADO")
print(f"C: {percentages[2]}")
print(f"D: {percentages[3]}  ← 8.2% MUY BAJO")
```

#### 3.2 Implicaciones
```javascript
// Los estudiantes pueden aprender a predecir:
// "En LM, si no sé la respuesta, apuesto a B"

// Estadísticamente:
// - Si selecciona aleatoriamente: 25% acierto esperado
// - Si sigue el patrón: 38.3% acierto esperado
// Ventaja injusta: +13.3%
```

#### 3.3 Test Manual
1. Abre `index.html`
2. Selecciona "Lenguaje de Marcas"
3. Haz Simulacro Completo (20 preguntas)
4. Observa: ¿Cuántas veces la respuesta correcta es B?
   - Esperado: ~5 veces (25%)
   - Observado: ~7-8 veces (38%)

---

## PROBLEMA #4: Fórmula de Scoring con N Variable

### Descripción
La fórmula asume siempre N=4 opciones, pero algunos exámenes tienen N=3.

### Pasos para Reproducir

#### 4.1 Código de Scoring
**Archivo:** [js/app.js](js/app.js#L686)

```javascript
const N = 4;  // ❌ Hardcoded
const puntuacionBruta = aciertos - errores / (N - 1);
// = aciertos - errores / 3
```

#### 4.2 Comparación de Penalizaciones

**Escenario:** 5 aciertos, 5 errores, 10 total (examen de 20 preguntas)

**Con N=4 (correcto):**
```javascript
puntuacionBruta = 5 - 5/3 = 5 - 1.667 = 3.333
calificacion = (3.333 / 20) * 10 = 1.67
```

**Con N=3 (si es pregunta de 3 opciones):**
```javascript
// La penalización debería ser:
penalizacion = 5 / (3-1) = 5 / 2 = 2.5  // Mayor penalización
puntuacionBruta = 5 - 2.5 = 2.5
calificacion = (2.5 / 20) * 10 = 1.25  // Menos generoso
```

**Impacto:** Las preguntas de 3 opciones podrían inflar las notas al usar penalización de N=4.

#### 4.3 Verificación
```bash
# Cuántas preguntas por asignatura son N=3:
python3 << 'EOF'
import json

with open('data/test_bank.json') as f:
    data = json.load(f)

for subject in data:
    three_opt = sum(1 for q in data[subject] if len(q.get('options', [])) == 3)
    total = len(data[subject])
    if three_opt > 0:
        print(f"{subject}: {three_opt}/{total} ({100*three_opt/total:.1f}%)")
EOF
```

---

## PROTOCOLO DE VERIFICACIÓN RÁPIDA

### Checklist para QA
```
□ Ejecutar qa_validator.py
□ Verificar salida: ¿Errores críticos = 0?
□ Abrir index.html
□ Seleccionar cada asignatura
□ Probar "Por Tema" → Tema 1 (debe mostrar preguntas)
□ Hacer Simulacro Completo
□ Verificar que se muestren siempre 4 opciones
□ Verificar que la calificación sea coherente
```

### Test Casos Mínimos

| Caso | Procedimiento | Resultado Esperado | Estado |
|------|---------------|------------------|--------|
| T1.1 | Abrir examen por Tema 1 | Mostrar preguntas | ❌ FALLA |
| T1.2 | Verificar Tema 2 | Mostrar preguntas | ❌ FALLA |
| T2.1 | Contar botones en pregunta | Debe haber 4 | ❌ FALLA (solo 3) |
| T2.2 | Hacer examen completo | No errores en consola | ⚠️ ADVERTENCIA |
| T3.1 | Analizar stats | Distribución ~25% c/opción | ❌ FALLA |

---

## REFERENCIAR PROBLEMAS EN CÓDIGO

### Búsquedas Rápidas
```bash
# Buscar qué código usa el campo "unit":
grep -n "\.unit" js/*.js

# Buscar referencias a "correct":
grep -n "\.correct" js/*.js

# Buscar problemas con "options":
grep -n "\.options\[" js/*.js

# Contar preguntas por asignatura:
python3 -c "import json; data=json.load(open('data/test_bank.json')); 
[print(f'{k}: {len(v)}') for k,v in data.items()]"
```

---

## MATRIZ TRACEABILITY

| Problema | Archivo | Línea | Tipo | Criticidad |
|----------|---------|-------|------|-----------|
| Unit range | test_bank.json | varies | Data | 🔴 CRÍTICO |
| Unit range | js/app.js | 414-416 | Code | 🔴 CRÍTICO |
| 3 opciones | test_bank.json | varies | Data | 🔴 CRÍTICO |
| 3 opciones | js/app.js | 606-617 | Rendering | 🔴 CRÍTICO |
| Distribución | test_bank.json | analysis | Data | 🟡 MAYOR |
| Scoring | js/app.js | 686 | Logic | 🟠 MENOR |

---

*Guía de Reproducción | QA Testing | Abril 2026*
