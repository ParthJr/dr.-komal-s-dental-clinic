import React, { useState, useEffect } from 'react';
import { CLINIC_CONFIG } from '../config/clinic';

interface HeaderProps {
  onBookClick: () => void;
  activeSection: string;
}

export const Header: React.FC<HeaderProps> = ({ onBookClick, activeSection }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };
    if (mobileMenuOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: 'Home', href: '#home', id: 'home' },
    { label: 'About the Clinic', href: '#philosophy', id: 'philosophy' },
    { label: 'Treatments', href: '#treatment-discovery', id: 'treatment-discovery' },
    { label: 'Smile Care', href: '#cosmetic-care', id: 'cosmetic-care' },
    { label: 'Patient Guide', href: '#patient-journey', id: 'patient-journey' },
    { label: 'Contact', href: '#location-section', id: 'location-section' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#ffffff]/95 backdrop-blur-md shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-b border-[#e2f0f9]/60">
      {/* Top Turquoise accent stripe matching Stitch design */}
      <div className="h-1 bg-[#13afa6] w-full" />

      <div className="h-20 max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 flex items-center justify-between">
        {/* Brand Zone: Logo + Name */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, '#home')}
          className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#13afa6] rounded-xl p-1 -ml-1 transition-transform"
        >
          <div className="w-10 h-10 rounded-xl bg-[#e8f6ff] flex items-center justify-center text-[#13afa6] group-hover:bg-[#13afa6] group-hover:text-white transition-colors shadow-sm">
            <span className="material-symbols-outlined text-[24px]">dentistry</span>
          </div>
          <div className="flex flex-col">
            <span className="font-['Plus+Jakarta+Sans'] text-[20px] font-bold text-[#101d24] tracking-tight leading-none group-hover:text-[#006a64] transition-colors">
              {CLINIC_CONFIG.shortName}
            </span>
            <span className="text-[12px] text-[#006a64] font-semibold tracking-wider uppercase mt-1">
              {CLINIC_CONFIG.brandTagline}
            </span>
          </div>
        </a>

        {/* Desktop Nav Zone */}
        <nav
          aria-label="Main Navigation"
          className="hidden xl:flex items-center gap-6"
        >
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                aria-current={isActive ? 'page' : undefined}
                className={`text-[15px] transition-colors py-1 whitespace-nowrap font-medium ${
                  isActive
                    ? 'text-[#006a64] font-semibold border-b-2 border-[#006a64]'
                    : 'text-[#3c4948] hover:text-[#006a64]'
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Primary Action Zone */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBookClick}
            className="hidden sm:inline-flex items-center justify-center bg-[#13afa6] hover:bg-[#006a64] text-white font-['Plus+Jakarta+Sans'] font-semibold text-[14px] px-6 py-2.5 rounded-full shadow-[0_8px_24px_-4px_rgba(19,175,166,0.3)] hover:shadow-[0_12px_28px_-4px_rgba(19,175,166,0.4)] transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            Book a Visit
          </button>

          <a
            href="#location-section"
            onClick={(e) => handleNavClick(e, '#location-section')}
            title="Clinic Location & Contact"
            className="w-9 h-9 rounded-full bg-[#006a64] text-white hover:bg-[#13afa6] flex items-center justify-center shrink-0 transition-colors shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#13afa6]"
            aria-label="View clinic location in Randesan"
          >
            <span className="material-symbols-outlined text-[19px]">location_on</span>
          </a>

          {/* Mobile Menu Button */}
          <button
            type="button"
            aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-xl text-[#101d24] hover:bg-[#e8f6ff] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#13afa6]"
          >
            <span className="material-symbols-outlined text-[28px]">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
          className="fixed inset-0 top-[84px] z-40 bg-[#101d24]/40 backdrop-blur-sm xl:hidden animate-fade-in"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="bg-white border-b border-[#e2f0f9] shadow-2xl p-6 max-h-[calc(100vh-84px)] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="px-4 py-3 rounded-xl text-[16px] font-medium text-[#101d24] hover:bg-[#e8f6ff] hover:text-[#006a64] transition-colors flex items-center justify-between"
                >
                  <span>{link.label}</span>
                  <span className="material-symbols-outlined text-[#13afa6] text-[20px]">
                    chevron_right
                  </span>
                </a>
              ))}

              <div className="pt-4 border-t border-[#e2f0f9] flex flex-col gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onBookClick();
                  }}
                  className="w-full py-3.5 rounded-xl bg-[#13afa6] hover:bg-[#006a64] text-white font-['Plus+Jakarta+Sans'] font-bold text-center shadow-md flex items-center justify-center gap-2"
                >
                  <span>Book an Appointment</span>
                  <span className="material-symbols-outlined text-[20px]">calendar_today</span>
                </button>

                <div className="p-3 bg-[#e8f6ff] rounded-xl flex items-center gap-3">
                  <span className="material-symbols-outlined text-[#13afa6]">schedule</span>
                  <div className="text-xs text-[#3c4948]">
                    <span className="font-semibold text-[#101d24] block">Consultation Hours</span>
                    Opens 11:00 AM · Mon – Sat (Randesan)
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
