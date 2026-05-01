/**
 * AI SERVICE — LM Lab (HTML / XML / XSD / XSLT)
 * Soporta: Google Gemini y xAI Grok
 */

const AI_CONFIG_LM = {
    provider: localStorage.getItem('lm_ai_provider') || 'gemini',
    apiKey:   localStorage.getItem('lm_ai_key')      || '',
    geminiModel:    'gemini-1.5-flash',
    grokModel:      'grok-beta',
    geminiEndpoint: 'https://generativelanguage.googleapis.com/v1/models/',
    grokEndpoint:   'https://api.x.ai/v1/chat/completions'
};

// ── Llamada principal ─────────────────────────────────────────────
async function callAI_LM(prompt) {
    if (!AI_CONFIG_LM.apiKey) {
        throw new Error('No se ha configurado la API Key. Usa el botón ⚙️ para añadirla.');
    }
    return AI_CONFIG_LM.provider === 'gemini'
        ? await _callGeminiLM(prompt)
        : await _callGrokLM(prompt);
}

async function _callGeminiLM(prompt) {
    const url = `${AI_CONFIG_LM.geminiEndpoint}${AI_CONFIG_LM.geminiModel}:generateContent?key=${AI_CONFIG_LM.apiKey}`;
    const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
    });
    if (!res.ok) { const e = await res.json(); throw new Error(e.error?.message || 'Error Gemini'); }
    const data = await res.json();
    return data.candidates[0].content.parts[0].text;
}

async function _callGrokLM(prompt) {
    const res = await fetch(AI_CONFIG_LM.grokEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${AI_CONFIG_LM.apiKey}` },
        body: JSON.stringify({
            model: AI_CONFIG_LM.grokModel,
            messages: [
                { role: 'system', content: 'Eres un profesor experto en HTML5, XML, XSD, XSLT y XQuery para alumnos de DAW.' },
                { role: 'user', content: prompt }
            ],
            stream: false, temperature: 0.7
        })
    });
    if (!res.ok) { const e = await res.json(); throw new Error(e.error?.message || 'Error Grok'); }
    const data = await res.json();
    return data.choices[0].message.content;
}

// ── Prompt de corrección ──────────────────────────────────────────
async function getLMFeedback(context, code) {
    const prompt = `
Eres un profesor experto en Lenguaje de Marcas (HTML5, XML, XSD, XSLT, XQuery) para alumnos de DAW.
Corrige el siguiente código para un examen práctico y sé directo y constructivo.

CONTEXTO:
- Ejercicio: ${context.title}
- Enunciado: ${context.desc}
- Criterios que debe cumplir: ${context.criteria.join(' | ')}

CÓDIGO DEL ALUMNO:
\`\`\`
${code}
\`\`\`

RESPUESTA (en Markdown):
1. **Evaluación general** (1-2 frases sobre si va bien encaminado).
2. **Errores detectados** (lista con explicación breve de cada problema estructural, semántico o de sintaxis).
3. **Lo que está bien** (refuerzo positivo de lo correcto).
4. **Consejo clave** para el examen real (1 frase).
`;
    return await callAI_LM(prompt);
}

// ── Botón IA en el panel de corrección ───────────────────────────
async function requestLMAIFeedback() {
    if (!examState.labData) return;
    const ex = examState.labData.exercises[0];
    const code = document.getElementById('exam-input')?.value || '';

    if (!code.trim()) { showToast('Escribe código primero', 'info'); return; }

    const btn = document.getElementById('btn-lm-ai');
    if (!btn) return;
    const orig = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = '⏳ Consultando IA...';

    const context = {
        title:    examState.labData.examTitle || ex.title,
        desc:     examState.labData.examDesc  || ex.desc || '',
        criteria: (ex.milestones || []).map(m => m.instruction || m.popup)
    };

    try {
        const feedback = await getLMFeedback(context, code);
        showLMFeedbackModal(feedback);
    } catch (err) {
        console.warn('IA falló, usando motor offline:', err.message);
        showLMFeedbackModal(getLMOfflineFeedback(context, code, err.message));
    } finally {
        btn.disabled = false;
        btn.innerHTML = orig;
    }
}

// ── Motor offline (sin API) ───────────────────────────────────────
function getLMOfflineFeedback(context, code, errMsg) {
    const isHTML = /<!doctype|<html/i.test(code);
    let fb = `### 🎓 Revisión del Profesor (Modo Offline)\n`;
    fb += `*(No se pudo conectar con la IA: ${errMsg})*\n\n`;
    const errors = [];

    if (isHTML) {
        if (!/<!doctype\s+html/i.test(code))     errors.push('- Falta `<!DOCTYPE html>` al inicio del documento.');
        if (!/lang=["']es["']/i.test(code))       errors.push('- El atributo `lang="es"` no está en `<html>`.');
        if (!/charset=["']utf-8["']/i.test(code)) errors.push('- Falta `<meta charset="UTF-8">`.');
        if (/<h[1-6][^>]*>[^<]*<h[1-6]/i.test(code)) errors.push('- Revisa la jerarquía de encabezados (no saltes de h1 a h3).');
    } else {
        if (!/<\?xml/i.test(code))  errors.push('- Falta la declaración XML `<?xml version="1.0" encoding="UTF-8"?>`.');
        if (!/xs:schema|DOCTYPE/i.test(code) && context.criteria.some(c => /dtd|xsd|schema/i.test(c)))
            errors.push('- Parece que falta la DTD o el esquema XSD.');
    }

    fb += errors.length
        ? '#### ❌ Posibles problemas:\n' + errors.join('\n') + '\n\n'
        : '✅ No detecto errores graves a simple vista.\n\n';

    fb += '#### 💡 Consejo:\nRevisa cada criterio ❌ uno por uno; cada uno puntúa en el examen.';
    return fb;
}

// ── Modal de feedback ─────────────────────────────────────────────
function showLMFeedbackModal(markdown) {
    const content = document.getElementById('modal-content');
    content.innerHTML = `
        <div style="display:flex;align-items:center;gap:1rem;margin-bottom:1rem;border-bottom:1px solid var(--border);padding-bottom:1rem">
            <div style="font-size:2rem">🎓</div>
            <div>
                <h3 style="margin:0">Revisión del Profesor IA</h3>
                <small style="color:var(--text2)">Proveedor: ${AI_CONFIG_LM.provider.toUpperCase()}</small>
            </div>
        </div>
        <div style="line-height:1.7;font-size:.9rem">${parseLMMarkdown(markdown)}</div>
        <div style="margin-top:1.5rem;text-align:right">
            <button class="btn-secondary" onclick="closeModal()">Cerrar</button>
        </div>
    `;
    document.getElementById('modal-overlay').classList.remove('hidden');
}

function parseLMMarkdown(text) {
    if (!text) return '';
    return text
        .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
        .replace(/### (.*)/g, '<h4 style="color:var(--accent);margin:1rem 0 .5rem">$1</h4>')
        .replace(/#### (.*)/g, '<h5 style="color:var(--accent3);margin:.75rem 0 .4rem">$1</h5>')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/`([^`]+)`/g, '<code style="background:rgba(255,255,255,.1);padding:0 4px;border-radius:4px">$1</code>')
        .replace(/^- (.*)/gm, '<li style="margin-left:1rem;margin-bottom:.3rem">$1</li>')
        .replace(/\n/g, '<br>');
}

// ── Config: modal de ajustes ──────────────────────────────────────
function openLMSettings() {
    const key      = localStorage.getItem('lm_ai_key')      || '';
    const provider = localStorage.getItem('lm_ai_provider') || 'gemini';
    const content  = document.getElementById('modal-content');
    content.innerHTML = `
        <h3>⚙️ Configuración del Profesor IA</h3>
        <div style="margin-bottom:1.25rem">
            <label style="display:block;font-size:.8rem;color:var(--text2);margin-bottom:.5rem">Proveedor de IA:</label>
            <select id="lm-settings-provider" onchange="updateLMProviderHint()"
                style="width:100%;padding:.7rem;background:var(--bg3);border:1px solid var(--border);border-radius:8px;color:var(--text)">
                <option value="gemini" ${provider==='gemini'?'selected':''}>Google Gemini (Gratuito)</option>
                <option value="grok"   ${provider==='grok'  ?'selected':''}>xAI Grok (Beta)</option>
            </select>
        </div>
        <div style="margin-bottom:1rem">
            <label style="display:block;font-size:.8rem;color:var(--text2);margin-bottom:.5rem">API Key:</label>
            <input type="password" id="lm-settings-key" value="${key}" placeholder="Pega tu clave aquí..."
                style="width:100%;padding:.7rem;background:var(--bg3);border:1px solid var(--border);border-radius:8px;color:var(--text)">
        </div>
        <div id="lm-provider-hint" style="font-size:.75rem;color:var(--text2);margin-bottom:1.5rem;padding:.75rem;background:rgba(255,255,255,.03);border-radius:6px"></div>
        <div style="display:flex;gap:1rem">
            <button class="btn-primary" onclick="saveLMSettings()">Guardar</button>
            <button class="btn-secondary" onclick="closeModal()">Cancelar</button>
        </div>
    `;
    updateLMProviderHint();
    document.getElementById('modal-overlay').classList.remove('hidden');
}

function updateLMProviderHint() {
    const p = document.getElementById('lm-settings-provider').value;
    document.getElementById('lm-provider-hint').innerHTML = p === 'gemini'
        ? 'Clave gratuita en <a href="https://aistudio.google.com/app/apikey" target="_blank" style="color:var(--accent)">Google AI Studio</a>. Modelo: Gemini 1.5 Flash.'
        : 'Cuenta en <a href="https://console.x.ai/" target="_blank" style="color:var(--accent)">xAI Console</a>. Modelo: Grok-beta.';
}

function saveLMSettings() {
    const provider = document.getElementById('lm-settings-provider').value;
    const key      = document.getElementById('lm-settings-key').value.trim();
    localStorage.setItem('lm_ai_provider', provider);
    localStorage.setItem('lm_ai_key',      key);
    AI_CONFIG_LM.provider = provider;
    AI_CONFIG_LM.apiKey   = key;
    showToast('Configuración guardada ✓', 'success');
    closeModal();
}
