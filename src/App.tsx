/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FleetFilter } from './components/FleetFilter';
import { CarCard } from './components/CarCard';
import { CarDetailsModal } from './components/CarDetailsModal';
import { BookingModal } from './components/BookingModal';
import { BookingConfirmationModal } from './components/BookingConfirmationModal';
import { ServicesSection } from './components/ServicesSection';
import { LocationsSection } from './components/LocationsSection';
import { ReviewsSection } from './components/ReviewsSection';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { UserPortalModal } from './components/UserPortalModal';
import { AdminDashboardModal } from './components/AdminDashboardModal';
import { SchemaModal } from './components/SchemaModal';
import { GoogleDriveModal } from './components/GoogleDriveModal';
import { AuthModal } from './components/AuthModal';
import { Footer } from './components/Footer';

import { ExoticaDatabase } from './services/storage';
import { 
  testFirestoreConnection, 
  saveBookingToFirestore, 
  subscribeToBookings, 
  auth 
} from './services/firebase';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { Booking, Brand, Car, FilterState, LocationItem, NotificationItem, Payment, Review, ServiceItem, User } from './types';
import { Sparkles, Calendar, ArrowRight, ShieldCheck, Car as CarIcon } from 'lucide-react';

export default function App() {
  // Database states with persistent storage
  const [cars, setCars] = useState<Car[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [locations, setLocations] = useState<LocationItem[]>([]);
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  // Modals & Interactive View States
  const [selectedCarForDetails, setSelectedCarForDetails] = useState<Car | null>(null);
  const [selectedCarForBooking, setSelectedCarForBooking] = useState<Car | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [confirmedBookingVoucher, setConfirmedBookingVoucher] = useState<Booking | null>(null);
  const [isUserPortalOpen, setIsUserPortalOpen] = useState(false);
  const [isAdminPortalOpen, setIsAdminPortalOpen] = useState(false);
  const [isSchemaModalOpen, setIsSchemaModalOpen] = useState(false);
  const [isGoogleDriveModalOpen, setIsGoogleDriveModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Fleet Filters State
  const initialFilters: FilterState = {
    search: '',
    brand: 'all',
    category: 'All',
    maxPrice: 3000,
    transmission: 'all',
    seats: 'all',
    availability: 'all',
    sortBy: 'featured',
  };
  const [filters, setFilters] = useState<FilterState>(initialFilters);

  // Initialize data on mount
  useEffect(() => {
    // 1. Validate connection to Firestore on boot
    testFirestoreConnection();

    // 2. Load cached database records
    const loadedCars = ExoticaDatabase.getCars();
    const loadedBrands = ExoticaDatabase.getBrands();
    const loadedLocations = ExoticaDatabase.getLocations();
    const loadedServices = ExoticaDatabase.getServices();
    const user = ExoticaDatabase.getCurrentUser();
    const loadedUsers = ExoticaDatabase.getUsers();
    const loadedBookings = ExoticaDatabase.getBookings();
    const loadedPayments = ExoticaDatabase.getPayments();
    const loadedReviews = ExoticaDatabase.getReviews();
    const loadedFavorites = ExoticaDatabase.getFavorites(user.id);
    const loadedNotifications = ExoticaDatabase.getNotifications(user.id);

    setCars(loadedCars);
    setBrands(loadedBrands);
    setLocations(loadedLocations);
    setServices(loadedServices);
    setCurrentUser(user);
    setAllUsers(loadedUsers);
    setBookings(loadedBookings);
    setPayments(loadedPayments);
    setReviews(loadedReviews);
    setFavorites(loadedFavorites);
    setNotifications(loadedNotifications);

    // 3. Listen to Firebase Auth state
    const unsubscribeAuth = onAuthStateChanged(auth, (fbUser) => {
      setFirebaseUser(fbUser);
      if (fbUser) {
        const syncedUser: User = {
          id: fbUser.uid,
          name: fbUser.displayName || user.name,
          email: fbUser.email || user.email,
          phone: fbUser.phoneNumber || user.phone,
          role: fbUser.email === 'admin@exotica.com' ? 'admin' : 'customer',
          licenseNumber: user.licenseNumber || 'MH-01-2024-EXO',
          avatar: fbUser.photoURL || user.avatar,
          joinedDate: user.joinedDate || '2024-03-15',
          membershipTier: user.membershipTier || 'Black Card VIP',
          totalSpend: user.totalSpend || 14200,
        };
        setCurrentUser(syncedUser);
      }
    });

    // 4. Real-time Firestore bookings sync
    const unsubscribeBookings = subscribeToBookings(user.id, (firestoreBookings) => {
      if (firestoreBookings && firestoreBookings.length > 0) {
        setBookings(firestoreBookings);
      }
    });

    return () => {
      unsubscribeAuth();
      unsubscribeBookings();
    };
  }, []);

  // Filter and sort cars
  const filteredAndSortedCars = useMemo(() => {
    return cars.filter((car) => {
      // Search
      if (filters.search.trim()) {
        const q = filters.search.toLowerCase();
        const matchesBrand = car.brandName.toLowerCase().includes(q);
        const matchesModel = car.model.toLowerCase().includes(q);
        const matchesCategory = car.category.toLowerCase().includes(q);
        if (!matchesBrand && !matchesModel && !matchesCategory) return false;
      }

      // Brand
      if (filters.brand !== 'all' && car.brandId !== filters.brand) {
        return false;
      }

      // Category
      if (filters.category !== 'All' && car.category !== filters.category) {
        return false;
      }

      // Transmission
      if (filters.transmission !== 'all' && car.transmission !== filters.transmission) {
        return false;
      }

      // Seats
      if (filters.seats !== 'all' && car.seats !== Number(filters.seats)) {
        return false;
      }

      // Availability
      if (filters.availability === 'available' && car.availability !== 'Available') {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'price-asc') return a.dailyPrice - b.dailyPrice;
      if (filters.sortBy === 'price-desc') return b.dailyPrice - a.dailyPrice;
      if (filters.sortBy === 'power-desc') return b.specs.horsepower - a.specs.horsepower;
      if (filters.sortBy === 'rating-desc') return b.rating - a.rating;
      // Default: featured first, then popular
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      if (a.popular && !b.popular) return -1;
      if (!a.popular && b.popular) return 1;
      return 0;
    });
  }, [cars, filters]);

  // Favorite cars list
  const favoriteCarsList = useMemo(() => {
    return cars.filter((c) => favorites.includes(c.id));
  }, [cars, favorites]);

  // Top marquee hero car (e.g., Lamborghini Huracán or first featured)
  const heroCar = useMemo(() => {
    return cars.find((c) => c.id === 'lamborghini-huracan') || cars[0];
  }, [cars]);

  // Handlers
  const handleToggleFavorite = (carId: string) => {
    if (!currentUser) return;
    const isNowFav = ExoticaDatabase.toggleFavorite(currentUser.id, carId);
    setFavorites(ExoticaDatabase.getFavorites(currentUser.id));
  };

  const handleOpenBooking = (car?: Car) => {
    setSelectedCarForBooking(car || heroCar || cars[0]);
    setIsBookingModalOpen(true);
  };

  const handleBookingSuccess = (newBooking: Booking) => {
    const saved = ExoticaDatabase.createBooking(newBooking);
    setBookings(ExoticaDatabase.getBookings());
    setPayments(ExoticaDatabase.getPayments());
    if (currentUser) {
      setNotifications(ExoticaDatabase.getNotifications(currentUser.id));
    }
    // Replicate to Cloud Firestore
    saveBookingToFirestore(saved).catch((err) => {
      console.warn('Replicated locally; Firestore sync notice:', err);
    });
    setIsBookingModalOpen(false);
    setConfirmedBookingVoucher(saved);
  };

  const handleSaveCar = (car: Car) => {
    ExoticaDatabase.saveCar(car);
    setCars(ExoticaDatabase.getCars());
  };

  const handleDeleteCar = (carId: string) => {
    ExoticaDatabase.deleteCar(carId);
    setCars(ExoticaDatabase.getCars());
  };

  const handleUpdateBookingStatus = (bookingId: string, status: Booking['status']) => {
    ExoticaDatabase.updateBookingStatus(bookingId, status);
    setBookings(ExoticaDatabase.getBookings());
  };

  const handleAddReview = (newReview: Review) => {
    ExoticaDatabase.addReview(newReview);
    setReviews(ExoticaDatabase.getReviews());
  };

  const handleMarkNotificationsRead = () => {
    if (!currentUser) return;
    ExoticaDatabase.markAllNotificationsRead(currentUser.id);
    setNotifications(ExoticaDatabase.getNotifications(currentUser.id));
  };

  const handleSwitchToAdmin = () => {
    setIsUserPortalOpen(false);
    setIsAdminPortalOpen(true);
  };

  const handleSelectServiceForBooking = (service: ServiceItem) => {
    setSelectedCarForBooking(heroCar || cars[0]);
    setIsBookingModalOpen(true);
  };

  const handleSelectCityForBooking = (city: string) => {
    setSelectedCarForBooking(heroCar || cars[0]);
    setIsBookingModalOpen(true);
  };

  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!currentUser || cars.length === 0) {
    return (
      <div className="min-h-screen bg-[#08090C] flex items-center justify-center text-white">
        <div className="text-center space-y-4">
          <div className="font-luxury text-3xl font-bold tracking-widest text-white animate-pulse">
            EXOTICA
          </div>
          <p className="text-xs uppercase tracking-[0.3em] text-[#D4AF37]">
            Calibrating Private Fleet Registry...
          </p>
        </div>
      </div>
    );
  }

  const unreadNotificationsCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="min-h-screen bg-[#08090C] text-[#F3F4F6] selection:bg-[#D4AF37]/30 selection:text-[#FFF8E7] flex flex-col font-sans">
      
      {/* Top Bar Navigation */}
      <Navbar
        currentUser={currentUser}
        onNavigate={handleNavigate}
        onOpenBooking={() => handleOpenBooking()}
        onOpenUserPortal={() => setIsUserPortalOpen(true)}
        onOpenAdminPortal={() => setIsAdminPortalOpen(true)}
        onOpenGoogleDrive={() => setIsGoogleDriveModalOpen(true)}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
        unreadNotificationsCount={unreadNotificationsCount}
      />

      {/* Hero Section */}
      <Hero
        heroCar={heroCar}
        onExploreFleet={() => handleNavigate('fleet')}
        onBookDrive={(c) => handleOpenBooking(c)}
        onViewDetails={(c) => setSelectedCarForDetails(c)}
      />

      {/* Main Luxury Fleet Section */}
      <main id="fleet" className="py-24 bg-[#0A0C11] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl space-y-3">
              <div className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-semibold">
                The Master Collection
              </div>
              <h2 className="font-luxury text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight text-balance">
                THE INTERNATIONAL LUXURY FLEET.
              </h2>
              <p className="text-sm sm:text-base text-neutral-400 leading-relaxed">
                Featuring the world’s most coveted marques: Audi, BMW, Mercedes-Benz, Porsche, Range Rover, Lamborghini, Ferrari, Bentley, Rolls-Royce, Maserati, Jaguar, and Lexus.
              </p>
            </div>

            {/* Quick Filter Reset or Switch */}
            <div className="flex items-center gap-3 self-start md:self-auto">
              <button
                onClick={() => setIsSchemaModalOpen(true)}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs text-neutral-400 hover:text-white border border-white/10 rounded-md transition-colors"
                title="View Database Relational Tables"
              >
                <span>Database Schema</span>
              </button>
            </div>
          </div>

          {/* Interactive Filters Component */}
          <FleetFilter
            filters={filters}
            onFilterChange={setFilters}
            brands={brands}
            totalResults={filteredAndSortedCars.length}
            onReset={() => setFilters(initialFilters)}
          />

          {/* Cars Grid */}
          {filteredAndSortedCars.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
              {filteredAndSortedCars.map((car) => (
                <CarCard
                  key={car.id}
                  car={car}
                  isFavorite={favorites.includes(car.id)}
                  onToggleFavorite={handleToggleFavorite}
                  onViewDetails={setSelectedCarForDetails}
                  onBookNow={handleOpenBooking}
                />
              ))}
            </div>
          ) : (
            <div className="p-16 text-center bg-[#12141A] rounded-2xl border border-white/5 space-y-4">
              <CarIcon className="w-12 h-12 text-[#D4AF37]/50 mx-auto" />
              <h3 className="font-luxury text-xl font-bold text-white">No Matching Fleet Vehicles</h3>
              <p className="text-xs text-neutral-400 max-w-md mx-auto">
                No vehicles matched your current filter criteria. Try resetting filters to explore our full 40+ car fleet.
              </p>
              <button
                onClick={() => setFilters(initialFilters)}
                className="px-5 py-2.5 text-xs font-semibold text-black bg-[#D4AF37] hover:bg-[#E5C07B] rounded-md transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          )}

        </div>
      </main>

      {/* Additional Concierge Services */}
      <ServicesSection
        services={services}
        onSelectService={handleSelectServiceForBooking}
      />

      {/* Experience & About Exotica */}
      <AboutSection />

      {/* Private Hubs & Global Locations */}
      <LocationsSection
        locations={locations}
        onSelectCityForBooking={handleSelectCityForBooking}
      />

      {/* Verified Renter Testimonials */}
      <ReviewsSection
        reviews={reviews}
        onAddReview={handleAddReview}
      />

      {/* Private Concierge Commission & Contact */}
      <ContactSection />

      {/* Modern Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenSchemaModal={() => setIsSchemaModalOpen(true)}
        onOpenAdminPortal={() => setIsAdminPortalOpen(true)}
      />

      {/* Modals & Dialogs */}
      {selectedCarForDetails && (
        <CarDetailsModal
          car={selectedCarForDetails}
          locations={locations}
          reviews={reviews}
          onClose={() => setSelectedCarForDetails(null)}
          onBookNow={handleOpenBooking}
        />
      )}

      {isBookingModalOpen && (
        <BookingModal
          isOpen={isBookingModalOpen}
          car={selectedCarForBooking}
          availableCars={cars}
          locations={locations}
          services={services}
          currentUser={currentUser}
          onClose={() => setIsBookingModalOpen(false)}
          onBookingSuccess={handleBookingSuccess}
        />
      )}

      {confirmedBookingVoucher && (
        <BookingConfirmationModal
          booking={confirmedBookingVoucher}
          onClose={() => setConfirmedBookingVoucher(null)}
          onGoToDashboard={() => {
            setConfirmedBookingVoucher(null);
            setIsUserPortalOpen(true);
          }}
          onOpenGoogleDrive={() => setIsGoogleDriveModalOpen(true)}
        />
      )}

      {isUserPortalOpen && (
        <UserPortalModal
          isOpen={isUserPortalOpen}
          user={currentUser}
          bookings={bookings}
          payments={payments}
          favoriteCars={favoriteCarsList}
          notifications={notifications}
          reviews={reviews}
          onClose={() => setIsUserPortalOpen(false)}
          onSelectCar={(c) => setSelectedCarForDetails(c)}
          onBookCar={(c) => handleOpenBooking(c)}
          onViewBookingReceipt={(b) => setConfirmedBookingVoucher(b)}
          onSwitchToAdmin={handleSwitchToAdmin}
          onMarkNotificationsRead={handleMarkNotificationsRead}
          onOpenGoogleDrive={() => setIsGoogleDriveModalOpen(true)}
          onOpenAuthModal={() => setIsAuthModalOpen(true)}
        />
      )}

      {isAdminPortalOpen && (
        <AdminDashboardModal
          isOpen={isAdminPortalOpen}
          cars={cars}
          brands={brands}
          bookings={bookings}
          users={allUsers}
          payments={payments}
          reviews={reviews}
          onClose={() => setIsAdminPortalOpen(false)}
          onSaveCar={handleSaveCar}
          onDeleteCar={handleDeleteCar}
          onUpdateBookingStatus={handleUpdateBookingStatus}
          onOpenSchemaModal={() => setIsSchemaModalOpen(true)}
        />
      )}

      {isGoogleDriveModalOpen && (
        <GoogleDriveModal
          isOpen={isGoogleDriveModalOpen}
          bookings={bookings}
          onClose={() => setIsGoogleDriveModalOpen(false)}
        />
      )}

      {isAuthModalOpen && (
        <AuthModal
          isOpen={isAuthModalOpen}
          currentUser={currentUser}
          firebaseUser={firebaseUser}
          onClose={() => setIsAuthModalOpen(false)}
          onAuthSuccess={(u) => setCurrentUser(u)}
          onSignOut={() => setFirebaseUser(null)}
        />
      )}

      {isSchemaModalOpen && (
        <SchemaModal
          isOpen={isSchemaModalOpen}
          onClose={() => setIsSchemaModalOpen(false)}
        />
      )}

    </div>
  );
}
