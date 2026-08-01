import sys
import random

sys.setrecursionlimit(2000)

cols = 6
rows = 15

pieces = [
    # Pro 2x4
    {"src": "/assets/images/about/thoughtspot-bob-baxley.jpg", "alt": "With Design Director Bob Baxley at ThoughtSpot", "caption": "Our design team at ThoughtSpot. (With Bob Baxley)", "w":2, "h":4, "type":"pro"},
    {"src": "/assets/images/about/precisely-conference.png", "alt": "Precisely Design Conference", "caption": "Precisely Design Conference", "w":2, "h":4, "type":"pro"},
    {"src": "/assets/images/about/graduation-2023.jpg", "alt": "Graduation 2023", "caption": "Graduation 2023", "w":2, "h":4, "type":"pro"},
    {"src": "/assets/images/about/design-up.jpg", "alt": "Me at Design UP", "caption": "Design UP Conference", "w":2, "h":4, "type":"pro"},
    
    # Pro 2x3
    {"src": "/assets/images/about/thoughtspot-buddies.jpg", "alt": "Buddies at ThoughtSpot", "caption": "Buddies at ThoughtSpot", "w":2, "h":3, "type":"pro"},
    
    # Pro 2x2
    {"src": "/assets/images/about/philips-1.png", "alt": "Good times at Philips Healthcare", "caption": "Good times at Philips Healthcare", "w":2, "h":2, "type":"pro"},
    {"src": "/assets/images/about/philips-2.png", "alt": "Good times at Philips Healthcare", "caption": "Philips Healthcare", "w":2, "h":2, "type":"pro"},
    {"src": "/assets/images/about/philips-3.png", "alt": "Good times at Philips Healthcare", "caption": "Team at Philips", "w":2, "h":2, "type":"pro"},
    {"src": "/assets/images/about/award-photos.jpg", "alt": "My award photos", "caption": "Award Photos", "w":2, "h":2, "type":"pro"},
    {"src": "/assets/images/about/airtel.png", "alt": "My last day at Airtel", "caption": "My last day at Airtel", "w":2, "h":2, "type":"pro"},
    {"src": "/assets/images/about/olx-autos.png", "alt": "Lunch with the team at OLX Autos", "caption": "Lunch with the team at OLX Autos", "w":2, "h":2, "type":"pro"},
    {"src": "/assets/images/about/excellence-award.png", "alt": "Received excellence award in 2nd year of Design School", "caption": "Excellence Award, 2nd Year", "w":2, "h":2, "type":"pro"},
    
    # Personal 1x2 (11 items)
    {"src": "/assets/images/about/pondi-1.png", "alt": "Me in Pondicherry with my love", "caption": "Pondicherry with my love", "w":1, "h":2, "type":"per"},
    {"src": "/assets/images/about/pondi-2.png", "alt": "Pondicherry memories", "caption": "Pondicherry", "w":1, "h":2, "type":"per"},
    {"src": "/assets/images/about/family-1.png", "alt": "Family", "caption": "Family", "w":1, "h":2, "type":"per"},
    {"src": "/assets/images/about/family-2.png", "alt": "Family", "caption": "Family", "w":1, "h":2, "type":"per"},
    {"src": "/assets/images/about/family-3.png", "alt": "Family", "caption": "Family", "w":1, "h":2, "type":"per"},
    {"src": "/assets/images/about/family-4.png", "alt": "Family", "caption": "Family", "w":1, "h":2, "type":"per"},
    {"src": "/assets/images/about/uni-2.png", "alt": "Funtimes in Uni", "caption": "Funtimes in Uni", "w":1, "h":2, "type":"per"},
    {"src": "/assets/images/about/childhood-1.png", "alt": "Throwback memories from childhood", "caption": "Throwback memories", "w":1, "h":2, "type":"per"},
    {"src": "/assets/images/about/childhood-2.png", "alt": "Throwback memories from childhood", "caption": "Throwback memories", "w":1, "h":2, "type":"per"},
    {"src": "/assets/images/about/childhood-3.png", "alt": "Throwback memories from childhood", "caption": "Throwback memories", "w":1, "h":2, "type":"per"},
    {"src": "/assets/images/about/cubbon-park.jpg", "alt": "Me at Cubbon park or Lalbagh", "caption": "Cubbon Park / Lalbagh", "w":1, "h":2, "type":"per"},
    
    # Personal 1x1 (2 items)
    {"src": "/assets/images/about/uni-1.png", "alt": "Funtimes in Uni", "caption": "Funtimes in Uni", "w":1, "h":1, "type":"per"},
    {"src": "/assets/images/about/play-crew.jpg", "alt": "With the crew after a play", "caption": "With the play crew", "w":1, "h":1, "type":"per"},
]

for i, p in enumerate(pieces):
    p['id'] = i + 1

grid = [[0 for _ in range(cols)] for _ in range(rows)]
placed_pieces = []

def solve(cell_index):
    if cell_index == rows * cols:
        return True
    
    r = cell_index // cols
    c = cell_index % cols
    
    if grid[r][c] != 0:
        return solve(cell_index + 1)
        
    available = [p for p in pieces if p not in [placed["piece"] for placed in placed_pieces]]
    
    def score(p):
        is_pro = p["type"] == "pro"
        if r <= 3 or r >= 11:
            match = 1 if is_pro else 0
        else:
            match = 1 if not is_pro else 0
        return (match, p["w"] * p["h"])
        
    random.shuffle(available)
    available.sort(key=score, reverse=True)
    
    for p in available:
        if c + p["w"] <= cols and r + p["h"] <= rows:
            fits = True
            for ir in range(r, r + p["h"]):
                for ic in range(c, c + p["w"]):
                    if grid[ir][ic] != 0:
                        fits = False
                        break
                if not fits:
                    break
            
            if fits:
                for ir in range(r, r + p["h"]):
                    for ic in range(c, c + p["w"]):
                        grid[ir][ic] = p["id"]
                placed_pieces.append({"piece": p, "r": r, "c": c})
                
                if solve(cell_index + 1):
                    return True
                    
                for ir in range(r, r + p["h"]):
                    for ic in range(c, c + p["w"]):
                        grid[ir][ic] = 0
                placed_pieces.pop()
                
    return False

found = False
for i in range(100):
    random.seed(i)
    if solve(0):
        found = True
        break

if not found:
    print("Failed to find a packing!")
    sys.exit(1)

placed_pieces.sort(key=lambda x: (x["r"], x["c"]))

print("const IMAGES = [")
for p_info in placed_pieces:
    img = p_info["piece"]
    print("  {")
    print(f'    src: "{img["src"]}",')
    print(f'    alt: "{img["alt"]}",')
    print(f'    caption: "{img["caption"]}",')
    print(f'    className: "md:col-span-{img["w"]} md:row-span-{img["h"]} h-[150px] md:h-full"')
    print("  },")
print("]")
