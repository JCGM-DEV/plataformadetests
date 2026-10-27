/**
 * helpers.js
 * Funciones puras y utilidades transversales para el motor de exámenes, fechas y formateo.
 */

const AppHelpers = {
    /**
     * Escapa caracteres especiales para inyección segura en HTML
     * @param {string} str
     * @returns {string}
     */
    esc(str) {
        if (!str) return '';
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    },

    /**
     * Algoritmo Fisher-Yates para barajar arrays sin mutar el original
     * @template T
     * @param {T[]} arr
     * @returns {T[]}
     */
    shuffleArray(arr) {
        if (!Array.isArray(arr)) return [];
        const copy = [...arr];
        for (let i = copy.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [copy[i], copy[j]] = [copy[j], copy[i]];
        }
        return copy;
    },

    /**
     * Selección aleatoria ponderada de preguntas excluyendo identificadores prohibidos
     * @param {Array} pool Colección de preguntas
     * @param {number} count Número requerido
     * @param {Set|Array} forbiddenIds Identificadores ya seleccionados
     * @returns {Array}
     */
    getSmartRandom(pool, count, forbiddenIds = []) {
        if (!Array.isArray(pool) || pool.length === 0) return [];
        const forbiddenSet = forbiddenIds instanceof Set ? forbiddenIds : new Set(forbiddenIds);
        const candidates = pool.filter(q => !forbiddenSet.has(q.concept_id || q.id));
        const shuffled = AppHelpers.shuffleArray(candidates.length >= count ? candidates : pool);
        return shuffled.slice(0, count);
    },

    /**
     * Calcula los días restantes hasta la fecha oficial de examen
     * @param {Date} [targetDate]
     * @returns {number}
     */
    getDaysToExam(targetDate = window.APP_CONFIG?.EXAM_DATE || new Date('2026-05-16T09:00:00')) {
        const now = new Date();
        const diff = targetDate.getTime() - now.getTime();
        return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
    },

    /**
     * Determina la fase activa del plan de estudio
     * @returns {Object}
     */
    getCurrentPhase() {
        const phases = window.APP_CONFIG?.STUDY_PHASES || [];
        const now = new Date();
        return phases.find(p => now >= p.start && now <= p.end) || phases[phases.length - 1] || { id: 1, name: 'Estudio Activo' };
    },

    /**
     * Formatea un punto de resumen destacando términos clave en negrita
     * @param {string} text
     * @returns {string}
     */
    formatSummaryPoint(text) {
        if (!text) return '';
        // Convierte texto antes de dos puntos en negrita
        const colonIndex = text.indexOf(':');
        if (colonIndex > 0 && colonIndex < 40) {
            const title = text.substring(0, colonIndex);
            const rest = text.substring(colonIndex + 1);
            return `<strong>${AppHelpers.esc(title)}:</strong> ${AppHelpers.esc(rest)}`;
        }
        return AppHelpers.esc(text);
    }
};

// Exposición global para interoperabilidad con plantillas y código existente
if (typeof window !== 'undefined') {
    window.AppHelpers = AppHelpers;
    window.esc = AppHelpers.esc;
    window.shuffleArray = AppHelpers.shuffleArray;
    window.getSmartRandom = AppHelpers.getSmartRandom;
    window.getDaysToExam = AppHelpers.getDaysToExam;
    window.getCurrentPhase = AppHelpers.getCurrentPhase;
}
