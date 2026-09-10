import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Music, VolumeX } from 'lucide-react';

export default function MusicToggle({ isPlaying, onToggle }) {
  return (
    <motion.button
      className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-50 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg active:scale-95 cursor-pointer"
      style={{
        background: 'rgba(253,251,247,0.92)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: isPlaying ? '1px solid var(--champagne)' : '1px solid rgba(212,175,55,0.3)',
      }}
      onClick={onToggle}
      aria-label={isPlaying ? 'Mute music' : 'Play music'}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.5 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.94 }}
    >
      {isPlaying ? (
        <motion.div
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          className="flex items-center justify-center"
        >
          <Music size={15} style={{ color: 'var(--champagne)' }} />
        </motion.div>
      ) : (
        <VolumeX size={15} style={{ color: 'var(--charcoal-light)' }} />
      )}
    </motion.button>
  );
}
