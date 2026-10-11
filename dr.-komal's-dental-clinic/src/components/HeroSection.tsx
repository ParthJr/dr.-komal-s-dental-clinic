import React from 'react';
import { CLINIC_CONFIG } from '../config/clinic';

interface HeroSectionProps {
  onRequestAppointment: () => void;
  onExploreTreatments: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onRequestAppointment,
  onExploreTreatments,
}) => {
  return (
    <section id="home" className="relative w-full overflow-hidden bg-[#f4faff] py-10 lg:py-16">
      <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6">
            {/* Pill kicker */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#e8f6ff] text-[#006a64] text-xs font-semibold tracking-wide border border-[#13afa6]/15">
              <span className="w-2 h-2 rounded-full bg-[#13afa6] animate-pulse"></span>
              YOUR DENTAL CARE, MADE PERSONAL
            </div>

            {/* Main Headline */}
            <h1 className="font-['Plus+Jakarta+Sans'] text-[36px] sm:text-[46px] lg:text-[56px] text-[#101d24] font-bold tracking-tight leading-[1.12]">
              Feel Good About <br className="hidden sm:inline" />
              <span className="text-[#006a64]">Your Smile.</span>
            </h1>

            {/* Paragraph */}
            <p className="text-[17px] sm:text-[18px] text-[#536160] max-w-xl leading-relaxed">
              From routine check-ups to cosmetic and restorative dental care, explore treatment options and take the next step toward a healthier, more confident smile.
            </p>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-1 w-full sm:w-auto">
              <button
                type="button"
                onClick={onRequestAppointment}
                className="w-full sm:w-auto inline-flex items-center justify-center bg-[#13afa6] hover:bg-[#006a64] text-white font-['Plus+Jakarta+Sans'] font-semibold text-[15px] px-7 py-3.5 rounded-xl shadow-lg shadow-[#13afa6]/25 hover:shadow-[#13afa6]/35 transition-all transform hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#006a64]"
              >
                <span>Request an Appointment</span>
                <span className="material-symbols-outlined ml-2 text-[20px]">arrow_forward</span>
              </button>

              <button
                type="button"
                onClick={onExploreTreatments}
                className="w-full sm:w-auto inline-flex items-center justify-center bg-white hover:bg-[#e8f6ff] text-[#006a64] font-['Plus+Jakarta+Sans'] font-semibold text-[15px] px-7 py-3.5 rounded-xl shadow-sm hover:shadow border border-[#e2f0f9] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#13afa6]"
              >
                <span>Explore Treatments</span>
              </button>
            </div>

            {/* Reputation Card */}
            <div className="mt-2 p-4 rounded-2xl bg-white shadow-sm border border-[#e2f0f9] flex items-center gap-4 max-w-md w-full">
              <div className="w-11 h-11 rounded-xl bg-[#e8f6ff] flex items-center justify-center text-[#fe776d] shrink-0">
                <span className="material-symbols-outlined text-[26px]">verified</span>
              </div>
              <div>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="font-['Plus+Jakarta+Sans'] text-[20px] font-bold text-[#101d24]">
                    {CLINIC_CONFIG.ratings.score}
                  </span>
                  <div className="flex text-[#fe776d]">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className="material-symbols-outlined text-[18px]"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        star
                      </span>
                    ))}
                  </div>
                  <span className="text-xs font-semibold text-[#6c7a78]">
                    ({CLINIC_CONFIG.ratings.reviewCount} reviews)
                  </span>
                </div>
                <p className="text-xs text-[#536160] mt-0.5">
                  {CLINIC_CONFIG.ratings.label}
                </p>
              </div>
            </div>
          </div>

          {/* Right Visual Area */}
          <div className="lg:col-span-5 relative mt-6 lg:mt-0">
            <div className="relative mx-auto max-w-[460px] lg:max-w-none">
              {/* Backdrop glow */}
              <div className="absolute -inset-3 rounded-3xl bg-[#e8f6ff] transform -rotate-1 pointer-events-none"></div>

              {/* Main Image Container */}
              <div className="relative overflow-hidden rounded-3xl shadow-xl aspect-[4/5] bg-[#e2f0f9] border border-white">
                <img
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA2ZewQe2ZSaLCN2VY15iPuDa9b3x0O1YdxOqN8uhz-cJpc7ywcqUIVoIyOXQUPTa-C1CIqCD-mPsryk7OTAKjkeMO8Il54J9frTo5LUUh4OLs-MVWQA8mmYrdpSTAjP_W4GlyLT5icSn-PhThMwsQyUJVIYSZGjVP78OmHLFZXamAX2X1IbLKhAgX27MumQhlBKWio7X6_k5C8hIMHzOIUh6SpPu74N3IzJr9J9XjIDjk-KDMmcON3"
                  alt="Modern gentle dental consultation suite at Dr. Komal's Dental Clinic in Randesan, Gandhinagar"
                  loading="eager"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#253239]/70 via-transparent to-transparent pointer-events-none" />

                {/* Floating Bottom Info Badge */}
                <div className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl bg-white/95 backdrop-blur-md shadow-lg flex items-center justify-between border border-white/80">
                  <div className="flex items-center gap-3">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#fe776d] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-[#a73732]"></span>
                    </span>
                    <div>
                      <h4 className="font-['Plus+Jakarta+Sans'] text-[14px] font-bold text-[#101d24]">
                        Personalized Care
                      </h4>
                      <p className="text-xs text-[#536160]">
                        Randesan Consultation Clinic
                      </p>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-[#13afa6] text-[24px]">
                    dentistry
                  </span>
                </div>
              </div>

              {/* Overlapping Accent Widget */}
              <div className="absolute -top-3 -right-3 p-3 rounded-2xl bg-white shadow-md flex items-center gap-2 border border-[#e2f0f9]">
                <span className="material-symbols-outlined text-[#13afa6] text-[20px]">
                  check_circle
                </span>
                <span className="text-xs font-bold text-[#101d24]">
                  Gentle Treatment
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
