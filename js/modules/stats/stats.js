/**
 * stats.js - Estadísticas y Analítica de Aprendizaje
 * Gestiona la representación de la curva de aprendizaje (Chart.js),
 * el historial de simulacros y la ficha pormenorizada por asignatura y tema.
 */

const LearningStats = (() => {
    function renderProgress() {
        const history = typeof getHistory === 'function' ? getHistory() : [];
        const grid = document.getElementById('progress-section');
        if (!grid) return;

        if (history.length === 0) {
            grid.innerHTML = `
                <div class="empty-state">
                    <div class="empty-icon">📈</div>
                    <p>Aún no hay datos de progreso. Realiza tu primer simulacro para empezar a ver tus estadísticas.</p>
                    <button class="btn-secondary" onclick="switchDash('academia')" style="margin-top:1rem">Empezar a practicar</button>
                </div>`;
            return;
        }

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
        const fillEl = document.getElementById('global-progress-fill');
        const labelEl = document.getElementById('global-avg-label');
        if (fillEl) fillEl.style.width = Math.min(100, (globalAvg / 10) * 100) + '%';
        if (labelEl) labelEl.textContent = `Media: ${globalAvg.toFixed(2)} / 10`;

        const subjectColors = {
            sistemas_informaticos: '#6366f1', bases_de_datos: '#22d3ee',
            programacion: '#a855f7', lenguaje_de_marcas: '#f59e0b',
            entornos_de_desarrollo: '#10b981', cloud_computing: '#3b82f6',
            empleabilidad: '#ec4899', dwec: '#eab308', dwes: '#8b5cf6',
            python: '#38bdf8', diw: '#ec4899', despliegue: '#14b8a6',
            ingles: '#06b6d4', ipe: '#f97316', sost: '#84cc16'
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

        const maxExams = Math.max(...Object.values(bySubject).map(a => a.length), 1);
        datasets.push({
            label: 'Aprobado (5.0)',
            data: Array.from({ length: maxExams }, (_, i) => ({ x: i + 1, y: 5 })),
            borderColor: '#ef444488', borderDash: [6, 4], borderWidth: 1.5,
            pointRadius: 0, fill: false, tension: 0
        });

        const canvas = document.getElementById('learningChart');
        if (canvas && typeof Chart !== 'undefined') {
            const ctx = canvas.getContext('2d');
            if (window.learningChart) window.learningChart.destroy();
            window.learningChart = new Chart(ctx, {
                type: 'line',
                data: { datasets },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    interaction: { mode: 'index', intersect: false },
                    plugins: {
                        legend: { labels: { color: '#94a3b8', font: { family: 'Inter' } } },
                        tooltip: {
                            backgroundColor: '#1e293b',
                            borderColor: '#334155',
                            borderWidth: 1,
                            titleColor: '#f8fafc',
                            bodyColor: '#94a3b8',
                            callbacks: {
                                title: items => `Examen nº ${items[0].raw.x}`,
                                label: item => ` ${item.dataset.label}: ${item.raw.y.toFixed(2)}`
                            }
                        }
                    },
                    scales: {
                        x: {
                            type: 'linear',
                            title: { display: true, text: 'Nº Examen', color: '#64748b' },
                            ticks: { color: '#64748b', stepSize: 1 },
                            grid: { color: '#1e293b' }
                        },
                        y: {
                            min: 0, max: 10,
                            title: { display: true, text: 'Nota', color: '#64748b' },
                            ticks: { color: '#64748b' },
                            grid: { color: '#1e293b' }
                        }
                    }
                }
            });
        }

        const recent = [...history].reverse().slice(0, 20);
        const tableContainer = document.getElementById('history-table-container');
        if (tableContainer) {
            tableContainer.innerHTML = `
                <table class="history-table">
                    <thead><tr><th>Fecha</th><th>Asignatura</th><th>✅</th><th>❌</th><th>⬜</th><th>Nota</th></tr></thead>
                    <tbody>
                        ${recent.map(e => {
                            const d = new Date(e.date);
                            const ds = `${d.getDate().toString().padStart(2,'0')}/${(d.getMonth()+1).toString().padStart(2,'0')} ${d.getHours().toString().padStart(2,'0')}:${d.getMinutes().toString().padStart(2,'0')}`;
                            const badge = e.score >= 5 ? `<span class="badge-pass">${e.score.toFixed(2)}</span>` : `<span class="badge-fail">${e.score.toFixed(2)}</span>`;
                            const cleanName = (e.subjectName || '').split(' ').slice(0, 2).join(' ');
                            return `<tr><td>${ds}</td><td title="${AppHelpers.esc(e.subjectName)}">${AppHelpers.esc(cleanName)}</td><td>${e.aciertos}</td><td>${e.errores}</td><td>${e.omitidas}</td><td>${badge}</td></tr>`;
                        }).join('')}
                    </tbody>
                </table>`;
        }
    }

    function renderStats() {
        const history = typeof getHistory === 'function' ? getHistory() : [];
        const root = document.getElementById('stats-root');
        if (!root) return;

        if (history.length === 0) {
            root.innerHTML = '<p style="color:var(--text-secondary);text-align:center;margin-top:4rem;">Aún no hay historial de exámenes disponible.</p>';
            return;
        }

        const bySubject = {};
        history.forEach(e => {
            if (!bySubject[e.subjectId]) bySubject[e.subjectId] = { name: e.subjectName.replace(/ \(T\d+\)$/, ''), exams: [] };
            bySubject[e.subjectId].exams.push(e);
        });

        let html = '<div class="stats-grid-full">';
        Object.entries(bySubject).forEach(([sid, data]) => {
            const subject = (window.APP_STATE?.subjects || []).find(s => s.id === sid);
            const avg = data.exams.reduce((s, e) => s + e.score, 0) / data.exams.length;
            const best = Math.max(...data.exams.map(e => e.score));
            const worst = Math.min(...data.exams.map(e => e.score));
            const totalAciertos = data.exams.reduce((s, e) => s + e.aciertos, 0);
            const totalErrores = data.exams.reduce((s, e) => s + e.errores, 0);
            const totalPreguntas = data.exams.reduce((s, e) => s + e.total, 0);
            const pctAciertos = totalPreguntas > 0 ? ((totalAciertos / totalPreguntas) * 100).toFixed(1) : 0;
            const color = subject?.color || '#6366f1';
            const passedCount = data.exams.filter(e => e.score >= 5).length;

            html += `
            <div class="stats-subject-card">
                <div class="stats-card-header" style="border-left:4px solid ${color}">
                    <span style="font-size:1.5rem">${subject?.icon || '📚'}</span>
                    <div>
                        <h3>${AppHelpers.esc(subject?.name || data.name)}</h3>
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

    function clearHistory() {
        if (!confirm('¿Estás seguro de que quieres borrar todo el historial de exámenes? Esta acción no se puede deshacer.')) return;
        if (typeof Sync !== 'undefined') {
            Sync.set('exam_history_v2', []);
        } else {
            localStorage.setItem('exam_history_v2', '[]');
        }
        if (typeof Toast !== 'undefined') Toast.info('Historial de exámenes reiniciado');
        renderProgress();
    }

    return {
        renderProgress,
        renderStats,
        clearHistory
    };
})();

// Adaptadores globales
function renderProgress() { LearningStats.renderProgress(); }
function renderStats() { LearningStats.renderStats(); }
function clearHistory() { LearningStats.clearHistory(); }

if (typeof window !== 'undefined') {
    window.LearningStats = LearningStats;
    window.renderProgress = renderProgress;
    window.renderStats = renderStats;
    window.clearHistory = clearHistory;
}
