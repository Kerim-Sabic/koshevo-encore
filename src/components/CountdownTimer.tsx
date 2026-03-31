import { useState, useEffect } from "react";
import { EVENT_CONFIG } from "@/config/event";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const target = new Date(`${EVENT_CONFIG.date}T${EVENT_CONFIG.time}:00`).getTime();
    const update = () => {
      const diff = Math.max(0, target - Date.now());
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  const units = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Min", value: timeLeft.minutes },
    { label: "Sec", value: timeLeft.seconds },
  ];

  return (
    <div className="flex gap-3 sm:gap-4">
      {units.map((u) => (
        <div key={u.label} className="flex flex-col items-center">
          <div className="glass-panel rounded-lg w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center glow-gold-sm">
            <span className="text-xl sm:text-2xl font-bold text-gradient-gold font-display">
              {String(u.value).padStart(2, "0")}
            </span>
          </div>
          <span className="text-[10px] sm:text-xs text-muted-foreground mt-1.5 uppercase tracking-widest font-body">
            {u.label}
          </span>
        </div>
      ))}
    </div>
  );
};

export default CountdownTimer;
