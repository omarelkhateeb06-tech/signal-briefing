# SIGNAL Implementation Plan: Triple Design Theme Switcher

We are implementing all three distinct design movements from our brainstorming as live, switchable themes in a single, high-fidelity React prototype.

- [x] Phase 1: Theme Switcher Context & Global CSS Setup
  - [x] Update `client/index.html` with all required Google Fonts for all three themes.
  - [x] Implement a custom React context (`ThemeContext.tsx` or similar) to manage:
    - Active design movement: `swiss`, `terminal`, `archivist`
    - Depth level: `accessible`, `briefed`, `technical`
    - Personalization profile (Role, Seniority, Focus sectors)
  - [x] Set up Tailwind theme configurations or dynamic class wrappers in `client/src/index.css` to accommodate all three movements.

- [x] Phase 2: Mock Intelligence Database
  - [x] Create a comprehensive mock data file (`client/src/lib/mockData.ts`) containing premium-quality briefings.
  - [x] Ensure content spans AI, Finance, and Semiconductors with interconnected themes.
  - [x] Provide three levels of text depth (accessible, briefed, technical) for every story.
  - [x] Add relevance scoring variables based on roles (e.g., Analyst, Founder, Executive).

- [x] Phase 3: Core Layouts for the Three Movements
  - [x] **Swiss Editorial**: Minimalist grid, 0.5px hairlines, Playfair Display/Lora typography, cream paper colors, high text density.
  - [x] **Dark Terminal**: Dark obsidian background, SF Mono/Geist typography, cyber-cyan/amber glowing highlights, 3-pane terminal structure, interactive connectivity map.
  - [x] **Mid-Century Archivist**: Manila folder beige, EB Garamond/Courier typography, terracotta/sage highlights, tactile overlapping card tabs, highlighter text overlays, and ink stamp decorations.

- [x] Phase 4: Personalized Onboarding & Personalization Features
  - [x] Build a premium onboarding overlay or wizard to let readers select their Role, Seniority, and Focus sectors.
  - [x] Implement real-time feed re-ranking based on user selections.
  - [x] Add the Depth Level Selector (accessible, briefed, technical) with dynamic content swapping.

- [ ] Phase 5: Final Polish, Verification, & Delivery
  - [ ] Check responsive design for all three layouts (mobile-first layout adjustments).
  - [ ] Add micro-interactions (hover animations, click feedback, folder sliding, glowing pulses).
  - [ ] Save checkpoint and deliver.
