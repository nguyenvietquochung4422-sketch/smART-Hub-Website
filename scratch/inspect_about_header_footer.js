const fs = require('fs');

const html = fs.readFileSync('pages/about.html', 'utf8');

console.log('--- Searching about.html for header references ---');
// Let's find index of logo or horizontal line or anything header-related
const headerKeywords = ['logo', 'Logo', 'header', 'Header', 'nav', 'Navbar'];
headerKeywords.forEach(kw => {
    let idx = -1;
    let count = 0;
    while ((idx = html.indexOf(kw, idx + 1)) !== -1 && count < 5) {
        console.log(`Keyword "${kw}" at index ${idx}:`);
        console.log(html.substring(Math.max(0, idx - 100), Math.min(html.length, idx + 200)));
        count++;
    }
});

console.log('\n--- Searching about.html for footer references ---');
const footerKeywords = ['footer', 'Footer', 'Contact', 'contact', 'UEH', 'Ho Chi Minh'];
footerKeywords.forEach(kw => {
    let idx = -1;
    let count = 0;
    while ((idx = html.indexOf(kw, idx + 1)) !== -1 && count < 5) {
        console.log(`Keyword "${kw}" at index ${idx}:`);
        console.log(html.substring(Math.max(0, idx - 100), Math.min(html.length, idx + 200)));
        count++;
    }
});
