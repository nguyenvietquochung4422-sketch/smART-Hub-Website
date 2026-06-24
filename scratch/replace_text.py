import sys

file_path = sys.argv[1]
old_text = sys.argv[2]
new_text = sys.argv[3]

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

if old_text in content:
    content = content.replace(old_text, new_text, 1)
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"SUCCESS: Replaced in {file_path}")
else:
    print(f"ERROR: Old text not found in {file_path}")
    sys.exit(1)
