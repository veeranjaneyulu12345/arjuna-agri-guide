import { useLanguage } from '@/contexts/LanguageContext';
import { useMarketPrices } from '@/hooks/useMarketPrices';
import { MarketFilters } from './MarketFilters';
import { MarketPriceTable } from './MarketPriceTable';
import { MarketPagination } from './MarketPagination';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Clock, AlertTriangle, Database } from 'lucide-react';

const translations = {
  en: {
    title: 'Market Price Dashboard',
    subtitle: 'Real-time agricultural commodity prices from AGMARKNET',
    showingResults: 'Showing',
    results: 'results',
    of: 'of',
    total: 'total records',
    lastUpdated: 'Last updated',
    staleDataWarning: 'Showing cached data. Fresh data unavailable.',
    dataSource: 'Source: Government of India - AGMARKNET',
  },
  te: {
    title: 'మార్కెట్ ధర డాష్‌బోర్డ్',
    subtitle: 'AGMARKNET నుండి రియల్-టైమ్ వ్యవసాయ వస్తువుల ధరలు',
    showingResults: 'చూపిస్తోంది',
    results: 'ఫలితాలు',
    of: 'లో',
    total: 'మొత్తం రికార్డులు',
    lastUpdated: 'చివరిగా నవీకరించబడింది',
    staleDataWarning: 'క్యాష్ చేసిన డేటా చూపిస్తోంది. తాజా డేటా అందుబాటులో లేదు.',
    dataSource: 'మూలం: భారత ప్రభుత్వం - AGMARKNET',
  },
  hi: {
    title: 'बाजार मूल्य डैशबोर्ड',
    subtitle: 'AGMARKNET से रियल-टाइम कृषि वस्तु मूल्य',
    showingResults: 'दिखा रहा है',
    results: 'परिणाम',
    of: 'में से',
    total: 'कुल रिकॉर्ड',
    lastUpdated: 'अंतिम अपडेट',
    staleDataWarning: 'कैश्ड डेटा दिखा रहा है। ताज़ा डेटा उपलब्ध नहीं।',
    dataSource: 'स्रोत: भारत सरकार - AGMARKNET',
  },
};

export function MarketDashboard() {
  const { language } = useLanguage();
  const t = translations[language] || translations.en;
  
  const {
    records,
    filteredCount,
    totalRecords,
    loading,
    error,
    isStale,
    lastUpdated,
    states,
    districts,
    selectedState,
    selectedDistrict,
    selectedFamily,
    searchQuery,
    currentPage,
    totalPages,
    setSelectedState,
    setSelectedDistrict,
    setSelectedFamily,
    setSearchQuery,
    setCurrentPage,
    refresh,
  } = useMarketPrices();

  return (
    <section id="market-prices" className="py-16 px-4 bg-muted/30">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <TrendingUp className="h-8 w-8 text-primary" />
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">{t.title}</h2>
          </div>
          <p className="text-muted-foreground">{t.subtitle}</p>
        </div>

        <Card className="shadow-lg">
          <CardHeader className="border-b bg-card">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-4 flex-wrap">
                <Badge variant="secondary" className="gap-1">
                  <Database className="h-3 w-3" />
                  {filteredCount.toLocaleString()} {t.results}
                </Badge>
                {lastUpdated && (
                  <Badge variant="outline" className="gap-1">
                    <Clock className="h-3 w-3" />
                    {t.lastUpdated}: {lastUpdated}
                  </Badge>
                )}
              </div>
              <p className="text-xs text-muted-foreground">{t.dataSource}</p>
            </div>
          </CardHeader>

          <CardContent className="p-4 sm:p-6">
            {/* Stale Data Warning */}
            {isStale && (
              <Alert variant="default" className="mb-4 border-accent/50 bg-accent/10">
                <AlertTriangle className="h-4 w-4 text-accent-foreground" />
                <AlertDescription className="text-accent-foreground">
                  {t.staleDataWarning}
                </AlertDescription>
              </Alert>
            )}

            {/* Error Message */}
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Filters */}
            <MarketFilters
              states={states}
              districts={districts}
              selectedState={selectedState}
              selectedDistrict={selectedDistrict}
              selectedFamily={selectedFamily}
              searchQuery={searchQuery}
              loading={loading}
              onStateChange={setSelectedState}
              onDistrictChange={setSelectedDistrict}
              onFamilyChange={setSelectedFamily}
              onSearchChange={setSearchQuery}
              onRefresh={refresh}
            />

            {/* Data Table */}
            <div className="mt-6">
              <MarketPriceTable records={records} loading={loading} />
            </div>

            {/* Pagination */}
            <MarketPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
