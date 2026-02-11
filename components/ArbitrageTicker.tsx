
import React from 'react';
import { TrendingDown, RefreshCcw, DollarSign, Activity, Zap } from 'lucide-react';

const ArbitrageTicker: React.FC = () => {
  return (
    <div className="w-full h-10 bg-brushed-aluminum sticky top-0 z-[60] overflow-hidden flex items-center shadow-lg border-b border-black/10">
      <div className="animate-marquee whitespace-nowrap flex items-center gap-16 font-mono text-xs uppercase font-bold text-dark-navy px-6">
        <span className="flex items-center gap-2">
          <DollarSign className="w-3.5 h-3.5" />
          CAD/USD: <span className="font-bold">0.737 (SPOT)</span>
        </span>
        <span className="flex items-center gap-2">
          <Activity className="w-3.5 h-3.5" />
          Hagerty Hundred: <span className="font-bold">43,408</span> <span className="text-brembo-red text-[10px]">(▼ 0.4%)</span>
        </span>
        <span className="flex items-center gap-2">
          <Zap className="w-3.5 h-3.5" />
          GTA Market Pulse: <span className="text-emerald-green font-black">VIBRANT</span>
        </span>
        <span className="flex items-center gap-2">
          <RefreshCcw className="w-3.5 h-3.5 animate-spin-slow" />
          Last Scrape: <span className="font-bold">2 mins ago</span>
        </span>
        
        {/* Duplicate for seamless loop */}
        <span className="flex items-center gap-2">
          <DollarSign className="w-3.5 h-3.5" />
          CAD/USD: 0.737 (SPOT)
        </span>
        <span className="flex items-center gap-2">
          <Activity className="w-3.5 h-3.5" />
          Hagerty Hundred: 43,408 (▼ 0.4%)
        </span>
        <span className="flex items-center gap-2">
          <Zap className="w-3.5 h-3.5" />
          GTA Market Pulse: VIBRANT
        </span>
      </div>
    </div>
  );
};

export default ArbitrageTicker;