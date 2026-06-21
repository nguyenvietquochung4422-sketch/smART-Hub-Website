const fs = require('fs');

const filePath = 'pages/about.html';
const content = fs.readFileSync(filePath, 'utf8');

function extractTagContent(html, searchStr) {
    let index = 0;
    while ((index = html.indexOf(searchStr, index)) !== -1) {
        console.log('\n=========================================');
        console.log('Found tag containing:', searchStr, 'at index', index);
        // Find the start of the tag <div
        let tagStart = html.lastIndexOf('<div', index);
        // Let's parse matching div tag
        let openDivs = 1;
        let pos = html.indexOf('>', index) + 1;
        let tagEnd = pos;
        while (openDivs > 0 && pos < html.length) {
            let nextOpen = html.indexOf('<div', pos);
            let nextClose = html.indexOf('</div>', pos);
            if (nextClose === -1) break;
            if (nextOpen !== -1 && nextOpen < nextClose) {
                openDivs++;
                pos = nextOpen + 4;
            } else {
                openDivs--;
                pos = nextClose + 6;
                tagEnd = pos;
            }
        }
        console.log(html.substring(tagStart, tagEnd));
        index = tagEnd;
    }
}

console.log('--- Analyzing band-container tags ---');
extractTagContent(content, 'class="band-container"');

console.log('\n--- Analyzing Frame 28 tag ---');
extractTagContent(content, 'data-layer="Frame 28"');
