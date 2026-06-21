const fs = require('fs');
const html = fs.readFileSync('pages/about.html', 'utf8');

console.log('--- CSS RULES FOR band-container AND img-box ---');

const regexes = [
    /\.band-container[^{]*\{[^}]*\}/gi,
    /\.img-box[^{]*\{[^}]*\}/gi
];

regexes.forEach(regex => {
    let match;
    while ((match = regex.exec(html)) !== null) {
        console.log('CSS Match:', match[0]);
    }
});
