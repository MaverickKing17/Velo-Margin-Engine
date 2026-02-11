
import React from 'react';
import { TrendingDown, RefreshCcw, DollarSign, Activity, Zap } from 'lucide-react';

const ArbitrageTicker: React.FC = () => {
  return (
    <div className="w-full h-14 bg-[#D8D9DA] sticky top-0 z-[60] overflow-hidden flex items-center shadow-xl border-b border-black/20">
      <div className="animate-marquee whitespace-nowrap flex items-center gap-20 font-microsoft text-sm uppercase font-bold text-dark-navy px-8">
        <span className="flex items-center gap-3">
          <DollarSign className="w-5 h-5 text-captivating-blue drop-shadow-sm" />
          <span className="tracking-tight">CAD/USD:</span> 
          <span className="text-microsoft-blue">0.737 (SPOT)</span>
        </span>
        <span className="flex items-center gap-3">
          <Activity className="w-5 h-5 text-captivating-blue drop-shadow-sm" />
          <span className="tracking-tight">Hagerty Hundred:</span> 
          <span className="text-dark-navy">43,408</span> 
          <span className="text-brembo-red font-black">(▼ 0.4%)</span>
        </span>
        <span className="flex items-center gap-3">
          <Zap className="w-5 h-5 text-captivating-blue drop-shadow-sm" />
          <span className="tracking-tight">GTA Market Pulse:</span> 
          <span className="text-emerald-green font-black drop-shadow-sm">VIBRANT</span>
        </span>
        <span className="flex items-center gap-3">
          <RefreshCcw className="w-5 h-5 text-captivating-blue animate-spin-slow" />
          <span className="tracking-tight">Last Scrape:</span> 
          <span className="text-microsoft-blue">2 mins ago</span>
        </span>
        
        {/* Duplicate for seamless loop */}
        <span className="flex items-center gap-3">
          <DollarSign className="w-5 h-5 text-captivating-blue drop-shadow-sm" />
          <span className="tracking-tight">CAD/USD:</span> 
          <span className="text-microsoft-blue">0.737 (SPOT)</span>
        </span>
        <span className="flex items-center gap-3">
          <Activity className="w-5 h-5 text-captivating-blue drop-shadow-sm" />
          <span className="tracking-tight">Hagerty Hundred:</span> 
          <span className="text-dark-navy">43,408</span> 
          <span className="text-brembo-red font-black">(▼ 0.4%)</span>
        </span>
        <span className="flex items-center gap-3">
          <Zap className="w-5 h-5 text-captivating-blue drop-shadow-sm" />
          <span className="tracking-tight">GTA Market Pulse:</span> 
          <span className="text-emerald-green font-black drop-shadow-sm">VIBRANT</span>
        </span>
      </div>
    </div>
  );
};

export default ArbitrageTicker;
