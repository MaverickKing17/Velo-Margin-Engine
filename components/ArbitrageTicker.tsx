
import React from 'react';
import { TrendingDown, RefreshCcw, DollarSign, Activity, Zap } from 'lucide-react';

const ArbitrageTicker: React.FC = () => {
  return (
    <div className="w-full h-20 bg-gradient-to-r from-[#D1D5DB] via-[#E5E7EB] to-[#D1D5DB] sticky top-0 z-[60] overflow-hidden flex items-center shadow-[0_4px_30px_rgba(0,0,0,0.3)] border-b-2 border-white/30">
      {/* Glossy Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none"></div>
      
      <div className="animate-marquee whitespace-nowrap flex items-center gap-24 font-microsoft uppercase font-black text-dark-navy px-12">
        <span className="flex items-center gap-4 group">
          <DollarSign className="w-7 h-7 text-captivating-blue drop-shadow-[0_0_8px_rgba(0,164,239,0.5)] group-hover:scale-110 transition-transform" />
          <span className="text-sm tracking-tighter opacity-70">CAD/USD</span> 
          <span className="text-2xl font-black text-microsoft-blue drop-shadow-sm">0.737</span>
          <span className="text-xs bg-microsoft-blue/10 px-2 py-0.5 rounded text-microsoft-blue border border-microsoft-blue/20">SPOT</span>
        </span>

        <span className="flex items-center gap-4 group">
          <Activity className="w-7 h-7 text-captivating-blue drop-shadow-[0_0_8px_rgba(0,164,239,0.5)] group-hover:scale-110 transition-transform" />
          <span className="text-sm tracking-tighter opacity-70">HAGERTY 100</span> 
          <span className="text-2xl font-black text-dark-navy">43,408</span> 
          <span className="text-lg text-brembo-red drop-shadow-[0_0_5px_rgba(227,6,19,0.3)] animate-pulse">▼ 0.4%</span>
        </span>

        <span className="flex items-center gap-4 group">
          <Zap className="w-7 h-7 text-captivating-blue drop-shadow-[0_0_8px_rgba(0,164,239,0.5)] group-hover:scale-110 transition-transform" />
          <span className="text-sm tracking-tighter opacity-70">GTA PULSE</span> 
          <span className="text-2xl font-black text-emerald-green drop-shadow-[0_0_12px_rgba(80,200,120,0.4)]">VIBRANT</span>
        </span>

        <span className="flex items-center gap-4 group">
          <RefreshCcw className="w-7 h-7 text-captivating-blue animate-spin-slow drop-shadow-[0_0_8px_rgba(0,164,239,0.5)]" />
          <span className="text-sm tracking-tighter opacity-70">SCRAPE</span> 
          <span className="text-2xl font-black text-microsoft-blue">LIVE (2m)</span>
        </span>
        
        {/* Duplicate for seamless loop */}
        <span className="flex items-center gap-4 group">
          <DollarSign className="w-7 h-7 text-captivating-blue drop-shadow-[0_0_8px_rgba(0,164,239,0.5)] group-hover:scale-110 transition-transform" />
          <span className="text-sm tracking-tighter opacity-70">CAD/USD</span> 
          <span className="text-2xl font-black text-microsoft-blue">0.737</span>
        </span>

        <span className="flex items-center gap-4 group">
          <Activity className="w-7 h-7 text-captivating-blue drop-shadow-[0_0_8px_rgba(0,164,239,0.5)] group-hover:scale-110 transition-transform" />
          <span className="text-sm tracking-tighter opacity-70">HAGERTY 100</span> 
          <span className="text-2xl font-black text-dark-navy">43,408</span> 
          <span className="text-lg text-brembo-red animate-pulse">▼ 0.4%</span>
        </span>

        <span className="flex items-center gap-4 group">
          <Zap className="w-7 h-7 text-captivating-blue drop-shadow-[0_0_8px_rgba(0,164,239,0.5)]" />
          <span className="text-sm tracking-tighter opacity-70">GTA PULSE</span> 
          <span className="text-2xl font-black text-emerald-green">VIBRANT</span>
        </span>
      </div>
    </div>
  );
};

export default ArbitrageTicker;
