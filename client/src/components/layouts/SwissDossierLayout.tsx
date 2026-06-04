import React, { useState } from "react";
import { useTheme } from "../../contexts/ThemeContext";
import { BriefingStory, MARKET_METRICS } from "../../lib/mockData";
import { ArrowUpRight, ArrowDownRight, Folder, Layers, FileText, Compass, Award } from "lucide-react";

interface SwissDossierLayoutProps {
  stories: BriefingStory[];
  onOpenOnboarding: () => void;
}

export const SwissDossierLayout: React.FC<SwissDossierLayoutProps> = ({ stories, onOpenOnboarding }) => {
  const { depth, setDepth, profile } = useTheme();
  const [expandedStoryId, setExpandedStoryId] = useState<string | null>("story-1");

  const toggleStory = (id: string) => {
    setExpandedStoryId(expandedStoryId === id ? null : id);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans max-w-[1300px] mx-auto px-4 md:px-8 py-6 selection:bg-primary/20 selection:text-primary">
      
      {/* Tactile Dossier Folder Tab at top */}
      <div className="flex justify-between items-end mb-1 border-b-[1.5px] border-foreground/90">
        {/* Physical tab folder graphic */}
        <div className="bg-card border-t-[1.5px] border-x-[1.5px] border-foreground/90 px-6 py-2.5 rounded-t-md relative -mb-[1.5px] z-10 flex items-center gap-2">
          <Folder className="w-3.5 h-3.5 text-primary" />
          <span className="font-mono text-[10px] font-bold tracking-widest text-foreground uppercase">
            SWISS_DOSSIER // DECLASSIFIED
          </span>
        </div>
        
        {/* Classification classification stamps */}
        <div className="hidden sm:flex gap-3 mb-1">
          <div className="hybrid-stamp-red">
            EYES ONLY
          </div>
          <div className="font-mono text-[10px] text-muted-foreground uppercase self-center">
            CLASS: SECURE_INTEL
          </div>
        </div>
      </div>

      {/* Main Masthead Grid */}
      <header className="pb-6 mb-6 border-b border-foreground/10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mt-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-primary font-bold mb-1">
              DAILY CONVERGENCE BRIEFING
            </p>
            <h1 className="font-serif text-5xl md:text-7xl font-black tracking-tight leading-none text-foreground">
              SIGNAL
            </h1>
          </div>
          
          {/* Archivist style typewriter metadata */}
          <div className="text-left md:text-right font-mono text-[10px] leading-relaxed text-muted-foreground">
            <div>FILE_NO: #04.06.2026-CONV</div>
            <div>RECORDED_AT: 05:00 UTC // TAIWAN_FAB_FAB12</div>
            <div>INTEL_FOR: <span className="text-foreground font-bold underline decoration-dotted">{profile.name.toUpperCase()}</span></div>
          </div>
        </div>

        {/* Navigation / Preference Trigger Bar */}
        <div className="border-t border-foreground/10 mt-4 pt-3 flex flex-wrap justify-between items-center text-[10px] font-mono text-muted-foreground">
          <div className="flex items-center gap-4">
            <span>SECTORS: <span className="text-foreground font-bold uppercase">{profile.sectors.join(" • ")}</span></span>
            <span>|</span>
            <span>ROLE: <span className="text-foreground font-bold uppercase">{profile.role}</span></span>
          </div>
          <button 
            onClick={onOpenOnboarding}
            className="text-primary hover:underline flex items-center gap-1 font-bold cursor-pointer"
          >
            [ RE-CALIBRATE PREFERENCES ] <ArrowUpRight className="w-3 h-3" />
          </button>
        </div>
      </header>

      {/* Main Content Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Main Briefing Feed */}
        <main className="lg:col-span-8 flex flex-col">
          {/* Controls Bar */}
          <div className="border-b border-foreground/20 pb-3 mb-6 flex justify-between items-center">
            <h2 className="font-serif text-xl font-bold italic text-foreground">
              Curated Convergence Feed
            </h2>
            
            {/* Depth selector tabs */}
            <div className="flex items-center gap-1 bg-secondary/50 p-0.5 border border-border">
              {(["accessible", "briefed", "technical"] as const).map((level) => (
                <button
                  key={level}
                  onClick={() => setDepth(level)}
                  className={`px-3 py-1 text-[10px] font-mono uppercase tracking-tight transition-all cursor-pointer ${
                    depth === level
                      ? "bg-foreground text-background font-bold"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          {/* Stories list */}
          <div className="flex flex-col">
            {stories.length === 0 ? (
              <div className="py-12 text-center border border-dashed border-border font-mono text-xs text-muted-foreground">
                [!] NO DATA PACKETS RETURNED FOR THE CURRENT SECTOR MATRIX.
              </div>
            ) : (
              stories.map((story, index) => {
                const isExpanded = expandedStoryId === story.id;
                const score = story.relevanceScores[profile.seniority === "executive" ? "executive" : profile.role.toLowerCase().includes("analyst") ? "analyst" : profile.role.toLowerCase().includes("founder") ? "founder" : "general"] || story.relevanceScores.general;

                return (
                  <article 
                    key={story.id} 
                    className="border-b border-foreground/10 pb-6 mb-6 last:border-0 last:pb-0"
                  >
                    {/* Story Header */}
                    <div 
                      onClick={() => toggleStory(story.id)}
                      className="group cursor-pointer flex flex-col gap-2"
                    >
                      <div className="flex justify-between items-start gap-4">
                        <div className="flex flex-wrap gap-2 items-center font-mono text-[10px]">
                          <span className="text-primary font-bold border border-primary/30 px-1.5 py-0.5">
                            EXHIBIT_0{index + 1}
                          </span>
                          <span className="text-muted-foreground">
                            {story.readTime.toUpperCase()}
                          </span>
                          <span className="text-muted-foreground">•</span>
                          <span className="text-muted-foreground">
                            {story.sourceCount} DECLASSIFIED SOURCES
                          </span>
                        </div>
                        
                        {/* Relevance match rate */}
                        <div className="flex items-center gap-1.5 font-mono text-[10px]">
                          <span className="text-muted-foreground hidden sm:inline">MATCH_RTG:</span>
                          <span className="font-bold text-foreground bg-primary/10 px-1.5 py-0.5 border border-primary/20">
                            {score}%
                          </span>
                        </div>
                      </div>

                      <h3 className="font-serif text-xl md:text-2xl font-extrabold text-foreground group-hover:text-primary transition-colors leading-tight">
                        {story.title}
                      </h3>
                      
                      {/* Short Preview */}
                      {!isExpanded && (
                        <p className="text-muted-foreground text-sm line-clamp-2 mt-1">
                          {story.depth[depth].summary}
                        </p>
                      )}
                    </div>

                    {/* Expanded Content with Archivist touches */}
                    {isExpanded && (
                      <div className="mt-4 pt-4 border-t border-dashed border-foreground/10 animate-fade-in space-y-5">
                        
                        {/* Summary Section (Highlighter highlight) */}
                        <div className="space-y-1.5">
                          <h4 className="font-mono text-[10px] uppercase tracking-wider text-primary font-bold">
                            I. EXECUTIVE COMPILATION
                          </h4>
                          <p className="text-base leading-relaxed text-foreground font-serif archivist-highlight">
                            {story.depth[depth].summary}
                          </p>
                        </div>

                        {/* Analysis Section (Cream card container) */}
                        {"analysis" in story.depth[depth] && (
                          <div className="space-y-1.5 bg-secondary/30 p-4 border-l-2 border-primary">
                            <h4 className="font-mono text-[10px] uppercase tracking-wider text-primary font-bold">
                              II. CONVERGENCE ANALYSIS
                            </h4>
                            <p className="text-sm leading-relaxed text-foreground">
                              {(story.depth[depth] as any).analysis}
                            </p>
                          </div>
                        )}

                        {/* Technical Data Points (Hard technical grid) */}
                        {"dataPoints" in story.depth[depth] && (
                          <div className="space-y-2">
                            <h4 className="font-mono text-[10px] uppercase tracking-wider text-primary font-bold">
                              III. SYSTEM TELEMETRY VECTORS
                            </h4>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-xs">
                              {(story.depth[depth] as any).dataPoints.map((dp: any, idx: number) => (
                                <div key={idx} className="border border-border p-2 bg-secondary/10">
                                  <div className="text-[9px] text-muted-foreground uppercase">{dp.label}</div>
                                  <div className="font-bold text-foreground mt-0.5 underline decoration-primary/20">{dp.value}</div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Architectural Impact */}
                        {"architecturalImpact" in story.depth[depth] && (
                          <div className="space-y-1.5">
                            <h4 className="font-mono text-[10px] uppercase tracking-wider text-primary font-bold">
                              IV. HARDWARE ARCHITECTURAL IMPACT
                            </h4>
                            <p className="text-sm leading-relaxed text-foreground italic border-l-2 border-border pl-3">
                              {(story.depth[depth] as any).architecturalImpact}
                            </p>
                          </div>
                        )}

                        {/* Bullet Points */}
                        {"bulletPoints" in story.depth[depth] && (
                          <div className="space-y-1.5">
                            <h4 className="font-mono text-[10px] uppercase tracking-wider text-primary font-bold">
                              V. OPERATIONAL TAKEAWAYS
                            </h4>
                            <ul className="list-disc pl-5 text-sm space-y-1 text-foreground">
                              {(story.depth[depth] as any).bulletPoints.map((pt: string, idx: number) => (
                                <li key={idx}>{pt}</li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* What to Watch */}
                        <div className="mt-4 pt-3 border-t border-border">
                          <h4 className="font-mono text-[10px] uppercase tracking-wider text-primary font-bold mb-1">
                            VI. FORWARD CRITICAL INDICATORS
                          </h4>
                          <p className="text-sm leading-relaxed text-foreground italic">
                            {story.depth[depth].whatToWatch}
                          </p>
                        </div>

                        {/* Sector tags */}
                        <div className="flex gap-2 mt-4">
                          {story.sectors.map((sec) => (
                            <span 
                              key={sec}
                              className="font-mono text-[9px] uppercase tracking-widest text-primary border border-primary/20 px-2 py-0.5 font-bold"
                            >
                              {sec}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </article>
                );
              })
            )}
          </div>
        </main>

        {/* Right: Sidebar */}
        <aside className="lg:col-span-4 flex flex-col gap-6 lg:border-l lg:border-foreground/10 lg:pl-8">
          
          {/* Calibration Profile stamp */}
          <div className="border border-foreground/10 p-4 bg-secondary/20 relative overflow-hidden">
            {/* Corner diagonal stamp */}
            <div className="absolute -top-1 -right-3 bg-primary/10 border border-primary/20 text-primary font-mono text-[8px] uppercase font-bold tracking-wider px-3 py-0.5 rotate-12">
              CONFIDENTIAL
            </div>

            <h3 className="font-serif text-lg font-bold mb-2 text-foreground">
              Intelligence Profile
            </h3>
            <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
              SIGNAL's algorithms have re-ranked and compiled this dossier for your credentials:
            </p>
            <div className="space-y-2 font-mono text-[10px]">
              <div className="flex justify-between py-1 border-b border-border">
                <span className="text-muted-foreground">RECIPIENT:</span>
                <span className="font-bold text-foreground">{profile.name.toUpperCase()}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-border">
                <span className="text-muted-foreground">OPERATIONAL ROLE:</span>
                <span className="font-bold text-foreground">{profile.role.toUpperCase()}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-border">
                <span className="text-muted-foreground">CLEARANCE:</span>
                <span className="font-bold text-foreground uppercase">{profile.seniority}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-muted-foreground">FOCUS SECTORS:</span>
                <span className="font-bold text-foreground uppercase">{profile.sectors.join(", ")}</span>
              </div>
            </div>
          </div>

          {/* Market Context Panel */}
          <div>
            <h3 className="font-serif text-lg font-bold mb-3 text-foreground border-b border-foreground/10 pb-1">
              Market Context Indices
            </h3>
            <div className="flex flex-col gap-2">
              {MARKET_METRICS.map((metric) => (
                <div key={metric.symbol} className="flex justify-between items-center border-b border-border pb-2 last:border-0">
                  <div>
                    <div className="font-mono text-xs font-bold text-foreground">{metric.symbol}</div>
                    <div className="text-[10px] text-muted-foreground truncate max-w-[180px]">{metric.name}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono text-xs font-bold text-foreground">{metric.value}</div>
                    <div className={`font-mono text-[10px] flex items-center justify-end gap-0.5 ${
                      metric.trend === "up" ? "text-primary" : "text-destructive"
                    }`}>
                      {metric.trend === "up" ? <ArrowUpRight className="w-2.5 h-2.5" /> : <ArrowDownRight className="w-2.5 h-2.5" />}
                      {metric.change}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Manifesto Blockquote */}
          <div className="border-t-2 border-foreground pt-4 mt-2">
            <h3 className="font-serif text-xs font-bold uppercase tracking-wider text-foreground mb-2">
              THE CONVERGENCE MANIFESTO
            </h3>
            <blockquote className="font-serif text-xs italic text-muted-foreground leading-relaxed">
              "Artificial intelligence is not a software vertical. It is a physical phenomenon constrained by silicon lithography and accelerated by capital liquidity. To understand one, you must master all three."
            </blockquote>
            <p className="font-mono text-[10px] text-right text-primary mt-2">— SIGNAL Editorial Board</p>
          </div>
        </aside>
      </div>

      {/* Footer */}
      <footer className="border-t border-foreground/10 mt-16 pt-6 pb-12 flex flex-col sm:flex-row justify-between items-center text-[10px] font-mono text-muted-foreground">
        <div>© 2026 SIGNAL Intelligence Group. Classified Eyes Only.</div>
        <div className="flex gap-4 mt-4 sm:mt-0">
          <a href="#" className="hover:text-foreground">[ TERMS ]</a>
          <span>•</span>
          <a href="#" className="hover:text-foreground">[ PRIVACY ]</a>
          <span>•</span>
          <a href="#" className="hover:text-foreground">[ SECURE_DOSSIER_PROTOCOL ]</a>
        </div>
      </footer>
    </div>
  );
};
