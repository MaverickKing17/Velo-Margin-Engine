
import React, { useState, useEffect, useMemo } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import TopBar from './components/TopBar';
import Sidebar from './components/Sidebar';
import ListingCard from './components/ListingCard';
import Footer from './components/Footer';
import ArbitrageTicker from './components/ArbitrageTicker';
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
    <div className="flex flex-col min-h-screen">
      <ArbitrageTicker />
      <TopBar 
        onSearch={(q) => setFilters(prev => ({ ...prev, searchQuery: q }))} 
        activeAlertsCount={12}
        totalOpportunities={filteredListings.length}
      />
      
      <div className="flex flex-col lg:flex-row flex-1">
        <Sidebar filters={filters} setFilters={setFilters} />
        
        <main className="flex-1 p-6 lg:p-10">
          <header className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <h2 className="text-4xl font-display font-bold text-white tracking-tight">Luxury Sourcing Feed</h2>
              <p className="text-gray-300 text-lg mt-2 font-medium tracking-wide opacity-80">Institutional grade data for GTA market arbitrage.</p>
            </div>
            <div className="flex items-center gap-8 bg-obsidian-matte/60 glass-effect p-6 rounded-2xl border-[0.5px] border-silver-frost shadow-2xl">
              <div className="text-right">
                <span className="text-xs font-black text-gray-500 uppercase tracking-widest">GTA BULLISHNESS</span>
                <p className="text-green-signal text-xl font-mono font-bold flex items-center gap-2 justify-end mt-1">
                  <TrendingUp className="w-5 h-5" /> +4.2%
                </p>
              </div>
              <div className="h-14 w-px bg-silver-frost"></div>
              <div className="text-right">
                <span className="text-xs font-black text-gray-500 uppercase tracking-widest">AVG BROKER YIELD</span>
                <p className="text-electric-blue text-xl font-mono font-bold mt-1">$12,450</p>
              </div>
            </div>
          </header>

          <div className="grid grid-cols-1 gap-12 mb-24 max-w-7xl">
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
              <div className="flex flex-col items-center justify-center py-48 glass-effect rounded-[2rem] border-[0.5px] border-dashed border-silver-frost">
                <AlertTriangle className="w-20 h-20 text-gray-600 mb-8" />
                <p className="text-gray-300 text-2xl font-bold tracking-tight">No high-yield matches in current live feed.</p>
                <button 
                  onClick={() => setFilters({
                    searchQuery: '', makes: [], minPrice: 0, maxPrice: 1000000, 
                    maxMonthlyPayment: 15000, cpoOnly: false,
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

      <Footer onLegalClick={(tab) => setActiveLegalTab(tab)} />

      {/* Legal Content Modal */}
      {activeLegalTab && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-2xl z-[200] flex items-center justify-center p-6 animate-in fade-in">
          <div className="bg-obsidian-matte w-full max-w-2xl rounded-[2.5rem] border-[0.5px] border-deep-gold/30 p-12 shadow-2xl relative">
            <button 
              onClick={() => setActiveLegalTab(null)}
              className="absolute top-8 right-8 p-3 rounded-full hover:bg-white/10 transition-colors border border-silver-frost"
            >
              <X className="w-6 h-6 text-gray-400" />
            </button>
            <div className="flex flex-col items-center mb-10 text-center">
              {getIcon(activeLegalTab)}
              <h2 className="text-4xl font-display font-bold text-white tracking-tight">{activeLegalTab}</h2>
              <div className="w-24 h-1 bg-deep-gold mt-6 rounded-full"></div>
            </div>
            <div className="text-gray-300 text-lg leading-relaxed font-medium overflow-y-auto max-h-[50vh] pr-4 whitespace-pre-line custom-scrollbar">
              {getLegalContent(activeLegalTab)}
            </div>
            <div className="mt-12 flex justify-center">
              <button 
                onClick={() => setActiveLegalTab(null)}
                className="px-12 py-5 bg-deep-gold hover:bg-white text-obsidian-matte font-black uppercase rounded-2xl transition-all text-xs tracking-[0.3em] shadow-2xl shadow-deep-gold/20"
              >
                CLOSE AUDIT
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Overlay Loading (Prequal & Appraisal) */}
      {(prequalifying || appraising) && (
        <div className="fixed inset-0 bg-obsidian-matte/95 backdrop-blur-xl z-[100] flex flex-col items-center justify-center animate-in fade-in">
          <div className="bg-obsidian-matte p-16 rounded-[3rem] border-[0.5px] border-deep-gold/40 flex flex-col items-center max-w-lg text-center shadow-[0_0_100px_rgba(212,175,55,0.15)]">
            <Loader2 className="w-20 h-20 text-deep-gold animate-spin mb-10" />
            <h3 className="text-3xl font-display font-bold mb-4 text-white tracking-tight uppercase">
              {prequalifying ? 'OMNICHANNEL SYNC' : 'QUANT COMPILATION'}
            </h3>
            <p className="text-gray-400 text-lg leading-relaxed font-mono opacity-70">
              {prequalifying 
                ? `ESTABLISHING 2026 VOICEFLOW PROTOCOL FOR ${prequalifying.title}...` 
                : `FETCHING GLOBAL RETAIL COMPS FOR ${appraising?.title}...`}
            </p>
          </div>
        </div>
      )}

      {/* Notification Toast */}
      {showNotification && (
        <div className="fixed bottom-12 right-12 z-[110] animate-in slide-in-from-right-full duration-700">
          <div className="bg-green-signal text-obsidian-matte px-10 py-6 rounded-[2rem] shadow-[0_40px_80px_rgba(0,255,65,0.3)] flex items-center gap-6 border border-white/40">
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