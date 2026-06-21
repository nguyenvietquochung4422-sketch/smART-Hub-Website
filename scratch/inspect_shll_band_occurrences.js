const fs = require('fs');

const lines = fs.readFileSync('pages/about.html', 'utf8').split('\n');
console.log('=== LINES 280 to 350 IN ABOUT.HTML ===');
for (let i = 279; i < Math.min(lines.length, 350); i++) {
    console.log(`${i+1}: ${lines[i]}`);
}
