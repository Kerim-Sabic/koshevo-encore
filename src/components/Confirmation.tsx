import { motion } from "framer-motion";
import { Check, Download, Calendar, Mail, Smartphone, QrCode } from "lucide-react";
import { EVENT_CONFIG } from "@/config/event";

interface ConfirmationProps {
  order: {
    orderNumber: string;
    buyerName: string;
    email: string;
    sector: string;
    quantity: number;
    total: number;
  };
  onClose: () => void;
}

const Confirmation = ({ order, onClose }: ConfirmationProps) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="fixed inset-0 z-50 bg-background overflow-y-auto"
  >
    <div className="container mx-auto px-4 py-12 max-w-lg text-center">
      {/* Success icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", delay: 0.2 }}
        className="w-20 h-20 rounded-full bg-primary/15 flex items-center justify-center mx-auto mb-6 glow-gold"
      >
        <Check className="w-10 h-10 text-primary" />
      </motion.div>

      <h1 className="text-3xl font-display font-bold text-foreground mb-2">Purchase Confirmed!</h1>
      <p className="text-muted-foreground font-body text-sm mb-8">
        Your tickets for {EVENT_CONFIG.fullTitle} have been secured.
      </p>

      {/* Order details */}
      <div className="glass-panel-strong rounded-xl p-6 text-left mb-6 space-y-3">
        <div className="flex justify-between text-sm font-body">
          <span className="text-muted-foreground">Order</span>
          <span className="text-foreground font-mono">{order.orderNumber}</span>
        </div>
        <div className="flex justify-between text-sm font-body">
          <span className="text-muted-foreground">Name</span>
          <span className="text-foreground">{order.buyerName}</span>
        </div>
        <div className="flex justify-between text-sm font-body">
          <span className="text-muted-foreground">Email</span>
          <span className="text-foreground">{order.email}</span>
        </div>
        <div className="flex justify-between text-sm font-body">
          <span className="text-muted-foreground">Event</span>
          <span className="text-foreground">{EVENT_CONFIG.displayDate} • {EVENT_CONFIG.time}</span>
        </div>
        <div className="flex justify-between text-sm font-body">
          <span className="text-muted-foreground">Sector</span>
          <span className="text-foreground">{order.sector}</span>
        </div>
        <div className="flex justify-between text-sm font-body">
          <span className="text-muted-foreground">Tickets</span>
          <span className="text-foreground">{order.quantity}</span>
        </div>
        <div className="h-px bg-border" />
        <div className="flex justify-between font-display font-bold">
          <span className="text-foreground">Total Paid</span>
          <span className="text-gradient-gold text-lg">{order.total} {EVENT_CONFIG.currency}</span>
        </div>
      </div>

      {/* QR Code placeholder */}
      <div className="glass-panel rounded-xl p-6 mb-6">
        <QrCode className="w-32 h-32 text-primary/30 mx-auto mb-3" />
        <p className="text-xs text-muted-foreground font-body">Your QR ticket code</p>
      </div>

      {/* Action buttons */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <button className="flex items-center justify-center gap-2 py-3 rounded-lg bg-primary text-primary-foreground font-body text-sm font-semibold hover:opacity-90 transition-all">
          <Download className="w-4 h-4" /> PDF Ticket
        </button>
        <button className="flex items-center justify-center gap-2 py-3 rounded-lg bg-secondary text-secondary-foreground font-body text-sm font-semibold hover:bg-secondary/80 transition-all">
          <Smartphone className="w-4 h-4" /> Add to Wallet
        </button>
      </div>
      <div className="grid grid-cols-2 gap-3 mb-8">
        <button className="flex items-center justify-center gap-2 py-3 rounded-lg bg-secondary text-secondary-foreground font-body text-sm font-semibold hover:bg-secondary/80 transition-all">
          <Calendar className="w-4 h-4" /> Add to Calendar
        </button>
        <button className="flex items-center justify-center gap-2 py-3 rounded-lg bg-secondary text-secondary-foreground font-body text-sm font-semibold hover:bg-secondary/80 transition-all">
          <Mail className="w-4 h-4" /> Resend Email
        </button>
      </div>

      <button onClick={onClose} className="text-sm text-muted-foreground font-body hover:text-primary transition-colors">
        Return to Event Page
      </button>
    </div>
  </motion.div>
);

export default Confirmation;
