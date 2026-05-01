/**
 * AI SERVICE — Groq Exclusive + Diagnostic Mode
 */

async function callAI_Universal(prompt) {
    const key = (localStorage.getItem('groq_ai_key') || '').trim();
    if (!key) throw new Error('No hay API Key. Configúrala en el icono ⚙️.');

    console.log("🧪 Iniciando petición a Groq...");

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

        if (res.ok) {
            console.log("✅ Groq respondió con éxito.");
            return data.choices[0].message.content;
        } else {
            console.error("❌ Groq devolvió error:", data);
            throw new Error(data.error?.message || `Error Groq ${res.status}`);
        }
    } catch (e) {
        console.error("🚨 Error de red/CORS:", e);
        throw new Error(`Fallo de conexión: ${e.message}. Revisa la consola (F12) para detalles de CORS.`);
    }
}

// ── Adaptadores ──────────────────────────────────────────────────

async function requestLMAIFeedback() {
    const code = document.getElementById('exam-input')?.value || '';
    if (!code.trim()) return alert("Escribe algo primero.");
    
    const btn = document.getElementById('btn-lm-ai');
    btn.disabled = true; btn.innerHTML = '⏳ Conectando con Groq...';
    
    try {
        const fb = await callAI_Universal(`Analiza este código HTML/XML y dime los errores: \n${code}`);
        showFeedbackModal(fb);
    } catch (err) {
        showFeedbackModal(`### ❌ Error detectado\n\n**Mensaje:** ${err.message}\n\n**Posibles causas:**\n1. Tu clave de Groq no es válida.\n2. Estás en modo incógnito y el navegador bloquea la petición.\n3. Revisa la consola (tecla F12) para ver si hay errores de color rojo.`);
    } finally {
        btn.disabled = false; btn.innerHTML = '✨ Pedir corrección IA';
    }
}

async function requestAIFeedback() {
    const code = document.getElementById('ej-input')?.value || document.getElementById('exam-code-input')?.value || '';
    if (!code.trim()) return alert("Escribe algo de código Java.");
    
    const btn = document.getElementById('btn-ai-help');
    btn.disabled = true; btn.innerHTML = '⏳ Conectando con Groq...';
    
    try {
        const fb = await callAI_Universal(`Analiza este código Java y dime los errores: \n${code}`);
        showFeedbackModal(fb);
    } catch (err) {
        showFeedbackModal(`### ❌ Error detectado\n\n${err.message}`);
    } finally {
        btn.disabled = false; btn.innerHTML = '✨ Consultar al Profesor IA';
    }
}

function showFeedbackModal(markdown) {
    const overlay = document.getElementById('modal-overlay');
    const content = document.getElementById('modal-content');
    
    content.innerHTML = `
        <div style="color:white">
            <h3 style="color:#84cc16">🎓 Revisión del Profesor IA</h3>
            <div style="background:#141f06; padding:1rem; border-radius:8px; border:1px solid #2a3d10; max-height:50vh; overflow:auto; margin:1rem 0">
                ${markdown.replace(/\n/g, '<br>')}
            </div>
            <button class="btn-primary" onclick="closeModal()" style="width:100%">Entendido</button>
        </div>
    `;
    overlay.classList.remove('hidden');
}

function closeModal() {
    document.getElementById('modal-overlay').classList.add('hidden');
}

function openSettings() {
    const key = localStorage.getItem('groq_ai_key') || '';
    const content = document.getElementById('modal-content');
    
    content.innerHTML = `
        <h3 style="color:#84cc16">⚙️ Ajustes IA (Groq)</h3>
        <p style="font-size:0.9rem">Pega tu clave <b>gsk_...</b> de Groq Cloud:</p>
        <input type="password" id="ai-key-input" value="${key}" placeholder="gsk_..." style="width:100%; padding:10px; margin:10px 0; background:#0f1a04; border:1px solid #84cc16; color:white">
        <p style="font-size:0.7rem; color:#86a85a">Consíguela en <a href="https://console.groq.com/keys" target="_blank" style="color:white">console.groq.com</a></p>
        <button class="btn-primary" onclick="saveAISettings()" style="width:100%; margin-top:10px">Guardar Configuración</button>
    `;
    document.getElementById('modal-overlay').classList.remove('hidden');
}

function saveAISettings() {
    const key = document.getElementById('ai-key-input').value.trim();
    if (!key.startsWith('gsk_')) {
        alert("La clave debe empezar por gsk_");
        return;
    }
    localStorage.setItem('groq_ai_key', key);
    alert('✅ Clave guardada correctamente.');
    closeModal();
}

function openLMSettings() { openSettings(); }
