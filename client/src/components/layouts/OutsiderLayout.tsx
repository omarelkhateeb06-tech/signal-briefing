import React from "react";
import { useTheme } from "../../contexts/ThemeContext";
import { BriefingStory } from "../../lib/mockData";
import { ArrowRight, Lock, Eye, CheckCircle2 } from "lucide-react";

interface OutsiderLayoutProps {
  stories: BriefingStory[];
  onOpenOnboarding: () => void;
}

export const OutsiderLayout: React.FC<OutsiderLayoutProps> = ({ stories, onOpenOnboarding }) => {
  const { depth, setDepth, profile, updateProfile } = useTheme();

  const leadStory = stories[0];
  const gridStories = stories.slice(1);

  const handleProUnlock = () => {
    updateProfile({ isPro: true });
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/30 selection:text-primary pb-32">
      
      {/* 1. Full-Bleed Hero (Story #1 Takes the Entire Viewport) */}
      {leadStory && (
        <section className="relative w-full h-[90vh] flex flex-col justify-end bg-black overflow-hidden border-b border-border">
          {/* Background Desaturated Image with Gradient Fade */}
          <div className="absolute inset-0 z-0">
            <img 
              src={leadStory.image} 
              alt={leadStory.title}
              className="w-full h-full object-cover opacity-35 filter grayscale contrast-125"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
          </div>

          {/* Hero Content Container */}
          <div className="relative z-10 max-w-5xl mx-auto px-6 pb-12 w-full space-y-4">
            <div className="flex flex-wrap gap-2 items-center font-mono text-xs">
              <span className="text-primary font-bold uppercase tracking-widest border border-primary/30 px-2.5 py-0.5">
                RANKED #01 OF {stories.length} TODAY
              </span>
              <span className="text-muted-foreground">•</span>
              <span className="text-muted-foreground uppercase">{profile.role.toUpperCase()}</span>
            </div>

            <h1 className="font-serif text-4xl md:text-6xl font-black leading-none tracking-tight text-foreground max-w-4xl">
              {leadStory.title}
            </h1>

            <p className="text-base md:text-lg text-muted-foreground max-w-2xl font-serif italic">
              {leadStory.depth[depth].summary}
            </p>

            {/* Glowing CTA */}
            <div className="pt-2 flex items-center gap-4">
              <button 
                onClick={onOpenOnboarding}
                className="bg-primary text-primary-foreground font-bold font-mono text-xs uppercase tracking-wider px-6 py-3 shadow-lg hover:bg-primary/90 transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Read your personalized briefing</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <span className="font-mono text-[10px] text-muted-foreground uppercase hidden sm:inline">
                EST. READ: {leadStory.readTime}
              </span>
            </div>
          </div>
        </section>
      )}

      {/* 2. Masonry / Columns Grid Below */}
      <section className="max-w-6xl mx-auto px-6 mt-16 space-y-12">
        <div className="border-b border-border pb-4 flex justify-between items-end">
          <h2 className="font-serif text-2xl font-bold">Today's Declassified Stream</h2>
          <span className="font-mono text-xs text-muted-foreground">SCROLL TO ANALYZE</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {gridStories.map((story, index) => {
            const isGated = story.isGated && !profile.isPro;

            return (
              <div 
                key={story.id}
                className={`relative border-l-2 border-primary bg-card p-6 flex flex-col justify-between overflow-hidden transition-all ${
                  isGated ? "min-h-[280px]" : ""
                }`}
              >
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground">
                      {story.sectors.join(" • ")}
                    </span>
                    <span className="font-mono text-[9px] text-primary font-bold">
                      #{index + 2}
                    </span>
                  </div>

                  <h3 className="font-serif text-lg font-bold leading-snug mb-3 text-foreground">
                    {story.title}
                  </h3>

                  {/* If gated, apply frosted glass overlay */}
                  {isGated ? (
                    <p className="text-xs text-muted-foreground line-clamp-3 select-none filter blur-[1px]">
                      {story.depth[depth].summary}
                    </p>
                  ) : (
                    <p className="text-xs text-muted-foreground line-clamp-4">
                      {story.depth[depth].summary}
                    </p>
                  )}
                </div>

                {/* Gated Card Overlay */}
                {isGated && (
                  <div className="absolute inset-0 bg-black/70 backdrop-blur-md flex flex-col items-center justify-center p-4 text-center z-10">
                    <Lock className="w-5 h-5 text-primary mb-2" />
                    <span className="font-mono text-[9px] text-primary font-bold uppercase tracking-wider">
                      CLASSIFIED EXCLUSIVE
                    </span>
                    <p className="text-[10px] text-muted-foreground mt-1 max-w-[180px] leading-tight mb-3">
                      This intelligence briefing was ranked #{index + 2} for your profile.
                    </p>
                    <button 
                      onClick={handleProUnlock}
                      className="bg-primary/20 hover:bg-primary text-primary hover:text-primary-foreground border border-primary/30 font-mono text-[9px] font-bold uppercase tracking-wider px-3 py-1.5 transition-colors cursor-pointer"
                    >
                      Unlock story
                    </button>
                  </div>
                )}

                {!isGated && (
                  <div className="mt-4 pt-3 border-t border-border flex justify-between items-center text-[10px] font-mono text-muted-foreground">
                    <span>{story.readTime}</span>
                    <span className="text-primary font-bold">STABLE yield</span>
                  </div>
                )}
              </div>
            );
          })}

          {/* Retention Interstitial Card */}
          <div className="border border-dashed border-primary/30 p-6 flex flex-col justify-between bg-primary/5">
            <div className="space-y-2">
              <Eye className="w-6 h-6 text-primary" />
              <h3 className="font-serif text-lg font-bold">Your sectors are covered.</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                You've scanned the active signals for today. Our models will run re-calibration protocols at 05:00 UTC.
              </p>
            </div>
            <div className="mt-4 font-mono text-[10px] text-primary font-bold">
              [ STATUS: PROTECTED ]
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
