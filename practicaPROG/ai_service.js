/**
 * AI SERVICE — Diagnostic Mode
 * Este servicio detecta fallos de región y versión automáticamente.
 */

const AI_CONFIG = {
    apiKey: (localStorage.getItem('lm_ai_key') || localStorage.getItem('prog_ai_key') || '').trim(),
};

async function callAI_Universal(prompt) {
    if (!AI_CONFIG.apiKey) throw new Error('Falta la API Key.');

    // 1. Probamos a listar modelos para ver qué hay disponible
    let models = [];
    try {
        const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${AI_CONFIG.apiKey}`);
        const data = await res.json();
        models = data.models || [];
    } catch (e) {
        throw new Error("No se pudo conectar con Google para listar modelos.");
    }

    if (models.length === 0) {
        throw new Error("Tu clave no tiene ningún modelo habilitado. ¿Has aceptado los términos en AI Studio?");
    }

    // 2. Buscamos el mejor modelo que soporte 'generateContent'
    const bestModel = models.find(m => m.supportedMethods.includes('generateContent') && m.name.includes('1.5-flash')) 
                   || models.find(m => m.supportedMethods.includes('generateContent') && m.name.includes('pro'))
                   || models.find(m => m.supportedMethods.includes('generateContent'));

    if (!bestModel) throw new Error("Ninguno de tus modelos soporta generación de contenido.");

    // 3. Intentamos la llamada a la API con el modelo detectado
    // Probamos v1beta y si falla v1
    const versions = ['v1beta', 'v1'];
    let lastErr = "";

    for (const v of versions) {
        try {
            console.log(`[AI-DIAG] Probando ${bestModel.name} en ${v}...`);
            const url = `https://generativelanguage.googleapis.com/${v}/${bestModel.name}:generateContent?key=${AI_CONFIG.apiKey}`;
            const res = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
            });
            const data = await res.json();
            if (res.ok) return data.candidates[0].content.parts[0].text;
            lastErr = data.error?.message || `Error ${res.status}`;
        } catch (e) {
            lastErr = e.message;
        }
    }

    throw new Error(`Modelo detectado: ${bestModel.name}. Pero falló: ${lastErr}`);
}

// ── Adaptadores ──────────────────────────────────────────────────
async function requestLMAIFeedback() {
    const code = document.getElementById('exam-input')?.value || '';
    const btn = document.getElementById('btn-lm-ai');
    btn.disabled = true; btn.innerHTML = '⏳ Diagnosticando...';
    try {
        const fb = await callAI_Universal(`Corrige este código HTML/XML DAW: \n${code}`);
        showLMFeedbackModal(fb);
    } catch (err) {
        showLMFeedbackModal(`### 🔍 Informe de Diagnóstico\n\n**Estado:** No se pudo conectar.\n**Causa probable:** ${err.message}\n\n**Sugerencia:** Si dice 'User location not supported', necesitas usar una VPN o esperar a que Google habilite tu región.`);
    } finally {
        btn.disabled = false; btn.innerHTML = '✨ Pedir corrección IA';
    }
}

async function requestAIFeedback() {
    const code = document.getElementById('ej-input')?.value || document.getElementById('exam-code-input')?.value || '';
    const btn = document.getElementById('btn-ai-help');
    btn.disabled = true; btn.innerHTML = '⏳ Diagnosticando...';
    try {
        const fb = await callAI_Universal(`Corrige este código Java DAW: \n${code}`);
        showAIModalFeedback(fb);
    } catch (err) {
        showAIModalFeedback(`### 🔍 Informe de Diagnóstico\n${err.message}`);
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
