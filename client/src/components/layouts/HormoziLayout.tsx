import React from "react";
import { useTheme } from "../../contexts/ThemeContext";
import { BriefingStory } from "../../lib/mockData";
import { Lock, Sparkles, AlertCircle, ArrowRight, ShieldCheck } from "lucide-react";

interface HormoziLayoutProps {
  stories: BriefingStory[];
  onOpenOnboarding: () => void;
}

export const HormoziLayout: React.FC<HormoziLayoutProps> = ({ stories, onOpenOnboarding }) => {
  const { depth, setDepth, profile, updateProfile } = useTheme();

  const handleProUnlock = () => {
    updateProfile({ isPro: true });
  };

  const handleProLock = () => {
    updateProfile({ isPro: false });
  };

  // Compute read progress to generate FOMO score
  const totalStories = stories.length;
  const proUnlockedCount = profile.isPro ? totalStories : 2; // Free tier only gets 2 stories unlocked
  const coveragePercent = Math.round((proUnlockedCount / totalStories) * 100);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/20 selection:text-primary pb-32">
      
      {/* Persistent Sticky Offer Bar for Free Users */}
      {!profile.isPro ? (
        <div className="sticky top-0 z-50 bg-amber-500 text-black py-2.5 px-4 flex justify-between items-center text-xs font-bold shadow-md">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 animate-bounce" />
            <span>YOU ARE ONLY SEEING 2 OF {totalStories} RANKED STORIES. UNLOCK ALL CONVERGENCE INSIGHTS.</span>
          </div>
          <button 
            onClick={handleProUnlock}
            className="bg-black text-white px-3.5 py-1 uppercase tracking-wider text-[10px] font-black hover:bg-black/80 transition-colors cursor-pointer"
          >
            Unlock All for $10/mo
          </button>
        </div>
      ) : (
        <div className="sticky top-0 z-50 bg-emerald-600 text-white py-2 px-4 flex justify-between items-center text-xs font-bold shadow-md">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4" />
            <span>PRO LEVEL ACTIVE // ALL {totalStories} DAILY PACKETS UNLOCKED</span>
          </div>
          <button 
            onClick={handleProLock}
            className="bg-black/20 hover:bg-black/40 text-white px-3 py-0.5 border border-white/20 uppercase text-[9px] cursor-pointer"
          >
            [DEMO: RESET TO FREE]
          </button>
        </div>
      )}

      {/* Main Container */}
      <main className="max-w-4xl mx-auto px-4 mt-8 space-y-8">
        
        {/* Masthead */}
        <header className="border-b border-border pb-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground font-bold">
              DAILY INTELLIGENCE BRIEFING
            </span>
            <h1 className="font-serif text-3xl font-black text-foreground mt-1">
              Your Daily Intelligence Feed
            </h1>
            <p className="text-xs text-muted-foreground mt-1 font-mono">
              12 stories analyzed • ranked for <span className="text-foreground font-bold underline decoration-dotted">{profile.role}</span>
            </p>
          </div>

          <button 
            onClick={onOpenOnboarding}
            className="text-xs font-mono font-bold text-primary underline cursor-pointer"
          >
            [ADJUST PROFILE]
          </button>
        </header>

        {/* 1. Daily Intelligence Score (FOMO Engine) */}
        <div className="bg-secondary/40 border border-border p-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="space-y-1">
            <div className="font-mono text-[10px] uppercase text-muted-foreground font-bold">
              DAILY COVERAGE SCORE
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-serif font-black text-foreground">{coveragePercent}%</span>
              <span className="text-xs text-muted-foreground font-mono">
                {profile.isPro ? "Full intelligence coverage achieved" : "Limited visibility"}
              </span>
            </div>
          </div>

          <div className="w-full sm:w-64 space-y-1">
            <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
              <div 
                className="bg-accent h-full transition-all duration-500" 
                style={{ width: `${coveragePercent}%` }}
              />
            </div>
            <div className="flex justify-between font-mono text-[9px] text-muted-foreground">
              <span>{proUnlockedCount} OF {totalStories} STORIES READ</span>
              <span>
                {profile.isPro ? "TOP 15% OF READERS" : "75% OF INTEL GATED"}
              </span>
            </div>
          </div>
        </div>

        {/* Depth Selector */}
        <div className="flex justify-end border-b border-border pb-2 text-xs font-mono gap-4">
          <span>DEPTH MODE:</span>
          {(["accessible", "briefed", "technical"] as const).map((level) => (
            <button
              key={level}
              onClick={() => setDepth(level)}
              className={`cursor-pointer ${
                depth === level ? "font-black underline text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {level.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Story List */}
        <div className="space-y-6">
          {stories.map((story, index) => {
            const isGated = !profile.isPro && index >= 2; // Gate after first 2 stories

            return (
              <div 
                key={story.id}
                className={`border border-border p-6 bg-white transition-all relative ${
                  isGated ? "overflow-hidden max-h-[180px] select-none" : ""
                }`}
              >
                {/* Card Header */}
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center gap-2 font-mono text-[10px]">
                    <span className="text-muted-foreground font-bold">STORY #{index + 1}</span>
                    <span className="text-muted-foreground">•</span>
                    <span className="text-muted-foreground uppercase">{story.sectors.join(" • ")}</span>
                  </div>
                  {isGated && (
                    <span className="font-mono text-[10px] bg-accent/10 text-accent font-bold px-2 py-0.5 border border-accent/20 flex items-center gap-1">
                      <Lock className="w-3 h-3" /> PRO ONLY
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="font-serif text-xl font-bold leading-tight mb-2">
                  {story.title}
                </h3>

                {/* Thesis summary */}
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {story.depth[depth].summary}
                </p>

                {/* Gated overlay block */}
                {isGated && (
                  <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white via-white/90 to-transparent flex flex-col justify-end p-6 z-10">
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                      <div className="text-left">
                        <span className="font-mono text-[10px] text-accent font-black uppercase tracking-wider block">
                          CLASSIFIED SIGNAL
                        </span>
                        <span className="text-xs text-muted-foreground">
                          This story was specifically ranked #{index + 1} for your role.
                        </span>
                      </div>
                      <button 
                        onClick={handleProUnlock}
                        className="bg-accent text-accent-foreground font-mono text-[10px] font-black uppercase tracking-wider px-4 py-2 hover:bg-accent/90 transition-colors flex items-center gap-1.5 cursor-pointer"
                      >
                        <span>Unlock for $10/mo</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Expanded items if not gated */}
                {!isGated && "analysis" in story.depth[depth] && (
                  <div className="mt-4 pt-4 border-t border-dashed border-border text-xs leading-relaxed text-foreground space-y-2">
                    <div className="font-mono text-[9px] uppercase tracking-wider text-primary font-bold">
                      ANALYSIS BRIEF //
                    </div>
                    <p>{(story.depth[depth] as any).analysis}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </main>
    </div>
  );
};
