const fs = require('fs');
const html = fs.readFileSync('pages/about.html', 'utf8');

console.log('--- SCANNING FOR INLINE BORDERS, OUTLINES, SHADOWS ---');
const regex = /<[^>]*style="([^"]*(?:border|outline|shadow)[^"]*)"[^>]*>/gi;
let match;
let count = 0;
while ((match = regex.exec(html)) !== null) {
    count++;
    const fullTag = match[0];
    console.log(`Match ${count} (Index ${match.index}): ${fullTag.substring(0, 300)}`);
    if (count > 30) break;
}
