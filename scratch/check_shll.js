const fs = require('fs');
const content = fs.readFileSync('pages/about.html', 'utf8');

// Find all ShllEffect elements
const regex = /<div[^>]*class="[^"]*ShllEffect[^"]*"[^>]*>/g;
let match;
while ((match = regex.exec(content)) !== null) {
  console.log('Match found at index:', match.index);
  const start = match.index;
  // find next few divs or characters to print context
  console.log(content.substring(start, start + 350));
}
