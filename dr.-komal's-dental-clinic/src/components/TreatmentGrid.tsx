import React, { useState } from 'react';
import { CLINIC_CONFIG, TreatmentDetail } from '../config/clinic';
import { TreatmentModal } from './TreatmentModal';

interface TreatmentGridProps {
  onSelectTreatmentForBooking: (serviceId: string) => void;
}

export const TreatmentGrid: React.FC<TreatmentGridProps> = ({
  onSelectTreatmentForBooking,
}) => {
  const [activeModalTreatment, setActiveModalTreatment] = useState<TreatmentDetail | null>(null);

  return (
    <section id="treatment-discovery" className="w-full py-16 lg:py-24 bg-white">
      <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-14">
          <span className="inline-block px-3.5 py-1 rounded-full bg-[#e8f6ff] text-[#006a64] text-xs font-bold tracking-wider uppercase mb-3 border border-[#13afa6]/15">
            OUR DENTAL SERVICES
          </span>
          <h2 className="font-['Plus+Jakarta+Sans'] text-[30px] sm:text-[38px] lg:text-[42px] font-bold text-[#101d24] tracking-tight mb-4">
            Care for Every Kind of Smile.
          </h2>
          <p className="text-[17px] text-[#536160] leading-relaxed">
            Explore the dental services offered at our Randesan practice and discover customized treatments designed for longevity, comfort, and natural aesthetics.
          </p>
        </div>

        {/* Treatment Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CLINIC_CONFIG.treatments.map((treatment) => {
            const isFeatured = treatment.recommended;

            if (isFeatured) {
              return (
                <div
                  key={treatment.id}
                  className="group p-8 rounded-3xl bg-[#e8f6ff] shadow-md flex flex-col justify-between relative overflow-hidden border border-[#13afa6]/20 transition-all hover:shadow-lg"
                >
                  <div className="absolute top-0 right-0 transform translate-x-4 -translate-y-4 w-32 h-32 bg-[#13afa6]/10 rounded-full blur-2xl pointer-events-none" />
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-[#006a64] text-white flex items-center justify-center mb-6 shadow-sm">
                      <span className="material-symbols-outlined text-[28px]">
                        {treatment.icon}
                      </span>
                    </div>
                    <div className="flex gap-2 mb-3">
                      <span className="px-2.5 py-0.5 rounded-full bg-[#13afa6] text-white text-xs font-semibold">
                        {treatment.category}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-white text-[#006a64] text-xs font-semibold shadow-xs">
                        {treatment.badge || 'Recommended'}
                      </span>
                    </div>
                    <h3 className="font-['Plus+Jakarta+Sans'] text-[20px] font-bold text-[#101d24] mb-2">
                      {treatment.title}
                    </h3>
                    <p className="text-[15px] text-[#536160] leading-relaxed">
                      {treatment.description}
                    </p>
                  </div>
                  <div className="pt-6 flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => onSelectTreatmentForBooking(treatment.id)}
                      className="inline-flex items-center text-[#006a64] hover:text-[#13afa6] font-['Plus+Jakarta+Sans'] font-semibold text-[14px] transition-colors group-hover:translate-x-1"
                    >
                      <span>Schedule Review</span>
                      <span className="material-symbols-outlined ml-1 text-[18px]">
                        arrow_forward
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveModalTreatment(treatment)}
                      className="text-xs text-[#536160] hover:text-[#101d24] underline underline-offset-2 transition-colors"
                    >
                      View details
                    </button>
                  </div>
                </div>
              );
            }

            return (
              <div
                key={treatment.id}
                className="group p-8 rounded-3xl bg-[#f4faff] hover:bg-[#e8f6ff] shadow-sm hover:shadow-md border border-[#e2f0f9] transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#e8f6ff] group-hover:bg-white flex items-center justify-center text-[#006a64] mb-6 transition-colors shadow-xs">
                    <span className="material-symbols-outlined text-[28px]">
                      {treatment.icon}
                    </span>
                  </div>
                  <div className="flex gap-2 mb-3">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#d6e5ee] text-[#3c4948] text-xs font-semibold">
                      {treatment.category}
                    </span>
                    {treatment.badge && (
                      <span className="px-2.5 py-0.5 rounded-full bg-[#dceaf3] text-[#006a64] text-xs font-semibold">
                        {treatment.badge}
                      </span>
                    )}
                  </div>
                  <h3 className="font-['Plus+Jakarta+Sans'] text-[20px] font-bold text-[#101d24] mb-2">
                    {treatment.title}
                  </h3>
                  <p className="text-[15px] text-[#536160] leading-relaxed">
                    {treatment.description}
                  </p>
                </div>
                <div className="pt-6 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => onSelectTreatmentForBooking(treatment.id)}
                    className="inline-flex items-center text-[#006a64] group-hover:text-[#13afa6] font-['Plus+Jakarta+Sans'] font-semibold text-[14px] transition-colors group-hover:translate-x-1"
                  >
                    <span>Learn More</span>
                    <span className="material-symbols-outlined ml-1 text-[18px]">
                      arrow_forward
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveModalTreatment(treatment)}
                    className="text-xs text-[#536160] hover:text-[#101d24] underline underline-offset-2 transition-colors"
                  >
                    Overview
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Details modal */}
      <TreatmentModal
        treatment={activeModalTreatment}
        onClose={() => setActiveModalTreatment(null)}
        onSelectTreatmentForBooking={onSelectTreatmentForBooking}
      />
    </section>
  );
};
