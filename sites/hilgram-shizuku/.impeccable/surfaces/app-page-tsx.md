---
version: 1
slug: "app-page-tsx"
primary_target: "app/page.tsx"
related_targets: ["app/profile-client.tsx","app/globals.css"]
---

# Surface brief

## Purpose

Single-page HILGRAM submission profile for Mikage Shizuku. Public, secret, and owner records must remain clearly separated while preserving every required template field.

## Visual world

Modern photo-restoration record: muted paper white, ink charcoal, one restrained lilac accent, 14px surfaces, fine 1px crop marks and paired parallel rules. Avoid blood, knives, police tape, aggressive glitches, generic crime-file styling, card grids, and excessive ornament.

## First viewport

Desktop uses a roughly 42/58 split: sticky portrait and compact facts at left, identity and defining quotation at right, with the public/secret/owner switcher in the sticky top bar. Mobile keeps the same story but compacts the portrait so the name, quotation, and catchphrase remain visible within 390×844.

## Signature interaction

Selecting the secret record first opens an explicit spoiler gate. The page changes to a dark charcoal version of the same grid while keeping lilac as the only accent. The gate provides confirm and cancel actions, correct expanded/control semantics, and moves focus to the new heading. Unlocking reveals the full secret profile.

## Content and accessibility

Use the supplied image as an unmodified pre-admission appearance reference. Keep the HILGRAM white restraint uniform in written appearance copy. Caption, facts, and tabs remain at least 1rem. Touch targets are at least 44px, reduced-motion users receive no reveal animation, and public/secret state is conveyed by labels and ARIA state as well as color.
