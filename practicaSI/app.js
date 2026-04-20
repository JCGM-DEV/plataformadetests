let currentMode = 'linux';
let currentChallengeIdx = -1;
let state = {
  cwd: '/',
  fs: {},
  history: [],
  completedChallenges: new Set()
};

const terminalInput = document.getElementById('terminal-input');
const terminalOutput = document.getElementById('terminal-output');
const promptString = document.getElementById('prompt-string');

// ── INITIALIZATION ──────────────────────────────────────────
function selectUnit(mode) {
  currentMode = mode;
  state.cwd = mode === 'linux' ? '/' : '\\';
  state.fs = JSON.parse(JSON.stringify(DATA[mode].initialFS));
  state.completedChallenges.clear();
  
  document.getElementById('splash').classList.add('hidden');
  document.getElementById('app').classList.remove('hidden');
  document.getElementById('topbar-unit').textContent = DATA[mode].unit;
  
  renderSidebar();
  updatePrompt();
  writeLine(mode === 'linux' ? 'Virtual Linux Shell v1.0.0' : 'Microsoft Windows [Versión 10.0.19045]');
  writeLine('Escribe "help" para ver comandos disponibles.');
  
  terminalInput.focus();
}

function renderSidebar() {
  const nav = document.getElementById('sidebar-nav');
  nav.innerHTML = '';
  const challenges = DATA[currentMode].challenges;
  
  challenges.forEach((ch, idx) => {
    const item = document.createElement('div');
    item.className = `nav-item ${currentChallengeIdx === idx ? 'active' : ''} ${state.completedChallenges.has(ch.id) ? 'completed' : ''}`;
    item.onclick = () => loadChallenge(idx);
    
    item.innerHTML = `
      <div class="nav-icon">${state.completedChallenges.has(ch.id) ? '✅' : '📥'}</div>
      <div class="nav-details">
        <h4>${ch.title}</h4>
        <span>${ch.difficulty}</span>
      </div>
    `;
    nav.appendChild(item);
  });
  
  updateProgress();
}

function updateProgress() {
  const total = DATA[currentMode].challenges.length;
  const done = state.completedChallenges.size;
  document.getElementById('challenge-count').textContent = `${done}/${total}`;
  document.getElementById('progress-bar').style.width = `${(done / total) * 100}%`;
}

// ── CHALLENGE ENGINE ────────────────────────────────────────
function loadChallenge(idx) {
  currentChallengeIdx = idx;
  const ch = DATA[currentMode].challenges[idx];
  
  document.getElementById('challenge-title').textContent = ch.title;
  document.getElementById('challenge-desc').innerHTML = ch.desc;
  document.getElementById('challenge-diff').textContent = ch.difficulty;
  document.getElementById('challenge-hint').classList.add('hidden');
  document.getElementById('btn-help').classList.remove('hidden');
  
  renderSidebar();
}

function showSolution() {
  const currentChallenge = DATA[currentMode].challenges[currentChallengeIdx];
  if (!currentChallenge) return;

  const modal = document.getElementById('modal-overlay');
  const content = document.getElementById('modal-content');
  
  content.innerHTML = `
    <h3>💡 Comando de Solución</h3>
    <p>Si tienes dudas sobre cómo resolver este desafío, aquí tienes el comando sugerido:</p>
    <div class="code-block">
      <code>${currentChallenge.hint}</code>
    </div>
    <div style="margin-top:2rem; display:flex; gap:1rem;">
      <button class="btn-primary" onclick="pasteCommand('${currentChallenge.hint.replace(/'/g, "\\'")}')">Pegar en Terminal</button>
      <button class="btn-secondary" onclick="closeModal()">Cerrar</button>
    </div>
  `;
  
  modal.classList.remove('hidden');
}

function closeModal() {
  document.getElementById('modal-overlay').classList.add('hidden');
}

function pasteCommand(cmd) {
  terminalInput.value = cmd;
  terminalInput.focus();
  closeModal();
  showToast('Comando listo en la terminal');
}

function showHint() {
  const ch = DATA[currentMode].challenges[currentChallengeIdx];
  if (!ch) return;
  document.getElementById('hint-text').textContent = ch.hint;
  document.getElementById('challenge-hint').classList.remove('hidden');
}

// ── TERMINAL ENGINE ─────────────────────────────────────────
terminalInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    const cmd = terminalInput.value.trim();
    if (cmd) {
      processCommand(cmd);
      terminalInput.value = '';
    }
  }
});

function writeLine(text, classes = '') {
  const div = document.createElement('div');
  div.className = `out-line ${classes}`;
  div.textContent = text;
  terminalOutput.appendChild(div);
  terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

function updatePrompt() {
  const user = currentMode === 'linux' ? 'user@virtual-daw' : 'C:';
  const sep = currentMode === 'linux' ? ':' : '>';
  const end = currentMode === 'linux' ? '$' : '';
  promptString.textContent = `${user}${sep}${state.cwd}${end} `;
}

function processCommand(raw) {
  writeLine(`${promptString.textContent}${raw}`);
  
  const parts = raw.split(/\s+/);
  const cmd = parts[0].toLowerCase();
  const args = parts.slice(1);
  
  // Basic Logic
  if (cmd === 'help') {
    if (currentMode === 'linux') {
      writeLine('Comandos: ls, cd, mkdir, rm, chmod, grep, cat, echo, ps, ifconfig, pwd, clear, hint');
    } else {
      writeLine('Comandos: dir, cd, md, rd, del, attrib, type, echo, tasklist, ipconfig, cls, hint');
    }
    return;
  }
  
  if (cmd === 'clear' || cmd === 'cls') {
    terminalOutput.innerHTML = '';
    return;
  }

  if (cmd === 'hint') {
    showHint();
    return;
  }

  // Common commands implementation (simplified simulation)
  try {
    handleCoreCommands(cmd, args);
  } catch (err) {
    writeLine(`Error: ${err.message}`, 'out-error');
  }

  updatePrompt();
  checkChallenge(raw);
}

function handleCoreCommands(cmd, args) {
  const sep = currentMode === 'linux' ? '/' : '\\';

  // LS / DIR
  if (cmd === 'ls' || cmd === 'dir') {
    const files = Object.keys(state.fs).filter(p => {
      if (state.cwd === sep) return p.split(sep).length === 2;
      return p.startsWith(state.cwd + (state.cwd.endsWith(sep) ? '' : sep)) && p.replace(state.cwd, '').split(sep).filter(x => x).length === 1;
    });
    
    if (files.length === 0) writeLine('Directorio vacío.');
    files.forEach(f => {
      const name = f.split(sep).pop();
      const isDir = state.fs[f].type === 'dir';
      writeLine(`${isDir ? '[DIR] ' : '      '}${name}`);
    });
    return;
  }

  // CD
  if (cmd === 'cd') {
    const target = args[0];
    if (!target) return;
    if (target === '..') {
      if (state.cwd === sep) return;
      const parts = state.cwd.split(sep).filter(x => x);
      parts.pop();
      state.cwd = sep + parts.join(sep);
      return;
    }
    
    let fullPath = state.cwd + (state.cwd.endsWith(sep) ? '' : sep) + target;
    if (state.fs[fullPath] && state.fs[fullPath].type === 'dir') {
      state.cwd = fullPath;
    } else {
      throw new Error(`El directorio "${target}" no existe.`);
    }
    return;
  }

  // MKDIR / MD
  if (cmd === 'mkdir' || cmd === 'md') {
    const name = args[0];
    if (!name) throw new Error('Nombre de carpeta requerido.');
    let fullPath = state.cwd + (state.cwd.endsWith(sep) ? '' : sep) + name;
    state.fs[fullPath] = { type: 'dir' };
    writeLine(`Directorio creado: ${name}`);
    return;
  }

  // CHMOD (Linux only)
  if (cmd === 'chmod' && currentMode === 'linux') {
    const perms = args[0];
    const file = args[1];
    let fullPath = state.cwd + (state.cwd.endsWith(sep) ? '' : sep) + file;
    if (state.fs[fullPath]) {
      state.fs[fullPath].permissions = perms;
      writeLine(`Permisos de "${file}" cambiados a ${perms}`);
    } else throw new Error('Archivo no encontrado.');
    return;
  }

  // ATTRIB (Windows only)
  if (cmd === 'attrib' && currentMode === 'windows') {
    const flag = args[0]; // +r, -r
    const file = args[1];
    let fullPath = state.cwd + (state.cwd.endsWith(sep) ? '' : sep) + file;
    if (state.fs[fullPath]) {
      if (!state.fs[fullPath].attrs) state.fs[fullPath].attrs = [];
      if (flag === '+r') state.fs[fullPath].attrs.push('R');
      writeLine(`Atributos actualizados.`);
    } else throw new Error('Archivo no encontrado.');
    return;
  }

  // CAT / TYPE
  if (cmd === 'cat' || cmd === 'type') {
    const file = args[0];
    if (!file) throw new Error('Nombre de archivo requerido.');
    let fullPath = state.cwd + (state.cwd.endsWith(sep) ? '' : sep) + file;
    if (state.fs[fullPath] && state.fs[fullPath].type !== 'dir') {
      writeLine(state.fs[fullPath].content || '[Archivo vacío]');
    } else throw new Error('Archivo no encontrado o es un directorio.');
    return;
  }

  // ECHO (Simple implementation with redirection support)
  if (cmd === 'echo') {
    const redirectIdx = args.indexOf('>');
    if (redirectIdx !== -1) {
      const content = args.slice(0, redirectIdx).join(' ');
      const fileName = args[redirectIdx + 1];
      if (!fileName) throw new Error('Nombre de archivo requerido para redirección.');
      let fullPath = state.cwd + (state.cwd.endsWith(sep) ? '' : sep) + fileName;
      state.fs[fullPath] = { type: 'file', content: content };
      writeLine(`Redirigido a: ${fileName}`);
    } else {
      writeLine(args.join(' '));
    }
    return;
  }

  // RM / DEL
  if (cmd === 'rm' || cmd === 'del') {
    const file = args[0];
    if (!file) throw new Error('Nombre de archivo requerido.');
    let fullPath = state.cwd + (state.cwd.endsWith(sep) ? '' : sep) + file;
    if (state.fs[fullPath]) {
      delete state.fs[fullPath];
      writeLine(`Eliminado: ${file}`);
    } else throw new Error('Archivo no encontrado.');
    return;
  }

  // PS / TASKLIST
  if (cmd === 'ps' || cmd === 'tasklist') {
    writeLine(currentMode === 'linux' ? '  PID TTY          TIME CMD' : 'Nombre de la imagen            PID Nombre de sesió Núm. de ses Uso de memoria');
    writeLine(currentMode === 'linux' ? '    1 ?        00:00:01 init' : 'System Idle Process              0 Services                   0          8 KB');
    writeLine(currentMode === 'linux' ? '   42 ?        00:00:05 bash' : 'System                           4 Services                   0        124 KB');
    writeLine(currentMode === 'linux' ? '  128 ?        00:00:00 ps'   : 'svchost.exe                   1224 Services                   0     15,420 KB');
    return;
  }

  // IFCONFIG / IPCONFIG
  if (cmd === 'ifconfig' || cmd === 'ipconfig') {
    if (currentMode === 'linux') {
      writeLine('eth0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500');
      writeLine('      inet 192.168.1.15  netmask 255.255.255.0  broadcast 192.168.1.255');
    } else {
      writeLine('Adaptador de Ethernet Ethernet:');
      writeLine('   Dirección IPv4. . . . . . . . . . . . . . : 192.168.1.10');
      writeLine('   Máscara de subred . . . . . . . . . . . . : 255.255.255.0');
    }
    return;
  }

  // PWD
  if (cmd === 'pwd') {
    writeLine(state.cwd);
    return;
  }

  writeLine(`Comando no reconocido: ${cmd}`, 'out-error');
}

function checkChallenge(cmd) {
  if (currentChallengeIdx === -1) return;
  const ch = DATA[currentMode].challenges[currentChallengeIdx];
  
  if (ch.validate(state, cmd)) {
    if (!state.completedChallenges.has(ch.id)) {
      state.completedChallenges.add(ch.id);
      writeLine(`\n✔ ${ch.successMsg}`, 'out-success');
      showToast('¡Desafío completado!');
      renderSidebar();
      
      // Auto-load next
      if (currentChallengeIdx < DATA[currentMode].challenges.length - 1) {
        setTimeout(() => loadChallenge(currentChallengeIdx + 1), 1500);
      }
    }
  }
}

function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.remove('hidden');
  setTimeout(() => t.classList.add('hidden'), 3000);
}

function goHome() {
  window.location.href = '../index.html';
}

function resetCurrentChallenge() {
  state.fs = JSON.parse(JSON.stringify(DATA[currentMode].initialFS));
  state.cwd = currentMode === 'linux' ? '/' : '\\';
  writeLine('\n--- Sistema reiniciado para el desafío ---', 'out-dim');
  updatePrompt();
}
