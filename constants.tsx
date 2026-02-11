
import { CarListing } from './types';

export const MAKES = [
  'Porsche', 'Ferrari', 'Lamborghini', 'McLaren', 'Aston Martin', 
  'Rolls-Royce', 'Bentley', 'Mercedes-AMG', 'BMW M', 'Ford GT'
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
    vin: 'WP0AF2A97PS28xxxx', // W = Germany
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
    priceHistory: [{ date: '2024-01-01', price: 325000 }, { date: '2024-02-15', price: 315000 }]
  },
  {
    id: '2',
    title: '2020 Ford GT Heritage Edition',
    make: 'Ford GT',
    model: 'Heritage',
    year: 2020,
    trim: 'Carbon',
    odometer: 1200,
    price: 1250000,
    location: 'Oakville, ON',
    region: 'Oakville',
    dealerName: 'Legendary Motorcar',
    originalUrl: 'https://www.autotrader.ca/placeholder2',
    imageUrl: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&q=80&w=1200',
    description: 'Ken Miles Heritage livery. 1 of 50. US-Made powerhouse returning home.',
    vibeScore: 85, // Will be boosted by +15 for Zero-Tariff
    aiInsights: ['US-Made Zero Tariff', 'Highest Margin Flip', 'Investment Grade'],
    rarityKeywords: ['Low Miles', 'Heritage'],
    usExportProfitCad: 220000,
    vin: '1FA6P8CF0L5xxxx', // 1 = USA (Zero Tariff)
    isExportSuitable: true,
    cpoStatus: false,
    hiddenSoftwareValueCad: 0,
    recallStatus: 'Clear',
    daysToTurnGta: 60,
    daysToTurnUs: 5,
    vehicleHealthScore: 100,
    monthlyPaymentCad: 14500,
    priceDelta7d: 0.0,
    scrapeTimestamp: new Date().toISOString(),
    priceHistory: [{ date: '2024-03-01', price: 1250000 }]
  },
  {
    id: '3',
    title: '2023 Ferrari 296 GTB',
    make: 'Ferrari',
    model: '296 GTB',
    year: 2023,
    trim: 'Assetto Fiorano',
    odometer: 800,
    price: 485000,
    location: 'Downtown Toronto, ON',
    region: 'Downtown Toronto',
    dealerName: 'Ferrari of Ontario',
    originalUrl: 'https://www.autotrader.ca/placeholder3',
    imageUrl: 'https://images.unsplash.com/photo-1592198084033-aade902d1aae?auto=format&fit=crop&q=80&w=1200',
    description: 'Bianco Cervino. Assetto Fiorano pack. Carbon wheels.',
    vibeScore: 92,
    aiInsights: ['Assetto Fiorano Pack', 'Hybrid Efficiency', 'New Model Demand'],
    rarityKeywords: ['Track Package'],
    usExportProfitCad: 62000,
    vin: 'ZFF89ALA1P0xxxx', // Z = Italy
    isExportSuitable: true,
    cpoStatus: true,
    hiddenSoftwareValueCad: 5000,
    recallStatus: 'Clear',
    daysToTurnGta: 35,
    daysToTurnUs: 12,
    vehicleHealthScore: 96,
    monthlyPaymentCad: 7200,
    priceDelta7d: -0.5,
    scrapeTimestamp: new Date().toISOString(),
    priceHistory: [{ date: '2024-02-01', price: 485000 }]
  }
];
