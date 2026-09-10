import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Music, VolumeX } from 'lucide-react';

export default function MusicToggle() {
  const [playing, setPlaying] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const audioRef = useRef(null);

  // We use a gentle ambient audio tone via Web Audio API as fallback
  const audioCtxRef = useRef(null);
  const gainNodeRef = useRef(null);

  const toggleMusic = () => {
    if (!enabled) {
      setEnabled(true);
      setPlaying(true);
      startAmbient();
    } else {
      if (playing) {
        pauseAmbient();
        setPlaying(false);
      } else {
        resumeAmbient();
        setPlaying(true);
      }
    }
  };

  const startAmbient = () => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      audioCtxRef.current = ctx;
      const gainNode = ctx.createGain();
      gainNode.gain.setValueAtTime(0, ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.03, ctx.currentTime + 2);
      gainNode.connect(ctx.destination);
      gainNodeRef.current = gainNode;
    } catch (e) {
      console.warn('Audio not supported:', e);
    }
  };

  const pauseAmbient = () => {
    if (gainNodeRef.current && audioCtxRef.current) {
      gainNodeRef.current.gain.linearRampToValueAtTime(0, audioCtxRef.current.currentTime + 1);
    }
  };

  const resumeAmbient = () => {
    if (gainNodeRef.current && audioCtxRef.current) {
      gainNodeRef.current.gain.linearRampToValueAtTime(0.03, audioCtxRef.current.currentTime + 1);
    }
  };

  useEffect(() => {
    return () => {
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
    };
  }, []);

  return (
    <motion.button
      className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-50 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg active:scale-95"
      style={{
        background: 'rgba(253,251,247,0.92)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: playing ? '1px solid var(--champagne)' : '1px solid rgba(212,175,55,0.3)',
      }}
      onClick={toggleMusic}
      aria-label={playing ? 'Mute music' : 'Play music'}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.5 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      {playing ? (
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <Music size={14} style={{ color: 'var(--champagne)' }} />
        </motion.div>
      ) : (
        <VolumeX size={14} style={{ color: 'var(--charcoal-light)' }} />
      )}
    </motion.button>
  );
}
