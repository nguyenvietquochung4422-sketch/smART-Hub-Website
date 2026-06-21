const fs = require('fs');
const html = fs.readFileSync('pages/about.html', 'utf8');

const startTag = '<style>';
const endTag = '</style>';
const startIdx = html.indexOf(startTag);
const endIdx = html.indexOf(endTag, startIdx);

if (startIdx !== -1 && endIdx !== -1) {
    const css = html.substring(startIdx + startTag.length, endIdx);
    const lines = css.split('\n');
    console.log('--- SCANNING CSS LINES 1 TO 278 ---');
    for (let i = 0; i < 278 && i < lines.length; i++) {
        const line = lines[i];
        const lower = line.toLowerCase();
        if (lower.includes('border') || lower.includes('shadow') || lower.includes('outline') || lower.includes('background') || lower.includes('box-shadow')) {
            console.log(`CSS Line ${i + 1}: ${line.trim().substring(0, 300)}`);
        }
    }
}
