import React, { useState, useEffect } from 'react';
import { CLINIC_CONFIG } from '../config/clinic';

interface AppointmentFormProps {
  selectedServiceId?: string;
  onClearSelectedService?: () => void;
}

interface FormState {
  fullName: string;
  mobileNumber: string;
  service: string;
  preferredDate: string;
  preferredTime: string;
  notes: string;
  consent: boolean;
  botHoneypot: string; // Honeypot field for spam prevention
}

export const AppointmentForm: React.FC<AppointmentFormProps> = ({
  selectedServiceId,
}) => {
  const [form, setForm] = useState<FormState>({
    fullName: '',
    mobileNumber: '',
    service: selectedServiceId || '',
    preferredDate: '',
    preferredTime: '',
    notes: '',
    consent: false,
    botHoneypot: '',
  });

  // Calculate today's date formatted as YYYY-MM-DD for min date
  const todayString = new Date().toISOString().split('T')[0];

  // Update service if selectedServiceId changes from parent
  useEffect(() => {
    if (selectedServiceId) {
      setForm((prev) => ({ ...prev, service: selectedServiceId }));
    }
  }, [selectedServiceId]);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [referenceId, setReferenceId] = useState<string | null>(null);

  // Validate Indian Mobile Number: 10 digits starting with 6, 7, 8, or 9
  const validateMobile = (mobile: string): string | null => {
    const cleaned = mobile.replace(/[\s\-\(\)\+]/g, '').replace(/^(\+?91|0)/, '');
    if (!cleaned) return 'Mobile number is required.';
    if (!/^[6-9]\d{9}$/.test(cleaned)) {
      return 'Please enter a valid 10-digit Indian mobile number starting with 6, 7, 8, or 9.';
    }
    return null;
  };

  const validateField = (name: keyof FormState, value: any): string | null => {
    switch (name) {
      case 'fullName':
        if (!value || typeof value !== 'string' || value.trim().length < 2) {
          return 'Full name is required (at least 2 characters).';
        }
        return null;
      case 'mobileNumber':
        return validateMobile(value);
      case 'service':
        if (!value) return 'Please select a treatment or service of interest.';
        return null;
      case 'preferredDate':
        if (!value) return 'Please choose a preferred appointment date.';
        if (value < todayString) return 'Appointment date cannot be in the past.';
        return null;
      case 'preferredTime':
        if (!value) return 'Please select your preferred time slot.';
        return null;
      case 'consent':
        if (!value) return 'Privacy consent is required to process your request.';
        return null;
      default:
        return null;
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    const val = type === 'checkbox' ? checked : value;

    setForm((prev) => ({ ...prev, [name]: val }));

    if (touched[name]) {
      const err = validateField(name as keyof FormState, val);
      setErrors((prev) => ({
        ...prev,
        [name]: err || '',
      }));
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    const val = type === 'checkbox' ? checked : value;

    setTouched((prev) => ({ ...prev, [name]: true }));
    const err = validateField(name as keyof FormState, val);
    setErrors((prev) => ({
      ...prev,
      [name]: err || '',
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    // Validate all fields
    const newErrors: Record<string, string> = {};
    const fieldsToValidate: (keyof FormState)[] = [
      'fullName',
      'mobileNumber',
      'service',
      'preferredDate',
      'preferredTime',
      'consent',
    ];

    fieldsToValidate.forEach((f) => {
      const err = validateField(f, form[f]);
      if (err) newErrors[f] = err;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setTouched(
        fieldsToValidate.reduce((acc, f) => ({ ...acc, [f]: true }), {})
      );
      // Focus on first invalid field
      const firstInvalid = document.getElementById(Object.keys(newErrors)[0]);
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    setIsSubmitting(true);

    try {
      // Connect to the configured backend service endpoint
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: form.fullName.trim(),
          mobileNumber: form.mobileNumber.trim(),
          service: form.service,
          preferredDate: form.preferredDate,
          preferredTime: form.preferredTime,
          notes: form.notes.trim(),
          consent: form.consent,
          botHoneypot: form.botHoneypot,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || 'The appointment service could not process your request.'
        );
      }

      // Success accepted by backend service
      setSubmitSuccess(true);
      setReferenceId(data.appointmentId || 'APT-' + Date.now().toString(36).toUpperCase());
    } catch (err: any) {
      console.error('Submission error:', err);
      // Honest error state handling as instructed in prompt
      setSubmitError(
        err.message ||
          'Unable to reach the appointment booking system. Please check your connection or contact the clinic directly.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setForm({
      fullName: '',
      mobileNumber: '',
      service: '',
      preferredDate: '',
      preferredTime: '',
      notes: '',
      consent: false,
      botHoneypot: '',
    });
    setErrors({});
    setTouched({});
    setSubmitSuccess(false);
    setSubmitError(null);
    setReferenceId(null);
  };

  return (
    <section id="appointment-section" className="w-full py-16 lg:py-24 bg-[#f4faff]">
      <div className="max-w-[1000px] mx-auto px-5 md:px-8 lg:px-12">
        <div className="p-8 md:p-12 rounded-3xl bg-[#e8f6ff] shadow-xl border border-[#13afa6]/20">
          {/* Header */}
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="inline-block px-3.5 py-1 rounded-full bg-white text-[#006a64] text-xs font-bold tracking-wider uppercase mb-3 border border-[#13afa6]/15 shadow-xs">
              BOOK A CONSULTATION
            </span>
            <h2 className="font-['Plus+Jakarta+Sans'] text-[28px] sm:text-[36px] font-bold text-[#101d24] tracking-tight mb-2">
              Let’s Plan Your Dental Visit.
            </h2>
            <p className="text-[15px] sm:text-[16px] text-[#536160]">
              Fill out your preferred details below. Our team in Randesan will get in touch directly to confirm your booking slot.
            </p>
          </div>

          {submitSuccess ? (
            /* Success State - Only rendered after server accepts the submission */
            <div
              role="alert"
              aria-live="polite"
              className="p-8 rounded-2xl bg-white shadow-md border border-[#13afa6]/30 flex flex-col items-center text-center space-y-4 animate-fade-in"
            >
              <div className="w-16 h-16 rounded-full bg-[#13afa6]/15 text-[#006a64] flex items-center justify-center">
                <span className="material-symbols-outlined text-[36px]">task_alt</span>
              </div>
              <div>
                <h3 className="font-['Plus+Jakarta+Sans'] text-[22px] font-bold text-[#101d24]">
                  Thank You! Request Received.
                </h3>
                {referenceId && (
                  <p className="text-xs font-mono text-[#006a64] font-semibold mt-1">
                    Enquiry Reference: {referenceId}
                  </p>
                )}
                <p className="text-[15px] text-[#3c4948] max-w-md mx-auto mt-2 leading-relaxed">
                  Your appointment request has been received. The clinic team will contact you to confirm availability.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#f4faff] border border-[#e2f0f9] text-xs text-[#536160] max-w-md w-full text-left space-y-1">
                <div>
                  <span className="font-semibold text-[#101d24]">Patient:</span> {form.fullName}
                </div>
                <div>
                  <span className="font-semibold text-[#101d24]">Contact:</span> +91 {form.mobileNumber}
                </div>
                <div>
                  <span className="font-semibold text-[#101d24]">Target Date:</span> {form.preferredDate} ({form.preferredTime})
                </div>
              </div>

              <button
                type="button"
                onClick={handleReset}
                className="mt-2 px-6 py-2.5 rounded-xl bg-[#e8f6ff] hover:bg-[#dceaf3] text-[#006a64] font-['Plus+Jakarta+Sans'] font-semibold text-sm transition-colors"
              >
                Submit Another Request
              </button>
            </div>
          ) : (
            /* Active Form */
            <form
              id="appointment-form"
              noValidate
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              {/* Anti-spam honeypot field (hidden from real users) */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor="botHoneypot">Do not fill this</label>
                <input
                  type="text"
                  id="botHoneypot"
                  name="botHoneypot"
                  value={form.botHoneypot}
                  onChange={handleChange}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              {/* Server error alert banner */}
              {submitError && (
                <div
                  role="alert"
                  className="p-4 rounded-xl bg-[#ffdad6] border border-[#ba1a1a]/30 text-[#93000a] text-sm flex items-start gap-3"
                >
                  <span className="material-symbols-outlined text-[20px] shrink-0 mt-0.5">
                    error
                  </span>
                  <div>
                    <span className="font-bold block">Submission Notice</span>
                    <span>{submitError}</span>
                  </div>
                </div>
              )}

              {/* Row 1: Name and Mobile */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Full Name */}
                <div>
                  <label
                    htmlFor="fullName"
                    className="block font-['Plus+Jakarta+Sans'] font-semibold text-sm text-[#101d24] mb-2"
                  >
                    Full Name <span className="text-[#a73732]">*</span>
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="e.g. Priyanshi Shah"
                    aria-required="true"
                    aria-invalid={!!errors.fullName}
                    aria-describedby={errors.fullName ? 'fullName-error' : undefined}
                    className={`w-full px-4 py-3 rounded-xl bg-white text-[#101d24] placeholder:text-[#6c7a78] text-[15px] shadow-sm transition-colors border ${
                      errors.fullName
                        ? 'border-[#ba1a1a] focus:ring-2 focus:ring-[#ba1a1a]'
                        : 'border-[#e2f0f9] focus:ring-2 focus:ring-[#13afa6]'
                    } focus:outline-none`}
                  />
                  {errors.fullName && (
                    <p id="fullName-error" className="mt-1 text-xs text-[#ba1a1a]">
                      {errors.fullName}
                    </p>
                  )}
                </div>

                {/* Mobile Number */}
                <div>
                  <label
                    htmlFor="mobileNumber"
                    className="block font-['Plus+Jakarta+Sans'] font-semibold text-sm text-[#101d24] mb-2"
                  >
                    Mobile Number <span className="text-[#a73732]">*</span>
                  </label>
                  <div
                    className={`flex rounded-xl bg-white shadow-sm overflow-hidden border ${
                      errors.mobileNumber
                        ? 'border-[#ba1a1a] focus-within:ring-2 focus-within:ring-[#ba1a1a]'
                        : 'border-[#e2f0f9] focus-within:ring-2 focus-within:ring-[#13afa6]'
                    }`}
                  >
                    <span className="inline-flex items-center px-4 bg-[#e2f0f9] text-[#3c4948] font-medium text-sm select-none">
                      +91
                    </span>
                    <input
                      type="tel"
                      id="mobileNumber"
                      name="mobileNumber"
                      value={form.mobileNumber}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      maxLength={14}
                      placeholder="98765 43210"
                      aria-required="true"
                      aria-invalid={!!errors.mobileNumber}
                      aria-describedby={errors.mobileNumber ? 'mobileNumber-error' : undefined}
                      className="w-full px-4 py-3 bg-transparent text-[#101d24] placeholder:text-[#6c7a78] text-[15px] focus:outline-none"
                    />
                  </div>
                  {errors.mobileNumber && (
                    <p id="mobileNumber-error" className="mt-1 text-xs text-[#ba1a1a]">
                      {errors.mobileNumber}
                    </p>
                  )}
                </div>
              </div>

              {/* Row 2: Service, Date, Time */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Service of Interest */}
                <div>
                  <label
                    htmlFor="service"
                    className="block font-['Plus+Jakarta+Sans'] font-semibold text-sm text-[#101d24] mb-2"
                  >
                    Treatment / Concern <span className="text-[#a73732]">*</span>
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={form.service}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-required="true"
                    aria-invalid={!!errors.service}
                    className={`w-full px-4 py-3 rounded-xl bg-white text-[#101d24] text-[15px] shadow-sm transition-colors border ${
                      errors.service
                        ? 'border-[#ba1a1a] focus:ring-2 focus:ring-[#ba1a1a]'
                        : 'border-[#e2f0f9] focus:ring-2 focus:ring-[#13afa6]'
                    } focus:outline-none`}
                  >
                    <option value="">Select a service</option>
                    <option value="checkup">Dental Check-up &amp; Hygiene</option>
                    <option value="whitening">Teeth Whitening</option>
                    <option value="bonding">Dental Bonding</option>
                    <option value="cosmetic">Cosmetic Dentistry</option>
                    <option value="implants">Dental Implants</option>
                    <option value="crowns">Crowns &amp; Restorations</option>
                    <option value="other">Other / General Consultation</option>
                  </select>
                  {errors.service && (
                    <p className="mt-1 text-xs text-[#ba1a1a]">{errors.service}</p>
                  )}
                </div>

                {/* Preferred Date */}
                <div>
                  <label
                    htmlFor="preferredDate"
                    className="block font-['Plus+Jakarta+Sans'] font-semibold text-sm text-[#101d24] mb-2"
                  >
                    Preferred Date <span className="text-[#a73732]">*</span>
                  </label>
                  <input
                    type="date"
                    id="preferredDate"
                    name="preferredDate"
                    min={todayString}
                    value={form.preferredDate}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-required="true"
                    aria-invalid={!!errors.preferredDate}
                    className={`w-full px-4 py-3 rounded-xl bg-white text-[#101d24] text-[15px] shadow-sm transition-colors border ${
                      errors.preferredDate
                        ? 'border-[#ba1a1a] focus:ring-2 focus:ring-[#ba1a1a]'
                        : 'border-[#e2f0f9] focus:ring-2 focus:ring-[#13afa6]'
                    } focus:outline-none`}
                  />
                  {errors.preferredDate && (
                    <p className="mt-1 text-xs text-[#ba1a1a]">{errors.preferredDate}</p>
                  )}
                </div>

                {/* Preferred Time Window */}
                <div>
                  <label
                    htmlFor="preferredTime"
                    className="block font-['Plus+Jakarta+Sans'] font-semibold text-sm text-[#101d24] mb-2"
                  >
                    Preferred Time <span className="text-[#a73732]">*</span>
                  </label>
                  <select
                    id="preferredTime"
                    name="preferredTime"
                    value={form.preferredTime}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-required="true"
                    aria-invalid={!!errors.preferredTime}
                    className={`w-full px-4 py-3 rounded-xl bg-white text-[#101d24] text-[15px] shadow-sm transition-colors border ${
                      errors.preferredTime
                        ? 'border-[#ba1a1a] focus:ring-2 focus:ring-[#ba1a1a]'
                        : 'border-[#e2f0f9] focus:ring-2 focus:ring-[#13afa6]'
                    } focus:outline-none`}
                  >
                    <option value="">Select time slot</option>
                    <option value="morning">Morning (11:00 AM – 1:00 PM)</option>
                    <option value="afternoon">Afternoon (2:00 PM – 5:00 PM)</option>
                    <option value="evening">Evening (5:00 PM – 8:00 PM)</option>
                  </select>
                  {errors.preferredTime && (
                    <p className="mt-1 text-xs text-[#ba1a1a]">{errors.preferredTime}</p>
                  )}
                </div>
              </div>

              {/* Message Notes */}
              <div>
                <label
                  htmlFor="notes"
                  className="block font-['Plus+Jakarta+Sans'] font-semibold text-sm text-[#101d24] mb-2"
                >
                  Additional Notes (Optional)
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  rows={3}
                  value={form.notes}
                  onChange={handleChange}
                  placeholder="Tell us about any specific dental symptoms, concerns, or previous treatments..."
                  className="w-full px-4 py-3 rounded-xl bg-white text-[#101d24] placeholder:text-[#6c7a78] text-[15px] shadow-sm border border-[#e2f0f9] focus:outline-none focus:ring-2 focus:ring-[#13afa6]"
                />
              </div>

              {/* Privacy Consent */}
              <div>
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="consent"
                    name="consent"
                    checked={form.consent}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-required="true"
                    className="mt-1 w-4 h-4 rounded text-[#13afa6] focus:ring-[#13afa6] border-[#bbc9c7] cursor-pointer"
                  />
                  <label
                    htmlFor="consent"
                    className="text-xs sm:text-sm text-[#536160] leading-snug cursor-pointer select-none"
                  >
                    I agree to be contacted by Dr. Komal's Dental Clinic regarding my appointment enquiry via call or WhatsApp.{' '}
                    <span className="text-[#a73732]">*</span>
                  </label>
                </div>
                {errors.consent && (
                  <p className="mt-1 text-xs text-[#ba1a1a] ml-7">{errors.consent}</p>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl bg-[#13afa6] hover:bg-[#006a64] disabled:bg-[#13afa6]/60 text-white font-['Plus+Jakarta+Sans'] font-bold text-[18px] transition-all shadow-lg shadow-[#13afa6]/25 flex items-center justify-center gap-2 transform hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#006a64]"
                >
                  {isSubmitting ? (
                    <>
                      <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                      <span>Submitting Enquiry...</span>
                    </>
                  ) : (
                    <>
                      <span>Request an Appointment</span>
                      <span className="material-symbols-outlined text-[22px]">calendar_add_on</span>
                    </>
                  )}
                </button>
              </div>

              <p className="text-center text-xs text-[#6c7a78]">
                Requests are reviewed by clinic staff. We will call or message to confirm your exact consultation timing.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
