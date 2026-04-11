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
    summaries: {},
    isReviewing: false,
    // flashcard
    fcFlipped: false,
    isFinishing: false,
    studySession: { 
        active: false, 
        subjectId: null, 
        startTime: null, 
        elapsed: 0, 
        timerInterval: null 
    }
};

let QUESTION_POOL = {};
let learningChart = null;

// ─── STORAGE KEYS ───────────────────────────────────────────────
const HISTORY_KEY   = 'exam_history_v2';
const FALLOS_KEY    = 'fallos_v2';
const SR_KEY        = 'spaced_rep_v1';   // repetición espaciada
const MASTERY_KEY   = 'mastery_v1';      // preguntas dominadas (3+ aciertos seguidos)
const TUTOR_PROGRESS_KEY = 'tutor_progress_v1';
const SESSION_SYNC_KEY = 'study_session_v1';

// ─── RESOURCE DEFINITIONS ───────────────────────────────────────
const THEORY_PDFS = {
  "programacion": {
    "1": "Programacion/TemasPDF/TEMA%201.pdf",
    "2": "Programacion/TemasPDF/TEMA%202.pdf",
    "3": "Programacion/TemasPDF/TEMA%203_act.pdf",
    "4": "Programacion/TemasPDF/TEMA%204.pdf",
    "5": "Programacion/TemasPDF/TEMA%205.pdf",
    "6": "Programacion/TemasPDF/TEMA%206.pdf",
    "7": "Programacion/TemasPDF/TEMA%207.pdf",
    "8": "Programacion/TemasPDF/TEMA%208.pdf",
    "9": "Programacion/TemasPDF/TEMA%209.pdf",
    "10": "Programacion/TemasPDF/TEMA%2010.pdf"
  },
  "sistemas_informaticos": {
    "1": "Sistemas%20informaticos/TemasPDF/DAW_SI_UD1_1.pdf",
    "2": "Sistemas%20informaticos/TemasPDF/DAW_SI_UD2.pdf",
    "3": "Sistemas%20informaticos/TemasPDF/DAW_SI_UD3.pdf",
    "4": "Sistemas%20informaticos/TemasPDF/DAW_SI_UD4.pdf",
    "5": "Sistemas%20informaticos/TemasPDF/DAW_SI_UD5.pdf",
    "6": "Sistemas%20informaticos/TemasPDF/DAW_SI_UD6_1.pdf",
    "7": "Sistemas%20informaticos/TemasPDF/DAW_SI_UD7_1.pdf"
  },
  "bases_de_datos": {
    "1": "Bases%20de%20datos/TemasPDF/DAW_BD_UD1.pdf",
    "2": "Bases%20de%20datos/TemasPDF/DAW_BD_UD2.pdf",
    "3": "Bases%20de%20datos/TemasPDF/DAW_BD_UD3.pdf",
    "4": "Bases%20de%20datos/TemasPDF/DAW_BD_UD4%20(1).pdf",
    "5": "Bases%20de%20datos/TemasPDF/DAW_BD_UD5.pdf",
    "6": "Bases%20de%20datos/TemasPDF/DAW_BD_UD6.pdf",
    "7": "Bases%20de%20datos/TemasPDF/DAW_BD_UD7.pdf"
  },
  "lenguaje_de_marcas": {
    "1": "Lenguaje%20de%20marcas/TemasPDF/DAW_LM_UD1_1%20(1).pdf",
    "2": "Lenguaje%20de%20marcas/TemasPDF/DAW_LM_UD2_1.pdf",
    "3": "Lenguaje%20de%20marcas/TemasPDF/DAW_LM_UD3_1.pdf",
    "4": "Lenguaje%20de%20marcas/TemasPDF/DAW_LM_UD4_1.pdf",
    "5": "Lenguaje%20de%20marcas/TemasPDF/DAW_LM_UD5_1.pdf",
    "6": "Lenguaje%20de%20marcas/TemasPDF/DAW_LM_UD6_1.pdf",
    "7": "Lenguaje%20de%20marcas/TemasPDF/DAW_LM_UD7_1.pdf",
    "8": "Lenguaje%20de%20marcas/TemasPDF/DAW_LM_UD8_1.pdf"
  },
  "entornos_de_desarrollo": {
    "1": "Entornos%20de%20desarrollo/TemasPDF/DAW_ED_UD1_PORTADANUEVA_1.pdf",
    "2": "Entornos%20de%20desarrollo/TemasPDF/DAW_ED_UD2_PORTADANUEVA_1.pdf",
    "3": "Entornos%20de%20desarrollo/TemasPDF/DAW_ED_UD3_PORTADANUEVA.pdf",
    "4": "Entornos%20de%20desarrollo/TemasPDF/DAW_ED_UD4_PORTADANUEVA_1.pdf",
    "5": "Entornos%20de%20desarrollo/TemasPDF/DAW_ED_UD5_PORTADANUEVA_1.pdf",
    "6": "Entornos%20de%20desarrollo/TemasPDF/DAW_ED_UD6_PORTADANUEVA_1.pdf",
    "7": "Entornos%20de%20desarrollo/TemasPDF/DAW_ED_UD7_PORTADANUEVA_1.pdf"
  },
  "cloud_computing": {
    "1": "Cloud%20Computing/TemasPDF/Modulo-1-Conceptos-de-la-computacion-en-la-nube.pdf",
    "2": "Cloud%20Computing/TemasPDF/Modulo-2-Economia-y-facturacion-en-la-nube.pdf",
    "3": "Cloud%20Computing/TemasPDF/Modulo-3-Infraestructura-de-la-nube.pdf",
    "4": "Cloud%20Computing/TemasPDF/Modulo-4-Seguridad-en-la-nube.pdf",
    "5": "Cloud%20Computing/TemasPDF/Modulo-5-Redes-y-Entrega-de-Contenidos.pdf",
    "6": "Cloud%20Computing/TemasPDF/Modulo-6-Servicios-de-computo.pdf",
    "7": "Cloud%20Computing/TemasPDF/Modulo-7-Servicios-de-almacenamiento.pdf",
    "8": "Cloud%20Computing/TemasPDF/Modulo-8-Servicios-de-bases-de-datos.pdf",
    "9": "Cloud%20Computing/TemasPDF/Modulo-9-Arquitectura-en-la-nube.pdf",
    "10": "Cloud%20Computing/TemasPDF/Modulo-10-Escalado-automatico-y-monitorizacion.pdf"
  },
  "empleabilidad": {
    "1": "Empleabilidad/TemasPDF/UD1_EI_PORTADANUEVA.pdf",
    "2": "Empleabilidad/TemasPDF/UD2_EI_PORTADANUEVA.pdf",
    "3": "Empleabilidad/TemasPDF/UD3_EI_PORTADANUEVA.pdf",
    "4": "Empleabilidad/TemasPDF/UD4_EI_PORTADANUEVA.pdf",
    "5": "Empleabilidad/TemasPDF/UD5_EI_PORTADANUEVA.pdf"
  }
};

const THEORY_INFOGRAPHICS = {
    "empleabilidad": {
        "1": "Empleabilidad/informe%20e%20infografia/infografia_emp_1_2.png",
        "2": "Empleabilidad/informe%20e%20infografia/infografia_emp_1_2.png",
        "3": "Empleabilidad/informe%20e%20infografia/infografia_emp_3.png",
        "4": "Empleabilidad/informe%20e%20infografia/infografia_emp_4.png",
        "5": "Empleabilidad/informe%20e%20infografia/infografia_emp_5.png"
    },
    "programacion": {
        "1": "Programacion/informes%20y%20presentaciones/infografia_prog_1.png",
        "2": "Programacion/informes%20y%20presentaciones/infografia_prog_2.png",
        "3": "Programacion/informes%20y%20presentaciones/infografia_prog_3.png",
        "4": "Programacion/informes%20y%20presentaciones/infografia_prog_4.png",
        "5": "Programacion/informes%20y%20presentaciones/infografia_prog_5.png",
        "6": "Programacion/informes%20y%20presentaciones/infografia_prog_6.png",
        "7": "Programacion/informes%20y%20presentaciones/infografia_prog_7.png",
        "8": "Programacion/informes%20y%20presentaciones/infografia_prog_8.png",
        "9": "Programacion/informes%20y%20presentaciones/infografia_prog_9.png",
        "10": "Programacion/informes%20y%20presentaciones/infografia_prog_10.png"
    },
    "sistemas_informaticos": {
        "1": "Sistemas%20informaticos/informes%20y%20presentaciones/infografia_tema_1.png",
        "2": "Sistemas%20informaticos/informes%20y%20presentaciones/infografia_tema_2.png",
        "3": "Sistemas%20informaticos/informes%20y%20presentaciones/infografia_tema_3.png",
        "4": "Sistemas%20informaticos/informes%20y%20presentaciones/infografia_tema_4.png",
        "5": "Sistemas%20informaticos/informes%20y%20presentaciones/infografia_tema_5.png",
        "6": "Sistemas%20informaticos/informes%20y%20presentaciones/infografia_tema_6.png",
        "7": "Sistemas%20informaticos/informes%20y%20presentaciones/infografia_tema_7.png"
    },
    "bases_de_datos": {
        "1": "Bases%20de%20datos/informes%20y%20presentaciones/infografia_tema_1.png",
        "2": "Bases%20de%20datos/informes%20y%20presentaciones/infografia_tema_2.png",
        "3": "Bases%20de%20datos/informes%20y%20presentaciones/infografia_tema_3.png",
        "4": "Bases%20de%20datos/informes%20y%20presentaciones/infografia_tema_4.png",
        "5": "Bases%20de%20datos/informes%20y%20presentaciones/infografia_tema_5.png",
        "6": "Bases%20de%20datos/informes%20y%20presentaciones/infografia_tema_6.png"
    },
    "entornos_de_desarrollo": {
        "1": "Entornos%20de%20desarrollo/informes%20y%20presentaciones/infografia_tema_1.png",
        "2": "Entornos%20de%20desarrollo/informes%20y%20presentaciones/infografia_tema_2.png",
        "3": "Entornos%20de%20desarrollo/informes%20y%20presentaciones/infografia_tema_3.png",
        "4": "Entornos%20de%20desarrollo/informes%20y%20presentaciones/infografia_tema_4.png",
        "5": "Entornos%20de%20desarrollo/informes%20y%20presentaciones/infografia_tema_5.png",
        "6": "Entornos%20de%20desarrollo/informes%20y%20presentaciones/infografia_tema_6.png",
        "7": "Entornos%20de%20desarrollo/informes%20y%20presentaciones/infografia_tema_7.png"
    },
    "cloud_computing": {
        "1": "Cloud%20Computing/informes%20y%20presentaciones/infografia_tema_1.png",
        "2": "Cloud%20Computing/informes%20y%20presentaciones/infografia_tema_2.png",
        "3": "Cloud%20Computing/informes%20y%20presentaciones/infografia_tema_3.png",
        "4": "Cloud%20Computing/informes%20y%20presentaciones/infografia_tema_4.png",
        "5": "Cloud%20Computing/informes%20y%20presentaciones/infografia_tema_5.png",
        "6": "Cloud%20Computing/informes%20y%20presentaciones/infografia_tema_6.png",
        "7": "Cloud%20Computing/informes%20y%20presentaciones/infografia_tema_7.png",
        "8": "Cloud%20Computing/informes%20y%20presentaciones/infografia_tema_8.png",
        "9": "Cloud%20Computing/informes%20y%20presentaciones/infografia_tema_9.png",
        "10": "Cloud%20Computing/informes%20y%20presentaciones/infografia_tema_10.png"
    },
    "lenguaje_de_marcas": {
        "1": "Lenguaje%20de%20marcas/informes%20y%20presentaciones/infografia_tema_1.png",
        "2": "Lenguaje%20de%20marcas/informes%20y%20presentaciones/infografia_tema_2.png",
        "3": "Lenguaje%20de%20marcas/informes%20y%20presentaciones/infografia_tema_3.png",
        "4": "Lenguaje%20de%20marcas/informes%20y%20presentaciones/infografia_tema_4.png",
        "5": "Lenguaje%20de%20marcas/informes%20y%20presentaciones/infografia_tema_5.png",
        "6": "Lenguaje%20de%20marcas/informes%20y%20presentaciones/infografia_tema_6.png",
        "7": "Lenguaje%20de%20marcas/informes%20y%20presentaciones/infografia_tema_7.png",
        "8": "Lenguaje%20de%20marcas/informes%20y%20presentaciones/infografia_tema_8.png"
    }
};


const THEORY_REPORTS = {
    "empleabilidad": {
        "1": "Empleabilidad/informe%20e%20infografia/Guía_de_Derechos_Laborales.pdf",
        "2": "Empleabilidad/informe%20e%20infografia/IT_Safety_Blueprint.pdf",
        "3": "Empleabilidad/informe%20e%20infografia/Professional_Career_Dashboard.pdf",
        "4": "Empleabilidad/informe%20e%20infografia/IT_Career_Blueprint.pdf",
        "5": "Empleabilidad/informe%20e%20infografia/The_IT_Career_Code.pdf"
    },
    "programacion": {
        "1": "Programacion/informes%20y%20presentaciones/Blueprint_to_Console.pdf",
        "2": "Programacion/informes%20y%20presentaciones/Java_Code_Blueprint.pdf",
        "3": "Programacion/informes%20y%20presentaciones/Java_Data_Architecture.pdf",
        "4": "Programacion/informes%20y%20presentaciones/Digital_Architecture_Mastery.pdf",
        "5": "Programacion/informes%20y%20presentaciones/Java_Architecture_Blueprint.pdf",
        "6": "Programacion/informes%20y%20presentaciones/Java_Object_Mastery.pdf",
        "7": "Programacion/informes%20y%20presentaciones/Java_Exceptions_and_Collections.pdf",
        "8": "Programacion/informes%20y%20presentaciones/Java_Data_Logistics.pdf",
        "9": "Programacion/informes%20y%20presentaciones/The_JDBC_Blueprint.pdf",
        "10": "Programacion/informes%20y%20presentaciones/Native_Object_Databases.pdf"
    }
};

// ─── REPETICIÓN ESPACIADA (SM-2 simplificado) ───────────────────
function getSR() { return Sync.get(SR_KEY, {}); }

function updateSR(conceptId, correct) {
    const sr = getSR();
    if (!sr[conceptId]) sr[conceptId] = { interval: 1, easiness: 2.5, streak: 0, nextReview: 0 };
    const card = sr[conceptId];
    if (correct) {
        card.streak++;
        card.interval = card.streak === 1 ? 1 : card.streak === 2 ? 3 : Math.round(card.interval * card.easiness);
        card.easiness = Math.max(1.3, card.easiness + 0.1);
    } else {
        card.streak = 0;
        card.interval = 1;
        card.easiness = Math.max(1.3, card.easiness - 0.2);
    }
    card.nextReview = Date.now() + card.interval * 24 * 60 * 60 * 1000;
    Sync.set(SR_KEY, sr);
}

function getSRPriority(conceptId) {
    const sr = getSR()[conceptId];
    if (!sr) return 1; // new card = high priority
    if (Date.now() >= sr.nextReview) return 1; // due for review
    return 0; // not due yet
}

// ─── MASTERY (preguntas dominadas) ──────────────────────────────
function getMastery() { return Sync.get(MASTERY_KEY, {}); }

function updateMastery(conceptId, correct) {
    const m = getMastery();
    if (!m[conceptId]) m[conceptId] = { streak: 0 };
    if (correct) { m[conceptId].streak++; }
    else { m[conceptId].streak = 0; }
    Sync.set(MASTERY_KEY, m);
}

function isMastered(conceptId) {
    const m = getMastery()[conceptId];
    return m && m.streak >= 3;
}

// ─── HISTORY ────────────────────────────────────────────────────
function getHistory() { return Sync.get(HISTORY_KEY, []); }

function saveExamResult(subjectId, subjectName, score, aciertos, errores, omitidas, total, unitId = null) {
    const h = getHistory();
    h.push({ id: Date.now(), date: new Date().toISOString(), subjectId, subjectName,
             score: parseFloat(score.toFixed(2)), aciertos, errores, omitidas, total, unitId });
    Sync.set(HISTORY_KEY, h);
}

function clearHistory() {
    if (!confirm('¿Borrar todo el historial de exámenes?')) return;
    Sync.remove(HISTORY_KEY);
    Sync.remove(FALLOS_KEY);
    if (learningChart) { learningChart.destroy(); learningChart = null; }
    document.getElementById('progress-section').style.display = 'none';
    document.getElementById('fallos-section').style.display = 'none';
    document.getElementById('global-progress-fill').style.width = '0%';
    document.getElementById('global-avg-label').textContent = 'Media General';
}

// ─── FALLOS ─────────────────────────────────────────────────────
function getFallos() { return Sync.get(FALLOS_KEY, {}); }

function saveFallo(subjectId, question) {
    const f = getFallos();
    if (!f[subjectId]) f[subjectId] = {};
    const key = question.concept_id;
    if (!f[subjectId][key]) {
        f[subjectId][key] = { ...question, failCount: 0 };
    }
    f[subjectId][key].failCount++;
    Sync.set(FALLOS_KEY, f);
}

function removeFallo(subjectId, conceptId) {
    const f = getFallos();
    if (f[subjectId]) delete f[subjectId][conceptId];
    Sync.set(FALLOS_KEY, f);
}

// ─── VIEW ROUTER ────────────────────────────────────────────────
function showView(name) {
    ['dashboard','exam','flashcard','stats'].forEach(v => {
        const el = document.getElementById(`view-${v}`);
        if (el) el.classList.toggle('hidden', v !== name);
    });
    if (name === 'dashboard') {
        renderProgress();
        renderTutorMessage();
        // Always ensure we have a section visible
        if (!document.querySelector('.dash-section:not(.hidden)')) {
            switchDash('overview');
        }
    }
    if (name === 'stats') renderStats();
}

function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    if (sidebar) sidebar.classList.toggle('open');
    if (overlay) overlay.classList.toggle('open');
}

function switchDash(sectionId) {
    // Toggle active link
    document.querySelectorAll('.side-link').forEach(link => {
        link.classList.toggle('active', link.getAttribute('data-section') === sectionId);
    });

    // Toggle sections
    document.querySelectorAll('.dash-section').forEach(sec => {
        sec.classList.toggle('hidden', sec.id !== `dash-section-${sectionId}`);
    });

    // Update Top Bar Title
    const titles = {
        'overview': 'Resumen Académico',
        'simulacros': 'Simulacros y Teoría',
        'labs': 'Laboratorios Interactivos',
        'temario': 'Tests del temario oficial (Los que hemos hecho en cada tema)',
        'planner': 'Planificador de Estudio',
        'progreso': 'Mi Análisis de Progreso',
        'fallos': 'Repaso de Errores'
    };
    const titleEl = document.getElementById('current-section-title');
    if (titleEl) titleEl.textContent = titles[sectionId] || 'Dashboard';

    // Close sidebar on mobile after selection
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    if (sidebar && sidebar.classList.contains('open')) {
        sidebar.classList.remove('open');
        if (overlay) overlay.classList.remove('open');
    }

    // Auto-scroll to top of main content
    const mainContent = document.querySelector('.main-content');
    if (mainContent) mainContent.scrollTop = 0;

    // Special renders
    if (sectionId === 'overview') {
        renderStudyGuide();
        renderActivityLog();
    }
    if (sectionId === 'simulacros') renderSubjects();
    if (sectionId === 'labs') renderLabs();
    if (sectionId === 'temario') renderSyllabusExams();
    if (sectionId === 'planner') renderAcademicPlanner();
    if (sectionId === 'progreso') renderProgress();
    if (sectionId === 'fallos') renderFallosSection();
}

// ─── INIT ────────────────────────────────────────────────────────
// ─── INIT ────────────────────────────────────────────────────────
async function init() {
    try {
        // Use Global Data (loaded via script tags in index.html to avoid CORS/Local File issues)
        if (typeof SUBJECTS_DATA !== 'undefined') APP_STATE.subjects = SUBJECTS_DATA;
        if (typeof TEST_BANK_DATA !== 'undefined') QUESTION_POOL = TEST_BANK_DATA;
        if (typeof SYLLABUS_REGISTRY_DATA !== 'undefined') APP_STATE.syllabusExams = SYLLABUS_REGISTRY_DATA;
        if (typeof STUDY_SUMMARIES_DATA !== 'undefined') APP_STATE.summaries = STUDY_SUMMARIES_DATA;

        // Fallback or data integrity check
        if (APP_STATE.subjects.length === 0) {
            console.warn('Data not found in global variables, attempting fallback fetch...');
            const v = '?v=' + Date.now();
            const [subRes, qRes, sylRes] = await Promise.all([
                fetch('data/subjects.json' + v).catch(() => null),
                fetch('data/test_bank.json' + v).catch(() => null),
                fetch('data/syllabus_registry.json' + v).catch(() => null),
                fetch('data/study_summaries.json' + v).then(r => r.json()).then(d => APP_STATE.summaries = d).catch(() => {})
            ]);
            
            if (subRes && subRes.ok) APP_STATE.subjects = await subRes.json();
            if (qRes && qRes.ok) QUESTION_POOL = await qRes.json();
            if (sylRes && sylRes.ok) APP_STATE.syllabusExams = await sylRes.json();
        }

        renderProgress();
        renderAcademicPlanner();
        renderTutorMessage();
        restoreStudySession();
        switchDash('overview');
        console.log('App initialized successfully | Data loaded from:', (typeof SUBJECTS_DATA !== 'undefined' ? 'Global JS' : 'Fetch API'));
    } catch (err) {
        console.error('Error loading app data:', err);
        switchDash('overview');
    }
}



// ─── RENDER SUBJECTS ────────────────────────────────────────────
function renderSubjects() {
    const grid = document.getElementById('subject-grid');
    grid.innerHTML = '';
    const history = getHistory();

    APP_STATE.subjects.forEach(subject => {
        const pool = QUESTION_POOL[subject.id] || [];
        const fallos = getFallos()[subject.id] || {};
        const fallosCount = Object.keys(fallos).length;

        // Subject-wide attempts (where unitId is null)
        const subjectAttempts = history.filter(h => h.subjectId === subject.id && !h.unitId).length;

        let unitsHTML = '<div class="unit-selector">';
        for (let i = 1; i <= subject.units_count; i++) {
            const unitPool = pool.filter(q => q.unit === i);
            const pdfPath = THEORY_PDFS[subject.id]?.[i];
            const videoPath = SUBJECT_VIDEOS[subject.id]?.[i];
            const infoPath = THEORY_INFOGRAPHICS[subject.id]?.[i];
            const reportPath = THEORY_REPORTS[subject.id]?.[i];
            
            // Unified count: Interactive attempts + Syllabus (PDF) attempts for this unit
            const relatedSyllabusIds = APP_STATE.syllabusExams
                .filter(e => e.subject_id === subject.id && e.unit === i)
                .map(e => e.id);
            const unitAttempts = history.filter(h => 
                (h.subjectId === subject.id && h.unitId === i) || 
                (relatedSyllabusIds.includes(h.subjectId))
            ).length;
            
            // Resource flags
            const hasPDF = !!pdfPath;
            const hasSumm = hasSummary(subject.id, i);
            const hasVideo = !!videoPath;
            const hasInfo = !!infoPath;
            const hasRepos = !!reportPath;

            unitsHTML += `
                <div class="topic-frame ${unitPool.length === 0 ? 'disabled' : ''}" 
                     onclick="${unitPool.length > 0 ? `startExam('${subject.id}',${i})` : ''}"
                     title="${unitPool.length > 0 ? `Hacer test del Tema ${i}` : 'Sin preguntas'}">
                    <div class="topic-header">
                        <span class="topic-title">TEMA ${i}</span>
                        ${unitAttempts > 0 ? `<span class="topic-badge">${unitAttempts}</span>` : ''}
                        <span class="topic-play-icon">🎯</span>
                    </div>
                    <div class="topic-content" onclick="event.stopPropagation()">
                        ${hasPDF ? `<a href="${pdfPath}" target="_blank" class="res-link-labeled pdf" title="Ver teoría PDF" onclick="logTheory('${subject.name}', ${i}, '${subject.id}')">📄<span>PDF</span></a>` : ''}
                        ${hasSumm ? `<a href="javascript:void(0)" onclick="openSummary('${subject.id}', ${i})" class="res-link-labeled summary" title="Ver Resumen del Tema">📝<span>SMRY</span></a>` : ''}
                        ${hasVideo ? `<a href="javascript:void(0)" onclick="openVideo('${videoPath}')" class="res-link-labeled video" title="Ver video de repaso">🎬<span>VIDEO</span></a>` : ''}
                        ${hasRepos ? `<a href="${reportPath}" target="_blank" class="res-link-labeled report" title="Ver Informe Detallado">📊<span>INFO</span></a>` : ''}
                        ${hasInfo ? `<a href="${infoPath}" target="_blank" class="res-link-labeled infographic" title="Ver Infografía">🖼️<span>MAPA</span></a>` : ''}
                    </div>
                </div>`;
        }
        unitsHTML += '</div>';

        // Mark today's subjects
        const todaySubjects = getDailySubjects()?.subjects || [];
        const isToday = todaySubjects.includes(subject.id);

        const card = document.createElement('div');
        card.className = `subject-card${isToday ? ' subject-card-today' : ''}`;
        card.setAttribute('data-subject-id', subject.id);
        card.style.setProperty('--card-color', subject.color || '#6366f1');
        card.innerHTML = `
            <div class="card-icon">${subject.icon}</div>
            <h3>${subject.name}</h3>
            <div class="card-badges">
                <div class="card-pool-badge">${pool.length} preguntas</div>
                ${subjectAttempts > 0 ? `<div class="badge-attempts">🎯 Simulacros: ${subjectAttempts}</div>` : ''}
            </div>
            <div class="exam-selector-large">
                <button onclick="startExam('${subject.id}')">🎯 Simulacro Completo</button>
            </div>
            <div class="card-actions-row">
                <button class="btn-flashcard" onclick="startFlashcard('${subject.id}')">⚡ Flashcards</button>
                <button class="btn-solo-nosé" onclick="startExam('${subject.id}', null, 'solo_no_se')" title="Solo preguntas no dominadas">🎯 Solo lo que no sé</button>
                ${fallosCount > 0 ? `<button class="btn-fallos" onclick="startFallosExam('${subject.id}')">❌ Repasar fallos (${fallosCount})</button>` : ''}
            </div>
            ${unitsHTML}
        `;
        grid.appendChild(card);
    });
}

// ─── RENDER SYLLABUS ────────────────────────────────────────────
function renderLabs() {
    const labsContainer = document.getElementById('labs-container');
    const labsGrid = document.getElementById('labs-grid');

    if (!labsGrid) return;

    // Separate labs from syllabus exams
    const labs = APP_STATE.syllabusExams.filter(e => e.type === 'lab');

    if (labs.length === 0) {
        labsGrid.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">🧪</div>
                <p>No hay laboratorios interactivos disponibles en este momento.</p>
            </div>`;
        return;
    }

    labsGrid.innerHTML = '';

    const labColors = {
        bases_de_datos:         { color: '#06b6d4', bg: 'rgba(6,182,212,0.08)', border: 'rgba(6,182,212,0.3)' },
        lenguaje_de_marcas:     { color: '#84cc16', bg: 'rgba(132,204,22,0.08)', border: 'rgba(132,204,22,0.3)' },
        programacion:           { color: '#f97316', bg: 'rgba(249,115,22,0.08)', border: 'rgba(249,115,22,0.3)' },
        entornos_de_desarrollo: { color: '#a855f7', bg: 'rgba(168,85,247,0.08)', border: 'rgba(168,85,247,0.3)' },
        sistemas_informaticos:  { color: '#10b981', bg: 'rgba(16,185,129,0.08)', border: 'rgba(16,185,129,0.3)' },
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
                <p class="lab-card-desc">${typeof getLabDescription === 'function' ? getLabDescription(lab.id) : lab.name}</p>
            </div>
            <button class="lab-card-btn" onclick="startLab('${lab.id}')">
                Abrir Lab →
            </button>
        `;
        labsGrid.appendChild(card);
    });
}

function renderSyllabusExams() {
    const grid = document.getElementById('syllabus-grid');

    if (!grid) return;

    const syllabusExams = APP_STATE.syllabusExams.filter(e => e.type !== 'lab');
    const history = getHistory(); // Get full history to count attempts

    if (syllabusExams.length === 0) {
        grid.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">📚</div>
                <p>No se han encontrado exámenes del temario oficial.</p>
            </div>`;
        return;
    }

    const grouped = {};
    syllabusExams.forEach(e => {
        if (!grouped[e.subject_id]) grouped[e.subject_id] = [];
        grouped[e.subject_id].push(e);
    });

    Object.keys(grouped).forEach(subjectId => {
        const subject = APP_STATE.subjects.find(s => s.id === subjectId) || { name: subjectId, icon: '📖' };
        const fallos = getFallos()[subjectId] || {};
        const fallosCount = Object.keys(fallos).length;

        const groupEl = document.createElement('div');
        groupEl.className = 'syllabus-group';
        groupEl.id = `syllabus-group-${subjectId}`;
        groupEl.innerHTML = `
            <div class="syllabus-group-header">
                <span class="header-icon">${subject.icon}</span>
                <h4>${subject.name}</h4>
                <div class="syllabus-group-actions">
                    <button class="simulacro-temario-btn" onclick="startSimulacroTemario('${subjectId}')">
                        🎯 Simulacro (40 preguntas)
                    </button>
                    <button class="btn-flashcard" onclick="startSyllabusFlashcard('${subjectId}')" title="Flashcards del temario">
                        ⚡ Flashcards
                    </button>
                    ${fallosCount > 0 ? `<button class="btn-fallos" onclick="startFallosExam('${subjectId}')" title="Repasar fallos">
                        ❌ Fallos (${fallosCount})
                    </button>` : ''}
                </div>
            </div>
            <div class="grid-container syllabus-grid">
                ${grouped[subjectId].map(exam => {
                    // Unified count for PDF cards too
                    const unitId = exam.unit;
                    const relatedSyllabusIds = APP_STATE.syllabusExams
                        .filter(e => e.subject_id === exam.subject_id && e.unit === unitId && unitId !== undefined)
                        .map(e => e.id);
                    
                    const attempts = history.filter(h => 
                        (h.subjectId === exam.id) || 
                        (unitId !== undefined && h.subjectId === exam.subject_id && h.unitId === unitId) ||
                        (unitId !== undefined && relatedSyllabusIds.includes(h.subjectId))
                    ).length;
                    return `
                    <div class="subject-card syllabus-card ${exam.type === 'examen_final' ? 'examen-final-card' : ''}">
                        <div class="card-icon">${exam.icon || '📖'}</div>
                        <div class="card-badges">
                            ${exam.type === 'examen_final'
                                ? `<div class="badge-examen-final">EXAMEN FINAL</div>`
                                : `<div class="badge-oficial">TEMARIO OFICIAL</div>`}
                            ${attempts > 0 ? `<div class="badge-attempts">🔄 Repetido: ${attempts}</div>` : ''}
                        </div>
                        <h3>${exam.name}</h3>
                        <div class="exam-selector-large">
                            ${exam.type === 'examen_final'
                                ? `<button onclick="startExamenFinal('${exam.subject_id}')" style="background:linear-gradient(135deg,#ef4444,#f97316)">🎯 Iniciar Simulacro Final</button>`
                                : `<button onclick="startSyllabusExam('${exam.id}')">Iniciar Examen</button>`}
                        </div>
                        ${exam.type === 'examen_final' ? `<p style="font-size:0.75rem;color:var(--text-secondary);margin-top:0.5rem">30 teóricas + 30 prácticas · Penalización -1/3</p>` : ''}
                    </div>
                `}).join('')}
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
    const grid = document.getElementById('fallos-grid');
    if (!grid) return;

    const fallos = getFallos();
    const subjects = Object.keys(fallos).filter(k => Object.keys(fallos[k]).length > 0);

    if (subjects.length === 0) {
        grid.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">❌</div>
                <p>¡Buen trabajo! No tienes fallos acumulados en este momento.</p>
                <button class="btn-secondary" onclick="switchDash('simulacros')" style="margin-top:1rem">Ir a Simulacros</button>
            </div>`;
        return;
    }

    grid.innerHTML = '';

    subjects.forEach(subjectId => {
        const subject = APP_STATE.subjects.find(s => s.id === subjectId);
        const subjectFallos = fallos[subjectId];
        const count = Object.keys(subjectFallos).length;
        if (!subject || count === 0) return;

        // ── Analyse which temas have most failures ──────────────
        const byTema = {};
        Object.values(subjectFallos).forEach(q => {
            // concept_id format: "subjectId_tN_qX" or syllabus "syllabusId_qX"
            // Extract tema from concept_id or from the question's unit field
            let tema = q.unit || extractTemaFromId(q.concept_id, subjectId);
            if (!byTema[tema]) byTema[tema] = [];
            byTema[tema].push(q);
        });

        // Sort temas by failure count
        const sortedTemas = Object.entries(byTema)
            .sort((a, b) => b[1].length - a[1].length);

        const worstTema = sortedTemas[0];
        const worstTemaNum = worstTema ? worstTema[0] : null;
        const worstCount = worstTema ? worstTema[1].length : 0;

        // ── Get PDF info for worst tema ─────────────────────────
        const pdfInfo = PDF_MAP[subjectId]?.[worstTemaNum];
        const pdfLink = pdfInfo ? `
            <div class="fallos-pdf-hint">
                <span class="pdf-icon">📄</span>
                <div>
                    <div class="pdf-hint-label">Consulta el PDF del ${pdfInfo.name}</div>
                    <a href="${pdfInfo.path}" target="_blank" class="pdf-link">
                        Abrir ${pdfInfo.name} (${pdfInfo.total_pages}p) →
                    </a>
                </div>
            </div>` : '';

        // ── Tema breakdown ──────────────────────────────────────
        const temaBreakdown = sortedTemas.slice(0, 4).map(([tema, qs]) => `
            <div class="tema-fail-row">
                <span class="tema-fail-label">${tema !== 'null' && tema ? 'Tema ' + tema : 'Temario'}</span>
                <div class="tema-fail-bar-track">
                    <div class="tema-fail-bar" style="width:${Math.min(100, (qs.length / count) * 100)}%"></div>
                </div>
                <span class="tema-fail-count">${qs.length}</span>
            </div>`).join('');

        const card = document.createElement('div');
        card.className = 'subject-card fallos-card';
        card.innerHTML = `
            <div class="card-icon">${subject.icon}</div>
            <h3>${subject.name}</h3>
            <p class="fallos-total">${count} pregunta${count > 1 ? 's' : ''} fallada${count > 1 ? 's' : ''}</p>
            ${worstTemaNum && worstTemaNum !== 'null' ? `
            <div class="fallos-worst-tema">
                <span class="worst-tema-badge">⚠️ Peor tema: ${worstTemaNum !== 'null' ? 'Tema ' + worstTemaNum : 'Temario'}</span>
                <span class="worst-tema-count">${worstCount} fallos</span>
            </div>` : ''}
            <div class="tema-breakdown">${temaBreakdown}</div>
            ${pdfLink}
            <div class="exam-selector-large" style="margin-top:0.75rem">
                <button onclick="startFallosExam('${subjectId}')">❌ Repasar fallos</button>
            </div>
            <div class="card-actions-row">
                <button class="btn-flashcard" onclick="startFallosFlashcard('${subjectId}')">⚡ Flashcards</button>
            </div>
        `;
        grid.appendChild(card);
    });
}

function extractTemaFromId(conceptId, subjectId) {
    // Try to extract tema number from concept_id
    // Formats: "bd_tema_1_q0", "prog_t2_q5", "sistemas_informaticos_5", etc.
    const m = conceptId.match(/_t(\d+)_/) || conceptId.match(/tema[_\s](\d+)/i) || conceptId.match(/_(\d+)$/);
    return m ? m[1] : null;
}

// PDF map loaded from data/pdf_map.json
let PDF_MAP = {};
fetch('data/pdf_map.json?v=' + Date.now())
    .then(r => r.json())
    .then(data => { PDF_MAP = data; })
    .catch(() => {});


// ─── PROGRESS / CHART ───────────────────────────────────────────
function renderProgress() {
    const history = getHistory();
    const grid = document.getElementById('progress-section');
    if (!grid) return;

    if (history.length === 0) {
        grid.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">📈</div>
                <p>Aún no hay datos de progreso. Realiza tu primer simulacro para empezar a ver tus estadísticas.</p>
                <button class="btn-secondary" onclick="switchDash('simulacros')" style="margin-top:1rem">Empezar a practicar</button>
            </div>`;
        return;
    }

    // Ensure the main layout is present if history exists
    grid.innerHTML = `
        <div class="progress-section-header">
            <h2>📈 Curva de Aprendizaje</h2>
            <div style="display:flex;gap:0.75rem;align-items:center;">
                <button class="btn-secondary" onclick="showView('stats')">📊 Estadísticas Detalladas</button>
                <button class="clear-history-btn" onclick="clearHistory()">🗑️ Borrar Historial</button>
            </div>
        </div>
        <div class="progress-layout">
            <div class="chart-card"><canvas id="learningChart"></canvas></div>
            <div class="history-table-card">
                <h3>Últimos exámenes</h3>
                <div id="history-table-container"></div>
            </div>
        </div>`;

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
function prepareQuestion(q) {
    if (!q.options || q.options.length === 0) return q;
    
    // Create an array of indices [0, 1, 2, 3...]
    const indices = q.options.map((_, i) => i);
    
    // Shuffle the indices (Fisher-Yates)
    for (let i = indices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    
    // Map existing correct index to its new position
    const shuffledCorrect = indices.indexOf(q.correct);
    
    return {
        ...q,
        _shuffledOptions: indices.map(i => q.options[i]),
        _shuffledCorrect: shuffledCorrect
    };
}

function startExam(subjectId, unitId = null, mode = 'normal') {
    const subject = APP_STATE.subjects.find(s => s.id === subjectId);
    let pool = QUESTION_POOL[subjectId] || [];
    
    APP_STATE.isFinishing = false;
    
    // Filter by unit
    if (unitId !== null) pool = pool.filter(q => q.unit === unitId);
    
    // Quality Filter (Feature Req: 4 options minimum)
    pool = pool.filter(q => q.options && q.options.length >= 4);

    if (pool.length === 0) { alert('No hay preguntas con calidad suficiente (4 opciones) disponibles para este tema.'); return; }

    // Mode: 'solo_no_se' — exclude mastered questions
    if (mode === 'solo_no_se') {
        const unmastered = pool.filter(q => !isMastered(q.concept_id));
        if (unmastered.length === 0) {
            alert('¡Has dominado todas las preguntas de este tema! 🏆\nPrueba el simulacro completo para repasar.');
            return;
        }
        pool = unmastered;
    }

    // Mode: 'espaciada' — prioritize SR due cards
    if (mode === 'espaciada') {
        const due = pool.filter(q => getSRPriority(q.concept_id) === 1);
        if (due.length >= 5) pool = due;
    }

    const testSize = unitId !== null ? pool.length : Math.min(20, pool.length);
    const lastIds = Sync.get(`last_test_${subjectId}`, []);

    APP_STATE.currentExam = subject;
    APP_STATE.currentUnit = unitId;
    APP_STATE.isSyllabusMode = false;
    APP_STATE.examMode = mode;
    
    // Get smart random questions
    const selected = getSmartRandom(pool, testSize, lastIds);
    
    // Shuffle options for each question to avoid pattern bias
    APP_STATE.examQuestions = selected.map(prepareQuestion);

    APP_STATE.currentQuestionIndex = 0;
    APP_STATE.answers = [];
    APP_STATE.timer = testSize * 90;
    
    // Use the original question set for result logging
    Sync.set(`last_test_${subjectId}`, selected.map(q => q.concept_id));

    const modeLabel = mode === 'solo_no_se' ? ' — Solo lo que no sé' : mode === 'espaciada' ? ' — Repaso espaciado' : '';
    document.getElementById('exam-subject-label').textContent = `${subject.icon} ${subject.name}${unitId ? ' — Tema ' + unitId : ''}${modeLabel}`;

    // Show quick-read panel before starting if unit is specified
    if (unitId !== null && mode === 'normal') {
        showQuickRead(subjectId, unitId, () => { showView('exam'); renderQuestion(); startTimer(); });
    } else {
        showView('exam');
        renderQuestion();
        startTimer();
    }
}

// ─── LECTURA RÁPIDA (Feature 6) ─────────────────────────────────
const QUICK_READ_TIPS = {
    sistemas_informaticos: {
        1: ['Topologías: bus (cable único), estrella (nodo central), anillo, malla', 'Hardware = físico, Software = lógico', 'Periféricos: entrada (teclado), salida (monitor), mixtos (táctil)', 'Medios guiados (cable) vs no guiados (WiFi)', 'Redes: LAN (local), WAN (amplia), MAN (metropolitana)'],
        2: ['SO gestiona hardware y software', 'Virtualización: varias VMs en un servidor físico', 'Particionado: dividir disco en secciones lógicas', 'Arquitectura monolítica: simple y eficiente', 'Aplicaciones de seguridad: antivirus, firewall'],
        3: ['MBR vs GPT: GPT soporta >2TB y más particiones', 'Windows: C:\\Windows, C:\\Users', 'Linux: /, /bin, /etc, /home, /var', 'SSD más resistente a golpes que HDD', 'DVD estándar: 4,7 GB'],
        4: ['net user: crear/verificar usuarios en Windows', 'net group: gestionar grupos', 'Contraseña segura: mayúsculas + minúsculas + números + símbolos', 'Solo administradores pueden habilitar/deshabilitar cuentas', 'Permisos: controlar acceso a recursos'],
        5: ['OSPF: protocolo de enrutamiento dinámico', 'WLAN: red inalámbrica de área local', 'IP: identificador único de dispositivo en red', 'route print: ver tabla de enrutamiento', 'Configuración estática: mayor seguridad y control'],
        6: ['RBAC: control de acceso basado en roles', 'ACL: lista de control de acceso', 'Active Directory: gestión de usuarios Microsoft', 'MFA: dos o más formas de identificación', 'OpenSSL: certificados digitales y claves de cifrado'],
        7: ['EaseUS: recuperación de datos', 'Microsoft Word: procesador de texto más usado', 'SO: controla hardware y proporciona interfaz', 'IDEs: editor + depurador + compilador integrados', 'Antivirus: detecta y elimina malware'],
    },
    programacion: {
        1: ['Array NO es tipo primitivo (es objeto)', 'Algoritmo → Programa: lógica → implementación', 'Debugger: analiza ejecución paso a paso', 'Algoritmo: finito, determinista, eficaz', 'Estructura iterativa: para repetir instrucciones'],
        2: ['void: método no devuelve valor', 'Clase = plantilla, Objeto = instancia', 'Constructor: inicializa atributos al crear objeto', 'Encapsulamiento: atributos privados + métodos públicos', 'Composición: partes no existen sin el todo'],
        3: ['Orden: declarar → inicializar → utilizar', 'Punto y coma: fin de sentencia', 'Cast double→int: truncamiento (no redondeo)', 'Paréntesis: mayor prioridad en expresiones', 'nombreUsuario: identificador válido (camelCase)'],
    },
    bases_de_datos: {
        1: ['CSV: estructura tabular fija', 'Entidad: conjunto de objetos con mismos atributos', 'SQL: lenguaje de la mayoría de BD relacionales', 'NoSQL: datos semiestructurados', 'BD distribuidas: reducen cuellos de botella'],
        2: ['PK compuesta: más de una columna', 'ROLLBACK: cancela cambios de transacción', 'Vista: virtual, se reconstruye al vuelo', 'DROP TABLE: elimina tabla', 'Roles: grupos de usuarios con mismos privilegios'],
    }
};

const SUBJECT_VIDEOS = {
    "programacion": {
        "1": "Programacion/videos/Desmitificando_la_programación.mp4",
        "2": "Programacion/videos/La_gramática_del_código.mp4",
        "3": "Programacion/videos/Bloques_de_Java__Arrays_y_Strings.mp4",
        "4": "Programacion/videos/POO__De_planos_a_edificios.mp4",
        "5": "Programacion/videos/La_Vida_de_un_Objeto.mp4",
        "6": "Programacion/videos/POO_Avanzada__Superpoderes.mp4",
        "7": "Programacion/videos/Del_Caos_al_Control__Excepciones_y_Colecciones_en_Java.mp4",
        "8": "Programacion/videos/Desmitificando_la_E_S_en_Java.mp4",
        "9": "Programacion/videos/Bases_de_datos_orientadas_a_objetos.mp4",
        "10": "Programacion/videos/JDBC__El_Traductor_Universal.mp4"
    },
    "bases_de_datos": {
        "1": "Bases%20de%20datos/videos/La_Biblioteca_Invisible.mp4",
        "2": "Bases%20de%20datos/videos/Bases_de_Datos_Relacionales.mp4",
        "3": "Bases%20de%20datos/videos/Diagramas_Entidad-Relación.mp4",
        "4": "Bases%20de%20datos/videos/Introducción_a_SQL__Cómo_Preguntar_a_los_Datos.mp4",
        "5": "Bases%20de%20datos/videos/Tratamiento_de_Datos.mp4",
        "6": "Bases%20de%20datos/videos/Programación_de_BBDD.mp4",
        "7": "Programacion/videos/Bases_de_datos_orientadas_a_objetos.mp4"
    },
    "entornos_de_desarrollo": {
        "1": "Entornos%20de%20desarrollo/videos/Entornos_de_Desarrollo.mp4",
        "2": "Entornos%20de%20desarrollo/videos/De_la_Idea_al_Programa.mp4",
        "3": "Entornos%20de%20desarrollo/videos/El_Plano_del_Software__UML.mp4",
        "4": "Entornos%20de%20desarrollo/videos/Los_Planos_del_Código__UML.mp4",
        "5": "Entornos%20de%20desarrollo/videos/Diagramas_de_Comportamiento.mp4",
        "6": "Entornos%20de%20desarrollo/videos/El_Mundo_Oculto_de_las_Pruebas_de_Software.mp4",
        "7": "Entornos%20de%20desarrollo/videos/Optimización_y_documentación.mp4"
    },
    "cloud_computing": {
        "1": "Cloud%20Computing/videos/Desmitificando_La_Nube.mp4",
        "2": "Cloud%20Computing/videos/Economía_y_Facturación_Cloud.mp4",
        "3": "Cloud%20Computing/videos/Infraestructura_de_la_Nube.mp4",
        "4": "Cloud%20Computing/videos/Seguridad_en_la_nube.mp4",
        "5": "Cloud%20Computing/videos/Redes_y_Entrega_de_Contenidos.mp4",
        "6": "Cloud%20Computing/videos/Servicios_de_computación.mp4",
        "7": "Cloud%20Computing/videos/Las_bibliotecas_invisibles.mp4",
        "8": "Cloud%20Computing/videos/Servicios_de_BBDD__El_Corazón_Invisible_del_Mundo_Digital.mp4",
        "9": "Cloud%20Computing/videos/Arquitectura_en_la_nube.mp4",
        "10": "Cloud%20Computing/videos/Escalado_y_Monitorización.mp4"
    },
    "sistemas_informaticos": {
        "1": "Sistemas%20informaticos/videos/El_plano_del_ordenador.mp4",
        "2": "Sistemas%20informaticos/videos/Instalación_de_Sistemas_Operativos.mp4",
        "3": "Sistemas%20informaticos/videos/Gestión_de_la_Información.mp4",
        "4": "Sistemas%20informaticos/videos/Configuración__Del_Caos_al_Control.mp4",
        "5": "Sistemas%20informaticos/videos/El_viaje_de_un_clic.mp4",
        "6": "Sistemas%20informaticos/videos/La_Arquitectura_de_Seguridad.mp4",
        "7": "Sistemas%20informaticos/videos/El_software_que_mueve_tu_mundo.mp4"
    },
    "lenguaje_de_marcas": {
        "1": "Lenguaje%20de%20marcas/videos/Los_Cimientos_de_la_Web.mp4",
        "2": "Lenguaje%20de%20marcas/videos/El_lenguaje_oculto_de_la_web.mp4",
        "3": "Lenguaje%20de%20marcas/videos/Esquemas_y_Vocabularios_XML.mp4",
        "4": "Lenguaje%20de%20marcas/videos/Almacenar_y_Consultar_XML.mp4",
        "5": "Lenguaje%20de%20marcas/videos/Conversión_y_Adaptación_de_XML.mp4",
        "6": "Lenguaje%20de%20marcas/videos/XML_vs.mp4",
        "7": "Lenguaje%20de%20marcas/videos/Sindicación_de_Contenidos.mp4",
        "8": "Lenguaje%20de%20marcas/videos/Sistemas_de_Gestión__ERP.mp4"
    },
    "empleabilidad": {
        "1": "Empleabilidad/videos/Prevención_de_Riesgos_Laborales.mp4",
        "3": "Empleabilidad/videos/El_Aprendizaje_Autónomo.mp4",
        "4": "Empleabilidad/videos/Tu_primer_contrato,_explicado.mp4",
        "5": "Empleabilidad/videos/El_potencial_profesional.mp4"
    }
};

function openVideo(path) {
    const modal = document.getElementById('video-modal');
    const player = document.getElementById('main-video-player');
    if (modal && player) {
        player.src = path;
        modal.classList.remove('hidden');
        player.play().catch(() => {}); // Intentar auto-play
        const subjectName = APP_STATE.subjects.find(s => 
            path.includes(s.name) || 
            (s.id === 'programacion' && path.includes('Programacion')) || 
            (s.id === 'bases_de_datos' && path.includes('Bases')) ||
            (s.id === 'entornos_de_desarrollo' && path.includes('Entornos')) ||
            (s.id === 'cloud_computing' && path.includes('Cloud'))
        )?.name || 'Asignatura';
        logActivity('video', 'Video: ' + subjectName, 'Viendo vídeo de repaso');
    }
}

function closeVideo() {
    const modal = document.getElementById('video-modal');
    const player = document.getElementById('main-video-player');
    if (modal && player) {
        player.pause();
        player.src = "";
        modal.classList.add('hidden');
    }
}

// ── DAILY ACTIVITY LOG ──────────────────────────────────────────
const ACTIVITY_LOG_KEY = 'daily_activity_v1';

function getActivityLog() {
    return Sync.get(ACTIVITY_LOG_KEY, []);
}

function logActivity(type, title, detail, metadata = {}) {
    const log = getActivityLog();
    
    // Evitar duplicados rápidos (si el último es igual en tipo y título en menos de 5 segundos)
    if (log.length > 0 && log[0].type === type && log[0].title === title && (Date.now() - new Date(log[0].timestamp).getTime() < 5000)) {
        return; 
    }

    const entry = {
        id: Date.now(),
        timestamp: new Date().toISOString(),
        date: new Date().toLocaleDateString('es-ES'),
        type, 
        title,
        detail,
        metadata
    };
    log.unshift(entry);
    Sync.set(ACTIVITY_LOG_KEY, log.slice(0, 50)); 
    renderActivityLog();
}

function renderActivityLog(showAll = false) {
    const container = document.getElementById('activity-log-content');
    if (!container) return;

    let log = getActivityLog();
    if (log.length === 0) {
        container.innerHTML = '<div style="color:var(--text-secondary);font-size:0.9rem;padding:1rem;text-align:center;">No hay actividad reciente. ¡Empieza a estudiar! 🚀</div>';
        return;
    }

    // Limitar a los 5 más recientes si no se pide ver todo
    const hasMore = log.length > 5;
    if (!showAll && hasMore) {
        log = log.slice(0, 5);
    }

    // Agrupar por fecha
    const groups = {};
    log.forEach(entry => {
        if (!groups[entry.date]) groups[entry.date] = [];
        groups[entry.date].push(entry);
    });

    const icons = { exam: '📝', video: '🎬', lab: '🧪', theory: '📄' };

    const htmlGroups = Object.entries(groups).map(([date, entries]) => `
        <div class="activity-day">
            <div class="activity-date-header">${date === new Date().toLocaleDateString('es-ES') ? 'Hoy' : date}</div>
            <div class="activity-items">
                ${entries.map(e => `
                    <div class="activity-item">
                        <span class="activity-icon">${icons[e.type] || '📌'}</span>
                        <div class="activity-info">
                            <div class="activity-title">${e.title}</div>
                            <div class="activity-detail">${e.detail}</div>
                        </div>
                        <div class="activity-time">${new Date(e.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
                    </div>
                `).join('')}
            </div>
        </div>
    `).join('');

    container.innerHTML = htmlGroups;

    if (hasMore && !showAll) {
        const moreBtn = document.createElement('button');
        moreBtn.className = 'view-more-activity';
        moreBtn.innerHTML = 'Ver actividad anterior ⬇️';
        moreBtn.onclick = () => renderActivityLog(true);
        container.appendChild(moreBtn);
    }
}

// Cerrar con tecla Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const videoModal = document.getElementById('video-modal');
        if (videoModal && !videoModal.classList.contains('hidden')) {
            closeVideo();
        }
    }
});

function logTheory(subjectName, unit, subjectId = null) {
    if (!APP_STATE.studySession.active) {
        startStudySession(subjectId || subjectName);
    }
    logActivity('theory', `Teoría: ${subjectName}`, `Repasando Tema ${unit}`);
}

 // Deleted redundant startLab function


function showQuickRead(subjectId, unitId, onStart) {
    const tips = QUICK_READ_TIPS[subjectId]?.[unitId];
    if (!tips || tips.length === 0) { onStart(); return; }

    const subject = APP_STATE.subjects.find(s => s.id === subjectId);
    showView('exam');
    document.getElementById('exam-subject-label').textContent = `📖 Repaso rápido — ${subject?.name} Tema ${unitId}`;
    document.getElementById('exam-timer').textContent = '';

    document.getElementById('exam-engine-root').innerHTML = `
        <div class="quickread-container">
            <div class="quickread-header">
                <span class="quickread-badge">📖 Lectura rápida</span>
                <h2>${subject?.icon} ${subject?.name} — Tema ${unitId}</h2>
                <p>Repasa estos conceptos clave antes de empezar</p>
            </div>
            <ul class="quickread-list">
                ${tips.map(tip => `<li class="quickread-item"><span class="quickread-dot">▸</span>${tip}</li>`).join('')}
            </ul>
            <div class="quickread-actions">
                <button class="next-btn" onclick="(${onStart.toString()})()">¡Empezar examen →</button>
                <button class="btn-secondary" onclick="(${onStart.toString()})()">Saltar lectura</button>
            </div>
        </div>`;
}

// ─── MODO EXAMEN REAL (Feature 2) ───────────────────────────────
function startExamReal(subjectId, totalPreguntas = 60) {
    const subject = APP_STATE.subjects.find(s => s.id === subjectId);
    const pool = QUESTION_POOL[subjectId] || [];
    if (pool.length === 0) { alert('No hay preguntas disponibles.'); return; }

    const questions = shuffleArray(pool).slice(0, Math.min(totalPreguntas, pool.length));

    APP_STATE.isFinishing = false;
    APP_STATE.currentExam = subject;
    APP_STATE.currentUnit = null;
    APP_STATE.isSyllabusMode = false;
    APP_STATE.examMode = 'real';
    APP_STATE.examQuestions = questions.map(prepareQuestion);
    APP_STATE.currentQuestionIndex = 0;
    APP_STATE.answers = [];
    APP_STATE.timer = totalPreguntas * 60; // 1 min por pregunta = tiempo real

    document.getElementById('exam-subject-label').textContent = `🎯 ${subject.icon} EXAMEN REAL — ${questions.length} preguntas · Sin feedback`;
    showView('exam');
    renderQuestion();
    startTimer();
}

function startFallosExam(subjectId) {
    const subject = APP_STATE.subjects.find(s => s.id === subjectId);
    const fallos = getFallos()[subjectId] || {};
    const pool = Object.values(fallos);
    if (pool.length === 0) { alert('No hay fallos registrados para esta asignatura.'); return; }

    APP_STATE.isFinishing = false;
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
async function startExamenFinal(subjectId) {
    APP_STATE.isFinishing = false;
    const subject = APP_STATE.subjects.find(s => s.id === subjectId);
    const isEmp = subjectId === 'empleabilidad';

    // Empleabilidad: 50 preguntas de la batería oficial, SIN penalización
    if (isEmp) {
        const bateriaEntry = APP_STATE.syllabusExams.find(e => e.id === 'emp_bateria');
        document.getElementById('exam-subject-label').textContent = `⏳ Preparando simulacro...`;
        showView('exam');
        document.getElementById('exam-engine-root').innerHTML = `<div style="text-align:center;padding:4rem;color:var(--text-secondary)"><p>Cargando 50 preguntas...</p></div>`;
        try {
            const res = await fetch(bateriaEntry.file + '?v=' + Date.now());
            const text = await res.text();
            const allQ = shuffleArray(parseTxtExam(text, 'emp_bateria')).map(prepareQuestion);
            APP_STATE.currentExam = { ...subject, id: subjectId, name: 'Empleabilidad — Simulacro Examen Final' };
            APP_STATE.currentUnit = null;
            APP_STATE.isSyllabusMode = true;
            APP_STATE.examMode = 'sin_penalizacion';
            APP_STATE.examQuestions = allQ;
            APP_STATE.currentQuestionIndex = 0;
            APP_STATE.answers = [];
            APP_STATE.timer = 3600; // 1 hora
            document.getElementById('exam-subject-label').textContent = `🎯 ${subject.icon} Simulacro Examen Final — ${allQ.length} preguntas · Sin penalización`;
            renderQuestion(); startTimer();
        } catch(e) { alert('Error al cargar.'); showView('dashboard'); }
        return;
    }

    // Resto de asignaturas: 30 teóricas + 30 prácticas (SI)
    const teoricasPool = QUESTION_POOL[subjectId] || [];
    const practicasEntry = APP_STATE.syllabusExams.find(e => e.id === 'si_practicas');

    document.getElementById('exam-subject-label').textContent = `⏳ Preparando examen final...`;
    showView('exam');
    document.getElementById('exam-engine-root').innerHTML = `<div style="text-align:center;padding:4rem;color:var(--text-secondary)"><p>Cargando 60 preguntas...</p></div>`;

    try {
        const teoricas = shuffleArray(teoricasPool).slice(0, 30);
        let practicas = [];
        if (practicasEntry) {
            const res = await fetch(practicasEntry.file + '?v=' + Date.now());
            const text = await res.text();
            practicas = shuffleArray(parseTxtExam(text, 'si_practicas')).slice(0, 30);
        }
        const allQ = shuffleArray([...teoricas, ...practicas]);
        if (allQ.length === 0) { alert('No se pudieron cargar preguntas.'); showView('dashboard'); return; }

        APP_STATE.currentExam = { ...subject, id: subjectId, name: 'SI — Simulacro Examen Final' };
        APP_STATE.currentUnit = null;
        APP_STATE.isSyllabusMode = true;
        APP_STATE.examMode = 'normal';
        APP_STATE.examQuestions = allQ.map(prepareQuestion);
        APP_STATE.currentQuestionIndex = 0;
        APP_STATE.answers = [];
        APP_STATE.timer = allQ.length * 90;

        document.getElementById('exam-subject-label').textContent = `🎯 ${subject.icon} Simulacro Examen Final — ${allQ.length} preguntas (30T + ${practicas.length}P)`;
        renderQuestion(); startTimer();
    } catch(e) { console.error(e); alert('Error al cargar el examen final.'); showView('dashboard'); }
}

async function startSyllabusFlashcard(subjectId) {
    const subject = APP_STATE.subjects.find(s => s.id === subjectId);
    const temas = APP_STATE.syllabusExams.filter(e => e.subject_id === subjectId && e.type !== 'lab');
    if (temas.length === 0) { alert('No hay temas disponibles.'); return; }

    document.getElementById('fc-subject-label').textContent = `⏳ Cargando...`;
    showView('flashcard');
    document.getElementById('flashcard-root').innerHTML = `<div style="text-align:center;padding:4rem;color:var(--text-secondary)"><p>Cargando flashcards del temario...</p></div>`;

    try {
        const fetches = temas.map(t => fetch(t.file + '?v=' + Date.now())
            .then(r => r.text()).then(text => parseTxtExam(text, t.id)).catch(() => []));
        const allArrays = await Promise.all(fetches);
        const pool = shuffleArray(allArrays.flat());
        if (pool.length === 0) { alert('No se pudieron cargar preguntas.'); showView('dashboard'); return; }

        APP_STATE.fcQuestions = pool.map(prepareQuestion);
        APP_STATE.fcIndex = 0;
        APP_STATE.fcFlipped = false;
        APP_STATE.currentExam = { ...subject, id: subjectId };
        document.getElementById('fc-subject-label').textContent = `${subject.icon} ${subject.name} — Flashcards Temario`;
        renderFlashcard();
    } catch(e) { alert('Error al cargar.'); showView('dashboard'); }
}

async function startSimulacroTemario(subjectId) {
    APP_STATE.isFinishing = false;
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
        APP_STATE.examQuestions = selected.map(prepareQuestion);
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
    APP_STATE.isFinishing = false;
    const examInfo = APP_STATE.syllabusExams.find(e => e.id === syllabusId);
    if (!examInfo) return;
    try {
        const res = await fetch(examInfo.file);
        const text = await res.text();
        const questions = parseTxtExam(text, syllabusId);
        if (questions.length === 0) { alert('No se han podido extraer preguntas del archivo.'); return; }

        APP_STATE.currentExam = { ...examInfo, id: syllabusId };
        APP_STATE.currentUnit = examInfo.unit || null; // Set unit to sync counting
        APP_STATE.isSyllabusMode = true;
        APP_STATE.examQuestions = questions.map(prepareQuestion);
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

    // Options are pre-shuffled in startExam to avoid positional bias
    const displayOptions = q._shuffledOptions || q.options;

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
                ${displayOptions.map((opt, i) => `
                    <button class="option-btn" onclick="handleResponse(${i})">
                        <span class="opt-letter">${String.fromCharCode(65+i)}</span>
                        <span>${esc(opt)}</span>
                    </button>
                `).join('')}
            </div>
            <div id="feedback-area" class="feedback-area hidden"></div>
            <div id="quiz-actions" style="margin-top:1.5rem;display:flex;justify-content:space-between;align-items:center;">
                <button class="btn-secondary" id="skip-btn" onclick="skipQuestion()" style="background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);padding:0.6rem 1.2rem;border-radius:8px;color:var(--text-secondary);display:flex;align-items:center;gap:0.5rem;cursor:pointer;">
                    ⏭️ Saltar pregunta
                </button>
                <div id="next-control" class="hidden">
                    <button class="next-btn" onclick="nextQuestion()">
                        ${APP_STATE.currentQuestionIndex + 1 < total ? 'Siguiente →' : 'Ver Resultado'}
                    </button>
                </div>
            </div>
        </div>`;
    updateTimerUI();
}

function handleResponse(index) {
    const q = APP_STATE.examQuestions[APP_STATE.currentQuestionIndex];
    // Use shuffled correct index if available
    const correctIndex = q._shuffledCorrect !== undefined ? q._shuffledCorrect : q.correct;
    const displayOptions = q._shuffledOptions || q.options;
    const isCorrect = index === correctIndex;

    // Save answer using original correct for history consistency
    APP_STATE.answers.push({ correct: correctIndex, selected: index, question: q });

    // Update spaced repetition and mastery
    if (q.concept_id) {
        updateSR(q.concept_id, isCorrect);
        updateMastery(q.concept_id, isCorrect);
    }

    document.querySelectorAll('.option-btn').forEach(b => b.disabled = true);
    document.querySelectorAll('.option-btn')[index].classList.add(isCorrect ? 'correct' : 'incorrect');
    if (!isCorrect) {
        document.querySelectorAll('.option-btn')[correctIndex].classList.add('correct');
        // Save to fallos — store with original correct for consistency
        if (APP_STATE.currentExam?.id) {
            saveFallo(APP_STATE.currentExam.id, q);
            // AUTO-SAVE to LIBRETA if not already exists with a note
            const lib = getLibreta();
            const subjectId = APP_STATE.currentExam.id;
            const existing = lib[subjectId]?.find(e => e.conceptId === q.concept_id);
            if (!existing) {
                saveLibretaNota(q.concept_id, subjectId, q.question, displayOptions[correctIndex], "♻️ Guardado automático tras fallo.");
            }
        }
        const subjectId = APP_STATE.currentExam?.id || '';
        const correctAnswerText = displayOptions[correctIndex];
        document.getElementById('feedback-area').innerHTML = `
            <div class="explanation-box">
                <strong>❌ Incorrecto</strong>
                <p>La respuesta correcta es: <em>${esc(correctAnswerText)}</em></p>
                ${q.explanation && q.explanation !== 'Pregunta del temario oficial.' ? `
                <hr style="border-color:rgba(255,255,255,0.07);margin:0.75rem 0">
                <p class="expl-why"><span class="expl-label">¿Por qué?</span> ${esc(q.explanation)}</p>` : ''}
                <div id="libreta-inline-area"></div>
                <button class="btn-libreta-inline" onclick="showLibretaInput('${esc(q.concept_id)}','${subjectId}',${JSON.stringify(q.question)},${JSON.stringify(correctAnswerText)})">
                    📓 Anotar en libreta de errores
                </button>
            </div>`;
    } else {
        // Remove from fallos if answered correctly
        if (APP_STATE.currentExam?.id) removeFallo(APP_STATE.currentExam.id, q.concept_id);
        document.getElementById('feedback-area').innerHTML = `
            <div class="explanation-box correct-box">
                <strong>✅ ¡Correcto!</strong>
                ${q.explanation && q.explanation !== 'Pregunta del temario oficial.' ? `
                <p class="expl-why" style="margin-top:0.5rem"><span class="expl-label">¿Por qué?</span> ${esc(q.explanation)}</p>` : ''}
            </div>`;
    }
    document.getElementById('feedback-area').classList.remove('hidden');
    document.getElementById('next-control').classList.remove('hidden');
    // In 'real' exam mode, hide explanation and auto-advance after 1s
    if (APP_STATE.examMode === 'real') {
        document.getElementById('feedback-area').classList.add('hidden');
    }
    // Hide skip button after responding
    const skipBtn = document.getElementById('skip-btn');
    if (skipBtn) skipBtn.style.display = 'none';
}

function skipQuestion() {
    const q = APP_STATE.examQuestions[APP_STATE.currentQuestionIndex];
    // Save as skipped
    APP_STATE.answers.push({ correct: (q._shuffledCorrect !== undefined ? q._shuffledCorrect : q.correct), selected: -1, question: q });
    nextQuestion();
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
    APP_STATE.isFinishing = true;
    updateTutorProgress('tests', true);
    if (APP_STATE.timerInterval) clearInterval(APP_STATE.timerInterval);
    APP_STATE.isFinishing = true;

    try {
    const total = APP_STATE.examQuestions.length;
    // Penalización: Programación = -1/2 (2 errores cancelan 1); resto = -1/3
    const isProg = APP_STATE.currentExam?.id === 'programacion';
    const N = isProg ? 3 : 4;
    let aciertos = 0, errores = 0;
    APP_STATE.answers.forEach(a => {
        // Use the shuffled correct index for comparison
        if (a.selected === a.correct) aciertos++;
        else if (a.selected !== -1) errores++;
    });
    const omitidas = total - APP_STATE.answers.length;
    const sinPenalizacion = APP_STATE.examMode === 'sin_penalizacion';
    
    // Apply Professor Rule: 2 mal = -1 bien -> penalty is 0.5 per error
    const puntuacionBruta = sinPenalizacion ? aciertos : aciertos - (errores * 0.5);
    const puntuacionFinal = Math.max(0, puntuacionBruta);
    const calificacion = (puntuacionFinal / total) * 10;
    const passed = calificacion >= 5;

    saveExamResult(APP_STATE.currentExam.id, APP_STATE.currentExam.name || 'Examen', calificacion, aciertos, errores, omitidas, total, APP_STATE.currentUnit);

    // Log Activity
    const sub = APP_STATE.subjects.find(s => s.id === APP_STATE.currentExam.id);
    logActivity('exam', sub ? sub.name : 'Examen', `Completado con nota: ${calificacion.toFixed(2)}`, { score: calificacion });

    // ── Build post-exam summary (Feature 5) ─────────────────────
    const failedQuestions = APP_STATE.answers.filter(a => a.selected !== a.correct);
    const failedByTema = {};
    failedQuestions.forEach(a => {
        const tema = a.question.unit || 'General';
        if (!failedByTema[tema]) failedByTema[tema] = [];
        failedByTema[tema].push(a.question);
    });

    const worstTema = Object.entries(failedByTema).sort((a,b) => b[1].length - a[1].length)[0];
    const pdfInfo = worstTema ? PDF_MAP[APP_STATE.currentExam.id]?.[worstTema[0]] : null;

    const summaryHTML = failedQuestions.length > 0 ? `
        <div class="post-exam-summary">
            <h3>📊 Resumen de lo que debes repasar</h3>
            ${worstTema ? `<div class="worst-tema-summary">
                <span>⚠️ Tema con más fallos: <strong>Tema ${worstTema[0]}</strong> (${worstTema[1].length} errores)</span>
                ${pdfInfo ? `<a href="${pdfInfo.path}" target="_blank" class="pdf-link-btn">📄 Abrir PDF Tema ${worstTema[0]} →</a>` : ''}
            </div>` : ''}
            <div class="failed-concepts">
                ${failedQuestions.slice(0, 4).map(a => `
                    <div class="failed-concept-item">
                        <span class="failed-q">❌ ${esc(a.question.question.substring(0, 70))}${a.question.question.length > 70 ? '...' : ''}</span>
                        <span class="failed-correct">✅ ${esc((a.question._shuffledOptions || a.question.options)[a.correct])}</span>
                    </div>`).join('')}
                ${failedQuestions.length > 4 ? `<p style="color:var(--text-secondary);font-size:0.8rem;text-align:center">+${failedQuestions.length - 4} más en la sección de Fallos</p>` : ''}
            </div>
        </div>` : `<div class="post-exam-summary perfect"><h3>🏆 ¡Perfecto! Sin errores en este examen.</h3></div>`;

    document.getElementById('exam-engine-root').innerHTML = `
        <div class="results-container">
            <h2>Resultado del Examen</h2>
            <div class="score-circle ${passed ? 'passed' : 'failed'}">${calificacion.toFixed(2)}</div>
            <div class="stats-grid">
                <div class="stat-item"><span>✅ Aciertos</span><strong>${aciertos}</strong></div>
                <div class="stat-item"><span>❌ Errores</span><strong>${errores}</strong></div>
                <div class="stat-item"><span>⬜ Omitidas</span><strong>${omitidas}</strong></div>
                <div class="stat-item"><span>📉 Penalización</span><strong>-${(errores * 0.5).toFixed(2)}</strong></div>
            </div>
            <div class="formula-box">
                <p><strong>Fórmula aplicada:</strong></p>
                <div class="formula-text">
                    ${sinPenalizacion ? 'Aciertos / Total * 10' : '<b>(Aciertos - Errores * 0.5)</b> / Total * 10'}
                </div>
                <p style="font-size:0.75rem; color:var(--text-secondary); margin-top:0.4rem;">
                    * Norma: 2 mal restan 1 bien (Penalización DAW Real)
                </p>
            </div>
                ${sinPenalizacion
                    ? `<p>Nota = ${aciertos} ÷ ${total} × 10 = <strong>${calificacion.toFixed(2)}</strong></p>
                       <small>Sin penalización — cada acierto suma 1 punto</small>`
                    : `<p>Puntos = ${aciertos} − ${errores} ÷ ${N-1} = <strong>${puntuacionFinal.toFixed(2)}</strong></p>
                       <p>Nota = ${puntuacionFinal.toFixed(2)} ÷ ${total} × 10 = <strong>${calificacion.toFixed(2)}</strong></p>
                       <small>Blanco = 0 pts | Error = −1/${N-1} pts | Acierto = +1 pto</small>`}
            </div>
            <div class="feedback-final">
                ${passed ? '<h3>¡Enhorabuena! Has aprobado. 🎉</h3>' : '<h3>Necesitas repasar un poco más. 💪</h3>'}
            </div>
            ${summaryHTML}
            <div style="display:flex;gap:1rem;justify-content:center;flex-wrap:wrap;margin-top:2rem;">
                <button class="next-btn" onclick="exitExamToHome()">🏠 Volver al Inicio</button>
                <button class="next-btn" style="background:var(--secondary-color)" onclick="startExam('${APP_STATE.currentExam.id}'${APP_STATE.currentUnit ? ', ' + APP_STATE.currentUnit : ''})">🔄 Repetir</button>
                ${APP_STATE.currentExam.id ? `<button class="next-btn" style="background:#ef4444" onclick="startExam('${APP_STATE.currentExam.id}'${APP_STATE.currentUnit ? ', ' + APP_STATE.currentUnit : ''}, 'solo_no_se')">🎯 Solo lo que no sé</button>` : ''}
                <button class="next-btn" style="background:#7c3aed" onclick="openLibreta()">📓 Mi Libreta de Errores</button>
                ${(() => { const lib = getLibreta(); const cnt = Object.values(lib).reduce((s,a)=>s+a.length,0); return cnt > 0 ? `<button class="next-btn" style="background:#059669" onclick="exportarLibreta()">⬇️ Exportar Libreta (${cnt})</button>` : ''; })()}
            </div>
        </div>`;
    } catch (error) {
        console.error('Error in finishExam:', error);
        document.getElementById('exam-engine-root').innerHTML = `
            <div class="results-container">
                <h2>Ocurrió un error al procesar el resultado</h2>
                <p>Por favor, inténtalo de nuevo o contacta con soporte técnico si el error persiste.</p>
                <p style="color:red; font-size:0.8rem;">${error.message}</p>
                <button class="next-btn" onclick="exitExamToHome()">🏠 Volver al Inicio</button>
            </div>`;
    }
}

function exitExamToHome() {
    clearInterval(APP_STATE.timerInterval);
    document.getElementById('exam-engine-root').innerHTML = '';
    showView('dashboard');
    renderFallosSection();
}

// ─── ROBUST QUESTION DETECTION ──────────────────────────────────
const QUESTION_START_REGEX = /^(¿|En |Los |Las |Cuando |Qué |Cuál |Según |Si |Al |Para |Desde |Respecto|Durante|Sobre|Dentro|Ante|Java|Un |Una |El |La |Todo|Cada|Al |Si |Sobre|Respecto)/i;

function isLikelyQuestion(text) {
    if (!text) return false;
    const t = text.trim();
    if (t.startsWith('*')) return false; // Answers start with *
    // A question usually has a ? or starts with specific words AND is long enough
    // or ends with a colon (common in some formats)
    return t.includes('?') || 
           (QUESTION_START_REGEX.test(t) && t.length > 35) || 
           (t.endsWith(':') && t.length > 20);
}

// ─── TXT PARSER — formato único: pregunta, opciones (*correcta), EXPL: ──────
function parseTxtExam(text, syllabusId) {
    const rawLines = text
        .replace(/\r\n/g, '\n')
        .split('\n')
        .map(l => l.trim())
        .filter(l => l !== '' && !l.toLowerCase().startsWith('tema ') && !l.includes('( 1.00 puntos )'));

    // ── Paso 1: agrupar en bloques separados por EXPL: ───────────────────────
    // Cada bloque es: [pregunta, opcion1, opcion2, ..., EXPL:...]
    const blocks = [];
    let current = [];
    for (const line of rawLines) {
        current.push(line);
        if (line.startsWith('EXPL:')) {
            blocks.push(current);
            current = [];
        }
    }
    // Bloque final sin EXPL (si lo hubiera)
    if (current.length >= 3) blocks.push(current);

    // ── Paso 2: parsear cada bloque ──────────────────────────────────────────
    const questions = [];
    for (const block of blocks) {
        if (block.length < 3) continue; // mínimo: pregunta + 2 opciones

        const questionText = block[0].startsWith('*')
            ? block[0].slice(1).trim()
            : block[0];

        const options = [];
        let correctIndex = 0;
        let explanation = 'Pregunta del temario oficial.';

        for (let j = 1; j < block.length; j++) {
            const l = block[j];
            if (l.startsWith('EXPL:')) {
                explanation = l.slice(5).trim();
                break;
            }
            if (options.length >= 4) break;
            if (l.startsWith('*')) {
                correctIndex = options.length;
                options.push(l.slice(1).trim());
            } else {
                options.push(l);
            }
        }

        if (options.length >= 2) {
            questions.push({
                concept_id: `${syllabusId}_q${questions.length}`,
                question: questionText,
                options,
                correct: correctIndex,
                explanation,
                unit: null
            });
        }
    }
    return questions;
}

// ─── SYLLABUS LAB ───────────────────────────────────────────────

function startLab(syllabusId) {
    const examInfo = APP_STATE.syllabusExams.find(e => e.id === syllabusId);
    if (!examInfo) {
        console.error('Lab not found:', syllabusId);
        alert('Error: No se ha podido encontrar la información del laboratorio.');
        return;
    }
    
    // Log activity
    logActivity('lab', `Lab: ${examInfo.name}`, 'Practicando en laboratorio interactivo');

    const modal = document.getElementById('lab-modal');
    const root = document.getElementById('lab-root');
    
    if (modal && root) {
        // Clear previous content
        root.innerHTML = '';
        
        // Create iframe with error handling
        const iframe = document.createElement('iframe');
        iframe.src = examInfo.file;
        iframe.style.cssText = 'width:100%;height:100%;border:none;border-radius:12px;display:block;';
        iframe.onerror = () => {
            console.error('Iframe failed to load:', examInfo.file);
            alert('El laboratorio no pudo cargarse en el modal. Se abrirá en una pestaña nueva.');
            window.open(examInfo.file, '_blank');
            closeLab();
        };
        
        root.appendChild(iframe);
        modal.classList.remove('hidden');
        
        // Extra fallback: click anywhere outside to close
        modal.onclick = (e) => {
            if (e.target === modal) closeLab();
        };
    } else {
        console.error('Lab modal or root not found in DOM');
        window.open(examInfo.file, '_blank');
    }
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
// Boot handled by Auth.init() to ensure synchronization
// init();

// ═══════════════════════════════════════════════════════════════
//  GUÍA ESTRATÉGICA DE ESTUDIO — 3 Fases hacia el 16 de mayo
// ═══════════════════════════════════════════════════════════════

const EXAM_DATE = new Date('2026-05-16T09:00:00');
const STUDY_START = new Date('2026-04-08T00:00:00');

const STRATEGIC_TIPS = [
    { icon: '🎯', text: '<b>Precisión > Velocidad</b>: 2 mal restan 1 bien. Si no estás seguro en el test, mejor deja en blanco.' },
    { icon: '📝', text: '<b>Foco Práctico</b>: En el examen de papel no importa la sintaxis exacta, importa que tu lógica POO sea impecable.' },
    { icon: '📓', text: '<b>Método de Errores</b>: Todo lo que anotes hoy en tu Libreta de Errores es lo que te hará aprobar mañana.' },
    { icon: '⏱️', text: '<b>Gestión de Tiempo</b>: Entrena con cronómetro. 30 min para tests y 1 hora para desarrollo POO.' },
    { icon: '👑', text: '<b>Relaciones POO</b>: Si sabes diseñar la jerarquía de clases (Herencia/Interfaces), tienes el 70% de la nota.' }
];

const STUDY_PHASES = [
    {
        id: 1, name: 'Fase 1 — Teoría',
        color: '#3b82f6', colorSoft: 'rgba(59,130,246,0.1)',
        start: new Date('2026-04-08'), end: new Date('2026-04-24'),
        desc: 'Rotación diaria de 2 asignaturas · Teoría profunda',
        icon: '📖',
        dailyTasks: [
            '2-3h Teoría profunda por asignatura',
            'Realizar mini-tests tras cada tema'
        ],
        methodology: {
            objective: 'Cimentar conocimientos base y entender la lógica de cada asignatura.',
            keyFactor: 'Comprensión profunda over memorización.',
            materials: ['PDFs oficiales', 'Resúmenes 20 puntos', 'Libreta de apuntes']
        }
    },
    {
        id: 2, name: 'Fase 2 — Tests',
        color: '#f97316', colorSoft: 'rgba(249,115,22,0.1)',
        start: new Date('2026-04-25'), end: new Date('2026-05-08'),
        desc: 'Combinación de teoría y tests intensivos',
        icon: '🎯',
        dailyTasks: [
            '2h Teoría (Refuerzo)',
            '2h Tests a tope (Simulación)',
            '1h Análisis de Fallos (Libreta)'
        ],
        methodology: {
            objective: 'Detectar patrones de error y familiarizarse con el formato de examen.',
            keyFactor: 'Análisis minucioso de cada fallo.',
            materials: ['Banco de preguntas', 'Libreta de Errores', 'Flashcards']
        }
    },
    {
        id: 3, name: 'Fase 3 — Simulacros',
        color: '#ef4444', colorSoft: 'rgba(239,68,68,0.1)',
        start: new Date('2026-05-09'), end: new Date('2026-05-16'),
        desc: 'Inmersión total en ambiente de examen',
        icon: '🔴',
        dailyTasks: [
            '2-3 Simulacros completos al día',
            'Repaso intensivo de la Libreta de Errores'
        ],
        methodology: {
            objective: 'Entrenar el tiempo y la resistencia mental bajo presión.',
            keyFactor: 'Gestión del tiempo y control de nervios.',
            materials: ['Cronómetro', 'Exámenes de años anteriores', 'Entorno sin distracciones']
        }
    }
];

const DAILY_ROTATION = [
    { day: 1, subjects: ['programacion', 'sistemas_informaticos'],    labels: ['Programación', 'Sistemas'] },
    { day: 2, subjects: ['bases_de_datos', 'lenguaje_de_marcas'],     labels: ['Bases de Datos', 'Lenguajes de Marcas'] },
    { day: 3, subjects: ['entornos_de_desarrollo', 'cloud_computing'], labels: ['Entornos', 'Cloud Computing'] },
    { day: 4, subjects: ['empleabilidad'],                             labels: ['Empleabilidad + Repaso Global'] },
];

const PHASE3_ROTATION = [
    { day: 1, subjects: ['programacion', 'bases_de_datos'],            labels: ['Programación', 'Bases de Datos'] },
    { day: 2, subjects: ['sistemas_informaticos', 'lenguaje_de_marcas'],labels: ['Sistemas', 'Lenguajes de Marcas'] },
    { day: 3, subjects: ['entornos_de_desarrollo', 'cloud_computing'],  labels: ['Entornos', 'Cloud Computing'] },
    { day: 4, subjects: ['empleabilidad'],                              labels: ['Empleabilidad + Repaso Global'] },
];

function getCurrentPhase() {
    const now = new Date();
    return STUDY_PHASES.find(p => now >= p.start && now <= p.end) || STUDY_PHASES[2];
}

function getDailySubjects(offsetDays = 0) {
    const now = new Date();
    if (offsetDays !== 0) {
        now.setDate(now.getDate() + offsetDays);
    }

    // Domingo = Descanso
    if (now.getDay() === 0) {
        return { isRest: true, subjects: [], labels: ['Descanso'] };
    }

    const daysSinceStart = Math.floor((now - STUDY_START) / (1000 * 60 * 60 * 24));
    const phase = getCurrentPhase();
    const rotation = phase.id === 3 ? PHASE3_ROTATION : DAILY_ROTATION;
    
    // Safety check for rotation index
    const index = ((daysSinceStart % rotation.length) + rotation.length) % rotation.length;
    return rotation[index];
}

function renderAcademicPlanner() {
    const container = document.getElementById('academic-planner-section');
    if (!container) return;

    const phase = getCurrentPhase();
    const days = [];
    const now = new Date();

    for (let i = 0; i < 7; i++) {
        const date = new Date(now);
        date.setDate(now.getDate() + i);
        const slot = getDailySubjects(i);
        days.push({
            date: date,
            slot: slot,
            isToday: i === 0,
            label: i === 0 ? 'Hoy' : i === 1 ? 'Mañana' : date.toLocaleDateString('es-ES', { weekday: 'long' })
        });
    }

    container.style.display = 'block';
    container.innerHTML = `
        <div class="planner-container">
            <div class="planner-header">
                <h3>📅 Planificador Académico</h3>
                <div class="planner-phase-tag" style="--phase-bg: ${phase.colorSoft}; --phase-color: ${phase.color}">
                    ${phase.name}
                </div>
            </div>
            <div class="planner-grid">
                ${days.map(day => {
                    const dateStr = day.date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
                    return `
                    <div class="planner-card ${day.isToday ? 'is-today' : ''}">
                        <div class="planner-date">
                            <span class="day-name">${day.label}</span>
                            <span class="day-date">${dateStr}</span>
                        </div>
                        <div class="planner-subjects">
                            ${day.slot.isRest ? `
                                <div class="planner-rest-content">
                                    <span style="font-size: 2rem;">🧘</span>
                                    <p style="font-size: 0.8rem; font-weight: 600; color: var(--accent-color)">Día de Descanso</p>
                                    <p style="font-size: 0.7rem; color: var(--text-secondary)">¡Recarga pilas para mañana!</p>
                                </div>
                            ` : day.slot.subjects.map((subId, idx) => {
                                const sub = APP_STATE.subjects.find(s => s.id === subId);
                                if (!sub) return '';
                                return `
                                <div class="planner-subject-tag" style="--subj-color: ${sub.color}">
                                    <span class="tag-icon">${sub.icon}</span>
                                    <span>${sub.name}</span>
                                </div>`;
                            }).join('')}
                        </div>
                        <div class="planner-actions">
                            ${day.slot.isRest ? `
                                <button class="planner-go-btn" onclick="showView('dashboard')">Ver Estadísticas →</button>
                            ` : `
                                <button class="planner-go-btn" onclick="scrollToSubject('${day.slot.subjects[0]}')">
                                    Ver Objetivos →
                                </button>
                            `}
                        </div>
                    </div>`;
                }).join('')}
            </div>

            <div class="planner-methodology">
                <div class="methodology-header">
                    <h4>💡 Metodología Estratégica — ${phase.name}</h4>
                    <p>${phase.methodology.objective}</p>
                </div>
                <div class="methodology-grid">
                    <div class="methodology-card">
                        <h5>🎯 Factor Clave</h5>
                        <p>${phase.methodology.keyFactor}</p>
                    </div>
                    <div class="methodology-card">
                        <h5>🛠️ Material Necesario</h5>
                        <ul>
                            ${phase.methodology.materials.map(m => `<li>${m}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="methodology-card">
                        <h5>🗓️ Rutina del Día</h5>
                        <ul>
                            ${getTasksForPhase().map(t => {
                                const progress = getTutorProgress();
                                const isDone = progress[t.key];
                                const isDuoKey = (t.baseKey === 'theory' || t.baseKey === 'labs');
                                
                                return `
                                <li class="planner-task-item ${isDone ? 'done' : ''}" 
                                    onclick="${isDuoKey ? `alert('Para esta tarea debes usar el cronómetro del Robot.')` : `updateTutorProgress('${t.key}', ${!isDone})`}">
                                    <div class="task-check">${isDone ? '✓' : ''}</div>
                                    <span>${t.label}</span>
                                </li>`;
                            }).join('')}
                        </ul>
                    </div>
                </div>
            </div>
        </div>`;
}

function scrollToSubject(id) {
    const el = document.querySelector(`[data-subject-id="${id}"]`);
    if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        el.classList.add('highlight-momentary');
        setTimeout(() => el.classList.remove('highlight-momentary'), 2000);
    } else {
        showView('dashboard');
        // Wait for render if it was hidden
        setTimeout(() => {
             const el2 = document.querySelector(`[data-subject-id="${id}"]`);
             if (el2) el2.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
    }
}

function getDaysToExam() {
    const now = new Date();
    const diff = EXAM_DATE - now;
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

function renderStudyGuide() {
    const container = document.getElementById('study-guide-banner');
    if (!container) return;

    const phase = getCurrentPhase();
    const todaySlot = getDailySubjects();
    const daysLeft = getDaysToExam();
    
    // Pick tip of the day
    const daysSinceStart = Math.floor((new Date() - STUDY_START) / (1000 * 60 * 60 * 24));
    const tip = STRATEGIC_TIPS[daysSinceStart % STRATEGIC_TIPS.length];

    const urgencyColor = daysLeft <= 7 ? '#ef4444' : daysLeft <= 21 ? '#f97316' : '#3b82f6';
    const urgencyText = daysLeft <= 7 ? '¡ÚLTIMA SEMANA!' : daysLeft <= 14 ? '¡SPRINT FINAL!' : 'Quedan';

    const libreta = getLibreta();
    const libretaCount = Object.values(libreta).reduce((sum, arr) => sum + arr.length, 0);

    container.innerHTML = `
        <div class="study-guide-wrap">
            <!-- Countdown -->
            <div class="study-countdown" style="--urgency:${urgencyColor}">
                <div class="countdown-num">${daysLeft}</div>
                <div class="countdown-label">${urgencyText}<br><span>días al examen</span></div>
                <div class="countdown-date">16 Mayo 2026</div>
            </div>

            <!-- Phase -->
            <div class="study-phase-badge" style="--phase-color:${phase.color};background:${phase.colorSoft};border-color:${phase.color}40">
                <span class="phase-icon">${phase.icon}</span>
                <div>
                    <div class="phase-name">${phase.name}</div>
                    <div class="phase-desc">${phase.desc}</div>
                </div>
            </div>

            <!-- Today's subjects -->
            <div class="study-today">
                <div class="study-today-label">📅 HOY TOCA</div>
                <div class="study-today-subjects">
                    ${todaySlot.labels.map((l, i) => `
                        <button class="study-subject-chip" onclick="scrollToSubject('${todaySlot.subjects[i] || ''}')">
                            ${l}
                        </button>`).join('')}
                </div>
                <div class="study-tasks-list">
                    ${phase.dailyTasks.map(t => `<div>• ${t}</div>`).join('')}
                </div>
            </div>

            <!-- Libreta button -->
            <div class="study-libreta-btn-wrap">
                <button class="btn-libreta" onclick="openLibreta()">
                    📓 Mi Libreta de Errores
                    ${libretaCount > 0 ? `<span class="libreta-count">${libretaCount}</span>` : ''}
                </button>
                ${libretaCount > 0 ? `<button class="btn-libreta-export" onclick="exportarLibreta()" title="Descargar como archivo">⬇️ Exportar</button>` : ''}
            </div>

            <!-- Strategic Tip (Full Width Bottom) -->
            <div class="study-tip-bar">
                <span class="tip-icon">${tip.icon}</span>
                <span class="tip-text">${tip.text}</span>
            </div>
        </div>`;
}

// ─── MOTIVATIONAL TUTOR ─────────────────────────────────────────
const TUTOR_DATA = {
    scolding: [
        "Vaya... me esperaba que hoy te lo tomaras en serio. El examen no va a esperar a que dejes de procrastinar. 🤖📉",
        "Me decepciona ver que el planificador sigue vacío a estas horas. ¿De verdad quieres ese título? 😑🦾",
        "Pensaba que éramos un equipo, pero veo que me dejas solo con el temario. Ponte las pilas. 🔧⚡",
        "Otro día que se escapa y tus objetivos siguen en rojo. Mañana no te servirá de nada lamentarte. 🤖🚫"
    ],
    encouraging: [
        "Sistemas operativos al 100%. Así se entrena un profesional. ¡Buen trabajo! 🤖✅",
        "Objetivos del día procesados con éxito. Tu eficiencia es digna de una IA. 🚀🦾",
        "¡Excelente! Vas camino a optimizar tu rendimiento al máximo nivel. No pares. 💎🎮",
        "Protocolo de estudio completado antes de tiempo. Eres el mejor hardware que este software podría desear. 🤖✨"
    ],
    nudge: [
        "Iniciando protocolo de estudio diario. ¿Cargamos el primer resumen de la mañana? 🤖☀️",
        "Buenos días, recluta. El sistema está listo para tu entrenamiento. ¿Por dónde empezamos? 🦾☕",
        "Nueva jornada detectada. Optimizamos el tiempo si empezamos ahora mismo. ⏳🤖"
    ]
};

function getTutorProgress() {
    const today = new Date().toLocaleDateString('es-ES');
    const all = Sync.get(TUTOR_PROGRESS_KEY, {});
    if (!all[today]) {
        all[today] = { theory: false, tests: false, labs: false };
        Sync.set(TUTOR_PROGRESS_KEY, all);
    }
    return all[today];
}

function updateTutorProgress(task, status = true, subjectId = null) {
    const today = new Date().toLocaleDateString('es-ES');
    const all = Sync.get(TUTOR_PROGRESS_KEY, {});
    if (!all[today]) all[today] = {};
    
    // For theory and labs, we require subject-specific tracking if subjectId is provided
    const key = (subjectId && (task === 'theory' || task === 'labs')) ? `${task}_${subjectId}` : task;
    
    all[today][key] = status;
    Sync.set(TUTOR_PROGRESS_KEY, all);
    renderTutorMessage();
    renderAcademicPlanner();
}

function getTasksForPhase() {
    const phase = getCurrentPhase();
    const todaySlot = getDailySubjects();
    const subjects = todaySlot.subjects || [];
    
    const tasks = [];
    phase.dailyTasks.forEach(t => {
        let key = 'theory';
        if (t.toLowerCase().includes('test') || t.toLowerCase().includes('simulacro')) key = 'tests';
        if (t.toLowerCase().includes('laboratorio') || t.toLowerCase().includes('práctica')) key = 'labs';
        if (t.toLowerCase().includes('fallos') || t.toLowerCase().includes('libreta')) key = 'tests';

        // If it's theory or labs, we split it by subject if today is a multi-subject day
        if (key === 'theory' || key === 'labs') {
            subjects.forEach((sid, i) => {
                tasks.push({ 
                    label: `${t} (${todaySlot.labels[i]})`, 
                    key: `${key}_${sid}`, 
                    baseKey: key, 
                    subjectId: sid,
                    subjectLabel: todaySlot.labels[i] 
                });
            });
        } else {
            tasks.push({ label: t, key: key, baseKey: key });
        }
    });
    return tasks;
}

function renderTutorMessage() {
    const container = document.getElementById('tutor-motivational-root');
    if (!container) return;

    const phaseTasks = getTasksForPhase();
    const progress = getTutorProgress();
    
    // Find first pending task
    const nextTask = phaseTasks.find(t => !progress[t.key]);
    const tasksDone = phaseTasks.filter(t => progress[t.key]).length;
    const totalTasks = phaseTasks.length;
    
    const hour = new Date().getHours();
    let mood = (tasksDone === totalTasks) ? 'encouraging' : (hour > 18 && tasksDone === 0) ? 'scolding' : 'nudge';
    let avatar = '🤖'; 

    if (tasksDone === totalTasks) avatar = '🤖🦾';
    else if (mood === 'scolding') avatar = '🤖📉';
    else avatar = '🤖☀️';

    let guidanceHTML = '';
    let message = '';

    if (!nextTask) {
        message = "¡Protocolo completado! Has destruido todos los objetivos de hoy. El sistema está optimizado al 100%. 🤖✨";
        mood = 'encouraging';
    } else {
        const key = nextTask.baseKey;
        const subLabel = nextTask.subjectLabel || 'la asignatura';
        const sid = nextTask.subjectId;

        if (key === 'theory') {
            message = `Iniciando Fase de Concepto. Debes procesar la **teoría** de **${subLabel}**. No intentes correr antes de saber caminar. 🤖📖`;
            guidanceHTML = `
                <div style="margin-top: 1rem;">
                    <button class="planner-go-btn" style="background:var(--primary-color); padding: 0.6rem 1.2rem; font-size: 0.85rem;" onclick="scrollToSubject('${sid}')">
                        ⚡ Abrir Teoría de ${subLabel}
                    </button>
                </div>`;
        } else if (key === 'tests') {
            message = `Base teórica suficiente para **${subLabel}** detectada. Ahora a por el **entrenamiento de tests**. 🤖🎯`;
            guidanceHTML = `
                <div style="margin-top: 1rem; display: flex; gap: 0.5rem; flex-wrap: wrap;">
                    <button class="planner-go-btn" style="background:#f97316; padding: 0.6rem 1.2rem; font-size: 0.85rem;" onclick="showView('dashboard'); switchDash('simulacros'); setTimeout(()=>scrollToSubject('${sid}'),150)">
                        🔥 Test: ${subLabel}
                    </button>
                    ${getCurrentPhase().id === 2 ? `<button onclick="showView('dashboard'); switchDash('fallos')" style="background:#6366f1; padding: 0.6rem 1.2rem; font-size: 0.85rem;" class="planner-go-btn">📓 Repasar Fallos</button>` : ''}
                </div>`;
        } else if (key === 'labs') {
            message = `Protocolo de práctica activado para **${subLabel}**. Es hora de mancharse las manos. 🤖🔧`;
            guidanceHTML = `
                <div style="margin-top: 1rem;">
                    <button class="planner-go-btn" style="background:#10b981; padding: 0.6rem 1.2rem; font-size: 0.85rem;" onclick="showView('dashboard'); switchDash('labs')">
                        🧪 Entrar al Laboratorio
                    </button>
                </div>`;
        }
    }

    container.innerHTML = `
        <div class="tutor-card ${mood}">
            <div class="tutor-avatar">${avatar}</div>
            <div class="tutor-content">
                <div class="tutor-title">
                    <span>Robot de Entrenamiento — Guía Estricta</span>
                    <span>${tasksDone}/${totalTasks} OBJETIVOS</span>
                </div>
                <div class="tutor-message">${message}</div>
                <div class="tutor-progress-mini">
                    ${phaseTasks.map(t => `
                        <div class="task-dot ${progress[t.key] ? 'done' : ''}" title="${t.label}"></div>
                    `).join('')}
                </div>
                ${guidanceHTML}
            </div>
        </div>
    `;
}

// ─── STUDY SESSION MANAGER ──────────────────────────────────────
function startStudySession(subjectId) {
    if (APP_STATE.studySession.active) {
        if (!confirm('Ya tienes una sesión activa. ¿Deseas cancelarla y empezar una nueva?')) return;
        cancelStudySession(false);
    }

    const subject = APP_STATE.subjects.find(s => s.id === subjectId) || { name: subjectId };
    
    if (APP_STATE.studySession.timerInterval) clearInterval(APP_STATE.studySession.timerInterval);
    
    APP_STATE.studySession = {
        active: true,
        subjectId: subjectId,
        subjectName: subject.name,
        startTime: Date.now(),
        elapsed: 0,
        timerInterval: setInterval(updateStudyTimer, 1000)
    };

    saveSessionSync();
    renderStudySessionBar();
}

function saveSessionSync() {
    Sync.set(SESSION_SYNC_KEY, {
        active: APP_STATE.studySession.active,
        subjectId: APP_STATE.studySession.subjectId,
        subjectName: APP_STATE.studySession.subjectName,
        startTime: APP_STATE.studySession.startTime
    });
}

function restoreStudySession() {
    const saved = Sync.get(SESSION_SYNC_KEY, null);
    if (saved && saved.active) {
        if (APP_STATE.studySession.timerInterval) clearInterval(APP_STATE.studySession.timerInterval);
        
        APP_STATE.studySession = {
            ...saved,
            elapsed: Math.floor((Date.now() - saved.startTime) / 1000),
            timerInterval: setInterval(updateStudyTimer, 1000)
        };
        renderStudySessionBar();
    }
}

function renderStudySessionBar() {
    const bar = document.getElementById('study-session-bar');
    if (!bar) return;

    bar.innerHTML = `
        <div class="session-info">
            <div class="session-timer">00:00</div>
            <div>
                <div style="font-size:0.7rem; color:var(--text-secondary); text-transform:uppercase; letter-spacing:1px;">Estudiando</div>
                <div class="session-subject">${APP_STATE.studySession.subjectName}</div>
            </div>
        </div>
        <div class="session-actions">
            <button class="btn-session-cancel" onclick="cancelStudySession()">Cancelar</button>
            <button class="btn-session-complete" onclick="completeStudySession()">He terminado de estudiar ✅</button>
        </div>
    `;
    bar.classList.remove('hidden');
    document.body.classList.add('has-active-session');
}

function updateStudyTimer() {
    const elapsedMs = Date.now() - APP_STATE.studySession.startTime;
    APP_STATE.studySession.elapsed = Math.floor(elapsedMs / 1000);
    
    // Scolding Heavy (cada 10 min de estudio)
    if (APP_STATE.studySession.elapsed > 0 && APP_STATE.studySession.elapsed % 600 === 0) {
        console.log("Robot: Nudge detectado");
        showRobotNudge();
    }

    const bar = document.getElementById('study-session-bar');
    if (bar) {
        const timerEl = bar.querySelector('.session-timer');
        if (timerEl) {
            const mins = Math.floor(APP_STATE.studySession.elapsed / 60);
            const secs = APP_STATE.studySession.elapsed % 60;
            timerEl.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
            
            // Visual feedback for the 5-min threshold
            if (mins >= 5) {
                timerEl.style.color = '#10b981'; // Green when ready
            }
        }
    }
}

function showRobotNudge() {
    const nudges = [
        "¿Sigues ahí? El tiempo corre y tu cerebro necesita oxígeno. ¡No te distraigas! 🤖⚡",
        "Monitorizando ondas cerebrales... detecto una bajada de ritmo. ¡Aumenta la frecuencia de estudio! 🦾📉",
        "El examen no se va a aprobar solo. Sigue procesando esos datos. 🤖📖"
    ];
    const msg = nudges[Math.floor(Math.random() * nudges.length)];
    // Simple notification in UI if possible or just log/alert
    console.log("ROBOT NUDGE:", msg);
}

function completeStudySession() {
    const mins = Math.floor(APP_STATE.studySession.elapsed / 60);
    const MIN_MINUTES = 5;

    if (mins < MIN_MINUTES) {
        alert(`❌ ACCESO DENEGADO. El Robot exige al menos ${MIN_MINUTES} minutos de estudio profundo para validar esta sesión. Llevas ${mins} min. ¡Sigue trabajando! 🤖🚫`);
        return;
    }

    updateTutorProgress('theory', true, APP_STATE.studySession.subjectId);
    logActivity('theory', `Sesión de Estudio: ${APP_STATE.studySession.subjectName}`, `Tiempo invertido: ${mins} minutos`);
    
    cancelStudySession(false); 
    alert(`¡OBJETIVO ALCANZADO! Has registrado ${mins} minutos de estudio Real de ${APP_STATE.studySession.subjectName}. El sistema está orgulloso. 🤖🦾✨`);
}

function cancelStudySession(shouldAsk = true) {
    if (shouldAsk && !confirm('¿Seguro que quieres cancelar la sesión? No se guardará el progreso.')) return;
    
    clearInterval(APP_STATE.studySession.timerInterval);
    APP_STATE.studySession = { active: false, subjectId: null, startTime: null, elapsed: 0, timerInterval: null };
    Sync.set(SESSION_SYNC_KEY, null);
    
    const bar = document.getElementById('study-session-bar');
    if (bar) {
        bar.classList.add('hidden');
        document.body.classList.remove('has-active-session');
    }
}

// ═══════════════════════════════════════════════════════════════
//  LIBRETA DE ERRORES — Método de Errores ("El Oro")
// ═══════════════════════════════════════════════════════════════

const LIBRETA_KEY = 'libreta_errores_v1';

function getLibreta() {
    return Sync.get(LIBRETA_KEY, {});
}

function saveLibretaNota(conceptId, subjectId, question, correctAnswer, nota) {
    const lib = getLibreta();
    if (!lib[subjectId]) lib[subjectId] = [];
    // Update existing or add new
    const existing = lib[subjectId].findIndex(e => e.conceptId === conceptId);
    const entry = { conceptId, question, correctAnswer, nota, date: new Date().toISOString() };
    if (existing >= 0) lib[subjectId][existing] = entry;
    else lib[subjectId].push(entry);
    Sync.set(LIBRETA_KEY, lib);
    renderStudyGuide(); // update count badge
}

function openLibreta() {
    const lib = getLibreta();
    const allEntries = Object.entries(lib).flatMap(([sid, entries]) =>
        entries.map(e => ({ ...e, subjectId: sid }))
    ).sort((a, b) => new Date(b.date) - new Date(a.date));

    const modal = document.getElementById('libreta-modal');
    const content = document.getElementById('libreta-content');

    if (allEntries.length === 0) {
        content.innerHTML = `
            <div style="text-align:center;padding:3rem;color:var(--text-secondary)">
                <div style="font-size:3rem;margin-bottom:1rem">📓</div>
                <p>Aún no tienes notas en tu libreta.</p>
                <p style="font-size:0.85rem;margin-top:0.5rem">Cuando falles una pregunta, pulsa <strong>"📝 Anotar en libreta"</strong> para apuntar por qué fallaste.</p>
            </div>`;
    } else {
        content.innerHTML = `
            <div class="libreta-entries">
                ${allEntries.map(e => `
                    <div class="libreta-entry" data-concept="${esc(e.conceptId)}" data-subject="${esc(e.subjectId)}">
                        <div class="libreta-entry-q">❌ ${esc(e.question.substring(0, 120))}${e.question.length > 120 ? '...' : ''}</div>
                        <div class="libreta-entry-a">✅ <em>${esc(e.correctAnswer)}</em></div>
                        <div class="libreta-entry-nota">
                            <span class="nota-icon">🧠</span>
                            <div class="nota-text" contenteditable="true" onblur="updateLibretaNota('${esc(e.conceptId)}','${esc(e.subjectId)}',this.textContent)">${esc(e.nota || 'Haz clic para añadir tu explicación...')}</div>
                        </div>
                        <div class="libreta-entry-date">${new Date(e.date).toLocaleDateString('es-ES')}</div>
                        <button class="libreta-del-btn" onclick="deleteLibretaEntry('${esc(e.conceptId)}','${esc(e.subjectId)}')" title="Eliminar">✕</button>
                    </div>`).join('')}
            </div>`;
    }
    modal.classList.remove('hidden');
}

function closeLibreta() {
    document.getElementById('libreta-modal').classList.add('hidden');
}

function updateLibretaNota(conceptId, subjectId, newNota) {
    const lib = getLibreta();
    if (lib[subjectId]) {
        const entry = lib[subjectId].find(e => e.conceptId === conceptId);
        if (entry) {
            entry.nota = newNota;
            Sync.set(LIBRETA_KEY, lib);
        }
    }
}

function deleteLibretaEntry(conceptId, subjectId) {
    const lib = getLibreta();
    if (lib[subjectId]) {
        lib[subjectId] = lib[subjectId].filter(e => e.conceptId !== conceptId);
        Sync.set(LIBRETA_KEY, lib);
        openLibreta(); // refresh
        renderStudyGuide();
    }
}

function showLibretaInput(conceptId, subjectId, question, correctAnswer) {
    const area = document.getElementById('libreta-inline-area');
    if (!area) return;
    area.innerHTML = `
        <div class="libreta-inline">
            <div class="libreta-inline-label">📓 ¿Por qué fallaste? <span style="color:var(--text-secondary);font-size:0.8rem">(opcional pero muy recomendado)</span></div>
            <textarea id="libreta-nota-input" class="libreta-nota-textarea" placeholder="Ej: Confundí abstract class con interface. Abstract puede tener métodos con cuerpo, interface no."></textarea>
            <div style="display:flex;gap:0.5rem;margin-top:0.5rem;flex-wrap:wrap">
                <button class="btn-save-nota" onclick="guardarNota('${esc(conceptId)}','${esc(subjectId)}',${JSON.stringify(question).replace(/'/g,"'")} ,${JSON.stringify(correctAnswer).replace(/'/g,"'")})">
                    💾 Guardar en libreta
                </button>
                <button class="btn-skip-nota" onclick="document.getElementById('libreta-inline-area').innerHTML=''">
                    Ahora no
                </button>
            </div>
        </div>`;
    area.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function guardarNota(conceptId, subjectId, question, correctAnswer) {
    const nota = document.getElementById('libreta-nota-input')?.value?.trim() || '';
    saveLibretaNota(conceptId, subjectId, question, correctAnswer, nota);
    const area = document.getElementById('libreta-inline-area');
    if (area) area.innerHTML = `<div class="libreta-saved-confirm">✅ Guardado en tu libreta de errores</div>`;
}

function exportarLibreta() {
    const lib = getLibreta();
    const subjectNames = {
        sistemas_informaticos: 'Sistemas Informáticos',
        bases_de_datos: 'Bases de Datos',
        programacion: 'Programación',
        lenguaje_de_marcas: 'Lenguaje de Marcas',
        entornos_de_desarrollo: 'Entornos de Desarrollo',
        cloud_computing: 'Cloud Computing',
        empleabilidad: 'Empleabilidad',
    };

    let md = `# 📓 Mi Libreta de Errores — DAW 2026\n`;
    md += `> Generado: ${new Date().toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' })}\n\n`;
    md += `---\n\n`;

    let totalEntries = 0;
    for (const [sid, entries] of Object.entries(lib)) {
        if (entries.length === 0) continue;
        md += `## ${subjectNames[sid] || sid} (${entries.length} errores)\n\n`;
        entries.forEach((e, i) => {
            totalEntries++;
            md += `### ${i + 1}. ❌ ${e.question}\n\n`;
            md += `**✅ Respuesta correcta:** ${e.correctAnswer}\n\n`;
            md += `**🧠 Por qué fallé:** ${e.nota || '_(Sin anotación)_'}\n\n`;
            md += `---\n\n`;
        });
    }

    if (totalEntries === 0) {
        alert('Tu libreta está vacía. Añade notas cuando falles una pregunta.');
        return;
    }

    md += `\n> **Total de errores anotados:** ${totalEntries}\n`;
    md += `> \n> *Repasa este documento los últimos 3 días antes del examen.*\n`;

    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `libreta_errores_DAW_${new Date().toISOString().slice(0,10)}.md`;
    a.click();
    URL.revokeObjectURL(url);
}

function hasSummary(subjectId, unit) {
    if (!APP_STATE.summaries) return false;
    const key = `${getSubjectPrefix(subjectId)}_tema_${unit}`;
    return !!APP_STATE.summaries[key];
}

function getSubjectPrefix(subjectId) {
    const map = {
        'bases_de_datos': 'bd',
        'entornos_de_desarrollo': 'ed',
        'lenguaje_de_marcas': 'lm',
        'empleabilidad': 'emp',
        'programacion': 'prog',
        'sistemas_informaticos': 'si',
        'cloud_computing': 'cc'
    };
    return map[subjectId] || subjectId;
}

function openSummary(subjectId, unit) {
    if (!APP_STATE.studySession.active) {
        startStudySession(subjectId);
    }
    const key = `${getSubjectPrefix(subjectId)}_tema_${unit}`;
    const summary = APP_STATE.summaries[key];
    if (!summary) return;

    const modal = document.getElementById('summary-modal');
    const title = document.getElementById('summary-title');
    const pointsContainer = document.getElementById('summary-points');

    title.innerText = summary.name || `Resumen Tema ${unit}`;
    pointsContainer.innerHTML = summary.points.map(p => `
        <div class="summary-point">
            <span class="point-bullet">✦</span>
            <div class="point-text">${formatSummaryPoint(p)}</div>
        </div>
    `).join('');

    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function formatSummaryPoint(text) {
    return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
}

function closeSummary() {
    document.getElementById('summary-modal').classList.add('hidden');
    document.body.style.overflow = 'auto';
}
function scrollToSubject(id) {
    if (!id) return;
    
    // Ensure we are in the dashboard and specifically in the mocks/theory section
    showView('dashboard');
    switchDash('simulacros');
    
    // Wait a bit for the layout to settle/render
    setTimeout(() => {
        const el = document.querySelector(`[data-subject-id="${id}"]`);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            el.classList.add('highlight-momentary');
            setTimeout(() => el.classList.remove('highlight-momentary'), 2000);
        }
    }, 150);
}
