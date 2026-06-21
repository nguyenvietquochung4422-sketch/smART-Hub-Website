const fs = require('fs');

function checkFile(filePath) {
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf8');
    console.log(`=== ${filePath} ===`);
    // Find background colors in stylesheet blocks
    const bgRegex = /background(-color)?:\s*#[a-fA-F0-9]{3,8}/g;
    let match;
    while ((match = bgRegex.exec(content)) !== null) {
      console.log('Found background match:', match[0]);
    }
  }
}

checkFile('index.html');
checkFile('pages/package-1/index.html');
