
/**
 * TechHub Euroformac — DAW 2026 — pdf_utils.js
 * Utility to generate PDF versions of tests and simulations.
 */

const { jsPDF } = window.jspdf;

/**
 * Generates a PDF for a given set of questions.
 * @param {string} title - The title of the PDF.
 * @param {Array} questions - Array of question objects.
 * @param {string} subjectName - Name of the subject.
 */
async function generateExamPDF(title, questions, subjectName) {
    const doc = new jsPDF();
    const margin = 20;
    const pageWidth = doc.internal.pageSize.getWidth();
    let y = 20;

    // --- Header ---
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text(title.toUpperCase(), margin, y);
    y += 10;
    
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`Asignatura: ${subjectName}`, margin, y);
    y += 6;
    doc.text(`Fecha: ${new Date().toLocaleDateString()}`, margin, y);
    y += 15;

    // --- Questions Section ---
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text("PARTE 1: ENUNCIADOS", margin, y);
    y += 10;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);

    questions.forEach((q, index) => {
        // Check for page break (approx 20mm per question block)
        if (y > 260) {
            doc.addPage();
            y = 20;
        }

        const qText = `${index + 1}. ${q.question}`;
        const splitText = doc.splitTextToSize(qText, pageWidth - margin * 2);
        
        doc.setFont("helvetica", "bold");
        doc.text(splitText, margin, y);
        y += (splitText.length * 6);

        doc.setFont("helvetica", "normal");
        q.options.forEach((opt, optIndex) => {
            if (y > 275) {
                doc.addPage();
                y = 20;
            }
            const optLetter = String.fromCharCode(65 + optIndex);
            const optText = `   ${optLetter}) ${opt}`;
            const splitOpt = doc.splitTextToSize(optText, pageWidth - margin * 2.5);
            doc.text(splitOpt, margin, y);
            y += (splitOpt.length * 6);
        });
        y += 6; // Space between questions
    });

    // --- Solutions Section ---
    doc.addPage();
    y = 20;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text("PARTE 2: SOLUCIONES", margin, y);
    y += 10;

    doc.setFontSize(11);
    questions.forEach((q, index) => {
        if (y > 260) {
            doc.addPage();
            y = 20;
        }

        const correctOpt = String.fromCharCode(65 + q.correct);
        doc.setFont("helvetica", "bold");
        doc.text(`${index + 1}. Respuesta Correcta: ${correctOpt}`, margin, y);
        y += 6;

        if (q.explanation && q.explanation !== 'Pregunta del temario oficial.') {
            doc.setFont("helvetica", "italic");
            const explText = `Explicación: ${q.explanation}`;
            const splitExpl = doc.splitTextToSize(explText, pageWidth - margin * 2);
            doc.text(splitExpl, margin, y);
            y += (splitExpl.length * 5) + 2;
        }
        
        doc.setFont("helvetica", "normal");
        y += 4;
    });

    doc.save(`${title.replace(/\s+/g, '_')}.pdf`);
}

/**
 * Action for PDF button in Theme / Unit
 */
async function downloadThemePDF(subjectId, unitId) {
    const subject = APP_STATE.subjects.find(s => s.id === subjectId);
    const syllabusInfo = APP_STATE.syllabusExams.find(e => e.subject_id === subjectId && e.unit == unitId);
    if (!syllabusInfo) return;

    let questions = [];
    try {
        if (typeof SYLLABUS_RAW_DATA !== 'undefined' && SYLLABUS_RAW_DATA[syllabusInfo.id]) {
            questions = SYLLABUS_RAW_DATA[syllabusInfo.id];
        } else {
            const res = await fetch(syllabusInfo.file + '?v=' + Date.now());
            const text = await res.text();
            questions = parseTxtExam(text, syllabusInfo.id);
        }
        
        if (questions.length === 0) {
            alert("No se pudieron cargar las preguntas para este PDF.");
            return;
        }

        generateExamPDF(syllabusInfo.name, questions, subject.name);
    } catch (e) {
        console.error(e);
        alert("Error al generar el PDF.");
    }
}

/**
 * Action for PDF button in General Simulation
 */
async function downloadGeneralSimulacroPDF(subjectId) {
    const subject = APP_STATE.subjects.find(s => s.id === subjectId);
    const temas = APP_STATE.syllabusExams.filter(e => e.subject_id === subjectId && e.type !== 'lab');
    
    if (temas.length === 0) {
        // Try to get from global pool if no syllabus themes
        const pool = QUESTION_POOL[subjectId] || [];
        if (pool.length === 0) {
            alert("No hay preguntas disponibles para esta asignatura.");
            return;
        }
        generateExamPDF(`${subject.name} - Simulacro General`, shuffleArray(pool).slice(0, 120), subject.name);
        return;
    }

    try {
        let allQuestions = [];
        if (typeof SYLLABUS_RAW_DATA !== 'undefined') {
            allQuestions = temas.map(t => SYLLABUS_RAW_DATA[t.id] || []).flat();
        } else {
            const fetches = temas.map(t => fetch(t.file + '?v=' + Date.now())
                .then(r => r.text())
                .then(text => parseTxtExam(text, t.id))
                .catch(() => []));
            const allArrays = await Promise.all(fetches);
            allQuestions = allArrays.flat();
        }

        if (allQuestions.length === 0) {
            alert("No se pudieron cargar las preguntas.");
            return;
        }

        // Take 120 random questions
        const TARGET = 120;
        const selected = shuffleArray(allQuestions).slice(0, TARGET);

        generateExamPDF(`${subject.name} - Simulacro General`, selected, subject.name);
    } catch (e) {
        console.error(e);
        alert("Error al generar el PDF.");
    }
}

/**
 * Action for PDF button in Labs / Practical Cases
 */
async function downloadLabPDF(labId) {
    const labInfo = APP_STATE.syllabusExams.find(e => e.id === labId);
    if (!labInfo) return;
    
    const subject = APP_STATE.subjects.find(s => s.id === labInfo.subject_id);

    // Case 1: Lab points to a .txt file (it's a question-based practical case)
    if (labInfo.file.endsWith('.txt')) {
        try {
            const res = await fetch(labInfo.file + '?v=' + Date.now());
            const text = await res.text();
            const questions = parseTxtExam(text, labId);
            generateExamPDF(labInfo.name, questions, subject.name);
        } catch (e) {
            console.error(e);
            alert("Error al generar el PDF.");
        }
    } 
    // Case 2: Lab is an interactive HTML (we can't easily parse it, but we can try common data structures)
    else {
        alert("Este laboratorio es interactivo. Se generará un PDF con la descripción disponible.");
        // Simple description PDF for now
        const doc = new jsPDF();
        doc.setFont("helvetica", "bold");
        doc.setFontSize(18);
        doc.text(labInfo.name.toUpperCase(), 20, 20);
        doc.setFontSize(12);
        doc.setFont("helvetica", "normal");
        doc.text(`Asignatura: ${subject.name}`, 20, 30);
        doc.text(`Tipo: Laboratorio Interactivo`, 20, 36);
        
        let desc = "Este es un laboratorio práctico interactivo diseñado para realizarse directamente en la plataforma.";
        if (typeof getLabDescription === 'function') {
            desc = getLabDescription(labId);
        }
        
        const splitDesc = doc.splitTextToSize(desc, 170);
        doc.text(splitDesc, 20, 50);
        
        doc.save(`${labId}.pdf`);
    }
}
