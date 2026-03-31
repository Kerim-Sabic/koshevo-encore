import { motion } from "framer-motion";
import { Music, Landmark, Users, Sparkles } from "lucide-react";

const features = [
  { icon: Music, title: "Legendary Artist", text: "One of the greatest performers in the Balkans returns to his hometown stage." },
  { icon: Landmark, title: "Iconic Venue", text: "Stadion Koševo — the historic heart of Sarajevo sport and culture, reimagined for an unforgettable night." },
  { icon: Users, title: "35,000 Voices", text: "Join tens of thousands in a massive open-air celebration under the summer sky." },
  { icon: Sparkles, title: "World-Class Production", text: "State-of-the-art sound, lighting, and staging crafted for a cinematic live experience." },
];

const ConcertExperience = () => (
  <section className="py-20 sm:py-28">
    <div className="container mx-auto px-4">
      <div className="text-center mb-14">
        <p className="text-primary/70 uppercase tracking-[0.25em] text-xs font-body mb-3">The Experience</p>
        <h2 className="text-3xl sm:text-5xl font-display font-bold text-foreground mb-4 max-w-2xl mx-auto leading-tight">
          More Than a Concert.<br />
          <span className="text-gradient-gold">A Night to Remember.</span>
        </h2>
      </div>

      <div className="grid sm:grid-cols-2 gap-5 max-w-3xl mx-auto">
        {features.map(({ icon: Icon, title, text }, i) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="glass-panel rounded-xl p-6 hover:glow-gold-sm transition-shadow"
          >
            <Icon className="w-6 h-6 text-primary mb-3" />
            <h3 className="font-display font-semibold text-foreground text-lg mb-2">{title}</h3>
            <p className="text-sm text-muted-foreground font-body leading-relaxed">{text}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ConcertExperience;
