const fs = require('fs');
const html = fs.readFileSync('pages/about.html', 'utf8');

const startTag = '<style>';
const endTag = '</style>';
const startIdx = html.indexOf(startTag);
const endIdx = html.indexOf(endTag, startIdx);

if (startIdx !== -1 && endIdx !== -1) {
    const css = html.substring(startIdx + startTag.length, endIdx);
    const lines = css.split('\n');
    console.log('--- SCANNING CSS LINES ---');
    lines.forEach((line, idx) => {
        const lower = line.toLowerCase();
        if (lower.includes('border') || lower.includes('shadow') || lower.includes('outline') || lower.includes('background') || lower.includes('box-shadow')) {
            // truncate line for safety
            console.log(`CSS Line ${idx + 1}: ${line.trim().substring(0, 300)}`);
        }
    });
} else {
    console.log('No style block found');
}
