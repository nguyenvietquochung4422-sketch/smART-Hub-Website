const fs = require('fs');

const pkg1Html = fs.readFileSync('pages/package-1/index.html', 'utf8');
const aboutHtml = fs.readFileSync('pages/about.html', 'utf8');

// Extract CSS block from package-1 index.html
const stylePkg1Start = pkg1Html.indexOf('<style>');
const stylePkg1End = pkg1Html.indexOf('</style>');
const cssPkg1 = pkg1Html.substring(stylePkg1Start + 7, stylePkg1End);

console.log('--- PACKAGE-1 INDEX.HTML HEADER/FOOTER CSS ---');
// Let's find header section
const headerStart = cssPkg1.indexOf('/* --- 1. HEADER --- */');
const headerEnd = cssPkg1.indexOf('/* --- 2.');
if (headerStart !== -1) {
    console.log(cssPkg1.substring(headerStart, headerEnd !== -1 ? headerEnd : cssPkg1.length));
}

// Let's find footer section
const footerStart = cssPkg1.indexOf('/* --- 7. FOOTER --- */');
const footerEnd = cssPkg1.indexOf('</style>'); // or end of CSS
if (footerStart !== -1) {
    console.log(cssPkg1.substring(footerStart, footerEnd !== -1 ? footerEnd : cssPkg1.length));
} else {
    // Let's find any footer styles
    let idx = -1;
    console.log('Footer styles in Package 1:');
    while ((idx = cssPkg1.indexOf('.footer', idx + 1)) !== -1) {
        let blockStart = cssPkg1.lastIndexOf('}', idx);
        let blockEnd = cssPkg1.indexOf('}', idx);
        console.log(cssPkg1.substring(blockStart + 1, blockEnd + 1).trim());
    }
}
