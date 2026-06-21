const fs = require('fs');
const html = fs.readFileSync('pages/about.html', 'utf8');

console.log('--- SEARCHING FOR JAVASCRIPT INLINE STYLE MODIFICATIONS ---');

// Find all script tags
const scriptRegex = /<script[^>]*>([\s\S]*?)<\/script>/gi;
let match;
let scriptIdx = 0;
while ((match = scriptRegex.exec(html)) !== null) {
    scriptIdx++;
    const jsContent = match[1];
    console.log(`Analyzing script block ${scriptIdx} (length: ${jsContent.length})...`);
    
    // Look for lines modifying style with box-shadow, border, or shadow
    const lines = jsContent.split('\n');
    lines.forEach((line, lineIdx) => {
        if (line.includes('boxShadow') || line.includes('border') || line.includes('shadow') || line.includes('style.')) {
            console.log(`  Line ${lineIdx + 1}: ${line.trim()}`);
        }
    });
}
