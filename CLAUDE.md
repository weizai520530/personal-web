# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Serving Locally

No build step. Open `docs/index.html` directly in a browser, or use any static file server:

```bash
cd docs && python3 -m http.server 8080
# then visit http://localhost:8080
```

## Deployment

GitHub Pages serves the `docs/` folder from the `master` branch. Pushing to `master` deploys automatically to `boweiliu.net` (CNAME).

## Architecture

This is a static personal site — no framework, no bundler, no package manager.

### File layout

```
docs/
  index.html        # main page (English) — all page-specific CSS is inline here
  zh-cn.html        # Chinese-language variant
  assets/images/    # photography assets
  pse/              # third-party Page Scroll Effects library (CodyHouse / Velocity.js)
    css/style.css   # pre-compiled output — edit this if you need to change PSE styles
    scss/           # SCSS source for the PSE library (Bourbon-based, no compiler set up)
    js/main.js      # scroll animation controller (jQuery)
    js/velocity.*   # Velocity.js animation engine
```

### CSS layering

Styles are applied in this order (later wins):

1. `pse/css/reset.css` — box-model reset
2. `pse/css/style.css` — PSE library base styles; desktop breakpoint is **1050px** here
3. Inline `<style>` in `index.html` — all site-specific styles; background-image breakpoint is **1080px** here

All page-level style work happens in the inline `<style>` block. Do not edit `pse/css/style.css` for page-level concerns — it is a library file.

The SCSS source in `pse/scss/` and `pse/partials/` is not part of the active workflow (no compiler is configured); `pse/css/style.css` is the authoritative CSS for the PSE library.

### JavaScript

- `pse/js/main.js` — reads `data-hijacking` and `data-animation` attributes from `<body>` to configure scroll behaviour. Targets `.cd-section` elements. Currently `<body data-hijacking="off" data-animation="fixed">` — hijacking disabled, fixed animation style active.
- jQuery is loaded twice (CDN at top of `<head>`, local copy at bottom of `<body>`). The bottom copy is what `main.js` uses.
- Velocity.js and its UI pack handle all section transition animations.
- `pse/js/modernizr.js` is used only for the MQ detection trick: `body::before { content: 'mobile'/'desktop' }` is read by `deviceType()` in `main.js` to switch between mobile and desktop event bindings.

### Welcome overlay

`#welcome-overlay` in `index.html` is a full-screen CSS-animated overlay:

- A one-liner in `<head>` sets `data-wo-skip='1'` on `<html>` if `sessionStorage.wo_seen` is set, which a CSS rule uses to `display: none` the overlay instantly before first paint — preventing flash on repeat visits.
- The CSS auto-triggers `wo-fade-out` at 2.4 s delay.
- JS in the closing `<body>` listens for `animationend` (filtered to `wo-fade-out`) to remove the element and write `sessionStorage.wo_seen`.
- The Skip button calls `dismiss(true)` which overrides the animation with a shorter 0.45 s version.

### Liquid text effect

All main-page text (`title`, `basic-intro-p`, nav links) uses `background-clip: text` with `-webkit-text-fill-color: transparent` to apply gradient fills. The title additionally runs a `liquidSheen` keyframe (`background-position` sweep on a 300%-wide gradient) continuously after the slide-in animation completes. Inline `style="color: white"` on nav `<a>` tags does **not** block this — `-webkit-text-fill-color` is a different property.

### Centering

The `.hero` wrapper (`height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center`) vertically and horizontally centres the title and subtitle in the viewport. `.animation-box-title` inside it has `overflow: hidden` and `position: relative` so the title (`position: relative; top: 0`) slides in from `top: -4rem` (clipped) to `top: 0` (visible) via the `titleSlideIn` keyframe.
