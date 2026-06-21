const fs = require('fs');

const transcriptPath = `C:\\Users\\Admin\\.gemini\\antigravity-ide\\brain\\011f7fca-851d-4d45-8975-1e584f503f47\\.system_generated\\logs\\transcript.jsonl`;
const content = fs.readFileSync(transcriptPath, 'utf8');
const lines = content.split('\n');

lines.forEach((line, idx) => {
    if (!line.trim()) return;
    try {
        const data = JSON.parse(line);
        if (data.type === "USER_INPUT") {
            const text = data.content || "";
            if (text.includes("pattern0_818_670")) {
                console.log(`Line ${idx + 1} USER INPUT content length: ${text.length}`);
                const regex = /xlink:href="data:image\/png;base64,([^"]+)"/g;
                let match = regex.exec(text);
                if (match) {
                    const b64 = match[1];
                    console.log(`Extracted base64 length from transcript: ${b64.length}`);
                    console.log(`Start of base64: ${b64.substring(0, 100)}`);
                    console.log(`End of base64: ${b64.substring(b64.length - 100)}`);
                    if (b64.includes('...')) {
                        console.log("THE TRANSCRIPT ITSELF CONTAINS '...'! IT WAS TRUNCATED!");
                    } else {
                        console.log("The transcript contains the COMPLETE string.");
                    }
                } else {
                    console.log("No base64 match found!");
                }
            }
        }
    } catch(e) {}
});
