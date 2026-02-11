
import React from 'react';
import { Package, TrendingUp, DollarSign } from 'lucide-react';

interface StatBarProps {
  totalInventory: number;
  highYieldLeads: number;
  exportPotentialUsd: number;
}

const StatBar: React.FC<StatBarProps> = ({ totalInventory, highYieldLeads, exportPotentialUsd }) => {
  return (
    <div className="w-full bg-obsidian-matte/60 border-y border-silver-frost/20 py-4 px-6 flex justify-around items-center glass-effect mb-8">
      <div className="flex flex-col items-center">
        <div className="flex items-center gap-2 text-gray-400 text-[10px] font-black uppercase tracking-widest mb-1">
          <Package className="w-3 h-3" /> Total Inventory
        </div>
        <p className="text-2xl font-mono font-bold text-white">{totalInventory}</p>
      </div>
      <div className="w-px h-10 bg-silver-frost/10"></div>
      <div className="flex flex-col items-center">
        <div className="flex items-center gap-2 text-gray-400 text-[10px] font-black uppercase tracking-widest mb-1">
          <TrendingUp className="w-3 h-3 text-emerald-green" /> High-Yield Leads
        </div>
        <p className="text-2xl font-mono font-bold text-emerald-green">{highYieldLeads}</p>
      </div>
      <div className="w-px h-10 bg-silver-frost/10"></div>
      <div className="flex flex-col items-center">
        <div className="flex items-center gap-2 text-gray-400 text-[10px] font-black uppercase tracking-widest mb-1">
          <DollarSign className="w-3 h-3 text-electric-gold" /> US Export Potential
        </div>
        <p className="text-2xl font-mono font-bold text-electric-gold">
          ${exportPotentialUsd.toLocaleString()} <span className="text-[10px] ml-1">USD</span>
        </p>
      </div>
    </div>
  );
};

export default StatBar;