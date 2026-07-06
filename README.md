# Omolara Bello — Portfolio

A portfolio for Omolara Bello built with **Next.js 16** (App Router, TypeScript), **Tailwind CSS v4**, and **GSAP**.

## Stack

- Next.js 16 (Turbopack)
- React 19
- TypeScript 6 (strict mode)
- Tailwind CSS v4
- GSAP 3

## Getting started

```bash
npm install
npm run dev
```

Requires network access on first build so Next.js can fetch the Google Fonts (Fraunces, Manrope, JetBrains Mono) used in `app/layout.tsx`.

## Editing content

Every text can be founded and edited at `constants/index.ts`

## Structure

```
app/
  layout.tsx        Root layout, font loading, metadata
  page.tsx          Assembles all sections + loader
  globals.css       Tailwind v4 theme tokens (@theme), base styles, custom-cursor CSS
constants/
  index.ts          ALL copy & data — single source of truth, fully typed
components/
  Loader.tsx               Intro loading sequence
  Navbar.tsx                Sticky nav with mobile menu
  Hero.tsx                  Signature animated, cursor-reactive data-plot hero
  About.tsx                 Bio, portrait, pillars, EQ badge
  Skills.tsx                Notebook-cell styled skill groups
  Projects.tsx              Selected work list
  Teaching.tsx              Teaching programs + quote
  LinkedInPosts.tsx         Recent LinkedIn posts, linked out to real profile
  Contact.tsx               CTA + social links
  Footer.tsx                Availability + back-to-top
  CustomCursor.tsx          Crosshair/data-point custom cursor
  AnimatedText.tsx          Reusable scroll-triggered text reveal
  MagneticButton.tsx        Reusable magnetic hover button
  TerminalPanel.tsx         Typewriter code-snippet panel in the hero
  ScrollTriggerRefresher.tsx  Recalculates ScrollTrigger positions once fonts load
```
