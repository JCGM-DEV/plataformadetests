// ═══════════════════════════════════════════════════════════════
//  TechAssistant IA — Tutor Inteligente de 1º DAW
// ═══════════════════════════════════════════════════════════════

const ASSISTANT_KNOWLEDGE = {
    "examenes": {
        keywords: ["examen", "test", "simulacro", "puntuación", "penalización", "duración", "puntos"],
        answer: "Los simulacros son clave. Recuerda: en Programación 2 mal restan 1 bien (-0.5 cada una). En el resto de materias, intentamos seguir esa misma lógica de rigor. ¡Omitir preguntas es una gran estrategia!",
        actions: [{ label: "Hacer Simulacro", cmd: "switchDash('simulacros')" }]
    },
    "libreta": {
        keywords: ["libreta", "errores", "anotar", "notas", "repaso", "oro", "fichaje"],
        answer: "Tu <b>Libreta de Errores</b> contiene todo lo que has fallado. Es el lugar donde más se aprende. Puedes añadir notas a cada fallo para no volver a cometerlo.",
        actions: [{ label: "Abrir Libreta", cmd: "openLibreta()" }]
    },
    "progreso": {
        keywords: ["gráfica", "nota", "media", "evolución", "cuántos", "estadísticas"],
        answer: "En la sección de <b>Progreso</b> verás tu curva de aprendizaje. Si la curva sube, vas por buen camino. Una media de 7 es el objetivo ideal para ir tranquilo al examen.",
        actions: [{ label: "Ver Gráficos", cmd: "showView('stats')" }]
    },
    "labs": {
        keywords: ["lab", "laboratorio", "práctica", "interactivo", "java", "sql", "uml", "probar"],
        answer: "Los <b>Laboratorios</b> son para 'ensuciarse las manos'. Si te cuesta la teoría de SQL o Java, vete al Lab y escribe código real. ¡Es la mejor forma de entenderlo!",
        actions: [{ label: "Ir a Labs", cmd: "switchDash('labs')" }]
    }
};

const CONSEJOS_GENERALES = [
    "No intentes hacer 100 tests al día. Haz 2 pero revisa cada fallo en profundidad.",
    "La Libreta de Errores es tu mejor amiga. Repásala 10 minutos antes de dormir.",
    "Si fallas mucho en un tema, para y vuelve a leer el resumen PDF.",
    "En el examen real, si dudas mucho en una, ¡pasa a la siguiente! No regales puntos.",
    "Usa los Laboratorios para visualizar lo que estudias en teoría."
];

function toggleAssistant() {
    const window = document.getElementById('assistant-container');
    const isHidden = window.classList.contains('hidden');
    window.classList.toggle('hidden');
    
    if (isHidden && document.getElementById('assistant-messages').children.length === 0) {
        showInitialSummary();
    }
}

function showInitialSummary() {
    addMessage("bot", "¡Hola! Soy tu tutor IA. He analizado tu estado actual...");
    
    setTimeout(() => {
        const stats = getAiInsights();
        let summary = `<b>📋 Tu estado actual:</b><br>`;
        summary += `• Media Global: <b>${stats.avg.toFixed(2)}</b><br>`;
        summary += `• Punto débil: <b>${stats.weakestSubject || 'Ninguno aún'}</b><br>`;
        summary += `• Fallos en libreta: <b>${stats.libCount}</b><br>`;
        
        if (stats.today) summary += `<br>🎯 Hoy te toca: <b>${stats.today.labels.join(', ')}</b>.`;
        
        addMessage("system", summary);
        
        addActions([
            { label: "📉 Ver mi progreso", query: "como voy" },
            { label: "💡 Dame un consejo", query: "consejo" },
            { label: "📚 ¿Qué estudio ahora?", query: "mejorar" }
        ]);
    }, 500);
}

function getAiInsights() {
    const history = typeof getHistory === 'function' ? getHistory() : [];
    const lib = typeof getLibreta === 'function' ? getLibreta() : {};
    const libCount = Object.values(lib).reduce((s,a)=>s+a.length,0);
    const today = typeof getDailySubjects === 'function' ? getDailySubjects() : null;
    
    const avg = history.length > 0 ? history.reduce((s, e) => s + e.score, 0) / history.length : 0;
    
    // Encontrar asignatura con más fallos
    const fallosBySub = {};
    history.forEach(h => {
        if (!fallosBySub[h.subjectName]) fallosBySub[h.subjectName] = 0;
        fallosBySub[h.subjectName] += h.errores;
    });
    const weakestSubject = Object.entries(fallosBySub).sort((a,b) => b[1] - a[1])[0]?.[0];

    return { avg, weakestSubject, libCount, today, history };
}

function handleAssistantQuery(query) {
    const q = query.toLowerCase();
    const stats = getAiInsights();
    
    // 1. Detección Inteligente de Intenciones
    
    // ¿Cómo voy? / Rendimiento
    if (q.includes("como voy") || q.includes("mi estado") || q.includes("mi nota") || q.includes("rendimiento")) {
        let resp = `Analizando tus <b>${stats.history.length} exámenes</b> realizados...<br><br>`;
        if (stats.history.length === 0) {
            resp += "Aún no tengo datos suficientes. ¡Haz un simulacro para que pueda decirte cómo vas!";
        } else {
            resp += `Tienes una media de <b>${stats.avg.toFixed(2)}</b>. `;
            if (stats.avg >= 7) resp += "¡Vas genial! Sigue así. 🚀";
            else if (stats.avg >= 5) resp += "Estás aprobado, pero hay margen de mejora. 💪";
            else resp += "Estás por debajo del 5. Necesitamos reforzar la base. ⚠️";
            
            if (stats.weakestSubject) {
                resp += `<br><br>Donde más estás sufriendo es en <b>${stats.weakestSubject}</b>. Deberías dedicarle un rato extra hoy.`;
            }
        }
        addMessage("bot", resp);
        addActions([{ label: "Ver Gráfica", cmd: "showView('stats')" }]);
        return;
    }

    // ¿Qué estudio? / Mejorar
    if (q.includes("mejorar") || q.includes("estudio") || q.includes("hago") || q.includes("tarea")) {
        let resp = "Mi consejo para tu sesión actual:<br><br>";
        if (stats.today) {
            resp += `• Según tu plan, hoy toca: <b>${stats.today.labels.join(', ')}</b>.<br>`;
        }
        if (stats.libCount > 5) {
            resp += `• Tienes muchos fallos acumulados (<b>${stats.libCount}</b>). Te sugiero limpiar la libreta antes de nuevos tests.<br>`;
        }
        if (stats.weakestSubject) {
            resp += `• Refuerza <b>${stats.weakestSubject}</b>. Haz un test de solo 10 preguntas para coger confianza.<br>`;
        }
        resp += "• No olvides los <b>Laboratorios</b> si te atascas con la sintaxis.";
        addMessage("bot", resp);
        addActions([
            { label: "Ver Temario PDF", cmd: "switchDash('temario')" },
            { label: "Limpiar Libreta", cmd: "openLibreta()" }
        ]);
        return;
    }

    // Consejos
    if (q.includes("consejo") || q.includes("ayuda") || q.includes("tip")) {
        const advice = CONSEJOS_GENERALES[Math.floor(Math.random() * CONSEJOS_GENERALES.length)];
        addMessage("bot", `💡 <b>Tip del Tutor:</b><br>${advice}`);
        return;
    }

    // 2. Fallback a base de conocimientos fija
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
        addMessage("bot", "No estoy seguro de entenderte, pero puedo ayudarte con tu <b>progreso</b>, darte un <b>consejo</b> de estudio o decirte <b>qué mejorar</b> hoy.");
        addActions([
            { label: "📉 Ver mi progreso", query: "como voy" },
            { label: "💡 Dame un consejo", query: "consejo" },
            { label: "📚 ¿Qué mejorar?", query: "mejorar" }
        ]);
    }
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
            chip.onclick = () => { eval(a.cmd); };
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
    
    setTimeout(() => {
        handleAssistantQuery(val);
    }, 400);
}

document.addEventListener('DOMContentLoaded', () => {
    if (!sessionStorage.getItem('assistant_welcome')) {
        setTimeout(() => {
            toggleAssistant();
            sessionStorage.setItem('assistant_welcome', 'true');
        }, 2000);
    }
});
