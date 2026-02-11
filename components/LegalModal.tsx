
import React from 'react';
import { X, Shield, Scale, FileText, Globe, Zap, AlertCircle } from 'lucide-react';

interface LegalModalProps {
  type: string;
  onClose: () => void;
}

const LegalModal: React.FC<LegalModalProps> = ({ type, onClose }) => {
  const getContent = () => {
    switch (type) {
      case 'Privacy Policy':
        return (
          <div className="space-y-6 text-slate-300">
            <section>
              <h4 className="text-white font-bold flex items-center gap-2 mb-2">
                <Shield className="w-4 h-4 text-emerald-green" /> 1. Data Collection Architecture
              </h4>
              <p className="text-sm leading-relaxed">
                Exotic Intel GTA utilizes proprietary scraping algorithms to aggregate public automotive data. We collect VIN numbers, dealer locations, pricing history, and software-defined vehicle (SDV) profiles. Personal Identifiable Information (PII) is only collected when a broker initiates a "Prequalify Lead" protocol.
              </p>
            </section>
            <section>
              <h4 className="text-white font-bold flex items-center gap-2 mb-2">
                <Globe className="w-4 h-4 text-captivating-blue" /> 2. Cross-Border Intelligence
              </h4>
              <p className="text-sm leading-relaxed">
                Aggregated market data is processed across borders to calculate arbitrage spreads between the GTA and US markets. This includes real-time FX settlement rates and US Customs duty estimates.
              </p>
            </section>
            <section>
              <h4 className="text-white font-bold flex items-center gap-2 mb-2">
                <Zap className="w-4 h-4 text-electric-gold" /> 3. Voiceflow AI Integration
              </h4>
              <p className="text-sm leading-relaxed">
                Lead data is synchronized with our Voiceflow-powered AI agents to facilitate seamless broker-to-client communication. Data is encrypted in transit and stored in SOC-2 compliant repositories.
              </p>
            </section>
          </div>
        );
      case 'Terms of Service':
        return (
          <div className="space-y-6 text-slate-300">
            <section>
              <h4 className="text-white font-bold flex items-center gap-2 mb-2">
                <Scale className="w-4 h-4 text-emerald-green" /> 1. Use of the Arbitrage Engine
              </h4>
              <p className="text-sm leading-relaxed">
                The Exotic Intel GTA platform is an intelligence tool for institutional brokers. Users are granted a non-exclusive license to access proprietary "Vibe Scores" and arbitrage calculations. Reverse engineering our scraper logic is strictly prohibited.
              </p>
            </section>
            <section>
              <h4 className="text-white font-bold flex items-center gap-2 mb-2">
                <AlertCircle className="w-4 h-4 text-brembo-red" /> 2. Accuracy of Estimates
              </h4>
              <p className="text-sm leading-relaxed">
                Arbitrage spreads are projections based on the 2026 US-Export Audit. While we maintain a 98% accuracy rate on Section 232 Tariff exemptions, final duty is determined by US Customs and Border Protection at the port of entry.
              </p>
            </section>
            <section>
              <h4 className="text-white font-bold flex items-center gap-2 mb-2">
                <Shield className="w-4 h-4 text-captivating-blue" /> 3. Broker Liability
              </h4>
              <p className="text-sm leading-relaxed">
                Brokers are responsible for verifying physical vehicle conditions and CPO status before executing a flip. Exotic Intel GTA is not responsible for losses due to undisclosed mechanical defects or FX volatility.
              </p>
            </section>
          </div>
        );
      case 'DMCA Compliance':
        return (
          <div className="space-y-6 text-slate-300">
            <section>
              <h4 className="text-white font-bold flex items-center gap-2 mb-2">
                <FileText className="w-4 h-4 text-emerald-green" /> 1. Copyright Protection
              </h4>
              <p className="text-sm leading-relaxed">
                Exotic Intel GTA respects the intellectual property of photographers and automotive dealerships. Images are served via public CDN links for indexing purposes only.
              </p>
            </section>
            <section>
              <h4 className="text-white font-bold flex items-center gap-2 mb-2">
                <Shield className="w-4 h-4 text-brembo-red" /> 2. Takedown Notices
              </h4>
              <p className="text-sm leading-relaxed">
                To file a takedown notice, please provide: (a) a description of the copyrighted work, (b) the listing ID on our platform, and (c) your contact information. Send all notices to <span className="text-captivating-blue font-bold">legal@exoticgta.ca</span>.
              </p>
            </section>
          </div>
        );
      case 'Cookie Policy':
        return (
          <div className="space-y-6 text-slate-300">
            <section>
              <h4 className="text-white font-bold flex items-center gap-2 mb-2">
                <Shield className="w-4 h-4 text-emerald-green" /> 1. Essential Sourcing Cookies
              </h4>
              <p className="text-sm leading-relaxed">
                We use essential session cookies to store your "Zero-Tariff Only" preferences and active search filters across the GTA Sourcing Feed.
              </p>
            </section>
            <section>
              <h4 className="text-white font-bold flex items-center gap-2 mb-2">
                <Zap className="w-4 h-4 text-captivating-blue" /> 2. Analytics & Performance
              </h4>
              <p className="text-sm leading-relaxed">
                Anonymized tracking cookies help us identify which high-yield regions (Vaughan vs. Oakville) are generating the most arbitrage activity. This allows us to scale our scraper resources to the most active hubs.
              </p>
            </section>
          </div>
        );
      case 'Export Compliance 2.0':
        return (
          <div className="space-y-6 text-slate-300">
            <div className="p-4 bg-emerald-green/10 border border-emerald-green/20 rounded-xl mb-4">
              <span className="text-xs font-black text-emerald-green uppercase tracking-widest block mb-1">Standard: 2026 US-EXPORT AUDIT</span>
              <p className="text-[10px] text-slate-400 font-medium">Verified Compliance with CUSMA Section 2.A Protocol</p>
            </div>
            <section>
              <h4 className="text-white font-bold flex items-center gap-2 mb-2">
                <Shield className="w-4 h-4 text-electric-gold" /> 1. VIN-Origin Verification
              </h4>
              <p className="text-sm leading-relaxed font-medium">
                Our engine automatically flags VINs starting with <span className="text-white font-bold">1, 4, or 5</span> as US-Made. These units qualify for Zero-Tariff status under the "Domestic Return" exemption, significantly increasing profit margins for Toronto-based brokers.
              </p>
            </section>
            <section>
              <h4 className="text-white font-bold flex items-center gap-2 mb-2">
                <Scale className="w-4 h-4 text-captivating-blue" /> 2. 2026 CUSMA Logic
              </h4>
              <p className="text-sm leading-relaxed">
                For non-US made vehicles (e.g., German/Italian builds), we apply a standard 25% tariff on 85% of the appraised value, as per the 2026 luxury vehicle import guidelines. The "US Settlement" calculation in your dashboard accounts for this automatically.
              </p>
            </section>
            <section>
              <h4 className="text-white font-bold flex items-center gap-2 mb-2">
                <AlertCircle className="w-4 h-4 text-brembo-red" /> 3. EPA & DOT Conformity
              </h4>
              <p className="text-sm leading-relaxed">
                Units listed as "CPO" typically include the necessary software-defined compliance for US EPA standards. Non-CPO units may require a $1,800 "Compliance Buffer" which is factored into our "Total US Settlement" projection.
              </p>
            </section>
          </div>
        );
      default:
        return <p className="text-slate-300">Content loading...</p>;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-xl z-[300] flex items-center justify-center p-6 animate-in fade-in">
      <div className="bg-midnight-royal w-full max-w-2xl rounded-[2.5rem] p-10 shadow-2xl relative border border-white/10 max-h-[90vh] overflow-y-auto custom-scrollbar">
        <button 
          onClick={onClose}
          className="absolute top-8 right-8 p-3 rounded-full hover:bg-white/10 transition-colors border border-white/10"
        >
          <X className="w-6 h-6 text-slate-400" />
        </button>

        <div className="flex flex-col items-start mb-8">
          <h2 className="text-3xl font-display font-bold text-white tracking-tight">{type}</h2>
          <div className="w-16 h-1 bg-electric-gold mt-4 rounded-full"></div>
        </div>

        {getContent()}

        <div className="mt-12 flex justify-end">
          <button 
            onClick={onClose}
            className="px-8 py-4 bg-white text-midnight-indigo rounded-xl font-black uppercase text-xs tracking-widest hover:bg-electric-gold transition-all"
          >
            Acknowledge
          </button>
        </div>
      </div>
    </div>
  );
};

export default LegalModal;
