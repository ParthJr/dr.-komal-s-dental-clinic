import React from 'react';
import { CLINIC_CONFIG } from '../config/clinic';

export const ReviewsSection: React.FC = () => {
  return (
    <section className="w-full py-16 lg:py-24 bg-[#e8f6ff]">
      <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center mb-12">
          <div className="lg:col-span-8">
            <span className="inline-block px-3.5 py-1 rounded-full bg-white text-[#006a64] text-xs font-bold tracking-wider uppercase mb-3 border border-[#13afa6]/15 shadow-xs">
              PATIENT VOICES
            </span>
            <h2 className="font-['Plus+Jakarta+Sans'] text-[30px] sm:text-[38px] lg:text-[42px] font-bold text-[#101d24] tracking-tight">
              Trusted by Families Across Gandhinagar.
            </h2>
          </div>
          <div className="lg:col-span-4 flex lg:justify-end">
            <a
              href={CLINIC_CONFIG.contact.mapsQueryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-[#101d24] font-['Plus+Jakarta+Sans'] font-semibold text-sm shadow-sm hover:shadow border border-[#e2f0f9] transition-all transform hover:-translate-y-0.5"
            >
              <span
                className="material-symbols-outlined text-[#fe776d] text-[20px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                star
              </span>
              <span>Read Google Reviews</span>
              <span className="text-xs text-[#6c7a78]">({CLINIC_CONFIG.ratings.score}/5)</span>
            </a>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CLINIC_CONFIG.reviews.map((review) => (
            <div
              key={review.id}
              className="p-8 rounded-3xl bg-white shadow-sm border border-[#e2f0f9] flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div>
                <div className="flex text-[#fe776d] mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <span
                      key={i}
                      className="material-symbols-outlined text-[20px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                  ))}
                </div>
                <p className="text-[15px] text-[#536160] mb-6 italic leading-relaxed">
                  {review.quote}
                </p>
              </div>
              <div className="pt-4 border-t border-[#e2f0f9]">
                <h4 className="font-['Plus+Jakarta+Sans'] text-[16px] font-bold text-[#101d24]">
                  {review.author}
                </h4>
                <p className="text-xs text-[#6c7a78] mt-0.5">{review.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
