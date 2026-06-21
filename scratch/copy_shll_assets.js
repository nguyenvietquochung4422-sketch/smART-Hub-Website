const fs = require('fs');
const path = require('path');

function copyDirRecursive(src, dest) {
    if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
    }
    const entries = fs.readdirSync(src, { withFileTypes: true });
    for (const entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);
        if (entry.isDirectory()) {
            copyDirRecursive(srcPath, destPath);
        } else {
            fs.copyFileSync(srcPath, destPath);
        }
    }
}

console.log('Copying SHLL effect/image to assets/images/About/shll_effect...');
copyDirRecursive('SHLL effect/image', 'assets/images/About/shll_effect');

console.log('Copying SHLL effect/image1 to assets/images/About/shll_effect1...');
copyDirRecursive('SHLL effect/image1', 'assets/images/About/shll_effect1');

console.log('Copy completed successfully!');
