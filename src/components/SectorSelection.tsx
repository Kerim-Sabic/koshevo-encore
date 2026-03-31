import { useState } from "react";
import { motion } from "framer-motion";
import { Minus, Plus, Ticket, Star, TrendingUp, Award, Loader2 } from "lucide-react";
import { EVENT_CONFIG, type Sector } from "@/config/event";
import { useSectors } from "@/hooks/useSectors";
import stadiumMap from "@/assets/stadium-map.jpg";

interface SectorSelectionProps {
  onProceed: (sector: Sector, quantity: number) => void;
}

const badgeIcons: Record<string, typeof Star> = {
  "Premium": Star,
  "Popular": TrendingUp,
  "Best Value": Award,
};

const SectorSelection = ({ onProceed }: SectorSelectionProps) => {
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const { data: sectors = [], isLoading } = useSectors();

  const setQty = (id: string, max: number, delta: number) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(0, Math.min(max, (prev[id] || 0) + delta)),
    }));
  };

  return (
    <section id="sectors" className="py-20 sm:py-28">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <p className="text-primary/70 uppercase tracking-[0.25em] text-xs font-body mb-3">Select Your Experience</p>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-foreground mb-4">Choose Your Sector</h2>
          <p className="text-muted-foreground max-w-lg mx-auto font-body text-sm">
            Stadion Koševo awaits. Select your sector and secure your place for the event of the year.
          </p>
        </div>

        {/* Stadium map */}
        <div className="max-w-md mx-auto mb-14 rounded-2xl overflow-hidden glow-gold-sm">
          <img src={stadiumMap} alt="Koševo stadium sector map" loading="lazy" width={800} height={800} className="w-full" />
        </div>

        {/* Sector cards */}
        {isLoading && (
          <div className="flex justify-center py-12"><Loader2 className="w-6 h-6 text-primary animate-spin" /></div>
        )}
        <div className="grid gap-4 sm:gap-5 max-w-3xl mx-auto">
          {sectors.map((sector, i) => {
            const qty = quantities[sector.id] || 0;
            const BadgeIcon = sector.badge ? badgeIcons[sector.badge] : null;
            return (
              <motion.div
                key={sector.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className={`glass-panel rounded-xl p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-4 transition-all hover:glow-gold-sm ${
                  sector.badge === "Premium" ? "border-gold-strong" : ""
                }`}
              >
                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-display font-semibold text-foreground">{sector.name}</h3>
                    {sector.badge && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] uppercase tracking-wider font-body font-semibold bg-primary/15 text-primary">
                        {BadgeIcon && <BadgeIcon className="w-3 h-3" />}
                        {sector.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground font-body leading-relaxed">{sector.description}</p>
                </div>

                {/* Price + controls */}
                <div className="flex items-center gap-5 sm:gap-6 shrink-0">
                  <div className="text-right">
                    <p className="text-2xl font-display font-bold text-gradient-gold">{sector.price}</p>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{EVENT_CONFIG.currency}</p>
                  </div>

                  {/* Quantity */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setQty(sector.id, sector.maxPerOrder, -1)}
                      className="w-8 h-8 rounded-md bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-8 text-center font-body font-semibold text-foreground">{qty}</span>
                    <button
                      onClick={() => setQty(sector.id, sector.maxPerOrder, 1)}
                      className="w-8 h-8 rounded-md bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <button
                    onClick={() => qty > 0 && onProceed(sector, qty)}
                    disabled={qty === 0}
                    className="px-4 py-2.5 rounded-lg text-xs font-body font-semibold uppercase tracking-wider bg-primary text-primary-foreground disabled:opacity-30 disabled:cursor-not-allowed hover:opacity-90 transition-all"
                  >
                    <Ticket className="inline w-3.5 h-3.5 mr-1.5 -mt-0.5" />
                    Select
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SectorSelection;
