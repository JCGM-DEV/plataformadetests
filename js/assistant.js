/**
 * assistant.js - TechAssistant IA
 * Asistente pedagógico inteligente y contextual para estudiantes de DAW.
 * Implementa despacho seguro de acciones (sin eval) y análisis reactivo del progreso.
 */

const TechAssistant = (() => {
    const KNOWLEDGE_BASE = {
        "examenes": {
            keywords: ["examen", "test", "simulacro", "puntuación", "penalización", "duración", "puntos"],
            answer: "Los simulacros son clave. Recuerda: en Programación 2 fallos restan 1 acierto (-0.5 cada una). En el resto de materias, la penalización estándar es -0.33 pts por error. ¡Omitir preguntas dudosas es una estrategia inteligente!",
            action: { label: "Hacer Simulacro", command: "switchDash", arg: "academia" }
        },
        "libreta": {
            keywords: ["libreta", "errores", "anotar", "notas", "repaso", "oro", "fichaje"],
            answer: "Tu <b>Libreta de Errores</b> reúne cada fallo cometido. Es el núcleo donde más se consolida el aprendizaje. Puedes añadir notas explicativas a cada fallo para no volver a tropezar.",
            action: { label: "Abrir Libreta", command: "openLibreta" }
        },
        "progreso": {
            keywords: ["gráfica", "nota", "media", "evolución", "cuántos", "estadísticas"],
            answer: "En la sección de <b>Progreso</b> verás tu curva de aprendizaje y evolución. Mantener una media superior a 7 te dará gran tranquilidad de cara a las pruebas oficiales.",
            action: { label: "Ver Estadísticas", command: "showView", arg: "stats" }
        },
        "labs": {
            keywords: ["lab", "laboratorio", "práctica", "interactivo", "java", "sql", "uml", "probar", "código"],
            answer: "Los <b>Laboratorios</b> están pensados para entrenar la sintaxis y resolver problemas reales de JavaScript, Python y PHP con feedback automatizado.",
            action: { label: "Ir al Taller de Código", command: "switchDash", arg: "lab" }
        }
    };

    const CONSEJOS_GENERALES = [
        "No intentes hacer 100 tests al día sin reflexionar. Realiza 2 y revisa cada fallo minuciosamente.",
        "La Libreta de Errores es tu mejor aliada. Repásala 15 minutos al final del día.",
        "Si detectas fallos reiterados en un tema, detén los tests y consulta el resumen o video correspondiente.",
        "En el examen real, si dudas excesivamente en una pregunta, pasa a la siguiente; una respuesta errónea penaliza.",
        "Aprovecha el Taller de Código para afianzar conceptos abstractos de programación."
    ];

    // Despachador seguro de comandos (Sustituye a eval)
    const COMMAND_DISPATCHER = {
        switchDash: (section) => {
            if (typeof switchDash === 'function') switchDash(section || 'overview');
        },
        openLibreta: () => {
            if (typeof openLibreta === 'function') openLibreta();
        },
        showView: (view) => {
            if (typeof showView === 'function') showView(view || 'dashboard');
        }
    };

    function executeCommand(commandName, arg) {
        const handler = COMMAND_DISPATCHER[commandName];
        if (typeof handler === 'function') {
            handler(arg);
        } else {
            console.warn('[TechAssistant] Comando no reconocido:', commandName);
        }
    }

    function getInsights() {
        const history = typeof getHistory === 'function' ? getHistory() : [];
        const lib = typeof getLibreta === 'function' ? getLibreta() : {};
        const libCount = Object.values(lib).reduce((sum, arr) => sum + (Array.isArray(arr) ? arr.length : 0), 0);
        const today = typeof getDailySubjects === 'function' ? getDailySubjects() : null;
        
        const avg = history.length > 0
            ? history.reduce((sum, exam) => sum + (exam.score || 0), 0) / history.length
            : 0;

        // Asignatura con mayor número acumulado de errores
        const errorMap = {};
        history.forEach(item => {
            const name = item.subjectName || 'General';
            errorMap[name] = (errorMap[name] || 0) + (item.errores || 0);
        });
        const weakestSubject = Object.entries(errorMap).sort((a, b) => b[1] - a[1])[0]?.[0];

        return { avg, weakestSubject, libCount, today, history };
    }

    function addMessage(sender, htmlContent) {
        const container = document.getElementById('assistant-messages');
        if (!container) return;
        const msgDiv = document.createElement('div');
        msgDiv.className = `msg msg-${sender}`;
        msgDiv.innerHTML = htmlContent;
        container.appendChild(msgDiv);
        container.scrollTop = container.scrollHeight;
    }

    function addActionButtons(actions) {
        const container = document.getElementById('assistant-messages');
        if (!container || !Array.isArray(actions)) return;

        const actionWrap = document.createElement('div');
        actionWrap.className = 'assistant-actions';

        actions.forEach(act => {
            const chip = document.createElement('div');
            chip.className = 'assist-chip';
            chip.textContent = act.label;

            chip.onclick = () => {
                if (act.command) {
                    executeCommand(act.command, act.arg);
                } else if (act.query) {
                    handleQuery(act.query);
                }
            };
            actionWrap.appendChild(chip);
        });

        container.appendChild(actionWrap);
        container.scrollTop = container.scrollHeight;
    }

    function handleQuery(queryText) {
        const query = queryText.toLowerCase().trim();
        const insights = getInsights();

        // 1. Detección por intención: Estado y Rendimiento
        if (query.includes('como voy') || query.includes('estado') || query.includes('nota') || query.includes('rendimiento')) {
            let reply = `He analizado tus <b>${insights.history.length} simulacros</b> realizados.<br><br>`;
            if (insights.history.length === 0) {
                reply += "Aún no disponemos de simulacros suficientes. ¡Completa tu primer test para calibrar el análisis!";
            } else {
                reply += `Tu nota media actual es de <b>${insights.avg.toFixed(2)} / 10</b>. `;
                if (insights.avg >= 7) reply += "¡Excelente nivel! Mantén este ritmo. 🚀";
                else if (insights.avg >= 5) reply += "Vas bien encaminado, pero conviene asegurar la materia clave. 💪";
                else reply += "Estamos por debajo del 5. Te aconsejo afianzar los conceptos fundamentales. ⚠️";

                if (insights.weakestSubject) {
                    reply += `<br><br>Asignatura con mayor margen de mejora: <b>${AppHelpers.esc(insights.weakestSubject)}</b>.`;
                }
            }
            addMessage('bot', reply);
            addActionButtons([{ label: "Ver Estadísticas", command: "showView", arg: "stats" }]);
            return;
        }

        // 2. Recomendación de estudio
        if (query.includes('mejorar') || query.includes('estudio') || query.includes('hago') || query.includes('plan')) {
            let reply = "Plan recomendado para tu sesión actual:<br><br>";
            if (insights.today && insights.today.labels) {
                reply += `• Asignaturas según calendario: <b>${insights.today.labels.join(', ')}</b>.<br>`;
            }
            if (insights.libCount > 5) {
                reply += `• Acumulas <b>${insights.libCount} fallos</b> en la libreta. Limpia algunos antes de nuevos tests.<br>`;
            }
            if (insights.weakestSubject) {
                reply += `• Refuerzo focalizado en: <b>${AppHelpers.esc(insights.weakestSubject)}</b>.<br>`;
            }
            reply += "• Realiza retos en el <b>Taller de Código</b> para consolidar la práctica.";
            addMessage('bot', reply);
            addActionButtons([
                { label: "Ver Academia", command: "switchDash", arg: "academia" },
                { label: "Repasar Libreta", command: "openLibreta" }
            ]);
            return;
        }

        // 3. Consejos pedagógicos
        if (query.includes('consejo') || query.includes('ayuda') || query.includes('tip')) {
            const randomTip = CONSEJOS_GENERALES[Math.floor(Math.random() * CONSEJOS_GENERALES.length)];
            addMessage('bot', `💡 <b>Recomendación del Tutor:</b><br>${randomTip}`);
            return;
        }

        // 4. Búsqueda en base de conocimientos
        for (const data of Object.values(KNOWLEDGE_BASE)) {
            if (data.keywords.some(k => query.includes(k))) {
                addMessage('bot', data.answer);
                if (data.action) addActionButtons([data.action]);
                return;
            }
        }

        // Fallback conversacional
        addMessage('bot', "Puedo ayudarte a revisar tu <b>progreso</b>, recomendarte qué <b>estudiar hoy</b> o darte un <b>consejo</b>.");
        addActionButtons([
            { label: "📉 Mi progreso", query: "como voy" },
            { label: "💡 Dame un consejo", query: "consejo" },
            { label: "🎯 ¿Qué estudio hoy?", query: "mejorar" }
        ]);
    }

    function toggle() {
        const container = document.getElementById('assistant-container');
        if (!container) return;
        const isHidden = container.classList.contains('hidden');
        container.classList.toggle('hidden');

        if (isHidden && document.getElementById('assistant-messages')?.children.length === 0) {
            showInitialWelcome();
        }
    }

    function showInitialWelcome() {
        addMessage('bot', "¡Hola! Soy tu tutor asistente. He preparado un resumen de tu actividad actual...");
        setTimeout(() => {
            const insights = getInsights();
            let summary = `<b>📋 Resumen Académico:</b><br>`;
            summary += `• Media General: <b>${insights.avg.toFixed(2)}</b><br>`;
            summary += `• Asignatura a reforzar: <b>${insights.weakestSubject || 'Ninguna identificada'}</b><br>`;
            summary += `• Fallos en libreta: <b>${insights.libCount}</b><br>`;
            if (insights.today && insights.today.labels) {
                summary += `<br>🎯 Recomendación para hoy: <b>${insights.today.labels.join(', ')}</b>.`;
            }
            addMessage('system', summary);
            addActionButtons([
                { label: "📉 Mi progreso", query: "como voy" },
                { label: "💡 Dame un consejo", query: "consejo" },
                { label: "🎯 ¿Qué estudiar?", query: "mejorar" }
            ]);
        }, 300);
    }

    async function sendMessage() {
        const input = document.getElementById('assistant-input');
        if (!input) return;
        const text = input.value.trim();
        if (!text) return;

        addMessage('user', AppHelpers.esc(text));
        input.value = '';

        setTimeout(() => {
            handleQuery(text);
        }, 300);
    }

    return {
        toggle,
        sendMessage,
        handleQuery
    };
})();

// Adaptadores globales para mantener interoperabilidad con HTML
function toggleAssistant() { TechAssistant.toggle(); }
function sendAssistantMessage() { TechAssistant.sendMessage(); }

document.addEventListener('DOMContentLoaded', () => {
    if (!sessionStorage.getItem('assistant_welcome')) {
        setTimeout(() => {
            TechAssistant.toggle();
            sessionStorage.setItem('assistant_welcome', 'true');
        }, 1800);
    }
});

if (typeof window !== 'undefined') {
    window.TechAssistant = TechAssistant;
    window.toggleAssistant = toggleAssistant;
    window.sendAssistantMessage = sendAssistantMessage;
}
