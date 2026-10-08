# Technical architecture and integration

## Diagram
```
Parent/child browser / installed PWA
  |-- Vite React client hosted on GitHub Pages
  |-- Google Identity Services token client (OAuth)
  |-- Google Picker (parent selects Sheet)
  |-- Sheets API (read/write selected spreadsheet)
  '-- local app shell cache and transient drafts
                  |
        Family's own Google Sheet in Google Drive
```

## Authentication and scopes
- Register Google Cloud project / OAuth consent screen and Web OAuth client ID. Configure authorized JavaScript origins for GitHub Pages domain (origin, NOT full path). If applicable configure testing users and complete Google OAuth verification requirements before public launch.
- Use Google Identity Services token model; request access only upon user action. Handle expired token, denied consent and reauthorization.
- Prefer `https://www.googleapis.com/auth/drive.file` for app-created or user-selected files. **Prototype and test** actual Sheets API read/write + Picker behavior with this scope before assuming all arbitrary Sheets are accessible; choose Picker filtering and app file opening consistent with Google's documentation. Avoid broad `spreadsheets` or Drive scopes by default; any escalation requires a fresh security review and explanation.
- Picker generally requires Google API key and project number; restrict browser API key to site origin and relevant APIs; key is public, not a secret. Avoid exposing a service account or client secret.
- Existing Google Sheets must be authorized for this app; do not rely on accepting only a pasted spreadsheet ID to grant access.

## Google Sheets API
- Create new spreadsheet with Sheets API if permitted by chosen scope; initialize tabs using batchUpdate / values APIs and handle scope/ownership constraints. If creation flow needs alternative API/scope, document and ask rather than silently widening scope.
- Read sheet via `spreadsheets.values.get` or `batchGet`; write via `values.append` or batchUpdate; ensure schema/version checks.
- Each transaction should be append-only. Note Sheets is NOT a transactional database: simultaneous writers may race; use optimistic read, identity checks and conflict alerts, and test multiple tabs/devices. Do not claim strict exactly-once guarantees from client-only writes.
- Source of truth is ledger in Sheet, never cached UI totals.

## PWA / GitHub Pages
- Vite `base` configured for `/<repo>/` project Pages or `/` user/org Pages. Use hash routing or configure SPA navigation fallback on Pages to avoid 404 on refresh.
- Manifest with `name`, `short_name`, `start_url` relative to deployed base, `scope`, `display: standalone`, theme/background colors, 192/512 and maskable icons.
- Use a service worker (e.g. vite-plugin-pwa) to cache app shell and static files; **never precache authenticated Google API responses or tokens**. Online-only writes; do not queue writes without explicit reconciliation design.
- iOS home-screen support varies and Safari has different installation UX; show platform-specific instructions; standalone does not hide all OS status/navigation UI.

## Data boundaries
- Auth token in memory only where practical. On page reload user may reconnect; do not persist access token in localStorage.
- Store spreadsheet ID, theme and display name in localStorage if desired, treated as non-secret. On shared devices warn that balance and local drafts may be visible.
- App state phases: disconnected → authorizing → selecting → validating → ready → pending parent review → committing → success/error.

## Suggested structure
```
src/
  app/          # routing, providers
  auth/         # Google token lifecycle
  sheets/       # schema, repository, migration
  features/     # dashboard, ledger, proposals, approval, settings
  components/   # shared controls and animations
  themes/       # CSS variables / theme assets
  pwa/          # install UX, offline notice
```
