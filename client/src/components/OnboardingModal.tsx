import React, { useState } from "react";
import { useTheme, UserProfile } from "../contexts/ThemeContext";
import { X, ChevronRight, Compass, Shield, Award, Cpu, Database, TrendingUp } from "lucide-react";

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({ isOpen, onClose }) => {
  const { profile, updateProfile } = useTheme();
  
  const [name, setName] = useState(profile.name);
  const [role, setRole] = useState(profile.role);
  const [seniority, setSeniority] = useState<UserProfile["seniority"]>(profile.seniority);
  const [sectors, setSectors] = useState<UserProfile["sectors"]>(profile.sectors);

  if (!isOpen) return null;

  const toggleSector = (sector: "ai" | "finance" | "semiconductors") => {
    if (sectors.includes(sector)) {
      if (sectors.length > 1) {
        setSectors(sectors.filter((s) => s !== sector));
      }
    } else {
      setSectors([...sectors, sector]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name: name || "Reader",
      role: role || "General Practitioner",
      seniority,
      sectors,
      hasCompletedOnboarding: true,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card border-2 border-border w-full max-w-lg shadow-2xl relative rounded overflow-hidden">
        
        {/* Onboarding Header */}
        <div className="bg-secondary/30 border-b border-border px-6 py-4 flex justify-between items-center">
          <div>
            <span className="font-mono text-[9px] uppercase tracking-widest text-primary font-bold">
              SIGNAL RE-CALIBRATION PROTOCOL
            </span>
            <h2 className="font-serif text-xl font-extrabold text-foreground">
              Define Your Intelligence Scope
            </h2>
          </div>
          <button 
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Onboarding Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6 font-mono text-xs">
          
          {/* Reader Name */}
          <div className="space-y-2">
            <label className="block text-[10px] uppercase tracking-wider text-muted-foreground font-bold">
              01. READER IDENTITY
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Jane Doe"
              className="w-full bg-background border border-border px-3 py-2 text-foreground focus:border-primary focus:outline-none font-sans"
              required
            />
          </div>

          {/* Practitioner Role */}
          <div className="space-y-2">
            <label className="block text-[10px] uppercase tracking-wider text-muted-foreground font-bold">
              02. OPERATIONAL FOCUS / ROLE
            </label>
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="e.g., Semiconductor Analyst, Startup Founder"
              className="w-full bg-background border border-border px-3 py-2 text-foreground focus:border-primary focus:outline-none font-sans"
              required
            />
          </div>

          {/* Seniority Level */}
          <div className="space-y-2">
            <label className="block text-[10px] uppercase tracking-wider text-muted-foreground font-bold">
              03. CLEARANCE / SENIORITY LEVEL
            </label>
            <div className="grid grid-cols-2 gap-2">
              {([
                { id: "junior", label: "Junior Practitioner" },
                { id: "mid", label: "Adjacent Professional" },
                { id: "senior", label: "Senior Operator" },
                { id: "executive", label: "C-Suite Executive" }
              ] as const).map((item) => (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => setSeniority(item.id)}
                  className={`border p-2 text-left flex flex-col justify-between cursor-pointer transition-all ${
                    seniority === item.id
                      ? "bg-primary/10 border-primary text-primary font-bold"
                      : "bg-background border-border text-muted-foreground hover:border-border-hover"
                  }`}
                >
                  <span className="text-[10px]">{item.label}</span>
                  <span className="text-[8px] uppercase tracking-wider text-muted-foreground mt-1">
                    {item.id}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Sector Focus */}
          <div className="space-y-2">
            <label className="block text-[10px] uppercase tracking-wider text-muted-foreground font-bold">
              04. FOCUS SECTORS (SELECT ALL RELEVANT)
            </label>
            <div className="grid grid-cols-3 gap-2">
              {([
                { id: "ai", label: "AI & ML", icon: Cpu },
                { id: "finance", label: "Capital Flows", icon: TrendingUp },
                { id: "semiconductors", label: "Silicon & Litho", icon: Database }
              ] as const).map((item) => {
                const isSelected = sectors.includes(item.id);
                const Icon = item.icon;
                return (
                  <button
                    type="button"
                    key={item.id}
                    onClick={() => toggleSector(item.id)}
                    className={`border p-3 text-center flex flex-col items-center justify-center gap-1.5 cursor-pointer transition-all ${
                      isSelected
                        ? "bg-primary/10 border-primary text-primary font-bold"
                        : "bg-background border-border text-muted-foreground hover:border-border-hover"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-[9px] uppercase font-bold tracking-wider">{item.label}</span>
                  </button>
                );
              })}
            </div>
            <p className="text-[9px] text-muted-foreground italic">
              *Your morning intelligence feed is dynamically re-ranked based on selected sectors.
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-primary text-primary-foreground font-bold py-3 uppercase tracking-wider hover:bg-primary/90 transition-colors flex items-center justify-center gap-1 cursor-pointer"
          >
            <span>APPLY CALIBRATION</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
