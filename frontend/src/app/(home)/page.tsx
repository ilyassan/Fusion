import Header from "./components/Header";
import Hero from "./components/Hero";
import Logos from "./components/Logos";
import Features from "./components/Features";
import Testimonials from "./components/Testimonials";
import Pricing from "./components/Pricing";
import FAQ from "./components/Faq";
import Newsletter from "./components/Newsletter";
import CTA from "./components/Cta";
import Footer from "./components/Footer";
import StickyCTA from "./components/StickyCta";

export default function LandingPage() {
  return (
    <div className="bg-white">
      <StickyCTA />
      <Header />
      <Hero />
      <Logos />
      <Features />
      <Testimonials />
      <Pricing />
      <FAQ />
      <Newsletter />
      <CTA />
      <Footer />
    </div>
  );
}