import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Hero from "@/components/Hero";
import EventInfoStrip from "@/components/EventInfoStrip";
import SectorSelection from "@/components/SectorSelection";
import UrgencySection from "@/components/UrgencySection";
import ConcertExperience from "@/components/ConcertExperience";
import TrustSection from "@/components/TrustSection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
import Checkout from "@/components/Checkout";
import MobileBottomBar from "@/components/MobileBottomBar";
import { PaymentTestModeBanner } from "@/components/PaymentTestModeBanner";
import { type Sector } from "@/config/event";

const Index = () => {
  const [checkout, setCheckout] = useState<{ sector: Sector; quantity: number } | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <PaymentTestModeBanner />
      <Hero />
      <EventInfoStrip />
      <SectorSelection onProceed={(sector, quantity) => setCheckout({ sector, quantity })} />
      <UrgencySection />
      <ConcertExperience />
      <TrustSection />
      <FAQSection />
      <Footer />
      <MobileBottomBar />

      <AnimatePresence>
        {checkout && (
          <Checkout
            sector={checkout.sector}
            quantity={checkout.quantity}
            onClose={() => setCheckout(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
