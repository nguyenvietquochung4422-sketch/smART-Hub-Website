const fs = require('fs');

const filePath = 'pages/about.html';
const content = fs.readFileSync(filePath, 'utf8');

// Find style block containing "shll-band-interactive"
const startWord = '/* ── SHLL Effect 1 interactive band ─────────────────── */';
const index = content.indexOf(startWord);
if (index === -1) {
    console.log('Style comment not found');
} else {
    // Let's print 3000 chars starting from index
    console.log(content.substring(index, index + 6000));
}
