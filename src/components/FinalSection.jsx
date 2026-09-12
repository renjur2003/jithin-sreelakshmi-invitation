import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { Share2, MessageCircle, Check } from 'lucide-react';
import { useReducedMotion } from '../hooks/useReducedMotion';

export default function FinalSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const prefersReducedMotion = useReducedMotion();
  const [copied, setCopied] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [-30, 30]);

  const whatsappBlessingUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
    'Dear Jithin & Sreelakshmi, Congratulations and best wishes on your wedding! May your life together be filled with boundless joy, love, and laughter. Hearty blessings!'
  )}`;

  const invitationUrl = 'https://jithin-sreelakshmi-invitation.vercel.app/?invite';

  const shareMessage = `💍✨ Sreelakshmi Weds Jithin ✨💍

You are lovingly invited to join us on our special day 🤍

🎉 Sangeeth Night:
📅 Saturday, 24 Oct 2026
⏰ 6:00PM

🎉 WEDDING:
📅 Sunday, 25 Oct 2026
⏰ 10:00AM

👉 View Invitation:
${invitationUrl}

With love & gratitude ❤️`;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: '💍✨ Sreelakshmi Weds Jithin ✨💍',
          text: shareMessage,
        });
        return;
      } catch (err) {
        if (err.name === 'AbortError') return;
      }
    }

    // Fallback: Copy invitation message to clipboard
    try {
      await navigator.clipboard.writeText(shareMessage);
      setCopied(true);
      setTimeout(() => setCopied(false), 3500);
    } catch {
      // Fallback directly to WhatsApp
      window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(shareMessage)}`, '_blank');
    }
  };

  return (
    <section
      ref={ref}
      className="relative min-h-[100dvh] overflow-hidden text-white flex flex-col justify-center items-center py-20 sm:py-28 md:py-36 px-5 sm:px-8"
      style={{ background: 'var(--navy-dark)' }}
    >
      {/* Cinematic Full-Screen Background with Parallax & Slow Ken Burns Zoom (1.00 -> 1.035) */}
      <motion.div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ y: parallaxY }}
      >
        <motion.img
          src="/images/couple-6.jpg"
          alt="Jithin & Sreelakshmi – Together Forever"
          className="w-full h-full object-cover"
          style={{ objectPosition: 'center 38%', minHeight: '115%', width: '100%' }}
          initial={{ scale: 1.0 }}
          animate={prefersReducedMotion ? { scale: 1.0 } : { scale: 1.035 }}
          transition={{
            duration: 16,
            ease: [0.25, 0.1, 0.25, 1],
            repeat: Infinity,
            repeatType: 'reverse',
          }}
          loading="lazy"
          aria-hidden="true"
        />
      </motion.div>

      {/* Subtle Deep-Navy Vignette & Gradient Overlays for High Legibility */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 90% 80% at 50% 48%, rgba(13,27,42,0.65) 0%, rgba(13,27,42,0.85) 60%, rgba(13,27,42,0.98) 100%)',
        }}
      />

      {/* Top Gradient Bleed from Location Section */}
      <div
        className="absolute top-0 inset-x-0 h-32 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, var(--navy-dark) 0%, transparent 100%)',
        }}
      />

      {/* Subtle Film Grain Texture Overlay */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='grain'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23grain)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Cinematic Sequential Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center max-w-xl mx-auto w-full">
        {/* 1. Emotional Quote */}
        <motion.p
          className="font-serif-display italic text-xl xs:text-2xl sm:text-3xl text-white/95 font-light leading-relaxed mb-6 sm:mb-8 px-4 drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]"
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          “And so begins the most beautiful chapter of our lives…”
        </motion.p>

        {/* 2. Gold Hairline Divider */}
        <motion.div
          className="w-16 sm:w-24 h-px mb-6 sm:mb-8 bg-gradient-to-r from-transparent via-champagne to-transparent"
          initial={prefersReducedMotion ? {} : { scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ delay: 0.4, duration: 0.7 }}
          style={{ transformOrigin: 'center' }}
        />

        {/* 3. Couple Names (Jithin & Sreelakshmi) */}
        <div className="my-1 flex flex-col items-center">
          <motion.h2
            className="font-serif-display text-white text-4xl xs:text-5xl sm:text-6xl md:text-7xl font-light tracking-wide leading-none drop-shadow-[0_3px_15px_rgba(0,0,0,0.95)]"
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            Jithin
          </motion.h2>

          <motion.span
            className="font-serif-display italic text-2xl xs:text-3xl sm:text-4xl text-champagne-light my-1 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.65, duration: 0.6 }}
          >
            &
          </motion.span>

          <motion.h2
            className="font-serif-display text-white text-4xl xs:text-5xl sm:text-6xl md:text-7xl font-light tracking-wide leading-none mb-4 drop-shadow-[0_3px_15px_rgba(0,0,0,0.95)]"
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            Sreelakshmi
          </motion.h2>
        </div>

        {/* 4. Date */}
        <motion.p
          className="font-sans text-[11px] sm:text-xs tracking-[4px] sm:tracking-[5px] uppercase text-champagne font-medium mb-8 sm:mb-10 drop-shadow-md"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.75, duration: 0.8 }}
        >
          25 &bull; 10 &bull; 2026
        </motion.p>

        {/* 5. Action Buttons (SEND WISHES & BLESSINGS / SHARE INVITATION) */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full max-w-md mb-12 sm:mb-16"
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.9, duration: 0.7 }}
        >
          <a
            href={whatsappBlessingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary group w-full sm:w-auto shadow-xl shadow-black/40 hover:shadow-[0_8px_32px_rgba(201,168,76,0.4)]"
          >
            <MessageCircle size={15} className="shrink-0 text-navy group-hover:scale-110 transition-transform duration-300" />
            <span>Send Wishes &amp; Blessings</span>
          </a>

          <button
            onClick={handleShare}
            className="btn-secondary group w-full sm:w-auto bg-white/10 hover:bg-white/20 border-champagne/50 hover:border-champagne text-white hover:text-white shadow-lg cursor-pointer"
          >
            {copied ? (
              <>
                <Check size={15} className="text-emerald-400 shrink-0" />
                <span>Invitation Copied!</span>
              </>
            ) : (
              <>
                <Share2 size={15} className="text-champagne-light group-hover:scale-110 transition-transform duration-300 shrink-0" />
                <span>Share Invitation</span>
              </>
            )}
          </button>
        </motion.div>

        {/* 6. Warm Invitation to Friends & Family */}
        <motion.div
          className="pt-6 sm:pt-8 border-t border-champagne/20 w-full max-w-sm"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1.05, duration: 0.8 }}
        >
          <p className="font-sans text-[9px] sm:text-[10px] tracking-[3px] uppercase text-champagne font-medium mb-1.5">
            Cordially Invited
          </p>
          <p className="font-sans text-xs sm:text-sm tracking-[2px] text-white/95 font-light mb-1">
            All Our Dear Friends & Family
          </p>
          <p className="font-serif-display text-sm sm:text-base italic text-white/75 font-light">
            are warmly invited to join and celebrate this special day with us
          </p>
        </motion.div>

        {/* 7. Wedding Film Closing Frame Monogram & Date */}
        <motion.div
          className="mt-10 sm:mt-14 pt-6 flex flex-col items-center select-none"
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.25, duration: 1.0 }}
        >
          {/* Subtle Monogram Seal */}
          <div className="w-12 h-12 rounded-full border border-champagne/40 bg-navy/60 backdrop-blur-md flex items-center justify-center mb-3 shadow-lg shadow-black/40 relative seal-pulse">
            <div className="absolute inset-0.5 rounded-full border border-dashed border-champagne/30" />
            <span className="font-serif-display text-sm tracking-widest text-white/90 pt-0.5">
              J<span className="italic text-xs text-champagne font-light mx-0.5">&</span>S
            </span>
          </div>

          <p className="font-sans text-[9px] sm:text-[10px] tracking-[4px] uppercase text-champagne/80 font-light mb-2">
            25 &bull; 10 &bull; 2026
          </p>

          <p className="font-serif-display italic text-xs text-white/40 tracking-wider">
            A Celebration of Love
          </p>
        </motion.div>
      </div>
    </section>
  );
}
