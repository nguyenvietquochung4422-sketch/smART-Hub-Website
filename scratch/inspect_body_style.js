const fs = require('fs');
const content = fs.readFileSync('pages/about.html', 'utf8');

const target = 'html,body';
const index = content.indexOf(target);
if (index !== -1) {
  console.log(content.substring(index, index + 250));
} else {
  console.log('Not found');
}
