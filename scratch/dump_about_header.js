const fs = require('fs');

const html = fs.readFileSync('pages/about.html', 'utf8');

// Search for style properties like "top: 3", "top: 4", "top: 5" etc. up to "top: 9" or "top: 10" or similar
// and print them, focusing on the first part of the body
const bodyStart = html.indexOf('<body>');
const firstPart = html.substring(bodyStart, bodyStart + 40000);
console.log('=== FIRST PART OF BODY (cleaned base64) ===');
console.log(firstPart.replace(/src="data:[^"]+"/g, 'src="[BASE64]"'));
