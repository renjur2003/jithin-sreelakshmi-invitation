import { useState, useEffect, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import OpeningScreen from './components/OpeningScreen';
import FlowerPetals from './components/FlowerPetals';
import Navigation from './components/Navigation';
import ScrollProgress from './components/ScrollProgress';
import MusicToggle from './components/MusicToggle';
import HeroSection from './components/HeroSection';
import InvitationSection from './components/InvitationSection';
import CoupleSection from './components/CoupleSection';
import CountdownSection from './components/CountdownSection';
import CeremonySection from './components/CeremonySection';
import ReceptionSection from './components/ReceptionSection';
import TimelineSection from './components/TimelineSection';
import GallerySection from './components/GallerySection';
import LocationSection from './components/LocationSection';
import FinalSection from './components/FinalSection';
import Lightbox from './components/Lightbox';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpeningTransition, setIsOpeningTransition] = useState(false);
  const [showOpeningScreen, setShowOpeningScreen] = useState(true);
  const [spawningPetals, setSpawningPetals] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [lightboxImage, setLightboxImage] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const mainRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleOpenInvitation = () => {
    // 1. Trigger opening transition & flower petals release
    setIsOpeningTransition(true);
    setSpawningPetals(true);

    // 2. Play wedding audio with gentle volume fade-in
    if (audioRef.current) {
      audioRef.current.volume = 0;
      audioRef.current
        .play()
        .then(() => {
          setIsAudioPlaying(true);
          let vol = 0;
          const fadeInterval = setInterval(() => {
            vol = Math.min(vol + 0.035, 0.45);
            if (audioRef.current) audioRef.current.volume = vol;
            if (vol >= 0.45) clearInterval(fadeInterval);
          }, 100);
        })
        .catch((err) => {
          console.log('Audio autoplay prevented or error:', err);
        });
    }

    // 3. Mark site as open so scroll & interactions unlock smoothly
    setTimeout(() => {
      setIsOpen(true);
    }, 1100);

    // 4. Unmount OpeningScreen after curtain completes (frees DOM & GPU)
    setTimeout(() => {
      setShowOpeningScreen(false);
    }, 1350);
  };

  // Audio Toggle handler for the floating music button
  const handleToggleAudio = () => {
    if (!audioRef.current) return;

    if (isAudioPlaying) {
      // Smooth fade-out before pausing
      let vol = audioRef.current.volume;
      const fadeInterval = setInterval(() => {
        vol = Math.max(vol - 0.06, 0);
        if (audioRef.current) audioRef.current.volume = vol;
        if (vol <= 0) {
          clearInterval(fadeInterval);
          if (audioRef.current) audioRef.current.pause();
          setIsAudioPlaying(false);
        }
      }, 50);
    } else {
      // Smooth resume with volume fade-in
      audioRef.current.volume = 0;
      audioRef.current
        .play()
        .then(() => {
          setIsAudioPlaying(true);
          let vol = 0;
          const fadeInterval = setInterval(() => {
            vol = Math.min(vol + 0.05, 0.45);
            if (audioRef.current) audioRef.current.volume = vol;
            if (vol >= 0.45) clearInterval(fadeInterval);
          }, 70);
        })
        .catch((e) => console.log('Audio playback error:', e));
    }
  };

  const openLightbox = (src, index) => {
    setLightboxImage(src);
    setLightboxIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxImage(null);
    document.body.style.overflow = '';
  };

  return (
    <>
      {/* Hidden Audio Element pointing to uploaded wedding music */}
      <audio
        ref={audioRef}
        src="/audio/wedding-music.mp3"
        loop
        preload="auto"
      />

      {/* Realistic Drifting Flower Petals during Opening Transition */}
      <FlowerPetals
        isSpawning={spawningPetals}
        onComplete={() => setSpawningPetals(false)}
      />

      {/* Royal Curtain Opening Screen */}
      {showOpeningScreen && (
        <OpeningScreen
          key="opening"
          onOpen={handleOpenInvitation}
        />
      )}

      {/* Main Website (Mounted beneath the curtains so reveal is seamless) */}
      {(isOpen || isOpeningTransition) && (
        <>
          <ScrollProgress />
          <Navigation />
          <MusicToggle
            isPlaying={isAudioPlaying}
            onToggle={handleToggleAudio}
          />
          <main ref={mainRef}>
            <HeroSection />
            <InvitationSection />
            <CoupleSection />
            <CountdownSection />
            <CeremonySection />
            <TimelineSection />
            <ReceptionSection />
            <GallerySection onImageClick={openLightbox} />
            <LocationSection />
            <FinalSection />
          </main>
        </>
      )}

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxImage && (
          <Lightbox
            key="lightbox"
            imageSrc={lightboxImage}
            currentIndex={lightboxIndex}
            onClose={closeLightbox}
            onNavigate={(idx) => setLightboxIndex(idx)}
            onImageChange={(src) => setLightboxImage(src)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

export default App;
