const fs = require('fs');

if (fs.existsSync('pages/package-4/index.html')) {
  let content = fs.readFileSync('pages/package-4/index.html', 'utf8');
  content = content.replace(/data:[^;]+;base64,[a-zA-Z0-9+/=\s\n\r]+/g, '[BASE64]');
  
  const queries = ['co-working', 'coworking', 'caf', 'passive', 'landscape', 'testbed'];
  queries.forEach(query => {
    let index = content.toLowerCase().indexOf(query.toLowerCase());
    while (index !== -1) {
      console.log(`Found "${query}" in package-4 at index ${index}:`);
      console.log(content.substring(Math.max(0, index - 80), Math.min(content.length, index + 120)));
      index = content.toLowerCase().indexOf(query.toLowerCase(), index + 1);
    }
  });
} else {
  console.log('package-4/index.html does not exist');
}
