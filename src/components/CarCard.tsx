import React from 'react';
import { Car } from '../types';
import { Heart, Users, Gauge, Zap, CheckCircle2, AlertCircle } from 'lucide-react';

interface CarCardProps {
  car: Car;
  isFavorite: boolean;
  onToggleFavorite: (carId: string) => void;
  onViewDetails: (car: Car) => void;
  onBookNow: (car: Car) => void;
}

export const CarCard: React.FC<CarCardProps> = ({
  car,
  isFavorite,
  onToggleFavorite,
  onViewDetails,
  onBookNow,
}) => {
  return (
    <div className="glass-panel glass-panel-hover rounded-xl overflow-hidden flex flex-col group relative">
      
      {/* Visual Image Container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-black/50">
        <img
          src={car.heroImage}
          alt={`${car.brandName} ${car.model}`}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={(e) => {
            // Elegant fallback container in case of network issue
            (e.currentTarget as HTMLImageElement).src = '/src/assets/images/hero_supercar_dark_1790857698810.jpg';
          }}
        />

        {/* Gradient Scrim for contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#08090C] via-transparent to-black/40" />

        {/* Top Floating Controls */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          {/* Availability text indicator */}
          <div className="flex items-center gap-1.5 text-[11px] font-medium tracking-wide">
            {car.availability === 'Available' ? (
              <span className="flex items-center gap-1 text-emerald-400 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Available
              </span>
            ) : (
              <span className="flex items-center gap-1 text-amber-300 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                {car.availability}
              </span>
            )}
          </div>

          {/* Favorite button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(car.id);
            }}
            title={isFavorite ? 'Remove from favorites' : 'Save to favorites'}
            className="p-1.5 rounded-full bg-black/60 backdrop-blur-md hover:bg-black/90 transition-colors cursor-pointer text-white"
          >
            <Heart
              className={`w-4 h-4 transition-colors ${
                isFavorite ? 'fill-[#D4AF37] text-[#D4AF37]' : 'text-neutral-300 hover:text-white'
              }`}
            />
          </button>
        </div>

        {/* Bottom category kicker on image */}
        <div className="absolute bottom-2.5 left-3 text-[11px] uppercase tracking-wider text-neutral-300 font-medium">
          {car.category}
        </div>
      </div>

      {/* Content Area */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        
        {/* Brand & Model Name */}
        <div>
          <div className="flex items-baseline justify-between">
            <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
              {car.brandName}
            </span>
            <span className="text-xs text-neutral-400 tabular-nums">
              {car.year}
            </span>
          </div>
          <h3 className="font-luxury text-lg font-bold text-white mt-1 group-hover:text-[#D4AF37] transition-colors truncate">
            {car.model}
          </h3>
        </div>

        {/* Clean Unboxed Metadata Specs with Separators (Anti-AI Slop Rule) */}
        <div className="flex items-center gap-2 text-xs text-neutral-400">
          <span>{car.seats} Seats</span>
          <span aria-hidden="true">·</span>
          <span>{car.transmission}</span>
          <span aria-hidden="true">·</span>
          <span className="truncate max-w-[120px]">{car.fuelType}</span>
        </div>

        {/* Performance Snippet */}
        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/5 text-[11px]">
          <div>
            <span className="text-neutral-400">Output:</span>{' '}
            <strong className="text-white tabular-nums font-semibold">{car.specs.horsepower} HP</strong>
          </div>
          <div>
            <span className="text-neutral-400">0–100:</span>{' '}
            <strong className="text-white tabular-nums font-semibold">{car.specs.acceleration0100}</strong>
          </div>
        </div>

        {/* Pricing & Deposit */}
        <div className="pt-2 border-t border-white/5 flex items-baseline justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-neutral-400">Daily Rate</p>
            <p className="text-xl font-bold text-white tabular-nums font-luxury">
              ${car.dailyPrice.toLocaleString()} <span className="text-xs font-sans font-normal text-neutral-400">/ day</span>
            </p>
          </div>
          <div className="text-right">
            <p className="text-[10px] uppercase tracking-wider text-neutral-400">Security Deposit</p>
            <p className="text-xs font-medium text-neutral-300 tabular-nums">
              ${car.deposit.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 grid grid-cols-2 gap-2">
          <button
            onClick={() => onViewDetails(car)}
            className="w-full py-2 px-3 text-xs font-medium text-white hover:text-[#D4AF37] bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#D4AF37]/50 rounded-md transition-colors text-center cursor-pointer whitespace-nowrap"
          >
            View Details
          </button>
          <button
            onClick={() => onBookNow(car)}
            className="w-full py-2 px-3 text-xs font-semibold uppercase tracking-wider text-black bg-[#D4AF37] hover:bg-[#E5C07B] rounded-md transition-colors text-center cursor-pointer whitespace-nowrap font-medium"
          >
            Book Now
          </button>
        </div>

      </div>
    </div>
  );
};
