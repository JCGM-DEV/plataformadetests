// =============================================
// EJERCICIOS PRÁCTICOS — Programación DAW
// Formato oficial de examen (nivel DAW1)
// Temas: Encapsulación, Herencia, Polimorfismo,
//        Excepciones, Colecciones y Ficheros.
// =============================================

const EJERCICIOS = [
  {
    id: 'ej1',
    titulo: 'Ejercicio 1 — Sistema de Gestión Logística',
    nivel: '⭐⭐',
    temas: ['Abstract', 'Herencia', 'Encapsulación', 'Excepciones'],
    tiempo: '30 min',
    enunciado: `
<div class="exam-header">
  <h3 style="color:var(--blue); border-bottom:2px solid var(--blue); padding-bottom:5px;">EXAMEN PRÁCTICO: Jerarquías y Encapsulamiento</h3>
</div>

<p>Una empresa de transporte necesita modelar su flota de vehículos. Implementa los siguientes requisitos:</p>

<div class="code-exercise-desc">
  <h4>1. Clase Abstracta Vehiculo</h4>
  <ul>
    <li>Define los atributos <b>privados</b>: marca (String), modelo (String) y velocidadMax (int).</li>
    <li>Implementa un <b>constructor con parámetros</b> que valide que la velocidad no sea negativa (lanza IllegalArgumentException).</li>
    <li>Implementa un <b>constructor por defecto</b> que llame al anterior usando <code>this()</code>.</li>
    <li>Proporciona <b>getters y setters</b> para todos los atributos.</li>
    <li>Sobrescribe el método <code>toString()</code> para mostrar la información del vehículo.</li>
    <li>Define el método abstracto: <code>public abstract String getTipo();</code></li>
  </ul>
</div>

<div class="code-exercise-desc">
  <h4>2. Subclases Concretas</h4>
  <ul>
    <li>Crea la clase <b>Coche</b> (con atributo numPuertas) y <b>Moto</b> (con cilindrada).</li>
    <li>Ambas deben llamar al constructor del padre mediante <code>super()</code>.</li>
    <li>Implementa el método <code>getTipo()</code> en cada una devolviendo "Coche" o "Moto".</li>
  </ul>
</div>`,

    pistas: [
      '💡 La encapsulación requiere atributos private y acceso mediante métodos public.',
      '💡 toString() es fundamental para ver el estado del objeto fácilmente.',
    ],

    solucion: `abstract class Vehiculo {
    private String marca;
    private String modelo;
    private int velocidadMax;

    public Vehiculo(String marca, String modelo, int velocidadMax) {
        if (velocidadMax < 0) throw new IllegalArgumentException("Velocidad negativa");
        this.marca = marca;
        this.modelo = modelo;
        this.velocidadMax = velocidadMax;
    }

    public Vehiculo() {
        this("Desconocida", "Genérico", 0);
    }

    public String getMarca() { return marca; }
    public void setMarca(String m) { this.marca = m; }
    public String getModelo() { return modelo; }
    public void setModelo(String m) { this.modelo = m; }
    public int getVelocidadMax() { return velocidadMax; }
    public void setVelocidadMax(int v) { this.velocidadMax = v; }

    public abstract String getTipo();

    @Override
    public String toString() {
        return getTipo() + ": " + marca + " " + modelo + " (" + velocidadMax + " km/h)";
    }
}

class Coche extends Vehiculo {
    private int numPuertas;
    public Coche(String m, String mod, int v, int p) {
        super(m, mod, v);
        this.numPuertas = p;
    }
    @Override public String getTipo() { return "Coche"; }
    @Override public String toString() { return super.toString() + " [" + numPuertas + " puertas]"; }
}

class Moto extends Vehiculo {
    private int cc;
    public Moto(String m, String mod, int v, int c) {
        super(m, mod, v);
        this.cc = c;
    }
    @Override public String getTipo() { return "Moto"; }
    @Override public String toString() { return super.toString() + " [" + cc + "cc]"; }
}

public class Main {
    public static void main(String[] args) {
        java.util.ArrayList<Vehiculo> flota = new java.util.ArrayList<>();
        flota.add(new Coche("Toyota", "Corolla", 180, 5));
        flota.add(new Moto("Honda", "CBR", 240, 600));
        
        for (Vehiculo v : flota) {
            System.out.println(v);
        }
    }
}`,

    criterios: [
      'Encapsulación completa (private + getters/setters)',
      'Constructor con validación y uso de this()',
      'Herencia con super() y polimorfismo',
      'Sobrescritura correcta de toString()'
    ],

    checks: [
      (c) => /private\s+String\s+marca/i.test(c) && /public\s+String\s+getMarca/i.test(c),
      (c) => /this\s*\(\s*".*"\s*,\s*".*"\s*,\s*\d+\s*\)\s*;/.test(c),
      (c) => /super\s*\(\s*\w+\s*,\s*\w+\s*,\s*\w+\s*\)\s*;/i.test(c),
      (c) => /@Override[\s\S]*public\s+String\s+toString/i.test(c),
      (c) => /ArrayList\s*<\s*Vehiculo\s*>/i.test(c) || /List\s*<\s*Vehiculo\s*>/i.test(c)
    ]
  },

  {
    id: 'ej2',
    titulo: 'Ejercicio 2 — Sistema de Gestión de Personal',
    nivel: '⭐⭐',
    temas: ['Interfaces', 'Polimorfismo', 'Sobrecarga'],
    tiempo: '30 min',
    enunciado: `
<div class="exam-header">
  <h3 style="color:var(--purple); border-bottom:2px solid var(--purple); padding-bottom:5px;">EXAMEN PRÁCTICO: Interfaces y Personal</h3>
</div>

<p>Desarrolla un sistema para gestionar el rendimiento de los empleados de una oficina:</p>

<div class="code-exercise-desc">
  <h4>1. Estructura Base</h4>
  <ul>
    <li>Crea la interfaz <b>Evaluable</b> con el método <code>String evaluar();</code></li>
    <li>Crea la clase <b>Empleado</b> (atributos: nombre, salario) que implemente Evaluable.</li>
    <li>Aplica <b>encapsulación</b> y sobrescribe <code>toString()</code>.</li>
  </ul>
</div>

<div class="code-exercise-desc">
  <h4>2. Especialización y Sobrecarga</h4>
  <ul>
    <li>Crea la clase <b>Desarrollador</b> que herede de Empleado.</li>
    <li>Implementa <b>sobrecarga</b> del método <code>calcularSalario</code>: uno sin parámetros y otro que reciba un <code>double plus</code>.</li>
    <li>Sobrescribe el método <code>evaluar()</code> para que devuelva un mensaje específico.</li>
  </ul>
</div>`,

    pistas: [
      '💡 La sobrecarga permite tener métodos con el mismo nombre pero distintos parámetros.',
    ],

    solucion: `interface Evaluable { String evaluar(); }

class Empleado implements Evaluable {
    private String nombre;
    private double salario;

    public Empleado(String n, double s) { this.nombre = n; this.salario = s; }
    public String getNombre() { return nombre; }
    public double getSalario() { return salario; }

    @Override public String evaluar() { return "Empleado en revisión."; }
    @Override public String toString() { return nombre + " (" + salario + "€)"; }
}

class Desarrollador extends Empleado {
    public Desarrollador(String n, double s) { super(n, s); }
    
    // Sobrecarga
    public double calcularSalario(double plus) {
        return getSalario() + plus;
    }

    @Override public String evaluar() { return "Desarrollo eficiente."; }
}

public class Main {
    public static void main(String[] args) {
        Desarrollador d = new Desarrollador("Luis", 2000);
        System.out.println(d + " | Evaluación: " + d.evaluar());
        System.out.println("Salario with plus: " + d.calcularSalario(500));
    }
}`,

    criterios: [
      'Implementación de Interfaz',
      'Sobrecarga de método en subclase',
      'Uso de super() y toString()'
    ],

    checks: [
      (c) => /implements\s+Evaluable/i.test(c),
      (c) => /public\s+double\s+calcularSalario\s*\(\s*double\s+\w+\s*\)/i.test(c),
      (c) => /@Override[\s\S]*public\s+String\s+evaluar/i.test(c)
    ]
  },

  {
    id: 'ej_sim2_1',
    titulo: 'Ejercicio 3 — Inventario con HashMap',
    nivel: '⭐⭐⭐',
    temas: ['HashMap', 'Excepciones Personalizadas'],
    tiempo: '30 min',
    enunciado: `
<div class="exam-header">
  <h3 style="color:var(--orange); border-bottom:2px solid var(--orange); padding-bottom:5px;">EXAMEN PRÁCTICO: Almacén y Colecciones</h3>
</div>

<p>Implementa un sistema de inventario robusto siguiendo estos pasos:</p>

<div class="code-exercise-desc">
  <h4>1. Modelo de Datos</h4>
  <ul>
    <li>Crea la clase <b>Producto</b> con código (String) y nombre (String).</li>
    <li>Aplica <b>encapsulación</b> y sobrescribe <code>toString()</code>.</li>
    <li>Crea la excepción personalizada <b>ProductoNoEncontradoException</b>.</li>
  </ul>
</div>

<div class="code-exercise-desc">
  <h4>2. Lógica de Almacén</h4>
  <ul>
    <li>En la clase principal, usa un <b>HashMap&lt;String, Producto&gt;</b> para almacenar los datos.</li>
    <li>Implementa un método <code>buscar(String codigo)</code> que lance la excepción si no existe la clave.</li>
    <li>Gestiona la búsqueda en el <code>main</code> usando un bloque <b>try-catch</b>.</li>
  </ul>
</div>`,

    pistas: [
      '💡 containsKey() del HashMap ayuda a saber si existe una clave.',
    ],

    solucion: `class ProductoNoEncontradoException extends Exception {
    public ProductoNoEncontradoException(String m) { super(m); }
}

class Producto {
    private String codigo;
    private String nombre;
    public Producto(String c, String n) { this.codigo = c; this.nombre = n; }
    @Override public String toString() { return codigo + ": " + nombre; }
}

public class Main {
    private static java.util.HashMap<String, Producto> almacen = new java.util.HashMap<>();

    public static void buscar(String c) throws ProductoNoEncontradoException {
        if (!almacen.containsKey(c)) throw new ProductoNoEncontradoException("No existe");
        System.out.println("Encontrado: " + almacen.get(c));
    }

    public static void main(String[] args) {
        almacen.put("A1", new Producto("A1", "Monitor"));
        try {
            buscar("B2");
        } catch (ProductoNoEncontradoException e) {
            System.err.println(e.getMessage());
        }
    }
}`,

    criterios: ['HashMap', 'Excepción personalizada', 'Cláusula throws'],
    checks: [
      (c) => /HashMap\s*<\s*String\s*,\s*Producto\s*>/i.test(c),
      (c) => /class\s+ProductoNoEncontradoException\s+extends\s+Exception/i.test(c),
      (c) => /throws\s+ProductoNoEncontradoException/i.test(c)
    ]
  },

  {
    id: 'ej_sim2_2',
    titulo: 'Ejercicio 4 — Registro con HashSet',
    nivel: '⭐⭐',
    temas: ['HashSet', 'Control de Duplicados'],
    tiempo: '20 min',
    enunciado: `
<div class="exam-header">
  <h3 style="color:var(--green); border-bottom:2px solid var(--green); padding-bottom:5px;">EXAMEN PRÁCTICO: Control de Duplicados</h3>
</div>

<p>Gestiona el registro de asistentes a un evento evitando duplicados:</p>

<div class="code-exercise-desc">
  <h4>Requisitos del Sistema</h4>
  <ul>
    <li>Usa un <b>HashSet&lt;String&gt;</b> para guardar los correos electrónicos.</li>
    <li>Implementa una lógica que intente añadir un correo y, si ya existe (el método <code>add</code> devuelve false), lance una excepción <b>EmailRepetidoException</b>.</li>
    <li>Muestra un mensaje de error apropiado capturando la excepción.</li>
  </ul>
</div>`,

    solucion: `class EmailRepetidoException extends Exception {
    public EmailRepetidoException(String m) { super(m); }
}

public class Main {
    public static void main(String[] args) {
        java.util.HashSet<String> registro = new java.util.HashSet<>();
        String email = "test@test.com";
        try {
            if (!registro.add(email)) throw new EmailRepetidoException("Error");
            if (!registro.add(email)) throw new EmailRepetidoException("Email duplicado");
        } catch (EmailRepetidoException e) {
            System.out.println(e.getMessage());
        }
    }
}`,
    criterios: ['HashSet', 'Control de retorno de add()', 'Exception'],
    checks: [
      (c) => /HashSet\s*<\s*String\s*>/i.test(c),
      (c) => /throw\s+new\s+EmailRepetidoException/i.test(c)
    ]
  },

  {
    id: 'ej_final1',
    titulo: 'Ejercicio 5 — Caso Final: Hotel y Ficheros',
    nivel: '⭐⭐⭐⭐',
    temas: ['Ficheros', 'Encapsulación', 'Herencia', 'Polimorfismo'],
    tiempo: '45 min',
    enunciado: `
<div class="exam-header">
  <h3 style="color:var(--red); border-bottom:2px solid var(--red); padding-bottom:5px;">CASO FINAL A: Reservas y Ficheros</h3>
</div>

<p>Implementa un sistema de gestión de hotel con persistencia en disco:</p>

<div class="code-exercise-desc">
  <h4>1. Estructura de Clases</h4>
  <ul>
    <li>Crea la interfaz <b>Reservable</b> con un método <code>double calcular(int dias)</code>.</li>
    <li>Crea la clase abstracta <b>Habitacion</b> que implemente Reservable. Atributos privados: numero e id.</li>
    <li>Aplica <b>encapsulación</b> (getters/setters) y herencia en una subclase <b>Suite</b>.</li>
  </ul>
</div>

<div class="code-exercise-desc">
  <h4>2. Persistencia (Ficheros)</h4>
  <ul>
    <li>En el <code>main</code>, crea una lista de habitaciones con polimorfismo.</li>
    <li>Usa <b>BufferedWriter</b> para guardar el resultado de <code>calcular()</code> de cada habitación en un fichero llamado <b>"reservas.txt"</b>.</li>
    <li>Captura obligatoriamente la excepción <b>IOException</b>.</li>
  </ul>
</div>`,

    solucion: `interface Reservable { double calcular(int d); }

abstract class Habitacion implements Reservable {
    private String id;
    private double base;
    public Habitacion(String i, double b) { this.id = i; this.base = b; }
    public double getBase() { return base; }
    @Override public String toString() { return "Hab: " + id; }
}

class Suite extends Habitacion {
    public Suite(String i, double b) { super(i, b); }
    @Override public double calcular(int d) { return getBase() * d * 1.5; }
}

public class Main {
    public static void main(String[] args) {
        java.util.ArrayList<Habitacion> hotel = new java.util.ArrayList<>();
        hotel.add(new Suite("101", 100));

        try (java.io.BufferedWriter bw = new java.io.BufferedWriter(new java.io.FileWriter("reservas.txt"))) {
            for (Habitacion h : hotel) {
                bw.write(h.toString() + " - " + h.calcular(5));
                bw.newLine();
            }
        } catch (java.io.IOException e) {
            System.err.println("Error de E/S");
        }
    }
}`,
    criterios: ['BufferedWriter', 'IOException', 'Polimorfismo', 'Encapsulación'],
    checks: [
      (c) => /BufferedWriter/i.test(c) && /FileWriter/i.test(c),
      (c) => /catch\s*\(\s*IOException\s+\w+\s*\)/i.test(c) || /try\s*\(\s*BufferedWriter\s*\)/i.test(c),
      (c) => /private\s+double\s+base/i.test(c)
    ]
  },

  {
    id: 'ej_final2',
    titulo: 'Ejercicio 6 — Caso Final: Pilas y Colas',
    nivel: '⭐⭐⭐',
    temas: ['Estructuras Dinámicas', 'FIFO/LIFO'],
    tiempo: '20 min',
    enunciado: `
<div class="exam-header">
  <h3 style="color:var(--blue); border-bottom:2px solid var(--blue); padding-bottom:5px;">CASO FINAL B: Cola de Soporte</h3>
</div>

<p>Gestiona tickets de soporte usando estructuras dinámicas (Java Collections):</p>

<div class="code-exercise-desc">
  <h4>Requisitos Técnicos</h4>
  <ul>
    <li>Crea una cola de tickets (String) usando <b>LinkedList</b> (comportamiento FIFO).</li>
    <li>Procesa los tickets extrayéndolos de la cola y apilándolos en un <b>Stack</b> (comportamiento LIFO).</li>
    <li>Recorre el <b>Stack</b> para mostrar el historial de tickets resueltos en orden inverso.</li>
    <li>Usa los métodos <code>poll()</code>, <code>push()</code> y <code>pop()</code> según corresponda.</li>
  </ul>
</div>`,

    solucion: `public class Main {
    public static void main(String[] args) {
        java.util.Queue<String> cola = new java.util.LinkedList<>();
        java.util.Stack<String> pila = new java.util.Stack<>();

        cola.offer("T-101");
        cola.offer("T-102");

        while (!cola.isEmpty()) {
            String t = cola.poll();
            System.out.println("Resolviendo " + t);
            pila.push(t);
        }

        System.out.println("Historial LIFO:");
        while (!pila.isEmpty()) {
            System.out.println("- " + pila.pop());
        }
    }
}`,
    criterios: ['Queue/LinkedList', 'Stack', 'poll() y push()', 'pop()'],
    checks: [
      (c) => /Queue\s*<\s*String\s*>/i.test(c) && /LinkedList/i.test(c),
      (c) => /Stack\s*<\s*String\s*>/i.test(c),
      (c) => /\.pop\s*\(\s*\)/i.test(c)
    ]
  }
];
