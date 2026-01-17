# Project Blueprint: SHM Master

## Overview
SHM Master is an interactive, high-fidelity physics simulation designed to help students and enthusiasts understand **Simple Harmonic Motion (SHM)**. It features real-time visualization of position, velocity, and acceleration using canvas-based animations and graphs, with a premium dark-mode aesthetic.

## Current Project State & Features
- **Core Simulation**: 1D spring-mass system with adjustable mass (m), spring constant (k), initial position (x₀), and initial velocity (v₀).
- **Visualization**: 
  - Dynamic canvas animation of the oscillator.
  - Real-time plotting of positional, velocity, and acceleration waveforms.
- **Dashboard**: Real-time calculation of Period (T), Angular Frequency (ω), Total Energy (E), and Amplitude (A).
- **Internationalization (i18n)**:
  - Dual-language support (Korean and English).
  - Language switcher (KO/EN buttons).
  - Browser language detection for initial state.
  - Dynamically updated Document Title and Meta Description for SEO.
- **Privacy & Terms**: Fully localized policy pages in `public/`.
- **SEO/GEO Optimization**:
  - `hreflang` tags for multi-language indexing.
  - Structured Data (JSON-LD) for WebApplication and FAQ.
- **Tech Stack**: HTML5, Vanilla CSS (Variables, Grid, Flexbox), React (Babel Standalone), MathJax (LaTeX).

## Development History
### Phase 1: Core Implementation
- Initial setup of the physics engine and canvas drawing.
- Parameter adjustment sliders and dashboard.
### Phase 2: Design & Premium UI
- Implemented sleek dark-mode design with vibrant accents (Inter font, smooth gradients).
- Added contact form with Formspree integration.
### Phase 3: Global Localization (Current)
- Refactored UI to use a React-based translation system.
- Added comprehensive English content for theory and user guides.
- Implemented language detection and dynamic SEO meta tag updates.
- Localized Privacy and Terms pages.

## Current Task: Global Localization Completion
- [x] Create `translations` object with full KO/EN support.
- [x] Implement Language Switcher component in Header.
- [x] Localize all UI strings including graph labels.
- [x] Update Document Title and Meta Description dynamically on lang change.
- [x] Implement browser language detection.
- [x] Localize Privacy Policy and Terms of Service.
- [x] Verify SEO/GEO tags (hreflang, canonical).
