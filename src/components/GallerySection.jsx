import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { weddingData } from '../data/weddingData';
import { Camera, ZoomIn } from 'lucide-react';
import { useReducedMotion } from '../hooks/useReducedMotion';

export default function GallerySection({ onImageClick }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const prefersReducedMotion = useReducedMotion();
  const photos = weddingData.photos;

  return (
    <section
      id="moments"
      ref={ref}
      className="py-14 sm:py-20 md:py-28 relative paper-grain overflow-hidden"
      style={{ background: 'var(--ivory-100)' }}
    >
      <div className="max-w-6xl mx-auto relative z-10 px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-14">
          <motion.div
            className="inline-flex items-center gap-2 mb-2"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7 }}
          >
            <Camera size={13} className="text-champagne-dark" />
            <p className="font-sans text-[10px] sm:text-xs tracking-[3px] sm:tracking-[4px] uppercase text-champagne-dark font-medium">
              Cherished Moments
            </p>
          </motion.div>

          <motion.h2
            className="font-serif-display text-2xl xs:text-3xl sm:text-4xl md:text-5xl text-navy font-light tracking-wide"
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15, duration: 0.7 }}
          >
            Glimpses of Love
          </motion.h2>

          <motion.div
            className="ornament-line mt-4 sm:mt-6 w-28 sm:w-32 mx-auto"
            initial={prefersReducedMotion ? {} : { scaleX: 0, opacity: 0 }}
            animate={isInView ? { scaleX: 1, opacity: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.7 }}
            style={{ transformOrigin: 'center' }}
          >
            <span className="dot" />
          </motion.div>
        </div>

        {/* Editorial 6-Photo Grid (2 cols mobile, 3 cols desktop) */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5 md:gap-7">
          {photos.map((photo, index) => (
            <motion.div
              key={photo.id || index}
              className="relative group cursor-pointer overflow-hidden rounded-lg sm:rounded-xl shadow-md hover:shadow-2xl transition-all duration-500 border border-champagne/25 bg-white"
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 25 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + index * 0.08, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
              onClick={() => onImageClick(photo.src, index)}
            >
              <div className="overflow-hidden aspect-[3/4] relative">
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  style={{ objectPosition: photo.objectPosition }}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-navy/35 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-3 text-center">
                  <span className="p-2.5 sm:p-3 rounded-full bg-white/95 text-navy shadow-lg backdrop-blur-sm transform transition-all duration-300 group-hover:scale-110 mb-1.5 sm:mb-2">
                    <ZoomIn size={16} className="sm:w-[18px] sm:h-[18px]" />
                  </span>
                  <span className="font-sans text-[9px] sm:text-[11px] tracking-[1.5px] sm:tracking-[2px] uppercase text-white/95 font-medium drop-shadow-md px-2 line-clamp-1">
                    {photo.alt.split('–')[1]?.trim() || 'View Photo'}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Caption Hint */}
        <p className="text-center font-sans text-[10px] sm:text-[11px] tracking-[2px] uppercase text-charcoal-light mt-6 sm:mt-8">
          Tap any photo to view full gallery
        </p>
      </div>
    </section>
  );
}
