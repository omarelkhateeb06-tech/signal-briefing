import React, { useState, useEffect, useRef } from "react";
import { useTheme } from "../../contexts/ThemeContext";
import { BriefingStory, MARKET_METRICS } from "../../lib/mockData";
import { ArrowUpRight, ArrowDownRight, Layers, Cpu, BarChart3, Database } from "lucide-react";

interface SwissCommandLayoutProps {
  stories: BriefingStory[];
  onOpenOnboarding: () => void;
}

export const SwissCommandLayout: React.FC<SwissCommandLayoutProps> = ({ stories, onOpenOnboarding }) => {
  const { scrollModel, depth, setDepth, profile } = useTheme();
  const [selectedStoryId, setSelectedStoryId] = useState<string | null>("story-1");
  const [activeStoryInView, setActiveStoryInView] = useState<string>("story-1");

  // Ref for the left ranked stream column to monitor scrolling
  const leftColumnRef = useRef<HTMLDivElement>(null);
  const storyRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

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

  // Intersection Observer to detect which story is currently scrolled into view (Model 3)
  useEffect(() => {
    const observerOptions = {
      root: leftColumnRef.current,
      rootMargin: "-20% 0px -60% 0px", // Focus on stories in the upper-middle of the scroll viewport
      threshold: 0.1,
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const storyId = entry.target.getAttribute("data-story-id");
          if (storyId) {
            setActiveStoryInView(storyId);
            // In Model 3 (Sticky Split Sync), also auto-select the story details on scroll
            if (scrollModel === "sticky-split") {
              setSelectedStoryId(storyId);
            }
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    // Observe all story elements
    Object.values(storyRefs.current).forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, [stories, scrollModel]);

  // Model 1: Hero Sticky Scale effect on scroll
  const [heroScale, setHeroScale] = useState(1);
  const [heroOpacity, setHeroOpacity] = useState(1);
  const [isHeroPinned, setIsHeroPinned] = useState(false);

  const handleLeftScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollTop = e.currentTarget.scrollTop;
    
    if (scrollModel === "hero-sticky") {
      // Scale down and fade out hero image based on scroll depth
      const scale = Math.max(0.85, 1 - scrollTop / 800);
      const opacity = Math.max(0.15, 1 - scrollTop / 400);
      setHeroScale(scale);
      setHeroOpacity(opacity);
      setIsHeroPinned(scrollTop > 250);
    }
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
            <span className="mx-3">|</span>
            <span className="text-primary font-bold">SCROLL MODE: {scrollModel.toUpperCase().replace("-", " ")}</span>
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
        <main 
          ref={leftColumnRef}
          onScroll={handleLeftScroll}
          className="lg:col-span-7 border-r border-foreground p-6 md:p-8 space-y-6 overflow-y-auto max-h-[calc(100vh-180px)] scroll-smooth"
        >
          
          {/* MODEL 1: Pinned Header Hero Placeholder when scrolled down */}
          {scrollModel === "hero-sticky" && isHeroPinned && (
            <div className="sticky top-0 z-30 bg-background/95 backdrop-blur border-b border-foreground/15 py-2 -mx-6 px-6 flex items-center justify-between animate-fade-in">
              <span className="font-mono text-[9px] uppercase tracking-widest text-primary font-bold">
                PINNED BRIEFING // {stories[0].title}
              </span>
              <button 
                onClick={() => {
                  if (leftColumnRef.current) leftColumnRef.current.scrollTop = 0;
                }}
                className="font-mono text-[9px] text-muted-foreground hover:text-primary"
              >
                [BACK TO TOP]
              </button>
            </div>
          )}

          <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground border-b border-foreground/10 pb-2">
            RANKED STREAM
          </h2>

          <div className="divide-y divide-foreground/10">
            {stories.map((story, index) => {
              const isSelected = selectedStoryId === story.id;
              const score = getRelevanceScore(story);
              const isTop = index === 0;

              return (
                <div
                  key={story.id}
                  ref={(el) => { storyRefs.current[story.id] = el; }}
                  data-story-id={story.id}
                >
                  {isTop ? (
                    // TOP STORY VIEW
                    <article 
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

                      {/* MODEL 1: HERO STICKY FOCUS */}
                      {scrollModel === "hero-sticky" && story.image && (
                        <div 
                          className="relative aspect-[16/9] overflow-hidden border border-foreground/10 bg-muted/10 origin-top transition-transform duration-75 ease-out"
                          style={{
                            transform: `scale(${heroScale})`,
                            opacity: heroOpacity,
                          }}
                        >
                          <img 
                            src={story.image} 
                            alt=""
                            className="object-cover w-full h-full filter grayscale group-hover:grayscale-0 transition-all duration-300"
                          />
                        </div>
                      )}

                      {/* MODEL 2: PARALLAX MARGINALIA (Floats offset slightly) */}
                      {scrollModel === "parallax-margin" && story.image && (
                        <div className="relative aspect-[21/9] overflow-hidden border border-foreground/10 bg-muted/10 translate-y-2 transition-transform duration-500 ease-out">
                          <img 
                            src={story.image} 
                            alt=""
                            className="object-cover w-full h-full filter grayscale hover:grayscale-0 transition-all duration-300"
                          />
                        </div>
                      )}

                      {/* MODEL 4: INLINE ASYMMETRIC GRID (Text wraps or flows asymmetrically) */}
                      {scrollModel === "inline-grid" && story.image && (
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                          <div className="md:col-span-8">
                            <h3 className="font-serif text-2xl font-black text-foreground group-hover:text-primary transition-colors leading-tight">
                              {story.title}
                            </h3>
                          </div>
                          <div className="md:col-span-4 relative aspect-[4/3] overflow-hidden border border-foreground/15 shadow-sm group-hover:rotate-1 transition-transform duration-300">
                            <img 
                              src={story.image} 
                              alt=""
                              className="object-cover w-full h-full filter grayscale group-hover:grayscale-0 transition-all duration-300"
                            />
                          </div>
                        </div>
                      )}

                      {/* Standard title if not Model 4 (Model 4 includes title in grid) */}
                      {scrollModel !== "inline-grid" && (
                        <h3 className="font-serif text-2xl font-black text-foreground group-hover:text-primary transition-colors leading-tight">
                          {story.title}
                        </h3>
                      )}

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
                      </div>
                    </article>
                  ) : (
                    // COLLAPSED STORY VIEW
                    <article 
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

                        {/* Model-specific inline images */}
                        {story.image && (
                          <>
                            {/* Model 2: Parallax Floating Margins */}
                            {scrollModel === "parallax-margin" && (
                              <div className="my-3 relative aspect-[16/6] w-full overflow-hidden border border-foreground/5 bg-muted/10 translate-y-1 hover:translate-y-0 transition-transform duration-300">
                                <img 
                                  src={story.image} 
                                  alt=""
                                  className="object-cover w-full h-full filter grayscale group-hover:grayscale-0 transition-all duration-300"
                                />
                              </div>
                            )}

                            {/* Model 4: Inline Asymmetric Grid */}
                            {scrollModel === "inline-grid" && (
                              <div className="my-2 relative aspect-[16/10] w-full max-w-[200px] overflow-hidden border border-foreground/5 bg-muted/10 group-hover:-translate-x-1 transition-transform duration-300">
                                <img 
                                  src={story.image} 
                                  alt=""
                                  className="object-cover w-full h-full filter grayscale group-hover:grayscale-0 transition-all duration-300"
                                />
                              </div>
                            )}
                          </>
                        )}

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
                  )}
                </div>
              );
            })}
          </div>
        </main>

        {/* RIGHT PANEL: 40-45% width (lg:col-span-5) */}
        <aside className="lg:col-span-5 p-6 md:p-8 space-y-8 overflow-y-auto max-h-[calc(100vh-180px)]">
          
          {/* MODEL 3: Sticky Split Sync View */}
          {scrollModel === "sticky-split" ? (
            <div className="sticky top-0 space-y-6 animate-fade-in">
              <div className="border-b border-foreground pb-2">
                <span className="font-mono text-[9px] uppercase tracking-widest text-primary font-bold">
                  STICKY SYNCED VIEWPORT //
                </span>
                <h3 className="font-serif text-lg font-black mt-1">
                  Active story details auto-sync on scroll
                </h3>
              </div>

              {/* Sticky active story display */}
              {(() => {
                const activeStory = stories.find((s) => s.id === activeStoryInView) || stories[0];
                return (
                  <div className="space-y-4 transition-all duration-300">
                    <div className="font-mono text-[10px] text-primary font-bold">
                      {activeStory.sectors.join(" // ")}
                    </div>
                    <h2 className="font-serif text-xl md:text-2xl font-black leading-tight text-foreground">
                      {activeStory.title}
                    </h2>

                    {activeStory.image && (
                      <div className="relative aspect-[16/10] overflow-hidden border border-foreground bg-muted/10 shadow-lg">
                        <img 
                          src={activeStory.image} 
                          alt=""
                          className="object-cover w-full h-full filter grayscale-0 contrast-110 transition-all duration-300"
                        />
                      </div>
                    )}

                    <p className="font-serif text-xs leading-relaxed text-muted-foreground">
                      {activeStory.depth[depth].summary}
                    </p>

                    <div className="bg-primary/5 p-3 border-l-2 border-primary text-xs">
                      <p className="font-serif italic text-foreground">
                        {"analysis" in activeStory.depth[depth] ? (activeStory.depth[depth] as any).analysis : activeStory.depth[depth].summary}
                      </p>
                    </div>
                  </div>
                );
              })()}
            </div>
          ) : (
            // STANDARD DETAIL VIEW (For Models 1, 2, 4)
            selectedStoryId ? (
              <div className="space-y-6 animate-fade-in">
                <div className="flex justify-between items-center border-b border-foreground/10 pb-3">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground font-bold">
                    TELEMETRY DEPTH:
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

                <div className="space-y-2">
                  <div className="font-mono text-[10px] text-primary font-bold">
                    {selectedStory.sectors.join(" // ")}
                  </div>
                  <h2 className="font-serif text-2xl md:text-3xl font-black leading-tight text-foreground">
                    {selectedStory.title}
                  </h2>
                </div>

                {/* Show the right side photo (which was really nice) */}
                {selectedStory.image && (
                  <div className="relative aspect-[16/10] overflow-hidden border border-foreground bg-muted/10 shadow-md">
                    <img 
                      src={selectedStory.image} 
                      alt=""
                      className="object-cover w-full h-full filter grayscale contrast-110 hover:grayscale-0 transition-all duration-300"
                    />
                  </div>
                )}

                <div className="space-y-4 text-sm leading-relaxed text-foreground">
                  <div>
                    <div className="font-mono text-[9px] uppercase tracking-wider text-primary font-bold mb-1">
                      I. EXECUTIVE THESIS //
                    </div>
                    <p className="font-serif">
                      {selectedStory.depth[depth].summary}
                    </p>
                  </div>

                  <div className="bg-primary/5 p-4 border-l-2 border-primary">
                    <div className="font-mono text-[9px] uppercase tracking-wider text-primary font-bold mb-1">
                      II. CONVERGENCE IMPACT //
                    </div>
                    <p className="font-serif italic text-foreground">
                      {"analysis" in selectedStory.depth[depth] ? (selectedStory.depth[depth] as any).analysis : selectedStory.depth[depth].summary}
                    </p>
                  </div>

                  {"dataPoints" in selectedStory.depth[depth] && (
                    <div>
                      <div className="font-mono text-[9px] uppercase tracking-wider text-primary font-bold mb-2">
                        III. DECLASSIFIED METRICS //
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
                      IV. WHAT TO WATCH NEXT //
                    </div>
                    <p className="text-xs text-muted-foreground italic">
                      {selectedStory.depth[depth].whatToWatch}
                    </p>
                  </div>
                </div>

                <button 
                  onClick={() => setSelectedStoryId(null)}
                  className="w-full border border-foreground py-2 font-mono text-xs uppercase font-bold hover:bg-foreground hover:text-background transition-colors cursor-pointer"
                >
                  [CLOSE ANALYSIS WORKSPACE]
                </button>
              </div>
            ) : (
              // Default Overview Mode
              <div className="space-y-6 animate-fade-in">
                <div className="border border-foreground p-4 bg-background">
                  <h3 className="font-mono text-[10px] uppercase tracking-wider text-primary font-bold mb-3">
                    SYSTEM TELEMETRY
                  </h3>
                  <div className="divide-y divide-foreground/10 font-mono text-xs">
                    <div className="py-2 flex justify-between">
                      <span className="text-muted-foreground">OPERATOR:</span>
                      <span className="font-bold text-foreground">{profile.name.toUpperCase()}</span>
                    </div>
                    <div className="py-2 flex justify-between">
                      <span className="text-muted-foreground">ROLE CLEARANCE:</span>
                      <span className="font-bold text-foreground">{profile.role.toUpperCase()}</span>
                    </div>
                    <div className="py-2 flex justify-between">
                      <span className="text-muted-foreground">CHANNELS:</span>
                      <span className="font-bold text-foreground truncate max-w-[180px]">{profile.sectors.join(", ")}</span>
                    </div>
                  </div>
                </div>

                {/* Live Market Metrics panel */}
                <div className="space-y-3">
                  <h3 className="font-mono text-[10px] uppercase tracking-wider text-primary font-bold border-b border-foreground/10 pb-1">
                    MARKET DATA STREAM
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {MARKET_METRICS.slice(0, 4).map((metric) => {
                      const isUp = metric.trend === "up";
                      return (
                        <div key={metric.symbol} className="border border-foreground/10 p-3 bg-background flex flex-col justify-between">
                          <div className="flex justify-between items-start">
                            <span className="font-mono text-xs font-bold">{metric.symbol}</span>
                            <span className={`font-mono text-[9px] font-bold flex items-center ${isUp ? "text-emerald-600" : "text-rose-600"}`}>
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
              </div>
            )
          )}

        </aside>

      </div>
    </div>
  );
};
