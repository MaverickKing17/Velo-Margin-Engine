
import React, { useState, useMemo } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import TopBar from './components/TopBar';
import Sidebar from './components/Sidebar';
import ListingCard, { calculate2026Settlement } from './components/ListingCard';
import Footer from './components/Footer';
import ArbitrageTicker from './components/ArbitrageTicker';
import StatBar from './components/StatBar';
import FlipCalculatorModal from './components/FlipCalculatorModal';
import { MOCK_LISTINGS } from './constants';
import { FilterState, CarListing } from './types';
import { Loader2, AlertTriangle, CheckCircle2 } from 'lucide-react';

const Dashboard: React.FC = () => {
  const [listings] = useState<CarListing[]>(MOCK_LISTINGS);
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: '',
    makes: [],
    minPrice: 0,
    maxPrice: 5000000,
    maxMonthlyPayment: 15000,
    minYear: 2000,
    maxYear: 2025,
    minVibeScore: 0,
    regions: [],
    rarityKeywords: [],
    cpoOnly: false,
    zeroTariffOnly: false
  });

  const [prequalifying, setPrequalifying] = useState<CarListing | null>(null);
  const [showNotification, setShowNotification] = useState<string | null>(null);
  const [selectedCalcCar, setSelectedCalcCar] = useState<CarListing | null>(null);

  const filteredListings = useMemo(() => {
    return listings.filter(car => {
      const { isUsMade } = calculate2026Settlement(car.price, car.vin);
      
      const searchTarget = `${car.title} ${car.region} ${car.location} ${car.vin}`.toLowerCase();
      const matchesSearch = searchTarget.includes(filters.searchQuery.toLowerCase());
      
      const matchesMake = filters.makes.length === 0 || filters.makes.includes(car.make);
      const matchesRegion = filters.regions.length === 0 || filters.regions.includes(car.region);
      const matchesCPO = !filters.cpoOnly || car.cpoStatus;
      const matchesZeroTariff = !filters.zeroTariffOnly || isUsMade;
      
      // Multiplier logic (+15 for Zero-Tariff)
      const effectiveVibeScore = isUsMade ? Math.min(100, car.vibeScore + 15) : car.vibeScore;
      const matchesVibe = effectiveVibeScore >= filters.minVibeScore;
      
      return matchesSearch && matchesMake && matchesRegion && matchesVibe && matchesCPO && matchesZeroTariff;
    }).sort((a, b) => {
      // Re-apply multiplier for sorting
      const scoreA = ['1','4','5'].includes(a.vin.charAt(0)) ? a.vibeScore + 15 : a.vibeScore;
      const scoreB = ['1','4','5'].includes(b.vin.charAt(0)) ? b.vibeScore + 15 : b.vibeScore;
      return scoreB - scoreA;
    });
  }, [filters, listings]);

  const goldSpecCount = useMemo(() => {
    return listings.filter(car => ['1','4','5'].includes(car.vin.charAt(0))).length;
  }, [listings]);

  const totalPotentialUsd = useMemo(() => {
    return filteredListings.reduce((acc, car) => acc + calculate2026Settlement(car.price, car.vin).totalUsd, 0);
  }, [filteredListings]);

  const handlePrequalify = async (car: CarListing) => {
    const settlement = calculate2026Settlement(car.price, car.vin);
    setPrequalifying(car);
    try {
      // Simulate sending origin_label and tariff_savings to Voiceflow
      console.log("Voiceflow Payload:", { 
        origin_label: settlement.originLabel, 
        tariff_savings: settlement.tariffSavings,
        vin: car.vin 
      });
      await new Promise(resolve => setTimeout(resolve, 1500));
      setShowNotification(`Voiceflow AI Notified: US-Export Margin ($${settlement.tariffSavings}) Locked.`);
      setTimeout(() => setShowNotification(null), 5000);
    } catch (err) {
      console.error(err);
    } finally {
      setPrequalifying(null);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <ArbitrageTicker goldSpecCount={goldSpecCount} />
      <TopBar 
        onSearch={(q) => setFilters(prev => ({ ...prev, searchQuery: q }))} 
        activeAlertsCount={goldSpecCount}
        totalOpportunities={filteredListings.length}
      />
      
      <div className="flex flex-col lg:flex-row flex-1">
        <Sidebar filters={filters} setFilters={setFilters} />
        
        <main className="flex-1 p-6 lg:p-10">
          <header className="mb-6">
            <h2 className="text-4xl font-display font-bold text-white tracking-tight">Luxury Sourcing Feed</h2>
            <p className="text-gray-300 text-lg mt-1 font-medium tracking-wide opacity-80 uppercase tracking-widest">
              GTA Sourcing Hub • <span className="text-deep-gold">2026 Zero-Tariff Audit</span>
            </p>
          </header>

          <StatBar 
            totalInventory={listings.length}
            highYieldLeads={listings.filter(c => ['1','4','5'].includes(c.vin.charAt(0))).length}
            exportPotentialUsd={totalPotentialUsd}
          />

          <div className="grid grid-cols-1 gap-12 mb-24 max-w-7xl">
            {filteredListings.length > 0 ? (
              filteredListings.map(car => (
                <ListingCard 
                  key={car.id} 
                  car={car} 
                  onPrequalify={handlePrequalify}
                  onOpenCalculator={(c) => setSelectedCalcCar(c)}
                />
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-48 glass-effect rounded-[2.5rem] border-0.5 border-dashed border-silver-frost">
                <AlertTriangle className="w-20 h-20 text-gray-600 mb-8" />
                <p className="text-gray-300 text-2xl font-bold tracking-tight">No units matching high-yield arbitrage criteria.</p>
                <button 
                  onClick={() => setFilters({
                    searchQuery: '', makes: [], minPrice: 0, maxPrice: 5000000, 
                    maxMonthlyPayment: 15000, cpoOnly: false, zeroTariffOnly: false,
                    minYear: 2000, maxYear: 2025, minVibeScore: 0, regions: [], rarityKeywords: []
                  })}
                  className="mt-8 px-10 py-4 bg-obsidian-matte border border-silver-frost rounded-xl text-deep-gold text-xs font-black uppercase tracking-[0.2em] hover:bg-white hover:text-obsidian-matte transition-all"
                >
                  RESTART ARBITRAGE SCAN
                </button>
              </div>
            )}
          </div>
        </main>
      </div>

      <Footer onLegalClick={() => {}} />

      {selectedCalcCar && (
        <FlipCalculatorModal 
          car={selectedCalcCar} 
          onClose={() => setSelectedCalcCar(null)} 
        />
      )}

      {prequalifying && (
        <div className="fixed inset-0 bg-obsidian-matte/95 backdrop-blur-xl z-[100] flex flex-col items-center justify-center animate-in fade-in">
          <div className="bg-obsidian-matte p-16 rounded-[3rem] border-0.5 border-deep-gold/40 flex flex-col items-center max-w-lg text-center shadow-[0_0_100px_rgba(212,175,55,0.15)]">
            <Loader2 className="w-20 h-20 text-deep-gold animate-spin mb-10" />
            <h3 className="text-3xl font-display font-bold mb-4 text-white tracking-tight uppercase">
              VOICEFLOW PROTOCOL
            </h3>
            <p className="text-gray-400 text-lg font-mono opacity-70">
              SYNCHRONIZING TARIFF SAVINGS DATA...
            </p>
          </div>
        </div>
      )}

      {showNotification && (
        <div className="fixed bottom-12 right-12 z-[110] animate-in slide-in-from-right-full duration-700">
          <div className="bg-emerald-green text-obsidian-matte px-10 py-6 rounded-3xl shadow-2xl flex items-center gap-6 border border-white/40">
            <CheckCircle2 className="w-10 h-10" />
            <span className="text-lg font-black tracking-tight uppercase">{showNotification}</span>
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
