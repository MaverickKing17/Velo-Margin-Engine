
import React from 'react';
import { X, Calculator, Info, ShieldCheck, Flag } from 'lucide-react';
import { CarListing } from '../types';
import { calculate2026Settlement } from './ListingCard';

interface FlipCalculatorModalProps {
  car: CarListing;
  onClose: () => void;
}

const FlipCalculatorModal: React.FC<FlipCalculatorModalProps> = ({ car, onClose }) => {
  const settlement = calculate2026Settlement(car.price, car.vin);
  const FX_RATE = 0.737;
  const priceUsd = car.price * FX_RATE;
  
  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-xl z-[200] flex items-center justify-center p-6 animate-in fade-in">
      <div className={`bg-obsidian-matte w-full max-w-xl rounded-[2.5rem] p-10 shadow-2xl relative border ${
        settlement.isUsMade ? 'border-electric-gold/50 shadow-[0_0_80px_rgba(255,215,0,0.1)]' : 'border-silver-frost/30'
      }`}>
        <button 
          onClick={onClose}
          className="absolute top-8 right-8 p-3 rounded-full hover:bg-white/10 transition-colors border border-silver-frost/20"
        >
          <X className="w-6 h-6 text-gray-400" />
        </button>

        <div className="flex flex-col items-center mb-10 text-center">
          <div className={`p-4 rounded-2xl mb-4 bg-white/5 border ${settlement.isUsMade ? 'border-electric-gold' : 'border-emerald-green'}`}>
            <Calculator className={`w-10 h-10 ${settlement.isUsMade ? 'text-electric-gold' : 'text-emerald-green'}`} />
          </div>
          <h2 className="text-3xl font-display font-bold text-white tracking-tight">2026 Flip Audit</h2>
          <p className="text-gray-400 text-sm mt-1 uppercase font-mono tracking-widest">{car.year} {car.make} {car.model}</p>
          <div className={`w-20 h-1 mt-6 rounded-full ${settlement.isUsMade ? 'bg-electric-gold' : 'bg-emerald-green'}`}></div>
        </div>

        <div className="space-y-4 font-mono">
          <div className="flex justify-between items-center py-3 border-b border-silver-frost/10">
            <span className="text-gray-400 text-sm uppercase">GTA Sticker (CAD)</span>
            <span className="text-white font-bold">${car.price.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center py-3 border-b border-silver-frost/10">
            <span className="text-gray-400 text-sm uppercase">FX Settlement (0.737)</span>
            <span className="text-white">${priceUsd.toLocaleString(undefined, { maximumFractionDigits: 0 })} USD</span>
          </div>
          <div className="flex justify-between items-center py-3 border-b border-silver-frost/10">
            <span className="text-gray-400 text-sm uppercase flex items-center gap-2">
              <Flag className="w-3 h-3" /> Tariff ({settlement.originLabel})
            </span>
            <span className={settlement.isUsMade ? 'text-emerald-green font-black' : 'text-brembo-red'}>
              {settlement.isUsMade ? 'EXEMPT (0%)' : `+$${Math.round(priceUsd * 0.85 * 0.25).toLocaleString()}`}
            </span>
          </div>
          <div className="flex justify-between items-center py-3 border-b border-silver-frost/10">
            <span className="text-gray-400 text-sm uppercase">Export Fees (Compliance/Transit)</span>
            <span className="text-brembo-red font-bold">+$3,500</span>
          </div>
          
          <div className={`mt-8 p-6 rounded-2xl flex justify-between items-center transition-all ${
            settlement.isUsMade ? 'bg-electric-gold/10 border-2 border-electric-gold' : 'bg-emerald-green/5 border border-emerald-green/40'
          }`}>
            <div className="flex flex-col">
              <span className={`text-xs font-black uppercase tracking-widest ${settlement.isUsMade ? 'text-electric-gold' : 'text-emerald-green'}`}>
                Final US Settlement
              </span>
              <span className="text-gray-500 text-[10px] mt-1 italic">Post-Audit Valuation</span>
            </div>
            <span className={`text-3xl font-black ${settlement.isUsMade ? 'text-electric-gold' : 'text-emerald-green'}`}>
              ${settlement.totalUsd.toLocaleString()} <span className="text-sm">USD</span>
            </span>
          </div>

          <div className="flex justify-between items-center px-2 py-2">
            <span className="text-emerald-green text-[10px] font-black uppercase flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5" /> Total Tariff Savings vs. Base
            </span>
            <span className="text-emerald-green text-sm font-black tracking-tighter">
              +${settlement.tariffSavings.toLocaleString()}
            </span>
          </div>
        </div>

        <div className="mt-8 p-4 bg-white/5 rounded-2xl border border-silver-frost/10 flex gap-4 items-start">
          <Info className="w-5 h-5 text-captivating-blue shrink-0 mt-0.5" />
          <p className="text-[10px] text-gray-400 leading-relaxed font-medium">
            Audit v2.26: Logic applies 25% Section 232 Tariff exemptions for US-made VIN prefixes (1, 4, 5). All other luxury units are processed via standard 2026 CUSMA protocols.
          </p>
        </div>

        <div className="mt-10 flex justify-center">
          <button 
            onClick={onClose}
            className={`w-full py-5 rounded-2xl font-black uppercase text-xs tracking-[0.3em] transition-all shadow-2xl ${
              settlement.isUsMade ? 'bg-electric-gold text-obsidian-matte hover:scale-[1.02]' : 'bg-white text-obsidian-matte hover:bg-emerald-green'
            }`}
          >
            LOCK IN AUDIT
          </button>
        </div>
      </div>
    </div>
  );
};

export default FlipCalculatorModal;
