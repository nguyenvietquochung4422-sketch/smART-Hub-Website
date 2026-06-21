const fs = require('fs');
const html = fs.readFileSync('pages/about.html', 'utf8');

console.log('--- GENERAL SEARCH FOR "index" (CASE-INSENSITIVE) ---');
const regex = /.{0,100}index.{0,100}/gi;
let match;
let count = 0;
while ((match = regex.exec(html)) !== null) {
    count++;
    console.log(`Match ${count}: ${match[0].trim().replace(/\s+/g, ' ')}`);
    if (count > 40) break;
}
