const fs = require('fs');
const path = require('path');

const transcriptPath = `C:\\Users\\Admin\\.gemini\\antigravity-ide\\brain\\011f7fca-851d-4d45-8975-1e584f503f47\\.system_generated\\logs\\transcript.jsonl`;
const outputPath = `c:\\Users\\Admin\\Documents\\GitHub\\smART-Hub-Website\\shll-effect.html`;

if (!fs.existsSync(transcriptPath)) {
    console.error("Transcript file not found!");
    process.exit(1);
}

const content = fs.readFileSync(transcriptPath, 'utf8');
const lines = content.split('\n');

let base64_image2 = ""; // from input #3
let base64_image3 = ""; // from input #5 (current request)

lines.forEach((line) => {
    if (!line.trim()) return;
    try {
        const data = JSON.parse(line);
        if (data.type === "USER_INPUT") {
            const text = data.content || "";
            const regex = /xlink:href="data:image\/png;base64,([^"]+)"/g;
            let match;
            while ((match = regex.exec(text)) !== null) {
                const b64 = match[1].replace(/\\n/g, '').replace(/\\r/g, '').trim();
                if (text.includes("pattern0_850_265")) {
                    base64_image2 = b64;
                } else if (text.includes("pattern0_818_670")) {
                    base64_image3 = b64;
                }
            }
        }
    } catch (e) {}
});

if (!base64_image2 || !base64_image3) {
    console.error("Could not extract both base64 images from transcript.");
    process.exit(1);
}

const htmlContent = `<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SHLL Interactive Effect</title>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600&display=swap" rel="stylesheet">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        html, body {
            width: 100%;
            height: 100%;
            background-color: #0d211a; /* Dark forest green backdrop as original */
            overflow: hidden;
            position: relative;
            font-family: 'Outfit', sans-serif;
        }

        /* Full screen premium overlay mesh & lighting */
        .glass-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: 
                radial-gradient(circle at 10% 20%, rgba(0, 242, 195, 0.05) 0%, transparent 40%),
                radial-gradient(circle at 90% 80%, rgba(0, 180, 216, 0.05) 0%, transparent 40%);
            pointer-events: none;
            z-index: 1;
        }

        /* SVG 1: Logo SHLL (92x107) - position absolute to body */
        .svg-logo {
            position: absolute;
            width: 92px;
            height: 107px;
            top: 217px;
            left: -436px;
            transform: rotate(-180deg);
            opacity: 1;
            z-index: 9999;
            transition: left 0.8s cubic-bezier(0.25, 1, 0.5, 1);
            filter: drop-shadow(0 0 10px rgba(0, 242, 195, 0.2));
        }

        /* SVG 2: New Image (265x166) - position absolute to body */
        .svg-new-img {
            position: absolute;
            width: 265px;
            height: 166px;
            top: 188px;
            left: -209px;
            transform: rotate(0deg);
            opacity: 1;
            z-index: 9998;
            transition: all 0.8s cubic-bezier(0.25, 1, 0.5, 1);
            filter: drop-shadow(0 0 12px rgba(0, 242, 195, 0.15));
        }

        /* Trigger movements when hovering over the body */
        body:hover .svg-logo {
            left: -5px;
        }

        body:hover .svg-new-img {
            top: 184px;
            left: 331px;
        }

        /* Centered aesthetic interface elements */
        .branding-container {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            text-align: center;
            pointer-events: none;
            z-index: 2;
        }

        .title {
            font-size: 2.5rem;
            font-weight: 300;
            letter-spacing: 8px;
            color: #ffffff;
            text-transform: uppercase;
            text-shadow: 0 0 20px rgba(255, 255, 255, 0.05);
            margin-bottom: 12px;
        }

        .subtitle {
            font-size: 0.95rem;
            font-weight: 400;
            letter-spacing: 5px;
            color: #00f2c3;
            text-transform: uppercase;
            opacity: 0.8;
        }

        /* Hint instruction at the bottom */
        .hint-text {
            position: absolute;
            bottom: 40px;
            left: 50%;
            transform: translateX(-50%);
            font-size: 0.8rem;
            letter-spacing: 3px;
            color: rgba(255, 255, 255, 0.4);
            text-transform: uppercase;
            transition: all 0.4s ease;
            z-index: 5;
            pointer-events: none;
        }

        body:hover .hint-text {
            color: #00f2c3;
            text-shadow: 0 0 10px rgba(0, 242, 195, 0.5);
            opacity: 0.8;
        }
    </style>
</head>
<body>

    <div class="glass-overlay"></div>

    <!-- SVG 1: Logo SHLL (92x107, matrix mirrored, using inline base64) -->
    <svg class="svg-logo" viewBox="0 0 92 107" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <rect width="92" height="107" transform="matrix(-1 0 0 1 92 0)" fill="url(#pattern0_850_265)"/>
        <defs>
            <pattern id="pattern0_850_265" patternContentUnits="objectBoundingBox" width="1" height="1">
                <use xlink:href="#image0_850_265" transform="matrix(0.00303446 0 0 0.00261005 -6.4496 -0.42053)"/>
            </pattern>
            <image id="image0_850_265" width="2455" height="498" preserveAspectRatio="none" xlink:href="data:image/png;base64,${base64_image2}"/>
        </defs>
    </svg>

    <!-- SVG 2: New Image (265x166, using inline base64) -->
    <svg class="svg-new-img" viewBox="0 0 265 166" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <rect width="265" height="166" fill="url(#pattern0_818_670)"/>
        <defs>
            <pattern id="pattern0_818_670" patternContentUnits="objectBoundingBox" width="1" height="1">
                <use xlink:href="#image0_818_670" transform="matrix(0.00186423 0 0 0.00297043 0.0500229 0.0461065)"/>
            </pattern>
            <image id="image0_818_670" width="2261" height="305" preserveAspectRatio="none" xlink:href="data:image/png;base64,${base64_image3}"/>
        </defs>
    </svg>

    <!-- Branding Context -->
    <div class="branding-container">
        <h1 class="title">SHLL Effect</h1>
        <p class="subtitle">Interactive Showcase</p>
    </div>

    <div class="hint-text">Rê chuột vào màn hình để kích hoạt hiệu ứng</div>

</body>
</html>
`;

fs.writeFileSync(outputPath, htmlContent, 'utf8');
console.log("Successfully generated shll-effect.html at", outputPath);
