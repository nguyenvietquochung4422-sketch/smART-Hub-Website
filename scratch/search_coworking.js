const fs = require('fs');
const path = require('path');

function cleanAndSearch(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  // Replace base64 strings to avoid false positives
  content = content.replace(/data:[^;]+;base64,[a-zA-Z0-9+/=\s\n\r]+/g, '[BASE64]');
  
  const queries = ['co-working', 'coworking', 'caf', 'passive', 'landscape', 'testbed'];
  queries.forEach(query => {
    let index = content.toLowerCase().indexOf(query.toLowerCase());
    while (index !== -1) {
      console.log(`Found "${query}" in ${filePath} at index ${index}:`);
      console.log(content.substring(Math.max(0, index - 80), Math.min(content.length, index + 120)));
      index = content.toLowerCase().indexOf(query.toLowerCase(), index + 1);
    }
  });
}

const files = [
  'index.html',
  'pages/about.html',
  'pages/package-2/architectural-design.html',
  'pages/package-2/architectural-layout.html',
  'pages/package-2/passive-interventions.html',
  'pages/package-2/spatial-assessment.html',
  'pages/package-3/index.html',
  'pages/package-4/index.html'
];

files.forEach(file => {
  if (fs.existsSync(file)) {
    cleanAndSearch(file);
  }
});
