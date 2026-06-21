const fs = require('fs');
const content = fs.readFileSync('pages/about.html', 'utf8');

const regex = /<div[^>]*class="[^"]*shll-band-interactive[^"]*"[^>]*>/g;
let match;
const styles = new Set();
while ((match = regex.exec(content)) !== null) {
  const element = match[0];
  const styleMatch = element.match(/style="([^"]*)"/);
  if (styleMatch) {
    styles.add(styleMatch[1]);
  } else {
    styles.add('no style attribute');
  }
}

console.log('Found', styles.size, 'unique styles on shll-band-interactive elements:');
styles.forEach(style => console.log('-', style));
