/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { TreatmentGrid } from './components/TreatmentGrid';
import { SmileConfidenceSection } from './components/SmileConfidenceSection';
import { CosmeticCareSection } from './components/CosmeticCareSection';
import { PatientJourney } from './components/PatientJourney';
import { ClearCommunicationSection } from './components/ClearCommunicationSection';
import { ReviewsSection } from './components/ReviewsSection';
import { AppointmentForm } from './components/AppointmentForm';
import { LocationSection } from './components/LocationSection';
import { Footer } from './components/Footer';
import { PolicyModal, PolicyType } from './components/PolicyModal';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [selectedServiceForBooking, setSelectedServiceForBooking] = useState<string>('');
  const [policyModal, setPolicyModal] = useState<PolicyType>(null);

  // Track active section for navigation highlight
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        'home',
        'treatment-discovery',
        'philosophy',
        'cosmetic-care',
        'patient-journey',
        'appointment-section',
        'location-section',
      ];

      const scrollPos = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToAppointmentForm = (preselectedService?: string) => {
    if (preselectedService) {
      setSelectedServiceForBooking(preselectedService);
    }
    const formSection = document.getElementById('appointment-section');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTreatments = () => {
    const treatments = document.getElementById('treatment-discovery');
    if (treatments) {
      treatments.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#f4faff] font-sans text-[#101d24] flex flex-col selection:bg-[#13afa6]/20 selection:text-[#006a64]">
      {/* 1. Header & Navigation */}
      <Header
        activeSection={activeSection}
        onBookClick={() => scrollToAppointmentForm()}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full pt-20">
        {/* 2. Hero: "Feel Good About Your Smile." */}
        <HeroSection
          onRequestAppointment={() => scrollToAppointmentForm()}
          onExploreTreatments={scrollToTreatments}
        />

        {/* 3. Treatment discovery: "Care for Every Kind of Smile." */}
        <TreatmentGrid
          onSelectTreatmentForBooking={(serviceId) =>
            scrollToAppointmentForm(serviceId)
          }
        />

        {/* 4. Smile confidence section: "Small Steps. Healthier Smiles." */}
        <SmileConfidenceSection />

        {/* 5. Cosmetic dentistry feature: "Your Smile Should Feel Like You." */}
        <CosmeticCareSection
          onDiscussGoals={() => scrollToAppointmentForm('cosmetic')}
        />

        {/* 6. Patient journey: "Your Visit, Made Simple." */}
        <PatientJourney />

        {/* 7. Clear communication section: "Care That Starts With Listening." */}
        <ClearCommunicationSection />

        {/* 8. Reviews and trust: "Trusted by Families Across Gandhinagar." */}
        <ReviewsSection />

        {/* 9. Appointment form: "Let's Plan Your Dental Visit." */}
        <AppointmentForm
          selectedServiceId={selectedServiceForBooking}
          onClearSelectedService={() => setSelectedServiceForBooking('')}
        />

        {/* 10. Location and contact: "Find Us in Randesan." */}
        <LocationSection />
      </main>

      {/* 11. Footer */}
      <Footer
        onBookClick={() => scrollToAppointmentForm()}
        onOpenPolicy={(type) => setPolicyModal(type)}
      />

      {/* Legal & Medical Policy Modal */}
      <PolicyModal
        type={policyModal}
        onClose={() => setPolicyModal(null)}
        onBookClick={() => scrollToAppointmentForm()}
      />
    </div>
  );
}
