const fs = require('fs');
const content = fs.readFileSync('pages/about.html', 'utf8');

const regex = /.{0,100}(working|caf|passive).{0,150}/gi;
let match;
let count = 0;
while ((match = regex.exec(content)) !== null) {
  count++;
  console.log(`Match ${count}: ${match[0].trim().replace(/\n/g, ' ')}`);
  if (count > 20) break;
}
