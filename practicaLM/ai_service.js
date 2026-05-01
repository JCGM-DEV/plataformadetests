/**
 * AI SERVICE — Universal Client (Groq / Gemini / OpenAI)
 */

async function callAI_Universal(prompt) {
    const key = (localStorage.getItem('prog_ai_key') || localStorage.getItem('lm_ai_key') || '').trim();
    const provider = localStorage.getItem('ai_provider') || 'groq';
    const model = localStorage.getItem('ai_model') || 'llama3-70b-8192';
    
    if (!key) throw new Error('Por favor, configura tu API Key en los ajustes (icono de engranaje).');

    let url, headers, body;

    if (provider === 'groq') {
        url = 'https://api.groq.com/openai/v1/chat/completions';
        headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${key}` };
        body = JSON.stringify({ model: model, messages: [{ role: "user", content: prompt }] });
    } else {
        // Fallback a Gemini por si algún día Google te desbloquea
        url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`;
        headers = { 'Content-Type': 'application/json' };
        body = JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] });
    }
    
    try {
        const res = await fetch(url, { method: 'POST', headers, body });
        const data = await res.json();

        if (res.ok) {
            if (provider === 'groq') return data.choices[0].message.content;
            return data.candidates[0].content.parts[0].text;
        } else {
            throw new Error(data.error?.message || `Error HTTP ${res.status}`);
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
    btn.disabled = true; btn.innerHTML = '⏳ Evaluando código...';
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
    btn.disabled = true; btn.innerHTML = '⏳ Evaluando código...';
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
    const currentProvider = localStorage.getItem('ai_provider') || 'groq';
    
    const content = document.getElementById('modal-content');
    content.innerHTML = `
        <h3>⚙️ Ajustes del Profesor IA</h3>
        
        <p style="font-size:0.8rem; margin-bottom:0.5rem; opacity:0.8; margin-top:1rem">1. Proveedor de IA:</p>
        <select id="ai-provider-select" onchange="updateModelOptions()" style="width:100%;padding:.8rem;margin-bottom:1rem;background:var(--bg3);color:var(--text);border:1px solid var(--border);border-radius:8px; outline:none">
            <option value="groq" ${currentProvider === 'groq' ? 'selected' : ''}>Groq (Recomendado - Llama 3)</option>
            <option value="gemini" ${currentProvider === 'gemini' ? 'selected' : ''}>Google Gemini (Requiere permisos)</option>
        </select>

        <p style="font-size:0.8rem; margin-bottom:0.5rem; opacity:0.8">2. API Key:</p>
        <input type="password" id="ai-key-input" value="${key}" placeholder="Pega tu API Key aquí..." style="width:100%;padding:.8rem;margin-bottom:1rem;background:var(--bg3);color:var(--text);border:1px solid var(--border);border-radius:8px; outline:none">
        <p id="groq-help" style="font-size:0.7rem; color:var(--accent); margin-top:-0.5rem; margin-bottom:1rem;">Consigue una clave gratis en: <a href="https://console.groq.com/keys" target="_blank" style="color:#fff">console.groq.com</a></p>

        <p style="font-size:0.8rem; margin-bottom:0.5rem; opacity:0.8">3. Modelo:</p>
        <select id="ai-model-select" style="width:100%;padding:.8rem;margin-bottom:1.5rem;background:var(--bg3);color:var(--text);border:1px solid var(--border);border-radius:8px; outline:none">
            <!-- Rellenado por JS -->
        </select>

        <button class="btn-primary" onclick="saveAISettings()" style="width:100%">Guardar Ajustes</button>
    `;
    document.getElementById('modal-overlay').classList.remove('hidden');
    updateModelOptions(); // Llenar modelos iniciales
}

function updateModelOptions() {
    const provider = document.getElementById('ai-provider-select').value;
    const modelSelect = document.getElementById('ai-model-select');
    const help = document.getElementById('groq-help');
    
    if (provider === 'groq') {
        help.style.display = 'block';
        modelSelect.innerHTML = \`<option value="llama3-70b-8192">Llama 3 70B (Muy inteligente)</option>
                                 <option value="llama3-8b-8192">Llama 3 8B (Muy rápido)</option>\`;
    } else {
        help.style.display = 'none';
        modelSelect.innerHTML = \`<option value="gemini-1.5-flash">Gemini 1.5 Flash</option>
                                 <option value="gemini-1.5-pro">Gemini 1.5 Pro</option>\`;
    }
}

function saveAISettings() {
    const key = document.getElementById('ai-key-input').value.trim();
    const provider = document.getElementById('ai-provider-select').value;
    const model = document.getElementById('ai-model-select').value;
    
    localStorage.setItem('prog_ai_key', key);
    localStorage.setItem('lm_ai_key', key);
    localStorage.setItem('ai_provider', provider);
    localStorage.setItem('ai_model', model);
    
    alert(\`Guardado: Usaremos \${provider.toUpperCase()} con el modelo \${model}.\`);
    closeModal();
}

function openLMSettings() { openSettings(); }
