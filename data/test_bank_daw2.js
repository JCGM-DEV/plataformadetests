/**
 * test_bank_daw2.js
 * TEST_BANK_DATA unificado para 2º DAW.
 * Fusiona todos los bancos de preguntas de cada asignatura
 * en el formato que espera el motor de app.js:
 *   QUESTION_POOL[subject_id] = [ ...preguntas ]
 *
 * Este fichero se carga DESPUÉS de los test_bank_*.js individuales.
 */
const TEST_BANK_DATA = (() => {
    // Helper: agrupar por subject_id inferido del concept_id
    // o por el array directamente si tiene subject explícito
    const bank = {};

    const all = [
        // [subject_id, array_variable]
        ['dwec',                        typeof TEST_BANK_DWEC       !== 'undefined' ? TEST_BANK_DWEC       : []],
        ['digitalizacion',              typeof TEST_BANK_DIG        !== 'undefined' ? TEST_BANK_DIG        : []],
        ['diseno_interfaces_web',       typeof TEST_BANK_DIW        !== 'undefined' ? TEST_BANK_DIW        : []],
        ['dwes',                        typeof TEST_BANK_DWES       !== 'undefined' ? TEST_BANK_DWES       : []],
        ['python',                      typeof TEST_BANK_PYTHON     !== 'undefined' ? TEST_BANK_PYTHON     : []],
        ['despliegue_aplicaciones_web', typeof TEST_BANK_DESPLIEGUE !== 'undefined' ? TEST_BANK_DESPLIEGUE : (typeof TEST_BANK_DAW !== 'undefined' ? TEST_BANK_DAW : [])],
        ['ingles',                      typeof TEST_BANK_INGLES     !== 'undefined' ? TEST_BANK_INGLES     : []],
        ['empleabilidad_2',             typeof TEST_BANK_IPE        !== 'undefined' ? TEST_BANK_IPE        : []],
        ['sostenibilidad',              typeof TEST_BANK_SOST       !== 'undefined' ? TEST_BANK_SOST       : []],
    ];

    all.forEach(([id, questions]) => {
        bank[id] = questions;
    });

    return bank;
})();
