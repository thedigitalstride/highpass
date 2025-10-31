'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, animate } from 'framer-motion';
import Image from 'next/image';

interface FlickerCarouselProps {
  images: {
    src: string;
    alt: string;
    width: number;
    height: number;
  }[];
}

export default function FlickerCarousel({ images }: FlickerCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const viewportRef = useRef<HTMLDivElement>(null);
  const [containerPadding, setContainerPadding] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(0);
  const [slideWidth, setSlideWidth] = useState(400);
  const x = useMotionValue(0);
  const gap = 24;

  // Calculate slide width and container padding for alignment
  useEffect(() => {
    const updateSizes = () => {
      const viewportW = window.innerWidth;

      // Calculate container padding to match .container CSS exactly
      let padding: number;
      let maxWidth: number | null = null;

      if (viewportW >= 1536) { // 2xl
        maxWidth = 1536;
        padding = 16; // 1rem (note: padding doesn't change at 2xl)
      } else if (viewportW >= 1280) { // xl
        maxWidth = 1280;
        padding = 32; // 2rem
      } else if (viewportW >= 1024) { // lg
        maxWidth = 1024;
        padding = 32; // 2rem
      } else if (viewportW >= 768) { // md
        maxWidth = 768;
        padding = 24; // 1.5rem (inherited from sm)
      } else if (viewportW >= 640) { // sm
        maxWidth = 640;
        padding = 24; // 1.5rem
      } else { // mobile (< 640px)
        maxWidth = null; // No max-width on mobile
        padding = 16; // 1rem
      }

      // Calculate actual container padding
      // If viewport is wider than max-width, container is centered with auto margins
      const actualPadding = maxWidth && viewportW > maxWidth
        ? (viewportW - maxWidth) / 2 + padding  // centered container: margin + padding
        : padding; // full-width container: just padding

      setContainerPadding(actualPadding);
      setViewportWidth(viewportW);

      // Calculate slide width based on viewport width
      // Must subtract padding from BOTH sides to get available container width
      let calculatedWidth: number;
      if (viewportW < 768) {
        // Mobile: show 1.5 slides
        calculatedWidth = (viewportW - (actualPadding * 2) - (gap * 0.5)) / 1.5;
      } else {
        // Desktop/Tablet: show 2.5 slides
        calculatedWidth = (viewportW - (actualPadding * 2) - (gap * 1.5)) / 2.5;
      }
      setSlideWidth(calculatedWidth);
    };

    updateSizes();
    window.addEventListener('resize', updateSizes);
    return () => window.removeEventListener('resize', updateSizes);
  }, [gap]);

  const slideWidthWithGap = slideWidth + gap;

  // Calculate max scroll so last image stops at container's right edge
  // Subtract padding from BOTH sides to get true container width
  const totalWidth = (slideWidth * images.length) + (gap * (images.length - 1));
  const visibleWidth = viewportWidth - (containerPadding * 2);
  const maxScroll = Math.max(0, totalWidth - visibleWidth);

  // Handle drag end
  const handleDragEnd = (_event: unknown, info: { velocity: { x: number }; offset: { x: number } }) => {
    const velocity = info.velocity.x;
    const offset = info.offset.x;
    
    let newIndex = currentIndex;
    
    if (Math.abs(velocity) > 200) {
      const velocityFactor = Math.abs(velocity) / 1000;
      const slidesToMove = Math.max(1, Math.floor(velocityFactor));
      newIndex = velocity > 0 
        ? Math.max(0, currentIndex - slidesToMove) 
        : Math.min(images.length - 1, currentIndex + slidesToMove);
    } else if (Math.abs(offset) > 50) {
      newIndex = offset > 0 
        ? Math.max(0, currentIndex - 1) 
        : Math.min(images.length - 1, currentIndex + 1);
    }
    
    let targetScroll = newIndex * slideWidthWithGap;
    if (newIndex >= images.length - 1) {
      targetScroll = maxScroll;
    } else {
      targetScroll = Math.max(0, Math.min(maxScroll, targetScroll));
    }
    
    animate(x, -targetScroll, {
      type: "spring",
      stiffness: 200,
      damping: 40,
    });
    
    setCurrentIndex(newIndex);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' && currentIndex > 0) {
        const newIndex = currentIndex - 1;
        let targetScroll = newIndex * slideWidthWithGap;
        if (newIndex >= images.length - 1) {
          targetScroll = maxScroll;
        } else {
          targetScroll = Math.min(maxScroll, targetScroll);
        }
        setCurrentIndex(newIndex);
        animate(x, -targetScroll, {
          type: "spring",
          stiffness: 200,
          damping: 40,
        });
      } else if (e.key === 'ArrowRight' && currentIndex < images.length - 1) {
        const newIndex = currentIndex + 1;
        let targetScroll = newIndex * slideWidthWithGap;
        if (newIndex >= images.length - 1) {
          targetScroll = maxScroll;
        } else {
          targetScroll = Math.min(maxScroll, targetScroll);
        }
        setCurrentIndex(newIndex);
        animate(x, -targetScroll, {
          type: "spring",
          stiffness: 200,
          damping: 40,
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, images.length, slideWidthWithGap, maxScroll, x]);

  // Update position when index changes
  useEffect(() => {
    let targetScroll = currentIndex * slideWidthWithGap;
    if (currentIndex >= images.length - 1) {
      targetScroll = maxScroll;
    } else {
      targetScroll = Math.min(maxScroll, targetScroll);
    }
    animate(x, -targetScroll, {
      type: "spring",
      stiffness: 200,
      damping: 40,
    });
  }, [currentIndex, images.length, maxScroll, slideWidthWithGap, x]);

  const dragConstraints = {
    left: -maxScroll,
    right: 0,
  };

  return (
    <div className="relative w-screen">
      <div
        ref={viewportRef}
        className="relative w-full overflow-hidden cursor-grab active:cursor-grabbing"
        style={{
          paddingLeft: `${containerPadding}px`,
        }}
        role="region"
        aria-label="Image carousel"
        tabIndex={0}
      >
        <motion.div
          className="flex"
          style={{
            x,
            gap: `${gap}px`,
          }}
          drag="x"
          dragConstraints={dragConstraints}
          dragElastic={0.02}
          dragMomentum={false}
          dragTransition={{ bounceStiffness: 400, bounceDamping: 40, power: 0.1 }}
          onDragEnd={handleDragEnd}
          whileTap={{ cursor: "grabbing" }}
        >
        {images.map((image, index) => (
          <motion.div
            key={index}
            className="shrink-0 select-none"
            style={{
              width: `${slideWidth}px`,
            }}
          >
            <div className="relative w-full aspect-4/3 rounded-2xl overflow-hidden bg-gray-100">
              <Image
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                className="object-cover w-full h-full pointer-events-none"
                priority={index < 3}
                draggable={false}
              />
            </div>
          </motion.div>
        ))}
      </motion.div>
      </div>

      {/* Progress indicator */}
      {images.length > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                let targetScroll = index * slideWidthWithGap;
                if (index >= images.length - 1) {
                  targetScroll = maxScroll;
                } else {
                  targetScroll = Math.min(maxScroll, targetScroll);
                }
                setCurrentIndex(index);
                animate(x, -targetScroll, {
                  type: "spring",
                  stiffness: 200,
                  damping: 40,
                });
              }}
              className={`transition-all duration-300 rounded-full ${
                index === currentIndex
                  ? 'w-8 h-2 bg-secondary'
                  : 'w-2 h-2 bg-secondary/30 hover:bg-secondary/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
