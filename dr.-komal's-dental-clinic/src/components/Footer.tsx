import React from 'react';
import { CLINIC_CONFIG } from '../config/clinic';
import { PolicyType } from './PolicyModal';

interface FooterProps {
  onBookClick: () => void;
  onOpenPolicy: (type: PolicyType) => void;
}

export const Footer: React.FC<FooterProps> = ({ onBookClick, onOpenPolicy }) => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="w-full bg-[#253239] text-[#e5f3fc]">
      <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Brand Col */}
          <div className="lg:col-span-4 flex flex-col space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#13afa6]/20 flex items-center justify-center">
                <span className="material-symbols-outlined text-[#77f7ec] text-[24px]">
                  dentistry
                </span>
              </div>
              <span className="font-['Plus+Jakarta+Sans'] text-[20px] font-bold text-[#e5f3fc] tracking-tight">
                {CLINIC_CONFIG.name}
              </span>
            </div>

            <p className="text-sm text-[#bbc9c7] max-w-sm leading-relaxed">
              Delivering compassionate, advanced, and gentle oral healthcare solutions for families and radiant smiles across Gujarat.
            </p>

            <div className="flex items-start gap-2.5 pt-2 text-[#bbc9c7]">
              <span className="material-symbols-outlined text-[#77f7ec] shrink-0 text-[20px] mt-0.5">
                location_on
              </span>
              <div className="text-xs text-[#bbc9c7] leading-relaxed">
                <strong className="text-white block font-semibold text-sm mb-0.5">
                  Randesan Practice:
                </strong>
                Ground Floor 23, Sarthak Fortune Mall, Opp. City Pulse Theatre, Randesan, Gandhinagar, Gujarat 382426
              </div>
            </div>
          </div>

          {/* Col 2: Quick Exploration */}
          <div className="lg:col-span-3 flex flex-col space-y-3">
            <span className="font-['Plus+Jakarta+Sans'] text-[16px] font-bold text-white mb-1">
              Quick Exploration
            </span>
            <nav className="flex flex-col space-y-2.5" aria-label="Footer Navigation">
              <button
                type="button"
                onClick={() => scrollTo('philosophy')}
                className="text-left text-sm text-[#bbc9c7] hover:text-[#77f7ec] transition-colors focus:outline-none"
              >
                About the Clinic
              </button>
              <button
                type="button"
                onClick={() => scrollTo('treatment-discovery')}
                className="text-left text-sm text-[#bbc9c7] hover:text-[#77f7ec] transition-colors focus:outline-none"
              >
                Treatments
              </button>
              <button
                type="button"
                onClick={() => scrollTo('cosmetic-care')}
                className="text-left text-sm text-[#bbc9c7] hover:text-[#77f7ec] transition-colors focus:outline-none"
              >
                Smile Care &amp; Hygiene
              </button>
              <button
                type="button"
                onClick={() => scrollTo('patient-journey')}
                className="text-left text-sm text-[#bbc9c7] hover:text-[#77f7ec] transition-colors focus:outline-none"
              >
                Patient Guide
              </button>
              <button
                type="button"
                onClick={() => scrollTo('location-section')}
                className="text-left text-sm text-[#bbc9c7] hover:text-[#77f7ec] transition-colors focus:outline-none"
              >
                Contact &amp; Location
              </button>
            </nav>
          </div>

          {/* Col 3: Legal & Trust */}
          <div className="lg:col-span-2 flex flex-col space-y-3">
            <span className="font-['Plus+Jakarta+Sans'] text-[16px] font-bold text-white mb-1">
              Legal &amp; Trust
            </span>
            <nav className="flex flex-col space-y-2.5" aria-label="Legal Navigation">
              <button
                type="button"
                onClick={() => onOpenPolicy('privacy')}
                className="text-left text-sm text-[#bbc9c7] hover:text-[#77f7ec] transition-colors focus:outline-none"
              >
                Privacy Policy
              </button>
              <button
                type="button"
                onClick={() => onOpenPolicy('terms')}
                className="text-left text-sm text-[#bbc9c7] hover:text-[#77f7ec] transition-colors focus:outline-none"
              >
                Terms of Use
              </button>
              <button
                type="button"
                onClick={() => onOpenPolicy('emergency')}
                className="text-left text-sm text-[#bbc9c7] hover:text-[#77f7ec] transition-colors focus:outline-none flex items-center gap-1.5"
              >
                <span>Emergency Care</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#fe776d]"></span>
              </button>
            </nav>
          </div>

          {/* Col 4: Appointments */}
          <div className="lg:col-span-3 flex flex-col space-y-3">
            <span className="font-['Plus+Jakarta+Sans'] text-[16px] font-bold text-white mb-1">
              Appointments
            </span>
            <p className="text-xs text-[#bbc9c7] leading-relaxed">
              Experience stress-free dental visits with our state-of-the-art modern consultation suites.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={onBookClick}
                className="inline-flex items-center justify-center bg-[#13afa6] hover:bg-[#006a64] text-white font-['Plus+Jakarta+Sans'] font-semibold text-sm px-6 py-3 rounded-full transition-all w-fit shadow-[0_4px_16px_rgba(19,175,166,0.3)] transform hover:-translate-y-0.5 active:translate-y-0"
              >
                Book Consultation
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-[#bbc9c7]/20">
          <p className="text-xs text-[#bbc9c7] text-center md:text-left">
            © 2025 {CLINIC_CONFIG.name}. All rights reserved. Crafted with care in Randesan, Gandhinagar.
          </p>
          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={() => onOpenPolicy('privacy')}
              className="text-xs text-[#bbc9c7] hover:text-[#77f7ec] transition-colors"
            >
              Privacy
            </button>
            <button
              type="button"
              onClick={() => onOpenPolicy('terms')}
              className="text-xs text-[#bbc9c7] hover:text-[#77f7ec] transition-colors"
            >
              Terms
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
