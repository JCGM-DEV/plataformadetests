// =============================================
// EJERCICIOS PRÁCTICOS — Programación DAW
// Formato oficial de examen (nivel DAW1)
// Temas: Encapsulación, Herencia, Polimorfismo,
//        Excepciones, Colecciones y Ficheros.
// =============================================

const EJERCICIOS = [
  {
    id: 'ej1',
    titulo: 'Ejercicio 1 — Sistema de Flota Logística TransEuropa S.A.',
    nivel: '⭐⭐',
    temas: ['Abstract', 'Herencia', 'Encapsulación', 'Excepciones'],
    tiempo: '30 min',
    enunciado: `
<div class="exam-header">
  <h3 style="color:var(--blue); border-bottom:2px solid var(--blue); padding-bottom:5px;">EXAMEN PRÁCTICO: Jerarquías y Encapsulamiento en Logística</h3>
</div>

<p>La empresa de mensajería <b>"TransEuropa S.A."</b> requiere un sistema para automatizar la gestión de su flota. Se solicita una estructura robusta que permita añadir vehículos y gestionar sus características de seguridad.</p>

<div class="code-exercise-desc">
  <h4>1. Clase Abstracta Vehiculo (Base de la Jerarquía)</h4>
  <ul>
    <li>Define atributos <b>privados</b>: <code>marca</code> (String), <code>modelo</code> (String) y <code>velocidadMax</code> (int).</li>
    <li><b>Constructor Principal</b>: Debe recibir los tres parámetros. Si la <code>velocidadMax</code> es inferior a 0 o superior a 300, lanzará una <code>IllegalArgumentException</code> con el mensaje "Velocidad fuera de rango de seguridad".</li>
    <li><b>Constructor por Defecto</b>: Debe inicializar el vehículo como "Genérico", "Base" y 0 km/h usando <code>this(...)</code>.</li>
    <li><b>Encapsulamiento</b>: Implementa getters y setters. El setter de velocidad debe incluir la misma validación que el constructor.</li>
    <li>Define el método abstracto: <code>public abstract String getTipo();</code></li>
    <li>Sobrescribe <code>toString()</code> para que devuelva un formato profesional: <code>"[Tipo] Marca: XXX, Modelo: YYY, V.Max: ZZZ km/h"</code>.</li>
  </ul>
</div>

<div class="code-exercise-desc">
  <h4>2. Subclases Concretas: Coche y Moto</h4>
  <ul>
    <li><b>Coche</b>: Añade el atributo privado <code>numPuertas</code> (int). Implementa <code>getTipo()</code> devolviendo "Turismo".</li>
    <li><b>Moto</b>: Añade el atributo privado <code>cilindrada</code> (int). Implementa <code>getTipo()</code> devolviendo "Motocicleta".</li>
    <li>Ambas clases deben llamar al constructor del padre mediante <code>super(...)</code> y sobrescribir <code>toString()</code> aprovechando el método de la superclase.</li>
  </ul>
</div>

<div class="code-exercise-desc">
  <h4>3. Prueba de Concepto (Clase Main)</h4>
  <ul>
    <li>Crea un <code>ArrayList&lt;Vehiculo&gt;</code> llamado <code>flota</code>.</li>
    <li>Añade al menos un Coche y una Moto a la lista.</li>
    <li>Recorre la lista usando un bucle <b>for-each</b> e imprime cada vehículo, demostrando el uso de polimorfismo.</li>
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
        if (velocidadMax < 0 || velocidadMax > 300) {
            throw new IllegalArgumentException("Velocidad fuera de rango de seguridad");
        }
        this.marca = marca;
        this.modelo = modelo;
        this.velocidadMax = velocidadMax;
    }

    public Vehiculo() {
        this("Genérico", "Base", 0);
    }

    public String getMarca() { return marca; }
    public void setMarca(String m) { this.marca = m; }
    public String getModelo() { return modelo; }
    public void setModelo(String m) { this.modelo = m; }
    public int getVelocidadMax() { return velocidadMax; }
    public void setVelocidadMax(int v) { 
        if (v < 0 || v > 300) throw new IllegalArgumentException("Velocidad fuera de rango de seguridad");
        this.velocidadMax = v; 
    }

    public abstract String getTipo();

    @Override
    public String toString() {
        return "[" + getTipo() + "] Marca: " + marca + ", Modelo: " + modelo + ", V.Max: " + velocidadMax + " km/h";
    }
}

class Coche extends Vehiculo {
    private int numPuertas;
    public Coche(String m, String mod, int v, int p) {
        super(m, mod, v);
        this.numPuertas = p;
    }
    @Override public String getTipo() { return "Turismo"; }
    @Override public String toString() { return super.toString() + " [" + numPuertas + " puertas]"; }
}

class Moto extends Vehiculo {
    private int cc;
    public Moto(String m, String mod, int v, int c) {
        super(m, mod, v);
        this.cc = c;
    }
    @Override public String getTipo() { return "Motocicleta"; }
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
    titulo: 'Ejercicio 2 — Gestión de Nóminas y Rendimiento en TechConsulting',
    nivel: '⭐⭐',
    temas: ['Interfaces', 'Polimorfismo', 'Sobrecarga'],
    tiempo: '30 min',
    enunciado: `
<div class="exam-header">
  <h3 style="color:var(--purple); border-bottom:2px solid var(--purple); padding-bottom:5px;">EXAMEN PRÁCTICO: Interfaces y Gestión de Nóminas IT</h3>
</div>

<p>La consultora tecnológica <b>"TechConsulting Solutions"</b> desea modernizar su sistema de recursos humanos. Debes implementar un modelo que gestione el rendimiento y los salarios de los desarrolladores.</p>

<div class="code-exercise-desc">
  <h4>1. Contrato de Rendimiento</h4>
  <ul>
    <li>Crea la interfaz <b>Evaluable</b> con un único método: <code>String evaluar();</code></li>
    <li>Crea la clase <b>Empleado</b> (atributos privados: <code>nombre</code>, <code>salarioBase</code>) que implemente <b>Evaluable</b> devolviendo "Pendiente de revisión anual".</li>
    <li>Aplica <b>encapsulación</b> y sobrescribe <code>toString()</code> para mostrar el nombre y el sueldo.</li>
  </ul>
</div>

<div class="code-exercise-desc">
  <h4>2. Especialización y Sobrecarga</h4>
  <ul>
    <li>Crea la clase <b>Desarrollador</b> que herede de Empleado y añada el atributo privado <code>lenguaje</code> (String).</li>
    <li>Implementa <b>sobrecarga</b> del método <code>calcularSalario</code>: uno sin parámetros (retorna salario base) y otro que reciba un <code>double bonoProyecto</code> y lo sume al base.</li>
    <li>Sobrescribe el método <code>evaluar()</code> para que devuelva: "Análisis de código y despliegue completado con éxito".</li>
  </ul>
</div>

<div class="code-exercise-desc">
  <h4>3. Prueba de Concepto (Clase Main)</h4>
  <ul>
    <li>En el <code>main</code>, instancia un <code>Desarrollador</code> asignándole valores iniciales.</li>
    <li>Muestra sus datos por consola, su evaluación y el salario final calculado incluyendo un bono de 500€.</li>
  </ul>
</div>`,

    pistas: [
      '💡 La sobrecarga permite tener métodos con el mismo nombre pero distintos parámetros.',
    ],

    solucion: `interface Evaluable {
    String evaluar();
}

class Empleado implements Evaluable {
    private String nombre;
    private double salarioBase;

    public Empleado(String nombre, double salarioBase) {
        this.nombre = nombre;
        this.salarioBase = salarioBase;
    }

    public String getNombre() { return nombre; }
    public double getSalarioBase() { return salarioBase; }

    @Override
    public String evaluar() {
        return "Pendiente de revisión anual";
    }

    @Override
    public String toString() {
        return "Empleado: " + nombre + ", Salario Base: " + salarioBase + "€";
    }
}

class Desarrollador extends Empleado {
    private String lenguaje;

    public Desarrollador(String nombre, double salario, String lenguaje) {
        super(nombre, salario);
        this.lenguaje = lenguaje;
    }

    public double calcularSalario() {
        return getSalarioBase();
    }

    public double calcularSalario(double bonoProyecto) {
        return getSalarioBase() + bonoProyecto;
    }

    @Override
    public String evaluar() {
        return "Análisis de código y despliegue completado con éxito";
    }
}

public class Main {
    public static void main(String[] args) {
        Desarrollador d = new Desarrollador("Ana García", 2500, "Java");
        System.out.println(d);
        System.out.println("Evaluación: " + d.evaluar());
        System.out.println("Salario con bono: " + d.calcularSalario(500) + "€");
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
    titulo: 'Ejercicio 3 — Gestión de Stock de Componentes Críticos',
    nivel: '⭐⭐⭐',
    temas: ['HashMap', 'Excepciones Personalizadas'],
    tiempo: '30 min',
    enunciado: `
<div class="exam-header">
  <h3 style="color:var(--orange); border-bottom:2px solid var(--orange); padding-bottom:5px;">EXAMEN PRÁCTICO: Almacén y Control de Excepciones</h3>
</div>

<p>La empresa <b>"HardwarePro Industries"</b> necesita un sistema para controlar el stock de componentes. El sistema debe ser capaz de buscar productos rápidamente y gestionar errores de forma controlada.</p>

<div class="code-exercise-desc">
  <h4>1. Estructura de Datos y Errores</h4>
  <ul>
    <li>Crea la clase <b>Producto</b> con atributos privados <code>id</code> (String) y <code>descripcion</code> (String).</li>
    <li>Implementa constructores, getters, setters y <code>toString()</code>.</li>
    <li>Diseña una excepción personalizada llamada <b>StockException</b> que herede de <code>Exception</code>. El constructor de la excepción debe aceptar un mensaje informativo.</li>
  </ul>
</div>

<div class="code-exercise-desc">
  <h4>2. Gestión del Inventario (HashMap)</h4>
  <ul>
    <li>En la clase <code>Main</code>, declara un <b>HashMap&lt;String, Producto&gt;</b> donde la clave sea el <code>id</code> del producto.</li>
    <li>Implementa un método estático <code>obtenerProducto(String id)</code> que busque en el mapa. Si el producto no existe, debe lanzar una <b>StockException</b> con el mensaje de error correspondiente.</li>
  </ul>
</div>

<div class="code-exercise-desc">
  <h4>3. Prueba de Concepto (Clase Main)</h4>
  <ul>
    <li>En el <code>main</code>, añade 3 productos de prueba al inventario.</li>
    <li>Solicita una búsqueda de un producto inexistente y gestiona la excepción mediante un bloque <b>try-catch</b>, imprimiendo el mensaje de error por el canal <code>System.err</code>.</li>
  </ul>
</div>`,

    pistas: [
      '💡 containsKey() del HashMap ayuda a saber si existe una clave.',
    ],

    solucion: `class StockException extends Exception {
    public StockException(String mensaje) { super(mensaje); }
}

class Producto {
    private String id;
    private String descripcion;

    public Producto(String id, String descripcion) {
        this.id = id;
        this.descripcion = descripcion;
    }

    public String getId() { return id; }
    public String getDescripcion() { return descripcion; }

    @Override
    public String toString() {
        return "ID: " + id + " | Producto: " + descripcion;
    }
}

public class Main {
    private static java.util.HashMap<String, Producto> inventario = new java.util.HashMap<>();

    public static void obtenerProducto(String id) throws StockException {
        if (!inventario.containsKey(id)) {
            throw new StockException("Error: El producto con ID " + id + " no se encuentra en el almacén");
        }
        System.out.println("Búsqueda exitosa: " + inventario.get(id));
    }

    public static void main(String[] args) {
        // Añadir productos de prueba
        inventario.put("P001", new Producto("P001", "Procesador i7"));
        inventario.put("P002", new Producto("P002", "Memoria RAM 16GB"));
        inventario.put("P003", new Producto("P003", "Disco SSD 1TB"));

        try {
            obtenerProducto("P999"); // Intento de búsqueda fallida
        } catch (StockException e) {
            System.err.println(e.getMessage());
        }
    }
}`,

    criterios: ['HashMap', 'Excepción personalizada', 'Cláusula throws'],
    checks: [
      (c) => /HashMap\s*<\s*String\s*,\s*Producto\s*>/i.test(c),
      (c) => /class\s+StockException\s+extends\s+Exception/i.test(c),
      (c) => /throws\s+StockException/i.test(c)
    ]
  },

  {
    id: 'ej_sim2_2',
    titulo: 'Ejercicio 4 — Control de Acceso y Aforo en Convención Tecnológica',
    nivel: '⭐⭐',
    temas: ['HashSet', 'Control de Duplicados'],
    tiempo: '20 min',
    enunciado: `
<div class="exam-header">
  <h3 style="color:var(--green); border-bottom:2px solid var(--green); padding-bottom:5px;">EXAMEN PRÁCTICO: Control de Duplicados con HashSet</h3>
</div>

<p>La organización de la <b>"DAW-Conf 2026"</b> necesita un sistema de registro rápido para los asistentes. Es crítico evitar que una misma persona se registre dos veces con el mismo correo electrónico.</p>

<div class="code-exercise-desc">
  <h4>1. Estructura de Datos y Excepciones</h4>
  <ul>
    <li>Usa un <b>HashSet&lt;String&gt;</b> para almacenar los correos de los asistentes confirmados.</li>
    <li>Implementa una lógica de registro que intente añadir un correo. Si el método <code>add()</code> devuelve <code>false</code>, debe lanzar una excepción personalizada <b>RegistroDuplicadoException</b> con el mensaje "El asistente con email [email] ya ha sido registrado previamente".</li>
  </ul>
</div>

<div class="code-exercise-desc">
  <h4>2. Prueba de Concepto (Clase Main)</h4>
  <ul>
    <li>Muestra por consola un mensaje de éxito ("Asistente registrado: [email]") o captura la excepción y muestra el error.</li>
    <li>Al finalizar el registro, imprime el número total de asistentes únicos usando el método <code>size()</code> del conjunto.</li>
  </ul>
</div>`,

    solucion: `class RegistroDuplicadoException extends Exception {
    public RegistroDuplicadoException(String msg) { super(msg); }
}

public class Main {
    public static void main(String[] args) {
        java.util.HashSet<String> asistentes = new java.util.HashSet<>();
        
        try {
            registrarAsistente("asistente1@email.com", asistentes);
            registrarAsistente("asistente2@email.com", asistentes);
            registrarAsistente("asistente1@email.com", asistentes); // Duplicado
        } catch (RegistroDuplicadoException e) {
            System.err.println(e.getMessage());
        }
        
        System.out.println("Total asistentes únicos: " + asistentes.size());
    }

    public static void registrarAsistente(String email, java.util.HashSet<String> set) throws RegistroDuplicadoException {
        if (!set.add(email)) {
            throw new RegistroDuplicadoException("El asistente con email " + email + " ya ha sido registrado previamente");
        }
        System.out.println("Asistente registrado: " + email);
    }
}`,
    criterios: ['HashSet', 'Control de retorno de add()', 'Exception'],
    checks: [
      (c) => /HashSet\s*<\s*String\s*>/i.test(c),
      (c) => /throw\s+new\s+RegistroDuplicadoException/i.test(c)
    ]
  },

  {
    id: 'ej_final1',
    titulo: 'Ejercicio 5 — Sistema de Reservas y Auditoría del Grand Hotel Palace',
    nivel: '⭐⭐⭐⭐',
    temas: ['Ficheros', 'Encapsulación', 'Herencia', 'Polimorfismo'],
    tiempo: '45 min',
    enunciado: `
<div class="exam-header">
  <h3 style="color:var(--red); border-bottom:2px solid var(--red); padding-bottom:5px;">CASO FINAL A: Gestión de Reservas y Persistencia</h3>
</div>

<p>El <b>"Grand Hotel Palace"</b> requiere una aplicación para gestionar sus reservas y generar un informe de auditoría en un fichero de texto. Se debe asegurar la correcta jerarquía de habitaciones y el manejo de errores de E/S.</p>

<div class="code-exercise-desc">
  <h4>1. Jerarquía de Habitaciones</h4>
  <ul>
    <li>Crea la interfaz <b>Reservable</b> con el método: <code>double calcularPrecio(int noches)</code>.</li>
    <li>Crea la clase abstracta <b>Habitacion</b> que implemente <b>Reservable</b>. Atributos privados: <code>id</code> (String) y <code>precioBase</code> (double).</li>
    <li>Crea la subclase <b>Suite</b> que herede de Habitacion. Las suites tienen un recargo fijo del 20% sobre el precio base.</li>
    <li>Aplica <b>encapsulación</b> y sobrescribe <code>toString()</code> para mostrar la identificación de la habitación.</li>
  </ul>
</div>

<div class="code-exercise-desc">
  <h4>2. Auditoría y Persistencia (Ficheros)</h4>
  <ul>
    <li>En el <code>main</code>, crea una lista <code>ArrayList&lt;Habitacion&gt;</code> y añade varias habitaciones (Suites y normales).</li>
    <li>Implementa una lógica que recorra la lista y escriba en un fichero llamado <b>"auditoria.txt"</b> una línea por cada reserva con el formato: <code>"Habitacion [id] - Total: [precio]€"</code>.</li>
    <li>Es obligatorio el uso de <b>BufferedWriter</b> y la gestión de la excepción <b>IOException</b> mediante bloques <b>try-with-resources</b>.</li>
  </ul>
</div>`,

    solucion: `interface Reservable { 
    double calcularPrecio(int noches); 
}

abstract class Habitacion implements Reservable {
    private String id;
    private double precioBase;

    public Habitacion(String id, double precioBase) {
        this.id = id;
        this.precioBase = precioBase;
    }

    public String getId() { return id; }
    public double getPrecioBase() { return precioBase; }

    @Override
    public String toString() {
        return "Habitación: " + id;
    }
}

class Suite extends Habitacion {
    public Suite(String id, double precioBase) {
        super(id, precioBase);
    }

    @Override
    public double calcularPrecio(int noches) {
        return (getPrecioBase() * noches) * 1.20; // Recargo del 20%
    }
}

public class Main {
    public static void main(String[] args) {
        java.util.ArrayList<Habitacion> hotel = new java.util.ArrayList<>();
        hotel.add(new Suite("S-101", 150.0));
        hotel.add(new Suite("S-102", 200.0));
        
        try (java.io.BufferedWriter bw = new java.io.BufferedWriter(new java.io.FileWriter("auditoria.txt"))) {
            for (Habitacion h : hotel) {
                double total = h.calcularPrecio(3); // Ejemplo con 3 noches
                bw.write("Habitacion " + h.getId() + " - Total: " + total + "€");
                bw.newLine();
            }
            System.out.println("Informe de auditoría generado con éxito.");
        } catch (java.io.IOException e) {
            System.err.println("Error crítico de E/S: " + e.getMessage());
        }
    }
}`,
    criterios: ['BufferedWriter', 'IOException', 'Polimorfismo', 'Encapsulación'],
    checks: [
      (c) => /BufferedWriter/i.test(c) && /FileWriter/i.test(c),
      (c) => /catch\s*\(\s*IOException\s+\w+\s*\)/i.test(c) || /try\s*\(\s*BufferedWriter\s*\)/i.test(c),
      (c) => /private\s+double\s+precioBase/i.test(c)
    ]
  },

  {
    id: 'ej_final2',
    titulo: 'Ejercicio 6 — Sistema de Triaje y Resolución de Incidencias Técnicas',
    nivel: '⭐⭐⭐',
    temas: ['Estructuras Dinámicas', 'FIFO/LIFO'],
    tiempo: '20 min',
    enunciado: `
<div class="exam-header">
  <h3 style="color:var(--blue); border-bottom:2px solid var(--blue); padding-bottom:5px;">CASO FINAL B: Estructuras Lineales (Pilas y Colas)</h3>
</div>

<p>El departamento de soporte de <b>"FixIt-Fast Services"</b> necesita una herramienta para gestionar las incidencias de sus clientes. Se deben usar estructuras de datos lineales para priorizar y resolver los tickets de forma eficiente.</p>

<div class="code-exercise-desc">
  <h4>1. Requisitos del Sistema de Triaje</h4>
  <ul>
    <li>Crea la clase <b>Ticket</b> con atributos: <code>id</code> (int) y <code>descripcion</code> (String).</li>
    <li><b>Gestión de Entrada (Cola)</b>: Usa una <code>LinkedList</code> como <b>Queue</b> para almacenar los tickets según van llegando. Implementa un método <code>recibirTicket(Ticket t)</code>.</li>
    <li><b>Gestión de Urgencias (Pila)</b>: Si un ticket es marcado como "URGENTE", debe almacenarse en una <code>Stack</code> para ser resuelto el primero (LIFO).</li>
  </ul>
</div>

<div class="code-exercise-desc">
  <h4>2. Prueba de Concepto (Clase Main)</h4>
  <ul>
    <li><b>Simulación de Resolución</b>: Implementa un bucle que extraiga y muestre los tickets de la pila de urgencias hasta que esté vacía, y luego proceda con la cola convencional.</li>
    <li>Muestra por consola el orden de resolución de al menos 5 tickets (2 urgentes y 3 normales).</li>
  </ul>
</div>`,

    solucion: `class Ticket {
    int id;
    String descripcion;
    public Ticket(int id, String d) { this.id = id; this.descripcion = d; }
    @Override public String toString() { return "Ticket #" + id + ": " + descripcion; }
}

public class Main {
    public static void main(String[] args) {
        java.util.Queue<Ticket> colaNormal = new java.util.LinkedList<>();
        java.util.Stack<Ticket> pilaUrgente = new java.util.Stack<>();

        // Simulación de entrada de tickets
        colaNormal.offer(new Ticket(1, "Fallo conexión"));
        pilaUrgente.push(new Ticket(2, "CAÍDA SERVIDOR [URGENTE]"));
        colaNormal.offer(new Ticket(3, "Cambio contraseña"));
        pilaUrgente.push(new Ticket(4, "INCENDIO CPD [URGENTE]"));
        colaNormal.offer(new Ticket(5, "Consulta técnica"));

        System.out.println("--- RESOLVIENDO URGENCIAS (LIFO) ---");
        while (!pilaUrgente.isEmpty()) {
            System.out.println("Procesando: " + pilaUrgente.pop());
        }

        System.out.println("\\n--- RESOLVIENDO NORMALES (FIFO) ---");
        while (!colaNormal.isEmpty()) {
            System.out.println("Procesando: " + colaNormal.poll());
        }
    }
}`,
    criterios: ['Queue/LinkedList', 'Stack', 'poll() y push()', 'pop()'],
    checks: [
      (c) => /Queue\s*<\s*Ticket\s*>/i.test(c) && /LinkedList/i.test(c),
      (c) => /Stack\s*<\s*Ticket\s*>/i.test(c),
      (c) => /\.pop\s*\(\s*\)/i.test(c)
    ]
  }
];
