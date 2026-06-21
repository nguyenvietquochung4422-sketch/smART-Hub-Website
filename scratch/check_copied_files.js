const fs = require('fs');
const path = require('path');

const dirs = [
    'assets/images/About',
    'assets/images/About/shll_effect',
    'assets/images/About/shll_effect1'
];

dirs.forEach(d => {
    console.log(`\n=== Listing ${d} ===`);
    if (fs.existsSync(d)) {
        const files = fs.readdirSync(d);
        console.log(`Found ${files.length} files:`);
        console.log(files.slice(0, 15));
    } else {
        console.log('Directory does not exist!');
    }
});
