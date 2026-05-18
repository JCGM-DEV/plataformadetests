
/**
 * DAW 2026 — pdf_utils.js
 * Utility to generate PDF versions of tests and simulations.
 */

const jsPDF = window.jspdf ? window.jspdf.jsPDF : null;

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

/**
 * Generates an HTML document for the current lab unit and triggers native print/PDF export.
 * This is used INSIDE the lab environments (practicaPROG, practicaLM, etc.)
 */
function printCurrentLabUnit() {
    if (typeof UNITS === 'undefined' || typeof currentUnit === 'undefined' || !currentUnit || !UNITS[currentUnit]) {
        alert("Abre un simulacro o tema primero para poder exportarlo a PDF.");
        return;
    }
    
    const unit = UNITS[currentUnit];
    
    let htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>${unit.title} - Exportación PDF</title>
            <style>
                body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; line-height: 1.6; color: #1f2937; margin: 0; padding: 20px; }
                h1 { color: #1e3a8a; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px; margin-bottom: 30px; }
                h2 { color: #2563eb; margin-top: 40px; border-bottom: 1px solid #e5e7eb; padding-bottom: 5px; }
                h3 { color: #3b82f6; margin-top: 30px; }
                .question-block { margin-bottom: 25px; page-break-inside: avoid; }
                .question-text { font-weight: bold; margin-bottom: 10px; font-size: 1.05em; }
                .options-list { list-style-type: upper-alpha; margin-top: 0; padding-left: 25px; }
                .options-list li { margin-bottom: 5px; }
                .case-block { margin-bottom: 30px; padding: 20px; background: #f8fafc; border-left: 4px solid #2563eb; page-break-inside: avoid; border-radius: 4px; }
                .code-block { font-family: 'Consolas', 'Monaco', monospace; background: #1e293b; color: #f8fafc; padding: 15px; white-space: pre-wrap; font-size: 13px; border-radius: 6px; overflow-x: auto; }
                .solution-block { page-break-inside: avoid; margin-bottom: 25px; padding: 15px; border: 1px solid #e5e7eb; border-radius: 6px; }
                .solution-title { font-weight: bold; color: #166534; display: block; margin-bottom: 10px; font-size: 1.1em; }
                .page-break { page-break-before: always; }
                .explanation { background: #f0fdf4; padding: 10px; border-left: 3px solid #22c55e; margin-top: 10px; border-radius: 0 4px 4px 0; }
                .kw { color: #c678dd; }
                .fn { color: #61afef; }
                .tp { color: #e5c07b; }
                .str { color: #98c379; }
                .num { color: #d19a66; }
                .cm { color: #5c6370; font-style: italic; }
            </style>
        </head>
        <body>
            <h1>${unit.label} - ${unit.title}</h1>
            <h2>PARTE 1: ENUNCIADOS</h2>
    `;
    
    let solutionsHtml = `
        <div class="page-break"></div>
        <h2>PARTE 2: SOLUCIONES</h2>
    `;
    
    const formatCode = (code) => {
        if (!code) return 'No disponible.';
        // If it already has our syntax highlighting spans, return as HTML
        if (code.includes('<span class="kw">') || code.includes('<span class="fn">') || code.includes('<span class="tp">') || code.includes('<span class="cm">')) {
            return code;
        }
        // Otherwise it's raw text (like XML/HTML from practicaLM), escape it
        return code.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    };
    
    let qCounter = 1;

    unit.sections.forEach(sec => {
        htmlContent += `<h3>${sec.icon || ''} ${sec.label}</h3>`;
        solutionsHtml += `<h3>${sec.icon || ''} ${sec.label} - Soluciones</h3>`;
        
        // QUIZZES
        if (sec.type === 'quiz' && typeof QUIZZES !== 'undefined' && QUIZZES[sec.quizId]) {
            const quiz = QUIZZES[sec.quizId];
            quiz.questions.forEach(q => {
                htmlContent += `
                    <div class="question-block">
                        <div class="question-text">${qCounter}. ${q.q.replace(/\n/g, '<br>')}</div>
                        <ul class="options-list">
                            ${q.opts.map(o => `<li>${o.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</li>`).join('')}
                        </ul>
                    </div>
                `;
                
                let expText = '';
                if (q.exp && q.exp !== 'Pregunta del temario oficial.') {
                    expText = `<div class="explanation"><em>Explicación:</em><br>${q.exp.replace(/\n/g, '<br>')}</div>`;
                }

                solutionsHtml += `
                    <div class="solution-block">
                        <span class="solution-title">Pregunta ${qCounter}:</span> 
                        <strong>Opción ${String.fromCharCode(65 + q.ans)}</strong>
                        ${expText}
                    </div>
                `;
                qCounter++;
            });
        }
        
        // EJERCICIOS (PROG, BD, etc)
        else if (sec.type === 'ejercicio' && typeof EJERCICIOS !== 'undefined') {
            const ej = EJERCICIOS.find(e => e.id === sec.ejercicioId);
            if (ej) {
                const enunciado = (ej.enunciado || ej.problem || '').replace(/\n/g, '<br>');
                htmlContent += `
                    <div class="case-block">
                        <strong style="font-size:1.2em;">${ej.titulo || 'Caso Práctico'}</strong><br><br>
                        ${enunciado}
                    </div>
                `;
                
                const solucion = ej.solucion || ej.solution || 'No hay solución estática disponible para este ejercicio.';
                solutionsHtml += `
                    <div class="solution-block">
                        <span class="solution-title">${ej.titulo || 'Caso Práctico'}</span>
                        <div class="code-block">${formatCode(solucion)}</div>
                    </div>
                `;
            }
        }
        
        // EDITOR_LABS / EXAM (LM, BD, SI)
        else if ((sec.type === 'editor' || sec.type === 'exam') && typeof EDITOR_LABS !== 'undefined' && EDITOR_LABS[sec.editorId]) {
            const lab = EDITOR_LABS[sec.editorId];
            const ex = lab.exercises[0]; 
            const desc = lab.examDesc || ex.desc || '';
            
            htmlContent += `
                <div class="case-block">
                    <strong style="font-size:1.2em;">${lab.examTitle || lab.title || 'Ejercicio Práctico'}</strong><br><br>
                    ${desc.replace(/\n/g, '<br>')}
                </div>
            `;
            
            const solucion = ex.solution || 'Solución estructurada en hitos. Consultar plataforma interactiva.';
            solutionsHtml += `
                    <div class="solution-block">
                        <span class="solution-title">${lab.examTitle || lab.title || 'Ejercicio Práctico'}</span>
                        <div class="code-block">${formatCode(solucion)}</div>
                    </div>
            `;
        }
        
        // CODE_LABS (PROG)
        else if (sec.type === 'code' && typeof CODE_LABS !== 'undefined' && CODE_LABS[sec.codeId]) {
            const lab = CODE_LABS[sec.codeId];
            htmlContent += `<div class="case-block"><strong style="font-size:1.2em;">${lab.title}</strong><br><br>${lab.description.replace(/\n/g, '<br>')}</div>`;
            solutionsHtml += `<div style="margin-bottom:20px;"><strong style="font-size:1.2em;">${lab.title}</strong></div>`;
            
            lab.exercises.forEach((ex, idx) => {
                htmlContent += `
                    <div style="margin-bottom: 20px; padding-left: 20px; border-left: 2px solid #cbd5e1;">
                        <strong>Ejercicio ${idx+1}: ${ex.title}</strong><br><br>
                        ${ex.desc.replace(/\n/g, '<br>')}
                    </div>
                `;
                solutionsHtml += `
                    <div class="solution-block">
                        <span class="solution-title">Ejercicio ${idx+1}: ${ex.title}</span>
                        <div class="code-block">${formatCode(ex.solution)}</div>
                    </div>
                `;
            });
        }
        
        // DRAG EXERCISES (All)
        else if (sec.type === 'drag' && typeof DRAG_EXERCISES !== 'undefined' && DRAG_EXERCISES[sec.dragId]) {
            const drag = DRAG_EXERCISES[sec.dragId];
            htmlContent += `<div class="case-block"><strong style="font-size:1.2em;">${drag.title}</strong><br><br>${drag.description.replace(/\n/g, '<br>')}</div>`;
            solutionsHtml += `<div style="margin-bottom:20px;"><strong style="font-size:1.2em;">${drag.title}</strong></div>`;
            
            drag.exercises.forEach((ex, idx) => {
                htmlContent += `
                    <div style="margin-bottom: 20px; padding-left: 20px; border-left: 2px solid #cbd5e1;">
                        <strong>Escenario ${idx+1}:</strong><br>
                        ${ex.scenario.replace(/\n/g, '<br>')}
                    </div>
                `;
                solutionsHtml += `
                    <div class="solution-block">
                        <span class="solution-title">Escenario ${idx+1}</span>
                        Respuesta correcta: <strong>${ex.answer}</strong><br>
                        <div class="explanation"><em>Explicación:</em><br>${ex.explanation.replace(/\n/g, '<br>')}</div>
                    </div>
                `;
            });
        }
    });

    htmlContent += solutionsHtml;
    htmlContent += `
        </body>
        </html>
    `;
    
    const printWindow = window.open('', '_blank');
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    printWindow.focus();
    
    // Allow images/styles to load then print
    setTimeout(() => {
        printWindow.print();
    }, 500);
}

