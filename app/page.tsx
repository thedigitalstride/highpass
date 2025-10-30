import Hero from './components/hero';
import Features from './components/features';
import About from './components/about';
import Testimonials from './components/testimonials';
import CTASection from './components/cta-section';
import Footer from './components/footer';

export default function Home() {
  return (
    <main className="relative">
      <Hero />
      <Features />
      <About />
      <Testimonials />
      <CTASection />
      <Footer />
    </main>
  );
}
