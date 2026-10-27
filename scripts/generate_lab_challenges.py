#!/usr/bin/env python3
"""
generate_lab_challenges.py
Generates 22 Python, 22 DWEC (JavaScript), and 22 DWES (PHP)
interactive challenges with test cases, hints, and solutions.
Total: 66 challenges.
"""

import json

# ══════════════════════════════════════════════════════════════════════════════
# 🐍 PYTHON CHALLENGES (22)
# ══════════════════════════════════════════════════════════════════════════════
python_challenges = [
    {
        "id": "py_ud1_hello",
        "subject": "python",
        "unit": 1,
        "title": "Hola Mundo personalizado",
        "description": "Escribe una función <code>solution(nombre)</code> que reciba un nombre como string y devuelva el mensaje <code>'¡Hola, [nombre]!'</code>.<br><br>Ejemplo: <code>solution('Javier')</code> → <code>'¡Hola, Javier!'</code>",
        "language": "python",
        "difficulty": "basic",
        "starterCode": "def solution(nombre):\n    # Escribe tu código aquí\n    pass",
        "testCases": [
            { "input": ["Javier"], "expected": "¡Hola, Javier!", "description": "Nombre 'Javier'" },
            { "input": ["Python"], "expected": "¡Hola, Python!", "description": "Nombre 'Python'" },
            { "input": ["DAW"], "expected": "¡Hola, DAW!", "description": "Nombre 'DAW'" }
        ],
        "hints": [
            "Usa una f-string: f'¡Hola, {nombre}!'",
            "Asegúrate de incluir los signos de exclamación ¡ y !"
        ],
        "solution": "def solution(nombre):\n    return f\"¡Hola, {nombre}!\""
    },
    {
        "id": "py_ud1_types",
        "subject": "python",
        "unit": 1,
        "title": "Identificar tipo de dato",
        "description": "Escribe una función <code>solution(valor)</code> que reciba cualquier valor y devuelva un string con el nombre de su tipo nativo: <code>'int'</code>, <code>'float'</code>, <code>'str'</code>, <code>'bool'</code> o <code>'list'</code>.<br><br>Ejemplo: <code>solution(42)</code> → <code>'int'</code>",
        "language": "python",
        "difficulty": "basic",
        "starterCode": "def solution(valor):\n    # type() devuelve el tipo, .__name__ da el nombre\n    pass",
        "testCases": [
            { "input": [42], "expected": "int", "description": "Entero 42" },
            { "input": [3.14], "expected": "float", "description": "Decimal 3.14" },
            { "input": ["hola"], "expected": "str", "description": "Cadena 'hola'" },
            { "input": [True], "expected": "bool", "description": "Booleano True" },
            { "input": [[1, 2, 3]], "expected": "list", "description": "Lista [1, 2, 3]" }
        ],
        "hints": [
            "Usa type(valor).__name__ para obtener el nombre del tipo directamente."
        ],
        "solution": "def solution(valor):\n    return type(valor).__name__"
    },
    {
        "id": "py_ud1_temperature",
        "subject": "python",
        "unit": 1,
        "title": "Conversor Celsius a Fahrenheit",
        "description": "Escribe una función <code>solution(celsius)</code> que convierta grados Celsius a Fahrenheit redondeado a 2 decimales.<br>Fórmula: <code>(C * 9/5) + 32</code>.<br><br>Ejemplo: <code>solution(0)</code> → <code>32.0</code>, <code>solution(25)</code> → <code>77.0</code>",
        "language": "python",
        "difficulty": "basic",
        "starterCode": "def solution(celsius):\n    # Aplica la fórmula y redondea con round(..., 2)\n    pass",
        "testCases": [
            { "input": [0], "expected": 32.0, "description": "Punto de congelación (0°C -> 32°F)" },
            { "input": [100], "expected": 212.0, "description": "Punto de ebullición (100°C -> 212°F)" },
            { "input": [25.5], "expected": 77.9, "description": "Temperatura ambiente (25.5°C -> 77.9°F)" }
        ],
        "hints": [
            "Calcula (celsius * 9 / 5) + 32 y usa round(resultado, 2)"
        ],
        "solution": "def solution(celsius):\n    return round((celsius * 9 / 5) + 32, 2)"
    },
    {
        "id": "py_ud2_loops",
        "subject": "python",
        "unit": 2,
        "title": "Suma de lista con bucle",
        "description": "Escribe una función <code>solution(numeros)</code> que reciba una lista de números y devuelva la suma de todos sus elementos <strong>sin usar la función nativa sum()</strong>.<br><br>Ejemplo: <code>solution([1, 2, 3, 4])</code> → <code>10</code>",
        "language": "python",
        "difficulty": "basic",
        "starterCode": "def solution(numeros):\n    total = 0\n    # Usa un bucle for\n    return total",
        "testCases": [
            { "input": [[1, 2, 3, 4]], "expected": 10, "description": "Suma de 1 a 4" },
            { "input": [[-5, 5, 10]], "expected": 10, "description": "Con números negativos" },
            { "input": [[]], "expected": 0, "description": "Lista vacía devuelve 0" }
        ],
        "hints": [
            "Inicializa total = 0, recorre con 'for n in numeros:' y suma 'total += n'."
        ],
        "solution": "def solution(numeros):\n    total = 0\n    for n in numeros:\n        total += n\n    return total"
    },
    {
        "id": "py_ud2_count_vowels",
        "subject": "python",
        "unit": 2,
        "title": "Contador de vocales",
        "description": "Escribe una función <code>solution(texto)</code> que cuente cuántas vocales (a, e, i, o, u) contiene un texto, sin distinguir mayúsculas de minúsculas.<br><br>Ejemplo: <code>solution('Desarrollo Web')</code> → <code>5</code>",
        "language": "python",
        "difficulty": "basic",
        "starterCode": "def solution(texto):\n    # Convierte a minúsculas y cuenta vocales\n    pass",
        "testCases": [
            { "input": ["Desarrollo Web"], "expected": 5, "description": "'Desarrollo Web' -> 5 vocales" },
            { "input": ["AEIOU"], "expected": 5, "description": "Todas mayúsculas" },
            { "input": ["xyz"], "expected": 0, "description": "Sin vocales" }
        ],
        "hints": [
            "Usa texto.lower() y verifica 'if c in \"aeiou\":'"
        ],
        "solution": "def solution(texto):\n    vocales = \"aeiou\"\n    return sum(1 for c in texto.lower() if c in vocales)"
    },
    {
        "id": "py_ud2_even_numbers",
        "subject": "python",
        "unit": 2,
        "title": "Filtrar números pares",
        "description": "Escribe una función <code>solution(numeros)</code> que reciba una lista de números enteros y devuelva una nueva lista únicamente con los números pares en el mismo orden.<br><br>Ejemplo: <code>solution([1, 2, 3, 4, 5, 6])</code> → <code>[2, 4, 6]</code>",
        "language": "python",
        "difficulty": "basic",
        "starterCode": "def solution(numeros):\n    # Usa comprensión de listas o bucle con n % 2 == 0\n    pass",
        "testCases": [
            { "input": [[1, 2, 3, 4, 5, 6]], "expected": [2, 4, 6], "description": "Lista mixta" },
            { "input": [[1, 3, 5]], "expected": [], "description": "Solo impares" },
            { "input": [[0, 2, 4]], "expected": [0, 2, 4], "description": "Incluyendo cero" }
        ],
        "hints": [
            "Un número es par si 'n % 2 == 0'. Puedes hacer '[n for n in numeros if n % 2 == 0]'."
        ],
        "solution": "def solution(numeros):\n    return [n for n in numeros if n % 2 == 0]"
    },
    {
        "id": "py_ud2_max_element",
        "subject": "python",
        "unit": 2,
        "title": "Encontrar máximo sin max()",
        "description": "Escribe una función <code>solution(numeros)</code> que encuentre el número mayor de una lista sin usar la función <code>max()</code>. Si la lista está vacía, devuelve <code>None</code>.<br><br>Ejemplo: <code>solution([3, 9, 2, 5])</code> → <code>9</code>",
        "language": "python",
        "difficulty": "basic",
        "starterCode": "def solution(numeros):\n    if not numeros:\n        return None\n    # Recorre y guarda el mayor",
        "testCases": [
            { "input": [[3, 9, 2, 5]], "expected": 9, "description": "Máximo en el medio" },
            { "input": [[-10, -2, -50]], "expected": -2, "description": "Todos negativos" },
            { "input": [[]], "expected": None, "description": "Lista vacía" }
        ],
        "hints": [
            "Inicia mayor = numeros[0] e itera comparando 'if n > mayor: mayor = n'."
        ],
        "solution": "def solution(numeros):\n    if not numeros:\n        return None\n    mayor = numeros[0]\n    for n in numeros[1:]:\n        if n > mayor:\n            mayor = n\n    return mayor"
    },
    {
        "id": "py_ud2_dict_frequency",
        "subject": "python",
        "unit": 2,
        "title": "Frecuencia de palabras",
        "description": "Escribe una función <code>solution(palabras)</code> que reciba una lista de palabras y devuelva un diccionario con la frecuencia de cada una.<br><br>Ejemplo: <code>solution(['sol', 'mar', 'sol'])</code> → <code>{'sol': 2, 'mar': 1}</code>",
        "language": "python",
        "difficulty": "intermediate",
        "starterCode": "def solution(palabras):\n    freq = {}\n    # Cuenta las ocurrencias\n    return freq",
        "testCases": [
            { "input": [["sol", "mar", "sol"]], "expected": { "sol": 2, "mar": 1 }, "description": "Palabras repetidas" },
            { "input": [["a", "b", "c"]], "expected": { "a": 1, "b": 1, "c": 1 }, "description": "Todas únicas" },
            { "input": [[]], "expected": {}, "description": "Lista vacía" }
        ],
        "hints": [
            "Usa freq[p] = freq.get(p, 0) + 1 dentro de un bucle."
        ],
        "solution": "def solution(palabras):\n    freq = {}\n    for p in palabras:\n        freq[p] = freq.get(p, 0) + 1\n    return freq"
    },
    {
        "id": "py_ud3_palindrome",
        "subject": "python",
        "unit": 3,
        "title": "Comprobar palíndromo",
        "description": "Escribe una función <code>solution(texto)</code> que determine si una cadena es un palíndromo, ignorando espacios y mayúsculas/minúsculas.<br><br>Ejemplo: <code>solution('Anita lava la tina')</code> → <code>True</code>",
        "language": "python",
        "difficulty": "basic",
        "starterCode": "def solution(texto):\n    # Limpia espacios, pasa a minúsculas y compara con invertido [::-1]\n    pass",
        "testCases": [
            { "input": ["Anita lava la tina"], "expected": True, "description": "Frase palíndromo con espacios" },
            { "input": ["radar"], "expected": True, "description": "Palabra radar" },
            { "input": ["python"], "expected": False, "description": "'python' no es palíndromo" }
        ],
        "hints": [
            "Limpia: limpio = texto.replace(' ', '').lower() y compara limpio == limpio[::-1]"
        ],
        "solution": "def solution(texto):\n    limpio = texto.replace(' ', '').lower()\n    return limpio == limpio[::-1]"
    },
    {
        "id": "py_ud3_filter_dict",
        "subject": "python",
        "unit": 3,
        "title": "Filtrar alumnos aprobados",
        "description": "Escribe una función <code>solution(notas, umbral)</code> que reciba un diccionario <code>{nombre: nota}</code> y devuelva un nuevo diccionario solo con aquellos cuya nota sea mayor o igual al umbral.<br><br>Ejemplo: <code>solution({'Ana': 8, 'Luis': 4}, 5)</code> → <code>{'Ana': 8}</code>",
        "language": "python",
        "difficulty": "basic",
        "starterCode": "def solution(notas, umbral):\n    # Usa dict comprehension {k: v for k, v in notas.items() if ...}\n    pass",
        "testCases": [
            { "input": [{ "Ana": 8, "Luis": 4, "Bea": 6 }, 5], "expected": { "Ana": 8, "Bea": 6 }, "description": "Aprobados >= 5" },
            { "input": [{ "Carlos": 9, "Diana": 10 }, 9.5], "expected": { "Diana": 10 }, "description": "Umbral 9.5" },
            { "input": [{}, 5], "expected": {}, "description": "Diccionario vacío" }
        ],
        "hints": [
            "Puedes usar '{k: v for k, v in notas.items() if v >= umbral}'."
        ],
        "solution": "def solution(notas, umbral):\n    return {k: v for k, v in notas.items() if v >= umbral}"
    },
    {
        "id": "py_ud3_factorial",
        "subject": "python",
        "unit": 3,
        "title": "Cálculo de Factorial",
        "description": "Escribe una función <code>solution(n)</code> que devuelva el factorial de un entero <code>n >= 0</code>. Recuerda que <code>0! = 1</code>.<br><br>Ejemplo: <code>solution(5)</code> → <code>120</code>",
        "language": "python",
        "difficulty": "basic",
        "starterCode": "def solution(n):\n    # Factorial de n\n    pass",
        "testCases": [
            { "input": [0], "expected": 1, "description": "0! es 1" },
            { "input": [1], "expected": 1, "description": "1! es 1" },
            { "input": [5], "expected": 120, "description": "5! = 120" },
            { "input": [6], "expected": 720, "description": "6! = 720" }
        ],
        "hints": [
            "Puedes hacerlo con math.prod(range(1, n+1)) o con un bucle acumulador."
        ],
        "solution": "def solution(n):\n    if n <= 1:\n        return 1\n    res = 1\n    for i in range(2, n + 1):\n        res *= i\n    return res"
    },
    {
        "id": "py_ud3_list_comprehension",
        "subject": "python",
        "unit": 3,
        "title": "Cuadrados de números positivos",
        "description": "Escribe una función <code>solution(numeros)</code> que use <strong>list comprehension</strong> para devolver una lista con el cuadrado de aquellos números que sean estrictamente positivos (> 0).<br><br>Ejemplo: <code>solution([-2, 0, 3, 4])</code> → <code>[9, 16]</code>",
        "language": "python",
        "difficulty": "basic",
        "starterCode": "def solution(numeros):\n    # Retorna [x**2 for x in numeros if x > 0]\n    pass",
        "testCases": [
            { "input": [[-2, 0, 3, 4]], "expected": [9, 16], "description": "Positivos al cuadrado" },
            { "input": [[-5, -1]], "expected": [], "description": "Solo negativos" },
            { "input": [[2, 5]], "expected": [4, 25], "description": "Todos positivos" }
        ],
        "hints": [
            "Estructura: [x**2 for x in numeros if x > 0]"
        ],
        "solution": "def solution(numeros):\n    return [x**2 for x in numeros if x > 0]"
    },
    {
        "id": "py_ud4_class_bank_account",
        "subject": "python",
        "unit": 4,
        "title": "Clase CuentaBancaria",
        "description": "Escribe una función <code>solution(operaciones)</code> que cree una cuenta bancaria con saldo inicial 0 y ejecute una lista de operaciones <code>[('ingreso', cantidad), ('retiro', cantidad)]</code>. Si un retiro excede el saldo disponible, debe ignorarse. Devuelve el saldo final.<br><br>Ejemplo: <code>solution([('ingreso', 100), ('retiro', 30)])</code> → <code>70</code>",
        "language": "python",
        "difficulty": "intermediate",
        "starterCode": "def solution(operaciones):\n    # Simula la cuenta bancaria\n    saldo = 0\n    return saldo",
        "testCases": [
            { "input": [[["ingreso", 100], ["retiro", 30]]], "expected": 70, "description": "Ingreso y retiro normal" },
            { "input": [[["ingreso", 50], ["retiro", 100]]], "expected": 50, "description": "Retiro excesivo ignorado" },
            { "input": [[["ingreso", 200], ["retiro", 50], ["ingreso", 100]]], "expected": 250, "description": "Múltiples operaciones" }
        ],
        "hints": [
            "Comprueba if op == 'ingreso': saldo += cant elif op == 'retiro' and saldo >= cant: saldo -= cant"
        ],
        "solution": "def solution(operaciones):\n    saldo = 0\n    for op, cant in operaciones:\n        if op == 'ingreso':\n            saldo += cant\n        elif op == 'retiro' and saldo >= cant:\n            saldo -= cant\n    return saldo"
    },
    {
        "id": "py_ud4_class_rectangle",
        "subject": "python",
        "unit": 4,
        "title": "Cálculo de Área y Perímetro",
        "description": "Escribe una función <code>solution(ancho, alto)</code> que devuelva un diccionario con las claves <code>'area'</code> y <code>'perimetro'</code> de un rectángulo.<br><br>Ejemplo: <code>solution(5, 3)</code> → <code>{'area': 15, 'perimetro': 16}</code>",
        "language": "python",
        "difficulty": "basic",
        "starterCode": "def solution(ancho, alto):\n    # Retorna {'area': ..., 'perimetro': ...}\n    pass",
        "testCases": [
            { "input": [5, 3], "expected": { "area": 15, "perimetro": 16 }, "description": "Rectángulo 5x3" },
            { "input": [4, 4], "expected": { "area": 16, "perimetro": 16 }, "description": "Cuadrado 4x4" },
            { "input": [10, 2], "expected": { "area": 20, "perimetro": 24 }, "description": "Rectángulo 10x2" }
        ],
        "hints": [
            "Área = ancho * alto, Perímetro = 2 * (ancho + alto)"
        ],
        "solution": "def solution(ancho, alto):\n    return {'area': ancho * alto, 'perimetro': 2 * (ancho + alto)}"
    },
    {
        "id": "py_ud4_inheritance",
        "subject": "python",
        "unit": 4,
        "title": "Jerarquía de Vehículos (POO)",
        "description": "Implementa una función <code>solution(marca, modelo, puertas)</code> que instancie un objeto coche y devuelva su descripción con el formato: <code>'{marca} {modelo} con {puertas} puertas'</code>.<br><br>Ejemplo: <code>solution('Toyota', 'Corolla', 5)</code> → <code>'Toyota Corolla con 5 puertas'</code>",
        "language": "python",
        "difficulty": "basic",
        "starterCode": "def solution(marca, modelo, puertas):\n    # Devuelve la descripción formateada\n    pass",
        "testCases": [
            { "input": ["Toyota", "Corolla", 5], "expected": "Toyota Corolla con 5 puertas", "description": "Toyota Corolla" },
            { "input": ["Ford", "Mustang", 3], "expected": "Ford Mustang con 3 puertas", "description": "Ford Mustang" }
        ],
        "hints": [
            "Usa una f-string: f'{marca} {modelo} con {puertas} puertas'"
        ],
        "solution": "def solution(marca, modelo, puertas):\n    return f\"{marca} {modelo} con {puertas} puertas\""
    },
    {
        "id": "py_ud5_safe_divide",
        "subject": "python",
        "unit": 5,
        "title": "División segura con excepciones",
        "description": "Escribe una función <code>solution(a, b)</code> que intente dividir <code>a / b</code>.<br>Si ocurre una excepción de división entre cero (<code>ZeroDivisionError</code>) o error de tipos (<code>TypeError</code>), debe capturarla y devolver <code>None</code>.<br><br>Ejemplo: <code>solution(10, 2)</code> → <code>5.0</code>, <code>solution(10, 0)</code> → <code>None</code>",
        "language": "python",
        "difficulty": "basic",
        "starterCode": "def solution(a, b):\n    # Usa bloque try-except\n    try:\n        return a / b\n    except (ZeroDivisionError, TypeError):\n        return None",
        "testCases": [
            { "input": [10, 2], "expected": 5.0, "description": "División exacta" },
            { "input": [7, 0], "expected": None, "description": "División entre cero" },
            { "input": ["10", 2], "expected": None, "description": "Error de tipos" }
        ],
        "hints": [
            "Captura 'except (ZeroDivisionError, TypeError): return None'"
        ],
        "solution": "def solution(a, b):\n    try:\n        return a / b\n    except (ZeroDivisionError, TypeError):\n        return None"
    },
    {
        "id": "py_ud5_json_parse",
        "subject": "python",
        "unit": 5,
        "title": "Parser JSON seguro",
        "description": "Escribe una función <code>solution(json_string, default_val)</code> que intente parsear un string en JSON usando el módulo <code>json</code>. Si el string tiene un error de sintaxis JSON, debe capturar <code>json.JSONDecodeError</code> y devolver <code>default_val</code>.<br><br>Ejemplo: <code>solution('{\"edad\": 20}', {})</code> → <code>{'edad': 20}</code>",
        "language": "python",
        "difficulty": "intermediate",
        "starterCode": "import json\n\ndef solution(json_string, default_val):\n    # Usa json.loads dentro de try-except\n    pass",
        "testCases": [
            { "input": ["{\"nombre\": \"Alex\"}", {}], "expected": { "nombre": "Alex" }, "description": "JSON válido" },
            { "input": ["{invalido}", "error"], "expected": "error", "description": "JSON inválido devuelve default" },
            { "input": ["[1, 2, 3]", []], "expected": [1, 2, 3], "description": "Array JSON válido" }
        ],
        "hints": [
            "Usa 'try: return json.loads(json_string) except Exception: return default_val'"
        ],
        "solution": "import json\n\ndef solution(json_string, default_val):\n    try:\n        return json.loads(json_string)\n    except Exception:\n        return default_val"
    },
    {
        "id": "py_ud5_csv_row_parser",
        "subject": "python",
        "unit": 5,
        "title": "Parser de línea CSV",
        "description": "Escribe una función <code>solution(linea)</code> que reciba una línea en formato CSV separada por comas y devuelva una lista de strings con cada valor limpio de espacios sobrantes a los lados.<br><br>Ejemplo: <code>solution(' Ana , 22 , DAW ')</code> → <code>['Ana', '22', 'DAW']</code>",
        "language": "python",
        "difficulty": "basic",
        "starterCode": "def solution(linea):\n    # Divide por ',' y limpia con strip()\n    pass",
        "testCases": [
            { "input": [" Ana , 22 , DAW "], "expected": ["Ana", "22", "DAW"], "description": "Con espacios alrededor" },
            { "input": ["Madrid,Barcelona,Valencia"], "expected": ["Madrid", "Barcelona", "Valencia"], "description": "Sin espacios" }
        ],
        "hints": [
            "Usa '[item.strip() for item in linea.split(\",\")]'"
        ],
        "solution": "def solution(linea):\n    return [item.strip() for item in linea.split(',')]"
    },
    {
        "id": "py_ud6_regex_email",
        "subject": "python",
        "unit": 6,
        "title": "Validador básico de Email (Regex)",
        "description": "Escribe una función <code>solution(email)</code> que utilice el módulo <code>re</code> para verificar si un email tiene una estructura válida: caracteres alfanuméricos, seguido de <code>@</code>, un dominio y un punto con extensión de 2 o más letras.<br><br>Ejemplo: <code>solution('user@test.com')</code> → <code>True</code>",
        "language": "python",
        "difficulty": "intermediate",
        "starterCode": "import re\n\ndef solution(email):\n    # Usa re.match con un patrón\n    pass",
        "testCases": [
            { "input": ["alumno@instituto.es"], "expected": True, "description": "Email válido .es" },
            { "input": ["contacto.empresa@gmail.com"], "expected": True, "description": "Email con punto en usuario" },
            { "input": ["invalido-sin-arroba.com"], "expected": False, "description": "Sin arroba" },
            { "input": ["hola@dominio"], "expected": False, "description": "Sin extensión de dominio" }
        ],
        "hints": [
            "Patrón sugerido: r'^[\\w\\.-]+@[\\w\\.-]+\\.[a-zA-Z]{2,}$'"
        ],
        "solution": "import re\n\ndef solution(email):\n    patron = r'^[\\w\\.-]+@[\\w\\.-]+\\.[a-zA-Z]{2,}$'\n    return bool(re.match(patron, email))"
    },
    {
        "id": "py_ud6_lambda_sort",
        "subject": "python",
        "unit": 6,
        "title": "Ordenar diccionarios con Lambda",
        "description": "Escribe una función <code>solution(usuarios)</code> que reciba una lista de diccionarios <code>[{'nombre': str, 'edad': int}]</code> y devuelva la lista ordenada de menor a mayor edad usando <code>sorted()</code> y una función <code>lambda</code>.<br><br>Ejemplo: <code>solution([{'nombre': 'B', 'edad': 30}, {'nombre': 'A', 'edad': 20}])</code> → ordenado por edad ascendente",
        "language": "python",
        "difficulty": "intermediate",
        "starterCode": "def solution(usuarios):\n    # Usa sorted(usuarios, key=lambda u: u['edad'])\n    pass",
        "testCases": [
            {
                "input": [[{ "nombre": "Carlos", "edad": 28 }, { "nombre": "Ana", "edad": 22 }, { "nombre": "Bea", "edad": 25 }]],
                "expected": [{ "nombre": "Ana", "edad": 22 }, { "nombre": "Bea", "edad": 25 }, { "nombre": "Carlos", "edad": 28 }],
                "description": "Orden ascendente por edad"
            }
        ],
        "hints": [
            "Usa 'return sorted(usuarios, key=lambda x: x[\"edad\"])'"
        ],
        "solution": "def solution(usuarios):\n    return sorted(usuarios, key=lambda x: x['edad'])"
    },
    {
        "id": "py_ud6_decorator_time",
        "subject": "python",
        "unit": 6,
        "title": "Prefijo con decorador",
        "description": "Escribe una función <code>solution(texto)</code> que simule la acción de un decorador envoltorio agregando el prefijo <code>'[LOG] '</code> y sufijo <code>' [OK]'</code> al texto.<br><br>Ejemplo: <code>solution('Servidor iniciado')</code> → <code>'[LOG] Servidor iniciado [OK]'</code>",
        "language": "python",
        "difficulty": "basic",
        "starterCode": "def solution(texto):\n    # Formatea con prefijo y sufijo\n    pass",
        "testCases": [
            { "input": ["Servidor iniciado"], "expected": "[LOG] Servidor iniciado [OK]", "description": "Mensaje de log" },
            { "input": ["Base de datos conectada"], "expected": "[LOG] Base de datos conectada [OK]", "description": "Conexión DB" }
        ],
        "hints": [
            "Usa f'[LOG] {texto} [OK]'"
        ],
        "solution": "def solution(texto):\n    return f\"[LOG] {texto} [OK]\""
    },
    {
        "id": "py_ud6_matrix_transpose",
        "subject": "python",
        "unit": 6,
        "title": "Transposición de matriz",
        "description": "Escribe una función <code>solution(matriz)</code> que reciba una matriz 2D (lista de listas) y devuelva su transpuesta (intercambiando filas por columnas).<br><br>Ejemplo: <code>solution([[1, 2], [3, 4]])</code> → <code>[[1, 3], [2, 4]]</code>",
        "language": "python",
        "difficulty": "intermediate",
        "starterCode": "def solution(matriz):\n    # Usa list(map(list, zip(*matriz))) o bucles anidados\n    pass",
        "testCases": [
            { "input": [[[1, 2], [3, 4]]], "expected": [[1, 3], [2, 4]], "description": "Matriz 2x2" },
            { "input": [[[1, 2, 3], [4, 5, 6]]], "expected": [[1, 4], [2, 5], [3, 6]], "description": "Matriz 2x3 -> 3x2" }
        ],
        "hints": [
            "El truco idiomático de Python es: [list(fila) for fila in zip(*matriz)]"
        ],
        "solution": "def solution(matriz):\n    if not matriz:\n        return []\n    return [list(col) for col in zip(*matriz)]"
    }
]

# ══════════════════════════════════════════════════════════════════════════════
# 🟨 DWEC - JAVASCRIPT CHALLENGES (22)
# ══════════════════════════════════════════════════════════════════════════════
dwec_challenges = [
    {
        "id": "dwec_ud1_vars",
        "subject": "dwec",
        "unit": 1,
        "title": "Destructuring y valores por defecto",
        "description": "Escribe una función <code>solution(config)</code> que reciba un objeto de configuración con campos opcionales <code>{ host, port, timeout }</code> y devuelva un objeto completo aplicando los valores por defecto: <code>host: 'localhost'</code>, <code>port: 8080</code>, <code>timeout: 5000</code>.",
        "language": "javascript",
        "difficulty": "basic",
        "starterCode": "function solution(config = {}) {\n    // Usa destructuring con defaults o spread operator\n    return {\n        host: config.host || 'localhost',\n        port: config.port !== undefined ? config.port : 8080,\n        timeout: config.timeout !== undefined ? config.timeout : 5000\n    };\n}",
        "testCases": [
            { "input": [{ "port": 3000 }], "expected": { "host": "localhost", "port": 3000, "timeout": 5000 }, "description": "Solo port proporcionado" },
            { "input": [{}], "expected": { "host": "localhost", "port": 8080, "timeout": 5000 }, "description": "Objeto vacío toma todos los defaults" },
            { "input": [{ "host": "api.dev", "port": 443, "timeout": 1000 }], "expected": { "host": "api.dev", "port": 443, "timeout": 1000 }, "description": "Todos los campos dados" }
        ],
        "hints": ["Usa `{ host = 'localhost', port = 8080, timeout = 5000 } = config`"],
        "solution": "function solution(config = {}) {\n    const { host = 'localhost', port = 8080, timeout = 5000 } = config;\n    return { host, port, timeout };\n}"
    },
    {
        "id": "dwec_ud1_template_literal",
        "subject": "dwec",
        "unit": 1,
        "title": "Tarjeta HTML con Template Literals",
        "description": "Escribe una función <code>solution(usuario)</code> que reciba <code>{ nombre, rol, activo }</code> y devuelva una cadena HTML: <code>&lt;div class=\"card\"&gt;&lt;h3&gt;[nombre]&lt;/h3&gt;&lt;span class=\"[badge]\"&gt;[rol]&lt;/span&gt;&lt;/div&gt;</code>, donde badge es <code>'active'</code> si activo es true o <code>'inactive'</code> si es false.",
        "language": "javascript",
        "difficulty": "basic",
        "starterCode": "function solution(usuario) {\n    // Genera el HTML con backticks\n}",
        "testCases": [
            { "input": [{ "nombre": "Sara", "rol": "Admin", "activo": True }], "expected": "<div class=\"card\"><h3>Sara</h3><span class=\"active\">Admin</span></div>", "description": "Usuario activo" },
            { "input": [{ "nombre": "Pepe", "rol": "User", "activo": False }], "expected": "<div class=\"card\"><h3>Pepe</h3><span class=\"inactive\">User</span></div>", "description": "Usuario inactivo" }
        ],
        "hints": ["Usa interpolación: `<div class=\"card\"><h3>${usuario.nombre}</h3><span class=\"${usuario.activo ? 'active' : 'inactive'}\">${usuario.rol}</span></div>`"],
        "solution": "function solution(usuario) {\n    const badge = usuario.activo ? 'active' : 'inactive';\n    return `<div class=\"card\"><h3>${usuario.nombre}</h3><span class=\"${badge}\">${usuario.rol}</span></div>`;\n}"
    },
    {
        "id": "dwec_ud2_array_sum",
        "subject": "dwec",
        "unit": 2,
        "title": "Cálculo de Promedio con Reduce",
        "description": "Escribe una función <code>solution(numeros)</code> que reciba un array de números y devuelva su media aritmética redondeada a 2 decimales. Si el array está vacío, devuelve <code>0</code>.",
        "language": "javascript",
        "difficulty": "basic",
        "starterCode": "function solution(numeros) {\n    if (!numeros || numeros.length === 0) return 0;\n    // Usa reduce para sumar\n}",
        "testCases": [
            { "input": [[10, 20, 30]], "expected": 20, "description": "Media de 10, 20, 30 -> 20" },
            { "input": [[5, 6, 8]], "expected": 6.33, "description": "Con decimales periódicos" },
            { "input": [[]], "expected": 0, "description": "Array vacío devuelve 0" }
        ],
        "hints": ["Suma con `numeros.reduce((a, b) => a + b, 0)` y luego `Math.round((suma / numeros.length) * 100) / 100`"],
        "solution": "function solution(numeros) {\n    if (!numeros || numeros.length === 0) return 0;\n    const sum = numeros.reduce((acc, n) => acc + n, 0);\n    return Math.round((sum / numeros.length) * 100) / 100;\n}"
    },
    {
        "id": "dwec_ud2_unique_elements",
        "subject": "dwec",
        "unit": 2,
        "title": "Eliminar duplicados con Set",
        "description": "Escribe una función <code>solution(array)</code> que devuelva un nuevo array sin elementos duplicados preservando el orden de su primera aparición.",
        "language": "javascript",
        "difficulty": "basic",
        "starterCode": "function solution(array) {\n    // Usa new Set y el operador spread [...]\n}",
        "testCases": [
            { "input": [[1, 2, 2, 3, 1, 4]], "expected": [1, 2, 3, 4], "description": "Números duplicados" },
            { "input": [["a", "b", "a", "c"]], "expected": ["a", "b", "c"], "description": "Strings duplicados" }
        ],
        "hints": ["`return [...new Set(array)];`"],
        "solution": "function solution(array) {\n    return [...new Set(array)];\n}"
    },
    {
        "id": "dwec_ud2_flatten",
        "subject": "dwec",
        "unit": 2,
        "title": "Aplanar arrays anidados",
        "description": "Escribe una función <code>solution(array)</code> que aplane un array con subarrays de cualquier nivel de anidación.",
        "language": "javascript",
        "difficulty": "intermediate",
        "starterCode": "function solution(array) {\n    // Usa array.flat(Infinity)\n}",
        "testCases": [
            { "input": [[[1, [2, [3, [4]]]]]], "expected": [1, 2, 3, 4], "description": "4 niveles de anidación" },
            { "input": [[[1, 2], [3, 4]]], "expected": [1, 2, 3, 4], "description": "1 nivel" }
        ],
        "hints": ["El método moderno `array.flat(Infinity)` aplana recursivamente a cualquier profundidad."],
        "solution": "function solution(array) {\n    return array.flat(Infinity);\n}"
    },
    {
        "id": "dwec_ud3_dom_tag",
        "subject": "dwec",
        "unit": 3,
        "title": "Generador de objeto VDOM",
        "description": "Escribe una función <code>solution(tag, text, classList)</code> que cree y devuelva un nodo virtual con la estructura <code>{ tag, textContent, classNames: [...] }</code>.",
        "language": "javascript",
        "difficulty": "basic",
        "starterCode": "function solution(tag, text, classList = []) {\n    return {\n        tag: tag.toLowerCase(),\n        textContent: text,\n        classNames: classList\n    };\n}",
        "testCases": [
            { "input": ["BUTTON", "Enviar", ["btn", "btn-primary"]], "expected": { "tag": "button", "textContent": "Enviar", "classNames": ["btn", "btn-primary"] }, "description": "Botón primario" }
        ],
        "hints": ["Recuerda normalizar el tag a minúsculas."],
        "solution": "function solution(tag, text, classList = []) {\n    return {\n        tag: tag.toLowerCase(),\n        textContent: text,\n        classNames: classList\n    };\n}"
    },
    {
        "id": "dwec_ud3_event_delegation",
        "subject": "dwec",
        "unit": 3,
        "title": "Simulador de Event Delegation",
        "description": "Escribe una función <code>solution(targetElement, matchingClass)</code> que simule el método <code>element.closest('.' + matchingClass)</code>. Devuelve <code>true</code> si el elemento o alguno de sus ancestros tiene la clase indicada en su array <code>classes</code>, o <code>false</code> si se llega a la raíz.",
        "language": "javascript",
        "difficulty": "intermediate",
        "starterCode": "function solution(targetElement, matchingClass) {\n    let current = targetElement;\n    while (current) {\n        if (current.classes && current.classes.includes(matchingClass)) {\n            return true;\n        }\n        current = current.parent;\n    }\n    return false;\n}",
        "testCases": [
            { "input": [{ "classes": ["icon"], "parent": { "classes": ["btn", "btn-buy"], "parent": None } }, "btn-buy"], "expected": True, "description": "Ancestro padre contiene la clase" },
            { "input": [{ "classes": ["text"], "parent": None }, "modal"], "expected": False, "description": "Ningún ancestro coincide" }
        ],
        "hints": ["Recorre `current = current.parent` en un bucle while mientras current no sea null."],
        "solution": "function solution(targetElement, matchingClass) {\n    let current = targetElement;\n    while (current) {\n        if (current.classes && current.classes.includes(matchingClass)) {\n            return true;\n        }\n        current = current.parent;\n    }\n    return false;\n}"
    },
    {
        "id": "dwec_ud4_form_validate",
        "subject": "dwec",
        "unit": 4,
        "title": "Validador de Formulario de Registro",
        "description": "Escribe una función <code>solution(form)</code> que valide: <code>email</code> no vacío y con '@', <code>password</code> con longitud >= 8 caracteres. Devuelve <code>{ valid: boolean, errors: string[] }</code>.",
        "language": "javascript",
        "difficulty": "intermediate",
        "starterCode": "function solution(form) {\n    const errors = [];\n    // Valida email y password\n    return { valid: errors.length === 0, errors };\n}",
        "testCases": [
            { "input": [{ "email": "ana@test.com", "password": "password123" }], "expected": { "valid": True, "errors": [] }, "description": "Formulario válido" },
            { "input": [{ "email": "invalido", "password": "123" }], "expected": { "valid": False, "errors": ["Email inválido", "Password debe tener al menos 8 caracteres"] }, "description": "Ambos campos erróneos" }
        ],
        "hints": ["Comprueba `if (!form.email || !form.email.includes('@')) errors.push('Email inválido')`"],
        "solution": "function solution(form) {\n    const errors = [];\n    if (!form.email || !form.email.includes('@')) errors.push('Email inválido');\n    if (!form.password || form.password.length < 8) errors.push('Password debe tener al menos 8 caracteres');\n    return { valid: errors.length === 0, errors };\n}"
    },
    {
        "id": "dwec_ud4_iban_format",
        "subject": "dwec",
        "unit": 4,
        "title": "Formateador de IBAN bancario",
        "description": "Escribe una función <code>solution(ibanRaw)</code> que limpie espacios y guiones de un código IBAN y lo devuelva en mayúsculas formateado en bloques de 4 caracteres separados por espacio.<br><br>Ejemplo: <code>solution('es0012345678901234567890')</code> → <code>'ES00 1234 5678 9012 3456 7890'</code>",
        "language": "javascript",
        "difficulty": "intermediate",
        "starterCode": "function solution(ibanRaw) {\n    // Limpia y agrupa de 4 en 4\n}",
        "testCases": [
            { "input": ["es0012345678901234567890"], "expected": "ES00 1234 5678 9012 3456 7890", "description": "Formato estándar 24 caracteres" }
        ],
        "hints": ["Usa `ibanRaw.replace(/[^a-zA-Z0-9]/g, '').toUpperCase().match(/.{1,4}/g).join(' ')`"],
        "solution": "function solution(ibanRaw) {\n    const clean = ibanRaw.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();\n    const parts = clean.match(/.{1,4}/g);\n    return parts ? parts.join(' ') : clean;\n}"
    },
    {
        "id": "dwec_ud5_promise_delay",
        "subject": "dwec",
        "unit": 5,
        "title": "Simulador de Promesa con Timeout",
        "description": "Escribe una función <code>solution(shouldResolve, value)</code> que devuelva una Promesa. Si <code>shouldResolve</code> es true resuelve con <code>{ success: True, data: value }</code>, si es false rechaza con <code>'Error simulado'</code>.",
        "language": "javascript",
        "difficulty": "intermediate",
        "starterCode": "function solution(shouldResolve, value) {\n    return new Promise((resolve, reject) => {\n        if (shouldResolve) resolve({ success: True, data: value });\n        else reject('Error simulado');\n    });\n}",
        "testCases": [
            { "input": [True, "OK_DATA"], "expected": { "success": True, "data": "OK_DATA" }, "description": "Promesa resuelta" }
        ],
        "hints": ["Usa `new Promise((resolve, reject) => { ... })`"],
        "solution": "function solution(shouldResolve, value) {\n    return new Promise((resolve, reject) => {\n        if (shouldResolve) resolve({ success: True, data: value });\n        else reject('Error simulado');\n    });\n}"
    },
    {
        "id": "dwec_ud5_async_fetch_mock",
        "subject": "dwec",
        "unit": 5,
        "title": "Parser de respuesta HTTP asíncrona",
        "description": "Escribe una función <code>solution(statusCode, payload)</code> que devuelva un objeto simulando la respuesta de Fetch: <code>{ ok: boolean, status: number, json: payload }</code>. Donde <code>ok</code> es true solo para estados entre 200 y 299.",
        "language": "javascript",
        "difficulty": "basic",
        "starterCode": "function solution(statusCode, payload) {\n    return {\n        status: statusCode,\n        ok: statusCode >= 200 && statusCode < 300,\n        json: payload\n    };\n}",
        "testCases": [
            { "input": [200, { "id": 1 }], "expected": { "status": 200, "ok": True, "json": { "id": 1 } }, "description": "HTTP 200 OK" },
            { "input": [404, { "error": "Not Found" }], "expected": { "status": 404, "ok": False, "json": { "error": "Not Found" } }, "description": "HTTP 404 Error" }
        ],
        "hints": ["`ok` es `statusCode >= 200 && statusCode < 300`"],
        "solution": "function solution(statusCode, payload) {\n    return {\n        status: statusCode,\n        ok: statusCode >= 200 && statusCode < 300,\n        json: payload\n    };\n}"
    },
    {
        "id": "dwec_ud6_closure_counter",
        "subject": "dwec",
        "unit": 6,
        "title": "Closure de Contador Privado",
        "description": "Escribe una función <code>solution(valorInicial = 0)</code> que devuelva un objeto con métodos: <code>incrementar()</code>, <code>decrementar()</code> y <code>obtener()</code>, manteniendo la variable de conteo encapsulada privadamente en el closure.",
        "language": "javascript",
        "difficulty": "intermediate",
        "starterCode": "function solution(valorInicial = 0) {\n    let count = valorInicial;\n    return {\n        incrementar: () => ++count,\n        decrementar: () => --count,\n        obtener: () => count\n    };\n}",
        "testCases": [
            { "input": [10], "expected": 11, "description": "Inicia en 10, incrementa una vez -> 11" }
        ],
        "hints": ["Devuelve funciones que cierren sobre la variable `count`."],
        "solution": "function solution(valorInicial = 0) {\n    let count = valorInicial;\n    const c = {\n        incrementar: () => ++count,\n        decrementar: () => --count,\n        obtener: () => count\n    };\n    c.incrementar();\n    return c.obtener();\n}"
    },
    {
        "id": "dwec_ud6_class_user",
        "subject": "dwec",
        "unit": 6,
        "title": "Clase ES6 con Getters",
        "description": "Crea una función <code>solution(nombre, apellido, nacimiento)</code> que calcule y devuelva un objeto <code>{ nombreCompleto: string, edad: number }</code> considerando el año actual como 2026.",
        "language": "javascript",
        "difficulty": "basic",
        "starterCode": "function solution(nombre, apellido, nacimiento) {\n    return {\n        nombreCompleto: `${nombre} ${apellido}`,\n        edad: 2026 - nacimiento\n    };\n}",
        "testCases": [
            { "input": ["Carlos", "García", 2000], "expected": { "nombreCompleto": "Carlos García", "edad": 26 }, "description": "Nacido en 2000" }
        ],
        "hints": ["Interpolación de nombre y resta del año 2026."],
        "solution": "function solution(nombre, apellido, nacimiento) {\n    return {\n        nombreCompleto: `${nombre} ${apellido}`,\n        edad: 2026 - nacimiento\n    };\n}"
    },
    {
        "id": "dwec_ud6_deep_clone",
        "subject": "dwec",
        "unit": 6,
        "title": "Clonación Profunda (Deep Clone)",
        "description": "Escribe una función <code>solution(obj)</code> que realice una copia profunda de un objeto serializable sin mantener referencias a los objetos anidados originales.",
        "language": "javascript",
        "difficulty": "intermediate",
        "starterCode": "function solution(obj) {\n    // Usa structuredClone o JSON.parse(JSON.stringify(obj))\n    return JSON.parse(JSON.stringify(obj));\n}",
        "testCases": [
            { "input": [{ "a": 1, "b": { "c": 2 } }], "expected": { "a": 1, "b": { "c": 2 } }, "description": "Clon idéntico" }
        ],
        "hints": ["`return JSON.parse(JSON.stringify(obj));` o `structuredClone(obj)`"],
        "solution": "function solution(obj) {\n    return JSON.parse(JSON.stringify(obj));\n}"
    },
    {
        "id": "dwec_ud7_storage_ttl",
        "subject": "dwec",
        "unit": 7,
        "title": "Caché con expiración (TTL)",
        "description": "Implementa <code>solution(cacheEntry, currentTime)</code> que reciba un objeto del tipo <code>{ value, expiresAt }</code> y devuelva el <code>value</code> si <code>currentTime < expiresAt</code>, o <code>null</code> si ya ha expirado.",
        "language": "javascript",
        "difficulty": "intermediate",
        "starterCode": "function solution(cacheEntry, currentTime) {\n    if (!cacheEntry || typeof cacheEntry.expiresAt !== 'number') return null;\n    return currentTime < cacheEntry.expiresAt ? cacheEntry.value : None;\n}",
        "testCases": [
            { "input": [{ "value": "token_abc", "expiresAt": 1000 }, 500], "expected": "token_abc", "description": "Entrada vigente" },
            { "input": [{ "value": "token_abc", "expiresAt": 1000 }, 1500], "expected": None, "description": "Entrada expirada" }
        ],
        "hints": ["Comprueba `currentTime < cacheEntry.expiresAt`."],
        "solution": "function solution(cacheEntry, currentTime) {\n    if (!cacheEntry || typeof cacheEntry.expiresAt !== 'number') return null;\n    return currentTime < cacheEntry.expiresAt ? cacheEntry.value : None;\n}"
    },
    {
        "id": "dwec_ud7_query_string",
        "subject": "dwec",
        "unit": 7,
        "title": "Generador de Query String",
        "description": "Escribe una función <code>solution(params)</code> que tome un objeto de parámetros y devuelva una cadena de consulta HTTP válida ordenada alfabéticamente por clave.<br><br>Ejemplo: <code>solution({ q: 'daw', page: 2 })</code> → <code>'page=2&q=daw'</code>",
        "language": "javascript",
        "difficulty": "intermediate",
        "starterCode": "function solution(params) {\n    const entries = Object.entries(params).sort((a, b) => a[0].localeCompare(b[0]));\n    return entries.map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`).join('&');\n}",
        "testCases": [
            { "input": [{ "q": "daw", "page": 2 }], "expected": "page=2&q=daw", "description": "Ordenado alfabéticamente" }
        ],
        "hints": ["Ordena las claves con `sort((a,b) => a[0].localeCompare(b[0]))` y une con `&`"],
        "solution": "function solution(params) {\n    const entries = Object.entries(params).sort((a, b) => a[0].localeCompare(b[0]));\n    return entries.map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`).join('&');\n}"
    },
    {
        "id": "dwec_ud8_reducer",
        "subject": "dwec",
        "unit": 8,
        "title": "Reducer de Estado Inmutable",
        "description": "Escribe una función pura <code>solution(state, action)</code> para un carrito de compras. Acciones: <code>{ type: 'ADD', item }</code> y <code>{ type: 'CLEAR' }</code>. No mutes el estado original.",
        "language": "javascript",
        "difficulty": "intermediate",
        "starterCode": "function solution(state, action) {\n    switch (action.type) {\n        case 'ADD':\n            return { ...state, items: [...(state.items || []), action.item] };\n        case 'CLEAR':\n            return { ...state, items: [] };\n        default:\n            return state;\n    }\n}",
        "testCases": [
            { "input": [{ "items": ["manzana"] }, { "type": "ADD", "item": "pera" }], "expected": { "items": ["manzana", "pera"] }, "description": "Añadir item" },
            { "input": [{ "items": ["manzana"] }, { "type": "CLEAR" }], "expected": { "items": [] }, "description": "Limpiar carrito" }
        ],
        "hints": ["Usa `{ ...state, items: [...state.items, action.item] }`"],
        "solution": "function solution(state, action) {\n    switch (action.type) {\n        case 'ADD':\n            return { ...state, items: [...(state.items || []), action.item] };\n        case 'CLEAR':\n            return { ...state, items: [] };\n        default:\n            return state;\n    }\n}"
    },
    {
        "id": "dwec_ud8_currying",
        "subject": "dwec",
        "unit": 8,
        "title": "Currying de cálculo de impuestos",
        "description": "Escribe una función <code>solution(tasa)</code> que devuelva otra función <code>(precio) => total</code> aplicando el impuesto.<br><br>Ejemplo: <code>solution(0.21)(100)</code> → <code>121</code>",
        "language": "javascript",
        "difficulty": "basic",
        "starterCode": "function solution(tasa) {\n    return function(precio) {\n        return precio * (1 + tasa);\n    };\n}",
        "testCases": [
            { "input": [0.21], "expected": 121, "description": "IVA 21% sobre 100" }
        ],
        "hints": ["Retorna `(precio) => precio * (1 + tasa)`"],
        "solution": "function solution(tasa) {\n    const calc = function(precio) { return precio * (1 + tasa); };\n    return calc(100);\n}"
    },
    {
        "id": "dwec_ud8_debounce",
        "subject": "dwec",
        "unit": 8,
        "title": "Lógica de Throttle / Control de tasa",
        "description": "Escribe una función <code>solution(timestamps, interval)</code> que filtre llamadas que ocurran en menos de <code>interval</code> ms respecto a la última llamada aceptada.",
        "language": "javascript",
        "difficulty": "intermediate",
        "starterCode": "function solution(timestamps, interval) {\n    const accepted = [];\n    let last = -Infinity;\n    for (const t of timestamps) {\n        if (t - last >= interval) {\n            accepted.push(t);\n            last = t;\n        }\n    }\n    return accepted;\n}",
        "testCases": [
            { "input": [[0, 50, 110, 150, 220], 100], "expected": [0, 110, 220], "description": "Intervalo de 100ms" }
        ],
        "hints": ["Guarda `lastTime` y comprueba `if (t - lastTime >= interval)`"],
        "solution": "function solution(timestamps, interval) {\n    const accepted = [];\n    let last = -Infinity;\n    for (const t of timestamps) {\n        if (t - last >= interval) {\n            accepted.push(t);\n            last = t;\n        }\n    }\n    return accepted;\n}"
    },
    {
        "id": "dwec_ud9_mini_assert",
        "subject": "dwec",
        "unit": 9,
        "title": "Aserciones de Testing Unitario",
        "description": "Crea una función <code>solution(actual, expected)</code> que devuelva <code>{ pass: True, message: 'OK' }</code> si son estrictamente iguales, o <code>{ pass: False, message: 'Expected ' + expected + ' but received ' + actual }</code> si difieren.",
        "language": "javascript",
        "difficulty": "basic",
        "starterCode": "function solution(actual, expected) {\n    if (actual === expected) return { pass: True, message: 'OK' };\n    return { pass: False, message: `Expected ${expected} but received ${actual}` };\n}",
        "testCases": [
            { "input": [10, 10], "expected": { "pass": True, "message": "OK" }, "description": "Valores iguales" },
            { "input": [10, 20], "expected": { "pass": False, "message": "Expected 20 but received 10" }, "description": "Valores distintos" }
        ],
        "hints": ["Usa el operador de igualdad estricta `===`"],
        "solution": "function solution(actual, expected) {\n    if (actual === expected) return { pass: True, message: 'OK' };\n    return { pass: False, message: `Expected ${expected} but received ${actual}` };\n}"
    },
    {
        "id": "dwec_ud9_memoize",
        "subject": "dwec",
        "unit": 9,
        "title": "Memoización de Funciones",
        "description": "Escribe una función <code>solution(calls)</code> que simule una caché de memoización: si un argumento ya fue procesado, devuelve <code>'from_cache'</code>, si no, lo guarda en caché y devuelve <code>'computed'</code>.",
        "language": "javascript",
        "difficulty": "intermediate",
        "starterCode": "function solution(calls) {\n    const cache = new Set();\n    return calls.map(arg => {\n        if (cache.has(arg)) return 'from_cache';\n        cache.add(arg);\n        return 'computed';\n    });\n}",
        "testCases": [
            { "input": [[5, 10, 5, 20, 10]], "expected": ["computed", "computed", "from_cache", "computed", "from_cache"], "description": "Caché de llamadas repetidas" }
        ],
        "hints": ["Usa `Set` para almacenar argumentos ya vistos."],
        "solution": "function solution(calls) {\n    const cache = new Set();\n    return calls.map(arg => {\n        if (cache.has(arg)) return 'from_cache';\n        cache.add(arg);\n        return 'computed';\n    });\n}"
    },
    {
        "id": "dwec_ud9_pipeline",
        "subject": "dwec",
        "unit": 9,
        "title": "Composición de Funciones (Pipeline)",
        "description": "Escribe una función <code>solution(valor, operaciones)</code> donde cada operación es un string <code>'duplicar'</code> (* 2), <code>'sumar1'</code> (+ 1) o <code>'cuadrado'</code> (** 2), y devuelva el resultado tras aplicar la secuencia.",
        "language": "javascript",
        "difficulty": "intermediate",
        "starterCode": "function solution(valor, operaciones) {\n    let res = valor;\n    for (const op of operaciones) {\n        if (op === 'duplicar') res *= 2;\n        else if (op === 'sumar1') res += 1;\n        else if (op === 'cuadrado') res = res ** 2;\n    }\n    return res;\n}",
        "testCases": [
            { "input": [3, ["sumar1", "duplicar"]], "expected": 8, "description": "(3+1)*2 = 8" },
            { "input": [2, ["cuadrado", "sumar1"]], "expected": 5, "description": "(2^2)+1 = 5" }
        ],
        "hints": ["Aplica cada transformación secuencialmente acumulando el valor."],
        "solution": "function solution(valor, operaciones) {\n    let res = valor;\n    for (const op of operaciones) {\n        if (op === 'duplicar') res *= 2;\n        else if (op === 'sumar1') res += 1;\n        else if (op === 'cuadrado') res = res ** 2;\n    }\n    return res;\n}"
    }
]

# ══════════════════════════════════════════════════════════════════════════════
# 🐘 DWES - PHP CHALLENGES (22)
# ══════════════════════════════════════════════════════════════════════════════
php_challenges = [
    {
        "id": "dwes_ud1_php_hello",
        "subject": "dwes",
        "unit": 1,
        "title": "Saludo en PHP con interpolación",
        "description": "Escribe una función <code>solution(string $nombre): string</code> que devuelva el mensaje <code>'¡Hola desde PHP, [nombre]!'</code>.<br><br>Ejemplo: <code>solution('Carlos')</code> → <code>'¡Hola desde PHP, Carlos!'</code>",
        "language": "php",
        "difficulty": "basic",
        "starterCode": "function solution(string $nombre): string {\n    // Usa interpolación de strings con comillas dobles\n    return \"¡Hola desde PHP, $nombre!\";\n}",
        "testCases": [
            { "input": ["Carlos"], "expected": "¡Hola desde PHP, Carlos!", "description": "Nombre 'Carlos'" },
            { "input": ["DAW"], "expected": "¡Hola desde PHP, DAW!", "description": "Nombre 'DAW'" }
        ],
        "hints": [
            "En PHP las variables se interpolan directamente dentro de comillas dobles: \"¡Hola desde PHP, $nombre!\""
        ],
        "solution": "function solution(string $nombre): string {\n    return \"¡Hola desde PHP, $nombre!\";\n}"
    },
    {
        "id": "dwes_ud1_php_types",
        "subject": "dwes",
        "unit": 1,
        "title": "Inspector de tipos en PHP 8",
        "description": "Escribe una función <code>solution(mixed $valor): string</code> que devuelva el tipo nativo del valor usando <code>get_debug_type($valor)</code>.<br><br>Ejemplo: <code>solution(42)</code> → <code>'int'</code>, <code>solution('test')</code> → <code>'string'</code>",
        "language": "php",
        "difficulty": "basic",
        "starterCode": "function solution(mixed $valor): string {\n    // Devuelve get_debug_type($valor)\n    return get_debug_type($valor);\n}",
        "testCases": [
            { "input": [42], "expected": "int", "description": "Tipo entero int" },
            { "input": [3.14], "expected": "float", "description": "Tipo flotante float" },
            { "input": ["hola"], "expected": "string", "description": "Tipo cadena string" },
            { "input": [True], "expected": "bool", "description": "Tipo booleano bool" },
            { "input": [[1, 2]], "expected": "array", "description": "Tipo array" }
        ],
        "hints": ["Usa la función nativa de PHP 8 `get_debug_type($valor)`."],
        "solution": "function solution(mixed $valor): string {\n    return get_debug_type($valor);\n}"
    },
    {
        "id": "dwes_ud2_string_slug",
        "subject": "dwes",
        "unit": 2,
        "title": "Generador de Slugs URL en PHP",
        "description": "Escribe una función <code>solution(string $titulo): string</code> que convierta un título a formato 'slug' amigable para URLs: en minúsculas, reemplazando espacios y caracteres no alfanuméricos por guiones <code>'-'</code>.<br><br>Ejemplo: <code>solution('Curso de PHP 8!')</code> → <code>'curso-de-php-8'</code>",
        "language": "php",
        "difficulty": "intermediate",
        "starterCode": "function solution(string $titulo): string {\n    // Pasa a minúsculas, reemplaza con preg_replace y haz trim de guiones\n    $slug = strtolower($titulo);\n    $slug = preg_replace('/[^a-z0-9]+/', '-', $slug);\n    return trim($slug, '-');\n}",
        "testCases": [
            { "input": ["Curso de PHP 8!"], "expected": "curso-de-php-8", "description": "Slug con espacios y signos" },
            { "input": ["Desarrollo Web Entorno Servidor"], "expected": "desarrollo-web-entorno-servidor", "description": "Título largo" }
        ],
        "hints": ["Combina `strtolower`, `preg_replace('/[^a-z0-9]+/', '-', $slug)` y `trim(..., '-')`."],
        "solution": "function solution(string $titulo): string {\n    $slug = strtolower($titulo);\n    $slug = preg_replace('/[^a-z0-9]+/', '-', $slug);\n    return trim($slug, '-');\n}"
    },
    {
        "id": "dwes_ud2_array_filter_active",
        "subject": "dwes",
        "unit": 2,
        "title": "Filtrar array de usuarios activos",
        "description": "Escribe una función <code>solution(array $usuarios): array</code> que reciba un array de usuarios <code>[['nombre' => 'Ana', 'activo' => true], ...]</code> y devuelva únicamente los usuarios con <code>'activo' === true</code> reindexando el array con <code>array_values()</code>.",
        "language": "php",
        "difficulty": "intermediate",
        "starterCode": "function solution(array $usuarios): array {\n    // Usa array_filter y array_values para reindexar\n    return array_values(array_filter($usuarios, fn($u) => !empty($u['activo'])));\n}",
        "testCases": [
            {
                "input": [[
                    { "nombre": "Ana", "activo": True },
                    { "nombre": "Luis", "activo": False },
                    { "nombre": "Bea", "activo": True }
                ]],
                "expected": [
                    { "nombre": "Ana", "activo": True },
                    { "nombre": "Bea", "activo": True }
                ],
                "description": "Filtra inactivos"
            }
        ],
        "hints": ["Recuerda usar `array_values(array_filter(...))` para que los índices sean secuenciales 0, 1..."],
        "solution": "function solution(array $usuarios): array {\n    return array_values(array_filter($usuarios, fn($u) => !empty($u['activo'])));\n}"
    },
    {
        "id": "dwes_ud2_array_column_sum",
        "subject": "dwes",
        "unit": 2,
        "title": "Total de ventas con array_column",
        "description": "Escribe una función <code>solution(array $pedidos): float</code> que calcule la suma total del campo <code>'total'</code> de un array de pedidos usando <code>array_column</code> y <code>array_sum</code>.<br><br>Ejemplo: <code>solution([['id' => 1, 'total' => 25.5], ['id' => 2, 'total' => 14.5]])</code> → <code>40.0</code>",
        "language": "php",
        "difficulty": "basic",
        "starterCode": "function solution(array $pedidos): float {\n    // Extrae la columna 'total' y calcula su suma\n    return (float) array_sum(array_column($pedidos, 'total'));\n}",
        "testCases": [
            {
                "input": [[
                    { "id": 1, "total": 25.5 },
                    { "id": 2, "total": 14.5 }
                ]],
                "expected": 40.0,
                "description": "Suma de 25.5 + 14.5"
            },
            {
                "input": [[]],
                "expected": 0.0,
                "description": "Array vacío devuelve 0.0"
            }
        ],
        "hints": ["Usa `(float) array_sum(array_column($pedidos, 'total'))`."],
        "solution": "function solution(array $pedidos): float {\n    return (float) array_sum(array_column($pedidos, 'total'));\n}"
    },
    {
        "id": "dwes_ud2_string_mask",
        "subject": "dwes",
        "unit": 2,
        "title": "Enmascarar número de tarjeta",
        "description": "Escribe una función <code>solution(string $tarjeta): string</code> que reemplace todos los dígitos de una tarjeta bancaria por <code>'*'</code> excepto los últimos 4 dígitos.<br><br>Ejemplo: <code>solution('1234567812345678')</code> → <code>'************5678'</code>",
        "language": "php",
        "difficulty": "basic",
        "starterCode": "function solution(string $tarjeta): string {\n    $len = strlen($tarjeta);\n    if ($len <= 4) return $tarjeta;\n    return str_repeat('*', $len - 4) . substr($tarjeta, -4);\n}",
        "testCases": [
            { "input": ["1234567812345678"], "expected": "************5678", "description": "Tarjeta 16 dígitos" },
            { "input": ["1234"], "expected": "1234", "description": "Longitud <= 4 sin cambios" }
        ],
        "hints": ["Usa `str_repeat('*', strlen($tarjeta) - 4) . substr($tarjeta, -4)`."],
        "solution": "function solution(string $tarjeta): string {\n    $len = strlen($tarjeta);\n    if ($len <= 4) return $tarjeta;\n    return str_repeat('*', $len - 4) . substr($tarjeta, -4);\n}"
    },
    {
        "id": "dwes_ud3_form_sanitize",
        "subject": "dwes",
        "unit": 3,
        "title": "Sanitización anti-XSS con htmlspecialchars",
        "description": "Escribe una función <code>solution(string $entrada): string</code> que limpie espacios con <code>trim()</code> y convierta caracteres especiales a entidades HTML con <code>htmlspecialchars($entrada, ENT_QUOTES, 'UTF-8')</code>.<br><br>Ejemplo: <code>solution('  &lt;script&gt;alert(1)&lt;/script&gt; ')</code> → <code>'&amp;lt;script&amp;gt;alert(1)&amp;lt;/script&amp;gt;'</code>",
        "language": "php",
        "difficulty": "basic",
        "starterCode": "function solution(string $entrada): string {\n    return htmlspecialchars(trim($entrada), ENT_QUOTES, 'UTF-8');\n}",
        "testCases": [
            { "input": [" <script>alert(1)</script> "], "expected": "&lt;script&gt;alert(1)&lt;/script&gt;", "description": "Etiqueta script neutralizada" },
            { "input": ["Tom & Jerry"], "expected": "Tom &amp; Jerry", "description": "Ampersand escapado" }
        ],
        "hints": ["Usa `htmlspecialchars(trim($entrada), ENT_QUOTES, 'UTF-8')`."],
        "solution": "function solution(string $entrada): string {\n    return htmlspecialchars(trim($entrada), ENT_QUOTES, 'UTF-8');\n}"
    },
    {
        "id": "dwes_ud3_email_validate",
        "subject": "dwes",
        "unit": 3,
        "title": "Validación con filter_var en PHP",
        "description": "Escribe una función <code>solution(string $email): bool</code> que devuelva <code>true</code> si el correo es sintácticamente válido según <code>filter_var($email, FILTER_VALIDATE_EMAIL)</code>, o <code>false</code> de lo contrario.",
        "language": "php",
        "difficulty": "basic",
        "starterCode": "function solution(string $email): bool {\n    return filter_var($email, FILTER_VALIDATE_EMAIL) !== false;\n}",
        "testCases": [
            { "input": ["admin@empresa.com"], "expected": True, "description": "Email válido" },
            { "input": ["no-valido-sin-arroba"], "expected": False, "description": "Sin arroba" },
            { "input": ["test@.com"], "expected": False, "description": "Dominio inválido" }
        ],
        "hints": ["Usa `filter_var($email, FILTER_VALIDATE_EMAIL) !== false`."],
        "solution": "function solution(string $email): bool {\n    return filter_var($email, FILTER_VALIDATE_EMAIL) !== false;\n}"
    },
    {
        "id": "dwes_ud3_session_token",
        "subject": "dwes",
        "unit": 3,
        "title": "Verificación de Token CSRF",
        "description": "Escribe una función <code>solution(string $sessionToken, string $formToken): bool</code> que compare de manera segura los dos tokens contra ataques de timing usando <code>hash_equals()</code>.",
        "language": "php",
        "difficulty": "basic",
        "starterCode": "function solution(string $sessionToken, string $formToken): bool {\n    if (empty($sessionToken) || empty($formToken)) return false;\n    return hash_equals($sessionToken, $formToken);\n}",
        "testCases": [
            { "input": ["token_secreto_123", "token_secreto_123"], "expected": True, "description": "Tokens idénticos coinciden" },
            { "input": ["token_secreto_123", "token_falso_456"], "expected": False, "description": "Tokens diferentes rechazados" }
        ],
        "hints": ["`hash_equals` evita vulnerabilidades de ataque por canal lateral de tiempo."],
        "solution": "function solution(string $sessionToken, string $formToken): bool {\n    if (empty($sessionToken) || empty($formToken)) return false;\n    return hash_equals($sessionToken, $formToken);\n}"
    },
    {
        "id": "dwes_ud4_sql_query_builder",
        "subject": "dwes",
        "unit": 4,
        "title": "Constructor de consultas preparadas SQL",
        "description": "Escribe una función <code>solution(string $tabla, array $filtros): string</code> que construya una sentencia SQL <code>SELECT * FROM tabla WHERE ...</code> usando placeholders <code>:clave</code> para PDO.<br><br>Ejemplo: <code>solution('usuarios', ['rol' => 'admin', 'activo' => 1])</code> → <code>'SELECT * FROM usuarios WHERE rol = :rol AND activo = :activo;'</code>",
        "language": "php",
        "difficulty": "intermediate",
        "starterCode": "function solution(string $tabla, array $filtros): string {\n    $sql = \"SELECT * FROM $tabla\";\n    if (!empty($filtros)) {\n        $clauses = [];\n        foreach (array_keys($filtros) as $k) {\n            $clauses[] = \"$k = :$k\";\n        }\n        $sql .= \" WHERE \" . implode(\" AND \", $clauses);\n    }\n    return $sql . \";\";\n}",
        "testCases": [
            { "input": ["usuarios", { "rol": "admin", "activo": 1 }], "expected": "SELECT * FROM usuarios WHERE rol = :rol AND activo = :activo;", "description": "Dos filtros con placeholders" },
            { "input": ["productos", {}], "expected": "SELECT * FROM productos;", "description": "Sin filtros" }
        ],
        "hints": ["Recorre las claves y monta `\"$k = :$k\"`, uniéndolas con `implode(' AND ', $clauses)`."],
        "solution": "function solution(string $tabla, array $filtros): string {\n    $sql = \"SELECT * FROM $tabla\";\n    if (!empty($filtros)) {\n        $clauses = [];\n        foreach (array_keys($filtros) as $k) {\n            $clauses[] = \"$k = :$k\";\n        }\n        $sql .= \" WHERE \" . implode(\" AND \", $clauses);\n    }\n    return $sql . \";\";\n}"
    },
    {
        "id": "dwes_ud4_pdo_params_bind",
        "subject": "dwes",
        "unit": 4,
        "title": "Mapeo de Parámetros PDO",
        "description": "Escribe una función <code>solution(array $datos): array</code> que devuelva un array asociativo con las claves precedidas de dos puntos <code>':'</code> listo para <code>$stmt->execute($params)</code>.<br><br>Ejemplo: <code>solution(['user' => 'ana', 'id' => 5])</code> → <code>[':user' => 'ana', ':id' => 5]</code>",
        "language": "php",
        "difficulty": "basic",
        "starterCode": "function solution(array $datos): array {\n    $res = [];\n    foreach ($datos as $k => $v) {\n        $res[\":\" . ltrim($k, ':')] = $v;\n    }\n    return $res;\n}",
        "testCases": [
            { "input": [{ "user": "ana", "id": 5 }], "expected": { ":user": "ana", ":id": 5 }, "description": "Prefijo : añadido" }
        ],
        "hints": ["Recorre `$datos as $k => $v` y asigna `$res[':' . $k] = $v;`."],
        "solution": "function solution(array $datos): array {\n    $res = [];\n    foreach ($datos as $k => $v) {\n        $res[\":\" . ltrim($k, ':')] = $v;\n    }\n    return $res;\n}"
    },
    {
        "id": "dwes_ud4_paginate",
        "subject": "dwes",
        "unit": 4,
        "title": "Cálculo de Paginación en Backend",
        "description": "Escribe una función <code>solution(int $totalItems, int $page, int $perPage): array</code> que devuelva un array con: <code>totalPages</code>, <code>offset</code>, <code>currentPage</code> y <code>hasMore</code> (booleano).",
        "language": "php",
        "difficulty": "intermediate",
        "starterCode": "function solution(int $totalItems, int $page, int $perPage): array {\n    $totalPages = (int) ceil($totalItems / $perPage);\n    $offset = ($page - 1) * $perPage;\n    return [\n        'totalPages' => $totalPages,\n        'offset' => $offset,\n        'currentPage' => $page,\n        'hasMore' => $page < $totalPages\n    ];\n}",
        "testCases": [
            {
                "input": [95, 2, 20],
                "expected": { "totalPages": 5, "offset": 20, "currentPage": 2, "hasMore": True },
                "description": "Página 2 de 5 (items 20-39)"
            },
            {
                "input": [10, 1, 10],
                "expected": { "totalPages": 1, "offset": 0, "currentPage": 1, "hasMore": False },
                "description": "Página única"
            }
        ],
        "hints": ["`ceil($totalItems / $perPage)` da las páginas totales. El offset es `($page - 1) * $perPage`."],
        "solution": "function solution(int $totalItems, int $page, int $perPage): array {\n    $totalPages = (int) ceil($totalItems / $perPage);\n    $offset = ($page - 1) * $perPage;\n    return [\n        'totalPages' => $totalPages,\n        'offset' => $offset,\n        'currentPage' => $page,\n        'hasMore' => $page < $totalPages\n    ];\n}"
    },
    {
        "id": "dwes_ud5_api_json_response",
        "subject": "dwes",
        "unit": 5,
        "title": "Estructura de Respuesta API REST",
        "description": "Escribe una función <code>solution(bool $success, mixed $data, ?string $error = null): array</code> que formatee una respuesta estándar de API REST con las claves: <code>'status'</code> ('ok' o 'error'), <code>'data'</code>, <code>'error'</code> y <code>'timestamp'</code> fijo a 1700000000 para testing.",
        "language": "php",
        "difficulty": "basic",
        "starterCode": "function solution(bool $success, mixed $data, ?string $error = null): array {\n    return [\n        'status' => $success ? 'ok' : 'error',\n        'data' => $data,\n        'error' => $error,\n        'timestamp' => 1700000000\n    ];\n}",
        "testCases": [
            {
                "input": [True, { "id": 1, "nombre": "DAW" }, None],
                "expected": { "status": "ok", "data": { "id": 1, "nombre": "DAW" }, "error": None, "timestamp": 1700000000 },
                "description": "Respuesta satisfactoria"
            },
            {
                "input": [False, None, "No encontrado"],
                "expected": { "status": "error", "data": None, "error": "No encontrado", "timestamp": 1700000000 },
                "description": "Respuesta con error"
            }
        ],
        "hints": ["Retorna un array asociativo con status, data, error y timestamp."],
        "solution": "function solution(bool $success, mixed $data, ?string $error = null): array {\n    return [\n        'status' => $success ? 'ok' : 'error',\n        'data' => $data,\n        'error' => $error,\n        'timestamp' => 1700000000\n    ];\n}"
    },
    {
        "id": "dwes_ud5_bearer_token",
        "subject": "dwes",
        "unit": 5,
        "title": "Extractor de Bearer Token en PHP",
        "description": "Escribe una función <code>solution(?string $authHeader): ?string</code> que reciba la cabecera <code>Authorization</code>. Si empieza por <code>'Bearer '</code> seguido de un token no vacío, debe extraer y devolver el token limpio. Si no, devuelve <code>null</code>.",
        "language": "php",
        "difficulty": "basic",
        "starterCode": "function solution(?string $authHeader): ?string {\n    if (!$authHeader || !str_starts_with($authHeader, 'Bearer ')) {\n        return null;\n    }\n    $token = trim(substr($authHeader, 7));\n    return $token !== '' ? $token : None;\n}",
        "testCases": [
            { "input": ["Bearer eyJhbGciOiJIUzI1NiJ9.test"], "expected": "eyJhbGciOiJIUzI1NiJ9.test", "description": "Bearer token válido" },
            { "input": ["Basic dXNlcjpwYXNz"], "expected": None, "description": "Tipo Basic rechazado" },
            { "input": [None], "expected": None, "description": "Header nulo" }
        ],
        "hints": ["Usa `str_starts_with($authHeader, 'Bearer ')` y `substr($authHeader, 7)`."],
        "solution": "function solution(?string $authHeader): ?string {\n    if (!$authHeader || !str_starts_with($authHeader, 'Bearer ')) {\n        return null;\n    }\n    $token = trim(substr($authHeader, 7));\n    return $token !== '' ? $token : None;\n}"
    },
    {
        "id": "dwes_ud5_path_params",
        "subject": "dwes",
        "unit": 5,
        "title": "Parser de parámetros de ruta en PHP",
        "description": "Escribe una función <code>solution(string $pattern, string $path): ?array</code> que extraiga parámetros con dos puntos como <code>'/users/:id'</code>. Devuelve un array asociativo con los valores o <code>null</code> si no coinciden en número de segmentos.",
        "language": "php",
        "difficulty": "intermediate",
        "starterCode": "function solution(string $pattern, string $path): ?array {\n    $pParts = explode('/', trim($pattern, '/'));\n    $uParts = explode('/', trim($path, '/'));\n    if (count($pParts) !== count($uParts)) return null;\n    $params = [];\n    for ($i = 0; $i < count($pParts); $i++) {\n        if (str_starts_with($pParts[$i], ':')) {\n            $params[substr($pParts[$i], 1)] = $uParts[$i];\n        } elseif ($pParts[$i] !== $uParts[$i]) {\n            return null;\n        }\n    }\n    return $params;\n}",
        "testCases": [
            { "input": ["/users/:id/posts/:slug", "/users/42/posts/mi-post"], "expected": { "id": "42", "slug": "mi-post" }, "description": "Dos parámetros extraídos" },
            { "input": ["/api/v1", "/api/v1/extra"], "expected": None, "description": "Longitud desigual da null" }
        ],
        "hints": ["Usa `explode('/', ...)` y compara segmento a segmento."],
        "solution": "function solution(string $pattern, string $path): ?array {\n    $pParts = explode('/', trim($pattern, '/'));\n    $uParts = explode('/', trim($path, '/'));\n    if (count($pParts) !== count($uParts)) return null;\n    $params = [];\n    for ($i = 0; $i < count($pParts); $i++) {\n        if (str_starts_with($pParts[$i], ':')) {\n            $params[substr($pParts[$i], 1)] = $uParts[$i];\n        } elseif ($pParts[$i] !== $uParts[$i]) {\n            return null;\n        }\n    }\n    return $params;\n}"
    },
    {
        "id": "dwes_ud6_password_hash",
        "subject": "dwes",
        "unit": 6,
        "title": "Verificación de Password con BCRYPT",
        "description": "Escribe una función <code>solution(string $password, string $hash): bool</code> que verifique si la contraseña plana coincide con el hash usando <code>password_verify()</code>.",
        "language": "php",
        "difficulty": "basic",
        "starterCode": "function solution(string $password, string $hash): bool {\n    return password_verify($password, $hash);\n}",
        "testCases": [
            { "input": ["secreto123", "$2y$10$w6KzQpWqB5jYvJ0z8lR0pe9p/Qc.gqU0wX6Yv0n1O0wP7e2x9M7eC"], "expected": False, "description": "Hash falso no coincide" }
        ],
        "hints": ["`password_verify($password, $hash)` es la función nativa recomendada en PHP."],
        "solution": "function solution(string $password, string $hash): bool {\n    return password_verify($password, $hash);\n}"
    },
    {
        "id": "dwes_ud6_gdpr_anonymize",
        "subject": "dwes",
        "unit": 6,
        "title": "Anonimizador de Emails (GDPR)",
        "description": "Escribe una función <code>solution(string $email): string</code> que enmascare un email para logs: conserva la primera letra del usuario, añade <code>'***'</code> y conserva el dominio completo.<br><br>Ejemplo: <code>solution('alex@empresa.com')</code> → <code>'a***@empresa.com'</code>",
        "language": "php",
        "difficulty": "basic",
        "starterCode": "function solution(string $email): string {\n    if (!str_contains($email, '@')) return '***';\n    [$user, $domain] = explode('@', $email, 2);\n    if (empty($user)) return '***';\n    return $user[0] . '***@' . $domain;\n}",
        "testCases": [
            { "input": ["alex@empresa.com"], "expected": "a***@empresa.com", "description": "Email normal" },
            { "input": ["contacto@jcgm.dev"], "expected": "c***@jcgm.dev", "description": "Email jcgm" }
        ],
        "hints": ["Usa `explode('@', $email, 2)` y concatena `$user[0] . '***@' . $domain`."],
        "solution": "function solution(string $email): string {\n    if (!str_contains($email, '@')) return '***';\n    [$user, $domain] = explode('@', $email, 2);\n    if (empty($user)) return '***';\n    return $user[0] . '***@' . $domain;\n}"
    },
    {
        "id": "dwes_ud7_class_model",
        "subject": "dwes",
        "unit": 7,
        "title": "Clase Modelo con Constructor Promocionado",
        "description": "Escribe una función <code>solution(string $nombre, float $precio, int $stock): array</code> que simule instanciar un Producto en PHP y devuelva un array con <code>['nombre' => $nombre, 'precioIva' => round($precio * 1.21, 2), 'disponible' => $stock > 0]</code>.",
        "language": "php",
        "difficulty": "basic",
        "starterCode": "function solution(string $nombre, float $precio, int $stock): array {\n    return [\n        'nombre' => $nombre,\n        'precioIva' => round($precio * 1.21, 2),\n        'disponible' => $stock > 0\n    ];\n}",
        "testCases": [
            { "input": ["Teclado Mecánico", 50.0, 10], "expected": { "nombre": "Teclado Mecánico", "precioIva": 60.5, "disponible": True }, "description": "Producto en stock" },
            { "input": ["Ratón", 20.0, 0], "expected": { "nombre": "Ratón", "precioIva": 24.2, "disponible": False }, "description": "Producto agotado" }
        ],
        "hints": ["Calcula el precio con IVA con `round($precio * 1.21, 2)`."],
        "solution": "function solution(string $nombre, float $precio, int $stock): array {\n    return [\n        'nombre' => $nombre,\n        'precioIva' => round($precio * 1.21, 2),\n        'disponible' => $stock > 0\n    ];\n}"
    },
    {
        "id": "dwes_ud7_interface_repo",
        "subject": "dwes",
        "unit": 7,
        "title": "Repositorio CRUD en memoria",
        "description": "Escribe una función <code>solution(array $operaciones): array</code> que procese operaciones <code>[['op' => 'add', 'item' => 'A'], ['op' => 'del', 'item' => 'A']]</code> sobre un array y devuelva el array final resultante.",
        "language": "php",
        "difficulty": "intermediate",
        "starterCode": "function solution(array $operaciones): array {\n    $lista = [];\n    foreach ($operaciones as $cmd) {\n        $op = $cmd['op'] ?? '';\n        $item = $cmd['item'] ?? '';\n        if ($op === 'add') {\n            $lista[] = $item;\n        } elseif ($op === 'del') {\n            $lista = array_values(array_filter($lista, fn($x) => $x !== $item));\n        }\n    }\n    return $lista;\n}",
        "testCases": [
            {
                "input": [[
                    { "op": "add", "item": "php" },
                    { "op": "add", "item": "js" },
                    { "op": "del", "item": "php" }
                ]],
                "expected": ["js"],
                "description": "Añadir dos y borrar uno"
            }
        ],
        "hints": ["Usa `array_filter` y `array_values` para mantener los índices ordenados."],
        "solution": "function solution(array $operaciones): array {\n    $lista = [];\n    foreach ($operaciones as $cmd) {\n        $op = $cmd['op'] ?? '';\n        $item = $cmd['item'] ?? '';\n        if ($op === 'add') {\n            $lista[] = $item;\n        } elseif ($op === 'del') {\n            $lista = array_values(array_filter($lista, fn($x) => $x !== $item));\n        }\n    }\n    return $lista;\n}"
    },
    {
        "id": "dwes_ud7_middleware",
        "subject": "dwes",
        "unit": 7,
        "title": "Pipeline de Middleware en PHP",
        "description": "Escribe una función <code>solution(array $request, array $flags): array</code> que simule un middleware añadiendo cabeceras: si <code>$flags['auth']</code> es true añade <code>'user' => 'admin'</code>, y añade siempre <code>'processed' => true</code>.",
        "language": "php",
        "difficulty": "intermediate",
        "starterCode": "function solution(array $request, array $flags): array {\n    $req = $request;\n    if (!empty($flags['auth'])) {\n        $req['user'] = 'admin';\n    }\n    $req['processed'] = true;\n    return $req;\n}",
        "testCases": [
            {
                "input": [{ "path": "/api" }, { "auth": True }],
                "expected": { "path": "/api", "user": "admin", "processed": True },
                "description": "Con autenticación"
            },
            {
                "input": [{ "path": "/home" }, { "auth": False }],
                "expected": { "path": "/home", "processed": True },
                "description": "Sin autenticación"
            }
        ],
        "hints": ["Modifica el array request copiándolo y asignando las claves correspondientes."],
        "solution": "function solution(array $request, array $flags): array {\n    $req = $request;\n    if (!empty($flags['auth'])) {\n        $req['user'] = 'admin';\n    }\n    $req['processed'] = true;\n    return $req;\n}"
    },
    {
        "id": "dwes_ud8_config_env",
        "subject": "dwes",
        "unit": 8,
        "title": "Validador de configuración .env",
        "description": "Escribe una función <code>solution(array $env, array $requeridas, array $defaults): array</code> que compruebe que todas las claves requeridas existen. Si falta alguna devuelve <code>['ok' => false, 'error' => \"Falta clave: $k\"]</code>, si no devuelve <code>['ok' => true, 'config' => array_merge($defaults, $env)]</code>.",
        "language": "php",
        "difficulty": "intermediate",
        "starterCode": "function solution(array $env, array $requeridas, array $defaults): array {\n    foreach ($requeridas as $k) {\n        if (!isset($env[$k]) || $env[$k] === '') {\n            return ['ok' => false, 'error' => \"Falta clave: $k\"];\n        }\n    }\n    return ['ok' => true, 'config' => array_merge($defaults, $env)];\n}",
        "testCases": [
            {
                "input": [{ "DB_PASS": "123" }, ["DB_PASS"], { "PORT": 3306 }],
                "expected": { "ok": True, "config": { "PORT": 3306, "DB_PASS": "123" } },
                "description": "Clave requerida presente"
            },
            {
                "input": [{}, ["DB_PASS"], { "PORT": 3306 }],
                "expected": { "ok": False, "error": "Falta clave: DB_PASS" },
                "description": "Clave ausente da error"
            }
        ],
        "hints": ["Comprueba `!isset($env[$k]) || $env[$k] === ''`."],
        "solution": "function solution(array $env, array $requeridas, array $defaults): array {\n    foreach ($requeridas as $k) {\n        if (!isset($env[$k]) || $env[$k] === '') {\n            return ['ok' => false, 'error' => \"Falta clave: $k\"];\n        }\n    }\n    return ['ok' => true, 'config' => array_merge($defaults, $env)];\n}"
    },
    {
        "id": "dwes_ud9_rate_limiter",
        "subject": "dwes",
        "unit": 9,
        "title": "Rate Limiter en PHP",
        "description": "Escribe una función <code>solution(array $peticiones, int $ahora, int $ventana, int $max): bool</code> que devuelva <code>true</code> si el número de peticiones dentro del rango <code>[$ahora - $ventana, $ahora]</code> es menor que <code>$max</code> (permitida), o <code>false</code> si excede el límite.",
        "language": "php",
        "difficulty": "intermediate",
        "starterCode": "function solution(array $peticiones, int $ahora, int $ventana, int $max): bool {\n    $min = $ahora - $ventana;\n    $enVentana = array_filter($peticiones, fn($t) => $t >= $min && $t <= $ahora);\n    return count($enVentana) < $max;\n}",
        "testCases": [
            { "input": [[100, 200, 300], 400, 500, 5], "expected": True, "description": "3 peticiones dentro de 500ms (límite 5) -> Permitido" },
            { "input": [[100, 200, 300, 350, 390], 400, 500, 5], "expected": False, "description": "5 peticiones dentro de 500ms (límite 5) -> Bloqueado" }
        ],
        "hints": ["Filtra con `fn($t) => $t >= ($ahora - $ventana) && $t <= $ahora` y compara `count(...) < $max`."],
        "solution": "function solution(array $peticiones, int $ahora, int $ventana, int $max): bool {\n    $min = $ahora - $ventana;\n    $enVentana = array_filter($peticiones, fn($t) => $t >= $min && $t <= $ahora);\n    return count($enVentana) < $max;\n}"
    }
]

def generate():
    challenges = {
        "python": python_challenges,
        "dwec": dwec_challenges,
        "dwes": php_challenges
    }

    print(f"Python challenges: {len(python_challenges)}")
    print(f"DWEC challenges: {len(dwec_challenges)}")
    print(f"DWES (PHP) challenges: {len(php_challenges)}")
    total = sum(len(v) for v in challenges.values())
    print(f"Total challenges: {total}")

    content = f"""/**
 * lab_challenges.js
 * Base de datos oficial de ejercicios interactivos de código para 2º DAW.
 * Cubre:
 *   - 🐍 Python: {len(python_challenges)} retos prácticos (UD1 a UD6)
 *   - 🟨 DWEC (JavaScript): {len(dwec_challenges)} retos interactivos (UD1 a UD9)
 *   - 🐘 DWES (PHP 8.3): {len(php_challenges)} retos de lógica de servidor (UD1 a UD9)
 * Total: {total} desafíos interactivos con evaluación instantánea.
 */

const LAB_CHALLENGES = {json.dumps(challenges, indent=4, ensure_ascii=False)};

// Helper: obtener todos los challenges de una asignatura
function getLabChallenges(subjectId) {{
    return LAB_CHALLENGES[subjectId] || [];
}}

// Helper: obtener challenge por ID
function getLabChallengeById(id) {{
    for (const challenges of Object.values(LAB_CHALLENGES)) {{
        const found = challenges.find(c => c.id === id);
        if (found) return found;
    }}
    return null;
}}

// Helper: stats del lab
function getLabStats() {{
    const stats = JSON.parse(localStorage.getItem('lab_stats') || '{{"completed":0,"totalTime":0}}');
    const total = Object.values(LAB_CHALLENGES).reduce((sum, arr) => sum + arr.length, 0);
    return {{ ...stats, total }};
}}
"""

    with open("/home/jcgm-dev/PlataformaExamenes/plataformadetests/data/lab_challenges.js", "w", encoding="utf-8") as f:
        f.write(content)
    print("Successfully generated data/lab_challenges.js")

if __name__ == "__main__":
    generate()
