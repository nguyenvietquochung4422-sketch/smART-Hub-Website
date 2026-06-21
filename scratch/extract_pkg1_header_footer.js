const fs = require('fs');

const html = fs.readFileSync('pages/package-1/index.html', 'utf8');

// Find CSS for header and footer in package-1/index.html
const styleStart = html.indexOf('<style>');
const styleEnd = html.indexOf('</style>');
const styleContent = html.substring(styleStart + 7, styleEnd);

// Let's find CSS sections for HEADER and FOOTER
console.log('=== HEADER & FOOTER CSS FROM PACKAGE-1/INDEX.HTML ===');
const headerCssStart = styleContent.indexOf('/* --- 1. HEADER --- */');
const headerCssEnd = styleContent.indexOf('/* --- 2.'); // Or next section
if (headerCssStart !== -1) {
    console.log(styleContent.substring(headerCssStart, headerCssEnd !== -1 ? headerCssEnd : headerCssStart + 2000));
} else {
    console.log('Header CSS not found by comment');
}

const footerCssStart = styleContent.indexOf('/* --- 7. FOOTER --- */');
if (footerCssStart === -1) {
    // Let's search for "footer" css
    console.log('Searching for "footer" in CSS:');
    let idx = -1;
    while ((idx = styleContent.indexOf('.footer', idx + 1)) !== -1) {
        let blockStart = styleContent.lastIndexOf('}', idx);
        let blockEnd = styleContent.indexOf('}', idx);
        console.log(styleContent.substring(blockStart + 1, blockEnd + 1).trim());
    }
} else {
    console.log(styleContent.substring(footerCssStart, styleContent.indexOf('/* ---', footerCssStart + 30)));
}

// Find HTML for header and footer
console.log('\n=== HEADER HTML FROM PACKAGE-1/INDEX.HTML ===');
const headerHtmlStart = html.indexOf('<div class="header-wrapper"');
if (headerHtmlStart !== -1) {
    // find closing tag or let's find up to next big section
    let headerHtmlEnd = html.indexOf('</header>', headerHtmlStart);
    if (headerHtmlEnd === -1) {
        headerHtmlEnd = html.indexOf('</div>', headerHtmlStart + 500); // fallback
    } else {
        headerHtmlEnd += 9;
    }
    console.log(html.substring(headerHtmlStart, headerHtmlEnd));
} else {
    console.log('Header wrapper HTML not found');
}

console.log('\n=== FOOTER HTML FROM PACKAGE-1/INDEX.HTML ===');
const footerHtmlStart = html.indexOf('<footer');
if (footerHtmlStart !== -1) {
    const footerHtmlEnd = html.indexOf('</footer>', footerHtmlStart) + 9;
    console.log(html.substring(footerHtmlStart, footerHtmlEnd));
} else {
    console.log('Footer HTML not found');
}
