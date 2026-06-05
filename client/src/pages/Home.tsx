import { useState } from "react";
import { SwissCommandLayout } from "../components/layouts/SwissCommandLayout";
import { ThemeSelector } from "../components/ThemeSelector";
import { OnboardingModal } from "../components/OnboardingModal";
import { MOCK_STORIES } from "../lib/mockData";

export default function Home() {
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FAF6F0] text-[#1E1A16]">
      {/* Primary Swiss Command Layout focusing on content-type-aware cards and scroll models */}
      <SwissCommandLayout 
        stories={MOCK_STORIES} 
        onOpenOnboarding={() => setIsOnboardingOpen(true)} 
      />

      {/* Concept Switcher Console Floating Panel */}
      <ThemeSelector />

      {/* Re-calibrate Profile Onboarding Modal */}
      <OnboardingModal 
        isOpen={isOnboardingOpen} 
        onClose={() => setIsOnboardingOpen(false)} 
      />
    </div>
  );
}
