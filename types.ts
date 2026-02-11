
export interface PricePoint {
  date: string;
  price: number;
}

export interface CarListing {
  id: string;
  title: string;
  make: string;
  model: string;
  year: number;
  trim: string;
  odometer: number; // KM
  price: number; // CAD
  location: string;
  dealerName: string;
  originalUrl: string;
  imageUrl: string;
  description: string;
  vibeScore: number;
  aiInsights: string[];
  rarityKeywords: string[];
  region: string;
  vin: string;
  usExportProfitCad: number;
  isExportSuitable: boolean;
  // 2026 Audit Features
  cpoStatus: boolean;
  hiddenSoftwareValueCad: number; 
  recallStatus: 'Clear' | 'Action Required';
  daysToTurnGta: number;
  daysToTurnUs: number;
  vehicleHealthScore: number; 
  priceHistory: PricePoint[];
  monthlyPaymentCad: number; 
  priceDelta7d: number; 
  scrapeTimestamp: string;
  // Zero-Tariff Extensions
  originCountryCode?: string; // 'USA' | 'DEU' | 'ITA' | 'GBR'
}

export interface FilterState {
  searchQuery: string;
  makes: string[];
  minPrice: number;
  maxPrice: number;
  maxMonthlyPayment: number;
  minYear: number;
  maxYear: number;
  minVibeScore: number;
  regions: string[];
  rarityKeywords: string[];
  cpoOnly: boolean;
  zeroTariffOnly: boolean; // New Sidebar Filter
}

export enum VibeCategory {
  High = 'high',
  Good = 'good',
  Standard = 'standard'
}
