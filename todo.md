# SIGNAL: Swiss Command Focus & Photo Scroll Models

- [x] Phase 1: Codebase Cleanup
  - [x] Remove all unused layout files from `client/src/components/layouts/` (keeping only `SwissCommandLayout.tsx`).
  - [x] Simplify `ThemeContext.tsx` to manage active **Photo Scroll Model** instead of design movements.
  - [x] Clean up `ThemeSelector.tsx` to act as a **Scroll Model Switcher**.

- [x] Phase 2: Design and Implement 4 Photo Scroll Models
  - [x] **Model 1: Hero Sticky Focus** — Big immersive hero image at the top of the feed that scales down and pins itself elegantly to the header as you scroll.
  - [x] **Model 2: Parallax Marginalia** — Sourced story photos float asynchronously in the margins, creating a layered depth effect during scroll.
  - [x] **Model 3: Sticky Split Sync** — The right-hand panel image is locked in place and cross-fades between story graphics exactly when that story scrolls into view on the left.
  - [x] **Model 4: Inline Asymmetric Grid** — Alternating left/right image cards nested inside the feed text, using subtle tilt hover transitions.

- [x] Phase 3: Wire up router and controllers
  - [x] Bind all 4 models cleanly inside `SwissCommandLayout.tsx`.
  - [x] Update `Home.tsx` to load `SwissCommandLayout` exclusively.

- [x] Phase 4: Polish, Verify, & Save Checkpoint
  - [x] Ensure smooth scrolling and perfect image contrast.
  - [x] Save final checkpoint and deliver.
