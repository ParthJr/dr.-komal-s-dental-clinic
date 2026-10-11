import React, { useState } from 'react';
import { CLINIC_CONFIG } from '../config/clinic';

export const LocationSection: React.FC = () => {
  const [showCallNotice, setShowCallNotice] = useState(false);

  const handleCallClick = (e: React.MouseEvent) => {
    if (!CLINIC_CONFIG.contact.isPhoneVerified) {
      e.preventDefault();
      setShowCallNotice(true);
    }
  };

  return (
    <section id="location-section" className="w-full py-16 lg:py-24 bg-white">
      <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Clinic Details Card */}
          <div className="lg:col-span-6 flex flex-col justify-between p-8 md:p-12 rounded-3xl bg-[#f4faff] border border-[#e2f0f9] shadow-sm">
            <div>
              <span className="inline-block px-3.5 py-1 rounded-full bg-[#e8f6ff] text-[#006a64] text-xs font-bold tracking-wider uppercase mb-3 border border-[#13afa6]/15">
                PRACTICE LOCATION
              </span>
              <h2 className="font-['Plus+Jakarta+Sans'] text-[30px] sm:text-[38px] lg:text-[42px] font-bold text-[#101d24] tracking-tight mb-6">
                Find Us in Randesan.
              </h2>

              <div className="space-y-6">
                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-[#e8f6ff] text-[#006a64] flex items-center justify-center shrink-0 shadow-xs">
                    <span className="material-symbols-outlined text-[24px]">location_on</span>
                  </div>
                  <div>
                    <h3 className="font-['Plus+Jakarta+Sans'] text-[18px] font-bold text-[#101d24] mb-1">
                      {CLINIC_CONFIG.name}
                    </h3>
                    <p className="text-[15px] text-[#536160] leading-relaxed">
                      {CLINIC_CONFIG.address.line1},<br />
                      {CLINIC_CONFIG.address.line2},<br />
                      {CLINIC_CONFIG.address.area}, {CLINIC_CONFIG.address.city}, {CLINIC_CONFIG.address.state} {CLINIC_CONFIG.address.postalCode}.
                    </p>
                  </div>
                </div>

                {/* Consultation Hours */}
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-[#e8f6ff] text-[#006a64] flex items-center justify-center shrink-0 shadow-xs">
                    <span className="material-symbols-outlined text-[24px]">schedule</span>
                  </div>
                  <div>
                    <h3 className="font-['Plus+Jakarta+Sans'] text-[18px] font-bold text-[#101d24] mb-1">
                      Consultation Hours
                    </h3>
                    <p className="text-[15px] text-[#536160] leading-relaxed">
                      Opens {CLINIC_CONFIG.hours.openTime} · {CLINIC_CONFIG.hours.days}<br />
                      <span className="text-xs text-[#6c7a78]">
                        {CLINIC_CONFIG.hours.note}
                      </span>
                    </p>
                  </div>
                </div>

                {/* Direct Assistance */}
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-[#e8f6ff] text-[#006a64] flex items-center justify-center shrink-0 shadow-xs">
                    <span className="material-symbols-outlined text-[24px]">call</span>
                  </div>
                  <div>
                    <h3 className="font-['Plus+Jakarta+Sans'] text-[18px] font-bold text-[#101d24] mb-1">
                      Direct Assistance
                    </h3>
                    <p className="text-[15px] text-[#536160] leading-relaxed">
                      Available during operating hours for enquiries and location help.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-8 flex flex-wrap gap-4 items-center">
              <a
                href={CLINIC_CONFIG.contact.mapsQueryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-[#13afa6] hover:bg-[#006a64] text-white font-['Plus+Jakarta+Sans'] font-semibold text-[15px] px-6 py-3.5 rounded-xl shadow-md transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Get Directions</span>
                <span className="material-symbols-outlined ml-2 text-[20px]">directions</span>
              </a>

              <a
                href={CLINIC_CONFIG.contact.isPhoneVerified ? `tel:${CLINIC_CONFIG.contact.rawPhone}` : '#'}
                onClick={handleCallClick}
                className="inline-flex items-center justify-center bg-white hover:bg-[#e8f6ff] text-[#006a64] font-['Plus+Jakarta+Sans'] font-semibold text-[15px] px-6 py-3.5 rounded-xl shadow-sm hover:shadow border border-[#e2f0f9] transition-all"
              >
                <span>Call Clinic</span>
                <span className="material-symbols-outlined ml-2 text-[20px]">phone_in_talk</span>
              </a>
            </div>

            {/* Phone Verification Notice Modal/Drawer */}
            {showCallNotice && (
              <div className="mt-4 p-4 rounded-xl bg-[#e8f6ff] border border-[#13afa6]/30 text-xs text-[#3c4948] flex items-start gap-3">
                <span className="material-symbols-outlined text-[#13afa6] text-[20px] shrink-0 mt-0.5">
                  info
                </span>
                <div className="flex-1">
                  <strong className="block text-[#101d24]">Direct Phone Integration Notice</strong>
                  The clinic's direct telephone line will be activated once Dr. Komal's official telephone number is verified and configured in <code>clinic.ts</code>. You can submit an appointment enquiry using the online form above, and our staff will reach out to you promptly.
                </div>
                <button
                  type="button"
                  onClick={() => setShowCallNotice(false)}
                  className="text-[#6c7a78] hover:text-[#101d24] font-bold text-sm"
                >
                  ✕
                </button>
              </div>
            )}
          </div>

          {/* Styled Map & Landmark Area */}
          <div className="lg:col-span-6 flex flex-col">
            <div
              className="w-full h-80 lg:h-full min-h-[360px] rounded-3xl bg-cover bg-center shadow-md relative overflow-hidden border border-[#e2f0f9]"
              style={{
                backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuBey_90cmndirs9O-awsmpYWk0bT4kTOBHRstQt05ab_VQowCAg--UBmnzrOVwSHyCYZVoap-og32jAlr-plQkYvFTWbarQSwxFAVMuYKw4FMG0J8JLm3JaEZITZnqj5-NJ37CJVAMNvQ_ym98tDS2hIqa9LK9F5JkywUAQWKk4GF65kY35CknrpLU9NQxhzxIW30vGQOTnyzh8_WIPu7jc8BBvRiEeZ_15JAx2ZVt9bG_Ottv4QFDQ')`,
              }}
            >
              {/* Map Gradient Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#101d24]/50 via-transparent to-transparent pointer-events-none" />

              {/* Pin indicator */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl shadow-xl border border-white flex items-center gap-2 pointer-events-none">
                <span className="material-symbols-outlined text-[#a73732] text-[22px]">
                  location_on
                </span>
                <span className="font-['Plus+Jakarta+Sans'] text-xs font-bold text-[#101d24]">
                  Sarthak Fortune Mall
                </span>
              </div>

              {/* Overlay Landmark Highlights matching Stitch */}
              <div className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl bg-white/95 backdrop-blur-md shadow-lg border border-white/80">
                <h4 className="font-['Plus+Jakarta+Sans'] text-[15px] font-bold text-[#101d24] mb-2">
                  Key Nearby Landmarks
                </h4>
                <div className="flex flex-wrap gap-2">
                  {CLINIC_CONFIG.landmarks.map((landmark, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-full bg-[#e8f6ff] text-[#006a64] text-xs font-semibold border border-[#13afa6]/15"
                    >
                      {landmark}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
