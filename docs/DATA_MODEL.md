# Google Sheet data contract (v1)

## Target spreadsheet tabs

### `Config`
| key | value |
|---|---|
| schema_version | 1 |
| child_name | Vrishi |
| points_per_rupee | 1 |
| opening_balance | 0 |
| theme | hero |
| allow_negative_balance | false |

### `Transactions` (header row)
`id,created_at_iso,type,points_delta,description,actor_label,approval_method,source_client_id,notes`

- `id`: UUID from frontend, duplicate-check before append.
- `created_at_iso`: ISO-8601 with timezone offset / UTC.
- `type`: `EARN`, `REDEEM`, `ADJUSTMENT`.
- `points_delta`: signed integer (+5, -160).
- `description`: activity/reward string, sanitized before writing to Sheets to avoid formula injection (prefix dangerous values starting `=`, `+`, `-`, `@` with a literal apostrophe or use `RAW` input mode; verify treatment).
- `approval_method`: `local-pin-ui`, `local-device-ui`, `parent-confirm-ui`, or `imported` — **not an attestation of parent identity**.
- `source_client_id`: locally generated stable client ID, not a person identity.
- Do not depend on `actor_label` for authorization.

### `Badges` (optional later)
Computed achievements can initially live in app config; avoid duplicating derived totals in Sheet.

## Balance
`balance = Config.opening_balance + SUM(Transactions.points_delta)`.
Keep number in integer points; 1 point = ₹1 display only.

## Existing user's legacy sheet
The supplied screenshot suggests: column A date (sometimes blank in subsequent rows), column B point delta, column C activity, column D name; header/top B1 appears to contain a total (18,390 in sample screenshot). Values such as +5 for brushing, +50 lunch, -160 toys.

**Migrate carefully**:
1. Never treat B1 as a transaction; clarify whether it is displayed balance, historical total or starting balance.
2. Parse dates in A (e.g. `20-08-2025`) with day-first interpretation; carry forward date only within meaningful entries if parent confirms.
3. Convert numeric column B values to signed integer ledger deltas; C to descriptions; D to actor labels.
4. Display import preview with row count and sample records.
5. To preserve current displayed balance when history is incomplete, explicitly ask parent to choose initial/opening balance. Example: `opening_balance = displayed_balance - sum(imported_deltas)`; show explanation and confirm. Never double count.
6. Write to new dedicated tabs or a new spreadsheet **only after explicit approval**; keep original untouched by default.
7. Rows without dates, blank amounts, nonnumeric values and formula-driven totals must be handled or flagged, not guessed.
