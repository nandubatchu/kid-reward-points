# Delivery plan and test checklist

## Milestones
1. **UI-only demo**: Vite React TS, mock transactions matching screenshot semantics, dashboard, earn/redeem, parent review, success, responsive theme swap and reduced-motion support.
2. **PWA**: icons/manifest/service worker, GitHub Pages Actions, configured `base`, standalone launch, offline shell/no-write notice.
3. **Google account + Picker**: consent, select/create spreadsheet, scope validation, clear disconnect; separate Google account tests.
4. **Sheet repository + migration**: initialize schema, balance/history read, legacy import preview, ledger append, idempotency re-check and errors.
5. **Polish / publish**: parental limitation notice, security audit, install instructions, E2E and accessibility tests, privacy policy.

## Tests
- unit: `computeBalance`, schema validation, conversion day-first date, invalid rows, formula-safe descriptions, transaction ID handling.
- integration (mock Sheets): success, expired token, forbidden, missing tab, duplicate UUID, ambiguous timeout, insufficient points.
- E2E: add and redeem flows, parent review, no celebration on failed write, theme change without ledger change, reduced motion.
- manual Android Chrome and iOS Safari Add to Home Screen; Android standalone and iOS web app appearance; no claims of guaranteed immersive fullscreen.
- two-account smoke test: account A cannot access B's unshared sheet; no hardcoded spreadsheet IDs or developer credentials.
- check GitHub Pages base path on refresh, icons, Lighthouse PWA-related checks, accessibility.

## Google Cloud prerequisites (human setup)
- Project with Google Sheets API and Google Picker API/Google Drive API as needed enabled.
- OAuth consent configured; Web Client ID and allowed origin set.
- Public browser API key restricted by allowed referrers/API usage where supported.
- Correct authorized domains and production verification / app privacy requirements handled before launch.
- Env examples in repo (`VITE_GOOGLE_CLIENT_ID`, `VITE_GOOGLE_API_KEY`, `VITE_GOOGLE_APP_ID`) are public browser configuration, not secret credentials. Never commit service-account JSON.

## Definition of done
An installable, responsive static site that can read/write a parent-selected Google Sheet for a single family, with transparent approval limitations, no backend credential handling, and a themeable kid-friendly interface.
