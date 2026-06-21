const fs = require('fs');

const html = fs.readFileSync('pages/about.html', 'utf8');
const styleStart = html.indexOf('<style>');
const styleEnd = html.indexOf('</style>');
const css = html.substring(styleStart + 7, styleEnd);

const lines = css.split('\n');
console.log('=== CSS lines mentioning footer ===');
lines.forEach((line, idx) => {
    if (line.toLowerCase().includes('footer')) {
        console.log(`Line ${idx + 1}: ${line.trim()}`);
        // Let's print a few lines around it
        for (let i = Math.max(0, idx - 3); i < Math.min(lines.length, idx + 8); i++) {
            console.log(`  [${i + 1}] ${lines[i].trim()}`);
        }
        console.log('------------------------------------');
    }
});
