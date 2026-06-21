const fs = require('fs');

const html = fs.readFileSync('pages/package-1/index.html', 'utf8');

const styleStart = html.indexOf('<style>');
const styleEnd = html.indexOf('</style>');
const css = html.substring(styleStart + 7, styleEnd);

console.log('=== CSS Variables in Package 1 ===');
const lines = css.split('\n');
lines.forEach((line, idx) => {
    if (line.includes('--') || line.includes(':root')) {
        console.log(`Line ${idx + 1}: ${line.trim()}`);
    }
});
