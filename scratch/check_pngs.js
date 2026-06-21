const fs = require('fs');
const path = require('path');

const imgPath2 = `c:\\Users\\Admin\\Documents\\GitHub\\smART-Hub-Website\\assets\\images\\extracted_image_2.png`;
const imgPath3 = `c:\\Users\\Admin\\Documents\\GitHub\\smART-Hub-Website\\assets\\images\\extracted_image_3.png`;

function checkPng(filepath) {
    if (!fs.existsSync(filepath)) {
        console.log(filepath, "does not exist!");
        return;
    }
    const buffer = fs.readFileSync(filepath);
    console.log(`${path.basename(filepath)} size: ${buffer.length} bytes`);
    console.log(`Header hex: ${buffer.slice(0, 8).toString('hex')}`);
    // Check if header matches PNG signature: 89504e470d0a1a0a
    if (buffer.slice(0, 8).toString('hex') === '89504e470d0a1a0a') {
        console.log(`${path.basename(filepath)} is a valid PNG signature.`);
    } else {
        console.log(`${path.basename(filepath)} signature MISMATCH!`);
    }
}

checkPng(imgPath2);
checkPng(imgPath3);
