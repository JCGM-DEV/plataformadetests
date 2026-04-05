// =============================================
// BD LAB — APP
// =============================================
let currentUnit = null, completedSections = new Set(), score = { correct: 0, wrong: 0 }, activeSection = null;
let quizState = { questions: [], current: 0, answered: false };
let dragState = { exercises: [], current: 0 };
let currentDragItem = null, dragExerciseIdx = 0, dragResults = [];
let sqlState = { exercises: [], current: 0, db: null };
let erState = { items: [], current: 0, qIdx: 0 };
let toastTimer = null;

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
  else if (section.type === 'sql') showSQLLab(section.sqlId);
  else if (section.type === 'er') showERDiagram(section.erId);
}

function hideAllViews() {
  ['lesson-view','quiz-view','drag-view','sql-view','er-view','welcome-panel'].forEach(id => {
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
    <div class="lesson-actions">
      <button class="btn-primary" onclick="markDone()">✓ Marcar como repasado</button>
    </div>`;
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
  else { score.wrong++; document.querySelector('#score-wrong span').textContent = score.wrong; showToast('Incorrecto — lee la explicación','error'); }
  document.getElementById('btn-next').style.display = 'inline-flex';
}

function nextQuestion() { quizState.current++; renderQuestion(); }

function renderQuizResult() {
  const pct = Math.round((score.correct / (score.correct + score.wrong || 1)) * 100);
  const msg = pct >= 80 ? '¡Excelente! Estás listo para el examen 🚀' : pct >= 60 ? 'Buen trabajo, sigue practicando 💪' : 'Repasa la teoría e inténtalo de nuevo 📚';
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
function showDrag(dragId) {
  const data = DRAG_EXERCISES[dragId];
  dragExerciseIdx = 0; dragResults = [];
  renderDragExercise(data);
}

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
      <p style="font-size:.85rem;color:var(--text2);margin-bottom:.75rem">Arrastra la respuesta correcta:</p>
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
    <div class="drag-actions"><button class="btn-check" onclick="checkDrag('${dragId}')">Comprobar ✓</button></div>`;
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
let touchChip = null;
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

// ── SQL LAB ──────────────────────────────────────────────────────
function showSQLLab(sqlId) {
  const labData = SQL_LABS[sqlId];
  sqlState = { exercises: labData.exercises, current: 0, db: JSON.parse(JSON.stringify(DB_SCHEMA)) };
  renderSQLExercise(labData);
}

function renderSQLExercise(labData) {
  const view = document.getElementById('sql-view');
  view.classList.remove('hidden');
  const ex = sqlState.exercises[sqlState.current];
  const total = sqlState.exercises.length;

  view.innerHTML = `
    <div class="sql-header">
      <h2>⌨️ ${labData.title}</h2>
      <p>${labData.description}</p>
    </div>
    <div class="sql-workspace">
      <div class="sql-schema-panel">
        <h3>📋 Esquema de la BD</h3>
        ${renderSchema()}
      </div>
      <div class="sql-editor-panel">
        <div class="sql-exercise-desc">
          <h4>Ejercicio ${sqlState.current+1}/${total}: ${ex.title}</h4>
          <p>${ex.desc}</p>
          <p class="hint">💡 Pista: ${ex.hint}</p>
        </div>
        <textarea class="sql-textarea" id="sql-input" placeholder="Escribe tu consulta SQL aquí..." spellcheck="false">${ex.prefill || ''}</textarea>
        <div class="sql-actions">
          <button class="btn-run" onclick="runSQL()">▶ Ejecutar</button>
          <button class="btn-secondary" onclick="showSolution()">👁 Ver solución</button>
          <div class="sql-nav">
            <button onclick="prevSQLEx()" ${sqlState.current === 0 ? 'disabled' : ''}>← Anterior</button>
            <span>${sqlState.current+1} / ${total}</span>
            <button onclick="nextSQLEx()" ${sqlState.current === total-1 ? 'disabled' : ''}>Siguiente →</button>
          </div>
        </div>
        <div id="sql-result-area"></div>
      </div>
    </div>`;
}

function renderSchema() {
  const tables = {
    empleados: ['🔑 id INT PK', 'nombre VARCHAR(100)', 'salario DECIMAL(10,2)', '🔗 dept_id INT FK→departamentos', 'fecha_alta DATE'],
    departamentos: ['🔑 id INT PK', 'nombre VARCHAR(100)', 'ciudad VARCHAR(100)', 'presupuesto DECIMAL(12,2)'],
    productos: ['🔑 id INT PK', 'nombre VARCHAR(100)', 'precio DECIMAL(10,2)', 'stock INT', 'categoria VARCHAR(50)']
  };
  return Object.entries(tables).map(([name, cols]) => `
    <div class="schema-table">
      <div class="schema-table-name">📊 ${name}</div>
      <div class="schema-cols">${cols.map(c => `<div class="${c.startsWith('🔑') ? 'pk' : c.startsWith('🔗') ? 'fk' : ''}">${c}</div>`).join('')}</div>
    </div>`).join('');
}

function runSQL() {
  const input = document.getElementById('sql-input').value.trim();
  if (!input) { showToast('Escribe una consulta primero', 'info'); return; }
  const resultArea = document.getElementById('sql-result-area');
  try {
    const result = executeSQL(input, sqlState.db);
    if (result.type === 'select') {
      resultArea.innerHTML = renderTable(result.rows) + `<p style="font-size:.78rem;color:var(--text2);margin-top:.5rem">${result.rows.length} fila(s) devuelta(s)</p>`;
      const ex = sqlState.exercises[sqlState.current];
      if (ex.validate && ex.validate(result.rows, sqlState.db)) {
        resultArea.innerHTML += `<div class="sql-msg success">✅ ¡Correcto! La consulta devuelve los resultados esperados.</div>`;
        score.correct++; document.querySelector('#score-correct span').textContent = score.correct;
        completedSections.add(activeSection); updateProgress();
      }
    } else {
      resultArea.innerHTML = `<div class="sql-msg success">✅ ${result.message}</div>`;
      const ex = sqlState.exercises[sqlState.current];
      if (ex.validate && ex.validate([], sqlState.db)) {
        score.correct++; document.querySelector('#score-correct span').textContent = score.correct;
        completedSections.add(activeSection); updateProgress();
      }
    }
  } catch(e) {
    resultArea.innerHTML = `<div class="sql-msg error">❌ Error: ${e.message}</div>`;
    score.wrong++; document.querySelector('#score-wrong span').textContent = score.wrong;
  }
}

function renderTable(rows) {
  if (!rows || rows.length === 0) return '<div class="sql-msg" style="background:var(--yellow-bg);color:var(--yellow);border:1px solid rgba(251,191,36,.3)">⚠️ La consulta no devolvió resultados.</div>';
  const cols = Object.keys(rows[0]);
  return `<div class="sql-result"><table>
    <thead><tr>${cols.map(c => `<th>${c}</th>`).join('')}</tr></thead>
    <tbody>${rows.map(r => `<tr>${cols.map(c => `<td>${r[c] === null || r[c] === undefined ? '<span class="null-val">NULL</span>' : r[c]}</td>`).join('')}</tr>`).join('')}
    </tbody></table></div>`;
}

function showSolution() {
  const ex = sqlState.exercises[sqlState.current];
  document.getElementById('sql-input').value = ex.solution;
  showToast('Solución cargada — ejecútala para ver el resultado', 'info');
}

function prevSQLEx() {
  if (sqlState.current > 0) {
    sqlState.current--;
    const unit = UNITS[currentUnit];
    const sec = unit.sections.find(s => s.id === activeSection);
    renderSQLExercise(SQL_LABS[sec.sqlId]);
  }
}

function nextSQLEx() {
  if (sqlState.current < sqlState.exercises.length - 1) {
    sqlState.current++;
    const unit = UNITS[currentUnit];
    const sec = unit.sections.find(s => s.id === activeSection);
    renderSQLExercise(SQL_LABS[sec.sqlId]);
  }
}

// ── SQL ENGINE (simulado) ────────────────────────────────────────
function executeSQL(sql, db) {
  const s = sql.trim().toUpperCase();
  if (s.startsWith('SELECT')) return executeSelect(sql, db);
  if (s.startsWith('INSERT')) return executeInsert(sql, db);
  if (s.startsWith('UPDATE')) return executeUpdate(sql, db);
  if (s.startsWith('DELETE')) return executeDelete(sql, db);
  if (s.startsWith('CALL')) return { type: 'msg', message: 'Procedimiento ejecutado (simulado).' };
  throw new Error('Comando no soportado en el simulador. Prueba SELECT, INSERT, UPDATE o DELETE.');
}

function executeSelect(sql, db) {
  // Simplified SQL parser for the lab
  const upper = sql.toUpperCase();
  let tableName = null, rows = [], cols = '*', whereClause = null, orderBy = null, groupBy = null, having = null, distinct = false, limit = null;

  // FROM
  const fromMatch = upper.match(/FROM\s+(\w+)/);
  if (!fromMatch) throw new Error('Falta cláusula FROM');
  tableName = fromMatch[1].toLowerCase();
  if (!db[tableName]) throw new Error(`Tabla '${tableName}' no existe. Tablas disponibles: ${Object.keys(db).join(', ')}`);

  // JOIN detection
  const joinMatch = upper.match(/(INNER|LEFT|RIGHT|CROSS)?\s*JOIN\s+(\w+)\s+(?:AS\s+\w+\s+)?ON\s+(.+?)(?:WHERE|GROUP|ORDER|HAVING|LIMIT|$)/);
  let joinTable = null, joinRows = null;
  if (joinMatch) {
    const joinType = (joinMatch[1] || 'INNER').trim();
    joinTable = joinMatch[2].toLowerCase();
    if (!db[joinTable]) throw new Error(`Tabla JOIN '${joinTable}' no existe`);
    const onClause = joinMatch[3].trim();
    const onParts = onClause.match(/(\w+)\.(\w+)\s*=\s*(\w+)\.(\w+)/);
    if (onParts) {
      const [, t1, c1, t2, c2] = onParts;
      const leftTable = tableName, rightTable = joinTable;
      const leftCol = t1.toLowerCase() === leftTable ? c1 : c2;
      const rightCol = t1.toLowerCase() === leftTable ? c2 : c1;
      joinRows = [];
      db[leftTable].forEach(lr => {
        const matches = db[rightTable].filter(rr => lr[leftCol] == rr[rightCol]);
        if (matches.length > 0) {
          matches.forEach(rr => {
            const merged = {};
            Object.keys(lr).forEach(k => merged[`${leftTable[0]}.${k}`] = lr[k]);
            Object.keys(rr).forEach(k => merged[`${rightTable[0]}.${k}`] = rr[k]);
            // Also add flat keys for convenience
            Object.keys(lr).forEach(k => { if (!merged[k]) merged[k] = lr[k]; });
            Object.keys(rr).forEach(k => { if (!merged[k]) merged[k] = rr[k]; });
            joinRows.push(merged);
          });
        } else if (joinType === 'LEFT') {
          const merged = {};
          Object.keys(lr).forEach(k => { merged[k] = lr[k]; merged[`${leftTable[0]}.${k}`] = lr[k]; });
          Object.keys(db[rightTable][0] || {}).forEach(k => { merged[k] = merged[k] !== undefined ? merged[k] : null; });
          joinRows.push(merged);
        }
      });
      if (joinType === 'RIGHT') {
        db[rightTable].forEach(rr => {
          const hasMatch = db[leftTable].some(lr => lr[leftCol] == rr[rightCol]);
          if (!hasMatch) {
            const merged = {};
            Object.keys(db[leftTable][0] || {}).forEach(k => merged[k] = null);
            Object.keys(rr).forEach(k => merged[k] = rr[k]);
            joinRows.push(merged);
          }
        });
      }
    }
  }

  rows = joinRows || [...db[tableName]];

  // WHERE
  const whereMatch = sql.match(/WHERE\s+(.+?)(?:\s+GROUP BY|\s+ORDER BY|\s+HAVING|\s+LIMIT|$)/i);
  if (whereMatch) rows = applyWhere(rows, whereMatch[1].trim());

  // GROUP BY + aggregates
  const groupMatch = upper.match(/GROUP BY\s+(.+?)(?:\s+HAVING|\s+ORDER BY|\s+LIMIT|$)/);
  if (groupMatch) {
    const groupCols = groupMatch[1].split(',').map(c => c.trim().toLowerCase());
    const groups = {};
    rows.forEach(r => {
      const key = groupCols.map(c => r[c]).join('|');
      if (!groups[key]) groups[key] = [];
      groups[key].push(r);
    });
    rows = Object.values(groups).map(grp => {
      const base = { ...grp[0] };
      base._count = grp.length;
      base._sum_salario = grp.reduce((s, r) => s + (r.salario || 0), 0);
      base._avg_salario = base._sum_salario / grp.length;
      base._max_salario = Math.max(...grp.map(r => r.salario || 0));
      base._min_salario = Math.min(...grp.map(r => r.salario || 0));
      return base;
    });
    // HAVING
    const havingMatch = sql.match(/HAVING\s+(.+?)(?:\s+ORDER BY|\s+LIMIT|$)/i);
    if (havingMatch) rows = applyHaving(rows, havingMatch[1].trim());
  }

  // SELECT columns
  const selectMatch = sql.match(/SELECT\s+(DISTINCT\s+)?(.+?)\s+FROM/i);
  if (selectMatch) {
    if (selectMatch[1]) distinct = true;
    const colStr = selectMatch[2].trim();
    if (colStr !== '*') {
      const colDefs = colStr.split(',').map(c => c.trim());
      rows = rows.map(r => {
        const out = {};
        colDefs.forEach(cd => {
          const asMatch = cd.match(/(.+?)\s+AS\s+(\w+)/i);
          if (asMatch) {
            const expr = asMatch[1].trim(); const alias = asMatch[2];
            out[alias] = evalExpr(expr, r);
          } else {
            const dotMatch = cd.match(/\w+\.(\w+)/);
            const key = dotMatch ? dotMatch[1] : cd.toLowerCase();
            out[key] = evalExpr(cd, r);
          }
        });
        return out;
      });
    }
  }

  if (distinct) {
    const seen = new Set();
    rows = rows.filter(r => { const k = JSON.stringify(r); if (seen.has(k)) return false; seen.add(k); return true; });
  }

  // ORDER BY
  const orderMatch = sql.match(/ORDER BY\s+(.+?)(?:\s+LIMIT|$)/i);
  if (orderMatch) {
    const parts = orderMatch[1].trim().split(',').map(p => p.trim());
    rows.sort((a, b) => {
      for (const part of parts) {
        const [col, dir] = part.split(/\s+/);
        const key = col.toLowerCase();
        const va = a[key], vb = b[key];
        const cmp = va < vb ? -1 : va > vb ? 1 : 0;
        if (cmp !== 0) return (dir || 'ASC').toUpperCase() === 'DESC' ? -cmp : cmp;
      }
      return 0;
    });
  }

  // LIMIT
  const limitMatch = sql.match(/LIMIT\s+(\d+)/i);
  if (limitMatch) rows = rows.slice(0, parseInt(limitMatch[1]));

  return { type: 'select', rows };
}

function evalExpr(expr, row) {
  const e = expr.trim().toUpperCase();
  if (e === 'COUNT(*)' || e === 'COUNT( * )') return row._count || 1;
  if (e.startsWith('AVG(')) { const col = expr.match(/AVG\((\w+)\)/i)?.[1]?.toLowerCase(); return col ? (row[`_avg_${col}`] !== undefined ? parseFloat(row[`_avg_${col}`].toFixed(2)) : row[col]) : null; }
  if (e.startsWith('SUM(')) { const col = expr.match(/SUM\((\w+)\)/i)?.[1]?.toLowerCase(); return col ? (row[`_sum_${col}`] !== undefined ? row[`_sum_${col}`] : row[col]) : null; }
  if (e.startsWith('MAX(')) { const col = expr.match(/MAX\((\w+)\)/i)?.[1]?.toLowerCase(); return col ? (row[`_max_${col}`] !== undefined ? row[`_max_${col}`] : row[col]) : null; }
  if (e.startsWith('MIN(')) { const col = expr.match(/MIN\((\w+)\)/i)?.[1]?.toLowerCase(); return col ? (row[`_min_${col}`] !== undefined ? row[`_min_${col}`] : row[col]) : null; }
  const dotMatch = expr.match(/\w+\.(\w+)/);
  const key = dotMatch ? dotMatch[1].toLowerCase() : expr.toLowerCase();
  return row[key] !== undefined ? row[key] : null;
}

function applyWhere(rows, clause) {
  return rows.filter(r => evalCondition(r, clause));
}

function applyHaving(rows, clause) {
  return rows.filter(r => {
    const c = clause.replace(/COUNT\(\*\)/gi, r._count || 1)
                    .replace(/AVG\(salario\)/gi, r._avg_salario || 0)
                    .replace(/SUM\(salario\)/gi, r._sum_salario || 0);
    try { return Function(`"use strict"; return (${c})`)(); } catch { return true; }
  });
}

function evalCondition(row, clause) {
  // Handle IS NULL / IS NOT NULL
  const isNullMatch = clause.match(/(\w+)\s+IS\s+(NOT\s+)?NULL/i);
  if (isNullMatch) {
    const col = isNullMatch[1].toLowerCase(); const notNull = !!isNullMatch[2];
    return notNull ? row[col] !== null && row[col] !== undefined : row[col] === null || row[col] === undefined;
  }
  // Handle BETWEEN
  const betweenMatch = clause.match(/(\w+)\s+BETWEEN\s+(.+?)\s+AND\s+(.+)/i);
  if (betweenMatch) {
    const col = betweenMatch[1].toLowerCase(); const lo = parseFloat(betweenMatch[2]); const hi = parseFloat(betweenMatch[3]);
    return row[col] >= lo && row[col] <= hi;
  }
  // Handle LIKE
  const likeMatch = clause.match(/(\w+)\s+LIKE\s+'([^']+)'/i);
  if (likeMatch) {
    const col = likeMatch[1].toLowerCase(); const pattern = likeMatch[2].replace(/%/g, '.*').replace(/_/g, '.');
    return new RegExp(`^${pattern}$`, 'i').test(String(row[col] || ''));
  }
  // Handle IN
  const inMatch = clause.match(/(\w+)\s+IN\s+\(([^)]+)\)/i);
  if (inMatch) {
    const col = inMatch[1].toLowerCase(); const vals = inMatch[2].split(',').map(v => v.trim().replace(/'/g, ''));
    return vals.includes(String(row[col]));
  }
  // Handle AND/OR
  if (/\bAND\b/i.test(clause)) return clause.split(/\bAND\b/i).every(c => evalCondition(row, c.trim()));
  if (/\bOR\b/i.test(clause)) return clause.split(/\bOR\b/i).some(c => evalCondition(row, c.trim()));
  // Simple comparison
  const cmpMatch = clause.match(/(\w+)\s*(>=|<=|<>|!=|>|<|=)\s*'?([^']+)'?/);
  if (cmpMatch) {
    const col = cmpMatch[1].toLowerCase(); const op = cmpMatch[2]; let val = cmpMatch[3].trim().replace(/'/g, '');
    const rv = row[col]; const nv = isNaN(val) ? val : parseFloat(val);
    const lv = typeof rv === 'number' ? rv : rv;
    if (op === '=') return lv == nv; if (op === '<>' || op === '!=') return lv != nv;
    if (op === '>') return lv > nv; if (op === '<') return lv < nv;
    if (op === '>=') return lv >= nv; if (op === '<=') return lv <= nv;
  }
  return true;
}

function executeInsert(sql, db) {
  const m = sql.match(/INSERT\s+INTO\s+(\w+)\s*\(([^)]+)\)\s*VALUES\s*\(([^)]+)\)/i);
  if (!m) throw new Error('Sintaxis INSERT incorrecta. Usa: INSERT INTO tabla (col1,col2) VALUES (v1,v2)');
  const table = m[1].toLowerCase(); if (!db[table]) throw new Error(`Tabla '${table}' no existe`);
  const cols = m[2].split(',').map(c => c.trim());
  const vals = m[3].split(',').map(v => { v = v.trim().replace(/^'|'$/g, ''); return isNaN(v) ? v : parseFloat(v); });
  const newRow = {}; cols.forEach((c, i) => newRow[c] = vals[i]);
  newRow.id = Math.max(...db[table].map(r => r.id || 0)) + 1;
  db[table].push(newRow);
  return { type: 'msg', message: `✅ 1 fila insertada en '${table}'. ID asignado: ${newRow.id}` };
}

function executeUpdate(sql, db) {
  const m = sql.match(/UPDATE\s+(\w+)\s+SET\s+(.+?)(?:\s+WHERE\s+(.+))?$/i);
  if (!m) throw new Error('Sintaxis UPDATE incorrecta. Usa: UPDATE tabla SET col=val WHERE condicion');
  const table = m[1].toLowerCase(); if (!db[table]) throw new Error(`Tabla '${table}' no existe`);
  const setClause = m[2]; const whereClause = m[3];
  const setParts = setClause.split(',').map(p => { const [k, v] = p.split('='); return { col: k.trim().toLowerCase(), val: v.trim().replace(/^'|'$/g, '') }; });
  let count = 0;
  db[table].forEach(row => {
    if (!whereClause || evalCondition(row, whereClause.trim())) {
      setParts.forEach(({ col, val }) => {
        const expr = val.replace(/(\w+)\s*\*\s*([\d.]+)/g, (_, c, n) => row[c.toLowerCase()] * parseFloat(n));
        row[col] = isNaN(expr) ? expr : parseFloat(parseFloat(expr).toFixed(2));
        row._updated = true;
      });
      count++;
    }
  });
  return { type: 'msg', message: `✅ ${count} fila(s) actualizada(s) en '${table}'` };
}

function executeDelete(sql, db) {
  const m = sql.match(/DELETE\s+FROM\s+(\w+)(?:\s+WHERE\s+(.+))?$/i);
  if (!m) throw new Error('Sintaxis DELETE incorrecta. Usa: DELETE FROM tabla WHERE condicion');
  const table = m[1].toLowerCase(); if (!db[table]) throw new Error(`Tabla '${table}' no existe`);
  const whereClause = m[2]; const before = db[table].length;
  db[table] = db[table].filter(row => whereClause ? !evalCondition(row, whereClause.trim()) : false);
  return { type: 'msg', message: `✅ ${before - db[table].length} fila(s) eliminada(s) de '${table}'` };
}

// ── ER DIAGRAM ───────────────────────────────────────────────────
function showERDiagram(erId) {
  const data = ER_DIAGRAMS[erId];
  erState = { items: data.items, current: 0, qIdx: 0 };
  renderERItem(data);
}

function renderERItem(data) {
  const view = document.getElementById('er-view');
  view.classList.remove('hidden');
  const item = erState.items[erState.current];
  view.innerHTML = `
    <div class="er-header"><h2>📐 ${data.title}</h2></div>
    <div class="er-canvas">${item.svg}</div>
    <p style="color:var(--text2);font-size:.85rem;margin-bottom:1rem">${item.description}</p>
    ${item.questions.map((q, qi) => `
      <div class="er-question" id="er-q-${qi}">
        <h4>❓ ${q.q}</h4>
        <div class="er-options">${q.opts.map((o, oi) => `
          <button class="er-opt" onclick="answerER(${qi},${oi})">${o}</button>`).join('')}
        </div>
        <div id="er-fb-${qi}" style="display:none;margin-top:.75rem;font-size:.875rem"></div>
      </div>`).join('')}`;
}

function answerER(qi, oi) {
  const item = erState.items[erState.current];
  const q = item.questions[qi];
  const isCorrect = oi === q.ans;
  const btns = document.querySelectorAll(`#er-q-${qi} .er-opt`);
  btns.forEach((b, i) => { b.disabled = true; if (i === q.ans) b.classList.add('correct'); else if (i === oi && !isCorrect) b.classList.add('wrong'); });
  const fb = document.getElementById(`er-fb-${qi}`);
  fb.style.display = 'block'; fb.className = `info-box ${isCorrect ? 'success' : 'danger'}`;
  fb.innerHTML = (isCorrect ? '✅ <strong>¡Correcto!</strong> ' : '❌ <strong>Incorrecto.</strong> ') + q.exp;
  if (isCorrect) { score.correct++; document.querySelector('#score-correct span').textContent = score.correct; }
  else { score.wrong++; document.querySelector('#score-wrong span').textContent = score.wrong; }
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
