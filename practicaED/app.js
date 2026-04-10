// =============================================
// APP — Main Application Logic
// =============================================

let currentUnit = null;
let completedSections = new Set();
let score = { correct: 0, wrong: 0 };
let activeSection = null;

// Quiz state
let quizState = { questions: [], current: 0, answered: false };

// Drag state
let dragState = { exercises: [], current: 0, score: 0 };

// ---- INIT ----
function selectUnit(unitId) {
  currentUnit = unitId;
  const unit = UNITS[unitId];
  document.getElementById('splash').classList.add('hidden');
  document.getElementById('app').classList.remove('hidden');
  document.getElementById('topbar-unit').textContent = unit.label;
  document.getElementById('topbar-title').textContent = unit.title;
  buildSidebar(unit);
  showWelcome();
}

function goHome() {
  document.getElementById('splash').classList.remove('hidden');
  document.getElementById('app').classList.add('hidden');
  currentUnit = null;
  activeSection = null;
  score = { correct: 0, wrong: 0 };
  document.querySelector('#score-correct span').textContent = '0';
  document.querySelector('#score-wrong span').textContent = '0';
}

function buildSidebar(unit) {
  const nav = document.getElementById('sidebar-nav');
  nav.innerHTML = `<div class="sidebar-section">${unit.label} — ${unit.title}</div>`;
  unit.sections.forEach(s => {
    const div = document.createElement('div');
    div.className = 'sidebar-item';
    div.id = 'nav-' + s.id;
    div.innerHTML = `<span class="item-icon">${s.icon}</span><span>${s.label}</span>${completedSections.has(s.id) ? '<span class="item-done">✓</span>' : ''}`;
    div.onclick = () => openSection(s);
    nav.appendChild(div);
  });
  updateProgress();
}

function openSection(section) {
  // Deactivate previous
  if (activeSection) {
    const prev = document.getElementById('nav-' + activeSection);
    if (prev) prev.classList.remove('active');
  }
  activeSection = section.id;
  const el = document.getElementById('nav-' + section.id);
  if (el) el.classList.add('active');

  hideAllViews();
  if (section.type === 'lesson') showLesson(section.lessonId);
  else if (section.type === 'quiz') showQuiz(section.quizId);
  else if (section.type === 'drag') showDrag(section.dragId);
  else if (section.type === 'diagram') showDiagrams(section.diagId);
  else if (section.type === 'lab') showLab();
  else if (section.type === 'git') showGitLab();
}

function hideAllViews() {
  ['lesson-view','quiz-view','drag-view','diagram-view','lab-view','git-view','welcome-panel'].forEach(id => {
    document.getElementById(id).classList.add('hidden');
  });
}

function showWelcome() {
  hideAllViews();
  document.getElementById('welcome-panel').classList.remove('hidden');
}

// ---- LESSON VIEW ----
function showLesson(lessonId) {
  const data = LESSONS[lessonId];
  const view = document.getElementById('lesson-view');
  view.classList.remove('hidden');

  const svgHtml = LESSON_SVG_MAP[data.svg] ? `<div class="diagram-container">${LESSON_SVG_MAP[data.svg]()}</div>` : '';

  view.innerHTML = `
    <div class="lesson-header">
      <h2>${data.title}</h2>
      <p>${data.subtitle}</p>
    </div>
    <div class="concept-grid">
      ${data.concepts.map(c => `
        <div class="concept-card">
          <h4><span>${c.icon}</span>${c.title}</h4>
          <p>${c.body}</p>
        </div>`).join('')}
    </div>
    <div class="code-block">${data.codeExample}</div>
    <div class="info-box ${data.info.type}">${data.info.text}</div>
    ${svgHtml}
    <div class="lesson-actions">
      <button class="btn-primary" onclick="markDone()">✓ Marcar como repasado</button>
      <button class="btn-secondary" onclick="openModal('${lessonId}')">💡 Ampliar explicación</button>
    </div>`;
}

function markDone() {
  if (activeSection) {
    completedSections.add(activeSection);
    const el = document.getElementById('nav-' + activeSection);
    if (el && !el.querySelector('.item-done')) {
      el.innerHTML += '<span class="item-done">✓</span>';
    }
    updateProgress();
    showToast('¡Sección completada! ✓', 'success');
  }
}

// ---- QUIZ VIEW ----
function showQuiz(quizId) {
  const data = QUIZZES[quizId];
  quizState = {
    questions: [...data.questions].sort(() => Math.random() - .5),
    current: 0,
    answered: false,
    quizId
  };
  renderQuestion();
}

function renderQuestion() {
  const view = document.getElementById('quiz-view');
  view.classList.remove('hidden');
  const { questions, current } = quizState;
  if (current >= questions.length) { renderQuizResult(); return; }
  const q = questions[current];
  const letters = ['A','B','C','D'];
  view.innerHTML = `
    <div class="quiz-header">
      <h2>🧠 Quiz</h2>
      <span class="quiz-counter">Pregunta ${current+1} / ${questions.length}</span>
    </div>
    <div class="question-card">
      <div class="question-text">${q.q}</div>
      <div class="question-hint">💡 ${q.hint}</div>
      <div class="options-grid">
        ${q.opts.map((o,i) => `
          <button class="option-btn" id="opt-${i}" onclick="selectAnswer(${i})">
            <span class="opt-letter">${letters[i]}</span>
            <span>${o}</span>
          </button>`).join('')}
      </div>
      <div class="explanation-box" id="explanation"></div>
    </div>
    <div class="quiz-actions">
      <button class="btn-check" id="btn-next" onclick="nextQuestion()" style="display:none">Siguiente →</button>
    </div>`;
  quizState.answered = false;
}

function selectAnswer(idx) {
  if (quizState.answered) return;
  quizState.answered = true;
  const q = quizState.questions[quizState.current];
  const isCorrect = idx === q.ans;
  // Disable all
  document.querySelectorAll('.option-btn').forEach((btn, i) => {
    btn.disabled = true;
    if (i === q.ans) btn.classList.add('correct');
    else if (i === idx && !isCorrect) btn.classList.add('wrong');
  });
  // Show explanation
  const exp = document.getElementById('explanation');
  exp.classList.add('visible');
  exp.innerHTML = (isCorrect ? '✅ <strong>¡Correcto!</strong> ' : '❌ <strong>Incorrecto.</strong> ') + q.exp;
  // Score
  if (isCorrect) { score.correct++; document.querySelector('#score-correct span').textContent = score.correct; showToast('¡Correcto! 🎉','success'); }
  else { score.wrong++; document.querySelector('#score-wrong span').textContent = score.wrong; showToast('Incorrecto — lee la explicación','error'); }
  document.getElementById('btn-next').style.display = 'inline-flex';
}

function nextQuestion() {
  quizState.current++;
  renderQuestion();
}

function renderQuizResult() {
  const total = quizState.questions.length;
  const correct = quizState.questions.filter((_, i) => i < quizState.current).length;
  const pct = Math.round((score.correct / (score.correct + score.wrong || 1)) * 100);
  const view = document.getElementById('quiz-view');
  const msg = pct >= 80 ? '¡Excelente! Estás listo para el examen 🚀' : pct >= 60 ? 'Buen trabajo, sigue practicando 💪' : 'Repasa la teoría e inténtalo de nuevo 📚';
  view.innerHTML = `
    <div class="quiz-result">
      <div class="result-score">${pct}%</div>
      <div class="result-msg">${msg}</div>
      <p style="color:var(--text2);margin-bottom:2rem">Aciertos: <strong style="color:var(--green)">${score.correct}</strong> · Errores: <strong style="color:var(--red)">${score.wrong}</strong></p>
      <div style="display:flex;gap:1rem;justify-content:center;flex-wrap:wrap">
        <button class="btn-primary" onclick="showQuiz('${quizState.quizId}')">Repetir Quiz 🔁</button>
        <button class="btn-secondary" onclick="showWelcome()">Volver al menú</button>
      </div>
    </div>`;
  completedSections.add(activeSection);
  updateProgress();
}

// ---- DRAG & DROP VIEW ----
let currentDragItem = null;
let dragExerciseIdx = 0;
let dragResults = [];

function showDrag(dragId) {
  const data = DRAG_EXERCISES[dragId];
  dragExerciseIdx = 0;
  dragResults = [];
  renderDragExercise(data);
}

function renderDragExercise(data) {
  const view = document.getElementById('drag-view');
  view.classList.remove('hidden');
  const ex = data.exercises[dragExerciseIdx];
  const total = data.exercises.length;
  // Shuffle chips
  const chips = [...ex.chips].sort(() => Math.random() - .5);

  view.innerHTML = `
    <div class="drag-header">
      <h2>🎯 ${data.title}</h2>
      <p>${data.description}</p>
    </div>
    <div style="margin-bottom:1rem;font-size:.85rem;color:var(--text2)">Ejercicio ${dragExerciseIdx+1} de ${total}</div>
    <div class="drag-exercise">
      <h3>Escenario</h3>
      <div class="drag-scenario">${ex.scenario}</div>
      <p style="font-size:.85rem;color:var(--text2);margin-bottom:.75rem">Arrastra la respuesta correcta a la zona de respuesta:</p>
      <div class="drag-chips" id="chips-pool">
        ${chips.map(c => `<div class="chip chip-default" draggable="true" data-value="${c}" 
          ondragstart="onDragStart(event)" ontouchstart="onTouchStart(event)" ontouchend="onTouchEnd(event)">${c}</div>`).join('')}
      </div>
      <div class="drop-zone-row">
        <div class="drop-zone-label">Tu respuesta:</div>
        <div class="drop-zone" id="answer-zone"
          ondragover="event.preventDefault();this.classList.add('drag-over')"
          ondragleave="this.classList.remove('drag-over')"
          ondrop="onDrop(event)">Suelta aquí</div>
      </div>
      <div id="drag-feedback" style="margin-top:.75rem;font-size:.875rem;display:none"></div>
    </div>
    <div class="drag-actions">
      <button class="btn-check" onclick="checkDrag('${data.exercises[dragExerciseIdx] ? dragExerciseIdx : 0}', ${JSON.stringify(data).split('"').join('&quot;')})">Comprobar ✓</button>
    </div>`;
  setupTouchDrag();
}

function onDragStart(e) {
  currentDragItem = e.target;
  e.dataTransfer.setData('text/plain', e.target.dataset.value);
  e.target.style.opacity = '0.5';
}

function onDrop(e) {
  e.preventDefault();
  const zone = e.currentTarget;
  zone.classList.remove('drag-over');
  if (currentDragItem) {
    // Remove existing chip in zone
    const existing = zone.querySelector('.chip');
    if (existing) {
      document.getElementById('chips-pool').appendChild(existing);
    }
    zone.innerHTML = '';
    const clone = currentDragItem.cloneNode(true);
    clone.classList.remove('chip-default');
    clone.classList.add('chip-answer');
    clone.draggable = false;
    clone.style.opacity = '1';
    zone.appendChild(clone);
    currentDragItem.style.opacity = '0.3';
    currentDragItem.draggable = false;
  }
}

// Touch drag support
let touchChip = null;
let touchClone = null;

function setupTouchDrag() {
  // handled via ontouchstart/end attributes
}

function onTouchStart(e) {
  touchChip = e.currentTarget;
}

function onTouchEnd(e) {
  if (!touchChip) return;
  const zone = document.getElementById('answer-zone');
  if (!zone) return;
  const touch = e.changedTouches[0];
  const rect = zone.getBoundingClientRect();
  if (touch.clientX >= rect.left && touch.clientX <= rect.right &&
      touch.clientY >= rect.top && touch.clientY <= rect.bottom) {
    const existing = zone.querySelector('.chip');
    if (existing) document.getElementById('chips-pool').appendChild(existing);
    zone.innerHTML = '';
    const clone = touchChip.cloneNode(true);
    clone.classList.remove('chip-default');
    clone.classList.add('chip-answer');
    clone.draggable = false;
    zone.appendChild(clone);
    touchChip.style.opacity = '0.3';
  }
  touchChip = null;
}

function checkDrag(idxStr, dataStr) {
  const zone = document.getElementById('answer-zone');
  const chip = zone.querySelector('.chip');
  if (!chip) { showToast('Arrastra una respuesta primero', 'info'); return; }
  const ex = DRAG_EXERCISES;
  // Find the exercise data from current state
  const keys = Object.keys(DRAG_EXERCISES);
  // We need the current drag exercise — use global
  let dragData = null;
  keys.forEach(k => {
    if (DRAG_EXERCISES[k].exercises[dragExerciseIdx] !== undefined) {
      // match by current active section
    }
  });
  // Get from active section
  const activeUnit = UNITS[currentUnit];
  const sec = activeUnit.sections.find(s => s.id === activeSection);
  if (!sec) return;
  const data = DRAG_EXERCISES[sec.dragId];
  const curEx = data.exercises[dragExerciseIdx];
  const userAnswer = chip.dataset.value;
  const isCorrect = userAnswer === curEx.answer;
  dragResults.push(isCorrect);
  // Visual feedback
  chip.classList.remove('chip-answer');
  chip.classList.add(isCorrect ? 'correct-chip' : 'wrong-chip');
  const fb = document.getElementById('drag-feedback');
  fb.style.display = 'block';
  fb.className = `info-box ${isCorrect ? 'success' : 'danger'}`;
  fb.innerHTML = (isCorrect ? '✅ <strong>¡Correcto!</strong> ' : `❌ <strong>Incorrecto.</strong> La respuesta era: <strong>${curEx.answer}</strong>. `) + curEx.explanation;
  if (isCorrect) { score.correct++; document.querySelector('#score-correct span').textContent = score.correct; }
  else { score.wrong++; document.querySelector('#score-wrong span').textContent = score.wrong; }
  // Replace check button
  const actions = document.querySelector('.drag-actions');
  actions.innerHTML = '';
  if (dragExerciseIdx + 1 < data.exercises.length) {
    const btn = document.createElement('button');
    btn.className = 'btn-primary';
    btn.textContent = 'Siguiente ejercicio →';
    btn.onclick = () => { dragExerciseIdx++; renderDragExercise(data); };
    actions.appendChild(btn);
  } else {
    const pct = Math.round((dragResults.filter(Boolean).length / dragResults.length) * 100);
    const msg = pct >= 80 ? '¡Excelente dominio! 🚀' : pct >= 60 ? 'Bien, sigue practicando 💪' : 'Repasa la teoría 📚';
    actions.innerHTML = `
      <div style="width:100%">
        <div class="result-score" style="font-size:2.5rem">${pct}%</div>
        <p style="color:var(--text2);margin-bottom:1rem">${msg} · ${dragResults.filter(Boolean).length}/${dragResults.length} acertados</p>
        <div style="display:flex;gap:1rem;flex-wrap:wrap">
          <button class="btn-primary" onclick="showDrag('${sec.dragId}')">Repetir 🔁</button>
          <button class="btn-secondary" onclick="showWelcome()">Menú</button>
        </div>
      </div>`;
    completedSections.add(activeSection);
    updateProgress();
  }
}

// ---- DIAGRAM VIEW ----
const DIAGRAM_LABELS = {
  clase_simple: 'Clase básica con visibilidad',
  herencia: 'Herencia (Generalización)',
  relaciones_completo: 'Composición, Agregación y más',
  interfaces: 'Realización de Interfaces',
  casos_uso: 'Casos de Uso con include',
  secuencia_login: 'Secuencia: Proceso de Login',
  estados_factura: 'Estados de una Factura',
  actividad_compra: 'Actividad: Proceso de Compra'
};

const DIAGRAM_TIPS = {
  clase_simple: 'Fíjate en los colores: verde=público (+), rojo=privado (-), amarillo=protegido (#).',
  herencia: 'La flecha triangular vacía siempre apunta hacia la SUPERCLASE (clase padre).',
  relaciones_completo: 'Diamante RELLENO (rojo) = composición fuerte. Diamante VACÍO (azul) = agregación débil.',
  interfaces: 'La línea discontinua con flecha triangular vacía indica REALIZACIÓN (implementar interfaz).',
  casos_uso: 'Include (obligatorio): la flecha va del caso base al incluido. Recuerda que los actores van FUERA del rectángulo.',
  secuencia_login: 'Las barras verticales son las activaciones. El marco "alt" es el equivalente a un if-else.',
  estados_factura: 'El círculo negro es el estado inicial. El círculo doble es el estado final. Las flechas son transiciones.',
  actividad_compra: 'El rombo amarillo es la decisión (bifurcación). Las actividades son los rectángulos redondeados.'
};

let currentDiagIdx = 0;
let currentDiagItems = [];

function showDiagrams(diagId) {
  const data = DIAGRAMS[diagId];
  currentDiagItems = data.items;
  currentDiagIdx = 0;
  renderDiagram(data);
}

function renderDiagram(data) {
  const view = document.getElementById('diagram-view');
  view.classList.remove('hidden');
  const key = currentDiagItems[currentDiagIdx];
  const label = DIAGRAM_LABELS[key] || key;
  const tip = DIAGRAM_TIPS[key] || '';
  const svgFn = SVG_MAP[key];
  const svgHtml = svgFn ? svgFn() : '<p>Diagrama no disponible</p>';

  view.innerHTML = `
    <div class="diagram-header">
      <h2>📐 ${data.title}</h2>
      <p>Diagrama ${currentDiagIdx+1} de ${currentDiagItems.length}: <strong>${label}</strong></p>
    </div>
    <div class="diagram-canvas-wrap">${svgHtml}</div>
    ${tip ? `<div class="info-box tip">💡 ${tip}</div>` : ''}
    <div style="display:flex;gap:1rem;margin-top:1.25rem;flex-wrap:wrap">
      ${currentDiagIdx > 0 ? `<button class="btn-secondary" onclick="navDiag(-1)">← Anterior</button>` : ''}
      ${currentDiagIdx < currentDiagItems.length-1 
        ? `<button class="btn-primary" onclick="navDiag(1)">Siguiente →</button>`
        : `<button class="btn-primary" onclick="markDone();showWelcome()">✓ Completado</button>`}
    </div>`;
}

function navDiag(dir) {
  currentDiagIdx = Math.max(0, Math.min(currentDiagItems.length-1, currentDiagIdx + dir));
  const unit = UNITS[currentUnit];
  const sec = unit.sections.find(s => s.id === activeSection);
  renderDiagram(DIAGRAMS[sec.diagId]);
}

// ---- MODAL ----
const MODAL_CONTENT = {
  notacion: {
    title: '📖 Notación de Clases — Ampliación',
    body: `<p>Una clase UML es la plantilla de un objeto. Se compone de:</p>
<ul>
  <li><strong>Compartimento de nombre</strong>: nombre de la clase (más estereotipo si aplica)</li>
  <li><strong>Compartimento de atributos</strong>: variables de instancia con su tipo</li>
  <li><strong>Compartimento de operaciones</strong>: métodos con parámetros y tipo de retorno</li>
</ul>
<div class="code-block">
<span class="vis-pub">+</span> <span class="nm">attr</span> : <span class="tp">tipo</span> = valorDefecto
<span class="vis-pub">+</span> <span class="nm">metodo</span>(param : <span class="tp">tipo</span>) : <span class="tp">tipoRetorno</span>
</div>
<p><strong>Regla mnemotécnica visibilidad</strong>:<br>
<code>+</code> <em>Público</em> = "para todos" (P de Plus/Público)<br>
<code>-</code> <em>Privado</em> = "solo yo" (menos=restrictivo)<br>
<code>#</code> <em>Protegido</em> = "familia" (herencia)<br>
<code>~</code> <em>Paquete</em> = "compañeros de piso" (mismo paquete)</p>`
  },
  relaciones: {
    title: '🔗 Relaciones — Ampliación',
    body: `<p><strong>Regla de oro</strong>: ¿Puedo decir "es un"? → Herencia. ¿"Tiene un y es parte vital"? → Composición. ¿"Tiene un pero puede vivir sin"? → Agregación.</p>
<ul>
  <li><strong>Herencia</strong>: línea continua + △ vacío → superclase</li>
  <li><strong>Realización</strong>: línea discontinua + △ vacío → interfaz</li>
  <li><strong>Composición</strong>: línea + ◆ relleno (negro/rojo)</li>
  <li><strong>Agregación</strong>: línea + ◇ vacío (azul/blanco)</li>
  <li><strong>Dependencia</strong>: línea discontinua + → + «use»</li>
  <li><strong>Asociación</strong>: línea continua (± multiplicidad)</li>
</ul>
<p><strong>Multiplicidad común</strong>: <code>1</code> = exactamente uno, <code>*</code> = cero o más, <code>0..1</code> = opcional, <code>1..*</code> = uno o más, <code>m..n</code> = rango.</p>`
  },
  casos_uso: {
    title: '⭕ Casos de Uso — Ampliación',
    body: `<p><strong>«include» vs «extend» — La diferencia clave:</strong></p>
<ul>
  <li><strong>Include</strong>: obligatorio, siempre ocurre. Flecha del BASE al INCLUIDO.</li>
  <li><strong>Extend</strong>: opcional, ocurre bajo condición. Flecha del EXTENSOR al BASE.</li>
</ul>
<p><strong>Regla práctica</strong>: si el comportamiento SIEMPRE ocurre → include. Si SOLO A VECES → extend.</p>
<p><strong>Punto de extensión</strong>: en «extend» se puede indicar en qué punto exacto del caso base se "engancha" la extensión. Ej: <code>extension points: pago_especial</code></p>
<p><strong>Generalización entre actores</strong>: el actor hijo hereda todos los casos de uso del padre más los suyos propios.</p>`
  },
  secuencia: {
    title: '⏱️ Secuencia — Ampliación',
    body: `<p><strong>Cómo leer un diagrama de secuencia</strong>:</p>
<ol>
  <li>Lee de arriba a abajo (orden temporal)</li>
  <li>Cada columna = un objeto/actor</li>
  <li>Las flechas horizontales = mensajes</li>
  <li>Los rectángulos sobre la lifeline = activaciones</li>
</ol>
<p><strong>Fragmentos combinados</strong>:</p>
<ul>
  <li><code>alt</code> → if/else (varias secciones con condiciones [guard])</li>
  <li><code>opt</code> → if sin else (solo si se cumple)</li>
  <li><code>loop</code> → repetición mientras condición</li>
  <li><code>break</code> → interrumpe el flujo</li>
  <li><code>ref</code> → referencia a otro diagrama de secuencia</li>
  <li><code>par</code> → ejecución paralela</li>
</ul>`
  },
  estados: {
    title: '🔄 Estados y Actividad — Ampliación',
    body: `<p><strong>Diagrama de Estados</strong>: modela el ciclo de vida de UN objeto. Los estados son situaciones estables.</p>
<p>Transición: <code>evento [guarda] / acción</code></p>
<div class="code-block">PENDIENTE --[pagar]--> PAGADA / enviarRecibo()</div>
<p><strong>Elementos especiales</strong>: estado compuesto (un estado contiene otros), pseudoestado de historial, estado de elección.</p>
<br>
<p><strong>Diagrama de Actividad</strong>: modela un proceso o flujo de trabajo.</p>
<ul>
  <li>Nodo inicial: círculo negro</li>
  <li>Actividad: rectángulo redondeado</li>
  <li>Decisión: rombo (con condiciones en las ramas)</li>
  <li>Fork: barra gruesa que divide en flujos paralelos</li>
  <li>Join: barra gruesa que une flujos paralelos</li>
  <li>Nodo final: círculo doble</li>
</ul>`
  }
};

function openModal(lessonId) {
  const data = MODAL_CONTENT[lessonId];
  if (!data) return;
  document.getElementById('modal-content').innerHTML = `<h3>${data.title}</h3>${data.body}`;
  document.getElementById('modal-overlay').classList.remove('hidden');
}

function closeModal() {
  document.getElementById('modal-overlay').classList.add('hidden');
}

// ---- PROGRESS ----
function updateProgress() {
  if (!currentUnit) return;
  const total = UNITS[currentUnit].sections.length;
  const done = UNITS[currentUnit].sections.filter(s => completedSections.has(s.id)).length;
  const pct = total ? Math.round((done / total) * 100) : 0;
  document.getElementById('progress-bar').style.width = pct + '%';
  document.getElementById('progress-pct').textContent = pct + '%';
}

// ---- TOAST ----
let toastTimer = null;
function showToast(msg, type = 'info') {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.className = `toast ${type} show`;
  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { t.classList.remove('show'); }, 2600);
}
