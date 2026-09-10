import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ChevronDown, Calendar, MapPin } from 'lucide-react';
import { useReducedMotion } from '../hooks/useReducedMotion';

export default function HeroSection() {
  const ref = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [1, 1] : [1, 1.06]);

  return (
    <section
      ref={ref}
      id="home"
      className="relative w-full overflow-hidden flex flex-col justify-end"
      style={{ height: '100dvh', minHeight: '520px' }}
    >
      {/* Hero Image with Parallax & Cinematic Blur-to-Sharp Entrance */}
      <motion.div
        className="absolute inset-0"
        style={{ y, scale }}
      >
        <motion.img
          src="/images/couple-1.jpg"
          alt="Jithin & Sreelakshmi – Wedding Portrait"
          className="w-full h-full object-cover"
          style={{ objectPosition: 'center 22%' }}
          initial={
            prefersReducedMotion
              ? { opacity: 0 }
              : { scale: 1.05, filter: 'blur(6px)', opacity: 0 }
          }
          animate={
            prefersReducedMotion
              ? { opacity: 1 }
              : { scale: 1, filter: 'blur(0px)', opacity: 1 }
          }
          transition={{ duration: prefersReducedMotion ? 0.4 : 1.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          loading="eager"
          fetchPriority="high"
        />
      </motion.div>

      {/* Robust Multi-Stop Gradient Overlays for Guaranteed 100% Mobile & Desktop Contrast */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, rgba(13,27,42,0.2) 0%, rgba(13,27,42,0.15) 30%, rgba(13,27,42,0.7) 58%, rgba(13,27,42,0.94) 80%, rgba(13,27,42,0.99) 100%)',
        }}
      />

      {/* Hero Content: Highly optimized vertical proportions to fit gracefully on any phone screen */}
      <motion.div
        className="relative z-10 flex flex-col items-center justify-end text-center px-4 sm:px-6 pb-4 sm:pb-8 md:pb-14 w-full max-w-2xl mx-auto"
        style={{ opacity }}
      >
        {/* Save The Date Pill */}
        <motion.div
          className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 rounded-full border border-champagne/60 bg-navy/80 backdrop-blur-md mb-2 sm:mb-3 shadow-lg"
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 15 }}
          animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          transition={{ delay: prefersReducedMotion ? 0.1 : 0.35, duration: 0.7 }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-champagne animate-pulse" />
          <span className="font-sans text-[9px] sm:text-[11px] tracking-[2.5px] uppercase text-champagne-light font-medium">
            Save The Date
          </span>
        </motion.div>

        {/* Groom Name */}
        <motion.h1
          className="font-serif-display font-normal text-white text-3xl xs:text-4xl sm:text-5xl md:text-6xl leading-none tracking-wide drop-shadow-[0_3px_10px_rgba(0,0,0,0.95)]"
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
          animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          transition={{ delay: prefersReducedMotion ? 0.15 : 0.55, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          Jithin
        </motion.h1>

        {/* Ampersand */}
        <motion.span
          className="font-serif-display italic text-lg xs:text-xl sm:text-2xl md:text-3xl my-0.5 text-champagne-light drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]"
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.75 }}
          animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
          transition={{ delay: prefersReducedMotion ? 0.2 : 0.7, duration: 0.6 }}
        >
          &
        </motion.span>

        {/* Bride Name */}
        <motion.h1
          className="font-serif-display font-normal text-white text-3xl xs:text-4xl sm:text-5xl md:text-6xl leading-none tracking-wide drop-shadow-[0_3px_10px_rgba(0,0,0,0.95)] mb-2 sm:mb-3"
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
          animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          transition={{ delay: prefersReducedMotion ? 0.25 : 0.8, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          Sreelakshmi
        </motion.h1>

        {/* Gold Diamond Divider */}
        <motion.div
          className="flex items-center gap-2 mb-2 sm:mb-3"
          initial={prefersReducedMotion ? { opacity: 0 } : { scaleX: 0, opacity: 0 }}
          animate={prefersReducedMotion ? { opacity: 1 } : { scaleX: 1, opacity: 1 }}
          transition={{ delay: prefersReducedMotion ? 0.3 : 1.0, duration: 0.8 }}
          style={{ transformOrigin: 'center' }}
        >
          <div className="w-8 sm:w-16 h-px bg-gradient-to-r from-transparent to-champagne" />
          <div className="w-1.5 h-1.5 rotate-45 bg-champagne shadow-sm" />
          <div className="w-8 sm:w-16 h-px bg-gradient-to-l from-transparent to-champagne" />
        </motion.div>

        {/* Date & Location Line */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-white text-xs sm:text-sm mb-2.5 sm:mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: prefersReducedMotion ? 0.35 : 1.15, duration: 0.8 }}
        >
          <span className="flex items-center gap-1.5 tracking-[1.5px] uppercase font-sans text-[10px] sm:text-xs text-white/95 font-medium drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
            <Calendar size={12} className="text-champagne shrink-0" />
            Sunday, 25 October 2026
          </span>
          <span className="text-champagne/60 hidden xs:inline">&bull;</span>
          <span className="flex items-center gap-1.5 tracking-[1.5px] uppercase font-sans text-[10px] sm:text-xs text-white/90 font-medium drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
            <MapPin size={12} className="text-champagne shrink-0" />
            Malappuram, Kerala
          </span>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.a
          href="#invitation"
          className="flex flex-col items-center gap-0.5 text-white/80 hover:text-champagne transition-colors duration-300 pt-0.5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: prefersReducedMotion ? 0.4 : 1.35, duration: 0.7 }}
        >
          <span className="font-sans text-[8px] tracking-[2.5px] uppercase">Scroll</span>
          <motion.div
            animate={prefersReducedMotion ? {} : { y: [0, 4, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown size={14} className="text-champagne" />
          </motion.div>
        </motion.a>
      </motion.div>
    </section>
  );
}
