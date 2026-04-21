// =============================================
// SVG GENERATORS — UML Diagrams
// =============================================

const SVG_DEFS = `<defs>
  <marker id="arrowMsg" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
    <polygon points="0 0, 10 3.5, 0 7" fill="#9898b8"/>
  </marker>
  <marker id="arrowReturn" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
    <polygon points="0 0, 10 3.5, 0 7" fill="#9898b8" fill-opacity="0.6"/>
  </marker>
  <marker id="arrowState" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
    <polygon points="0 0, 10 3.5, 0 7" fill="#4a4a7a"/>
  </marker>
  <marker id="arrowAct" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
    <polygon points="0 0, 10 3.5, 0 7" fill="#555"/>
  </marker>
  <marker id="arrowInherit" markerWidth="12" markerHeight="12" refX="11" refY="6" orient="auto">
    <polygon points="0 0, 12 6, 0 12" fill="#1a1a30" stroke="#4a4a7a" stroke-width="1"/>
  </marker>
  <marker id="arrowRealize" markerWidth="12" markerHeight="12" refX="11" refY="6" orient="auto">
    <polygon points="0 0, 12 6, 0 12" fill="#1a1a30" stroke="#7c5cfc" stroke-width="1"/>
  </marker>
  <marker id="arrowDep" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
    <polygon points="0 0, 10 3.5, 0 7" fill="#fbbf24"/>
  </marker>
  <marker id="arrowAssoc" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
    <polygon points="0 0, 10 3.5, 0 7" fill="#9898b8"/>
  </marker>
  <marker id="arrowOpen" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto">
    <path d="M 0 0 L 10 5 L 0 10" fill="none" stroke="#7c5cfc" stroke-width="1.5"/>
  </marker>
  <marker id="arrowOpenGray" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto">
    <path d="M 0 0 L 10 5 L 0 10" fill="none" stroke="#9898b8" stroke-width="1.5"/>
  </marker>
</defs>`;

function umlClass(x, y, w, name, attrs, methods, isAbstract, isInterface) {
  const lineH = 20, pad = 12, headerH = 36;
  const attrH = attrs.length * lineH + (attrs.length ? pad : 0);
  const methH = methods.length * lineH + (methods.length ? pad : 0);
  const h = headerH + attrH + methH;
  let out = `<g transform="translate(${x},${y})">`;
  // Box
  out += `<rect width="${w}" height="${h}" class="uml-rect"/>`;
  // Header
  out += `<rect width="${w}" height="${headerH}" class="uml-rect-header"/>`;
  if (isInterface) out += `<text x="${w/2}" y="14" text-anchor="middle" class="uml-stereotype">«interface»</text>`;
  const nameClass = isAbstract || isInterface ? 'uml-text-name' : 'uml-text-name';
  const nameStyle = isAbstract || isInterface ? 'font-style:italic' : '';
  out += `<text x="${w/2}" y="${isInterface ? 28 : 22}" text-anchor="middle" class="${nameClass}" style="${nameStyle}">${name}</text>`;
  // Divider 1
  out += `<line x1="0" y1="${headerH}" x2="${w}" y2="${headerH}" class="uml-line"/>`;
  // Attributes
  attrs.forEach((a, i) => {
    const col = a.startsWith('+') ? 'uml-text-pub' : a.startsWith('-') ? 'uml-text-priv' : a.startsWith('#') ? 'uml-text-prot' : 'uml-text-attr';
    out += `<text x="8" y="${headerH + 16 + i*lineH}" class="uml-text-attr ${col}">${a}</text>`;
  });
  // Divider 2
  if (methods.length) {
    out += `<line x1="0" y1="${headerH + attrH}" x2="${w}" y2="${headerH + attrH}" class="uml-line"/>`;
  }
  // Methods
  methods.forEach((m, i) => {
    const col = m.startsWith('+') ? 'uml-text-pub' : m.startsWith('-') ? 'uml-text-priv' : m.startsWith('#') ? 'uml-text-prot' : 'uml-text-attr';
    const mStyle = m.includes('abstract') ? 'font-style:italic' : '';
    out += `<text x="8" y="${headerH + attrH + 16 + i*lineH}" class="uml-text-attr ${col}" style="${mStyle}">${m.replace(' abstract','')}</text>`;
  });
  out += '</g>';
  out += `<!-- center(${x+w/2},${y+h/2}) bottom(${x+w/2},${y+h}) top(${x+w/2},${y}) left(${x},${y+h/2}) right(${x+w},${y+h/2}) -->`;
  return { svg: out, w, h, cx: x+w/2, cy: y+h/2, top: y, bottom: y+h, left: x, right: x+w, mid_x: x+w/2 };
}

function svgWrap(content, viewBox) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" style="width:100%;max-height:500px">${SVG_DEFS}${content}</svg>`;
}

// ---- Individual Diagram Renderers ----

function renderClaseSimple() {
  let out = '';
  const c = umlClass(20, 20, 260, 'Empleado',
    ['- nombre : String', '- salario : double', '+ MAX_EDAD : int = 65'],
    ['+ getNombre() : String', '+ calcularSalario() : double', '# validar() : void', '- log() : void']
  );
  out += c.svg;
  // Annotations
  out += `<text x="295" y="68" font-family="Inter" font-size="11" fill="#22d3a0">← Público</text>`;
  out += `<text x="295" y="88" font-family="Inter" font-size="11" fill="#f87171">← Privado</text>`;
  out += `<text x="295" y="108" font-family="Inter" font-size="11" fill="#fbbf24">← ~ Paquete, # Prot</text>`;
  out += `<text x="295" y="180" font-family="Inter" font-size="11" fill="#22d3a0">← Métodos públicos</text>`;
  out += `<text x="295" y="220" font-family="Inter" font-size="11" fill="#fbbf24">← Protegido (#)</text>`;
  out += `<text x="295" y="240" font-family="Inter" font-size="11" fill="#f87171">← Privado (-)</text>`;
  return svgWrap(out, '0 0 500 280');
}

function renderHerencia() {
  let out = '';
  // Animal (superclass)
  const a = umlClass(140, 10, 220, 'Animal',
    ['# nombre : String', '# edad : int'],
    ['+ makeSound() : void abstract', '+ move() : void']
  );
  out += a.svg;
  // Perro
  const p = umlClass(20, 160, 170, 'Perro',
    ['- raza : String'],
    ['+ makeSound() : void', '+ fetch() : void']
  );
  out += p.svg;
  // Gato
  const g = umlClass(210, 160, 170, 'Gato',
    ['- indoor : boolean'],
    ['+ makeSound() : void', '+ purr() : void']
  );
  out += g.svg;
  // Arrows (inherit) — from subclass to superclass
  out += `<line x1="105" y1="${p.top}" x2="${a.cx}" y2="${a.bottom}" stroke="#4a4a7a" stroke-width="1.5" marker-end="url(#arrowInherit)"/>`;
  out += `<line x1="295" y1="${g.top}" x2="${a.cx}" y2="${a.bottom}" stroke="#4a4a7a" stroke-width="1.5" marker-end="url(#arrowInherit)"/>`;
  // Labels
  out += `<text x="20" y="155" font-family="Inter" font-size="10" fill="#7c5cfc">Generalización</text>`;
  return svgWrap(out, '0 0 500 290');
}

function renderRelaciones() {
  let out = '';
  // Composición
  out += `<text x="10" y="20" font-family="Inter" font-size="12" fill="#c4b5fd" font-weight="600">Composición ◆</text>`;
  const casa = umlClass(10, 30, 120, 'Casa', ['- m2 : int'], ['+ vender()']);
  const habit = umlClass(180, 30, 130, 'Habitacion', ['- numero : int'], ['+ useRoom()']);
  out += casa.svg; out += habit.svg;
  // Diamond filled at Casa side
  out += `<line x1="${casa.right}" y1="${30+36}" x2="${habit.left}" y2="${30+36}" stroke="#f87171" stroke-width="1.5"/>`;
  out += `<polygon points="${casa.right},${30+30} ${casa.right+8},${30+36} ${casa.right},${30+42} ${casa.right-8},${30+36}" fill="#f87171"/>`;
  out += `<text x="${(casa.right+habit.left)/2-10}" y="${30+28}" font-family="Inter" font-size="10" fill="#f87171">1..*</text>`;

  // Agregación
  out += `<text x="10" y="165" font-family="Inter" font-size="12" fill="#c4b5fd" font-weight="600">Agregación ◇</text>`;
  const dept = umlClass(10, 175, 130, 'Departamento', ['- nombre'], ['+ getProf()']);
  const prof = umlClass(190, 175, 120, 'Profesor', ['- dni'], ['+ impartir()']);
  out += dept.svg; out += prof.svg;
  out += `<line x1="${dept.right}" y1="${175+36}" x2="${prof.left}" y2="${175+36}" stroke="#60a5fa" stroke-width="1.5"/>`;
  out += `<polygon points="${dept.right},${175+30} ${dept.right+8},${175+36} ${dept.right},${175+42} ${dept.right-8},${175+36}" fill="#1a1a30" stroke="#60a5fa" stroke-width="1.5"/>`;

  // Herencia rápida
  out += `<text x="10" y="320" font-family="Inter" font-size="12" fill="#c4b5fd" font-weight="600">Herencia ▷</text>`;
  out += `<line x1="80" y1="330" x2="220" y2="330" stroke="#4a4a7a" stroke-width="1.5" marker-end="url(#arrowInherit)"/>`;
  out += `<text x="30" y="345" font-family="Inter" font-size="11" fill="#9898b8">Subclase</text>`;
  out += `<text x="180" y="345" font-family="Inter" font-size="11" fill="#9898b8">Superclase</text>`;

  // Realización
  out += `<text x="260" y="320" font-family="Inter" font-size="12" fill="#c4b5fd" font-weight="600">Realización ▷⋯</text>`;
  out += `<line x1="290" y1="330" x2="440" y2="330" stroke="#7c5cfc" stroke-width="1.5" stroke-dasharray="6 4" marker-end="url(#arrowRealize)"/>`;
  out += `<text x="245" y="345" font-family="Inter" font-size="11" fill="#9898b8">Clase</text>`;
  out += `<text x="410" y="345" font-family="Inter" font-size="11" fill="#9898b8">«interface»</text>`;

  // Dependencia
  out += `<text x="10" y="380" font-family="Inter" font-size="12" fill="#c4b5fd" font-weight="600">Dependencia «use» ⋯→</text>`;
  out += `<line x1="110" y1="390" x2="250" y2="390" stroke="#fbbf24" stroke-width="1.5" stroke-dasharray="5 4" marker-end="url(#arrowDep)"/>`;
  out += `<text x="40" y="405" font-family="Inter" font-size="11" fill="#9898b8">Pedido</text>`;
  out += `<text x="240" y="405" font-family="Inter" font-size="11" fill="#9898b8">Descuento</text>`;
  out += `<text x="145" y="385" font-family="Inter" font-size="10" fill="#fbbf24">«use»</text>`;

  return svgWrap(out, '0 0 500 420');
}

function renderInterfaces() {
  let out = '';
  const iface = umlClass(160, 10, 180, 'Volable', [], ['+ volar() : void', '+ aterrizar() : void'], true, true);
  const avion = umlClass(20, 160, 160, 'Avion', ['- matricula : String'], ['+ volar() : void', '+ aterrizar() : void']);
  const drone = umlClass(220, 160, 160, 'Dron', ['- bateria : int'], ['+ volar() : void', '+ aterrizar() : void']);
  out += iface.svg; out += avion.svg; out += drone.svg;
  out += `<line x1="${avion.cx}" y1="${avion.top}" x2="${iface.cx}" y2="${iface.bottom}" stroke="#7c5cfc" stroke-width="1.5" stroke-dasharray="6 4" marker-end="url(#arrowRealize)"/>`;
  out += `<line x1="${drone.cx}" y1="${drone.top}" x2="${iface.cx}" y2="${iface.bottom}" stroke="#7c5cfc" stroke-width="1.5" stroke-dasharray="6 4" marker-end="url(#arrowRealize)"/>`;
  out += `<text x="100" y="155" font-family="Inter" font-size="10" fill="#7c5cfc">Realización</text>`;
  out += `<text x="265" y="155" font-family="Inter" font-size="10" fill="#7c5cfc">Realización</text>`;
  return svgWrap(out, '0 0 500 270');
}

function renderCasosUso() {
  let out = '';
  // Boundary
  out += `<rect x="100" y="10" width="320" height="320" rx="4" class="uc-boundary"/>`;
  out += `<text x="260" y="28" class="uc-text" font-size="12" fill="#363660">Sistema de Tienda</text>`;
  // Actor Cliente
  out += `<circle cx="40" cy="100" r="14" class="uc-actor"/>`;
  out += `<line x1="40" y1="114" x2="40" y2="155" class="uc-actor"/>`;
  out += `<line x1="40" y1="130" x2="20" y2="145" class="uc-actor"/>`;
  out += `<line x1="40" y1="130" x2="60" y2="145" class="uc-actor"/>`;
  out += `<line x1="40" y1="155" x2="25" y2="180" class="uc-actor"/>`;
  out += `<line x1="40" y1="155" x2="55" y2="180" class="uc-actor"/>`;
  out += `<text x="40" y="195" class="uc-text" font-size="11">Cliente</text>`;
  // Actor Admin
  out += `<circle cx="460" cy="100" r="14" class="uc-actor"/>`;
  out += `<line x1="460" y1="114" x2="460" y2="155" class="uc-actor"/>`;
  out += `<line x1="460" y1="130" x2="440" y2="145" class="uc-actor"/>`;
  out += `<line x1="460" y1="130" x2="480" y2="145" class="uc-actor"/>`;
  out += `<line x1="460" y1="155" x2="445" y2="180" class="uc-actor"/>`;
  out += `<line x1="460" y1="155" x2="475" y2="180" class="uc-actor"/>`;
  out += `<text x="460" y="195" class="uc-text" font-size="11">Admin</text>`;
  // Use cases
  const ucs = [
    { x: 260, y: 80, w: 140, h: 38, label: 'Realizar Pedido' },
    { x: 260, y: 150, w: 130, h: 38, label: 'Ver Historial' },
    { x: 260, y: 230, w: 140, h: 38, label: 'Identificarse' },
    { x: 260, y: 300, w: 130, h: 38, label: 'Gestionar Stock' },
  ];
  ucs.forEach(u => {
    out += `<ellipse cx="${u.x}" cy="${u.y}" rx="${u.w/2}" ry="${u.h/2}" class="uc-oval"/>`;
    out += `<text x="${u.x}" y="${u.y+4}" class="uc-text">${u.label}</text>`;
  });
  // Associations
  out += `<line x1="60" y1="115" x2="${ucs[0].x-70}" y2="${ucs[0].y}" stroke="#4a4a7a" stroke-width="1.5"/>`;
  out += `<line x1="60" y1="120" x2="${ucs[1].x-65}" y2="${ucs[1].y}" stroke="#4a4a7a" stroke-width="1.5"/>`;
  out += `<line x1="440" y1="115" x2="${ucs[3].x+65}" y2="${ucs[3].y}" stroke="#4a4a7a" stroke-width="1.5"/>`;
  // include arrows
  out += `<line x1="${ucs[0].x}" y1="${ucs[0].y+19}" x2="${ucs[2].x}" y2="${ucs[2].y-19}" stroke="#7c5cfc" stroke-width="1.5" stroke-dasharray="5 3" marker-end="url(#arrowOpen)"/>`;
  out += `<text x="275" y="170" font-family="Inter" font-size="10" fill="#7c5cfc">«include»</text>`;
  out += `<line x1="${ucs[1].x}" y1="${ucs[1].y+19}" x2="${ucs[2].x}" y2="${ucs[2].y-19}" stroke="#7c5cfc" stroke-width="1.5" stroke-dasharray="5 3" marker-end="url(#arrowOpen)"/>`;
  return svgWrap(out, '0 0 500 350');
}

function renderSecuenciaLogin() {
  let out = '';
  const objs = [
    { x: 60, label: ':Cliente' },
    { x: 200, label: ':LoginController' },
    { x: 360, label: ':UserService' },
    { x: 470, label: ':BBDD' },
  ];
  objs.forEach(o => {
    out += `<rect x="${o.x-55}" y="10" width="110" height="30" class="seq-head" rx="4"/>`;
    out += `<text x="${o.x}" y="30" class="seq-text" text-anchor="middle">${o.label}</text>`;
    out += `<line x1="${o.x}" y1="40" x2="${o.x}" y2="400" class="seq-lifeline"/>`;
  });
  // Messages
  const msgs = [
    { from: 0, to: 1, y: 70, label: 'login(user, pwd)', type: 'sync' },
    { from: 1, to: 2, y: 110, label: 'authenticate(user,pwd)', type: 'sync' },
    { from: 2, to: 3, y: 150, label: 'findUser(user)', type: 'sync' },
    { from: 3, to: 2, y: 190, label: 'userData', type: 'return' },
    { from: 2, to: 2, y: 220, label: 'checkPassword(pwd)', type: 'self' },
    { from: 2, to: 1, y: 260, label: 'result: boolean', type: 'return' },
    { from: 1, to: 0, y: 300, label: 'response(ok/error)', type: 'return' },
  ];
  msgs.forEach(m => {
    const x1 = objs[m.from].x, x2 = m.to === m.from ? x1 + 40 : objs[m.to].x;
    const isDash = m.type === 'return';
    const isSelf = m.type === 'self';
    if (isSelf) {
      out += `<path d="M${x1} ${m.y} L${x1+40} ${m.y} L${x1+40} ${m.y+20} L${x1} ${m.y+20}" fill="none" stroke="#9898b8" stroke-width="1.5" marker-end="url(#arrowMsg)"/>`;
      out += `<text x="${x1+8}" y="${m.y-4}" class="seq-text" font-size="10">${m.label}</text>`;
    } else {
      out += `<line x1="${x1}" y1="${m.y}" x2="${x2 > x1 ? x2-2 : x2+2}" y2="${m.y}" stroke="#9898b8" stroke-width="1.5" ${isDash ? 'stroke-dasharray="5 3"' : ''} marker-end="url(#${isDash ? 'arrowReturn' : 'arrowMsg'})"/>`;
      const tx = (x1 + x2) / 2;
      out += `<text x="${tx}" y="${m.y - 5}" class="seq-text" text-anchor="middle" font-size="10">${m.label}</text>`;
    }
  });
  // Activations
  [[0,70,305],[1,110,265],[2,150,225],[3,150,195]].forEach(([i,y1,y2])=>{
    out += `<rect x="${objs[i].x-5}" y="${y1}" width="10" height="${y2-y1}" class="seq-activation"/>`;
  });
  // Alt fragment
  out += `<rect x="115" y="95" width="400" height="170" fill="none" stroke="#363660" stroke-width="1.5" rx="4"/>`;
  out += `<rect x="115" y="95" width="60" height="18" fill="#252545"/>`;
  out += `<text x="120" y="107" font-family="Inter" font-size="11" fill="#a78bfa" font-weight="600">alt</text>`;
  out += `<text x="140" y="107" font-family="Inter" font-size="11" fill="#9898b8"> [usuario existe]</text>`;
  return svgWrap(out, '0 0 600 330');
}

function renderEstadosFactura() {
  let out = '';
  const states = [
    { id: 'init', x: 50, y: 15, r: 12, type: 'init' },
    { id: 'creada', x: 150, y: 10, w: 110, h: 36, label: 'CREADA' },
    { id: 'pendiente', x: 310, y: 10, w: 120, h: 36, label: 'PENDIENTE' },
    { id: 'pagada', x: 310, y: 110, w: 110, h: 36, label: 'PAGADA' },
    { id: 'cancelada', x: 150, y: 110, w: 110, h: 36, label: 'CANCELADA' },
    { id: 'fin', x: 480, y: 25, r: 12, type: 'final' },
  ];
  states.forEach(s => {
    if (s.type === 'init') {
      out += `<circle cx="${s.x}" cy="${s.y}" r="${s.r}" class="state-init"/>`;
    } else if (s.type === 'final') {
      out += `<circle cx="${s.x}" cy="${s.y}" r="${s.r}" class="state-end"/>`;
      out += `<circle cx="${s.x}" cy="${s.y}" r="${s.r-5}" class="state-end-inner"/>`;
    } else {
      out += `<rect x="${s.x}" y="${s.y}" width="${s.w}" height="${s.h}" rx="8" class="state-rect"/>`;
      out += `<text x="${s.x + s.w/2}" y="${s.y + s.h/2 + 4}" class="state-text">${s.label}</text>`;
    }
  });
  // Transitions
  const trans = [
    { x1:62, y1:15, x2:148, y2:28, label:'' },
    { x1:260, y1:28, x2:308, y2:28, label:'aceptar' },
    { x1:430, y1:28, x2:478, y2:28, label:'pagar' },
    { x1:370, y1:46, x2:370, y2:108, label:'pagar' },
    { x1:370, y1:46, x2:260, y2:128, label:'cancelar' },
    { x1:260, y1:128, x2:150, y2:128, label:'cancelar' },
  ];
  trans.forEach(t => {
    out += `<line x1="${t.x1}" y1="${t.y1}" x2="${t.x2}" y2="${t.y2}" class="state-arrow" marker-end="url(#arrowState)"/>`;
    if (t.label) out += `<text x="${(t.x1+t.x2)/2+2}" y="${(t.y1+t.y2)/2-4}" class="state-label">[${t.label}]</text>`;
  });
  return svgWrap(out, '0 0 500 180');
}

function renderActividadCompra() {
  let out = '';
  // Init
  out += `<circle cx="250" cy="20" r="12" class="state-init"/>`;
  // Activities
  const acts = [
    { x:180, y:50, w:140, h:34, label:'Buscar Producto' },
    { x:180, y:110, w:140, h:34, label:'Añadir al Carrito' },
    { x:180, y:175, w:140, h:34, label:'Confirmar Pedido' },
    { x:60, y:240, w:140, h:34, label:'Pagar con Tarjeta' },
    { x:300, y:240, w:130, h:34, label:'Pagar con PayPal' },
    { x:180, y:310, w:140, h:34, label:'Confirmar Pago' },
  ];
  acts.forEach(a => {
    let cls = 'act-rect';
    if (a.label.includes('Tarjeta') || a.label.includes('PayPal')) cls = 'act-para';
    const rx = cls === 'act-rect' ? 4 : 0;
    
    if (cls === 'act-para') {
      out += `<polygon points="${a.x-10},${a.y+a.h} ${a.x+a.w},${a.y+a.h} ${a.x+a.w+10},${a.y} ${a.x},${a.y}" class="act-para"/>`;
    } else {
      out += `<rect x="${a.x}" y="${a.y}" width="${a.w}" height="${a.h}" rx="${rx}" class="${cls}"/>`;
    }
    out += `<text x="${a.x+a.w/2}" y="${a.y+a.h/2+4}" class="act-text">${a.label}</text>`;
  });
  // Decision diamond
  out += `<polygon points="250,220 275,245 250,270 225,245" class="act-diamond"/>`;
  out += `<text x="250" y="249" class="act-text" font-size="10">¿Método?</text>`;
  // Fork/join bars
  out += `<rect x="180" y="205" width="140" height="6" fill="#7c5cfc" rx="2"/>`;// join before decision removed for simplicity
  // Arrows
  out += `<line x1="250" y1="32" x2="250" y2="49" class="act-arrow" marker-end="url(#arrowAct)"/>`;
  out += `<line x1="250" y1="84" x2="250" y2="109" class="act-arrow" marker-end="url(#arrowAct)"/>`;
  out += `<line x1="250" y1="144" x2="250" y2="174" class="act-arrow" marker-end="url(#arrowAct)"/>`;
  out += `<line x1="250" y1="209" x2="250" y2="219" class="act-arrow" marker-end="url(#arrowAct)"/>`;
  // Decision to branches
  out += `<line x1="225" y1="245" x2="200" y2="245" stroke="#ffc107" stroke-width="2" marker-end="url(#arrowAct)"/>`;
  out += `<line x1="275" y1="245" x2="300" y2="245" stroke="#ffc107" stroke-width="2" marker-end="url(#arrowAct)"/>`;
  out += `<text x="185" y="240" font-family="Inter" font-size="10" fill="#ffc107" font-weight="700">Sí</text>`;
  out += `<text x="285" y="240" font-family="Inter" font-size="10" fill="#ffc107" font-weight="700">No</text>`;
  // Merge back
  out += `<line x1="130" y1="274" x2="130" y2="327" stroke="#555" stroke-width="2"/>`;
  out += `<line x1="130" y1="327" x2="179" y2="327" class="act-arrow"/>`;
  out += `<line x1="365" y1="274" x2="365" y2="327" stroke="#555" stroke-width="2"/>`;
  out += `<line x1="365" y1="327" x2="321" y2="327" class="act-arrow"/>`;
  // Final
  out += `<line x1="250" y1="344" x2="250" y2="360" class="act-arrow" marker-end="url(#arrowAct)"/>`;
  out += `<circle cx="250" cy="372" r="10" class="state-end"/>`;
  out += `<circle cx="250" cy="372" r="5" class="state-end-inner"/>`;
  return svgWrap(out, '0 0 500 395');
}

const SVG_MAP = {
  clase_simple: renderClaseSimple,
  herencia: renderHerencia,
  relaciones_completo: renderRelaciones,
  interfaces: renderInterfaces,
  casos_uso: renderCasosUso,
  secuencia_login: renderSecuenciaLogin,
  estados_factura: renderEstadosFactura,
  actividad_compra: renderActividadCompra,
};

// Inline SVGs for lessons (small previews)
const LESSON_SVG_MAP = {
  clase_simple: renderClaseSimple,
  relaciones: renderRelaciones,
  casos_uso: renderCasosUso,
  secuencia: renderSecuenciaLogin,
  estados: renderEstadosFactura,
};
