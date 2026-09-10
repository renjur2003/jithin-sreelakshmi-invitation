import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Sparkles } from 'lucide-react';
import { useReducedMotion } from '../hooks/useReducedMotion';

export default function TimelineSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      ref={ref}
      className="py-12 sm:py-20 md:py-24 relative paper-grain overflow-hidden"
      style={{ background: 'var(--ivory-100)' }}
    >
      <div className="max-w-md mx-auto text-center px-5 sm:px-6 relative z-10">
        <motion.p
          className="font-sans text-[10px] sm:text-xs tracking-[3px] sm:tracking-[4px] uppercase mb-6 sm:mb-8 text-champagne-dark font-medium"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
        >
          Event Day Timeline
        </motion.p>

        {/* Event 1: Ceremony */}
        <motion.div
          className="mb-3"
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <p className="font-serif-display text-lg sm:text-xl md:text-2xl mb-0.5 text-navy font-medium">
            10:30 AM – 11:30 AM
          </p>
          <p className="font-sans text-[11px] sm:text-xs tracking-[2px] sm:tracking-[3px] uppercase text-champagne-dark font-medium">
            Muhurtham &bull; Wedding Ceremony
          </p>
          <p className="font-sans text-[11px] text-charcoal-light mt-0.5">
            Event City, Pang South
          </p>
        </motion.div>

        {/* Connecting Line 1 */}
        <motion.div
          className="flex justify-center my-4 sm:my-5"
          initial={prefersReducedMotion ? { opacity: 0 } : { scaleY: 0, opacity: 0 }}
          animate={isInView ? { scaleY: 1, opacity: 1 } : {}}
          transition={{ delay: 0.4, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ transformOrigin: 'top center' }}
        >
          <div
            className="w-px h-14 sm:h-16"
            style={{
              background: 'linear-gradient(to bottom, var(--champagne), var(--champagne-light), var(--champagne))',
              boxShadow: '0 0 4px rgba(201,168,76,0.3)',
            }}
          />
        </motion.div>

        {/* Center Sparkle Ring */}
        <motion.div
          className="flex justify-center mb-4 sm:mb-5"
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.4 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.7, duration: 0.5, ease: 'easeOut' }}
        >
          <div className="w-7 h-7 rounded-full border border-champagne/50 bg-white flex items-center justify-center shadow-md shadow-champagne/15 seal-pulse">
            <Sparkles size={12} className="text-champagne-dark" />
          </div>
        </motion.div>

        {/* Connecting Line 2 */}
        <motion.div
          className="flex justify-center mb-4 sm:mb-5"
          initial={prefersReducedMotion ? { opacity: 0 } : { scaleY: 0, opacity: 0 }}
          animate={isInView ? { scaleY: 1, opacity: 1 } : {}}
          transition={{ delay: 0.9, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ transformOrigin: 'top center' }}
        >
          <div
            className="w-px h-14 sm:h-16"
            style={{
              background: 'linear-gradient(to bottom, var(--champagne), var(--champagne-light), var(--champagne))',
              boxShadow: '0 0 4px rgba(201,168,76,0.3)',
            }}
          />
        </motion.div>

        {/* Event 2: Reception */}
        <motion.div
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.1, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <p className="font-serif-display text-lg sm:text-xl md:text-2xl mb-0.5 text-navy font-medium">
            5:00 PM Onwards
          </p>
          <p className="font-sans text-[11px] sm:text-xs tracking-[2px] sm:tracking-[3px] uppercase text-champagne-dark font-medium">
            Evening Wedding Reception
          </p>
          <p className="font-sans text-[11px] text-charcoal-light mt-0.5">
            Zahara Convention Centre, Palakkodu
          </p>
        </motion.div>
      </div>
    </section>
  );
}
