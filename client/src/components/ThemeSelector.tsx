import React from "react";
import { useTheme, ScrollModel } from "../contexts/ThemeContext";

export const ThemeSelector: React.FC = () => {
  const { scrollModel, setScrollModel } = useTheme();

  const models: { id: ScrollModel; label: string; desc: string }[] = [
    { 
      id: "hero-sticky", 
      label: "1. Hero Sticky", 
      desc: "Big hero image scales down and pins to top on scroll" 
    },
    { 
      id: "parallax-margin", 
      label: "2. Parallax Margins", 
      desc: "Images float with slight parallax offsets in stream" 
    },
    { 
      id: "sticky-split", 
      label: "3. Sticky Split Sync", 
      desc: "Right-hand panel locks and cross-fades image as you scroll left stream" 
    },
    { 
      id: "inline-grid", 
      label: "4. Inline Grid", 
      desc: "Alternating image cards embedded asymmetrically in text" 
    },
  ];

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 max-w-2xl w-[90%] md:w-auto bg-background/95 backdrop-blur border border-foreground p-3 shadow-2xl flex flex-col md:flex-row items-center gap-4">
      <div className="flex items-center gap-2 shrink-0 border-b md:border-b-0 md:border-r border-foreground/15 pb-2 md:pb-0 md:pr-4">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
        </span>
        <span className="font-mono text-[10px] font-black uppercase tracking-widest text-foreground">
          PHOTO SCROLL LAB
        </span>
      </div>

      <div className="flex flex-wrap justify-center gap-1">
        {models.map((m) => (
          <button
            key={m.id}
            onClick={() => setScrollModel(m.id)}
            title={m.desc}
            className={`px-3 py-1.5 font-mono text-[9px] uppercase font-bold border transition-all cursor-pointer ${
              scrollModel === m.id
                ? "bg-foreground text-background border-foreground"
                : "border-foreground/10 hover:border-foreground/40 text-muted-foreground hover:text-foreground"
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>
    </div>
  );
};
