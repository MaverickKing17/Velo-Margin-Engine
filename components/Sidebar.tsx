
import React from 'react';
import { Filter, ChevronDown, CheckCircle, Wallet, ShieldCheck, Flag } from 'lucide-react';
import { MAKES, REGIONS, RARITY_KEYWORDS } from '../constants';
import { FilterState } from '../types';

interface SidebarProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
}

const Sidebar: React.FC<SidebarProps> = ({ filters, setFilters }) => {
  const toggleSelection = <T,>(list: T[], item: T): T[] => {
    return list.includes(item) ? list.filter(i => i !== item) : [...list, item];
  };

  return (
    <aside className="w-full lg:w-72 border-r border-silver-frost glass-effect p-6 overflow-y-auto max-h-[calc(100vh-104px)] scrollbar-hide lg:sticky lg:top-[104px]">
      <div className="flex items-center gap-2 mb-8">
        <Filter className="w-4 h-4 text-deep-gold" />
        <h2 className="font-display font-bold text-xs uppercase tracking-[0.2em] text-white">Sourcing Metrics</h2>
      </div>

      <div className="space-y-8">
        {/* Zero-Tariff Toggle (v5 PDF Update) */}
        <section>
          <button 
            onClick={() => setFilters(prev => ({ ...prev, zeroTariffOnly: !prev.zeroTariffOnly }))}
            className={`w-full py-4 px-4 rounded-xl border-[0.5px] text-[10px] font-black uppercase tracking-widest transition-all flex flex-col items-center justify-center gap-2 ${
              filters.zeroTariffOnly ? 'bg-electric-gold/20 border-electric-gold text-electric-gold shadow-[0_0_20px_rgba(255,215,0,0.25)]' : 'bg-white/5 border-silver-frost text-gray-400'
            }`}
          >
            <div className="flex items-center gap-2">
              <Flag className={`w-4 h-4 ${filters.zeroTariffOnly ? 'animate-bounce' : ''}`} /> 
              {filters.zeroTariffOnly ? 'ZERO-TARIFF ACTIVE' : 'ZERO-TARIFF ONLY'}
            </div>
            <span className="text-[8px] opacity-70">(US-MADE VEHICLES)</span>
          </button>
        </section>

        {/* Monthly Payment Filter (2026 Audit) */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest flex items-center gap-1">
              <Wallet className="w-3 h-3" /> Max Monthly Target
            </label>
            <span className="text-xs font-mono font-bold text-electric-blue">${filters.maxMonthlyPayment.toLocaleString()}</span>
          </div>
          <input 
            type="range" 
            min="1000" 
            max="15000" 
            step="500"
            value={filters.maxMonthlyPayment}
            onChange={(e) => setFilters(prev => ({ ...prev, maxMonthlyPayment: parseInt(e.target.value) }))}
            className="w-full accent-electric-blue h-1 bg-border-gray rounded-lg appearance-none cursor-pointer"
          />
        </section>

        {/* CPO Toggle */}
        <section>
          <button 
            onClick={() => setFilters(prev => ({ ...prev, cpoOnly: !prev.cpoOnly }))}
            className={`w-full py-2.5 px-4 rounded-lg border-[0.5px] text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${
              filters.cpoOnly ? 'bg-emerald-accent/20 border-emerald-accent text-emerald-accent' : 'bg-white/5 border-silver-frost text-gray-400'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" /> {filters.cpoOnly ? 'CPO ONLY ACTIVE' : 'FILTER BY CPO'}
          </button>
        </section>

        {/* Makes */}
        <section>
          <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-4 block">Manufacturer</label>
          <div className="space-y-2.5">
            {MAKES.map(make => (
              <label key={make} className="flex items-center gap-3 text-sm text-gray-400 hover:text-white cursor-pointer group transition-colors">
                <input 
                  type="checkbox" 
                  className="hidden"
                  checked={filters.makes.includes(make)}
                  onChange={() => setFilters(prev => ({ ...prev, makes: toggleSelection(prev.makes, make) }))}
                />
                <div className={`w-4 h-4 rounded border-[0.5px] flex items-center justify-center transition-all ${filters.makes.includes(make) ? 'bg-electric-blue border-electric-blue' : 'border-silver-frost group-hover:border-gray-500'}`}>
                  {filters.makes.includes(make) && <CheckCircle className="w-3 h-3 text-white" />}
                </div>
                <span className="font-medium tracking-tight">{make}</span>
              </label>
            ))}
          </div>
        </section>

        {/* GTA Region */}
        <section>
          <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-4 block">Regional Hubs</label>
          <div className="space-y-2.5">
            {REGIONS.map(region => (
              <label key={region} className="flex items-center gap-3 text-sm text-gray-400 hover:text-white cursor-pointer group transition-colors">
                <input 
                  type="checkbox" 
                  className="hidden"
                  checked={filters.regions.includes(region)}
                  onChange={() => setFilters(prev => ({ ...prev, regions: toggleSelection(prev.regions, region) }))}
                />
                <div className={`w-4 h-4 rounded border-[0.5px] flex items-center justify-center transition-all ${filters.regions.includes(region) ? 'bg-deep-gold border-deep-gold' : 'border-silver-frost group-hover:border-gray-500'}`}>
                  {filters.regions.includes(region) && <CheckCircle className="w-3 h-3 text-white" />}
                </div>
                <span className="font-medium tracking-tight">{region}</span>
              </label>
            ))}
          </div>
        </section>

        {/* Vibe Score Slider */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Arbitrage Threshold</label>
            <span className="text-xs font-mono font-bold text-deep-gold">{filters.minVibeScore}+</span>
          </div>
          <input 
            type="range" 
            min="0" 
            max="100" 
            value={filters.minVibeScore}
            onChange={(e) => setFilters(prev => ({ ...prev, minVibeScore: parseInt(e.target.value) }))}
            className="w-full accent-deep-gold h-1 bg-border-gray rounded-lg appearance-none cursor-pointer"
          />
        </section>

        {/* Reset */}
        <button 
          onClick={() => setFilters({
            searchQuery: '', makes: [], minPrice: 0, maxPrice: 1000000, 
            maxMonthlyPayment: 15000, cpoOnly: false, zeroTariffOnly: false,
            minYear: 2000, maxYear: 2025, minVibeScore: 0, regions: [], rarityKeywords: []
          })}
          className="w-full py-3 bg-white/5 border border-silver-frost text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-white hover:border-white transition-all rounded-lg"
        >
          CLEAR ALL FILTERS
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
