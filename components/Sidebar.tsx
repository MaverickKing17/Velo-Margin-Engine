
import React from 'react';
import { Filter, ChevronDown, CheckCircle, Wallet, ShieldCheck, Flag, Zap, Award } from 'lucide-react';
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
    <aside className="w-full lg:w-72 border-r border-white/10 bg-midnight-royal/20 backdrop-blur-xl p-6 overflow-y-auto max-h-[calc(100vh-104px)] custom-scrollbar lg:sticky lg:top-[104px] z-40">
      <div className="flex items-center gap-3 mb-10 pb-4 border-b border-white/5">
        <div className="p-2 bg-electric-gold/10 rounded-lg">
          <Filter className="w-4 h-4 text-electric-gold" />
        </div>
        <h2 className="font-display font-bold text-[11px] uppercase tracking-[0.25em] text-white/90">Sourcing Metrics</h2>
      </div>

      <div className="space-y-10">
        {/* Zero-Tariff Premium Card */}
        <section className="relative group">
          <button 
            onClick={() => setFilters(prev => ({ ...prev, zeroTariffOnly: !prev.zeroTariffOnly }))}
            className={`w-full text-left rounded-2xl border-[0.5px] p-5 transition-all duration-500 overflow-hidden relative ${
              filters.zeroTariffOnly 
                ? 'bg-gradient-to-br from-electric-gold/20 to-transparent border-electric-gold shadow-[0_20px_40px_rgba(255,215,0,0.15)] scale-[1.02]' 
                : 'bg-white/5 border-white/10 hover:border-white/20'
            }`}
          >
            {/* Shimmer Effect */}
            {filters.zeroTariffOnly && (
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite] pointer-events-none"></div>
            )}
            
            <div className="flex justify-between items-start mb-4">
              <div className={`p-2 rounded-lg ${filters.zeroTariffOnly ? 'bg-electric-gold text-midnight-indigo' : 'bg-white/10 text-white/40'}`}>
                <Flag className="w-4 h-4" />
              </div>
              {filters.zeroTariffOnly && (
                <span className="text-[8px] font-black bg-electric-gold/20 text-electric-gold px-2 py-0.5 rounded-full border border-electric-gold/30 tracking-widest uppercase">
                  ACTIVE
                </span>
              )}
            </div>

            <h3 className={`text-xs font-bold tracking-widest uppercase mb-1 ${filters.zeroTariffOnly ? 'text-electric-gold' : 'text-white'}`}>
              Zero-Tariff Only
            </h3>
            <p className="text-[9px] text-slate-400 font-medium tracking-wide leading-relaxed">
              Identify units qualifying for "Domestic Return" 0% duty status.
            </p>
            
            <div className={`mt-4 flex items-center gap-2 text-[9px] font-black tracking-tighter ${filters.zeroTariffOnly ? 'text-electric-gold' : 'text-slate-500'}`}>
              <Award className="w-3 h-3" /> US-MADE CHASSIS ONLY
            </div>
          </button>
        </section>

        {/* Max Monthly Target Slider */}
        <section className="space-y-6 px-1">
          <div className="flex justify-between items-end">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                <Wallet className="w-3 h-3" /> Monthly Target
              </label>
              <div className="text-[10px] text-slate-400 font-medium">Financing Limit (CAD)</div>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-xl font-mono font-bold text-white tracking-tighter">${filters.maxMonthlyPayment.toLocaleString()}</span>
              <span className="text-[8px] text-captivating-blue font-black uppercase tracking-tighter">Adjustable Pulse</span>
            </div>
          </div>
          
          <div className="relative pt-2">
            <input 
              type="range" 
              min="1000" 
              max="15000" 
              step="500"
              value={filters.maxMonthlyPayment}
              onChange={(e) => setFilters(prev => ({ ...prev, maxMonthlyPayment: parseInt(e.target.value) }))}
              className="w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer accent-captivating-blue hover:accent-white transition-all"
            />
            <div className="flex justify-between mt-3 px-1">
              <span className="text-[8px] font-black text-slate-600">$1k</span>
              <span className="text-[8px] font-black text-slate-600">$7.5k</span>
              <span className="text-[8px] font-black text-slate-600">$15k</span>
            </div>
          </div>
        </section>

        {/* CPO Toggle - Refined Badge Style */}
        <section>
          <button 
            onClick={() => setFilters(prev => ({ ...prev, cpoOnly: !prev.cpoOnly }))}
            className={`w-full py-4 px-5 rounded-2xl border-[0.5px] text-[10px] font-bold uppercase tracking-[0.15em] transition-all flex items-center justify-between group ${
              filters.cpoOnly 
                ? 'bg-emerald-green/10 border-emerald-green text-emerald-green shadow-lg shadow-emerald-green/5' 
                : 'bg-white/5 border-white/10 text-slate-400 hover:border-white/30'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`p-1.5 rounded-md transition-colors ${filters.cpoOnly ? 'bg-emerald-green text-midnight-indigo' : 'bg-white/10 group-hover:bg-white/20'}`}>
                <ShieldCheck className="w-3.5 h-3.5" />
              </div>
              <span>Filter by CPO</span>
            </div>
            <div className={`w-2 h-2 rounded-full ${filters.cpoOnly ? 'bg-emerald-green animate-pulse shadow-[0_0_8px_#50C878]' : 'bg-white/10'}`}></div>
          </button>
        </section>

        <div className="pt-4 border-t border-white/5 space-y-8">
          {/* Makes */}
          <section>
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-5 block">Manufacturer</label>
            <div className="grid grid-cols-1 gap-1.5">
              {MAKES.map(make => (
                <label key={make} className="flex items-center justify-between p-2.5 rounded-xl text-sm text-slate-400 hover:text-white hover:bg-white/5 cursor-pointer group transition-all">
                  <div className="flex items-center gap-3">
                    <input 
                      type="checkbox" 
                      className="hidden"
                      checked={filters.makes.includes(make)}
                      onChange={() => setFilters(prev => ({ ...prev, makes: toggleSelection(prev.makes, make) }))}
                    />
                    <div className={`w-4 h-4 rounded-md border flex items-center justify-center transition-all ${filters.makes.includes(make) ? 'bg-captivating-blue border-captivating-blue' : 'border-white/20 group-hover:border-white/40'}`}>
                      {filters.makes.includes(make) && <CheckCircle className="w-3 h-3 text-white" />}
                    </div>
                    <span className="font-semibold tracking-tight text-xs">{make}</span>
                  </div>
                </label>
              ))}
            </div>
          </section>

          {/* Regional Hubs */}
          <section>
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-5 block">Regional Hubs</label>
            <div className="grid grid-cols-1 gap-1.5">
              {REGIONS.map(region => (
                <label key={region} className="flex items-center justify-between p-2.5 rounded-xl text-sm text-slate-400 hover:text-white hover:bg-white/5 cursor-pointer group transition-all">
                  <div className="flex items-center gap-3">
                    <input 
                      type="checkbox" 
                      className="hidden"
                      checked={filters.regions.includes(region)}
                      onChange={() => setFilters(prev => ({ ...prev, regions: toggleSelection(prev.regions, region) }))}
                    />
                    <div className={`w-4 h-4 rounded-md border flex items-center justify-center transition-all ${filters.regions.includes(region) ? 'bg-electric-gold border-electric-gold' : 'border-white/20 group-hover:border-white/40'}`}>
                      {filters.regions.includes(region) && <CheckCircle className="w-3 h-3 text-white" />}
                    </div>
                    <span className="font-semibold tracking-tight text-xs">{region}</span>
                  </div>
                </label>
              ))}
            </div>
          </section>
        </div>

        {/* Arbitrage Threshold Slider */}
        <section className="space-y-5">
          <div className="flex justify-between items-center">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Arbitrage Floor</label>
            <span className="text-sm font-mono font-black text-electric-gold bg-electric-gold/10 px-2 py-1 rounded border border-electric-gold/20">{filters.minVibeScore}%+</span>
          </div>
          <input 
            type="range" 
            min="0" 
            max="100" 
            value={filters.minVibeScore}
            onChange={(e) => setFilters(prev => ({ ...prev, minVibeScore: parseInt(e.target.value) }))}
            className="w-full accent-electric-gold h-1 bg-white/10 rounded-lg appearance-none cursor-pointer"
          />
        </section>

        {/* Reset Action */}
        <button 
          onClick={() => setFilters({
            searchQuery: '', makes: [], minPrice: 0, maxPrice: 1000000, 
            maxMonthlyPayment: 15000, cpoOnly: false, zeroTariffOnly: false,
            minYear: 2000, maxYear: 2025, minVibeScore: 0, regions: [], rarityKeywords: []
          })}
          className="w-full py-4 mt-4 bg-transparent border border-white/10 text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 hover:text-white hover:border-white hover:bg-white/5 transition-all rounded-2xl shadow-inner active:scale-[0.98]"
        >
          Factory Reset Filters
        </button>
      </div>
      
      {/* Custom styles for the slider and marquee */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
        input[type='range']::-webkit-slider-thumb {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #00A4EF;
          cursor: pointer;
          border: 3px solid #0F172A;
          box-shadow: 0 0 10px rgba(0, 164, 239, 0.4);
        }
        input[type='range']:hover::-webkit-slider-thumb {
          background: #FFFFFF;
          box-shadow: 0 0 15px rgba(255, 255, 255, 0.5);
        }
      `}} />
    </aside>
  );
};

export default Sidebar;
