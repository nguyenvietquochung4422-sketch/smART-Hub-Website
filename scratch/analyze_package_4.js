const fs = require('fs');
const path = require('path');

const filePath = 'c:/Users/Admin/Documents/GitHub/smART-Hub-Website/pages/package-4/index.html';
const content = fs.readFileSync(filePath, 'utf8');

const lines = content.split('\n');
console.log(`Total lines: ${lines.length}`);
for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    // Remove base64 data
    const cleaned = line.replace(/src="data:image\/[^;]+;base64,[^"]+"/g, 'src="[BASE64_DATA]"');
    console.log(`${i + 1}: ${cleaned.substring(0, 300)}${cleaned.length > 300 ? '...' : ''}`);
}
