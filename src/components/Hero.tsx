import React from 'react';
import { ArrowRight, Calendar, Sparkles, Gauge, Zap, ShieldCheck } from 'lucide-react';
import { Car } from '../types';

interface HeroProps {
  heroCar: Car;
  onExploreFleet: () => void;
  onBookDrive: (car?: Car) => void;
  onViewDetails: (car: Car) => void;
}

export const Hero: React.FC<HeroProps> = ({
  heroCar,
  onExploreFleet,
  onBookDrive,
  onViewDetails,
}) => {
  return (
    <section id="hero" className="relative min-h-[92vh] flex flex-col justify-center overflow-hidden bg-[#08090C]">
      {/* Background Image with Cinematic Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroCar.heroImage || '/src/assets/images/hero_supercar_dark_1790857698810.jpg'}
          alt="Exotica Supercar Hero"
          className="w-full h-full object-cover object-center scale-105 animate-in fade-in zoom-in-95 duration-1000"
          referrerPolicy="no-referrer"
        />
        {/* Measured Scrim for WCAG AA Contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#08090C] via-[#08090C]/80 to-[#08090C]/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#08090C] via-[#08090C]/60 to-transparent" />
        {/* Subtle gold atmospheric radial light */}
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#D4AF37]/10 blur-[140px] pointer-events-none rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Marquee Copy */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Clean unboxed kicker */}
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-semibold">
              <span>The International Luxury Mobility Concierge</span>
              <span aria-hidden="true">·</span>
              <span>Self-Drive & Chauffeur</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-luxury text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.08] text-balance">
              DRIVE BEYOND <br />
              <span className="gold-gradient-text">ORDINARY.</span>
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-neutral-300 max-w-xl leading-relaxed">
              Experience the world’s finest luxury cars, available at your command. Hand-selected supercars, stately limousines, and prestige SUVs across premier global destinations.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={() => onBookDrive(heroCar)}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-semibold uppercase tracking-wider text-black bg-[#D4AF37] hover:bg-[#E5C07B] rounded-md shadow-xl shadow-[#D4AF37]/20 transition-all cursor-pointer whitespace-nowrap"
              >
                <span>Book Your Drive</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onExploreFleet}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-semibold uppercase tracking-wider text-white bg-white/5 hover:bg-white/10 border border-white/20 hover:border-white/40 rounded-md backdrop-blur-md transition-all cursor-pointer whitespace-nowrap"
              >
                <span>Explore Fleet</span>
              </button>
            </div>

            {/* Trust Markers - Clean editorial layout */}
            <div className="pt-8 border-t border-white/10 grid grid-cols-3 gap-6 max-w-lg">
              <div>
                <p className="text-2xl font-bold font-luxury text-white">40+</p>
                <p className="text-xs text-neutral-400 mt-1">Supercars & Luxury Fleet</p>
              </div>
              <div>
                <p className="text-2xl font-bold font-luxury text-white">7</p>
                <p className="text-xs text-neutral-400 mt-1">VIP City Terminals</p>
              </div>
              <div>
                <p className="text-2xl font-bold font-luxury text-white">100%</p>
                <p className="text-xs text-neutral-400 mt-1">Guaranteed Model Match</p>
              </div>
            </div>
          </div>

          {/* Right Column: Featured Supercar Spotlight Card */}
          <div className="lg:col-span-5">
            <div className="glass-panel rounded-xl p-6 border border-white/10 shadow-2xl relative overflow-hidden group">
              
              {/* Subtle top badge */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="text-xs text-neutral-400 uppercase tracking-wider">
                  Featured Marquee Vehicle
                </div>
                <div className="text-xs font-semibold text-[#D4AF37] uppercase tracking-wider">
                  Ready for Delivery
                </div>
              </div>

              {/* Car Name & Brand */}
              <div className="pt-4">
                <p className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">{heroCar.brandName}</p>
                <h2 className="text-2xl font-luxury font-bold text-white mt-0.5">{heroCar.model}</h2>
              </div>

              {/* Spec Highlights Grid */}
              <div className="grid grid-cols-3 gap-3 my-6">
                <div className="bg-black/40 rounded-lg p-3 border border-white/5 text-center">
                  <p className="text-xs text-neutral-400">Power</p>
                  <p className="text-base font-bold text-white tabular-nums mt-0.5">{heroCar.specs.horsepower} HP</p>
                </div>
                <div className="bg-black/40 rounded-lg p-3 border border-white/5 text-center">
                  <p className="text-xs text-neutral-400">0–100 km/h</p>
                  <p className="text-base font-bold text-white tabular-nums mt-0.5">{heroCar.specs.acceleration0100}</p>
                </div>
                <div className="bg-black/40 rounded-lg p-3 border border-white/5 text-center">
                  <p className="text-xs text-neutral-400">Top Speed</p>
                  <p className="text-base font-bold text-white tabular-nums mt-0.5">{heroCar.specs.topSpeed}</p>
                </div>
              </div>

              {/* Pricing & Detail Action */}
              <div className="flex items-center justify-between pt-2 border-t border-white/10">
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-neutral-400">Daily Privilege Rate</p>
                  <p className="text-2xl font-bold text-white tabular-nums font-luxury">
                    ${heroCar.dailyPrice.toLocaleString()} <span className="text-xs text-neutral-400 font-sans font-normal">/ day</span>
                  </p>
                </div>

                <button
                  onClick={() => onViewDetails(heroCar)}
                  className="px-4 py-2.5 text-xs font-medium text-white hover:text-[#D4AF37] border border-white/15 hover:border-[#D4AF37] rounded-md transition-colors cursor-pointer"
                >
                  View Details & 360°
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
