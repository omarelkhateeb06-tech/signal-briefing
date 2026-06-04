# SIGNAL: Swiss Dossier Hybrid Model Implementation Plan

We are combining the **Swiss Editorial** design with key tactile assets from the **Mid-Century Archivist** to create a singular, master-level **"Swiss Dossier"** layout.

- [x] Phase 1: Define Swiss Dossier CSS Variables
  - [x] Add the `theme-hybrid` class configuration in `client/src/index.css`.
  - [x] Combine warm creamy paper background (`oklch(0.985 0.004 70)`) with typewriter black text (`oklch(0.18 0.01 110)`).
  - [x] Configure typography: **Playfair Display** for headlines, **Lora** for body reading, and **Space Mono** for metadata stamps and folder tags.

- [x] Phase 2: Build the SwissDossierLayout Component
  - [x] Create `client/src/components/layouts/SwissDossierLayout.tsx`.
  - [x] Implement Swiss grid structure: 12-column layout, 0.5px hairline dividers, clean margins.
  - [x] Integrate Archivist elements:
    - Overlapping folder tab at the top with classification metadata.
    - Diagonal red ink stamps ("CONFIDENTIAL" / "EYES ONLY").
    - Transparent highlighter overlay effect on the "Why It Matters" section.
    - Typewriter-style source counts and read times.

- [x] Phase 3: Integrate Hybrid Model in Application Routing
  - [x] Add the "Swiss Dossier" (Hybrid) option to `ThemeSelector.tsx` and set it as the default choice.
  - [x] Update `Home.tsx` to render `SwissDossierLayout` as the default view.

- [x] Phase 4: Polish, Verify, & Save Checkpoint
  - [x] Review responsive behavior of folder tabs and stamps.
  - [x] Ensure perfect typography contrast and visual harmony.
  - [x] Save final checkpoint and deliver.
