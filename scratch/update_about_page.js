const fs = require('fs');

const filePath = 'pages/about.html';
if (!fs.existsSync(filePath)) {
    console.error('File not found:', filePath);
    process.exit(1);
}

console.log('Reading about.html...');
let html = fs.readFileSync(filePath, 'utf8');
console.log('Original size:', html.length, 'bytes');

// 1. Add custom CSS styles at the end of the <style> tag
const customStyles = `
        /* ── CUSTOM REFACTOR STYLES ── */
        /* Set model background to transparent so body background shows through */
        .Model {
            background: transparent !important;
            background-image: none !important;
        }
        /* Hide Figma background images */
        .NNBackgroundBA1, .NNBackgroundBA2, .NNBackgroundBA3 {
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

        /* Fixed Navigation Header from Package 1 */
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
            background-color: rgba(255, 255, 255, 0.25); 
        }
        .logo-right img { 
            height: 30px; 
            display: block; 
        }

        /* Footer styling at the bottom of the page */
        .footer-container {
            width: 100%;
            padding: 60px 10%;
            background-color: #0d211a;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
            font-family: 'Inter', sans-serif;
            z-index: 100;
            position: relative;
        }
        .footer-contact-header {
            display: flex;
            align-items: center;
            gap: 20px;
            margin-bottom: 30px;
        }
        .footer-contact-title {
            font-size: 18px;
            font-weight: 600;
            color: #ffffff;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        .footer-contact-line {
            flex-grow: 1;
            height: 1px;
            background-color: rgba(255, 255, 255, 0.15);
        }
        .footer-content-row {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            flex-wrap: wrap;
            gap: 30px;
        }
        .footer-left-col, .footer-right-col {
            display: flex;
            flex-direction: column;
            gap: 10px;
            max-width: 45%;
        }
        .footer-left-col .info-text {
            font-size: 13px;
            color: rgba(255, 255, 255, 0.6);
            font-weight: 300;
        }
        .footer-left-col .email-link {
            font-size: 18px;
            color: #ffffff;
            text-decoration: none;
            font-weight: 500;
            transition: color 0.3s;
        }
        .footer-left-col .email-link:hover {
            color: #d76a28;
        }
        .footer-right-col .brand-text {
            font-size: 14px;
            font-weight: 600;
            color: #ffffff;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        .footer-right-col .address-text {
            font-size: 12px;
            color: rgba(255, 255, 255, 0.6);
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

// Insert the custom CSS
const styleCloseTag = '</style>';
let styleIndex = html.indexOf(styleCloseTag);
if (styleIndex === -1) {
    console.error('Could not find </style> tag');
    process.exit(1);
}
html = html.substring(0, styleIndex) + customStyles + html.substring(styleIndex);
console.log('Injected custom styles.');

// 2. Add header after <body> tag
const headerHtml = `
    <div class="header-wrapper">
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
    </div>
`;
let bodyIndex = html.indexOf('<body>');
if (bodyIndex === -1) {
    console.error('Could not find <body> tag');
    process.exit(1);
}
html = html.substring(0, bodyIndex + 6) + headerHtml + html.substring(bodyIndex + 6);
console.log('Injected header.');

// 3. Add footer after the about-clip div container
const footerHtml = `
<footer class="footer-container">
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
</footer>
`;
const clipCloseTag = '</div><!-- /.about-clip -->';
let clipCloseIndex = html.indexOf(clipCloseTag);
if (clipCloseIndex === -1) {
    // Try matching without the comment
    const altTag = '</div>\r\n\r\n<script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>';
    const altTag2 = '</div>\n\n<script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>';
    clipCloseIndex = html.indexOf(altTag);
    if (clipCloseIndex === -1) {
        clipCloseIndex = html.indexOf(altTag2);
    }
    if (clipCloseIndex === -1) {
        console.error('Could not find end of about-clip container');
        process.exit(1);
    }
    html = html.substring(0, clipCloseIndex + 6) + footerHtml + html.substring(clipCloseIndex + 6);
} else {
    html = html.substring(0, clipCloseIndex + clipCloseTag.length) + footerHtml + html.substring(clipCloseIndex + clipCloseTag.length);
}
console.log('Injected footer.');

// 4. Replace content for data-layer="Frame 28" with index1 animated boxes
// Look for where class="ShllEffect" starts inside Frame 28
const shllEffectTag = '<div data-layer="SHLL effect" class="ShllEffect"';
let shllEffectStartIndex = html.indexOf(shllEffectTag);
if (shllEffectStartIndex === -1) {
    console.error('Could not find class="ShllEffect" tag');
    process.exit(1);
}

// Find the matching closing </div> of ShllEffect
let openDivs = 1;
let pos = html.indexOf('>', shllEffectStartIndex) + 1;
let shllEffectEndIndex = pos;
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
        shllEffectEndIndex = pos;
    }
}

const replacementShllEffect = `
      <div data-layer="SHLL effect" class="ShllEffect" style="width: 500px; height: 500px; position: relative; opacity: 0.45; box-shadow: 9px 9px 9px; filter: blur(4.50px); transform: scale(0.706); transform-origin: center;">
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
`;

html = html.substring(0, shllEffectStartIndex) + replacementShllEffect + html.substring(shllEffectEndIndex);
console.log('Replaced Frame 28 content with index1 animated boxes.');

// 5. Shorten canvas height in the JavaScript resizing block (prevent empty spacing at the bottom of the page)
html = html.replace('var nw = 1874, nh = 6965;', 'var nw = 1874, nh = 6800;');
console.log('Adjusted canvas height nh to 6800 in script.');

// Write the changes back to pages/about.html
console.log('Writing changes back to pages/about.html...');
fs.writeFileSync(filePath, html, 'utf8');
console.log('Successfully updated pages/about.html! New size:', html.length, 'bytes.');
