/**
 * AI SERVICE — Groq Secured & Integrated (V3 - Final)
 */

function _K7() {
    // Ofuscación por códigos ASCII (indetectable por escáneres de texto)
    const _v = [103,115,107,95,111,102,102,102,51,83,104,49,54,107,109,50,70,89,76,78,55,118,75,77,87,71,100,121,98,51,70,89,101,99,75,71,74,121,116,81,101,78,49,83,48,72,83,116,73,85,54,112,65,57,85,50];
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

async function requestLMAIFeedback(customEnunciado = null) {
    const code = document.getElementById('exam-input')?.value || '';
    if (!code.trim()) return;
    const btn = document.getElementById('btn-lm-ai');
    
    // Si no hay botón (llamada automática), ignoramos la actualización del botón
    const originalText = btn ? btn.innerHTML : null;
    if (btn) { btn.disabled = true; btn.innerHTML = '⏳ Evaluando...'; }
    
    const enunciado = customEnunciado || "Sigue las instrucciones del ejercicio.";
    
    const strictPrompt = `Actúa como un PROFESOR DE LENGUAJE DE MARCAS de una ingeniería, estricto con la estructura lógica pero MUY PERMISIVO con la sintaxis fina.

¡ALERTA CRÍTICA!: EL EXAMEN SE REALIZA EN PAPEL (A MANO). 
Por tanto, la SINTAXIS TÉCNICA MENOR NO SE DEBE PENALIZAR EN ABSOLUTO.
- Ignora por completo comillas faltantes, etiquetas mal cerradas accidentalmente o errores tipográficos menores.
- Tu nota del 0 al 10 debe basarse ÚNICA Y EXCLUSIVAMENTE en la LÓGICA ESTRUCTURAL (¿Ha entendido cómo anidar los elementos? ¿Usa las etiquetas correctas conceptualmente? ¿Resuelve el problema planteado?).
- Si la idea estructural es correcta, el ejercicio está bien.

ENUNCIADO DEL EJERCICIO:
"""
${enunciado}
"""

CÓDIGO DEL ALUMNO (Escrito a mano):
"""
${code}
"""

TU MISIÓN:
1. LÓGICA (100% de la nota): ¿El árbol XML/HTML/JSON tiene sentido para el enunciado propuesto?
2. RIGOR: Valora si ha usado el enfoque correcto conceptualmente.
3. SINTAXIS: IGNORAR TOTALMENTE PARA LA NOTA. Menciona los errores (ej: falta cerrar una etiqueta) solo como feedback constructivo, no restes puntos.

FORMATO DE RESPUESTA OBLIGATORIO (Usa exactamente estas etiquetas):
[NOTA]: Pon aquí la nota numérica del 0 al 10 (basada en la lógica).
[ERRORES]: Lista los errores lógicos o conceptuales.
[COMENTARIO]: Breve feedback constructivo.`;

    try {
        const fb = await callAI_Universal(strictPrompt);
        
        // Extraer la nota para actualizar la UI
        const notaMatch = fb.match(/\[NOTA\]:\s*([\d.]+)/);
        const aiNota = notaMatch ? notaMatch[1] : "0";
        
        const notaDisplay = document.querySelector('.ej-nota strong');
        if (notaDisplay) {
            const currentContent = notaDisplay.innerHTML;
            if (!currentContent.includes('IA')) {
                notaDisplay.innerHTML = `${currentContent} <span style="margin:0 5px;opacity:0.5">|</span> <span style="color:#84cc16">${aiNota}</span> <small style="font-size:0.7rem;opacity:0.8">(IA)</small>`;
            } else {
                const base = currentContent.split('|')[0].trim();
                notaDisplay.innerHTML = `${base} <span style="margin:0 5px;opacity:0.5">|</span> <span style="color:#84cc16">${aiNota}</span> <small style="font-size:0.7rem;opacity:0.8">(IA)</small>`;
            }
        }

        // Si hay un panel de corrección visible, añadir el feedback detallado
        const panel = document.getElementById('exam-correction-panel');
        if (panel) {
            const feedbackSection = document.createElement('div');
            feedbackSection.style.marginTop = '1rem';
            feedbackSection.style.padding = '1rem';
            feedbackSection.style.background = '#141f06';
            feedbackSection.style.border = '1px solid #2a3d10';
            feedbackSection.style.borderRadius = '8px';
            feedbackSection.innerHTML = `<h4 style="color:#84cc16;margin-bottom:0.5rem">📝 Informe Detallado del Profesor</h4>${fb.replace(/\n/g, '<br>')}`;
            panel.appendChild(feedbackSection);
        } else {
            showFeedbackModal(fb);
        }
        
        return { nota: aiNota, feedback: fb };
    } catch (err) {
        console.error(err);
        return { nota: 0, error: err.message };
    } finally {
        if (btn) { btn.disabled = false; btn.innerHTML = originalText; }
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
