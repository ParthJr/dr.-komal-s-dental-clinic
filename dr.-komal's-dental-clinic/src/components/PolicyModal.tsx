import React, { useEffect } from 'react';
import { CLINIC_CONFIG } from '../config/clinic';

export type PolicyType = 'privacy' | 'terms' | 'emergency' | null;

interface PolicyModalProps {
  type: PolicyType;
  onClose: () => void;
  onBookClick?: () => void;
}

export const PolicyModal: React.FC<PolicyModalProps> = ({
  type,
  onClose,
  onBookClick,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (type) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [type, onClose]);

  if (!type) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="policy-dialog-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#101d24]/60 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-[#e2f0f9] relative max-h-[85vh] overflow-y-auto"
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

        {/* Content based on type */}
        {type === 'privacy' && (
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#e8f6ff] text-[#006a64] flex items-center justify-center">
                <span className="material-symbols-outlined text-[24px]">verified_user</span>
              </div>
              <h3
                id="policy-dialog-title"
                className="font-['Plus+Jakarta+Sans'] text-[22px] font-bold text-[#101d24]"
              >
                Privacy Policy &amp; Patient Notice
              </h3>
            </div>

            <div className="space-y-4 text-[14px] text-[#536160] leading-relaxed">
              <p>
                At <strong>{CLINIC_CONFIG.name}</strong>, we respect your confidentiality and personal privacy. We collect minimal personal information strictly necessary to coordinate appointment scheduling.
              </p>

              <h4 className="font-bold text-[#101d24] text-[15px]">1. Information We Collect</h4>
              <p>
                When you submit an appointment enquiry through our website, we collect your full name, contact mobile number, preferred service, date, and any optional notes you choose to share.
              </p>

              <h4 className="font-bold text-[#101d24] text-[15px]">2. Purpose of Processing</h4>
              <p>
                Your contact details are used solely by our clinic reception team to call or message you for slot confirmation, scheduling updates, and clinic location assistance in Randesan, Gandhinagar.
              </p>

              <h4 className="font-bold text-[#101d24] text-[15px]">3. Data Protection</h4>
              <p>
                We do not sell, rent, or distribute your contact details to third-party marketing companies. Enquiries are securely handled and kept confidential.
              </p>
            </div>
          </div>
        )}

        {type === 'terms' && (
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#e8f6ff] text-[#006a64] flex items-center justify-center">
                <span className="material-symbols-outlined text-[24px]">gavel</span>
              </div>
              <h3
                id="policy-dialog-title"
                className="font-['Plus+Jakarta+Sans'] text-[22px] font-bold text-[#101d24]"
              >
                Terms of Use &amp; Consultation Policy
              </h3>
            </div>

            <div className="space-y-4 text-[14px] text-[#536160] leading-relaxed">
              <p>
                Welcome to <strong>{CLINIC_CONFIG.name}</strong>. By accessing this website or submitting an appointment enquiry, you acknowledge the following guidelines:
              </p>

              <h4 className="font-bold text-[#101d24] text-[15px]">1. Online Enquiries</h4>
              <p>
                Website submissions constitute an appointment enquiry and do not guarantee an immediate confirmed clinical appointment until confirmed directly by our clinic team.
              </p>

              <h4 className="font-bold text-[#101d24] text-[15px]">2. Informational Purpose Only</h4>
              <p>
                Content on this website provides general educational insight into oral health, dental hygiene, and aesthetic options. It does not replace in-person diagnostic examination by a qualified dental professional.
              </p>

              <h4 className="font-bold text-[#101d24] text-[15px]">3. Clinic Hours &amp; Visits</h4>
              <p>
                Consultations begin from 11:00 AM (Monday to Saturday) at Ground Floor 23, Sarthak Fortune Mall, Randesan. Timings are finalized with patients based on clinical availability.
              </p>
            </div>
          </div>
        )}

        {type === 'emergency' && (
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#ffdad6] text-[#ba1a1a] flex items-center justify-center">
                <span className="material-symbols-outlined text-[24px]">medical_services</span>
              </div>
              <h3
                id="policy-dialog-title"
                className="font-['Plus+Jakarta+Sans'] text-[22px] font-bold text-[#101d24]"
              >
                Emergency Dental Guidance
              </h3>
            </div>

            <div className="space-y-4 text-[14px] text-[#536160] leading-relaxed">
              <p>
                If you are experiencing severe dental discomfort, bleeding, or trauma, please follow these immediate first-aid protocols:
              </p>

              <div className="p-4 rounded-xl bg-[#f4faff] border border-[#e2f0f9] space-y-2">
                <h4 className="font-bold text-[#101d24] text-[15px]">Immediate Steps:</h4>
                <ul className="list-disc list-inside space-y-1.5 text-xs text-[#3c4948]">
                  <li>
                    <strong>Knocked-Out Tooth:</strong> Handle tooth by the crown only (do not touch root). Rinse gently with milk or saline. Keep in milk or saliva and seek clinical care within 60 minutes.
                  </li>
                  <li>
                    <strong>Acute Toothache or Swelling:</strong> Rinse mouth with lukewarm salt water. Apply a cold compress externally to the cheek. Avoid placing aspirin directly against gum tissue.
                  </li>
                  <li>
                    <strong>Broken Restoration:</strong> Keep any recovered tooth or crown fragments clean and bring them to your emergency exam.
                  </li>
                </ul>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    if (onBookClick) onBookClick();
                  }}
                  className="w-full py-3 rounded-xl bg-[#fe776d] hover:bg-[#a73732] text-white font-['Plus+Jakarta+Sans'] font-semibold text-sm transition-colors shadow-md flex items-center justify-center gap-2"
                >
                  <span>Request Priority Consultation</span>
                  <span className="material-symbols-outlined text-[18px]">calendar_month</span>
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="mt-6 pt-4 border-t border-[#e2f0f9] flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#e8f6ff] hover:bg-[#dceaf3] text-[#006a64] font-semibold text-sm transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
