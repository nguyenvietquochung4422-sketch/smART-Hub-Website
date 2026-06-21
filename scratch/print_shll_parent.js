const fs = require('fs');
const html = fs.readFileSync('pages/about.html', 'utf8');

const shllEffectIndex = html.indexOf('class="ShllEffect"');
if (shllEffectIndex !== -1) {
    console.log('--- HTML BEFORE ShllEffect ---');
    console.log(html.substring(shllEffectIndex - 1200, shllEffectIndex));
}
