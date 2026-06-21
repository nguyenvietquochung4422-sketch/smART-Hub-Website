const fs = require('fs');
const html = fs.readFileSync('pages/about.html', 'utf8');

console.log('--- SCRIPT TAGS IN about.html ---');
const scriptMatches = html.match(/<script[^>]*>/gi);
console.log('Script tags:', scriptMatches);
