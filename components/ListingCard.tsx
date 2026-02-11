
import React from 'react';
import { CarListing } from '../types';
import { 
  Bookmark, ShieldCheck, Globe, Zap, Clock, Calculator, Star, Flag
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
    <div className={`bg-obsidian-matte rounded-xl overflow-hidden group transition-all duration-500 flex flex-col xl:flex-row h-full shadow-2xl relative ${
      isZeroTariff 
        ? 'border-2 border-electric-gold shadow-[0_0_40px_rgba(255,215,0,0.15)] ring-1 ring-electric-gold/30' 
        : 'border-0.5 border-silver-frost hover:border-deep-gold/50'
    }`}>
      
      {/* Vibe Score Badge */}
      <div className="absolute top-4 right-4 z-10 scale-75 origin-top-right">
        <VibeScoreDial score={displayVibeScore} />
      </div>

      {/* Image Section */}
      <div className="relative w-full xl:w-96 h-64 xl:h-auto overflow-hidden">
        <img 
          src={car.imageUrl} 
          alt={car.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {isZeroTariff && (
            <span className="bg-electric-gold text-obsidian-matte text-[10px] font-black px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 uppercase tracking-tighter animate-pulse">
              <Star className="w-3.5 h-3.5 fill-current" /> DOMESTIC RETURN: 0% DUTY
            </span>
          )}
          <div className="flex gap-2">
            <span className="bg-white/20 backdrop-blur-md text-white text-[10px] font-black px-2 py-1 rounded border border-white/20 flex items-center gap-1.5 uppercase tracking-tighter">
              <span className="text-sm">{flag}</span> {originLabel}
            </span>
            {car.cpoStatus && (
              <span className="bg-emerald-green text-obsidian-matte text-[10px] font-black px-2 py-1 rounded shadow-lg flex items-center gap-1 uppercase tracking-tighter">
                <ShieldCheck className="w-3 h-3" /> CPO
              </span>
            )}
          </div>
        </div>
        <button className="absolute bottom-3 right-3 p-2 rounded-full bg-obsidian-matte/80 text-gray-400 hover:text-white transition-colors backdrop-blur-sm border-0.5 border-silver-frost">
          <Bookmark className="w-4 h-4" />
        </button>
      </div>

      {/* Content Section */}
      <div className="flex-1 p-6 flex flex-col">
        <header className="mb-4 pr-16">
          <h3 className="font-display font-bold text-2xl leading-tight text-white group-hover:text-electric-gold transition-colors">
            {car.year} {car.make} {car.model}
          </h3>
          <p className="text-gray-400 text-xs mt-1 font-mono uppercase tracking-widest flex items-center gap-2">
            <Globe className="w-3 h-3" /> {car.location} • <span className="text-deep-gold">{car.dealerName}</span>
          </p>
        </header>

        {/* Price Section */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="p-4 bg-white/5 rounded-xl border border-silver-frost/10">
            <span className="text-[10px] text-gray-500 font-black uppercase tracking-widest block mb-1">GTA Listing (CAD)</span>
            <p className="font-mono font-bold text-white text-xl">${car.price.toLocaleString()}</p>
          </div>
          <button 
            onClick={() => onOpenCalculator(car)}
            className={`p-4 rounded-xl border transition-all group/price text-left ${
              isZeroTariff 
                ? 'bg-electric-gold/10 border-electric-gold/40 hover:bg-electric-gold/20' 
                : 'bg-emerald-green/5 border-emerald-green/20 hover:bg-emerald-green/10'
            }`}
          >
            <span className={`text-[10px] font-black uppercase tracking-widest flex items-center justify-between mb-1 ${
              isZeroTariff ? 'text-electric-gold' : 'text-emerald-green'
            }`}>
              US Settlement
              <Calculator className="w-3.5 h-3.5 group-hover/price:rotate-12 transition-transform" />
            </span>
            <p className={`font-mono font-bold text-xl ${
              isZeroTariff ? 'text-electric-gold' : 'text-emerald-green'
            }`}>
              ${settlement.totalUsd.toLocaleString()} <span className="text-[10px]">USD</span>
            </p>
          </button>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6 border-y border-silver-frost/10 py-4">
          <div>
            <span className="text-[9px] text-gray-500 font-bold uppercase block mb-1">Origin Label</span>
            <div className={`flex items-center gap-1.5 text-xs font-mono font-black ${isZeroTariff ? 'text-electric-gold' : 'text-emerald-green'}`}>
              <Flag className="w-3 h-3" /> {settlement.originLabel}
            </div>
          </div>
          <div>
            <span className="text-[9px] text-gray-500 font-bold uppercase block mb-1">Tariff Savings</span>
            <div className="flex items-center gap-1.5 text-xs text-emerald-green font-mono font-bold">
              +${settlement.tariffSavings.toLocaleString()}
            </div>
          </div>
          <div>
            <span className="text-[9px] text-gray-500 font-bold uppercase block mb-1">DTT Gap (GTA vs US)</span>
            <div className="flex items-center gap-1.5 text-xs text-white font-mono">
              {car.daysToTurnGta}d / <span className="text-electric-blue">{car.daysToTurnUs}d</span>
            </div>
          </div>
        </div>

        <div className="mt-auto flex items-center gap-3">
          <button 
            onClick={() => onPrequalify(car)}
            className="flex-1 flex items-center justify-center gap-3 px-6 py-4 bg-white hover:bg-electric-gold active:scale-[0.98] text-obsidian-matte text-xs font-black uppercase tracking-widest rounded-xl transition-all shadow-xl group/btn"
          >
            <Zap className={`w-4 h-4 group-hover/btn:fill-current ${isZeroTariff ? 'text-electric-gold' : 'text-captivating-blue'}`} />
            Prequalify Lead
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
