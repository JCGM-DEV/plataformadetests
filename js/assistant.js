// ═══════════════════════════════════════════════════════════════
//  TechAssistant IA — Cerebro del Asistente del Alumno
// ═══════════════════════════════════════════════════════════════

const ASSISTANT_KNOWLEDGE = {
    "examenes": {
        keywords: ["examen", "test", "simulacro", "puntuación", "penalización", "duración"],
        answer: "Los exámenes pueden ser de dos tipos: <b>Temario</b> (basados en los manuales) o <b>Simulacros</b> (preguntas aleatorias). En el modo tipo examen, cada 2 fallos restan 1 acierto (programación) o cada 3 fallos restan 1 acierto (resto). Los saltos no penalizan.",
        actions: [{ label: "Empezar Simulacro", cmd: "startExam('programacion')" }]
    },
    "libreta": {
        keywords: ["libreta", "errores", "anotar", "notas", "repaso", "oro"],
        answer: "La <b>Libreta de Errores</b> es tu herramienta más potente. Cada fallo se guarda automáticamente para que puedas añadir una nota sobre por qué fallaste. Puedes exportarla en Markdown para repasarla antes del examen.",
        actions: [{ label: "Abrir Libreta", cmd: "openLibreta()" }]
    },
    "progreso": {
        keywords: ["progreso", "gráfica", "nota", "media", "evolución", "cuántos"],
        answer: "Puedes ver tu evolución en la sección de <b>Progreso</b>. La gráfica muestra tu nota media por asignatura. ¡Intenta mantener una media superior a 7 para asegurar el aprobado!",
        actions: [{ label: "Ver Estadísticas", cmd: "showView('stats')" }]
    },
    "labs": {
        keywords: ["lab", "laboratorio", "práctica", "interactivo", "java", "sql", "uml"],
        answer: "Los <b>Laboratorios</b> son entornos prácticos donde puedes probar código Java, consultas SQL o diagramas UML de forma interactiva con corrección inmediata.",
        actions: [{ label: "Abrir Labs", cmd: "goToLabs()" }]
    },
    "saltar": {
        keywords: ["saltar", "omitir", "pregunta", "no sé"],
        answer: "Si no sabes una respuesta, usa el botón <b>Saltar</b>. Las preguntas omitidas no restan puntos, lo cual es estratégico para evitar penalizaciones.",
    }
};

const SALUDOS = ["¡Hola! Soy tu asistente de TechHub. ¿En qué puedo ayudarte hoy?", "¡Hola! ¿Listo para otra sesión de estudio?", "Aquí estoy para resolver tus dudas sobre la plataforma."];

function toggleAssistant() {
    const window = document.getElementById('assistant-container');
    const isHidden = window.classList.contains('hidden');
    window.classList.toggle('hidden');
    
    if (isHidden && document.getElementById('assistant-messages').children.length === 0) {
        showInitialSummary();
    }
}

function showInitialSummary() {
    addMessage("bot", SALUDOS[Math.floor(Math.random() * SALUDOS.length)]);
    
    // Generar resumen inteligente
    setTimeout(() => {
        const days = typeof getDaysToExam === 'function' ? getDaysToExam() : 'X';
        const lib = typeof getLibreta === 'function' ? getLibreta() : {};
        const libCount = Object.values(lib).reduce((s,a)=>s+a.length,0);
        const today = typeof getDailySubjects === 'function' ? getDailySubjects() : null;
        
        let summary = `<b>📋 Resumen de Hoy:</b><br>`;
        summary += `• Quedan <b>${days} días</b> para el examen (16 Mayo).<br>`;
        summary += `• Tienes <b>${libCount} fallos</b> en tu libreta por repasar.<br>`;
        
        // Cargar última actividad
        if (typeof getActivityLog === 'function') {
            const log = getActivityLog();
            if (log.length > 0) {
                const last = log[0];
                summary += `• Último paso: <b>${last.title}</b> (${last.detail})<br>`;
            }
        }

        if (today) summary += `• Hoy toca: <b>${today.labels.join(', ')}</b>.`;
        
        addMessage("system", summary);
        
        // Sugerencias rápidas
        const actions = [
            { label: "💡 ¿Cómo funciona la libreta?", query: "libreta" },
            { label: "🎯 ¿Cómo es el examen?", query: "examen" },
            { label: "🧪 Ir a laboratorios", query: "labs" }
        ];
        addActions(actions);
    }, 500);
}

function addMessage(sender, text) {
    const container = document.getElementById('assistant-messages');
    const div = document.createElement('div');
    div.className = `msg msg-${sender}`;
    div.innerHTML = text;
    container.appendChild(div);
    container.scrollTop = container.scrollHeight;
}

function addActions(actions) {
    const container = document.getElementById('assistant-messages');
    const div = document.createElement('div');
    div.className = 'assistant-actions';
    actions.forEach(a => {
        const chip = document.createElement('div');
        chip.className = 'assist-chip';
        chip.textContent = a.label;
        if (a.cmd) {
            chip.onclick = () => { eval(a.cmd); toggleAssistant(); };
        } else if (a.query) {
            chip.onclick = () => { handleAssistantQuery(a.query); };
        }
        div.appendChild(chip);
    });
    container.appendChild(div);
    container.scrollTop = container.scrollHeight;
}

async function sendAssistantMessage() {
    const input = document.getElementById('assistant-input');
    const val = input.value.trim();
    if (!val) return;
    
    addMessage("user", val);
    input.value = '';
    
    // Simular "pensando"
    setTimeout(() => {
        handleAssistantQuery(val);
    }, 400);
}

function handleAssistantQuery(query) {
    const q = query.toLowerCase();
    let found = false;
    
    for (const [key, data] of Object.entries(ASSISTANT_KNOWLEDGE)) {
        if (data.keywords.some(k => q.includes(k))) {
            addMessage("bot", data.answer);
            if (data.actions) addActions(data.actions);
            found = true;
            break;
        }
    }
    
    if (!found) {
        addMessage("bot", "No estoy seguro de entenderte. ¿Te refieres a los <b>exámenes</b>, la <b>libreta</b> de errores, tu <b>progreso</b> o los <b>laboratorios</b>?");
        addActions([
            { label: "Exámenes", query: "examen" },
            { label: "Libreta", query: "libreta" },
            { label: "Labs", query: "labs" }
        ]);
    }
}

// Inicializar FAB state si es necesario
document.addEventListener('DOMContentLoaded', () => {
    // Podríamos abrirlo automáticamente tras 2 segundos si es la primera vez en la sesión
    if (!sessionStorage.getItem('assistant_welcome')) {
        setTimeout(() => {
            toggleAssistant();
            sessionStorage.setItem('assistant_welcome', 'true');
        }, 2000);
    }
});
