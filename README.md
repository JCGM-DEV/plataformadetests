# 🎓 Plataforma de Exámenes y Repaso DAW 2026

[![Estado](https://img.shields.io/badge/Versión-3.0_Modular_Enterprise-blue?style=for-the-badge&logo=javascript)](https://JCGM-DEV.github.io/plataformadetests/)
[![Preguntas Técnicas](https://img.shields.io/badge/Banco-3.500%2B_Preguntas-cyan?style=for-the-badge)](https://JCGM-DEV.github.io/plataformadetests/)
[![Retos de Código](https://img.shields.io/badge/Taller_Código-66_Retos-emerald?style=for-the-badge)](https://JCGM-DEV.github.io/plataformadetests/)
[![Curso Objetivo](https://img.shields.io/badge/Examen-Mayo_2026-gold?style=for-the-badge)](https://JCGM-DEV.github.io/plataformadetests/)

Plataforma interactiva de alto rendimiento y grado producción diseñada para la preparación intensiva de las pruebas académicas de **1º y 2º de DAW** (Desarrollo de Aplicaciones Web).

---

## 🏛️ Arquitectura del Sistema

El proyecto ha sido refactorizado siguiendo una arquitectura modular en capas con separación clara de responsabilidades (SoC), eliminando la deuda técnica y desacoplando la lógica de negocio de la interfaz de usuario:

```text
plataformadetests/
├── .env.example                       # Especificación de variables de entorno
├── .gitignore                         # Reglas de exclusión optimizadas
├── README.md                          # Documentación del sistema
├── index.html                         # SPA Entrypoint (Dashboard)
├── iniciar_servidor.sh                # Script de arranque en un clic
│
├── config/                            # Capa de Configuración
│   ├── app.config.js                  # Constantes de negocio, fases y rotaciones
│   └── firebase.config.js             # Parámetros desacoplados de Firebase Auth/Sync
│
├── js/                                # Capa de Lógica y Controladores
│   ├── core/
│   │   └── state.js                   # Estado global centralizado (APP_STATE)
│   ├── services/
│   │   ├── notification.service.js    # Notificaciones Toast no bloqueantes
│   │   ├── storage.service.js         # Abstracción segura de Local/SessionStorage
│   │   ├── sync.js                    # Sincronización bidireccional con Firestore
│   │   └── auth.js                    # Ciclo de vida de autenticación
│   ├── modules/
│   │   ├── errors-notebook/           # Libreta de Errores y exportación Markdown
│   │   ├── planner/                   # Planificador semanal y rotaciones
│   │   ├── flashcards/                # Motor de repaso espaciado
│   │   ├── stats/                     # Analítica y curva de aprendizaje (Chart.js)
│   │   └── tutor/                     # Tutor inteligente y sesiones de estudio
│   ├── utils/
│   │   ├── helpers.js                 # Funciones puras (sanitización, shuffle, fechas)
│   │   └── pdf_utils.js               # Generación y exportación de exámenes a PDF
│   ├── assistant.js                   # Asistente virtual con despacho seguro de acciones
│   ├── lab_engine.js                  # Taller de código interactivo (JS / Python / PHP)
│   └── app.js                         # Orquestador principal y eventos DOM
│
├── css/                               # Capa de Estilos
│   ├── style.css                      # Estilos principales con diseño Glassmorphism
│   ├── auth.css                       # Formularios y modales de autenticación
│   └── lab.css                        # Estilos para CodeMirror y el Taller de Código
│
├── data/                              # Bancos de preguntas y temarios oficiales
│   ├── subjects.js                    # Definición oficial de asignaturas (1º y 2º DAW)
│   ├── test_bank_*.js                 # Bancos de preguntas específicos
│   ├── lab_challenges.js              # Colección de ejercicios y casos de prueba
│   └── syllabus/                      # Baterías y temarios en texto plano
│
├── docs/                              # Documentación técnica
│   ├── guia_de_estudio.md             # Metodología y recomendaciones de estudio
│   └── reports/                       # Informes de auditoría y validación QA
│
└── scripts/                           # Automatización y entorno de desarrollo
    ├── dev_server.py                  # Servidor local HTTP + runner nativo de PHP
    └── audit_banks.py                 # Script de auditoría de bancos de preguntas
```

---

## ⚡ Características Principales

1. **Selector Unificado de Curso (1º DAW vs 2º DAW):**
   - **1º DAW:** 7 asignaturas troncales (Sistemas, Bases de Datos, Programación Java, Lenguajes de Marcas, Entornos, Cloud Computing y Empleabilidad) con más de 1.014 preguntas.
   - **2º DAW (2026):** 9 asignaturas avanzadas (DWEC, DWES, Python, DIW, Despliegue, Inglés, etc.) con 2.352 preguntas y 66 retos de programación.

2. **Simulacro con Evaluación Oficial FP:**
   - Fórmula real de corrección: `Nota = ((Aciertos - Errores * 0.5) / Total) * 10`.
   - Generación de distractores contextuales coherentes para evitar patrones predecibles.
   - Modos disponibles: **Normal**, **Solo lo que no sé** (filtra preguntas dominadas), **Repetición Espaciada (SR)**, **Modo Real (120 preguntas)** y **Repaso de Fallos**.

3. **Taller de Código y Desafíos:**
   - Editor integrado con **CodeMirror** (soporte de syntax highlighting, numeración y brackets).
   - Ejecución en cliente de **JavaScript** y **Python 3** (mediante Pyodide WASM sin servidores intermedios).
   - Endpoint local para ejecución nativa en **PHP 8.3** a través de `scripts/dev_server.py`.
   - Evaluación instantánea frente a casos de prueba unitarios parametrizados.

4. **Libreta de Errores ("El Oro"):**
   - Registro automático y manual de fallos con explicación pedagógica del error.
   - Posibilidad de anotar reflexiones personales por pregunta fallada.
   - **Exportación en un clic a formato Markdown (`.md`)** para repaso rápido antes del examen.

5. **Sincronización en la Nube (Firebase Auth & Firestore):**
   - Persistencia local inmediata (*offline-first*) con sincronización transparente en la nube.
   - Acceso multiplataforma conservando el historial, la libreta de fallos y las estadísticas.

---

## 🚀 Puesta en Marcha en Local

### Requisitos Previos
* Navegador moderno compatible con ES6 y WebAssembly (Chrome, Firefox, Safari o Edge).
* (Opcional) Python 3.10+ para arrancar el servidor de desarrollo local.

### Opción 1: Servidor de Desarrollo Rápido (Recomendada)
Para aprovechar el soporte completo de los laboratorios interactivos (incluyendo la API de ejecución local):
```bash
# Iniciar el servidor local en el puerto 5500
python3 scripts/dev_server.py 5500
```
O bien mediante el script bash incluido:
```bash
chmod +x iniciar_servidor.sh
./iniciar_servidor.sh
```
Abre en tu navegador: [http://localhost:5500](http://localhost:5500)

### Opción 2: Servidor Estático Estándar
```bash
python3 -m http.server 8080
```
Abre en tu navegador: [http://localhost:8080](http://localhost:8080)

### Opción 3: Despliegue en GitHub Pages
El proyecto es 100% compatible con despliegue en páginas estáticas como GitHub Pages:
[https://JCGM-DEV.github.io/plataformadetests/](https://JCGM-DEV.github.io/plataformadetests/)

---

## 🛠️ Buenas Prácticas de Código y Mantenibilidad

* **Cero `eval()`:** Todas las llamadas dinámicas utilizan despachadores declarativos seguros (`COMMAND_DISPATCHER`).
* **Manejo Centralizado de Persistencia:** Acceso a `localStorage` normalizado mediante `StorageService` con control de cuota y parseo defensivo.
* **Notificaciones Toast:** Feedback visual accesible que elimina la necesidad de ventanas bloqueantes `alert()`.
* **Sanitización de Entradas:** Prevención de inyección XSS mediante utilidades puras `AppHelpers.esc()`.

---

## 📄 Licencia y Créditos
Desarrollado y mantenido por **[JCGM.DEV](https://JCGM.dev)**.  
Material orientado al temario oficial del ciclo formativo de grado superior en Desarrollo de Aplicaciones Web (DAW).
