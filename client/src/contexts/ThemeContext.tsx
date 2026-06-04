import React, { createContext, useContext, useState, useEffect } from "react";

export type DesignMovement = 
  | "swiss-command"    // Prompt 1: Swiss Command Center
  | "swiss-slideout"   // Prompt 2: Swiss Slideout Drawer
  | "swiss-dossier"    // Prompt 3: Swiss Intelligence Dossier
  | "contrarian"       // Workspace Triage
  | "principles"       // Legal Brief
  | "expansionist"     // Intelligence Platform
  | "outsider"         // Dark Conviction
  | "executor"         // Original Swiss
  | "hormozi"          // The Offer Machine
  | "naval"            // Pure Signal
  | "rubin";           // The Quiet Letter

export type DepthLevel = "accessible" | "briefed" | "technical";

export interface UserProfile {
  name: string;
  role: string;
  seniority: "analyst" | "founder" | "executive" | "general";
  sectors: string[];
  isPro: boolean;
  hasCompletedOnboarding: boolean;
}

interface ThemeContextType {
  movement: DesignMovement;
  setMovement: (movement: DesignMovement) => void;
  depth: DepthLevel;
  setDepth: (depth: DepthLevel) => void;
  profile: UserProfile;
  updateProfile: (profile: Partial<UserProfile>) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Default to swiss-command
  const [movement, setMovementState] = useState<DesignMovement>("swiss-command");
  const [depth, setDepth] = useState<DepthLevel>("briefed");
  const [profile, setProfile] = useState<UserProfile>({
    name: "Alex Mercer",
    role: "Semiconductor VC Analyst",
    seniority: "analyst",
    sectors: ["AI", "Semiconductors", "Finance"],
    isPro: false,
    hasCompletedOnboarding: true, // Default to true so they can browse, can trigger onboarding on click
  });

  // Sync design movement to local storage
  useEffect(() => {
    const savedMovement = localStorage.getItem("signal-movement-v5") as DesignMovement;
    if (savedMovement) {
      setMovementState(savedMovement);
    } else {
      setMovementState("swiss-command");
    }

    const savedProfile = localStorage.getItem("signal-profile-v5");
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }
  }, []);

  const setMovement = (newMovement: DesignMovement) => {
    setMovementState(newMovement);
    localStorage.setItem("signal-movement-v5", newMovement);

    // Apply dynamic HTML body theme class
    const body = document.documentElement;
    body.className = ""; // clear old themes
    body.classList.add(`theme-${newMovement}`);
    
    // Auto-toggle dark mode class for Outsider (Dark Conviction)
    if (newMovement === "outsider") {
      body.classList.add("dark");
    } else {
      body.classList.remove("dark");
    }
  };

  const updateProfile = (newFields: Partial<UserProfile>) => {
    setProfile((prev) => {
      const updated = { ...prev, ...newFields };
      localStorage.setItem("signal-profile-v5", JSON.stringify(updated));
      return updated;
    });
  };

  // Initial class setup on mount
  useEffect(() => {
    const body = document.documentElement;
    body.classList.add(`theme-${movement}`);
    if (movement === "outsider") {
      body.classList.add("dark");
    }
  }, [movement]);

  return (
    <ThemeContext.Provider value={{ movement, setMovement, depth, setDepth, profile, updateProfile }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
