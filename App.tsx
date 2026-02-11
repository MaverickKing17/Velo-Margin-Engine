
import React, { useState, useEffect, useMemo } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import TopBar from './components/TopBar';
import Sidebar from './components/Sidebar';
import ListingCard from './components/ListingCard';
import Footer from './components/Footer';
import { MOCK_LISTINGS } from './constants';
import { FilterState, CarListing } from './types';
import { Loader2, AlertTriangle, CheckCircle2, TrendingUp, X, Shield, Scale, Info, HelpCircle } from 'lucide-react';

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
        return `Exotic Intel GTA (the "Platform") is committed to maintaining the highest standards of data integrity and broker confidentiality. In the 2026 regulatory landscape, we adhere strictly to the updated PIPEDA and GDPR+ protocols.

1. Data Encryption: All VIN-specific queries, arbitrage logs, and broker search histories are protected by AES-256 military-grade encryption.
2. Anonymization: Our AI-driven market analysis tools process vehicle data in an anonymized aggregate format to prevent the unauthorized identification of private sellers or specialized collection units.
3. Third-Party Sharing: We do not sell user data to third-party dealerships. Your "Hidden Value" sourcing leads are your proprietary assets.
4. Data Residency: All Platform data is hosted on secured servers located within the Greater Toronto Area (GTA) to ensure compliance with Canadian data sovereignty laws.`;
      case 'Terms of Service':
        return `By accessing the Exotic Intel GTA 2026 Audit Dashboard, you acknowledge and agree to the following operational parameters:

1. Estimates Only: All "FoD" (Feature-on-Demand) scores, software unlock values, and "DTT" (Days-to-Turn) predictors are generated via predictive AI models. These represent high-probability estimates and do not constitute a financial guarantee.
2. Market Volatility: Profit calculations are subject to the real-time CAD/USD settlement rate at the precise moment of border entry. Brokers are advised to use our volatility-locked FX tool for final settlement.
3. Usage Limits: This platform is licensed for professional brokerage use in the GTA region. Unauthorized scraping or distribution of our proprietary "Vibe Scores" is strictly prohibited.
4. Liability: Exotic Intel GTA shall not be held liable for mechanical discrepancies or undisclosed vehicle damage not present in the digital VIN-record at the time of sourcing.`;
      case 'DMCA Compliance':
        return `Exotic Intel GTA respects the intellectual property rights of all automotive photographers, dealerships, and marketing agencies.

1. Content Sourcing: Vehicle imagery displayed on this dashboard is sourced via authorized manufacturer API channels, dealership partner feeds, or open-market listings intended for public distribution.
2. Infringement Notification: If you believe your copyrighted material is being used without authorization, please submit a formal DMCA Takedown Notice to our legal team.
3. Required Information: Notices must include a description of the copyrighted work, the specific URL of the infringing content, and your direct contact information.
4. Resolution Process: We aim to resolve all verified DMCA claims within 48 business hours of receipt. Direct all inquiries to legal@exoticgta.ca.`;
      case 'Cookie Policy':
        return `Our platform utilizes advanced 2026 browser state management to provide a seamless sourcing experience.

1. Essential Cookies: Required for secure login, session persistence, and maintaining your real-time arbitrage filter states across regional hubs.
2. Analytics: We use anonymized telemetry to optimize dashboard performance and ensure our "Live Appraisal" tool maintains ultra-low latency.
3. Customization: These allow the platform to remember your manufacturer preferences (e.g., Porsche PTS focus) and preferred GTA sourcing regions (Yorkville vs Oakville).
4. Opt-Out: Users may disable non-essential cookies via their browser settings, though this may impact the accuracy of the "Days-to-Turn" predictor and personalized lead notifications.`;
      case 'Export Compliance 2.0':
        return `Export Compliance 2.0 is our proprietary framework for navigating the 2026 US-Canada automotive border regulations.

1. Recall Integration: Our system performs automated hourly checks against the NHTSA (National Highway Traffic Safety Administration) and Transport Canada databases for every VIN listed.
2. Federalization Standards: Units marked as "Export Suitable" have been pre-screened for EPA emissions compliance and FMVSS safety standards.
3. Title Conversion: We provide automated documentation prep for Form 1 and DOTHS-7 clearance, ensuring title conversion in the destination US state (e.g., Florida, California, or Texas) is frictionless.
4. Arbitrage Verification: Every "Eligible" badge is backed by a digital audit trail confirming the unit meets the strict 2026 criteria for high-margin cross-border transfer.`;
      case 'Customer Support':
        return `Exotic Intel GTA provides 24/7 Concierge Support for our elite broker network.

1. Technical Assistance: Our engineering team in Oakville is available to troubleshoot Voiceflow CRM integrations, API disconnects, or Telemetry data stream issues.
2. Market Intelligence: Access our "Master Broker" line for human-assisted verification on high-value "FoD" (Feature-on-Demand) hardware locks.
3. Logistics Support: Our Vaughan Logistics Hub provides real-time tracking for units currently in the export pipeline.
4. Contact Channels: 
   - Voice Concierge: +1 (888) EXOTIC-1
   - Digital Ticket: help.exoticgta.ca
   - Physical Inquiries: Visit our Yorkville Office at 100 Yorkville Ave.`;
      default:
        return "Content pending verification from GTA Legal Group.";
    }
  };

  const getIcon = (tab: string) => {
    switch (tab) {
      case 'Privacy Policy': return <Shield className="w-8 h-8 text-emerald-accent mb-4" />;
      case 'Terms of Service': return <Scale className="w-8 h-8 text-deep-gold mb-4" />;
      case 'DMCA Compliance': return <Info className="w-8 h-8 text-electric-blue mb-4" />;
      case 'Cookie Policy': return <Info className="w-8 h-8 text-gray-400 mb-4" />;
      case 'Export Compliance 2.0': return <TrendingUp className="w-8 h-8 text-emerald-accent mb-4" />;
      case 'Customer Support': return <HelpCircle className="w-8 h-8 text-electric-blue mb-4" />;
      default: return <Info className="w-8 h-8 text-white mb-4" />;
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
            <div className="flex flex-col items-center mb-8 text-center">
              {getIcon(activeLegalTab)}
              <h2 className="text-3xl font-display font-bold text-deep-gold">{activeLegalTab}</h2>
              <div className="w-16 h-1 bg-border-gray mt-4 rounded-full"></div>
            </div>
            <div className="text-gray-200 text-lg leading-relaxed font-medium overflow-y-auto max-h-[60vh] pr-4 whitespace-pre-line">
              {getLegalContent(activeLegalTab)}
            </div>
            <div className="mt-10 flex justify-end">
              <button 
                onClick={() => setActiveLegalTab(null)}
                className="px-8 py-4 bg-deep-gold hover:bg-white text-luxury-dark font-black uppercase rounded-xl transition-all text-sm tracking-widest shadow-lg shadow-deep-gold/10"
              >
                CLOSE AUDIT
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
