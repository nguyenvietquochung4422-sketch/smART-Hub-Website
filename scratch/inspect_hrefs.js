const fs = require('fs');

const html = fs.readFileSync('c:\\Users\\Admin\\Documents\\GitHub\\smART-Hub-Website\\shll-effect.html', 'utf8');

// Let's print out the exact xlink:href value of the image tags (first 100 chars and last 100 chars)
const regex = /xlink:href="([^"]+)"/g;
let match;
while ((match = regex.exec(html)) !== null) {
    const val = match[1];
    console.log(`xlink:href value length: ${val.length}`);
    console.log(`Start: ${val.substring(0, 150)}`);
    console.log(`End: ${val.substring(val.length - 150)}`);
}
