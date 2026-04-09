// =============================================
// PROG LAB — APP
// =============================================
let currentUnit = null, completedSections = new Set(), score = { correct: 0, wrong: 0 }, activeSection = null;
let quizState = { questions: [], current: 0, answered: false };
let currentDragItem = null, dragExerciseIdx = 0, dragResults = [];
let codeState = { exercises: [], current: 0 };
let touchChip = null, toastTimer = null;

function selectUnit(unitId) {
  currentUnit = unitId;
  const unit = UNITS[unitId];
  document.getElementById('splash').classList.add('hidden');
  document.getElementById('app').classList.remove('hidden');
  document.getElementById('topbar-unit').textContent = unit.label;
  document.getElementById('topbar-title').textContent = unit.title;
  buildSidebar(unit); showWelcome();
}

function goHome() {
  document.getElementById('splash').classList.remove('hidden');
  document.getElementById('app').classList.add('hidden');
  currentUnit = null; activeSection = null;
  score = { correct: 0, wrong: 0 };
  document.querySelector('#score-correct span').textContent = '0';
  document.querySelector('#score-wrong span').textContent = '0';
}

function buildSidebar(unit) {
  const nav = document.getElementById('sidebar-nav');
  nav.innerHTML = `<div class="sidebar-section">${unit.label} — ${unit.title}</div>`;
  unit.sections.forEach(s => {
    const div = document.createElement('div');
    div.className = 'sidebar-item'; div.id = 'nav-' + s.id;
    div.innerHTML = `<span class="item-icon">${s.icon}</span><span>${s.label}</span>${completedSections.has(s.id) ? '<span class="item-done">✓</span>' : ''}`;
    div.onclick = () => openSection(s);
    nav.appendChild(div);
  });
  updateProgress();
}

function openSection(section) {
  if (activeSection) { const p = document.getElementById('nav-' + activeSection); if (p) p.classList.remove('active'); }
  activeSection = section.id;
  const el = document.getElementById('nav-' + section.id);
  if (el) el.classList.add('active');
  hideAllViews();
  if (section.type === 'lesson') showLesson(section.lessonId);
  else if (section.type === 'quiz') showQuiz(section.quizId);
  else if (section.type === 'drag') showDrag(section.dragId);
  else if (section.type === 'code') showCodeLab(section.codeId);
  else if (section.type === 'ejercicio') showEjercicio(section.ejercicioId);
  else if (section.type === 'tutor') renderTutorSplash();
}

function hideAllViews() {
  ['lesson-view','quiz-view','drag-view','code-view','ejercicio-view','tutor-view','welcome-panel'].forEach(id => {
    const el = document.getElementById(id); if (el) el.classList.add('hidden');
  });
}

function showWelcome() { hideAllViews(); document.getElementById('welcome-panel').classList.remove('hidden'); }

// ── LESSON ──────────────────────────────────────────────────────
function showLesson(lessonId) {
  const data = LESSONS[lessonId];
  const view = document.getElementById('lesson-view');
  view.classList.remove('hidden');
  view.innerHTML = `
    <div class="lesson-header"><h2>${data.title}</h2><p>${data.subtitle}</p></div>
    <div class="concept-grid">${data.concepts.map(c => `
      <div class="concept-card"><h4><span>${c.icon}</span>${c.title}</h4><p>${c.body}</p></div>`).join('')}
    </div>
    <div class="code-block">${data.codeExample}</div>
    <div class="info-box ${data.info.type}">${data.info.text}</div>
    <div class="lesson-actions"><button class="btn-primary" onclick="markDone()">✓ Marcar como repasado</button></div>`;
}

function markDone() {
  if (activeSection) {
    completedSections.add(activeSection);
    const el = document.getElementById('nav-' + activeSection);
    if (el && !el.querySelector('.item-done')) el.innerHTML += '<span class="item-done">✓</span>';
    updateProgress(); showToast('¡Sección completada! ✓', 'success');
  }
}

// ── QUIZ ─────────────────────────────────────────────────────────
function showQuiz(quizId) {
  const data = QUIZZES[quizId];
  quizState = { questions: [...data.questions].sort(() => Math.random() - .5), current: 0, answered: false, quizId };
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
    <div class="quiz-header"><h2>🧠 Quiz</h2><span class="quiz-counter">Pregunta ${current+1} / ${questions.length}</span></div>
    <div class="question-card">
      <div class="question-text">${q.q}</div>
      <div class="question-hint">💡 ${q.hint}</div>
      <div class="options-grid">${q.opts.map((o,i) => `
        <button class="option-btn" id="opt-${i}" onclick="selectAnswer(${i})">
          <span class="opt-letter">${letters[i]}</span><span>${o}</span>
        </button>`).join('')}
      </div>
      <div class="explanation-box" id="explanation"></div>
    </div>
    <div class="quiz-actions" style="display:flex;justify-content:space-between;align-items:center;width:100%">
      <button class="btn-secondary" id="skip-btn" onclick="skipQuizQuestion()" style="background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);padding:0.6rem 1.2rem;border-radius:8px;color:var(--text-secondary);cursor:pointer;">⏭️ Saltar</button>
      <button class="btn-check" id="btn-next" onclick="nextQuestion()" style="display:none">Siguiente →</button>
    </div>`;
  quizState.answered = false;
}

function selectAnswer(idx) {
  if (quizState.answered) return;
  quizState.answered = true;
  const q = quizState.questions[quizState.current];
  const isCorrect = idx === q.ans;
  document.querySelectorAll('.option-btn').forEach((btn, i) => {
    btn.disabled = true;
    if (i === q.ans) btn.classList.add('correct');
    else if (i === idx && !isCorrect) btn.classList.add('wrong');
  });
  const exp = document.getElementById('explanation');
  exp.classList.add('visible');
  exp.innerHTML = (isCorrect ? '✅ <strong>¡Correcto!</strong> ' : '❌ <strong>Incorrecto.</strong> ') + q.exp;
  if (isCorrect) { score.correct++; document.querySelector('#score-correct span').textContent = score.correct; showToast('¡Correcto! 🎉','success'); }
  else { score.wrong++; document.querySelector('#score-wrong span').textContent = score.wrong; showToast('Incorrecto','error'); }
  document.getElementById('btn-next').style.display = 'inline-flex';
  const skipBtn = document.getElementById('skip-btn');
  if (skipBtn) skipBtn.style.display = 'none';
}

function skipQuizQuestion() {
  quizState.current++;
  renderQuestion();
}

function nextQuestion() { quizState.current++; renderQuestion(); }

function renderQuizResult() {
  const pct = Math.round((score.correct / (score.correct + score.wrong || 1)) * 100);
  const msg = pct >= 80 ? '¡Excelente! 🚀' : pct >= 60 ? 'Buen trabajo 💪' : 'Repasa la teoría 📚';
  document.getElementById('quiz-view').innerHTML = `
    <div class="quiz-result">
      <div class="result-score">${pct}%</div>
      <div class="result-msg">${msg}</div>
      <p style="color:var(--text2);margin-bottom:2rem">Aciertos: <strong style="color:var(--green)">${score.correct}</strong> · Errores: <strong style="color:var(--red)">${score.wrong}</strong></p>
      <div style="display:flex;gap:1rem;justify-content:center;flex-wrap:wrap">
        <button class="btn-primary" onclick="showQuiz('${quizState.quizId}')">Repetir 🔁</button>
        <button class="btn-secondary" onclick="showWelcome()">Menú</button>
      </div>
    </div>`;
  completedSections.add(activeSection); updateProgress();
}

// ── DRAG ─────────────────────────────────────────────────────────
function showDrag(dragId) { dragExerciseIdx = 0; dragResults = []; renderDragExercise(DRAG_EXERCISES[dragId]); }

function renderDragExercise(data) {
  const view = document.getElementById('drag-view');
  view.classList.remove('hidden');
  const ex = data.exercises[dragExerciseIdx];
  const chips = [...ex.chips].sort(() => Math.random() - .5);
  view.innerHTML = `
    <div class="drag-header"><h2>🎯 ${data.title}</h2><p>${data.description}</p></div>
    <div style="margin-bottom:1rem;font-size:.85rem;color:var(--text2)">Ejercicio ${dragExerciseIdx+1} de ${data.exercises.length}</div>
    <div class="drag-exercise">
      <h3>Escenario</h3>
      <div class="drag-scenario">${ex.scenario}</div>
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
      <div id="drag-feedback" style="margin-top:.75rem;display:none"></div>
    </div>
    <div class="drag-actions"><button class="btn-check" onclick="checkDrag('${Object.keys(DRAG_EXERCISES).find(k => DRAG_EXERCISES[k] === data)}')">Comprobar ✓</button></div>`;
}

function onDragStart(e) { currentDragItem = e.target; e.dataTransfer.setData('text/plain', e.target.dataset.value); e.target.style.opacity = '0.5'; }
function onDrop(e) {
  e.preventDefault(); const zone = e.currentTarget; zone.classList.remove('drag-over');
  if (currentDragItem) {
    const existing = zone.querySelector('.chip'); if (existing) document.getElementById('chips-pool').appendChild(existing);
    zone.innerHTML = '';
    const clone = currentDragItem.cloneNode(true); clone.classList.remove('chip-default'); clone.classList.add('chip-answer'); clone.draggable = false; clone.style.opacity = '1';
    zone.appendChild(clone); currentDragItem.style.opacity = '0.3'; currentDragItem.draggable = false;
  }
}
function onTouchStart(e) { touchChip = e.currentTarget; }
function onTouchEnd(e) {
  if (!touchChip) return;
  const zone = document.getElementById('answer-zone'); if (!zone) return;
  const touch = e.changedTouches[0]; const rect = zone.getBoundingClientRect();
  if (touch.clientX >= rect.left && touch.clientX <= rect.right && touch.clientY >= rect.top && touch.clientY <= rect.bottom) {
    const existing = zone.querySelector('.chip'); if (existing) document.getElementById('chips-pool').appendChild(existing);
    zone.innerHTML = '';
    const clone = touchChip.cloneNode(true); clone.classList.remove('chip-default'); clone.classList.add('chip-answer'); clone.draggable = false;
    zone.appendChild(clone); touchChip.style.opacity = '0.3';
  }
  touchChip = null;
}

function checkDrag(dragId) {
  const zone = document.getElementById('answer-zone');
  const chip = zone.querySelector('.chip');
  if (!chip) { showToast('Arrastra una respuesta primero', 'info'); return; }
  const data = DRAG_EXERCISES[dragId];
  const curEx = data.exercises[dragExerciseIdx];
  const isCorrect = chip.dataset.value === curEx.answer;
  dragResults.push(isCorrect);
  chip.classList.remove('chip-answer'); chip.classList.add(isCorrect ? 'correct-chip' : 'wrong-chip');
  const fb = document.getElementById('drag-feedback');
  fb.style.display = 'block'; fb.className = `info-box ${isCorrect ? 'success' : 'danger'}`;
  fb.innerHTML = (isCorrect ? '✅ <strong>¡Correcto!</strong> ' : `❌ <strong>Incorrecto.</strong> Era: <strong>${curEx.answer}</strong>. `) + curEx.explanation;
  if (isCorrect) { score.correct++; document.querySelector('#score-correct span').textContent = score.correct; }
  else { score.wrong++; document.querySelector('#score-wrong span').textContent = score.wrong; }
  const actions = document.querySelector('.drag-actions'); actions.innerHTML = '';
  if (dragExerciseIdx + 1 < data.exercises.length) {
    const btn = document.createElement('button'); btn.className = 'btn-primary'; btn.textContent = 'Siguiente →';
    btn.onclick = () => { dragExerciseIdx++; renderDragExercise(data); }; actions.appendChild(btn);
  } else {
    const pct = Math.round((dragResults.filter(Boolean).length / dragResults.length) * 100);
    actions.innerHTML = `<div style="width:100%"><div class="result-score" style="font-size:2.5rem">${pct}%</div>
      <p style="color:var(--text2);margin-bottom:1rem">${dragResults.filter(Boolean).length}/${dragResults.length} acertados</p>
      <div style="display:flex;gap:1rem;flex-wrap:wrap">
        <button class="btn-primary" onclick="showDrag('${dragId}')">Repetir 🔁</button>
        <button class="btn-secondary" onclick="showWelcome()">Menú</button>
      </div></div>`;
    completedSections.add(activeSection); updateProgress();
  }
}

// ── CODE LAB ─────────────────────────────────────────────────────
function showCodeLab(codeId) {
  const labData = CODE_LABS[codeId];
  codeState = { exercises: labData.exercises, current: 0 };
  renderCodeExercise(labData);
}

function renderCodeExercise(labData) {
  const view = document.getElementById('code-view');
  view.classList.remove('hidden');
  const ex = codeState.exercises[codeState.current];
  const total = codeState.exercises.length;

  view.innerHTML = `
    <div class="code-header">
      <h2>⌨️ ${labData.title}</h2>
      <p>${labData.description}</p>
    </div>
    <div class="code-exercise-desc">
      <h4>Ejercicio ${codeState.current+1}/${total}: ${ex.title}</h4>
      <p>${ex.desc}</p>
      <p class="hint">💡 ${ex.hint}</p>
    </div>
    <div style="margin-top:1rem" class="code-workspace">
      <div class="code-pane">
        <div class="code-pane-label">📝 Tu código Java</div>
        <textarea class="code-textarea" id="code-input" spellcheck="false">${ex.starter}</textarea>
        <div class="code-actions">
          <button class="btn-run" onclick="analyzeCode()">🔍 Analizar Código</button>
          <div class="code-nav">
            <button onclick="prevCodeEx()" ${codeState.current === 0 ? 'disabled' : ''}>← Anterior</button>
            <span>${codeState.current+1} / ${total}</span>
            <button onclick="nextCodeEx()" ${codeState.current === total-1 ? 'disabled' : ''}>Siguiente →</button>
          </div>
        </div>
      </div>
      <div class="code-pane">
        <div class="code-pane-label">✅ Verificación de Requisitos</div>
        <div id="code-output" class="code-output">
          <span class="out-info">Escribe tu código y pulsa "Analizar" para verificar los requisitos.</span>
        </div>
      </div>
    </div>`;
}

function analyzeCode() {
  const code = document.getElementById('code-input')?.value || '';
  const ex = codeState.exercises[codeState.current];
  const output = document.getElementById('code-output');
  let allPass = true;
  let html = '';

  ex.checks.forEach(check => {
    const pass = check.test(code);
    if (!pass) allPass = false;
    html += `<div class="test-result ${pass ? 'pass' : 'fail'}">${pass ? '✅' : '❌'} ${check.desc}</div>`;
  });

  if (allPass) {
    html += `<div style="margin-top:1rem;padding:1rem;background:var(--green-bg);border:1px solid rgba(34,211,160,.3);border-radius:8px;color:var(--green)">
      🎉 <strong>¡Todos los requisitos cumplidos!</strong> Buen trabajo.
    </div>`;
    score.correct++; document.querySelector('#score-correct span').textContent = score.correct;
    completedSections.add(activeSection); updateProgress();
    showToast('¡Ejercicio completado! 🎉', 'success');
  } else {
    const passed = ex.checks.filter(c => c.test(code)).length;
    html += `<div style="margin-top:1rem;padding:.75rem 1rem;background:var(--yellow-bg);border:1px solid rgba(251,191,36,.3);border-radius:8px;color:var(--yellow)">
      ${passed}/${ex.checks.length} requisitos cumplidos. Sigue trabajando.
    </div>`;
  }

  output.innerHTML = html;
}

function prevCodeEx() {
  if (codeState.current > 0) {
    codeState.current--;
    const unit = UNITS[currentUnit];
    const sec = unit.sections.find(s => s.id === activeSection);
    renderCodeExercise(CODE_LABS[sec.codeId]);
  }
}

function nextCodeEx() {
  if (codeState.current < codeState.exercises.length - 1) {
    codeState.current++;
    const unit = UNITS[currentUnit];
    const sec = unit.sections.find(s => s.id === activeSection);
    renderCodeExercise(CODE_LABS[sec.codeId]);
  }
}

// ── PROGRESS & TOAST ─────────────────────────────────────────────
function updateProgress() {
  if (!currentUnit) return;
  const total = UNITS[currentUnit].sections.length;
  const done = UNITS[currentUnit].sections.filter(s => completedSections.has(s.id)).length;
  const pct = total ? Math.round((done / total) * 100) : 0;
  document.getElementById('progress-bar').style.width = pct + '%';
  document.getElementById('progress-pct').textContent = pct + '%';
}

function showToast(msg, type = 'info') {
  const t = document.getElementById('toast');
  t.textContent = msg; t.className = `toast ${type} show`;
  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 2600);
}

function closeModal() { document.getElementById('modal-overlay').classList.add('hidden'); }

// ── EJERCICIOS PRÁCTICOS ─────────────────────────────────────────
let ejercicioState = { showPistas: false, showSolucion: false };

function showEjercicio(ejercicioId) {
  const ej = EJERCICIOS.find(e => e.id === ejercicioId);
  if (!ej) return;
  ejercicioState = { showPistas: false, showSolucion: false };
  renderEjercicio(ej);
}

function renderEjercicio(ej) {
  const view = document.getElementById('ejercicio-view');
  view.classList.remove('hidden');

  view.innerHTML = `
    <div class="ej-paper">
      <div class="ej-header">
        <div class="ej-meta">
          <span class="ej-badge">${ej.nivel} ${ej.temas.join(' · ')}</span>
          <span class="ej-tiempo">⏱ ${ej.tiempo}</span>
        </div>
        <h2 class="ej-titulo">${ej.titulo}</h2>
        <p class="ej-subtitulo">Ejercicio tipo examen — en papel, sin IDE, sin errores de sintaxis</p>
      </div>

      <div class="ej-enunciado">
        <h3>📋 Enunciado</h3>
        <div class="ej-enunciado-text">${ej.enunciado}</div>
      </div>

      <div class="ej-workspace">
        <div class="ej-pane-label">✏️ Tu solución (escribe aquí como si fuera papel)</div>
        <textarea class="ej-textarea" id="ej-input" placeholder="Escribe tu código Java aquí...
// No te preocupes por la sintaxis exacta
// Lo importante es la lógica y la estructura
// Usa comentarios para explicar tu razonamiento"></textarea>
        <div class="ej-actions">
          <button class="btn-primary" onclick="checkEjercicio('${ej.id}')">✅ Verificar criterios</button>
          <button class="btn-secondary" onclick="togglePistas('${ej.id}')" id="btn-pistas">
            💡 ${ejercicioState.showPistas ? 'Ocultar pistas' : 'Ver pistas'}
          </button>
          <button class="btn-secondary" onclick="toggleSolucion('${ej.id}')" id="btn-solucion">
            👁 ${ejercicioState.showSolucion ? 'Ocultar solución' : 'Ver solución'}
          </button>
        </div>
        <div id="ej-feedback"></div>
      </div>

      <div id="pistas-panel" class="ej-pistas ${ejercicioState.showPistas ? '' : 'hidden'}">
        <h3>💡 Pistas</h3>
        <ul class="pistas-list">
          ${ej.pistas.map(p => `<li>${p}</li>`).join('')}
        </ul>
      </div>

      <div id="solucion-panel" class="ej-solucion ${ejercicioState.showSolucion ? '' : 'hidden'}">
        <h3>✅ Solución de referencia</h3>
        <div class="info-box warning" style="margin-bottom:1rem">⚠️ Intenta resolverlo antes de ver la solución. En el examen no la tendrás.</div>
        <div class="code-block">${ej.solucion}</div>
      </div>

      <div class="ej-criterios">
        <h3>📊 Criterios de evaluación</h3>
        <ul class="criterios-list" id="criterios-list">
          ${ej.criterios.map((c, i) => `<li id="criterio-${i}" class="criterio-item">⬜ ${c}</li>`).join('')}
        </ul>
      </div>
    </div>`;
}

function togglePistas(ejId) {
  ejercicioState.showPistas = !ejercicioState.showPistas;
  const panel = document.getElementById('pistas-panel');
  const btn = document.getElementById('btn-pistas');
  if (panel) panel.classList.toggle('hidden', !ejercicioState.showPistas);
  if (btn) btn.textContent = ejercicioState.showPistas ? '💡 Ocultar pistas' : '💡 Ver pistas';
}

function toggleSolucion(ejId) {
  ejercicioState.showSolucion = !ejercicioState.showSolucion;
  const panel = document.getElementById('solucion-panel');
  const btn = document.getElementById('btn-solucion');
  if (panel) panel.classList.toggle('hidden', !ejercicioState.showSolucion);
  if (btn) btn.textContent = ejercicioState.showSolucion ? '👁 Ocultar solución' : '👁 Ver solución';
}

function checkEjercicio(ejId) {
  const ej = EJERCICIOS.find(e => e.id === ejId);
  const code = document.getElementById('ej-input')?.value || '';
  if (!code.trim()) { showToast('Escribe tu solución primero', 'info'); return; }

  const codeLower = code.toLowerCase();
  let passed = 0;

  // Check each criterion against the code
  const checks = {
    'ej1': [
      () => /abstract\s+class\s+persona/i.test(code),
      () => /extends\s+persona/i.test(code) && /super\s*\(/i.test(code),
      () => /class\s+directivo/i.test(code) && /calcularbonus/i.test(code),
      () => /interface\s+gestionable/i.test(code) && /implements\s+gestionable/i.test(code),
      () => /arraylist\s*<\s*persona/i.test(code),
      () => /throw\s+new/i.test(code) && /exception/i.test(code),
    ],
    'ej2': [
      () => /class\s+\w+\s+extends\s+exception/i.test(code),
      () => /interface\s+conducible/i.test(code),
      () => /abstract\s+class\s+vehiculo/i.test(code) && /implements\s+conducible/i.test(code),
      () => /class\s+coche/i.test(code) || /class\s+moto/i.test(code),
      () => /hashmap\s*</i.test(code),
      () => /throws\s+\w+exception/i.test(code),
    ],
    'ej3': [
      () => /class\s+\w+\s+extends\s+exception/i.test(code),
      () => /interface\s+prestable/i.test(code),
      () => /abstract\s+class\s+elemento/i.test(code) && /implements\s+prestable/i.test(code),
      () => /class\s+libro/i.test(code) || /class\s+revista/i.test(code),
      () => /arraylist\s*</i.test(code),
      () => /throw\s+new/i.test(code),
    ],
  };

  const ejChecks = checks[ejId] || [];
  ejChecks.forEach((check, i) => {
    const el = document.getElementById(`criterio-${i}`);
    if (el) {
      const ok = check();
      el.textContent = (ok ? '✅' : '❌') + ' ' + ej.criterios[i];
      el.className = `criterio-item ${ok ? 'criterio-ok' : 'criterio-fail'}`;
      if (ok) passed++;
    }
  });

  const pct = Math.round((passed / ejChecks.length) * 100);
  const fb = document.getElementById('ej-feedback');
  if (fb) {
    fb.innerHTML = `<div class="ej-result ${pct >= 80 ? 'ok' : pct >= 50 ? 'partial' : 'fail'}">
      ${pct >= 80 ? '🎉 ¡Muy bien! ' : pct >= 50 ? '💪 Vas por buen camino. ' : '📚 Sigue practicando. '}
      ${passed}/${ejChecks.length} criterios cumplidos (${pct}%)
      ${pct < 100 ? '<br><small>Revisa las pistas para los criterios que faltan.</small>' : ''}
    </div>`;
  }
  score.correct += passed;
  document.querySelector('#score-correct span').textContent = score.correct;
}
