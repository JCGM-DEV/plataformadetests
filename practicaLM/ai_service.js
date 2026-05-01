/**
 * AI SERVICE — Total Scanner
 * Prueba todas las combinaciones posibles de la API de Google.
 */

const AI_CONFIG = {
    apiKey: (localStorage.getItem('lm_ai_key') || localStorage.getItem('prog_ai_key') || '').trim(),
};

async function callAI_Universal(prompt) {
    if (!AI_CONFIG.apiKey) throw new Error('Falta la API Key.');

    const trials = [
        { v: 'v1beta', m: 'gemini-1.5-flash' },
        { v: 'v1',     m: 'gemini-1.5-flash' },
        { v: 'v1',     m: 'gemini-pro' },
        { v: 'v1beta', m: 'gemini-pro' },
        { v: 'v1beta', m: 'gemini-1.5-pro' }
    ];

    let results = [];

    for (const t of trials) {
        try {
            console.log(`[AI-SCAN] Probando ${t.m} en ${t.v}...`);
            const url = `https://generativelanguage.googleapis.com/${t.v}/models/${t.m}:generateContent?key=${AI_CONFIG.apiKey}`;
            const res = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
            });
            const data = await res.json();
            
            if (res.ok) {
                console.log(`[AI-SCAN] ✅ ÉXITO con ${t.m} (${t.v})`);
                return data.candidates[0].content.parts[0].text;
            } else {
                results.push(`${t.m}/${t.v}: ${data.error?.message || res.status}`);
            }
        } catch (e) {
            results.push(`${t.m}/${t.v}: Error de red`);
        }
    }

    throw new Error(`Ningún modelo funcionó:\n${results.join('\n')}`);
}

// Adaptadores (Sin cambios)
async function requestLMAIFeedback() {
    const code = document.getElementById('exam-input')?.value || '';
    const btn = document.getElementById('btn-lm-ai');
    btn.disabled = true; btn.innerHTML = '⏳ Escaneando...';
    try {
        const fb = await callAI_Universal(`Corrige este HTML: \n${code}`);
        showLMFeedbackModal(fb);
    } catch (err) {
        showLMFeedbackModal(`### 🔍 Resultados del Escáner\n\n${err.message.replace(/\n/g, '<br>')}\n\n**Nota:** Si todos dan error, tu clave no tiene acceso a la API Generativa.`);
    } finally {
        btn.disabled = false; btn.innerHTML = '✨ Pedir corrección IA';
    }
}

async function requestAIFeedback() {
    const code = document.getElementById('ej-input')?.value || '';
    const btn = document.getElementById('btn-ai-help');
    btn.disabled = true; btn.innerHTML = '⏳ Escaneando...';
    try {
        const fb = await callAI_Universal(`Corrige este Java: \n${code}`);
        showAIModalFeedback(fb);
    } catch (err) {
        showAIModalFeedback(`### 🔍 Resultados del Escáner\n${err.message}`);
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
    showToast('Guardado', 'success');
    closeModal();
}
