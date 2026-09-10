import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { MapPin, Clock, Calendar, Navigation, CalendarPlus } from 'lucide-react';
import { useReducedMotion } from '../hooks/useReducedMotion';

export default function CeremonySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const prefersReducedMotion = useReducedMotion();

  const ceremonyCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent('Jithin & Sreelakshmi Wedding Ceremony')}&dates=20261025T050000Z/20261025T060000Z&details=${encodeURIComponent('Muhurtham: 10:30 AM - 11:30 AM at Event City Convention Center, Pang South, Malappuram.')}&location=${encodeURIComponent('Event City Convention Center, Malappuram')}`;

  const badgeVariants = {
    hidden: prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 18 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: prefersReducedMotion ? 0.05 : 0.25 + i * 0.12,
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    }),
  };

  return (
    <section
      id="event"
      ref={ref}
      className="py-12 sm:py-20 md:py-28 relative paper-grain overflow-hidden"
      style={{ background: 'var(--ivory)' }}
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Luxury Event Card Container */}
        <motion.div
          className="relative bg-white/85 backdrop-blur-sm border border-champagne/35 rounded-xl p-6 sm:p-10 md:p-12 text-center shadow-xl shadow-champagne/10"
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Subtle Corner frames (hidden on very small screens to avoid clipping) */}
          <div className="hidden sm:block corner-frame tl" style={{ top: '10px', left: '10px' }} />
          <div className="hidden sm:block corner-frame tr" style={{ top: '10px', right: '10px' }} />
          <div className="hidden sm:block corner-frame bl" style={{ bottom: '10px', left: '10px' }} />
          <div className="hidden sm:block corner-frame br" style={{ bottom: '10px', right: '10px' }} />

          {/* Section Subtitle */}
          <motion.p
            className="font-sans text-[10px] sm:text-xs tracking-[3px] sm:tracking-[4px] uppercase text-champagne-dark font-medium mb-2"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
          >
            Sacred Auspicious Union
          </motion.p>

          <motion.h2
            className="font-serif-display text-2xl xs:text-3xl sm:text-4xl md:text-5xl text-navy font-light tracking-wide mb-4 sm:mb-6"
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.7 }}
          >
            The Wedding Ceremony
          </motion.h2>

          <motion.div
            className="ornament-line mb-6 sm:mb-8 w-36 sm:w-40 mx-auto"
            initial={prefersReducedMotion ? {} : { scaleX: 0, opacity: 0 }}
            animate={isInView ? { scaleX: 1, opacity: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.7 }}
            style={{ transformOrigin: 'center' }}
          >
            <span className="dot" />
          </motion.div>

          {/* 3 Detail Badges Grid with Animated Top/Bottom Divider Lines */}
          <div className="relative my-6 sm:my-8 py-6 sm:py-8">
            <motion.div
              className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-champagne/40 to-transparent"
              initial={prefersReducedMotion ? {} : { scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ delay: 0.25, duration: 0.7 }}
            />

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6 text-center">
              {/* Date */}
              <motion.div
                className="flex flex-col items-center"
                variants={badgeVariants}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                custom={0}
              >
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-champagne/10 flex items-center justify-center text-champagne-dark mb-2 sm:mb-3 shadow-sm">
                  <Calendar size={16} />
                </div>
                <p className="font-sans text-[9px] sm:text-[10px] tracking-[2px] uppercase text-charcoal-light mb-0.5">
                  Date & Day
                </p>
                <p className="font-serif-display text-lg sm:text-xl text-navy font-medium">
                  Sunday
                </p>
                <p className="font-sans text-xs text-charcoal-light">
                  25 October 2026
                </p>
              </motion.div>

              {/* Time / Muhurtham */}
              <motion.div
                className="flex flex-col items-center"
                variants={badgeVariants}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                custom={1}
              >
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-champagne/10 flex items-center justify-center text-champagne-dark mb-2 sm:mb-3 shadow-sm">
                  <Clock size={16} />
                </div>
                <p className="font-sans text-[9px] sm:text-[10px] tracking-[2px] uppercase text-charcoal-light mb-0.5">
                  Muhurtham Time
                </p>
                <p className="font-serif-display text-lg sm:text-xl text-navy font-medium">
                  10:30 AM – 11:30 AM
                </p>
                <p className="font-sans text-xs text-champagne-dark font-medium">
                  Auspicious Hours
                </p>
              </motion.div>

              {/* Venue */}
              <motion.div
                className="flex flex-col items-center"
                variants={badgeVariants}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                custom={2}
              >
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-champagne/10 flex items-center justify-center text-champagne-dark mb-2 sm:mb-3 shadow-sm">
                  <MapPin size={16} />
                </div>
                <p className="font-sans text-[9px] sm:text-[10px] tracking-[2px] uppercase text-charcoal-light mb-0.5">
                  Ceremony Venue
                </p>
                <p className="font-serif-display text-lg sm:text-xl text-navy font-medium leading-tight">
                  Event City
                </p>
                <p className="font-sans text-xs text-charcoal-light">
                  Pang South, Malappuram
                </p>
              </motion.div>
            </div>

            <motion.div
              className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-champagne/40 to-transparent"
              initial={prefersReducedMotion ? {} : { scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ delay: 0.45, duration: 0.7 }}
            />
          </div>

          {/* Action CTAs - Responsive full width buttons on mobile */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-3 w-full max-w-md mx-auto"
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.55, duration: 0.6 }}
          >
            <a
              href="https://maps.app.goo.gl/6WapbmGq6PqJY35t8"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary group w-full sm:w-auto shadow-md hover:shadow-lg"
            >
              <Navigation size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300 shrink-0 text-navy" />
              <span>Get Directions</span>
            </a>

            <a
              href={ceremonyCalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary group w-full sm:w-auto shadow-sm hover:shadow-md"
            >
              <CalendarPlus size={14} className="group-hover:scale-110 transition-transform duration-300 shrink-0 text-champagne-dark" />
              <span>Add to Calendar</span>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
