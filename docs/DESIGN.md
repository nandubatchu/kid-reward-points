# Visual and motion system

## Theme engine
Build theme tokens independently from business logic. Provide at least two themes in Settings:

1. **OG-inspired Hero** (default for Vrishi): generic cinematic Telugu action-film atmosphere, inky navy surfaces, electric cyan highlights, gold coin glow, coral/red redemption accents, confident fun star hero mascot, decorative **stylized toy/graphic katana motif** (e.g., sheathed silhouette, slash-shaped transitions, motion trails). **No actor likenesses, no official OG art/logos, no violent imagery, and no weapon-use interaction.** Keep kid-friendly, legible, and not frightening.
2. **Soft & Friendly**: mint, peach, lavender, sunshine yellow, light surfaces, same information architecture.

Themes must be swappable without data changes and should honor contrast requirements.

## Screens and animations
- Home: balance as large central hero card; star hero wiggle/blink; gently glinting coins; large add/redeem actions; history table/cards.
- Add points: tap chip spring, coin flips, preview counter counts up; after write confirmed, bold `MISSION COMPLETE!`, gold coin burst, mascot jump, soft haptic feedback if browser supports it.
- Redeem: animated gift reveal, ruby/coral trails and coin count down, positive congratulatory tone (`Reward redeemed!`) without sadness.
- Parent review: calm and reassuring; no success animation before successful Sheets API commit.
- Streak/badge: optional progress bar fills and achievement badge pops after verified milestones.
- Motion: 250–600ms for small interactions; celebration under ~2.5s and skippable, don't block navigation. `prefers-reduced-motion` minimizes bursts and counter animations. Sound off by default (explicit parent opt-in).

## Accessibility and UX
- Mobile first, 44px minimum hit targets, large text, strong semantic labels, color + icon/text indicators, keyboard navigable, accessible dialog focus.
- Support narrow screens ~320px upwards; mobile portrait primary. Long descriptions ellipsize gracefully without hiding details.
- Approximate OG styling only: avoid any official movie character, copycat logo, or trademark confusion.

## Design assets
Start with vector/CSS mascots and stylized katana graphics that are original and easy to recolor; keep all art assets replaceable. A later theme gallery may include additional family-safe variants.
