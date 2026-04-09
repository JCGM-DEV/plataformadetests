const STUDY_SUMMARIES_DATA = {
  "bd_tema_1": {
    "name": "Tema 1: Conceptos",
    "points": [
      "**Cuál de los siguientes formatos de archivo representa la información en una estructura tabular fija de filas y columnas**: Indexado. *Los ficheros dBASE (.dbf) son ficheros de base de datos con índices que permiten acceso directo a registros. Son ficheros indexados, no planos ni multimedia.*"
    ]
  },
  "bd_tema_2": {
    "name": "Tema 2: SQL y DDL",
    "points": [
      "**Cómo se denomina una clave primaria que incluye más de una columna de una tabla**: DROP TABLE. *DROP TABLE elimina la tabla completa: estructura y datos. ALTER TABLE modifica la estructura. DELETE borra filas (DML). TRUNCATE vacía los datos pero mantiene la estructura. Solo DROP TABLE elimina la tabla definitivamente.*"
    ]
  },
  "bd_tema_3": {
    "name": "Tema 3: Diagramas E-R",
    "points": [
      "**Qué símbolo se utiliza para representar las entidades en un diagrama ER**: Rectángulos.",
      "**Cuál es la definición de un atributo derivado**: Un atributo cuyo valor se calcula a partir de otros atributos del modelo.. *Un atributo derivado se calcula a partir de otros atributos (ej: edad a partir de fecha_nacimiento). Se representa con elipse de línea punteada. No se almacena físicamente.*",
      "**En una relación de cardinalidad 1:N entre \"Agentes\" y \"Clientes\", ¿qué se entiende**: Un agente gestiona varios clientes, pero un cliente solo es gestionado por un agente.. *En 1:N, un registro de la tabla \"1\" puede relacionarse con muchos de la tabla \"N\", pero cada registro de \"N\" solo se relaciona con uno de \"1\". La clave foránea va en el lado N.*",
      "**Cuál es una característica fundamental de una entidad débil**: Carece de identificador autosuficiente y depende de una entidad propietaria.. *Una entidad débil no tiene atributos suficientes para identificarse por sí sola. Depende de una entidad propietaria (fuerte) y se representa con doble rectángulo en el diagrama E-R.*",
      "**En el modelo E/R ampliado, ¿qué es la generalización**: El proceso de agrupar entidades con rasgos comunes en una entidad padre abstracta.. *El proceso de agrupar entidades con rasgos comunes en una entidad padre abstracta.*",
      "**Qué restricción de especialización determina si una instancia del supertipo puede pertenecer a una sola subentidad o a varias**: Disjointness (exclusividad/solapamiento).. *Disjointness (exclusividad) determina si una instancia puede pertenecer a varias subentidades (solapamiento) o solo a una (exclusividad). Completeness determina si toda instancia del supertipo debe pertenecer a alguna subentidad.*",
      "**Al pasar del modelo E/R al modelo relacional, ¿cuándo se crean normalmente las claves foráneas**: Al establecer las relaciones entre las tablas para vincular registros.. *El protocolo PAS ante emergencias: Proteger (asegurar la zona), Avisar (llamar al 112), Socorrer (prestar primeros auxilios). El orden es fundamental para no crear más víctimas.*",
      "**Qué requisito debe cumplir una tabla para estar en Primera Forma Normal (1FN)**: Que todas las columnas almacenen valores atómicos e indivisibles.. *La 1FN exige que todos los valores sean atómicos (indivisibles). No puede haber listas, conjuntos ni grupos repetitivos en una columna. Es el requisito mínimo de normalización.*",
      "**Cuándo se dice que una tabla viola la Segunda Forma Normal (2FN)**: Cuando un atributo no clave depende solo de una parte de la clave primaria (dependencia parcial).. *La 2FN requiere que todos los atributos no clave dependan de la clave primaria COMPLETA. Si hay dependencia parcial (depende solo de parte de la PK compuesta), viola la 2FN.*",
      "**Cuál es el objetivo principal de la normalización de modelos relacionales**: Reducir la redundancia de datos y asegurar un almacenamiento eficiente y coherente.. *Reducir la redundancia de datos y asegurar un almacenamiento eficiente y coherente.*"
    ]
  },
  "bd_tema_4": {
    "name": "Tema 4: Consultas SQL",
    "points": [
      "**Cuál es la cláusula necesaria para especificar la tabla de la que se extraen los datos**: FROM.",
      "**Qué operador se utiliza en la cláusula WHERE para filtrar por un rango de valores**: BETWEEN. *BETWEEN a AND b es equivalente a col >= a AND col <= b. Incluye ambos extremos. Es más legible que escribir las dos condiciones por separado.*",
      "**Para qué sirve el modificador DISTINCT en una sentencia SELECT**: Para eliminar las filas duplicadas en el conjunto de resultados.. *DISTINCT elimina filas duplicadas del resultado. Se aplica sobre todas las columnas del SELECT. Tiene un coste de rendimiento porque requiere ordenar o hashear los resultados.*",
      "**Cuál es la función de agregado que devuelve el valor máximo de una columna**: MAX(). *MAX() devuelve el valor máximo de una columna. MIN() el mínimo, SUM() la suma, AVG() la media, COUNT() el número de filas. Son funciones de agregado que operan sobre grupos de filas.*",
      "**Qué diferencia principal hay entre las cláusulas WHERE y HAVING**: WHERE filtra registros antes de la agrupación; HAVING filtra grupos después de aplicarse GROUP BY.. *GROUP BY agrupa filas con el mismo valor en las columnas especificadas. Se usa con funciones de agregado (COUNT, SUM, AVG). HAVING filtra los grupos resultantes.*",
      "**Qué tipo de JOIN devuelve todos los registros de la tabla de la izquierda, aunque no tengan correspondencia en la derecha**: LEFT JOIN. *LEFT JOIN devuelve TODAS las filas de la tabla izquierda, más las coincidentes de la derecha. Las filas sin pareja en la derecha aparecen con NULL. Útil para \"todos los X aunque no tengan Y\".*",
      "**En una composición interna (INNER JOIN), ¿qué ocurre con las filas de la tabla A que no coinciden con ninguna de la tabla B**: Se excluyen del conjunto de resultados.. *INNER JOIN devuelve solo las filas que tienen coincidencia en AMBAS tablas. Las filas sin pareja se excluyen del resultado. Es el JOIN más restrictivo.*",
      "**Qué palabra clave se usa para comprobar si un valor existe dentro de una lista devuelta por una subconsulta**: IN (comprueba si el valor está en la lista devuelta por la subconsulta). *IN comprueba si un valor existe en una lista o en el resultado de una subconsulta. EXISTS comprueba si la subconsulta devuelve al menos una fila. LIKE busca patrones con % y _. BETWEEN comprueba rangos.*",
      "**En Oracle, ¿qué combinación de cláusulas se utiliza para realizar consultas jerárquicas**: START WITH y CONNECT BY.. *START WITH define el nodo raíz de la jerarquía y CONNECT BY define la relación padre-hijo. Son cláusulas específicas de Oracle para consultas jerárquicas (árboles organizativos, categorías anidadas).*",
      "**Qué operación de conjuntos combina los resultados de dos consultas eliminando los duplicados automáticamente**: UNION."
    ]
  },
  "bd_tema_5": {
    "name": "Tema 5: Tratamiento Datos",
    "points": [
      "**Cuál es la sentencia SQL estándar para insertar nuevos registros en una tabla**: INSERT INTO. *INSERT INTO tabla (col1, col2) VALUES (v1, v2) inserta una fila. INSERT INTO tabla SELECT... inserta múltiples filas desde otra consulta. Es la sentencia DML estándar para insertar datos.*",
      "**Cómo se insertan datos en una tabla de destino a partir del resultado de otra consulta**: Usando la sintaxis INSERT INTO tabla_destino SELECT .... *INSERT INTO tabla (col1, col2) VALUES (v1, v2) inserta una fila. INSERT INTO tabla SELECT... inserta múltiples filas desde otra consulta. Es la sentencia DML estándar para insertar datos.*",
      "**Por qué es fundamental incluir la cláusula WHERE en una sentencia UPDATE**: Porque si se omite, se actualizarán todos los registros de la tabla.. *Porque si se omite, se actualizarán todos los registros de la tabla. es la respuesta correcta para esta pregunta del temario oficial.*",
      "**Qué opción de integridad referencial borra automáticamente las filas hijas cuando se borra la fila padre**: ON DELETE CASCADE. *ON DELETE CASCADE borra automáticamente las filas hijas cuando se borra la fila padre. ON DELETE SET NULL pone NULL en las hijas. ON DELETE RESTRICT impide borrar el padre si tiene hijos.*",
      "**Qué sentencia se utiliza para confirmar y guardar permanentemente todos los cambios de una transacción**: COMMIT. *COMMIT confirma permanentemente todos los cambios de la transacción actual. Una vez ejecutado, los cambios son visibles para otros usuarios y no se pueden deshacer con ROLLBACK.*",
      "**Qué acción realiza el comando ROLLBACK**: Deshace todos los cambios realizados en la transacción actual volviendo al estado inicial.. *ROLLBACK deshace todos los cambios realizados desde el último START TRANSACTION o SAVEPOINT, devolviendo la base de datos al estado anterior. Es la operación de \"deshacer\" de las transacciones.*",
      "**Cuál es una ventaja clave de utilizar Common Table Expressions (CTE) o composiciones en órdenes de edición**: Mejoran la legibilidad al permitir nombrar subconsultas y reutilizarlas en una única instrucción.. *Mejoran la legibilidad al permitir nombrar subconsultas y reutilizarlas en una única instrucción.*",
      "**En qué consiste el \"bloqueo a nivel de registro\" (row-level locking)**: Bloquea solo la fila específica que se está modificando, permitiendo que otros usuarios trabajen en otras filas.. *El bloqueo a nivel de registro (row-level locking) bloquea solo la fila que se está modificando, permitiendo que otros usuarios trabajen en otras filas simultáneamente. Es más eficiente que bloquear toda la tabla.*",
      "**Qué sintaxis se utiliza en MySQL para bloquear filas seleccionadas para una posterior actualización dentro de una transacción**: SELECT  FROM tabla WHERE id=1 FOR UPDATE;. *SELECT ... FOR UPDATE bloquea las filas seleccionadas para que otros usuarios no puedan modificarlas hasta que se haga COMMIT o ROLLBACK. Es el mecanismo de bloqueo pesimista en MySQL.*",
      "**En el modo estricto de MySQL (STRICT_ALL_TABLES), ¿qué ocurre si se intenta realizar una operación con datos inválidos**: Se rechaza la operación y se genera un error.."
    ]
  },
  "bd_tema_6": {
    "name": "Tema 6: Programación",
    "points": [
      "**Cuál es la sintaxis correcta para definir una variable de usuario en MySQL que almacene información temporal en una sesión**: SET @mi_variable = 10;. *SET @variable = valor define una variable de sesión de usuario en MySQL. Las variables de sesión persisten durante la conexión. DECLARE se usa para variables locales dentro de procedimientos.*",
      "**Qué palabra clave se utiliza al crear una función para indicar que siempre devuelve el mismo resultado para los mismos parámetros de entrada**: DETERMINISTIC. *DETERMINISTIC indica que la función siempre devuelve el mismo resultado para los mismos parámetros. Permite al optimizador cachear el resultado y mejorar el rendimiento.*",
      "**Cuál es la función del comando DELIMITER en MySQL**: Cambiar temporalmente el carácter de finalización de comandos para escribir procedimientos complejos.. *DELIMITER cambia el carácter de fin de comando (por defecto ;) para poder escribir procedimientos que contienen ; internamente sin que MySQL los ejecute prematuramente.*",
      "**Qué estructura de iteración se evalúa al final del ciclo, garantizando que el conjunto de instrucciones se ejecute al menos una vez**: REPEAT.",
      "**Para ejecutar un procedimiento almacenado en MySQL, ¿qué instrucción debe utilizarse**: CALL. *Un procedimiento almacenado es código SQL precompilado que se ejecuta con CALL. Puede tener parámetros IN (entrada), OUT (salida) e INOUT. No devuelve valor directamente.*",
      "**Qué variable del sistema debe estar en ON para que los eventos programados con CREATE EVENT llegar a ejecutarse**: event_scheduler. *event_scheduler = ON activa el planificador de eventos de MySQL. Sin esto, los eventos creados con CREATE EVENT no se ejecutarán aunque estén correctamente definidos.*",
      "**Cuál es una diferencia fundamental entre las Funciones y los Procedimientos almacenados**: Las funciones siempre devuelven un valor; los procedimientos no devuelven un valor (aunque pueden usar parámetros de salida).. *Las funciones siempre devuelven un valor; los procedimientos no devuelven un valor (aunque pueden usar parámetros de sal...*",
      "**Qué tipo de dato compuesto se utiliza para almacenar uno o varios valores de un conjunto de opciones predefinidas, guardándose internamente como un mapa de bits**: SET.",
      "**En el tratamiento de excepciones, ¿qué manejador aborta la ejecución del código inmediatamente cuando se produce un error crítico**: EXIT HANDLER. *EXIT HANDLER aborta la ejecución del procedimiento inmediatamente cuando ocurre el error. CONTINUE HANDLER continúa la ejecución después del error. Se usan para gestionar excepciones en MySQL.*",
      "**Qué objeto de base de datos se utiliza para recorrer los resultados de una consulta SQL de manera secuencial y fila por fila**: Cursor. *Un cursor permite procesar el resultado de una SELECT fila a fila dentro de un procedimiento. Pasos: DECLARE → OPEN → FETCH (bucle) → CLOSE. El handler NOT FOUND detecta el fin.*"
    ]
  },
  "bd_tema_7": {
    "name": "Tema 7: Objeto-Relacional",
    "points": [
      "**Qué característica de un ORDBMS permite definir una tabla \"hija\" que incluya automáticamente las columnas y restricciones de una tabla \"padre\"**: Herencia de tablas.",
      "**Durante la instalación de PostgreSQL, ¿cuál es el puerto de conexión que se asigna por defecto**: 5432. *El puerto por defecto de PostgreSQL es 5432. MySQL usa 3306. El puerto 8080 es común para servidores web alternativos.*",
      "**Qué cláusula se utiliza en la sentencia CREATE TABLE de PostgreSQL para heredar de otra tabla**: INHERITS.",
      "**Cuál de los siguientes es un tipo de dato nativo geométrico en PostgreSQL**: CIRCLE. *NAT (Network Address Translation) traduce direcciones IP privadas a una IP pública en el router. Permite que múltiples dispositivos de una red local compartan una sola IP pública.*",
      "**Al ejecutar un SELECT * FROM tabla_padre en PostgreSQL, ¿qué registros se obtienen por defecto**: Los de la tabla padre y todos los de sus tablas hijas relacionadas.. *Los de la tabla padre y todos los de sus tablas hijas relacionadas.*",
      "**Qué tipo de dato de colección representa un intervalo de valores continuos (como un rango de fechas)**: RANGE.",
      "**Respecto al borrado de datos en una estructura de herencia en PostgreSQL, ¿cuál es la afirmación correcta**: No hay cascada automática; se debe declarar ON DELETE CASCADE en las claves foráneas si se requiere.. *ON DELETE CASCADE borra automáticamente las filas hijas cuando se borra la fila padre. ON DELETE SET NULL pone NULL en las hijas. ON DELETE RESTRICT impide borrar el padre si tiene hijos.*",
      "**Cómo se llama el lenguaje procedimental propio de PostgreSQL utilizado para crear funciones avanzadas**: PL/pgSQL.",
      "**Qué sentencia estándar de SQL se utiliza en PostgreSQL para definir un tipo de dato personalizado (como un tipo compuesto)**: CREATE TYPE.",
      "**A qué se refiere la \"navegabilidad\" en el contexto de bases de datos objeto-relacionales**: A la capacidad de seguir las conexiones lógicas o referencias entre objetos.. *ACID: Atomicidad (todo o nada), Consistencia (la BD pasa de un estado válido a otro), Aislamiento (las transacciones no se interfieren), Durabilidad (los cambios confirmados persisten aunque falle el sistema).*"
    ]
  },
  "ed_tema_1": {
    "name": "Tema 1: Conceptos Software",
    "points": [
      "**Cómo se categoriza el software según su naturaleza en un ordenador**: Software de sistema, Software de aplicación y Software de programación.. *NAT (Network Address Translation) traduce direcciones IP privadas a una IP pública en el router. Permite que múltiples dispositivos de una red local compartan una sola IP pública.*",
      "**Además de las líneas de código con instrucciones, ¿qué otro elemento es frecuentemente necesario para que un programa informático realice sus tareas**: Los datos, que son la información que el programa necesita para operar, como los operandos en una operación aritmética.. *Además del código, un programa necesita datos para operar. Los datos son la información que el programa procesa (operandos en una operación, registros de una BD, etc.).*",
      "**Según el texto, ¿qué proceso realiza un compilador durante la compilación, además de generar el código ejecutable**: Verifica que el código fuente esté escrito correctamente desde los puntos de vista léxico, sintáctico y semántico, avisando al programador de posibles errores.. *El compilador verifica el código en tres fases: léxica (tokens válidos), sintáctica (estructura gramatical correcta) y semántica (significado coherente). Si hay errores, los reporta al programador.*",
      "**Respecto a la clasificación de lenguajes por nivel de abstracción y generación, ¿qué es cierto sobre los lenguajes de segunda generación**: Son lenguajes de programación en ensamblador, que utilizan una simbología y códigos legibles por las personas, y son convertidos a código máquina mediante un ensamblador.. *Los lenguajes de 2ª generación son los lenguajes ensamblador. Usan mnemónicos legibles (MOV, ADD) en lugar de código binario. Se convierten a código máquina mediante un ensamblador.*",
      "**Cuál es la diferencia fundamental entre el código objeto y el código ejecutable**: El código objeto contiene instrucciones comprensibles por la máquina, pero no es directamente ejecutable, requiriendo un proceso de enlazado para convertirse en código ejecutable.. *El código objeto contiene instrucciones comprensibles por la máquina pero no es directamente ejecutable. El enlazador (linker) combina varios códigos objeto y resuelve referencias externas para crear el ejecutable.*",
      "**Cuál es la distinción entre un lenguaje de tipado fuerte y uno de tipado débil, y entre tipado estático y tipado dinámico**: Un lenguaje de tipado fuerte restringe las operaciones basándose en el tipo de sus variables, mientras que uno de tipado débil permite un uso más indiscriminado. En el tipado estático, el tipo se vincula a la variable al declararla y no cambia; en el tipado dinámico, el tipo se asigna por el valor y puede cambiar durante la ejecución.. *Tipado fuerte: restringe operaciones según el tipo (Java, Python). Tipado débil: permite uso más flexible (JavaScript). Tipado estático: el tipo se asigna al declarar (Java). Dinámico: el tipo cambia en ejecución (Python).*",
      "**Por qué se considera la reutilización de código de máxima importancia en el desarrollo de software**: Porque ahorra costes de creación y modificación, y reduce la probabilidad de cometer errores al centralizar los cambios en un único lugar.. *La reutilización de código ahorra costes de creación y modificación, y reduce errores al centralizar los cambios en un único lugar. Es uno de los principios fundamentales de la ingeniería del software.*",
      "**En las fases tradicionales del ciclo de vida de una aplicación informática, ¿qué actividad caracteriza principalmente la fase de Análisis**: La determinación del alcance de solución de una necesidad, definiendo exhaustivamente qué va a hacer el sistema software.. *La determinación del alcance de solución de una necesidad, definiendo exhaustivamente qué va a hacer el sistema software...*",
      "**En el contexto de los lenguajes de programación como Java, ¿cuál es uno de los objetivos principales al utilizar máquinas virtuales y bytecode**: Lograr la portabilidad de los programas, permitiendo que un mismo bytecode se ejecute en cualquier sistema operativo que tenga instalada la máquina virtual correspondiente.. *Lograr la portabilidad de los programas, permitiendo que un mismo bytecode se ejecute en cualquier sistema operativo que...*",
      "**Qué paradigma de programación se caracteriza por estructurar los programas en agrupaciones de código fuente (como funciones o procedimientos) y utilizar estructuras de control para determinar el flujo de ejecución**: Paradigma de Programación Estructurada.."
    ]
  },
  "ed_tema_2": {
    "name": "Tema 2: El IDE",
    "points": [
      "**Cuál es la característica principal que distingue a un Entorno de Desarrollo Integrado (IDE) moderno de las herramientas de programación más antiguas, como los editores simples de texto**: Los IDE modernos integran una amplia gama de herramientas para dar soporte a la mayoría de las actividades de desarrollo de software, incluyendo documentación, control de versiones y pruebas, más allá de la mera escritura y compilación de código.. *Los IDE modernos integran una amplia gama de herramientas para dar soporte a la mayoría de las actividades de desarrollo...*",
      "**Al crear un nuevo proyecto en PyCharm para Python, ¿cuál es uno de los elementos clave que deben seleccionarse o configurarse, además de la ubicación del proyecto y la versión de Python a utilizar**: La ubicación del entorno virtual, que constituye un entorno de trabajo aislado para el proyecto.. *La ubicación del entorno virtual, que constituye un entorno de trabajo aislado para el proyecto.*",
      "**Cómo gestionan típicamente los Entornos de Desarrollo Integrados (IDEs) la detección y notificación de errores en lenguajes de programación interpretados, como Python, en comparación con los lenguajes compilados**: En los lenguajes interpretados, los errores se detectan y muestran durante la fase de ejecución, mientras que en los lenguajes compilados, los errores son revisados y mostrados durante el proceso de compilación.. *En los lenguajes interpretados, los errores se detectan y muestran durante la fase de ejecución, mientras que en los len...*",
      "**Antes de instalar PyCharm, ¿cuál es un paso previo recomendado para asegurar que todas las herramientas necesarias para el desarrollo en Python estén disponibles**: Descargar e instalar la última versión del intérprete de Python y sus herramientas.. *El protocolo PAS ante emergencias: Proteger (asegurar la zona), Avisar (llamar al 112), Socorrer (prestar primeros auxilios). El orden es fundamental para no crear más víctimas.*",
      "**Basándose en la distinción entre categorías de software, ¿cuál es la característica que define al software libre en contraste con el software propietario**: El software libre permite el acceso a su código fuente para su estudio, comprensión y mejora, mientras que el software propietario restringe el acceso a su código, generalmente solo permitiéndolo a su dueño o creador.. *El software libre permite el acceso a su código fuente para su estudio, comprensión y mejora, mientras que el software p...*",
      "**Cuál es el propósito principal de los \"plugins\" o \"módulos\" en un Entorno de Desarrollo Integrado (IDE)**: Permitir que el IDE se ejecute en diferentes sistemas operativos sin necesidad de recompilación.. *Permitir que el IDE se ejecute en diferentes sistemas operativos sin necesidad de recompilación.*",
      "**Respecto a la generación de ejecutables, ¿qué se menciona específicamente sobre Python dentro de los entornos de desarrollo**: Generalmente no se generan archivos ejecutables en Python; en su lugar, los archivos de la aplicación se copian y se ejecutan llamando al intérprete.. *Generalmente no se generan archivos ejecutables en Python; en su lugar, los archivos de la aplicación se copian y se eje...*",
      "**Según el contenido proporcionado, ¿cuál es una ventaja clave de los editores de código modernos en comparación con los Entornos de Desarrollo Integrados (IDEs)**: Los editores de código son más ligeros y consumen menos recursos del sistema, siendo adecuados para tipos específicos de desarrollo como las aplicaciones web de \"front-end\".. *Los editores de código son más ligeros y consumen menos recursos del sistema, siendo adecuados para tipos específicos de...*",
      "**Qué aspectos de la interfaz de un IDE pueden ser típicamente personalizados por el usuario, como se ejemplifica con PyCharm**: La apariencia de sus elementos, como el tipo y tamaño de letra, la disposición de los paneles y el esquema de color a utilizar.. *La apariencia de sus elementos, como el tipo y tamaño de letra, la disposición de los paneles y el esquema de color a ut...*",
      "**Además de la edición y compilación de código, ¿qué actividad de desarrollo moderna soportan los IDEs, lo que indica su papel en proyectos colaborativos**: El trabajo en equipo, el control de versiones y el seguimiento de incidencias, entre otras tareas.. *El trabajo en equipo, el control de versiones y el seguimiento de incidencias, entre otras tareas.*"
    ]
  },
  "ed_tema_3": {
    "name": "Tema 3: Introducción UML",
    "points": [
      "**En el contexto de las metodologías de desarrollo orientado a objetos, ¿cómo se posiciona UML**: UML no sigue ninguna metodología en concreto, sino que proporciona herramientas para aplicar en estas, permitiendo representar las diferentes partes estáticas o dinámicas del sistema como parte del trabajo metodológico.. *UML no sigue ninguna metodología en concreto, sino que proporciona herramientas para aplicar en estas, permitiendo repre...*",
      "**Qué organismo internacional aprobó el lenguaje UML como estándar a partir del año 2004**: La Organización Internacional de Estandarización (ISO, International Organization for Standardization).. *NAT (Network Address Translation) traduce direcciones IP privadas a una IP pública en el router. Permite que múltiples dispositivos de una red local compartan una sola IP pública.*",
      "**Cuál es el objetivo fundamental del Lenguaje Unificado de Modelado (UML) según la introducción de la unidad**: Ofrecer herramientas para la representación gráfica y textual de un sistema informático, especialmente cuando se utiliza el paradigma de la orientación a objetos.. *Ofrecer herramientas para la representación gráfica y textual de un sistema informático, especialmente cuando se utiliza...*",
      "**Dentro de los diagramas estructurales, ¿cuál de ellos permite representar no solo elementos software sino también el hardware del sistema, con el fin de documentar la explotación o ejecución de una aplicación**: El diagrama de lanzamiento o despliegue..",
      "**Cuál es la característica principal de las herramientas CASE (Computer Aided Software Engineering) con soporte UML, en contraste con herramientas de dibujo genéricas**: Están diseñadas y construidas específicamente para ayudar en diferentes fases del proceso de creación de software, proporcionando soporte específico para UML.. *Están diseñadas y construidas específicamente para ayudar en diferentes fases del proceso de creación de software, propo...*",
      "**Según la unidad, ¿cuál es probablemente el diagrama más habitual y útil de UML, que permite representar las clases del sistema, incluyendo sus atributos, métodos y las reglas entre ellas**: El diagrama de clases..",
      "**Más allá de la generación de código a partir de diagramas, ¿qué otra capacidad valiosa suelen ofrecer las herramientas CASE con soporte UML para la documentación de proyectos existentes**: La ingeniería inversa, que permite generar diagramas de clase u otros a partir del código fuente ya programado.. *ACID: Atomicidad (todo o nada), Consistencia (la BD pasa de un estado válido a otro), Aislamiento (las transacciones no se interfieren), Durabilidad (los cambios confirmados persisten aunque falle el sistema).*",
      "**Según el glosario de la unidad, ¿cómo se define un \"Objeto\" en el contexto de la programación orientada a objetos y UML**: La concreción de una clase, también conocida como instancia.. *La respuesta es 'La concreción de una clase, también conocida como instancia.'.*",
      "**Cuál de los diagramas de comportamiento se utiliza para representar de manera más detallada la secuencia de pasos que se van a realizar para una actividad, siendo más específico que un diagrama de caso de uso**: El diagrama de actividad.. *El protocolo PAS ante emergencias: Proteger (asegurar la zona), Avisar (llamar al 112), Socorrer (prestar primeros auxilios). El orden es fundamental para no crear más víctimas.*",
      "**Los múltiples diagramas de UML, diseñados para cubrir diversas perspectivas de un sistema software, se agrupan en dos grandes categorías principales. ¿Cuáles son estas categorías**: Diagramas estructurales y diagramas de comportamiento.. *La respuesta es 'Diagramas estructurales y diagramas de comportamiento.'.*"
    ]
  },
  "ed_tema_4": {
    "name": "Tema 4: Diag. Estructurales",
    "points": [
      "**Además de la ayuda en la construcción visual de diagramas, ¿qué dos funcionalidades avanzadas y complementarias suelen ofrecer las herramientas CASE con soporte UML para mejorar la eficiencia del desarrollo de software**: Generación automática de código a partir de diagramas y la ingeniería inversa para obtener diagramas a partir de código fuente.. *Generación automática de código a partir de diagramas y la ingeniería inversa para obtener diagramas a partir de código ...*",
      "**En un diagrama de clases UML, ¿cómo se representa una relación de Realización (o implementación) y qué concepto de la programación orientada a objetos refleja**: Mediante una línea punteada que termina en una punta de flecha hueca (o rellena de color blanco), que va desde la clase hacia la interfaz que implementa.. *El diagrama de clases UML muestra la estructura estática del sistema: clases, atributos, métodos y relaciones. Es el diagrama más usado en el diseño orientado a objetos.*",
      "**Qué información crucial puede indicarse en los extremos de una línea de relación de Asociación en un diagrama de clases UML**: La multiplicidad (cuántas instancias de una clase pueden participar en la relación) y la navegabilidad (si se puede obtener referencia a los objetos del otro extremo).. *El diagrama de clases UML muestra la estructura estática del sistema: clases, atributos, métodos y relaciones. Es el diagrama más usado en el diseño orientado a objetos.*",
      "**Cómo se distinguen visualmente las clases y los métodos abstractos en un diagrama de clases UML de aquellos que no lo son**: Sus nombres se escriben en cursiva.. *El diagrama de clases UML muestra la estructura estática del sistema: clases, atributos, métodos y relaciones. Es el diagrama más usado en el diseño orientado a objetos.*",
      "**Cuál es la principal diferencia entre una relación de Composición y una de Agregación en UML, y cómo se representa la Composición**: La Composición es una relación fuerte donde las partes no tienen sentido independiente del conjunto y se eliminan con él (diamante sólido), mientras que la Agregación es débil donde las partes conservan su entidad (diamante hueco).. *La Composición es una relación fuerte donde las partes no tienen sentido independiente del conjunto y se eliminan con él...*",
      "**En la notación de los diagramas de clases UML, ¿qué significa que un atributo o método esté precedido por el símbolo #**: Que tiene visibilidad protegida..",
      "**Cuál es el papel principal del diagrama de clases en el diseño de software orientado a objetos según la Unidad 4**: Reflejar las clases que componen un sistema, incluyendo sus atributos, métodos y las relaciones entre ellas, para permitir a los desarrolladores escribir programas a partir de una especificación formal.. *Reflejar las clases que componen un sistema, incluyendo sus atributos, métodos y las relaciones entre ellas, para permit...*",
      "**Si un atributo en una clase UML es estático, ¿cómo se indica esta característica en su representación gráfica dentro del diagrama de clases**: Debe ir subrayado..",
      "**Qué tipo de relación UML se representa mediante una línea discontinua rematada en una punta de flecha que apunta a la clase que proporciona la funcionalidad, y qué significado tiene esta relación**: Relación de dependencia o de uso, representando que una clase utiliza la funcionalidad proporcionada por otra.. *Relación de dependencia o de uso, representando que una clase utiliza la funcionalidad proporcionada por otra.*",
      "**Según la definición de la unidad, ¿en qué consiste el concepto de \"ingeniería inversa\" aplicado a los diagramas de clases en el contexto del desarrollo de software**: En la obtención de un diagrama de clases a partir del código fuente ya existente de una aplicación.. *En la obtención de un diagrama de clases a partir del código fuente ya existente de una aplicación.*"
    ]
  },
  "ed_tema_5": {
    "name": "Tema 5: Diag. Comportamiento",
    "points": [
      "**En un diagrama de secuencia, ¿qué representan la \"línea de vida\" y la \"barra de activación\" respectivamente**: La línea de vida es una línea vertical discontinua asociada a cada elemento que indica el orden de los eventos, mientras que la barra de activación representa el periodo de tiempo durante el que el elemento se encuentra activo en la resolución de la actividad.. *La línea de vida es una línea vertical discontinua asociada a cada elemento que indica el orden de los eventos, mientras...*",
      "**Respecto a la relación de Inclusión (<<include>>) entre casos de uso en UML, ¿cuál de las siguientes afirmaciones es correcta**: Un caso de uso \"incluye\" a otro cuando lo utiliza internamente para llevar a cabo su funcionalidad, y la realización de ambos casos de uso es siempre obligatoria.. *Un caso de uso \"incluye\" a otro cuando lo utiliza internamente para llevar a cabo su funcionalidad, y la realización de ...*",
      "**Qué tipo de diagrama de comportamiento se utiliza para representar de manera detallada la secuencia de pasos que se van a realizar para una actividad, incluyendo elementos como nodos inicial y final, actividades, decisiones y conexiones**: El diagrama de actividad.. *El protocolo PAS ante emergencias: Proteger (asegurar la zona), Avisar (llamar al 112), Socorrer (prestar primeros auxilios). El orden es fundamental para no crear más víctimas.*",
      "**Cuál es una característica fundamental de la relación de Extensión (<<extend>>) en los diagramas de casos de uso UML**: Indica que un caso de uso \"extiende\" o amplía la funcionalidad de otro, añadiendo opcionalmente un punto de extensión para especificar las condiciones.. *Indica que un caso de uso \"extiende\" o amplía la funcionalidad de otro, añadiendo opcionalmente un punto de extensión pa...*",
      "**Qué diagrama de comportamiento se considera una alternativa al diagrama de secuencia y se centra en las interacciones que realizan los objetos entre sí mediante el paso de mensajes, incluyendo un número secuencial en cada mensaje**: El diagrama de comunicación (conocido como diagrama de colaboración en versiones anteriores de UML).. *NAT (Network Address Translation) traduce direcciones IP privadas a una IP pública en el router. Permite que múltiples dispositivos de una red local compartan una sola IP pública.*",
      "**En un diagrama de casos de uso UML, ¿qué puede representar un \"Actor\"**: Cualquier elemento que se relaciona con el sistema, pudiendo ser una persona física (usuario) como otro sistema o subsistema (un programa informático o un sistema hardware).. *Cualquier elemento que se relaciona con el sistema, pudiendo ser una persona física (usuario) como otro sistema o subsis...*",
      "**Qué se entiende por \"Escenario\" en el contexto de un diagrama de casos de uso**: Cada uno de los diferentes caminos que puede tomar un caso de uso, representando una secuencia de eventos posible para completar la interacción.. *Cada uno de los diferentes caminos que puede tomar un caso de uso, representando una secuencia de eventos posible para c...*",
      "**Si el objetivo es representar los diferentes estados por los que atraviesa un componente, sistema o subsistema a lo largo de su ciclo de vida, y las transiciones que se producen entre ellos, ¿qué diagrama de comportamiento de UML sería el más adecuado**: El diagrama de estados o de máquina de estados.. *La respuesta es 'El diagrama de estados o de máquina de estados.'.*",
      "**En el contexto de la elaboración de diagramas de comportamiento UML, ¿qué tipo de herramientas suelen proporcionar funcionalidades para su creación y qué ejemplo de plug-in para un Entorno de Desarrollo Integrado (IDE) popular se menciona**: Herramientas CASE están diseñadas para facilitar su creación, y plug-ins integrados en entornos de desarrollo (IDEs) como AmaterasUML para Eclipse también ofrecen soporte.. *Un IDE (Integrated Development Environment) integra editor de código, compilador/intérprete, depurador y otras herramientas en una única interfaz. Ejemplos: IntelliJ IDEA, Eclipse, VS Code.*",
      "**Cuál es la principal característica que definen los diagramas de comportamiento en UML, diferenciándolos de los diagramas estructurales**: Reflejan qué van a realizar y cómo se van a comportar los componentes dentro del sistema, incluyendo su comunicación y transformación.. *Reflejan qué van a realizar y cómo se van a comportar los componentes dentro del sistema, incluyendo su comunicación y t...*"
    ]
  },
  "ed_tema_6": {
    "name": "Tema 6: Pruebas y Depuración",
    "points": [
      "**Cuál es el propósito principal de un depurador (debugger) y qué herramientas clave proporciona para lograrlo**: Ejecutar el programa línea a línea, permitiendo observar la ejecución, acceder a la memoria y examinar el valor de las variables en puntos de ruptura, con el fin de detectar errores o comprender el código.. *Ejecutar el programa línea a línea, permitiendo observar la ejecución, acceder a la memoria y examinar el valor de las v...*",
      "**Quién es el principal responsable de realizar las pruebas unitarias y qué objetivo persiguen**: Los programadores, con el objetivo de verificar que un elemento mínimo funcional del programa (una función, un método o una clase) funciona correctamente.. *Los programadores, con el objetivo de verificar que un elemento mínimo funcional del programa (una función, un método o ...*",
      "**Cuál es la distinción fundamental entre las pruebas de \"caja negra\" y las de \"caja blanca\"**: Las pruebas de caja negra verifican el funcionamiento externo de un componente sin mirar su interior, mientras que las de caja blanca (estructurales) observan la construcción interna buscando problemas de eficiencia o seguridad.. *Las pruebas de caja negra verifican el funcionamiento externo de un componente sin mirar su interior, mientras que las d...*",
      "**Según la unidad, ¿cuáles de los siguientes son elementos esenciales que componen un caso de prueba**: Identificador, descripción, precondiciones, datos de prueba, pasos, resultado esperado, resultado obtenido y estado.. *El protocolo PAS ante emergencias: Proteger (asegurar la zona), Avisar (llamar al 112), Socorrer (prestar primeros auxilios). El orden es fundamental para no crear más víctimas.*",
      "**Cuál de las siguientes afirmaciones sobre las pruebas de software es la más precisa según el contenido de la unidad**: Tanto la presencia de errores en el software como el esfuerzo por evitarlos tienen un coste asociado, y las pruebas son fundamentales para minimizar los problemas y asegurar la calidad.. *Tanto la presencia de errores en el software como el esfuerzo por evitarlos tienen un coste asociado, y las pruebas son ...*",
      "**Cuándo se realizan las pruebas de regresión y cuál es su principal propósito**: Se llevan a cabo después de realizar cambios en el sistema (mejoras o corrección de errores) para comprobar que otras partes del sistema no se han visto afectadas negativamente.. *Se llevan a cabo después de realizar cambios en el sistema (mejoras o corrección de errores) para comprobar que otras pa...*",
      "**Qué representa el concepto de \"cubrimiento\" o \"cobertura\" en el contexto de las pruebas de código**: El porcentaje del código fuente que ha sido probado, sirviendo como una métrica de la calidad de las pruebas.. *El porcentaje del código fuente que ha sido probado, sirviendo como una métrica de la calidad de las pruebas.*",
      "**Cuál es la diferencia clave entre el análisis estático y el análisis dinámico en las pruebas de código**: El análisis estático se realiza sobre el código sin ejecutarlo, buscando ineficiencias o código muerto, mientras que el análisis dinámico comprueba el funcionamiento del código mediante su ejecución en diversos escenarios.. *El análisis estático se realiza sobre el código sin ejecutarlo, buscando ineficiencias o código muerto, mientras que el ...*",
      "**Aunque las pruebas unitarias son imprescindibles, ¿por qué son también necesarias las pruebas de integración**: Los programas casi siempre funcionan dentro de sistemas más complejos y se relacionan con otros módulos o sistemas, por lo que las pruebas de integración verifican que el componente funciona correctamente en sus relaciones con estos.. *Los programas casi siempre funcionan dentro de sistemas más complejos y se relacionan con otros módulos o sistemas, por ...*",
      "**En el contexto del ciclo de vida del software, ¿qué enfoque para la realización de pruebas se considera correcto y por qué**: En el ciclo de vida en V, cada fase de construcción lleva asociada una fase de pruebas para detectar errores lo antes posible y evitar arrastrarlos.. *En el ciclo de vida en V, cada fase de construcción lleva asociada una fase de pruebas para detectar errores lo antes po...*"
    ]
  },
  "ed_tema_7": {
    "name": "Tema 7: Optimización y Git",
    "points": [
      "**De las siguientes opciones, ¿cuál representa una de las técnicas o \"patrones\" de refactorización más usuales mencionados en la unidad**: La correcta composición de métodos (creando funciones para encapsular funcionalidad) y la organización de los datos (utilizando objetos y encapsulación).. *La correcta composición de métodos (creando funciones para encapsular funcionalidad) y la organización de los datos (uti...*",
      "**Según el contenido de la unidad, ¿cuál es la razón fundamental por la que los sistemas de control de versiones son herramientas imprescindibles en la ingeniería de software, especialmente en desarrollos colectivos**: Facilitan el control sobre el código fuente y otros ficheros del sistema, su evolución, y permiten el trabajo en grupo minimizando el impacto de los cambios entre programadores.. *Facilitan el control sobre el código fuente y otros ficheros del sistema, su evolución, y permiten el trabajo en grupo m...*",
      "**Flujo de Trabajo Básico con Git: Después de realizar modificaciones en los ficheros de un proyecto localmente, ¿cuáles son los dos comandos fundamentales en Git para primero hacer firmes esos cambios localmente y luego subirlos al repositorio remoto**: git commit para consolidar los cambios en el repositorio local y git push para subirlos al servidor remoto.. *COMMIT confirma permanentemente todos los cambios de la transacción actual. Una vez ejecutado, los cambios son visibles para otros usuarios y no se pueden deshacer con ROLLBACK.*",
      "**Cuál de las siguientes afirmaciones describe con mayor precisión el propósito de la refactorización en el desarrollo de software**: La refactorización es un conjunto de técnicas que modifican un programa ya funcional para mejorar su legibilidad, eficiencia, comprensión y mantenimiento, sin alterar su comportamiento externo.. *La refactorización es un conjunto de técnicas que modifican un programa ya funcional para mejorar su legibilidad, eficie...*",
      "**Herramientas de Ayuda a la Refactorización en IDEs: Los Entornos de Desarrollo Integrado (IDEs) como PyCharm ofrecen herramientas para la refactorización asistida. ¿Qué tipo de acción es un ejemplo de refactorización asistida directamente proporcionada por un IDE**: El renombrado automático de variables, funciones o clases en todo el proyecto, o la extracción de un bloque de código para crear un nuevo método.. *Un IDE (Integrated Development Environment) integra editor de código, compilador/intérprete, depurador y otras herramientas en una única interfaz. Ejemplos: IntelliJ IDEA, Eclipse, VS Code.*",
      "**A pesar de que una refactorización de código no implica cambios en su funcionamiento, el manual indica que puede generar errores si se realiza incorrectamente. ¿Qué acciones se deben considerar para mitigar este riesgo**: Asegurarse de poder deshacer los cambios realizados (preferiblemente con sistemas de control de versiones) y ejecutar pruebas (unitarias, de regresión o de humo) para verificar la correcta funcionalidad del código modificado.. *Asegurarse de poder deshacer los cambios realizados (preferiblemente con sistemas de control de versiones) y ejecutar pr...*",
      "**Restauración de Versiones Anteriores en Git: Si un programador necesita restaurar el estado de su repositorio local en Git a una versión anterior específica (por ejemplo, al estado de un \"primer commit\"), ¿qué comando debe utilizar y qué información es crucial para ello**: git reset --hard <identificador_del_commit> utilizando el identificador único del commit al que se desea regresar.. *COMMIT confirma permanentemente todos los cambios de la transacción actual. Una vez ejecutado, los cambios son visibles para otros usuarios y no se pueden deshacer con ROLLBACK.*",
      "**Resolución de Conflictos en Sistemas de Control de Versiones: En un escenario de desarrollo colectivo, cuando varios programadores modifican el mismo fchero simultáneamente, pueden surgir confictos. ¿Qué comando de Git se menciona como el adecuado para resolver este tipo de problemas**: git merge para integrar cambios y resolver solapamientos.. *La respuesta es 'git merge para integrar cambios y resolver solapamientos.'.*",
      "**En Python, además de los comentarios tradicionales (# o bloques con '''), existe un tipo de comentario formal que se utiliza para documentar funciones, clases y métodos, siendo visible con la función help() y en la ayuda contextual de los IDEs. ¿Cómo se denomina este tipo de comentario**: Docstring..",
      "**Cuál es la principal distinción entre un sistema de control de versiones centralizado y uno distribuido**: En los sistemas centralizados, las copias del proyecto se almacenan en un único servidor central; en los distribuidos, las copias se almacenan tanto en un servidor como en cada máquina de los integrantes del equipo.. *En los sistemas centralizados, las copias del proyecto se almacenan en un único servidor central; en los distribuidos, l...*"
    ]
  },
  "lm_tema_1": {
    "name": "LM Tema 1: Introd. Marcas",
    "points": [
      "**Quién propuso la creación de un nuevo sistema de \"hipertexto\" en 1980 con el objetivo de facilitar el intercambio de documentos entre diferentes usuarios, lo que eventualmente dio origen a HTML**: Ser exclusivamente estructural, sin contener ninguna información relacionada con el diseño, y se utiliza para describir información y definir la estructura de datos de un documento.. *XML es un metalenguaje extensible y puramente estructural: no define cómo se presenta la información, solo su estructura y significado. HTML mezcla estructura y presentación. XML se usa para intercambio de datos entre sistemas.*"
    ]
  },
  "lm_tema_2": {
    "name": "LM Tema 2: HTML y CSS",
    "points": [
      "**Cuál es el objetivo principal del DOM (Modelo de Objetos de Documentos)**: enctype. *enctype=\"multipart/form-data\" es obligatorio para subir archivos en formularios HTML. Sin este atributo, el archivo no se envía correctamente. action indica la URL destino; method indica GET o POST; target indica dónde mostrar la respuesta.*"
    ]
  },
  "lm_tema_3": {
    "name": "LM Tema 3: XML y XSD",
    "points": [
      "**Según las reglas de las etiquetas XML para la buena formación de un documento, ¿cuál de las siguientes afirmaciones es correcta**: El elemento xs:sequence, que enumera los componentes de un tipo complejo indicando la secuencia obligatoria en que deben aparecer. *xs:sequence indica que los elementos hijos deben aparecer en el orden exacto definido. xs:choice permite solo uno de los elementos. xs:all permite cualquier orden.*"
    ]
  },
  "lm_tema_4": {
    "name": "LM Tema 4: Almacenamiento",
    "points": [
      "**Qué elemento se utiliza en un Schema XML (XSD) para definir tipos complejos que contienen otros elementos o atributos, y que permite especificar la secuencia u orden de aparición de sus hijos**: Un documento XML puede estar bien formado pero no ser válido si no cumple las restricciones de un DTD o XSD. *Un documento XML bien formado cumple las reglas sintácticas: un elemento raíz, todas las etiquetas cerradas, anidamiento correcto, atributos entre comillas y sensibilidad a mayúsculas.*"
    ]
  },
  "lm_tema_5": {
    "name": "LM Tema 5: XPath y XSLT",
    "points": [
      "**Qué característica clave introducida en XSLT 2.0 permite procesar documentos XML de gran tamaño sin cargar todo el documento en memoria**: Se mostrará una página en blanco o no se aplicará la transformación, incluso si el documento está bien formado.. *Chrome bloquea las transformaciones XSLT cuando se abre desde file:// por restricciones de seguridad CORS. La solución es usar un servidor web local. Este comportamiento es específico de Chrome; otros navegadores pueden comportarse diferente.*"
    ]
  },
  "lm_tema_6": {
    "name": "LM Tema 6: XQuery y BD-XML",
    "points": [
      "**Qué característica distingue a las bases de datos XML nativas y las hace especialmente eficientes para trabajar con documentos XML grandes y complejos**: XPath es un lenguaje para seleccionar nodos en documentos XML, mientras que XQuery, además de incluir XPath, es un lenguaje completo de consulta y transformación con sintaxis FLWOR. *XPath es un lenguaje para seleccionar nodos en documentos XML, mientras que XQuery, además de incluir XPath, es un lenguaje completo de consulta y transformación con sintaxis FLWOR es la respuesta correcta para esta pregunta del temario oficial.*"
    ]
  },
  "lm_tema_7": {
    "name": "LM Tema 7: RSS y Atom",
    "points": [
      "**En la estructura de un feed RSS 2.0, ¿cuáles son los tres elementos secundarios obligatorios que debe contener el elemento <channel>**: Suscribirse a fuentes de noticias en formatos RSS o Atom y notificar al usuario sobre las actualizaciones de contenido desde la última lectura. *Suscribirse a fuentes de noticias en formatos RSS o Atom y notificar al usuario sobre las actualizaciones de contenido desde la última lectura es la respuesta correcta para esta pregunta del temario oficial.*"
    ]
  },
  "lm_tema_8": {
    "name": "LM Tema 8: ERP y CRM",
    "points": [
      "**Cuál es el objetivo principal que persigue el uso de un software ERP unificado en una empresa en contraste con el uso de aplicaciones distintas por departamento**: Implementan las últimas novedades en seguridad de forma inmediata y aplican la seguridad por capas, reduciendo vulnerabilidades. *Implementan las últimas novedades en seguridad de forma inmediata y aplican la seguridad por capas, reduciendo vulnerabilidades es la respuesta correcta para esta pregunta del temario oficial.*"
    ]
  },
  "emp_tema_1": {
    "name": "UD1: Prevención de Riesgos I",
    "points": [
      "**Concepto de Salud (OMS)**: Bienestar físico, mental y social completo, no solo ausencia de afecciones.",
      "**Condición de Trabajo**: Cualquier característica del trabajo que pueda tener una influencia significativa en la generación de riesgos para la seguridad y la salud.",
      "**Daños Derivados**: Diferencia clave entre Accidente de Trabajo (lesión súbita con ocasión del trabajo, incluye *in itinere*) y Enfermedad Profesional (producida por exposición prolongada a agentes del listado oficial).",
      "**LPRL 31/1995**: Marco normativo básico nacional derivado de las directivas europeas en materia de seguridad.",
      "**Derechos del Trabajador**: Protección eficaz, información, formación, vigilancia periódica de la salud y paralización de actividad ante riesgo grave.",
      "**Deberes del Trabajador**: Velar por su seguridad y la de sus compañeros, usar correctamente máquinas y equipos de protección, informar de riesgos inmediatos.",
      "**Principios de Acción Preventiva**: Evitar riesgos, evaluar inevitables, combatir en origen y anteponer la protección colectiva a la individual.",
      "**Patologías Psicosociales**: Fatiga, estrés laboral, Mobbing (acoso laboral) y Burnout (síndrome del trabajador quemado)."
    ]
  },
  "emp_tema_2": {
    "name": "UD2: Derechos y Deberes Laborales",
    "points": [
      "**Derecho del Trabajo**: Conjunto de normas que regulan la relación laboral por cuenta ajena y dependiente.",
      "**Fuentes Laborales**: Constitución, Ley (Estatuto de los Trabajadores), Reglamentos, Convenios Colectivos y Contrato de Trabajo.",
      "**El Contrato de Trabajo**: Acuerdo donde el trabajador presta servicios voluntarios, retribuidos y bajo la organización del empresario.",
      "**Periodo de Prueba**: Tiempo para verificar aptitudes; permite rescindir el contrato sin preaviso ni indemnización.",
      "**Jornada y Descansos**: Máximo 40h semanales de media anual. Descanso mínimo de 12h entre jornadas y 1,5 días semanales.",
      "**El Salario**: Total de percepciones económicas por la prestación de servicios. Incluye salario base y complementos.",
      "**Modificación del Contrato**: Movilidad funcional (cambio de tareas), geográfica (traslado/desplazamiento) y modificaciones sustanciales de condiciones.",
      "**Causas de Extinción**: Despido (objetivo, disciplinario, colectivo), dimisión del trabajador, fin de contrato temporal o mutuo acuerdo.",
      "**La Seguridad Social**: Sistema de protección pública ante contingencias (baja por enfermedad, maternidad, jubilación, desempleo)."
    ]
  },
  "emp_tema_3": {
    "name": "UD3: El Sector de la Informática",
    "points": [
      "**Estructura del Sector**: Sector tecnológico con alta tasa de empleabilidad y dinamismo constante en España y Europa.",
      "**Perfiles DAW/DAM**: Desarrolladores, analistas, técnicos de soporte y especialistas en integración de aplicaciones.",
      "**IA y Automatización**: Principales motores de cambio que están creando nuevos puestos y transformando las tareas de programación y gestión de datos.",
      "**Soft Skills**: Creatividad, pensamiento crítico, trabajo en equipo y capacidad de comunicación son tan valoradas como las habilidades técnicas.",
      "**Formación Continua**: Concepto de *Long-life learning*; dada la obsolescencia técnica, el aprendizaje debe ser constante durante toda la carrera.",
      "**Relación Laboral Especial**: Posibilidad de teletrabajo regulado, flexibilización de horarios y organización por objetivos en el sector IT."
    ]
  },
  "emp_tema_4": {
    "name": "UD4: Autoconocimiento y Empleo",
    "points": [
      "**Análisis DAFO**: Técnica para evaluar Debilidades (internas), Amenazas (externas), Fortalezas (internas) y Oportunidades (externas).",
      "**Itinerarios Formativos**: Opciones tras el ciclo (Grado Superior especializado, Certificaciones de fabricantes, Acceso a Universidad).",
      "**Marca Personal**: Gestión de nuestra huella digital para proyectar una imagen profesional coherente en redes como GitHub o LinkedIn.",
      "**Documentos de Búsqueda**: El CV debe ser claro y adaptado; la Carta de Motivación debe personalizar la candidatura a la empresa.",
      "**Canales de Empleo**: Portales especializados (InfoJobs, TicJob), redes de contactos, agencias de colocación y ofertas de Europa (Europass).",
      "**Entrevista de Trabajo**: Proceso de selección fundamental donde se evalúa la adecuación al puesto y las competencias sociales."
    ]
  },
  "emp_tema_5": {
    "name": "UD5: Entorno Personal de Aprendizaje",
    "points": [
      "**Concepto de PLE**: Entorno Personal de Aprendizaje (herramientas, servicios y conexiones que usamos para aprender autónomamente).",
      "**Detección de Necesidades**: Proceso de autoevaluación para identificar carencias de conocimientos técnicos o transversales.",
      "**Fuentes de Información**: Uso de MOOCs, documentación técnica oficial, repositorios (GitHub) y bibliotecas digitales académicas.",
      "**Herramientas de Gestión**: Apps de notas (Notion, Evernote), marcadores (Pocket) y repositorios de contenido técnico.",
      "**Plan de Desarrollo Personal (PDP)**: Documento estratégico para marcar metas profesionales y los pasos concretos para lograrlas.",
      "**Identidad Digital**: Importancia de la privacidad y el comportamiento ético en la red para proteger nuestra reputación laboral."
    ]
  },
  "emp_bateria": {
    "name": "📋 Batería Examen (50 preguntas oficiales)",
    "points": [
      "**Cuando hablamos del Derecho del Trabajo dentro del sistema jurídico español, nos referimos a un conjunto de normas que no solo regulan la prestación de servicios, sino que también buscan corregir ciertos desequilibrios. ¿Cuál es su finalidad principal**: Pueden celebrarse tanto de forma verbal como por escrito, aunque algunos casos exigen forma escrita.. *El ET permite que los contratos se celebren verbalmente o por escrito. Sin embargo, algunos contratos deben formalizarse por escrito obligatoriamente (prácticas, formación, a tiempo parcial, fijos discontinuos, etc.). Si no se formaliza por escrito cuando es obligatorio, se presume indefinido.*"
    ]
  },
  "emp_examen_final": {
    "name": "🎯 SIMULACRO EXAMEN FINAL (50 preguntas)",
    "points": [
      "**Cuando hablamos del Derecho del Trabajo dentro del sistema jurídico español, nos referimos a un conjunto de normas que no solo regulan la prestación de servicios, sino que también buscan corregir ciertos desequilibrios. ¿Cuál es su finalidad principal**: Pueden celebrarse tanto de forma verbal como por escrito, aunque algunos casos exigen forma escrita.. *El ET permite que los contratos se celebren verbalmente o por escrito. Sin embargo, algunos contratos deben formalizarse por escrito obligatoriamente (prácticas, formación, a tiempo parcial, fijos discontinuos, etc.). Si no se formaliza por escrito cuando es obligatorio, se presume indefinido.*"
    ]
  },
  "prog_tema_1": {
    "name": "Tema 1: Fundamentos",
    "points": [
      "**Los lenguajes de programación utilizan distintos tipos de datos para representar la información y gestionar la memoria de forma adecuada. ¿Cuál de los siguientes no pertenece a los tipos de datos básicos o primitivos**: El dato es un valor aislado y la información es el resultado de procesar datos con un contexto.. *El dato es un valor aislado y la información es el resultado de procesar datos con un contexto.*"
    ]
  },
  "prog_tema_2": {
    "name": "Tema 2: Clases y Objetos",
    "points": [
      "**Los métodos permiten definir el comportamiento de los objetos y pueden devolver o no un valor. ¿Qué indica que un método tenga como tipo de retorno la palabra clave void**: El archivo debe llamarse igual que la clase pública y tener extensión .java.. *El archivo debe llamarse igual que la clase pública y tener extensión .java.*"
    ]
  },
  "prog_tema_3": {
    "name": "Tema 3: Variables y Control",
    "points": [
      "**Las variables en Java tienen un ciclo de vida y un proceso de uso muy definido. ¿Cuál es el orden correcto para poder utilizar una variable sin provocar un error de compilación**: Almacenan directamente el valor en memoria y no son objetos.. *La respuesta es 'Almacenan directamente el valor en memoria y no son objetos.'.*"
    ]
  },
  "prog_tema_4": {
    "name": "Tema 4: POO Avanzada",
    "points": [
      "**Cuál de las siguientes afirmaciones describe correctamente la relación entre una clase y un objeto**: El constructor vacío deja de existir si no se define explícitamente.. *El constructor inicializa los atributos del objeto en el momento de su creación con new. Tiene el mismo nombre que la clase y no tiene tipo de retorno. Si no se define, Java crea uno por defecto.*"
    ]
  },
  "prog_tema_5": {
    "name": "Tema 5: Arrays y Strings",
    "points": [
      "**En relación con los arrays multidimensionales en Java, ¿cuál de las siguientes afirmaciones es correcta**: Utilizando un método que evalúa el contenido textual (equals o compareTo).. *Utilizando un método que evalúa el contenido textual (equals o compareTo).*"
    ]
  },
  "prog_tema_6": {
    "name": "Tema 6: Herencia e Interfaces",
    "points": [
      "**Cuál es la diferencia fundamental de diseño entre una Clase Abstracta y una Interfaz**: Los padres siempre se inicializan antes que los hijos, empezando desde la clase Object.. *El constructor inicializa los atributos del objeto en el momento de su creación con new. Tiene el mismo nombre que la clase y no tiene tipo de retorno. Si no se define, Java crea uno por defecto.*"
    ]
  },
  "prog_tema_7": {
    "name": "Tema 7: Colecciones y Excepciones",
    "points": [
      "**Para qué se utiliza la palabra clave throws (en plural) en la firma de un método**: Siempre, independientemente de si se lanzó una excepción o si fue capturada.. *Siempre, independientemente de si se lanzó una excepción o si fue capturada.*"
    ]
  },
  "prog_tema_8": {
    "name": "Tema 8: Ficheros y Streams",
    "points": [
      "**Si un atributo de una clase se marca con la palabra clave transient, ¿qué ocurre durante la serialización**: Debe implementar la interfaz Serializable, que actúa como una \"interfaz de marcado\".. *Serializable es una interfaz marcadora (sin métodos) que indica que los objetos de esa clase pueden convertirse en bytes para almacenarse o enviarse por red. serialVersionUID controla la compatibilidad de versiones.*"
    ]
  },
  "prog_tema_9": {
    "name": "Tema 9: JDBC y Bases de Datos",
    "points": [
      "**Cuál es la función del \"Driver\" (Controlador) en una conexión JDBC**: Una API que proporciona un conjunto de interfaces estándar para interactuar con bases de datos independientemente del motor usado.. *JDBC (Java Database Connectivity) es la API estándar de Java para conectarse a bases de datos. El Driver traduce las llamadas JDBC al protocolo específico de cada SGBD (MySQL, Oracle, etc.).*"
    ]
  },
  "prog_tema_10": {
    "name": "Tema 10: BD Orientada a Objetos",
    "points": [
      "**Qué es el OID (Object Identifier) en una base de datos orientada a objetos**: El modo Embebido: la base de datos corre en el mismo proceso que la aplicación; el modo Servidor es un proceso independiente.. *En modo Embebido, la base de datos corre en el mismo proceso JVM que la aplicación (más rápido, un solo usuario). En modo Servidor, es un proceso independiente que acepta múltiples conexiones remotas.*"
    ]
  },
  "si_tema_1": {
    "name": "Tema 1: Redes y Hardware",
    "points": [
      "**Qué es una máquina de Turing**: Teclado.."
    ]
  },
  "si_tema_2": {
    "name": "Tema 2: Sistemas Operativos",
    "points": [
      "**Cuáles son los cuatro componentes principales de un sistema informático**: Gestionar y coordinar el uso de los recursos de hardware y software.. *Gestionar y coordinar el uso de los recursos de hardware y software.*"
    ]
  },
  "si_tema_3": {
    "name": "Tema 3: Almacenamiento",
    "points": [
      "**Qué tipo de particiones solo se pueden crear en un esquema MBR**: Unidad de estado sólido (SSD).."
    ]
  },
  "si_tema_4": {
    "name": "Tema 4: Usuarios y Permisos",
    "points": [
      "**Qué es un perfil de usuario local en Windows**: La contraseña debe contener una combinación de letras mayúsculas y minúsculas, números y símbolos.. *La contraseña debe contener una combinación de letras mayúsculas y minúsculas, números y símbolos.*"
    ]
  },
  "si_tema_5": {
    "name": "Tema 5: Redes TCP/IP",
    "points": [
      "**Cuál es un ejemplo de protocolo de enrutamiento dinámico**: WAN (Wide Area Network). *WAN (Wide Area Network) es una red de área amplia que conecta redes LAN separadas geográficamente. Internet es la WAN más grande del mundo. MAN cubre una ciudad; LAN cubre un edificio o campus; WLAN es la versión inalámbrica de LAN.*"
    ]
  },
  "si_tema_6": {
    "name": "Tema 6: Seguridad",
    "points": [
      "**Qué es el control de acceso basado en roles**: Para evitar que los usuarios accedan a recursos que no necesitan y reducir el riesgo de violaciones de seguridad.. *Para evitar que los usuarios accedan a recursos que no necesitan y reducir el riesgo de violaciones de seguridad.*"
    ]
  },
  "si_tema_7": {
    "name": "Tema 7: Software y Herramientas",
    "points": [
      "**Cuál es un ejemplo de software de recuperación de datos**: Que pueden crecer y evolucionar a medida que cambian las necesidades de la organización.. *Que pueden crecer y evolucionar a medida que cambian las necesidades de la organización.*"
    ]
  },
  "si_practicas": {
    "name": "🔧 Casos Prácticos (Examen Mayo)",
    "points": [
      "**En la empresa TodoEsGratis se necesita una topología que permita que si un cable falla, el resto de la red siga funcionando. ¿Qué topología cumple mejor este requisito**: Caso 3 (Particiones).. *La herramienta \"Administración de discos\" de Windows permite crear, eliminar, formatear y redimensionar particiones sin software adicional. Se accede desde el Panel de control o ejecutando diskmgmt.msc.*"
    ]
  },
  "si_examen_final": {
    "name": "🎯 SIMULACRO EXAMEN FINAL (60 preguntas)",
    "points": [
      "**En la empresa TodoEsGratis se necesita una topología que permita que si un cable falla, el resto de la red siga funcionando. ¿Qué topología cumple mejor este requisito**: Caso 3 (Particiones).. *La herramienta \"Administración de discos\" de Windows permite crear, eliminar, formatear y redimensionar particiones sin software adicional. Se accede desde el Panel de control o ejecutando diskmgmt.msc.*"
    ]
  },
  "cc_tema_1": {
    "name": "Tema 1: Conceptos Cloud",
    "points": [
      "**Cuál de las siguientes es una ventaja de la computación en la nube**: PaaS.. *PaaS (Platform as a Service) proporciona una plataforma completa de desarrollo y despliegue. El proveedor gestiona la infraestructura; el usuario solo despliega aplicaciones. Ejemplo: Google App Engine.*"
    ]
  },
  "cc_tema_2": {
    "name": "Tema 2: Economía y Facturación",
    "points": [
      "**Qué ventaja ofrece la escalabilidad en la nube**: Uso de inteligencia artificial y aprendizaje automático para optimizar los costes. *Uso de inteligencia artificial y aprendizaje automático para optimizar los costes*"
    ]
  },
  "cc_tema_3": {
    "name": "Tema 3: Infraestructura",
    "points": [
      "**Cuál es una ventaja de las redes de fibra óptica en la nube**: Microsoft Azure."
    ]
  },
  "cc_tema_4": {
    "name": "Tema 4: Seguridad en la Nube",
    "points": [
      "**Cuál de los siguientes métodos de control de acceso permite asignar permisos específicos según la función del usuario en la empresa**: Para mejorar la seguridad de las cuentas y reducir el riesgo de ataques. *Las políticas de contraseñas fuertes mejoran la seguridad de las cuentas y reducen el riesgo de ataques de fuerza bruta, diccionario y accesos no autorizados.*"
    ]
  },
  "cc_tema_5": {
    "name": "Tema 5: Redes y CDN",
    "points": [
      "**Cuál de los siguientes es un beneficio clave de una nube privada virtual (VPC)**: SSL/TLS."
    ]
  },
  "cc_tema_6": {
    "name": "Tema 6: Servicios de Cómputo",
    "points": [
      "**Cuál es una de las principales ventajas de los servicios de cómputo en comparación con la computación tradicional**: PaaS. *PaaS (Platform as a Service) proporciona un entorno completo de desarrollo y despliegue de aplicaciones. El proveedor gestiona la infraestructura; el usuario solo despliega aplicaciones. Ejemplo: Google App Engine.*"
    ]
  },
  "cc_tema_7": {
    "name": "Tema 7: Almacenamiento",
    "points": [
      "**Qué característica es común en los servicios de almacenamiento en la nube**: Almacenamiento de objetos. *El almacenamiento de objetos es más adecuado para análisis de datos a gran escala (data lakes), ya que permite almacenar grandes volúmenes de datos no estructurados accesibles mediante APIs.*"
    ]
  },
  "cc_tema_8": {
    "name": "Tema 8: Bases de Datos Cloud",
    "points": [
      "**Cuál de las siguientes es una característica de las bases de datos analíticas**: Escalabilidad. *La escalabilidad permite que los servicios de bases de datos ajusten su capacidad según la demanda, aumentando o reduciendo recursos de forma dinámica.*"
    ]
  },
  "cc_tema_9": {
    "name": "Tema 9: Arquitectura Cloud",
    "points": [
      "**Cuál de estas estrategias ayuda a optimizar el costo de los recursos en la nube**: Implementar estrategias de respaldo y recuperación. *La respuesta es 'Implementar estrategias de respaldo y recuperación'.*"
    ]
  },
  "cc_tema_10": {
    "name": "Tema 10: Escalado y Monitorización",
    "points": [
      "**Cuál es la principal diferencia entre el escalado horizontal y vertical**: Configurar reglas de escalado precisas y monitorear continuamente la aplicación. *Configurar reglas de escalado precisas y monitorear continuamente la aplicación*"
    ]
  }
};
