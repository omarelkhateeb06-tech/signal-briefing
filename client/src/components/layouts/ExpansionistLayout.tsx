import React, { useState } from "react";
import { useTheme } from "../../contexts/ThemeContext";
import { BriefingStory, MARKET_METRICS } from "../../lib/mockData";
import { ArrowUpRight, Cpu, Layers, Database, BarChart3, ShieldAlert, Sparkles, BookOpen, Key } from "lucide-react";

interface ExpansionistLayoutProps {
  stories: BriefingStory[];
  onOpenOnboarding: () => void;
}

export const ExpansionistLayout: React.FC<ExpansionistLayoutProps> = ({ stories, onOpenOnboarding }) => {
  const { depth, setDepth, profile } = useTheme();
  const [activeStoryId, setActiveStoryId] = useState<string>("story-1");

  const activeStory = stories.find((s) => s.id === activeStoryId) || stories[0];

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/20 selection:text-primary flex">
      
      {/* First-Class Sidebar Navigation */}
      <aside className="w-64 border-r border-border bg-white hidden md:flex flex-col shrink-0">
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-primary" />
            <span className="font-serif text-2xl font-black tracking-tight text-foreground">SIGNAL</span>
          </div>
          <span className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground font-bold mt-1 block">
            INTELLIGENCE CONSOLE
          </span>
        </div>

        {/* Navigation Items */}
        <nav className="p-4 flex-1 space-y-1 font-mono text-xs font-bold">
          <a href="#" className="flex items-center gap-3 px-3 py-2 bg-secondary text-primary rounded-md">
            <BookOpen className="w-4 h-4" />
            <span>Today's Briefing</span>
          </a>
          <div className="flex items-center justify-between px-3 py-2 text-muted-foreground hover:bg-secondary/50 rounded-md cursor-not-allowed">
            <div className="flex items-center gap-3">
              <Cpu className="w-4 h-4" />
              <span>Sector Deep-Dives</span>
            </div>
            <span className="text-[8px] bg-muted text-muted-foreground px-1 py-0.5 rounded-sm">SOON</span>
          </div>
          <div className="flex items-center justify-between px-3 py-2 text-muted-foreground hover:bg-secondary/50 rounded-md cursor-not-allowed">
            <div className="flex items-center gap-3">
              <BarChart3 className="w-4 h-4" />
              <span>Trend Monitor</span>
            </div>
            <span className="text-[8px] bg-muted text-muted-foreground px-1 py-0.5 rounded-sm">SOON</span>
          </div>
          <div className="flex items-center justify-between px-3 py-2 text-muted-foreground hover:bg-secondary/50 rounded-md cursor-not-allowed">
            <div className="flex items-center gap-3">
              <Key className="w-4 h-4" />
              <span>API Console</span>
            </div>
            <span className="text-[8px] bg-muted text-muted-foreground px-1 py-0.5 rounded-sm">SOON</span>
          </div>
        </nav>

        {/* User Badge */}
        <div className="p-4 border-t border-border bg-secondary/30 font-mono text-[10px]">
          <div className="font-bold text-foreground truncate">{profile.name.toUpperCase()}</div>
          <div className="text-muted-foreground truncate">{profile.role}</div>
          <button 
            onClick={onOpenOnboarding}
            className="text-primary font-bold underline mt-2 block cursor-pointer"
          >
            Adjust Profile
          </button>
        </div>
      </aside>

      {/* Main Panel */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Sector Dashboard Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 border-b border-border bg-white divide-y sm:divide-y-0 sm:divide-x divide-border">
          <div className="p-4 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] font-bold text-muted-foreground">AI & MACHINE LEARNING</span>
              <Cpu className="w-3.5 h-3.5 text-primary" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-serif font-black text-foreground">4 Active</span>
              <span className="text-[10px] font-mono text-emerald-600 font-bold">+12% Vol</span>
            </div>
          </div>
          <div className="p-4 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] font-bold text-muted-foreground">FINANCIAL CAPITAL</span>
              <BarChart3 className="w-3.5 h-3.5 text-primary" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-serif font-black text-foreground">$12.4B Debt</span>
              <span className="text-[10px] font-mono text-emerald-600 font-bold">Liquid High</span>
            </div>
          </div>
          <div className="p-4 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] font-bold text-muted-foreground">SEMICONDUCTORS</span>
              <Database className="w-3.5 h-3.5 text-primary" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-serif font-black text-foreground">N2P Pilot</span>
              <span className="text-[10px] font-mono text-amber-600 font-bold">Yield: 65%</span>
            </div>
          </div>
        </div>

        {/* Content Panel Split */}
        <div className="flex-1 flex flex-col lg:flex-row">
          
          {/* Feed List */}
          <main className="flex-1 p-6 border-b lg:border-b-0 lg:border-r border-border overflow-y-auto max-h-[calc(100vh-120px)]">
            <h2 className="font-serif text-2xl font-black mb-4">Ranked Briefings</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {stories.map((story) => {
                const isActive = story.id === activeStoryId;
                return (
                  <div
                    key={story.id}
                    onClick={() => setActiveStoryId(story.id)}
                    className={`border-t-2 p-4 bg-white shadow-sm cursor-pointer transition-all hover:border-primary ${
                      isActive 
                        ? "border-primary ring-1 ring-primary/20" 
                        : "border-muted hover:shadow"
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground font-bold">
                        {story.sectors.join(" • ")}
                      </span>
                      <span className="font-mono text-[9px] bg-secondary text-primary font-bold px-1.5 py-0.5">
                        MATCH HIGH
                      </span>
                    </div>
                    <h3 className="font-serif text-lg font-bold leading-snug mb-2 line-clamp-2">
                      {story.title}
                    </h3>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {story.depth[depth].summary}
                    </p>
                  </div>
                );
              })}
            </div>
          </main>

          {/* Right Detail Panel */}
          <aside className="w-full lg:w-96 bg-white p-6 flex flex-col overflow-y-auto max-h-[calc(100vh-120px)]">
            {activeStory ? (
              <div className="space-y-6 animate-fade-in">
                
                {/* Sector and match */}
                <div className="flex justify-between items-center border-b border-border pb-3">
                  <span className="font-mono text-[10px] uppercase font-bold text-primary">
                    {activeStory.sectors.join(" // ")}
                  </span>
                  <span className="font-mono text-[10px] bg-primary/10 text-primary font-bold px-2 py-0.5 border border-primary/20">
                    MATCH RATE: 98%
                  </span>
                </div>

                {/* Depth Switcher inside sidebar */}
                <div className="flex bg-secondary/50 p-0.5 rounded-sm border border-border">
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

                {/* Big title */}
                <h2 className="font-serif text-2xl font-bold leading-tight text-foreground">
                  {activeStory.title}
                </h2>

                {/* Content details */}
                <div className="space-y-4 text-sm leading-relaxed text-foreground">
                  <div>
                    <div className="font-mono text-[9px] text-muted-foreground uppercase tracking-widest font-bold mb-1">
                      CORE ANALYSIS
                    </div>
                    <p className="font-serif italic text-base text-foreground border-l-2 border-primary pl-3">
                      {activeStory.depth[depth].summary}
                    </p>
                  </div>

                  {"analysis" in activeStory.depth[depth] && (
                    <div>
                      <div className="font-mono text-[9px] text-muted-foreground uppercase tracking-widest font-bold mb-1">
                        SITUATIONAL INTELLIGENCE
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {(activeStory.depth[depth] as any).analysis}
                      </p>
                    </div>
                  )}

                  {"dataPoints" in activeStory.depth[depth] && (
                    <div>
                      <div className="font-mono text-[9px] text-muted-foreground uppercase tracking-widest font-bold mb-2">
                        METRIC TELEMETRY
                      </div>
                      <div className="grid grid-cols-2 gap-2 font-mono text-[10px]">
                        {(activeStory.depth[depth] as any).dataPoints.map((dp: any, idx: number) => (
                          <div key={idx} className="border border-border p-2 bg-secondary/30">
                            <div className="text-[8px] text-muted-foreground uppercase">{dp.label}</div>
                            <div className="font-bold text-foreground mt-0.5">{dp.value}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="pt-3 border-t border-border">
                    <div className="font-mono text-[9px] text-muted-foreground uppercase tracking-widest font-bold mb-1">
                      INDICATORS TO MONITOR
                    </div>
                    <p className="text-xs text-muted-foreground italic">
                      {activeStory.depth[depth].whatToWatch}
                    </p>
                  </div>
                </div>

              </div>
            ) : (
              <div className="text-center py-12 font-mono text-xs text-muted-foreground">
                SELECT A BRIEFING PACKET TO EXPAND TELEMETRY
              </div>
            )}
          </aside>

        </div>

      </div>
    </div>
  );
};
