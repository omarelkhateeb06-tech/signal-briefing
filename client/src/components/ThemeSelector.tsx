import React from "react";
import { useTheme, DesignMovement } from "../contexts/ThemeContext";
import { Sparkles, Terminal, FileText, Settings, BookOpen } from "lucide-react";

export const ThemeSelector: React.FC = () => {
  const { movement, setMovement } = useTheme();

  const themes: { id: DesignMovement; label: string; icon: any; desc: string }[] = [
    { 
      id: "swiss", 
      label: "SWISS EDITORIAL", 
      icon: BookOpen, 
      desc: "Minimalist, paper-like serif layout" 
    },
    { 
      id: "terminal", 
      label: "DARK TERMINAL", 
      icon: Terminal, 
      desc: "Bloomberg-like cyber console" 
    },
    { 
      id: "archivist", 
      label: "VINTAGE DOSSIER", 
      icon: FileText, 
      desc: "Mid-century tactile manila folder" 
    },
  ];

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-card border-2 border-border shadow-2xl p-1.5 flex items-center gap-1.5 max-w-[95vw] md:max-w-md rounded-md">
      {/* Label Indicator */}
      <div className="hidden md:flex items-center gap-1 px-2.5 font-mono text-[9px] uppercase tracking-wider text-muted-foreground border-r border-border mr-1">
        <Sparkles className="w-3 h-3 text-primary animate-pulse" />
        <span>DESIGN MOVEMENT:</span>
      </div>

      {/* Selector Buttons */}
      <div className="flex gap-1">
        {themes.map((t) => {
          const isActive = movement === t.id;
          const Icon = t.icon;
          return (
            <button
              key={t.id}
              onClick={() => setMovement(t.id)}
              title={t.desc}
              className={`px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer transition-all ${
                isActive
                  ? "bg-primary text-primary-foreground font-extrabold"
                  : "bg-background text-muted-foreground border border-border hover:text-foreground"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{t.label.split(" ")[0]}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
