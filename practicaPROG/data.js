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
    { q: 'Los lenguajes de programación utilizan distintos tipos de datos. ¿Cuál de los siguientes no pertenece a los tipos de datos básicos o primitivos?', hint: 'Piensa en estructuras complejas.',
      opts: ['Número entero (int)', 'Valor booleano (boolean)', 'Array o arreglo', 'Carácter (char)'], ans: 2,
      exp: 'Un <strong>array</strong> es una estructura de datos/objeto, no un tipo primitivo básico (int, boolean, char, double).' },
    { q: '¿Cuál de las siguientes afirmaciones describe correctamente la relación entre un algoritmo y un programa?', hint: 'Lógica vs Implementación.',
      opts: ['El algoritmo es la implementación y el programa la lógica', 'El algoritmo es la lógica del problema y el programa es su implementación', 'Son conceptos idénticos', 'El programa es independiente del lenguaje'], ans: 1,
      exp: 'El <strong>algoritmo</strong> es el diseño lógico (pasos) y el <strong>programa</strong> es la implementación en un lenguaje específico.' },
    { q: '¿Cuál es la función principal de un depurador (debugger) dentro de un entorno de desarrollo?', hint: 'Se usa para encontrar fallos.',
      opts: ['Detectar errores de sintaxis', 'Optimizar el código automáticamente', 'Analizar la ejecución paso a paso para localizar errores lógicos', 'Compilar el código a lenguaje máquina'], ans: 2,
      exp: 'Un <strong>depurador</strong> permite detener la ejecución y ver el estado de las variables paso a paso para encontrar errores de lógica.' },
    { q: 'En el modelo Entrada–Proceso–Salida, ¿qué elemento se considera el núcleo del programa?', hint: 'Donde ocurre la transformación.',
      opts: ['Los datos de entrada', 'El algoritmo que procesa los datos', 'La pantalla de salida', 'El teclado'], ans: 1,
      exp: 'El <strong>algoritmo/proceso</strong> es el núcleo que transforma las entradas en resultados útiles.' },
    { q: '¿Qué tipo de estructura de control se utiliza para repetir un conjunto de instrucciones mientras se cumpla una condición?', hint: 'Bucles.',
      opts: ['Estructura secuencial', 'Estructura selectiva (if)', 'Estructura iterativa (while/for)', 'Estructura de salto'], ans: 2,
      exp: 'Las <strong>estructuras iterativas</strong> permiten repetir código mientras la condición sea verdadera.' },
    { q: 'En el paradigma orientado a objetos, ¿cuál es el elemento central sobre el que se construyen los programas?', hint: 'Todo gira en torno a ellos.',
      opts: ['Las funciones', 'Los objetos que combinan datos y comportamiento', 'Las variables globales', 'Las instrucciones secuenciales'], ans: 1,
      exp: 'En <strong>POO</strong>, los programas se organizan como una colección de objetos que interactúan entre sí.' },
    { q: '¿Por qué se dice que Java utiliza un sistema híbrido de ejecución?', hint: 'Compilación y... ¿qué más?',
      opts: ['Porque funciona en Windows y Linux', 'Porque compila a bytecode y luego se interpreta en la JVM', 'Porque usa C++ internamente', 'Porque no necesita compilador'], ans: 1,
      exp: 'Java compila el código fuente a <strong>bytecode</strong> (fichero .class) y la <strong>JVM</strong> lo interpreta o ejecuta en la máquina destino.' },
    { q: '¿Cuál es el nombre del proceso automático que elimina los objetos que ya no se usan en la memoria en Java?', hint: 'Limpia la basura.',
      opts: ['Compilador', 'Debugger', 'Garbage Collector (Recolector de Basura)', 'JVM'], ans: 2,
      exp: 'El <strong>Garbage Collector</strong> libera automáticamente la memoria ocupada por objetos que ya no tienen ninguna referencia.' },
    { q: '¿Qué característica permite que un programa Java funcione en diferentes sistemas operativos sin cambios?', hint: 'Escríbelo una vez...',
      opts: ['Portabilidad', 'Legibilidad', 'Encapsulación', 'Polimorfismo'], ans: 0,
      exp: 'La <strong>portabilidad</strong> ("Write Once, Run Anywhere") es posible gracias a que el bytecode es independiente del hardware.' },
    { q: '¿Qué indica que un método tenga como tipo de retorno la palabra clave "void"?', hint: 'Sobre el valor devuelto.',
      opts: ['Que devuelve un cero', 'Que el método no realiza ninguna acción', 'Que realiza una acción pero no devuelve ningún valor', 'Que devuelve un error'], ans: 2,
      exp: '<strong>void</strong> significa que el método ejecuta su código pero no retorna ningún dato al finalizar.' },
    { q: '¿Cuál de las siguientes afirmaciones sobre los atributos de una clase es correcta?', hint: 'Estado de los objetos.',
      opts: ['Se declaran dentro de los métodos', 'Cada objeto tiene su propia copia de los atributos (estado)', 'Todos los objetos comparten siempre los mismos valores', 'Son obligatoriamente públicos'], ans: 1,
      exp: 'Cada instancia u <strong>objeto</strong> mantiene su propio estado independiente a través de sus atributos.' },
    { q: '¿Cuál es la misión principal de un constructor en una clase?', hint: 'Se ejecuta al hacer "new".',
      opts: ['Borrar el objeto de memoria', 'Inicializar los atributos del objeto al crearlo', 'Compilar la clase', 'Llamar al método main'], ans: 1,
      exp: 'El <strong>constructor</strong> se invoca automáticamente al crear el objeto para asegurar que sus atributos tengan valores válidos.' },
    { q: '¿Qué sucede en Java al asignar una variable de objeto a otra (ej. p1 = p2)?', hint: 'Paso por referencia.',
      opts: ['Se crea una copia física del objeto', 'Ambas variables apuntan al mismo objeto en memoria', 'Se borra el primer objeto', 'Da error de compilación'], ans: 1,
      exp: 'En Java, las variables de objeto guardan <strong>referencias</strong> (direcciones). Al asignar, ambas apuntan al mismo lugar.' },
    { q: '¿Qué relación se da cuando una parte no puede existir sin el "todo" (ej. Corazón y Cuerpo)?', hint: 'Relación fuerte.',
      opts: ['Agregación', 'Asociación simple', 'Composición', 'Herencia'], ans: 2,
      exp: 'La <strong>composición</strong> es una relación fuerte donde la existencia de la parte depende de la existencia del contenedor.' },
    { q: '¿Cuál es la principal ventaja de usar métodos "setter" en lugar de atributos públicos?', hint: 'Control de datos.',
      opts: ['Hacen el programa más rápido', 'Permiten validar los datos antes de cambiar el atributo', 'Ocupan menos memoria', 'No tienen ventajas'], ans: 1,
      exp: 'Los <strong>setters</strong> permiten aplicar lógica de validación (ej. impedir que una edad sea negativa) antes de guardar el valor.' },
    { q: '¿Qué principio POO consiste en ocultar el estado interno y mostrar solo lo necesario?', hint: 'Cápsula.',
      opts: ['Herencia', 'Polimorfismo', 'Encapsulamiento', 'Abstracción'], ans: 2,
      exp: 'El <strong>encapsulamiento</strong> protege los datos usando modificadores privados y acceso controlado mediante métodos.' },
    { q: '¿Qué requisito es necesario para que el polimorfismo funcione en una jerarquía de clases?', hint: 'Cambiar el comportamiento del padre.',
      opts: ['Que todos los atributos sean public', 'La sobreescritura de métodos en las clases hijas', 'Tener muchos constructores', 'No usar interfaces'], ans: 1,
      exp: 'El <strong>polimorfismo</strong> requiere que las clases hijas redefinan (sobreescriban) métodos del padre para actuar de forma distinta.' },
    { q: '¿Cuál es la regla obligatoria al definir una clase pública en Java?', hint: 'Sobre el nombre del fichero.',
      opts: ['Debe empezar por minúscula', 'El archivo debe llamarse igual que la clase y tener extensión .java', 'Debe tener un método main obligatoriamente', 'No puede tener atributos'], ans: 1,
      exp: 'El compilador de Java exige que el nombre del fichero <strong>coincida exactamente</strong> con el nombre de la clase pública.' },
    { q: '¿Cuál es el orden correcto para utilizar una variable sin errores?', hint: 'Pasos de vida de la variable.',
      opts: ['Inicializar -> Declarar -> Usar', 'Declarar -> Inicializar -> Usar', 'Usar -> Declarar -> Inicializar', 'Declarar -> Usar -> Inicializar'], ans: 1,
      exp: 'Primero se define el tipo (<strong>Declarar</strong>), luego se le da un valor (<strong>Inicializar</strong>) y finalmente se puede <strong>Usar</strong>.' },
    { q: '¿Qué indica el punto y coma (;) al final de una sentencia en Java?', hint: 'Fin de instrucción.',
      opts: ['El final de un bloque de código', 'La separación de parámetros', 'El final de una instrucción o sentencia', 'Un comentario'], ans: 2,
      exp: 'El <strong>punto y coma</strong> marca el límite de una instrucción simple para el compilador.' },
    { q: '¿Cuál es el valor por defecto de una variable de tipo boolean que es atributo de clase?', hint: 'Falso o verdadero.',
      opts: ['true', 'false', 'null', '0'], ans: 1,
      exp: 'Los atributos <strong>boolean</strong> se inicializan automáticamente a **false** si no se les asigna valor.' },
    { q: '¿Qué operador se utiliza para comparar si dos valores primitivos son iguales?', hint: 'Doble... algo.',
      opts: ['=', '==', 'equals()', 'matches'], ans: 1,
      exp: 'Para tipos primitivos se usa <strong>==</strong>. El operador = es para asignación.' },
    { q: '¿Cómo se comenta una sola línea en Java?', hint: 'Barras.',
      opts: ['/* comentario */', '// comentario', '# comentario', '-- comentario'], ans: 1,
      exp: 'Las dos barras inclinadas <strong>//</strong> sirven para comentarios de una sola línea.' },
    { q: '¿Cuál es el resultado de la expresión 10 % 3 en Java?', hint: 'Operador módulo.',
      opts: ['3', '3.33', '1', '0'], ans: 2,
      exp: 'El operador <strong>%</strong> devuelve el resto de la división entera. 10 dividido entre 3 es 3 y sobra **1**.' },
    { q: '¿Qué estructura de control es más adecuada para elegir entre múltiples opciones fijas?', hint: 'Según el valor de una variable.',
      opts: ['if-else', 'while', 'switch', 'for'], ans: 2,
      exp: '<strong>switch</strong> es ideal para ramificar el código según el valor exacto de una variable (int, char, String, etc.).' },
    { q: '¿Qué palabra clave se usa para crear una constante en Java?', hint: 'No cambia.',
      opts: ['const', 'static', 'final', 'fixed'], ans: 2,
      exp: '<strong>final</strong> impide que el valor de una variable sea modificado después de su inicialización.' },
    { q: '¿Qué ocurre si declaramos un método como "static"?', hint: 'Relación con la clase.',
      opts: ['No puede tener parámetros', 'Se puede llamar sin crear un objeto de la clase', 'Es más lento', 'Solo puede ser privado'], ans: 1,
      exp: 'Los miembros <strong>static</strong> pertenecen a la clase, por lo que se pueden usar directamente con el nombre de la clase.' },
    { q: '¿Para qué sirve la palabra clave "super"?', hint: 'Relación con el padre.',
      opts: ['Para crear un superobjeto', 'Para acceder a miembros de la clase padre', 'Para salir de un bucle', 'Para importar librerías'], ans: 1,
      exp: '<strong>super</strong> hace referencia a la superclase inmediata, permitiendo llamar a sus métodos o constructores.' },
    { q: '¿Qué diferencia hay entre una clase y una interfaz?', hint: 'Implementación.',
      opts: ['Son iguales', 'La interfaz solo define contratos (métodos sin cuerpo) y la clase los implementa', 'La interfaz puede tener atributos normales', 'La clase se hereda con implements'], ans: 1,
      exp: 'Una <strong>interfaz</strong> define "qué" debe hacer un objeto, mientras que la <strong>clase</strong> define "cómo" lo hace.' },
    { q: '¿Qué excepción se lanza si dividimos un entero por cero?', hint: 'Matemáticas.',
      opts: ['NullPointerException', 'NumberFormatException', 'ArithmeticException', 'IOException'], ans: 2,
      exp: 'Dividir por cero en operaciones enteras lanza una <strong>ArithmeticException</strong>.' },
    { q: '¿Qué bloque de código se usa para garantizar que un recurso se cierre siempre?', hint: 'Garantía.',
      opts: ['try', 'catch', 'finally', 'throws'], ans: 2,
      exp: 'El bloque <strong>finally</strong> se ejecuta siempre, haya habido error o no.' },
    { q: '¿Cuál es la ventaja de un ArrayList sobre un array convencional?', hint: 'Tamaño.',
      opts: ['Es más rápido', 'Crece dinámicamente según se necesite', 'Ocupa menos memoria', 'No permite nulos'], ans: 1,
      exp: 'El <strong>ArrayList</strong> gestiona su tamaño automáticamente, facilitando añadir o quitar elementos.' },
    { q: '¿Qué colección usarías para evitar elementos duplicados?', hint: 'Conjuntos.',
      opts: ['ArrayList', 'LinkedList', 'HashSet', 'HashMap'], ans: 2,
      exp: 'Un <strong>Set</strong> (como HashSet) garantiza que no existan dos elementos iguales en la colección.' },
    { q: 'En un HashMap, ¿cómo se recuperan los valores?', hint: 'Pares.',
      opts: ['Por su índice numérico', 'Mediante una clave única', 'Buscando por todo el mapa', 'No se pueden recuperar'], ans: 1,
      exp: 'El <strong>HashMap</strong> almacena pares clave-valor; usas la clave para obtener el valor asociado de forma rápida.' },
    { q: '¿Qué método inicia la ejecución de un hilo (Thread)?', hint: 'No es run().',
      opts: ['run()', 'execute()', 'start()', 'begin()'], ans: 2,
      exp: 'Para crear un nuevo flujo de ejecución se debe llamar a <strong>start()</strong>, el cual internamente llama a run().' },
    { q: '¿Qué hace el método Thread.sleep()?', hint: 'Pausa.',
      opts: ['Detiene el hilo para siempre', 'Pausa la ejecución del hilo actual durante un tiempo determinado', 'Borra el hilo', 'Despierta a otros hilos'], ans: 1,
      exp: '<strong>sleep()</strong> suspende temporalmente el hilo actual por los milisegundos indicados.' },
    { q: '¿Para qué sirve la palabra clave "synchronized"?', hint: 'Seguridad en hilos.',
      opts: ['Para que el programa vaya más rápido', 'Para evitar que dos hilos accedan a un recurso a la vez', 'Para unir dos hilos', 'Para descargar datos'], ans: 1,
      exp: '<strong>synchronized</strong> evita condiciones de carrera, permitiendo que solo un hilo entre en una sección crítica al mismo tiempo.' },
    { q: '¿Qué clase se usa para leer líneas de texto de un fichero de forma eficiente?', hint: 'Usa un buffer.',
      opts: ['File', 'FileWriter', 'BufferedReader', 'FileOutputStream'], ans: 2,
      exp: '<strong>BufferedReader</strong> lee bloques de texto en memoria, lo que es mucho más eficiente que leer carácter a carácter.' },
    { q: '¿Qué interfaz permite que un objeto sea guardado en un fichero binario?', hint: 'Serialización.',
      opts: ['Cloneable', 'Runnable', 'Serializable', 'Readable'], ans: 2,
      exp: 'Implementar <strong>Serializable</strong> indica a Java que el objeto puede ser convertido en una secuencia de bytes para guardarlo.' },
    { q: '¿Qué sucede si no capturamos una excepción de tipo "Checked"?', hint: 'Compilación.',
      opts: ['El programa falla en ejecución', 'El código no compila', 'Se ignora el error', 'El ordenador se apaga'], ans: 1,
      exp: 'Las <strong>Checked Exceptions</strong> deben ser gestionadas obligatoriamente con try-catch o declaradas con throws para que el código compile.' }
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

