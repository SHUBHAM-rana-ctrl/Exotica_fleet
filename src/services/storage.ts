import { Booking, Brand, Car, LocationItem, NotificationItem, Payment, Review, ServiceItem, User } from '../types';
import { 
  INITIAL_BRANDS, 
  INITIAL_CARS, 
  INITIAL_LOCATIONS, 
  INITIAL_NOTIFICATIONS, 
  INITIAL_PAYMENTS, 
  INITIAL_REVIEWS, 
  INITIAL_SERVICES, 
  INITIAL_USERS, 
  INITIAL_BOOKINGS 
} from '../data/initialData';

const KEYS = {
  CARS: 'exotica_cars',
  BRANDS: 'exotica_brands',
  LOCATIONS: 'exotica_locations',
  SERVICES: 'exotica_services',
  USERS: 'exotica_users',
  CURRENT_USER_ID: 'exotica_current_user_id',
  BOOKINGS: 'exotica_bookings',
  PAYMENTS: 'exotica_payments',
  REVIEWS: 'exotica_reviews',
  FAVORITES: 'exotica_favorites',
  NOTIFICATIONS: 'exotica_notifications',
};

// Safe JSON local storage helpers
function getStored<T>(key: string, fallback: T): T {
  try {
    const item = localStorage.getItem(key);
    if (!item) return fallback;
    return JSON.parse(item);
  } catch (err) {
    console.error(`Error reading ${key} from storage:`, err);
    return fallback;
  }
}

function setStored<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error(`Error saving ${key} to storage:`, err);
  }
}

export class ExoticaDatabase {
  // Cars
  static getCars(): Car[] {
    return getStored<Car[]>(KEYS.CARS, INITIAL_CARS);
  }

  static getCarById(id: string): Car | undefined {
    return this.getCars().find(c => c.id === id);
  }

  static saveCar(car: Car): void {
    const cars = this.getCars();
    const index = cars.findIndex(c => c.id === car.id);
    if (index >= 0) {
      cars[index] = car;
    } else {
      cars.unshift(car);
    }
    setStored(KEYS.CARS, cars);
  }

  static deleteCar(id: string): void {
    const cars = this.getCars().filter(c => c.id !== id);
    setStored(KEYS.CARS, cars);
  }

  // Brands
  static getBrands(): Brand[] {
    return getStored<Brand[]>(KEYS.BRANDS, INITIAL_BRANDS);
  }

  // Locations
  static getLocations(): LocationItem[] {
    return getStored<LocationItem[]>(KEYS.LOCATIONS, INITIAL_LOCATIONS);
  }

  // Services
  static getServices(): ServiceItem[] {
    return getStored<ServiceItem[]>(KEYS.SERVICES, INITIAL_SERVICES);
  }

  // Users & Auth
  static getUsers(): User[] {
    return getStored<User[]>(KEYS.USERS, INITIAL_USERS);
  }

  static getCurrentUser(): User {
    const users = this.getUsers();
    const currentId = localStorage.getItem(KEYS.CURRENT_USER_ID) || 'user-gaikwad';
    const found = users.find(u => u.id === currentId);
    return found || users[0];
  }

  static setCurrentUserId(userId: string): void {
    localStorage.setItem(KEYS.CURRENT_USER_ID, userId);
  }

  static updateUser(updated: User): void {
    const users = this.getUsers().map(u => u.id === updated.id ? updated : u);
    setStored(KEYS.USERS, users);
  }

  static registerUser(user: User): void {
    const users = this.getUsers();
    users.push(user);
    setStored(KEYS.USERS, users);
    this.setCurrentUserId(user.id);
  }

  // Bookings
  static getBookings(): Booking[] {
    return getStored<Booking[]>(KEYS.BOOKINGS, INITIAL_BOOKINGS);
  }

  static getBookingsByUser(userId: string): Booking[] {
    return this.getBookings().filter(b => b.userId === userId);
  }

  static createBooking(booking: Booking): Booking {
    const bookings = this.getBookings();
    bookings.unshift(booking);
    setStored(KEYS.BOOKINGS, bookings);

    // Also auto-create payment record
    const payment: Payment = {
      id: `pay-${Date.now()}`,
      bookingId: booking.id,
      bookingReference: booking.bookingReference,
      amount: booking.grandTotal,
      method: 'Card',
      cardLast4: '4242',
      status: 'Completed',
      transactionId: `TXN-${Math.floor(10000000 + Math.random() * 90000000)}`,
      date: new Date().toISOString().split('T')[0]
    };
    this.createPayment(payment);

    // Add notification
    this.addNotification({
      id: `notif-${Date.now()}`,
      userId: booking.userId,
      title: `Booking Confirmed: ${booking.carName}`,
      message: `Reference #${booking.bookingReference} has been reserved for ${booking.pickupDate} to ${booking.returnDate}.`,
      date: 'Just now',
      read: false,
      type: 'booking'
    });

    return booking;
  }

  static updateBookingStatus(id: string, status: Booking['status']): void {
    const bookings = this.getBookings().map(b => b.id === id ? { ...b, status } : b);
    setStored(KEYS.BOOKINGS, bookings);
  }

  // Payments
  static getPayments(): Payment[] {
    return getStored<Payment[]>(KEYS.PAYMENTS, INITIAL_PAYMENTS);
  }

  static createPayment(payment: Payment): void {
    const payments = this.getPayments();
    payments.unshift(payment);
    setStored(KEYS.PAYMENTS, payments);
  }

  // Reviews
  static getReviews(): Review[] {
    return getStored<Review[]>(KEYS.REVIEWS, INITIAL_REVIEWS);
  }

  static getReviewsForCar(carId: string): Review[] {
    return this.getReviews().filter(r => r.carId === carId);
  }

  static addReview(review: Review): void {
    const reviews = this.getReviews();
    reviews.unshift(review);
    setStored(KEYS.REVIEWS, reviews);
  }

  // Favorites
  static getFavorites(userId: string): string[] {
    const all = getStored<{ userId: string; carId: string }[]>(KEYS.FAVORITES, [
      { userId: 'user-gaikwad', carId: 'lamborghini-huracan' },
      { userId: 'user-gaikwad', carId: 'rolls-royce-ghost' }
    ]);
    return all.filter(f => f.userId === userId).map(f => f.carId);
  }

  static toggleFavorite(userId: string, carId: string): boolean {
    const all = getStored<{ userId: string; carId: string }[]>(KEYS.FAVORITES, [
      { userId: 'user-gaikwad', carId: 'lamborghini-huracan' },
      { userId: 'user-gaikwad', carId: 'rolls-royce-ghost' }
    ]);
    const exists = all.some(f => f.userId === userId && f.carId === carId);
    let updated;
    if (exists) {
      updated = all.filter(f => !(f.userId === userId && f.carId === carId));
    } else {
      updated = [...all, { userId, carId }];
    }
    setStored(KEYS.FAVORITES, updated);
    return !exists;
  }

  // Notifications
  static getNotifications(userId: string): NotificationItem[] {
    const all = getStored<NotificationItem[]>(KEYS.NOTIFICATIONS, INITIAL_NOTIFICATIONS);
    return all.filter(n => n.userId === userId);
  }

  static addNotification(item: NotificationItem): void {
    const all = getStored<NotificationItem[]>(KEYS.NOTIFICATIONS, INITIAL_NOTIFICATIONS);
    all.unshift(item);
    setStored(KEYS.NOTIFICATIONS, all);
  }

  static markAllNotificationsRead(userId: string): void {
    const all = getStored<NotificationItem[]>(KEYS.NOTIFICATIONS, INITIAL_NOTIFICATIONS);
    const updated = all.map(n => n.userId === userId ? { ...n, read: true } : n);
    setStored(KEYS.NOTIFICATIONS, updated);
  }

  // Reset to default seed
  static resetToDefault(): void {
    localStorage.removeItem(KEYS.CARS);
    localStorage.removeItem(KEYS.BRANDS);
    localStorage.removeItem(KEYS.LOCATIONS);
    localStorage.removeItem(KEYS.SERVICES);
    localStorage.removeItem(KEYS.USERS);
    localStorage.removeItem(KEYS.BOOKINGS);
    localStorage.removeItem(KEYS.PAYMENTS);
    localStorage.removeItem(KEYS.REVIEWS);
    localStorage.removeItem(KEYS.FAVORITES);
    localStorage.removeItem(KEYS.NOTIFICATIONS);
    localStorage.removeItem(KEYS.CURRENT_USER_ID);
  }

  // Complete MySQL Database Schema Script (as requested: "Create database tables for: Users, Cars, Brands, Bookings, Payments, Reviews, Locations, Services, Favorites, Notifications with proper relationships")
  static getMySQLSchemaScript(): string {
    return `-- ========================================================
-- EXOTICA Luxury Car Rental & Chauffeur Fleet
-- Relational Database Schema (MySQL 8.0+ / MariaDB)
-- Fully Normalized Architecture with Foreign Key Constraints
-- ========================================================

CREATE DATABASE IF NOT EXISTS exotica_luxury_fleet
  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE exotica_luxury_fleet;

-- 1. Brands Table
CREATE TABLE IF NOT EXISTS brands (
  id VARCHAR(64) PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  origin VARCHAR(100) NOT NULL,
  founded INT NOT NULL,
  tagline VARCHAR(255) NULL,
  description TEXT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 2. Locations Table
CREATE TABLE IF NOT EXISTS locations (
  id VARCHAR(64) PRIMARY KEY,
  city VARCHAR(100) NOT NULL,
  country VARCHAR(100) NOT NULL,
  hub_name VARCHAR(150) NOT NULL,
  address VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  hours VARCHAR(100) NOT NULL,
  delivery_coverage_km INT DEFAULT 50,
  badge VARCHAR(50) NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 3. Users Table
CREATE TABLE IF NOT EXISTS users (
  id VARCHAR(64) PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL DEFAULT 'argon2id$exotica$luxury_secret',
  phone VARCHAR(50) NOT NULL,
  role ENUM('customer', 'admin') DEFAULT 'customer',
  license_number VARCHAR(100) NOT NULL,
  avatar VARCHAR(255) NULL,
  membership_tier ENUM('Silver Member', 'Gold Tier', 'Platinum Elite', 'Black Card VIP') DEFAULT 'Silver Member',
  total_spend DECIMAL(12,2) DEFAULT 0.00,
  joined_date DATE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 4. Cars Table
CREATE TABLE IF NOT EXISTS cars (
  id VARCHAR(64) PRIMARY KEY,
  brand_id VARCHAR(64) NOT NULL,
  brand_name VARCHAR(100) NOT NULL,
  model VARCHAR(150) NOT NULL,
  year INT NOT NULL,
  category ENUM('Luxury Sedan', 'SUV', 'Sports Car', 'Supercar', 'Convertible', 'Chauffeur') NOT NULL,
  seats INT NOT NULL DEFAULT 4,
  transmission VARCHAR(50) NOT NULL,
  fuel_type VARCHAR(100) NOT NULL,
  daily_price DECIMAL(10,2) NOT NULL,
  deposit DECIMAL(10,2) NOT NULL,
  availability ENUM('Available', 'Reserved', 'In Maintenance') DEFAULT 'Available',
  hero_image VARCHAR(255) NOT NULL,
  engine_specs VARCHAR(150) NOT NULL,
  horsepower INT NOT NULL,
  top_speed VARCHAR(50) NOT NULL,
  acceleration_0_100 VARCHAR(50) NOT NULL,
  drivetrain VARCHAR(100) NOT NULL,
  rating DECIMAL(3,2) DEFAULT 5.00,
  review_count INT DEFAULT 0,
  featured BOOLEAN DEFAULT FALSE,
  popular BOOLEAN DEFAULT FALSE,
  color_name VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (brand_id) REFERENCES brands(id) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB;

-- 5. Services Table
CREATE TABLE IF NOT EXISTS services (
  id VARCHAR(64) PRIMARY KEY,
  title VARCHAR(150) NOT NULL,
  subtitle VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  price_per_day DECIMAL(10,2) NOT NULL,
  icon VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 6. Bookings Table
CREATE TABLE IF NOT EXISTS bookings (
  id VARCHAR(64) PRIMARY KEY,
  booking_reference VARCHAR(50) NOT NULL UNIQUE,
  car_id VARCHAR(64) NOT NULL,
  user_id VARCHAR(64) NOT NULL,
  pickup_location_id VARCHAR(64) NOT NULL,
  dropoff_location_id VARCHAR(64) NOT NULL,
  pickup_date DATE NOT NULL,
  return_date DATE NOT NULL,
  pickup_time VARCHAR(20) NOT NULL,
  duration_days INT NOT NULL,
  chauffeur_option BOOLEAN DEFAULT FALSE,
  base_daily_rate DECIMAL(10,2) NOT NULL,
  base_rental_total DECIMAL(12,2) NOT NULL,
  chauffeur_total DECIMAL(10,2) DEFAULT 0.00,
  services_total DECIMAL(10,2) DEFAULT 0.00,
  security_deposit DECIMAL(10,2) NOT NULL,
  tax_and_insurance DECIMAL(10,2) NOT NULL,
  grand_total DECIMAL(12,2) NOT NULL,
  status ENUM('Pending', 'Confirmed', 'Active', 'Completed', 'Cancelled') DEFAULT 'Pending',
  payment_status ENUM('Paid', 'Authorized', 'Pending', 'Refunded') DEFAULT 'Pending',
  special_requests TEXT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (car_id) REFERENCES cars(id) ON DELETE RESTRICT ON UPDATE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE RESTRICT ON UPDATE CASCADE,
  FOREIGN KEY (pickup_location_id) REFERENCES locations(id) ON DELETE RESTRICT ON UPDATE CASCADE,
  FOREIGN KEY (dropoff_location_id) REFERENCES locations(id) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB;

-- 7. Payments Table
CREATE TABLE IF NOT EXISTS payments (
  id VARCHAR(64) PRIMARY KEY,
  booking_id VARCHAR(64) NOT NULL,
  amount DECIMAL(12,2) NOT NULL,
  payment_method ENUM('Card', 'Apple Pay', 'Wire Transfer', 'Cryptocurrency') DEFAULT 'Card',
  card_last4 VARCHAR(4) NULL,
  status ENUM('Completed', 'Refunded', 'Pending') DEFAULT 'Completed',
  transaction_id VARCHAR(100) NOT NULL UNIQUE,
  payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;

-- 8. Reviews Table
CREATE TABLE IF NOT EXISTS reviews (
  id VARCHAR(64) PRIMARY KEY,
  car_id VARCHAR(64) NOT NULL,
  user_id VARCHAR(64) NOT NULL,
  rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT NOT NULL,
  verified_rental BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (car_id) REFERENCES cars(id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;

-- 9. Favorites Table
CREATE TABLE IF NOT EXISTS favorites (
  id VARCHAR(64) PRIMARY KEY,
  user_id VARCHAR(64) NOT NULL,
  car_id VARCHAR(64) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY unique_user_car_fav (user_id, car_id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (car_id) REFERENCES cars(id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;

-- 10. Notifications Table
CREATE TABLE IF NOT EXISTS notifications (
  id VARCHAR(64) PRIMARY KEY,
  user_id VARCHAR(64) NOT NULL,
  title VARCHAR(150) NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  notification_type ENUM('booking', 'fleet', 'concierge') DEFAULT 'booking',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;
`;
  }
}
