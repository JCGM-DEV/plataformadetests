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
    enunciado: `Una empresa necesita un sistema para gestionar sus empleados.
Diseña e implementa en Java las siguientes clases:

1. Clase abstracta <strong>Persona</strong> con:
   - Atributos privados: nombre (String), edad (int)
   - Constructor con parámetros
   - Getters y setters con validación (edad > 0)
   - Método abstracto: <em>String getInfo()</em>

2. Clase <strong>Empleado</strong> que extiende Persona con:
   - Atributo privado: salario (double), departamento (String)
   - Constructor que llame al padre
   - Implementa getInfo() mostrando todos los datos
   - Método calcularBonus(): devuelve el 10% del salario

3. Clase <strong>Directivo</strong> que extiende Empleado con:
   - Atributo privado: numEmpleadosACargo (int)
   - Sobreescribe calcularBonus(): devuelve el 20% del salario
   - Sobreescribe getInfo() añadiendo el número de empleados a cargo

4. Interfaz <strong>Gestionable</strong> con:
   - Método: <em>void gestionar()</em>
   - Haz que Directivo implemente esta interfaz

5. En el <strong>main</strong>:
   - Crea un ArrayList de tipo Persona con al menos 3 objetos (mezcla de Empleado y Directivo)
   - Recorre la lista e imprime getInfo() de cada uno (polimorfismo)
   - Captura una excepción si se intenta crear un empleado con salario negativo`,

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
    enunciado: `Diseña un sistema de gestión de una flota de vehículos:

1. Interfaz <strong>Conducible</strong> con:
   - <em>void arrancar()</em>
   - <em>void parar()</em>
   - <em>String getEstado()</em>

2. Clase abstracta <strong>Vehiculo</strong> con:
   - Atributos privados: matricula (String), marca (String), velocidadMax (int)
   - Constructor con parámetros
   - Método abstracto: <em>String getTipo()</em>
   - Implementa Conducible

3. Clase <strong>Coche</strong> que extiende Vehiculo con:
   - Atributo: numPuertas (int)
   - Implementa getTipo() devolviendo "Coche"
   - Implementa arrancar(), parar() y getEstado()

4. Clase <strong>Moto</strong> que extiende Vehiculo con:
   - Atributo: tieneSidecar (boolean)
   - Implementa getTipo() devolviendo "Moto"

5. Clase <strong>GestorFlota</strong> con:
   - Atributo: <em>HashMap&lt;String, Vehiculo&gt;</em> donde la clave es la matrícula
   - Método <em>añadir(Vehiculo v)</em>: añade al mapa, lanza excepción si la matrícula ya existe
   - Método <em>buscar(String matricula)</em>: devuelve el vehículo o lanza excepción si no existe
   - Método <em>listarTodos()</em>: imprime todos los vehículos con su tipo e info

6. Crea una excepción personalizada <strong>MatriculaDuplicadaException</strong>`,

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
    enunciado: `Diseña un sistema de gestión de una biblioteca:

1. Interfaz <strong>Prestable</strong> con:
   - <em>void prestar(String usuario)</em>
   - <em>void devolver()</em>
   - <em>boolean isDisponible()</em>

2. Clase abstracta <strong>Elemento</strong> con:
   - Atributos privados: titulo (String), año (int), disponible (boolean = true)
   - Implementa Prestable
   - Método abstracto: <em>String getCategoria()</em>

3. Clase <strong>Libro</strong> que extiende Elemento con:
   - Atributos: autor (String), numPaginas (int)
   - Implementa getCategoria() → "Libro"

4. Clase <strong>Revista</strong> que extiende Elemento con:
   - Atributos: numero (int), editorial (String)
   - Implementa getCategoria() → "Revista"

5. Clase <strong>Biblioteca</strong> con:
   - <em>ArrayList&lt;Elemento&gt;</em> catalogo
   - Método <em>añadir(Elemento e)</em>
   - Método <em>buscarPorTitulo(String titulo)</em>: devuelve el elemento o lanza ElementoNoEncontradoException
   - Método <em>listarDisponibles()</em>: imprime solo los disponibles
   - Método <em>prestarElemento(String titulo, String usuario)</em>: busca y presta, lanza excepción si no disponible

6. Excepción personalizada <strong>ElementoNoEncontradoException</strong>`,

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
