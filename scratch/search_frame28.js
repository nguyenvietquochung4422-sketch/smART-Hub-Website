const fs = require('fs');
const html = fs.readFileSync('pages/about.html', 'utf8');

console.log('--- SEARCHING FOR Frame28 STYLE RULES ---');
const regex = /\.Frame28[^{]*\{[^}]*\}/gi;
let match;
while ((match = regex.exec(html)) !== null) {
    console.log('Found CSS definition:', match[0]);
}
