
import React from 'react';
import { Filter, ChevronDown, CheckCircle, Wallet, ShieldCheck } from 'lucide-react';
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
    <aside className="w-full lg:w-72 border-r border-border-gray bg-luxury-dark p-6 overflow-y-auto max-h-[calc(100vh-64px)] scrollbar-hide lg:sticky lg:top-16">
      <div className="flex items-center gap-2 mb-8">
        <Filter className="w-4 h-4 text-deep-gold" />
        <h2 className="font-display font-bold text-sm uppercase tracking-widest">Sourcing Filters</h2>
      </div>

      <div className="space-y-8">
        {/* Monthly Payment Filter (2026 Audit) */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <label className="text-[10px] font-bold text-gray-500 uppercase flex items-center gap-1">
              <Wallet className="w-3 h-3" /> Max Monthly Focus
            </label>
            <span className="text-xs font-bold text-electric-blue">${filters.maxMonthlyPayment.toLocaleString()}</span>
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
            className={`w-full py-2 px-4 rounded-lg border text-[10px] font-bold uppercase transition-all flex items-center justify-center gap-2 ${
              filters.cpoOnly ? 'bg-emerald-accent/20 border-emerald-accent text-emerald-accent' : 'bg-luxury-card border-border-gray text-gray-400'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" /> {filters.cpoOnly ? '2026 CPO ONLY: ON' : 'FILTER BY CPO'}
          </button>
        </section>

        {/* Makes */}
        <section>
          <label className="text-[10px] font-bold text-gray-500 uppercase mb-3 block">Manufacturer</label>
          <div className="space-y-2">
            {MAKES.map(make => (
              <label key={make} className="flex items-center gap-2 text-sm text-gray-400 hover:text-white cursor-pointer group">
                <input 
                  type="checkbox" 
                  className="hidden"
                  checked={filters.makes.includes(make)}
                  onChange={() => setFilters(prev => ({ ...prev, makes: toggleSelection(prev.makes, make) }))}
                />
                <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${filters.makes.includes(make) ? 'bg-electric-blue border-electric-blue' : 'border-border-gray group-hover:border-gray-500'}`}>
                  {filters.makes.includes(make) && <CheckCircle className="w-3 h-3 text-white" />}
                </div>
                {make}
              </label>
            ))}
          </div>
        </section>

        {/* GTA Region */}
        <section>
          <label className="text-[10px] font-bold text-gray-500 uppercase mb-3 block">GTA Region</label>
          <div className="space-y-2">
            {REGIONS.map(region => (
              <label key={region} className="flex items-center gap-2 text-sm text-gray-400 hover:text-white cursor-pointer group">
                <input 
                  type="checkbox" 
                  className="hidden"
                  checked={filters.regions.includes(region)}
                  onChange={() => setFilters(prev => ({ ...prev, regions: toggleSelection(prev.regions, region) }))}
                />
                <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${filters.regions.includes(region) ? 'bg-deep-gold border-deep-gold' : 'border-border-gray group-hover:border-gray-500'}`}>
                  {filters.regions.includes(region) && <CheckCircle className="w-3 h-3 text-white" />}
                </div>
                {region}
              </label>
            ))}
          </div>
        </section>

        {/* Vibe Score Slider */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <label className="text-[10px] font-bold text-gray-500 uppercase">Min Vibe Score</label>
            <span className="text-xs font-bold text-deep-gold">{filters.minVibeScore}+</span>
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
            maxMonthlyPayment: 15000, cpoOnly: false,
            minYear: 2000, maxYear: 2025, minVibeScore: 0, regions: [], rarityKeywords: []
          })}
          className="w-full py-2 bg-luxury-dark border border-border-gray text-[10px] font-bold uppercase tracking-widest text-gray-500 hover:text-white hover:border-white transition-all rounded"
        >
          Reset Filters
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
