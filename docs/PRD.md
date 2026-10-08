# Product Requirements Document — Kid Reward Points
Version: 0.1 • 2026-10-08

## 1. Product vision
A joyful, mobile-first family reward ledger. Kids record good deeds and desired redemptions in a delightful gamified UI; parents review changes. Each family keeps its data in a Google Sheet under its own Google account. 1 point = ₹1 is a nominal family rule, not a payment, wallet, or financial service.

## 2. Users and roles
- Parent/guardian: connects a Google account, chooses/creates sheet, oversees points and approves changes.
- Child: uses an optionally shared device to propose earn/spend entries, view balance and history.
- MVP one child profile per connected sheet; structure code so multiple children can be added later.
- The app title is **Kid Reward Points**. The child display name is configurable; example profile: **Kid**.

## 3. Architecture / hosting
- Static installable PWA hosted on GitHub Pages (HTTPS).
- Google Identity Services OAuth access token in the browser; Picker to select appropriate files; Sheets API to read/write data.
- User's sheet belongs to the user's Google account; app operator has no central access.
- No Apps Script or other backend needed in core MVP.

## 4. Priority features
### P0 — launch essentials
1. First-run onboarding explains permissions, local/shared device risks, and Google Sheet ownership.
2. Parent connects their Google account and selects a supported existing spreadsheet OR creates a new sheet in their own Drive with a well-defined schema. Access should be limited to app-created/selected files where possible.
3. Detect and validate schema, offer explicit opt-in migration/import from legacy sheet; don't modify arbitrary existing cells silently.
4. Dashboard: current points, `1 pt = ₹1`, large Add and Redeem buttons, grouped transaction history, loading/empty/error states.
5. Proposal screen: earn vs redeem, amount >0 (integer), activity description, confirmation preview.
6. Parent review view before any write: action, delta, old/new balance, reason. Prevent negative balances by default, unless a setting explicitly changes it.
7. Apply approved transaction exactly once as best possible; disable repeat submission and use unique transaction IDs; recover from ambiguous network failures using lookup before retry.
8. Refresh on foreground, manual refresh and after approved writes; show offline/read-only warning when Google is unavailable.
9. Installability: manifest icons, service worker app-shell caching, `standalone` display (not strict immersive fullscreen), mobile responsive on Android/iOS.
10. Theme switching without altering the ledger: starter themes `OG-inspired Hero` and `Soft & Friendly`.

### P1 — experience
- Fast, accessible animations for earned/spent/approved moments; reduction of motion via `prefers-reduced-motion`.
- Task suggestions based on past descriptions; date-grouped activity feed.
- Streaks and badges computed from ledger; opt-in and avoid shaming or pressure.
- PIN settings, configurable child display name, edit/correction flow implemented as new reversing ledger events (never delete audit history).

### Explicit non-goals for MVP
- Real money or payments, transferable points, device-to-device parent notifications, backend-managed parental roles, passkeys as verified parent identities, hidden/secret balances, push notifications, social sharing, public leaderboards.

## 5. Main user journeys
**Setup**: Open PWA → Parent setup → Google sign-in/consent → select/create sheet → schema check/migration confirmation → set child's name → enter dashboard.

**Earn**: Child taps `Add Points` → enters amount and activity → sees `Ask parent` → parent reviews → parent confirms → Sheets write succeeds → screen celebrates `Mission Complete! +5` → updated balance.

**Redeem**: Child taps `Use Points` → chooses cost/item → sees balance impact → parent reviews → write succeeds → fun redemption reveal and revised balance. Insufficient balance displays friendly guidance before approval.

**Failure**: Network loss while proposing → preserve unsent draft locally; **never show success until confirmed read/write**. OAuth expires → request reauthorization and restore draft. Write outcome ambiguous → query by client transaction ID before offering retry.

## 6. UI screens
- Welcome / Connect Google
- Select or Create Sheet
- Dashboard
- Add / Use Points
- Parent Review and Approval
- Earned Celebration
- Redemption Celebration
- History / Activity Details
- Settings: child name, theme, connected file, PIN limitations, motion, reset connection

## 7. Acceptance criteria
- Two distinct Google accounts can independently connect two different sheets and never see each other's data.
- Parent can select/create exactly one spreadsheet for an active profile; switching files requires clear confirmation.
- Existing legacy data is not overwritten or interpreted silently.
- Current balance equals imported opening balance + sum of approved ledger deltas; display ₹ equivalence.
- Child can submit a proposal but UI does not write until parent confirmation step.
- Browser cannot claim to prove the person entering a local PIN is the parent; security warning is explicit.
- No app-origin storage of Google passwords, refresh tokens, service-account secrets, or sheet data on developer servers.
- App works installed in standalone mode on supported devices; fallback Add to Home Screen instructions provided for iOS.
- Offline app shell opens but remote updates cannot be submitted until online.
- All animations respect reduced motion and do not obscure the updated balance.
- Every committed edit has a unique transaction ID, timestamp, amount, reason, source and approval metadata marked honestly (e.g. `local-ui-confirmed`).
