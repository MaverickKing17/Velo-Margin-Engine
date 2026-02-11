
import React from 'react';
import { Search, Bell, User, Zap, TrendingUp } from 'lucide-react';

interface TopBarProps {
  onSearch: (q: string) => void;
  activeAlertsCount: number;
  totalOpportunities: number;
}

const TopBar: React.FC<TopBarProps> = ({ onSearch, activeAlertsCount, totalOpportunities }) => {
  return (
    <div className="h-16 border-b border-silver-frost glass-effect flex items-center justify-between px-6 sticky top-10 z-50 shadow-2xl">
      <div className="flex items-center gap-10 flex-1">
        <h1 className="font-display font-bold text-xl text-white tracking-[0.2em] hidden md:block">
          EXOTIC <span className="text-deep-gold">INTEL</span> GTA
        </h1>
        
        <div className="relative w-full max-w-lg">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
          <input 
            type="text" 
            placeholder="Search by model, chassis, or PTS color..."
            className="bg-obsidian-matte/50 border-[0.5px] border-silver-frost text-white text-sm rounded-xl py-2.5 pl-12 pr-4 w-full focus:outline-none focus:border-deep-gold transition-all"
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="flex items-center gap-8">
        <div className="hidden lg:flex items-center gap-6 border-r border-silver-frost pr-8">
          <div className="flex flex-col items-end">
            <span className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Signals Active</span>
            <div className="flex items-center gap-2 text-electric-blue font-mono font-bold">
              <Bell className="w-3.5 h-3.5" />
              <span>{activeAlertsCount}</span>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Yield Opps</span>
            <div className="flex items-center gap-2 text-green-signal font-mono font-bold">
              <Zap className="w-3.5 h-3.5" />
              <span>{totalOpportunities}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 cursor-pointer group">
          <div className="flex flex-col items-end hidden sm:flex">
            <span className="text-sm font-bold text-white tracking-tight">S. Henderson</span>
            <span className="text-[10px] text-deep-gold font-black uppercase tracking-tighter">Executive Broker</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-obsidian-matte flex items-center justify-center group-hover:bg-deep-gold transition-all border-[0.5px] border-silver-frost group-hover:border-white shadow-lg overflow-hidden relative">
             <User className="w-5 h-5 text-gray-400 group-hover:text-obsidian-matte transition-colors" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;