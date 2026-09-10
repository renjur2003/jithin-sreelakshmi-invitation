import { useState, useEffect, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import OpeningScreen from './components/OpeningScreen';
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
  const [lightboxImage, setLightboxImage] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const mainRef = useRef(null);

  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const handleOpenInvitation = () => {
    setIsOpen(true);
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
      <AnimatePresence mode="wait">
        {!isOpen && (
          <OpeningScreen key="opening" onOpen={handleOpenInvitation} />
        )}
      </AnimatePresence>

      {isOpen && (
        <>
          <ScrollProgress />
          <Navigation />
          <MusicToggle />
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
