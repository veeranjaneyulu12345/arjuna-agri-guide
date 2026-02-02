import { BarChart3, CloudRain, Leaf, Map, Microscope, Zap } from "lucide-react";

const features = [
  {
    icon: Microscope,
    title: "Advanced Research Tools",
    description: "Access powerful analytics and research methodologies designed specifically for agricultural studies.",
  },
  {
    icon: BarChart3,
    title: "Data-Driven Insights",
    description: "Transform raw agricultural data into actionable recommendations with our AI-powered analysis engine.",
  },
  {
    icon: CloudRain,
    title: "Weather Integration",
    description: "Real-time weather data integration to optimize planting, irrigation, and harvesting schedules.",
  },
  {
    icon: Map,
    title: "Soil Mapping",
    description: "Comprehensive soil analysis and mapping to understand nutrient levels and optimize crop selection.",
  },
  {
    icon: Leaf,
    title: "Sustainable Practices",
    description: "Evidence-based recommendations for sustainable farming that protect the environment while maximizing yield.",
  },
  {
    icon: Zap,
    title: "Real-Time Monitoring",
    description: "Monitor crop health, growth patterns, and potential issues with instant alerts and notifications.",
  },
];

const Features = () => {
  return (
    <section id="features" className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 mb-4">
            <Leaf className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Features</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Everything You Need for{" "}
            <span className="text-gradient-primary">Agricultural Excellence</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Our comprehensive platform provides all the tools and insights needed to 
            revolutionize your agricultural research and farming practices.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group p-6 lg:p-8 rounded-2xl bg-gradient-card border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-elevated"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-hero flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
