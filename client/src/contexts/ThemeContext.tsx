import React, { createContext, useContext, useState, useEffect } from "react";

export type DesignMovement = "swiss" | "terminal" | "archivist";
export type DepthLevel = "accessible" | "briefed" | "technical";

export interface UserProfile {
  name: string;
  role: string;
  seniority: "junior" | "mid" | "senior" | "executive";
  sectors: ("ai" | "finance" | "semiconductors")[];
  hasCompletedOnboarding: boolean;
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
  role: "General Practitioner",
  seniority: "senior",
  sectors: ["ai", "finance", "semiconductors"],
  hasCompletedOnboarding: false,
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [movement, setMovementState] = useState<DesignMovement>(() => {
    const saved = localStorage.getItem("signal-movement");
    return (saved as DesignMovement) || "swiss";
  });

  const [depth, setDepth] = useState<DepthLevel>(() => {
    const saved = localStorage.getItem("signal-depth");
    return (saved as DepthLevel) || "briefed";
  });

  const [profile, setProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem("signal-profile");
    return saved ? JSON.parse(saved) : defaultProfile;
  });

  // Apply CSS class to document root for the design movement
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("theme-swiss", "theme-terminal", "theme-archivist");
    root.classList.add(`theme-${movement}`);
    
    // Terminal theme uses a dark theme style by default
    if (movement === "terminal") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    
    localStorage.setItem("signal-movement", movement);
  }, [movement]);

  useEffect(() => {
    localStorage.setItem("signal-depth", depth);
  }, [depth]);

  useEffect(() => {
    localStorage.setItem("signal-profile", JSON.stringify(profile));
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
