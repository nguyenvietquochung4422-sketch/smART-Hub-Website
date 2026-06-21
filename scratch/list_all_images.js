const fs = require('fs');
const path = require('path');

function getFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const name = path.join(dir, file);
        if (fs.statSync(name).isDirectory()) {
            if (file !== '.git' && file !== 'node_modules' && file !== '.vscode' && file !== '.claude') {
                getFiles(name, fileList);
            }
        } else {
            const ext = path.extname(file).toLowerCase();
            if (['.png', '.jpg', '.jpeg', '.svg', '.gif', '.webp'].includes(ext)) {
                fileList.push(name);
            }
        }
    }
    return fileList;
}

const allImages = getFiles('.');
console.log(`Found ${allImages.length} images:`);
allImages.forEach(img => {
    console.log(img);
});
