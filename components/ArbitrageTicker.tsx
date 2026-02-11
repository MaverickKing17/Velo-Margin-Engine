
import React from 'react';
import { Activity, TrendingUp, RefreshCcw, DollarSign } from 'lucide-react';

const ArbitrageTicker: React.FC = () => {
  return (
    <div className="w-full h-12 bg-deep-royal sticky top-0 z-[60] overflow-hidden flex items-center shadow-2xl border-b border-white/20">
      <div className="animate-marquee whitespace-nowrap flex items-center gap-16 font-microsoft text-sm uppercase font-semibold text-white px-6">
        <span className="flex items-center gap-2.5">
          <Activity className="w-4 h-4 text-deep-gold" />
          Hagerty Hundred Index: <span className="text-green-signal font-bold">1,244.52</span> <span className="text-[11px] font-bold opacity-80">(+0.42%)</span>
        </span>
        <span className="flex items-center gap-2.5">
          <DollarSign className="w-4 h-4 text-deep-gold" />
          CAD/USD: <span className="text-white font-bold">1.3542</span> <span className="text-red-500 text-[11px] font-bold">(-0.11%)</span>
        </span>
        <span className="flex items-center gap-2.5">
          <TrendingUp className="w-4 h-4 text-deep-gold" />
          Porsche 911 (992): <span className="text-green-signal font-bold">+1.2% in GTA</span>
        </span>
        <span className="flex items-center gap-2.5">
          <TrendingUp className="w-4 h-4 text-deep-gold" />
          Ferrari SF90: <span className="text-white font-bold">-0.4% in GTA</span>
        </span>
        <span className="flex items-center gap-2.5">
          <TrendingUp className="w-4 h-4 text-deep-gold" />
          McLaren 720S: <span className="text-green-signal font-bold">+2.8% in GTA</span>
        </span>
        <span className="flex items-center gap-2.5">
          <RefreshCcw className="w-4 h-4 text-deep-gold animate-spin-slow" />
          AutoTrader Feed: <span className="text-white font-bold">LIVE SCRAPE (2m ago)</span>
        </span>
        
        {/* Duplicate for seamless loop */}
        <span className="flex items-center gap-2.5">
          <Activity className="w-4 h-4 text-deep-gold" />
          Hagerty Hundred Index: <span className="text-green-signal font-bold">1,244.52</span>
        </span>
        <span className="flex items-center gap-2.5">
          <DollarSign className="w-4 h-4 text-deep-gold" />
          CAD/USD: <span className="text-white font-bold">1.3542</span>
        </span>
        <span className="flex items-center gap-2.5">
          <TrendingUp className="w-4 h-4 text-deep-gold" />
          Porsche 911 (992): <span className="text-green-signal font-bold">+1.2% in GTA</span>
        </span>
      </div>
    </div>
  );
};

export default ArbitrageTicker;