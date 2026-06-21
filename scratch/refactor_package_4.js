const fs = require('fs');

const originalPath = 'c:/Users/Admin/Documents/GitHub/smART-Hub-Website/pages/package-4/index.html';
const content = fs.readFileSync(originalPath, 'utf8');

// Step 1: Extract all inline base64 image sources
const imgTags = content.match(/<img[^>]+>/g) || [];
const base64Map = {};
for (const tag of imgTags) {
    const classMatch = tag.match(/class="([^"]+)"/);
    const srcMatch = tag.match(/src="([^"]+)"/);
    if (classMatch && srcMatch) {
        base64Map[classMatch[1]] = srcMatch[1];
    }
}

// Check extracted assets
console.log('Extracted assets:', Object.keys(base64Map));

// Step 2: Define the responsive template
const newHtml = `<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Package 4 - Art for All</title>
    
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">

    <style>
        :root {
            --pkg-green: #104431;
            --pkg-yellow: #EFF8CF;
            --bg-dark: #104431;
            --text-white: #FFFFFF;
            --text-dark: #333333;
            --pkg-gold: #C09553;
        }

        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body {
            background-color: var(--bg-dark);
            font-family: 'Inter', sans-serif;
            color: var(--text-white);
            overflow-x: hidden;
            position: relative;
        }

        /* --- 1. HEADER --- */
        .header-wrapper { 
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            padding: 20px 4% 15px 4%; 
            display: flex; 
            flex-direction: column; 
            background: transparent !important;
            backdrop-filter: none !important;
            -webkit-backdrop-filter: none !important;
            z-index: 1000;
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
            background-color: rgba(255, 255, 255, 0.15); 
        }
        .logo-right { 
            display: flex;
            align-items: center; 
        }

        /* --- 2. LIGHTBOX --- */
        #global-lightbox { 
            position: fixed; 
            top: 0; 
            left: 0; 
            width: 100%; 
            height: 100%; 
            background: rgba(16, 68, 49, 0.95); 
            display: none; 
            justify-content: center; 
            align-items: center; 
            z-index: 10000; 
            cursor: zoom-out; 
            backdrop-filter: blur(8px); 
        }
        #global-lightbox img { 
            width: 550px; 
            max-width: 90%; 
            border-radius: 15px; 
            border: 4px solid white; 
            animation: zoomIn 0.3s ease; 
        }
        @keyframes zoomIn { 
            from { transform: scale(0.8); opacity: 0; } 
            to { transform: scale(1); opacity: 1; } 
        }

        /* --- 3. MAIN CONTAINER --- */
        main {
            padding-top: 100px;
            width: 100%;
            position: relative;
            z-index: 1;
        }

        /* --- 4. GRID CONTAINER (Mobile-First Stacking) --- */
        .grid-container {
            display: flex;
            flex-direction: column;
            gap: 30px;
            padding: 40px 6%;
            position: relative;
        }
        .grid-container .bg-decor {
            display: none;
        }
        
        .art-title-box {
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        .all-text-box {
            display: flex;
            justify-content: center;
        }

        /* Hero Text Styling */
        .art-text, .for-text {
            font-family: 'Montserrat', sans-serif;
            font-weight: 900;
            color: transparent !important;
            -webkit-text-stroke: 1.5px rgba(255, 255, 255, 0.85);
            text-align: center;
            font-size: clamp(60px, 14vw, 207px);
            line-height: 1.0;
        }
        .all-text {
            font-family: 'Montserrat', sans-serif;
            font-weight: 900;
            color: #ffffff;
            text-align: center;
            font-size: clamp(60px, 12vw, 159px);
            line-height: 1.0;
        }

        /* Section Headings */
        .section-header-item {
            display: flex;
            align-items: center;
            gap: 20px;
            color: #ffffff;
        }
        .section-header-item h2 {
            font-family: 'Montserrat', sans-serif;
            font-size: clamp(32px, 5.5vw, 70px);
            font-weight: 700;
            line-height: 1.1;
            text-shadow: 0px 2px 8px rgba(0,0,0,0.25);
            text-transform: uppercase;
        }
        .section-header-item img.decor-logo {
            width: clamp(60px, 8vw, 110px);
            height: auto;
            object-fit: contain;
        }
        .section-header-item img.decor-logo.rotated {
            transform: rotate(90deg);
        }

        /* Individual Card Styling */
        .grid-item {
            position: relative;
            width: 100%;
        }
        .card-wrapper {
            position: relative;
            width: 100%;
            aspect-ratio: 1 / 1;
            border-radius: 15px;
            overflow: hidden;
            box-shadow: 0 8px 24px rgba(0,0,0,0.3);
            cursor: zoom-in;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .card-wrapper:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 35px rgba(0,0,0,0.5);
        }
        .card-wrapper img {
            position: absolute;
            display: block;
        }
        .card-wrapper img.full-img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            position: static;
        }

        /* Sprite crop styles */
        .crop-230-1 img {
            width: 295.3%;
            height: 100%;
            left: 0;
            top: 0;
            max-width: none;
        }
        .crop-230-3 img {
            width: 295.3%;
            height: 100%;
            left: -195.3%;
            top: 0;
            max-width: none;
        }

        .crop-231-1 img {
            width: 491.8%;
            height: 100%;
            left: 0;
            top: 0;
            max-width: none;
        }
        .crop-231-2 img {
            width: 491.8%;
            height: 100%;
            left: -98%;
            top: 0;
            max-width: none;
        }
        .crop-231-4 img {
            width: 491.8%;
            height: 100%;
            left: -294%;
            top: 0;
            max-width: none;
        }
        .crop-231-5 img {
            width: 491.8%;
            height: 100%;
            left: -391.8%;
            top: 0;
            max-width: none;
        }

        .crop-233-1 img {
            width: 297%;
            height: 200%;
            left: 0;
            top: 0;
            max-width: none;
        }
        .crop-233-2 img {
            width: 297%;
            height: 200%;
            left: -197%;
            top: 0;
            max-width: none;
        }
        .crop-233-3 img {
            width: 297%;
            height: 200%;
            left: 0;
            top: -100%;
            max-width: none;
        }
        .crop-233-4 img {
            width: 297%;
            height: 200%;
            left: -98.5%;
            top: -100%;
            max-width: none;
        }

        /* --- 5. DESKTOP GRID LAYOUT OVERRIDE --- */
        @media (min-width: 1025px) {
            .grid-container {
                display: grid;
                grid-template-columns: repeat(5, 1fr);
                grid-template-rows: repeat(7, 1fr);
                gap: 24px;
                width: 100%;
                max-width: 1874px;
                aspect-ratio: 1874 / 3161;
                margin: 0 auto;
                padding: 0 68px;
                position: relative;
            }
            .grid-container .bg-decor {
                display: block;
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 1;
                object-fit: cover;
                pointer-events: none;
            }
            .grid-item {
                z-index: 2;
                width: 100%;
                height: 100%;
            }
            .card-wrapper {
                align-self: center;
                justify-self: center;
            }
            
            /* Outlined Titles placement */
            .art-title-box {
                grid-column: 1 / span 3;
                grid-row: 1;
                display: flex;
                flex-direction: row;
                gap: 40px;
                justify-content: flex-start;
                align-items: center;
            }
            .all-text-box {
                grid-column: 3;
                grid-row: 1;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-top: 30%;
            }
            
            /* Row 2 placements */
            .header-current {
                grid-column: 1 / span 2;
                grid-row: 2;
                display: flex;
                align-items: flex-end;
                justify-content: space-between;
            }
            .img-exhibit-1 {
                grid-column: 4;
                grid-row: 2;
            }
            
            /* Row 3 placements */
            .img-exhibit-2 {
                grid-column: 2;
                grid-row: 3;
            }
            .img-exhibit-3 {
                grid-column: 4;
                grid-row: 3;
            }
            
            /* Row 4 placements */
            .header-coming {
                grid-column: 1 / span 2;
                grid-row: 4;
                display: flex;
                align-items: flex-end;
                justify-content: space-between;
            }
            .img-coming-1 {
                grid-column: 3;
                grid-row: 4;
            }
            .img-coming-2 {
                grid-column: 5;
                grid-row: 4;
            }
            
            /* Row 5 placements */
            .img-coming-3 {
                grid-column: 1;
                grid-row: 5;
            }
            .img-coming-4 {
                grid-column: 2;
                grid-row: 5;
            }
            .img-coming-5 {
                grid-column: 4;
                grid-row: 5;
            }
            .img-coming-6 {
                grid-column: 5;
                grid-row: 5;
            }
            
            /* Row 6 placements */
            .img-past-1 {
                grid-column: 1;
                grid-row: 6;
            }
            .img-past-2 {
                grid-column: 3;
                grid-row: 6;
            }
            .header-past {
                grid-column: 4 / span 2;
                grid-row: 6;
                display: flex;
                flex-direction: row-reverse;
                align-items: flex-end;
                justify-content: flex-start;
                gap: 20px;
                text-align: right;
            }
            
            /* Row 7 placements */
            .img-past-3 {
                grid-column: 1;
                grid-row: 7;
            }
            .img-past-4 {
                grid-column: 2;
                grid-row: 7;
            }
            .img-past-5 {
                grid-column: 4;
                grid-row: 7;
            }
            .img-past-6 {
                grid-column: 5;
                grid-row: 7;
            }
        }

        /* --- 6. YELLOW FOOTER SECTION --- */
        .yellow-footer-wrapper {
            background-color: var(--pkg-yellow);
            color: var(--text-dark);
            width: 100vw;
            position: relative;
            left: 50%;
            right: 50%;
            margin-left: -50vw;
            margin-right: -50vw;
            padding: 80px 8% 60px 8%;
            margin-top: 80px;
        }
        .yellow-container {
            max-width: 1400px;
            margin: 0 auto;
            display: grid;
            grid-template-columns: 1fr 1.15fr;
            gap: 80px;
            align-items: start;
        }
        @media (max-width: 1024px) {
            .yellow-container {
                grid-template-columns: 1fr;
                gap: 50px;
            }
        }

        /* Left block: Info, details & Form */
        .footer-left {
            display: flex;
            flex-direction: column;
            gap: 40px;
        }
        .welcome-title {
            font-family: 'Montserrat', sans-serif;
            font-size: clamp(38px, 5.5vw, 60px);
            font-weight: 800;
            color: rgba(0, 0, 0, 0.85);
            line-height: 1.1;
        }
        .welcome-desc {
            font-size: 15px;
            line-height: 1.7;
            color: rgba(0, 0, 0, 0.75);
            font-style: italic;
            font-weight: 600;
            text-align: justify;
        }

        .details-grid {
            display: grid;
            grid-template-columns: 1fr 1.2fr;
            gap: 40px;
        }
        @media (max-width: 480px) {
            .details-grid {
                grid-template-columns: 1fr;
                gap: 25px;
            }
        }
        .details-col h3 {
            font-size: 18px;
            font-weight: 800;
            color: rgba(0, 0, 0, 0.85);
            margin-bottom: 15px;
            border-bottom: 1.5px solid rgba(0, 0, 0, 0.15);
            padding-bottom: 6px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        .details-col p {
            font-size: 14px;
            line-height: 1.6;
            color: rgba(0, 0, 0, 0.7);
        }
        .details-col a {
            color: rgba(0, 0, 0, 0.85);
            font-weight: 700;
            text-decoration: underline;
            transition: color 0.2s;
        }
        .details-col a:hover {
            color: var(--pkg-green);
        }

        /* Newsletter */
        .newsletter-section {
            display: flex;
            flex-direction: column;
            gap: 25px;
            border-top: 1.5px solid rgba(0, 0, 0, 0.1);
            padding-top: 35px;
        }
        .newsletter-title {
            font-family: 'Montserrat', sans-serif;
            font-size: clamp(22px, 3vw, 30px);
            font-weight: 800;
            color: rgba(0, 0, 0, 0.85);
        }
        .newsletter-form {
            display: flex;
            flex-direction: column;
            gap: 25px;
        }
        .form-row {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 25px;
        }
        @media (max-width: 580px) {
            .form-row {
                grid-template-columns: 1fr;
            }
        }
        .input-group {
            position: relative;
        }
        .input-group input {
            width: 100%;
            padding: 10px 0;
            font-size: 16px;
            background: transparent;
            border: none;
            border-bottom: 1.5px solid rgba(0, 0, 0, 0.35);
            color: #000;
            outline: none;
            transition: border-color 0.3s;
        }
        .input-group input:focus {
            border-bottom-color: var(--pkg-green);
        }
        .input-group label {
            position: absolute;
            left: 0;
            top: 10px;
            font-size: 16px;
            color: rgba(0, 0, 0, 0.5);
            pointer-events: none;
            transition: all 0.3s ease;
        }
        .input-group input:focus + label,
        .input-group input:not(:placeholder-shown) + label {
            top: -12px;
            font-size: 12px;
            color: var(--pkg-green);
            font-weight: 700;
        }

        .submit-btn {
            align-self: flex-start;
            padding: 10px 35px;
            border-radius: 25px;
            background: transparent;
            color: rgba(0, 0, 0, 0.8);
            border: 1.5px solid rgba(0, 0, 0, 0.6);
            font-size: 15px;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        .submit-btn:hover {
            background: var(--pkg-green);
            color: #fff;
            border-color: var(--pkg-green);
            transform: translateY(-2px);
            box-shadow: 0px 4px 12px rgba(16, 68, 49, 0.3);
        }

        /* Right block: Title and Mockup */
        .footer-right {
            display: flex;
            flex-direction: column;
            gap: 30px;
        }
        .inspiration-title {
            font-family: 'Montserrat', sans-serif;
            font-size: clamp(34px, 4.5vw, 56px);
            font-weight: 800;
            color: rgba(0, 0, 0, 0.85);
            text-align: right;
            line-height: 1.1;
        }
        @media (max-width: 1024px) {
            .inspiration-title {
                text-align: left;
            }
        }
        .mockup-img-container {
            width: 100%;
            border-radius: 15px;
            overflow: hidden;
            box-shadow: 0px 12px 36px rgba(0, 0, 0, 0.15);
        }
        .mockup-img-container img {
            width: 100%;
            height: auto;
            display: block;
            cursor: zoom-in;
            transition: transform 0.4s ease;
        }
        .mockup-img-container img:hover {
            transform: scale(1.02);
        }

        /* --- 7. FOOTER --- */
        .footer-container { 
            border-top: none;
            padding: 40px 8% 60px 8%; 
            background: transparent !important;
            color: rgba(255, 255, 255, 0.8);
            width: 100%;
            margin-top: 40px;
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
            color: var(--pkg-yellow);
            letter-spacing: 0.5px;
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
            color: rgba(255, 255, 255, 0.6);
            font-weight: 300;
            line-height: 1.6;
        }
        .footer-left-col .email-link {
            font-size: 11px;
            color: var(--pkg-yellow);
            text-decoration: none;
            font-weight: 500;
            transition: opacity 0.2s ease;
        }
        .footer-left-col .email-link:hover {
            opacity: 0.8;
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
            color: var(--text-white);
            letter-spacing: 0.5px;
        }
        .footer-right-col .address-text {
            font-size: 11px;
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
    </style>
</head>
<body>

    <div id="global-lightbox" onclick="this.style.display='none'; document.body.style.overflow='auto'"><img id="global-img" src=""></div>

    <!-- 1. HEADER (Package 1 Style - Transparent with no blur) -->
    <div class="header-wrapper">
        <div class="header-top-frame">
            <div class="logo-left">
                <a href="../../index.html"><img src="../../assets/images/Logo_SHLL_long.png" alt="SHL Logo"></a>
            </div>
            <div class="header-middle">
                <div class="horizontal-line"></div>
            </div>
            <div class="logo-right">
                <a href="../../index.html"><img src="../../assets/images/index/logo1.png" alt="UEH" style="height: 30px; width: auto; display: block;"></a>
            </div>
        </div>
    </div>

    <main>
        <!-- 2. SCALABLE CANVAS GRID CONTAINER -->
        <div class="grid-container">
            <!-- Background Image decoration aligned exactly behind grid blocks -->
            <img src="${base64Map['ArtForAllBackground1']}" class="bg-decor" alt="Background Grid Design">

            <!-- Row 1: Titles -->
            <div class="grid-item art-title-box">
                <span class="art-text" data-aos="fade-down" data-aos-duration="1500">ART</span>
                <span class="for-text" data-aos="fade-down" data-aos-duration="1500" data-aos-delay="200">FOR</span>
            </div>
            <div class="grid-item all-text-box" data-aos="zoom-in" data-aos-duration="1500" data-aos-delay="400">
                <span class="all-text">ALL</span>
            </div>

            <!-- Row 2: Current Exhibitions Heading & Image 1 -->
            <div class="grid-item header-current section-header-item" data-aos="fade-right">
                <h2>CURRENT<br/>EXHIBITIONS</h2>
                <img src="${base64Map['Fb5719dbb2b404c7730e641fdf5dfb1']}" class="decor-logo" alt="Arrow Right">
            </div>
            <div class="grid-item card-wrapper img-exhibit-1" data-aos="fade-left" onclick="openGlobalLB(this)">
                <img src="${base64Map['Image234']}" class="full-img" alt="Exhibition Plans">
            </div>

            <!-- Row 3: Slices of Image230 (Separated Individual Rounded Squares) -->
            <div class="grid-item card-wrapper img-exhibit-2 crop-230-1" data-aos="fade-up" onclick="openGlobalLB(this, 'Image230-1')">
                <img src="${base64Map['Image230']}" alt="Exhibition Image 2-1">
            </div>
            <div class="grid-item card-wrapper img-exhibit-3 crop-230-3" data-aos="fade-left" data-aos-delay="200" onclick="openGlobalLB(this, 'Image230-3')">
                <img src="${base64Map['Image230']}" alt="Exhibition Image 2-2">
            </div>

            <!-- Row 4: Coming Events Heading & Image 4, Image 5 -->
            <div class="grid-item header-coming section-header-item" data-aos="fade-right">
                <h2>COMING<br/>EVENTS</h2>
                <img src="${base64Map['Fb5719dbb2b404c7730e641fdf5dfb6']}" class="decor-logo" alt="Arrow Right">
            </div>
            <div class="grid-item card-wrapper img-coming-1" data-aos="fade-up" onclick="openGlobalLB(this)">
                <img src="${base64Map['Image232']}" class="full-img" alt="Coming Event Neon">
            </div>
            <div class="grid-item card-wrapper img-coming-2" data-aos="fade-left" data-aos-delay="200" onclick="openGlobalLB(this)">
                <img src="${base64Map['Image49']}" class="full-img" alt="Coming Event Canopy">
            </div>

            <!-- Row 5: Slices of Image231 (Separated Individual Rounded Squares) -->
            <div class="grid-item card-wrapper img-coming-3 crop-231-1" data-aos="fade-right" onclick="openGlobalLB(this, 'Image231-1')">
                <img src="${base64Map['Image231']}" alt="Coming Event Image 6">
            </div>
            <div class="grid-item card-wrapper img-coming-4 crop-231-2" data-aos="fade-up" data-aos-delay="100" onclick="openGlobalLB(this, 'Image231-2')">
                <img src="${base64Map['Image231']}" alt="Coming Event Image 7">
            </div>
            <div class="grid-item card-wrapper img-coming-5 crop-231-4" data-aos="fade-up" data-aos-delay="200" onclick="openGlobalLB(this, 'Image231-4')">
                <img src="${base64Map['Image231']}" alt="Coming Event Image 8">
            </div>
            <div class="grid-item card-wrapper img-coming-6 crop-231-5" data-aos="fade-left" data-aos-delay="300" onclick="openGlobalLB(this, 'Image231-5')">
                <img src="${base64Map['Image231']}" alt="Coming Event Image 9">
            </div>

            <!-- Row 6: Slices 1, 2 of Image233 and Past Events Heading -->
            <div class="grid-item card-wrapper img-past-1 crop-233-1" data-aos="fade-right" onclick="openGlobalLB(this, 'Image233-1')">
                <img src="${base64Map['Image233']}" alt="Past Event Image 10">
            </div>
            <div class="grid-item card-wrapper img-past-2 crop-233-2" data-aos="fade-up" data-aos-delay="100" onclick="openGlobalLB(this, 'Image233-2')">
                <img src="${base64Map['Image233']}" alt="Past Event Image 11">
            </div>
            <div class="grid-item header-past section-header-item" data-aos="fade-left">
                <h2>PAST EVENTS</h2>
                <img src="${base64Map['Fb5719dbb2b404c7730e641fdf5dfb7']}" class="decor-logo rotated" alt="Arrow Down">
            </div>

            <!-- Row 7: Slices 3, 4 of Image233 and Image 14, Image 15 -->
            <div class="grid-item card-wrapper img-past-3 crop-233-3" data-aos="fade-right" onclick="openGlobalLB(this, 'Image233-3')">
                <img src="${base64Map['Image233']}" alt="Past Event Image 12">
            </div>
            <div class="grid-item card-wrapper img-past-4 crop-233-4" data-aos="fade-up" data-aos-delay="100" onclick="openGlobalLB(this, 'Image233-4')">
                <img src="${base64Map['Image233']}" alt="Past Event Image 13">
            </div>
            <div class="grid-item card-wrapper img-past-5" data-aos="fade-up" data-aos-delay="200" onclick="openGlobalLB(this)">
                <img src="${base64Map['Rectangle17']}" class="full-img" alt="Past Event Image 14">
            </div>
            <div class="grid-item card-wrapper img-past-6" data-aos="fade-left" data-aos-delay="300" onclick="openGlobalLB(this)">
                <img src="${base64Map['Image235']}" class="full-img" alt="Past Event Image 15">
            </div>
        </div>

        <!-- 3. YELLOW FOOTER / NEWSLETTER SECTION -->
        <div class="yellow-footer-wrapper">
            <div class="yellow-container">
                <div class="footer-left" data-aos="fade-right">
                    <h2 class="welcome-title">Welcome!</h2>
                    <p class="welcome-desc">
                        Serves as the emotional touchpoint and key communication platform within the SMART framework of the SHLL. Its primary objective is to transform technical environmental data into engaging community experiences, fostering long-term stakeholder engagement.<br/><br/>
                        Major outputs include visual storytelling layouts for different campus areas, providing qualitative evidence of community co-creation and place-based interventions across Campus V.
                    </p>
                    
                    <div class="details-grid">
                        <div class="details-col">
                            <h3>Opening times</h3>
                            <p><strong>Sun - Fri</strong><br/>8:00 AM - 6:00 PM</p>
                            <p style="margin-top: 10px;"><strong>Sat</strong><br/>10:00 AM - 6:00 PM</p>
                        </div>
                        <div class="details-col">
                            <h3>Contact</h3>
                            <p><strong>Email:</strong><br/><a href="mailto:smarthub@ueh.edu.vn">smarthub@ueh.edu.vn</a></p>
                            <p style="margin-top: 10px;"><strong>Address:</strong><br/>232/6 Vo Thi Sau Str, Xuan Hoa Ward, HCMC.</p>
                        </div>
                    </div>

                    <div class="newsletter-section">
                        <h3 class="newsletter-title">Art & Ideas into your inbox</h3>
                        <form class="newsletter-form" onsubmit="event.preventDefault(); alert('Thank you for subscribing!'); this.reset();">
                            <div class="form-row">
                                <div class="input-group">
                                    <input type="text" id="first-name" required placeholder=" ">
                                    <label for="first-name">First Name</label>
                                </div>
                                <div class="input-group">
                                    <input type="text" id="last-name" required placeholder=" ">
                                    <label for="last-name">Last Name</label>
                                </div>
                            </div>
                            <div class="input-group">
                                <input type="email" id="email" required placeholder=" ">
                                <label for="email">Your Email</label>
                            </div>
                            <button type="submit" class="submit-btn">Sent Us Your Newsletter</button>
                        </form>
                    </div>
                </div>

                <div class="footer-right" data-aos="fade-left">
                    <h2 class="inspiration-title">ART FOR<br/>INSPIRATION</h2>
                    <div class="mockup-img-container">
                        <img src="${base64Map['Rectangle21']}" onclick="openGlobalLB(this)" alt="Mockup Presentation">
                    </div>
                </div>
            </div>
        </div>

        <!-- 4. PROJECT FOOTER (Standard Package 1 Style) -->
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
    </main>

    <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
    <script>
        AOS.init({ duration: 1000, once: true, offset: 120, easing: 'ease-in-out' });

        function openGlobalLB(element, sliceType) {
            const lightbox = document.getElementById("global-lightbox");
            const lightboxImg = document.getElementById("global-img");
            
            if (sliceType) {
                // Crop the image on-the-fly using a temporary canvas
                const img = element.querySelector('img');
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                
                // Define cropping coordinates based on sliceType
                let sx, sy, sWidth, sHeight;
                
                // Get the original dimensions of the image
                const naturalWidth = img.naturalWidth;
                const naturalHeight = img.naturalHeight;
                
                if (sliceType.startsWith('Image230')) {
                    // Image230 contains 3 columns
                    sHeight = naturalHeight;
                    sWidth = naturalHeight; // make it a square
                    sy = 0;
                    if (sliceType === 'Image230-1') {
                        sx = 0;
                    } else if (sliceType === 'Image230-3') {
                        sx = naturalWidth - sWidth;
                    }
                } else if (sliceType.startsWith('Image231')) {
                    // Image231 contains 5 columns (aspect ratio 4.9)
                    sHeight = naturalHeight;
                    sWidth = naturalHeight;
                    sy = 0;
                    const step = (naturalWidth - sWidth) / 4;
                    if (sliceType === 'Image231-1') sx = 0;
                    else if (sliceType === 'Image231-2') sx = step;
                    else if (sliceType === 'Image231-4') sx = step * 3;
                    else if (sliceType === 'Image231-5') sx = naturalWidth - sWidth;
                } else if (sliceType.startsWith('Image233')) {
                    // Image233 is 3x2 grid
                    sWidth = naturalWidth / 3;
                    sHeight = naturalHeight / 2;
                    if (sliceType === 'Image233-1') { sx = 0; sy = 0; }
                    else if (sliceType === 'Image233-2') { sx = sWidth * 2; sy = 0; }
                    else if (sliceType === 'Image233-3') { sx = 0; sy = sHeight; }
                    else if (sliceType === 'Image233-4') { sx = sWidth; sy = sHeight; }
                }
                
                // Set canvas dimensions
                canvas.width = sWidth;
                canvas.height = sHeight;
                
                // Draw cropped image
                ctx.drawImage(img, sx, sy, sWidth, sHeight, 0, 0, sWidth, sHeight);
                
                // Put data into lightbox
                lightboxImg.src = canvas.toDataURL();
            } else {
                const img = element.querySelector('img');
                lightboxImg.src = img.src;
            }
            
            lightbox.style.display = "flex";
            document.body.style.overflow = "hidden";
        }
    </script>
</body>
</html>`;

// Save the refactored output back
fs.writeFileSync(originalPath, newHtml, 'utf8');
console.log('Successfully refactored package-4 index.html!');
