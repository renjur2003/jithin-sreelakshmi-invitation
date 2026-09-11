import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useEffect } from 'react';
import { ChevronDown, Calendar } from 'lucide-react';
import { useReducedMotion } from '../hooks/useReducedMotion';

export default function HeroSection() {
  const ref = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  // Gentle auto-scroll assist: if the user hasn't scrolled after 4.5 seconds, guide them down to #invitation
  useEffect(() => {
    if (prefersReducedMotion) return;

    let userHasScrolled = false;

    const onUserScroll = () => {
      userHasScrolled = true;
      window.removeEventListener('scroll', onUserScroll);
      window.removeEventListener('wheel', onUserScroll);
      window.removeEventListener('touchmove', onUserScroll);
    };

    window.addEventListener('scroll', onUserScroll, { passive: true });
    window.addEventListener('wheel', onUserScroll, { passive: true });
    window.addEventListener('touchmove', onUserScroll, { passive: true });

    const timer = setTimeout(() => {
      if (!userHasScrolled && window.scrollY < 60) {
        const target = document.getElementById('invitation');
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }, 4500);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', onUserScroll);
      window.removeEventListener('wheel', onUserScroll);
      window.removeEventListener('touchmove', onUserScroll);
    };
  }, [prefersReducedMotion]);

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
      {/* Hero Image with Parallax & Cinematic 1.04 -> 1 Reveal */}
      <motion.div
        className="absolute inset-0"
        style={{ y, scale }}
      >
        <motion.img
          src="/images/couple-1.jpg"
          alt="Jithin & Sreelakshmi – Wedding Portrait"
          className="w-full h-full object-cover"
          style={{ objectPosition: 'center 66%' }}
          initial={
            prefersReducedMotion
              ? { opacity: 0 }
              : { scale: 1.04, opacity: 0 }
          }
          animate={
            prefersReducedMotion
              ? { opacity: 1 }
              : { scale: 1, opacity: 1 }
          }
          transition={{
            duration: prefersReducedMotion ? 0.4 : 1.8,
            ease: [0.16, 1, 0.3, 1],
          }}
          loading="eager"
          fetchPriority="high"
        />
      </motion.div>

      {/* Subtle Champagne Gold Dust / Light Particles (Optimized 12 particles) */}
      {!prefersReducedMotion && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-[5]">
          {[
            { id: 1, left: '18%', top: '35%', size: 3, dur: 4.2, delay: 0.2 },
            { id: 2, left: '32%', top: '48%', size: 2.5, dur: 5.1, delay: 0.8 },
            { id: 3, left: '55%', top: '30%', size: 3.5, dur: 4.6, delay: 0.4 },
            { id: 4, left: '72%', top: '42%', size: 2.5, dur: 5.5, delay: 1.1 },
            { id: 5, left: '84%', top: '58%', size: 3, dur: 4.8, delay: 0.6 },
            { id: 6, left: '12%', top: '62%', size: 2, dur: 5.8, delay: 1.4 },
            { id: 7, left: '44%', top: '22%', size: 3, dur: 4.4, delay: 0.9 },
            { id: 8, left: '65%', top: '65%', size: 2.5, dur: 5.2, delay: 0.3 },
            { id: 9, left: '26%', top: '72%', size: 2, dur: 6.0, delay: 1.7 },
            { id: 10, left: '78%', top: '26%', size: 3, dur: 4.9, delay: 0.5 },
            { id: 11, left: '48%', top: '56%', size: 2.5, dur: 5.4, delay: 1.2 },
            { id: 12, left: '90%', top: '40%', size: 2, dur: 5.0, delay: 0.7 },
          ].map((d) => (
            <motion.div
              key={d.id}
              className="absolute rounded-full"
              style={{
                left: d.left,
                top: d.top,
                width: d.size,
                height: d.size,
                background: 'radial-gradient(circle, rgba(232,212,154,0.85) 0%, rgba(201,168,76,0.3) 60%, transparent 100%)',
                boxShadow: '0 0 6px rgba(201,168,76,0.6)',
              }}
              animate={{
                y: [0, -32, 0],
                x: [0, (d.id % 2 === 0 ? 8 : -8), 0],
                opacity: [0.15, 0.75, 0.15],
                scale: [0.8, 1.25, 0.8],
              }}
              transition={{
                duration: d.dur,
                delay: d.delay,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>
      )}

      {/* Crystal-Clear Editorial Gradient: transparent across the couple for maximum visibility, gentle fade only at bottom */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, rgba(13,27,42,0.18) 0%, transparent 22%, transparent 48%, rgba(13,27,42,0.32) 68%, rgba(13,27,42,0.72) 86%, rgba(13,27,42,0.96) 100%)',
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
          transition={{ delay: prefersReducedMotion ? 0.1 : 0.4, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-champagne animate-pulse" />
          <span className="font-sans text-[9px] sm:text-[11px] tracking-[2.5px] uppercase text-champagne-light font-medium">
            Save The Date
          </span>
        </motion.div>

        {/* Groom Name */}
        <motion.h1
          className="font-serif-display font-normal text-white text-3xl xs:text-4xl sm:text-5xl md:text-6xl leading-none tracking-wide drop-shadow-[0_3px_10px_rgba(0,0,0,0.95)]"
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 22 }}
          animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          transition={{ delay: prefersReducedMotion ? 0.15 : 0.6, duration: 0.85, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          Jithin
        </motion.h1>

        {/* Ampersand */}
        <motion.span
          className="font-serif-display italic text-lg xs:text-xl sm:text-2xl md:text-3xl my-0.5 text-champagne-light drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]"
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.75 }}
          animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
          transition={{ delay: prefersReducedMotion ? 0.2 : 0.75, duration: 0.6 }}
        >
          &
        </motion.span>

        {/* Bride Name */}
        <motion.h1
          className="font-serif-display font-normal text-white text-3xl xs:text-4xl sm:text-5xl md:text-6xl leading-none tracking-wide drop-shadow-[0_3px_10px_rgba(0,0,0,0.95)] mb-2 sm:mb-3"
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 22 }}
          animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          transition={{ delay: prefersReducedMotion ? 0.25 : 0.9, duration: 0.85, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          Sreelakshmi
        </motion.h1>

        {/* Gold Diamond Divider */}
        <motion.div
          className="flex items-center gap-2 mb-2 sm:mb-3"
          initial={prefersReducedMotion ? { opacity: 0 } : { scaleX: 0, opacity: 0 }}
          animate={prefersReducedMotion ? { opacity: 1 } : { scaleX: 1, opacity: 1 }}
          transition={{ delay: prefersReducedMotion ? 0.3 : 1.1, duration: 0.8 }}
          style={{ transformOrigin: 'center' }}
        >
          <div className="w-8 sm:w-16 h-px bg-gradient-to-r from-transparent to-champagne" />
          <div className="w-1.5 h-1.5 rotate-45 bg-champagne shadow-sm" />
          <div className="w-8 sm:w-16 h-px bg-gradient-to-l from-transparent to-champagne" />
        </motion.div>

        {/* Date Line */}
        <motion.div
          className="flex items-center justify-center text-white text-xs sm:text-sm mb-2.5 sm:mb-4"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: prefersReducedMotion ? 0.35 : 1.25, duration: 0.8 }}
        >
          <span className="flex items-center gap-1.5 tracking-[1.5px] uppercase font-sans text-[10px] sm:text-xs text-white/95 font-medium drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
            <Calendar size={12} className="text-champagne shrink-0" />
            Sunday, 25 October 2026
          </span>
        </motion.div>

        {/* Prominent Primary CTA Button: View Invitation Details */}
        <motion.div
          className="mt-1 sm:mt-2 mb-2 sm:mb-3"
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
          animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          transition={{ delay: prefersReducedMotion ? 0.35 : 1.35, duration: 0.8 }}
        >
          <a
            href="#invitation"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('invitation')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="btn-primary btn-shimmer group relative inline-flex items-center gap-2.5 px-6 sm:px-8 py-3 rounded-full text-xs sm:text-sm uppercase tracking-[2.2px] font-semibold text-navy shadow-xl shadow-black/40 hover:shadow-[0_8px_30px_rgba(201,168,76,0.45)] active:scale-95 transition-all duration-300 border border-champagne-light/70"
            aria-label="Scroll down to view wedding invitation details"
          >
            <span>View Invitation Details</span>
            <motion.span
              animate={prefersReducedMotion ? {} : { y: [0, 3, 0] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
              className="text-navy flex items-center"
            >
              <ChevronDown size={16} strokeWidth={2.5} />
            </motion.span>
          </a>
        </motion.div>

        {/* Elegant Animated Mouse Scroll Guide */}
        <motion.a
          href="#invitation"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById('invitation')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="flex flex-col items-center gap-1.5 text-champagne-light/90 hover:text-champagne transition-colors duration-300 pt-0.5 cursor-pointer group select-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: prefersReducedMotion ? 0.4 : 1.55, duration: 0.7 }}
        >
          <span className="font-sans text-[9px] sm:text-[10px] tracking-[2.8px] uppercase font-medium group-hover:tracking-[3.5px] transition-all text-white/90">
            Scroll To Explore
          </span>
          <motion.div
            className="w-5 h-7 rounded-full border border-champagne/60 flex items-start justify-center p-1 shadow-sm group-hover:border-champagne"
            animate={prefersReducedMotion ? {} : { y: [0, 3, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <motion.div
              className="w-1 h-2 rounded-full bg-champagne"
              animate={prefersReducedMotion ? {} : { y: [0, 8, 0], opacity: [1, 0.2, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>
        </motion.a>
      </motion.div>
    </section>
  );
}
