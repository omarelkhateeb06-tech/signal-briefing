import React, { useState, useMemo } from "react";
import { useTheme } from "../../contexts/ThemeContext";
import { BriefingStory, MARKET_METRICS } from "../../lib/mockData";
import { 
  ArrowUpRight, ArrowDownRight, Layers, Cpu, BarChart3, Database, 
  Sparkles, ShieldCheck, MessageSquare, ExternalLink, Bookmark, BookmarkCheck,
  TrendingUp, Compass, Newspaper, FileText, Code, Check, RefreshCw
} from "lucide-react";

interface SwissCommandLayoutProps {
  stories: BriefingStory[];
  onOpenOnboarding: () => void;
}

export const SwissCommandLayout: React.FC<SwissCommandLayoutProps> = ({ stories, onOpenOnboarding }) => {
  const { depth, setDepth, profile, updateProfile } = useTheme();
  
  // Concept exploration state: "magazine" (A), "dashboard" (B), "brief" (C)
  const [activeConcept, setActiveConcept] = useState<"magazine" | "dashboard" | "brief">("magazine");
  
  // Active detailed story modal/view state
  const [selectedStoryId, setSelectedStoryId] = useState<string | null>(null);
  
  // Local saved takeaways state
  const [savedTakeaways, setSavedTakeaways] = useState<string[]>(() => {
    const saved = localStorage.getItem("signal-takeaways-v5");
    return saved ? JSON.parse(saved) : [];
  });

  const toggleTakeaway = (storyId: string) => {
    const updated = savedTakeaways.includes(storyId)
      ? savedTakeaways.filter(id => id !== storyId)
      : [...savedTakeaways, storyId];
    setSavedTakeaways(updated);
    localStorage.setItem("signal-takeaways-v5", JSON.stringify(updated));
  };

  // Get current active detailed story
  const selectedStory = useMemo(() => {
    return stories.find(s => s.id === selectedStoryId) || null;
  }, [stories, selectedStoryId]);

  // Profile selection simulation
  const handleProfileSwap = (role: string, seniority: "analyst" | "founder" | "executive" | "general", sectors: string[]) => {
    updateProfile({
      name: seniority === "analyst" ? "Alex Mercer" : seniority === "founder" ? "Omar Elkhateeb" : "Sarah Jenkins",
      role,
      seniority,
      sectors
    });
  };

  // Render content-type-aware cards
  const renderCard = (story: BriefingStory, index: number) => {
    const score = story.relevanceScores[profile.seniority] || story.relevanceScores.general;
    const currentTake = story.depth[depth];
    const isSaved = savedTakeaways.includes(story.id);

    switch (story.contentType) {
      case "connection":
        return (
          <div key={story.id} className="border-2 border-foreground p-6 bg-card space-y-6 relative group transition-all duration-300 hover:shadow-[4px_4px_0px_0px_rgba(139,69,19,0.15)]">
            {/* Branded Label */}
            <div className="flex justify-between items-center border-b border-foreground/15 pb-3">
              <span className="font-mono text-[10px] font-black uppercase tracking-[0.2em] text-primary bg-primary/10 px-2 py-0.5">
                {story.brandedLabel}
              </span>
              <div className="flex items-center gap-3 font-mono text-[10px] text-muted-foreground">
                <span>{story.readTime.toUpperCase()}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  CRED: {story.credibilityRating}%
                </span>
              </div>
            </div>

            {/* Personalized Lead Explanation */}
            <div className="space-y-2">
              <span className="font-mono text-[9px] uppercase tracking-widest text-primary font-bold">
                WHY THIS MATTERS TO YOU //
              </span>
              <p className="font-serif text-lg md:text-xl font-bold leading-relaxed text-foreground italic decoration-primary/20 decoration-wavy underline">
                "{currentTake.whyItMatters}"
              </p>
            </div>

            {/* Flagship Causal Chain Visualization */}
            {story.causalChain && (
              <div className="bg-secondary/40 p-4 border border-foreground/15 space-y-4">
                <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground font-bold block">
                  CONVERGENCE PATHWAY //
                </span>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative">
                  {story.causalChain.map((step, idx) => (
                    <div key={idx} className="relative flex flex-col justify-between p-3 border border-foreground/10 bg-background/50">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-mono text-[10px] font-black bg-foreground text-background w-5 h-5 flex items-center justify-center">
                          {step.step}
                        </span>
                        <span className="font-mono text-[10px] font-black uppercase tracking-wider text-foreground">
                          {step.label}
                        </span>
                      </div>
                      <p className="font-serif text-xs text-muted-foreground leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Title & Attribution */}
            <div className="pt-2">
              <h3 className="font-serif text-xl font-black leading-tight text-foreground group-hover:text-primary transition-colors cursor-pointer" onClick={() => setSelectedStoryId(story.id)}>
                {story.title}
              </h3>
              <div className="flex justify-between items-center mt-3 text-xs font-mono text-muted-foreground">
                <span>{story.attribution}</span>
                <div className="flex items-center gap-3">
                  <button onClick={() => toggleTakeaway(story.id)} className="hover:text-primary flex items-center gap-1">
                    {isSaved ? <BookmarkCheck className="w-3.5 h-3.5 text-primary" /> : <Bookmark className="w-3.5 h-3.5" />}
                    <span className="text-[9px]">{isSaved ? "SAVED" : "SAVE TAKEAWAY"}</span>
                  </button>
                  <button onClick={() => setSelectedStoryId(story.id)} className="hover:text-primary flex items-center gap-1">
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span className="text-[9px]">FULL BRIEF ({story.sourceCount} SOURCES)</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case "research":
        return (
          <div key={story.id} className="border border-foreground p-5 bg-card space-y-4 relative group transition-all duration-300 hover:shadow-[4px_4px_0px_0px_rgba(139,69,19,0.1)]">
            <div className="flex justify-between items-center border-b border-foreground/10 pb-2">
              <span className="font-mono text-[10px] font-black uppercase tracking-[0.2em] text-foreground border border-foreground px-2 py-0.5">
                {story.brandedLabel}
              </span>
              <span className="font-mono text-[10px] text-muted-foreground">
                CREDIBILITY: {story.credibilityRating}%
              </span>
            </div>

            {/* Lead personalized take */}
            <div className="space-y-1">
              <span className="font-mono text-[9px] uppercase tracking-widest text-primary font-bold">
                SYNTHESIS //
              </span>
              <p className="font-serif text-base font-bold leading-relaxed text-foreground">
                {currentTake.whyItMatters}
              </p>
            </div>

            {/* Abstract Diagram Motif */}
            {story.image && (
              <div className="relative aspect-[21/9] overflow-hidden border border-foreground/10 filter grayscale contrast-125 group-hover:grayscale-0 transition-all duration-500">
                <img src={story.image} alt="" className="object-cover w-full h-full" />
                <div className="absolute inset-0 bg-primary/5 mix-blend-multiply" />
                <div className="absolute bottom-2 left-2 bg-background/90 px-2 py-0.5 font-mono text-[8px] uppercase border border-foreground/15">
                  SCHOLARLY GRAPH // FIG. 01
                </div>
              </div>
            )}

            <div>
              <h3 className="font-serif text-lg font-black leading-tight text-foreground group-hover:text-primary transition-colors cursor-pointer" onClick={() => setSelectedStoryId(story.id)}>
                {story.title}
              </h3>
              <div className="flex justify-between items-center mt-3 text-xs font-mono text-muted-foreground">
                <span>{story.attribution}</span>
                <button onClick={() => setSelectedStoryId(story.id)} className="hover:text-primary text-[9px] font-bold">
                  [READ SYNTHESIS BRIEF]
                </button>
              </div>
            </div>
          </div>
        );

      case "practitioner":
        return (
          <div key={story.id} className="border border-foreground p-5 bg-card space-y-4 relative group transition-all duration-300">
            <div className="flex justify-between items-center border-b border-foreground/10 pb-2">
              <span className="font-mono text-[10px] font-black uppercase tracking-[0.2em] text-primary">
                {story.brandedLabel}
              </span>
              <span className="font-mono text-[10px] text-muted-foreground">
                {story.commentCount} HN COMMENTS
              </span>
            </div>

            {/* Lead personalized take */}
            <div className="space-y-1">
              <span className="font-mono text-[9px] uppercase tracking-widest text-primary font-bold">
                COMMUNITY CONCENSUS //
              </span>
              <p className="font-serif text-base font-bold leading-relaxed text-foreground">
                {currentTake.whyItMatters}
              </p>
            </div>

            {/* Conversational Quote Aesthetic */}
            {story.communityQuotes && (
              <div className="border-l-2 border-primary/40 pl-4 py-1 space-y-3">
                {story.communityQuotes.map((q, idx) => (
                  <div key={idx} className="space-y-1">
                    <p className="font-serif text-xs italic text-muted-foreground leading-relaxed">
                      "{q.quote}"
                    </p>
                    <div className="font-mono text-[9px] text-primary/80">
                      — @{q.user} ({q.upvotes} upvotes)
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div>
              <h3 className="font-serif text-lg font-black leading-tight text-foreground group-hover:text-primary transition-colors cursor-pointer" onClick={() => setSelectedStoryId(story.id)}>
                {story.title}
              </h3>
              <div className="flex justify-between items-center mt-3 text-xs font-mono text-muted-foreground">
                <span>{story.attribution}</span>
                <button onClick={() => setSelectedStoryId(story.id)} className="hover:text-primary text-[9px] font-bold">
                  [VIEW DISCUSSION MATRIX]
                </button>
              </div>
            </div>
          </div>
        );

      case "earnings":
        return (
          <div key={story.id} className="border border-foreground p-5 bg-card grid grid-cols-1 md:grid-cols-12 gap-6 relative group transition-all duration-300">
            
            {/* Left side: Big Stat as Hero */}
            {story.bigStat && (
              <div className="md:col-span-4 flex flex-col justify-center items-center border border-foreground/15 p-4 bg-secondary/30 text-center relative overflow-hidden">
                <div className="absolute top-1 left-1 font-mono text-[8px] uppercase text-muted-foreground">
                  THE ONE NUMBER THAT MATTERED
                </div>
                <span className="font-serif text-5xl md:text-6xl font-black text-primary tracking-tighter my-2">
                  {story.bigStat.value}
                </span>
                <span className="font-mono text-[10px] font-black uppercase text-foreground">
                  {story.bigStat.label}
                </span>
                <p className="font-serif text-[10px] text-muted-foreground leading-tight mt-2">
                  {story.bigStat.context}
                </p>
              </div>
            )}

            {/* Right side: Lead explanation and title */}
            <div className="md:col-span-8 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center border-b border-foreground/10 pb-2">
                  <span className="font-mono text-[10px] font-black uppercase tracking-[0.2em] text-foreground">
                    DATA-LED REACTION
                  </span>
                  <span className="font-mono text-[10px] text-muted-foreground">
                    SEC FORM 10-Q
                  </span>
                </div>
                <span className="font-mono text-[9px] uppercase tracking-widest text-primary font-bold block">
                  PERSONALIZED ANALYSIS //
                </span>
                <p className="font-serif text-sm font-bold leading-relaxed text-foreground">
                  {currentTake.whyItMatters}
                </p>
              </div>

              <div>
                <h3 className="font-serif text-base font-black leading-tight text-foreground group-hover:text-primary transition-colors cursor-pointer" onClick={() => setSelectedStoryId(story.id)}>
                  {story.title}
                </h3>
                <div className="flex justify-between items-center mt-2 text-[10px] font-mono text-muted-foreground">
                  <span>{story.attribution}</span>
                  <button onClick={() => setSelectedStoryId(story.id)} className="hover:text-primary font-bold">
                    [FULL MODEL MATRIX]
                  </button>
                </div>
              </div>
            </div>

          </div>
        );

      case "news-cluster":
        return (
          <div key={story.id} className="border border-foreground p-5 bg-card space-y-4 relative group transition-all duration-300">
            <div className="flex justify-between items-center border-b border-foreground/10 pb-2">
              <span className="font-mono text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
                EDITORIAL CLUSTER
              </span>
              <span className="font-mono text-[10px] text-muted-foreground">
                COVERED BY {story.sources?.slice(0, 2).join(", ")} +{story.sourceCount - 2} OUTLETS
              </span>
            </div>

            {/* Lead personalized take */}
            <div className="space-y-1">
              <span className="font-mono text-[9px] uppercase tracking-widest text-primary font-bold">
                THE BRIEF //
              </span>
              <p className="font-serif text-base font-bold leading-relaxed text-foreground">
                {currentTake.whyItMatters}
              </p>
            </div>

            {/* Source image */}
            {story.image && (
              <div className="relative aspect-[21/9] overflow-hidden border border-foreground/10 filter grayscale group-hover:grayscale-0 transition-all duration-500">
                <img src={story.image} alt="" className="object-cover w-full h-full" />
              </div>
            )}

            <div>
              <h3 className="font-serif text-lg font-black leading-tight text-foreground group-hover:text-primary transition-colors cursor-pointer" onClick={() => setSelectedStoryId(story.id)}>
                {story.title}
              </h3>
              <div className="flex justify-between items-center mt-3 text-xs font-mono text-muted-foreground">
                <div className="flex gap-2">
                  {story.sources?.map((src, idx) => (
                    <span key={idx} className="bg-secondary px-1.5 py-0.5 border border-foreground/10 text-[9px] font-bold">
                      {src.toUpperCase()}
                    </span>
                  ))}
                </div>
                <button onClick={() => setSelectedStoryId(story.id)} className="hover:text-primary text-[9px] font-bold">
                  [VIEW SOURCE MATRIX]
                </button>
              </div>
            </div>
          </div>
        );

      case "tool-spotlight":
        return (
          <div key={story.id} className="border border-foreground p-5 bg-card space-y-4 relative group transition-all duration-300">
            <div className="flex justify-between items-center border-b border-foreground/10 pb-2">
              <span className="font-mono text-[10px] font-black uppercase tracking-[0.2em] text-primary">
                {story.brandedLabel}
              </span>
              <span className="font-mono text-[10px] text-muted-foreground">
                {story.toolSpecs?.stars}
              </span>
            </div>

            {/* Lead personalized take */}
            <div className="space-y-1">
              <span className="font-mono text-[9px] uppercase tracking-widest text-primary font-bold">
                SHOULD YOU SPEND AN AFTERNOON ON THIS? //
              </span>
              <p className="font-serif text-base font-bold leading-relaxed text-foreground">
                {currentTake.whyItMatters}
              </p>
            </div>

            {/* Tool specs box */}
            {story.toolSpecs && (
              <div className="bg-secondary/30 p-3 border border-dashed border-foreground/20 font-mono text-xs space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">REPOSITORY:</span>
                  <span className="font-bold text-foreground">{story.toolSpecs.repo}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">WHY NOW:</span>
                  <span className="font-bold text-foreground text-right max-w-[250px] truncate">{story.toolSpecs.whyNow}</span>
                </div>
              </div>
            )}

            <div>
              <h3 className="font-serif text-lg font-black leading-tight text-foreground group-hover:text-primary transition-colors cursor-pointer" onClick={() => setSelectedStoryId(story.id)}>
                {story.title}
              </h3>
              <div className="flex justify-between items-center mt-3 text-xs font-mono text-muted-foreground">
                <span>{story.attribution}</span>
                <button onClick={() => setSelectedStoryId(story.id)} className="hover:text-primary text-[9px] font-bold">
                  [VIEW TRITON SPECS]
                </button>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/10 selection:text-primary pb-32">
      
      {/* Top Banner Navigation matching screenshot */}
      <nav className="border-b border-foreground p-3 md:px-12 bg-background/95 backdrop-blur sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-xs font-mono font-bold">
          <div className="flex gap-6">
            <button className="text-primary hover:underline">[FEED]</button>
            <button className="text-muted-foreground hover:text-foreground hover:underline">[SAVED]</button>
            <button className="text-muted-foreground hover:text-foreground hover:underline">[SEARCH]</button>
            <button className="text-muted-foreground hover:text-foreground hover:underline">[SETTINGS]</button>
            <button className="text-muted-foreground hover:text-foreground hover:underline">[ARCHIVE]</button>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-primary font-black animate-pulse">UPGRADE TO PRO</span>
            <div className="flex items-center gap-2 border border-foreground/15 px-2.5 py-1 bg-card">
              <span>{profile.name} ({profile.seniority.toUpperCase()})</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Swiss Masthead spanning full width */}
      <header className="border-b border-foreground p-6 md:px-12 bg-background">
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
            <div>EDITION: June 5, 2026</div>
            <div>PUBLISHED: 05:00 UTC</div>
            <div>PREPARED FOR: <span className="text-foreground font-bold underline decoration-solid decoration-primary">{profile.name.toUpperCase()}</span></div>
          </div>
        </div>

        {/* Volume & Sector indicators below */}
        <div className="max-w-7xl mx-auto border-t border-foreground/15 mt-6 pt-3 flex flex-wrap justify-between items-center gap-4 text-xs font-mono text-muted-foreground">
          <div>
            <span>VOL. IV // ISSUE 156</span>
            <span className="mx-3">|</span>
            <span>TRACKED: <span className="text-foreground font-bold uppercase">{profile.sectors.join(" • ")}</span></span>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={onOpenOnboarding}
              className="text-primary hover:underline font-bold cursor-pointer"
            >
              [RE-CALIBRATE FEED PROFILE]
            </button>
          </div>
        </div>
      </header>

      {/* Main split 2-panel workspace */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 border-b border-foreground">
        
        {/* LEFT PANEL: 60% width (lg:col-span-7) */}
        <main className="lg:col-span-7 border-r border-foreground p-6 md:p-8 space-y-6">
          
          {/* Concept Switcher header */}
          <div className="flex justify-between items-center border-b border-foreground/15 pb-4">
            <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              RANKED STREAM
            </h2>
            <div className="flex gap-2 bg-secondary p-0.5 border border-foreground/15">
              {(["magazine", "dashboard", "brief"] as const).map((concept) => (
                <button
                  key={concept}
                  onClick={() => setActiveConcept(concept)}
                  className={`px-3 py-1 font-mono text-[9px] uppercase font-bold cursor-pointer transition-all ${
                    activeConcept === concept
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {concept === "magazine" ? "A. MAGAZINE SCROLL" : concept === "dashboard" ? "B. DASHBOARD" : "C. CURATED BRIEF"}
                </button>
              ))}
            </div>
          </div>

          {/* RENDER ACTIVE CONCEPT LAYOUT */}
          {activeConcept === "magazine" && (
            <div className="space-y-8 animate-fade-in">
              {/* High-density, varied, scroll-worthy editorial feed */}
              {stories.map((story, index) => renderCard(story, index))}
            </div>
          )}

          {activeConcept === "dashboard" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-in">
              {/* High-density Bloomberg style command dashboard */}
              {stories.map((story, index) => (
                <div key={story.id} className="border border-foreground p-4 bg-card flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center border-b border-foreground/10 pb-1.5">
                      <span className="font-mono text-[9px] font-black text-primary">{story.brandedLabel}</span>
                      <span className="font-mono text-[9px] text-muted-foreground">RANK {index + 1}</span>
                    </div>
                    <h3 className="font-serif text-sm font-black text-foreground line-clamp-2">{story.title}</h3>
                    <p className="font-serif text-xs italic text-muted-foreground line-clamp-3">
                      "{story.depth[depth].whyItMatters}"
                    </p>
                  </div>
                  <button onClick={() => setSelectedStoryId(story.id)} className="w-full border border-foreground py-1 font-mono text-[9px] uppercase font-bold hover:bg-foreground hover:text-background transition-colors">
                    [TRIAGE BRIEF]
                  </button>
                </div>
              ))}
            </div>
          )}

          {activeConcept === "brief" && (
            <div className="space-y-6 animate-fade-in">
              {/* Curated Through-Line Thread connecting all stories */}
              <div className="border border-foreground p-5 bg-primary/5 border-l-4 border-l-primary space-y-3">
                <h3 className="font-mono text-[10px] font-black text-primary uppercase tracking-widest">
                  THE THROUGH-LINE // June 5, 2026
                </h3>
                <p className="font-serif text-sm leading-relaxed text-foreground italic">
                  "Today's macro picture connects Middle Eastern sovereign wealth directly to 2nm semiconductor yields, triggering a software decentralization loop (Triton 3.0) that commoditizes NVLink/CUDA and reshapes LLM training models for developers."
                </p>
              </div>

              <div className="divide-y divide-foreground/15">
                {stories.map((story, index) => (
                  <div key={story.id} className="py-4 first:pt-0 flex justify-between items-start gap-4">
                    <div className="space-y-1">
                      <span className="font-mono text-[9px] text-primary font-bold">RANK {index + 1} // {story.brandedLabel}</span>
                      <h4 className="font-serif text-base font-bold text-foreground">{story.title}</h4>
                      <p className="font-serif text-xs text-muted-foreground leading-relaxed">{story.depth[depth].whyItMatters}</p>
                    </div>
                    <button onClick={() => setSelectedStoryId(story.id)} className="font-mono text-[9px] text-primary hover:underline shrink-0">
                      [OPEN]
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

        </main>

        {/* RIGHT PANEL: 40% width (lg:col-span-5) */}
        <aside className="lg:col-span-5 p-6 md:p-8 space-y-8">
          
          {/* Active story detail drawer / focused workspace */}
          {selectedStory ? (
            <div className="space-y-6 animate-fade-in sticky top-24 border border-foreground p-5 bg-card">
              <div className="flex justify-between items-center border-b border-foreground/10 pb-3">
                <span className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground font-bold">
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
                <span className="font-mono text-[9px] text-primary font-bold">{selectedStory.brandedLabel} // {selectedStory.sectors.join(" • ").toUpperCase()}</span>
                <h2 className="font-serif text-2xl font-black leading-tight text-foreground">
                  {selectedStory.title}
                </h2>
              </div>

              {selectedStory.image && (
                <div className="relative aspect-[16/10] overflow-hidden border border-foreground bg-muted/10">
                  <img src={selectedStory.image} alt="" className="object-cover w-full h-full filter grayscale contrast-110" />
                </div>
              )}

              <div className="space-y-4 text-xs leading-relaxed text-foreground">
                <div>
                  <div className="font-mono text-[8px] uppercase tracking-wider text-primary font-bold mb-1">
                    I. EXECUTIVE THESIS //
                  </div>
                  <p className="font-serif">{selectedStory.depth[depth].summary}</p>
                </div>

                <div className="bg-primary/5 p-3 border-l-2 border-primary">
                  <div className="font-mono text-[8px] uppercase tracking-wider text-primary font-bold mb-1">
                    II. PERSONALIZED WHY IT MATTERS //
                  </div>
                  <p className="font-serif italic">{selectedStory.depth[depth].whyItMatters}</p>
                </div>

                {"analysis" in selectedStory.depth[depth] && (
                  <div>
                    <div className="font-mono text-[8px] uppercase tracking-wider text-primary font-bold mb-1">
                      III. CONVERGENCE ANALYSIS //
                    </div>
                    <p className="font-serif">{(selectedStory.depth[depth] as any).analysis}</p>
                  </div>
                )}

                {"dataPoints" in selectedStory.depth[depth] && (
                  <div>
                    <div className="font-mono text-[8px] uppercase tracking-wider text-primary font-bold mb-2">
                      IV. KEY DATA METRICS //
                    </div>
                    <div className="grid grid-cols-2 gap-2 font-mono text-[9px]">
                      {(selectedStory.depth[depth] as any).dataPoints.map((dp: any, idx: number) => (
                        <div key={idx} className="border border-foreground p-2 bg-background">
                          <div className="text-[7px] text-muted-foreground uppercase">{dp.label}</div>
                          <div className="font-bold text-foreground mt-0.5">{dp.value}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <button 
                onClick={() => setSelectedStoryId(null)}
                className="w-full border border-foreground py-2 font-mono text-xs uppercase font-bold hover:bg-foreground hover:text-background transition-colors cursor-pointer"
              >
                [CLOSE DETAILS]
              </button>
            </div>
          ) : (
            // Default Overview Mode matching screenshot
            <div className="space-y-6 sticky top-24">
              
              {/* Curated Through-Line banner */}
              <div className="border border-foreground p-5 bg-card relative">
                <span className="font-mono text-[9px] uppercase tracking-widest text-primary font-bold block mb-1">
                  THE THROUGH-LINE //
                </span>
                <p className="font-serif text-sm italic leading-relaxed text-foreground">
                  "The thread connecting today's stories — written for your role."
                </p>
                <button className="font-mono text-[10px] text-primary font-black hover:underline mt-2 flex items-center gap-1">
                  UPGRADE TO PRO — $10/MONTH →
                </button>
              </div>

              {/* Intelligence Profile matching screenshot */}
              <div className="border border-foreground p-4 bg-card">
                <h3 className="font-mono text-[10px] uppercase tracking-wider text-primary font-bold border-b border-foreground/10 pb-2 mb-3">
                  INTELLIGENCE PROFILE //
                </h3>
                <div className="divide-y divide-foreground/10 font-mono text-xs">
                  <div className="py-2 flex justify-between">
                    <span className="text-muted-foreground">READER</span>
                    <span className="font-bold text-foreground">Omar Elkhateeb</span>
                  </div>
                  <div className="py-2 flex justify-between">
                    <span className="text-muted-foreground">ROLE</span>
                    <span className="font-bold text-foreground">{profile.role}</span>
                  </div>
                  <div className="py-2 flex justify-between">
                    <span className="text-muted-foreground">SECTORS</span>
                    <span className="font-bold text-primary truncate max-w-[200px]">{profile.sectors.join(" ").toUpperCase()}</span>
                  </div>
                </div>

                {/* Profile Simulation Swapper */}
                <div className="mt-4 pt-3 border-t border-foreground/10 space-y-2">
                  <span className="font-mono text-[8px] text-muted-foreground uppercase block">SIMULATE PERSONALIZED ROLES:</span>
                  <div className="flex flex-wrap gap-1">
                    <button 
                      onClick={() => handleProfileSwap("Semiconductor VC Analyst", "analyst", ["Semiconductors", "Finance"])}
                      className={`px-2 py-1 font-mono text-[8px] uppercase font-bold border cursor-pointer ${profile.seniority === "analyst" ? "bg-primary text-primary-foreground border-primary" : "border-foreground/10"}`}
                    >
                      [VC Analyst]
                    </button>
                    <button 
                      onClick={() => handleProfileSwap("AI Startup Founder", "founder", ["AI", "Finance"])}
                      className={`px-2 py-1 font-mono text-[8px] uppercase font-bold border cursor-pointer ${profile.seniority === "founder" ? "bg-primary text-primary-foreground border-primary" : "border-foreground/10"}`}
                    >
                      [AI Founder]
                    </button>
                    <button 
                      onClick={() => handleProfileSwap("Sovereign Wealth Director", "executive", ["AI", "Semiconductors", "Finance"])}
                      className={`px-2 py-1 font-mono text-[8px] uppercase font-bold border cursor-pointer ${profile.seniority === "executive" ? "bg-primary text-primary-foreground border-primary" : "border-foreground/10"}`}
                    >
                      [Sovereign Director]
                    </button>
                  </div>
                </div>
              </div>

              {/* Saved Takeaways panel */}
              <div className="border border-foreground p-4 bg-card">
                <h3 className="font-mono text-[10px] uppercase tracking-wider text-primary font-bold border-b border-foreground/10 pb-2 mb-3">
                  SAVED TAKEAWAYS //
                </h3>
                {savedTakeaways.length > 0 ? (
                  <div className="space-y-3 max-h-[250px] overflow-y-auto">
                    {savedTakeaways.map(id => {
                      const story = stories.find(s => s.id === id);
                      if (!story) return null;
                      return (
                        <div key={id} className="border border-foreground/5 p-2.5 bg-background space-y-1 relative group">
                          <span className="font-mono text-[8px] text-primary font-bold uppercase">{story.brandedLabel}</span>
                          <p className="font-serif text-xs italic text-foreground leading-tight">
                            "{story.depth[depth].whyItMatters}"
                          </p>
                          <button 
                            onClick={() => toggleTakeaway(id)}
                            className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 font-mono text-[8px] text-destructive hover:underline cursor-pointer"
                          >
                            [ERASE]
                          </button>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="font-serif text-xs text-muted-foreground italic leading-relaxed">
                    Bookmark a key takeaway in any story and it gets pinned here.
                  </p>
                )}
              </div>

              {/* Live Market Metrics panel matching screenshot */}
              <div className="space-y-3">
                <h3 className="font-mono text-[10px] uppercase tracking-wider text-primary font-bold border-b border-foreground/10 pb-1">
                  MARKET CONTEXT // <span className="text-[8px] text-muted-foreground font-normal">INDICATIVE</span>
                </h3>
                <div className="divide-y divide-foreground/10 font-mono text-xs bg-card border border-foreground/10 p-3">
                  {MARKET_METRICS.map((metric) => {
                    const isUp = metric.trend === "up";
                    return (
                      <div key={metric.symbol} className="py-2 flex justify-between items-center">
                        <div className="flex gap-2">
                          <span className="font-bold text-foreground">{metric.symbol}</span>
                          <span className="text-muted-foreground text-[10px]">{metric.name}</span>
                        </div>
                        <div className="flex gap-3">
                          <span className="font-black text-foreground">{metric.value}</span>
                          <span className={`font-bold ${isUp ? "text-emerald-600" : "text-rose-600"}`}>
                            {metric.change}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          )}

        </aside>

      </div>
    </div>
  );
};
