// =============================================
// EJERCICIOS PRÁCTICOS — Programación DAW
// Examen final: 2 ejercicios, en papel, sin IDE
// Temas: encapsulación, herencia, polimorfismo,
//        abstracción, interfaces, excepciones,
//        y estructuras dinámicas (arrays de objetos)
// =============================================

const EJERCICIOS = [
  {
    id: 'ej1',
    titulo: 'Ejercicio 1 — Sistema de Vehículos',
    nivel: '⭐⭐',
    temas: ['Abstract', 'Herencia', 'Interfaces', 'Encapsulación', 'Polimorfismo', 'Excepciones'],
    tiempo: '30 min',
    enunciado: `<p style="margin-bottom:1rem;">Diseña un sistema para gestionar una flota de vehículos. El examen pide que escribas en papel las clases Java con la lógica correcta.</p>

<div class="code-exercise-desc" style="margin-bottom:1rem;border-left:3px solid var(--blue)">
  <h4 style="color:var(--blue)">Parte 1 — Interfaz y clase abstracta</h4>
  <ul style="padding-left:1.25rem">
    <li>Crea la interfaz <strong>Conducible</strong> con el método <code>void arrancar()</code>.</li>
    <li>Crea la clase <strong>abstracta</strong> <code>Vehiculo</code> que <strong>implemente</strong> <code>Conducible</code>.<br>
        Atributos <code>protected</code>: <code>marca (String)</code>, <code>modelo (String)</code>, <code>velocidadMax (int)</code>.<br>
        Constructor que reciba los tres atributos.<br>
        Constructor sin parámetros (valores "Genérica", "Genérico", 0) usando <code>this()</code>.<br>
        Método abstracto: <code>String getTipo()</code>.<br>
        Método <code>mostrarInfo()</code> que imprima marca, modelo, velocidadMax y tipo.
    </li>
  </ul>
</div>

<div class="code-exercise-desc" style="margin-bottom:1rem;border-left:3px solid var(--accent)">
  <h4 style="color:var(--accent)">Parte 2 — Subclases con herencia</h4>
  <ul style="padding-left:1.25rem">
    <li>Clase <strong>Coche</strong> que extienda <code>Vehiculo</code>.<br>
        Añade atributo <code>private int numPuertas</code>.<br>
        Constructor con <code>marca, modelo, velocidadMax, numPuertas</code> usando <code>super()</code>.<br>
        Constructor sin parámetros: hereda de <code>Vehiculo()</code> y pone puertas = 4.<br>
        <code>@Override getTipo()</code> → devuelve <code>"Coche"</code>.<br>
        <code>@Override mostrarInfo()</code> → llama <code>super.mostrarInfo()</code> y añade numPuertas.<br>
        <code>@Override arrancar()</code> → imprime <code>"El coche [marca] arranca"</code>.
    </li>
    <li>Clase <strong>Moto</strong> que extienda <code>Vehiculo</code>.<br>
        Añade atributo <code>private int cilindrada</code>.<br>
        Constructor con <code>marca, modelo, velocidadMax, cilindrada</code> usando <code>super()</code>.<br>
        Constructor sin parámetros: hereda de <code>Vehiculo()</code> y pone cilindrada = 125.<br>
        <code>@Override getTipo()</code> → devuelve <code>"Moto"</code>.<br>
        <code>@Override mostrarInfo()</code> → llama <code>super.mostrarInfo()</code> y añade cilindrada.<br>
        <code>@Override arrancar()</code> → imprime <code>"La moto [marca] arranca"</code>.
    </li>
  </ul>
</div>

<div class="code-exercise-desc" style="margin-bottom:1rem;border-left:3px solid var(--green)">
  <h4 style="color:var(--green)">Parte 3 — Array de objetos y excepciones en el main</h4>
  <ul style="padding-left:1.25rem">
    <li>En el <code>main()</code>: crea un array de 4 <code>Vehiculo</code> con instancias de Coche y Moto.</li>
    <li>Recorre el array con un <code>for</code> y llama a <code>arrancar()</code> y <code>mostrarInfo()</code> de cada uno (polimorfismo).</li>
    <li>Añade un bloque <code>try-catch</code>: si <code>velocidadMax</code> fuera negativo, lanza una <code>IllegalArgumentException</code> con un mensaje descriptivo.</li>
  </ul>
</div>`,

    pistas: [
      '💡 <strong>Interface</strong>: <code>interface Conducible { void arrancar(); }</code>',
      '💡 <strong>Abstract class</strong>: <code>abstract class Vehiculo implements Conducible { ... }</code><br>No se puede instanciar directamente. El método abstracto no tiene cuerpo.',
      '💡 <strong>Constructor sin parámetros con this()</strong>: <code>public Vehiculo() { this("Genérica", "Genérico", 0); }</code>',
      '💡 <strong>Herencia + super()</strong>: <code>public Coche(String marca, String modelo, int vel, int puertas) { super(marca, modelo, vel); this.numPuertas = puertas; }</code>',
      '💡 <strong>@Override</strong>: Úsalo sobre cada método sobreescrito. Si falta, el profesor lo penaliza.',
      '💡 <strong>Array de objetos polimórfico</strong>: <code>Vehiculo[] flota = new Vehiculo[4];</code> — puede contener Coche y Moto porque ambos son Vehiculo.',
      '💡 <strong>Excepción</strong>: <code>if (velocidadMax < 0) throw new IllegalArgumentException("La velocidad no puede ser negativa");</code> dentro de <code>try { ... } catch (IllegalArgumentException e) { System.out.println(e.getMessage()); }</code>',
    ],

    solucion: `<span class="kw">interface</span> <span class="fn">Conducible</span> {
    <span class="kw">void</span> <span class="fn">arrancar</span>();
}

<span class="kw">abstract class</span> <span class="fn">Vehiculo</span> <span class="kw">implements</span> <span class="fn">Conducible</span> {
    <span class="kw">protected</span> <span class="tp">String</span> marca;
    <span class="kw">protected</span> <span class="tp">String</span> modelo;
    <span class="kw">protected int</span> velocidadMax;

    <span class="kw">public</span> <span class="fn">Vehiculo</span>(<span class="tp">String</span> marca, <span class="tp">String</span> modelo, <span class="kw">int</span> velocidadMax) {
        <span class="kw">this</span>.marca = marca;
        <span class="kw">this</span>.modelo = modelo;
        <span class="kw">this</span>.velocidadMax = velocidadMax;
    }
    <span class="cm">// Constructor sin parámetros usando this()</span>
    <span class="kw">public</span> <span class="fn">Vehiculo</span>() {
        <span class="kw">this</span>(<span class="str">"Genérica"</span>, <span class="str">"Genérico"</span>, <span class="num">0</span>);
    }
    <span class="kw">public abstract</span> <span class="tp">String</span> <span class="fn">getTipo</span>();
    <span class="kw">public void</span> <span class="fn">mostrarInfo</span>() {
        System.out.<span class="fn">println</span>(<span class="str">"Tipo: "</span> + <span class="fn">getTipo</span>() + <span class="str">" | Marca: "</span> + marca + <span class="str">" | Modelo: "</span> + modelo + <span class="str">" | Vel. Máx: "</span> + velocidadMax);
    }
}

<span class="kw">class</span> <span class="fn">Coche</span> <span class="kw">extends</span> <span class="fn">Vehiculo</span> {
    <span class="kw">private int</span> numPuertas;

    <span class="kw">public</span> <span class="fn">Coche</span>(<span class="tp">String</span> marca, <span class="tp">String</span> modelo, <span class="kw">int</span> vel, <span class="kw">int</span> puertas) {
        <span class="kw">super</span>(marca, modelo, vel);
        <span class="kw">this</span>.numPuertas = puertas;
    }
    <span class="kw">public</span> <span class="fn">Coche</span>() { <span class="kw">this</span>(<span class="str">"Desconocida"</span>, <span class="str">"Genérico"</span>, <span class="num">0</span>, <span class="num">4</span>); }

    <span class="kw">@Override public</span> <span class="tp">String</span> <span class="fn">getTipo</span>() { <span class="kw">return</span> <span class="str">"Coche"</span>; }
    <span class="kw">@Override public void</span> <span class="fn">mostrarInfo</span>() {
        <span class="kw">super</span>.<span class="fn">mostrarInfo</span>();
        System.out.<span class="fn">println</span>(<span class="str">"  Puertas: "</span> + numPuertas);
    }
    <span class="kw">@Override public void</span> <span class="fn">arrancar</span>() {
        System.out.<span class="fn">println</span>(<span class="str">"El coche "</span> + marca + <span class="str">" arranca"</span>);
    }
}

<span class="kw">class</span> <span class="fn">Moto</span> <span class="kw">extends</span> <span class="fn">Vehiculo</span> {
    <span class="kw">private int</span> cilindrada;

    <span class="kw">public</span> <span class="fn">Moto</span>(<span class="tp">String</span> marca, <span class="tp">String</span> modelo, <span class="kw">int</span> vel, <span class="kw">int</span> cc) {
        <span class="kw">super</span>(marca, modelo, vel);
        <span class="kw">this</span>.cilindrada = cc;
    }
    <span class="kw">public</span> <span class="fn">Moto</span>() { <span class="kw">this</span>(<span class="str">"Desconocida"</span>, <span class="str">"Genérica"</span>, <span class="num">0</span>, <span class="num">125</span>); }

    <span class="kw">@Override public</span> <span class="tp">String</span> <span class="fn">getTipo</span>() { <span class="kw">return</span> <span class="str">"Moto"</span>; }
    <span class="kw">@Override public void</span> <span class="fn">mostrarInfo</span>() {
        <span class="kw">super</span>.<span class="fn">mostrarInfo</span>();
        System.out.<span class="fn">println</span>(<span class="str">"  Cilindrada: "</span> + cilindrada + <span class="str">"cc"</span>);
    }
    <span class="kw">@Override public void</span> <span class="fn">arrancar</span>() {
        System.out.<span class="fn">println</span>(<span class="str">"La moto "</span> + marca + <span class="str">" arranca"</span>);
    }
}

<span class="kw">public class</span> <span class="fn">Main</span> {
    <span class="kw">public static void</span> <span class="fn">main</span>(<span class="tp">String</span>[] args) {
        <span class="fn">Vehiculo</span>[] flota = <span class="kw">new</span> <span class="fn">Vehiculo</span>[<span class="num">4</span>];
        flota[<span class="num">0</span>] = <span class="kw">new</span> <span class="fn">Coche</span>(<span class="str">"Toyota"</span>, <span class="str">"Corolla"</span>, <span class="num">180</span>, <span class="num">4</span>);
        flota[<span class="num">1</span>] = <span class="kw">new</span> <span class="fn">Moto</span>(<span class="str">"Honda"</span>, <span class="str">"CB500"</span>, <span class="num">200</span>, <span class="num">500</span>);
        flota[<span class="num">2</span>] = <span class="kw">new</span> <span class="fn">Coche</span>(<span class="str">"Ford"</span>, <span class="str">"Focus"</span>, <span class="num">190</span>, <span class="num">5</span>);
        flota[<span class="num">3</span>] = <span class="kw">new</span> <span class="fn">Moto</span>(<span class="str">"Kawasaki"</span>, <span class="str">"Ninja"</span>, <span class="num">250</span>, <span class="num">650</span>);

        <span class="kw">for</span> (<span class="kw">int</span> i = <span class="num">0</span>; i &lt; flota.length; i++) {
            flota[i].<span class="fn">arrancar</span>();
            flota[i].<span class="fn">mostrarInfo</span>();
        }

        <span class="kw">try</span> {
            <span class="kw">throw new</span> <span class="fn">IllegalArgumentException</span>(<span class="str">"La velocidad máxima no puede ser negativa"</span>);
        } <span class="kw">catch</span> (<span class="fn">IllegalArgumentException</span> e) {
            System.out.<span class="fn">println</span>(<span class="str">"Error: "</span> + e.<span class="fn">getMessage</span>());
        }
    }
}`,

    criterios: [
      'Interface Conducible con void arrancar()',
      'Clase abstracta Vehiculo implements Conducible con atributos protected',
      'Constructor sin parámetros con this() en Vehiculo',
      'Método abstracto getTipo() en Vehiculo',
      'Coche extiende Vehiculo con super() en constructor y @Override',
      'Moto extiende Vehiculo con super() en constructor y @Override',
      'Array Vehiculo[] con polimorfismo (Coche y Moto)',
      'Bloque try-catch con IllegalArgumentException',
    ],

    checks: [
      (c) => /interface\s+Conducible/i.test(c),
      (c) => /abstract\s+class\s+Vehiculo/i.test(c) && /implements\s+Conducible/i.test(c),
      (c) => /this\s*\(/.test(c),
      (c) => /abstract\s+\w+\s+getTipo/i.test(c),
      (c) => /class\s+Coche\s+extends\s+Vehiculo/i.test(c) && /super\s*\(/.test(c),
      (c) => /class\s+Moto\s+extends\s+Vehiculo/i.test(c),
      (c) => /Vehiculo\s*\[\s*\]/.test(c),
      (c) => /try\s*\{/.test(c) && /catch\s*\(/.test(c),
    ]
  },

  {
    id: 'ej2',
    titulo: 'Ejercicio 2 — Sistema de Empleados',
    nivel: '⭐⭐',
    temas: ['Abstract', 'Interfaces', 'Herencia', 'Polimorfismo', 'Encapsulación', 'Excepciones', 'Array de objetos'],
    tiempo: '30 min',
    enunciado: `<p style="margin-bottom:1rem;">Diseña un sistema para gestionar distintos tipos de empleados en una empresa. El examen pide que escribas en papel las clases Java con la lógica correcta.</p>

<div class="code-exercise-desc" style="margin-bottom:1rem;border-left:3px solid var(--blue)">
  <h4 style="color:var(--blue)">Parte 1 — Interfaz y clase abstracta</h4>
  <ul style="padding-left:1.25rem">
    <li>Crea la interfaz <strong>Evaluable</strong> con el método <code>String evaluar()</code>.</li>
    <li>Crea la clase <strong>abstracta</strong> <code>Empleado</code> que <strong>implemente</strong> <code>Evaluable</code>.<br>
        Atributos <code>private</code>: <code>nombre (String)</code>, <code>salarioBase (double)</code>.<br>
        Constructor que reciba nombre y salarioBase. Si salarioBase &lt; 0, lanza <code>IllegalArgumentException</code>.<br>
        Constructor sin parámetros (nombre = "Sin nombre", salarioBase = 1000.0) usando <code>this()</code>.<br>
        Getters <code>getNombre()</code> y <code>getSalarioBase()</code>.<br>
        Método abstracto: <code>double calcularSalario()</code>.<br>
        Método <code>mostrarInfo()</code> que imprima nombre, salario base y salario calculado.
    </li>
  </ul>
</div>

<div class="code-exercise-desc" style="margin-bottom:1rem;border-left:3px solid var(--accent)">
  <h4 style="color:var(--accent)">Parte 2 — Subclases (Herencia y Polimorfismo)</h4>
  <ul style="padding-left:1.25rem">
    <li>Clase <strong>Gerente</strong> que extienda <code>Empleado</code>.<br>
        Atributo <code>private double bonificacion</code>.<br>
        Constructor con <code>nombre, salarioBase, bonificacion</code> usando <code>super()</code>.<br>
        <code>@Override calcularSalario()</code> → devuelve <code>getSalarioBase() + bonificacion</code>.<br>
        <code>@Override evaluar()</code> → devuelve <code>"Gerente [nombre]: Rendimiento alto"</code>.
    </li>
    <li>Clase <strong>Desarrollador</strong> que extienda <code>Empleado</code>.<br>
        Atributo <code>private int numProyectos</code>.<br>
        Constructor con <code>nombre, salarioBase, numProyectos</code> usando <code>super()</code>.<br>
        <code>@Override calcularSalario()</code> → devuelve <code>getSalarioBase() + (numProyectos * 200)</code>.<br>
        <strong>Sobrecarga</strong>: añade <code>double calcularSalario(int horasExtra)</code> → devuelve <code>calcularSalario() + (horasExtra * 15)</code>.<br>
        <code>@Override evaluar()</code> → devuelve <code>"Desarrollador [nombre]: "</code> + proyectos + <code>" proyectos"</code>.
    </li>
    <li>Clase <strong>Asistente</strong> que extienda <code>Empleado</code>.<br>
        Constructor con <code>nombre, salarioBase</code> usando <code>super()</code>.<br>
        <code>@Override calcularSalario()</code> → devuelve <code>getSalarioBase()</code> (sin extras).<br>
        <code>@Override evaluar()</code> → devuelve <code>"Asistente [nombre]: Soporte al equipo"</code>.
    </li>
  </ul>
</div>

<div class="code-exercise-desc" style="margin-bottom:1rem;border-left:3px solid var(--green)">
  <h4 style="color:var(--green)">Parte 3 — Array de objetos y polimorfismo en el main</h4>
  <ul style="padding-left:1.25rem">
    <li>En el <code>main()</code>: usa <code>try-catch</code> para crear los objetos y capturar posibles <code>IllegalArgumentException</code>.</li>
    <li>Crea un array de 4 <code>Empleado</code> con mezcla de Gerente, Desarrollador y Asistente.</li>
    <li>Recorre el array con un <code>for</code> y llama a <code>mostrarInfo()</code> de cada uno (polimorfismo).</li>
    <li>Para el Desarrollador, llama también a la versión sobrecargada <code>calcularSalario(10)</code> e imprime el resultado.</li>
  </ul>
</div>`,

    pistas: [
      '💡 <strong>Interface</strong>: <code>interface Evaluable { String evaluar(); }</code>',
      '💡 <strong>Abstract class</strong>: <code>abstract class Empleado implements Evaluable { private String nombre; ... }</code> — los atributos son <code>private</code>, acceso vía getters.',
      '💡 <strong>Excepción en constructor</strong>: <code>if (salarioBase < 0) throw new IllegalArgumentException("Salario no puede ser negativo");</code>',
      '💡 <strong>Constructor sin parámetros con this()</strong>: <code>public Empleado() { this("Sin nombre", 1000.0); }</code>',
      '💡 <strong>Herencia con super()</strong>: <code>public Gerente(String nombre, double salario, double bono) { super(nombre, salario); this.bonificacion = bono; }</code>',
      '💡 <strong>Sobrecarga</strong>: mismo nombre de método, distintos parámetros. <code>public double calcularSalario(int horasExtra) { return calcularSalario() + (horasExtra * 15); }</code>',
      '💡 <strong>Array polimórfico</strong>: <code>Empleado[] plantilla = new Empleado[4];</code> — puede contener Gerente, Desarrollador y Asistente.',
    ],

    solucion: `<span class="kw">interface</span> <span class="fn">Evaluable</span> {
    <span class="tp">String</span> <span class="fn">evaluar</span>();
}

<span class="kw">abstract class</span> <span class="fn">Empleado</span> <span class="kw">implements</span> <span class="fn">Evaluable</span> {
    <span class="kw">private</span> <span class="tp">String</span> nombre;
    <span class="kw">private double</span> salarioBase;

    <span class="kw">public</span> <span class="fn">Empleado</span>(<span class="tp">String</span> nombre, <span class="kw">double</span> salarioBase) {
        <span class="kw">if</span> (salarioBase &lt; <span class="num">0</span>) <span class="kw">throw new</span> <span class="fn">IllegalArgumentException</span>(<span class="str">"Salario no puede ser negativo"</span>);
        <span class="kw">this</span>.nombre = nombre;
        <span class="kw">this</span>.salarioBase = salarioBase;
    }
    <span class="cm">// Constructor sin parámetros con this()</span>
    <span class="kw">public</span> <span class="fn">Empleado</span>() { <span class="kw">this</span>(<span class="str">"Sin nombre"</span>, <span class="num">1000.0</span>); }

    <span class="kw">public</span> <span class="tp">String</span> <span class="fn">getNombre</span>() { <span class="kw">return</span> nombre; }
    <span class="kw">public double</span> <span class="fn">getSalarioBase</span>() { <span class="kw">return</span> salarioBase; }

    <span class="kw">public abstract double</span> <span class="fn">calcularSalario</span>();

    <span class="kw">public void</span> <span class="fn">mostrarInfo</span>() {
        System.out.<span class="fn">println</span>(<span class="str">"Empleado: "</span> + nombre + <span class="str">" | Base: "</span> + salarioBase + <span class="str">" | Total: "</span> + <span class="fn">calcularSalario</span>());
        System.out.<span class="fn">println</span>(<span class="fn">evaluar</span>());
    }
}

<span class="kw">class</span> <span class="fn">Gerente</span> <span class="kw">extends</span> <span class="fn">Empleado</span> {
    <span class="kw">private double</span> bonificacion;

    <span class="kw">public</span> <span class="fn">Gerente</span>(<span class="tp">String</span> nombre, <span class="kw">double</span> salario, <span class="kw">double</span> bono) {
        <span class="kw">super</span>(nombre, salario);
        <span class="kw">this</span>.bonificacion = bono;
    }
    <span class="kw">@Override public double</span> <span class="fn">calcularSalario</span>() { <span class="kw">return</span> <span class="fn">getSalarioBase</span>() + bonificacion; }
    <span class="kw">@Override public</span> <span class="tp">String</span> <span class="fn">evaluar</span>() { <span class="kw">return</span> <span class="str">"Gerente "</span> + <span class="fn">getNombre</span>() + <span class="str">": Rendimiento alto"</span>; }
}

<span class="kw">class</span> <span class="fn">Desarrollador</span> <span class="kw">extends</span> <span class="fn">Empleado</span> {
    <span class="kw">private int</span> numProyectos;

    <span class="kw">public</span> <span class="fn">Desarrollador</span>(<span class="tp">String</span> nombre, <span class="kw">double</span> salario, <span class="kw">int</span> proyectos) {
        <span class="kw">super</span>(nombre, salario);
        <span class="kw">this</span>.numProyectos = proyectos;
    }
    <span class="kw">@Override public double</span> <span class="fn">calcularSalario</span>() { <span class="kw">return</span> <span class="fn">getSalarioBase</span>() + (numProyectos * <span class="num">200</span>); }
    <span class="cm">// Sobrecarga del método</span>
    <span class="kw">public double</span> <span class="fn">calcularSalario</span>(<span class="kw">int</span> horasExtra) { <span class="kw">return</span> <span class="fn">calcularSalario</span>() + (horasExtra * <span class="num">15</span>); }
    <span class="kw">@Override public</span> <span class="tp">String</span> <span class="fn">evaluar</span>() { <span class="kw">return</span> <span class="str">"Desarrollador "</span> + <span class="fn">getNombre</span>() + <span class="str">": "</span> + numProyectos + <span class="str">" proyectos"</span>; }
}

<span class="kw">class</span> <span class="fn">Asistente</span> <span class="kw">extends</span> <span class="fn">Empleado</span> {
    <span class="kw">public</span> <span class="fn">Asistente</span>(<span class="tp">String</span> nombre, <span class="kw">double</span> salario) { <span class="kw">super</span>(nombre, salario); }
    <span class="kw">@Override public double</span> <span class="fn">calcularSalario</span>() { <span class="kw">return</span> <span class="fn">getSalarioBase</span>(); }
    <span class="kw">@Override public</span> <span class="tp">String</span> <span class="fn">evaluar</span>() { <span class="kw">return</span> <span class="str">"Asistente "</span> + <span class="fn">getNombre</span>() + <span class="str">": Soporte al equipo"</span>; }
}

<span class="kw">public class</span> <span class="fn">Main</span> {
    <span class="kw">public static void</span> <span class="fn">main</span>(<span class="tp">String</span>[] args) {
        <span class="fn">Empleado</span>[] plantilla = <span class="kw">new</span> <span class="fn">Empleado</span>[<span class="num">4</span>];
        <span class="kw">try</span> {
            plantilla[<span class="num">0</span>] = <span class="kw">new</span> <span class="fn">Gerente</span>(<span class="str">"Ana"</span>, <span class="num">3000</span>, <span class="num">1500</span>);
            plantilla[<span class="num">1</span>] = <span class="kw">new</span> <span class="fn">Desarrollador</span>(<span class="str">"Luis"</span>, <span class="num">2500</span>, <span class="num">3</span>);
            plantilla[<span class="num">2</span>] = <span class="kw">new</span> <span class="fn">Asistente</span>(<span class="str">"María"</span>, <span class="num">1800</span>);
            plantilla[<span class="num">3</span>] = <span class="kw">new</span> <span class="fn">Gerente</span>(<span class="str">"Pedro"</span>, <span class="num">3500</span>, <span class="num">2000</span>);
        } <span class="kw">catch</span> (<span class="fn">IllegalArgumentException</span> e) {
            System.out.<span class="fn">println</span>(<span class="str">"Error al crear empleado: "</span> + e.<span class="fn">getMessage</span>());
        }

        <span class="kw">for</span> (<span class="kw">int</span> i = <span class="num">0</span>; i &lt; plantilla.length; i++) {
            plantilla[i].<span class="fn">mostrarInfo</span>();
        }

        <span class="cm">// Sobrecarga: calcularSalario con horas extra</span>
        <span class="fn">Desarrollador</span> dev = (<span class="fn">Desarrollador</span>) plantilla[<span class="num">1</span>];
        System.out.<span class="fn">println</span>(<span class="str">"Salario con 10h extra: "</span> + dev.<span class="fn">calcularSalario</span>(<span class="num">10</span>));
    }
}`,

    criterios: [
      'Interface Evaluable con String evaluar()',
      'Clase abstracta Empleado implements Evaluable con atributos private',
      'Método abstracto calcularSalario() en Empleado',
      'Excepción IllegalArgumentException en el constructor si salario < 0',
      'Constructor sin parámetros con this() en Empleado',
      'Gerente extiende Empleado con super() y @Override calcularSalario()',
      'Desarrollador con sobrecarga de calcularSalario(int horasExtra)',
      'Asistente extiende Empleado y devuelve getSalarioBase() sin extras',
      'Array Empleado[] con polimorfismo (Gerente, Desarrollador, Asistente)',
      'try-catch capturando IllegalArgumentException',
    ],

    checks: [
      (c) => /interface\s+Evaluable/i.test(c),
      (c) => /abstract\s+class\s+Empleado/i.test(c) && /implements\s+Evaluable/i.test(c),
      (c) => /abstract\s+\w+\s+calcularSalario/i.test(c),
      (c) => /throw\s+new\s+IllegalArgumentException/i.test(c),
      (c) => /this\s*\(/.test(c),
      (c) => /class\s+Gerente\s+extends\s+Empleado/i.test(c) && /super\s*\(/.test(c),
      (c) => /calcularSalario\s*\(\s*int\s+\w+\s*\)/i.test(c),
      (c) => /class\s+Asistente\s+extends\s+Empleado/i.test(c),
      (c) => /Empleado\s*\[\s*\]/.test(c),
      (c) => /try\s*\{/.test(c) && /catch\s*\(/.test(c),
    ]
  }
];
