export const EVENT_CONFIG = {
  artist: "Dino Merlin",
  eventTitle: "Koševo 2026",
  fullTitle: "Dino Merlin — Koševo 2026",
  venue: "Stadion Koševo (Asim Ferhatović Hase)",
  city: "Sarajevo",
  country: "Bosnia and Herzegovina",
  date: "2026-07-31",
  displayDate: "31 July 2026",
  time: "20:30",
  gatesOpen: "18:00",
  currency: "KM",
  serviceFeePercent: 10,
  supportEmail: "support@kosevo2026.ba",
  organizer: "BH Concerts d.o.o.",
  website: "https://kosevo2026.ba",
};

export interface Sector {
  id: string;
  name: string;
  price: number;
  description: string;
  badge?: string;
  available: boolean;
  maxPerOrder: number;
  paddlePriceId?: string;
  soldCount?: number;
  capacity?: number;
}

export const SECTORS: Sector[] = [
  {
    id: "fan-pit",
    name: "Fan Pit",
    price: 75,
    description: "Closest to the stage. Standing zone with unmatched energy and direct artist proximity.",
    badge: "Premium",
    available: true,
    maxPerOrder: 6,
  },
  {
    id: "istok",
    name: "Istok",
    price: 55,
    description: "East tribune seating with excellent panoramic stage views and elevated comfort.",
    available: true,
    maxPerOrder: 8,
  },
  {
    id: "zapad",
    name: "Zapad",
    price: 55,
    description: "West tribune seating with prime sightlines and premium atmosphere.",
    badge: "Popular",
    available: true,
    maxPerOrder: 8,
  },
  {
    id: "parter-2",
    name: "Parter 2",
    price: 45,
    description: "Central floor standing area behind Fan Pit. Great views, vibrant crowd energy.",
    available: true,
    maxPerOrder: 10,
  },
  {
    id: "parter-1",
    name: "Parter 1",
    price: 35,
    description: "Floor standing with full stage visibility. Ideal balance of value and experience.",
    badge: "Best Value",
    available: true,
    maxPerOrder: 10,
  },
];

export const DEMAND_INDICATORS = {
  viewingNow: 1247,
  soldToday: 834,
  totalCapacity: 35000,
  soldPercentage: 72,
};

export const FAQ_ITEMS = [
  {
    question: "How will I receive my ticket?",
    answer: "All tickets are delivered digitally as e-tickets. You'll receive a confirmation email with a QR code immediately after purchase. You can also access your ticket through our mobile-friendly platform at any time.",
  },
  {
    question: "Can I buy multiple tickets?",
    answer: "Yes, you can purchase multiple tickets in a single transaction. The maximum number varies by sector — typically up to 6–10 tickets per order, depending on availability.",
  },
  {
    question: "Are tickets refundable?",
    answer: "Tickets are non-refundable except in cases where the event is officially cancelled. If the event is postponed, your tickets remain valid for the rescheduled date. Please review our full refund policy for details.",
  },
  {
    question: "What happens if the event is postponed?",
    answer: "In the event of a postponement, all tickets will be automatically valid for the new date. You will receive an email notification with updated event details. If you cannot attend the rescheduled date, refund options may be available.",
  },
  {
    question: "Can I enter with a mobile ticket?",
    answer: "Absolutely. Your digital ticket includes a QR code that can be scanned directly from your smartphone screen. We recommend saving a screenshot or downloading the PDF as a backup.",
  },
  {
    question: "Are there age restrictions?",
    answer: "There are no strict age restrictions, however children under 14 must be accompanied by an adult. All attendees, regardless of age, require a valid ticket for entry.",
  },
];

export const TRUST_FEATURES = [
  {
    icon: "Shield",
    title: "Secure Checkout",
    description: "256-bit SSL encrypted payment processing",
  },
  {
    icon: "Mail",
    title: "Instant Confirmation",
    description: "E-ticket delivered to your inbox immediately",
  },
  {
    icon: "QrCode",
    title: "QR Code Entry",
    description: "Scan directly from your phone at the gate",
  },
  {
    icon: "Smartphone",
    title: "Mobile Tickets",
    description: "Access your tickets anywhere, anytime",
  },
  {
    icon: "Headphones",
    title: "Support Center",
    description: "Dedicated customer support before and during the event",
  },
  {
    icon: "RotateCcw",
    title: "Cancellation Policy",
    description: "Full refund if event is officially cancelled",
  },
];
