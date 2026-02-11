
import React from 'react';
import { Activity, TrendingUp, RefreshCcw, DollarSign } from 'lucide-react';

const ArbitrageTicker: React.FC = () => {
  return (
    <div className="w-full h-10 bg-deep-royal sticky top-0 z-[60] overflow-hidden flex items-center shadow-xl border-b border-white/10">
      <div className="animate-marquee whitespace-nowrap flex items-center gap-12 font-mono text-xs uppercase font-bold text-white px-4">
        <span className="flex items-center gap-2">
          <Activity className="w-3.5 h-3.5 text-deep-gold" />
          Hagerty Hundred Index: <span className="text-green-signal">1,244.52</span> <span className="text-[10px] opacity-70">(+0.42%)</span>
        </span>
        <span className="flex items-center gap-2">
          <DollarSign className="w-3.5 h-3.5 text-deep-gold" />
          CAD/USD: <span className="text-white">1.3542</span> <span className="text-red-500 text-[10px]">(-0.11%)</span>
        </span>
        <span className="flex items-center gap-2">
          <TrendingUp className="w-3.5 h-3.5 text-deep-gold" />
          Porsche 911 (992): <span className="text-green-signal">+1.2% in GTA</span>
        </span>
        <span className="flex items-center gap-2">
          <TrendingUp className="w-3.5 h-3.5 text-deep-gold" />
          Ferrari SF90: <span className="text-white">-0.4% in GTA</span>
        </span>
        <span className="flex items-center gap-2">
          <TrendingUp className="w-3.5 h-3.5 text-deep-gold" />
          McLaren 720S: <span className="text-green-signal">+2.8% in GTA</span>
        </span>
        <span className="flex items-center gap-2">
          <RefreshCcw className="w-3.5 h-3.5 text-deep-gold animate-spin-slow" />
          AutoTrader Feed: <span className="text-white">LIVE SCAPE (2m ago)</span>
        </span>
        
        {/* Duplicate for seamless loop */}
        <span className="flex items-center gap-2">
          <Activity className="w-3.5 h-3.5 text-deep-gold" />
          Hagerty Hundred Index: <span className="text-green-signal">1,244.52</span>
        </span>
        <span className="flex items-center gap-2">
          <DollarSign className="w-3.5 h-3.5 text-deep-gold" />
          CAD/USD: <span className="text-white">1.3542</span>
        </span>
        <span className="flex items-center gap-2">
          <TrendingUp className="w-3.5 h-3.5 text-deep-gold" />
          Porsche 911 (992): <span className="text-green-signal">+1.2% in GTA</span>
        </span>
      </div>
    </div>
  );
};

export default ArbitrageTicker;