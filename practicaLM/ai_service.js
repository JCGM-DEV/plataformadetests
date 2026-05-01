/**
 * AI SERVICE — Secured & Robust
 */

const AI_CONFIG = {
    // Ya no hay clave aquí por seguridad (GitHub detecta claves públicas)
    model: 'gemini-1.5-flash',
    version: 'v1beta'
};

async function callAI_Universal(prompt) {
    const key = (localStorage.getItem('prog_ai_key') || localStorage.getItem('lm_ai_key') || '').trim();
    
    if (!key) throw new Error('Por favor, configura tu API Key en los ajustes (icono de engranaje).');

    const url = `https://generativelanguage.googleapis.com/${AI_CONFIG.version}/models/${AI_CONFIG.model}:generateContent?key=${key}`;
    
    try {
        const res = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
        });

        const data = await res.json();

        if (res.ok) {
            return data.candidates[0].content.parts[0].text;
        } else {
            // Si el error es 403 o 401, es que la clave ha muerto (GitHub la habrá revocado)
            if (res.status === 403 || res.status === 401) {
                throw new Error('Tu clave ha sido bloqueada o revocada por seguridad. Genera una NUEVA en AI Studio.');
            }
            throw new Error(data.error?.message || 'Error en Google AI');
        }
    } catch (e) {
        throw new Error(`Conexión fallida: ${e.message}`);
    }
}

// ── Adaptadores ──────────────────────────────────────────────────

async function requestLMAIFeedback() {
    const code = document.getElementById('exam-input')?.value || '';
    const btn = document.getElementById('btn-lm-ai');
    btn.disabled = true; btn.innerHTML = '⏳ Profesor IA pensando...';

    try {
        const fb = await callAI_Universal(`Corrige este código HTML/XML DAW: \n${code}`);
        showFeedbackModal(fb);
    } catch (err) {
        showFeedbackModal(`### ⚠️ Problema con la IA\n\n${err.message}\n\n**Acción recomendada:** Si GitHub te mandó un aviso, es probable que Google haya desactivado tu clave. Crea una clave nueva en [Google AI Studio](https://aistudio.google.com/app/apikey) y pégala de nuevo.`);
    } finally {
        btn.disabled = false; btn.innerHTML = '✨ Pedir corrección IA';
    }
}

async function requestAIFeedback() {
    const code = document.getElementById('ej-input')?.value || document.getElementById('exam-code-input')?.value || '';
    const btn = document.getElementById('btn-ai-help');
    btn.disabled = true; btn.innerHTML = '⏳ Profesor IA pensando...';

    try {
        const fb = await callAI_Universal(`Corrige este código Java DAW: \n${code}`);
        showFeedbackModal(fb);
    } catch (err) {
        showFeedbackModal(`### ⚠️ Problema con la IA\n\n${err.message}`);
    } finally {
        btn.disabled = false; btn.innerHTML = '✨ Consultar al Profesor IA';
    }
}

function showFeedbackModal(markdown) {
    const content = document.getElementById('modal-content');
    content.innerHTML = `
        <div style="padding:1.5rem">
            <h3 style="color:var(--accent);margin-bottom:1rem">🎓 Revisión del Profesor IA</h3>
            <div style="line-height:1.6; color:var(--text); font-size:0.95rem; max-height:60vh; overflow-y:auto">
                ${markdown.replace(/\n/g, '<br>')}
            </div>
            <div style="margin-top:1.5rem; border-top:1px solid var(--border); padding-top:1rem; text-align:right">
                <button class="btn-secondary" onclick="closeModal()">Cerrar revisión</button>
            </div>
        </div>
    `;
    document.getElementById('modal-overlay').classList.remove('hidden');
}

function closeModal() {
    document.getElementById('modal-overlay').classList.add('hidden');
}

function openSettings() {
    const key = localStorage.getItem('prog_ai_key') || '';
    const content = document.getElementById('modal-content');
    content.innerHTML = `
        <h3>⚙️ Ajustes del Profesor IA</h3>
        <p style="font-size:0.8rem; margin-bottom:1rem; opacity:0.8">Pega aquí tu clave secreta de Google AI Studio:</p>
        <input type="password" id="ai-key-input" value="${key}" placeholder="AIza..." style="width:100%;padding:.8rem;margin-bottom:1rem;background:var(--bg3);color:var(--text);border:1px solid var(--border);border-radius:8px; outline:none">
        <button class="btn-primary" onclick="saveAISettings()" style="width:100%">Guardar y probar</button>
    `;
    document.getElementById('modal-overlay').classList.remove('hidden');
}

function saveAISettings() {
    const key = document.getElementById('ai-key-input').value.trim();
    localStorage.setItem('prog_ai_key', key);
    localStorage.setItem('lm_ai_key', key);
    alert('Clave guardada correctamente. Vamos a probar la IA.');
    location.reload();
}

function openLMSettings() {
    openSettings();
}
