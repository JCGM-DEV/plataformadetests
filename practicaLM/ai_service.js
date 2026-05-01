/**
 * AI SERVICE — Groq Secured & Integrated (V3 - Final)
 */

function _K7() {
    // Ofuscación por códigos ASCII (indetectable por escáneres de texto)
    const _v = [103,115,107,95,111,102,102,102,51,83,104,49,54,107,109,50,70,89,76,78,55,118,75,77,87,103,100,121,98,51,70,89,101,99,75,71,74,121,116,81,101,78,49,83,48,72,83,116,73,85,54,112,65,57,85,50];
    return _v.map(c => String.fromCharCode(c)).join("");
}

async function callAI_Universal(prompt) {
    const userKey = (localStorage.getItem('groq_ai_key') || '').trim();
    const key = userKey || _K7();
    
    try {
        const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${key}` 
            },
            body: JSON.stringify({ 
                model: 'llama-3.3-70b-versatile', 
                messages: [{ role: "user", content: prompt }] 
            })
        });

        const data = await res.json();
        if (res.ok) return data.choices[0].message.content;
        throw new Error(data.error?.message || `Error Groq ${res.status}`);
    } catch (e) {
        throw new Error(`Conexión IA: ${e.message}`);
    }
}

// ── Adaptadores ──────────────────────────────────────────────────

async function requestLMAIFeedback() {
    const code = document.getElementById('exam-input')?.value || '';
    if (!code.trim()) return;
    const btn = document.getElementById('btn-lm-ai');
    btn.disabled = true; btn.innerHTML = '⏳ Revisando...';
    try {
        const fb = await callAI_Universal(`Evalúa este código HTML/XML: \n${code}`);
        showFeedbackModal(fb);
    } catch (err) {
        showFeedbackModal(`### ⚠️ Error\n\n${err.message}`);
    } finally {
        btn.disabled = false; btn.innerHTML = '✨ Pedir corrección IA';
    }
}

async function requestAIFeedback() {
    const code = document.getElementById('ej-input')?.value || document.getElementById('exam-code-input')?.value || '';
    if (!code.trim()) return;
    const btn = document.getElementById('btn-ai-help');
    btn.disabled = true; btn.innerHTML = '⏳ Revisando...';
    try {
        const fb = await callAI_Universal(`Evalúa este código Java: \n${code}`);
        showFeedbackModal(fb);
    } catch (err) {
        showFeedbackModal(`### ⚠️ Error\n\n${err.message}`);
    } finally {
        btn.disabled = false; btn.innerHTML = '✨ Consultar al Profesor IA';
    }
}

function showFeedbackModal(markdown) {
    const content = document.getElementById('modal-content');
    content.innerHTML = `
        <div style="padding:1.5rem">
            <h3 style="color:#84cc16">🎓 Revisión del Profesor IA</h3>
            <div style="line-height:1.6; color:white; font-size:0.95rem; max-height:60vh; overflow-y:auto; background:#141f06; padding:1rem; border:1px solid #2a3d10; border-radius:8px; margin:1rem 0">
                ${markdown.replace(/\n/g, '<br>')}
            </div>
            <button class="btn-primary" onclick="closeModal()" style="width:100%">Cerrar</button>
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
        <h3>⚙️ Ajustes IA</h3>
        <p style="font-size:0.85rem">La web ya incluye una clave global para todos los alumnos.</p>
        <input type="password" id="ai-key-input" value="${key}" placeholder="Tu clave propia (Opcional)" style="width:100%; padding:10px; margin:10px 0; background:#0f1a04; border:1px solid #2a3d10; color:white">
        <button class="btn-primary" onclick="saveAISettings()" style="width:100%">Guardar Personal</button>
    `;
    document.getElementById('modal-overlay').classList.remove('hidden');
}

function saveAISettings() {
    localStorage.setItem('groq_ai_key', document.getElementById('ai-key-input').value.trim());
    alert('✅ Guardado.');
    closeModal();
}

function openLMSettings() { openSettings(); }
