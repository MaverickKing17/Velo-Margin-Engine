
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
  'Low Miles', 'CPO', 'Full Leather', 'Exclusive Manufaktur'
];

export const MOCK_LISTINGS: CarListing[] = [
  {
    id: '1',
    title: '2023 Porsche 911 GT3 RS Weissach Package',
    make: 'Porsche',
    model: '911 GT3 RS',
    year: 2023,
    trim: 'Weissach',
    odometer: 1250,
    price: 485000,
    location: 'Vaughan, ON',
    region: 'Vaughan',
    dealerName: 'Pfaff Porsche',
    originalUrl: 'https://www.autotrader.ca/placeholder1',
    imageUrl: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=1200',
    description: 'Stunning GT3 RS in Shark Blue with the coveted Weissach Package. Magnesium wheels, PCCB, and carbon fiber throughout.',
    vibeScore: 94,
    aiInsights: ['Weissach Package', 'PTS Potential', '8% Below Market'],
    rarityKeywords: ['Weissach', 'Carbon Ceramics', 'Low Miles'],
    usExportProfitCad: 42500,
  },
  {
    id: '2',
    title: '2020 Ferrari 488 Pista Spider',
    make: 'Ferrari',
    model: '488 Pista',
    year: 2020,
    trim: 'Spider',
    odometer: 4800,
    price: 725000,
    location: 'Downtown Toronto, ON',
    region: 'Downtown Toronto',
    dealerName: 'Ferrari of Ontario',
    originalUrl: 'https://www.autotrader.ca/placeholder2',
    imageUrl: 'https://images.unsplash.com/photo-1592198084033-aade902d1aae?auto=format&fit=crop&q=80&w=1200',
    description: 'Tailor Made Ferrari 488 Pista Spider. Argento Nurburgring with Blu Nart racing stripe.',
    vibeScore: 88,
    aiInsights: ['Tailor Made', 'High US Demand', 'Rare Spec'],
    rarityKeywords: ['Full Leather', 'Carbon Ceramics'],
    usExportProfitCad: 68000,
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
  },
  {
    id: '4',
    title: '2021 Lamborghini Huracan STO',
    make: 'Lamborghini',
    model: 'Huracan STO',
    year: 2021,
    trim: 'STO',
    odometer: 2100,
    price: 499000,
    location: 'Mississauga, ON',
    region: 'Mississauga',
    dealerName: 'Grand Touring Automobiles',
    originalUrl: 'https://www.autotrader.ca/placeholder4',
    imageUrl: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&q=80&w=1200',
    description: 'The street-legal track car. Finished in Blu Laufey with Arancio Xanto accents.',
    vibeScore: 76,
    aiInsights: ['Solid Investment', 'CPO Warranty', '12% Margin'],
    rarityKeywords: ['Carbon Ceramics', 'CPO'],
    usExportProfitCad: 34000,
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
    imageUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1200',
    description: 'Manual 6-speed Touring. Brewster Green (PTS). Exceptional condition.',
    vibeScore: 98,
    aiInsights: ['Brewster Green PTS', 'Manual Transmission', 'Underpriced'],
    rarityKeywords: ['PTS', 'Manual', 'Full Leather'],
    usExportProfitCad: 48000,
  }
];
