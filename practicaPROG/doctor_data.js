const DOCTOR_EXERCISES_MODIFIED = [
  {
    id: 'dr_ej_1_1',
    titulo: `Dr. Java: Encapsulacion - Ej 1`,
    nivel: '⭐⭐',
    temas: ["Encapsulacion"],
    tiempo: '15 min',
    enunciado: `Crea una clase CuentaBancaria con los siguientes atributos privados:

    •   saldo (double)

    •   titular (String)

Implementa los siguientes métodos públicos:

    1. depositar(double cantidad): Aumenta el saldo en la cantidad especificada.

    2. retirar(double cantidad): Disminuye el saldo solo si hay fondos suficientes.

    3. getSaldo(): Retorna el saldo actual.

    4. getTitular() y setTitular(String titular): Para obtener y modificar el titular de la cuenta.

Prueba desde la clase main todos los métodos de la clase CuentaBancaria.`,
    pistas: ["Analiza bien los requisitos antes de programar.", "Revisa tus nombres de variables."],
    solucion: `Crea una clase CuentaBancaria con los siguientes atributos privados:

    •   saldo (double)

    •   titular (String)

Implementa los siguientes métodos públicos:

    1. depositar(double cantidad): Aumenta el saldo en la cantidad especificada.

    2. retirar(double cantidad): Disminuye el saldo solo si hay fondos suficientes.

    3. getSaldo(): Retorna el saldo actual.

    4. getTitular() y setTitular(String titular): Para obtener y modificar el titular de la cuenta.

Prueba desde la clase main todos los métodos.

 class CuentaBancaria {
    private double saldo;
    private String titular;

   public void setTitular(String nuevoTitular) {
     titular = nuevoTitular;
   }

   public String getTitular() {
     return titular;
   }

   public void setSaldo(double nuevoSaldo) {
     if (saldo &gt;= 0) {
         saldo = nuevoSaldo;
     } else {
         System.out.println("El saldo no puede ser negativo. Se establece en 0.");
         saldo = 0;
     }
   }

   public double getSaldo() {
     return saldo;
   }

   // Método para depositar dinero
   public void depositar(double cantidad) {
      if (cantidad &gt; 0) {
          saldo += cantidad;
          System.out.println("Depósito exitoso. Nuevo saldo: " + saldo);
      } else {
          System.out.println("La cantidad a depositar debe ser positiva.");
      }
     }

     // Método para retirar dinero
     public void retirar(double cantidad) {
        if (cantidad &gt; 0 && cantidad &lt;= saldo) {
            saldo -= cantidad;
            System.out.println("Retiro exitoso. Nuevo saldo: " + saldo);
        } else {
            System.out.println("Fondos insuficientes o cantidad inválida.");
        }
     }

     // Método para mostrar información de la cuenta
     public void mostrarInfo() {
        System.out.println("Titular: " + titular);
        System.out.println("Saldo actual: " + saldo);
     }
 }

 public class Main {
   public static void main(String[] args) {
     // Instancia una cuenta bancaria
     CuentaBancaria cuenta = new CuentaBancaria();

         // Establecer valores con setters
         cuenta.setTitular("Juan Pérez");
         cuenta.setSaldo(1000);

         // Mostrar información de la cuenta
         cuenta.mostrarInfo();

         // Realizar transacciones
         cuenta.depositar(500);
         cuenta.retirar(300);
         cuenta.retirar(2000); // Intento de retiro fallido

         // Mostrar saldo final
         cuenta.mostrarInfo();
     }
 }`,
    criterios: ["Define la clase CuentaBancaria", "Define la clase main", "Define la clase Main", "Implementa el m\u00e9todo depositar", "Implementa el m\u00e9todo getTitular", "Implementa el m\u00e9todo setTitular"],
    checks: [
       (c) =>  /class\s+CuentaBancaria/i.test(c),
       (c) =>  /class\s+main/i.test(c),
       (c) =>  /class\s+Main/i.test(c),
       (c) =>  /depositar\s*\(/i.test(c),
       (c) =>  /getTitular\s*\(/i.test(c),
       (c) =>  /setTitular\s*\(/i.test(c)
    ]
  },
  {
    id: 'dr_ej_1_2',
    titulo: `Dr. Java: Encapsulacion - Ej 2`,
    nivel: '⭐⭐',
    temas: ["Encapsulacion"],
    tiempo: '15 min',
    enunciado: `Crea una clase Estudiante que tenga los siguientes atributos privados:

    •   nombre (String)

    •   edad (int)

    •   calificacion (double)

Implementa los siguientes métodos públicos:

    1. getNombre() y setNombre(String nombre): Para obtener y modificar el nombre.

    2. getEdad() y setEdad(int edad): La edad solo puede ser mayor o igual a 0.

    3. getCalificacion() y setCalificacion(double calificacion): Debe estar entre 0 y 10.

    4. mostrarInfo(): Imprime los datos del estudiante.

Prueba desde la clase main todos los métodos de la clase Estudiante.`,
    pistas: ["Analiza bien los requisitos antes de programar.", "Revisa tus nombres de variables."],
    solucion: `Crea una clase Estudiante que tenga los siguientes atributos privados:

     •     nombre (String)

     •     edad (int)

     •     calificacion (double)
Implementa los siguientes métodos públicos:

     1. getNombre() y setNombre(String nombre): Para obtener y modificar el nombre.

     2. getEdad() y setEdad(int edad): La edad solo puede ser mayor o igual a 0.

     3. getCalificacion() y setCalificacion(double calificacion): Debe estar entre 0 y 10.

     4. mostrarInfo(): Imprime los datos del estudiante.

Prueba desde la clase main todos los métodos.

 class Estudiante {
    private String nombre;
    private int edad;
    private double calificacion;

     public void setNombre(String nuevoNombre) {
       nombre = nuevoNombre;
     }

     public String getNombre() {
       return nombre;
     }

     public void setEdad(int nuevoValor) {
       edad = nuevoValor;
     }

     public int getEdad() {
       return edad;
     }

     public void setCalificacion(double nuevoValor) {
       calificacion = nuevoValor;
     }

     public double getCalificacion() {
       return calificacion;
     }

     public void mostrarInfo() {
       System.out.println("Nombre: " + nombre);
       System.out.println("Edad: " + edad);
       System.out.println("Calificación: " + calificacion);
     }
 }

 public class Main {
   public static void main(String[] args) {
     // Instanciar un estudiante
     Estudiante estudiante1 = new Estudiante();

       // Establecer valores usando setters
         estudiante1.setNombre("Carlos Pérez");
         estudiante1.setEdad(18);
         estudiante1.setCalificacion(9.2);

         // Mostrar información
         estudiante1.mostrarInfo();
     }
 }`,
    criterios: ["Define la clase main", "Define la clase Main", "Define la clase Estudiante", "Implementa el m\u00e9todo mostrarInfo", "Implementa el m\u00e9todo getEdad", "Implementa el m\u00e9todo setNombre"],
    checks: [
       (c) =>  /class\s+main/i.test(c),
       (c) =>  /class\s+Main/i.test(c),
       (c) =>  /class\s+Estudiante/i.test(c),
       (c) =>  /mostrarInfo\s*\(/i.test(c),
       (c) =>  /getEdad\s*\(/i.test(c),
       (c) =>  /setNombre\s*\(/i.test(c)
    ]
  },
  {
    id: 'dr_ej_1_3',
    titulo: `Dr. Java: Encapsulacion - Ej 3`,
    nivel: '⭐⭐',
    temas: ["Encapsulacion"],
    tiempo: '15 min',
    enunciado: `Crea una clase Libro con los siguientes atributos privados:

    •   titulo (String)

    •   autor (String)

    •   disponible (boolean)

Y los siguientes métodos públicos:

    1. setTitulo(String titulo), getTitulo().
    2. setAutor(String autor), getAutor().

    3. setDisponible(boolean disponible), getDisponible().

    4. prestar(): Marca el libro como no disponible si está disponible.

    5. devolver(): Marca el libro como disponible si estaba prestado.

    6. mostrarInfo(): Muestra los datos del libro.

Prueba desde la clase main todos los métodos de la clase Libro.`,
    pistas: ["Analiza bien los requisitos antes de programar.", "Revisa tus nombres de variables."],
    solucion: `Crea una clase Libro con los siguientes atributos privados:

     •     titulo (String)

     •     autor (String)

     •     disponible (boolean)

Y los siguientes métodos públicos:

     1. setTitulo(String titulo), getTitulo().

     2. setAutor(String autor), getAutor().

     3. setDisponible(boolean disponible), getDisponible().

     4. prestar(): Marca el libro como no disponible si está disponible.

     5. devolver(): Marca el libro como disponible si estaba prestado.

     6. mostrarInfo(): Muestra los datos del libro.

Prueba desde la clase main todos los métodos.

 class Libro {
    private String titulo;
    private String autor;
    private boolean disponible;

     public void setTitulo(String t) {
       titulo = t;
     }

     public String getTitulo() {
       return titulo;
     }

     public void setAutor(String a) {
       autor = a;
     }

     public String getAutor() {
        return autor;
    }

    public void setDisponible(boolean d) {
      disponible = d;
    }

    public boolean getDisponible() {
      return disponible;
    }

    public void prestar() {
      if (disponible) {
          System.out.println("El libro \"" + titulo + "\" está disponible.");
          disponible = false;
      } else {
          System.out.println("El libro \"" + titulo + "\" ya está prestado.");
      }
    }

    public void devolver() {
      if (!disponible) {
          System.out.println("El libro \"" + titulo + "\" ha sido devuelto.");
          disponible = true;
      } else {
          System.out.println("El libro \"" + titulo + "\" ya estaba disponible.");
      }
    }

    public void mostrarInfo() {
      System.out.println("Título: " + titulo);
      System.out.println("Autor: " + autor);
      System.out.println("Disponible: " + (disponible ? "Sí" : "No"));
    }
}

public class Main {
  public static void main(String[] args) {
    // Crear un libro sin constructor
    Libro libro1 = new Libro();

        // Establecer valores con setters
        libro1.setTitulo("Cien años de soledad");
        libro1.setAutor("Gabriel García Márquez");
        libro1.setDisponible(true);

        // Mostrar información inicial
        libro1.mostrarInfo();

        // Intentar prestar y devolver el libro
        libro1.prestar();
        libro1.prestar(); // Intento de prestar nuevamente
         libro1.devolver();
         libro1.devolver(); // Intento de devolver nuevamente

         // Mostrar información final
         libro1.mostrarInfo();
     }
 }`,
    criterios: ["Define la clase main", "Define la clase Main", "Define la clase Libro", "Implementa el m\u00e9todo getAutor", "Implementa el m\u00e9todo getTitulo", "Implementa el m\u00e9todo mostrarInfo"],
    checks: [
       (c) =>  /class\s+main/i.test(c),
       (c) =>  /class\s+Main/i.test(c),
       (c) =>  /class\s+Libro/i.test(c),
       (c) =>  /getAutor\s*\(/i.test(c),
       (c) =>  /getTitulo\s*\(/i.test(c),
       (c) =>  /mostrarInfo\s*\(/i.test(c)
    ]
  },
  {
    id: 'dr_ej_1_4',
    titulo: `Dr. Java: Encapsulacion - Ej 4`,
    nivel: '⭐⭐',
    temas: ["Encapsulacion"],
    tiempo: '15 min',
    enunciado: `Crea una clase Automovil con los siguientes atributos privados:

    •   marca (String)

    •   modelo (String)

    •   velocidad (int)

Y los siguientes métodos públicos:

    1. setMarca(String marca), getMarca().

    2. setModelo(String modelo), getModelo().

    3. setVelocidad(int velocidad), getVelocidad(). (La velocidad no puede ser negativa).

    4. acelerar(int incremento): Aumenta la velocidad en la cantidad indicada.

    5. frenar(int decremento): Disminuye la velocidad, pero sin quedar negativa.

    6. mostrarInfo(): Muestra los datos del automóvil.

Prueba desde la clase main todos los métodos de la clase Automovil.`,
    pistas: ["Analiza bien los requisitos antes de programar.", "Revisa tus nombres de variables."],
    solucion: `Crea una clase Automovil con los siguientes atributos privados:

     •     marca (String)

     •     modelo (String)

     •     velocidad (int)

Y los siguientes métodos públicos:

     1. setMarca(String marca), getMarca().

     2. setModelo(String modelo), getModelo().

     3. setVelocidad(int velocidad), getVelocidad(). (La velocidad no puede ser negativa).

     4. acelerar(int incremento): Aumenta la velocidad en la cantidad indicada.

     5. frenar(int decremento): Disminuye la velocidad, pero sin quedar negativa.

     6. mostrarInfo(): Muestra los datos del automóvil.

Prueba desde la clase main todos los métodos.

 class Automovil {
    private String marca;
    private String modelo;
    private int velocidad;

     public void setMarca(String m) {
       marca = m;
     }

     public String getMarca() {
       return marca;
     }

     public void setModelo(String mod) {
       modelo = mod;
     }

     public String getModelo() {
       return modelo;
     }
    public void setVelocidad(int v) {
        velocidad = v;
    }

    public int getVelocidad() {
      return velocidad;
    }

  public void acelerar(int incremento) {
      velocidad += incremento;
      System.out.println("El automóvil ha acelerado. Nueva velocidad: " + velocidad + "
km/h");
  }

  public void frenar(int decremento) {
         velocidad -= decremento;
         System.out.println("El automóvil ha frenado. Nueva velocidad: " + velocidad + "
km/h");
  }

    public void mostrarInfo() {
      System.out.println("Marca: " + marca);
      System.out.println("Modelo: " + modelo);
      System.out.println("Velocidad actual: " + velocidad + " km/h");
    }
}

public class Main {
  public static void main(String[] args) {
    Automovil auto1 = new Automovil();

        auto1.setMarca("Toyota");
        auto1.setModelo("Corolla");
        auto1.setVelocidad(50);

        auto1.mostrarInfo();

        auto1.acelerar(30);
        auto1.frenar(60);
        auto1.frenar(10); // Intento de frenar cuando está en 0

        auto1.mostrarInfo();
    }
}`,
    criterios: ["Define la clase Automovil", "Define la clase main", "Define la clase Main", "Implementa el m\u00e9todo frenar", "Implementa el m\u00e9todo mostrarInfo", "Implementa el m\u00e9todo setVelocidad"],
    checks: [
       (c) =>  /class\s+Automovil/i.test(c),
       (c) =>  /class\s+main/i.test(c),
       (c) =>  /class\s+Main/i.test(c),
       (c) =>  /frenar\s*\(/i.test(c),
       (c) =>  /mostrarInfo\s*\(/i.test(c),
       (c) =>  /setVelocidad\s*\(/i.test(c)
    ]
  },
  {
    id: 'dr_ej_2_1',
    titulo: `Dr. Java: Herencia - Ej 1`,
    nivel: '⭐⭐',
    temas: ["Herencia"],
    tiempo: '15 min',
    enunciado: `Crea una clase base Figura con un método dibujar() que imprima "Dibujando una figura
genérica".

Crea dos subclases:

    •   Circulo, que sobrescriba dibujar() e imprima "Dibujando un círculo".

    •   Cuadrado, que sobrescriba dibujar() e imprima "Dibujando un cuadrado".

En main(), crea un objeto de Circulo y otro de Cuadrado, y llama a sus métodos dibujar()
individualmente.`,
    pistas: ["Analiza bien los requisitos antes de programar.", "Revisa tus nombres de variables."],
    solucion: `Crea una clase base Figura con un método dibujar() que imprima "Dibujando una figura
genérica".

Crea dos subclases:

     •     Circulo, que sobrescriba dibujar() e imprima "Dibujando un círculo".

     •     Cuadrado, que sobrescriba dibujar() e imprima "Dibujando un cuadrado".

En main(), crea un objeto de Circulo y otro de Cuadrado, y llama a sus métodos dibujar()
individualmente.

 // Clase base
 class Figura {
    void dibujar() {
      System.out.println("Dibujando una figura genérica");
    }
 }

 // Subclase Circulo
 class Circulo extends Figura {
    void dibujar() {
      System.out.println("Dibujando un círculo");
    }
 }

 // Subclase Cuadrado
 class Cuadrado extends Figura {
    void dibujar() {
      System.out.println("Dibujando un cuadrado");
    }
 }

 // Clase principal
 public class Main {
    public static void main(String[] args) {
      Figura f1 = new Circulo();
      f1.dibujar();

         Figura f2 = new Cuadrado();
         f2.dibujar();
     }
 }`,
    criterios: ["Define la clase Main", "Define la clase Cuadrado", "Define la clase Circulo", "Implementa el m\u00e9todo dibujar"],
    checks: [
       (c) =>  /class\s+Main/i.test(c),
       (c) =>  /class\s+Cuadrado/i.test(c),
       (c) =>  /class\s+Circulo/i.test(c),
       (c) =>  /dibujar\s*\(/i.test(c)
    ]
  },
  {
    id: 'dr_ej_2_2',
    titulo: `Dr. Java: Herencia - Ej 2`,
    nivel: '⭐⭐',
    temas: ["Herencia"],
    tiempo: '15 min',
    enunciado: `Crea una clase base Empleado con un método calcularSalario() que imprima "Salario base de un
empleado".

Crea dos subclases:

    •   EmpleadoTiempoCompleto, que sobrescriba calcularSalario() e imprima "Salario de
        tiempo completo: 1000 €".

    •   EmpleadoMedioTiempo, que sobrescriba calcularSalario() e imprima "Salario de medio
        tiempo: 500 €".

En main(), crea un objeto de EmpleadoTiempoCompleto y otro de EmpleadoMedioTiempo, y
llama a sus métodos calcularSalario() individualmente.`,
    pistas: ["Analiza bien los requisitos antes de programar.", "Revisa tus nombres de variables."],
    solucion: `Crea una clase base Empleado con un método calcularSalario() que imprima "Salario base de un
empleado".
Crea dos subclases:

     •     EmpleadoTiempoCompleto, que sobrescriba calcularSalario() e imprima "Salario de
           tiempo completo: 1000 €".

     •     EmpleadoMedioTiempo, que sobrescriba calcularSalario() e imprima "Salario de medio
           tiempo: 500 €".

En main(), crea un objeto de EmpleadoTiempoCompleto y otro de EmpleadoMedioTiempo, y
llama a sus métodos calcularSalario() individualmente.

 // Clase base
 class Empleado {
    void calcularSalario() {
      System.out.println("Salario base de un empleado");
    }
 }

 // Subclase EmpleadoTiempoCompleto
 class EmpleadoTiempoCompleto extends Empleado {
    void calcularSalario() {
      System.out.println("Salario de tiempo completo: 1000 €");
    }
 }

 // Subclase EmpleadoMedioTiempo
 class EmpleadoMedioTiempo extends Empleado {
    void calcularSalario() {
      System.out.println("Salario de medio tiempo: 500 €");
    }
 }

 // Clase principal
 public class Main {
    public static void main(String[] args) {
      Empleado e1 = new EmpleadoTiempoCompleto();
      e1.calcularSalario();

         Empleado e2 = new EmpleadoMedioTiempo();
         e2.calcularSalario();
     }
 }`,
    criterios: ["Define la clase Main", "Define la clase Empleado", "Define la clase EmpleadoTiempoCompleto", "Implementa el m\u00e9todo calcularSalario"],
    checks: [
       (c) =>  /class\s+Main/i.test(c),
       (c) =>  /class\s+Empleado/i.test(c),
       (c) =>  /class\s+EmpleadoTiempoCompleto/i.test(c),
       (c) =>  /calcularSalario\s*\(/i.test(c)
    ]
  },
  {
    id: 'dr_ej_2_3',
    titulo: `Dr. Java: Herencia - Ej 3`,
    nivel: '⭐⭐',
    temas: ["Herencia"],
    tiempo: '15 min',
    enunciado: `Crea una clase base Instrumento con un método tocar() que imprima "Sonido genérico de un
instrumento".

Crea dos subclases:

    •   Guitarra, que sobrescriba tocar() e imprima "Sonido de guitarra: Strum Strum".

    •   Piano, que sobrescriba tocar() e imprima "Sonido de piano: Plink Plink".

En main(), crea un objeto de Guitarra y otro de Piano, y llama a sus métodos tocar()
individualmente.`,
    pistas: ["Analiza bien los requisitos antes de programar.", "Revisa tus nombres de variables."],
    solucion: `Crea una clase base Instrumento con un método tocar() que imprima "Sonido genérico de un
instrumento".

Crea dos subclases:

     •     Guitarra, que sobrescriba tocar() e imprima "Sonido de guitarra: Strum Strum".

     •     Piano, que sobrescriba tocar() e imprima "Sonido de piano: Plink Plink".
En main(), crea un objeto de Guitarra y otro de Piano, y llama a sus métodos tocar()
individualmente.

 // Clase base
 class Instrumento {
    void tocar() {
      System.out.println("Sonido genérico de un instrumento");
    }
 }

 // Subclase Guitarra
 class Guitarra extends Instrumento {
    void tocar() {
      System.out.println("Sonido de guitarra: Strum Strum");
    }
 }

 // Subclase Piano
 class Piano extends Instrumento {
    void tocar() {
      System.out.println("Sonido de piano: Plink Plink");
    }
 }

 // Clase principal
 public class Main {
    public static void main(String[] args) {
      Instrumento i1 = new Guitarra();
      i1.tocar();

         Instrumento i2 = new Piano();
         i2.tocar();
     }
 }`,
    criterios: ["Define la clase Instrumento", "Define la clase Guitarra", "Define la clase Main", "Implementa el m\u00e9todo tocar"],
    checks: [
       (c) =>  /class\s+Instrumento/i.test(c),
       (c) =>  /class\s+Guitarra/i.test(c),
       (c) =>  /class\s+Main/i.test(c),
       (c) =>  /tocar\s*\(/i.test(c)
    ]
  },
  {
    id: 'dr_ej_2_4',
    titulo: `Dr. Java: Herencia - Ej 4`,
    nivel: '⭐⭐',
    temas: ["Herencia"],
    tiempo: '15 min',
    enunciado: `Crea una clase base CuentaBancaria con:

    •   Un atributo privado saldo (double).
    •   Métodos públicos depositar(double cantidad) y retirar(double cantidad), asegurando
        que el saldo no sea negativo.

    •   Un método mostrarSaldo() que imprima el saldo actual.

Crea dos subclases:

    •   CuentaAhorro, que sobrescriba retirar() y permita retirar solo si el saldo es mayor a 100.

    •   CuentaCorriente, que sobrescriba retirar() y permita retirar hasta dejar el saldo en -500
        (sobregiro).

En main(), crea una cuenta de ahorro y una cuenta corriente, realiza depósitos y retiros, e
imprime los resultados.`,
    pistas: ["Analiza bien los requisitos antes de programar.", "Revisa tus nombres de variables."],
    solucion: `Crea una clase base CuentaBancaria con:

     •     Un atributo privado saldo (double).

     •     Métodos públicos depositar(double cantidad) y retirar(double cantidad), asegurando
           que el saldo no sea negativo.

     •     Un método mostrarSaldo() que imprima el saldo actual.

Crea dos subclases:

     •     CuentaAhorro, que sobrescriba retirar() y permita retirar solo si el saldo es mayor a 100.

     •     CuentaCorriente, que sobrescriba retirar() y permita retirar hasta dejar el saldo en -500
           (sobregiro).
En main(), crea una cuenta de ahorro y una cuenta corriente, realiza depósitos y retiros, e
imprime los resultados.

 // Clase base con encapsulación
 class CuentaBancaria {
    private double saldo;

     public void depositar(double cantidad) {
       if (cantidad &gt; 0) {
           saldo += cantidad;
           System.out.println("Depósito exitoso: " + cantidad);
       } else {
           System.out.println("Cantidad inválida para depósito.");
       }
     }

     public void retirar(double cantidad) {
       if (cantidad &gt; 0 && saldo &gt;= cantidad) {
           saldo -= cantidad;
           System.out.println("Retiro exitoso: " + cantidad);
       } else {
           System.out.println("Fondos insuficientes.");
       }
     }

     public void mostrarSaldo() {
       System.out.println("Saldo actual: " + saldo);
     }

     protected double getSaldo() {
       return saldo;
     }

     protected void setSaldo(double cantidad) {
       saldo = cantidad;
     }
 }

 // Subclase CuentaAhorro con restricción de retiro
 class CuentaAhorro extends CuentaBancaria {
    public void retirar(double cantidad) {
      if (getSaldo() - cantidad &gt;= 100) {
          setSaldo(getSaldo() - cantidad);
          System.out.println("Retiro exitoso de cuenta de ahorro: " + cantidad);
      } else {
          System.out.println("No puedes retirar, saldo mínimo de 100 requerido.");
      }
    }
 }

 // Subclase CuentaCorriente con sobregiro
 class CuentaCorriente extends CuentaBancaria {
     public void retirar(double cantidad) {
       if (getSaldo() - cantidad &gt;= -500) {
           setSaldo(getSaldo() - cantidad);
           System.out.println("Retiro exitoso de cuenta corriente: " + cantidad);
       } else {
           System.out.println("Límite de sobregiro alcanzado (-500).");
       }
     }
 }

 // Clase principal
 public class Main {
    public static void main(String[] args) {
      CuentaAhorro ahorro = new CuentaAhorro();
      CuentaCorriente corriente = new CuentaCorriente();

         ahorro.depositar(500);
         ahorro.mostrarSaldo();
         ahorro.retirar(450);
         ahorro.mostrarSaldo();

         corriente.depositar(200);
         corriente.mostrarSaldo();
         corriente.retirar(600);
         corriente.mostrarSaldo();
     }
 }`,
    criterios: ["Define la clase CuentaAhorro", "Define la clase CuentaBancaria", "Define la clase CuentaCorriente", "Implementa el m\u00e9todo mostrarSaldo", "Implementa el m\u00e9todo retirar"],
    checks: [
       (c) =>  /class\s+CuentaAhorro/i.test(c),
       (c) =>  /class\s+CuentaBancaria/i.test(c),
       (c) =>  /class\s+CuentaCorriente/i.test(c),
       (c) =>  /mostrarSaldo\s*\(/i.test(c),
       (c) =>  /retirar\s*\(/i.test(c)
    ]
  },
  {
    id: 'dr_ej_2_5',
    titulo: `Dr. Java: Herencia - Ej 5`,
    nivel: '⭐⭐',
    temas: ["Herencia"],
    tiempo: '15 min',
    enunciado: `Crea una clase base Dispositivo con:

    •   Atributos privados: marca (String) y precio (double).

    •   Métodos públicos setMarca(String), getMarca(), setPrecio(double), getPrecio().

    •   Un método mostrarInfo(), que imprima la información del dispositivo.

Crea dos subclases:

    •   Smartphone, con un atributo adicional almacenamientoGB (int) y métodos
        setAlmacenamiento(int) y getAlmacenamiento().

    •   Laptop, con un atributo adicional ramGB (int) y métodos setRam(int) y getRam().

    •   Ambas sobrescriben mostrarInfo().

En main(), crea un Smartphone y una Laptop, asigna valores con los métodos set y muestra su
información.`,
    pistas: ["Analiza bien los requisitos antes de programar.", "Revisa tus nombres de variables."],
    solucion: `Crea una clase base Dispositivo con:

     •     Atributos privados: marca (String) y precio (double).

     •     Métodos públicos setMarca(String), getMarca(), setPrecio(double), getPrecio().

     •     Un método mostrarInfo(), que imprima la información del dispositivo.

Crea dos subclases:

     •     Smartphone, con un atributo adicional almacenamientoGB (int) y métodos
           setAlmacenamiento(int) y getAlmacenamiento().

     •     Laptop, con un atributo adicional ramGB (int) y métodos setRam(int) y getRam().

     •     Ambas sobrescriben mostrarInfo().

En main(), crea un Smartphone y una Laptop, asigna valores con los métodos set y muestra su
información.

 // Clase base con encapsulación
 class Dispositivo {
    private String marca;
    private double precio;
    public void setMarca(String m) {
      marca = m;
    }

    public String getMarca() {
      return marca;
    }

    public void setPrecio(double p) {
      if (p &gt; 0) {
          precio = p;
      }
    }

    public double getPrecio() {
      return precio;
    }

    public void mostrarInfo() {
      System.out.println("Marca: " + marca + ", Precio: " + precio);
    }
}

// Subclase Smartphone
class Smartphone extends Dispositivo {
   private int almacenamientoGB;

    public void setAlmacenamiento(int a) {
      if (a &gt; 0) {
          almacenamientoGB = a;
      }
    }

    public int getAlmacenamiento() {
      return almacenamientoGB;
    }

    public void mostrarInfo() {
      super.mostrarInfo();
      System.out.println("Almacenamiento: " + almacenamientoGB + " GB");
    }
}

// Subclase Laptop
class Laptop extends Dispositivo {
   private int ramGB;

    public void setRam(int r) {
      if (r &gt; 0) {
          ramGB = r;
      }
    }

    public int getRam() {
      return ramGB;
    }

    public void mostrarInfo() {
      super.mostrarInfo();
      System.out.println("RAM: " + ramGB + " GB");
    }
}

// Clase principal
public class Main {
   public static void main(String[] args) {
     Smartphone phone = new Smartphone();
     phone.setMarca("Samsung");
     phone.setPrecio(899.99);
     phone.setAlmacenamiento(128);

        Laptop laptop = new Laptop();
        laptop.setMarca("Dell");
        laptop.setPrecio(1299.99);
        laptop.setRam(16);

        phone.mostrarInfo();
        laptop.mostrarInfo();
    }
}`,
    criterios: ["Define la clase Laptop", "Define la clase Dispositivo", "Define la clase Smartphone", "Implementa el m\u00e9todo getRam", "Implementa el m\u00e9todo mostrarInfo"],
    checks: [
       (c) =>  /class\s+Laptop/i.test(c),
       (c) =>  /class\s+Dispositivo/i.test(c),
       (c) =>  /class\s+Smartphone/i.test(c),
       (c) =>  /getRam\s*\(/i.test(c),
       (c) =>  /mostrarInfo\s*\(/i.test(c)
    ]
  },
  {
    id: 'dr_ej_3_1',
    titulo: `Dr. Java: Modificadores de acceso - Ej 1`,
    nivel: '⭐⭐',
    temas: ["Modificadores de acceso"],
    tiempo: '15 min',
    enunciado: `Crea un sistema de biblioteca con clases relacionadas, donde se utilizan distintos modificadores
de acceso para controlar la visibilidad de los atributos y métodos. Para ello:

    1. Crea una clase base Libro con los siguientes atributos:

              o   titulo (String) private

              o   autor (String) private

              o   anoPublicacion (int) protected

              o   precio (double) default (sin modificador)

        Métodos en Libro:

              o   Un método public mostrarInformacion() que imprime el título y el autor.

              o   Un método private calcularPrecioConDescuento() que calcula un descuento del
                  10% sobre el precio y lo imprime.

    2. Crea una subclase LibroDigital que herede de Libro y tenga:

              o   Un atributo adicional tamanoMB (double) private.

              o   Un método public mostrarInformacionDigital() que imprima el tamaño del
                  archivo digital y llame a mostrarInformacion().

    3. Crea una clase Biblioteca que tenga un atributo default cantidadLibros (int).

              o   En Biblioteca, crea un método public agregarLibro(Libro libro) para agregar un
                  libro a la biblioteca.

              o   Dentro de la misma clase, crea un método protected mostrarCantidadLibros()
                  que imprima la cantidad de libros en la biblioteca.

    4. En main(), crea instancias de Libro y LibroDigital, y utiliza los métodos públicos,
       protegidos y privados adecuadamente.`,
    pistas: ["Analiza bien los requisitos antes de programar.", "Revisa tus nombres de variables."],
    solucion: `Crea un sistema de biblioteca con clases relacionadas, donde se utilizan distintos modificadores
de acceso para controlar la visibilidad de los atributos y métodos. Para ello:

    1. Crea una clase base Libro con los siguientes atributos:

              o   titulo (String) private

              o   autor (String) private

              o   anoPublicacion (int) protected

              o   precio (double) default (sin modificador)

        Métodos en Libro:

              o   Un método public mostrarInformacion() que imprime el título y el autor.

              o   Un método private calcularPrecioConDescuento() que calcula un descuento del
                  10% sobre el precio y lo imprime.

    2. Crea una subclase LibroDigital que herede de Libro y tenga:

              o   Un atributo adicional tamanoMB (double) private.

              o   Un método public mostrarInformacionDigital() que imprima el tamaño del
                  archivo digital y llame a mostrarInformacion().

    3. Crea una clase Biblioteca que tenga un atributo default cantidadLibros (int).

              o   En Biblioteca, crea un método public agregarLibro(Libro libro) para agregar un
                  libro a la biblioteca.

              o   Dentro de la misma clase, crea un método protected mostrarCantidadLibros()
                  que imprima la cantidad de libros en la biblioteca.

    4. En main(), crea instancias de Libro y LibroDigital, y utiliza los métodos públicos,
       protegidos y privados adecuadamente.

 class Libro {
    private String titulo;
    private String autor;
    protected int anoPublicacion;
    double precio;

   public void setTitulo(String t) {
     titulo = t;
   }

   public String getTitulo() {
     return titulo;
   }
    public void setAutor(String a) {
      autor = a;
    }

    public String getAutor() {
      return autor;
    }

    public void setAnoPublicacion(int a) {
      anoPublicacion = a;
    }

    public int getAnoPublicacion() {
      return anoPublicacion;
    }

    public void setPrecio(double p) {
      precio = p;
    }

    public double getPrecio() {
      return precio;
    }

    public void mostrarInformacion() {
      System.out.println("Título: " + titulo + ", Autor: " + autor);
    }

    private void calcularPrecioConDescuento() {
      double precioConDescuento = precio * 0.9; // 10% de descuento
      System.out.println("Precio con descuento: " + precioConDescuento);
    }
}

// Subclase LibroDigital
class LibroDigital extends Libro {
   private double tamanoMB;

    public void setTamanoMB(double t) {
      tamanoMB = t;
    }

    public double getTamanoMB() {
      return tamanoMB;
    }

    public void mostrarInformacionDigital() {
      mostrarInformacion();
      System.out.println("Tamaño del archivo digital: " + tamanoMB + " MB");
    }
}
 // Clase Biblioteca
 class Biblioteca {
    int cantidadLibros;

     public void agregarLibro(Libro libro) {
       cantidadLibros++;
       System.out.println("Libro agregado: " + libro.getTitulo());
     }

     protected void mostrarCantidadLibros() {
       System.out.println("Cantidad de libros en la biblioteca: " + cantidadLibros);
     }
 }

 // Clase principal
 public class Main {
    public static void main(String[] args) {
      Libro libro1 = new Libro();
      libro1.setTitulo("El Quijote");
      libro1.setAutor("Miguel de Cervantes");
      libro1.setAnoPublicacion(1605);
      libro1.setPrecio(25.0);

       LibroDigital libroDigital1 = new LibroDigital();
       libroDigital1.setTitulo("Java para principiantes");
       libroDigital1.setAutor("José Pérez");
       libroDigital1.setAnoPublicacion(2020);
       libroDigital1.setPrecio(35.0);
       libroDigital1.setTamanoMB(5.0);

       libro1.mostrarInformacion();
       libroDigital1.mostrarInformacionDigital();

      // Accediendo a métodos privados y protegidos (solo de ejemplo, no es posible fuera de
 la clase):
      // libro1.calcularPrecioConDescuento(); // No es accesible, es private
      // libro1.anoPublicacion; // Es accesible dentro de la subclase, pero no desde aquí
 (protected)
    }
 }`,
    criterios: ["Define la clase LibroDigital", "Define la clase Main", "Define la clase Libro", "Implementa el m\u00e9todo mostrarCantidadLibros", "Implementa el m\u00e9todo agregarLibro"],
    checks: [
       (c) =>  /class\s+LibroDigital/i.test(c),
       (c) =>  /class\s+Main/i.test(c),
       (c) =>  /class\s+Libro/i.test(c),
       (c) =>  /mostrarCantidadLibros\s*\(/i.test(c),
       (c) =>  /agregarLibro\s*\(/i.test(c)
    ]
  },
  {
    id: 'dr_ej_3_2',
    titulo: `Dr. Java: Modificadores de acceso - Ej 2`,
    nivel: '⭐⭐',
    temas: ["Modificadores de acceso"],
    tiempo: '15 min',
    enunciado: `Crea un sistema para gestionar productos en una tienda, utilizando modificadores de acceso.
Para ello:

    1. Crea una clase base Producto que tenga los siguientes atributos:

              o   nombre (String) private

              o   precio (double) private

              o   cantidad (int) protected

              o   codigo (String) default (sin modificador)
        Métodos en Producto:

              o   Un método public mostrarInfo() que imprima el nombre y el precio del
                  producto.

              o   Un método private calcularDescuento() que calcule un 5% de descuento sobre
                  el precio.

    2. Crea una subclase ProductoElectronico que herede de Producto y tenga:

              o   Un atributo adicional marca (String) private.

              o   Un método public mostrarInfoElectronico() que imprima la marca y el código
                  del producto.

    3. Crea una clase Tienda con:

              o   Un atributo default totalProductos (int) que llevará el conteo de productos en
                  la tienda.

              o   Un método public agregarProducto(Producto producto) que aumente el
                  número de productos en la tienda.

              o   Un método protected mostrarTotalProductos() que imprima la cantidad de
                  productos en la tienda.

    4. En main(), crea instancias de Producto y ProductoElectronico, usa los métodos set para
       asignar valores, y muestra la información.`,
    pistas: ["Analiza bien los requisitos antes de programar.", "Revisa tus nombres de variables."],
    solucion: `Crea un sistema para gestionar productos en una tienda, utilizando modificadores de acceso.
Para ello:

     1. Crea una clase base Producto que tenga los siguientes atributos:

              o   nombre (String) private

              o   precio (double) private
           o   cantidad (int) protected

           o   codigo (String) default (sin modificador)

      Métodos en Producto:

           o   Un método public mostrarInfo() que imprima el nombre y el precio del
               producto.

           o   Un método private calcularDescuento() que calcule un 5% de descuento sobre
               el precio.

  2. Crea una subclase ProductoElectronico que herede de Producto y tenga:

           o   Un atributo adicional marca (String) private.

           o   Un método public mostrarInfoElectronico() que imprima la marca y el código
               del producto.

  3. Crea una clase Tienda con:

           o   Un atributo default totalProductos (int) que llevará el conteo de productos en
               la tienda.

           o   Un método public agregarProducto(Producto producto) que aumente el
               número de productos en la tienda.

           o   Un método protected mostrarTotalProductos() que imprima la cantidad de
               productos en la tienda.

  4. En main(), crea instancias de Producto y ProductoElectronico, usa los métodos set para
     asignar valores, y muestra la información.



// Clase Producto
class Producto {
   private String nombre;
   private double precio;
   protected int cantidad;
   String codigo;

  public void setNombre(String nuevoNombre) {
    nombre = nuevoNombre;
  }

  public String getNombre() {
    return nombre;
  }

  public void setPrecio(double nuevoPrecio) {
    precio = nuevoPrecio;
  }

  public double getPrecio() {
    return precio;
    }

    public void setCantidad(int nuevaCantidad) {
      cantidad = nuevaCantidad;
    }

    public int getCantidad() {
      return cantidad;
    }

    public void setCodigo(String nuevoCodigo) {
      codigo = nuevoCodigo;
    }

    public String getCodigo() {
      return codigo;
    }

    public void mostrarInfo() {
      System.out.println("Producto: " + nombre + ", Precio: " + precio);
    }

    private void calcularDescuento() {
      double descuento = precio * 0.05; // 5% descuento
      System.out.println("Descuento: " + descuento);
    }
}

// Subclase ProductoElectronico
class ProductoElectronico extends Producto {
   private String marca;

    public void setMarca(String nuevaMarca) {
      marca = nuevaMarca;
    }

    public String getMarca() {
      return marca;
    }

    public void mostrarInfoElectronico() {
      mostrarInfo(); // Llamando a mostrarInfo de la clase base
      System.out.println("Marca: " + marca + ", Código: " + codigo);
    }
}

// Clase Tienda
class Tienda {
   int totalProductos;

    public void agregarProducto(Producto producto) {
      totalProductos++;
         System.out.println("Producto agregado: " + producto.getNombre());
     }

     protected void mostrarTotalProductos() {
       System.out.println("Total productos en la tienda: " + totalProductos);
     }
 }

 public class Main {
   public static void main(String[] args) {
     Producto producto1 = new Producto();
     producto1.setNombre("Camiseta");
     producto1.setPrecio(19.99);
     producto1.setCantidad(10);
     producto1.setCodigo("C123");

         ProductoElectronico productoElectronico1 = new ProductoElectronico();
         productoElectronico1.setNombre("Laptop");
         productoElectronico1.setPrecio(899.99);
         productoElectronico1.setCantidad(5);
         productoElectronico1.setCodigo("L456");
         productoElectronico1.setMarca("Dell");

         producto1.mostrarInfo();
         productoElectronico1.mostrarInfoElectronico();

         Tienda tienda = new Tienda();
         tienda.agregarProducto(producto1);
         tienda.agregarProducto(productoElectronico1);
         tienda.mostrarTotalProductos();
     }
 }


Producto:

     •     Los atributos nombre y precio son private para que solo se accedan mediante los
           métodos set y get.

     •     El atributo cantidad es protected, por lo que puede ser accedido desde subclases como
           ProductoElectronico.

     •     El atributo codigo tiene el modificador default, lo que significa que es accesible solo
           dentro del paquete.

ProductoElectronico:

     •     Hereda de Producto y tiene un atributo marca que es private.

     •     El método mostrarInfoElectronico() imprime tanto los datos de la clase base como el
           atributo adicional.

Tienda:
    •   Lleva el conteo de productos con el atributo totalProductos que tiene un modificador
        default.

    •   El método agregarProducto() aumenta el conteo de productos en la tienda, mientras
        que mostrarTotalProductos() muestra ese total.`,
    criterios: ["Define la clase Producto", "Define la clase Tienda", "Define la clase Main", "Implementa el m\u00e9todo mostrarInfo", "Implementa el m\u00e9todo mostrarTotalProductos"],
    checks: [
       (c) =>  /class\s+Producto/i.test(c),
       (c) =>  /class\s+Tienda/i.test(c),
       (c) =>  /class\s+Main/i.test(c),
       (c) =>  /mostrarInfo\s*\(/i.test(c),
       (c) =>  /mostrarTotalProductos\s*\(/i.test(c)
    ]
  },
  {
    id: 'dr_ej_3_3',
    titulo: `Dr. Java: Modificadores de acceso - Ej 3`,
    nivel: '⭐⭐',
    temas: ["Modificadores de acceso"],
    tiempo: '15 min',
    enunciado: `Crea un sistema para gestionar cuentas bancarias, utilizando modificadores de acceso. Para ello:

    1. Crea una clase base CuentaBancaria que tenga como atributos:

              o   numeroCuenta (String) private

              o   saldo (double) private

              o   titular (String) protected

              o   tipoCuenta (String) default (sin modificador)

        Métodos en CuentaBancaria:

              o   Un método public mostrarInformacion() que imprima el titular, el número de
                  cuenta y el saldo.

              o   Un método private calcularIntereses() que calcule un 2% de intereses sobre el
                  saldo y lo imprima.

    2. Crea una subclase CuentaAhorro que herede de CuentaBancaria y tenga:

              o   Un atributo adicional intereses (double) private.

              o   Un método public mostrarInformacionCuentaAhorro() que imprima el tipo de
                  cuenta y los intereses.
3. Crea una clase Banco con:

       o   Un atributo default totalCuentas (int) que llevará el conteo de cuentas en el
           banco.

       o   Un método public agregarCuenta(CuentaBancaria cuenta) que aumente el
           número de cuentas en el banco.

       o   Un método protected mostrarTotalCuentas() que imprima la cantidad de
           cuentas en el banco.

4. En main(), crea instancias de CuentaBancaria y CuentaAhorro, usa los métodos set para
   asignar valores, y muestra la información.`,
    pistas: ["Analiza bien los requisitos antes de programar.", "Revisa tus nombres de variables."],
    solucion: `Crea un sistema para gestionar cuentas bancarias, utilizando modificadores de acceso. Para ello:

    1. Crea una clase base CuentaBancaria que tenga como atributos:

              o   numeroCuenta (String) private

              o   saldo (double) private

              o   titular (String) protected

              o   tipoCuenta (String) default (sin modificador)

        Métodos en CuentaBancaria:

              o   Un método public mostrarInformacion() que imprima el titular, el número de
                  cuenta y el saldo.

              o   Un método private calcularIntereses() que calcule un 2% de intereses sobre el
                  saldo y lo imprima.

    2. Crea una subclase CuentaAhorro que herede de CuentaBancaria y tenga:

              o   Un atributo adicional intereses (double) private.

              o   Un método public mostrarInformacionCuentaAhorro() que imprima el tipo de
                  cuenta y los intereses.

    3. Crea una clase Banco con:

              o   Un atributo default totalCuentas (int) que llevará el conteo de cuentas en el
                  banco.

              o   Un método public agregarCuenta(CuentaBancaria cuenta) que aumente el
                  número de cuentas en el banco.

              o   Un método protected mostrarTotalCuentas() que imprima la cantidad de
                  cuentas en el banco.

    4. En main(), crea instancias de CuentaBancaria y CuentaAhorro, usa los métodos set para
       asignar valores, y muestra la información.

 class CuentaBancaria {
    private String numeroCuenta;
    private double saldo;
    protected String titular;
    String tipoCuenta;

   public void setNumeroCuenta(String nuevoNumeroCuenta) {
        numeroCuenta = nuevoNumeroCuenta;
    }

    public String getNumeroCuenta() {
      return numeroCuenta;
    }

    public void setSaldo(double nuevoSaldo) {
      saldo = nuevoSaldo;
    }

    public double getSaldo() {
      return saldo;
    }

    public void setTitular(String nuevoTitular) {
      titular = nuevoTitular;
    }

    public String getTitular() {
      return titular;
    }

    public void setTipoCuenta(String nuevoTipoCuenta) {
      tipoCuenta = nuevoTipoCuenta;
    }

    public String getTipoCuenta() {
      return tipoCuenta;
    }

  public void mostrarInformacion() {
    System.out.println("Titular: " + titular + ", Número de Cuenta: " + numeroCuenta + ",
Saldo: " + saldo);
  }

    private void calcularIntereses() {
      double intereses = saldo * 0.02; // 2% de intereses
      System.out.println("Intereses calculados: " + intereses);
    }
}

// Subclase CuentaAhorro
class CuentaAhorro extends CuentaBancaria {
   private double intereses;

    public void setIntereses(double nuevosIntereses) {
      intereses = nuevosIntereses;
    }

    public double getIntereses() {
      return intereses;
     }

     public void mostrarInformacionCuentaAhorro() {
       mostrarInformacion(); // Llamando a mostrarInformacion de la clase base
       System.out.println("Tipo de cuenta: " + tipoCuenta + ", Intereses: " + intereses + "%");
     }
 }

 class Banco {
    int totalCuentas;

     public void agregarCuenta(CuentaBancaria cuenta) {
       totalCuentas++;
       System.out.println("Cuenta agregada: " + cuenta.getNumeroCuenta());
     }

     protected void mostrarTotalCuentas() {
       System.out.println("Total cuentas en el banco: " + totalCuentas);
     }
 }

 public class Main {
   public static void main(String[] args) {
     CuentaBancaria cuenta1 = new CuentaBancaria();
     cuenta1.setNumeroCuenta("123456789");
     cuenta1.setSaldo(1000.0);
     cuenta1.setTitular("Juan Pérez");
     cuenta1.setTipoCuenta("Corriente");

         CuentaAhorro cuentaAhorro1 = new CuentaAhorro();
         cuentaAhorro1.setNumeroCuenta("987654321");
         cuentaAhorro1.setSaldo(5000.0);
         cuentaAhorro1.setTitular("María Gómez");
         cuentaAhorro1.setTipoCuenta("Ahorro");
         cuentaAhorro1.setIntereses(3.0);

         cuenta1.mostrarInformacion();
         cuentaAhorro1.mostrarInformacionCuentaAhorro();

         Banco banco = new Banco();
         banco.agregarCuenta(cuenta1);
         banco.agregarCuenta(cuentaAhorro1);
         banco.mostrarTotalCuentas();
     }
 }


CuentaBancaria:

     •     Los atributos numeroCuenta y saldo son private para proteger la información sensible.
   •     El atributo titular es protected y puede ser accedido por clases hijas como
         CuentaAhorro.

   •     El atributo tipoCuenta es default (sin modificador) y solo es accesible dentro del mismo
         paquete.

   •     El método mostrarInformacion() imprime la información básica de la cuenta.

   •     El método calcularIntereses() es privado y se usa solo internamente.

CuentaAhorro:

   •     Hereda de CuentaBancaria y tiene un atributo adicional intereses (porcentaje de
         intereses).

   •     El método mostrarInformacionCuentaAhorro() imprime detalles adicionales de la
         cuenta de ahorro.

Banco:

   •     Lleva el conteo de cuentas con el atributo totalCuentas.

   •     El método agregarCuenta() aumenta el número de cuentas en el banco y muestra el
         número de cuenta agregada.

   •     El método mostrarTotalCuentas() muestra el total de cuentas en el banco.`,
    criterios: ["Define la clase Main", "Define la clase CuentaAhorro", "Define la clase Banco", "Implementa el m\u00e9todo mostrarTotalCuentas", "Implementa el m\u00e9todo agregarCuenta"],
    checks: [
       (c) =>  /class\s+Main/i.test(c),
       (c) =>  /class\s+CuentaAhorro/i.test(c),
       (c) =>  /class\s+Banco/i.test(c),
       (c) =>  /mostrarTotalCuentas\s*\(/i.test(c),
       (c) =>  /agregarCuenta\s*\(/i.test(c)
    ]
  },
  {
    id: 'dr_ej_4_1',
    titulo: `Dr. Java: Constructores - Ej 1`,
    nivel: '⭐⭐',
    temas: ["Constructores"],
    tiempo: '15 min',
    enunciado: `Vamos a gestionar los productos de una tienda. Para ello, vamos a crear una clase Producto que
tenga los atributos: nombre, precio y cantidad. Usaremos constructores para inicializar estos
atributos al crear instancias de la clase. Además, crearemos una subclase ProductoElectronico
que herede de Producto y agregue un atributo adicional para la marca. También, incluiremos
un método para mostrar la información del producto. Así:

    1. Producto:

              o   Atributos:

                      ▪   nombre (String)

                      ▪   precio (double)

                      ▪   cantidad (int)

              o   Constructor que reciba nombre, precio y cantidad como parámetros y los
                  inicialice.

              o   Método mostrarInformacion() que imprima los detalles del producto.

    2. ProductoElectronico (subclase de Producto):

              o   Atributo adicional: marca (String)

              o   Constructor que reciba nombre, precio, cantidad, y marca como parámetros.

              o   Método mostrarInformacionElectronico() que imprima los detalles del
                  producto electrónico.

    3. Tienda:

              o   Atributo: productos (un arreglo de tipo Producto de tamaño fijo).

              o   Método agregarProducto() que reciba un objeto de tipo Producto y lo agregue
                  al arreglo.

              o   Método mostrarProductos() que imprima todos los productos de la tienda.

    4. En el main(), crea instancias de Producto y ProductoElectronico usando los
       constructores, agrega los productos a la tienda, y muestra la información.`,
    pistas: ["Analiza bien los requisitos antes de programar.", "Revisa tus nombres de variables."],
    solucion: `Vamos a gestionar los productos de una tienda. Para ello, vamos a crear una clase Producto que
tenga los atributos: nombre, precio y cantidad. Usaremos constructores para inicializar estos
atributos al crear instancias de la clase. Además, crearemos una subclase ProductoElectronico
que herede de Producto y agregue un atributo adicional para la marca. También, incluiremos
un método para mostrar la información del producto. Así:

    1. Producto:

              o   Atributos:

                      ▪   nombre (String)

                      ▪   precio (double)

                      ▪   cantidad (int)

              o   Constructor que reciba nombre, precio y cantidad como parámetros y los
                  inicialice.

              o   Método mostrarInformacion() que imprima los detalles del producto.

    2. ProductoElectronico (subclase de Producto):

              o   Atributo adicional: marca (String)

              o   Constructor que reciba nombre, precio, cantidad, y marca como parámetros.

              o   Método mostrarInformacionElectronico() que imprima los detalles del
                  producto electrónico.

    3. Tienda:

              o   Atributo: productos (un arreglo de tipo Producto de tamaño fijo).

              o   Método agregarProducto() que reciba un objeto de tipo Producto y lo agregue
                  al arreglo.

              o   Método mostrarProductos() que imprima todos los productos de la tienda.

    4. En el main(), crea instancias de Producto y ProductoElectronico usando los
       constructores, agrega los productos a la tienda, y muestra la información.

 class Producto {
    private String nombreProducto;
    private double precioProducto;
    private int cantidadProducto;

   public Producto(String nombre, double precio, int cantidad) {
     nombreProducto = nombre;
     precioProducto = precio;
     cantidadProducto = cantidad;
   }
    public String obtenerNombre() {
      return nombreProducto;
    }

    public double obtenerPrecio() {
      return precioProducto;
    }

    public int obtenerCantidad() {
      return cantidadProducto;
    }

  public void mostrarInformacion() {
    System.out.println("Producto: " + nombreProducto + ", Precio: " + precioProducto + ",
Cantidad: " + cantidadProducto);
  }
}

class ProductoElectronico extends Producto {
   private String marcaProductoElectronico;

    public ProductoElectronico(String nombre, double precio, int cantidad, String marca) {
      nombreProducto = nombre;
      precioProducto = precio;
      cantidadProducto = cantidad;
      marcaProductoElectronico = marca;
    }

    public void mostrarInformacionElectronico() {
      mostrarInformacion(); // Llamando al método de la clase base
      System.out.println("Marca: " + marcaProductoElectronico);
    }
}

class Tienda {
   private Producto[] productos;
   private int indice;

    public Tienda(int capacidad) {
      productos = new Producto[capacidad];
      indice = 0;
    }

    public void agregarProducto(Producto producto) {
      if (indice &lt; productos.length) {
          productos[indice] = producto;
          indice++;
      } else {
          System.out.println("La tienda está llena.");
      }
    }
     public void mostrarProductos() {
       System.out.println("Productos disponibles en la tienda:");
       for (int i = 0; i &lt; indice; i++) {
         productos[i].mostrarInformacion();
       }
     }
 }

 public class Main {
   public static void main(String[] args) {

      Producto producto1 = new Producto("Camiseta", 19.99, 10);
      ProductoElectronico productoElectronico1 = new ProductoElectronico("Laptop", 899.99,
 5, "Dell");

         Tienda tienda = new Tienda(5);
         tienda.agregarProducto(producto1);
         tienda.agregarProducto(productoElectronico1);

         tienda.mostrarProductos();
     }
 }`,
    criterios: ["Define la clase Tienda", "Define la clase Producto", "Define la clase ProductoElectronico", "Implementa el m\u00e9todo mostrarInformacionElectronico", "Implementa el m\u00e9todo mostrarInformacion"],
    checks: [
       (c) =>  /class\s+Tienda/i.test(c),
       (c) =>  /class\s+Producto/i.test(c),
       (c) =>  /class\s+ProductoElectronico/i.test(c),
       (c) =>  /mostrarInformacionElectronico\s*\(/i.test(c),
       (c) =>  /mostrarInformacion\s*\(/i.test(c)
    ]
  },
  {
    id: 'dr_ej_4_2',
    titulo: `Dr. Java: Constructores - Ej 2`,
    nivel: '⭐⭐',
    temas: ["Constructores"],
    tiempo: '15 min',
    enunciado: `Vamos a gestionar una biblioteca de películas. Para ello vamos a crear una clase Pelicula que
tenga los atributos: titulo, duracion (en minutos), y anioEstreno. Luego, se creará una subclase
PeliculaDeAccion que herede de Pelicula y tenga un atributo adicional para la clasificacion.
Usaremos constructores para inicializar los atributos.

    1. Pelicula:

              o   Atributos:
                      ▪   tituloPelicula (String)

                      ▪   duracionPelicula (int)

                      ▪   anioEstrenoPelicula (int)

              o   Constructor que reciba titulo, duracion y anioEstreno como parámetros y los
                  inicialice.

              o   Método mostrarInformacion() que imprima los detalles de la película.

    2. PeliculaDeAccion (subclase de Pelicula):

              o   Atributo adicional: clasificacionPelicula (String)

              o   Constructor que reciba titulo, duracion, anioEstreno y clasificacion como
                  parámetros.

              o   Método mostrarInformacionAccion() que imprima los detalles de la película de
                  acción.

    3. Biblioteca:

              o   Atributo: peliculas (un arreglo de tipo Pelicula de tamaño fijo).

              o   Método agregarPelicula() que reciba un objeto de tipo Pelicula y lo agregue al
                  arreglo.

              o   Método mostrarPeliculas() que imprima todos los detalles de las películas.

    4. En el main(), crea instancias de Pelicula y PeliculaDeAccion usando los constructores,
       agrega las películas a la biblioteca y muestra la información de todas las películas.`,
    pistas: ["Analiza bien los requisitos antes de programar.", "Revisa tus nombres de variables."],
    solucion: `Vamos a gestionar una biblioteca de películas. Para ello vamos a crear una clase Pelicula que
tenga los atributos: titulo, duracion (en minutos), y anioEstreno. Luego, se creará una subclase
PeliculaDeAccion que herede de Pelicula y tenga un atributo adicional para la clasificacion.
Usaremos constructores para inicializar los atributos.

     1. Pelicula:

               o   Atributos:

                       ▪   tituloPelicula (String)

                       ▪   duracionPelicula (int)

                       ▪   anioEstrenoPelicula (int)

               o   Constructor que reciba titulo, duracion y anioEstreno como parámetros y los
                   inicialice.

               o   Método mostrarInformacion() que imprima los detalles de la película.

     2. PeliculaDeAccion (subclase de Pelicula):

               o   Atributo adicional: clasificacionPelicula (String)

               o   Constructor que reciba titulo, duracion, anioEstreno y clasificacion como
                   parámetros.

               o   Método mostrarInformacionAccion() que imprima los detalles de la película de
                   acción.
  3. Biblioteca:

           o   Atributo: peliculas (un arreglo de tipo Pelicula de tamaño fijo).

           o   Método agregarPelicula() que reciba un objeto de tipo Pelicula y lo agregue al
               arreglo.

           o   Método mostrarPeliculas() que imprima todos los detalles de las películas.

  4. En el main(), crea instancias de Pelicula y PeliculaDeAccion usando los constructores,
     agrega las películas a la biblioteca y muestra la información de todas las películas.

class Pelicula {
   private String tituloPelicula;
   private int duracionPelicula;
   private int anioEstrenoPelicula;

  public Pelicula(String titulo, int duracion, int anioEstreno) {
    tituloPelicula = titulo;
    duracionPelicula = duracion;
    anioEstrenoPelicula = anioEstreno;
  }

  public String obtenerTitulo() {
    return tituloPelicula;
  }

  public int obtenerDuracion() {
    return duracionPelicula;
  }

  public int obtenerAnioEstreno() {
    return anioEstrenoPelicula;
  }

  public void mostrarInformacion() {
    System.out.println("Título: " + tituloPelicula + ", Duración: " + duracionPelicula + "
minutos, Año de estreno: " + anioEstrenoPelicula);
  }
}

class PeliculaDeAccion extends Pelicula {
   private String clasificacionPelicula;

  public PeliculaDeAccion(String titulo, int duracion, int anioEstreno, String clasificacion) {
    tituloPelicula = titulo;
    duracionPelicula = duracion;
    anioEstrenoPelicula = anioEstreno;
    clasificacionPelicula = clasificacion;
  }

  public void mostrarInformacionAccion() {
    mostrarInformacion(); // Llamando al método de la clase base
         System.out.println("Clasificación: " + clasificacionPelicula);
     }
 }

 class Biblioteca {
    private Pelicula[] peliculas;
    private int indice;

     public Biblioteca(int capacidad) {
       peliculas = new Pelicula[capacidad];
       indice = 0;
     }

     public void agregarPelicula(Pelicula pelicula) {
       if (indice &lt; peliculas.length) {
           peliculas[indice] = pelicula;
           indice++;
       } else {
           System.out.println("La biblioteca está llena.");
       }
     }

     public void mostrarPeliculas() {
       System.out.println("Películas disponibles en la biblioteca:");
       for (int i = 0; i &lt; indice; i++) {
         peliculas[i].mostrarInformacion();
       }
     }
 }

 public class Main {
   public static void main(String[] args) {

     Pelicula pelicula1 = new Pelicula("La Casa de Papel", 60, 2017);
     PeliculaDeAccion peliculaDeAccion1 = new PeliculaDeAccion("Rocky", 120, 1983,
 "acción");

         Biblioteca biblioteca = new Biblioteca(5);
         biblioteca.agregarPelicula(pelicula1);
         biblioteca.agregarPelicula(peliculaDeAccion1);

         biblioteca.mostrarPeliculas();
     }
 }`,
    criterios: ["Define la clase PeliculaDeAccion", "Define la clase Main", "Define la clase Pelicula", "Implementa el m\u00e9todo agregarPelicula", "Implementa el m\u00e9todo mostrarInformacion"],
    checks: [
       (c) =>  /class\s+PeliculaDeAccion/i.test(c),
       (c) =>  /class\s+Main/i.test(c),
       (c) =>  /class\s+Pelicula/i.test(c),
       (c) =>  /agregarPelicula\s*\(/i.test(c),
       (c) =>  /mostrarInformacion\s*\(/i.test(c)
    ]
  },
  {
    id: 'dr_ej_4_3',
    titulo: `Dr. Java: Constructores - Ej 3`,
    nivel: '⭐⭐',
    temas: ["Constructores"],
    tiempo: '15 min',
    enunciado: `Vamos a gestionar un inventario de electrodomésticos. Para ello vamos a crear un sistema de
gestión de inventario para una tienda de electrodomésticos. Tendremos una clase base
ProductoElectrico con atributos comunes como el nombre y el precio, y luego una subclase
Televisor que agregue un atributo adicional para la tamanoPantalla en pulgadas. Así:

    1. ProductoElectrico:

              o   Atributos:

                      ▪   nombreProductoElectrico (String)

                      ▪   precioProductoElectrico (double)

              o   Constructor que reciba nombre y precio como parámetros y los inicialice.

              o   Método mostrarInformacion() que imprima los detalles del producto eléctrico.

    2. Televisor (subclase de ProductoElectrico):

              o   Atributo adicional: tamanoPantallaTelevisor (int, en pulgadas).

              o   Constructor que reciba nombre, precio y tamano como parámetros.
        o   Método mostrarInformacionTelevisor() que imprima los detalles del televisor.

3. Inventario:

        o   Atributo: productos (un arreglo de tipo ProductoElectrico de tamaño fijo).

        o   Método agregarProducto() que reciba un objeto de tipo ProductoElectrico y lo
            agregue al arreglo.

        o   Método mostrarProductos() que imprima todos los detalles de los productos
            en el inventario.

4. En el main(), crea instancias de ProductoElectrico y Televisor usando los constructores,
   agrega los productos al inventario y muestra la información de todos los productos.`,
    pistas: ["Analiza bien los requisitos antes de programar.", "Revisa tus nombres de variables."],
    solucion: `Vamos a gestionar un inventario de electrodomésticos. Para ello vamos a crear un sistema de
gestión de inventario para una tienda de electrodomésticos. Tendremos una clase base
ProductoElectrico con atributos comunes como el nombre y el precio, y luego una subclase
Televisor que agregue un atributo adicional para la tamanoPantalla en pulgadas. Así:
  1. ProductoElectrico:

          o   Atributos:

                   ▪   nombreProductoElectrico (String)

                   ▪   precioProductoElectrico (double)

          o   Constructor que reciba nombre y precio como parámetros y los inicialice.

          o   Método mostrarInformacion() que imprima los detalles del producto eléctrico.

  2. Televisor (subclase de ProductoElectrico):

          o   Atributo adicional: tamanoPantallaTelevisor (int, en pulgadas).

          o   Constructor que reciba nombre, precio y tamano como parámetros.

          o   Método mostrarInformacionTelevisor() que imprima los detalles del televisor.

  3. Inventario:

          o   Atributo: productos (un arreglo de tipo ProductoElectrico de tamaño fijo).

          o   Método agregarProducto() que reciba un objeto de tipo ProductoElectrico y lo
              agregue al arreglo.

          o   Método mostrarProductos() que imprima todos los detalles de los productos
              en el inventario.

  4. En el main(), crea instancias de ProductoElectrico y Televisor usando los constructores,
     agrega los productos al inventario y muestra la información de todos los productos.



class ProductoElectrico {
   private String nombreProductoElectrico;
   private double precioProductoElectrico;

  public ProductoElectrico(String nombre, double precio) {
    nombreProductoElectrico = nombre;
    precioProductoElectrico = precio;
  }

  public String obtenerNombre() {
    return nombreProductoElectrico;
  }

  public double obtenerPrecio() {
    return precioProductoElectrico;
  }

  public void mostrarInformacion() {
    System.out.println("Producto: " + nombreProductoElectrico + ", Precio: " +
precioProductoElectrico);
  }
}
class Televisor extends ProductoElectrico {
   private int tamanoPantallaTelevisor;

    public Televisor(String nombre, double precio, int tamano) {
      nombreProductoElectrico = nombre;
      precioProductoElectrico = precio;
      tamanoPantallaTelevisor = tamano;
    }

    public void mostrarInformacionTelevisor() {
      mostrarInformacion(); // Llamando al método de la clase base
      System.out.println("Tamaño de pantalla: " + tamanoPantallaTelevisor + " pulgadas");
    }
}

class Inventario {
   private ProductoElectrico[] productos;
   private int indice;

    public Inventario(int capacidad) {
      productos = new ProductoElectrico[capacidad];
      indice = 0;
    }

    public void agregarProducto(ProductoElectrico producto) {
      if (indice &lt; productos.length) {
          productos[indice] = producto;
          indice++;
      } else {
          System.out.println("El inventario está lleno.");
      }
    }

    public void mostrarProductos() {
      System.out.println("Productos disponibles en el inventario:");
      for (int i = 0; i &lt; indice; i++) {
        productos[i].mostrarInformacion();
      }
    }
}

public class Main {
  public static void main(String[] args) {

      ProductoElectrico producto1 = new ProductoElectrico("Aspiradora", 120.50);
      Televisor televisor1 = new Televisor("Samsung 55", 499.99, 55);

      Inventario inventario = new Inventario(5);
      inventario.agregarProducto(producto1);
      inventario.agregarProducto(televisor1);
        // Mostrar productos en el inventario
        inventario.mostrarProductos();
    }
}`,
    criterios: ["Define la clase ProductoElectrico", "Define la clase Televisor", "Define la clase Inventario", "Implementa el m\u00e9todo mostrarInformacionTelevisor", "Implementa el m\u00e9todo mostrarInformacion"],
    checks: [
       (c) =>  /class\s+ProductoElectrico/i.test(c),
       (c) =>  /class\s+Televisor/i.test(c),
       (c) =>  /class\s+Inventario/i.test(c),
       (c) =>  /mostrarInformacionTelevisor\s*\(/i.test(c),
       (c) =>  /mostrarInformacion\s*\(/i.test(c)
    ]
  },
  {
    id: 'dr_ej_5_1',
    titulo: `Dr. Java: Polimorfismo y sobrecarga - Ej 1`,
    nivel: '⭐⭐',
    temas: ["Polimorfismo y sobrecarga"],
    tiempo: '15 min',
    enunciado: `Implementa un sistema para gestionar una tienda de vehículos. Cada vehículo tiene una marca
y una descripción específica según su tipo. Así:

Clases a implementar:

    •   Vehiculo (Clase base)

    •   Coche (Subclase de Vehiculo)

    •   Moto (Subclase de Vehiculo)

    •   Bicicleta (Subclase de Vehiculo)

Polimorfismo:

    •   Todas las subclases deben sobrescribir el método obtenerDescripcion() para devolver
        información específica de cada tipo de vehículo.

Sobrecarga:

    •   La clase Coche debe tener una versión adicional de obtenerDescripcion() que reciba un
        parámetro indicando el tipo de combustible.

Pruebas:

    •   Crear objetos de cada clase (Coche, Moto, Bicicleta).

    •   Llamar al método obtenerDescripcion() en cada objeto.

    •   En el caso de Coche, llamar también a la versión sobrecargada con el tipo de
        combustible.

Ejemplo de salida esperada:

 Coche de la marca Toyota con 4 puertas
 Moto de la marca Honda con casco incluido
 Bicicleta de la marca Giant con 21 cambios
 Coche de la marca Toyota con 4 puertas, usa Gasolina`,
    pistas: ["Analiza bien los requisitos antes de programar.", "Revisa tus nombres de variables."],
    solucion: `Implementa un sistema para gestionar una tienda de vehículos. Cada vehículo tiene una marca
y una descripción específica según su tipo. Así:

Clases a implementar:

     •    Vehiculo (Clase base)

     •    Coche (Subclase de Vehiculo)

     •    Moto (Subclase de Vehiculo)

     •    Bicicleta (Subclase de Vehiculo)

Polimorfismo:

     •    Todas las subclases deben sobrescribir el método obtenerDescripcion() para devolver
          información específica de cada tipo de vehículo.

Sobrecarga:

     •    La clase Coche debe tener una versión adicional de obtenerDescripcion() que reciba un
          parámetro indicando el tipo de combustible.

Pruebas:

     •    Crear objetos de cada clase (Coche, Moto, Bicicleta).

     •    Llamar al método obtenerDescripcion() en cada objeto.

     •    En el caso de Coche, llamar también a la versión sobrecargada con el tipo de
          combustible.

Ejemplo de salida esperada:

 Coche de la marca Toyota con 4 puertas
 Moto de la marca Honda con casco incluido
 Bicicleta de la marca Giant con 21 cambios
 Coche de la marca Toyota con 4 puertas, usa Gasolina


 // Clase Vehiculo (base)
 class Vehiculo {
    String marcaVehiculo;

     public Vehiculo(String marcaParametro) {
       marcaVehiculo = marcaParametro;
     }

     public String obtenerDescripcion() {
       return "Vehículo de la marca " + marcaVehiculo;
     }
 }
// Clase Coche con polimorfismo y sobrecarga
class Coche extends Vehiculo {
   int puertasCoche;

    public Coche(String marcaParametro, int puertasParametro) {
      marcaVehiculo = marcaParametro;
      puertasCoche = puertasParametro;
    }

   // Sobrecarga con parámetro adicional (tipo de combustible)
   public String obtenerDescripcion(String tipoCombustible) {
      return "Coche de la marca " + marcaVehiculo + " con " + puertasCoche + " puertas, usa "
+ tipoCombustible;
   }

    public String obtenerDescripcion() {
      return "Coche de la marca " + marcaVehiculo + " con " + puertasCoche + " puertas";
    }
}

// Clase Moto con polimorfismo
class Moto extends Vehiculo {
   boolean incluyeCasco;

    public Moto(String marcaParametro, boolean cascoParametro) {
      marcaVehiculo = marcaParametro;
      incluyeCasco = cascoParametro;
    }

    public String obtenerDescripcion() {
      if (incluyeCasco) {
          return "Moto de la marca " + marcaVehiculo + " con casco incluido";
      }
      return "Moto de la marca " + marcaVehiculo + " sin casco incluido";
    }
}

// Clase Bicicleta con polimorfismo
class Bicicleta extends Vehiculo {
   int cambiosBicicleta;

    public Bicicleta(String marcaParametro, int cambiosParametro) {
      marcaVehiculo = marcaParametro;
      cambiosBicicleta = cambiosParametro;
    }

    public String obtenerDescripcion() {
      return "Bicicleta de la marca " + marcaVehiculo + " con " + cambiosBicicleta + " cambios";
    }
}

// Clase Main para probar polimorfismo y sobrecarga
 public class Main {
   public static void main(String[] args) {
     Coche cocheEjemplo = new Coche("Toyota", 4);
     Moto motoEjemplo = new Moto("Honda", true);
     Bicicleta bicicletaEjemplo = new Bicicleta("Giant", 21);

         // Polimorfismo: cada objeto usa su versión de obtenerDescripcion()
         System.out.println(cocheEjemplo.obtenerDescripcion());
         System.out.println(motoEjemplo.obtenerDescripcion());
         System.out.println(bicicletaEjemplo.obtenerDescripcion());

         // Sobrecarga en Coche: llamada con un parámetro adicional
         System.out.println(cocheEjemplo.obtenerDescripcion("Gasolina"));
     }
 }`,
    criterios: ["Define la clase Vehiculo", "Define la clase Coche", "Define la clase Main", "Implementa el m\u00e9todo obtenerDescripcion"],
    checks: [
       (c) =>  /class\s+Vehiculo/i.test(c),
       (c) =>  /class\s+Coche/i.test(c),
       (c) =>  /class\s+Main/i.test(c),
       (c) =>  /obtenerDescripcion\s*\(/i.test(c)
    ]
  },
  {
    id: 'dr_ej_5_2',
    titulo: `Dr. Java: Polimorfismo y sobrecarga - Ej 2`,
    nivel: '⭐⭐',
    temas: ["Polimorfismo y sobrecarga"],
    tiempo: '15 min',
    enunciado: `Implementa un sistema para gestionar una empresa. Cada empleado tiene un nombre y un
salario base, pero dependiendo del tipo de empleado, el cálculo del salario varía.

Clases a implementar:

    •   Empleado (Clase base)
    •   Gerente (Subclase de Empleado)
    •   Ingeniero (Subclase de Empleado)
    •   Asistente (Subclase de Empleado)
Polimorfismo:

Cada tipo de empleado debe sobrescribir el método calcularSalario(), aplicando su propia lógica
de cálculo:

    •   Gerente: Recibe un bono adicional.
    •   Ingeniero: Tiene un extra por certificaciones.
    •   Asistente: No tiene extras, solo el salario base.

Sobrecarga:

La clase Ingeniero debe tener una versión sobrecargada de calcularSalario() que reciba el
número de certificaciones y aumente el salario basándose en ellas.

Pruebas:

    •   Crear objetos de cada clase (Gerente, Ingeniero, Asistente).

    •   Llamar al método calcularSalario() en cada objeto.

    •   Para Ingeniero, llamar también a la versión sobrecargada con el número de
        certificaciones.

Ejemplo de salida esperada:

 Salario del Gerente: 7500
 Salario del Ingeniero: 5000
 Salario del Asistente: 3000
 Salario del Ingeniero con 3 certificaciones: 5300`,
    pistas: ["Analiza bien los requisitos antes de programar.", "Revisa tus nombres de variables."],
    solucion: `Implementa un sistema para gestionar una empresa. Cada empleado tiene un nombre y un
salario base, pero dependiendo del tipo de empleado, el cálculo del salario varía.

Clases a implementar:

     •     Empleado (Clase base)
     •     Gerente (Subclase de Empleado)
     •     Ingeniero (Subclase de Empleado)
     •     Asistente (Subclase de Empleado)

Polimorfismo:

Cada tipo de empleado debe sobrescribir el método calcularSalario(), aplicando su propia lógica
de cálculo:

     •     Gerente: Recibe un bono adicional.
     •     Ingeniero: Tiene un extra por certificaciones.
     •     Asistente: No tiene extras, solo el salario base.

Sobrecarga:

La clase Ingeniero debe tener una versión sobrecargada de calcularSalario() que reciba el
número de certificaciones y aumente el salario basándose en ellas.

Pruebas:

     •     Crear objetos de cada clase (Gerente, Ingeniero, Asistente).

     •     Llamar al método calcularSalario() en cada objeto.

     •     Para Ingeniero, llamar también a la versión sobrecargada con el número de
           certificaciones.

Ejemplo de salida esperada:

 Salario del Gerente: 7500
Salario del Ingeniero: 5000
Salario del Asistente: 3000
Salario del Ingeniero con 3 certificaciones: 5300


// Clase base Empleado
class Empleado {
   String nombreEmpleado;
   double salarioBase;

    public Empleado(String nombreParametro, double salarioParametro) {
      nombreEmpleado = nombreParametro;
      salarioBase = salarioParametro;
    }

    public double calcularSalario() {
      return salarioBase;
    }
}

// Clase Gerente con polimorfismo
class Gerente extends Empleado {
   double bonoGerente;

  public Gerente(String nombreParametro,                 double     salarioParametro,   double
bonoParametro) {
    nombreEmpleado = nombreParametro;
    salarioBase = salarioParametro;
    bonoGerente = bonoParametro;
  }

    public double calcularSalario() {
      return salarioBase + bonoGerente;
    }
}

// Clase Ingeniero con polimorfismo y sobrecarga
class Ingeniero extends Empleado {
   double extraCertificacion;

  public Ingeniero(String nombreParametro,               double     salarioParametro,   double
extraParametro) {
    nombreEmpleado = nombreParametro;
    salarioBase = salarioParametro;
    extraCertificacion = extraParametro;
  }

    // Método sobrecargado para calcular salario con certificaciones
    public double calcularSalario(int cantidadCertificaciones) {
       return salarioBase + (extraCertificacion * cantidadCertificaciones);
    }
     public double calcularSalario() {
       return salarioBase;
     }
 }

 // Clase Asistente con polimorfismo
 class Asistente extends Empleado {
    public Asistente(String nombreParametro, double salarioParametro) {
      nombreEmpleado = nombreParametro;
      salarioBase = salarioParametro;
    }

     public double calcularSalario() {
       return salarioBase;
     }
 }

 // Clase Main para probar el polimorfismo y la sobrecarga
 public class Main {
    public static void main(String[] args) {
      Gerente gerenteEjemplo = new Gerente("Carlos", 7000, 500);
      Ingeniero ingenieroEjemplo = new Ingeniero("Ana", 5000, 100);
      Asistente asistenteEjemplo = new Asistente("Luis", 3000);

         // Polimorfismo: llamada a calcularSalario() según el tipo de empleado
         System.out.println("Salario del Gerente: " + gerenteEjemplo.calcularSalario());
         System.out.println("Salario del Ingeniero: " + ingenieroEjemplo.calcularSalario());
         System.out.println("Salario del Asistente: " + asistenteEjemplo.calcularSalario());

     // Sobrecarga en Ingeniero: cálculo con certificaciones
     System.out.println("Salario    del    Ingeniero     con        3    certificaciones:      "   +
 ingenieroEjemplo.calcularSalario(3));
   }
 }`,
    criterios: ["Define la clase Empleado", "Define la clase Gerente", "Define la clase Ingeniero", "Implementa el m\u00e9todo calcularSalario"],
    checks: [
       (c) =>  /class\s+Empleado/i.test(c),
       (c) =>  /class\s+Gerente/i.test(c),
       (c) =>  /class\s+Ingeniero/i.test(c),
       (c) =>  /calcularSalario\s*\(/i.test(c)
    ]
  },
  {
    id: 'dr_ej_5_3',
    titulo: `Dr. Java: Polimorfismo y sobrecarga - Ej 3`,
    nivel: '⭐⭐',
    temas: ["Polimorfismo y sobrecarga"],
    tiempo: '15 min',
    enunciado: `Implementa un sistema para calcular el área de diferentes figuras geométricas. Cada figura tiene
una forma diferente de calcular su área.

Clases a implementar:

    •   Figura (Clase base)
    •   Cuadrado (Subclase de Figura)
    •   Rectangulo (Subclase de Figura)
    •   Circulo (Subclase de Figura)

Polimorfismo:

Cada subclase debe sobrescribir el método calcularArea(), aplicando su propia fórmula:

    •   Cuadrado: Lado × Lado
    •   Rectángulo: Base × Altura
    •   Círculo: π × Radio²

Sobrecarga:

La clase Rectangulo debe tener una versión sobrecargada de calcularArea(int factor), que
multiplique el área por un factor determinado.
Pruebas:

    •   Crear objetos de cada figura (Cuadrado, Rectangulo, Circulo).

    •   Llamar al método calcularArea() en cada objeto.

    •   Para Rectangulo, llamar también a la versión sobrecargada con un factor.

Ejemplo de salida esperada:

 Área del Cuadrado: 25.0
 Área del Rectángulo: 30.0
 Área del Círculo: 78.5
 Área del Rectángulo con factor 2: 60.0`,
    pistas: ["Analiza bien los requisitos antes de programar.", "Revisa tus nombres de variables."],
    solucion: `Implementa un sistema para calcular el área de diferentes figuras geométricas. Cada figura tiene
una forma diferente de calcular su área.

Clases a implementar:

     •     Figura (Clase base)
     •     Cuadrado (Subclase de Figura)
     •     Rectangulo (Subclase de Figura)
     •     Circulo (Subclase de Figura)

Polimorfismo:

Cada subclase debe sobrescribir el método calcularArea(), aplicando su propia fórmula:

     •     Cuadrado: Lado × Lado
     •   Rectángulo: Base × Altura
     •   Círculo: π × Radio²

Sobrecarga:

La clase Rectangulo debe tener una versión sobrecargada de calcularArea(int factor), que
multiplique el área por un factor determinado.

Pruebas:

     •   Crear objetos de cada figura (Cuadrado, Rectangulo, Circulo).

     •   Llamar al método calcularArea() en cada objeto.

     •   Para Rectangulo, llamar también a la versión sobrecargada con un factor.

Ejemplo de salida esperada:

 Área del Cuadrado: 25.0
 Área del Rectángulo: 30.0
 Área del Círculo: 78.5
 Área del Rectángulo con factor 2: 60.0


 // Clase base Figura
 class Figura {
    public double calcularArea() {
      return 0;
    }
 }

 // Clase Cuadrado con polimorfismo
 class Cuadrado extends Figura {
    double ladoCuadrado;

     public Cuadrado(double ladoParametro) {
       ladoCuadrado = ladoParametro;
     }

     public double calcularArea() {
       return ladoCuadrado * ladoCuadrado;
     }
 }

 // Clase Rectangulo con polimorfismo y sobrecarga
 class Rectangulo extends Figura {
    double baseRectangulo;
    double alturaRectangulo;

     public Rectangulo(double baseParametro, double alturaParametro) {
       baseRectangulo = baseParametro;
       alturaRectangulo = alturaParametro;
     }
     public double calcularArea() {
       return baseRectangulo * alturaRectangulo;
     }

     // Sobrecarga con un factor multiplicador
     public double calcularArea(int factor) {
        return (baseRectangulo * alturaRectangulo) * factor;
     }
 }

 // Clase Circulo con polimorfismo
 class Circulo extends Figura {
    double radioCirculo;

     public Circulo(double radioParametro) {
       radioCirculo = radioParametro;
     }

     public double calcularArea() {
       return 3.14 * radioCirculo * radioCirculo;
     }
 }

 // Clase Main para probar el polimorfismo y la sobrecarga
 public class Main {
    public static void main(String[] args) {
      Cuadrado cuadradoEjemplo = new Cuadrado(5);
      Rectangulo rectanguloEjemplo = new Rectangulo(5, 6);
      Circulo circuloEjemplo = new Circulo(5);

         // Polimorfismo: cada figura usa su propia versión de calcularArea()
         System.out.println("Área del Cuadrado: " + cuadradoEjemplo.calcularArea());
         System.out.println("Área del Rectángulo: " + rectanguloEjemplo.calcularArea());
         System.out.println("Área del Círculo: " + circuloEjemplo.calcularArea());

     // Sobrecarga en Rectangulo: cálculo con factor
     System.out.println("Área     del      Rectángulo          con     factor     2:       "   +
 rectanguloEjemplo.calcularArea(2));
   }
 }`,
    criterios: ["Define la clase Circulo", "Define la clase Rectangulo", "Define la clase Figura", "Implementa el m\u00e9todo calcularArea"],
    checks: [
       (c) =>  /class\s+Circulo/i.test(c),
       (c) =>  /class\s+Rectangulo/i.test(c),
       (c) =>  /class\s+Figura/i.test(c),
       (c) =>  /calcularArea\s*\(/i.test(c)
    ]
  },
  {
    id: 'dr_ej_5_4',
    titulo: `Dr. Java: Polimorfismo y sobrecarga - Ej 4`,
    nivel: '⭐⭐',
    temas: ["Polimorfismo y sobrecarga"],
    tiempo: '15 min',
    enunciado: `Implementa un sistema para una tienda de instrumentos musicales. Se necesita clasificar
diferentes tipos de instrumentos y describir cómo suenan.

Clases a implementar:

    •   Instrumento (Clase base)
    •   Guitarra (Subclase de Instrumento)
    •   Piano (Subclase de Instrumento)
    •   Bateria (Subclase de Instrumento)

Polimorfismo:

Cada subclase debe sobrescribir el método tocarInstrumento(), devolviendo un sonido
característico:

    •   Guitarra: "Rasgueando cuerdas..."
    •   Piano: "Notas melodiosas suenan..."
    •   Batería: "Pum pum chas!"

Sobrecarga:

La clase Guitarra debe tener una versión sobrecargada de tocarInstrumento(int cuerdas), que
indique cuántas cuerdas se están tocando.

Pruebas:

    •   Crear objetos de cada instrumento (Guitarra, Piano, Bateria).

    •   Llamar al método tocarInstrumento() en cada objeto.

    •   Para Guitarra, llamar también a la versión sobrecargada con el número de cuerdas
        tocadas.

Ejemplo de salida esperada:

 Guitarra: Rasgueando cuerdas...
 Piano: Notas melodiosas suenan...
Batería: Pum pum chas!
Guitarra tocando 6 cuerdas: Rasgueando 6 cuerdas...`,
    pistas: ["Analiza bien los requisitos antes de programar.", "Revisa tus nombres de variables."],
    solucion: `Implementa un sistema para una tienda de instrumentos musicales. Se necesita clasificar
diferentes tipos de instrumentos y describir cómo suenan.

Clases a implementar:

     •     Instrumento (Clase base)
     •     Guitarra (Subclase de Instrumento)
     •     Piano (Subclase de Instrumento)
   •   Bateria (Subclase de Instrumento)

Polimorfismo:

Cada subclase debe sobrescribir el método tocarInstrumento(), devolviendo un sonido
característico:

   •   Guitarra: "Rasgueando cuerdas..."
   •   Piano: "Notas melodiosas suenan..."
   •   Batería: "Pum pum chas!"

Sobrecarga:

La clase Guitarra debe tener una versión sobrecargada de tocarInstrumento(int cuerdas), que
indique cuántas cuerdas se están tocando.

Pruebas:

   •   Crear objetos de cada instrumento (Guitarra, Piano, Bateria).

   •   Llamar al método tocarInstrumento() en cada objeto.

   •   Para Guitarra, llamar también a la versión sobrecargada con el número de cuerdas
       tocadas.

Ejemplo de salida esperada:

 Guitarra: Rasgueando cuerdas...
 Piano: Notas melodiosas suenan...
 Batería: Pum pum chas!
 Guitarra tocando 6 cuerdas: Rasgueando 6 cuerdas...


 // Clase base Instrumento
 class Instrumento {
    public String tocarInstrumento() {
      return "Sonido de instrumento desconocido...";
    }
 }

 // Clase Guitarra con polimorfismo y sobrecarga
 class Guitarra extends Instrumento {
    String tipoGuitarra;

   public Guitarra(String tipoParametro) {
     tipoGuitarra = tipoParametro;
   }

   public String tocarInstrumento() {
     return "Rasgueando cuerdas...";
   }

   // Sobrecarga con número de cuerdas
   public String tocarInstrumento(int cuerdas) {
      return "Rasgueando " + cuerdas + " cuerdas...";
    }
}

// Clase Piano con polimorfismo
class Piano extends Instrumento {
   int teclasPiano;

    public Piano(int teclasParametro) {
      teclasPiano = teclasParametro;
    }

    public String tocarInstrumento() {
      return "Notas melodiosas suenan...";
    }
}

// Clase Bateria con polimorfismo
class Bateria extends Instrumento {
   int tamboresBateria;

    public Bateria(int tamboresParametro) {
      tamboresBateria = tamboresParametro;
    }

    public String tocarInstrumento() {
      return "Pum pum chas!";
    }
}

// Clase Main para probar polimorfismo y sobrecarga
public class Main {
   public static void main(String[] args) {
     Guitarra guitarraEjemplo = new Guitarra("Acústica");
     Piano pianoEjemplo = new Piano(88);
     Bateria bateriaEjemplo = new Bateria(5);

        // Polimorfismo: cada instrumento usa su propia versión de tocarInstrumento()
        System.out.println("Guitarra: " + guitarraEjemplo.tocarInstrumento());
        System.out.println("Piano: " + pianoEjemplo.tocarInstrumento());
        System.out.println("Batería: " + bateriaEjemplo.tocarInstrumento());

     // Sobrecarga en Guitarra: tocar con un número de cuerdas específico
     System.out.println("Guitarra        tocando        6        cuerdas:          "    +
guitarraEjemplo.tocarInstrumento(6));
  }
}`,
    criterios: ["Define la clase Guitarra", "Define la clase Piano", "Define la clase Bateria", "Implementa el m\u00e9todo tocarInstrumento"],
    checks: [
       (c) =>  /class\s+Guitarra/i.test(c),
       (c) =>  /class\s+Piano/i.test(c),
       (c) =>  /class\s+Bateria/i.test(c),
       (c) =>  /tocarInstrumento\s*\(/i.test(c)
    ]
  },
  {
    id: 'dr_ej_6_1',
    titulo: `Dr. Java: Orden de llamada a constructores - Ej 1`,
    nivel: '⭐⭐',
    temas: ["Orden de llamada a constructores"],
    tiempo: '15 min',
    enunciado: `Desarrolla un sistema que modele una cadena de fabricación de productos electrónicos, con
diferentes niveles de herencia y constructores encadenados para observar el orden de ejecución
de los constructores cuando se crean objetos de la subclase más específica.

Clases a implementar:

    •    Producto (Clase base)

    •    Electronico (Subclase de Producto)

    •    Computadora (Subclase de Electronico)

    •    Portatil (Subclase de Computadora)

Inicialización de atributos:

    •    Cada clase debe tener atributos propios, como nombre, fabricante, procesador, peso,
         etc.

    •    El constructor de cada clase debe inicializar estos atributos e imprimir un mensaje para
         indicar su ejecución.

Crea un objeto de la clase Portatil y observa el orden en que se ejecutan los constructores y
cómo se inicializan los atributos. Ejemplo de salida del sistema:

 Constructor de Producto ejecutado
 Nombre: Dispositivo
 Fabricante: Genérico

 Constructor de Electronico ejecutado
 Voltaje: 220V

 Constructor de Computadora ejecutado
 Procesador: Intel Core i7
 RAM: 16GB

 Constructor de Portatil ejecutado
 Peso: 1.5 kg
 Autonomía: 10 horas`,
    pistas: ["Analiza bien los requisitos antes de programar.", "Revisa tus nombres de variables."],
    solucion: `Desarrolla un sistema que modele una cadena de fabricación de productos electrónicos, con
diferentes niveles de herencia y constructores encadenados para observar el orden de ejecución
de los constructores cuando se crean objetos de la subclase más específica.

Clases a implementar:

    •    Producto (Clase base)

    •    Electronico (Subclase de Producto)

    •    Computadora (Subclase de Electronico)

    •    Portatil (Subclase de Computadora)

Inicialización de atributos:

    •    Cada clase debe tener atributos propios, como nombre, fabricante, procesador, peso,
         etc.

    •    El constructor de cada clase debe inicializar estos atributos e imprimir un mensaje para
         indicar su ejecución.

Crea un objeto de la clase Portatil y observa el orden en que se ejecutan los constructores y
cómo se inicializan los atributos. Ejemplo de salida del sistema:

 Constructor de Producto ejecutado
 Nombre: Dispositivo
 Fabricante: Genérico

 Constructor de Electronico ejecutado
 Voltaje: 220V

 Constructor de Computadora ejecutado
 Procesador: Intel Core i7
 RAM: 16GB

 Constructor de Portatil ejecutado
 Peso: 1.5 kg
 Autonomía: 10 horas


 // Clase base Producto
 class Producto {
    String nombre;
    String fabricante;

   public Producto() {
     nombre = "Dispositivo";
     fabricante = "Genérico";
     System.out.println("Constructor de Producto ejecutado");
     System.out.println("Nombre: " + nombre);
        System.out.println("Fabricante: " + fabricante);
        System.out.println();
    }
}

// Subclase Electronico
class Electronico extends Producto {
   int voltaje;

    public Electronico() {
      voltaje = 220;
      System.out.println("Constructor de Electronico ejecutado");
      System.out.println("Voltaje: " + voltaje + "V");
      System.out.println();
    }
}

// Subclase Computadora
class Computadora extends Electronico {
   String procesador;
   int ram;

    public Computadora() {
      procesador = "Intel Core i7";
      ram = 16;
      System.out.println("Constructor de Computadora ejecutado");
      System.out.println("Procesador: " + procesador);
      System.out.println("RAM: " + ram + "GB");
      System.out.println();
    }
}

// Subclase Portatil
class Portatil extends Computadora {
   double peso;
   int autonomia;

    public Portatil() {
      peso = 1.5;
      autonomia = 10;
      System.out.println("Constructor de Portatil ejecutado");
      System.out.println("Peso: " + peso + " kg");
      System.out.println("Autonomía: " + autonomia + " horas");
      System.out.println();
    }
}

// Clase Main para probar el orden de ejecución de los constructores
public class Main {
   public static void main(String[] args) {
     Portatil portatilEjemplo = new Portatil();
   }
 }`,
    criterios: ["Define la clase Producto", "Define la clase Computadora", "Define la clase debe"],
    checks: [
       (c) =>  /class\s+Producto/i.test(c),
       (c) =>  /class\s+Computadora/i.test(c),
       (c) =>  /class\s+debe/i.test(c)
    ]
  },
  {
    id: 'dr_ej_6_2',
    titulo: `Dr. Java: Orden de llamada a constructores - Ej 2`,
    nivel: '⭐⭐',
    temas: ["Orden de llamada a constructores"],
    tiempo: '15 min',
    enunciado: `Desarrolla un sistema que modele distintos tipos de vehículos terrestres, con diferentes niveles
de herencia y constructores encadenados para analizar el orden de ejecución de los
constructores cuando se crean objetos de la subclase más específica.

Clases a implementar:

    •    Vehiculo (Clase base)
    •    Motorizado (Subclase de Vehiculo)
    •   Automovil (Subclase de Motorizado)
    •   Deportivo (Subclase de Automovil)

Inicialización de Atributos:

    •   Cada clase debe tener atributos propios, como tipo, motor, cilindraje, velocidad
        máxima, etc.
    •   Cada constructor debe inicializar estos atributos e imprimir un mensaje que indique su
        ejecución.

Crea un objeto de cada una de las clases y observa el orden en que se ejecutan los constructores
y cómo se inicializan los atributos.`,
    pistas: ["Analiza bien los requisitos antes de programar.", "Revisa tus nombres de variables."],
    solucion: `Desarrolla un sistema que modele distintos tipos de vehículos terrestres, con diferentes niveles
de herencia y constructores encadenados para analizar el orden de ejecución de los
constructores cuando se crean objetos de la subclase más específica.

Clases a implementar:

     •   Vehiculo (Clase base)
     •   Motorizado (Subclase de Vehiculo)
     •   Automovil (Subclase de Motorizado)
     •   Deportivo (Subclase de Automovil)

Inicialización de Atributos:

     •   Cada clase debe tener atributos propios, como tipo, motor, cilindraje, velocidad
         máxima, etc.
     •   Cada constructor debe inicializar estos atributos e imprimir un mensaje que indique su
         ejecución.

Crea un objeto de cada una de las clases y observa el orden en que se ejecutan los constructores
y cómo se inicializan los atributos.

 // Clase base Vehiculo
 class Vehiculo {
    String tipo;

     public Vehiculo() {
       tipo = "Terrestre";
       System.out.println("Constructor de Vehiculo ejecutado");
       System.out.println("Tipo: " + tipo);
       System.out.println();
     }
 }

 // Subclase Motorizado
 class Motorizado extends Vehiculo {
    String motor;

     public Motorizado() {
       motor = "Combustión";
       System.out.println("Constructor de Motorizado ejecutado");
       System.out.println("Motor: " + motor);
       System.out.println();
     }
 }

 // Subclase Automovil
 class Automovil extends Motorizado {
    int cilindraje;
     public Automovil() {
       cilindraje = 2000;
       System.out.println("Constructor de Automovil ejecutado");
       System.out.println("Cilindraje: " + cilindraje + " cc");
       System.out.println();
     }
 }

 // Subclase Deportivo
 class Deportivo extends Automovil {
    int velocidadMaxima;

     public Deportivo() {
       velocidadMaxima = 300;
       System.out.println("Constructor de Deportivo ejecutado");
       System.out.println("Velocidad Máxima: " + velocidadMaxima + " km/h");
       System.out.println();
     }
 }

 // Clase Main para probar el orden de ejecución de los constructores
 public class Main {
    public static void main(String[] args) {
      Deportivo autoDeportivo = new Deportivo();
    }
 }`,
    criterios: ["Define la clase Vehiculo", "Define la clase Automovil", "Define la clase Deportivo"],
    checks: [
       (c) =>  /class\s+Vehiculo/i.test(c),
       (c) =>  /class\s+Automovil/i.test(c),
       (c) =>  /class\s+Deportivo/i.test(c)
    ]
  },
  {
    id: 'dr_ej_6_3',
    titulo: `Dr. Java: Orden de llamada a constructores - Ej 3`,
    nivel: '⭐⭐',
    temas: ["Orden de llamada a constructores"],
    tiempo: '15 min',
    enunciado: `Desarrolla un sistema que modele distintos tipos de dispositivos inteligentes con diferentes
niveles de herencia y constructores encadenados para analizar el orden de ejecución de los
constructores cuando se crean objetos de la subclase más específica.

Clases a implementar:

    •   Dispositivo (Clase base)
    •   DispositivoInteligente (Subclase de Dispositivo)
    •   Telefono (Subclase de DispositivoInteligente)
    •   Smartphone (Subclase de Telefono)

Inicialización de Atributos:

    •   Cada clase debe tener atributos propios, como nombre, conectividad, sistema
        operativo, cámara, etc.
    •   Cada constructor debe inicializar estos atributos e imprimir un mensaje que indique su
        ejecución.

Crea un objeto de cada clase y observa el orden en que se ejecutan los constructores y cómo se
inicializan los atributos.`,
    pistas: ["Analiza bien los requisitos antes de programar.", "Revisa tus nombres de variables."],
    solucion: `Desarrolla un sistema que modele distintos tipos de dispositivos inteligentes con diferentes
niveles de herencia y constructores encadenados para analizar el orden de ejecución de los
constructores cuando se crean objetos de la subclase más específica.

Clases a implementar:

     •   Dispositivo (Clase base)
     •   DispositivoInteligente (Subclase de Dispositivo)
     •   Telefono (Subclase de DispositivoInteligente)
     •   Smartphone (Subclase de Telefono)

Inicialización de Atributos:

     •   Cada clase debe tener atributos propios, como nombre, conectividad, sistema
         operativo, cámara, etc.
     •   Cada constructor debe inicializar estos atributos e imprimir un mensaje que indique su
         ejecución.

Crea un objeto de cada clase y observa el orden en que se ejecutan los constructores y cómo se
inicializan los atributos.

 // Clase base Dispositivo
class Dispositivo {
   String nombre;

    public Dispositivo() {
      nombre = "Electrónico";
      System.out.println("Constructor de Dispositivo ejecutado");
      System.out.println("Nombre: " + nombre);
      System.out.println();
    }
}

// Subclase DispositivoInteligente
class DispositivoInteligente extends Dispositivo {
   String conectividad;

    public DispositivoInteligente() {
      conectividad = "WiFi";
      System.out.println("Constructor de DispositivoInteligente ejecutado");
      System.out.println("Conectividad: " + conectividad);
      System.out.println();
    }
}

// Subclase Telefono
class Telefono extends DispositivoInteligente {
   String sistemaOperativo;

    public Telefono() {
      sistemaOperativo = "Android";
      System.out.println("Constructor de Telefono ejecutado");
      System.out.println("Sistema Operativo: " + sistemaOperativo);
      System.out.println();
    }
}

// Subclase Smartphone
class Smartphone extends Telefono {
   String camara;

    public Smartphone() {
      camara = "108 MP";
      System.out.println("Constructor de Smartphone ejecutado");
      System.out.println("Cámara: " + camara);
      System.out.println();
    }
}

// Clase Main para probar el orden de ejecución de los constructores
public class Main {
   public static void main(String[] args) {
     Smartphone miSmartphone = new Smartphone();
   }
 }`,
    criterios: ["Define la clase Smartphone", "Define la clase DispositivoInteligente", "Define la clase y"],
    checks: [
       (c) =>  /class\s+Smartphone/i.test(c),
       (c) =>  /class\s+DispositivoInteligente/i.test(c),
       (c) =>  /class\s+y/i.test(c)
    ]
  },
  {
    id: 'dr_ej_6_4',
    titulo: `Dr. Java: Orden de llamada a constructores - Ej 4`,
    nivel: '⭐⭐',
    temas: ["Orden de llamada a constructores"],
    tiempo: '15 min',
    enunciado: `Desarrolla un sistema que modele distintos tipos de transporte público con múltiples niveles de
herencia y sobrecarga de constructores para analizar el orden de ejecución de los constructores
cuando se crean objetos de la subclase más específica, considerando la sobrecarga en algunas
clases.

Clases a implementar:

    •   Transporte (Clase base)
    •   TransportePublico (Subclase de Transporte)
    •   Autobus (Subclase de TransportePublico)
    •   AutobusElectrico (Subclase de Autobus)
Sobrecarga de constructores:

    •   Transporte tiene un constructor sin parámetros y otro que recibe el tipo.
    •   TransportePublico tiene un constructor que permite definir la capacidad de pasajeros.
    •   Autobus tiene un constructor que permite definir la ruta.
    •   AutobusElectrico tiene un constructor que permite definir la autonomía de la batería.

Crea objetos con diferentes constructores y observa el orden de ejecución de los constructores.`,
    pistas: ["Analiza bien los requisitos antes de programar.", "Revisa tus nombres de variables."],
    solucion: `Desarrolla un sistema que modele distintos tipos de transporte público con múltiples niveles de
herencia y sobrecarga de constructores para analizar el orden de ejecución de los constructores
cuando se crean objetos de la subclase más específica, considerando la sobrecarga en algunas
clases.

Clases a implementar:

     •   Transporte (Clase base)
     •   TransportePublico (Subclase de Transporte)
     •   Autobus (Subclase de TransportePublico)
     •   AutobusElectrico (Subclase de Autobus)

Sobrecarga de constructores:

     •   Transporte tiene un constructor sin parámetros y otro que recibe el tipo.
     •   TransportePublico tiene un constructor que permite definir la capacidad de pasajeros.
     •   Autobus tiene un constructor que permite definir la ruta.
     •   AutobusElectrico tiene un constructor que permite definir la autonomía de la batería.

Crea objetos con diferentes constructores y observa el orden de ejecución de los constructores.

 // Clase base Transporte
 class Transporte {
    String tipo;

     // Constructor sin parámetros
     public Transporte() {
        tipo = "Público";
        System.out.println("Constructor de Transporte ejecutado");
        System.out.println("Tipo: " + tipo);
        System.out.println();
     }

     // Constructor sobrecargado
     public Transporte(String tipoTransporte) {
        tipo = tipoTransporte;
        System.out.println("Constructor de Transporte ejecutado con tipo personalizado");
        System.out.println("Tipo: " + tipo);
        System.out.println();
     }
 }

 // Subclase TransportePublico
 class TransportePublico extends Transporte {
    int capacidadPasajeros;

     // Constructor sin parámetros
     public TransportePublico() {
        capacidadPasajeros = 40;
        System.out.println("Constructor de TransportePublico ejecutado");
        System.out.println("Capacidad de pasajeros: " + capacidadPasajeros);
        System.out.println();
    }

  // Constructor sobrecargado
  public TransportePublico(int capacidad) {
     capacidadPasajeros = capacidad;
     System.out.println("Constructor de TransportePublico ejecutado con capacidad
personalizada");
     System.out.println("Capacidad de pasajeros: " + capacidadPasajeros);
     System.out.println();
  }
}

// Subclase Autobus
class Autobus extends TransportePublico {
   String ruta;

    // Constructor sin parámetros
    public Autobus() {
       ruta = "Centro - Norte";
       System.out.println("Constructor de Autobus ejecutado");
       System.out.println("Ruta: " + ruta);
       System.out.println();
    }

    // Constructor sobrecargado
    public Autobus(String nuevaRuta) {
       ruta = nuevaRuta;
       System.out.println("Constructor de Autobus ejecutado con ruta personalizada");
       System.out.println("Ruta: " + ruta);
       System.out.println();
    }
}

// Subclase AutobusElectrico
class AutobusElectrico extends Autobus {
   int autonomiaBateria;

    // Constructor sin parámetros
    public AutobusElectrico() {
       autonomiaBateria = 300;
       System.out.println("Constructor de AutobusElectrico ejecutado");
       System.out.println("Autonomía de batería: " + autonomiaBateria + " km");
       System.out.println();
    }

    // Constructor sobrecargado
    public AutobusElectrico(int autonomia) {
       autonomiaBateria = autonomia;
     System.out.println("Constructor de AutobusElectrico ejecutado con autonomía
 personalizada");
     System.out.println("Autonomía de batería: " + autonomiaBateria + " km");
     System.out.println();
   }
 }

 // Clase Main para probar el orden de ejecución de los constructores
 public class Main {
    public static void main(String[] args) {
      System.out.println("Creando un AutobusElectrico con valores predeterminados");
      AutobusElectrico bus1 = new AutobusElectrico();

         System.out.println("Creando un AutobusElectrico con valores personalizados");
         AutobusElectrico bus2 = new AutobusElectrico(400);
     }
 }`,
    criterios: ["Define la clase TransportePublico", "Define la clase AutobusElectrico", "Define la clase m\u00e1s"],
    checks: [
       (c) =>  /class\s+TransportePublico/i.test(c),
       (c) =>  /class\s+AutobusElectrico/i.test(c),
       (c) =>  /class\s+más/i.test(c)
    ]
  },
  {
    id: 'dr_ej_6_5',
    titulo: `Dr. Java: Orden de llamada a constructores - Ej 5`,
    nivel: '⭐⭐',
    temas: ["Orden de llamada a constructores"],
    tiempo: '15 min',
    enunciado: `Amplía el ejercicio 2 y desarrolla un sistema que modele diferentes tipos de vehículos con
múltiples niveles de herencia y sobrecarga de constructores para analizar el orden de ejecución
de los constructores cuando se crean objetos de la subclase más específica, considerando la
sobrecarga en varias clases.

Clases a implementar:

    •   Vehiculo (Clase base)
    •   VehiculoMotorizado (Subclase de Vehiculo)
    •   Automovil (Subclase de VehiculoMotorizado)
    •   Camion (Subclase de VehiculoMotorizado)
    •   Deportivo (Subclase de Automovil)
    •   CamionElectrico (Subclase de Camion)

Sobrecarga de constructores:

    •   Vehiculo tiene un constructor sin parámetros y otro que recibe el tipo.
    •   VehiculoMotorizado tiene un constructor que permite definir el tipo de motor.
    •   Automovil y Camion tienen constructores que permiten definir la cantidad de puertas o
        la carga máxima.
    •   Deportivo y CamionElectrico tienen constructores que permiten definir características
        adicionales.

Instancia objetos con diferentes constructores y observa el orden de ejecución.`,
    pistas: ["Analiza bien los requisitos antes de programar.", "Revisa tus nombres de variables."],
    solucion: `Amplía el ejercicio 2 y desarrolla un sistema que modele diferentes tipos de vehículos con
múltiples niveles de herencia y sobrecarga de constructores para analizar el orden de ejecución
de los constructores cuando se crean objetos de la subclase más específica, considerando la
sobrecarga en varias clases.

Clases a implementar:

     •     Vehiculo (Clase base)
     •     VehiculoMotorizado (Subclase de Vehiculo)
     •     Automovil (Subclase de VehiculoMotorizado)
     •     Camion (Subclase de VehiculoMotorizado)
     •     Deportivo (Subclase de Automovil)
     •     CamionElectrico (Subclase de Camion)

Sobrecarga de constructores:

     •     Vehiculo tiene un constructor sin parámetros y otro que recibe el tipo.
     •     VehiculoMotorizado tiene un constructor que permite definir el tipo de motor.
     •     Automovil y Camion tienen constructores que permiten definir la cantidad de puertas o
           la carga máxima.
     •     Deportivo y CamionElectrico tienen constructores que permiten definir características
           adicionales.

Instancia objetos con diferentes constructores y observa el orden de ejecución.

 // Clase base Vehiculo
 class Vehiculo {
    String tipo;

     public Vehiculo() {
       tipo = "Terrestre";
       System.out.println("Constructor de Vehiculo ejecutado");
        System.out.println("Tipo: " + tipo);
        System.out.println();
    }

    public Vehiculo(String tipoVehiculo) {
      tipo = tipoVehiculo;
      System.out.println("Constructor de Vehiculo ejecutado con tipo personalizado");
      System.out.println("Tipo: " + tipo);
      System.out.println();
    }
}

// Subclase VehiculoMotorizado
class VehiculoMotorizado extends Vehiculo {
   String motor;

    public VehiculoMotorizado() {
      motor = "Gasolina";
      System.out.println("Constructor de VehiculoMotorizado ejecutado");
      System.out.println("Motor: " + motor);
      System.out.println();
    }

  public VehiculoMotorizado(String tipoMotor) {
    motor = tipoMotor;
    System.out.println("Constructor de VehiculoMotorizado          ejecutado    con     motor
personalizado");
    System.out.println("Motor: " + motor);
    System.out.println();
  }
}

// Subclase Automovil
class Automovil extends VehiculoMotorizado {
   int puertas;

    public Automovil() {
      puertas = 4;
      System.out.println("Constructor de Automovil ejecutado");
      System.out.println("Puertas: " + puertas);
      System.out.println();
    }

  public Automovil(int numPuertas) {
    puertas = numPuertas;
    System.out.println("Constructor de Automovil ejecutado con número de puertas
personalizado");
    System.out.println("Puertas: " + puertas);
    System.out.println();
  }
}
// Subclase Camion
class Camion extends VehiculoMotorizado {
   int cargaMaxima;

  public Camion() {
    cargaMaxima = 10;
    System.out.println("Constructor de Camion ejecutado");
    System.out.println("Carga Máxima: " + cargaMaxima + " toneladas");
    System.out.println();
  }

  public Camion(int carga) {
    cargaMaxima = carga;
    System.out.println("Constructor de Camion ejecutado con              carga   máxima
personalizada");
    System.out.println("Carga Máxima: " + cargaMaxima + " toneladas");
    System.out.println();
  }
}

// Subclase Deportivo (hereda de Automovil)
class Deportivo extends Automovil {
   int velocidadMaxima;

  public Deportivo() {
    velocidadMaxima = 300;
    System.out.println("Constructor de Deportivo ejecutado");
    System.out.println("Velocidad Máxima: " + velocidadMaxima + " km/h");
    System.out.println();
  }

  public Deportivo(int velocidad) {
    velocidadMaxima = velocidad;
    System.out.println("Constructor de Deportivo ejecutado con velocidad máxima
personalizada");
    System.out.println("Velocidad Máxima: " + velocidadMaxima + " km/h");
    System.out.println();
  }
}

// Subclase CamionElectrico (hereda de Camion)
class CamionElectrico extends Camion {
   int autonomiaBateria;

  public CamionElectrico() {
    autonomiaBateria = 400;
    System.out.println("Constructor de CamionElectrico ejecutado");
    System.out.println("Autonomía de batería: " + autonomiaBateria + " km");
    System.out.println();
  }

  public CamionElectrico(int autonomia) {
    autonomiaBateria = autonomia;
    System.out.println("Constructor de CamionElectrico ejecutado con              autonomía
personalizada");
    System.out.println("Autonomía de batería: " + autonomiaBateria + " km");
    System.out.println();
  }
}

// Clase Main para probar el orden de ejecución de los constructores
public class Main {
   public static void main(String[] args) {
     System.out.println("Creando un Deportivo con valores predeterminados");
     Deportivo autoDeportivo = new Deportivo();

        System.out.println("Creando un CamionElectrico con valores personalizados");
        CamionElectrico camion1 = new CamionElectrico(500);
    }
}`,
    criterios: ["Define la clase Vehiculo", "Define la clase Automovil", "Define la clase Deportivo"],
    checks: [
       (c) =>  /class\s+Vehiculo/i.test(c),
       (c) =>  /class\s+Automovil/i.test(c),
       (c) =>  /class\s+Deportivo/i.test(c)
    ]
  },
  {
    id: 'dr_ej_7_1',
    titulo: `Dr. Java: Arrays de objetos - Ej 1`,
    nivel: '⭐⭐',
    temas: ["Arrays de objetos"],
    tiempo: '15 min',
    enunciado: `Desarrolla un programa que administre una flota de vehículos utilizando arrays de objetos. El
sistema permitirá almacenar información de varios vehículos y mostrará un resumen de todos
los vehículos registrados. Para ello:

    •   Implementa las clases Vehiculo (Clase base con atributos generales), Automovil y
        Camion (Subclases de Vehiculo con atributos específicos).
    •   Crea un array de objetos para almacenar múltiples vehículos. El array debe permitir
        agregar tanto automóviles como camiones.
    •   Implementa un método para agregar vehículos al array. Y otro método para mostrar
        todos los vehículos registrados.
    •   Para probar el sistema, crea un array de 5 vehículos y muestra la información en la
        consola.`,
    pistas: ["Analiza bien los requisitos antes de programar.", "Revisa tus nombres de variables."],
    solucion: `Desarrolla un programa que administre una flota de vehículos utilizando arrays de objetos. El
sistema permitirá almacenar información de varios vehículos y mostrará un resumen de todos
los vehículos registrados. Para ello:

     •   Implementa las clases Vehiculo (Clase base con atributos generales), Automovil y
         Camion (Subclases de Vehiculo con atributos específicos).
     •   Crea un array de objetos para almacenar múltiples vehículos. El array debe permitir
         agregar tanto automóviles como camiones.
     •   Implementa un método para agregar vehículos al array. Y otro método para mostrar
         todos los vehículos registrados.
     •   Para probar el sistema, crea un array de 5 vehículos y muestra la información en la
         consola.

 class Vehiculo {
    String marca;
    String modelo;
    int anio;

     public Vehiculo(String marcaVehiculo, String modeloVehiculo, int anioVehiculo) {
       marca = marcaVehiculo;
       modelo = modeloVehiculo;
       anio = anioVehiculo;
     }

     public void mostrarInfo() {
       System.out.println("Marca: " + marca + ", Modelo: " + modelo + ", Año: " + anio);
     }
 }

 class Automovil extends Vehiculo {
    int puertas;

   public Automovil(String marcaVehiculo, String modeloVehiculo, int anioVehiculo, int
 numPuertas) {
     marca = marcaVehiculo;
     modelo = modeloVehiculo;
     anio = anioVehiculo;
     puertas = numPuertas;
   }

     public void mostrarInfo() {
       System.out.println("Marca: " + marca + ", Modelo: " + modelo + ", Año: " + anio);
       System.out.println("Puertas: " + puertas);
     }
 }

 class Camion extends Vehiculo {
     int cargaMaxima;

     public Camion(String marcaVehiculo, String modeloVehiculo, int anioVehiculo, int carga) {
       marca = marcaVehiculo;
       modelo = modeloVehiculo;
       anio = anioVehiculo;
       cargaMaxima = carga;
     }

     public void mostrarInfo() {
       System.out.println("Marca: " + marca + ", Modelo: " + modelo + ", Año: " + anio);
       System.out.println("Carga Máxima: " + cargaMaxima + " toneladas");
     }
 }

 public class Main {
   public static void main(String[] args) {
     Vehiculo[] flota = new Vehiculo[5];

         flota[0] = new Automovil("Toyota", "Corolla", 2020, 4);
         flota[1] = new Automovil("Honda", "Civic", 2022, 4);
         flota[2] = new Camion("Volvo", "FH16", 2019, 20);
         flota[3] = new Automovil("Ford", "Focus", 2018, 4);
         flota[4] = new Camion("Mercedes", "Actros", 2021, 25);

         System.out.println("Vehículos registrados: ");
         for (int i = 0; i &lt; flota.length; i++) {
           flota[i].mostrarInfo();
         }
     }
 }`,
    criterios: ["Define la clase Automovil", "Define la clase Main", "Define la clase Vehiculo"],
    checks: [
       (c) =>  /class\s+Automovil/i.test(c),
       (c) =>  /class\s+Main/i.test(c),
       (c) =>  /class\s+Vehiculo/i.test(c)
    ]
  },
  {
    id: 'dr_ej_7_2',
    titulo: `Dr. Java: Arrays de objetos - Ej 2`,
    nivel: '⭐⭐',
    temas: ["Arrays de objetos"],
    tiempo: '15 min',
    enunciado: `Desarrolla un programa que administre un inventario de dispositivos electrónicos utilizando
arrays de objetos. El sistema permitirá almacenar información de varios dispositivos y mostrará
un resumen de todos los dispositivos registrados. Para ello:

    •   Implementa las clases Dispositivo (Clase base con atributos generales), Smartphone y
        Laptop (Subclases de Dispositivo con atributos específicos).
    •   Crea un array de objetos para almacenar múltiples dispositivos. El array debe permitir
        agregar tanto smartphones como laptops.
    •   Implementa un método para agregar dispositivos al array y otro método para mostrar
        todos los dispositivos registrados.
    •   Para probar el sistema crea un array de 5 dispositivos (combinando smartphones y
        laptops) y muestra la información de los dispositivos en la consola.`,
    pistas: ["Analiza bien los requisitos antes de programar.", "Revisa tus nombres de variables."],
    solucion: `Desarrolla un programa que administre un inventario de dispositivos electrónicos utilizando
arrays de objetos. El sistema permitirá almacenar información de varios dispositivos y mostrará
un resumen de todos los dispositivos registrados. Para ello:

     •     Implementa las clases Dispositivo (Clase base con atributos generales), Smartphone y
           Laptop (Subclases de Dispositivo con atributos específicos).
     •     Crea un array de objetos para almacenar múltiples dispositivos. El array debe permitir
           agregar tanto smartphones como laptops.
     •     Implementa un método para agregar dispositivos al array y otro método para mostrar
           todos los dispositivos registrados.
     •     Para probar el sistema crea un array de 5 dispositivos (combinando smartphones y
           laptops) y muestra la información de los dispositivos en la consola.



 class Dispositivo {
    String marca;
    String modelo;
    double precio;

  public Dispositivo(String marcaDispositivo,           String   modeloDispositivo,     double
precioDispositivo) {
    marca = marcaDispositivo;
    modelo = modeloDispositivo;
    precio = precioDispositivo;
  }

    public void mostrarInfo() {
      System.out.println("Marca: " + marca + ", Modelo: " + modelo + ", Precio: " + precio);
    }
}

class Smartphone extends Dispositivo {
   int almacenamiento;

  public Smartphone(String marcaDispositivo,            String   modeloDispositivo,     double
precioDispositivo, int almacenamientoGB) {
    marca = marcaDispositivo;
    modelo = modeloDispositivo;
    precio = precioDispositivo;
    almacenamiento = almacenamientoGB;
  }

    public void mostrarInfo() {
      System.out.println("Marca: " + marca + ", Modelo: " + modelo + ", Precio: " + precio);
      System.out.println("Almacenamiento: " + almacenamiento + "GB");
    }
}

class Laptop extends Dispositivo {
   double tamanoPantalla;

  public Laptop(String marcaDispositivo, String modeloDispositivo, double precioDispositivo,
double pantallaPulgadas) {
    marca = marcaDispositivo;
    modelo = modeloDispositivo;
    precio = precioDispositivo;
    tamanoPantalla = pantallaPulgadas;
  }

    public void mostrarInfo() {
      System.out.println("Marca: " + marca + ", Modelo: " + modelo + ", Precio: " + precio);
      System.out.println("Tamaño de pantalla: " + tamanoPantalla + " pulgadas");
    }
}

public class Main {
  public static void main(String[] args) {
    Dispositivo[] inventario = new Dispositivo[5];
         inventario[0] = new Smartphone("Samsung", "Galaxy S21", 799.99, 128);
         inventario[1] = new Laptop("Dell", "XPS 13", 1199.99, 13.3);
         inventario[2] = new Smartphone("Apple", "iPhone 14", 999.99, 256);
         inventario[3] = new Laptop("HP", "Pavilion 15", 799.99, 15.6);
         inventario[4] = new Smartphone("Google", "Pixel 7", 599.99, 128);

         System.out.println("Inventario de dispositivos electrónicos");
         for (int i = 0; i &lt; inventario.length; i++) {
           inventario[i].mostrarInfo();
         }
     }
 }`,
    criterios: ["Define la clase Laptop", "Define la clase Dispositivo", "Define la clase Smartphone"],
    checks: [
       (c) =>  /class\s+Laptop/i.test(c),
       (c) =>  /class\s+Dispositivo/i.test(c),
       (c) =>  /class\s+Smartphone/i.test(c)
    ]
  },
  {
    id: 'dr_ej_7_3',
    titulo: `Dr. Java: Arrays de objetos - Ej 3`,
    nivel: '⭐⭐',
    temas: ["Arrays de objetos"],
    tiempo: '15 min',
    enunciado: `Desarrolla un programa que administre un sistema de empleados utilizando arrays de objetos.
El sistema permitirá almacenar información de diferentes tipos de empleados y mostrará un
resumen de todos los empleados registrados. Para ello:

    •   Implementa las clases Empleado (Clase base con atributos generales), Gerente,
        Desarrollador y Asistente (Subclases de Empleado con atributos específicos),
        DesarrolladorBackend y DesarrolladorFrontend (Subclases de Desarrollador con
        atributos especializados).
    •   Crea un array de objetos para almacenar múltiples empleados. El array debe permitir
        agregar gerentes, desarrolladores backend, desarrolladores frontend y asistentes.
    •   Implementa un método para agregar empleados al array y otro método para mostrar
        todos los empleados registrados.
    •   Para probar el sistema crea un array de 7 empleados (combinando gerentes,
        desarrolladores backend, desarrolladores frontend y asistentes) y muestra la
        información de los empleados en la consola.`,
    pistas: ["Analiza bien los requisitos antes de programar.", "Revisa tus nombres de variables."],
    solucion: `Desarrolla un programa que administre un sistema de empleados utilizando arrays de objetos.
El sistema permitirá almacenar información de diferentes tipos de empleados y mostrará un
resumen de todos los empleados registrados. Para ello:

     •     Implementa las clases Empleado (Clase base con atributos generales), Gerente,
           Desarrollador y Asistente (Subclases de Empleado con atributos específicos),
           DesarrolladorBackend y DesarrolladorFrontend (Subclases de Desarrollador con
           atributos especializados).
     •     Crea un array de objetos para almacenar múltiples empleados. El array debe permitir
           agregar gerentes, desarrolladores backend, desarrolladores frontend y asistentes.
     •     Implementa un método para agregar empleados al array y otro método para mostrar
           todos los empleados registrados.
     •     Para probar el sistema crea un array de 7 empleados (combinando gerentes,
           desarrolladores backend, desarrolladores frontend y asistentes) y muestra la
           información de los empleados en la consola.



 class Empleado {
    String nombre;
    int edad;
    double salario;

     public Empleado(String nombreEmpleado, int edadEmpleado, double salarioEmpleado) {
       nombre = nombreEmpleado;
       edad = edadEmpleado;
       salario = salarioEmpleado;
     }

     public void mostrarInfo() {
       System.out.println("Nombre: " + nombre + ", Edad: " + edad + ", Salario: " + salario);
     }
 }

 class Gerente extends Empleado {
    String departamento;

  public Gerente(String nombreEmpleado, int edadEmpleado, double salarioEmpleado,
String depto) {
     nombre = nombreEmpleado;
     edad = edadEmpleado;
     salario = salarioEmpleado;
     departamento = depto;
  }

    public void mostrarInfo() {
      System.out.println("Nombre: " + nombre + ", Edad: " + edad + ", Salario: " + salario);
      System.out.println("Departamento: " + departamento);
    }
}

class Asistente extends Empleado {
   String jefe;

  public Asistente(String nombreEmpleado, int edadEmpleado, double salarioEmpleado,
String nombreJefe) {
     nombre = nombreEmpleado;
     edad = edadEmpleado;
     salario = salarioEmpleado;
     jefe = nombreJefe;
  }

    public void mostrarInfo() {
      System.out.println("Nombre: " + nombre + ", Edad: " + edad + ", Salario: " + salario);
      System.out.println("Jefe: " + jefe);
    }
}

class Desarrollador extends Empleado {
   String lenguaje;

  public Desarrollador(String nombreEmpleado, int edadEmpleado, double salarioEmpleado,
String lenguajeProg) {
     nombre = nombreEmpleado;
     edad = edadEmpleado;
     salario = salarioEmpleado;
     lenguaje = lenguajeProg;
  }

    public void mostrarInfo() {
      System.out.println("Nombre: " + nombre + ", Edad: " + edad + ", Salario: " + salario);
      System.out.println("Lenguaje de programación: " + lenguaje);
    }
}

class DesarrolladorBackend extends Desarrollador {
   String baseDatos;
  public DesarrolladorBackend(String nombreEmpleado, int edadEmpleado, double
salarioEmpleado, String lenguajeProg, String bd) {
     nombre = nombreEmpleado;
     edad = edadEmpleado;
     salario = salarioEmpleado;
     lenguaje = lenguajeProg;
     baseDatos = bd;
  }

    public void mostrarInfo() {
      System.out.println("Nombre: " + nombre + ", Edad: " + edad + ", Salario: " + salario);
      System.out.println("Lenguaje de programación: " + lenguaje);
      System.out.println("Base de datos: " + baseDatos);
    }
}

class DesarrolladorFrontend extends Desarrollador {
   String framework;

  public DesarrolladorFrontend(String nombreEmpleado, int edadEmpleado, double
salarioEmpleado, String lenguajeProg, String fw) {
     nombre = nombreEmpleado;
     edad = edadEmpleado;
     salario = salarioEmpleado;
     lenguaje = lenguajeProg;
     framework = fw;
  }

    public void mostrarInfo() {
      System.out.println("Nombre: " + nombre + ", Edad: " + edad + ", Salario: " + salario);
      System.out.println("Lenguaje de programación: " + lenguaje);
      System.out.println("Framework: " + framework);
    }
}

public class Main {
  public static void main(String[] args) {
    Empleado[] empleados = new Empleado[7];

    empleados[0] = new Gerente("Carlos Pérez", 45, 5000, "Ventas");
    empleados[1] = new DesarrolladorBackend("Ana Gómez", 30, 4000, "Java", "MySQL");
    empleados[2] = new DesarrolladorFrontend("Luis Torres", 28, 3800, "JavaScript",
"React");
    empleados[3] = new DesarrolladorBackend("Elena Ruiz", 32, 4100, "Python",
"PostgreSQL");
    empleados[4] = new DesarrolladorFrontend("Javier Mendoza", 27, 3700, "TypeScript",
"Angular");
    empleados[5] = new Asistente("Marta López", 35, 2500, "Carlos Pérez");
    empleados[6] = new Gerente("Ricardo Salinas", 50, 5500, "Tecnología");

      System.out.println("Registro de empleados: ");
         for (int i = 0; i &lt; empleados.length; i++) {
           empleados[i].mostrarInfo();
         }
     }
 }`,
    criterios: ["Define la clase Desarrollador", "Define la clase DesarrolladorFrontend", "Define la clase Gerente"],
    checks: [
       (c) =>  /class\s+Desarrollador/i.test(c),
       (c) =>  /class\s+DesarrolladorFrontend/i.test(c),
       (c) =>  /class\s+Gerente/i.test(c)
    ]
  },
  {
    id: 'dr_ej_7_4',
    titulo: `Dr. Java: Arrays de objetos - Ej 4`,
    nivel: '⭐⭐',
    temas: ["Arrays de objetos"],
    tiempo: '15 min',
    enunciado: `Desarrolla un sistema para gestionar un zoológico utilizando arrays de objetos. El sistema
permitirá registrar diferentes tipos de animales y realizar operaciones con ellos. Para ello:

    •   Implementa las clases:

              o   Animal (Clase base con atributos generales).

              o   Mamifero y Ave (Subclases de Animal con atributos específicos).

              o   Felino y Canino (Subclases de Mamifero).

              o   Aguila y Loro (Subclases de Ave).

    •   Agrega métodos en las clases para:

              o   Emitir sonidos característicos.

              o   Mostrar información del animal.

              o   Contar cuántos animales hay de cada tipo.

    •   Implementa un array de objetos para almacenar los animales.

    •   Agrega un método para alimentar a todos los animales del zoológico.

    •   Para probar el sistema, crea un array con al menos 8 animales, muestra su información
        y realiza las acciones correspondientes.`,
    pistas: ["Analiza bien los requisitos antes de programar.", "Revisa tus nombres de variables."],
    solucion: `Desarrolla un sistema para gestionar un zoológico utilizando arrays de objetos. El sistema
permitirá registrar diferentes tipos de animales y realizar operaciones con ellos. Para ello:

     •     Implementa las clases:

               o    Animal (Clase base con atributos generales).

               o    Mamifero y Ave (Subclases de Animal con atributos específicos).

               o    Felino y Canino (Subclases de Mamifero).

               o    Aguila y Loro (Subclases de Ave).

     •     Agrega métodos en las clases para:

               o    Emitir sonidos característicos.

               o    Mostrar información del animal.

               o    Contar cuántos animales hay de cada tipo.

     •     Implementa un array de objetos para almacenar los animales.

     •     Agrega un método para alimentar a todos los animales del zoológico.

     •     Para probar el sistema, crea un array con al menos 8 animales, muestra su información
           y realiza las acciones correspondientes.

 class Animal {
    String nombre;
    int edad;
    double peso;

     // Contador de animales. Variable global o de clase
     static int totalAnimales = 0;

     public Animal(String nombreAnimal, int edadAnimal, double pesoAnimal) {
       nombre = nombreAnimal;
       edad = edadAnimal;
       peso = pesoAnimal;
       totalAnimales++;
     }

   public void mostrarInfo() {
      System.out.println("Nombre: " + nombre + ", Edad: " + edad + " años, Peso: " + peso + "
 kg");
   }
    public void emitirSonido() {
      System.out.println(nombre + " hace un sonido desconocido.");
    }

    public static void mostrarTotalAnimales() {
      System.out.println("Total de animales en el zoológico: " + totalAnimales);
    }
}

class Mamifero extends Animal {
   boolean tienePelo;

   public Mamifero(String nombreAnimal, int edadAnimal, double pesoAnimal, boolean
tienePeloAnimal) {
     nombre = nombreAnimal;
     edad = edadAnimal;
     peso = pesoAnimal;
     tienePelo = tienePeloAnimal;
   }

    public void amamantar() {
      System.out.println(nombre + " está amamantando a sus crías.");
    }
}

class Felino extends Mamifero {
   boolean garrasRetractiles;

   public Felino(String nombreAnimal, int edadAnimal, double pesoAnimal, boolean
tienePeloAnimal, boolean garras) {
     nombre = nombreAnimal;
     edad = edadAnimal;
     peso = pesoAnimal;
     tienePelo = tienePeloAnimal;
     garrasRetractiles = garras;
   }

    public void emitirSonido() {
      System.out.println(nombre + " ruge o maúlla.");
    }
}

class Canino extends Mamifero {
   boolean cazaEnManada;

   public Canino(String nombreAnimal, int edadAnimal, double pesoAnimal, boolean
tienePeloAnimal, boolean caza) {
     nombre = nombreAnimal;
     edad = edadAnimal;
     peso = pesoAnimal;
     tienePelo = tienePeloAnimal;
        cazaEnManada = caza;
    }

    public void emitirSonido() {
      System.out.println(nombre + " ladra o aúlla.");
    }
}

class Ave extends Animal {
   double envergaduraAlas;

    public Ave(String nombreAnimal, int edadAnimal, double pesoAnimal, double envergadura)
{
        nombre = nombreAnimal;
        edad = edadAnimal;
        peso = pesoAnimal;
        envergaduraAlas = envergadura;
    }

  public void volar() {
     System.out.println(nombre + " está volando con una envergadura de " + envergaduraAlas
+ " metros.");
  }
}

class Aguila extends Ave {
   boolean esCazadora;

  public Aguila(String nombreAnimal, int edadAnimal, double pesoAnimal, double
envergadura, boolean cazadora) {
    nombre = nombreAnimal;
    edad = edadAnimal;
    peso = pesoAnimal;
    envergaduraAlas = envergadura;
    esCazadora = cazadora;
  }

    public void emitirSonido() {
      System.out.println(nombre + " emite un grito agudo.");
    }
}

class Loro extends Ave {
   boolean puedeHablar;

  public Loro(String nombreAnimal, int edadAnimal, double pesoAnimal, double
envergadura, boolean habla) {
    nombre = nombreAnimal;
    edad = edadAnimal;
    peso = pesoAnimal;
    envergaduraAlas = envergadura;
    puedeHablar = habla;
    }

    public void emitirSonido() {
      if (puedeHablar) {
          System.out.println(nombre + " dice 'Hola, ¿cómo estás?'");
      } else {
          System.out.println(nombre + " emite un sonido de loro.");
      }
    }
}

public class Main {
  public static void main(String[] args) {
    Animal[] zoologico = new Animal[8];

        zoologico[0] = new Felino("León", 5, 190, true, true);
        zoologico[1] = new Canino("Lobo", 4, 60, true, true);
        zoologico[2] = new Felino("Tigre", 6, 220, true, true);
        zoologico[3] = new Canino("Zorro", 3, 10, true, false);
        zoologico[4] = new Aguila("Águila Real", 7, 6.5, 2.1, true);
        zoologico[5] = new Loro("Loro Verde", 2, 1.2, 0.5, true);
        zoologico[6] = new Loro("Guacamayo", 3, 1.5, 1.2, false);
        zoologico[7] = new Aguila("Águila Calva", 8, 6.8, 2.3, true);

        System.out.println("Información de los animales: ");
        for (int i = 0; i &lt; zoologico.length; i++) {
          zoologico[i].mostrarInfo();
          zoologico[i].emitirSonido();
        }

        // Contar cuántos animales hay
        Animal.mostrarTotalAnimales();

        // Alimentar a los animales
        System.out.println("\nAlimentando a los animales: ");
        for (int i = 0; i &lt; zoologico.length; i++) {
           System.out.println(zoologico[i].nombre + " está comiendo.");
        }
    }
}`,
    criterios: ["Define la clase Ave", "Define la clase Mamifero", "Define la clase Loro"],
    checks: [
       (c) =>  /class\s+Ave/i.test(c),
       (c) =>  /class\s+Mamifero/i.test(c),
       (c) =>  /class\s+Loro/i.test(c)
    ]
  },
  {
    id: 'dr_ej_8_1',
    titulo: `Dr. Java: @Override, this y super - Ej 1`,
    nivel: '⭐⭐',
    temas: ["@Override, this y super"],
    tiempo: '15 min',
    enunciado: `Crea un sistema que maneje diferentes tipos de vehículos usando herencia y sobreescritura de
métodos:

    1. Crea una clase base Vehiculo con:

              o   Atributos marca y modelo.

              o   Un constructor que reciba la marca y el modelo.

              o   Constructor sin parámetros con valores predeterminados. Usa this en el
                  constructor.

              o   Un método mostrarInfo() que imprima la información del vehículo.

    2. Crea una clase Coche que extienda Vehiculo con:

              o   Añade el atributo puertas (número de puertas).

              o   Un constructor que reciba la marca, el modelo y las puertas, usando super para
                  inicializar los atributos de la clase base.

              o   Constructor sin parámetros con valores predeterminados. Usa this en el
                  constructor.

              o   Sobrescribe (@Override) el método mostrarInfo() para incluir el número de
                  puertas.

    3. Crea una clase Moto que extienda Vehiculo con:

              o   Añade el atributo cilindrada.

              o   Un constructor que reciba la marca, el modelo y la cilindrada, usando super.

              o   Constructor sin parámetros con valores predeterminados. Usa this en el
                  constructor.

              o   Sobrescribe mostrarInfo() para incluir la cilindrada.

    4. En la función main, crea un array de 4 Vehiculos con instancias de Coche y Moto. Luego
       llama a mostrarInfo() con cada objeto.`,
    pistas: ["Analiza bien los requisitos antes de programar.", "Revisa tus nombres de variables."],
    solucion: `Crea un sistema que maneje diferentes tipos de vehículos usando herencia y sobreescritura de
métodos:

    1. Crea una clase base Vehiculo con:

              o   Atributos marca y modelo.

              o   Un constructor que reciba la marca y el modelo.

              o   Constructor sin parámetros con valores predeterminados. Usa this en el
                  constructor.

              o   Un método mostrarInfo() que imprima la información del vehículo.

    2. Crea una clase Coche que extienda Vehiculo con:

              o   Añade el atributo puertas (número de puertas).

              o   Un constructor que reciba la marca, el modelo y las puertas, usando super para
                  inicializar los atributos de la clase base.

              o   Constructor sin parámetros con valores predeterminados. Usa this en el
                  constructor.

              o   Sobrescribe (@Override) el método mostrarInfo() para incluir el número de
                  puertas.

    3. Crea una clase Moto que extienda Vehiculo con:

              o   Añade el atributo cilindrada.

              o   Un constructor que reciba la marca, el modelo y la cilindrada, usando super.

              o   Constructor sin parámetros con valores predeterminados. Usa this en el
                  constructor.

              o   Sobrescribe mostrarInfo() para incluir la cilindrada.

    4. En la función main, crea un array de 4 Vehiculos con instancias de Coche y Moto. Luego
       llama a mostrarInfo() con cada objeto.



 class Vehiculo {
    protected String marca;
    protected String modelo;

   public Vehiculo(String marca, String modelo) {
     this.marca = marca;
     this.modelo = modelo;
   }

   // Constructor sin parámetros con valores predeterminados
    public Vehiculo() {
      this("Desconocida", "Genérico");
    }

    public void mostrarInfo() {
      System.out.println("Vehículo: " + marca + " " + modelo);
    }
}

class Coche extends Vehiculo {
   private int puertas;

    public Coche(String marca, String modelo, int puertas) {
      super(marca, modelo);
      this.puertas = puertas;
    }

    // Constructor sin parámetros con valores predeterminados
    public Coche() {
       this("Toyota", "Corolla", 4);
    }

    // Sobrescribe el método mostrarInfo
    @Override
    public void mostrarInfo() {
       super.mostrarInfo();
       System.out.println("Número de puertas: " + this.puertas);
    }
}

class Moto extends Vehiculo {
   private int cilindrada;

    public Moto(String marca, String modelo, int cilindrada) {
      super(marca, modelo);
      this.cilindrada = cilindrada;
    }

    // Constructor sin parámetros con valores predeterminados
    public Moto() {
       this("Honda", "CBR600", 600);
    }

    // Sobrescribe el método mostrarInfo
    @Override
    public void mostrarInfo() {
       super.mostrarInfo();
       System.out.println("Cilindrada: " + this.cilindrada + "cc");
    }
}

public class Main {
     public static void main(String[] args) {
       Vehiculo[] vehiculos = {
          new Coche("Ford", "Fiesta", 5),
          new Coche(),
          new Moto("Yamaha", "R1", 1000),
          new Moto()
       };

         for (int i = 0; i &lt; vehiculos.length; i++) {
           vehiculos[i].mostrarInfo();
         }
     }
 }`,
    criterios: ["Define la clase Main", "Define la clase Moto", "Define la clase Coche", "Implementa el m\u00e9todo mostrarInfo"],
    checks: [
       (c) =>  /class\s+Main/i.test(c),
       (c) =>  /class\s+Moto/i.test(c),
       (c) =>  /class\s+Coche/i.test(c),
       (c) =>  /mostrarInfo\s*\(/i.test(c)
    ]
  },
  {
    id: 'dr_ej_8_2',
    titulo: `Dr. Java: @Override, this y super - Ej 2`,
    nivel: '⭐⭐',
    temas: ["@Override, this y super"],
    tiempo: '15 min',
    enunciado: `Crea un sistema de empleados con diferentes tipos (Gerente y Desarrollador). Cada uno tiene
atributos específicos y un método calcularSalario(), que será sobrescrito en cada clase derivada.

    1. Crea la clase base Empleado con:

              o   Atributos nombre, salarioBase y id.

              o   Un constructor que use this() para asignar valores por defecto.

              o   Un método calcularSalario() que devuelva salarioBase.
       o   Un método mostrarInfo() que muestre el nombre y salario.

2. Crea la clase Gerente que extienda Empleado con:

       o   Atributo bonoGerencial.

       o   Un constructor que use super() para llamar al constructor de Empleado.

       o   Sobrescribe calcularSalario() para sumar bonoGerencial.

3. Crea la clase Desarrollador que extienda Empleado con:

       o   Atributo horasExtras y pagoPorHoraExtra.

       o   Un constructor que use super().

       o   Sobrescribe calcularSalario() para sumar el pago por horas extras.

4. En la función main, crea un array de 4 Empleados con instancias de Gerente y
   Desarrollador. Luego llama a mostrarInfo() con cada objeto.`,
    pistas: ["Analiza bien los requisitos antes de programar.", "Revisa tus nombres de variables."],
    solucion: `Crea un sistema de empleados con diferentes tipos (Gerente y Desarrollador). Cada uno tiene
atributos específicos y un método calcularSalario(), que será sobrescrito en cada clase derivada.

     1. Crea la clase base Empleado con:

                o   Atributos nombre, salarioBase y id.

                o   Un constructor que use this() para asignar valores por defecto.

                o   Un método calcularSalario() que devuelva salarioBase.

                o   Un método mostrarInfo() que muestre el nombre y salario.

     2. Crea la clase Gerente que extienda Empleado con:

                o   Atributo bonoGerencial.

                o   Un constructor que use super() para llamar al constructor de Empleado.

                o   Sobrescribe calcularSalario() para sumar bonoGerencial.

     3. Crea la clase Desarrollador que extienda Empleado con:

                o   Atributo horasExtras y pagoPorHoraExtra.

                o   Un constructor que use super().

                o   Sobrescribe calcularSalario() para sumar el pago por horas extras.

     4. En la función main, crea un array de 4 Empleados con instancias de Gerente y
        Desarrollador. Luego llama a mostrarInfo() con cada objeto.

 class Empleado {
    protected String nombre;
    protected double salarioBase;
    protected int id;

     public Empleado(String nombre, double salarioBase, int id) {
       this.nombre = nombre;
       this.salarioBase = salarioBase;
      this.id = id;
  }

  public Empleado() {
    this("Empleado Genérico", 1000.0, 0);
  }

  public double calcularSalario() {
    return salarioBase;
  }

  public void mostrarInfo() {
    System.out.println("ID: " + id + " Nombre: " + nombre + " Salario: " + calcularSalario());
  }
}
/* Aquí, calcularSalario() no es un método estático, así que solo se puede llamar a través de
un objeto. Pero... ¿dónde está ese objeto? Está implícito.
En Java, cuando llamas a un método dentro de otro método de la misma instancia, Java asume
que es this.calcularSalario(), aunque no lo escribas explícitamente.
Es decir, la anterior línea es equivalente a:
  System.out.println("ID: " + id + " Nombre: " + nombre + " Salario: " + this.calcularSalario());
Donde this se refiere al objeto actual en el que se está ejecutando mostrarInfo(). */

class Gerente extends Empleado {
   private double bonoGerencial;

  public Gerente(String nombre, double salarioBase, int id, double bonoGerencial) {
    super(nombre, salarioBase, id);
    this.bonoGerencial = bonoGerencial;
  }

  public Gerente() {
    this("Gerente Default", 3000.0, 1, 500.0);
  }

  @Override
  public double calcularSalario() {
    return super.calcularSalario() + this.bonoGerencial; //En este caso se está accediendo al
método calcularSalario con el objeto Gerente
  }
}

class Desarrollador extends Empleado {
   private int horasExtras;
   private double pagoPorHoraExtra;

  public Desarrollador(String nombre, double salarioBase, int id, int horasExtras, double
pagoPorHoraExtra) {
    super(nombre, salarioBase, id);
    this.horasExtras = horasExtras;
    this.pagoPorHoraExtra = pagoPorHoraExtra;
    }

    public Desarrollador() {
      this("Desarrollador Default", 2500.0, 2, 10, 20.0);
    }

  @Override
  public double calcularSalario() {
    return super.calcularSalario() + (horasExtras * pagoPorHoraExtra);//En este caso se está
accediendo al getter calcularSalario() con el objeto Desarrollador
  }
}

public class Main {
  public static void main(String[] args) {
    Empleado[] empleados = new Empleado[4];

        for (int i = 0; i &lt; empleados.length; i++) {
          if (i % 2 == 0) {
             empleados[i] = new Gerente("Gerente" + i, 3500.0, i + 1, 700.0);
          } else {
             empleados[i] = new Desarrollador("Dev" + i, 2700.0, i + 1, 5 + i, 25.0);
          }
        }

        for (int i = 0; i &lt; empleados.length; i++) {
          empleados[i].mostrarInfo();
        }
    }
}`,
    criterios: ["Define la clase derivada", "Define la clase Desarrollador", "Define la clase Gerente", "Implementa el m\u00e9todo calcularSalario", "Implementa el m\u00e9todo super", "Implementa el m\u00e9todo mostrarInfo"],
    checks: [
       (c) =>  /class\s+derivada/i.test(c),
       (c) =>  /class\s+Desarrollador/i.test(c),
       (c) =>  /class\s+Gerente/i.test(c),
       (c) =>  /calcularSalario\s*\(/i.test(c),
       (c) =>  /super\s*\(/i.test(c),
       (c) =>  /mostrarInfo\s*\(/i.test(c)
    ]
  },
];

// Append all Dr. Java exercises to the global EJERCICIOS array
if (typeof EJERCICIOS !== 'undefined') { EJERCICIOS.push(...DOCTOR_EXERCISES_MODIFIED); }

