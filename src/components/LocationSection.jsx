import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { MapPin, Navigation, Clock } from 'lucide-react';
import { useReducedMotion } from '../hooks/useReducedMotion';

export default function LocationSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const prefersReducedMotion = useReducedMotion();

  const locations = [
    {
      label: 'Wedding Ceremony',
      venue: 'Event City Convention Center',
      address: 'Pang South, Malappuram, Kerala',
      time: '10:30 AM – 11:30 AM (Muhurtham)',
      mapsLink: 'https://maps.app.goo.gl/6WapbmGq6PqJY35t8',
    },
    {
      label: 'Wedding Reception',
      venue: 'Zahara Convention Centre',
      address: 'Valamboor Rd, Palakkodu, Malappuram',
      time: 'From 5:00 PM Onwards',
      mapsLink: 'https://maps.app.goo.gl/k9GBqDgpq7SM8PCz6',
    },
  ];

  return (
    <section
      id="location"
      ref={ref}
      className="py-14 sm:py-20 md:py-28 relative paper-grain overflow-hidden"
      style={{ background: 'var(--navy-dark)' }}
    >
      {/* Top transition hairline from Gallery */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-champagne/40 to-transparent pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10 px-4 sm:px-6">
        <div className="text-center mb-10 sm:mb-14">
          <motion.p
            className="font-sans text-[10px] sm:text-xs tracking-[3px] sm:tracking-[4px] uppercase mb-2 text-champagne font-medium"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7 }}
          >
            Venues & Directions
          </motion.p>

          <motion.h2
            className="font-serif-display text-white text-3xl sm:text-4xl md:text-5xl font-light tracking-wide"
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15, duration: 0.7 }}
          >
            Where to Find Us
          </motion.h2>

          <motion.div
            className="ornament-line mt-4 sm:mt-6 w-32 mx-auto"
            initial={prefersReducedMotion ? {} : { scaleX: 0, opacity: 0 }}
            animate={isInView ? { scaleX: 1, opacity: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.7 }}
            style={{ transformOrigin: 'center' }}
          >
            <span className="dot" />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {locations.map((loc, i) => (
            <motion.div
              key={loc.label}
              className="rounded-xl bg-navy/70 border border-champagne/25 p-6 sm:p-8 flex flex-col justify-between text-center backdrop-blur-md shadow-xl transition-all duration-300 hover:border-champagne/45 hover:shadow-2xl"
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 25 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.15, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <div>
                <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 bg-champagne/10 border border-champagne/30 shadow-sm seal-pulse">
                  <MapPin size={18} className="text-champagne" />
                </div>

                <p className="font-sans text-[10px] sm:text-xs tracking-[2px] sm:tracking-[3px] uppercase mb-2 text-champagne font-medium">
                  {loc.label}
                </p>

                <h3 className="font-serif-display text-xl sm:text-2xl text-white font-normal mb-2">
                  {loc.venue}
                </h3>

                <p className="font-sans text-xs sm:text-sm mb-3 text-white/70 leading-relaxed">
                  {loc.address}
                </p>

                <div className="inline-flex items-center gap-1.5 font-sans text-xs text-champagne/80 mb-6 bg-white/5 px-3 py-1 rounded-full border border-champagne/15">
                  <Clock size={12} />
                  <span>{loc.time}</span>
                </div>
              </div>

              <a
                href={loc.mapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-5 rounded-lg border border-champagne/40 hover:border-champagne bg-champagne/10 hover:bg-champagne/20 text-champagne-light hover:text-white font-sans text-xs tracking-[2px] uppercase font-medium transition-all duration-300 shadow-sm hover:shadow-[0_4px_24px_rgba(201,168,76,0.25)] active:scale-[0.97] cursor-pointer"
              >
                <Navigation size={13} />
                <span>Open in Google Maps</span>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
