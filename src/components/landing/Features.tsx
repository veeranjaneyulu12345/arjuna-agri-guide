import { BarChart3, CloudRain, Leaf, Map, Microscope, Zap } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Features = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: Microscope,
      titleKey: 'features.research.title',
      descriptionKey: 'features.research.description',
    },
    {
      icon: BarChart3,
      titleKey: 'features.data.title',
      descriptionKey: 'features.data.description',
    },
    {
      icon: CloudRain,
      titleKey: 'features.weather.title',
      descriptionKey: 'features.weather.description',
    },
    {
      icon: Map,
      titleKey: 'features.soil.title',
      descriptionKey: 'features.soil.description',
    },
    {
      icon: Leaf,
      titleKey: 'features.sustainable.title',
      descriptionKey: 'features.sustainable.description',
    },
    {
      icon: Zap,
      titleKey: 'features.monitoring.title',
      descriptionKey: 'features.monitoring.description',
    },
  ];

  return (
    <section id="features" className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 mb-4">
            <Leaf className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">{t('features.badge')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {t('features.title1')}{" "}
            <span className="text-gradient-primary">{t('features.title2')}</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            {t('features.description')}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.titleKey}
              className="group p-6 lg:p-8 rounded-2xl bg-gradient-card border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-elevated"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-hero flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">
                {t(feature.titleKey)}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {t(feature.descriptionKey)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
