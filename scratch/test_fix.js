
function parseTxtExamMock(text) {
    const rawLines = text
        .replace(/\r\n/g, '\n')
        .split('\n')
        .map(l => l.trim())
        .filter(l => l !== '');

    const block = rawLines; // Assume one block for testing
    const options = [];
    let correctIndex = 0;

    for (let j = 1; j < block.length; j++) {
        const l = block[j];
        if (l.startsWith('EXPL:')) break;
        
        const isCorrect = l.startsWith('*');
        const stripped = (isCorrect ? l.slice(1) : l)
            .trim()
            .replace(/^[A-Ea-e][).\-]\s*/, '')  // Remove "A) ", "B. ", "C- " etc.
            .trim()
            .replace(/\.$/, '')                 // NEW: Remove trailing period
            .trim();
        
        if (isCorrect) correctIndex = options.length;
        options.push(stripped);
    }
    return { options, correctIndex };
}

const testCases = [
    {
        name: "Case with period in correct answer",
        text: `Question?
        Solo falla el nodo más alejado
        La red sigue funcionando con menor velocidad
        *Toda la red deja de funcionar.
        Solo fallan los nodos pares`
    },
    {
        name: "Case with period in all answers",
        text: `Question?
        Option A.
        Option B.
        *Option C.`
    },
    {
        name: "Case with no periods",
        text: `Question?
        Option A
        Option B
        *Option C`
    }
];

testCases.forEach(tc => {
    console.log(`--- ${tc.name} ---`);
    const result = parseTxtExamMock(tc.text);
    console.log("Options:", result.options);
    console.log("Correct Index:", result.correctIndex);
    console.log("Correct Option:", result.options[result.correctIndex]);
});
