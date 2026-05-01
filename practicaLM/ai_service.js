/**
 * AI SERVICE — Groq Exclusive Client (Llama 3)
 */

async function callAI_Universal(prompt) {
    const key = (localStorage.getItem('groq_ai_key') || '').trim();
    const model = 'llama3-70b-8192'; // Forzamos el mejor modelo de Groq
    
    if (!key) throw new Error('Por favor, configura tu API Key de Groq en los ajustes (icono de engranaje).');

    const url = 'https://api.groq.com/openai/v1/chat/completions';
    const headers = { 
        'Content-Type': 'application/json', 
        'Authorization': `Bearer ${key}` 
    };
    const body = JSON.stringify({ 
        model: model, 
        messages: [{ role: "user", content: prompt }] 
    });
    
    try {
        const res = await fetch(url, { method: 'POST', headers, body });
        const data = await res.json();

        if (res.ok && data.choices && data.choices.length > 0) {
            return data.choices[0].message.content;
        } else {
            if (res.status === 401 || res.status === 403) {
                throw new Error('Clave de Groq inválida. Verifica que la has copiado bien desde console.groq.com.');
            }
            throw new Error(data.error?.message || `Error HTTP ${res.status}`);
        }
    } catch (e) {
        throw new Error(`Conexión fallida con Groq: ${e.message}`);
    }
}

// ── Adaptadores ──────────────────────────────────────────────────

async function requestLMAIFeedback() {
    const code = document.getElementById('exam-input')?.value || '';
    if (!code.trim()) return;
    const btn = document.getElementById('btn-lm-ai');
    btn.disabled = true; btn.innerHTML = '⏳ Groq evaluando...';
    try {
        const fb = await callAI_Universal(`Eres un profesor estricto de Lenguaje de Marcas (HTML/XML). Evalúa este código y dime los fallos y la nota final: \n${code}`);
        showFeedbackModal(fb);
    } catch (err) {
        showFeedbackModal(`### ⚠️ Error de IA\n\n${err.message}`);
    } finally {
        btn.disabled = false; btn.innerHTML = '✨ Pedir corrección IA';
    }
}

async function requestAIFeedback() {
    const code = document.getElementById('ej-input')?.value || document.getElementById('exam-code-input')?.value || '';
    if (!code.trim()) return;
    const btn = document.getElementById('btn-ai-help');
    btn.disabled = true; btn.innerHTML = '⏳ Groq evaluando...';
    try {
        const fb = await callAI_Universal(`Eres un profesor estricto de Programación en Java. Evalúa este código y dime los fallos y la nota final: \n${code}`);
        showFeedbackModal(fb);
    } catch (err) {
        showFeedbackModal(`### ⚠️ Error de IA\n\n${err.message}`);
    } finally {
        btn.disabled = false; btn.innerHTML = '✨ Consultar al Profesor IA';
    }
}

function showFeedbackModal(markdown) {
    const content = document.getElementById('modal-content');
    content.innerHTML = `
        <div style="padding:1.5rem">
            <h3 style="color:var(--accent);margin-bottom:1rem">🎓 Revisión del Profesor IA (Llama 3)</h3>
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
    const key = localStorage.getItem('groq_ai_key') || '';
    
    const content = document.getElementById('modal-content');
    content.innerHTML = `
        <h3>⚙️ Ajustes del Profesor IA (Groq)</h3>
        
        <p style="font-size:0.85rem; margin-bottom:1rem; opacity:0.9; margin-top:1rem">
            Hemos cambiado a <b>Groq (Llama 3 70B)</b>, que es gratis, ultra rápido y no tiene bloqueos de región.
        </p>

        <p style="font-size:0.8rem; margin-bottom:0.5rem; opacity:0.8">Pega aquí tu API Key de Groq:</p>
        <input type="password" id="ai-key-input" value="${key}" placeholder="gsk_..." style="width:100%;padding:.8rem;margin-bottom:1rem;background:var(--bg3);color:var(--text);border:1px solid var(--border);border-radius:8px; outline:none">
        <p style="font-size:0.7rem; color:var(--accent); margin-top:-0.5rem; margin-bottom:1.5rem;">
            🔗 Consigue una clave gratis en: <a href="https://console.groq.com/keys" target="_blank" style="color:#fff; text-decoration:underline">console.groq.com/keys</a>
        </p>

        <button class="btn-primary" onclick="saveAISettings()" style="width:100%">Guardar y probar</button>
    `;
    document.getElementById('modal-overlay').classList.remove('hidden');
}

function saveAISettings() {
    const key = document.getElementById('ai-key-input').value.trim();
    localStorage.setItem('groq_ai_key', key);
    
    alert('Clave guardada. ¡Groq está listo para corregir!');
    closeModal();
}

function openLMSettings() { openSettings(); }
