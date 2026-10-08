# Prompt for Codex

Implement the attached `Kid Reward Points` project in this repository. Carefully read all docs before coding, especially `docs/SECURITY.md`. Use Vite + React + TypeScript, modular structure, simple maintainable CSS/theme tokens, static GitHub Pages deployment and a modern installable PWA.

## Execution order
1. First implement a **fully navigable visual demo using mock data**: Home, Add/Use, Parent Review, Success, History, Connect Sheet, Settings. Default child name Kid and default theme OG-inspired Hero (original kid-friendly cinematic styling with a decorative stylized katana motif); provide alternate Soft & Friendly theme. Animate earning and redeeming only *after* confirmed success. Support reduced motion.
2. Implement the PWA manifest/service worker and GitHub Pages workflow; verify repository base path behavior.
3. Add Google Identity Services, Google Picker, Google Sheets APIs with a repository abstraction and mock implementation. Aim for `drive.file` limited access; empirically verify select/create/read/write with configured OAuth test accounts. Prompt for Google Cloud setup and never introduce client secrets.
4. Add versioned tab schema and explicit legacy import preview for A=date B=delta C=description D=actor. Treat B1 displayed total specially; no silent imports.
5. Add tests and docs for all critical edge cases.

## Important product integrity
- A static client cannot guarantee parent-only authorization, even with a local PIN. Present PIN as convenience only; do not represent browser biometrics as proof of a parent.
- Write to Sheets only after explicit confirmation; show success only after confirmed write. Attempt duplicate prevention with UUID and recovery reads, but disclose non-transactionality/race limitations.
- The app's data belongs to the connected Google account. No hardcoded spreadsheet ID, no central developer-owned sheet, no Apps Script for the selected Option A.
- Keep all external configuration in `.env.example` (public client config only).

## Deliverables
Runnable source, `npm` scripts (dev/test/build), README setup, GitHub Pages action, accessible UI, tests, and a short implementation limitations report. Work in vertical increments, run tests after each milestone, and ask for missing Google OAuth details only once the mock UI is usable.
