
import React, { useState, useEffect, useMemo } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import TopBar from './components/TopBar';
import Sidebar from './components/Sidebar';
import ListingCard from './components/ListingCard';
import { MOCK_LISTINGS } from './constants';
import { FilterState, CarListing } from './types';
import { Loader2, AlertTriangle, CheckCircle2 } from 'lucide-react';

const Dashboard: React.FC = () => {
  const [listings, setListings] = useState<CarListing[]>(MOCK_LISTINGS);
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: '',
    makes: [],
    minPrice: 0,
    maxPrice: 1000000,
    minYear: 2000,
    maxYear: 2025,
    minVibeScore: 0,
    regions: [],
    rarityKeywords: []
  });

  const [prequalifying, setPrequalifying] = useState<CarListing | null>(null);
  const [showNotification, setShowNotification] = useState<string | null>(null);

  const filteredListings = useMemo(() => {
    return listings.filter(car => {
      const matchesSearch = car.title.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
                          car.make.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
                          car.model.toLowerCase().includes(filters.searchQuery.toLowerCase());
      
      const matchesMake = filters.makes.length === 0 || filters.makes.includes(car.make);
      const matchesRegion = filters.regions.length === 0 || filters.regions.includes(car.region);
      const matchesVibe = car.vibeScore >= filters.minVibeScore;
      
      const matchesKeywords = filters.rarityKeywords.length === 0 || 
                             filters.rarityKeywords.some(k => car.rarityKeywords.includes(k));

      return matchesSearch && matchesMake && matchesRegion && matchesVibe && matchesKeywords;
    }).sort((a, b) => b.vibeScore - a.vibeScore);
  }, [filters, listings]);

  const handlePrequalify = async (car: CarListing) => {
    setPrequalifying(car);
    
    // Simulate Voiceflow Webhook Call
    try {
      console.log(`Triggering Voiceflow Webhook for: ${car.title}`);
      // In a real app: await fetch('/api/voiceflow-webhook', { method: 'POST', body: JSON.stringify(car) });
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      setShowNotification(`Voiceflow AI Prequalification Agent initialized for ${car.make} ${car.model}`);
      setTimeout(() => setShowNotification(null), 5000);
    } catch (err) {
      console.error(err);
    } finally {
      setPrequalifying(null);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-luxury-dark text-white">
      <TopBar 
        onSearch={(q) => setFilters(prev => ({ ...prev, searchQuery: q }))} 
        activeAlertsCount={4}
        totalOpportunities={filteredListings.length}
      />
      
      <div className="flex flex-col lg:flex-row flex-1">
        <Sidebar filters={filters} setFilters={setFilters} />
        
        <main className="flex-1 p-6 bg-luxury-dark/50">
          <header className="mb-8 flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-display font-bold">Luxury Sourcing Feed</h2>
              <p className="text-gray-500 text-sm">Real-time GTA arbitrage data & US export analysis.</p>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-bold text-gray-500 uppercase">Market Health</span>
              <p className="text-emerald-accent font-bold">Bullish +4.2%</p>
            </div>
          </header>

          <div className="grid grid-cols-1 gap-6">
            {filteredListings.length > 0 ? (
              filteredListings.map(car => (
                <ListingCard 
                  key={car.id} 
                  car={car} 
                  onPrequalify={handlePrequalify} 
                />
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-20 bg-luxury-card rounded-xl border border-dashed border-border-gray">
                <AlertTriangle className="w-12 h-12 text-gray-700 mb-4" />
                <p className="text-gray-500 font-medium">No luxury listings matching your current criteria.</p>
                <button 
                  onClick={() => setFilters({
                    searchQuery: '', makes: [], minPrice: 0, maxPrice: 1000000, 
                    minYear: 2000, maxYear: 2025, minVibeScore: 0, regions: [], rarityKeywords: []
                  })}
                  className="mt-4 text-electric-blue text-sm font-bold hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Overlay Loading */}
      {prequalifying && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex flex-col items-center justify-center">
          <div className="bg-luxury-card p-8 rounded-2xl border border-deep-gold/50 flex flex-col items-center max-w-sm text-center shadow-2xl shadow-deep-gold/10">
            <Loader2 className="w-12 h-12 text-deep-gold animate-spin mb-6" />
            <h3 className="text-xl font-display font-bold mb-2">Connecting Voiceflow Agent</h3>
            <p className="text-gray-400 text-sm mb-4">
              Syncing {prequalifying.year} {prequalifying.make} data for lead qualification logic...
            </p>
          </div>
        </div>
      )}

      {/* Notification Toast */}
      {showNotification && (
        <div className="fixed bottom-6 right-6 z-[110] animate-in slide-in-from-right-full">
          <div className="bg-emerald-accent text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5" />
            <span className="text-sm font-bold">{showNotification}</span>
          </div>
        </div>
      )}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
