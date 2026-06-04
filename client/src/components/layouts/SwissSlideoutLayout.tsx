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

                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {story.depth[depth].summary}
                      </p>
                    </div>

                    <div className="shrink-0 text-right font-mono text-[9px] space-y-1">
                      <div className="bg-primary/10 text-primary font-bold px-1.5 py-0.5 border border-primary/20">
                        {score}% MATCH
                      </div>
                      <div className="text-muted-foreground">
                        {story.sourceCount} SRCs
                      </div>
                    </div>
                  </article>
                );
              }

              // Compact Tail (Rank 9+)
              return (
                <article 
                  key={story.id}
                  onClick={() => setSlideStoryId(story.id)}
                  className="py-3 cursor-pointer group flex justify-between items-center gap-4"
                >
                  <div className="flex items-center gap-4 min-w-0 flex-1">
                    <span className="font-mono text-xs font-bold text-muted-foreground w-6 text-center">
                      {index + 1}
                    </span>
                    <div className="min-w-0 flex-1">
                      <h4 className="font-serif text-sm font-bold text-foreground group-hover:text-primary transition-colors truncate">
                        {story.title}
                      </h4>
                      <p className="text-[11px] text-muted-foreground truncate">
                        {story.depth[depth].summary}
                      </p>
                    </div>
                  </div>

                  <div className="font-mono text-[9px] text-muted-foreground whitespace-nowrap shrink-0">
                    {score}% MATCH
                  </div>
                </article>
              );
            })}
          </div>
        </main>

        {/* RIGHT COLUMN: Static Sidebar (35% width) */}
        <aside className="lg:col-span-4 space-y-8 lg:border-l lg:border-foreground/10 lg:pl-8">
          
          {/* Onboarding Profile Card */}
          <div className="border border-foreground p-5 bg-card">
            <h3 className="font-mono text-[10px] uppercase tracking-wider text-primary font-bold mb-4">
              INTELLIGENCE PROFILE
            </h3>
            
            <table className="w-full font-mono text-xs border-collapse">
              <tbody>
                <tr className="border-b border-foreground/10">
                  <td className="py-2 text-muted-foreground">READER</td>
                  <td className="py-2 font-bold text-right">{profile.name.toUpperCase()}</td>
                </tr>
                <tr className="border-b border-foreground/10">
                  <td className="py-2 text-muted-foreground">ROLE</td>
                  <td className="py-2 font-bold text-right">{profile.role.toUpperCase()}</td>
                </tr>
                <tr className="border-b border-foreground/10">
                  <td className="py-2 text-muted-foreground">TRACKED</td>
                  <td className="py-2 font-bold text-right text-primary uppercase">{profile.sectors.join(", ")}</td>
                </tr>
              </tbody>
            </table>

            <button 
              onClick={onOpenOnboarding}
              className="w-full mt-4 border border-foreground py-2 font-mono text-[10px] font-bold uppercase hover:bg-foreground hover:text-background transition-colors cursor-pointer"
            >
              [Adjust Profile]
            </button>
          </div>

          {/* Market Context Indices */}
          <div className="space-y-4">
            <h3 className="font-mono text-[10px] uppercase tracking-wider text-primary font-bold border-b border-foreground/10 pb-1">
              MARKET CONTEXT
            </h3>
            <div className="flex flex-col gap-3">
              {MARKET_METRICS.slice(0, 5).map((metric) => {
                const isUp = metric.trend === "up";
                return (
                  <div key={metric.symbol} className="flex justify-between items-center border-b border-foreground/10 pb-2 last:border-0">
                    <div>
                      <div className="font-mono text-xs font-bold text-foreground">{metric.symbol}</div>
                      <div className="text-[10px] text-muted-foreground truncate max-w-[150px]">{metric.name}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono text-xs font-bold text-foreground">{metric.value}</div>
                      <div className={`font-mono text-[9px] flex items-center justify-end gap-0.5 ${
                        isUp ? "text-emerald-600" : "text-rose-600"
                      }`}>
                        {isUp ? <ArrowUpRight className="w-2.5 h-2.5" /> : <ArrowDownRight className="w-2.5 h-2.5" />}
                        {metric.change}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Editorial Manifesto Quote */}
          <div className="border-t-2 border-foreground pt-4">
            <p className="font-serif text-xs italic text-muted-foreground leading-relaxed">
              "The Financial Times had a baby with a Bloomberg terminal, raised it in Zurich, and taught it to speak directly to you."
            </p>
          </div>

        </aside>

      </div>

      {/* SLIDE-OUT DETAIL PANEL OVERLAY */}
      <div 
        className={`fixed top-0 right-0 h-full w-full sm:w-[500px] bg-background border-l border-foreground shadow-2xl z-50 transition-transform duration-300 ease-out transform ${
          slideStoryId ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {activeSlideStory && (
          <div className="h-full flex flex-col justify-between p-6 md:p-8 overflow-y-auto">
            
            <div className="space-y-6">
              {/* Slide-out header */}
              <div className="flex justify-between items-center border-b border-foreground/10 pb-4">
                <span className="font-mono text-[10px] text-primary font-bold">
                  {activeSlideStory.sectors.join(" // ")}
                </span>
                <button 
                  onClick={() => setSlideStoryId(null)}
                  className="p-1 hover:bg-secondary rounded-sm transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5 text-foreground" />
                </button>
              </div>

              {/* Depth Selector */}
              <div className="flex bg-secondary p-0.5 border border-foreground">
                {(["accessible", "briefed", "technical"] as const).map((level) => (
                  <button
                    key={level}
                    onClick={() => setDepth(level)}
                    className={`flex-1 py-1 text-center font-mono text-[9px] uppercase font-bold transition-all cursor-pointer ${
                      depth === level
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>

              {/* Story Title */}
              <h2 className="font-serif text-2xl md:text-3xl font-black leading-tight text-foreground">
                {activeSlideStory.title}
              </h2>

              {/* Full structured contents */}
              <div className="space-y-5 text-sm leading-relaxed text-foreground">
                <div>
                  <div className="font-mono text-[9px] uppercase tracking-wider text-primary font-bold mb-1">
                    THE CORE BRIEF //
                  </div>
                  <p className="font-serif">
                    {activeSlideStory.depth[depth].summary}
                  </p>
                </div>

                <div className="bg-primary/5 p-4 border-l-2 border-primary">
                  <div className="font-mono text-[9px] uppercase tracking-wider text-primary font-bold mb-1">
                    SITUATIONAL ANALYSIS //
                  </div>
                  <p className="font-serif italic text-foreground">
                    {"analysis" in activeSlideStory.depth[depth] ? (activeSlideStory.depth[depth] as any).analysis : activeSlideStory.depth[depth].summary}
                  </p>
                </div>

                {/* Takeaways */}
                <div>
                  <div className="font-mono text-[9px] uppercase tracking-wider text-primary font-bold mb-1">
                    KEY TAKEAWAYS //
                  </div>
                  <ul className="list-disc pl-4 space-y-1.5 text-xs text-foreground/90">
                    <li>Dynamic re-ranking model achieves 98% user preference alignment.</li>
                    <li>Sovereign capital injections shifting balance of lithography nodes.</li>
                    <li>Forward metrics indicate early yield stabilization across 2nm.</li>
                  </ul>
                </div>

                {/* Technical details if technical depth is selected */}
                {"dataPoints" in activeSlideStory.depth[depth] && (
                  <div>
                    <div className="font-mono text-[9px] uppercase tracking-wider text-primary font-bold mb-2">
                      METRIC TELEMETRY //
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
                    INDICATORS TO MONITOR //
                  </div>
                  <p className="text-xs text-muted-foreground italic">
                    {activeSlideStory.depth[depth].whatToWatch}
                  </p>
                </div>
              </div>
            </div>

            {/* Slide-out footer */}
            <div className="mt-8 pt-4 border-t border-foreground/10 flex justify-between items-center text-[10px] font-mono text-muted-foreground">
              <span>{activeSlideStory.readTime.toUpperCase()}</span>
              <span>{activeSlideStory.sourceCount} SOURCES ANALYZE</span>
            </div>

          </div>
        )}
      </div>

    </div>
  );
};
