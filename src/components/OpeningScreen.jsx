import { motion } from 'framer-motion';
import { useMemo, useState, useEffect } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
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
  const [isOpening, setIsOpening] = useState(false);

  // Preload hero portrait immediately on mount
  useEffect(() => {
    const img = new Image();
    img.src = '/images/couple-1.jpg';
  }, []);

  const particles = useMemo(() =>
    Array.from({ length: 24 }, (_, i) => ({
      id: i,
      delay: (i * 0.25) % 4,
      x: Math.round(((i * 37) % 94) + 3),
      size: 2.5 + ((i * 3) % 4),
      duration: 5.5 + ((i * 1.3) % 3.5),
      tx: ((i % 2 === 0 ? 1 : -1) * (20 + ((i * 7) % 30))),
    })), []
  );

  const handleOpenClick = () => {
    if (isOpening) return;
    setIsOpening(true);
    onOpen();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden select-none pointer-events-auto">
      {/* ── Left Luxury Curtain Panel ─────────────────────────────────── */}
      <motion.div
        className="curtain-panel-left"
        initial={{ x: 0 }}
        animate={isOpening ? { x: prefersReducedMotion ? '-100%' : '-102%' } : { x: 0 }}
        transition={{
          duration: prefersReducedMotion ? 0.3 : 1.25,
          ease: [0.76, 0, 0.24, 1],
        }}
      >
        {/* Subtle Noise Texture */}
        <div
          className="absolute inset-0 opacity-[0.035] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
        {/* Left Corner Ornaments */}
        <div className="corner-frame tl" />
        <div className="corner-frame bl" />
        <div className="corner-dot tl" />
        <div className="corner-dot bl" />
        <div className="absolute inset-4 md:inset-8 border-l border-t border-b border-champagne/20 pointer-events-none rounded-l-sm" />
      </motion.div>

      {/* ── Right Luxury Curtain Panel ────────────────────────────────── */}
      <motion.div
        className="curtain-panel-right"
        initial={{ x: 0 }}
        animate={isOpening ? { x: prefersReducedMotion ? '100%' : '102%' } : { x: 0 }}
        transition={{
          duration: prefersReducedMotion ? 0.3 : 1.25,
          ease: [0.76, 0, 0.24, 1],
        }}
      >
        {/* Subtle Noise Texture */}
        <div
          className="absolute inset-0 opacity-[0.035] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
        {/* Right Corner Ornaments */}
        <div className="corner-frame tr" />
        <div className="corner-frame br" />
        <div className="corner-dot tr" />
        <div className="corner-dot br" />
        <div className="absolute inset-4 md:inset-8 border-r border-t border-b border-champagne/20 pointer-events-none rounded-r-sm" />
      </motion.div>

      {/* ── Soft Radial Golden Light Expanding from Button (Step 2) ───── */}
      {isOpening && !prefersReducedMotion && (
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-30 rounded-full"
          style={{
            width: '260px',
            height: '260px',
            background:
              'radial-gradient(circle, rgba(255,248,228,0.95) 0%, rgba(232,212,154,0.75) 25%, rgba(201,168,76,0.4) 55%, transparent 75%)',
          }}
          initial={{ scale: 0.1, opacity: 1 }}
          animate={{ scale: 4.8, opacity: 0 }}
          transition={{ duration: 1.15, ease: [0.22, 1, 0.36, 1] }}
        />
      )}

      {/* ── Central Card Body & Interactive Content ───────────────────── */}
      <motion.div
        className="relative z-20 flex items-center justify-center w-full h-full"
        animate={
          isOpening
            ? {
                opacity: 0,
                scale: prefersReducedMotion ? 1 : 1.04,
                transition: { duration: 0.6, ease: 'easeOut' },
              }
            : { opacity: 1, scale: 1 }
        }
      >
        {/* Floating Gold Sparkle Dust */}
        {!prefersReducedMotion && !isOpening && particles.map((p) => (
          <FloatingParticle key={p.id} {...p} />
        ))}

        {/* Card Content */}
        <div className="relative text-center px-6 max-w-xl mx-auto flex flex-col items-center">
          {/* Monogram Seal */}
          <motion.div
            className="relative mb-6 flex items-center justify-center"
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.6, rotate: -12 }}
            animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border border-champagne/50 bg-white/60 backdrop-blur-md flex items-center justify-center shadow-lg shadow-champagne/15 relative seal-pulse">
              <div className="absolute inset-1 rounded-full border border-dashed border-champagne/35" />
              <span className="font-serif-display text-2xl md:text-3xl font-medium tracking-widest text-navy pt-1">
                J<span className="text-champagne-dark font-light text-xl italic mx-0.5">&</span>S
              </span>
            </div>
            {/* Subtle glow behind seal */}
            <div className="absolute -inset-2 rounded-full bg-champagne/20 filter blur-md -z-10 animate-pulse" />
          </motion.div>

          {/* Intro Heading */}
          <motion.p
            className="font-serif-display italic text-sm sm:text-base text-charcoal-light/90 font-light leading-relaxed text-center mb-4 px-2 max-w-xs"
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 15 }}
            animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.8 }}
          >
            As we begin our life together, we warmly invite you to share in the joy of our wedding and bless our new beginning.
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

          {/* Date */}
          <motion.p
            className="font-sans text-[10px] md:text-xs tracking-[4px] uppercase text-champagne-dark font-medium mt-6 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.25, duration: 0.8 }}
          >
            Sunday &bull; 25 October 2026
          </motion.p>

          {/* Primary CTA Button (Step 1: Press + Champagne Gold Radiant Glow) */}
          <motion.div
            className="relative inline-flex flex-col items-center mt-2"
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 18 }}
            animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.8 }}
          >
            {/* Breathing halo ring */}
            {!isOpening && (
              <div className="absolute -inset-1.5 rounded-full cta-breathing pointer-events-none opacity-80" />
            )}

            <motion.button
              className="btn-primary btn-shimmer relative z-10 cursor-pointer text-xs md:text-sm tracking-[2.8px] sm:tracking-[3.5px] py-4 px-9 sm:px-11 min-h-[52px] shadow-xl group border border-white/70 active:scale-[0.97]"
              onClick={handleOpenClick}
              whileHover={prefersReducedMotion || isOpening ? {} : { scale: 1.03 }}
              whileTap={prefersReducedMotion || isOpening ? {} : { scale: 0.96 }}
              animate={
                isOpening
                  ? {
                      scale: [1, 0.96, 1.05],
                      boxShadow: [
                        '0 4px 20px rgba(201,168,76,0.3)',
                        '0 0 35px rgba(201,168,76,0.95)',
                        '0 0 50px rgba(245,237,211,0.9)',
                      ],
                    }
                  : {}
              }
              transition={{ duration: 0.5, ease: 'easeOut' }}
              aria-label="Open wedding invitation"
            >
              <span className="relative z-10 flex items-center gap-3">
                <Sparkles size={14} className="text-navy/60 group-hover:rotate-12 transition-transform duration-300 shrink-0" />
                <span className="font-semibold uppercase text-navy">Open Invitation</span>
                <ArrowRight size={15} className="text-navy/70 group-hover:translate-x-1 transition-transform duration-300 shrink-0" />
              </span>
            </motion.button>

            {/* Elegant "Tap to begin" micro-cue */}
            <motion.div
              className="mt-4 flex items-center gap-2 select-none"
              initial={{ opacity: 0 }}
              animate={isOpening ? { opacity: 0 } : { opacity: 1 }}
              transition={{ delay: isOpening ? 0 : 1.65, duration: 0.6 }}
            >
              <span className="w-5 h-px bg-champagne/45" />
              <span className="font-serif-display italic text-xs sm:text-sm text-charcoal-light/85 tracking-wide">
                Tap to enter celebration
              </span>
              <span className="w-5 h-px bg-champagne/45" />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
