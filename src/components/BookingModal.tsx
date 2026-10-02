import React, { useState, useMemo } from 'react';
import { Booking, Car, LocationItem, ServiceItem, User } from '../types';
import { X, Calendar, Clock, MapPin, UserCheck, ShieldCheck, CheckCircle2, AlertCircle, ArrowRight, CreditCard, Sparkles } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  car: Car | null;
  availableCars: Car[];
  locations: LocationItem[];
  services: ServiceItem[];
  currentUser: User;
  onClose: () => void;
  onBookingSuccess: (booking: Booking) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  car: initialCar,
  availableCars,
  locations,
  services,
  currentUser,
  onClose,
  onBookingSuccess,
}) => {
  if (!isOpen) return null;

  // Selected Car
  const [selectedCarId, setSelectedCarId] = useState<string>(
    initialCar ? initialCar.id : availableCars[0]?.id || ''
  );

  const selectedCar = useMemo(() => {
    return availableCars.find((c) => c.id === selectedCarId) || availableCars[0];
  }, [availableCars, selectedCarId]);

  // Locations
  const [pickupLocation, setPickupLocation] = useState<string>(
    locations[0]?.city ? `${locations[0].city} - ${locations[0].hubName}` : 'Mumbai - Flagship Hub'
  );
  const [dropoffLocation, setDropoffLocation] = useState<string>(
    locations[0]?.city ? `${locations[0].city} - ${locations[0].hubName}` : 'Mumbai - Flagship Hub'
  );

  // Dates & Times (Default tomorrow to 3 days later)
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const threeDaysLater = new Date();
  threeDaysLater.setDate(threeDaysLater.getDate() + 4);

  const [pickupDate, setPickupDate] = useState<string>(tomorrow.toISOString().split('T')[0]);
  const [returnDate, setReturnDate] = useState<string>(threeDaysLater.toISOString().split('T')[0]);
  const [pickupTime, setPickupTime] = useState<string>('10:00 AM');

  // Chauffeur & Add-ons
  const [chauffeurOption, setChauffeurOption] = useState<boolean>(false);
  const [selectedServiceIds, setSelectedServiceIds] = useState<string[]>(['doorstep-delivery']);

  // Customer Contact Fields
  const [customerName, setCustomerName] = useState(currentUser.name || 'Alexander Wright');
  const [customerEmail, setCustomerEmail] = useState(currentUser.email || 'gaikwadshubham6643@gmail.com');
  const [customerPhone, setCustomerPhone] = useState(currentUser.phone || '+91 98201 54321');
  const [driverLicenseNumber, setDriverLicenseNumber] = useState(currentUser.licenseNumber || 'MH-01-2019-0098412');
  const [specialRequests, setSpecialRequests] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'Card' | 'Apple Pay' | 'Cryptocurrency'>('Card');

  // Form error state
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Rental Duration Calculation (in days)
  const durationDays = useMemo(() => {
    try {
      const p = new Date(pickupDate).getTime();
      const r = new Date(returnDate).getTime();
      const diffMs = r - p;
      const days = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
      return days > 0 ? days : 1;
    } catch {
      return 1;
    }
  }, [pickupDate, returnDate]);

  // Price breakdown dynamic calculation
  const calculations = useMemo(() => {
    if (!selectedCar) {
      return {
        baseDailyRate: 0,
        baseTotal: 0,
        chauffeurTotal: 0,
        servicesTotal: 0,
        securityDeposit: 0,
        luxuryTaxAndInsurance: 0,
        grandTotal: 0,
      };
    }
    
    const baseDailyRate = selectedCar.dailyPrice;
    const baseTotal = baseDailyRate * durationDays;

    // Chauffeur cost ($180 / day)
    const chauffeurTotal = chauffeurOption ? 180 * durationDays : 0;

    // Services cost
    let servicesTotal = 0;
    selectedServiceIds.forEach((sId) => {
      const s = services.find((srv) => srv.id === sId);
      if (s) {
        servicesTotal += s.pricePerDay * durationDays;
      }
    });

    const securityDeposit = selectedCar.deposit;
    const luxuryTaxAndInsurance = Math.round((baseTotal + chauffeurTotal + servicesTotal) * 0.10);
    const grandTotal = baseTotal + chauffeurTotal + servicesTotal + securityDeposit + luxuryTaxAndInsurance;

    return {
      baseDailyRate,
      baseTotal,
      chauffeurTotal,
      servicesTotal,
      securityDeposit,
      luxuryTaxAndInsurance,
      grandTotal,
    };
  }, [selectedCar, durationDays, chauffeurOption, selectedServiceIds, services]);

  const toggleService = (serviceId: string) => {
    setSelectedServiceIds((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!customerName.trim() || !customerEmail.trim() || !customerPhone.trim()) {
      setErrorMsg('Please enter all required customer contact details.');
      return;
    }

    if (!driverLicenseNumber.trim() && !chauffeurOption) {
      setErrorMsg('Driver License Number is mandatory for self-drive reservations.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const newBooking: Booking = {
        id: `bk-${Date.now()}`,
        bookingReference: `EXO-${Math.floor(100000 + Math.random() * 900000)}`,
        carId: selectedCar.id,
        carName: `${selectedCar.brandName} ${selectedCar.model}`,
        carImage: selectedCar.heroImage,
        brandName: selectedCar.brandName,
        userId: currentUser.id,
        customerName,
        customerEmail,
        customerPhone,
        driverLicenseNumber: driverLicenseNumber || 'CHAUFFEUR-ASSIGNED',
        pickupLocation,
        dropoffLocation,
        pickupDate,
        returnDate,
        pickupTime,
        durationDays,
        chauffeurOption,
        selectedServices: selectedServiceIds,
        baseDailyRate: calculations.baseDailyRate,
        baseRentalTotal: calculations.baseTotal,
        chauffeurTotal: calculations.chauffeurTotal,
        servicesTotal: calculations.servicesTotal,
        securityDeposit: calculations.securityDeposit,
        luxuryTaxAndInsurance: calculations.luxuryTaxAndInsurance,
        grandTotal: calculations.grandTotal,
        status: 'Confirmed',
        paymentStatus: 'Paid',
        specialRequests,
        createdAt: new Date().toISOString().split('T')[0],
      };

      setIsSubmitting(false);
      onBookingSuccess(newBooking);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-4xl bg-[#0D0F14] border border-white/10 rounded-2xl shadow-2xl overflow-hidden my-6 max-h-[94vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#08090C]">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-semibold">
              EXOTICA Concierge Reservation
            </span>
            <h2 className="text-lg font-luxury font-bold text-white mt-0.5">
              Secure Your Luxury Experience
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white hover:bg-white/10 rounded-md transition-colors cursor-pointer"
            aria-label="Close booking modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleBookingSubmit} className="overflow-y-auto flex-1 p-6 space-y-8">
          
          {errorMsg && (
            <div className="p-3 bg-red-950/60 border border-red-500/40 rounded-lg text-xs text-red-200 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Section 1: Selected Vehicle Selector */}
          <div className="space-y-3">
            <label className="text-xs uppercase tracking-wider text-neutral-400 font-semibold block">
              1. Selected Vehicle
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center bg-[#12141A] p-4 rounded-xl border border-white/5">
              <div className="aspect-[16/10] rounded-lg overflow-hidden bg-black/60">
                <img
                  src={selectedCar.heroImage}
                  alt={selectedCar.model}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="md:col-span-2 space-y-2">
                <select
                  value={selectedCarId}
                  onChange={(e) => setSelectedCarId(e.target.value)}
                  className="w-full bg-[#181B24] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#D4AF37] cursor-pointer"
                >
                  {availableCars.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.brandName} {c.model} (${c.dailyPrice}/day) · {c.category}
                    </option>
                  ))}
                </select>

                <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-400">
                  <span>{selectedCar.specs.horsepower} HP</span>
                  <span>·</span>
                  <span>{selectedCar.specs.acceleration0100} 0-100</span>
                  <span>·</span>
                  <span>{selectedCar.seats} Seats</span>
                  <span>·</span>
                  <span className="text-[#D4AF37] font-semibold">${selectedCar.dailyPrice}/day</span>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Locations & Dates */}
          <div className="space-y-4">
            <label className="text-xs uppercase tracking-wider text-neutral-400 font-semibold block">
              2. Itinerary & Schedule
            </label>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Pickup Location */}
              <div className="space-y-1.5">
                <span className="text-xs text-neutral-400 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                  Pick-up Location
                </span>
                <select
                  value={pickupLocation}
                  onChange={(e) => setPickupLocation(e.target.value)}
                  className="w-full bg-[#12141A] border border-white/10 rounded-lg px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#D4AF37] cursor-pointer"
                >
                  {locations.map((loc) => (
                    <option key={loc.id} value={`${loc.city} - ${loc.hubName}`}>
                      {loc.city} ({loc.country}) — {loc.hubName}
                    </option>
                  ))}
                </select>
              </div>

              {/* Drop-off Location */}
              <div className="space-y-1.5">
                <span className="text-xs text-neutral-400 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                  Drop-off Location
                </span>
                <select
                  value={dropoffLocation}
                  onChange={(e) => setDropoffLocation(e.target.value)}
                  className="w-full bg-[#12141A] border border-white/10 rounded-lg px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#D4AF37] cursor-pointer"
                >
                  {locations.map((loc) => (
                    <option key={loc.id} value={`${loc.city} - ${loc.hubName}`}>
                      {loc.city} ({loc.country}) — {loc.hubName}
                    </option>
                  ))}
                </select>
              </div>

              {/* Pickup Date */}
              <div className="space-y-1.5">
                <span className="text-xs text-neutral-400 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
                  Pick-up Date
                </span>
                <input
                  type="date"
                  value={pickupDate}
                  onChange={(e) => setPickupDate(e.target.value)}
                  className="w-full bg-[#12141A] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              {/* Return Date */}
              <div className="space-y-1.5">
                <span className="text-xs text-neutral-400 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
                  Return Date ({durationDays} {durationDays === 1 ? 'day' : 'days'})
                </span>
                <input
                  type="date"
                  value={returnDate}
                  min={pickupDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                  className="w-full bg-[#12141A] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              {/* Pick-up Time */}
              <div className="space-y-1.5">
                <span className="text-xs text-neutral-400 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                  Pick-up Time
                </span>
                <select
                  value={pickupTime}
                  onChange={(e) => setPickupTime(e.target.value)}
                  className="w-full bg-[#12141A] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37] cursor-pointer"
                >
                  <option>08:00 AM</option>
                  <option>10:00 AM</option>
                  <option>12:00 PM</option>
                  <option>02:00 PM</option>
                  <option>04:00 PM</option>
                  <option>06:00 PM</option>
                  <option>08:00 PM</option>
                  <option>10:00 PM</option>
                </select>
              </div>

              {/* Chauffeur Option Toggle */}
              <div className="space-y-1.5 flex flex-col justify-end">
                <label className="flex items-center gap-3 p-2.5 rounded-lg bg-[#12141A] border border-white/10 cursor-pointer hover:border-[#D4AF37]/40 transition-colors">
                  <input
                    type="checkbox"
                    checked={chauffeurOption}
                    onChange={(e) => setChauffeurOption(e.target.checked)}
                    className="w-4 h-4 accent-[#D4AF37] rounded"
                  />
                  <div>
                    <p className="text-xs font-semibold text-white">Include Professional Chauffeur</p>
                    <p className="text-[10px] text-neutral-400">+$180 / day · Vetted Master Driver</p>
                  </div>
                </label>
              </div>

            </div>
          </div>

          {/* Section 3: Additional Concierge Services */}
          <div className="space-y-3">
            <label className="text-xs uppercase tracking-wider text-neutral-400 font-semibold block">
              3. Bespoke Concierge Services (Optional)
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {services.map((srv) => {
                const isSelected = selectedServiceIds.includes(srv.id);
                return (
                  <div
                    key={srv.id}
                    onClick={() => toggleService(srv.id)}
                    className={`p-3 rounded-lg border text-left cursor-pointer transition-all ${
                      isSelected
                        ? 'border-[#D4AF37] bg-[#D4AF37]/10'
                        : 'border-white/5 bg-[#12141A] hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-xs font-semibold text-white">{srv.title}</p>
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => {}} // handled by parent div
                        className="w-3.5 h-3.5 accent-[#D4AF37]"
                      />
                    </div>
                    <p className="text-[11px] text-neutral-400 line-clamp-1">{srv.subtitle}</p>
                    <p className="text-xs font-semibold text-[#D4AF37] mt-1 tabular-nums">
                      +${srv.pricePerDay}/day
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section 4: Customer Details */}
          <div className="space-y-3">
            <label className="text-xs uppercase tracking-wider text-neutral-400 font-semibold block">
              4. Guest & Driver Verification
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <span className="text-xs text-neutral-400 block mb-1">Full Legal Name *</span>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="e.g. Lord Alexander Wright"
                  className="w-full bg-[#12141A] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <span className="text-xs text-neutral-400 block mb-1">Email for Confirmation Voucher *</span>
                <input
                  type="email"
                  required
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  placeholder="name@luxurymail.com"
                  className="w-full bg-[#12141A] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <span className="text-xs text-neutral-400 block mb-1">Phone Number (with country code) *</span>
                <input
                  type="tel"
                  required
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="+91 98201 54321"
                  className="w-full bg-[#12141A] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <span className="text-xs text-neutral-400 block mb-1">
                  Driver License ID {chauffeurOption ? '(Optional with Chauffeur)' : '*'}
                </span>
                <input
                  type="text"
                  required={!chauffeurOption}
                  value={driverLicenseNumber}
                  onChange={(e) => setDriverLicenseNumber(e.target.value)}
                  placeholder="DL / International Driving Permit"
                  className="w-full bg-[#12141A] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
            </div>

            <div>
              <span className="text-xs text-neutral-400 block mb-1">Special Concierge Requests / Flight Number</span>
              <textarea
                rows={2}
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
                placeholder="Specific vehicle styling, champagne preference, airport flight arrival number, hotel room drop-off details..."
                className="w-full bg-[#12141A] border border-white/10 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
          </div>

          {/* Section 5: Dynamic Price Summary Box */}
          <div className="bg-[#12141A] p-5 rounded-xl border border-[#D4AF37]/30 space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold flex items-center justify-between">
              <span>Transparent Price Summary</span>
              <span>{durationDays} Day Duration</span>
            </h4>

            <div className="space-y-1.5 text-xs text-neutral-300">
              <div className="flex justify-between">
                <span>Base Fleet Rate (${calculations.baseDailyRate} × {durationDays} days)</span>
                <span className="text-white tabular-nums font-medium">${calculations.baseTotal.toLocaleString()}</span>
              </div>

              {chauffeurOption && (
                <div className="flex justify-between text-neutral-300">
                  <span>Professional Chauffeur ($180 × {durationDays} days)</span>
                  <span className="text-white tabular-nums font-medium">+${calculations.chauffeurTotal.toLocaleString()}</span>
                </div>
              )}

              {calculations.servicesTotal > 0 && (
                <div className="flex justify-between text-neutral-300">
                  <span>Selected VIP Services</span>
                  <span className="text-white tabular-nums font-medium">+${calculations.servicesTotal.toLocaleString()}</span>
                </div>
              )}

              <div className="flex justify-between text-neutral-300">
                <span>Refundable Security Deposit (Held on Card)</span>
                <span className="text-white tabular-nums font-medium">${calculations.securityDeposit.toLocaleString()}</span>
              </div>

              <div className="flex justify-between text-neutral-400">
                <span>Comprehensive Luxury Insurance & Fleet Tax (10%)</span>
                <span className="text-white tabular-nums font-medium">${calculations.luxuryTaxAndInsurance.toLocaleString()}</span>
              </div>

              <div className="pt-2 border-t border-white/10 flex justify-between items-baseline">
                <div>
                  <span className="text-sm font-bold text-white uppercase tracking-wider">Estimated Total</span>
                  <p className="text-[10px] text-neutral-400">Includes deposit & full coverage</p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold font-luxury text-[#D4AF37] tabular-nums">
                    ${calculations.grandTotal.toLocaleString()}
                  </span>
                  <span className="text-xs text-neutral-400 block">USD Net</span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Method simulation */}
          <div className="space-y-2">
            <span className="text-xs text-neutral-400 block font-semibold">Payment Guarantee</span>
            <div className="flex gap-3">
              {(['Card', 'Apple Pay', 'Cryptocurrency'] as const).map((m) => (
                <label
                  key={m}
                  className={`flex-1 flex items-center justify-center gap-2 p-2.5 rounded-lg border text-xs font-medium cursor-pointer transition-colors ${
                    paymentMethod === m
                      ? 'border-[#D4AF37] bg-[#D4AF37]/10 text-white'
                      : 'border-white/10 text-neutral-400 hover:text-white bg-[#12141A]'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymethod"
                    value={m}
                    checked={paymentMethod === m}
                    onChange={() => setPaymentMethod(m)}
                    className="hidden"
                  />
                  <CreditCard className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>{m}</span>
                </label>
              ))}
            </div>
          </div>

        </form>

        {/* Modal Submit Footer */}
        <div className="px-6 py-4 bg-[#08090C] border-t border-white/10 flex items-center justify-between">
          <div>
            <p className="text-[10px] text-neutral-400">Instant VIP Confirmation</p>
            <p className="text-xs text-neutral-200">No Cancellation Penalty up to 24h prior</p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-neutral-400 hover:text-white transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleBookingSubmit}
              disabled={isSubmitting}
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-black bg-[#D4AF37] hover:bg-[#E5C07B] rounded-md shadow-lg shadow-[#D4AF37]/20 transition-all cursor-pointer whitespace-nowrap disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Securing Vehicle...</span>
              ) : (
                <>
                  <span>Confirm & Authorize Drive</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
