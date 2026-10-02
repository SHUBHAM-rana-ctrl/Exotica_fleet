import React, { useState } from 'react';
import { LocationItem } from '../types';
import { MapPin, Phone, Clock, Navigation, CheckCircle2, Building, ShieldCheck } from 'lucide-react';

interface LocationsSectionProps {
  locations: LocationItem[];
  onSelectCityForBooking: (city: string) => void;
}

export const LocationsSection: React.FC<LocationsSectionProps> = ({
  locations,
  onSelectCityForBooking,
}) => {
  const [activeLocationId, setActiveLocationId] = useState<string>(locations[0]?.id || 'mumbai');

  const activeLocation = locations.find((l) => l.id === activeLocationId) || locations[0];

  return (
    <section id="locations" className="py-24 bg-[#0A0C11] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-14 space-y-3">
          <div className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-semibold">
            Global Footprint
          </div>
          <h2 className="font-luxury text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight text-balance">
            PRIVATE FLEET HUBS & TERMINALS.
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 leading-relaxed">
            Strategically positioned across India’s premier financial and cultural epicenters, alongside our international marquee terminal in Dubai.
          </p>
        </div>

        {/* Location Selector Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none border-b border-white/10">
          {locations.map((loc) => (
            <button
              key={loc.id}
              onClick={() => setActiveLocationId(loc.id)}
              className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                activeLocationId === loc.id
                  ? 'bg-[#D4AF37] text-black shadow-lg shadow-[#D4AF37]/20'
                  : 'bg-[#12141A] text-neutral-300 hover:text-white border border-white/5'
              }`}
            >
              {loc.city}
            </button>
          ))}
        </div>

        {/* Interactive Hub Detail & Map Presentation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Hub Information */}
          <div className="lg:col-span-5 glass-panel rounded-2xl p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-widest text-[#D4AF37]">
                  {activeLocation.country} Flagship
                </span>
                <span className="text-[11px] px-2.5 py-0.5 rounded bg-white/10 text-white font-medium">
                  {activeLocation.badge}
                </span>
              </div>

              <div>
                <h3 className="font-luxury text-2xl font-bold text-white">
                  {activeLocation.city}
                </h3>
                <p className="text-sm text-neutral-300 mt-1">
                  {activeLocation.hubName}
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 space-y-3 text-xs text-neutral-300">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-neutral-500 block text-[10px] uppercase">Lounge Address</span>
                    <span className="text-white leading-relaxed">{activeLocation.address}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-neutral-500 block text-[10px] uppercase">Concierge Operating Hours</span>
                    <span className="text-white">{activeLocation.hours}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-neutral-500 block text-[10px] uppercase">Direct VIP Dispatch</span>
                    <span className="text-white font-mono">{activeLocation.phone}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Navigation className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-neutral-500 block text-[10px] uppercase">White-Glove Delivery Radius</span>
                    <span className="text-white">{activeLocation.deliveryCoverageKm} km around metropolitan limits</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10">
              <button
                onClick={() => onSelectCityForBooking(activeLocation.city)}
                className="w-full py-3 px-4 text-xs font-semibold uppercase tracking-wider text-black bg-[#D4AF37] hover:bg-[#E5C07B] rounded-md transition-colors cursor-pointer text-center"
              >
                Reserve Vehicle in {activeLocation.city}
              </button>
            </div>
          </div>

          {/* Right Column: Stylized Minimalist Luxury Radar/Map Graphic */}
          <div className="lg:col-span-7 glass-panel rounded-2xl p-6 sm:p-8 relative overflow-hidden flex flex-col justify-between min-h-[380px] bg-radial from-[#1A1D27] to-[#0A0C11]">
            
            {/* Visual Grid Lines and Radar Rings */}
            <div className="absolute inset-0 opacity-15 pointer-events-none" style={{
              backgroundImage: 'radial-gradient(circle at center, #D4AF37 1px, transparent 1px), linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
              backgroundSize: '40px 40px'
            }} />

            {/* Hub Status Tag */}
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-xs uppercase tracking-wider text-neutral-300 font-medium">
                  Terminal Online · Fleet Dispatched
                </span>
              </div>
              <span className="text-xs font-mono text-[#D4AF37]">
                LAT/LONG SYNCED
              </span>
            </div>

            {/* Center City Map Marker Graphic */}
            <div className="relative z-10 my-auto text-center py-10 space-y-3">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/40 text-[#D4AF37] shadow-xl shadow-[#D4AF37]/20">
                <Building className="w-9 h-9" />
              </div>
              <div>
                <h4 className="font-luxury text-2xl font-bold text-white tracking-wide">
                  {activeLocation.city} Terminal
                </h4>
                <p className="text-xs text-neutral-400 max-w-sm mx-auto mt-1">
                  Enclosed transporter dispatch, private lounge hospitality, and high-speed delivery to luxury hotels & airports.
                </p>
              </div>
            </div>

            {/* Bottom Service Coverage Tags */}
            <div className="relative z-10 grid grid-cols-3 gap-2 pt-4 border-t border-white/10 text-center">
              <div className="p-2 bg-black/40 rounded-lg border border-white/5">
                <p className="text-[10px] text-neutral-400">Airport Tarmac</p>
                <p className="text-xs font-semibold text-white mt-0.5">Direct Gate</p>
              </div>
              <div className="p-2 bg-black/40 rounded-lg border border-white/5">
                <p className="text-[10px] text-neutral-400">Security Clearance</p>
                <p className="text-xs font-semibold text-white mt-0.5">Tier 1 Certified</p>
              </div>
              <div className="p-2 bg-black/40 rounded-lg border border-white/5">
                <p className="text-[10px] text-neutral-400">Pre-Delivery Clean</p>
                <p className="text-xs font-semibold text-white mt-0.5">Full Concours Detailing</p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
