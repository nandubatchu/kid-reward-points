# Security, permissions and parental approval

## Fundamental limitation
A fully static GitHub Pages application runs entirely in the browser of whoever uses it. If the Google account grants that browser edit access, a child (or any user with developer tools) could call Sheets API without passing the app's local parent approval UI. **A local PIN is not enforceable authorization.** This is a product constraint, not something code obfuscation can fix.

For MVP, label approval as a **family convenience check**, not a tamper-proof parental control. A PIN may deter accidental edits but not an intentional bypass. Never store a reusable parent PIN in plaintext; even a salted hash in frontend storage is not a secure authority because local code/state is modifiable. Optional local passcode gate can be a usability feature, not a guarantee.

## Biometrics
- A web app cannot directly ask a sensor to verify 'the parent'. WebAuthn/platform authentication verifies a credential or device user presence according to platform behavior and account setup; it does not inherently identify the parent on a shared phone.
- Avoid 'Parent Fingerprint' as a guaranteed identity claim. Preferred label: `Approve with device unlock (not parent-verified)` if implemented later.
- Reliable parental approval across devices would require a trusted backend or a different architecture enforcing writes using parent-controlled credentials and server-side authorization.

## Google permissions
- Use narrow file-specific access flow (`drive.file` and Picker) with clear consent. Don't request unrestricted Google Drive access.
- Token handling in memory; sanitize logs; never log access tokens or private Sheet contents.
- Browser API key is not secret; configure HTTP referrer restrictions, quota monitoring and OAuth restrictions.
- Follow Google's OAuth app verification and user-data policies for public launch.

## Additional guards
- Google sign-in/connect should be undertaken by guardian; use a parent-controlled account, not encourage child accounts or circumvent Family Link.
- Clearly explain that this is an informal points tracker with a rupee comparison, not a bank or payments app.
- Escape any user-supplied text displayed in the UI, constrain length and integer amounts, defend against spreadsheet formula injection.
- No analytics or third-party trackers by default. Data remains in the user-selected Google Sheet and browser-local settings.
- Keep service worker caches limited to static assets; no authenticated fetch caching.
- Privacy policy and clear disconnect functionality before public distribution.
