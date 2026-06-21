const fs = require('fs');
const html = fs.readFileSync('pages/about.html', 'utf8');

console.log('--- INSPECTING HOVER BAND CHILDREN ---');

// Let's find each shll-band-interactive and show its content (up to next div close or similar)
let searchIdx = 0;
while (true) {
    const idx = html.indexOf('class="shll-band-interactive"', searchIdx);
    if (idx === -1) break;

    console.log(`\nFound band at index ${idx}:`);
    const slice = html.substring(idx - 100, idx + 1000);
    console.log(slice);

    // Let's search inside this slice for inline style styles containing box-shadow or border
    const inlineStyleRegex = /style="([^"]*)"/gi;
    let match;
    while ((match = inlineStyleRegex.exec(slice)) !== null) {
        const style = match[1];
        if (style.includes('box-shadow') || style.includes('border') || style.includes('shadow')) {
            console.log('  -> MATCHED STYLE:', style);
        }
    }

    searchIdx = idx + 1;
    if (searchIdx >= html.length) break;
}
