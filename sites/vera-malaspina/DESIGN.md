---
name: "Vera Malaspina / ERRATA"
description: "A text-only clinical dossier with graphite assay surfaces and a fluorescent reagent-green signal."
colors:
  background: "#0b0f0c"
  background-raised: "#111612"
  surface: "#151b16"
  surface-elevated: "#1b221c"
  surface-high: "#222a23"
  ink: "#edf2ec"
  ink-soft: "#c9d0c9"
  muted: "#929b93"
  faint: "#667067"
  line: "rgba(222, 235, 221, 0.16)"
  line-strong: "rgba(222, 235, 221, 0.32)"
  reagent-green: "#b7ff37"
  reagent-deep: "#709f19"
  reagent-wash: "rgba(183, 255, 55, 0.1)"
  reagent-line: "rgba(183, 255, 55, 0.38)"
  warning: "#e6d86c"
  danger: "#ea7f72"
typography:
  display:
    fontFamily: "Archivo Variable, sans-serif"
    fontSize: "clamp(3.25rem, 7.7vw, 5.85rem)"
    fontWeight: 680
    lineHeight: 0.86
    letterSpacing: "-0.064em"
    fontVariation: "wght 680, wdth 90"
  headline:
    fontFamily: "Noto Sans KR Variable, sans-serif"
    fontSize: "clamp(2rem, 4.7vw, 4rem)"
    fontWeight: 620
    lineHeight: 1.13
    letterSpacing: "-0.045em"
  title:
    fontFamily: "Noto Sans KR Variable, sans-serif"
    fontSize: "clamp(1.7rem, 3.6vw, 3rem)"
    fontWeight: 620
    lineHeight: 1.18
    letterSpacing: "-0.035em"
  body:
    fontFamily: "Noto Sans KR Variable, sans-serif"
    fontSize: "0.92rem"
    fontWeight: 450
    lineHeight: 1.95
  label:
    fontFamily: "Archivo Variable, sans-serif"
    fontSize: "0.72rem"
    fontWeight: 720
    lineHeight: 1
    letterSpacing: "0.14em"
rounded:
  full: "50%"
  vessel: "50% 50% 18% 18% / 18% 18% 12% 12%"
spacing:
  gutter: "4vw"
  section: "150px"
  section-mobile: "110px"
  card: "clamp(28px, 4vw, 54px)"
  assay: "clamp(28px, 5vw, 68px)"
components:
  assay-tab:
    backgroundColor: "transparent"
    textColor: "{colors.muted}"
    padding: "12px clamp(18px, 3vw, 42px)"
    height: "58px"
  assay-tab-active:
    backgroundColor: "{colors.reagent-wash}"
    textColor: "{colors.ink}"
    padding: "12px clamp(18px, 3vw, 42px)"
    height: "58px"
  keyword-chip:
    backgroundColor: "{colors.reagent-wash}"
    textColor: "{colors.reagent-green}"
    padding: "8px 12px"
  voice-control:
    backgroundColor: "transparent"
    textColor: "{colors.muted}"
    rounded: "{rounded.full}"
    size: "44px"
  voice-control-active:
    backgroundColor: "{colors.reagent-green}"
    textColor: "#0e140e"
    rounded: "{rounded.full}"
    size: "44px"
  assay-card:
    backgroundColor: "{colors.surface}"
    rounded: "0"
    padding: "48px clamp(28px, 5vw, 68px) 36px"
---

# Design System: Vera Malaspina / ERRATA

## Overview

**Creative North Star: "The Microfluidic Assay Cartridge"**

This is a text-only clinical dossier, not a character card or a portrait page. Information travels through graph-paper fields, ruled laboratory panels, channels, nodes, metric racks, and transparent-vessel diagrams. The page is intentionally structured enough to make ability rules auditable at a glance, while its asymmetry, off-axis lines, and unstable green signals suggest an experiment only barely held in its cartridge.

Graphite and surgical gray establish the reading field. One fluorescent reagent-green behaves like an active trace: it marks conditions, dosage, state, path nodes, and interactive confirmation. The only other chromatic interventions are the narrow warning-yellow and danger-coral states used to distinguish administrative caution and concealed risk. There is no character image, seal, or decorative likeness; the person is constructed through language, data, and assay-like abstract diagrams.

**Key Characteristics:**

- Dense but legible long-form dossier rhythm.
- Flat, bordered laboratory surfaces with restrained depth.
- Archivo provides instrument labels and Latin/number data; Noto Sans KR carries Korean reading text.
- Fluorescent green is a sparse, meaningful reagent signal—not a general fill color.
- Motion explains state or ambience and switches off for reduced-motion preferences.

## Colors

The palette is a calibrated low-light laboratory: dark graphite surfaces retain the eye while a single lime reagent establishes hierarchy and state.

### Primary

- **Fluorescent Reagent Green**: Reserved for active navigation, section markers, protocol labels, dosage states, precise diagram signals, and selected controls.
- **Deep Reagent Green**: Supports the light theme’s durable accent and darker green treatments.

### Secondary

- **Review Yellow**: Used only for the pending-review notice and safety guidance, where it must not compete with the reagent signal.
- **Procedure Coral**: Used for the hidden truth and corruption path, communicating risk without becoming a second brand accent.

### Neutral

- **Graphite Field**: The dark default canvas and grid backdrop.
- **Raised Surgical Gray**: A slightly lifted ground for metrics, cards, and major project framing.
- **Assay Surface**: The default panel fill for readable dossier modules.
- **Specimen Ink**: Near-white text for headings and critical values.
- **Soft Ink / Muted Ink**: The descending reading hierarchy for body copy, supporting descriptions, and secondary metadata.
- **Calibration Lines**: Low-opacity pale rules divide panels and establish the cartridge-grid geometry.

**The One Reagent Rule.** Green is evidence of an active condition, choice, measurement, or confirmed location. Do not use it as broad decoration, a large background, or a second text color for ordinary body copy.

**The Dark-First Rule.** Dark graphite is the normative view. The light theme inverts the same semantic roles into pale surgical-gray paper while preserving green, warning, and danger meaning.

## Typography

**Display Font:** Archivo Variable (with sans-serif fallback)

**Body Font:** Noto Sans KR Variable (with sans-serif fallback)

**Label/Mono Font:** Archivo Variable for instrument-like labels, numeric metadata, and Latin identifiers.

**Character:** Archivo’s compressed, high-impact letterforms make names, numbers, and apparatus labels feel measured rather than editorial. Noto Sans KR remains the generous, high-legibility reading voice for the Korean dossier.

### Hierarchy

- **Display**: Used exclusively for the two-line hero name, with tightly compressed leading and tracking to establish the dossier’s opening specimen label.
- **Headline**: Used for major section statements and the project title; it balances large scale with Korean word integrity through `word-break: keep-all` and balanced wrapping.
- **Title**: Used for assay and module headings where a strong technical voice is needed without display-scale dominance.
- **Body**: Used for the long factual record at a relaxed 1.95 line-height; long explanatory passages generally cap at 650–900px.
- **Label**: Small, firm, letter-spaced Archivo labels identify categories, units, dates, and operational state. English instrument labels may be uppercase; Korean labels remain as authored.

**The Instrument/Record Rule.** Use Archivo for what is measured, indexed, or named in the system; use Noto Sans KR for what must be read, interpreted, or remembered.

## Layout

The site is a single vertical dossier bounded by a 1320px reading container (1440px for the project band and 1600px for the hero). Global side gutters are `4vw`; major sections arrive on a generous 150px cadence, contracting to 110px at 780px and below. The shell’s fixed 96px grid becomes 64px on mobile, giving every panel a shared technical field without adding imagery.

Desktop composition alternates between deliberately unbalanced two- and three-column grids: hero copy beside the specimen cartridge, profile panels at 0.82/1.18, assay summaries beside their explanatory columns, and branch outcomes separated by a 90px junction. Fine 1px borders are the real grid. The large project section interrupts the main 1320px rhythm with a full-width apparatus band and a vertical status stamp.

At 1050px, supporting copy reflows beneath its heading; at 780px, modules become single-column and the navigation becomes a horizontally scrollable second row. Dense facts preserve their table-like cells down to two columns, then one column at 520px. The mobile sequence favors complete reading order over retaining desktop geometry.

## Elevation & Depth

Depth is restrained and structural. Most separation comes from tonal steps, hairline rules, grid fields, and inset frames rather than floating shadows. Only the hero specimen card and assay cards receive diffuse low-contrast black shadows, which make those modules read as physical cartridge layers without breaking the clinical flatness. Translucent fills and occasional `backdrop-filter` on the sticky bar let the grid remain visible through the interface.

### Shadow Vocabulary

- **Specimen Lift** (`0 28px 80px var(--shadow)`): Gives the hero’s subject cartridge its sole opening elevation.
- **Assay Lift** (`0 32px 100px var(--shadow)`): Grounds large ability cards as the page’s primary interaction surfaces.
- **Reagent Halo** (`0 0 18px var(--acid)` and soft reagent washes): Signals active liquid, a live channel, or a selected node—not generic elevation.

**The Contained Depth Rule.** Elevation belongs to specimen and assay modules; ordinary profile panels, rails, and disclosures remain ruled and flat.

## Shapes

The default shape is square and sectional: crisp panels, flush grids, and unrounded data cells. Circular forms are functional instruments—nodes, status dots, capsule counters, rings, control buttons, and plus/minus toggles—not casual decoration. The dose vessel alone carries a biomorphic, glass-like compound radius, while the project door remains rectilinear and surgical.

Borders are 1px calibration lines, strengthened only at important module boundaries. Pseudo-element corner circles on assay cards and the recurring circular node with a washed halo give the cartridge its connective physical language.

**The Instrument Geometry Rule.** Use rounded forms only when they read as a measurement point, control, liquid vessel, or signal. Keep content containers square.

## Components

### Navigation

The sticky top bar is a translucent graphite instrument rail. It uses a 70px desktop minimum height (62px at mobile), an `18px` blur, compact Archivo labels, and a single green underline that scales in on hover. The active anchor changes to reagent green; the mobile rail moves to a scrollable second row rather than hiding destinations.

### Assay Cards

The ability cards are the signature component: square assay surfaces with strong 1px borders, subtle shadow lift, two inset corner nodes, and a grid of heading, interaction, measured values, and protocol. The main heading uses generous assay padding; every submodule is separated by the same calibration line.

### Dosage Tabs

Three equal-width tab buttons form an integrated instrument switcher. Resting tabs are transparent and muted; hover and active tabs receive a reagent wash. The active numbered circle becomes solid fluorescent green with dark text. Keyboard arrow navigation, Home, and End remain part of the interaction model.

### Keyword Chips

Personality terms are compact square chips with an 8px by 12px inset, reagent-wash fill, green text, and a fine reagent border. They annotate traits; they are not filters or primary actions.

### Metrics, Rails, and Timelines

Identity, metrics, inventory, affiliation, and timeline records are all ruled data structures. Cells use compact labels, a stronger value, and only 1px internal divisions; flex or grid collapse preserves the values as distinct cells on small screens.

### Disclosures

Truth and relationship disclosures are border-led accordions, not isolated cards. Their summaries use generous hit areas, no native marker, and a circular plus control that resolves to a minus when open. The hidden truth alone takes a faint danger wash to distinguish its risk state.

### Voice Console

The voice console is a large square readout with a labeled top line, animated transcript center, and 44px circular selector controls. Active controls are the same green/dark inversion as active dosage; quote changes move briefly only when reduced motion is not requested.

### Theme Toggle and Return Link

The theme toggle is text-forward with a small orbit control and no filled button shell. The final return link is a quiet outlined text control whose border and text turn green on hover; neither competes with the dossier content.

## Do's and Don'ts

### Do:

- **Do** treat long-form information as a test record: use ruled panels, visible units, measured labels, and stable reading order.
- **Do** use `4vw` gutters, the 1320px main container, and the observed 150px section rhythm when extending the page.
- **Do** preserve text-only representation; use abstract assay diagrams, routes, vessels, doors, and signal nodes instead of a character portrait.
- **Do** reserve circular forms for active controls, nodes, status signals, and vessel/instrument metaphors.
- **Do** pair an interaction state with text, border, or visible state change in addition to green color, and retain the 2px green `:focus-visible` outline.
- **Do** honor reduced motion by allowing every animated state to remain fully understandable without animation.

### Don't:

- **Don't** introduce a second saturated brand color or use green as a broad surface fill.
- **Don't** round ordinary cards, cells, or content panels; the cartridge is mostly square and line-bound.
- **Don't** add portrait art, character seals, photo cutouts, or decorative mascot imagery.
- **Don't** hide ability quantities, limits, or rule conditions inside animation, hover-only states, or imagery.
- **Don't** replace the compact mobile rail with a hamburger that conceals the dossier’s core sections.
