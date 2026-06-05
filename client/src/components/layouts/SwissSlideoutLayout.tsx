import React, { useState } from "react";
import { useTheme } from "../../contexts/ThemeContext";
import { BriefingStory, MARKET_METRICS } from "../../lib/mockData";
import { ArrowUpRight, ArrowDownRight, X, ChevronRight, Sparkles } from "lucide-react";

interface SwissSlideoutLayoutProps {
  stories: BriefingStory[];
  onOpenOnboarding: () => void;
}

export const SwissSlideoutLayout: React.FC<SwissSlideoutLayoutProps> = ({ stories, onOpenOnboarding }) => {
  const { depth, setDepth, profile } = useTheme();
  const [slideStoryId, setSlideStoryId] = useState<string | null>(null);

  const activeSlideStory = stories.find((s) => s.id === slideStoryId);

  const getRelevanceScore = (story: BriefingStory) => {
    const roleKey = profile.seniority === "executive" 
      ? "executive" 
      : profile.role.toLowerCase().includes("analyst") 
        ? "analyst" 
        : profile.role.toLowerCase().includes("founder") 
          ? "founder" 
          : "general";
    return story.relevanceScores[roleKey] || story.relevanceScores.general;
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/10 selection:text-primary pb-32 relative overflow-x-hidden">
      
      {/* Masthead */}
      <header className="border-b border-foreground p-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary font-bold">
              DAILY CURATED DOSSIER
            </span>
            <h1 className="font-serif text-5xl md:text-6xl font-black tracking-tight leading-none text-foreground mt-1">
              SIGNAL
            </h1>
          </div>
          
          <div className="text-left md:text-right font-mono text-xs leading-relaxed text-muted-foreground">
            <div>June 4, 2026 // 05:00 UTC</div>
            <div>COMPILED FOR: <span className="text-foreground font-bold underline decoration-solid decoration-primary">{profile.name.toUpperCase()}</span></div>
          </div>
        </div>
      </header>

      {/* Main Split: Feed on Left (65%), Sidebar on Right (35%) */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 md:p-12 items-start">
        
        {/* LEFT COLUMN: Main Ranked Feed (65% width) */}
        <main className="lg:col-span-8 space-y-8">
          <div className="border-b border-foreground pb-2 flex justify-between items-center">
            <h2 className="font-serif text-xl font-black italic">Today's Curated Intelligence</h2>
            <span className="font-mono text-[10px] text-muted-foreground">{stories.length} ACTIVE CHANNELS</span>
          </div>

          <div className="divide-y divide-foreground/10">
            {stories.map((story, index) => {
              const score = getRelevanceScore(story);
              
              // Dynamic visual weights based on rank
              const isTop3 = index < 3;
              const isTail = index >= 8;

              // Top 3 are visually heavier (larger headlines, pulling quote summaries)
              if (isTop3) {
                return (
                  <article 
                    key={story.id}
                    onClick={() => setSlideStoryId(story.id)}
                    className="py-8 cursor-pointer group space-y-3"
                  >
                    <div className="flex justify-between items-center font-mono text-[10px]">
                      <span className="text-primary font-bold">
                        RANK 0{index + 1} // {story.sectors.join(" • ")}
                      </span>
                      <span className="text-muted-foreground">
                        {story.readTime.toUpperCase()} // {story.sourceCount} SOURCES
                      </span>
                    </div>

                    {story.image && (
                      <div className="relative aspect-[16/9] overflow-hidden border border-foreground/10 bg-muted/10">
                        <img 
                          src={story.image} 
                          alt=""
                          className="object-cover w-full h-full filter grayscale group-hover:grayscale-0 transition-all duration-300"
                        />
                      </div>
                    )}

                    <h3 className="font-serif text-2xl md:text-3xl font-black text-foreground group-hover:text-primary transition-colors leading-tight">
                      {story.title}
                    </h3>

                    {/* Pull-quote block from summary */}
                    <p className="font-serif text-sm md:text-base italic text-muted-foreground border-l-2 border-primary pl-4 py-1">
                      "{story.depth[depth].summary}"
                    </p>

                    <div className="flex items-center gap-2 pt-1">
                      <span className="font-mono text-[9px] bg-primary/10 text-primary font-bold px-2 py-0.5 border border-primary/20">
                        {score}% RELEVANCE MATCH
                      </span>
                      <span className="font-mono text-[9px] text-muted-foreground flex items-center gap-1">
                        <span>Click to expand analysis</span>
                        <ChevronRight className="w-3 h-3" />
                      </span>
                    </div>
                  </article>
                );
              }

              // Standard Density (Rank 4-8)
              if (!isTail) {
                return (
                  <article 
                    key={story.id}
                    onClick={() => setSlideStoryId(story.id)}
                    className="py-5 cursor-pointer group flex justify-between items-start gap-6"
                  >
                    <div className="space-y-1.5 min-w-0 flex-1">
                      <div className="flex items-center gap-2 font-mono text-[9px] text-muted-foreground">
                        <span className="text-primary font-bold">RANK 0{index + 1}</span>
                        <span>•</span>
                        <span className="uppercase">{story.sectors.join(" • ")}</span>
                        <span>•</span>
                        <span>{story.readTime}</span>
                      </div>

                      <h3 className="font-serif text-lg font-bold leading-snug text-foreground group-hover:text-primary transition-colors">
                        {story.title}
                      </h3>

                      {story.image && (
                        <div className="my-2 relative aspect-[16/10] w-full max-w-[150px] overflow-hidden border border-foreground/5 bg-muted/10">
                          <img 
                            src={story.image} 
                            alt=""
                            className="object-cover w-full h-full filter grayscale group-hover:grayscale-0 transition-all duration-300"
                          />
                        </div>
                      )}

                      <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                        {story.depth[depth].summary}
                      </p>
                    </div>

                    <div className="shrink-0 text-right font-mono text-[9px] space-y-1">
                      <div className="bg-primary/10 text-primary font-bold px-2 py-0.5 border border-primary/20">
                        {score}% MATCH
                      </div>
                      <div className="text-muted-foreground text-[8px]">
                        {story.sourceCount} SOURCES
                      </div>
                    </div>
                  </article>
                );
              }

              // High-density lists (Rank 9-10)
              return (
                <article 
                  key={story.id}
                  onClick={() => setSlideStoryId(story.id)}
                  className="py-3 cursor-pointer group flex justify-between items-center gap-4"
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <span className="font-mono text-[10px] text-primary font-bold">0{index + 1}</span>
                    <h3 className="font-serif text-sm font-bold text-foreground group-hover:text-primary transition-colors truncate">
                      {story.title}
                    </h3>
                  </div>
                  <div className="shrink-0 font-mono text-[8px] text-muted-foreground uppercase">
                    {story.sectors.join(" // ")}
                  </div>
                </article>
              );
            })}
          </div>
        </main>

        {/* RIGHT COLUMN: Static Context & Market Telemetry (35% width) */}
        <aside className="lg:col-span-4 p-6 md:p-8 bg-card border border-foreground space-y-6">
          
          {/* Brief Profile Panel */}
          <div className="border border-foreground p-4 bg-background">
            <h3 className="font-mono text-[10px] uppercase tracking-wider text-primary font-bold mb-3">
              CALIBRATED SUBSCRIBER
            </h3>
            <div className="divide-y divide-foreground/10 font-mono text-xs">
              <div className="py-1.5 flex justify-between">
                <span className="text-muted-foreground">READER:</span>
                <span className="font-bold text-foreground">{profile.name.toUpperCase()}</span>
              </div>
              <div className="py-1.5 flex justify-between">
                <span className="text-muted-foreground">ROLE:</span>
                <span className="font-bold text-foreground">{profile.role.toUpperCase()}</span>
              </div>
              <div className="py-1.5 flex justify-between text-primary font-bold">
                <span>CLEARANCE:</span>
                <span>{profile.seniority.toUpperCase()}</span>
              </div>
            </div>
            <button 
              onClick={onOpenOnboarding}
              className="w-full mt-3 border border-foreground/30 hover:border-foreground py-1.5 font-mono text-[9px] uppercase font-bold transition-colors cursor-pointer"
            >
              [RE-CALIBRATE PROFILE]
            </button>
          </div>

          {/* Market context indices */}
          <div className="space-y-3">
            <h3 className="font-mono text-[10px] uppercase tracking-wider text-primary font-bold border-b border-foreground/10 pb-1">
              CONVERGENCE INDICATORS
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {MARKET_METRICS.slice(0, 4).map((metric) => {
                const isUp = metric.trend === "up";
                return (
                  <div key={metric.symbol} className="border border-foreground/10 p-2.5 bg-background flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <span className="font-mono text-[10px] font-bold">{metric.symbol}</span>
                      <span className={`font-mono text-[8px] font-bold flex items-center ${isUp ? "text-emerald-600" : "text-rose-600"}`}>
                        {metric.change}
                      </span>
                    </div>
                    <div className="mt-1.5">
                      <div className="font-mono text-xs font-black">{metric.value}</div>
                      <div className="text-[8px] text-muted-foreground truncate">{metric.name}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="border-t border-foreground/15 pt-4">
            <h3 className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground font-bold mb-1">
              EDITORIAL STATEMENT
            </h3>
            <p className="font-serif text-xs italic text-foreground/80 leading-relaxed">
              "SIGNAL does not aggregate. We rank and curate. We treat AI, Finance, and Semiconductors as a single converged ecosystem."
            </p>
          </div>

        </aside>

      </div>

      {/* INTERACTIVE SLIDE-OUT PANEL (Reveals full story analysis on trigger) */}
      <div 
        className={`fixed top-0 right-0 h-full w-full sm:w-[500px] md:w-[600px] bg-background border-l border-foreground shadow-2xl z-50 transform transition-transform duration-300 ease-out flex flex-col ${
          slideStoryId ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {activeSlideStory && (
          <div className="flex flex-col h-full">
            
            {/* Slide-out Header */}
            <div className="p-6 border-b border-foreground flex justify-between items-center bg-card">
              <div className="font-mono text-[10px] text-primary font-bold uppercase tracking-wider">
                DEEP DIVE // EXHIBIT {activeSlideStory.id.toUpperCase()}
              </div>
              <button 
                onClick={() => setSlideStoryId(null)}
                className="text-foreground hover:text-primary cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Slide-out Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
              
              {/* Depth switcher inside panel */}
              <div className="flex justify-between items-center border-b border-foreground/10 pb-3">
                <span className="font-mono text-[10px] uppercase font-bold text-muted-foreground">
                  INTEL DEPTH:
                </span>
                
                <div className="flex bg-background border border-foreground p-0.5">
                  {(["accessible", "briefed", "technical"] as const).map((level) => (
                    <button
                      key={level}
                      onClick={() => setDepth(level)}
                      className={`px-2.5 py-1 font-mono text-[9px] uppercase font-bold cursor-pointer transition-all ${
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

              {/* Title */}
              <div className="space-y-2">
                <div className="font-mono text-[10px] text-primary font-bold">
                  {activeSlideStory.sectors.join(" // ")}
                </div>
                <h2 className="font-serif text-2xl md:text-3xl font-black leading-tight text-foreground">
                  {activeSlideStory.title}
                </h2>
              </div>

              {/* Sourced Story Illustration */}
              {activeSlideStory.image && (
                <div className="relative aspect-[16/10] overflow-hidden border border-foreground bg-muted/10">
                  <img 
                    src={activeSlideStory.image} 
                    alt=""
                    className="object-cover w-full h-full filter grayscale contrast-110 hover:grayscale-0 transition-all duration-300"
                  />
                </div>
              )}

              {/* Content sections */}
              <div className="space-y-5 text-sm leading-relaxed text-foreground">
                <div>
                  <div className="font-mono text-[9px] uppercase tracking-wider text-primary font-bold mb-1">
                    I. EXECUTIVE BRIEF //
                  </div>
                  <p className="font-serif">
                    {activeSlideStory.depth[depth].summary}
                  </p>
                </div>

                <div className="bg-primary/5 p-4 border-l-2 border-primary">
                  <div className="font-mono text-[9px] uppercase tracking-wider text-primary font-bold mb-1">
                    II. CONVERGENCE INSIGHT //
                  </div>
                  <p className="font-serif italic text-foreground">
                    {"analysis" in activeSlideStory.depth[depth] ? (activeSlideStory.depth[depth] as any).analysis : activeSlideStory.depth[depth].summary}
                  </p>
                </div>

                {"dataPoints" in activeSlideStory.depth[depth] && (
                  <div>
                    <div className="font-mono text-[9px] uppercase tracking-wider text-primary font-bold mb-2">
                      III. SYSTEM METRICS //
                    </div>
                    <div className="grid grid-cols-2 gap-2 font-mono text-[10px]">
                      {(activeSlideStory.depth[depth] as any).dataPoints.map((dp: any, idx: number) => (
                        <div key={idx} className="border border-foreground p-2 bg-background">
                          <div className="text-[8px] text-muted-foreground uppercase">{dp.label}</div>
                          <div className="font-bold text-foreground mt-0.5">{dp.value}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="pt-3 border-t border-foreground/10">
                  <div className="font-mono text-[9px] uppercase tracking-wider text-primary font-bold mb-1">
                    IV. WHAT TO WATCH NEXT //
                  </div>
                  <p className="text-xs text-muted-foreground italic">
                    {activeSlideStory.depth[depth].whatToWatch}
                  </p>
                </div>
              </div>

            </div>

            {/* Slide-out Footer */}
            <div className="p-6 border-t border-foreground bg-card flex gap-4">
              <button 
                onClick={() => setSlideStoryId(null)}
                className="flex-1 bg-foreground text-background py-2 font-mono text-xs uppercase font-bold hover:bg-foreground/90 transition-colors cursor-pointer text-center"
              >
                Close Deep Dive
              </button>
            </div>

          </div>
        )}
      </div>

    </div>
  );
};
