const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const imageDir = `c:\\Users\\Admin\\Documents\\GitHub\\smART-Hub-Website\\assets\\images\\About\\vision`;
const files = fs.readdirSync(imageDir).filter(f => f.endsWith('.png'));

console.log("Analyzing PNG files in:", imageDir);
console.log("-".repeat(60));

for (const filename of files.sort()) {
    const filepath = path.join(imageDir, filename);
    try {
        const buffer = fs.readFileSync(filepath);
        
        if (buffer.readUInt32BE(0) !== 0x89504E47 || buffer.readUInt32BE(4) !== 0x0D0A1A0A) {
            console.log(`${filename}: Not a valid PNG`);
            continue;
        }
        
        let offset = 8;
        let width = 0;
        let height = 0;
        let colorType = 0;
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
            } else if (type === 'IEND') {
                break;
            }
            offset += 12 + length;
        }
        
        if (colorType !== 6) {
            continue;
        }
        
        const compressed = Buffer.concat(idatBuffers);
        const decompressed = zlib.inflateSync(compressed);
        
        const bytesPerPixel = 4;
        const scanlineLength = 1 + width * bytesPerPixel;
        
        let firstRow = -1;
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
                    
                    if (filterType === 0) {
                        decodedPixels[outOffset + c] = rawVal;
                    } else if (filterType === 1) {
                        decodedPixels[outOffset + c] = (rawVal + leftVal) & 0xFF;
                    } else if (filterType === 2) {
                        decodedPixels[outOffset + c] = (rawVal + upVal) & 0xFF;
                    } else if (filterType === 3) {
                        decodedPixels[outOffset + c] = (rawVal + Math.floor((leftVal + upVal) / 2)) & 0xFF;
                    } else if (filterType === 4) {
                        const p = leftVal + upVal - upLeftVal;
                        const pa = Math.abs(p - leftVal);
                        const pb = Math.abs(p - upVal);
                        const pc = Math.abs(p - upLeftVal);
                        let pr = 0;
                        if (pa <= pb && pa <= pc) {
                            pr = leftVal;
                        } else if (pb <= pc) {
                            pr = upVal;
                        } else {
                            pr = upLeftVal;
                        }
                        decodedPixels[outOffset + c] = (rawVal + pr) & 0xFF;
                    }
                }
            }
        }
        
        for (let y = 0; y < height; y++) {
            const rowOffset = y * width * bytesPerPixel;
            let rowHasPixels = false;
            for (let x = 0; x < width; x++) {
                if (decodedPixels[rowOffset + x * bytesPerPixel + 3] > 50) {
                    rowHasPixels = true;
                    break;
                }
            }
            if (rowHasPixels) {
                firstRow = y;
                break;
            }
        }
        
        if (firstRow === -1) {
            console.log(`${filename.padEnd(15)} | Transparent`);
            continue;
        }
        
        const rowOffset = firstRow * width * bytesPerPixel;
        let minX = -1;
        let maxX = -1;
        for (let x = 0; x < width; x++) {
            if (decodedPixels[rowOffset + x * bytesPerPixel + 3] > 50) {
                if (minX === -1) minX = x;
                maxX = x;
            }
        }
        
        const leftAlpha = decodedPixels[rowOffset + minX * bytesPerPixel + 3];
        const rightAlpha = decodedPixels[rowOffset + maxX * bytesPerPixel + 3];
        const shapeWidth = maxX - minX + 1;
        const isFlatTop = shapeWidth > 30 && leftAlpha > 200 && rightAlpha > 200;
        
        console.log(`${filename.padEnd(15)} | FirstRow: ${String(firstRow).padEnd(3)} | ShapeWidth: ${String(shapeWidth).padEnd(3)}/${width} | LeftAlpha: ${String(leftAlpha).padEnd(3)} | RightAlpha: ${String(rightAlpha).padEnd(3)} | Flat Top: ${isFlatTop}`);
    } catch (e) {
        console.log(`Error reading ${filename}:`, e.message);
    }
}
