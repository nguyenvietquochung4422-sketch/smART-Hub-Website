const fs = require('fs');
const content = fs.readFileSync('pages/about.html', 'utf8');

const targetTexts = [
  'New Co-Working Space',
  'New Café & Multipurpose Lobby',
  'Passive Interventions',
  'Local Adaptive Landscape Testbed'
];

targetTexts.forEach(text => {
  let pos = content.indexOf(text);
  console.log(`Text "${text}" found at position ${pos}`);
  if (pos !== -1) {
    console.log('Context:');
    console.log(content.substring(pos - 150, pos + 250));
  }
});
