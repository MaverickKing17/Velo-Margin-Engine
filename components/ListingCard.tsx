
import React from 'react';
import { CarListing } from '../types';
import { 
  Bookmark, ShieldCheck, Globe, Zap, Clock, Calculator, Star, Flag, Award
} from 'lucide-react';
import VibeScoreDial from './VibeScoreDial';

interface ListingCardProps {
  car: CarListing;
  onPrequalify: (car: CarListing) => void;
  onOpenCalculator: (car: CarListing) => void;
}

// Logic: VIN decoding for flags
const getOriginMeta = (vin: string) => {
  const char1 = vin.charAt(0).toUpperCase();
  if (['1', '4', '5'].includes(char1)) return { label: 'USA', flag: '🇺🇸', isZeroTariff: true };
  if (char1 === 'W') return { label: 'Germany', flag: '🇩🇪', isZeroTariff: false };
  if (char1 === 'Z') return { label: 'Italy', flag: '🇮🇹', isZeroTariff: false };
  if (char1 === 'S') return { label: 'UK', flag: '🇬🇧', isZeroTariff: false };
  return { label: 'Other', flag: '🌍', isZeroTariff: false };
};

export const calculate2026Settlement = (priceCad: number, vin: string) => {
  const FX_RATE = 0.737;
  const priceUsd = priceCad * FX_RATE;
  const { isZeroTariff } = getOriginMeta(vin);
  
  let tariffAmount = 0;
  let label = "";
  if (isZeroTariff) {
    tariffAmount = 0.00;
    label = "ZERO-TARIFF (US-MADE)";
  } else {
    // Standard 2026 CUSMA logic: 25% tariff on 85% non-US content
    tariffAmount = (priceUsd * 0.85) * 0.25;
    label = "USMCA-COMPLIANT";
  }
  
  const fixedFees = 1200 + 1800 + 500;
  const totalUsd = priceUsd + tariffAmount + fixedFees;
  const tariffSavings = (priceUsd * 0.25) - tariffAmount;
  
  return {
    totalUsd: Math.round(totalUsd * 100) / 100,
    tariffSavings: Math.round(tariffSavings * 100) / 100,
    originLabel: label,
    isUsMade: isZeroTariff
  };
};

const ListingCard: React.FC<ListingCardProps> = ({ car, onPrequalify, onOpenCalculator }) => {
  const { label: originLabel, flag, isZeroTariff } = getOriginMeta(car.vin);
  const settlement = calculate2026Settlement(car.price, car.vin);
  
  // Vibe Score Multiplier: +15 for Zero-Tariff
  const displayVibeScore = isZeroTariff ? Math.min(100, car.vibeScore + 15) : car.vibeScore;

  return (
    <div className={`bg-midnight-royal/40 backdrop-blur-md rounded-[2rem] overflow-hidden group transition-all duration-700 flex flex-col xl:flex-row h-full shadow-2xl relative border ${
      isZeroTariff 
        ? 'border-electric-gold border-2 shadow-[0_0_60px_rgba(255,215,0,0.2)] ring-4 ring-electric-gold/5' 
        : 'border-white/10 hover:border-captivating-blue/50'
    }`}>
      
      {/* Zero-Tariff Ribbon Badge (Prominent) */}
      {isZeroTariff && (
        <div className="absolute top-0 left-0 z-40">
          <div className="bg-electric-gold text-midnight-indigo font-black text-[10px] py-2 px-8 shadow-xl transform -rotate-45 -translate-x-6 translate-y-2 uppercase tracking-[0.2em] border-b border-midnight-indigo/20 flex items-center gap-2">
            <Award className="w-3 h-3" /> Zero Tariff
          </div>
        </div>
      )}

      {/* Vibe Score Badge */}
      <div className="absolute top-6 right-6 z-10 scale-90 origin-top-right">
        <VibeScoreDial score={displayVibeScore} size="md" />
      </div>

      {/* Image Section */}
      <div className="relative w-full xl:w-[450px] h-72 xl:h-auto overflow-hidden">
        <img 
          src={car.imageUrl} 
          alt={car.title} 
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-midnight-royal/80 via-transparent to-transparent"></div>
        
        <div className="absolute bottom-6 left-6 flex flex-col gap-3">
          {isZeroTariff && (
            <span className="bg-electric-gold text-midnight-indigo text-xs font-black px-4 py-2 rounded-xl shadow-[0_10px_20px_rgba(255,215,0,0.3)] flex items-center gap-2 uppercase tracking-tight animate-pulse border border-white/30">
              <Star className="w-4 h-4 fill-current" /> DOMESTIC RETURN: 0% DUTY
            </span>
          )}
          <div className="flex gap-2">
            <span className="bg-white/10 backdrop-blur-xl text-white text-[10px] font-black px-3 py-1.5 rounded-lg border border-white/20 flex items-center gap-2 uppercase tracking-widest">
              <span className="text-lg">{flag}</span> {originLabel} ORIGIN
            </span>
            {car.cpoStatus && (
              <span className="bg-emerald-green text-midnight-indigo text-[10px] font-black px-3 py-1.5 rounded-lg shadow-lg flex items-center gap-1.5 uppercase tracking-widest border border-white/20">
                <ShieldCheck className="w-3.5 h-3.5" /> PLATINUM CPO
              </span>
            )}
          </div>
        </div>
        
        <button className="absolute top-6 left-6 p-3 rounded-2xl bg-white/10 text-white hover:bg-electric-gold hover:text-midnight-indigo transition-all backdrop-blur-md border border-white/20 z-10">
          <Bookmark className="w-5 h-5" />
        </button>
      </div>

      {/* Content Section */}
      <div className="flex-1 p-8 xl:p-10 flex flex-col">
        <header className="mb-6 pr-24">
          <h3 className="font-display font-bold text-3xl xl:text-4xl leading-tight text-white group-hover:text-electric-gold transition-colors duration-500">
            {car.year} {car.make} <span className="text-white/80">{car.model}</span>
          </h3>
          <p className="text-slate-400 text-sm mt-3 font-mono uppercase tracking-[0.15em] flex items-center gap-3">
            <Globe className="w-4 h-4 text-captivating-blue" /> {car.location} <span className="text-white/20">|</span> <span className="text-electric-gold font-bold">{car.dealerName}</span>
          </p>
        </header>

        {/* Price & Settlement Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="p-6 bg-white/5 rounded-3xl border border-white/10 shadow-inner group/price relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -translate-y-12 translate-x-12 blur-2xl"></div>
            <span className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em] block mb-2">GTA Listing (CAD)</span>
            <p className="font-mono font-bold text-white text-3xl tracking-tighter">${car.price.toLocaleString()}</p>
          </div>
          
          <button 
            onClick={() => onOpenCalculator(car)}
            className={`p-6 rounded-3xl border-2 transition-all duration-500 group/calc relative overflow-hidden text-left ${
              isZeroTariff 
                ? 'bg-electric-gold/10 border-electric-gold shadow-[0_15px_30px_rgba(255,215,0,0.1)] hover:bg-electric-gold/20' 
                : 'bg-emerald-green/5 border-emerald-green/30 hover:border-emerald-green hover:bg-emerald-green/10'
            }`}
          >
            <div className={`absolute top-0 right-0 p-4 transition-transform group-hover/calc:rotate-12 ${isZeroTariff ? 'text-electric-gold' : 'text-emerald-green'}`}>
              <Calculator className="w-6 h-6" />
            </div>
            <span className={`text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 mb-2 ${
              isZeroTariff ? 'text-electric-gold' : 'text-emerald-green'
            }`}>
              2026 US Settlement
            </span>
            <p className={`font-mono font-bold text-3xl tracking-tighter ${
              isZeroTariff ? 'text-electric-gold' : 'text-emerald-green'
            }`}>
              ${settlement.totalUsd.toLocaleString()} <span className="text-xs ml-1">USD</span>
            </p>
          </button>
        </div>

        {/* Audit Highlights */}
        <div className="grid grid-cols-3 gap-6 mb-8 border-y border-white/5 py-6">
          <div className="space-y-1">
            <span className="text-[9px] text-slate-500 font-black uppercase tracking-widest block">Audit Label</span>
            <div className={`flex items-center gap-2 text-[11px] font-mono font-black uppercase tracking-tighter ${isZeroTariff ? 'text-electric-gold' : 'text-emerald-green'}`}>
              <Flag className="w-3.5 h-3.5" /> {settlement.originLabel}
            </div>
          </div>
          <div className="space-y-1">
            <span className="text-[9px] text-slate-500 font-black uppercase tracking-widest block">Tariff Delta</span>
            <div className="flex items-center gap-2 text-[11px] text-emerald-green font-mono font-black tracking-tighter">
              <TrendingUp className="w-3.5 h-3.5" /> +${settlement.tariffSavings.toLocaleString()} SAVED
            </div>
          </div>
          <div className="space-y-1">
            <span className="text-[9px] text-slate-500 font-black uppercase tracking-widest block">Market Velocity</span>
            <div className="flex items-center gap-2 text-[11px] text-white font-mono font-bold">
              <Clock className="w-3.5 h-3.5 text-captivating-blue" /> {car.daysToTurnGta}d <span className="text-slate-600">→</span> <span className="text-captivating-blue">{car.daysToTurnUs}d</span>
            </div>
          </div>
        </div>

        <div className="mt-auto flex items-center gap-4">
          <button 
            onClick={() => onPrequalify(car)}
            className="flex-1 flex items-center justify-center gap-4 px-8 py-5 bg-white hover:bg-electric-gold active:scale-[0.97] text-midnight-indigo text-xs font-black uppercase tracking-[0.3em] rounded-2xl transition-all duration-300 shadow-2xl group/btn"
          >
            <Zap className={`w-5 h-5 group-hover/btn:fill-current ${isZeroTariff ? 'text-electric-gold' : 'text-captivating-blue'}`} />
            Prequalify High-Yield Lead
          </button>
        </div>
      </div>
    </div>
  );
};

// Re-using local trending icon since it was used but not imported
const TrendingUp = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
);

export default ListingCard;
