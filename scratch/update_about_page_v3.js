const fs = require('fs');

const filePath = 'pages/about.html';
if (!fs.existsSync(filePath)) {
    console.error('File not found:', filePath);
    process.exit(1);
}

console.log('Reading about.html...');
let html = fs.readFileSync(filePath, 'utf8');
console.log('Original size:', html.length, 'bytes');

// 1. Replace the CSS style block to move background to body and update base colors
const customStyleStartKeyword = '/* ── CUSTOM REFACTOR STYLES ── */';
const customStyleStartIndex = html.indexOf(customStyleStartKeyword);
if (customStyleStartIndex === -1) {
    console.error('Could not find custom style start keyword');
    process.exit(1);
}

const customStyleEndIndex = html.indexOf('</style>', customStyleStartIndex);
if (customStyleEndIndex === -1) {
    console.error('Could not find </style> tag after custom style start');
    process.exit(1);
}

const newCustomStyles = `/* ── CUSTOM REFACTOR STYLES ── */
        /* Set background_about.jpg as background image on body so it flows under the footer */
        body {
            background-image: url('../assets/images/About/background_about.jpg') !important;
            background-size: 100% 100% !important;
            background-position: center !important;
            background-repeat: no-repeat !important;
            background-attachment: scroll !important;
            background-color: #0d211a !important; /* Standard dark forest green */
        }
        .Model {
            background: transparent !important;
            background-image: none !important;
        }
        /* Hide Figma background image elements */
        .NNBackgroundBA1, .NNBackgroundBA2, .NNBackgroundBA3 {
            display: none !important;
        }

        /* Hide overlapping static SHLL effect elements in index */
        .HiUNgShll, .Frame194, .Frame27 {
            display: none !important;
        }

        /* Hide Figma Header Layers */
        .Rectangle114, .Image38, .Vector1, .LogoUehTrNg1, .LogoSu1, .Home {
            display: none !important;
        }
        /* Hide Figma Footer Layers */
        .Vector2, .SmarthubUehEduVn, .SmartHubLivingLabsUehCampusV2326VoThiSauXuanHoaWardHoChiMinhCity, .ForMoreInformationOfTheSmartHubLivingLabs, .Contact {
            display: none !important;
        }

        /* Outline header styles as per typography requirement */
        .our-history-heading {
            font-size: 128px;
            font-family: 'Inter', sans-serif;
            font-weight: 700;
            line-height: 185.60px;
            letter-spacing: 19.20px;
            word-wrap: break-word;
            color: transparent !important;
            -webkit-text-stroke: 2px rgba(255, 255, 255, 0.85) !important;
            text-stroke: 2px rgba(255, 255, 255, 0.85) !important;
            text-shadow: none !important;
        }
        .procedure-model-heading {
            font-size: 70px;
            font-family: 'Inter', sans-serif;
            font-weight: 700;
            line-height: 101.50px;
            letter-spacing: 12.60px;
            word-wrap: break-word;
            color: transparent !important;
            -webkit-text-stroke: 1.8px rgba(255, 255, 255, 0.85) !important;
            text-stroke: 1.8px rgba(255, 255, 255, 0.85) !important;
            text-shadow: none !important;
        }
        .Operation {
            color: transparent !important;
            -webkit-text-stroke: 1px rgba(255, 255, 255, 0.85) !important;
            text-stroke: 1px rgba(255, 255, 255, 0.85) !important;
            text-shadow: none !important;
        }
        .OurMission {
            color: transparent !important;
            -webkit-text-stroke: 1.2px rgba(255, 255, 255, 0.85) !important;
            text-stroke: 1.2px rgba(255, 255, 255, 0.85) !important;
            text-shadow: none !important;
        }

        /* Update SHLL Effect 1 images to point to individual image files instead of missing sprite sheet */
        .image-149 { background-image: url('../assets/images/About/shll_effect/image 149.png') !important; background-size: cover !important; background-position: center !important; }
        .image-150 { background-image: url('../assets/images/About/shll_effect/image 150.png') !important; background-size: cover !important; background-position: center !important; }
        .image-151 { background-image: url('../assets/images/About/shll_effect/image 151.png') !important; background-size: cover !important; background-position: center !important; }
        .image-154 { background-image: url('../assets/images/About/shll_effect/image 154.png') !important; background-size: cover !important; background-position: center !important; }
        .image-156 { background-image: url('../assets/images/About/shll_effect/image 156.png') !important; background-size: cover !important; background-position: center !important; }
        .image-157 { background-image: url('../assets/images/About/shll_effect/image 157.png') !important; background-size: cover !important; background-position: center !important; }
        .image-158 { background-image: url('../assets/images/About/shll_effect/image 158.png') !important; background-size: cover !important; background-position: center !important; }
        .image-159 { background-image: url('../assets/images/About/shll_effect/image 159.png') !important; background-size: cover !important; background-position: center !important; }
        .image-160 { background-image: url('../assets/images/About/shll_effect/image 160.png') !important; background-size: cover !important; background-position: center !important; }
        .image-161 { background-image: url('../assets/images/About/shll_effect/image 161.png') !important; background-size: cover !important; background-position: center !important; }
        .image-162 { background-image: url('../assets/images/About/shll_effect/image 162.png') !important; background-size: cover !important; background-position: center !important; }
        .image-163 { background-image: url('../assets/images/About/shll_effect/image 163.png') !important; background-size: cover !important; background-position: center !important; }
        .image-164 { background-image: url('../assets/images/About/shll_effect/image 164.png') !important; background-size: cover !important; background-position: center !important; }
        .image-165 { background-image: url('../assets/images/About/shll_effect/image 165.png') !important; background-size: cover !important; background-position: center !important; }
        .image-166 { background-image: url('../assets/images/About/shll_effect/image 166.png') !important; background-size: cover !important; background-position: center !important; }
        .image-167 { background-image: url('../assets/images/About/shll_effect/image 167.png') !important; background-size: cover !important; background-position: center !important; }
        .image-168 { background-image: url('../assets/images/About/shll_effect/image 168.png') !important; background-size: cover !important; background-position: center !important; }
        .image-169 { background-image: url('../assets/images/About/shll_effect/image 169.png') !important; background-size: cover !important; background-position: center !important; }
        .image-170 { background-image: url('../assets/images/About/shll_effect/image 170.png') !important; background-size: cover !important; background-position: center !important; }
        .image-171 { background-image: url('../assets/images/About/shll_effect/image 171.png') !important; background-size: cover !important; background-position: center !important; }
        .image-172 { background-image: url('../assets/images/About/shll_effect/image 172.png') !important; background-size: cover !important; background-position: center !important; }

        /* Update SHLL Effect 2 (Giving N animation) paths */
        .giving-n-effect .rect-99  { background-image: url('../assets/images/About/shll_effect1/Rectangle 99.png') !important; }
        .giving-n-effect .rect-100 { background-image: url('../assets/images/About/shll_effect1/Rectangle 100.png') !important; }
        .giving-n-effect .rect-101 { background-image: url('../assets/images/About/shll_effect1/Rectangle 101.png') !important; }
        .giving-n-effect .rect-102 { background-image: url('../assets/images/About/shll_effect1/Rectangle 102.png') !important; }
        .giving-n-effect .rect-103 { background-image: url('../assets/images/About/shll_effect1/Rectangle 103.png') !important; }
        .giving-n-effect .rect-104 { background-image: url('../assets/images/About/shll_effect1/Rectangle 104.png') !important; }
        .giving-n-effect .rect-105 { background-image: url('../assets/images/About/shll_effect1/Rectangle 105.png') !important; }
        .giving-n-effect .rect-106 { background-image: url('../assets/images/About/shll_effect1/Rectangle 106.png') !important; }
        .giving-n-effect .rect-107 { background-image: url('../assets/images/About/shll_effect1/Rectangle 107.png') !important; }
        .giving-n-effect .rect-108 { background-image: url('../assets/images/About/shll_effect1/Rectangle 108.png') !important; }

        /* Styles for index1 / Frame 28 animation block */
        .rect-box-index1 {
            position: absolute;
            background-color: #FFFFFF;
            background-size: cover;
            background-position: center;
            border-radius: 20px;
            z-index: 2;
            animation-duration: 24s;
            animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
            animation-iteration-count: infinite;
            filter: blur(4.50px) !important; /* Ensure consistent blur for the white graphic elements */
        }
        .rect-99-idx1  { background-image: url('../assets/images/About/shll_effect1/Rectangle 99.png'); animation-name: anim99; }
        .rect-100-idx1 { background-image: url('../assets/images/About/shll_effect1/Rectangle 100.png'); animation-name: anim100; }
        .rect-101-idx1 { background-image: url('../assets/images/About/shll_effect1/Rectangle 101.png'); animation-name: anim101; }
        .rect-102-idx1 { background-image: url('../assets/images/About/shll_effect1/Rectangle 102.png'); animation-name: anim102; }
        .rect-103-idx1 { background-image: url('../assets/images/About/shll_effect1/Rectangle 103.png'); animation-name: anim103; }
        .rect-104-idx1 { background-image: url('../assets/images/About/shll_effect1/Rectangle 104.png'); animation-name: anim104; }
        .rect-105-idx1 { background-image: url('../assets/images/About/shll_effect1/Rectangle 105.png'); animation-name: anim105; }
        .rect-106-idx1 { background-image: url('../assets/images/About/shll_effect1/Rectangle 106.png'); animation-name: anim106; }
        .rect-107-idx1 { background-image: url('../assets/images/About/shll_effect1/Rectangle 107.png'); animation-name: anim107; }
        .rect-108-idx1 { background-image: url('../assets/images/About/shll_effect1/Rectangle 108.png'); animation-name: anim108; }

        /* Exact Navigation Header & Footer Styles from Package 1 */
        .header-wrapper, .footer-container {
            font-family: 'Inter', sans-serif !important;
        }
        .header-wrapper { 
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            padding: 20px 2% 15px 2%; 
            display: flex; 
            flex-direction: column;
            z-index: 1000;
            background: transparent !important;
            backdrop-filter: none !important;
            -webkit-backdrop-filter: none !important;
        }
        .header-top-frame { 
            display: flex; 
            align-items: center; 
            gap: 20px; 
            width: 100%; 
        }
        .logo-left img { 
            height: 30px; 
            display: block; 
        }
        .header-middle { 
            flex-grow: 1; 
            display: flex; 
            flex-direction: column; 
        }
        .horizontal-line { 
            width: 100%; 
            height: 1px; 
            background-color: rgba(14, 59, 102, 0.15); 
        }
        .logo-right { 
            display: flex;
            align-items: center; 
        }
        .logo-right img { 
            height: 30px; 
            display: block; 
        }

        .footer-container { 
            border-top: none;
            padding: 40px 2% 60px 2%; 
            margin-top: 40px;
            position: relative;
            z-index: 10;
            background: transparent !important;
            color: var(--pkg-blue, #0E3B66);
            width: 100%;
        }
        .footer-contact-header {
            display: flex;
            align-items: center;
            gap: 20px;
            margin-bottom: 25px;
        }
        .footer-contact-title {
            font-size: 14px;
            font-weight: 700;
            color: var(--pkg-blue, #0E3B66);
            letter-spacing: 0.5px;
        }
        .footer-contact-line {
            flex-grow: 1;
            height: 1px;
            background-color: rgba(14, 59, 102, 0.15);
        }
        .footer-content-row {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            flex-wrap: wrap;
            gap: 30px;
        }
        .footer-left-col {
            display: flex;
            flex-direction: column;
            gap: 10px;
            text-align: left;
            max-width: 50%;
        }
        .footer-left-col .info-text {
            font-size: 11px;
            font-style: italic;
            color: #555555;
            font-weight: 300;
            line-height: 1.6;
        }
        .footer-left-col .email-link {
            font-size: 11px;
            color: var(--pkg-blue, #0E3B66);
            text-decoration: none;
            font-weight: 500;
            transition: color 0.2s ease;
        }
        .footer-left-col .email-link:hover {
            color: var(--pkg-gold, #C09553);
            text-decoration: underline;
        }
        .footer-right-col {
            display: flex;
            flex-direction: column;
            gap: 10px;
            text-align: right;
            max-width: 50%;
        }
        .footer-right-col .brand-text {
            font-size: 11px;
            font-weight: 600;
            color: var(--pkg-blue, #0E3B66);
            letter-spacing: 0.5px;
        }
        .footer-right-col .address-text {
            font-size: 11px;
            color: #555555;
            font-weight: 300;
            line-height: 1.6;
        }
        @media (max-width: 768px) {
            .footer-left-col, .footer-right-col {
                max-width: 100%;
            }
            .footer-right-col {
                text-align: left;
            }
        }
`;

html = html.substring(0, customStyleStartIndex) + newCustomStyles + html.substring(customStyleEndIndex);
console.log('Updated Custom style overrides: Moved background to body, set Model background to transparent, added explicit blur to rect-box-index1.');

// 2. Change the default body background color from #0d3325 to #0d211a in the html/body stylesheet definition
html = html.replace(
    "html,body{margin:0;padding:0;overflow-x:hidden;max-width:100vw;font-family:'Inter',sans-serif;background:#0d3325;}",
    "html,body{margin:0;padding:0;overflow-x:hidden;max-width:100vw;font-family:'Inter',sans-serif;background:#0d211a;}"
);
console.log('Updated html,body default background color to standard project color #0d211a.');

// 3. Remove box-shadow inline style dynamically from .shll-band-interactive elements
const bandCountBefore = (html.match(/class="shll-band-interactive"/g) || []).length;
html = html.replace(/<div class="shll-band-interactive" style="([^"]*)">/g, (match, styleContent) => {
    const cleanedStyle = styleContent.replace(/box-shadow:[^;]+;?\s*/g, '');
    return `<div class="shll-band-interactive" style="${cleanedStyle}">`;
});
console.log(`Cleaned box-shadow styles dynamically for ${bandCountBefore} shll-band-interactive elements.`);

// 4. Remove box-shadow inline style dynamically from ShllEffect inside Frame 28 (Index 1 / index1)
html = html.replace(/<div data-layer="SHLL effect" class="ShllEffect" style="([^"]*)">/g, (match, styleContent) => {
    const cleanedStyle = styleContent.replace(/box-shadow:[^;]+;?\s*/g, '');
    return `<div data-layer="SHLL effect" class="ShllEffect" style="${cleanedStyle}">`;
});
console.log('Removed box-shadow from ShllEffect elements dynamically.');

// Write the changes back to pages/about.html
console.log('Writing updates back to pages/about.html...');
fs.writeFileSync(filePath, html, 'utf8');
console.log('Successfully completed about.html updates! New size:', html.length, 'bytes.');
