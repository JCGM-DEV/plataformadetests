// =============================================
// DATA — UD4 & UD5 Content
// =============================================

const UNITS = {
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
      { id: 'ud5-teoria3', icon: '📖', label: 'Teoría: Estados y Actividad', type: 'lesson', lessonId: 'estados' },
      { id: 'ud5-quiz1', icon: '🧠', label: 'Quiz: Casos de Uso', type: 'quiz', quizId: 'casos_uso' },
      { id: 'ud5-quiz2', icon: '🧠', label: 'Quiz: Secuencia', type: 'quiz', quizId: 'secuencia' },
      { id: 'ud5-drag1', icon: '🎯', label: 'Ejercicio: include vs extend', type: 'drag', dragId: 'include_extend' },
      { id: 'ud5-drag2', icon: '🎯', label: 'Ejercicio: Tipo de mensaje', type: 'drag', dragId: 'tipo_mensaje' },
      { id: 'ud5-diagram', icon: '📐', label: 'Diagramas Guiados', type: 'diagram', diagId: 'ud5_diag' },
      { id: 'ud5-lab', icon: '🧪', label: 'Laboratorio: Flujogramas', type: 'lab' },
    ]
  }
};

// =============================================
// LESSONS
// =============================================
const LESSONS = {
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
      }
    ]
  }
};

// =============================================
// DRAG & DROP EXERCISES
// =============================================
const DRAG_EXERCISES = {
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
  }
};

// =============================================
// DIAGRAM DATA (guided SVGs)
// =============================================
const DIAGRAMS = {
  ud4_diag: {
    title: 'Galería de Diagramas de Clases',
    items: ['clase_simple', 'herencia', 'relaciones_completo', 'interfaces']
  },
  ud5_diag: {
    title: 'Galería de Diagramas de Comportamiento',
    items: ['casos_uso', 'secuencia_login', 'estados_factura', 'actividad_compra']
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
      scenario: 'Crea una clase llamada "Empleado" con dos atributos privados: "nombre" (String) y "sueldo" (double). Añade un método público "getSueldo()".',
      solution: {
        nodes: [{ text: 'Empleado', attrs: ['nombre', 'sueldo'], methods: ['getSueldo'] }],
        hints: { no_nodes: 'Añade una clase para empezar.', wrong_name: 'La clase debe llamarse "Empleado".', missing_attrs: 'Te faltan los atributos "nombre" y "sueldo".', missing_meths: 'El método "getSueldo()" es obligatorio.' }
      }
    },
    { 
      id: 'ud4-ex2', 
      title: 'Herencia Animal', 
      scenario: 'Crea una clase padre "Animal" y una clase hija "Perro" que herede de ella. Perro debe tener "- raza : String".',
      solution: {
        nodes: [{ text: 'Animal' }, { text: 'Perro', attrs: ['raza'] }],
        rels: [{ from: 'Perro', to: 'Animal', type: 'inherit' }],
        hints: { node_count: 'Necesitas dos clases: Animal y Perro.', missing_rel: 'Falta la relación de herencia de Perro a Animal.', wrong_attr: 'La clase Perro debe tener el atributo "raza".' }
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
      scenario: 'Define una clase "Avion" que implemente una interfaz "Volable". La interfaz tiene "+ volar()". El avión tiene "- matricula".',
      solution: {
        nodes: [{ text: 'Volable', methods: ['volar'] }, { text: 'Avion', attrs: ['matricula'] }],
        rels: [{ from: 'Avion', to: 'Volable', type: 'inherit' }], // inherit as realization marker
        hints: { missing_meths: 'La interfaz Volable debe tener el método "volar()".', missing_rel: 'Conecta Avion con Volable.' }
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
