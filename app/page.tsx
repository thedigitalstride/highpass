import Hero from './components/hero';
import Features from './components/features';
import About from './components/about';
import FlickerCarousel, { carouselImages } from './components/flicker-carousel';
import Testimonials from './components/testimonials';
import CTASection from './components/cta-section';
import Footer from './components/footer';
import SectionWrapper from './components/ui/section-wrapper';

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
