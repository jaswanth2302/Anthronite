# Anthronite Systems - Landing Page

A high-end "Obsidian" experience landing page for Anthronite Systems research lab and engineering firm. Rivals Apple/Google flagship pages with zero-jitter, absolute minimalism, and tactile 3D physics.

## Features

### **Core Experience**
- **Zero-jitter physics**: Spring-based animations (damping: 30) for 60/120fps on ProMotion displays
- **Lenis smooth scroll**: Silk-smooth scrolling with custom easing
- **Tactile 3D interactions**: Mouse-follow tilt effects with gravity-lag physics
- **OLED-grade design**: Pure black (#000000) background with 3% noise grain overlay
- **Fully responsive**: Mobile-optimized with auto-float animations

### **Advanced Features**
- **Global Twinkling Starfield**: 85 stars with multi-layered parallax (0.05x/0.12x scroll speed)
- **Bi-directional animations**: Elements re-reveal on scroll back with elegant exit transitions
- **Sequential orchestration**: Phased loading (Starfield → Sculpture → Text → Navigation)
- **Mega-menu**: Google Antigravity-style dropdown with micro-interactions
- **Chrome luster gradients**: 4-stop premium silver gradients on all text
- **Radial backlights**: Subtle cosmic glow behind sculptures

## Tech Stack

- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion** (3D physics, orchestration, bi-directional animations)
- **Lenis** (Smooth scroll)
- **Canvas API** (Starfield rendering)
- **Lucide React** (Icons)

## Setup

1. Install dependencies:
```bash
npm install
```

2. Add required assets to `/public`:
   - `women.png` (The Architect angel figure) ✅ Added
   - `falling man.png` (The Falling Man figure) ✅ Added
   - `anthronite logo no bg.png` (Anthronite logo) ✅ Added

3. Add font files to `/app/fonts` (optional - Inter is used as fallback):
   - `GoogleSans-Medium.woff2` (For navigation links)

## Font Sources

- **Google Sans Display**: Download from [Google Fonts](https://fonts.google.com/specimen/Google+Sans) (navigation only)
- **Inter**: Automatically loaded via next/font/google (main typography)
- **Note**: Inter font is currently used as a high-quality fallback for Geist Sans

## Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Design System

### **Background**
- Pure black (#000000) with 3% noise grain overlay
- Global twinkling starfield (85 stars, Canvas-based)
- Radial gradient backlights behind sculptures

### **Typography**
- **Headlines**: Inter (Geist Sans alternative) - Bold, `leading-[1.1]`, `letter-spacing: -0.05em`
- **Navigation**: Google Sans Display (fallback: Inter) - Medium (500), `letter-spacing: -0.01em`
- **Taglines**: Inter Light - Uppercase, `letter-spacing: 0.4em`

### **Colors**
- **Chrome gradient (Headlines)**: `linear-gradient(135deg, #EDEDED 0%, #A1A1A1 50%, #EDEDED 100%)`
- **Chrome luster (Nav)**: `linear-gradient(180deg, #FFFFFF 20%, #A1A1A1 48%, #646464 52%, #B1B1B1 100%)`
- **Accents**: Obsidian Green (#1a3a2e, 10% opacity max)

### **Animations**
- **Sequential orchestration**: Starfield (0ms) → Sculpture (200ms) → Text (400ms) → Nav (600ms)
- **Bi-directional**: All elements re-reveal on scroll back with `viewport={{ amount: 0.2, once: false }}`
- **Exit transitions**: Text slides left, images scale down (0.95)
- **Spring physics**: `damping: 30` for Apple-level smoothness

### **Interactions**
- **3D Tilt**: Architect follows mouse with spring (stiffness: 150, damping: 20)
- **Gravity-lag**: Falling Man with heavier spring (stiffness: 80, damping: 25, mass: 1.5)
- **Mega-menu**: Resources dropdown with micro-interactions (arrow slide 4px on hover)
- **Navigation hide**: Hides on scroll down, snaps back on scroll up (stiffness: 300, damping: 30)

## Performance

- **60/120fps**: Locked frame rate via requestAnimationFrame
- **GPU acceleration**: All animations use `will-change: transform, opacity`
- **Zero layout thrashing**: Only transform/opacity properties animated
- **Canvas optimization**: Viewport culling for off-screen stars
- **Multi-layered parallax**: Far stars (0.05x), near stars (0.12x) for 3D depth
