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
    const ex = currentExerciseIdx !== -1 ? (LAB_EXERCISES[activeSection]?.[currentExerciseIdx]) : null;
    const requiredRel = ex?.solution?.rels?.[0]?.type || null;

    const relTypes = [
      { type: 'inherit', icon: '◁—', label: 'Herencia' },
      { type: 'compose', icon: '◆—', label: 'Comp.' },
      { type: 'agg',     icon: '◇—', label: 'Agreg.' },
      { type: 'assoc',   icon: '———', label: 'Asoc.' },
    ];

    const relButtons = relTypes.map(r => {
      const isSelected = window.currentRelType === r.type;
      const isRequired = requiredRel === r.type;
      const cls = isSelected ? 'tool-btn tool-btn--active' : (isRequired ? 'tool-btn tool-btn--hint' : 'tool-btn');
      return `<button class="${cls}" id="relbtn-${r.type}" onclick="selectRelTool('${r.type}')">
        <span class="tool-icon">${r.icon}</span> ${r.label}
        ${isRequired && !isSelected ? '<span class="tool-hint-badge">?</span>' : ''}
      </button>`;
    }).join('');

    return `
      <button class="tool-btn" onclick="addLabNode('class')"><span class="tool-icon rect" style="border-width:2px;border-style:double"></span> Clase</button>
      ${relButtons}
    `;
  }
}

function selectRelTool(type) {
  const ex = currentExerciseIdx !== -1 ? (LAB_EXERCISES[activeSection]?.[currentExerciseIdx]) : null;
  const requiredRel = ex?.solution?.rels?.[0]?.type || null;

  window.currentRelType = type;

  // Re-render toolbox to update active state
  const toolboxGrid = document.querySelector('.toolbox-grid');
  if (toolboxGrid) toolboxGrid.innerHTML = renderToolbox();

  if (requiredRel && type !== requiredRel) {
    const names = { inherit: 'Herencia', compose: 'Composición', agg: 'Agregación', assoc: 'Asociación' };
    showFeedback(`⚠️ Has seleccionado "${names[type]}". Para este ejercicio necesitas otra herramienta. Piensa: ¿las partes sobreviven al todo?`, 'warning');
  } else if (requiredRel && type === requiredRel) {
    showFeedback(`✅ ¡Correcto! Ahora usa el desplegable "Relacionar con..." para conectar las clases.`, 'success');
  } else {
    showToast('Conector: ' + type, 'info');
  }
}

function renderExercisePanel(ex) {
  return `
    <div class="ex-panel-content">
      <div class="ex-tag">EJERCICIO ACTIVO</div>
      <h4>${ex.title}</h4>
      <p>${ex.scenario}</p>
      <div style="margin-top:1rem;display:flex;gap:0.75rem">
        <button class="btn-help" onclick="showLabSolution()">💡 Ayuda</button>
        <button class="btn-secondary" style="padding:0.4rem 0.8rem;font-size:0.8rem" onclick="closeExercise()">✕ Cerrar</button>
      </div>
    </div>
  `;
}

function toggleExerciseList() {
  document.getElementById('exercise-dropdown').classList.toggle('hidden');
}

function startExercise(idx) {
  currentExerciseIdx = idx;
  labNodes = [];
  labConnections = [];
  window.currentRelType = null;
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

  if (!window.currentRelType) {
    showFeedback('⚠️ Primero selecciona el tipo de conector en las herramientas (Herencia, Comp., Agreg. o Asoc.).', 'warning');
    return;
  }

  const ex = currentExerciseIdx !== -1 ? (LAB_EXERCISES[activeSection]?.[currentExerciseIdx]) : null;
  const requiredRel = ex?.solution?.rels?.[0]?.type || null;

  if (requiredRel && window.currentRelType !== requiredRel) {
    const names = { inherit: 'Herencia ◁—', compose: 'Composición ◆—', agg: 'Agregación ◇—', assoc: 'Asociación ———' };
    showFeedback(`❌ Tipo de relación incorrecto. Has usado "${names[window.currentRelType]}". Selecciona la herramienta correcta antes de conectar.`, 'error');
    return;
  }

  labConnections.push({ from: fromId, to: toId, type: window.currentRelType });
  updateLabCanvas();
  validateLabState();
}

function setLabRelation(type) {
  selectRelTool(type);
}

function showFeedback(msg, type) {
  const feedback = document.getElementById('lab-feedback');
  const fbMsg = document.getElementById('fb-msg');
  if (!feedback || !fbMsg) return;
  feedback.classList.remove('hidden');
  feedback.className = 'lab-feedback-board ' + (type === 'error' ? 'error' : type === 'success' ? 'success' : 'info');
  fbMsg.textContent = msg;
  // Auto-hide non-success messages after 4s
  if (type !== 'success') {
    clearTimeout(window._fbTimeout);
    window._fbTimeout = setTimeout(() => {
      if (feedback.className.includes('error') || feedback.className.includes('info')) {
        feedback.classList.add('hidden');
      }
    }, 4000);
  }
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
  if (labNodes.length === 0) {
    canvas.innerHTML = '<div class="canvas-empty">Añade elementos desde la izquierda</div>';
    return;
  }

  if (currentLabMode === 'uml') {
    renderUMLCanvas(canvas);
  } else {
    renderFlowCanvas(canvas);
  }
}

function renderUMLCanvas(canvas) {
  const W = 180, cols = 2, colGap = 80, rowGap = 60, startX = 40, startY = 30;

  // Compute positions in a grid layout
  const nodeBoxes = {};
  labNodes.forEach((n, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const x = startX + col * (W + colGap);
    const y = startY + row * 200 + (row > 0 ? row * rowGap : 0);
    const attrs = n.attrs || [];
    const methods = n.methods || [];
    const box = umlClass(x, y, W, n.text, attrs, methods, false, false);
    nodeBoxes[n.id] = box;
  });

  // Recalculate y positions based on actual box heights to avoid overlap
  let colHeights = [startY, startY];
  labNodes.forEach((n, i) => {
    const col = i % cols;
    const x = startX + col * (W + colGap);
    const y = colHeights[col];
    const attrs = n.attrs || [];
    const methods = n.methods || [];
    const box = umlClass(x, y, W, n.text, attrs, methods, false, false);
    nodeBoxes[n.id] = box;
    colHeights[col] = y + box.h + rowGap;
  });

  let svgContent = '';

  // Draw connections first (behind nodes)
  labConnections.forEach(c => {
    const from = nodeBoxes[c.from];
    const to = nodeBoxes[c.to];
    if (!from || !to) return;
    svgContent += drawUMLConnection(from, to, c.type);
  });

  // Draw nodes on top
  labNodes.forEach(n => {
    svgContent += nodeBoxes[n.id].svg;
  });

  const totalH = Math.max(400, ...Object.values(nodeBoxes).map(b => b.bottom + 40));
  const totalW = startX * 2 + cols * W + (cols - 1) * colGap;
  canvas.innerHTML = `<svg viewBox="0 0 ${totalW} ${totalH}" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto">${SVG_DEFS}${svgContent}</svg>`;
}

function drawUMLConnection(from, to, type) {
  // Find best connection points (top/bottom/left/right of each box)
  const points = getBestConnectionPoints(from, to);
  const x1 = points.x1, y1 = points.y1, x2 = points.x2, y2 = points.y2;

  // Midpoint for label
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;

  // Offset end point to leave room for marker
  const dx = x2 - x1, dy = y2 - y1;
  const len = Math.sqrt(dx*dx + dy*dy) || 1;
  const offset = 14;
  const ex = x2 - (dx/len)*offset;
  const ey = y2 - (dy/len)*offset;

  // Diamond offset from start
  const diamondSize = 10;
  const sx = x1 + (dx/len)*diamondSize;
  const sy = y1 + (dy/len)*diamondSize;

  let out = '';

  if (type === 'inherit') {
    // Solid line + open triangle at target
    out += `<line x1="${x1}" y1="${y1}" x2="${ex}" y2="${ey}" stroke="#a78bfa" stroke-width="2"/>`;
    out += drawOpenTriangle(x2, y2, dx, dy, '#a78bfa');
    out += drawRelLabel(mx, my, 'herencia', '#a78bfa');
  } else if (type === 'compose') {
    // Solid line + filled diamond at source + arrow at target
    out += `<line x1="${sx}" y1="${sy}" x2="${ex}" y2="${ey}" stroke="#f87171" stroke-width="2" marker-end="url(#arrowAssoc)"/>`;
    out += drawDiamond(x1, y1, dx, dy, '#f87171', true);
    out += drawRelLabel(mx, my, 'composición ◆', '#f87171');
  } else if (type === 'agg') {
    // Solid line + empty diamond at source + arrow at target
    out += `<line x1="${sx}" y1="${sy}" x2="${ex}" y2="${ey}" stroke="#60a5fa" stroke-width="2" marker-end="url(#arrowAssoc)"/>`;
    out += drawDiamond(x1, y1, dx, dy, '#60a5fa', false);
    out += drawRelLabel(mx, my, 'agregación ◇', '#60a5fa');
  } else {
    // Association: simple arrow
    out += `<line x1="${x1}" y1="${y1}" x2="${ex}" y2="${ey}" stroke="#9898b8" stroke-width="2" marker-end="url(#arrowAssoc)"/>`;
    out += drawRelLabel(mx, my, 'asociación', '#9898b8');
  }

  return out;
}

function getBestConnectionPoints(from, to) {
  // Try vertical connection (top/bottom) if boxes are roughly aligned horizontally
  const fromCX = (from.left + from.right) / 2;
  const toCX = (to.left + to.right) / 2;
  const horizOverlap = Math.abs(fromCX - toCX) < 60;

  if (horizOverlap) {
    if (from.bottom < to.top) {
      return { x1: fromCX, y1: from.bottom, x2: toCX, y2: to.top };
    } else {
      return { x1: fromCX, y1: from.top, x2: toCX, y2: to.bottom };
    }
  }
  // Horizontal connection
  if (from.right < to.left) {
    return { x1: from.right, y1: (from.top + from.bottom)/2, x2: to.left, y2: (to.top + to.bottom)/2 };
  } else {
    return { x1: from.left, y1: (from.top + from.bottom)/2, x2: to.right, y2: (to.top + to.bottom)/2 };
  }
}

function drawOpenTriangle(tipX, tipY, dx, dy, color) {
  const len = Math.sqrt(dx*dx + dy*dy) || 1;
  const ux = dx/len, uy = dy/len;
  const size = 14;
  const half = 8;
  // Base of triangle (perpendicular to direction)
  const bx = tipX - ux*size;
  const by = tipY - uy*size;
  const lx = bx - uy*half;
  const ly = by + ux*half;
  const rx = bx + uy*half;
  const ry = by - ux*half;
  return `<polygon points="${tipX},${tipY} ${lx},${ly} ${rx},${ry}" fill="#0f172a" stroke="${color}" stroke-width="2"/>`;
}

function drawDiamond(cx, cy, dx, dy, color, filled) {
  const len = Math.sqrt(dx*dx + dy*dy) || 1;
  const ux = dx/len, uy = dy/len;
  const h = 12, w = 7;
  const tip1x = cx - ux*h, tip1y = cy - uy*h;
  const tip2x = cx + ux*h, tip2y = cy + uy*h; // unused, diamond starts at cx,cy
  const lx = cx - ux*(h/2) - uy*w;
  const ly = cy - uy*(h/2) + ux*w;
  const rx = cx - ux*(h/2) + uy*w;
  const ry = cy - uy*(h/2) - ux*w;
  const fill = filled ? color : '#0f172a';
  return `<polygon points="${cx},${cy} ${lx},${ly} ${tip1x},${tip1y} ${rx},${ry}" fill="${fill}" stroke="${color}" stroke-width="2"/>`;
}

function drawRelLabel(x, y, text, color) {
  return `<rect x="${x - text.length*3.2}" y="${y - 9}" width="${text.length*6.4}" height="14" rx="4" fill="rgba(15,23,42,0.85)"/>
  <text x="${x}" y="${y + 2}" text-anchor="middle" font-size="9" font-family="Inter,sans-serif" fill="${color}" font-weight="600">${text}</text>`;
}

function renderFlowCanvas(canvas) {
  let svgContent = '';
  labConnections.forEach(c => {
    const from = labNodes.find(n => n.id === c.from);
    const to = labNodes.find(n => n.id === c.to);
    if (!from || !to) return;
    svgContent += `<line x1="${from.x}" y1="${from.y + 20}" x2="${to.x}" y2="${to.y - 20}" stroke="#4a4a7a" stroke-width="2" marker-end="url(#arrowAct)"/>`;
    if (c.label) svgContent += `<text x="${from.x + 12}" y="${(from.y + to.y)/2}" fill="#fbbf24" font-size="11" font-family="Inter" font-weight="600">${c.label}</text>`;
  });

  labNodes.forEach(n => {
    const w = 150, h = 42;
    if (n.type === 'start') svgContent += `<rect x="${n.x - w/2}" y="${n.y - h/2}" width="${w}" height="${h}" rx="21" class="act-rect"/>`;
    else if (n.type === 'process') svgContent += `<rect x="${n.x - w/2}" y="${n.y - h/2}" width="${w}" height="${h}" class="act-rect" rx="6"/>`;
    else if (n.type === 'decision') svgContent += `<polygon points="${n.x},${n.y-30} ${n.x+75},${n.y} ${n.x},${n.y+30} ${n.x-75},${n.y}" class="act-diamond" style="fill:#161628;stroke:#fbbf24;stroke-width:2"/>`;
    else if (n.type === 'io') svgContent += `<polygon points="${n.x-65},${n.y+21} ${n.x+75},${n.y+21} ${n.x+65},${n.y-21} ${n.x-75},${n.y-21}" class="act-rect" style="fill:rgba(124, 92, 252, 0.08);stroke:#7c5cfc"/>`;
    svgContent += `<text x="${n.x}" y="${n.y+5}" text-anchor="middle" class="act-text" style="font-weight:600;font-size:12px">${n.text}</text>`;
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
