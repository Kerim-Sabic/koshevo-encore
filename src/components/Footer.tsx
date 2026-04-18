import { EVENT_CONFIG } from "@/config/event";
import { Instagram, Facebook, Twitter, Youtube } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-gold bg-secondary/20 pt-14 pb-8">
    <div className="container mx-auto px-4">
      <div className="grid sm:grid-cols-3 gap-10 mb-12">
        {/* Brand */}
        <div>
          <h3 className="font-display text-xl font-bold text-gradient-gold mb-2">{EVENT_CONFIG.fullTitle}</h3>
          <p className="text-xs text-muted-foreground font-body leading-relaxed">
            {EVENT_CONFIG.venue}<br />
            {EVENT_CONFIG.city}, {EVENT_CONFIG.country}<br />
            {EVENT_CONFIG.displayDate} • {EVENT_CONFIG.time}
          </p>
        </div>

        {/* Links */}
        <div className="font-body text-sm">
          <h4 className="font-semibold text-foreground mb-3">Information</h4>
          <ul className="space-y-2 text-muted-foreground text-xs">
            <li><a href="#sectors" className="hover:text-primary transition-colors">Tickets</a></li>
            <li><a href="#faq" className="hover:text-primary transition-colors">FAQ</a></li>
            <li><a href="/privacy" className="hover:text-primary transition-colors">Privacy Notice</a></li>
            <li><a href="/terms" className="hover:text-primary transition-colors">Terms & Conditions</a></li>
            <li><a href="/refunds" className="hover:text-primary transition-colors">Refund Policy</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div className="font-body text-sm">
          <h4 className="font-semibold text-foreground mb-3">Support</h4>
          <p className="text-xs text-muted-foreground mb-3">
            {EVENT_CONFIG.supportEmail}
          </p>
          <p className="text-xs text-muted-foreground mb-4">
            Organized by {EVENT_CONFIG.organizer}
          </p>
          <div className="flex gap-3">
            {[Instagram, Facebook, Twitter, Youtube].map((Icon, i) => (
              <a key={i} href="#" className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary transition-colors" aria-label="Social link">
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-border pt-6 text-center">
        <p className="text-[10px] text-muted-foreground font-body uppercase tracking-wider">
          © {new Date().getFullYear()} {EVENT_CONFIG.organizer}. All rights reserved. Official ticket platform for {EVENT_CONFIG.fullTitle}.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
