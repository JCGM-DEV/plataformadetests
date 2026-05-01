/**
 * AI SERVICE — Hardcoded Integration
 */

const AI_CONFIG = {
    apiKey: 'AIzaSyDRCGgP95cwGJgquxgkXmPAVuZ2fIQfucI', // Integrada directamente por petición del usuario
    model: 'gemini-1.5-flash',
    version: 'v1beta'
};

async function callAI_Universal(prompt) {
    const url = `https://generativelanguage.googleapis.com/${AI_CONFIG.version}/models/${AI_CONFIG.model}:generateContent?key=${AI_CONFIG.apiKey}`;
    
    console.log('[AI-SYSTEM] Intentando petición con clave hardcodeada...');

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
            throw new Error(data.error?.message || 'Error desconocido');
        }
    } catch (e) {
        throw new Error(`Fallo de conexión: ${e.message}`);
    }
}

// ── Adaptadores ──────────────────────────────────────────────────

async function requestLMAIFeedback() {
    const code = document.getElementById('exam-input')?.value || '';
    if (!code.trim()) return;

    const btn = document.getElementById('btn-lm-ai');
    const orig = btn.innerHTML;
    btn.disabled = true; btn.innerHTML = '⏳ Profesor corrigiendo...';

    try {
        const feedback = await callAI_Universal(`Eres un profesor de Lenguaje de Marcas. Corrige este ejercicio: \n${code}`);
        showFeedbackModal(feedback);
    } catch (err) {
        showFeedbackModal(`### ❌ Error en la API de Google\n\n${err.message}`);
    } finally {
        btn.disabled = false; btn.innerHTML = orig;
    }
}

async function requestAIFeedback() {
    const code = document.getElementById('ej-input')?.value || document.getElementById('exam-code-input')?.value || '';
    if (!code.trim()) return;

    const btn = document.getElementById('btn-ai-help');
    const orig = btn.innerHTML;
    btn.disabled = true; btn.innerHTML = '⏳ Profesor corrigiendo...';

    try {
        const feedback = await callAI_Universal(`Eres un profesor de Programación Java. Corrige este ejercicio: \n${code}`);
        showFeedbackModal(feedback);
    } catch (err) {
        showFeedbackModal(`### ❌ Error en la API de Google\n\n${err.message}`);
    } finally {
        btn.disabled = false; btn.innerHTML = orig;
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
    alert("La clave está integrada directamente en el código para máxima estabilidad.");
}
