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
    label: 'REPASO', title: 'Ejercicios de Examen',
    sections: [
      { id: 'prac-guia', icon: '📘', label: 'Survival Guide (Claves)', type: 'guide', guideId: 'exam_guide' },
      { id: 'prac-ej1', icon: '📝', label: 'Ejercicio 1: Vehículos', type: 'ejercicio', ejercicioId: 'ej1' },
      { id: 'prac-ej2', icon: '📝', label: 'Ejercicio 2: Empleados', type: 'ejercicio', ejercicioId: 'ej2' },
    ]
  },
  simulacros: {
    label: 'SIMULACRO', title: 'Simulacros Reales',
    sections: [
      { id: 'sim-quiz', icon: '🧠', label: 'Test de Examen', type: 'quiz', quizId: 'poo_quiz' },
      { id: 'sim-ej1', icon: '📝', label: 'Práctico A: Flota', type: 'ejercicio', ejercicioId: 'ej1' },
      { id: 'sim-ej2', icon: '📝', label: 'Práctico B: Nóminas', type: 'ejercicio', ejercicioId: 'ej2' },
    ]
  },
  simulacro_final: {
    label: 'SIMULACRO FINAL', title: 'Examen Final de Programación',
    sections: [
      { id: 'sim-final-guia', icon: '📘', label: 'Estrategia de Examen', type: 'guide', guideId: 'exam_guide' },
      { id: 'sim-final-quiz', icon: '🧠', label: 'Parte A: Test (40 preguntas)', type: 'quiz', quizId: 'final_simulacro_quiz' },
      { id: 'sim-final-ej1', icon: '📝', label: 'Parte B1: Gestión de Hotel', type: 'ejercicio', ejercicioId: 'ej_final1' },
      { id: 'sim-final-ej2', icon: '📝', label: 'Parte B2: Nóminas IT', type: 'ejercicio', ejercicioId: 'ej_final2' },
    ]
  },
  simulacro_extra: {
    label: 'SIMULACRO II', title: 'Simulacro B (Collections & Map)',
    sections: [
      { id: 'sim-ex-guia', icon: '📘', label: 'Survival Guide (Colecciones)', type: 'guide', guideId: 'exam_guide' },
      { id: 'sim-ex-quiz', icon: '🧠', label: 'Test de Examen B (40 preguntas)', type: 'quiz', quizId: 'simulacro_2_quiz' },
      { id: 'sim-ex-ej1', icon: '📝', label: 'Práctico C: Inventario HashMap', type: 'ejercicio', ejercicioId: 'ej_sim2_1' },
      { id: 'sim-ex-ej2', icon: '📝', label: 'Práctico D: Registro HashSet', type: 'ejercicio', ejercicioId: 'ej_sim2_2' },
    ]
  },
  pilas_colas: {
    label: 'DYNAMIC', title: 'Pilas y Colas (Estructuras LIFO/FIFO)',
    sections: [
      { id: 'pc-guia', icon: '📘', label: 'Guía: Pilas vs Colas', type: 'guide', guideId: 'exam_guide' },
      { id: 'pc-ej1', icon: '📝', label: 'Pila (Stack): Historial', type: 'ejercicio', ejercicioId: 'ej_stack_1' },
      { id: 'pc-ej2', icon: '📝', label: 'Cola (Queue): Impresora', type: 'ejercicio', ejercicioId: 'ej_queue_1' },
      { id: 'pc-ej3', icon: '📝', label: 'Caso Mixto: Soporte Técnico', type: 'ejercicio', ejercicioId: 'ej_final2' },
    ]
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
  poo_quiz: { title: 'Examen de Simulación (Nivel Oficial)', questions: [
    { q: "Los lenguajes de programación utilizan distintos tipos de datos para representar la información y gestionar la memoria de forma adecuada. ¿Cuál de los siguientes no pertenece a los tipos de datos básicos o primitivos?", hint: "Refuerza este concepto.",
      opts: ["Número entero", "Valor booleano", "Array o arreglo", "Ninguna de las anteriores opciones es completamente correcta en este contexto"], ans: 2,
      exp: "Un array o arreglo es una estructura de datos, no un tipo primitivo básico (int, boolean, char, etc.)." },
    { q: "Aunque a menudo se confunden, los conceptos de algoritmo y programa no son equivalentes. ¿Cuál de las siguientes afirmaciones describe correctamente la relación entre ambos?", hint: "Refuerza este concepto.",
      opts: ["El algoritmo es la lógica del problema y el programa es su implementación en un lenguaje de programación", "El programa es independiente del lenguaje y el algoritmo depende del lenguaje utilizado", "Ambos conceptos son idénticos y se diferencian solo por el formato en el que se escriben", "Ninguna de las anteriores opciones es completamente correcta en este contexto"], ans: 0,
      exp: "El algoritmo es el diseño lógico (pasos) y el programa es la implementación en un lenguaje específico." },
    { q: "Durante el desarrollo de un programa, pueden aparecer errores que no impiden la compilación pero provocan resultados incorrectos. ¿Cuál es la función principal de un depurador (debugger) dentro de un entorno de desarrollo?", hint: "Refuerza este concepto.",
      opts: ["Detectar errores de sintaxis antes de ejecutar el programa", "Ejecutar el programa de forma más rápida y optimizada", "Analizar la ejecución paso a paso para localizar errores lógicos", "Ninguna de las anteriores opciones es completamente correcta en este contexto"], ans: 2,
      exp: "Un depurador permite detener la ejecución y ver el estado de las variables paso a paso." },
    { q: "Antes de escribir un programa, es fundamental diseñar correctamente el algoritmo que resolverá el problema. Para que una secuencia de pasos pueda considerarse un algoritmo válido, debe cumplir una serie de características. ¿Cuál de las siguientes es una de ellas?", hint: "Refuerza este concepto.",
      opts: ["Debe poder ejecutarse directamente por la máquina sin traducción", "Debe ser finito y finalizar tras un número limitado de pasos", "Debe estar escrito obligatoriamente en un lenguaje de programación concreto", "Ninguna de las anteriores opciones es completamente correcta en este contexto"], ans: 1,
      exp: "Un algoritmo debe ser finito, preciso y definido." },
    { q: "Todo programa informático sigue un modelo básico de funcionamiento que permite transformar datos en información útil. Dentro del modelo Entrada–Proceso–Salida, ¿qué elemento se considera el núcleo del programa?", hint: "Refuerza este concepto.",
      opts: ["Los datos que introduce el usuario mediante dispositivos de entrada", "El algoritmo que procesa los datos y aplica la lógica del programa", "El sistema que muestra el resultado final al usuario", "Ninguna de las anteriores opciones es completamente correcta en este contexto"], ans: 1,
      exp: "El algoritmo/proceso es el núcleo que transforma las entradas en salidas." },
    { q: "Las estructuras de control permiten modificar el flujo normal de ejecución de un programa. ¿Qué tipo de estructura se utiliza cuando es necesario repetir varias veces un conjunto de instrucciones mientras se cumpla una condición?", hint: "Refuerza este concepto.",
      opts: ["Estructura secuencial", "Estructura selectiva", "Estructura iterativa", "Ninguna de las anteriores opciones es completamente correcta en este contexto"], ans: 2,
      exp: "Las estructuras iterativas (bucles) repiten código mientras se cumple una condición." },
    { q: "Los paradigmas de programación ofrecen diferentes formas de organizar y estructurar el software. En el paradigma orientado a objetos, ¿cuál es el elemento central sobre el que se construyen los programas?", hint: "Refuerza este concepto.",
      opts: ["Las funciones matemáticas", "Los objetos que combinan datos y comportamiento", "Las instrucciones ejecutadas de forma secuencial", "Ninguna de las anteriores opciones es completamente correcta en este contexto"], ans: 1,
      exp: "En POO, todo gira en torno a los objetos y sus interacciones." },
    { q: "Java es un lenguaje de programación con un modelo de ejecución particular que combina características de distintos enfoques. ¿Por qué se considera que Java utiliza un sistema híbrido de compilación e interpretación?", hint: "Refuerza este concepto.",
      opts: ["Porque el código se ejecuta directamente como código máquina del sistema operativo", "Porque el código se compila a bytecode y se ejecuta mediante la Máquina Virtual de Java", "Porque no necesita ningún proceso previo para poder ejecutarse", "Ninguna de las anteriores opciones es completamente correcta en este contexto"], ans: 1,
      exp: "Java compila a bytecode y la JVM lo interpreta/ejecuta." },
    { q: "La programación no se limita únicamente a escribir código, sino que engloba varias tareas necesarias para que un programa funcione correctamente a lo largo del tiempo. ¿Cuál de las siguientes opciones define mejor qué es programar?", hint: "Refuerza este concepto.",
      opts: ["Utilizar programas informáticos ya existentes para resolver tareas cotidianas", "Diseñar, codificar, depurar y mantener programas que ejecuta un ordenador", "Ejecutar instrucciones previamente creadas sin necesidad de modificarlas", "Ninguna de las anteriores opciones es completamente correcta en este contexto"], ans: 1,
      exp: "Programar es el proceso completo de solución de problemas mediante software." },
    { q: "En informática es importante diferenciar entre los conceptos de dato e información, ya que no significan exactamente lo mismo. ¿Cuál de las siguientes afirmaciones es correcta?", hint: "Refuerza este concepto.",
      opts: ["El dato es información interpretada y la información es un dato sin procesar", "El dato es un valor aislado y la información es el resultado de procesar datos con un contexto", "Ambos términos se utilizan indistintamente y no existe diferencia real entre ellos", "Ninguna de las anteriores opciones es completamente correcta en este contexto"], ans: 1,
      exp: "El dato es un valor bruto; la información es el dato procesado con significado." },
    { q: "¿Cuál es el nombre del teorema que demuestra que cualquier algoritmo computable puede ser implementado utilizando únicamente tres estructuras de control lógicas en el paradigma estructurado?", hint: "Refuerza este concepto.",
      opts: ["[Teorema de la Estructura]", "[Teorema de Böhm]", "[Teorema de Jacopini]", "[Teorema de Turing]"], ans: 0,
      exp: "El Teorema de la Estructura, también conocido como Teorema de Böhm-Jacopini, es fundamental en el paradigma estructurado y establece que cualquier algoritmo puede ser construido utilizando solo tres estructuras de control: secuencia, selección y iteración." },
    { q: "¿Qué técnica utiliza la JVM moderna para mejorar la velocidad de ejecución de los programas Java?", hint: "Refuerza este concepto.",
      opts: ["[Compilación Just-In-Time (JIT)]", "[Interpretación]", "[Compilación previa]", "[Optimización de código]"], ans: 0,
      exp: "La Compilación Just-In-Time (JIT) es una técnica utilizada por la JVM para mejorar la velocidad de ejecución de los programas Java. Esta técnica compila el bytecode en código máquina nativo en tiempo de ejecución, lo que permite una mayor velocidad de ejecución." },
    { q: "¿Cuál es el nombre del proceso automático que elimina los objetos que ya no se están utilizando en la memoria en los lenguajes modernos como Java?", hint: "Refuerza este concepto.",
      opts: ["[Recolector de Basura (Garbage Collector)]", "[Depurador]", "[Compilador]", "[Intérprete]"], ans: 0,
      exp: "El Recolector de Basura (Garbage Collector) es un proceso automático que elimina los objetos que ya no se están utilizando en la memoria en los lenguajes modernos como Java, lo que ayuda a prevenir la fuga de memoria y a mejorar la eficiencia del programa." },
    { q: "¿Cuál es el nombre del proceso que se utiliza para traducir el código fuente de un lenguaje de alto nivel a código máquina antes de su ejecución?", hint: "Refuerza este concepto.",
      opts: ["[Compilación]", "[Interpretación]", "[Ensamblado]", "[Depuración]"], ans: 0,
      exp: "El proceso de traducir el código fuente de un lenguaje de alto nivel a código máquina antes de su ejecución se llama compilación." },
    { q: "¿Qué característica de los lenguajes de alto nivel permite que un programa escrito en ellos pueda funcionar en diferentes ordenadores sin necesidad de reescribirlo?", hint: "Refuerza este concepto.",
      opts: ["[Portabilidad]", "[Legibilidad]", "[Productividad]", "[Control total]"], ans: 0,
      exp: "La característica de los lenguajes de alto nivel que permite que un programa escrito en ellos pueda funcionar en diferentes ordenadores sin necesidad de reescribirlo se llama portabilidad." },
    { q: "¿Cuál es el nombre del software que se utiliza para leer el código fuente de un lenguaje interpretado, traducirlo a código máquina y ejecutarlo inmediatamente?", hint: "Refuerza este concepto.",
      opts: ["[Intérprete]", "[Compilador]", "[Ensamblador]", "[Depurador]"], ans: 0,
      exp: "El software que se utiliza para leer el código fuente de un lenguaje interpretado, traducirlo a código máquina y ejecutarlo inmediatamente se llama intérprete." },
    { q: "Los métodos permiten definir el comportamiento de los objetos y pueden devolver o no un valor. ¿Qué indica que un método tenga como tipo de retorno la palabra clave void?", hint: "Refuerza este concepto.",
      opts: ["Que el método devuelve un valor vacío", "Que el método no realiza ninguna acción", "Que el método realiza una acción pero no devuelve ningún valor", "Ninguna de las anteriores opciones es completamente correcta en este contexto"], ans: 2,
      exp: "void indica que el método realiza una tarea pero no devuelve ningún valor al llamador." },
    { q: "Los atributos de una clase representan el estado de los objetos creados a partir de ella. ¿Cuál de las siguientes afirmaciones sobre los atributos es correcta?", hint: "Refuerza este concepto.",
      opts: ["Los atributos se declaran dentro de los métodos", "Cada objeto tiene su propia copia de los atributos definidos en la clase", "Todos los objetos comparten los mismos valores de los atributos", "Ninguna de las anteriores opciones es completamente correcta en este contexto"], ans: 1,
      exp: "Cada instancia (objeto) mantiene su propio estado a través de sus atributos." },
    { q: "El constructor es un elemento fundamental dentro de una clase en Java y cumple una función específica. ¿Cuál es la misión principal de un constructor?", hint: "Refuerza este concepto.",
      opts: ["Ejecutar la lógica principal del programa", "Inicializar los atributos del objeto en el momento de su creación", "Definir el comportamiento común de todas las clases", "Ninguna de las anteriores opciones es completamente correcta en este contexto"], ans: 1,
      exp: "El constructor se invoca al crear el objeto para asegurar que empiece en un estado válido." },
    { q: "En programación orientada a objetos, una clase no representa directamente un objeto real, sino una definición abstracta que sirve como base para crear instancias. ¿Cuál de las siguientes afirmaciones describe correctamente el concepto de clase?", hint: "Refuerza este concepto.",
      opts: ["Es una estructura que contiene únicamente métodos sin datos asociados", "Es una plantilla que define los atributos y comportamientos de una entidad", "Es un objeto creado en memoria mediante el operador new", "Ninguna de las anteriores opciones es completamente correcta en este contexto"], ans: 1,
      exp: "La clase es el plano; el objeto es la casa construida con ese plano." },
    { q: "En Java, las variables que hacen referencia a objetos no almacenan el objeto en sí, sino una dirección de memoria. ¿Qué consecuencia tiene esto al asignar una referencia a otra?", hint: "Refuerza este concepto.",
      opts: ["Se crea automáticamente una copia independiente del objeto", "Ambas referencias apuntan al mismo objeto en memoria", "El objeto original se elimina de la memoria", "Ninguna de las anteriores opciones es completamente correcta en este contexto"], ans: 1,
      exp: "En Java, las variables de objeto son punteros/referencias a la memoria Heap." },
    { q: "Cuando una clase tiene una relación fuerte de “todo-parte” con otra y la parte no puede existir sin el todo, estamos ante un tipo concreto de relación entre clases. ¿De cuál se trata?", hint: "Refuerza este concepto.",
      opts: ["Dependencia", "Agregación", "Composición", "Ninguna de las anteriores opciones es completamente correcta en este contexto"], ans: 2,
      exp: "La composición es una relación de pertenencia fuerte donde la parte desaparece con el todo." },
    { q: "Los métodos getter y setter se utilizan para controlar el acceso a los atributos privados de una clase. ¿Cuál es una de las principales ventajas de usar setters en lugar de hacer públicos los atributos?", hint: "Refuerza este concepto.",
      opts: ["Permiten acceder directamente a la memoria del objeto", "Permiten validar los datos antes de modificar el estado del objeto", "Eliminan la necesidad de constructores", "Ninguna de las anteriores opciones es completamente correcta en este contexto"], ans: 1,
      exp: "Los setters permiten añadir lógica de validación (por ejemplo, que una edad no sea negativa)." },
    { q: "El encapsulamiento es uno de los principios clave de la programación orientada a objetos y se apoya en los modificadores de acceso. ¿Cuál es la regla de oro más habitual en Java para aplicar correctamente el encapsulamiento?", hint: "Refuerza este concepto.",
      opts: ["Atributos públicos y métodos privados", "Atributos privados y métodos públicos", "Atributos y métodos siempre protected", "Ninguna de las anteriores opciones es completamente correcta en este contexto"], ans: 1,
      exp: "Ocultar los datos (private) y exponer el servicio (public) es el núcleo del encapsulamiento." },
    { q: "El polimorfismo permite que un mismo mensaje provoque comportamientos distintos según el objeto que lo reciba. ¿Qué requisito técnico es necesario para que el polimorfismo funcione correctamente en Java?", hint: "Refuerza este concepto.",
      opts: ["El uso exclusivo de atributos protected", "La sobreescritura de métodos en las clases hijas", "La creación de múltiples constructores", "Ninguna de las anteriores opciones es completamente correcta en este contexto"], ans: 1,
      exp: "Para el polimorfismo dinámico es necesario que el hijo redefine el comportamiento del padre." },
    { q: "En Java, todo el código debe estar contenido dentro de clases, y estas siguen una estructura concreta y unas normas estrictas. ¿Cuál de las siguientes reglas es obligatoria cuando se define una clase pública?", hint: "Refuerza este concepto.",
      opts: ["El nombre de la clase debe escribirse en minúsculas", "El archivo debe llamarse igual que la clase pública y tener extensión .java", "La clase debe contener al menos un método main", "Ninguna de las anteriores opciones es completamente correcta en este contexto"], ans: 1,
      exp: "En Java, el nombre del archivo fuente debe coincidir con la clase pública que contiene." },
    { q: "¿Cuál es el modificador de acceso que se utiliza para que un atributo o método sea visible solo dentro de la misma clase en Java?", hint: "Refuerza este concepto.",
      opts: ["[private]", "[public]", "[protected]", "[default]"], ans: 0,
      exp: "El modificador de acceso private se utiliza para que un atributo o método sea visible solo dentro de la misma clase en Java." },
    { q: "¿Cuál es el propósito de un Setter en una clase Java?", hint: "Refuerza este concepto.",
      opts: ["[Validar y asignar un nuevo valor a un atributo privado]", "[Devolver el valor de un atributo privado]", "[Crear un objeto inmutable]", "[Inicializar un atributo final]"], ans: 0,
      exp: "El propósito de un Setter es validar y asignar un nuevo valor a un atributo privado, lo que permite controlar qué datos entran en el objeto." },
    { q: "¿Cuál es la característica que define a un objeto inmutable en Java?", hint: "Refuerza este concepto.",
      opts: ["[No tener atributos privados]", "[Tener un constructor que inicializa todos los atributos]", "[No tener Setters y tener atributos final]", "[Tener un Getter y un Setter para cada atributo]"], ans: 3,
      exp: "Un objeto inmutable se define por no tener Setters y tener atributos final, lo que garantiza que su estado interno no puede ser modificado una vez creado." },
    { q: "Las variables en Java tienen un ciclo de vida y un proceso de uso muy definido. ¿Cuál es el orden correcto para poder utilizar una variable sin provocar un error de compilación?", hint: "Refuerza este concepto.",
      opts: ["Inicializar &rarr; declarar &rarr; utilizar", "Declarar &rarr; inicializar &rarr; utilizar", "Utilizar &rarr; declarar &rarr; inicializar", "Ninguna de las anteriores opciones es completamente correcta en este contexto"], ans: 1,
      exp: "Primero se define el tipo y nombre, luego se le asigna un valor antes de leerlo." },
    { q: "En Java, el punto y coma es un elemento sintáctico obligatorio en la mayoría de las instrucciones. ¿Qué indica realmente el punto y coma dentro del código?", hint: "Refuerza este concepto.",
      opts: ["El final lógico de un bloque de código", "El final de una sentencia para el compilador", "El final de una línea de texto para el programador", "Ninguna de las anteriores opciones es completamente correcta en este contexto"], ans: 1,
      exp: "Sintácticamente, el ; es el terminador de sentencias en Java." },
    { q: "Cuando se realiza una conversión explícita de un tipo de dato mayor a uno menor, como de double a int, ¿qué efecto se produce?", hint: "Refuerza este concepto.",
      opts: ["El valor se redondea automáticamente", "Se produce un truncamiento y posible pérdida de información", "Java lanza siempre una excepción en tiempo de ejecución", "Ninguna de las anteriores opciones es completamente correcta en este contexto"], ans: 1,
      exp: "Un cast 'estrecho' puede perder decimales o desbordar el rango del tipo destino." },
    { q: "Las llaves { } juegan un papel fundamental en la organización del código Java y afectan directamente a la visibilidad de las variables. ¿Qué función principal cumplen las llaves dentro de un programa?", hint: "Refuerza este concepto.",
      opts: ["Indicar el final de cada instrucción", "Definir bloques de código y el ámbito de las variables", "Separar visualmente el código para mejorar su legibilidad", "Ninguna de las anteriores opciones es completamente correcta en este contexto"], ans: 1,
      exp: "Las llaves delimitan el 'scope'. Una variable declarada dentro no existe fuera." },
    { q: "Las expresiones pueden combinar varios operadores, y Java sigue una jerarquía estricta para evaluarlas. ¿Qué operador tiene mayor prioridad en una expresión compleja?", hint: "Refuerza este concepto.",
      opts: ["Los operadores aritméticos de suma y resta", "Los operadores de asignación", "Los paréntesis", "Ninguna de las anteriores opciones es completamente correcta en este contexto"], ans: 2,
      exp: "Los paréntesis rompen el orden natural de evaluación (PEMDAS/BODMAS)." },
    { q: "Al trabajar con constantes en Java se utiliza la palabra reservada final. ¿Cuál es la principal ventaja de usar constantes frente a valores literales repetidos en el código?", hint: "Refuerza este concepto.",
      opts: ["Aumentan el rendimiento del programa", "Permiten cambiar su valor en tiempo de ejecución", "Mejoran la legibilidad y facilitan el mantenimiento del código", "Ninguna de las anteriores opciones es completamente correcta en este contexto"], ans: 2,
      exp: "Si cambias el valor en un solo sitio (la constante), se actualiza en todo el programa." },
    { q: "Dentro de las estructuras de control de flujo, las sentencias break, continue y return tienen efectos distintos. ¿Qué ocurre cuando se ejecuta una sentencia return dentro de un bucle?", hint: "Refuerza este concepto.",
      opts: ["Se salta únicamente la iteración actual del bucle", "Se finaliza el bucle pero continúa el método", "Se sale inmediatamente del método completo", "Ninguna de las anteriores opciones es completamente correcta en este contexto"], ans: 2,
      exp: "return interrumpe totalmente el método actual y devuelve el control al llamador." },
    { q: "Los identificadores permiten nombrar variables, métodos, clases y paquetes, pero deben cumplir unas reglas estrictas. ¿Cuál de las siguientes opciones representa un identificador válido y bien escrito para una variable?", hint: "Refuerza este concepto.",
      opts: ["1contador", "nombre usuario", "nombreUsuario", "Ninguna de las anteriores opciones es completamente correcta en este contexto"], ans: 2,
      exp: "En Java se usa lowerCamelCase para variables (no empezar con número, no espacios)." },
    { q: "En Java, el código fuente no es un texto plano, sino que sigue una estructura jerárquica muy concreta. ¿Cuál es el orden correcto y obligatorio de los elementos que debe respetar un programa ejecutable?", hint: "Refuerza este concepto.",
      opts: ["Clase &rarr; Paquete &rarr; Método &rarr; Sentencias", "Paquete (opcional) &rarr; Clase &rarr; Método &rarr; Sentencias", "Método &rarr; Clase &rarr; Paquete &rarr; Sentencias", "Ninguna de las anteriores opciones es completamente correcta en este contexto"], ans: 1,
      exp: "Estructura estándar de un archivo Java: package -> class -> method -> statements." },
    { q: "Java distingue claramente entre tipos de datos primitivos y tipos de referencia. ¿Cuál de las siguientes afirmaciones es correcta respecto a los tipos primitivos?", hint: "Refuerza este concepto.",
      opts: ["Son objetos y disponen de métodos propios", "Almacenan directamente el valor en memoria y no son objetos", "Siempre se almacenan en el Heap", "Ninguna de las anteriores opciones es completamente correcta en este contexto"], ans: 1,
      exp: "Los primitivos (int, double...) guardan el valor literal; los de referencia guardan la dirección." },
    { q: "¿Cuál es la sintaxis correcta para declarar una constante en Java?", hint: "Refuerza este concepto.",
      opts: ["[final TipoDeDato NOMBRE_CONSTANTE = valor;]", "[public TipoDeDato NOMBRE_CONSTANTE = valor;]", "[private TipoDeDato NOMBRE_CONSTANTE = valor;]", "[TipoDeDato NOMBRE_CONSTANTE = valor;]"], ans: 0,
      exp: "La palabra reservada final se utiliza para declarar constantes en Java." },
    { q: "¿Qué ocurre cuando se divide un número entero entre otro en Java?", hint: "Refuerza este concepto.",
      opts: ["[El resultado es un número entero, truncando los decimales]", "[El resultado es un número real, con decimales]", "[El resultado es un error de compilación]", "[El resultado es un valor booleano]"], ans: 0,
      exp: "En Java, cuando se divide un número entero entre otro, el resultado es un número entero, truncando los decimales." },
    { q: "¿Cuál es el propósito del casting explícito en Java?", hint: "Refuerza este concepto.",
      opts: ["[Forzar la conversión de un valor de una caja grande a una caja más pequeña, con posible pérdida de datos]", "[Forzar la conversión de un valor de una caja pequeña a una caja más grande, sin pérdida de datos]", "[Realizar una conversión implícita de un valor]", "[Realizar una operación aritmética]"], ans: 0,
      exp: "El casting explícito se utiliza para forzar la conversión de un valor de una caja grande a una caja más pequeña, con posible pérdida de datos." },
    { q: "¿Cuál de las siguientes afirmaciones describe correctamente la relación entre una clase y un objeto en Python?", hint: "Refuerza este concepto.",
      opts: ["Una clase es un tipo de dato primitivo, y un objeto es una variable que almacena ese tipo de dato", "Una clase actúa como una plantilla o plano que define las propiedades y métodos, mientras que un objeto es una instancia específica creada a partir de esa clase", "Un objeto es una función que se define dentro de una clase, y la clase es el resultado de la ejecución de un objeto", "Ninguna de las anteriores opciones es completamente correcta en este contexto"], ans: 1,
      exp: "Una clase es el molde; el objeto es la galleta. El molde define la forma." },
    { q: "Durante la ejecución de un programa Java, ¿en qué situación un objeto pasa a ser considerado inalcanzable y candidato a la recolección de basura?", hint: "Refuerza este concepto.",
      opts: ["Cuando se declara la variable de referencia que lo apuntará", "Cuando ninguna referencia activa apunta al objeto en memoria", "Cuando el programa invoca explícitamente el recolector de basura", "Ninguna de las anteriores opciones es completamente correcta en este contexto"], ans: 1,
      exp: "El GC libera objetos que ya no pueden ser accedidos desde ningún hilo en ejecución." },
    { q: "En relación con el paso de parámetros en Java, señale la afirmación correcta:", hint: "Refuerza este concepto.",
      opts: ["Java utiliza paso por referencia para objetos y paso por valor para primitivos", "Java pasa siempre una copia del valor, aunque en los objetos dicho valor sea la referencia", "Java permite elegir entre paso por valor o por referencia", "Ninguna de las anteriores opciones es completamente correcta en este contexto"], ans: 1,
      exp: "En Java TODO se pasa por valor. Para objetos, el 'valor' es la referencia de memoria." },
    { q: "En el uso profesional de la Programación Orientada a Objetos, ¿cuál es la finalidad principal del encapsulamiento?", hint: "Refuerza este concepto.",
      opts: ["Facilitar el acceso directo a los atributos desde cualquier clase", "Proteger el estado interno del objeto y controlar su modificación", "Reducir el número de métodos definidos en una clase", "Ninguna de las anteriores opciones es completamente correcta en este contexto"], ans: 1,
      exp: "Ocultar la complejidad interna y proteger la integridad de los datos." },
    { q: "Respecto a la definición y uso de métodos en una clase, ¿qué característica permite la sobrecarga de métodos?", hint: "Refuerza este concepto.",
      opts: ["Diferenciar los métodos únicamente por su tipo de retorno", "Definir varios métodos con el mismo nombre y distinta firma de parámetros", "Utilizar modificadores de acceso diferentes en cada método", "Ninguna de las anteriores opciones es completamente correcta en este contexto"], ans: 1,
      exp: "La firma (nombre + parámetros) debe ser distinta para que el compilador sepa cuál llamar." },
    { q: "Desde el punto de vista del diseño orientado a objetos, ¿cuál es la diferencia conceptual entre herencia y composición?", hint: "Refuerza este concepto.",
      opts: ["La herencia modela una relación “tiene un” y la composición una relación “es un”", "La herencia establece una relación “es un” y la composición una relación “tiene un”", "Ambas representan exactamente el mismo tipo de relación", "Ninguna de las anteriores opciones es completamente correcta en este contexto"], ans: 1,
      exp: "La herencia es jerárquica (especialización); la composición es ensamblaje (piezas)." },
    { q: "Desde el punto de vista de la gestión de memoria, ¿qué elemento se almacena en el Stack cuando se trabaja con objetos en Java?", hint: "Refuerza este concepto.",
      opts: ["El objeto completo con todos sus atributos", "La referencia que apunta al objeto almacenado en el Heap", "Una copia independiente del objeto original", "Ninguna de las anteriores opciones es completamente correcta en este contexto"], ans: 1,
      exp: "El Stack guarda variables locales y referencias; el Heap guarda los objetos reales." },
    { q: "En proyectos Java de tamaño medio o grande, ¿qué combinación de prácticas contribuye directamente a la organización, reutilización y mantenibilidad del código?", hint: "Refuerza este concepto.",
      opts: ["Uso de paquetes, gestión de librerías y documentación mediante Javadoc", "Uso exclusivo de clases públicas sin separación en paquetes", "Eliminación de comentarios y documentación para simplificar el código", "Ninguna de las anteriores opciones es completamente correcta en este contexto"], ans: 0,
      exp: "Paquetes para estructurar, librerías para reutilizar y Javadoc para comunicar." },
    { q: "En relación con la asignación de variables en Java, ¿qué ocurre cuando dos variables de tipo objeto se igualan?", hint: "Refuerza este concepto.",
      opts: ["Se crea automáticamente una copia independiente del objeto", "Ambas variables pasan a compartir la referencia al mismo objeto", "El objeto se duplica en el Heap para evitar efectos colaterales", "Ninguna de las anteriores opciones es completamente correcta en este contexto"], ans: 1,
      exp: "No se crea un nuevo objeto; ahora hay dos punteros apuntando al mismo sitio en el Heap." },
    { q: "En el diseño de constructores, ¿qué consecuencia tiene definir al menos un constructor con parámetros en una clase?", hint: "Refuerza este concepto.",
      opts: ["Java mantiene siempre disponible el constructor vacío implícito", "El constructor vacío deja de existir si no se define explícitamente", "Se impide la sobrecarga de constructores", "Ninguna de las anteriores opciones es completamente correcta en este contexto"], ans: 1,
      exp: "Si escribes un constructor, Java asume que quieres control total y quita el de por defecto." },
    { q: "¿Cuál es el propósito del constructor por defecto en Java y qué hace exactamente?", hint: "Refuerza este concepto.",
      opts: ["[No hace nada, es un constructor vacío]", "Es un constructor que se ejecuta automáticamente cuando se crea un objeto", "Es un constructor que se utiliza para inicializar las variables de instancia", "Es un constructor que se utiliza para crear un objeto con parámetros"], ans: 0,
      exp: "El constructor por defecto en Java es un constructor vacío que se crea automáticamente si no se define ningún constructor en la clase, su propósito es permitir la creación de objetos sin parámetros." },
    { q: "¿Cuál es la diferencia entre una variable de instancia (atributo) y una variable local en términos de visibilidad y alcance en Java?", hint: "Refuerza este concepto.",
      opts: ["[Una variable de instancia es visible en toda la clase, mientras que una variable local es visible solo dentro del método o bloque donde se declara]", "Una variable de instancia es visible solo dentro del método o bloque donde se declara, mientras que una variable local es visible en toda la clase", "Una variable de instancia es visible en toda la clase, mientras que una variable local es visible solo dentro del método o bloque donde se declara", "Una variable de instancia y una variable local tienen el mismo alcance y visibilidad"], ans: 0,
      exp: "La diferencia entre una variable de instancia y una variable local en Java es que una variable de instancia es visible en toda la clase, mientras que una variable local es visible solo dentro del método o bloque donde se declara." },
    { q: "¿Cuál es el propósito de la palabra clave \"this\" en Java y cómo se utiliza para diferenciar entre un atributo de objeto y un parámetro de método?", hint: "Refuerza este concepto.",
      opts: ["[Se utiliza para referirse al atributo de objeto y evitar la ocultación de variable]", "Se utiliza para referirse al parámetro de método y evitar la ocultación de variable", "Se utiliza para crear un nuevo objeto y evitar la ocultación de variable", "Se utiliza para eliminar un objeto y evitar la ocultación de variable"], ans: 0,
      exp: "La palabra clave \"this\" en Java se utiliza para referirse al atributo de objeto y evitar la ocultación de variable, que ocurre cuando un atributo de objeto y un parámetro de método tienen el mismo nombre." },
    { q: "En relación con los arrays multidimensionales en Java, ¿cuál de las siguientes afirmaciones es correcta?", hint: "Refuerza este concepto.",
      opts: ["Representan una estructura continua de memoria bidimensional real", "Son arrays cuyos elementos son, a su vez, otros arrays", "Tienen un único valor de longitud para filas y columnas", "Ninguna de las anteriores opciones es completamente correcta en este contexto"], ans: 1,
      exp: "Un array multidimensional en Java es un array de objetos array, no una matriz contigua." },
    { q: "En relación con los índices de un array, señale la afirmación correcta:", hint: "Refuerza este concepto.",
      opts: ["El primer elemento se encuentra en la posición 1", "El último elemento se encuentra en la posición igual a la longitud del array", "Los índices válidos van desde 0 hasta longitud menos uno", "Ninguna de las anteriores opciones es completamente correcta en este contexto"], ans: 2,
      exp: "0 es la base. Por tanto, el último es N-1." },
    { q: "Desde el punto de vista de la memoria en Java, ¿cuál es la característica fundamental de un array?", hint: "Refuerza este concepto.",
      opts: ["Es una estructura primitiva que se almacena íntegramente en el Stack", "Es un objeto que se almacena en el Heap y se accede mediante una referencia", "Es una colección dinámica cuyo tamaño puede variar durante la ejecución", "Ninguna de las anteriores opciones es completamente correcta en este contexto"], ans: 1,
      exp: "Los arrays son objetos. La variable solo guarda la referencia al bloque de memoria." },
    { q: "En el procesamiento de arrays, ¿qué característica distingue al recorrido con for-each frente al for clásico?", hint: "Refuerza este concepto.",
      opts: ["Permite modificar directamente los elementos del array", "Proporciona acceso al índice y al valor simultáneamente", "Está orientado a la lectura secuencial sin acceso a la posición", "Ninguna de las anteriores opciones es completamente correcta en este contexto"], ans: 2,
      exp: "for-each es un azúcar sintáctico para iterar sobre valores de forma limpia." },
    { q: "¿Cuál es la finalidad principal de la propiedad length en los arrays?", hint: "Refuerza este concepto.",
      opts: ["Modificar el tamaño del array durante la ejecución", "Conocer el número de elementos para acceder y recorrer el array de forma segura", "Contar únicamente los elementos que han sido inicializados explícitamente", "Ninguna de las anteriores opciones es completamente correcta en este contexto"], ans: 1,
      exp: "length es un atributo final que nos dice cuántas casillas fueron reservadas." },
    { q: "Desde un enfoque profesional, ¿cuál es la ventaja principal de utilizar los métodos de ordenación proporcionados por Java frente a los algoritmos académicos?", hint: "Refuerza este concepto.",
      opts: ["Son más sencillos conceptualmente que los algoritmos clásicos", "Están optimizados y reducen errores en la implementación", "Permiten mantener el orden original del array automáticamente", "Ninguna de las anteriores opciones es completamente correcta en este contexto"], ans: 1,
      exp: "Usa implementaciones estándar (como Arrays.sort) que son muy eficientes y seguras." },
    { q: "Respecto a los algoritmos de búsqueda, ¿cuál es la condición indispensable para poder aplicar una búsqueda binaria?", hint: "Refuerza este concepto.",
      opts: ["Que el array tenga un tamaño reducido", "Que el array esté previamente ordenado", "Que el array contenga únicamente valores numéricos", "Ninguna de las anteriores opciones es completamente correcta en este contexto"], ans: 1,
      exp: "Divide el problema a la mitad en cada paso, pero requiere que los datos estén en orden." },
    { q: "¿Qué afirmación describe correctamente el tamaño de un array en Java?", hint: "Refuerza este concepto.",
      opts: ["El tamaño puede modificarse añadiendo o eliminando elementos", "El tamaño se fija en el momento de su creación y no puede cambiar", "El tamaño depende del número de elementos inicializados manualmente", "Ninguna de las anteriores opciones es completamente correcta en este contexto"], ans: 1,
      exp: "En Java los arrays son estáticos en tamaño; para dinámicos se usa ArrayList." },
    { q: "Al trabajar con cadenas de caracteres en Java, ¿qué significa que la clase String sea inmutable?", hint: "Refuerza este concepto.",
      opts: ["Que no se pueden comparar dos cadenas entre sí", "Que una vez creado un texto, no puede modificarse su contenido", "Que solo puede crearse mediante el operador new", "Ninguna de las anteriores opciones es completamente correcta en este contexto"], ans: 1,
      exp: "Una vez creado un String, cualquier operación crea un nuevo objeto String en el pool." },
    { q: "¿Cuál es la forma correcta de comparar el contenido de dos cadenas de caracteres en Java?", hint: "Refuerza este concepto.",
      opts: ["Utilizando el operador de igualdad para comprobar las referencias", "Comparando directamente su longitud", "Utilizando un método que evalúa el contenido textual", "Ninguna de las anteriores opciones es completamente correcta en este contexto"], ans: 2,
      exp: "Usa .equals() para comparar el texto. == solo compara si son el mismo objeto en memoria." },
    { q: "¿Cuál es el requisito absoluto para utilizar la búsqueda binaria en un array?", hint: "Refuerza este concepto.",
      opts: ["El array debe estar vacío", "El array debe estar ordenado", "El array debe tener un tamaño fijo", "El array debe ser de tipo String"], ans: 1,
      exp: "La búsqueda binaria requiere que el array esté ordenado previamente para funcionar correctamente." },
    { q: "¿Cuál es la eficiencia de la búsqueda lineal en un array de 1 millón de datos?", hint: "Refuerza este concepto.",
      opts: ["Alta", "Media", "Baja", "Instantánea"], ans: 2,
      exp: "La búsqueda lineal tiene una eficiencia baja, ya que puede requerir hasta 1 millón de comparaciones para encontrar el dato buscado." },
    { q: "¿Cuál es el algoritmo utilizado en la búsqueda binaria?", hint: "Refuerza este concepto.",
      opts: ["Divide y Vencerás", "Recursividad", "Iteración", "Selección"], ans: 0,
      exp: "La búsqueda binaria utiliza el algoritmo \"Divide y Vencerás\", que consiste en dividir el array en mitades y buscar el dato en una de ellas." },
    { q: "¿Cuál es el resultado de la búsqueda lineal si el dato buscado no se encuentra en el array?", hint: "Refuerza este concepto.",
      opts: ["Se devuelve el índice del dato siguiente", "Se devuelve el índice del dato anterior", "Se devuelve -1", "Se lanza una excepción"], ans: 2,
      exp: "La búsqueda lineal devuelve -1 si el dato buscado no se encuentra en el array." },
    { q: "¿Cuál es la ventaja de utilizar la búsqueda binaria en lugar de la búsqueda lineal?", hint: "Refuerza este concepto.",
      opts: ["Es más fácil de programar", "Es más lenta", "Es más eficiente", "Es más segura"], ans: 2,
      exp: "La búsqueda binaria es más eficiente que la búsqueda lineal, ya que requiere menos comparaciones para encontrar el dato buscado." },
    { q: "¿Cuál es el tipo de datos que se puede buscar utilizando la búsqueda binaria?", hint: "Refuerza este concepto.",
      opts: ["Solo números enteros", "Solo cadenas de texto", "Cualquier tipo de dato comparable", "Solo arrays de objetos"], ans: 2,
      exp: "La búsqueda binaria se puede utilizar para buscar cualquier tipo de dato que se pueda comparar." },
    { q: "¿Cuál es el método utilizado en la búsqueda lineal para encontrar el dato buscado?", hint: "Refuerza este concepto.",
      opts: ["Se empieza en la última posición y se busca hacia atrás", "Se empieza en la primera posición y se busca hacia adelante", "Se busca en la mitad del array", "Se busca en la posición aleatoria"], ans: 1,
      exp: "La búsqueda lineal se empieza en la primera posición del array y se busca hacia adelante hasta encontrar el dato buscado." },
    { q: "¿Cuál es la característica de la búsqueda binaria que la hace más rápida que la búsqueda lineal?", hint: "Refuerza este concepto.",
      opts: ["Su complejidad es lineal", "Su complejidad es logarítmica", "Su complejidad es cuadrática", "Su complejidad es exponencial"], ans: 1,
      exp: "La búsqueda binaria tiene una complejidad logarítmica, lo que la hace más rápida que la búsqueda lineal para grandes conjuntos de datos." },
    { q: "¿Cuál es la diferencia fundamental de diseño entre una Clase Abstracta y una Interfaz?", hint: "Refuerza este concepto.",
      opts: ["La Clase Abstracta define qué \"ES\" el objeto (identidad), mientras que la Interfaz define qué \"PUEDE HACER\" (capacidad)", "Las Interfaces permiten guardar variables de estado mutables y las Clases Abstractas no", "Las Clases Abstractas permiten herencia múltiple y las Interfaces solo herencia simple", "Ninguna de las anteriores opciones es completamente correcta en este contexto"], ans: 0,
      exp: "La interfaz garantiza que el objeto cumple un contrato de comportamiento." },
    { q: "¿Qué característica define al modificador de acceso protected?", hint: "Refuerza este concepto.",
      opts: ["Hace que el miembro sea visible solo para la clase actual y nadie más", "Permite el acceso a cualquier clase del mismo paquete y a cualquier subclase, incluso en paquetes distintos", "Es exactamente igual al acceso public, pero solo funciona con métodos static", "Ninguna de las anteriores opciones es completamente correcta en este contexto"], ans: 1,
      exp: "protected une la visibilidad de paquete con la de herencia." },
    { q: "En Java, ¿cuál es la jerarquía máxima de la que heredan implícitamente todas las clases, incluidos los arrays y Strings?", hint: "Refuerza este concepto.",
      opts: ["La clase java.lang.Object", "La clase Super", "No existe una jerarquía común; cada clase es independiente a menos que use extends", "Ninguna de las anteriores opciones es completamente correcta en este contexto"], ans: 0,
      exp: "Object es la raíz definitiva de todo el árbol de clases en Java." },
    { q: "¿Por qué Java prohíbe la herencia múltiple de clases (heredar de dos padres a la vez)?", hint: "Refuerza este concepto.",
      opts: ["Para evitar el \"Problema del Diamante\" y la ambigüedad en la ejecución de métodos", "Porque consumiría demasiada memoria en el Heap al duplicar los constructores", "Porque todas las clases deben ser obligatoriamente final para ser seguras", "Ninguna de las anteriores opciones es completamente correcta en este contexto"], ans: 0,
      exp: "Se evita la complejidad de heredar múltiples estados contradictorios (herencia de implementación)." },
    { q: "¿Cuál es la función principal de la anotación @Override en la sobreescritura de métodos?", hint: "Refuerza este concepto.",
      opts: ["Obligar al método a ser final para que no pueda volver a cambiarse", "Actuar como un control de calidad que avisa al compilador si el método no existe en el padre", "Permitir que el método cambie su lista de parámetros (Sobrecarga)", "Ninguna de las anteriores opciones es completamente correcta en este contexto"], ans: 1,
      exp: "Evita errores de dedo al escribir el nombre del método en la subclase." },
    { q: "Sobre las clases abstractas, ¿cuál es la \"Regla de Hierro\" mencionada en el temario?", hint: "Refuerza este concepto.",
      opts: ["Deben tener obligatoriamente todos sus métodos vacíos", "No se pueden crear objetos (instancias) de una clase abstracta", "Solo pueden heredar de interfaces y nunca de otras clases", "Ninguna de las anteriores opciones es completamente correcta en este contexto"], ans: 1,
      exp: "Son conceptos puros; no puedes tener un 'Animal' genérico, solo perros o gatos concretos." },
    { q: "Si deseamos garantizar que un algoritmo crítico no sea alterado por ninguna subclase, ¿qué debemos hacer?", hint: "Refuerza este concepto.",
      opts: ["Declarar el método como abstract", "Declarar el método como final", "Declarar el método como static y private simultáneamente", "Ninguna de las anteriores opciones es completamente correcta en este contexto"], ans: 1,
      exp: "final impide que alguien 'pise' la lógica de ese método en una clase hija." },
    { q: "Al decidir entre Herencia y Composición, ¿qué principio de diseño de software recomienda el temario?", hint: "Refuerza este concepto.",
      opts: ["Priorizar siempre la Herencia para maximizar la reutilización de código de \"Caja Blanca\"", "Favorecer la Composición sobre la Herencia para obtener un acoplamiento más bajo y flexible", "Usar la Herencia para relaciones \"Tiene-Un\" y la Composición para relaciones \"Es-Un\"", "Ninguna de las anteriores opciones es completamente correcta en este contexto"], ans: 1,
      exp: "La composición suele ser preferible porque es más flexible y menos rígida que la herencia." },
    { q: "Si un método es declarado como static, ¿cuál de las siguientes afirmaciones es CORRECTA?", hint: "Refuerza este concepto.",
      opts: ["Pertenece a la clase y no puede acceder a variables de instancia ni usar this", "Requiere crear un objeto con new antes de poder ser invocado", "Cada objeto creado tiene su propia copia privada de dicho método en memoria", "Ninguna de las anteriores opciones es completamente correcta en este contexto"], ans: 0,
      exp: "Lo estático es de la 'clase', no de las 'instancias'. No conoce a 'this'." },
    { q: "Respecto a los constructores y la herencia, ¿cuál es el orden estricto de inicialización?", hint: "Refuerza este concepto.",
      opts: ["Primero se inicializa la subclase (hija) y finalmente la superclase (padre)", "Se inicializan simultáneamente para optimizar la carga de la JVM", "Los padres siempre se inicializan antes que los hijos, empezando desde la clase Object", "Ninguna de las anteriores opciones es completamente correcta en este contexto"], ans: 2,
      exp: "Antes de construir el hijo, Java debe asegurar que la parte padre esté lista." },
    { q: "¿Para qué se utiliza la palabra clave throws (en plural) en la firma de un método?", hint: "Refuerza este concepto.",
      opts: ["Para lanzar una instancia específica de una excepción en una línea concreta de código", "Para indicar que el método delega la responsabilidad de gestionar ciertas excepciones a quien lo invoque", "Para obligar al bloque finally a cerrar todos los recursos abiertos de forma manual", "Ninguna de las anteriores opciones es completamente correcta en este contexto"], ans: 1,
      exp: "Propaga la excepción para que el método superior decida cómo gestionarla." },
    { q: "Al recorrer una colección, ¿en qué caso es indispensable utilizar un Iterator en lugar de un bucle for-each?", hint: "Refuerza este concepto.",
      opts: ["Cuando solo necesitamos leer los datos sin modificarlos", "Cuando queremos filtrar la colección mediante un objeto Stream", "Cuando necesitamos eliminar elementos de la colección de forma segura mientras la recorremos", "Ninguna de las anteriores opciones es completamente correcta en este contexto"], ans: 2,
      exp: "Iterator permite usar .remove() de forma segura durante la iteración." },
    { q: "¿Cuál es el propósito de utilizar Genéricos (<T>) al declarar una colección como ArrayList<String>?", hint: "Refuerza este concepto.",
      opts: ["Permitir que la lista guarde cualquier tipo de objeto (mezclar enteros, cadenas, etc.)", "Aportar seguridad de tipos en tiempo de compilación y evitar la necesidad de realizar castings manuales", "Hacer que la colección sea inmutable y no se puedan añadir más elementos tras su creación", "Ninguna de las anteriores opciones es completamente correcta en este contexto"], ans: 1,
      exp: "Evitas el ClassCastException en tiempo de ejecución al restringir los tipos en compilación." },
    { q: "Dentro del Java Collections Framework, ¿qué interfaz debe usarse si se requiere una colección que no permita elementos duplicados?", hint: "Refuerza este concepto.",
      opts: ["List", "Set", "Queue", "Ninguna de las anteriores opciones es completamente correcta en este contexto"], ans: 1,
      exp: "Set es un conjunto matemático: no hay repetidos y no suele haber orden." },
    { q: "¿Cuál es la diferencia principal entre un ArrayList y un HashSet?", hint: "Refuerza este concepto.",
      opts: ["El ArrayList mantiene el orden de inserción, mientras que el HashSet no garantiza ningún orden", "El ArrayList no permite duplicados y el HashSet sí", "El HashSet es más lento para acceder a elementos que el ArrayList porque usa índices", "Ninguna de las anteriores opciones es completamente correcta en este contexto"], ans: 0,
      exp: "ArrayList es una lista (secuencial); HashSet es una bolsa (dispersión por hash)." },
    { q: "Sobre la interfaz Map, ¿cuál de las siguientes afirmaciones es correcta según el temario?", hint: "Refuerza este concepto.",
      opts: ["Hereda directamente de la interfaz Collection", "Almacena elementos en parejas de Clave-Valor y no pertenece a la jerarquía de Collection", "Es una lista ordenada que permite acceder a los elementos mediante un índice numérico", "Ninguna de las anteriores opciones es completamente correcta en este contexto"], ans: 1,
      exp: "Map usa diccionarios (k/v). No es una Collection propiamente dicha." },
    { q: "¿Cuál es la principal ventaja del \"try-with-resources\" introducido en versiones modernas de Java?", hint: "Refuerza este concepto.",
      opts: ["Permite capturar múltiples excepciones en una sola línea de código", "Gestiona automáticamente el cierre de recursos (como archivos o conexiones) al finalizar el bloque", "Aumenta la velocidad de ejecución de las colecciones tipo List y Map", "Ninguna de las anteriores opciones es completamente correcta en este contexto"], ans: 1,
      exp: "Garantiza que el archivo se cierre aunque ocurra una excepción (AutoCloseable)." },
    { q: "Según la jerarquía de excepciones en Java, ¿cuál es la diferencia entre un Error y una Exception?", hint: "Refuerza este concepto.",
      opts: ["Las Exception son fallos graves del sistema (como falta de memoria), mientras que los Error son fallos del programa", "Los Error son situaciones irrecuperables de la JVM, mientras que las Exception son condiciones que una aplicación debería capturar", "No hay diferencia; ambos términos se usan indistintamente para cualquier fallo en tiempo de ejecución", "Ninguna de las anteriores opciones es completamente correcta en este contexto"], ans: 1,
      exp: "Error = fallo de la máquina (OutOfMemory); Exception = fallo lógico (FileNotFound)." },
    { q: "¿Qué caracteriza a las excepciones de tipo RuntimeException (Unchecked)?", hint: "Refuerza este concepto.",
      opts: ["El compilador no obliga a capturarlas ni a declararlas en la firma del método", "Son excepciones que deben ser revisadas obligatoriamente por el programador antes de compilar", "Son las únicas excepciones que pueden lanzarse mediante la palabra clave throw", "Ninguna de las anteriores opciones es completamente correcta en este contexto"], ans: 0,
      exp: "Son excepciones 'no comprobadas' que suelen indicar fallos de programación (null pointer)." },
    { q: "En una estructura try-catch-finally, ¿cuándo se ejecuta el bloque finally?", hint: "Refuerza este concepto.",
      opts: ["Solo si se produce una excepción y esta es capturada correctamente", "Solo si no se produce ninguna excepción durante la ejecución del try", "Siempre, independientemente de si se lanzó una excepción o si fue capturada", "Ninguna de las anteriores opciones es completamente correcta en este contexto"], ans: 2,
      exp: "finally es el bloque de limpieza garantizada (cierre de BD, logs, etc.)." },
    { q: "Si un atributo de una clase se marca con la palabra clave transient, ¿qué ocurre durante la serialización?", hint: "Refuerza este concepto.",
      opts: ["Ese atributo se guarda con prioridad absoluta antes que los demás", "Ese atributo se ignora y no se guarda en el fichero (útil para datos sensibles como contraseñas)", "El atributo se convierte automáticamente a formato hexadecimal para ahorrar espacio", "Ninguna de las anteriores opciones es completamente correcta en este contexto"], ans: 1,
      exp: "transient le dice a la JVM: 'este dato no es persistente' (ej: una contraseña)." },
    { q: "¿Cuál es la diferencia principal entre un flujo de Bytes y un flujo de Caracteres?", hint: "Refuerza este concepto.",
      opts: ["Los de Bytes procesan datos de 8 bits (imágenes, audio), mientras que los de Caracteres procesan datos de 16 bits usando Unicode (texto)", "Los flujos de Bytes son solo para lectura y los de Caracteres solo para escritura", "No hay diferencia técnica; Java decide cuál usar automáticamente según el tamaño del archivo", "Ninguna de las anteriores opciones es completamente correcta en este contexto"], ans: 0,
      exp: "Bytes (0-255) para archivos binarios; Characters para texto idiomático (Unicode)." },
    { q: "Al trabajar con archivos de texto, ¿qué sucede si se abre un FileWriter con el parámetro append en true?", hint: "Refuerza este concepto.",
      opts: ["El archivo se borra completamente antes de empezar a escribir", "El nuevo contenido se añade al final del archivo sin borrar lo que ya existía", "El archivo se bloquea para que otros programas no puedan leerlo mientras se escribe", "Ninguna de las anteriores opciones es completamente correcta en este contexto"], ans: 1,
      exp: "append=true no pisa el archivo, añade al final del contenido actual." },
    { q: "¿Qué método de la clase Scanner es el más adecuado para leer una frase completa que contenga espacios?", hint: "Refuerza este concepto.",
      opts: ["next()", "nextInt()", "nextLine()", "Ninguna de las anteriores opciones es completamente correcta en este contexto"], ans: 2,
      exp: "nextLine() lee hasta encontrar el salto de línea, incluyendo los espacios intermedios." },
    { q: "¿Qué clase de la jerarquía de caracteres se utiliza específicamente para leer texto de un archivo de forma eficiente?", hint: "Refuerza este concepto.",
      opts: ["FileInputStream", "FileWriter", "FileReader", "Ninguna de las anteriores opciones es completamente correcta en este contexto"], ans: 2,
      exp: "FileReader es el Stream de caracteres orientado específicamente a archivos de disco." },
    { q: "¿Qué es la \"Serialización\" de objetos en Java?", hint: "Refuerza este concepto.",
      opts: ["El proceso de convertir un objeto en una secuencia de bytes para poder almacenarlo en un fichero o enviarlo por red", "Un método para ordenar alfabéticamente los atributos de una clase", "El proceso de borrar un objeto del Heap para liberar memoria", "Ninguna de las anteriores opciones es completamente correcta en este contexto"], ans: 0,
      exp: "Permite convertir el estado de un objeto en un chorro de bytes persistente." },
    { q: "Respecto a la Salida Estándar de Errores (System.err), ¿qué afirmación es correcta?", hint: "Refuerza este concepto.",
      opts: ["Envía los datos directamente a la impresora del sistema", "Se utiliza para mensajes de diagnóstico y errores, y por defecto suele mostrarse en color rojo en la consola", "Es exactamente lo mismo que System.out y no se recomienda su uso en entornos profesionales", "Ninguna de las anteriores opciones es completamente correcta en este contexto"], ans: 1,
      exp: "Es un canal separado para que los errores no se mezclen con la salida normal de datos." },
    { q: "¿Cuál es la función del \"Buffer\" en las operaciones de entrada/salida?", hint: "Refuerza este concepto.",
      opts: ["Actuar como una memoria intermedia para reducir el número de accesos físicos al disco o red, mejorando el rendimiento", "Cifrar los datos para que no puedan ser leídos por otros programas del sistema operativo", "Convertir automáticamente archivos binarios en archivos de texto plano", "Ninguna de las anteriores opciones es completamente correcta en este contexto"], ans: 0,
      exp: "Acceder al disco por cada byte es muy lento; el buffer agrupa las lecturas/escrituras." },
    { q: "En el contexto de Java, ¿qué es un \"Stream\" o flujo de datos?", hint: "Refuerza este concepto.",
      opts: ["Es una estructura de datos estática que almacena información en la memoria RAM", "Es un canal unidireccional que transporta información de forma secuencial desde un origen a un destino", "Es una base de datos interna que Java utiliza para guardar objetos de forma permanente", "Ninguna de las anteriores opciones es completamente correcta en este contexto"], ans: 1,
      exp: "Representa el flujo continuo de datos de un punto A a un punto B." },
    { q: "Para que una clase pueda ser serializada, ¿qué requisito debe cumplir obligatoriamente?", hint: "Refuerza este concepto.",
      opts: ["Debe heredar de la clase File", "Debe implementar la interfaz Serializable, que actúa como una \"interfaz de marcado\"", "Todos sus métodos deben ser declarados como static", "Ninguna de las anteriores opciones es completamente correcta en este contexto"], ans: 1,
      exp: "Serializable es una interfaz de marcado (interfaz vacía) que da permiso a la JVM." },
    { q: "¿Cuál es la función del \"Driver\" (Controlador) en una conexión JDBC?", hint: "Refuerza este concepto.",
      opts: ["Traducir las llamadas de la API JDBC al protocolo específico del gestor de base de datos (MySQL, Oracle, etc.)", "Diseñar las tablas de la base de datos automáticamente desde el código Java", "Comprobar que el código SQL no tenga errores de sintaxis antes de enviarlo", "Ninguna de las anteriores opciones es completamente correcta en este contexto"], ans: 0,
      exp: "El driver es el intérprete entre Java (estándar) y la base de datos (propietaria)." },
    { q: "En caso de que una de las operaciones de una transacción falle, ¿qué método se debe invocar para devolver la base de datos a su estado original?", hint: "Refuerza este concepto.",
      opts: ["conn.rollback()", "conn.reset()", "conn.undo()", "Ninguna de las anteriores opciones es completamente correcta en este contexto"], ans: 0,
      exp: "rollback deshace todos los cambios realizados desde el último commit." },
    { q: "¿Qué representan las siglas ACID en el contexto de las transacciones de bases de datos?", hint: "Refuerza este concepto.",
      opts: ["Un conjunto de propiedades (Atomicidad, Consistencia, Aislamiento y Durabilidad) que garantizan la integridad de las operaciones", "Un protocolo de cifrado para que las contraseñas de la base de datos viajen seguras", "El nombre del driver estándar utilizado para conectar Java con bases de datos SQLite", "Ninguna de las anteriores opciones es completamente correcta en este contexto"], ans: 0,
      exp: "Son las 4 reglas de oro de las bases de datos transaccionales." },
    { q: "Para gestionar una transacción de forma manual en Java, ¿cuál es el primer paso imprescindible?", hint: "Refuerza este concepto.",
      opts: ["Llamar al método conn.commit()", "Establecer conn.setAutoCommit(false)", "Cerrar la conexión con el bloque finally", "Ninguna de las anteriores opciones es completamente correcta en este contexto"], ans: 1,
      exp: "Debemos quitar el modo automático para poder decidir cuándo hacer commit." },
    { q: "¿Qué componente de la URL de conexión jdbc:mysql://localhost:3306/empresa indica el puerto donde escucha el servidor?", hint: "Refuerza este concepto.",
      opts: ["jdbc:mysql", "localhost", "3306", "Ninguna de las anteriores opciones es completamente correcta en este contexto"], ans: 2,
      exp: "localhost es el host, 3306 es el puerto y empresa es la base de datos." },
    { q: "¿Por qué se recomienda el uso de PreparedStatement en lugar de Statement para ejecutar consultas con parámetros?", hint: "Refuerza este concepto.",
      opts: ["Porque Statement no permite ejecutar consultas de tipo SELECT", "Porque PreparedStatement aumenta la seguridad contra ataques de Inyección SQL y mejora el rendimiento mediante la precompilación", "Porque Statement solo puede usarse con bases de datos locales y no en red", "Ninguna de las anteriores opciones es completamente correcta en este contexto"], ans: 1,
      exp: "PreparedStatement evita que el usuario pegue código malicioso en los campos de texto." },
    { q: "¿Cómo funciona el objeto ResultSet al recuperar datos de una consulta?", hint: "Refuerza este concepto.",
      opts: ["Carga todos los datos de la base de datos en una lista estática de forma inmediata", "Actúa como un cursor que inicialmente apunta \"antes de la primera fila\" y requiere el método next() para avanzar", "Es una interfaz que solo permite leer datos de tipo texto (String)", "Ninguna de las anteriores opciones es completamente correcta en este contexto"], ans: 1,
      exp: "next() mueve el cursor a la primera fila, luego a la segunda, etc." },
    { q: "¿Cuál es la forma más profesional y segura de gestionar el cierre de Connection, Statement y ResultSet para evitar fugas de memoria?", hint: "Refuerza este concepto.",
      opts: ["Cerrarlos manualmente uno a uno en el cuerpo principal del código", "Confiar en que el Garbage Collector los cerrará cuando el programa termine", "Utilizar la estructura try-with-resources para que Java los cierre automáticamente al finalizar el bloque", "Ninguna de las anteriores opciones es completamente correcta en este contexto"], ans: 2,
      exp: "try-with-resources es el estándar moderno para asegurar el cierre de conexiones." },
    { q: "Al ejecutar una sentencia DML (INSERT, UPDATE o DELETE), ¿qué método de PreparedStatement debe utilizarse?", hint: "Refuerza este concepto.",
      opts: ["executeQuery()", "executeUpdate()", "executeSelect()", "Ninguna de las anteriores opciones es completamente correcta en este contexto"], ans: 1,
      exp: "executeUpdate se usa para todo lo que sea MODIFICAR datos (Insert/Update/Delete)." },
    { q: "¿Qué es JDBC dentro del ecosistema de Java?", hint: "Refuerza este concepto.",
      opts: ["Una base de datos ligera que se integra directamente en el JDK", "Una API que proporciona un conjunto de interfaces estándar para interactuar con bases de datos independientemente del motor usado", "Un lenguaje de consulta que sustituye al SQL tradicional para mejorar el rendimiento", "Ninguna de las anteriores opciones es completamente correcta en este contexto"], ans: 1,
      exp: "Java Database Connectivity es la interfaz estándar de Java para SQL." },
    { q: "¿Qué es el OID (Object Identifier) en una base de datos orientada a objetos?", hint: "Refuerza este concepto.",
      opts: ["Una clave primaria numérica que el programador debe gestionar manualmente", "Un identificador único generado por el sistema que es independiente del valor de los atributos del objeto", "El nombre de la variable que utilizamos en el código Java para referenciar al objeto", "Ninguna de las anteriores opciones es completamente correcta en este contexto"], ans: 1,
      exp: "El OID permite identificar al objeto aunque cambien todos sus valores internos." },
    { q: "Al trabajar con un motor como db4o u ObjectDB, ¿cuál es el objeto principal que actúa como \"Contenedor de Objetos\" y gestiona la sesión?", hint: "Refuerza este concepto.",
      opts: ["ObjectContainer", "DatabaseManager", "SessionSocket", "Ninguna de las anteriores opciones es completamente correcta en este contexto"], ans: 0,
      exp: "Es la puerta de entrada para persistir y recuperar objetos de la base de datos." },
    { q: "¿Qué sucede si se activa la propiedad de \"Cascada\" (Cascade On Update/Delete)?", hint: "Refuerza este concepto.",
      opts: ["Las operaciones realizadas sobre un objeto padre se propagan automáticamente a sus objetos hijos relacionados", "El sistema operativo borra la base de datos si ocurre un error crítico", "El objeto se guarda simultáneamente en dos bases de datos distintas para mayor seguridad", "Ninguna de las anteriores opciones es completamente correcta en este contexto"], ans: 0,
      exp: "Simula la integridad referencial en cascada del modelo relacional." },
    { q: "¿Qué problema fundamental vienen a solucionar las BDOO en comparación con las bases de datos relacionales?", hint: "Refuerza este concepto.",
      opts: ["La lentitud de los discos duros actuales", "La \"Desadaptación de Impedancia\", evitando tener que traducir objetos a tablas y filas", "La imposibilidad de usar SQL en entornos de red", "Ninguna de las anteriores opciones es completamente correcta en este contexto"], ans: 1,
      exp: "Las BDOO resuelven el problema de tener que 'trocear' objetos en tablas." },
    { q: "¿Cómo funciona el mecanismo de consulta QBE (Query By Example)?", hint: "Refuerza este concepto.",
      opts: ["Se escribe una sentencia de texto similar a SQL", "Se crea un objeto \"prototipo\" o plantilla y el sistema busca objetos que coincidan con sus atributos no nulos", "Se programa un filtro mediante una función lambda de Java", "Ninguna de las anteriores opciones es completamente correcta en este contexto"], ans: 1,
      exp: "Es como buscar a alguien dándole una foto (el ejemplo) en lugar de una descripción." },
    { q: "¿Qué ventaja principal ofrecen las \"Native Queries\" (Consultas Nativas) frente a otros métodos?", hint: "Refuerza este concepto.",
      opts: ["Son mucho más rápidas que las consultas por OID", "Permiten usar código Java puro para filtrar, proporcionando total seguridad de tipos (Type-Safe)", "No requieren que la base de datos esté abierta para ejecutarse", "Ninguna de las anteriores opciones es completamente correcta en este contexto"], ans: 1,
      exp: "Al usar Java puro para filtrar, el compilador detecta errores de tipos de datos." },
    { q: "En las consultas OQL, ¿cómo se navega a través de las relaciones entre objetos?", hint: "Refuerza este concepto.",
      opts: ["Mediante el uso de sentencias JOIN complejas como en el modelo relacional", "Utilizando la \"notación de punto\" (ej. p.ciudad.nombre) para seguir los grafos de objetos", "No se puede navegar entre relaciones; solo se pueden consultar objetos aislados", "Ninguna de las anteriores opciones es completamente correcta en este contexto"], ans: 1,
      exp: "Es mucho más natural navegar por atributos (punto) que hacer JOINs manuales." },
    { q: "¿Qué controla el parámetro \"Activation Depth\" (Profundidad de Activación)?", hint: "Refuerza este concepto.",
      opts: ["El número máximo de usuarios que pueden conectarse a la vez", "El nivel de profundidad del grafo de objetos que se carga en la memoria RAM al recuperar un objeto", "La cantidad de copias de seguridad que el sistema realiza cada hora", "Ninguna de las anteriores opciones es completamente correcta en este contexto"], ans: 1,
      exp: "Evita cargar toda la base de datos en RAM al abrir un solo objeto pequeño." },
{ q: "En el estándar ODMG, ¿qué lenguaje se utiliza específicamente para definir la estructura de la base de datos?", hint: "Refuerza este concepto.",
      opts: ["OQL (Object Query Language)", "ODL (Object Definition Language)", "SQL-92", "Ninguna de las anteriores opciones es completamente correcta en este contexto"], ans: 1,
      exp: "ODL define clases/atributos; OQL realiza las búsquedas de objetos." },
    { q: "¿Cuál es la diferencia principal entre el modo de funcionamiento \"Embebido\" y el modo \"Servidor\"?", hint: "Refuerza este concepto.",
      opts: ["El modo Embebido permite múltiples conexiones remotas, mientras que el Servidor es solo para un usuario", "El modo Embebido la base de datos corre en el mismo proceso que la aplicación, mientras que el modo Servidor es un proceso independiente", "El modo Servidor es gratuito y el modo Embebido requiere licencia comercial", "Ninguna de las anteriores opciones es completamente correcta en este contexto"], ans: 1,
      exp: "Embebido = misma memoria que la App; Servidor = red independiente." }    ]
  },
  final_simulacro_quiz: { title: 'Simulacro Real Final (40 Preguntas)', questions: [
    { q: "¿Cuál de las siguientes declaraciones de variable es válida en Java?",
      opts: ["int 1numero = 10;", "double valor-total = 5.5;", "String _nombre = \"Java\";", "char letra = 'abc';"], ans: 2,
      exp: "Los identificadores no pueden empezar por número ni contener guiones. char solo admite un carácter entre comillas simples." },
    { q: "Dado el código: int x = 5; int y = x++; ¿Qué valores tienen x e y tras la ejecución?",
      opts: ["x=5, y=5", "x=6, y=5", "x=6, y=6", "x=5, y=6"], ans: 1,
      exp: "x++ es un post-incremento: primero se asigna el valor actual de x a y (5) y luego x aumenta a 6." },
    { q: "¿Qué resultado produce la expresión (int) (7.9 / 2)?",
      opts: ["3.95", "4", "3", "3.5"], ans: 2,
      exp: "7.9 / 2 = 3.95. Al hacer el cast a int, se trunca la parte decimal, quedando 3." },
    { q: "¿Cuál es el valor por defecto de un atributo de tipo boolean en una clase?",
      opts: ["true", "false", "null", "0"], ans: 1,
      exp: "En Java, los atributos booleanos se inicializan por defecto a false." },
    { q: "¿Qué operador se utiliza para comparar si dos variables primitivas son iguales?",
      opts: ["=", "==", ".equals()", "is"], ans: 1,
      exp: "== compara valores en primitivos. .equals() se usa para comparar el contenido de objetos (como String)." },
    { q: "¿Qué palabra clave se usa para llamar a un constructor de la misma clase desde otro constructor?",
      opts: ["super()", "this()", "new()", "id()"], ans: 1,
      exp: "this() permite la sobrecarga de constructores dentro de la misma clase." },
    { q: "Si un atributo es 'private', ¿desde dónde es accesible?",
      opts: ["Desde cualquier clase del proyecto", "Desde subclases únicamente", "Solo desde la propia clase", "Desde el mismo paquete"], ans: 2,
      exp: "private restringe la visibilidad al ámbito de la clase donde se define." },
    { q: "¿Qué ocurre si no definimos ningún constructor en nuestra clase?",
      opts: ["Error de compilación", "Java crea un constructor por defecto sin parámetros", "No se podrán crear objetos de esa clase", "Los atributos no se inicializarán"], ans: 1,
      exp: "Java inserta automáticamente un constructor vacío si no hay ninguno definido." },
    { q: "¿Cuál es la función de un método 'static'?",
      opts: ["Solo puede llamarse tras crear un objeto", "Pertenece a la clase y puede llamarse sin instanciar objetos", "Impide que el método sea sobreescrito", "Permite que el método sea accedido desde otros paquetes"], ans: 1,
      exp: "static indica que el miembro es de clase, no de instancia." },
    { q: "En el diseño de clases, ¿qué es la encapsulación?",
      opts: ["Heredar de múltiples padres", "Ocultar los datos (private) y exponer servicios (public)", "Usar solo métodos abstractos", "Convertir objetos en bytes"], ans: 1,
      exp: "Protege el estado interno del objeto y obliga a usar getters/setters." },
    { q: "Analiza:\\nclass A { void x() { System.out.print(\"1\"); } }\\nclass B extends A { void x() { System.out.print(\"2\"); } }\\nA obj = new B();\\nobj.x();\\n¿Qué imprime?",
      opts: ["1", "2", "Error de compilación", "Nada"], ans: 1,
      exp: "Polimorfismo dinámico: en tiempo de ejecución se usa el método de la clase real del objeto (B)." },
    { q: "¿Qué debe ser la primera línea de un constructor en una clase hija?",
      opts: ["super() (o llamada al padre)", "this.atributo = valor;", "@Override", "package ...;"], ans: 0,
      exp: "Java exige construir la parte del padre antes que la del hijo." },
    { q: "¿Qué palabra clave impide que una clase sea heredada?",
      opts: ["abstract", "static", "final", "private"], ans: 2,
      exp: "Una clase final es una 'hoja' en el árbol de herencia." },
    { q: "Si la clase Perro hereda de Animal, ¿cuál es una asignación polimórfica válida?",
      opts: ["Perro p = new Animal();", "Animal a = new Perro();", "Perro p = (Animal) new Perro();", "Ninguna"], ans: 1,
      exp: "Una variable del tipo padre puede apuntar a cualquier objeto hijo." },
    { q: "¿Qué anotación se usa para indicar que estamos redefiniendo un método del padre?",
      opts: ["@Inherit", "@Overload", "@Override", "@Super"], ans: 2,
      exp: "@Override ayuda al compilador a verificar que la firma coincida con la del padre." },
    { q: "Analiza:\\nclass P { int n=1; }\\nclass H extends P { int n=2; }\\nP obj = new H();\\nSystem.out.print(obj.n);\\n¿Qué imprime?",
      opts: ["1", "2", "Error", "null"], ans: 0,
      exp: "Los atributos NO tienen polimorfismo. Se accede al atributo del tipo de la variable (P)." },
    { q: "¿Qué ocurre si una subclase no sobrescribe un método abstracto de su padre?",
      opts: ["Funciona normalmente", "El método del padre se borra", "La subclase también debe ser declarada abstracta o dará error", "Se usa una implementación por defecto"], ans: 2,
      exp: "Las clases concretas están obligadas a implementar todos los métodos abstractos heredados." },
    { q: "¿Puede un método static ser @Override?",
      opts: ["Sí, siempre", "No, los métodos estáticos no se heredan con polimorfismo", "Solo si son public", "Solo en interfaces"], ans: 1,
      exp: "El polimorfismo solo aplica a métodos de instancia." },
    { q: "¿Qué visibilidad permite que un atributo sea visto por las clases hijas pero no por el resto del mundo (fuera del paquete)?",
      opts: ["private", "public", "protected", "default"], ans: 2,
      exp: "protected es el nivel intermedio diseñado para la herencia." },
    { q: "Dado: class X { X(int n){} }. ¿Qué pasa con class Y extends X { Y(){} }?",
      opts: ["Compila bien", "Error: X no tiene constructor por defecto y el de Y no llama a super(n)", "Funciona si n es 0", "X se inicializa solo"], ans: 1,
      exp: "Si el padre no tiene constructor vacío, el hijo DEBE llamar explícitamente a un constructor del padre con super(...)." },
    { q: "¿Cuál es la principal diferencia entre Interface y Clase Abstracta?",
      opts: ["No hay diferencia", "La interfaz no puede tener atributos de instancia ni constructores", "La clase abstracta permite herencia múltiple", "Las interfaces se heredan con extends"], ans: 1,
      exp: "Las interfaces definen comportamiento puro (contratos). Las clases abstractas pueden tener estado y lógica base." },
    { q: "¿Qué modificador de acceso tienen los métodos de una interfaz por defecto en Java?",
      opts: ["private", "protected", "public", "default"], ans: 2,
      exp: "Los métodos de una interfaz son siempre públicos y abstractos (salvo default methods)." },
    { q: "¿Cuántas interfaces puede implementar una sola clase en Java?",
      opts: ["Solo una", "Máximo dos", "Ilimitadas", "Ninguna"], ans: 2,
      exp: "Java permite implementación múltiple de interfaces, pero solo herencia simple de clases." },
    { q: "¿Puede una clase abstracta implementar una interfaz?",
      opts: ["No", "Sí, y no está obligada a implementar sus métodos si ella misma es abstracta", "Sí, pero debe implementar todo inmediatamente", "Solo si la interfaz es vacía"], ans: 1,
      exp: "Las clases abstractas pueden delegar la implementación a sus hijas concretas." },
    { q: "¿Qué palabra clave se usa para que una clase use una interfaz?",
      opts: ["extends", "implements", "uses", "with"], ans: 1,
      exp: "extends para heredar clases, implements para cumplir interfaces." },
    { q: "¿Qué bloque se ejecuta SIEMPRE al final de un try-catch, ocurra o no un error?",
      opts: ["finally", "end", "stop", "finish"], ans: 0,
      exp: "finally se usa para limpieza de recursos (cerrar ficheros, etc.)." },
    { q: "¿Cuál es la diferencia entre Checked y Unchecked exceptions?",
      opts: ["No hay diferencia real", "Checked obligan al programador a gestionarlas (try-catch o throws); Unchecked no", "Unchecked son más graves", "Checked solo ocurren en red"], ans: 1,
      exp: "Checked (Exception) se verifican en compilación. Unchecked (RuntimeException) en ejecución." },
    { q: "¿Para qué sirve la palabra 'throws' en la firma de un método?",
      opts: ["Lanza una excepción inmediatamente", "Indica que el método puede lanzar esa excepción y delega su gestión", "Captura el error", "Cierra el programa"], ans: 1,
      exp: "Es un aviso para quien llame al método: 'atrapa este error o pásalo'." },
    { q: "¿Qué clase es la raíz de todas las excepciones?",
      opts: ["Object", "Error", "Throwable", "Exception"], ans: 2,
      exp: "Throwable es la superclase de la que cuelgan Error y Exception." },
    { q: "Si intentas acceder a un objeto que es 'null', ¿qué excepción se lanza?",
      opts: ["ArrayIndexOutOfBoundsException", "NullPointerException", "IllegalArgumentException", "IOException"], ans: 1,
      exp: "Ocurre cuando llamas a un método o atributo de una referencia que no apunta a nada." },
    { q: "¿Cuál es la principal ventaja de un ArrayList frente a un array convencional?",
      opts: ["Es más rápido", "Ocupa menos memoria", "Su tamaño es dinámico y crece automáticamente", "Puede guardar primitivos directamente"], ans: 2,
      exp: "Los arrays tienen tamaño fijo al crearse; los ArrayList gestionan su capacidad internamente." },
    { q: "¿Qué colección NO permite elementos duplicados?",
      opts: ["ArrayList", "LinkedList", "HashSet (Set)", "Vector"], ans: 2,
      exp: "Los Set (conjuntos) garantizan la unicidad de sus elementos." },
    { q: "¿Qué estructura de datos almacena pares clave-valor?",
      opts: ["List", "Set", "Map", "Queue"], ans: 2,
      exp: "HashMap o TreeMap asocian una clave única a un valor." },
    { q: "¿Qué método se usa para obtener el número de elementos en un ArrayList?",
      opts: ["length", "length()", "size()", "count()"], ans: 2,
      exp: "size() es el método estándar para colecciones. length es para arrays." },
    { q: "Si quieres asegurar que los elementos de tu lista estén ordenados automáticamente, ¿qué usarías?",
      opts: ["HashSet", "ArrayList", "TreeSet", "Stack"], ans: 2,
      exp: "Los 'Tree' (TreeSet, TreeMap) mantienen el orden natural o uno definido por un Comparator." },
    { q: "¿Qué es la 'Firma' de un método?",
      opts: ["Su nombre únicamente", "Su nombre y su lista de parámetros", "Su tipo de retorno y nombre", "Su visibilidad"], ans: 1,
      exp: "Java distingue métodos por su nombre y el tipo/orden de sus argumentos (Sobrecarga)." },
    { q: "¿Qué comando se usa en la terminal para compilar un archivo Java?",
      opts: ["java MiClase.java", "javac MiClase.java", "run java MiClase", "compile MiClase"], ans: 1,
      exp: "javac (Java Compiler) genera el .class (bytecode)." },
    { q: "¿Cuál es el punto de entrada de cualquier aplicación Java ejecutable?",
      opts: ["El constructor de la clase principal", "public static void main(String[] args)", "El método start()", "init()"], ans: 1,
      exp: "La JVM busca exactamente esa firma para iniciar la ejecución." },
    { q: "¿Qué permite la 'genericidad' (<T>) en las colecciones?",
      opts: ["Que el programa sea más rápido", "Seguridad de tipos en compilación, evitando castings manuales", "Que la lista sea infinita", "Poder guardar solo números"], ans: 1,
      exp: "ArrayList<String> asegura que solo entren cadenas, evitando errores en ejecución." },
    { q: "En un examen en papel, ¿qué es lo más importante según el profesor?",
      opts: ["No cometer errores de sintaxis (punto y coma)", "La lógica y el diseño de la jerarquía de clases", "Escribir muy rápido", "Que el código sea muy largo"], ans: 1,
      exp: "La sintaxis es secundaria si la estructura POO y la lógica son correctas." },
    { q: "¿Cuál es una característica fundamental de un ArrayList en cuanto a su rendimiento?",
      opts: ["Rápido para acceder por índice, pero lento para insertar en el medio", "Lento para acceder por índice, pero rápido para insertar en el medio", "No permite elementos duplicados", "Su tamaño se fija al crear la instancia"], ans: 0,
      exp: "ArrayList usa un array interno; el acceso directo es O(1) pero insertar en medio requiere desplazar elementos O(n)." },
    { q: "¿Qué ventaja principal ofrece una LinkedList frente a un ArrayList?",
      opts: ["Usa menos memoria total", "Es más rápida para acceder a posiciones aleatorias por índice", "Es muy eficiente para insertar o eliminar elementos en cualquier posición", "Solo permite almacenar tipos primitivos"], ans: 2,
      exp: "Al ser una lista de nodos enlazados, insertar solo requiere reubicar punteros, no desplazar bloques de memoria." },
    { q: "¿Cómo se definen las estructuras de datos dinámicas (como Stack) frente a los arrays estáticos?",
      opts: ["Requieren definir un tamaño fijo de antemano", "Su capacidad de almacenamiento puede crecer o disminuir durante la ejecución", "Son más rápidas que los arrays convencionales siempre", "Solo pueden declararse dentro del método main"], ans: 1,
      exp: "Las estructuras dinámicas no tienen un tamaño prefijado y gestionan su memoria según se añaden o quitan elementos." }
  ]},
  simulacro_2_quiz: { title: 'Simulacro B: Enfoque en Colecciones (40 Preguntas)', questions: [
    { q: "¿Qué sucede en un HashMap si insertamos un valor con una clave que ya existe?",
      opts: ["Se lanza una excepción", "Se ignora la inserción", "El nuevo valor sobreescribe al anterior para esa clave", "Se crean dos entradas con la misma clave"], ans: 2,
      exp: "En Map, las claves son únicas. Al usar put() con una clave existente, el valor antiguo se reemplaza." },
    { q: "En la estructura Stack (Pila), ¿qué método devuelve el elemento superior sin extraerlo?",
      opts: ["pop()", "push()", "peek()", "top()"], ans: 2,
      exp: "peek() permite ver el tope de la pila; pop() lo visualiza y lo elimina." },
    { q: "¿Cuál es la principal ventaja de un HashSet frente a un ArrayList?",
      opts: ["Mantiene el orden de inserción", "Permite acceso por índice", "Búsqueda de elementos (contains) mucho más rápida O(1)", "Ocupa menos memoria"], ans: 2,
      exp: "HashSet usa tablas hash; comprobar si un elemento existe es instantáneo comparado con recorrer una lista." },
    { q: "¿Qué estructura de datos es más adecuada para implementar un historial de 'Deshacer' (Undo)?",
      opts: ["ArrayList", "Queue", "Stack", "HashMap"], ans: 2,
      exp: "Stack sigue el principio LIFO: la última acción realizada es la primera en deshacerse." },
    { q: "¿Qué interfaz implementa LinkedList que no implementa ArrayList?",
      opts: ["List", "Collection", "Queue", "Iterable"], ans: 2,
      exp: "LinkedList implementa tanto List como Deque/Queue, permitiendo su uso como cola o pila." },
    { q: "¿Cómo iterarías eficientemente por los VALORES de un HashMap?",
      opts: ["map.keySet()", "map.values()", "map.iterator()", "map.toArray()"], ans: 1,
      exp: "values() devuelve una Collection con todos los valores almacenados en el mapa." },
    { q: "¿Cuál de las siguientes es una estructura LIFO?",
      opts: ["LinkedList", "Stack", "PriorityQueue", "HashSet"], ans: 1,
      exp: "LIFO (Last-In, First-Out) es la característica definitoria de una Pila (Stack)." },
    { q: "¿Qué diferencia hay entre size() y length en Java?",
      opts: ["No hay diferencia", "size() es para colecciones; length para arrays y String", "length() es para colecciones; size para arrays", "size() es una variable; length es un método"], ans: 1,
      exp: "Es un error común de examen: los arrays usan el atributo .length y las colecciones el método .size()." },
    { q: "¿Qué excepción se lanza si intentas sacar un elemento de una pila vacía?",
      opts: ["NullPointerException", "EmptyStackException", "IndexOutOfBoundsException", "StackOverflowError"], ans: 1,
      exp: "java.util.Stack lanza EmptyStackException si llamas a pop() o peek() en una pila sin datos." },
    { q: "¿Qué método de HashMap nos dice si una clave específica está presente?",
      opts: ["hasKey()", "containsKey()", "exists()", "get()"], ans: 1,
      exp: "containsKey(key) devuelve un booleano indicando la presencia de la clave." },
    // Reutilizando preguntas fundamentales para llegar a 40
    { q: "¿Qué palabra clave se usa para llamar a un constructor de la misma clase?", opts: ["super()", "this()", "new()", "id()"], ans: 1, exp: "this() permite la sobrecarga de constructores." },
    { q: "Si un atributo es 'private', ¿desde dónde es accesible?", opts: ["Desde cualquier clase", "Desde subclases", "Solo desde la propia clase", "Desde el mismo paquete"], ans: 2, exp: "private restringe la visibilidad al ámbito de la clase." },
    { q: "¿Qué ocurre si no definimos ningún constructor?", opts: ["Error", "Java crea uno por defecto vacío", "No se podrán crear objetos", "Los atributos no se inicializarán"], ans: 1, exp: "Java inserta automáticamente un constructor vacío." },
    { q: "¿Cuál es la función de un método 'static'?", opts: ["Solo por objeto", "Pertenece a la clase (sin instancia)", "Impide sobrecarga", "Acceso remoto"], ans: 1, exp: "static indica que el miembro es de clase." },
    { q: "En el diseño de clases, ¿qué es la encapsulación?", opts: ["Heredar de muchos", "Ocultar datos y exponer servicios", "Métodos abstractos", "Serialización"], ans: 1, exp: "Protege el estado interno del objeto." },
    { q: "¿Qué debe ser la primera línea de un constructor hijo?", opts: ["super()", "this.atrib = val;", "@Override", "package;"], ans: 0, exp: "Construir al padre antes que al hijo." },
    { q: "¿Qué palabra clave impide heredar una clase?", opts: ["abstract", "static", "final", "private"], ans: 2, exp: "Clase final es hoja en el árbol." },
    { q: "Si Perro hereda de Animal, ¿asignación válida?", opts: ["Perro p = new Animal();", "Animal a = new Perro();", "Perro p = (Animal) new Perro();", "Ninguna"], ans: 1, exp: "Variable padre apunta a objeto hijo." },
    { q: "¿Qué anotación indica redefinición?", opts: ["@Inherit", "@Overload", "@Override", "@Super"], ans: 2, exp: "@Override verifica la firma." },
    { q: "¿Qué ocurre si una subclase no sobrescribe un método abstracto?", opts: ["Funciona", "Se borra", "La subclase debe ser abstracta", "Default"], ans: 2, exp: "Clases concretas deben implementar abstractos." },
    { q: "¿Qué visibilidad permite ver a hijas pero no al mundo?", opts: ["private", "public", "protected", "default"], ans: 2, exp: "protected para la herencia." },
    { q: "¿Diferencia principal Interface y Abstracta?", opts: ["Ninguna", "Interfaz sin atributos/constructores", "Abstracta herencia múltiple", "extends"], ans: 1, exp: "Interfaces son contratos puros." },
    { q: "¿Modificador por defecto en métodos de interfaz?", opts: ["private", "protected", "public", "default"], ans: 2, exp: "Siempre públicos y abstractos." },
    { q: "¿Cuántas interfaces implementa una clase?", opts: ["Una", "Dos", "Ilimitadas", "Ninguna"], ans: 2, exp: "Implementación múltiple permitida." },
    { q: "¿Bloque que se ejecuta SIEMPRE al final de un try-catch?", opts: ["finally", "end", "stop", "finish"], ans: 0, exp: "Limpieza de recursos." },
    { q: "¿Diferencia Checked y Unchecked?", opts: ["Ninguna", "Checked obligan gestión", "Unchecked graves", "Red"], ans: 1, exp: "Checked se verifican en compilación." },
    { q: "¿Para qué sirve 'throws'?", opts: ["Lanza ya", "Delega gestión", "Atrapa", "Cierra"], ans: 1, exp: "Aviso de posible error." },
    { q: "¿Clase raíz de todas las excepciones?", opts: ["Object", "Error", "Throwable", "Exception"], ans: 2, exp: "Throwable es la superclase." },
    { q: "Si accedes a null, ¿excepción?", opts: ["Bounds", "NullPointerException", "Illegal", "IO"], ans: 1, exp: "Referencia a nada." },
    { q: "¿Qué comando compila Java?", opts: ["java", "javac", "run", "compile"], ans: 1, exp: "javac genera bytecode." },
    { q: "¿Punto de entrada de App Java?", opts: ["Constructor", "main(String[] args)", "start()", "init()"], ans: 1, exp: "Firma exacta de inicio." },
    { q: "¿Qué permite la genericidad <T>?", opts: ["Velocidad", "Seguridad de tipos", "Infinito", "Solo números"], ans: 1, exp: "Evita castings manuales." },
    { q: "En examen en papel, ¿más importante?", opts: ["Sintaxis", "Lógica y POO", "Rapidez", "Longitud"], ans: 1, exp: "Estructura y diseño clave." },
    { q: "ArrayList rendimiento:", opts: ["Rápido índice, lento medio", "Lento índice, rápido medio", "Sin duplicados", "Fijo"], ans: 0, exp: "Acceso directo O(1)." },
    { q: "Ventaja LinkedList:", opts: ["Menos memoria", "Rápido aleatorio", "Eficiente insertar medio", "Primitivos"], ans: 2, exp: "Cambio de punteros." },
    { q: "Estructuras dinámicas vs estáticas:", opts: ["Tamaño fijo", "Tamaño variable", "Siempre rápidas", "Solo main"], ans: 1, exp: "Gestión de memoria." },
    { q: "¿Cómo se llama el proceso de convertir un objeto en una secuencia de bytes?", opts: ["Instanciación", "Serialización", "Encapsulación", "Polimorfismo"], ans: 1, exp: "Permite guardar objetos en disco." },
    { q: "¿Qué interfaz debe implementar una clase para ser serializada?", opts: ["Cloneable", "Serializable", "Comparable", "Runnable"], ans: 1, exp: "Interfaz marcadora sin métodos." },
    { q: "¿Qué hace 'transient'?", opts: ["Hace atributo estático", "Evita que un atributo se serialice", "Permite acceso rápido", "Indica herencia"], ans: 1, exp: "Atributos transitorios no se guardan." },
    { q: "¿Qué método de la clase Object se recomienda sobrescribir para depurar mejor?", opts: ["equals()", "hashCode()", "toString()", "finalize()"], ans: 2, exp: "toString() devuelve representación de texto." }
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
      { scenario: 'Necesitas una cola (FIFO) donde añades al final y extraes del principio frecuentemente.', chips: ['ArrayList', 'LinkedList', 'HashMap', 'HashSet'], answer: 'LinkedList', explanation: 'LinkedList implementa Queue. Inserción/extracción en extremos O(1). Ideal para colas y pilas.' },
      { scenario: 'Necesitas insertar o eliminar elementos frecuentemente en cualquier posición (especialmente en el medio) de forma eficiente.', chips: ['ArrayList', 'LinkedList', 'HashMap', 'HashSet'], answer: 'LinkedList', explanation: 'LinkedList es muy eficiente para insertar/eliminar en cualquier posición ya que solo requiere cambiar punteros entre nodos.' },
      { scenario: 'Deseas acceder a los elementos por su índice de forma instantánea pero no te importa que insertar en el medio sea lento.', chips: ['ArrayList', 'LinkedList', 'HashMap', 'HashSet'], answer: 'ArrayList', explanation: 'ArrayList es rápido para acceso directo por índice (O(1)), pero lento para insertar/eliminar en el medio debido al desplazamiento de elementos.' }
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
          { desc: 'Tiene atributo private double precio', test: code => /private\s+double\s+precio\s*;/i.test(code) },
          { desc: 'Constructor recibe nombre y precio', test: code => /public\s+Producto\s*\(\s*String\s+\w+\s*,\s*double\s+\w+\s*\)/i.test(code) },
          { desc: 'Tiene método public double getPrecio()', test: code => /public\s+double\s+getPrecio\s*\(\s*\)/i.test(code) },
          { desc: 'Setter valida precio > 0 y lanza error o asigna', test: code => /public\s+void\s+setPrecio/i.test(code) && /if\s*\(\s*\w+\s*>\s*0\s*\)/i.test(code) }
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
          { desc: 'Existe interfaz Calculable con double calcularTotal()', test: code => /interface\s+Calculable\s*\{[\s\S]*double\s+calcularTotal\s*\(\s*\)\s*;/i.test(code) },
          { desc: 'Factura implementa Calculable', test: code => /class\s+Factura\s+implements\s+Calculable/i.test(code) },
          { desc: 'Implementa calcularTotal() con @Override', test: code => /@Override[\s\S]*public\s+double\s+calcularTotal\s*\(\s*\)/i.test(code) }
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
    title: 'Guía del Examen Final — 16 de Mayo',
    subtitle: 'Lo que ha confirmado el profesor: 2 ejercicios, en papel, 1 hora.',
    content: `
      <div class="guide-section" style="background:rgba(239,68,68,0.08);border:1px solid rgba(239,68,68,0.3);border-radius:12px;padding:1.25rem;margin-bottom:1.5rem">
        <h3 style="color:#f87171">📋 Formato oficial del examen (email del profesor)</h3>
        <ul class="guide-list">
          <li>⏱ <strong>Duración total: 1h 30min</strong> → <strong>30 min test</strong> (a, b, c, d — 2 incorrectas cancelan 1) + <strong>1 hora práctica</strong></li>
          <li>📝 <strong>2 ejercicios prácticos</strong> en papel, en los que habrá que <em>distribuir un sistema por clases</em></li>
          <li>✅ Temas confirmados: <strong>control de excepciones, encapsulación, herencia, polimorfismo, abstracción e interfaces</strong></li>
          <li>🗂 También: <strong>estructuras dinámicas vistas en clase</strong> (arrays de objetos, ArrayList, etc.)</li>
          <li>🚫 <strong>No importan los errores de sintaxis, pero sí los de lógica</strong></li>
        </ul>
      </div>

      <div class="guide-section">
        <h3>1. Estructura mental para cada ejercicio</h3>
        <p>Cuando leas el enunciado, divídelo así en la cabeza:</p>
        <ul class="guide-list">
          <li><strong>① Interface:</strong> Si el enunciado dice "todos se pueden [hacer algo]" → crea una <code>interface</code>. Ej: todos arrancan → <code>interface Conducible { void arrancar(); }</code></li>
          <li><strong>② Clase abstracta:</strong> La "clase madre" que nunca se instancia directamente. Tiene atributos <code>protected</code> y métodos abstractos obligatorios para las hijas. Usa <code>abstract class X implements MiInterface</code></li>
          <li><strong>③ Subclases:</strong> Cada tipo concreto (Coche, Moto, Gerente…). Constructor con <code>super()</code>, atributos propios <code>private</code>, y <code>@Override</code> en cada método del padre.</li>
          <li><strong>④ El main:</strong> Array de objetos del tipo de la clase madre (<code>Animal[] lista = new Animal[4]</code>), <code>try-catch</code> si puede haber error, y un <code>for</code> que recorre con polimorfismo.</li>
        </ul>
      </div>

      <div class="guide-section warning-section">
        <h3>2. Los 5 elementos que el profesor mira siempre</h3>
        <div class="trap-alert">
          <strong>⚠️ Si falta alguno, pierdes puntos aunque el resto esté perfecto:</strong>
        </div>
        <ul class="guide-list" style="margin-top:0.75rem">
          <li>🔒 <strong>Encapsulación:</strong> atributos <code>private</code> en subclases, <code>protected</code> en la clase abstracta. NUNCA <code>public</code>.</li>
          <li>🔗 <strong>super() en constructor:</strong> Primera línea del constructor hijo. Si lo olvidas, no compilará.</li>
          <li>🏷 <strong>@Override:</strong> Ponlo encima de cada método sobreescrito. El profesor lo mira.</li>
          <li>🧩 <strong>this() en constructor sin parámetros:</strong> <code>public Vehiculo() { this("Marca", "Modelo", 0); }</code></li>
          <li>🚨 <strong>try-catch:</strong> Siempre que pueda fallar algo (ej: salario negativo en el constructor).</li>
        </ul>
      </div>

      <div class="guide-section" style="background:rgba(59,130,246,0.08);border:1px solid rgba(59,130,246,0.3);border-radius:12px;padding:1.25rem;margin-bottom:1.5rem">
        <h3 style="color:#60a5fa">📦 Colecciones Dinámicas (Java Collections Framework)</h3>
        <p>El profesor ha confirmado que entrarán estas estructuras de <code>java.util</code>:</p>
        <ul class="guide-list">
          <li><strong>ArrayList:</strong> Es un array que se redimensiona automáticamente.
            <ul>
              <li>✅ <strong>Rápido:</strong> Para acceder a elementos por índice (acceso directo).</li>
              <li>❌ <strong>Lento:</strong> Para insertar o eliminar elementos en el medio de la lista (hay que desplazar el resto).</li>
            </ul>
          </li>
          <li><strong>LinkedList (Lista Enlazada):</strong> Cada elemento apunta al siguiente.
            <ul>
              <li>✅ <strong>Muy eficiente:</strong> Para insertar o eliminar elementos en cualquier posición (solo se cambian los punteros).</li>
              <li>❌ <strong>Lento:</strong> Para acceder a una posición específica (hay que recorrer la lista desde el principio).</li>
            </ul>
          </li>
          <li><strong>Stack (Pila):</strong> Ejemplo de <strong>estructura dinámica</strong>. A diferencia de los arrays estáticos:
            <ul>
              <li>📈 Su capacidad crece o disminuye en tiempo de ejecución.</li>
              <li>⚙️ No requieren definir un tamaño fijo de antemano.</li>
            </ul>
          </li>
        </ul>
      </div>

      <div class="guide-section highlight-section">
        <h3>3. Esqueleto mínimo ganador (memoriza esto)</h3>
        <div style="background:#0c1e2e;border-radius:8px;padding:1rem;font-family:'JetBrains Mono',monospace;font-size:0.8rem;line-height:1.7;color:#cdd6f4">
<span style="color:#89b4fa">interface</span> <span style="color:#cba6f7">Accion</span> { <span style="color:#89b4fa">void</span> <span style="color:#89dceb">hacer</span>(); }<br><br>
<span style="color:#89b4fa">abstract class</span> <span style="color:#cba6f7">Padre</span> <span style="color:#89b4fa">implements</span> <span style="color:#cba6f7">Accion</span> {<br>
&nbsp;&nbsp;<span style="color:#89b4fa">protected</span> <span style="color:#f38ba8">String</span> nombre;<br>
&nbsp;&nbsp;<span style="color:#89b4fa">public</span> <span style="color:#cba6f7">Padre</span>(<span style="color:#f38ba8">String</span> nombre) { <span style="color:#89b4fa">this</span>.nombre = nombre; }<br>
&nbsp;&nbsp;<span style="color:#89b4fa">public</span> <span style="color:#cba6f7">Padre</span>() { <span style="color:#89b4fa">this</span>(<span style="color:#a6e3a1">"Genérico"</span>); }  <span style="color:#6c7086">// this()</span><br>
&nbsp;&nbsp;<span style="color:#89b4fa">public abstract</span> <span style="color:#f38ba8">String</span> <span style="color:#89dceb">getTipo</span>();<br>
}<br><br>
<span style="color:#89b4fa">class</span> <span style="color:#cba6f7">Hijo</span> <span style="color:#89b4fa">extends</span> <span style="color:#cba6f7">Padre</span> {<br>
&nbsp;&nbsp;<span style="color:#89b4fa">private int</span> extra;<br>
&nbsp;&nbsp;<span style="color:#89b4fa">public</span> <span style="color:#cba6f7">Hijo</span>(<span style="color:#f38ba8">String</span> nombre, <span style="color:#89b4fa">int</span> extra) {<br>
&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#89b4fa">super</span>(nombre);  <span style="color:#6c7086">// ← primera línea siempre</span><br>
&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#89b4fa">this</span>.extra = extra;<br>
&nbsp;&nbsp;}<br>
&nbsp;&nbsp;<span style="color:#f38ba8">@Override</span> <span style="color:#89b4fa">public</span> <span style="color:#f38ba8">String</span> <span style="color:#89dceb">getTipo</span>() { <span style="color:#89b4fa">return</span> <span style="color:#a6e3a1">"Hijo"</span>; }<br>
&nbsp;&nbsp;<span style="color:#f38ba8">@Override</span> <span style="color:#89b4fa">public void</span> <span style="color:#89dceb">hacer</span>() { System.out.println(nombre + <span style="color:#a6e3a1">" hace algo"</span>); }<br>
}<br><br>
<span style="color:#6c7086">// En main:</span><br>
<span style="color:#cba6f7">Padre</span>[] arr = <span style="color:#89b4fa">new</span> <span style="color:#cba6f7">Padre</span>[<span style="color:#fab387">3</span>];<br>
arr[<span style="color:#fab387">0</span>] = <span style="color:#89b4fa">new</span> <span style="color:#cba6f7">Hijo</span>(<span style="color:#a6e3a1">"A"</span>, <span style="color:#fab387">5</span>);<br>
<span style="color:#89b4fa">try</span> { ... } <span style="color:#89b4fa">catch</span> (<span style="color:#cba6f7">IllegalArgumentException</span> e) { ... }
        </div>
      </div>
    `
  }
];

