import React from "react";
import { useTheme, DesignMovement } from "../contexts/ThemeContext";
import { Sparkles, LayoutGrid, Layers, Eye, BookOpen, Coins, EyeOff, Music, Compass, PanelRightOpen, FileSpreadsheet } from "lucide-react";

export const ThemeSelector: React.FC = () => {
  const { movement, setMovement } = useTheme();

  const themes: { id: DesignMovement; label: string; icon: any; desc: string }[] = [
    // --- THREE NEW SWISS FUSIONS ---
    { 
      id: "swiss-command", 
      label: "1. SWISS COMMAND", 
      icon: Compass, 
      desc: "Prompt 1: 2-panel, Swiss typography, persistent profile & context" 
    },
    { 
      id: "swiss-slideout", 
      label: "2. SWISS SLIDEOUT", 
      icon: PanelRightOpen, 
      desc: "Prompt 2: Single column feed, right edge slide-out detail drawer" 
    },
    { 
      id: "swiss-dossier", 
      label: "3. SWISS DOSSIER", 
      icon: FileSpreadsheet, 
      desc: "Prompt 3: Classified header, 2-column exhibition-style dossier" 
    },
    // --- PREVIOUS DESIGNS PRESERVED BELOW ---
    { 
      id: "contrarian", 
      label: "4. WORKSPACE TRIAGE", 
      icon: LayoutGrid, 
      desc: "Scan speed, no serifs, urgent accents" 
    },
    { 
      id: "expansionist", 
      label: "5. INTEL PLATFORM", 
      icon: Layers, 
      desc: "Multi-sector widgets, dashboard layout" 
    },
    { 
      id: "outsider", 
      label: "6. DARK CONVICTION", 
      icon: Eye, 
      desc: "Dark mode, full-screen hero story" 
    },
    { 
      id: "executor", 
      label: "7. ORIGINAL SWISS", 
      icon: BookOpen, 
      desc: "Clean high-density editorial print" 
    },
    { 
      id: "hormozi", 
      label: "8. THE OFFER MACHINE", 
      icon: Coins, 
      desc: "Completion scores, gated content" 
    },
  ];

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-card border border-border shadow-2xl p-1.5 flex flex-col md:flex-row items-center gap-2 max-w-[95vw] md:max-w-6xl rounded-md bg-white">
      {/* Label Indicator */}
      <div className="flex items-center gap-1.5 px-2 font-mono text-[9px] uppercase tracking-wider text-muted-foreground border-b md:border-b-0 md:border-r border-border pb-1 md:pb-0 md:pr-3 shrink-0">
        <Sparkles className="w-3 h-3 text-primary animate-pulse" />
        <span className="font-bold text-foreground">CHOOSE EXPERIMENT (SWISS FUSIONS + EXTRA):</span>
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
