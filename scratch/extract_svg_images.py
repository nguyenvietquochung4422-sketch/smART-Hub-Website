import os
import json
import re
import base64

def main():
    transcript_path = r"C:\Users\Admin\.gemini\antigravity-ide\brain\011f7fca-851d-4d45-8975-1e584f503f47\.system_generated\logs\transcript.jsonl"
    assets_dir = r"c:\Users\Admin\Documents\GitHub\smART-Hub-Website\assets\images"
    output_html_path = r"c:\Users\Admin\Documents\GitHub\smART-Hub-Website\shll-effect.html"
    
    if not os.path.exists(assets_dir):
        os.makedirs(assets_dir)
        
    print("Reading transcript from:", transcript_path)
    user_requests = []
    
    with open(transcript_path, "r", encoding="utf-8") as f:
        for line in f:
            try:
                data = json.loads(line)
                if data.get("type") == "USER_INPUT":
                    content = data.get("content", "")
                    user_requests.append(content)
            except Exception as e:
                print("Error parsing line:", e)
                
    if not user_requests:
        print("No user inputs found!")
        return

    # Let's search the user requests for the SVGs.
    # The first SVG has id="pattern0_850_265" and image id="image0_850_265"
    # The second SVG has id="pattern0_818_670" and image id="image0_818_670"
    
    base64_1 = None
    base64_2 = None
    
    # Let's look for base64 strings in the requests
    for req in user_requests:
        # Search for first image base64
        # We can find xlink:href="data:image/png;base64,..."
        matches = re.findall(r'xlink:href="data:image/png;base64,([^"]+)"', req)
        if len(matches) >= 2:
            base64_1 = matches[0]
            base64_2 = matches[1]
            print("Found both base64 images in user request!")
            break
        elif len(matches) == 1:
            if "850_265" in req:
                base64_1 = matches[0]
            elif "818_670" in req:
                base64_2 = matches[0]
    
    if not base64_1 or not base64_2:
        # If we couldn't find them, let's try a broader regex search on the entire text of transcript
        print("Falling back to scanning transcript raw content...")
        with open(transcript_path, "r", encoding="utf-8") as f:
            full_text = f.read()
            # Clean up escape backslashes in JSON
            full_text = full_text.replace(r'\"', '"').replace(r'\\', '\\')
            matches = re.findall(r'xlink:href="data:image/png;base64,([^"]+)"', full_text)
            print(f"Found {len(matches)} base64 images in raw scan.")
            # Let's find matches that look like the ones we need
            for m in matches:
                # remove any backslashes or JSON escaping characters if any
                clean_m = m.replace('\\/', '/').replace('\\\\', '\\')
                if len(clean_m) > 1000 and len(clean_m) < 15000:
                    base64_1 = clean_m
                elif len(clean_m) >= 15000:
                    base64_2 = clean_m

    if not base64_1:
        print("Error: Could not find base64_1!")
    else:
        img_data_1 = base64.b64decode(base64_1.split(',')[-1])
        img_path_1 = os.path.join(assets_dir, "shll_effect_1.png")
        with open(img_path_1, "wb") as fh:
            fh.write(img_data_1)
        print("Saved shll_effect_1.png successfully to", img_path_1)
        
    if not base64_2:
        print("Error: Could not find base64_2!")
    else:
        # clean any backslashes or escaped chars
        base64_2_clean = base64_2.replace('\\/', '/').replace('\\\\', '\\').strip()
        # remove anything that is not base64 chars
        base64_2_clean = re.sub(r'[^a-zA-Z0-9+/=]', '', base64_2_clean)
        try:
            img_data_2 = base64.b64decode(base64_2_clean)
            img_path_2 = os.path.join(assets_dir, "shll_effect_2.png")
            with open(img_path_2, "wb") as fh:
                fh.write(img_data_2)
            print("Saved shll_effect_2.png successfully to", img_path_2)
        except Exception as ex:
            print("Failed decoding base64_2:", ex)

    # Let's write the shll-effect.html file!
    html_content = """<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SHLL Effect Hover Animation</title>
    <style>
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }

        body {
            background-color: #0b0c10;
            color: #ffffff;
            font-family: 'Outfit', 'Inter', sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            overflow: hidden;
            perspective: 1000px;
        }

        /* Container for the SVGs and effects */
        .effect-container {
            position: relative;
            width: 800px;
            height: 500px;
            background: rgba(255, 255, 255, 0.03);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
            backdrop-filter: blur(10px);
            display: flex;
            justify-content: center;
            align-items: center;
        }

        /* Ambient background glow */
        .glow-background {
            position: absolute;
            width: 300px;
            height: 300px;
            background: radial-gradient(circle, rgba(0, 180, 216, 0.15) 0%, rgba(0,0,0,0) 70%);
            border-radius: 50%;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 1;
            pointer-events: none;
        }

        /* SVGs styling with absolute positioning from request */
        .svg-effect-1 {
            position: absolute;
            width: 92px;
            height: 107px;
            top: 217px;
            left: -436px;
            transform: rotate(-180deg);
            opacity: 1;
            z-index: 10;
            transition: all 0.8s cubic-bezier(0.25, 1, 0.5, 1);
            filter: drop-shadow(0 0 8px rgba(0, 180, 216, 0.3));
        }

        .svg-effect-2 {
            position: absolute;
            width: 250px;
            height: 34px;
            top: 253.5px;
            left: -436px;
            transform: rotate(-180deg);
            opacity: 1;
            z-index: 10;
            transition: all 0.8s cubic-bezier(0.25, 1, 0.5, 1);
            filter: drop-shadow(0 0 8px rgba(0, 180, 216, 0.3));
        }

        /* Hover states triggered when hovering over the container or body */
        body:hover .svg-effect-1,
        .effect-container:hover .svg-effect-1 {
            left: -5px;
        }

        body:hover .svg-effect-2,
        .effect-container:hover .svg-effect-2 {
            left: 200px; /* Moves to 200px as specified or can adjust depending on layout */
        }

        /* Instruction text */
        .hint-text {
            position: absolute;
            bottom: 30px;
            left: 50%;
            transform: translateX(-50%);
            font-size: 14px;
            letter-spacing: 2px;
            color: rgba(255, 255, 255, 0.5);
            text-transform: uppercase;
            font-weight: 300;
            pointer-events: none;
            z-index: 5;
            transition: color 0.3s ease;
        }

        .effect-container:hover .hint-text {
            color: rgba(0, 180, 216, 0.8);
            text-shadow: 0 0 10px rgba(0, 180, 216, 0.5);
        }

        /* Decorative logo in the center */
        .center-logo {
            z-index: 2;
            width: 150px;
            opacity: 0.8;
            transition: transform 0.8s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.5s ease;
        }

        .effect-container:hover .center-logo {
            transform: scale(1.15) rotate(5deg);
            opacity: 1;
        }
    </style>
</head>
<body>

    <div class="effect-container">
        <div class="glow-background"></div>
        
        <!-- Center Logo for aesthetics -->
        <img class="center-logo" src="assets/images/Logo_SHLL_long.png" alt="SHLL Logo" onerror="this.style.display='none';">

        <!-- SVG 1: SHLL effect (92x107, matrix mirrored, using saved png) -->
        <svg class="svg-effect-1" viewBox="0 0 92 107" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <rect width="92" height="107" transform="matrix(-1 0 0 1 92 0)" fill="url(#pattern0_850_265)"/>
            <defs>
                <pattern id="pattern0_850_265" patternContentUnits="objectBoundingBox" width="1" height="1">
                    <use xlink:href="#image0_850_265" transform="matrix(0.00303446 0 0 0.00261005 -6.4496 -0.42053)"/>
                </pattern>
                <image id="image0_850_265" width="2455" height="498" preserveAspectRatio="none" xlink:href="assets/images/shll_effect_1.png"/>
            </defs>
        </svg>

        <!-- SVG 2: SHLL effect (250x34, matrix mirrored, using saved png) -->
        <svg class="svg-effect-2" viewBox="0 0 250 34" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <rect width="250" height="34" transform="matrix(-1 0 0 1 250 0)" fill="url(#pattern0_818_670)"/>
            <defs>
                <pattern id="pattern0_818_670" patternContentUnits="objectBoundingBox" width="1" height="1">
                    <use xlink:href="#image0_818_670" transform="matrix(0.00110565 0 0 0.00819672 -2.1384 -2.87705)"/>
                </pattern>
                <image id="image0_818_670" width="2261" height="305" preserveAspectRatio="none" xlink:href="assets/images/shll_effect_2.png"/>
            </defs>
        </svg>

        <div class="hint-text">Rê chuột vào màn hình để hiển thị hiệu ứng</div>
    </div>

</body>
</html>"""

    with open(output_html_path, "w", encoding="utf-8") as f:
        f.write(html_content)
    print("shll-effect.html created successfully!")

if __name__ == "__main__":
    main()
