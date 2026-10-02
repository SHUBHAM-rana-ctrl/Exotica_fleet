import React from 'react';
import { ServiceItem } from '../types';
import { UserCheck, PlaneTakeoff, HeartHandshake, Briefcase, Compass, Truck, Crown, Check, ArrowRight } from 'lucide-react';

interface ServicesSectionProps {
  services: ServiceItem[];
  onSelectService: (service: ServiceItem) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  services,
  onSelectService,
}) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'UserCheck': return <UserCheck className="w-6 h-6 text-[#D4AF37]" />;
      case 'PlaneTakeoff': return <PlaneTakeoff className="w-6 h-6 text-[#D4AF37]" />;
      case 'HeartHandshake': return <HeartHandshake className="w-6 h-6 text-[#D4AF37]" />;
      case 'Briefcase': return <Briefcase className="w-6 h-6 text-[#D4AF37]" />;
      case 'Compass': return <Compass className="w-6 h-6 text-[#D4AF37]" />;
      case 'Truck': return <Truck className="w-6 h-6 text-[#D4AF37]" />;
      case 'Crown': return <Crown className="w-6 h-6 text-[#D4AF37]" />;
      default: return <Crown className="w-6 h-6 text-[#D4AF37]" />;
    }
  };

  return (
    <section id="services" className="py-24 bg-[#08090C] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-16 space-y-3">
          <div className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-semibold">
            Bespoke Mobility & Hospitality
          </div>
          <h2 className="font-luxury text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight text-balance">
            ADDITIONAL PRIVILEGED SERVICES.
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 leading-relaxed">
            From discreet private jet transfers to enclosed white-glove car delivery, our international concierge ensures every journey is executed to five-star standards.
          </p>
        </div>

        {/* Services Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((srv) => (
            <div
              key={srv.id}
              className="glass-panel glass-panel-hover rounded-xl p-6 flex flex-col justify-between space-y-6 group"
            >
              <div className="space-y-4">
                {/* Icon & Rate */}
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-lg bg-black/40 border border-white/10 group-hover:border-[#D4AF37]/50 transition-colors">
                    {getIcon(srv.icon)}
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] uppercase tracking-wider text-neutral-400 block">Rate from</span>
                    <span className="text-lg font-bold font-luxury text-white tabular-nums">
                      ${srv.pricePerDay} <span className="text-xs font-sans font-normal text-neutral-400">/ day</span>
                    </span>
                  </div>
                </div>

                {/* Title & Subtitle */}
                <div>
                  <h3 className="font-luxury text-lg font-bold text-white group-hover:text-[#D4AF37] transition-colors">
                    {srv.title}
                  </h3>
                  <p className="text-xs text-[#D4AF37] mt-0.5 font-medium">
                    {srv.subtitle}
                  </p>
                </div>

                <p className="text-xs text-neutral-300 leading-relaxed">
                  {srv.description}
                </p>

                {/* Highlights */}
                <div className="pt-2 border-t border-white/5 space-y-2">
                  {srv.highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-neutral-400">
                      <Check className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => onSelectService(srv)}
                className="w-full py-2.5 px-4 text-xs font-semibold uppercase tracking-wider text-white hover:text-black bg-white/5 hover:bg-[#D4AF37] border border-white/10 hover:border-[#D4AF37] rounded-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Reserve Service</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
