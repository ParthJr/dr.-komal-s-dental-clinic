import React from 'react';

export const PatientJourney: React.FC = () => {
  return (
    <section id="patient-journey" className="w-full py-16 lg:py-24 bg-white">
      <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-block px-3.5 py-1 rounded-full bg-[#e8f6ff] text-[#006a64] text-xs font-bold tracking-wider uppercase mb-3 border border-[#13afa6]/15">
            SEAMLESS CARE
          </span>
          <h2 className="font-['Plus+Jakarta+Sans'] text-[30px] sm:text-[38px] lg:text-[42px] font-bold text-[#101d24] tracking-tight mb-3">
            Your Visit, Made Simple.
          </h2>
          <p className="text-[17px] text-[#536160] leading-relaxed">
            Transparent, stress-free stages from your first question through to your long-term smile plan.
          </p>
        </div>

        {/* Process Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Step 1 */}
          <div className="relative p-8 rounded-3xl bg-[#f4faff] border border-[#e2f0f9] shadow-sm flex flex-col items-start hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-[#e8f6ff] text-[#006a64] flex items-center justify-center font-['Plus+Jakarta+Sans'] font-bold text-[20px] mb-6">
              01
            </div>
            <h3 className="font-['Plus+Jakarta+Sans'] text-[20px] font-bold text-[#101d24] mb-2">
              Get in Touch
            </h3>
            <p className="text-[15px] text-[#536160] leading-relaxed mb-6">
              Request an appointment online or call us directly. Let us know what times best suit your daily routine.
            </p>
            <div className="mt-auto flex items-center text-[#6c7a78] text-xs font-semibold pt-4 border-t border-[#e2f0f9] w-full">
              <span className="material-symbols-outlined mr-1.5 text-[18px] text-[#13afa6]">
                touch_app
              </span>
              <span>Easy online booking</span>
            </div>
          </div>

          {/* Step 2 */}
          <div className="relative p-8 rounded-3xl bg-[#f4faff] border border-[#e2f0f9] shadow-sm flex flex-col items-start hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-[#e8f6ff] text-[#006a64] flex items-center justify-center font-['Plus+Jakarta+Sans'] font-bold text-[20px] mb-6">
              02
            </div>
            <h3 className="font-['Plus+Jakarta+Sans'] text-[20px] font-bold text-[#101d24] mb-2">
              Discuss Your Needs
            </h3>
            <p className="text-[15px] text-[#536160] leading-relaxed mb-6">
              Meet with our clinical team in Randesan to express your concerns, discuss medical history, and complete your gentle exam.
            </p>
            <div className="mt-auto flex items-center text-[#6c7a78] text-xs font-semibold pt-4 border-t border-[#e2f0f9] w-full">
              <span className="material-symbols-outlined mr-1.5 text-[18px] text-[#13afa6]">
                record_voice_over
              </span>
              <span>Attentive listening</span>
            </div>
          </div>

          {/* Step 3 */}
          <div className="relative p-8 rounded-3xl bg-[#f4faff] border border-[#e2f0f9] shadow-sm flex flex-col items-start hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-[#e8f6ff] text-[#006a64] flex items-center justify-center font-['Plus+Jakarta+Sans'] font-bold text-[20px] mb-6">
              03
            </div>
            <h3 className="font-['Plus+Jakarta+Sans'] text-[20px] font-bold text-[#101d24] mb-2">
              Plan Your Next Step
            </h3>
            <p className="text-[15px] text-[#536160] leading-relaxed mb-6">
              Receive clear, transparent treatment options with full cost clarity. You decide what moves forward at your own pace.
            </p>
            <div className="mt-auto flex items-center text-[#6c7a78] text-xs font-semibold pt-4 border-t border-[#e2f0f9] w-full">
              <span className="material-symbols-outlined mr-1.5 text-[18px] text-[#13afa6]">
                checklist
              </span>
              <span>Zero-pressure decisions</span>
            </div>
          </div>
        </div>

        {/* Disclaimer Notice Banner */}
        <div className="mt-10 p-5 rounded-2xl bg-[#e8f6ff] border border-[#13afa6]/20 text-center max-w-2xl mx-auto shadow-xs">
          <p className="text-[14px] text-[#3c4948] leading-relaxed">
            <strong className="text-[#101d24] font-semibold">Please Note:</strong> Online submissions constitute an appointment enquiry. Our clinic staff will contact you promptly to finalize your exact slot.
          </p>
        </div>
      </div>
    </section>
  );
};
