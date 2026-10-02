import React, { useState } from 'react';
import { Booking, Brand, Car, Payment, Review, User } from '../types';
import { 
  X, Plus, Edit2, Trash2, CheckCircle2, XCircle, Search, 
  DollarSign, TrendingUp, Users, Shield, Database, Car as CarIcon, 
  Calendar, Check, AlertCircle, RefreshCw 
} from 'lucide-react';
import { ExoticaDatabase } from '../services/storage';

interface AdminDashboardModalProps {
  isOpen: boolean;
  cars: Car[];
  brands: Brand[];
  bookings: Booking[];
  users: User[];
  payments: Payment[];
  reviews: Review[];
  onClose: () => void;
  onSaveCar: (car: Car) => void;
  onDeleteCar: (carId: string) => void;
  onUpdateBookingStatus: (bookingId: string, status: Booking['status']) => void;
  onOpenSchemaModal: () => void;
}

export const AdminDashboardModal: React.FC<AdminDashboardModalProps> = ({
  isOpen,
  cars,
  brands,
  bookings,
  users,
  payments,
  reviews,
  onClose,
  onSaveCar,
  onDeleteCar,
  onUpdateBookingStatus,
  onOpenSchemaModal,
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'overview' | 'fleet' | 'bookings' | 'customers' | 'revenue'>('overview');
  
  // Search state
  const [fleetSearch, setFleetSearch] = useState('');
  const [bookingFilterStatus, setBookingFilterStatus] = useState<string>('All');

  // Car Edit / Add Modal state
  const [editingCar, setEditingCar] = useState<Car | null>(null);
  const [isCarModalOpen, setIsCarModalOpen] = useState(false);

  // Statistics
  const totalRevenue = payments.reduce((acc, p) => acc + p.amount, 0);
  const activeRentals = bookings.filter((b) => b.status === 'Confirmed' || b.status === 'Active').length;
  const availableVehiclesCount = cars.filter((c) => c.availability === 'Available').length;
  const fleetUtilizationRate = Math.round(((cars.length - availableVehiclesCount) / cars.length) * 100) || 18;

  // Filtered cars
  const filteredCars = cars.filter(
    (c) =>
      c.model.toLowerCase().includes(fleetSearch.toLowerCase()) ||
      c.brandName.toLowerCase().includes(fleetSearch.toLowerCase())
  );

  // Filtered bookings
  const filteredBookings = bookings.filter(
    (b) => bookingFilterStatus === 'All' || b.status === bookingFilterStatus
  );

  const handleOpenAddCar = () => {
    const newCarTemplate: Car = {
      id: `car-${Date.now()}`,
      brandId: brands[0]?.id || 'porsche',
      brandName: brands[0]?.name || 'Porsche',
      model: '',
      year: 2025,
      category: 'Sports Car',
      seats: 4,
      transmission: 'PDK Dual-Clutch',
      fuelType: 'Twin-Turbo Petrol',
      dailyPrice: 1200,
      deposit: 2500,
      availability: 'Available',
      heroImage: '/src/assets/images/sports_porsche_911_1790857738319.jpg',
      gallery: ['/src/assets/images/sports_porsche_911_1790857738319.jpg'],
      viewAngles: [
        { label: 'Exterior', image: '/src/assets/images/sports_porsche_911_1790857738319.jpg' }
      ],
      specs: {
        engine: '3.0L Twin-Turbo Boxer 6',
        horsepower: 480,
        topSpeed: '315 km/h',
        acceleration0100: '3.2s',
        transmission: '8-Speed PDK',
        drivetrain: 'Rear-Wheel Drive',
        fuelType: 'Petrol'
      },
      interiorFeatures: ['Nappa Leather', 'Sport Chrono', 'Surround Sound'],
      safetyFeatures: ['Carbon Ceramic Brakes', 'Surround View Cameras'],
      rating: 5.0,
      reviewCount: 0,
      featured: false,
      popular: true,
      colorName: 'Metallic Black'
    };
    setEditingCar(newCarTemplate);
    setIsCarModalOpen(true);
  };

  const handleSaveCarForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCar || !editingCar.model.trim()) return;

    onSaveCar(editingCar);
    setIsCarModalOpen(false);
    setEditingCar(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-6xl bg-[#0D0F14] border border-white/10 rounded-2xl shadow-2xl overflow-hidden my-6 max-h-[94vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#08090C]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/30">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-bold font-luxury text-white">EXOTICA Fleet Operations Control</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-semibold uppercase tracking-wider">
                  Admin System Active
                </span>
              </div>
              <p className="text-[11px] text-neutral-400">Live Telemetry & Fleet Management Console</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenSchemaModal}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#D4AF37] bg-[#D4AF37]/10 border border-[#D4AF37]/40 rounded-md hover:bg-[#D4AF37]/20 transition-colors cursor-pointer"
            >
              <Database className="w-3.5 h-3.5" />
              <span>Inspect MySQL Relational DDL</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-neutral-400 hover:text-white hover:bg-white/10 rounded-md transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1 px-6 border-b border-white/10 bg-[#0A0C11] overflow-x-auto scrollbar-none text-xs">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-3 px-3.5 font-medium border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'overview'
                ? 'border-[#D4AF37] text-[#D4AF37]'
                : 'border-transparent text-neutral-400 hover:text-white'
            }`}
          >
            Dashboard Overview
          </button>

          <button
            onClick={() => setActiveTab('fleet')}
            className={`py-3 px-3.5 font-medium border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'fleet'
                ? 'border-[#D4AF37] text-[#D4AF37]'
                : 'border-transparent text-neutral-400 hover:text-white'
            }`}
          >
            Fleet Manager ({cars.length} Cars)
          </button>

          <button
            onClick={() => setActiveTab('bookings')}
            className={`py-3 px-3.5 font-medium border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'bookings'
                ? 'border-[#D4AF37] text-[#D4AF37]'
                : 'border-transparent text-neutral-400 hover:text-white'
            }`}
          >
            Reservations ({bookings.length})
          </button>

          <button
            onClick={() => setActiveTab('customers')}
            className={`py-3 px-3.5 font-medium border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'customers'
                ? 'border-[#D4AF37] text-[#D4AF37]'
                : 'border-transparent text-neutral-400 hover:text-white'
            }`}
          >
            Client Directory ({users.length})
          </button>

          <button
            onClick={() => setActiveTab('revenue')}
            className={`py-3 px-3.5 font-medium border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'revenue'
                ? 'border-[#D4AF37] text-[#D4AF37]'
                : 'border-transparent text-neutral-400 hover:text-white'
            }`}
          >
            Revenue & Financials
          </button>
        </div>

        {/* Tab Content */}
        <div className="overflow-y-auto flex-1 p-6 space-y-6">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              
              {/* Stat Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-[#12141A] p-4 rounded-xl border border-white/5 space-y-1">
                  <div className="flex items-center justify-between text-neutral-400">
                    <span className="text-[10px] uppercase font-semibold">Total Revenue</span>
                    <DollarSign className="w-4 h-4 text-[#D4AF37]" />
                  </div>
                  <p className="text-2xl font-bold font-luxury text-white tabular-nums">
                    ${totalRevenue.toLocaleString()}
                  </p>
                  <p className="text-[11px] text-emerald-400 font-medium">+18% vs last month</p>
                </div>

                <div className="bg-[#12141A] p-4 rounded-xl border border-white/5 space-y-1">
                  <div className="flex items-center justify-between text-neutral-400">
                    <span className="text-[10px] uppercase font-semibold">Total Fleet Vehicles</span>
                    <CarIcon className="w-4 h-4 text-[#D4AF37]" />
                  </div>
                  <p className="text-2xl font-bold font-luxury text-white tabular-nums">
                    {cars.length}
                  </p>
                  <p className="text-[11px] text-neutral-400">{availableVehiclesCount} ready for immediate dispatch</p>
                </div>

                <div className="bg-[#12141A] p-4 rounded-xl border border-white/5 space-y-1">
                  <div className="flex items-center justify-between text-neutral-400">
                    <span className="text-[10px] uppercase font-semibold">Active & Upcoming Rentals</span>
                    <Calendar className="w-4 h-4 text-[#D4AF37]" />
                  </div>
                  <p className="text-2xl font-bold font-luxury text-white tabular-nums">
                    {activeRentals}
                  </p>
                  <p className="text-[11px] text-emerald-400 font-medium">100% on-time delivery</p>
                </div>

                <div className="bg-[#12141A] p-4 rounded-xl border border-white/5 space-y-1">
                  <div className="flex items-center justify-between text-neutral-400">
                    <span className="text-[10px] uppercase font-semibold">Registered VIP Clients</span>
                    <Users className="w-4 h-4 text-[#D4AF37]" />
                  </div>
                  <p className="text-2xl font-bold font-luxury text-white tabular-nums">
                    {users.length}
                  </p>
                  <p className="text-[11px] text-[#D4AF37]">92% repeat charter rate</p>
                </div>
              </div>

              {/* Popular Fleet Highlights */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                <div className="bg-[#12141A] p-5 rounded-xl border border-white/5 space-y-4">
                  <h4 className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
                    Top High-Demand Supercars
                  </h4>
                  <div className="space-y-3">
                    {cars.filter((c) => c.popular).slice(0, 4).map((c) => (
                      <div key={c.id} className="flex items-center justify-between p-2.5 bg-black/40 rounded-lg text-xs">
                        <div className="flex items-center gap-3">
                          <img src={c.heroImage} alt={c.model} className="w-12 h-8 object-cover rounded" />
                          <div>
                            <p className="font-semibold text-white">{c.brandName} {c.model}</p>
                            <p className="text-[10px] text-neutral-400">${c.dailyPrice}/day · {c.specs.horsepower} HP</p>
                          </div>
                        </div>
                        <span className="text-xs font-semibold text-emerald-400">
                          {c.availability}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-[#12141A] p-5 rounded-xl border border-white/5 space-y-4">
                  <h4 className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
                    Recent Reservation Dispatches
                  </h4>
                  <div className="space-y-3">
                    {bookings.slice(0, 4).map((b) => (
                      <div key={b.id} className="flex items-center justify-between p-2.5 bg-black/40 rounded-lg text-xs">
                        <div>
                          <p className="font-semibold text-white">{b.carName}</p>
                          <p className="text-[10px] text-neutral-400">{b.customerName} · {b.durationDays} Days</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-white tabular-nums">${b.grandTotal.toLocaleString()}</p>
                          <span className="text-[10px] text-emerald-400 font-medium">{b.status}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* TAB 2: FLEET MANAGER */}
          {activeTab === 'fleet' && (
            <div className="space-y-4">
              
              {/* Fleet Toolbar */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <div className="relative flex-1 max-w-md">
                  <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={fleetSearch}
                    onChange={(e) => setFleetSearch(e.target.value)}
                    placeholder="Filter by brand or model..."
                    className="w-full bg-[#12141A] border border-white/10 rounded-lg pl-9 pr-4 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <button
                  onClick={handleOpenAddCar}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-black bg-[#D4AF37] hover:bg-[#E5C07B] rounded-md transition-colors cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Vehicle</span>
                </button>
              </div>

              {/* Fleet Table */}
              <div className="bg-[#12141A] rounded-xl border border-white/5 overflow-hidden">
                <table className="w-full text-xs text-left">
                  <thead className="bg-[#0A0C11] text-neutral-400 border-b border-white/5">
                    <tr>
                      <th className="p-3">Vehicle</th>
                      <th className="p-3">Class</th>
                      <th className="p-3">Daily Rate</th>
                      <th className="p-3">Deposit</th>
                      <th className="p-3">Output</th>
                      <th className="p-3">Availability</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-neutral-300">
                    {filteredCars.map((c) => (
                      <tr key={c.id} className="hover:bg-white/5 transition-colors">
                        <td className="p-3 flex items-center gap-3">
                          <img src={c.heroImage} alt={c.model} className="w-12 h-8 object-cover rounded bg-black" />
                          <div>
                            <p className="font-bold text-white">{c.brandName} {c.model}</p>
                            <p className="text-[10px] text-neutral-400">{c.year} · {c.transmission}</p>
                          </div>
                        </td>
                        <td className="p-3 text-neutral-300">{c.category}</td>
                        <td className="p-3 font-semibold text-white tabular-nums">${c.dailyPrice}</td>
                        <td className="p-3 text-neutral-400 tabular-nums">${c.deposit}</td>
                        <td className="p-3 text-neutral-300 tabular-nums">{c.specs.horsepower} HP</td>
                        <td className="p-3">
                          <select
                            value={c.availability}
                            onChange={(e) => {
                              const updated = { ...c, availability: e.target.value as Car['availability'] };
                              onSaveCar(updated);
                            }}
                            className={`px-2 py-1 rounded text-[11px] font-medium border bg-[#0A0C11] cursor-pointer ${
                              c.availability === 'Available'
                                ? 'border-emerald-500/30 text-emerald-400'
                                : 'border-amber-500/30 text-amber-300'
                            }`}
                          >
                            <option value="Available">Available</option>
                            <option value="Reserved">Reserved</option>
                            <option value="In Maintenance">In Maintenance</option>
                          </select>
                        </td>
                        <td className="p-3 text-right">
                          <div className="inline-flex items-center gap-2">
                            <button
                              onClick={() => {
                                setEditingCar(c);
                                setIsCarModalOpen(true);
                              }}
                              title="Edit specifications"
                              className="p-1.5 text-neutral-400 hover:text-[#D4AF37] hover:bg-white/5 rounded cursor-pointer"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => {
                                if (confirm(`Delete ${c.brandName} ${c.model} from fleet registry?`)) {
                                  onDeleteCar(c.id);
                                }
                              }}
                              title="Delete from fleet"
                              className="p-1.5 text-neutral-400 hover:text-red-400 hover:bg-white/5 rounded cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: BOOKINGS MANAGER */}
          {activeTab === 'bookings' && (
            <div className="space-y-4">
              
              {/* Filter by status */}
              <div className="flex items-center gap-2">
                {['All', 'Confirmed', 'Active', 'Completed', 'Cancelled'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setBookingFilterStatus(st)}
                    className={`px-3 py-1.5 text-xs rounded-md font-medium cursor-pointer transition-colors ${
                      bookingFilterStatus === st
                        ? 'bg-[#D4AF37] text-black font-semibold'
                        : 'bg-[#12141A] text-neutral-400 hover:text-white border border-white/5'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>

              {/* Bookings Table */}
              <div className="bg-[#12141A] rounded-xl border border-white/5 overflow-hidden">
                <table className="w-full text-xs text-left">
                  <thead className="bg-[#0A0C11] text-neutral-400 border-b border-white/5">
                    <tr>
                      <th className="p-3">Ref ID</th>
                      <th className="p-3">Vehicle</th>
                      <th className="p-3">Guest</th>
                      <th className="p-3">Duration & Dates</th>
                      <th className="p-3">Chauffeur</th>
                      <th className="p-3">Total</th>
                      <th className="p-3">Status</th>
                      <th className="p-3 text-right">Approve / Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-neutral-300">
                    {filteredBookings.map((b) => (
                      <tr key={b.id} className="hover:bg-white/5 transition-colors">
                        <td className="p-3 font-mono text-[#D4AF37] font-semibold">{b.bookingReference}</td>
                        <td className="p-3 font-medium text-white">{b.carName}</td>
                        <td className="p-3">
                          <p className="text-white font-medium">{b.customerName}</p>
                          <p className="text-[10px] text-neutral-400">{b.customerEmail}</p>
                        </td>
                        <td className="p-3 text-neutral-400">
                          {b.pickupDate} ({b.durationDays}d)
                        </td>
                        <td className="p-3">
                          {b.chauffeurOption ? (
                            <span className="text-[#D4AF37] font-semibold">Chauffeur Assigned</span>
                          ) : (
                            <span className="text-neutral-500">Self-Drive</span>
                          )}
                        </td>
                        <td className="p-3 font-bold text-white tabular-nums">${b.grandTotal.toLocaleString()}</td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded text-[11px] font-medium ${
                            b.status === 'Confirmed' ? 'bg-emerald-500/20 text-emerald-400' :
                            b.status === 'Cancelled' ? 'bg-red-500/20 text-red-400' : 'bg-neutral-800 text-neutral-300'
                          }`}>
                            {b.status}
                          </span>
                        </td>
                        <td className="p-3 text-right">
                          <div className="inline-flex items-center gap-1.5">
                            {b.status !== 'Confirmed' && (
                              <button
                                onClick={() => onUpdateBookingStatus(b.id, 'Confirmed')}
                                title="Approve Reservation"
                                className="p-1 px-2 text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 rounded hover:bg-emerald-500/20 cursor-pointer"
                              >
                                Approve
                              </button>
                            )}
                            {b.status !== 'Cancelled' && (
                              <button
                                onClick={() => onUpdateBookingStatus(b.id, 'Cancelled')}
                                title="Cancel Reservation"
                                className="p-1 px-2 text-[10px] font-semibold text-red-400 bg-red-500/10 border border-red-500/30 rounded hover:bg-red-500/20 cursor-pointer"
                              >
                                Cancel
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: CUSTOMERS */}
          {activeTab === 'customers' && (
            <div className="space-y-4">
              <h3 className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
                Registered VIP Clientele ({users.length})
              </h3>
              <div className="bg-[#12141A] rounded-xl border border-white/5 overflow-hidden">
                <table className="w-full text-xs text-left">
                  <thead className="bg-[#0A0C11] text-neutral-400 border-b border-white/5">
                    <tr>
                      <th className="p-3">Client Name</th>
                      <th className="p-3">Email & Contact</th>
                      <th className="p-3">Membership Tier</th>
                      <th className="p-3">License Verification</th>
                      <th className="p-3">Lifetime Spend</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-neutral-300">
                    {users.map((u) => (
                      <tr key={u.id} className="hover:bg-white/5 transition-colors">
                        <td className="p-3 font-bold text-white flex items-center gap-2">
                          <img src={u.avatar} alt={u.name} className="w-7 h-7 rounded-full object-cover" />
                          <span>{u.name}</span>
                        </td>
                        <td className="p-3">
                          <p className="text-white">{u.email}</p>
                          <p className="text-[10px] text-neutral-400">{u.phone}</p>
                        </td>
                        <td className="p-3">
                          <span className="text-[#D4AF37] font-medium">{u.membershipTier}</span>
                        </td>
                        <td className="p-3 font-mono text-neutral-400">{u.licenseNumber}</td>
                        <td className="p-3 font-bold text-white tabular-nums">${u.totalSpend.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 5: REVENUE & FINANCIALS */}
          {activeTab === 'revenue' && (
            <div className="space-y-6">
              <div className="bg-[#12141A] p-6 rounded-xl border border-white/5 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
                    Gross Fleet Revenue & Receipts
                  </h4>
                  <span className="text-xl font-bold font-luxury text-white tabular-nums">
                    ${totalRevenue.toLocaleString()} USD
                  </span>
                </div>
                <p className="text-xs text-neutral-400">
                  All credit settlements, wire releases, and security deposits held in escrow.
                </p>
                
                <div className="space-y-3 pt-2">
                  {payments.map((p) => (
                    <div key={p.id} className="flex items-center justify-between p-3 bg-black/40 rounded-lg text-xs">
                      <div>
                        <p className="font-mono text-neutral-300">{p.transactionId}</p>
                        <p className="text-[10px] text-neutral-500">Ref: {p.bookingReference} · {p.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-white tabular-nums">${p.amount.toLocaleString()}</p>
                        <span className="text-emerald-400 text-[10px] font-semibold">{p.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-[#08090C] border-t border-white/10 flex items-center justify-between">
          <span className="text-xs text-neutral-400">
            EXOTICA Global Operations Center v4.2
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold text-neutral-300 hover:text-white bg-white/5 hover:bg-white/10 rounded-md border border-white/10 cursor-pointer"
          >
            Exit Admin Console
          </button>
        </div>

      </div>

      {/* Car Add / Edit Modal Drawer */}
      {isCarModalOpen && editingCar && (
        <div className="fixed inset-0 z-60 overflow-y-auto bg-black/85 flex items-center justify-center p-4">
          <div className="relative w-full max-w-2xl bg-[#0E1016] border border-white/10 rounded-xl p-6 space-y-4 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="font-luxury text-base font-bold text-white">
                {editingCar.id.startsWith('car-') ? 'Add New Fleet Vehicle' : `Edit ${editingCar.brandName} ${editingCar.model}`}
              </h3>
              <button onClick={() => setIsCarModalOpen(false)} className="text-neutral-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveCarForm} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-neutral-400 block mb-1">Brand Marque</label>
                  <select
                    value={editingCar.brandName}
                    onChange={(e) => {
                      const sel = brands.find((b) => b.name === e.target.value);
                      setEditingCar({
                        ...editingCar,
                        brandName: e.target.value,
                        brandId: sel?.id || 'porsche'
                      });
                    }}
                    className="w-full bg-[#141720] border border-white/10 rounded p-2 text-white"
                  >
                    {brands.map((b) => (
                      <option key={b.id} value={b.name}>{b.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-neutral-400 block mb-1">Model Name</label>
                  <input
                    type="text"
                    required
                    value={editingCar.model}
                    onChange={(e) => setEditingCar({ ...editingCar, model: e.target.value })}
                    placeholder="e.g. 911 GT3 RS"
                    className="w-full bg-[#141720] border border-white/10 rounded p-2 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-neutral-400 block mb-1">Category</label>
                  <select
                    value={editingCar.category}
                    onChange={(e) => setEditingCar({ ...editingCar, category: e.target.value as Car['category'] })}
                    className="w-full bg-[#141720] border border-white/10 rounded p-2 text-white"
                  >
                    <option value="Luxury Sedan">Luxury Sedan</option>
                    <option value="SUV">SUV</option>
                    <option value="Sports Car">Sports Car</option>
                    <option value="Supercar">Supercar</option>
                    <option value="Convertible">Convertible</option>
                    <option value="Chauffeur">Chauffeur</option>
                  </select>
                </div>
                <div>
                  <label className="text-neutral-400 block mb-1">Daily Price ($)</label>
                  <input
                    type="number"
                    required
                    value={editingCar.dailyPrice}
                    onChange={(e) => setEditingCar({ ...editingCar, dailyPrice: Number(e.target.value) })}
                    className="w-full bg-[#141720] border border-white/10 rounded p-2 text-white"
                  />
                </div>
                <div>
                  <label className="text-neutral-400 block mb-1">Deposit ($)</label>
                  <input
                    type="number"
                    required
                    value={editingCar.deposit}
                    onChange={(e) => setEditingCar({ ...editingCar, deposit: Number(e.target.value) })}
                    className="w-full bg-[#141720] border border-white/10 rounded p-2 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-neutral-400 block mb-1">Horsepower (HP)</label>
                  <input
                    type="number"
                    value={editingCar.specs.horsepower}
                    onChange={(e) => setEditingCar({
                      ...editingCar,
                      specs: { ...editingCar.specs, horsepower: Number(e.target.value) }
                    })}
                    className="w-full bg-[#141720] border border-white/10 rounded p-2 text-white"
                  />
                </div>
                <div>
                  <label className="text-neutral-400 block mb-1">0–100 km/h</label>
                  <input
                    type="text"
                    value={editingCar.specs.acceleration0100}
                    onChange={(e) => setEditingCar({
                      ...editingCar,
                      specs: { ...editingCar.specs, acceleration0100: e.target.value }
                    })}
                    className="w-full bg-[#141720] border border-white/10 rounded p-2 text-white"
                  />
                </div>
                <div>
                  <label className="text-neutral-400 block mb-1">Top Speed</label>
                  <input
                    type="text"
                    value={editingCar.specs.topSpeed}
                    onChange={(e) => setEditingCar({
                      ...editingCar,
                      specs: { ...editingCar.specs, topSpeed: e.target.value }
                    })}
                    className="w-full bg-[#141720] border border-white/10 rounded p-2 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-neutral-400 block mb-1">Vehicle Image URL</label>
                <input
                  type="text"
                  required
                  value={editingCar.heroImage}
                  onChange={(e) => setEditingCar({ ...editingCar, heroImage: e.target.value })}
                  placeholder="/src/assets/images/... or https://..."
                  className="w-full bg-[#141720] border border-white/10 rounded p-2 text-white"
                />
              </div>

              <div className="pt-3 border-t border-white/10 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsCarModalOpen(false)}
                  className="px-4 py-2 text-neutral-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-black bg-[#D4AF37] hover:bg-[#E5C07B] rounded font-semibold"
                >
                  Save to Fleet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
