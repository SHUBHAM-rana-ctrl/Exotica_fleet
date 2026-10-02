import { Brand, Car, LocationItem, ServiceItem, User, Booking, Payment, Review, NotificationItem } from '../types';

export const INITIAL_BRANDS: Brand[] = [
  { id: 'rolls-royce', name: 'Rolls-Royce', origin: 'Goodwood, United Kingdom', founded: 1904, tagline: 'Inspiring Greatness', description: 'The pinnacle of bespoke automotive luxury and serene craftsmanship.' },
  { id: 'bentley', name: 'Bentley', origin: 'Crewe, United Kingdom', founded: 1919, tagline: 'Be Extraordinary', description: 'Handcrafted grand tourers harmonizing supreme power with aristocratic elegance.' },
  { id: 'ferrari', name: 'Ferrari', origin: 'Maranello, Italy', founded: 1939, tagline: 'Essence of Racing', description: 'Scuderia thoroughbreds forged on Formula 1 circuits and sculpted for the road.' },
  { id: 'lamborghini', name: 'Lamborghini', origin: 'Sant’Agata Bolognese, Italy', founded: 1963, tagline: 'Expect the Unexpected', description: 'Uncompromising Italian supercars delivering ferocious V10 and V12 symphonies.' },
  { id: 'porsche', name: 'Porsche', origin: 'Stuttgart, Germany', founded: 1931, tagline: 'Driven by Dreams', description: 'Precision German sports engineering that defines driving purity.' },
  { id: 'mercedes-benz', name: 'Mercedes-Benz', origin: 'Stuttgart, Germany', founded: 1926, tagline: 'The Best or Nothing', description: 'Unmatched executive prestige, cutting-edge intelligence, and AMG performance.' },
  { id: 'bmw', name: 'BMW', origin: 'Munich, Germany', founded: 1916, tagline: 'The Ultimate Driving Machine', description: 'Dynamic driver-centric sports sedans, commanding SAVs, and thrilling M engineering.' },
  { id: 'audi', name: 'Audi', origin: 'Ingolstadt, Germany', founded: 1909, tagline: 'Vorsprung durch Technik', description: 'Progressive design, iconic Quattro all-wheel drive, and virtual cockpit supremacy.' },
  { id: 'range-rover', name: 'Range Rover', origin: 'Gaydon, United Kingdom', founded: 1970, tagline: 'Peerless Luxury', description: 'The peerless British luxury SUV conquering remote terrains in royal comfort.' },
  { id: 'maserati', name: 'Maserati', origin: 'Modena, Italy', founded: 1914, tagline: 'Luxury in Motion', description: 'Neptune’s trident crafting sonorous Italian grand tourers with bespoke leather.' },
  { id: 'jaguar', name: 'Jaguar', origin: 'Coventry, United Kingdom', founded: 1922, tagline: 'The Art of Performance', description: 'Grace, space, and feline agility embodied in striking British sports design.' },
  { id: 'lexus', name: 'Lexus', origin: 'Nagoya, Japan', founded: 1989, tagline: 'Experience Amazing', description: 'Takumi craftsmanship, whispering hybrid powertrains, and peerless reliability.' },
];

export const INITIAL_LOCATIONS: LocationItem[] = [
  {
    id: 'mumbai',
    city: 'Mumbai',
    country: 'India',
    hubName: 'Bandra Kurla Complex (BKC) Flagship Hub',
    address: 'Maker Maxity, North Avenue 4, BKC, Bandra East, Mumbai 400051',
    phone: '+91 (022) 8900 4400',
    hours: '24/7 VIP Chauffeur & Concierge Desk',
    deliveryCoverageKm: 75,
    badge: 'Headquarters Hub'
  },
  {
    id: 'pune',
    city: 'Pune',
    country: 'India',
    hubName: 'Koregaon Park Prestige Lounge',
    address: 'Lane 7, South Main Road, Koregaon Park, Pune 411001',
    phone: '+91 (020) 7810 5500',
    hours: '07:00 AM – 02:00 AM Daily',
    deliveryCoverageKm: 50,
    badge: 'Express Delivery'
  },
  {
    id: 'delhi',
    city: 'Delhi NCR',
    country: 'India',
    hubName: 'Aerocity Diplomatic Fleet Center',
    address: 'Asset 10, Hospitality District, IGI Airport Aerocity, New Delhi 110037',
    phone: '+91 (011) 6720 9900',
    hours: '24/7 VIP Terminal & Concierge',
    deliveryCoverageKm: 90,
    badge: 'Diplomatic VIP'
  },
  {
    id: 'bangalore',
    city: 'Bangalore',
    country: 'India',
    hubName: 'UB City Concierge Pavilion',
    address: 'Level 2, The Collection at UB City, Vittal Mallya Road, Bengaluru 560001',
    phone: '+91 (080) 4120 7733',
    hours: '08:00 AM – 11:30 PM Daily',
    deliveryCoverageKm: 65,
    badge: 'Private Lounge'
  },
  {
    id: 'hyderabad',
    city: 'Hyderabad',
    country: 'India',
    hubName: 'Jubilee Hills Private Lounge',
    address: 'Road No. 36, Near Peddamma Temple, Jubilee Hills, Hyderabad 500033',
    phone: '+91 (040) 5540 2200',
    hours: '08:00 AM – 01:00 AM Daily',
    deliveryCoverageKm: 55,
    badge: 'VIP Salon'
  },
  {
    id: 'goa',
    city: 'Goa',
    country: 'India',
    hubName: 'North Goa Coastal Villa Port',
    address: 'Aguada-Siolim Coastal Expressway, Candolim, Goa 403515',
    phone: '+91 (0832) 980 1122',
    hours: '24/7 Resort & Yacht Club Delivery',
    deliveryCoverageKm: 80,
    badge: 'Resort Delivery'
  },
  {
    id: 'dubai',
    city: 'Dubai',
    country: 'United Arab Emirates',
    hubName: 'DIFC & Downtown Marquee Center',
    address: 'Gate Precinct 4, Dubai International Financial Centre, Dubai, UAE',
    phone: '+971 4 812 6000',
    hours: '24/7 Tarmac & Hotel Delivery',
    deliveryCoverageKm: 120,
    badge: 'International Hub'
  }
];

export const INITIAL_SERVICES: ServiceItem[] = [
  {
    id: 'chauffeur',
    title: 'Professional Chauffeur',
    subtitle: 'White-Glove Discretion & Master Navigation',
    description: 'Impeccably attired, security-certified master chauffeurs trained in executive etiquette and high-speed defensive driving.',
    pricePerDay: 180,
    icon: 'UserCheck',
    highlights: ['Bilingual & Security Vetted', 'Flight Monitoring & Punctuality Guarantee', 'Discreet Executive Protocol', 'Luggage Valet Assistance']
  },
  {
    id: 'airport-vip',
    title: 'Airport Tarmac & VIP Transfer',
    subtitle: 'Direct Aircraft Gate Pickup',
    description: 'Bypass commercial passenger streams. We coordinate with private aviation FBOs and VIP terminals for seamless air-to-cockpit transition.',
    pricePerDay: 220,
    icon: 'PlaneTakeoff',
    highlights: ['Private Jet FBO Access', 'Customs Fast-Track Liaison', 'Chilled Evian & Champagne', 'Flight Delayed Guarantee']
  },
  {
    id: 'wedding-service',
    title: 'Wedding Car & Gala Escort',
    subtitle: 'Unforgettable Grand Entrances',
    description: 'Make your milestone unforgettable with ribbons, floral arrangements, red carpet, and synchronized convoy management.',
    pricePerDay: 350,
    icon: 'HeartHandshake',
    highlights: ['Bespoke Floral Styling', 'Photo & Cinematic Timing', 'Trained Uniformed Chauffeur', 'Complimentary Champagne Toast']
  },
  {
    id: 'corporate-travel',
    title: 'Corporate Executive Travel',
    subtitle: 'Mobile High-Security Boardroom',
    description: 'Equipped with encrypted Wi-Fi, wireless charging hubs, quiet acoustic glass, and flexible multi-stop billing accounts.',
    pricePerDay: 260,
    icon: 'Briefcase',
    highlights: ['Dedicated Account Executive', 'Confidential NDA Protocol', 'High-Speed In-Cabin Wi-Fi', 'Monthly Corporate Billing']
  },
  {
    id: 'luxury-road-trips',
    title: 'Curated Luxury Road Trips',
    subtitle: 'Bespoke Scenic Expedition Routes',
    description: 'Pre-programmed GPS routes through scenic mountain passes and coastal highways with curated 5-star hotel concierge bookings.',
    pricePerDay: 190,
    icon: 'Compass',
    highlights: ['Curated Waypoint Navigation', '24/7 Chase Car Support', 'Gourmet Picnic Hamper Included', 'Unlimited Scenic Mileage']
  },
  {
    id: 'doorstep-delivery',
    title: 'White-Glove Doorstep Delivery',
    subtitle: 'Hand-Delivered on Enclosed Transporter',
    description: 'Arrives in pristine condition inside our enclosed climate-controlled glass transporter directly to your residence or hotel.',
    pricePerDay: 140,
    icon: 'Truck',
    highlights: ['Zero Transit Mileage on Odometer', 'Full Cockpit Orientation', 'Sanitized & Detailer Inspected', 'Contactless Signature']
  },
  {
    id: 'vip-concierge',
    title: 'VIP 24/7 Lifestyle Concierge',
    subtitle: 'Priority Table Bookings & Private Access',
    description: 'Beyond the drive, enjoy privileged access to Michelin-starred dining, sold-out galas, private yacht charters, and rooftop lounges.',
    pricePerDay: 160,
    icon: 'Crown',
    highlights: ['Priority Restaurant Reservations', 'Exclusive Club Table Access', 'Personal Itinerary Curator', 'Emergency Roadside Dispatch']
  }
];

export const INITIAL_CARS: Car[] = [
  // 1. Lamborghini Huracán (Hero Model)
  {
    id: 'lamborghini-huracan',
    brandId: 'lamborghini',
    brandName: 'Lamborghini',
    model: 'Huracán EVO V10',
    year: 2024,
    category: 'Supercar',
    seats: 2,
    transmission: 'DCT',
    fuelType: '5.2L Naturally Aspirated V10',
    dailyPrice: 1650,
    deposit: 3500,
    availability: 'Available',
    heroImage: '/src/assets/images/hero_supercar_dark_1790857698810.jpg',
    gallery: [
      '/src/assets/images/hero_supercar_dark_1790857698810.jpg',
      '/src/assets/images/luxury_interior_cockpit_1790857752547.jpg',
      'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1400&q=80'
    ],
    viewAngles: [
      { label: 'Front Fascia', image: '/src/assets/images/hero_supercar_dark_1790857698810.jpg' },
      { label: 'Cockpit View', image: '/src/assets/images/luxury_interior_cockpit_1790857752547.jpg' },
      { label: 'Rear Diffuser', image: 'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=1400&q=80' },
      { label: 'Side Profile', image: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1400&q=80' }
    ],
    specs: {
      engine: '5.2-Liter Naturally Aspirated V10',
      horsepower: 640,
      topSpeed: '325 km/h',
      acceleration0100: '2.9s',
      transmission: '7-speed LDF Dual-Clutch',
      drivetrain: 'All-Wheel Drive with LDVI',
      fuelType: 'Premium 98 Octane Petrol'
    },
    interiorFeatures: [
      'Alcantara & Carbon Fiber Sport Bucket Seats',
      '8.4-inch HMI Capacitive Multi-Touch Display',
      'Telemetry System with On-Board Cameras',
      'Titanium Roll Cage Accent & Laser Stitching',
      'Sensonum® High-Definition 390W Audio System'
    ],
    safetyFeatures: [
      'Carbon Ceramic Brakes (CCB) with Monoblock Calipers',
      'Lamborghini Dinamica Veicolo Integrata (LDVI)',
      'Front Lifting System for Speed Bumps',
      'Electromechanical Power Steering (LDS)',
      'Surround Park Sensors with Rear Reversing Camera'
    ],
    rating: 5.0,
    reviewCount: 38,
    featured: true,
    popular: true,
    colorName: 'Nero Noctis Metallic with Giallo Belenus Accents'
  },

  // 2. Rolls-Royce Ghost
  {
    id: 'rolls-royce-ghost',
    brandId: 'rolls-royce',
    brandName: 'Rolls-Royce',
    model: 'Ghost Extended Black Badge',
    year: 2024,
    category: 'Chauffeur',
    seats: 4,
    transmission: 'Automatic',
    fuelType: '6.75L Twin-Turbocharged V12',
    dailyPrice: 2200,
    deposit: 5000,
    availability: 'Available',
    heroImage: '/src/assets/images/luxury_rolls_royce_1790857721026.jpg',
    gallery: [
      '/src/assets/images/luxury_rolls_royce_1790857721026.jpg',
      '/src/assets/images/luxury_interior_cockpit_1790857752547.jpg',
      'https://images.unsplash.com/photo-1631295868223-63265840d001?auto=format&fit=crop&w=1400&q=80'
    ],
    viewAngles: [
      { label: 'Coachwork Front', image: '/src/assets/images/luxury_rolls_royce_1790857721026.jpg' },
      { label: 'Starlight Suite', image: '/src/assets/images/luxury_interior_cockpit_1790857752547.jpg' },
      { label: 'Side Elegance', image: 'https://images.unsplash.com/photo-1631295868223-63265840d001?auto=format&fit=crop&w=1400&q=80' }
    ],
    specs: {
      engine: '6.75-Liter Twin-Turbo V12',
      horsepower: 592,
      topSpeed: '250 km/h (Governed)',
      acceleration0100: '4.6s',
      transmission: 'Satellite-Aided 8-Speed Automatic',
      drivetrain: 'All-Wheel Drive & All-Wheel Steer',
      fuelType: 'Premium Petrol'
    },
    interiorFeatures: [
      'Shooting Star Headliner with 1,344 Fiber-Optic Lights',
      'Effortless Power-Assist Rear Suicide Coach Doors',
      'Champagne Cooler with Crystal Flutes in Rear Console',
      'Bespoke 18-Speaker 1300W Studio Audio System',
      'Hand-Selected Open-Pore Obsidian Veneers'
    ],
    safetyFeatures: [
      'Planar Suspension with Flagbearer Road-Reading Cameras',
      'Night Vision Assist with Pedestrian & Wildlife Warning',
      'Active Cruise Control with Emergency Brake Assist',
      '360° Helicopter View Surround Camera Suite'
    ],
    rating: 4.9,
    reviewCount: 42,
    featured: true,
    popular: true,
    colorName: 'Diamond Black with Mandarin Pinstripe'
  },

  // 3. Porsche 911
  {
    id: 'porsche-911',
    brandId: 'porsche',
    brandName: 'Porsche',
    model: '911 Carrera GTS (992)',
    year: 2024,
    category: 'Sports Car',
    seats: 4,
    transmission: 'PDK Dual-Clutch',
    fuelType: '3.0L Twin-Turbo Flat-6',
    dailyPrice: 1100,
    deposit: 2500,
    availability: 'Available',
    heroImage: '/src/assets/images/sports_porsche_911_1790857738319.jpg',
    gallery: [
      '/src/assets/images/sports_porsche_911_1790857738319.jpg',
      '/src/assets/images/luxury_interior_cockpit_1790857752547.jpg',
      'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1400&q=80'
    ],
    viewAngles: [
      { label: 'Exterior 3/4', image: '/src/assets/images/sports_porsche_911_1790857738319.jpg' },
      { label: 'Sport Cockpit', image: '/src/assets/images/luxury_interior_cockpit_1790857752547.jpg' },
      { label: 'Rear Lightband', image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1400&q=80' }
    ],
    specs: {
      engine: '3.0-Liter Twin-Turbocharged Boxer 6',
      horsepower: 473,
      topSpeed: '311 km/h',
      acceleration0100: '3.3s',
      transmission: '8-Speed Porsche Doppelkupplung (PDK)',
      drivetrain: 'Rear-Wheel Drive with PTV Plus',
      fuelType: 'Premium Petrol'
    },
    interiorFeatures: [
      'Race-Tex Interior Package with Carmine Red Stitching',
      'Adaptive Sports Seats Plus (18-Way Electric)',
      'Sport Chrono Package with Mode Switch Dial',
      'Burmester® High-End 3D Surround Sound System',
      'Porsche Communication Management (PCM) 10.9-inch'
    ],
    safetyFeatures: [
      'Porsche Ceramic Composite Brakes (PCCB)',
      'Porsche Dynamic Light System Plus (PDLS+ Matrix LED)',
      'Rear Axle Steering for Dynamic Precision',
      'Lane Keep Assist with Traffic Sign Recognition'
    ],
    rating: 4.9,
    reviewCount: 56,
    featured: true,
    popular: true,
    colorName: 'Agate Grey Metallic'
  },

  // 4. Ferrari Roma
  {
    id: 'ferrari-roma',
    brandId: 'ferrari',
    brandName: 'Ferrari',
    model: 'Roma V8 Coupe',
    year: 2024,
    category: 'Supercar',
    seats: 2,
    transmission: 'DCT',
    fuelType: '3.9L Twin-Turbo V8',
    dailyPrice: 1750,
    deposit: 3800,
    availability: 'Available',
    heroImage: 'https://images.unsplash.com/photo-1592198084033-aade902d1aae?auto=format&fit=crop&w=1400&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1592198084033-aade902d1aae?auto=format&fit=crop&w=1400&q=80',
      '/src/assets/images/luxury_interior_cockpit_1790857752547.jpg',
      'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=1400&q=80'
    ],
    viewAngles: [
      { label: 'Front Grille', image: 'https://images.unsplash.com/photo-1592198084033-aade902d1aae?auto=format&fit=crop&w=1400&q=80' },
      { label: 'Dual Cockpit', image: '/src/assets/images/luxury_interior_cockpit_1790857752547.jpg' },
      { label: 'Side Aero', image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=1400&q=80' }
    ],
    specs: {
      engine: '3.9-Liter 90° Twin-Turbo V8',
      horsepower: 612,
      topSpeed: '320 km/h',
      acceleration0100: '3.4s',
      transmission: '8-Speed F1 Dual-Clutch',
      drivetrain: 'Rear-Wheel Drive with Side Slip Control 6.0',
      fuelType: 'Premium Petrol'
    },
    interiorFeatures: [
      'Dual Cockpit Architecture with Passenger Display',
      'Poltrona Frau® Full Grain Luxury Leather',
      '16-inch Curved Digital Instrument Cluster',
      'F1-Inspired Carbon Fiber Steering Wheel with LED Shift Lights'
    ],
    safetyFeatures: [
      'Side Slip Control 6.0 with Dynamic Enhancer',
      'Carbon Ceramic Matrix Brakes',
      'Surround View 360° Vision Cameras',
      'Adaptive Cruise Control & Blind Spot Radar'
    ],
    rating: 4.95,
    reviewCount: 29,
    featured: true,
    popular: true,
    colorName: 'Grigio Silverstone with Rosso Interior'
  },

  // 5. Ferrari F8 Tributo
  {
    id: 'ferrari-f8-tributo',
    brandId: 'ferrari',
    brandName: 'Ferrari',
    model: 'F8 Tributo Berlinetta',
    year: 2024,
    category: 'Supercar',
    seats: 2,
    transmission: 'DCT',
    fuelType: '3.9L Twin-Turbo V8',
    dailyPrice: 1950,
    deposit: 4200,
    availability: 'Available',
    heroImage: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=1400&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=1400&q=80',
      '/src/assets/images/luxury_interior_cockpit_1790857752547.jpg'
    ],
    viewAngles: [
      { label: 'Front S-Duct', image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=1400&q=80' },
      { label: 'Cockpit View', image: '/src/assets/images/luxury_interior_cockpit_1790857752547.jpg' }
    ],
    specs: {
      engine: '3.9L Twin-Turbocharged V8 (Engine of the Year)',
      horsepower: 710,
      topSpeed: '340 km/h',
      acceleration0100: '2.9s',
      transmission: '7-Speed F1 Dual-Clutch',
      drivetrain: 'Rear-Wheel Drive with E-Diff3',
      fuelType: 'Premium Petrol'
    },
    interiorFeatures: [
      'Carbon Fiber Racing Seats with Gold Stitching',
      'Passenger Touchscreen Telemetry Unit',
      'Lexan Louvered Engine Cover Glass',
      'JBL Professional Surround Sound'
    ],
    safetyFeatures: [
      'Ferrari Dynamic Enhancer Plus (FDE+)',
      'Brembo Extreme Carbon Ceramic Braking System',
      'Front Axle Hydraulic Lifting System'
    ],
    rating: 5.0,
    reviewCount: 31,
    featured: false,
    popular: true,
    colorName: 'Rosso Corsa with Nero Roof'
  },

  // 6. Lamborghini Urus
  {
    id: 'lamborghini-urus',
    brandId: 'lamborghini',
    brandName: 'Lamborghini',
    model: 'Urus Performante Super SUV',
    year: 2024,
    category: 'SUV',
    seats: 5,
    transmission: 'Automatic',
    fuelType: '4.0L Twin-Turbo V8',
    dailyPrice: 1550,
    deposit: 3200,
    availability: 'Available',
    heroImage: 'https://images.unsplash.com/photo-1541348263662-e0c8de4259ba?auto=format&fit=crop&w=1400&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1541348263662-e0c8de4259ba?auto=format&fit=crop&w=1400&q=80',
      '/src/assets/images/hero_supercar_dark_1790857698810.jpg'
    ],
    viewAngles: [
      { label: 'Front Stance', image: 'https://images.unsplash.com/photo-1541348263662-e0c8de4259ba?auto=format&fit=crop&w=1400&q=80' },
      { label: 'Dark Cockpit', image: '/src/assets/images/hero_supercar_dark_1790857698810.jpg' }
    ],
    specs: {
      engine: '4.0-Liter Twin-Turbo V8',
      horsepower: 666,
      topSpeed: '306 km/h',
      acceleration0100: '3.3s',
      transmission: '8-Speed Automatic with ANIMA Modes',
      drivetrain: 'Permanent 4WD with Active Torque Vectoring',
      fuelType: 'Premium Petrol'
    },
    interiorFeatures: [
      'Bicolor Sportivo Alcantara Interior',
      'Akrapovič Titanium Lightweight Exhaust System',
      'Bang & Olufsen 3D Advanced 1700W Sound',
      'Panoramic Sunroof & Ambient Illumination'
    ],
    safetyFeatures: [
      'World Largest Production Carbon Ceramic Brakes',
      'Active Roll Stabilization & Air Suspension',
      'Night Vision Camera with Pedestrian Detection'
    ],
    rating: 4.9,
    reviewCount: 47,
    featured: true,
    popular: true,
    colorName: 'Giallo Auge with Gloss Black Pack'
  },

  // 7. Rolls-Royce Cullinan
  {
    id: 'rolls-royce-cullinan',
    brandId: 'rolls-royce',
    brandName: 'Rolls-Royce',
    model: 'Cullinan Black Badge',
    year: 2024,
    category: 'SUV',
    seats: 4,
    transmission: 'Automatic',
    fuelType: '6.75L Twin-Turbo V12',
    dailyPrice: 2400,
    deposit: 5500,
    availability: 'Available',
    heroImage: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1400&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1400&q=80',
      '/src/assets/images/luxury_rolls_royce_1790857721026.jpg'
    ],
    viewAngles: [
      { label: 'Majestic Exterior', image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1400&q=80' },
      { label: 'Villa Twilight', image: '/src/assets/images/luxury_rolls_royce_1790857721026.jpg' }
    ],
    specs: {
      engine: '6.75-Liter Twin-Turbo V12',
      horsepower: 600,
      topSpeed: '250 km/h',
      acceleration0100: '4.9s',
      transmission: '8-Speed Automatic',
      drivetrain: 'All-Wheel Drive with Off-Road Magic Carpet Ride',
      fuelType: 'Premium Petrol'
    },
    interiorFeatures: [
      'Viewing Suite: Deployable Leather Armchairs in Tailgate',
      'Immersive Seating with Whisky Decanter & Refrigerated Glassware',
      'Bespoke Starlight Headliner in Perforated Leather',
      'Acoustic Glass Insulation for Library Silence'
    ],
    safetyFeatures: [
      'Everywhere Button for Effortless Off-Roading',
      '4-Camera System with Panoramic View & All-Round Visibility',
      'Laser Headlights with 600-Meter High Beam Range'
    ],
    rating: 5.0,
    reviewCount: 35,
    featured: true,
    popular: true,
    colorName: 'Midnight Sapphire with Arctic White Hides'
  },

  // 8. Bentley Continental GT
  {
    id: 'bentley-continental-gt',
    brandId: 'bentley',
    brandName: 'Bentley',
    model: 'Continental GT Speed W12',
    year: 2024,
    category: 'Luxury Sedan',
    seats: 4,
    transmission: 'DCT',
    fuelType: '6.0L Twin-Turbo W12',
    dailyPrice: 1400,
    deposit: 3000,
    availability: 'Available',
    heroImage: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1400&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1400&q=80',
      '/src/assets/images/luxury_interior_cockpit_1790857752547.jpg'
    ],
    viewAngles: [
      { label: 'Grand Touring Stance', image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1400&q=80' },
      { label: 'Rotating Display Cockpit', image: '/src/assets/images/luxury_interior_cockpit_1790857752547.jpg' }
    ],
    specs: {
      engine: '6.0-Liter Twin-Turbocharged W12 TSI',
      horsepower: 650,
      topSpeed: '335 km/h',
      acceleration0100: '3.6s',
      transmission: '8-Speed Dual-Clutch',
      drivetrain: 'Active All-Wheel Drive with Electronic Limited Slip',
      fuelType: 'Premium Petrol'
    },
    interiorFeatures: [
      'Bentley Rotating Dashboard (Wood, Dials, Touchscreen)',
      'Diamond-in-Diamond Hand-Quilted Mulliner Leather',
      'Naim for Bentley 2200W 18-Speaker Audio',
      'Heated and Cooled Seats with 6 Massage Modes'
    ],
    safetyFeatures: [
      'Bentley Dynamic Ride 48V Anti-Roll Stabilization',
      'Matrix LED Headlamps with Cut-Crystal Facet Effect',
      'Head-Up Display with Night Vision'
    ],
    rating: 4.9,
    reviewCount: 39,
    featured: false,
    popular: true,
    colorName: 'Monaco Yellow / Dark Sapphire'
  },

  // 9. Bentley Bentayga
  {
    id: 'bentley-bentayga',
    brandId: 'bentley',
    brandName: 'Bentley',
    model: 'Bentayga EWB Azure V8',
    year: 2024,
    category: 'SUV',
    seats: 5,
    transmission: 'Automatic',
    fuelType: '4.0L Twin-Turbo V8',
    dailyPrice: 1350,
    deposit: 2800,
    availability: 'Available',
    heroImage: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1400&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1400&q=80'
    ],
    viewAngles: [
      { label: 'EWB Profile', image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1400&q=80' }
    ],
    specs: {
      engine: '4.0L Twin-Turbo V8',
      horsepower: 542,
      topSpeed: '290 km/h',
      acceleration0100: '4.5s',
      transmission: '8-Speed Automatic',
      drivetrain: 'Permanent All-Wheel Drive',
      fuelType: 'Premium Petrol'
    },
    interiorFeatures: [
      'Bentley Airline Seat Specification with Auto Climate Sensing',
      'Waterfall Ambient Illumination across Door Panels',
      'Rear Seat Touchscreen Remote Control Unit',
      'Power Closing Rear Passenger Doors'
    ],
    safetyFeatures: [
      'Electronic All-Wheel Steering',
      'Bentley Safeguard Plus with City Assist',
      'Touring Specification with Predictive Adaptive Cruise'
    ],
    rating: 4.85,
    reviewCount: 24,
    featured: false,
    popular: false,
    colorName: 'Havana Metallic'
  },

  // 10. Mercedes-Benz S-Class
  {
    id: 'mercedes-s-class',
    brandId: 'mercedes-benz',
    brandName: 'Mercedes-Benz',
    model: 'S 580 4MATIC Maybach Edition',
    year: 2024,
    category: 'Chauffeur',
    seats: 4,
    transmission: 'Automatic',
    fuelType: '4.0L Biturbo V8 Mild-Hybrid',
    dailyPrice: 950,
    deposit: 2000,
    availability: 'Available',
    heroImage: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1400&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1400&q=80',
      '/src/assets/images/luxury_interior_cockpit_1790857752547.jpg'
    ],
    viewAngles: [
      { label: 'Executive Stance', image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1400&q=80' },
      { label: 'Hyperscreen Cabin', image: '/src/assets/images/luxury_interior_cockpit_1790857752547.jpg' }
    ],
    specs: {
      engine: '4.0-Liter Biturbo V8 with EQ Boost',
      horsepower: 496,
      topSpeed: '250 km/h (Governed)',
      acceleration0100: '4.4s',
      transmission: '9G-TRONIC 9-Speed Automatic',
      drivetrain: '4MATIC All-Wheel Drive',
      fuelType: 'Mild Hybrid Petrol'
    },
    interiorFeatures: [
      'Executive Rear Lounge with Reclining Calf Rest',
      'Burmester® High-End 4D Surround Sound with In-Seat Resonators',
      'Active Ambient Lighting with 250 LEDs & Sound Visualization',
      'MBUX Augmented Reality Head-Up Display'
    ],
    safetyFeatures: [
      'Rear Passenger Frontal Airbags (World First)',
      'E-ACTIVE BODY CONTROL with Curve Tilting Function',
      'Drive Pilot Autonomous Highway Pilot Ready',
      'Digital Light Headlamps with Projection Guidance'
    ],
    rating: 4.9,
    reviewCount: 61,
    featured: true,
    popular: true,
    colorName: 'Obsidian Black Metallic with Silver Two-Tone'
  },

  // 11. Mercedes-Benz AMG GT
  {
    id: 'mercedes-amg-gt',
    brandId: 'mercedes-benz',
    brandName: 'Mercedes-Benz',
    model: 'AMG GT 63 S Coupe',
    year: 2024,
    category: 'Sports Car',
    seats: 4,
    transmission: 'DCT',
    fuelType: '4.0L Handcrafted Biturbo V8',
    dailyPrice: 1250,
    deposit: 2600,
    availability: 'Available',
    heroImage: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1400&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1400&q=80'
    ],
    viewAngles: [
      { label: 'Panamericana Stance', image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1400&q=80' }
    ],
    specs: {
      engine: '4.0-Liter Handcrafted AMG Biturbo V8',
      horsepower: 577,
      topSpeed: '315 km/h',
      acceleration0100: '3.2s',
      transmission: 'AMG SPEEDSHIFT MCT 9G',
      drivetrain: 'AMG Performance 4MATIC+ with Drift Mode',
      fuelType: 'Premium Petrol'
    },
    interiorFeatures: [
      'AMG Performance Seats in Nappa Leather & Microfiber',
      'AMG Track Pace Telemetry Data Logger',
      'AMG Performance Steering Wheel with Twin Color Displays'
    ],
    safetyFeatures: [
      'AMG High-Performance Ceramic Composite Brakes',
      'AMG Active Ride Control Suspension with Active Roll Stabilization',
      'Active Aerodynamic Profile in Underbody'
    ],
    rating: 4.88,
    reviewCount: 34,
    featured: false,
    popular: true,
    colorName: 'Magno Selenite Grey Matte'
  },

  // 12. Mercedes-Benz C-Class
  {
    id: 'mercedes-c-class',
    brandId: 'mercedes-benz',
    brandName: 'Mercedes-Benz',
    model: 'C 300 AMG Line',
    year: 2024,
    category: 'Luxury Sedan',
    seats: 5,
    transmission: 'Automatic',
    fuelType: '2.0L Turbo Mild-Hybrid',
    dailyPrice: 380,
    deposit: 900,
    availability: 'Available',
    heroImage: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&w=1400&q=80',
    gallery: ['https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&w=1400&q=80'],
    viewAngles: [{ label: 'Exterior', image: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&w=1400&q=80' }],
    specs: { engine: '2.0L Turbo Inline-4 with ISG', horsepower: 255, topSpeed: '245 km/h', acceleration0100: '5.9s', transmission: '9G-TRONIC', drivetrain: 'Rear-Wheel Drive', fuelType: 'Petrol' },
    interiorFeatures: ['11.9-inch Portrait MBUX Central Display', 'Sport Leather Seating', 'Panoramic Sunroof'],
    safetyFeatures: ['Active Brake Assist', 'Blind Spot Assist', 'Parktronic with 360 Camera'],
    rating: 4.75,
    reviewCount: 22,
    featured: false,
    popular: false,
    colorName: 'Polar White'
  },

  // 13. Mercedes-Benz E-Class
  {
    id: 'mercedes-e-class',
    brandId: 'mercedes-benz',
    brandName: 'Mercedes-Benz',
    model: 'E 350 Exclusive Luxury',
    year: 2024,
    category: 'Luxury Sedan',
    seats: 5,
    transmission: 'Automatic',
    fuelType: '2.0L Turbo Mild-Hybrid',
    dailyPrice: 520,
    deposit: 1200,
    availability: 'Available',
    heroImage: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1400&q=80',
    gallery: ['https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1400&q=80'],
    viewAngles: [{ label: 'Sedan Stance', image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1400&q=80' }],
    specs: { engine: '2.0L Turbocharged Inline-4 EQ Boost', horsepower: 295, topSpeed: '250 km/h', acceleration0100: '5.5s', transmission: '9G-TRONIC', drivetrain: '4MATIC AWD', fuelType: 'Mild Hybrid' },
    interiorFeatures: ['MBUX Superscreen with Selfie Camera for Zoom', 'Active Ambient Lighting with Sound Visualization', 'Burmester 4D Audio'],
    safetyFeatures: ['PRE-SAFE Impulse Side', 'Active Distance Assist DISTRONIC'],
    rating: 4.82,
    reviewCount: 28,
    featured: false,
    popular: false,
    colorName: 'Nautical Blue'
  },

  // 14. Mercedes-Benz GLE
  {
    id: 'mercedes-gle',
    brandId: 'mercedes-benz',
    brandName: 'Mercedes-Benz',
    model: 'GLE 450 4MATIC SUV',
    year: 2024,
    category: 'SUV',
    seats: 5,
    transmission: 'Automatic',
    fuelType: '3.0L Turbo Inline-6 EQ Boost',
    dailyPrice: 650,
    deposit: 1500,
    availability: 'Available',
    heroImage: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1400&q=80',
    gallery: ['https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1400&q=80'],
    viewAngles: [{ label: 'Front SUV', image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1400&q=80' }],
    specs: { engine: '3.0L Turbo Inline-6 with 48V Hybrid', horsepower: 375, topSpeed: '250 km/h', acceleration0100: '5.3s', transmission: '9G-TRONIC', drivetrain: '4MATIC All-Wheel Drive', fuelType: 'Mild Hybrid' },
    interiorFeatures: ['Dual 12.3-inch Widescreen Cockpit', 'Acoustic Comfort Acoustic Package', 'Ventilated Climate Seats'],
    safetyFeatures: ['AIRMATIC Air Suspension with Adaptive Damping', 'Downhill Speed Regulation (DSR)'],
    rating: 4.8,
    reviewCount: 30,
    featured: false,
    popular: false,
    colorName: 'Emerald Green Metallic'
  },

  // 15. Mercedes-Benz GLS
  {
    id: 'mercedes-gls',
    brandId: 'mercedes-benz',
    brandName: 'Mercedes-Benz',
    model: 'GLS 600 Maybach 4MATIC',
    year: 2024,
    category: 'SUV',
    seats: 4,
    transmission: 'Automatic',
    fuelType: '4.0L Biturbo V8',
    dailyPrice: 1200,
    deposit: 2500,
    availability: 'Available',
    heroImage: 'https://images.unsplash.com/photo-1541348263662-e0c8de4259ba?auto=format&fit=crop&w=1400&q=80',
    gallery: ['https://images.unsplash.com/photo-1541348263662-e0c8de4259ba?auto=format&fit=crop&w=1400&q=80'],
    viewAngles: [{ label: 'Maybach SUV', image: 'https://images.unsplash.com/photo-1541348263662-e0c8de4259ba?auto=format&fit=crop&w=1400&q=80' }],
    specs: { engine: '4.0-Liter V8 Biturbo Maybach Tuned', horsepower: 550, topSpeed: '250 km/h', acceleration0100: '4.8s', transmission: '9G-TRONIC', drivetrain: '4MATIC AWD', fuelType: 'Premium Petrol' },
    interiorFeatures: ['Reclining First-Class Rear Lounge with Footrests', 'Electrically Extending Running Boards with Maybach Crest', 'Rear Champagne Refrigerator'],
    safetyFeatures: ['E-ACTIVE BODY CONTROL with Maybach Driving Program', 'Digital Light Intelligent LED System'],
    rating: 4.93,
    reviewCount: 37,
    featured: true,
    popular: true,
    colorName: 'Two-Tone Obsidian Black / Rubellite Red'
  },

  // 16. BMW 7 Series
  {
    id: 'bmw-7-series',
    brandId: 'bmw',
    brandName: 'BMW',
    model: '760i xDrive Sedan',
    year: 2024,
    category: 'Chauffeur',
    seats: 4,
    transmission: 'Steptronic',
    fuelType: '4.4L TwinPower Turbo V8',
    dailyPrice: 900,
    deposit: 1900,
    availability: 'Available',
    heroImage: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1400&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1400&q=80',
      '/src/assets/images/luxury_interior_cockpit_1790857752547.jpg'
    ],
    viewAngles: [
      { label: 'Iconic Kidney Glow', image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1400&q=80' },
      { label: 'Cockpit & Theater', image: '/src/assets/images/luxury_interior_cockpit_1790857752547.jpg' }
    ],
    specs: {
      engine: '4.4-Liter TwinPower Turbo V8 with 48V Hybrid',
      horsepower: 536,
      topSpeed: '250 km/h',
      acceleration0100: '4.1s',
      transmission: '8-Speed Sport Steptronic',
      drivetrain: 'xDrive Intelligent All-Wheel Drive',
      fuelType: 'Mild Hybrid Petrol'
    },
    interiorFeatures: [
      '31.3-inch 8K BMW Theater Screen in Ceiling for Rear Cabin',
      'BMW Interaction Bar with Backlit Dynamic Crystal Facets',
      'Executive Lounge Seating with Recline and Footrest',
      'Bowers & Wilkins Diamond Surround 36-Speaker Audio'
    ],
    safetyFeatures: [
      'BMW Curved Display with Augmented Reality View',
      'Active Comfort Drive with Preview & 4-Wheel Steering',
      'Automatic Doors with Ultrasonic Obstacle Detection'
    ],
    rating: 4.9,
    reviewCount: 45,
    featured: true,
    popular: true,
    colorName: 'Mineral White Metallic with Two-Tone Black Sapphire'
  },

  // 17. BMW M8
  {
    id: 'bmw-m8',
    brandId: 'bmw',
    brandName: 'BMW',
    model: 'M8 Competition Gran Coupe',
    year: 2024,
    category: 'Sports Car',
    seats: 4,
    transmission: 'Steptronic',
    fuelType: '4.4L M TwinPower Turbo V8',
    dailyPrice: 1300,
    deposit: 2700,
    availability: 'Available',
    heroImage: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1400&q=80',
    gallery: ['https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1400&q=80'],
    viewAngles: [{ label: 'M8 Gran Coupe', image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1400&q=80' }],
    specs: { engine: '4.4L M TwinPower Turbo V8', horsepower: 617, topSpeed: '305 km/h', acceleration0100: '3.0s', transmission: '8-Speed M Steptronic with Drivelogic', drivetrain: 'M xDrive with RWD Drift Mode', fuelType: 'Premium Petrol' },
    interiorFeatures: ['Full Merino Leather with Alcantara Trim', 'M Carbon Bucket Seats', 'Harmon Kardon / Bowers & Wilkins Sound'],
    safetyFeatures: ['M Carbon Ceramic Brakes with Gold Calipers', 'Adaptive M Suspension Pro'],
    rating: 4.92,
    reviewCount: 33,
    featured: false,
    popular: true,
    colorName: 'Isle of Man Green Metallic'
  },

  // 18. BMW M4
  {
    id: 'bmw-m4',
    brandId: 'bmw',
    brandName: 'BMW',
    model: 'M4 Competition Coupe',
    year: 2024,
    category: 'Sports Car',
    seats: 4,
    transmission: 'Steptronic',
    fuelType: '3.0L M TwinPower Turbo Inline-6',
    dailyPrice: 850,
    deposit: 1800,
    availability: 'Available',
    heroImage: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1400&q=80',
    gallery: ['https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1400&q=80'],
    viewAngles: [{ label: 'Front M Aggression', image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1400&q=80' }],
    specs: { engine: '3.0L S58 Twin-Turbo Inline-6', horsepower: 503, topSpeed: '290 km/h', acceleration0100: '3.4s', transmission: '8-Speed M Steptronic', drivetrain: 'M xDrive AWD', fuelType: 'Premium Petrol' },
    interiorFeatures: ['M Carbon Fiber Bucket Seats', 'M Drive Buttons on Steering Wheel', 'Curved Display with M Telemetry'],
    safetyFeatures: ['M Compound Brakes', 'M Dynamic Mode (MDM)'],
    rating: 4.86,
    reviewCount: 29,
    featured: false,
    popular: true,
    colorName: 'Sao Paulo Yellow'
  },

  // 19. BMW X7
  {
    id: 'bmw-x7',
    brandId: 'bmw',
    brandName: 'BMW',
    model: 'X7 M60i Luxury SUV',
    year: 2024,
    category: 'SUV',
    seats: 7,
    transmission: 'Steptronic',
    fuelType: '4.4L TwinPower Turbo V8',
    dailyPrice: 750,
    deposit: 1600,
    availability: 'Available',
    heroImage: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1400&q=80',
    gallery: ['https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1400&q=80'],
    viewAngles: [{ label: '7-Seat Luxury', image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1400&q=80' }],
    specs: { engine: '4.4-Liter M TwinPower Turbo V8 with 48V', horsepower: 523, topSpeed: '250 km/h', acceleration0100: '4.5s', transmission: '8-Speed Steptronic Sport', drivetrain: 'xDrive AWD', fuelType: 'Mild Hybrid' },
    interiorFeatures: ['Sky Lounge Panoramic LED Roof with 15,000 Light Patterns', 'Captain Chairs in 2nd Row with Massage', 'CraftedClarity Glass Gear Selector'],
    safetyFeatures: ['Executive Drive Pro with Active Roll Stabilization', 'Parking Assistant Professional with Maneuver Assist'],
    rating: 4.88,
    reviewCount: 31,
    featured: false,
    popular: false,
    colorName: 'Dravit Grey Metallic'
  },

  // 20. BMW X5
  {
    id: 'bmw-x5',
    brandId: 'bmw',
    brandName: 'BMW',
    model: 'X5 xDrive40i M Sport',
    year: 2024,
    category: 'SUV',
    seats: 5,
    transmission: 'Steptronic',
    fuelType: '3.0L TwinPower Turbo Inline-6',
    dailyPrice: 550,
    deposit: 1200,
    availability: 'Available',
    heroImage: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1400&q=80',
    gallery: ['https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1400&q=80'],
    viewAngles: [{ label: 'Profile', image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1400&q=80' }],
    specs: { engine: '3.0L Turbo Inline-6 EQ Boost', horsepower: 375, topSpeed: '250 km/h', acceleration0100: '5.2s', transmission: '8-Speed Sport Steptronic', drivetrain: 'xDrive AWD', fuelType: 'Petrol' },
    interiorFeatures: ['Sensafin Luxury Upholstery', 'Panoramic Glass Sunroof', 'Harman Kardon Surround'],
    safetyFeatures: ['Active Driving Assistant', 'Adaptive 2-Axle Air Suspension'],
    rating: 4.8,
    reviewCount: 20,
    featured: false,
    popular: false,
    colorName: 'Carbon Black Metallic'
  },

  // 21. BMW 5 Series
  {
    id: 'bmw-5-series',
    brandId: 'bmw',
    brandName: 'BMW',
    model: '530i M Sport Sedan',
    year: 2024,
    category: 'Luxury Sedan',
    seats: 5,
    transmission: 'Steptronic',
    fuelType: '2.0L TwinPower Turbo Inline-4',
    dailyPrice: 420,
    deposit: 950,
    availability: 'Available',
    heroImage: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1400&q=80',
    gallery: ['https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1400&q=80'],
    viewAngles: [{ label: 'Front Grille', image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1400&q=80' }],
    specs: { engine: '2.0L TwinPower Turbo 4-Cylinder', horsepower: 255, topSpeed: '250 km/h', acceleration0100: '5.9s', transmission: '8-Speed Steptronic', drivetrain: 'Rear-Wheel Drive', fuelType: 'Petrol' },
    interiorFeatures: ['BMW Interaction Bar with Ambient Illumination', 'AirConsole In-Car Gaming', 'Veganza Leatherette'],
    safetyFeatures: ['Highway Assistant with Eye-Activated Lane Change', 'Surround View Cameras'],
    rating: 4.79,
    reviewCount: 19,
    featured: false,
    popular: false,
    colorName: 'Brooklyn Grey Metallic'
  },

  // 22. BMW 3 Series
  {
    id: 'bmw-3-series',
    brandId: 'bmw',
    brandName: 'BMW',
    model: '330i M Sport Gran Limousine',
    year: 2024,
    category: 'Luxury Sedan',
    seats: 5,
    transmission: 'Steptronic',
    fuelType: '2.0L TwinPower Turbo',
    dailyPrice: 320,
    deposit: 750,
    availability: 'Available',
    heroImage: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1400&q=80',
    gallery: ['https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1400&q=80'],
    viewAngles: [{ label: 'Side Stance', image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1400&q=80' }],
    specs: { engine: '2.0-Liter TwinPower Turbo 4-Cyl', horsepower: 255, topSpeed: '250 km/h', acceleration0100: '5.8s', transmission: '8-Speed Steptronic Sport', drivetrain: 'Rear-Wheel Drive', fuelType: 'Petrol' },
    interiorFeatures: ['Extended Wheelbase Rear Legroom', 'Vernasca Leather', 'Panoramic Sunroof'],
    safetyFeatures: ['Reversing Assistant', 'Active Protection System'],
    rating: 4.76,
    reviewCount: 26,
    featured: false,
    popular: false,
    colorName: 'Portimao Blue Metallic'
  },

  // 23. Porsche Taycan
  {
    id: 'porsche-taycan',
    brandId: 'porsche',
    brandName: 'Porsche',
    model: 'Taycan Turbo S',
    year: 2024,
    category: 'Supercar',
    seats: 4,
    transmission: 'Automatic',
    fuelType: 'Dual Permanent-Magnet Synchronous Electric',
    dailyPrice: 1250,
    deposit: 2600,
    availability: 'Available',
    heroImage: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1400&q=80',
    gallery: ['https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1400&q=80'],
    viewAngles: [{ label: 'Electric Supercar', image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1400&q=80' }],
    specs: { engine: 'Dual Electric Motors with 93.4 kWh Battery', horsepower: 750, topSpeed: '260 km/h', acceleration0100: '2.6s', transmission: '2-Speed Transmission on Rear Axle', drivetrain: 'All-Wheel Drive', fuelType: '100% Electric (500 km range)' },
    interiorFeatures: ['Curved 16.8-inch Digital Instrument Cluster', 'Passenger Display Screen', 'Porsche Electric Sport Sound'],
    safetyFeatures: ['Porsche Ceramic Composite Brake (PCCB)', 'Adaptive Air Suspension with Smart Lift'],
    rating: 4.94,
    reviewCount: 32,
    featured: false,
    popular: true,
    colorName: 'Frozen Blue Metallic'
  },

  // 24. Porsche Cayenne
  {
    id: 'porsche-cayenne',
    brandId: 'porsche',
    brandName: 'Porsche',
    model: 'Cayenne Turbo GT Coupe',
    year: 2024,
    category: 'SUV',
    seats: 4,
    transmission: 'Automatic',
    fuelType: '4.0L Twin-Turbo V8',
    dailyPrice: 1150,
    deposit: 2400,
    availability: 'Available',
    heroImage: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1400&q=80',
    gallery: ['https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1400&q=80'],
    viewAngles: [{ label: 'Turbo GT Stance', image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1400&q=80' }],
    specs: { engine: '4.0-Liter Twin-Turbo V8', horsepower: 650, topSpeed: '305 km/h', acceleration0100: '3.1s', transmission: '8-Speed Tiptronic S', drivetrain: 'All-Wheel Drive', fuelType: 'Premium Petrol' },
    interiorFeatures: ['Titanium Center Exhaust System', 'Alcantara Sport Seats with Neodyme Accent', 'Carbon Fiber Roof'],
    safetyFeatures: ['Ceramic Composite Brakes', 'Porsche Dynamic Chassis Control (PDCC)'],
    rating: 4.9,
    reviewCount: 38,
    featured: false,
    popular: true,
    colorName: 'Arctic Grey'
  },

  // 25. Porsche Panamera
  {
    id: 'porsche-panamera',
    brandId: 'porsche',
    brandName: 'Porsche',
    model: 'Panamera GTS Executive',
    year: 2024,
    category: 'Luxury Sedan',
    seats: 4,
    transmission: 'PDK Dual-Clutch',
    fuelType: '4.0L Twin-Turbo V8',
    dailyPrice: 980,
    deposit: 2100,
    availability: 'Available',
    heroImage: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1400&q=80',
    gallery: ['https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1400&q=80'],
    viewAngles: [{ label: 'Executive Sport Sedan', image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1400&q=80' }],
    specs: { engine: '4.0-Liter Twin-Turbo V8', horsepower: 473, topSpeed: '300 km/h', acceleration0100: '3.9s', transmission: '8-Speed Porsche Doppelkupplung (PDK)', drivetrain: 'All-Wheel Drive', fuelType: 'Premium Petrol' },
    interiorFeatures: ['4-Zone Climate Control with Rear Touch Console', 'Burmester 3D High-End Sound', 'Heated & Ventilated Sport Seats'],
    safetyFeatures: ['Porsche Active Suspension Management (PASM)', 'Night Vision Assistant'],
    rating: 4.87,
    reviewCount: 23,
    featured: false,
    popular: false,
    colorName: 'Carmine Red'
  },

  // 26. Range Rover Vogue
  {
    id: 'range-rover-vogue',
    brandId: 'range-rover',
    brandName: 'Range Rover',
    model: 'Range Rover SV Long Wheelbase (Vogue)',
    year: 2024,
    category: 'Chauffeur',
    seats: 4,
    transmission: 'Automatic',
    fuelType: '4.4L Twin-Turbo V8',
    dailyPrice: 1450,
    deposit: 3200,
    availability: 'Available',
    heroImage: 'https://images.unsplash.com/photo-1541348263662-e0c8de4259ba?auto=format&fit=crop&w=1400&q=80',
    gallery: ['https://images.unsplash.com/photo-1541348263662-e0c8de4259ba?auto=format&fit=crop&w=1400&q=80'],
    viewAngles: [{ label: 'SV Presidential Profile', image: 'https://images.unsplash.com/photo-1541348263662-e0c8de4259ba?auto=format&fit=crop&w=1400&q=80' }],
    specs: { engine: '4.4-Liter Twin-Turbo V8', horsepower: 523, topSpeed: '261 km/h', acceleration0100: '4.6s', transmission: '8-Speed Automatic', drivetrain: 'Intelligent All-Wheel Drive with All-Wheel Steer', fuelType: 'Premium Petrol' },
    interiorFeatures: ['SV Signature Suite with Electrically Deployable Club Table', 'Meridian Signature Sound with Active Noise Canceling Headrests', 'White Ceramic Interior Dials & Marquetry Inlays'],
    safetyFeatures: ['Electronic Air Suspension with Dynamic Response Pro', 'ClearSight Ground View Transparent Hood Camera'],
    rating: 4.96,
    reviewCount: 40,
    featured: true,
    popular: true,
    colorName: 'British Racing Green with Belgravia Accents'
  },

  // 27. Range Rover Sport
  {
    id: 'range-rover-sport',
    brandId: 'range-rover',
    brandName: 'Range Rover',
    model: 'Range Rover Sport SV Edition ONE',
    year: 2024,
    category: 'SUV',
    seats: 5,
    transmission: 'Automatic',
    fuelType: '4.4L Twin-Turbo Mild-Hybrid V8',
    dailyPrice: 1100,
    deposit: 2300,
    availability: 'Available',
    heroImage: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1400&q=80',
    gallery: ['https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1400&q=80'],
    viewAngles: [{ label: 'Sport SV Stance', image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1400&q=80' }],
    specs: { engine: '4.4L Twin-Turbo V8 MHEV', horsepower: 626, topSpeed: '290 km/h', acceleration0100: '3.6s', transmission: '8-Speed Automatic', drivetrain: 'All-Wheel Drive', fuelType: 'Petrol' },
    interiorFeatures: ['BASS Body and Soul Seat with Tactile Sound Wellness', 'Carbon Fiber Bonnet & Steering Paddle Accents'],
    safetyFeatures: ['World-First 6D Dynamics Hydraulic Suspension', 'Carbon Ceramic Brakes with 8-Piston Calipers'],
    rating: 4.88,
    reviewCount: 26,
    featured: false,
    popular: true,
    colorName: 'Carbon Bronze Matte'
  },

  // 28. Range Rover Velar
  {
    id: 'range-rover-velar',
    brandId: 'range-rover',
    brandName: 'Range Rover',
    model: 'Velar Dynamic HSE',
    year: 2024,
    category: 'SUV',
    seats: 5,
    transmission: 'Automatic',
    fuelType: '3.0L Turbocharged Inline-6 MHEV',
    dailyPrice: 480,
    deposit: 1100,
    availability: 'Available',
    heroImage: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1400&q=80',
    gallery: ['https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1400&q=80'],
    viewAngles: [{ label: 'Avant-Garde Velar', image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1400&q=80' }],
    specs: { engine: '3.0L Turbocharged Inline-6', horsepower: 395, topSpeed: '250 km/h', acceleration0100: '5.2s', transmission: '8-Speed Automatic', drivetrain: 'AWD with Terrain Response 2', fuelType: 'Mild Hybrid' },
    interiorFeatures: ['Flush Deployable Door Handles', 'Pivi Pro 11.4-inch Curved Glass Screen', 'Windsor Leather Seats'],
    safetyFeatures: ['3D Surround Camera System', 'Wade Sensing up to 580mm depth'],
    rating: 4.79,
    reviewCount: 18,
    featured: false,
    popular: false,
    colorName: 'Hakuba Silver'
  },

  // 29. Audi RS7
  {
    id: 'audi-rs7',
    brandId: 'audi',
    brandName: 'Audi',
    model: 'RS7 Sportback Performance',
    year: 2024,
    category: 'Sports Car',
    seats: 4,
    transmission: 'Automatic',
    fuelType: '4.0L Twin-Turbo V8',
    dailyPrice: 950,
    deposit: 2000,
    availability: 'Available',
    heroImage: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=1400&q=80',
    gallery: ['https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=1400&q=80'],
    viewAngles: [{ label: 'RS7 Widebody', image: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=1400&q=80' }],
    specs: { engine: '4.0-Liter Twin-Turbo V8 MHEV', horsepower: 621, topSpeed: '305 km/h', acceleration0100: '3.3s', transmission: '8-Speed Tiptronic', drivetrain: 'Quattro Permanent AWD with Sport Differential', fuelType: 'Premium Petrol' },
    interiorFeatures: ['Valcona Leather with Honeycomb Stitching', 'Bang & Olufsen Advanced 3D Sound 1820W', 'Audi Virtual Cockpit Plus with RS Displays'],
    safetyFeatures: ['Ceramic Brakes with Blue Calipers', 'Dynamic All-Wheel Steering', 'Night Vision Assistant'],
    rating: 4.9,
    reviewCount: 35,
    featured: false,
    popular: true,
    colorName: 'Nardo Grey'
  },

  // 30. Audi RS5
  {
    id: 'audi-rs5',
    brandId: 'audi',
    brandName: 'Audi',
    model: 'RS5 Coupe Competition',
    year: 2024,
    category: 'Sports Car',
    seats: 4,
    transmission: 'Automatic',
    fuelType: '2.9L Twin-Turbo V6',
    dailyPrice: 720,
    deposit: 1500,
    availability: 'Available',
    heroImage: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=1400&q=80',
    gallery: ['https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=1400&q=80'],
    viewAngles: [{ label: 'RS5 Stance', image: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=1400&q=80' }],
    specs: { engine: '2.9-Liter Twin-Turbo V6', horsepower: 444, topSpeed: '290 km/h', acceleration0100: '3.7s', transmission: '8-Speed Tiptronic', drivetrain: 'Quattro All-Wheel Drive', fuelType: 'Petrol' },
    interiorFeatures: ['RS Sport Seats in Fine Nappa Leather', 'Carbon Twill Interior Inlays', 'Flat-Bottom RS Alcantara Steering'],
    safetyFeatures: ['RS Sport Suspension Pro with Adjustable Coilovers', 'Matrix LED Headlights with Audi Laser Light'],
    rating: 4.82,
    reviewCount: 21,
    featured: false,
    popular: false,
    colorName: 'Tango Red Metallic'
  },

  // 31. Audi A8
  {
    id: 'audi-a8',
    brandId: 'audi',
    brandName: 'Audi',
    model: 'A8 L Horch Edition',
    year: 2024,
    category: 'Chauffeur',
    seats: 4,
    transmission: 'Automatic',
    fuelType: '3.0L Turbo V6 MHEV',
    dailyPrice: 790,
    deposit: 1700,
    availability: 'Available',
    heroImage: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=1400&q=80',
    gallery: ['https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=1400&q=80'],
    viewAngles: [{ label: 'Executive Limousine', image: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=1400&q=80' }],
    specs: { engine: '3.0-Liter TFSI V6 with 48V MHEV', horsepower: 340, topSpeed: '250 km/h', acceleration0100: '5.6s', transmission: '8-Speed Tiptronic', drivetrain: 'Quattro AWD', fuelType: 'Petrol' },
    interiorFeatures: ['Relaxation Seat with Foot Massage Unit', 'Bang & Olufsen 3D Advanced Audio 1920W with 23 Speakers', 'Rear Seat Entertainment OLED Tablets'],
    safetyFeatures: ['Predictive Active Suspension scanning road potholes', 'Audi Pre-Sense 360°'],
    rating: 4.88,
    reviewCount: 27,
    featured: false,
    popular: false,
    colorName: 'Mythos Black Metallic'
  },

  // 32. Audi Q8
  {
    id: 'audi-q8',
    brandId: 'audi',
    brandName: 'Audi',
    model: 'Q8 55 TFSI Quattro S-Line',
    year: 2024,
    category: 'SUV',
    seats: 5,
    transmission: 'Automatic',
    fuelType: '3.0L Turbo V6',
    dailyPrice: 580,
    deposit: 1300,
    availability: 'Available',
    heroImage: 'https://images.unsplash.com/photo-1541348263662-e0c8de4259ba?auto=format&fit=crop&w=1400&q=80',
    gallery: ['https://images.unsplash.com/photo-1541348263662-e0c8de4259ba?auto=format&fit=crop&w=1400&q=80'],
    viewAngles: [{ label: 'Coupe SUV Stance', image: 'https://images.unsplash.com/photo-1541348263662-e0c8de4259ba?auto=format&fit=crop&w=1400&q=80' }],
    specs: { engine: '3.0-Liter Twin-Scroll Turbo V6', horsepower: 335, topSpeed: '250 km/h', acceleration0100: '5.6s', transmission: '8-Speed Tiptronic', drivetrain: 'Quattro All-Wheel Drive', fuelType: 'Petrol' },
    interiorFeatures: ['Dual Touchscreen MMI Navigation Plus', 'Frameless Glass Doors', 'Panoramic Sunroof'],
    safetyFeatures: ['Adaptive Cruise Assist', 'Audi HD Matrix LED with Laser Technology'],
    rating: 4.8,
    reviewCount: 25,
    featured: false,
    popular: false,
    colorName: 'Daytona Grey Pearl'
  },

  // 33. Audi Q7
  {
    id: 'audi-q7',
    brandId: 'audi',
    brandName: 'Audi',
    model: 'Q7 55 TFSI 7-Seater',
    year: 2024,
    category: 'SUV',
    seats: 7,
    transmission: 'Automatic',
    fuelType: '3.0L Turbo V6',
    dailyPrice: 480,
    deposit: 1000,
    availability: 'Available',
    heroImage: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1400&q=80',
    gallery: ['https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1400&q=80'],
    viewAngles: [{ label: 'Family Luxury SUV', image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1400&q=80' }],
    specs: { engine: '3.0-Liter TFSI V6', horsepower: 335, topSpeed: '250 km/h', acceleration0100: '5.7s', transmission: '8-Speed Tiptronic', drivetrain: 'Quattro AWD', fuelType: 'Petrol' },
    interiorFeatures: ['Three-Row 7-Passenger Leather Layout', 'Electrically Folding 3rd Row', 'Bang & Olufsen 3D Sound'],
    safetyFeatures: ['Adaptive Air Suspension', 'Audi Pre-Sense Rear & Side'],
    rating: 4.77,
    reviewCount: 19,
    featured: false,
    popular: false,
    colorName: 'Glacier White'
  },

  // 34. Audi A6
  {
    id: 'audi-a6',
    brandId: 'audi',
    brandName: 'Audi',
    model: 'A6 45 TFSI Technology',
    year: 2024,
    category: 'Luxury Sedan',
    seats: 5,
    transmission: 'Automatic',
    fuelType: '2.0L Turbo Inline-4',
    dailyPrice: 350,
    deposit: 800,
    availability: 'Available',
    heroImage: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=1400&q=80',
    gallery: ['https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=1400&q=80'],
    viewAngles: [{ label: 'Business Sedan', image: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=1400&q=80' }],
    specs: { engine: '2.0-Liter TFSI 4-Cylinder', horsepower: 241, topSpeed: '250 km/h', acceleration0100: '6.7s', transmission: '7-Speed S Tronic', drivetrain: 'Front-Wheel Drive', fuelType: 'Petrol' },
    interiorFeatures: ['Audi Virtual Cockpit Plus', 'Ambient Lighting Package Plus with 30 colors', 'MMI Dual Touchscreens'],
    safetyFeatures: ['Audi Park Assist with 360 Cameras', 'Lane Departure Warning'],
    rating: 4.75,
    reviewCount: 16,
    featured: false,
    popular: false,
    colorName: 'Firmament Blue'
  },

  // 35. Audi A4
  {
    id: 'audi-a4',
    brandId: 'audi',
    brandName: 'Audi',
    model: 'A4 40 TFSI Premium Plus',
    year: 2024,
    category: 'Luxury Sedan',
    seats: 5,
    transmission: 'Automatic',
    fuelType: '2.0L Turbo Inline-4',
    dailyPrice: 280,
    deposit: 650,
    availability: 'Available',
    heroImage: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=1400&q=80',
    gallery: ['https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=1400&q=80'],
    viewAngles: [{ label: 'Compact Executive', image: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=1400&q=80' }],
    specs: { engine: '2.0-Liter TFSI Turbo', horsepower: 201, topSpeed: '240 km/h', acceleration0100: '7.1s', transmission: '7-Speed S Tronic Dual-Clutch', drivetrain: 'Front-Wheel Drive', fuelType: 'Petrol' },
    interiorFeatures: ['10.1-inch MMI Touchscreen', 'Audi Sound System', '3-Zone Deluxe Climate Control'],
    safetyFeatures: ['Cruise Control with Speed Limiter', 'Audi Pre-Sense City'],
    rating: 4.7,
    reviewCount: 14,
    featured: false,
    popular: false,
    colorName: 'Ibis White'
  },

  // 36. Maserati Ghibli
  {
    id: 'maserati-ghibli',
    brandId: 'maserati',
    brandName: 'Maserati',
    model: 'Ghibli Trofeo V8',
    year: 2024,
    category: 'Sports Car',
    seats: 4,
    transmission: 'Automatic',
    fuelType: '3.8L Twin-Turbo V8 (Ferrari Built)',
    dailyPrice: 890,
    deposit: 1900,
    availability: 'Available',
    heroImage: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1400&q=80',
    gallery: ['https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1400&q=80'],
    viewAngles: [{ label: 'Trofeo Aggression', image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1400&q=80' }],
    specs: { engine: '3.8-Liter Twin-Turbo V8 Ferrari Heritage', horsepower: 580, topSpeed: '326 km/h', acceleration0100: '4.3s', transmission: 'ZF 8-Speed Automatic', drivetrain: 'Rear-Wheel Drive with Limited Slip', fuelType: 'Premium Petrol' },
    interiorFeatures: ['Pieno Fiore Natural Leather with Trofeo Embroidery', 'Bowers & Wilkins 1280W 15-Speaker Sound', 'Carbon Fiber Twill Inlays'],
    safetyFeatures: ['Brembo Dual-Cast Brakes', 'Integrated Vehicle Control (IVC)'],
    rating: 4.83,
    reviewCount: 22,
    featured: false,
    popular: true,
    colorName: 'Blu Emozione'
  },

  // 37. Maserati Levante
  {
    id: 'maserati-levante',
    brandId: 'maserati',
    brandName: 'Maserati',
    model: 'Levante Modena S',
    year: 2024,
    category: 'SUV',
    seats: 5,
    transmission: 'Automatic',
    fuelType: '3.0L Twin-Turbo V6',
    dailyPrice: 780,
    deposit: 1650,
    availability: 'Available',
    heroImage: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1400&q=80',
    gallery: ['https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1400&q=80'],
    viewAngles: [{ label: 'Trident SUV', image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1400&q=80' }],
    specs: { engine: '3.0-Liter Twin-Turbo V6', horsepower: 424, topSpeed: '264 km/h', acceleration0100: '5.2s', transmission: '8-Speed Automatic', drivetrain: 'Q4 Intelligent All-Wheel Drive', fuelType: 'Petrol' },
    interiorFeatures: ['Ermenegildo Zegna Silk & Leather Interior', 'Panoramic Electric Sunroof', 'Sonorous Sport Exhaust Valves'],
    safetyFeatures: ['Skyhook Adaptive Air Suspension', 'Active Blind Spot Assist'],
    rating: 4.81,
    reviewCount: 17,
    featured: false,
    popular: false,
    colorName: 'Grigio Maratea'
  },

  // 38. Jaguar F-Type
  {
    id: 'jaguar-f-type',
    brandId: 'jaguar',
    brandName: 'Jaguar',
    model: 'F-Type R 75 Convertible',
    year: 2024,
    category: 'Convertible',
    seats: 2,
    transmission: 'Automatic',
    fuelType: '5.0L Supercharged V8',
    dailyPrice: 750,
    deposit: 1600,
    availability: 'Available',
    heroImage: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1400&q=80',
    gallery: ['https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1400&q=80'],
    viewAngles: [{ label: 'Roaring Roadster', image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1400&q=80' }],
    specs: { engine: '5.0-Liter Supercharged V8', horsepower: 575, topSpeed: '300 km/h', acceleration0100: '3.5s', transmission: 'Quickshift 8-Speed Automatic', drivetrain: 'All-Wheel Drive with Electronic Active Differential', fuelType: 'Premium Petrol' },
    interiorFeatures: ['Windsor Leather Performance Seats with Monogram Pattern', 'Switchable Active Sports Exhaust with Crackle Map', 'Meridian Surround Sound System'],
    safetyFeatures: ['Configurable Dynamics with Adaptive Dynamics', 'Emergency Braking with Pedestrian Sensing'],
    rating: 4.89,
    reviewCount: 28,
    featured: false,
    popular: true,
    colorName: 'British Racing Green with Tan Soft Top'
  },

  // 39. Jaguar F-Pace
  {
    id: 'jaguar-f-pace',
    brandId: 'jaguar',
    brandName: 'Jaguar',
    model: 'F-Pace SVR Edition 1988',
    year: 2024,
    category: 'SUV',
    seats: 5,
    transmission: 'Automatic',
    fuelType: '5.0L Supercharged V8',
    dailyPrice: 680,
    deposit: 1450,
    availability: 'Available',
    heroImage: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1400&q=80',
    gallery: ['https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1400&q=80'],
    viewAngles: [{ label: 'SVR Stance', image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1400&q=80' }],
    specs: { engine: '5.0-Liter Supercharged V8', horsepower: 550, topSpeed: '286 km/h', acceleration0100: '4.0s', transmission: '8-Speed Automatic', drivetrain: 'All-Wheel Drive', fuelType: 'Petrol' },
    interiorFeatures: ['Midnight Amethyst Paintwork with Sunset Gold Details', 'Pivi Pro 11.4-inch Screen', 'Semi-Aniline Leather Sport Seats'],
    safetyFeatures: ['SVR Dynamic Stability Control', '3D Surround Camera System'],
    rating: 4.82,
    reviewCount: 19,
    featured: false,
    popular: false,
    colorName: 'Midnight Amethyst Gloss'
  },

  // 40. Lexus LX
  {
    id: 'lexus-lx',
    brandId: 'lexus',
    brandName: 'Lexus',
    model: 'LX 600 VIP Executive 4-Seater',
    year: 2024,
    category: 'SUV',
    seats: 4,
    transmission: 'Automatic',
    fuelType: '3.5L Twin-Turbo V6',
    dailyPrice: 880,
    deposit: 1800,
    availability: 'Available',
    heroImage: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1400&q=80',
    gallery: ['https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1400&q=80'],
    viewAngles: [{ label: 'Spindle Grille Stance', image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1400&q=80' }],
    specs: { engine: '3.5-Liter Twin-Turbo V6', horsepower: 409, topSpeed: '210 km/h', acceleration0100: '6.9s', transmission: 'Direct-Shift 10-Speed Automatic', drivetrain: 'Full-Time 4WD with Multi-Terrain Select', fuelType: 'Petrol' },
    interiorFeatures: ['VIP Rear Captain Ottoman Seat reclining up to 48 degrees', 'Mark Levinson® 25-Speaker Reference 3D Surround Audio', 'Center Console Refrigerator & Wireless Charger'],
    safetyFeatures: ['Active Height Control (AHC) Suspension', 'Lexus Safety System+ 2.5 with Pre-Collision System'],
    rating: 4.91,
    reviewCount: 31,
    featured: false,
    popular: true,
    colorName: 'Sonic Titanium'
  },

  // 41. Lexus LS
  {
    id: 'lexus-ls',
    brandId: 'lexus',
    brandName: 'Lexus',
    model: 'LS 500h Nishijin & Kiriko Luxury',
    year: 2024,
    category: 'Luxury Sedan',
    seats: 4,
    transmission: 'Automatic',
    fuelType: '3.5L V6 Multi-Stage Hybrid',
    dailyPrice: 720,
    deposit: 1500,
    availability: 'Available',
    heroImage: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1400&q=80',
    gallery: ['https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1400&q=80'],
    viewAngles: [{ label: 'Takumi Flagship', image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1400&q=80' }],
    specs: { engine: '3.5-Liter V6 Multi-Stage Hybrid', horsepower: 354, topSpeed: '250 km/h', acceleration0100: '5.4s', transmission: 'Multi-Stage 10-Speed Hybrid Transmission', drivetrain: 'All-Wheel Drive', fuelType: 'Self-Charging Hybrid' },
    interiorFeatures: ['Hand-Pleated Nishijin Brocade & Kiriko Cut-Glass Door Ornamentation', '22-Way Power Rear Seat with Shiatsu Massage Programs', 'Whispering Acoustic Cabin with Active Noise Cancellation'],
    safetyFeatures: ['Lexus Teammate Advanced Drive & Advanced Park', 'Electronically Controlled Air Suspension'],
    rating: 4.88,
    reviewCount: 20,
    featured: false,
    popular: false,
    colorName: 'Manganese Luster'
  }
];

export const INITIAL_USERS: User[] = [
  {
    id: 'user-gaikwad',
    name: 'Shubham Gaikwad',
    email: 'gaikwadshubham6643@gmail.com',
    phone: '+91 98201 54321',
    role: 'customer',
    licenseNumber: 'MH-01-2019-0098412',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    joinedDate: '2024-03-15',
    membershipTier: 'Black Card VIP',
    totalSpend: 14200
  },
  {
    id: 'user-admin',
    name: 'Exotica Fleet Director',
    email: 'admin@exotica.com',
    phone: '+971 50 882 1900',
    role: 'admin',
    licenseNumber: 'EXO-EXEC-001',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    joinedDate: '2023-01-10',
    membershipTier: 'Black Card VIP',
    totalSpend: 0
  }
];

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'bk-1001',
    bookingReference: 'EXO-884210',
    carId: 'lamborghini-huracan',
    carName: 'Lamborghini Huracán EVO V10',
    carImage: '/src/assets/images/hero_supercar_dark_1790857698810.jpg',
    brandName: 'Lamborghini',
    userId: 'user-gaikwad',
    customerName: 'Shubham Gaikwad',
    customerEmail: 'gaikwadshubham6643@gmail.com',
    customerPhone: '+91 98201 54321',
    driverLicenseNumber: 'MH-01-2019-0098412',
    pickupLocation: 'Mumbai - Bandra Kurla Complex (BKC) Flagship Hub',
    dropoffLocation: 'Mumbai - Bandra Kurla Complex (BKC) Flagship Hub',
    pickupDate: '2026-10-10',
    returnDate: '2026-10-13',
    pickupTime: '10:00 AM',
    durationDays: 3,
    chauffeurOption: false,
    selectedServices: ['doorstep-delivery', 'vip-concierge'],
    baseDailyRate: 1650,
    baseRentalTotal: 4950,
    chauffeurTotal: 0,
    servicesTotal: 900,
    securityDeposit: 3500,
    luxuryTaxAndInsurance: 450,
    grandTotal: 9800,
    status: 'Confirmed',
    paymentStatus: 'Paid',
    specialRequests: 'Please detail exterior and prepare vehicle in Sport Corsa exhaust setup upon delivery at hotel.',
    createdAt: '2026-09-28'
  },
  {
    id: 'bk-1002',
    bookingReference: 'EXO-772911',
    carId: 'rolls-royce-ghost',
    carName: 'Rolls-Royce Ghost Extended Black Badge',
    carImage: '/src/assets/images/luxury_rolls_royce_1790857721026.jpg',
    brandName: 'Rolls-Royce',
    userId: 'user-gaikwad',
    customerName: 'Shubham Gaikwad',
    customerEmail: 'gaikwadshubham6643@gmail.com',
    customerPhone: '+91 98201 54321',
    driverLicenseNumber: 'MH-01-2019-0098412',
    pickupLocation: 'Dubai - DIFC & Downtown Marquee Center',
    dropoffLocation: 'Dubai - DIFC & Downtown Marquee Center',
    pickupDate: '2026-11-04',
    returnDate: '2026-11-06',
    pickupTime: '02:00 PM',
    durationDays: 2,
    chauffeurOption: true,
    selectedServices: ['chauffeur', 'airport-vip'],
    baseDailyRate: 2200,
    baseRentalTotal: 4400,
    chauffeurTotal: 360,
    servicesTotal: 440,
    securityDeposit: 5000,
    luxuryTaxAndInsurance: 520,
    grandTotal: 10720,
    status: 'Confirmed',
    paymentStatus: 'Paid',
    specialRequests: 'VIP private airport tarmac transfer upon Emirates flight arrival.',
    createdAt: '2026-09-25'
  }
];

export const INITIAL_PAYMENTS: Payment[] = [
  {
    id: 'pay-201',
    bookingId: 'bk-1001',
    bookingReference: 'EXO-884210',
    amount: 9800,
    method: 'Card',
    cardLast4: '4242',
    status: 'Completed',
    transactionId: 'TXN-90148102',
    date: '2026-09-28'
  },
  {
    id: 'pay-202',
    bookingId: 'bk-1002',
    bookingReference: 'EXO-772911',
    amount: 10720,
    method: 'Card',
    cardLast4: '4242',
    status: 'Completed',
    transactionId: 'TXN-88301140',
    date: '2026-09-25'
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-301',
    carId: 'lamborghini-huracan',
    carName: 'Lamborghini Huracán EVO V10',
    customerName: 'Marcus Vance',
    customerCity: 'Dubai & London',
    customerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    date: 'September 2026',
    comment: 'The V10 exhaust roar in the mountains was sensational. EXOTICA delivered the car spotless in Candolim with a full tank and personalized route suggestions. Outstanding service.',
    verifiedRental: true
  },
  {
    id: 'rev-302',
    carId: 'rolls-royce-ghost',
    carName: 'Rolls-Royce Ghost Extended',
    customerName: 'Aarav Mehta',
    customerCity: 'Mumbai',
    customerAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    date: 'August 2026',
    comment: 'Booked for an international investor summit in BKC with chauffeur. The Starlight headliner, silence, and chauffeur discretion exceeded standard five-star hospitality.',
    verifiedRental: true
  },
  {
    id: 'rev-303',
    carId: 'porsche-911',
    carName: 'Porsche 911 Carrera GTS',
    customerName: 'Elena Rostova',
    customerCity: 'Munich & Bangalore',
    customerAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    date: 'August 2026',
    comment: 'Flawless balance of mechanical purity and everyday usability. The PDK dual clutch shifts with surgical speed. Truly drove beyond ordinary.',
    verifiedRental: true
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    userId: 'user-gaikwad',
    title: 'Booking Confirmed: Lamborghini Huracán',
    message: 'Your booking EXO-884210 is verified and secured. White-glove concierge is preparing vehicle orientation.',
    date: '2 hours ago',
    read: false,
    type: 'booking'
  },
  {
    id: 'notif-2',
    userId: 'user-gaikwad',
    title: 'Black Card VIP Privilege Active',
    message: 'Complimentary champagne and zero-security deposit waiver applied to your next reservation.',
    date: '1 day ago',
    read: true,
    type: 'concierge'
  }
];
