/**
 * lab_engine.js - Motor del Laboratorio de Código Interactivo
 * Soporta JavaScript (nativo) y Python (via Pyodide WASM).
 * 
 * Estructura del objeto "lab challenge":
 * {
 *   id: "unique_id",
 *   subject: "dwec" | "dwes" | "python",
 *   title: "Título del ejercicio",
 *   description: "Enunciado del ejercicio",
 *   unit: 1,
 *   difficulty: "basic" | "intermediate" | "advanced",
 *   language: "javascript" | "python",
 *   starterCode: "// Código inicial...",
 *   testCases: [
 *     { input: [...args], expected: value, description: "Descripción del test" }
 *   ],
 *   hints: ["Pista 1", "Pista 2"],
 *   solution: "// Solución de referencia"
 * }
 */

const LabEngine = (() => {
    let pyodide = null;
    let pyodideReady = false;
    let currentChallenge = null;
    let editorInstance = null;
    let hintIndex = 0;
    let startTime = null;
    let timerInterval = null;

    // ─── PYODIDE LOADER ──────────────────────────────────────────────────
    async function loadPyodideEngine() {
        if (pyodideReady) return pyodide;
        const statusEl = document.getElementById('lab-py-status');
        if (statusEl) statusEl.textContent = '⏳ Cargando motor Python...';

        pyodide = await loadPyodide({
            indexURL: "https://cdn.jsdelivr.net/pyodide/v0.25.0/full/"
        });
        pyodideReady = true;
        if (statusEl) statusEl.textContent = '✅ Python listo';
        return pyodide;
    }

    // ─── CODEMIRROR INIT ─────────────────────────────────────────────────
    function initEditor(container, language, starterCode) {
        if (editorInstance) {
            editorInstance.toTextArea();
            editorInstance = null;
        }
        const textarea = document.createElement('textarea');
        textarea.id = 'lab-code-textarea';
        textarea.value = starterCode || '';
        container.innerHTML = '';
        container.appendChild(textarea);

        const mode = language === 'python' ? 'python' : (language === 'php' ? 'application/x-httpd-php' : 'javascript');
        editorInstance = CodeMirror.fromTextArea(textarea, {
            mode: mode,
            theme: 'dracula',
            lineNumbers: true,
            matchBrackets: true,
            autoCloseBrackets: true,
            indentUnit: 4,
            tabSize: 4,
            indentWithTabs: false,
            extraKeys: {
                "Ctrl-Enter": runCode,
                "Tab": function(cm) {
                    if (cm.somethingSelected()) cm.indentSelection("add");
                    else cm.replaceSelection("    ", "end");
                }
            },
            lineWrapping: false,
            scrollbarStyle: "overlay"
        });
        editorInstance.setSize('100%', '100%');
        setTimeout(() => editorInstance.refresh(), 100);
    }

    // ─── RUN CODE ─────────────────────────────────────────────────────────
    async function runCode() {
        if (!currentChallenge || !editorInstance) return;

        const code = editorInstance.getValue();
        const lang = currentChallenge.language;
        const outputEl = document.getElementById('lab-output');
        const resultsEl = document.getElementById('lab-test-results');

        outputEl.innerHTML = '<span class="lab-output-running">⚡ Ejecutando...</span>';
        resultsEl.innerHTML = '';

        try {
            if (lang === 'javascript') {
                await runJS(code, outputEl, resultsEl);
            } else if (lang === 'python') {
                await runPython(code, outputEl, resultsEl);
            } else if (lang === 'php') {
                await runPHP(code, outputEl, resultsEl);
            }
        } catch (err) {
            outputEl.innerHTML = `<span class="lab-output-error">❌ Error: ${escHtml(err.message)}</span>`;
        }
    }

    async function runJS(code, outputEl, resultsEl) {
        const tests = currentChallenge.testCases || [];
        let consoleLog = [];
        const origLog = console.log;
        console.log = (...args) => {
            consoleLog.push(args.map(String).join(' '));
            origLog(...args);
        };

        let userFunc;
        try {
            // Wrap user code in a function factory
            const wrappedCode = `
(function() {
    ${code}
    // Try to return the last defined function
    const fnNames = Object.getOwnPropertyNames(this).filter(k => typeof this[k] === 'function');
    if (typeof solution !== 'undefined') return solution;
    if (fnNames.length > 0) return eval(fnNames[fnNames.length-1]);
    return null;
}).call({})`;
            userFunc = eval(wrappedCode);
        } catch (e) {
            outputEl.innerHTML = `<span class="lab-output-error">❌ Error de sintaxis:\n${escHtml(e.message)}</span>`;
            console.log = origLog;
            return;
        }

        console.log = origLog;

        // Console output
        if (consoleLog.length > 0) {
            outputEl.innerHTML = `<span class="lab-output-log">${escHtml(consoleLog.join('\n'))}</span>`;
        } else {
            outputEl.innerHTML = `<span class="lab-output-info">Sin salida por consola</span>`;
        }

        // Run test cases
        if (tests.length > 0 && userFunc) {
            renderTestResults(resultsEl, tests, (tc) => {
                try {
                    const result = Array.isArray(tc.input)
                        ? userFunc(...tc.input)
                        : userFunc(tc.input);
                    return { result, passed: deepEqual(result, tc.expected) };
                } catch (e) {
                    return { result: null, passed: false, error: e.message };
                }
            });
        } else if (!userFunc) {
            outputEl.innerHTML += `\n<span class="lab-output-warning">⚠️ No se encontró una función 'solution'. Asegúrate de definirla con ese nombre.</span>`;
        }
    }

    async function runPython(code, outputEl, resultsEl) {
        if (!pyodideReady) {
            outputEl.innerHTML = '<span class="lab-output-running">⏳ Iniciando motor Python, espera...</span>';
            await loadPyodideEngine();
        }

        const tests = currentChallenge.testCases || [];
        let stdout = '';
        pyodide.setStdout({ batched: (s) => stdout += s + '\n' });
        pyodide.setStderr({ batched: (s) => stdout += '[stderr] ' + s + '\n' });

        try {
            await pyodide.runPythonAsync(code);
        } catch (e) {
            outputEl.innerHTML = `<span class="lab-output-error">❌ Error:\n${escHtml(e.message)}</span>`;
            return;
        }

        outputEl.innerHTML = stdout
            ? `<span class="lab-output-log">${escHtml(stdout)}</span>`
            : `<span class="lab-output-info">Sin salida</span>`;

        // Run test cases
        if (tests.length > 0) {
            renderTestResults(resultsEl, tests, (tc) => {
                try {
                    const inputStr = JSON.stringify(tc.input);
                    const testCode = `
import json
_args = json.loads(${JSON.stringify(inputStr)})
_result = solution(*_args) if isinstance(_args, list) else solution(_args)
json.dumps(_result)`;
                    const resultStr = pyodide.runPython(testCode);
                    const result = JSON.parse(resultStr);
                    return { result, passed: deepEqual(result, tc.expected) };
                } catch (e) {
                    return { result: null, passed: false, error: e.message };
                }
            });
        }
    }

    async function runPHP(code, outputEl, resultsEl) {
        const tests = currentChallenge.testCases || [];
        
        let cleanCode = code.trim();
        if (cleanCode.startsWith('<?php')) {
            cleanCode = cleanCode.slice(5).trim();
        }
        if (cleanCode.endsWith('?>')) {
            cleanCode = cleanCode.slice(0, -2).trim();
        }

        const testsJson = JSON.stringify(tests);
        const phpTestScript = `
${cleanCode}

// --- AUTOMATED TEST RUNNER ---
$__tests = json_decode(${JSON.stringify(testsJson)}, true);
$__results = [];
foreach ($__tests as $__t) {
    try {
        if (!function_exists('solution')) {
            $__results[] = ['pass' => false, 'error' => "Función 'solution' no encontrada"];
            continue;
        }
        $__input = $__t['input'];
        $__expected = $__t['expected'];
        $__actual = is_array($__input) ? solution(...$__input) : solution($__input);
        
        $__pass = ($__actual === $__expected);
        if (!$__pass && is_array($__actual) && is_array($__expected)) {
            $__pass = (json_encode($__actual) === json_encode($__expected));
        }
        $__results[] = ['pass' => $__pass, 'actual' => $__actual, 'expected' => $__expected];
    } catch (Throwable $__e) {
        $__results[] = ['pass' => false, 'error' => $__e->getMessage()];
    }
}
echo "\\n---PHP_LAB_TESTS---\\n" . json_encode($__results);
`;

        try {
            const response = await fetch('/api/run-php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ code: phpTestScript })
            });

            if (response.ok) {
                const data = await response.json();
                if (data.ok) {
                    const rawOut = data.stdout || '';
                    const parts = rawOut.split('---PHP_LAB_TESTS---');
                    const userOutput = parts[0].trim();
                    const testResultsJson = parts[1] ? parts[1].trim() : null;

                    if (userOutput) {
                        outputEl.innerHTML = `<span class="lab-output-log">${escHtml(userOutput)}</span>`;
                    } else if (data.stderr) {
                        outputEl.innerHTML = `<span class="lab-output-warning">${escHtml(data.stderr)}</span>`;
                    } else {
                        outputEl.innerHTML = `<span class="lab-output-info">Código PHP ejecutado correctamente sin salida estándar</span>`;
                    }

                    if (testResultsJson) {
                        try {
                            const resultsList = JSON.parse(testResultsJson);
                            renderPHPResults(resultsEl, tests, resultsList);
                            return;
                        } catch (pe) {
                            console.error('Error parsing PHP test results:', pe);
                        }
                    } else if (data.stderr) {
                        outputEl.innerHTML = `<span class="lab-output-error">❌ Error en ejecución PHP:\n${escHtml(data.stderr)}</span>`;
                        return;
                    }
                } else if (data.error) {
                    outputEl.innerHTML = `<span class="lab-output-error">❌ Error:\n${escHtml(data.error)}</span>`;
                    return;
                }
            }
        } catch (err) {
            console.warn('Backend /api/run-php unreachable, trying php-wasm fallback...', err);
        }

        // Fallback: PhpWeb via WASM
        outputEl.innerHTML = '<span class="lab-output-running">⏳ Cargando entorno PHP WebAssembly en navegador...</span>';
        try {
            const { PhpWeb } = await import('https://cdn.jsdelivr.net/npm/php-wasm/PhpWeb.mjs');
            const php = new PhpWeb();
            let wasmStdout = '';
            php.addEventListener('output', (e) => { wasmStdout += e.detail; });
            php.addEventListener('error', (e) => { wasmStdout += '\n[error] ' + e.detail; });
            
            await php.run(`<?php ${phpTestScript} ?>`);
            
            const parts = wasmStdout.split('---PHP_LAB_TESTS---');
            const userOutput = parts[0].trim();
            const testResultsJson = parts[1] ? parts[1].trim() : null;

            outputEl.innerHTML = userOutput
                ? `<span class="lab-output-log">${escHtml(userOutput)}</span>`
                : `<span class="lab-output-info">Ejecutado con PHP WebAssembly</span>`;

            if (testResultsJson) {
                const resultsList = JSON.parse(testResultsJson);
                renderPHPResults(resultsEl, tests, resultsList);
            }
        } catch (wasmErr) {
            outputEl.innerHTML = `<span class="lab-output-error">❌ No se pudo ejecutar PHP: ${escHtml(wasmErr.message)}</span>`;
        }
    }

    function renderPHPResults(container, tests, resultsList) {
        let passed = 0;
        const html = tests.map((tc, i) => {
            const res = resultsList[i] || { pass: false, error: 'No ejecutado' };
            const ok = !!res.pass;
            if (ok) passed++;
            const icon = ok ? '✅' : '❌';
            const inputDisplay = Array.isArray(tc.input) ? tc.input.map(JSON.stringify).join(', ') : JSON.stringify(tc.input);
            return `<div class="lab-test-case ${ok ? 'pass' : 'fail'}">
                <span class="tc-icon">${icon}</span>
                <div class="tc-info">
                    <span class="tc-desc">${escHtml(tc.description || `Test ${i + 1}`)}</span>
                    <span class="tc-detail">Input: <code>${escHtml(inputDisplay)}</code> | Esperado: <code>${escHtml(JSON.stringify(tc.expected))}</code> | Obtenido: <code>${res.error ? '💥 ' + escHtml(res.error) : escHtml(JSON.stringify(res.actual))}</code></span>
                </div>
            </div>`;
        }).join('');

        const score = `<div class="lab-score ${passed === tests.length ? 'perfect' : passed > 0 ? 'partial' : 'zero'}">
            ${passed === tests.length ? '🏆 ¡Todos los tests pasados!' : `${passed}/${tests.length} tests correctos`}
        </div>`;

        container.innerHTML = score + html;

        if (passed === tests.length) {
            celebrateSuccess();
            saveLabProgress(currentChallenge.id, true, getElapsedTime());
        }
    }

    function renderTestResults(container, tests, runner) {
        let passed = 0;
        const html = tests.map((tc, i) => {
            const { result, passed: ok, error } = runner(tc);
            if (ok) passed++;
            const icon = ok ? '✅' : '❌';
            const inputDisplay = Array.isArray(tc.input) ? tc.input.map(JSON.stringify).join(', ') : JSON.stringify(tc.input);
            return `<div class="lab-test-case ${ok ? 'pass' : 'fail'}">
                <span class="tc-icon">${icon}</span>
                <div class="tc-info">
                    <span class="tc-desc">${escHtml(tc.description || `Test ${i + 1}`)}</span>
                    <span class="tc-detail">Input: <code>${escHtml(inputDisplay)}</code> | Esperado: <code>${escHtml(JSON.stringify(tc.expected))}</code> | Obtenido: <code>${error ? '💥 ' + escHtml(error) : escHtml(JSON.stringify(result))}</code></span>
                </div>
            </div>`;
        }).join('');

        const score = `<div class="lab-score ${passed === tests.length ? 'perfect' : passed > 0 ? 'partial' : 'zero'}">
            ${passed === tests.length ? '🏆 ¡Todos los tests pasados!' : `${passed}/${tests.length} tests correctos`}
        </div>`;

        container.innerHTML = score + html;

        if (passed === tests.length) {
            celebrateSuccess();
            saveLabProgress(currentChallenge.id, true, getElapsedTime());
        }
    }

    // ─── TIMER ───────────────────────────────────────────────────────────
    function startTimer() {
        startTime = Date.now();
        const timerEl = document.getElementById('lab-timer');
        if (timerEl) {
            clearInterval(timerInterval);
            timerInterval = setInterval(() => {
                const elapsed = Math.floor((Date.now() - startTime) / 1000);
                const m = Math.floor(elapsed / 60).toString().padStart(2, '0');
                const s = (elapsed % 60).toString().padStart(2, '0');
                timerEl.textContent = `⏱ ${m}:${s}`;
            }, 1000);
        }
    }

    function getElapsedTime() {
        return startTime ? Math.floor((Date.now() - startTime) / 1000) : 0;
    }

    // ─── HINTS ───────────────────────────────────────────────────────────
    function showNextHint() {
        if (!currentChallenge || !currentChallenge.hints) return;
        const hints = currentChallenge.hints;
        if (hintIndex >= hints.length) {
            showLabToast('No hay más pistas disponibles.');
            return;
        }
        const hintEl = document.getElementById('lab-hints-content');
        if (hintEl) {
            const hintDiv = document.createElement('div');
            hintDiv.className = 'lab-hint-item';
            hintDiv.innerHTML = `<span class="hint-num">💡 Pista ${hintIndex + 1}:</span> ${escHtml(hints[hintIndex])}`;
            hintEl.appendChild(hintDiv);
            hintDiv.scrollIntoView({ behavior: 'smooth' });
        }
        hintIndex++;
    }

    // ─── PROGRESS SAVE ───────────────────────────────────────────────────
    function saveLabProgress(challengeId, success, timeSeconds) {
        const key = `lab_progress_${challengeId}`;
        const data = { success, timeSeconds, completedAt: new Date().toISOString() };
        localStorage.setItem(key, JSON.stringify(data));

        // Update overall lab stats
        const statsKey = 'lab_stats';
        const stats = JSON.parse(localStorage.getItem(statsKey) || '{"completed":0,"totalTime":0}');
        if (success) {
            stats.completed++;
            stats.totalTime += timeSeconds;
        }
        localStorage.setItem(statsKey, JSON.stringify(stats));
    }

    function getChallengeProgress(challengeId) {
        const data = localStorage.getItem(`lab_progress_${challengeId}`);
        return data ? JSON.parse(data) : null;
    }

    // ─── UI HELPERS ───────────────────────────────────────────────────────
    function celebrateSuccess() {
        const overlay = document.getElementById('lab-success-overlay');
        if (overlay) {
            overlay.classList.remove('hidden');
            setTimeout(() => overlay.classList.add('hidden'), 3000);
        }
    }

    function showLabToast(msg) {
        let toast = document.getElementById('lab-toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'lab-toast';
            toast.className = 'lab-toast';
            document.body.appendChild(toast);
        }
        toast.textContent = msg;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 2500);
    }

    function deepEqual(a, b) {
        if (a === b) return true;
        if (typeof a !== typeof b) return false;
        if (Array.isArray(a) && Array.isArray(b)) {
            if (a.length !== b.length) return false;
            return a.every((v, i) => deepEqual(v, b[i]));
        }
        if (typeof a === 'object' && a !== null && b !== null) {
            const keysA = Object.keys(a), keysB = Object.keys(b);
            if (keysA.length !== keysB.length) return false;
            return keysA.every(k => deepEqual(a[k], b[k]));
        }
        // Numeric tolerance for floats
        if (typeof a === 'number' && typeof b === 'number') {
            return Math.abs(a - b) < 1e-9;
        }
        return false;
    }

    function escHtml(str) {
        if (str == null) return '';
        return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }

    // ─── PUBLIC API ────────────────────────────────────────────────────────
    function openChallenge(challenge) {
        currentChallenge = challenge;
        hintIndex = 0;
        clearInterval(timerInterval);

        const labModal = document.getElementById('lab-modal');
        const labRoot = document.getElementById('lab-root');
        if (!labModal || !labRoot) return;

        labRoot.innerHTML = buildLabUI(challenge);
        labModal.classList.remove('hidden');

        // Init CodeMirror after DOM is ready
        setTimeout(() => {
            const editorContainer = document.getElementById('lab-editor-container');
            if (editorContainer) {
                initEditor(editorContainer, challenge.language, challenge.starterCode);
            }
            startTimer();
            if (challenge.language === 'python' && !pyodideReady) {
                loadPyodideEngine();
            }
        }, 100);
    }

    function buildLabUI(challenge) {
        const langMap = {
            python: '🐍 Python',
            javascript: '🟨 JavaScript',
            php: '🐘 PHP 8.3'
        };
        const lang = langMap[challenge.language] || challenge.language;
        const diffColor = { basic: '#22d3ee', intermediate: '#f59e0b', advanced: '#ef4444' };
        const diffLabel = { basic: 'Básico', intermediate: 'Intermedio', advanced: 'Avanzado' };

        const progress = getChallengeProgress(challenge.id);
        const progressBadge = progress?.success
            ? `<span class="lab-completed-badge">✅ Completado</span>`
            : '';

        return `
        <div class="lab-container">
            <!-- Header -->
            <div class="lab-header">
                <div class="lab-header-left">
                    <div class="lab-meta">
                        <span class="lab-lang-badge">${lang}</span>
                        <span class="lab-difficulty" style="background:${diffColor[challenge.difficulty]}22;color:${diffColor[challenge.difficulty]}">
                            ${diffLabel[challenge.difficulty]}
                        </span>
                        ${progressBadge}
                    </div>
                    <h2 class="lab-title">${escHtml(challenge.title)}</h2>
                </div>
                <div class="lab-header-right">
                    <span id="lab-timer" class="lab-timer">⏱ 00:00</span>
                    ${challenge.language === 'python' ? '<span id="lab-py-status" class="lab-py-status">🐍 Python</span>' : (challenge.language === 'php' ? '<span id="lab-php-status" class="lab-py-status" style="background:rgba(99,102,241,0.2);color:#818cf8;border:1px solid rgba(99,102,241,0.3)">🐘 PHP 8.3</span>' : '')}
                </div>
            </div>

            <!-- Body split -->
            <div class="lab-body">
                <!-- Left: instructions + tests -->
                <div class="lab-panel-left">
                    <div class="lab-instructions">
                        <h3>📋 Enunciado</h3>
                        <p>${challenge.description}</p>
                    </div>
                    <div class="lab-test-section">
                        <h3>🧪 Tests</h3>
                        <div id="lab-test-results" class="lab-test-results"></div>
                    </div>
                    <div class="lab-hints-section">
                        <button class="lab-hint-btn" onclick="LabEngine.showHint()">💡 Ver pista</button>
                        <div id="lab-hints-content" class="lab-hints-content"></div>
                    </div>
                </div>

                <!-- Right: editor + output -->
                <div class="lab-panel-right">
                    <div class="lab-toolbar">
                        <button class="lab-run-btn" onclick="LabEngine.run()" title="Ctrl+Enter">
                            ▶ Ejecutar
                        </button>
                        <button class="lab-reset-btn" onclick="LabEngine.resetCode()">↺ Reiniciar</button>
                        <button class="lab-solution-btn" onclick="LabEngine.toggleSolution()">👁 Solución</button>
                    </div>
                    <div id="lab-editor-container" class="lab-editor-container"></div>
                    <div class="lab-output-section">
                        <div class="lab-output-header">📤 Salida</div>
                        <pre id="lab-output" class="lab-output">Haz click en "▶ Ejecutar" para ver el resultado...</pre>
                    </div>
                </div>
            </div>

            <!-- Success overlay -->
            <div id="lab-success-overlay" class="lab-success-overlay hidden">
                <div class="lab-success-inner">
                    <div class="lab-success-icon">🏆</div>
                    <h2>¡Ejercicio completado!</h2>
                    <p>¡Todos los tests han pasado! Excelente trabajo.</p>
                </div>
            </div>
        </div>`;
    }

    function resetCode() {
        if (editorInstance && currentChallenge) {
            editorInstance.setValue(currentChallenge.starterCode || '');
            document.getElementById('lab-output').innerHTML = 'Código reiniciado.';
            document.getElementById('lab-test-results').innerHTML = '';
        }
    }

    let showingSolution = false;
    function toggleSolution() {
        if (!editorInstance || !currentChallenge?.solution) return;
        showingSolution = !showingSolution;
        if (showingSolution) {
            editorInstance.setValue(currentChallenge.solution);
            showLabToast('👁 Mostrando solución de referencia');
        } else {
            editorInstance.setValue(currentChallenge.starterCode || '');
            showLabToast('↺ Código del ejercicio restaurado');
        }
    }

    return {
        openChallenge,
        run: runCode,
        showHint: showNextHint,
        resetCode,
        toggleSolution,
        loadPython: loadPyodideEngine,
    };
})();

// Global shortcut
function openLab(challenge) {
    LabEngine.openChallenge(challenge);
}
function closeLab() {
    const modal = document.getElementById('lab-modal');
    if (modal) modal.classList.add('hidden');
}
