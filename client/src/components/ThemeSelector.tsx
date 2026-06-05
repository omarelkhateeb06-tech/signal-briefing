import React from "react";
import { useTheme } from "../contexts/ThemeContext";
import { Sparkles } from "lucide-react";

export const ThemeSelector: React.FC = () => {
  const { depth, setDepth, profile } = useTheme();

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 max-w-4xl w-[95%] md:w-auto bg-background/95 backdrop-blur border-2 border-foreground p-3 shadow-2xl flex flex-col md:flex-row items-center gap-4">
      <div className="flex items-center gap-2 shrink-0 border-b md:border-b-0 md:border-r border-foreground/15 pb-2 md:pb-0 md:pr-4">
        <Sparkles className="w-4 h-4 text-primary animate-pulse" />
        <span className="font-mono text-[10px] font-black uppercase tracking-widest text-foreground">
          REDESIGN V2 CONSOLE
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
        <div className="flex items-center gap-1.5">
          <span className="text-muted-foreground">DEPTH:</span>
          <div className="flex border border-foreground/15 p-0.5 bg-card">
            {(["accessible", "briefed", "technical"] as const).map((level) => (
              <button
                key={level}
                onClick={() => setDepth(level)}
                className={`px-2 py-0.5 text-[9px] uppercase font-bold cursor-pointer transition-all ${
                  depth === level
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        <div className="h-4 w-px bg-foreground/15 hidden md:block" />

        <div className="text-muted-foreground text-[10px]">
          ACTIVE PROFILE: <span className="text-foreground font-bold">{profile.role.toUpperCase()}</span>
        </div>

        <div className="h-4 w-px bg-foreground/15 hidden md:block" />

        <div className="text-[9px] text-primary font-black">
          [1] LEAD WITH EXPLANATIONS • [2] FORMAT FOLLOWS CONTENT TYPE
        </div>
      </div>
    </div>
  );
};
