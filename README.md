# Kid Reward Points

A mobile-first family reward ledger. The app is a static React PWA; each family can keep its own data in a Google Sheet. See [the product requirements](docs/PRD.md) and [security notes](docs/SECURITY.md).

## Run locally

```bash
npm ci
npm run dev
```

The app opens in demo mode with sample activity. You can navigate Home, Add/Use Points, Parent Review, Success, Activity, Settings and Connect Sheet without Google setup. Demo changes last only until the page reloads.

## Connect Google Sheets

1. Create a Google Cloud project. Enable the Google Sheets API and Google Picker API. Enable the Google Drive API only if you later add direct Drive API calls. Set up an OAuth consent screen and a Web client with Authorized JavaScript origins `http://localhost`, `http://localhost:5176`, and your production origin (for this repo on GitHub Pages, `https://nandubatchu.github.io`). Origins have no path.
2. Copy `.env.example` to `.env.local` and fill in the public Web client ID, browser API key and Google Cloud project number (`VITE_GOOGLE_APP_ID`). Restrict the API key to the Google Picker API and website referrers. Include both your app URL (for local testing, `http://localhost:5176/*`) and `https://docs.google.com/*`, because Picker runs in a Google iframe. Never add a client secret or service-account key.
3. Restart the dev server. Open Settings → Connect a Sheet. In Settings, set the child’s name and a six-digit device PIN, then sign in as a parent and choose an existing Kid Reward Points v1 sheet or create one. New spreadsheets are titled Kid Reward Points; the child’s name is stored separately in the connected sheet’s Config tab. A non-v1 sheet is not modified; an explicit legacy preview can create a new imported sheet.

The Google flow requests the `drive.file` scope and stores the access token in memory. On refresh, the selected sheet remains remembered and the app presents a one-click reconnect; it does not show demo points as if they were the family balance. Existing file selection uses Google Picker. Live Google behavior needs testing with your Cloud project and two test accounts before launch. A six-digit device PIN is required in the app before points are saved. It is stored locally as a salted hash and is only a convenience gate: the static app cannot enforce parent-only access to an authorized Google Sheet on a shared device.

## Checks and deployment

```bash
npm test
npm run build
```

The build uses `/kid-reward-points/` as the GitHub Pages base. The included GitHub Actions workflow deploys `main` to Pages. Set repository Actions variables `VITE_GOOGLE_CLIENT_ID`, `VITE_GOOGLE_API_KEY`, and `VITE_GOOGLE_APP_ID` before building the deployed app. Enable GitHub Pages deployment from Actions in repository settings.

The published privacy notice is available at `/kid-reward-points/privacy.html`. The PWA caches its static shell only. It does not cache authenticated Google API responses or submit writes offline. On Android use the browser’s Install app menu; on iPhone use Safari’s Share → Add to Home Screen.

## Current limits

- The app shows success only after reading the committed transaction back. Google Sheets is not transactional, so simultaneous writers can race; a client-only app cannot guarantee strict exactly-once writes.
- Legacy import accepts day-first dates and integer deltas from columns A–D. It requires an explicit opening balance and writes into a new sheet, leaving the original untouched.
- Live OAuth/Picker/Sheets behavior, mobile installation and cross-account isolation require testing with configured Google accounts. No OAuth credentials are in the repository.
