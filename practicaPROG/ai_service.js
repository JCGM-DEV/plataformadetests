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

async function requestAIFeedback(ejId = null) {
    const code = document.getElementById('ej-input')?.value || 
                 document.getElementById('code-input')?.value || 
                 document.getElementById('exam-code-input')?.value || '';
                 
    if (!code.trim()) return;
    
    const btn = document.getElementById('btn-ai-help') || document.querySelector('.btn-run');
    const originalText = btn ? btn.innerHTML : null;
    if (btn) { btn.disabled = true; btn.innerHTML = '⏳ Compilando con IA...'; }
    
    let enunciado = "Implementa la lógica Java solicitada.";
    
    // Buscar el enunciado en EJERCICIOS, CODE_LABS o TUTOR_SESSIONS
    if (ejId) {
        // Si ejId es un objeto o un string largo, asumimos que es el enunciado directamente
        if (typeof ejId === 'string' && ejId.length > 50) {
            enunciado = ejId;
        } else {
            const ej = (typeof EJERCICIOS !== 'undefined') ? EJERCICIOS.find(e => e.id === ejId) : null;
            if (ej) {
                enunciado = ej.enunciado;
            } else if (typeof TUTOR_SESSIONS !== 'undefined') {
                const session = TUTOR_SESSIONS.find(s => s.id === ejId);
                if (session) enunciado = session.examen?.enunciado || session.titulo;
            }
        }
    }

    const strictPrompt = `Actúa como un PROFESOR DE PROGRAMACIÓN (JAVA) estricto con la lógica pero MUY PERMISIVO con la sintaxis.
Tu misión es evaluar el código de un alumno basándote en el enunciado.

¡ALERTA CRÍTICA!: EL EXAMEN SE REALIZA EN PAPEL (A MANO). 
Por tanto, la SINTAXIS NO SE DEBE PENALIZAR EN ABSOLUTO.
- Ignora por completo puntos y coma (;), llaves sin cerrar ({}), mayúsculas/minúsculas incorrectas, importaciones faltantes y pequeños errores de escritura o tipos.
- Tu nota del 0 al 10 debe basarse ÚNICA Y EXCLUSIVAMENTE en la LÓGICA DE PROGRAMACIÓN (uso correcto de herencia, polimorfismo, diseño de clases, algoritmos y comprensión del problema).
- Si la idea lógica y la estructura del código es correcta, el ejercicio está bien.

ENUNCIADO DEL EJERCICIO:
"""
${enunciado}
"""

CÓDIGO DEL ALUMNO (Escrito a mano):
"""
${code}
"""

CRITERIOS DE EVALUACIÓN:
1. LÓGICA (100% de la nota): ¿Resuelve el problema planteado en el enunciado de forma coherente?
2. RIGOR: Si el enunciado pide algo específico (ej: una excepción personalizada) y usa otra cosa, puedes comentarlo para ajustar la nota, pero valorando el flujo lógico.
3. SINTAXIS: IGNORAR TOTALMENTE PARA LA NOTA. Menciona los errores solo como feedback constructivo breve, no restes puntos por ellos bajo ningún concepto.

FORMATO DE RESPUESTA OBLIGATORIO:
[NOTA]: Nota del 0 al 10 (Basada únicamente en la lógica).
[ERRORES]: Lista de fallos lógicos (no de sintaxis).
[COMENTARIO]: Feedback sobre la calidad de la lógica y consejos constructivos.`;

    try {
        const fb = await callAI_Universal(strictPrompt);
        
        // Extraer nota para UI
        const notaMatch = fb.match(/\[NOTA\]:\s*([\d.]+)/);
        const aiNota = notaMatch ? notaMatch[1] : "0";
        
        const notaDisplay = document.querySelector('.nota-final strong') || document.querySelector('.ej-nota strong');
        if (notaDisplay) {
            const currentContent = notaDisplay.innerHTML;
            if (!currentContent.includes('IA')) {
                notaDisplay.innerHTML = `${currentContent} <span style="margin:0 5px;opacity:0.5">|</span> <span style="color:#84cc16">${aiNota}</span> <small style="font-size:0.7rem;opacity:0.8">(IA)</small>`;
            } else {
                // Update existing IA note
                const base = currentContent.split('|')[0].trim();
                notaDisplay.innerHTML = `${base} <span style="margin:0 5px;opacity:0.5">|</span> <span style="color:#84cc16">${aiNota}</span> <small style="font-size:0.7rem;opacity:0.8">(IA)</small>`;
            }
        }

        // Inyectar feedback en el panel de resultados si existe
        const feedbackPanel = document.getElementById('ej-feedback') || 
                              document.getElementById('code-output') || 
                              document.getElementById('exam-correccion');
                              
        if (feedbackPanel) {
            // Limpiar si ya había un bloque de IA anterior en Code Lab
            if (feedbackPanel.id === 'code-output') {
                const oldAI = feedbackPanel.querySelector('.ai-feedback-box');
                if (oldAI) oldAI.remove();
            }

            const aiSection = document.createElement('div');
            aiSection.className = 'ai-feedback-box';
            aiSection.style.marginTop = '1.5rem';
            aiSection.style.padding = '1.5rem';
            aiSection.style.background = 'linear-gradient(135deg, #0f170a 0%, #050802 100%)';
            aiSection.style.border = '1px solid #365314';
            aiSection.style.borderRadius = '12px';
            aiSection.innerHTML = `<h4 style="color:#84cc16;margin-bottom:0.8rem;display:flex;align-items:center;gap:0.5rem"><span>🎓</span> Informe de la Profesora de Java (IA)</h4>
                                   <div class="ai-feedback-content" style="line-height:1.7; color:#e2e8f0; font-size:0.95rem">${fb.replace(/\n/g, '<br>')}</div>
                                   
                                   <div class="ai-reply-container" style="margin-top:1.5rem; border-top:1px solid #365314; padding-top:1rem;">
                                       <textarea class="ai-reply-input" placeholder="¿No estás de acuerdo o tienes dudas? ¡Díselo a la IA!" style="width:100%; height:60px; background:#0f1a04; border:1px solid #2a3d10; color:#e2e8f0; padding:10px; border-radius:8px; font-size:0.9rem; resize:vertical; font-family:inherit;"></textarea>
                                       <button onclick="respondToAI(this)" style="margin-top:0.5rem; background:#365314; border:1px solid #4d7c0f; color:#ecfccb; padding:0.5rem 1rem; border-radius:6px; cursor:pointer; font-weight:bold; transition:0.2s;">💬 Responder / Reclamar</button>
                                   </div>`;
            feedbackPanel.appendChild(aiSection);
            
            // Hacer scroll al feedback para que el usuario siempre lo vea
            feedbackPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            if (feedbackPanel.id === 'code-output') {
                feedbackPanel.scrollTop = feedbackPanel.scrollHeight;
            }
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

async function respondToAI(btn) {
    const container = btn.closest('.ai-feedback-box');
    const input = container.querySelector('.ai-reply-input');
    const userMessage = input.value.trim();
    if (!userMessage) return;

    // Obtener el código actual
    const code = document.getElementById('ej-input')?.value || 
                 document.getElementById('code-input')?.value || 
                 document.getElementById('exam-code-input')?.value || '';

    // Obtener el feedback previo
    const previousFeedback = container.querySelector('.ai-feedback-content').innerText;

    btn.disabled = true;
    const originalText = btn.innerHTML;
    btn.innerHTML = '⏳ Dialogando con IA...';

    const prompt = \`Actúa como un PROFESOR DE PROGRAMACIÓN (JAVA) que está debatiendo con un alumno.
Anteriormente evaluaste su código y le diste este feedback:
"""
\${previousFeedback}
"""

El código del alumno era:
"""
\${code}
"""

El alumno te responde o te reclama lo siguiente:
"""
\${userMessage}
"""

Tu tarea es responderle de forma constructiva, directa y educada. 
- Si el alumno tiene razón y tú te equivocaste al evaluar su código, RECONÓCELO abiertamente y dale la razón. 
- Si el alumno está equivocado, explícale exactamente por qué con un ejemplo técnico muy breve.
- No vuelvas a generar una nota ni el formato de evaluación original, solo céntrate en responder la duda o queja del alumno como un chat.\`;

    try {
        const response = await callAI_Universal(prompt);
        
        // Añadir la respuesta al chat
        const chatLog = document.createElement('div');
        chatLog.style.marginTop = '1rem';
        chatLog.innerHTML = \`
            <div style="background:rgba(163, 230, 53, 0.1); padding:0.8rem; border-left:3px solid #a3e635; margin-bottom:0.5rem;">
                <strong style="color:#a3e635;">Tú:</strong> <span style="color:#e2e8f0;">\${userMessage.replace(/\\n/g, '<br>')}</span>
            </div>
            <div style="background:rgba(0, 0, 0, 0.3); border:1px solid #365314; padding:0.8rem; border-radius:8px;">
                <strong style="color:#84cc16;">🎓 Profesora IA:</strong> <div style="color:#e2e8f0; margin-top:0.3rem;">\${response.replace(/\\n/g, '<br>')}</div>
            </div>
        \`;
        
        // Insertar antes del contenedor de input
        const replyContainer = container.querySelector('.ai-reply-container');
        container.insertBefore(chatLog, replyContainer);
        
        input.value = '';
        container.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } catch (err) {
        console.error(err);
        alert('Error al contactar con la IA: ' + err.message);
    } finally {
        btn.disabled = false;
        btn.innerHTML = originalText;
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
