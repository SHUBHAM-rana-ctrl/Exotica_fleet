import React, { useState } from 'react';
import { Booking } from '../types';
import { CheckCircle2, Printer, Download, Calendar, MapPin, User, Car, ShieldCheck, X, HardDrive, ExternalLink, Loader2 } from 'lucide-react';
import { GoogleDriveService } from '../services/googleDrive';
import { getDriveAccessToken, signInWithGoogleDrive } from '../services/googleDriveAuth';

interface BookingConfirmationModalProps {
  booking: Booking | null;
  onClose: () => void;
  onGoToDashboard: () => void;
  onOpenGoogleDrive?: () => void;
}

export const BookingConfirmationModal: React.FC<BookingConfirmationModalProps> = ({
  booking,
  onClose,
  onGoToDashboard,
  onOpenGoogleDrive,
}) => {
  if (!booking) return null;

  const [savingToDrive, setSavingToDrive] = useState(false);
  const [driveResult, setDriveResult] = useState<{ url?: string; name: string } | null>(null);
  const [driveError, setDriveError] = useState<string | null>(null);

  const handleSaveToDrive = async () => {
    setSavingToDrive(true);
    setDriveError(null);
    try {
      let token = await getDriveAccessToken();
      if (!token) {
        const authRes = await signInWithGoogleDrive();
        if (!authRes) throw new Error('Google Sign-in was cancelled');
        token = authRes.accessToken;
      }

      const file = await GoogleDriveService.saveBookingToDrive(booking);
      setDriveResult({ url: file.webViewLink, name: file.name });
    } catch (err: any) {
      console.error('Failed to save to Google Drive:', err);
      setDriveError(err.message || 'Could not save to Google Drive');
    } finally {
      setSavingToDrive(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl bg-[#0E1017] border border-white/10 rounded-2xl shadow-2xl overflow-hidden my-6 max-h-[94vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Top Action Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#08090C]">
          <div className="flex items-center gap-2">
            <span className="font-luxury text-base font-bold text-white tracking-wider">
              EXOTICA
            </span>
            <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-semibold">
              · Official Reservation Receipt
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white hover:bg-white/10 rounded-md transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Printable Email Voucher Content */}
        <div className="overflow-y-auto flex-1 p-6 sm:p-8 space-y-6 bg-[#0E1017] text-white">
          
          {/* Header Banner */}
          <div className="text-center pb-6 border-b border-white/10 space-y-2">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/30 mb-2">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-luxury font-bold text-white">
              Reservation Confirmed
            </h2>
            <p className="text-xs text-neutral-400">
              An official itinerary has been transmitted to <span className="text-white font-medium">{booking.customerEmail}</span>
            </p>
            <div className="inline-block mt-2 px-4 py-1.5 bg-[#161822] border border-[#D4AF37]/30 rounded-md">
              <span className="text-[10px] uppercase tracking-wider text-neutral-400">Booking Reference: </span>
              <span className="text-sm font-bold font-mono text-[#D4AF37] ml-1">{booking.bookingReference}</span>
            </div>
          </div>

          {/* Reserved Car Summary */}
          <div className="flex flex-col sm:flex-row items-center gap-4 bg-[#141720] p-4 rounded-xl border border-white/5">
            <img
              src={booking.carImage}
              alt={booking.carName}
              className="w-full sm:w-36 h-24 object-cover rounded-lg"
            />
            <div className="space-y-1 text-center sm:text-left">
              <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-semibold">
                {booking.brandName}
              </span>
              <h3 className="text-lg font-bold font-luxury text-white">
                {booking.carName}
              </h3>
              <p className="text-xs text-neutral-400">
                {booking.durationDays} Day Duration · {booking.chauffeurOption ? 'Chauffeur Included' : 'Self-Drive Experience'}
              </p>
            </div>
          </div>

          {/* Itinerary Schedule Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="bg-[#141720] p-3.5 rounded-lg border border-white/5 space-y-1">
              <span className="text-neutral-400 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
                Pick-up Schedule
              </span>
              <p className="text-white font-medium">{booking.pickupDate} at {booking.pickupTime}</p>
              <p className="text-neutral-400 text-[11px] truncate">{booking.pickupLocation}</p>
            </div>

            <div className="bg-[#141720] p-3.5 rounded-lg border border-white/5 space-y-1">
              <span className="text-neutral-400 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
                Return Schedule
              </span>
              <p className="text-white font-medium">{booking.returnDate}</p>
              <p className="text-neutral-400 text-[11px] truncate">{booking.dropoffLocation}</p>
            </div>
          </div>

          {/* Guest Information */}
          <div className="bg-[#141720] p-4 rounded-lg border border-white/5 space-y-2 text-xs">
            <span className="text-[10px] uppercase tracking-wider text-neutral-400 font-semibold block">
              Guest & Driver Verification
            </span>
            <div className="grid grid-cols-2 gap-2 text-neutral-300">
              <div>
                <span className="text-neutral-500 block">Lead Guest:</span>
                <span className="text-white font-medium">{booking.customerName}</span>
              </div>
              <div>
                <span className="text-neutral-500 block">Phone:</span>
                <span className="text-white font-medium">{booking.customerPhone}</span>
              </div>
              <div>
                <span className="text-neutral-500 block">Driver ID:</span>
                <span className="text-white font-mono">{booking.driverLicenseNumber}</span>
              </div>
              <div>
                <span className="text-neutral-500 block">Payment Status:</span>
                <span className="text-emerald-400 font-medium">Authorized / Paid</span>
              </div>
            </div>
          </div>

          {/* Itemized Financial Receipt */}
          <div className="bg-[#141720] p-4 rounded-lg border border-white/5 space-y-2 text-xs">
            <span className="text-[10px] uppercase tracking-wider text-neutral-400 font-semibold block">
              Itemized Statement
            </span>
            <div className="space-y-1.5 text-neutral-300">
              <div className="flex justify-between">
                <span>Fleet Rate (${booking.baseDailyRate} × {booking.durationDays} days)</span>
                <span className="text-white tabular-nums">${booking.baseRentalTotal.toLocaleString()}</span>
              </div>
              {booking.chauffeurTotal > 0 && (
                <div className="flex justify-between">
                  <span>Professional Chauffeur</span>
                  <span className="text-white tabular-nums">+${booking.chauffeurTotal.toLocaleString()}</span>
                </div>
              )}
              {booking.servicesTotal > 0 && (
                <div className="flex justify-between">
                  <span>Concierge Services</span>
                  <span className="text-white tabular-nums">+${booking.servicesTotal.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Refundable Security Deposit (Held on Card)</span>
                <span className="text-white tabular-nums">${booking.securityDeposit.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span>Luxury Mobility Tax & Comprehensive Insurance</span>
                <span className="text-white tabular-nums">${booking.luxuryTaxAndInsurance.toLocaleString()}</span>
              </div>
              <div className="pt-2 border-t border-white/10 flex justify-between items-baseline font-bold text-sm">
                <span className="text-white">Total Amount</span>
                <span className="text-base text-[#D4AF37] font-luxury tabular-nums">
                  ${booking.grandTotal.toLocaleString()} USD
                </span>
              </div>
            </div>
          </div>

          {/* Google Drive Status Notification */}
          {driveResult && (
            <div className="p-3 bg-emerald-950/60 border border-emerald-500/40 rounded-lg flex items-center justify-between text-xs text-emerald-200">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Saved voucher to Google Drive: <strong>{driveResult.name}</strong></span>
              </div>
              {driveResult.url && (
                <a
                  href={driveResult.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-2.5 py-1 text-xs text-[#D4AF37] hover:text-white bg-[#D4AF37]/20 border border-[#D4AF37]/40 rounded"
                >
                  <span>Open in Drive</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          )}

          {driveError && (
            <div className="p-3 bg-red-950/60 border border-red-500/40 rounded-lg text-xs text-red-200">
              {driveError}
            </div>
          )}

          {/* Concierge Help Note */}
          <div className="text-[11px] text-neutral-400 text-center leading-relaxed">
            Need adjustments or tarmac coordination? Contact your 24/7 private concierge at <span className="text-[#D4AF37] font-medium">+971 4 812 6000</span> or simply reply to your email receipt.
          </div>

        </div>

        {/* Modal Bottom Actions */}
        <div className="px-6 py-4 bg-[#08090C] border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-neutral-300 hover:text-white bg-white/5 hover:bg-white/10 rounded-md border border-white/10 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Receipt</span>
            </button>

            <button
              onClick={handleSaveToDrive}
              disabled={savingToDrive}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#D4AF37] hover:text-white bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20 rounded-md border border-[#D4AF37]/40 transition-colors cursor-pointer disabled:opacity-50"
            >
              {savingToDrive ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Saving to Drive...</span>
                </>
              ) : (
                <>
                  <HardDrive className="w-3.5 h-3.5" />
                  <span>Save to Google Drive</span>
                </>
              )}
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-neutral-400 hover:text-white cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onGoToDashboard();
              }}
              className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-black bg-[#D4AF37] hover:bg-[#E5C07B] rounded-md transition-colors cursor-pointer"
            >
              View In My Bookings
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
