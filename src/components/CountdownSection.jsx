import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { CalendarPlus, Check, Sparkles } from 'lucide-react';
import { useReducedMotion } from '../hooks/useReducedMotion';

function useCountdown(targetDate) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const now = new Date();
    const target = new Date(targetDate);
    const diff = target - now;

    if (diff <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isComplete: true };
    }

    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
      isComplete: false,
    };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return timeLeft;
}

function CountdownCard({ value, label, index, isInView, prefersReducedMotion }) {
  const formatted = String(value).padStart(2, '0');

  return (
    <motion.div
      className="flex flex-col items-center"
      initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: prefersReducedMotion ? 0.05 : 0.15 + index * 0.08, duration: 0.6 }}
    >
      <div className="w-[68px] h-[78px] xs:w-[74px] xs:h-[84px] sm:w-20 sm:h-24 md:w-24 md:h-28 rounded-lg bg-navy/90 border border-champagne/35 backdrop-blur-md flex items-center justify-center shadow-xl shadow-black/50 relative overflow-hidden">
        {/* Subtle gold top border line with animated shimmer */}
        <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-champagne to-transparent opacity-90" />

        {/* Inner subtle glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-champagne/5 to-transparent pointer-events-none" />

        {/* Number with smooth transition */}
        <div className="relative overflow-hidden h-9 xs:h-10 sm:h-12 md:h-14 flex items-center justify-center">
          {prefersReducedMotion ? (
            <span className="font-serif-display font-medium text-2xl xs:text-3xl sm:text-4xl md:text-5xl text-champagne-light drop-shadow-md tracking-tight">
              {formatted}
            </span>
          ) : (
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={formatted}
                className="font-serif-display font-medium text-2xl xs:text-3xl sm:text-4xl md:text-5xl text-champagne-light drop-shadow-md tracking-tight inline-block"
                initial={{ y: -16, opacity: 0, filter: 'blur(2px)' }}
                animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                exit={{ y: 16, opacity: 0, filter: 'blur(2px)' }}
                transition={{ duration: 0.38, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                {formatted}
              </motion.span>
            </AnimatePresence>
          )}
        </div>
      </div>

      <span className="font-sans text-[9px] xs:text-[10px] sm:text-xs tracking-[2px] sm:tracking-[3px] uppercase text-champagne/90 font-medium mt-2">
        {label}
      </span>
    </motion.div>
  );
}

export default function CountdownSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const prefersReducedMotion = useReducedMotion();
  const timeLeft = useCountdown('2026-10-25T10:30:00+05:30');
  const [calAdded, setCalAdded] = useState(false);

  const units = [
    { value: timeLeft.days, label: 'Days' },
    { value: timeLeft.hours, label: 'Hours' },
    { value: timeLeft.minutes, label: 'Mins' },
    { value: timeLeft.seconds, label: 'Secs' },
  ];

  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent('Jithin & Sreelakshmi Wedding')}&dates=20261025T050000Z/20261025T160000Z&details=${encodeURIComponent('Wedding Ceremony (10:30 AM) at Event City Convention Center, Pang South & Reception (5:00 PM) at Zahara Convention Centre, Palakkodu.')}&location=${encodeURIComponent('Event City Convention Center, Malappuram')}`;

  const handleCalendarClick = () => {
    setCalAdded(true);
    setTimeout(() => setCalAdded(false), 4000);
  };

  return (
    <section
      ref={ref}
      className="py-16 sm:py-24 relative overflow-hidden px-4"
      style={{ background: 'var(--navy-dark)' }}
    >
      {/* Top transition hairline */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-champagne/40 to-transparent pointer-events-none" />

      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] sm:w-[600px] h-[450px] sm:h-[600px] bg-champagne/5 rounded-full filter blur-[100px] pointer-events-none" />

      {/* Bottom transition hairline */}
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-champagne/40 to-transparent pointer-events-none" />

      <div className="max-w-3xl mx-auto text-center relative z-10">
        <motion.div
          className="inline-flex items-center gap-2 mb-3"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7 }}
        >
          <Sparkles size={13} className="text-champagne" />
          <p className="font-sans text-[10px] sm:text-xs tracking-[3px] sm:tracking-[4px] uppercase text-champagne font-medium">
            Save The Date
          </p>
          <Sparkles size={13} className="text-champagne" />
        </motion.div>

        <motion.h2
          className="font-serif-display text-white text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-light tracking-wide mb-8 sm:mb-10 px-2"
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15, duration: 0.7 }}
        >
          Counting Down to Our Forever
        </motion.h2>

        {/* Responsive Countdown Grid */}
        <div className="flex items-center justify-center gap-2 xs:gap-3 sm:gap-6 mb-8 sm:mb-10">
          {units.map((unit, i) => (
            <div key={unit.label} className="flex items-center gap-2 xs:gap-3 sm:gap-6">
              <CountdownCard
                value={unit.value}
                label={unit.label}
                index={i}
                isInView={isInView}
                prefersReducedMotion={prefersReducedMotion}
              />
              {i < units.length - 1 && (
                <span className="font-serif-display text-xl sm:text-3xl text-champagne/40 -mt-6">
                  :
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Date line with animated gold draw */}
        <motion.div
          className="flex items-center justify-center gap-2 sm:gap-3 mb-8"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.7 }}
        >
          <motion.div
            className="w-8 sm:w-12 h-px bg-champagne/40"
            initial={prefersReducedMotion ? {} : { scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.7, duration: 0.5 }}
            style={{ transformOrigin: 'right center' }}
          />
          <span className="font-sans text-[11px] sm:text-xs tracking-[2px] sm:tracking-[3px] uppercase text-white/90 font-light">
            Sunday &bull; 25 October 2026
          </span>
          <motion.div
            className="w-8 sm:w-12 h-px bg-champagne/40"
            initial={prefersReducedMotion ? {} : { scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.7, duration: 0.5 }}
            style={{ transformOrigin: 'left center' }}
          />
        </motion.div>

        {/* Add to Google Calendar Action */}
        <motion.div
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.7 }}
        >
          <a
            href={googleCalendarUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleCalendarClick}
            className="btn-primary group inline-flex items-center justify-center gap-2.5 px-8 py-3.5 min-h-[48px] shadow-lg shadow-black/40 hover:shadow-[0_4px_24px_rgba(201,168,76,0.35)] cursor-pointer"
          >
            {calAdded ? (
              <>
                <Check size={15} className="text-emerald-800 shrink-0 font-bold" />
                <span>Opening Google Calendar...</span>
              </>
            ) : (
              <>
                <CalendarPlus size={15} className="text-navy group-hover:scale-110 transition-transform duration-300 shrink-0" />
                <span>Add to Google Calendar</span>
              </>
            )}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
