import React from "react";
import { useTheme } from "../../contexts/ThemeContext";
import { BriefingStory } from "../../lib/mockData";

interface RubinLayoutProps {
  stories: BriefingStory[];
  onOpenOnboarding: () => void;
}

export const RubinLayout: React.FC<RubinLayoutProps> = ({ stories, onOpenOnboarding }) => {
  const { depth } = useTheme();

  const leadStory = stories[0];
  const followingStories = stories.slice(1);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-foreground/10 selection:text-foreground pb-40">
      
      {/* 1. Above the fold: A single centered line */}
      <header className="pt-20 text-center space-y-10">
        <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          Wednesday, June 4, 2026
        </div>
        
        {/* Lead Headline */}
        {leadStory && (
          <div className="max-w-3xl mx-auto px-6 text-center space-y-6">
            <h1 className="font-serif text-3xl md:text-5xl font-black leading-tight text-foreground">
              {leadStory.title}
            </h1>
            <p className="font-serif text-base md:text-lg italic text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {leadStory.depth[depth].summary}
            </p>
            
            <div className="w-16 h-[1px] bg-foreground/10 mx-auto" />
            
            {/* Image (AFTER the text - words lead, images support) */}
            <div className="max-w-2xl mx-auto overflow-hidden mt-6">
              <img 
                src={leadStory.image} 
                alt={leadStory.title} 
                className="w-full h-auto object-cover opacity-80 filter grayscale contrast-110"
              />
            </div>
          </div>
        )}
      </header>

      {/* 2. Remaining Feed (Whitespace-driven single column) */}
      <main className="max-w-2xl mx-auto px-6 mt-24 space-y-20">
        {followingStories.map((story, index) => {
          return (
            <article 
              key={story.id}
              className="space-y-4"
            >
              {/* Sector label */}
              <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                {story.sectors.join(" • ")}
              </div>

              {/* Headline */}
              <h3 className="font-serif text-2xl font-bold leading-tight text-foreground">
                {story.title}
              </h3>

              {/* Thesis */}
              <p className="font-serif text-sm md:text-base leading-relaxed text-foreground/90">
                {story.depth[depth].summary}
              </p>

              {/* Metadata */}
              <div className="font-mono text-[10px] text-muted-foreground pt-1 flex items-center gap-3">
                <span>{story.readTime.toUpperCase()}</span>
                <span>•</span>
                <span>{story.sourceCount} DECLASSIFIED CHANNELS</span>
              </div>
            </article>
          );
        })}

        {/* Closing breathing room */}
        <div className="pt-20 text-center space-y-4">
          <div className="w-12 h-[1px] bg-foreground/15 mx-auto" />
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            Your briefing is complete.
          </p>
          <button 
            onClick={onOpenOnboarding}
            className="font-mono text-[9px] uppercase tracking-wider text-primary underline block mx-auto cursor-pointer"
          >
            [RE-CALIBRATE PROFILE]
          </button>
        </div>
      </main>

    </div>
  );
};
