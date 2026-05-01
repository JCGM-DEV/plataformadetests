/**
 * AI SERVICE — Flexible Model Selector
 */

async function callAI_Universal(prompt) {
    const key = (localStorage.getItem('prog_ai_key') || localStorage.getItem('lm_ai_key') || '').trim();
    const model = localStorage.getItem('ai_model') || 'gemini-1.5-flash';
    
    if (!key) throw new Error('Por favor, configura tu API Key en los ajustes (icono de engranaje).');

    // Usamos v1beta que es la más universal para los modelos nuevos
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`;
    
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
            if (res.status === 403 || res.status === 401) {
                throw new Error('Tu clave no es válida o no tiene permisos. Verifica que la has copiado bien.');
            }
            throw new Error(`Google rechazó el modelo "${model}": ${data.error?.message || 'Error desconocido'}`);
        }
    } catch (e) {
        throw new Error(`Conexión fallida: ${e.message}`);
    }
}

// ── Adaptadores ──────────────────────────────────────────────────

async function requestLMAIFeedback() {
    const code = document.getElementById('exam-input')?.value || '';
    if (!code.trim()) return;
    const btn = document.getElementById('btn-lm-ai');
    btn.disabled = true; btn.innerHTML = '⏳ Probando IA...';
    try {
        const fb = await callAI_Universal(`Corrige este código HTML/XML DAW: \n${code}`);
        showFeedbackModal(fb);
    } catch (err) {
        showFeedbackModal(`### ⚠️ Error con el Modelo\n\n${err.message}\n\n**Prueba esto:** Ve al engranaje ⚙️ y selecciona otro modelo de la lista.`);
    } finally {
        btn.disabled = false; btn.innerHTML = '✨ Pedir corrección IA';
    }
}

async function requestAIFeedback() {
    const code = document.getElementById('ej-input')?.value || document.getElementById('exam-code-input')?.value || '';
    if (!code.trim()) return;
    const btn = document.getElementById('btn-ai-help');
    btn.disabled = true; btn.innerHTML = '⏳ Probando IA...';
    try {
        const fb = await callAI_Universal(`Corrige este código Java DAW: \n${code}`);
        showFeedbackModal(fb);
    } catch (err) {
        showFeedbackModal(`### ⚠️ Error con el Modelo\n\n${err.message}\n\n**Prueba esto:** Ve al engranaje ⚙️ y selecciona otro modelo de la lista.`);
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
    const key = localStorage.getItem('prog_ai_key') || localStorage.getItem('lm_ai_key') || '';
    const currentModel = localStorage.getItem('ai_model') || 'gemini-1.5-flash';
    
    const models = [
        'gemini-1.5-flash',
        'gemini-1.5-flash-latest',
        'gemini-1.5-flash-001',
        'gemini-1.5-flash-002',
        'gemini-1.5-pro',
        'gemini-1.5-pro-latest',
        'gemini-pro',
        'gemini-1.0-pro'
    ];

    const options = models.map(m => `<option value="${m}" ${m === currentModel ? 'selected' : ''}>${m}</option>`).join('');

    const content = document.getElementById('modal-content');
    content.innerHTML = `
        <h3>⚙️ Ajustes del Profesor IA</h3>
        
        <p style="font-size:0.8rem; margin-bottom:0.5rem; opacity:0.8; margin-top:1rem">Tu clave API de Google:</p>
        <input type="password" id="ai-key-input" value="${key}" placeholder="AIza..." style="width:100%;padding:.8rem;margin-bottom:1rem;background:var(--bg3);color:var(--text);border:1px solid var(--border);border-radius:8px; outline:none">
        
        <p style="font-size:0.8rem; margin-bottom:0.5rem; opacity:0.8">Selecciona el Modelo (Prueba varios si falla):</p>
        <select id="ai-model-select" style="width:100%;padding:.8rem;margin-bottom:1.5rem;background:var(--bg3);color:var(--text);border:1px solid var(--border);border-radius:8px; outline:none">
            ${options}
        </select>

        <button class="btn-primary" onclick="saveAISettings()" style="width:100%">Guardar Ajustes</button>
    `;
    document.getElementById('modal-overlay').classList.remove('hidden');
}

function saveAISettings() {
    const key = document.getElementById('ai-key-input').value.trim();
    const model = document.getElementById('ai-model-select').value;
    
    localStorage.setItem('prog_ai_key', key);
    localStorage.setItem('lm_ai_key', key);
    localStorage.setItem('ai_model', model);
    
    alert(`Guardado: Usaremos ${model}.`);
    closeModal();
}

function openLMSettings() { openSettings(); }
