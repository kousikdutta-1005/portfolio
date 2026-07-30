import { motion } from "framer-motion"

const IMAGES = [
  {
    src: "/assets/images/about/graduation.jpg",
    alt: "Graduation 2023",
    caption: "Graduation 2023",
    aspect: "tall"
  },
  {
    src: "/assets/images/about/awards.jpg",
    alt: "My award photos",
    caption: "Awards & Recognition",
    aspect: "wide"
  },
  {
    src: "/assets/images/about/cubbon-park.jpg",
    alt: "Me at Cubbon park or Lalbagh",
    caption: "Cubbon Park / Lalbagh",
    aspect: "square"
  },
  {
    src: "/assets/images/about/design-up.jpg",
    alt: "Me at Design UP",
    caption: "Design UP Conference",
    aspect: "tall"
  },
  {
    src: "/assets/images/about/play-crew.jpg",
    alt: "With the crew after a play",
    caption: "With the play crew",
    aspect: "wide"
  },
  {
    src: "/assets/images/about/thoughtspot-buddies.jpg",
    alt: "Buddies at ThoughtSpot",
    caption: "Buddies at ThoughtSpot",
    aspect: "square"
  }
]

export function AboutGallery() {
  return (
    <section className="py-14 md:py-20 relative overflow-hidden">
      <div className="max-w-[980px] mx-auto px-6 md:px-10 mb-8">
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

      <div className="w-full relative">
        {/* Left/Right fade gradients for smooth edges */}
        <div className="absolute top-0 bottom-0 left-0 w-8 md:w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-8 md:w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        {/* Scrolling track */}
        <div className="flex gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory px-6 md:px-[calc(50vw-490px+24px)] pb-8 pt-4 hide-scrollbar">
          {IMAGES.map((img, i) => (
            <motion.div
              key={i}
              className={`relative flex-shrink-0 snap-center rounded-2xl overflow-hidden glass-panel ${
                img.aspect === 'wide' ? 'w-[80vw] md:w-[600px] aspect-[3/2]' :
                img.aspect === 'tall' ? 'w-[60vw] md:w-[400px] aspect-[3/4]' :
                'w-[70vw] md:w-[500px] aspect-square'
              }`}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.05, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <img 
                src={img.src} 
                alt={img.alt} 
                className="w-full h-full object-cover filter brightness-[0.95]"
                loading="lazy"
              />
              <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/60 via-black/30 to-transparent">
                <p className="text-white text-[14px] font-medium drop-shadow-sm">{img.caption}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
