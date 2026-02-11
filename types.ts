
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
  vin?: string;
  usExportProfitCad: number;
}

export interface FilterState {
  searchQuery: string;
  makes: string[];
  minPrice: number;
  maxPrice: number;
  minYear: number;
  maxYear: number;
  minVibeScore: number;
  regions: string[];
  rarityKeywords: string[];
}

export enum VibeCategory {
  High = 'high',
  Good = 'good',
  Standard = 'standard'
}
