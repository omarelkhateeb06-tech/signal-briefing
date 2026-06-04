export interface SectorData {
  id: "ai" | "finance" | "semiconductors";
  label: string;
  color: string;
}

export const SECTORS: Record<string, SectorData> = {
  ai: { id: "ai", label: "Artificial Intelligence", color: "oklch(0.38 0.11 35)" },
  finance: { id: "finance", label: "Finance & Capital", color: "oklch(0.48 0.12 45)" },
  semiconductors: { id: "semiconductors", label: "Semiconductors", color: "oklch(0.25 0.05 70)" },
};

export interface ContentDepth {
  accessible: {
    summary: string;
    bulletPoints: string[];
    whatToWatch: string;
  };
  briefed: {
    summary: string;
    analysis: string;
    bulletPoints: string[];
    whatToWatch: string;
  };
  technical: {
    summary: string;
    analysis: string;
    dataPoints: { label: string; value: string }[];
    architecturalImpact: string;
    whatToWatch: string;
  };
}

export interface BriefingStory {
  id: string;
  title: string;
  date: string;
  readTime: string;
  sectors: ("ai" | "finance" | "semiconductors")[];
  relevanceScores: {
    analyst: number;
    founder: number;
    executive: number;
    general: number;
  };
  sourceCount: number;
  depth: ContentDepth;
}

export const MOCK_STORIES: BriefingStory[] = [
  {
    id: "story-1",
    title: "TSMC N2P Node Yields Exceed Expectations Amid Sovereign AI Capital Surge",
    date: "June 04, 2026",
    readTime: "4 min read",
    sectors: ["semiconductors", "ai", "finance"],
    relevanceScores: {
      analyst: 98,
      founder: 89,
      executive: 95,
      general: 75,
    },
    sourceCount: 24,
    depth: {
      accessible: {
        summary: "TSMC's next-generation 2-nanometer chip technology is progressing faster than planned, with initial test yields hitting high numbers. This is happening as national governments invest billions to secure their own AI computing power, shifting chip manufacturing from a purely commercial race to a matter of national security.",
        bulletPoints: [
          "TSMC's 2nm test production yields are reportedly ahead of schedule, reducing future manufacturing costs.",
          "Sovereign wealth funds in the Middle East and European national funds are actively funding domestic chip factories.",
          "These advanced chips will power the next generation of AI models starting in early 2027."
        ],
        whatToWatch: "Watch for official yield reports from TSMC's Taiwan fabs and announcement of sovereign investments in European fabrication plants."
      },
      briefed: {
        summary: "TSMC's upcoming N2P (2nm with backside power delivery) node has achieved test production yields exceeding 65%, pulling forward commercial production targets. Concurrently, sovereign capital is rewriting the global fab footprint, as state-backed funds inject over $45B into localized supply chains to bypass US-China trade corridors.",
        analysis: "The convergence of N2P's technical readiness and sovereign funding changes the chip market's dynamics. Historically, only tech giants could afford 2nm design starts (estimated at $150M+ per chip). Now, state-backed entities are subsidizing these costs to build national AI clusters. This reduces dependence on US hyperscalers but fragments global chip capacity, threatening to create localized oversupply in mature nodes while keeping advanced nodes highly concentrated.",
        bulletPoints: [
          "N2P node yield of 65% is roughly 10% ahead of TSMC's internal roadmap for this phase of the cycle.",
          "Backside power delivery (BSPD) reduces voltage drop by 12% and increases routing density by 15%.",
          "Saudi Arabia's PIF is reportedly in late-stage talks to co-finance a Mediterranean N2P-compatible fab."
        ],
        whatToWatch: "Watch the premium pricing gap between TSMC N2P and Intel's 14A node, and whether ASML's High-NA EUV backlog shifts toward sovereign-backed buyers."
      },
      technical: {
        summary: "TSMC N2P (2nm, backside power delivery) pilot yields have breached the 65% threshold on a 250mm² SRAM test vehicle. This acceleration intersects a structural macro shift: sovereign wealth funds are transitioning from passive equity investors to active infrastructure co-developers, investing $45B in regional lithography capacity.",
        analysis: "N2P represents a significant architectural shift by separating the power delivery network (PDN) from the signal routing on the wafer's front side. Moving the PDN to the backside eliminates IR drop (voltage drop) at the transistor level, allowing aggressive gate-all-around (GAA) nanosheet scaling. The higher yields indicate TSMC has resolved the high-aspect-ratio TSV (Through-Silicon Via) reliability issues that typically plague backside processing. This technical leap occurs as Middle Eastern sovereign funds restructure capital allocations, demanding physical semiconductor assets on-soil as a condition for tech-sector investment.",
        dataPoints: [
          { label: "SRAM Test Vehicle Yield", value: "65.4% (Target: 55%)" },
          { label: "Voltage IR Drop Reduction", value: "12.3% vs N3E" },
          { label: "Sovereign Capital Committed", value: "$45.2B YTD" },
          { label: "Transistor Density Increase", value: "1.15x scaling factor" }
        ],
        architecturalImpact: "The implementation of BSPD requires extreme wafer thinning (down to <100nm) and precise wafer-to-wafer bonding. This shifts the packaging bottleneck from 2.5D interposers to 3D front-end integration, heavily benefiting specialized metrology and bonding equipment vendors.",
        whatToWatch: "Observe the defect density (D0) curve over the next two quarters. If D0 falls below 0.1 per cm² ahead of schedule, TSMC will secure absolute pricing power for the 2027 smartphone and hyperscaler silicon refresh cycles."
      }
    }
  },
  {
    id: "story-2",
    title: "The Liquidity Squeeze: AI Compute-Collateralized Debt Redefines Tech Finance",
    date: "June 04, 2026",
    readTime: "5 min read",
    sectors: ["finance", "ai"],
    relevanceScores: {
      analyst: 95,
      founder: 98,
      executive: 90,
      general: 70,
    },
    sourceCount: 18,
    depth: {
      accessible: {
        summary: "Wall Street is creating a new kind of financial market where tech companies use their physical AI microchips (like Nvidia GPUs) as collateral to borrow money. This lets young AI startups raise millions of dollars without giving up ownership of their companies, but it creates a major risk if the value of those chips suddenly drops.",
        bulletPoints: [
          "Startups are borrowing cash using their stockpiles of advanced computer chips as collateral.",
          "Major banks are packaging these chip-backed loans into financial products for institutional investors.",
          "If newer, faster chips are released, older chips used as collateral could lose value quickly, triggering defaults."
        ],
        whatToWatch: "Watch for any drop in secondhand GPU rental prices, which would immediately lower the value of the collateral backing these loans."
      },
      briefed: {
        summary: "A novel financial structure is emerging: GPU-collateralized debt. Startups and cloud providers are leveraging their physical H100 and B200 inventories to secure debt financing, bypassing traditional equity dilution. While this unlocks rapid scaling, it ties startup solvency directly to the volatile secondary market for compute power.",
        analysis: "This compute-collateralized debt boom resembles the early days of asset-backed securities. Investment banks are structuring specialized vehicles (SPVs) that hold the physical silicon and lease it back to operators. This keeps debt off the startups' balance sheets. However, this model assumes that GPU rental rates remain stable. If compute supply catches up with demand, or if next-generation architectures make current chips obsolete, the collateral value will crash, leaving lenders holding rapidly depreciating silicon.",
        bulletPoints: [
          "Over $12B in GPU-backed debt has been issued in the first half of 2026 alone.",
          "LTV (Loan-to-Value) ratios are averaging 70%, based on current secondary market GPU values.",
          "Startups are using this debt to fund immediate research clusters, accelerating their model training schedules."
        ],
        whatToWatch: "Watch for the first major default in this space. If a mid-sized AI lab fails, how quickly will their lenders liquidate their GPU clusters, and what will that do to global cloud compute pricing?"
      },
      technical: {
        summary: "The financialization of compute has reached maturity with the introduction of syndicated GPU-backed asset-backed securities (ABS). Hyperscalers and tier-2 cloud providers are utilizing off-balance-sheet Special Purpose Vehicles (SPVs) holding H100/B200/X100 silicon to issue debt, fundamentally changing capital structures in the AI sector.",
        analysis: "The core risk in compute-backed debt lies in the rapid depreciation curve of advanced silicon. Unlike real estate or aircraft, which depreciate predictably, semiconductors face step-function obsolescence. When Nvidia launches its next-gen architecture, the secondary market value of previous-gen chips drops significantly. Lenders are mitigating this through dynamic LTV covenants tied to real-time spot rental rates on platforms like Lambda Labs and RunPod. If spot rates drop below a specific floor, borrowers must post cash collateral, creating a potential liquidity trap.",
        dataPoints: [
          { label: "Total GPU Debt Issued", value: "$12.4B YTD" },
          { label: "Average LTV Ratio", value: "68.5%" },
          { label: "Obsolescence Depreciation Rate", value: "35% annually (est.)" },
          { label: "Margin Call Spot Rate Trigger", value: "$1.40/GPU/hour" }
        ],
        architecturalImpact: "This financial model incentivizes standardized datacenter designs. Lenders prefer standardized HGX architectures over custom proprietary hardware because standardized systems are much easier to liquidate and redeploy in a default scenario.",
        whatToWatch: "Monitor the spread between GPU-backed debt yields and standard corporate bonds. A widening spread will indicate that institutional investors are beginning to price in the technical obsolescence risk of the underlying silicon."
      }
    }
  },
  {
    id: "story-3",
    title: "Algorithmic Monopolies: FTC Targets Dynamic Pricing Engines in Semiconductor Supply Chain",
    date: "June 03, 2026",
    readTime: "3 min read",
    sectors: ["semiconductors", "finance"],
    relevanceScores: {
      analyst: 90,
      founder: 75,
      executive: 96,
      general: 68,
    },
    sourceCount: 12,
    depth: {
      accessible: {
        summary: "The US Federal Trade Commission (FTC) is investigating the software programs used to price microchips and raw materials. Regulators worry that because many major chip suppliers use the same automated pricing software, it acts as a form of computerized price-fixing, keeping chip prices high.",
        bulletPoints: [
          "Regulators are investigating whether automated pricing software is keeping chip prices high.",
          "The software uses algorithms to analyze supply and demand, automatically setting matching high prices across competitors.",
          "This could lead to new rules on how companies can use AI and automated tools to price their products."
        ],
        whatToWatch: "Watch for formal legal complaints from the FTC against major software vendors in the semiconductor supply chain."
      },
      briefed: {
        summary: "The FTC has launched an antitrust probe into dynamic pricing algorithms used by major semiconductor distributors and silicon wafer suppliers. Regulators allege that these shared software engines function as a hub-and-spoke cartel, using predictive data to artificially coordinate prices and restrict supply.",
        analysis: "This investigation marks a shift in antitrust enforcement, focusing on 'algorithmic collusion.' Even if human executives never speak, using a single, shared algorithmic pricing engine that optimizes industry-wide margins can violate antitrust laws. In the capital-intensive semiconductor wafer industry, where three companies control 70% of the market, these software tools have kept prices high despite fluctuating consumer demand, impacting downstream hardware margins.",
        bulletPoints: [
          "The top three silicon wafer manufacturers use the same dynamic pricing software.",
          "Wafer contract prices have remained elevated despite a 15% drop in consumer device shipments.",
          "The FTC is exploring a new legal framework that treats shared algorithmic inputs as implicit collusion."
        ],
        whatToWatch: "Watch whether wafer suppliers voluntarily adjust their software contracts, and monitor the gross margin trends of fabless chip designers who purchase these wafers."
      },
      technical: {
        summary: "The FTC's Bureau of Competition has initiated a Section 5 investigation into algorithmic pricing platforms utilized by silicon wafer suppliers (Shin-Etsu, Sumco, Siltronic). The agency alleges that the shared data loops in these SaaS platforms facilitate implicit collusive equilibria, violating antitrust laws.",
        analysis: "The economic theory of algorithmic collusion suggests that high-frequency pricing algorithms can learn to sustain supra-competitive prices without explicit coordination. In highly concentrated markets (like silicon wafers, where the Herfindahl-Hirschman Index exceeds 2,500), these algorithms quickly identify that price-cutting leads to immediate retaliation, opting instead for stable, elevated prices. The FTC's challenge is proving 'agreement' under Sherman Act Section 1. If the FTC succeeds, it could set a precedent that outlaws shared predictive supply-chain databases, forcing a return to manual, fragmented pricing models.",
        dataPoints: [
          { label: "Wafer Market Concentration (Top 3)", value: "72.4%" },
          { label: "Wafer Contract Price Variance", value: "<1.5% across vendors" },
          { label: "Algorithmic Pricing Adoption Rate", value: "85% of global distributors" },
          { label: "FTC Target Investigation Window", value: "2024 - 2026" }
        ],
        architecturalImpact: "A ban on shared predictive supply chain software would fragment inventory management systems. Companies would have to build proprietary, isolated demand forecasting models, increasing operational overhead but creating opportunities for custom enterprise AI builders.",
        whatToWatch: "Observe if the DOJ joins the investigation, which would signal potential criminal antitrust charges and likely trigger immediate changes in wafer supply contract terms."
      }
    }
  }
];

export const MARKET_METRICS = [
  { symbol: "SOXX", name: "iShares Semiconductor ETF", value: "244.50", change: "+1.84%", trend: "up" },
  { symbol: "NVDA", name: "NVIDIA Corporation", value: "142.15", change: "+3.12%", trend: "up" },
  { symbol: "TSM", name: "Taiwan Semiconductor Mfg.", value: "188.90", change: "+2.45%", trend: "up" },
  { symbol: "ASML", name: "ASML Holding NV", value: "812.30", change: "-0.85%", trend: "down" },
  { symbol: "AI-LIQ", name: "Global Compute Liquidity Index", value: "112.40", change: "+4.12%", trend: "up" },
];
