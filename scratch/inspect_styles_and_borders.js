const fs = require('fs');
const html = fs.readFileSync('pages/about.html', 'utf8');

console.log('--- STRUCTURAL INSPECTION OF SHLL EFFECT / INDEX 1 ---');

const shllEffectIndex = html.indexOf('class="ShllEffect"');
if (shllEffectIndex !== -1) {
    console.log('Found ShllEffect at index', shllEffectIndex);
    // Let's print 1200 characters from there
    console.log(html.substring(shllEffectIndex - 100, shllEffectIndex + 1200));
} else {
    console.log('ShllEffect class not found!');
}

console.log('\n--- SEARCHING FOR BORDERS OR SHADOWS IN ORIGINAL CSS ---');
// Let's find all CSS declarations matching .ShllEffect or .shll-band-interactive
const cssRegexes = [
    /\.ShllEffect\s*\{[^}]*\}/gi,
    /\.shll-band-interactive\s*\{[^}]*\}/gi
];

cssRegexes.forEach(regex => {
    let match;
    while ((match = regex.exec(html)) !== null) {
        console.log('CSS Match:', match[0]);
    }
});
