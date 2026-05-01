/**
 * AI SERVICE — PROG Lab
 * Sistema de triple intento para máxima compatibilidad
 */

const AI_CONFIG = {
    apiKey: (localStorage.getItem('prog_ai_key') || '').trim(),
    endpoint: 'https://generativelanguage.googleapis.com/v1beta/models/'
};

const MODELS_TO_TRY = ['gemini-1.5-flash-latest', 'gemini-1.5-pro-latest', 'gemini-pro'];

async function callAI(prompt) {
    if (!AI_CONFIG.apiKey) throw new Error('API Key no configurada.');

    let lastError = null;

    for (const modelName of MODELS_TO_TRY) {
        try {
            console.log(`[PROG-AI] Intentando con modelo: ${modelName}...`);
            const url = `${AI_CONFIG.endpoint}${modelName}:generateContent?key=${AI_CONFIG.apiKey}`;
            
            const res = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
            });

            if (res.ok) {
                const data = await res.json();
                if (data.candidates && data.candidates[0].content) {
                    return data.candidates[0].content.parts[0].text;
                }
            } else {
                const errJson = await res.json();
                lastError = errJson.error?.message || `HTTP ${res.status}`;
            }
        } catch (e) {
            lastError = e.message;
        }
    }
    throw new Error(lastError);
}

async function requestAIFeedback(ejId, isTutor = false) {
    // ... lógica de obtención de ejercicio simplificada para el retry ...
    let code = document.getElementById('ej-input')?.value || document.getElementById('exam-code-input')?.value || '';
    if (!code.trim()) return showToast('Escribe código', 'info');

    const btn = document.getElementById('btn-ai-help');
    const orig = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = '⏳ Consultando IA...';

    try {
        const feedback = await callAI(`Eres un profesor de Java. Corrige este código DAW: \n${code}`);
        showAIModalFeedback(feedback);
    } catch (err) {
        showToast(`Error: ${err.message}`, 'error');
        showAIModalFeedback(`### ❌ Error de conexión\nNo se pudo contactar con Gemini tras probar 3 modelos.\nError: ${err.message}`);
    } finally {
        btn.disabled = false;
        btn.innerHTML = orig;
    }
}

function showAIModalFeedback(markdown) {
    const modalContent = document.getElementById('modal-content');
    modalContent.innerHTML = `<div style="padding:1rem"><h3>🎓 Revisión IA</h3><div style="line-height:1.6;font-size:0.9rem">${markdown.replace(/\n/g, '<br>')}</div><button class="btn-secondary" onclick="closeModal()" style="margin-top:1rem">Cerrar</button></div>`;
    document.getElementById('modal-overlay').classList.remove('hidden');
}

function openSettings() {
    const key = localStorage.getItem('prog_ai_key') || '';
    const modalContent = document.getElementById('modal-content');
    modalContent.innerHTML = `<h3>⚙️ Ajustes IA</h3><input type="password" id="settings-api-key" value="${key}" placeholder="AIza..." style="width:100%;padding:.7rem;margin:1rem 0;background:var(--bg3);color:var(--text);border:1px solid var(--border);border-radius:8px"><button class="btn-primary" onclick="saveSettings()">Guardar</button>`;
    document.getElementById('modal-overlay').classList.remove('hidden');
}

function saveSettings() {
    const key = document.getElementById('settings-api-key').value.trim();
    localStorage.setItem('prog_ai_key', key);
    AI_CONFIG.apiKey = key;
    showToast('Guardado', 'success');
    closeModal();
}
