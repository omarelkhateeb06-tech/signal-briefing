import React, { useState, useMemo } from "react";
import { useTheme } from "../contexts/ThemeContext";
import { MOCK_STORIES } from "../lib/mockData";
import { OnboardingModal } from "../components/OnboardingModal";
import { ThemeSelector } from "../components/ThemeSelector";
import { SwissCommandLayout } from "../components/layouts/SwissCommandLayout";

export default function Home() {
  const { profile } = useTheme();
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);

  // Dynamic ranking engine based on user focus sectors and seniority matching
  const processedStories = useMemo(() => {
    const roleKey = profile.seniority === "executive" 
      ? "executive" 
      : profile.role.toLowerCase().includes("analyst") 
        ? "analyst" 
        : profile.role.toLowerCase().includes("founder") 
          ? "founder" 
          : "general";

    return [...MOCK_STORIES]
      .map((story) => {
        const lowercaseProfileSectors = profile.sectors.map((s: string) => s.toLowerCase());
        const sectorMatchCount = story.sectors.filter((s: string) => lowercaseProfileSectors.includes(s.toLowerCase())).length;
        const baseRelevance = story.relevanceScores[roleKey] || story.relevanceScores.general;
        
        const finalScore = Math.min(100, Math.max(0, baseRelevance + (sectorMatchCount * 10)));

        return {
          ...story,
          calculatedScore: finalScore
        };
      })
      .sort((a, b) => b.calculatedScore - a.calculatedScore);
  }, [profile]);

  return (
    <div className="relative min-h-screen">
      {/* Exclusively render Swiss Command Layout */}
      <SwissCommandLayout stories={processedStories} onOpenOnboarding={() => setIsOnboardingOpen(true)} />

      {/* Floating Photo Scroll Model Switcher console */}
      <ThemeSelector />

      {/* Profile calibration onboarding modal */}
      <OnboardingModal isOpen={isOnboardingOpen} onClose={() => setIsOnboardingOpen(false)} />
    </div>
  );
}
