// =============================================
// EJERCICIOS PRÁCTICOS — Programación DAW
// Basados en el formato del examen real:
// 2 ejercicios, sistema por clases, en papel
// =============================================

const EJERCICIOS = [
  {
    id: 'ej1',
    titulo: 'Sistema de Gestión de Empleados',
    nivel: '⭐⭐',
    temas: ['Encapsulación', 'Herencia', 'Polimorfismo'],
    tiempo: '30 min',
    enunciado: `<p style="margin-bottom: 1rem;">Una empresa necesita un sistema para gestionar sus empleados. Diseña e implementa en Java las siguientes clases:</p>
      
<div class="code-exercise-desc" style="margin-bottom: 1rem; border-left: 3px solid var(--blue);">
  <h4 style="color: var(--blue);">Fase 1: Clase Base</h4>
  <ul style="padding-left: 1.25rem;">
    <li>Crea la clase abstracta <strong>Persona</strong>.</li>
    <li>Atributos <code>private</code>: nombre (String), edad (int).</li>
    <li>Constructor con parámetros y Getters y setters con validación (edad > 0).</li>
    <li>Método abstracto: <code>String getInfo()</code></li>
  </ul>
</div>

<div class="code-exercise-desc" style="margin-bottom: 1rem; border-left: 3px solid var(--accent);">
  <h4 style="color: var(--accent);">Fase 2: Herencia y Polimorfismo</h4>
  <ul style="padding-left: 1.25rem;">
    <li>Clase <strong>Empleado</strong> que extiende Persona. Añade: salario (double), departamento (String). Implementa <code>getInfo()</code> y <code>calcularBonus()</code> (devuelve el 10%).</li>
    <li>Clase <strong>Directivo</strong> que extiende Empleado. Añade numEmpleadosACargo (int). Sobreescribe <code>calcularBonus()</code> para devolver el 20% y <code>getInfo()</code>.</li>
  </ul>
</div>

<div class="code-exercise-desc" style="margin-bottom: 1rem; border-left: 3px solid var(--green);">
  <h4 style="color: var(--green);">Fase 3: Interfaces y el Main</h4>
  <ul style="padding-left: 1.25rem;">
    <li>Crea la interfaz <strong>Gestionable</strong> con <code>void gestionar()</code>. Haz que Directivo la implemente.</li>
    <li>En el <strong>main</strong>: Crea un <code>ArrayList&lt;Persona&gt;</code> con mezcla de empleados y directivos. Recorre la lista con un for-each e imprime su info (polimorfismo).</li>
    <li>Captura una excepción si alguien intenta crear un empleado con salario negativo.</li>
  </ul>
</div>`,

    pistas: [
      '💡 <strong>Encapsulación</strong>: todos los atributos deben ser <code>private</code>. Usa <code>this.nombre = nombre</code> en el constructor.',
      '💡 <strong>Herencia</strong>: usa <code>extends</code> para heredar. En el constructor hijo, llama a <code>super(nombre, edad)</code> como primera línea.',
      '💡 <strong>Clase abstracta</strong>: <code>abstract class Persona</code> — no se puede instanciar directamente. El método abstracto no tiene cuerpo: <code>public abstract String getInfo();</code>',
      '💡 <strong>@Override</strong>: cuando sobreescribes un método, añade <code>@Override</code> encima para que el compilador lo verifique.',
      '💡 <strong>Interfaz</strong>: <code>interface Gestionable { void gestionar(); }</code> — luego <code>class Directivo extends Empleado implements Gestionable</code>',
      '💡 <strong>Polimorfismo</strong>: <code>ArrayList&lt;Persona&gt; lista = new ArrayList&lt;&gt;();</code> — puedes añadir Empleado y Directivo porque ambos son Persona.',
      '💡 <strong>Excepción</strong>: en el setter de salario: <code>if (salario < 0) throw new IllegalArgumentException("Salario no puede ser negativo");</code>',
    ],

    solucion: `<span class="kw">abstract class</span> <span class="fn">Persona</span> {
    <span class="kw">private</span> <span class="tp">String</span> nombre;
    <span class="kw">private</span> <span class="tp">int</span> edad;

    <span class="kw">public</span> <span class="fn">Persona</span>(<span class="tp">String</span> nombre, <span class="tp">int</span> edad) {
        <span class="kw">this</span>.nombre = nombre;
        setEdad(edad);
    }
    <span class="kw">public</span> <span class="tp">String</span> <span class="fn">getNombre</span>() { <span class="kw">return</span> nombre; }
    <span class="kw">public void</span> <span class="fn">setEdad</span>(<span class="tp">int</span> edad) {
        <span class="kw">if</span> (edad <= <span class="num">0</span>) <span class="kw">throw new</span> <span class="fn">IllegalArgumentException</span>(<span class="str">"Edad inválida"</span>);
        <span class="kw">this</span>.edad = edad;
    }
    <span class="kw">public abstract</span> <span class="tp">String</span> <span class="fn">getInfo</span>();
}

<span class="kw">class</span> <span class="fn">Empleado</span> <span class="kw">extends</span> <span class="fn">Persona</span> {
    <span class="kw">private double</span> salario;
    <span class="kw">private</span> <span class="tp">String</span> departamento;

    <span class="kw">public</span> <span class="fn">Empleado</span>(<span class="tp">String</span> nombre, <span class="tp">int</span> edad, <span class="tp">double</span> salario, <span class="tp">String</span> dept) {
        <span class="kw">super</span>(nombre, edad);
        <span class="kw">if</span> (salario < <span class="num">0</span>) <span class="kw">throw new</span> <span class="fn">IllegalArgumentException</span>(<span class="str">"Salario negativo"</span>);
        <span class="kw">this</span>.salario = salario;
        <span class="kw">this</span>.departamento = dept;
    }
    <span class="kw">public double</span> <span class="fn">calcularBonus</span>() { <span class="kw">return</span> salario * <span class="num">0.10</span>; }

    <span class="kw">@Override</span>
    <span class="kw">public</span> <span class="tp">String</span> <span class="fn">getInfo</span>() {
        <span class="kw">return</span> <span class="str">"Empleado: "</span> + <span class="fn">getNombre</span>() + <span class="str">" | Dept: "</span> + departamento + <span class="str">" | Salario: "</span> + salario;
    }
}

<span class="kw">interface</span> <span class="fn">Gestionable</span> { <span class="kw">void</span> <span class="fn">gestionar</span>(); }

<span class="kw">class</span> <span class="fn">Directivo</span> <span class="kw">extends</span> <span class="fn">Empleado</span> <span class="kw">implements</span> <span class="fn">Gestionable</span> {
    <span class="kw">private int</span> numEmpleadosACargo;

    <span class="kw">public</span> <span class="fn">Directivo</span>(<span class="tp">String</span> nombre, <span class="tp">int</span> edad, <span class="tp">double</span> salario, <span class="tp">String</span> dept, <span class="tp">int</span> num) {
        <span class="kw">super</span>(nombre, edad, salario, dept);
        <span class="kw">this</span>.numEmpleadosACargo = num;
    }
    <span class="kw">@Override public double</span> <span class="fn">calcularBonus</span>() { <span class="kw">return</span> salario * <span class="num">0.20</span>; }
    <span class="kw">@Override public</span> <span class="tp">String</span> <span class="fn">getInfo</span>() { <span class="kw">return super</span>.<span class="fn">getInfo</span>() + <span class="str">" | A cargo: "</span> + numEmpleadosACargo; }
    <span class="kw">@Override public void</span> <span class="fn">gestionar</span>() { System.out.<span class="fn">println</span>(<span class="fn">getNombre</span>() + <span class="str">" gestiona el equipo"</span>); }
}`,

    criterios: [
      'Clase abstracta Persona con atributos privados y método abstracto',
      'Empleado hereda de Persona con constructor que llama a super()',
      'Directivo hereda de Empleado y sobreescribe calcularBonus()',
      'Interfaz Gestionable implementada por Directivo',
      'ArrayList<Persona> con polimorfismo en el recorrido',
      'Excepción lanzada para salario negativo',
    ]
  },

  {
    id: 'ej2',
    titulo: 'Sistema de Vehículos con Estructuras Dinámicas',
    nivel: '⭐⭐⭐',
    temas: ['Herencia', 'Interfaces', 'Colecciones', 'Excepciones'],
    tiempo: '30 min',
    enunciado: `<p style="margin-bottom: 1rem;">Diseña un sistema de gestión de una flota de vehículos. Este ejercicio mezcla Herencia Abstracta con Interfaces y HashMap.</p>
    
<div class="code-exercise-desc" style="margin-bottom: 1rem; border-left: 3px solid var(--blue);">
  <h4 style="color: var(--blue);">Fase 1: Interfaces y Clases Base</h4>
  <ul style="padding-left: 1.25rem;">
    <li>Crea la excepción <strong>MatriculaDuplicadaException</strong>.</li>
    <li>Crea la interfaz <strong>Conducible</strong> con: <code>void arrancar()</code>, <code>void parar()</code> y <code>String getEstado()</code>.</li>
    <li>Clase abstracta <strong>Vehiculo</strong> (implementa Conducible) con: matricula, marca, velocidadMax. Añade el método abstracto <code>String getTipo()</code>.</li>
  </ul>
</div>

<div class="code-exercise-desc" style="margin-bottom: 1rem; border-left: 3px solid var(--accent);">
  <h4 style="color: var(--accent);">Fase 2: Clases Concretas</h4>
  <ul style="padding-left: 1.25rem;">
    <li>Clase <strong>Coche</strong> (extiende Vehiculo). Añade <code>numPuertas</code>. Implementa todos los métodos obligatorios. Su tipo es "Coche".</li>
    <li>Clase <strong>Moto</strong> (extiende Vehiculo). Añade <code>tieneSidecar</code>. Implementa todos los métodos obligatorios. Su tipo es "Moto".</li>
  </ul>
</div>

<div class="code-exercise-desc" style="margin-bottom: 1rem; border-left: 3px solid var(--yellow);">
  <h4 style="color: var(--yellow);">Fase 3: Uso de Collections (HashMap)</h4>
  <ul style="padding-left: 1.25rem;">
    <li>Clase <strong>GestorFlota</strong> con un <code>HashMap&lt;String, Vehiculo&gt;</code> (la clave es la matrícula).</li>
    <li>Método <code>añadir(Vehiculo v)</code>: Añade al mapa. Lanza <code>MatriculaDuplicadaException</code> si la matrícula ya existe.</li>
    <li>Método <code>buscar(String matricula)</code>: Devuelve el vehículo o lanza excepción genérica.</li>
    <li>Método <code>listarTodos()</code>: Itera el HashMap e imprime info de cada vehículo.</li>
  </ul>
</div>`,

    pistas: [
      '💡 <strong>Interfaz + clase abstracta</strong>: <code>abstract class Vehiculo implements Conducible</code> — la clase abstracta puede implementar la interfaz parcialmente o dejar métodos sin implementar.',
      '💡 <strong>HashMap</strong>: <code>HashMap&lt;String, Vehiculo&gt; flota = new HashMap&lt;&gt;();</code> — usa <code>flota.containsKey(matricula)</code> para verificar si ya existe.',
      '💡 <strong>Excepción personalizada</strong>: <code>class MatriculaDuplicadaException extends Exception { public MatriculaDuplicadaException(String msg) { super(msg); } }</code>',
      '💡 <strong>throws en el método</strong>: <code>public void añadir(Vehiculo v) throws MatriculaDuplicadaException</code>',
      '💡 <strong>Recorrer HashMap</strong>: <code>for (Map.Entry&lt;String, Vehiculo&gt; entry : flota.entrySet()) { entry.getKey(); entry.getValue(); }</code>',
      '💡 <strong>Estado del vehículo</strong>: usa un atributo booleano <code>private boolean encendido = false;</code> que cambias en arrancar() y parar().',
    ],

    solucion: `<span class="kw">class</span> <span class="fn">MatriculaDuplicadaException</span> <span class="kw">extends</span> <span class="fn">Exception</span> {
    <span class="kw">public</span> <span class="fn">MatriculaDuplicadaException</span>(<span class="tp">String</span> msg) { <span class="kw">super</span>(msg); }
}

<span class="kw">interface</span> <span class="fn">Conducible</span> {
    <span class="kw">void</span> <span class="fn">arrancar</span>();
    <span class="kw">void</span> <span class="fn">parar</span>();
    <span class="tp">String</span> <span class="fn">getEstado</span>();
}

<span class="kw">abstract class</span> <span class="fn">Vehiculo</span> <span class="kw">implements</span> <span class="fn">Conducible</span> {
    <span class="kw">private</span> <span class="tp">String</span> matricula, marca;
    <span class="kw">private int</span> velocidadMax;
    <span class="kw">protected boolean</span> encendido = <span class="kw">false</span>;

    <span class="kw">public</span> <span class="fn">Vehiculo</span>(<span class="tp">String</span> matricula, <span class="tp">String</span> marca, <span class="tp">int</span> velMax) {
        <span class="kw">this</span>.matricula = matricula; <span class="kw">this</span>.marca = marca; <span class="kw">this</span>.velocidadMax = velMax;
    }
    <span class="kw">public</span> <span class="tp">String</span> <span class="fn">getMatricula</span>() { <span class="kw">return</span> matricula; }
    <span class="kw">public abstract</span> <span class="tp">String</span> <span class="fn">getTipo</span>();
    <span class="kw">@Override public void</span> <span class="fn">arrancar</span>() { encendido = <span class="kw">true</span>; }
    <span class="kw">@Override public void</span> <span class="fn">parar</span>() { encendido = <span class="kw">false</span>; }
    <span class="kw">@Override public</span> <span class="tp">String</span> <span class="fn">getEstado</span>() { <span class="kw">return</span> encendido ? <span class="str">"Encendido"</span> : <span class="str">"Apagado"</span>; }
}

<span class="kw">class</span> <span class="fn">GestorFlota</span> {
    <span class="kw">private</span> HashMap&lt;<span class="tp">String</span>, <span class="fn">Vehiculo</span>&gt; flota = <span class="kw">new</span> HashMap&lt;&gt;();

    <span class="kw">public void</span> <span class="fn">añadir</span>(<span class="fn">Vehiculo</span> v) <span class="kw">throws</span> <span class="fn">MatriculaDuplicadaException</span> {
        <span class="kw">if</span> (flota.<span class="fn">containsKey</span>(v.<span class="fn">getMatricula</span>()))
            <span class="kw">throw new</span> <span class="fn">MatriculaDuplicadaException</span>(<span class="str">"Matrícula ya existe: "</span> + v.<span class="fn">getMatricula</span>());
        flota.<span class="fn">put</span>(v.<span class="fn">getMatricula</span>(), v);
    }
    <span class="kw">public void</span> <span class="fn">listarTodos</span>() {
        <span class="kw">for</span> (Map.Entry&lt;<span class="tp">String</span>, <span class="fn">Vehiculo</span>&gt; e : flota.<span class="fn">entrySet</span>())
            System.out.<span class="fn">println</span>(e.<span class="fn">getValue</span>().<span class="fn">getTipo</span>() + <span class="str">": "</span> + e.<span class="fn">getKey</span>() + <span class="str">" | "</span> + e.<span class="fn">getValue</span>().<span class="fn">getEstado</span>());
    }
}`,

    criterios: [
      'Excepción personalizada MatriculaDuplicadaException',
      'Interfaz Conducible con los 3 métodos',
      'Clase abstracta Vehiculo implementa Conducible',
      'Coche y Moto heredan de Vehiculo',
      'GestorFlota usa HashMap<String, Vehiculo>',
      'Método añadir() lanza excepción si matrícula duplicada',
    ]
  },

  {
    id: 'ej3',
    titulo: 'Biblioteca con Estructuras Dinámicas',
    nivel: '⭐⭐',
    temas: ['Encapsulación', 'ArrayList', 'Excepciones', 'Interfaces'],
    tiempo: '30 min',
    enunciado: `<p style="margin-bottom: 1rem;">Diseña un sistema de gestión de una biblioteca enfocado en polimorfismo y manejo de ArrayList con búsqueda lineal.</p>

<div class="code-exercise-desc" style="margin-bottom: 1rem; border-left: 3px solid var(--blue);">
  <h4 style="color: var(--blue);">Fase 1: Excepciones e Interfaces</h4>
  <ul style="padding-left: 1.25rem;">
    <li>Excepción personalizada <strong>ElementoNoEncontradoException</strong>.</li>
    <li>Interfaz <strong>Prestable</strong> con <code>prestar(String usuario)</code>, <code>devolver()</code> y <code>isDisponible()</code>.</li>
  </ul>
</div>

<div class="code-exercise-desc" style="margin-bottom: 1rem; border-left: 3px solid var(--accent);">
  <h4 style="color: var(--accent);">Fase 2: Elementos de la Biblioteca</h4>
  <ul style="padding-left: 1.25rem;">
    <li>Clase abstracta <strong>Elemento</strong> (implementa Prestable). Atributos: titulo, año, disponible (inicializado a true). Método abstracto: <code>getCategoria()</code>.</li>
    <li>Clase <strong>Libro</strong> (extiende Elemento). Añade autor, numPaginas. Su categoría es "Libro".</li>
    <li>Clase <strong>Revista</strong> (extiende Elemento). Añade numero, editorial. Su categoría es "Revista".</li>
  </ul>
</div>

<div class="code-exercise-desc" style="margin-bottom: 1rem; border-left: 3px solid var(--green);">
  <h4 style="color: var(--green);">Fase 3: Gestión con ArrayList</h4>
  <ul style="padding-left: 1.25rem;">
    <li>Clase <strong>Biblioteca</strong> con un <code>ArrayList&lt;Elemento&gt;</code>.</li>
    <li>Método <code>añadir(Elemento e)</code>.</li>
    <li>Método <code>buscarPorTitulo(String titulo)</code>: Itera la lista. Haz un <code>if</code> para ver si el título coincide. Si termina el bucle sin encontrarlo, lanza <code>ElementoNoEncontradoException</code>.</li>
    <li>Método <code>prestarElemento(titulo, usuario)</code>: Busca, si no está disponible lanza una RuntimeException. Si lo está, marca como no disponible al usuario.</li>
  </ul>
</div>`,

    pistas: [
      '💡 <strong>disponible</strong>: inicializa el atributo en la declaración: <code>private boolean disponible = true;</code>',
      '💡 <strong>prestar()</strong>: comprueba si está disponible antes de prestarlo: <code>if (!disponible) throw new RuntimeException("No disponible");</code>',
      '💡 <strong>Buscar en ArrayList</strong>: usa un bucle for-each: <code>for (Elemento e : catalogo) { if (e.getTitulo().equals(titulo)) return e; }</code>',
      '💡 <strong>listarDisponibles()</strong>: filtra con <code>if (e.isDisponible())</code> dentro del bucle.',
      '💡 <strong>Polimorfismo</strong>: el ArrayList es de tipo Elemento pero puede contener Libro y Revista. Al llamar getCategoria() se ejecuta el método del tipo real.',
    ],

    solucion: `<span class="cm">// Solo estructura principal — completa el resto</span>
<span class="kw">class</span> <span class="fn">ElementoNoEncontradoException</span> <span class="kw">extends</span> <span class="fn">Exception</span> {
    <span class="kw">public</span> <span class="fn">ElementoNoEncontradoException</span>(<span class="tp">String</span> msg) { <span class="kw">super</span>(msg); }
}

<span class="kw">abstract class</span> <span class="fn">Elemento</span> <span class="kw">implements</span> <span class="fn">Prestable</span> {
    <span class="kw">private</span> <span class="tp">String</span> titulo;
    <span class="kw">private int</span> año;
    <span class="kw">private boolean</span> disponible = <span class="kw">true</span>;
    <span class="kw">private</span> <span class="tp">String</span> usuarioPrestamo;

    <span class="kw">public</span> <span class="fn">Elemento</span>(<span class="tp">String</span> titulo, <span class="tp">int</span> año) { <span class="kw">this</span>.titulo = titulo; <span class="kw">this</span>.año = año; }
    <span class="kw">public</span> <span class="tp">String</span> <span class="fn">getTitulo</span>() { <span class="kw">return</span> titulo; }
    <span class="kw">public abstract</span> <span class="tp">String</span> <span class="fn">getCategoria</span>();

    <span class="kw">@Override public void</span> <span class="fn">prestar</span>(<span class="tp">String</span> usuario) {
        <span class="kw">if</span> (!disponible) <span class="kw">throw new</span> <span class="fn">RuntimeException</span>(<span class="str">"No disponible"</span>);
        disponible = <span class="kw">false</span>; usuarioPrestamo = usuario;
    }
    <span class="kw">@Override public void</span> <span class="fn">devolver</span>() { disponible = <span class="kw">true</span>; usuarioPrestamo = <span class="kw">null</span>; }
    <span class="kw">@Override public boolean</span> <span class="fn">isDisponible</span>() { <span class="kw">return</span> disponible; }
}

<span class="kw">class</span> <span class="fn">Biblioteca</span> {
    <span class="kw">private</span> ArrayList&lt;<span class="fn">Elemento</span>&gt; catalogo = <span class="kw">new</span> ArrayList&lt;&gt;();

    <span class="kw">public void</span> <span class="fn">añadir</span>(<span class="fn">Elemento</span> e) { catalogo.<span class="fn">add</span>(e); }

    <span class="kw">public</span> <span class="fn">Elemento</span> <span class="fn">buscarPorTitulo</span>(<span class="tp">String</span> titulo) <span class="kw">throws</span> <span class="fn">ElementoNoEncontradoException</span> {
        <span class="kw">for</span> (<span class="fn">Elemento</span> e : catalogo)
            <span class="kw">if</span> (e.<span class="fn">getTitulo</span>().<span class="fn">equals</span>(titulo)) <span class="kw">return</span> e;
        <span class="kw">throw new</span> <span class="fn">ElementoNoEncontradoException</span>(<span class="str">"No encontrado: "</span> + titulo);
    }
}`,

    criterios: [
      'Excepción personalizada ElementoNoEncontradoException',
      'Interfaz Prestable con 3 métodos',
      'Clase abstracta Elemento implementa Prestable',
      'Libro y Revista heredan de Elemento',
      'Biblioteca usa ArrayList<Elemento>',
      'buscarPorTitulo() lanza excepción si no existe',
    ]
  }
];
