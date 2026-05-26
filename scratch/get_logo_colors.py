from PIL import Image
import collections

img = Image.open("assets/images/Logo_SHLL_long.png")
img = img.convert("RGBA")
pixels = list(img.getdata())

# Filter out fully transparent pixels
non_transparent = [p for p in pixels if p[3] > 100]

counter = collections.Counter(non_transparent)
for color, count in counter.most_common(20):
    # Hex value
    hex_val = '#{:02x}{:02x}{:02x}'.format(color[0], color[1], color[2])
    print(f"Color: {hex_val}, RGBA: {color}, Count: {count}")
