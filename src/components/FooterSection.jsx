import { motion } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';

export default function FooterSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <footer
      className="py-12 px-6 text-center"
      style={{ background: 'var(--navy-dark)' }}
    >
      <motion.div
        initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.8 }}
      >
        <p
          className="font-serif-display italic text-sm mb-3"
          style={{ color: 'rgba(253,251,247,0.4)' }}
        >
          With love, gratitude & happiness
        </p>

        <p
          className="font-serif-display text-lg mb-2"
          style={{
            color: 'var(--ivory)',
            fontWeight: 300,
            letterSpacing: '0.05em',
          }}
        >
          Jithin & Sreelakshmi
        </p>

        <p
          className="font-sans text-[10px] tracking-[4px] uppercase"
          style={{ color: 'rgba(212,175,55,0.5)' }}
        >
          25 October 2026
        </p>
      </motion.div>
    </footer>
  );
}
