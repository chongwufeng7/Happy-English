from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

REFERENCE = Path(r"C:\Users\admin\AppData\Local\Temp\codex-clipboard-cc2987ba-71ad-48c7-98f4-7231073f29ff.png")
IMPLEMENTATION = Path(__file__).with_name("preview-child-home-ui-v2-full.png")
OUTPUT = Path(__file__).with_name("design-qa-home-comparison-v2.png")


def fit_width(image: Image.Image, width: int) -> Image.Image:
    height = round(image.height * width / image.width)
    return image.resize((width, height), Image.Resampling.LANCZOS)


reference = fit_width(Image.open(REFERENCE).convert("RGB"), 430)
implementation = fit_width(Image.open(IMPLEMENTATION).convert("RGB"), 430)
header = 56
gap = 28
canvas = Image.new("RGB", (430 * 2 + gap + 40, max(reference.height, implementation.height) + header + 20), "#f4efe8")
canvas.paste(reference, (16, header))
canvas.paste(implementation, (16 + 430 + gap, header))

draw = ImageDraw.Draw(canvas)
font = ImageFont.load_default()
draw.text((16, 20), "REFERENCE", fill="#4b2a20", font=font)
draw.text((16 + 430 + gap, 20), "IMPLEMENTATION V2", fill="#4b2a20", font=font)
canvas.save(OUTPUT, quality=95)
print(OUTPUT)
