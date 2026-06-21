const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');

console.log('--- FIRST 2000 CHARS OF INDEX.HTML ---');
console.log(html.substring(0, 2000));

console.log('\n--- LAST 2000 CHARS OF INDEX.HTML ---');
console.log(html.substring(html.length - 2000));
