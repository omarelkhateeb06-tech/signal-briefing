import React, { useState, useEffect } from "react";
import { useTheme } from "../contexts/ThemeContext";
import { MOCK_STORIES, BriefingStory } from "../lib/mockData";
import { SwissLayout } from "../components/layouts/SwissLayout";
import { TerminalLayout } from "../components/layouts/TerminalLayout";
import { ArchivistLayout } from "../components/layouts/ArchivistLayout";
import { ThemeSelector } from "../components/ThemeSelector";
import { OnboardingModal } from "../components/OnboardingModal";
import { ArrowUpRight, Cpu, Layers } from "lucide-react";

export default function Home() {
  const { movement, profile } = useTheme();
  const [isOnboardingOpen, setIsOnboardingOpen] = useState<boolean>(false);
  const [filteredStories, setFilteredStories] = useState<BriefingStory[]>(MOCK_STORIES);

  // Trigger onboarding on first visit
  useEffect(() => {
    if (!profile.hasCompletedOnboarding) {
      const timer = setTimeout(() => {
        setIsOnboardingOpen(true);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [profile.hasCompletedOnboarding]);

  // Dynamically filter and rank stories based on user onboarding choices
  useEffect(() => {
    // 1. Filter by focus sectors
    let results = MOCK_STORIES.filter((story) => {
      return story.sectors.some((sec) => profile.sectors.includes(sec));
    });

    // 2. Rank by relevance score based on role/seniority
    const roleKey = profile.seniority === "executive" 
      ? "executive" 
      : profile.role.toLowerCase().includes("analyst") 
        ? "analyst" 
        : profile.role.toLowerCase().includes("founder") 
          ? "founder" 
          : "general";

    results.sort((a, b) => {
      const scoreA = a.relevanceScores[roleKey] || a.relevanceScores.general;
      const scoreB = b.relevanceScores[roleKey] || b.relevanceScores.general;
      return scoreB - scoreA;
    });

    setFilteredStories(results);
  }, [profile]);

  return (
    <div className="relative min-h-screen">
      
      {/* Dynamic layout selection based on current active design movement */}
      {movement === "swiss" && (
        <SwissLayout 
          stories={filteredStories} 
          onOpenOnboarding={() => setIsOnboardingOpen(true)} 
        />
      )}

      {movement === "terminal" && (
        <TerminalLayout 
          stories={filteredStories} 
          onOpenOnboarding={() => setIsOnboardingOpen(true)} 
        />
      )}

      {movement === "archivist" && (
        <ArchivistLayout 
          stories={filteredStories} 
          onOpenOnboarding={() => setIsOnboardingOpen(true)} 
        />
      )}

      {/* Floating Theme Selector control bar */}
      <ThemeSelector />

      {/* Onboarding Preference modal */}
      <OnboardingModal 
        isOpen={isOnboardingOpen} 
        onClose={() => setIsOnboardingOpen(false)} 
      />
    </div>
  );
}
