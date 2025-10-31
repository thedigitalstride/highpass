'use client';

import { useEffect, useRef, createContext, useContext, ReactNode, useState } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

// Extend Window interface to include lenis property
declare global {
  interface Window {
    lenis?: Lenis;
  }
}

// Create context for Lenis instance
const LenisContext = createContext<Lenis | null>(null);

export default function SmoothScrollProvider({
  children,
}: {
  children: ReactNode;
}) {
  // Lazy initialize Lenis instance
  const [lenis] = useState<Lenis | null>(() => {
    if (typeof window === 'undefined') return null;

    return new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });
  });

  const rafRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (!lenis) return;

    // Ensure page starts at top before initializing Lenis
    window.scrollTo(0, 0);

    // Make lenis available globally for debugging
    window.lenis = lenis;

    // Immediately set scroll to 0 after Lenis takes control
    requestAnimationFrame(() => {
      lenis.scrollTo(0, { immediate: true, force: true });
    });

    // Request animation frame function
    function raf(time: number) {
      if (!lenis) return;
      lenis.raf(time);
      rafRef.current = requestAnimationFrame(raf);
    }

    rafRef.current = requestAnimationFrame(raf);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      lenis.destroy();
      delete window.lenis;
    };
  }, [lenis]);

  return (
    <LenisContext.Provider value={lenis}>
      {children}
    </LenisContext.Provider>
  );
}

// Hook to access Lenis instance
export function useLenis() {
  return useContext(LenisContext);
}

// Hook to scroll to element
export function useLenisScroll() {
  return (target: string, options?: { offset?: number; duration?: number }) => {
    if (target === '#home' || target === '#') {
      // Scroll to top
      if (typeof window !== 'undefined' && window.lenis) {
        window.lenis.scrollTo(0, {
          duration: options?.duration || 1.2,
        });
      }
      return;
    }

    const element = document.querySelector(target);
    if (element && typeof window !== 'undefined' && window.lenis) {
      if (element instanceof HTMLElement) {
        window.lenis.scrollTo(element, {
          offset: options?.offset || -80,
          duration: options?.duration || 1.2,
        });
      }
    }
  };
}

