import React, { useState, useMemo } from "react";
import { useTheme } from "../contexts/ThemeContext";
import { MOCK_STORIES, BriefingStory } from "../lib/mockData";
import { OnboardingModal } from "../components/OnboardingModal";
import { ThemeSelector } from "../components/ThemeSelector";

// Layout components imports
import { SwissCommandLayout } from "../components/layouts/SwissCommandLayout";
import { SwissSlideoutLayout } from "../components/layouts/SwissSlideoutLayout";
import { SwissDossierLayout } from "../components/layouts/SwissDossierLayout";
import { ContrarianLayout } from "../components/layouts/ContrarianLayout";
import { PrinciplesLayout } from "../components/layouts/PrinciplesLayout";
import { ExpansionistLayout } from "../components/layouts/ExpansionistLayout";
import { OutsiderLayout } from "../components/layouts/OutsiderLayout";
import { ExecutorLayout } from "../components/layouts/ExecutorLayout";
import { HormoziLayout } from "../components/layouts/HormoziLayout";
import { NavalLayout } from "../components/layouts/NavalLayout";
import { RubinLayout } from "../components/layouts/RubinLayout";

export default function Home() {
  const { movement, profile } = useTheme();
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);

  // Dynamic ranking engine based on user focus sectors and seniority matching
  const processedStories = useMemo(() => {
    // Determine the role key for seniority score matching
    const roleKey = profile.seniority === "executive" 
      ? "executive" 
      : profile.role.toLowerCase().includes("analyst") 
        ? "analyst" 
        : profile.role.toLowerCase().includes("founder") 
          ? "founder" 
          : "general";

    return [...MOCK_STORIES]
      .map((story) => {
        // Calculate score match based on user's profile sectors & seniority relevance
        const lowercaseProfileSectors = profile.sectors.map((s: string) => s.toLowerCase());
        const sectorMatchCount = story.sectors.filter((s: string) => lowercaseProfileSectors.includes(s.toLowerCase())).length;
        const baseRelevance = story.relevanceScores[roleKey] || story.relevanceScores.general;
        
        // Boost score if there's a strong sector alignment
        const finalScore = Math.min(100, Math.max(0, baseRelevance + (sectorMatchCount * 10)));

        return {
          ...story,
          calculatedScore: finalScore
        };
      })
      // Sort descending by calculated match score
      .sort((a, b) => b.calculatedScore - a.calculatedScore);
  }, [profile]);

  // Map the selected design movement state to its corresponding layout engine
  const renderLayout = () => {
    switch (movement) {
      case "swiss-command":
        return <SwissCommandLayout stories={processedStories} onOpenOnboarding={() => setIsOnboardingOpen(true)} />;
      case "swiss-slideout":
        return <SwissSlideoutLayout stories={processedStories} onOpenOnboarding={() => setIsOnboardingOpen(true)} />;
      case "swiss-dossier":
        return <SwissDossierLayout stories={processedStories} onOpenOnboarding={() => setIsOnboardingOpen(true)} />;
      case "contrarian":
        return <ContrarianLayout stories={processedStories} onOpenOnboarding={() => setIsOnboardingOpen(true)} />;
      case "principles":
        return <PrinciplesLayout stories={processedStories} onOpenOnboarding={() => setIsOnboardingOpen(true)} />;
      case "expansionist":
        return <ExpansionistLayout stories={processedStories} onOpenOnboarding={() => setIsOnboardingOpen(true)} />;
      case "outsider":
        return <OutsiderLayout stories={processedStories} onOpenOnboarding={() => setIsOnboardingOpen(true)} />;
      case "executor":
        return <ExecutorLayout stories={processedStories} onOpenOnboarding={() => setIsOnboardingOpen(true)} />;
      case "hormozi":
        return <HormoziLayout stories={processedStories} onOpenOnboarding={() => setIsOnboardingOpen(true)} />;
      case "naval":
        return <NavalLayout stories={processedStories} onOpenOnboarding={() => setIsOnboardingOpen(true)} />;
      case "rubin":
        return <RubinLayout stories={processedStories} onOpenOnboarding={() => setIsOnboardingOpen(true)} />;
      default:
        return <SwissCommandLayout stories={processedStories} onOpenOnboarding={() => setIsOnboardingOpen(true)} />;
    }
  };

  return (
    <div className="relative min-h-screen">
      {/* Active layout render */}
      {renderLayout()}

      {/* Floating Theme / Experiment Selector console */}
      <ThemeSelector />

      {/* Profile calibration onboarding modal */}
      <OnboardingModal isOpen={isOnboardingOpen} onClose={() => setIsOnboardingOpen(false)} />
    </div>
  );
}
