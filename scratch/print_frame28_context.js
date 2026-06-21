const fs = require('fs');
const html = fs.readFileSync('pages/about.html', 'utf8');

const lines = html.split('\n');
console.log('--- HTML LINES 845 TO 880 (TRUNCATED LINES) ---');
for (let i = 844; i < Math.min(lines.length, 880); i++) {
    const line = lines[i];
    console.log(`${i + 1}: ${line.length > 300 ? line.substring(0, 300) + '...' : line}`);
}
