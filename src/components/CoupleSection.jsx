import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Heart } from 'lucide-react';
import { useReducedMotion } from '../hooks/useReducedMotion';

export default function CoupleSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const imgY = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [-25, 25]);

  return (
    <section
      id="story"
      ref={ref}
      className="py-14 sm:py-20 md:py-28 relative overflow-hidden paper-grain"
      style={{ background: 'var(--ivory-100)' }}
    >
      <div className="max-w-5xl mx-auto px-5 sm:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          {/* Portrait Image Side with Luxury Frame & Gentle Parallax */}
          <motion.div
            className="w-full lg:w-1/2 relative flex justify-center px-2"
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="relative max-w-xs sm:max-w-sm w-full">
              {/* Offset Gold Border Accent */}
              <motion.div
                className="absolute -top-2.5 -left-2.5 sm:-top-3.5 sm:-left-3.5 w-full h-full border-2 border-champagne/40 rounded-sm pointer-events-none"
                initial={prefersReducedMotion ? {} : { scale: 0.96, opacity: 0 }}
                animate={isInView ? { scale: 1, opacity: 1 } : {}}
                transition={{ delay: 0.2, duration: 0.8 }}
              />

              {/* Image Container with Parallax Internal Shift */}
              <div className="relative overflow-hidden rounded-sm shadow-2xl bg-white p-2 border border-champagne/20">
                <motion.div
                  className="overflow-hidden"
                  style={{ y: imgY }}
                >
                  <img
                    src="/images/couple-2.jpg"
                    alt="Jithin & Sreelakshmi – A Beautiful Chapter Together"
                    className="w-full aspect-[3/4] object-cover transition-transform duration-700 hover:scale-105"
                    style={{ objectPosition: 'center 45%' }}
                    loading="lazy"
                  />
                </motion.div>
              </div>

              {/* Floating Monogram Badge */}
              <motion.div
                className="absolute -bottom-3 -right-3 sm:-bottom-4 sm:-right-4 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white border border-champagne/45 shadow-xl flex items-center justify-center seal-pulse"
                initial={prefersReducedMotion ? {} : { scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ delay: 0.4, duration: 0.5, ease: 'easeOut' }}
              >
                <span className="font-serif-display font-medium text-navy text-base sm:text-lg">
                  J<span className="text-champagne-dark font-light italic text-xs sm:text-sm">&</span>S
                </span>
              </motion.div>
            </div>
          </motion.div>

          {/* Story & Couple Details */}
          <motion.div
            className="w-full lg:w-1/2 text-center lg:text-left pt-2 lg:pt-0"
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="inline-flex items-center gap-2 mb-3 justify-center lg:justify-start">
              <span className="w-5 sm:w-6 h-px bg-champagne/60" />
              <p className="font-sans text-[10px] sm:text-xs tracking-[3px] sm:tracking-[4px] uppercase text-champagne-dark font-medium">
                Our Story
              </p>
            </div>

            <h2 className="font-serif-display text-2xl xs:text-3xl sm:text-4xl md:text-5xl text-navy font-light leading-tight mb-4 sm:mb-6">
              Two Hearts.<br />
              One Timeless Journey.
            </h2>

            <p className="font-serif-display text-base sm:text-lg text-charcoal-light font-light italic leading-relaxed mb-6 max-w-md mx-auto lg:mx-0">
              “Every love story is unique and special, but ours is our absolute favorite. Together, we celebrate the magic of love, companionship, and dreams turned to reality.”
            </p>

            {/* Groom & Bride Mini Profile Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 my-6 text-left">
              <div className="p-3.5 sm:p-4 rounded bg-white/70 border border-champagne/25 shadow-sm transition-all duration-300 hover:shadow-md hover:border-champagne/45">
                <p className="font-sans text-[9px] sm:text-[10px] tracking-[2px] uppercase text-champagne-dark font-semibold mb-0.5">
                  The Groom
                </p>
                <h3 className="font-serif-display text-lg sm:text-xl text-navy font-normal mb-0.5">
                  Jithin
                </h3>
                <p className="font-sans text-[10px] sm:text-[11px] text-charcoal-light leading-snug">
                  S/o Mrs.Shylaja Sajeev & Late Mr. Sajeev Kumar
                </p>
              </div>

              <div className="p-3.5 sm:p-4 rounded bg-white/70 border border-champagne/25 shadow-sm transition-all duration-300 hover:shadow-md hover:border-champagne/45">
                <p className="font-sans text-[9px] sm:text-[10px] tracking-[2px] uppercase text-champagne-dark font-semibold mb-0.5">
                  The Bride
                </p>
                <h3 className="font-serif-display text-lg sm:text-xl text-navy font-normal mb-0.5">
                  Sreelakshmi
                </h3>
                <p className="font-sans text-[10px] sm:text-[11px] text-charcoal-light leading-snug">
                  D/o Mrs. Gayathri Mohanan & Mr. Mohanan VK
                </p>
              </div>
            </div>

            {/* Bottom Heart Badge */}
            <div className="flex items-center gap-2 justify-center lg:justify-start text-[11px] sm:text-xs font-sans text-charcoal-light tracking-[1.5px] sm:tracking-[2px] uppercase pt-1">
              <Heart size={13} className="text-champagne fill-champagne/30 shrink-0" />
              <span>Happily Ever After Begins 25 Oct 2026</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
