export type UserRole = 'customer' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  licenseNumber: string;
  avatar: string;
  joinedDate: string;
  membershipTier: 'Silver Member' | 'Gold Tier' | 'Platinum Elite' | 'Black Card VIP';
  totalSpend: number;
}

export interface Brand {
  id: string;
  name: string;
  origin: string;
  founded: number;
  tagline: string;
  description: string;
}

export type CarCategory = 
  | 'Luxury Sedan' 
  | 'SUV' 
  | 'Sports Car' 
  | 'Supercar' 
  | 'Convertible' 
  | 'Chauffeur';

export type CarAvailability = 'Available' | 'Reserved' | 'In Maintenance';

export interface CarSpecs {
  engine: string;
  horsepower: number; // in HP
  topSpeed: string; // e.g. "330 km/h"
  acceleration0100: string; // e.g. "2.9s"
  transmission: string;
  drivetrain: string;
  fuelType: string;
}

export interface Car {
  id: string;
  brandId: string;
  brandName: string;
  model: string;
  year: number;
  category: CarCategory;
  seats: number;
  transmission: 'Automatic' | 'PDK Dual-Clutch' | 'Steptronic' | 'DCT';
  fuelType: string;
  dailyPrice: number; // in USD / standard currency unit
  deposit: number;
  availability: CarAvailability;
  heroImage: string;
  gallery: string[];
  viewAngles: {
    label: string;
    image: string;
  }[];
  specs: CarSpecs;
  interiorFeatures: string[];
  safetyFeatures: string[];
  rating: number;
  reviewCount: number;
  featured: boolean;
  popular: boolean;
  colorName: string;
}

export interface Booking {
  id: string;
  bookingReference: string;
  carId: string;
  carName: string;
  carImage: string;
  brandName: string;
  userId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  driverLicenseNumber: string;
  pickupLocation: string;
  dropoffLocation: string;
  pickupDate: string;
  returnDate: string;
  pickupTime: string;
  durationDays: number;
  chauffeurOption: boolean;
  selectedServices: string[];
  baseDailyRate: number;
  baseRentalTotal: number;
  chauffeurTotal: number;
  servicesTotal: number;
  securityDeposit: number;
  luxuryTaxAndInsurance: number;
  grandTotal: number;
  status: 'Pending' | 'Confirmed' | 'Active' | 'Completed' | 'Cancelled';
  paymentStatus: 'Paid' | 'Authorized' | 'Pending' | 'Refunded';
  specialRequests?: string;
  createdAt: string;
}

export interface Payment {
  id: string;
  bookingId: string;
  bookingReference: string;
  amount: number;
  method: 'Card' | 'Apple Pay' | 'Wire Transfer' | 'Cryptocurrency';
  cardLast4?: string;
  status: 'Completed' | 'Refunded' | 'Pending';
  transactionId: string;
  date: string;
}

export interface Review {
  id: string;
  carId: string;
  carName: string;
  customerName: string;
  customerCity: string;
  customerAvatar: string;
  rating: number;
  date: string;
  comment: string;
  verifiedRental: boolean;
}

export interface LocationItem {
  id: string;
  city: string;
  country: string;
  hubName: string;
  address: string;
  phone: string;
  hours: string;
  deliveryCoverageKm: number;
  badge: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  pricePerDay: number;
  icon: string;
  highlights: string[];
}

export interface Favorite {
  id: string;
  userId: string;
  carId: string;
  addedAt: string;
}

export interface NotificationItem {
  id: string;
  userId: string;
  title: string;
  message: string;
  date: string;
  read: boolean;
  type: 'booking' | 'fleet' | 'concierge';
}

export interface FilterState {
  search: string;
  brand: string;
  category: string;
  maxPrice: number;
  transmission: string;
  seats: string;
  availability: string;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'power-desc' | 'rating-desc';
}
