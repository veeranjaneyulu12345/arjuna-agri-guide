import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Target, Users, Globe } from "lucide-react";

const values = [
  "Committed to sustainable agricultural practices",
  "Data privacy and security as top priorities",
  "Continuous research and innovation",
  "Supporting farmers of all scales",
];

const About = () => {
  return (
    <section id="about" className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 mb-4">
              <span className="text-sm font-medium text-primary">About Us</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Empowering Agriculture Through{" "}
              <span className="text-gradient-primary">Research & Technology</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              Arjuna Agri was founded with a mission to bridge the gap between 
              agricultural research and practical farming. We believe that every 
              farmer deserves access to the latest scientific insights and 
              data-driven recommendations.
            </p>
            <p className="text-lg text-muted-foreground mb-8">
              Our team of agronomists, data scientists, and technology experts 
              work together to create tools that make complex research accessible 
              and actionable for farmers worldwide.
            </p>

            {/* Values */}
            <div className="space-y-3 mb-8">
              {values.map((value) => (
                <div key={value} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-foreground">{value}</span>
                </div>
              ))}
            </div>

            <Button variant="default" size="lg" className="group">
              Learn More About Us
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          {/* Right - Stats Cards */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="p-6 rounded-2xl bg-gradient-hero text-primary-foreground shadow-elevated">
              <Target className="w-10 h-10 mb-4 opacity-80" />
              <div className="text-4xl font-bold mb-2">15+</div>
              <div className="text-primary-foreground/80">Years of Research</div>
            </div>
            <div className="p-6 rounded-2xl bg-card border border-border shadow-soft">
              <Users className="w-10 h-10 mb-4 text-primary" />
              <div className="text-4xl font-bold text-foreground mb-2">200+</div>
              <div className="text-muted-foreground">Expert Researchers</div>
            </div>
            <div className="p-6 rounded-2xl bg-card border border-border shadow-soft">
              <Globe className="w-10 h-10 mb-4 text-secondary" />
              <div className="text-4xl font-bold text-foreground mb-2">45</div>
              <div className="text-muted-foreground">Countries Served</div>
            </div>
            <div className="p-6 rounded-2xl bg-gradient-accent text-secondary-foreground shadow-elevated">
              <CheckCircle className="w-10 h-10 mb-4 opacity-80" />
              <div className="text-4xl font-bold mb-2">99.9%</div>
              <div className="text-secondary-foreground/80">Uptime Guarantee</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
