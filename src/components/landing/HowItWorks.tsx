import { ArrowRight, Database, LineChart, Lightbulb } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Database,
    title: "Input Your Data",
    description: "Upload your agricultural data including soil samples, weather patterns, crop history, and current conditions.",
  },
  {
    number: "02",
    icon: LineChart,
    title: "AI Analysis",
    description: "Our advanced algorithms analyze your data against thousands of research studies and farming patterns.",
  },
  {
    number: "03",
    icon: Lightbulb,
    title: "Get Recommendations",
    description: "Receive personalized, actionable insights to optimize your farming practices and increase yields.",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20 lg:py-32 bg-muted/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/20 mb-4">
            <span className="text-sm font-medium text-secondary-foreground">How It Works</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Simple Process,{" "}
            <span className="text-gradient-primary">Powerful Results</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Get started in minutes and transform your agricultural research with our 
            streamlined three-step process.
          </p>
        </div>

        {/* Steps */}
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-4 relative">
          {/* Connection Line (Desktop) */}
          <div className="hidden lg:block absolute top-24 left-[20%] right-[20%] h-0.5 bg-border">
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-primary opacity-50" />
          </div>

          {steps.map((step, index) => (
            <div key={step.number} className="relative">
              <div className="flex flex-col items-center text-center">
                {/* Step Number */}
                <div className="relative mb-6">
                  <div className="w-20 h-20 rounded-full bg-gradient-hero flex items-center justify-center shadow-elevated">
                    <step.icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-sm font-bold text-secondary-foreground">
                    {step.number}
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground max-w-sm">
                  {step.description}
                </p>

                {/* Arrow (Mobile & Tablet) */}
                {index < steps.length - 1 && (
                  <div className="lg:hidden mt-6 text-primary">
                    <ArrowRight className="w-6 h-6 rotate-90" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
