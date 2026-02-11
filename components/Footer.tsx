
import React from 'react';
import { ShieldCheck, MapPin, Mail, Phone, Instagram, Linkedin, Twitter, ExternalLink } from 'lucide-react';

interface FooterProps {
  onLegalClick: (type: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onLegalClick }) => {
  return (
    <footer className="bg-gradient-to-b from-[#1E1B4B] to-[#020617] border-t border-white/10 pt-20 pb-12 px-8 mt-16 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
        {/* Brand & Mission */}
        <div className="space-y-6">
          <h2 className="font-display font-bold text-3xl text-electric-gold tracking-widest drop-shadow-[0_0_10px_rgba(255,215,0,0.3)]">
            EXOTIC INTEL <span className="text-white">GTA</span>
          </h2>
          <p className="text-slate-300 text-base leading-relaxed font-medium">
            The Greater Toronto Area's premier AI-driven arbitrage engine. We empower elite brokers in Vaughan, Oakville, and Downtown Toronto to capitalize on the 2026 US-Export market with institutional-grade data.
          </p>
          <div className="flex gap-6">
            <a href="javascript:void(0)" className="text-slate-400 hover:text-electric-gold transition-all hover:scale-110"><Instagram className="w-6 h-6" /></a>
            <a href="javascript:void(0)" className="text-slate-400 hover:text-electric-gold transition-all hover:scale-110"><Linkedin className="w-6 h-6" /></a>
            <a href="javascript:void(0)" className="text-slate-400 hover:text-electric-gold transition-all hover:scale-110"><Twitter className="w-6 h-6" /></a>
          </div>
        </div>

        {/* Regional Hubs */}
        <div className="space-y-6">
          <h3 className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] border-b border-white/5 pb-3">Regional Hubs</h3>
          <ul className="space-y-6">
            <li className="flex items-start gap-4 text-sm text-slate-200 group">
              <MapPin className="w-5 h-5 text-electric-gold shrink-0 mt-0.5 group-hover:animate-bounce" />
              <span className="group-hover:text-white transition-colors">Yorkville Office: 100 Yorkville Ave, Toronto, ON M5R 3K4</span>
            </li>
            <li className="flex items-start gap-4 text-sm text-slate-200 group">
              <MapPin className="w-5 h-5 text-electric-gold shrink-0 mt-0.5 group-hover:animate-bounce" />
              <span className="group-hover:text-white transition-colors">Oakville Logistics: 2500 Wyecroft Rd, Oakville, ON L6L 6M9</span>
            </li>
            <li className="flex items-start gap-4 text-sm text-slate-200 group">
              <MapPin className="w-5 h-5 text-electric-gold shrink-0 mt-0.5 group-hover:animate-bounce" />
              <span className="group-hover:text-white transition-colors">Vaughan Showroom: 3201 Hwy 7, Vaughan, ON L4K 5Z7</span>
            </li>
          </ul>
        </div>

        {/* Legal & Governance */}
        <div className="space-y-6">
          <h3 className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] border-b border-white/5 pb-3">Legal & Governance</h3>
          <ul className="space-y-4">
            <li><button onClick={() => onLegalClick('Privacy Policy')} className="text-base text-slate-300 hover:text-white hover:translate-x-1 transition-all text-left w-full font-semibold">Privacy Policy</button></li>
            <li><button onClick={() => onLegalClick('Terms of Service')} className="text-base text-slate-300 hover:text-white hover:translate-x-1 transition-all text-left w-full font-semibold">Terms of Service</button></li>
            <li><button onClick={() => onLegalClick('DMCA Compliance')} className="text-base text-slate-300 hover:text-white hover:translate-x-1 transition-all text-left w-full font-semibold">DMCA Compliance</button></li>
            <li><button onClick={() => onLegalClick('Cookie Policy')} className="text-base text-slate-300 hover:text-white hover:translate-x-1 transition-all text-left w-full font-semibold">Cookie Policy</button></li>
            <li><button onClick={() => onLegalClick('Export Compliance 2.0')} className="text-base text-slate-300 hover:text-white hover:translate-x-1 transition-all text-left w-full font-semibold">Export Compliance 2.0</button></li>
          </ul>
        </div>

        {/* Support & Intelligence */}
        <div className="space-y-6">
          <h3 className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] border-b border-white/5 pb-3">Broker Intelligence</h3>
          <ul className="space-y-6">
            <li className="flex items-center gap-4 text-base text-slate-200 hover:text-captivating-blue transition-colors cursor-pointer group">
              <div className="p-2 bg-captivating-blue/10 rounded-lg group-hover:bg-captivating-blue group-hover:text-white transition-all">
                <Mail className="w-5 h-5" />
              </div>
              <span className="font-bold">intel@exoticgta.ca</span>
            </li>
            <li className="flex items-center gap-4 text-base text-slate-200 group">
              <div className="p-2 bg-captivating-blue/10 rounded-lg">
                <Phone className="w-5 h-5 text-captivating-blue" />
              </div>
              <span className="font-bold">+1 (888) EXOTIC-1</span>
            </li>
            <li className="pt-4">
              <button 
                onClick={() => onLegalClick('Customer Support')}
                className="w-full py-5 bg-white/5 border border-white/10 rounded-2xl text-xs font-black uppercase tracking-[0.2em] hover:bg-white hover:text-midnight-indigo transition-all flex items-center justify-center gap-3 text-white shadow-xl"
              >
                Help Center <ExternalLink className="w-4 h-4" />
              </button>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-12 border-t border-white/5 flex flex-col lg:flex-row justify-between items-center gap-10">
        <div className="flex items-center gap-4 text-xs text-emerald-green font-black uppercase tracking-[0.2em] bg-emerald-green/10 px-6 py-3 rounded-full border border-emerald-green/20 shadow-[0_0_20px_rgba(80,200,120,0.1)]">
          <ShieldCheck className="w-5 h-5 animate-pulse" />
          <span>Verified Arbitrage Engine v2.0.26 - SECURED</span>
        </div>
        <div className="text-sm text-slate-400 max-w-2xl text-center lg:text-right leading-relaxed font-medium">
          <span className="text-electric-gold font-black">DISCLAIMER:</span> Exotic Intel GTA is an independent data analysis platform. We are not an authorized dealer for Porsche AG, Ferrari S.p.A., or any other automotive manufacturer. All export profit estimates are subject to daily currency fluctuations (CAD/USD) and US import tariffs at the time of entry.
        </div>
      </div>
      <div className="text-center mt-16 text-[10px] text-slate-600 font-black tracking-[0.4em] uppercase">
        © 2026 Exotic Intel GTA Logistics Group. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
