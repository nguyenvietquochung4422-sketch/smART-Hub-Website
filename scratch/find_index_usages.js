const fs = require('fs');
const html = fs.readFileSync('pages/about.html', 'utf8');

console.log('--- SEARCHING FOR index ATTRIBUTE OR CLASS USAGES ---');
const lines = html.split('\n');
lines.forEach((line, idx) => {
    if (line.includes('class="') || line.includes('id="') || line.includes('data-layer="')) {
        if (line.toLowerCase().includes('index')) {
            console.log(`Line ${idx + 1}: ${line.trim().substring(0, 300)}`);
        }
    }
});
