import { Button } from "@/components/ui/button";
import { Leaf, Menu, X } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import WeatherWidget from "./WeatherWidget";
import LanguageSwitcher from "./LanguageSwitcher";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-hero rounded-xl flex items-center justify-center shadow-soft">
              <Leaf className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">
              Arjuna<span className="text-primary">Agri</span>
            </span>
          </div>

          {/* Weather Widget - Desktop */}
          <div className="hidden lg:block">
            <WeatherWidget />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#market-prices" className="text-muted-foreground hover:text-foreground transition-colors font-medium">
              {t('nav.marketPrices')}
            </a>
            <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors font-medium">
              {t('nav.features')}
            </a>
            <a href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors font-medium">
              {t('nav.howItWorks')}
            </a>
            <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors font-medium">
              {t('nav.about')}
            </a>
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <LanguageSwitcher />
            <Button variant="ghost">{t('auth.signIn')}</Button>
            <Button variant="default">{t('auth.getStarted')}</Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-background border-b border-border">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-4">
            {/* Weather Widget - Mobile */}
            <div className="pb-4 border-b border-border">
              <WeatherWidget />
            </div>
            <a href="#market-prices" className="text-muted-foreground hover:text-foreground transition-colors font-medium py-2">
              {t('nav.marketPrices')}
            </a>
            <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors font-medium py-2">
              {t('nav.features')}
            </a>
            <a href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors font-medium py-2">
              {t('nav.howItWorks')}
            </a>
            <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors font-medium py-2">
              {t('nav.about')}
            </a>
            <div className="flex flex-col gap-2 pt-4 border-t border-border">
              <div className="flex justify-center pb-2">
                <LanguageSwitcher />
              </div>
              <Button variant="ghost" className="w-full">{t('auth.signIn')}</Button>
              <Button variant="default" className="w-full">{t('auth.getStarted')}</Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
