// =============================================
// LM LAB — APP
// =============================================
let currentUnit = null;
let completedSections = new Set();
let sectionScores = {}; // { sectionId: score (0-10) }
let score = { correct: 0, wrong: 0, quizCorrect: 0, quizWrong: 0 };
let activeSection = null;
let quizState = { questions: [], current: 0, answered: false };
let currentDragItem = null, dragExerciseIdx = 0, dragResults = [];
let editorState = { exercises: [], current: 0, type: 'html', achievedMilestones: new Set() };
let stuckTimer = null, touchChip = null, toastTimer = null;



function selectUnit(unitId) {
  currentUnit = unitId;
  const unit = UNITS[unitId];
  document.getElementById('splash').classList.add('hidden');
  document.getElementById('app').classList.remove('hidden');
  document.getElementById('topbar-unit').textContent = unit.label;
  document.getElementById('topbar-title').textContent = unit.title;
  if (unitId.startsWith('simulacro')) {
    score = { correct: 0, wrong: 0, quizCorrect: 0, quizWrong: 0 };
    sectionScores = {};
    document.querySelector('#score-correct span').textContent = '0';
    document.querySelector('#score-wrong span').textContent = '0';
    startExamTimer();
  } else {
    stopExamTimer();
  }
  buildSidebar(unit); showWelcome();
  updateLiveGrade();
}

function goHome() {
  document.getElementById('splash').classList.remove('hidden');
  document.getElementById('app').classList.add('hidden');
  currentUnit = null; activeSection = null;
  score = { correct: 0, wrong: 0, quizCorrect: 0, quizWrong: 0 };
  sectionScores = {};
  document.querySelector('#score-correct span').textContent = '0';
  document.querySelector('#score-wrong span').textContent = '0';
  stopExamTimer();
  updateLiveGrade();
}

function buildSidebar(unit) {
  const nav = document.getElementById('sidebar-nav');
  nav.innerHTML = `<div class="sidebar-section">${unit.label} — ${unit.title}</div>`;
  let lastCategory = null;
  unit.sections.forEach(s => {
    if (s.category && s.category !== lastCategory) {
      const catDiv = document.createElement('div');
      catDiv.className = 'sidebar-category';
      catDiv.textContent = s.category;
      nav.appendChild(catDiv);
      lastCategory = s.category;
    }
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
  else if (section.type === 'editor') showEditor(section.editorId);
  else if (section.type === 'exam') showExam(section.editorId);
  else if (section.type === 'xpath') showXPath(section.xpathId);
}

function hideAllViews() {
  ['lesson-view','quiz-view','drag-view','editor-view','exam-view','xpath-view','welcome-panel'].forEach(id => {
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
  if (!activeSection) return;

  // If we are in an editor, check milestones first
  const editorView = document.getElementById('editor-view');
  if (editorView && !editorView.classList.contains('hidden')) {
    const ex = editorState.exercises[editorState.current];
    const total = (ex && ex.milestones) ? ex.milestones.length : 0;
    const achieved = editorState.achievedMilestones.size;
    
    if (total > 0 && achieved < total) {
      showToast(`⚠️ Completa todos los pasos antes de marcar como terminado (${achieved}/${total})`, 'error');
      
      // Highlight the tutor panel to show what's missing
      const tutor = document.getElementById('tutor-container');
      if (tutor) {
        tutor.classList.add('shake');
        setTimeout(() => tutor.classList.remove('shake'), 500);
      }
      return;
    }
  }

  completedSections.add(activeSection);
  const el = document.getElementById('nav-' + activeSection);
  if (el && !el.querySelector('.item-done')) el.innerHTML += '<span class="item-done">✓</span>';
  updateProgress();
  updateLiveGrade();
  showToast('¡Sección completada! ✓', 'success');
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
    <div class="quiz-header">
      <h2>🧠 Quiz</h2>
      <span class="quiz-counter">Pregunta ${current+1} / ${questions.length}</span>
    </div>
    <div class="question-card">
      <div class="question-text">${escapeHTML(q.q)}</div>
      ${q.hint ? `<div class="question-hint">💡 ${escapeHTML(q.hint)}</div>` : ''}
      <div class="options-grid">${q.opts.map((o,i) => `
        <button class="option-btn" id="opt-${i}" onclick="selectAnswer(${i})">
          <span class="opt-letter">${letters[i]}</span><span>${escapeHTML(o)}</span>
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
  document.querySelectorAll('.option-btn').forEach((btn, i) => {
    btn.disabled = true;
    if (i === q.ans) btn.classList.add('correct');
    else if (i === idx && !isCorrect) btn.classList.add('wrong');
  });
  const exp = document.getElementById('explanation');
  exp.classList.add('visible');
  exp.innerHTML = (isCorrect ? '✅ <strong>¡Correcto!</strong> ' : '❌ <strong>Incorrecto.</strong> ') + q.exp;
  if (isCorrect) { 
    score.correct++; 
    score.quizCorrect++;
    document.querySelector('#score-correct span').textContent = score.correct; 
    showToast('¡Correcto! 🎉','success'); 
  } else { 
    score.wrong++; 
    score.quizWrong++;
    document.querySelector('#score-wrong span').textContent = score.wrong; 
    showToast('Incorrecto — lee la explicación','error'); 
  }
  updateLiveGrade();
  document.getElementById('btn-next').style.display = 'inline-flex';
}

function nextQuestion() { quizState.current++; renderQuestion(); }

function renderQuizResult() {
  const pct = Math.round((score.correct / (score.correct + score.wrong || 1)) * 100);
  // Quiz finalizado

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
  sectionScores[activeSection] = (pct / 100) * 10;
  completedSections.add(activeSection); 
  updateProgress();
  updateLiveGrade();

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
    <div class="drag-actions"><button class="btn-check" onclick="checkDrag('${data.exercises[dragExerciseIdx] ? dragExerciseIdx : 0}','${Object.keys(DRAG_EXERCISES).find(k => DRAG_EXERCISES[k] === data)}')">Comprobar ✓</button></div>`;
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

function checkDrag(idxStr, dragId) {
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
  updateLiveGrade();
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
    sectionScores[activeSection] = (pct / 100) * 10;
    completedSections.add(activeSection); 
    updateProgress();
    updateLiveGrade();

  }
}

// ── EDITOR ───────────────────────────────────────────────────────
function showEditor(editorId) {
  const labData = EDITOR_LABS[editorId];
  editorState = { exercises: labData.exercises, current: 0, type: labData.type, achievedMilestones: new Set() };
  renderEditorExercise(labData);
}

function renderEditorExercise(labData) {
  const view = document.getElementById('editor-view');
  view.classList.remove('hidden');
  const ex = editorState.exercises[editorState.current];
  const total = editorState.exercises.length;
  const isHTML = labData.type === 'html';

  // Check milestones silently once on load to avoid asking for what's already there
  checkMilestones(true);

  view.innerHTML = `
    <div class="editor-header">
      <h2>${isHTML ? '⌨️' : '📄'} ${escapeHTML(labData.title)}</h2>
      <p>${escapeHTML(labData.description)}</p>
    </div>
    <div class="exercise-desc">
      <h4>Ejercicio ${editorState.current+1}/${total}: ${escapeHTML(ex.title)}</h4>
      <p>${escapeHTML(ex.desc)}</p>
    </div>
    <div id="tutor-container">${renderTutorPanel()}</div>
    <div style="margin-top:1rem" class="editor-workspace guide-container">
      <div class="editor-pane">
        <div class="editor-pane-label">${isHTML ? '📝 HTML' : '📄 XML'}</div>
        <textarea class="editor-textarea" id="editor-input" spellcheck="false" oninput="onEditorInput(${isHTML})">${ex.starter}</textarea>
        <div class="editor-actions">
          ${labData.type === 'html' ? '<button class="btn-run" onclick="updatePreview()">▶ Actualizar</button>' : 
            labData.type === 'xquery' ? '<button class="btn-run" onclick="validateXML()">✓ Validar Consulta</button>' :
            labData.type === 'xslt' ? '<button class="btn-run" onclick="validateXML()">✓ Validar XSLT</button>' :
            '<button class="btn-run" onclick="validateXML()">✓ Validar XML</button>'}
          
          ${ex.solution ? `<button class="btn-help" onclick="showSolution()">💡 Ayuda</button>` : ''}

          <div class="exercise-nav">
            <button onclick="prevEditorEx()" ${editorState.current === 0 ? 'disabled' : ''}>← Anterior</button>
            <span>${editorState.current+1} / ${total}</span>
            <button onclick="nextEditorEx()" ${editorState.current === total-1 ? 'disabled' : ''}>Siguiente →</button>
          </div>
          <button class="btn-secondary" onclick="markDone()">✓ Completado</button>
        </div>
        <div id="validation-result"></div>
      </div>
      <div class="editor-pane">
        <div class="editor-pane-label">${isHTML ? '👁 Previsualización' : '🌳 Árbol XML'}</div>
        ${isHTML ? '<iframe id="preview-frame" class="preview-frame"></iframe>' : '<div id="xml-output" class="xml-output"></div>'}
      </div>
    </div>`;

  if (isHTML) setTimeout(updatePreview, 100);
  else updateXMLOutput();
}

function updatePreview() {
  const code = document.getElementById('editor-input')?.value || '';
  const frame = document.getElementById('preview-frame');
  if (!frame) return;
  const doc = frame.contentDocument || frame.contentWindow.document;
  doc.open(); doc.write(code); doc.close();
  checkExercise();
}

function updateXMLOutput() {
  const code = document.getElementById('editor-input')?.value || '';
  const output = document.getElementById('xml-output');
  if (!output) return;
  output.innerHTML = syntaxHighlightXML(code);
}

function onEditorInput(isHTML) {
  if (isHTML) updatePreview(); else { updateXMLOutput(); checkExercise(); }
  checkMilestones();
  resetStuckTimer();
}

function checkExercise() {
  const code = document.getElementById('editor-input')?.value || '';
  const result = document.getElementById('validation-result');
  const ex = editorState.exercises[editorState.current];
  if (!ex || !ex.milestones) return;

  const passed = ex.milestones.filter(m => m.check.test(code)).length;
  const total = ex.milestones.length;
  const allPass = passed === total;
  let html = '';

  if (allPass) {
    html += `<div style="margin-top:1rem;padding:1rem;background:var(--green-bg);border:1px solid rgba(34,211,160,.3);border-radius:8px;color:var(--green)">
      🎉 <strong>¡Todos los requisitos cumplidos!</strong> Buen trabajo.
    </div>`;
    if (!completedSections.has(activeSection)) {
        score.correct++; document.querySelector('#score-correct span').textContent = score.correct;
    }
    sectionScores[activeSection] = 10;
    markDone();
  } else {
    sectionScores[activeSection] = total > 0 ? (passed / total) * 10 : 0;
    html += `<div style="margin-top:1rem;padding:.75rem 1rem;background:var(--yellow-bg);border:1px solid rgba(251,191,36,.3);border-radius:8px;color:var(--yellow)">
      ${passed}/${total} requisitos cumplidos. Sigue trabajando.
    </div>`;
  }
  
  updateLiveGrade();
  if (result) result.innerHTML = html;
}

function checkMilestones(silent = false) {
  const code = document.getElementById('editor-input')?.value || '';
  const ex = editorState.exercises[editorState.current];
  if (!ex.milestones) return;

  let achievedNew = false;
  ex.milestones.forEach(m => {
    if (!editorState.achievedMilestones.has(m.id) && m.check.test(code)) {
      editorState.achievedMilestones.add(m.id);
      if (!silent) showGuidancePopup(m.popup);
      achievedNew = true;
    }
  });

  if (achievedNew) {
    const container = document.getElementById('tutor-container');
    if (container) container.innerHTML = renderTutorPanel();
  }
}

function renderTutorPanel(isStuck = false) {
  const ex = editorState.exercises[editorState.current];
  const milestones = ex.milestones || [];
  const nextIdx = milestones.findIndex(m => !editorState.achievedMilestones.has(m.id));
  
  let mainText = "";
  let badge = "";
  let avatar = "🤖";

  if (nextIdx === -1 && milestones.length > 0) {
    mainText = "¡Excelente! Has completado todos los pasos de este ejercicio.";
    badge = "COMPLETADO";
    avatar = "🌟";
  } else if (milestones.length > 0) {
    const nextM = milestones[nextIdx];
    const guidance = nextM.instruction || nextM.popup || "Sigue con el siguiente paso.";
    mainText = isStuck ? `Pista: ${nextM.hint || guidance}` : guidance;
    badge = `PASO ${nextIdx + 1}/${milestones.length}`;
    if (isStuck) avatar = "💡";
  } else {
    mainText = ex.desc || "Completa el ejercicio propuesto.";
    badge = "GUÍA";
  }

  // Build steps list
  const stepsList = milestones.map((m, idx) => {
    const done = editorState.achievedMilestones.has(m.id);
    const active = idx === nextIdx;
    return `
      <div class="tutor-step-item ${done ? 'done' : ''} ${active ? 'active' : ''}">
        <span class="step-icon">${done ? '✅' : active ? '➡️' : '⚪'}</span>
        <span class="step-label">${escapeHTML(m.instruction || m.popup || "Objetivo")}</span>
      </div>`;
  }).join('');

  return `
    <div class="tutor-panel ${isStuck ? 'tutor-stuck' : ''}">
      <div class="tutor-top">
        <div class="tutor-avatar">${avatar}</div>
        <div class="tutor-content">
          <div class="tutor-label">Bachero Tutor <span class="tutor-badge">${badge}</span></div>
          <div class="tutor-main-text">${escapeHTML(mainText)}</div>
        </div>
      </div>
      ${milestones.length > 0 ? `<div class="tutor-steps-list">${stepsList}</div>` : ''}
    </div>`;
}

function escapeHTML(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function resetStuckTimer() {
  if (stuckTimer) clearTimeout(stuckTimer);
  stuckTimer = setTimeout(() => {
    const container = document.getElementById('tutor-container');
    if (container) {
      container.innerHTML = renderTutorPanel(true);
      // Efecto visual de sacudida para llamar la atención
      container.querySelector('.tutor-panel').classList.add('shake');
    }
  }, 15000); // 15 segundos de inactividad
}

function showGuidancePopup(text) {
  // Eliminar popups anteriores
  const old = document.querySelectorAll('.guide-popup');
  old.forEach(o => o.remove());

  const container = document.querySelector('.guide-container');
  if (!container) return;

  const popup = document.createElement('div');
  popup.className = 'guide-popup';
  popup.innerHTML = `
    <div class="guide-popup-text">${escapeHTML(text)}</div>
    <div class="guide-popup-close" onclick="this.parentElement.remove()">Entendido</div>
  `;
  container.appendChild(popup);

  // Auto-cerrar tras 6 segundos
  setTimeout(() => popup.remove(), 6000);
}

function syntaxHighlightXML(xml) {
  return xml
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/&lt;\?(.+?)\?&gt;/g, '<span class="xml-comment">&lt;?$1?&gt;</span>')
    .replace(/&lt;!--(.+?)--&gt;/gs, '<span class="xml-comment">&lt;!--$1--&gt;</span>')
    .replace(/&lt;!\[CDATA\[(.+?)\]\]&gt;/gs, '<span class="xml-comment">&lt;![CDATA[$1]]&gt;</span>')
    .replace(/&lt;(\/?)(\w[\w:.-]*)((?:\s+\w[\w:.-]*\s*=\s*"[^"]*")*)\s*(\/?)&gt;/g, (_, slash, tag, attrs, selfClose) => {
      const attrHtml = attrs.replace(/(\w[\w:.-]*)\s*=\s*"([^"]*)"/g, '<span class="xml-attr">$1</span>=<span class="xml-val">"$2"</span>');
      return `<span class="xml-tag">&lt;${slash}${tag}${attrHtml}${selfClose}/&gt;</span>`.replace('/&gt;</span>', `${selfClose ? '/' : ''}&gt;</span>`);
    });
}

function validateXML() {
  const code = document.getElementById('editor-input')?.value || '';
  const result = document.getElementById('validation-result');
  const type = editorState.type;
  
  try {
    if (type === 'xquery' || type === 'xslt') {
      const ex = editorState.exercises[editorState.current];
      const allPass = (ex.milestones || []).every(m => m.check.test(code));
      
      if (!allPass) {
        const passed = (ex.milestones || []).filter(m => m.check.test(code)).length;
        result.innerHTML = `<div class="validation-result invalid">⚠️ Aún te faltan pasos por completar (${passed}/${ex.milestones.length}). Revisa las instrucciones del tutor.</div>`;
        score.wrong++; document.querySelector('#score-wrong span').textContent = score.wrong;
      } else {
        result.innerHTML = `<div class="validation-result valid">✅ ${type.toUpperCase()} completado correctamente. ¡Buen trabajo!</div>`;
        score.correct++; document.querySelector('#score-correct span').textContent = score.correct;
        sectionScores[activeSection] = 10;
        completedSections.add(activeSection); 
        updateProgress();
        updateLiveGrade();

      }
    } else {
      const parser = new DOMParser();
      const doc = parser.parseFromString(code, 'application/xml');
      const error = doc.querySelector('parsererror');
      if (error) {
        result.innerHTML = `<div class="validation-result invalid">❌ XML mal formado: ${error.textContent.split('\n')[0]}</div>`;
        score.wrong++; document.querySelector('#score-wrong span').textContent = score.wrong;
      } else {
        result.innerHTML = `<div class="validation-result valid">✅ XML bien formado. Estructura válida.</div>`;
        score.correct++; document.querySelector('#score-correct span').textContent = score.correct;
        sectionScores[activeSection] = 10;
        completedSections.add(activeSection); 
        updateProgress();
        updateLiveGrade();

      }
    }
    updateXMLOutput();
  } catch(e) {
    result.innerHTML = `<div class="validation-result invalid">❌ Error: ${e.message}</div>`;
  }
}

function prevEditorEx() {
  if (editorState.current > 0) {
    editorState.current--;
    const unit = UNITS[currentUnit];
    const sec = unit.sections.find(s => s.id === activeSection);
    renderEditorExercise(EDITOR_LABS[sec.editorId]);
  }
}

function nextEditorEx() {
  if (editorState.current < editorState.exercises.length - 1) {
    editorState.current++;
    const unit = UNITS[currentUnit];
    const sec = unit.sections.find(s => s.id === activeSection);
    renderEditorExercise(EDITOR_LABS[sec.editorId]);
  }
}

// ── EXAM MODE ────────────────────────────────────────────────────
let examState = { labData: null, corrected: false };

function showExam(editorId) {
  const labData = EDITOR_LABS[editorId];
  examState = { labData, corrected: false };
  const view = document.getElementById('exam-view');
  view.classList.remove('hidden');
  const ex = labData.exercises[0];
  const isHTML = labData.type === 'html';

  const criteriaHtml = (ex.milestones || []).map(m =>
    `<div class="exam-criterion" data-id="${m.id}">⚪ ${escapeHTML(m.instruction || m.popup)}</div>`
  ).join('');

  view.innerHTML = `
    <div class="exam-header">
      <div class="exam-badge">📋 MODO EXAMEN</div>
      <h2>${escapeHTML(labData.examTitle || ex.title)}</h2>
    </div>
    <div class="exam-statement">
      <h3>📄 Enunciado</h3>
      <div class="exam-statement-body">${formatExamDesc(labData.examDesc || ex.desc)}</div>
    </div>
    <div class="exam-workspace">
      <div class="exam-editor-pane">
        <div class="editor-pane-label">${isHTML ? '📝 Tu código HTML' : '📄 Tu código XML'}</div>
        <textarea class="editor-textarea" id="exam-input" spellcheck="false" oninput="onExamInput(${isHTML})">${ex.starter || ''}</textarea>
        <div class="exam-actions">
          <button class="btn-run" onclick="${isHTML ? 'updateExamPreview()' : 'updateExamXML()'}">▶ Actualizar</button>
          <button class="btn-exam-correct" onclick="correctExam()">✓ Corregir</button>
          <button class="btn-help" id="exam-solution-btn" onclick="showExamSolution()" style="display:none">💡 Ver Solución</button>
          <button class="btn-ai-lm" id="btn-lm-ai" onclick="requestLMAIFeedback()" style="display:inline-flex; align-items:center; gap:0.5rem; background:linear-gradient(135deg, #7c3aed, #5b21b6); color:white; border:none; border-radius:8px; padding:0.6rem 1.2rem; font-weight:600; cursor:pointer; transition:0.2s; box-shadow:0 4px 12px rgba(124,58,237,0.3)">✨ Pedir corrección IA</button>
        </div>
        <div id="exam-correction-panel" class="exam-correction-panel hidden"></div>
      </div>
      <div class="exam-preview-pane">
        <div class="editor-pane-label">${isHTML ? '👁 Previsualización' : '🌳 Árbol XML'}</div>
        ${isHTML ? '<iframe id="exam-preview-frame" class="preview-frame"></iframe>' : '<div id="exam-xml-output" class="xml-output"></div>'}
      </div>
    </div>
    ${criteriaHtml ? `<div class="exam-criteria-list" id="exam-criteria-list">${criteriaHtml}</div>` : ''}
  `;

  if (isHTML) setTimeout(updateExamPreview, 100);
  else updateExamXML();
}

function formatExamDesc(desc) {
  if (!desc) return '';
  // Convert newlines and bullet points to HTML
  return escapeHTML(desc)
    .replace(/\n•/g, '<br>•')
    .replace(/\n-/g, '<br>-')
    .replace(/\n/g, '<br>')
    .replace(/•/g, '&nbsp;&nbsp;•');
}

function onExamInput(isHTML) {
  if (isHTML) updateExamPreview();
  else updateExamXML();
}

function updateExamPreview() {
  const code = document.getElementById('exam-input')?.value || '';
  const frame = document.getElementById('exam-preview-frame');
  if (!frame) return;
  const doc = frame.contentDocument || frame.contentWindow.document;
  doc.open(); doc.write(code); doc.close();
}

function updateExamXML() {
  const code = document.getElementById('exam-input')?.value || '';
  const output = document.getElementById('exam-xml-output');
  if (!output) return;
  output.innerHTML = syntaxHighlightXML(code);
}

async function correctExam() {
  const btn = document.querySelector('.btn-exam-correct');
  if (btn) { btn.disabled = true; btn.innerText = '⏳ Revisando...'; }

  const code = document.getElementById('exam-input')?.value || '';
  const labData = examState.labData;
  const ex = labData.exercises[0];
  const milestones = ex.milestones || [];
  const enunciado = labData.examDesc || ex.desc;

  if (!milestones.length) {
    showToast('Este ejercicio no tiene criterios de corrección automática', 'info');
    return;
  }

  let passed = 0;
  const results = milestones.map(m => {
    const ok = m.check.test(code);
    if (ok) passed++;
    return { id: m.id, ok, label: m.instruction || m.popup };
  });
  const pct = Math.round((passed / milestones.length) * 100);
  const allPass = passed === milestones.length;

  // Update criteria markers in the list
  results.forEach(r => {
    const el = document.querySelector(`.exam-criterion[data-id="${r.id}"]`);
    if (el) {
      el.className = `exam-criterion ${r.ok ? 'criterion-ok' : 'criterion-fail'}`;
      el.textContent = `${r.ok ? '✅' : '❌'} ${r.label}`;
    }
  });

  const nota = (passed / milestones.length * 10).toFixed(1).replace(/\.0$/, '');
  const notaEmoji = nota == 10 ? '🏆' : nota >= 8 ? '🎉' : nota >= 6 ? '💪' : '📚';

  // Show correction panel
  const panel = document.getElementById('exam-correction-panel');
  panel.classList.remove('hidden');
  let html = `
    <div class="correction-score ${allPass ? 'score-perfect' : pct >= 60 ? 'score-good' : 'score-low'}">
      <span class="score-pct">${pct}%</span>
      <span class="score-label">${passed}/${milestones.length} criterios cumplidos</span>
    </div>
    <div class="ej-nota" style="margin:.75rem 0">
      ${notaEmoji} Nota orientativa: <strong>${nota}</strong> / 10
      <span class="nota-sub">${passed} de ${milestones.length} criterios</span>
    </div>
    <div class="correction-detail">
      ${results.map(r => `<div class="corr-item ${r.ok ? 'corr-ok' : 'corr-fail'}">${r.ok ? '✅' : '❌'} ${escapeHTML(r.label)}</div>`).join('')}
    </div>
  `;

  if (allPass) {
    html += `<div style="margin-top:1rem;padding:1rem;background:var(--green-bg);border:1px solid rgba(34,211,160,.3);border-radius:8px;color:var(--green)">
      🎉 <strong>¡Simulacro completado con éxito!</strong> Has cumplido todos los criterios del examen.
    </div>`;
    if (!completedSections.has(activeSection)) {
        score.correct++; document.querySelector('#score-correct span').textContent = score.correct;
    }
    sectionScores[activeSection] = 10;
    markDone();
  } else {
    sectionScores[activeSection] = (passed / milestones.length) * 10;
    html += `<div style="margin-top:1rem;padding:.75rem 1rem;background:var(--yellow-bg);border:1px solid rgba(251,191,36,.3);border-radius:8px;color:var(--yellow)">
      ${passed}/${milestones.length} criterios cumplidos. Sigue trabajando para el 10.
    </div>`;
  }
  
  updateLiveGrade();
  panel.innerHTML = html;

  // Show solution + AI buttons (already implemented, but we'll use them as fallback)
  const sBtn = document.getElementById('exam-solution-btn');
  if (sBtn) sBtn.style.display = 'inline-flex';
  
  // LLAMADA AUTOMÁTICA A IA (CORRECCIÓN OFICIAL)
  let aiPassed = allPass;
  try {
    const aiResult = await requestLMAIFeedback(enunciado);
    if (aiResult && aiResult.nota) {
        aiPassed = parseFloat(aiResult.nota) >= 5;
    }
  } catch(aiErr) {
    console.error("AI Correction failed", aiErr);
  } finally {
    // Fin de corrección

    if (btn) { btn.disabled = false; btn.innerText = '✓ Corregir'; }
  }

  if (allOk) {
    completedSections.add(activeSection);
    const navEl = document.getElementById('nav-' + activeSection);
    if (navEl && !navEl.querySelector('.item-done')) navEl.innerHTML += '<span class="item-done">✓</span>';
    updateProgress();
    showToast('¡Ejercicio superado! 🎉', 'success');
    score.correct++;
    document.querySelector('#score-correct span').textContent = score.correct;
    updateLiveGrade();
  } else {
    showToast(`${passed}/${milestones.length} criterios correctos`, 'info');
  }

  examState.corrected = true;
  
}

function showExamSolution() {
  const labData = examState.labData;
  const ex = labData.exercises[0];
  if (!ex.solution) { showToast('No hay solución disponible', 'info'); return; }

  const modal = document.getElementById('modal-overlay');
  const content = document.getElementById('modal-content');
  content.innerHTML = `
    <h3>💡 Solución de Referencia</h3>
    <p style="color:var(--text2);margin-bottom:1rem">Compara con tu código. Hay múltiples soluciones correctas; lo importante es que pases todos los criterios.</p>
    <div class="code-block">${syntaxHighlightXML(ex.solution)}</div>
    <div style="margin-top:2rem;display:flex;gap:1rem;">
      <button class="btn-primary" onclick="copySolutionToExamEditor()">Copiar al Editor</button>
      <button class="btn-secondary" onclick="closeModal()">Cerrar</button>
    </div>
  `;
  modal.classList.remove('hidden');
}

function copySolutionToExamEditor() {
  const labData = examState.labData;
  const ex = labData.exercises[0];
  if (!ex.solution) return;
  const input = document.getElementById('exam-input');
  if (input) {
    input.value = ex.solution;
    onExamInput(labData.type === 'html');
    closeModal();
    showToast('Solución copiada al editor', 'success');
  }
}

// ── XPATH ────────────────────────────────────────────────────────
function showXPath(xpathId) {
  const data = XPATH_LABS[xpathId];
  const view = document.getElementById('xpath-view');
  view.classList.remove('hidden');
  document.getElementById('xpath-xml-input').value = data.xml.trim();
  document.getElementById('xpath-query').value = '';
  document.getElementById('xpath-results').innerHTML = '<div class="xpath-no-match">Escribe una consulta y pulsa "Evaluar"</div>';
}

function evaluateXPath() {
  const xmlStr = document.getElementById('xpath-xml-input').value;
  const query = document.getElementById('xpath-query').value.trim();
  const resultsArea = document.getElementById('xpath-results');
  
  if (!query) { showToast('Introduce una consulta XPath', 'info'); return; }
  
  try {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlStr, "application/xml");
    
    const parseError = xmlDoc.querySelector('parsererror');
    if (parseError) throw new Error('Error en el XML original');

    const result = xmlDoc.evaluate(query, xmlDoc, null, XPathResult.ANY_TYPE, null);
    let output = '';
    let matches = [];
    
    if (result.resultType === 4 || result.resultType === 5) {
      let node = result.iterateNext();
      while (node) {
        matches.push(node);
        node = result.iterateNext();
      }
    } else if (result.resultType === 1) {
      output = `<div class="out-line">Num: <strong>${result.numberValue}</strong></div>`;
    } else if (result.resultType === 2) {
      output = `<div class="out-line">Str: <strong>${result.stringValue}</strong></div>`;
    } else if (result.resultType === 3) {
      output = `<div class="out-line">Bool: <strong>${result.booleanValue}</strong></div>`;
    }

    if (matches.length > 0) {
      output = matches.map(m => {
        const text = m.outerHTML || m.textContent;
        return `<div class="out-line"><span class="xpath-match">${escapeHTML(text)}</span></div>`;
      }).join('');
    }

    resultsArea.innerHTML = output || '<div class="xpath-no-match">No se encontraron coincidencias.</div>';
    if (output) {
       score.correct++; document.querySelector('#score-correct span').textContent = score.correct;
       showToast('¡Consulta exitosa!', 'success');
    }
  } catch (err) {
    resultsArea.innerHTML = `<div class="sql-msg error">❌ Error en la consulta: ${err.message}</div>`;
    score.wrong++; document.querySelector('#score-wrong span').textContent = score.wrong;
  }
}

function escapeHTML(str) {
  if (!str) return '';
  const p = document.createElement('p');
  p.textContent = str;
  return p.innerHTML;
}

function showSolution() {
  const ex = editorState.exercises[editorState.current];
  if (!ex.solution) return;

  const modal = document.getElementById('modal-overlay');
  const content = document.getElementById('modal-content');
  
  content.innerHTML = `
    <h3>💡 Solución Sugerida</h3>
    <p>Aquí tienes el resultado final para que puedas consultarlo. Puedes copiarlo manualmente o usar el botón inferior para aplicarlo al editor.</p>
    <div class="code-block">${syntaxHighlightXML(ex.solution)}</div>
    <div style="margin-top:2rem; display:flex; gap:1rem;">
      <button class="btn-primary" onclick="copySolutionToEditor()">Copiar al Editor</button>
      <button class="btn-secondary" onclick="closeModal()">Cerrar</button>
    </div>
  `;
  
  modal.classList.remove('hidden');
}

function copySolutionToEditor() {
  const ex = editorState.exercises[editorState.current];
  if (!ex.solution) return;
  
  const input = document.getElementById('editor-input');
  if (input) {
    input.value = ex.solution;
    onEditorInput(editorState.type === 'html');
    closeModal();
    showToast('Solución copiada al editor', 'success');
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

document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const unit = urlParams.get('unit');
  if (unit && UNITS[unit]) {
    selectUnit(unit);
  }
});


// ---- LIVE GRADE LOGIC ----
function updateLiveGrade() {
  const container = document.getElementById('live-grade-container');
  if (!currentUnit || !currentUnit.startsWith('simulacro')) {
    if (container) container.classList.add('hidden');
    return;
  }
  
  if (container) container.classList.remove('hidden');
  const unit = UNITS[currentUnit];
  if (!unit) return;
  const sections = unit.sections;
  
  // Weights: Test = 4, Practicas = 6
  let quizScore = 0;
  let simsScore = 0;
  
  // Find the quiz section
  const quizSec = sections.find(s => s.type === 'quiz');
  if (quizSec) {
    const quizData = QUIZZES[quizSec.quizId];
    if (quizData) {
      const totalQuestions = quizData.questions.length;
      quizScore = totalQuestions ? (score.quizCorrect / totalQuestions) * 4 : 0;
      
      // Penalization: Every 3 wrong answers = -1 point
      const penalization = Math.floor(score.quizWrong / 3) * 1.0;
      quizScore = Math.max(0, quizScore - penalization);
    }
  }
  
  // Find simulation sections (in LM they are 'exam')
  const sims = sections.filter(s => s.type === 'exam');
  if (sims.length > 0) {
    let totalSimPoints = 0;
    sims.forEach(s => {
      const sScore = sectionScores[s.id] || 0;
      totalSimPoints += (sScore / 10); 
    });
    simsScore = (totalSimPoints / sims.length) * 6;
  }
  
  const totalScore = quizScore + simsScore;
  const gradeEl = document.getElementById('live-grade-value');
  if (gradeEl) {
    gradeEl.textContent = totalScore.toFixed(2);
    gradeEl.className = '';
    if (totalScore < 5) gradeEl.classList.add('grade-fail');
    else if (totalScore < 7) gradeEl.classList.add('grade-pass');
    else gradeEl.classList.add('grade-good');
  }

  // Report to global ranking
  if (window.parent && typeof window.parent.reportSimScore === 'function') {
    window.parent.reportSimScore('lenguaje_de_marcas', 'Lenguaje de Marcas', currentUnit, totalScore);
  }
}

function manualReportScore() {
  const gradeEl = document.getElementById('live-grade-value');
  if (!gradeEl) return;
  
  const totalScore = parseFloat(gradeEl.textContent);
  if (window.parent && typeof window.parent.reportSimScore === 'function') {
    window.parent.reportSimScore('lenguaje_de_marcas', 'Lenguaje de Marcas', currentUnit, totalScore);
    showToast('🏆 ¡Nota registrada en el Ranking!', 'success');
    
    const btn = document.getElementById('btn-register-ranking');
    if (btn) {
        btn.classList.add('btn-registered');
        setTimeout(() => btn.classList.remove('btn-registered'), 2000);
    }
  } else {
    showToast('⚠️ No se pudo conectar con el Ranking', 'error');
  }
}
// ---- TIMER LOGIC ----
let examTimer = null;
let examTimeLeft = 0;

function startExamTimer() {
  const container = document.getElementById('sim-timer-container');
  const valueEl = document.getElementById('sim-timer-value');
  if (!container || !valueEl) return;

  container.classList.remove('hidden');
  container.classList.remove('warning');
  
  examTimeLeft = 90 * 60; // 90 minutes
  updateTimerDisplay(valueEl);

  if (examTimer) clearInterval(examTimer);
  examTimer = setInterval(() => {
    examTimeLeft--;
    updateTimerDisplay(valueEl);

    if (examTimeLeft === 3600) { // 30 mins passed
      showToast('⚠️ Han pasado 30 min. ¡Empieza con los casos prácticos!', 'info');
    }
    
    if (examTimeLeft === 600) { // 10 mins left
      container.classList.add('warning');
      showToast('⚠️ ¡Solo quedan 10 minutos!', 'warning');
    }

    if (examTimeLeft <= 0) {
      clearInterval(examTimer);
      showTimeUpModal();
    }
  }, 1000);
}

function updateTimerDisplay(el) {
  const m = Math.floor(examTimeLeft / 60);
  const s = examTimeLeft % 60;
  el.textContent = `${m}:${s.toString().padStart(2, '0')}`;
}

function stopExamTimer() {
  if (examTimer) clearInterval(examTimer);
  const container = document.getElementById('sim-timer-container');
  if (container) container.classList.add('hidden');
}

function showTimeUpModal() {
  const content = document.getElementById('modal-content');
  content.innerHTML = `
    <div style="text-align:center; padding: 2rem;">
      <span style="font-size:4rem">⏰</span>
      <h2 style="color:var(--red); margin: 1.5rem 0;">¡TIEMPO AGOTADO!</h2>
      <p>El tiempo para el simulacro de examen ha finalizado.</p>
      <p style="font-size:0.9rem; color:var(--text2)">Tu nota actual ha sido registrada. Puedes ver los resultados en el ranking.</p>
      <button class="btn-primary" onclick="goHome()" style="margin-top:2rem; width:100%; justify-content:center">Volver al inicio</button>
    </div>
  `;
  document.getElementById('modal-overlay').classList.remove('hidden');
}
