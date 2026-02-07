import { useLanguage } from '@/contexts/LanguageContext';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import type { MarketPriceRecord } from '@/types/marketPrice';
import { getCommodityFamily, commodityFamilyLabels } from '@/lib/commodityCategories';

interface MarketPriceTableProps {
  records: MarketPriceRecord[];
  loading: boolean;
}

const translations = {
  en: {
    commodity: 'Commodity',
    market: 'Market',
    district: 'District',
    minPrice: 'Min Price',
    maxPrice: 'Max Price',
    modalPrice: 'Modal Price',
    date: 'Date',
    variety: 'Variety',
    noData: 'No market data available',
    noDataHint: 'Try adjusting your filters or check back later',
    pricePerQuintal: '₹/Quintal',
  },
  te: {
    commodity: 'వస్తువు',
    market: 'మార్కెట్',
    district: 'జిల్లా',
    minPrice: 'కనిష్ట ధర',
    maxPrice: 'గరిష్ట ధర',
    modalPrice: 'మోడల్ ధర',
    date: 'తేదీ',
    variety: 'రకం',
    noData: 'మార్కెట్ డేటా అందుబాటులో లేదు',
    noDataHint: 'మీ ఫిల్టర్‌లను సర్దుబాటు చేయడానికి ప్రయత్నించండి',
    pricePerQuintal: '₹/క్వింటాల్',
  },
  hi: {
    commodity: 'वस्तु',
    market: 'मंडी',
    district: 'जिला',
    minPrice: 'न्यूनतम मूल्य',
    maxPrice: 'अधिकतम मूल्य',
    modalPrice: 'मॉडल मूल्य',
    date: 'दिनांक',
    variety: 'किस्म',
    noData: 'बाजार डेटा उपलब्ध नहीं है',
    noDataHint: 'अपने फ़िल्टर समायोजित करने का प्रयास करें',
    pricePerQuintal: '₹/क्विंटल',
  },
};

function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-IN').format(price);
}

function formatDate(dateStr: string): string {
  if (!dateStr) return '-';
  // Handle DD/MM/YYYY format
  const parts = dateStr.split('/');
  if (parts.length === 3) {
    return `${parts[0]}/${parts[1]}/${parts[2]}`;
  }
  return dateStr;
}

export function MarketPriceTable({ records, loading }: MarketPriceTableProps) {
  const { language } = useLanguage();
  const t = translations[language] || translations.en;

  if (loading) {
    return (
      <div className="space-y-3">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-16 w-full" />
        ))}
      </div>
    );
  }

  if (!records.length) {
    return (
      <Card className="border-dashed">
        <CardContent className="py-12 text-center">
          <div className="text-muted-foreground">
            <p className="text-lg font-medium">{t.noData}</p>
            <p className="text-sm mt-1">{t.noDataHint}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      {/* Desktop Table */}
      <div className="hidden md:block rounded-lg border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="font-semibold">{t.commodity}</TableHead>
              <TableHead className="font-semibold">{t.market}</TableHead>
              <TableHead className="font-semibold">{t.district}</TableHead>
              <TableHead className="text-right font-semibold">{t.minPrice}</TableHead>
              <TableHead className="text-right font-semibold">{t.maxPrice}</TableHead>
              <TableHead className="text-right font-semibold">{t.modalPrice}</TableHead>
              <TableHead className="font-semibold">{t.date}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {records.map((record, index) => (
              <TableRow key={`${record.market}-${record.commodity}-${index}`} className="hover:bg-muted/30">
                <TableCell>
                  <div className="font-medium">{record.commodity}</div>
                  {record.variety && record.variety !== 'Other' && (
                    <div className="text-xs text-muted-foreground">{record.variety}</div>
                  )}
                </TableCell>
                <TableCell>{record.market}</TableCell>
                <TableCell>
                  <div>{record.district}</div>
                  <div className="text-xs text-muted-foreground">{record.state}</div>
                </TableCell>
                <TableCell className="text-right font-mono">₹{formatPrice(record.min_price)}</TableCell>
                <TableCell className="text-right font-mono">₹{formatPrice(record.max_price)}</TableCell>
                <TableCell className="text-right font-mono font-semibold text-primary">
                  ₹{formatPrice(record.modal_price)}
                </TableCell>
                <TableCell className="text-sm">{formatDate(record.arrival_date)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-3">
        {records.map((record, index) => (
          <Card key={`${record.market}-${record.commodity}-${index}`} className="overflow-hidden">
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-semibold text-foreground">{record.commodity}</h3>
                  {record.variety && record.variety !== 'Other' && (
                    <p className="text-xs text-muted-foreground">{record.variety}</p>
                  )}
                </div>
                <Badge variant="outline" className="text-xs">
                  {commodityFamilyLabels[getCommodityFamily(record.commodity)]}
                </Badge>
              </div>
              
              <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                <div>
                  <span className="text-muted-foreground">{t.market}:</span>
                  <span className="ml-1 font-medium">{record.market}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">{t.district}:</span>
                  <span className="ml-1">{record.district}</span>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-2 bg-muted/50 rounded-lg p-3">
                <div className="text-center">
                  <div className="text-xs text-muted-foreground">{t.minPrice}</div>
                  <div className="font-mono font-medium">₹{formatPrice(record.min_price)}</div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-muted-foreground">{t.maxPrice}</div>
                  <div className="font-mono font-medium">₹{formatPrice(record.max_price)}</div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-muted-foreground">{t.modalPrice}</div>
                  <div className="font-mono font-semibold text-primary">₹{formatPrice(record.modal_price)}</div>
                </div>
              </div>
              
              <div className="mt-3 text-xs text-muted-foreground text-right">
                {formatDate(record.arrival_date)}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
