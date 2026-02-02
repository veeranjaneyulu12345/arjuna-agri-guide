import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart3, Sprout } from "lucide-react";
import heroImage from "@/assets/hero-agriculture.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Agricultural landscape with precision farming technology"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/70 to-foreground/40" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 backdrop-blur-sm border border-primary/30 mb-6 animate-fade-up">
            <Sprout className="w-4 h-4 text-secondary" />
            <span className="text-sm font-medium text-primary-foreground">
              Revolutionizing Agricultural Research
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-primary-foreground leading-tight mb-6 animate-fade-up" style={{ animationDelay: "0.1s" }}>
            Smarter Farming Through{" "}
            <span className="text-secondary">Data-Driven</span> Insights
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-primary-foreground/80 mb-8 max-w-2xl animate-fade-up" style={{ animationDelay: "0.2s" }}>
            Arjuna Agri empowers farmers and researchers with cutting-edge analytics, 
            actionable recommendations, and sustainable practices to maximize yields 
            and protect our planet.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-up" style={{ animationDelay: "0.3s" }}>
            <Button variant="accent" size="lg" className="group">
              Start Your Research
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="heroOutline" size="lg">
              <BarChart3 className="w-5 h-5" />
              View Demo
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-primary-foreground/20 animate-fade-up" style={{ animationDelay: "0.4s" }}>
            <div>
              <div className="text-3xl sm:text-4xl font-bold text-secondary">500+</div>
              <div className="text-sm text-primary-foreground/70">Research Projects</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-bold text-secondary">98%</div>
              <div className="text-sm text-primary-foreground/70">Accuracy Rate</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-bold text-secondary">50K+</div>
              <div className="text-sm text-primary-foreground/70">Farms Analyzed</div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  );
};

export default Hero;
