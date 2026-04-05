// ═══════════════════════════════════════════════════════════════
//  TechHub Euroformac — DAW 2026 — app.js
// ═══════════════════════════════════════════════════════════════

const APP_STATE = {
    subjects: [],
    syllabusExams: [],
    currentExam: null,
    currentUnit: null,
    isSyllabusMode: false,
    examQuestions: [],
    currentQuestionIndex: 0,
    answers: [],
    timer: 3600,
    timerInterval: null,
    // flashcard
    fcQuestions: [],
    fcIndex: 0,
    fcFlipped: false
};

let QUESTION_POOL = {};
let learningChart = null;

// ─── STORAGE KEYS ───────────────────────────────────────────────
const HISTORY_KEY   = 'exam_history_v2';
const FALLOS_KEY    = 'fallos_v2';

// ─── HISTORY ────────────────────────────────────────────────────
function getHistory() { return JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]'); }

function saveExamResult(subjectId, subjectName, score, aciertos, errores, omitidas, total) {
    const h = getHistory();
    h.push({ id: Date.now(), date: new Date().toISOString(), subjectId, subjectName,
             score: parseFloat(score.toFixed(2)), aciertos, errores, omitidas, total });
    localStorage.setItem(HISTORY_KEY, JSON.stringify(h));
}

function clearHistory() {
    if (!confirm('¿Borrar todo el historial de exámenes?')) return;
    localStorage.removeItem(HISTORY_KEY);
    localStorage.removeItem(FALLOS_KEY);
    if (learningChart) { learningChart.destroy(); learningChart = null; }
    document.getElementById('progress-section').style.display = 'none';
    document.getElementById('fallos-section').style.display = 'none';
    document.getElementById('global-progress-fill').style.width = '0%';
    document.getElementById('global-avg-label').textContent = 'Media General';
}

// ─── FALLOS ─────────────────────────────────────────────────────
function getFallos() { return JSON.parse(localStorage.getItem(FALLOS_KEY) || '{}'); }

function saveFallo(subjectId, question) {
    const f = getFallos();
    if (!f[subjectId]) f[subjectId] = {};
    const key = question.concept_id;
    if (!f[subjectId][key]) {
        f[subjectId][key] = { ...question, failCount: 0 };
    }
    f[subjectId][key].failCount++;
    localStorage.setItem(FALLOS_KEY, JSON.stringify(f));
}

function removeFallo(subjectId, conceptId) {
    const f = getFallos();
    if (f[subjectId]) delete f[subjectId][conceptId];
    localStorage.setItem(FALLOS_KEY, JSON.stringify(f));
}

// ─── VIEW ROUTER ────────────────────────────────────────────────
function showView(name) {
    ['dashboard','exam','flashcard','stats'].forEach(v => {
        const el = document.getElementById(`view-${v}`);
        if (el) el.classList.toggle('hidden', v !== name);
    });
    if (name === 'dashboard') renderProgress();
    if (name === 'stats') renderStats();
}

// ─── INIT ────────────────────────────────────────────────────────
async function init() {
    try {
        const v = '?v=' + Date.now();
        const [subRes, qRes, sylRes] = await Promise.all([
            fetch('data/subjects.json' + v),
            fetch('data/test_bank.json' + v),
            fetch('data/syllabus_registry.json' + v).catch(() => null)
        ]);
        APP_STATE.subjects = await subRes.json();
        QUESTION_POOL = await qRes.json();
        if (sylRes && sylRes.ok) APP_STATE.syllabusExams = await sylRes.json();

        renderSubjects();
        renderSyllabusExams();
        renderProgress();
        renderFallosSection();
    } catch (err) {
        console.error('Error loading app data:', err);
    }
}

// ─── RENDER SUBJECTS ────────────────────────────────────────────
function renderSubjects() {
    const grid = document.getElementById('subject-grid');
    grid.innerHTML = '';
    APP_STATE.subjects.forEach(subject => {
        const pool = QUESTION_POOL[subject.id] || [];
        const fallos = getFallos()[subject.id] || {};
        const fallosCount = Object.keys(fallos).length;

        let unitsHTML = '<div class="unit-selector">';
        for (let i = 1; i <= subject.units_count; i++) {
            const unitPool = pool.filter(q => q.unit === i);
            unitsHTML += `<button class="unit-btn" onclick="startExam('${subject.id}',${i})" ${unitPool.length === 0 ? 'disabled title="Sin preguntas"' : ''}>T${i}</button>`;
        }
        unitsHTML += '</div>';

        const card = document.createElement('div');
        card.className = 'subject-card';
        card.style.setProperty('--card-color', subject.color || '#6366f1');
        card.innerHTML = `
            <div class="card-icon">${subject.icon}</div>
            <h3>${subject.name}</h3>
            <div class="card-pool-badge">${pool.length} preguntas</div>
            <div class="exam-selector-large">
                <button onclick="startExam('${subject.id}')">🎯 Simulacro Completo</button>
            </div>
            <div class="card-actions-row">
                <button class="btn-flashcard" onclick="startFlashcard('${subject.id}')">⚡ Flashcards</button>
                ${fallosCount > 0 ? `<button class="btn-fallos" onclick="startFallosExam('${subject.id}')">❌ Repasar fallos (${fallosCount})</button>` : ''}
            </div>
            ${unitsHTML}
        `;
        grid.appendChild(card);
    });
}

// ─── RENDER SYLLABUS ────────────────────────────────────────────
function renderSyllabusExams() {
    const container = document.getElementById('syllabus-container');
    const grid = document.getElementById('syllabus-grid');
    const labsContainer = document.getElementById('labs-container');
    const labsGrid = document.getElementById('labs-grid');

    if (!container) return;

    // Separate labs from syllabus exams
    const labs = APP_STATE.syllabusExams.filter(e => e.type === 'lab');
    const syllabusExams = APP_STATE.syllabusExams.filter(e => e.type !== 'lab');

    // ── RENDER LABS ──────────────────────────────────────────────
    if (labs.length > 0) {
        labsContainer.style.display = 'block';
        labsGrid.innerHTML = '';

        const labColors = {
            bases_de_datos:         { color: '#06b6d4', bg: 'rgba(6,182,212,0.08)', border: 'rgba(6,182,212,0.3)' },
            lenguaje_de_marcas:     { color: '#84cc16', bg: 'rgba(132,204,22,0.08)', border: 'rgba(132,204,22,0.3)' },
            programacion:           { color: '#f97316', bg: 'rgba(249,115,22,0.08)', border: 'rgba(249,115,22,0.3)' },
            entornos_de_desarrollo: { color: '#a855f7', bg: 'rgba(168,85,247,0.08)', border: 'rgba(168,85,247,0.3)' },
        };

        labs.forEach(lab => {
            const subject = APP_STATE.subjects.find(s => s.id === lab.subject_id);
            const theme = labColors[lab.subject_id] || { color: '#6366f1', bg: 'rgba(99,102,241,0.08)', border: 'rgba(99,102,241,0.3)' };
            const card = document.createElement('div');
            card.className = 'lab-card';
            card.style.cssText = `--lab-color:${theme.color};--lab-bg:${theme.bg};--lab-border:${theme.border}`;
            card.innerHTML = `
                <div class="lab-card-icon">${lab.icon || '🧪'}</div>
                <div class="lab-card-body">
                    <div class="lab-card-subject">${subject ? subject.name : lab.subject_id}</div>
                    <h3 class="lab-card-title">${lab.name}</h3>
                    <p class="lab-card-desc">${getLabDescription(lab.id)}</p>
                </div>
                <button class="lab-card-btn" onclick="startLab('${lab.id}')">
                    Abrir Lab →
                </button>
            `;
            labsGrid.appendChild(card);
        });
    }

    // ── RENDER SYLLABUS EXAMS ────────────────────────────────────
    if (syllabusExams.length === 0) return;
    container.style.display = 'block';
    grid.innerHTML = '';

    const grouped = {};
    syllabusExams.forEach(e => {
        if (!grouped[e.subject_id]) grouped[e.subject_id] = [];
        grouped[e.subject_id].push(e);
    });

    Object.keys(grouped).forEach(subjectId => {
        const subject = APP_STATE.subjects.find(s => s.id === subjectId) || { name: subjectId, icon: '📖' };
        const groupEl = document.createElement('div');
        groupEl.className = 'syllabus-group';
        groupEl.innerHTML = `
            <div class="syllabus-group-header">
                <span class="header-icon">${subject.icon}</span>
                <h4>${subject.name}</h4>
                <button class="simulacro-temario-btn" onclick="startSimulacroTemario('${subjectId}')">
                    🎯 Simulacro Completo (40 preguntas)
                </button>
            </div>
            <div class="grid-container syllabus-grid">
                ${grouped[subjectId].map(exam => `
                    <div class="subject-card syllabus-card">
                        <div class="card-icon">${exam.icon || '📖'}</div>
                        <div class="badge-oficial">TEMARIO OFICIAL</div>
                        <h3>${exam.name}</h3>
                        <div class="exam-selector-large">
                            <button onclick="startSyllabusExam('${exam.id}')">Iniciar Examen</button>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
        grid.appendChild(groupEl);
    });
}

function getLabDescription(labId) {
    const descs = {
        bd_lab:   'SQL interactivo, diagramas E-R, normalización y programación de BD en MySQL',
        lm_lab:   'Editor HTML en vivo, validación XML/XSD, XPath y transformaciones XSLT',
        prog_lab: 'POO en Java, colecciones, excepciones, ficheros e hilos con análisis de código',
        ed_lab_uml: 'Diagramas de clases UML, casos de uso, secuencia, estados y actividad'
    };
    return descs[labId] || 'Laboratorio interactivo de práctica';
}

// ─── RENDER FALLOS SECTION ──────────────────────────────────────
function renderFallosSection() {
    const section = document.getElementById('fallos-section');
    const grid = document.getElementById('fallos-grid');
    const fallos = getFallos();
    const subjects = Object.keys(fallos).filter(k => Object.keys(fallos[k]).length > 0);

    if (subjects.length === 0) { section.style.display = 'none'; return; }
    section.style.display = 'block';
    grid.innerHTML = '';

    subjects.forEach(subjectId => {
        const subject = APP_STATE.subjects.find(s => s.id === subjectId);
        const count = Object.keys(fallos[subjectId]).length;
        if (!subject || count === 0) return;
        const card = document.createElement('div');
        card.className = 'subject-card fallos-card';
        card.innerHTML = `
            <div class="card-icon">${subject.icon}</div>
            <h3>${subject.name}</h3>
            <p style="color:var(--text-secondary);font-size:0.9rem;">${count} pregunta${count > 1 ? 's' : ''} fallada${count > 1 ? 's' : ''}</p>
            <div class="exam-selector-large">
                <button onclick="startFallosExam('${subjectId}')">❌ Repasar fallos</button>
            </div>
            <div class="card-actions-row">
                <button class="btn-flashcard" onclick="startFallosFlashcard('${subjectId}')">⚡ Flashcards de fallos</button>
            </div>
        `;
        grid.appendChild(card);
    });
}

// ─── PROGRESS / CHART ───────────────────────────────────────────
function renderProgress() {
    const history = getHistory();
    const section = document.getElementById('progress-section');
    if (history.length === 0) { section.style.display = 'none'; return; }
    section.style.display = 'block';

    const globalAvg = history.reduce((s, e) => s + e.score, 0) / history.length;
    document.getElementById('global-progress-fill').style.width = Math.min(100, (globalAvg / 10) * 100) + '%';
    document.getElementById('global-avg-label').textContent = `Media: ${globalAvg.toFixed(2)} / 10`;

    const subjectColors = {
        sistemas_informaticos: '#6366f1', bases_de_datos: '#22d3ee',
        programacion: '#a855f7', lenguaje_de_marcas: '#f59e0b',
        entornos_de_desarrollo: '#10b981', cloud_computing: '#3b82f6',
        empleabilidad: '#ec4899'
    };

    const bySubject = {};
    history.forEach(e => {
        if (!bySubject[e.subjectId]) bySubject[e.subjectId] = [];
        bySubject[e.subjectId].push({ date: e.date, score: e.score });
    });

    const datasets = Object.entries(bySubject).map(([sid, entries]) => ({
        label: history.find(h => h.subjectId === sid)?.subjectName || sid,
        data: entries.map((e, i) => ({ x: i + 1, y: e.score })),
        borderColor: subjectColors[sid] || '#ffffff',
        backgroundColor: (subjectColors[sid] || '#ffffff') + '22',
        tension: 0.4, fill: false, pointRadius: 5, pointHoverRadius: 8
    }));

    const maxExams = Math.max(...Object.values(bySubject).map(a => a.length));
    datasets.push({
        label: 'Aprobado (5)',
        data: Array.from({ length: maxExams }, (_, i) => ({ x: i + 1, y: 5 })),
        borderColor: '#ef444488', borderDash: [6, 4], borderWidth: 1.5,
        pointRadius: 0, fill: false, tension: 0
    });

    const ctx = document.getElementById('learningChart').getContext('2d');
    if (learningChart) learningChart.destroy();
    learningChart = new Chart(ctx, {
        type: 'line', data: { datasets },
        options: {
            responsive: true, maintainAspectRatio: false,
            interaction: { mode: 'index', intersect: false },
            plugins: {
                legend: { labels: { color: '#94a3b8', font: { family: 'Inter' } } },
                tooltip: {
                    backgroundColor: '#1e293b', borderColor: '#334155', borderWidth: 1,
                    titleColor: '#f8fafc', bodyColor: '#94a3b8',
                    callbacks: {
                        title: items => `Examen nº ${items[0].raw.x}`,
                        label: item => ` ${item.dataset.label}: ${item.raw.y.toFixed(2)}`
                    }
                }
            },
            scales: {
                x: { type: 'linear', title: { display: true, text: 'Nº Examen', color: '#64748b' },
                     ticks: { color: '#64748b', stepSize: 1 }, grid: { color: '#1e293b' } },
                y: { min: 0, max: 10, title: { display: true, text: 'Nota', color: '#64748b' },
                     ticks: { color: '#64748b' }, grid: { color: '#1e293b' } }
            }
        }
    });

    const recent = [...history].reverse().slice(0, 20);
    document.getElementById('history-table-container').innerHTML = `
        <table class="history-table">
            <thead><tr><th>Fecha</th><th>Asignatura</th><th>✅</th><th>❌</th><th>⬜</th><th>Nota</th></tr></thead>
            <tbody>
                ${recent.map(e => {
                    const d = new Date(e.date);
                    const ds = `${d.getDate().toString().padStart(2,'0')}/${(d.getMonth()+1).toString().padStart(2,'0')} ${d.getHours().toString().padStart(2,'0')}:${d.getMinutes().toString().padStart(2,'0')}`;
                    const badge = e.score >= 5 ? `<span class="badge-pass">${e.score.toFixed(2)}</span>` : `<span class="badge-fail">${e.score.toFixed(2)}</span>`;
                    return `<tr><td>${ds}</td><td title="${e.subjectName}">${e.subjectName.split(' ').slice(0,2).join(' ')}</td><td>${e.aciertos}</td><td>${e.errores}</td><td>${e.omitidas}</td><td>${badge}</td></tr>`;
                }).join('')}
            </tbody>
        </table>`;
}

// ─── STATS VIEW ─────────────────────────────────────────────────
function renderStats() {
    const history = getHistory();
    const root = document.getElementById('stats-root');
    if (history.length === 0) { root.innerHTML = '<p style="color:var(--text-secondary);text-align:center;margin-top:4rem;">Aún no hay historial de exámenes.</p>'; return; }

    // Group by subjectId + unit (from subjectName)
    const bySubject = {};
    history.forEach(e => {
        if (!bySubject[e.subjectId]) bySubject[e.subjectId] = { name: e.subjectName.replace(/ \(T\d+\)$/, ''), exams: [] };
        bySubject[e.subjectId].exams.push(e);
    });

    let html = '<div class="stats-grid-full">';
    Object.entries(bySubject).forEach(([sid, data]) => {
        const subject = APP_STATE.subjects.find(s => s.id === sid);
        const avg = data.exams.reduce((s, e) => s + e.score, 0) / data.exams.length;
        const best = Math.max(...data.exams.map(e => e.score));
        const worst = Math.min(...data.exams.map(e => e.score));
        const totalAciertos = data.exams.reduce((s, e) => s + e.aciertos, 0);
        const totalErrores = data.exams.reduce((s, e) => s + e.errores, 0);
        const totalOmitidas = data.exams.reduce((s, e) => s + e.omitidas, 0);
        const totalPreguntas = data.exams.reduce((s, e) => s + e.total, 0);
        const pctAciertos = totalPreguntas > 0 ? ((totalAciertos / totalPreguntas) * 100).toFixed(1) : 0;
        const color = subject?.color || '#6366f1';
        const passedCount = data.exams.filter(e => e.score >= 5).length;

        html += `
        <div class="stats-subject-card">
            <div class="stats-card-header" style="border-left:4px solid ${color}">
                <span style="font-size:1.5rem">${subject?.icon || '📚'}</span>
                <div>
                    <h3>${subject?.name || data.name}</h3>
                    <span style="color:var(--text-secondary);font-size:0.8rem">${data.exams.length} examen${data.exams.length > 1 ? 'es' : ''} realizados</span>
                </div>
                <div class="stats-avg ${avg >= 5 ? 'pass' : 'fail'}">${avg.toFixed(2)}</div>
            </div>
            <div class="stats-bars">
                <div class="stats-bar-row">
                    <span>Media</span>
                    <div class="stats-bar-track"><div class="stats-bar-fill" style="width:${(avg/10)*100}%;background:${color}"></div></div>
                    <span>${avg.toFixed(2)}</span>
                </div>
                <div class="stats-bar-row">
                    <span>% Aciertos</span>
                    <div class="stats-bar-track"><div class="stats-bar-fill" style="width:${pctAciertos}%;background:#10b981"></div></div>
                    <span>${pctAciertos}%</span>
                </div>
            </div>
            <div class="stats-mini-grid">
                <div class="stats-mini-item"><span>🏆 Mejor</span><strong>${best.toFixed(2)}</strong></div>
                <div class="stats-mini-item"><span>📉 Peor</span><strong>${worst.toFixed(2)}</strong></div>
                <div class="stats-mini-item"><span>✅ Aprobados</span><strong>${passedCount}/${data.exams.length}</strong></div>
                <div class="stats-mini-item"><span>❌ Errores</span><strong>${totalErrores}</strong></div>
            </div>
        </div>`;
    });
    html += '</div>';
    root.innerHTML = html;
}

// ─── EXAM ENGINE ────────────────────────────────────────────────
function startExam(subjectId, unitId = null) {
    const subject = APP_STATE.subjects.find(s => s.id === subjectId);
    let pool = QUESTION_POOL[subjectId] || [];
    if (unitId !== null) pool = pool.filter(q => q.unit === unitId);
    if (pool.length === 0) { alert('No hay preguntas disponibles para este tema.'); return; }

    const testSize = unitId !== null ? pool.length : Math.min(20, pool.length);
    const lastIds = JSON.parse(localStorage.getItem(`last_test_${subjectId}`) || '[]');

    APP_STATE.currentExam = subject;
    APP_STATE.currentUnit = unitId;
    APP_STATE.isSyllabusMode = false;
    APP_STATE.examQuestions = getSmartRandom(pool, testSize, lastIds);
    APP_STATE.currentQuestionIndex = 0;
    APP_STATE.answers = [];
    APP_STATE.timer = testSize * 90;

    localStorage.setItem(`last_test_${subjectId}`, JSON.stringify(APP_STATE.examQuestions.map(q => q.concept_id)));

    document.getElementById('exam-subject-label').textContent = `${subject.icon} ${subject.name}${unitId ? ' — Tema ' + unitId : ''}`;
    showView('exam');
    renderQuestion();
    startTimer();
}

function startFallosExam(subjectId) {
    const subject = APP_STATE.subjects.find(s => s.id === subjectId);
    const fallos = getFallos()[subjectId] || {};
    const pool = Object.values(fallos);
    if (pool.length === 0) { alert('No hay fallos registrados para esta asignatura.'); return; }

    APP_STATE.currentExam = subject;
    APP_STATE.currentUnit = null;
    APP_STATE.isSyllabusMode = false;
    APP_STATE.examQuestions = shuffleArray([...pool]);
    APP_STATE.currentQuestionIndex = 0;
    APP_STATE.answers = [];
    APP_STATE.timer = pool.length * 90;

    document.getElementById('exam-subject-label').textContent = `${subject.icon} ${subject.name} — Repaso de Fallos`;
    showView('exam');
    renderQuestion();
    startTimer();
}

// ─── SIMULACRO TEMARIO COMPLETO ─────────────────────────────────
async function startSimulacroTemario(subjectId) {
    const subject = APP_STATE.subjects.find(s => s.id === subjectId);
    const temas = APP_STATE.syllabusExams.filter(e => e.subject_id === subjectId && e.type !== 'lab');

    if (temas.length === 0) { alert('No hay temas disponibles para esta asignatura.'); return; }

    // Show loading state
    document.getElementById('exam-subject-label').textContent = `⏳ Cargando simulacro...`;
    showView('exam');
    document.getElementById('exam-engine-root').innerHTML = `
        <div style="text-align:center;padding:4rem;color:var(--text-secondary)">
            <div style="font-size:2rem;margin-bottom:1rem">⏳</div>
            <p>Cargando preguntas de ${temas.length} temas...</p>
        </div>`;

    try {
        // Fetch all tema files in parallel
        const fetches = temas.map(t => fetch(t.file + '?v=' + Date.now())
            .then(r => r.text())
            .then(text => parseTxtExam(text, t.id))
            .catch(() => []));

        const allArrays = await Promise.all(fetches);
        const allQuestions = allArrays.flat();

        if (allQuestions.length === 0) { alert('No se pudieron cargar preguntas.'); showView('dashboard'); return; }

        // Pick 40 questions distributed across all temas
        const TARGET = 40;
        const perTema = Math.ceil(TARGET / temas.length);
        let selected = [];

        allArrays.forEach((pool, idx) => {
            const shuffled = shuffleArray(pool);
            selected.push(...shuffled.slice(0, perTema));
        });

        // Shuffle final selection and cap at 40
        selected = shuffleArray(selected).slice(0, TARGET);

        // If we got less than 40 (small pools), fill with remaining
        if (selected.length < TARGET) {
            const usedIds = new Set(selected.map(q => q.concept_id));
            const remaining = shuffleArray(allQuestions.filter(q => !usedIds.has(q.concept_id)));
            selected.push(...remaining.slice(0, TARGET - selected.length));
        }

        APP_STATE.currentExam = { ...subject, id: subjectId };
        APP_STATE.currentUnit = null;
        APP_STATE.isSyllabusMode = true;
        APP_STATE.examQuestions = selected;
        APP_STATE.currentQuestionIndex = 0;
        APP_STATE.answers = [];
        APP_STATE.timer = selected.length * 90; // 90s per question = 60min for 40q

        document.getElementById('exam-subject-label').textContent = `📋 ${subject.icon} ${subject.name} — Simulacro Completo (${selected.length} preguntas)`;
        renderQuestion();
        startTimer();

    } catch (err) {
        console.error(err);
        alert('Error al cargar el simulacro.');
        showView('dashboard');
    }
}

async function startSyllabusExam(syllabusId) {
    const examInfo = APP_STATE.syllabusExams.find(e => e.id === syllabusId);
    if (!examInfo) return;
    try {
        const res = await fetch(examInfo.file);
        const text = await res.text();
        const questions = parseTxtExam(text, syllabusId);
        if (questions.length === 0) { alert('No se han podido extraer preguntas del archivo.'); return; }

        APP_STATE.currentExam = { ...examInfo, id: syllabusId };
        APP_STATE.isSyllabusMode = true;
        APP_STATE.examQuestions = questions;
        APP_STATE.currentQuestionIndex = 0;
        APP_STATE.answers = [];
        APP_STATE.timer = questions.length * 90;

        document.getElementById('exam-subject-label').textContent = `📚 ${examInfo.name}`;
        showView('exam');
        renderQuestion();
        startTimer();
    } catch (err) {
        console.error(err);
        alert('Error al cargar el archivo de examen.');
    }
}

function exitExam() {
    if (!confirm('¿Seguro que quieres salir? Se perderá el progreso.')) return;
    clearInterval(APP_STATE.timerInterval);
    document.getElementById('exam-engine-root').innerHTML = '';
    showView('dashboard');
    renderFallosSection();
}

// ─── SMART SHUFFLE ──────────────────────────────────────────────
function shuffleArray(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function getSmartRandom(pool, count, forbiddenIds) {
    const shuffled = shuffleArray(pool);
    const fresh = shuffled.filter(q => !forbiddenIds.includes(q.concept_id));
    const repeats = shuffled.filter(q => forbiddenIds.includes(q.concept_id));
    const freshCount = Math.max(count - 3, count - repeats.length);
    const selected = [...fresh.slice(0, freshCount), ...repeats.slice(0, Math.min(3, count - fresh.slice(0, freshCount).length))];
    if (selected.length < count) {
        const remaining = shuffled.filter(q => !selected.find(s => s.concept_id === q.concept_id));
        selected.push(...remaining.slice(0, count - selected.length));
    }
    return selected.slice(0, count);
}

// ─── TIMER ──────────────────────────────────────────────────────
function startTimer() {
    clearInterval(APP_STATE.timerInterval);
    APP_STATE.timerInterval = setInterval(() => {
        APP_STATE.timer--;
        updateTimerUI();
        if (APP_STATE.timer <= 0) finishExam();
    }, 1000);
}

function updateTimerUI() {
    const el = document.getElementById('exam-timer');
    if (!el) return;
    const min = Math.floor(APP_STATE.timer / 60);
    const sec = APP_STATE.timer % 60;
    el.textContent = `${min}:${sec.toString().padStart(2, '0')}`;
    el.style.color = APP_STATE.timer < 300 ? '#ef4444' : '';
}

// ─── HTML ESCAPE ────────────────────────────────────────────────
function esc(str) {
    return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#039;');
}

// ─── QUESTION RENDER ────────────────────────────────────────────
function renderQuestion() {
    const q = APP_STATE.examQuestions[APP_STATE.currentQuestionIndex];
    if (!q) { finishExam(); return; }
    const total = APP_STATE.examQuestions.length;
    const pct = (APP_STATE.currentQuestionIndex / total) * 100;

    document.getElementById('exam-engine-root').innerHTML = `
        <div class="question-container">
            <div class="question-meta">
                <span>Pregunta ${APP_STATE.currentQuestionIndex + 1} / ${total}</span>
                ${q.unit ? `<span class="unit-badge">Tema ${q.unit}</span>` : ''}
            </div>
            <div class="progress-bar-small" style="width:100%;margin:0.75rem 0 1.5rem">
                <div class="fill" style="width:${pct}%"></div>
            </div>
            <p class="question-text">${esc(q.question)}</p>
            <div id="options-grid" class="options-grid">
                ${q.options.map((opt, i) => `
                    <button class="option-btn" onclick="handleResponse(${i})">
                        <span class="opt-letter">${String.fromCharCode(65+i)}</span>
                        <span>${esc(opt)}</span>
                    </button>
                `).join('')}
            </div>
            <div id="feedback-area" class="feedback-area hidden"></div>
            <div id="next-control" class="hidden" style="margin-top:1.5rem;text-align:right;">
                <button class="next-btn" onclick="nextQuestion()">
                    ${APP_STATE.currentQuestionIndex + 1 < total ? 'Siguiente →' : 'Ver Resultado'}
                </button>
            </div>
        </div>`;
    updateTimerUI();
}

function handleResponse(index) {
    const q = APP_STATE.examQuestions[APP_STATE.currentQuestionIndex];
    const isCorrect = index === q.correct;
    APP_STATE.answers.push({ correct: q.correct, selected: index, question: q });

    document.querySelectorAll('.option-btn').forEach(b => b.disabled = true);
    document.querySelectorAll('.option-btn')[index].classList.add(isCorrect ? 'correct' : 'incorrect');
    if (!isCorrect) {
        document.querySelectorAll('.option-btn')[q.correct].classList.add('correct');
        // Save to fallos
        if (APP_STATE.currentExam?.id) saveFallo(APP_STATE.currentExam.id, q);
        document.getElementById('feedback-area').innerHTML = `
            <div class="explanation-box">
                <strong>❌ Incorrecto</strong>
                <p>Respuesta correcta: <em>${esc(q.options[q.correct])}</em></p>
                <hr style="border-color:rgba(255,255,255,0.07);margin:0.75rem 0">
                <p>${esc(q.explanation)}</p>
            </div>`;
    } else {
        // Remove from fallos if answered correctly
        if (APP_STATE.currentExam?.id) removeFallo(APP_STATE.currentExam.id, q.concept_id);
        document.getElementById('feedback-area').innerHTML = `
            <div class="explanation-box correct-box"><strong>✅ ¡Correcto!</strong></div>`;
    }
    document.getElementById('feedback-area').classList.remove('hidden');
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

// ─── FINISH EXAM ────────────────────────────────────────────────
function finishExam() {
    clearInterval(APP_STATE.timerInterval);
    const total = APP_STATE.examQuestions.length;
    const N = 4;
    let aciertos = 0, errores = 0;
    APP_STATE.answers.forEach(a => {
        if (a.selected === a.correct) aciertos++;
        else if (a.selected !== -1) errores++;
    });
    const omitidas = total - APP_STATE.answers.length;
    const puntuacionBruta = aciertos - errores / (N - 1);
    const puntuacionFinal = Math.max(0, puntuacionBruta);
    const calificacion = (puntuacionFinal / total) * 10;
    const passed = calificacion >= 5;

    const examName = APP_STATE.currentUnit
        ? `${APP_STATE.currentExam.name} (T${APP_STATE.currentUnit})`
        : APP_STATE.currentExam.name;

    saveExamResult(APP_STATE.currentExam.id, examName, calificacion, aciertos, errores, omitidas, total);

    document.getElementById('exam-engine-root').innerHTML = `
        <div class="results-container">
            <h2>Resultado del Examen</h2>
            <div class="score-circle ${passed ? 'passed' : 'failed'}">${calificacion.toFixed(2)}</div>
            <div class="stats-grid">
                <div class="stat-item"><span>✅ Aciertos</span><strong>${aciertos}</strong></div>
                <div class="stat-item"><span>❌ Errores</span><strong>${errores}</strong></div>
                <div class="stat-item"><span>⬜ Omitidas</span><strong>${omitidas}</strong></div>
                <div class="stat-item"><span>📉 Penalización</span><strong>-${(errores/(N-1)).toFixed(2)}</strong></div>
            </div>
            <div class="formula-box">
                <p><strong>Fórmula aplicada (DAW):</strong></p>
                <p>Puntos = ${aciertos} − ${errores} ÷ ${N-1} = <strong>${puntuacionFinal.toFixed(2)}</strong></p>
                <p>Nota = ${puntuacionFinal.toFixed(2)} ÷ ${total} × 10 = <strong>${calificacion.toFixed(2)}</strong></p>
                <small>Blanco = 0 pts | Error = −1/${N-1} pts | Acierto = +1 pto</small>
            </div>
            <div class="feedback-final">
                ${passed ? '<h3>¡Enhorabuena! Has aprobado. 🎉</h3>' : '<h3>Necesitas repasar un poco más. 💪</h3>'}
            </div>
            <div style="display:flex;gap:1rem;justify-content:center;flex-wrap:wrap;margin-top:2rem;">
                <button class="next-btn" onclick="exitExamToHome()">🏠 Volver al Inicio</button>
                <button class="next-btn" style="background:var(--secondary-color)" onclick="startExam('${APP_STATE.currentExam.id}'${APP_STATE.currentUnit ? ', ' + APP_STATE.currentUnit : ''})">🔄 Repetir</button>
            </div>
        </div>`;
}

function exitExamToHome() {
    clearInterval(APP_STATE.timerInterval);
    document.getElementById('exam-engine-root').innerHTML = '';
    showView('dashboard');
    renderFallosSection();
}

// ─── ROBUST TXT PARSER ──────────────────────────────────────────
function parseTxtExam(text, syllabusId) {
    const lines = text.split('\n')
        .map(l => l.trim())
        .filter(l => l !== '' && !l.toLowerCase().match(/^tema\s+\d+$/) && !l.includes('( 1.00 puntos )'));

    const questions = [];
    let i = 0;

    while (i < lines.length) {
        const questionLine = lines[i];
        i++;

        // Collect options: lines until we hit a line that doesn't look like an option
        // Options are: lines starting with * (correct) or plain text that follows a question
        const options = [];
        let correctIndex = 0;

        while (i < lines.length) {
            const line = lines[i];
            // Stop if this line looks like a new question (no * prefix and options already collected)
            if (options.length >= 2) {
                const nextIsOption = line.startsWith('*') || options.length < 4;
                // Heuristic: if we have 3+ options and next line doesn't start with * and is not short, it's a new question
                if (!line.startsWith('*') && options.length >= 3) break;
                if (!line.startsWith('*') && options.length >= 2 && line.length > 80) break;
            }

            if (line.startsWith('*')) {
                correctIndex = options.length;
                options.push(line.substring(1).trim());
            } else {
                options.push(line);
            }
            i++;

            if (options.length >= 4) break;
        }

        if (options.length >= 2) {
            questions.push({
                concept_id: `${syllabusId}_q${questions.length}`,
                question: questionLine,
                options,
                correct: correctIndex,
                explanation: 'Pregunta del temario oficial.',
                unit: null
            });
        }
    }

    return questions;
}

// ─── SYLLABUS LAB ───────────────────────────────────────────────
function startLab(syllabusId) {
    const examInfo = APP_STATE.syllabusExams.find(e => e.id === syllabusId);
    if (!examInfo) return;
    const modal = document.getElementById('lab-modal');
    document.getElementById('lab-root').innerHTML = `
        <iframe src="${examInfo.file}" style="width:100%;height:100%;border:none;border-radius:12px;"></iframe>`;
    modal.classList.remove('hidden');
}

function closeLab() {
    document.getElementById('lab-modal').classList.add('hidden');
    document.getElementById('lab-root').innerHTML = '';
}

// ─── FLASHCARD ENGINE ───────────────────────────────────────────
function startFlashcard(subjectId, poolOverride = null) {
    const subject = APP_STATE.subjects.find(s => s.id === subjectId);
    const pool = poolOverride || shuffleArray(QUESTION_POOL[subjectId] || []);
    if (pool.length === 0) { alert('No hay preguntas disponibles.'); return; }

    APP_STATE.fcQuestions = pool;
    APP_STATE.fcIndex = 0;
    APP_STATE.fcFlipped = false;
    APP_STATE.currentExam = subject;

    document.getElementById('fc-subject-label').textContent = `${subject.icon} ${subject.name} — Flashcards`;
    showView('flashcard');
    renderFlashcard();
}

function startFallosFlashcard(subjectId) {
    const subject = APP_STATE.subjects.find(s => s.id === subjectId);
    const fallos = getFallos()[subjectId] || {};
    const pool = shuffleArray(Object.values(fallos));
    if (pool.length === 0) { alert('No hay fallos registrados.'); return; }
    startFlashcard(subjectId, pool);
    document.getElementById('fc-subject-label').textContent = `${subject.icon} ${subject.name} — Flashcards de Fallos`;
}

function renderFlashcard() {
    const q = APP_STATE.fcQuestions[APP_STATE.fcIndex];
    const total = APP_STATE.fcQuestions.length;
    document.getElementById('fc-counter').textContent = `${APP_STATE.fcIndex + 1} / ${total}`;

    document.getElementById('flashcard-root').innerHTML = `
        <div class="fc-wrapper">
            <div class="fc-card ${APP_STATE.fcFlipped ? 'flipped' : ''}" onclick="flipCard()">
                <div class="fc-front">
                    <div class="fc-hint">Toca para ver la respuesta</div>
                    <p class="fc-question">${esc(q.question)}</p>
                    ${q.unit ? `<span class="unit-badge" style="margin-top:1rem">Tema ${q.unit}</span>` : ''}
                </div>
                <div class="fc-back">
                    <div class="fc-hint">Respuesta correcta</div>
                    <p class="fc-answer">${esc(q.options[q.correct])}</p>
                    <p class="fc-explanation">${esc(q.explanation)}</p>
                </div>
            </div>
            <div class="fc-controls">
                <button class="fc-btn fc-btn-fail" onclick="fcAnswer(false)" ${!APP_STATE.fcFlipped ? 'disabled' : ''}>❌ No lo sabía</button>
                <button class="fc-btn fc-btn-skip" onclick="fcSkip()">⏭ Saltar</button>
                <button class="fc-btn fc-btn-pass" onclick="fcAnswer(true)" ${!APP_STATE.fcFlipped ? 'disabled' : ''}>✅ Lo sabía</button>
            </div>
            <div class="fc-progress">
                <div class="progress-bar-small" style="width:100%">
                    <div class="fill" style="width:${(APP_STATE.fcIndex/total)*100}%"></div>
                </div>
            </div>
        </div>`;
}

function flipCard() {
    APP_STATE.fcFlipped = !APP_STATE.fcFlipped;
    renderFlashcard();
}

function fcAnswer(knew) {
    const q = APP_STATE.fcQuestions[APP_STATE.fcIndex];
    if (!knew && APP_STATE.currentExam?.id) saveFallo(APP_STATE.currentExam.id, q);
    if (knew && APP_STATE.currentExam?.id) removeFallo(APP_STATE.currentExam.id, q.concept_id);
    fcNext();
}

function fcSkip() { fcNext(); }

function fcNext() {
    APP_STATE.fcIndex++;
    APP_STATE.fcFlipped = false;
    if (APP_STATE.fcIndex >= APP_STATE.fcQuestions.length) {
        document.getElementById('flashcard-root').innerHTML = `
            <div class="results-container" style="text-align:center;padding:3rem">
                <h2>🎉 ¡Flashcards completadas!</h2>
                <p style="color:var(--text-secondary);margin:1rem 0">Has repasado ${APP_STATE.fcQuestions.length} tarjetas.</p>
                <div style="display:flex;gap:1rem;justify-content:center;margin-top:2rem;flex-wrap:wrap">
                    <button class="next-btn" onclick="exitFlashcard()">🏠 Volver al Inicio</button>
                    <button class="next-btn" style="background:var(--secondary-color)" onclick="startFlashcard('${APP_STATE.currentExam.id}')">🔄 Repetir</button>
                </div>
            </div>`;
    } else {
        renderFlashcard();
    }
}

function exitFlashcard() {
    document.getElementById('flashcard-root').innerHTML = '';
    showView('dashboard');
    renderFallosSection();
}

// ─── BOOT ───────────────────────────────────────────────────────
init();
