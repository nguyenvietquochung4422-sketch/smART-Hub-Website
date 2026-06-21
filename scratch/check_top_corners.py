import os
from PIL import Image

image_dir = r"c:\Users\Admin\Documents\GitHub\smART-Hub-Website\assets\images\About\vision"
files = [f for f in os.listdir(image_dir) if f.endswith('.png')]

print("Analyzing PNG files in:", image_dir)
print("-" * 50)

for filename in sorted(files):
    filepath = os.path.join(image_dir, filename)
    try:
        with Image.open(filepath) as img:
            img = img.convert("RGBA")
            width, height = img.size
            
            # Check top-left, top-right, and top-middle pixels' alpha values
            tl_alpha = img.getpixel((0, 0))[3]
            tr_alpha = img.getpixel((width - 1, 0))[3]
            tm_alpha = img.getpixel((width // 2, 0))[3]
            
            # If the top row has solid pixels near the corners, it's likely a flat top
            is_flat_top = tl_alpha > 50 and tr_alpha > 50
            
            print(f"{filename:<15} | Size: {width}x{height} | Top-Left Alpha: {tl_alpha:<3} | Top-Right Alpha: {tr_alpha:<3} | Flat Top: {is_flat_top}")
    except Exception as e:
        print(f"Error reading {filename}: {e}")
