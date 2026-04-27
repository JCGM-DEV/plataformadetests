// =====================================================================
// TUTOR ENGINE — app logic for the interactive tutor
// =====================================================================

let tutorState = {
  sessionId: null,
  pasoActual: 0,
  fase: 'aprendizaje', // 'aprendizaje' | 'examen'
  pasoInput: '',
  examenInput: '',
  pasoCompletados: new Set()
};

function startTutor(sessionId) {
  const session = TUTOR_SESSIONS.find(s => s.id === sessionId);
  if (!session) return;
  tutorState = {
    sessionId,
    pasoActual: 0,
    fase: 'aprendizaje',
    pasoInput: '',
    examenInput: '',
    pasoCompletados: new Set()
  };
  hideAllViews();
  const view = document.getElementById('tutor-view');
  view.classList.remove('hidden');
  renderTutorAprendizaje(session);
}

function renderTutorAprendizaje(session) {
  const paso = session.pasos[tutorState.pasoActual];
  const totalPasos = session.pasos.length;
  const isFirst = tutorState.pasoActual === 0;
  const isLast = tutorState.pasoActual === totalPasos - 1;
  const savedInput = tutorState.pasoInput || '';

  const view = document.getElementById('tutor-view');
  view.innerHTML = `
    <!-- CABECERA DEL TUTOR -->
    <div class="tutor-topbar">
      <div class="tutor-session-info">
        <span class="tutor-icon-badge" style="background:linear-gradient(135deg,${session.color},${session.color}88)">${session.icono}</span>
        <div>
          <div class="tutor-session-title">🎓 Tutor: ${session.titulo}</div>
          <div class="tutor-session-sub">${session.subtitulo}</div>
        </div>
      </div>
      <div class="tutor-progress-wrap">
        ${session.pasos.map((p, i) => `
          <div class="tutor-step-dot ${i < tutorState.pasoActual ? 'done' : i === tutorState.pasoActual ? 'active' : ''}"
               title="Paso ${i+1}: ${p.concepto}">
            <span>${i < tutorState.pasoActual ? '✓' : i+1}</span>
          </div>
        `).join('<div class="tutor-step-line ${i < tutorState.pasoActual ? "done" : ""}"></div>')}
        <div class="tutor-step-dot ${tutorState.pasoActual === totalPasos ? 'active done' : ''}" title="Examen">
          <span>📝</span>
        </div>
      </div>
    </div>

    <!-- CONTENIDO PRINCIPAL -->
    <div class="tutor-body">

      <!-- PANEL IZQUIERDO: Tutor explica -->
      <div class="tutor-left">
        <!-- Badge de concepto -->
        <div class="tutor-concept-badge"
             style="background:linear-gradient(135deg,${session.color}22,transparent);border-color:${session.color}55;color:${session.color}">
          ${paso.concepto}
        </div>

        <h2 class="tutor-paso-titulo">
          <span class="tutor-paso-num">Paso ${tutorState.pasoActual + 1} / ${totalPasos}</span>
          ${paso.titulo}
        </h2>

        <!-- Burbuja explicación del tutor -->
        <div class="tutor-bubble">
          <div class="tutor-bubble-avatar">🎓</div>
          <div class="tutor-bubble-content">
            <div class="tutor-bubble-name">Profesor IA</div>
            <div class="tutor-explanation">${paso.explicacion}</div>
          </div>
        </div>

        <!-- Ejemplo de código -->
        <div class="tutor-code-section">
          <div class="tutor-code-label">📋 Ejemplo de referencia</div>
          <div class="code-block">${paso.ejemplo}</div>
        </div>

        <!-- Consejo -->
        <div class="tutor-consejo">
          <div class="tutor-consejo-icon">💡</div>
          <div>${paso.consejo}</div>
        </div>
      </div>

      <!-- PANEL DERECHO: Hoja de papel -->
      <div class="tutor-right">
        <div class="paper-sheet">
          <!-- Encabezado del papel -->
          <div class="paper-header">
            <div class="paper-header-left">
              <div class="paper-title">${paso.fase === 'diseno' ? '🎨 Diseño y Modelado (Esquema)' : '✏️ Tarea guiada'}</div>
              <div class="paper-instruccion">${paso.tareaGuiada.instruccion}</div>
            </div>
            <div class="paper-logo">PROG</div>
          </div>
          <div class="paper-margin-line"></div>
          ${paso.fase === 'diseno' ? '<div class="diseno-hint">💡 Define aquí las Clases, Atributos y su Relación. Usa un formato de lista o esquema.</div>' : ''}

          <!-- Área de escritura -->
          <textarea
            class="paper-textarea"
            id="tutor-code-input"
            placeholder="${paso.tareaGuiada.placeholder.replace(/"/g, '&quot;')}"
            spellcheck="false"
            oninput="tutorState.pasoInput = this.value"
          >${savedInput}</textarea>

          <!-- Criterios de verificación -->
          <div class="paper-checks" id="tutor-checks">
            <div class="paper-checks-label">Criterios a cumplir:</div>
            ${paso.tareaGuiada.checks.map((c, i) => `
              <div class="paper-check-item" id="tutor-check-${i}">
                <span class="check-icon">⬜</span>
                <span>${c.desc}</span>
              </div>
            `).join('')}
          </div>

          <!-- Acciones -->
          <div class="paper-actions">
            <button class="btn-tutor-check" onclick="verificarPasoTutor()">
              🔍 Verificar
            </button>
            <div class="paper-nav">
              ${!isFirst ? `<button class="btn-tutor-nav" onclick="irPasoTutor(${tutorState.pasoActual - 1})">← Anterior</button>` : ''}
              <button class="btn-tutor-nav primary" onclick="irPasoTutor(${tutorState.pasoActual + 1})" id="btn-tutor-next">
                ${isLast ? '📝 Ir al Examen →' : 'Siguiente →'}
              </button>
            </div>
          </div>

          <div id="tutor-paso-feedback"></div>
        </div>
      </div>

    </div>
  `;

  // Si hay input guardado, re-verificar para mostrar estado
  if (savedInput.trim()) {
    setTimeout(() => verificarPasoTutor(true), 100);
  }
}

function verificarPasoTutor(silent = false) {
  const session = TUTOR_SESSIONS.find(s => s.id === tutorState.sessionId);
  const paso = session.pasos[tutorState.pasoActual];
  const code = document.getElementById('tutor-code-input')?.value || '';
  tutorState.pasoInput = code;

  let passed = 0;
  paso.tareaGuiada.checks.forEach((check, i) => {
    const ok = check.test(code);
    const el = document.getElementById(`tutor-check-${i}`);
    if (el) {
      el.className = `paper-check-item ${ok ? 'check-ok' : code.trim() ? 'check-fail' : ''}`;
      el.querySelector('.check-icon').textContent = ok ? '✅' : (code.trim() ? '❌' : '⬜');
    }
    if (ok) passed++;
  });

  if (silent) return;

  const fb = document.getElementById('tutor-paso-feedback');
  const pct = Math.round((passed / paso.tareaGuiada.checks.length) * 100);

  if (pct === 100) {
    tutorState.pasoCompletados.add(tutorState.pasoActual);
    fb.innerHTML = `<div class="tutor-feedback-ok">
      🎉 <strong>¡Perfecto!</strong> Has completado este paso. Puedes avanzar al siguiente.
    </div>`;
  } else if (pct >= 50) {
    fb.innerHTML = `<div class="tutor-feedback-partial">
      💪 <strong>Vas bien.</strong> ${passed}/${paso.tareaGuiada.checks.length} criterios cumplidos. Revisa los que faltan.
    </div>`;
  } else {
    fb.innerHTML = `<div class="tutor-feedback-bad">
      📚 <strong>Sigue intentándolo.</strong> ${passed}/${paso.tareaGuiada.checks.length} criterios cumplidos.
      <br><small>Fíjate en el ejemplo de la izquierda para orientarte.</small>
    </div>`;
  }
}

function irPasoTutor(nuevoPaso) {
  const session = TUTOR_SESSIONS.find(s => s.id === tutorState.sessionId);

  // Save current input
  const currentInput = document.getElementById('tutor-code-input')?.value || '';
  tutorState.pasoInput = currentInput;

  if (nuevoPaso >= session.pasos.length) {
    // Ir al examen
    tutorState.fase = 'examen';
    tutorState.pasoInput = '';
    renderTutorExamen(session);
    return;
  }
  if (nuevoPaso < 0) return;

  tutorState.pasoActual = nuevoPaso;
  tutorState.pasoInput = ''; // reset input for new step
  renderTutorAprendizaje(session);
}

function renderTutorExamen(session) {
  const { examen } = session;
  const view = document.getElementById('tutor-view');

  view.innerHTML = `
    <!-- CABECERA EXAMEN -->
    <div class="tutor-topbar exam-mode">
      <div class="tutor-session-info">
        <span class="tutor-icon-badge exam-badge">📝</span>
        <div>
          <div class="tutor-session-title">EXAMEN FINAL</div>
          <div class="tutor-session-sub">${examen.titulo}</div>
        </div>
      </div>
      </div>
      <div id="exam-timer-display" class="exam-timer-badge">⏱ 60:00</div>
    </div>

    <!-- CUERPO DEL EXAMEN -->
    <div class="tutor-body exam-layout">

      <!-- ENUNCIADO (izquierda) -->
      <div class="exam-enunciado-panel">
        <div class="exam-enunciado-header">
          <div class="exam-badge-oficial">📋 ENUNCIADO — Examen tipo real</div>
          <div class="exam-instrucciones">${examen.instrucciones}</div>
        </div>
        <div class="exam-enunciado-text">${examen.enunciado}</div>

        <!-- Criterios de evaluación -->
        <div class="exam-criterios-panel">
          <div class="exam-criterios-title">📊 Criterios de evaluación (${examen.criterios.length} puntos)</div>
          <div id="exam-criterios-list">
            ${examen.criterios.map((c, i) => `
              <div class="exam-criterio-item" id="exam-crit-${i}">
                <span class="exam-crit-icon">⬜</span>
                <span>${c.desc}</span>
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      <!-- HOJA DE PAPEL DE EXAMEN (derecha) -->
      <div class="exam-paper-panel">
        <div class="exam-paper-sheet">
          <!-- Membrete oficial -->
          <div class="exam-paper-header">
            <div class="exam-paper-logo">📄</div>
            <div class="exam-paper-meta">
              <div class="exam-paper-titulo">Examen de Programación — M05 DAW</div>
              <div class="exam-paper-subtitulo">Nombre: _____________________________ Fecha: ____________</div>
              <div class="exam-paper-nota">Puntuación: ______ / ${examen.criterios.length}</div>
            </div>
          </div>
          <div class="exam-redline"></div>

          <!-- Área de escritura -->
          <textarea
            class="paper-textarea exam-textarea"
            id="exam-code-input"
            placeholder="Escribe tu solución aquí, como si fuera papel...

// No te preocupes por la sintaxis perfecta
// Lo importante es la lógica y la estructura
// Usa comentarios para explicar tu razonamiento"
            spellcheck="false"
            oninput="tutorState.examenInput = this.value"
          >${tutorState.examenInput || ''}</textarea>

          <!-- Acciones -->
          <div class="exam-paper-actions">
            <button class="btn-exam-submit" onclick="corregirExamenTutor()">
              ✅ Entregar y corregir
            </button>
            <button class="btn-tutor-nav" onclick="volverAprendizajeTutor()">
              ← Volver a las lecciones
            </button>
          </div>

          <div id="exam-correccion"></div>
        </div>
      </div>

    </div>
  `;
  startExamTimer(60 * 60); // 1 hour
}

function startExamTimer(seconds) {
    let remain = seconds;
    const el = document.getElementById('exam-timer-display');
    if (tutorState.examInterval) clearInterval(tutorState.examInterval);
    
    tutorState.examInterval = setInterval(() => {
        remain--;
        const m = Math.floor(remain / 60);
        const s = remain % 60;
        if (el) el.textContent = `⏱ ${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')}`;
        if (remain <= 0) {
            clearInterval(tutorState.examInterval);
            if (el) el.style.color = '#ef4444';
            alert('¡El tiempo ha terminado! Se procederá a la corrección del examen.');
            corregirExamenTutor();
        }
    }, 1000);
}

function corregirExamenTutor() {
  if (tutorState.examInterval) clearInterval(tutorState.examInterval);
  const session = TUTOR_SESSIONS.find(s => s.id === tutorState.sessionId);
  const code = document.getElementById('exam-code-input')?.value || '';
  tutorState.examenInput = code;

  if (!code.trim()) {
    showToast('Escribe tu solución antes de entregar', 'info');
    return;
  }

  const { criterios } = session.examen;
  let pasados = 0;
  const resultados = [];

  criterios.forEach((c, i) => {
    const ok = c.test(code);
    if (ok) pasados++;
    resultados.push({ ok, desc: c.desc, idx: i });

    const el = document.getElementById(`exam-crit-${i}`);
    if (el) {
      el.className = `exam-criterio-item ${ok ? 'crit-ok' : 'crit-fail'}`;
      el.querySelector('.exam-crit-icon').textContent = ok ? '✅' : '❌';
    }
  });

  const pct = Math.round((pasados / criterios.length) * 100);
  const nota = ((pasados / criterios.length) * 10).toFixed(2);
  const passed = pct >= 50;

  // Feedback detallado
  const fallos = resultados.filter(r => !r.ok);
  const consejos = {
    'abstracta': 'Recuerda: <code>abstract class NombreClase</code> y los métodos abstractos sin cuerpo. ¡No olvides el tipo de retorno!',
    'encapsulacion': 'Atributos <code>private</code> en subclases y <code>protected</code> en la base. Los setters deben validar datos.',
    'herencia_alumno': 'El constructor hijo DEBE pasar los parámetros al padre con <code>super(nombre, dni, ...)</code>. ¡Es un error de lógica grave olvidarlo!',
    'herencia_prof': 'Toda subclase necesita llamar a <code>super()</code> en su constructor si el padre no tiene uno vacío.',
    'interfaz': 'La interfaz define el contrato. La clase debe usar <code>implements</code> y sobreescribir todos sus métodos.',
    'excepcion_custom': 'Las excepciones propias extienden de <code>Exception</code> y su constructor llama a <code>super(mensaje)</code>.',
    'polimorfismo': 'Un array de tipo Padre puede guardar objetos de tipo Hijo. Luego, al recorrerlo, Java llama al método del hijo automáticamente.',
    'try_catch': 'El <code>try</code> envuelve el código peligroso, y el <code>catch</code> captura el error para que el programa no "explote".',
    'hashmap': 'En un <code>HashMap</code>, la clave debe ser única (como el código de producto). Se recorre con <code>entrySet()</code>.',
    'excepcion': 'Lanza la excepción con <code>throw new MiExcepcion("...")</code> cuando se detecte el error de lógica.',
    'herencia_elec': '<code>class Electronico extends Producto</code> con constructor que llame a <code>super()</code>.',
    'herencia_ali': '<code>class Alimentacion extends Producto</code> con constructor que llame a <code>super()</code>.',
  };

  const fallsHtml = fallos.length > 0 ? `
    <div class="exam-feedback-fallos">
      <div class="exam-feedback-fallos-title">📚 Para repasar:</div>
      ${fallos.slice(0, 4).map(f => `
        <div class="exam-fallo-item">
          <div class="exam-fallo-desc">❌ ${f.desc}</div>
          ${consejos[session.examen.criterios[f.idx]?.key] ? `<div class="exam-fallo-consejo">💡 ${consejos[session.examen.criterios[f.idx].key]}</div>` : ''}
        </div>
      `).join('')}
    </div>
  ` : '';

  document.getElementById('exam-correccion').innerHTML = `
    <div class="exam-resultado">
      <div class="exam-result-score ${passed ? 'pass' : 'fail'}">
        <span class="result-nota">${nota}</span>
        <span class="result-label">${passed ? '✅ APROBADO' : '❌ SUSPENSO'}</span>
      </div>
      <div class="exam-result-stats">
        <div class="exam-stat">
          <span>Criterios OK</span>
          <strong>${pasados} / ${criterios.length}</strong>
        </div>
        <div class="exam-stat">
          <span>Porcentaje</span>
          <strong>${pct}%</strong>
        </div>
      </div>
      <div class="exam-result-msg">
        ${pct === 100 ? '🏆 ¡Perfecto! Has dominado este ejercicio. Estás listo para el examen real.' :
          pct >= 80 ? '🎉 ¡Muy bien! Tienes la estructura correcta. Repasa los detalles que faltan.' :
          pct >= 50 ? '💪 Tienes la base, pero falta completar algunas partes importantes.' :
          '📚 Vuelve a las lecciones y presta atención a los pasos que menos dominas.'}
      </div>
      ${fallsHtml}
      <div class="exam-result-actions">
        <button class="btn-exam-submit" onclick="renderTutorExamen(TUTOR_SESSIONS.find(s=>s.id==='${session.id}'))">
          🔄 Intentar de nuevo
        </button>
        <button class="btn-tutor-nav" onclick="volverAprendizajeTutor()">
          📖 Volver a las lecciones
        </button>
        <button class="btn-tutor-nav" onclick="goHome()">
          🏠 Salir
        </button>
      </div>
    </div>
  `;

  // Scroll to results
  document.getElementById('exam-correccion').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function volverAprendizajeTutor() {
  const session = TUTOR_SESSIONS.find(s => s.id === tutorState.sessionId);
  tutorState.fase = 'aprendizaje';
  tutorState.pasoActual = 0;
  tutorState.pasoInput = '';
  renderTutorAprendizaje(session);
}

function renderTutorSplash() {
  // Render tutor selection on the ejercicio-view or a dedicated panel
  const view = document.getElementById('tutor-view');
  view.classList.remove('hidden');

  view.innerHTML = `
    <div class="tutor-splash">
      <div class="tutor-splash-header">
        <div class="tutor-splash-icon">🎓</div>
        <h2 class="tutor-splash-title">Tutor Interactivo de Java</h2>
        <p class="tutor-splash-sub">Aprende paso a paso y luego demuestra lo que sabes en un examen tipo papel</p>
        <div class="tutor-splash-badge">📝 El examen del profesor: 2 ejercicios · 1 hora · en papel · sin IDE</div>
      </div>

      <div class="tutor-sessions-grid">
        ${TUTOR_SESSIONS.map(session => `
          <div class="tutor-session-card" style="--session-color:${session.color};--session-color-soft:${session.color}22">
            <div class="session-card-icon">${session.icono}</div>
            <div class="session-card-body">
              <div class="session-card-temas">
                ${session.temas.map(t => `<span>${t}</span>`).join('')}
              </div>
              <h3 class="session-card-title">${session.titulo}</h3>
              <p class="session-card-sub">${session.subtitulo}</p>
              <div class="session-card-meta">
                <span>📚 ${session.pasos.length} lecciones guiadas</span>
                <span>⏱ ${session.duracion}</span>
              </div>
            </div>
            <div class="session-card-actions">
              <button class="btn-tutor-start" onclick="startTutor('${session.id}')">
                🚀 Empezar lecciones
              </button>
              <button class="btn-tutor-exam-only" onclick="goDirectExam('${session.id}')">
                📝 Solo el examen
              </button>
            </div>
          </div>
        `).join('')}
      </div>

      <div class="tutor-how-it-works">
        <h3>¿Cómo funciona?</h3>
        <div class="how-steps">
          <div class="how-step">
            <div class="how-step-num">1</div>
            <div>
              <strong>Aprende</strong>
              <p>El tutor te explica cada concepto con ejemplos y te pide que lo practiques en tiempo real</p>
            </div>
          </div>
          <div class="how-step">
            <div class="how-step-num">2</div>
            <div>
              <strong>Practica</strong>
              <p>Escribes código en una hoja de papel virtual, verificas tus criterios al instante</p>
            </div>
          </div>
          <div class="how-step">
            <div class="how-step-num">3</div>
            <div>
              <strong>Examen</strong>
              <p>Enunciado nuevo, papel en blanco, sin ayuda. El tutor te examina y te da feedback detallado</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function goDirectExam(sessionId) {
  const session = TUTOR_SESSIONS.find(s => s.id === sessionId);
  if (!session) return;
  tutorState = {
    sessionId,
    pasoActual: 0,
    fase: 'examen',
    pasoInput: '',
    examenInput: '',
    pasoCompletados: new Set()
  };
  hideAllViews();
  const view = document.getElementById('tutor-view');
  view.classList.remove('hidden');
  renderTutorExamen(session);
}
