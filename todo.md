# SIGNAL Redesign V2: Content-Type-Aware, Explanation-Led Feed

- [ ] Phase 1: CSS & Styling Configuration
  - [ ] Set global background to warm cream `#FAF6F0`.
  - [ ] Configure typography: Playfair Display for headlines/masthead, Lora for body text, DM Mono for uppercase metadata/labels.
  - [ ] Add the single terracotta accent color `#8B4513` and enforce sharp `0px` corners globally.

- [ ] Phase 2: Create Comprehensive Mock Data
  - [ ] Define the 6 content types in `mockData.ts`:
    1. **THE CONNECTION** (Cross-sector causal chain with visual flow A → B → C)
    2. **THE RESEARCH READ** (Scholarly synthesis of arXiv papers with diagram motifs)
    3. **PRACTITIONER BRIEF** (Conversational community synthesis with quote callouts)
    4. **EARNINGS / SEC REACTION** (Data-led, big numbers as heroes)
    5. **MULTI-SOURCE NEWS CLUSTER** (Editorial news with multiple attribution outlets)
    6. **WORTH AN AFTERNOON** (Tool/repo spotlight with a mechanical motif)
  - [ ] Add realistic metadata: credibility scores, source counts, comment counts, and locked premium content states.

- [ ] Phase 3: Build the 3 Concept Explorations
  - [ ] **Concept A: Magazine Scroll (Default)** — High-density layout prioritizing beautiful typography, asymmetrical grid flow, custom illustrations, and large editorial spacing.
  - [ ] **Concept B: Intelligence Dashboard** — Multi-column, high-density Bloomberg-style command dashboard showing real-time tickers, profile parameters, and rapid triage indicators.
  - [ ] **Concept C: Curated Brief** — Focused single-column executive stream presenting a clean "Through-Line" thread connecting all of today's stories.

- [ ] Phase 4: Implement Interactive Features
  - [ ] Create a bottom console switcher to toggle between Concept A, B, and C.
  - [ ] Implement the depth toggle (Accessible / Briefed / Technical) that dynamically swaps the text content on all cards.
  - [ ] Add an interactive saved takeaways panel and a simulated profile switcher.

- [ ] Phase 5: Polish, Verify, & Save Checkpoint
  - [ ] Review responsive behavior across mobile and desktop.
  - [ ] Ensure perfect typography contrast and visual harmony matching the screenshot.
  - [ ] Save checkpoint and deliver.
