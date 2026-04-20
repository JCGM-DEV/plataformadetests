// =============================================
// LM LAB — APP
// =============================================
let currentUnit = null, completedSections = new Set(), score = { correct: 0, wrong: 0 }, activeSection = null;
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
  else if (section.type === 'xpath') showXPath(section.xpathId);
}

function hideAllViews() {
  ['lesson-view','quiz-view','drag-view','editor-view','xpath-view','welcome-panel'].forEach(id => {
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
}

function updateXMLOutput() {
  const code = document.getElementById('editor-input')?.value || '';
  const output = document.getElementById('xml-output');
  if (!output) return;
  output.innerHTML = syntaxHighlightXML(code);
}

function onEditorInput(isHTML) {
  if (isHTML) updatePreview(); else updateXMLOutput();
  checkMilestones();
  resetStuckTimer();
}

function checkMilestones() {
  const code = document.getElementById('editor-input')?.value || '';
  const ex = editorState.exercises[editorState.current];
  if (!ex.milestones) return;

  let achievedNew = false;
  ex.milestones.forEach(m => {
    if (!editorState.achievedMilestones.has(m.id) && m.check.test(code)) {
      editorState.achievedMilestones.add(m.id);
      showGuidancePopup(m.popup);
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
  
  let tutorText = "";
  let badge = "";
  let avatar = "🤖";

  if (nextIdx === -1 && milestones.length > 0) {
    tutorText = "¡Excelente! Has completado todos los pasos de este ejercicio. Pulsa 'Siguiente' para continuar.";
    badge = "COMPLETADO";
    avatar = "🌟";
  } else if (milestones.length > 0) {
    const nextM = milestones[nextIdx];
    if (isStuck) {
      tutorText = `¿Te has atascado? Pista: ${nextM.hint || nextM.instruction || ex.hint}`;
      badge = "PISTA";
      avatar = "💡";
    } else {
      tutorText = nextIdx === 0 ? `Para empezar: ${nextM.instruction || ex.hint}` : `Buen trabajo. Ahora: ${nextM.instruction || 'continúa con el siguiente paso.'}`;
      badge = `PASO ${nextIdx + 1}/${milestones.length}`;
    }
  } else {
    tutorText = ex.hint || "Usa el editor para completar el ejercicio propuesto.";
    badge = "GUÍA";
  }

  return `
    <div class="tutor-panel ${isStuck ? 'tutor-stuck' : ''}">
      <div class="tutor-avatar">${avatar}</div>
      <div class="tutor-content">
        <div class="tutor-label">Bachero Tutor <span class="tutor-badge" style="${isStuck?'background:var(--accent2)':''}">${badge}</span></div>
        <div class="tutor-step-text">${escapeHTML(tutorText)}</div>
      </div>
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
      const completed = editorState.achievedMilestones.size;
      const total = (ex.milestones || []).length;
      
      if (completed < total && total > 0) {
        result.innerHTML = `<div class="validation-result invalid">⚠️ Aún te faltan pasos por completar (${completed}/${total}). Revisa las instrucciones del tutor.</div>`;
        score.wrong++; document.querySelector('#score-wrong span').textContent = score.wrong;
      } else {
        result.innerHTML = `<div class="validation-result valid">✅ ${type.toUpperCase()} completado correctamente. ¡Buen trabajo!</div>`;
        score.correct++; document.querySelector('#score-correct span').textContent = score.correct;
        completedSections.add(activeSection); updateProgress();
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
        completedSections.add(activeSection); updateProgress();
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
