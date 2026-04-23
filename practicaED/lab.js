// =============================================
// LAB — Interactive UML Diagram Builder
// Modes: uml, flow, usecase, sequence, comms, states
// =============================================

let labNodes = [];
let labConnections = [];
let currentLabMode = 'flow';
let currentExerciseIdx = -1;

const LAB_MODE_META = {
  uml:      { title: 'Clases UML',               icon: 'UML_CLASS' },
  flow:     { title: 'Diagrama de Actividad',    icon: 'UML_ACTIVITY' },
  usecase:  { title: 'Casos de Uso',             icon: 'UML_ACTOR' },
  sequence: { title: 'Diagrama de Secuencia',    icon: 'UML_SEQ' },
  comms:    { title: 'Diagrama de Comunicación', icon: 'UML_COMMS' },
  states:   { title: 'Diagrama de Estados',      icon: 'UML_STATE' },
};

const UML_SYMBOLS = {
  // Generic Icons for Mode Headers
  UML_CLASS: `<svg viewBox="0 0 24 24" class="uml-icon-header"><rect x="4" y="4" width="16" height="16" rx="1" stroke="currentColor" fill="none" stroke-width="1.5"/><line x1="4" y1="10" x2="20" y2="10" stroke="currentColor" stroke-width="1.5"/></svg>`,
  UML_ACTIVITY: `<svg viewBox="0 0 24 24" class="uml-icon-header"><rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" fill="none" stroke-width="1.5"/><circle cx="12" cy="12" r="3" stroke="currentColor" fill="none" stroke-width="1.5"/></svg>`,
  UML_ACTOR: `<svg viewBox="0 0 24 24" class="uml-icon-header"><circle cx="12" cy="7" r="4" stroke="currentColor" fill="none" stroke-width="1.5"/><line x1="12" y1="11" x2="12" y2="18" stroke="currentColor" stroke-width="1.5"/><line x1="8" y1="14" x2="16" y2="14" stroke="currentColor" stroke-width="1.5"/><line x1="12" y1="18" x2="9" y2="22" stroke="currentColor" stroke-width="1.5"/><line x1="12" y1="18" x2="15" y2="22" stroke="currentColor" stroke-width="1.5"/></svg>`,
  UML_SEQ: `<svg viewBox="0 0 24 24" class="uml-icon-header"><line x1="8" y1="4" x2="8" y2="20" stroke="currentColor" stroke-dasharray="2 2" stroke-width="1.5"/><line x1="16" y1="4" x2="16" y2="20" stroke="currentColor" stroke-dasharray="2 2" stroke-width="1.5"/><line x1="8" y1="10" x2="16" y2="10" stroke="currentColor" marker-end="url(#arrowAssoc)" stroke-width="1.5"/></svg>`,
  UML_COMMS: `<svg viewBox="0 0 24 24" class="uml-icon-header"><rect x="3" y="3" width="7" height="5" rx="1" stroke="currentColor" fill="none" stroke-width="1.5"/><rect x="14" y="16" width="7" height="5" rx="1" stroke="currentColor" fill="none" stroke-width="1.5"/><line x1="10" y1="8" x2="14" y2="16" stroke="currentColor" stroke-width="1.5"/></svg>`,
  UML_STATE: `<svg viewBox="0 0 24 24" class="uml-icon-header"><rect x="4" y="6" width="16" height="12" rx="6" stroke="currentColor" fill="none" stroke-width="1.5"/></svg>`,

  // Element Symbols
  actor: `<svg viewBox="0 0 24 24" class="uml-tool-svg"><circle cx="12" cy="5" r="4" stroke="currentColor" fill="none" stroke-width="1.5"/><line x1="12" y1="9" x2="12" y2="18" stroke="currentColor" stroke-width="1.5"/><line x1="6" y1="12" x2="18" y2="12" stroke="currentColor" stroke-width="1.5"/><line x1="12" y1="18" x2="8" y2="23" stroke="currentColor" stroke-width="1.5"/><line x1="12" y1="18" x2="16" y2="23" stroke="currentColor" stroke-width="1.5"/></svg>`,
  usecase: `<svg viewBox="0 0 24 24" class="uml-tool-svg"><ellipse cx="12" cy="12" rx="10" ry="6" stroke="currentColor" fill="none" stroke-width="1.5"/></svg>`,
  system: `<svg viewBox="0 0 24 24" class="uml-tool-svg"><rect x="3" y="3" width="18" height="18" stroke="currentColor" fill="none" stroke-width="1.5" stroke-dasharray="3 2"/></svg>`,
  class: `<svg viewBox="0 0 24 24" class="uml-tool-svg"><rect x="3" y="3" width="18" height="18" stroke="currentColor" fill="none" stroke-width="1.5"/><line x1="3" y1="9" x2="21" y2="9" stroke="currentColor" stroke-width="1.5"/><line x1="3" y1="15" x2="21" y2="15" stroke="currentColor" stroke-width="1.5"/></svg>`,
  start: `<svg viewBox="0 0 24 24" class="uml-tool-svg"><rect x="4" y="7" width="16" height="10" rx="5" stroke="currentColor" fill="none" stroke-width="1.5"/></svg>`,
  process: `<svg viewBox="0 0 24 24" class="uml-tool-svg"><rect x="3" y="6" width="18" height="12" stroke="currentColor" fill="none" stroke-width="1.5"/></svg>`,
  decision: `<svg viewBox="0 0 24 24" class="uml-tool-svg"><path d="M 12 4 L 20 12 L 12 20 L 4 12 Z" stroke="currentColor" fill="none" stroke-width="1.5"/></svg>`,
  io: `<svg viewBox="0 0 24 24" class="uml-tool-svg"><path d="M 6 6 L 21 6 L 18 18 L 3 18 Z" stroke="currentColor" fill="none" stroke-width="1.5"/></svg>`,
  lifeline: `<svg viewBox="0 0 24 24" class="uml-tool-svg"><rect x="4" y="3" width="16" height="6" stroke="currentColor" fill="none" stroke-width="1.5"/><line x1="12" y1="9" x2="12" y2="21" stroke="currentColor" stroke-dasharray="2 2" stroke-width="1.5"/></svg>`,
  obj: `<svg viewBox="0 0 24 24" class="uml-tool-svg"><rect x="4" y="6" width="16" height="12" stroke="currentColor" fill="none" stroke-width="1.5"/><text x="12" y="14" font-size="6" text-anchor="middle" fill="currentColor">object</text></svg>`,
  initial: `<svg viewBox="0 0 24 24" class="uml-tool-svg"><circle cx="12" cy="12" r="6" fill="currentColor" stroke="none"/></svg>`,
  state: `<svg viewBox="0 0 24 24" class="uml-tool-svg"><rect x="3" y="7" width="18" height="10" rx="5" stroke="currentColor" fill="none" stroke-width="1.5"/></svg>`,
  final: `<svg viewBox="0 0 24 24" class="uml-tool-svg"><circle cx="12" cy="12" r="8" stroke="currentColor" fill="none" stroke-width="1.5"/><circle cx="12" cy="12" r="4" fill="currentColor" stroke="none"/></svg>`,

  // Connectors
  inherit: `<svg viewBox="0 0 24 24" class="uml-tool-svg"><line x1="4" y1="12" x2="16" y2="12" stroke="currentColor" stroke-width="1.5"/><path d="M 16 7 L 22 12 L 16 17 Z" fill="none" stroke="currentColor"/></svg>`,
  compose: `<svg viewBox="0 0 24 24" class="uml-tool-svg"><line x1="10" y1="12" x2="20" y2="12" stroke="currentColor" stroke-width="1.5"/><path d="M 4 12 L 7 9 L 10 12 L 7 15 Z" fill="currentColor" stroke="currentColor"/></svg>`,
  agg: `<svg viewBox="0 0 24 24" class="uml-tool-svg"><line x1="10" y1="12" x2="20" y2="12" stroke="currentColor" stroke-width="1.5"/><path d="M 4 12 L 7 9 L 10 12 L 7 15 Z" fill="none" stroke="currentColor"/></svg>`,
  assoc: `<svg viewBox="0 0 24 24" class="uml-tool-svg"><line x1="4" y1="12" x2="20" y2="12" stroke="currentColor" stroke-width="1.5"/></svg>`,
  include: `<svg viewBox="0 0 24 24" class="uml-tool-svg"><line x1="4" y1="12" x2="20" y2="12" stroke="currentColor" stroke-width="1.5" stroke-dasharray="3 2" marker-end="url(#arrowAssoc)"/></svg>`,
  generalize: `<svg viewBox="0 0 24 24" class="uml-tool-svg"><line x1="4" y1="12" x2="16" y2="12" stroke="currentColor" stroke-width="1.5"/><path d="M 16 7 L 22 12 L 16 17 Z" fill="none" stroke="currentColor"/></svg>`,
  sync: `<svg viewBox="0 0 24 24" class="uml-tool-svg"><line x1="4" y1="12" x2="20" y2="12" stroke="currentColor" stroke-width="2" marker-end="url(#arrowFull)"/></svg>`,
  async: `<svg viewBox="0 0 24 24" class="uml-tool-svg"><line x1="4" y1="12" x2="20" y2="12" stroke="currentColor" stroke-width="1.5" marker-end="url(#arrowOpen)"/></svg>`,
  return: `<svg viewBox="0 0 24 24" class="uml-tool-svg"><line x1="4" y1="12" x2="20" y2="12" stroke="currentColor" stroke-width="1.5" stroke-dasharray="3 2" marker-end="url(#arrowOpen)"/></svg>`,
};

function showLab() {
  const view = document.getElementById('lab-view');
  view.classList.remove('hidden');
  const modeMap = {
    'ud4-lab':         'uml',
    'ud5-lab':         'flow',
    'ud5-lab-usecase': 'usecase',
    'ud5-lab-seq':     'sequence',
    'ud5-lab-comms':   'comms',
    'ud5-lab-states':  'states',
  };
  currentLabMode = modeMap[activeSection] || (activeSection.startsWith('ud4') ? 'uml' : 'flow');
  currentExerciseIdx = -1;
  labNodes = [];
  labConnections = [];
  window.currentRelType = null;
  renderLabUI();
}

function renderLabUI() {
  const view = document.getElementById('lab-view');
  const exercises = LAB_EXERCISES[activeSection] || [];
  const meta = LAB_MODE_META[currentLabMode] || { title: 'Laboratorio', icon: '🧪' };

  view.innerHTML = `
    <div class="lab-header">
      <div style="display:flex; justify-content:space-between; align-items:center">
        <div>
          <h2>${UML_SYMBOLS[meta.icon] || meta.icon} Lab: ${meta.title}</h2>
          <p>Construye diagramas UML con corrección en tiempo real.</p>
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
      <aside class="lab-toolbox">
        <div class="toolbox-group">
          <h3>Herramientas</h3>
          <div class="toolbox-grid">${renderToolbox()}</div>
        </div>
        <div class="toolbox-group">
          <h3>Elementos</h3>
          <div id="lab-node-list" class="node-list"></div>
        </div>
        <button class="btn-secondary" style="width:100%;margin-top:1rem" onclick="resetLab()">🗑️ Limpiar todo</button>
      </aside>

      <div class="lab-canvas-area">
        <div class="canvas-header">
          <span>Vista Previa</span>
          <div id="realtime-status" class="realtime-status"></div>
          <button class="btn-tiny" onclick="downloadLabSVG()">💾 Descargar</button>
        </div>
        <div id="lab-canvas" class="lab-canvas"></div>
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

// =============================================
// TOOLBOXES
// =============================================

function renderToolbox() {
  switch (currentLabMode) {
    case 'flow':     return renderFlowToolbox();
    case 'uml':      return renderUMLToolbox();
    case 'usecase':  return renderUseCaseToolbox();
    case 'sequence': return renderSequenceToolbox();
    case 'comms':    return renderCommsToolbox();
    case 'states':   return renderStatesToolbox();
    default: return '';
  }
}

function renderFlowToolbox() {
  return `
    <button class="tool-btn" onclick="addLabNode('start')"><span class="tool-icon">${UML_SYMBOLS.start}</span> Inicio/Fin</button>
    <button class="tool-btn" onclick="addLabNode('process')"><span class="tool-icon">${UML_SYMBOLS.process}</span> Proceso</button>
    <button class="tool-btn" onclick="addLabNode('decision')"><span class="tool-icon">${UML_SYMBOLS.decision}</span> Decisión</button>
    <button class="tool-btn" onclick="addLabNode('io')"><span class="tool-icon">${UML_SYMBOLS.io}</span> Ent/Sal</button>
  `;
}

function renderUMLToolbox() {
  const ex = currentExerciseIdx !== -1 ? (LAB_EXERCISES[activeSection]?.[currentExerciseIdx]) : null;
  const requiredRel = ex?.solution?.rels?.[0]?.type || null;
  const relTypes = [
    { type: 'inherit', symbol: UML_SYMBOLS.inherit, label: 'Herencia' },
    { type: 'compose', symbol: UML_SYMBOLS.compose, label: 'Comp.' },
    { type: 'agg',     symbol: UML_SYMBOLS.agg,     label: 'Agreg.' },
    { type: 'assoc',   symbol: UML_SYMBOLS.assoc,   label: 'Asoc.' },
  ];
  const relButtons = relTypes.map(r => {
    const isSelected = window.currentRelType === r.type;
    const isRequired = requiredRel === r.type;
    const cls = isSelected ? 'tool-btn tool-btn--active' : (isRequired ? 'tool-btn tool-btn--hint' : 'tool-btn');
    return `<button class="${cls}" id="relbtn-${r.type}" onclick="selectRelTool('${r.type}')">
      <span class="tool-icon">${r.symbol}</span> ${r.label}
      ${isRequired && !isSelected ? '<span class="tool-hint-badge">?</span>' : ''}
    </button>`;
  }).join('');
  return `
    <button class="tool-btn" onclick="addLabNode('class')"><span class="tool-icon">${UML_SYMBOLS.class}</span> Clase</button>
    ${relButtons}
  `;
}

function renderUseCaseToolbox() {
  const ucRelTypes = [
    { type: 'assoc',      symbol: UML_SYMBOLS.assoc,      label: 'Asoc.' },
    { type: 'include',    symbol: UML_SYMBOLS.include,    label: 'Incl.' },
    { type: 'extend',     symbol: UML_SYMBOLS.include,    label: 'Ext.' }, // Same symbol, different label
    { type: 'generalize', symbol: UML_SYMBOLS.generalize, label: 'Gen.' },
  ];
  const btns = ucRelTypes.map(r => {
    const isSelected = window.currentRelType === r.type;
    return `<button class="tool-btn ${isSelected ? 'tool-btn--active' : ''}" onclick="selectRelTool('${r.type}')">
      <span class="tool-icon">${r.symbol}</span> ${r.label}
    </button>`;
  }).join('');
  return `
    <button class="tool-btn" onclick="addLabNode('actor')"><span class="tool-icon">${UML_SYMBOLS.actor}</span> Actor</button>
    <button class="tool-btn" onclick="addLabNode('usecase')"><span class="tool-icon">${UML_SYMBOLS.usecase}</span> C. Uso</button>
    <button class="tool-btn" onclick="addLabNode('system')"><span class="tool-icon">${UML_SYMBOLS.system}</span> Sistema</button>
    ${btns}
  `;
}

function renderSequenceToolbox() {
  const msgTypes = [
    { type: 'sync',   symbol: UML_SYMBOLS.sync,   label: 'Sinc.' },
    { type: 'async',  symbol: UML_SYMBOLS.async,  label: 'Asinc.' },
    { type: 'return', symbol: UML_SYMBOLS.return, label: 'Ret.' },
  ];
  const btns = msgTypes.map(r => {
    const isSelected = window.currentRelType === r.type;
    return `<button class="tool-btn ${isSelected ? 'tool-btn--active' : ''}" onclick="selectRelTool('${r.type}')">
       <span class="tool-icon">${r.symbol}</span> ${r.label}
    </button>`;
  }).join('');
  return `
    <button class="tool-btn" onclick="addLabNode('lifeline')"><span class="tool-icon">${UML_SYMBOLS.lifeline}</span> Objeto</button>
    ${btns}
  `;
}

function renderCommsToolbox() {
  return `
    <button class="tool-btn" onclick="addLabNode('obj')"><span class="tool-icon">${UML_SYMBOLS.obj}</span> Objeto</button>
    <button class="tool-btn tool-btn--disabled"><span class="tool-icon">${UML_SYMBOLS.assoc}</span> Enlace</button>
  `;
}

function renderStatesToolbox() {
  return `
    <button class="tool-btn" onclick="addLabNode('initial')"><span class="tool-icon">${UML_SYMBOLS.initial}</span> Inicial</button>
    <button class="tool-btn" onclick="addLabNode('state')"><span class="tool-icon">${UML_SYMBOLS.state}</span> Estado</button>
    <button class="tool-btn" onclick="addLabNode('final')"><span class="tool-icon">${UML_SYMBOLS.final}</span> Final</button>
  `;
}

function selectRelTool(type) {
  const ex = currentExerciseIdx !== -1 ? (LAB_EXERCISES[activeSection]?.[currentExerciseIdx]) : null;
  const requiredRel = ex?.solution?.rels?.[0]?.type || null;
  window.currentRelType = type;
  const toolboxGrid = document.querySelector('.toolbox-grid');
  if (toolboxGrid) toolboxGrid.innerHTML = renderToolbox();
  if (currentLabMode === 'uml') {
    if (requiredRel && type !== requiredRel) {
      const names = { inherit: 'Herencia', compose: 'Composición', agg: 'Agregación', assoc: 'Asociación' };
      showFeedback(`⚠️ Has seleccionado "${names[type]}". Para este ejercicio necesitas otra herramienta. Piensa: ¿las partes sobreviven al todo?`, 'warning');
    } else if (requiredRel && type === requiredRel) {
      showFeedback(`✅ ¡Correcto! Ahora usa el desplegable "Relacionar con..." para conectar las clases.`, 'success');
    } else {
      showToast('Conector: ' + type, 'info');
    }
  } else {
    const labels = {
      assoc: 'Asociación', include: '«include»', extend: '«extend»', generalize: 'Generalización',
      sync: 'Mensaje síncrono →', async: 'Mensaje asíncrono ⇢', return: 'Retorno ⋯→'
    };
    showToast((labels[type] || type) + ' seleccionado', 'info');
  }
}

// =============================================
// EXERCISE PANEL
// =============================================

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
  validateLabState();
}

function closeExercise() {
  currentExerciseIdx = -1;
  renderLabUI();
}

// =============================================
// NODE MANAGEMENT
// =============================================

function addLabNode(type) {
  const typeDefaults = {
    class:    { text: 'NombreClase', attrs: ['- atributo : tipo'], methods: ['+ metodo() : tipo'] },
    start:    { text: 'Inicio' },
    process:  { text: 'Nueva Acción' },
    decision: { text: '¿Condición?' },
    io:       { text: 'Entrada/Salida' },
    actor:    { text: 'Actor' },
    usecase:  { text: 'Caso de Uso' },
    system:   { text: 'Sistema' },
    lifeline: { text: ':Objeto' },
    obj:      { text: ':Objeto' },
    initial:  { text: '' },
    state:    { text: 'Estado' },
    final:    { text: '' },
  };
  const d = typeDefaults[type] || { text: 'Elemento' };
  const node = {
    id: Date.now(),
    type,
    text: d.text,
    attrs: d.attrs ? [...d.attrs] : undefined,
    methods: d.methods ? [...d.methods] : undefined,
    x: 250,
    y: 80 + labNodes.length * 100
  };
  labNodes.push(node);
  renderNodeList();
  updateLabCanvas();
  validateLabState();
}

function renderNodeList() {
  const list = document.getElementById('lab-node-list');
  if (!list) return;
  if (labNodes.length === 0) { list.innerHTML = '<p class="empty-msg">No hay elementos</p>'; return; }

  const iconMap = {
    start: '🟢', process: '🟦', decision: '🔷', io: '📥',
    class: '🟦',
    actor: '🧑', usecase: '⭕', system: '📦',
    lifeline: '⬇️',
    obj: '🔵',
    initial: '⚫', state: '📦', final: '🎯',
  };

  list.innerHTML = labNodes.map(n => {
    const symbol = UML_SYMBOLS[n.type] || '<span class="node-badge">?</span>';
    const showText = n.type !== 'initial' && n.type !== 'final';
    const showPos = ['flow'].includes(currentLabMode);
    return `
      <div class="node-edit-card" data-type="${n.type}">
        <div class="node-row">
          <div class="node-badge-svg">${symbol}</div>
          ${showText
            ? `<input type="text" value="${n.text}" oninput="updateNodeProperty(${n.id}, 'text', this.value)" placeholder="Nombre...">`
            : `<span style="color:#9898b8;font-size:0.8rem">${n.type === 'initial' ? 'Foco Inicial' : 'Foco Final'}</span>`}
          ${showPos ? `
            <div class="pos-controls">
              <button class="btn-pos" onclick="moveNode(${n.id}, -40)">←</button>
              <button class="btn-pos" onclick="moveNode(${n.id}, 40)">→</button>
            </div>
          ` : ''}
          <button class="btn-del" onclick="removeNode(${n.id})">✕</button>
        </div>
        ${renderNodeInputs(n)}
      </div>
    `;
  }).join('');
}

function renderNodeInputs(n) {
  switch (currentLabMode) {
    case 'uml':      return renderUMLInputs(n);
    case 'flow':     return renderFlowInputs(n);
    case 'usecase':  return renderUseCaseInputs(n);
    case 'sequence': return renderSequenceInputs(n);
    case 'comms':    return renderCommsInputs(n);
    case 'states':   return renderStatesInputs(n);
    default: return '';
  }
}

function renderUMLInputs(n) {
  return `
    <div class="uml-subinputs">
      <textarea oninput="updateNodeProperty(${n.id}, 'attrs', this.value.split('\\n'))" placeholder="- atributo : int">${(n.attrs||[]).join('\n')}</textarea>
      <textarea oninput="updateNodeProperty(${n.id}, 'methods', this.value.split('\\n'))" placeholder="+ metodo() : void">${(n.methods||[]).join('\n')}</textarea>
      <div class="rel-control">
        <select onchange="addUMLRelation(${n.id}, this.value); this.selectedIndex=0">
          <option value="">Relacionar con...</option>
          ${labNodes.filter(o => o.id !== n.id).map(o => `<option value="${o.id}">${o.text}</option>`).join('')}
        </select>
      </div>
    </div>
  `;
}

function renderFlowInputs(n) {
  const nodeConns = labConnections.filter(c => c.from === n.id);
  const connList = nodeConns.map(c => {
    const to = labNodes.find(ln => ln.id === c.to);
    return `
      <div class="conn-label-row">
        <span>→ ${to ? to.text : '?'}</span>
        <input type="text" value="${c.label || ''}" oninput="updateSpecificConnectionLabel(${n.id}, ${c.to}, this.value)" placeholder="Etiqueta...">
        <button class="btn-tiny-del" onclick="removeConnection(${n.id}, ${c.to})">✕</button>
      </div>
    `;
  }).join('');
  return `
    <div class="flow-subinputs">
      ${connList}
      <div class="rel-control">
        <select onchange="addFlowRelation(${n.id}, this.value); this.selectedIndex=0">
          <option value="">Conectar con...</option>
          ${labNodes.filter(o => o.id !== n.id).map(o => `<option value="${o.id}">${o.text}</option>`).join('')}
        </select>
      </div>
    </div>
  `;
}

function renderUseCaseInputs(n) {
  if (n.type === 'system') return '';
  const conns = labConnections.filter(c => c.from === n.id);
  const connList = conns.map(c => {
    const to = labNodes.find(ln => ln.id === c.to);
    const lbl = { assoc: '—', include: '«inc»', extend: '«ext»', generalize: '◁' }[c.type] || '→';
    return `
      <div class="conn-label-row">
        <span style="font-size:0.8rem;color:#c4b5fd">${lbl} ${to ? to.text : '?'}</span>
        <button class="btn-tiny-del" onclick="removeConnection(${n.id}, ${c.to})">✕</button>
      </div>
    `;
  }).join('');
  return `
    <div class="flow-subinputs">
      ${connList}
      <div class="rel-control">
        <select onchange="addUseCaseRelation(${n.id}, this.value); this.selectedIndex=0">
          <option value="">Conectar con...</option>
          ${labNodes.filter(o => o.id !== n.id && o.type !== 'system').map(o => `<option value="${o.id}">${o.text}</option>`).join('')}
        </select>
      </div>
    </div>
  `;
}

function renderSequenceInputs(n) {
  const conns = labConnections.filter(c => c.from === n.id);
  const connList = conns.map(c => {
    const to = labNodes.find(ln => ln.id === c.to);
    const typeIcon = { sync: '→', async: '⇢', return: '⋯→' }[c.type] || '→';
    return `
      <div class="conn-label-row">
        <span style="font-size:0.75rem;color:#22d3a0">${typeIcon} ${to ? to.text : '?'}</span>
        <input type="text" value="${c.label || ''}" oninput="updateSpecificConnectionLabel(${n.id}, ${c.to}, this.value)" placeholder="metodo()..." style="width:90px">
        <button class="btn-tiny-del" onclick="removeConnection(${n.id}, ${c.to})">✕</button>
      </div>
    `;
  }).join('');
  return `
    <div class="flow-subinputs">
      ${connList}
      <div class="rel-control">
        <select onchange="addSeqMessage(${n.id}, this.value); this.selectedIndex=0">
          <option value="">Enviar msg a...</option>
          ${labNodes.filter(o => o.id !== n.id).map(o => `<option value="${o.id}">${o.text}</option>`).join('')}
        </select>
      </div>
    </div>
  `;
}

function renderCommsInputs(n) {
  const conns = labConnections.filter(c => c.from === n.id);
  const connList = conns.map(c => {
    const to = labNodes.find(ln => ln.id === c.to);
    return `
      <div class="conn-label-row">
        <span style="font-size:0.8rem;color:#fbbf24;font-weight:700">${c.seqNum}:</span>
        <input type="text" value="${c.label || ''}" oninput="updateSpecificConnectionLabel(${n.id}, ${c.to}, this.value)" placeholder="mensaje()..." style="width:90px">
        <button class="btn-tiny-del" onclick="removeConnection(${n.id}, ${c.to})">✕</button>
      </div>
    `;
  }).join('');
  return `
    <div class="flow-subinputs">
      ${connList}
      <div class="rel-control">
        <select onchange="addCommsLink(${n.id}, this.value); this.selectedIndex=0">
          <option value="">Enlazar con...</option>
          ${labNodes.filter(o => o.id !== n.id).map(o => `<option value="${o.id}">${o.text}</option>`).join('')}
        </select>
      </div>
    </div>
  `;
}

function renderStatesInputs(n) {
  const conns = labConnections.filter(c => c.from === n.id);
  const connList = conns.map(c => {
    const to = labNodes.find(ln => ln.id === c.to);
    return `
      <div class="conn-label-row">
        <span style="font-size:0.8rem">→ ${to ? (to.text || to.type) : '?'}</span>
        <input type="text" value="${c.label || ''}" oninput="updateSpecificConnectionLabel(${n.id}, ${c.to}, this.value)" placeholder="evento[guarda]..." style="width:90px">
        <button class="btn-tiny-del" onclick="removeConnection(${n.id}, ${c.to})">✕</button>
      </div>
    `;
  }).join('');
  return `
    <div class="flow-subinputs">
      ${connList}
      <div class="rel-control">
        <select onchange="addStateTransition(${n.id}, this.value); this.selectedIndex=0">
          <option value="">Transición a...</option>
          ${labNodes.filter(o => o.id !== n.id).map(o => `<option value="${o.id}">${o.text || o.type}</option>`).join('')}
        </select>
      </div>
    </div>
  `;
}

// =============================================
// CONNECTION ADDERS
// =============================================

function addUseCaseRelation(fromId, toId) {
  if (!toId) return;
  toId = parseInt(toId);
  if (!window.currentRelType) {
    showFeedback('⚠️ Primero selecciona el tipo de conexión en las herramientas (Asociación, Include, Extend...).', 'warning');
    return;
  }
  labConnections.push({ from: fromId, to: toId, type: window.currentRelType });
  renderNodeList(); updateLabCanvas(); validateLabState();
}

function addSeqMessage(fromId, toId) {
  if (!toId) return;
  toId = parseInt(toId);
  if (!window.currentRelType) {
    showFeedback('⚠️ Primero selecciona el tipo de mensaje en las herramientas (Síncrono, Asíncrono o Retorno).', 'warning');
    return;
  }
  labConnections.push({ from: fromId, to: toId, type: window.currentRelType, label: '' });
  renderNodeList(); updateLabCanvas(); validateLabState();
}

function addCommsLink(fromId, toId) {
  if (!toId) return;
  toId = parseInt(toId);
  const seqNum = labConnections.length + 1;
  labConnections.push({ from: fromId, to: toId, type: 'link', label: 'mensaje()', seqNum });
  renderNodeList(); updateLabCanvas(); validateLabState();
}

function addStateTransition(fromId, toId) {
  if (!toId) return;
  toId = parseInt(toId);
  if (labConnections.some(c => c.from === fromId && c.to === toId)) return;
  labConnections.push({ from: fromId, to: toId, type: 'transition', label: '' });
  renderNodeList(); updateLabCanvas(); validateLabState();
}

function addFlowRelation(fromId, toId) {
  if (!toId) return;
  toId = parseInt(toId);
  if (labConnections.some(c => c.from === fromId && c.to === toId)) return;
  labConnections.push({ from: fromId, to: toId, label: '' });
  renderNodeList(); updateLabCanvas(); validateLabState();
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
    showFeedback(`❌ Tipo incorrecto: "${names[window.currentRelType]}". Selecciona la herramienta correcta.`, 'error');
    return;
  }
  labConnections.push({ from: fromId, to: toId, type: window.currentRelType });
  updateLabCanvas(); validateLabState();
}

// =============================================
// UTILITIES
// =============================================

function moveNode(id, dx) {
  const node = labNodes.find(n => n.id === id);
  if (node) { node.x = Math.max(50, Math.min(450, node.x + dx)); updateLabCanvas(); }
}

function updateSpecificConnectionLabel(fromId, toId, label) {
  const conn = labConnections.find(c => c.from === fromId && c.to === toId);
  if (conn) conn.label = label;
  updateLabCanvas(); validateLabState();
}

function updateConnectionLabelUI(fromId, label) {
  const conn = labConnections.find(c => c.from === fromId);
  if (conn) conn.label = label;
  updateLabCanvas(); validateLabState();
}

function getConnectionLabel(fromId) {
  const conn = labConnections.find(c => c.from === fromId);
  return conn ? conn.label : '';
}

function updateNodeProperty(id, prop, val) {
  const node = labNodes.find(n => n.id === id);
  if (node) node[prop] = val;
  updateLabCanvas(); validateLabState();
}

function removeConnection(fromId, toId) {
  labConnections = labConnections.filter(c => !(c.from === fromId && c.to === toId));
  renderNodeList(); updateLabCanvas(); validateLabState();
}

function removeNode(id) {
  labNodes = labNodes.filter(n => n.id !== id);
  labConnections = labConnections.filter(c => c.from !== id && c.to !== id);
  renderNodeList(); updateLabCanvas(); validateLabState();
}

function resetLab() {
  if (confirm('¿Limpiar todo?')) {
    labNodes = []; labConnections = [];
    window.currentRelType = null;
    renderNodeList(); updateLabCanvas(); validateLabState();
  }
}

function setLabRelation(type) { selectRelTool(type); }

function showFeedback(msg, type) {
  const feedback = document.getElementById('lab-feedback');
  const fbMsg = document.getElementById('fb-msg');
  if (!feedback || !fbMsg) return;
  feedback.classList.remove('hidden');
  feedback.className = 'lab-feedback-board ' + (type === 'error' ? 'error' : type === 'success' ? 'success' : 'info');
  fbMsg.textContent = msg;
  if (type !== 'success') {
    clearTimeout(window._fbTimeout);
    window._fbTimeout = setTimeout(() => {
      if (feedback.className.includes('error') || feedback.className.includes('info')) {
        feedback.classList.add('hidden');
      }
    }, 4000);
  }
}

// =============================================
// CANVAS DISPATCHER
// =============================================

function updateLabCanvas() {
  const canvas = document.getElementById('lab-canvas');
  if (!canvas) return;
  if (labNodes.length === 0) {
    canvas.innerHTML = '<div class="canvas-empty">Añade elementos desde la izquierda</div>';
    return;
  }
  switch (currentLabMode) {
    case 'uml':      renderUMLCanvas(canvas); break;
    case 'flow':     renderFlowCanvas(canvas); break;
    case 'usecase':  renderUseCaseCanvas(canvas); break;
    case 'sequence': renderSequenceCanvas(canvas); break;
    case 'comms':    renderCommsCanvas(canvas); break;
    case 'states':   renderStatesCanvas(canvas); break;
  }
}

// =============================================
// UML CLASS CANVAS (existing, preserved)
// =============================================

function renderUMLCanvas(canvas) {
  const W = 180, cols = 2, colGap = 80, rowGap = 60, startX = 40, startY = 30;
  const nodeBoxes = {};
  let colHeights = [startY, startY];
  labNodes.forEach((n, i) => {
    const col = i % cols;
    const x = startX + col * (W + colGap);
    const y = colHeights[col];
    const box = umlClass(x, y, W, n.text, n.attrs || [], n.methods || [], false, false);
    nodeBoxes[n.id] = box;
    colHeights[col] = y + box.h + rowGap;
  });
  let svgContent = '';
  labConnections.forEach(c => {
    const from = nodeBoxes[c.from], to = nodeBoxes[c.to];
    if (!from || !to) return;
    svgContent += drawUMLConnection(from, to, c.type);
  });
  labNodes.forEach(n => { svgContent += nodeBoxes[n.id].svg; });
  const totalH = Math.max(400, ...Object.values(nodeBoxes).map(b => b.bottom + 40));
  const totalW = startX * 2 + cols * W + (cols - 1) * colGap;
  canvas.innerHTML = `<svg viewBox="0 0 ${totalW} ${totalH}" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto">${SVG_DEFS}${svgContent}</svg>`;
}

function drawUMLConnection(from, to, type) {
  const pts = getBestConnectionPoints(from, to);
  const { x1, y1, x2, y2 } = pts;
  const mx = (x1+x2)/2, my = (y1+y2)/2;
  const dx = x2-x1, dy = y2-y1, len = Math.sqrt(dx*dx+dy*dy)||1;
  const off = 14, sx = x1+(dx/len)*10, sy = y1+(dy/len)*10;
  const ex = x2-(dx/len)*off, ey = y2-(dy/len)*off;
  let out = '';
  if (type === 'inherit') {
    out += `<line x1="${x1}" y1="${y1}" x2="${ex}" y2="${ey}" stroke="#a78bfa" stroke-width="2"/>`;
    out += drawOpenTriangle(x2, y2, dx, dy, '#a78bfa');
    out += drawRelLabel(mx, my, 'herencia', '#a78bfa');
  } else if (type === 'compose') {
    out += `<line x1="${sx}" y1="${sy}" x2="${ex}" y2="${ey}" stroke="#f87171" stroke-width="2" marker-end="url(#arrowAssoc)"/>`;
    out += drawDiamond(x1, y1, dx, dy, '#f87171', true);
    out += drawRelLabel(mx, my, 'composición ◆', '#f87171');
  } else if (type === 'agg') {
    out += `<line x1="${sx}" y1="${sy}" x2="${ex}" y2="${ey}" stroke="#60a5fa" stroke-width="2" marker-end="url(#arrowAssoc)"/>`;
    out += drawDiamond(x1, y1, dx, dy, '#60a5fa', false);
    out += drawRelLabel(mx, my, 'agregación ◇', '#60a5fa');
  } else {
    out += `<line x1="${x1}" y1="${y1}" x2="${ex}" y2="${ey}" stroke="#9898b8" stroke-width="2" marker-end="url(#arrowAssoc)"/>`;
    out += drawRelLabel(mx, my, 'asociación', '#9898b8');
  }
  return out;
}

function getBestConnectionPoints(from, to) {
  const fromCX = (from.left+from.right)/2, toCX = (to.left+to.right)/2;
  if (Math.abs(fromCX-toCX) < 60) {
    if (from.bottom < to.top) return { x1: fromCX, y1: from.bottom, x2: toCX, y2: to.top };
    return { x1: fromCX, y1: from.top, x2: toCX, y2: to.bottom };
  }
  if (from.right < to.left) return { x1: from.right, y1: (from.top+from.bottom)/2, x2: to.left, y2: (to.top+to.bottom)/2 };
  return { x1: from.left, y1: (from.top+from.bottom)/2, x2: to.right, y2: (to.top+to.bottom)/2 };
}

function drawOpenTriangle(tipX, tipY, dx, dy, color) {
  const len = Math.sqrt(dx*dx+dy*dy)||1, ux = dx/len, uy = dy/len;
  const s = 14, h = 8;
  const bx = tipX-ux*s, by = tipY-uy*s;
  return `<polygon points="${tipX},${tipY} ${bx-uy*h},${by+ux*h} ${bx+uy*h},${by-ux*h}" fill="#0f172a" stroke="${color}" stroke-width="2"/>`;
}

function drawDiamond(cx, cy, dx, dy, color, filled) {
  const len = Math.sqrt(dx*dx+dy*dy)||1, ux = dx/len, uy = dy/len;
  const h = 12, w = 7;
  const tip1x = cx-ux*h, tip1y = cy-uy*h;
  const lx = cx-ux*(h/2)-uy*w, ly = cy-uy*(h/2)+ux*w;
  const rx = cx-ux*(h/2)+uy*w, ry = cy-uy*(h/2)-ux*w;
  return `<polygon points="${cx},${cy} ${lx},${ly} ${tip1x},${tip1y} ${rx},${ry}" fill="${filled ? color : '#0f172a'}" stroke="${color}" stroke-width="2"/>`;
}

function drawRelLabel(x, y, text, color) {
  return `<rect x="${x - text.length*3.2}" y="${y - 9}" width="${text.length*6.4}" height="14" rx="4" fill="rgba(15,23,42,0.85)"/>
  <text x="${x}" y="${y + 2}" text-anchor="middle" font-size="9" font-family="Inter,sans-serif" fill="${color}" font-weight="600">${text}</text>`;
}

// =============================================
// FLOW / ACTIVITY CANVAS (existing, preserved)
// =============================================

function renderFlowCanvas(canvas) {
  let svgContent = '';
  labConnections.forEach(c => {
    const from = labNodes.find(n => n.id === c.from);
    const to = labNodes.find(n => n.id === c.to);
    if (!from || !to) return;
    const isFromDecision = from.type === 'decision';
    const fromOtherConns = labConnections.filter(lc => lc.from === c.from);
    const connIdx = fromOtherConns.indexOf(c);
    let x1 = from.x, y1 = from.y + 20;
    const x2 = to.x, y2 = to.y - 20;
    if (isFromDecision) {
      if (fromOtherConns.length > 1) {
        if (connIdx === 0) { x1 = from.x - 75; y1 = from.y; }
        else { x1 = from.x + 75; y1 = from.y; }
      }
    } else if (fromOtherConns.length > 1) {
      x1 += (connIdx - (fromOtherConns.length-1)/2) * 25;
    }
    svgContent += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="act-arrow"/>`;
    if (c.label) {
      const mx = (x1+x2)/2 + (isFromDecision ? (x1 < x2 ? 15 : -35) : 5);
      const my = (y1+y2)/2 - 5;
      svgContent += `<rect x="${mx-2}" y="${my-10}" width="${c.label.length*7+4}" height="14" rx="3" fill="#161628" opacity="0.8"/>`;
      svgContent += `<text x="${mx}" y="${my}" fill="#ffc107" font-size="11" font-family="Inter" font-weight="700">${c.label}</text>`;
    }
  });
  labNodes.forEach(n => {
    const w = 150, h = 42;
    if (n.type === 'start') {
      svgContent += `<rect x="${n.x-w/2}" y="${n.y-h/2}" width="${w}" height="${h}" rx="21" class="act-oval"/>`;
    } else if (n.type === 'process') {
      svgContent += `<rect x="${n.x-w/2}" y="${n.y-h/2}" width="${w}" height="${h}" class="act-rect"/>`;
    } else if (n.type === 'decision') {
      svgContent += `<polygon points="${n.x},${n.y-30} ${n.x+75},${n.y} ${n.x},${n.y+30} ${n.x-75},${n.y}" class="act-diamond"/>`;
      svgContent += `<text x="${n.x}" y="${n.y+5}" text-anchor="middle" class="act-text-white act-text">${n.text}</text>`;
      return;
    } else if (n.type === 'io') {
      svgContent += `<polygon points="${n.x-65},${n.y+21} ${n.x+85},${n.y+21} ${n.x+65},${n.y-21} ${n.x-85},${n.y-21}" class="act-para"/>`;
    }
    svgContent += `<text x="${n.x}" y="${n.y+5}" text-anchor="middle" class="act-text">${n.text}</text>`;
  });
  const maxH = Math.max(500, ...labNodes.map(n => n.y + 120));
  canvas.innerHTML = `<svg viewBox="0 0 500 ${maxH}" xmlns="http://www.w3.org/2000/svg" style="width:100%">${SVG_DEFS}${svgContent}</svg>`;
}

// =============================================
// USE CASE CANVAS (NEW)
// =============================================

function renderUseCaseCanvas(canvas) {
  const actors = labNodes.filter(n => n.type === 'actor');
  const usecases = labNodes.filter(n => n.type === 'usecase');
  const systemNode = labNodes.find(n => n.type === 'system');
  const W = 560, H = Math.max(380, usecases.length * 80 + 100);
  const sysX = 130, sysY = 40, sysW = 300, sysH = H - 80;

  usecases.forEach((uc, i) => { uc._cx = sysX + sysW/2; uc._cy = sysY + 60 + i * 80; });
  actors.filter((_,i) => i%2===0).forEach((a,i) => { a._cx = 55; a._cy = sysY + 60 + i*110; });
  actors.filter((_,i) => i%2===1).forEach((a,i) => { a._cx = W-55; a._cy = sysY + 60 + i*110; });

  let svg = '';
  // System boundary
  svg += `<rect x="${sysX}" y="${sysY}" width="${sysW}" height="${sysH}" rx="10" fill="rgba(26,26,48,0.5)" stroke="#4a4a7a" stroke-width="2"/>`;
  svg += `<text x="${sysX+sysW/2}" y="${sysY+20}" text-anchor="middle" font-family="Inter" font-size="12" font-weight="700" fill="#7c5cfc">${systemNode ? systemNode.text : 'Sistema'}</text>`;

  // Connections (draw behind elements)
  labConnections.forEach(c => {
    const from = labNodes.find(n => n.id === c.from);
    const to = labNodes.find(n => n.id === c.to);
    if (!from || !to || from.type === 'system' || to.type === 'system') return;
    const x1 = from._cx||0, y1 = from._cy||0, x2 = to._cx||0, y2 = to._cy||0;
    const mx = (x1+x2)/2, my = (y1+y2)/2;
    const dx = x2-x1, dy = y2-y1;
    if (c.type === 'assoc') {
      svg += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#22d3a0" stroke-width="1.5"/>`;
    } else if (c.type === 'include') {
      svg += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#7c5cfc" stroke-width="1.5" stroke-dasharray="6 3" marker-end="url(#arrowAssoc)"/>`;
      svg += drawRelLabel(mx, my, '«include»', '#7c5cfc');
    } else if (c.type === 'extend') {
      svg += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#f87171" stroke-width="1.5" stroke-dasharray="6 3" marker-end="url(#arrowAssoc)"/>`;
      svg += drawRelLabel(mx, my, '«extend»', '#f87171');
    } else if (c.type === 'generalize') {
      svg += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#60a5fa" stroke-width="1.5"/>`;
      svg += drawOpenTriangle(x2, y2, dx, dy, '#60a5fa');
    }
  });

  // Use cases (ellipses)
  usecases.forEach(uc => {
    svg += `<ellipse cx="${uc._cx}" cy="${uc._cy}" rx="70" ry="24" fill="rgba(74,74,122,0.4)" stroke="#7c5cfc" stroke-width="1.5"/>`;
    svg += `<text x="${uc._cx}" y="${uc._cy+5}" text-anchor="middle" font-family="Inter" font-size="11" fill="#c4b5fd">${uc.text}</text>`;
  });

  // Actors (stick figures)
  actors.forEach(a => { svg += drawStickFigure(a._cx||55, a._cy||80, a.text); });

  canvas.innerHTML = `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto">${SVG_DEFS}${svg}</svg>`;
}

function drawStickFigure(cx, cy, name) {
  const R=10, bH=24, lH=20, aW=14;
  return [
    `<circle cx="${cx}" cy="${cy-bH-R}" r="${R}" fill="none" stroke="#22d3a0" stroke-width="1.8"/>`,
    `<line x1="${cx}" y1="${cy-bH}" x2="${cx}" y2="${cy}" stroke="#22d3a0" stroke-width="1.8"/>`,
    `<line x1="${cx-aW}" y1="${cy-bH+8}" x2="${cx+aW}" y2="${cy-bH+8}" stroke="#22d3a0" stroke-width="1.8"/>`,
    `<line x1="${cx}" y1="${cy}" x2="${cx-aW}" y2="${cy+lH}" stroke="#22d3a0" stroke-width="1.8"/>`,
    `<line x1="${cx}" y1="${cy}" x2="${cx+aW}" y2="${cy+lH}" stroke="#22d3a0" stroke-width="1.8"/>`,
    `<text x="${cx}" y="${cy+lH+16}" text-anchor="middle" font-family="Inter" font-size="11" fill="#22d3a0" font-weight="600">${name}</text>`,
  ].join('');
}

// =============================================
// SEQUENCE CANVAS (NEW)
// =============================================

function renderSequenceCanvas(canvas) {
  const lifelines = labNodes;
  const SPACING = 160, HEADER_H = 44, MSG_GAP = 54, LL_START_Y = HEADER_H + 18;
  const W = Math.max(500, lifelines.length * SPACING + 60);
  const H = Math.max(300, LL_START_Y + labConnections.length * MSG_GAP + 80);

  let svg = '';

  // Lifelines headers + vertical dashed lines
  lifelines.forEach((ll, i) => {
    ll._cx = 60 + i * SPACING;
    const hx = ll._cx - 60, hy = 10;
    svg += `<rect x="${hx}" y="${hy}" width="120" height="${HEADER_H}" rx="4" class="seq-head"/>`;
    svg += `<text x="${ll._cx}" y="${hy + HEADER_H/2 + 5}" text-anchor="middle" class="seq-text" font-size="11">${ll.text}</text>`;
    svg += `<line x1="${ll._cx}" y1="${hy+HEADER_H}" x2="${ll._cx}" y2="${H-20}" stroke="#4a4a7a" stroke-width="1.5" stroke-dasharray="5 3"/>`;
  });

  // Messages
  labConnections.forEach((c, i) => {
    const fromLL = labNodes.find(n => n.id === c.from);
    const toLL = labNodes.find(n => n.id === c.to);
    if (!fromLL || !toLL) return;
    const y = LL_START_Y + 20 + i * MSG_GAP;
    const x1 = fromLL._cx, x2 = toLL._cx;
    const label = c.label || `msg${i+1}()`;
    const mx = (x1+x2)/2;
    const isReturn = c.type === 'return', isAsync = c.type === 'async';
    const color = isReturn ? '#9898b8' : (isAsync ? '#60a5fa' : '#22d3a0');

    // Activation bar on sender
    svg += `<rect x="${x1-5}" y="${y-3}" width="10" height="26" rx="2" fill="${color}" opacity="0.45"/>`;

    // Arrow
    if (isReturn) {
      svg += `<line x1="${x1}" y1="${y+10}" x2="${x2}" y2="${y+10}" stroke="#9898b8" stroke-width="1.5" stroke-dasharray="5 3" marker-end="url(#arrowOpen)"/>`;
    } else if (isAsync) {
      svg += `<line x1="${x1}" y1="${y+10}" x2="${x2}" y2="${y+10}" stroke="#60a5fa" stroke-width="2" marker-end="url(#arrowOpen)"/>`;
    } else {
      svg += `<line x1="${x1}" y1="${y+10}" x2="${x2}" y2="${y+10}" stroke="#22d3a0" stroke-width="2" marker-end="url(#arrowFull)"/>`;
    }
    // Label above arrow
    svg += `<rect x="${mx-label.length*3.5-3}" y="${y-4}" width="${label.length*7+6}" height="13" rx="3" fill="rgba(15,23,42,0.9)"/>`;
    svg += `<text x="${mx}" y="${y+6}" text-anchor="middle" font-family="Inter" font-size="10" fill="${isReturn ? '#9898b8' : '#fbbf24'}" font-weight="600">${label}</text>`;
  });

  canvas.innerHTML = `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto">${SVG_DEFS}${svg}</svg>`;
}

// =============================================
// COMMUNICATION CANVAS (NEW)
// =============================================

function renderCommsCanvas(canvas) {
  const objs = labNodes;
  const W = 540, H = 360;
  // Distributed positions for up to 8 objects
  const positions = [
    {x:60,y:80}, {x:300,y:30}, {x:460,y:80},
    {x:60,y:240}, {x:300,y:280}, {x:460,y:240},
    {x:200,y:160}, {x:380,y:160},
  ];
  objs.forEach((o, i) => { o._cx = positions[i % positions.length].x; o._cy = positions[i % positions.length].y; });

  let svg = '';

  // Links (draw behind objects)
  labConnections.forEach(c => {
    const from = objs.find(n => n.id === c.from);
    const to = objs.find(n => n.id === c.to);
    if (!from || !to) return;
    const bW = 110, bH = 32;
    const cx1 = from._cx + bW/2, cy1 = from._cy + bH/2;
    const cx2 = to._cx + bW/2, cy2 = to._cy + bH/2;
    const mx = (cx1+cx2)/2, my = (cy1+cy2)/2;
    const numLabel = `${c.seqNum}: ${c.label || 'msg()'}`;
    svg += `<line x1="${cx1}" y1="${cy1}" x2="${cx2}" y2="${cy2}" stroke="#4a4a7a" stroke-width="1.5"/>`;
    svg += `<rect x="${mx-numLabel.length*3.5}" y="${my-10}" width="${numLabel.length*7}" height="14" rx="3" fill="rgba(15,23,42,0.95)"/>`;
    svg += `<text x="${mx}" y="${my+2}" text-anchor="middle" font-family="Inter" font-size="10" fill="#fbbf24" font-weight="700">${numLabel}</text>`;
    // Direction arrow
    const dx = cx2-cx1, dy = cy2-cy1, len = Math.sqrt(dx*dx+dy*dy)||1;
    const ax = cx2 - (dx/len)*16, ay = cy2 - (dy/len)*16;
    svg += `<line x1="${mx+5}" y1="${my+3}" x2="${ax}" y2="${ay}" stroke="#22d3a0" stroke-width="1.5" marker-end="url(#arrowAssoc)" opacity="0.8"/>`;
  });

  // Objects (on top)
  objs.forEach(o => {
    const bW = 110, bH = 32;
    svg += `<rect x="${o._cx}" y="${o._cy}" width="${bW}" height="${bH}" rx="4" class="seq-head"/>`;
    svg += `<text x="${o._cx+bW/2}" y="${o._cy+bH/2+5}" text-anchor="middle" class="seq-text" font-size="11">${o.text}</text>`;
  });

  canvas.innerHTML = `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto">${SVG_DEFS}${svg}</svg>`;
}

// =============================================
// STATES CANVAS (NEW)
// =============================================

function renderStatesCanvas(canvas) {
  const states = labNodes.filter(n => n.type === 'state');
  const initial = labNodes.find(n => n.type === 'initial');
  const final = labNodes.find(n => n.type === 'final');
  const W = 500;

  // Auto-layout positions
  const posMap = {};
  let y = 50;
  if (initial) { posMap[initial.id] = { cx: 120, cy: y }; y += 90; }
  states.forEach((s, i) => {
    posMap[s.id] = { cx: 80 + (i % 2) * 200, cy: y + Math.floor(i/2) * 90 };
    if (i % 2 === 1) y += 90;
  });
  if (states.length % 2 === 0 && states.length > 0) y += 90;
  if (final) { posMap[final.id] = { cx: 160, cy: y }; }
  const H2 = Math.max(300, y + 80);

  let svg = '';

  // Transitions (draw first)
  labConnections.forEach(c => {
    const from = labNodes.find(n => n.id === c.from);
    const to = labNodes.find(n => n.id === c.to);
    if (!from || !to) return;
    const fp = posMap[c.from], tp = posMap[c.to];
    if (!fp || !tp) return;
    const x1 = fp.cx, y1 = fp.cy, x2 = tp.cx, y2 = tp.cy;
    const dx = x2-x1, dy = y2-y1, len = Math.sqrt(dx*dx+dy*dy)||1;
    const mx = (x1+x2)/2, my = (y1+y2)/2;
    const ex = x2-(dx/len)*16, ey = y2-(dy/len)*16;
    svg += `<line x1="${x1}" y1="${y1}" x2="${ex}" y2="${ey}" stroke="#22d3a0" stroke-width="2" marker-end="url(#arrowFull)"/>`;
    if (c.label) {
      svg += `<rect x="${mx-c.label.length*3.2}" y="${my-9}" width="${c.label.length*6.4}" height="13" rx="3" fill="rgba(15,23,42,0.95)"/>`;
      svg += `<text x="${mx}" y="${my+2}" text-anchor="middle" font-family="Inter" font-size="10" fill="#fbbf24" font-weight="600">${c.label}</text>`;
    }
  });

  // State nodes
  states.forEach(s => {
    const p = posMap[s.id]; if (!p) return;
    svg += `<rect x="${p.cx-65}" y="${p.cy-20}" width="130" height="40" rx="20" fill="rgba(74,74,122,0.5)" stroke="#7c5cfc" stroke-width="2"/>`;
    svg += `<text x="${p.cx}" y="${p.cy+6}" text-anchor="middle" font-family="Inter" font-size="12" fill="#c4b5fd" font-weight="600">${s.text}</text>`;
  });

  // Initial ⚫
  if (initial) {
    const p = posMap[initial.id];
    svg += `<circle cx="${p.cx}" cy="${p.cy}" r="9" fill="#c4b5fd"/>`;
  }

  // Final ⊙ (double circle)
  if (final) {
    const p = posMap[final.id];
    svg += `<circle cx="${p.cx}" cy="${p.cy}" r="12" fill="none" stroke="#c4b5fd" stroke-width="1.5"/>`;
    svg += `<circle cx="${p.cx}" cy="${p.cy}" r="6" fill="#c4b5fd"/>`;
  }

  canvas.innerHTML = `<svg viewBox="0 0 ${W} ${H2}" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto">${SVG_DEFS}${svg}</svg>`;
}

// =============================================
// VALIDATION ENGINE
// =============================================

function validateLabState() {
  const feedback = document.getElementById('lab-feedback');
  const status = document.getElementById('realtime-status');
  if (!feedback || currentExerciseIdx === -1) return;

  const ex = LAB_EXERCISES[activeSection][currentExerciseIdx];
  if (!ex) return;
  const sol = ex.solution;
  let hint = '', complete = false;

  if (labNodes.length === 0) {
    hint = 'Empieza añadiendo elementos al lienzo.';
  } else {
    switch (currentLabMode) {
      case 'uml':      [hint, complete] = validateUML(sol); break;
      case 'flow':     [hint, complete] = validateFlow(sol); break;
      case 'usecase':  [hint, complete] = validateUseCase(sol); break;
      case 'sequence': [hint, complete] = validateSequence(sol); break;
      case 'comms':    [hint, complete] = validateComms(sol); break;
      case 'states':   [hint, complete] = validateStates(sol); break;
    }
  }

  if (complete) {
    feedback.classList.remove('hidden');
    feedback.className = 'lab-feedback-board success';
    document.getElementById('fb-msg').innerHTML = '<strong>¡Felicidades!</strong> El diagrama cumple con todos los requisitos del desafío. 🚀';
    status.innerHTML = '<span class="status-icon success">●</span> Correcto';
  } else if (hint) {
    feedback.classList.remove('hidden');
    feedback.className = 'lab-feedback-board info';
    document.getElementById('fb-msg').textContent = hint;
    status.innerHTML = '<span class="status-icon info">●</span> Trabajando...';
  } else {
    feedback.classList.add('hidden');
  }
}

function validateUML(sol) {
  // --- 1. Validate node count ---
  const requiredNodeCount = sol.nodes.length;
  if (labNodes.length < requiredNodeCount) {
    return [sol.hints?.node_count || `Necesitas ${requiredNodeCount} clase(s). Tienes ${labNodes.length}.`, false];
  }

  // --- 2. Validate each node ---
  for (const solNode of sol.nodes) {
    const matchedNode = labNodes.find(n => n.text.toLowerCase().includes(solNode.text.toLowerCase()));
    if (!matchedNode) {
      return [sol.hints?.wrong_name || `Falta la clase "${solNode.text}".`, false];
    }

    // --- 2a. Validate attributes (supports both old string[] and new object[] format) ---
    if (solNode.attrs) {
      for (const solAttr of solNode.attrs) {
        // New format: { keyword, visibility, type }
        if (typeof solAttr === 'object' && solAttr.keyword) {
          const foundAttr = matchedNode.attrs?.find(ma => ma.toLowerCase().includes(solAttr.keyword.toLowerCase()));
          if (!foundAttr) {
            return [sol.hints?.missing_attrs || `Falta el atributo "${solAttr.keyword}" en "${solNode.text}".`, false];
          }
          // Check visibility prefix
          if (solAttr.visibility) {
            const attrTrimmed = foundAttr.trim();
            if (!attrTrimmed.startsWith(solAttr.visibility)) {
              return [sol.hints?.wrong_visibility || `El atributo "${solAttr.keyword}" debe tener visibilidad "${solAttr.visibility}" (${solAttr.visibility === '-' ? 'privado' : solAttr.visibility === '+' ? 'público' : solAttr.visibility === '#' ? 'protegido' : 'paquete'}).`, false];
            }
          }
          // Check type
          if (solAttr.type) {
            const colonIdx = foundAttr.indexOf(':');
            if (colonIdx === -1) {
              return [`El atributo "${solAttr.keyword}" necesita indicar el tipo. Formato: "visibilidad nombre : tipo". Ejemplo: "${solAttr.visibility || '-'} ${solAttr.keyword} : ${solAttr.type}"`, false];
            }
            const declaredType = foundAttr.substring(colonIdx + 1).trim().toLowerCase();
            if (!declaredType.includes(solAttr.type.toLowerCase())) {
              return [sol.hints?.wrong_type || `El tipo de "${solAttr.keyword}" debe ser ${solAttr.type}, no "${declaredType}".`, false];
            }
          }
        } else {
          // Old format: plain string
          if (!matchedNode.attrs?.some(ma => ma.toLowerCase().includes(solAttr.toLowerCase()))) {
            return [sol.hints?.missing_attrs || `Falta el atributo "${solAttr}" en "${solNode.text}".`, false];
          }
        }
      }
    }

    // --- 2b. Validate methods (supports both old string[] and new object[] format) ---
    if (solNode.methods) {
      for (const solMeth of solNode.methods) {
        if (typeof solMeth === 'object' && solMeth.keyword) {
          const foundMeth = matchedNode.methods?.find(mm => mm.toLowerCase().includes(solMeth.keyword.toLowerCase()));
          if (!foundMeth) {
            return [sol.hints?.missing_meths || `Falta el método "${solMeth.keyword}()" en "${solNode.text}".`, false];
          }
          // Check visibility prefix
          if (solMeth.visibility) {
            const methTrimmed = foundMeth.trim();
            if (!methTrimmed.startsWith(solMeth.visibility)) {
              return [sol.hints?.wrong_visibility || `El método "${solMeth.keyword}()" debe tener visibilidad "${solMeth.visibility}" (${solMeth.visibility === '+' ? 'público' : solMeth.visibility === '-' ? 'privado' : solMeth.visibility === '#' ? 'protegido' : 'paquete'}).`, false];
            }
          }
          // Check return type
          if (solMeth.returnType) {
            const colonIdx = foundMeth.indexOf(':');
            if (colonIdx === -1) {
              return [`El método "${solMeth.keyword}()" necesita indicar el tipo de retorno. Formato: "visibilidad nombre() : tipo". Ejemplo: "${solMeth.visibility || '+'} ${solMeth.keyword}() : ${solMeth.returnType}"`, false];
            }
            const declaredReturn = foundMeth.substring(colonIdx + 1).trim().toLowerCase();
            if (!declaredReturn.includes(solMeth.returnType.toLowerCase())) {
              // Check for type coherence hint (getter returning wrong type)
              if (sol.hints?.type_mismatch && solMeth.keyword.toLowerCase().startsWith('get')) {
                return [sol.hints.type_mismatch, false];
              }
              return [sol.hints?.wrong_type || `El método "${solMeth.keyword}()" debe devolver ${solMeth.returnType}, no "${declaredReturn}".`, false];
            }
          }
        } else {
          // Old format: plain string
          if (!matchedNode.methods?.some(mm => mm.toLowerCase().includes(solMeth.toLowerCase()))) {
            return [sol.hints?.missing_meths || `Falta el método "${solMeth}()" en "${solNode.text}".`, false];
          }
        }
      }
    }
  }

  // --- 3. Validate relationships ---
  if (sol.rels) {
    for (const sr of sol.rels) {
      const fromN = labNodes.find(ln => ln.text.toLowerCase().includes(sr.from.toLowerCase()));
      const toN = labNodes.find(ln => ln.text.toLowerCase().includes(sr.to.toLowerCase()));
      if (!fromN || !toN || !labConnections.some(c => c.from===fromN.id && c.to===toN.id && c.type===sr.type)) {
        return [sol.hints?.missing_rel || 'Faltan relaciones.', false];
      }
    }
  }
  return ['', true];
}

function validateFlow(sol) {
  const hasStart = labNodes.some(n => n.text.toLowerCase().includes('inicio'));
  const hasEnd = labNodes.some(n => n.text.toLowerCase().includes('fin'));
  const hasDecision = labNodes.some(n => n.type === 'decision');
  if (!hasStart) return [sol.hints?.missing_start || 'Falta el bloque Inicio.', false];
  if (!hasDecision && sol.nodes_flow.includes('?')) return [sol.hints?.missing_decision || 'Falta un bloque de decisión.', false];
  if (!hasEnd) return [sol.hints?.missing_end || 'Falta el bloque Fin.', false];
  const allText = labNodes.map(n => n.text.toLowerCase());
  const missing = sol.nodes_flow.find(k => k !== '?' && !allText.some(t => t.includes(k.toLowerCase())));
  if (missing) return [`Falta el bloque de: "${missing}"`, false];

  // Validate connections: each node (except end) should have at least one outgoing connection
  const nonEndNodes = labNodes.filter(n => !n.text.toLowerCase().includes('fin'));
  if (nonEndNodes.length > 0 && labConnections.length === 0) {
    return ['Conecta los bloques entre sí usando la opción "Conectar con..." debajo de cada elemento.', false];
  }
  const disconnectedNode = nonEndNodes.find(n => !labConnections.some(c => c.from === n.id));
  if (disconnectedNode) {
    return [`El bloque "${disconnectedNode.text}" no está conectado con ningún otro. Usa "Conectar con..." para enlazarlo.`, false];
  }
  // Decision nodes should have at least 2 outgoing connections (Sí / No)
  if (hasDecision) {
    const decisionNodes = labNodes.filter(n => n.type === 'decision');
    for (const dn of decisionNodes) {
      const outConns = labConnections.filter(c => c.from === dn.id);
      if (outConns.length < 2) {
        return [`El bloque de decisión "${dn.text}" necesita al menos 2 salidas (Sí / No). Tiene ${outConns.length}.`, false];
      }
    }
  }

  return ['', true];
}

function validateUseCase(sol) {
  for (const a of sol.actors) {
    if (!labNodes.some(n => n.type === 'actor' && n.text.toLowerCase().includes(a.toLowerCase()))) {
      return [`Falta añadir el actor: "${a}"`, false];
    }
  }
  for (const uc of sol.usecases) {
    if (!labNodes.some(n => n.type === 'usecase' && n.text.toLowerCase().includes(uc.toLowerCase()))) {
      return [`Falta añadir el caso de uso: "${uc}"`, false];
    }
  }
  if (sol.rels) {
    for (const r of sol.rels) {
      const fromN = labNodes.find(n => n.text.toLowerCase().includes(r.from.toLowerCase()));
      const toN = labNodes.find(n => n.text.toLowerCase().includes(r.to.toLowerCase()));
      if (!fromN || !toN) return [`Conecta "${r.from}" con "${r.to}"`, false];
      if (!labConnections.some(c => c.from===fromN.id && c.to===toN.id && c.type===r.type)) {
        const lbl = { assoc:'asociación', include:'«include»', extend:'«extend»', generalize:'generalización' }[r.type] || r.type;
        return [`Falta la relación de ${lbl} entre "${r.from}" y "${r.to}"`, false];
      }
    }
  }
  return ['', true];
}

function validateSequence(sol) {
  for (const ll of sol.lifelines) {
    if (!labNodes.some(n => n.type === 'lifeline' && n.text.toLowerCase().includes(ll.toLowerCase().replace(':','')))) {
      return [`Falta añadir el objeto: "${ll}"`, false];
    }
  }
  if (labConnections.length < (sol.minMessages || 1)) {
    return [`Añade al menos ${sol.minMessages || 1} mensaje(s).`, false];
  }
  if (sol.messages) {
    for (const m of sol.messages) {
      if (!labConnections.some(c => c.label && c.label.toLowerCase().includes(m.toLowerCase()))) {
        return [`Falta el mensaje: "${m}"`, false];
      }
    }
  }
  return ['', true];
}

function validateComms(sol) {
  for (const o of sol.objects) {
    if (!labNodes.some(n => n.type === 'obj' && n.text.toLowerCase().includes(o.toLowerCase().replace(':','')))) {
      return [`Falta el objeto: "${o}"`, false];
    }
  }
  if (labConnections.length < (sol.minMessages || 1)) {
    return [`Añade al menos ${sol.minMessages || 1} enlace(s) numerado(s).`, false];
  }
  if (sol.links) {
    for (const l of sol.links) {
      const fromN = labNodes.find(n => n.text.toLowerCase().includes(l.from.toLowerCase().replace(':','')));
      const toN = labNodes.find(n => n.text.toLowerCase().includes(l.to.toLowerCase().replace(':','')));
      if (!fromN || !toN) return [`Crea el enlace entre "${l.from}" y "${l.to}"`, false];
      if (!labConnections.some(c => c.from===fromN.id && c.to===toN.id)) {
        return [`Falta el enlace entre "${l.from}" y "${l.to}"`, false];
      }
    }
  }
  return ['', true];
}

function validateStates(sol) {
  if (sol.needsInitial && !labNodes.some(n => n.type === 'initial')) {
    return ['Añade el estado inicial ⚫ (círculo negro relleno).', false];
  }
  for (const s of sol.states) {
    if (!labNodes.some(n => n.type === 'state' && n.text.toLowerCase().includes(s.toLowerCase()))) {
      return [`Falta añadir el estado: "${s}"`, false];
    }
  }
  if (sol.transitions) {
    for (const t of sol.transitions) {
      const fromN = t.from === 'initial'
        ? labNodes.find(n => n.type === 'initial')
        : labNodes.find(n => n.text.toLowerCase().includes(t.from.toLowerCase()));
      const toN = t.to === 'final'
        ? labNodes.find(n => n.type === 'final')
        : labNodes.find(n => n.text.toLowerCase().includes(t.to.toLowerCase()));
      if (!fromN || !toN) return [`Crea la transición de "${t.from}" a "${t.to}"`, false];
      if (!labConnections.some(c => c.from===fromN.id && c.to===toN.id)) {
        return [`Falta la transición de "${t.from}" a "${t.to}"`, false];
      }
    }
  }
  if (sol.needsFinal && !labNodes.some(n => n.type === 'final')) {
    return ['Añade el estado final 🎯 (doble círculo).', false];
  }
  return ['', true];
}

// =============================================
// SHOW SOLUTION + DOWNLOAD
// =============================================

function showLabSolution() {
  if (currentExerciseIdx === -1) return;
  const ex = LAB_EXERCISES[activeSection][currentExerciseIdx];
  const sol = ex.solution;
  let msg = `💡 Pistas para "${ex.title}":\n\n`;
  switch (currentLabMode) {
    case 'usecase':
      msg += `ACTORES: ${sol.actors.join(', ')}\nCASOS DE USO: ${sol.usecases.join(', ')}\n`;
      msg += `RELACIONES:\n${sol.rels.map(r => `  ${r.from} --[${r.type}]--> ${r.to}`).join('\n')}`;
      break;
    case 'sequence':
      msg += `OBJETOS: ${sol.lifelines.join(', ')}\nMENSAJES (escribe en el campo de texto): ${(sol.messages||[]).join(', ')}`;
      break;
    case 'comms':
      msg += `OBJETOS: ${sol.objects.join(', ')}\nENLACES: ${(sol.links||[]).map(l => `${l.from}→${l.to}`).join(', ')}`;
      break;
    case 'states':
      msg += `ESTADOS: ${sol.states.join(', ')}\nTRANSICIONES:${(sol.transitions||[]).map(t => `\n  ${t.from} → ${t.to}`).join('')}`;
      break;
    default:
      msg += 'Sigue las pistas en pantalla.';
  }
  alert(msg);
}

function downloadLabSVG() {
  const svg = document.querySelector('#lab-canvas svg');
  if (!svg) return;
  const source = '<?xml version="1.0" standalone="no"?>\r\n' + new XMLSerializer().serializeToString(svg);
  const link = document.createElement('a');
  link.href = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(source);
  link.download = `diagrama-${currentLabMode}-${Date.now()}.svg`;
  link.click();
}
