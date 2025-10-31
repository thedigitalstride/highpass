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
    src: '/test-images/image-1.svg',
    alt: 'Product showcase 1',
    width: 800,
    height: 600,
  },
  {
    src: '/test-images/image-2.svg',
    alt: 'Product showcase 2',
    width: 800,
    height: 600,
  },
  {
    src: '/test-images/image-3.svg',
    alt: 'Product showcase 3',
    width: 800,
    height: 600,
  },
  {
    src: '/test-images/image-4.svg',
    alt: 'Product showcase 4',
    width: 800,
    height: 600,
  },
  {
    src: '/test-images/image-5.svg',
    alt: 'Product showcase 5',
    width: 800,
    height: 600,
  },
  {
    src: '/test-images/image-6.svg',
    alt: 'Product showcase 6',
    width: 800,
    height: 600,
  },
];
