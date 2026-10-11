import React, { useEffect } from 'react';
import { TreatmentDetail } from '../config/clinic';

interface TreatmentModalProps {
  treatment: TreatmentDetail | null;
  onClose: () => void;
  onSelectTreatmentForBooking: (serviceId: string) => void;
}

export const TreatmentModal: React.FC<TreatmentModalProps> = ({
  treatment,
  onClose,
  onSelectTreatmentForBooking,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (treatment) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [treatment, onClose]);

  if (!treatment) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-treatment-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#101d24]/60 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-[#e2f0f9] relative max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-[#e8f6ff] hover:bg-[#dceaf3] text-[#3c4948] flex items-center justify-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#13afa6]"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-[#e8f6ff] text-[#006a64] flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[28px]">{treatment.icon}</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-[#d6e5ee] text-[#3c4948] text-xs font-semibold">
                {treatment.category}
              </span>
              {treatment.badge && (
                <span className="px-2.5 py-0.5 rounded-full bg-[#13afa6]/15 text-[#006a64] text-xs font-semibold">
                  {treatment.badge}
                </span>
              )}
            </div>
            <h3
              id="modal-treatment-title"
              className="font-['Plus+Jakarta+Sans'] text-[22px] font-bold text-[#101d24] mt-1"
            >
              {treatment.title}
            </h3>
          </div>
        </div>

        {/* Description */}
        <p className="text-[15px] text-[#536160] leading-relaxed mb-4">
          {treatment.description}
        </p>

        {/* Detailed Explanation */}
        <div className="p-4 rounded-2xl bg-[#f4faff] border border-[#e2f0f9] mb-5">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#006a64] mb-1.5">
            Clinical Overview
          </h4>
          <p className="text-sm text-[#3c4948] leading-relaxed">{treatment.details}</p>
        </div>

        {/* Care Highlights */}
        <div className="mb-6">
          <h4 className="text-sm font-bold text-[#101d24] mb-3">What to Expect</h4>
          <div className="space-y-2">
            {treatment.highlights.map((h, i) => (
              <div key={i} className="flex items-center gap-2.5 text-sm text-[#3c4948]">
                <span className="material-symbols-outlined text-[#13afa6] text-[18px]">
                  check_circle
                </span>
                <span>{h}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2 border-t border-[#e2f0f9]">
          <button
            type="button"
            onClick={() => {
              onSelectTreatmentForBooking(treatment.id);
              onClose();
            }}
            className="flex-1 py-3 px-5 rounded-xl bg-[#13afa6] hover:bg-[#006a64] text-white font-['Plus+Jakarta+Sans'] font-semibold text-sm shadow-md transition-all flex items-center justify-center gap-2"
          >
            <span>Book for this Treatment</span>
            <span className="material-symbols-outlined text-[18px]">calendar_add_on</span>
          </button>
          <button
            type="button"
            onClick={onClose}
            className="py-3 px-5 rounded-xl bg-white hover:bg-[#e8f6ff] text-[#536160] font-semibold text-sm border border-[#e2f0f9] transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
