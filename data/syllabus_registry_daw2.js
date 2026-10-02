/**
 * syllabus_registry_daw2.js
 * Registro de temas/unidades del syllabus para 2º DAW.
 * Se añade al SYLLABUS_REGISTRY_DATA existente.
 */
const SYLLABUS_REGISTRY_DAW2 = [

  // ── DWEC ─────────────────────────────────────────────────────────
  { id:"dwec_u1", name:"UD1: Arquitectura y lenguajes cliente", subject_id:"dwec", icon:"💻", unit:1 },
  { id:"dwec_u2", name:"UD2: Sintaxis del lenguaje JS",         subject_id:"dwec", icon:"💻", unit:2 },
  { id:"dwec_u3", name:"UD3: Objetos predefinidos",             subject_id:"dwec", icon:"💻", unit:3 },
  { id:"dwec_u4", name:"UD4: Funciones y programación funcional", subject_id:"dwec", icon:"💻", unit:4 },
  { id:"dwec_u5", name:"UD5: Eventos y formularios",            subject_id:"dwec", icon:"💻", unit:5 },
  { id:"dwec_u6", name:"UD6: DOM y manipulación",               subject_id:"dwec", icon:"💻", unit:6 },
  { id:"dwec_u7", name:"UD7: AJAX y comunicación asíncrona",    subject_id:"dwec", icon:"💻", unit:7 },
  { id:"dwec_u8", name:"UD8: Almacenamiento cliente",           subject_id:"dwec", icon:"💻", unit:8 },
  { id:"dwec_u9", name:"UD9: Multimedia y Geolocalización",     subject_id:"dwec", icon:"💻", unit:9 },

  // ── DWES ─────────────────────────────────────────────────────────
  { id:"dwes_u1", name:"UD1: Arquitectura web y HTTP",          subject_id:"dwes", icon:"🗄️", unit:1 },
  { id:"dwes_u2", name:"UD2: PHP: Fundamentos",                 subject_id:"dwes", icon:"🗄️", unit:2 },
  { id:"dwes_u3", name:"UD3: Funciones y arrays en PHP",        subject_id:"dwes", icon:"🗄️", unit:3 },
  { id:"dwes_u4", name:"UD4: Acceso a BD con PDO",              subject_id:"dwes", icon:"🗄️", unit:4 },
  { id:"dwes_u5", name:"UD5: Sesiones y autenticación",         subject_id:"dwes", icon:"🗄️", unit:5 },
  { id:"dwes_u6", name:"UD6: Frameworks MVC",                   subject_id:"dwes", icon:"🗄️", unit:6 },
  { id:"dwes_u7", name:"UD7: Servicios web y APIs REST",        subject_id:"dwes", icon:"🗄️", unit:7 },
  { id:"dwes_u8", name:"UD8: Seguridad en aplicaciones web",    subject_id:"dwes", icon:"🗄️", unit:8 },
  { id:"dwes_u9", name:"UD9: Despliegue y entornos",            subject_id:"dwes", icon:"🗄️", unit:9 },

  // ── PYTHON ───────────────────────────────────────────────────────
  { id:"python_u1", name:"UD1: Elementos de un programa",        subject_id:"python", icon:"🐍", unit:1 },
  { id:"python_u2", name:"UD2: Estructuras de control",          subject_id:"python", icon:"🐍", unit:2 },
  { id:"python_u3", name:"UD3: Funciones",                       subject_id:"python", icon:"🐍", unit:3 },
  { id:"python_u4", name:"UD4: Estructuras de datos",            subject_id:"python", icon:"🐍", unit:4 },
  { id:"python_u5", name:"UD5: Ficheros y E/S",                  subject_id:"python", icon:"🐍", unit:5 },
  { id:"python_u6", name:"UD6: Programación Orientada a Objetos",subject_id:"python", icon:"🐍", unit:6 },

  // ── DESPLIEGUE ───────────────────────────────────────────────────
  { id:"daw_u1", name:"UD1: Servidores web",                    subject_id:"despliegue_aplicaciones_web", icon:"🚀", unit:1 },
  { id:"daw_u2", name:"UD2: DNS y dominios",                    subject_id:"despliegue_aplicaciones_web", icon:"🚀", unit:2 },
  { id:"daw_u3", name:"UD3: Contenedores y Docker",             subject_id:"despliegue_aplicaciones_web", icon:"🚀", unit:3 },
  { id:"daw_u4", name:"UD4: CI/CD y automatización",            subject_id:"despliegue_aplicaciones_web", icon:"🚀", unit:4 },
  { id:"daw_u5", name:"UD5: Certificados SSL/TLS",              subject_id:"despliegue_aplicaciones_web", icon:"🚀", unit:5 },
  { id:"daw_u6", name:"UD6: Cloud y plataformas de hosting",    subject_id:"despliegue_aplicaciones_web", icon:"🚀", unit:6 },

  // ── DIGITALIZACIÓN ───────────────────────────────────────────────
  { id:"dig_u1", name:"UD1: Introducción a la digitalización",  subject_id:"digitalizacion", icon:"📈", unit:1 },
  { id:"dig_u2", name:"UD2: Cloud Computing y SaaS",            subject_id:"digitalizacion", icon:"📈", unit:2 },
  { id:"dig_u3", name:"UD3: Ciberseguridad y privacidad",       subject_id:"digitalizacion", icon:"📈", unit:3 },
  { id:"dig_u4", name:"UD4: Design Thinking e Innovación",      subject_id:"digitalizacion", icon:"📈", unit:4 },
  { id:"dig_u5", name:"UD5: Sostenibilidad y modelos digitales",subject_id:"digitalizacion", icon:"📈", unit:5 },

  // ── DISEÑO INTERFACES WEB ────────────────────────────────────────
  { id:"diw_u1", name:"UD1: Planificación de interfaces",       subject_id:"diseno_interfaces_web", icon:"🎨", unit:1 },
  { id:"diw_u2", name:"UD2: CSS avanzado y Grid",               subject_id:"diseno_interfaces_web", icon:"🎨", unit:2 },
  { id:"diw_u3", name:"UD3: Usabilidad y accesibilidad",        subject_id:"diseno_interfaces_web", icon:"🎨", unit:3 },
  { id:"diw_u4", name:"UD4: Animaciones y multimedia",          subject_id:"diseno_interfaces_web", icon:"🎨", unit:4 },
  { id:"diw_u5", name:"UD5: Frameworks y sistemas de diseño",   subject_id:"diseno_interfaces_web", icon:"🎨", unit:5 },
  { id:"diw_u6", name:"UD6: Prototipado y testing",             subject_id:"diseno_interfaces_web", icon:"🎨", unit:6 },

  // ── INGLÉS ───────────────────────────────────────────────────────
  { id:"ing_u1", name:"UD1: Comunicación escrita profesional",  subject_id:"ingles", icon:"🇬🇧", unit:1 },
  { id:"ing_u2", name:"UD2: Vocabulario técnico IT",            subject_id:"ingles", icon:"🇬🇧", unit:2 },
  { id:"ing_u3", name:"UD3: Comunicación oral y presentaciones",subject_id:"ingles", icon:"🇬🇧", unit:3 },
  { id:"ing_u4", name:"UD4: Lectura técnica y documentación",   subject_id:"ingles", icon:"🇬🇧", unit:4 },

  // ── IPE II ───────────────────────────────────────────────────────
  { id:"ipe_u1", name:"UD1: Proyecto emprendedor",              subject_id:"empleabilidad_2", icon:"💼", unit:1 },
  { id:"ipe_u2", name:"UD2: Búsqueda de empleo en IT",          subject_id:"empleabilidad_2", icon:"💼", unit:2 },
  { id:"ipe_u3", name:"UD3: Entrevista de trabajo",             subject_id:"empleabilidad_2", icon:"💼", unit:3 },
  { id:"ipe_u4", name:"UD4: Contratos y relaciones laborales",  subject_id:"empleabilidad_2", icon:"💼", unit:4 },
  { id:"ipe_u5", name:"UD5: Proyecto de emprendimiento",        subject_id:"empleabilidad_2", icon:"💼", unit:5 },

  // ── SOSTENIBILIDAD ───────────────────────────────────────────────
  { id:"sost_u1", name:"UD1: Sostenibilidad y desarrollo sostenible", subject_id:"sostenibilidad", icon:"🌱", unit:1 },
  { id:"sost_u2", name:"UD2: Economía circular",                subject_id:"sostenibilidad", icon:"🌱", unit:2 },
  { id:"sost_u3", name:"UD3: Energías renovables",              subject_id:"sostenibilidad", icon:"🌱", unit:3 },
  { id:"sost_u4", name:"UD4: RSC y sostenibilidad empresarial", subject_id:"sostenibilidad", icon:"🌱", unit:4 },
  { id:"sost_u5", name:"UD5: Sostenibilidad digital",           subject_id:"sostenibilidad", icon:"🌱", unit:5 },
  { id:"sost_u6", name:"UD6: Empleo verde y profesiones",       subject_id:"sostenibilidad", icon:"🌱", unit:6 },
];
