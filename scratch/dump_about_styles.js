const fs = require('fs');
const content = fs.readFileSync('pages/about.html', 'utf8');

const startKeyword = '/* ── CUSTOM REFACTOR STYLES ── */';
const startIndex = content.indexOf(startKeyword);
if (startIndex !== -1) {
  const endIndex = content.indexOf('</style>', startIndex);
  if (endIndex !== -1) {
    const fullStyleBlock = content.substring(startIndex, endIndex + 8);
    const lines = fullStyleBlock.split('\n');
    console.log('Total lines of style block:', lines.length);
    // Print first 80 lines and last 50 lines to be safe
    console.log('=== FIRST 80 LINES ===');
    console.log(lines.slice(0, 80).join('\n'));
    console.log('=== LAST 50 LINES ===');
    console.log(lines.slice(-50).join('\n'));
  } else {
    console.log('Found start keyword but not closing style tag.');
  }
} else {
  console.log('Could not find start keyword in about.html.');
}
