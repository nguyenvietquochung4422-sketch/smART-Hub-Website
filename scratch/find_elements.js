const fs = require('fs');
const content = fs.readFileSync('pages/about.html', 'utf8');

const regex = /<div[^>]*class="[^"]*shll-band-interactive[^"]*"[^>]*>/g;
let match;
let count = 0;
while ((match = regex.exec(content)) !== null) {
  count++;
  console.log(`Match ${count} at index ${match.index}:`);
  // Print 100 characters before and 150 characters after
  const start = Math.max(0, match.index - 80);
  const end = Math.min(content.length, match.index + match[0].length + 80);
  console.log(content.substring(start, end).replace(/\n/g, ' '));
}
