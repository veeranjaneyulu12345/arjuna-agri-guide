import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import HowItWorks from "@/components/landing/HowItWorks";
import About from "@/components/landing/About";
import CTA from "@/components/landing/CTA";
import Footer from "@/components/landing/Footer";
import { MarketDashboard } from "@/components/market/MarketDashboard";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <MarketDashboard />
        <Features />
        <HowItWorks />
        <About />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
