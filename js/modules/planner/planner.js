/**
 * planner.js - Planificador Académico y Guía de Estudio
 * Gestiona el calendario de rotación de asignaturas, la cuenta regresiva oficial y el banner de estudio diario.
 */

const AcademicPlanner = (() => {
    function getDailySubjects(offsetDays = 0) {
        const now = new Date();
        if (offsetDays !== 0) {
            now.setDate(now.getDate() + offsetDays);
        }

        const dayOfWeek = now.getDay();
        // Domingo -> Día de descanso
        if (dayOfWeek === 0) {
            return { isRest: true, subjects: [], labels: ['Descanso'] };
        }

        const phase = AppHelpers.getCurrentPhase();
        const config = window.APP_CONFIG || {};
        const rotation = phase.id === 3
            ? (config.PHASE3_ROTATION || [])
            : (config.DAILY_ROTATION || []);

        let index = 0;
        switch (dayOfWeek) {
            case 1: index = 1; break; // Lunes -> Bases, Lenguajes
            case 2: index = 3; break; // Martes -> Empleabilidad
            case 3: index = 2; break; // Miércoles -> Entornos, Cloud
            case 4: index = 0; break; // Jueves -> Programación, Sistemas
            case 5: index = 1; break; // Viernes -> Bases, Lenguajes
            case 6: index = 0; break; // Sábado -> Programación, Sistemas
        }

        return rotation[index] || { isRest: false, subjects: [], labels: ['Repaso General'] };
    }

    function renderPlanner() {
        const container = document.getElementById('academic-planner-section');
        if (!container) return;

        const phase = AppHelpers.getCurrentPhase();
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
                    <div class="planner-phase-tag" style="--phase-bg: ${phase.colorSoft || 'rgba(59,130,246,0.1)'}; --phase-color: ${phase.color || '#3b82f6'}">
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
                                ` : (day.slot.subjects || []).map((subId) => {
                                    const sub = (window.APP_STATE?.subjects || []).find(s => s.id === subId) || { name: subId, icon: '📚', color: '#6366f1' };
                                    return `
                                    <div class="planner-subject-tag" style="--subj-color: ${sub.color}">
                                        <span class="tag-icon">${sub.icon}</span>
                                        <span class="tag-name">${sub.name}</span>
                                    </div>`;
                                }).join('')}
                            </div>
                        </div>`;
                    }).join('')}
                </div>
            </div>`;
    }

    function renderStudyGuide() {
        const container = document.getElementById('study-guide-banner');
        if (!container) return;

        const phase = AppHelpers.getCurrentPhase();
        const todaySlot = getDailySubjects();
        const daysLeft = AppHelpers.getDaysToExam();
        const config = window.APP_CONFIG || {};

        // Seleccionar consejo del día
        const daysSinceStart = Math.max(0, Math.floor((new Date() - (config.STUDY_START || new Date())) / (1000 * 60 * 60 * 24)));
        const tips = config.STRATEGIC_TIPS || [{ icon: '🎯', text: 'Entrena con rigor y analiza cada error.' }];
        const tip = tips[daysSinceStart % tips.length];

        const urgencyColor = daysLeft <= 7 ? '#ef4444' : daysLeft <= 21 ? '#f97316' : '#3b82f6';
        const urgencyText = daysLeft <= 7 ? '¡ÚLTIMA SEMANA!' : daysLeft <= 14 ? '¡SPRINT FINAL!' : 'Quedan';

        const libreta = typeof getLibreta === 'function' ? getLibreta() : {};
        const libretaCount = Object.values(libreta).reduce((sum, arr) => sum + (Array.isArray(arr) ? arr.length : 0), 0);

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
                    <span class="phase-icon">${phase.icon || '📖'}</span>
                    <div>
                        <div class="phase-name">${phase.name}</div>
                        <div class="phase-desc">${phase.desc || ''}</div>
                    </div>
                </div>

                <!-- Today's subjects -->
                <div class="study-today">
                    <div class="study-today-label">📅 HOY TOCA</div>
                    <div class="study-today-subjects">
                        ${(todaySlot.labels || []).map((label, idx) => `
                            <button class="study-subject-chip" onclick="AcademicPlanner.scrollToSubject('${todaySlot.subjects[idx] || ''}')">
                                ${label}
                            </button>`).join('')}
                    </div>
                    <div class="study-tasks-list">
                        ${(phase.dailyTasks || []).map(task => `<div>• ${task}</div>`).join('')}
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

                <!-- Strategic Tip -->
                <div class="study-tip-bar">
                    <span class="tip-icon">${tip.icon}</span>
                    <span class="tip-text">${tip.text}</span>
                </div>
            </div>`;
    }

    function scrollToSubject(id) {
        if (!id) return;
        if (typeof switchDash === 'function') switchDash('academia');
        setTimeout(() => {
            const card = document.getElementById(`subject-card-${id}`);
            if (card) {
                card.scrollIntoView({ behavior: 'smooth', block: 'center' });
                card.classList.add('highlight-pulse');
                setTimeout(() => card.classList.remove('highlight-pulse'), 2000);
            }
        }, 150);
    }

    return {
        getDailySubjects,
        renderPlanner,
        renderStudyGuide,
        scrollToSubject
    };
})();

// Adaptadores globales para plantillas HTML
function getDailySubjects(offset) { return AcademicPlanner.getDailySubjects(offset); }
function renderAcademicPlanner() { AcademicPlanner.renderPlanner(); }
function renderStudyGuide() { AcademicPlanner.renderStudyGuide(); }
function scrollToSubject(id) { AcademicPlanner.scrollToSubject(id); }

if (typeof window !== 'undefined') {
    window.AcademicPlanner = AcademicPlanner;
    window.getDailySubjects = getDailySubjects;
    window.renderAcademicPlanner = renderAcademicPlanner;
    window.renderStudyGuide = renderStudyGuide;
    window.scrollToSubject = scrollToSubject;
}
