
import React from 'react';
import { X, DollarSign, Calculator, Info } from 'lucide-react';
import { CarListing } from '../types';

interface FlipCalculatorModalProps {
  car: CarListing;
  onClose: () => void;
}

const FlipCalculatorModal: React.FC<FlipCalculatorModalProps> = ({ car, onClose }) => {
  const FX_RATE = 0.737;
  const baseUsd = car.price * FX_RATE;
  const duty = baseUsd * 0.05;
  const transportFixed = 2500;
  const totalSettlement = baseUsd + duty + transportFixed;

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-xl z-[200] flex items-center justify-center p-6 animate-in fade-in">
      <div className="bg-obsidian-matte w-full max-w-lg rounded-3xl border border-silver-frost/30 p-10 shadow-2xl relative">
        <button 
          onClick={onClose}
          className="absolute top-8 right-8 p-3 rounded-full hover:bg-white/10 transition-colors border border-silver-frost/20"
        >
          <X className="w-6 h-6 text-gray-400" />
        </button>

        <div className="flex flex-col items-center mb-10 text-center">
          <Calculator className="w-12 h-12 text-electric-gold mb-4" />
          <h2 className="text-3xl font-display font-bold text-white tracking-tight">Flip Calculator</h2>
          <p className="text-gray-400 text-sm mt-1">{car.year} {car.make} {car.model}</p>
          <div className="w-20 h-1 bg-deep-gold mt-6 rounded-full"></div>
        </div>

        <div className="space-y-4 font-mono">
          <div className="flex justify-between items-center py-3 border-b border-silver-frost/10">
            <span className="text-gray-400 text-sm uppercase">GTA Sticker (CAD)</span>
            <span className="text-white">${car.price.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center py-3 border-b border-silver-frost/10">
            <span className="text-gray-400 text-sm uppercase">FX Settlement (0.737)</span>
            <span className="text-white">${baseUsd.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
          </div>
          <div className="flex justify-between items-center py-3 border-b border-silver-frost/10">
            <span className="text-gray-400 text-sm uppercase">US Customs Duty (5%)</span>
            <span className="text-brembo-red">+${duty.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
          </div>
          <div className="flex justify-between items-center py-3 border-b border-silver-frost/10">
            <span className="text-gray-400 text-sm uppercase">Compliance & Transit</span>
            <span className="text-brembo-red">+$2,500</span>
          </div>
          <div className="flex justify-between items-center pt-6 text-xl">
            <span className="text-electric-gold font-black uppercase tracking-tighter">US Settlement</span>
            <span className="text-electric-gold font-black">${totalSettlement.toLocaleString(undefined, { maximumFractionDigits: 0 })} USD</span>
          </div>
        </div>

        <div className="mt-10 p-4 bg-white/5 rounded-xl border border-silver-frost/10 flex gap-4 items-start">
          <Info className="w-5 h-5 text-electric-blue shrink-0 mt-0.5" />
          <p className="text-[11px] text-gray-400 leading-relaxed italic">
            Calculated as CAD * 0.737 + 5% duty + $2,500. This estimate is subject to real-time border clearing fees and final dealer doc costs.
          </p>
        </div>

        <div className="mt-10 flex justify-center">
          <button 
            onClick={onClose}
            className="px-12 py-5 bg-white text-obsidian-matte font-black uppercase rounded-2xl transition-all text-xs tracking-[0.3em] hover:bg-electric-gold"
          >
            CONFIRM AUDIT
          </button>
        </div>
      </div>
    </div>
  );
};

export default FlipCalculatorModal;