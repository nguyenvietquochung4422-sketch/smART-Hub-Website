const fs = require('fs');
const content = fs.readFileSync('pages/about.html', 'utf8');

const regex = /<div[^>]*class="[^"]*shll-band-interactive[^"]*"[^>]*>([\s\S]*?)<\/div>\s*<\/div>/g;
let match;
let count = 0;
while ((match = regex.exec(content)) !== null) {
  count++;
  console.log(`=== BAND ${count} ===`);
  console.log(match[0]);
}
