import os, re, glob

img_files = sorted(glob.glob('img/*.jpg') + glob.glob('img/*.jpeg') + glob.glob('img/*.png'))
print(f"Trovati {len(img_files)} file in img/:")
for f in img_files:
    print(f"  -> {f}")

if len(img_files) < 3:
    print("️  Troppo pochi file! Servono almeno 3 immagini.")
    exit(1)

with open('index.html', 'r') as f:
    content = f.read()

# Hero: primi 3 file
hero = img_files[:3]
content = re.sub(r"hero:\[[^\]]*\]", "hero:[" + ",".join(f"'{x}'" for x in hero) + "]", content)

# Intro, misura, boutique
intro = img_files[3] if len(img_files) > 3 else hero[0]
misura = img_files[4] if len(img_files) > 4 else hero[0]
boutique = img_files[3] if len(img_files) > 3 else hero[0]
content = re.sub(r"intro:'[^']*'", f"intro:'{intro}'", content)
content = re.sub(r"misura:'[^']*'", f"misura:'{misura}'", content)
content = re.sub(r"boutique:'[^']*'", f"boutique:'{boutique}'", content)

# Pilastri (giacche, camicie, pantaloni)
pil = img_files[5:8] if len(img_files) > 5 else hero
content = re.sub(r"pil:\[[^\]]*\]", "pil:[" + ",".join(f"'{x}'" for x in pil) + "]", content)

# Prodotti: dal file 8 in poi, in ordine
prod_imgs = img_files[8:] if len(img_files) > 8 else img_files
idx = [0]
def repl(m):
    if idx[0] < len(prod_imgs):
        img = prod_imgs[idx[0]]
        idx[0] += 1
        return f"image:'{img}'"
    return m.group(0)
content = re.sub(r"image:'https?://[^']*'", repl, content)

with open('index.html', 'w') as f:
    f.write(content)

print("\n✅ index.html aggiornato. Le foto ora puntano alla cartella img/")
