
import { CarListing } from './types';

export const MAKES = [
  'Porsche', 'Ferrari', 'Lamborghini', 'McLaren', 'Aston Martin', 
  'Rolls-Royce', 'Bentley', 'Mercedes-AMG', 'BMW M'
];

export const REGIONS = [
  'Downtown Toronto', 'Vaughan', 'Oakville', 'Mississauga', 'Richmond Hill', 'Markham'
];

export const RARITY_KEYWORDS = [
  'PTS', 'Weissach', 'Manual', 'Carbon Ceramics', 'Track Package', 
  'Low Miles', 'CPO', 'Full Leather', 'Exclusive Manufaktur', 'OTA-Ready'
];

export const MOCK_LISTINGS: CarListing[] = [
  {
    id: '1',
    title: '2022 Porsche 911 GT3 (Shark Blue)',
    make: 'Porsche',
    model: '911 GT3',
    year: 2022,
    trim: 'PDK',
    odometer: 5000,
    price: 315000,
    location: 'Vaughan, ON',
    region: 'Vaughan',
    dealerName: 'Pfaff Porsche',
    originalUrl: 'https://www.autotrader.ca/placeholder1',
    imageUrl: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=1200',
    description: 'Launch color Shark Blue. Collector grade mileage. Full front PPF. Steel brakes, 18-way seats.',
    vibeScore: 97,
    aiInsights: ['Hero Color Premium', 'Collector Grade Miles', 'High US Demand'],
    rarityKeywords: ['Low Miles', 'OTA-Ready'],
    usExportProfitCad: 45000,
    vin: 'WP0AF2A97PS28xxxx',
    isExportSuitable: true,
    cpoStatus: true,
    hiddenSoftwareValueCad: 8500,
    recallStatus: 'Clear',
    daysToTurnGta: 18,
    daysToTurnUs: 9,
    vehicleHealthScore: 98,
    monthlyPaymentCad: 4850,
    priceDelta7d: -2.4,
    scrapeTimestamp: new Date().toISOString(),
    priceHistory: [
      { date: '2024-01-01', price: 325000 },
      { date: '2024-02-15', price: 315000 }
    ]
  },
  {
    id: '5',
    title: '2019 Porsche 911 GT3 Touring',
    make: 'Porsche',
    model: '911 GT3',
    year: 2019,
    trim: 'Touring',
    odometer: 15200,
    price: 295000,
    location: 'Richmond Hill, ON',
    region: 'Richmond Hill',
    dealerName: 'Private Seller',
    originalUrl: 'https://www.autotrader.ca/placeholder5',
    imageUrl: 'https://images.unsplash.com/photo-1611821064430-0d40291d0f0b?auto=format&fit=crop&q=80&w=1200',
    description: 'Manual 6-speed Touring. Brewster Green (PTS). Exceptional condition.',
    vibeScore: 98,
    aiInsights: ['Brewster Green PTS', 'Manual Transmission', 'Underpriced'],
    rarityKeywords: ['PTS', 'Manual', 'Full Leather'],
    usExportProfitCad: 48000,
    vin: 'WP0AC2A94KS16xxxx',
    isExportSuitable: true,
    cpoStatus: false,
    hiddenSoftwareValueCad: 0,
    recallStatus: 'Clear',
    daysToTurnGta: 22,
    daysToTurnUs: 11,
    vehicleHealthScore: 94,
    monthlyPaymentCad: 4200,
    priceDelta7d: 0.0,
    scrapeTimestamp: new Date().toISOString(),
    priceHistory: [
      { date: '2023-12-01', price: 305000 },
      { date: '2024-03-01', price: 295000 }
    ]
  },
  {
    id: '3',
    title: '2022 McLaren 765LT Spider',
    make: 'McLaren',
    model: '765LT',
    year: 2022,
    trim: 'Spider',
    odometer: 900,
    price: 649000,
    location: 'Oakville, ON',
    region: 'Oakville',
    dealerName: 'McLaren Toronto',
    originalUrl: 'https://www.autotrader.ca/placeholder3',
    imageUrl: 'https://images.unsplash.com/photo-1621135802920-133df287f89c?auto=format&fit=crop&q=80&w=1200',
    description: '1 of 765. MSO Defined Ceramic Grey. Absolute monster for the track.',
    vibeScore: 91,
    aiInsights: ['Limited Run', 'MSO Defined', 'Track Package'],
    rarityKeywords: ['Track Package', 'Low Miles'],
    usExportProfitCad: 51200,
    vin: 'SBM13BCA7NW00xxxx',
    isExportSuitable: true,
    cpoStatus: true,
    hiddenSoftwareValueCad: 12500,
    recallStatus: 'Clear',
    daysToTurnGta: 45,
    daysToTurnUs: 15,
    vehicleHealthScore: 99,
    monthlyPaymentCad: 8900,
    priceDelta7d: -1.2,
    scrapeTimestamp: new Date().toISOString(),
    priceHistory: [
      { date: '2024-01-10', price: 659000 },
      { date: '2024-02-28', price: 649000 }
    ]
  }
];