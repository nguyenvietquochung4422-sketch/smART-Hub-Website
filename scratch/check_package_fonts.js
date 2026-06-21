const fs = require('fs');

const p2Path = 'pages/package-2/research.html';
if (fs.existsSync(p2Path)) {
    const content = fs.readFileSync(p2Path, 'utf8');
    console.log('--- FONTS IN PACKAGE 2 RESEARCH.HTML ---');
    const links = content.match(/<link[^>]+href="[^"]+fonts\.googleapis\.com[^"]+"[^>]*>/g);
    console.log('Links:', links);
    const fonts = content.match(/font-family:[^;]+;/g);
    console.log('Unique font-families:', [...new Set(fonts)].slice(0, 10));
} else {
    console.log('Package 2 research.html not found');
}
