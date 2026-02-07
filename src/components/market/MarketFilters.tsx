import { memo } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { RefreshCw, Search, MapPin, Building2 } from 'lucide-react';
import { commodityFamilyLabels, type CommodityFamily } from '@/lib/commodityCategories';

interface MarketFiltersProps {
  states: string[];
  districts: string[];
  selectedState: string;
  selectedDistrict: string;
  selectedFamily: CommodityFamily;
  searchQuery: string;
  loading: boolean;
  onStateChange: (state: string) => void;
  onDistrictChange: (district: string) => void;
  onFamilyChange: (family: CommodityFamily) => void;
  onSearchChange: (query: string) => void;
  onRefresh: () => void;
}

const translations = {
  en: {
    selectState: 'Select State',
    allStates: 'All States',
    selectDistrict: 'Select District',
    allDistricts: 'All Districts',
    searchPlaceholder: 'Search commodity, market...',
    refresh: 'Refresh',
    refreshing: 'Refreshing...',
  },
  te: {
    selectState: 'రాష్ట్రం ఎంచుకోండి',
    allStates: 'అన్ని రాష్ట్రాలు',
    selectDistrict: 'జిల్లా ఎంచుకోండి',
    allDistricts: 'అన్ని జిల్లాలు',
    searchPlaceholder: 'వస్తువు, మార్కెట్ శోధించండి...',
    refresh: 'రిఫ్రెష్',
    refreshing: 'రిఫ్రెష్ అవుతోంది...',
  },
  hi: {
    selectState: 'राज्य चुनें',
    allStates: 'सभी राज्य',
    selectDistrict: 'जिला चुनें',
    allDistricts: 'सभी जिले',
    searchPlaceholder: 'वस्तु, मंडी खोजें...',
    refresh: 'रिफ्रेश',
    refreshing: 'रिफ्रेश हो रहा है...',
  },
};

export const MarketFilters = memo(function MarketFilters({
  states,
  districts,
  selectedState,
  selectedDistrict,
  selectedFamily,
  searchQuery,
  loading,
  onStateChange,
  onDistrictChange,
  onFamilyChange,
  onSearchChange,
  onRefresh,
}: MarketFiltersProps) {
  const { language } = useLanguage();
  const t = translations[language] || translations.en;

  return (
    <div className="space-y-4">
      {/* Category Tabs */}
      <Tabs value={selectedFamily} onValueChange={(v) => onFamilyChange(v as CommodityFamily)} className="w-full">
        <TabsList className="grid w-full grid-cols-5 h-auto">
          {(Object.keys(commodityFamilyLabels) as CommodityFamily[]).map((family) => (
            <TabsTrigger
              key={family}
              value={family}
              className="text-xs sm:text-sm py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              {commodityFamilyLabels[family]}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {/* Filters Row */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* State Dropdown */}
        <div className="flex-1 min-w-0">
          <Select value={selectedState} onValueChange={onStateChange}>
            <SelectTrigger className="w-full bg-background">
              <MapPin className="h-4 w-4 mr-2 text-muted-foreground shrink-0" />
              <SelectValue placeholder={t.selectState} />
            </SelectTrigger>
            <SelectContent className="bg-popover z-50">
              <SelectItem value="all">{t.allStates}</SelectItem>
              {states.map((state) => (
                <SelectItem key={state} value={state}>
                  {state}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* District Dropdown */}
        <div className="flex-1 min-w-0">
          <Select 
            value={selectedDistrict} 
            onValueChange={onDistrictChange}
            disabled={!selectedState || selectedState === 'all'}
          >
            <SelectTrigger className="w-full bg-background">
              <Building2 className="h-4 w-4 mr-2 text-muted-foreground shrink-0" />
              <SelectValue placeholder={t.selectDistrict} />
            </SelectTrigger>
            <SelectContent className="bg-popover z-50">
              <SelectItem value="all">{t.allDistricts}</SelectItem>
              {districts.map((district) => (
                <SelectItem key={district} value={district}>
                  {district}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Search */}
        <div className="flex-1 min-w-0 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder={t.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9 bg-background"
          />
        </div>

        {/* Refresh Button */}
        <Button
          variant="outline"
          size="icon"
          onClick={onRefresh}
          disabled={loading}
          className="shrink-0"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
        </Button>
      </div>
    </div>
  );
});
