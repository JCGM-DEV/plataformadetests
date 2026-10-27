/**
 * tutor.js - Tutor Motivacional y Gestor de Sesiones de Estudio Profundo
 * Supervisa el cumplimiento de objetivos del estudiante, controla el cronómetro
 * de estudio ininterrumpido y emite feedback pedagógico según su ritmo de avance.
 */

const MotivationalTutor = (() => {
    const PROGRESS_KEY = window.APP_CONFIG?.STORAGE_KEYS?.TUTOR_PROGRESS || 'tutor_progress_v1';
    const SESSION_KEY = window.APP_CONFIG?.STORAGE_KEYS?.SESSION_SYNC || 'study_session_v1';

    function getProgress() {
        const today = new Date().toLocaleDateString('es-ES');
        const all = typeof Sync !== 'undefined' ? Sync.get(PROGRESS_KEY, {}) : (JSON.parse(localStorage.getItem(PROGRESS_KEY)) || {});
        if (!all[today]) {
            all[today] = { theory: false, tests: false, labs: false };
            if (typeof Sync !== 'undefined') Sync.set(PROGRESS_KEY, all);
        }
        return all[today];
    }

    function updateProgress(task, status = true, subjectId = null) {
        const today = new Date().toLocaleDateString('es-ES');
        const all = typeof Sync !== 'undefined' ? Sync.get(PROGRESS_KEY, {}) : (JSON.parse(localStorage.getItem(PROGRESS_KEY)) || {});
        if (!all[today]) all[today] = {};

        if (subjectId && (task === 'theory' || task === 'labs')) {
            if (!all[today][task]) all[today][task] = {};
            all[today][task][subjectId] = status;
        } else {
            all[today][task] = status;
        }

        if (typeof Sync !== 'undefined') {
            Sync.set(PROGRESS_KEY, all);
        } else {
            localStorage.setItem(PROGRESS_KEY, JSON.stringify(all));
        }
        renderMessage();
    }

    function getTasksForPhase() {
        const phase = AppHelpers.getCurrentPhase();
        if (phase.id === 1) {
            return [
                { key: 'theory', label: 'Estudio de Teoría (Min. 5m)' },
                { key: 'tests', label: 'Mini-test de Afianzamiento' }
            ];
        } else if (phase.id === 2) {
            return [
                { key: 'theory', label: 'Repaso Teórico (Min. 5m)' },
                { key: 'tests', label: 'Simulacro Real' },
                { key: 'labs', label: 'Práctica de Laboratorio' }
            ];
        }
        return [
            { key: 'tests', label: 'Simulacro de Examen' },
            { key: 'libreta', label: 'Revisión Libreta de Errores' }
        ];
    }

    function renderMessage() {
        const container = document.getElementById('tutor-motivational-root');
        if (!container) return;

        const progress = getProgress();
        const phaseTasks = getTasksForPhase();
        const totalTasks = phaseTasks.length;
        let tasksDone = 0;

        phaseTasks.forEach(t => {
            const val = progress[t.key];
            if (typeof val === 'object' && val !== null) {
                if (Object.values(val).some(Boolean)) tasksDone++;
            } else if (val === true) {
                tasksDone++;
            }
        });

        const config = window.APP_CONFIG?.TUTOR_DATA || { scolding: [], encouraging: [] };
        let message = '';
        let mood = 'neutral';
        let avatar = '🤖';

        if (tasksDone === 0) {
            mood = 'scolding';
            avatar = '🦾⚠️';
            const list = config.scolding || ["¡El tiempo corre! Empieza con tu primera sesión."];
            message = list[Math.floor(Math.random() * list.length)];
        } else if (tasksDone === totalTasks) {
            mood = 'encouraging';
            avatar = '🚀✨';
            const list = config.encouraging || ["¡Excelente trabajo! Objetivos cumplidos."];
            message = list[Math.floor(Math.random() * list.length)];
        } else {
            mood = 'neutral';
            avatar = '⚡🤖';
            message = `Has completado ${tasksDone} de ${totalTasks} tareas clave. ¡Continúa el esfuerzo!`;
        }

        container.innerHTML = `
            <div class="tutor-card ${mood}">
                <div class="tutor-avatar">${avatar}</div>
                <div class="tutor-content">
                    <div class="tutor-title">
                        <span>Tutor Inteligente — Monitor de Rendimiento</span>
                        <span>${tasksDone}/${totalTasks} OBJETIVOS HOY</span>
                    </div>
                    <div class="tutor-message">${message}</div>
                    <div class="tutor-progress-mini">
                        ${phaseTasks.map(t => {
                            const val = progress[t.key];
                            const isDone = (typeof val === 'object' && val !== null) ? Object.values(val).some(Boolean) : val === true;
                            return `<div class="task-dot ${isDone ? 'done' : ''}" title="${t.label}"></div>`;
                        }).join('')}
                    </div>
                </div>
            </div>`;
    }

    // ─── SESIONES DE ESTUDIO ──────────────────────────────────────────
    function startSession(subjectId) {
        const state = window.APP_STATE;
        if (state.studySession.active) {
            if (!confirm('Ya tienes una sesión de estudio activa. ¿Deseas cancelarla para iniciar una nueva?')) return;
            cancelSession(false);
        }

        const subject = (state.subjects || []).find(s => s.id === subjectId) || { name: subjectId };
        if (state.studySession.timerInterval) clearInterval(state.studySession.timerInterval);

        state.studySession = {
            active: true,
            subjectId: subjectId,
            subjectName: subject.name,
            startTime: Date.now(),
            elapsed: 0,
            timerInterval: setInterval(updateTimer, 1000)
        };

        saveSession();
        renderSessionBar();
        if (typeof Toast !== 'undefined') Toast.info(`Sesión de estudio iniciada: ${subject.name}`);
    }

    function saveSession() {
        const state = window.APP_STATE;
        if (typeof Sync !== 'undefined') {
            Sync.set(SESSION_KEY, {
                active: state.studySession.active,
                subjectId: state.studySession.subjectId,
                subjectName: state.studySession.subjectName,
                startTime: state.studySession.startTime
            });
        }
    }

    function restoreSession() {
        const saved = typeof Sync !== 'undefined' ? Sync.get(SESSION_KEY, null) : null;
        if (saved && saved.active) {
            const state = window.APP_STATE;
            if (state.studySession.timerInterval) clearInterval(state.studySession.timerInterval);
            state.studySession = {
                ...saved,
                elapsed: Math.floor((Date.now() - saved.startTime) / 1000),
                timerInterval: setInterval(updateTimer, 1000)
            };
            renderSessionBar();
        }
    }

    function renderSessionBar() {
        const bar = document.getElementById('study-session-bar');
        if (!bar) return;
        const state = window.APP_STATE;

        bar.innerHTML = `
            <div class="session-info">
                <div class="session-timer">00:00</div>
                <div>
                    <div style="font-size:0.7rem; color:var(--text-secondary); text-transform:uppercase; letter-spacing:1px;">Estudiando</div>
                    <div class="session-subject">${AppHelpers.esc(state.studySession.subjectName)}</div>
                </div>
            </div>
            <div class="session-actions">
                <button class="btn-session-cancel" onclick="cancelStudySession()">Cancelar</button>
                <button class="btn-session-complete" onclick="completeStudySession()">He terminado de estudiar ✅</button>
            </div>`;
        bar.classList.remove('hidden');
        document.body.classList.add('has-active-session');
    }

    function updateTimer() {
        const state = window.APP_STATE;
        const elapsedMs = Date.now() - state.studySession.startTime;
        state.studySession.elapsed = Math.floor(elapsedMs / 1000);

        const bar = document.getElementById('study-session-bar');
        if (bar) {
            const timerEl = bar.querySelector('.session-timer');
            if (timerEl) {
                const mins = Math.floor(state.studySession.elapsed / 60);
                const secs = state.studySession.elapsed % 60;
                timerEl.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
                if (mins >= 5) timerEl.style.color = '#10b981';
            }
        }
    }

    function completeSession() {
        const state = window.APP_STATE;
        const mins = Math.floor(state.studySession.elapsed / 60);
        const MIN_MINS = 5;

        if (mins < MIN_MINS) {
            const msg = `El tutor requiere al menos ${MIN_MINS} minutos de estudio profundo para registrar la sesión. Llevas ${mins} min. ¡Sigue concentrado! 🤖⚡`;
            if (typeof Toast !== 'undefined') Toast.warning(msg, 5000);
            else alert(msg);
            return;
        }

        updateProgress('theory', true, state.studySession.subjectId);
        if (typeof logActivity === 'function') {
            logActivity('theory', `Sesión de Estudio: ${state.studySession.subjectName}`, `Tiempo invertido: ${mins} minutos`);
        }

        const subName = state.studySession.subjectName;
        cancelSession(false);
        const successMsg = `¡Objetivo registrado! Has completado ${mins} minutos de estudio en ${subName}. 🚀`;
        if (typeof Toast !== 'undefined') Toast.success(successMsg, 5000);
        else alert(successMsg);
    }

    function cancelSession(shouldAsk = true) {
        if (shouldAsk && !confirm('¿Deseas cancelar la sesión de estudio actual? No se registrará el tiempo transcurrido.')) return;
        const state = window.APP_STATE;
        clearInterval(state.studySession.timerInterval);
        state.studySession = { active: false, subjectId: null, subjectName: '', startTime: null, elapsed: 0, timerInterval: null };
        if (typeof Sync !== 'undefined') Sync.set(SESSION_KEY, null);

        const bar = document.getElementById('study-session-bar');
        if (bar) bar.classList.add('hidden');
        document.body.classList.remove('has-active-session');
    }

    return {
        getProgress,
        updateProgress,
        renderMessage,
        startSession,
        restoreSession,
        completeSession,
        cancelSession
    };
})();

// Adaptadores globales
function getTutorProgress() { return MotivationalTutor.getProgress(); }
function updateTutorProgress(task, s, sid) { MotivationalTutor.updateProgress(task, s, sid); }
function renderTutorMessage() { MotivationalTutor.renderMessage(); }
function startStudySession(sid) { MotivationalTutor.startSession(sid); }
function restoreStudySession() { MotivationalTutor.restoreSession(); }
function completeStudySession() { MotivationalTutor.completeSession(); }
function cancelStudySession(ask) { MotivationalTutor.cancelSession(ask); }

if (typeof window !== 'undefined') {
    window.MotivationalTutor = MotivationalTutor;
    window.getTutorProgress = getTutorProgress;
    window.updateTutorProgress = updateTutorProgress;
    window.renderTutorMessage = renderTutorMessage;
    window.startStudySession = startStudySession;
    window.restoreStudySession = restoreStudySession;
    window.completeStudySession = completeStudySession;
    window.cancelStudySession = cancelStudySession;
}
