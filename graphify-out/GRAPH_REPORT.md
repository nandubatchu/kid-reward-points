# Graph Report - kid-reward-points  (2026-10-08)

## Corpus Check
- 22 files · ~7,261 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 145 nodes · 228 edges · 15 communities (14 shown, 1 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `cb42fa1a`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 5|Community 5]]
- [[_COMMUNITY_Community 6|Community 6]]
- [[_COMMUNITY_Community 7|Community 7]]
- [[_COMMUNITY_Community 8|Community 8]]
- [[_COMMUNITY_Community 9|Community 9]]
- [[_COMMUNITY_Community 10|Community 10]]
- [[_COMMUNITY_Community 11|Community 11]]
- [[_COMMUNITY_Community 12|Community 12]]

## God Nodes (most connected - your core abstractions)
1. `pinConfigured()` - 8 edges
2. `verifyPin()` - 8 edges
3. `savePin()` - 8 edges
4. `Product Requirements Document — Kid Reward Points` - 8 edges
5. `Transaction` - 7 edges
6. `Technical architecture and integration` - 7 edges
7. `SheetsRepository` - 6 edges
8. `DemoRepository` - 5 edges
9. `api()` - 5 edges
10. `parseLegacyRows()` - 5 edges

## Surprising Connections (you probably didn't know these)
- `App()` --calls--> `pinConfigured()`  [EXTRACTED]
  src/main.tsx → src/pin.ts
- `App()` --calls--> `connected()`  [EXTRACTED]
  src/main.tsx → src/repository.ts
- `App()` --calls--> `validAmount()`  [EXTRACTED]
  src/main.tsx → src/ledger.ts
- `commitWithPin()` --calls--> `pinConfigured()`  [EXTRACTED]
  src/approval.ts → src/pin.ts
- `commitWithPin()` --calls--> `verifyPin()`  [EXTRACTED]
  src/approval.ts → src/pin.ts

## Communities (15 total, 1 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.14
Nodes (13): balance(), CONFIG, HEADERS, newTransaction(), parseRows(), safeText(), parsed, row (+5 more)

### Community 1 - "Community 1"
Cohesion: 0.2
Nodes (17): commitWithPin(), commit, data, snapshot, tx, Transaction, bytes(), hashPin() (+9 more)

### Community 2 - "Community 2"
Cohesion: 0.14
Nodes (11): validAmount(), App(), demo, Kind, Screen, connected(), googleConfigured, migrateStoredSettings() (+3 more)

### Community 3 - "Community 3"
Cohesion: 0.18
Nodes (15): mockRows, api(), authorize(), config, createSpreadsheet(), disconnect(), importLegacyRows(), legacyDate() (+7 more)

### Community 4 - "Community 4"
Cohesion: 0.17
Nodes (11): 1. Product vision, 2. Users and roles, 3. Architecture / hosting, 4. Priority features, 5. Main user journeys, 6. UI screens, 7. Acceptance criteria, Explicit non-goals for MVP (+3 more)

### Community 5 - "Community 5"
Cohesion: 0.2
Nodes (9): Authentication and scopes, code:block1 (Parent/child browser / installed PWA), code:block2 (src/), Data boundaries, Diagram, Google Sheets API, PWA / GitHub Pages, Suggested structure (+1 more)

### Community 6 - "Community 6"
Cohesion: 0.25
Nodes (7): Checks and deployment, code:bash (npm ci), code:bash (npm test), Connect Google Sheets, Current limits, Kid Reward Points, Run locally

### Community 7 - "Community 7"
Cohesion: 0.25
Nodes (7): `Badges` (optional later), Balance, `Config`, Existing user's legacy sheet, Google Sheet data contract (v1), Target spreadsheet tabs, `Transactions` (header row)

### Community 8 - "Community 8"
Cohesion: 0.33
Nodes (5): Definition of done, Delivery plan and test checklist, Google Cloud prerequisites (human setup), Milestones, Tests

### Community 9 - "Community 9"
Cohesion: 0.33
Nodes (5): Additional guards, Biometrics, Fundamental limitation, Google permissions, Security, permissions and parental approval

### Community 10 - "Community 10"
Cohesion: 0.33
Nodes (5): Accessibility and UX, Design assets, Screens and animations, Theme engine, Visual and motion system

### Community 11 - "Community 11"
Cohesion: 0.4
Nodes (4): Deliverables, Execution order, Important product integrity, Prompt for Codex

## Knowledge Gaps
- **58 isolated node(s):** `config`, `TokenClient`, `Window`, `data`, `row` (+53 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **1 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `SheetsRepository` connect `Community 0` to `Community 2`, `Community 3`?**
  _High betweenness centrality (0.020) - this node is a cross-community bridge._
- **Why does `DemoRepository` connect `Community 0` to `Community 2`, `Community 3`?**
  _High betweenness centrality (0.020) - this node is a cross-community bridge._
- **Why does `savePin()` connect `Community 1` to `Community 2`?**
  _High betweenness centrality (0.012) - this node is a cross-community bridge._
- **What connects `config`, `TokenClient`, `Window` to the rest of the system?**
  _58 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.14 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.14 - nodes in this community are weakly interconnected._