const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const imageDir = `c:\\Users\\Admin\\Documents\\GitHub\\smART-Hub-Website\\assets\\images\\About\\vision`;
const targetFiles = ['image 149.png', 'image 154.png'];

for (const filename of targetFiles) {
    const filepath = path.join(imageDir, filename);
    try {
        const buffer = fs.readFileSync(filepath);
        let offset = 8;
        let width = 0, height = 0, colorType = 0;
        let idatBuffers = [];
        
        while (offset < buffer.length) {
            const length = buffer.readUInt32BE(offset);
            const type = buffer.toString('ascii', offset + 4, offset + 8);
            const data = buffer.subarray(offset + 8, offset + 8 + length);
            if (type === 'IHDR') {
                width = data.readUInt32BE(0);
                height = data.readUInt32BE(4);
                colorType = data[9];
            } else if (type === 'IDAT') {
                idatBuffers.push(data);
            }
            offset += 12 + length;
        }
        
        const compressed = Buffer.concat(idatBuffers);
        const decompressed = zlib.inflateSync(compressed);
        const bytesPerPixel = 4;
        const scanlineLength = 1 + width * bytesPerPixel;
        const decodedPixels = Buffer.alloc(width * height * bytesPerPixel);
        
        for (let y = 0; y < height; y++) {
            const scanlineStart = y * scanlineLength;
            const filterType = decompressed[scanlineStart];
            const prevRowOffset = (y - 1) * width * bytesPerPixel;
            const curRowOffset = y * width * bytesPerPixel;
            for (let x = 0; x < width; x++) {
                const rawOffset = scanlineStart + 1 + x * bytesPerPixel;
                const outOffset = curRowOffset + x * bytesPerPixel;
                for (let c = 0; c < bytesPerPixel; c++) {
                    const rawVal = decompressed[rawOffset + c];
                    let leftVal = x > 0 ? decodedPixels[outOffset - bytesPerPixel + c] : 0;
                    let upVal = y > 0 ? decodedPixels[prevRowOffset + x * bytesPerPixel + c] : 0;
                    let upLeftVal = (x > 0 && y > 0) ? decodedPixels[prevRowOffset + (x - 1) * bytesPerPixel + c] : 0;
                    if (filterType === 0) decodedPixels[outOffset + c] = rawVal;
                    else if (filterType === 1) decodedPixels[outOffset + c] = (rawVal + leftVal) & 0xFF;
                    else if (filterType === 2) decodedPixels[outOffset + c] = (rawVal + upVal) & 0xFF;
                    else if (filterType === 3) decodedPixels[outOffset + c] = (rawVal + Math.floor((leftVal + upVal) / 2)) & 0xFF;
                    else if (filterType === 4) {
                        const p = leftVal + upVal - upLeftVal;
                        const pa = Math.abs(p - leftVal), pb = Math.abs(p - upVal), pc = Math.abs(p - upLeftVal);
                        let pr = (pa <= pb && pa <= pc) ? leftVal : (pb <= pc ? upVal : upLeftVal);
                        decodedPixels[outOffset + c] = (rawVal + pr) & 0xFF;
                    }
                }
            }
        }
        
        console.log(`\n--- Shape row span details for: ${filename} ---`);
        let printedCount = 0;
        for (let y = 0; y < height; y++) {
            const rowOffset = y * width * bytesPerPixel;
            let minX = -1, maxX = -1;
            for (let x = 0; x < width; x++) {
                if (decodedPixels[rowOffset + x * bytesPerPixel + 3] > 50) {
                    if (minX === -1) minX = x;
                    maxX = x;
                }
            }
            if (minX !== -1) {
                console.log(`Row ${String(y).padStart(3)}: span [${String(minX).padStart(3)} to ${String(maxX).padStart(3)}], width = ${maxX - minX + 1}`);
                printedCount++;
                if (printedCount >= 15) break;
            }
        }
    } catch (e) {
        console.log("Error analyzing", filename, e.message);
    }
}
