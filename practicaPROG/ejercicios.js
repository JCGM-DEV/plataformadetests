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

<div class="code-exercise-desc" style="margin-bottom:1rem; padding:1rem; background:rgba(var(--green-rgb), 0.05); border-radius:8px;">
  <h4 style="color:var(--green); margin-top:0;">3. Lógica de Ejecución y Gestión de Errores</h4>
  <p>En el método <code>main</code> de la clase principal, realiza lo siguiente:</p>
  <ul style="padding-left:1.25rem">
    <li>Declara un <strong>array polimórfico</strong> de tipo <code>Vehiculo</code> con capacidad para 4 elementos.</li>
    <li>Instancia objetos de tipo <code>Coche</code> y <code>Moto</code> dentro del array.</li>
    <li>Recorre el array mediante un bucle, invocando a <code>arrancar()</code> y <code>mostrarInfo()</code> de cada elemento.</li>
    <li><strong>Control de Excepciones:</strong> Implementa una validación para que si la <code>velocidadMax</code> es inferior a 0, se lance una <code>IllegalArgumentException</code>. Captura dicha excepción mediante un bloque <code>try-catch</code> informando del error.</li>
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

        <span class="kw">for</span> (<span class="kw">int</span> i = 0; i < flota.length; i++) {
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
      'Vehiculo (abstract) con atributos protected y constructor con 3 parámetros',
      'Constructor sin parámetros en Vehiculo usando this() correctamente',
      'Método abstracto String getTipo() (¡Ojo con el tipo de retorno!)',
      'Coche extiende Vehiculo y llama a super(marca, modelo, velocidadMax)',
      '@Override getTipo() en Coche devolviendo "Coche" (String)',
      '@Override mostrarInfo() en Coche llamando a super.mostrarInfo()',
      'Moto extiende Vehiculo y llama a super(marca, modelo, velocidadMax)',
      'Array Vehiculo[] con instancias de Coche y Moto (Polimorfismo)',
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
      (c) => /Vehiculo\s*\[\s*\]\s+\w+\s*=\s*new\s+Vehiculo\s*\[\s*\d+\s*\]/i.test(c) && /new\s+Coche/i.test(c) && /new\s+Moto/i.test(c),
      (c) => /try\s*\{[\s\S]*\}\s*catch\s*\(\s*IllegalArgumentException\s+\w+\s*\)\s*\{/i.test(c),
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
    <li>Crea una colección (Array) de tipo <code>Empleado</code> con al menos 4 integrantes de diversas categorías.</li>
    <li>Itera la colección aplicando polimorfismo para mostrar la información y evaluación de cada uno.</li>
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
        <span class="fn">Empleado</span>[] plantilla = <span class="kw">new</span> <span class="fn">Empleado</span>[<span class="num">4</span>];
        <span class="kw">try</span> {
            plantilla[0] = <span class="kw">new</span> <span class="fn">Gerente</span>(<span class="str">"Ana"</span>, <span class="num">3000</span>, <span class="num">1500</span>);
            plantilla[1] = <span class="kw">new</span> <span class="fn">Desarrollador</span>(<span class="str">"Luis"</span>, <span class="num">2500</span>, <span class="num">3</span>);
            plantilla[2] = <span class="kw">new</span> <span class="fn">Asistente</span>(<span class="str">"María"</span>, <span class="num">1800</span>);
            plantilla[3] = <span class="kw">new</span> <span class="fn">Gerente</span>(<span class="str">"Pedro"</span>, <span class="num">3500</span>, <span class="num">2000</span>);
        } <span class="kw">catch</span> (<span class="fn">IllegalArgumentException</span> e) {
            System.out.<span class="fn">println</span>(<span class="str">"Error al crear empleado: "</span> + e.<span class="fn">getMessage</span>());
        }

        <span class="kw">for</span> (<span class="kw">int</span> i = 0; i < plantilla.length; i++) {
            plantilla[i].<span class="fn">mostrarInfo</span>();
        }

        // Sobrecarga: calcularSalario con horas extra
        <span class="fn">Desarrollador</span> dev = (<span class="fn">Desarrollador</span>) plantilla[1];
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
      'Array Empleado[] con instancias variadas (Polimorfismo)',
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
      (c) => /Empleado\s*\[\s*\]\s+\w+\s*=\s*new\s+Empleado\s*\[\s*\d+\s*\]/i.test(c) && /new\s+Gerente/i.test(c) && /new\s+Desarrollador/i.test(c),
      (c) => /try\s*\{[\s\S]*\}\s*catch\s*\(\s*IllegalArgumentException\s+\w+\s*\)/i.test(c),
    ]
  }
];
