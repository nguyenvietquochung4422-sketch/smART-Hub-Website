const fs = require('fs');
const html = fs.readFileSync('pages/about.html', 'utf8');

const startTag = '<style>';
const endTag = '</style>';
const startIdx = html.indexOf(startTag);
const endIdx = html.indexOf(endTag, startIdx);

if (startIdx !== -1 && endIdx !== -1) {
    const css = html.substring(startIdx + startTag.length, endIdx);
    const lines = css.split('\n');
    console.log('--- SCANNING CSS FOR "ShllEffect" (CASE-INSENSITIVE) ---');
    lines.forEach((line, idx) => {
        if (line.toLowerCase().includes('shlleffect')) {
            console.log(`CSS Line ${idx + 1}: ${line.trim()}`);
        }
    });
} else {
    console.log('No style block found');
}
