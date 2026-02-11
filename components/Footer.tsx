
import React from 'react';
import { ShieldCheck, MapPin, Mail, Phone, Instagram, Linkedin, Twitter, ExternalLink } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-luxury-card border-t border-border-gray pt-16 pb-8 px-6 mt-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        {/* Brand & Mission */}
        <div className="space-y-6">
          <h2 className="font-display font-bold text-xl text-deep-gold tracking-wider">
            EXOTIC INTEL <span className="text-white">GTA</span>
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            The Greater Toronto Area's premier AI-driven arbitrage engine. We empower elite brokers in Vaughan, Oakville, and Downtown Toronto to capitalize on the 2026 US-Export market with institutional-grade data.
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-gray-500 hover:text-deep-gold transition-colors"><Instagram className="w-5 h-5" /></a>
            <a href="#" className="text-gray-500 hover:text-deep-gold transition-colors"><Linkedin className="w-5 h-5" /></a>
            <a href="#" className="text-gray-500 hover:text-deep-gold transition-colors"><Twitter className="w-5 h-5" /></a>
          </div>
        </div>

        {/* Regional Hubs */}
        <div className="space-y-6">
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Regional Hubs</h3>
          <ul className="space-y-4">
            <li className="flex items-start gap-3 text-sm text-gray-400">
              <MapPin className="w-4 h-4 text-deep-gold shrink-0 mt-0.5" />
              <span>Yorkville Office: 100 Yorkville Ave, Toronto, ON M5R 3K4</span>
            </li>
            <li className="flex items-start gap-3 text-sm text-gray-400">
              <MapPin className="w-4 h-4 text-deep-gold shrink-0 mt-0.5" />
              <span>Oakville Logistics: 2500 Wyecroft Rd, Oakville, ON L6L 6M9</span>
            </li>
            <li className="flex items-start gap-3 text-sm text-gray-400">
              <MapPin className="w-4 h-4 text-deep-gold shrink-0 mt-0.5" />
              <span>Vaughan Showroom: 3201 Hwy 7, Vaughan, ON L4K 5Z7</span>
            </li>
          </ul>
        </div>

        {/* Legal & Governance */}
        <div className="space-y-6">
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Legal & Governance</h3>
          <ul className="space-y-3">
            <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
            <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">DMCA Compliance</a></li>
            <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Cookie Policy</a></li>
            <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Export Compliance 2.0</a></li>
          </ul>
        </div>

        {/* Support & Intelligence */}
        <div className="space-y-6">
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Broker Intelligence</h3>
          <ul className="space-y-4">
            <li className="flex items-center gap-3 text-sm text-gray-400 hover:text-white transition-colors cursor-pointer group">
              <Mail className="w-4 h-4 text-electric-blue" />
              <span>intel@exoticgta.ca</span>
            </li>
            <li className="flex items-center gap-3 text-sm text-gray-400">
              <Phone className="w-4 h-4 text-electric-blue" />
              <span>+1 (888) EXOTIC-1</span>
            </li>
            <li className="pt-2">
              <button className="w-full py-3 bg-luxury-dark border border-border-gray rounded-lg text-xs font-bold uppercase hover:border-deep-gold transition-all flex items-center justify-center gap-2">
                Help Center <ExternalLink className="w-3 h-3" />
              </button>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-border-gray flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2 text-[10px] text-gray-500 font-bold uppercase tracking-tighter">
          <ShieldCheck className="w-4 h-4 text-emerald-accent" />
          <span>Verified Arbitrage Engine v2.0.26 - SSL Secured & encrypted</span>
        </div>
        <div className="text-[10px] text-gray-600 max-w-2xl text-center md:text-right leading-relaxed">
          DISCLAIMER: Exotic Intel GTA is an independent data analysis platform. We are not an authorized dealer for Porsche AG, Ferrari S.p.A., or any other automotive manufacturer. All export profit estimates are subject to daily currency fluctuations (CAD/USD) and US import tariffs at the time of entry.
        </div>
      </div>
      <div className="text-center mt-8 text-[10px] text-gray-700">
        © 2026 Exotic Intel GTA Logistics Group. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
