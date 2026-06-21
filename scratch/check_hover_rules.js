const fs = require('fs');
const html = fs.readFileSync('pages/about.html', 'utf8');

console.log('--- HOVER RULES IN CSS ---');
const regex = /[^{}]*:[^{}]*hover[^{}]*\{[^}]*\}/gi;
let match;
while ((match = regex.exec(html)) !== null) {
    console.log('Found hover rule:', match[0].trim().replace(/\s+/g, ' '));
}

console.log('--- SHLL-BAND IN CSS ---');
const bandRegex = /[^{}]*shll-band[^{}]*\{[^}]*\}/gi;
while ((match = bandRegex.exec(html)) !== null) {
    console.log('Found band rule:', match[0].trim().replace(/\s+/g, ' '));
}
