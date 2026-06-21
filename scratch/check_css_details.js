const fs = require('fs');
const html = fs.readFileSync('pages/about.html', 'utf8');

// Find the style block content
const startTag = '<style>';
const endTag = '</style>';
const startIdx = html.indexOf(startTag);
const endIdx = html.indexOf(endTag, startIdx);

if (startIdx !== -1 && endIdx !== -1) {
    const styleContent = html.substring(startIdx + startTag.length, endIdx);
    console.log('Total style length:', styleContent.length);

    // Split style content into rules
    // A rule is roughly text followed by { }
    const rules = styleContent.split('}');
    console.log('Number of CSS rules:', rules.length);

    console.log('--- RULES CONTAINING border ---');
    rules.forEach(rule => {
        if (rule.toLowerCase().includes('border') && !rule.toLowerCase().includes('border-radius')) {
            console.log(rule.trim() + '}');
        }
    });

    console.log('--- RULES CONTAINING box-shadow ---');
    rules.forEach(rule => {
        if (rule.toLowerCase().includes('box-shadow') || rule.toLowerCase().includes('shadow')) {
            console.log(rule.trim() + '}');
        }
    });

    console.log('--- RULES CONTAINING outline ---');
    rules.forEach(rule => {
        if (rule.toLowerCase().includes('outline')) {
            console.log(rule.trim() + '}');
        }
    });
} else {
    console.log('Style block not found');
}
