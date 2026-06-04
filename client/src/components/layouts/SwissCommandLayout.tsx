import React, { useState } from "react";
import { useTheme } from "../../contexts/ThemeContext";
import { BriefingStory, MARKET_METRICS } from "../../lib/mockData";
import { ArrowUpRight, ArrowDownRight, Layers, Cpu, BarChart3, Database } from "lucide-react";

interface SwissCommandLayoutProps {
  stories: BriefingStory[];
  onOpenOnboarding: () => void;
}

export const SwissCommandLayout: React.FC<SwissCommandLayoutProps> = ({ stories, onOpenOnboarding }) => {
  const { depth, setDepth, profile } = useTheme();
  const [selectedStoryId, setSelectedStoryId] = useState<string | null>("story-1");

  const selectedStory = stories.find((s) => s.id === selectedStoryId) || stories[0];

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
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/10 selection:text-primary pb-24">
      
      {/* Swiss Masthead spanning full width */}
      <header className="border-b border-foreground p-6 md:px-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary font-bold">
              DAILY INTELLIGENCE BRIEFING
            </span>
            <h1 className="font-serif text-5xl md:text-7xl font-black tracking-tight leading-none text-foreground mt-1">
              SIGNAL
            </h1>
          </div>
          
          <div className="text-left md:text-right font-mono text-xs leading-relaxed text-muted-foreground">
            <div>EDITION: June 4, 2026</div>
            <div>PUBLISHED: 05:00 UTC</div>
            <div>PREPARED FOR: <span className="text-foreground font-bold underline decoration-solid decoration-primary">{profile.name.toUpperCase()}</span></div>
          </div>
        </div>

        {/* Volume & Sector indicators below */}
        <div className="max-w-7xl mx-auto border-t border-foreground/15 mt-6 pt-3 flex flex-wrap justify-between items-center gap-4 text-xs font-mono text-muted-foreground">
          <div>
            <span>VOLUME IV // ISSUE 156</span>
            <span className="mx-3">|</span>
            <span>TRACKED: <span className="text-foreground font-bold uppercase">{profile.sectors.join(" • ")}</span></span>
          </div>
          <button 
            onClick={onOpenOnboarding}
            className="text-primary hover:underline font-bold cursor-pointer"
          >
            [RE-CALIBRATE FEED PROFILE]
          </button>
        </div>
      </header>

      {/* Main split 2-panel workspace */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 border-b border-foreground">
        
        {/* LEFT PANEL: 55-60% width (lg:col-span-7) */}
        <main className="lg:col-span-7 border-r border-foreground p-6 md:p-8 space-y-6 overflow-y-auto max-h-[calc(100vh-180px)]">
          <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground border-b border-foreground/10 pb-2">
            RANKED STREAM
          </h2>

          <div className="divide-y divide-foreground/10">
            {stories.map((story, index) => {
              const isSelected = selectedStoryId === story.id;
              const score = getRelevanceScore(story);
              const isTop = index === 0;

              // Top story is expanded by default in left list if selected
              if (isTop && isSelected) {
                return (
                  <article 
                    key={story.id}
                    onClick={() => setSelectedStoryId(story.id)}
                    className="py-6 first:pt-0 cursor-pointer group space-y-4"
                  >
                    <div className="flex justify-between items-center font-mono text-[10px]">
                      <span className="text-primary font-bold tracking-wider">
                        RANK {index + 1} // {story.sectors.join(" • ")}
                      </span>
                      <span className="text-muted-foreground">
                        {story.readTime.toUpperCase()} // {story.sourceCount} SOURCES
                      </span>
                    </div>

                    <h3 className="font-serif text-2xl font-black text-foreground group-hover:text-primary transition-colors leading-tight">
                      {story.title}
                    </h3>

                    {/* Structured segments for the expanded left story */}
                    <div className="space-y-4 pt-2 border-t border-dashed border-foreground/10 text-sm">
                      <div>
                        <div className="font-mono text-[9px] uppercase tracking-wider text-primary font-bold mb-1">
                          THE CORE BRIEF //
                        </div>
                        <p className="font-serif leading-relaxed text-foreground">
                          {story.depth[depth].summary}
                        </p>
                      </div>

                      <div className="bg-primary/5 p-4 border-l-2 border-primary">
                        <div className="font-mono text-[9px] uppercase tracking-wider text-primary font-bold mb-1">
                          WHY IT MATTERS //
                        </div>
                        <p className="font-serif italic leading-relaxed text-foreground">
                          {"analysis" in story.depth[depth] ? (story.depth[depth] as any).analysis : story.depth[depth].summary}
                        </p>
                      </div>

                      {/* Bulleted Key Takeaways */}
                      <div>
                        <div className="font-mono text-[9px] uppercase tracking-wider text-primary font-bold mb-1">
                          KEY TAKEAWAYS //
                        </div>
                        <ul className="list-disc pl-4 space-y-1 text-xs text-foreground/90">
                          <li>Significant sovereign capital shifting toward local fabrication nodes.</li>
                          <li>Advanced lithography queue changes could disrupt hyperscaler planning.</li>
                          <li>Hardware-backed security standards likely to emerge as regulatory bottlenecks.</li>
                        </ul>
                      </div>

                      <div>
                        <div className="font-mono text-[9px] uppercase tracking-wider text-primary font-bold mb-1">
                          INDICATORS TO MONITOR //
                        </div>
                        <p className="text-xs italic text-muted-foreground">
                          {story.depth[depth].whatToWatch}
                        </p>
                      </div>
                    </div>
                  </article>
                );
              }

              // Collapsed stories below
              return (
                <article 
                  key={story.id}
                  onClick={() => setSelectedStoryId(story.id)}
                  className={`py-5 cursor-pointer group flex justify-between items-start gap-6 transition-all ${
                    isSelected ? "bg-secondary/20 -mx-4 px-4 border-l-2 border-primary" : ""
                  }`}
                >
                  <div className="space-y-1.5 min-w-0 flex-1">
                    <div className="flex items-center gap-2 font-mono text-[9px] text-muted-foreground flex-wrap">
                      <span className="text-primary font-bold">RANK {index + 1}</span>
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

                  <div className="shrink-0 text-right font-mono text-[10px] space-y-1">
                    <div className="bg-primary/10 text-primary font-bold px-2 py-0.5 border border-primary/20">
                      {score}% MATCH
                    </div>
                    <div className="text-muted-foreground text-[9px]">
                      {story.sourceCount} SRCs
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </main>

        {/* RIGHT PANEL: 40-45% width (lg:col-span-5) */}
        <aside className="lg:col-span-5 p-6 md:p-8 bg-card flex flex-col justify-between overflow-y-auto max-h-[calc(100vh-180px)]">
          
          {selectedStoryId ? (
            // State A: Story selected - show full detail and depth toggles
            <div className="space-y-6 animate-fade-in">
              
              {/* Depth Toggle */}
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
                  {selectedStory.sectors.join(" // ")}
                </div>
                <h2 className="font-serif text-2xl md:text-3xl font-black leading-tight text-foreground">
                  {selectedStory.title}
                </h2>
              </div>

              {/* Core Content */}
              <div className="space-y-5 text-sm leading-relaxed text-foreground">
                <div>
                  <div className="font-mono text-[9px] uppercase tracking-wider text-primary font-bold mb-1">
                    THE CORE BRIEF //
                  </div>
                  <p className="font-serif">
                    {selectedStory.depth[depth].summary}
                  </p>
                </div>

                <div className="bg-primary/5 p-4 border-l-2 border-primary">
                  <div className="font-mono text-[9px] uppercase tracking-wider text-primary font-bold mb-1">
                    WHY IT MATTERS //
                  </div>
                  <p className="font-serif italic text-foreground">
                    {"analysis" in selectedStory.depth[depth] ? (selectedStory.depth[depth] as any).analysis : selectedStory.depth[depth].summary}
                  </p>
                </div>

                {/* Bulleted Takeaways */}
                <div>
                  <div className="font-mono text-[9px] uppercase tracking-wider text-primary font-bold mb-1">
                    KEY TAKEAWAYS //
                  </div>
                  <ul className="list-disc pl-4 space-y-1.5 text-xs text-foreground/90">
                    <li>Cross-industry supply chain dependency mapped with 98% accuracy.</li>
                    <li>Sovereign capital injections shifting balance of lithography nodes.</li>
                    <li>Forward metrics indicate early yield stabilization across 2nm.</li>
                  </ul>
                </div>

                {/* Technical Telemetry if technical depth is selected */}
                {"dataPoints" in selectedStory.depth[depth] && (
                  <div>
                    <div className="font-mono text-[9px] uppercase tracking-wider text-primary font-bold mb-2">
                      TECHNICAL METRICS //
                    </div>
                    <div className="grid grid-cols-2 gap-2 font-mono text-[10px]">
                      {(selectedStory.depth[depth] as any).dataPoints.map((dp: any, idx: number) => (
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
                    {selectedStory.depth[depth].whatToWatch}
                  </p>
                </div>

                {/* Source attribution line */}
                <div className="font-mono text-[9px] text-muted-foreground pt-4 border-t border-dashed border-foreground/10">
                  SOURCE: {selectedStory.sourceCount} DECLASSIFIED INTEL CHANNELS
                </div>
              </div>

              {/* Close Detail button */}
              <button 
                onClick={() => setSelectedStoryId(null)}
                className="w-full border border-foreground py-2 font-mono text-xs uppercase font-bold hover:bg-foreground hover:text-background transition-colors cursor-pointer"
              >
                [Return to Overview]
              </button>

            </div>
          ) : (
            // State B: No story selected - show profile card, market context, and manifesto
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

              {/* The Convergence Manifesto */}
              <div className="border-t border-foreground/15 pt-6 space-y-2">
                <h3 className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground font-bold">
                  THE CONVERGENCE MANIFESTO
                </h3>
                <p className="font-serif text-sm italic text-foreground/80 leading-relaxed">
                  "SIGNAL is built on a single core truth: AI, Semiconductors, and Capital are no longer three siloed beats. They are one interconnected battlefield. We read everything so you don't have to."
                </p>
              </div>

            </div>
          )}

        </aside>

      </div>
    </div>
  );
};
