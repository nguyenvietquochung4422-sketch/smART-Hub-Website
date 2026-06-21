const fs = require('fs');
const path = require('path');

const transcriptPath = `C:\\Users\\Admin\\.gemini\\antigravity-ide\\brain\\011f7fca-851d-4d45-8975-1e584f503f47\\.system_generated\\logs\\transcript.jsonl`;
const assetsDir = `c:\\Users\\Admin\\Documents\\GitHub\\smART-Hub-Website\\assets\\images`;

if (!fs.existsSync(assetsDir)) {
    fs.mkdirSync(assetsDir, { recursive: true });
}

const content = fs.readFileSync(transcriptPath, 'utf8');
const lines = content.split('\n');

let imageCount = 0;

lines.forEach((line, idx) => {
    if (!line.trim()) return;
    try {
        const data = JSON.parse(line);
        if (data.type === "USER_INPUT") {
            const contentText = data.content || "";
            const regex = /xlink:href="data:image\/png;base64,([^"]+)"/g;
            let match;
            while ((match = regex.exec(contentText)) !== null) {
                imageCount++;
                const b64Data = match[1].replace(/\\n/g, '').replace(/\\r/g, '').trim();
                const buffer = Buffer.from(b64Data, 'base64');
                const filename = `extracted_image_${imageCount}.png`;
                const filepath = path.join(assetsDir, filename);
                fs.writeFileSync(filepath, buffer);
                console.log(`Saved ${filename} to ${filepath} (size: ${buffer.length} bytes)`);
            }
        }
    } catch (e) {
        console.error("Error parsing line", idx + 1, e);
    }
});
