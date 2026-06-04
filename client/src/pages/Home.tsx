import React, { useState, useEffect } from "react";
import { useTheme } from "../contexts/ThemeContext";
import { MOCK_STORIES, BriefingStory } from "../lib/mockData";
import { ContrarianLayout } from "../components/layouts/ContrarianLayout";
import { PrinciplesLayout } from "../components/layouts/PrinciplesLayout";
import { ExpansionistLayout } from "../components/layouts/ExpansionistLayout";
import { OutsiderLayout } from "../components/layouts/OutsiderLayout";
import { ExecutorLayout } from "../components/layouts/ExecutorLayout";
import { HormoziLayout } from "../components/layouts/HormoziLayout";
import { NavalLayout } from "../components/layouts/NavalLayout";
import { RubinLayout } from "../components/layouts/RubinLayout";
import { ThemeSelector } from "../components/ThemeSelector";
import { OnboardingModal } from "../components/OnboardingModal";

export default function Home() {
  const { movement, setMovement, profile } = useTheme();
  const [isOnboardingOpen, setIsOnboardingOpen] = useState<boolean>(false);
  const [filteredStories, setFilteredStories] = useState<BriefingStory[]>(MOCK_STORIES);

  // Default to the Contrarian design on first load
  useEffect(() => {
    const saved = localStorage.getItem("signal-movement-v4");
    if (!saved) {
      setMovement("contrarian");
    }
  }, [setMovement]);

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
      
      {/* Render layout based on active design movement */}
      {movement === "contrarian" && (
        <ContrarianLayout 
          stories={filteredStories} 
          onOpenOnboarding={() => setIsOnboardingOpen(true)} 
        />
      )}

      {movement === "principles" && (
        <PrinciplesLayout 
          stories={filteredStories} 
          onOpenOnboarding={() => setIsOnboardingOpen(true)} 
        />
      )}

      {movement === "expansionist" && (
        <ExpansionistLayout 
          stories={filteredStories} 
          onOpenOnboarding={() => setIsOnboardingOpen(true)} 
        />
      )}

      {movement === "outsider" && (
        <OutsiderLayout 
          stories={filteredStories} 
          onOpenOnboarding={() => setIsOnboardingOpen(true)} 
        />
      )}

      {movement === "executor" && (
        <ExecutorLayout 
          stories={filteredStories} 
          onOpenOnboarding={() => setIsOnboardingOpen(true)} 
        />
      )}

      {movement === "hormozi" && (
        <HormoziLayout 
          stories={filteredStories} 
          onOpenOnboarding={() => setIsOnboardingOpen(true)} 
        />
      )}

      {movement === "naval" && (
        <NavalLayout 
          stories={filteredStories} 
          onOpenOnboarding={() => setIsOnboardingOpen(true)} 
        />
      )}

      {movement === "rubin" && (
        <RubinLayout 
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
