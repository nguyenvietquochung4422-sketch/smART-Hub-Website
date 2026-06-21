const fs = require('fs');

const filePath = 'pages/about.html';
if (!fs.existsSync(filePath)) {
    console.error('File not found:', filePath);
    process.exit(1);
}

console.log('Reading about.html...');
let html = fs.readFileSync(filePath, 'utf8');
console.log('Original size:', html.length, 'bytes');

// 1. Replace the CSS style block (everything from /* ── CUSTOM REFACTOR STYLES ── */ to </style>)
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
        /* Set background_about.jpg as background image for the page */
        .Model {
            background-image: url('../assets/images/About/background_about.jpg') !important;
            background-size: cover !important;
            background-position: center !important;
            background-repeat: no-repeat !important;
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
console.log('Updated Custom style overrides and Package 1 header/footer styling.');

// 2. Update Header HTML to match Package 1
const headerStartIdx = html.indexOf('<div class="header-wrapper">');
if (headerStartIdx === -1) {
    console.error('Could not find header wrapper in HTML');
    process.exit(1);
}
let headerEndIdx = html.indexOf('</div>', headerStartIdx);
// Let's count matching divs to find end of header-wrapper
let openDivs = 1;
let pos = headerStartIdx + 28;
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
        headerEndIdx = pos;
    }
}

const newHeaderHtml = `    <div class="header-wrapper">
        <div class="header-top-frame">
            <div class="logo-left">
                <a href="../index.html"><img src="../assets/images/Logo_SHLL_long.png" alt="SHL Logo"></a>
            </div>
            <div class="header-middle">
                <div class="horizontal-line"></div>
            </div>
            <div class="logo-right">
                <a href="../index.html"><img src="../assets/images/index/logo1.png" alt="UEH" style="height: 30px; width: auto; display: block;"></a>
            </div>
        </div>
    </div>`;

html = html.substring(0, headerStartIdx) + newHeaderHtml + html.substring(headerEndIdx);
console.log('Standardized header HTML to Package 1.');

// 3. Update Footer HTML to match Package 1
const footerStartIdx = html.indexOf('<footer class="footer-container">');
if (footerStartIdx === -1) {
    console.error('Could not find footer container in HTML');
    process.exit(1);
}
let footerEndIdx = html.indexOf('</footer>', footerStartIdx) + 9;

const newFooterHtml = `<footer class="footer-container">
    <div class="footer-contact-header">
        <span class="footer-contact-title">Contact</span>
        <div class="footer-contact-line"></div>
    </div>
    <div class="footer-content-row">
        <div class="footer-left-col">
            <span class="info-text">For more information of the smART Hub Living Labs.</span>
            <a href="mailto:smarthub@ueh.edu.vn" class="email-link">smarthub@ueh.edu.vn</a>
        </div>
        <div class="footer-right-col">
            <span class="brand-text">smART HUB Living Labs</span>
            <span class="address-text">UEH, Campus V 232/6 Vo Thi Sau, Xuan Hoa Ward, Ho Chi Minh City.</span>
        </div>
    </div>
</footer>`;

html = html.substring(0, footerStartIdx) + newFooterHtml + html.substring(footerEndIdx);
console.log('Standardized footer HTML to Package 1.');

// 4. Index 2 issue: Remove the larger outer giving-n-effect animation from inside GIVING TO UEH text layer
// Look for giving-n-effect inside class="GivingToUeh"
const givingToUehIndex = html.indexOf('class="GivingToUeh"');
if (givingToUehIndex === -1) {
    console.error('Could not find class="GivingToUeh"');
    process.exit(1);
}
// Find the giving-n-effect inside it
const givingNEffectIndex = html.indexOf('<div class="giving-n-effect">', givingToUehIndex);
if (givingNEffectIndex !== -1) {
    // Find matching close div of giving-n-effect
    let openDivs = 1;
    let pos = givingNEffectIndex + 29;
    let givingNEffectEndIndex = pos;
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
            givingNEffectEndIndex = pos;
        }
    }
    html = html.substring(0, givingNEffectIndex) + html.substring(givingNEffectEndIndex);
    console.log('Successfully removed the larger outer N-logo (giving-n-effect) animation.');
} else {
    console.log('Larger outer N-logo (giving-n-effect) already removed or not found.');
}

// 5. Index 2 issue: Make the smaller animation inside Frame 28 fit perfectly and match the blur effect
// Find the ShllEffect block inside Frame 28
const shllEffectTag = '<div data-layer="SHLL effect" class="ShllEffect"';
let shllEffectStartIndex = html.indexOf(shllEffectTag);
if (shllEffectStartIndex === -1) {
    console.error('Could not find ShllEffect tag');
    process.exit(1);
}

// Find matching close div of ShllEffect
let openDivsShll = 1;
let posShll = html.indexOf('>', shllEffectStartIndex) + 1;
let shllEffectEndIndex = posShll;
while (openDivsShll > 0 && posShll < html.length) {
    let nextOpen = html.indexOf('<div', posShll);
    let nextClose = html.indexOf('</div>', posShll);
    if (nextClose === -1) break;
    if (nextOpen !== -1 && nextOpen < nextClose) {
        openDivsShll++;
        posShll = nextOpen + 4;
    } else {
        openDivsShll--;
        posShll = nextClose + 6;
        shllEffectEndIndex = posShll;
    }
}

const replacementShllEffect = `
      <div data-layer="SHLL effect" class="ShllEffect" style="width: 353px; height: 353px; position: relative; opacity: 0.45; box-shadow: 9px 9px 9px; filter: blur(4.50px); overflow: visible;">
        <div style="width: 500px; height: 500px; position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%) scale(0.706); transform-origin: center;">
          <div class="rect-box-index1 rect-99-idx1"></div>
          <div class="rect-box-index1 rect-100-idx1"></div>
          <div class="rect-box-index1 rect-101-idx1"></div>
          <div class="rect-box-index1 rect-102-idx1"></div>
          <div class="rect-box-index1 rect-103-idx1"></div>
          <div class="rect-box-index1 rect-104-idx1"></div>
          <div class="rect-box-index1 rect-105-idx1"></div>
          <div class="rect-box-index1 rect-106-idx1"></div>
          <div class="rect-box-index1 rect-107-idx1"></div>
          <div class="rect-box-index1 rect-108-idx1"></div>
        </div>
      </div>
`;

html = html.substring(0, shllEffectStartIndex) + replacementShllEffect + html.substring(shllEffectEndIndex);
console.log('Fitted the smaller N-logo animation inside Frame 28 perfectly and matched the y-index/blur effect.');

// Write changes back to pages/about.html
console.log('Writing updates back to pages/about.html...');
fs.writeFileSync(filePath, html, 'utf8');
console.log('Successfully completed about.html update! New size:', html.length, 'bytes.');
