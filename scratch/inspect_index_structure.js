const fs = require('fs');

function inspectFile(filePath) {
    console.log(`\n=== Inspecting ${filePath} ===`);
    if (!fs.existsSync(filePath)) {
        console.error('File not found:', filePath);
        return;
    }
    const html = fs.readFileSync(filePath, 'utf8');
    console.log('Length:', html.length);
    
    // Look at first 2000 chars and last 2000 chars, but without long base64
    const cleanHtml = html.replace(/src="data:[^"]+"/g, 'src="[BASE64]"');
    console.log('\n--- FIRST 1500 CHARACTERS (cleaned base64) ---');
    console.log(cleanHtml.substring(0, 1500));
    
    console.log('\n--- LAST 1500 CHARACTERS (cleaned base64) ---');
    console.log(cleanHtml.substring(cleanHtml.length - 1500));
}

inspectFile('index.html');
inspectFile('pages/package-1/index.html');
inspectFile('shll-effect.html');
