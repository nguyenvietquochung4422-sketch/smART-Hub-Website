const fs = require('fs');
const html = fs.readFileSync('pages/about.html', 'utf8');

console.log('--- SEARCHING FOR KEYFRAMES ---');
const regex = /@keyframes\s+anim99[^{]*\{[^}]*\}/gi;
let match = html.match(/@keyframes[^{]*\{[^}]*\}/gi);
if (match) {
    console.log(`Found ${match.length} keyframe matches (showing first 3):`);
    console.log(match.slice(0, 3));
} else {
    // Let's search generally for @keyframes
    const generalRegex = /@keyframes[^{]*/gi;
    let count = 0;
    while ((match = generalRegex.exec(html)) !== null) {
        count++;
        console.log(`Match ${count}: ${match[0].trim()}`);
        if (count > 20) break;
    }
}
