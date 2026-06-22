import React, { useState } from "react";
import { useTheme } from "../../contexts/ThemeContext";
import { BriefingStory } from "../../lib/mockData";

interface ContrarianLayoutProps {
  stories: BriefingStory[];
  onOpenOnboarding: () => void;
}

export const ContrarianLayout: React.FC<ContrarianLayoutProps> = ({ stories, onOpenOnboarding }) => {
  const { depth, setDepth, profile } = useTheme();
  const [expandedStoryId, setExpandedStoryId] = useState<string | null>("story-1");

  const toggleStory = (id: string) => {
    setExpandedStoryId(expandedStoryId === id ? null : id);
  };

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
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/20 selection:text-primary pb-24">
      {/* Utility Top Bar (Extremely Minimal) */}
      <div className="border-b border-border px-4 py-2 flex justify-between items-center text-[11px] font-mono text-muted-foreground bg-white">
        <div className="flex gap-4">
          <span>{stories.length} STORIES RANKED FOR YOU TODAY</span>
          <span className="text-primary font-bold">• 3 UNREAD SINCE LAST VISIT</span>
        </div>
        <button 
          onClick={onOpenOnboarding}
          className="text-foreground hover:text-primary font-bold underline cursor-pointer"
        >
          [CALIBRATE PROFILE]
        </button>
      </div>

      {/* Main Stream */}
      <main className="max-w-4xl mx-auto px-4 mt-6">
        <div className="flex flex-col border border-border bg-white divide-y divide-border">
          {stories.map((story, index) => {
            const isExpanded = expandedStoryId === story.id;
            const score = getRelevanceScore(story);
            const isTop3 = index < 3;

            return (
              <div 
                key={story.id}
                className={`transition-colors ${isExpanded ? "bg-background/40" : "hover:bg-background/20"}`}
              >
                {/* Collapsed Row */}
                <div 
                  onClick={() => toggleStory(story.id)}
                  className="flex items-center justify-between px-4 py-3 cursor-pointer gap-4 min-h-[72px]"
                >
                  <div className="flex items-center gap-4 min-w-0 flex-1">
                    {/* Bold Rank Gutter */}
                    <span className={`font-mono text-base font-black w-6 text-center ${isTop3 ? "text-primary" : "text-muted-foreground"}`}>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    
                    {/* Headline and Thesis */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap mb-0.5">
                        {story.sectors.map((sec) => (
                          <span key={sec} className="font-mono text-[9px] uppercase font-semibold text-muted-foreground tracking-tight">
                            {sec}
                          </span>
                        ))}
                        <span className="font-mono text-[9px] text-muted-foreground">•</span>
                        <span className="font-mono text-[9px] text-muted-foreground">{story.readTime}</span>
                      </div>
                      <h3 className="font-sans text-sm font-bold text-foreground leading-tight truncate">
                        {story.title}
                      </h3>
                    </div>
                  </div>

                  {/* Right-aligned metadata pills */}
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="font-mono text-[10px] bg-secondary px-2 py-0.5 font-bold text-secondary-foreground rounded-sm">
                      MATCH {score}%
                    </span>
                    <span className="font-mono text-[10px] text-muted-foreground hidden sm:inline">
                      {story.sourceCount} SRCs
                    </span>
                  </div>
                </div>

                {/* Inline Expanded View */}
                {isExpanded && (
                  <div className="px-4 pb-6 pt-2 border-t border-dashed border-border bg-white animate-fade-in space-y-4">
                    {/* Depth Selector Tabs inside the card */}
                    <div className="flex items-center gap-1 border-b border-border pb-2">
                      {(["accessible", "briefed", "technical"] as const).map((level) => (
                        <button
                          key={level}
                          onClick={(e) => {
                            e.stopPropagation();
                            setDepth(level);
                          }}
                          className={`px-2.5 py-0.5 font-mono text-[10px] uppercase font-bold transition-all cursor-pointer ${
                            depth === level
                              ? "bg-primary text-primary-foreground"
                              : "text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          {level}
                        </button>
                      ))}
                    </div>

                    {/* Thesis summary */}
                    <div className="space-y-1">
                      <div className="font-mono text-[9px] uppercase tracking-wider text-primary font-black">
                        CORE THESIS //
                      </div>
                      <p className="text-sm leading-relaxed text-foreground font-medium">
                        {story.depth[depth].summary}
                      </p>
                    </div>

                    {/* Extended analysis */}
                    {"analysis" in story.depth[depth] && (
                      <div className="space-y-1 bg-background p-3 border-l-2 border-primary">
                        <div className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground font-black">
                          SITUATIONAL REPORT //
                        </div>
                        <p className="text-xs leading-relaxed text-foreground">
                          {(story.depth[depth] as any).analysis}
                        </p>
                      </div>
                    )}

                    {/* Technical Telemetry */}
                    {"dataPoints" in story.depth[depth] && (
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-[10px] pt-1">
                        {(story.depth[depth] as any).dataPoints.map((dp: any, idx: number) => (
                          <div key={idx} className="border border-border p-2 bg-background">
                            <div className="text-[8px] text-muted-foreground uppercase">{dp.label}</div>
                            <div className="font-bold text-foreground mt-0.5">{dp.value}</div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Key indicators to watch */}
                    <div className="pt-2 border-t border-border">
                      <div className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground font-black mb-1">
                        INDICATORS TO MONITOR //
                      </div>
                      <p className="text-xs leading-relaxed text-foreground italic">
                        {story.depth[depth].whatToWatch}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};
