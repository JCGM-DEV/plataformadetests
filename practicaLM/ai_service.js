/**
 * AI SERVICE — Ultra-Compatible
 */

const AI_CONFIG = {
    apiKey: (localStorage.getItem('lm_ai_key') || localStorage.getItem('prog_ai_key') || '').trim(),
};

async function callAI_Universal(prompt) {
    if (!AI_CONFIG.apiKey) throw new Error('Copia tu API Key en los ajustes (icono de engranaje).');

    // Intentamos la combinación más estándar que funciona en el Playground de Google
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${AI_CONFIG.apiKey}`;
    
    try {
        const res = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }]
            })
        });

        const data = await res.json();

        if (res.ok && data.candidates) {
            return data.candidates[0].content.parts[0].text;
        } else {
            // Si falla, mostramos el error exacto de Google para saber qué pasa
            const msg = data.error?.message || JSON.stringify(data);
            throw new Error(msg);
        }
    } catch (e) {
        throw new Error(`Error de conexión: ${e.message}`);
    }
}

// Adaptadores (Iguales)
async function requestLMAIFeedback() {
    const code = document.getElementById('exam-input')?.value || '';
    const btn = document.getElementById('btn-lm-ai');
    btn.disabled = true; btn.innerHTML = '⏳ Conectando...';
    try {
        const fb = await callAI_Universal(`Corrige este código HTML/XML DAW: \n${code}`);
        showLMFeedbackModal(fb);
    } catch (err) {
        showLMFeedbackModal(`### ❌ Error de Google AI\n\n**Mensaje:** ${err.message}\n\n**Solución:** Si el error persiste, asegúrate de haber hecho 'git pull' en tu servidor.`);
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
        showAIModalFeedback(`### ❌ Error de Google AI\n${err.message}`);
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
