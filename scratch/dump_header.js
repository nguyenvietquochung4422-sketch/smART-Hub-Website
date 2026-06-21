const fs = require('fs');

const html = fs.readFileSync('pages/package-1/index.html', 'utf8');
const headerStart = html.indexOf('<div class="header-wrapper"');
if (headerStart !== -1) {
    // Find the matching end div or search for where the next content starts
    // In package-1/index.html, let's see how far the header goes
    console.log(html.substring(headerStart, headerStart + 1500));
} else {
    console.log('Not found');
}
