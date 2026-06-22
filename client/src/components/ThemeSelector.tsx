import React from "react";
import { useTheme, DesignMovement } from "../contexts/ThemeContext";
import { Sparkles, Terminal, FileText, Settings, BookOpen, Layers, Zap, Eye, CheckSquare, Coins, EyeOff, Music } from "lucide-react";

export const ThemeSelector: React.FC = () => {
  const { movement, setMovement } = useTheme();

  const themes: { id: DesignMovement; label: string; icon: any; desc: string }[] = [
    { 
      id: "contrarian", 
      label: "1. WORKSPACE TRIAGE", 
      icon: Zap, 
      desc: "Scan speed, no serifs, urgent accents" 
    },
    { 
      id: "principles", 
      label: "2. LEGAL BRIEF", 
      icon: CheckSquare, 
      desc: "Pure text, numbered items, zero fluff" 
    },
    { 
      id: "expansionist", 
      label: "3. INTEL PLATFORM", 
      icon: Layers, 
      desc: "Multi-sector widgets, dashboard layout" 
    },
    { 
      id: "outsider", 
      label: "4. DARK CONVICTION", 
      icon: Eye, 
      desc: "Dark mode, full-screen hero story" 
    },
    { 
      id: "executor", 
      label: "5. ORIGINAL SWISS", 
      icon: BookOpen, 
      desc: "Clean high-density editorial print" 
    },
    { 
      id: "hormozi", 
      label: "6. THE OFFER MACHINE", 
      icon: Coins, 
      desc: "Completion scores, gated content" 
    },
    { 
      id: "naval", 
      label: "7. PURE SIGNAL", 
      icon: EyeOff, 
      desc: "Fastest possible feed, maximum signal" 
    },
    { 
      id: "rubin", 
      label: "8. THE QUIET LETTER", 
      icon: Music, 
      desc: "Tactile whitespace, book-like calm" 
    },
  ];

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-card border border-border shadow-2xl p-1.5 flex flex-col md:flex-row items-center gap-2 max-w-[95vw] md:max-w-5xl rounded-md bg-white">
      {/* Label Indicator */}
      <div className="flex items-center gap-1.5 px-2 font-mono text-[9px] uppercase tracking-wider text-muted-foreground border-b md:border-b-0 md:border-r border-border pb-1 md:pb-0 md:pr-3 shrink-0">
        <Sparkles className="w-3 h-3 text-primary animate-pulse" />
        <span className="font-bold text-foreground">CHOOSE DESIGN EXPERIMENT (8 BETS):</span>
      </div>

      {/* Selector Buttons */}
      <div className="flex gap-1 overflow-x-auto max-w-full pb-1 md:pb-0 scrollbar-thin">
        {themes.map((t) => {
          const isActive = movement === t.id;
          const Icon = t.icon;
          return (
            <button
              key={t.id}
              onClick={() => setMovement(t.id)}
              title={t.desc}
              className={`px-2.5 py-1.5 font-mono text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer transition-all whitespace-nowrap rounded-sm ${
                isActive
                  ? "bg-primary text-primary-foreground font-black"
                  : "bg-background text-muted-foreground border border-border hover:text-foreground hover:bg-secondary/30"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
