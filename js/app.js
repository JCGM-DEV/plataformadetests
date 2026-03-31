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
                <span>V7.1 FINAL Pro: Pureza Contextual 100%</span>
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
    APP_STATE.timer = 3600; // 1 Hour
    
    // Select 30 random questions from pool (Truly random each time)
    let pool = QUESTION_POOL[subjectId] || [];
    
    // Non-deterministic shuffle using current timestamp
    const seed = Date.now().toString();
    APP_STATE.examQuestions = getDeterministicRandomQuestions(pool, 30, seed);
    
    examModal.classList.remove('hidden');
    renderQuestion();
    startTimer();
}

function getDeterministicRandomQuestions(pool, count, seed) {
    // Unique Selection Logic (No repeats within 30 questions)
    let shuffled = [...pool];
    
    // Shuffle algorithm (Fisher-Yates)
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    
    // Filter by concept_id to be extra sure (V5 logic)
    const uniqueQuestions = [];
    const usedIds = new Set();
    
    for (const q of shuffled) {
        if (!usedIds.has(q.concept_id)) {
            uniqueQuestions.push(q);
            usedIds.add(q.concept_id);
        }
        if (uniqueQuestions.length >= count) break;
    }
    
    return uniqueQuestions;
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
                    <p>Pregunta ${APP_STATE.currentQuestionIndex + 1} de ${totalQ} (Pool de 500)</p>
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
    
    let aciertos = 0;
    let errores = 0;
    let omitidas = 30 - APP_STATE.answers.length;

    APP_STATE.answers.forEach(a => {
        if (a.selected === a.correct) aciertos++;
        else if (a.selected !== -1) errores++;
    });

    // SISTEMA FP EUROFORMAC (Standard)
    // Nota = (Aciertos - Errores/2) / N * 10
    // Asumiendo 3 opciones. Si hay 4, a veces es Errores/3. Usamos 0.5 de penalización.
    let calificacion = ((aciertos - (errores * 0.5)) / 30) * 10;
    if (calificacion < 0) calificacion = 0;
    
    const passed = calificacion >= 5;

    examRoot.innerHTML = `
        <div class="results-container">
            <h2>Resultado del Examen</h2>
            <div class="score-circle ${passed ? 'passed' : 'failed'}">
                ${calificacion.toFixed(2)}
            </div>
            <div class="stats-grid">
                <div class="stat-item"><span>Aciertos:</span> <strong>${aciertos}</strong></div>
                <div class="stat-item"><span>Errores:</span> <strong>${errores}</strong></div>
                <div class="stat-item"><span>Omitidas:</span> <strong>${omitidas}</strong></div>
                <div class="stat-item"><span>Penalización:</span> <strong>-${(errores * 0.5).toFixed(1)}</strong></div>
            </div>
            <div class="feedback-final">
                ${passed ? '<h3>¡Enhorabuena! Has aprobado.</h3>' : '<h3>Necesitas repasar un poco más.</h3>'}
                <p>Calificación final: ${calificacion.toFixed(2)} / 10</p>
            </div>
            <button class="option-btn" style="width: auto; margin-top: 2rem;" onclick="location.reload()">Volver al Inicio</button>
        </div>
    `;
}

init();
