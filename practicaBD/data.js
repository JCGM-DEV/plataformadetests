// =============================================
// BD LAB — DATA
// =============================================

const UNITS = {
  sql: {
    label: 'T2, T4–T5', title: 'SQL Interactivo',
    sections: [
      { id: 'sql-teoria-ddl', icon: '📖', label: 'Teoría: DDL (CREATE/ALTER/DROP)', type: 'lesson', lessonId: 'ddl' },
      { id: 'sql-teoria-dml', icon: '📖', label: 'Teoría: DML (SELECT/INSERT/UPDATE)', type: 'lesson', lessonId: 'dml' },
      { id: 'sql-teoria-joins', icon: '📖', label: 'Teoría: JOINs y Subconsultas', type: 'lesson', lessonId: 'joins' },
      { id: 'sql-quiz1', icon: '🧠', label: 'Quiz: DDL y Tipos de Datos', type: 'quiz', quizId: 'ddl_quiz' },
      { id: 'sql-quiz2', icon: '🧠', label: 'Quiz: SELECT y Funciones', type: 'quiz', quizId: 'select_quiz' },
      { id: 'sql-quiz3', icon: '🧠', label: 'Quiz: JOINs y Transacciones', type: 'quiz', quizId: 'joins_quiz' },
      { id: 'sql-drag1', icon: '🎯', label: 'Ejercicio: Clasifica comandos SQL', type: 'drag', dragId: 'clasifica_sql' },
      { id: 'sql-drag2', icon: '🎯', label: 'Ejercicio: JOIN correcto', type: 'drag', dragId: 'join_tipo' },
      { id: 'sql-lab1', icon: '⌨️', label: 'Lab SQL: Consultas SELECT', type: 'sql', sqlId: 'select_lab' },
      { id: 'sql-lab2', icon: '⌨️', label: 'Lab SQL: JOINs', type: 'sql', sqlId: 'joins_lab' },
      { id: 'sql-lab3', icon: '⌨️', label: 'Lab SQL: DML (INSERT/UPDATE/DELETE)', type: 'sql', sqlId: 'dml_lab' },
    ]
  },
  er: {
    label: 'T3', title: 'Diagramas E-R',
    sections: [
      { id: 'er-teoria', icon: '📖', label: 'Teoría: Modelo E-R', type: 'lesson', lessonId: 'er_teoria' },
      { id: 'er-norm', icon: '📖', label: 'Teoría: Normalización 1FN–3FN', type: 'lesson', lessonId: 'normalizacion' },
      { id: 'er-quiz1', icon: '🧠', label: 'Quiz: Entidades y Relaciones', type: 'quiz', quizId: 'er_quiz' },
      { id: 'er-quiz2', icon: '🧠', label: 'Quiz: Normalización', type: 'quiz', quizId: 'norm_quiz' },
      { id: 'er-drag1', icon: '🎯', label: 'Ejercicio: Cardinalidades', type: 'drag', dragId: 'cardinalidad' },
      { id: 'er-drag2', icon: '🎯', label: 'Ejercicio: Forma Normal', type: 'drag', dragId: 'forma_normal' },
      { id: 'er-diagram', icon: '📐', label: 'Diagramas E-R Guiados', type: 'er', erId: 'er_diag' },
    ]
  },
  prog: {
    label: 'T6–T7', title: 'Programación BD',
    sections: [
      { id: 'prog-teoria', icon: '📖', label: 'Teoría: Procedimientos y Funciones', type: 'lesson', lessonId: 'proc_func' },
      { id: 'prog-teoria2', icon: '📖', label: 'Teoría: Cursores y Triggers', type: 'lesson', lessonId: 'cursores' },
      { id: 'prog-quiz1', icon: '🧠', label: 'Quiz: Procedimientos almacenados', type: 'quiz', quizId: 'proc_quiz' },
      { id: 'prog-drag1', icon: '🎯', label: 'Ejercicio: Clasifica objetos BD', type: 'drag', dragId: 'objetos_bd' },
      { id: 'prog-lab', icon: '⌨️', label: 'Lab: Escribe procedimientos', type: 'sql', sqlId: 'proc_lab' },
    ]
  },
  repaso: {
    label: 'U8', title: 'Simulacro Práctico',
    sections: [
      { id: 'repaso-30', icon: '📝', label: 'Batería: 30 Preguntas Prácticas', type: 'quiz', quizId: 'practica_30' },
    ]
  },
  sql_practico: {
    label: 'EXAMEN', title: 'Consultas SQL (Teórico-Práctico)',
    sections: [
      { id: 'sql-ex-quiz', icon: '🧠', label: 'Batería: 40 Consultas SQL', type: 'quiz', quizId: 'sql_40_quiz' },
    ]
  }
};

// =============================================
// LESSONS
// =============================================
const LESSONS = {
  ddl: {
    title: 'DDL — Lenguaje de Definición de Datos',
    subtitle: 'CREATE, ALTER, DROP: estructura de la base de datos',
    concepts: [
      { icon: '🏗️', title: 'CREATE TABLE', body: 'Crea una nueva tabla. Define columnas, tipos de datos, restricciones (PRIMARY KEY, NOT NULL, UNIQUE, DEFAULT, CHECK) y claves foráneas (FOREIGN KEY).' },
      { icon: '✏️', title: 'ALTER TABLE', body: 'Modifica una tabla existente: <code>ADD COLUMN</code>, <code>DROP COLUMN</code>, <code>MODIFY COLUMN</code>, <code>ADD CONSTRAINT</code>, <code>DROP CONSTRAINT</code>.' },
      { icon: '🗑️', title: 'DROP TABLE', body: 'Elimina una tabla y todos sus datos permanentemente. <code>DROP TABLE IF EXISTS</code> evita error si no existe.' },
      { icon: '🔑', title: 'Claves y Restricciones', body: '<code>PRIMARY KEY</code>: identifica unívocamente cada fila.<br><code>FOREIGN KEY</code>: referencia a otra tabla.<br><code>UNIQUE</code>: valores únicos.<br><code>NOT NULL</code>: obligatorio.' },
      { icon: '📊', title: 'Tipos de Datos', body: '<code>INT</code>, <code>BIGINT</code>: enteros.<br><code>VARCHAR(n)</code>, <code>TEXT</code>: texto.<br><code>DECIMAL(p,s)</code>: decimales.<br><code>DATE</code>, <code>DATETIME</code>: fechas.<br><code>BOOLEAN</code>: verdadero/falso.' },
      { icon: '🔗', title: 'Integridad Referencial', body: '<code>ON DELETE CASCADE</code>: borra hijos al borrar padre.<br><code>ON DELETE SET NULL</code>: pone NULL en hijos.<br><code>ON DELETE RESTRICT</code>: impide borrar si hay hijos.' },
    ],
    codeExample: `<span class="kw">CREATE TABLE</span> empleados (
  id         <span class="tp">INT</span>          <span class="kw">PRIMARY KEY AUTO_INCREMENT</span>,
  nombre     <span class="tp">VARCHAR</span>(100) <span class="kw">NOT NULL</span>,
  salario    <span class="tp">DECIMAL</span>(10,2) <span class="kw">DEFAULT</span> <span class="num">0.00</span>,
  dept_id    <span class="tp">INT</span>,
  <span class="kw">FOREIGN KEY</span> (dept_id) <span class="kw">REFERENCES</span> departamentos(id)
    <span class="kw">ON DELETE SET NULL</span>
);`,
    info: { type: 'warning', text: '⚠️ <strong>Examen frecuente</strong>: La diferencia entre DROP (elimina tabla), TRUNCATE (vacía tabla, mantiene estructura) y DELETE (borra filas con WHERE). DROP y TRUNCATE son DDL; DELETE es DML.' }
  },

  dml: {
    title: 'DML — Lenguaje de Manipulación de Datos',
    subtitle: 'SELECT, INSERT, UPDATE, DELETE: operaciones sobre los datos',
    concepts: [
      { icon: '🔍', title: 'SELECT', body: 'Consulta datos. Cláusulas: <code>WHERE</code> (filtro), <code>ORDER BY</code> (orden), <code>GROUP BY</code> (agrupación), <code>HAVING</code> (filtro de grupos), <code>LIMIT</code> (número de filas).' },
      { icon: '➕', title: 'INSERT INTO', body: '<code>INSERT INTO tabla (col1, col2) VALUES (v1, v2)</code>. También: <code>INSERT INTO tabla SELECT ...</code> para insertar desde otra consulta.' },
      { icon: '✏️', title: 'UPDATE', body: '<code>UPDATE tabla SET col=valor WHERE condicion</code>. ¡SIEMPRE usar WHERE! Sin WHERE se actualizan TODOS los registros.' },
      { icon: '🗑️', title: 'DELETE', body: '<code>DELETE FROM tabla WHERE condicion</code>. Sin WHERE borra todo. Respeta integridad referencial (ON DELETE).' },
      { icon: '📊', title: 'Funciones de Agregado', body: '<code>COUNT(*)</code>: cuenta filas.<br><code>SUM(col)</code>: suma.<br><code>AVG(col)</code>: media.<br><code>MAX(col)</code>: máximo.<br><code>MIN(col)</code>: mínimo.' },
      { icon: '🔄', title: 'Transacciones', body: '<code>START TRANSACTION</code>: inicia.<br><code>COMMIT</code>: confirma cambios permanentemente.<br><code>ROLLBACK</code>: deshace todos los cambios de la transacción.' },
    ],
    codeExample: `<span class="cm">-- Consulta con GROUP BY y HAVING</span>
<span class="kw">SELECT</span> dept_id, <span class="fn">COUNT</span>(*) <span class="kw">AS</span> total, <span class="fn">AVG</span>(salario) <span class="kw">AS</span> media
<span class="kw">FROM</span> empleados
<span class="kw">WHERE</span> salario > <span class="num">1000</span>
<span class="kw">GROUP BY</span> dept_id
<span class="kw">HAVING</span> <span class="fn">COUNT</span>(*) > <span class="num">2</span>
<span class="kw">ORDER BY</span> media <span class="kw">DESC</span>;`,
    info: { type: 'tip', text: '💡 <strong>WHERE vs HAVING</strong>: WHERE filtra filas ANTES de agrupar. HAVING filtra grupos DESPUÉS de GROUP BY. No se puede usar funciones de agregado en WHERE.' }
  },

  joins: {
    title: 'JOINs y Subconsultas',
    subtitle: 'Combinar tablas y consultas anidadas',
    concepts: [
      { icon: '🔗', title: 'INNER JOIN', body: 'Devuelve solo las filas que tienen coincidencia en AMBAS tablas. Las filas sin coincidencia se excluyen.' },
      { icon: '⬅️', title: 'LEFT JOIN', body: 'Devuelve TODAS las filas de la tabla izquierda + las coincidentes de la derecha. Las no coincidentes de la derecha aparecen como NULL.' },
      { icon: '➡️', title: 'RIGHT JOIN', body: 'Devuelve TODAS las filas de la tabla derecha + las coincidentes de la izquierda. Menos usado que LEFT JOIN.' },
      { icon: '🔀', title: 'CROSS JOIN', body: 'Producto cartesiano: combina cada fila de A con cada fila de B. Sin condición ON. Resultado: filas_A × filas_B.' },
      { icon: '📦', title: 'Subconsultas', body: 'Consulta dentro de otra. En WHERE: <code>WHERE id IN (SELECT ...)</code>. Correlacionada: referencia a la consulta exterior. <code>EXISTS</code>: comprueba si existe al menos una fila.' },
      { icon: '🔗', title: 'UNION / INTERSECT', body: '<code>UNION</code>: combina resultados eliminando duplicados.<br><code>UNION ALL</code>: mantiene duplicados.<br><code>INTERSECT</code>: solo filas comunes.<br><code>EXCEPT/MINUS</code>: diferencia.' },
    ],
    codeExample: `<span class="cm">-- LEFT JOIN: todos los empleados, con o sin departamento</span>
<span class="kw">SELECT</span> e.nombre, d.nombre <span class="kw">AS</span> departamento
<span class="kw">FROM</span> empleados e
<span class="kw">LEFT JOIN</span> departamentos d <span class="kw">ON</span> e.dept_id = d.id;

<span class="cm">-- Subconsulta con IN</span>
<span class="kw">SELECT</span> nombre <span class="kw">FROM</span> empleados
<span class="kw">WHERE</span> dept_id <span class="kw">IN</span> (
  <span class="kw">SELECT</span> id <span class="kw">FROM</span> departamentos <span class="kw">WHERE</span> ciudad = <span class="str">'Madrid'</span>
);`,
    info: { type: 'warning', text: '⚠️ <strong>Clave examen</strong>: INNER JOIN excluye NULLs. LEFT JOIN incluye todos los de la izquierda. Si preguntan "todos los clientes aunque no tengan pedidos" → LEFT JOIN.' }
  },

  er_teoria: {
    title: 'Modelo Entidad-Relación',
    subtitle: 'Diseño conceptual de bases de datos',
    concepts: [
      { icon: '⬜', title: 'Entidad', body: 'Objeto del mundo real con existencia propia. Se representa con un <strong>rectángulo</strong>. Ej: CLIENTE, PRODUCTO, PEDIDO.' },
      { icon: '🔷', title: 'Relación', body: 'Asociación entre entidades. Se representa con un <strong>rombo</strong>. Ej: CLIENTE "realiza" PEDIDO.' },
      { icon: '⭕', title: 'Atributo', body: 'Propiedad de una entidad. Se representa con una <strong>elipse</strong>. Tipos: simple, compuesto, multivaluado (doble elipse), derivado (elipse punteada).' },
      { icon: '🔑', title: 'Clave Primaria', body: 'Atributo que identifica unívocamente cada instancia. Se representa con el nombre <u>subrayado</u>.' },
      { icon: '📏', title: 'Cardinalidad', body: '<strong>1:1</strong> — uno a uno.<br><strong>1:N</strong> — uno a muchos.<br><strong>N:M</strong> — muchos a muchos (genera tabla intermedia).' },
      { icon: '🔲', title: 'Entidad Débil', body: 'No tiene clave propia; depende de otra entidad (propietaria). Se representa con <strong>doble rectángulo</strong>. Su relación con la propietaria es una <strong>relación identificadora</strong> (doble rombo).' },
    ],
    codeExample: `<span class="cm">-- Cardinalidad 1:N → FK en el lado N</span>
<span class="cm">-- DEPARTAMENTO (1) ──── (N) EMPLEADO</span>
<span class="kw">CREATE TABLE</span> empleados (
  id      <span class="tp">INT PRIMARY KEY</span>,
  nombre  <span class="tp">VARCHAR</span>(100),
  dept_id <span class="tp">INT</span> <span class="kw">REFERENCES</span> departamentos(id)
);

<span class="cm">-- Cardinalidad N:M → tabla intermedia</span>
<span class="cm">-- ALUMNO (N) ──── (M) ASIGNATURA</span>
<span class="kw">CREATE TABLE</span> matriculas (
  alumno_id    <span class="tp">INT REFERENCES</span> alumnos(id),
  asignatura_id <span class="tp">INT REFERENCES</span> asignaturas(id),
  <span class="kw">PRIMARY KEY</span> (alumno_id, asignatura_id)
);`,
    info: { type: 'tip', text: '💡 <strong>Regla de oro</strong>: Relación N:M siempre genera una tabla intermedia con las dos claves foráneas como clave primaria compuesta.' }
  },

  normalizacion: {
    title: 'Normalización: 1FN, 2FN, 3FN',
    subtitle: 'Eliminar redundancias y dependencias problemáticas',
    concepts: [
      { icon: '1️⃣', title: '1FN — Primera Forma Normal', body: 'Todos los atributos deben ser <strong>atómicos</strong> (indivisibles). No puede haber grupos repetitivos ni atributos multivaluados en una columna.' },
      { icon: '2️⃣', title: '2FN — Segunda Forma Normal', body: 'Cumple 1FN + todos los atributos no clave dependen de la <strong>clave primaria completa</strong> (no de una parte). Solo aplica si la PK es compuesta.' },
      { icon: '3️⃣', title: '3FN — Tercera Forma Normal', body: 'Cumple 2FN + no hay <strong>dependencias transitivas</strong>: ningún atributo no clave depende de otro atributo no clave.' },
      { icon: '🔍', title: 'Dependencia Parcial (viola 2FN)', body: 'Si PK = (A, B) y el atributo C depende solo de A (no de A+B), hay dependencia parcial. Solución: separar en otra tabla.' },
      { icon: '🔄', title: 'Dependencia Transitiva (viola 3FN)', body: 'Si A → B y B → C, entonces A → C transitivamente. Solución: mover B y C a una tabla separada.' },
      { icon: '✅', title: 'Beneficios', body: 'Elimina redundancia, evita anomalías de inserción/actualización/borrado, mejora la integridad de los datos.' },
    ],
    codeExample: `<span class="cm">-- Viola 3FN: ciudad depende de cod_postal (no de id)</span>
<span class="cm">-- Pedido(id, cliente, cod_postal, ciudad)</span>
<span class="cm">-- id → cod_postal → ciudad (transitiva)</span>

<span class="cm">-- Solución 3FN: separar</span>
<span class="kw">CREATE TABLE</span> codigos_postales (
  cod_postal <span class="tp">VARCHAR</span>(5) <span class="kw">PRIMARY KEY</span>,
  ciudad     <span class="tp">VARCHAR</span>(100)
);
<span class="kw">CREATE TABLE</span> pedidos (
  id         <span class="tp">INT PRIMARY KEY</span>,
  cliente    <span class="tp">VARCHAR</span>(100),
  cod_postal <span class="tp">VARCHAR</span>(5) <span class="kw">REFERENCES</span> codigos_postales(cod_postal)
);`,
    info: { type: 'warning', text: '⚠️ <strong>Examen típico</strong>: Te dan una tabla y preguntan qué forma normal viola. Busca: ¿hay valores no atómicos? (viola 1FN). ¿Hay dependencia parcial de la PK? (viola 2FN). ¿Hay dependencia transitiva? (viola 3FN).' }
  },

  proc_func: {
    title: 'Procedimientos y Funciones en MySQL',
    subtitle: 'Programación del lado del servidor',
    concepts: [
      { icon: '⚙️', title: 'Procedimiento Almacenado', body: 'Bloque de código SQL reutilizable. Se llama con <code>CALL nombre(params)</code>. Puede tener parámetros IN, OUT, INOUT. No devuelve valor directamente.' },
      { icon: '🔧', title: 'Función', body: 'Como un procedimiento pero <strong>siempre devuelve un valor</strong> con <code>RETURN</code>. Se usa en SELECT. Puede ser DETERMINISTIC (mismo resultado para mismos parámetros).' },
      { icon: '🔀', title: 'Control de Flujo', body: '<code>IF ... THEN ... ELSEIF ... ELSE ... END IF</code><br><code>CASE WHEN ... THEN ... END CASE</code><br><code>WHILE ... DO ... END WHILE</code><br><code>REPEAT ... UNTIL ... END REPEAT</code>' },
      { icon: '📝', title: 'Variables', body: '<code>DECLARE var_nombre TIPO DEFAULT valor</code> — variable local.<br><code>SET @var = valor</code> — variable de sesión (usuario).<br><code>SELECT col INTO var FROM ...</code> — asignar desde consulta.' },
      { icon: '⚡', title: 'Trigger', body: 'Se ejecuta automáticamente ANTES o DESPUÉS de INSERT/UPDATE/DELETE. Usa <code>NEW</code> (nuevos valores) y <code>OLD</code> (valores anteriores).' },
      { icon: '🔄', title: 'DELIMITER', body: 'Cambia el delimitador de comandos para poder escribir bloques con <code>;</code> internos. Uso: <code>DELIMITER //</code> ... <code>DELIMITER ;</code>' },
    ],
    codeExample: `<span class="kw">DELIMITER</span> //
<span class="kw">CREATE PROCEDURE</span> <span class="fn">subir_salario</span>(
  <span class="kw">IN</span>  p_dept_id <span class="tp">INT</span>,
  <span class="kw">IN</span>  p_pct     <span class="tp">DECIMAL</span>(5,2),
  <span class="kw">OUT</span> p_total   <span class="tp">INT</span>
)
<span class="kw">BEGIN</span>
  <span class="kw">UPDATE</span> empleados
  <span class="kw">SET</span> salario = salario * (<span class="num">1</span> + p_pct/<span class="num">100</span>)
  <span class="kw">WHERE</span> dept_id = p_dept_id;
  <span class="kw">SELECT</span> <span class="fn">ROW_COUNT</span>() <span class="kw">INTO</span> p_total;
<span class="kw">END</span>//
<span class="kw">DELIMITER</span> ;
<span class="cm">-- Llamada:</span>
<span class="kw">CALL</span> <span class="fn">subir_salario</span>(<span class="num">3</span>, <span class="num">10</span>, @afectados);`,
    info: { type: 'tip', text: '💡 <strong>Diferencia clave</strong>: Función → devuelve valor, se usa en SELECT. Procedimiento → no devuelve valor directamente, se llama con CALL, puede tener parámetros OUT.' }
  },

  cursores: {
    title: 'Cursores y Triggers',
    subtitle: 'Recorrer resultados fila a fila y automatizar acciones',
    concepts: [
      { icon: '📍', title: 'Cursor', body: 'Permite recorrer el resultado de una consulta fila a fila. Pasos: DECLARE → OPEN → FETCH (bucle) → CLOSE.' },
      { icon: '🚨', title: 'Handler NOT FOUND', body: 'Manejador que detecta cuando el cursor llega al final. <code>DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = 1</code>.' },
      { icon: '⚡', title: 'Trigger BEFORE/AFTER', body: '<code>BEFORE INSERT</code>: valida/modifica datos antes de insertar.<br><code>AFTER UPDATE</code>: registra cambios en tabla de auditoría.<br><code>BEFORE DELETE</code>: impide borrado bajo condición.' },
      { icon: '🆕', title: 'NEW y OLD en Triggers', body: '<code>NEW.columna</code>: valor nuevo (INSERT/UPDATE).<br><code>OLD.columna</code>: valor anterior (UPDATE/DELETE).<br>En DELETE solo existe OLD. En INSERT solo existe NEW.' },
      { icon: '📅', title: 'Eventos (CREATE EVENT)', body: 'Tareas programadas. Requiere <code>event_scheduler = ON</code>. Ej: limpiar logs cada día a las 3:00.' },
      { icon: '🛡️', title: 'Manejo de Excepciones', body: '<code>DECLARE EXIT HANDLER FOR SQLEXCEPTION</code>: aborta al error.<br><code>DECLARE CONTINUE HANDLER</code>: continúa tras el error.<br><code>SIGNAL SQLSTATE</code>: lanza error personalizado.' },
    ],
    codeExample: `<span class="kw">DELIMITER</span> //
<span class="kw">CREATE TRIGGER</span> <span class="fn">audit_salario</span>
<span class="kw">AFTER UPDATE ON</span> empleados
<span class="kw">FOR EACH ROW</span>
<span class="kw">BEGIN</span>
  <span class="kw">IF</span> OLD.salario <> NEW.salario <span class="kw">THEN</span>
    <span class="kw">INSERT INTO</span> auditoria(emp_id, salario_ant, salario_nuevo, fecha)
    <span class="kw">VALUES</span>(OLD.id, OLD.salario, NEW.salario, <span class="fn">NOW</span>());
  <span class="kw">END IF</span>;
<span class="kw">END</span>//
<span class="kw">DELIMITER</span> ;`,
    info: { type: 'warning', text: '⚠️ <strong>Examen</strong>: Los cursores son para procesar fila a fila cuando no se puede hacer con una sola consulta SQL. El handler NOT FOUND es obligatorio para evitar bucles infinitos.' }
  }
};

// =============================================
// QUIZZES
// =============================================
const QUIZZES = {
  ddl_quiz: { title: 'Quiz: DDL y Tipos de Datos', questions: [
    { q: '¿Qué comando DDL elimina una tabla y todos sus datos permanentemente?', hint: 'No se puede deshacer.',
      opts: ['DELETE TABLE', 'TRUNCATE TABLE', 'DROP TABLE', 'REMOVE TABLE'], ans: 2,
      exp: '<strong>DROP TABLE</strong> elimina la tabla y su estructura. TRUNCATE vacía los datos pero mantiene la estructura. DELETE borra filas (DML).' },
    { q: '¿Qué restricción garantiza que una columna no puede tener valores duplicados?', hint: 'Diferente a PRIMARY KEY.',
      opts: ['NOT NULL', 'UNIQUE', 'CHECK', 'DEFAULT'], ans: 1,
      exp: '<strong>UNIQUE</strong> garantiza valores únicos. PRIMARY KEY también es única pero además no puede ser NULL. Una tabla puede tener varias UNIQUE pero solo una PK.' },
    { q: '¿Qué hace ON DELETE CASCADE en una clave foránea?', hint: 'Afecta a las filas hijas.',
      opts: ['Impide borrar el padre si tiene hijos', 'Pone NULL en los hijos al borrar el padre', 'Borra automáticamente los hijos al borrar el padre', 'Lanza un error al intentar borrar'], ans: 2,
      exp: '<strong>ON DELETE CASCADE</strong>: al borrar la fila padre, se borran automáticamente todas las filas hijas que la referencian.' },
    { q: '¿Cuál es la diferencia entre CHAR(10) y VARCHAR(10)?', hint: 'Uno es de longitud fija, el otro variable.',
      opts: ['No hay diferencia', 'CHAR almacena exactamente 10 caracteres (rellena con espacios); VARCHAR almacena hasta 10 (longitud variable)', 'VARCHAR es más lento que CHAR', 'CHAR solo acepta números'], ans: 1,
      exp: '<strong>CHAR(n)</strong>: longitud fija, siempre ocupa n bytes. <strong>VARCHAR(n)</strong>: longitud variable, ocupa solo lo necesario + 1-2 bytes de longitud.' },
    { q: '¿Qué comando modifica la estructura de una tabla existente?', hint: 'Para añadir o eliminar columnas.',
      opts: ['MODIFY TABLE', 'UPDATE TABLE', 'ALTER TABLE', 'CHANGE TABLE'], ans: 2,
      exp: '<strong>ALTER TABLE</strong> permite ADD COLUMN, DROP COLUMN, MODIFY COLUMN, ADD/DROP CONSTRAINT, RENAME COLUMN.' },
    { q: '¿Qué tipo de dato usarías para almacenar un precio como 19.99?', hint: 'Necesita precisión decimal exacta.',
      opts: ['FLOAT', 'DOUBLE', 'DECIMAL(10,2)', 'INT'], ans: 2,
      exp: '<strong>DECIMAL(p,s)</strong> es el tipo correcto para valores monetarios: p=dígitos totales, s=decimales. FLOAT y DOUBLE tienen errores de redondeo.' }
  ]},

  select_quiz: { title: 'Quiz: SELECT y Funciones de Agregado', questions: [
    { q: '¿Qué cláusula filtra grupos después de GROUP BY?', hint: 'No es WHERE.',
      opts: ['WHERE', 'FILTER', 'HAVING', 'WHEN'], ans: 2,
      exp: '<strong>HAVING</strong> filtra grupos después de GROUP BY. WHERE filtra filas individuales antes de agrupar. No se pueden usar funciones de agregado en WHERE.' },
    { q: '¿Qué hace DISTINCT en un SELECT?', hint: 'Afecta a los resultados duplicados.',
      opts: ['Ordena los resultados', 'Elimina filas duplicadas del resultado', 'Filtra valores NULL', 'Cuenta filas únicas'], ans: 1,
      exp: '<strong>DISTINCT</strong> elimina filas duplicadas del resultado. SELECT DISTINCT nombre devuelve cada nombre solo una vez.' },
    { q: '¿Qué función devuelve el número de filas que cumplen una condición?', hint: 'Función de agregado básica.',
      opts: ['SUM()', 'AVG()', 'COUNT()', 'TOTAL()'], ans: 2,
      exp: '<strong>COUNT(*)</strong> cuenta todas las filas. <strong>COUNT(columna)</strong> cuenta filas donde la columna no es NULL.' },
    { q: '¿Qué operador filtra por un rango de valores en WHERE?', hint: 'Incluye los extremos.',
      opts: ['IN', 'LIKE', 'BETWEEN', 'EXISTS'], ans: 2,
      exp: '<strong>BETWEEN a AND b</strong> es equivalente a <code>col >= a AND col <= b</code>. Incluye ambos extremos.' },
    { q: '¿Qué hace ORDER BY col DESC?', hint: 'Afecta al orden de los resultados.',
      opts: ['Ordena de menor a mayor', 'Ordena de mayor a menor', 'Elimina duplicados', 'Agrupa por columna'], ans: 1,
      exp: '<strong>ORDER BY col DESC</strong> ordena de mayor a menor (descendente). ASC es ascendente (por defecto).' },
    { q: 'Para buscar nombres que empiecen por "Mar", ¿qué usarías?', hint: 'Búsqueda de patrones.',
      opts: ["WHERE nombre = 'Mar%'", "WHERE nombre LIKE 'Mar%'", "WHERE nombre CONTAINS 'Mar'", "WHERE nombre STARTS 'Mar'"], ans: 1,
      exp: '<strong>LIKE</strong> con <code>%</code> (cualquier secuencia) y <code>_</code> (un carácter). <code>LIKE \'Mar%\'</code> encuentra "María", "Marcos", "Marta"...' }
  ]},

  joins_quiz: { title: 'Quiz: JOINs y Transacciones', questions: [
    { q: '¿Qué tipo de JOIN devuelve solo las filas con coincidencia en AMBAS tablas?', hint: 'El más restrictivo.',
      opts: ['LEFT JOIN', 'RIGHT JOIN', 'INNER JOIN', 'FULL JOIN'], ans: 2,
      exp: '<strong>INNER JOIN</strong> devuelve solo las filas que tienen coincidencia en ambas tablas. Las filas sin pareja se excluyen.' },
    { q: 'Quieres listar TODOS los clientes, tengan o no pedidos. ¿Qué JOIN usas?', hint: 'Clientes es la tabla "izquierda".',
      opts: ['INNER JOIN', 'LEFT JOIN', 'RIGHT JOIN', 'CROSS JOIN'], ans: 1,
      exp: '<strong>LEFT JOIN</strong>: devuelve todos los registros de la tabla izquierda (clientes) y los coincidentes de la derecha (pedidos). Los clientes sin pedidos aparecen con NULL.' },
    { q: '¿Qué hace ROLLBACK en una transacción?', hint: 'Lo contrario de COMMIT.',
      opts: ['Confirma los cambios permanentemente', 'Deshace todos los cambios de la transacción', 'Crea un punto de guardado', 'Inicia una nueva transacción'], ans: 1,
      exp: '<strong>ROLLBACK</strong> deshace todos los cambios realizados desde el último START TRANSACTION o SAVEPOINT. Los datos vuelven al estado anterior.' },
    { q: '¿Qué operación de conjuntos combina resultados eliminando duplicados?', hint: 'Suma de dos consultas.',
      opts: ['INTERSECT', 'EXCEPT', 'UNION', 'UNION ALL'], ans: 2,
      exp: '<strong>UNION</strong> combina y elimina duplicados. <strong>UNION ALL</strong> mantiene duplicados (más rápido). Ambas consultas deben tener el mismo número y tipo de columnas.' },
    { q: '¿Qué hace SELECT * FROM A, B (sin JOIN)?', hint: 'Producto cartesiano.',
      opts: ['INNER JOIN automático', 'LEFT JOIN por defecto', 'Producto cartesiano: cada fila de A con cada fila de B', 'Error de sintaxis'], ans: 2,
      exp: 'Sin condición JOIN, se genera un <strong>producto cartesiano</strong> (CROSS JOIN implícito): si A tiene 10 filas y B tiene 5, el resultado tiene 50 filas.' }
  ]},

  er_quiz: { title: 'Quiz: Modelo E-R', questions: [
    { q: '¿Con qué figura geométrica se representan las ENTIDADES en un diagrama E-R?', hint: 'La figura más básica.',
      opts: ['Elipse', 'Rombo', 'Rectángulo', 'Círculo'], ans: 2,
      exp: 'Las <strong>entidades</strong> se representan con <strong>rectángulos</strong>. Los atributos son elipses. Las relaciones son rombos.' },
    { q: '¿Qué es una entidad débil?', hint: 'No puede existir por sí sola.',
      opts: ['Una entidad con pocos atributos', 'Una entidad que no tiene clave primaria propia y depende de otra', 'Una entidad con cardinalidad 1:1', 'Una entidad sin relaciones'], ans: 1,
      exp: 'Una <strong>entidad débil</strong> no tiene identificador propio; depende de una entidad propietaria. Se representa con doble rectángulo. Ej: LÍNEA_PEDIDO depende de PEDIDO.' },
    { q: 'En una relación N:M, ¿qué se genera al pasar al modelo relacional?', hint: 'Necesita una tabla extra.',
      opts: ['Una clave foránea en una de las tablas', 'Una tabla intermedia con las dos claves foráneas', 'Nada, se resuelve con un atributo multivaluado', 'Una vista'], ans: 1,
      exp: 'Una relación <strong>N:M</strong> genera una <strong>tabla intermedia</strong> (tabla de unión) con las claves primarias de ambas entidades como clave primaria compuesta.' },
    { q: '¿Qué tipo de atributo se calcula a partir de otros atributos?', hint: 'No se almacena directamente.',
      opts: ['Atributo compuesto', 'Atributo multivaluado', 'Atributo derivado', 'Atributo clave'], ans: 2,
      exp: 'Un <strong>atributo derivado</strong> se calcula a partir de otros (ej: edad a partir de fecha_nacimiento). Se representa con elipse de línea punteada.' },
    { q: 'En cardinalidad 1:N entre DEPARTAMENTO y EMPLEADO, ¿dónde va la clave foránea?', hint: 'La FK va en el lado N.',
      opts: ['En DEPARTAMENTO', 'En EMPLEADO', 'En una tabla intermedia', 'En ambas tablas'], ans: 1,
      exp: 'La <strong>clave foránea va en el lado N</strong> (muchos). EMPLEADO tiene dept_id que referencia a DEPARTAMENTO. Un departamento tiene muchos empleados, pero cada empleado pertenece a un departamento.' }
  ]},

  norm_quiz: { title: 'Quiz: Normalización', questions: [
    { q: '¿Qué condición debe cumplir una tabla para estar en 1FN?', hint: 'Sobre los valores de las columnas.',
      opts: ['No tener dependencias transitivas', 'Todos los atributos deben ser atómicos (indivisibles)', 'Todos los atributos deben depender de la clave completa', 'No tener claves compuestas'], ans: 1,
      exp: '<strong>1FN</strong>: todos los valores deben ser atómicos. No puede haber listas, conjuntos o grupos repetitivos en una columna.' },
    { q: 'Una tabla tiene PK compuesta (A,B). El atributo C depende solo de A. ¿Qué viola?', hint: 'Dependencia de parte de la clave.',
      opts: ['1FN', '2FN', '3FN', 'No viola ninguna forma normal'], ans: 1,
      exp: 'Viola <strong>2FN</strong>: hay una <strong>dependencia parcial</strong>. C depende solo de A (parte de la PK), no de la clave completa (A,B). Solución: mover A y C a otra tabla.' },
    { q: 'En una tabla: id → cod_postal → ciudad. ¿Qué viola?', hint: 'Dependencia a través de un atributo no clave.',
      opts: ['1FN', '2FN', '3FN', 'No viola nada'], ans: 2,
      exp: 'Viola <strong>3FN</strong>: hay una <strong>dependencia transitiva</strong>. ciudad depende de cod_postal (no clave), que a su vez depende de id. Solución: separar cod_postal y ciudad en otra tabla.' },
    { q: '¿Cuál es el objetivo principal de la normalización?', hint: 'Sobre la redundancia.',
      opts: ['Aumentar la velocidad de las consultas', 'Reducir la redundancia y evitar anomalías de actualización', 'Eliminar todas las claves foráneas', 'Combinar todas las tablas en una sola'], ans: 1,
      exp: 'La <strong>normalización</strong> reduce la redundancia de datos y evita anomalías de inserción, actualización y borrado. Puede reducir el rendimiento (más JOINs), pero mejora la integridad.' }
  ]},

  proc_quiz: { title: 'Quiz: Programación en BD', questions: [
    { q: '¿Cómo se llama un procedimiento almacenado en MySQL?', hint: 'Palabra clave específica.',
      opts: ['EXECUTE proc()', 'RUN proc()', 'CALL proc()', 'INVOKE proc()'], ans: 2,
      exp: '<strong>CALL nombre_procedimiento(params)</strong> es la sintaxis para ejecutar un procedimiento en MySQL.' },
    { q: '¿Qué diferencia fundamental hay entre función y procedimiento?', hint: 'Sobre el valor de retorno.',
      opts: ['Los procedimientos son más rápidos', 'Las funciones siempre devuelven un valor; los procedimientos no devuelven valor directamente', 'Las funciones se llaman con CALL', 'No hay diferencia'], ans: 1,
      exp: '<strong>Función</strong>: siempre devuelve un valor con RETURN, se usa en SELECT. <strong>Procedimiento</strong>: no devuelve valor directamente (puede usar parámetros OUT), se llama con CALL.' },
    { q: '¿Para qué sirve DELIMITER en MySQL?', hint: 'Relacionado con el punto y coma.',
      opts: ['Separar columnas en CSV', 'Cambiar el carácter de fin de comando para escribir bloques con ; internos', 'Definir el separador decimal', 'Crear un nuevo esquema'], ans: 1,
      exp: '<strong>DELIMITER //</strong> cambia el terminador de comandos de ; a // para poder escribir procedimientos que contienen ; internamente sin que MySQL los ejecute prematuramente.' },
    { q: '¿Qué variable del sistema debe estar ON para que funcionen los eventos programados?', hint: 'Nombre específico de MySQL.',
      opts: ['event_runner', 'scheduler_on', 'event_scheduler', 'timer_active'], ans: 2,
      exp: '<strong>event_scheduler = ON</strong> debe estar activado para que los eventos creados con CREATE EVENT se ejecuten automáticamente.' },
    { q: 'En un trigger AFTER UPDATE, ¿cómo accedes al valor ANTERIOR de una columna?', hint: 'Palabra clave especial.',
      opts: ['PREV.columna', 'OLD.columna', 'BEFORE.columna', 'ORIGINAL.columna'], ans: 1,
      exp: '<strong>OLD.columna</strong> contiene el valor antes del UPDATE. <strong>NEW.columna</strong> contiene el valor nuevo. En DELETE solo existe OLD; en INSERT solo existe NEW.' }
  ]},

  practica_30: { title: 'Simulacro Práctico: 30 Preguntas', questions: [
    { q: '[CASO FESTIVAL] En la tabla ACTUACIONES(id_artista, id_escenario, hora_inicio, duracion), la PK es (id_artista, id_escenario, hora_inicio). ¿Qué evita?', hint: 'Piensa en el escenario.',
      opts: ['Que un artista actúe en dos sitios', 'Que dos artistas actúen en el mismo sitio a la vez', 'Superar la capacidad', 'Nombres repetidos'], ans: 1,
      exp: 'Evita solapamientos de artistas en el mismo lugar y tiempo.' },
    { q: '[CASO FESTIVAL] ¿Consulta para ver escenarios vacíos (sin actuaciones)?', hint: 'Usa JOIN.',
      opts: ['NOT IN', 'LEFT JOIN ... WHERE A.id IS NULL', 'INNER JOIN <>', 'DELETE'], ans: 1,
      exp: 'El LEFT JOIN con filtro NULL encuentra registros sin relación.' },
    { q: '[CASO FESTIVAL] SELECT genero, COUNT(*) FROM ARTISTAS GROUP BY genero HAVING COUNT(*) > 5. ¿Qué hace?', hint: 'HAVING filtra grupos.',
      opts: ['Top 5 géneros', 'Artistas de 5 géneros', 'Géneros con > 5 artistas', 'Error'], ans: 2,
      exp: 'HAVING filtra los grupos resultantes del COUNT.' },
    { q: '[CASO FESTIVAL] redes_sociales = "Insta: @a, Tw: @b". ¿Qué viola?', hint: 'Valores atómicos.',
      opts: ['1FN', '2FN', '3FN', 'Nada'], ans: 0,
      exp: 'Viola 1FN: los valores no son atómicos.' },
    { q: '[CASO FESTIVAL] INSERT de artista inexistente con FK activa. ¿Resultado?', hint: 'Integridad referencial.',
      opts: ['Se crea solo', 'Alerta', 'Error de Integridad Referencial', 'Inserta NULL'], ans: 2,
      exp: 'La FK impide insertar claves que no existen en la tabla maestra.' },
    { q: '[CASO TIENDA] Subir 10% precio a "Electrónica". ¿Consulta correcta?', hint: 'UPDATE + subconsulta.',
      opts: ['UPDATE ... + 10', 'UPDATE ... * 1.10 WHERE id_cat = (SELECT...)', 'ALTER...', 'SELECT...'], ans: 1,
      exp: 'Usa subconsulta para identificar la categoría y multiplica por 1.10.' },
    { q: '[CASO TIENDA] num_linea empieza en 1 para cada pedido. ¿Qué es?', hint: 'Depende del padre.',
      opts: ['Entidad Fuerte', 'Entidad Débil', 'Atributo multivaluado', 'Recursiva'], ans: 1,
      exp: 'Es entidad débil porque depende de la identificación del pedido.' },
    { q: '[CASO TIENDA] ¿Qué hace SELECT SUM(precio * stock)?', hint: 'Valor total.',
      opts: ['Más caro', 'Valor total inventario', 'Total productos', 'Error'], ans: 1,
      exp: 'Suma el valor (precio * stock) de todos los productos.' },
    { q: '[CASO TIENDA] ROLLBACK tras fallo de pago. ¿Qué pasa con el stock?', hint: 'Deshacer.',
      opts: ['Queda en 0', 'Vuelve a su valor anterior', 'Manual', 'Desaparece'], ans: 1,
      exp: 'ROLLBACK revierte todos los cambios de la transacción.' },
    { q: '[CASO TIENDA] DELETE FROM PRODUCTOS sin WHERE. ¿Riesgo?', hint: 'Todo.',
      opts: ['Borra estructura', 'Pide confirmación', 'Borra TODOS los datos', 'Solo el primero'], ans: 2,
      exp: 'Sin WHERE, DELETE afecta a toda la tabla.' },
    { q: '[CASO ESCUELA] Alumno+Asignatura es PK. Nombre_Alumno depende solo de Alumno. ¿Problema?', hint: 'Dependencia parcial.',
      opts: ['Transitiva', 'Redundancia (viola 2FN)', 'Falta PK', 'Nombres'], ans: 1,
      exp: 'Viola 2FN por dependencia parcial (el nombre depende solo de parte de la PK).' },
    { q: '[CASO ESCUELA] Alumnos con nota entre 5 y 7 inclusive.', hint: 'Operador de rango.',
      opts: ['> 5 AND < 7', 'IN (5,6,7)', 'BETWEEN 5 AND 7', '= 5 OR 7'], ans: 2,
      exp: 'BETWEEN es inclusivo y más eficiente.' },
    { q: '[CASO ESCUELA] Trigger BEFORE para validar nota > 10. ¿Por qué BEFORE?', hint: 'Antes del disco.',
      opts: ['AFTER no cancela', 'Más rápido', 'Ya está en tabla', 'Indiferente'], ans: 0,
      exp: 'BEFORE permite abortar la operación antes de guardar.' },
    { q: '[CASO ESCUELA] WHERE nombre LIKE "_a%". ¿Qué busca?', hint: 'Segunda letra.',
      opts: ['Empieza por A', 'A en segunda posición', 'Dos letras', 'Termina en A'], ans: 1,
      exp: 'El _ representa un carácter cualquiera.' },
    { q: '[CASO ESCUELA] Relación (1,1) a (0,1) entre PROFESOR y DESPACHO.', hint: 'Opcionalidad.',
      opts: ['Todos tienen', 'Opcional para el despacho', 'Muchos despachos', 'Obligatorio'], ans: 1,
      exp: 'Indica que el despacho puede no tener profesor asignado.' },
    { q: '[CASO SQL] 10 emp en A, 5 en B. SELECT * FROM EMP, DEP (sin JOIN).', hint: 'Producto.',
      opts: ['15 filas', '10 filas', '50 filas', 'Error'], ans: 2,
      exp: 'Sin JOIN se produce un producto cartesiano (10*5).' },
    { q: '[CASO SQL] Diferencia COUNT(*) vs COUNT(comision).', hint: 'NULLs.',
      opts: ['Iguales', 'COUNT(*) todo; COUNT(com) ignora NULLs', 'Rapidez', 'PK'], ans: 1,
      exp: 'COUNT(columna) ignora los valores nulos.' },
    { q: '[CASO SQL] Índice UNIQUE en DNI con 1M filas.', hint: 'Lectura/Escritura.',
      opts: ['Búsqueda en ms / escritura lenta', 'Todo rápido', 'Menos espacio', 'Nombres'], ans: 0,
      exp: 'Acelera lecturas pero añade carga en escrituras.' },
    { q: '[CASO SQL] SELECT "2" + "2" en MySQL.', hint: 'Aritmética.',
      opts: ['"22"', '4', 'Error', '"2+2"'], ans: 1,
      exp: 'Convierte implícitamente a número y suma.' },
    { q: '[CASO SQL] Insertas BCN. ¿Aparece en VISTA_MADRID?', hint: 'Filtro.',
      opts: ['Sí', 'No, no cumple filtro', 'Tras refrescar', 'Error'], ans: 1,
      exp: 'Las vistas solo muestran datos que cumplen su consulta.' },
    { q: '[CASO SEGURIDAD] GRANT SELECT ON clientes TO "juan".', hint: 'Solo lectura.',
      opts: ['Ver y modificar', 'Solo ver', 'Borrar', 'Dar permisos'], ans: 1,
      exp: 'SELECT solo otorga permisos de lectura.' },
    { q: '[CASO SEGURIDAD] Obtener fecha y hora actual.', hint: 'Timestamp.',
      opts: ['GET DATE', 'NOW()', 'TODAY', 'CLOCK'], ans: 1,
      exp: 'NOW() devuelve el timestamp actual del sistema.' },
    { q: '[CASO DISEÑO] Relación Recursiva es:', hint: 'Uno mismo.',
      opts: ['Tablas mismo nombre', 'Entidad con sí misma', 'PK=FK', 'Repetidos'], ans: 1,
      exp: 'Asocia instancias de la misma entidad (ej: jefe/empleado).' },
    { q: '[CASO PRÁCTICO] Vaciar LOGS (1GB) rápido.', hint: 'DDL vs DML.',
      opts: ['DELETE', 'DROP/CREATE', 'TRUNCATE', 'VACUUM'], ans: 2,
      exp: 'TRUNCATE es instantáneo al no loguear borrados individuales.' },
    { q: '[CASO SQL] Orden alfabético inverso.', hint: 'DESC.',
      opts: ['SORT', 'ORDER BY ... DESC', 'GROUP BY DESC', 'ARRANGE'], ans: 1,
      exp: 'ORDER BY con el modificador DESC ordena descendente.' },
    { q: '[CASO NORMALIZACIÓN] Sede -> Ciudad -> País.', hint: 'Transitiva.',
      opts: ['1FN', '2FN', '3FN', 'BCNF'], ans: 2,
      exp: 'Viola 3FN por dependencia transitiva entre atributos no clave.' },
    { q: '[CASO SQL] NULL = NULL.', hint: 'UNKNOWN.',
      opts: ['TRUE', 'FALSE', 'UNKNOWN/NULL', 'Error'], ans: 2,
      exp: 'NULL no es comparable; se debe usar IS NULL.' },
    { q: '[CASO DISEÑO] Borras padre y mueren hijos.', hint: 'Cascada.',
      opts: ['RESTRICT', 'SET NULL', 'CASCADE', 'NO ACTION'], ans: 2,
      exp: 'CASCADE propaga el borrado a los dependientes.' }
  ]},
  sql_40_quiz: { title: 'Batería SQL: 40 Preguntas de Consultas', questions: [
    { q: '1. ¿Cómo seleccionarías todos los campos de la tabla "usuarios"?', hint: 'Usa el comodín universal.',
      opts: ['SELECT ALL FROM usuarios;', 'SELECT * FROM usuarios;', 'SELECT usuarios.*;', 'GET * FROM usuarios;'], ans: 1,
      exp: '<strong>SELECT *</strong> es la sintaxis estándar para obtener todas las columnas de una tabla.' },
    { q: '2. ¿Cómo obtendrías solo los nombres de la tabla "clientes"?', hint: 'Especifica la columna.',
      opts: ['SELECT nombre FROM clientes;', 'SELECT * FROM clientes WHERE nombre;', 'GET nombre FROM clientes;', 'SELECT clientes(nombre);'], ans: 0,
      exp: 'Para seleccionar columnas específicas, pon sus nombres separados por comas después del SELECT.' },
    { q: '3. Seleccionar usuarios cuyo nombre sea exactamente "Juan".', hint: 'Usa la cláusula de filtrado.',
      opts: ["SELECT * FROM usuarios WHERE nombre LIKE 'Juan';", "SELECT * FROM usuarios WHERE nombre = 'Juan';", "SELECT * FROM usuarios IF nombre == 'Juan';", "SELECT Juan FROM usuarios;"], ans: 1,
      exp: 'Para comparaciones exactas de texto, el operador estándar es <strong>=</strong>. LIKE se usa para patrones con comodines.' },
    { q: '4. Seleccionar productos con un precio entre 10 y 20 (ambos inclusive).', hint: 'Operador de rango.',
      opts: ['SELECT * FROM productos WHERE precio > 10 AND < 20;', 'SELECT * FROM productos WHERE precio BETWEEN 10 AND 20;', 'SELECT * FROM productos WHERE precio IN (10, 20);', 'SELECT * FROM productos WHERE precio FROM 10 TO 20;'], ans: 1,
      exp: '<strong>BETWEEN</strong> es inclusivo y más limpio que usar >= y <=.' },
    { q: '5. ¿Cómo seleccionarías nombres que empiecen por la letra "A"?', hint: 'Comodín %.',
      opts: ["SELECT * FROM usuarios WHERE nombre LIKE 'A%';", "SELECT * FROM usuarios WHERE nombre LIKE '%A';", "SELECT * FROM usuarios WHERE nombre = 'A*';", "SELECT * FROM usuarios WHERE nombre STARTS 'A';"], ans: 0,
      exp: "<strong>'A%'</strong> significa: empieza por A y sigue con cualquier cosa. <strong>'%A'</strong> significaría que termina en A." },
    { q: '6. Obtener empleados del departamento 5 ordenados por sueldo de mayor a menor.', hint: 'Cláusulas WHERE y ORDER BY.',
      opts: ['SELECT * FROM empleados WHERE dep=5 SORT BY sueldo DESC;', 'SELECT * FROM empleados ORDER BY sueldo DESC WHERE dep=5;', 'SELECT * FROM empleados WHERE dep=5 ORDER BY sueldo DESC;', 'SELECT * FROM empleados WHERE dep=5 ORDER BY sueldo ASC;'], ans: 2,
      exp: 'El orden correcto es siempre: <strong>FROM > WHERE > ORDER BY</strong>. DESC indica orden descendente (mayor a menor).' },
    { q: '7. ¿Cómo contarías el número total de registros en la tabla "pedidos"?', hint: 'Función de agregado.',
      opts: ['SELECT SUM(*) FROM pedidos;', 'SELECT COUNT(*) FROM pedidos;', 'SELECT TOTAL(*) FROM pedidos;', 'SELECT * FROM pedidos COUNT;'], ans: 1,
      exp: '<strong>COUNT(*)</strong> cuenta todas las filas, incluyendo las que tengan valores NULL en alguna columna.' },
    { q: '8. Obtener la media de edad de los alumnos.', hint: 'Promedio.',
      opts: ['SELECT MEDIA(edad) FROM alumnos;', 'SELECT AVG(edad) FROM alumnos;', 'SELECT SUM(edad)/COUNT(*) FROM alumnos;', 'B y C son correctas.'], ans: 3,
      exp: '<strong>AVG</strong> es la función estándar para la media, pero matemáticamente SUM/COUNT también lo calcula (aunque AVG es preferible).' },
    { q: '9. Seleccionar clientes que NO tengan asignado un correo electrónico.', hint: 'Manejo de nulos.',
      opts: ["SELECT * FROM clientes WHERE email = NULL;", "SELECT * FROM clientes WHERE email IS EMPTY;", "SELECT * FROM clientes WHERE email IS NULL;", "SELECT * FROM clientes WHERE email NOT EXISTS;"], ans: 2,
      exp: 'Para detectar nulos no se usa el igual (=), se debe usar obligatoriamente el operador <strong>IS NULL</strong>.' },
    { q: '10. ¿Cómo insertarías un nuevo registro en "alumnos"?', hint: 'DML de inserción.',
      opts: ["INSERT INTO alumnos VALUES (1, 'Pepe');", "ADD INTO alumnos (1, 'Pepe');", "INSERT (1, 'Pepe') INTO alumnos;", "UPDATE alumnos ADD (1, 'Pepe');"], ans: 0,
      exp: '<strong>INSERT INTO</strong> es el comando para añadir datos. Si no especificas columnas, debes poner valores para todas en el orden de la tabla.' },
    { q: '11. Actualizar el sueldo a 2000 para el empleado con id=7.', hint: 'Modificación de datos.',
      opts: ["UPDATE empleados SET sueldo=2000;", "UPDATE empleados SET sueldo=2000 WHERE id=7;", "MODIFY empleados sueldo=2000 WHERE id=7;", "SET sueldo=2000 FROM empleados WHERE id=7;"], ans: 1,
      exp: '¡Cuidado! Sin el <strong>WHERE</strong>, actualizarías el sueldo a TODOS los empleados de la tabla.' },
    { q: '12. Eliminar de la tabla "logs" los registros anteriores al año 2020.', hint: 'Borrado con filtro.',
      opts: ["DROP FROM logs WHERE fecha < '2020-01-01';", "DELETE FROM logs WHERE fecha < '2020-01-01';", "TRUNCATE logs WHERE fecha < '2020-01-01';", "REMOVE FROM logs WHERE fecha < '2020-01-01';"], ans: 1,
      exp: '<strong>DELETE</strong> borra filas. DROP borra la tabla entera. TRUNCATE vacía la tabla pero no admite WHERE.' },
    { q: '13. ¿Qué JOIN usarías para ver todos los departamentos, aunque no tengan empleados asignados?', hint: 'Piensa en la tabla principal.',
      opts: ['INNER JOIN', 'LEFT JOIN (si Dept es la tabla izquierda)', 'CROSS JOIN', 'A y B son correctas'], ans: 1,
      exp: 'El <strong>LEFT JOIN</strong> asegura que aparezcan todas las filas de la tabla izquierda aunque no haya coincidencias en la derecha.' },
    { q: '14. Obtener el sueldo máximo de cada departamento.', hint: 'Agrupación.',
      opts: ['SELECT dep, MAX(sueldo) FROM empleados;', 'SELECT dep, MAX(sueldo) FROM empleados GROUP BY dep;', 'SELECT dep, MAX(sueldo) FROM empleados ORDER BY dep;', 'SELECT MAX(sueldo) FROM empleados GROUP BY sueldo;'], ans: 1,
      exp: 'Cuando usas una función de agregado (MAX) junto a una columna normal (dep), es obligatorio usar <strong>GROUP BY</strong>.' },
    { q: '15. Filtrar los departamentos cuya suma de sueldos sea mayor a 5000.', hint: 'Filtro sobre grupos.',
      opts: ['SELECT dep FROM empleados WHERE SUM(sueldo) > 5000 GROUP BY dep;', 'SELECT dep FROM empleados GROUP BY dep WHERE SUM(sueldo) > 5000;', 'SELECT dep FROM empleados GROUP BY dep HAVING SUM(sueldo) > 5000;', 'SELECT dep FROM empleados HAVING SUM(sueldo) > 5000;'], ans: 2,
      exp: '<strong>HAVING</strong> es el "WHERE de los grupos". Se usa para filtrar resultados de funciones de agregado después del GROUP BY.' },
    { q: '16. Obtener nombres únicos de la tabla "visitas" (sin repetir).', hint: 'Eliminar duplicados.',
      opts: ['SELECT UNIQUE nombre FROM visitas;', 'SELECT DISTINCT nombre FROM visitas;', 'SELECT nombre FROM visitas GROUP BY ALL;', 'SELECT DISTINCT * FROM visitas;'], ans: 1,
      exp: '<strong>DISTINCT</strong> elimina filas duplicadas del resultado final de la consulta.' },
    { q: '17. ¿Cómo limitarías el resultado a solo las 5 primeras filas?', hint: 'Cláusula de límite.',
      opts: ['SELECT * FROM tabla TOP 5;', 'SELECT TOP 5 * FROM tabla;', 'SELECT * FROM tabla LIMIT 5;', 'B y C dependen del motor (SQL Server vs MySQL)'], ans: 3,
      exp: 'En MySQL/PostgreSQL se usa <strong>LIMIT</strong> al final. En SQL Server se usa <strong>TOP</strong> al principio. Ambas son lógicas válidas según el entorno.' },
    { q: '18. Seleccionar empleados cuyo nombre contenga la palabra "perez" en cualquier posición.', hint: 'Comodines en ambos lados.',
      opts: ["WHERE nombre LIKE 'perez%';", "WHERE nombre LIKE '%perez';", "WHERE nombre LIKE '%perez%';", "WHERE nombre = '*perez*';"], ans: 2,
      exp: "<strong>'%texto%'</strong> busca el patrón sin importar qué haya antes o después." },
    { q: '19. ¿Cuál es el operador correcto para buscar un valor en una lista (ej: id 1, 3 o 5)?', hint: 'Operador de conjunto.',
      opts: ['WHERE id IN (1, 3, 5)', 'WHERE id BETWEEN (1, 5)', 'WHERE id = (1, 3, 5)', 'WHERE id ANY (1, 3, 5)'], ans: 0,
      exp: '<strong>IN</strong> permite comparar una columna contra una lista de valores o el resultado de una subconsulta.' },
    { q: '20. ¿Cómo verías los empleados que SÍ tienen departamento (que no es nulo)?', hint: 'Lo contrario de IS NULL.',
      opts: ['WHERE dep != NULL', 'WHERE dep IS NOT NULL', 'WHERE dep NOT IS NULL', 'WHERE dep EXISTS'], ans: 1,
      exp: 'La sintaxis correcta es <strong>IS NOT NULL</strong>. El operador != no funciona con valores nulos.' },
    { q: '21. Crear una tabla llamada "test" con una columna "id" entera.', hint: 'Lenguaje DDL.',
      opts: ['NEW TABLE test (id INT);', 'CREATE TABLE test (id INT);', 'ADD TABLE test (id INT);', 'MAKE TABLE test (id INT);'], ans: 1,
      exp: '<strong>CREATE TABLE</strong> es el comando estándar de definición para crear nuevas estructuras.' },
    { q: '22. Eliminar la columna "edad" de la tabla "usuarios".', hint: 'Modificar estructura.',
      opts: ['ALTER TABLE usuarios DROP COLUMN edad;', 'ALTER TABLE usuarios DELETE edad;', 'MODIFY TABLE usuarios DROP edad;', 'UPDATE usuarios REMOVE edad;'], ans: 0,
      exp: 'Para cambios estructurales usamos <strong>ALTER TABLE</strong> combinado con la acción necesaria (ADD, DROP, MODIFY).' },
    { q: '23. ¿Qué devuelve un INNER JOIN entre A y B?', hint: 'Intersección.',
      opts: ['Todo A y solo lo que coincida de B', 'Solo las filas que tengan coincidencia en AMBAS tablas', 'Todo B y solo lo que coincida de A', 'Todas las combinaciones posibles'], ans: 1,
      exp: 'El <strong>INNER JOIN</strong> es la intersección pura: si una fila no tiene pareja en la otra tabla, no aparece en el resultado.' },
    { q: '24. ¿Para qué sirve el operador AS?', hint: 'Nombre temporal.',
      opts: ['Para comparar cadenas', 'Para crear un alias (nombre temporal) para una columna o tabla', 'Para ordenar ascendente', 'Para unir dos consultas'], ans: 1,
      exp: '<strong>AS</strong> permite renombrar columnas en el resultado o dar nombres cortos a las tablas para facilitar los JOINs.' },
    { q: '25. Unir dos consultas eliminando duplicados.', hint: 'Operación de conjuntos.',
      opts: ['UNION', 'UNION ALL', 'JOIN', 'CONCAT'], ans: 0,
      exp: '<strong>UNION</strong> combina los resultados de dos SELECTs y realiza un "distinct" implícito. <strong>UNION ALL</strong> es más rápido pero mantiene duplicados.' },
    { q: '26. ¿Qué función usarías para obtener el total de la suma de una columna numérica?', hint: 'Sumatorio.',
      opts: ['COUNT()', 'ADD()', 'SUM()', 'TOTAL()'], ans: 2,
      exp: '<strong>SUM()</strong> devuelve la suma total de los valores de la columna. Ignora los valores NULL.' },
    { q: '27. ¿Cómo seleccionarías empleados cuyo nombre tenga exactamente 5 letras?', hint: 'Comodín de un solo carácter.',
      opts: ["LIKE '_____' (5 guiones bajos)", "LIKE '%%%%%' (5 porcentajes)", "LENGTH(nombre) = 5", "A y C son correctas"], ans: 3,
      exp: "En SQL, el guion bajo <strong>_</strong> representa exactamente UN carácter. La función <strong>LENGTH</strong> (o LEN) también sirve para filtrar por longitud." },
    { q: '28. ¿Qué comando vacía una tabla por completo pero mantiene su estructura?', hint: 'Más rápido que DELETE.',
      opts: ['DROP TABLE', 'VACUUM TABLE', 'TRUNCATE TABLE', 'DELETE *'], ans: 2,
      exp: '<strong>TRUNCATE</strong> es una operación de bajo nivel que vacía la tabla rápidamente. No se puede deshacer con Rollback en muchos motores.' },
    { q: '29. Obtener los 3 productos más caros.', hint: 'Combinar ORDER BY y LIMIT.',
      opts: ['SELECT * FROM productos ORDER BY precio ASC LIMIT 3;', 'SELECT * FROM productos ORDER BY precio DESC LIMIT 3;', 'SELECT * FROM productos LIMIT 3 ORDER BY precio DESC;', 'SELECT TOP 3 * FROM productos ORDER BY precio ASC;'], ans: 1,
      exp: 'Primero ordenas de mayor a menor (<strong>DESC</strong>) y luego te quedas con los primeros (<strong>LIMIT 3</strong>).' },
    { q: '30. ¿Qué hace el comando ROLLBACK?', hint: 'Transacciones.',
      opts: ['Guarda los cambios', 'Deshace los cambios de la transacción actual', 'Reinicia el servidor', 'Borra la base de datos'], ans: 1,
      exp: '<strong>ROLLBACK</strong> permite volver al estado anterior al inicio de la transacción si algo ha fallado.' },
    { q: '31. Seleccionar registros donde la ciudad sea "Madrid" o "Barcelona".', hint: 'Múltiples condiciones.',
      opts: ["WHERE ciudad = 'Madrid' AND 'Barcelona'", "WHERE ciudad IN ('Madrid', 'Barcelona')", "WHERE ciudad = 'Madrid' OR 'Barcelona'", "A y B son correctas"], ans: 1,
      exp: '<strong>IN</strong> es la forma correcta. El "OR" requeriría repetir la columna: <code>ciudad = \'Madrid\' OR ciudad = \'Barcelona\'</code>.' },
    { q: '32. ¿Qué JOIN devuelve el producto cartesiano?', hint: 'Todas las combinaciones.',
      opts: ['LEFT JOIN', 'FULL JOIN', 'CROSS JOIN', 'INNER JOIN'], ans: 2,
      exp: 'El <strong>CROSS JOIN</strong> combina cada fila de la primera tabla con todas las filas de la segunda (filasA * filasB).' },
    { q: '33. ¿Cómo se llama una tabla que se relaciona con sí misma?', hint: 'Jerarquías.',
      opts: ['Relación circular', 'Relación recursiva o Self-Join', 'Relación espejo', 'Relación débil'], ans: 1,
      exp: 'Se usa típicamente para empleados y sus jefes (que también son empleados).' },
    { q: '34. ¿Qué comando otorga permisos a un usuario?', hint: 'Lenguaje DCL.',
      opts: ['ALLOW', 'GIVE', 'GRANT', 'PERMIT'], ans: 2,
      exp: '<strong>GRANT</strong> (DCL) se usa para dar privilegios de acceso o manipulación a los usuarios de la BD.' },
    { q: '35. ¿Para qué sirve el comando COMMIT?', hint: 'Transacciones.',
      opts: ['Finalizar la conexión', 'Confirmar y guardar permanentemente los cambios', 'Cerrar la tabla', 'Limpiar la memoria'], ans: 1,
      exp: '<strong>COMMIT</strong> hace que todos los cambios realizados en la transacción sean definitivos y visibles para los demás.' },
    { q: '36. Seleccionar alumnos cuya nota esté fuera del rango 5-10.', hint: 'Negación.',
      opts: ['WHERE nota NOT BETWEEN 5 AND 10', 'WHERE nota < 5 OR nota > 10', 'WHERE nota != 5-10', 'A y B son correctas'], ans: 3,
      exp: 'Ambas opciones son lógicamente equivalentes para encontrar valores fuera de un rango inclusivo.' },
    { q: '37. ¿Qué función devuelve la fecha actual en MySQL?', hint: 'Función de tiempo.',
      opts: ['GETDATE()', 'CURRENT_DATE()', 'NOW()', 'B y C son correctas'], ans: 3,
      exp: '<strong>NOW()</strong> devuelve fecha y hora, <strong>CURRENT_DATE</strong> solo la fecha. Ambas son comunes en MySQL.' },
    { q: '38. ¿Qué cláusula se ejecuta PRIMERO en una consulta?', hint: 'Orden de procesamiento.',
      opts: ['SELECT', 'FROM', 'WHERE', 'ORDER BY'], ans: 1,
      exp: 'El motor necesita saber primero de dónde sacar los datos (<strong>FROM</strong>) antes de filtrarlos o seleccionarlos.' },
    { q: '39. ¿Qué significa ACID en bases de datos?', hint: 'Propiedades de transacciones.',
      opts: ['Atomicidad, Consistencia, Aislamiento y Durabilidad', 'Acceso, Control, Integridad y Datos', 'Almacenamiento, Consulta, Índice y Diseño', 'Es un comando de limpieza'], ans: 0,
      exp: 'Son las 4 propiedades fundamentales que garantizan que una transacción se procese de forma fiable.' },
    { q: '40. ¿Cómo eliminarías la base de datos completa llamada "empresa"?', hint: '¡Peligro extremo!',
      opts: ['DELETE DATABASE empresa;', 'REMOVE DATABASE empresa;', 'DROP DATABASE empresa;', 'TRUNCATE DATABASE empresa;'], ans: 2,
      exp: '<strong>DROP DATABASE</strong> elimina el esquema completo y todas las tablas y datos que contiene. ¡Úsalo con cuidado!' }
  ]}
};

// =============================================
// DRAG EXERCISES
// =============================================
const DRAG_EXERCISES = {
  clasifica_sql: { title: 'Clasifica el Comando SQL', description: 'Arrastra cada comando a su categoría correcta (DDL, DML, DCL o TCL).',
    exercises: [
      { scenario: 'CREATE TABLE empleados (...)', chips: ['DDL', 'DML', 'DCL', 'TCL'], answer: 'DDL', explanation: 'CREATE es DDL (Data Definition Language): define la estructura de la BD.' },
      { scenario: 'SELECT nombre FROM empleados WHERE salario > 1000', chips: ['DDL', 'DML', 'DCL', 'TCL'], answer: 'DML', explanation: 'SELECT es DML (Data Manipulation Language): manipula los datos.' },
      { scenario: 'COMMIT', chips: ['DDL', 'DML', 'DCL', 'TCL'], answer: 'TCL', explanation: 'COMMIT es TCL (Transaction Control Language): controla las transacciones.' },
      { scenario: 'DROP TABLE pedidos', chips: ['DDL', 'DML', 'DCL', 'TCL'], answer: 'DDL', explanation: 'DROP es DDL: elimina objetos de la estructura de la BD.' },
      { scenario: 'INSERT INTO clientes VALUES (...)', chips: ['DDL', 'DML', 'DCL', 'TCL'], answer: 'DML', explanation: 'INSERT es DML: inserta datos en las tablas.' },
      { scenario: 'ROLLBACK', chips: ['DDL', 'DML', 'DCL', 'TCL'], answer: 'TCL', explanation: 'ROLLBACK es TCL: deshace los cambios de la transacción actual.' }
    ]
  },
  join_tipo: { title: 'Elige el JOIN Correcto', description: 'Para cada escenario, selecciona el tipo de JOIN adecuado.',
    exercises: [
      { scenario: 'Quieres ver TODOS los empleados, incluso los que no tienen departamento asignado.', chips: ['INNER JOIN', 'LEFT JOIN', 'RIGHT JOIN', 'CROSS JOIN'], answer: 'LEFT JOIN', explanation: 'LEFT JOIN devuelve todos los registros de la tabla izquierda (empleados), con NULL donde no hay departamento.' },
      { scenario: 'Solo quieres ver los empleados que SÍ tienen departamento asignado.', chips: ['INNER JOIN', 'LEFT JOIN', 'RIGHT JOIN', 'FULL JOIN'], answer: 'INNER JOIN', explanation: 'INNER JOIN devuelve solo las filas con coincidencia en ambas tablas.' },
      { scenario: 'Quieres generar todas las combinaciones posibles de productos y colores.', chips: ['INNER JOIN', 'LEFT JOIN', 'CROSS JOIN', 'SELF JOIN'], answer: 'CROSS JOIN', explanation: 'CROSS JOIN genera el producto cartesiano: cada producto con cada color.' },
      { scenario: 'Quieres ver todos los departamentos, aunque no tengan empleados.', chips: ['INNER JOIN', 'LEFT JOIN', 'RIGHT JOIN', 'CROSS JOIN'], answer: 'RIGHT JOIN', explanation: 'RIGHT JOIN devuelve todos los registros de la tabla derecha (departamentos), con NULL donde no hay empleados.' }
    ]
  },
  cardinalidad: { title: 'Identifica la Cardinalidad', description: 'Para cada relación, selecciona la cardinalidad correcta.',
    exercises: [
      { scenario: 'Un EMPLEADO tiene exactamente un DNI, y un DNI pertenece a exactamente un empleado.', chips: ['1:1', '1:N', 'N:M', '0:N'], answer: '1:1', explanation: 'Cardinalidad 1:1: cada instancia de A se relaciona con exactamente una de B y viceversa.' },
      { scenario: 'Un DEPARTAMENTO tiene muchos EMPLEADOS, pero cada empleado pertenece a un solo departamento.', chips: ['1:1', '1:N', 'N:M', '0:N'], answer: '1:N', explanation: 'Cardinalidad 1:N: un departamento tiene muchos empleados, pero cada empleado tiene un solo departamento.' },
      { scenario: 'Un ALUMNO puede matricularse en muchas ASIGNATURAS, y una asignatura puede tener muchos alumnos.', chips: ['1:1', '1:N', 'N:M', '0:1'], answer: 'N:M', explanation: 'Cardinalidad N:M: requiere tabla intermedia (matriculas) con las dos claves foráneas.' },
      { scenario: 'Un PEDIDO tiene muchas LÍNEAS DE PEDIDO, y cada línea pertenece a un solo pedido.', chips: ['1:1', '1:N', 'N:M', 'N:N'], answer: '1:N', explanation: '1:N: un pedido tiene muchas líneas, pero cada línea pertenece a un pedido. La FK (pedido_id) va en LÍNEA_PEDIDO.' }
    ]
  },
  forma_normal: { title: 'Identifica la Forma Normal Violada', description: 'Para cada situación, indica qué forma normal se viola.',
    exercises: [
      { scenario: 'La columna "telefonos" almacena "600111222, 600333444" (varios teléfonos en una celda).', chips: ['1FN', '2FN', '3FN', 'No viola nada'], answer: '1FN', explanation: 'Viola 1FN: los valores no son atómicos. Solución: tabla separada TELEFONOS con FK al cliente.' },
      { scenario: 'PK=(alumno_id, asignatura_id). El atributo "nombre_alumno" depende solo de alumno_id.', chips: ['1FN', '2FN', '3FN', 'No viola nada'], answer: '2FN', explanation: 'Viola 2FN: dependencia parcial. nombre_alumno depende solo de parte de la PK compuesta.' },
      { scenario: 'id → cod_postal, cod_postal → ciudad. La ciudad depende del código postal, no del id.', chips: ['1FN', '2FN', '3FN', 'No viola nada'], answer: '3FN', explanation: 'Viola 3FN: dependencia transitiva. id → cod_postal → ciudad. Solución: tabla CODIGOS_POSTALES.' }
    ]
  },
  objetos_bd: { title: 'Clasifica el Objeto de BD', description: 'Arrastra cada descripción al tipo de objeto correcto.',
    exercises: [
      { scenario: 'Bloque de código SQL que se ejecuta automáticamente cuando ocurre un INSERT, UPDATE o DELETE.', chips: ['Procedimiento', 'Función', 'Trigger', 'Cursor', 'Vista'], answer: 'Trigger', explanation: 'Un TRIGGER se dispara automáticamente ante eventos DML (INSERT/UPDATE/DELETE).' },
      { scenario: 'Consulta almacenada que se comporta como una tabla virtual. No almacena datos físicamente.', chips: ['Procedimiento', 'Función', 'Trigger', 'Cursor', 'Vista'], answer: 'Vista', explanation: 'Una VISTA es una consulta guardada que se reconstruye al vuelo. No almacena datos.' },
      { scenario: 'Permite recorrer el resultado de una consulta fila a fila dentro de un procedimiento.', chips: ['Procedimiento', 'Función', 'Trigger', 'Cursor', 'Vista'], answer: 'Cursor', explanation: 'Un CURSOR permite procesar los resultados de una SELECT fila a fila secuencialmente.' },
      { scenario: 'Siempre devuelve un valor y puede usarse directamente en una sentencia SELECT.', chips: ['Procedimiento', 'Función', 'Trigger', 'Cursor', 'Vista'], answer: 'Función', explanation: 'Una FUNCIÓN siempre devuelve un valor con RETURN y se puede usar en SELECT, WHERE, etc.' }
    ]
  }
};

// =============================================
// SQL LAB — Base de datos simulada en memoria
// =============================================
const DB_SCHEMA = {
  departamentos: [
    { id: 1, nombre: 'Desarrollo', ciudad: 'Madrid', presupuesto: 150000 },
    { id: 2, nombre: 'Marketing', ciudad: 'Barcelona', presupuesto: 80000 },
    { id: 3, nombre: 'RRHH', ciudad: 'Madrid', presupuesto: 60000 },
    { id: 4, nombre: 'Ventas', ciudad: 'Valencia', presupuesto: 120000 }
  ],
  empleados: [
    { id: 1, nombre: 'Ana García', salario: 3200, dept_id: 1, fecha_alta: '2020-03-15' },
    { id: 2, nombre: 'Carlos López', salario: 2800, dept_id: 1, fecha_alta: '2021-06-01' },
    { id: 3, nombre: 'María Martínez', salario: 3500, dept_id: 2, fecha_alta: '2019-11-20' },
    { id: 4, nombre: 'Pedro Sánchez', salario: 2500, dept_id: 3, fecha_alta: '2022-01-10' },
    { id: 5, nombre: 'Laura Fernández', salario: 4000, dept_id: 1, fecha_alta: '2018-07-05' },
    { id: 6, nombre: 'Javier Ruiz', salario: 2900, dept_id: 4, fecha_alta: '2021-09-15' },
    { id: 7, nombre: 'Elena Torres', salario: 3100, dept_id: 2, fecha_alta: '2020-12-01' },
    { id: 8, nombre: 'Miguel Díaz', salario: 2600, dept_id: null, fecha_alta: '2023-02-28' }
  ],
  productos: [
    { id: 1, nombre: 'Laptop Pro', precio: 1299.99, stock: 15, categoria: 'Electrónica' },
    { id: 2, nombre: 'Ratón Inalámbrico', precio: 29.99, stock: 150, categoria: 'Periféricos' },
    { id: 3, nombre: 'Monitor 4K', precio: 599.99, stock: 8, categoria: 'Electrónica' },
    { id: 4, nombre: 'Teclado Mecánico', precio: 89.99, stock: 45, categoria: 'Periféricos' },
    { id: 5, nombre: 'Auriculares BT', precio: 149.99, stock: 30, categoria: 'Audio' }
  ]
};

const SQL_LABS = {
  select_lab: {
    title: 'Lab SQL: Consultas SELECT',
    description: 'Practica consultas SELECT sobre la base de datos de empleados y departamentos.',
    exercises: [
      { id: 1, title: 'Selección básica', desc: 'Muestra el nombre y salario de todos los empleados, ordenados por salario de mayor a menor.',
        hint: 'Usa ORDER BY salario DESC', solution: 'SELECT nombre, salario FROM empleados ORDER BY salario DESC',
        validate: (rows) => rows.length === 8 && rows[0].salario >= rows[rows.length-1].salario },
      { id: 2, title: 'Filtro con WHERE', desc: 'Muestra los empleados del departamento 1 (Desarrollo) con salario mayor a 3000.',
        hint: 'Combina dos condiciones con AND', solution: 'SELECT * FROM empleados WHERE dept_id = 1 AND salario > 3000',
        validate: (rows) => rows.every(r => r.dept_id === 1 && r.salario > 3000) },
      { id: 3, title: 'Funciones de agregado', desc: 'Muestra el salario medio, máximo y mínimo de todos los empleados.',
        hint: 'Usa AVG(), MAX(), MIN()', solution: 'SELECT AVG(salario) AS media, MAX(salario) AS maximo, MIN(salario) AS minimo FROM empleados',
        validate: (rows) => rows.length === 1 && rows[0].media !== undefined },
      { id: 4, title: 'GROUP BY', desc: 'Muestra cuántos empleados hay en cada departamento (dept_id) y el salario medio. Solo departamentos con más de 1 empleado.',
        hint: 'Usa GROUP BY dept_id HAVING COUNT(*) > 1', solution: 'SELECT dept_id, COUNT(*) AS total, AVG(salario) AS media FROM empleados GROUP BY dept_id HAVING COUNT(*) > 1',
        validate: (rows) => rows.every(r => r.total > 1) },
      { id: 5, title: 'DISTINCT', desc: 'Muestra las ciudades únicas donde hay departamentos (sin repetir).',
        hint: 'Usa SELECT DISTINCT', solution: 'SELECT DISTINCT ciudad FROM departamentos',
        validate: (rows) => rows.length === 3 }
    ]
  },
  joins_lab: {
    title: 'Lab SQL: JOINs',
    description: 'Practica los diferentes tipos de JOIN combinando empleados y departamentos.',
    exercises: [
      { id: 1, title: 'INNER JOIN básico', desc: 'Muestra el nombre del empleado y el nombre de su departamento. Solo empleados CON departamento.',
        hint: 'JOIN empleados con departamentos usando dept_id = id', solution: 'SELECT e.nombre, d.nombre AS departamento FROM empleados e INNER JOIN departamentos d ON e.dept_id = d.id',
        validate: (rows) => rows.length === 7 && rows.every(r => r.departamento) },
      { id: 2, title: 'LEFT JOIN', desc: 'Muestra TODOS los empleados con su departamento. Los que no tienen departamento deben aparecer con NULL.',
        hint: 'LEFT JOIN incluye todos los de la tabla izquierda', solution: 'SELECT e.nombre, d.nombre AS departamento FROM empleados e LEFT JOIN departamentos d ON e.dept_id = d.id',
        validate: (rows) => rows.length === 8 },
      { id: 3, title: 'JOIN con agregado', desc: 'Muestra el nombre del departamento y el número de empleados que tiene. Incluye departamentos sin empleados.',
        hint: 'RIGHT JOIN o LEFT JOIN desde departamentos, luego COUNT', solution: 'SELECT d.nombre, COUNT(e.id) AS empleados FROM departamentos d LEFT JOIN empleados e ON d.id = e.dept_id GROUP BY d.id, d.nombre',
        validate: (rows) => rows.length === 4 },
      { id: 4, title: 'JOIN con filtro', desc: 'Muestra nombre del empleado, salario y ciudad del departamento, solo para empleados de Madrid con salario > 2800.',
        hint: 'INNER JOIN + WHERE d.ciudad = "Madrid" AND e.salario > 2800', solution: "SELECT e.nombre, e.salario, d.ciudad FROM empleados e INNER JOIN departamentos d ON e.dept_id = d.id WHERE d.ciudad = 'Madrid' AND e.salario > 2800",
        validate: (rows) => rows.every(r => r.ciudad === 'Madrid' && r.salario > 2800) }
    ]
  },
  dml_lab: {
    title: 'Lab SQL: DML (INSERT/UPDATE/DELETE)',
    description: 'Practica operaciones de modificación de datos.',
    exercises: [
      { id: 1, title: 'INSERT básico', desc: "Inserta un nuevo empleado: nombre='Sofía Vega', salario=3300, dept_id=2, fecha_alta='2024-01-15'",
        hint: 'INSERT INTO empleados (nombre, salario, dept_id, fecha_alta) VALUES (...)', solution: "INSERT INTO empleados (nombre, salario, dept_id, fecha_alta) VALUES ('Sofía Vega', 3300, 2, '2024-01-15')",
        validate: (rows, db) => db.empleados.some(e => e.nombre === 'Sofía Vega') },
      { id: 2, title: 'UPDATE con WHERE', desc: 'Sube el salario un 10% a todos los empleados del departamento 1.',
        hint: 'UPDATE empleados SET salario = salario * 1.1 WHERE dept_id = 1', solution: 'UPDATE empleados SET salario = salario * 1.1 WHERE dept_id = 1',
        validate: (rows, db) => db.empleados.filter(e => e.dept_id === 1).every(e => e._updated) },
      { id: 3, title: 'DELETE con WHERE', desc: 'Elimina los empleados que no tienen departamento asignado (dept_id IS NULL).',
        hint: 'DELETE FROM empleados WHERE dept_id IS NULL', solution: 'DELETE FROM empleados WHERE dept_id IS NULL',
        validate: (rows, db) => !db.empleados.some(e => e.dept_id === null) }
    ]
  },
  proc_lab: {
    title: 'Lab: Procedimientos y Funciones',
    description: 'Analiza y completa código de procedimientos almacenados.',
    exercises: [
      { id: 1, title: 'Identifica el error', desc: "El siguiente procedimiento tiene un error. ¿Cuál es la sintaxis correcta para llamarlo?\n\nCREATE PROCEDURE obtener_empleados(IN p_dept INT)\nBEGIN\n  SELECT * FROM empleados WHERE dept_id = p_dept;\nEND;",
        hint: 'Usa la palabra clave correcta para ejecutar procedimientos', solution: 'CALL obtener_empleados(1)',
        validate: (rows) => true },
      { id: 2, title: 'Completa el trigger', desc: "Completa la sentencia que falta. El trigger debe registrar en 'auditoria' cuando el salario cambia:\n\nCREATE TRIGGER audit_sal AFTER UPDATE ON empleados\nFOR EACH ROW\nBEGIN\n  IF OLD.salario <> NEW.salario THEN\n    INSERT INTO auditoria VALUES(OLD.id, ___.salario, ___.salario);\n  END IF;\nEND;",
        hint: 'OLD = valor anterior, NEW = valor nuevo', solution: 'OLD, NEW',
        validate: (rows) => true }
    ]
  }
};

const ER_DIAGRAMS = {
  er_diag: {
    title: 'Diagramas E-R Guiados',
    items: [
      {
        id: 'er1', title: 'E-R: Empresa con Empleados y Departamentos',
        description: 'Analiza el diagrama y responde las preguntas sobre cardinalidades y claves.',
        svg: `<svg viewBox="0 0 700 300" width="100%" style="max-width:700px">
          <defs><marker id="arr" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="#06b6d4"/></marker></defs>
          <!-- Departamento -->
          <rect x="30" y="110" width="140" height="60" rx="4" fill="#0c1e2e" stroke="#06b6d4" stroke-width="1.5"/>
          <text x="100" y="135" text-anchor="middle" fill="#67e8f9" font-family="Inter" font-size="13" font-weight="700">DEPARTAMENTO</text>
          <text x="100" y="155" text-anchor="middle" fill="#7fb8d4" font-family="JetBrains Mono" font-size="10">PK: id</text>
          <!-- Relacion -->
          <polygon points="270,140 310,110 350,140 310,170" fill="#071520" stroke="#22d3ee" stroke-width="1.5"/>
          <text x="310" y="145" text-anchor="middle" fill="#22d3ee" font-family="Inter" font-size="11" font-weight="600">tiene</text>
          <!-- Empleado -->
          <rect x="430" y="110" width="140" height="60" rx="4" fill="#0c1e2e" stroke="#06b6d4" stroke-width="1.5"/>
          <text x="500" y="135" text-anchor="middle" fill="#67e8f9" font-family="Inter" font-size="13" font-weight="700">EMPLEADO</text>
          <text x="500" y="155" text-anchor="middle" fill="#7fb8d4" font-family="JetBrains Mono" font-size="10">PK: id | FK: dept_id</text>
          <!-- Lineas -->
          <line x1="170" y1="140" x2="270" y2="140" stroke="#06b6d4" stroke-width="1.5"/>
          <line x1="350" y1="140" x2="430" y2="140" stroke="#06b6d4" stroke-width="1.5"/>
          <!-- Cardinalidades -->
          <text x="185" y="130" fill="#fbbf24" font-family="JetBrains Mono" font-size="12" font-weight="700">1</text>
          <text x="415" y="130" fill="#fbbf24" font-family="JetBrains Mono" font-size="12" font-weight="700">N</text>
          <!-- Atributos Departamento -->
          <ellipse cx="60" cy="60" rx="45" ry="20" fill="#071520" stroke="#2a4f63" stroke-width="1"/>
          <text x="60" y="65" text-anchor="middle" fill="#7fb8d4" font-family="Inter" font-size="10">nombre</text>
          <line x1="60" y1="80" x2="80" y2="110" stroke="#2a4f63" stroke-width="1"/>
          <ellipse cx="140" cy="60" rx="40" ry="20" fill="#071520" stroke="#2a4f63" stroke-width="1"/>
          <text x="140" y="65" text-anchor="middle" fill="#7fb8d4" font-family="Inter" font-size="10">ciudad</text>
          <line x1="140" y1="80" x2="120" y2="110" stroke="#2a4f63" stroke-width="1"/>
          <!-- Atributos Empleado -->
          <ellipse cx="460" cy="60" rx="45" ry="20" fill="#071520" stroke="#2a4f63" stroke-width="1"/>
          <text x="460" y="65" text-anchor="middle" fill="#7fb8d4" font-family="Inter" font-size="10">nombre</text>
          <line x1="460" y1="80" x2="470" y2="110" stroke="#2a4f63" stroke-width="1"/>
          <ellipse cx="560" cy="60" rx="40" ry="20" fill="#071520" stroke="#2a4f63" stroke-width="1"/>
          <text x="560" y="65" text-anchor="middle" fill="#7fb8d4" font-family="Inter" font-size="10">salario</text>
          <line x1="560" y1="80" x2="540" y2="110" stroke="#2a4f63" stroke-width="1"/>
          <!-- Atributo derivado -->
          <ellipse cx="640" cy="200" rx="50" ry="22" fill="#071520" stroke="#2a4f63" stroke-width="1" stroke-dasharray="4 2"/>
          <text x="640" y="205" text-anchor="middle" fill="#7fb8d4" font-family="Inter" font-size="10">antigüedad</text>
          <line x1="600" y1="200" x2="570" y2="170" stroke="#2a4f63" stroke-width="1" stroke-dasharray="4 2"/>
        </svg>`,
        questions: [
          { q: '¿Cuál es la cardinalidad de la relación DEPARTAMENTO-EMPLEADO?', opts: ['1:1', '1:N', 'N:M', '0:N'], ans: 1, exp: '1:N — un departamento tiene muchos empleados, pero cada empleado pertenece a un solo departamento.' },
          { q: '¿Qué tipo de atributo es "antigüedad" (línea punteada)?', opts: ['Atributo simple', 'Atributo compuesto', 'Atributo derivado', 'Atributo multivaluado'], ans: 2, exp: 'Atributo derivado: se calcula a partir de fecha_alta. Se representa con elipse de línea punteada.' },
          { q: '¿Dónde se coloca la clave foránea en esta relación 1:N?', opts: ['En DEPARTAMENTO', 'En EMPLEADO', 'En una tabla intermedia', 'En ambas tablas'], ans: 1, exp: 'La FK (dept_id) va en el lado N, es decir, en EMPLEADO.' }
        ]
      }
    ]
  }
};
