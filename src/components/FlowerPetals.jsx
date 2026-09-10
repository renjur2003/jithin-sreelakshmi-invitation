import { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';

// Realistic organic curved flower petal shapes
const PetalSVG = ({ color, size, variant = 0 }) => {
  if (variant === 0) {
    // Elegant curved rose petal
    return (
      <svg width={size} height={size * 1.25} viewBox="0 0 32 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M16 2 C23 2 30 10 30 22 C30 32 23 38 16 39 C9 38 2 32 2 22 C2 10 9 2 16 2 Z"
          fill={color}
        />
        {/* Subtle interior petal vein/sheen */}
        <path
          d="M16 8 C17.5 16 17.5 28 16 35"
          stroke="rgba(255,255,255,0.22)"
          strokeWidth="1"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (variant === 1) {
    // Asymmetric drifting rose petal with gentle fold
    return (
      <svg width={size} height={size * 1.15} viewBox="0 0 32 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M14 2 C22 1 30 8 31 18 C32 28 24 34 16 35 C8 36 1 30 1 20 C1 10 7 3 14 2 Z"
          fill={color}
        />
        <path
          d="M12 7 C14 15 15 25 15 31"
          stroke="rgba(255,255,255,0.18)"
          strokeWidth="0.8"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  // Delicate champagne / marigold petal
  return (
    <svg width={size} height={size * 1.3} viewBox="0 0 28 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M14 2 C20 4 27 12 26 22 C25 31 19 35 14 35 C9 35 3 31 2 22 C1 12 8 4 14 2 Z"
        fill={color}
      />
      <path
        d="M14 6 C15 14 14.5 24 14 31"
        stroke="rgba(255,255,255,0.2)"
        strokeWidth="0.75"
        strokeLinecap="round"
      />
    </svg>
  );
};

// Luxury wedding color palette: rosewood crimson, warm blush, champagne gold, soft ivory
const PETAL_COLORS = [
  'rgba(184, 51, 66, 0.88)',   // Royal crimson rose
  'rgba(196, 70, 84, 0.84)',   // Deep blush rose
  'rgba(214, 98, 110, 0.82)',  // Soft pink rose
  'rgba(212, 175, 55, 0.85)',  // Champagne gold petal
  'rgba(228, 198, 120, 0.80)', // Warm golden ivory
  'rgba(168, 38, 52, 0.90)',   // Velvet maroon
  'rgba(235, 176, 150, 0.82)', // Coral peach petal
];

export default function FlowerPetals({ isSpawning, onComplete }) {
  const prefersReducedMotion = useReducedMotion();
  const [visible, setVisible] = useState(true);

  // Small, highly optimized pool of 16 petals
  const petals = useMemo(() => {
    return Array.from({ length: 16 }, (_, i) => {
      // 3 depth tiers: foreground (3 petals), midground (8 petals), background (5 petals)
      const tier = i < 3 ? 'foreground' : i < 11 ? 'midground' : 'background';
      const size = tier === 'foreground' ? 34 + (i % 6) : tier === 'midground' ? 22 + (i % 5) : 15 + (i % 4);
      const blur = tier === 'foreground' ? '1.2px' : '0px';
      const zIndex = tier === 'foreground' ? 65 : tier === 'midground' ? 62 : 60;
      const opacity = tier === 'background' ? 0.6 : tier === 'foreground' ? 0.95 : 0.88;
      const duration = 3.2 + (i % 4) * 0.4;
      const delay = (i * 0.14) % 1.2;
      const startX = 6 + (i * 5.8); // Evenly spread horizontally across screen
      const swayAmplitude = (i % 2 === 0 ? 1 : -1) * (25 + (i * 5) % 35);
      const rotateStart = (i * 47) % 360;
      const rotateEnd = rotateStart + (i % 2 === 0 ? 220 : -220);

      return {
        id: i,
        tier,
        size,
        blur,
        zIndex,
        opacity,
        duration,
        delay,
        startX,
        swayAmplitude,
        rotateStart,
        rotateEnd,
        color: PETAL_COLORS[i % PETAL_COLORS.length],
        variant: i % 3,
      };
    });
  }, []);

  useEffect(() => {
    if (!isSpawning) return;

    // After petals drift for 4.2s, smoothly fade them out and unmount
    const timer = setTimeout(() => {
      setVisible(false);
      if (onComplete) onComplete();
    }, 4200);

    return () => clearTimeout(timer);
  }, [isSpawning, onComplete]);

  if (prefersReducedMotion || !isSpawning || !visible) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden z-[65]"
      aria-hidden="true"
    >
      <AnimatePresence>
        {visible && (
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 1.2, ease: 'easeOut' } }}
          >
            {petals.map((p) => (
              <motion.div
                key={p.id}
                className="absolute will-change-transform"
                style={{
                  left: `${p.startX}%`,
                  top: '-40px',
                  zIndex: p.zIndex,
                  filter: p.blur !== '0px' ? `blur(${p.blur}) drop-shadow(0 4px 6px rgba(0,0,0,0.18))` : 'drop-shadow(0 3px 5px rgba(0,0,0,0.22))',
                }}
                initial={{
                  y: -50,
                  x: 0,
                  rotate: p.rotateStart,
                  rotateX: 0,
                  opacity: 0,
                  scale: 0.7,
                }}
                animate={{
                  y: ['0vh', '110vh'],
                  x: [
                    0,
                    p.swayAmplitude,
                    -p.swayAmplitude * 0.7,
                    p.swayAmplitude * 0.5,
                  ],
                  rotate: [p.rotateStart, p.rotateEnd],
                  rotateX: [0, 180, 360],
                  opacity: [0, p.opacity, p.opacity, 0],
                  scale: [0.7, 1, 0.95],
                }}
                transition={{
                  duration: p.duration,
                  delay: p.delay,
                  ease: [0.25, 0.1, 0.25, 1],
                  times: [0, 0.15, 0.85, 1],
                }}
              >
                <PetalSVG color={p.color} size={p.size} variant={p.variant} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
