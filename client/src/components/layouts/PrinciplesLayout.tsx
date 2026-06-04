import React from "react";
import { useTheme } from "../../contexts/ThemeContext";
import { BriefingStory } from "../../lib/mockData";

interface PrinciplesLayoutProps {
  stories: BriefingStory[];
  onOpenOnboarding: () => void;
}

export const PrinciplesLayout: React.FC<PrinciplesLayoutProps> = ({ stories, onOpenOnboarding }) => {
  const { depth, setDepth, profile } = useTheme();

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-foreground/10 selection:text-foreground pb-24 pt-12">
      <div className="max-w-[600px] mx-auto px-4">
        
        {/* Minimalist Top Header */}
        <header className="border-b border-foreground pb-2 mb-8 flex justify-between items-end text-xs">
          <div>
            <span className="font-bold">June 4, 2026</span>
            <span className="mx-2">•</span>
            <span className="uppercase font-semibold">{profile.role}</span>
            <span className="mx-2">•</span>
            <span className="uppercase font-semibold text-muted-foreground">{profile.sectors.join(", ")}</span>
          </div>
          <button 
            onClick={onOpenOnboarding}
            className="text-[11px] underline font-bold cursor-pointer"
          >
            re-calibrate
          </button>
        </header>

        {/* Global Depth Selector */}
        <div className="flex gap-4 text-xs font-mono mb-8 border-b border-foreground/10 pb-2">
          <span>DEPTH:</span>
          {(["accessible", "briefed", "technical"] as const).map((level) => (
            <button
              key={level}
              onClick={() => setDepth(level)}
              className={`cursor-pointer ${
                depth === level
                  ? "font-black underline"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {level.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Legal List stream */}
        <main className="space-y-12">
          {stories.map((story, index) => {
            return (
              <article 
                key={story.id}
                className="relative pl-8 border-l border-foreground/10 py-1"
              >
                {/* Numbered in the left margin like a legal brief */}
                <div className="absolute left-0 top-1.5 font-mono text-xs font-bold text-muted-foreground">
                  § {index + 1}
                </div>

                {/* Header */}
                <div className="space-y-1">
                  <div className="text-[11px] uppercase tracking-wider font-bold text-muted-foreground">
                    [{story.sectors.join(" // ")}]
                  </div>
                  <h3 className="text-base font-extrabold leading-snug">
                    {story.title}
                  </h3>
                </div>

                {/* Core Thesis Paragraph */}
                <div className="mt-3 text-sm leading-relaxed space-y-3">
                  <p>
                    <span className="font-bold">Why it matters:</span> {story.depth[depth].summary}
                  </p>
                  
                  {/* Briefed context */}
                  {"analysis" in story.depth[depth] && (
                    <p className="text-foreground/90 pl-4 border-l border-foreground/30">
                      {(story.depth[depth] as any).analysis}
                    </p>
                  )}
                  
                  {/* Technical details if selected */}
                  {"architecturalImpact" in story.depth[depth] && (
                    <p className="text-xs italic text-muted-foreground">
                      {(story.depth[depth] as any).architecturalImpact}
                    </p>
                  )}
                </div>

                {/* Metadata line */}
                <div className="mt-3 text-[11px] font-mono text-muted-foreground">
                  <span>SOURCE: {story.sourceCount} DECLASSIFIED FILES</span>
                  <span className="mx-2">|</span>
                  <span>EST. READ: {story.readTime.toUpperCase()}</span>
                </div>
              </article>
            );
          })}
        </main>

        {/* Footer Terminal Stamp */}
        <footer className="mt-20 pt-8 border-t border-foreground/20 text-center font-mono text-xs text-muted-foreground">
          — END OF DOSSIER —
        </footer>
      </div>
    </div>
  );
};
