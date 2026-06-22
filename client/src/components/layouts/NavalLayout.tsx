import React from "react";
import { useTheme } from "../../contexts/ThemeContext";
import { BriefingStory } from "../../lib/mockData";

interface NavalLayoutProps {
  stories: BriefingStory[];
  onOpenOnboarding: () => void;
}

export const NavalLayout: React.FC<NavalLayoutProps> = ({ stories, onOpenOnboarding }) => {
  const { depth } = useTheme();

  return (
    <div className="min-h-screen bg-background text-foreground font-serif selection:bg-foreground/10 selection:text-foreground pb-32 pt-16">
      {/* 640px Centered container, no sidebars, no headers */}
      <main className="max-w-[640px] mx-auto px-4 space-y-12">
        
        <div className="space-y-8 divide-y divide-foreground/15">
          {stories.map((story, index) => {
            return (
              <article 
                key={story.id}
                className="pt-8 first:pt-0 space-y-3"
              >
                {/* Line 1: Rank & Headline */}
                <h3 className="text-lg font-bold leading-tight">
                  {index + 1}. {story.title}
                </h3>

                {/* Line 2: Thesis in Italic */}
                <p className="text-base italic leading-relaxed text-foreground/90">
                  "{story.depth[depth].summary}"
                </p>

                {/* Line 3: Minimal metadata */}
                <div className="text-xs font-mono text-muted-foreground flex items-center gap-3">
                  <span className="uppercase">{story.sectors.join(" • ")}</span>
                  <span>•</span>
                  <span>{story.sourceCount} DECLASSIFIED SOURCES</span>
                  <span>•</span>
                  <span>{story.readTime.toUpperCase()}</span>
                </div>
              </article>
            );
          })}
        </div>

        {/* Minimal termination */}
        <div className="pt-16 border-t border-foreground/10 text-center text-xs font-mono text-muted-foreground">
          <span>END OF BRIEFING.</span>
          <button 
            onClick={onOpenOnboarding}
            className="ml-4 underline font-bold cursor-pointer"
          >
            [RE-CALIBRATE]
          </button>
        </div>

      </main>
    </div>
  );
};
