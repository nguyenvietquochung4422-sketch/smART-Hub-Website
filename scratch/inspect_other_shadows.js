const fs = require('fs');
const content = fs.readFileSync('pages/about.html', 'utf8');

const positions = [38434158, 38467250, 38467531, 38467778, 38468010, 38501363];
positions.forEach(pos => {
  console.log(`=== Position ${pos} ===`);
  console.log(content.substring(pos - 100, pos + 250).replace(/\n/g, ' '));
});
