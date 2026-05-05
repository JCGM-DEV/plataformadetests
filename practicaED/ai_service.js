/**
 * AI SERVICE — UML Correction System (Ollama & Groq Support)
 */

// Configuration: Set to 'ollama' or 'groq'
const AI_ENGINE = 'groq'; 
const OLLAMA_URL = 'http://localhost:11434/api/generate'; // Standard Ollama endpoint
const OLLAMA_MODEL = 'llama3';

function _K7() {
    // Reusing the obfuscated Groq key from other labs
    const _v = [103,115,107,95,111,102,102,102,51,83,104,49,54,107,109,50,70,89,76,78,55,118,75,77,87,71,100,121,98,51,70,89,101,99,75,71,74,121,116,81,101,78,49,83,48,72,83,116,73,85,54,112,65,57,85,50];
    return _v.map(c => String.fromCharCode(c)).join("");
}

async function callAI_Universal(prompt) {
    if (AI_ENGINE === 'ollama') {
        try {
            const res = await fetch(OLLAMA_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    model: OLLAMA_MODEL,
                    prompt: prompt,
                    stream: false
                })
            });
            const data = await res.json();
            if (res.ok) return data.response;
            throw new Error(`Error Ollama ${res.status}`);
        } catch (e) {
            throw new Error(`Conexión Ollama (¿está corriendo?): ${e.message}`);
        }
    } else {
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
}

async function requestEDAIFeedback() {
    if (labNodes.length === 0) {
        showToast('⚠️ Crea algo en el diagrama primero', 'warning');
        return;
    }

    const btn = document.getElementById('btn-ai-correct');
    const originalContent = btn ? btn.innerHTML : '';
    if (btn) {
        btn.disabled = true;
        btn.innerHTML = '⏳ Evaluando...';
    }

    try {
        const diagramDescription = serializeDiagram();
        const ex = currentExerciseIdx !== -1 ? (LAB_EXERCISES[activeSection]?.[currentExerciseIdx]) : null;
        const exerciseContext = ex ? `EJERCICIO: ${ex.title}\nESCENARIO: ${ex.scenario}` : 'Diagrama libre (sin ejercicio específico)';

        const prompt = `Actúa como un PROFESOR DE ENTORNOS DE DESARROLLO experto en UML.
Tu misión es evaluar el siguiente diagrama UML creado por un alumno.

${exerciseContext}

TIPO DE DIAGRAMA: ${LAB_MODE_META[currentLabMode]?.title || currentLabMode}

ESTRUCTURA DEL DIAGRAMA (JSON):
"""
${diagramDescription}
"""

CRITERIOS DE EVALUACIÓN:
1. LÓGICA: ¿El diagrama resuelve el problema planteado?
2. NOTACIÓN: ¿Se usan correctamente los símbolos UML (clases, relaciones, flechas, etc)?
3. COMPLETITUD: ¿Faltan elementos esenciales?

FORMATO DE RESPUESTA OBLIGATORIO:
[NOTA]: Nota del 0 al 10.
[ERRORES]: Lista detallada de fallos o carencias.
[MEJORAS]: Consejos prácticos para mejorar el diagrama.
[COMENTARIO]: Breve feedback motivador.

Responde en español de forma profesional y constructiva.`;

        const feedback = await callAI_Universal(prompt);
        showFeedbackModal(feedback);

        // Update UI grade if possible
        const notaMatch = feedback.match(/\[NOTA\]:\s*([\d.]+)/);
        if (notaMatch) {
            const nota = notaMatch[1];
            const statusEl = document.getElementById('realtime-status');
            if (statusEl) {
                statusEl.innerHTML = `Nota IA: <strong style="color:var(--green)">${nota}</strong>`;
            }
        }

    } catch (err) {
        showFeedbackModal(`### ⚠️ Error de Conexión\n\nNo se pudo contactar con el servicio de IA.\n\nDetalle: ${err.message}`);
    } finally {
        if (btn) {
            btn.disabled = false;
            btn.innerHTML = originalContent;
        }
    }
}

function serializeDiagram() {
    const data = {
        mode: currentLabMode,
        nodes: labNodes.map(n => ({
            type: n.type,
            text: n.text,
            attrs: n.attrs,
            methods: n.methods
        })),
        connections: labConnections.map(c => {
            const from = labNodes.find(n => n.id === c.from)?.text || 'unknown';
            const to = labNodes.find(n => n.id === c.to)?.text || 'unknown';
            return { from, to, type: c.type, label: c.label };
        })
    };
    return JSON.stringify(data, null, 2);
}

async function requestSimAIFeedback(simId) {
    const imageData = window.lastPastedImage;
    if (!imageData) {
        showToast('⚠️ No hay imagen pegada', 'warning');
        return;
    }

    const btn = document.getElementById('btn-ai-sim');
    const originalContent = btn ? btn.innerHTML : '';
    if (btn) {
        btn.disabled = true;
        btn.innerHTML = '⏳ Analizando imagen con IA Vision...';
    }

    try {
        const lesson = LESSONS[simId];
        const exerciseContext = lesson ? `EJERCICIO: ${lesson.title}\nENUNCIADO: ${lesson.subtitle}` : 'Diagrama externo';

        const prompt = `Actúa como un PROFESOR DE ENTORNOS DE DESARROLLO experto en UML.
Te adjunto una captura de pantalla de un diagrama UML creado por un alumno en Visual Paradigm.

${exerciseContext}

TU MISIÓN:
1. Analiza la IMAGEN adjunta.
2. Identifica si el tipo de diagrama es correcto (Clases, Casos de Uso, Secuencia, etc).
3. Evalúa la lógica y la notación UML (flechas, símbolos, multiplicidad, visibilidad).
4. Sé estricto pero constructivo.

FORMATO DE RESPUESTA OBLIGATORIO:
[NOTA]: Nota del 0 al 10.
[ERRORES]: Lista detallada de fallos detectados en la imagen.
[COMENTARIO]: Feedback profesional.

Responde en español.`;

        // We use the Vision model for images
        const userKey = (localStorage.getItem('groq_ai_key') || '').trim();
        const key = userKey || _K7();
        
        const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${key}` 
            },
            body: JSON.stringify({ 
                model: 'llama-3.2-11b-vision-preview', 
                messages: [{ 
                    role: "user", 
                    content: [
                        { type: "text", text: prompt },
                        { type: "image_url", image_url: { url: imageData } }
                    ]
                }] 
            })
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error?.message || `Error Groq Vision ${res.status}`);
        
        const feedback = data.choices[0].message.content;
        
        // Show in simulation feedback board
        const board = document.getElementById('sim-feedback');
        const msgEl = document.getElementById('sim-fb-msg');
        board.classList.remove('hidden');
        
        let html = feedback
            .replace(/\[NOTA\]:/g, '<h3 style="color:var(--green);margin-top:0">🎯 Nota:</h3>')
            .replace(/\[ERRORES\]:/g, '<h4 style="color:var(--red);margin-top:1rem">❌ Errores detectados:</h4>')
            .replace(/\[COMENTARIO\]:/g, '<h4 style="color:var(--accent3);margin-top:1rem">💬 Comentario del profesor:</h4>')
            .replace(/\n/g, '<br>');
            
        msgEl.innerHTML = html;
        board.scrollIntoView({ behavior: 'smooth' });

    } catch (err) {
        showToast('Error Vision: ' + err.message, 'error');
    } finally {
        if (btn) {
            btn.disabled = false;
            btn.innerHTML = originalContent;
        }
    }
}

function showFeedbackModal(markdown) {
    const content = document.getElementById('modal-content');
    if (!content) return;
    
    // Convert markers to HTML
    let html = markdown
        .replace(/\[NOTA\]:/g, '<h3 style="color:var(--green);margin-top:0">🎯 Nota:</h3>')
        .replace(/\[ERRORES\]:/g, '<h4 style="color:var(--red);margin-top:1rem">❌ Errores detectados:</h4>')
        .replace(/\[MEJORAS\]:/g, '<h4 style="color:var(--blue);margin-top:1rem">💡 Sugerencias de mejora:</h4>')
        .replace(/\[COMENTARIO\]:/g, '<h4 style="color:var(--accent3);margin-top:1rem">💬 Comentario del profesor:</h4>')
        .replace(/\n/g, '<br>');

    content.innerHTML = `
        <div style="padding:1.5rem; color:var(--text); font-family:'Inter', sans-serif;">
            <h2 style="margin-bottom:1.5rem; display:flex; align-items:center; gap:0.5rem">
                <span>🎓</span> Corrección Inteligente
            </h2>
            <div style="background:var(--bg3); border:1px solid var(--border); padding:1.5rem; border-radius:12px; line-height:1.6; max-height:60vh; overflow-y:auto; margin-bottom:1.5rem">
                ${html}
            </div>
            <button class="btn-primary" onclick="closeModal()" style="width:100%; justify-content:center">Entendido</button>
        </div>
    `;
    document.getElementById('modal-overlay').classList.remove('hidden');
}

function openSettings() {
    const key = localStorage.getItem('groq_ai_key') || '';
    const content = document.getElementById('modal-content');
    content.innerHTML = `
        <div style="padding:1.5rem">
            <h3>⚙️ Ajustes de IA (Ollama / Groq)</h3>
            <p style="font-size:0.85rem; margin:1rem 0; color:var(--text2)">Configura tu clave de Groq para usar la nube o usa Ollama localmente.</p>
            
            <label style="font-size:0.8rem; color:var(--accent3)">Clave API Groq (Opcional)</label>
            <input type="password" id="ai-key-input" value="${key}" placeholder="Tu clave propia (Opcional)" style="width:100%; padding:10px; margin:10px 0; background:var(--bg3); border:1px solid var(--border); color:white; border-radius:6px">
            
            <p style="font-size:0.75rem; color:var(--text2); margin-top:0.5rem">Nota: Para usar <b>Ollama</b>, debes cambiar el AI_ENGINE en <code>ai_service.js</code> a 'ollama'.</p>
            
            <button class="btn-primary" onclick="saveAISettings()" style="width:100%; margin-top:1.5rem; justify-content:center">Guardar Cambios</button>
        </div>
    `;
    document.getElementById('modal-overlay').classList.remove('hidden');
}

function saveAISettings() {
    localStorage.setItem('groq_ai_key', document.getElementById('ai-key-input').value.trim());
    showToast('✅ Ajustes guardados.', 'success');
    closeModal();
}

function openLMSettings() { openSettings(); }
