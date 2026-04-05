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
}

function hideAllViews() {
  ['lesson-view','quiz-view','drag-view','code-view','welcome-panel'].forEach(id => {
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
    <div class="quiz-actions"><button class="btn-check" id="btn-next" onclick="nextQuestion()" style="display:none">Siguiente →</button></div>`;
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
