#!/usr/bin/env python3
"""
expand_lab_challenges.py
Enriches data/lab_challenges.js with additional challenges for DWEC (UD7, UD8, UD9)
and DWES (UD3, UD4, UD5, UD6, UD7, UD8, UD9) so all units have practical coding exercises.
"""

new_dwec_challenges = """        {
            id: "dwec_ud7_storage_ttl",
            subject: "dwec",
            unit: 7,
            title: "Caché con expiración (TTL)",
            description: `Implementa una función <code>solution(cacheEntry, currentTime)</code> que reciba un objeto guardado en localStorage del tipo <code>{ value: any, expiresAt: number }</code> y el timestamp actual.<br><br>Debe devolver el <code>value</code> si <code>currentTime < expiresAt</code>, o <code>null</code> si ya ha expirado.`,
            language: "javascript",
            difficulty: "intermediate",
            starterCode: `function solution(cacheEntry, currentTime) {
    // Si currentTime < cacheEntry.expiresAt devuelve cacheEntry.value
    // Si no, devuelve null
    return null;
}`,
            testCases: [
                { input: [{ value: "token_123", expiresAt: 1000 }, 500], expected: "token_123", description: "Entrada aún vigente" },
                { input: [{ value: "token_123", expiresAt: 1000 }, 1500], expected: null, description: "Entrada ya expirada" },
                { input: [{ value: { user: "Ana" }, expiresAt: 2000 }, 2000], expected: null, description: "Tiempo exacto de expiración" },
            ],
            hints: [
                "Compara `if (currentTime < cacheEntry.expiresAt)`",
                "Devuelve `cacheEntry.value` si es válida, o `null` si no.",
            ],
            solution: `function solution(cacheEntry, currentTime) {
    if (!cacheEntry || typeof cacheEntry.expiresAt !== 'number') return null;
    return currentTime < cacheEntry.expiresAt ? cacheEntry.value : null;
}`
        },
        {
            id: "dwec_ud8_reducer",
            subject: "dwec",
            unit: 8,
            title: "Reducer de estado estilo Redux",
            description: `Escribe una función pura <code>solution(state, action)</code> para una app de carrito de compras.<br><br>
Acciones soportadas:<br>
• <code>{ type: "ADD", item: string }</code> → añade el item a la lista <code>items</code><br>
• <code>{ type: "CLEAR" }</code> → vacía la lista <code>items</code><br>
Cualquier otra acción devuelve el estado sin modificar. ¡No mutes el objeto original!`,
            language: "javascript",
            difficulty: "intermediate",
            starterCode: `function solution(state, action) {
    // Recuerda devolver un nuevo objeto sin mutar 'state'
    return state;
}`,
            testCases: [
                { input: [{ items: ["manzana"] }, { type: "ADD", item: "pera" }], expected: { items: ["manzana", "pera"] }, description: "Añadir elemento" },
                { input: [{ items: ["pan", "leche"] }, { type: "CLEAR" }], expected: { items: [] }, description: "Vaciar carrito" },
                { input: [{ items: ["café"] }, { type: "UNKNOWN" }], expected: { items: ["café"] }, description: "Acción desconocida" },
            ],
            hints: [
                "Usa un `switch (action.type)`",
                "Para ADD: `return { ...state, items: [...state.items, action.item] };`",
            ],
            solution: `function solution(state, action) {
    switch (action.type) {
        case "ADD":
            return { ...state, items: [...(state.items || []), action.item] };
        case "CLEAR":
            return { ...state, items: [] };
        default:
            return state;
    }
}`
        },
        {
            id: "dwec_ud9_mini_assert",
            subject: "dwec",
            unit: 9,
            title: "Micro-framework de aserciones de testing",
            description: `Crea una función <code>solution(actual, expected)</code> que simule una aserción básica de testing.<br><br>
Si <code>actual === expected</code>, devuelve <code>{ pass: true, message: "OK" }</code>.<br>
Si fallan, devuelve <code>{ pass: false, message: "Expected " + expected + " but received " + actual }</code>.`,
            language: "javascript",
            difficulty: "basic",
            starterCode: `function solution(actual, expected) {
    // Compara igualdad estricta
}`,
            testCases: [
                { input: [4, 4], expected: { pass: true, message: "OK" }, description: "Valores iguales pasan el test" },
                { input: ["hola", "adiós"], expected: { pass: false, message: "Expected adiós but received hola" }, description: "Valores diferentes fallan" },
                { input: [0, false], expected: { pass: false, message: "Expected false but received 0" }, description: "Igualdad estricta (0 !== false)" },
            ],
            hints: [
                "Usa el operador de igualdad estricta `===`",
            ],
            solution: `function solution(actual, expected) {
    if (actual === expected) {
        return { pass: true, message: "OK" };
    }
    return { pass: false, message: \`Expected \${expected} but received \${actual}\` };
}`
        },
"""

new_dwes_challenges = """        {
            id: "dwes_ud3_bearer_parser",
            subject: "dwes",
            unit: 3,
            title: "Extractor de Bearer Token",
            description: `Escribe una función <code>solution(authHeader)</code> que reciba la cabecera HTTP <code>Authorization</code>.<br><br>
Si comienza por <code>"Bearer "</code> seguido de un token no vacío, debe extraer y devolver el token limpio (string sin espacios).<br>
Si la cabecera es nula, no empieza por Bearer o el token está vacío, debe devolver <code>null</code>.`,
            language: "javascript",
            difficulty: "basic",
            starterCode: `function solution(authHeader) {
    // Extrae el token tras "Bearer "
    return null;
}`,
            testCases: [
                { input: ["Bearer eyJhbGciOiJIUzI1NiJ9.test"], expected: "eyJhbGciOiJIUzI1NiJ9.test", description: "Header válido con Bearer" },
                { input: ["Basic dXNlcjpwYXNz"], expected: null, description: "Header Basic no soportado" },
                { input: ["Bearer "], expected: null, description: "Bearer sin token" },
                { input: [null], expected: null, description: "Header nulo" },
            ],
            hints: [
                "Verifica que el string empiece por 'Bearer '",
                "Usa `authHeader.slice(7).trim()`",
            ],
            solution: `function solution(authHeader) {
    if (!authHeader || typeof authHeader !== 'string') return null;
    if (!authHeader.startsWith("Bearer ")) return null;
    const token = authHeader.slice(7).trim();
    return token.length > 0 ? token : null;
}`
        },
        {
            id: "dwes_ud4_sql_query_builder",
            subject: "dwes",
            unit: 4,
            title: "Constructor básico de consultas SQL",
            description: `Crea una función <code>solution(table, filters, limit)</code> que genere una consulta SQL <code>SELECT * FROM</code> parametrizada.<br><br>
Ejemplo:<br>
<code>table = "usuarios"</code>, <code>filters = { activo: 1, rol: "admin" }</code>, <code>limit = 10</code><br>
Devuelve: <code>"SELECT * FROM usuarios WHERE activo = '1' AND rol = 'admin' LIMIT 10;"</code>.<br>
Si <code>filters</code> está vacío, omite la cláusula WHERE. Si <code>limit</code> es 0 o null, omite el LIMIT.`,
            language: "javascript",
            difficulty: "intermediate",
            starterCode: `function solution(table, filters, limit) {
    // Construye la sentencia SQL
}`,
            testCases: [
                {
                    input: ["usuarios", { rol: "admin", activo: 1 }, 10],
                    expected: "SELECT * FROM usuarios WHERE rol = 'admin' AND activo = '1' LIMIT 10;",
                    description: "Con filtros y límite"
                },
                {
                    input: ["articulos", {}, 5],
                    expected: "SELECT * FROM articulos LIMIT 5;",
                    description: "Sin filtros, solo límite"
                },
                {
                    input: ["logs", { nivel: "error" }, null],
                    expected: "SELECT * FROM logs WHERE nivel = 'error';",
                    description: "Filtro sin límite"
                },
            ],
            hints: [
                "Usa `Object.entries(filters)` para crear las condiciones clave = 'valor'",
                "Une las condiciones con ` AND `",
            ],
            solution: `function solution(table, filters, limit) {
    let sql = \`SELECT * FROM \${table}\`;
    const entries = Object.entries(filters || {});
    if (entries.length > 0) {
        const whereClause = entries.map(([k, v]) => \`\${k} = '\${v}'\`).join(' AND ');
        sql += \` WHERE \${whereClause}\`;
    }
    if (limit && limit > 0) {
        sql += \` LIMIT \${limit}\`;
    }
    return sql + ';';
}`
        },
        {
            id: "dwes_ud5_path_params",
            subject: "dwes",
            unit: 5,
            title: "Parser de parámetros de ruta REST",
            description: `Implementa la función <code>solution(pattern, path)</code> que simule el enrutador de Express extrayendo parámetros de ruta.<br><br>
Ejemplo:<br>
<code>pattern = "/users/:id/posts/:slug"</code><br>
<code>path = "/users/42/posts/mi-primer-post"</code><br>
Resultado esperado: <code>{ id: "42", slug: "mi-primer-post" }</code>.<br>
Si las rutas no tienen el mismo número de segmentos, devuelve <code>null</code>.`,
            language: "javascript",
            difficulty: "intermediate",
            starterCode: `function solution(pattern, path) {
    // Divide por '/' y mapea los segmentos con ':'
}`,
            testCases: [
                {
                    input: ["/users/:id", "/users/10"],
                    expected: { id: "10" },
                    description: "Un parámetro simple"
                },
                {
                    input: ["/cursos/:curso/temas/:tema", "/cursos/daw/temas/dwec"],
                    expected: { curso: "daw", tema: "dwec" },
                    description: "Múltiples parámetros"
                },
                {
                    input: ["/api/:v", "/api/v1/extra"],
                    expected: null,
                    description: "Longitudes diferentes dan null"
                },
            ],
            hints: [
                "Usa `pattern.split('/')` y `path.split('/')`",
                "Si un segmento del patrón empieza con ':', guarda el nombre sin ':'",
            ],
            solution: `function solution(pattern, path) {
    const patParts = pattern.split('/');
    const pathParts = path.split('/');
    if (patParts.length !== pathParts.length) return null;
    const params = {};
    for (let i = 0; i < patParts.length; i++) {
        if (patParts[i].startsWith(':')) {
            const key = patParts[i].slice(1);
            params[key] = pathParts[i];
        } else if (patParts[i] !== pathParts[i]) {
            return null;
        }
    }
    return params;
}`
        },
        {
            id: "dwes_ud6_mask_pii",
            subject: "dwes",
            unit: 6,
            title: "Anonimizador de emails (Seguridad/GDPR)",
            description: `En seguridad backend nunca se loguean emails en texto plano. Escribe una función <code>solution(email)</code> que enmascare un email.<br><br>
Regla: conserva la primera letra del usuario, reemplaza el resto del nombre de usuario por <code>"***"</code>, y conserva el dominio completo.<br>
Ejemplo: <code>solution("contacto@jcgm.dev")</code> → <code>"c***@jcgm.dev"</code>.<br>
Si el formato no contiene '@', devuelve <code>"***"</code>.`,
            language: "javascript",
            difficulty: "basic",
            starterCode: `function solution(email) {
    // Oculta los datos personales del email
}`,
            testCases: [
                { input: ["contacto@jcgm.dev"], expected: "c***@jcgm.dev", description: "Email normal enmascarado" },
                { input: ["alex@empresa.com"], expected: "a***@empresa.com", description: "Email alex" },
                { input: ["invalid-email"], expected: "***", description: "Formato no válido" },
            ],
            hints: [
                "Usa `email.split('@')` para separar usuario y dominio",
            ],
            solution: `function solution(email) {
    if (!email || !email.includes('@')) return '***';
    const [user, domain] = email.split('@');
    if (!user || !domain) return '***';
    return user[0] + '***@' + domain;
}`
        },
        {
            id: "dwes_ud7_rate_limiter",
            subject: "dwes",
            unit: 7,
            title: "Controlador de tasa (Rate Limiter)",
            description: `Implementa una función <code>solution(requestsTimestamps, now, windowMs, maxRequests)</code> que determine si una IP ha excedido el límite de peticiones.<br><br>
• <code>requestsTimestamps</code>: array de números con los timestamps de peticiones anteriores<br>
• <code>now</code>: timestamp actual<br>
• <code>windowMs</code>: tamaño de la ventana temporal en ms<br>
• <code>maxRequests</code>: máximo de peticiones permitidas en la ventana<br>
Devuelve <code>true</code> si la petición está PERMITIDA (menos de <code>maxRequests</code> dentro de la ventana <code>[now - windowMs, now]</code>), o <code>false</code> si debe bloquearse (HTTP 429).`,
            language: "javascript",
            difficulty: "intermediate",
            starterCode: `function solution(requestsTimestamps, now, windowMs, maxRequests) {
    // Cuenta cuántas peticiones caen en el rango [now - windowMs, now]
}`,
            testCases: [
                { input: [[100, 200, 300], 400, 500, 5], expected: true, description: "3 peticiones dentro de 500ms (límite 5) → Permitida" },
                { input: [[100, 200, 300, 350, 390], 400, 500, 5], expected: false, description: "5 peticiones dentro de 500ms (límite 5) → Bloqueada" },
                { input: [[50, 60, 70], 1000, 500, 2], expected: true, description: "Peticiones antiguas ya fuera de la ventana → Permitida" },
            ],
            hints: [
                "Filtra `requestsTimestamps.filter(t => t >= (now - windowMs) && t <= now)`",
                "Si la longitud es menor que maxRequests devuelve true, de lo contrario false",
            ],
            solution: `function solution(requestsTimestamps, now, windowMs, maxRequests) {
    const minTime = now - windowMs;
    const inWindow = requestsTimestamps.filter(t => t >= minTime && t <= now);
    return inWindow.length < maxRequests;
}`
        },
        {
            id: "dwes_ud8_config_loader",
            subject: "dwes",
            unit: 8,
            title: "Cargador seguro de variables de entorno",
            description: `Implementa <code>solution(envObject, requiredKeys, defaults)</code>.<br><br>
• Verifica que todas las <code>requiredKeys</code> existan y no estén vacías en <code>envObject</code>. Si falta alguna, devuelve <code>{ ok: false, error: "Missing key: " + key }</code>.<br>
• Si todo está bien, devuelve <code>{ ok: true, config: { ...defaults, ...envObject } }</code> con los valores combinados.`,
            language: "javascript",
            difficulty: "intermediate",
            starterCode: `function solution(envObject, requiredKeys, defaults) {
    // Valida y combina la configuración
}`,
            testCases: [
                {
                    input: [{ DB_HOST: "localhost", DB_PASS: "secret" }, ["DB_HOST", "DB_PASS"], { PORT: 3000 }],
                    expected: { ok: true, config: { PORT: 3000, DB_HOST: "localhost", DB_PASS: "secret" } },
                    description: "Todas las claves requeridas presentes"
                },
                {
                    input: [{ DB_HOST: "localhost" }, ["DB_HOST", "DB_PASS"], { PORT: 3000 }],
                    expected: { ok: false, error: "Missing key: DB_PASS" },
                    description: "Falta DB_PASS requerido"
                },
            ],
            hints: [
                "Itera sobre `requiredKeys` y comprueba `if (!envObject[key])`",
            ],
            solution: `function solution(envObject, requiredKeys, defaults) {
    for (const k of requiredKeys) {
        if (!envObject || envObject[k] === undefined || envObject[k] === null || envObject[k] === '') {
            return { ok: false, error: \`Missing key: \${k}\` };
        }
    }
    return { ok: true, config: { ...defaults, ...envObject } };
}`
        },
        {
            id: "dwes_ud9_in_memory_repo",
            subject: "dwes",
            unit: 9,
            title: "Repositorio CRUD en memoria para tests",
            description: `Crea una función <code>solution(operations)</code> que ejecute una lista de operaciones sobre un array de usuarios en memoria (inicialmente vacío <code>[]</code>) y devuelva el array final.<br><br>
Operaciones:<br>
• <code>{ op: "create", user: { id: 1, name: "Ana" } }</code><br>
• <code>{ op: "delete", id: 1 }</code><br>
• <code>{ op: "update", id: 1, patch: { name: "Ana G." } }</code>`,
            language: "javascript",
            difficulty: "intermediate",
            starterCode: `function solution(operations) {
    let users = [];
    // Aplica las operaciones en orden
    return users;
}`,
            testCases: [
                {
                    input: [[
                        { op: "create", user: { id: 1, name: "Ana" } },
                        { op: "create", user: { id: 2, name: "Bob" } },
                        { op: "delete", id: 1 }
                    ]],
                    expected: [{ id: 2, name: "Bob" }],
                    description: "Crear 2 y borrar 1"
                },
                {
                    input: [[
                        { op: "create", user: { id: 1, name: "Carlos" } },
                        { op: "update", id: 1, patch: { role: "admin" } }
                    ]],
                    expected: [{ id: 1, name: "Carlos", role: "admin" }],
                    description: "Crear y actualizar con patch"
                },
            ],
            hints: [
                "Para update: busca con `findIndex` y aplica `{ ...users[idx], ...op.patch }`",
            ],
            solution: `function solution(operations) {
    let users = [];
    for (const op of operations) {
        if (op.op === "create") {
            users.push({ ...op.user });
        } else if (op.op === "delete") {
            users = users.filter(u => u.id !== op.id);
        } else if (op.op === "update") {
            const idx = users.findIndex(u => u.id === op.id);
            if (idx !== -1) {
                users[idx] = { ...users[idx], ...op.patch };
            }
        }
    }
    return users;
}`
        },
"""

def update_file():
    path = "/home/jcgm-dev/PlataformaExamenes/plataformadetests/data/lab_challenges.js"
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()

    # Insert new_dwec_challenges before dwes: [
    # Look for "dwes: ["
    if "dwec_ud7_storage_ttl" not in content:
        content = content.replace("dwes: [", new_dwec_challenges + "\n    dwes: [")

    # Insert new_dwes_challenges before the closing of dwes array
    # Look for the last challenge in dwes: id: "dwes_ud2_middleware"
    if "dwes_ud3_bearer_parser" not in content:
        # find closing of dwes array
        idx = content.find("    ]\n};")
        if idx != -1:
            content = content[:idx] + new_dwes_challenges + content[idx:]

    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print("Successfully enriched data/lab_challenges.js")

if __name__ == "__main__":
    update_file()
