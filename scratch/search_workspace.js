const fs = require('fs');
const path = require('path');

function searchDir(dir) {
  if (dir.includes('node_modules') || dir.includes('.git') || dir.includes('.gemini') || dir.includes('artifacts')) {
    return;
  }
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      searchDir(fullPath);
    } else if (file.endsWith('.html')) {
      const content = fs.readFileSync(fullPath, 'utf8');
      if (/working|caf|passive/i.test(content)) {
        console.log(`Found match in: ${fullPath}`);
      }
    }
  }
}

searchDir('.');
