const fs = require('fs');

const paths = [
    'assets/images/shll_effect_1.png',
    'assets/shll_effect_1.png',
    'pages/assets/images/shll_effect_1.png',
    'assets/images/About/shll_effect_1.png',
];

paths.forEach(p => {
    console.log(`Checking ${p}:`, fs.existsSync(p));
});
