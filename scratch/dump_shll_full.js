const fs = require('fs');
const content = fs.readFileSync('pages/about.html', 'utf8');

const target = 'class="ShllEffect"';
const index = content.indexOf(target);
if (index !== -1) {
  const start = Math.max(0, index - 200);
  const end = Math.min(content.length, index + 1200);
  console.log(content.substring(start, end));
} else {
  console.log('Not found');
}
