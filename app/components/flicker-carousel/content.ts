/**
 * FlickerCarousel Content Configuration
 *
 * This file contains the content and configuration for the FlickerCarousel component.
 * Separate from the component logic to make content updates easy.
 */

export interface CarouselImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export const carouselImages: CarouselImage[] = [
  {
    src: '/andy-coaching-table.webp',
    alt: 'Product showcase 1',
    width: 800,
    height: 600,
  },
  {
    src: '/andy-coaching-table.webp',
    alt: 'Product showcase 2',
    width: 800,
    height: 600,
  },
  {
    src: '/andy-coaching-table.webp',
    alt: 'Product showcase 3',
    width: 800,
    height: 600,
  },
];
