import React, { useState } from 'react';
import { Booking, Car, NotificationItem, Payment, Review, User } from '../types';
import { X, User as UserIcon, Calendar, Heart, CreditCard, Bell, Star, ShieldCheck, CheckCircle2, ChevronRight, LogOut, HardDrive } from 'lucide-react';

interface UserPortalModalProps {
  isOpen: boolean;
  user: User;
  bookings: Booking[];
  payments: Payment[];
  favoriteCars: Car[];
  notifications: NotificationItem[];
  reviews: Review[];
  onClose: () => void;
  onSelectCar: (car: Car) => void;
  onBookCar: (car: Car) => void;
  onViewBookingReceipt: (booking: Booking) => void;
  onSwitchToAdmin: () => void;
  onMarkNotificationsRead: () => void;
  onOpenGoogleDrive?: () => void;
  onOpenAuthModal?: () => void;
}

export const UserPortalModal: React.FC<UserPortalModalProps> = ({
  isOpen,
  user,
  bookings,
  payments,
  favoriteCars,
  notifications,
  reviews,
  onClose,
  onSelectCar,
  onBookCar,
  onViewBookingReceipt,
  onSwitchToAdmin,
  onMarkNotificationsRead,
  onOpenGoogleDrive,
  onOpenAuthModal,
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'profile' | 'bookings' | 'favorites' | 'payments' | 'notifications' | 'reviews'>('bookings');

  const activeBookings = bookings.filter((b) => b.status === 'Confirmed' || b.status === 'Active');
  const pastBookings = bookings.filter((b) => b.status === 'Completed' || b.status === 'Cancelled');

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-5xl bg-[#0D0F14] border border-white/10 rounded-2xl shadow-2xl overflow-hidden my-6 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#08090C]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 flex items-center justify-center text-sm font-bold text-[#D4AF37]">
              {user.name.split(' ').map((n) => n[0]).join('')}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-white font-luxury">{user.name}</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-[#D4AF37]/20 text-[#D4AF37] font-semibold uppercase tracking-wider">
                  {user.membershipTier}
                </span>
              </div>
              <p className="text-[11px] text-neutral-400">{user.email} · Member since 2024</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onSwitchToAdmin}
              className="text-xs text-[#D4AF37] hover:underline px-2 py-1 cursor-pointer"
            >
              Switch to Admin Panel →
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
            onClick={() => setActiveTab('bookings')}
            className={`py-3 px-3.5 font-medium border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'bookings'
                ? 'border-[#D4AF37] text-[#D4AF37]'
                : 'border-transparent text-neutral-400 hover:text-white'
            }`}
          >
            My Bookings ({bookings.length})
          </button>

          <button
            onClick={() => setActiveTab('favorites')}
            className={`py-3 px-3.5 font-medium border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'favorites'
                ? 'border-[#D4AF37] text-[#D4AF37]'
                : 'border-transparent text-neutral-400 hover:text-white'
            }`}
          >
            Saved Fleet ({favoriteCars.length})
          </button>

          <button
            onClick={() => setActiveTab('payments')}
            className={`py-3 px-3.5 font-medium border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'payments'
                ? 'border-[#D4AF37] text-[#D4AF37]'
                : 'border-transparent text-neutral-400 hover:text-white'
            }`}
          >
            Payments & Invoices ({payments.length})
          </button>

          <button
            onClick={() => {
              setActiveTab('notifications');
              onMarkNotificationsRead();
            }}
            className={`py-3 px-3.5 font-medium border-b-2 transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'notifications'
                ? 'border-[#D4AF37] text-[#D4AF37]'
                : 'border-transparent text-neutral-400 hover:text-white'
            }`}
          >
            <span>Concierge Notifications</span>
            {notifications.some((n) => !n.read) && (
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`py-3 px-3.5 font-medium border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'profile'
                ? 'border-[#D4AF37] text-[#D4AF37]'
                : 'border-transparent text-neutral-400 hover:text-white'
            }`}
          >
            Profile & Security
          </button>

          {onOpenGoogleDrive && (
            <button
              onClick={() => {
                onClose();
                onOpenGoogleDrive();
              }}
              className="py-3 px-3.5 font-medium border-b-2 border-transparent text-[#D4AF37] hover:text-white transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5 ml-auto"
            >
              <HardDrive className="w-3.5 h-3.5" />
              <span>Google Drive Fleet Storage →</span>
            </button>
          )}
        </div>

        {/* Tab Content Body */}
        <div className="overflow-y-auto flex-1 p-6 space-y-6">
          
          {/* TAB 1: BOOKINGS */}
          {activeTab === 'bookings' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold mb-3">
                  Active & Confirmed Reservations ({activeBookings.length})
                </h3>

                {activeBookings.length > 0 ? (
                  <div className="space-y-4">
                    {activeBookings.map((b) => (
                      <div
                        key={b.id}
                        className="bg-[#12141A] rounded-xl border border-white/10 p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                      >
                        <div className="flex items-center gap-4">
                          <img
                            src={b.carImage}
                            alt={b.carName}
                            className="w-24 h-16 object-cover rounded-lg bg-black"
                          />
                          <div className="space-y-1">
                            <span className="text-[10px] uppercase tracking-wider text-[#D4AF37] font-semibold">
                              Ref #{b.bookingReference}
                            </span>
                            <h4 className="text-sm font-bold text-white font-luxury">{b.carName}</h4>
                            <p className="text-xs text-neutral-400">
                              {b.pickupDate} → {b.returnDate} ({b.durationDays} Days)
                            </p>
                            <p className="text-[11px] text-neutral-500 truncate max-w-md">
                              Pick-up: {b.pickupLocation}
                            </p>
                          </div>
                        </div>

                        <div className="flex md:flex-col items-center md:items-end justify-between w-full md:w-auto pt-3 md:pt-0 border-t md:border-t-0 border-white/5 gap-2">
                          <span className="text-sm font-bold font-luxury text-white tabular-nums">
                            ${b.grandTotal.toLocaleString()}
                          </span>
                          <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-medium">
                            {b.status}
                          </span>
                          <button
                            onClick={() => onViewBookingReceipt(b)}
                            className="text-xs text-[#D4AF37] hover:underline"
                          >
                            View Receipt Voucher
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center bg-[#12141A] rounded-xl border border-white/5 text-neutral-400 text-xs">
                    No active bookings. Ready for your next journey?
                  </div>
                )}
              </div>

              {/* Past Bookings */}
              {pastBookings.length > 0 && (
                <div className="pt-4 border-t border-white/5">
                  <h3 className="text-xs uppercase tracking-widest text-neutral-400 font-semibold mb-3">
                    Past Completed Charters ({pastBookings.length})
                  </h3>
                  <div className="space-y-3">
                    {pastBookings.map((b) => (
                      <div
                        key={b.id}
                        className="bg-[#12141A]/50 rounded-lg p-3 border border-white/5 flex items-center justify-between text-xs"
                      >
                        <div>
                          <p className="text-white font-medium">{b.carName}</p>
                          <p className="text-neutral-500 text-[11px]">{b.pickupDate} · Ref #{b.bookingReference}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-neutral-400 tabular-nums">${b.grandTotal.toLocaleString()}</span>
                          <button
                            onClick={() => onViewBookingReceipt(b)}
                            className="text-xs text-[#D4AF37] hover:underline"
                          >
                            Receipt
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: FAVORITES */}
          {activeTab === 'favorites' && (
            <div className="space-y-4">
              <h3 className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
                Your Curated Garage Wishlist ({favoriteCars.length})
              </h3>
              {favoriteCars.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {favoriteCars.map((c) => (
                    <div
                      key={c.id}
                      className="bg-[#12141A] rounded-xl border border-white/10 p-4 space-y-3"
                    >
                      <div className="aspect-[16/10] rounded-lg overflow-hidden bg-black">
                        <img src={c.heroImage} alt={c.model} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <span className="text-[10px] uppercase text-[#D4AF37] font-semibold">{c.brandName}</span>
                        <h4 className="text-sm font-bold text-white font-luxury">{c.model}</h4>
                        <p className="text-xs text-neutral-400 mt-1">${c.dailyPrice}/day · {c.specs.horsepower} HP</p>
                      </div>
                      <div className="pt-2 flex gap-2">
                        <button
                          onClick={() => {
                            onClose();
                            onSelectCar(c);
                          }}
                          className="flex-1 py-1.5 text-xs text-neutral-300 hover:text-white bg-white/5 hover:bg-white/10 rounded border border-white/10"
                        >
                          View 360°
                        </button>
                        <button
                          onClick={() => {
                            onClose();
                            onBookCar(c);
                          }}
                          className="flex-1 py-1.5 text-xs font-semibold text-black bg-[#D4AF37] hover:bg-[#E5C07B] rounded"
                        >
                          Book Now
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center bg-[#12141A] rounded-xl border border-white/5 text-neutral-400 text-xs">
                  Your garage wishlist is empty. Click the heart icon on any vehicle to save it here.
                </div>
              )}
            </div>
          )}

          {/* TAB 3: PAYMENTS */}
          {activeTab === 'payments' && (
            <div className="space-y-4">
              <h3 className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
                Financial Transaction Statements ({payments.length})
              </h3>
              <div className="bg-[#12141A] rounded-xl border border-white/5 overflow-hidden">
                <table className="w-full text-xs text-left">
                  <thead className="bg-[#0A0C11] text-neutral-400 border-b border-white/5">
                    <tr>
                      <th className="p-3">Transaction ID</th>
                      <th className="p-3">Reference</th>
                      <th className="p-3">Method</th>
                      <th className="p-3">Date</th>
                      <th className="p-3">Amount</th>
                      <th className="p-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-neutral-300">
                    {payments.map((p) => (
                      <tr key={p.id} className="hover:bg-white/5 transition-colors">
                        <td className="p-3 font-mono text-neutral-400">{p.transactionId}</td>
                        <td className="p-3 text-white font-medium">{p.bookingReference}</td>
                        <td className="p-3">{p.method} •••• {p.cardLast4 || '4242'}</td>
                        <td className="p-3 text-neutral-400">{p.date}</td>
                        <td className="p-3 font-bold text-white tabular-nums">${p.amount.toLocaleString()}</td>
                        <td className="p-3">
                          <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-medium">
                            {p.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: NOTIFICATIONS */}
          {activeTab === 'notifications' && (
            <div className="space-y-3">
              <h3 className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
                Concierge Bulletins & Notifications
              </h3>
              {notifications.map((n) => (
                <div
                  key={n.id}
                  className={`p-4 rounded-xl border transition-colors ${
                    n.read ? 'bg-[#12141A] border-white/5' : 'bg-[#161822] border-[#D4AF37]/30'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-xs font-bold text-white flex items-center gap-2">
                      {!n.read && <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />}
                      {n.title}
                    </h4>
                    <span className="text-[10px] text-neutral-500">{n.date}</span>
                  </div>
                  <p className="text-xs text-neutral-300 leading-relaxed">{n.message}</p>
                </div>
              ))}
            </div>
          )}

          {/* TAB 5: PROFILE */}
          {activeTab === 'profile' && (
            <div className="space-y-6 max-w-xl text-xs">
              <h3 className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
                Member Profile & Credentials
              </h3>
              <div className="bg-[#12141A] p-5 rounded-xl border border-white/5 space-y-4">
                <div className="flex items-center gap-4">
                  <img src={user.avatar} alt={user.name} className="w-14 h-14 rounded-full object-cover border border-white/10" />
                  <div>
                    <h4 className="text-sm font-bold text-white font-luxury">{user.name}</h4>
                    <p className="text-xs text-neutral-400">{user.membershipTier}</p>
                    <span className="text-[10px] text-neutral-500">Total Lifetime Spend: ${user.totalSpend.toLocaleString()}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/5 grid grid-cols-2 gap-3 text-neutral-300">
                  <div>
                    <span className="text-neutral-500 block text-[10px] uppercase">Email</span>
                    <span className="text-white">{user.email}</span>
                  </div>
                  <div>
                    <span className="text-neutral-500 block text-[10px] uppercase">Phone</span>
                    <span className="text-white">{user.phone}</span>
                  </div>
                  <div>
                    <span className="text-neutral-500 block text-[10px] uppercase">Driver License ID</span>
                    <span className="text-white font-mono">{user.licenseNumber}</span>
                  </div>
                  <div>
                    <span className="text-neutral-500 block text-[10px] uppercase">Deposit Status</span>
                    <span className="text-emerald-400 font-medium">Pre-Approved VIP Waiver</span>
                  </div>
                </div>

                {onOpenAuthModal && (
                  <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                    <div>
                      <p className="text-white font-semibold">Firebase Authentication</p>
                      <p className="text-[11px] text-neutral-400">Manage Google Sign-In & Security credentials</p>
                    </div>
                    <button
                      onClick={() => {
                        onClose();
                        onOpenAuthModal();
                      }}
                      className="px-3.5 py-1.5 text-xs font-semibold text-black bg-[#D4AF37] hover:bg-[#E5C07B] rounded transition-colors cursor-pointer"
                    >
                      Manage Sign-In
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-[#08090C] border-t border-white/10 flex items-center justify-between">
          <span className="text-xs text-neutral-400">
            EXOTICA Black Card Concierge Desk available 24/7
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold text-neutral-300 hover:text-white bg-white/5 hover:bg-white/10 rounded-md border border-white/10 cursor-pointer"
          >
            Close Portal
          </button>
        </div>

      </div>
    </div>
  );
};
