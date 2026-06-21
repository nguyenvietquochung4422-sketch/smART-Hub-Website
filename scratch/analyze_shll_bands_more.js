const fs = require('fs');
let html = fs.readFileSync('pages/about.html', 'utf8');

// Replace large base64 URLs to make inspection easy
html = html.replace(/url\s*\(\s*['"]?data:[^)]+['"]?\)/gi, 'url("data:...")');

const startTag = '<style>';
const endTag = '</style>';
const startIdx = html.indexOf(startTag);
const endIdx = html.indexOf(endTag, startIdx);

if (startIdx !== -1 && endIdx !== -1) {
    const styleContent = html.substring(startIdx + startTag.length, endIdx);
    const rules = styleContent.split('}');
    
    console.log('--- CLEANED STYLE RULES ---');
    rules.forEach(rule => {
        const lower = rule.toLowerCase();
        if (lower.includes('shll') || lower.includes('band') || lower.includes('effect') || lower.includes('idx1') || lower.includes('rect-')) {
            console.log(rule.trim() + '}');
        }
    });
} else {
    console.log('Style tag not found');
}
