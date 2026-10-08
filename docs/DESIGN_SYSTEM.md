# Hero Adventure design system

Kid Reward Points presents each child’s name in the adventure header (for example, “Vrishi Points”) while keeping the installed app and product name generic. The Google Sheets schema, OAuth flow, Picker, transaction validation, and device PIN approval are independent of the visual theme.

## Themes and components

`og-hero` is the default theme, with dark navy and charcoal surfaces, cyan signals, gold rewards, and restrained coral accents. `soft` is the pastel alternative in Settings. Theme selection is stored on the device; the previous `hero` value maps to `og-hero`. Shared layout rules live in `src/style.css`; the cinematic Home system is in `src/themes/og-hero.css`, pastel overrides in `src/themes/soft.css`, and shared inner-screen components in `src/themes/adventure-screens.css`. Theme files change appearance only.

`HeroHome`, `MissionForm`, `ApprovalScreen`, `EarnCelebration`, `RewardCelebration`, and `Achievements` are presentational React components. App state and submission callbacks remain in `src/main.tsx`. `AnimatedCount` provides a reusable balance count. `Outfit` handles display text; `DM Sans` handles labels and controls. Original decorative art lives in `public/hero/mascot.webp` and `public/hero/treasure.webp` and is cached for offline display by the service worker. Essential status is always text, not dependent on artwork.

## Motion and accessibility

Motion for React drives balance counts, character movement, button springs, screen transitions, a stylized flourish, treasure reveal, and milestone confetti. Decorative motion uses transform and opacity to keep mobile rendering light. `prefers-reduced-motion` disables repeated movement and reveals the final state directly. Action controls have touch-sized targets and visible focus indicators. The fingerprint tile is visibly unavailable; device PIN remains the only implemented approval method.

Success components mount only after the PIN check and repository write have returned and been verified. Home and Activity progress derive solely from saved `EARN` rows: mission count, earned total, and 1/5/10/25 mission badges. Demo-mode badges and points are explicitly labeled as samples. No streak or fabricated achievement is shown. The balance, redemption eligibility, and transaction records still come from the existing ledger and connected Sheet.

## Screens

Home is the hero dashboard. Mission entry covers earn and redeem with live point previews. Parent approval shows the exact transaction and resulting balance. Verified saves trigger the corresponding celebration. Activity displays real transaction history and mission badges. Settings and Google connection use the same card language without changing their behavior or permissions.
