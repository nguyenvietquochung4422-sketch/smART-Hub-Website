const fs = require('fs');

const html = fs.readFileSync('pages/about.html', 'utf8');

const start = 39402500;
const end = 39405000;
console.log('=== CURRENT FOOTER HTML IN ABOUT.HTML ===');
console.log(html.substring(start, end));
