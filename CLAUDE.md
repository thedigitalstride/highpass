# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a modern, mobile-first professional coaching website built with Next.js 16, React 19, and Tailwind CSS v4. The site features smooth animations, parallax effects, and an auto-playing testimonial slider, inspired by the Custo.io design framework.

## Common Commands

### Development
```bash
pnpm install         # Install dependencies (this project uses pnpm)
pnpm dev             # Start development server at http://localhost:3000
pnpm build           # Build for production
pnpm start           # Start production server
pnpm lint            # Run ESLint on codebase
```

### Database
This project includes MongoDB integration configured for Vercel deployment:
- Connection client is in `lib/mongodb.ts`
- Requires `MONGODB_URI` environment variable in `.env.local`
- Uses Vercel's database pool attachment in production

## Architecture

### Component Structure

The app follows Next.js 16 App Router conventions with a clear component hierarchy:

**Page Composition** (`app/page.tsx`):
- Single-page layout composed of section components
- Navigation is separate and rendered in each section's header
- Sections render in sequence: Hero → Features → About → Testimonials → CTA → Footer

**Animation System**:
- **Page transitions**: Managed by `PageTransition` wrapper in `app/layout.tsx` using Framer Motion's AnimatePresence
- **Smooth scrolling**: Provided by `SmoothScrollProvider` using Lenis library for hardware-accelerated smooth scroll
- **Parallax effects**: Components use `useScroll` + `useTransform` from Framer Motion to create depth
- **Scroll reveals**: Individual sections use `react-intersection-observer` to trigger entrance animations

**Component Categories**:

1. **UI Primitives** (`app/components/ui/`):
   - `button.tsx` - Lozenge-styled buttons with variants (primary/secondary) and sizes
   - `card.tsx` - Cards with hover lift effects
   - `section-wrapper.tsx` - Wrapper that provides consistent scroll-triggered animations and section styling

2. **Layout Components**:
   - `navigation.tsx` - Sticky header with mobile hamburger menu, scroll-based opacity
   - `page-transition.tsx` - Page fade + slide animation wrapper
   - `smooth-scroll-provider.tsx` - Lenis smooth scroll initialization
   - `footer.tsx` - Multi-column footer with links and contact info

3. **Content Sections**:
   - `hero.tsx` - Full-screen hero with parallax background (50% scroll speed)
   - `features.tsx` - Numbered grid (01-04) with staggered reveal animations
   - `about.tsx` - Two-column bio with parallax photo, stats badge, and credentials
   - `testimonials.tsx` - Auto-playing carousel (Embla) with arrow/dot navigation, pause on hover
   - `cta-section.tsx` - Contact form with glass-morphism styling

### Styling System

**Tailwind CSS v4 Configuration** (`app/globals.css`):
- Uses new `@theme inline` directive for Tailwind v4
- CSS custom properties for colors: `--primary: #9ea39f` (sage green), `--secondary: #acb1ad`
- Theme tokens mapped to Tailwind utilities (e.g., `bg-primary`, `text-secondary`)
- Lenis smooth scroll styles integrated

**Path Aliases** (`tsconfig.json`):
- `@/*` maps to root directory (e.g., `@/lib/mongodb`)

### Animation Implementation Details

**Parallax Pattern**:
```tsx
const { scrollYProgress } = useScroll({
  target: ref,
  offset: ['start start', 'end start']
});
const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
```
Different scroll speeds create depth illusion. Used in Hero (background) and About (photo).

**Testimonial Slider**:
- Embla Carousel for core sliding logic
- Auto-play interval (5s) with pause on hover
- React state tracks current slide for dot indicators and counter
- Arrow buttons use `scrollPrev()`/`scrollNext()` API

**Staggered Animations**:
Features section implements cascading reveals with 0.2s delay increments per item, creating a "wave" effect.

## Key Concepts

### Mobile-First Responsive Design
All components are built mobile-first with Tailwind breakpoints:
- Base: Mobile (<768px)
- `md:` Tablet (768px+)
- `lg:` Desktop (1024px+)
- `xl:` Large desktop (1280px+)

### Performance Optimizations
- Intersection Observer for efficient scroll detection (not scroll events)
- Hardware-accelerated CSS transforms (`transform`, `opacity`)
- Lazy loading images as they enter viewport
- Global singleton pattern for MongoDB client with HMR preservation

### Content Customization
All sections use placeholder content stored in component arrays:
- Features: `features` array in `features.tsx`
- Testimonials: `testimonials` array in `testimonials.tsx`
- Photos: Currently SVG placeholders, intended to be replaced with Next.js `<Image>` components

## Important Notes

- **Package Manager**: Use `npm` for consistency (project uses npm scripts despite presence of `pnpm-lock.yaml`)
- **Animation Dependencies**: Framer Motion, Embla Carousel, and Lenis are critical - don't remove
- **MongoDB**: Optional feature, site functions without database connection
- **TypeScript**: Strict mode enabled - all components are typed
- **Tailwind v4**: Uses new configuration format with `@theme inline` directive

## Documentation

- `README.md` - Quick start guide and feature overview
- `COACHING_SITE_GUIDE.md` - Comprehensive technical documentation on animations, customization, and architecture
- `IMPLEMENTATION_SUMMARY.md` - Build summary, what was implemented, and next steps
