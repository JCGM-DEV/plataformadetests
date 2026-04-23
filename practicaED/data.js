// =============================================
// DATA — UD4 & UD5 Content
// =============================================

const UNITS = {
  ud3: {
    label: 'UD3',
    title: 'Introducción al UML',
    sections: [
      { id: 'ud3-teoria', icon: '📖', label: 'Teoría: ¿Qué es UML?', type: 'lesson', lessonId: 'ud3_intro' },
      { id: 'ud3-quiz', icon: '🧠', label: 'Quiz: Tipos de Diagramas', type: 'quiz', quizId: 'ud3_quiz' },
      { id: 'ud3-drag', icon: '🎯', label: 'Ejercicio: Clasifica el Diagrama', type: 'drag', dragId: 'clasifica_diagrams' },
      { id: 'ud3-diagram', icon: '📐', label: 'Mapa Visual de UML', type: 'diagram', diagId: 'ud3_diag' },
    ]
  },
  ud4: {
    label: 'UD4',
    title: 'Diagramas de Clases',
    sections: [
      { id: 'ud4-teoria', icon: '📖', label: 'Teoría: Notación UML', type: 'lesson', lessonId: 'notacion' },
      { id: 'ud4-relaciones', icon: '🔗', label: 'Teoría: Relaciones', type: 'lesson', lessonId: 'relaciones' },
      { id: 'ud4-quiz1', icon: '🧠', label: 'Quiz: Visibilidad', type: 'quiz', quizId: 'visibilidad' },
      { id: 'ud4-quiz2', icon: '🧠', label: 'Quiz: Relaciones', type: 'quiz', quizId: 'relaciones' },
      { id: 'ud4-drag1', icon: '🎯', label: 'Ejercicio: Clasifica', type: 'drag', dragId: 'clasifica_rel' },
      { id: 'ud4-drag2', icon: '🎯', label: 'Ejercicio: Visibilidad', type: 'drag', dragId: 'visibilidad_drag' },
      { id: 'ud4-diagram', icon: '📐', label: 'Diagramas Guiados', type: 'diagram', diagId: 'ud4_diag' },
      { id: 'ud4-lab', icon: '🧪', label: 'Laboratorio: Clases UML', type: 'lab' },
    ]
  },
  ud5: {
    label: 'UD5',
    title: 'Diagramas de Comportamiento',
    sections: [
      { id: 'ud5-teoria1', icon: '📖', label: 'Teoría: Casos de Uso', type: 'lesson', lessonId: 'casos_uso' },
      { id: 'ud5-teoria2', icon: '📖', label: 'Teoría: Secuencia', type: 'lesson', lessonId: 'secuencia' },
      { id: 'ud5-teoria3', icon: '📖', label: 'Teoría: Comunicación', type: 'lesson', lessonId: 'comunicacion' },
      { id: 'ud5-teoria4', icon: '📖', label: 'Teoría: Estados y Actividad', type: 'lesson', lessonId: 'estados' },
      { id: 'ud5-quiz1', icon: '🧠', label: 'Quiz: Casos de Uso', type: 'quiz', quizId: 'casos_uso' },
      { id: 'ud5-quiz2', icon: '🧠', label: 'Quiz: Secuencia y Comunicación', type: 'quiz', quizId: 'secuencia' },
      { id: 'ud5-drag1', icon: '🎯', label: 'Ejercicio: include vs extend', type: 'drag', dragId: 'include_extend' },
      { id: 'ud5-drag2', icon: '🎯', label: 'Ejercicio: Tipo de mensaje', type: 'drag', dragId: 'tipo_mensaje' },
      { id: 'ud5-drag3', icon: '🎯', label: 'Ejercicio: Secuencia vs Comunicación', type: 'drag', dragId: 'comunicacion_vs_secuencia' },
      { id: 'ud5-diagram', icon: '📐', label: 'Diagramas Guiados', type: 'diagram', diagId: 'ud5_diag' },
      { id: 'ud5-lab', icon: '🧪', label: 'Lab: Actividad / Flujo', type: 'lab' },
      { id: 'ud5-lab-usecase', icon: '🧪', label: 'Lab: Casos de Uso', type: 'lab' },
      { id: 'ud5-lab-seq', icon: '🧪', label: 'Lab: Secuencia', type: 'lab' },
      { id: 'ud5-lab-comms', icon: '🧪', label: 'Lab: Comunicación', type: 'lab' },
      { id: 'ud5-lab-states', icon: '🧪', label: 'Lab: Estados', type: 'lab' },
    ]
  },
  ud7: {
    label: 'UD7',
    title: 'Optimización y Control de Versiones',
    sections: [
      { id: 'ud7-teoria', icon: '📖', label: 'Teoría: Git (Fundamentos)', type: 'lesson', lessonId: 'git_teoria' },
      { id: 'ud7-quiz', icon: '🧠', label: 'Quiz: Comandos Git', type: 'quiz', quizId: 'git_quiz' },
      { id: 'ud7-lab', icon: '🧪', label: 'Simulador Git Visual', type: 'git' },
    ]
  }
};

// =============================================
// LESSONS
// =============================================
const LESSONS = {
  ud3_intro: {
    title: 'Introducción al UML — Tema 3',
    subtitle: 'Historia, características, versiones y clasificación de los 15 diagramas',
    concepts: [
      { icon: '🏛️', title: '¿Qué es UML?', body: '<strong>Unified Modeling Language</strong>: lenguaje de modelado estandarizado para representar sistemas orientados a objetos. Presentado en <strong>1997</strong> por la OMG. Estándar ISO desde <strong>2004</strong>. Versión actual: <strong>2.5.1</strong> (diciembre 2017).' },
      { icon: '📊', title: 'Diagramas Estructurales (estáticos)', body: 'Muestran el sistema en reposo (foto fija). Incluyen: <strong>Clases, Objetos, Componentes, Despliegue, Estructura Compuesta, Paquetes</strong>. El más importante: <em>Diagrama de clases</em>.' },
      { icon: '🔄', title: 'Diagramas de Comportamiento (dinámicos)', body: 'Muestran la actividad y funcionalidad del sistema. Incluyen: <strong>Casos de Uso, Actividad, Estado (máquina de estados)</strong>, y los de <strong>Interacción</strong>: Secuencia, Comunicación, Tiempos, General de Interacción.' },
      { icon: '🔧', title: 'Herramientas CASE', body: '<em>Computer Aided Software Engineering</em>. Software que da soporte a la ingeniería de software: crear diagramas UML, <strong>generar código</strong> a partir de diagramas e <strong>ingeniería inversa</strong> (generar diagramas desde código existente).' },
      { icon: '↔️', title: 'Estructural vs Comportamiento', body: '<strong>Estructurales</strong>: ¿qué hay en el sistema? (clases, objetos, módulos). <strong>Comportamiento</strong>: ¿qué hace el sistema? (procesos, interacciones, estados). UML propone <strong>15 diagramas</strong> en total.' },
      { icon: '⭐', title: 'El más importante: Clases', body: 'El diagrama de clases es el más utilizado. Muchas herramientas CASE permiten <strong>generar código Java</strong> directamente desde él, y también hacer ingeniería inversa del código a diagrama.' },
    ],
    codeExample: `<span class="kw">ESTRUCTURALES</span>           <span class="kw">COMPORTAMIENTO</span>
──────────────────       ──────────────────────
<span class="nm">Clases ★</span>                <span class="vis-pub">Casos de Uso</span>
<span class="nm">Objetos</span>                 <span class="vis-pub">Actividad</span>
<span class="nm">Componentes</span>             <span class="vis-pub">Estado (Máq. Estados)</span>
<span class="nm">Despliegue</span>              <span class="kw">Interacción:</span>
<span class="nm">Estructura Compuesta</span>      <span class="vis-prot">Secuencia</span>
<span class="nm">Paquetes</span>                  <span class="vis-prot">Comunicación</span>
                          <span class="vis-prot">Tiempos</span>
                          <span class="vis-prot">General Interacción</span>`,
    info: { type: 'tip', text: '💡 <strong>Para el examen</strong>: Los diagramas de <em>interacción</em> son un subgrupo de los de comportamiento. El diagrama de <strong>secuencia</strong> y el de <strong>comunicación</strong> muestran la misma información pero desde perspectivas distintas: secuencia enfatiza el tiempo, comunicación enfatiza las relaciones entre objetos.' },
    svg: 'uml_tipos'
  },

  notacion: {
    title: 'Notación de Clases UML',
    subtitle: 'Estructura visual de una clase: nombre, atributos y métodos',
    concepts: [
      { icon: '🏷️', title: 'Estructura de una clase', body: 'Rectángulo dividido en 3 compartimentos: <strong>Nombre</strong> (arriba), <strong>Atributos</strong> (centro) y <strong>Métodos</strong> (abajo).' },
      { icon: '👁️', title: 'Visibilidad (+, -, #, ~)', body: '<code>+</code> <b>Público</b> — accesible desde cualquier lugar.<br><code>-</code> <b>Privado</b> — solo dentro de la clase.<br><code>#</code> <b>Protegido</b> — clase + subclases.<br><code>~</code> <b>Paquete</b> — mismo paquete.' },
      { icon: '📝', title: 'Sintaxis de atributo', body: '<code>visibilidad nombre : tipo [= valorInicial]</code><br>Ejemplo: <code>- nombre : String = "sin nombre"</code>' },
      { icon: '⚙️', title: 'Sintaxis de método', body: '<code>visibilidad nombre(params) : tipoRetorno</code><br>Ejemplo: <code>+ calcularSalario() : double</code>' },
      { icon: '🔵', title: 'Elementos especiales', body: '• <em>Cursiva</em> = clase o método <b>abstracto</b><br>• <u>Subrayado</u> = estático (compartido)<br>• MAYÚSCULAS = constante<br>• «interface» = interfaz' },
      { icon: '🔷', title: 'Interfaz', body: 'Lleva el estereotipo <code>«interface»</code> sobre el nombre. Solo declara métodos (sin implementación). Los nombres suelen ir en cursiva.' },
    ],
    codeExample: `<span class="kw">Clase: </span><span class="nm">Empleado</span>
─────────────────────────────
<span class="vis-priv">-</span> <span class="nm">nombre</span>   : <span class="tp">String</span>
<span class="vis-priv">-</span> <span class="nm">salario</span>  : <span class="tp">double</span>
<span class="vis-pub">+</span> <span class="nm">MAX_EDAD</span> : <span class="tp">int</span> = 65   <span class="cm">// constante</span>
─────────────────────────────
<span class="vis-pub">+</span> <span class="nm">getNombre</span>()       : <span class="tp">String</span>
<span class="vis-pub">+</span> <span class="nm">calcularSalario</span>() : <span class="tp">double</span>
<span class="vis-prot">#</span> <span class="nm">validar</span>()         : <span class="tp">void</span>
<span class="vis-priv">-</span> <span class="nm">log</span>()             : <span class="tp">void</span>`,
    info: { type: 'tip', text: '💡 <strong>Truco del examen</strong>: Si te preguntan qué símbolo es "protegido", recuerda <code>#</code>. Si preguntan "de paquete", es <code>~</code>. El más fácil de confundir es # vs ~.' },
    svg: 'clase_simple'
  },

  relaciones: {
    title: 'Relaciones entre Clases',
    subtitle: 'Cómo se conectan las clases en un diagrama UML',
    concepts: [
      { icon: '▷', title: 'Generalización (Herencia)', body: 'Línea continua + flecha triangular <b>vacía</b> apuntando a la superclase. "Es un/a" — Animal ← Perro.' },
      { icon: '▷⋯', title: 'Realización (Interfaz)', body: 'Línea <b>discontinua</b> + flecha triangular vacía apuntando a la interfaz. Clase implementa interfaz.' },
      { icon: '→', title: 'Asociación', body: 'Línea continua con navegabilidad opcional. Puede tener multiplicidad: <code>1</code>, <code>*</code>, <code>0..1</code>, <code>1..*</code>.' },
      { icon: '⋯→', title: 'Dependencia (use)', body: 'Línea <b>discontinua</b> con flecha simple y estereotipo <code>«use»</code>. Uso temporal de otra clase.' },
      { icon: '◆→', title: 'Composición (fuerte)', body: 'Línea + <b>diamante relleno</b> en el "todo". Las partes <u>no sobreviven</u> al todo. Ej: Casa ◆─ Habitación.' },
      { icon: '◇→', title: 'Agregación (débil)', body: 'Línea + <b>diamante vacío</b> en el "todo". Las partes pueden existir solas. Ej: Departamento ◇─ Profesor.' },
    ],
    codeExample: `<span class="cm">// Herencia</span>   <span class="vis-pub">Animal</span> <span class="kw">◁──</span> <span class="nm">Perro</span>
<span class="cm">// Realización</span> <span class="vis-pub">Volable</span> <span class="kw">◁⋯⋯</span> <span class="nm">Avion</span>
<span class="cm">// Composición</span> <span class="vis-pub">Casa</span> <span class="kw">◆───</span> <span class="nm">Habitacion</span>
<span class="cm">// Agregación</span>  <span class="vis-prot">Dept</span> <span class="kw">◇───</span> <span class="nm">Profesor</span>
<span class="cm">// Asociacion</span>  <span class="vis-pub">Alumno</span> <span class="kw">───</span> <span class="nm">Curso</span>
<span class="cm">// Dependencia</span> <span class="vis-priv">Pedido</span> <span class="kw">⋯⋯→</span> <span class="nm">Factura</span>`,
    info: { type: 'warning', text: '⚠️ <strong>Clave Composición vs Agregación</strong>: El diamante <b>relleno (negro)</b> = composición (destrucción total). El diamante <b>vacío</b> = agregación (partes independientes). ¡Muy típico en examen!' },
    svg: 'relaciones'
  },

  casos_uso: {
    title: 'Diagramas de Casos de Uso',
    subtitle: 'Relaciones entre actores y funcionalidades del sistema',
    concepts: [
      { icon: '🧑', title: 'Actor', body: 'Monigote (stick figure). Persona, sistema o hardware externo que interactúa con el sistema.' },
      { icon: '⭕', title: 'Caso de Uso', body: 'Elipse con el nombre de la funcionalidad. Representa lo que el sistema hace.' },
      { icon: '📦', title: 'Límite del sistema', body: 'Rectángulo que encierra los casos de uso. Los actores están fuera.' },
      { icon: '➡️', title: 'Asociación', body: 'Línea entre actor y caso de uso. Indica que el actor usa esa funcionalidad.' },
      { icon: '«include»', title: 'Inclusión (include)', body: '<b>Obligatorio</b>. El caso base SIEMPRE ejecuta el incluido. Flecha discontinua va del base al incluido. Ej: Realizar Pedido → Identificarse.' },
      { icon: '«extend»', title: 'Extensión (extend)', body: '<b>Opcional</b>. El extensor añade comportamiento en un punto de extensión. Flecha va del extensor al base. Ej: Pago con tarjeta ⇢ Realizar Venta.' },
      { icon: '▷', title: 'Generalización', body: 'Entre actores o casos de uso. El hijo hereda comportamiento del padre.' },
    ],
    codeExample: `<span class="cm">/* INCLUDE — obligatorio */</span>
<span class="vis-pub">Realizar Pedido</span> <span class="kw">- - «include» → -</span> <span class="nm">Identificarse</span>
<span class="cm">/* Siempre que se realice un pedido, SIEMPRE se identifica */</span>

<span class="cm">/* EXTEND — opcional */</span>
<span class="vis-prot">Pago con Tarjeta</span> <span class="kw">- - «extend» → -</span> <span class="nm">Realizar Venta</span>
<span class="cm">/* Solo a veces el pago con tarjeta puede extender la venta */</span>`,
    info: { type: 'warning', text: '⚠️ <strong>Dirección de la flecha</strong>: En «include» la flecha va del caso BASE al incluido. En «extend» la flecha va del EXTENSOR al caso base. ¡Al revés de lo que parece intuitivo!' },
    svg: 'casos_uso'
  },

  secuencia: {
    title: 'Diagramas de Secuencia',
    subtitle: 'Intercambio de mensajes entre objetos a lo largo del tiempo',
    concepts: [
      { icon: '⬇️', title: 'Línea de vida (Lifeline)', body: 'Línea vertical discontinua bajo el objeto. Representa que el objeto existe durante ese período.' },
      { icon: '▬', title: 'Barra de activación', body: 'Rectángulo fino sobre la lifeline. Indica que el objeto está ejecutando una operación.' },
      { icon: '→', title: 'Mensaje síncrono', body: 'Flecha rellena (sólida). El emisor <b>espera</b> respuesta antes de continuar.' },
      { icon: '⇢', title: 'Mensaje asíncrono', body: 'Flecha con punta abierta. El emisor <b>no espera</b> respuesta.' },
      { icon: '←⋯', title: 'Mensaje de retorno', body: 'Línea discontinua con flecha. Devuelve resultado al llamador.' },
      { icon: 'alt', title: 'Fragmento alt (if-else)', body: 'Marco con "alt" + condiciones entre [ ]. Es un if-then-else.' },
      { icon: 'loop', title: 'Fragmento loop', body: 'Marco con "loop" + condición. Repetición mientras se cumpla.' },
      { icon: 'opt', title: 'Fragmento opt (opcional)', body: 'Marco con "opt" + condición. Solo si se cumple la condición.' },
    ],
    codeExample: `<span class="vis-pub">:Cliente</span>    <span class="vis-pub">:Sistema</span>    <span class="vis-pub">:BBDD</span>
    |             |             |
    |──login()──→ |             |
    |             |──query()──→ |
    |             |←──result()──|
    |←──ok()──── |             |`,
    info: { type: 'tip', text: '💡 <strong>Los fragmentos combinados</strong>: <code>alt</code> = if/else, <code>opt</code> = if sin else, <code>loop</code> = bucle, <code>break</code> = rompe el flujo, <code>ref</code> = referencia a otro diagrama.' },
    svg: 'secuencia'
  },

  comunicacion: {
    title: 'Diagrama de Comunicación — Tema 5',
    subtitle: 'Objetos conectados, mensajes numerados y diferencias con el diagrama de secuencia',
    concepts: [
      { icon: '🔵', title: 'Objetos', body: 'Se representan como rectángulos con el nombre en formato <code>nombre:Clase</code> (ej: <code>:Cliente</code>, <code>:Pedido</code>). Igual que en el diagrama de secuencia, pero sin línea de vida.' },
      { icon: '🔗', title: 'Enlace (Link)', body: 'Línea continua entre objetos que se comunican. Representa que existe una relación (asociación) entre ellos. Los mensajes viajan por esta línea.' },
      { icon: '🔢', title: 'Mensajes numerados', body: 'Los mensajes llevan un <strong>número de secuencia</strong> para indicar el orden: <code>1: login()</code>, <code>2: query()</code>, <code>2.1: findUser()</code>. La numeración anidada (1.1, 1.2) indica sub-mensajes dentro de una llamada.' },
      { icon: '↔️', title: 'Vs Diagrama de Secuencia', body: '<strong>Secuencia</strong>: énfasis en el <em>tiempo</em> (eje vertical). Más fácil leer el orden. <strong>Comunicación</strong>: énfasis en las <em>relaciones entre objetos</em>. Más compacto y muestra mejor la arquitectura.' },
      { icon: '→', title: 'Dirección del mensaje', body: 'La flecha indica la dirección del mensaje. Los números indican la secuencia temporal. Se puede indicar retorno añadiendo <code>/ retorno</code> al mensaje.' },
      { icon: '🔄', title: 'Equivalencia', body: 'Un diagrama de comunicación <strong>se puede transformar en secuencia y viceversa</strong>. Muestran exactamente la misma información pero con diferente énfasis visual.' },
    ],
    codeExample: `<span class="cm">// Diagrama de Comunicación — Sistema de Login</span>
<span class="vis-pub">:Cliente</span> ────────── <span class="vis-prot">:LoginCtrl</span> ────────── <span class="vis-pub">:UserService</span>
                                        |
                              <span class="vis-prot">:BBDD</span>

<span class="kw">Mensajes numerados:</span>
<span class="nm">1:</span> login(user, pwd)    → :LoginCtrl
<span class="nm">2:</span> authenticate(u, p)  → :UserService
<span class="nm">2.1:</span> findUser(user)     → :BBDD
<span class="nm">2.2:</span> / userData         ← :BBDD
<span class="nm">3:</span> / response(ok)      ← :LoginCtrl`,
    info: { type: 'warning', text: '⚠️ <strong>Clave del examen</strong>: En secuencia lees de <em>arriba a abajo</em> (tiempo). En comunicación lees los <em>números</em> (1, 2, 2.1...). Ambos diagramas son equivalentes. La numeración anidada (2.1) indica mensajes enviados DENTRO de la ejecución del mensaje 2.' },
    svg: 'comunicacion'
  },

  estados: {
    title: 'Diagramas de Estado y Actividad',
    subtitle: 'Ciclo de vida de un objeto y flujos de trabajo',
    concepts: [
      { icon: '⚫', title: 'Estado inicial', body: 'Círculo negro relleno. Punto de entrada del diagrama. Solo puede haber uno.' },
      { icon: '⭕', title: 'Estados', body: 'Rectángulos redondeados con el nombre del estado. Representan situaciones estables del objeto.' },
      { icon: '→', title: 'Transición', body: 'Flecha entre estados. Puede llevar: evento [condición] / acción.' },
      { icon: '🎯', title: 'Estado final', body: 'Círculo negro dentro de otro círculo. Fin del ciclo de vida.' },
      { icon: '🔷', title: 'Decisión (Actividad)', body: 'Rombo en diagramas de actividad. Bifurcación del flujo según condición.' },
      { icon: '═══', title: 'Fork/Join (barra)', body: 'Barra gruesa para división (fork) y unión (join) de flujos paralelos.' },
    ],
    codeExample: `<span class="cm">// Ejemplo: Factura</span>
<span class="vis-pub">⚫</span> → <span class="nm">CREADA</span> → [aceptar] → <span class="nm">PENDIENTE</span>
<span class="nm">PENDIENTE</span> → [pagar] → <span class="vis-pub">PAGADA</span> → <span class="vis-pub">⊙</span>
<span class="nm">PENDIENTE</span> → [cancelar] → <span class="vis-priv">CANCELADA</span> → <span class="vis-pub">⊙</span>`,
    info: { type: 'success', text: '✅ <strong>Diferencia clave</strong>: Diagrama de <b>estados</b> = ciclo de vida de UN objeto. Diagrama de <b>actividad</b> = flujo de trabajo (proceso) completo con decisiones y paralelismos.' },
    svg: 'estados'
  }
};

// =============================================
// QUIZZES
// =============================================
const QUIZZES = {
  ud3_quiz: {
    title: 'Quiz: Tipos de Diagramas UML',
    questions: [
      {
        q: '¿En qué año se presentó la primera versión de UML?',
        hint: 'Fue presentado por la OMG en la década de los 90.',
        opts: ['1990', '1995', '1997', '2004'],
        ans: 2,
        exp: 'UML fue presentado por primera vez en <strong>1997</strong> por la OMG (Object Management Group). En 2004 se adoptó como estándar ISO.'
      },
      {
        q: '¿Qué tipo de diagrama UML es el diagrama de CLASES?',
        hint: 'Muestra la estructura estática del sistema.',
        opts: ['Diagrama de comportamiento', 'Diagrama de interacción', 'Diagrama estructural', 'Diagrama de actividad'],
        ans: 2,
        exp: 'El diagrama de clases es un <strong>diagrama estructural</strong>. Los diagramas estructurales muestran la estructura estática (en reposo) del sistema: clases, objetos, componentes, etc.'
      },
      {
        q: '¿Cuál de estos es un diagrama de COMPORTAMIENTO?',
        hint: 'Muestra la dinámica o actividad del sistema.',
        opts: ['Diagrama de Clases', 'Diagrama de Despliegue', 'Diagrama de Componentes', 'Diagrama de Casos de Uso'],
        ans: 3,
        exp: 'El diagrama de <strong>Casos de Uso</strong> es de comportamiento: muestra qué hace el sistema y cómo interactúan los actores. Clases, Despliegue y Componentes son estructurales.'
      },
      {
        q: '¿Qué es la ingeniería inversa en el contexto de las herramientas CASE?',
        hint: 'Va en sentido contrario a la generación de código.',
        opts: [
          'Crear código a partir del diagrama de clases',
          'Obtener diagramas UML a partir de código fuente existente',
          'Convertir un diagrama de secuencia en diagrama de clases',
          'Documentar los errores del sistema'
        ],
        ans: 1,
        exp: '<strong>Ingeniería inversa</strong>: obtener diagramas UML (especialmente de clases) a partir del código fuente ya existente. Es la acción contraria a la generación de código.'
      },
      {
        q: '¿Cuántos diagramas contempla UML en total?',
        hint: 'Se dividen en dos grandes grupos: estructurales y de comportamiento.',
        opts: ['7', '10', '15', '20'],
        ans: 2,
        exp: 'UML contempla <strong>15 diagramas</strong> en total: 6 estructurales y 9 de comportamiento (incluyendo los 4 de interacción: secuencia, comunicación, tiempos y general).'
      },
      {
        q: '¿El diagrama de SECUENCIA y el de COMUNICACIÓN son...?',
        hint: 'Muestran la misma información pero desde perspectivas distintas.',
        opts: [
          'Completamente diferentes: modelan cosas distintas',
          'Equivalentes: muestran la misma información, diferente énfasis',
          'El de secuencia es estructural y el de comunicación es de comportamiento',
          'Solo se usan juntos'
        ],
        ans: 1,
        exp: 'Son <strong>equivalentes</strong>: muestran la misma interacción. Secuencia enfatiza el <em>tiempo</em> (eje vertical). Comunicación enfatiza las <em>relaciones entre objetos</em>. Se pueden convertir uno en otro.'
      },
      {
        q: '¿Qué son las herramientas CASE?',
        hint: 'CASE = Computer Aided Software Engineering.',
        opts: [
          'Lenguajes de programación orientados a objetos',
          'Herramientas que ayudan a diseñar y desarrollar sistemas software (diagramas, generación de código)',
          'Frameworks de pruebas automatizadas',
          'Sistemas de control de versiones'
        ],
        ans: 1,
        exp: 'Las <strong>herramientas CASE</strong> (Computer Aided Software Engineering) dan soporte al proceso de desarrollo: crear diagramas UML, generar código a partir de ellos y realizar ingeniería inversa.'
      },
      {
        q: '¿Cuál de los siguientes diagramas es un diagrama de INTERACCIÓN?',
        hint: 'Los de interacción son un subgrupo de los de comportamiento.',
        opts: ['Diagrama de Clases', 'Diagrama de Estado', 'Diagrama de Secuencia', 'Diagrama de Despliegue'],
        ans: 2,
        exp: 'El <strong>Diagrama de Secuencia</strong> es un diagrama de interacción (subgrupo de comportamiento). Los de interacción son: Secuencia, Comunicación, Tiempos y General de Interacción.'
      }
    ]
  },

  visibilidad: {
    title: 'Quiz: Visibilidad y Notación',
    questions: [
      {
        q: '¿Qué símbolo UML representa visibilidad PRIVADA?',
        hint: 'Es el más restrictivo: solo accesible desde dentro de la misma clase.',
        opts: ['+ (más)', '# (almohadilla)', '- (menos)', '~ (tilde)'],
        ans: 2,
        exp: 'El símbolo <strong>-</strong> indica <strong>privado</strong>. Solo los métodos de la misma clase pueden acceder. El + es público, # es protegido y ~ es de paquete.'
      },
      {
        q: '¿Qué símbolo indica visibilidad PROTEGIDA (#)?',
        hint: 'Accesible desde la clase y sus subclases (herencia).',
        opts: ['Solo dentro de la clase', 'Clase y todas sus subclases', 'Cualquier clase del sistema', 'Solo dentro del mismo paquete'],
        ans: 1,
        exp: '<strong>#</strong> = protegido. Accesible desde la propia clase y todas sus <strong>subclases</strong> (herencia). El público (+) es accesible desde cualquier lugar.'
      },
      {
        q: 'En UML, ¿cómo se representa un ATRIBUTO ESTÁTICO?',
        hint: 'Compartido por todos los objetos de la clase.',
        opts: ['En cursiva', 'Subrayado', 'En MAYÚSCULAS', 'Con prefijo static:'],
        ans: 1,
        exp: 'Los atributos y métodos <strong>estáticos</strong> llevan <strong>subrayado</strong> en UML. Las mayúsculas se reservan para las constantes, y la cursiva para miembros abstractos.'
      },
      {
        q: '¿Cómo se representa una clase ABSTRACTA en UML?',
        hint: 'No se puede instanciar directamente.',
        opts: ['Con el estereotipo «abstract»', 'Con el nombre en cursiva', 'Con un diamante en la esquina', 'Con borde punteado'],
        ans: 1,
        exp: 'En UML, las clases y métodos <strong>abstractos</strong> se escriben en <em>cursiva</em>. El estereotipo «abstract» no es estándar UML, aunque algunas herramientas lo usan.'
      },
      {
        q: '¿Qué estereotipo identifica una INTERFAZ en UML?',
        hint: 'Solo declara métodos, no los implementa.',
        opts: ['«abstract»', '«interface»', '«implements»', '«protocol»'],
        ans: 1,
        exp: 'Las interfaces llevan el estereotipo <strong>«interface»</strong> sobre el nombre. Sus métodos son todos abstractos (en cursiva) y públicos por defecto.'
      },
      {
        q: 'La sintaxis correcta de un atributo UML es:',
        hint: 'Recuerda el orden: visibilidad, nombre, tipo.',
        opts: ['tipo nombre : visibilidad', 'nombre : visibilidad : tipo', 'visibilidad nombre : tipo', 'visibilidad tipo nombre'],
        ans: 2,
        exp: 'La sintaxis es <strong>visibilidad nombre : tipo [= valor]</strong>. Ejemplo: <code>- edad : int = 0</code>'
      },
      {
        q: '¿Qué significa "~ atributo : String" en UML?',
        hint: '~ es el símbolo de visibilidad de paquete.',
        opts: ['Atributo público de tipo String', 'Atributo privado de tipo String', 'Atributo protegido de tipo String', 'Atributo accesible dentro del mismo paquete'],
        ans: 3,
        exp: '<strong>~</strong> indica visibilidad de <strong>paquete</strong>: solo accesible desde clases del mismo paquete. Es el menos restrictivo después del público (+).'
      },
      {
        q: '¿Cómo se denota la multiplicidad "uno o más" en UML?',
        hint: 'Al menos uno, sin límite superior.',
        opts: ['0..1', '*', '1..*', '1..n'],
        ans: 2,
        exp: '<strong>1..*</strong> significa uno o más. <code>*</code> es cero o más, <code>0..1</code> es opcional (0 o 1), y <code>1</code> es exactamente uno.'
      }
    ]
  },

  relaciones: {
    title: 'Quiz: Relaciones entre Clases',
    questions: [
      {
        q: '¿Qué tipo de relación usa un DIAMANTE RELLENO (negro)?',
        hint: 'Las partes no pueden existir sin el todo.',
        opts: ['Agregación', 'Asociación', 'Composición', 'Dependencia'],
        ans: 2,
        exp: '<strong>Composición</strong> = diamante relleno (negro). Relación fuerte: si el "todo" se destruye, las partes también. Ejemplo: Casa ◆─ Habitación.'
      },
      {
        q: '¿Qué relación UML representa la IMPLEMENTACIÓN de una interfaz?',
        hint: 'Usa línea discontinua y flecha triangular vacía.',
        opts: ['Herencia', 'Realización', 'Composición', 'Dependencia'],
        ans: 1,
        exp: '<strong>Realización</strong> = línea discontinua + flecha triangular vacía hacia la interfaz. Se usa cuando una clase implementa una interfaz. La herencia usa línea continua.'
      },
      {
        q: 'En Composición vs Agregación, ¿cuál es la diferencia clave?',
        hint: 'Pregúntate: ¿pueden existir las partes sin el todo?',
        opts: [
          'La composición tiene flecha y la agregación no',
          'Composición: partes mueren con el todo. Agregación: partes sobreviven',
          'Composición es más débil que la agregación',
          'No hay diferencia semántica, solo de notación'
        ],
        ans: 1,
        exp: 'Clave: <strong>Composición</strong> (diamante relleno) = dependencia total, las partes NO sobreviven. <strong>Agregación</strong> (diamante vacío) = las partes SÍ pueden existir independientemente.'
      },
      {
        q: '¿Qué tipo de línea se usa para una DEPENDENCIA («use»)?',
        hint: 'Indica uso temporal de otra clase.',
        opts: ['Línea continua con flecha simple', 'Línea discontinua con flecha simple', 'Línea continua con diamante', 'Línea continua con flecha triangular'],
        ans: 1,
        exp: '<strong>Dependencia</strong> = línea discontinua con flecha simple y estereotipo «use». Indica que una clase usa otra temporalmente (como parámetro o variable local).'
      },
      {
        q: '¿La herencia en UML se representa con...?',
        hint: 'La flecha apunta HACIA la superclase (clase padre).',
        opts: [
          'Línea discontinua + flecha triangular rellena',
          'Línea continua + flecha triangular vacía (apunta al padre)',
          'Línea continua + diamante relleno',
          'Línea discontinua + diamante vacío'
        ],
        ans: 1,
        exp: '<strong>Herencia/Generalización</strong> = línea continua + flecha triangular vacía. La flecha apunta HACIA la superclase. Ejemplo: Perro ──▷ Animal.'
      },
      {
        q: 'Un Departamento tiene Profesores, pero los Profesores pueden trabajar en varios departamentos. ¿Qué relación es?',
        hint: 'Los profesores existen aunque se cierre el departamento.',
        opts: ['Composición', 'Herencia', 'Agregación', 'Dependencia'],
        ans: 2,
        exp: '<strong>Agregación</strong> (diamante vacío). Los profesores existen independientemente del departamento. Si fuera composición, al eliminar el departamento desaparecerían los profesores.'
      },
      {
        q: 'Si una clase Pedido usa temporalmente la clase Descuento para calcular el total, ¿qué relación es?',
        hint: 'Uso puntual, no una relación permanente.',
        opts: ['Asociación', 'Composición', 'Herencia', 'Dependencia'],
        ans: 3,
        exp: '<strong>Dependencia</strong> (línea discontinua → «use»). Pedido usa Descuento momentáneamente (como parámetro en un método). No hay relación estructural permanente.'
      }
    ]
  },

  casos_uso: {
    title: 'Quiz: Casos de Uso',
    questions: [
      {
        q: '«include» entre casos de uso significa:',
        hint: '¿Es obligatorio o opcional?',
        opts: [
          'El caso incluido se ejecuta opcionalmente',
          'El caso incluido se ejecuta SIEMPRE que se ejecute el base',
          'El caso base extiende al incluido',
          'Son sinónimos y se pueden intercambiar'
        ],
        ans: 1,
        exp: '<strong>«include»</strong> = obligatorio. Siempre que se ejecuta el caso base, se ejecuta el incluido. Ejemplo: Realizar Pedido siempre incluye Identificarse.'
      },
      {
        q: '¿En qué dirección apunta la flecha en «extend»?',
        hint: 'El extensor amplía al base, ¿hacia dónde va la flecha?',
        opts: [
          'Del caso BASE al extensor',
          'Del EXTENSOR al caso base',
          'Bidireccional (doble flecha)',
          'No lleva flecha, solo línea continua'
        ],
        ans: 1,
        exp: 'En «extend» la flecha va <strong>del extensor al caso base</strong>. Ejemplo: PagoConTarjeta --«extend»--> RealizarVenta. Es al contrario de lo que parece intuitivo.'
      },
      {
        q: '¿Qué elemento representa un ACTOR en un diagrama de casos de uso?',
        hint: 'Figura clásica de UML para personas o sistemas externos.',
        opts: ['Rectángulo', 'Elipse', 'Figura de palo (stick figure)', 'Rombo'],
        ans: 2,
        exp: 'El <strong>actor</strong> se representa con una figura de palo (stick figure). El caso de uso es la elipse. Los actores están FUERA del rectángulo de límite del sistema.'
      },
      {
        q: 'Si "Identificarse" es necesario para "Ver historial" Y para "Realizar pedido", ¿cómo se modela?',
        hint: 'Se reutiliza comportamiento compartido.',
        opts: [
          '«extend» desde Identificarse a ambos',
          '«include» desde ambos hacia Identificarse',
          'Herencia: Identificarse hereda de ambos',
          'Se duplica Identificarse en cada caso de uso'
        ],
        ans: 1,
        exp: '«include» desde los casos base (Ver historial, Realizar pedido) hacia Identificarse. Ambos <strong>incluyen</strong> la funcionalidad de identificación. No se duplica.'
      },
      {
        q: '¿Qué puede ser un actor en un diagrama de casos de uso?',
        hint: 'No tiene por qué ser una persona humana.',
        opts: [
          'Solo personas físicas',
          'Solo sistemas informáticos',
          'Personas, sistemas externos o hardware que interactúan con el sistema',
          'Solo roles de usuario registrado'
        ],
        ans: 2,
        exp: 'Un <strong>actor</strong> puede ser una persona, un sistema externo (otro software) o hardware. Lo importante es que es <strong>externo</strong> al sistema y que interactúa con él.'
      },
      {
        q: '¿Qué es un "punto de extensión" en «extend»?',
        hint: 'Define cuándo se puede activar la extensión.',
        opts: [
          'El nombre del actor que dispara el caso de uso',
          'El lugar específico dentro del caso base donde se puede insertar la extensión',
          'La condición de finalización del caso de uso',
          'El tipo de relación entre dos actores'
        ],
        ans: 1,
        exp: 'El <strong>punto de extensión</strong> define el lugar exacto en el caso base donde el extensor puede "engancharse". Solo se activa si se cumple la condición del «extend».'
      }
    ]
  },

  secuencia: {
    title: 'Quiz: Diagramas de Secuencia',
    questions: [
      {
        q: '¿Qué representa una LÍNEA DE VIDA (lifeline) en un diagrama de secuencia?',
        hint: 'Es vertical y discontinua bajo el objeto.',
        opts: [
          'Un método del objeto',
          'La existencia temporal de un objeto a lo largo del tiempo',
          'El tiempo de respuesta del sistema',
          'La herencia entre clases'
        ],
        ans: 1,
        exp: 'La <strong>lifeline</strong> (línea de vida) = línea vertical discontinua que representa la <strong>existencia del objeto en el tiempo</strong>. Si el objeto se destruye, la lifeline termina con una X.'
      },
      {
        q: '¿Qué tipo de mensaje USA FLECHA RELLENA y el emisor espera respuesta?',
        hint: 'Es el más común: bloquea hasta recibir respuesta.',
        opts: ['Asíncrono', 'De retorno', 'Síncrono', 'De creación'],
        ans: 2,
        exp: 'Mensaje <strong>síncrono</strong> = flecha rellena (sólida). El emisor se bloquea esperando la respuesta. El asíncrono usa flecha abierta (no espera).'
      },
      {
        q: '¿Qué fragmanto combinado representa un IF-ELSE en secuencia?',
        hint: 'Tiene dos secciones con condiciones alternativas.',
        opts: ['opt', 'loop', 'alt', 'break'],
        ans: 2,
        exp: '<strong>alt</strong> = alternativa (if-else). Tiene múltiples secciones con condiciones entre []. <code>opt</code> es solo if (sin else). <code>loop</code> es un bucle.'
      },
      {
        q: '¿Qué indica la BARRA DE ACTIVACIÓN en una lifeline?',
        hint: 'Rectángulo fino sobre la línea de vida.',
        opts: [
          'Que el objeto ha sido destruido',
          'El período en que el objeto está ejecutando una operación',
          'Una condición de guarda',
          'Un mensaje asíncrono'
        ],
        ans: 1,
        exp: 'La <strong>barra de activación</strong> (rectángulo fino sobre la lifeline) indica que el objeto está <strong>activo ejecutando una operación</strong>. Se dibuja durante el tiempo que dura la ejecución.'
      },
      {
        q: '¿Cómo se representa el RETORNO de un mensaje en secuencia?',
        hint: 'Va en sentido contrario al mensaje original.',
        opts: [
          'Flecha rellena en sentido contrario',
          'Flecha abierta en sentido contrario',
          'Línea discontinua con flecha en sentido contrario',
          'Flecha doble'
        ],
        ans: 2,
        exp: 'El <strong>mensaje de retorno</strong> = línea <strong>discontinua</strong> con flecha, va en sentido contrario al mensaje original. Devuelve el resultado de la operación.'
      },
      {
        q: '¿Qué fragmento combinado se usa para modelar un BUCLE?',
        hint: 'Se repite mientras se cumple una condición.',
        opts: ['ref', 'loop', 'opt', 'alt'],
        ans: 1,
        exp: '<strong>loop</strong> indica repetición. Se ejecuta mientras se cumpla la condición indicada entre []. Se puede indicar número de iteraciones: loop(min, max).'
      },
      {
        q: '¿Qué elemento diferencia al diagrama de COMUNICACIÓN del de SECUENCIA?',
        hint: 'En comunicación los mensajes tienen algo que indica su orden.',
        opts: [
          'Los actores externos solo aparecen en comunicación',
          'Los mensajes llevan un número de secuencia (1:, 2:, 2.1:...)',
          'Las lifelines solo existen en comunicación',
          'En comunicación no se pueden modelar retornos'
        ],
        ans: 1,
        exp: 'En el diagrama de <strong>comunicación</strong>, los mensajes llevan <strong>números de secuencia</strong> (1:, 2:, 2.1:) para indicar el orden temporal. En secuencia el orden lo da la posición vertical.'
      },
      {
        q: 'En un diagrama de comunicación, ¿qué significa el mensaje "2.1: findUser()"?',
        hint: 'El punto indica que es un sub-mensaje.',
        opts: [
          'Es el mensaje número 21 en el flujo',
          'Es el segundo sub-mensaje dentro de la ejecución del mensaje 2',
          'Es el primer mensaje enviado en el segundo escenario',
          'Solo indica que el método tiene 2 parámetros'
        ],
        ans: 1,
        exp: 'La numeración <strong>anidada (2.1)</strong> indica que es el <em>primer sub-mensaje</em> enviado como parte de la ejecución del mensaje 2. Permite reflejar cadenas de llamadas internas.'
      }
    ]
  }
};

// =============================================
// DRAG & DROP EXERCISES
// =============================================
const DRAG_EXERCISES = {
  clasifica_diagrams: {
    title: 'Clasifica el tipo de Diagrama UML',
    description: 'Indica si cada diagrama es ESTRUCTURAL o DE COMPORTAMIENTO según la clasificación UML.',
    exercises: [
      {
        scenario: 'Diagrama de CLASES: muestra las clases del sistema con sus atributos, métodos y relaciones.',
        chips: ['Estructural', 'Comportamiento'],
        answer: 'Estructural',
        explanation: 'Diagrama de Clases → Estructural. Muestra la estructura estática (en reposo) del sistema.'
      },
      {
        scenario: 'Diagrama de CASOS DE USO: muestra los actores y las funcionalidades del sistema.',
        chips: ['Estructural', 'Comportamiento'],
        answer: 'Comportamiento',
        explanation: 'Diagrama de Casos de Uso → Comportamiento. Modela qué hace el sistema y cómo interactúan los actores.'
      },
      {
        scenario: 'Diagrama de SECUENCIA: representa el intercambio de mensajes entre objetos a lo largo del tiempo.',
        chips: ['Estructural', 'Comportamiento'],
        answer: 'Comportamiento',
        explanation: 'Diagrama de Secuencia → Comportamiento (subcategoría: Interacción). Modela interacciones dinámicas.'
      },
      {
        scenario: 'Diagrama de DESPLIEGUE: muestra los elementos hardware y software del sistema y su relación.',
        chips: ['Estructural', 'Comportamiento'],
        answer: 'Estructural',
        explanation: 'Diagrama de Despliegue → Estructural. Muestra la infraestructura (servidores, nodos) en reposo.'
      },
      {
        scenario: 'Diagrama de ACTIVIDAD: representa la secuencia de pasos para completar un proceso o flujo de trabajo.',
        chips: ['Estructural', 'Comportamiento'],
        answer: 'Comportamiento',
        explanation: 'Diagrama de Actividad → Comportamiento. Modela el flujo de trabajo dinámico con decisiones y bifurcaciones.'
      },
      {
        scenario: 'Diagrama de COMPONENTES: muestra los componentes del sistema y sus interfaces de comunicación.',
        chips: ['Estructural', 'Comportamiento'],
        answer: 'Estructural',
        explanation: 'Diagrama de Componentes → Estructural. Muestra cómo se organizan los módulos o subsistemas.'
      },
      {
        scenario: 'Diagrama de COMUNICACIÓN: muestra objetos conectados con mensajes numerados.',
        chips: ['Estructural', 'Comportamiento'],
        answer: 'Comportamiento',
        explanation: 'Diagrama de Comunicación → Comportamiento (subcategoría: Interacción). Equivalente al de secuencia, con énfasis en relaciones.'
      }
    ]
  },

  clasifica_rel: {
    title: 'Clasifica las Relaciones UML',
    description: 'Arrastra cada descripción al tipo de relación UML que corresponde.',
    exercises: [
      {
        scenario: 'Una Casa tiene Habitaciones. Si destruyes la Casa, las Habitaciones también desaparecen.',
        chips: ['Composición', 'Agregación', 'Herencia', 'Dependencia'],
        answer: 'Composición',
        explanation: 'Composición: las partes (Habitaciones) NO existen sin el todo (Casa). Diamante RELLENO.'
      },
      {
        scenario: 'Un Departamento tiene Profesores, pero los Profesores pueden existir aunque el Departamento cierre.',
        chips: ['Composición', 'Agregación', 'Herencia', 'Asociación'],
        answer: 'Agregación',
        explanation: 'Agregación: las partes (Profesores) SÍ existen sin el todo (Departamento). Diamante VACÍO.'
      },
      {
        scenario: 'Un Perro ES UN Animal.',
        chips: ['Composición', 'Realización', 'Herencia', 'Dependencia'],
        answer: 'Herencia',
        explanation: 'Herencia (Generalización): "es un". Línea continua con flecha triangular vacía hacia Animal.'
      },
      {
        scenario: 'La clase Avión IMPLEMENTA la interfaz Volable.',
        chips: ['Herencia', 'Realización', 'Composición', 'Asociación'],
        answer: 'Realización',
        explanation: 'Realización: clase → interfaz. Línea DISCONTINUA con flecha triangular vacía.'
      },
      {
        scenario: 'La clase Pedido usa temporalmente la clase Descuento para calcular el precio.',
        chips: ['Asociación', 'Composición', 'Dependencia', 'Herencia'],
        answer: 'Dependencia',
        explanation: 'Dependencia (use): Pedido usa Descuento momentáneamente. Línea discontinua con flecha simple y «use».'
      }
    ]
  },

  visibilidad_drag: {
    title: 'Asigna la Visibilidad Correcta',
    description: 'Arrastra el símbolo de visibilidad correcto a cada descripción.',
    exercises: [
      {
        scenario: 'Solo accesible desde dentro de la clase misma.',
        chips: ['+', '-', '#', '~'],
        answer: '-',
        explanation: '- (menos) = PRIVADO. Solo métodos de la misma clase pueden acceder.'
      },
      {
        scenario: 'Accesible desde cualquier clase del sistema.',
        chips: ['+', '-', '#', '~'],
        answer: '+',
        explanation: '+ (más) = PÚBLICO. Sin restricciones de acceso.'
      },
      {
        scenario: 'Accesible desde la clase y todas sus subclases.',
        chips: ['+', '-', '#', '~'],
        answer: '#',
        explanation: '# (almohadilla) = PROTEGIDO. Ideal para herencia: las subclases pueden acceder.'
      },
      {
        scenario: 'Accesible solo por clases del mismo paquete.',
        chips: ['+', '-', '#', '~'],
        answer: '~',
        explanation: '~ (tilde) = DE PAQUETE. Comparte acceso con clases del mismo paquete.'
      }
    ]
  },

  include_extend: {
    title: '«include» vs «extend»: Clasifica',
    description: 'Para cada escenario, decide si es include u extend.',
    exercises: [
      {
        scenario: 'Para Realizar Pedido, SIEMPRE es necesario Identificarse.',
        chips: ['«include»', '«extend»'],
        answer: '«include»',
        explanation: '«include» porque es OBLIGATORIO. Realizar Pedido siempre incluye Identificarse.'
      },
      {
        scenario: 'Al Realizar Venta, A VECES el cliente paga con tarjeta (comportamiento opcional).',
        chips: ['«include»', '«extend»'],
        answer: '«extend»',
        explanation: '«extend» porque es OPCIONAL. Pago con tarjeta solo ocurre en ciertos casos.'
      },
      {
        scenario: 'Para Ver Historial, siempre se debe Verificar Sesión.',
        chips: ['«include»', '«extend»'],
        answer: '«include»',
        explanation: '«include»: Verificar Sesión es obligatorio para Ver Historial. Siempre ocurre.'
      },
      {
        scenario: 'Al Hacer Login, en algunos casos se activa la Autenticación en 2 Pasos.',
        chips: ['«include»', '«extend»'],
        answer: '«extend»',
        explanation: '«extend»: la 2FA es opcional, solo se activa bajo ciertas condiciones (si el usuario la tiene habilitada).'
      },
      {
        scenario: 'Para Comprar Producto, siempre se necesita Añadir al Carrito.',
        chips: ['«include»', '«extend»'],
        answer: '«include»',
        explanation: '«include»: Añadir al Carrito es un paso obligatorio dentro de Comprar Producto.'
      }
    ]
  },

  tipo_mensaje: {
    title: 'Tipo de Mensaje en Secuencia',
    description: 'Clasifica cada descripción con el tipo de mensaje correcto.',
    exercises: [
      {
        scenario: 'El cliente envía una petición y espera la respuesta del servidor antes de continuar.',
        chips: ['Síncrono', 'Asíncrono', 'Retorno', 'Creación'],
        answer: 'Síncrono',
        explanation: 'Mensaje SÍNCRONO (flecha rellena). El emisor bloquea su ejecución hasta recibir respuesta.'
      },
      {
        scenario: 'El sistema envía una notificación de email y continúa sin esperar confirmación.',
        chips: ['Síncrono', 'Asíncrono', 'Retorno', 'Destrucción'],
        answer: 'Asíncrono',
        explanation: 'Mensaje ASÍNCRONO (flecha abierta). No bloquea al emisor. El receptor procesa cuando puede.'
      },
      {
        scenario: 'El método getNombre() devuelve el nombre del empleado al método que lo llamó.',
        chips: ['Síncrono', 'Asíncrono', 'Retorno', 'Creación'],
        answer: 'Retorno',
        explanation: 'Mensaje de RETORNO (línea discontinua con flecha). Devuelve un valor al llamador.'
      },
      {
        scenario: 'El sistema instancia un nuevo objeto de tipo Pedido.',
        chips: ['Síncrono', 'Asíncrono', 'Retorno', 'Creación'],
        answer: 'Creación',
        explanation: 'Mensaje de CREACIÓN. El nuevo objeto aparece en la lifeline con la notación «create».'
      }
    ]
  },

  comunicacion_vs_secuencia: {
    title: 'Secuencia vs Comunicación: Clasifica',
    description: 'Para cada característica, decide si pertenece al diagrama de secuencia, comunicación, o ambos.',
    exercises: [
      {
        scenario: 'El orden temporal de los mensajes se representa en el eje VERTICAL (de arriba abajo).',
        chips: ['Secuencia', 'Comunicación', 'Ambos'],
        answer: 'Secuencia',
        explanation: 'En Secuencia el tiempo es vertical. En Comunicación el orden lo dan los números (1:, 2:, 2.1:...).'
      },
      {
        scenario: 'Los mensajes llevan números (1:, 2:, 2.1:) para indicar el orden de envío.',
        chips: ['Secuencia', 'Comunicación', 'Ambos'],
        answer: 'Comunicación',
        explanation: 'Característica exclusiva del Diagrama de Comunicación: la numeración secuencial con posible anidación (2.1, 2.2...).'
      },
      {
        scenario: 'Muestra los objetos que intervienen en la interacción.',
        chips: ['Secuencia', 'Comunicación', 'Ambos'],
        answer: 'Ambos',
        explanation: 'Ambos diagramas muestran los mismos objetos. Son equivalentes: misma información, diferente énfasis gráfico.'
      },
      {
        scenario: 'Énfasis principal en las RELACIONES ESTRUCTURALES entre objetos (quién conoce a quién).',
        chips: ['Secuencia', 'Comunicación', 'Ambos'],
        answer: 'Comunicación',
        explanation: 'El diagrama de Comunicación muestra mejor la arquitectura de objetos (quién llama a quién). Secuencia es mejor para ver el flujo temporal.'
      },
      {
        scenario: 'Usa barras de activación para mostrar cuándo un objeto está ejecutando una operación.',
        chips: ['Secuencia', 'Comunicación', 'Ambos'],
        answer: 'Secuencia',
        explanation: 'Las barras de activación son exclusivas del Diagrama de Secuencia (rectángulos sobre la lifeline). Comunicación no las usa.'
      }
    ]
  }
};

// =============================================
// DIAGRAM DATA (guided SVGs)
// =============================================
const DIAGRAMS = {
  ud3_diag: {
    title: 'Mapa Visual de Diagramas UML',
    items: ['uml_tipos']
  },
  ud4_diag: {
    title: 'Galería de Diagramas de Clases',
    items: ['clase_simple', 'herencia', 'relaciones_completo', 'interfaces']
  },
  ud5_diag: {
    title: 'Galería de Diagramas de Comportamiento',
    items: ['casos_uso', 'secuencia_login', 'comunicacion', 'estados_factura', 'actividad_compra']
  }
};

// =============================================
// LAB EXERCISES
// =============================================
const LAB_EXERCISES = {
  'ud4-lab': [
    { 
      id: 'ud4-ex1', 
      title: 'Clase Simple Empleado', 
      scenario: 'Crea una clase llamada "Empleado" con dos atributos privados: "nombre" (String) y "sueldo" (double). Añade un método público "getSueldo()" que devuelva double.',
      solution: {
        nodes: [
          { 
            text: 'Empleado', 
            attrs: [
              { keyword: 'nombre', visibility: '-', type: 'String' },
              { keyword: 'sueldo', visibility: '-', type: 'double' }
            ],
            methods: [
              { keyword: 'getSueldo', visibility: '+', returnType: 'double' }
            ]
          }
        ],
        hints: { 
          no_nodes: 'Añade una clase para empezar.', 
          wrong_name: 'La clase debe llamarse "Empleado".', 
          missing_attrs: 'Te faltan los atributos "nombre" y "sueldo".', 
          missing_meths: 'El método "getSueldo()" es obligatorio.',
          wrong_visibility: 'Revisa la visibilidad: los atributos deben ser privados (-) y el método público (+).',
          wrong_type: 'Revisa los tipos: nombre debe ser String, sueldo debe ser double.',
          type_mismatch: 'Error de coherencia: getSueldo() debe devolver el mismo tipo que el atributo "sueldo" (double).'
        }
      }
    },
    { 
      id: 'ud4-ex2', 
      title: 'Herencia Animal', 
      scenario: 'Crea una clase padre "Animal" y una clase hija "Perro" que herede de ella. Perro debe tener "- raza : String".',
      solution: {
        nodes: [
          { text: 'Animal' }, 
          { text: 'Perro', attrs: [
            { keyword: 'raza', visibility: '-', type: 'String' }
          ]}
        ],
        rels: [{ from: 'Perro', to: 'Animal', type: 'inherit' }],
        hints: { 
          node_count: 'Necesitas dos clases: Animal y Perro.', 
          missing_rel: 'Falta la relación de herencia de Perro a Animal.', 
          wrong_attr: 'La clase Perro debe tener el atributo "raza".',
          wrong_visibility: 'El atributo "raza" debe ser privado (-).',
          wrong_type: 'El atributo "raza" debe ser de tipo String.'
        }
      }
    },
    {
      id: 'ud4-ex3',
      title: 'Composición Casa',
      scenario: 'Modelar una Casa que tiene una Habitación. Si la Casa se destruye, la Habitación también (Composición ◆).',
      solution: {
        nodes: [{ text: 'Casa' }, { text: 'Habitacion' }],
        rels: [{ from: 'Casa', to: 'Habitacion', type: 'compose' }],
        hints: { missing_rel: 'El diamante relleno ◆ debe estar en el lado de "Casa".', node_count: 'Crea las clases Casa y Habitacion.' }
      }
    },
    {
      id: 'ud4-ex4',
      title: 'Interfaz Volable',
      scenario: 'Define una clase "Avion" que implemente una interfaz "Volable". La interfaz tiene "+ volar() : void". El avión tiene "- matricula : String".',
      solution: {
        nodes: [
          { text: 'Volable', methods: [
            { keyword: 'volar', visibility: '+', returnType: 'void' }
          ]}, 
          { text: 'Avion', attrs: [
            { keyword: 'matricula', visibility: '-', type: 'String' }
          ]}
        ],
        rels: [{ from: 'Avion', to: 'Volable', type: 'inherit' }],
        hints: { 
          missing_meths: 'La interfaz Volable debe tener el método "volar()".', 
          missing_rel: 'Conecta Avion con Volable.',
          wrong_visibility: 'Revisa la visibilidad del método/atributo.',
          wrong_type: 'Revisa los tipos de datos.'
        }
      }
    },
    {
      id: 'ud4-ex5',
      title: 'Agregación Universidad',
      scenario: 'Una Universidad ◇ tiene Profesores. Los profesores pueden existir sin la universidad.',
      solution: {
        nodes: [{ text: 'Universidad' }, { text: 'Profesor' }],
        rels: [{ from: 'Universidad', to: 'Profesor', type: 'agg' }],
        hints: { missing_rel: 'Usa la agregación ◇ (diamante vacío) desde Universidad.', node_count: 'Crea las clases Universidad y Profesor.' }
      }
    }
  ],
  'ud5-lab': [
    { 
      id: 'ud5-ex1', 
      title: 'Login Básico', 
      scenario: 'Diseña un flujo: Inicio -> Leer Usuario -> ¿Usuario correcto? (Sí: Acceso / No: Error) -> Fin.',
      solution: {
        nodes_flow: ['Inicio', 'Usuario', '?', 'Acceso', 'Error', 'Fin'],
        hints: { missing_start: 'Todo flujograma empieza con un bloque "Inicio".', missing_decision: 'Necesitas un bloque de Decisión para comprobar el usuario.', missing_end: 'No olvides el bloque "Fin".' }
      }
    },
    { 
      id: 'ud5-ex2', 
      title: 'Cálculo Descuento', 
      scenario: 'Flujo: Inicio -> ¿Es VIP? -> Si es VIP, "-20%". Si no, "-5%". -> Aplicar Pago -> Fin.',
      solution: {
        nodes_flow: ['Inicio', 'VIP', '-20%', '-5%', 'Aplicar', 'Fin'],
        hints: { missing_branches: 'Tienes que prever qué pasa si es VIP y qué pasa si no lo es.', missing_action: 'Falta la acción final de "Aplicar pago" antes de terminar.' }
      }
    },
    {
      id: 'ud5-ex3',
      title: 'Bucle de Intentos',
      scenario: 'Proceso de reintento: Inicio -> Intento -> ¿Ha funcionado? -> Si No: Volver a Intento. Si Sí: Éxito -> Fin.',
      solution: {
        nodes_flow: ['Inicio', 'Intento', '?', 'Exito', 'Fin'],
        hints: { missing_decision: 'Usa una decisión para verificar si funcionó.', missing_path: 'Debes volver al bloque "Intento" si ha fallado.' }
      }
    },
    {
      id: 'ud5-ex4',
      title: 'Cajero Automático',
      scenario: 'Sacar dinero: Inicio -> Meter PIN -> ¿PIN OK? -> Si Sí: Dar Dinero -> Fin. Si No: Bloquear Tarjeta -> Fin.',
      solution: {
        nodes_flow: ['Inicio', 'PIN', '?', 'Dinero', 'Bloquear', 'Fin'],
        hints: { missing_decision: 'Comprueba si el PIN es correcto.', missing_end: 'Asegúrate de que ambos caminos lleguen al Fin.' }
      }
    },
    {
      id: 'ud5-ex5',
      title: 'Sensor de Alarma',
      scenario: 'Alarma temp: Leer Temp -> ¿Temp > 30? -> Si Sí: Activar Sirena -> Fin. Si No: Reposo -> Fin.',
      solution: {
        nodes_flow: ['Leer', '?', 'Sirena', 'Reposo', 'Fin'],
        hints: { missing_io: 'Usa un bloque Ent/Sal para "Leer Temp".', missing_decision: 'El rombo de decisión es clave.' }
      }
    }
  ]
};

// Append new lab exercises for the 4 new interactive modes
Object.assign(LAB_EXERCISES, {
  'ud5-lab-usecase': [
    {
      id: 'uc-ex1', title: 'Sistema de Login',
      scenario: 'Un actor "Usuario" puede "Identificarse". Ese caso de uso incluye (obligatoriamente) "Verificar Contraseña". Adiciona el sistema y las conexiones.',
      solution: {
        actors: ['Usuario'], usecases: ['Identificarse', 'Verificar'],
        rels: [
          { from: 'Usuario', to: 'Identificarse', type: 'assoc' },
          { from: 'Identificarse', to: 'Verificar', type: 'include' }
        ]
      }
    },
    {
      id: 'uc-ex2', title: 'Cajero Automático',
      scenario: 'Actor "Cliente" puede "Retirar Efectivo" (que incluye "Verificar Saldo"). Opcionalmente "Pagar Servicio" puede extender "Retirar Efectivo".',
      solution: {
        actors: ['Cliente'], usecases: ['Retirar', 'Verificar', 'Pagar'],
        rels: [
          { from: 'Cliente', to: 'Retirar', type: 'assoc' },
          { from: 'Retirar', to: 'Verificar', type: 'include' },
          { from: 'Pagar', to: 'Retirar', type: 'extend' }
        ]
      }
    },
    {
      id: 'uc-ex3', title: 'Tienda Online',
      scenario: 'Actor "Cliente" realiza pedido (incluye iniciar sesión). Actor "Admin" gestiona productos. Ambos actores extienden el actor base "Usuario".',
      solution: {
        actors: ['Cliente', 'Admin', 'Usuario'],
        usecases: ['Realizar Pedido', 'Iniciar Sesión', 'Gestionar'],
        rels: [
          { from: 'Cliente', to: 'Usuario', type: 'generalize' },
          { from: 'Admin', to: 'Usuario', type: 'generalize' },
          { from: 'Cliente', to: 'Realizar Pedido', type: 'assoc' },
          { from: 'Realizar Pedido', to: 'Iniciar Sesión', type: 'include' },
          { from: 'Admin', to: 'Gestionar', type: 'assoc' }
        ]
      }
    }
  ],

  'ud5-lab-seq': [
    {
      id: 'seq-ex1', title: 'Login — 3 Objetos',
      scenario: 'Añade 3 objetos: ":Cliente", ":Sistema", ":BBDD". El cliente envía "login()" al sistema (síncrono), el sistema envía "findUser()" a la BBDD, la BBDD retorna un resultado.',
      solution: {
        lifelines: [':Cliente', ':Sistema', ':BBDD'],
        messages: ['login', 'findUser'],
        minMessages: 2
      }
    },
    {
      id: 'seq-ex2', title: 'Compra Online',
      scenario: 'Objetos: ":Cliente", ":Tienda", ":Pago". El cliente hace "realizarPedido()", la tienda llama "procesarPago()" al servicio de pago (asíncrono), y el pago retorna confirmación.',
      solution: {
        lifelines: [':Cliente', ':Tienda', ':Pago'],
        messages: ['realizarPedido', 'procesarPago'],
        minMessages: 2
      }
    },
    {
      id: 'seq-ex3', title: 'Reserva de Hotel',
      scenario: 'Objetos: ":Cliente", ":Web", ":Reservas", ":BBDD". Flujo de reserva con al menos 3 mensajes: buscarDisponibilidad, confirmarReserva, guardarReserva.',
      solution: {
        lifelines: [':Cliente', ':Web', ':Reservas'],
        messages: ['buscarDisponibilidad', 'confirmarReserva', 'guardar'],
        minMessages: 3
      }
    }
  ],

  'ud5-lab-comms': [
    {
      id: 'comms-ex1', title: 'Login — Diagrama de Comunicación',
      scenario: 'Crea los mismos 3 objetos que en el diagrama de secuencia: ":Cliente", ":Sistema", ":BBDD". Enlázalos con mensajes numerados (1: login(), 2: findUser(), 2.1: query()). Compara: ¡es la misma información que la secuencia, pero sin eje de tiempo!',
      solution: {
        objects: [':Cliente', ':Sistema', ':BBDD'],
        links: [
          { from: ':Cliente', to: ':Sistema' },
          { from: ':Sistema', to: ':BBDD' }
        ],
        minMessages: 2
      }
    },
    {
      id: 'comms-ex2', title: 'Pedido con 4 Objetos',
      scenario: 'Crea: ":Cliente", ":Carrito", ":Pago", ":Almacén". Enlaza: Cliente→Carrito (1: añadirProducto()), Carrito→Pago (2: procesarPago()), Pago→Almacén (2.1: reservarStock()).',
      solution: {
        objects: [':Cliente', ':Carrito', ':Pago'],
        links: [
          { from: ':Cliente', to: ':Carrito' },
          { from: ':Carrito', to: ':Pago' }
        ],
        minMessages: 2
      }
    }
  ],

  'ud5-lab-states': [
    {
      id: 'st-ex1', title: 'Estados de una Factura',
      scenario: 'Modela el ciclo de vida de una Factura: Inicial → CREADA → PENDIENTE → PAGADA → Final. Añade también una transición de PENDIENTE a CANCELADA.',
      solution: {
        needsInitial: true, needsFinal: true,
        states: ['CREADA', 'PENDIENTE', 'PAGADA', 'CANCELADA'],
        transitions: [
          { from: 'initial', to: 'CREADA' },
          { from: 'CREADA', to: 'PENDIENTE' },
          { from: 'PENDIENTE', to: 'PAGADA' },
          { from: 'PENDIENTE', to: 'CANCELADA' }
        ]
      }
    },
    {
      id: 'st-ex2', title: 'Semáforo',
      scenario: 'Ciclo de un Semáforo: Inicial → ROJO → VERDE → AMARILLO → ROJO (ciclo). Añade las transiciones con los eventos temporizador.',
      solution: {
        needsInitial: true, needsFinal: false,
        states: ['ROJO', 'VERDE', 'AMARILLO'],
        transitions: [
          { from: 'initial', to: 'ROJO' },
          { from: 'ROJO', to: 'VERDE' },
          { from: 'VERDE', to: 'AMARILLO' },
          { from: 'AMARILLO', to: 'ROJO' }
        ]
      }
    },
    {
      id: 'st-ex3', title: 'Pedido de Tienda',
      scenario: 'Estados de un Pedido: NUEVO → PROCESANDO → ENVIADO → ENTREGADO (final). Si se cancela antes de enviarse: PROCESANDO → CANCELADO (final).',
      solution: {
        needsInitial: true, needsFinal: true,
        states: ['NUEVO', 'PROCESANDO', 'ENVIADO', 'ENTREGADO', 'CANCELADO'],
        transitions: [
          { from: 'initial', to: 'NUEVO' },
          { from: 'NUEVO', to: 'PROCESANDO' },
          { from: 'PROCESANDO', to: 'ENVIADO' },
          { from: 'ENVIADO', to: 'ENTREGADO' },
          { from: 'PROCESANDO', to: 'CANCELADO' }
        ]
      }
    }
  ]
});


const GIT_CHALLENGES = [
  {
    id: 'git-ex1',
    title: 'Primeros pasos (init → add → commit)',
    scenario: 'Inicializa un nuevo repositorio, añade los archivos al área de preparación y realiza tu primer commit con el mensaje "Initial commit".',
    validate: (state) => state.initialized && state.commits.length > 0 && state.commits[0].msg.toLowerCase().includes('initial'),
    hint: 'Sigue el flujo: 1. "git init", 2. "git add ." para preparar los archivos, 3. "git commit -m \'Initial commit\'" para confirmar.',
    solution: 'git init\ngit add .\ngit commit -m "Initial commit"'
  },
  {
    id: 'git-ex2',
    title: 'Trabajando con ramas (Branching)',
    scenario: 'Para organizar el trabajo, crea una nueva rama llamada "desarrollo" partiendo de la rama actual.',
    validate: (state) => state.branches['desarrollo'] !== undefined,
    hint: 'Usa el comando "git branch desarrollo" para crearla.',
    solution: 'git branch desarrollo'
  },
  {
    id: 'git-ex3',
    title: 'Cambiando el contexto (Checkout)',
    scenario: 'Ahora que has creado la rama "desarrollo", cámbiate a ella para empezar a trabajar allí.',
    validate: (state) => state.head === 'desarrollo',
    hint: 'Usa "git checkout desarrollo" para cambiar el puntero HEAD.',
    solution: 'git checkout desarrollo'
  },
  {
    id: 'git-ex4',
    title: 'Evolución del proyecto',
    scenario: 'Estando en la rama "desarrollo", crea un nuevo commit con el mensaje "Feature 1" para registrar tus cambios.',
    validate: (state) => state.head === 'desarrollo' && state.commits.some(c => c.msg.toLowerCase().includes('feature')),
    hint: 'Recuerda que antes de cada commit debes usar "git add ." para preparar los cambios.',
    solution: 'git add .\ngit commit -m "Feature 1"'
  }
];
