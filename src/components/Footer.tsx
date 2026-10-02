import React from 'react';
import { ArrowUp, Phone, Mail, MapPin, Shield } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenSchemaModal: () => void;
  onOpenAdminPortal: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenSchemaModal,
  onOpenAdminPortal,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#050608] border-t border-white/10 text-neutral-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-baseline gap-2">
              <span className="font-luxury text-2xl font-bold tracking-wider text-white">
                EXOTICA
              </span>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#D4AF37] font-semibold">
                Fleet
              </span>
            </div>

            <p className="text-sm font-luxury text-neutral-300 italic">
              "Drive Beyond Ordinary."
            </p>

            <p className="text-xs text-neutral-400 max-w-sm leading-relaxed">
              International luxury car rental and white-glove chauffeur fleet. Operating across private aviation terminals and five-star destinations worldwide.
            </p>

            <div className="pt-2 flex items-center gap-3 text-neutral-300">
              <span className="text-[11px] text-neutral-500">Global Concierge:</span>
              <span className="text-white font-mono font-medium">+971 4 812 6000</span>
            </div>
          </div>

          {/* Quick Nav */}
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-widest text-white font-semibold">
              The Fleet
            </p>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onNavigate('fleet')} className="hover:text-white transition-colors cursor-pointer">
                  Supercar Registry
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('fleet')} className="hover:text-white transition-colors cursor-pointer">
                  Presidential Chauffeur
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('fleet')} className="hover:text-white transition-colors cursor-pointer">
                  Grand Tourers & Coupes
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('fleet')} className="hover:text-white transition-colors cursor-pointer">
                  Ultra-Luxury SUVs
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('fleet')} className="hover:text-white transition-colors cursor-pointer">
                  Convertible Collection
                </button>
              </li>
            </ul>
          </div>

          {/* Services & Concierge */}
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-widest text-white font-semibold">
              Bespoke Services
            </p>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-white transition-colors cursor-pointer">
                  Tarmac Airport Transfer
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-white transition-colors cursor-pointer">
                  Wedding Car Escort
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-white transition-colors cursor-pointer">
                  Corporate Mobility
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-white transition-colors cursor-pointer">
                  Curated Road Expeditions
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-white transition-colors cursor-pointer">
                  Doorstep Enclosed Delivery
                </button>
              </li>
            </ul>
          </div>

          {/* Hubs & Developer DDL */}
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-widest text-white font-semibold">
              Fleet Hubs
            </p>
            <ul className="space-y-2 text-neutral-400">
              <li>Mumbai (BKC Hub)</li>
              <li>Delhi (Aerocity VIP)</li>
              <li>Bangalore (UB City)</li>
              <li>Dubai (DIFC Marquee)</li>
              <li>Pune · Hyderabad · Goa</li>
            </ul>

            <div className="pt-2">
              <button
                onClick={onOpenSchemaModal}
                className="text-[11px] text-[#D4AF37] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>MySQL Relational Schema</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-12 mt-12 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-neutral-500">
            © {new Date().getFullYear()} EXOTICA Luxury Mobility Inc. All rights reserved. Precision Automotive Charter.
          </p>

          <div className="flex items-center gap-6 text-[11px]">
            <button onClick={onOpenAdminPortal} className="text-[#D4AF37] hover:underline cursor-pointer">
              Admin Console
            </button>
            <a href="#about" className="hover:text-white transition-colors">
              Privacy Protocol
            </a>
            <a href="#about" className="hover:text-white transition-colors">
              Insurance Terms
            </a>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white transition-colors cursor-pointer"
              title="Return to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
