# Graph Report - kid-reward-points  (2026-10-08)

## Corpus Check
- 30 files · ~17,525 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 181 nodes · 292 edges · 18 communities (17 shown, 1 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `dbbac123`
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
- [[_COMMUNITY_Community 13|Community 13]]
- [[_COMMUNITY_Community 14|Community 14]]
- [[_COMMUNITY_Community 15|Community 15]]

## God Nodes (most connected - your core abstractions)
1. `Transaction` - 12 edges
2. `pinConfigured()` - 8 edges
3. `verifyPin()` - 8 edges
4. `savePin()` - 8 edges
5. `Hero Adventure design system` - 8 edges
6. `Product Requirements Document — Kid Reward Points` - 8 edges
7. `Technical architecture and integration` - 7 edges
8. `SheetsRepository` - 6 edges
9. `validAmount()` - 6 edges
10. `DemoRepository` - 5 edges

## Surprising Connections (you probably didn't know these)
- `App()` --calls--> `pinConfigured()`  [EXTRACTED]
  src/main.tsx → src/pin.ts
- `App()` --calls--> `connected()`  [EXTRACTED]
  src/main.tsx → src/repository.ts
- `App()` --calls--> `validAmount()`  [EXTRACTED]
  src/main.tsx → src/ledger.ts
- `MissionForm()` --calls--> `validAmount()`  [EXTRACTED]
  src/components/MissionForm.tsx → src/ledger.ts
- `commitWithPin()` --calls--> `pinConfigured()`  [EXTRACTED]
  src/approval.ts → src/pin.ts

## Communities (18 total, 1 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.13
Nodes (23): balance(), CONFIG, HEADERS, newTransaction(), parseRows(), safeText(), parsed, row (+15 more)

### Community 1 - "Community 1"
Cohesion: 0.11
Nodes (18): Achievements(), MILESTONES, ApprovalScreen(), format(), Props, EarnCelebration(), format(), Draft (+10 more)

### Community 2 - "Community 2"
Cohesion: 0.2
Nodes (17): commitWithPin(), commit, data, snapshot, tx, Transaction, bytes(), hashPin() (+9 more)

### Community 3 - "Community 3"
Cohesion: 0.22
Nodes (6): toRow(), api(), createSpreadsheet(), DemoRepository, importLegacyRows(), SheetsRepository

### Community 4 - "Community 4"
Cohesion: 0.17
Nodes (11): 1. Product vision, 2. Users and roles, 3. Architecture / hosting, 4. Priority features, 5. Main user journeys, 6. UI screens, 7. Acceptance criteria, Explicit non-goals for MVP (+3 more)

### Community 5 - "Community 5"
Cohesion: 0.29
Nodes (8): AnimatedCount(), format(), Count(), format(), HeroHome(), Props, format(), RewardCelebration()

### Community 6 - "Community 6"
Cohesion: 0.2
Nodes (9): Authentication and scopes, code:block1 (Parent/child browser / installed PWA), code:block2 (src/), Data boundaries, Diagram, Google Sheets API, PWA / GitHub Pages, Suggested structure (+1 more)

### Community 7 - "Community 7"
Cohesion: 0.22
Nodes (8): Future screens, Hero Adventure design system, Motion and accessibility, Motion and data, Screens, Themes, Themes and components, Visual language

### Community 8 - "Community 8"
Cohesion: 0.25
Nodes (7): Checks and deployment, code:bash (npm ci), code:bash (npm test), Connect Google Sheets, Current limits, Kid Reward Points, Run locally

### Community 9 - "Community 9"
Cohesion: 0.25
Nodes (7): `Badges` (optional later), Balance, `Config`, Existing user's legacy sheet, Google Sheet data contract (v1), Target spreadsheet tabs, `Transactions` (header row)

### Community 10 - "Community 10"
Cohesion: 0.38
Nodes (4): migrateStoredSettings(), previousKeys, storageKeys, storage

### Community 11 - "Community 11"
Cohesion: 0.33
Nodes (5): Definition of done, Delivery plan and test checklist, Google Cloud prerequisites (human setup), Milestones, Tests

### Community 12 - "Community 12"
Cohesion: 0.33
Nodes (5): Additional guards, Biometrics, Fundamental limitation, Google permissions, Security, permissions and parental approval

### Community 13 - "Community 13"
Cohesion: 0.33
Nodes (5): Accessibility and UX, Design assets, Screens and animations, Theme engine, Visual and motion system

### Community 14 - "Community 14"
Cohesion: 0.4
Nodes (4): Deliverables, Execution order, Important product integrity, Prompt for Codex

## Knowledge Gaps
- **71 isolated node(s):** `config`, `TokenClient`, `Window`, `data`, `row` (+66 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **1 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `SheetsRepository` connect `Community 3` to `Community 0`, `Community 1`?**
  _High betweenness centrality (0.018) - this node is a cross-community bridge._
- **Why does `DemoRepository` connect `Community 3` to `Community 0`, `Community 1`?**
  _High betweenness centrality (0.018) - this node is a cross-community bridge._
- **Why does `Transaction` connect `Community 2` to `Community 0`, `Community 1`, `Community 5`?**
  _High betweenness centrality (0.014) - this node is a cross-community bridge._
- **What connects `config`, `TokenClient`, `Window` to the rest of the system?**
  _71 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.13 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.11 - nodes in this community are weakly interconnected._