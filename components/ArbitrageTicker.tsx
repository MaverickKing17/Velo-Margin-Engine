
import React from 'react';
import { RefreshCcw, DollarSign, Activity, Zap, Star } from 'lucide-react';

interface ArbitrageTickerProps {
  goldSpecCount: number;
}

const ArbitrageTicker: React.FC<ArbitrageTickerProps> = ({ goldSpecCount }) => {
  return (
    <div className="w-full h-20 bg-gradient-to-r from-obsidian-matte via-gunmetal to-obsidian-matte sticky top-0 z-[60] overflow-hidden flex items-center shadow-[0_4px_30px_rgba(0,0,0,0.5)] border-b-2 border-white/10">
      {/* Subtle Premium Glow Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none"></div>
      
      <div className="animate-marquee whitespace-nowrap flex items-center gap-24 font-microsoft uppercase font-black px-12">
        <span className="flex items-center gap-4 group">
          <Star className="w-7 h-7 text-electric-gold drop-shadow-[0_0_12px_rgba(255,215,0,0.5)] group-hover:scale-110 transition-transform" />
          <span className="text-sm tracking-tighter text-silver-frost opacity-80">GOLD-SPEC FLIPS FOUND:</span> 
          <span className="text-2xl font-black text-emerald-green drop-shadow-[0_0_8px_rgba(80,200,120,0.3)]">[{goldSpecCount}]</span>
        </span>

        <span className="flex items-center gap-4 group">
          <DollarSign className="w-7 h-7 text-captivating-blue drop-shadow-[0_0_12px_rgba(0,164,239,0.5)] group-hover:scale-110 transition-transform" />
          <span className="text-sm tracking-tighter text-silver-frost opacity-80">CAD/USD</span> 
          <span className="text-2xl font-black text-white drop-shadow-sm">0.737</span>
          <span className="text-xs bg-captivating-blue/20 px-2 py-0.5 rounded text-captivating-blue border border-captivating-blue/30 font-bold">SPOT</span>
        </span>

        <span className="flex items-center gap-4 group">
          <Activity className="w-7 h-7 text-captivating-blue drop-shadow-[0_0_12px_rgba(0,164,239,0.5)] group-hover:scale-110 transition-transform" />
          <span className="text-sm tracking-tighter text-silver-frost opacity-80">HAGERTY 100</span> 
          <span className="text-2xl font-black text-white">43,408</span> 
          <span className="text-lg text-brembo-red drop-shadow-[0_0_10px_rgba(227,6,19,0.4)] animate-pulse">▼ 0.4%</span>
        </span>

        <span className="flex items-center gap-4 group">
          <Zap className="w-7 h-7 text-captivating-blue drop-shadow-[0_0_12px_rgba(0,164,239,0.5)] group-hover:scale-110 transition-transform" />
          <span className="text-sm tracking-tighter text-silver-frost opacity-80">GTA PULSE</span> 
          <span className="text-2xl font-black text-emerald-green drop-shadow-[0_0_15px_rgba(80,200,120,0.5)]">VIBRANT</span>
        </span>
        
        {/* Loop content duplicated for seamless scrolling */}
        <span className="flex items-center gap-4 group">
          <Star className="w-7 h-7 text-electric-gold drop-shadow-[0_0_12px_rgba(255,215,0,0.5)]" />
          <span className="text-sm tracking-tighter text-silver-frost opacity-80">GOLD-SPEC FLIPS FOUND:</span> 
          <span className="text-2xl font-black text-emerald-green">[{goldSpecCount}]</span>
        </span>

        <span className="flex items-center gap-4 group">
          <RefreshCcw className="w-7 h-7 text-captivating-blue animate-spin-slow drop-shadow-[0_0_12px_rgba(0,164,239,0.5)]" />
          <span className="text-sm tracking-tighter text-silver-frost opacity-80">SCRAPE</span> 
          <span className="text-2xl font-black text-white">LIVE (2m)</span>
        </span>
      </div>
    </div>
  );
};

export default ArbitrageTicker;
