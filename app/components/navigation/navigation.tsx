'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Button from '../ui/button';
import { useLenisScroll } from '../smooth-scroll-provider';
import { navLinks, navigationConfig } from './content';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const scrollTo = useLenisScroll();

  return (
    <nav className="fixed top-0 left-0 right-0 bg-primary py-5 z-50">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-semibold text-white hover:text-secondary-foreground transition-colors">
          {navigationConfig.logo}
        </Link>

        {/* Centered Navigation */}
        <div className="flex items-center space-x-8 absolute left-1/2 -translate-x-1/2">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={(e) => {
                e.preventDefault();
                scrollTo(link.href);
              }}
              className="relative text-lg text-white transition-colors group pb-1"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-white opacity-0 translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0" />
            </button>
          ))}
        </div>

        {/* CTA Button on Right */}
        <Button
          variant="secondary"
          size="md"
          className="text-lg"
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
          className="md:hidden relative w-8 h-8 flex flex-col justify-center items-center"
          aria-label="Toggle menu"
        >
          <span
            className={`w-6 h-0.5 bg-foreground transition-all duration-300 ${
              isOpen ? 'rotate-45 translate-y-1.5' : ''
            }`}
          />
          <span
            className={`w-6 h-0.5 bg-foreground transition-all duration-300 mt-1.5 ${
              isOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`w-6 h-0.5 bg-foreground transition-all duration-300 mt-1.5 ${
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
                  className="text-foreground hover:text-secondary transition-colors py-2 text-left"
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
  );
}

