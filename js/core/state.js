/**
 * state.js - Estado Centralizado de la Aplicación (APP_STATE)
 * Mantiene la reactividad y persistencia del contexto del estudiante (curso, examen activo, sesión de estudio).
 */

window.APP_STATE = window.APP_STATE || {
    course: 'daw2',
    subjects: [],
    testBank: {},
    syllabusExams: [],
    currentSubject: null,
    currentExam: null,
    currentQuestionIndex: 0,
    score: 0,
    answers: [],
    timer: 0,
    timerInterval: null,
    summaries: {},
    isReviewing: false,
    fcQuestions: [],
    fcIndex: 0,
    fcFlipped: false,
    isFinishing: false,
    isReview: false,
    activeThemeMenuPortal: null,
    studySession: {
        active: false,
        subjectId: null,
        subjectName: '',
        startTime: null,
        elapsed: 0,
        timerInterval: null
    }
};

window.QUESTION_POOL = window.QUESTION_POOL || {};
window.learningChart = window.learningChart || null;

var APP_STATE = window.APP_STATE;
var QUESTION_POOL = window.QUESTION_POOL;
var learningChart = window.learningChart;
