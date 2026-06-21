const fs = require('fs');
const content = fs.readFileSync('pages/about.html', 'utf8');

// Find <body>
const bodyIndex = content.indexOf('<body');
if (bodyIndex !== -1) {
  console.log('=== Body tag ===');
  console.log(content.substring(bodyIndex, bodyIndex + 150));
}

// Find class="Model"
const modelIndex = content.indexOf('class="Model"');
if (modelIndex !== -1) {
  console.log('=== Model tag ===');
  console.log(content.substring(modelIndex - 50, modelIndex + 150));
}

// Find <footer
const footerIndex = content.indexOf('<footer');
if (footerIndex !== -1) {
  console.log('=== Footer tag ===');
  console.log(content.substring(footerIndex, footerIndex + 150));
}
