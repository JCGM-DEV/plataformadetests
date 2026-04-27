/**
 * AI SERVICE — Soporte Multi-IA (Gemini & Grok)
 */

const AI_CONFIG = {
    provider: localStorage.getItem('prog_ai_provider') || 'gemini',
    apiKey: localStorage.getItem('prog_ai_key') || '',
    geminiModel: 'gemini-1.5-flash',
    grokModel: 'grok-beta',
    geminiEndpoint: 'https://generativelanguage.googleapis.com/v1/models/',
    grokEndpoint: 'https://api.x.ai/v1/chat/completions'
};

async function callAI(prompt) {
    if (!AI_CONFIG.apiKey) {
        throw new Error(`No se ha configurado la API Key de ${AI_CONFIG.provider.toUpperCase()}.`);
    }

    if (AI_CONFIG.provider === 'gemini') {
        return await callGemini(prompt);
    } else {
        return await callGrok(prompt);
    }
}

async function callGemini(prompt) {
    // Usamos v1 para mayor estabilidad según reportes
    const url = `${AI_CONFIG.geminiEndpoint}${AI_CONFIG.geminiModel}:generateContent?key=${AI_CONFIG.apiKey}`;
    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }]
        })
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || 'Error en Gemini API');
    }

    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
}

async function callGrok(prompt) {
    const response = await fetch(AI_CONFIG.grokEndpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${AI_CONFIG.apiKey}`
        },
        body: JSON.stringify({
            model: AI_CONFIG.grokModel,
            messages: [
                { role: "system", content: "Eres un profesor de programación experto en Java." },
                { role: "user", content: prompt }
            ],
            stream: false,
            temperature: 0.7
        })
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || 'Error en Grok API (xAI)');
    }

    const data = await response.json();
    return data.choices[0].message.content;
}

async function getAIFeedback(context, code) {
    const prompt = `
Eres un profesor de programación experto en Java para alumnos de DAW. 
Corrige el siguiente código para un examen práctico.

CONTEXTO:
- Ejercicio: ${context.titulo}
- Enunciado: ${context.enunciado}
- Criterios: ${context.criterios.join(', ')}

CÓDIGO DEL ALUMNO:
\`\`\`java
${code}
\`\`\`

RESPUESTA (Markdown):
1. Evaluación general.
2. Lista de errores detectados (Lógica, Sintaxis, POO).
3. Consejo de supervivencia.
`;

    return await callAI(prompt);
}

function openSettings() {
    const currentKey = localStorage.getItem('prog_ai_key') || '';
    const currentProvider = localStorage.getItem('prog_ai_provider') || 'gemini';
    
    const modalContent = document.getElementById('modal-content');
    modalContent.innerHTML = `
        <h3>⚙️ Configuración del Tutor IA</h3>
        <div style="margin-bottom:1.5rem">
            <label style="display:block;font-size:0.8rem;color:var(--text2);margin-bottom:0.5rem">Proveedor de IA:</label>
            <select id="settings-provider" onchange="updateProviderHint()" style="width:100%;padding:0.7rem;background:var(--bg3);border:1px solid var(--border);border-radius:8px;color:var(--text)">
                <option value="gemini" ${currentProvider === 'gemini' ? 'selected' : ''}>Google Gemini (Recomendado)</option>
                <option value="grok" ${currentProvider === 'grok' ? 'selected' : ''}>xAI Grok (Beta)</option>
            </select>
        </div>
        <div style="margin-bottom:1rem">
            <label id="label-api-key" style="display:block;font-size:0.8rem;color:var(--text2);margin-bottom:0.5rem">API KEY:</label>
            <input type="password" id="settings-api-key" value="${currentKey}" placeholder="Pega tu clave aquí..." 
                style="width:100%;padding:0.7rem;background:var(--bg3);border:1px solid var(--border);border-radius:8px;color:var(--text)">
        </div>
        <div id="provider-hint" style="font-size:0.75rem;color:var(--text2);margin-bottom:1.5rem;padding:0.75rem;background:rgba(255,255,255,0.03);border-radius:6px">
            <!-- Dinámico -->
        </div>
        <div style="display:flex;gap:1rem">
            <button class="btn-primary" onclick="saveSettings()">Guardar Cambios</button>
            <button class="btn-secondary" onclick="closeModal()">Cancelar</button>
        </div>
    `;
    updateProviderHint();
    document.getElementById('modal-overlay').classList.remove('hidden');
}

function updateProviderHint() {
    const p = document.getElementById('settings-provider').value;
    const hint = document.getElementById('provider-hint');
    if (p === 'gemini') {
        hint.innerHTML = 'Consigue tu clave gratis en <a href="https://aistudio.google.com/app/apikey" target="_blank" style="color:var(--accent)">Google AI Studio</a>. Usaremos Gemini 1.5 Flash.';
    } else {
        hint.innerHTML = 'Requiere una cuenta en <a href="https://console.x.ai/" target="_blank" style="color:var(--accent)">xAI Console</a>. Usaremos Grok-beta.';
    }
}

function saveSettings() {
    const provider = document.getElementById('settings-provider').value;
    const key = document.getElementById('settings-api-key').value.trim();
    
    localStorage.setItem('prog_ai_provider', provider);
    localStorage.setItem('prog_ai_key', key);
    
    AI_CONFIG.provider = provider;
    AI_CONFIG.apiKey = key;
    
    showToast('Configuración actualizada', 'success');
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
        showToast('Escribe algo de código primero', 'info');
        return;
    }

    const btn = document.getElementById('btn-ai-help');
    const originalText = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = '<span>⏳ Consultando...</span>';

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
        <div style="display:flex;align-items:center;gap:1rem;margin-bottom:1rem;border-bottom:1px solid var(--border);padding-bottom:1rem">
            <div style="font-size:2rem">🎓</div>
            <div>
                <h3 style="margin:0">Revisión del Profesor IA</h3>
                <small style="color:var(--text2)">Proveedor: ${AI_CONFIG.provider.toUpperCase()}</small>
            </div>
        </div>
        <div style="line-height:1.6;font-size:0.9rem">
            ${parseMarkdown(markdown)}
        </div>
        <div style="margin-top:1.5rem;text-align:right">
            <button class="btn-secondary" onclick="closeModal()">Cerrar</button>
        </div>
    `;
    document.getElementById('modal-overlay').classList.remove('hidden');
}

function parseMarkdown(text) {
    if (!text) return '';
    return text
        .replace(/### (.*)/g, '<h4 style="color:var(--accent);margin:1rem 0 0.5rem">$1</h4>')
        .replace(/\*\*(.*)\*\*/g, '<strong>$1</strong>')
        .replace(/\n/g, '<br>')
        .replace(/^- (.*)/gm, '<li style="margin-left:1rem">$1</li>')
        .replace(/```java([\s\S]*?)```/g, '<div class="code-block" style="background:#0c1e2e;padding:1rem;border-radius:8px;font-size:0.8rem">$1</div>')
        .replace(/`([^`]+)`/g, '<code style="background:rgba(255,255,255,0.1);padding:0 4px;border-radius:4px">$1</code>');
}
