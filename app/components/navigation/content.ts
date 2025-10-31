/**
 * Navigation Content Configuration
 *
 * This file contains the content and configuration for the Navigation component.
 * Separate from the component logic to make content updates easy.
 */

export interface NavLink {
  href: string;
  label: string;
}

export interface NavigationConfig {
  logo: string;
  ctaText: string;
  ctaHref: string;
}

export const navLinks: NavLink[] = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#services', label: 'Services' },
  { href: '#testimonials', label: 'Testimonials' },
  { href: '#contact', label: 'Contact' },
];

export const navigationConfig: NavigationConfig = {
  logo: 'HIGHPASS',
  ctaText: 'Get Started',
  ctaHref: '#contact',
};
