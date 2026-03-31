import { Ticket } from "lucide-react";

const MobileBottomBar = () => {
  const scrollToSectors = () => {
    document.getElementById("sectors")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 p-3 glass-panel-strong border-t border-gold sm:hidden">
      <button
        onClick={scrollToSectors}
        className="w-full py-3.5 rounded-lg bg-primary text-primary-foreground font-body font-semibold text-sm uppercase tracking-wider flex items-center justify-center gap-2 glow-gold"
      >
        <Ticket className="w-4 h-4" />
        Buy Tickets
      </button>
    </div>
  );
};

export default MobileBottomBar;
