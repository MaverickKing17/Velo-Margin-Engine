
import React, { useState } from 'react';
import { CarListing } from '../types';
import { 
  Bookmark, ShieldCheck, Globe, MessageSquare, Zap, Clock, Calculator, ShieldAlert
} from 'lucide-react';
import VibeScoreDial from './VibeScoreDial';

interface ListingCardProps {
  car: CarListing;
  onPrequalify: (car: CarListing) => void;
  onOpenCalculator: (car: CarListing) => void;
}

const ListingCard: React.FC<ListingCardProps> = ({ car, onPrequalify, onOpenCalculator }) => {
  // PDF Calculation: CAD * 0.737 + 5% duty + $2,500
  const FX_RATE = 0.737;
  const baseUsd = car.price * FX_RATE;
  const settlementUsd = baseUsd + (baseUsd * 0.05) + 2500;

  return (
    <div className="bg-obsidian-matte border-0.5 border-silver-frost rounded-xl overflow-hidden group hover:border-deep-gold/50 transition-all duration-300 flex flex-col xl:flex-row h-full shadow-2xl relative">
      
      {/* Vibe Score Badge (Top Right) */}
      <div className="absolute top-4 right-4 z-10 scale-75 origin-top-right">
        <VibeScoreDial score={car.vibeScore} />
      </div>

      {/* Image Section */}
      <div className="relative w-full xl:w-96 h-64 xl:h-auto overflow-hidden">
        <img 
          src={car.imageUrl} 
          alt={car.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {car.cpoStatus && (
            <span className="bg-emerald-green text-obsidian-matte text-[10px] font-black px-2 py-1 rounded shadow-lg flex items-center gap-1 uppercase tracking-tighter">
              <ShieldCheck className="w-3 h-3" /> CPO ELIGIBLE
            </span>
          )}
          {car.recallStatus === 'Clear' && (
            <span className="bg-white/20 backdrop-blur-md text-white text-[10px] font-black px-2 py-1 rounded border border-white/20 flex items-center gap-1 uppercase tracking-tighter">
              <ShieldCheck className="w-3 h-3 text-emerald-green" /> SAFETY CLEAR
            </span>
          )}
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
            <Globe className="w-3 h-3" /> {car.location} • {car.dealerName}
          </p>
        </header>

        {/* Price Section */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="p-4 bg-white/5 rounded-xl border border-silver-frost/10">
            <span className="text-[10px] text-gray-500 font-black uppercase tracking-widest block mb-1">GTA Price (CAD)</span>
            <p className="font-mono font-bold text-white text-xl">${car.price.toLocaleString()}</p>
          </div>
          <button 
            onClick={() => onOpenCalculator(car)}
            className="p-4 bg-emerald-green/5 rounded-xl border border-emerald-green/20 text-left hover:bg-emerald-green/10 transition-all group/price"
          >
            <span className="text-[10px] text-emerald-green font-black uppercase tracking-widest flex items-center justify-between">
              US Settlement
              <Calculator className="w-3 h-3 group-hover/price:scale-110 transition-transform" />
            </span>
            <p className="font-mono font-bold text-emerald-green text-xl">
              ${settlementUsd.toLocaleString(undefined, { maximumFractionDigits: 0 })} <span className="text-[10px]">USD</span>
            </p>
          </button>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6 border-y border-silver-frost/10 py-4">
          <div>
            <span className="text-[9px] text-gray-500 font-bold uppercase block mb-1">Scrape Latency</span>
            <div className="flex items-center gap-1.5 text-xs text-gray-300 font-mono">
              <Clock className="w-3 h-3" /> 2m ago
            </div>
          </div>
          <div>
            <span className="text-[9px] text-gray-500 font-bold uppercase block mb-1">VIN Status</span>
            <div className="flex items-center gap-1.5 text-xs text-emerald-green font-mono font-bold">
              <ShieldCheck className="w-3 h-3" /> DECODED
            </div>
          </div>
          <div>
            <span className="text-[9px] text-gray-500 font-bold uppercase block mb-1">Export Risk</span>
            <div className="flex items-center gap-1.5 text-xs text-gray-300 font-mono">
              LOW
            </div>
          </div>
        </div>

        <div className="mt-auto flex items-center gap-3">
          <button 
            onClick={() => onPrequalify(car)}
            className="flex-1 flex items-center justify-center gap-3 px-6 py-4 bg-white hover:bg-electric-gold active:scale-[0.98] text-obsidian-matte text-xs font-black uppercase tracking-widest rounded-xl transition-all"
          >
            <Zap className="w-4 h-4" />
            Prequalify via AI Agent
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;