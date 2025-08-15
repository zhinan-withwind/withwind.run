# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal website for "WithWind" (随风), built as a static HTML/CSS/JavaScript site with bilingual support (Chinese/English) and a comprehensive I Ching (Zhouyi) knowledge system. The project uses vanilla web technologies with Tailwind CSS for styling and features a component-based architecture.

## Development Commands

Since this is a static site with no build process:

- **Development**: Open HTML files directly in a browser
- **Testing**: Test in browser across different devices and screen sizes
- **Deployment**: Copy files to web server or static hosting service

## Architecture Overview

### Core Structure
- **Static Site**: No build tools or bundling - direct HTML/CSS/JS files
- **Component System**: JavaScript-based dynamic component loading (header/footer)
- **Bilingual Support**: Complete Chinese/English translation system with URL persistence
- **Responsive Design**: Mobile-first approach using Tailwind CSS

### Key Directories
- `/html/` - Main website content
  - `index.html` - Landing page with hero, about, tags, contact sections
  - `experience.html` - Professional timeline
  - `/components/` - Reusable HTML components
  - `/js/` - JavaScript modules (common.js, navigation.js, translations.js)
  - `/css/` - Global styles and responsive design
  - `/zhouyi/` - I Ching knowledge portal with individual concept pages
  - `/zhouyi-mine/` - Alternative I Ching implementation

### JavaScript Architecture
- **Common Class** (`js/common.js`): Handles component loading and shared functionality
- **Navigation Class** (`js/navigation.js`): Manages language switching and navigation
- **Translation System** (`js/translations.js`): Bilingual content management
- **Component Loading**: Dynamic injection of header/footer via JavaScript

### Bilingual System
- URL parameter-based language persistence (`?lang=en`)
- Dynamic content switching with smooth transitions
- Mobile-responsive language toggle
- Complete translation coverage across all pages

### I Ching Knowledge System
- Comprehensive coverage from Wuji (无极) to 64 hexagrams
- Individual pages for each concept (0.html through 64.html)
- Visual symbolism integration (Hetu, Luoshu, Pangu diagrams)
- Educational content structure with progressive complexity

## Key Features

1. **Dynamic Component Loading**: JavaScript-powered header/footer injection
2. **Language Persistence**: URL parameter-based language selection with fallbacks
3. **Responsive Navigation**: Desktop horizontal menu, mobile hamburger menu
4. **Smooth Animations**: Intersection Observer for scroll-triggered reveals
5. **Modular Content**: Component-based architecture for maintainability

## Development Notes

- No package.json or build configuration - direct file editing
- Uses CDN dependencies (Tailwind CSS, Font Awesome)
- Cross-browser compatibility required
- Mobile-first responsive design approach
- No backend integration - pure frontend implementation

## Content Management

- Personal branding: Programmer, I Ching Researcher, Gourmet
- Professional experience timeline with 40+ years in tech
- I Ching educational content with visual symbolism
- Bilingual content requires updates in both languages