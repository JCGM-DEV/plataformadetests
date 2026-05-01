/**
 * AI SERVICE — LM Lab (HTML / XML / XSD / XSLT)
 * Solo Google Gemini (Más estable para navegadores)
 */

const AI_CONFIG_LM = {
    apiKey: (localStorage.getItem('lm_ai_key') || '').trim(),
    model:  'gemini-1.5-flash',
    endpoint: 'https://generativelanguage.googleapis.com/v1beta/models/'
};

async function callAI_LM(prompt) {
    if (!AI_CONFIG_LM.apiKey) {
        throw new Error('API Key no configurada. Usa el botón ⚙️.');
    }
    
    const url = `${AI_CONFIG_LM.endpoint}${AI_CONFIG_LM.model}:generateContent?key=${AI_CONFIG_LM.apiKey}`;
    
    const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }]
        })
    });

    if (!res.ok) {
        const errorData = await res.json();
        const msg = errorData.error?.message || `Error HTTP ${res.status}`;
        throw new Error(msg);
    }

    const data = await res.json();
    if (!data.candidates || !data.candidates[0].content) {
        throw new Error('La IA no devolvió una respuesta válida.');
    }
    
    return data.candidates[0].content.parts[0].text;
}

async function getLMFeedback(context, code) {
    const prompt = `
Eres un profesor experto en Lenguaje de Marcas (HTML5, XML, XSD, XSLT, XQuery) para alumnos de DAW.
Corrige el siguiente código para un examen práctico.

CONTEXTO:
- Ejercicio: ${context.title}
- Enunciado: ${context.desc}
- Criterios: ${context.criteria.join(' | ')}

CÓDIGO DEL ALUMNO:
\`\`\`
${code}
\`\`\`

RESPUESTA (en Markdown):
1. **Evaluación general**.
2. **Errores detectados**.
3. **Lo que está bien**.
4. **Consejo clave**.
`;
    return await callAI_LM(prompt);
}

async function requestLMAIFeedback() {
    if (!examState.labData) return;
    const ex = examState.labData.exercises[0];
    const code = document.getElementById('exam-input')?.value || '';

    if (!code.trim()) {
        showToast('Escribe algo de código primero', 'info');
        return;
    }

    const btn = document.getElementById('btn-lm-ai');
    const orig = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = '⏳ Consultando...';

    const context = {
        title: examState.labData.examTitle || ex.title,
        desc: examState.labData.examDesc || ex.desc || '',
        criteria: (ex.milestones || []).map(m => m.instruction || m.popup)
    };

    try {
        const feedback = await getLMFeedback(context, code);
        showLMFeedbackModal(feedback);
    } catch (err) {
        console.error('[IA ERROR]', err);
        showToast(`Error: ${err.message}`, 'error');
        showLMFeedbackModal(getLMOfflineFeedback(context, code, err.message));
    } finally {
        btn.disabled = false;
        btn.innerHTML = orig;
    }
}

function getLMOfflineFeedback(context, code, errMsg) {
    let fb = `### 🎓 Revisión del Profesor (Modo Offline)\n`;
    fb += `*(Error de API: ${errMsg})*\n\n`;
    const errors = [];
    if (!/<!doctype/i.test(code) && context.title.includes('HTML')) errors.push('- Falta el DOCTYPE.');
    if (!/<\?xml/i.test(code) && !context.title.includes('HTML')) errors.push('- Falta la declaración XML.');
    
    fb += errors.length ? '#### ❌ Errores:\n' + errors.join('\n') : '✅ Revisa los criterios automáticos.';
    return fb;
}

function showLMFeedbackModal(markdown) {
    const content = document.getElementById('modal-content');
    content.innerHTML = `
        <div style="border-bottom:1px solid var(--border);padding-bottom:1rem;margin-bottom:1rem">
            <h3 style="margin:0">🎓 Revisión del Profesor IA</h3>
        </div>
        <div style="line-height:1.6;font-size:0.9rem">${parseLMMarkdown(markdown)}</div>
        <div style="margin-top:1.5rem;text-align:right">
            <button class="btn-secondary" onclick="closeModal()">Cerrar</button>
        </div>
    `;
    document.getElementById('modal-overlay').classList.remove('hidden');
}

function parseLMMarkdown(text) {
    return text.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
        .replace(/### (.*)/g, '<h4 style="color:var(--accent)">$1</h4>')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/^- (.*)/gm, '<li>$1</li>')
        .replace(/\n/g, '<br>');
}

function openLMSettings() {
    const key = localStorage.getItem('lm_ai_key') || '';
    const content = document.getElementById('modal-content');
    content.innerHTML = `
        <h3>⚙️ Ajustes IA (Gemini)</h3>
        <p style="font-size:0.8rem;color:var(--text2)">Obtén tu clave en <a href="https://aistudio.google.com/app/apikey" target="_blank" style="color:var(--accent)">AI Studio</a>.</p>
        <input type="password" id="lm-settings-key" value="${key}" placeholder="AIza..." style="width:100%;padding:0.7rem;margin:1rem 0;background:var(--bg3);border:1px solid var(--border);border-radius:8px;color:var(--text)">
        <button class="btn-primary" onclick="saveLMSettings()">Guardar</button>
    `;
    document.getElementById('modal-overlay').classList.remove('hidden');
}

function saveLMSettings() {
    const key = document.getElementById('lm-settings-key').value.trim();
    localStorage.setItem('lm_ai_key', key);
    AI_CONFIG_LM.apiKey = key;
    showToast('Guardado', 'success');
    closeModal();
}
