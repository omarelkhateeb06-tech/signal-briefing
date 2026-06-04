import React, { useState } from "react";
import { useTheme } from "../../contexts/ThemeContext";
import { BriefingStory, MARKET_METRICS } from "../../lib/mockData";
import { ArrowUpRight, ArrowDownRight, Layers } from "lucide-react";

interface ExecutorLayoutProps {
  stories: BriefingStory[];
  onOpenOnboarding: () => void;
}

export const ExecutorLayout: React.FC<ExecutorLayoutProps> = ({ stories, onOpenOnboarding }) => {
  const { depth, setDepth, profile } = useTheme();
  const [expandedStoryId, setExpandedStoryId] = useState<string | null>("story-1");

  const toggleStory = (id: string) => {
    setExpandedStoryId(expandedStoryId === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans max-w-7xl mx-auto px-6 md:px-12 py-10 selection:bg-primary/10 selection:text-primary">
      
      {/* Premium Original Swiss Masthead */}
      <header className="pb-8 mb-8 border-b border-border">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-primary font-bold">
              DAILY INTELLIGENCE BRIEFING
            </span>
            <h1 className="font-serif text-5xl md:text-7xl font-black tracking-tight leading-none text-foreground mt-1">
              SIGNAL
            </h1>
          </div>
          
          <div className="text-left md:text-right font-mono text-xs leading-relaxed text-muted-foreground">
            <div>VOLUME_04.06.2026</div>
            <div>COMPILED_AT: 05:00 UTC</div>
            <div>FOR: <span className="text-foreground font-bold underline decoration-dotted">{profile.name.toUpperCase()}</span></div>
          </div>
        </div>

        {/* Dynamic Navigation Row with Dropdown Popover */}
        <div className="border-t border-border mt-6 pt-4 flex flex-wrap justify-between items-center gap-4 text-xs font-mono text-muted-foreground">
          <div className="flex items-center gap-4">
            <span>SECTORS: <span className="text-foreground font-bold uppercase">{profile.sectors.join(" • ")}</span></span>
            <span>|</span>
            <span>ROLE: <span className="text-foreground font-bold uppercase">{profile.role}</span></span>
          </div>
          
          <button 
            onClick={onOpenOnboarding}
            className="text-primary hover:underline flex items-center gap-1 font-bold cursor-pointer"
          >
            [RE-CALIBRATE PROFILE] <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* Main split grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Column: Briefing stream */}
        <main className="lg:col-span-8 space-y-8">
          <div className="border-b border-border pb-3 flex justify-between items-center">
            <h2 className="font-serif text-xl font-bold italic">Curated Stream</h2>
            
            {/* Global depth level toggles */}
            <div className="flex items-center gap-1 bg-secondary/50 p-0.5 border border-border">
              {(["accessible", "briefed", "technical"] as const).map((level) => (
                <button
                  key={level}
                  onClick={() => setDepth(level)}
                  className={`px-3 py-1 text-[10px] font-mono uppercase tracking-tight transition-all cursor-pointer ${
                    depth === level
                      ? "bg-primary text-primary-foreground font-bold"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          <div className="divide-y divide-border">
            {stories.map((story, index) => {
              const isExpanded = expandedStoryId === story.id;
              return (
                <article 
                  key={story.id} 
                  className="py-6 first:pt-0 last:pb-0"
                >
                  <div 
                    onClick={() => toggleStory(story.id)}
                    className="group cursor-pointer space-y-2"
                  >
                    <div className="flex justify-between items-center font-mono text-[10px]">
                      <span className="text-primary font-bold">
                        EXHIBIT_0{index + 1}
                      </span>
                      <span className="text-muted-foreground">
                        {story.readTime.toUpperCase()} // {story.sourceCount} DECLASSIFIED SOURCES
                      </span>
                    </div>

                    <h3 className="font-serif text-xl md:text-2xl font-black text-foreground group-hover:text-primary transition-colors leading-tight">
                      {story.title}
                    </h3>
                    
                    {!isExpanded && (
                      <p className="text-muted-foreground text-sm line-clamp-2">
                        {story.depth[depth].summary}
                      </p>
                    )}
                  </div>

                  {isExpanded && (
                    <div className="mt-4 pt-4 border-t border-dashed border-border animate-fade-in space-y-4">
                      
                      <div className="space-y-1">
                        <h4 className="font-mono text-[9px] uppercase tracking-wider text-primary font-bold">
                          I. THE CONVERGENCE SUMMARY
                        </h4>
                        <p className="text-base leading-relaxed text-foreground font-serif">
                          {story.depth[depth].summary}
                        </p>
                      </div>

                      {"analysis" in story.depth[depth] && (
                        <div className="space-y-1 bg-secondary/30 p-4 border-l-2 border-primary">
                          <h4 className="font-mono text-[9px] uppercase tracking-wider text-primary font-bold">
                            II. SITUATIONAL ANALYSIS
                          </h4>
                          <p className="text-sm leading-relaxed text-foreground">
                            {(story.depth[depth] as any).analysis}
                          </p>
                        </div>
                      )}

                      {"dataPoints" in story.depth[depth] && (
                        <div className="space-y-2">
                          <h4 className="font-mono text-[9px] uppercase tracking-wider text-primary font-bold">
                            III. HARDWARE METRICS
                          </h4>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-xs">
                            {(story.depth[depth] as any).dataPoints.map((dp: any, idx: number) => (
                              <div key={idx} className="border border-border p-2 bg-background">
                                <div className="text-[9px] text-muted-foreground uppercase">{dp.label}</div>
                                <div className="font-bold text-foreground mt-0.5">{dp.value}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="pt-3 border-t border-border">
                        <h4 className="font-mono text-[9px] uppercase tracking-wider text-primary font-bold mb-1">
                          IV. FORWARD INDICATORS
                        </h4>
                        <p className="text-sm leading-relaxed text-foreground italic">
                          {story.depth[depth].whatToWatch}
                        </p>
                      </div>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </main>

        {/* Right Column: Sidebar */}
        <aside className="lg:col-span-4 space-y-8 lg:border-l lg:border-border lg:pl-10">
          {/* Indices */}
          <div>
            <h3 className="font-serif text-lg font-bold mb-4 text-foreground border-b border-border pb-1">
              Market Indices
            </h3>
            <div className="flex flex-col gap-3">
              {MARKET_METRICS.map((metric) => (
                <div key={metric.symbol} className="flex justify-between items-center border-b border-border pb-2 last:border-0">
                  <div>
                    <div className="font-mono text-xs font-bold text-foreground">{metric.symbol}</div>
                    <div className="text-[10px] text-muted-foreground truncate max-w-[150px]">{metric.name}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono text-xs font-bold text-foreground">{metric.value}</div>
                    <div className={`font-mono text-[10px] flex items-center justify-end gap-0.5 ${
                      metric.trend === "up" ? "text-emerald-600" : "text-rose-600"
                    }`}>
                      {metric.trend === "up" ? <ArrowUpRight className="w-2.5 h-2.5" /> : <ArrowDownRight className="w-2.5 h-2.5" />}
                      {metric.change}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Editorial */}
          <div className="border-t-2 border-foreground pt-4">
            <h3 className="font-serif text-xs font-bold uppercase tracking-wider text-foreground mb-2">
              THE CONVERGENCE PROMISE
            </h3>
            <p className="font-serif text-xs italic text-muted-foreground leading-relaxed">
              "We read everything so you don't have to. Every day, we surface the consequential signals that matter to your role."
            </p>
          </div>
        </aside>

      </div>
    </div>
  );
};
