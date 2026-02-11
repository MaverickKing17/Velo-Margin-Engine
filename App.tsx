
import React, { useState, useEffect, useMemo } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import TopBar from './components/TopBar';
import Sidebar from './components/Sidebar';
import ListingCard from './components/ListingCard';
import Footer from './components/Footer';
import { MOCK_LISTINGS } from './constants';
import { FilterState, CarListing } from './types';
import { Loader2, AlertTriangle, CheckCircle2, TrendingUp } from 'lucide-react';

const Dashboard: React.FC = () => {
  const [listings, setListings] = useState<CarListing[]>(MOCK_LISTINGS);
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: '',
    makes: [],
    minPrice: 0,
    maxPrice: 1000000,
    maxMonthlyPayment: 15000,
    minYear: 2000,
    maxYear: 2025,
    minVibeScore: 0,
    regions: [],
    rarityKeywords: [],
    cpoOnly: false
  });

  const [prequalifying, setPrequalifying] = useState<CarListing | null>(null);
  const [appraising, setAppraising] = useState<CarListing | null>(null);
  const [showNotification, setShowNotification] = useState<string | null>(null);

  const filteredListings = useMemo(() => {
    return listings.filter(car => {
      const matchesSearch = car.title.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
                          car.make.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
                          car.model.toLowerCase().includes(filters.searchQuery.toLowerCase());
      
      const matchesMake = filters.makes.length === 0 || filters.makes.includes(car.make);
      const matchesRegion = filters.regions.length === 0 || filters.regions.includes(car.region);
      const matchesVibe = car.vibeScore >= filters.minVibeScore;
      const matchesCPO = !filters.cpoOnly || car.cpoStatus;
      const matchesPayment = car.monthlyPaymentCad <= filters.maxMonthlyPayment;
      
      const matchesKeywords = filters.rarityKeywords.length === 0 || 
                             filters.rarityKeywords.some(k => car.rarityKeywords.includes(k));

      return matchesSearch && matchesMake && matchesRegion && matchesVibe && matchesKeywords && matchesCPO && matchesPayment;
    }).sort((a, b) => b.vibeScore - a.vibeScore);
  }, [filters, listings]);

  const handlePrequalify = async (car: CarListing) => {
    setPrequalifying(car);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setShowNotification(`Voiceflow AI synced with ${car.make} CRM - Lead ID Generated.`);
      setTimeout(() => setShowNotification(null), 5000);
    } catch (err) {
      console.error(err);
    } finally {
      setPrequalifying(null);
    }
  };

  const handleAppraisal = async (car: CarListing) => {
    setAppraising(car);
    try {
      // Simulate real-time appraisal valuation
      await new Promise(resolve => setTimeout(resolve, 2000));
      setShowNotification(`Market Appraisal Complete: ${car.title} valued at $${(car.price * 1.05).toLocaleString()} US Retail.`);
      setTimeout(() => setShowNotification(null), 6000);
    } catch (err) {
      console.error(err);
    } finally {
      setAppraising(null);
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
        
        <main className="flex-1 p-6 bg-luxury-dark/30">
          <header className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h2 className="text-2xl font-display font-bold">Luxury Sourcing Feed</h2>
              <p className="text-gray-400 text-sm">2026 Audit Ready: Premium Arbitrage & Logistics.</p>
            </div>
            <div className="flex items-center gap-4 bg-luxury-card/50 p-4 rounded-xl border border-border-gray">
              <div className="text-right">
                <span className="text-[10px] font-bold text-gray-500 uppercase">2026 GTA Market</span>
                <p className="text-emerald-accent font-bold flex items-center gap-1 justify-end">
                  <TrendingUp className="w-3 h-3" /> Bullish +4.2%
                </p>
              </div>
              <div className="h-10 w-px bg-border-gray"></div>
              <div className="text-right">
                <span className="text-[10px] font-bold text-gray-500 uppercase">Broker Yield</span>
                <p className="text-electric-blue font-bold">$12.4k Avg/Unit</p>
              </div>
            </div>
          </header>

          <div className="grid grid-cols-1 gap-8 mb-16">
            {filteredListings.length > 0 ? (
              filteredListings.map(car => (
                <ListingCard 
                  key={car.id} 
                  car={car} 
                  onPrequalify={handlePrequalify}
                  onAppraisal={handleAppraisal}
                />
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-32 bg-luxury-card/50 rounded-2xl border border-dashed border-border-gray">
                <AlertTriangle className="w-12 h-12 text-gray-700 mb-4" />
                <p className="text-gray-500 font-medium">No units matching high-yield arbitrage criteria.</p>
                <button 
                  onClick={() => setFilters({
                    searchQuery: '', makes: [], minPrice: 0, maxPrice: 1000000, 
                    maxMonthlyPayment: 15000, cpoOnly: false,
                    minYear: 2000, maxYear: 2025, minVibeScore: 0, regions: [], rarityKeywords: []
                  })}
                  className="mt-4 px-6 py-2 bg-luxury-card border border-border-gray rounded-lg text-electric-blue text-xs font-bold hover:bg-border-gray transition-all"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </main>
      </div>

      <Footer />

      {/* Overlay Loading (Prequal & Appraisal) */}
      {(prequalifying || appraising) && (
        <div className="fixed inset-0 bg-luxury-dark/80 backdrop-blur-md z-[100] flex flex-col items-center justify-center animate-in fade-in">
          <div className="bg-luxury-card p-10 rounded-2xl border border-deep-gold/30 flex flex-col items-center max-w-sm text-center shadow-2xl">
            <Loader2 className="w-14 h-14 text-deep-gold animate-spin mb-6" />
            <h3 className="text-xl font-display font-bold mb-2">
              {prequalifying ? 'Syncing Omnichannel Thread' : 'Calculating Real-Time Appraisal'}
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              {prequalifying 
                ? `Syncing 2026 Voiceflow Agent for ${prequalifying.title}...` 
                : `Fetching global retail comps for ${appraising?.title}...`}
            </p>
          </div>
        </div>
      )}

      {/* Notification Toast */}
      {showNotification && (
        <div className="fixed bottom-10 right-10 z-[110] animate-in slide-in-from-bottom-full duration-500">
          <div className="bg-emerald-accent/90 backdrop-blur-md text-white px-8 py-5 rounded-2xl shadow-[0_20px_50px_rgba(16,185,129,0.3)] flex items-center gap-4 border border-white/20">
            <CheckCircle2 className="w-6 h-6" />
            <span className="text-sm font-bold tracking-tight">{showNotification}</span>
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
