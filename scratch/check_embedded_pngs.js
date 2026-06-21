const fs = require('fs');

const htmlPath = `c:\\Users\\Admin\\Documents\\GitHub\\smART-Hub-Website\\shll-effect.html`;
if (!fs.existsSync(htmlPath)) {
    console.error("HTML file does not exist!");
    process.exit(1);
}

const html = fs.readFileSync(htmlPath, 'utf8');

// Find all "data:image/png;base64,..."
const regex = /data:image\/png;base64,([^"]+)/g;
let match;
let count = 0;
while ((match = regex.exec(html)) !== null) {
    count++;
    const b64 = match[1].trim();
    const buffer = Buffer.from(b64, 'base64');
    console.log(`\nImage #${count} base64 length: ${b64.length}`);
    console.log(`Decoded buffer size: ${buffer.length} bytes`);
    console.log(`Header hex: ${buffer.slice(0, 8).toString('hex')}`);
    
    if (buffer.slice(0, 8).toString('hex') === '89504e470d0a1a0a') {
        console.log(`Image #${count} is a valid PNG.`);
    } else {
        console.log(`Image #${count} has an INVALID PNG signature!`);
    }
}
