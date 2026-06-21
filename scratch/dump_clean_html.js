const fs = require('fs');

const filePath = 'c:/Users/Admin/Documents/GitHub/smART-Hub-Website/pages/package-4/index.html';
const content = fs.readFileSync(filePath, 'utf8');

// Replace any occurrence of base64 data URIs with a placeholder
const cleaned = content.replace(/(src|href|xlink:href)="data:[^;]+;base64,[^"]+"/g, '$1="[BASE64_DATA]"');

fs.writeFileSync('c:/Users/Admin/Documents/GitHub/smART-Hub-Website/scratch/clean_package_4.html', cleaned, 'utf8');
console.log('Cleaned HTML saved to scratch/clean_package_4.html');
