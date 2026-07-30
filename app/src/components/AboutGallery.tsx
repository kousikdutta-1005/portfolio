import { motion } from "framer-motion"

const IMAGES = [
  {
    src: "/assets/images/about/thoughtspot-bob-baxley.jpg",
    alt: "With Design Director Bob Baxley at ThoughtSpot",
    caption: "Our little design team at ThoughtSpot during its glorious days. (With Bob Baxley)",
    className: "md:col-span-2 md:row-span-2 h-[300px] md:h-full"
  },
  {
    src: "/assets/images/about/award-photos.jpg",
    alt: "My award photos",
    caption: "Award Photos",
    className: "md:col-span-1 md:row-span-1 h-[250px] md:h-full"
  },
  {
    src: "/assets/images/about/graduation-2023.jpg",
    alt: "Graduation 2023",
    caption: "Graduation 2023",
    className: "md:col-span-1 md:row-span-1 h-[250px] md:h-full"
  },
  {
    src: "/assets/images/about/cubbon-park.jpg",
    alt: "Me at Cubbon park or Lalbagh",
    caption: "Cubbon Park / Lalbagh",
    className: "md:col-span-1 md:row-span-2 h-[350px] md:h-full"
  },
  {
    src: "/assets/images/about/play-crew.jpg",
    alt: "With the crew after a play",
    caption: "With the play crew",
    className: "md:col-span-2 md:row-span-1 h-[250px] md:h-full"
  },
  {
    src: "/assets/images/about/design-up.jpg",
    alt: "Me at Design UP",
    caption: "Design UP Conference",
    className: "md:col-span-1 md:row-span-1 h-[250px] md:h-full"
  },
  {
    src: "/assets/images/about/thoughtspot-buddies.jpg",
    alt: "Buddies at ThoughtSpot",
    caption: "Buddies at ThoughtSpot",
    className: "md:col-span-1 md:row-span-1 h-[250px] md:h-full"
  }
]

export function AboutGallery() {
  return (
    <section className="py-14 md:py-20 relative">
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

      <div className="max-w-[1100px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-3 md:auto-rows-[300px] gap-4 md:gap-6">
          {IMAGES.map((img, i) => (
            <motion.div
              key={i}
              className={`relative overflow-hidden rounded-2xl glass-panel group ${img.className}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <img 
                src={img.src} 
                alt={img.alt} 
                className="w-full h-full object-cover filter brightness-[0.95] transition-transform duration-700 ease-out group-hover:scale-105 bg-secondary/20"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <p className="text-white text-[16px] md:text-[18px] font-medium drop-shadow-md translate-y-1 transition-transform duration-300 group-hover:translate-y-0">
                  {img.caption}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
