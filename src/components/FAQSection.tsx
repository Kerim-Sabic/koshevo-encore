import { motion } from "framer-motion";
import { FAQ_ITEMS } from "@/config/event";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQSection = () => (
  <section id="faq" className="py-20 sm:py-28">
    <div className="container mx-auto px-4 max-w-2xl">
      <div className="text-center mb-12">
        <p className="text-primary/70 uppercase tracking-[0.25em] text-xs font-body mb-3">Need Help?</p>
        <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground">Frequently Asked Questions</h2>
      </div>

      <Accordion type="single" collapsible className="space-y-3">
        {FAQ_ITEMS.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
          >
            <AccordionItem value={`faq-${i}`} className="glass-panel rounded-xl border-gold px-5 overflow-hidden">
              <AccordionTrigger className="text-foreground font-body font-medium text-sm hover:no-underline py-4">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground font-body text-sm leading-relaxed pb-4">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          </motion.div>
        ))}
      </Accordion>
    </div>
  </section>
);

export default FAQSection;
