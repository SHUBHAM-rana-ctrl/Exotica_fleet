import React from 'react';
import { FilterState, Brand } from '../types';
import { Search, SlidersHorizontal, RotateCcw } from 'lucide-react';

interface FleetFilterProps {
  filters: FilterState;
  onFilterChange: (newFilters: FilterState) => void;
  brands: Brand[];
  totalResults: number;
  onReset: () => void;
}

export const FleetFilter: React.FC<FleetFilterProps> = ({
  filters,
  onFilterChange,
  brands,
  totalResults,
  onReset,
}) => {
  const categories = [
    'All',
    'Luxury Sedan',
    'SUV',
    'Sports Car',
    'Supercar',
    'Convertible',
    'Chauffeur'
  ];

  return (
    <div className="space-y-6">
      {/* Top Search & Category Row */}
      <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
        
        {/* Search input with clean border */}
        <div className="relative flex-1 max-w-lg">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={filters.search}
            onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
            placeholder="Search by brand, model (e.g., Urus, Ghost, RS7)..."
            className="w-full bg-[#12141A] border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#D4AF37] transition-colors"
          />
          {filters.search && (
            <button
              onClick={() => onFilterChange({ ...filters, search: '' })}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white text-xs cursor-pointer"
            >
              Clear
            </button>
          )}
        </div>

        {/* Sort and Count */}
        <div className="flex items-center gap-4 self-end lg:self-center">
          <span className="text-xs text-neutral-400 font-medium whitespace-nowrap">
            Showing <strong className="text-white tabular-nums">{totalResults}</strong> Vehicles
          </span>

          <select
            value={filters.sortBy}
            onChange={(e) => onFilterChange({ ...filters, sortBy: e.target.value as FilterState['sortBy'] })}
            className="bg-[#12141A] border border-white/10 rounded-lg px-3 py-2 text-xs text-neutral-200 focus:outline-none focus:border-[#D4AF37] cursor-pointer"
          >
            <option value="featured">Featured First</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="power-desc">Horsepower: Highest</option>
            <option value="rating-desc">Highest Customer Rating</option>
          </select>

          <button
            onClick={onReset}
            title="Reset Filters"
            className="p-2 text-neutral-400 hover:text-[#D4AF37] bg-[#12141A] border border-white/10 rounded-lg transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Brand Horizontal Scroll Filter */}
      <div>
        <div className="text-[11px] uppercase tracking-wider text-neutral-400 mb-2 font-semibold">
          Select Marque
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => onFilterChange({ ...filters, brand: 'all' })}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors cursor-pointer ${
              filters.brand === 'all'
                ? 'bg-[#D4AF37] text-black font-semibold shadow-sm'
                : 'bg-[#12141A] text-neutral-300 hover:text-white hover:bg-neutral-800 border border-white/5'
            }`}
          >
            All Marques
          </button>
          {brands.map((b) => (
            <button
              key={b.id}
              onClick={() => onFilterChange({ ...filters, brand: b.id })}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors cursor-pointer ${
                filters.brand === b.id
                  ? 'bg-[#D4AF37] text-black font-semibold shadow-sm'
                  : 'bg-[#12141A] text-neutral-300 hover:text-white hover:bg-neutral-800 border border-white/5'
              }`}
            >
              {b.name}
            </button>
          ))}
        </div>
      </div>

      {/* Category Segmented Controls & Multi-Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-white/5">
        
        {/* Categories */}
        <div className="flex flex-wrap items-center gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => onFilterChange({ ...filters, category: cat })}
              className={`px-3 py-1 text-xs font-medium rounded-md whitespace-nowrap transition-colors cursor-pointer ${
                filters.category === cat
                  ? 'bg-white/15 text-white border border-white/30'
                  : 'text-neutral-400 hover:text-white hover:bg-white/5 border border-transparent'
              }`}
            >
              {cat === 'All' ? 'All Classes' : cat}
            </button>
          ))}
        </div>

        {/* Secondary dropdowns: Transmission, Seats, Availability */}
        <div className="flex flex-wrap items-center gap-2.5">
          <select
            value={filters.transmission}
            onChange={(e) => onFilterChange({ ...filters, transmission: e.target.value })}
            className="bg-[#12141A] border border-white/10 rounded-md px-2.5 py-1 text-xs text-neutral-300 focus:outline-none cursor-pointer"
          >
            <option value="all">Transmission: All</option>
            <option value="Automatic">Automatic</option>
            <option value="PDK Dual-Clutch">PDK Dual-Clutch</option>
            <option value="Steptronic">Steptronic</option>
            <option value="DCT">DCT</option>
          </select>

          <select
            value={filters.seats}
            onChange={(e) => onFilterChange({ ...filters, seats: e.target.value })}
            className="bg-[#12141A] border border-white/10 rounded-md px-2.5 py-1 text-xs text-neutral-300 focus:outline-none cursor-pointer"
          >
            <option value="all">Seats: Any</option>
            <option value="2">2 Seats</option>
            <option value="4">4 Seats</option>
            <option value="5">5 Seats</option>
            <option value="7">7 Seats</option>
          </select>

          <button
            onClick={() => onFilterChange({ 
              ...filters, 
              availability: filters.availability === 'available' ? 'all' : 'available' 
            })}
            className={`px-3 py-1 text-xs font-medium rounded-md border transition-colors cursor-pointer ${
              filters.availability === 'available'
                ? 'border-[#D4AF37] text-[#D4AF37] bg-[#D4AF37]/10'
                : 'border-white/10 text-neutral-400 hover:text-white'
            }`}
          >
            Available Now Only
          </button>
        </div>
      </div>
    </div>
  );
};
