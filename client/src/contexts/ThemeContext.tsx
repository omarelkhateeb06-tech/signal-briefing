import React, { createContext, useContext, useState, useEffect } from "react";

export type ScrollModel = 
  | "hero-sticky"       // Model 1: Hero Sticky Focus
  | "parallax-margin"   // Model 2: Parallax Marginalia
  | "sticky-split"      // Model 3: Sticky Split Sync
  | "inline-grid";      // Model 4: Inline Asymmetric Grid

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
  scrollModel: ScrollModel;
  setScrollModel: (model: ScrollModel) => void;
  depth: DepthLevel;
  setDepth: (depth: DepthLevel) => void;
  profile: UserProfile;
  updateProfile: (profile: Partial<UserProfile>) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [scrollModel, setScrollModelState] = useState<ScrollModel>("hero-sticky");
  const [depth, setDepth] = useState<DepthLevel>("briefed");
  const [profile, setProfile] = useState<UserProfile>({
    name: "Alex Mercer",
    role: "Semiconductor VC Analyst",
    seniority: "analyst",
    sectors: ["AI", "Semiconductors", "Finance"],
    isPro: false,
    hasCompletedOnboarding: true,
  });

  useEffect(() => {
    const savedModel = localStorage.getItem("signal-scroll-model") as ScrollModel;
    if (savedModel) {
      setScrollModelState(savedModel);
    }

    const savedProfile = localStorage.getItem("signal-profile-v5");
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }
  }, []);

  const setScrollModel = (newModel: ScrollModel) => {
    setScrollModelState(newModel);
    localStorage.setItem("signal-scroll-model", newModel);
  };

  const updateProfile = (newFields: Partial<UserProfile>) => {
    setProfile((prev) => {
      const updated = { ...prev, ...newFields };
      localStorage.setItem("signal-profile-v5", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <ThemeContext.Provider value={{ scrollModel, setScrollModel, depth, setDepth, profile, updateProfile }}>
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
