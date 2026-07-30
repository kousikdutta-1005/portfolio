import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

type GalleryImage = {
  id: string
  src: string
  alt: string
  aspectRatio: "square" | "wide" | "tall"
}

// We'll update these paths once you upload the images!
const IMAGES: GalleryImage[] = [
  { id: "img-1", src: "assets/images/about/about-1.png", alt: "Design workshop and presentation", aspectRatio: "tall" },
  { id: "img-2", src: "assets/images/about/about-2.png", alt: "Design event and community gathering", aspectRatio: "wide" },
  { id: "img-3", src: "assets/images/about/about-3.png", alt: "Design event and community gathering", aspectRatio: "wide" },
  { id: "img-4", src: "assets/images/about/about-4.png", alt: "Design workshop and presentation", aspectRatio: "tall" },
  { id: "img-5", src: "assets/images/about/about-5.png", alt: "Design workshop and presentation", aspectRatio: "tall" },
  { id: "img-6", src: "assets/images/about/about-6.png", alt: "Design workshop and presentation", aspectRatio: "tall" },
  { id: "img-7", src: "assets/images/about/about-7.png", alt: "Design workshop and presentation", aspectRatio: "tall" },
  { id: "img-8", src: "assets/images/about/about-8.png", alt: "Design workshop and presentation", aspectRatio: "tall" },
  { id: "img-9", src: "assets/images/about/about-9.png", alt: "Design workshop and presentation", aspectRatio: "tall" },
  { id: "img-10", src: "assets/images/about/about-10.png", alt: "Design workshop and presentation", aspectRatio: "tall" },
  { id: "img-11", src: "assets/images/about/about-11.png", alt: "Design workshop and presentation", aspectRatio: "tall" },
  { id: "img-12", src: "assets/images/about/about-12.png", alt: "Design workshop and presentation", aspectRatio: "tall" },
  { id: "img-13", src: "assets/images/about/about-13.png", alt: "Design workshop and presentation", aspectRatio: "tall" },
  { id: "img-14", src: "assets/images/about/about-14.png", alt: "Design event and community gathering", aspectRatio: "wide" },
  { id: "img-15", src: "assets/images/about/about-15.png", alt: "Design event and community gathering", aspectRatio: "wide" },
  { id: "img-16", src: "assets/images/about/about-16.png", alt: "Design workshop and presentation", aspectRatio: "tall" },
  { id: "img-17", src: "assets/images/about/about-17.png", alt: "Graduation 2023 - Receiving University Gold Medal with Parents", aspectRatio: "tall" },
  { id: "img-18", src: "assets/images/about/about-18.png", alt: "Design workshop and presentation", aspectRatio: "tall" },
  { id: "img-19", src: "assets/images/about/about-19.png", alt: "Design workshop and presentation", aspectRatio: "tall" },
  { id: "img-20", src: "assets/images/about/about-20.png", alt: "Design workshop and presentation", aspectRatio: "tall" },
  { id: "img-21", src: "assets/images/about/about-21.png", alt: "Graduation 2023 - Receiving University Gold Medal with Parents", aspectRatio: "tall" }
]

export function AboutGallery() {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      <div className="max-w-[980px] mx-auto px-6 md:px-10 mb-8 md:mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <p className="section-kicker mb-1.5">Behind the scenes</p>
          <h2 className="text-[28px] md:text-[32px] font-bold tracking-[-0.02em]">
            Life, culture, and <span className="heading-italic">community</span>.
          </h2>
        </motion.div>
      </div>

      {/* Horizontal Scroll Track - Native CSS Scroll Snap */}
      <div className="relative w-full">
        {/* Fades on the edges for a premium look */}
        <div className="absolute top-0 bottom-0 left-0 w-8 md:w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-8 md:w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <div className="flex gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory px-6 md:px-[calc(50vw-490px+40px)] pb-8 pt-4 hide-scrollbar">
          {IMAGES.map((img, i) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                duration: 0.7, 
                delay: i * 0.1, 
                ease: [0.25, 0.1, 0.25, 1] 
              }}
              className={`
                relative overflow-hidden rounded-2xl bg-muted shrink-0 snap-center
                ${img.aspectRatio === "wide" ? "w-[280px] sm:w-[380px] md:w-[460px] aspect-[4/3]" : ""}
                ${img.aspectRatio === "square" ? "w-[240px] sm:w-[280px] md:w-[320px] aspect-square" : ""}
                ${img.aspectRatio === "tall" ? "w-[220px] sm:w-[260px] md:w-[300px] aspect-[3/4]" : ""}
                after:absolute after:inset-0 after:rounded-2xl after:border after:border-foreground/10 after:pointer-events-none
                shadow-sm hover:shadow-md transition-shadow duration-300
              `}
            >
              {img.src ? (
                <img 
                  src={img.src} 
                  alt={img.alt} 
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground bg-gradient-to-br from-background/50 to-muted">
                  <svg className="w-8 h-8 mb-2 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-[13px] font-medium">Image {i + 1} ({img.aspectRatio})</span>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
