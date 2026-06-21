const fs = require('fs');
const html = fs.readFileSync('pages/about.html', 'utf8');

console.log('--- SEARCHING FOR ShllEffect STYLE AND CLASS USAGES ---');

// Let's find all CSS occurrences of ShllEffect
const regex = /\.ShllEffect[^{]*\{[^}]*\}/gi;
let match;
while ((match = regex.exec(html)) !== null) {
    console.log('Found CSS definition:', match[0]);
}

// Find all HTML elements with class containing ShllEffect
const htmlRegex = /<[^>]*class="[^"]*ShllEffect[^"]*"[^>]*>/gi;
while ((match = htmlRegex.exec(html)) !== null) {
    console.log('Found HTML tag:', match[0]);
}
