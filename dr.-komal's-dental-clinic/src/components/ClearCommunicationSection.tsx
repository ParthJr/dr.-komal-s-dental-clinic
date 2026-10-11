import React from 'react';

export const ClearCommunicationSection: React.FC = () => {
  return (
    <section className="w-full py-16 lg:py-24 bg-[#f4faff]">
      <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column */}
          <div className="lg:col-span-5">
            <span className="inline-block px-3.5 py-1 rounded-full bg-[#e8f6ff] text-[#006a64] text-xs font-bold tracking-wider uppercase mb-3 border border-[#13afa6]/15">
              DOCTOR-PATIENT TRUST
            </span>
            <h2 className="font-['Plus+Jakarta+Sans'] text-[30px] sm:text-[38px] lg:text-[42px] font-bold text-[#101d24] tracking-tight mb-4 leading-[1.18]">
              Care That Starts With Listening.
            </h2>
            <p className="text-[17px] text-[#536160] mb-6 leading-relaxed">
              Dental anxiety is common, and rushed appointments only make it worse. We slow down the pace so every patient feels recognized, respected, and fully informed.
            </p>
            <div className="p-6 rounded-2xl bg-[#e8f6ff] border border-[#13afa6]/20">
              <p className="font-['Plus+Jakarta+Sans'] text-[18px] font-bold text-[#101d24] mb-1">
                “No judgment, no confusion.”
              </p>
              <p className="text-sm text-[#536160]">
                Our commitment to honest conversations and sensible clinical recommendations.
              </p>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-7 space-y-4">
            {/* Item 1 */}
            <div className="p-6 rounded-2xl bg-white shadow-sm border border-[#e2f0f9] flex items-start gap-4 hover:shadow-md transition-shadow">
              <div className="w-11 h-11 rounded-xl bg-[#e8f6ff] flex items-center justify-center text-[#006a64] shrink-0">
                <span className="material-symbols-outlined text-[24px]">hearing</span>
              </div>
              <div>
                <h3 className="font-['Plus+Jakarta+Sans'] text-[18px] font-bold text-[#101d24] mb-1">
                  Understand your concerns
                </h3>
                <p className="text-[15px] text-[#536160] leading-relaxed">
                  We take the time to hear your priorities, personal sensitivities, past dental experiences, and aesthetic preferences.
                </p>
              </div>
            </div>

            {/* Item 2 */}
            <div className="p-6 rounded-2xl bg-white shadow-sm border border-[#e2f0f9] flex items-start gap-4 hover:shadow-md transition-shadow">
              <div className="w-11 h-11 rounded-xl bg-[#e8f6ff] flex items-center justify-center text-[#006a64] shrink-0">
                <span className="material-symbols-outlined text-[24px]">translate</span>
              </div>
              <div>
                <h3 className="font-['Plus+Jakarta+Sans'] text-[18px] font-bold text-[#101d24] mb-1">
                  Explain available options
                </h3>
                <p className="text-[15px] text-[#536160] leading-relaxed">
                  Clear, transparent breakdowns of suitable clinical choices without intimidating clinical jargon or surprise fees.
                </p>
              </div>
            </div>

            {/* Item 3 */}
            <div className="p-6 rounded-2xl bg-white shadow-sm border border-[#e2f0f9] flex items-start gap-4 hover:shadow-md transition-shadow">
              <div className="w-11 h-11 rounded-xl bg-[#e8f6ff] flex items-center justify-center text-[#006a64] shrink-0">
                <span className="material-symbols-outlined text-[24px]">task_alt</span>
              </div>
              <div>
                <h3 className="font-['Plus+Jakarta+Sans'] text-[18px] font-bold text-[#101d24] mb-1">
                  Support informed decisions
                </h3>
                <p className="text-[15px] text-[#536160] leading-relaxed">
                  Empowering you to choose what feels genuinely right for your health, lifestyle, schedule, and peace of mind.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
