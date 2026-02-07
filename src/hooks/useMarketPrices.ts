import { useState, useCallback, useMemo, useEffect } from 'react';
import { getCachedData, setCachedData, getCacheAge } from '@/lib/marketPriceCache';
import { getCommodityFamily, type CommodityFamily } from '@/lib/commodityCategories';
import type { MarketPriceRecord, RawMarketRecord, AgmarknetApiResponse } from '@/types/marketPrice';

const PAGE_SIZE = 50;
const FETCH_LIMIT = 500; // Fetch in chunks

export function useMarketPrices() {
  const [records, setRecords] = useState<MarketPriceRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isStale, setIsStale] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [totalRecords, setTotalRecords] = useState(0);
  
  // Filters
  const [selectedState, setSelectedState] = useState<string>('');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('');
  const [selectedFamily, setSelectedFamily] = useState<CommodityFamily>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const normalizeRecord = useCallback((raw: RawMarketRecord): MarketPriceRecord => ({
    state: raw.state || '',
    district: raw.district || '',
    market: raw.market || '',
    commodity: raw.commodity || '',
    variety: raw.variety || '',
    grade: raw.grade || '',
    arrival_date: raw.arrival_date || '',
    min_price: parseFloat(raw.min_price) || 0,
    max_price: parseFloat(raw.max_price) || 0,
    modal_price: parseFloat(raw.modal_price) || 0,
  }), []);

  const fetchMarketData = useCallback(async (state: string = '', district: string = '') => {
    const cacheKey = `prices_${state}_${district}`;
    
    // Check cache first
    const cached = getCachedData<{ records: MarketPriceRecord[], total: number }>(cacheKey);
    if (cached) {
      setRecords(cached.data.records);
      setTotalRecords(cached.data.total);
      setIsStale(cached.isStale);
      setLastUpdated(getCacheAge(cacheKey));
      
      if (!cached.isStale) {
        return; // Fresh cache, no need to fetch
      }
    }

    setLoading(true);
    setError(null);

    try {
      // Build query params
      const params = new URLSearchParams({
        limit: String(FETCH_LIMIT),
        offset: '0',
      });
      if (state) params.set('state', state);
      if (district) params.set('district', district);

      // Fetch data from edge function using fetch directly for GET with query params
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
      
      const response = await fetch(
        `${supabaseUrl}/functions/v1/agmarknet-proxy?${params.toString()}`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${supabaseKey}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API request failed: ${response.status} - ${errorText}`);
      }

      const apiData = await response.json() as AgmarknetApiResponse;
      
      if (!apiData?.records) {
        throw new Error('Invalid API response');
      }

      const normalizedRecords = apiData.records.map(normalizeRecord);
      
      // Cache the results
      setCachedData(cacheKey, { records: normalizedRecords, total: apiData.total });
      
      setRecords(normalizedRecords);
      setTotalRecords(apiData.total);
      setIsStale(false);
      setLastUpdated('Just now');
      
      setRecords(normalizedRecords);
      setTotalRecords(apiData.total);
      setIsStale(false);
      setLastUpdated('Just now');

    } catch (err) {
      console.error('Fetch error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch market data';
      
      // If we have cached data, use it as fallback
      if (cached) {
        setError(`${errorMessage}. Showing cached data.`);
      } else {
        setError(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  }, [normalizeRecord]);

  // Extract unique states
  const states = useMemo(() => {
    const uniqueStates = [...new Set(records.map(r => r.state))].filter(Boolean).sort();
    return uniqueStates;
  }, [records]);

  // Extract districts based on selected state
  const districts = useMemo(() => {
    if (!selectedState) return [];
    const stateRecords = records.filter(r => r.state === selectedState);
    const uniqueDistricts = [...new Set(stateRecords.map(r => r.district))].filter(Boolean).sort();
    return uniqueDistricts;
  }, [records, selectedState]);

  // Filter records based on all criteria
  const filteredRecords = useMemo(() => {
    let filtered = records;

    // Filter by state
    if (selectedState) {
      filtered = filtered.filter(r => r.state === selectedState);
    }

    // Filter by district
    if (selectedDistrict) {
      filtered = filtered.filter(r => r.district === selectedDistrict);
    }

    // Filter by commodity family
    if (selectedFamily !== 'all') {
      filtered = filtered.filter(r => getCommodityFamily(r.commodity) === selectedFamily);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(r => 
        r.commodity.toLowerCase().includes(query) ||
        r.market.toLowerCase().includes(query) ||
        r.variety.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [records, selectedState, selectedDistrict, selectedFamily, searchQuery]);

  // Paginate results
  const paginatedRecords = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredRecords.slice(start, start + PAGE_SIZE);
  }, [filteredRecords, currentPage]);

  const totalPages = Math.ceil(filteredRecords.length / PAGE_SIZE);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedState, selectedDistrict, selectedFamily, searchQuery]);

  // Initial fetch
  useEffect(() => {
    fetchMarketData();
  }, [fetchMarketData]);

  const handleStateChange = useCallback((state: string) => {
    setSelectedState(state);
    setSelectedDistrict('');
  }, []);

  const handleDistrictChange = useCallback((district: string) => {
    setSelectedDistrict(district);
  }, []);

  const handleFamilyChange = useCallback((family: CommodityFamily) => {
    setSelectedFamily(family);
  }, []);

  const handleSearchChange = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const handleRefresh = useCallback(() => {
    // Clear cache and refetch
    localStorage.removeItem(`agmarknet_prices_${selectedState}_${selectedDistrict}`);
    fetchMarketData(selectedState, selectedDistrict);
  }, [fetchMarketData, selectedState, selectedDistrict]);

  return {
    records: paginatedRecords,
    filteredCount: filteredRecords.length,
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
    setSelectedState: handleStateChange,
    setSelectedDistrict: handleDistrictChange,
    setSelectedFamily: handleFamilyChange,
    setSearchQuery: handleSearchChange,
    setCurrentPage,
    refresh: handleRefresh,
  };
}
