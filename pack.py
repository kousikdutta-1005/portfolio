import random

images = [
  { "id": "bob", "w": 2, "h": 3, "type": "pro", "src": "/assets/images/about/thoughtspot-bob-baxley.jpg", "alt": "Bob Baxley", "caption": "ThoughtSpot team with Bob Baxley" },
  { "id": "precisely", "w": 2, "h": 3, "type": "pro", "src": "/assets/images/about/precisely-conference.png", "alt": "Precisely", "caption": "Precisely Conference" },
  { "id": "grad", "w": 2, "h": 3, "type": "pro", "src": "/assets/images/about/graduation-2023.jpg", "alt": "Graduation", "caption": "Graduation 2023" },
  { "id": "designup", "w": 2, "h": 3, "type": "pro", "src": "/assets/images/about/design-up.jpg", "alt": "Design UP", "caption": "Design UP Conference" },
  { "id": "phil1", "w": 2, "h": 2, "type": "pro", "src": "/assets/images/about/philips-1.png", "alt": "Philips", "caption": "Philips Healthcare" },
  { "id": "phil2", "w": 2, "h": 2, "type": "pro", "src": "/assets/images/about/philips-2.png", "alt": "Philips 2", "caption": "Philips Healthcare" },
  { "id": "award", "w": 2, "h": 2, "type": "pro", "src": "/assets/images/about/award-photos.jpg", "alt": "Awards", "caption": "Award Photos" },
  { "id": "airtel", "w": 2, "h": 2, "type": "pro", "src": "/assets/images/about/airtel.png", "alt": "Airtel", "caption": "Last day at Airtel" },
  { "id": "olx", "w": 2, "h": 2, "type": "pro", "src": "/assets/images/about/olx-autos.png", "alt": "OLX", "caption": "OLX Autos" },
  { "id": "excel", "w": 2, "h": 2, "type": "pro", "src": "/assets/images/about/excellence-award.png", "alt": "Excellence", "caption": "Excellence Award" },
  { "id": "buddies", "w": 2, "h": 2, "type": "pro", "src": "/assets/images/about/thoughtspot-buddies.jpg", "alt": "Buddies", "caption": "Buddies at ThoughtSpot" },
  { "id": "phil3", "w": 2, "h": 1, "type": "pro", "src": "/assets/images/about/philips-3.png", "alt": "Philips 3", "caption": "Team at Philips" },
  
  { "id": "pon1", "w": 1, "h": 2, "type": "per", "src": "/assets/images/about/pondi-1.png", "alt": "Pondi 1", "caption": "Pondicherry with my love" },
  { "id": "pon2", "w": 1, "h": 2, "type": "per", "src": "/assets/images/about/pondi-2.png", "alt": "Pondi 2", "caption": "Pondicherry" },
  { "id": "fam1", "w": 1, "h": 2, "type": "per", "src": "/assets/images/about/family-1.png", "alt": "Family 1", "caption": "Family" },
  { "id": "fam2", "w": 1, "h": 2, "type": "per", "src": "/assets/images/about/family-2.png", "alt": "Family 2", "caption": "Family" },
  { "id": "fam3", "w": 1, "h": 2, "type": "per", "src": "/assets/images/about/family-3.png", "alt": "Family 3", "caption": "Family" },
  { "id": "fam4", "w": 1, "h": 2, "type": "per", "src": "/assets/images/about/family-4.png", "alt": "Family 4", "caption": "Family" },
  { "id": "uni2", "w": 1, "h": 2, "type": "per", "src": "/assets/images/about/uni-2.png", "alt": "Uni 2", "caption": "Funtimes in Uni" },
  { "id": "chi2", "w": 1, "h": 2, "type": "per", "src": "/assets/images/about/childhood-2.png", "alt": "Childhood 2", "caption": "Throwback memories" },
  { "id": "chi3", "w": 1, "h": 2, "type": "per", "src": "/assets/images/about/childhood-3.png", "alt": "Childhood 3", "caption": "Throwback memories" },
  { "id": "cubbon", "w": 1, "h": 2, "type": "per", "src": "/assets/images/about/cubbon-park.jpg", "alt": "Cubbon", "caption": "Cubbon Park / Lalbagh" },
  { "id": "uni1", "w": 1, "h": 1, "type": "per", "src": "/assets/images/about/uni-1.png", "alt": "Uni 1", "caption": "Funtimes in Uni" },
  { "id": "chi1", "w": 1, "h": 1, "type": "per", "src": "/assets/images/about/childhood-1.png", "alt": "Childhood 1", "caption": "Throwback memories" },
  { "id": "play", "w": 1, "h": 1, "type": "per", "src": "/assets/images/about/play-crew.jpg", "alt": "Play", "caption": "With the play crew" },
]

cols = 6

def is_free(grid, r, c, w, h):
    if c + w > cols: return False
    for ir in range(r, r+h):
        for ic in range(c, c+w):
            if (ir, ic) in grid: return False
    return True

def pack(order):
    grid = {}
    placements = []
    
    for img in order:
        r = 0
        placed = False
        while not placed:
            for c in range(cols):
                if is_free(grid, r, c, img['w'], img['h']):
                    for ir in range(r, r + img['h']):
                        for ic in range(c, c + img['w']):
                            grid[(ir, ic)] = img['id']
                    placements.append((img, r, c))
                    placed = True
                    break
            if not placed:
                r += 1
                
    # count gaps before max row
    if not grid: return 0, placements
    max_r = max(r for r, c in grid)
    
    gaps = 0
    for r in range(max_r):
        for c in range(cols):
            if (r, c) not in grid:
                # check if there is any block below it in the same column
                has_block_below = any((ir, c) in grid for ir in range(r+1, max_r+1))
                if has_block_below:
                    gaps += 1
    return gaps, placements

best_order = None
best_score = 999999

# Try 100,000 random layouts and score them
for _ in range(100000):
    pro = [i for i in images if i['type'] == 'pro']
    per = [i for i in images if i['type'] == 'per']
    random.shuffle(pro)
    random.shuffle(per)
    
    # top: 5 pro, middle: all per + 2 pro, bottom: 5 pro
    order = pro[:5] + per[:6] + pro[5:7] + per[6:] + pro[7:]
    
    gaps, placements = pack(order)
    
    if gaps == 0:
        # Score based on how well segregated they are
        pro_y = [r for img, r, c in placements if img['type'] == 'pro']
        per_y = [r for img, r, c in placements if img['type'] == 'per']
        
        # We want pro at extremes (high variance), per in middle (low variance, close to center)
        center = sum(r for img, r, c in placements) / len(placements)
        
        per_dist_from_center = sum(abs(y - center) for y in per_y)
        pro_dist_from_center = sum(abs(y - center) for y in pro_y)
        
        # Lower score is better. Minimize per distance from center, maximize pro distance
        score = per_dist_from_center - pro_dist_from_center
        
        if score < best_score:
            best_score = score
            best_order = order

print("const IMAGES = [")
for img in best_order:
    print("  {")
    print(f'    src: "{img["src"]}",')
    print(f'    alt: "{img["alt"]}",')
    print(f'    caption: "{img["caption"]}",')
    print(f'    className: "md:col-span-{img["w"]} md:row-span-{img["h"]} h-[150px] md:h-full"')
    print("  },")
print("]")
