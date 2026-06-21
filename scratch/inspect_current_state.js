const fs = require('fs');
const html = fs.readFileSync('pages/about.html', 'utf8');

console.log('--- INSPECTION RESULTS ---');

// Check body background settings
const bodyBgMatch = html.match(/body\s*\{[^}]*background[^}]*\}/gi);
console.log('Body background rules in CSS:', bodyBgMatch);

// Check html,body default color
const defaultBodyColor = html.match(/html,body\{[^}]*background:[^;}]+/g);
console.log('Default html,body background color:', defaultBodyColor);

// Check footer styles in CSS
const footerBgMatch = html.match(/\.footer-container\s*\{[^}]*\}/gi);
console.log('Footer styles in CSS:', footerBgMatch);

// Check for shll-band-interactive and their styles
const bandInteractiveMatch = html.match(/<div class="shll-band-interactive" style="([^"]*)">/g);
if (bandInteractiveMatch) {
    console.log('Found', bandInteractiveMatch.length, '.shll-band-interactive occurrences. Showing first 3:');
    console.log(bandInteractiveMatch.slice(0, 3));
} else {
    console.log('No .shll-band-interactive with inline styles found.');
}

// Check for ShllEffect and its style
const shllEffectMatch = html.match(/<div data-layer="SHLL effect" class="ShllEffect" style="([^"]*)">/g);
if (shllEffectMatch) {
    console.log('Found', shllEffectMatch.length, '.ShllEffect occurrences. Showing first 3:');
    console.log(shllEffectMatch.slice(0, 3));
} else {
    console.log('No .ShllEffect with inline styles found.');
}

// Check for rect-box-index1 in CSS
const rectBoxIndex1Match = html.match(/\.rect-box-index1\s*\{[^}]*\}/gi);
console.log('rect-box-index1 in CSS:', rectBoxIndex1Match);
