const fs = require('fs');

const html = fs.readFileSync('pages/about.html', 'utf8');

// Find all occurrences of "box-shadow" or "border" in the CSS styles
const styleStart = html.indexOf('<style>');
const styleEnd = html.indexOf('</style>');
const css = html.substring(styleStart + 7, styleEnd);

console.log('=== Shadow/Border CSS rules ===');
const lines = css.split('\n');
lines.forEach((line, idx) => {
    if (line.includes('box-shadow') || line.includes('border') || line.includes('outline')) {
        console.log(`Line ${idx + 1}: ${line.trim()}`);
    }
});

console.log('\n=== Inline style occurrences of box-shadow/border ===');
let match;
const regex = /style="[^"]*(box-shadow|border|outline)[^"]*"/gi;
while ((match = regex.exec(html)) !== null) {
    console.log(`Found inline style at index ${match.index}:`);
    console.log(html.substring(match.index - 50, match.index + match[0].length + 100));
}
