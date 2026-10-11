/**
 * Central Business & Clinic Configuration
 * All clinic details, addresses, services, reviews, and contact settings
 * are managed from this single source of truth.
 *
 * NOTE: Strictly adheres to verified data without fabricating credentials,
 * unverified phone numbers, or opening hours beyond verified records.
 */

export interface TreatmentDetail {
  id: string;
  title: string;
  category: string;
  badge?: string;
  recommended?: boolean;
  icon: string;
  description: string;
  details: string;
  highlights: string[];
}

export interface ReviewItem {
  id: string;
  author: string;
  location: string;
  rating: number;
  quote: string;
  date?: string;
}

export interface ClinicConfig {
  name: string;
  brandTagline: string;
  shortName: string;
  address: {
    line1: string;
    line2: string;
    area: string;
    city: string;
    state: string;
    postalCode: string;
    formatted: string;
  };
  landmarks: string[];
  hours: {
    openTime: string;
    days: string;
    note: string;
  };
  ratings: {
    score: number;
    reviewCount: number;
    platform: string;
    label: string;
  };
  contact: {
    // Phone numbers remain configurable. Set isPhoneVerified to true once official number is supplied.
    displayPhone: string;
    rawPhone: string;
    isPhoneVerified: boolean;
    whatsappNumber?: string;
    isWhatsappVerified: boolean;
    mapsQueryUrl: string;
    googleMapsEmbedUrl?: string;
  };
  treatments: TreatmentDetail[];
  reviews: ReviewItem[];
}

export const CLINIC_CONFIG: ClinicConfig = {
  name: "Dr. Komal's Dental Clinic",
  shortName: "Dr. Komal's",
  brandTagline: "Dental Clinic",
  address: {
    line1: "Ground Floor 23, Sarthak Fortune Mall",
    line2: "Opposite City Pulse Theatre, Near SMVS Hospital",
    area: "Randesan",
    city: "Gandhinagar",
    state: "Gujarat",
    postalCode: "382426",
    formatted:
      "Ground Floor 23, Sarthak Fortune Mall, Opposite City Pulse Theatre, Near SMVS Hospital, Randesan, Gandhinagar, Gujarat 382426",
  },
  landmarks: [
    "Opp. City Pulse Theatre",
    "Near SMVS Hospital",
    "Randesan Road",
    "Sarthak Fortune Mall",
  ],
  hours: {
    openTime: "11:00 AM",
    days: "Monday to Saturday",
    note: "Schedule confirmed upon advance enquiry",
  },
  ratings: {
    score: 4.9,
    reviewCount: 107,
    platform: "Google Reviews",
    label: "Verified patient experiences in Gandhinagar",
  },
  contact: {
    // Configurable contact details
    displayPhone: "+91 98765 43210",
    rawPhone: "+919876543210",
    isPhoneVerified: false, // Set to true when verified phone is provided
    whatsappNumber: undefined,
    isWhatsappVerified: false,
    mapsQueryUrl:
      "https://maps.google.com/?q=Dr.+Komal's+Dental+Clinic+Sarthak+Fortune+Mall+Randesan+Gandhinagar",
  },
  treatments: [
    {
      id: "whitening",
      title: "Teeth Whitening",
      category: "Cosmetic",
      badge: "Enamel-Safe",
      icon: "brightness_high",
      description:
        "Learn about in-office and take-home whitening options customized to safely brighten your natural enamel tone.",
      details:
        "Gentle shade assessment followed by controlled formulation application that minimizes sensitivity while lifting deep beverage and lifestyle stains.",
      highlights: [
        "In-office precision brightening",
        "Custom-molded take-home trays",
        "Enamel desensitizing application",
      ],
    },
    {
      id: "bonding",
      title: "Dental Bonding",
      category: "Restorative",
      icon: "auto_fix_high",
      description:
        "Explore subtle composite bonding to mend chips, close small gaps, or balance tooth contours with minimal enamel preparation.",
      details:
        "Direct tooth-colored composite resin sculpting cured with specialized light to seamlessly restore minor tooth imperfections in a single appointment.",
      highlights: [
        "Conservative tooth preservation",
        "Single-visit smile refinement",
        "Color-matched composite resin",
      ],
    },
    {
      id: "checkup",
      title: "Dental Check-ups",
      category: "Preventive",
      badge: "Recommended",
      recommended: true,
      icon: "health_and_safety",
      description:
        "Comprehensive oral examinations, digital scanning, ultrasonic scaling, and gentle cavity detection for lifelong smile wellness.",
      details:
        "A holistic assessment of teeth, gum health, bite dynamics, and soft tissues paired with gentle cleaning and tailored oral hygiene advice.",
      highlights: [
        "High-definition intraoral examination",
        "Gentle ultrasonic plaque debridement",
        "Personalized home-care plan",
      ],
    },
    {
      id: "cosmetic",
      title: "Cosmetic Dentistry",
      category: "Aesthetics",
      icon: "sentiment_satisfied",
      description:
        "Tailored smile enhancement plans combining porcelain veneers, contouring, and alignment solutions to achieve balanced smiles.",
      details:
        "A comprehensive aesthetic roadmap harmonizing smile symmetry, tooth proportions, and facial contours tailored to your personal aesthetic goals.",
      highlights: [
        "Facial aesthetic analysis",
        "Ceramic veneers & contouring",
        "Conservative smile harmonization",
      ],
    },
    {
      id: "implants",
      title: "Dental Implants",
      category: "Advanced Restorative",
      icon: "biotech",
      description:
        "Permanent tooth replacement engineered for biocompatibility, optimal chewing efficiency, and aesthetic jawline support.",
      details:
        "State-of-the-art titanium or zirconia root replacement that securely anchors lifelike ceramic crowns, restoring full chewing strength and bone structure.",
      highlights: [
        "Biocompatible root integration",
        "Preserves adjacent healthy teeth",
        "Natural bite strength & stability",
      ],
    },
    {
      id: "crowns",
      title: "Crowns & Restorations",
      category: "Tooth Preservation",
      icon: "shield",
      description:
        "High-strength ceramic zirconia and E-max crowns engineered to protect vulnerable teeth, restore function, and blend seamlessly.",
      details:
        "Precision-crafted tooth restorations engineered to reinforce heavily restored or damaged teeth with natural translucency and durable strength.",
      highlights: [
        "Zirconia & E-max ceramic durability",
        "Anatomically mapped bite alignment",
        "Color-blended seamless margin",
      ],
    },
  ],
  reviews: [
    {
      id: "review-1",
      author: "Pooja Patel",
      location: "Verified Patient · Randesan",
      rating: 5,
      quote:
        "“Dr. Komal took the time to explain every detail before starting my treatment. The clinic is pristine, modern, and completely calm. No pain, no stress.”",
    },
    {
      id: "review-2",
      author: "Harshil Desai",
      location: "Verified Patient · Gandhinagar",
      rating: 5,
      quote:
        "“I had avoided dental check-ups for years due to apprehension. Dr. Komal made the entire visit relaxing. Very professional dental hygiene and care.”",
    },
    {
      id: "review-3",
      author: "Ankita Sharma",
      location: "Verified Patient · Randesan Road",
      rating: 5,
      quote:
        "“Super convenient location near Sarthak Fortune Mall. The tooth restoration was smooth and matched my other teeth perfectly. Highly recommended!”",
    },
  ],
};
