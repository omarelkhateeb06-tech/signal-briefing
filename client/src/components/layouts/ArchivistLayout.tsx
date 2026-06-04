import React, { useState } from "react";
import { useTheme } from "../../contexts/ThemeContext";
import { MOCK_STORIES, BriefingStory, MARKET_METRICS } from "../../lib/mockData";
import { Folder, FileText, Lock, Eye, Compass, Bookmark, ShieldAlert, Award, AlertCircle } from "lucide-react";

interface ArchivistLayoutProps {
  stories: BriefingStory[];
  onOpenOnboarding: () => void;
}

export const ArchivistLayout: React.FC<ArchivistLayoutProps> = ({ stories, onOpenOnboarding }) => {
  const { depth, setDepth, profile } = useTheme();
  const [activeStoryId, setActiveStoryId] = useState<string>("story-1");
  const [isClassifiedOpen, setIsClassifiedOpen] = useState<boolean>(true);

  const activeStory = stories.find((s) => s.id === activeStoryId) || stories[0];

  return (
    <div className="min-h-screen bg-background text-foreground font-serif p-4 md:p-8 flex justify-center items-start selection:bg-primary/20 selection:text-primary">
      {/* Physical Folder Wrapper */}
      <div className="w-full max-w-5xl bg-card border-2 border-border rounded-lg shadow-xl overflow-hidden relative">
        
        {/* Manila Folder Tab Top */}
        <div className="bg-secondary/50 border-b-2 border-border px-6 py-4 flex flex-wrap justify-between items-center gap-4 relative">
          
          {/* Top Folder Tab Graphic */}
          <div className="absolute -top-1 left-8 bg-background border-t-2 border-x-2 border-border px-6 py-1 text-[10px] font-mono font-bold tracking-widest text-primary uppercase rounded-t-md">
            DOSSIER: CONFIDENTIAL
          </div>

          <div className="flex items-center gap-3 pt-3">
            <div className="archivist-stamp px-3 py-1 text-xs border-2 border-dashed border-primary font-mono tracking-wider font-bold">
              SIGNAL INTEL
            </div>
            <div>
              <h1 className="font-serif text-3xl font-extrabold tracking-tight text-foreground leading-none">
                SIGNAL
              </h1>
              <p className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground mt-1">
                Sovereign Intelligence Dossier
              </p>
            </div>
          </div>

          {/* Archivist Metadata Stamps */}
          <div className="font-mono text-[10px] text-muted-foreground flex flex-col gap-1 text-right">
            <div>CLASSIFICATION: <span className="text-primary font-bold">EYES ONLY</span></div>
            <div>RECORDED: 04.06.2026</div>
            <div>RECIPIENT: <span className="text-foreground font-semibold uppercase underline decoration-dotted">{profile.name}</span></div>
          </div>
        </div>

        {/* Onboarding Preferences Tab */}
        <div className="bg-muted/30 border-b border-border px-6 py-2 flex justify-between items-center text-[10px] font-mono">
          <span className="text-muted-foreground">SUBJECT ROLES: {profile.role.toUpperCase()} // SENIORITY_{profile.seniority.toUpperCase()}</span>
          <button 
            onClick={onOpenOnboarding}
            className="text-primary hover:underline font-bold flex items-center gap-1 cursor-pointer"
          >
            [ RE-CALIBRATE DOSSIER ]
          </button>
        </div>

        {/* Folder Internal Split Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 min-h-[600px]">
          
          {/* Left Sidebar: Dossier Index Tabs */}
          <div className="md:col-span-4 border-r-2 border-border flex flex-col bg-secondary/20">
            <div className="p-4 border-b border-border bg-secondary/40 font-mono text-[11px] font-bold text-foreground flex items-center gap-1.5">
              <Folder className="w-3.5 h-3.5 text-primary" />
              <span>INDEXED EXHIBITS</span>
            </div>

            {/* Document Stack Tabs */}
            <div className="flex-1 flex flex-col divide-y divide-border/60">
              {stories.length === 0 ? (
                <div className="p-6 text-center font-mono text-xs text-muted-foreground">
                  No exhibits match the active profile filter.
                </div>
              ) : (
                stories.map((story, index) => {
                  const isActive = story.id === activeStoryId;
                  const score = story.relevanceScores[profile.seniority === "executive" ? "executive" : profile.role.toLowerCase().includes("analyst") ? "analyst" : profile.role.toLowerCase().includes("founder") ? "founder" : "general"] || story.relevanceScores.general;

                  return (
                    <button
                      key={story.id}
                      onClick={() => setActiveStoryId(story.id)}
                      className={`p-4 text-left transition-all relative flex flex-col gap-1.5 cursor-pointer ${
                        isActive 
                          ? "bg-background border-r-4 border-primary shadow-sm" 
                          : "hover:bg-background/40"
                      }`}
                    >
                      {/* Folder Document Number */}
                      <div className="flex justify-between items-center font-mono text-[9px] text-muted-foreground">
                        <span>EXHIBIT_0{index + 1}</span>
                        <span className="font-bold text-primary">MATCH_RTG: {score}%</span>
                      </div>
                      
                      {/* Title */}
                      <h3 className={`font-serif text-sm font-bold leading-tight ${
                        isActive ? "text-foreground" : "text-muted-foreground"
                      }`}>
                        {story.title}
                      </h3>

                      {/* Brief Stamp Info */}
                      <div className="flex gap-2 items-center font-mono text-[9px] text-muted-foreground mt-1">
                        <span>{story.readTime.toUpperCase()}</span>
                        <span>•</span>
                        <span>{story.sourceCount} DECLASSIFIED SOURCES</span>
                      </div>
                    </button>
                  );
                })
              )}
            </div>

            {/* Vintage Manifesto Stamp */}
            <div className="p-4 border-t border-border bg-secondary/30 font-mono text-[10px] text-muted-foreground space-y-2">
              <div className="flex items-center gap-1.5 text-primary font-bold">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>ARCHIVAL NOTE</span>
              </div>
              <p className="italic leading-relaxed">
                "Information is compiled using cross-referenced intelligence pipelines spanning fabrication yield analysis, central bank capital flow metrics, and algorithmic pricing systems."
              </p>
            </div>
          </div>

          {/* Right Section: Selected Document Content */}
          <div className="md:col-span-8 flex flex-col bg-background relative">
            
            {/* Depth Filter Tabs (Archivist Manila Folder Style) */}
            <div className="border-b border-border px-6 py-2.5 bg-secondary/10 flex flex-wrap justify-between items-center gap-2">
              <span className="font-mono text-[10px] text-muted-foreground">SELECT READ MODE DEPTH:</span>
              
              <div className="flex gap-1 font-mono text-[10px]">
                {(["accessible", "briefed", "technical"] as const).map((level) => (
                  <button
                    key={level}
                    onClick={() => setDepth(level)}
                    className={`px-3 py-1 border transition-all cursor-pointer ${
                      depth === level
                        ? "bg-primary text-primary-foreground border-primary font-bold shadow-sm"
                        : "bg-background text-muted-foreground border-border hover:text-foreground"
                    }`}
                  >
                    {level.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* Active Exhibit Page */}
            {activeStory ? (
              <div className="p-6 md:p-8 space-y-6 flex-1 overflow-y-auto max-h-[650px]">
                
                {/* Document Header Stamp */}
                <div className="flex justify-between items-start border-b border-border pb-4">
                  <div>
                    <span className="font-mono text-[10px] text-primary font-bold uppercase tracking-widest">
                      [ EX_ID: {activeStory.id.toUpperCase()} ]
                    </span>
                    <h2 className="font-serif text-2xl font-extrabold text-foreground leading-tight mt-1">
                      {activeStory.title}
                    </h2>
                  </div>
                </div>

                {/* Core summary (With simulated highlighter effect) */}
                <div className="space-y-2">
                  <div className="font-mono text-[10px] uppercase tracking-wider text-primary font-bold">
                    I. EXECUTIVE COMPILATION
                  </div>
                  <p className="text-base leading-relaxed text-foreground font-serif archivist-highlight">
                    {activeStory.depth[depth].summary}
                  </p>
                </div>

                {/* Why It Matters / Analysis (Briefed & Technical only) */}
                {"analysis" in activeStory.depth[depth] && (
                  <div className="space-y-2 bg-secondary/20 p-4 border-2 border-border/80 rounded">
                    <div className="font-mono text-[10px] uppercase tracking-wider text-primary font-bold">
                      II. CONVERGENCE INTERSECTION ANALYSIS
                    </div>
                    <p className="text-sm leading-relaxed text-foreground">
                      {(activeStory.depth[depth] as any).analysis}
                    </p>
                  </div>
                )}

                {/* Technical Data Points (Technical only) */}
                {"dataPoints" in activeStory.depth[depth] && (
                  <div className="space-y-3">
                    <div className="font-mono text-[10px] uppercase tracking-wider text-primary font-bold">
                      III. TELEMETRY & HARD DATA VECTORS
                    </div>
                    <div className="grid grid-cols-2 gap-3 font-mono">
                      {(activeStory.depth[depth] as any).dataPoints.map((dp: any, idx: number) => (
                        <div key={idx} className="border border-border p-3 bg-secondary/10">
                          <div className="text-[9px] text-muted-foreground uppercase">{dp.label}</div>
                          <div className="font-bold text-xs text-foreground mt-1 underline decoration-primary/40">{dp.value}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Architectural Impact (Technical only) */}
                {"architecturalImpact" in activeStory.depth[depth] && (
                  <div className="space-y-2">
                    <div className="font-mono text-[10px] uppercase tracking-wider text-primary font-bold">
                      IV. SYSTEM ARCHITECTURAL IMPACT
                    </div>
                    <p className="text-sm leading-relaxed text-foreground italic bg-secondary/10 p-3 border-l-4 border-primary">
                      {(activeStory.depth[depth] as any).architecturalImpact}
                    </p>
                  </div>
                )}

                {/* Bullet Points */}
                {"bulletPoints" in activeStory.depth[depth] && (
                  <div className="space-y-2">
                    <div className="font-mono text-[10px] uppercase tracking-wider text-primary font-bold">
                      V. OPERATIONAL TAKEAWAYS
                    </div>
                    <ul className="list-decimal pl-5 text-sm space-y-2 text-foreground leading-relaxed">
                      {(activeStory.depth[depth] as any).bulletPoints.map((pt: string, idx: number) => (
                        <li key={idx} className="pl-1">{pt}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* What to Watch */}
                <div className="pt-4 border-t-2 border-dashed border-border">
                  <div className="font-mono text-[10px] uppercase tracking-wider text-primary font-bold mb-1">
                    VI. CRITICAL FORWARD INDICATORS
                  </div>
                  <p className="text-sm leading-relaxed text-foreground font-serif italic">
                    {activeStory.depth[depth].whatToWatch}
                  </p>
                </div>

                {/* Sector stamps */}
                <div className="flex gap-2 pt-4">
                  {activeStory.sectors.map((sec) => (
                    <span 
                      key={sec}
                      className="font-mono text-[9px] uppercase tracking-widest text-primary border-2 border-primary/30 px-2 py-0.5 font-bold"
                    >
                      {sec}
                    </span>
                  ))}
                </div>
              </div>
            ) : (
              <div className="p-12 text-center font-mono text-sm text-muted-foreground">
                [!] NO DOCUMENT EX_ID CURRENTLY MOUNTED.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
