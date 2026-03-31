import { motion } from "framer-motion";
import { Ticket, MapPin, Shield, Smartphone, Zap, Mail } from "lucide-react";
import { EVENT_CONFIG } from "@/config/event";
import CountdownTimer from "./CountdownTimer";
import ShareEvent from "./ShareEvent";
import heroBg from "@/assets/hero-bg.jpg";
import heroBg from "@/assets/hero-bg.jpg";

const Hero = () => {
  const scrollToSectors = () => {
    document.getElementById("sectors")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={heroBg} alt="Concert stadium atmosphere" className="w-full h-full object-cover" width={1920} height={1080} />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-background/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 pt-20 pb-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto"
        >
          <p className="text-primary/80 uppercase tracking-[0.3em] text-xs sm:text-sm font-body mb-6">
            The Event of the Year
          </p>

          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-display font-bold text-foreground mb-4 leading-[0.9]">
            {EVENT_CONFIG.artist}
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground font-body font-light mb-2">
            <span className="text-gradient-gold font-medium">Koševo, Sarajevo</span>
            <span className="mx-3 text-primary/40">•</span>
            {EVENT_CONFIG.displayDate}
            <span className="mx-3 text-primary/40">•</span>
            {EVENT_CONFIG.time}
          </p>

          <p className="text-muted-foreground/70 text-sm max-w-xl mx-auto mb-10 font-body">
            A once-in-a-generation concert experience at the legendary Stadion Koševo. 
            35,000 voices under the Sarajevo sky.
          </p>

          {/* Countdown */}
          <div className="flex justify-center mb-10">
            <CountdownTimer />
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={scrollToSectors}
              className="px-8 py-4 rounded-lg font-body font-semibold text-sm uppercase tracking-wider bg-primary text-primary-foreground glow-gold transition-all"
            >
              <Ticket className="inline-block w-4 h-4 mr-2 -mt-0.5" />
              Buy Tickets
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={scrollToSectors}
              className="px-8 py-4 rounded-lg font-body font-semibold text-sm uppercase tracking-wider border border-gold text-primary bg-transparent hover:bg-primary/5 transition-all"
            >
              <MapPin className="inline-block w-4 h-4 mr-2 -mt-0.5" />
              View Sectors
            </motion.button>
            <ShareEvent />
          </div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="glass-panel rounded-2xl p-4 sm:p-5 max-w-2xl mx-auto"
          >
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { icon: Shield, label: "Secure Checkout" },
                { icon: Zap, label: "Instant E-Ticket" },
                { icon: Mail, label: "Official Event" },
                { icon: Smartphone, label: "Mobile Friendly" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 justify-center">
                  <Icon className="w-4 h-4 text-primary shrink-0" />
                  <span className="text-xs text-muted-foreground font-body">{label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
