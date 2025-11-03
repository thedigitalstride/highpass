'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import Button from './ui/button';
import { useLenisScroll } from './smooth-scroll-provider';
import { navLinks, navigationConfig } from './navigation';

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const scrollTo = useLenisScroll();
  const [isOpen, setIsOpen] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  // Hero content moves DOWN slowly as you scroll, creating illusion of slower upward scroll
  // This is the key to the parallax effect - moving opposite to scroll direction!
  const yHeadline = useTransform(scrollYProgress, [0, 1], [0, 500]); // Headline moves fastest
  const yImage = useTransform(scrollYProgress, [0, 1], [0, 250]); // Image moves slowest

  return (
    <div ref={ref} id="home" className="relative min-h-screen overflow-hidden">
      {/* Cloud-like Textured Background - sits behind the image */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 800px 600px at 20% 30%, rgba(210, 215, 210, 0.9) 0%, transparent 50%),
            radial-gradient(ellipse 900px 700px at 75% 60%, rgba(190, 195, 190, 0.8) 0%, transparent 55%),
            radial-gradient(ellipse 600px 500px at 50% 80%, rgba(170, 175, 170, 0.7) 0%, transparent 50%),
            radial-gradient(ellipse 700px 600px at 85% 20%, rgba(200, 205, 200, 0.75) 0%, transparent 50%),
            radial-gradient(ellipse 500px 400px at 10% 70%, rgba(180, 185, 180, 0.65) 0%, transparent 45%),
            radial-gradient(ellipse 1000px 800px at 40% 40%, rgba(195, 200, 195, 0.6) 0%, transparent 60%),
            radial-gradient(ellipse 650px 550px at 60% 25%, rgba(140, 145, 140, 0.5) 0%, transparent 48%),
            linear-gradient(180deg, #b0b5af 0%, #969995 50%, #7d827c 100%)
          `,
          mixBlendMode: 'normal'
        }}
      />

      {/* Background Image - takes up 2/3 of screen from right */}
      <motion.div
        style={{ y: yImage }}
        className="absolute inset-y-0 -right-30 w-2/3 pointer-events-none z-10"
      >
        <Image
          src="/andy-laptop-cutout-cropped.webp"
          alt="Professional Coaching Session"
          fill
          className="object-contain object-bottom-right scale-x-[-1]"
          sizes="60vw"
          priority
        />
      </motion.div>
      
      {/* Navigation */}
      <nav className="relative py-5 z-50 overflow-hidden">
        <div className="container mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-2xl font-semibold text-white hover:text-secondary-foreground transition-colors cursor-pointer px-2 py-1">
            HIGHPASS
          </Link>

          {/* Centered Navigation */}
          <div className="hidden md:flex items-center gap-0">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo(link.href);
                }}
                className="relative text-lg text-white transition-colors group cursor-pointer px-3 py-2"
              >
                <span className="relative inline-block pb-1">
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-white opacity-0 translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0" />
                </span>
              </button>
            ))}
          </div>

          {/* CTA Button on Right */}
          <Button 
            variant="secondary" 
            size="md" 
            className="hidden md:inline-flex text-lg"
            onClick={(e) => {
              e.preventDefault();
              scrollTo(navigationConfig.ctaHref);
            }}
          >
            {navigationConfig.ctaText}
          </Button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden relative w-8 h-8 flex flex-col justify-center items-center cursor-pointer"
            aria-label="Toggle menu"
          >
            <span
              className={`w-6 h-0.5 bg-white transition-all duration-300 ${
                isOpen ? 'rotate-45 translate-y-1.5' : ''
              }`}
            />
            <span
              className={`w-6 h-0.5 bg-white transition-all duration-300 mt-1.5 ${
                isOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`w-6 h-0.5 bg-white transition-all duration-300 mt-1.5 ${
                isOpen ? '-rotate-45 -translate-y-1.5' : ''
              }`}
            />
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
            >
              <div className="container mx-auto py-6 flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <button
                    key={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo(link.href);
                      setIsOpen(false);
                    }}
                    className="text-foreground hover:text-secondary transition-colors py-2 text-left cursor-pointer"
                  >
                    {link.label}
                  </button>
                ))}
                <Button 
                  variant="secondary" 
                  size="md" 
                  className="w-full"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo(navigationConfig.ctaHref);
                    setIsOpen(false);
                  }}
                >
                  {navigationConfig.ctaText}
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
      
      {/* Content with parallax */}
      <div className="relative h-[calc(100vh-80px)] flex items-center z-20">
        {/* Foreground Content */}
        <div className="relative w-full">
          <div className="container mx-auto px-4">
            <motion.div
              style={{ y: yHeadline }}
              className="w-full md:w-3/4 space-y-8 text-center lg:text-left mx-auto lg:mx-0"
            >
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white leading-tight -mt-20"
              >
                Coaching & Consultancy: Purposeful Leadership, Built on Integrity
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-2xl md:text-3xl text-white/90 max-w-2xl mx-auto lg:mx-0"
              >
                Empowering leaders to navigate complexity, grow with clarity, and create meaningful impact through integrity, courage, and collaboration.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              >
            <Button 
              variant="secondary" 
              size="lg"
              onClick={(e) => {
                e.preventDefault();
                scrollTo('#contact');
              }}
            >
              Start Your Journey
            </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

