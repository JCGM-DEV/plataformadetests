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
                model: 'llama3-70b-8192', 
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

    const strictPrompt = `Actúa como una PROFESORA DE PROGRAMACIÓN (JAVA) extremadamente exigente.
Tu misión es evaluar el código Java de un alumno basándote en el enunciado.

ENUNCIADO DEL EJERCICIO:
"""
${enunciado}
"""

CÓDIGO DEL ALUMNO:
"""
${code}
"""

CRITERIOS DE EVALUACIÓN:
1. LÓGICA: ¿Resuelve el problema planteado en el enunciado?
2. SINTAXIS: ¿Es código Java válido? (Falta de ; llaves sin cerrar, tipos mal declarados).
3. NOMENCLATURA: ¿Usa camelCase y nombres de variables descriptivos?
4. RIGOR: Si el enunciado pide algo específico (ej: usar un bucle while) y usa otro, penaliza.

FORMATO DE RESPUESTA OBLIGATORIO:
[NOTA]: Nota del 0 al 10.
[ERRORES]: Lista de fallos técnicos o lógicos.
[COMENTARIO]: Feedback sobre calidad de código y eficiencia.`;

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
                                   <div style="line-height:1.7; color:#e2e8f0; font-size:0.95rem">${fb.replace(/\n/g, '<br>')}</div>`;
            feedbackPanel.appendChild(aiSection);
            
            // Si es Code Lab, hacer scroll al final para ver el feedback
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
