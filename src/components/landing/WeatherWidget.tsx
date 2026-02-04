import { useState, useEffect } from 'react';
import { Cloud, CloudRain, Sun, CloudSun, Snowflake, Wind, Droplets, MapPin, ChevronDown, ChevronUp } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface WeatherData {
  temperature: number;
  weatherCode: number;
  humidity: number;
  windSpeed: number;
  location?: string;
  description: string;
}

const getWeatherIcon = (code: number) => {
  if (code === 0) return Sun;
  if (code <= 3) return CloudSun;
  if (code <= 48) return Cloud;
  if (code <= 67) return CloudRain;
  if (code <= 77) return Snowflake;
  if (code <= 82) return CloudRain;
  return Cloud;
};

const getWeatherDescription = (code: number): string => {
  if (code === 0) return 'Clear sky';
  if (code <= 3) return 'Partly cloudy';
  if (code <= 48) return 'Foggy';
  if (code <= 55) return 'Drizzle';
  if (code <= 67) return 'Rain';
  if (code <= 77) return 'Snow';
  if (code <= 82) return 'Rain showers';
  return 'Cloudy';
};

const WeatherWidget = () => {
  const { t } = useLanguage();
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const fetchWeather = async (lat: number, lon: number) => {
      try {
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&timezone=auto`
        );
        
        if (!response.ok) throw new Error('Failed to fetch weather');
        
        const data = await response.json();
        
        let locationName = '';
        try {
          const geoResponse = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
          );
          if (geoResponse.ok) {
            const geoData = await geoResponse.json();
            locationName = geoData.address?.city || geoData.address?.town || geoData.address?.village || geoData.address?.county || '';
          }
        } catch {
          // Silently fail geocoding
        }
        
        setWeather({
          temperature: Math.round(data.current.temperature_2m),
          weatherCode: data.current.weather_code,
          humidity: data.current.relative_humidity_2m,
          windSpeed: Math.round(data.current.wind_speed_10m),
          location: locationName,
          description: getWeatherDescription(data.current.weather_code),
        });
        setLoading(false);
      } catch (err) {
        setError('weather.error');
        setLoading(false);
      }
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeather(position.coords.latitude, position.coords.longitude);
        },
        () => {
          fetchWeather(17.385, 78.4867);
        }
      );
    } else {
      fetchWeather(17.385, 78.4867);
    }
  }, []);

  if (loading) {
    return (
      <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/10 text-sm">
        <Cloud className="w-4 h-4 text-primary animate-pulse" />
        <span className="text-muted-foreground">{t('weather.loading')}</span>
      </div>
    );
  }

  if (error || !weather) {
    return (
      <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-destructive/10 text-sm">
        <Cloud className="w-4 h-4 text-destructive" />
        <span className="text-destructive">{t(error || 'weather.error')}</span>
      </div>
    );
  }

  const WeatherIcon = getWeatherIcon(weather.weatherCode);

  return (
    <div className="relative">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-3 px-4 py-2 rounded-xl bg-gradient-card border border-border hover:border-primary/30 transition-all duration-200 cursor-pointer"
      >
        <div className="flex items-center gap-2">
          <WeatherIcon className="w-6 h-6 text-primary" />
          <span className="text-xl font-bold text-foreground">{weather.temperature}°C</span>
        </div>
        <div className="hidden sm:flex items-center gap-3 text-xs text-muted-foreground border-l border-border pl-3">
          <div className="flex items-center gap-1">
            <Droplets className="w-3 h-3" />
            <span>{weather.humidity}%</span>
          </div>
          <div className="flex items-center gap-1">
            <Wind className="w-3 h-3" />
            <span>{weather.windSpeed} km/h</span>
          </div>
          {weather.location && (
            <div className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              <span>{weather.location}</span>
            </div>
          )}
        </div>
        <div className="sm:hidden ml-1">
          {isExpanded ? (
            <ChevronUp className="w-4 h-4 text-muted-foreground" />
          ) : (
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          )}
        </div>
      </button>

      {/* Expanded details dropdown */}
      {isExpanded && (
        <div className="absolute top-full left-0 right-0 mt-2 p-4 rounded-xl bg-card border border-border shadow-elevated z-50 min-w-[200px]">
          <div className="flex items-center gap-3 mb-3 pb-3 border-b border-border">
            <WeatherIcon className="w-10 h-10 text-primary" />
            <div>
              <div className="text-2xl font-bold text-foreground">{weather.temperature}°C</div>
              <div className="text-sm text-muted-foreground">{weather.description}</div>
            </div>
          </div>
          
          <div className="space-y-2 text-sm">
            {weather.location && (
              <div className="flex items-center gap-2 text-foreground">
                <MapPin className="w-4 h-4 text-primary" />
                <span>{weather.location}</span>
              </div>
            )}
            <div className="flex items-center gap-2 text-foreground">
              <Droplets className="w-4 h-4 text-primary" />
              <span>{t('weather.humidity')}: {weather.humidity}%</span>
            </div>
            <div className="flex items-center gap-2 text-foreground">
              <Wind className="w-4 h-4 text-primary" />
              <span>{t('weather.wind')}: {weather.windSpeed} km/h</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherWidget;
