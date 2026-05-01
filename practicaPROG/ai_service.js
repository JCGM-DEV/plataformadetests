/**
 * AI SERVICE — LM & PROG (Universal)
 * Prueba combinaciones de Modelo + Versión de API hasta conectar.
 */

const AI_CONFIG = {
    apiKey: (localStorage.getItem('lm_ai_key') || localStorage.getItem('prog_ai_key') || '').trim(),
    baseUrl: 'https://generativelanguage.googleapis.com'
};

// Combinaciones a probar en orden de probabilidad de éxito
const COMBINATIONS = [
    { model: 'gemini-1.5-flash', version: 'v1beta' },
    { model: 'gemini-1.5-flash', version: 'v1' },
    { model: 'gemini-pro',       version: 'v1' },
    { model: 'gemini-1.5-pro',   version: 'v1beta' }
];

async function callAI_Universal(prompt) {
    if (!AI_CONFIG.apiKey) throw new Error('API Key no configurada.');

    let lastError = "";

    for (const combo of COMBINATIONS) {
        try {
            console.log(`[AI-HUB] Probando ${combo.model} en ${combo.version}...`);
            const url = `${AI_CONFIG.baseUrl}/${combo.version}/models/${combo.model}:generateContent?key=${AI_CONFIG.apiKey}`;
            
            const res = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
            });

            const data = await res.json();

            if (res.ok) {
                if (data.candidates && data.candidates[0].content) {
                    console.log(`[AI-HUB] ✅ Conectado con ${combo.model} (${combo.version})`);
                    return data.candidates[0].content.parts[0].text;
                }
            } else {
                lastError = data.error?.message || `Error ${res.status}`;
                console.warn(`[AI-HUB] ❌ ${combo.model}/${combo.version} falló: ${lastError}`);
            }
        } catch (e) {
            lastError = e.message;
            console.warn(`[AI-HUB] 🛑 Error de red: ${lastError}`);
        }
    }

    throw new Error(`Ninguna de las ${COMBINATIONS.length} combinaciones funcionó. Último error: ${lastError}`);
}

// ── Adaptadores para LM y PROG ───────────────────────────────────

async function requestLMAIFeedback() {
    const code = document.getElementById('exam-input')?.value || '';
    if (!code.trim()) return showToast('Escribe código', 'info');

    const btn = document.getElementById('btn-lm-ai');
    btn.disabled = true; btn.innerHTML = '⏳ Buscando canal...';

    try {
        const fb = await callAI_Universal(`Corrige este código HTML/XML para un examen DAW: \n${code}`);
        showLMFeedbackModal(fb);
    } catch (err) {
        showLMFeedbackModal(`### ❌ Error persistente\nNo se pudo conectar con ningún modelo de Gemini.\n\n**Detalle:** ${err.message}`);
    } finally {
        btn.disabled = false; btn.innerHTML = '✨ Pedir corrección IA';
    }
}

async function requestAIFeedback() {
    const code = document.getElementById('ej-input')?.value || document.getElementById('exam-code-input')?.value || '';
    if (!code.trim()) return showToast('Escribe código', 'info');

    const btn = document.getElementById('btn-ai-help');
    btn.disabled = true; btn.innerHTML = '⏳ Conectando...';

    try {
        const fb = await callAI_Universal(`Corrige este código Java para un examen DAW: \n${code}`);
        showAIModalFeedback(fb);
    } catch (err) {
        showAIModalFeedback(`### ❌ Error de API\n${err.message}`);
    } finally {
        btn.disabled = false; btn.innerHTML = '✨ Consultar al Profesor IA';
    }
}

// ── UI Helpers (Iguales que antes) ───────────────────────────────
function showLMFeedbackModal(markdown) {
    const content = document.getElementById('modal-content');
    content.innerHTML = `<div style="padding:1rem"><h3>🎓 Revisión IA</h3><div style="line-height:1.6;font-size:0.9rem">${markdown.replace(/\n/g, '<br>')}</div><button class="btn-secondary" onclick="closeModal()" style="margin-top:1rem">Cerrar</button></div>`;
    document.getElementById('modal-overlay').classList.remove('hidden');
}

function showAIModalFeedback(markdown) {
    const modalContent = document.getElementById('modal-content');
    modalContent.innerHTML = `<div style="padding:1rem"><h3>🎓 Revisión IA</h3><div style="line-height:1.6;font-size:0.9rem">${markdown.replace(/\n/g, '<br>')}</div><button class="btn-secondary" onclick="closeModal()" style="margin-top:1rem">Cerrar</button></div>`;
    document.getElementById('modal-overlay').classList.remove('hidden');
}

function openLMSettings() { openSettings(); }
function openSettings() {
    const key = localStorage.getItem('lm_ai_key') || localStorage.getItem('prog_ai_key') || '';
    const content = document.getElementById('modal-content');
    content.innerHTML = `<h3>⚙️ Ajustes IA</h3><input type="password" id="ai-key-input" value="${key}" placeholder="AIza..." style="width:100%;padding:.7rem;margin:1rem 0;background:var(--bg3);color:var(--text);border:1px solid var(--border);border-radius:8px"><button class="btn-primary" onclick="saveAISettings()">Guardar</button>`;
    document.getElementById('modal-overlay').classList.remove('hidden');
}

function saveAISettings() {
    const key = document.getElementById('ai-key-input').value.trim();
    localStorage.setItem('lm_ai_key', key);
    localStorage.setItem('prog_ai_key', key);
    AI_CONFIG.apiKey = key;
    showToast('Guardado', 'success');
    closeModal();
}
