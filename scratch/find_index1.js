const fs = require('fs');
const html = fs.readFileSync('pages/about.html', 'utf8');

console.log('--- SEARCHING FOR index1 (CASE-INSENSITIVE) IN HTML ---');
const lines = html.split('\n');
lines.forEach((line, idx) => {
    if (line.toLowerCase().includes('index1')) {
        console.log(`Line ${idx + 1}: ${line.trim().substring(0, 300)}`);
    }
});
