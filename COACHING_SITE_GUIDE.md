# Coaching Site - Technical Guide

## Overview
This is a modern, mobile-first coaching website inspired by the Custo.io design, featuring smooth animations, parallax effects, and an elegant testimonial slider.

## Color Scheme
- **Primary Background**: `#9ea39f` - Sage green for main sections
- **Secondary Background**: `white` - Alternating sections
- **Accent Color**: `#acb1ad` - Used for buttons, highlights, and interactive elements

## Key Features

### 1. Page Transitions
**How it works:**
- Uses `framer-motion`'s `AnimatePresence` component
- Wraps page content in the `PageTransition` component
- Creates smooth fade + slide animations on page load/navigation
- Easing curve: `[0.43, 0.13, 0.23, 0.96]` for natural motion

**Implementation:**
```tsx
<PageTransition>
  {children}
</PageTransition>
```

### 2. Parallax Effects
**Hero Section:**
- Tracks scroll position using `useScroll` hook from framer-motion
- Background moves at 50% speed of scroll (`useTransform`)
- Creates depth and visual interest

**About Section:**
- Coach photo has subtle parallax movement
- Moves 20% up/down relative to scroll position
- Enhances the premium feel

**How it works:**
```tsx
const { scrollYProgress } = useScroll({
  target: ref,
  offset: ['start start', 'end start']
});
const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
```

### 3. Scroll Animations
**Intersection Observer:**
- Components fade in and slide up when they enter viewport
- Uses `react-intersection-observer` for performance
- `triggerOnce: true` ensures animation only happens once
- Staggered delays create cascading effect

**Features Section:**
- Each item has a 0.2s delay increment
- Creates a wave of content appearing

### 4. Testimonial Slider (Exact Custo Design)
**Features:**
- Auto-play carousel (5-second intervals)
- Pauses on hover for user interaction
- Left/right arrow navigation
- Dot indicators showing current position
- Smooth slide transitions using Embla Carousel
- Counter display (e.g., "1 — 3")

**How it works:**
- `embla-carousel-react` for core functionality
- State management for selected index
- Event listeners for carousel updates
- CSS transitions for smooth visual changes

### 5. Navigation
**Desktop:**
- Sticky header that becomes opaque on scroll
- Underline hover effects using pseudo-elements
- Smooth color transitions

**Mobile:**
- Hamburger menu with animated icon
- Slide-down menu panel
- Closes when link is clicked

**Underline Effect:**
```css
.group-hover:w-full /* Expands from 0 to full width */
transition: all 300ms
origin-left /* Starts from left side */
```

### 6. Button Interactions
**Lozenge Style:**
- Fully rounded corners (`rounded-full`)
- Scale transform on hover (1.05x)
- Shadow increase for depth
- Color shifts for feedback

**Effects:**
- `hover:scale-105` - Gentle grow
- `hover:shadow-lg` - Depth increase
- `transition-all duration-300` - Smooth animation

### 7. Form Interactions
**Contact Form:**
- Glass-morphism inputs (semi-transparent with backdrop blur)
- Border highlights on focus
- Success message animation
- Accessible labels and validation

## Grid System
**Mobile-First Approach:**
- Base: Single column, stacked layout
- Tablet (768px+): 2-column grids
- Desktop (1024px+): Full multi-column layouts

**Container Widths:**
- Small: 640px
- Medium: 768px
- Large: 1024px
- XL: 1280px
- 2XL: 1536px

## Component Architecture

### Modular Structure
```
app/
├── components/
│   ├── ui/               # Reusable primitives
│   │   ├── button.tsx    # Lozenge-styled button
│   │   ├── card.tsx      # Card with hover effects
│   │   └── section-wrapper.tsx  # Animated section container
│   ├── navigation.tsx    # Sticky nav with mobile menu
│   ├── hero.tsx          # Hero with parallax
│   ├── features.tsx      # Numbered steps grid
│   ├── testimonials.tsx  # Carousel slider
│   ├── about.tsx         # Two-column bio section
│   ├── cta-section.tsx   # Contact form
│   ├── footer.tsx        # Footer links
│   └── page-transition.tsx  # Page animation wrapper
```

### SectionWrapper Component
Provides consistent:
- Scroll-triggered animations
- Background color management
- Vertical spacing (padding)
- Container constraints

## Animation Timing

**Page Load:**
- Hero content: Staggered 0.2s, 0.4s, 0.6s, 0.8s delays
- Creates orchestrated reveal

**Scroll Triggers:**
- Base duration: 0.6s
- Stagger delay: 0.2s per item
- Easing: easeOut for natural deceleration

**Interactions:**
- Hover transitions: 300ms
- Button scale: 200ms
- Underline expansion: 300ms

## Performance Optimizations

1. **Lazy Loading**: Images load as they enter viewport
2. **Intersection Observer**: Efficient scroll detection
3. **CSS Transitions**: Hardware-accelerated transforms
4. **Framer Motion**: Optimized animation library
5. **Mobile-First CSS**: Smallest payload for mobile devices

## Responsive Breakpoints

```css
/* Mobile: default */
/* Tablet: 768px (md:) */
/* Desktop: 1024px (lg:) */
/* Large Desktop: 1280px (xl:) */
```

## Typography
- **Headings**: Geist Sans, bold weights
- **Body**: Geist Sans, regular weight
- **Scale**: Responsive (mobile: smaller, desktop: larger)

## Accessibility
- Semantic HTML elements
- ARIA labels on interactive elements
- Keyboard navigation support
- Focus indicators
- Alt text placeholders for images

## Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Graceful degradation for older browsers

## Dependencies
- **next**: 16.0.1 - React framework
- **react**: 19.2.0 - UI library
- **framer-motion**: Page transitions & animations
- **embla-carousel-react**: Testimonial slider
- **react-intersection-observer**: Scroll detection
- **tailwindcss**: 4.0 - Utility-first CSS

## Development Commands
```bash
npm run dev    # Start development server
npm run build  # Build for production
npm run start  # Start production server
npm run lint   # Run ESLint
```

## Customization Guide

### Change Colors
Edit `app/globals.css`:
```css
:root {
  --primary: #9ea39f;    /* Your primary color */
  --secondary: #acb1ad;  /* Your accent color */
}
```

### Update Content
- **Hero**: Edit `app/components/hero.tsx`
- **Features**: Modify `features` array in `app/components/features.tsx`
- **Testimonials**: Update `testimonials` array in `app/components/testimonials.tsx`
- **About**: Edit text in `app/components/about.tsx`

### Add Photos
Replace placeholder divs with `<Image>` components:
```tsx
import Image from 'next/image';

<Image
  src="/path-to-image.jpg"
  alt="Description"
  width={800}
  height={600}
  className="rounded-2xl"
/>
```

## Animation Explanations Summary

1. **Page Transitions**: Fade + vertical slide using AnimatePresence
2. **Parallax**: Different scroll speeds for depth (useScroll + useTransform)
3. **Scroll Reveals**: Intersection Observer triggers fade-in + slide-up
4. **Hover Effects**: Scale transforms + shadow increases
5. **Underline**: Width expansion from left using scaleX transform
6. **Carousel**: Embla handles slides, React manages state/controls

This creates a polished, professional experience that feels modern and engaging while maintaining excellent performance.

