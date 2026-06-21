const fs = require('fs');
const content = fs.readFileSync('pages/about.html', 'utf8');

console.log('File length:', content.length);

const keywords = [
  'CUSTOM REFACTOR STYLES',
  'background_about.jpg',
  '<style>',
  '<style',
  '</style>',
  'Model',
  'HiUNgShll',
  'shll-band-interactive',
  'ShllEffect',
  'giving-n-effect',
  'rect-box-index1',
  'box-shadow'
];

keywords.forEach(keyword => {
  let count = 0;
  let pos = content.indexOf(keyword);
  while (pos !== -1) {
    count++;
    pos = content.indexOf(keyword, pos + 1);
  }
  console.log(`Keyword "${keyword}": found ${count} times.`);
});
