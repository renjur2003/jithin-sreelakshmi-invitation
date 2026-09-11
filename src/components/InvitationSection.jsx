import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';

const createFadeUp = (prefersReducedMotion) => ({
  hidden: prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 18 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: prefersReducedMotion ? 0.05 : i * 0.1,
      duration: 0.7,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
});

export default function InvitationSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const prefersReducedMotion = useReducedMotion();
  const fadeUp = createFadeUp(prefersReducedMotion);

  return (
    <section
      id="invitation"
      ref={ref}
      className="py-14 sm:py-20 md:py-28 relative paper-grain overflow-hidden"
      style={{ background: 'var(--ivory)' }}
    >
      {/* Decorative subtle background aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-champagne/5 rounded-full filter blur-3xl pointer-events-none" />

      {/* Main Luxury Invitation Card */}
      <div className="max-w-3xl mx-auto relative z-10 px-4 sm:px-6">
        <motion.div
          className="relative bg-white/85 backdrop-blur-sm border border-champagne/35 rounded-lg p-5 xs:p-7 sm:p-12 md:p-16 shadow-2xl shadow-champagne/10"
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Inner decorative double border */}
          <div className="absolute inset-2 sm:inset-3 border border-champagne/25 rounded pointer-events-none" />
          <div className="absolute inset-3 sm:inset-4 border border-dashed border-champagne/15 rounded pointer-events-none" />

          {/* Corner gold accents (hidden on mobile) */}
          <div className="hidden sm:block corner-frame tl" style={{ top: '12px', left: '12px' }} />
          <div className="hidden sm:block corner-frame tr" style={{ top: '12px', right: '12px' }} />
          <div className="hidden sm:block corner-frame bl" style={{ bottom: '12px', left: '12px' }} />
          <div className="hidden sm:block corner-frame br" style={{ bottom: '12px', right: '12px' }} />

          <div className="text-center relative z-10">
            {/* Auspicious Blessing Tag */}
            <motion.div
              className="inline-flex items-center gap-2 mb-4 sm:mb-6"
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              custom={0}
            >
              <motion.div
                className="w-5 sm:w-6 h-px bg-champagne/60"
                initial={prefersReducedMotion ? {} : { scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.6 }}
                style={{ transformOrigin: 'right' }}
              />
              <p className="font-sans text-[9px] xs:text-[10px] sm:text-xs tracking-[3px] sm:tracking-[4px] uppercase text-champagne-dark font-medium">
                With Divine Blessings
              </p>
              <motion.div
                className="w-5 sm:w-6 h-px bg-champagne/60"
                initial={prefersReducedMotion ? {} : { scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.6 }}
                style={{ transformOrigin: 'left' }}
              />
            </motion.div>

            {/* Invitation Prose */}
            <motion.p
              className="font-serif-display italic text-base xs:text-lg sm:text-xl md:text-2xl text-navy font-light leading-relaxed mb-6 sm:mb-8 max-w-xl mx-auto"
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              custom={1}
            >
              As we begin our life together, we warmly invite you to share in the joy of our wedding and bless our new beginning.
            </motion.p>

            {/* Central Couple Name Display with Animated Gold Border Draw */}
            <div className="my-6 sm:my-8 py-4 sm:py-6 relative">
              {/* Top border line with animated draw */}
              <motion.div
                className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-champagne/50 to-transparent"
                initial={prefersReducedMotion ? {} : { scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{ delay: 0.3, duration: 0.8 }}
                style={{ transformOrigin: 'center' }}
              />

              <motion.h2
                className="font-serif-display gold-shimmer text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-light tracking-wide py-0.5"
                variants={fadeUp}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                custom={2}
              >
                Jithin
              </motion.h2>

              <motion.div
                className="flex items-center justify-center gap-2 sm:gap-3 my-2 sm:my-3"
                variants={fadeUp}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                custom={3}
              >
                <div className="w-8 sm:w-12 h-px bg-champagne/40" />
                <span className="font-serif-display italic text-xl sm:text-2xl text-champagne-dark">
                  ties the knot with
                </span>
                <div className="w-8 sm:w-12 h-px bg-champagne/40" />
              </motion.div>

              <motion.h2
                className="font-serif-display gold-shimmer text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-light tracking-wide py-0.5"
                variants={fadeUp}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                custom={4}
              >
                Sreelakshmi
              </motion.h2>

              {/* Bottom border line with animated draw */}
              <motion.div
                className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-champagne/50 to-transparent"
                initial={prefersReducedMotion ? {} : { scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{ delay: 0.5, duration: 0.8 }}
                style={{ transformOrigin: 'center' }}
              />
            </div>

            {/* Heartfelt Note */}
            <motion.div
              className="pt-4 sm:pt-6 border-t border-champagne/20"
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              custom={5}
            >
              <p className="font-serif-display text-sm sm:text-base md:text-lg text-charcoal-light font-light italic leading-relaxed">
                “Your presence and gracious blessings will be the greatest gift as they embark on this joyous journey of love and togetherness.”
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
