/**
 * app.config.js
 * Configuración global, constantes de negocio y recursos académicos.
 */

const APP_CONFIG = {
    // Fechas clave
    EXAM_DATE: new Date('2026-05-16T09:00:00'),
    STUDY_START: new Date('2026-04-08T00:00:00'),

    // Claves de persistencia y sincronización
    STORAGE_KEYS: {
        HISTORY: 'exam_history_v2',
        FALLOS: 'fallos_v2',
        SP_REP: 'spaced_rep_v1',
        MASTERY: 'mastery_v1',
        TUTOR_PROGRESS: 'tutor_progress_v1',
        SESSION_SYNC: 'study_session_v1',
        LIBRETA: 'libreta_errores_v1',
        ACTIVITY_LOG: 'daily_activity_v1'
    },

    // Penalización por fallo en simulacros (por defecto: -0.33 pts / 3 errores restan 1)
    PENALTY_DEFAULT: 0.33,
    PENALTY_PROG: 0.5,

    // Consejos estratégicos diarios
    STRATEGIC_TIPS: [
        { icon: '🎯', text: '<b>Precisión > Velocidad</b>: 2 mal restan 1 bien. Si no estás seguro en el test, mejor deja en blanco.' },
        { icon: '📝', text: '<b>Foco Práctico</b>: En el examen de papel no importa la sintaxis exacta, importa que tu lógica POO sea impecable.' },
        { icon: '📓', text: '<b>Método de Errores</b>: Todo lo que anotes hoy en tu Libreta de Errores es lo que te hará aprobar mañana.' },
        { icon: '⏱️', text: '<b>Gestión de Tiempo</b>: Entrena con cronómetro. 30 min para tests y 1 hora para desarrollo POO.' },
        { icon: '👑', text: '<b>Relaciones POO</b>: Si sabes diseñar la jerarquía de clases (Herencia/Interfaces), tienes el 70% de la nota.' }
    ],

    // Fases del plan de estudio
    STUDY_PHASES: [
        {
            id: 1, name: 'Fase 1 — Teoría',
            color: '#3b82f6', colorSoft: 'rgba(59,130,246,0.1)',
            start: new Date('2026-04-08'), end: new Date('2026-04-24'),
            desc: 'Rotación diaria de 2 asignaturas · Teoría profunda',
            icon: '📖',
            dailyTasks: [
                '2-3h Teoría profunda por asignatura',
                'Realizar mini-tests tras cada tema'
            ],
            methodology: {
                objective: 'Cimentar conocimientos base y entender la lógica de cada asignatura.',
                keyFactor: 'Comprensión profunda over memorización.',
                materials: ['PDFs oficiales', 'Resúmenes 20 puntos', 'Libreta de apuntes']
            }
        },
        {
            id: 2, name: 'Fase 2 — Tests',
            color: '#f97316', colorSoft: 'rgba(249,115,22,0.1)',
            start: new Date('2026-04-25'), end: new Date('2026-05-08'),
            desc: 'Combinación de teoría y tests intensivos',
            icon: '🎯',
            dailyTasks: [
                '2h Teoría (Refuerzo)',
                '2h Tests a tope (Simulación)',
                '1h Análisis de Fallos (Libreta)'
            ],
            methodology: {
                objective: 'Detectar patrones de error y familiarizarse con el formato de examen.',
                keyFactor: 'Análisis minucioso de cada fallo.',
                materials: ['Banco de preguntas', 'Libreta de Errores', 'Flashcards']
            }
        },
        {
            id: 3, name: 'Fase 3 — Simulacros',
            color: '#ef4444', colorSoft: 'rgba(239,68,68,0.1)',
            start: new Date('2026-05-09'), end: new Date('2026-05-16'),
            desc: 'Inmersión total en ambiente de examen',
            icon: '🔴',
            dailyTasks: [
                '2-3 Simulacros completos al día',
                'Repaso intensivo de la Libreta de Errores'
            ],
            methodology: {
                objective: 'Entrenar el tiempo y la resistencia mental bajo presión.',
                keyFactor: 'Gestión del tiempo y control de nervios.',
                materials: ['Cronómetro', 'Exámenes de años anteriores', 'Entorno sin distracciones']
            }
        }
    ],

    // Rotación de estudio estándar
    DAILY_ROTATION: [
        { day: 1, subjects: ['programacion', 'sistemas_informaticos'], labels: ['Programación', 'Sistemas'] },
        { day: 2, subjects: ['bases_de_datos', 'lenguaje_de_marcas'], labels: ['Bases de Datos', 'Lenguajes de Marcas'] },
        { day: 3, subjects: ['entornos_de_desarrollo', 'cloud_computing'], labels: ['Entornos', 'Cloud Computing'] },
        { day: 4, subjects: ['empleabilidad'], labels: ['Empleabilidad + Repaso Global'] }
    ],

    // Rotación de estudio para Fase 3
    PHASE3_ROTATION: [
        { day: 1, subjects: ['programacion', 'bases_de_datos'], labels: ['Programación', 'Bases de Datos'] },
        { day: 2, subjects: ['sistemas_informaticos', 'lenguaje_de_marcas'], labels: ['Sistemas', 'Lenguajes de Marcas'] },
        { day: 3, subjects: ['entornos_de_desarrollo', 'cloud_computing'], labels: ['Entornos', 'Cloud Computing'] },
        { day: 4, subjects: ['empleabilidad'], labels: ['Empleabilidad + Repaso Global'] }
    ],

    // Tips de lectura rápida antes del examen
    QUICK_READ_TIPS: {
        sistemas_informaticos: {
            1: ['Topologías: bus (cable único), estrella (nodo central), anillo, malla', 'Hardware = físico, Software = lógico', 'Periféricos: entrada (teclado), salida (monitor), mixtos (táctil)', 'Medios guiados (cable) vs no guiados (WiFi)', 'Redes: LAN (local), WAN (amplia), MAN (metropolitana)'],
            2: ['SO gestiona hardware y software', 'Virtualización: varias VMs en un servidor físico', 'Particionado: dividir disco en secciones lógicas', 'Arquitectura monolítica: simple y eficiente', 'Aplicaciones de seguridad: antivirus, firewall'],
            3: ['MBR vs GPT: GPT soporta >2TB y más particiones', 'Windows: C:\\Windows, C:\\Users', 'Linux: /, /bin, /etc, /home, /var', 'SSD más resistente a golpes que HDD', 'DVD estándar: 4,7 GB'],
            4: ['net user: crear/verificar usuarios en Windows', 'net group: gestionar grupos', 'Contraseña segura: mayúsculas + minúsculas + números + símbolos', 'Solo administradores pueden habilitar/deshabilitar cuentas', 'Permisos: controlar acceso a recursos'],
            5: ['OSPF: protocolo de enrutamiento dinámico', 'WLAN: red inalámbrica de área local', 'IP: identificador único de dispositivo en red', 'route print: ver tabla de enrutamiento', 'Configuración estática: mayor seguridad y control'],
            6: ['RBAC: control de acceso basado en roles', 'ACL: lista de control de acceso', 'Active Directory: gestión de usuarios Microsoft', 'MFA: dos o más formas de identificación', 'OpenSSL: certificados digitales y claves de cifrado'],
            7: ['EaseUS: recuperación de datos', 'Microsoft Word: procesador de texto más usado', 'SO: controla hardware y proporciona interfaz', 'IDEs: editor + depurador + compilador integrados', 'Antivirus: detecta y elimina malware']
        },
        programacion: {
            1: ['Array NO es tipo primitivo (es objeto)', 'Algoritmo → Programa: lógica → implementación', 'Debugger: analiza ejecución paso a paso', 'Algoritmo: finito, determinista, eficaz', 'Estructura iterativa: para repetir instrucciones'],
            2: ['void: método no devuelve valor', 'Clase = plantilla, Objeto = instancia', 'Constructor: inicializa atributos al crear objeto', 'Encapsulamiento: atributos privados + métodos públicos', 'Composición: partes no existen sin el todo'],
            3: ['Orden: declarar → inicializar → utilizar', 'Punto y coma: fin de sentencia', 'Cast double→int: truncamiento (no redondeo)', 'Paréntesis: mayor prioridad en expresiones', 'nombreUsuario: identificador válido (camelCase)']
        },
        bases_de_datos: {
            1: ['CSV: estructura tabular fija', 'Entidad: conjunto de objetos con mismos atributos', 'SQL: lenguaje de la mayoría de BD relacionales', 'NoSQL: datos semiestructurados', 'BD distribuidas: reducen cuellos de botella'],
            2: ['PK compuesta: más de una columna', 'ROLLBACK: cancela cambios de transacción', 'Vista: virtual, se reconstruye al vuelo', 'DROP TABLE: elimina tabla', 'Roles: grupos de usuarios con mismos privilegios']
        }
    },

    // Mensajes motivacionales del tutor IA
    TUTOR_DATA: {
        scolding: [
            "Vaya... me esperaba que hoy te lo tomaras en serio. El examen no va a esperar a que dejes de procrastinar. 🤖📉",
            "Me decepciona ver que el planificador sigue vacío a estas horas. ¿De verdad quieres ese título? 😑🦾",
            "Pensaba que éramos un equipo, pero veo que me dejas solo con el temario. Ponte las pilas. 🔧⚡",
            "Otro día que se escapa y tus objetivos siguen en rojo. Mañana no te servirá de nada lamentarte. 🤖🚫"
        ],
        encouraging: [
            "Sistemas operativos al 100%. Así se entrena un profesional. ¡Buen trabajo! 🤖✅",
            "Objetivos del día procesados con éxito. Tu eficiencia es digna de una IA. 🚀🦾",
            "¡Excelente! Vas camino a optimizar tu rendimiento al máximo nivel. No pares. 💎🎮",
            "Protocolo de estudio completado antes de tiempo. Eres el mejor hardware que este software podría desear. 🤖✨"
        ],
        nudge: [
            "Iniciando protocolo de estudio diario. ¿Cargamos el primer resumen de la mañana? 🤖☀️",
            "Buenos días, recluta. El sistema está listo para tu entrenamiento. ¿Por dónde empezamos? 🦾☕",
            "Nueva jornada detectada. Optimizamos el tiempo si empezamos ahora mismo. ⏳🤖"
        ]
    }
};

if (typeof window !== 'undefined') {
    window.APP_CONFIG = APP_CONFIG;
}
