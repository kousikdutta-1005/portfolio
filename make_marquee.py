import json

images = [
  {"src": "/assets/images/about/thoughtspot-bob-baxley.jpg", "alt": "With Design Director Bob Baxley at ThoughtSpot", "caption": "Our design team at ThoughtSpot. (With Bob Baxley)"},
  {"src": "/assets/images/about/precisely-conference.png", "alt": "Precisely Design Conference", "caption": "Precisely Design Conference"},
  {"src": "/assets/images/about/design-up.jpg", "alt": "Me at Design UP", "caption": "Design UP Conference"},
  {"src": "/assets/images/about/pondi-1.png", "alt": "Me in Pondicherry with my love", "caption": "Pondicherry with my love"},
  {"src": "/assets/images/about/pondi-2.png", "alt": "Pondicherry memories", "caption": "Pondicherry"},
  {"src": "/assets/images/about/family-1.png", "alt": "Family", "caption": "Family"},
  {"src": "/assets/images/about/family-2.png", "alt": "Family", "caption": "Family"},
  {"src": "/assets/images/about/family-3.png", "alt": "Family", "caption": "Family"},
  {"src": "/assets/images/about/family-4.png", "alt": "Family", "caption": "Family"},
  {"src": "/assets/images/about/uni-2.png", "alt": "Funtimes in Uni", "caption": "Funtimes in Uni"},
  {"src": "/assets/images/about/childhood-1.png", "alt": "Throwback memories from childhood", "caption": "Throwback memories"},
  {"src": "/assets/images/about/childhood-2.png", "alt": "Throwback memories from childhood", "caption": "Throwback memories"},
  {"src": "/assets/images/about/childhood-3.png", "alt": "Throwback memories from childhood", "caption": "Throwback memories"},
  {"src": "/assets/images/about/cubbon-park.jpg", "alt": "Me at Cubbon park or Lalbagh", "caption": "Cubbon Park / Lalbagh"},
  {"src": "/assets/images/about/uni-1.png", "alt": "Funtimes in Uni", "caption": "Funtimes in Uni"},
  {"src": "/assets/images/about/play-crew.jpg", "alt": "With the crew after a play", "caption": "With the play crew"},
  {"src": "/assets/images/about/graduation-2023.jpg", "alt": "Graduation 2023", "caption": "Graduation 2023"},
  {"src": "/assets/images/about/thoughtspot-buddies.jpg", "alt": "Buddies at ThoughtSpot", "caption": "Buddies at ThoughtSpot"},
  {"src": "/assets/images/about/award-photos.jpg", "alt": "My award photos", "caption": "Award Photos"},
  {"src": "/assets/images/about/philips-1.png", "alt": "Good times at Philips Healthcare", "caption": "Good times at Philips Healthcare"},
  {"src": "/assets/images/about/philips-2.png", "alt": "Good times at Philips Healthcare", "caption": "Philips Healthcare"},
  {"src": "/assets/images/about/philips-3.png", "alt": "Good times at Philips Healthcare", "caption": "Team at Philips"},
  {"src": "/assets/images/about/airtel.png", "alt": "My last day at Airtel", "caption": "My last day at Airtel"},
  {"src": "/assets/images/about/olx-autos.png", "alt": "Lunch with the team at OLX Autos", "caption": "Lunch with the team at OLX Autos"},
  {"src": "/assets/images/about/excellence-award.png", "alt": "Received excellence award in 2nd year of Design School", "caption": "Excellence Award, 2nd Year"}
]

print("import { motion } from \"framer-motion\"\n")
print(f"const IMAGES = {json.dumps(images, indent=2)}\n")

# Spit out the rest of the component
print("""
export function AboutGallery() {
  const row1 = IMAGES.slice(0, 13);
  const row2 = IMAGES.slice(13);

  return (
    <section className="py-14 md:py-20 relative overflow-hidden">
      <style>{`
        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: scroll-left 40s linear infinite;
        }
        .animate-marquee-reverse {
          animation: scroll-left 40s linear infinite reverse;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>
      
      <div className="max-w-[980px] mx-auto px-6 md:px-10 mb-8 md:mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <p className="section-kicker mb-1.5">Life & Work</p>
          <h2 className="text-[28px] md:text-[32px] font-bold tracking-[-0.02em]">
            Moments between the <span className="heading-italic">screens</span>.
          </h2>
        </motion.div>
      </div>

      <div className="flex flex-col gap-4">
        {/* Row 1 - scrolling left */}
        <div className="flex w-max animate-marquee marquee-track">
          {[...row1, ...row1].map((img, i) => (
            <div
              key={i}
              className="relative overflow-hidden rounded-2xl glass-panel group w-64 h-64 md:w-80 md:h-80 flex-none mx-2"
            >
              <img 
                src={img.src} 
                alt={img.alt} 
                className="w-full h-full object-cover filter brightness-[0.95] transition-transform duration-700 ease-out group-hover:scale-105 bg-secondary/20"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <p className="text-white text-[15px] md:text-[16px] font-medium drop-shadow-md opacity-0 translate-y-3 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:translate-y-0">
                  {img.caption}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Row 2 - scrolling right */}
        <div className="flex w-max animate-marquee-reverse marquee-track">
          {[...row2, ...row2].map((img, i) => (
            <div
              key={i}
              className="relative overflow-hidden rounded-2xl glass-panel group w-64 h-64 md:w-80 md:h-80 flex-none mx-2"
            >
              <img 
                src={img.src} 
                alt={img.alt} 
                className="w-full h-full object-cover filter brightness-[0.95] transition-transform duration-700 ease-out group-hover:scale-105 bg-secondary/20"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <p className="text-white text-[15px] md:text-[16px] font-medium drop-shadow-md opacity-0 translate-y-3 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:translate-y-0">
                  {img.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
""")
