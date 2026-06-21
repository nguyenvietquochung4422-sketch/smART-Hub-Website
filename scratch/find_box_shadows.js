const fs = require('fs');
const content = fs.readFileSync('pages/about.html', 'utf8');

const regex = /box-shadow:[^;"]+/g;
let match;
while ((match = regex.exec(content)) !== null) {
  console.log(`Found box-shadow at ${match.index}: "${match[0]}"`);
  // print surrounding 100 characters
  console.log(content.substring(match.index - 50, match.index + 150).replace(/\n/g, ' '));
}
