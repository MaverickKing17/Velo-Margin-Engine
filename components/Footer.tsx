
import React from 'react';
import { ShieldCheck, MapPin, Mail, Phone, Instagram, Linkedin, Twitter, ExternalLink } from 'lucide-react';

interface FooterProps {
  onLegalClick: (type: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onLegalClick }) => {
  return (
    <footer className="bg-luxury-card border-t border-border-gray pt-16 pb-12 px-6 mt-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        {/* Brand & Mission */}
        <div className="space-y-6">
          <h2 className="font-display font-bold text-2xl text-deep-gold tracking-wider">
            EXOTIC INTEL <span className="text-white">GTA</span>
          </h2>
          <p className="text-gray-200 text-base leading-relaxed">
            The Greater Toronto Area's premier AI-driven arbitrage engine. We empower elite brokers in Vaughan, Oakville, and Downtown Toronto to capitalize on the 2026 US-Export market with institutional-grade data.
          </p>
          <div className="flex gap-5">
            <a href="javascript:void(0)" className="text-gray-300 hover:text-deep-gold transition-colors"><Instagram className="w-6 h-6" /></a>
            <a href="javascript:void(0)" className="text-gray-300 hover:text-deep-gold transition-colors"><Linkedin className="w-6 h-6" /></a>
            <a href="javascript:void(0)" className="text-gray-300 hover:text-deep-gold transition-colors"><Twitter className="w-6 h-6" /></a>
          </div>
        </div>

        {/* Regional Hubs */}
        <div className="space-y-6">
          <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest border-b border-border-gray pb-2">Regional Hubs</h3>
          <ul className="space-y-5">
            <li className="flex items-start gap-4 text-sm text-gray-200">
              <MapPin className="w-5 h-5 text-deep-gold shrink-0 mt-0.5" />
              <span>Yorkville Office: 100 Yorkville Ave, Toronto, ON M5R 3K4</span>
            </li>
            <li className="flex items-start gap-4 text-sm text-gray-200">
              <MapPin className="w-5 h-5 text-deep-gold shrink-0 mt-0.5" />
              <span>Oakville Logistics: 2500 Wyecroft Rd, Oakville, ON L6L 6M9</span>
            </li>
            <li className="flex items-start gap-4 text-sm text-gray-200">
              <MapPin className="w-5 h-5 text-deep-gold shrink-0 mt-0.5" />
              <span>Vaughan Showroom: 3201 Hwy 7, Vaughan, ON L4K 5Z7</span>
            </li>
          </ul>
        </div>

        {/* Legal & Governance */}
        <div className="space-y-6">
          <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest border-b border-border-gray pb-2">Legal & Governance</h3>
          <ul className="space-y-4">
            <li><button onClick={() => onLegalClick('Privacy Policy')} className="text-base text-gray-200 hover:text-deep-gold transition-colors text-left w-full font-medium">Privacy Policy</button></li>
            <li><button onClick={() => onLegalClick('Terms of Service')} className="text-base text-gray-200 hover:text-deep-gold transition-colors text-left w-full font-medium">Terms of Service</button></li>
            <li><button onClick={() => onLegalClick('DMCA Compliance')} className="text-base text-gray-200 hover:text-deep-gold transition-colors text-left w-full font-medium">DMCA Compliance</button></li>
            <li><button onClick={() => onLegalClick('Cookie Policy')} className="text-base text-gray-200 hover:text-deep-gold transition-colors text-left w-full font-medium">Cookie Policy</button></li>
            <li><button onClick={() => onLegalClick('Export Compliance 2.0')} className="text-base text-gray-200 hover:text-deep-gold transition-colors text-left w-full font-medium">Export Compliance 2.0</button></li>
          </ul>
        </div>

        {/* Support & Intelligence */}
        <div className="space-y-6">
          <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest border-b border-border-gray pb-2">Broker Intelligence</h3>
          <ul className="space-y-5">
            <li className="flex items-center gap-4 text-base text-gray-200 hover:text-white transition-colors cursor-pointer group">
              <Mail className="w-5 h-5 text-electric-blue" />
              <span className="font-semibold">intel@exoticgta.ca</span>
            </li>
            <li className="flex items-center gap-4 text-base text-gray-200">
              <Phone className="w-5 h-5 text-electric-blue" />
              <span className="font-semibold">+1 (888) EXOTIC-1</span>
            </li>
            <li className="pt-2">
              <button 
                onClick={() => onLegalClick('Customer Support')}
                className="w-full py-4 bg-luxury-dark border border-border-gray rounded-xl text-sm font-bold uppercase hover:border-deep-gold hover:text-deep-gold transition-all flex items-center justify-center gap-2 text-white"
              >
                Help Center <ExternalLink className="w-4 h-4" />
              </button>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-10 border-t border-border-gray flex flex-col lg:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-3 text-xs text-emerald-accent font-black uppercase tracking-widest bg-emerald-accent/10 px-4 py-2 rounded-full border border-emerald-accent/20">
          <ShieldCheck className="w-5 h-5" />
          <span>Verified Arbitrage Engine v2.0.26 - SECURED</span>
        </div>
        <div className="text-sm text-gray-300 max-w-3xl text-center lg:text-right leading-relaxed font-medium">
          <span className="text-deep-gold font-bold">DISCLAIMER:</span> Exotic Intel GTA is an independent data analysis platform. We are not an authorized dealer for Porsche AG, Ferrari S.p.A., or any other automotive manufacturer. All export profit estimates are subject to daily currency fluctuations (CAD/USD) and US import tariffs at the time of entry.
        </div>
      </div>
      <div className="text-center mt-12 text-xs text-gray-500 font-bold tracking-widest uppercase">
        © 2026 Exotic Intel GTA Logistics Group. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
