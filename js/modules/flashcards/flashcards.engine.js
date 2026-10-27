/**
 * flashcards.engine.js - Motor interactivo de Flashcards
 * Implementa la lógica de estudio rápido mediante tarjetas giratorias,
 * actualización de preguntas falladas y repetición espaciada.
 */

const FlashcardsEngine = (() => {
    function start(subjectId, poolOverride = null) {
        const state = window.APP_STATE;
        const subject = state.subjects.find(s => s.id === subjectId) || { id: subjectId, name: subjectId, icon: '🗂️' };
        const pool = poolOverride || AppHelpers.shuffleArray(window.QUESTION_POOL?.[subjectId] || []);

        if (!pool || pool.length === 0) {
            if (typeof Toast !== 'undefined') Toast.warning('No hay tarjetas disponibles para esta asignatura');
            else alert('No hay tarjetas disponibles.');
            return;
        }

        state.fcQuestions = pool;
        state.fcIndex = 0;
        state.fcFlipped = false;
        state.currentExam = subject;

        const label = document.getElementById('fc-subject-label');
        if (label) label.textContent = `${subject.icon} ${subject.name} — Flashcards`;

        if (typeof showView === 'function') showView('flashcard');
        render();
    }

    function startFallos(subjectId) {
        const state = window.APP_STATE;
        const subject = state.subjects.find(s => s.id === subjectId) || { id: subjectId, name: subjectId, icon: '❌' };
        const fallos = typeof getFallos === 'function' ? getFallos()[subjectId] || {} : {};
        const pool = AppHelpers.shuffleArray(Object.values(fallos));

        if (pool.length === 0) {
            if (typeof Toast !== 'undefined') Toast.info('¡Excelente! No tienes fallos acumulados en esta asignatura');
            else alert('No hay fallos registrados.');
            return;
        }

        start(subjectId, pool);
        const label = document.getElementById('fc-subject-label');
        if (label) label.textContent = `${subject.icon} ${subject.name} — Flashcards de Fallos`;
    }

    function render() {
        const state = window.APP_STATE;
        const q = state.fcQuestions[state.fcIndex];
        const total = state.fcQuestions.length;
        const counter = document.getElementById('fc-counter');
        if (counter) counter.textContent = `${state.fcIndex + 1} / ${total}`;

        const root = document.getElementById('flashcard-root');
        if (!root || !q) return;

        const esc = AppHelpers.esc;
        const correctAnswer = q.options ? q.options[q.correct] : (q.answer || '');

        root.innerHTML = `
            <div class="fc-wrapper">
                <div class="fc-card ${state.fcFlipped ? 'flipped' : ''}" onclick="flipCard()">
                    <div class="fc-front">
                        <div class="fc-hint">Toca la tarjeta para ver la respuesta</div>
                        <p class="fc-question">${esc(q.question)}</p>
                        ${q.unit ? `<span class="unit-badge" style="margin-top:1rem">Tema ${q.unit}</span>` : ''}
                    </div>
                    <div class="fc-back">
                        <div class="fc-hint">Respuesta correcta</div>
                        <p class="fc-answer">${esc(correctAnswer)}</p>
                        <p class="fc-explanation">${esc(q.explanation || '')}</p>
                    </div>
                </div>
                <div class="fc-controls">
                    <button class="fc-btn fc-btn-fail" onclick="fcAnswer(false)" ${!state.fcFlipped ? 'disabled' : ''}>❌ No lo sabía</button>
                    <button class="fc-btn fc-btn-skip" onclick="fcSkip()">⏭ Saltar</button>
                    <button class="fc-btn fc-btn-pass" onclick="fcAnswer(true)" ${!state.fcFlipped ? 'disabled' : ''}>✅ Lo sabía</button>
                </div>
                <div class="fc-progress">
                    <div class="progress-bar-small" style="width:100%">
                        <div class="fill" style="width:${(state.fcIndex / total) * 100}%"></div>
                    </div>
                </div>
            </div>`;
    }

    function flip() {
        window.APP_STATE.fcFlipped = !window.APP_STATE.fcFlipped;
        render();
    }

    function answer(knew) {
        const state = window.APP_STATE;
        const q = state.fcQuestions[state.fcIndex];
        if (!knew && state.currentExam?.id && typeof saveFallo === 'function') {
            saveFallo(state.currentExam.id, q);
        }
        if (knew && state.currentExam?.id && typeof removeFallo === 'function') {
            removeFallo(state.currentExam.id, q.concept_id);
        }
        next();
    }

    function next() {
        const state = window.APP_STATE;
        state.fcIndex++;
        state.fcFlipped = false;

        if (state.fcIndex >= state.fcQuestions.length) {
            const root = document.getElementById('flashcard-root');
            if (root) {
                root.innerHTML = `
                    <div class="results-container" style="text-align:center;padding:3rem">
                        <h2>🎉 ¡Sesión de Flashcards completada!</h2>
                        <p style="color:var(--text-secondary);margin:1rem 0">Has repasado un total de ${state.fcQuestions.length} tarjetas.</p>
                        <div style="display:flex;gap:1rem;justify-content:center;margin-top:2rem;flex-wrap:wrap">
                            <button class="next-btn" onclick="exitFlashcard()">🏠 Volver al Inicio</button>
                            <button class="next-btn" style="background:var(--secondary-color)" onclick="startFlashcard('${state.currentExam.id}')">🔄 Repetir Sesión</button>
                        </div>
                    </div>`;
            }
        } else {
            render();
        }
    }

    function exit() {
        const root = document.getElementById('flashcard-root');
        if (root) root.innerHTML = '';
        if (typeof showView === 'function') showView('dashboard');
        if (typeof renderFallosSection === 'function') renderFallosSection();
    }

    return {
        start,
        startFallos,
        render,
        flip,
        answer,
        next,
        exit
    };
})();

// Adaptadores globales
function startFlashcard(sid, pool) { FlashcardsEngine.start(sid, pool); }
function startFallosFlashcard(sid) { FlashcardsEngine.startFallos(sid); }
function renderFlashcard() { FlashcardsEngine.render(); }
function flipCard() { FlashcardsEngine.flip(); }
function fcAnswer(knew) { FlashcardsEngine.answer(knew); }
function fcSkip() { FlashcardsEngine.next(); }
function fcNext() { FlashcardsEngine.next(); }
function exitFlashcard() { FlashcardsEngine.exit(); }

if (typeof window !== 'undefined') {
    window.FlashcardsEngine = FlashcardsEngine;
    window.startFlashcard = startFlashcard;
    window.startFallosFlashcard = startFallosFlashcard;
    window.renderFlashcard = renderFlashcard;
    window.flipCard = flipCard;
    window.fcAnswer = fcAnswer;
    window.fcSkip = fcSkip;
    window.fcNext = fcNext;
    window.exitFlashcard = exitFlashcard;
}
