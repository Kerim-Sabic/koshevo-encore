import { motion } from "framer-motion";
import { Eye, TrendingUp, AlertTriangle } from "lucide-react";
import { DEMAND_INDICATORS } from "@/config/event";

const UrgencySection = () => (
  <section className="py-16 border-y border-gold">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center mb-10"
      >
        <p className="text-primary uppercase tracking-[0.25em] text-xs font-body mb-2">Extraordinary demand</p>
        <h2 className="text-2xl sm:text-3xl font-display font-bold text-foreground">Koševo 2026 Is Selling Fast</h2>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-3xl mx-auto">
        {[
          {
            icon: Eye,
            value: DEMAND_INDICATORS.viewingNow.toLocaleString(),
            label: "People viewing now",
          },
          {
            icon: TrendingUp,
            value: DEMAND_INDICATORS.soldToday.toLocaleString(),
            label: "Tickets sold today",
          },
          {
            icon: AlertTriangle,
            value: `${DEMAND_INDICATORS.soldPercentage}%`,
            label: "Capacity filled",
          },
        ].map(({ icon: Icon, value, label }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="glass-panel rounded-xl p-5 text-center"
          >
            <Icon className="w-5 h-5 text-primary mx-auto mb-3" />
            <p className="text-3xl font-display font-bold text-gradient-gold mb-1">{value}</p>
            <p className="text-xs text-muted-foreground font-body uppercase tracking-wider">{label}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default UrgencySection;
