const fs = require('fs');
const html = fs.readFileSync('pages/about.html', 'utf8');

const startTag = '<style>';
const endTag = '</style>';
const startIdx = html.indexOf(startTag);
const endIdx = html.indexOf(endTag, startIdx);

if (startIdx !== -1 && endIdx !== -1) {
    const css = html.substring(startIdx + startTag.length, endIdx);
    const rules = css.split('}');
    console.log('--- SCANNING FOR SHLL CSS RULES ---');
    rules.forEach(rule => {
        const lower = rule.toLowerCase();
        if (lower.includes('shll-band-interactive') || lower.includes('band-container') || lower.includes('img-box')) {
            // Replace base64 urls to clean output
            const cleaned = rule.replace(/url\s*\(\s*['"]?data:[^)]+['"]?\)/gi, 'url("data:...")');
            console.log(cleaned.trim() + '}');
        }
    });
}
