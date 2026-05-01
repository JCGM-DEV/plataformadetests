/**
 * AI SERVICE — LM Lab (HTML / XML / XSD / XSLT)
 * Sistema de triple intento para máxima compatibilidad
 */

const AI_CONFIG_LM = {
    apiKey: (localStorage.getItem('lm_ai_key') || '').trim(),
    endpoint: 'https://generativelanguage.googleapis.com/v1beta/models/'
};

// Modelos a probar en orden de preferencia
const MODELS_TO_TRY = ['gemini-1.5-flash-latest', 'gemini-1.5-pro-latest', 'gemini-pro'];

async function callAI_LM(prompt) {
    if (!AI_CONFIG_LM.apiKey) throw new Error('API Key no configurada.');

    let lastError = null;

    for (const modelName of MODELS_TO_TRY) {
        try {
            console.log(`[LM-AI] Intentando con modelo: ${modelName}...`);
            const url = `${AI_CONFIG_LM.endpoint}${modelName}:generateContent?key=${AI_CONFIG_LM.apiKey}`;
            
            const res = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
            });

            if (res.ok) {
                const data = await res.json();
                if (data.candidates && data.candidates[0].content) {
                    console.log(`[LM-AI] Éxito con ${modelName}`);
                    return data.candidates[0].content.parts[0].text;
                }
            } else {
                const errJson = await res.json();
                lastError = errJson.error?.message || `HTTP ${res.status}`;
                console.warn(`[LM-AI] Falló ${modelName}: ${lastError}`);
            }
        } catch (e) {
            lastError = e.message;
            console.warn(`[LM-AI] Error de red con ${modelName}: ${lastError}`);
        }
    }

    throw new Error(`Ningún modelo disponible funcionó. Último error: ${lastError}`);
}

async function getLMFeedback(context, code) {
    const prompt = `Profesor experto en LM (HTML/XML). Corrige este código DAW. Ejercicio: ${context.title}. Criterios: ${context.criteria.join(', ')}. Código: \n${code}`;
    return await callAI_LM(prompt);
}

async function requestLMAIFeedback() {
    if (!examState.labData) return;
    const ex = examState.labData.exercises[0];
    const code = document.getElementById('exam-input')?.value || '';
    if (!code.trim()) { showToast('Escribe código', 'info'); return; }

    const btn = document.getElementById('btn-lm-ai');
    const orig = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = '⏳ Probando modelos...';

    const context = {
        title: examState.labData.examTitle || ex.title,
        desc: examState.labData.examDesc || ex.desc || '',
        criteria: (ex.milestones || []).map(m => m.instruction || m.popup)
    };

    try {
        const feedback = await getLMFeedback(context, code);
        showLMFeedbackModal(feedback);
    } catch (err) {
        showToast(`IA falló: ${err.message}`, 'error');
        showLMFeedbackModal(getLMOfflineFeedback(context, code, err.message));
    } finally {
        btn.disabled = false;
        btn.innerHTML = orig;
    }
}

function getLMOfflineFeedback(context, code, errMsg) {
    return `### 🎓 Fallo en la IA\n\nEl sistema intentó usar varios modelos de Gemini pero todos devolvieron error:\n> **${errMsg}**\n\nRevisa tu API Key o intenta más tarde.`;
}

function showLMFeedbackModal(markdown) {
    const content = document.getElementById('modal-content');
    content.innerHTML = `<div style="padding:1rem"><h3>🎓 Revisión IA</h3><div style="line-height:1.6">${markdown.replace(/\n/g, '<br>')}</div><button class="btn-secondary" onclick="closeModal()" style="margin-top:1rem">Cerrar</button></div>`;
    document.getElementById('modal-overlay').classList.remove('hidden');
}

function openLMSettings() {
    const key = localStorage.getItem('lm_ai_key') || '';
    const content = document.getElementById('modal-content');
    content.innerHTML = `<h3>⚙️ Ajustes IA</h3><input type="password" id="lm-settings-key" value="${key}" placeholder="AIza..." style="width:100%;padding:.7rem;margin:1rem 0;background:var(--bg3);color:var(--text);border:1px solid var(--border);border-radius:8px"><button class="btn-primary" onclick="saveLMSettings()">Guardar</button>`;
    document.getElementById('modal-overlay').classList.remove('hidden');
}

function saveLMSettings() {
    const key = document.getElementById('lm-settings-key').value.trim();
    localStorage.setItem('lm_ai_key', key);
    AI_CONFIG_LM.apiKey = key;
    showToast('Guardado', 'success');
    closeModal();
}
