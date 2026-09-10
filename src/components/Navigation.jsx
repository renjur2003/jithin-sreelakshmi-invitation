import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Calendar, MapPin } from 'lucide-react';

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'Invitation', href: '#invitation' },
  { label: 'Our Story', href: '#story' },
  { label: 'Ceremony', href: '#event' },
  { label: 'Moments', href: '#moments' },
  { label: 'Venues', href: '#location' },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Desktop Nav */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 hidden md:flex items-center justify-center py-4 px-8 transition-all duration-500"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        style={{
          background: isScrolled ? 'rgba(253,251,247,0.92)' : 'transparent',
          backdropFilter: isScrolled ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: isScrolled ? 'blur(20px)' : 'none',
          borderBottom: isScrolled ? '1px solid rgba(212,175,55,0.2)' : 'none',
          boxShadow: isScrolled ? '0 4px 20px rgba(0,0,0,0.05)' : 'none',
        }}
      >
        <div className="flex items-center gap-8 lg:gap-10">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="font-sans text-[11px] tracking-[3px] uppercase transition-colors duration-300 font-medium"
              style={{
                color: isScrolled ? 'var(--navy)' : 'rgba(253,251,247,0.95)',
              }}
              onMouseEnter={(e) => (e.target.style.color = 'var(--champagne-dark)')}
              onMouseLeave={(e) =>
                (e.target.style.color = isScrolled ? 'var(--navy)' : 'rgba(253,251,247,0.95)')
              }
            >
              {item.label}
            </a>
          ))}
        </div>
      </motion.nav>

      {/* Mobile Menu Floating Button */}
      <motion.button
        className="fixed top-4 right-4 z-50 md:hidden w-11 h-11 rounded-full flex items-center justify-center shadow-lg transition-transform active:scale-95 cursor-pointer"
        style={{
          background: mobileOpen ? '#1B263B' : 'rgba(253,251,247,0.94)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(212,175,55,0.4)',
        }}
        onClick={() => setMobileOpen(!mobileOpen)}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        aria-label={mobileOpen ? 'Close navigation' : 'Open navigation'}
      >
        {mobileOpen ? (
          <X size={18} className="text-champagne-light" />
        ) : (
          <Menu size={18} className="text-navy" />
        )}
      </motion.button>

      {/* Mobile Navigation Drawer Fullscreen Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden flex flex-col justify-between px-8 py-10 overflow-y-auto"
            style={{
              background: 'linear-gradient(to bottom, #FDFBF7 0%, #F5F0E4 100%)',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Header: Monogram Emblem */}
            <div className="flex flex-col items-center pt-2">
              <div className="w-14 h-14 rounded-full border border-champagne/50 bg-white flex items-center justify-center shadow-md mb-2">
                <span className="font-serif-display text-xl font-semibold text-navy">
                  J<span className="text-champagne-dark italic text-base mx-0.5">&</span>S
                </span>
              </div>
              <p className="font-sans text-[10px] tracking-[4px] uppercase text-champagne-dark font-medium">
                Wedding Invitation
              </p>
            </div>

            {/* Navigation Links - Solid, Bold, Deep Navy Color */}
            <nav className="flex flex-col items-center gap-5 my-auto py-4">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="font-serif-display text-3xl font-medium text-navy tracking-wider hover:text-champagne-dark transition-colors py-1 relative group"
                  style={{ color: '#0D1B2A' }}
                >
                  {item.label}
                </a>
              ))}
            </nav>

            {/* Footer Pill */}
            <div className="flex flex-col items-center gap-1.5 pb-2 text-center">
              <div className="flex items-center gap-2 text-xs font-sans tracking-[2px] uppercase text-navy font-medium">
                <Calendar size={13} className="text-champagne-dark" />
                <span>Sunday, 25 October 2026</span>
              </div>
              <div className="flex items-center gap-2 text-[11px] font-sans tracking-[1.5px] uppercase text-charcoal-light">
                <MapPin size={12} className="text-champagne-dark" />
                <span>Malappuram, Kerala</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
