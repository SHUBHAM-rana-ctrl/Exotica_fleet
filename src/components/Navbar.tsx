import React, { useState } from 'react';
import { User } from '../types';
import { Car, Shield, User as UserIcon, Calendar, Bell, HardDrive } from 'lucide-react';

interface NavbarProps {
  currentUser: User;
  onNavigate: (sectionId: string) => void;
  onOpenBooking: () => void;
  onOpenUserPortal: () => void;
  onOpenAdminPortal: () => void;
  onOpenGoogleDrive: () => void;
  onOpenAuthModal: () => void;
  unreadNotificationsCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentUser,
  onNavigate,
  onOpenBooking,
  onOpenUserPortal,
  onOpenAdminPortal,
  onOpenGoogleDrive,
  onOpenAuthModal,
  unreadNotificationsCount,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-[#08090C]/90 backdrop-blur-xl border-b border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => {
            onNavigate('hero');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="text-left group flex items-baseline gap-2 cursor-pointer focus:outline-none"
        >
          <span className="font-luxury text-2xl sm:text-3xl font-bold tracking-wider text-white group-hover:text-[#D4AF37] transition-colors">
            EXOTICA
          </span>
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#D4AF37] font-semibold">
            Fleet
          </span>
        </button>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-neutral-300">
          <button
            onClick={() => onNavigate('fleet')}
            className="hover:text-white transition-colors cursor-pointer py-1 relative hover:after:w-full after:w-0 after:h-[1.5px] after:bg-[#D4AF37] after:absolute after:bottom-0 after:left-0 after:transition-all"
          >
            Fleet
          </button>
          <button
            onClick={() => onNavigate('experience')}
            className="hover:text-white transition-colors cursor-pointer py-1 relative hover:after:w-full after:w-0 after:h-[1.5px] after:bg-[#D4AF37] after:absolute after:bottom-0 after:left-0 after:transition-all"
          >
            Experience
          </button>
          <button
            onClick={() => onNavigate('services')}
            className="hover:text-white transition-colors cursor-pointer py-1 relative hover:after:w-full after:w-0 after:h-[1.5px] after:bg-[#D4AF37] after:absolute after:bottom-0 after:left-0 after:transition-all"
          >
            Services
          </button>
          <button
            onClick={() => onNavigate('locations')}
            className="hover:text-white transition-colors cursor-pointer py-1 relative hover:after:w-full after:w-0 after:h-[1.5px] after:bg-[#D4AF37] after:absolute after:bottom-0 after:left-0 after:transition-all"
          >
            Locations
          </button>
          <button
            onClick={() => onNavigate('reviews')}
            className="hover:text-white transition-colors cursor-pointer py-1 relative hover:after:w-full after:w-0 after:h-[1.5px] after:bg-[#D4AF37] after:absolute after:bottom-0 after:left-0 after:transition-all"
          >
            Reviews
          </button>
          <button
            onClick={() => onNavigate('about')}
            className="hover:text-white transition-colors cursor-pointer py-1 relative hover:after:w-full after:w-0 after:h-[1.5px] after:bg-[#D4AF37] after:absolute after:bottom-0 after:left-0 after:transition-all"
          >
            About
          </button>
          <button
            onClick={() => onNavigate('contact')}
            className="hover:text-white transition-colors cursor-pointer py-1 relative hover:after:w-full after:w-0 after:h-[1.5px] after:bg-[#D4AF37] after:absolute after:bottom-0 after:left-0 after:transition-all"
          >
            Contact
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions + account toggle */}
        <div className="flex items-center gap-3">
          
          {/* Google Drive Fleet Storage */}
          <button
            onClick={onOpenGoogleDrive}
            title="Google Drive Rental Storage & Vouchers"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-neutral-300 hover:text-white border border-white/10 hover:border-[#D4AF37]/50 rounded-md transition-colors bg-white/5 cursor-pointer whitespace-nowrap"
          >
            <HardDrive className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Drive</span>
          </button>

          {/* Admin Dashboard shortcut */}
          <button
            onClick={onOpenAdminPortal}
            title="Open Executive Admin Fleet Panel"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold uppercase tracking-wider text-[#D4AF37] hover:text-white border border-[#D4AF37]/30 hover:border-[#D4AF37] rounded-md transition-colors bg-[#D4AF37]/5 cursor-pointer whitespace-nowrap"
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Admin</span>
          </button>

          {/* User Account / Portal */}
          <button
            onClick={onOpenUserPortal}
            className="relative flex items-center gap-2 px-3 py-2 text-xs font-medium text-neutral-200 hover:text-white bg-neutral-900/80 hover:bg-neutral-800 border border-white/10 rounded-md transition-colors cursor-pointer whitespace-nowrap"
          >
            <UserIcon className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="hidden lg:inline">{currentUser.name.split(' ')[0]}</span>
            {unreadNotificationsCount > 0 && (
              <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />
            )}
          </button>

          {/* Primary CTA */}
          <button
            onClick={onOpenBooking}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-black bg-[#D4AF37] hover:bg-[#E5C07B] rounded-md shadow-lg shadow-[#D4AF37]/20 transition-all cursor-pointer whitespace-nowrap font-medium"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Book Drive</span>
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-neutral-400 hover:text-white focus:outline-none cursor-pointer"
            aria-label="Toggle Navigation"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0C0E14] border-b border-white/10 px-6 py-6 space-y-4 animate-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col space-y-3 text-base text-neutral-200">
            <button
              onClick={() => { onNavigate('fleet'); setMobileMenuOpen(false); }}
              className="text-left py-2 hover:text-[#D4AF37] transition-colors"
            >
              Luxury Fleet
            </button>
            <button
              onClick={() => { onNavigate('experience'); setMobileMenuOpen(false); }}
              className="text-left py-2 hover:text-[#D4AF37] transition-colors"
            >
              The Experience
            </button>
            <button
              onClick={() => { onNavigate('services'); setMobileMenuOpen(false); }}
              className="text-left py-2 hover:text-[#D4AF37] transition-colors"
            >
              Concierge Services
            </button>
            <button
              onClick={() => { onNavigate('locations'); setMobileMenuOpen(false); }}
              className="text-left py-2 hover:text-[#D4AF37] transition-colors"
            >
              Private Hubs & Locations
            </button>
            <button
              onClick={() => { onNavigate('reviews'); setMobileMenuOpen(false); }}
              className="text-left py-2 hover:text-[#D4AF37] transition-colors"
            >
              Verified Reviews
            </button>
            <button
              onClick={() => { onNavigate('about'); setMobileMenuOpen(false); }}
              className="text-left py-2 hover:text-[#D4AF37] transition-colors"
            >
              About EXOTICA
            </button>
            <button
              onClick={() => { onNavigate('contact'); setMobileMenuOpen(false); }}
              className="text-left py-2 hover:text-[#D4AF37] transition-colors"
            >
              Contact Concierge
            </button>
          </div>

          <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
            <button
              onClick={() => { onOpenGoogleDrive(); setMobileMenuOpen(false); }}
              className="w-full flex items-center justify-center gap-2 py-2.5 text-xs uppercase tracking-wider font-semibold text-neutral-200 border border-white/15 bg-white/5 rounded-md"
            >
              <HardDrive className="w-4 h-4 text-[#D4AF37]" />
              <span>Google Drive Storage</span>
            </button>
            <button
              onClick={() => { onOpenAdminPortal(); setMobileMenuOpen(false); }}
              className="w-full flex items-center justify-center gap-2 py-2.5 text-xs uppercase tracking-wider font-semibold text-[#D4AF37] border border-[#D4AF37]/30 rounded-md"
            >
              <Shield className="w-4 h-4" />
              <span>Admin Management</span>
            </button>
            <button
              onClick={() => { onOpenUserPortal(); setMobileMenuOpen(false); }}
              className="w-full flex items-center justify-center gap-2 py-2.5 text-xs uppercase tracking-wider font-semibold text-white bg-neutral-800 rounded-md"
            >
              <UserIcon className="w-4 h-4 text-[#D4AF37]" />
              <span>Member Account ({currentUser.name})</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
