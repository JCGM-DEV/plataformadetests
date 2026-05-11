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
    enunciado: `
<div class="exam-header" style="margin-bottom:1.5rem; text-align:center; border-bottom:2px solid var(--blue); padding-bottom:0.5rem;">
  <h3 style="color:var(--blue); margin:0;">EXAMEN PRÁCTICO DE PROGRAMACIÓN (DAW1)</h3>
  <p style="margin:0; font-size:0.9rem; opacity:0.8;">Unidad: POO, Herencia, Polimorfismo y Excepciones</p>
</div>

<p style="margin-bottom:1rem;"><strong>Contexto:</strong> Una empresa de logística requiere una aplicación para gestionar su flota de vehículos. Se solicita el diseño y codificación en Java de la siguiente jerarquía de clases, asegurando el cumplimiento de los principios de encapsulación y polimorfismo.</p>

<div class="code-exercise-desc" style="margin-bottom:1rem; padding:1rem; background:rgba(var(--blue-rgb), 0.05); border-radius:8px;">
  <h4 style="color:var(--blue); margin-top:0;">1. Estructura de Clases e Interfaces</h4>
  <p>Debes implementar los siguientes elementos técnicos:</p>
  <ul style="padding-left:1.25rem">
    <li><strong>Interfaz Conducible:</strong> Declarar un método <code>void arrancar()</code>.</li>
    <li><strong>Clase Abstracta Vehiculo:</strong> Debe implementar <code>Conducible</code>. 
      <ul>
        <li>Atributos protegidos (<code>protected</code>): <code>marca (String)</code>, <code>modelo (String)</code> y <code>velocidadMax (int)</code>.</li>
        <li>Constructor completo para inicializar todos los atributos.</li>
        <li>Constructor por defecto (sin parámetros) que asigne "Genérica", "Genérico" y 0 respectivamente, haciendo uso obligatorio de <code>this(...)</code>.</li>
        <li>Método abstracto: <code>String getTipo()</code>.</li>
        <li>Método <code>mostrarInfo()</code>: Imprimirá por consola los datos del vehículo incluyendo el tipo devuelto por el método abstracto.</li>
      </ul>
    </li>
  </ul>
</div>

<div class="code-exercise-desc" style="margin-bottom:1rem; padding:1rem; background:rgba(var(--accent-rgb), 0.05); border-radius:8px;">
  <h4 style="color:var(--accent); margin-top:0;">2. Especialización de Vehículos</h4>
  <ul style="padding-left:1.25rem">
    <li><strong>Clase Coche:</strong> Extiende de <code>Vehiculo</code>. Añade el atributo privado <code>numPuertas (int)</code>. Debe sobrescribir <code>getTipo()</code>, <code>mostrarInfo()</code> (usando <code>super</code>) y <code>arrancar()</code>.</li>
    <li><strong>Clase Moto:</strong> Extiende de <code>Vehiculo</code>. Añade el atributo privado <code>cilindrada (int)</code>. Debe sobrescribir los mismos métodos que la clase Coche adaptando la salida.</li>
  </ul>
</div>

<div class="code-block" style="margin-bottom:1rem; padding:1rem; background:rgba(var(--green-rgb), 0.05); border-radius:8px;">
  <h4 style="color:var(--green); margin-top:0;">3. Validación y Lógica de Ejecución (Main)</h4>
  <p>Aplica las siguientes reglas operativas:</p>
  <ul style="padding-left:1.25rem">
    <li><strong>Control de Excepciones:</strong> El constructor de <code>Vehiculo</code> debe validar que la <code>velocidadMax</code> no sea negativa. Si lo es, debe lanzar una <code>IllegalArgumentException</code>.</li>
    <li>Declara un <strong>ArrayList polimórfico</strong> de tipo <code>Vehiculo</code> en el <code>main</code>.</li>
    <li>Envuelve la creación y adición de vehículos (un Coche y una Moto) en un bloque <code>try-catch</code> para atrapar posibles excepciones de inicialización.</li>
    <li>Recorre la lista con un bucle <b>for-each</b> invocando <code>arrancar()</code> y <code>mostrarInfo()</code> de cada elemento.</li>
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
        <span class="kw">if</span> (velocidadMax &lt; <span class="num">0</span>) <span class="kw">throw new</span> <span class="fn">IllegalArgumentException</span>(<span class="str">"La velocidad máxima no puede ser negativa"</span>);
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
        <span class="tp">java.util.ArrayList</span>&lt;<span class="fn">Vehiculo</span>&gt; flota = <span class="kw">new</span> <span class="tp">java.util.ArrayList</span>&lt;&gt;();
        
        <span class="kw">try</span> {
            flota.<span class="fn">add</span>(<span class="kw">new</span> <span class="fn">Coche</span>(<span class="str">"Toyota"</span>, <span class="str">"Corolla"</span>, <span class="num">180</span>, <span class="num">4</span>));
            flota.<span class="fn">add</span>(<span class="kw">new</span> <span class="fn">Moto</span>(<span class="str">"Honda"</span>, <span class="str">"CB500"</span>, <span class="num">200</span>, <span class="num">500</span>));
            flota.<span class="fn">add</span>(<span class="kw">new</span> <span class="fn">Coche</span>(<span class="str">"Tesla"</span>, <span class="str">"Model S"</span>, -<span class="num">10</span>, <span class="num">5</span>)); <span class="cm">// Esto fallará</span>
        } <span class="kw">catch</span> (<span class="fn">IllegalArgumentException</span> e) {
            System.out.<span class="fn">println</span>(<span class="str">"Error al crear vehículo: "</span> + e.<span class="fn">getMessage</span>());
        }

        <span class="kw">for</span> (<span class="fn">Vehiculo</span> v : flota) {
            v.<span class="fn">arrancar</span>();
            v.<span class="fn">mostrarInfo</span>();
        }
    }
} `,

    criterios: [
      'Interface Conducible con void arrancar()',
      'Vehiculo (abstract) con atributos protected y constructor con 3 parámetros',
      'Constructor sin parámetros en Vehiculo usando this() correctamente',
      'Método abstracto String getTipo() (¡Ojo con el tipo de retorno!)',
      'Coche extiende Vehiculo y llama a super(marca, modelo, velocidadMax)',
      '@Override getTipo() en Coche devolviendo "Coche" (String)',
      '@Override mostrarInfo() en Coche llamando a super.mostrarInfo()',
      'Moto extiende Vehiculo y llama a super(marca, modelo, velocidadMax)',
      'ArrayList<Vehiculo> con instancias de Coche y Moto (Polimorfismo)',
      'Uso de try-catch capturando IllegalArgumentException',
    ],

    checks: [
      (c) => /interface\s+Conducible\s*\{[\s\S]*void\s+arrancar\s*\(\s*\)\s*;/i.test(c),
      (c) => /abstract\s+class\s+Vehiculo\s+implements\s+Conducible/i.test(c) && /protected\s+String\s+marca/i.test(c) && /public\s+Vehiculo\s*\(\s*String\s+\w+\s*,\s*String\s+\w+\s*,\s*int\s+\w+\s*\)/i.test(c),
      (c) => /public\s+Vehiculo\s*\(\s*\)\s*\{[\s\S]*this\s*\(\s*".*"\s*,\s*".*"\s*,\s*\d+\s*\)\s*;/.test(c),
      (c) => /public\s+abstract\s+String\s+getTipo\s*\(\s*\)\s*;/i.test(c),
      (c) => /class\s+Coche\s+extends\s+Vehiculo/i.test(c) && /super\s*\(\s*\w+\s*,\s*\w+\s*,\s*\w+\s*\)\s*;/i.test(c),
      (c) => /@Override[\s\S]*public\s+String\s+getTipo\s*\(\s*\)[\s\S]*return\s+".*Coche.*"/i.test(c),
      (c) => /@Override[\s\S]*public\s+void\s+mostrarInfo\s*\(\s*\)[\s\S]*super\s*\.\s*mostrarInfo\s*\(\s*\)\s*;/i.test(c),
      (c) => /class\s+Moto\s+extends\s+Vehiculo/i.test(c) && /super\s*\(\s*\w+\s*,\s*\w+\s*,\s*\w+\s*\)\s*;/i.test(c),
      (c) => /ArrayList\s*<\s*Vehiculo\s*>/i.test(c) && /new\s+Coche/i.test(c) && /new\s+Moto/i.test(c),
      (c) => /try\s*\{[\s\S]*\}\s*catch\s*\(\s*IllegalArgumentException\s+\w+\s*\)\s*\{/i.test(c) || /throw\s+new\s+IllegalArgumentException/i.test(c),
    ]
  },

  {
    id: 'ej2',
    titulo: 'Ejercicio 2 — Sistema de Empleados',
    nivel: '⭐⭐',
    temas: ['Abstract', 'Interfaces', 'Herencia', 'Polimorfismo', 'Encapsulación', 'Excepciones', 'Array de objetos'],
    tiempo: '30 min',
    enunciado: `
<div class="exam-header" style="margin-bottom:1.5rem; text-align:center; border-bottom:2px solid var(--purple); padding-bottom:0.5rem;">
  <h3 style="color:var(--purple); margin:0;">EXAMEN PRÁCTICO DE PROGRAMACIÓN (DAW1)</h3>
  <p style="margin:0; font-size:0.9rem; opacity:0.8;">Unidad: Jerarquías, Sobrecarga y Gestión de Excepciones</p>
</div>

<p style="margin-bottom:1rem;"><strong>Contexto:</strong> Se requiere desarrollar un módulo para un sistema de Recursos Humanos que gestione distintos perfiles profesionales de una empresa tecnológica. El sistema debe permitir el cálculo automatizado de salarios y la evaluación de desempeño.</p>

<div class="code-exercise-desc" style="margin-bottom:1rem; padding:1rem; background:rgba(var(--purple-rgb), 0.05); border-radius:8px;">
  <h4 style="color:var(--purple); margin-top:0;">1. Modelo Base</h4>
  <ul style="padding-left:1.25rem">
    <li><strong>Interfaz Evaluable:</strong> Método <code>String evaluar()</code>.</li>
    <li><strong>Clase Abstracta Empleado:</strong> Implementa <code>Evaluable</code>.
      <ul>
        <li>Atributos privados: <code>nombre (String)</code> y <code>salarioBase (double)</code>.</li>
        <li>Constructor que valide el salario: si es negativo, lanzará <code>IllegalArgumentException</code>.</li>
        <li>Constructor por defecto que invoque al anterior con "Sin nombre" y 1000.0.</li>
        <li>Getters públicos para los atributos.</li>
        <li>Método abstracto: <code>double calcularSalario()</code>.</li>
        <li>Método final (no abstracto): <code>mostrarInfo()</code> que visualice el estado completo del empleado.</li>
      </ul>
    </li>
  </ul>
</div>

<div class="code-exercise-desc" style="margin-bottom:1rem; padding:1rem; background:rgba(var(--accent-rgb), 0.05); border-radius:8px;">
  <h4 style="color:var(--accent); margin-top:0;">2. Especialización del Personal</h4>
  <p>Implementa las siguientes subclases de Empleado:</p>
  <ul style="padding-left:1.25rem">
    <li><strong>Gerente:</strong> Incluye bono de gestión. El salario total es la suma de la base y dicho bono.</li>
    <li><strong>Desarrollador:</strong> Incluye incentivo por número de proyectos (200€ por proyecto). 
      <br><strong>Importante:</strong> Sobrecarga el método <code>calcularSalario</code> para que acepte un parámetro entero <code>horasExtra</code> (precio hora: 15€).</li>
    <li><strong>Asistente:</strong> Percibe únicamente el salario base.</li>
  </ul>
</div>

<div class="code-exercise-desc" style="margin-bottom:1rem; padding:1rem; background:rgba(var(--green-rgb), 0.05); border-radius:8px;">
  <h4 style="color:var(--green); margin-top:0;">3. Integración y Prueba</h4>
  <p>En el programa principal (<code>Main</code>):</p>
  <ul style="padding-left:1.25rem">
    <li>Gestiona la creación de objetos dentro de un bloque <code>try-catch</code> para controlar errores de inicialización.</li>
    <li>Crea un <strong>ArrayList polimórfico</strong> de tipo <code>Empleado</code>.</li>
    <li>Itera la lista aplicando polimorfismo para mostrar la información y evaluación de cada uno.</li>
    <li>Realiza una llamada específica a la versión sobrecargada del salario para un desarrollador.</li>
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
        <span class="tp">java.util.ArrayList</span>&lt;<span class="fn">Empleado</span>&gt; plantilla = <span class="kw">new</span> <span class="tp">java.util.ArrayList</span>&lt;&gt;();
        <span class="kw">try</span> {
            plantilla.<span class="fn">add</span>(<span class="kw">new</span> <span class="fn">Gerente</span>(<span class="str">"Ana"</span>, <span class="num">3000</span>, <span class="num">1500</span>));
            plantilla.<span class="fn">add</span>(<span class="kw">new</span> <span class="fn">Desarrollador</span>(<span class="str">"Luis"</span>, <span class="num">2500</span>, <span class="num">3</span>));
            plantilla.<span class="fn">add</span>(<span class="kw">new</span> <span class="fn">Asistente</span>(<span class="str">"María"</span>, <span class="num">1800</span>));
            plantilla.<span class="fn">add</span>(<span class="kw">new</span> <span class="fn">Gerente</span>(<span class="str">"Pedro"</span>, <span class="num">3500</span>, <span class="num">2000</span>));
        } <span class="kw">catch</span> (<span class="fn">IllegalArgumentException</span> e) {
            System.out.<span class="fn">println</span>(<span class="str">"Error al crear empleado: "</span> + e.<span class="fn">getMessage</span>());
        }

        <span class="kw">for</span> (<span class="fn">Empleado</span> e : plantilla) {
            e.<span class="fn">mostrarInfo</span>();
        }

        // Sobrecarga: calcularSalario con horas extra
        <span class="fn">Desarrollador</span> dev = (<span class="fn">Desarrollador</span>) plantilla.<span class="fn">get</span>(<span class="num">1</span>);
        System.out.<span class="fn">println</span>(<span class="str">"Salario con 10h extra: "</span> + dev.<span class="fn">calcularSalario</span>(10));
    }
}`,

    criterios: [
      'Interface Evaluable con String evaluar()',
      'Empleado (abstract) con atributos private y constructor con validación',
      'Constructor sin parámetros en Empleado usando this()',
      'Método abstracto double calcularSalario() en Empleado',
      'Gerente extiende Empleado y llama a super(nombre, salario)',
      '@Override evaluar() en Gerente devolviendo String correcto',
      'Desarrollador con sobrecarga calcularSalario(int horasExtra)',
      'Asistente extiende Empleado y llama a super()',
      'ArrayList<Empleado> con instancias variadas (Polimorfismo)',
      'Bloque try-catch capturando IllegalArgumentException',
    ],

    checks: [
      (c) => /interface\s+Evaluable\s*\{[\s\S]*String\s+evaluar\s*\(\s*\)\s*;/i.test(c),
      (c) => /abstract\s+class\s+Empleado\s+implements\s+Evaluable/i.test(c) && /private\s+String\s+nombre/i.test(c) && /throw\s+new\s+IllegalArgumentException/i.test(c),
      (c) => /public\s+Empleado\s*\(\s*\)\s*\{[\s\S]*this\s*\(\s*".*"\s*,\s*[\d.]+\s*\)\s*;/.test(c),
      (c) => /public\s+abstract\s+double\s+calcularSalario\s*\(\s*\)\s*;/i.test(c),
      (c) => /class\s+Gerente\s+extends\s+Empleado/i.test(c) && /super\s*\(\s*\w+\s*,\s*\w+\s*\)\s*;/i.test(c),
      (c) => /class\s+Gerente[\s\S]*@Override[\s\S]*public\s+String\s+evaluar\s*\(\s*\)/i.test(c),
      (c) => /public\s+double\s+calcularSalario\s*\(\s*int\s+\w+\s*\)/i.test(c),
      (c) => /class\s+Asistente\s+extends\s+Empleado/i.test(c) && /super\s*\(\s*\w+\s*,\s*\w+\s*\)\s*;/i.test(c),
      (c) => /ArrayList\s*<\s*Empleado\s*>/i.test(c) && /new\s+Gerente/i.test(c) && /new\s+Desarrollador/i.test(c),
      (c) => /try\s*\{[\s\S]*\}\s*catch\s*\(\s*IllegalArgumentException\s+\w+\s*\)/i.test(c),
    ]
  },
  {
    id: 'ej_final1',
    title: 'Caso Final A: Sistema de Reservas de Hotel',
    description: 'Implementa una jerarquía de clases para gestionar las habitaciones de un hotel, aplicando herencia, interfaces y excepciones.',
    problem: `
      1. Crea la interfaz <b>Reservable</b> con un método <code>double calcularPrecio(int dias)</code>.
      2. Crea la clase abstracta <b>Habitacion</b> que implemente <b>Reservable</b>. Atributos privados: <code>numero</code> (int) y <code>precioBase</code> (double).
      3. Añade un constructor a <b>Habitacion</b> que valide que el precio no sea negativo (si lo es, lanza <b>IllegalArgumentException</b>).
      4. Crea la clase <b>Suite</b> que extiende <b>Habitacion</b>. Tiene un atributo extra <code>servicioCatering</code> (double).
         - Sobrescribe <code>calcularPrecio</code>: (precioBase * dias) + servicioCatering.
      5. Crea la clase <b>HabitacionEstandar</b> que extiende <b>Habitacion</b>.
         - Si se reserva más de 5 días, tiene un descuento del 10% en el precio base.
      6. En un <b>Main</b>, crea un ArrayList de Habitaciones y añade una de cada tipo. Recórrelo mostrando el precio para una estancia de 7 días.
    `,
    solution: `public interface Reservable {
    double calcularPrecio(int dias);
}

abstract class Habitacion implements Reservable {
    private int numero;
    private double precioBase;

    public Habitacion(int numero, double precioBase) {
        if (precioBase < 0) throw new IllegalArgumentException("Precio negativo");
        this.numero = numero;
        this.precioBase = precioBase;
    }

    public double getPrecioBase() { return precioBase; }
}

class Suite extends Habitacion {
    private double catering;

    public Suite(int numero, double precio, double catering) {
        super(numero, precio);
        this.catering = catering;
    }

    @Override
    public double calcularPrecio(int dias) {
        return (getPrecioBase() * dias) + catering;
    }
}

class HabitacionEstandar extends Habitacion {
    public HabitacionEstandar(int numero, double precio) {
        super(numero, precio);
    }

    @Override
    public double calcularPrecio(int dias) {
        double total = getPrecioBase() * dias;
        if (dias > 5) total *= 0.9;
        return total;
    }
}

public class Main {
    public static void main(String[] args) {
        java.util.ArrayList<Habitacion> hotel = new java.util.ArrayList<>();
        hotel.add(new Suite(101, 200, 50));
        hotel.add(new HabitacionEstandar(202, 80));

        for (Habitacion h : hotel) {
            System.out.println("Precio: " + h.calcularPrecio(7));
        }
    }
}`,
    criterios: [
      'Interface Reservable con método calcularPrecio',
      'Clase abstracta Habitacion con atributos privados',
      'Validación en constructor (Excepción)',
      'Clase Suite con atributo propio y cálculo específico',
      'Clase HabitacionEstandar con lógica de descuento',
      'Uso de ArrayList<Habitacion> y Polimorfismo'
    ],
    checks: [
      (c) => /interface\s+Reservable/i.test(c) && /double\s+calcularPrecio/i.test(c),
      (c) => /abstract\s+class\s+Habitacion\s+implements\s+Reservable/i.test(c),
      (c) => /throw\s+new\s+IllegalArgumentException/i.test(c),
      (c) => /class\s+Suite\s+extends\s+Habitacion/i.test(c),
      (c) => /if\s*\(\s*dias\s*>\s*5\s*\)/i.test(c),
      (c) => /ArrayList\s*<\s*Habitacion\s*>/i.test(c) || /List\s*<\s*Habitacion\s*>/i.test(c)
    ]
  },
  {
    id: 'ej_final2',
    title: 'Caso Final B: Gestión de Proyectos IT',
    description: 'Sistema complejo para gestionar empleados y bonos de rendimiento.',
    problem: `
      1. Crea la interfaz <b>Bonificable</b> con el método <code>void aplicarBono()</code>.
      2. Clase abstracta <b>EmpleadoIT</b>: nombre, salarioBase, proyectoActual.
      3. Clase <b>Programador</b>: nivel (Junior/Senior). Implementa <b>Bonificable</b>.
         - Si es Senior, el bono incrementa el salarioBase un 15%. Si es Junior, un 5%.
      4. Clase <b>Analista</b>: añosExperiencia.
         - Tiene un método <code>revisarProyecto()</code> que imprime un mensaje.
      5. Implementa un método <code>main</code> que:
         - Cree una <b>LinkedList</b> de EmpleadosIT (<code>java.util.LinkedList</code>).
         - Use una <b>Stack</b> de String (<code>java.util.Stack</code>) para guardar los nombres de los que reciban el bono.
         - Use <b>instanceof</b> para llamar a <code>aplicarBono()</code> y añade el nombre a la pila.
         - Al final, muestra el historial de bonos vaciando la pila (LIFO).
         - Capture una posible excepción personalizada <b>SalarioInvalidoException</b> si el salario base es menor al SMI (1080€).
    `,
    solution: `class SalarioInvalidoException extends Exception {
    public SalarioInvalidoException(String msg) { super(msg); }
}

interface Bonificable {
    void aplicarBono();
}

abstract class EmpleadoIT {
    protected String nombre;
    protected double salarioBase;

    public EmpleadoIT(String nombre, double salario) throws SalarioInvalidoException {
        if (salario < 1080) throw new SalarioInvalidoException("Salario bajo SMI");
        this.nombre = nombre;
        this.salarioBase = salario;
    }
}

class Programador extends EmpleadoIT implements Bonificable {
    private String nivel;

    public Programador(String nombre, double salario, String nivel) throws SalarioInvalidoException {
        super(nombre, salario);
        this.nivel = nivel;
    }

    @Override
    public void aplicarBono() {
        if (nivel.equals("Senior")) salarioBase *= 1.15;
        else salarioBase *= 1.05;
    }
}

class Analista extends EmpleadoIT {
    public Analista(String nombre, double salario) throws SalarioInvalidoException {
        super(nombre, salario);
    }
}

public class Main {
    public static void main(String[] args) {
        java.util.LinkedList<EmpleadoIT> equipo = new java.util.LinkedList<>();
        java.util.Stack<String> historialBonos = new java.util.Stack<>();
        
        try {
            equipo.add(new Programador("Cata", 2000, "Senior"));
            equipo.add(new Analista("Dani", 2500));
            equipo.add(new Programador("Eli", 1200, "Junior"));

            for (EmpleadoIT e : equipo) {
                if (e instanceof Bonificable) {
                    ((Bonificable) e).aplicarBono();
                    historialBonos.push(e.nombre);
                }
                System.out.println(e.nombre + " - Salario: " + e.salarioBase);
            }
            
            System.out.println("Historial de Bonos (LIFO):");
            while (!historialBonos.isEmpty()) {
                System.out.println("- " + historialBonos.pop());
            }
            
        } catch (SalarioInvalidoException e) {
            System.err.println(e.getMessage());
        }
    }
}`,
    criterios: [
      'Excepción personalizada SalarioInvalidoException',
      'Interface Bonificable con aplicarBono()',
      'Clase abstracta EmpleadoIT con constructor que lanza excepción',
      'Clase Programador con lógica de bonos según nivel',
      'Uso de instanceof para filtrado de tipos',
      'Uso de LinkedList para el equipo y Stack para el historial de bonos',
      'Gestión de errores con try-catch'
    ],
    checks: [
      (c) => /class\s+SalarioInvalidoException\s+extends\s+Exception/i.test(c),
      (c) => /interface\s+Bonificable/i.test(c),
      (c) => /throws\s+SalarioInvalidoException/i.test(c),
      (c) => /instanceof\s+Bonificable/i.test(c),
      (c) => /LinkedList\s*<\s*EmpleadoIT\s*>/i.test(c) && /Stack\s*<\s*String\s*>/i.test(c),
      (c) => /try\s*\{[\s\S]*\}\s*catch\s*\(\s*SalarioInvalidoException/i.test(c)
    ]
  },
  {
    id: 'ej_sim2_1',
    titulo: 'Simulacro 2: Inventario con HashMap',
    nivel: '⭐⭐⭐',
    temas: ['HashMap', 'Iteración', 'Interfaces', 'Excepciones'],
    enunciado: `
      <div class="exam-header" style="border-bottom:2px solid var(--orange)">
        <h3 style="color:var(--orange)">CASO PRÁCTICO: GESTIÓN DE ALMACÉN</h3>
      </div>
      <p>Diseña un sistema para gestionar el stock de una tienda:</p>
      <ul style="padding-left:1.2rem">
        <li><strong>Interfaz Imponible:</strong> Método <code>double obtenerIVA()</code>.</li>
        <li><strong>Clase Producto:</strong> Atributos: <code>codigo (String)</code>, <code>precio (double)</code>.</li>
        <li><strong>Main:</strong>
          <ul>
            <li>Crea un <b>HashMap&lt;String, Producto&gt;</b> para almacenar productos por su código.</li>
            <li>Implementa una búsqueda por código que lance una excepción personalizada <code>ProductoNoEncontradoException</code> si el código no existe.</li>
            <li>Muestra el precio total de todos los productos del mapa.</li>
          </ul>
        </li>
      </ul>
    `,
    solucion: `class ProductoNoEncontradoException extends Exception {
    public ProductoNoEncontradoException(String m) { super(m); }
}

abstract class Producto {
    protected String codigo;
    protected double precio;
    public Producto(String c, double p) { this.codigo = c; this.precio = p; }
}

class Articulo extends Producto {
    public Articulo(String c, double p) { super(c, p); }
}

public class Main {
    public static void main(String[] args) {
        java.util.HashMap<String, Producto> inventario = new java.util.HashMap<>();
        inventario.put("P01", new Articulo("P01", 100));
        inventario.put("P02", new Articulo("P02", 50));

        try {
            String buscar = "P03";
            if (!inventario.containsKey(buscar)) throw new ProductoNoEncontradoException("No existe");
        } catch (ProductoNoEncontradoException e) {
            System.err.println(e.getMessage());
        }

        double total = 0;
        for (Producto p : inventario.values()) {
            total += p.precio;
        }
        System.out.println("Total: " + total);
    }
}`,
    criterios: ['Uso de HashMap<String, Producto>', 'Excepción personalizada', 'Iteración con values()'],
    checks: [
      (c) => /HashMap\s*<\s*String\s*,\s*Producto\s*>/i.test(c),
      (c) => /throw\s+new\s+ProductoNoEncontradoException/i.test(c),
      (c) => /\.values\s*\(\s*\)/i.test(c)
    ]
  },
  {
    id: 'ej_sim2_2',
    titulo: 'Simulacro 2: Registro Único con HashSet',
    nivel: '⭐⭐',
    temas: ['HashSet', 'Excepciones', 'Colecciones'],
    enunciado: `
      <div class="exam-header" style="border-bottom:2px solid var(--green)">
        <h3 style="color:var(--green)">CASO PRÁCTICO: REGISTRO DE EVENTOS</h3>
      </div>
      <p>Implementa un sistema que asegure que no haya correos duplicados en un evento:</p>
      <ul style="padding-left:1.2rem">
        <li>Crea un <b>HashSet&lt;String&gt;</b> para los emails.</li>
        <li>Si al añadir un email con <code>add()</code> el método devuelve <b>false</b>, lanza una <code>DuplicateEmailException</code>.</li>
        <li>Muestra el total de asistentes únicos al final.</li>
      </ul>
    `,
    solucion: `class DuplicateEmailException extends Exception {
    public DuplicateEmailException(String m) { super(m); }
}

public class Main {
    public static void main(String[] args) {
        java.util.HashSet<String> asistentes = new java.util.HashSet<>();
        String[] lista = {"a@a.com", "b@b.com", "a@a.com"};

        for (String email : lista) {
            try {
                if (!asistentes.add(email)) {
                    throw new DuplicateEmailException("Email repetido: " + email);
                }
            } catch (DuplicateEmailException e) {
                System.out.println(e.getMessage());
            }
        }
        System.out.println("Asistentes totales: " + asistentes.size());
    }
}`,
    criterios: ['Uso de HashSet<String>', 'Control de duplicados con el retorno de add()', 'Excepción personalizada'],
    checks: [
      (c) => /HashSet\s*<\s*String\s*>/i.test(c),
      (c) => /if\s*\(\s*!\s*\w+\.add\s*\(\s*\w+\s*\)\s*\)/i.test(c),
      (c) => /throw\s+new\s+DuplicateEmailException/i.test(c)
    ]
  }
];
