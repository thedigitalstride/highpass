import Hero from './components/hero';
import Features from './components/features';
import About from './components/about';
import FlickerCarousel from './components/flicker-carousel';
import Testimonials from './components/testimonials';
import CTASection from './components/cta-section';
import Footer from './components/footer';
import SectionWrapper from './components/ui/section-wrapper';

const carouselImages = [
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

export default function Home() {
  return (
    <main className="relative">
      <Hero />
      <Features />
      <About />
      
      {/* Flicker Carousel Section */}
      <SectionWrapper id="gallery">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-4">
              Our Work
            </h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              Swipe through our collection. Drag to explore and experience the smooth, elegant interaction.
            </p>
          </div>
        </div>
        <FlickerCarousel images={carouselImages} />
      </SectionWrapper>
      
      <Testimonials />
      <CTASection />
      <Footer />
    </main>
  );
}
