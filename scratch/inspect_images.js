const fs = require('fs');

const filePath = 'c:/Users/Admin/Documents/GitHub/smART-Hub-Website/pages/package-4/index.html';
const content = fs.readFileSync(filePath, 'utf8');

const regex = /<img[^>]+class="([^"]+)"[^>]*>/g;
let match;
console.log('--- Image Elements ---');
while ((match = regex.exec(content)) !== null) {
    const fullTag = match[0];
    const className = match[1];
    const hasBase64 = fullTag.includes('data:image');
    console.log(`Class: ${className}, Has Base64: ${hasBase64}, Length: ${fullTag.length}`);
}

const svgRegex = /<div data-svg-wrapper[^>]+class="([^"]+)"[^>]*>/g;
console.log('--- SVG Elements ---');
while ((match = svgRegex.exec(content)) !== null) {
    console.log(`Class: ${match[1]}`);
}
