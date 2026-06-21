const fs = require('fs');

const html = fs.readFileSync('c:\\Users\\Admin\\Documents\\GitHub\\smART-Hub-Website\\shll-effect.html', 'utf8');

// Find all base64 strings
const regex = /data:image\/png;base64,([^"]+)/g;
let match;
const b64s = [];
while ((match = regex.exec(html)) !== null) {
    b64s.push(match[1].trim());
}

console.log("Found base64 count:", b64s.length);

if (b64s.length >= 2) {
    const testHtml = `<!DOCTYPE html>
<html>
<head>
    <title>Test PNG Images</title>
</head>
<body style="background-color: #222; color: white; padding: 20px;">
    <h3>Image 1 (Logo):</h3>
    <img src="data:image/png;base64,${b64s[0]}" style="border: 1px solid red; max-width: 100%;" />
    
    <h3>Image 2 (New SVG Image):</h3>
    <img src="data:image/png;base64,${b64s[1]}" style="border: 1px solid blue; max-width: 100%;" />
</body>
</html>`;
    fs.writeFileSync('c:\\Users\\Admin\\Documents\\GitHub\\smART-Hub-Website\\scratch\\test_images.html', testHtml, 'utf8');
    console.log("Successfully wrote scratch/test_images.html");
} else {
    console.log("Could not find at least 2 base64 strings.");
}
