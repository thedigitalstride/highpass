# Professional Coaching Website

A modern, mobile-first coaching website with smooth animations, parallax effects, and an elegant testimonial slider. Built with Next.js 16, React 19, and Tailwind CSS v4.

![Next.js](https://img.shields.io/badge/Next.js-16.0.1-black)
![React](https://img.shields.io/badge/React-19.2.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8)

## Features

✨ **Smooth Animations** - Page transitions, scroll reveals, and micro-interactions  
🎯 **Parallax Effects** - Depth and visual interest through layered scrolling  
📱 **Mobile-First Design** - Fully responsive from mobile to desktop  
🎨 **Custom Theme** - Sage green color palette (#9ea39f, #acb1ad)  
🎪 **Testimonial Slider** - Auto-playing carousel with elegant controls  
⚡ **Performance Optimized** - Fast load times and smooth 60fps animations  
♿ **Accessible** - Semantic HTML, ARIA labels, keyboard navigation

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Project Structure

```
app/
├── components/
│   ├── ui/                    # Reusable UI components
│   │   ├── button.tsx         # Lozenge-styled buttons
│   │   ├── card.tsx           # Hover-enabled cards
│   │   └── section-wrapper.tsx # Animated sections
│   ├── navigation.tsx         # Sticky nav with mobile menu
│   ├── hero.tsx              # Hero with parallax
│   ├── features.tsx          # Numbered features grid
│   ├── about.tsx             # Two-column bio section
│   ├── testimonials.tsx      # Auto-playing slider
│   ├── cta-section.tsx       # Contact form
│   ├── footer.tsx            # Footer with links
│   └── page-transition.tsx   # Page animations
├── layout.tsx                # Root layout
├── page.tsx                  # Home page
└── globals.css               # Global styles & theme
```

## Key Technologies

- **Next.js 16** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS v4** - Utility-first styling
- **Framer Motion** - Smooth animations
- **Embla Carousel** - Testimonial slider
- **React Intersection Observer** - Scroll detection

## Customization

### Update Colors
Edit `app/globals.css`:
```css
:root {
  --primary: #9ea39f;    /* Your primary color */
  --secondary: #acb1ad;  /* Your accent color */
}
```

### Add Your Photos
Replace placeholder divs with real images in:
- `app/components/hero.tsx` (coach portrait)
- `app/components/about.tsx` (bio photo)

Use Next.js Image component:
```tsx
import Image from 'next/image';

<Image
  src="/your-photo.jpg"
  alt="Description"
  width={800}
  height={600}
  className="rounded-2xl"
/>
```

### Update Content
- **Hero**: `app/components/hero.tsx`
- **Features**: Modify array in `app/components/features.tsx`
- **Testimonials**: Update array in `app/components/testimonials.tsx`
- **About**: Edit text in `app/components/about.tsx`
- **Contact**: Update info in `app/components/cta-section.tsx`

## Documentation

- **[COACHING_SITE_GUIDE.md](./COACHING_SITE_GUIDE.md)** - Comprehensive technical guide
  - How animations work
  - Component architecture
  - Performance optimizations
  
- **[IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md)** - Build summary
  - What was implemented
  - Technical stack
  - Next steps

## Animation Features

### Page Transitions
Smooth fade + slide animations using Framer Motion's AnimatePresence

### Parallax Scrolling
- Hero background moves at 50% scroll speed
- About section photo has subtle parallax
- Creates depth and visual interest

### Scroll Reveals
- Components fade in and slide up when entering viewport
- Staggered animations for features
- Smooth easing curves

### Testimonial Slider
- Auto-play (5-second intervals)
- Pause on hover
- Arrow navigation
- Dot indicators
- Smooth transitions

### Hover Effects
- Button scale + shadow increase
- Underline expansion from left
- Card lift effects
- Color transitions

## Browser Support

✓ Chrome (latest)  
✓ Firefox (latest)  
✓ Safari (latest)  
✓ Edge (latest)  
✓ Mobile browsers

## Performance

- Fast initial load with minimal JavaScript
- Hardware-accelerated animations
- Lazy loading images
- Efficient scroll detection
- Mobile-optimized

## Deploy on Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Push your code to GitHub
2. Import project to Vercel
3. Deploy automatically

## License

MIT

## Credits

Design inspired by [Custo.io](https://custo.io)  
Built with ❤️ using Next.js and Tailwind CSS
