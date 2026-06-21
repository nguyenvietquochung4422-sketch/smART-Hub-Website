const fs = require('fs');
const html = fs.readFileSync('pages/about.html', 'utf8');

console.log('--- LINK AND STYLE TAGS IN about.html ---');
const linkMatches = html.match(/<link[^>]*>/gi);
console.log('Link tags:', linkMatches);

const styleMatches = html.match(/<style[^>]*>/gi);
console.log('Style tags count:', styleMatches ? styleMatches.length : 0);
if (styleMatches) {
    styleMatches.forEach((styleTag, idx) => {
        const start = html.indexOf(styleTag);
        const end = html.indexOf('</style>', start);
        console.log(`Style block ${idx + 1} tag:`, styleTag);
        console.log('Size of content:', end - start, 'bytes');
    });
}
