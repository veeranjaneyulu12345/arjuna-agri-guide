export interface MarketPriceRecord {
  state: string;
  district: string;
  market: string;
  commodity: string;
  variety: string;
  grade: string;
  arrival_date: string;
  min_price: number;
  max_price: number;
  modal_price: number;
}

export interface AgmarknetApiResponse {
  index_name: string;
  title: string;
  desc: string;
  org_type: string;
  source: string;
  sector: string;
  catalog_uuid: string;
  message: string;
  version: string;
  status: string;
  total: number;
  count: number;
  limit: string;
  offset: string;
  records: RawMarketRecord[];
  field: FieldInfo[];
  updated: number;
  updated_date: string;
  created: number;
  created_date: string;
  active: string;
  visualizable: string;
  target_bucket: {
    field: string;
    type: string;
    index: string;
  };
}

export interface RawMarketRecord {
  state: string;
  district: string;
  market: string;
  commodity: string;
  variety: string;
  grade: string;
  arrival_date: string;
  min_price: string;
  max_price: string;
  modal_price: string;
}

export interface FieldInfo {
  id: string;
  name: string;
  type: string;
}

export interface MarketPriceFilters {
  state: string;
  district: string;
  commodityFamily: string;
  searchQuery: string;
}

export interface PaginationState {
  page: number;
  pageSize: number;
  total: number;
}
