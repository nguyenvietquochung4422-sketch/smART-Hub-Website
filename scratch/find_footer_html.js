const fs = require('fs');

const html = fs.readFileSync('pages/about.html', 'utf8');

const footerIndex = html.indexOf('<footer');
if (footerIndex !== -1) {
    console.log('=== Footer HTML ===');
    console.log(html.substring(footerIndex, footerIndex + 1000));
} else {
    console.log('Footer not found');
}
