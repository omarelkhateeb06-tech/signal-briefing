import React, { useState } from "react";
import { useTheme } from "../../contexts/ThemeContext";
import { BriefingStory, MARKET_METRICS } from "../../lib/mockData";
import { ArrowUpRight, ArrowDownRight, Sparkles } from "lucide-react";

interface SwissDossierLayoutProps {
  stories: BriefingStory[];
  onOpenOnboarding: () => void;
}

export const SwissDossierLayout: React.FC<SwissDossierLayoutProps> = ({ stories, onOpenOnboarding }) => {
  const { depth, setDepth, profile } = useTheme();
  const [activeStoryId, setActiveStoryId] = useState<string>("story-1");

  const activeStory = stories.find((s) => s.id === activeStoryId) || stories[0];

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
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/10 selection:text-primary pb-32">
      
      {/* Classified Document Header Masthead */}
      <header className="border-b border-foreground p-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground font-bold">
              DAILY INTELLIGENCE BRIEFING // CLASSIFIED DOCUMENT
            </span>
            <h1 className="font-serif text-6xl md:text-8xl font-black tracking-tighter leading-none text-foreground mt-2">
              SIGNAL
            </h1>
          </div>
          
          <div className="text-left md:text-right font-mono text-xs leading-relaxed text-muted-foreground space-y-1">
            <div>EDITION: JUNE 4, 2026</div>
            <div>COMPILATION TIME: 05:00 UTC</div>
            <div>COMPILED FOR: <span className="text-foreground font-bold underline decoration-solid decoration-primary">{profile.name.toUpperCase()}</span></div>
          </div>
        </div>

        {/* Thin black rule grounding volume and sector indicators */}
        <div className="border-t border-foreground mt-6 pt-3 flex flex-wrap justify-between items-center gap-4 text-xs font-mono text-muted-foreground">
          <div>
            <span>VOL. IV // SEC_CHANNELS_ACTIVE</span>
            <span className="mx-3">•</span>
            <span>TRACKING: <span className="text-foreground font-bold uppercase">{profile.sectors.join(" • ")}</span></span>
          </div>
          <button 
            onClick={onOpenOnboarding}
            className="text-primary hover:underline font-bold cursor-pointer"
          >
            [RE-CALIBRATE PROFILES]
          </button>
        </div>
      </header>

      {/* Main 2-column feed layout */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 md:p-12 items-start">
        
        {/* PRIMARY COLUMN (Left, wider - 60% width) */}
        <main className="lg:col-span-7 space-y-8">
          <div className="border-b border-foreground pb-2 flex justify-between items-center">
            <h2 className="font-serif text-xl font-black italic">Ranked Exhibition Stream</h2>
            <span className="font-mono text-[10px] text-muted-foreground">CURATED TEN-PAGE BRIEF</span>
          </div>

          <div className="divide-y divide-foreground/15">
            {stories.map((story, index) => {
              const isActive = story.id === activeStoryId;
              const score = getRelevanceScore(story);
              const isTop = index === 0;

              // The top story is fully expanded with descriptive Roman numeral sections
              if (isTop) {
                return (
                  <article 
                    key={story.id}
                    onClick={() => setActiveStoryId(story.id)}
                    className="py-8 first:pt-0 cursor-pointer group space-y-5"
                  >
                    <div className="flex justify-between items-center font-mono text-[10px]">
                      <span className="text-primary font-bold">
                        EXHIBIT I // RANK {index + 1}
                      </span>
                      <span className="text-muted-foreground">
                        {story.readTime.toUpperCase()} // {story.sourceCount} DECLASSIFIED SOURCES
                      </span>
                    </div>

                    <h3 className="font-serif text-3xl font-black text-foreground group-hover:text-primary transition-colors leading-tight">
                      {story.title}
                    </h3>

                    {/* Exhibition Sections */}
                    <div className="space-y-6 pt-4 border-t border-foreground/10 text-sm leading-relaxed">
                      <div>
                        <div className="font-mono text-[9px] uppercase tracking-wider text-primary font-bold mb-1">
                          I. CORE THESIS
                        </div>
                        <p className="font-serif">
                          {story.depth[depth].summary}
                        </p>
                      </div>

                      {/* Lightly tinted block with a strong left border signaling high-value analysis */}
                      <div className="bg-primary/5 p-4 border-l-4 border-primary">
                        <div className="font-mono text-[9px] uppercase tracking-wider text-primary font-bold mb-1">
                          II. CONVERGENCE ANALYSIS
                        </div>
                        <p className="font-serif italic text-foreground">
                          {"analysis" in story.depth[depth] ? (story.depth[depth] as any).analysis : story.depth[depth].summary}
                        </p>
                      </div>

                      <div>
                        <div className="font-mono text-[9px] uppercase tracking-wider text-primary font-bold mb-1">
                          III. OPERATIONAL TAKEAWAYS
                        </div>
                        <ul className="list-disc pl-4 space-y-1 text-xs text-foreground/90">
                          <li>Fabrication node capital shift bypasses traditional trade corridors.</li>
                          <li>Hyperscaler lithography queue alterations trigger risk-mitigation.</li>
                        </ul>
                      </div>

                      <div>
                        <div className="font-mono text-[9px] uppercase tracking-wider text-primary font-bold mb-1">
                          IV. FORWARD INDICATORS
                        </div>
                        <p className="text-xs italic text-muted-foreground">
                          {story.depth[depth].whatToWatch}
                        </p>
                      </div>
                    </div>
                  </article>
                );
              }

              // Stories below are collapsed with realistically varying metadata
              return (
                <article 
                  key={story.id}
                  onClick={() => setActiveStoryId(story.id)}
                  className={`py-5 cursor-pointer group flex justify-between items-start gap-6 transition-all ${
                    isActive ? "bg-secondary/20 -mx-4 px-4 border-l-2 border-primary" : ""
                  }`}
                >
                  <div className="space-y-1.5 min-w-0 flex-1">
                    <div className="flex items-center gap-2 font-mono text-[9px] text-muted-foreground flex-wrap">
                      <span className="text-primary font-bold">EXHIBIT 0{index + 1}</span>
                      <span>•</span>
                      <span className="uppercase">{story.sectors.join(" • ")}</span>
                      <span>•</span>
                      <span>{story.readTime}</span>
                    </div>

                    <h3 className="font-serif text-lg font-bold leading-snug text-foreground group-hover:text-primary transition-colors">
                      {story.title}
                    </h3>

                    <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                      {story.depth[depth].summary}
                    </p>
                  </div>

                  <div className="shrink-0 text-right font-mono text-[9px] space-y-1">
                    <div className="bg-primary/10 text-primary font-bold px-2 py-0.5 border border-primary/20">
                      {score}% MATCH
                    </div>
                    <div className="text-muted-foreground text-[8px]">
                      {story.sourceCount} DECLASSIFIED SRCs
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </main>

        {/* SECONDARY COLUMN (Right, narrower - 40% width) */}
        <aside className="lg:col-span-5 p-6 md:p-8 bg-card border border-foreground flex flex-col justify-between overflow-y-auto max-h-[calc(100vh-180px)]">
          
          {activeStoryId ? (
            // State A: Story selected - transitions to show full story detail and depth switcher
            <div className="space-y-6 animate-fade-in">
              
              {/* Interactive Depth Selector */}
              <div className="flex justify-between items-center border-b border-foreground/10 pb-3">
                <span className="font-mono text-[10px] uppercase font-bold text-muted-foreground">
                  DOSSIER DEPTH:
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

              {/* Title & Category */}
              <div className="space-y-2">
                <div className="font-mono text-[10px] text-primary font-bold">
                  {activeStory.sectors.join(" // ")}
                </div>
                <h2 className="font-serif text-2xl md:text-3xl font-black leading-tight text-foreground">
                  {activeStory.title}
                </h2>
              </div>

              {/* Story Content details */}
              <div className="space-y-5 text-sm leading-relaxed text-foreground">
                <div>
                  <div className="font-mono text-[9px] uppercase tracking-wider text-primary font-bold mb-1">
                    I. CORE THESIS
                  </div>
                  <p className="font-serif">
                    {activeStory.depth[depth].summary}
                  </p>
                </div>

                <div className="bg-primary/5 p-4 border-l-4 border-primary">
                  <div className="font-mono text-[9px] uppercase tracking-wider text-primary font-bold mb-1">
                    II. CONVERGENCE ANALYSIS
                  </div>
                  <p className="font-serif italic text-foreground">
                    {"analysis" in activeStory.depth[depth] ? (activeStory.depth[depth] as any).analysis : activeStory.depth[depth].summary}
                  </p>
                </div>

                {/* Takeaways */}
                <div>
                  <div className="font-mono text-[9px] uppercase tracking-wider text-primary font-bold mb-1">
                    III. OPERATIONAL TAKEAWAYS
                  </div>
                  <ul className="list-disc pl-4 space-y-1.5 text-xs text-foreground/90">
                    <li>Sovereign capital injections shifting balance of lithography nodes.</li>
                    <li>Forward metrics indicate early yield stabilization across 2nm.</li>
                  </ul>
                </div>

                {/* Technical telemetry metrics */}
                {"dataPoints" in activeStory.depth[depth] && (
                  <div>
                    <div className="font-mono text-[9px] uppercase tracking-wider text-primary font-bold mb-2">
                      IV. TELEMETRY METRICS
                    </div>
                    <div className="grid grid-cols-2 gap-2 font-mono text-[10px]">
                      {(activeStory.depth[depth] as any).dataPoints.map((dp: any, idx: number) => (
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
                    V. FORWARD INDICATORS
                  </div>
                  <p className="text-xs text-muted-foreground italic">
                    {activeStory.depth[depth].whatToWatch}
                  </p>
                </div>
              </div>

              {/* Close Detail button */}
              <button 
                onClick={() => setActiveStoryId("")}
                className="w-full border border-foreground py-2 font-mono text-xs uppercase font-bold hover:bg-foreground hover:text-background transition-colors cursor-pointer"
              >
                [Return to Overview]
              </button>

            </div>
          ) : (
            // State B: Default State - show profile, market context, and editorial manifesto
            <div className="space-y-8 animate-fade-in">
              
              {/* Profile Card */}
              <div className="border border-foreground p-4 bg-background">
                <h3 className="font-mono text-[10px] uppercase tracking-wider text-primary font-bold mb-3">
                  INTELLIGENCE PROFILE
                </h3>
                <div className="divide-y divide-foreground/10 font-mono text-xs">
                  <div className="py-2 flex justify-between">
                    <span className="text-muted-foreground">READER:</span>
                    <span className="font-bold text-foreground">{profile.name.toUpperCase()}</span>
                  </div>
                  <div className="py-2 flex justify-between">
                    <span className="text-muted-foreground">ROLE:</span>
                    <span className="font-bold text-foreground">{profile.role.toUpperCase()}</span>
                  </div>
                  <div className="py-2 flex justify-between">
                    <span className="text-muted-foreground">CLEARANCE:</span>
                    <span className="font-bold text-primary">{profile.seniority.toUpperCase()}</span>
                  </div>
                  <div className="py-2 flex justify-between">
                    <span className="text-muted-foreground">SECTORS:</span>
                    <span className="font-bold text-foreground truncate max-w-[180px]">{profile.sectors.join(", ")}</span>
                  </div>
                </div>
              </div>

              {/* Market Context */}
              <div className="space-y-3">
                <h3 className="font-mono text-[10px] uppercase tracking-wider text-primary font-bold border-b border-foreground/10 pb-1">
                  MARKET CONTEXT
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {MARKET_METRICS.slice(0, 4).map((metric) => {
                    const isUp = metric.trend === "up";
                    return (
                      <div key={metric.symbol} className="border border-foreground/10 p-3 bg-background flex flex-col justify-between">
                        <div className="flex justify-between items-start">
                          <span className="font-mono text-xs font-bold">{metric.symbol}</span>
                          <span className={`font-mono text-[9px] font-bold flex items-center ${isUp ? "text-emerald-600" : "text-rose-600"}`}>
                            {isUp ? <ArrowUpRight className="w-2.5 h-2.5" /> : <ArrowDownRight className="w-2.5 h-2.5" />}
                            {metric.change}
                          </span>
                        </div>
                        <div className="mt-2">
                          <div className="font-mono text-xs font-black">{metric.value}</div>
                          <div className="text-[8px] text-muted-foreground truncate">{metric.name}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Manifesto Quote */}
              <div className="border-t border-foreground/15 pt-6 space-y-2">
                <h3 className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground font-bold">
                  THE CONVERGENCE MANIFESTO
                </h3>
                <p className="font-serif text-sm italic text-foreground/80 leading-relaxed">
                  "SIGNAL reads everything so you don't have to. Every day, we surface the genuinely consequential stories — ranked by relevance to your specific role."
                </p>
              </div>

            </div>
          )}

        </aside>

      </div>
    </div>
  );
};
