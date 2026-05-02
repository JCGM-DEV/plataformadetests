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
  if (unitId === 'doctor' && unit.sections.length === 0 && typeof DOCTOR_EXERCISES_MODIFIED !== 'undefined') {
    unit.sections = DOCTOR_EXERCISES_MODIFIED.map(e => ({
      id: e.id, icon: '🧑‍⚕️', label: e.titulo, type: 'ejercicio', ejercicioId: e.id
    }));
  }
  document.getElementById('splash').classList.add('hidden');
  document.getElementById('app').classList.remove('hidden');
  document.getElementById('topbar-unit').textContent = unit.label;
  document.getElementById('topbar-title').textContent = unit.title;
  buildSidebar(unit); showWelcome();
}

function loadCompletionState() {
  try {
    const saved = localStorage.getItem('prog_completed_sections');
    if (saved) completedSections = new Set(JSON.parse(saved));
  } catch (e) { console.error("Error loading progress", e); }
}

function saveCompletionState() {
  localStorage.setItem('prog_completed_sections', JSON.stringify([...completedSections]));
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
    const isDone = completedSections.has(s.id);
    const div = document.createElement('div');
    div.className = `sidebar-item ${isDone ? 'done' : ''} ${activeSection === s.id ? 'active' : ''}`;
    div.id = 'nav-' + s.id;
    div.innerHTML = `
      <div class="item-checkbox" onclick="toggleSectionCompletion('${s.id}', event)"></div>
      <span class="item-icon">${s.icon}</span>
      <span>${s.label}</span>
    `;
    div.onclick = (e) => {
      if (!e.target.classList.contains('item-checkbox')) openSection(s);
    };
    nav.appendChild(div);
  });
  updateProgress();
}

function toggleSectionCompletion(sectionId, event) {
  if (event) event.stopPropagation();
  if (completedSections.has(sectionId)) {
    completedSections.delete(sectionId);
    showToast('Sección marcada como pendiente', 'info');
  } else {
    completedSections.add(sectionId);
    showToast('¡Sección completada! ✓', 'success');
  }
  saveCompletionState();
  const el = document.getElementById('nav-' + sectionId);
  if (el) el.classList.toggle('done', completedSections.has(sectionId));
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
  else if (section.type === 'guide') showGuide(section.guideId);
  else if (section.type === 'tutor') renderTutorSplash();
  else if (section.type === 'doctor_lab') showDoctorLab(section.exerciseId);
}

function hideAllViews() {
  ['lesson-view','quiz-view','drag-view','code-view','ejercicio-view','tutor-view','doctor-view','guide-view','welcome-panel'].forEach(id => {
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
  if (activeSection && !completedSections.has(activeSection)) {
    completedSections.add(activeSection);
    saveCompletionState();
    const el = document.getElementById('nav-' + activeSection);
    if (el) el.classList.add('done');
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
  markDone();
  if (typeof triggerCunaoEffect === 'function') triggerCunaoEffect(pct >= 50);
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
    markDone();
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
          <button class="btn-ai-help" onclick="requestAIFeedback(codeState.exercises[codeState.current].desc)" style="background:linear-gradient(135deg, #7c3aed, #5b21b6); color:white; border:none; border-radius:8px; padding:0.6rem 1.2rem; border:none; font-weight:600; cursor:pointer; display:inline-flex; align-items:center; gap:0.4rem; transition:0.2s">✨ Consultar Profesor IA</button>
          <button class="btn-help" onclick="showCodeSolution()" style="background:linear-gradient(135deg,#3b82f6,#1d4ed8);color:white;border-radius:8px;padding:0.6rem 1.2rem;border:none;font-weight:600;cursor:pointer;display:inline-flex;align-items:center;gap:0.4rem;transition:0.2s;box-shadow:0 4px 12px rgba(59,130,246,0.3)">💡 Ayuda</button>
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

async function analyzeCode() {
  const btn = document.querySelector('.btn-run');
  if (btn) { btn.disabled = true; btn.innerText = '⏳ Revisando...'; }

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
    markDone();
    showToast('¡Ejercicio completado! 🎉', 'success');
  } else {
    const passed = ex.checks.filter(c => c.test(code)).length;
    html += `<div style="margin-top:1rem;padding:.75rem 1rem;background:var(--yellow-bg);border:1px solid rgba(251,191,36,.3);border-radius:8px;color:var(--yellow)">
      ${passed}/${ex.checks.length} requisitos cumplidos. Sigue trabajando.
    </div>`;
  }

  output.innerHTML = html;

  // LLAMADA AUTOMÁTICA A IA (CORRECCIÓN OFICIAL)
  try {
    const enunciado = ex.desc;
    const aiResult = await requestAIFeedback(enunciado);
    if (aiResult && aiResult.nota) {
        const finalNota = parseFloat(aiResult.nota);
        if (typeof triggerCunaoEffect === 'function') {
            triggerCunaoEffect(finalNota >= 5);
        }
    }
  } catch(aiErr) {
    console.error("AI Correction failed", aiErr);
  } finally {
    if (btn) { btn.disabled = false; btn.innerText = '🔍 Analizar Código'; }
  }
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

// ── HELP SYSTEM ──────────────────────────────────────────────────
function showCodeSolution() {
  const ex = codeState.exercises[codeState.current];
  if (!ex.solution) { showToast('No hay solución disponible', 'info'); return; }
  
  const modalContent = document.getElementById('modal-content');
  modalContent.innerHTML = `
    <h3>💡 Ayuda: Solución de Referencia</h3>
    <p>Aquí tienes una implementación correcta para este ejercicio. Analízala para entender la estructura.</p>
    <div class="code-block" id="solution-code" style="white-space:pre; text-align:left; font-family:'JetBrains Mono',monospace; font-size:14px; background:#0c1e2e; padding:15px; border-radius:8px; border:1px solid #1e3a4a; overflow-x:auto;">${syntaxHighlightJava(ex.solution)}</div>
    <div style="margin-top:1.5rem;display:flex;gap:1rem">
      <button class="btn-primary" onclick="copyCodeSolutionToEditor()">Copiar al Editor</button>
      <button class="btn-secondary" onclick="closeModal()">Cerrar</button>
    </div>`;
  document.getElementById('modal-overlay').classList.remove('hidden');
}

function copyCodeSolutionToEditor() {
  const ex = codeState.exercises[codeState.current];
  const editor = document.getElementById('code-input');
  if (editor) {
    editor.value = ex.solution;
    closeModal();
    showToast('Solución copiada al editor', 'success');
  }
}

function syntaxHighlightJava(code) {
  if (!code) return '';
  return code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\/\/.*/g, match => `<span class="cm">${match}</span>`)
    .replace(/"[^"]*"/g, match => `<span class="str">${match}</span>`)
    .replace(/\b(public|private|protected|class|interface|abstract|extends|implements|void|int|double|boolean|String|if|else|throw|new|super|import|return|throws|static)\b/g, match => `<span class="kw">${match}</span>`)
    .replace(/\b(System|Math|ArrayList|List|Map|HashMap|Thread|Runnable|Exception|IllegalArgumentException|SaldoInsuficienteException)\b/g, match => `<span class="fn">${match}</span>`)
    .replace(/\b(\d+)\b/g, match => `<span class="num">${match}</span>`);
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

// ── STUDY GUIDES (SUPERVIVENCIA) ─────────────────────────────────
function showGuide(guideId) {
  const guide = GUIDES.find(g => g.id === guideId);
  if (!guide) return;
  const view = document.getElementById('guide-view');
  view.classList.remove('hidden');

  view.innerHTML = `
    <div class="guide-container">
      <div class="guide-header">
        <span class="guide-badge">🔥 Guía de Supervivencia</span>
        <h2>${guide.title}</h2>
        <p>${guide.subtitle}</p>
      </div>
      <div class="guide-body">
        ${guide.content}
      </div>
      <div class="guide-actions" style="margin-top: 2rem; text-align: center;">
        <button class="btn-primary" onclick="markDone()">✓ Marcar como leído</button>
      </div>
    </div>
  `;
}

// ── EJERCICIOS PRÁCTICOS ─────────────────────────────────────────
let ejercicioState = { showPistas: false, showSolucion: false };

function showEjercicio(ejercicioId) {
  const ej = EJERCICIOS.find(e => e.id === ejercicioId);
  if (!ej) return;
  const isExam = currentUnit === 'simulacros';
  ejercicioState = { showPistas: false, showSolucion: false, isExam };
  renderEjercicio(ej);
}

function renderEjercicio(ej) {
  const view = document.getElementById('ejercicio-view');
  view.classList.remove('hidden');
  const isExam = ejercicioState.isExam;

  view.innerHTML = `
    <div class="ej-header">
      <div style="display:flex; flex-direction:column; gap:0.5rem">
        ${isExam ? '<div class="exam-badge" style="width:fit-content">📋 MODO EXAMEN — SIMULACRO REAL</div>' : ''}
        <h2>${ej.titulo}</h2>
        <p style="color:var(--text2); font-size:0.95rem">Módulo de Programación DAW · Java POO</p>
      </div>
      <div style="text-align:right">
        <div class="ej-badge" style="background:var(--surface2); color:var(--accent); border:1px solid var(--border); padding: 0.5rem 1rem; border-radius: 8px">${ej.nivel} · ${ej.tiempo}</div>
      </div>
    </div>

    <div class="ej-workspace">
      <!-- PANEL IZQUIERDO: INSTRUCCIONES Y EDITOR -->
      <div class="ej-editor-panel">
        <div class="ej-instructions-panel">
          <div style="display:flex; align-items:center; gap:0.75rem; color:var(--accent); font-weight:700; font-size:0.9rem; text-transform:uppercase; letter-spacing:0.1em">
            <span>📋</span> Enunciado del Ejercicio
          </div>
          <div class="ej-enunciado-text">${ej.enunciado}</div>
        </div>

        <div style="display:flex; flex-direction:column; gap:0.75rem; margin-top:1.5rem">
          <div class="editor-pane-label" style="font-size: 0.8rem; color: var(--text2); text-transform: uppercase; letter-spacing: 0.1em">📝 Tu solución (simulacro en papel)</div>
          <textarea class="ej-textarea" id="ej-input" spellcheck="false" placeholder="Escribe aquí tu código Java como si fuera el examen real..."></textarea>
        </div>

        <div class="ej-actions" style="margin-top:1.5rem; display:flex; gap:1rem; flex-wrap:wrap">
          <button class="btn-check" onclick="checkEjercicio('${ej.id}')">✔️ Verificar Criterios</button>
          <button class="btn-ai-help" onclick="requestAIFeedback('${ej.id}')" id="btn-ai-help" style="background:linear-gradient(135deg, #7c3aed, #5b21b6); color:white; border:none; border-radius:8px; padding:0.7rem 1.5rem; font-weight:700; cursor:pointer; display:inline-flex; align-items:center; gap:0.5rem; transition:0.2s">✨ Consultar Profesor IA</button>
          <button class="btn-secondary" onclick="togglePistas('${ej.id}')" id="btn-pistas" ${isExam ? 'style="display:none"' : ''}>💡 Pistas</button>
          <button class="btn-secondary" onclick="toggleSolucion('${ej.id}')" id="btn-solucion" ${isExam ? 'style="display:none"' : ''}>👁 Ver Solución</button>
        </div>

        <div id="pistas-panel" class="hidden" style="margin-top:1.5rem; padding:1.5rem; background:var(--blue-bg); border:1px solid var(--blue); border-radius:12px">
          <h4 style="color:var(--blue); margin-bottom:0.75rem">💡 Pistas de ayuda</h4>
          <ul style="padding-left:1.5rem; font-size:0.9rem; color:var(--text)">
            ${ej.pistas.map(p => `<li>${p}</li>`).join('')}
          </ul>
        </div>

        <div id="solucion-panel" class="hidden" style="margin-top:1.5rem">
          <h4 style="color:var(--green); margin-bottom:1rem">👁 Solución de referencia</h4>
          <div class="code-block" style="background:#0d1117">${ej.solucion}</div>
        </div>
      </div>

      <!-- PANEL DERECHO: CRITERIOS Y NOTA -->
      <div class="ej-sidebar-panel">
        <div class="ej-criteria-card">
          <div class="ej-criteria-title">📊 Criterios Técnicos</div>
          <div id="ej-criteria-list" style="display:flex; flex-direction:column; gap:0.5rem">
            ${ej.criterios.map((c, i) => `
              <div class="criterio-item" id="criterio-${i}">
                <span class="check-icon">⬜</span>
                <span style="line-height:1.4">${c}</span>
              </div>
            `).join('')}
          </div>
        </div>

        <div id="ej-feedback">
          <div class="ej-nota">
            <strong>?</strong>
            <span class="nota-sub">Pendiente de revisión</span>
          </div>
        </div>
      </div>
    </div>
  `;
    
  // Hacer la lista interactiva
  makeEnunciadoInteractive('.ej-enunciado-text');
}

function makeEnunciadoInteractive(selector) {
    setTimeout(() => {
        const container = document.querySelector(selector);
        if (!container) return;
        const items = container.querySelectorAll('li');
        items.forEach(li => {
            li.onclick = function() {
                this.classList.toggle('todo-done');
            };
        });
    }, 50);
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

async function checkEjercicio(ejId) {
  const btn = document.querySelector('.btn-exam-verify');
  if (btn) { btn.disabled = true; btn.innerText = '⏳ Revisando...'; }

  const ej = EJERCICIOS.find(e => e.id === ejId);
  const code = document.getElementById('ej-input')?.value || '';
  if (!code.trim()) { 
    if (btn) { btn.disabled = false; btn.innerText = '✔️ Verificar'; }
    showToast('Escribe tu solución primero', 'info'); 
    return; 
  }
  
  const enunciado = ej.enunciado || ej.titulo;

  const codeLower = code.toLowerCase();
  let passed = 0;

  // Check each criterion against the code
  const checks = {}; // Se usan los checks definidos centralizadamente en ejercicios.js

  // Get checks from the object or fallback
  const checksForEj = ej.checks || checks[ejId] || [];
  const ejChecks = typeof checksForEj === 'function' ? checksForEj(code) : checksForEj;
  
  ejChecks.forEach((check, i) => {
    const el = document.getElementById(`criterio-${i}`);
    if (el) {
      const ok = check(code);
      el.textContent = (ok ? '✅' : '❌') + ' ' + ej.criterios[i];
      el.className = `criterio-item ${ok ? 'criterio-ok' : 'criterio-fail'}`;
      if (ok) passed++;
    }
  });

  const pct = Math.round((passed / ejChecks.length) * 100);
  const nota = (passed / ejChecks.length * 10).toFixed(1).replace(/\.0$/, '');
  const notaEmoji = nota == 10 ? '🏆' : nota >= 8 ? '🎉' : nota >= 6 ? '💪' : '📚';
  const fb = document.getElementById('ej-feedback');
  if (fb) {
    fb.innerHTML = `<div class="ej-result ${pct >= 80 ? 'ok' : pct >= 50 ? 'partial' : 'fail'}">
      ${pct >= 80 ? '🎉 ¡Muy bien! ' : pct >= 50 ? '💪 Vas por buen camino. ' : '📚 Sigue practicando. '}
      ${passed}/${ejChecks.length} criterios cumplidos (${pct}%)
      ${pct < 100 ? '<br><small>Revisa las pistas para los criterios que faltan.</small>' : ''}
    </div>
    <div class="ej-nota">
      ${notaEmoji} Nota orientativa: <strong>${nota}</strong> / 10
      <span class="nota-sub">${passed} de ${ejChecks.length} criterios</span>
    </div>`;
  }
  score.correct += passed;
  document.querySelector('#score-correct span').textContent = score.correct;

  // In exam mode, reveal pistas/solucion/IA buttons after first correction
  if (ejercicioState.isExam) {
    const bPistas = document.getElementById('btn-pistas');
    const bSol = document.getElementById('btn-solucion');
    const bAI = document.getElementById('btn-ai-help');
    if (bPistas) bPistas.style.display = '';
    if (bSol) bSol.style.display = '';
    if (bAI) bAI.style.display = 'inline-flex';
  }

  // LLAMADA AUTOMÁTICA A IA (CORRECCIÓN OFICIAL)
  try {
    const aiResult = await requestAIFeedback(ejId);
    if (aiResult && aiResult.nota) {
        const finalNota = parseFloat(aiResult.nota);
        if (typeof triggerCunaoEffect === 'function') {
            triggerCunaoEffect(finalNota >= 5);
        }
    }
  } catch(aiErr) {
    console.error("AI Correction failed", aiErr);
  } finally {
    if (btn) { btn.disabled = false; btn.innerText = '✔️ Verificar'; }
  }
}

// ── DR. JAVA LAB ───────────────────────────────────────────────────
function showDoctorLab(exerciseId) {
  const data = DOCTOR_EXERCISES.find(e => e.id === exerciseId);
  if (!data) return;
  const view = document.getElementById('doctor-view');
  view.classList.remove('hidden');
  
  view.innerHTML = `
    <div class="doctor-header" style="margin-bottom:2rem">
      <div style="display:flex; justify-content:space-between; align-items:center">
        <div>
          <span class="unit-badge" style="background:var(--blue); color:white">🧑‍⚕️ CASO CLÍNICO</span>
          <h2 style="font-size:2.4rem; margin-top:0.5rem">Clínica Java: ${data.topic}</h2>
        </div>
        <div style="font-size:3rem">🩺</div>
      </div>
      <p style="color:var(--text2); font-size:1.1rem; margin-top:0.5rem">Analiza los síntomas del código, propón un tratamiento y compáralo con el diagnóstico del Dr. Java.</p>
    </div>
    
    <div class="doctor-scenario" style="margin-bottom:2rem">
      <h3 style="font-size:0.9rem; font-weight:800; color:var(--blue); text-transform:uppercase; letter-spacing:0.1em; margin-bottom:1rem">📋 Historia Clínica (Escenario)</h3>
      <div style="font-size:1.05rem; line-height:1.7; color:var(--text);">${data.exercise}</div>
    </div>
    
    <div class="doctor-workspace" style="display:flex; flex-direction:column; gap:1rem; margin-bottom:2rem">
      <div style="display:flex; align-items:center; gap:0.5rem">
        <span style="font-size:1.2rem">✍️</span>
        <h3 style="font-size:1rem; font-weight:700; color:var(--text)">Tu Propuesta de Tratamiento (Código o Lógica)</h3>
      </div>
      <textarea id="doctor-draft" placeholder="Escribe aquí tu planteamiento antes de solicitar el diagnóstico oficial..." style="width:100%; height:250px; padding:1.5rem;"></textarea>
    </div>
    
    <div class="doctor-actions" style="display:flex; gap:1rem; align-items:center;">
      <button class="btn-check" onclick="markDone()">✓ Finalizar Consulta</button>
      <button class="btn-help" onclick="showDoctorSolution('${exerciseId}')" style="background:linear-gradient(135deg, var(--blue), #1d4ed8); color:white; border:none; border-radius:8px; padding:0.8rem 2rem; font-weight:700; cursor:pointer; display:inline-flex; align-items:center; gap:0.5rem; transition:0.2s; box-shadow:0 10px 20px rgba(59,130,246,0.3)">💡 Solicitar Diagnóstico del Dr.</button>
    </div>
  `;
}

function showDoctorSolution(exerciseId) {
  const data = DOCTOR_EXERCISES.find(e => e.id === exerciseId);
  if (!data || !data.solution) { showToast('Solución no disponible','info'); return; }
  
  const modalContent = document.getElementById('modal-content');
  const highlightedCode = typeof syntaxHighlightJava === 'function' ? syntaxHighlightJava(data.solution) : data.solution;
  
  modalContent.innerHTML = `
    <h3>💡 Diagnóstico: ${data.topic}</h3>
    <div class="code-block" style="white-space:pre-wrap; text-align:left; font-family:'JetBrains Mono',monospace; font-size:13px; background:#0c1e2e; padding:20px; border-radius:8px; border:1px solid #1e3a4a; overflow-x:auto; margin-top:1.5rem; max-height:60vh; overflow-y:auto; line-height:1.5">${highlightedCode}</div>
    <div style="margin-top:1.5rem;display:flex;justify-content:flex-end">
      <button class="btn-secondary" onclick="closeModal()">Cerrar Consulta</button>
    </div>`;
  document.getElementById('modal-overlay').classList.remove('hidden');
}

loadCompletionState();

function triggerCunaoEffect(passed) {
    const overlay = document.createElement('div');
    overlay.className = 'cunao-overlay';
    
    const topText = passed ? "¡QUÉ BUENO ERES!" : "¡QUÉ MALO ERES PERRO!";
    const bottomText = passed ? "CUÑAAAAOOOOOOO" : "ESTUDIA, CUÑAAAAOOOOOOO";
    
    overlay.innerHTML = `
        <img src="../risitas/pngegg.png" class="cunao-img" alt="Risitas">
        <div class="cunao-text">${topText}</div>
        <div class="cunao-text" style="font-size:1.5rem;animation-delay:0.2s;color:${passed ? '#4ade80' : '#f87171'}">${bottomText}</div>
    `;
    document.body.appendChild(overlay);

    // Sonido Real del Risitas (Ruta relativa al lab)
    const audio = new Audio('../risitas/Voicy_El Risitas Laugh.mp3');
    audio.play().catch(e => console.log("Audio play blocked by browser", e));

    setTimeout(() => {
        overlay.style.opacity = '0';
        setTimeout(() => overlay.remove(), 500);
    }, 4500);
}
