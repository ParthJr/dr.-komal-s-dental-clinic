import React from 'react';

export const SmileConfidenceSection: React.FC = () => {
  return (
    <section id="philosophy" className="w-full py-16 lg:py-24 bg-[#e8f6ff] relative overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
        {/* Section Header */}
        <div className="max-w-2xl mb-14">
          <span className="inline-block px-3.5 py-1 rounded-full bg-white text-[#006a64] text-xs font-bold tracking-wider uppercase mb-3 border border-[#13afa6]/15 shadow-xs">
            OUR CLINICAL PHILOSOPHY
          </span>
          <h2 className="font-['Plus+Jakarta+Sans'] text-[30px] sm:text-[38px] lg:text-[42px] font-bold text-[#101d24] tracking-tight mb-4">
            Small Steps. Healthier Smiles.
          </h2>
          <p className="text-[17px] text-[#536160] leading-relaxed">
            Good oral health starts with clear understanding, regular prevention, and sustainable daily habits that protect your smile across every stage of life.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Principle 1 */}
          <div className="p-8 rounded-3xl bg-white shadow-sm border border-[#e2f0f9] flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-[#e8f6ff] flex items-center justify-center text-[#006a64] mb-6">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  <path d="m9 12 2 2 4-4"></path>
                </svg>
              </div>
              <h3 className="font-['Plus+Jakarta+Sans'] text-[20px] font-bold text-[#101d24] mb-3">
                Preventive Care
              </h3>
              <p className="text-[15px] text-[#536160] leading-relaxed">
                Routine diagnostic hygiene reviews, gentle plaque debridement, and early cavity screening to stop dental complications before they evolve.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-[#e2f0f9]">
              <span className="text-xs font-bold text-[#006a64] uppercase tracking-wider">
                Proactive Checkups
              </span>
            </div>
          </div>

          {/* Principle 2 */}
          <div className="p-8 rounded-3xl bg-white shadow-sm border border-[#e2f0f9] flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-[#e8f6ff] flex items-center justify-center text-[#006a64] mb-6">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                  <path d="M8 10h.01M12 10h.01M16 10h.01"></path>
                </svg>
              </div>
              <h3 className="font-['Plus+Jakarta+Sans'] text-[20px] font-bold text-[#101d24] mb-3">
                Personalized Consultations
              </h3>
              <p className="text-[15px] text-[#536160] leading-relaxed">
                In-depth conversations centered on your personal goals, budget parameters, and comfort level, with full clinical clarity at every turn.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-[#e2f0f9]">
              <span className="text-xs font-bold text-[#006a64] uppercase tracking-wider">
                Transparent Guidance
              </span>
            </div>
          </div>

          {/* Principle 3 */}
          <div className="p-8 rounded-3xl bg-white shadow-sm border border-[#e2f0f9] flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-[#e8f6ff] flex items-center justify-center text-[#006a64] mb-6">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="m4.93 4.93 4.24 4.24M14.83 14.83l4.24 4.24M14.83 9.17l4.24-4.24M4.93 19.07l4.24-4.24"></path>
                </svg>
              </div>
              <h3 className="font-['Plus+Jakarta+Sans'] text-[20px] font-bold text-[#101d24] mb-3">
                Everyday Oral Hygiene
              </h3>
              <p className="text-[15px] text-[#536160] leading-relaxed">
                Simple, practical coaching on flossing techniques, gum stimulation, and enamel nutrition to keep your teeth strong between visits.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-[#e2f0f9]">
              <span className="text-xs font-bold text-[#006a64] uppercase tracking-wider">
                Daily Confidence
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
