const fs = require('fs');

function getPngDimensions(filepath) {
    if (!fs.existsSync(filepath)) {
        console.log(filepath, "does not exist");
        return;
    }
    const buffer = fs.readFileSync(filepath);
    // PNG dimensions are at offset 16 (width, 4 bytes) and 20 (height, 4 bytes) in big-endian
    const width = buffer.readUInt32BE(16);
    const height = buffer.readUInt32BE(20);
    console.log(`${filepath}: ${width} x ${height}`);
}

getPngDimensions('c:\\Users\\Admin\\Documents\\GitHub\\smART-Hub-Website\\assets\\images\\Logo_SHLL.png');
getPngDimensions('c:\\Users\\Admin\\Documents\\GitHub\\smART-Hub-Website\\assets\\images\\Logo_SHLL_long.png');
