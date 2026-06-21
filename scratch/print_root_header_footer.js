const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');

function extractTagContent(searchStr) {
    let index = html.indexOf(searchStr);
    if (index === -1) {
        console.log(`Tag containing ${searchStr} not found`);
        return;
    }
    let openDivs = 1;
    let pos = html.indexOf('>', index) + 1;
    let tagEnd = pos;
    // Look at the tag name
    let isFooter = searchStr.includes('<footer');
    let openTag = isFooter ? '<footer' : '<div';
    let closeTag = isFooter ? '</footer>' : '</div>';
    
    while (openDivs > 0 && pos < html.length) {
        let nextOpen = html.indexOf(openTag, pos);
        let nextClose = html.indexOf(closeTag, pos);
        if (nextClose === -1) break;
        if (nextOpen !== -1 && nextOpen < nextClose) {
            openDivs++;
            pos = nextOpen + openTag.length;
        } else {
            openDivs--;
            pos = nextClose + closeTag.length;
            tagEnd = pos;
        }
    }
    console.log(html.substring(index, tagEnd));
}

console.log('=== HEADER FROM INDEX.HTML ===');
extractTagContent('<div class="header-wrapper"');

console.log('\n=== FOOTER FROM INDEX.HTML ===');
extractTagContent('<footer class="footer-container"');
