'use client';

import { useEffect, useRef, createContext, useContext, ReactNode } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

// Create context for Lenis instance
const LenisContext = createContext<Lenis | null>(null);

export default function SmoothScrollProvider({
  children,
}: {
  children: ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Ensure page starts at top before initializing Lenis
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }

    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;

    // Make lenis available globally for debugging
    if (typeof window !== 'undefined') {
      (window as any).lenis = lenis;
      
      // Immediately set scroll to 0 after Lenis takes control
      requestAnimationFrame(() => {
        lenis.scrollTo(0, { immediate: true, force: true });
      });
    }

    // Request animation frame function
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Cleanup
    return () => {
      lenis.destroy();
      if (typeof window !== 'undefined') {
        delete (window as any).lenis;
      }
    };
  }, []);

  return (
    <LenisContext.Provider value={lenisRef.current}>
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
  const lenis = useLenis();
  
  return (target: string, options?: { offset?: number; duration?: number }) => {
    if (target === '#home' || target === '#') {
      // Scroll to top
      if (typeof window !== 'undefined') {
        const lenisInstance = (window as any).lenis as Lenis | undefined;
        if (lenisInstance) {
          lenisInstance.scrollTo(0, {
            duration: options?.duration || 1.2,
          });
        }
      }
      return;
    }

    const element = document.querySelector(target);
    if (element && typeof window !== 'undefined') {
      const lenisInstance = (window as any).lenis as Lenis | undefined;
      if (lenisInstance && element instanceof HTMLElement) {
        lenisInstance.scrollTo(element, {
          offset: options?.offset || -80,
          duration: options?.duration || 1.2,
        });
      }
    }
  };
}

