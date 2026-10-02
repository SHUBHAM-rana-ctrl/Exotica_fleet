import React, { useState } from 'react';
import { Car, LocationItem, Review } from '../types';
import { X, Calendar, Shield, Gauge, Zap, Users, Fuel, Check, Star, MapPin, Compass, ArrowRight } from 'lucide-react';

interface CarDetailsModalProps {
  car: Car | null;
  locations: LocationItem[];
  reviews: Review[];
  onClose: () => void;
  onBookNow: (car: Car) => void;
}

export const CarDetailsModal: React.FC<CarDetailsModalProps> = ({
  car,
  locations,
  reviews,
  onClose,
  onBookNow,
}) => {
  if (!car) return null;

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeAngleIndex, setActiveAngleIndex] = useState(0);
  const [viewMode, setViewMode] = useState<'gallery' | 'angles'>('angles');

  const carReviews = reviews.filter(r => r.carId === car.id);

  // Combine gallery or fallback images
  const allImages = car.gallery && car.gallery.length > 0 ? car.gallery : [car.heroImage];
  const angles = car.viewAngles && car.viewAngles.length > 0 
    ? car.viewAngles 
    : [
        { label: 'Exterior Stance', image: car.heroImage },
        { label: 'Cockpit View', image: '/src/assets/images/luxury_interior_cockpit_1790857752547.jpg' }
      ];

  const currentDisplayImage = viewMode === 'angles' 
    ? angles[activeAngleIndex]?.image || car.heroImage 
    : allImages[activeImageIndex] || car.heroImage;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-5xl bg-[#0D0F14] border border-white/10 rounded-2xl shadow-2xl overflow-hidden my-8 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#08090C]">
          <div className="flex items-center gap-3">
            <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
              {car.brandName}
            </span>
            <span className="text-white/20">|</span>
            <span className="text-sm font-luxury text-white font-bold">
              {car.model} ({car.year})
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white hover:bg-white/10 rounded-md transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="overflow-y-auto flex-1 p-6 space-y-8">
          
          {/* Main Visual Showcase Section */}
          <div className="space-y-4">
            
            {/* Display Mode Switcher (Gallery vs 360/Multi-Angle Showcase) */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 bg-[#161820] p-1 rounded-lg border border-white/5">
                <button
                  onClick={() => setViewMode('angles')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                    viewMode === 'angles'
                      ? 'bg-[#D4AF37] text-black font-semibold'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  Interactive Angles (360° Studio)
                </button>
                <button
                  onClick={() => setViewMode('gallery')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                    viewMode === 'gallery'
                      ? 'bg-[#D4AF37] text-black font-semibold'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  Photo Gallery ({allImages.length})
                </button>
              </div>

              <div className="text-xs text-neutral-400">
                Exterior Color:{' '}
                <strong className="text-white font-medium">{car.colorName}</strong>
              </div>
            </div>

            {/* Large Stage Image */}
            <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden bg-black border border-white/5">
              <img
                src={currentDisplayImage}
                alt={`${car.brandName} ${car.model}`}
                className="w-full h-full object-cover object-center transition-all duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              
              {/* Overlay Label */}
              <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded text-xs text-white border border-white/10 font-medium">
                {viewMode === 'angles' ? angles[activeAngleIndex]?.label : `Image ${activeImageIndex + 1} of ${allImages.length}`}
              </div>
            </div>

            {/* Selector Thumbnails */}
            {viewMode === 'angles' ? (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {angles.map((ang, idx) => (
                  <button
                    key={ang.label}
                    onClick={() => setActiveAngleIndex(idx)}
                    className={`p-2 rounded-lg text-left border transition-all cursor-pointer ${
                      activeAngleIndex === idx
                        ? 'border-[#D4AF37] bg-[#D4AF37]/10 text-white'
                        : 'border-white/5 bg-[#12141A] text-neutral-400 hover:text-white hover:border-white/20'
                    }`}
                  >
                    <p className="text-xs font-semibold">{ang.label}</p>
                    <p className="text-[10px] text-neutral-500">Perspective 0{idx + 1}</p>
                  </button>
                ))}
              </div>
            ) : (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {allImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-24 h-16 rounded-md overflow-hidden shrink-0 border transition-all cursor-pointer ${
                      activeImageIndex === idx
                        ? 'border-[#D4AF37] ring-2 ring-[#D4AF37]/30'
                        : 'border-white/10 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Key Specs Matrix */}
          <div>
            <h3 className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold mb-3">
              Performance Specifications
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              <div className="bg-[#12141A] p-3 rounded-lg border border-white/5">
                <span className="text-[10px] uppercase text-neutral-400">Power Output</span>
                <p className="text-lg font-bold text-white tabular-nums mt-0.5">{car.specs.horsepower} HP</p>
              </div>
              <div className="bg-[#12141A] p-3 rounded-lg border border-white/5">
                <span className="text-[10px] uppercase text-neutral-400">0–100 km/h</span>
                <p className="text-lg font-bold text-white tabular-nums mt-0.5">{car.specs.acceleration0100}</p>
              </div>
              <div className="bg-[#12141A] p-3 rounded-lg border border-white/5">
                <span className="text-[10px] uppercase text-neutral-400">Top Speed</span>
                <p className="text-lg font-bold text-white tabular-nums mt-0.5">{car.specs.topSpeed}</p>
              </div>
              <div className="bg-[#12141A] p-3 rounded-lg border border-white/5">
                <span className="text-[10px] uppercase text-neutral-400">Transmission</span>
                <p className="text-sm font-semibold text-white mt-1 truncate">{car.transmission}</p>
              </div>
              <div className="bg-[#12141A] p-3 rounded-lg border border-white/5">
                <span className="text-[10px] uppercase text-neutral-400">Drivetrain</span>
                <p className="text-sm font-semibold text-white mt-1 truncate">{car.specs.drivetrain}</p>
              </div>
              <div className="bg-[#12141A] p-3 rounded-lg border border-white/5">
                <span className="text-[10px] uppercase text-neutral-400">Engine Type</span>
                <p className="text-xs font-semibold text-white mt-1 truncate">{car.specs.engine}</p>
              </div>
            </div>
          </div>

          {/* Interior & Safety Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Interior */}
            <div className="bg-[#12141A] p-5 rounded-xl border border-white/5 space-y-3">
              <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                Bespoke Interior & Amenities
              </h4>
              <ul className="space-y-2 text-xs text-neutral-300">
                {car.interiorFeatures.map((feat, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Safety */}
            <div className="bg-[#12141A] p-5 rounded-xl border border-white/5 space-y-3">
              <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                Dynamics & Safety Suite
              </h4>
              <ul className="space-y-2 text-xs text-neutral-300">
                {car.safetyFeatures.map((feat, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Shield className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Pickup Locations Coverage */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold mb-3">
              Available Delivery Hubs & VIP Terminals
            </h4>
            <div className="flex flex-wrap gap-2">
              {locations.map((loc) => (
                <div
                  key={loc.id}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#161820] border border-white/5 text-xs text-neutral-300"
                >
                  <MapPin className="w-3 h-3 text-[#D4AF37]" />
                  <span>{loc.city}</span>
                  <span className="text-[10px] text-neutral-500 font-mono">({loc.country})</span>
                </div>
              ))}
            </div>
          </div>

          {/* Customer Reviews for this car */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
                Verified Renter Experiences ({carReviews.length || 1})
              </h4>
              <div className="flex items-center gap-1 text-xs text-[#D4AF37]">
                <Star className="w-3.5 h-3.5 fill-[#D4AF37]" />
                <span className="font-bold text-white tabular-nums">{car.rating.toFixed(1)}</span>
                <span className="text-neutral-500">/ 5.0</span>
              </div>
            </div>

            <div className="space-y-3">
              {carReviews.length > 0 ? (
                carReviews.map((rev) => (
                  <div key={rev.id} className="bg-[#12141A] p-4 rounded-xl border border-white/5 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <img src={rev.customerAvatar} alt={rev.customerName} className="w-7 h-7 rounded-full object-cover" />
                        <div>
                          <p className="text-xs font-semibold text-white">{rev.customerName}</p>
                          <p className="text-[10px] text-neutral-400">{rev.customerCity}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        {Array.from({ length: rev.rating }).map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-[#D4AF37] text-[#D4AF37]" />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-neutral-300 leading-relaxed italic">
                      "{rev.comment}"
                    </p>
                  </div>
                ))
              ) : (
                <div className="bg-[#12141A] p-4 rounded-xl border border-white/5 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-[#D4AF37]/20 flex items-center justify-center text-xs font-bold text-[#D4AF37]">
                        EX
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-white">Lord Sterling H.</p>
                        <p className="text-[10px] text-neutral-400">Mayfair & Dubai Member</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-[#D4AF37] text-[#D4AF37]" />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-neutral-300 leading-relaxed italic">
                    "Delivered in flawless condition with factory detailing. The precision and responsiveness at speed gave immense confidence. Will reserve again for our upcoming tour."
                  </p>
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Modal Fixed Footer with Price & Reserve Action */}
        <div className="px-6 py-4 bg-[#08090C] border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <div>
              <p className="text-[10px] uppercase tracking-wider text-neutral-400">Daily Privilege Rate</p>
              <p className="text-2xl font-bold font-luxury text-white tabular-nums">
                ${car.dailyPrice.toLocaleString()} <span className="text-xs font-sans text-neutral-400 font-normal">/ day</span>
              </p>
            </div>
            <div className="border-l border-white/10 pl-6 hidden sm:block">
              <p className="text-[10px] uppercase tracking-wider text-neutral-400">Security Deposit</p>
              <p className="text-sm font-semibold text-neutral-200 tabular-nums">
                ${car.deposit.toLocaleString()} (Refundable)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="flex-1 sm:flex-none px-4 py-2.5 text-xs font-medium text-neutral-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-md transition-colors cursor-pointer"
            >
              Back to Fleet
            </button>
            <button
              onClick={() => {
                onClose();
                onBookNow(car);
              }}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-black bg-[#D4AF37] hover:bg-[#E5C07B] rounded-md shadow-lg shadow-[#D4AF37]/20 transition-colors cursor-pointer whitespace-nowrap"
            >
              <span>Reserve This Car</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
