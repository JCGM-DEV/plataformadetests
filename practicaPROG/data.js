// =============================================
// PROG LAB — DATA
// =============================================
const UNITS = {
  poo: {
    label: 'T1–T5', title: 'POO & Fundamentos Java',
    sections: [
      { id: 'poo-teoria1', icon: '📖', label: 'Teoría: Clases y Objetos', type: 'lesson', lessonId: 'clases' },
      { id: 'poo-teoria2', icon: '📖', label: 'Teoría: Herencia y Polimorfismo', type: 'lesson', lessonId: 'herencia' },
      { id: 'poo-quiz1', icon: '🧠', label: 'Quiz: POO Fundamentos', type: 'quiz', quizId: 'poo_quiz' },
      { id: 'poo-quiz2', icon: '🧠', label: 'Quiz: Herencia e Interfaces', type: 'quiz', quizId: 'herencia_quiz' },
      { id: 'poo-drag1', icon: '🎯', label: 'Ejercicio: Clasifica conceptos POO', type: 'drag', dragId: 'conceptos_poo' },
      { id: 'poo-drag2', icon: '🎯', label: 'Ejercicio: Modificadores de acceso', type: 'drag', dragId: 'modificadores' },
      { id: 'poo-code', icon: '⌨️', label: 'Lab: Analiza código Java', type: 'code', codeId: 'poo_lab' },
    ]
  },
  colecciones: {
    label: 'T6–T8', title: 'Colecciones & Excepciones',
    sections: [
      { id: 'col-teoria1', icon: '📖', label: 'Teoría: Colecciones Java', type: 'lesson', lessonId: 'colecciones' },
      { id: 'col-teoria2', icon: '📖', label: 'Teoría: Excepciones', type: 'lesson', lessonId: 'excepciones' },
      { id: 'col-quiz1', icon: '🧠', label: 'Quiz: Colecciones', type: 'quiz', quizId: 'col_quiz' },
      { id: 'col-quiz2', icon: '🧠', label: 'Quiz: Excepciones', type: 'quiz', quizId: 'exc_quiz' },
      { id: 'col-drag1', icon: '🎯', label: 'Ejercicio: Elige la colección', type: 'drag', dragId: 'elige_coleccion' },
      { id: 'col-code', icon: '⌨️', label: 'Lab: Colecciones y Excepciones', type: 'code', codeId: 'col_lab' },
    ]
  },
  ficheros: {
    label: 'T9–T10', title: 'Ficheros & Hilos',
    sections: [
      { id: 'fich-teoria1', icon: '📖', label: 'Teoría: Ficheros en Java', type: 'lesson', lessonId: 'ficheros' },
      { id: 'fich-teoria2', icon: '📖', label: 'Teoría: Hilos (Threads)', type: 'lesson', lessonId: 'hilos' },
      { id: 'fich-quiz1', icon: '🧠', label: 'Quiz: Ficheros e I/O', type: 'quiz', quizId: 'fich_quiz' },
      { id: 'fich-drag1', icon: '🎯', label: 'Ejercicio: Clasifica clases I/O', type: 'drag', dragId: 'clases_io' },
      { id: 'fich-code', icon: '⌨️', label: 'Lab: Analiza código de hilos', type: 'code', codeId: 'hilos_lab' },
    ]
  },
  practicas: {
    label: 'EXAMEN', title: 'Prácticas Examen',
    sections: [
      { id: 'prac-guia', icon: '📘', label: 'Guía de Supervivencia', type: 'guide', guideId: 'exam_guide' },
      { id: 'prac-tutor', icon: '🎓', label: '🎓 Tutor Interactivo', type: 'tutor' },
      { id: 'prac-ej1', icon: '📝', label: 'Ejercicio 1: Gestión Empleados', type: 'ejercicio', ejercicioId: 'ej1' },
      { id: 'prac-ej2', icon: '📝', label: 'Ejercicio 2: Sistema Vehículos', type: 'ejercicio', ejercicioId: 'ej2' },
      { id: 'prac-ej3', icon: '📝', label: 'Ejercicio 3: Biblioteca', type: 'ejercicio', ejercicioId: 'ej3' },
    ]
  },
  doctor: {
    label: 'DR. JAVA', title: 'Ejercicios del Doctor',
    sections: []
  }
};


const LESSONS = {
  clases: {
    title: 'Clases y Objetos en Java',
    subtitle: 'Encapsulación, constructores, getters/setters y static',
    concepts: [
      { icon: '🏗️', title: 'Clase vs Objeto', body: 'La <strong>clase</strong> es la plantilla/molde. El <strong>objeto</strong> es la instancia. <code>Coche miCoche = new Coche()</code>: miCoche es el objeto, Coche es la clase.' },
      { icon: '🔒', title: 'Encapsulación', body: 'Atributos <code>private</code> + métodos <code>public</code> getter/setter. Protege el estado interno del objeto. Permite validar antes de asignar.' },
      { icon: '🔨', title: 'Constructores', body: 'Método especial con el mismo nombre que la clase, sin tipo de retorno. Se llama con <code>new</code>. Si no se define, Java crea uno por defecto (sin parámetros). Se puede sobrecargar.' },
      { icon: '📌', title: 'Static', body: '<code>static</code>: pertenece a la clase, no a los objetos. Se accede con <code>NombreClase.metodo()</code>. Compartido por todas las instancias. <code>static final</code> = constante.' },
      { icon: '🔑', title: 'this', body: '<code>this</code>: referencia al objeto actual. Útil para distinguir atributos de parámetros con el mismo nombre. <code>this()</code>: llama a otro constructor de la misma clase.' },
      { icon: '📦', title: 'Paquetes e Imports', body: '<code>package com.empresa.proyecto</code>: declara el paquete. <code>import java.util.ArrayList</code>: importa una clase. <code>import java.util.*</code>: importa todo el paquete.' },
    ],
    codeExample: `<span class="kw">public class</span> <span class="fn">Empleado</span> {
  <span class="cm">// Atributos privados (encapsulación)</span>
  <span class="kw">private</span> <span class="tp">String</span> nombre;
  <span class="kw">private</span> <span class="tp">double</span> salario;
  <span class="kw">private static</span> <span class="tp">int</span> totalEmpleados = <span class="num">0</span>;

  <span class="cm">// Constructor</span>
  <span class="kw">public</span> <span class="fn">Empleado</span>(<span class="tp">String</span> nombre, <span class="tp">double</span> salario) {
    <span class="kw">this</span>.nombre = nombre;
    <span class="kw">this</span>.salario = salario;
    totalEmpleados++;
  }

  <span class="cm">// Getter y Setter</span>
  <span class="kw">public</span> <span class="tp">String</span> <span class="fn">getNombre</span>() { <span class="kw">return</span> nombre; }
  <span class="kw">public void</span> <span class="fn">setSalario</span>(<span class="tp">double</span> s) {
    <span class="kw">if</span> (s > <span class="num">0</span>) <span class="kw">this</span>.salario = s;
  }
}`,
    info: { type: 'tip', text: '💡 <strong>Examen frecuente</strong>: La diferencia entre atributo de instancia (cada objeto tiene el suyo) y atributo estático (compartido por todos los objetos de la clase). static = de la clase.' }
  },

  herencia: {
    title: 'Herencia, Polimorfismo e Interfaces',
    subtitle: 'extends, implements, @Override y clases abstractas',
    concepts: [
      { icon: '▷', title: 'Herencia (extends)', body: '<code>class Perro extends Animal</code>. Perro hereda todos los atributos y métodos no privados de Animal. Java solo permite herencia simple (una sola clase padre).' },
      { icon: '🔄', title: 'Polimorfismo', body: 'Un objeto puede comportarse como su clase o como cualquier superclase. <code>Animal a = new Perro()</code>. El método que se ejecuta depende del tipo real del objeto (enlace dinámico).' },
      { icon: '🔧', title: '@Override', body: 'Sobreescribir un método de la superclase. La anotación <code>@Override</code> es opcional pero recomendada (el compilador verifica que realmente sobreescribes). <code>super.metodo()</code> llama al método del padre.' },
      { icon: '🚫', title: 'Clases Abstractas', body: '<code>abstract class Figura</code>: no se puede instanciar. Puede tener métodos abstractos (sin implementación) y concretos. Las subclases deben implementar los abstractos.' },
      { icon: '📋', title: 'Interfaces', body: '<code>interface Volable</code>: contrato de métodos. Todos los métodos son públicos y abstractos (por defecto). Una clase puede implementar múltiples interfaces: <code>implements A, B</code>.' },
      { icon: '🔑', title: 'super', body: '<code>super()</code>: llama al constructor del padre (debe ser la primera línea). <code>super.metodo()</code>: llama al método del padre. Útil cuando sobreescribes pero quieres mantener el comportamiento original.' },
    ],
    codeExample: `<span class="kw">abstract class</span> <span class="fn">Figura</span> {
  <span class="kw">abstract double</span> <span class="fn">area</span>();  <span class="cm">// sin implementación</span>
  <span class="kw">public void</span> <span class="fn">mostrar</span>() { System.out.println(<span class="str">"Área: "</span> + <span class="fn">area</span>()); }
}

<span class="kw">class</span> <span class="fn">Circulo</span> <span class="kw">extends</span> <span class="fn">Figura</span> <span class="kw">implements</span> <span class="fn">Dibujable</span> {
  <span class="kw">private double</span> radio;
  <span class="kw">public</span> <span class="fn">Circulo</span>(<span class="kw">double</span> r) { <span class="kw">super</span>(); <span class="kw">this</span>.radio = r; }

  <span class="kw">@Override</span>
  <span class="kw">public double</span> <span class="fn">area</span>() { <span class="kw">return</span> Math.PI * radio * radio; }
}`,
    info: { type: 'warning', text: '⚠️ <strong>Clase abstracta vs Interfaz</strong>: Clase abstracta puede tener atributos y métodos concretos; solo herencia simple. Interfaz solo métodos (abstractos por defecto); implementación múltiple. Si preguntan "¿cuándo usar cada uno?": abstracta cuando hay código compartido, interfaz cuando es solo un contrato.' }
  },

  colecciones: {
    title: 'Colecciones en Java',
    subtitle: 'ArrayList, LinkedList, HashMap, HashSet e iteradores',
    concepts: [
      { icon: '📋', title: 'ArrayList', body: 'Lista dinámica basada en array. Acceso por índice O(1). Inserción/borrado en medio O(n). <code>add()</code>, <code>get(i)</code>, <code>remove(i)</code>, <code>size()</code>, <code>contains()</code>.' },
      { icon: '🔗', title: 'LinkedList', body: 'Lista doblemente enlazada. Inserción/borrado en extremos O(1). Acceso por índice O(n). Implementa también Queue y Deque. Útil para pilas y colas.' },
      { icon: '🗺️', title: 'HashMap', body: 'Pares clave-valor. Acceso O(1) por clave. No garantiza orden. <code>put(k,v)</code>, <code>get(k)</code>, <code>containsKey(k)</code>, <code>keySet()</code>, <code>values()</code>, <code>entrySet()</code>.' },
      { icon: '🔵', title: 'HashSet', body: 'Conjunto sin duplicados. Basado en HashMap. No garantiza orden. <code>add()</code>, <code>contains()</code>, <code>remove()</code>. TreeSet mantiene orden natural.' },
      { icon: '🔄', title: 'Iteradores', body: '<code>Iterator&lt;T&gt; it = lista.iterator()</code>. <code>it.hasNext()</code>: hay más elementos. <code>it.next()</code>: siguiente elemento. <code>it.remove()</code>: elimina el actual (seguro durante iteración).' },
      { icon: '📊', title: 'Genéricos', body: '<code>ArrayList&lt;String&gt;</code>: tipo seguro en tiempo de compilación. Evita casting. <code>List&lt;? extends Animal&gt;</code>: wildcard covariante. <code>Collections.sort()</code>, <code>Collections.shuffle()</code>.' },
    ],
    codeExample: `<span class="cm">// ArrayList</span>
<span class="tp">List</span>&lt;<span class="tp">String</span>&gt; nombres = <span class="kw">new</span> <span class="fn">ArrayList</span>&lt;&gt;();
nombres.<span class="fn">add</span>(<span class="str">"Ana"</span>); nombres.<span class="fn">add</span>(<span class="str">"Carlos"</span>);
<span class="kw">for</span> (<span class="tp">String</span> n : nombres) System.out.<span class="fn">println</span>(n);

<span class="cm">// HashMap</span>
<span class="tp">Map</span>&lt;<span class="tp">String</span>, <span class="tp">Integer</span>&gt; edades = <span class="kw">new</span> <span class="fn">HashMap</span>&lt;&gt;();
edades.<span class="fn">put</span>(<span class="str">"Ana"</span>, <span class="num">25</span>);
<span class="kw">for</span> (<span class="tp">Map.Entry</span>&lt;<span class="tp">String</span>,<span class="tp">Integer</span>&gt; e : edades.<span class="fn">entrySet</span>())
  System.out.<span class="fn">println</span>(e.<span class="fn">getKey</span>() + <span class="str">": "</span> + e.<span class="fn">getValue</span>());`,
    info: { type: 'tip', text: '💡 <strong>Cuándo usar cada colección</strong>: ArrayList → acceso por índice frecuente. LinkedList → inserción/borrado frecuente en extremos. HashMap → búsqueda por clave. HashSet → verificar existencia sin duplicados.' }
  },

  excepciones: {
    title: 'Manejo de Excepciones en Java',
    subtitle: 'try-catch-finally, throws, checked vs unchecked',
    concepts: [
      { icon: '🚨', title: 'try-catch-finally', body: '<code>try</code>: código que puede lanzar excepción. <code>catch(TipoEx e)</code>: maneja la excepción. <code>finally</code>: siempre se ejecuta (para cerrar recursos). Puede haber múltiples catch.' },
      { icon: '📤', title: 'throw y throws', body: '<code>throw new IllegalArgumentException("msg")</code>: lanza una excepción. <code>throws IOException</code>: declara que el método puede lanzar esa excepción (checked). El llamador debe manejarla.' },
      { icon: '✅', title: 'Checked vs Unchecked', body: '<strong>Checked</strong>: heredan de Exception (no de RuntimeException). El compilador obliga a manejarlas. Ej: IOException, SQLException. <strong>Unchecked</strong>: heredan de RuntimeException. No obligatorio manejarlas. Ej: NullPointerException, ArrayIndexOutOfBoundsException.' },
      { icon: '🔧', title: 'Excepciones Comunes', body: '<code>NullPointerException</code>: acceso a null. <code>ArrayIndexOutOfBoundsException</code>: índice fuera de rango. <code>ClassCastException</code>: cast inválido. <code>NumberFormatException</code>: conversión de String a número fallida.' },
      { icon: '🏗️', title: 'Excepción Personalizada', body: '<code>class MiExcepcion extends Exception</code>. Constructor que llama a <code>super(mensaje)</code>. Se lanza con <code>throw new MiExcepcion("msg")</code>.' },
      { icon: '🔒', title: 'try-with-resources', body: '<code>try (FileReader fr = new FileReader("f.txt")) { ... }</code>. Cierra automáticamente los recursos al salir del bloque. El recurso debe implementar <code>AutoCloseable</code>.' },
    ],
    codeExample: `<span class="kw">public</span> <span class="tp">int</span> <span class="fn">dividir</span>(<span class="tp">int</span> a, <span class="tp">int</span> b) <span class="kw">throws</span> <span class="tp">ArithmeticException</span> {
  <span class="kw">if</span> (b == <span class="num">0</span>) <span class="kw">throw new</span> <span class="fn">ArithmeticException</span>(<span class="str">"División por cero"</span>);
  <span class="kw">return</span> a / b;
}

<span class="cm">// Uso:</span>
<span class="kw">try</span> {
  <span class="tp">int</span> resultado = <span class="fn">dividir</span>(<span class="num">10</span>, <span class="num">0</span>);
} <span class="kw">catch</span> (<span class="tp">ArithmeticException</span> e) {
  System.out.<span class="fn">println</span>(<span class="str">"Error: "</span> + e.<span class="fn">getMessage</span>());
} <span class="kw">finally</span> {
  System.out.<span class="fn">println</span>(<span class="str">"Siempre se ejecuta"</span>);
}`,
    info: { type: 'warning', text: '⚠️ <strong>finally siempre se ejecuta</strong>: incluso si hay return en el try o catch. Excepción: si se llama System.exit() o hay un error de la JVM. Úsalo para cerrar conexiones, ficheros, etc.' }
  },

  ficheros: {
    title: 'Ficheros en Java',
    subtitle: 'File, FileReader, BufferedReader, FileWriter y serialización',
    concepts: [
      { icon: '📁', title: 'Clase File', body: '<code>File f = new File("ruta.txt")</code>. Métodos: <code>exists()</code>, <code>isFile()</code>, <code>isDirectory()</code>, <code>length()</code>, <code>delete()</code>, <code>mkdir()</code>, <code>listFiles()</code>.' },
      { icon: '📖', title: 'Lectura de Texto', body: '<code>BufferedReader br = new BufferedReader(new FileReader("f.txt"))</code>. <code>br.readLine()</code>: lee una línea. Null cuando termina. Siempre cerrar con <code>br.close()</code> o try-with-resources.' },
      { icon: '✏️', title: 'Escritura de Texto', body: '<code>FileWriter fw = new FileWriter("f.txt")</code>: sobreescribe. <code>new FileWriter("f.txt", true)</code>: añade al final (append). <code>PrintWriter pw</code>: tiene <code>println()</code>.' },
      { icon: '💾', title: 'Serialización', body: 'La clase debe implementar <code>Serializable</code>. <code>ObjectOutputStream oos</code>: escribe objetos. <code>ObjectInputStream ois</code>: lee objetos. <code>serialVersionUID</code>: versión de la clase.' },
      { icon: '🔢', title: 'Ficheros Binarios', body: '<code>FileInputStream</code>/<code>FileOutputStream</code>: bytes. <code>DataInputStream</code>/<code>DataOutputStream</code>: tipos primitivos. <code>RandomAccessFile</code>: acceso aleatorio por posición.' },
      { icon: '🆕', title: 'NIO (Java 7+)', body: '<code>Path path = Paths.get("f.txt")</code>. <code>Files.readAllLines(path)</code>: todas las líneas. <code>Files.write(path, lines)</code>: escribe. <code>Files.copy()</code>, <code>Files.move()</code>.' },
    ],
    codeExample: `<span class="cm">// Leer fichero con try-with-resources</span>
<span class="kw">try</span> (<span class="tp">BufferedReader</span> br = <span class="kw">new</span> <span class="fn">BufferedReader</span>(
    <span class="kw">new</span> <span class="fn">FileReader</span>(<span class="str">"datos.txt"</span>))) {
  <span class="tp">String</span> linea;
  <span class="kw">while</span> ((linea = br.<span class="fn">readLine</span>()) != <span class="kw">null</span>) {
    System.out.<span class="fn">println</span>(linea);
  }
} <span class="kw">catch</span> (<span class="tp">IOException</span> e) {
  e.<span class="fn">printStackTrace</span>();
}`,
    info: { type: 'tip', text: '💡 <strong>try-with-resources</strong>: la forma moderna y segura de trabajar con ficheros. El recurso se cierra automáticamente al salir del bloque, incluso si hay excepción. Evita el finally con close().' }
  },

  hilos: {
    title: 'Hilos (Threads) en Java',
    subtitle: 'Thread, Runnable, sincronización y estados',
    concepts: [
      { icon: '🧵', title: 'Crear un Hilo', body: '1. Extender <code>Thread</code> y sobreescribir <code>run()</code>. 2. Implementar <code>Runnable</code> y pasar al constructor de Thread. La segunda opción es preferible (permite herencia de otra clase).' },
      { icon: '▶️', title: 'Ciclo de Vida', body: 'NEW → RUNNABLE → RUNNING → BLOCKED/WAITING → TERMINATED. <code>start()</code>: inicia el hilo (llama a run() en nuevo hilo). <code>run()</code>: ejecuta en el hilo actual (no crea nuevo hilo).' },
      { icon: '🔒', title: 'synchronized', body: '<code>synchronized</code> en método o bloque: solo un hilo puede ejecutarlo a la vez. Evita condiciones de carrera. El objeto actúa como monitor (lock).' },
      { icon: '⏸️', title: 'wait() y notify()', body: '<code>wait()</code>: el hilo espera y libera el lock. <code>notify()</code>: despierta un hilo en espera. <code>notifyAll()</code>: despierta todos. Deben llamarse dentro de bloque synchronized.' },
      { icon: '😴', title: 'sleep() y join()', body: '<code>Thread.sleep(ms)</code>: pausa el hilo actual (lanza InterruptedException). <code>hilo.join()</code>: espera a que el hilo termine antes de continuar.' },
      { icon: '⚡', title: 'volatile y AtomicInteger', body: '<code>volatile</code>: garantiza visibilidad entre hilos (no cachea en CPU). <code>AtomicInteger</code>: operaciones atómicas sin synchronized. Más eficiente para contadores.' },
    ],
    codeExample: `<span class="cm">// Implementar Runnable (forma recomendada)</span>
<span class="kw">class</span> <span class="fn">MiTarea</span> <span class="kw">implements</span> <span class="fn">Runnable</span> {
  <span class="kw">@Override</span>
  <span class="kw">public void</span> <span class="fn">run</span>() {
    System.out.<span class="fn">println</span>(<span class="str">"Hilo: "</span> + Thread.<span class="fn">currentThread</span>().<span class="fn">getName</span>());
  }
}

<span class="cm">// Crear y arrancar</span>
<span class="tp">Thread</span> t = <span class="kw">new</span> <span class="fn">Thread</span>(<span class="kw">new</span> <span class="fn">MiTarea</span>());
t.<span class="fn">start</span>();  <span class="cm">// ¡NO llamar a run() directamente!</span>`,
    info: { type: 'warning', text: '⚠️ <strong>start() vs run()</strong>: start() crea un nuevo hilo y ejecuta run() en él. run() ejecuta el código en el hilo actual (no crea nuevo hilo). ¡Error muy común en examen!' }
  }
};

const QUIZZES = {
  poo_quiz: { title: 'Quiz: POO Fundamentos', questions: [
    { q: '¿Qué principio POO oculta los atributos con private y los expone con getters/setters?', hint: 'Protege el estado interno.',
      opts: ['Herencia', 'Polimorfismo', 'Encapsulación', 'Abstracción'], ans: 2,
      exp: '<strong>Encapsulación</strong>: ocultar los detalles internos y exponer solo lo necesario. Atributos private + métodos public getter/setter.' },
    { q: '¿Qué hace la palabra clave "static" en un atributo de clase?', hint: 'Compartido por todos los objetos.',
      opts: ['Lo hace privado', 'Lo hace constante', 'Lo hace compartido por todas las instancias de la clase', 'Lo hace abstracto'], ans: 2,
      exp: '<strong>static</strong>: el atributo pertenece a la clase, no a los objetos. Todos los objetos comparten el mismo valor. Se accede con NombreClase.atributo.' },
    { q: '¿Qué es "this" en Java?', hint: 'Referencia especial dentro de un método.',
      opts: ['El objeto padre', 'La clase actual', 'Una referencia al objeto actual', 'El constructor por defecto'], ans: 2,
      exp: '<strong>this</strong> es una referencia al objeto actual. Se usa para distinguir atributos de parámetros con el mismo nombre, o para llamar a otro constructor con this().' },
    { q: '¿Cuántas clases padre puede tener una clase en Java?', hint: 'Java no permite herencia múltiple de clases.',
      opts: ['Sin límite', 'Máximo 2', 'Exactamente 1 (herencia simple)', 'Ninguna'], ans: 2,
      exp: 'Java solo permite <strong>herencia simple</strong>: una clase solo puede extender una clase padre. Para herencia múltiple se usan interfaces (implements A, B, C).' },
    { q: '¿Qué modificador de acceso permite acceso solo desde la misma clase?', hint: 'El más restrictivo.',
      opts: ['public', 'protected', 'default (sin modificador)', 'private'], ans: 3,
      exp: '<strong>private</strong>: solo accesible desde dentro de la misma clase. protected: clase + subclases + mismo paquete. public: desde cualquier lugar.' },
    { q: 'Si una clase no define constructor, ¿qué ocurre?', hint: 'Java tiene un comportamiento por defecto.',
      opts: ['Error de compilación', 'Java crea automáticamente un constructor sin parámetros', 'No se puede instanciar la clase', 'Se hereda el constructor de Object'], ans: 1,
      exp: 'Si no defines ningún constructor, Java crea automáticamente un <strong>constructor por defecto</strong> (sin parámetros). Si defines cualquier constructor, el por defecto ya no se crea.' }
  ]},
  herencia_quiz: { title: 'Quiz: Herencia e Interfaces', questions: [
    { q: '¿Qué diferencia hay entre clase abstracta e interfaz?', hint: 'Sobre implementación y herencia.',
      opts: [
        'No hay diferencia, son sinónimos',
        'Clase abstracta puede tener código concreto y solo herencia simple; interfaz solo métodos abstractos y permite implementación múltiple',
        'La interfaz puede tener atributos de instancia; la clase abstracta no',
        'La clase abstracta se implementa con implements; la interfaz con extends'
      ], ans: 1,
      exp: '<strong>Clase abstracta</strong>: puede tener métodos concretos y abstractos, atributos, herencia simple (extends). <strong>Interfaz</strong>: métodos abstractos por defecto, implementación múltiple (implements A, B).' },
    { q: '¿Qué hace @Override?', hint: 'Anotación sobre un método.',
      opts: ['Hace el método privado', 'Indica que el método sobreescribe uno de la superclase', 'Crea un nuevo método', 'Llama al método del padre'], ans: 1,
      exp: '<strong>@Override</strong> indica que el método sobreescribe uno de la superclase. El compilador verifica que realmente existe ese método en el padre. Es opcional pero muy recomendable.' },
    { q: '¿Cómo se llama al constructor de la clase padre?', hint: 'Palabra clave especial.',
      opts: ['parent()', 'super()', 'base()', 'this()'], ans: 1,
      exp: '<strong>super()</strong> llama al constructor de la clase padre. Debe ser la primera instrucción del constructor hijo. super.metodo() llama a un método del padre.' },
    { q: 'Una clase abstracta con el método abstracto "area()" tiene subclases Circulo y Rectangulo. ¿Qué DEBEN hacer estas subclases?', hint: 'Obligación de las subclases.',
      opts: ['Nada, es opcional', 'Implementar el método area()', 'Declararse también abstractas', 'Llamar a super.area()'], ans: 1,
      exp: 'Las subclases concretas <strong>deben implementar todos los métodos abstractos</strong> de la clase padre. Si no lo hacen, deben declararse también abstractas.' },
    { q: '¿Puede una clase implementar múltiples interfaces?', hint: 'Diferencia con la herencia de clases.',
      opts: ['No, solo una interfaz', 'Sí, con implements A, B, C', 'Solo si las interfaces no tienen métodos en común', 'Solo en Java 8+'], ans: 1,
      exp: 'Sí, una clase puede implementar <strong>múltiples interfaces</strong>: class MiClase implements Volable, Nadable, Corredora. Esto es la forma de Java de simular herencia múltiple.' }
  ]},
  col_quiz: { title: 'Quiz: Colecciones', questions: [
    { q: '¿Qué colección Java permite almacenar pares clave-valor?', hint: 'Como un diccionario.',
      opts: ['ArrayList', 'LinkedList', 'HashMap', 'HashSet'], ans: 2,
      exp: '<strong>HashMap</strong> almacena pares clave-valor. Acceso O(1) por clave. No garantiza orden. TreeMap mantiene orden por clave.' },
    { q: '¿Qué colección NO permite elementos duplicados?', hint: 'Conjunto matemático.',
      opts: ['ArrayList', 'LinkedList', 'HashMap', 'HashSet'], ans: 3,
      exp: '<strong>HashSet</strong> no permite duplicados. Si intentas añadir un elemento que ya existe, add() devuelve false y no lo añade.' },
    { q: '¿Cuál es la diferencia principal entre ArrayList y LinkedList?', hint: 'Sobre acceso e inserción.',
      opts: ['No hay diferencia', 'ArrayList: acceso O(1) por índice; LinkedList: inserción/borrado en extremos O(1)', 'LinkedList es siempre más rápida', 'ArrayList no permite null'], ans: 1,
      exp: '<strong>ArrayList</strong>: acceso por índice O(1), inserción en medio O(n). <strong>LinkedList</strong>: acceso por índice O(n), inserción/borrado en extremos O(1). Elige según el uso predominante.' },
    { q: '¿Qué método de Iterator permite eliminar el elemento actual de forma segura?', hint: 'No usar list.remove() durante iteración.',
      opts: ['delete()', 'remove()', 'pop()', 'discard()'], ans: 1,
      exp: '<strong>it.remove()</strong> elimina el elemento actual de forma segura durante la iteración. Usar list.remove() directamente durante un for-each lanza ConcurrentModificationException.' }
  ]},
  exc_quiz: { title: 'Quiz: Excepciones', questions: [
    { q: '¿Qué tipo de excepción OBLIGA al compilador a manejarla (try-catch o throws)?', hint: 'Verificada en tiempo de compilación.',
      opts: ['RuntimeException', 'Error', 'Checked Exception (hereda de Exception)', 'NullPointerException'], ans: 2,
      exp: '<strong>Checked exceptions</strong> (heredan de Exception, no de RuntimeException): el compilador obliga a manejarlas. Ej: IOException, SQLException. Las unchecked (RuntimeException) son opcionales.' },
    { q: '¿Cuándo se ejecuta el bloque finally?', hint: 'Siempre, con excepciones.',
      opts: ['Solo si no hay excepción', 'Solo si hay excepción', 'Siempre, haya o no excepción', 'Solo si el catch no maneja la excepción'], ans: 2,
      exp: '<strong>finally siempre se ejecuta</strong>: tanto si hay excepción como si no. Incluso si hay return en el try. Excepción: System.exit() o error de la JVM.' },
    { q: '¿Qué excepción se lanza al acceder a un índice fuera del rango de un array?', hint: 'Muy común en bucles.',
      opts: ['NullPointerException', 'IndexOutOfBoundsException / ArrayIndexOutOfBoundsException', 'IllegalArgumentException', 'ClassCastException'], ans: 1,
      exp: '<strong>ArrayIndexOutOfBoundsException</strong> (o IndexOutOfBoundsException para listas). Se lanza cuando el índice es negativo o >= longitud del array/lista.' }
  ]},
  fich_quiz: { title: 'Quiz: Ficheros e I/O', questions: [
    { q: '¿Qué clase se usa para leer texto línea a línea de forma eficiente?', hint: 'Tiene el método readLine().',
      opts: ['FileReader', 'BufferedReader', 'InputStreamReader', 'Scanner'], ans: 1,
      exp: '<strong>BufferedReader</strong> tiene el método readLine() que lee una línea completa. Se envuelve sobre FileReader para mayor eficiencia (usa buffer interno).' },
    { q: '¿Qué debe implementar una clase para poder ser serializada?', hint: 'Interfaz marcadora.',
      opts: ['Cloneable', 'Comparable', 'Serializable', 'AutoCloseable'], ans: 2,
      exp: 'La clase debe implementar <strong>Serializable</strong> (interfaz marcadora, sin métodos). Permite convertir el objeto a bytes para guardarlo o enviarlo por red.' },
    { q: '¿Qué hace new FileWriter("f.txt", true)?', hint: 'El segundo parámetro es append.',
      opts: ['Crea el fichero si no existe y sobreescribe', 'Abre el fichero en modo lectura', 'Abre el fichero en modo append (añade al final)', 'Lanza excepción si el fichero existe'], ans: 2,
      exp: 'El segundo parámetro <strong>true</strong> activa el modo <strong>append</strong>: el contenido se añade al final del fichero existente. Sin ese parámetro (o false), sobreescribe el fichero.' },
    { q: '¿Qué ventaja tiene try-with-resources sobre try-catch-finally para ficheros?', hint: 'Sobre el cierre de recursos.',
      opts: ['Es más rápido', 'Cierra automáticamente el recurso al salir del bloque', 'Permite múltiples catch', 'No lanza excepciones'], ans: 1,
      exp: '<strong>try-with-resources</strong> cierra automáticamente el recurso (llama a close()) al salir del bloque, incluso si hay excepción. Evita el finally con close() manual.' }
  ]}
};

const DRAG_EXERCISES = {
  conceptos_poo: { title: 'Clasifica el Concepto POO', description: 'Arrastra cada descripción al pilar de la POO que representa.',
    exercises: [
      { scenario: 'Atributos private con métodos public getNombre() y setNombre() para controlar el acceso.', chips: ['Encapsulación', 'Herencia', 'Polimorfismo', 'Abstracción'], answer: 'Encapsulación', explanation: 'Encapsulación: ocultar el estado interno y exponer solo lo necesario mediante métodos públicos.' },
      { scenario: 'class Perro extends Animal. Perro hereda los métodos comer() y dormir() de Animal.', chips: ['Encapsulación', 'Herencia', 'Polimorfismo', 'Abstracción'], answer: 'Herencia', explanation: 'Herencia: una clase (Perro) adquiere los atributos y métodos de otra (Animal) usando extends.' },
      { scenario: 'Animal a = new Perro(). Al llamar a a.hacerSonido(), se ejecuta el método de Perro, no de Animal.', chips: ['Encapsulación', 'Herencia', 'Polimorfismo', 'Abstracción'], answer: 'Polimorfismo', explanation: 'Polimorfismo: el mismo método se comporta diferente según el tipo real del objeto (enlace dinámico).' },
      { scenario: 'abstract class Figura con método abstracto area(). No se puede instanciar directamente.', chips: ['Encapsulación', 'Herencia', 'Polimorfismo', 'Abstracción'], answer: 'Abstracción', explanation: 'Abstracción: definir una interfaz/clase abstracta que oculta los detalles de implementación.' }
    ]
  },
  modificadores: { title: 'Modificadores de Acceso', description: 'Arrastra el modificador correcto para cada descripción.',
    exercises: [
      { scenario: 'Accesible desde cualquier clase, en cualquier paquete.', chips: ['public', 'private', 'protected', 'default'], answer: 'public', explanation: 'public: sin restricciones de acceso. Accesible desde cualquier lugar.' },
      { scenario: 'Solo accesible desde dentro de la misma clase.', chips: ['public', 'private', 'protected', 'default'], answer: 'private', explanation: 'private: el más restrictivo. Solo la propia clase puede acceder.' },
      { scenario: 'Accesible desde la clase, sus subclases y clases del mismo paquete.', chips: ['public', 'private', 'protected', 'default'], answer: 'protected', explanation: 'protected: clase + subclases (aunque estén en otro paquete) + clases del mismo paquete.' },
      { scenario: 'Sin modificador explícito. Accesible solo dentro del mismo paquete.', chips: ['public', 'private', 'protected', 'default'], answer: 'default', explanation: 'default (package-private): sin modificador. Solo accesible desde clases del mismo paquete.' }
    ]
  },
  elige_coleccion: { title: 'Elige la Colección Correcta', description: 'Para cada caso de uso, selecciona la colección más adecuada.',
    exercises: [
      { scenario: 'Necesitas almacenar una lista de nombres y acceder a ellos por posición (índice) frecuentemente.', chips: ['ArrayList', 'LinkedList', 'HashMap', 'HashSet'], answer: 'ArrayList', explanation: 'ArrayList: acceso por índice O(1). Ideal cuando el acceso aleatorio es frecuente.' },
      { scenario: 'Necesitas un diccionario de palabras con su traducción. Búsqueda por palabra clave.', chips: ['ArrayList', 'LinkedList', 'HashMap', 'HashSet'], answer: 'HashMap', explanation: 'HashMap: pares clave-valor, búsqueda O(1) por clave. Perfecto para diccionarios y cachés.' },
      { scenario: 'Necesitas almacenar emails únicos de usuarios (sin repetidos).', chips: ['ArrayList', 'LinkedList', 'HashMap', 'HashSet'], answer: 'HashSet', explanation: 'HashSet: no permite duplicados. Ideal para conjuntos donde la unicidad es importante.' },
      { scenario: 'Necesitas una cola (FIFO) donde añades al final y extraes del principio frecuentemente.', chips: ['ArrayList', 'LinkedList', 'HashMap', 'HashSet'], answer: 'LinkedList', explanation: 'LinkedList implementa Queue. Inserción/extracción en extremos O(1). Ideal para colas y pilas.' }
    ]
  },
  clases_io: { title: 'Clasifica las Clases I/O', description: 'Arrastra cada clase a su categoría correcta.',
    exercises: [
      { scenario: 'FileReader', chips: ['Lectura de texto', 'Escritura de texto', 'Lectura binaria', 'Escritura binaria'], answer: 'Lectura de texto', explanation: 'FileReader lee caracteres (texto) de un fichero. Se suele envolver en BufferedReader para mayor eficiencia.' },
      { scenario: 'FileOutputStream', chips: ['Lectura de texto', 'Escritura de texto', 'Lectura binaria', 'Escritura binaria'], answer: 'Escritura binaria', explanation: 'FileOutputStream escribe bytes (datos binarios) en un fichero.' },
      { scenario: 'BufferedWriter', chips: ['Lectura de texto', 'Escritura de texto', 'Lectura binaria', 'Escritura binaria'], answer: 'Escritura de texto', explanation: 'BufferedWriter escribe texto con buffer. Tiene el método newLine() para saltos de línea.' },
      { scenario: 'ObjectInputStream', chips: ['Lectura de texto', 'Escritura de texto', 'Deserialización', 'Serialización'], answer: 'Deserialización', explanation: 'ObjectInputStream lee objetos serializados (deserialización). Usa readObject() para recuperar el objeto.' }
    ]
  }
};

const CODE_LABS = {
  poo_lab: {
    title: 'Lab: Analiza y Completa Código Java',
    description: 'Lee el código, identifica errores o completa los huecos. El simulador analiza la estructura del código.',
    exercises: [
      { id: 1, title: 'Clase con encapsulación', desc: 'Completa la clase Producto con: atributo privado precio (double), constructor que recibe nombre y precio, getter getPrecio() y setter setPrecio() que valide que el precio sea positivo.',
        hint: 'private double precio; public void setPrecio(double p) { if (p > 0) this.precio = p; }',
        starter: `public class Producto {
    private String nombre;
    // TODO: añadir atributo precio (double, privado)
    
    // TODO: constructor(String nombre, double precio)
    public Producto(String nombre) {
        this.nombre = nombre;
    }
    
    public String getNombre() { return nombre; }
    
    // TODO: getter getPrecio()
    
    // TODO: setter setPrecio() con validación (precio > 0)
}`,
        solution: `public class Producto {
    private String nombre;
    private double precio;
    
    public Producto(String nombre, double precio) {
        this.nombre = nombre;
        setPrecio(precio);
    }
    
    public String getNombre() { return nombre; }
    public double getPrecio() { return precio; }
    
    public void setPrecio(double p) {
        if (p > 0) this.precio = p;
    }
} `,
        checks: [
          { desc: 'Tiene atributo private double precio', test: code => /private\s+double\s+precio/.test(code) },
          { desc: 'Constructor recibe nombre y precio', test: code => /Producto\s*\(\s*String\s+\w+\s*,\s*double\s+\w+\s*\)/.test(code) },
          { desc: 'Tiene método getPrecio()', test: code => /getPrecio\s*\(\s*\)/.test(code) },
          { desc: 'Setter valida precio > 0', test: code => /setPrecio/.test(code) && />/.test(code) && /0/.test(code) }
        ]
      },
      { id: 2, title: 'Herencia y @Override', desc: 'Completa la clase Circulo que extiende Figura. Debe implementar el método abstracto area() usando Math.PI * radio * radio.',
        hint: '@Override public double area() { return Math.PI * radio * radio; }',
        starter: `abstract class Figura {
    abstract double area();
    public void mostrar() {
        System.out.println("Área: " + area());
    }
}

// TODO: Circulo extiende Figura
class Circulo {
    private double radio;
    
    public Circulo(double radio) {
        this.radio = radio;
    }
    
    // TODO: implementar area() con @Override
    // Fórmula: Math.PI * radio * radio
}`,
        solution: `class Circulo extends Figura {
    private double radio;
    
    public Circulo(double radio) {
        this.radio = radio;
    }
    
    @Override
    double area() {
        return Math.PI * radio * radio;
    }
} `,
        checks: [
          { desc: 'Circulo extiende Figura', test: code => /class\s+Circulo\s+extends\s+Figura/.test(code) },
          { desc: 'Tiene @Override', test: code => /@Override/.test(code) },
          { desc: 'Implementa area()', test: code => /double\s+area\s*\(\s*\)/.test(code) },
          { desc: 'Usa Math.PI', test: code => /Math\.PI/.test(code) }
        ]
      },
      { id: 3, title: 'Interfaz e implementación', desc: 'Crea la interfaz Calculable con el método abstracto calcularTotal(). Luego haz que Factura implemente Calculable.',
        hint: 'interface Calculable { double calcularTotal(); } class Factura implements Calculable { ... }',
        starter: `// TODO: crear interfaz Calculable con método calcularTotal() que devuelve double

// TODO: Factura implementa Calculable
class Factura {
    private double subtotal;
    private double iva;
    
    public Factura(double subtotal, double iva) {
        this.subtotal = subtotal;
        this.iva = iva;
    }
    
    // TODO: implementar calcularTotal() → subtotal + (subtotal * iva / 100)
}`,
        solution: `interface Calculable {
    double calcularTotal();
}

class Factura implements Calculable {
    private double subtotal;
    private double iva;
    
    public Factura(double subtotal, double iva) {
        this.subtotal = subtotal;
        this.iva = iva;
    }
    
    @Override
    public double calcularTotal() {
        return subtotal + (subtotal * iva / 100);
    }
} `,
        checks: [
          { desc: 'Existe interfaz Calculable', test: code => /interface\s+Calculable/.test(code) },
          { desc: 'Factura implementa Calculable', test: code => /class\s+Factura\s+implements\s+Calculable/.test(code) },
          { desc: 'Implementa calcularTotal()', test: code => /calcularTotal\s*\(\s*\)/.test(code) }
        ]
      }
    ]
  },
  col_lab: {
    title: 'Lab: Colecciones y Excepciones',
    exercises: [
      { id: 1, title: 'ArrayList con iteración', desc: 'Crea un ArrayList de enteros, añade 5 números, luego usa un bucle for-each para imprimir solo los pares.',
        hint: 'if (num % 2 == 0) System.out.println(num);',
        starter: `import java.util.ArrayList;
import java.util.List;

public class EjemploLista {
    public static void main(String[] args) {
        // TODO: crear ArrayList<Integer>
        
        // TODO: añadir 5 números (ej: 1,2,3,4,5)
        
        // TODO: for-each para imprimir solo los pares
    }
}`,
        solution: `import java.util.ArrayList;

public class EjemploLista {
    public static void main(String[] args) {
        ArrayList<Integer> numeros = new ArrayList<>();
        numeros.add(1);
        numeros.add(4);
        numeros.add(7);
        numeros.add(10);
        numeros.add(12);
        
        for (Integer num : numeros) {
            if (num % 2 == 0) {
                System.out.println(num);
            }
        }
    }
} `,
        checks: [
          { desc: 'Usa ArrayList', test: code => /ArrayList/.test(code) },
          { desc: 'Usa for-each o for', test: code => /for\s*\(/.test(code) },
          { desc: 'Comprueba paridad con %', test: code => /%\s*2/.test(code) }
        ]
      },
      { id: 2, title: 'try-catch con excepción personalizada', desc: 'Crea una excepción SaldoInsuficienteException. En el método retirar(), lánzala si el importe supera el saldo.',
        hint: 'class SaldoInsuficienteException extends Exception { ... } throw new SaldoInsuficienteException("msg");',
        starter: `// TODO: crear clase SaldoInsuficienteException que extiende Exception

public class CuentaBancaria {
    private double saldo;
    
    public CuentaBancaria(double saldoInicial) {
        this.saldo = saldoInicial;
    }
    
    // TODO: método retirar(double importe) throws SaldoInsuficienteException
    // Si importe > saldo, lanzar la excepción
    // Si no, restar del saldo
    
    public double getSaldo() { return saldo; }
}`,
        solution: `class SaldoInsuficienteException extends Exception {
    public SaldoInsuficienteException(String msg) {
        super(msg);
    }
}

public class CuentaBancaria {
    private double saldo;
    
    public CuentaBancaria(double saldoInicial) {
        this.saldo = saldoInicial;
    }
    
    public void retirar(double importe) throws SaldoInsuficienteException {
        if (importe > saldo) {
            throw new SaldoInsuficienteException("Saldo insuficiente");
        }
        saldo -= importe;
    }
    
    public double getSaldo() { return saldo; }
} `,
        checks: [
          { desc: 'Crea excepción personalizada', test: code => /class\s+SaldoInsuficienteException\s+extends\s+Exception/.test(code) },
          { desc: 'Método retirar con throws', test: code => /retirar.+throws\s+SaldoInsuficienteException/.test(code) },
          { desc: 'Lanza la excepción', test: code => /throw\s+new\s+SaldoInsuficienteException/.test(code) }
        ]
      }
    ]
  },
  hilos_lab: {
    title: 'Lab: Hilos y Sincronización',
    exercises: [
      { id: 1, title: 'Crear hilo con Runnable', desc: 'Crea una clase ContadorRunnable que implemente Runnable. En run(), imprime los números del 1 al 5 con el nombre del hilo.',
        hint: 'Thread.currentThread().getName() para obtener el nombre del hilo',
        starter: `// TODO: crear ContadorRunnable que implemente Runnable
// En run(): bucle del 1 al 5, imprimir "Hilo X: número N"

public class Main {
    public static void main(String[] args) {
        // TODO: crear Thread con new Thread(new ContadorRunnable())
        // TODO: llamar a start() (NO a run())
    }
}`,
        solution: `class ContadorRunnable implements Runnable {
    @Override
    public void run() {
        for (int i = 1; i <= 5; i++) {
            System.out.println(Thread.currentThread().getName() + ": número " + i);
        }
    }
}

public class Main {
    public static void main(String[] args) {
        Thread h1 = new Thread(new ContadorRunnable(), "Hilo 1");
        h1.start();
    }
} `,
        checks: [
          { desc: 'Implementa Runnable', test: code => /implements\s+Runnable/.test(code) },
          { desc: 'Sobreescribe run()', test: code => /void\s+run\s*\(\s*\)/.test(code) },
          { desc: 'Usa start() no run()', test: code => /\.start\s*\(\s*\)/.test(code) && !/new\s+\w+\(\s*\)\s*\.run/.test(code) }
        ]
      }
    ]
  }
};

const GUIDES = [
  {
    id: 'exam_guide',
    title: 'Cómo Aprobar el Examen de Programación',
    subtitle: 'El enfoque táctico para no perderte entre Clases y Objetos.',
    content: `
      <div class="guide-section">
        <h3>1. Lee el enunciado rompiéndolo en Fases</h3>
        <p>No intentes programar todo a la vez. El examen está diseñado para evaluar piezas individuales. Divídelo mentalmente en:</p>
        <ul class="guide-list">
          <li><strong>Clases Base (Fáciles):</strong> Son las clases que no tienen mucha lógica, solo atributos, getters y setters. Hazlas primero, son puntos asegurados.</li>
          <li><strong>Herencia e Interfaces (Medio):</strong> Fíjate en palabras como "Tipos de..." (Herencia) o "Comportamientos compartidos" (Interfaces).</li>
          <li><strong>El Main y la Lógica (Avanzado):</strong> Recorrer listas (ArrayList), agrupar en diccionarios (HashMap) y capturar excepciones (try-catch).</li>
        </ul>
      </div>

      <div class="guide-section warning-section">
        <h3>2. Herencia VS Interfaces: Evita la Trampa</h3>
        <div class="trap-alert">
          <strong>🚨 La Trampa Típica:</strong> Te piden hacer un "Patinete" y un "Helicóptero". Ambos *se mueven*, así que quieres usar herencia de la clase 'Vehículo'. ¡Error, sus lógicas internas son totalmente distintas! Si comparten *acciones* pero NO naturalezas, usa una <code>interface Movible</code>.
        </div>
        <p><strong>Usa <code style="color:var(--yellow)">abstract class</code> cuando:</strong> Las clases hijas comparten código real y atributos genéricos (ej. <code>nombre</code>, <code>id</code>).</p>
        <p><strong>Usa <code style="color:var(--green)">interface</code> cuando:</strong> Solo comparten la firma del método, y cada uno lo implementa a su manera radicalmente diferente (ej. <code>void cargarBateria()</code>).</p>
      </div>

      <div class="guide-section highlight-section">
        <h3>3. Trucos Rápidos para ganar puntos</h3>
        <ul class="guide-list">
          <li><strong>Polimorfismo gratuito:</strong> Si tienes una herencia <code>Perro extends Animal</code>, siempre crea tus ArrayList usando el padre: <code>List&lt;Animal&gt; lista = new ArrayList&lt;&gt;();</code>. Usar <code>List&lt;Perro&gt;</code> es un error de diseño frecuente.</li>
          <li><strong>Encapsulación estricta:</strong> NUNCA dejes atributos públicos. Siempre <code>private</code> e incluye <code>getters/setters</code>. Perderás puntos por no hacerlo aunque tu lógica sea perfecta.</li>
          <li><strong>Excepciones / Nullointers:</strong> Cuando busques algo en un <code>ArrayList</code>, siempre devuelve <code>null</code> o lanza una excepción si no lo encuentras.</li>
        </ul>
      </div>
    `
  }
];
