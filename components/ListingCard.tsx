
import React, { useState } from 'react';
import { CarListing } from '../types';
import { 
  ExternalLink, Bookmark, ShieldCheck, Globe, Info, MessageSquare, 
  Zap, Fingerprint, Settings2, TrendingUp, Cpu, History, AlertCircle,
  BarChart3, DollarSign, Activity
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

  const isPriceDropped = car.priceHistory.length > 1 && 
    car.priceHistory[car.priceHistory.length - 1].price < car.priceHistory[0].price;

  return (
    <div className="bg-luxury-card border border-border-gray rounded-xl overflow-hidden group hover:border-deep-gold/50 transition-all duration-300 flex flex-col xl:flex-row h-full">
      {/* Image Section */}
      <div className="relative w-full xl:w-96 h-64 xl:h-auto overflow-hidden">
        <img 
          src={car.imageUrl} 
          alt={car.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {car.cpoStatus && (
            <span className="bg-emerald-accent text-white text-[10px] font-black px-2 py-1 rounded shadow-lg flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" /> 2026 CPO PLATINUM
            </span>
          )}
          {car.hiddenSoftwareValueCad > 0 && (
            <span className="bg-electric-blue text-white text-[10px] font-black px-2 py-1 rounded shadow-lg flex items-center gap-1">
              <Cpu className="w-3 h-3" /> FoD: +${car.hiddenSoftwareValueCad.toLocaleString()} UNLOCKABLE
            </span>
          )}
        </div>
        <div className="absolute bottom-3 left-3 flex gap-2">
           {isPriceDropped && (
            <span className="bg-red-500/90 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 rounded flex items-center gap-1">
              <History className="w-3 h-3" /> PRICE DROP HISTORY
            </span>
          )}
        </div>
        <button className="absolute bottom-3 right-3 p-2 rounded-full bg-luxury-dark/80 text-gray-400 hover:text-white transition-colors backdrop-blur-sm">
          <Bookmark className="w-4 h-4" />
        </button>
      </div>

      {/* Content Section */}
      <div className="flex-1 p-6 flex flex-col">
        {/* Header Area */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-1">
              <h3 className="font-display font-bold text-xl leading-tight group-hover:text-deep-gold transition-colors">
                {car.title}
              </h3>
              {car.vehicleHealthScore > 95 && (
                <div className="flex items-center gap-1 px-2 py-0.5 bg-emerald-accent/10 border border-emerald-accent/20 rounded text-[9px] font-bold text-emerald-accent">
                  <Activity className="w-2.5 h-2.5" /> TELEMETRY: {car.vehicleHealthScore}%
                </div>
              )}
            </div>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-3 bg-luxury-dark/40 rounded-lg border border-border-gray mb-4">
              <div className="space-y-1">
                <span className="text-[9px] text-gray-500 font-black uppercase tracking-tighter">VIN Decode</span>
                <p className="text-[11px] font-mono text-gray-300 truncate">{car.vin || 'PENDING'}</p>
              </div>
              <div className="space-y-1">
                <span className="text-[9px] text-gray-500 font-black uppercase tracking-tighter">Recall Check</span>
                <p className={`text-[11px] font-bold ${car.recallStatus === 'Clear' ? 'text-emerald-accent' : 'text-red-500'}`}>
                  {car.recallStatus === 'Clear' ? 'NHTSA CLEAR' : 'ACTION REQ'}
                </p>
              </div>
              <div className="space-y-1">
                <span className="text-[9px] text-gray-500 font-black uppercase tracking-tighter">Settlement (Est)</span>
                <p className="text-[11px] font-bold text-deep-gold">${usdSettlement} USD</p>
              </div>
              <div className="space-y-1">
                <span className="text-[9px] text-gray-500 font-black uppercase tracking-tighter">FX Lock (1.38)</span>
                <p className="text-[11px] font-bold text-gray-400">VOLATILITY SAFE</p>
              </div>
            </div>

            <p className="text-gray-400 text-sm flex items-center gap-1 mb-4">
              <Globe className="w-3.5 h-3.5" />
              {car.location} • {car.dealerName}
            </p>
          </div>
          <div className="flex flex-col items-center">
            <VibeScoreDial score={car.vibeScore} />
            <div className="mt-2 text-[9px] font-bold text-deep-gold uppercase tracking-tighter text-center">
              Arbitrage Vibe
            </div>
          </div>
        </div>

        {/* 2026 Market Metrics: DTT Predictor */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 border-t border-border-gray">
          <div>
            <span className="text-[10px] text-gray-500 font-bold uppercase block mb-1">Sticker Price</span>
            <p className="font-bold text-white text-lg">${car.price.toLocaleString()}</p>
          </div>
          <div>
            <span className="text-[10px] text-gray-500 font-bold uppercase block mb-1">Affordability (Lease)</span>
            <p className="font-bold text-electric-blue text-lg">${car.monthlyPaymentCad.toLocaleString()}<span className="text-[10px] ml-1">/mo</span></p>
          </div>
          <div>
            <span className="text-[10px] text-gray-500 font-bold uppercase block mb-1">DTT: GTA vs US</span>
            <div className="flex items-center gap-2">
              <span className="text-gray-400 font-bold">{car.daysToTurnGta}d</span>
              <div className="h-1 flex-1 bg-border-gray rounded-full overflow-hidden">
                <div className="h-full bg-emerald-accent" style={{ width: `${(car.daysToTurnUs / car.daysToTurnGta) * 100}%` }}></div>
              </div>
              <span className="text-emerald-accent font-bold">{car.daysToTurnUs}d</span>
            </div>
          </div>
          <div>
            <span className="text-[10px] text-gray-500 font-bold uppercase block mb-1">Net US Margin</span>
            <p className="font-bold text-emerald-accent text-lg">+${car.usExportProfitCad.toLocaleString()} CAD</p>
          </div>
        </div>

        {/* AI & Interaction Logic */}
        {showInsights && (
          <div className="my-4 p-4 bg-luxury-dark/50 rounded-lg border border-border-gray text-xs text-gray-300 animate-in fade-in slide-in-from-top-2">
            <h4 className="font-bold text-deep-gold uppercase mb-2 flex items-center gap-2">
              <Zap className="w-3 h-3" />
              2026 Intelligence Audit (FoD + Market Velocity)
            </h4>
            {loadingInsights ? (
              <div className="flex items-center gap-2 text-gray-500">
                <div className="w-3 h-3 border-2 border-deep-gold border-t-transparent rounded-full animate-spin"></div>
                Decoding software modules & market health...
              </div>
            ) : (
              <div className="whitespace-pre-line leading-relaxed italic border-l-2 border-deep-gold/30 pl-3">
                {aiInsightsText}
              </div>
            )}
          </div>
        )}

        <div className="mt-auto pt-4 flex flex-wrap gap-3 border-t border-border-gray">
          <button 
            onClick={fetchInsights}
            className="flex items-center gap-2 px-4 py-2 bg-luxury-card border border-border-gray hover:border-deep-gold hover:scale-[1.02] active:scale-[0.98] text-xs font-bold rounded-lg transition-all"
          >
            <BarChart3 className="w-3.5 h-3.5 text-deep-gold" />
            MARKET AUDIT
          </button>
          <button 
            onClick={() => onPrequalify(car)}
            className="flex items-center gap-2 px-4 py-2 bg-electric-blue hover:bg-electric-blue/90 hover:scale-[1.02] active:scale-[0.98] text-white text-xs font-bold rounded-lg transition-all"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            VOICEFLOW PREQUAL
          </button>
          <button 
            onClick={() => onAppraisal(car)}
            className="flex items-center gap-2 px-4 py-2 bg-luxury-card border border-border-gray hover:border-emerald-accent hover:scale-[1.02] active:scale-[0.98] text-xs font-bold rounded-lg transition-all ml-auto"
          >
            <DollarSign className="w-3.5 h-3.5 text-emerald-accent" />
            LIVE APPRAISAL
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
