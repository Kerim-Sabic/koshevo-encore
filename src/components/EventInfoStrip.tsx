import { Calendar, Clock, MapPin, Tag, Smartphone } from "lucide-react";
import { EVENT_CONFIG } from "@/config/event";

const items = [
  { icon: Calendar, label: "Date", value: EVENT_CONFIG.displayDate },
  { icon: Clock, label: "Time", value: EVENT_CONFIG.time },
  { icon: MapPin, label: "Venue", value: "Stadion Koševo, Sarajevo" },
  { icon: Tag, label: "Status", value: "On Sale" },
  { icon: Smartphone, label: "Delivery", value: "Digital E-Ticket" },
];

const EventInfoStrip = () => (
  <section className="border-y border-gold py-5 bg-secondary/50">
    <div className="container mx-auto px-4">
      <div className="flex flex-wrap justify-center gap-x-8 gap-y-3">
        {items.map(({ icon: Icon, label, value }) => (
          <div key={label} className="flex items-center gap-2.5">
            <Icon className="w-4 h-4 text-primary shrink-0" />
            <div className="font-body">
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</span>
              <p className="text-sm text-foreground font-medium -mt-0.5">{value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default EventInfoStrip;
