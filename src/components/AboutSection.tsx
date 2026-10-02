import React from 'react';
import { ShieldCheck, Award, Sparkles, Clock, Compass, Key } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <div id="about" className="space-y-24 py-24 bg-[#08090C] border-t border-white/5">
      
      {/* Experience Section */}
      <section id="experience" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 space-y-6">
            <div className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-semibold">
              The Exotica Philosophy
            </div>
            <h2 className="font-luxury text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight text-balance">
              THE STANDARD OF EXTRAORDINARY MOBILITY.
            </h2>
            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
              Founded on the belief that extraordinary journeys demand more than conventional rental counters. We operate an exclusive fleet of factory-maintained supercars and coachbuilt limousines delivered with bespoke concierge precision.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-lg bg-[#141720] border border-white/10 text-[#D4AF37] shrink-0 mt-1">
                  <Key className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Guaranteed Exact Model Match</h4>
                  <p className="text-xs text-neutral-400 mt-0.5 leading-relaxed">
                    Never "or similar". The exact year, engine specification, and colorway you select is the exact machine that arrives in your driveway.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-lg bg-[#141720] border border-white/10 text-[#D4AF37] shrink-0 mt-1">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Concours Detailing Standard</h4>
                  <p className="text-xs text-neutral-400 mt-0.5 leading-relaxed">
                    Every vehicle undergoes a 45-point mechanical inspection, surgical detailing, and tire pressure calibration prior to every reservation.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-lg bg-[#141720] border border-white/10 text-[#D4AF37] shrink-0 mt-1">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">24/7 Dedicated Fleet Dispatch</h4>
                  <p className="text-xs text-neutral-400 mt-0.5 leading-relaxed">
                    A private concierge team monitors weather, traffic, and your schedule with emergency replacement car guarantee within 90 minutes.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="glass-panel rounded-xl overflow-hidden aspect-[4/5] relative group">
                <img
                  src="/src/assets/images/luxury_rolls_royce_1790857721026.jpg"
                  alt="Rolls-Royce Bespoke Fleet"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-[10px] uppercase tracking-wider text-[#D4AF37] font-semibold">Chauffeur Excellence</span>
                  <p className="text-sm font-bold text-white mt-0.5">Ultra-Luxury Presidential Fleet</p>
                </div>
              </div>

              <div className="glass-panel rounded-xl overflow-hidden aspect-[4/5] relative group sm:translate-y-8">
                <img
                  src="/src/assets/images/sports_porsche_911_1790857738319.jpg"
                  alt="Porsche Performance Fleet"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-[10px] uppercase tracking-wider text-[#D4AF37] font-semibold">Self-Drive Purity</span>
                  <p className="text-sm font-bold text-white mt-0.5">Uncompromising Sports Engineering</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Brand Heritage Statement */}
      <section className="border-y border-white/5 bg-[#0C0E14] py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <p className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-semibold">
            Bespoke Mobility Without Boundaries
          </p>
          <blockquote className="font-luxury text-2xl sm:text-3xl lg:text-4xl text-white font-medium italic leading-snug">
            "To pilot an extraordinary machine is to alter the passage of time itself. We curate that singularity."
          </blockquote>
          <p className="text-xs text-neutral-400 font-sans tracking-wide">
            EXOTICA PRIVATE MOBILITY CORPORATION · DUBAI · MUMBAI · LONDON · SINGAPORE
          </p>
        </div>
      </section>

    </div>
  );
};
