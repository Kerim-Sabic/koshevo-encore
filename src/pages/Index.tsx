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
import Confirmation from "@/components/Confirmation";
import MobileBottomBar from "@/components/MobileBottomBar";
import { type Sector } from "@/config/event";

interface OrderData {
  orderNumber: string;
  buyerName: string;
  email: string;
  sector: string;
  quantity: number;
  total: number;
}

const Index = () => {
  const [checkout, setCheckout] = useState<{ sector: Sector; quantity: number } | null>(null);
  const [order, setOrder] = useState<OrderData | null>(null);

  return (
    <div className="min-h-screen bg-background">
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
        {checkout && !order && (
          <Checkout
            sector={checkout.sector}
            quantity={checkout.quantity}
            onClose={() => setCheckout(null)}
            onComplete={(o) => { setOrder(o); setCheckout(null); }}
          />
        )}
        {order && (
          <Confirmation order={order} onClose={() => setOrder(null)} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
