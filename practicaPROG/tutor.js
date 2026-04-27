// =====================================================================
// TUTOR INTERACTIVO — Java POO · Programación DAW 2026
// Guía al alumno paso a paso y luego le examina
// =====================================================================

const TUTOR_SESSIONS = [
  {
    id: 'tutor_empleados',
    titulo: 'Sistema de Empleados',
    subtitulo: 'Aprende a construir un sistema completo de clases en Java',
    temas: ['Clase Abstracta', 'Encapsulación', 'Herencia', 'Polimorfismo', 'Interfaces', 'Excepciones'],
    duracion: '~30 min',
    icono: '👔',
    color: '#f97316',

    pasos: [
      {
        id: 'paso1',
        titulo: 'El punto de partida: la clase abstracta',
        concepto: 'CLASE ABSTRACTA',
        explicacion: `Una <strong>clase abstracta</strong> es como una plantilla incompleta. Define la estructura común para todas sus subclases, pero <em>no se puede instanciar directamente</em> (no puedes hacer <code>new Persona()</code>).

Se declara con la palabra <code>abstract</code> y suele tener uno o más <strong>métodos abstractos</strong>: métodos sin cuerpo que las subclases <em>están obligadas</em> a implementar.`,
        consejo: `💡 <strong>Pista del examen:</strong> Si el enunciado dice "clase base con método que cada subclase implementa diferente", piensa en clase abstracta. La clave es que <code>abstract class</code> puede tener tanto métodos normales como métodos <code>abstract</code>.`,
        ejemplo: `<span class="kw">abstract class</span> <span class="fn">Persona</span> {
    <span class="cm">// Atributos privados (encapsulación)</span>
    <span class="kw">private</span> <span class="tp">String</span> nombre;
    <span class="kw">private</span> <span class="tp">int</span> edad;

    <span class="cm">// Constructor normal</span>
    <span class="kw">public</span> <span class="fn">Persona</span>(<span class="tp">String</span> nombre, <span class="tp">int</span> edad) {
        <span class="kw">this</span>.nombre = nombre;
        <span class="kw">this</span>.edad = edad;
    }

    <span class="cm">// Método abstracto — sin cuerpo, sin llaves {}</span>
    <span class="kw">public abstract</span> <span class="tp">String</span> <span class="fn">getInfo</span>();
}`,
        tareaGuiada: {
          instruccion: 'Escribe la clase abstracta <code>Persona</code> con los atributos <code>nombre</code> (String) y <code>edad</code> (int), su constructor y el método abstracto <code>getInfo()</code>.',
          placeholder: '// Escribe aquí tu clase abstracta Persona...\n// Recuerda: abstract class Persona { ... }',
          checks: [
            { desc: 'Declara abstract class Persona', test: c => /abstract\s+class\s+Persona/i.test(c) },
            { desc: 'Atributos private nombre (String) y edad (int)', test: c => /private\s+String\s+nombre/i.test(c) && /private\s+int\s+edad/i.test(c) },
            { desc: 'Constructor Persona(String, int) con this', test: c => /public\s+Persona\s*\(\s*String\s+\w+\s*,\s*int\s+\w+\s*\)[\s\S]*this\./i.test(c) },
            { desc: 'Método abstracto String getInfo() (debe devolver String)', test: c => /public\s+abstract\s+String\s+getInfo\s*\(\s*\)\s*;/i.test(c) },
          ]
        }
      },

      {
        id: 'paso2',
        titulo: 'Encapsulación: atributos privados con validación',
        concepto: 'ENCAPSULACIÓN',
        explicacion: `La <strong>encapsulación</strong> consiste en ocultar los datos internos de una clase usando <code>private</code> y controlar el acceso mediante métodos públicos (<em>getters/setters</em>).

El setter es el lugar ideal para <strong>validar datos</strong> antes de asignarlos. Si el valor no es válido, lanzamos una excepción.`,
        consejo: `💡 <strong>Pista del examen:</strong> Siempre que veas "atributos privados" + "validación", escribe el setter con un <code>if</code> que lanza excepción. El getter es solo <code>return nombre;</code>. En el constructor, llama al setter en lugar de asignar directamente para reutilizar la validación.`,
        ejemplo: `<span class="cm">// Dentro de la clase abstracta Persona:</span>
<span class="kw">private</span> <span class="tp">String</span> nombre;
<span class="kw">private</span> <span class="tp">int</span> edad;

<span class="cm">// Getter — solo devuelve</span>
<span class="kw">public</span> <span class="tp">String</span> <span class="fn">getNombre</span>() { <span class="kw">return</span> nombre; }
<span class="kw">public</span> <span class="tp">int</span> <span class="fn">getEdad</span>() { <span class="kw">return</span> edad; }

<span class="cm">// Setter con validación</span>
<span class="kw">public void</span> <span class="fn">setEdad</span>(<span class="tp">int</span> edad) {
    <span class="kw">if</span> (edad <= <span class="num">0</span>)
        <span class="kw">throw new</span> <span class="fn">IllegalArgumentException</span>(<span class="str">"Edad inválida"</span>);
    <span class="kw">this</span>.edad = edad;
}`,
        tareaGuiada: {
          instruccion: 'Añade los getters para <code>nombre</code> y <code>edad</code>, y un setter para <code>edad</code> con validación (si edad <= 0, lanza excepción).',
          placeholder: '// Añade getters y setter con validación\n// public String getNombre() { ... }\n// public void setEdad(int edad) { if (edad <= 0) throw ... }',
          checks: [
            { desc: 'Getter getNombre()', test: c => /getNombre\s*\(\s*\)/i.test(c) },
            { desc: 'Getter getEdad()', test: c => /getEdad\s*\(\s*\)/i.test(c) },
            { desc: 'Setter setEdad() con validación', test: c => /setEdad\s*\(/i.test(c) && /if.*edad.*<=?\s*0/i.test(c) },
            { desc: 'Lanza excepción en setter', test: c => /throw\s+new/i.test(c) && /Exception/i.test(c) },
          ]
        }
      },

      {
        id: 'paso3',
        titulo: 'Herencia: extends y super()',
        concepto: 'HERENCIA',
        explicacion: `La <strong>herencia</strong> permite que una clase ("subclase") reutilice todo el código de otra ("superclase") usando <code>extends</code>.

Regla de oro: el <strong>constructor de la subclase SIEMPRE debe llamar a <code>super()</code> como primera línea</strong> para inicializar los atributos del padre.

La subclase puede tener sus propios atributos adicionales.`,
        consejo: `💡 <strong>Pista del examen:</strong> Si el enunciado dice "clase X que hereda de Y con atributos adicionales", la estructura es siempre:<br>
1. <code>class X extends Y { private tipo atributo; }</code><br>
2. Constructor: <code>super(params_del_padre);</code> primera línea, luego <code>this.atributo = valor;</code>`,
        ejemplo: `<span class="kw">class</span> <span class="fn">Empleado</span> <span class="kw">extends</span> <span class="fn">Persona</span> {
    <span class="cm">// Atributos adicionales del Empleado</span>
    <span class="kw">private double</span> salario;
    <span class="kw">private</span> <span class="tp">String</span> departamento;

    <span class="kw">public</span> <span class="fn">Empleado</span>(<span class="tp">String</span> nombre, <span class="tp">int</span> edad,
                    <span class="tp">double</span> salario, <span class="tp">String</span> dept) {
        <span class="kw">super</span>(nombre, edad); <span class="cm">// ← PRIMERA línea siempre</span>
        <span class="kw">if</span> (salario < <span class="num">0</span>)
            <span class="kw">throw new</span> <span class="fn">IllegalArgumentException</span>(<span class="str">"Salario negativo"</span>);
        <span class="kw">this</span>.salario = salario;
        <span class="kw">this</span>.departamento = dept;
    }

    <span class="kw">public double</span> <span class="fn">getSalario</span>() { <span class="kw">return</span> salario; }
}`,
        tareaGuiada: {
          instruccion: 'Crea la clase <code>Empleado</code> que herede de <code>Persona</code>, con atributos <code>salario</code> (double) y <code>departamento</code> (String). El constructor debe llamar a <code>super()</code>.',
          placeholder: '// class Empleado extends Persona {\n//     private double salario;\n//     ...\n//     public Empleado(...) {\n//         super(...);\n//         ...\n//     }\n// }',
          checks: [
            { desc: 'class Empleado extends Persona', test: c => /class\s+Empleado\s+extends\s+Persona/i.test(c) },
            { desc: 'Atributo private double salario', test: c => /private\s+double\s+salario\s*;/i.test(c) },
            { desc: 'Constructor llama a super(nombre, edad) obligatoriamente', test: c => /public\s+Empleado\s*\([\s\S]*\)[\s\S]*super\s*\(\s*\w+\s*,\s*\w+\s*\)\s*;/i.test(c) },
            { desc: 'Asigna this.salario y this.departamento', test: c => /this\.salario\s*=/i.test(c) && /this\.departamento\s*=/i.test(c) },
          ]
        }
      },

      {
        id: 'paso4',
        titulo: '@Override: sobreescribir métodos',
        concepto: '@OVERRIDE',
        explicacion: `Cuando una subclase <strong>redefine un método del padre</strong>, se llama <em>sobreescritura</em>. Se marca con <code>@Override</code> (el compilador verifica que realmente estás sobreescribiendo).

La subclase puede llamar a la implementación del padre con <code>super.metodo()</code> y añadir más lógica.`,
        consejo: `💡 <strong>Pista del examen:</strong> Siempre que implementes un método abstracto o redefinas uno de la clase padre, escribe <code>@Override</code> encima. En el examen de papel, si lo olvidas no es error grave, pero en código real es buena práctica.`,
        ejemplo: `<span class="cm">// En la clase Empleado — implementa el método abstracto</span>
<span class="kw">@Override</span>
<span class="kw">public</span> <span class="tp">String</span> <span class="fn">getInfo</span>() {
    <span class="kw">return</span> <span class="str">"Empleado: "</span> + <span class="fn">getNombre</span>()
         + <span class="str">" | Dept: "</span> + departamento
         + <span class="str">" | Salario: "</span> + salario;
}

<span class="cm">// En Directivo — sobreescribe getInfo() del Empleado</span>
<span class="kw">private int</span> numEmpleadosACargo;

<span class="kw">@Override</span>
<span class="kw">public</span> <span class="tp">String</span> <span class="fn">getInfo</span>() {
    <span class="cm">// Llama al padre y añade más info</span>
    <span class="kw">return super</span>.<span class="fn">getInfo</span>() + <span class="str">" | A cargo: "</span> + numEmpleadosACargo;
}`,
        tareaGuiada: {
          instruccion: 'Implementa <code>getInfo()</code> en <code>Empleado</code> con <code>@Override</code>. Luego crea <code>Directivo</code> que extienda <code>Empleado</code> y sobreescriba <code>getInfo()</code> añadiendo el número de empleados a cargo.',
          placeholder: '// En Empleado:\n// @Override\n// public String getInfo() { return "Empleado: " + getNombre() + ...; }\n\n// class Directivo extends Empleado {\n//     private int numEmpleadosACargo;\n//     @Override\n//     public String getInfo() { return super.getInfo() + ...; }\n// }',
          checks: [
            { desc: 'Empleado implementa getInfo() con @Override', test: c => /class\s+Empleado[\s\S]*@Override[\s\S]*getInfo\s*\(\s*\)/i.test(c) },
            { desc: 'class Directivo extends Empleado', test: c => /class\s+Directivo\s+extends\s+Empleado/i.test(c) },
            { desc: 'Directivo tiene numEmpleadosACargo', test: c => /numEmpleadosACargo/i.test(c) },
            { desc: 'Directivo sobreescribe getInfo() con super', test: c => /class\s+Directivo[\s\S]*super\.getInfo/i.test(c) },
          ]
        }
      },

      {
        id: 'paso5',
        titulo: 'Interfaces: el contrato que hay que cumplir',
        concepto: 'INTERFACES',
        explicacion: `Una <strong>interfaz</strong> es un contrato: define qué métodos <em>debe tener</em> una clase, pero no cómo los implementa. Se declara con <code>interface</code> y se implementa con <code>implements</code>.

Una clase puede <code>extends</code> solo UNA clase, pero puede <code>implements</code> varias interfaces.`,
        consejo: `💡 <strong>Pista del examen:</strong> Los métodos de una interfaz son siempre <code>public abstract</code> por defecto (no hace falta escribirlo). La clase que implementa la interfaz DEBE implementar todos sus métodos. Se puede combinar: <code>class Directivo extends Empleado implements Gestionable</code>`,
        ejemplo: `<span class="cm">// Definir la interfaz</span>
<span class="kw">interface</span> <span class="fn">Gestionable</span> {
    <span class="kw">void</span> <span class="fn">gestionar</span>(); <span class="cm">// implícitamente public abstract</span>
}

<span class="cm">// Directivo implementa la interfaz</span>
<span class="kw">class</span> <span class="fn">Directivo</span> <span class="kw">extends</span> <span class="fn">Empleado</span>
        <span class="kw">implements</span> <span class="fn">Gestionable</span> {

    <span class="kw">@Override</span>
    <span class="kw">public void</span> <span class="fn">gestionar</span>() {
        System.out.<span class="fn">println</span>(<span class="fn">getNombre</span>() + <span class="str">" gestiona el equipo"</span>);
    }
}`,
        tareaGuiada: {
          instruccion: 'Crea la interfaz <code>Gestionable</code> con el método <code>gestionar()</code>. Añade <code>implements Gestionable</code> a <code>Directivo</code> e implementa el método.',
          placeholder: '// interface Gestionable { void gestionar(); }\n\n// Modifica Directivo:\n// class Directivo extends Empleado implements Gestionable {\n//     @Override\n//     public void gestionar() { System.out.println(...); }\n// }',
          checks: [
            { desc: 'interface Gestionable con gestionar()', test: c => /interface\s+Gestionable/i.test(c) && /void\s+gestionar\s*\(\s*\)/i.test(c) },
            { desc: 'Directivo implements Gestionable', test: c => /Directivo\s+extends\s+Empleado\s+implements\s+Gestionable/i.test(c) },
            { desc: 'Implementa gestionar() en Directivo', test: c => /class\s+Directivo[\s\S]*void\s+gestionar\s*\(\s*\)/i.test(c) },
          ]
        }
      },

      {
        id: 'paso6',
        titulo: 'Polimorfismo: una lista para gobernarlos a todos',
        concepto: 'POLIMORFISMO',
        explicacion: `El <strong>polimorfismo</strong> nos permite tratar objetos de distintas subclases como si fueran del tipo padre. Si tenemos un <code>ArrayList&lt;Persona&gt;</code>, podemos meter dentro tanto <code>Empleado</code> como <code>Directivo</code>.

Al llamar a <code>getInfo()</code> sobre un elemento de la lista, Java ejecutará automáticamente la versión correcta del método (la del tipo real del objeto).`,
        consejo: `💡 <strong>Pista del examen:</strong> La magia está en que la lista es de tipo PADRE pero los objetos son de tipos HIJO. Cuando llamas a un método, Java siempre ejecuta el del tipo real. Esto es el polimorfismo en acción.`,
        ejemplo: `<span class="kw">import</span> java.util.ArrayList;

<span class="cm">// Lista de tipo PADRE — acepta hijos</span>
ArrayList<<span class="fn">Persona</span>> lista = <span class="kw">new</span> ArrayList<>();

<span class="cm">// Añadir objetos de distintos tipos</span>
lista.<span class="fn">add</span>(<span class="kw">new</span> <span class="fn">Empleado</span>(<span class="str">"Ana"</span>, <span class="num">30</span>, <span class="num">2000.0</span>, <span class="str">"IT"</span>));
lista.<span class="fn">add</span>(<span class="kw">new</span> <span class="fn">Directivo</span>(<span class="str">"Carlos"</span>, <span class="num">45</span>, <span class="num">5000.0</span>, <span class="str">"IT"</span>, <span class="num">10</span>));

<span class="cm">// Polimorfismo: cada objeto llama a SU versión de getInfo()</span>
<span class="kw">for</span> (<span class="fn">Persona</span> p : lista) {
    System.out.<span class="fn">println</span>(p.<span class="fn">getInfo</span>()); <span class="cm">// → versión real del objeto</span>
}`,
        tareaGuiada: {
          instruccion: 'En el main, crea un <code>ArrayList&lt;Persona&gt;</code>, añade al menos 2 objetos (uno Empleado, uno Directivo), y recorre la lista llamando a <code>getInfo()</code> de cada uno.',
          placeholder: '// ArrayList<Persona> lista = new ArrayList<>();\n// lista.add(new Empleado(...));\n// lista.add(new Directivo(...));\n// for (Persona p : lista) {\n//     System.out.println(p.getInfo());\n// }',
          checks: [
            { desc: 'ArrayList<Persona> creado', test: c => /ArrayList\s*<\s*Persona\s*>/i.test(c) },
            { desc: 'Añade objetos con add()', test: c => /\.add\s*\(\s*new\s+Empleado/i.test(c) || /\.add\s*\(\s*new\s+Directivo/i.test(c) },
            { desc: 'Bucle for-each sobre la lista', test: c => /for\s*\(\s*Persona\s+\w+\s*:\s*\w+\s*\)/i.test(c) },
            { desc: 'Llama a getInfo() en el bucle', test: c => /getInfo\s*\(\s*\)/i.test(c) },
          ]
        }
      },

      {
        id: 'paso7',
        titulo: 'Excepciones: controlar lo inesperado',
        concepto: 'EXCEPCIONES',
        explicacion: `Una <strong>excepción</strong> es una situación inesperada que interrumpe el flujo normal. Java tiene dos tipos:
- <strong>checked</strong>: debes manejarlas con try-catch o declarar throws
- <strong>unchecked</strong>: extienden RuntimeException, no es obligatorio capturarlas

En el examen suelen pedir: lanzar excepción en setter, o crear una excepción personalizada (<code>extends Exception</code>).`,
        consejo: `💡 <strong>Pista del examen:</strong> Para lanzar: <code>throw new IllegalArgumentException("mensaje");</code>. Para capturar: <code>try { ... } catch (Exception e) { e.printStackTrace(); }</code>. Excepción personalizada: <code>class MiExcepcion extends Exception { public MiExcepcion(String msg) { super(msg); } }</code>`,
        ejemplo: `<span class="cm">// Lanzar excepción en setter (ya lo hemos visto)</span>
<span class="kw">public void</span> <span class="fn">setEdad</span>(<span class="tp">int</span> edad) {
    <span class="kw">if</span> (edad <= <span class="num">0</span>)
        <span class="kw">throw new</span> <span class="fn">IllegalArgumentException</span>(<span class="str">"Edad inválida"</span>);
    <span class="kw">this</span>.edad = edad;
}

<span class="cm">// Capturar en el main</span>
<span class="kw">try</span> {
    Empleado e = <span class="kw">new</span> <span class="fn">Empleado</span>(<span class="str">"Test"</span>, <span class="num">30</span>, <span class="num">-100</span>, <span class="str">"IT"</span>);
} <span class="kw">catch</span> (<span class="fn">IllegalArgumentException</span> e) {
    System.out.<span class="fn">println</span>(<span class="str">"Error: "</span> + e.<span class="fn">getMessage</span>());
}`,
        tareaGuiada: {
          instruccion: 'En el main, añade un bloque try-catch que intente crear un Empleado con salario negativo y capture la excepción imprimiendo el mensaje.',
          placeholder: '// try {\n//     Empleado e = new Empleado("Test", 30, -500, "IT");\n// } catch (IllegalArgumentException e) {\n//     System.out.println("Error: " + e.getMessage());\n// }',
          checks: [
            { desc: 'Bloque try { }', test: c => /try\s*\{/i.test(c) },
            { desc: 'Bloque catch con excepción', test: c => /catch\s*\(\s*\w+Exception/i.test(c) },
            { desc: 'Captura e imprime el mensaje', test: c => /getMessage\s*\(\s*\)/i.test(c) || /e\.toString/i.test(c) || /println.*e\b/i.test(c) },
          ]
        }
      }
    ],

    examen: {
      titulo: 'EXAMEN: Sistema de Gestión Académica',
      instrucciones: 'Lee con atención el enunciado y diseña el sistema en Java. Recuerda: no hace falta sintaxis perfecta, lo importante es la lógica y la estructura.',
      tiempo: '45 min',
      enunciado: `Una academia de formación necesita un sistema para gestionar a sus miembros.

<strong>1. Clase abstracta <code>Miembro</code>:</strong>
- Atributos privados: <code>nombre</code> (String), <code>dni</code> (String)
- Constructor con ambos parámetros
- Getter para nombre y DNI
- Setter para DNI con validación (no puede estar vacío)
- Método abstracto: <code>String getRol()</code>

<strong>2. Clase <code>Alumno</code> que extiende <code>Miembro</code>:</strong>
- Atributo privado: <code>curso</code> (String), <code>nota</code> (double)
- Constructor que llame a <code>super()</code>
- Implementa <code>getRol()</code> devolviendo <code>"Alumno"</code>
- Método <code>isAprobado()</code>: devuelve true si nota >= 5

<strong>3. Clase <code>Profesor</code> que extiende <code>Miembro</code>:</strong>
- Atributo privado: <code>especialidad</code> (String), <code>aniosExperiencia</code> (int)
- Implementa <code>getRol()</code> devolviendo <code>"Profesor"</code>

<strong>4. Interfaz <code>Evaluable</code>:</strong>
- Método: <code>double calcularMedia()</code>
- Haz que <code>Alumno</code> implemente esta interfaz (calcularMedia devuelve la nota)

<strong>5. Excepción personalizada <code>DniInvalidoException</code>:</strong>
- Extiende Exception
- Lanzarla si el DNI está vacío

<strong>6. En el main:</strong>
- Crea un <code>ArrayList&lt;Miembro&gt;</code> con al menos 2 alumnos y 1 profesor
- Recorre la lista e imprime el rol y nombre de cada uno (polimorfismo)
- Usa try-catch para capturar posibles DniInvalidoException`,

      criterios: [
        { desc: 'Clase abstracta Miembro con atributos private y getRol() abstracto', key: 'abstracta', test: c => /abstract\s+class\s+Miembro/i.test(c) && /private\s+String\s+(nombre|dni)/i.test(c) && /public\s+abstract\s+String\s+getRol\s*\(\s*\)\s*;/i.test(c) },
        { desc: 'Encapsulación: setter para DNI con validación isEmpty', key: 'encapsulacion', test: c => /public\s+void\s+setDni\s*\(\s*String\s+\w+\s*\)[\s\S]*if\s*\([\s\S]*\.isEmpty\s*\(\s*\)/i.test(c) },
        { desc: 'Alumno hereda de Miembro y usa super(nombre, dni)', key: 'herencia_alumno', test: c => /class\s+Alumno\s+extends\s+Miembro/i.test(c) && /super\s*\(\s*\w+\s*,\s*\w+\s*\)\s*;/i.test(c) },
        { desc: 'Profesor hereda de Miembro', key: 'herencia_prof', test: c => /class\s+Profesor\s+extends\s+Miembro/i.test(c) },
        { desc: 'Alumno implementa interface Evaluable { double calcularMedia(); }', key: 'interfaz', test: c => /interface\s+Evaluable\s*\{[\s\S]*double\s+calcularMedia\s*\(\s*\)\s*;/i.test(c) && /Alumno[\s\S]*implements\s+Evaluable/i.test(c) },
        { desc: 'Excepción DniInvalidoException extends Exception', key: 'excepcion_custom', test: c => /class\s+DniInvalidoException\s+extends\s+Exception/i.test(c) },
        { desc: 'ArrayList<Miembro> con polimorfismo', key: 'polimorfismo', test: c => /ArrayList\s*<\s*Miembro\s*>\s+\w+\s*=\s*new\s+ArrayList/i.test(c) },
        { desc: 'Uso de try-catch con DniInvalidoException', key: 'try_catch', test: c => /try\s*\{[\s\S]*\}\s*catch\s*\(\s*DniInvalidoException\s+\w+\s*\)/i.test(c) },
      ]
    }
  },

  {
    id: 'tutor_vehiculos',
    titulo: 'Sistema de Vehículos (HashMap)',
    subtitulo: 'Aprende a usar HashMap y excepciones personalizadas',
    temas: ['Interfaz+Abstracta', 'HashMap', 'Excepción Personalizada', 'Recorrido entrySet'],
    duracion: '~25 min',
    icono: '🚗',
    color: '#22d3a0',

    pasos: [
      {
        id: 'veh_paso1',
        titulo: 'Combinar interfaz y clase abstracta',
        concepto: 'INTERFAZ + ABSTRACTA',
        explicacion: `Una clase abstracta puede <strong>implementar una interfaz parcialmente</strong>: implementa algunos métodos de la interfaz en la clase abstracta, y deja los demás para las subclases concretas.

Esto es muy potente porque puedes definir comportamiento común en la abstracta y obligar a las subclases a definir solo lo que es específico de cada una.`,
        consejo: `💡 <strong>Pista del examen:</strong> Si el enunciado dice "clase abstracta que implementa una interfaz", la abstracta puede implementar algunos métodos y declarar otros como <code>abstract</code>. Las subclases concretas deben implementar los que faltan.`,
        ejemplo: `<span class="kw">interface</span> <span class="fn">Conducible</span> {
    <span class="kw">void</span> <span class="fn">arrancar</span>();
    <span class="kw">void</span> <span class="fn">parar</span>();
    <span class="tp">String</span> <span class="fn">getEstado</span>();
}

<span class="cm">// Abstracta implementa la interfaz</span>
<span class="kw">abstract class</span> <span class="fn">Vehiculo</span> <span class="kw">implements</span> <span class="fn">Conducible</span> {
    <span class="kw">private</span> <span class="tp">String</span> matricula;
    <span class="kw">protected boolean</span> encendido = <span class="kw">false</span>;

    <span class="cm">// Implementa arrancar y parar</span>
    <span class="kw">@Override public void</span> <span class="fn">arrancar</span>() { encendido = <span class="kw">true</span>; }
    <span class="kw">@Override public void</span> <span class="fn">parar</span>() { encendido = <span class="kw">false</span>; }
    <span class="kw">@Override public</span> <span class="tp">String</span> <span class="fn">getEstado</span>() {
        <span class="kw">return</span> encendido ? <span class="str">"Encendido"</span> : <span class="str">"Apagado"</span>;
    }

    <span class="cm">// Método abstracto que implementará cada subclase</span>
    <span class="kw">public abstract</span> <span class="tp">String</span> <span class="fn">getTipo</span>();
}`,
        tareaGuiada: {
          instruccion: 'Crea la interfaz <code>Conducible</code> y la clase abstracta <code>Vehiculo</code> que la implementa. Implementa los 3 métodos de la interfaz en la abstracta, y añade el método abstracto <code>getTipo()</code>.',
          placeholder: '// interface Conducible { void arrancar(); void parar(); String getEstado(); }\n\n// abstract class Vehiculo implements Conducible {\n//     private String matricula;\n//     protected boolean encendido = false;\n//     @Override public void arrancar() { encendido = true; }\n//     ...\n//     public abstract String getTipo();\n// }',
          checks: [
            { desc: 'interface Conducible con los 3 métodos', test: c => /interface\s+Conducible/i.test(c) && /void\s+arrancar/i.test(c) && /void\s+parar/i.test(c) && /getEstado/i.test(c) },
            { desc: 'abstract class Vehiculo implements Conducible', test: c => /abstract\s+class\s+Vehiculo\s+implements\s+Conducible/i.test(c) },
            { desc: 'Implementa arrancar() y parar()', test: c => /void\s+arrancar\s*\(\s*\)/i.test(c) && /void\s+parar\s*\(\s*\)/i.test(c) },
            { desc: 'Método abstracto getTipo()', test: c => /abstract.*getTipo\s*\(\s*\)/i.test(c) },
          ]
        }
      },

      {
        id: 'veh_paso2',
        titulo: 'HashMap: estructura clave-valor',
        concepto: 'HASHMAP',
        explicacion: `Un <strong>HashMap&lt;K, V&gt;</strong> almacena pares clave-valor. La clave debe ser única. Ejemplo: matrícula → vehículo.

Operaciones clave:
- <code>put(clave, valor)</code>: añadir
- <code>get(clave)</code>: obtener
- <code>containsKey(clave)</code>: comprobar si existe
- <code>entrySet()</code>: recorrer todos los pares`,
        consejo: `💡 <strong>Pista del examen:</strong> Para recorrer un HashMap usa <code>for (Map.Entry&lt;K,V&gt; e : mapa.entrySet())</code> y accede a la clave con <code>e.getKey()</code> y al valor con <code>e.getValue()</code>. No olvides el import de java.util.HashMap y java.util.Map.`,
        ejemplo: `<span class="kw">import</span> java.util.HashMap;
<span class="kw">import</span> java.util.Map;

<span class="kw">class</span> <span class="fn">GestorFlota</span> {
    <span class="kw">private</span> HashMap<<span class="tp">String</span>, <span class="fn">Vehiculo</span>> flota = <span class="kw">new</span> HashMap<>();

    <span class="kw">public void</span> <span class="fn">listarTodos</span>() {
        <span class="kw">for</span> (Map.Entry<<span class="tp">String</span>, <span class="fn">Vehiculo</span>> e : flota.<span class="fn">entrySet</span>()) {
            <span class="tp">String</span> matricula = e.<span class="fn">getKey</span>();
            <span class="fn">Vehiculo</span> v = e.<span class="fn">getValue</span>();
            System.out.<span class="fn">println</span>(v.<span class="fn">getTipo</span>() + <span class="str">": "</span> + matricula
                               + <span class="str">" | "</span> + v.<span class="fn">getEstado</span>());
        }
    }
}`,
        tareaGuiada: {
          instruccion: 'Crea la clase <code>GestorFlota</code> con un <code>HashMap&lt;String, Vehiculo&gt;</code> y el método <code>listarTodos()</code> que recorra el mapa con entrySet() e imprima cada vehículo.',
          placeholder: '// class GestorFlota {\n//     private HashMap<String, Vehiculo> flota = new HashMap<>();\n\n//     public void listarTodos() {\n//         for (Map.Entry<String, Vehiculo> e : flota.entrySet()) {\n//             System.out.println(e.getValue().getTipo() + ": " + e.getKey());\n//         }\n//     }\n// }',
          checks: [
            { desc: 'class GestorFlota', test: c => /class\s+GestorFlota/i.test(c) },
            { desc: 'HashMap<String, Vehiculo>', test: c => /HashMap\s*<\s*String\s*,\s*Vehiculo\s*>/i.test(c) },
            { desc: 'listarTodos() con entrySet()', test: c => /listarTodos\s*\(\s*\)/i.test(c) && /entrySet\s*\(\s*\)/i.test(c) },
            { desc: 'Usa getKey() y getValue()', test: c => /getKey\s*\(\s*\)/i.test(c) && /getValue\s*\(\s*\)/i.test(c) },
          ]
        }
      },

      {
        id: 'veh_paso3',
        titulo: 'Excepción personalizada y método que la lanza',
        concepto: 'EXCEPCIÓN PERSONALIZADA',
        explicacion: `Puedes crear tus propias excepciones extendiendo <code>Exception</code> (checked) o <code>RuntimeException</code> (unchecked).

Un método que puede lanzar una excepción checked debe declararlo con <code>throws NombreExcepcion</code>. El código que lo llame debe usar try-catch.`,
        consejo: `💡 <strong>Pista del examen:</strong> La plantilla de excepción personalizada siempre es la misma:<br>
<code>class MiExcepcion extends Exception {<br>
&nbsp;&nbsp;public MiExcepcion(String msg) { super(msg); }<br>
}</code><br>
Y el método que la lanza: <code>public void metodo() throws MiExcepcion { if (...) throw new MiExcepcion("msg"); }</code>`,
        ejemplo: `<span class="cm">// 1. Definir la excepción personalizada</span>
<span class="kw">class</span> <span class="fn">MatriculaDuplicadaException</span> <span class="kw">extends</span> <span class="fn">Exception</span> {
    <span class="kw">public</span> <span class="fn">MatriculaDuplicadaException</span>(<span class="tp">String</span> msg) {
        <span class="kw">super</span>(msg);
    }
}

<span class="cm">// 2. Método que la lanza (en GestorFlota)</span>
<span class="kw">public void</span> <span class="fn">añadir</span>(<span class="fn">Vehiculo</span> v) <span class="kw">throws</span> <span class="fn">MatriculaDuplicadaException</span> {
    <span class="kw">if</span> (flota.<span class="fn">containsKey</span>(v.<span class="fn">getMatricula</span>()))
        <span class="kw">throw new</span> <span class="fn">MatriculaDuplicadaException</span>(
            <span class="str">"Matrícula ya existe: "</span> + v.<span class="fn">getMatricula</span>());
    flota.<span class="fn">put</span>(v.<span class="fn">getMatricula</span>(), v);
}`,
        tareaGuiada: {
          instruccion: 'Crea la excepción <code>MatriculaDuplicadaException</code> y el método <code>añadir(Vehiculo v)</code> en GestorFlota que la lance si la matrícula ya existe, o añada al mapa si no existe.',
          placeholder: '// class MatriculaDuplicadaException extends Exception {\n//     public MatriculaDuplicadaException(String msg) { super(msg); }\n// }\n\n// En GestorFlota:\n// public void añadir(Vehiculo v) throws MatriculaDuplicadaException {\n//     if (flota.containsKey(v.getMatricula())) throw new MatriculaDuplicadaException(...);\n//     flota.put(v.getMatricula(), v);\n// }',
          checks: [
            { desc: 'MatriculaDuplicadaException extends Exception', test: c => /class\s+MatriculaDuplicadaException\s+extends\s+Exception/i.test(c) },
            { desc: 'Constructor con super(msg)', test: c => /MatriculaDuplicadaException\s*\(\s*String\s+\w+\s*\)[\s\S]*super\s*\(/i.test(c) },
            { desc: 'método añadir() throws la excepción', test: c => /void\s+a[ñn]adir\s*\([\s\S]*throws\s+MatriculaDuplicadaException/i.test(c) || /throws\s+MatriculaDuplicadaException[\s\S]*void\s+a[ñn]adir/i.test(c) },
            { desc: 'Comprueba containsKey() y hace put()', test: c => /containsKey\s*\(/i.test(c) && /\.put\s*\(/i.test(c) },
          ]
        }
      }
    ],

    examen: {
      titulo: 'EXAMEN: Sistema de Gestión de Productos',
      instrucciones: 'Diseña el sistema completo en Java. Puedes usar comentarios para explicar tu razonamiento.',
      tiempo: '45 min',
      enunciado: `Una tienda necesita un sistema de inventario de productos.

<strong>1. Interfaz <code>Vendible</code>:</strong>
- Métodos: <code>double getPrecio()</code>, <code>boolean isDisponible()</code>, <code>void vender()</code>

<strong>2. Clase abstracta <code>Producto</code> que implementa <code>Vendible</code>:</strong>
- Atributos privados: <code>codigo</code> (String), <code>nombre</code> (String), <code>precio</code> (double)
- Atributo protegido: <code>stock</code> (int)
- Constructor con parámetros
- Implementa <code>getPrecio()</code> y <code>isDisponible()</code> (devuelve stock > 0)
- Método abstracto: <code>String getCategoria()</code>

<strong>3. Clase <code>Electronico</code> que extiende <code>Producto</code>:</strong>
- Atributo: <code>garantiaMeses</code> (int)
- Implementa <code>getCategoria()</code> → <code>"Electrónico"</code>
- Implementa <code>vender()</code>: reduce stock en 1 (si hay stock)

<strong>4. Clase <code>Alimentacion</code> que extiende <code>Producto</code>:</strong>
- Atributo: <code>fechaCaducidad</code> (String)
- Implementa <code>getCategoria()</code> → <code>"Alimentación"</code>

<strong>5. Excepción personalizada <code>StockInsuficienteException</code>:</strong>
- Lanzarla en <code>vender()</code> si stock = 0

<strong>6. Clase <code>Almacen</code> con gestión por HashMap:</strong>
- <code>HashMap&lt;String, Producto&gt;</code> donde la clave es el código
- Método <code>registrar(Producto p)</code>: añade al mapa
- Método <code>buscar(String codigo)</code>: devuelve el Producto o lanza excepción si no existe
- Método <code>mostrarDisponibles()</code>: imprime solo los que tienen stock (usando isDisponible())

<strong>7. En el main:</strong>
- Crea un Almacen, registra productos de diferentes tipos
- Usa polimorfismo para recorrer e imprimir todos
- Captura StockInsuficienteException al intentar vender sin stock`,

      criterios: [
        { desc: 'Interfaz Vendible con los 3 métodos', key: 'interfaz', test: c => /interface\s+Vendible/i.test(c) && /getPrecio/i.test(c) && /isDisponible/i.test(c) && /void\s+vender/i.test(c) },
        { desc: 'abstract class Producto implements Vendible', key: 'abstracta', test: c => /abstract\s+class\s+Producto\s+implements\s+Vendible/i.test(c) },
        { desc: 'Encapsulación: atributos private + getters', key: 'encapsulacion', test: c => /private\s+(String|double)\s+(codigo|nombre|precio)/i.test(c) },
        { desc: 'Electronico extends Producto con getCategoria()', key: 'herencia_elec', test: c => /class\s+Electronico\s+extends\s+Producto/i.test(c) },
        { desc: 'Alimentacion extends Producto', key: 'herencia_ali', test: c => /class\s+Alimentacion\s+extends\s+Producto/i.test(c) },
        { desc: 'StockInsuficienteException extends Exception', key: 'excepcion', test: c => /class\s+StockInsuficienteException\s+extends\s+Exception/i.test(c) },
        { desc: 'Almacen con HashMap<String, Producto>', key: 'hashmap', test: c => /HashMap\s*<\s*String\s*,\s*Producto\s*>/i.test(c) },
        { desc: 'try-catch en el main', key: 'try_catch', test: c => /try\s*\{[\s\S]*\}\s*catch/i.test(c) },
      ]
    }
  },

  {
    id: 'tutor_biblioteca',
    titulo: 'Simulacro: Sistema de Biblioteca',
    subtitulo: 'Ejercicio completo tipo examen: Modelado, Herencia e Interfaces',
    temas: ['Diseño de Clases', 'Herencia', 'Interfaces', 'Excepciones', 'Colecciones'],
    duracion: '~40 min',
    icono: '📚',
    color: '#8b5cf6',

    pasos: [
      {
        id: 'bib_diseno',
        titulo: 'Fase de Diseño: El mapa mental',
        fase: 'diseno',
        concepto: 'MODELADO POO',
        explicacion: `Antes de tocar una sola tecla, en el examen de papel debes <strong>identificar tus piezas</strong>. 
        Un sistema de biblioteca necesita:
        1. <strong>Libro</strong>: La entidad básica.
        2. <strong>Usuario</strong>: Quien alquila.
        3. <strong>Prestable</strong>: La interfaz que define el comportamiento.
        4. <strong>Biblioteca</strong>: La clase gestora con la colección.`,
        consejo: `💡 <strong>Consejo del profesor:</strong> En papel, dibuja flechas. 'Usuario es una Persona' (Herencia), 'Libro es Prestable' (Interfaz). Si no tienes claro el diseño, el código será un desastre.`,
        ejemplo: `// ESQUEMA DE DISEÑO SUGERIDO:
- Clase Libro: id, titulo, autor, disponible (boolean)
- Clase Usuario (Abstracta): nombre, idUsuario
- Clase UsuarioSocio (Hereda de Usuario): maxLibros
- Interfaz Prestable: prestar(), devolver()
- Clase Biblioteca: ArrayList<Libro>, ArrayList<Usuario>`,
        tareaGuiada: {
          instruccion: 'Define el esquema de clases para este sistema. Indica qué clases habrá, cuáles heredan de otras y qué interfaz usarás.',
          placeholder: 'Define las clases y sus relaciones...\nEj: Clase X hereda de Y...',
          checks: [
            { desc: 'Menciona la clase Libro', test: c => /Libro/i.test(c) },
            { desc: 'Menciona la clase Usuario', test: c => /Usuario/i.test(c) },
            { desc: 'Propone Herencia para Usuario (Premium/Socio)', test: c => /hereda|extends|subclase|hijo/i.test(c) },
            { desc: 'Identifica la interfaz Prestable', test: c => /Prestable|Interfaz/i.test(c) },
          ]
        }
      },
      {
        id: 'bib_clases',
        titulo: 'Implementación: La base y la Interfaz',
        concepto: 'ESTRUCTURA BASE',
        explicacion: `Vamos a crear la interfaz <code>Prestable</code> con los métodos <code>prestar()</code> y <code>devolver()</code>. 
        Luego, la clase <code>Libro</code> que la implemente.`,
        consejo: `💡 <strong>Pista del examen:</strong> Si un método de la interfaz no se puede cumplir (ej: prestar un libro ya prestado), ¡lanza una excepción!`,
        ejemplo: `interface Prestable {
    void prestar() throws Exception;
    void devolver();
}

class Libro implements Prestable {
    private String titulo;
    private boolean prestado = false;
    // ... constructor y métodos
}`,
        tareaGuiada: {
          instruccion: 'Define la interfaz <code>Prestable</code> y la clase <code>Libro</code> implementándola.',
          placeholder: 'interface Prestable { ... }\nclass Libro implements Prestable { ... }',
          checks: [
            { desc: 'Interfaz Prestable definida', test: c => /interface\s+Prestable/i.test(c) },
            { desc: 'Libro implements Prestable', test: c => /class\s+Libro\s+implements\s+Prestable/i.test(c) },
            { desc: 'Atributo boolean prestado/disponible', test: c => /boolean\s+(prestado|disponible)/i.test(c) },
          ]
        }
      },
      {
        id: 'bib_herencia',
        titulo: 'Herencia y Especialización',
        concepto: 'HERENCIA COMPLEJA',
        explicacion: `En la biblioteca hay usuarios normales y socios. El socio puede sacar más libros. 
        Usa una clase abstracta <code>Usuario</code> y subclases.`,
        consejo: `💡 <strong>Pista del examen:</strong> Usa <code>protected</code> si quieres que las subclases accedan a un atributo del padre directamente, aunque <code>private</code> con getters es más profesional.`,
        ejemplo: `abstract class Usuario {
    private String nombre;
    public Usuario(String n) { this.nombre = n; }
    public abstract int getMaxLibros();
}
class Socio extends Usuario {
    @Override public int getMaxLibros() { return 10; }
}`,
        tareaGuiada: {
          instruccion: 'Crea la estructura de herencia para <code>Usuario</code> y <code>Socio</code>.',
          placeholder: 'abstract class Usuario { ... }\nclass Socio extends Usuario { ... }',
          checks: [
            { desc: 'Clase abstracta Usuario', test: c => /abstract\s+class\s+Usuario/i.test(c) },
            { desc: 'Socio extends Usuario', test: c => /class\s+Socio\s+extends\s+Usuario/i.test(c) },
            { desc: 'Constructor usa super()', test: c => /super\s*\(/i.test(c) },
          ]
        }
      }
    ],

    examen: {
      titulo: 'EXAMEN FINAL: Gestión Integral de Biblioteca',
      instrucciones: 'Simulacro REAL de 1h. Papel en blanco. Diseña y programa el sistema completo.',
      tiempo: '60 min',
      enunciado: `Diseña un sistema para una Biblioteca Municipal. Debes incluir:
      1. <strong>Interfaz <code>Prestable</code></strong> con métodos para prestar/devolver.
      2. <strong>Clase <code>Libro</code></strong> que implemente <code>Prestable</code>. Atributos: titulo, autor, isbn.
      3. <strong>Excepción <code>LibroNoDisponibleException</code></strong> (propietaria).
      4. <strong>Sistema de Usuarios</strong>: Clase abstracta <code>Usuario</code> y subclase <code>Socio</code>.
      5. <strong>Clase <code>Biblioteca</code></strong>: 
         - Atributo <code>ArrayList&lt;Libro&gt;</code>.
         - Método <code>agregarLibro(Libro l)</code>.
         - Método <code>realizarPrestamo(String isbn)</code>: busca el libro y llama a <code>prestar()</code>. 
         - Si no existe o ya está prestado, lanza la excepción.
      6. <strong>Main</strong>: Crea la biblioteca, añade libros, intenta un préstamo válido y uno que falle (usando try-catch).`,

      criterios: [
        { desc: 'Diseño correcto de la Interfaz Prestable', key: 'interfaz', test: c => /interface\s+Prestable/i.test(c) },
        { desc: 'Clase Libro con implementación de la interfaz', key: 'clase_libro', test: c => /class\s+Libro\s+implements\s+Prestable/i.test(c) },
        { desc: 'Jerarquía de Usuarios (Abstracta + Clase)', key: 'herencia', test: c => /abstract\s+class\s+Usuario/i.test(c) && /extends\s+Usuario/i.test(c) },
        { desc: 'Excepción personalizada LibroNoDisponibleException', key: 'excepcion', test: c => /class\s+LibroNoDisponibleException\s+extends\s+Exception/i.test(c) },
        { desc: 'Clase Biblioteca con ArrayList<Libro>', key: 'colecciones', test: c => /ArrayList\s*<\s*Libro\s*>/i.test(c) },
        { desc: 'Método realizarPrestamo con lógica de búsqueda', test: c => /realizarPrestamo/i.test(c) && /for|stream/i.test(c) },
        { desc: 'Bloque try-catch para gestionar el préstamo', key: 'try_catch', test: c => /try\s*\{[\s\S]*\}\s*catch/i.test(c) },
      ]
    }
  }
];
