const fs = require('fs');

const inputPath = 'pages/about.html';
const outputPath = 'scratch/clean_about.html';

if (!fs.existsSync(inputPath)) {
    console.error('File not found:', inputPath);
    process.exit(1);
}

console.log('Reading about.html...');
let html = fs.readFileSync(inputPath, 'utf8');
console.log('Original size:', html.length, 'bytes');

let base64Count = 0;
// Replace any occurrence of base64 data URIs in src or xlink:href with placeholder
const cleaned = html.replace(/(src|href|xlink:href)="data:[^;]+;base64,[^"]+"/g, (match, prefix) => {
    base64Count++;
    return `${prefix}="[BASE64_DATA]"`;
});

fs.writeFileSync(outputPath, cleaned, 'utf8');
console.log('Cleaned size:', cleaned.length, 'bytes');
console.log(`Replaced ${base64Count} base64 images.`);
