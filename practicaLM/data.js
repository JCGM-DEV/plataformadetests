// =============================================
// LM LAB — DATA
// =============================================
const UNITS = {
  html: {
    label: 'T2', title: 'HTML5 & CSS3',
    sections: [
      { id: 'html-teoria', icon: '📖', label: 'Teoría: HTML5 Semántico', type: 'lesson', lessonId: 'html5' },
      { id: 'html-teoria2', icon: '📖', label: 'Teoría: CSS3 y Selectores', type: 'lesson', lessonId: 'css3' },
      { id: 'html-quiz1', icon: '🧠', label: 'Quiz: HTML5', type: 'quiz', quizId: 'html_quiz' },
      { id: 'html-quiz2', icon: '🧠', label: 'Quiz: CSS3', type: 'quiz', quizId: 'css_quiz' },
      { id: 'html-drag1', icon: '🎯', label: 'Ejercicio: Etiquetas semánticas', type: 'drag', dragId: 'semantica' },
      { id: 'html-editor', icon: '⌨️', label: 'Editor HTML en Vivo', type: 'editor', editorId: 'html_editor' },
    ]
  },
  xml: {
    label: 'T3–T4', title: 'XML & XSD',
    sections: [
      { id: 'xml-teoria', icon: '📖', label: 'Teoría: XML Bien Formado', type: 'lesson', lessonId: 'xml_teoria' },
      { id: 'xml-teoria2', icon: '📖', label: 'Teoría: XSD (XML Schema)', type: 'lesson', lessonId: 'xsd_teoria' },
      { id: 'xml-quiz1', icon: '🧠', label: 'Quiz: XML', type: 'quiz', quizId: 'xml_quiz' },
      { id: 'xml-quiz2', icon: '🧠', label: 'Quiz: XSD', type: 'quiz', quizId: 'xsd_quiz' },
      { id: 'xml-drag1', icon: '🎯', label: 'Ejercicio: Bien formado vs Válido', type: 'drag', dragId: 'xml_valido' },
      { id: 'xml-editor', icon: '⌨️', label: 'Editor XML con Validación', type: 'editor', editorId: 'xml_editor' },
      { id: 'xml-reto', icon: '🏆', label: 'Reto María: XSD Avanzado', type: 'lesson', lessonId: 'reto_xsd_maria' },
    ]
  },
  xslt: {
    label: 'T5', title: 'XPath & XSLT',
    sections: [
      { id: 'xslt-teoria', icon: '📖', label: 'Teoría: XPath', type: 'lesson', lessonId: 'xpath_teoria' },
      { id: 'xslt-teoria2', icon: '📖', label: 'Teoría: XSLT', type: 'lesson', lessonId: 'xslt_teoria' },
      { id: 'xslt-quiz1', icon: '🧠', label: 'Quiz: XPath y XSLT', type: 'quiz', quizId: 'xslt_quiz' },
      { id: 'xslt-drag1', icon: '🎯', label: 'Ejercicio: Instrucciones XSLT', type: 'drag', dragId: 'xslt_instr' },
      { id: 'xslt-xpath', icon: '🧪', label: 'Evaluador XPath Interactivo', type: 'xpath', xpathId: 'xpath_main' },
      { id: 'xslt-reto', icon: '🏆', label: 'Reto María: Transformación', type: 'lesson', lessonId: 'reto_xslt_maria' },
    ]
  },
  bachero: {
    label: 'EXAMEN', title: 'Repaso Práctico Bachero',
    sections: [
      { id: 'b-h1', category: 'Bloque 1: HTML', icon: '🌐', label: 'HTML 1: Estructura', type: 'editor', editorId: 'h_1' },
      { id: 'b-h2', category: 'Bloque 1: HTML', icon: '🌐', label: 'HTML 2: Títulos y Br', type: 'editor', editorId: 'h_2' },
      { id: 'b-h3', category: 'Bloque 1: HTML', icon: '🌐', label: 'HTML 3: Formato Texto', type: 'editor', editorId: 'h_3' },
      { id: 'b-h4', category: 'Bloque 1: HTML', icon: '🌐', label: 'HTML 4: Listas', type: 'editor', editorId: 'h_4' },
      { id: 'b-h5', category: 'Bloque 1: HTML', icon: '🌐', label: 'HTML 5: Enlaces', type: 'editor', editorId: 'h_5' },
      { id: 'b-h6', category: 'Bloque 1: HTML', icon: '🌐', label: 'HTML 6: Imágenes', type: 'editor', editorId: 'h_6' },
      { id: 'b-h7', category: 'Bloque 1: HTML', icon: '🌐', label: 'HTML 7: Tablas', type: 'editor', editorId: 'h_7' },
      { id: 'b-h8', category: 'Bloque 1: HTML', icon: '🌐', label: 'HTML 8: Div y Span', type: 'editor', editorId: 'h_8' },
      { id: 'b-h9', category: 'Bloque 1: HTML', icon: '🌐', label: 'HTML 9: Formularios', type: 'editor', editorId: 'h_9' },
      { id: 'b-h10', category: 'Bloque 1: HTML', icon: '🌐', label: 'HTML 10: Página Completa', type: 'editor', editorId: 'h_10' },

      { id: 'b-x1', category: 'Bloque 2: XML & DTD', icon: '📄', label: 'XML 1: Alumno', type: 'editor', editorId: 'x_1' },
      { id: 'b-x2', category: 'Bloque 2: XML & DTD', icon: '📄', label: 'XML 2: Curso', type: 'editor', editorId: 'x_2' },
      { id: 'b-x3', category: 'Bloque 2: XML & DTD', icon: '📄', label: 'XML 3: CSS', type: 'editor', editorId: 'x_3' },
      { id: 'b-x4', category: 'Bloque 2: XML & DTD', icon: '📄', label: 'XML 4: CDATA', type: 'editor', editorId: 'x_4' },
      { id: 'b-d1', category: 'Bloque 2: XML & DTD', icon: '📜', label: 'DTD 1: Persona', type: 'editor', editorId: 'd_1' },
      { id: 'b-d2', category: 'Bloque 2: XML & DTD', icon: '📜', label: 'DTD 2: Clase (+)', type: 'editor', editorId: 'd_2' },
      { id: 'b-d3', category: 'Bloque 2: XML & DTD', icon: '📜', label: 'DTD 3: Libro (Attr)', type: 'editor', editorId: 'd_3' },
      { id: 'b-d4', category: 'Bloque 2: XML & DTD', icon: '📜', label: 'DTD 4: Entidades', type: 'editor', editorId: 'd_4' },

      { id: 'b-s1', category: 'Bloque 3: XSD', icon: '🛡️', label: 'XSD 1: Persona', type: 'editor', editorId: 's_1' },
      { id: 'b-s2', category: 'Bloque 3: XSD', icon: '🛡️', label: 'XSD 2: Ocurrencias', type: 'editor', editorId: 's_2' },
      { id: 'b-s3', category: 'Bloque 3: XSD', icon: '🛡️', label: 'XSD 3: Atributos', type: 'editor', editorId: 's_3' },
      { id: 'b-s4', category: 'Bloque 3: XSD', icon: '🛡️', label: 'XSD 4: Restricciones', type: 'editor', editorId: 's_4' },
      { id: 'b-s5', category: 'Bloque 3: XSD', icon: '🛡️', label: 'XSD 5: Choice', type: 'editor', editorId: 's_5' },
      { id: 'b-s6', category: 'Bloque 3: XSD', icon: '🛡️', label: 'XSD 6: DNI Pattern', type: 'editor', editorId: 's_6' },
      { id: 'b-s7', category: 'Bloque 3: XSD', icon: '🛡️', label: 'XSD 7: Enum A-D', type: 'editor', editorId: 's_7' },
      { id: 'b-s8', category: 'Bloque 3: XSD', icon: '🛡️', label: 'XSD 8: Usuario Full', type: 'editor', editorId: 's_8' },
      { id: 'b-s9', category: 'Bloque 3: XSD', icon: '🛡️', label: 'XSD 9: Pattern AB123', type: 'editor', editorId: 's_9' },
      { id: 'b-s10', category: 'Bloque 3: XSD', icon: '🛡️', label: 'XSD 10: Tienda Completa', type: 'editor', editorId: 's_10' },

      { id: 'b-sl1', category: 'Bloque 4: XSLT', icon: '🔄', label: 'XSLT 1: Básicos', type: 'editor', editorId: 'sl_1' },
      { id: 'b-sl2', category: 'Bloque 4: XSLT', icon: '🔄', label: 'XSLT 2: For-each', type: 'editor', editorId: 'sl_2' },
      { id: 'b-sl3', category: 'Bloque 4: XSLT', icon: '🔄', label: 'XSLT 3: Filtro XPath', type: 'editor', editorId: 'sl_3' },
      { id: 'b-sl4', category: 'Bloque 4: XSLT', icon: '🔄', label: 'XSLT 4: Sort', type: 'editor', editorId: 'sl_4' },
      { id: 'b-sl5', category: 'Bloque 4: XSLT', icon: '🔄', label: 'XSLT 5: Formato Texto', type: 'editor', editorId: 'sl_5' },
      { id: 'b-sl6', category: 'Bloque 4: XSLT', icon: '🔄', label: 'XSLT 6: Listas HTML', type: 'editor', editorId: 'sl_6' },
      { id: 'b-sl7', category: 'Bloque 4: XSLT', icon: '🔄', label: 'XSLT 7: Tablas HTML', type: 'editor', editorId: 'sl_7' },
      { id: 'b-sl8', category: 'Bloque 4: XSLT', icon: '🔄', label: 'XSLT 8: Filtro Marca', type: 'editor', editorId: 'sl_8' },
      { id: 'b-sl9', category: 'Bloque 4: XSLT', icon: '🔄', label: 'XSLT 9: Filtro Precio', type: 'editor', editorId: 'sl_9' },
      { id: 'b-sl10', category: 'Bloque 4: XSLT', icon: '🔄', label: 'XSLT 10: Sort Asc', type: 'editor', editorId: 'sl_10' },
      { id: 'b-sl11', category: 'Bloque 4: XSLT', icon: '🔄', label: 'XSLT 11: Sort Desc', type: 'editor', editorId: 'sl_11' },
      { id: 'b-sl12', category: 'Bloque 4: XSLT', icon: '🔄', label: 'XSLT 12: Uso xsl:if', type: 'editor', editorId: 'sl_12' },

      { id: 'b-q1', category: 'Bloque 5: XQuery (Biblioteca)', icon: '📚', label: 'Q1: Títulos', type: 'editor', editorId: 'q_1' },
      { id: 'b-q2', category: 'Bloque 5: XQuery (Biblioteca)', icon: '📚', label: 'Q2: Tít + Aut', type: 'editor', editorId: 'q_2' },
      { id: 'b-q3', category: 'Bloque 5: XQuery (Biblioteca)', icon: '📚', label: 'Q3: Informática', type: 'editor', editorId: 'q_3' },
      { id: 'b-q4', category: 'Bloque 5: XQuery (Biblioteca)', icon: '📚', label: 'Q4: Precio > 25', type: 'editor', editorId: 'q_4' },
      { id: 'b-q5', category: 'Bloque 5: XQuery (Biblioteca)', icon: '📚', label: 'Q5: Orden Asc', type: 'editor', editorId: 'q_5' },
      { id: 'b-q6', category: 'Bloque 5: XQuery (Biblioteca)', icon: '📚', label: 'Q6: Orden Desc', type: 'editor', editorId: 'q_6' },
      { id: 'b-q7', category: 'Bloque 5: XQuery (Biblioteca)', icon: '📚', label: 'Q7: Primero', type: 'editor', editorId: 'q_7' },
      { id: 'b-q8', category: 'Bloque 5: XQuery (Biblioteca)', icon: '📚', label: 'Q8: Último', type: 'editor', editorId: 'q_8' },
      { id: 'b-q9', category: 'Bloque 5: XQuery (Biblioteca)', icon: '📚', label: 'Q9: Conteo', type: 'editor', editorId: 'q_9' },
      { id: 'b-q10', category: 'Bloque 5: XQuery (Biblioteca)', icon: '📚', label: 'Q10: Stock < 5', type: 'editor', editorId: 'q_10' },

      { id: 'b-q11', category: 'Bloque 6: XQuery (Tienda)', icon: '🛒', label: 'Q11: Tienda Intro', type: 'editor', editorId: 'q_12' },
      { id: 'b-q12', category: 'Bloque 6: XQuery (Tienda)', icon: '🛒', label: 'Q12: Tienda Format', type: 'editor', editorId: 'q_13' },
      { id: 'b-q13', category: 'Bloque 6: XQuery (Tienda)', icon: '🛒', label: 'Q13: Tienda > 50', type: 'editor', editorId: 'q_14' },
      { id: 'b-q14', category: 'Bloque 6: XQuery (Tienda)', icon: '🛒', label: 'Q14: Tienda Logitech', type: 'editor', editorId: 'q_15' },
      { id: 'b-q15', category: 'Bloque 6: XQuery (Tienda)', icon: '🛒', label: 'Q15: Tienda Asc', type: 'editor', editorId: 'q_16' },
      { id: 'b-q16', category: 'Bloque 6: XQuery (Tienda)', icon: '🛒', label: 'Q16: Tienda Desc', type: 'editor', editorId: 'q_17' },
      { id: 'b-q17', category: 'Bloque 6: XQuery (Tienda)', icon: '🛒', label: 'Q17: Tienda Stock', type: 'editor', editorId: 'q_18' },
      
      { id: 'b-q18', category: 'Bloque 6: Repaso XQuery (Extra)', icon: '💡', label: 'Extra 1: Videojuegos', type: 'editor', editorId: 'q_19' },
      { id: 'b-q19', category: 'Bloque 6: Repaso XQuery (Extra)', icon: '💡', label: 'Extra 2: Academia', type: 'editor', editorId: 'q_20' },
      { id: 'b-q20', category: 'Bloque 6: Repaso XQuery (Extra)', icon: '💡', label: 'Extra 3: Páginas', type: 'editor', editorId: 'q_21' },
      { id: 'b-q21', category: 'Bloque 6: Repaso XQuery (Extra)', icon: '💡', label: 'Extra 4: Coches (Max)', type: 'editor', editorId: 'q_22' },
      { id: 'b-q22', category: 'Bloque 6: Repaso XQuery (Extra)', icon: '💡', label: 'Extra 5: Alumnos', type: 'editor', editorId: 'q_23' },
      { id: 'b-q23', category: 'Bloque 6: Repaso XQuery (Extra)', icon: '💡', label: 'Extra 6: Películas', type: 'editor', editorId: 'q_24' },
      { id: 'b-q24', category: 'Bloque 6: Repaso XQuery (Extra)', icon: '💡', label: 'Extra 7: Pedidos', type: 'editor', editorId: 'q_25' }
    ]
  },
  simulacros: {
    label: 'EXAMEN', title: 'Simulacros de Examen',
    sections: [
      { id: 'sim1-quiz', icon: '🧠', label: 'Simulacro 1: Test Teórico', type: 'quiz', quizId: 'simulacro1_quiz' },
      { id: 'sim1-h1', category: 'Práctico 1: HTML5 Completo', icon: '🌐', label: '1. Estructura y Head', type: 'editor', editorId: 'sim1_p1' },
      { id: 'sim1-h2', category: 'Práctico 1: HTML5 Completo', icon: '🌐', label: '2. Header y Menú', type: 'editor', editorId: 'sim1_p2' },
      { id: 'sim1-h3', category: 'Práctico 1: HTML5 Completo', icon: '🌐', label: '3. Productos (Sección)', type: 'editor', editorId: 'sim1_p3' },
      { id: 'sim1-h4', category: 'Práctico 1: HTML5 Completo', icon: '🌐', label: '4. Formulario Contacto', type: 'editor', editorId: 'sim1_p4' },
    ]
  }
};

const XPATH_LABS = {
  xpath_main: {
    xml: `<?xml version="1.0" encoding="UTF-8"?>
<tienda nombre="DAW Books">
  <libro categoria="PROGRAMACION" id="101">
    <titulo lang="es">Java a fondo</titulo>
    <autor>Pérez, Juan</autor>
    <precio moneda="EUR">29.95</precio>
    <stock>12</stock>
  </libro>
  <libro categoria="PROGRAMACION" id="102">
    <titulo lang="en">Thinking in Java</titulo>
    <autor>Eckel, Bruce</autor>
    <precio moneda="EUR">45.00</precio>
    <stock>5</stock>
  </libro>
  <libro categoria="SISTEMAS" id="201">
    <titulo lang="es">Linux System Administration</titulo>
    <autor>Nemeth, Evi</autor>
    <precio moneda="EUR">39.50</precio>
    <stock>8</stock>
  </libro>
  <libro categoria="CINE" id="301">
    <titulo lang="es">Historia del Cine</titulo>
    <autor>Gourdet, Jean</autor>
    <precio moneda="EUR">15.20</precio>
    <stock>0</stock>
  </libro>
</tienda>`
  }
};

const LESSONS = {
  html5: {
    title: 'HTML5 — Estructura Semántica',
    subtitle: 'Etiquetas semánticas, formularios y atributos globales',
    concepts: [
      { icon: '🏗️', title: 'Etiquetas Semánticas', body: '<code>&lt;header&gt;</code>: cabecera. <code>&lt;nav&gt;</code>: navegación. <code>&lt;main&gt;</code>: contenido principal. <code>&lt;article&gt;</code>: contenido independiente. <code>&lt;section&gt;</code>: sección temática. <code>&lt;aside&gt;</code>: contenido lateral. <code>&lt;footer&gt;</code>: pie.' },
      { icon: '📝', title: 'Formularios HTML5', body: '<code>&lt;form action="" method="post"&gt;</code>. Tipos de input: text, email, number, date, checkbox, radio, file. Atributos: required, placeholder, min, max, pattern. <code>enctype="multipart/form-data"</code> para subir archivos.' },
      { icon: '🔗', title: 'Atributos Globales', body: '<code>id</code>: identificador único. <code>class</code>: clase CSS. <code>style</code>: CSS inline (no recomendado). <code>data-*</code>: atributos personalizados. <code>lang</code>: idioma. <code>tabindex</code>: orden de tabulación.' },
      { icon: '📊', title: 'Tablas HTML', body: '<code>&lt;table&gt;</code> → <code>&lt;thead&gt;</code>, <code>&lt;tbody&gt;</code>, <code>&lt;tfoot&gt;</code> → <code>&lt;tr&gt;</code> → <code>&lt;th&gt;</code> (cabecera) / <code>&lt;td&gt;</code> (dato). Atributos: colspan, rowspan.' },
      { icon: '🖼️', title: 'Multimedia', body: '<code>&lt;img src="" alt=""&gt;</code>: imagen (alt obligatorio para accesibilidad). <code>&lt;video&gt;</code>, <code>&lt;audio&gt;</code>: multimedia nativa. <code>&lt;figure&gt;</code> + <code>&lt;figcaption&gt;</code>: imagen con pie.' },
      { icon: '⚠️', title: 'Etiquetas Obsoletas', body: '<code>&lt;font&gt;</code>, <code>&lt;center&gt;</code>, <code>&lt;b&gt;</code> (usar <code>&lt;strong&gt;</code>), <code>&lt;i&gt;</code> (usar <code>&lt;em&gt;</code>), <code>&lt;u&gt;</code>. En HTML5 el estilo va en CSS, no en el HTML.' },
    ],
    codeExample: `<span class="kw">&lt;!DOCTYPE html&gt;</span>
<span class="kw">&lt;html</span> <span class="fn">lang</span>=<span class="str">"es"</span><span class="kw">&gt;</span>
<span class="kw">&lt;head&gt;</span>
  <span class="kw">&lt;meta</span> <span class="fn">charset</span>=<span class="str">"UTF-8"</span><span class="kw">&gt;</span>
  <span class="kw">&lt;title&gt;</span>Mi Página<span class="kw">&lt;/title&gt;</span>
<span class="kw">&lt;/head&gt;</span>
<span class="kw">&lt;body&gt;</span>
  <span class="kw">&lt;header&gt;&lt;nav&gt;</span>...<span class="kw">&lt;/nav&gt;&lt;/header&gt;</span>
  <span class="kw">&lt;main&gt;</span>
    <span class="kw">&lt;article&gt;</span>...<span class="kw">&lt;/article&gt;</span>
    <span class="kw">&lt;aside&gt;</span>...<span class="kw">&lt;/aside&gt;</span>
  <span class="kw">&lt;/main&gt;</span>
  <span class="kw">&lt;footer&gt;</span>...<span class="kw">&lt;/footer&gt;</span>
<span class="kw">&lt;/body&gt;&lt;/html&gt;</span>`,
    info: { type: 'warning', text: '⚠️ <strong>Examen frecuente</strong>: La diferencia entre &lt;article&gt; (contenido independiente, como un post) y &lt;section&gt; (sección temática dentro de una página). &lt;aside&gt; es la barra lateral.' }
  },

  css3: {
    title: 'CSS3 — Selectores y Cascada',
    subtitle: 'Selectores, especificidad, box model y posicionamiento',
    concepts: [
      { icon: '🎯', title: 'Tipos de Selectores', body: '<code>p</code>: elemento. <code>.clase</code>: clase. <code>#id</code>: ID. <code>*</code>: universal. <code>p span</code>: descendiente. <code>p > span</code>: hijo directo. <code>p + span</code>: hermano adyacente. <code>p ~ span</code>: hermanos generales.' },
      { icon: '📦', title: 'Box Model', body: 'content → padding → border → margin. <code>box-sizing: border-box</code> incluye padding y border en el width. <code>box-sizing: content-box</code> (por defecto) no los incluye.' },
      { icon: '📍', title: 'Posicionamiento', body: '<code>static</code>: flujo normal. <code>relative</code>: relativo a su posición normal. <code>absolute</code>: relativo al ancestro posicionado. <code>fixed</code>: relativo al viewport. <code>sticky</code>: mezcla de relative y fixed.' },
      { icon: '🔢', title: 'Especificidad', body: 'Orden: !important > inline > ID > clase/pseudo-clase > elemento. Cálculo: (0,1,0,0) para ID, (0,0,1,0) para clase, (0,0,0,1) para elemento.' },
      { icon: '📱', title: 'Flexbox', body: '<code>display: flex</code>. <code>flex-direction</code>: row/column. <code>justify-content</code>: eje principal. <code>align-items</code>: eje secundario. <code>flex-wrap</code>: salto de línea. <code>gap</code>: espacio entre elementos.' },
      { icon: '🔲', title: 'Grid', body: '<code>display: grid</code>. <code>grid-template-columns</code>: define columnas. <code>grid-template-rows</code>: define filas. <code>grid-column</code>/<code>grid-row</code>: posición del elemento. <code>gap</code>: espacio.' },
    ],
    codeExample: `<span class="cm">/* Selector hijo directo vs descendiente */</span>
<span class="fn">p > span</span> { <span class="kw">color</span>: <span class="str">red</span>; }   <span class="cm">/* solo hijos directos */</span>
<span class="fn">p span</span>   { <span class="kw">color</span>: <span class="str">blue</span>; }  <span class="cm">/* todos los descendientes */</span>

<span class="cm">/* Flexbox centrado */</span>
<span class="fn">.container</span> {
  <span class="kw">display</span>: flex;
  <span class="kw">justify-content</span>: center;
  <span class="kw">align-items</span>: center;
}`,
    info: { type: 'tip', text: '💡 <strong>Selector p > span</strong>: solo aplica al &lt;span&gt; que es hijo DIRECTO de &lt;p&gt;. Si el span está dentro de un &lt;div&gt; dentro del &lt;p&gt;, NO se aplica. El selector <code>p span</code> (sin >) sí lo aplicaría.' }
  },

  xml_teoria: {
    title: 'XML — Documentos Bien Formados',
    subtitle: 'Reglas de sintaxis XML y estructura jerárquica',
    concepts: [
      { icon: '📋', title: 'Reglas de Bien Formado', body: '1. Un único elemento raíz. 2. Todas las etiquetas cerradas. 3. Anidamiento correcto (no cruzado). 4. Atributos entre comillas. 5. Sensible a mayúsculas/minúsculas. 6. Elementos vacíos: <code>&lt;br/&gt;</code> o <code>&lt;br&gt;&lt;/br&gt;</code>.' },
      { icon: '🌳', title: 'Estructura Jerárquica', body: 'Árbol de nodos: elemento raíz → elementos hijos → texto. Relaciones: padre, hijo, hermano, descendiente, ancestro. El elemento raíz contiene todo el documento.' },
      { icon: '📝', title: 'Prólogo XML', body: '<code>&lt;?xml version="1.0" encoding="UTF-8"?&gt;</code>. Opcional pero recomendado. <code>standalone="yes"</code>: no depende de DTD externa.' },
      { icon: '🔤', title: 'Nombres Válidos', body: 'Deben empezar por letra o _. No pueden empezar por "xml" (reservado). No pueden contener espacios. Pueden contener letras, dígitos, -, _, .' },
      { icon: '💬', title: 'Comentarios y CDATA', body: '<code>&lt;!-- comentario --&gt;</code>. <code>&lt;![CDATA[texto con &lt; y &gt; sin escapar]]&gt;</code>: para texto con caracteres especiales.' },
      { icon: '🔗', title: 'Namespaces', body: '<code>xmlns="URI"</code>: espacio de nombres por defecto (afecta al elemento y sus hijos, no a atributos). <code>xmlns:prefijo="URI"</code>: con prefijo. Evita conflictos de nombres.' },
    ],
    codeExample: `<span class="kw">&lt;?xml version=</span><span class="str">"1.0"</span> <span class="kw">encoding=</span><span class="str">"UTF-8"</span><span class="kw">?&gt;</span>
<span class="kw">&lt;catalogo</span> <span class="fn">xmlns</span>=<span class="str">"http://ejemplo.com/ns"</span><span class="kw">&gt;</span>
  <span class="kw">&lt;producto</span> <span class="fn">id</span>=<span class="str">"1"</span><span class="kw">&gt;</span>
    <span class="kw">&lt;nombre&gt;</span>Laptop<span class="kw">&lt;/nombre&gt;</span>
    <span class="kw">&lt;precio</span> <span class="fn">moneda</span>=<span class="str">"EUR"</span><span class="kw">&gt;</span>999.99<span class="kw">&lt;/precio&gt;</span>
    <span class="kw">&lt;descripcion&gt;&lt;![CDATA[</span>Precio &lt; 1000€<span class="kw">]]&gt;&lt;/descripcion&gt;</span>
  <span class="kw">&lt;/producto&gt;</span>
<span class="kw">&lt;/catalogo&gt;</span>`,
    info: { type: 'warning', text: '⚠️ <strong>Bien formado ≠ Válido</strong>: Un documento XML puede estar bien formado (sintaxis correcta) pero no ser válido (no cumple el DTD/XSD). Para ser válido debe estar bien formado Y cumplir el esquema.' }
  },

  xsd_teoria: {
    title: 'XSD — XML Schema Definition',
    subtitle: 'Definir la estructura y tipos de datos de documentos XML',
    concepts: [
      { icon: '🏗️', title: 'Estructura XSD', body: '<code>xs:element</code>: define un elemento. <code>xs:attribute</code>: define un atributo. <code>xs:complexType</code>: tipo con hijos o atributos. <code>xs:simpleType</code>: tipo con restricciones de valor.' },
      { icon: '📋', title: 'xs:sequence vs xs:choice', body: '<code>xs:sequence</code>: los hijos deben aparecer en ese orden exacto. <code>xs:choice</code>: solo uno de los hijos puede aparecer. <code>xs:all</code>: todos los hijos, en cualquier orden.' },
      { icon: '🔢', title: 'Ocurrencias', body: '<code>minOccurs="0"</code>: opcional. <code>minOccurs="1"</code>: obligatorio (por defecto). <code>maxOccurs="unbounded"</code>: ilimitado. <code>maxOccurs="3"</code>: máximo 3 veces.' },
      { icon: '🔒', title: 'Restricciones (xs:restriction)', body: '<code>xs:enumeration</code>: lista de valores permitidos. <code>xs:pattern</code>: expresión regular. <code>xs:minLength</code>/<code>xs:maxLength</code>: longitud. <code>xs:minInclusive</code>/<code>xs:maxInclusive</code>: rango numérico.' },
      { icon: '🔗', title: 'Asociar XSD a XML', body: 'Sin namespace: <code>xsi:noNamespaceSchemaLocation="schema.xsd"</code>. Con namespace: <code>xsi:schemaLocation="URI schema.xsd"</code>. Requiere declarar <code>xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"</code>.' },
      { icon: '📊', title: 'Tipos de Datos XSD', body: '<code>xs:string</code>, <code>xs:integer</code>, <code>xs:decimal</code>, <code>xs:boolean</code>, <code>xs:date</code>, <code>xs:dateTime</code>. Los atributos pueden ser <code>use="required"</code> u <code>optional</code>.' },
    ],
    codeExample: `<span class="kw">&lt;xs:element</span> <span class="fn">name</span>=<span class="str">"producto"</span><span class="kw">&gt;</span>
  <span class="kw">&lt;xs:complexType&gt;</span>
    <span class="kw">&lt;xs:sequence&gt;</span>
      <span class="kw">&lt;xs:element</span> <span class="fn">name</span>=<span class="str">"nombre"</span> <span class="fn">type</span>=<span class="str">"xs:string"</span><span class="kw">/&gt;</span>
      <span class="kw">&lt;xs:element</span> <span class="fn">name</span>=<span class="str">"precio"</span> <span class="fn">type</span>=<span class="str">"xs:decimal"</span><span class="kw">/&gt;</span>
    <span class="kw">&lt;/xs:sequence&gt;</span>
    <span class="kw">&lt;xs:attribute</span> <span class="fn">name</span>=<span class="str">"id"</span> <span class="fn">type</span>=<span class="str">"xs:integer"</span> <span class="fn">use</span>=<span class="str">"required"</span><span class="kw">/&gt;</span>
  <span class="kw">&lt;/xs:complexType&gt;</span>
<span class="kw">&lt;/xs:element&gt;</span>`,
    info: { type: 'tip', text: '💡 <strong>xs:sequence vs xs:all</strong>: sequence exige orden fijo. all permite cualquier orden pero cada elemento solo puede aparecer 0 o 1 vez. choice permite solo uno de los elementos definidos.' }
  },

  xpath_teoria: {
    title: 'XPath — Expresiones de Ruta',
    subtitle: 'Navegar y seleccionar nodos en documentos XML',
    concepts: [
      { icon: '📍', title: 'Rutas Absolutas y Relativas', body: '<code>/catalogo/producto</code>: ruta absoluta desde la raíz. <code>producto/nombre</code>: ruta relativa al nodo actual. <code>//nombre</code>: cualquier elemento nombre en cualquier nivel.' },
      { icon: '🔢', title: 'Predicados', body: '<code>/producto[1]</code>: primer producto. <code>/producto[last()]</code>: último. <code>/producto[@id="1"]</code>: con atributo id=1. <code>/producto[precio>100]</code>: con precio mayor a 100.' },
      { icon: '@', title: 'Atributos', body: '<code>@atributo</code>: selecciona el atributo. <code>@*</code>: todos los atributos. <code>elemento/@attr</code>: atributo de un elemento.' },
      { icon: '⚙️', title: 'Funciones XPath', body: '<code>text()</code>: nodo de texto. <code>count()</code>: cuenta nodos. <code>string()</code>: convierte a texto. <code>contains(str, sub)</code>: contiene. <code>starts-with(str, pre)</code>: empieza por.' },
      { icon: '🔗', title: 'Ejes XPath', body: '<code>child::</code>: hijos (por defecto). <code>parent::</code>: padre. <code>ancestor::</code>: ancestros. <code>descendant::</code>: descendientes. <code>following-sibling::</code>: hermanos siguientes.' },
      { icon: '🔄', title: 'Uso en XSLT', body: '<code>select="@identificador"</code>: valor de atributo. <code>select="nombre"</code>: elemento hijo. <code>select="."</code>: nodo actual. <code>select="*"</code>: todos los hijos.' },
    ],
    codeExample: `<span class="cm">&lt;!-- Seleccionar todos los productos --&gt;</span>
<span class="kw">/catalogo/producto</span>

<span class="cm">&lt;!-- Producto con id=1 --&gt;</span>
<span class="kw">/catalogo/producto[@id='1']</span>

<span class="cm">&lt;!-- Nombre del primer producto --&gt;</span>
<span class="kw">/catalogo/producto[1]/nombre/text()</span>

<span class="cm">&lt;!-- Productos con precio > 100 --&gt;</span>
<span class="kw">//producto[precio > 100]</span>`,
    info: { type: 'warning', text: '⚠️ <strong>Examen</strong>: Para acceder al valor de un atributo en XPath se usa @. Para acceder al texto de un elemento se usa text() o simplemente el nombre del elemento en xsl:value-of.' }
  },

  xslt_teoria: {
    title: 'XSLT — Transformaciones XML',
    subtitle: 'Transformar documentos XML a HTML, texto u otro XML',
    concepts: [
      { icon: '🔄', title: 'xsl:template', body: '<code>match="/"</code>: plantilla raíz. <code>match="producto"</code>: se aplica a cada elemento producto. <code>name="nombrePlantilla"</code>: plantilla nombrada (se llama con xsl:call-template).' },
      { icon: '🔁', title: 'xsl:for-each', body: 'Itera sobre un conjunto de nodos. <code>&lt;xsl:for-each select="catalogo/producto"&gt;</code>. Dentro se puede usar <code>xsl:sort</code> para ordenar.' },
      { icon: '📤', title: 'xsl:value-of', body: 'Extrae el valor de un nodo. <code>&lt;xsl:value-of select="nombre"/&gt;</code>. Para atributos: <code>select="@id"</code>. Para el nodo actual: <code>select="."</code>.' },
      { icon: '❓', title: 'xsl:if y xsl:choose', body: '<code>xsl:if test="precio > 100"</code>: condicional simple. <code>xsl:choose</code> + <code>xsl:when</code> + <code>xsl:otherwise</code>: equivale a if-elseif-else.' },
      { icon: '📊', title: 'SAX vs DOM', body: '<strong>DOM</strong>: carga todo en memoria, permite modificar. Lento con documentos grandes. <strong>SAX</strong>: basado en eventos, bajo consumo de memoria, solo lectura secuencial. Para documentos grandes → SAX.' },
      { icon: '📄', title: 'xsl:output', body: '<code>&lt;xsl:output method="html" indent="yes"/&gt;</code>. Métodos: html, xml, text. <code>encoding="UTF-8"</code>. <code>doctype-public</code>: añade DOCTYPE al resultado.' },
    ],
    codeExample: `<span class="kw">&lt;xsl:stylesheet</span> <span class="fn">version</span>=<span class="str">"1.0"</span>
  <span class="fn">xmlns:xsl</span>=<span class="str">"http://www.w3.org/1999/XSL/Transform"</span><span class="kw">&gt;</span>
  <span class="kw">&lt;xsl:output</span> <span class="fn">method</span>=<span class="str">"html"</span><span class="kw">/&gt;</span>
  <span class="kw">&lt;xsl:template</span> <span class="fn">match</span>=<span class="str">"/"</span><span class="kw">&gt;</span>
    <span class="kw">&lt;xsl:for-each</span> <span class="fn">select</span>=<span class="str">"catalogo/producto"</span><span class="kw">&gt;</span>
      <span class="kw">&lt;xsl:if</span> <span class="fn">test</span>=<span class="str">"precio &gt; 100"</span><span class="kw">&gt;</span>
        <span class="kw">&lt;p&gt;&lt;xsl:value-of</span> <span class="fn">select</span>=<span class="str">"nombre"</span><span class="kw">/&gt;&lt;/p&gt;</span>
      <span class="kw">&lt;/xsl:if&gt;</span>
    <span class="kw">&lt;/xsl:for-each&gt;</span>
  <span class="kw">&lt;/xsl:template&gt;</span>
<span class="kw">&lt;/xsl:stylesheet&gt;</span>`,
    info: { type: 'tip', text: '💡 <strong>Chrome y XSLT local</strong>: Chrome bloquea la transformación XSLT cuando se abre desde file:// por restricciones de seguridad. En el examen pueden preguntar esto: la respuesta es que se muestra página en blanco o no se aplica la transformación.' }
  },

  xquery_teoria: {
    title: 'XQuery — Consultas XML (Post Enero 2026)',
    subtitle: 'Consultas avanzadas con expresiones FLWOR',
    concepts: [
      { icon: '🔄', title: 'Estructura FLWOR', body: '<strong>FOR</strong>: iterar sobre secuencias. <strong>LET</strong>: definir variables. <strong>WHERE</strong>: filtrar resultados. <strong>ORDER BY</strong>: ordenar. <strong>RETURN</strong>: construir el resultado.' },
      { icon: '📍', title: 'Ejemplo Básico FLWOR', body: 'Para obtener nombres de productos con precio > 50: <code>for $p in //producto where $p/precio > 50 return $p/nombre</code>' },
      { icon: '🔗', title: 'Generación HTML', body: 'XQuery permite devolver HTML directamente. <code>return &lt;li&gt;{ data($p/nombre) }&lt;/li&gt;</code> envuelve el resultado en etiquetas.' },
      { icon: '⚙️', title: 'Funciones XQuery', body: '<code>data()</code>: extrae solo el valor. <code>doc("archivo.xml")</code>: carga un archivo. <code>sum() / count() / avg()</code>: operaciones de agregación típicas.' }
    ],
    codeExample: `<span class="cm">(: Archivo: consultas.xq :)</span>
<span class="kw">for</span> <span class="fn">$p</span> <span class="kw">in</span> doc(<span class="str">"tienda.xml"</span>)//producto
<span class="kw">where</span> <span class="fn">$p</span>/precio > <span class="str">50</span>
<span class="kw">order by</span> <span class="fn">$p</span>/precio <span class="kw">descending</span>
<span class="kw">return</span>
  <span class="kw">&lt;resultado&gt;</span>
    <span class="fn">{$p/nombre}</span>
  <span class="kw">&lt;/resultado&gt;</span>`,
    info: { type: 'tip', text: '💡 <strong>Recuerda (Examen)</strong>: En XQuery es obligatorio usar llaves <code>{}</code> al debolver XML si dentro quieres meter una variable (ej: <code>&lt;li&gt; {$var} &lt;/li&gt;</code>).' }
  },

  reto_xsd_maria: {
    title: '🏆 Reto Oficial: Restricciones de Calidad',
    subtitle: 'Implementa las reglas de validación enviadas por María',
    concepts: [
      { icon: '🔞', title: 'Rango de Edad', body: 'Configura un <code>xs:restriction</code> con <code>minInclusive value="0"</code> y <code>maxInclusive value="120"</code>.' },
      { icon: '📏', title: 'Longitud de Nombre', body: 'Usa <code>minLength value="3"</code> para asegurar que el nombre del alumno sea válido.' },
      { icon: '🔁', title: 'Indicadores', body: 'Configura <code>minOccurs="1"</code> y <code>maxOccurs="unbounded"</code> para permitir múltiples alumnos en una clase.' }
    ],
    codeExample: `<span class="kw">&lt;xs:simpleType</span> <span class="fn">name</span>=<span class="str">"edadTipo"</span><span class="kw">&gt;</span>
  <span class="kw">&lt;xs:restriction</span> <span class="fn">base</span>=<span class="str">"xs:integer"</span><span class="kw">&gt;</span>
    <span class="kw">&lt;xs:minInclusive</span> <span class="fn">value</span>=<span class="str">"0"</span><span class="kw">/&gt;</span>
    <span class="kw">&lt;xs:maxInclusive</span> <span class="fn">value</span>=<span class="str">"120"</span><span class="kw">/&gt;</span>
  <span class="kw">&lt;/xs:restriction&gt;</span>
<span class="kw">&lt;/xs:simpleType&gt;</span>`,
    info: { type: 'important', text: '🎯 <strong>Tips de Examen</strong>: Recuerda que las restricciones (facets) siempre van dentro de un <code>xs:simpleType</code>.' }
  },

  reto_xslt_maria: {
    title: '🏆 Reto Oficial: Transformación de Factura',
    subtitle: 'Extraer datos específicos usando XPath y XSLT',
    concepts: [
      { icon: '📑', title: 'Cabecera XSLT', body: 'Asegúrate de incluir la versión 1.0 y el namespace oficial de W3C.' },
      { icon: '🔍', title: 'xsl:value-of', body: 'Extrae el total de la factura usando <code>select="factura/total"</code>.' },
      { icon: '📊', title: 'Generación de Tabla', body: 'Envuelve el <code>xsl:for-each</code> en etiquetas <code>&lt;table&gt;</code> y <code>&lt;tr&gt;</code>.' }
    ],
    codeExample: `<span class="kw">&lt;xsl:template</span> <span class="fn">match</span>=<span class="str">"/"</span><span class="kw">&gt;</span>
  <span class="kw">&lt;html&gt;</span>
    <span class="kw">&lt;body&gt;</span>
      <span class="kw">&lt;h2&gt;</span>Listado de Alumnos<span class="kw">&lt;/h2&gt;</span>
      <span class="kw">&lt;ul&gt;</span>
        <span class="kw">&lt;xsl:for-each</span> <span class="fn">select</span>=<span class="str">"clase/alumno"</span><span class="kw">&gt;</span>
          <span class="kw">&lt;li&gt;&lt;xsl:value-of</span> <span class="fn">select</span>=<span class="str">"nombre"</span><span class="kw">/&gt;&lt;/li&gt;</span>
        <span class="kw">&lt;/xsl:for-each&gt;</span>
      <span class="kw">&lt;/ul&gt;</span>
    <span class="kw">&lt;/body&gt;</span>
  <span class="kw">&lt;/html&gt;</span>
<span class="kw">&lt;/xsl:template&gt;</span>`,
    info: { type: 'tip', text: '💡 <strong>Pro-Tip</strong>: Usa <code>indent="yes"</code> en el <code>xsl:output</code> para que el resultado sea legible.' }
  },

  reto_xquery_maria: {
    title: '🏆 Reto Oficial: Catálogo FLWOR',
    subtitle: 'Consultas complejas sobre el catálogo de María',
    concepts: [
      { icon: '📚', title: 'Selección de Libros', body: 'Usa <code>for $b in //book</code> para recorrer el catálogo.' },
      { icon: '💲', title: 'Filtro de Precio', body: 'Añade <code>where $b/price > 30</code> para filtrar libros caros.' },
      { icon: '🏗️', title: 'Construir XML', body: 'Usa <code>return &lt;libro&gt;{ $b/title/text() }&lt;/libro&gt;</code> para formatear la salida.' }
    ],
    codeExample: `<span class="cm">(: Reto: Libros de Maria con precio > 30 :)</span>
<span class="kw">for</span> <span class="fn">$libro</span> <span class="kw">in</span> doc(<span class="str">"biblioteca.xml"</span>)//libro
<span class="kw">where</span> <span class="fn">$libro</span>/precio > <span class="str">30</span>
<span class="kw">order by</span> <span class="fn">$libro</span>/titulo
<span class="kw">return</span>
  <span class="kw">&lt;resultado&gt;</span>
    <span class="fn">{ $libro/titulo/text() }</span>
  <span class="kw">&lt;/resultado&gt;</span>`,
    info: { type: 'important', text: '🎯 <strong>Clave de María</strong>: No olvides usar <code>text()</code> o <code>data()</code> para que el resultado no incluya las etiquetas originales si no las quieres.' }
  }
};

const QUIZZES = {
  html_quiz: { title: 'Quiz: HTML5', questions: [
    { q: '¿Qué etiqueta HTML5 representa una barra lateral con contenido relacionado pero no principal?', hint: 'No es section ni article.',
      opts: ['&lt;section&gt;', '&lt;nav&gt;', '&lt;aside&gt;', '&lt;div&gt;'], ans: 2,
      exp: '<strong>&lt;aside&gt;</strong> es la barra lateral. Contiene contenido relacionado con el principal pero no esencial. &lt;section&gt; es una sección temática, &lt;article&gt; es contenido independiente.' },
    { q: '¿Qué atributo del formulario es necesario para subir archivos?', hint: 'Relacionado con el tipo de contenido.',
      opts: ['method="file"', 'enctype="multipart/form-data"', 'type="upload"', 'action="upload"'], ans: 1,
      exp: '<strong>enctype="multipart/form-data"</strong> es obligatorio para subir archivos. Sin él, el archivo no se envía correctamente.' },
    { q: '¿Cuál de estas etiquetas está OBSOLETA en HTML5?', hint: 'El estilo debe ir en CSS.',
      opts: ['&lt;strong&gt;', '&lt;em&gt;', '&lt;font&gt;', '&lt;figure&gt;'], ans: 2,
      exp: '<strong>&lt;font&gt;</strong> está obsoleta en HTML5. El estilo tipográfico debe manejarse con CSS. También están obsoletas &lt;center&gt;, &lt;b&gt; (en favor de &lt;strong&gt;), &lt;i&gt; (en favor de &lt;em&gt;).' },
    { q: '¿Qué selector CSS aplica estilos SOLO al &lt;span&gt; hijo directo de &lt;p&gt;?', hint: 'Diferencia entre descendiente y hijo directo.',
      opts: ['p span', 'p + span', 'p > span', 'p ~ span'], ans: 2,
      exp: '<strong>p > span</strong> selecciona solo los &lt;span&gt; que son hijos DIRECTOS de &lt;p&gt;. El selector "p span" (sin >) selecciona todos los &lt;span&gt; descendientes, sin importar la profundidad.' },
    { q: '¿Qué etiqueta agrupa semánticamente las filas del cuerpo de una tabla?', hint: 'Hay tres secciones en una tabla.',
      opts: ['&lt;tr&gt;', '&lt;td&gt;', '&lt;tbody&gt;', '&lt;table-body&gt;'], ans: 2,
      exp: '<strong>&lt;tbody&gt;</strong> agrupa las filas del cuerpo. &lt;thead&gt; agrupa las cabeceras y &lt;tfoot&gt; el pie. Esto es útil para tablas largas y para aplicar estilos diferenciados.' },
    { q: '¿Cuál es la forma MENOS recomendable de incluir CSS?', hint: 'Mezcla contenido y presentación.',
      opts: ['Archivo CSS externo con &lt;link&gt;', '&lt;style&gt; en el &lt;head&gt;', 'CSS inline con atributo style=""', 'Importar con @import'], ans: 2,
      exp: 'El <strong>CSS inline</strong> (style="...") es el menos recomendable porque mezcla contenido y presentación, dificulta el mantenimiento y tiene la mayor especificidad (difícil de sobreescribir).' }
  ]},
  css_quiz: { title: 'Quiz: CSS3', questions: [
    { q: '¿Qué propiedad CSS controla el espacio DENTRO del borde de un elemento?', hint: 'Parte del box model.',
      opts: ['margin', 'border', 'padding', 'spacing'], ans: 2,
      exp: '<strong>padding</strong> es el espacio entre el contenido y el borde. <strong>margin</strong> es el espacio fuera del borde (entre elementos).' },
    { q: 'Con box-sizing: border-box, ¿qué incluye el width?', hint: 'Cambia cómo se calcula el tamaño.',
      opts: ['Solo el contenido', 'Contenido + padding', 'Contenido + padding + border', 'Contenido + padding + border + margin'], ans: 2,
      exp: '<strong>border-box</strong>: el width incluye contenido + padding + border. Es el comportamiento más intuitivo y el más usado en diseño moderno.' },
    { q: '¿Qué valor de position hace que el elemento se posicione relativo al viewport y no se mueva al hacer scroll?', hint: 'Típico para barras de navegación.',
      opts: ['relative', 'absolute', 'sticky', 'fixed'], ans: 3,
      exp: '<strong>fixed</strong>: posicionado relativo al viewport, no se mueve al hacer scroll. <strong>sticky</strong> es una mezcla: se comporta como relative hasta que llega a un umbral, luego como fixed.' },
    { q: '¿Qué propiedad de Flexbox alinea los elementos en el eje PRINCIPAL?', hint: 'Eje horizontal en row, vertical en column.',
      opts: ['align-items', 'align-content', 'justify-content', 'flex-direction'], ans: 2,
      exp: '<strong>justify-content</strong> alinea en el eje principal (horizontal en row). <strong>align-items</strong> alinea en el eje secundario (vertical en row).' }
  ]},
  xml_quiz: { title: 'Quiz: XML', questions: [
    { q: '¿Cuántos elementos raíz puede tener un documento XML bien formado?', hint: 'Regla fundamental de XML.',
      opts: ['Ninguno', 'Exactamente uno', 'Dos como máximo', 'Sin límite'], ans: 1,
      exp: 'Un documento XML bien formado debe tener <strong>exactamente un elemento raíz</strong> que contenga todos los demás elementos.' },
    { q: '¿Cómo se representa un elemento vacío en XML?', hint: 'Dos formas válidas.',
      opts: ['&lt;br&gt; (sin cerrar)', '&lt;br/&gt; o &lt;br&gt;&lt;/br&gt;', '&lt;br&gt;&lt;/&gt;', 'Solo &lt;br/&gt;'], ans: 1,
      exp: 'En XML los elementos vacíos pueden ser <strong>&lt;br/&gt;</strong> (autocierre) o <strong>&lt;br&gt;&lt;/br&gt;</strong>. A diferencia de HTML, en XML TODAS las etiquetas deben cerrarse.' },
    { q: '¿Qué es un namespace (espacio de nombres) en XML?', hint: 'Evita conflictos de nombres.',
      opts: ['El nombre del archivo XML', 'Un mecanismo para evitar conflictos de nombres entre elementos de diferentes vocabularios XML', 'El elemento raíz del documento', 'La versión del documento XML'], ans: 1,
      exp: 'Un <strong>namespace</strong> es un URI que identifica un vocabulario XML. Evita conflictos cuando se combinan elementos de diferentes esquemas XML.' },
    { q: '¿Qué diferencia hay entre un documento XML "bien formado" y uno "válido"?', hint: 'Son dos niveles de corrección.',
      opts: ['Son sinónimos', 'Bien formado = sintaxis correcta. Válido = bien formado + cumple DTD/XSD', 'Válido = sintaxis correcta. Bien formado = cumple DTD', 'No hay diferencia práctica'], ans: 1,
      exp: '<strong>Bien formado</strong>: cumple las reglas sintácticas de XML. <strong>Válido</strong>: además cumple las restricciones de estructura definidas en un DTD o XSD. Todo válido es bien formado, pero no al revés.' },
    { q: '¿Para qué sirve CDATA en XML?', hint: 'Relacionado con caracteres especiales.',
      opts: ['Para añadir comentarios', 'Para incluir texto con caracteres especiales (&lt;, &gt;, &amp;) sin escaparlos', 'Para definir atributos', 'Para importar otro documento XML'], ans: 1,
      exp: '<strong>CDATA</strong> (Character Data): permite incluir texto con caracteres que normalmente necesitarían escaparse (&lt;, &gt;, &amp;). Sintaxis: &lt;![CDATA[...]]&gt;' }
  ]},
  xsd_quiz: { title: 'Quiz: XSD', questions: [
    { q: '¿Qué elemento XSD define que los hijos deben aparecer en un orden específico?', hint: 'Orden fijo.',
      opts: ['xs:all', 'xs:choice', 'xs:sequence', 'xs:order'], ans: 2,
      exp: '<strong>xs:sequence</strong>: los elementos hijos deben aparecer en el orden exacto definido. xs:all permite cualquier orden. xs:choice permite solo uno de los elementos.' },
    { q: '¿Qué valor de maxOccurs permite que un elemento aparezca un número ilimitado de veces?', hint: 'Palabra especial, no un número.',
      opts: ['0', 'infinite', 'unbounded', '*'], ans: 2,
      exp: '<strong>maxOccurs="unbounded"</strong> permite que el elemento aparezca cualquier número de veces. maxOccurs="0" significa que no puede aparecer.' },
    { q: '¿Qué faceta XSD restringe un valor a una lista de opciones predefinidas?', hint: 'Como un enum.',
      opts: ['xs:pattern', 'xs:maxLength', 'xs:enumeration', 'xs:restriction'], ans: 2,
      exp: '<strong>xs:enumeration</strong> define los valores exactos permitidos. xs:pattern usa expresiones regulares. xs:restriction es el contenedor de las facetas.' },
    { q: '¿Cómo se hace obligatorio un atributo en XSD?', hint: 'Atributo del elemento xs:attribute.',
      opts: ['required="true"', 'use="required"', 'mandatory="yes"', 'optional="false"'], ans: 1,
      exp: '<strong>use="required"</strong> en xs:attribute hace el atributo obligatorio. use="optional" (por defecto) lo hace opcional. use="prohibited" lo prohíbe.' }
  ]},
  xslt_quiz: { title: 'Quiz: XPath y XSLT', questions: [
    { q: '¿Qué expresión XPath selecciona el atributo "id" del elemento actual?', hint: 'Los atributos se acceden con un símbolo especial.',
      opts: ['id', '.id', '@id', '#id'], ans: 2,
      exp: '<strong>@id</strong> selecciona el atributo id. En XPath, los atributos se prefijan con @. En xsl:value-of: select="@id".' },
    { q: '¿Qué instrucción XSLT itera sobre un conjunto de nodos?', hint: 'Equivale a un bucle for.',
      opts: ['xsl:if', 'xsl:for-each', 'xsl:loop', 'xsl:repeat'], ans: 1,
      exp: '<strong>xsl:for-each</strong> itera sobre los nodos seleccionados por el atributo select. Dentro se puede usar xsl:sort para ordenar.' },
    { q: '¿Cuándo se recomienda SAX sobre DOM para procesar XML?', hint: 'Relacionado con el tamaño del documento.',
      opts: ['Cuando se necesita modificar el XML', 'Cuando el documento es pequeño', 'Cuando el documento es muy grande y el consumo de memoria es crítico', 'Siempre, SAX es mejor'], ans: 2,
      exp: '<strong>SAX</strong> es basado en eventos, no carga todo en memoria → ideal para documentos grandes. <strong>DOM</strong> carga todo en memoria → permite modificar pero consume más recursos.' },
    { q: '¿Qué instrucción XSLT equivale a un if-elseif-else?', hint: 'Tiene xsl:when y xsl:otherwise.',
      opts: ['xsl:if', 'xsl:switch', 'xsl:choose', 'xsl:case'], ans: 2,
      exp: '<strong>xsl:choose</strong> con xsl:when (condiciones) y xsl:otherwise (caso por defecto) equivale a if-elseif-else. xsl:if solo tiene la parte "if" sin else.' }
  ]},
  simulacro1_quiz: {
    title: 'Simulacro 1: Test Teórico',
    questions: [
      {
        q: "¿Qué es un lenguaje de marcas?",
        opts: ["Un sistema de etiquetas para estructurar información", "Un lenguaje de programación", "Un compilador", "Un sistema operativo"],
        ans: 0,
        exp: "Los lenguajes de marcas (como HTML o XML) usan etiquetas para dar estructura a los datos, no para ejecutar algoritmos."
      },
      {
        q: "¿Qué lenguaje es estándar para páginas web?",
        opts: ["XML", "JSON", "HTML", "XSLT"],
        ans: 2,
        exp: "HTML es el lenguaje estándar para la creación de páginas web."
      },
      {
        q: "¿Qué organismo regula estándares web?",
        opts: ["ISO", "IEEE", "W3C", "Oracle"],
        ans: 2,
        exp: "El World Wide Web Consortium (W3C) es el encargado de estandarizar las tecnologías web."
      },
      {
        q: "¿Qué representa el DOM?",
        opts: ["Un lenguaje", "Un modelo de objetos del documento", "Un servidor", "Un compilador"],
        ans: 1,
        exp: "Document Object Model (DOM) representa la estructura de un documento como un árbol de objetos."
      },
      {
        q: "¿Qué etiqueta define el cuerpo en HTML?",
        opts: ["<head>", "<body>", "<html>", "<div>"],
        ans: 1,
        exp: "El contenido visible de la página se encierra dentro de la etiqueta <body>."
      }
    ]
  }
};

const DRAG_EXERCISES = {
  semantica: { title: 'Etiquetas Semánticas HTML5', description: 'Arrastra la etiqueta correcta para cada descripción.',
    exercises: [
      { scenario: 'Zona de la página que contiene el logotipo, título principal y menú de navegación superior.', chips: ['&lt;header&gt;', '&lt;nav&gt;', '&lt;main&gt;', '&lt;aside&gt;'], answer: '&lt;header&gt;', explanation: '&lt;header&gt; es la cabecera de la página o sección. Suele contener el logo, título y navegación principal.' },
      { scenario: 'Barra lateral con enlaces relacionados, publicidad o información complementaria.', chips: ['&lt;section&gt;', '&lt;article&gt;', '&lt;aside&gt;', '&lt;footer&gt;'], answer: '&lt;aside&gt;', explanation: '&lt;aside&gt; es contenido relacionado pero no esencial para el contenido principal. Típicamente una barra lateral.' },
      { scenario: 'Un post de blog completo que tiene sentido por sí solo, fuera de contexto.', chips: ['&lt;section&gt;', '&lt;article&gt;', '&lt;div&gt;', '&lt;main&gt;'], answer: '&lt;article&gt;', explanation: '&lt;article&gt; es contenido independiente y autocontenido. Un post, noticia o comentario son buenos ejemplos.' },
      { scenario: 'Conjunto de enlaces de navegación principal del sitio web.', chips: ['&lt;header&gt;', '&lt;menu&gt;', '&lt;nav&gt;', '&lt;ul&gt;'], answer: '&lt;nav&gt;', explanation: '&lt;nav&gt; contiene los enlaces de navegación principales. No todos los grupos de enlaces necesitan &lt;nav&gt;, solo los principales.' },
      { scenario: 'Pie de página con copyright, contacto y enlaces legales.', chips: ['&lt;bottom&gt;', '&lt;footer&gt;', '&lt;end&gt;', '&lt;section&gt;'], answer: '&lt;footer&gt;', explanation: '&lt;footer&gt; es el pie de página o sección. Suele contener información de copyright, contacto y enlaces secundarios.' }
    ]
  },
  xml_valido: { title: 'Bien Formado vs Válido', description: 'Clasifica cada afirmación.',
    exercises: [
      { scenario: 'El documento tiene un único elemento raíz, todas las etiquetas están cerradas y los atributos van entre comillas. NO tiene DTD ni XSD asociado.', chips: ['Bien formado y válido', 'Solo bien formado', 'Ni bien formado ni válido', 'Solo válido'], answer: 'Solo bien formado', explanation: 'Sin DTD/XSD no se puede validar. El documento cumple las reglas sintácticas (bien formado) pero no tiene esquema que valide su estructura.' },
      { scenario: 'El documento tiene DTD y cumple todas sus restricciones. Además, todas las etiquetas están correctamente cerradas y anidadas.', chips: ['Bien formado y válido', 'Solo bien formado', 'Ni bien formado ni válido', 'Solo válido'], answer: 'Bien formado y válido', explanation: 'Para ser válido debe ser bien formado Y cumplir el DTD/XSD. Si cumple ambas condiciones, es bien formado y válido.' },
      { scenario: 'El documento tiene una etiqueta &lt;nombre&gt; que se cierra como &lt;/Nombre&gt; (diferente capitalización).', chips: ['Bien formado y válido', 'Solo bien formado', 'Ni bien formado ni válido', 'Solo válido'], answer: 'Ni bien formado ni válido', explanation: 'XML es sensible a mayúsculas/minúsculas. &lt;nombre&gt; y &lt;Nombre&gt; son etiquetas diferentes. El documento NO está bien formado.' }
    ]
  },
  xslt_instr: { title: 'Instrucciones XSLT', description: 'Arrastra la instrucción XSLT correcta para cada caso.',
    exercises: [
      { scenario: 'Quieres mostrar el valor del elemento &lt;nombre&gt; del nodo actual.', chips: ['xsl:for-each', 'xsl:value-of', 'xsl:if', 'xsl:template'], answer: 'xsl:value-of', explanation: 'xsl:value-of con select="nombre" extrae y muestra el contenido de texto del elemento nombre.' },
      { scenario: 'Quieres recorrer todos los elementos &lt;producto&gt; del catálogo.', chips: ['xsl:for-each', 'xsl:value-of', 'xsl:choose', 'xsl:apply-templates'], answer: 'xsl:for-each', explanation: 'xsl:for-each select="catalogo/producto" itera sobre cada elemento producto.' },
      { scenario: 'Quieres mostrar "CARO" si el precio es mayor a 500, "BARATO" si no.', chips: ['xsl:if', 'xsl:for-each', 'xsl:choose', 'xsl:value-of'], answer: 'xsl:choose', explanation: 'xsl:choose con xsl:when y xsl:otherwise es el equivalente a if-else. xsl:if no tiene parte "else".' },
      { scenario: 'Quieres mostrar un mensaje solo si el stock es 0.', chips: ['xsl:choose', 'xsl:for-each', 'xsl:if', 'xsl:template'], answer: 'xsl:if', explanation: 'xsl:if test="stock = 0" muestra el contenido solo si la condición es verdadera. No tiene parte else.' }
    ]
  }
};

const EDITOR_LABS = {
  html_editor: {
    title: 'Editor HTML en Vivo',
    description: 'Escribe HTML y ve el resultado al instante en el panel de previsualización.',
    type: 'html',
    exercises: [
      { id: 1, title: 'Estructura semántica básica', desc: 'Crea una página con header (con nav), main (con un article y un aside) y footer.',
        hint: 'Usa las etiquetas semánticas: header, nav, main, article, aside, footer',
        starter: `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Mi Página</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 0; }
    header { background: #333; color: white; padding: 1rem; }
    nav a { color: white; margin-right: 1rem; }
    main { display: flex; gap: 1rem; padding: 1rem; }
    article { flex: 3; background: #f0f0f0; padding: 1rem; }
    aside { flex: 1; background: #e0e0e0; padding: 1rem; }
    footer { background: #333; color: white; text-align: center; padding: 1rem; }
  </style>
</head>
<body>
  <!-- Completa la estructura semántica aquí -->
  
</body>
</html>` },
      { id: 2, title: 'Formulario de contacto', desc: 'Crea un formulario con: nombre (text, required), email (email, required), mensaje (textarea) y botón enviar.',
        hint: 'Usa input type="text", type="email", textarea y button type="submit"',
        starter: `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Formulario</title>
  <style>
    body { font-family: Arial; max-width: 500px; margin: 2rem auto; padding: 1rem; }
    label { display: block; margin-top: 1rem; font-weight: bold; }
    input, textarea { width: 100%; padding: .5rem; margin-top: .25rem; border: 1px solid #ccc; border-radius: 4px; }
    button { margin-top: 1rem; padding: .75rem 2rem; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer; }
  </style>
</head>
<body>
  <h1>Contacto</h1>
  <!-- Crea el formulario aquí -->
  
</body>
</html>` },
      { id: 3, title: 'Tabla de datos', desc: 'Crea una tabla con thead, tbody y tfoot. Columnas: Producto, Precio, Stock. Al menos 3 filas de datos y una fila de totales en el footer.',
        hint: 'Usa table > thead > tr > th y tbody > tr > td y tfoot',
        starter: `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Tabla</title>
  <style>
    table { border-collapse: collapse; width: 100%; }
    th, td { border: 1px solid #ddd; padding: .75rem; text-align: left; }
    thead { background: #333; color: white; }
    tfoot { background: #f0f0f0; font-weight: bold; }
    tr:nth-child(even) { background: #f9f9f9; }
  </style>
</head>
<body>
  <!-- Crea la tabla aquí -->
  
</body>
</html>` }
    ]
  },
  xml_editor: {
    title: 'Editor XML con Validación',
    description: 'Escribe documentos XML y valida su estructura básica.',
    type: 'xml',
    exercises: [
      { id: 1, title: 'Catálogo de productos', desc: 'Crea un XML bien formado con un catálogo de al menos 2 productos. Cada producto debe tener: id (atributo), nombre, precio y categoria.',
        hint: 'Recuerda: un elemento raíz, atributos entre comillas, todas las etiquetas cerradas',
        starter: `<?xml version="1.0" encoding="UTF-8"?>
<!-- Catálogo de productos -->
<catalogo>
  <!-- Añade tus productos aquí -->
  
</catalogo>` }
    ]
  },
  h_1: {
    title: 'HTML 1: Estructura Básica',
    description: 'Crea la estructura fundamental de un documento HTML5.',
    type: 'html',
    exercises: [{
      id: 1, title: 'El esqueleto',
      desc: 'Crea un documento con doctype, html, head (con meta charset y title) y body. Dentro del body pon un h1 con "Hola Mundo".',
      hint: 'Usa <!DOCTYPE html>, <html lang="es">...',
      starter: `<!-- Empieza aquí tu documento HTML5 -->
`,
      solution: `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Mi Primera Web</title>
</head>
<body>
  <h1>Hola Mundo</h1>
</body>
</html>`,
      milestones: [
        { id: 'doctype', check: /<!DOCTYPE html>/i, popup: '¡Excelente! El DOCTYPE indica al navegador que usas HTML5.', instruction: 'Escribe la declaración de tipo de documento: <!DOCTYPE html>.' },
        { id: 'html', check: /<html/i, popup: '¡Bien! La etiqueta html es la raíz del documento.', instruction: 'Añade la etiqueta de apertura <html> (puedes incluir el atributo lang="es").' },
        { id: 'head', check: /<head>/i, popup: 'Cabecera detectada. Aquí van los metadatos.', instruction: 'Crea la sección <head> con su etiqueta de apertura y cierre.' },
        { id: 'title', check: /<title>.*<\/title>/i, popup: '¡Título configurado!', instruction: 'Dentro del head, añade un <title> con el nombre de tu página.' },
        { id: 'body', check: /<body>/i, popup: '¡Cuerpo listo! Aquí irá el contenido visible.', instruction: 'Después del </head>, crea la sección <body>.' },
        { id: 'h1', check: /<h1>Hola Mundo<\/h1>/i, popup: '¡Perfecto! Ya tienes tu primer encabezado.', instruction: 'Dentro del body, añade un <h1> que diga "Hola Mundo".' }
      ]
    }]
  },
  h_2: {
    title: 'HTML 2: Títulos y Br/Hr',
    description: 'Usa encabezados y separadores visuales.',
    type: 'html',
    exercises: [{
      id: 1, title: 'Jerarquía',
      desc: 'Pon un h1, un h2, un párrafo con texto, una línea horizontal (<hr>) y otro párrafo con un salto de línea (<br>) en medio.',
      hint: 'Usa <hr> para líneas y <br> para saltos.',
      starter: `<!DOCTYPE html>
<html>
<body>
  <!-- Usa h1, h2, hr y br aquí -->
</body>
</html>`,
      solution: `<!DOCTYPE html>
<html>
<body>
  <h1>Título Principal</h1>
  <h2>Subtítulo</h2>
  <p>Este es el primer párrafo de texto.</p>
  <hr>
  <p>Segundo párrafo con <br> un salto de línea.</p>
</body>
</html>`,
      milestones: [
        { id: 'h1', check: /<h1>/i, popup: '¡Bien! El título principal h1 está listo.', instruction: 'Empieza poniendo un título <h1> para el documento.' },
        { id: 'h2', check: /<h2>/i, popup: 'H2 detectado.', instruction: 'Ahora añade un subtítulo <h2> justo debajo.' },
        { id: 'p', check: /<p>/i, popup: 'Primer párrafo listo.', instruction: 'Escribe un párrafo con texto explicativo.' },
        { id: 'hr', check: /<hr/i, popup: 'Línea horizontal detectada.', instruction: 'Ahora inserta una línea divisoria usando la etiqueta <hr>.' },
        { id: 'br', check: /<br/i, popup: 'Salto de línea detectado.', instruction: 'Finalmente, añade otro párrafo que incluya un salto de línea <br> en medio.' }
      ]
    }]
  },
  h_3: {
    title: 'HTML 3: Formato de Texto',
    description: 'Aplica estilos lógicos y físicos al texto.',
    type: 'html',
    exercises: [{
      id: 1, title: 'Estilos',
      desc: 'Crea un párrafo donde una palabra sea negrita (<b>), otra cursiva (<i>), otra subrayada (<u>) y otra tachada (<s>).',
      hint: 'Usa b, i, u, s.',
      starter: `<!DOCTYPE html>
<html>
<body>
  <p>Este es un texto con <!-- Pon estilo aquí --></p>
</body>
</html>`,
      solution: `<!DOCTYPE html>
<html>
<body>
  <p>Este es un texto con <b>negrita</b>, <i>cursiva</i>, <u>subrayado</u> and <s>tachado</s>.</p>
</body>
</html>`,
      milestones: [
        { id: 'bold', check: /<b>/i, popup: 'Negrita detectada.', instruction: 'Pon una palabra en negrita usando <b>.' },
        { id: 'italic', check: /<i>/i, popup: 'Cursiva detectada.', instruction: 'Pon una palabra en cursiva usando <i>.' },
        { id: 'u', check: /<u>/i, popup: 'Subrayado detectado.', instruction: 'Añade una palabra subrayada con <u>.' },
        { id: 's', check: /<s>/i, popup: 'Tachado detectado.', instruction: 'Finalmente, añade una palabra tachada usando <s>.' }
      ]
    }]
  },
  h_4: {
    title: 'HTML 4: Listas',
    description: 'Crea listas ordenadas y no ordenadas.',
    type: 'html',
    exercises: [{
      id: 1, title: 'La Compra',
      desc: 'Crea una lista no ordenada (ul) con 3 elementos. Luego una lista ordenada (ol) con 2 pasos.',
      hint: 'Usa ul > li y ol > li.',
      starter: `<!DOCTYPE html>
<html>
<body>
  <!-- Crea las listas aquí -->
</body>
</html>`,
      solution: `<!DOCTYPE html>
<html>
<body>
  <ul>
    <li>Elemento 1</li>
    <li>Elemento 2</li>
    <li>Elemento 3</li>
  </ul>
  <ol>
    <li>Paso 1</li>
    <li>Paso 2</li>
  </ol>
</body>
</html>`,
      milestones: [
        { id: 'ul', check: /<ul>/i, popup: 'Lista no ordenada lista.', instruction: 'Crea una lista de puntos usando <ul> y <li>.' },
        { id: 'ol', check: /<ol>/i, popup: 'Lista ordenada lista.', instruction: 'Crea una lista numerada usando <ol> (pasos).' }
      ]
    }]
  },
  h_5: {
    title: 'HTML 5: Enlaces',
    description: 'Navegación interna y externa.',
    type: 'html',
    exercises: [{
      id: 1, title: 'Surfeando',
      desc: 'Crea un enlace a "google.es" que se abra en pestaña nueva. Luego un enlace que baje hasta un id "final" en la página.',
      hint: 'Usa target="_blank" y href="#id".',
      starter: `<!DOCTYPE html>
<html>
<body>
  <!-- Enlaces aquí -->
  <p id="inicio"></p>
  <div style="height:1000px"></div>
  <p id="final">El final</p>
</body>
</html>`,
      solution: `<!DOCTYPE html>
<html>
<body>
  <a href="https://google.es" target="_blank">Google</a>
  <a href="#final">Ir al final</a>
  <p id="inicio"></p>
  <div style="height:1000px"></div>
  <p id="final">El final</p>
</body>
</html>`,
      milestones: [
        { id: 'blank', check: /target="_blank"/i, popup: 'Abrir en pestaña nueva: ¡Correcto!' },
        { id: 'anchor', check: /href="#final"/i, popup: 'Enlace interno detectado.' }
      ]
    }]
  },
  h_6: {
    title: 'HTML 6: Imágenes',
    description: 'Insertar medios visuales.',
    type: 'html',
    exercises: [{
      id: 1, title: 'Foto',
      desc: 'Inserta una imagen (puedes usar https://via.placeholder.com/150) con un texto alternativo (alt) y un tamaño (width) de 100.',
      hint: 'Usa <img src="..." alt="..." width="...">',
      starter: `<!DOCTYPE html>
<html>
<body>
  <!-- Imagen aquí -->
</body>
</html>`,
      solution: `<!DOCTYPE html>
<html>
<body>
  <img src="https://via.placeholder.com/150" alt="Imagen de ejemplo" width="100">
</body>
</html>`,
      milestones: [
        { id: 'alt', check: /alt=/i, popup: '¡Muy bien! El "alt" es vital para la accesibilidad.' },
        { id: 'width', check: /width=/i, popup: 'Tamaño ajustado.' }
      ]
    }]
  },
  h_7: {
    title: 'HTML 7: Tablas',
    description: 'Estructura datos tabulares.',
    type: 'html',
    exercises: [{
      id: 1, title: 'Horario',
      desc: 'Crea una tabla con un borde de 1. Debe tener una fila de cabecera (th) con "Día" y "Materia" y dos filas de datos (td).',
      hint: 'table > tr > th/td',
      starter: `<!DOCTYPE html>
<html>
<body>
  <!-- Tabla aquí -->
</body>
</html>`,
      solution: `<!DOCTYPE html>
<html>
<body>
  <table border="1">
    <tr><th>Día</th><th>Materia</th></tr>
    <tr><td>Lunes</td><td>XML</td></tr>
    <tr><td>Martes</td><td>HTML</td></tr>
  </table>
</body>
</html>`,
      milestones: [
        { id: 'table', check: /<table border="1">/i, popup: 'Tabla iniciada con borde.', instruction: 'Crea la etiqueta <table> con el atributo border="1".' },
        { id: 'th', check: /<th>/i, popup: 'Cabecera detectada.', instruction: 'Añade una fila con encabezados <th>.' },
        { id: 'td', check: /<td>/i, popup: 'Celdas de datos listas.', instruction: 'Completa la tabla con un par de filas de datos usando <td>.' }
      ]
    }]
  },
  h_8: {
    title: 'HTML 8: Div y Span',
    description: 'Contenedores de bloque y línea.',
    type: 'html',
    exercises: [{
      id: 1, title: 'Cajas',
      desc: 'Crea un div con un color de fondo (usando style) y dentro un span con texto en rojo.',
      hint: '<div style="background:yellow"> <span style="color:red">...</span> </div>',
      starter: `<!DOCTYPE html>
<html>
<body>
  <!-- Div y Span aquí -->
</body>
</html>`,
      solution: `<!DOCTYPE html>
<html>
<body>
  <div style="background:yellow">
    <span style="color:red">Texto rojo</span>
  </div>
</body>
</html>`,
      milestones: [
        { id: 'div', check: /<div/i, popup: 'Contenedor de bloque creado.', instruction: 'Crea un elemento <div> con un estilo de fondo.' },
        { id: 'span', check: /<span/i, popup: 'Contenedor de línea creado.', instruction: 'Añade un <span> dentro del div con color de texto rojo.' }
      ]
    }]
  },
  h_9: {
    title: 'HTML 9: Formularios',
    description: 'Captura de datos del usuario.',
    type: 'html',
    exercises: [{
      id: 1, title: 'Registro',
      desc: 'Crea un form con un input de texto para el nombre, un input de email, un textarea para comentarios y un botón de tipo submit.',
      hint: 'input type="text", type="email", textarea, button type="submit"',
      starter: `<!DOCTYPE html>
<html>
<body>
  <!-- Formulario aquí -->
</body>
</html>`,
      solution: `<!DOCTYPE html>
<html>
<body>
  <form>
    <input type="text" placeholder="Nombre">
    <input type="email" placeholder="Email">
    <textarea></textarea>
    <button type="submit">Enviar</button>
  </form>
</body>
</html>`,
      milestones: [
        { id: 'email', check: /type="email"/i, popup: 'Input de email: ¡Correcto!' },
        { id: 'submit', check: /type="submit"/i, popup: 'Botón de envío configurado.' }
      ]
    }]
  },
  h_10: {
    title: 'HTML 10: Página Completa',
    description: 'Integra todo lo aprendido.',
    type: 'html',
    exercises: [{
      id: 1, title: 'Proyecto Final',
      desc: 'Crea una página que tenga: Título (h1), un Imagen, una Lista de 3 cosas, una Tabla de 2x2 y un pequeño Formulario de contacto.',
      hint: 'Es un resumen de todo el PDF de Repaso HTML.',
      starter: `<!DOCTYPE html>
<html>
<body>
  <h1>Mi Proyecto</h1>
  <img src="img.jpg" alt="Foto">
  <ul><li>A</li><li>B</li><li>C</li></ul>
  <table border="1"><tr><td>1</td><td>2</td></tr><tr><td>3</td><td>4</td></tr></table>
  <form><button type="submit">Enviar</button></form>
</body>
</html>`,
      milestones: [
        { id: 'h1', check: /<h1>/i, popup: 'Título listo.', instruction: 'Paso 1: Pon un título h1.' },
        { id: 'img', check: /<img/i, popup: 'Imagen lista.', instruction: 'Paso 2: Inserta una imagen.' },
        { id: 'list', check: /<ul>/i, popup: 'Lista lista.', instruction: 'Paso 3: Crea una lista de 3 elementos.' },
        { id: 'table', check: /<table>/i, popup: 'Tabla lista.', instruction: 'Paso 4: Añade una tabla de 2x2.' },
        { id: 'form', check: /<form/i, popup: 'Formulario listo.', instruction: 'Paso 5: Termina con un formulario de contacto.' }
      ]
    }]
  },
  x_1: {
    title: 'XML 1: Alumno',
    description: 'Crea un XML básico para un alumno.',
    type: 'xml',
    exercises: [{
      id: 1, title: 'Datos del Alumno',
      desc: 'Crea un XML con raíz "alumno" que contenga: nombre, apellidos, edad y ciclo.',
      hint: 'Asegúrate de cerrar todas las etiquetas.',
      starter: `<?xml version="1.0" encoding="UTF-8"?>
<!-- Crea la raíz <alumno> y sus campos aquí -->
`,
      solution: `<?xml version="1.0" encoding="UTF-8"?>
<alumno>
  <nombre>Juan</nombre>
  <apellidos>Pérez</apellidos>
  <edad>20</edad>
  <ciclo>DAW</ciclo>
</alumno>`,
      milestones: [
        { id: 'root', check: /<alumno>/i, popup: 'Raíz <alumno> detectada.', instruction: 'Crea el elemento raíz llamado <alumno>.' },
        { id: 'fields', check: /<nombre>.*<apellidos>.*<edad>.*<ciclo>/si, popup: 'Campos completados.', instruction: 'Añade los elementos hijos: nombre, apellidos, edad y ciclo.' }
      ]
    }]
  },
  x_2: {
    title: 'XML 2: Curso y Módulos',
    description: 'XML con elementos anidados.',
    type: 'xml',
    exercises: [{
      id: 1, title: 'Lista de Módulos',
      desc: 'Crea un XML "curso" con nombre, centro y una lista de "modulos". Cada "modulo" debe tener nombre y horas (mínimo 2 módulos).',
      hint: 'curso > modulos > modulo',
      starter: `<?xml version="1.0" encoding="UTF-8"?>
<!-- Crea la estructura de curso y módulos aquí -->
`,
      solution: `<?xml version="1.0" encoding="UTF-8"?>
<curso>
  <nombre>Desarrollo Web</nombre>
  <centro>Euroformac</centro>
  <modulos>
    <modulo><nombre>HTML</nombre><horas>50</horas></modulo>
    <modulo><nombre>XML</nombre><horas>40</horas></modulo>
  </modulos>
</curso>`,
      milestones: [
        { id: 'root', check: /<curso>/i, popup: 'Raíz <curso> detectada.', instruction: 'Empieza con el elemento raíz <curso>.' },
        { id: 'nested', check: /<modulos>.*<modulo>/si, popup: 'Anidamiento correcto.', instruction: 'Crea una sección <modulos> y dentro define al menos dos elementos <modulo>.' }
      ]
    }]
  },
  x_3: {
    title: 'XML 3: Asociación CSS',
    description: 'Enlazar una hoja de estilos.',
    type: 'xml',
    exercises: [{
      id: 1, title: 'Estilos Externos',
      desc: 'Dado un XML de un libro, añade la instrucción para asociar "estilos.css".',
      hint: 'Usa <?xml-stylesheet ... ?>',
      starter: `<?xml version="1.0" encoding="UTF-8"?>
<libro>
  <titulo>XML Básico</titulo>
</libro>`,
      solution: `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/css" href="estilos.css"?>
<libro>
  <titulo>XML Básico</titulo>
</libro>`,
      milestones: [
        { id: 'css', check: /xml-stylesheet.*href="estilos.css"/i, popup: '¡Correcto! El XML ahora tiene estilo.', instruction: 'Añade la instrucción <?xml-stylesheet ... ?> con el enlace al CSS.' }
      ]
    }]
  },
  x_4: {
    title: 'XML 4: Secciones CDATA',
    description: 'Evitar que XML interprete código.',
    type: 'xml',
    exercises: [{
      id: 1, title: 'Código Literal',
      desc: 'Crea un elemento "codigo" que contenga etiquetas <h1> y <p> usando una sección CDATA.',
      hint: '<![CDATA[ ... ]]>',
      starter: `<?xml version="1.0" encoding="UTF-8"?>
<codigo>
  <!-- Pon el CDATA aquí -->
</codigo>`,
      solution: `<?xml version="1.0" encoding="UTF-8"?>
<codigo>
  <![CDATA[ 
     <h1>Título</h1>
     <p>Párrafo</p>
  ]]>
</codigo>`,
      milestones: [
        { id: 'cdata', check: /<!\[CDATA\[.*<h1>.*<\/codigo>/si, popup: '¡Perfecto! El CDATA protege tu código.', instruction: 'Envuelve las etiquetas HTML en una sección <![CDATA[ ... ]]>' }
      ]
    }]
  },
  d_1: {
    title: 'DTD 1: Persona',
    description: 'Validación básica con DTD interna.',
    type: 'xml',
    exercises: [{
      id: 1, title: 'Persona Estricta',
      desc: 'Crea un XML para "persona" con "nombre" (texto) y "edad" (texto) usando una DTD interna.',
      hint: '<!DOCTYPE persona [ <!ELEMENT ... > ]>',
      starter: `<?xml version="1.0" encoding="UTF-8"?>
<!-- Define la DTD interna y el elemento persona -->
`,
      solution: `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE persona [
  <!ELEMENT persona (nombre, edad)>
  <!ELEMENT name (#PCDATA)>
  <!ELEMENT edad (#PCDATA)>
]>
<persona>
  <nombre>Ana</nombre>
  <edad>25</edad>
</persona>`,
      milestones: [
        { id: 'doctype', check: /<!DOCTYPE persona/i, popup: 'DOCTYPE iniciado.', instruction: 'Define la DTD interna con <!DOCTYPE persona [ ... ].' },
        { id: 'ele_root', check: /<!ELEMENT persona \(nombre, edad\)>/i, popup: 'Elemento raíz definido.', instruction: 'Define el elemento persona con sus hijos nombre y edad.' },
        { id: 'ele_pcdata', check: /<!ELEMENT (nombre|edad) \(#PCDATA\)>/i, popup: 'Tipos de datos definidos.', instruction: 'Define los elementos nombre y edad como (#PCDATA).' }
      ]
    }]
  },
  d_2: {
    title: 'DTD 2: Clase (+)',
    description: 'Uso de cuantificadores en DTD.',
    type: 'xml',
    exercises: [{
      id: 1, title: 'Uno o más Alumnos',
      desc: 'Crea una DTD para "clase" que contenga uno o más elementos "alumno". Cada alumno debe tener un "nombre".',
      hint: 'Usa + para "uno o más".',
      starter: `<?xml version="1.0" encoding="UTF-8"?>
<!-- Define la DTD para clase y alumnos -->
`,
      solution: `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE clase [
  <!ELEMENT clase (alumno+)>
  <!ELEMENT alumno (nombre)>
  <!ELEMENT nombre (#PCDATA)>
]>
<clase>
  <alumno><nombre>Juan</nombre></alumno>
</clase>`,
      milestones: [
        { id: 'doctype', check: /<!DOCTYPE clase/i, popup: 'DOCTYPE iniciado.', instruction: 'Empieza definiendo la DTD interna con <!DOCTYPE clase [ ... ].' },
        { id: 'ele', check: /<!ELEMENT clase \(alumno\+\)>/i, popup: 'Elemento raíz con cuantificador detectado.', instruction: 'Define el elemento clase conteniendo uno o más (+) alumnos.' },
        { id: 'ele2', check: /<!ELEMENT alumno \(nombre\)>/i, popup: 'Hijo definido.', instruction: 'Finalmente, define el elemento alumno conteniedo un nombre.' }
      ]
    }]
  },
  d_3: {
    title: 'DTD 3: Libro (Atributos)',
    description: 'Definición de atributos obligatorios.',
    type: 'xml',
    exercises: [{
      id: 1, title: 'ISBN Requerido',
      desc: 'Crea una DTD para "libro" con un atributo "isbn" que sea obligatorio (#REQUIRED).',
      hint: '<!ATTLIST libro isbn CDATA #REQUIRED>',
      starter: `<?xml version="1.0" encoding="UTF-8"?>
<!-- Define el atributo isbn en la DTD -->
`,
      solution: `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE libro [
  <!ELEMENT libro EMPTY>
  <!ATTLIST libro isbn CDATA #REQUIRED>
]>
<libro isbn="12345"/>`,
      milestones: [
        { id: 'ele', check: /<!ELEMENT libro EMPTY>/i, popup: 'Elemento libro definido.', instruction: 'Paso 1: Define el elemento libro (puedes usar EMPTY si no tiene contenido).' },
        { id: 'attr', check: /<!ATTLIST libro isbn CDATA #REQUIRED>/i, popup: 'Atributo obligatorio listo.', instruction: 'Paso 2: Define la lista de atributos con ATTLIST, marcando el isbn como #REQUIRED.' }
      ]
    }]
  },
  d_4: {
    title: 'DTD 4: Entidades',
    description: 'Reutilización de constantes en XML.',
    type: 'xml',
    exercises: [{
      id: 1, title: 'Entidad Centro',
      desc: 'Define una entidad llamada "centro" con el valor "Euroformac" y úsala dentro del elemento "instituto".',
      hint: '<!ENTITY centro "Euroformac"> ... &centro;',
      starter: `<?xml version="1.0" encoding="UTF-8"?>
<!-- Define la entidad &centro; en la DTD -->
`,
      solution: `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE instituto [
  <!ENTITY centro "Euroformac">
  <!ELEMENT instituto (#PCDATA)>
]>
<instituto>&centro;</instituto>`,
      milestones: [
        { id: 'ent', check: /<!ENTITY centro "Euroformac">/i, popup: 'Entidad definida.', instruction: 'Primero define la entidad: <!ENTITY centro "Euroformac">.' },
        { id: 'use', check: /&centro;/i, popup: 'Entidad utilizada.', instruction: 'Ahora usa la entidad dentro del elemento instituto con &centro;.' }
      ]
    }]
  },
  s_1: {
    title: 'XSD 1: Persona',
    description: 'Esquema básico de secuencia.',
    type: 'xml',
    exercises: [{
      id: 1, title: 'Persona Simple',
      desc: 'Crea un XSD para "persona" con "nombre" (string) y "edad" (integer) en secuencia.',
      hint: 'xs:sequence > xs:element',
      starter: `<?xml version="1.0" encoding="UTF-8"?>
<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema">
  <!-- Define el elemento persona aquí -->
</xs:schema>`,
      solution: `<?xml version="1.0" encoding="UTF-8"?>
<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema">
  <xs:element name="persona">
    <xs:complexType>
      <xs:sequence>
        <xs:element name="nombre" type="xs:string"/>
        <xs:element name="edad" type="xs:integer"/>
      </xs:sequence>
    </xs:complexType>
  </xs:element>
</xs:schema>`,
      milestones: [
        { id: 'seq', check: /xs:sequence/i, popup: 'Secuencia de elementos: ¡OK!', instruction: 'Define una secuencia <xs:sequence> para los elementos hijos.' }
      ]
    }]
  },
  s_2: {
    title: 'XSD 2: Ocurrencias',
    description: 'minOccurs y maxOccurs.',
    type: 'xml',
    exercises: [{
      id: 1, title: 'Alumnos ilimitados',
      desc: 'Define un elemento "alumno" que deba aparecer al menos una vez y sin límite máximo.',
      hint: 'minOccurs="1" maxOccurs="unbounded"',
      starter: `<xs:element name="clase">
  <!-- Define el alumno con minOccurs y maxOccurs -->
</xs:element>`,
      solution: `<xs:element name="clase">
  <xs:complexType><xs:sequence>
    <xs:element name="alumno" minOccurs="1" maxOccurs="unbounded"/>
  </xs:sequence></xs:complexType>
</xs:element>`,
      milestones: [
        { id: 'unbounded', check: /maxOccurs="unbounded"/i, popup: '¡Unbounded! Así se define una lista infinita.', instruction: 'Usa el atributo maxOccurs="unbounded" en el elemento alumno.' }
      ]
    }]
  },
  s_3: {
    title: 'XSD 3: Atributos',
    description: 'Validación de atributos requeridos.',
    type: 'xml',
    exercises: [{
      id: 1, title: 'Atributo ISBN',
      desc: 'Crea un esquema para un libro con un atributo obligatorio "isbn" de tipo string.',
      hint: 'xs:attribute use="required" (va después de xsl:sequence)',
      starter: `<xs:element name="libro">
  <!-- Define el complexType y el atributo isbn -->
</xs:element>`,
      solution: `<xs:element name="libro">
  <xs:complexType>
    <xs:sequence>
      <xs:element name="titulo" type="xs:string"/>
    </xs:sequence>
    <xs:attribute name="isbn" type="xs:string" use="required"/>
  </xs:complexType>
</xs:element>`,
      milestones: [
        { id: 'complex', check: /<xs:complexType>/i, popup: 'Tipo complejo iniciado.', instruction: 'Empieza definiendo el <xs:complexType> para el libro.' },
        { id: 'seq', check: /<xs:sequence>/i, popup: 'Secuencia preparada.', instruction: 'Dentro del complexType, define una <xs:sequence> para los elementos hijos.' },
        { id: 'attr', check: /<xs:attribute name="isbn" type="xs:string" use="required"/i, popup: 'Atributo obligatorio listo.', instruction: 'Finalmente, añade el atributo "isbn" después de cerrar la secuencia.' }
      ]
    }]
  },
  s_4: {
    title: 'XSD 4: Restricciones de Rango',
    description: 'minInclusive y maxInclusive.',
    type: 'xml',
    exercises: [{
      id: 1, title: 'Edad Humana',
      desc: 'Crea un tipo simple para "edad" que admita valores entre 0 y 120.',
      hint: 'xs:restriction base="xs:integer"',
      starter: `<xs:simpleType name="tipoEdad">
  <!-- Define la restricción entre 0 y 120 -->
</xs:simpleType>`,
      solution: `<xs:simpleType name="tipoEdad">
  <xs:restriction base="xs:integer">
    <xs:minInclusive value="0"/>
    <xs:maxInclusive value="120"/>
  </xs:restriction>
</xs:simpleType>`,
      milestones: [
        { id: 'restr', check: /<xs:restriction base="xs:integer">/i, popup: 'Restricción base lista.', instruction: 'Define la restricción con base="xs:integer".' },
        { id: 'min', check: /minInclusive value="0"/i, popup: 'Mínimo configurado.', instruction: 'Añade el valor mínimo (0) con minInclusive.' },
        { id: 'max', check: /maxInclusive value="120"/i, popup: 'Máximo configurado.', instruction: 'Añade el valor máximo (120) con maxInclusive.' }
      ]
    }]
  },
  s_5: {
    title: 'XSD 5: Choice',
    description: 'Elegir uno entre varios elementos.',
    type: 'xml',
    exercises: [{
      id: 1, title: 'Email o Username',
      desc: 'Crea un esquema donde el usuario deba elegir entre proporcionar un "email" o un "nick", pero no ambos.',
      hint: 'xs:choice',
      starter: `<xs:element name="registro">
  <!-- Usa xs:choice para email o nick -->
</xs:element>`,
      solution: `<xs:element name="registro">
  <xs:complexType>
    <xs:choice>
      <xs:element name="email" type="xs:string"/>
      <xs:element name="nick" type="xs:string"/>
    </xs:choice>
  </xs:complexType>
</xs:element>`,
      milestones: [
        { id: 'choice', check: /xs:choice/i, popup: 'Uso de or-exclusivo (choice) detectado.', instruction: 'Usa la etiqueta <xs:choice> para permitir elegir entre email o nick.' }
      ]
    }]
  },
  s_6: {
    title: 'XSD 6: DNI Pattern',
    description: 'Expresiones regulares en XSD.',
    type: 'xml',
    exercises: [{
      id: 1, title: 'DNI Español',
      desc: 'Crea un patrón para validar 8 números seguidos de una letra mayúscula.',
      hint: '[0-9]{8}[A-Z]',
      starter: `<!-- Pattern para 8 números y 1 letra -->
<xs:pattern value=""/>`,
      solution: `<xs:pattern value="[0-9]{8}[A-Z]"/>`,
      milestones: [
        { id: 'pattern', check: /\[0-9\]\{8\}\[A-Z\]/, popup: '¡Regex de DNI correcto!', instruction: 'Define el patrón value="[0-9]{8}[A-Z]" dentro de xs:pattern.' }
      ]
    }]
  },
  s_7: {
    title: 'XSD 7: Enum A-D',
    description: 'Lista cerrada de valores permitidos.',
    type: 'xml',
    exercises: [{
      id: 1, title: 'Categorías Fijas',
      desc: 'Crea un tipo para "categoria" que solo acepte A, B, C o D.',
      hint: 'xs:enumeration',
      starter: `<xs:simpleType name="tipoCat">
  <!-- Enumeración A, B, C, D -->
</xs:simpleType>`,
      solution: `<xs:simpleType name="tipoCat">
  <xs:restriction base="xs:string">
    <xs:enumeration value="A"/>
    <xs:enumeration value="B"/>
    <xs:enumeration value="C"/>
    <xs:enumeration value="D"/>
  </xs:restriction>
</xs:simpleType>`,
      milestones: [
        { id: 'enum', check: /enumeration value="D"/i, popup: '¡Todas las opciones incluidas!', instruction: 'Añade los elementos <xs:enumeration> para cada una de las letras A, B, C y D.' }
      ]
    }]
  },
  s_8: {
    title: 'XSD 8: Usuario Full',
    description: 'Combinación de minLength y Pattern.',
    type: 'xml',
    exercises: [{
      id: 1, title: 'Usuario Robusto',
      desc: 'Crea un tipo para nick entre 5 y 12 caracteres, solo letras minúsculas y números.',
      hint: 'minLength, maxLength y pattern.',
      starter: `<xs:restriction base="xs:string">
  <!-- minLength 5, maxLength 12, pattern [a-z0-9]+ -->
</xs:restriction>`,
      solution: `<xs:restriction base="xs:string">
  <xs:minLength value="5"/>
  <xs:maxLength value="12"/>
  <xs:pattern value="[a-z0-9]+"/>
</xs:restriction>`,
      milestones: [
        { id: 'mixed', check: /minLength.*maxLength.*pattern/si, popup: '¡Increíble! Has cubierto todas las restricciones.', instruction: 'Añade las restricciones minLength="5", maxLength="12" y el patrón [a-z0-9]+.' }
      ]
    }]
  },
  s_9: {
    title: 'XSD 9: Pattern AB123',
    description: 'Patrones específicos de negocio.',
    type: 'xml',
    exercises: [{
      id: 1, title: 'Código de Producto',
      desc: 'Crea un patrón para un código que empiece por 2 mayúsculas y siga con 3 números (ej: AB123).',
      hint: '[A-Z]{2}[0-9]{3}',
      starter: `<!-- Pattern AB123 -->
<xs:pattern value=""/>`,
      solution: `<xs:pattern value="[A-Z]{2}[0-9]{3}"/>`,
      milestones: [
        { id: 'p2', check: /\[A-Z\]\{2\}\[0-9\]\{3\}/, popup: '¡Código de producto validado!', instruction: 'Crea el patrón para que empiece por 2 mayúsculas y siga con 3 números.' }
      ]
    }]
  },
  s_10: {
    title: 'XSD 10: Tienda Completa',
    description: 'Integración avanzada de XSD.',
    type: 'xml',
    exercises: [{
      id: 1, title: 'Esquema de Tienda',
      desc: 'Crea un esquema para "tienda" > "producto" con nombre, precio (decimal), iva (4, 10, 21) y categoria (A, B, C).',
      hint: 'Es una mezcla de enumeraciones y tipos simples.',
      starter: `<?xml version="1.0" encoding="UTF-8"?>
<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema">
  <!-- Tienda completa -->
</xs:schema>`,
      solution: `<?xml version="1.0" encoding="UTF-8"?>
<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema">
  <xs:element name="tienda">
    <xs:complexType>
      <xs:sequence>
        <xs:element name="producto" maxOccurs="unbounded">
          <xs:complexType>
            <xs:sequence>
              <xs:element name="nombre" type="xs:string"/>
              <xs:element name="precio" type="xs:decimal"/>
              <xs:element name="iva">
                <xs:simpleType><xs:restriction base="xs:integer">
                  <xs:enumeration value="4"/><xs:enumeration value="10"/><xs:enumeration value="21"/>
                </xs:restriction></xs:simpleType>
              </xs:element>
            </xs:sequence>
          </xs:complexType>
        </xs:element>
      </xs:sequence>
    </xs:complexType>
  </xs:element>
</xs:schema>`,
      milestones: [
        { id: 'full', check: /decimal.*enumeration.*enumeration/si, popup: '¡Nivel avanzado alcanzado!', instruction: 'Completa todo el esquema definiendo la secuencia de productos y sus tipos internos.' }
      ]
    }]
  },
  sl_1: {
    title: 'XSLT 1: Básicos',
    description: 'La estructura de una hoja de estilos.',
    type: 'xslt',
    exercises: [{
      id: 1, title: 'Stylesheet',
      desc: 'Crea la estructura básica de XSLT con xsl:stylesheet y un xsl:template que matchee la raíz.',
      hint: '<xsl:stylesheet ...> <xsl:template match="/">',
      starter: `<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:template match="/">
    <!-- Escribe aquí -->
  </xsl:template>
</xsl:stylesheet>`,
      solution: `<!-- XML DE ORIGEN:
<biblioteca>
  <libro><titulo>Don Quijote</titulo></libro>
</biblioteca>
-->
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:template match="/">
    <html><body></body></html>
  </xsl:template>
</xsl:stylesheet>`,
      milestones: [
        { id: 'xslt', check: /xsl:stylesheet/i, popup: 'Hoja de estilos iniciada.', instruction: 'Define la hoja de estilos con <xsl:stylesheet version="1.0" ...>.' },
        { id: 'match', check: /match="\/"/i, popup: 'Template raíz creado.', instruction: 'Crea un <xsl:template match="/"> para procesar el documento desde la raíz.' }
      ]
    }]
  },
  sl_2: {
    title: 'XSLT 2: For-each',
    description: 'Iterar sobre conjuntos de nodos.',
    type: 'xslt',
    exercises: [{
      id: 1, title: 'Lista de Nombres',
      desc: 'Usa xsl:for-each para recorrer todos los "libro" y mostrar su "titulo".',
      hint: '<xsl:for-each select="//libro">',
      starter: `<xsl:template match="/">
  <!-- Recorre todos los libros y muestra su título -->
</xsl:template>`,
      solution: `<!-- XML: <biblioteca><libro><titulo>...</titulo></libro></biblioteca> -->
<xsl:template match="/">
  <xsl:for-each select="//libro">
    <p><xsl:value-of select="titulo"/></p>
  </xsl:for-each>
</xsl:template>`,
      milestones: [
        { id: 'fe', check: /xsl:for-each/i, popup: 'Bucle for-each listo.', instruction: 'Usa <xsl:for-each select="//libro"> para recorrer todos los libros.' },
        { id: 'vo', check: /xsl:value-of/i, popup: 'Valor extraído.', instruction: 'Dentro del bucle, usa <xsl:value-of select="titulo"/> para mostrar el nombre.' }
      ]
    }]
  },
  sl_3: {
    title: 'XSLT 3: Filtro XPath',
    description: 'Filtrado en tiempo de transformación.',
    type: 'xslt',
    exercises: [{
      id: 1, title: 'Libros de Informática',
      desc: 'Muestra solo los títulos de los libros cuya categoría sea "Informática".',
      hint: 'select="//libro[categoria=\'Informática\']"',
      starter: `<xsl:template match="/">
  <!-- Muestra títulos de libros de Informática -->
</xsl:template>`,
      solution: `<xsl:template match="/">
  <xsl:for-each select="//libro[categoria='Informática']">
    <p><xsl:value-of select="titulo"/></p>
  </xsl:for-each>
</xsl:template>`,
      milestones: [
        { id: 'filt', check: /\[categoria='Informática'\]/i, popup: 'Filtro XPath aplicado.', instruction: 'Añade el filtro [categoria=\'Informática\'] al select del for-each.' }
      ]
    }]
  },
  sl_4: {
    title: 'XSLT 4: Sort',
    description: 'Ordenación de resultados.',
    type: 'xslt',
    exercises: [{
      id: 1, title: 'Ordenados por Precio',
      desc: 'Usa xsl:sort dentro de for-each para ordenar por precio de menor a mayor.',
      hint: '<xsl:sort select="precio" order="ascending"/>',
      starter: `<xsl:template match="/">
  <!-- Ordena por precio y muestra el título -->
</xsl:template>`,
      solution: `<xsl:template match="/">
  <xsl:for-each select="//libro">
    <xsl:sort select="precio" order="ascending"/>
    <p><xsl:value-of select="titulo"/></p>
  </xsl:for-each>
</xsl:template>`,
      milestones: [
        { id: 'fe', check: /xsl:for-each/i, popup: 'Bucle iniciado.', instruction: 'Crea un <xsl:for-each> para recorrer los elementos.' },
        { id: 'sort', check: /xsl:sort/i, popup: 'Ordenación configurada.', instruction: 'Dentro del for-each, añade <xsl:sort select="precio"/>.' },
        { id: 'vo', check: /xsl:value-of/i, popup: 'Valor extraído.', instruction: 'Usa <xsl:value-of> para mostrar el resultado ordenado.' }
      ]
    }]
  },
  sl_5: {
    title: 'XSLT 5: Formato de Texto Especial',
    description: 'Usa xsl:text para dar formato a la salida.',
    type: 'xslt',
    exercises: [{
      hint: 'Usa <xsl:text> - </xsl:text> y <xsl:text>€</xsl:text>',
      starter: `<xsl:template match="/">
  <!-- Usa xsl:text para el formato "nombre - precio€" -->
</xsl:template>`,
      solution: `<!-- XML: <tienda><producto><nombre>HP</nombre><precio>500</precio></producto></tienda> -->
<xsl:template match="/">
  <xsl:for-each select="//producto">
    <xsl:value-of select="nombre"/>
    <xsl:text> - </xsl:text>
    <xsl:value-of select="precio"/>
    <xsl:text>€</xsl:text>
  </xsl:for-each>
</xsl:template>`,
      milestones: [
        { id: 'text', check: /xsl:text/i, popup: '¡Bien! xsl:text es ideal para espacios y símbolos.', instruction: 'Usa <xsl:text> para añadir el guión y el símbolo del euro.' }
      ]
    }]
  },
  sl_6: {
    title: 'XSLT 6: Listas HTML',
    description: 'Genera una lista no ordenada (ul).',
    type: 'xslt',
    exercises: [{
      hint: '<ul> <xsl:for-each ...> <li>...</li> </xsl:for-each> </ul>',
      starter: `<xsl:template match="/">
  <!-- Genera un lista <ul> con los nombres -->
</xsl:template>`,
      solution: `<!-- XML: <tienda><producto><nombre>Monitor</nombre></producto></tienda> -->
<xsl:template match="/">
  <ul>
    <xsl:for-each select="//producto">
      <li><xsl:value-of select="nombre"/></li>
    </xsl:for-each>
  </ul>
</xsl:template>`,
      milestones: [
        { id: 'li', check: /<li>/i, popup: '¡Estructura de lista detectada!', instruction: 'Envuelve el nombre de cada producto en una etiqueta <li>.' }
      ]
    }]
  },
  sl_7: {
    title: 'XSLT 7: Tablas HTML Completas',
    description: 'Genera una tabla con cabecera y datos.',
    type: 'xslt',
    exercises: [{
      hint: 'tr > th para cabeceras, tr > td para datos.',
      starter: `<xsl:template match="/">
  <!-- Genera una <table> con Nombre y Marca -->
</xsl:template>`,
      solution: `<!-- XML: <tienda><producto><nombre>...</nombre><marca>...</marca></producto></tienda> -->
<xsl:template match="/">
  <table border="1">
    <tr><th>Nombre</th><th>Marca</th></tr>
    <xsl:for-each select="//producto">
      <tr><td><xsl:value-of select="nombre"/></td><td><xsl:value-of select="marca"/></td></tr>
    </xsl:for-each>
  </table>
</xsl:template>`,
      milestones: [
        { id: 'table', check: /<table/i, popup: 'Tabla iniciada.', instruction: 'Empieza creando la estructura de la tabla con <table>.' },
        { id: 'th', check: /<th>/i, popup: 'Cabecera detectada.', instruction: 'Crea una fila de cabecera usando <tr> y <th>.' },
        { id: 'td', check: /<td>/i, popup: 'Celdas de datos preparadas.', instruction: 'Ahora añade las celdas de datos con <td> dentro de un for-each.' }
      ]
    }]
  },
  sl_8: {
    title: 'XSLT 8: Filtro por Marca',
    description: 'Uso de predicados XPath en xsl:for-each.',
    type: 'xslt',
    exercises: [{
      id: 1, title: 'Solo Logitech',
      desc: 'Muestra solo los nombres de los productos cuya marca sea Logitech.',
      hint: 'select="tienda/producto[marca=\'Logitech\']"',
      starter: `<xsl:template match="/">
  <!-- Filtra por marca Logitech -->
</xsl:template>`,
      solution: `<!-- XML: <tienda><producto><nombre>...</nombre><marca>Logitech</marca></producto></tienda> -->
<xsl:template match="/">
  <xsl:for-each select="//producto[marca='Logitech']">
    <p><xsl:value-of select="nombre"/></p>
  </xsl:for-each>
</xsl:template>`,
      milestones: [
        { id: 'fe', check: /xsl:for-each/i, popup: 'Bucle for-each iniciado.', instruction: 'Usa <xsl:for-each> para recorrer los productos.' },
        { id: 'filter', check: /\[marca='Logitech'\]/i, popup: '¡Filtro de marca aplicado!', instruction: 'Añade el filtro [marca=\'Logitech\'] al select del for-each.' }
      ]
    }]
  },
  sl_9: {
    title: 'XSLT 9: Filtro por Precio',
    description: 'Filtrado numérico en XPath.',
    type: 'xslt',
    exercises: [{
      hint: 'select="tienda/producto[precio > 50]" (recuerda usar &gt; si es necesario)',
      starter: `<xsl:template match="/">
  <!-- Filtra productos con precio > 50 -->
</xsl:template>`,
      solution: `<!-- XML: <tienda><producto><precio>60</precio></producto></tienda> -->
<xsl:template match="/">
  <xsl:for-each select="//producto[precio > 50]">
    <p><xsl:value-of select="precio"/></p>
  </xsl:for-each>
</xsl:template>`,
      milestones: [
        { id: 'fe', check: /xsl:for-each/i, popup: 'Bucle for-each iniciado.', instruction: 'Usa <xsl:for-each> para recorrer los productos.' },
        { id: 'price', check: /precio\s*(&gt;|>)\s*50/i, popup: '¡Filtro de precio aplicado!', instruction: 'Añade el filtro [precio > 50] al select del for-each.' }
      ]
    }]
  },
  sl_10: {
    title: 'XSLT 10: Ordenación Ascendente',
    description: 'Uso de xsl:sort.',
    type: 'xslt',
    exercises: [{
      id: 1, title: 'De menor a mayor',
      desc: 'Ordena los productos por precio de forma ascendente.',
      hint: '<xsl:sort select="precio" data-type="number" order="ascending"/>',
      starter: `<xsl:template match="/">
  <!-- Ordena por precio (ascendente) -->
</xsl:template>`,
      solution: `<!-- XML: <tienda><producto><precio>10</precio></producto><producto><precio>5</precio></producto></tienda> -->
<xsl:template match="/">
  <xsl:for-each select="//producto">
    <xsl:sort select="precio" order="ascending"/>
    <p><xsl:value-of select="precio"/></p>
  </xsl:for-each>
</xsl:template>`,
      milestones: [
        { id: 'fe', check: /xsl:for-each/i, popup: 'Bucle for-each iniciado.', instruction: 'Crea el for-each para los productos.' },
        { id: 'sort', check: /order="ascending"/i, popup: 'Ordenación ascendente lista.', instruction: 'Añade <xsl:sort select="precio" order="ascending"/> dentro del bucle.' }
      ]
    }]
  },
  sl_11: {
    title: 'XSLT 11: Ordenación Descendente',
    description: 'Invertir el orden con xsl:sort.',
    type: 'xslt',
    exercises: [{
      id: 1, title: 'De mayor a menor',
      desc: 'Ordena los productos por precio de forma descendente.',
      hint: '<xsl:sort select="precio" data-type="number" order="descending"/>',
      starter: `<xsl:template match="/">
  <!-- Ordena por precio (descendente) -->
</xsl:template>`,
      solution: `<!-- XML: <tienda><producto><precio>10</precio></producto><producto><precio>5</precio></producto></tienda> -->
<xsl:template match="/">
  <xsl:for-each select="//producto">
    <xsl:sort select="precio" order="descending"/>
    <p><xsl:value-of select="precio"/></p>
  </xsl:for-each>
</xsl:template>`,
      milestones: [
        { id: 'fe', check: /xsl:for-each/i, popup: 'Bucle for-each iniciado.', instruction: 'Crea el for-each para los productos.' },
        { id: 'desc', check: /order="descending"/i, popup: 'Ordenación descendente lista.', instruction: 'Añade <xsl:sort select="precio" order="descending"/> dentro del bucle.' }
      ]
    }]
  },
  sl_12: {
    title: 'XSLT 12: Condición xsl:if',
    description: 'Lógica condicional dentro del bucle.',
    type: 'xslt',
    exercises: [{
      id: 1, title: 'Control de Stock',
      desc: 'Muestra el nombre solo si el stock es mayor que 20.',
      hint: '<xsl:if test="stock > 20">',
      starter: `<xsl:template match="/">
  <!-- Usa xsl:if para mostrar stock > 20 -->
</xsl:template>`,
      solution: `<!-- XML: <tienda><producto><nombre>HP</nombre><stock>25</stock></producto></tienda> -->
<xsl:template match="/">
  <xsl:for-each select="//producto">
    <xsl:if test="stock > 20">
      <p><xsl:value-of select="nombre"/></p>
    </xsl:if>
  </xsl:for-each>
</xsl:template>`,
      milestones: [
        { id: 'if', check: /xsl:if/i, popup: 'Condición if detectada.', instruction: 'Usa la etiqueta <xsl:if> para el control de stock.' },
        { id: 'test', check: /test="stock\s*(&gt;|>)\s*20"/i, popup: 'Atributo test configurado.', instruction: 'Añade el atributo test="stock > 20" al xsl:if.' }
      ]
    }]
  },
  q_1: {
    title: 'XQuery 1: Títulos',
    description: 'Obtener los nombres de todos los libros.',
    type: 'xquery',
    exercises: [{
      id: 1, title: 'Todos los Títulos',
      desc: 'Muestra los títulos de todos los libros de la biblioteca.',
      hint: 'for $l in //libro return $l/titulo',
      starter: `(: XML de la biblioteca :)
<biblioteca>
  <libro>
    <titulo>Aprende XML</titulo>
    <autor>Ana Ruiz</autor>
    <categoria>Informática</categoria>
    <precio>28</precio>
    <stock>12</stock>
  </libro>
  <libro>
    <titulo>XQuery desde cero</titulo>
    <autor>Luis Pérez</autor>
    <categoria>Informática</categoria>
    <precio>35</precio>
    <stock>7</stock>
  </libro>
  <libro>
    <titulo>Historia de Roma</titulo>
    <autor>Clara Gómez</autor>
    <categoria>Historia</categoria>
    <precio>22</precio>
    <stock>20</stock>
  </libro>
  <libro>
    <titulo>CSS práctico</titulo>
    <autor>Marta León</autor>
    <categoria>Informática</categoria>
    <precio>18</precio>
    <stock>4</stock>
  </libro>
  <libro>
    <titulo>Arte medieval</titulo>
    <autor>Pedro Sanz</autor>
    <categoria>Arte</categoria>
    <precio>40</precio>
    <stock>3</stock>
  </libro>
</biblioteca>

(: Escribe tu consulta FLWOR aquí :)
`,
      solution: `for $l in //libro
return $l/titulo`,
      milestones: [
        { id: 'q1', check: /(for.*return.*titulo|\/\/libro\/titulo)/i, popup: '¡Exacto! XPath o FLWOR detectado.', instruction: 'Extrae los títulos de todos los libros.', hint: 'for $l in //libro return $l/titulo' }
      ]
    }]
  },
  q_2: {
    title: 'XQuery 2: Título y Autor',
    description: 'Extracción de múltiples campos.',
    type: 'xquery',
    exercises: [{
      id: 1, title: 'Libro XML',
      desc: 'Muestra el título y el autor de cada libro envueltos en un nuevo nodo <libro>.',
      hint: 'return <libro>{$l/titulo}{$l/autor}</libro>',
      starter: `(: Escribe tu consulta aquí :)
`,
      solution: `for $l in //libro
return <libro>{$l/titulo}{$l/autor}</libro>`,
      milestones: [
        { id: 'libro', check: /return\s+<libro>.*titulo.*autor/si, popup: 'Estructura <libro> OK.', instruction: 'Crea el nodo <libro> que envuelva el título y el autor.' }
      ]
    }]
  },
  q_3: {
    title: 'XQuery 3: Informática',
    description: 'Filtrado por categoría.',
    type: 'xquery',
    exercises: [{
      id: 1, title: 'Solo Informática',
      desc: 'Muestra los títulos de los libros de la categoría "Informática".',
      hint: 'where $l/categoria = "Informática"',
      starter: `(: Escribe tu consulta aquí :)
`,
      solution: `for $l in //libro
where $l/categoria = "Informática"
return $l/titulo`,
      milestones: [
        { id: 'it', check: /categoria\s*=\s*(['"])Informática\1/i, popup: 'Filtro de categoría OK.', instruction: 'Añade la condición where para filtrar por la categoría "Informática".' }
      ]
    }]
  },
  q_4: {
    title: 'XQuery 4: Precio > 25',
    description: 'Filtrado numérico.',
    type: 'xquery',
    exercises: [{
      id: 1, title: 'Libros Caros',
      desc: 'Muestra los títulos de los libros con precio superior a 25 euros.',
      hint: 'where $l/precio > 25',
      starter: `(: Escribe tu consulta aquí :)
`,
      solution: `for $l in //libro
where $l/precio > 25
return $l/titulo`,
      milestones: [
        { id: 'price', check: /precio\s*>\s*25/i, popup: 'Filtro de precio OK.', instruction: 'Filtra los libros cuyo precio sea mayor que 25.' }
      ]
    }]
  },
  q_5: {
    title: 'XQuery 5: Orden Ascendente',
    description: 'Uso de order by.',
    type: 'xquery',
    exercises: [{
      id: 1, title: 'Orden por Precio',
      desc: 'Muestra los títulos de los libros ordenados por precio (de menor a mayor).',
      hint: 'order by $l/precio',
      starter: `(: Escribe tu consulta aquí :)
`,
      solution: `for $l in //libro
order by $l/precio
return $l/titulo`,
      milestones: [
        { id: 'order', check: /order by\s+\$l\/precio/i, popup: 'Ordenación ascendente OK.', instruction: 'Añade la cláusula order by para ordenar por el campo precio.' }
      ]
    }]
  },
  q_6: {
    title: 'XQuery 6: Orden Descendente',
    description: 'Uso de descending.',
    type: 'xquery',
    exercises: [{
      id: 1, title: 'Orden Inverso',
      desc: 'Muestra los títulos de los libros ordenados por precio (de mayor a menor).',
      hint: 'order by $l/precio descending',
      starter: `(: Escribe tu consulta aquí :)
`,
      solution: `for $l in //libro
order by $l/precio descending
return $l/titulo`,
      milestones: [
        { id: 'desc', check: /descending/i, popup: 'Ordenación descendente OK.' }
      ]
    }]
  },
  q_7: {
    title: 'XQuery 7: Primer Libro',
    description: 'Uso de índices.',
    type: 'xquery',
    exercises: [{
      id: 1, title: 'El Primero',
      desc: 'Muestra el título del primer libro del documento.',
      hint: '(//libro)[1]/titulo',
      starter: `(: Escribe tu consulta aquí :)
`,
      solution: `(//libro)[1]/titulo`,
      milestones: [
        { id: 'idx', check: /\[1\]/i, popup: 'Acceso por índice OK.', instruction: 'Usa el índice [1] para seleccionar solo el primer libro.' }
      ]
    }]
  },
  q_8: {
    title: 'XQuery 8: Último Libro',
    description: 'Uso de last().',
    type: 'xquery',
    exercises: [{
      id: 1, title: 'El Último',
      desc: 'Muestra el título del último libro del documento.',
      hint: '(//libro)[last()]/titulo',
      starter: `(: Escribe tu consulta aquí :)
`,
      solution: `(//libro)[last()]/titulo`,
      milestones: [
        { id: 'last', check: /last\(\)/i, popup: 'Función last() OK.', instruction: 'Usa la función last() dentro del índice para obtener el último elemento.' }
      ]
    }]
  },
  q_9: {
    title: 'XQuery 9: Conteo Total',
    description: 'Uso de count().',
    type: 'xquery',
    exercises: [{
      id: 1, title: '¿Cuántos libros hay?',
      desc: 'Muestra el número total de libros en la biblioteca.',
      hint: 'count(//libro)',
      starter: `(: Escribe tu consulta aquí :)
`,
      solution: `count(//libro)`,
      milestones: [
        { id: 'count', check: /count\(/i, popup: 'Conteo total OK.', instruction: 'Usa la función count() para contar el número de nodos libro.' }
      ]
    }]
  },
  q_10: {
    title: 'XQuery 10: Stock Bajo',
    description: 'Filtrado por cantidad.',
    type: 'xquery',
    exercises: [{
      id: 1, title: 'Poco Stock',
      desc: 'Muestra los títulos de los libros con menos de 5 unidades en stock.',
      hint: 'where $l/stock < 5',
      starter: `(: Escribe tu consulta aquí :)
`,
      solution: `for $l in //libro
where $l/stock < 5
return $l/titulo`,
      milestones: [
        { id: 'stock', check: /stock\s*<\s*5/i, popup: 'Filtro de stock OK.', instruction: 'Añade una condición where para filtrar por stock < 5.' }
      ]
    }]
  },
  q_11: {
    title: 'XQuery 11: Videojuegos (Extra)',
    description: 'Consulta sobre una colección de juegos.',
    type: 'xquery',
    exercises: [{
      id: 1, title: 'Títulos de Juegos',
      desc: 'Muestra los títulos de todos los videojuegos.',
      hint: 'for $j in //juego return $j/titulo',
      starter: `(: Escribe tu consulta aquí :)
`,
      solution: `for $j in //juego
return $j/titulo`,
      milestones: [
        { id: 'for', check: /for\s+\$j\s+in/i, popup: 'Bucle FOR OK.' },
        { id: 'ret', check: /return\s+\$j\/titulo/i, popup: 'Retorno de título OK.' }
      ]
    }]
  },
  q_12: {
    title: 'XQuery Tienda 1: Productos',
    description: 'Listado simple de tienda.',
    type: 'xquery',
    exercises: [{
      id: 1, title: 'Nombres de Productos',
      desc: 'Muestra los nombres de todos los productos de la tienda.',
      hint: 'for $p in //producto return $p/nombre',
      starter: `(: Escribe tu consulta aquí :)
`,
      solution: `for $p in //producto
return $p/nombre`,
      milestones: [
        { id: 'prod', check: /(for.*return.*nombre|\/\/producto\/nombre)/i, popup: 'Productos detectados.', instruction: 'Selecciona el nombre de cada producto.' }
      ]
    }]
  },
  q_13: {
    title: 'XQuery Tienda 2: Formato XML',
    description: 'Generación de etiquetas personalizadas.',
    type: 'xquery',
    exercises: [{
      id: 1, title: 'Producto y Precio',
      desc: 'Muestra el nombre y el precio de cada producto envueltos en un nodo <item>.',
      hint: 'return <item>{$p/nombre}{$p/precio}</item>',
      starter: `(: Escribe tu consulta aquí :)
`,
      solution: `for $p in //producto
return <item>{$p/nombre}{$p/precio}</item>`,
      milestones: [
        { id: 'wrap', check: /return\s+<item>.*nombre.*precio/si, popup: 'Estructura <item> OK.', instruction: 'Crea el nodo <item> y pon dentro el nombre y el precio.' }
      ]
    }]
  },
  q_14: {
    title: 'XQuery Tienda 3: Precio > 50',
    description: 'Filtro numérico hardware.',
    type: 'xquery',
    exercises: [{
      id: 1, title: 'Productos Caros',
      desc: 'Muestra los nombres de los productos con un precio superior a 50 euros.',
      hint: 'where $p/precio > 50',
      starter: `(: Escribe tu consulta aquí :)
`,
      solution: `for $p in //producto
where $p/precio > 50
return $p/nombre`,
      milestones: [
        { id: 'price', check: /precio\s*>\s*50/i, popup: 'Filtro de precio OK.', instruction: 'Filtra los productos con precio > 50.' }
      ]
    }]
  },
  q_15: {
    title: 'XQuery Tienda 4: Marca Logitech',
    description: 'Filtrado por texto de marca.',
    type: 'xquery',
    exercises: [{
      id: 1, title: 'Solo Logitech',
      desc: 'Muestra los nombres de los productos cuya marca sea "Logitech".',
      hint: 'where $p/marca = "Logitech"',
      starter: `(: Escribe tu consulta aquí :)
`,
      solution: `for $p in //producto
where $p/marca = "Logitech"
return $p/nombre`,
      milestones: [
        { id: 'brand', check: /marca\s*=\s*(['"])Logitech\1/i, popup: 'Filtro de marca OK.', instruction: "Añade el filtro where para la marca 'Logitech'." }
      ]
    }]
  },
  q_16: {
    title: 'XQuery Tienda 5: Orden Ascendente',
    description: 'Uso de order by en tienda.',
    type: 'xquery',
    exercises: [{
      id: 1, title: 'Orden por Precio',
      desc: 'Muestra los nombres de los productos ordenados por precio (de menor a mayor).',
      hint: 'order by $p/precio',
      starter: `(: Escribe tu consulta aquí :)
`,
      solution: `for $p in //producto
order by $p/precio
return $p/nombre`,
      milestones: [
        { id: 'order', check: /order by\s+\$p\/precio/i, popup: 'Ordenación ascendente OK.', instruction: 'Ordena el resultado por precio de forma ascendente.' }
      ]
    }]
  },
  q_17: {
    title: 'XQuery Tienda 6: Orden Descendente',
    description: 'Uso de descending en hardware.',
    type: 'xquery',
    exercises: [{
      id: 1, title: 'Orden Inverso',
      desc: 'Muestra los nombres de los productos ordenados por precio (de mayor a menor).',
      hint: 'order by $p/precio descending',
      starter: `(: Escribe tu consulta aquí :)
`,
      solution: `for $p in //producto
order by $p/precio descending
return $p/nombre`,
      milestones: [
        { id: 'desc', check: /descending/i, popup: 'Ordenación descendente OK.' }
      ]
    }]
  },
  q_18: {
    title: 'XQuery Tienda 7: Inventario',
    description: 'Generación de resumen de stock.',
    type: 'xquery',
    exercises: [{
      id: 1, title: 'Nombre y Stock',
      desc: 'Muestra el nombre y el stock de cada producto en un nuevo nodo <inventario>.',
      hint: 'return <inventario>{$p/nombre}{$p/stock}</inventario>',
      starter: `(: Escribe tu consulta aquí :)
`,
      solution: `for $p in //producto
return <inventario>{$p/nombre}{$p/stock}</inventario>`,
      milestones: [
        { id: 'stock', check: /return\s+<inventario>.*nombre.*stock/si, popup: 'Estructura <inventario> OK.', instruction: 'Crea el nodo <inventario> con el nombre y el stock del producto.' }
      ]
    }]
  },
  q_19: {
    title: 'XQuery Extra: Videojuegos',
    description: 'Consulta básica sobre una colección de juegos.',
    type: 'xquery',
    exercises: [{
      id: 1, title: 'Títulos de Juegos',
      desc: 'Muestra los títulos de todos los videojuegos.',
      hint: 'for $j in //juego return $j/titulo',
      starter: `<videojuegos>
 <juego>
  <titulo>FIFA 25</titulo>
  <plataforma>PS5</plataforma>
  <precio>70</precio>
 </juego>
 <juego>
  <titulo>Minecraft</titulo>
  <plataforma>PC</plataforma>
  <precio>30</precio>
 </juego>
 <juego>
  <titulo>Zelda</titulo>
  <plataforma>Switch</plataforma>
  <precio>60</precio>
 </juego>
</videojuegos>`,
      milestones: [
        { id: 'for', check: /for\s+\$j\s+in/i, popup: 'Bucle FOR OK.', instruction: 'Empieza con un bucle for $j in //juego.' },
        { id: 'ret', check: /return\s+\$j\/titulo/i, popup: 'Retorno de título OK.', instruction: 'Devuelve el nodo título de cada juego.' }
      ]
    }]
  },
  q_20: {
    title: 'XQuery Extra 2: Academia',
    description: 'Filtrado por precio.',
    type: 'xquery',
    exercises: [{
      id: 1, title: 'Cursos Caros',
      desc: 'Muestra los idiomas de los cursos con precio mayor que 110.',
      hint: 'where $c/precio > 110',
      starter: `<academia>
 <curso>
  <idioma>Inglés</idioma>
  <precio>120</precio>
 </curso>
 <curso>
  <idioma>Francés</idioma>
  <precio>100</precio>
 </curso>
 <curso>
  <idioma>Alemán</idioma>
  <precio>150</precio>
 </curso>
</academia>`,
      milestones: [
        { id: 'where', check: /where\s+\$c\/precio\s*>\s*110/i, popup: 'Filtro de precio OK.', instruction: 'Añade un where para filtrar los cursos de más de 110€.' }
      ]
    }]
  },
  q_21: {
    title: 'XQuery Extra 3: Biblioteca (Páginas)',
    description: 'Ordenación por campo numérico.',
    type: 'xquery',
    exercises: [{
      id: 1, title: 'Orden por Páginas',
      desc: 'Muestra los títulos de los libros ordenados por número de páginas (ascendente).',
      hint: 'order by $l/paginas',
      starter: `<biblioteca>
 <libro>
  <titulo>Don Quijote</titulo>
  <paginas>900</paginas>
 </libro>
 <libro>
  <titulo>La Celestina</titulo>
  <paginas>300</paginas>
 </libro>
 <libro>
  <titulo>Platero y yo</titulo>
  <paginas>150</paginas>
 </libro>
</biblioteca>`,
      milestones: [
        { id: 'order', check: /order\s+by\s+\$l\/paginas/i, popup: 'Ordenación OK.', instruction: 'Añade la cláusula order by $l/paginas.' }
      ]
    }]
  },
  q_22: {
    title: 'XQuery Extra 4: Coches (Max)',
    description: 'Uso de funciones de agregación (max).',
    type: 'xml',
    exercises: [{
      id: 1, title: 'El Coche más Caro',
      desc: 'Muestra el modelo del coche con el precio máximo.',
      hint: 'where $c/precio = max(//precio)',
      starter: `<coches>
 <coche>
  <modelo>Ibiza</modelo>
  <precio>18000</precio>
 </coche>
 <coche>
  <modelo>Clio</modelo>
  <precio>17500</precio>
 </coche>
 <coche>
  <modelo>X1</modelo>
  <precio>42000</precio>
 </coche>
</coches>`,
      milestones: [
        { id: 'max', check: /max\(/i, popup: 'Función MAX detectada.', instruction: 'Usa la función max(//precio) para comparar con el precio del coche actual.' }
      ]
    }]
  },
  q_23: {
    title: 'XQuery Extra 5: Alumnos',
    description: 'Filtrado de notas.',
    type: 'xquery',
    exercises: [{
      id: 1, title: 'Alumnos Aprobados',
      desc: 'Muestra solo los nombres de los alumnos cuya nota sea mayor o igual a 5.',
      hint: 'where $a/nota >= 5',
      starter: `<alumnos>
 <alumno>
  <nombre>Ana</nombre>
  <nota>8</nota>
 </alumno>
 <alumno>
  <nombre>Luis</nombre>
  <nota>4</nota>
 </alumno>
 <alumno>
  <nombre>Marta</nombre>
  <nota>9</nota>
 </alumno>
</alumnos>`,
      milestones: [
        { id: 'pass', check: /nota\s*>=\s*5/i, popup: 'Aprobados filtrados.', instruction: 'Añade el filtro where $a/nota >= 5.' }
      ]
    }]
  },
  q_24: {
    title: 'XQuery Extra 6: Películas',
    description: 'Filtro por duración.',
    type: 'xquery',
    exercises: [{
      id: 1, title: 'Películas Cortas',
      desc: 'Muestra los títulos de las películas con duración menor que 150 minutos.',
      hint: 'where $p/duracion < 150',
      starter: `<peliculas>
 <pelicula>
  <titulo>Origen</titulo>
  <duracion>148</duracion>
 </pelicula>
 <pelicula>
  <titulo>Coco</titulo>
  <duracion>105</duracion>
 </pelicula>
 <pelicula>
  <titulo>Gladiator</titulo>
  <duracion>155</duracion>
 </pelicula>
</peliculas>`,
      milestones: [
        { id: 'short', check: /duracion\s*<\s*150/i, popup: 'Duración controlada.', instruction: 'Filtra las películas con duración < 150.' }
      ]
    }]
  },
  q_25: {
    title: 'XQuery Extra 7: Pedidos',
    description: 'Filtro por atributo/campo de texto.',
    type: 'xquery',
    exercises: [{
      id: 1, title: 'Pedidos de Lucía',
      desc: 'Muestra todos los datos de los pedidos realizados por "Lucía".',
      hint: "where $p/cliente = 'Lucía'",
      starter: `<pedidos>
 <pedido>
  <cliente>Lucía</cliente>
  <producto>Teclado</producto>
  <cantidad>2</cantidad>
 </pedido>
 <pedido>
  <cliente>Mario</cliente>
  <producto>Ratón</producto>
  <cantidad>1</cantidad>
 </pedido>
 <pedido>
  <cliente>Lucía</cliente>
  <producto>Monitor</producto>
  <cantidad>3</cantidad>
 </pedido>
</pedidos>`,
      milestones: [
        { id: 'client', check: /cliente\s*=\s*(['"])Lucía\1/i, popup: 'Pedidos de Lucía encontrados.', instruction: "Filtra por el cliente 'Lucía' usando el operador =." }
      ]
    }]
  },
  sim1_p1: {
    exercises: [{
      id: 1, title: 'Estructura HTML5',
      desc: 'Crea un documento HTML5 básico con DOCTYPE, html (lang="es"), head (charset, viewport, title) y body vacío.',
      hint: 'Usa <!DOCTYPE html>, <meta charset="UTF-8">, etc.',
      starter: `<!-- Crea la estructura básica aquí -->\n`,
      solution: `<!DOCTYPE html>\n<html lang="es">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>Mi Tienda Online</title>\n</head>\n<body>\n</body>\n</html>`,
      milestones: [
        { id: 'doctype', check: /<!DOCTYPE html>/i, popup: '¡Bien! HTML5 iniciado.', instruction: 'Escribe la declaración <!DOCTYPE html>.' },
        { id: 'html', check: /<html lang="es">/i, popup: 'Idioma configurado.', instruction: 'Añade la etiqueta <html lang="es">.' },
        { id: 'head', check: /<head>/i, popup: 'Cabecera detectada.', instruction: 'Crea la sección <head>.' },
        { id: 'meta', check: /meta charset="UTF-8"/i, popup: 'Codificación UTF-8 lista.', instruction: 'Añade el meta charset="UTF-8".' },
        { id: 'title', check: /<title>.*<\/title>/i, popup: 'Título configurado.', instruction: 'Pon un <title> descriptivo.' }
      ]
    }]
  },
  sim1_p2: {
    exercises: [{
      id: 1, title: 'Encabezado y Navegación',
      desc: 'Dentro del body, crea un <header> con un <h1> y un <h2>. Después, añade un <nav> con una lista <ul> de 4 enlaces (Op1, Op2, Op3, Op4).',
      hint: '<header><h1>...</h1></header> <nav><ul><li><a>...</a></li></ul></nav>',
      starter: `<body>\n  <!-- Añade header y nav aquí -->\n</body>`,
      solution: `<body>\n  <header>\n    <h1>Mi Gran Tienda</h1>\n    <h2>Los mejores productos al mejor precio</h2>\n  </header>\n  <nav>\n    <ul>\n      <li><a href="#">Op1</a></li>\n      <li><a href="#">Op2</a></li>\n      <li><a href="#">Op3</a></li>\n      <li><a href="#">Op4</a></li>\n    </ul>\n  </nav>\n</body>`,
      milestones: [
        { id: 'header', check: /<header>/i, popup: 'Encabezado listo.', instruction: 'Crea el bloque <header>.' },
        { id: 'h1', check: /<h1>/i, popup: 'Título principal OK.', instruction: 'Añade el título <h1>.' },
        { id: 'nav', check: /<nav>/i, popup: 'Menú de navegación detectado.', instruction: 'Crea el bloque <nav>.' },
        { id: 'ul', check: /<ul>/i, popup: 'Lista iniciada.', instruction: 'Crea una lista <ul> para el menú.' },
        { id: 'li', check: /<li>.*<li>.*<li>.*<li>/si, popup: '4 opciones listas.', instruction: 'Añade los 4 elementos <li> con sus enlaces <a>.' }
      ]
    }]
  },
  sim1_p3: {
    exercises: [{
      id: 1, title: 'Sección de Productos',
      desc: 'Crea una <section> con el título "Productos destacados". Añade 3 bloques <article>, cada uno con un <h3> (nombre), una <img> (usa src="url"), un <p> (descripción) y un <p><strong> (precio).',
      hint: '<section> <article> <h3>...</h3> <img ...> </article> </section>',
      starter: `<section>\n  <!-- 3 artículos de producto aquí -->\n</section>`,
      solution: `<section>\n  <h2>Productos destacados</h2>\n  <article>\n    <h3>Producto 1</h3>\n    <img src="img1.jpg" alt="P1">\n    <p>Descripción del producto 1.</p>\n    <p><strong>Precio:</strong> 100€</p>\n  </article>\n  <article>\n    <h3>Producto 2</h3>\n    <img src="img2.jpg" alt="P2">\n    <p>Descripción del producto 2.</p>\n    <p><strong>Precio:</strong> 200€</p>\n  </article>\n  <article>\n    <h3>Producto 3</h3>\n    <img src="img3.jpg" alt="P3">\n    <p>Descripción del producto 3.</p>\n    <p><strong>Precio:</strong> 300€</p>\n  </article>\n</section>`,
      milestones: [
        { id: 'section', check: /<section>/i, popup: 'Sección iniciada.', instruction: 'Crea la <section>.' },
        { id: 'art1', check: /<article>/i, popup: 'Primer producto OK.', instruction: 'Añade el primer <article>.' },
        { id: 'art3', check: /<article>.*<article>.*<article>/si, popup: '¡3 productos listos!', instruction: 'Añade los 3 bloques <article> completos (título, imagen, descripción, precio).' },
        { id: 'img', check: /<img.*src=.*alt=/i, popup: 'Imágenes accesibles.', instruction: 'Asegúrate de que las imágenes tengan src y alt.' }
      ]
    }]
  },
  sim1_p4: {
    exercises: [{
      id: 1, title: 'Formulario de Contacto',
      desc: 'Crea una <section> con un formulario. Debe tener campos para Nombre (text), Email (email), un <select> con 3 opciones (Consulta, Pedido, Reclamación), un <textarea> (mensaje) y un botón de envío.',
      hint: '<form> <label> <input> <select> <textarea> <input type="submit"> </form>',
      starter: `<section>\n  <h2>Contacto</h2>\n  <!-- Formulario aquí -->\n</section>`,
      solution: `<section>\n  <h2>Contacto</h2>\n  <form action="#" method="post">\n    <label for="nombre">Nombre:</label>\n    <input type="text" id="nombre" name="nombre"><br>\n    <label for="email">Email:</label>\n    <input type="email" id="email" name="email"><br>\n    <label for="motivo">Motivo:</label>\n    <select id="motivo" name="motivo">\n      <option value="c">Consulta</option>\n      <option value="p">Pedido</option>\n      <option value="r">Reclamación</option>\n    </select><br>\n    <label for="msj">Mensaje:</label>\n    <textarea id="msj" name="msj"></textarea><br>\n    <input type="submit" value="Enviar">\n  </form>\n</section>`,
      milestones: [
        { id: 'form', check: /<form/i, popup: 'Formulario iniciado.', instruction: 'Crea la etiqueta <form>.' },
        { id: 'email', check: /type="email"/i, popup: 'Tipo email correcto.', instruction: 'Usa type="email" para el campo de correo.' },
        { id: 'select', check: /<select/i, popup: 'Selector añadido.', instruction: 'Añade el <select>.' },
        { id: 'opt3', check: /<option.*<option.*<option/si, popup: 'Opciones completas.', instruction: 'Añade las 3 opciones al selector.' },
        { id: 'text', check: /<textarea/i, popup: 'Área de texto lista.', instruction: 'Añade el <textarea>.' },
        { id: 'submit', check: /type="submit"/i, popup: '¡Listo para enviar!', instruction: 'Finaliza con el botón type="submit".' }
      ]
    }]
  }
};
