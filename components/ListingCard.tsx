
import React, { useState } from 'react';
import { CarListing } from '../types';
import { 
  ExternalLink, Bookmark, ShieldCheck, Globe, Info, MessageSquare, 
  Zap, Fingerprint, Settings2, TrendingUp, Cpu, History, AlertCircle,
  BarChart3, DollarSign, Activity, Clock
} from 'lucide-react';
import VibeScoreDial from './VibeScoreDial';
import { getCarInsights } from '../services/geminiService';

interface ListingCardProps {
  car: CarListing;
  onPrequalify: (car: CarListing) => void;
  onAppraisal: (car: CarListing) => void;
}

const ListingCard: React.FC<ListingCardProps> = ({ car, onPrequalify, onAppraisal }) => {
  const [showInsights, setShowInsights] = useState(false);
  const [aiInsightsText, setAiInsightsText] = useState<string | null>(null);
  const [loadingInsights, setLoadingInsights] = useState(false);

  // 2026 Export 2.0 Logic: Settlement Simulation (1.38 Rate)
  const usdSettlement = (car.price / 1.38).toLocaleString(undefined, { maximumFractionDigits: 0 });

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

  const isPriceDropped = car.priceDelta7d < 0;

  return (
    <div className="bg-obsidian-matte border-[0.5px] border-silver-frost rounded-xl overflow-hidden group hover:border-deep-gold/50 transition-all duration-300 flex flex-col xl:flex-row h-full shadow-2xl">
      {/* Image Section */}
      <div className="relative w-full xl:w-96 h-64 xl:h-auto overflow-hidden">
        <img 
          src={car.imageUrl} 
          alt={car.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {car.cpoStatus && (
            <span className="bg-emerald-accent text-obsidian-matte text-[10px] font-black px-2 py-1 rounded shadow-lg flex items-center gap-1 uppercase tracking-tighter">
              <ShieldCheck className="w-3 h-3" /> CPO PLATINUM
            </span>
          )}
          {car.usExportProfitCad > 40000 && (
            <span className="bg-green-signal text-obsidian-matte text-[10px] font-black px-2 py-1 rounded shadow-lg flex items-center gap-1 uppercase tracking-tighter">
              <Zap className="w-3 h-3" /> High Margin Opportunity
            </span>
          )}
        </div>
        <div className="absolute bottom-3 left-3 flex gap-2">
           {isPriceDropped && (
            <span className="bg-brembo-red/90 backdrop-blur-sm text-white text-[10px] font-black px-2 py-1 rounded flex items-center gap-1">
              <History className="w-3 h-3" /> {Math.abs(car.priceDelta7d)}% Price Delta (7d)
            </span>
          )}
        </div>
        <button className="absolute bottom-3 right-3 p-2 rounded-full bg-obsidian-matte/80 text-gray-400 hover:text-white transition-colors backdrop-blur-sm border-[0.5px] border-silver-frost">
          <Bookmark className="w-4 h-4" />
        </button>
      </div>

      {/* Content Section */}
      <div className="flex-1 p-6 flex flex-col">
        {/* Header Area */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-1">
              <h3 className="font-display font-bold text-2xl leading-tight group-hover:text-deep-gold transition-colors text-white">
                {car.title}
              </h3>
            </div>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-3 bg-white/5 rounded-lg border-[0.5px] border-silver-frost mb-4">
              <div className="space-y-1">
                <span className="text-[9px] text-gray-500 font-black uppercase tracking-widest">VIN Decode</span>
                <p className="text-[11px] font-mono text-gray-300 truncate">{car.vin || 'PENDING'}</p>
              </div>
              <div className="space-y-1">
                <span className="text-[9px] text-gray-500 font-black uppercase tracking-widest">Last Scrape</span>
                <p className="text-[10px] font-mono text-gray-400">
                  <Clock className="w-3 h-3 inline mr-1" />
                  {new Date(car.scrapeTimestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
              <div className="space-y-1">
                <span className="text-[9px] text-gray-500 font-black uppercase tracking-widest">Settlement</span>
                <p className="text-[11px] font-mono font-bold text-deep-gold">${usdSettlement} USD</p>
              </div>
              <div className="space-y-1">
                <span className="text-[9px] text-gray-500 font-black uppercase tracking-widest">Vibe Check</span>
                <p className="text-[11px] font-mono font-bold text-green-signal">BULLISH</p>
              </div>
            </div>

            <p className="text-gray-400 text-sm flex items-center gap-1 mb-4">
              <Globe className="w-3.5 h-3.5" />
              {car.location} • {car.dealerName}
            </p>
          </div>
          <div className="flex flex-col items-center">
            <VibeScoreDial score={car.vibeScore} />
            <div className="mt-2 text-[9px] font-black text-deep-gold uppercase tracking-widest text-center">
              Arbitrage Score
            </div>
          </div>
        </div>

        {/* 2026 Market Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 border-t border-silver-frost">
          <div>
            <span className="text-[10px] text-gray-500 font-bold uppercase block mb-1">Sticker Price</span>
            <p className="font-mono font-bold text-white text-lg">${car.price.toLocaleString()}</p>
          </div>
          <div>
            <span className="text-[10px] text-gray-500 font-bold uppercase block mb-1">DTT GTA</span>
            <p className="font-mono font-bold text-gray-300 text-lg">{car.daysToTurnGta} Days</p>
          </div>
          <div>
            <span className="text-[10px] text-gray-500 font-bold uppercase block mb-1">DTT US</span>
            <p className="font-mono font-bold text-green-signal text-lg">{car.daysToTurnUs} Days</p>
          </div>
          <div>
            <span className="text-[10px] text-gray-500 font-bold uppercase block mb-1">US Yield</span>
            <p className="font-mono font-bold text-emerald-accent text-lg">+${car.usExportProfitCad.toLocaleString()}</p>
          </div>
        </div>

        {/* AI & Interaction Logic */}
        {showInsights && (
          <div className="my-4 p-4 bg-white/5 rounded-lg border-[0.5px] border-silver-frost text-xs text-gray-200 animate-in fade-in slide-in-from-top-2 glass-effect">
            <h4 className="font-bold text-deep-gold uppercase mb-2 flex items-center gap-2 tracking-widest">
              <Zap className="w-3 h-3" />
              2026 AUDIT REPORT
            </h4>
            {loadingInsights ? (
              <div className="flex items-center gap-2 text-gray-500 font-mono">
                <div className="w-3 h-3 border-2 border-deep-gold border-t-transparent rounded-full animate-spin"></div>
                ANALYST PROCESSING...
              </div>
            ) : (
              <div className="whitespace-pre-line leading-relaxed italic border-l-2 border-deep-gold/30 pl-3">
                {aiInsightsText}
              </div>
            )}
          </div>
        )}

        <div className="mt-auto pt-4 flex flex-wrap gap-3 border-t border-silver-frost">
          <button 
            onClick={fetchInsights}
            className="flex items-center gap-2 px-4 py-2 bg-obsidian-matte border-[0.5px] border-silver-frost hover:border-deep-gold hover:scale-[1.02] active:scale-[0.98] text-[10px] font-black uppercase tracking-widest rounded-lg transition-all text-white"
          >
            <BarChart3 className="w-3.5 h-3.5 text-deep-gold" />
            ANALYZE
          </button>
          <button 
            onClick={() => onPrequalify(car)}
            className="flex items-center gap-2 px-4 py-2 bg-electric-blue hover:bg-electric-blue/90 hover:scale-[1.02] active:scale-[0.98] text-[10px] font-black uppercase tracking-widest rounded-lg transition-all text-white"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            PREQUAL
          </button>
          <button 
            onClick={() => onAppraisal(car)}
            className="flex items-center gap-2 px-4 py-2 bg-obsidian-matte border-[0.5px] border-silver-frost hover:border-green-signal hover:scale-[1.02] active:scale-[0.98] text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ml-auto text-white"
          >
            <DollarSign className="w-3.5 h-3.5 text-green-signal" />
            APPRAISE
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;