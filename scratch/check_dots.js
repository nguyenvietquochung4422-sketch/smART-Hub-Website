const fs = require('fs');
const html = fs.readFileSync('c:\\Users\\Admin\\Documents\\GitHub\\smART-Hub-Website\\shll-effect.html', 'utf8');

if (html.includes('...')) {
    console.log("HTML contains literal '...'!");
} else {
    console.log("HTML does NOT contain literal '...'!");
}

// Let's print out the exact base64 data between 'base64,' and '"' for both image tags
const regex = /data:image\/png;base64,([^"]+)/g;
let match;
while ((match = regex.exec(html)) !== null) {
    const val = match[1];
    if (val.includes('...')) {
        console.log("Base64 string contains literal '...'!");
    } else {
        console.log("Base64 string does NOT contain '...'");
    }
}
