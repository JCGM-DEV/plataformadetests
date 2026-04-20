// =============================================
// GIT LAB — Visual Simulator
// =============================================

let gitRepo = {
  initialized: false,
  commits: [], // { id, hash, msg, parent, x, y }
  branches: { 'master': null },
  head: 'master', // Can be a branch name or commit hash (detached)
  staging: [],
  workingDir: ['index.html', 'style.css'], // Simulated files
  currentChallengeIdx: -1
};

function showGitLab() {
  const view = document.getElementById('git-view');
  view.classList.remove('hidden');
  resetGitRepo();
  initGitInput();
  renderGitViz(); // Ensure UI is ready
}

function resetGitRepo() {
  gitRepo = {
    initialized: false,
    commits: [],
    branches: { 'master': null },
    head: 'master',
    staging: [],
    workingDir: ['index.html', 'style.css'],
  };
  const output = document.getElementById('git-output');
  if (output) output.innerHTML = '<div>Bienvenido al Simulador de Git. Inicia un repositorio para comenzar.</div>';
  renderGitViz();
}

function initGitInput() {
  const input = document.getElementById('git-input');
  if (!input) return;
  input.onkeypress = (e) => {
    if (e.key === 'Enter') {
      const val = input.value.trim();
      if (val) executeGitCommand(val);
      input.value = '';
    }
  };
}

function executeGitCommand(fullCmd) {
  const output = document.getElementById('git-output');
  const addLog = (msg, type = '') => {
    const div = document.createElement('div');
    div.className = type;
    div.innerHTML = msg;
    output.appendChild(div);
    output.scrollTop = output.scrollHeight;
  };

  addLog(`<span class="cmd">$ ${fullCmd}</span>`);

  const parts = fullCmd.split(/\s+/);
  const base = parts[0];
  const cmd = parts[1];
  const args = parts.slice(2);

  if (base !== 'git') {
    addLog(`Comando desconocido: ${base}. Usa comandos que empiecen por "git".`, 'err');
    return;
  }

  if (cmd === 'init') {
    if (gitRepo.initialized) {
      addLog('Ya existe un repositorio Git en este directorio.', 'warn');
    } else {
      gitRepo.initialized = true;
      addLog('Repositorio Git vacío inicializado.', 'suc');
    }
  } else if (!gitRepo.initialized) {
    addLog('fatal: no es un repositorio git (ni ninguno de los directorios superiores)', 'err');
  } else {
    // Command logic when initialized
    switch (cmd) {
      case 'status':
        if (gitRepo.staging.length === 0) {
          addLog('On branch ' + gitRepo.head);
          addLog('nothing to commit, working tree clean');
        } else {
          addLog('On branch ' + gitRepo.head);
          addLog('Changes to be committed:');
          gitRepo.staging.forEach(f => addLog(`&nbsp;&nbsp;<span class="suc">modified: ${f}</span>`));
        }
        break;

      case 'add':
        if (args[0] === '.' || args[0] === '-A') {
          gitRepo.staging = [...gitRepo.workingDir];
          addLog('Archivos añadidos al área de preparación (staging).');
        } else if (gitRepo.workingDir.includes(args[0])) {
          if (!gitRepo.staging.includes(args[0])) gitRepo.staging.push(args[0]);
          addLog(`Añadido ${args[0]} al staging.`);
        } else {
          addLog(`fatal: pathspec '${args[0]}' no coincide con ningún archivo`, 'err');
        }
        break;

      case 'commit':
        let msg = args.join(' ');
        if (msg.includes('-m')) {
           msg = msg.split('-m')[1].replace(/['"]/g, '').trim();
        } else {
           msg = "Manual commit";
        }

        if (gitRepo.staging.length === 0) {
          addLog('nothing to commit, working tree clean', 'warn');
        } else {
          const parentHash = gitRepo.branches[gitRepo.head] || (gitRepo.commits.length > 0 ? gitRepo.commits[gitRepo.commits.length-1].hash : null);
          const newHash = Math.random().toString(16).substring(2, 8);
          const newCommit = {
            hash: newHash,
            msg: msg,
            parent: parentHash,
            x: 50 + gitRepo.commits.length * 80,
            y: 100
          };
          gitRepo.commits.push(newCommit);
          gitRepo.branches[gitRepo.head] = newHash;
          gitRepo.staging = [];
          addLog(`[${gitRepo.head} ${newHash}] ${msg}`, 'suc');
          addLog(`${gitRepo.workingDir.length} files changed, insertions(+)`);
        }
        break;

      case 'branch':
        if (args.length === 0) {
          Object.keys(gitRepo.branches).forEach(b => {
             addLog((b === gitRepo.head ? '* ' : '  ') + b, b === gitRepo.head ? 'suc' : '');
          });
        } else {
          const bName = args[0];
          if (gitRepo.branches[bName]) {
            addLog(`fatal: la rama '${bName}' ya existe`, 'err');
          } else {
            gitRepo.branches[bName] = gitRepo.branches[gitRepo.head];
            addLog(`Rama '${bName}' creada.`);
          }
        }
        break;

      case 'checkout':
        const target = args[0];
        if (gitRepo.branches[target] !== undefined) {
          gitRepo.head = target;
          addLog(`Cambiado a la rama '${target}'`, 'suc');
        } else {
          addLog(`error: pathspec '${target}' no coincide con ninguna rama conocida`, 'err');
        }
        break;

      case 'log':
        if (gitRepo.commits.length === 0) {
          addLog('fatal: tu rama actual no tiene ningún commit todavía', 'err');
        } else {
          [...gitRepo.commits].reverse().forEach(c => {
             addLog(`<span class="warn">commit ${c.hash}</span>`);
             addLog(`Author: DAW Student`);
             addLog(`Date: ${new Date().toLocaleDateString()}`);
             addLog(`&nbsp;&nbsp;&nbsp;&nbsp;${c.msg}`);
             addLog('');
          });
        }
        break;

      default:
        addLog(`git: '${cmd}' no es un comando de git. Prueba status, add, commit, branch, checkout, log.`, 'err');
    }
  }

  renderGitViz();
  checkGitChallenges();
}

function renderGitViz() {
  const canvas = document.getElementById('git-canvas');
  if (!canvas) return;

  // Render Challenge Pane if active
  let challengeHtml = '';
  if (gitRepo.currentChallengeIdx !== -1) {
    const ex = GIT_CHALLENGES[gitRepo.currentChallengeIdx];
    challengeHtml = `
      <div id="git-challenge-panel" class="exercise-panel">
        <div class="ex-panel-content">
          <div class="ex-tag">DESAFÍO GIT</div>
          <h4>${ex.title}</h4>
          <p>${ex.scenario}</p>
          <div style="margin-top:1rem;display:flex;gap:0.75rem">
            <button class="btn-help" onclick="showGitSolution()">💡 Ayuda</button>
            <button class="btn-secondary" style="padding:0.4rem 0.8rem;font-size:0.8rem" onclick="gitRepo.currentChallengeIdx = -1; renderGitViz()">✕ Cerrar</button>
          </div>
        </div>
      </div>`;
  }

  const selectorHtml = `
    <div class="lab-exercise-selector" style="position:absolute; top:10px; right:10px; z-index:100">
      <button class="btn-secondary" onclick="toggleGitExerciseList()">🎯 Desafíos Git</button>
      <div id="git-exercise-dropdown" class="exercise-dropdown hidden">
        ${GIT_CHALLENGES.map((ex, i) => `
          <div class="ex-option" onclick="startGitChallenge(${i})">
            <strong>Ex ${i+1}:</strong> ${ex.title}
          </div>
        `).join('')}
      </div>
    </div>`;

  if (!gitRepo.initialized) {
    canvas.innerHTML = selectorHtml + challengeHtml + '<div class="viz-placeholder">Inicia un repositorio con "git init"</div>';
    return;
  }

  if (gitRepo.commits.length === 0) {
    canvas.innerHTML = selectorHtml + challengeHtml + '<div class="viz-placeholder">Repositorio vacío. Haz tu primer commit.</div>';
    return;
  }

  canvas.innerHTML = selectorHtml + challengeHtml;
  
  // Draw lines
  gitRepo.commits.forEach(c => {
    if (c.parent) {
      const parent = gitRepo.commits.find(pc => pc.hash === c.parent);
      if (parent) {
        drawLine(canvas, parent.x, parent.y, c.x, c.y);
      }
    }
  });

  // Draw nodes
  gitRepo.commits.forEach(c => {
    const node = document.createElement('div');
    node.className = 'git-commit-node';
    if (gitRepo.branches[gitRepo.head] === c.hash) node.classList.add('current');
    
    node.innerHTML = `
      <div class="git-commit-label">${c.hash}</div>
      ${renderTagsForCommit(c.hash)}
    `;
    node.style.left = c.x + 'px';
    node.style.top = c.y + 'px';
    node.title = c.msg;
    canvas.appendChild(node);
  });
}

function renderTagsForCommit(hash) {
  let tags = '';
  Object.keys(gitRepo.branches).forEach(b => {
    if (gitRepo.branches[b] === hash) {
      tags += `<div class="git-branch-tag ${b === gitRepo.head ? 'head' : ''}">${b === gitRepo.head ? 'HEAD → ' : ''}${b}</div>`;
    }
  });
  return tags;
}

function drawLine(parent, x1, y1, x2, y2) {
  const length = Math.sqrt((x1-x2)**2 + (y1-y2)**2);
  const angle = Math.atan2(y2-y1, x2-x1) * 180 / Math.PI;
  const line = document.createElement('div');
  line.className = 'git-line';
  line.style.width = length + 'px';
  line.style.left = x1 + 20 + 'px';
  line.style.top = y1 + 20 + 'px';
  line.style.transform = `rotate(${angle}deg)`;
  parent.appendChild(line);
}

function checkGitChallenges() {
  if (gitRepo.currentChallengeIdx === -1) return;
  const ex = GIT_CHALLENGES[gitRepo.currentChallengeIdx];
  if (ex.validate(gitRepo)) {
    showToast('¡Desafío completado! 🎉', 'success');
    // Add success message to terminal
    const output = document.getElementById('git-output');
    const div = document.createElement('div');
    div.className = 'suc';
    div.style.padding = '8px';
    div.style.borderLeft = '4px solid var(--green)';
    div.style.background = 'rgba(34,211,160,0.1)';
    div.innerHTML = `<strong>¡OBJETIVO LOGRADO!</strong> ${ex.title} completado con éxito.`;
    output.appendChild(div);
    output.scrollTop = output.scrollHeight;
    
    // Mark section as done in main app
    if (activeSection) {
       completedSections.add(activeSection);
       updateProgress();
       const el = document.getElementById('nav-' + activeSection);
       if (el && !el.querySelector('.item-done')) el.innerHTML += '<span class="item-done">✓</span>';
    }
  }
}

function toggleGitExerciseList() {
  document.getElementById('git-exercise-dropdown').classList.toggle('hidden');
}

function startGitChallenge(idx) {
  gitRepo.currentChallengeIdx = idx;
  toggleGitExerciseList();
  renderGitViz();
  showToast('Desafío iniciado: ' + GIT_CHALLENGES[idx].title, 'info');
}
