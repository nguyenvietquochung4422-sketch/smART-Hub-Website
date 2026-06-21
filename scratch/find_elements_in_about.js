const fs = require('fs');

const filePath = 'pages/about.html';
if (!fs.existsSync(filePath)) {
    console.error('File not found:', filePath);
    process.exit(1);
}

console.log('Reading about.html...');
const content = fs.readFileSync(filePath, 'utf8');
console.log('Length of file:', content.length);

// Let's find index of "band-container"
let index = -1;
while ((index = content.indexOf('band-container', index + 1)) !== -1) {
    console.log('\n--- Found band-container at index:', index);
    const start = Math.max(0, index - 200);
    const end = Math.min(content.length, index + 300);
    console.log(content.substring(start, end));
}

// Let's search for "Frame 28" or similar
console.log('\nSearching for "Frame 28"...');
let indexFrame = -1;
while ((indexFrame = content.indexOf('Frame 28', indexFrame + 1)) !== -1) {
    console.log('\n--- Found "Frame 28" at index:', indexFrame);
    const start = Math.max(0, indexFrame - 200);
    const end = Math.min(content.length, indexFrame + 300);
    console.log(content.substring(start, end));
}

// Check other mentions of data-layer
console.log('\nSearching for data-layer...');
let indexLayer = -1;
let count = 0;
while ((indexLayer = content.indexOf('data-layer', indexLayer + 1)) !== -1 && count < 10) {
    console.log('\n--- Found data-layer at index:', indexLayer);
    const start = Math.max(0, indexLayer - 100);
    const end = Math.min(content.length, indexLayer + 200);
    console.log(content.substring(start, end));
    count++;
}
