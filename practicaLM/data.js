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
    ]
  },
  xquery: {
    label: 'T6', title: 'XQuery',
    sections: [
      { id: 'xquery-teoria', icon: '📖', label: 'Teoría: XQuery (Pendiente de material)', type: 'lesson', lessonId: 'xquery_teoria' },
      { id: 'xquery-editor', icon: '💻', label: 'Ejercicios VSCode XQuery (Pendiente)', type: 'editor', editorId: 'xquery_editor' }
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
    <titulo lang="es">Historia del Cine</vic>
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
  ]}
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
  
</catalogo>` },
      { id: 2, title: 'Documento con namespace', desc: 'Crea un XML con namespace por defecto (xmlns="http://miempresa.com/productos") y al menos un elemento con prefijo (xmlns:desc="http://miempresa.com/descripciones").',
        hint: 'xmlns="URI" para namespace por defecto, xmlns:prefijo="URI" para con prefijo',
        starter: `<?xml version="1.0" encoding="UTF-8"?>
<catalogo xmlns="" xmlns:desc="">
  <producto id="1">
    <nombre>Ejemplo</nombre>
    <desc:detalle>Descripción detallada</desc:detalle>
  </producto>
</catalogo>` }
    ]
  }
};
