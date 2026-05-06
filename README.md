```
 _____ _ _ _                 ____
/ ____(_) (_)               |_  /
| (__ _ | |_  ___ ___  _ __  / /  ___ _ __
\___ \| | | |/ __/ _ \| '_ \/ /| |/ _ \ '_ \
 ___) | | | | (_| (_) | | |/\_ \ |  __/ | | |
|_____/|_|_|_|\___\___/|_| |_/___|\___|_| |_|
```

# SILICON ZEN
### by king525dev

> *A retro-pixel + modern-minimalist UI library for the calm internet.*

[![Version](https://img.shields.io/badge/version-1.1.0-5BA8A0?style=flat-square)](./library/sz.css)
[![License](https://img.shields.io/badge/license-MIT-FFB86C?style=flat-square)](https://choosealicense.com/licenses/mit/)
[![Themes](https://img.shields.io/badge/themes-2-5BA8A0?style=flat-square)](#-themes)

---

## Overview

Silicon Zen is a CSS component library built on a single idea: **the pixel is a deliberate unit, not a limitation.** It draws equal inspiration from the discipline of early computing and the spacious calm of modern minimal design — blending both into something that feels genuinely distinct.

The system runs on two themes — **Parchment** (light, serif-warm) and **Obsidian** (dark, terminal-dense) — and a palette of two accent colours that never change between them. Switching themes costs one attribute. Nothing else moves.

### Inspiration

Silicon Zen was shaped by several projects that treat constraints as craft:

| Reference | What it taught |
|---|---|
| [100r.co](https://100r.co) & the Uxn ecosystem | That constraint forces honesty. Every pixel earns its place. |
| [Zen Browser](https://zen-browser.app) | That modern UI can be genuinely calm — not just minimal for minimalism's sake. |
| [XXIIVV / Varvara Zine](https://wiki.xxiivv.com/site/varvara_zine.html) | That playfulness and precision are not opposites. |
| Personal sandbox experiments | That a design language should feel like a natural extension of how you think. |

You can read the full design philosophy — including colour decisions, font choices, animation rules, and what to never do — in [`philosophy.html`](./philosophy.html).

---

## Installation

Silicon Zen is two files. No build step, no package manager, no configuration.

### Step 1 — Add the fonts

Silicon Zen uses three Google Fonts. Add this to your `<head>` before the stylesheet:

```html
<link href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,700;1,6..72,400&family=JetBrains+Mono:wght@400;500&family=Press+Start+2P&display=swap" rel="stylesheet">
```

### Step 2 — Link the stylesheet

```html
<link rel="stylesheet" href="library/sz.css">
```

Or, if you're hosting it yourself:

```html
<link rel="stylesheet" href="[YOUR CDN URL]/sz.css">
```

### Step 3 — Add the JS plugin *(optional)*

The JS plugin powers modals, tabs, accordions, toast notifications, scroll reveal, and theme toggling. Without it, the visual styles still work — you just wire interactions yourself.

```html
<!-- Place before </body> -->
<script src="library/sz.js"></script>
```

### Step 4 — Set your theme and go

```html
<html lang="en" data-sz-theme="obsidian">
<body class="sz-body sz-dither">

  <div class="sz-container">
    <span class="sz-label">Hello, world</span>
    <h1 class="sz-display">Silicon Zen.</h1>
    <p class="sz-lead">A calm, pixel-precise UI library.</p>
    <button class="sz-btn sz-btn--solid">[ Get Started ]</button>
  </div>

</body>
```

That's it. You're running Silicon Zen.

> **Further reading:** [`sz-docs.html`](./sz-docs.html) covers every component, modifier, and JS API method with live demos and copyable code.

---

## Usage & Examples

Every class in Silicon Zen is prefixed `sz-` so it never collides with your existing styles. You can drop it into a project incrementally — style one button, one card, one section at a time.

### Themes

Apply a theme with a single data attribute on any ancestor element. The most common pattern is setting it on `<html>`:

```html
<!-- Light mode -->
<html data-sz-theme="parchment">

<!-- Dark mode -->
<html data-sz-theme="obsidian">

<!-- Scoped to a section only -->
<section data-sz-theme="obsidian">
  <!-- Everything inside renders in Obsidian -->
</section>
```

Toggle themes from a button with no JavaScript:

```html
<button data-sz-theme-toggle>Toggle Theme</button>
```

Or with JS:

```javascript
SZ.theme('obsidian');   // set explicitly
SZ.toggleTheme();       // flip between the two
```

---

### Buttons

The base class is `sz-btn`. Stack modifiers to get the variant you need:

```html
<!-- Default: transparent, wireframe border -->
<button class="sz-btn">Default</button>

<!-- Solid teal fill — primary actions -->
<button class="sz-btn sz-btn--solid">Primary</button>

<!-- Amber border — secondary alternative -->
<button class="sz-btn sz-btn--amber">Amber</button>

<!-- No border — subtle/tertiary -->
<button class="sz-btn sz-btn--ghost">Ghost</button>

<!-- Red border — destructive actions -->
<button class="sz-btn sz-btn--danger">Danger</button>

<!-- Press Start 2P font, hard pixel shadow — brand moments only -->
<button class="sz-btn sz-btn--pixel">[ PIXEL ]</button>

<!-- Size modifiers -->
<button class="sz-btn sz-btn--sm">Small</button>
<button class="sz-btn sz-btn--lg">Large</button>

<!-- Works on <a> tags too -->
<a href="/docs" class="sz-btn sz-btn--solid">[ Read Docs ]</a>
```

Every button has a built-in hover (−2px offset + hard shadow) and active (snap back) interaction. No extra CSS needed.

---

### Cards

Cards are the primary container component. They come in three header styles:

```html
<!-- Standard: teal title bar -->
<div class="sz-card">
  <div class="sz-card__header">
    <span class="sz-card__title">PROJECT_NAME</span>
    <span class="sz-card__title">_ □ ×</span>
  </div>
  <div class="sz-card__body">
    Your content here.
  </div>
  <div class="sz-card__footer">
    <button class="sz-btn sz-btn--sm sz-btn--solid">Open</button>
  </div>
</div>

<!-- Window chrome: surface-coloured bar, traffic-light dots -->
<div class="sz-card sz-card--window">
  <div class="sz-card__header">
    <div class="sz-card__dots">
      <div class="sz-card__dot sz-card__dot--r"></div>
      <div class="sz-card__dot sz-card__dot--g"></div>
      <div class="sz-card__dot sz-card__dot--b"></div>
    </div>
    <span class="sz-card__title">WINDOW.APP</span>
  </div>
  <div class="sz-card__body">Content</div>
</div>

<!-- Hover lift effect -->
<div class="sz-card sz-card--hover">
  Lifts on hover.
</div>
```

---

### Forms

```html
<div class="sz-field">
  <label class="sz-field__label">Email Address</label>
  <input class="sz-input" type="email" placeholder="you@domain.com">
  <span class="sz-field__hint">We'll never share this.</span>
</div>

<!-- Error state -->
<div class="sz-field">
  <input class="sz-input sz-input--error" type="text" value="bad input">
  <span class="sz-field__error">✗ This field is required</span>
</div>

<!-- Custom checkbox — toggle .is-checked via onclick or sz.js -->
<label class="sz-checkbox" onclick="this.classList.toggle('is-checked')">
  <div class="sz-checkbox__box">✓</div>
  <span class="sz-checkbox__label">I agree to the terms</span>
</label>
```

---

### Progress Bars

```html
<!-- Default teal fill -->
<div class="sz-progress">
  <div class="sz-progress__fill" style="width: 72%"></div>
</div>

<!-- Teal/amber stripe — the Silicon Zen signature fill -->
<div class="sz-progress sz-progress--striped">
  <div class="sz-progress__fill" style="width: 55%"></div>
</div>

<!-- Pixel dashed fill with marching animation -->
<div class="sz-progress sz-progress--pixel">
  <div class="sz-progress__fill" style="width: 40%"></div>
</div>

<!-- Animate to 100% with JS -->
<div id="my-bar" class="sz-progress sz-progress--striped">
  <div class="sz-progress__fill"></div>
</div>
<span id="my-label">READY</span>

<button
  data-sz-progress-run="#my-bar"
  data-sz-progress-label="#my-label"
  class="sz-btn sz-btn--sm"
>Run</button>
```

---

### Modals

```html
<!-- Trigger button -->
<button class="sz-btn" data-sz-modal-open="#my-modal">Open Modal</button>

<!-- Modal markup — place anywhere before </body> -->
<div id="my-modal" class="sz-modal-overlay" aria-hidden="true">
  <div class="sz-modal">
    <div class="sz-modal__header">
      <span class="sz-modal__title">MODAL_TITLE</span>
      <button class="sz-modal__close" data-sz-modal-close>×</button>
    </div>
    <div class="sz-modal__body">
      Your content here. Click outside or press Esc to close.
    </div>
    <div class="sz-modal__footer">
      <button class="sz-btn sz-btn--ghost" data-sz-modal-close>Cancel</button>
      <button class="sz-btn sz-btn--solid">Confirm</button>
    </div>
  </div>
</div>
```

sz.js handles everything: opening, closing, clicking outside, and `Esc` to dismiss.

---

### Toast Notifications

Fire a toast from anywhere with one line of JavaScript:

```javascript
SZ.toast('Build complete in 1.4s', 'ok');    // green left border
SZ.toast('hero.png is 94kb — optimize it', 'warn');  // amber
SZ.toast('Module not found: ./utils', 'error');       // red
SZ.toast('Kernel initialised', 'info');               // teal (default)

// Custom duration (milliseconds)
SZ.toast('Deploying to production...', 'ok', 6000);
```

---

### Tabs

```html
<div data-sz-tabs-scope>
  <div class="sz-tabs">
    <button class="sz-tabs__item is-active" data-sz-tab="panel-a">Overview</button>
    <button class="sz-tabs__item" data-sz-tab="panel-b">Details</button>
    <button class="sz-tabs__item" data-sz-tab="panel-c">CLI</button>
  </div>

  <div id="panel-a" class="sz-tab-panel is-active">Overview content.</div>
  <div id="panel-b" class="sz-tab-panel">Details content.</div>
  <div id="panel-c" class="sz-tab-panel">CLI content.</div>
</div>
```

---

### Accordion

```html
<!-- Add data-sz-single to keep only one item open at a time -->
<div class="sz-accordion" data-sz-single>

  <div class="sz-accordion__item is-open">
    <button class="sz-accordion__trigger">What is Silicon Zen?</button>
    <div class="sz-accordion__body">
      A retro-pixel + modern-minimalist UI library. Two themes. Zero dependencies.
    </div>
  </div>

  <div class="sz-accordion__item">
    <button class="sz-accordion__trigger">How do I install it?</button>
    <div class="sz-accordion__body">
      Two files — sz.css and sz.js. See Installation above.
    </div>
  </div>

</div>
```

---

### Animations

Apply these classes directly — no JavaScript needed for the CSS ones:

```html
<!-- Flicker-in on page load (3-frame retro CRT boot) -->
<div class="sz-flicker">Flickers into existence</div>

<!-- Scroll reveal — sz.js adds .is-visible when element enters viewport -->
<div class="sz-reveal">Fades up from below on scroll</div>
<div class="sz-reveal sz-reveal--delay-2">Delayed by 0.2s</div>

<!-- Scanline wipe — clip-path reveal, top to bottom, 16 steps -->
<div class="sz-scanline-in">Wipes in like a CRT screen warming up</div>

<!-- Pulse ring — looping teal glow -->
<div class="sz-pulse">Pulses</div>

<!-- Pixel blink — steps(1), no interpolation -->
<div class="sz-pixel-blink">Blinks</div>

<!-- Glitch text — CSS offset layers, fires every ~2.5s -->
<span class="sz-glitch" data-text="SILICON ZEN">SILICON ZEN</span>

<!-- Pixel typewriter — cycles through words -->
<span
  data-sz-typewriter
  data-sz-tw-words="DEVELOPER.,DESIGNER.,CRAFTSMAN."
  data-sz-tw-speed="100"
></span>

<!-- Trigger flicker on another element via button click -->
<button data-sz-flicker=".my-section">[ Replay ]</button>
```

---

### Navigation

**Floating Dock** — the Silicon Zen default, fixed at the bottom centre:

```html
<nav class="sz-dock">
  <a href="#home"    class="sz-dock__item is-active">HME</a>
  <a href="#work"    class="sz-dock__item">WRK</a>
  <a href="#contact" class="sz-dock__item">MSG</a>
</nav>
```

**Top Bar** — sticky header with teal bottom border:

```html
<nav class="sz-topnav">
  <a class="sz-topnav__logo" href="#"><span>Silicon</span> Zen</a>
  <ul class="sz-topnav__links">
    <li><a href="#home" class="is-active">Home</a></li>
    <li><a href="#work">Work</a></li>
    <li><a href="#contact">Contact</a></li>
  </ul>
  <div class="sz-topnav__actions">
    <button class="sz-btn sz-btn--solid sz-btn--sm">[ Hire Me ]</button>
  </div>
</nav>
```

sz.js automatically tracks scroll position and sets `.is-active` on the matching nav item. No extra code needed.

---

> **See it all in action:** [`demo.html`](./demo.html) is a full portfolio site that uses every component, modifier, and JS method in the library.
>
> **Full API reference:** [`sz-docs.html`](./sz-docs.html) documents every class, data attribute, and JavaScript method with live interactive demos.

---

## Colour Reference

Two themes, one accent palette. The six accent colours never change — only the surfaces invert. This is the connective tissue that makes both themes feel like the same system.

### Shared Accents

These values are constant across Parchment and Obsidian:

| Swatch | Name | Hex | Token | Usage |
|---|---|---|---|---|
| 🟦 | Terminal Teal | `#5BA8A0` | `--sz-teal` | Primary accent. Buttons, links, active states, CLI prompts, progress fills. |
| 🟫 | Teal Dim | `#3D7A74` | `--sz-teal-dim` | Hover + shadow of teal elements. |
| 🟧 | Ghost Amber | `#FFB86C` | `--sz-amber` | Secondary accent. Warnings, highlights, alternate buttons, pixel badges. |
| 🟫 | Amber Dim | `#CC8B3D` | `--sz-amber-dim` | Hover + shadow of amber elements. |
| 🟥 | Signal Red | `#D94F3D` | `--sz-red` | Errors and destructive actions only. Never decorative. |
| 🟩 | Signal Green | `#4FA878` | `--sz-green` | Success and passing states only. Never decorative. |

**Rules:**
- Teal and amber must never appear on the same interactive element.
- Red and green are strictly semantic — never used for decoration or branding.
- One warm accent focal element per viewport. Don't shout.

---

### Parchment — Light Theme

```
data-sz-theme="parchment"
```

| Token | Hex | Usage |
|---|---|---|
| `--sz-bg` | `#F4F4F1` | Page canvas |
| `--sz-bg-alt` | `#EAEAE7` | Alternate section background |
| `--sz-surface` | `#FFFFFF` | Cards, modals |
| `--sz-surface-alt` | `#F0F0ED` | Input fields, code blocks |
| `--sz-border` | `#333333` | Primary 1px borders |
| `--sz-border-dim` | `#888888` | Dimmed / secondary borders |
| `--sz-text` | `#0D0D0D` | Primary text |
| `--sz-text-dim` | `#555555` | Muted / secondary text |

---

### Obsidian — Dark Theme

```
data-sz-theme="obsidian"
```

| Token | Hex | Usage |
|---|---|---|
| `--sz-bg` | `#0D0D0D` | Page canvas |
| `--sz-bg-alt` | `#111111` | Alternate section background |
| `--sz-surface` | `#1A1A1A` | Cards, modals |
| `--sz-surface-alt` | `#222222` | Input fields, hover states |
| `--sz-border` | `#3A3A3A` | Primary 1px borders |
| `--sz-border-dim` | `#2A2A2A` | Dimmed / secondary borders |
| `--sz-text` | `#F4F4F1` | Primary text |
| `--sz-text-dim` | `#888888` | Muted / secondary text |

---

### Overriding Tokens

Every value is a CSS custom property. Override them in your own `:root` to reskin the library without touching any component:

```css
/* Example: swap teal for a purple accent */
:root {
  --sz-teal:     #8B5BA8;
  --sz-teal-dim: #6B4080;
}
```

The override flows through every button, badge, progress bar, and nav item automatically.

---

## Fonts Reference

Silicon Zen uses three font layers. Each has a strict domain.

### Newsreader — Content & Headings
- **Role:** Anything the user *reads*. Headings, body copy, lead paragraphs, long-form prose.
- **Google Fonts:** [`Newsreader`](https://fonts.google.com/specimen/Newsreader)
- **Token:** `--sz-font-serif`
- **Weights used:** 400 (regular), 700 (bold), 400 italic
- **Classes:** `sz-display`, `sz-h1`, `sz-h2`, `sz-body-text`, `sz-lead`
- **Never use for:** Button labels, navigation, badges, code, any UI control.

```css
font-family: "Newsreader", "Source Serif 4", Georgia, serif;
```

---

### JetBrains Mono — UI & Data
- **Role:** Everything machine-facing. Button text, labels, navigation, stats, file paths, code, CLI output, metadata, section eyebrows.
- **Google Fonts:** [`JetBrains Mono`](https://fonts.google.com/specimen/JetBrains+Mono)
- **Token:** `--sz-font-mono`
- **Weights used:** 400 (regular), 500 (medium)
- **Classes:** `sz-label`, `sz-h3`, `sz-mono`, `sz-code`, `sz-btn`, `sz-badge`, all table text
- **Never use for:** Long-form body prose or editorial headings.

```css
font-family: "JetBrains Mono", "Courier New", Courier, monospace;
```

---

### Press Start 2P — Brand & Identity
- **Role:** Pixel font for brand moments only. Logo, hero display text, pixel-style buttons, pixel badges, the `sz-glitch` effect.
- **Google Fonts:** [`Press Start 2P`](https://fonts.google.com/specimen/Press+Start+2P)
- **Token:** `--sz-font-pixel`
- **Classes:** `sz-pixel--hero` (18–32px), `sz-pixel--heading` (14px), `sz-pixel--label` (8px), `sz-btn--pixel`, `sz-badge--pixel`, `sz-glitch`
- **Minimum size:** 8px rendered. Below this it becomes illegible.
- **Never use for:** Body text, navigation links, descriptions, any block longer than ~30 characters.

```css
font-family: "Press Start 2P", monospace;
/* Always pair with: */
letter-spacing: 0.06em;
line-height: 1.8;
```

---

### Complete Import

All three fonts in a single `<link>`:

```html
<link
  href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,700;1,6..72,400&family=JetBrains+Mono:wght@400;500&family=Press+Start+2P&display=swap"
  rel="stylesheet"
>
```

---

## File Structure

```
silicon-zen/
│
├── library/
│   ├── sz.css          ← Component library stylesheet (~18kb)
│   └── sz.js           ← Interactive behaviour plugin (~5kb minified)
│
├── design-iterations/  ← Early explorations and prototypes
│   ├── pragma.html
│   ├── voxel.html
│   ├── szv1.html
│   └── pixel-modernism.html
│
├── inspiration/        ← Reference images from 100r, Uxn, Zen Browser, Sandbox
│
├── demo.html           ← Full sample site using every library feature
├── philosophy.html     ← Design language and component showcase
└── sz-docs.html        ← Interactive documentation with live demos
```

---

## Quick Reference

```
sz-btn                     Base button
sz-btn--solid              Teal fill — primary CTA
sz-btn--amber              Amber variant
sz-btn--ghost              No border, subtle
sz-btn--danger             Red — destructive
sz-btn--pixel              Press Start 2P, hard shadow
sz-btn--sm / --lg          Size modifiers
sz-btn--disabled           Greyed out

sz-badge                   Inline label chip
sz-badge--teal/amber/red/green/outline
sz-badge--pixel            Press Start 2P badge

sz-card                    Container with 1px border
sz-card--window            Traffic-light dot header
sz-card--amber             Amber header variant
sz-card--hover             Lifts on hover

sz-field                   Form field wrapper
sz-input                   Text input / textarea / select
sz-input--error            Red underline state
sz-checkbox                Custom checkbox

sz-progress                Progress bar wrapper
sz-progress--striped       Teal/amber march stripe
sz-progress--pixel         Dashed march fill
sz-progress--thin          4px height
sz-progress--amber         Amber fill

sz-cli                     Terminal block
sz-crt                     CRT screen wrapper

sz-table                   Data table

sz-callout                 Left-border notice
sz-callout--warn           Amber variant
sz-callout--error          Red variant

sz-modal-overlay           Modal backdrop
sz-modal                   Modal container

sz-tabs                    Tab strip
sz-tabs__item              Individual tab
sz-tab-panel               Tab content panel

sz-accordion               Expand/collapse list
sz-accordion__item         Individual row

sz-toast                   Notification (via JS only)

sz-dock                    Fixed bottom nav
sz-topnav                  Sticky top bar

sz-flicker                 3-frame CRT flicker animation
sz-reveal                  Scroll fade-up reveal
sz-scanline-in             Clip-path top-down wipe
sz-pulse                   Looping teal ring
sz-pixel-blink             Steps-based blink
sz-glitch                  CSS glitch text effect

sz-display / sz-h1 / sz-h2 / sz-h3   Type scale
sz-body-text / sz-lead     Prose sizes
sz-label                   Teal mono eyebrow
sz-pixel--hero/heading/label          Pixel font sizes
sz-mono / sz-code          Mono and inline code

sz-container               Centred content wrapper
sz-grid-2 / sz-grid-3 / sz-grid-4    Responsive grid
sz-flex                    Flex row
sz-dither                  Dot-grid background texture
sz-divider                 Horizontal rule
```

---

## Author

**king525dev**

Designed and built Silicon Zen — a design language for the calm internet.

- Demo: [`demo.html`](./demo.html)
- Design philosophy: [`philosophy.html`](./philosophy.html)
- Documentation: [`sz-docs.html`](./sz-docs.html)
- Library: [`library/sz.css`](./library/sz.css) · [`library/sz.js`](./library/sz.js)
- View this page as a [website](./readme.html)

---

*Silicon Zen v1.1.0 · Apply consistently. Break rules deliberately. Never break them lazily.*