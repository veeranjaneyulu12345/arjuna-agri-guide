import { useState, useEffect } from 'react';
import { Cloud, CloudRain, Sun, CloudSun, Snowflake, Wind, Droplets, MapPin } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface WeatherData {
  temperature: number;
  weatherCode: number;
  humidity: number;
  windSpeed: number;
  location?: string;
}

const getWeatherIcon = (code: number) => {
  // WMO Weather interpretation codes
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

  useEffect(() => {
    const fetchWeather = async (lat: number, lon: number) => {
      try {
        // Using Open-Meteo API (free, no API key required)
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&timezone=auto`
        );
        
        if (!response.ok) throw new Error('Failed to fetch weather');
        
        const data = await response.json();
        
        // Get location name using reverse geocoding
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
          // Default to a location if geolocation is denied (Hyderabad, India)
          fetchWeather(17.385, 78.4867);
        }
      );
    } else {
      // Fallback location
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
    <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-gradient-card border border-border">
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
    </div>
  );
};

export default WeatherWidget;
