const fs = require('fs');

const html = fs.readFileSync('c:\\Users\\Admin\\Documents\\GitHub\\smART-Hub-Website\\shll-effect.html', 'utf8');

const regex = /id="image0_850_265"[\s\S]+?xlink:href="([^"]+)"/;
const match = html.match(regex);
if (match) {
    const val = match[1];
    console.log("xlink:href length:", val.length);
    console.log("Value:", val);
} else {
    console.log("No match found!");
}
