
import React, { useState, useEffect, useMemo } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import TopBar from './components/TopBar';
import Sidebar from './components/Sidebar';
import ListingCard from './components/ListingCard';
import Footer from './components/Footer';
import { MOCK_LISTINGS } from './constants';
import { FilterState, CarListing } from './types';
import { Loader2, AlertTriangle, CheckCircle2, TrendingUp, X } from 'lucide-react';

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
  const [activeLegalTab, setActiveLegalTab] = useState<string | null>(null);

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
      await new Promise(resolve => setTimeout(resolve, 2000));
      setShowNotification(`Market Appraisal Complete: ${car.title} valued at $${(car.price * 1.05).toLocaleString()} US Retail.`);
      setTimeout(() => setShowNotification(null), 6000);
    } catch (err) {
      console.error(err);
    } finally {
      setAppraising(null);
    }
  };

  const getLegalContent = (tab: string) => {
    switch (tab) {
      case 'Privacy Policy':
        return "Exotic Intel GTA is committed to protecting the sensitive financial data of our brokers. We use AES-256 encryption for all VIN-related queries and arbitrage logs. Your data is never sold to third-party dealerships.";
      case 'Terms of Service':
        return "By using the 2026 Audit Dashboard, you agree to treat all FoD (Feature-on-Demand) scores as estimates. Profit calculations are based on live FX feeds which may fluctuate during settlement.";
      case 'DMCA Compliance':
        return "We respect intellectual property. All vehicle images are sourced via authorized API channels or dealership partnerships. For takedown requests, contact legal@exoticgta.ca.";
      case 'Cookie Policy':
        return "We use session-based cookies to remember your sourcing filters and brokerage preferences across Vaughan and Oakville regional hubs.";
      case 'Export Compliance 2.0':
        return "Our platform automatically cross-references NHTSA recall databases and EPA federalization standards for all units marked as 'Export Suitable'.";
      case 'Customer Support':
        return "Our dedicated broker support line is available 24/7. For technical issues with the Voiceflow integration or live appraisal tool, please submit a ticket at help.exoticgta.ca.";
      default:
        return "Content pending verification from GTA Legal Group.";
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
              <h2 className="text-3xl font-display font-bold text-white">Luxury Sourcing Feed</h2>
              <p className="text-gray-300 text-base mt-1 font-medium tracking-wide">2026 Audit Ready: Premium Arbitrage & Logistics.</p>
            </div>
            <div className="flex items-center gap-6 bg-luxury-card p-5 rounded-2xl border border-border-gray shadow-xl">
              <div className="text-right">
                <span className="text-xs font-black text-gray-400 uppercase tracking-widest">2026 GTA Market</span>
                <p className="text-emerald-accent text-lg font-black flex items-center gap-1 justify-end">
                  <TrendingUp className="w-4 h-4" /> Bullish +4.2%
                </p>
              </div>
              <div className="h-12 w-px bg-border-gray"></div>
              <div className="text-right">
                <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Broker Yield</span>
                <p className="text-electric-blue text-lg font-black">$12.4k Avg/Unit</p>
              </div>
            </div>
          </header>

          <div className="grid grid-cols-1 gap-10 mb-20">
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
              <div className="flex flex-col items-center justify-center py-40 bg-luxury-card rounded-3xl border border-dashed border-border-gray">
                <AlertTriangle className="w-16 h-16 text-gray-600 mb-6" />
                <p className="text-gray-300 text-lg font-bold">No units matching high-yield arbitrage criteria.</p>
                <button 
                  onClick={() => setFilters({
                    searchQuery: '', makes: [], minPrice: 0, maxPrice: 1000000, 
                    maxMonthlyPayment: 15000, cpoOnly: false,
                    minYear: 2000, maxYear: 2025, minVibeScore: 0, regions: [], rarityKeywords: []
                  })}
                  className="mt-6 px-8 py-3 bg-luxury-dark border border-border-gray rounded-xl text-electric-blue text-sm font-black uppercase hover:bg-border-gray transition-all"
                >
                  Reset Arbitrage Engine
                </button>
              </div>
            )}
          </div>
        </main>
      </div>

      <Footer onLegalClick={(tab) => setActiveLegalTab(tab)} />

      {/* Legal Content Modal */}
      {activeLegalTab && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-xl z-[200] flex items-center justify-center p-6 animate-in fade-in">
          <div className="bg-luxury-card w-full max-w-2xl rounded-3xl border border-deep-gold/30 p-10 shadow-2xl relative">
            <button 
              onClick={() => setActiveLegalTab(null)}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/10 transition-colors"
            >
              <X className="w-6 h-6 text-gray-400" />
            </button>
            <h2 className="text-3xl font-display font-bold text-deep-gold mb-6">{activeLegalTab}</h2>
            <div className="text-gray-200 text-lg leading-relaxed font-medium">
              {getLegalContent(activeLegalTab)}
            </div>
            <div className="mt-10 flex justify-end">
              <button 
                onClick={() => setActiveLegalTab(null)}
                className="px-8 py-3 bg-deep-gold text-luxury-dark font-black uppercase rounded-xl hover:bg-white transition-all text-sm"
              >
                Close Audit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Overlay Loading (Prequal & Appraisal) */}
      {(prequalifying || appraising) && (
        <div className="fixed inset-0 bg-luxury-dark/90 backdrop-blur-md z-[100] flex flex-col items-center justify-center animate-in fade-in">
          <div className="bg-luxury-card p-12 rounded-3xl border border-deep-gold/30 flex flex-col items-center max-w-md text-center shadow-2xl">
            <Loader2 className="w-16 h-16 text-deep-gold animate-spin mb-8" />
            <h3 className="text-2xl font-display font-bold mb-3 text-white">
              {prequalifying ? 'Syncing Omnichannel Thread' : 'Calculating Real-Time Appraisal'}
            </h3>
            <p className="text-gray-300 text-base leading-relaxed font-medium">
              {prequalifying 
                ? `Syncing 2026 Voiceflow Agent for ${prequalifying.title}...` 
                : `Fetching global retail comps for ${appraising?.title}...`}
            </p>
          </div>
        </div>
      )}

      {/* Notification Toast */}
      {showNotification && (
        <div className="fixed bottom-12 right-12 z-[110] animate-in slide-in-from-bottom-full duration-500">
          <div className="bg-emerald-accent text-white px-10 py-6 rounded-3xl shadow-[0_30px_60px_rgba(16,185,129,0.4)] flex items-center gap-5 border border-white/20">
            <CheckCircle2 className="w-8 h-8" />
            <span className="text-lg font-black tracking-tight">{showNotification}</span>
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
