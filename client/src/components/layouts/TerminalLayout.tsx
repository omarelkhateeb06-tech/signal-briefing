import React, { useState } from "react";
import { useTheme } from "../../contexts/ThemeContext";
import { MOCK_STORIES, BriefingStory, MARKET_METRICS } from "../../lib/mockData";
import { Terminal, Cpu, Database, TrendingUp, Network, Play, Settings, RefreshCw, Layers, ShieldAlert } from "lucide-react";

interface TerminalLayoutProps {
  stories: BriefingStory[];
  onOpenOnboarding: () => void;
}

export const TerminalLayout: React.FC<TerminalLayoutProps> = ({ stories, onOpenOnboarding }) => {
  const { depth, setDepth, profile } = useTheme();
  const [activeStoryId, setActiveStoryId] = useState<string>("story-1");
  const [selectedConnection, setSelectedConnection] = useState<string | null>(null);

  const activeStory = stories.find((s) => s.id === activeStoryId) || stories[0];

  const handleConnectionClick = (conn: string) => {
    setSelectedConnection(selectedConnection === conn ? null : conn);
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-mono text-xs flex flex-col h-screen overflow-hidden selection:bg-primary/30 selection:text-primary">
      {/* Top Status Bar */}
      <header className="border-b border-border bg-card px-4 py-2 flex items-center justify-between z-10">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <span className="font-bold text-sm tracking-wider text-primary">SIGNAL_TERMINAL_V3.1</span>
          </div>
          <span className="text-muted-foreground">|</span>
          <div className="hidden md:flex items-center gap-3 text-muted-foreground text-[10px]">
            <span>SECURE_CONN: <span className="text-primary font-bold">ACTIVE</span></span>
            <span>NODE: <span className="text-foreground">TPE-01_FAB</span></span>
            <span>FEED_LATENCY: <span className="text-foreground">0.02ms</span></span>
          </div>
        </div>

        {/* Dynamic Controls */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="text-muted-foreground text-[10px]">USER:</span>
            <span className="text-foreground font-bold border border-border px-1.5 py-0.5 bg-background">
              {profile.name.toUpperCase()}
            </span>
          </div>
          <button 
            onClick={onOpenOnboarding}
            className="text-primary hover:text-primary/80 flex items-center gap-1 border border-primary/30 hover:border-primary px-2 py-0.5 bg-primary/10 cursor-pointer text-[10px]"
          >
            <Settings className="w-3 h-3" /> CONFIG
          </button>
        </div>
      </header>

      {/* Main Terminal Grid (3-Pane Layout) */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
        {/* Pane 1: Feed Index (Left) */}
        <div className="lg:col-span-4 border-r border-border flex flex-col h-full overflow-y-auto">
          {/* Section Header */}
          <div className="border-b border-border bg-muted/30 px-4 py-2.5 flex justify-between items-center sticky top-0 bg-background/95 backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-primary" />
              <span className="font-bold tracking-wider text-foreground">DAILY_RANKED_FEED</span>
            </div>
            <span className="text-muted-foreground text-[10px]">COUNT: {stories.length}</span>
          </div>

          {/* Stories list */}
          <div className="divide-y divide-border">
            {stories.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground">
                [!] NO COMPATIBLE DATA FEEDS DETECTED FOR SELECTED PROFILE.
              </div>
            ) : (
              stories.map((story, index) => {
                const isActive = story.id === activeStoryId;
                const score = story.relevanceScores[profile.seniority === "executive" ? "executive" : profile.role.toLowerCase().includes("analyst") ? "analyst" : profile.role.toLowerCase().includes("founder") ? "founder" : "general"] || story.relevanceScores.general;

                return (
                  <div
                    key={story.id}
                    onClick={() => setActiveStoryId(story.id)}
                    className={`p-4 cursor-pointer transition-all ${
                      isActive 
                        ? "bg-primary/10 border-l-2 border-primary" 
                        : "hover:bg-muted/10 border-l-2 border-transparent"
                    }`}
                  >
                    <div className="flex justify-between items-start mb-1.5">
                      <span className="text-[10px] text-muted-foreground font-bold">
                        RANK_0{index + 1} // {story.readTime.toUpperCase()}
                      </span>
                      <span className={`text-[10px] px-1.5 py-0.5 border font-bold ${
                        isActive 
                          ? "bg-primary/20 border-primary text-primary" 
                          : "bg-muted/20 border-border text-muted-foreground"
                      }`}>
                        {score}% MATCH
                      </span>
                    </div>
                    <h3 className={`font-bold text-sm leading-snug ${
                      isActive ? "text-primary" : "text-foreground group-hover:text-primary"
                    }`}>
                      {story.title.toUpperCase()}
                    </h3>
                    <p className="text-[11px] text-muted-foreground line-clamp-2 mt-1.5">
                      {story.depth[depth].summary}
                    </p>
                    
                    {/* Sector LED Lights */}
                    <div className="flex gap-1.5 mt-2.5">
                      {story.sectors.map((sec) => (
                        <span 
                          key={sec}
                          className={`text-[9px] px-1 py-0.2 border ${
                            sec === "ai" 
                              ? "border-cyan-500/30 text-cyan-400 bg-cyan-500/5" 
                              : sec === "finance" 
                                ? "border-amber-500/30 text-amber-400 bg-amber-500/5" 
                                : "border-emerald-500/30 text-emerald-400 bg-emerald-500/5"
                          }`}
                        >
                          {sec.toUpperCase()}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Pane 2: Deep Analysis Content (Center) */}
        <div className="lg:col-span-5 border-r border-border flex flex-col h-full overflow-y-auto">
          {/* Depth Mode Selector (Executive Slider) */}
          <div className="border-b border-border bg-muted/30 px-4 py-2 flex justify-between items-center sticky top-0 bg-background/95 backdrop-blur-sm">
            <span className="font-bold tracking-wider text-foreground">DEPTH_RESOLUTION_LEVEL</span>
            
            <div className="flex items-center gap-1 border border-border p-0.5 bg-background">
              {(["accessible", "briefed", "technical"] as const).map((level) => (
                <button
                  key={level}
                  onClick={() => setDepth(level)}
                  className={`px-2 py-0.5 text-[10px] uppercase transition-all cursor-pointer ${
                    depth === level
                      ? "bg-primary text-primary-foreground font-bold"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {level.slice(0, 4).toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Active Story Deep Dive */}
          {activeStory ? (
            <div className="p-6 space-y-6">
              {/* Meta Stats */}
              <div className="grid grid-cols-3 gap-2 border border-border p-3 bg-muted/10">
                <div>
                  <div className="text-[10px] text-muted-foreground">METRIC_STORY_ID</div>
                  <div className="font-bold text-foreground mt-0.5">{activeStory.id.toUpperCase()}</div>
                </div>
                <div>
                  <div className="text-[10px] text-muted-foreground">DATA_INTEGRITY</div>
                  <div className="font-bold text-primary mt-0.5">99.8% SECURE</div>
                </div>
                <div>
                  <div className="text-[10px] text-muted-foreground">INTELL_SOURCES</div>
                  <div className="font-bold text-foreground mt-0.5">{activeStory.sourceCount} FEEDS</div>
                </div>
              </div>

              {/* Title */}
              <div>
                <h2 className="text-lg md:text-xl font-bold text-foreground leading-tight tracking-tight border-l-2 border-primary pl-3">
                  {activeStory.title.toUpperCase()}
                </h2>
                <div className="text-[10px] text-muted-foreground mt-2">
                  TIMESTAMP: {activeStory.date.toUpperCase()} // LEVEL_{depth.toUpperCase()}
                </div>
              </div>

              {/* Core summary */}
              <div className="space-y-2">
                <div className="text-primary font-bold tracking-wider border-b border-border pb-1">
                  &gt;&gt; CORE_INTELLIGENCE_BRIEF
                </div>
                <p className="text-[12px] leading-relaxed text-foreground">
                  {activeStory.depth[depth].summary}
                </p>
              </div>

              {/* Analysis */}
              {"analysis" in activeStory.depth[depth] && (
                <div className="space-y-2">
                  <div className="text-primary font-bold tracking-wider border-b border-border pb-1">
                    &gt;&gt; CONVERGENCE_ANALYSIS
                  </div>
                  <p className="text-[11px] leading-relaxed text-muted-foreground bg-muted/5 p-3 border border-border/50">
                    {(activeStory.depth[depth] as any).analysis}
                  </p>
                </div>
              )}

              {/* Technical Metrics (Dynamic Grid) */}
              {"dataPoints" in activeStory.depth[depth] && (
                <div className="space-y-2">
                  <div className="text-primary font-bold tracking-wider border-b border-border pb-1">
                    &gt;&gt; TELEMETRY_MATRIX
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {(activeStory.depth[depth] as any).dataPoints.map((dp: any, idx: number) => (
                      <div key={idx} className="border border-border p-2 bg-muted/20 hover:border-primary/50 transition-colors">
                        <div className="text-[9px] text-muted-foreground uppercase">{dp.label}</div>
                        <div className="font-bold text-xs text-foreground mt-0.5">{dp.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Architectural Impact */}
              {"architecturalImpact" in activeStory.depth[depth] && (
                <div className="space-y-2">
                  <div className="text-primary font-bold tracking-wider border-b border-border pb-1">
                    &gt;&gt; HARDWARE_ARCHITECTURAL_IMPACT
                  </div>
                  <p className="text-[11px] leading-relaxed text-muted-foreground italic border-l-2 border-border pl-3">
                    {(activeStory.depth[depth] as any).architecturalImpact}
                  </p>
                </div>
              )}

              {/* Bullet Points */}
              {"bulletPoints" in activeStory.depth[depth] && (
                <div className="space-y-2">
                  <div className="text-primary font-bold tracking-wider border-b border-border pb-1">
                    &gt;&gt; DETAILED_VECTORS
                  </div>
                  <ul className="space-y-2 pl-2">
                    {(activeStory.depth[depth] as any).bulletPoints.map((pt: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-primary mt-0.5">■</span>
                        <span className="text-[11px] text-foreground leading-relaxed">{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* What to Watch */}
              <div className="space-y-2 border border-primary/30 bg-primary/5 p-4">
                <div className="text-primary font-bold tracking-wider flex items-center gap-1.5">
                  <ShieldAlert className="w-3.5 h-3.5" /> CRITICAL_FORWARD_INDICATORS
                </div>
                <p className="text-[11px] leading-relaxed text-foreground italic">
                  {activeStory.depth[depth].whatToWatch}
                </p>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center text-muted-foreground">
              [!] SELECT A STORY DATA NODE FROM THE LEFT PANE.
            </div>
          )}
        </div>

        {/* Pane 3: System Telemetry & Connections (Right) */}
        <aside className="lg:col-span-3 flex flex-col h-full overflow-y-auto">
          {/* Market Ticker Panel */}
          <div className="border-b border-border">
            <div className="border-b border-border bg-muted/30 px-4 py-2.5 font-bold tracking-wider text-foreground">
              SYSTEM_TICKER_DATA
            </div>
            <div className="p-4 space-y-3">
              {MARKET_METRICS.map((metric) => (
                <div key={metric.symbol} className="flex justify-between items-center border border-border p-2 bg-background hover:border-primary/40 transition-colors">
                  <div>
                    <span className="font-bold text-foreground">{metric.symbol}</span>
                    <span className="text-[9px] text-muted-foreground ml-2">({metric.name.slice(0, 12)}...)</span>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-foreground">{metric.value}</div>
                    <div className={`text-[10px] font-bold ${
                      metric.trend === "up" ? "text-emerald-400" : "text-rose-400"
                    }`}>
                      {metric.trend === "up" ? "▲" : "▼"} {metric.change}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Connection Map */}
          <div className="flex-1 flex flex-col">
            <div className="border-b border-border bg-muted/30 px-4 py-2.5 font-bold tracking-wider text-foreground">
              CONVERGENCE_MAP_ROUTING
            </div>
            <div className="p-4 flex-1 flex flex-col justify-center items-center gap-4">
              <p className="text-[10px] text-muted-foreground text-center mb-2">
                Click nodes to view real-time pipeline dependencies
              </p>
              
              <div className="relative w-full max-w-[240px] aspect-square flex items-center justify-center border border-border rounded-full bg-card/20">
                {/* Node: AI */}
                <button 
                  onClick={() => handleConnectionClick("ai")}
                  className={`absolute top-4 w-12 h-12 rounded-full border flex flex-col items-center justify-center transition-all cursor-pointer ${
                    selectedConnection === "ai" 
                      ? "bg-cyan-500/20 border-cyan-400 text-cyan-400 terminal-glow" 
                      : "bg-background border-border text-muted-foreground hover:border-cyan-400/50"
                  }`}
                >
                  <Cpu className="w-4 h-4" />
                  <span className="text-[8px] font-bold mt-0.5">AI</span>
                </button>

                {/* Node: Semiconductors */}
                <button 
                  onClick={() => handleConnectionClick("semi")}
                  className={`absolute bottom-4 left-4 w-12 h-12 rounded-full border flex flex-col items-center justify-center transition-all cursor-pointer ${
                    selectedConnection === "semi" 
                      ? "bg-emerald-500/20 border-emerald-400 text-emerald-400 terminal-glow" 
                      : "bg-background border-border text-muted-foreground hover:border-emerald-400/50"
                  }`}
                >
                  <Database className="w-4 h-4" />
                  <span className="text-[8px] font-bold mt-0.5">SEMI</span>
                </button>

                {/* Node: Capital */}
                <button 
                  onClick={() => handleConnectionClick("cap")}
                  className={`absolute bottom-4 right-4 w-12 h-12 rounded-full border flex flex-col items-center justify-center transition-all cursor-pointer ${
                    selectedConnection === "cap" 
                      ? "bg-amber-500/20 border-amber-400 text-amber-400 terminal-glow-amber" 
                      : "bg-background border-border text-muted-foreground hover:border-amber-400/50"
                  }`}
                >
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-[8px] font-bold mt-0.5">CAPITAL</span>
                </button>

                {/* Connection lines visual indicator */}
                <div className="w-16 h-16 border border-dashed border-border rounded-full flex items-center justify-center text-center text-[9px] text-muted-foreground">
                  {selectedConnection ? selectedConnection.toUpperCase() : "SELECT"}
                </div>
              </div>

              {/* Dynamic explanation based on node click */}
              <div className="w-full border border-border p-3 bg-muted/10 min-h-[90px]">
                {selectedConnection === "ai" && (
                  <p className="text-[10px] text-cyan-400 leading-relaxed">
                    [AI_NODE] dependent on [SEMI] silicon lithography limits (N2P scaling) and [CAPITAL] venture liquidity cycles.
                  </p>
                )}
                {selectedConnection === "semi" && (
                  <p className="text-[10px] text-emerald-400 leading-relaxed">
                    [SEMI_NODE] constrained by extreme front-end packaging bottlenecks, funded directly by [CAPITAL] sovereign wealth injections.
                  </p>
                )}
                {selectedConnection === "cap" && (
                  <p className="text-[10px] text-amber-400 leading-relaxed">
                    [CAPITAL_NODE] creating high-yield syndicated GPU-backed debt models, relying on [AI] compute rental stability.
                  </p>
                )}
                {!selectedConnection && (
                  <p className="text-[10px] text-muted-foreground leading-relaxed italic">
                    Select any terminal sector node above to analyze convergence flows and hardware dependency structures.
                  </p>
                )}
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* Terminal Footer */}
      <footer className="border-t border-border bg-card px-4 py-1.5 flex flex-col sm:flex-row justify-between items-center text-[9px] text-muted-foreground z-10">
        <div>SIGNAL_EXEC_SHELL // ALL COVENANTS SECURED</div>
        <div className="flex gap-4 mt-1 sm:mt-0">
          <span>SEC_REG_ID: #406-C</span>
          <span>•</span>
          <span>CRYPTO_KEY: AES-256</span>
          <span>•</span>
          <span>DECRYPTION_LOG: SECURE</span>
        </div>
      </footer>
    </div>
  );
};
