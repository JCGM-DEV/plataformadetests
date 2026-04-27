/**
 * AI SERVICE — Integración con Google Gemini API
 * Permite obtener feedback interactivo y corrección detallada.
 */

const AI_CONFIG = {
    apiKey: localStorage.getItem('prog_ai_key') || '',
    model: 'gemini-1.5-flash',
    endpoint: 'https://generativelanguage.googleapis.com/v1beta/models/'
};

async function callGemini(prompt) {
    if (!AI_CONFIG.apiKey) {
        throw new Error('No se ha configurado la API Key de Gemini.');
    }

    const url = `${AI_CONFIG.endpoint}${AI_CONFIG.model}:generateContent?key=${AI_CONFIG.apiKey}`;
    
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }]
            })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error?.message || 'Error en la llamada a la IA');
        }

        const data = await response.json();
        return data.candidates[0].content.parts[0].text;
    } catch (err) {
        console.error('AI Service Error:', err);
        throw err;
    }
}

async function getAIFeedback(context, code) {
    const prompt = `
Eres un profesor de programación experto en Java para alumnos de DAW (Desarrollo de Aplicaciones Web). 
Tu objetivo es corregir el código de un alumno para un examen práctico "en papel" (sin IDE).

CONTEXTO DEL EJERCICIO:
- Título: ${context.titulo}
- Enunciado: ${context.enunciado}
- Requisitos clave: ${context.criterios.join(', ')}

CÓDIGO DEL ALUMNO:
\`\`\`java
${code}
\`\`\`

INSTRUCCIONES DE CORRECCIÓN:
1. Sé constructivo y amable, pero riguroso (como un profesor real).
2. Detecta errores de lógica (p.ej. super() mal llamado, return types incorrectos).
3. Detecta errores de sintaxis comunes en Java.
4. Explica brevemente POR QUÉ es un error y cómo solucionarlo.
5. Da un consejo de "supervivencia" para el examen real.
6. Si el código es perfecto, felicítalo y dale un tip avanzado.

FORMATO DE RESPUESTA:
- Usa Markdown (negritas, listas, bloques de código).
- No seas excesivamente largo, ve al grano.
- Divide la respuesta en: 📝 Evaluación, ❌ Errores detectados (si hay) y 💡 Consejo del Profe.
`;

    return await callGemini(prompt);
}

function openSettings() {
    const currentKey = localStorage.getItem('prog_ai_key') || '';
    const modalContent = document.getElementById('modal-content');
    modalContent.innerHTML = `
        <h3>⚙️ Configuración del Tutor IA</h3>
        <p>Para usar el feedback interactivo, necesitas una API Key de Google Gemini (es gratuita para desarrolladores).</p>
        <div style="margin: 1rem 0">
            <label style="display:block;font-size:0.8rem;color:var(--text2);margin-bottom:0.5rem">API KEY de Gemini:</label>
            <input type="password" id="settings-api-key" value="${currentKey}" placeholder="Pega tu clave aquí..." 
                style="width:100%;padding:0.7rem;background:var(--bg3);border:1px solid var(--border);border-radius:8px;color:var(--text)">
        </div>
        <p style="font-size:0.75rem;color:var(--text2)">La clave se guarda localmente en tu navegador.</p>
        <div style="margin-top:1.5rem;display:flex;gap:1rem">
            <button class="btn-primary" onclick="saveSettings()">Guardar Configuración</button>
            <button class="btn-secondary" onclick="closeModal()">Cancelar</button>
        </div>
        <div style="margin-top:1.5rem;padding:1rem;background:rgba(255,255,255,0.03);border-radius:8px;font-size:0.8rem">
            <p>¿No tienes una? Consíguela gratis en <a href="https://aistudio.google.com/app/apikey" target="_blank" style="color:var(--accent)">Google AI Studio</a></p>
        </div>
    `;
    document.getElementById('modal-overlay').classList.remove('hidden');
}

function saveSettings() {
    const key = document.getElementById('settings-api-key').value.trim();
    localStorage.setItem('prog_ai_key', key);
    AI_CONFIG.apiKey = key;
    showToast('Configuración guardada correctamente', 'success');
    closeModal();
}

async function requestAIFeedback(ejId, isTutor = false) {
    let ej, code;
    
    if (isTutor) {
        const session = TUTOR_SESSIONS.find(s => s.id === tutorState.sessionId);
        if (tutorState.fase === 'examen') {
            ej = {
                titulo: session.examen.titulo,
                enunciado: session.examen.enunciado,
                criterios: session.examen.criterios.map(c => c.desc)
            };
            code = document.getElementById('exam-code-input')?.value || '';
        } else {
            const paso = session.pasos[tutorState.pasoActual];
            ej = {
                titulo: `Paso ${tutorState.pasoActual + 1}: ${paso.titulo}`,
                enunciado: paso.tareaGuiada.instruccion,
                criterios: paso.tareaGuiada.checks.map(c => c.desc)
            };
            code = document.getElementById('tutor-code-input')?.value || '';
        }
    } else {
        ej = EJERCICIOS.find(e => e.id === ejId);
        code = document.getElementById('ej-input')?.value || '';
    }
    
    if (!code.trim()) {
        showToast('Escribe algo de código antes de pedir ayuda al tutor', 'info');
        return;
    }

    const btn = document.getElementById('btn-ai-help');
    const originalText = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = '<span>⏳ Consultando al Profe...</span>';

    try {
        const feedback = await getAIFeedback(ej, code);
        showAIModalFeedback(feedback);
    } catch (err) {
        showToast(err.message, 'error');
    } finally {
        btn.disabled = false;
        btn.innerHTML = originalText;
    }
}

function showAIModalFeedback(markdown) {
    const modalContent = document.getElementById('modal-content');
    modalContent.innerHTML = `
        <div class="ai-feedback-header" style="display:flex;align-items:center;gap:1rem;margin-bottom:1.5rem;border-bottom:1px solid var(--border);padding-bottom:1rem">
            <div style="font-size:2.5rem">🎓</div>
            <div>
                <h3 style="margin:0">Revisión del Profesor IA</h3>
                <p style="margin:0;font-size:0.8rem;color:var(--text2)">Basado en los criterios del examen</p>
            </div>
        </div>
        <div class="ai-feedback-body" style="line-height:1.7;font-size:0.95rem">
            ${parseMarkdown(markdown)}
        </div>
        <div style="margin-top:2rem;display:flex;justify-content:flex-end">
            <button class="btn-secondary" onclick="closeModal()">Entendido, ¡gracias!</button>
        </div>
    `;
    document.getElementById('modal-overlay').classList.remove('hidden');
}

// Minimal markdown parser for the feedback
function parseMarkdown(text) {
    return text
        .replace(/### (.*)/g, '<h4 style="color:var(--accent);margin-top:1.5rem">$1</h4>')
        .replace(/\*\*(.*)\*\*/g, '<strong>$1</strong>')
        .replace(/\n\n/g, '<br><br>')
        .replace(/^- (.*)/gm, '<li style="margin-bottom:0.5rem">$1</li>')
        .replace(/```java\n([\s\S]*?)```/g, '<div class="code-block" style="font-size:0.8rem;background:#0c1e2e;padding:1rem;border-radius:8px">$1</div>')
        .replace(/`([^`]+)`/g, '<code style="background:rgba(255,255,255,0.1);padding:0.1rem 0.3rem;border-radius:4px;color:var(--accent3)">$1</code>');
}
