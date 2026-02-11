
import React, { useState } from 'react';
import { CarListing } from '../types';
// Fixed: Added Zap to the lucide-react imports
import { ExternalLink, Bookmark, ShieldCheck, Globe, Info, MessageSquare, Zap, Fingerprint, Settings2, TrendingUp } from 'lucide-react';
import VibeScoreDial from './VibeScoreDial';
import { getCarInsights } from '../services/geminiService';

interface ListingCardProps {
  car: CarListing;
  onPrequalify: (car: CarListing) => void;
}

const ListingCard: React.FC<ListingCardProps> = ({ car, onPrequalify }) => {
  const [showInsights, setShowInsights] = useState(false);
  const [aiInsightsText, setAiInsightsText] = useState<string | null>(null);
  const [loadingInsights, setLoadingInsights] = useState(false);

  const fetchInsights = async () => {
    if (aiInsightsText) {
      setShowInsights(!showInsights);
      return;
    }
    setLoadingInsights(true);
    setShowInsights(true);
    const text = await getCarInsights(car);
    setAiInsightsText(text);
    setLoadingInsights(false);
  };

  return (
    <div className="bg-luxury-card border border-border-gray rounded-xl overflow-hidden group hover:border-deep-gold/50 transition-all duration-300 flex flex-col md:flex-row h-full">
      {/* Image Section */}
      <div className="relative w-full md:w-80 h-48 md:h-auto overflow-hidden">
        <img 
          src={car.imageUrl} 
          alt={car.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          {car.rarityKeywords.slice(0, 2).map(keyword => (
            <span key={keyword} className="bg-luxury-dark/80 backdrop-blur-sm text-[10px] text-deep-gold font-bold px-2 py-1 rounded border border-deep-gold/30">
              {keyword}
            </span>
          ))}
        </div>
        <button className="absolute bottom-3 right-3 p-2 rounded-full bg-luxury-dark/80 text-gray-400 hover:text-white transition-colors backdrop-blur-sm">
          <Bookmark className="w-4 h-4" />
        </button>
      </div>

      {/* Content Section */}
      <div className="flex-1 p-5 flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <div className="flex-1">
            <h3 className="font-display font-bold text-lg leading-tight mb-2 group-hover:text-deep-gold transition-colors">
              {car.title}
            </h3>
            
            {/* Trim, VIN, Profit and Export Status Data Points */}
            <div className="flex flex-wrap gap-x-4 gap-y-1 mb-3">
              <div className="flex items-center gap-1.5">
                <Settings2 className="w-3 h-3 text-gray-500" />
                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Trim:</span>
                <span className="text-xs text-gray-200 font-medium">{car.trim}</span>
              </div>
              {car.vin && (
                <div className="flex items-center gap-1.5">
                  <Fingerprint className="w-3 h-3 text-gray-500" />
                  <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">VIN:</span>
                  <span className="text-xs text-gray-200 font-mono tracking-tighter opacity-80">{car.vin}</span>
                </div>
              )}
              <div className="flex items-center gap-1.5">
                <TrendingUp className="w-3 h-3 text-emerald-accent" />
                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">US Profit:</span>
                <span className="text-xs text-emerald-accent font-bold">${car.usExportProfitCad.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className={`w-3 h-3 ${car.isExportSuitable ? 'text-emerald-accent' : 'text-amber-500'}`} />
                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Export Status:</span>
                <span className={`text-[10px] font-black px-1.5 rounded-sm ${car.isExportSuitable ? 'bg-emerald-accent/20 text-emerald-accent' : 'bg-amber-500/20 text-amber-500'}`}>
                  {car.isExportSuitable ? 'ELIGIBLE' : 'REVIEW REQ.'}
                </span>
              </div>
            </div>

            <p className="text-gray-400 text-sm flex items-center gap-1">
              <Globe className="w-3.5 h-3.5" />
              {car.location} • {car.dealerName}
            </p>
          </div>
          <VibeScoreDial score={car.vibeScore} />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 border-y border-border-gray my-4">
          <div>
            <span className="text-[10px] text-gray-500 font-bold uppercase">Price</span>
            <p className="font-bold text-white">${car.price.toLocaleString()}</p>
          </div>
          <div>
            <span className="text-[10px] text-gray-500 font-bold uppercase">Odometer</span>
            <p className="font-bold text-white">{car.odometer.toLocaleString()} KM</p>
          </div>
          <div>
            <span className="text-[10px] text-gray-500 font-bold uppercase">Export Profit</span>
            <p className="font-bold text-emerald-accent">+${car.usExportProfitCad.toLocaleString()} CAD</p>
          </div>
          <div>
            <span className="text-[10px] text-gray-500 font-bold uppercase">Region</span>
            <p className="font-bold text-white">{car.region}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {car.aiInsights.map((insight, idx) => (
            <div key={idx} className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-accent/10 border border-emerald-accent/20 rounded-full">
              <ShieldCheck className="w-3 h-3 text-emerald-accent" />
              <span className="text-[10px] font-bold text-emerald-accent uppercase">{insight}</span>
            </div>
          ))}
        </div>

        {showInsights && (
          <div className="mb-6 p-4 bg-luxury-dark/50 rounded-lg border border-border-gray text-xs text-gray-300 animate-in fade-in slide-in-from-top-2">
            <h4 className="font-bold text-deep-gold uppercase mb-2 flex items-center gap-2">
              <Zap className="w-3 h-3" />
              AI Market Intel
            </h4>
            {loadingInsights ? (
              <div className="flex items-center gap-2 text-gray-500">
                <div className="w-3 h-3 border-2 border-deep-gold border-t-transparent rounded-full animate-spin"></div>
                Analyzing GTA listings...
              </div>
            ) : (
              <div className="whitespace-pre-line leading-relaxed">
                {aiInsightsText}
              </div>
            )}
          </div>
        )}

        <div className="mt-auto flex flex-wrap gap-3">
          <a 
            href={car.originalUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-luxury-card border border-border-gray hover:border-white text-xs font-bold rounded-lg transition-all"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            VIEW LISTING
          </a>
          <button 
            onClick={fetchInsights}
            className="flex items-center gap-2 px-4 py-2 bg-luxury-card border border-border-gray hover:border-deep-gold text-xs font-bold rounded-lg transition-all"
          >
            <Info className="w-3.5 h-3.5 text-deep-gold" />
            AI ANALYSIS
          </button>
          <button 
            onClick={() => onPrequalify(car)}
            className="flex items-center gap-2 px-4 py-2 bg-electric-blue hover:bg-electric-blue/90 text-white text-xs font-bold rounded-lg transition-all ml-auto"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            START PREQUALIFICATION
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
