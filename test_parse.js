const fs = require('fs');
// Load app.js code
const code = fs.readFileSync('js/app.js', 'utf8');
const parseTxtExamBody = code.substring(code.indexOf('function parseTxtExam('), code.indexOf('function startLab'));
eval(parseTxtExamBody);

const text = fs.readFileSync('data/syllabus/cc_bateria_practica.txt', 'utf8');
try {
    const q = parseTxtExam(text, 'test');
    console.log('Success!', q.length);
} catch (e) {
    console.log('Error thrown:', e);
}
