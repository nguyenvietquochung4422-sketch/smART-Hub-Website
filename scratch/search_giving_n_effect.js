const fs = require('fs');
const html = fs.readFileSync('pages/about.html', 'utf8');

console.log('--- SEARCHING FOR giving-n-effect ---');
const regex = /<[^>]*class="[^"]*giving-n-effect[^"]*"[^>]*>/gi;
let match;
while ((match = regex.exec(html)) !== null) {
    console.log('Found:', match[0]);
    const idx = html.indexOf(match[0]);
    console.log(html.substring(idx - 100, idx + 800));
}
