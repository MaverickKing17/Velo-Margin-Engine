
import React from 'react';
import { Search, Bell, User, Zap, TrendingUp } from 'lucide-react';

interface TopBarProps {
  onSearch: (q: string) => void;
  activeAlertsCount: number;
  totalOpportunities: number;
}

const TopBar: React.FC<TopBarProps> = ({ onSearch, activeAlertsCount, totalOpportunities }) => {
  return (
    <div className="h-16 border-b border-border-gray bg-luxury-dark/80 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-50">
      <div className="flex items-center gap-8 flex-1">
        <h1 className="font-display font-bold text-xl text-deep-gold tracking-wider hidden md:block">
          EXOTIC INTEL <span className="text-white">GTA</span>
        </h1>
        
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
          <input 
            type="text" 
            placeholder="Search by make, model, or rarity..."
            className="bg-luxury-card border border-border-gray text-white text-sm rounded-full py-2 pl-10 pr-4 w-full focus:outline-none focus:border-electric-blue transition-colors"
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="hidden lg:flex items-center gap-4 border-r border-border-gray pr-6">
          <div className="flex flex-col items-end">
            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Active Alerts</span>
            <div className="flex items-center gap-1.5 text-electric-blue font-bold">
              <Bell className="w-3.5 h-3.5" />
              <span>{activeAlertsCount}</span>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Opportunities Found</span>
            <div className="flex items-center gap-1.5 text-emerald-accent font-bold">
              <Zap className="w-3.5 h-3.5" />
              <span>{totalOpportunities}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 cursor-pointer group">
          <div className="w-8 h-8 rounded-full bg-border-gray flex items-center justify-center group-hover:bg-luxury-card transition-colors border border-transparent group-hover:border-deep-gold">
            <User className="w-4 h-4 text-gray-400 group-hover:text-deep-gold" />
          </div>
          <span className="text-sm font-medium text-gray-300 hidden sm:block">Broker Admin</span>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
