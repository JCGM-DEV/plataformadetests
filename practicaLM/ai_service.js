/**
 * AI SERVICE — LM & PROG (Final Fix)
 */

const AI_CONFIG = {
    apiKey: (localStorage.getItem('lm_ai_key') || localStorage.getItem('prog_ai_key') || '').trim(),
    endpoint: 'https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent'
};

async function callAI_Universal(prompt) {
    if (!AI_CONFIG.apiKey) throw new Error('API Key no configurada.');

    const url = `${AI_CONFIG.endpoint}?key=${AI_CONFIG.apiKey}`;
    
    console.log('[AI-HUB] Intentando conexión directa...');

    const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }]
        })
    });

    const data = await res.json();

    if (res.ok) {
        return data.candidates[0].content.parts[0].text;
    } else {
        // Si v1 falla, intentamos v1beta como último recurso
        console.warn('[AI-HUB] v1 falló, intentando v1beta...');
        const urlBeta = url.replace('/v1/', '/v1beta/');
        const resBeta = await fetch(urlBeta, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
        });
        const dataBeta = await resBeta.json();
        if (resBeta.ok) return dataBeta.candidates[0].content.parts[0].text;
        
        throw new Error(dataBeta.error?.message || 'Error desconocido');
    }
}

// ── Adaptadores ──────────────────────────────────────────────────

async function requestLMAIFeedback() {
    const code = document.getElementById('exam-input')?.value || '';
    const btn = document.getElementById('btn-lm-ai');
    btn.disabled = true; btn.innerHTML = '⏳ Corrigiendo...';
    try {
        const fb = await callAI_Universal(`Corrige este código HTML/XML DAW: \n${code}`);
        showLMFeedbackModal(fb);
    } catch (err) {
        showLMFeedbackModal(`### ❌ Error\n${err.message}`);
    } finally {
        btn.disabled = false; btn.innerHTML = '✨ Pedir corrección IA';
    }
}

async function requestAIFeedback() {
    const code = document.getElementById('ej-input')?.value || document.getElementById('exam-code-input')?.value || '';
    const btn = document.getElementById('btn-ai-help');
    btn.disabled = true; btn.innerHTML = '⏳ Corrigiendo...';
    try {
        const fb = await callAI_Universal(`Corrige este código Java DAW: \n${code}`);
        showAIModalFeedback(fb);
    } catch (err) {
        showAIModalFeedback(`### ❌ Error\n${err.message}`);
    } finally {
        btn.disabled = false; btn.innerHTML = '✨ Consultar al Profesor IA';
    }
}

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
    showToast('Guardado', 'success');
    closeModal();
}
