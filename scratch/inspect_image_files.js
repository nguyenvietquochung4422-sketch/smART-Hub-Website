const fs = require('fs');
const path = require('path');

const dir = 'assets/images/About/shll_effect';
if (fs.existsSync(dir)) {
    const files = fs.readdirSync(dir);
    console.log(`Found ${files.length} files in ${dir}:`);
    files.forEach(file => {
        const stats = fs.statSync(path.join(dir, file));
        console.log(`- ${file} (${stats.size} bytes)`);
    });
} else {
    console.log(`Directory ${dir} does not exist!`);
}
