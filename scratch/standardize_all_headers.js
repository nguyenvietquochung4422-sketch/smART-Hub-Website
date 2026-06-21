const fs = require('fs');
const path = require('path');

const targetDirs = [
    'c:/Users/Admin/Documents/GitHub/smART-Hub-Website/pages',
];

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(filePath));
        } else if (file.endsWith('.html')) {
            results.push(filePath);
        }
    });
    return results;
}

function refactorHeader(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Check if the file has .header-wrapper styling
    if (!content.includes('.header-wrapper')) return;

    console.log('Processing:', filePath);

    const updated = content.replace(/\.header-wrapper\s*\{([\s\S]*?)\}/g, (match, p1) => {
        let block = p1;
        
        // Normalize line breaks or spacing inside block
        if (block.includes('background:')) {
            block = block.replace(/background:\s*[^;]+;/g, 'background: transparent !important;');
        } else {
            block += ' background: transparent !important;';
        }
        
        if (block.includes('backdrop-filter:')) {
            block = block.replace(/backdrop-filter:\s*[^;]+;/g, 'backdrop-filter: none !important;');
        } else {
            block += ' backdrop-filter: none !important;';
        }
        
        if (block.includes('-webkit-backdrop-filter:')) {
            block = block.replace(/-webkit-backdrop-filter:\s*[^;]+;/g, '-webkit-backdrop-filter: none !important;');
        } else {
            block += ' -webkit-backdrop-filter: none !important;';
        }

        return `.header-wrapper {${block}}`;
    });

    fs.writeFileSync(filePath, updated, 'utf8');
}

targetDirs.forEach(dir => {
    const files = walk(dir);
    files.forEach(file => {
        refactorHeader(file);
    });
});

console.log('Finished updating headers to transparent across packages.');
