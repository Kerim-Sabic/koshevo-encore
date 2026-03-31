import { motion } from "framer-motion";
import { Shield, Mail, QrCode, Smartphone, Headphones, RotateCcw } from "lucide-react";
import { TRUST_FEATURES } from "@/config/event";

const iconMap: Record<string, typeof Shield> = { Shield, Mail, QrCode, Smartphone, Headphones, RotateCcw };

const TrustSection = () => (
  <section className="py-20 sm:py-28 bg-secondary/30">
    <div className="container mx-auto px-4">
      <div className="text-center mb-14">
        <p className="text-primary/70 uppercase tracking-[0.25em] text-xs font-body mb-3">Your Confidence, Guaranteed</p>
        <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground">Why Buy With Us</h2>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-4xl mx-auto">
        {TRUST_FEATURES.map(({ icon, title, description }, i) => {
          const Icon = iconMap[icon] || Shield;
          return (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="glass-panel rounded-xl p-5 text-center"
            >
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-display font-semibold text-foreground mb-1.5">{title}</h3>
              <p className="text-xs text-muted-foreground font-body">{description}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
);

export default TrustSection;
