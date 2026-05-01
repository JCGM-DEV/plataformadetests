/**
 * AI SERVICE — Final Diagnostic
 */

async function requestLMAIFeedback() {
    const key = (localStorage.getItem('lm_ai_key') || '').trim();
    if (!key) return showToast('Pega la clave en ajustes', 'error');

    const btn = document.getElementById('btn-lm-ai');
    btn.disabled = true; btn.innerHTML = '⏳ Obteniendo lista oficial...';

    try {
        const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${key}`);
        const data = await res.json();
        
        const modalContent = document.getElementById('modal-content');
        
        if (data.models && data.models.length > 0) {
            let list = data.models.map(m => `<li>${m.name}</li>`).join('');
            modalContent.innerHTML = `<h3>✅ Modelos encontrados</h3><p>Tu clave ve estos modelos:</p><ul>${list}</ul><p>Si esta lista aparece, pulsa de nuevo "Pedir corrección" y debería funcionar.</p><button class="btn-secondary" onclick="closeModal()">Cerrar</button>`;
        } else {
            modalContent.innerHTML = `<h3>❌ Lista vacía</h3><p>Google dice que tu clave no tiene acceso a NINGÚN modelo.</p><pre style="background:#000;padding:1rem;font-size:0.7rem">${JSON.stringify(data, null, 2)}</pre><p><b>Solución:</b> Ve a AI Studio y crea una clave NUEVA en un proyecto nuevo.</p><button class="btn-secondary" onclick="closeModal()">Cerrar</button>`;
        }
    } catch (err) {
        showToast('Error de red', 'error');
    } finally {
        btn.disabled = false; btn.innerHTML = '✨ Pedir corrección IA';
        document.getElementById('modal-overlay').classList.remove('hidden');
    }
}

// ... (Resto de funciones de UI)
function closeModal() { document.getElementById('modal-overlay').classList.add('hidden'); }
function showToast(m,t){ console.log(m); }

function openSettings() {
    const key = localStorage.getItem('lm_ai_key') || '';
    const content = document.getElementById('modal-content');
    content.innerHTML = `<h3>⚙️ Ajustes IA</h3><p>Borra la clave actual y pega la de AI Studio:</p><input type="password" id="ai-key-input" value="${key}" placeholder="AIza..." style="width:100%;padding:.7rem;margin:1rem 0;background:var(--bg3);color:var(--text);border:1px solid var(--border);border-radius:8px"><button class="btn-primary" onclick="saveAISettings()">Guardar</button>`;
    document.getElementById('modal-overlay').classList.remove('hidden');
}

function saveAISettings() {
    const key = document.getElementById('ai-key-input').value.trim();
    localStorage.setItem('lm_ai_key', key);
    localStorage.setItem('prog_ai_key', key);
    alert('Clave guardada. Prueba ahora.');
    location.reload();
}
