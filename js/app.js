const APP_STATE = {
    subjects: [],
    currentExam: null,
    examNumber: 1,
    currentQuestionIndex: 0,
    answers: [], // Stores { correct, selected } for scoring
    score: 0,
    timer: 3600, // 1 hour per exam
    timerInterval: null
};

let QUESTION_POOL = {};

// DOM Elements
const subjectGrid = document.getElementById('subject-grid');
const examModal = document.getElementById('exam-modal');
const closeExamBtn = document.getElementById('close-exam');
const examRoot = document.getElementById('exam-engine-root');

async function init() {
    try {
        // Load subjects
        const subRes = await fetch('data/subjects.json');
        const subjects = await subRes.json();
        APP_STATE.subjects = subjects.filter(s => s.units_count > 0);

        // Load real questions from studied PDFs
        const qRes = await fetch('data/test_bank.json');
        QUESTION_POOL = await qRes.json();

        renderSubjects();
        setupEventListeners();
    } catch (error) {
        console.error("Error loading app data:", error);
    }
}


function renderSubjects() {
    subjectGrid.innerHTML = '';
    APP_STATE.subjects.forEach(subject => {
        const card = document.createElement('div');
        card.className = 'subject-card';
        card.innerHTML = `
            <div class="card-icon">${subject.icon}</div>
            <h3>${subject.name}</h3>
            <div class="exam-selector-large">
                <button onclick="startExam('${subject.id}')">Iniciar Simulacro Aleatorio</button>
            </div>
            <div class="card-stats">
                <span>V15 FULL COVERAGE: ${(QUESTION_POOL[subject.id] || []).length} Preguntas Reales</span>
            </div>
        `;
        subjectGrid.appendChild(card);
    });
}

function setupEventListeners() {
    closeExamBtn.onclick = () => {
        if(confirm("¿Seguro que quieres salir? Se perderá el progreso del examen.")) {
            examModal.classList.add('hidden');
            clearInterval(APP_STATE.timerInterval);
        }
    };
}

function startExam(subjectId) {
    const subject = APP_STATE.subjects.find(s => s.id === subjectId);
    APP_STATE.currentExam = subject;
    APP_STATE.currentQuestionIndex = 0;
    APP_STATE.answers = [];
    
    let pool = QUESTION_POOL[subjectId] || [];
    // Test size: 20 if pool allows, otherwise all questions in pool
    const testSize = Math.min(20, pool.length);
    APP_STATE.timer = testSize * 90; // 90 seconds per question
    
    // Smart repeat filter: max 3 repeats from previous test
    const lastTestIds = JSON.parse(localStorage.getItem(`last_test_${subjectId}`) || "[]");
    APP_STATE.examQuestions = getSmartRandomQuestions(pool, testSize, lastTestIds);
    
    // Remember this test for next time
    const currentIds = APP_STATE.examQuestions.map(q => q.concept_id);
    localStorage.setItem(`last_test_${subjectId}`, JSON.stringify(currentIds));
    
    examModal.classList.remove('hidden');
    renderQuestion();
    startTimer();
}

function getSmartRandomQuestions(pool, count, forbiddenIds) {
    // Fisher-Yates shuffle
    let shuffled = [...pool];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    // Separate into 'new' and 'repeat' buckets
    const fresh = shuffled.filter(q => !forbiddenIds.includes(q.concept_id));
    const repeats = shuffled.filter(q => forbiddenIds.includes(q.concept_id));

    // Build final list: up to (count - 3) from fresh, then up to 3 from repeats
    const freshCount = Math.max(count - 3, count - repeats.length);
    const selected = [
        ...fresh.slice(0, freshCount),
        ...repeats.slice(0, Math.min(3, count - fresh.slice(0, freshCount).length))
    ];

    // If still not enough (very small pool), fill with whatever is left
    if (selected.length < count) {
        const remaining = shuffled.filter(q => !selected.find(s => s.concept_id === q.concept_id));
        selected.push(...remaining.slice(0, count - selected.length));
    }

    return selected.slice(0, count);
}

function startTimer() {
    clearInterval(APP_STATE.timerInterval);
    APP_STATE.timerInterval = setInterval(() => {
        APP_STATE.timer--;
        updateTimerUI();
        if (APP_STATE.timer <= 0) finishExam();
    }, 1000);
}

function updateTimerUI() {
    const timerEl = document.getElementById('exam-timer');
    if (timerEl) {
        const min = Math.floor(APP_STATE.timer / 60);
        const sec = APP_STATE.timer % 60;
        timerEl.textContent = `Tiempo: ${min}:${sec.toString().padStart(2, '0')}`;
        if (APP_STATE.timer < 300) timerEl.style.color = "#ef4444";
    }
}

function renderQuestion() {
    if (!APP_STATE.examQuestions[APP_STATE.currentQuestionIndex]) {
        finishExam();
        return;
    }
    const q = APP_STATE.examQuestions[APP_STATE.currentQuestionIndex];
    const totalQ = APP_STATE.examQuestions.length;
    examRoot.innerHTML = `
        <div class="question-container">
            <div class="question-header">
                <div>
                    <h3>Simulacro: ${APP_STATE.currentExam.name}</h3>
                    <p>Pregunta ${APP_STATE.currentQuestionIndex + 1} de ${totalQ} (Pool Temario: ${QUESTION_POOL[APP_STATE.currentExam.id].length})</p>
                </div>
                <span id="exam-timer" class="timer">1:00:00</span>
            </div>
            <div class="progress-bar-small" style="width: 100%; margin: 1.5rem 0;">
                <div class="fill" style="width: ${((APP_STATE.currentQuestionIndex) / totalQ) * 100}%"></div>
            </div>
            <p class="question-text">${q.question}</p>
            <div id="options-grid" class="options-grid">
                ${q.options.map((opt, i) => `
                    <button class="option-btn" onclick="handleResponse(${i})">${opt}</button>
                `).join('')}
            </div>
            <div id="feedback-area" class="feedback-area hidden"></div>
            <div id="next-control" class="hidden" style="margin-top: 2rem; text-align: right;">
                <button class="next-btn" onclick="nextQuestion()">Siguiente Pregunta →</button>
            </div>
        </div>
    `;
    updateTimerUI();
}

function handleResponse(index) {
    const q = APP_STATE.examQuestions[APP_STATE.currentQuestionIndex];
    const isCorrect = index === q.correct;
    
    // Store answer for final scoring
    APP_STATE.answers.push({ correct: q.correct, selected: index });

    const buttons = document.querySelectorAll('.option-btn');
    buttons.forEach(b => b.disabled = true);
    
    buttons[index].classList.add(isCorrect ? 'correct' : 'incorrect');
    
    if (!isCorrect) {
        buttons[q.correct].classList.add('correct');
        const feedback = document.getElementById('feedback-area');
        feedback.innerHTML = `
            <div class="explanation-box">
                <strong>❌ Incorrecto</strong>
                <p>La respuesta correcta es: <em>${q.options[q.correct]}</em></p>
                <hr>
                <p>${q.explanation}</p>
            </div>
        `;
        feedback.classList.remove('hidden');
    } else {
        const feedback = document.getElementById('feedback-area');
        feedback.innerHTML = `<div class="explanation-box correct-box"><strong>✅ ¡Correcto!</strong></div>`;
        feedback.classList.remove('hidden');
    }

    document.getElementById('next-control').classList.remove('hidden');
}

function nextQuestion() {
    APP_STATE.currentQuestionIndex++;
    if (APP_STATE.currentQuestionIndex < APP_STATE.examQuestions.length) {
        renderQuestion();
    } else {
        finishExam();
    }
}

function finishExam() {
    clearInterval(APP_STATE.timerInterval);
    
    const totalPreguntas = APP_STATE.examQuestions.length;
    const N = 4; // Number of answer options (always 4 in this platform)
    const penalizacionPorError = 1 / (N - 1); // = 1/3 ≈ 0.333

    let aciertos = 0;
    let errores = 0;
    let omitidas = 0;

    APP_STATE.answers.forEach(a => {
        if (a.selected === a.correct) aciertos++;
        else if (a.selected === -1) omitidas++;  // blank
        else errores++;
    });
    // Count unanswered questions (navigated away without selecting)
    omitidas += (totalPreguntas - APP_STATE.answers.length);

    // FÓRMULA OFICIAL DAW EUROFORMAC
    // Puntuación = Aciertos - Errores / (N - 1)
    // Con N=4: Puntuación = Aciertos - Errores/3
    const puntuacionBruta = aciertos - (errores * penalizacionPorError);
    const puntuacionFinal = Math.max(0, puntuacionBruta); // No puede ser negativa
    const calificacion = (puntuacionFinal / totalPreguntas) * 10;
    
    const passed = calificacion >= 5;
    const penalizacionTotal = (errores * penalizacionPorError).toFixed(2);

    examRoot.innerHTML = `
        <div class="results-container">
            <h2>Resultado del Examen</h2>
            <div class="score-circle ${passed ? 'passed' : 'failed'}">
                ${calificacion.toFixed(2)}
            </div>
            <div class="stats-grid">
                <div class="stat-item"><span>✅ Aciertos:</span> <strong>${aciertos}</strong></div>
                <div class="stat-item"><span>❌ Errores:</span> <strong>${errores}</strong></div>
                <div class="stat-item"><span>⬜ Omitidas:</span> <strong>${omitidas}</strong></div>
                <div class="stat-item"><span>📉 Penalización:</span> <strong>-${penalizacionTotal}</strong></div>
            </div>
            <div class="formula-box">
                <p><strong>Fórmula aplicada (DAW):</strong></p>
                <p>Puntos = ${aciertos} − ${errores} ÷ ${N - 1} = <strong>${puntuacionFinal.toFixed(2)}</strong></p>
                <p>Nota = ${puntuacionFinal.toFixed(2)} ÷ ${totalPreguntas} × 10 = <strong>${calificacion.toFixed(2)}</strong></p>
                <small>Blanco = 0 pts | Error = −1/${N - 1} pts | Acierto = +1 pto</small>
            </div>
            <div class="feedback-final">
                ${passed ? '<h3>¡Enhorabuena! Has aprobado. 🎉</h3>' : '<h3>Necesitas repasar un poco más. 💪</h3>'}
            </div>
            <button class="option-btn" style="width: auto; margin-top: 2rem;" onclick="location.reload()">Volver al Inicio</button>
        </div>
    `;
}

init();
