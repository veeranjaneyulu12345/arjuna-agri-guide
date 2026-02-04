import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Target, Users, Globe } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const About = () => {
  const { t } = useLanguage();

  const values = [
    "Committed to sustainable agricultural practices",
    "Data privacy and security as top priorities",
    "Continuous research and innovation",
    "Supporting farmers of all scales",
  ];

  return (
    <section id="about" className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 mb-4">
              <span className="text-sm font-medium text-primary">{t('about.badge')}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              {t('about.title1')}{" "}
              <span className="text-gradient-primary">{t('about.title2')}</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              {t('about.description')}
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
              <div className="text-4xl font-bold mb-2">{t('about.stat3.value')}</div>
              <div className="text-primary-foreground/80">{t('about.stat3.label')}</div>
            </div>
            <div className="p-6 rounded-2xl bg-card border border-border shadow-soft">
              <Users className="w-10 h-10 mb-4 text-primary" />
              <div className="text-4xl font-bold text-foreground mb-2">{t('about.stat2.value')}</div>
              <div className="text-muted-foreground">{t('about.stat2.label')}</div>
            </div>
            <div className="p-6 rounded-2xl bg-card border border-border shadow-soft">
              <Globe className="w-10 h-10 mb-4 text-secondary" />
              <div className="text-4xl font-bold text-foreground mb-2">{t('about.stat1.value')}</div>
              <div className="text-muted-foreground">{t('about.stat1.label')}</div>
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
