/**
 * AI SERVICE — Autodiscovery Mode
 * Este script le pregunta a Google qué modelos tienes permitidos y elige el mejor.
 */

const AI_CONFIG = {
    apiKey: (localStorage.getItem('lm_ai_key') || localStorage.getItem('prog_ai_key') || '').trim(),
    baseUrl: 'https://generativelanguage.googleapis.com/v1beta'
};

let DETECTED_MODEL = null;

async function getBestModel() {
    if (DETECTED_MODEL) return DETECTED_MODEL;
    
    console.log('[AI-HUB] Buscando modelos disponibles para tu clave...');
    try {
        const res = await fetch(`${AI_CONFIG.baseUrl}/models?key=${AI_CONFIG.apiKey}`);
        const data = await res.json();
        
        if (data.models && data.models.length > 0) {
            // Prioridad: 1.5 Flash -> 1.5 Pro -> 1.0 Pro
            const flash = data.models.find(m => m.name.includes('gemini-1.5-flash'));
            const pro15 = data.models.find(m => m.name.includes('gemini-1.5-pro'));
            const pro10 = data.models.find(m => m.name.includes('gemini-pro') && !m.name.includes('1.5'));
            
            const best = flash || pro15 || pro10 || data.models[0];
            DETECTED_MODEL = best.name; // El nombre ya viene como "models/XXXX"
            console.log(`[AI-HUB] ✅ Modelo detectado y listo: ${DETECTED_MODEL}`);
            return DETECTED_MODEL;
        } else {
            throw new Error('No se encontraron modelos disponibles en esta clave.');
        }
    } catch (e) {
        console.error('[AI-HUB] Error al listar modelos:', e);
        throw new Error('No se pudo validar tu clave con Google. Revisa si es correcta.');
    }
}

async function callAI_Universal(prompt) {
    const modelPath = await getBestModel();
    const url = `${AI_CONFIG.baseUrl}/${modelPath}:generateContent?key=${AI_CONFIG.apiKey}`;
    
    const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
    });

    const data = await res.json();
    if (res.ok) return data.candidates[0].content.parts[0].text;
    throw new Error(data.error?.message || 'Error en la generación');
}

// ── Adaptadores (No cambian) ─────────────────────────────────────
async function requestLMAIFeedback() {
    const code = document.getElementById('exam-input')?.value || '';
    const btn = document.getElementById('btn-lm-ai');
    btn.disabled = true; btn.innerHTML = '⏳ Conectando...';
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
    btn.disabled = true; btn.innerHTML = '⏳ Conectando...';
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
    DETECTED_MODEL = null; // Reset para forzar nueva detección
    showToast('Guardado', 'success');
    closeModal();
}
