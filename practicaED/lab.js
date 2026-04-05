// =============================================
// LAB — Flowchart & UML Interactive Builder
// =============================================

let labNodes = [];
let labConnections = [];
let currentLabMode = 'flow'; // 'flow' (ud5) or 'uml' (ud4)
let currentExerciseIdx = -1;

function showLab() {
  const view = document.getElementById('lab-view');
  view.classList.remove('hidden');
  
  currentLabMode = activeSection && activeSection.startsWith('ud4') ? 'uml' : 'flow';
  currentExerciseIdx = -1;
  labNodes = [];
  labConnections = [];
  
  renderLabUI();
}

function renderLabUI() {
  const view = document.getElementById('lab-view');
  const exercises = LAB_EXERCISES[activeSection] || [];
  
  view.innerHTML = `
    <div class="lab-header">
      <div style="display:flex; justify-content:space-between; align-items:center">
        <div>
          <h2>🧪 Lab: ${currentLabMode === 'uml' ? 'Clases UML' : 'Diagramas de Flujo'}</h2>
          <p>Diseña diagramas profesionales con corrección en tiempo real.</p>
        </div>
        ${exercises.length > 0 ? `
          <div class="lab-exercise-selector">
            <button class="btn-secondary" onclick="toggleExerciseList()">
              ${currentExerciseIdx === -1 ? '🎯 Abrir Desafíos' : '🎯 Cambiar Ejercicio'}
            </button>
            <div id="exercise-dropdown" class="exercise-dropdown hidden">
              ${exercises.map((ex, i) => `
                <div class="ex-option" onclick="startExercise(${i})">
                  <strong>Ex ${i+1}:</strong> ${ex.title}
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}
      </div>
    </div>
    
    <div id="exercise-panel" class="exercise-panel ${currentExerciseIdx === -1 ? 'hidden' : ''}">
      ${currentExerciseIdx !== -1 ? renderExercisePanel(exercises[currentExerciseIdx]) : ''}
    </div>

    <div class="lab-workspace">
      <!-- Toolbox -->
      <aside class="lab-toolbox">
        <div class="toolbox-group">
          <h3>Herramientas</h3>
          <div class="toolbox-grid">
            ${renderToolbox()}
          </div>
        </div>
        
        <div class="toolbox-group">
          <h3>Elementos Actuales</h3>
          <div id="lab-node-list" class="node-list"></div>
        </div>

        <button class="btn-secondary" style="width:100%;margin-top:1rem" onclick="resetLab()">🗑️ Limpiar todo</button>
      </aside>

      <!-- Canvas -->
      <div class="lab-canvas-area">
        <div class="canvas-header">
          <span>Vista Previa</span>
          <div id="realtime-status" class="realtime-status">
             <!-- Status icon here -->
          </div>
          <button class="btn-tiny" onclick="downloadLabSVG()">💾 Descargar</button>
        </div>
        <div id="lab-canvas" class="lab-canvas"></div>
        
        <!-- REAL-TIME FEEDBACK BOARD -->
        <div id="lab-feedback" class="lab-feedback-board hidden">
           <div class="fb-icon">💡</div>
           <div class="fb-content">
             <div class="fb-title">Pista de corrección</div>
             <div id="fb-msg" class="fb-msg">...</div>
           </div>
        </div>
      </div>
    </div>
  `;
  updateLabCanvas();
  renderNodeList();
}

function renderToolbox() {
  if (currentLabMode === 'flow') {
    return `
      <button class="tool-btn" onclick="addLabNode('start')"><span class="tool-icon oval"></span> Inicio/Fin</button>
      <button class="tool-btn" onclick="addLabNode('process')"><span class="tool-icon rect"></span> Proceso</button>
      <button class="tool-btn" onclick="addLabNode('decision')"><span class="tool-icon diamond"></span> Decisión</button>
      <button class="tool-btn" onclick="addLabNode('io')"><span class="tool-icon para"></span> Ent/Sal</button>
    `;
  } else {
    return `
      <button class="tool-btn" onclick="addLabNode('class')"><span class="tool-icon rect" style="border-width:2px;border-style:double"></span> Clase</button>
      <button class="tool-btn" onclick="setLabRelation('inherit')"><span class="tool-icon">◁—</span> Herencia</button>
      <button class="tool-btn" onclick="setLabRelation('compose')"><span class="tool-icon">◆—</span> Comp.</button>
      <button class="tool-btn" onclick="setLabRelation('agg')"><span class="tool-icon">◇—</span> Agreg.</button>
      <button class="tool-btn" onclick="setLabRelation('assoc')"><span class="tool-icon">———</span> Asoc.</button>
    `;
  }
}

function renderExercisePanel(ex) {
  return `
    <div class="ex-panel-content">
      <div class="ex-tag">EJERCICIO ACTIVO</div>
      <h4>${ex.title}</h4>
      <p>${ex.scenario}</p>
    </div>
    <button class="ex-close" onclick="closeExercise()">✕ Cerrar desafío</button>
  `;
}

function toggleExerciseList() {
  document.getElementById('exercise-dropdown').classList.toggle('hidden');
}

function startExercise(idx) {
  currentExerciseIdx = idx;
  labNodes = [];
  labConnections = [];
  toggleExerciseList();
  renderLabUI();
  validateLabState(); // Initial check
}

function closeExercise() {
  currentExerciseIdx = -1;
  renderLabUI();
}

function addLabNode(type) {
  const node = {
    id: Date.now(),
    type: type,
    text: type === 'class' ? 'NombreClase' : (type === 'start' ? 'Inicio' : 'Nueva Acción'),
    attrs: currentLabMode === 'uml' ? ['- atributo : tipo'] : undefined,
    methods: currentLabMode === 'uml' ? ['+ metodo() : tipo'] : undefined,
    x: 250,
    y: 80 + labNodes.length * 100
  };
  labNodes.push(node);
  if (currentLabMode === 'flow' && labNodes.length > 1) {
    labConnections.push({ from: labNodes[labNodes.length-2].id, to: node.id, label: '' });
  }
  renderNodeList();
  updateLabCanvas();
  validateLabState();
}

function renderNodeList() {
  const list = document.getElementById('lab-node-list');
  if (!list) return;
  if (labNodes.length === 0) { list.innerHTML = '<p class="empty-msg">No hay elementos</p>'; return; }
  
  list.innerHTML = labNodes.map((n, i) => `
    <div class="node-edit-card">
      <div class="node-row">
        <span class="node-badge">${i+1}</span>
        <input type="text" value="${n.text}" oninput="updateNodeProperty(${n.id}, 'text', this.value)" placeholder="Nombre...">
        <button class="btn-del" onclick="removeNode(${n.id})">✕</button>
      </div>
      ${currentLabMode === 'uml' ? renderUMLInputs(n) : renderFlowInputs(n)}
    </div>
  `).join('');
}

function renderUMLInputs(n) {
  return `
    <div class="uml-subinputs">
      <textarea oninput="updateNodeProperty(${n.id}, 'attrs', this.value.split('\\n'))" placeholder="- atributo : int">${n.attrs.join('\n')}</textarea>
      <textarea oninput="updateNodeProperty(${n.id}, 'methods', this.value.split('\\n'))" placeholder="+ metodo() : void">${n.methods.join('\n')}</textarea>
      <div class="rel-control">
        <select onchange="addUMLRelation(${n.id}, this.value); this.selectedIndex=0">
          <option value="">Relacionar con...</option>
          ${labNodes.filter(other => other.id !== n.id).map(other => `<option value="${other.id}">${other.text}</option>`).join('')}
        </select>
      </div>
    </div>
  `;
}

function renderFlowInputs(n) {
  if (n.type === 'decision') {
    return `
      <div class="flow-subinputs">
        <input type="text" value="${getConnectionLabel(n.id)}" oninput="updateConnectionLabelUI(${n.id}, this.value)" placeholder="Etiqueta (Ej: Sí/No)">
      </div>
    `;
  }
  return '';
}

function updateNodeProperty(id, prop, val) {
  const node = labNodes.find(n => n.id === id);
  if (node) node[prop] = val;
  updateLabCanvas();
  validateLabState();
}

function updateConnectionLabelUI(fromId, label) {
  const conn = labConnections.find(c => c.from === fromId);
  if (conn) conn.label = label;
  updateLabCanvas();
  validateLabState();
}

function getConnectionLabel(fromId) {
  const conn = labConnections.find(c => c.from === fromId);
  return conn ? conn.label : '';
}

function addUMLRelation(fromId, toId) {
  if (!toId) return;
  toId = parseInt(toId);
  const type = window.currentRelType || 'assoc';
  labConnections.push({ from: fromId, to: toId, type: type });
  updateLabCanvas();
  validateLabState();
}

function setLabRelation(type) {
  window.currentRelType = type;
  showToast('Conector: ' + type, 'info');
}

function removeNode(id) {
  labNodes = labNodes.filter(n => n.id !== id);
  labConnections = labConnections.filter(c => c.from !== id && c.to !== id);
  renderNodeList();
  updateLabCanvas();
  validateLabState();
}

function resetLab() {
  if (confirm('¿Limpiar todo?')) {
    labNodes = []; labConnections = [];
    renderNodeList(); updateLabCanvas();
    validateLabState();
  }
}

function validateLabState() {
  const feedback = document.getElementById('lab-feedback');
  const status = document.getElementById('realtime-status');
  if (!feedback || currentExerciseIdx === -1) return;
  
  const ex = LAB_EXERCISES[activeSection][currentExerciseIdx];
  const sol = ex.solution;
  let hint = "";
  let complete = false;

  if (currentLabMode === 'uml') {
    const mainNode = labNodes.find(n => n.text.toLowerCase().includes(sol.nodes[0].text.toLowerCase()));
    if (!mainNode) hint = sol.hints.wrong_name;
    else {
      const hasAttrs = sol.nodes[0].attrs ? sol.nodes[0].attrs.every(a => mainNode.attrs.some(ma => ma.toLowerCase().includes(a.toLowerCase()))) : true;
      const hasMeths = sol.nodes[0].methods ? sol.nodes[0].methods.every(m => mainNode.methods.some(mm => mm.toLowerCase().includes(m.toLowerCase()))) : true;
      
      if (!hasAttrs) hint = sol.hints.missing_attrs;
      else if (!hasMeths) hint = sol.hints.missing_meths;
      else if (sol.rels) {
        const hasRel = sol.rels.every(sr => {
          const fromNode = labNodes.find(ln => ln.text.toLowerCase().includes(sr.from.toLowerCase()));
          const toNode = labNodes.find(ln => ln.text.toLowerCase().includes(sr.to.toLowerCase()));
          return fromNode && toNode && labConnections.some(c => c.from === fromNode.id && c.to === toNode.id && c.type === sr.type);
        });
        if (!hasRel) hint = sol.hints.missing_rel || "Faltan relaciones.";
        else complete = true;
      } else {
        complete = true;
      }
    }
  } else {
    // Flow mode
    const hasStart = labNodes.some(n => n.text.toLowerCase().includes('inicio'));
    const hasEnd = labNodes.some(n => n.text.toLowerCase().includes('fin'));
    const hasDecision = labNodes.some(n => n.type === 'decision');
    
    if (!hasStart) hint = sol.hints.missing_start;
    else if (!hasDecision && sol.nodes_flow.includes('?')) hint = sol.hints.missing_decision;
    else if (!hasEnd) hint = sol.hints.missing_end;
    else {
      const allText = labNodes.map(n => n.text.toLowerCase());
      const missingKey = sol.nodes_flow.find(k => k !== '?' && !allText.some(t => t.includes(k.toLowerCase())));
      if (missingKey) hint = `Falta el bloque de: "${missingKey}"`;
      else complete = true;
    }
  }

  if (labNodes.length === 0) hint = "Empieza añadiendo elementos al lienzo.";

  if (complete) {
    feedback.classList.remove('hidden');
    feedback.className = "lab-feedback-board success";
    document.getElementById('fb-msg').innerHTML = "<strong>¡Felicidades!</strong> El diagrama cumple con todos los requisitos del desafío. 🚀";
    status.innerHTML = '<span class="status-icon success">●</span> Correcto';
  } else if (hint) {
    feedback.classList.remove('hidden');
    feedback.className = "lab-feedback-board info";
    document.getElementById('fb-msg').textContent = hint;
    status.innerHTML = '<span class="status-icon info">●</span> Trabajando...';
  } else {
    feedback.classList.add('hidden');
  }
}

function updateLabCanvas() {
  const canvas = document.getElementById('lab-canvas');
  if (!canvas) return;
  if (labNodes.length === 0) { canvas.innerHTML = '<div class="canvas-empty">Añade elementos desde la izquierda</div>'; return; }
  
  let svgContent = '';
  // Connections
  labConnections.forEach(c => {
    const from = labNodes.find(n => n.id === c.from);
    const to = labNodes.find(n => n.id === c.to);
    if (!from || !to) return;
    
    if (currentLabMode === 'flow') {
      svgContent += `<line x1="${from.x}" y1="${from.y + 20}" x2="${to.x}" y2="${to.y - 20}" stroke="#4a4a7a" stroke-width="2" marker-end="url(#arrowAct)"/>`;
      if (c.label) svgContent += `<text x="${from.x + 12}" y="${(from.y + to.y)/2}" fill="#fbbf24" font-size="11" font-family="Inter" font-weight="600">${c.label}</text>`;
    } else {
      const marker = c.type === 'inherit' || c.type === 'agg' || c.type === 'compose' ? '' : 'url(#arrowAssoc)';
      const markerEnd = c.type === 'inherit' ? 'url(#arrowInherit)' : marker;
      const color = c.type === 'compose' ? '#f87171' : (c.type === 'agg' ? '#60a5fa' : '#9898b8');
      
      svgContent += `<line x1="${from.x}" y1="${from.y}" x2="${to.x}" y2="${to.y}" stroke="${color}" stroke-width="2" marker-end="${markerEnd}"/>`;
      if (c.type === 'compose') {
        svgContent += `<polygon points="${from.x},${from.y} ${from.x+6},${from.y+6} ${from.x+12},${from.y} ${from.x+6},${from.y-6}" fill="#f87171" transform="translate(-6,0)"/>`;
      } else if (c.type === 'agg') {
        svgContent += `<polygon points="${from.x},${from.y} ${from.x+6},${from.y+6} ${from.x+12},${from.y} ${from.x+6},${from.y-6}" fill="#1a1a30" stroke="#60a5fa" stroke-width="2" transform="translate(-6,0)"/>`;
      }
    }
  });

  // Nodes
  labNodes.forEach(n => {
    if (currentLabMode === 'flow') {
      const w = 150, h = 42;
      if (n.type === 'start') svgContent += `<rect x="${n.x - w/2}" y="${n.y - h/2}" width="${w}" height="${h}" rx="21" class="act-rect"/>`;
      else if (n.type === 'process') svgContent += `<rect x="${n.x - w/2}" y="${n.y - h/2}" width="${w}" height="${h}" class="act-rect" rx="6"/>`;
      else if (n.type === 'decision') svgContent += `<polygon points="${n.x},${n.y-30} ${n.x+75},${n.y} ${n.x},${n.y+30} ${n.x-75},${n.y}" class="act-diamond" style="fill:#161628;stroke:#fbbf24;stroke-width:2"/>`;
      else if (n.type === 'io') svgContent += `<polygon points="${n.x-65},${n.y+21} ${n.x+75},${n.y+21} ${n.x+65},${n.y-21} ${n.x-75},${n.y-21}" class="act-rect" style="fill:rgba(124, 92, 252, 0.08);stroke:#7c5cfc"/>`;
      svgContent += `<text x="${n.x}" y="${n.y+5}" text-anchor="middle" class="act-text" style="font-weight:600;font-size:12px">${n.text}</text>`;
    } else {
      const w = 180;
      const hAttr = Math.max(1, n.attrs.length) * 18 + 10;
      const hMeth = Math.max(1, n.methods.length) * 18 + 10;
      const totalH = 34 + hAttr + hMeth;
      svgContent += `<g transform="translate(${n.x - w/2},${n.y - 20})">
        <rect width="${w}" height="${totalH}" class="uml-rect" rx="6"/>
        <rect width="${w}" height="32" class="uml-rect-header" style="fill:#252545" rx="6 6 0 0"/>
        <text x="${w/2}" y="21" text-anchor="middle" class="uml-text-name" style="fill:#fff;font-size:12px">${n.text}</text>
        <line x1="0" y1="32" x2="${w}" y2="32" class="uml-line"/>
        ${n.attrs.map((a, i) => `<text x="10" y="${50 + i*18}" style="fill:#22d3a0;font-size:11px;font-family:JetBrains Mono">${a}</text>`).join('')}
        <line x1="0" y1="${34 + hAttr}" x2="${w}" y2="${34 + hAttr}" class="uml-line"/>
        ${n.methods.map((m, i) => `<text x="10" y="${34 + hAttr + 18 + i*18}" style="fill:#a78bfa;font-size:11px;font-family:JetBrains Mono">${m}</text>`).join('')}
      </g>`;
    }
  });

  const maxHeight = Math.max(500, ...labNodes.map(n => n.y + 120));
  canvas.innerHTML = `<svg viewBox="0 0 500 ${maxHeight}" xmlns="http://www.w3.org/2000/svg" style="width:100%">${SVG_DEFS}${svgContent}</svg>`;
}

function downloadLabSVG() {
  const svg = document.querySelector('#lab-canvas svg');
  if (!svg) return;
  const serializer = new XMLSerializer();
  const source = '<?xml version="1.0" standalone="no"?>\r\n' + serializer.serializeToString(svg);
  const url = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(source);
  const link = document.createElement("a");
  link.href = url;
  link.download = `mi-diagrama-${Date.now()}.svg`;
  link.click();
}
