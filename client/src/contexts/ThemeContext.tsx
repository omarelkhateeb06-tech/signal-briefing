import React, { createContext, useContext, useState, useEffect } from "react";

export type DesignMovement = 
  | "contrarian"   // Design 1: Workspace Triage
  | "principles"   // Design 2: Legal Brief
  | "expansionist" // Design 3: Intelligence Platform
  | "outsider"     // Design 4: Dark Conviction
  | "executor"     // Design 5: Current + Polish (Original Swiss)
  | "hormozi"      // Design 6: The Offer Machine
  | "naval"        // Design 7: Pure Signal
  | "rubin";       // Design 8: The Quiet Letter

export type DepthLevel = "accessible" | "briefed" | "technical";

export interface UserProfile {
  name: string;
  role: string;
  seniority: "junior" | "mid" | "senior" | "executive";
  sectors: ("ai" | "finance" | "semiconductors")[];
  hasCompletedOnboarding: boolean;
  isPro: boolean;
  readCount: number;
}

interface ThemeContextType {
  movement: DesignMovement;
  setMovement: (movement: DesignMovement) => void;
  depth: DepthLevel;
  setDepth: (depth: DepthLevel) => void;
  profile: UserProfile;
  updateProfile: (profile: Partial<UserProfile>) => void;
  resetOnboarding: () => void;
}

const defaultProfile: UserProfile = {
  name: "Reader",
  role: "Semiconductor Analyst",
  seniority: "senior",
  sectors: ["ai", "finance", "semiconductors"],
  hasCompletedOnboarding: true,
  isPro: false,
  readCount: 0,
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [movement, setMovementState] = useState<DesignMovement>(() => {
    const saved = localStorage.getItem("signal-movement-v4");
    return (saved as DesignMovement) || "contrarian";
  });

  const [depth, setDepth] = useState<DepthLevel>(() => {
    const saved = localStorage.getItem("signal-depth");
    return (saved as DepthLevel) || "briefed";
  });

  const [profile, setProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem("signal-profile-v4");
    return saved ? JSON.parse(saved) : defaultProfile;
  });

  // Apply CSS class to document root for the design movement
  useEffect(() => {
    const root = window.document.documentElement;
    root.className = ""; // Reset all classes
    root.classList.add(`theme-${movement}`);
    
    // Outsider (Dark Conviction) is a dark theme
    if (movement === "outsider") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    
    localStorage.setItem("signal-movement-v4", movement);
  }, [movement]);

  useEffect(() => {
    localStorage.setItem("signal-depth", depth);
  }, [depth]);

  useEffect(() => {
    localStorage.setItem("signal-profile-v4", JSON.stringify(profile));
  }, [profile]);

  const setMovement = (newMovement: DesignMovement) => {
    setMovementState(newMovement);
  };

  const updateProfile = (updatedFields: Partial<UserProfile>) => {
    setProfile((prev) => ({ ...prev, ...updatedFields }));
  };

  const resetOnboarding = () => {
    setProfile({
      ...defaultProfile,
      hasCompletedOnboarding: false,
    });
  };

  return (
    <ThemeContext.Provider
      value={{
        movement,
        setMovement,
        depth,
        setDepth,
        profile,
        updateProfile,
        resetOnboarding,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
