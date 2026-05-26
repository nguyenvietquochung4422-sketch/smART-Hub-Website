import tkinter as tk
import collections

# Hide main window
root = tk.Tk()
root.withdraw()

try:
    img = tk.PhotoImage(file="assets/images/Logo_SHLL_long.png")
    w = img.width()
    h = img.height()
    
    colors = []
    # Sample pixels
    for y in range(0, h):
        for x in range(0, w):
            r, g, b = img.get(x, y)
            # Avoid pure white or transparent or pure black if needed
            # tkinter get returns r, g, b integers (0-255)
            colors.append((r, g, b))
            
    counter = collections.Counter(colors)
    print("Top sampled colors:")
    for (r, g, b), count in counter.most_common(50):
        # Ignore white, black, or near-white background if it's too common
        hex_val = '#{:02x}{:02x}{:02x}'.format(r, g, b)
        print(f"Color: {hex_val}, RGB: ({r}, {g}, {b}), Count: {count}")
except Exception as e:
    print("Error:", e)
