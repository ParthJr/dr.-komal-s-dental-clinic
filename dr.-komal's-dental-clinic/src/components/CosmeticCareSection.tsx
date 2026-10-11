import React from 'react';

interface CosmeticCareSectionProps {
  onDiscussGoals: () => void;
}

export const CosmeticCareSection: React.FC<CosmeticCareSectionProps> = ({ onDiscussGoals }) => {
  return (
    <section id="cosmetic-care" className="w-full py-16 lg:py-24 bg-[#f4faff]">
      <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Image Area */}
          <div className="lg:col-span-6 relative order-2 lg:order-1">
            <div className="relative overflow-hidden rounded-3xl aspect-[4/3] sm:aspect-[16/11] bg-[#e2f0f9] shadow-xl border border-white">
              <img
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDCCCM6I-eTVXgVwpk3AG-dsx2DZMwyFWjmTkdTYXookLOBvNtNW4-SwmCDOSPDeOiTZTZFDCZ0WAt08z4IVCOxFeQzdb-RYhNIwUTdKa6T73aPqm4hJnBGDr1mvdtDSWMFFoQ-tGQWKNDdSBjMjp-34lehm_UINU8OO-U7NFgaUtMb1Rh7fLE-nSp3C76ZoxeCn-5YwaGFdXWMOpfhtDrIEu7LV2KRaSWGPas9y5ZVqU4nI5CEJ4sv"
                alt="Confident radiant woman with healthy smile at Dr. Komal's Dental Clinic"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#006a64]/15 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Floating Info Card */}
            <div className="absolute -bottom-6 -right-2 sm:right-6 p-4 sm:p-5 rounded-2xl bg-white shadow-xl border border-[#e2f0f9] max-w-[260px]">
              <div className="flex items-center gap-2 mb-1">
                <span className="material-symbols-outlined text-[#fe776d] text-[20px]">
                  favorite
                </span>
                <span className="font-['Plus+Jakarta+Sans'] text-sm font-bold text-[#101d24]">
                  Gentle Touch
                </span>
              </div>
              <p className="text-xs text-[#536160] leading-snug">
                Aesthetic solutions designed for your individual facial harmony.
              </p>
            </div>
          </div>

          {/* Text Content */}
          <div className="lg:col-span-6 flex flex-col items-start space-y-6 lg:pl-8 order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#e8f6ff] text-[#006a64] text-xs font-bold tracking-wide border border-[#13afa6]/15">
              AESTHETIC &amp; RESTORATIVE CARE
            </div>

            <h2 className="font-['Plus+Jakarta+Sans'] text-[30px] sm:text-[38px] lg:text-[42px] font-bold text-[#101d24] tracking-tight leading-[1.15]">
              Your Smile Should <br className="hidden sm:inline" />
              <span className="text-[#006a64]">Feel Like You.</span>
            </h2>

            <p className="text-[17px] text-[#536160] leading-relaxed">
              Every patient has distinct priorities, facial expressions, and expectations. We spend time evaluating your facial aesthetics and listening to your goals before suggesting any aesthetic procedures.
            </p>

            <div className="space-y-3 w-full max-w-md">
              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white shadow-sm border border-[#e2f0f9]">
                <span className="material-symbols-outlined text-[#13afa6] text-[22px] shrink-0">
                  check_circle
                </span>
                <span className="text-[15px] text-[#101d24] font-medium">
                  Safe in-office enamel brightening
                </span>
              </div>

              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white shadow-sm border border-[#e2f0f9]">
                <span className="material-symbols-outlined text-[#13afa6] text-[22px] shrink-0">
                  check_circle
                </span>
                <span className="text-[15px] text-[#101d24] font-medium">
                  Subtle composite resin bonding &amp; contouring
                </span>
              </div>

              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white shadow-sm border border-[#e2f0f9]">
                <span className="material-symbols-outlined text-[#13afa6] text-[22px] shrink-0">
                  check_circle
                </span>
                <span className="text-[15px] text-[#101d24] font-medium">
                  Digital smile analysis and custom mockups
                </span>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={onDiscussGoals}
                className="inline-flex items-center justify-center bg-[#fe776d] hover:bg-[#a73732] text-white font-['Plus+Jakarta+Sans'] font-semibold text-[15px] px-7 py-3.5 rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#fe776d]"
              >
                <span>Discuss Your Smile Goals</span>
                <span className="material-symbols-outlined ml-2 text-[20px]">calendar_month</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
