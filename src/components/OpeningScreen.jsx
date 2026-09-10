import { motion } from 'framer-motion';
import { useMemo } from 'react';
import { Sparkles } from 'lucide-react';
import { useReducedMotion } from '../hooks/useReducedMotion';

const FloatingParticle = ({ delay, x, size, duration, tx }) => (
  <motion.div
    className="absolute rounded-full pointer-events-none"
    style={{
      width: size,
      height: size,
      left: `${x}%`,
      bottom: '8%',
      background: 'radial-gradient(circle, rgba(212,175,55,0.75) 0%, rgba(212,175,55,0.2) 60%, transparent 100%)',
      boxShadow: '0 0 8px rgba(212,175,55,0.5)',
    }}
    animate={{
      y: [0, -220, -420],
      x: [0, tx * 0.5, tx],
      opacity: [0, 0.75, 0],
      scale: [0.6, 1.2, 0.4],
    }}
    transition={{
      duration: duration,
      delay: delay,
      repeat: Infinity,
      ease: 'easeInOut',
    }}
  />
);

export default function OpeningScreen({ onOpen }) {
  const prefersReducedMotion = useReducedMotion();

  const particles = useMemo(() =>
    Array.from({ length: 28 }, (_, i) => ({
      id: i,
      delay: (i * 0.25) % 4,
      x: Math.round(((i * 37) % 94) + 3),
      size: 2.5 + ((i * 3) % 4),
      duration: 5.5 + ((i * 1.3) % 3.5),
      tx: ((i % 2 === 0 ? 1 : -1) * (20 + ((i * 7) % 30))),
    })), []
  );

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center opening-bg overflow-hidden select-none"
      initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, filter: 'blur(8px)', scale: 1.02 }}
      animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, filter: 'blur(0px)', scale: 1 }}
      transition={{ duration: prefersReducedMotion ? 0.3 : 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
      exit={{
        opacity: 0,
        scale: prefersReducedMotion ? 1 : 1.08,
        filter: prefersReducedMotion ? 'none' : 'blur(8px)',
        transition: { duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] },
      }}
    >
      {/* Subtle Noise Texture */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Floating Gold Sparkle Dust */}
      {!prefersReducedMotion && particles.map((p) => (
        <FloatingParticle key={p.id} {...p} />
      ))}

      {/* Corner Ornaments */}
      <div className="corner-frame tl" />
      <div className="corner-frame tr" />
      <div className="corner-frame bl" />
      <div className="corner-frame br" />
      <div className="corner-dot tl" />
      <div className="corner-dot tr" />
      <div className="corner-dot bl" />
      <div className="corner-dot br" />

      {/* Outer Border Inset Frame */}
      <div className="absolute inset-4 md:inset-8 border border-champagne/20 pointer-events-none rounded-sm" />
      <div className="absolute inset-5 md:inset-10 border border-champagne/10 pointer-events-none rounded-sm" />

      {/* Card Body */}
      <div className="relative z-10 text-center px-6 max-w-xl mx-auto flex flex-col items-center">
        {/* Monogram Seal */}
        <motion.div
          className="relative mb-6 flex items-center justify-center"
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.6, rotate: -12 }}
          animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1.1, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border border-champagne/50 bg-white/50 backdrop-blur-md flex items-center justify-center shadow-lg shadow-champagne/15 relative seal-pulse">
            <div className="absolute inset-1 rounded-full border border-dashed border-champagne/35" />
            <span className="font-serif-display text-2xl md:text-3xl font-medium tracking-widest text-navy pt-1">
              J<span className="text-champagne-dark font-light text-xl italic mx-0.5">&</span>S
            </span>
          </div>
          {/* Subtle glow behind seal */}
          <div className="absolute -inset-2 rounded-full bg-champagne/20 filter blur-md -z-10 animate-pulse" />
        </motion.div>

        {/* Small Intro Heading */}
        <motion.p
          className="font-sans text-[11px] md:text-xs tracking-[4px] md:tracking-[5px] uppercase text-charcoal-light font-medium mb-4"
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 15 }}
          animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.8 }}
        >
          Together with their families
        </motion.p>

        {/* Ornate Divider */}
        <motion.div
          className="ornament-line mb-6 w-48"
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scaleX: 0 }}
          animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, scaleX: 1 }}
          transition={{ delay: 0.45, duration: 0.8 }}
          style={{ transformOrigin: 'center' }}
        >
          <span className="dot" />
        </motion.div>

        {/* Couple Names */}
        <div className="my-2 flex flex-col items-center">
          <motion.h1
            className="font-serif-display text-4xl sm:text-5xl md:text-6xl text-navy font-normal tracking-wide"
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 22 }}
            animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            Jithin
          </motion.h1>

          <motion.div
            className="my-1 md:my-2 flex items-center gap-3"
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.5 }}
            animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
            transition={{ delay: 0.85, duration: 0.7 }}
          >
            <div className="w-8 h-px bg-champagne/40" />
            <span className="font-serif-display italic text-2xl md:text-3xl text-champagne-dark font-light">
              &
            </span>
            <div className="w-8 h-px bg-champagne/40" />
          </motion.div>

          <motion.h1
            className="font-serif-display text-4xl sm:text-5xl md:text-6xl text-navy font-normal tracking-wide"
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 22 }}
            animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            Sreelakshmi
          </motion.h1>
        </div>

        {/* Subtitle / Date */}
        <motion.p
          className="font-sans text-[10px] md:text-xs tracking-[4px] uppercase text-champagne-dark font-medium mt-6 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.25, duration: 0.8 }}
        >
          Sunday &bull; 25 October 2026 &bull; Malappuram
        </motion.p>

        {/* Button CTA */}
        <motion.button
          className="btn-gold group relative cursor-pointer shadow-md hover:shadow-xl transition-all duration-300"
          onClick={onOpen}
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 18 }}
          animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          transition={{ delay: 1.45, duration: 0.8 }}
          whileHover={prefersReducedMotion ? {} : { scale: 1.04 }}
          whileTap={prefersReducedMotion ? {} : { scale: 0.97 }}
        >
          <span className="relative z-10 flex items-center gap-2">
            <Sparkles size={13} className="text-champagne animate-spin-slow" />
            Open Invitation
            <Sparkles size={13} className="text-champagne animate-spin-slow" />
          </span>
        </motion.button>
      </div>
    </motion.div>
  );
}
