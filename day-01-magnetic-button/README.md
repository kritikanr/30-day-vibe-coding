# Day 01 — Magnetic CTA

A single polished micro-interaction: a dark, glassy pill button with a soft magnetic pull and sparse cosmic sparkles.

Part of a 30-day micro interaction challenge.

## Run locally

```bash
npm install
npm run dev
```

Open the URL shown in the terminal (default: `http://127.0.0.1:4199`).

## Interaction

- Move your cursor near the button to feel a soft magnetic pull (max ~20px movement).
- Tiny blue-violet sparkles appear as you enter the magnetic field and fade when you leave.
- Magnetic motion and sparkles are disabled on touch devices and when `prefers-reduced-motion` is set.
- The button is keyboard accessible — tab to focus and press Enter or Space to activate.

## Structure

- `src/style.css` — visual styling
- `src/magnetic.js` — magnetic field logic
- `src/sparkles.js` — particle sparkle animation
- `src/main.js` — initialization and accessibility guards
