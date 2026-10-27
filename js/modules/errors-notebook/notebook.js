/**
 * notebook.js - Libreta de Errores ("El Oro")
 * Permite registrar, editar notas pedagógicas, eliminar y exportar a Markdown
 * las preguntas falladas por el estudiante durante sus simulacros.
 */

const ErrorsNotebook = (() => {
    const KEY = window.APP_CONFIG?.STORAGE_KEYS?.LIBRETA || 'libreta_errores_v1';

    function getAll() {
        return typeof Sync !== 'undefined' ? Sync.get(KEY, {}) : (JSON.parse(localStorage.getItem(KEY)) || {});
    }

    function saveNota(conceptId, subjectId, question, correctAnswer, nota) {
        const lib = getAll();
        if (!lib[subjectId]) lib[subjectId] = [];

        const existingIndex = lib[subjectId].findIndex(e => e.conceptId === conceptId);
        const entry = {
            conceptId,
            question,
            correctAnswer,
            nota: nota || '',
            date: new Date().toISOString()
        };

        if (existingIndex >= 0) {
            lib[subjectId][existingIndex] = entry;
        } else {
            lib[subjectId].push(entry);
        }

        if (typeof Sync !== 'undefined') {
            Sync.set(KEY, lib);
        } else {
            localStorage.setItem(KEY, JSON.stringify(lib));
        }

        if (typeof renderStudyGuide === 'function') {
            renderStudyGuide();
        }
    }

    function updateNota(conceptId, subjectId, newNota) {
        const lib = getAll();
        if (lib[subjectId]) {
            const entry = lib[subjectId].find(e => e.conceptId === conceptId);
            if (entry) {
                entry.nota = newNota;
                if (typeof Sync !== 'undefined') {
                    Sync.set(KEY, lib);
                } else {
                    localStorage.setItem(KEY, JSON.stringify(lib));
                }
            }
        }
    }

    function deleteEntry(conceptId, subjectId) {
        const lib = getAll();
        if (lib[subjectId]) {
            lib[subjectId] = lib[subjectId].filter(e => e.conceptId !== conceptId);
            if (typeof Sync !== 'undefined') {
                Sync.set(KEY, lib);
            } else {
                localStorage.setItem(KEY, JSON.stringify(lib));
            }
            openModal();
            if (typeof renderStudyGuide === 'function') {
                renderStudyGuide();
            }
        }
    }

    function openModal() {
        const lib = getAll();
        const allEntries = Object.entries(lib).flatMap(([sid, entries]) =>
            (Array.isArray(entries) ? entries : []).map(e => ({ ...e, subjectId: sid }))
        ).sort((a, b) => new Date(b.date) - new Date(a.date));

        const modal = document.getElementById('libreta-modal');
        const content = document.getElementById('libreta-content');
        if (!modal || !content) return;

        if (allEntries.length === 0) {
            content.innerHTML = `
                <div style="text-align:center;padding:3rem;color:var(--text-secondary)">
                    <div style="font-size:3rem;margin-bottom:1rem">📓</div>
                    <p>Aún no tienes notas registradas en tu libreta.</p>
                    <p style="font-size:0.85rem;margin-top:0.5rem">Cuando falles una pregunta en un simulacro, pulsa <strong>"📝 Anotar en libreta"</strong> para documentar la causa del error.</p>
                </div>`;
        } else {
            const esc = AppHelpers ? AppHelpers.esc : (s => s);
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

    function closeModal() {
        const modal = document.getElementById('libreta-modal');
        if (modal) modal.classList.add('hidden');
    }

    function exportToMarkdown() {
        const lib = getAll();
        const subjectMap = {
            sistemas_informaticos: 'Sistemas Informáticos',
            bases_de_datos: 'Bases de Datos',
            programacion: 'Programación',
            lenguaje_de_marcas: 'Lenguaje de Marcas',
            entornos_de_desarrollo: 'Entornos de Desarrollo',
            cloud_computing: 'Cloud Computing',
            empleabilidad: 'Empleabilidad'
        };

        let md = `# 📓 Mi Libreta de Errores — DAW 2026\n`;
        md += `> Generado: ${new Date().toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' })}\n\n`;
        md += `---\n\n`;

        let totalEntries = 0;
        for (const [sid, entries] of Object.entries(lib)) {
            if (!Array.isArray(entries) || entries.length === 0) continue;
            md += `## ${subjectMap[sid] || sid} (${entries.length} errores)\n\n`;
            entries.forEach((e, i) => {
                totalEntries++;
                md += `### ${i + 1}. ❌ ${e.question}\n\n`;
                md += `**✅ Respuesta correcta:** ${e.correctAnswer}\n\n`;
                md += `**🧠 Por qué fallé:** ${e.nota || '_(Sin anotación)_'}\n\n`;
                md += `---\n\n`;
            });
        }

        if (totalEntries === 0) {
            if (typeof Toast !== 'undefined') Toast.info('No hay entradas en la libreta para exportar');
            else alert('No hay entradas en la libreta para exportar.');
            return;
        }

        const blob = new Blob([md], { type: 'text/markdown;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Libreta_de_Errores_DAW_${new Date().toISOString().slice(0, 10)}.md`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        if (typeof Toast !== 'undefined') Toast.success('Libreta de errores exportada correctamente');
    }

    return {
        getAll,
        saveNota,
        updateNota,
        deleteEntry,
        openModal,
        closeModal,
        exportToMarkdown
    };
})();

// Adaptadores globales para mantener interoperabilidad total con onclicks de HTML
function getLibreta() { return ErrorsNotebook.getAll(); }
function saveLibretaNota(cid, sid, q, a, n) { ErrorsNotebook.saveNota(cid, sid, q, a, n); }
function openLibreta() { ErrorsNotebook.openModal(); }
function closeLibreta() { ErrorsNotebook.closeModal(); }
function updateLibretaNota(cid, sid, n) { ErrorsNotebook.updateNota(cid, sid, n); }
function deleteLibretaEntry(cid, sid) { ErrorsNotebook.deleteEntry(cid, sid); }
function exportarLibreta() { ErrorsNotebook.exportToMarkdown(); }

if (typeof window !== 'undefined') {
    window.ErrorsNotebook = ErrorsNotebook;
    window.getLibreta = getLibreta;
    window.saveLibretaNota = saveLibretaNota;
    window.openLibreta = openLibreta;
    window.closeLibreta = closeLibreta;
    window.updateLibretaNota = updateLibretaNota;
    window.deleteLibretaEntry = deleteLibretaEntry;
    window.exportarLibreta = exportarLibreta;
}
