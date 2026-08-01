import random

images = [
  # PROFESSIONAL
  { "src": "/assets/images/about/thoughtspot-bob-baxley.jpg", "alt": "With Design Director Bob Baxley at ThoughtSpot", "caption": "Our design team at ThoughtSpot. (With Bob Baxley)", "class": "md:col-span-2 md:row-span-3", "type": "pro" },
  { "src": "/assets/images/about/precisely-conference.png", "alt": "Precisely Design Conference", "caption": "Precisely Design Conference", "class": "md:col-span-2 md:row-span-3", "type": "pro" },
  { "src": "/assets/images/about/philips-1.png", "alt": "Good times at Philips Healthcare", "caption": "Good times at Philips Healthcare", "class": "md:col-span-2 md:row-span-2", "type": "pro" },
  { "src": "/assets/images/about/philips-2.png", "alt": "Good times at Philips Healthcare", "caption": "Philips Healthcare", "class": "md:col-span-2 md:row-span-2", "type": "pro" },
  { "src": "/assets/images/about/philips-3.png", "alt": "Good times at Philips Healthcare", "caption": "Team at Philips", "class": "md:col-span-2 md:row-span-1", "type": "pro" },
  { "src": "/assets/images/about/award-photos.jpg", "alt": "My award photos", "caption": "Award Photos", "class": "md:col-span-2 md:row-span-2", "type": "pro" },
  { "src": "/assets/images/about/airtel.png", "alt": "My last day at Airtel", "caption": "My last day at Airtel", "class": "md:col-span-2 md:row-span-2", "type": "pro" },
  { "src": "/assets/images/about/olx-autos.png", "alt": "Lunch with the team at OLX Autos", "caption": "Lunch with the team at OLX Autos", "class": "md:col-span-2 md:row-span-2", "type": "pro" },
  { "src": "/assets/images/about/excellence-award.png", "alt": "Received excellence award in 2nd year of Design School", "caption": "Excellence Award, 2nd Year", "class": "md:col-span-2 md:row-span-2", "type": "pro" },
  { "src": "/assets/images/about/thoughtspot-buddies.jpg", "alt": "Buddies at ThoughtSpot", "caption": "Buddies at ThoughtSpot", "class": "md:col-span-2 md:row-span-2", "type": "pro" },
  { "src": "/assets/images/about/graduation-2023.jpg", "alt": "Graduation 2023", "caption": "Graduation 2023", "class": "md:col-span-2 md:row-span-3", "type": "pro" },
  { "src": "/assets/images/about/design-up.jpg", "alt": "Me at Design UP", "caption": "Design UP Conference", "class": "md:col-span-2 md:row-span-3", "type": "pro" },
  
  # PERSONAL
  { "src": "/assets/images/about/pondi-1.png", "alt": "Me in Pondicherry with my love", "caption": "Pondicherry with my love", "class": "md:col-span-1 md:row-span-2", "type": "personal" },
  { "src": "/assets/images/about/pondi-2.png", "alt": "Pondicherry memories", "caption": "Pondicherry", "class": "md:col-span-1 md:row-span-2", "type": "personal" },
  { "src": "/assets/images/about/family-1.png", "alt": "Family", "caption": "Family", "class": "md:col-span-1 md:row-span-2", "type": "personal" },
  { "src": "/assets/images/about/family-2.png", "alt": "Family", "caption": "Family", "class": "md:col-span-1 md:row-span-2", "type": "personal" },
  { "src": "/assets/images/about/family-3.png", "alt": "Family", "caption": "Family", "class": "md:col-span-1 md:row-span-2", "type": "personal" },
  { "src": "/assets/images/about/family-4.png", "alt": "Family", "caption": "Family", "class": "md:col-span-1 md:row-span-2", "type": "personal" },
  { "src": "/assets/images/about/uni-1.png", "alt": "Funtimes in Uni", "caption": "Funtimes in Uni", "class": "md:col-span-1 md:row-span-1", "type": "personal" },
  { "src": "/assets/images/about/uni-2.png", "alt": "Funtimes in Uni", "caption": "Funtimes in Uni", "class": "md:col-span-1 md:row-span-2", "type": "personal" },
  { "src": "/assets/images/about/childhood-1.png", "alt": "Throwback memories from childhood", "caption": "Throwback memories", "class": "md:col-span-1 md:row-span-1", "type": "personal" },
  { "src": "/assets/images/about/childhood-2.png", "alt": "Throwback memories from childhood", "caption": "Throwback memories", "class": "md:col-span-1 md:row-span-2", "type": "personal" },
  { "src": "/assets/images/about/childhood-3.png", "alt": "Throwback memories from childhood", "caption": "Throwback memories", "class": "md:col-span-1 md:row-span-2", "type": "personal" },
  { "src": "/assets/images/about/cubbon-park.jpg", "alt": "Me at Cubbon park or Lalbagh", "caption": "Cubbon Park / Lalbagh", "class": "md:col-span-1 md:row-span-2", "type": "personal" },
  { "src": "/assets/images/about/play-crew.jpg", "alt": "With the crew after a play", "caption": "With the play crew", "class": "md:col-span-1 md:row-span-1", "type": "personal" },
]


order = [
  # --- TOP (Professional Anchor) ---
  "thoughtspot-bob-baxley.jpg", 
  "precisely-conference.png", 
  "philips-1.png", 
  "award-photos.jpg", 
  "olx-autos.png",
  
  # --- MIDDLE (Personal Scattered) ---
  "pondi-1.png", 
  "family-1.png", 
  "childhood-1.png", 
  "design-up.jpg", # One large professional to break up the dense small ones
  "pondi-2.png", 
  "cubbon-park.jpg", 
  "uni-1.png", 
  "family-2.png", 
  "childhood-2.png",
  "graduation-2023.jpg", # Another professional anchor in the middle
  "family-3.png", 
  "childhood-3.png", 
  "uni-2.png", 
  "play-crew.jpg", 
  "family-4.png", 

  # --- BOTTOM (Professional Anchor) ---
  "philips-2.png", 
  "airtel.png", 
  "excellence-award.png", 
  "thoughtspot-buddies.jpg",
  "philips-3.png"
]

img_map = {i["src"].split("/")[-1]: i for i in images}

print("const IMAGES = [")
for name in order:
    if name in img_map:
        img = img_map[name]
        print("  {")
        print(f'    src: "{img["src"]}",')
        print(f'    alt: "{img["alt"]}",')
        print(f'    caption: "{img["caption"]}",')
        print(f'    className: "{img["class"]} h-[200px] md:h-full"')
        print("  },")
print("]")
