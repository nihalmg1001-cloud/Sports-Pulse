import heroArenaImg from '../assets/images/hero_bengaluru_sports_complex_1792030417535.jpg';
import badmintonImg from '../assets/images/court_badminton_arena_1792030417770.jpg';
import footballImg from '../assets/images/court_football_turf_1792030417670.jpg';
import tennisImg from '../assets/images/court_tennis_clay_1792030418818.jpg';
import coachImg from '../assets/images/academy_training_coach_1792030419195.jpg';

export { heroArenaImg, badmintonImg, footballImg, tennisImg, coachImg };

export interface Venue {
  id: string;
  name: string;
  tagline: string;
  sports: string[];
  locality: string;
  address: string;
  distanceKm: number;
  pricePerHour: number;
  originalPricePerHour?: number;
  rating: number;
  reviewsCount: number;
  courtsCount: number;
  surfaceType: string;
  amenities: string[];
  imageUrl: string;
  operatingHours: string;
  isPopular?: boolean;
  featured?: boolean;
  slots: {
    morning: string[];
    afternoon: string[];
    evening: string[];
  };
}

export interface Coach {
  id: string;
  name: string;
  academyName: string;
  role: string;
  sport: string;
  locality: string;
  experienceYears: number;
  ageGroups: ('Junior' | 'Youth' | 'Adult')[];
  levels: ('Beginner' | 'Intermediate' | 'Advanced')[];
  monthlyFee: number;
  rating: number;
  reviewsCount: number;
  activeStudents: number;
  certifications: string[];
  highlights: string[];
  imageUrl: string;
  batchSchedule: string;
}

export interface MatchLobby {
  id: string;
  title: string;
  sport: string;
  locality: string;
  venueName: string;
  dateTime: string;
  hostName: string;
  hostAvatar: string;
  skillLevel: 'Casual / Beginner' | 'Intermediate' | 'Advanced Competitive';
  currentPlayers: number;
  maxPlayers: number;
  priceSharePerPerson: number;
  notes: string;
  isJoined?: boolean;
}

export const LOCALITIES = [
  'All Localities',
  'Yelahanka',
  'Indiranagar',
  'Koramangala',
  'Sahakar Nagar',
  'Whitefield',
  'HSR Layout',
  'Jayanagar',
  'Malleshwaram'
] as const;

export const SPORTS = [
  { id: 'all', name: 'All Sports', icon: 'Trophy' },
  { id: 'Badminton', name: 'Badminton', icon: 'Activity' },
  { id: 'Football', name: 'Football', icon: 'Flame' },
  { id: 'Tennis', name: 'Tennis', icon: 'Zap' },
  { id: 'Swimming', name: 'Swimming', icon: 'Waves' },
  { id: 'Cricket', name: 'Cricket', icon: 'Shield' },
  { id: 'Pickleball', name: 'Pickleball', icon: 'Sparkles' },
  { id: 'Basketball', name: 'Basketball', icon: 'Target' }
];

export const VENUES_DATA: Venue[] = [
  {
    id: 'pulse-arena-yelahanka',
    name: 'Velocity Sports Arena',
    tagline: 'Premier 8-court BWF synthetic complex with glare-free LED arena lighting',
    sports: ['Badminton', 'Pickleball'],
    locality: 'Yelahanka',
    address: 'BBMP Complex Road, Near Kogilu Cross, Yelahanka, Bengaluru',
    distanceKm: 2.1,
    pricePerHour: 450,
    originalPricePerHour: 600,
    rating: 4.9,
    reviewsCount: 312,
    courtsCount: 8,
    surfaceType: 'BWF Approved 5mm Teak-Cushioned Synthetic Mat',
    amenities: ['Floodlights', 'Locker Rooms', 'Showers', 'Pro Shop', 'Ample Parking', 'Drinking Water', 'Equipment Rental'],
    imageUrl: badmintonImg,
    operatingHours: '05:30 AM - 11:30 PM',
    isPopular: true,
    featured: true,
    slots: {
      morning: ['06:00 AM', '07:00 AM', '08:00 AM', '09:00 AM'],
      afternoon: ['01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'],
      evening: ['06:00 PM', '07:00 PM', '08:00 PM', '09:00 PM', '10:00 PM']
    }
  },
  {
    id: 'rooftop-turf-indiranagar',
    name: 'Apex Sky Turf & Arena',
    tagline: 'High-elevation FIFA standard 5-a-side rooftop football pitch overlooking 100ft Road',
    sports: ['Football', 'Cricket'],
    locality: 'Indiranagar',
    address: '100 Feet Road, HAL 2nd Stage, Indiranagar, Bengaluru',
    distanceKm: 4.8,
    pricePerHour: 1100,
    originalPricePerHour: 1400,
    rating: 4.8,
    reviewsCount: 428,
    courtsCount: 3,
    surfaceType: 'FIFA Quality Pro 50mm Non-Abrasive Monofilament Turf',
    amenities: ['Floodlights', 'Dressing Room', 'Live Match Streaming', 'Refreshment Lounge', 'Valet Parking', 'Football Boots on Rent'],
    imageUrl: footballImg,
    operatingHours: '05:00 AM - 01:00 AM',
    isPopular: true,
    featured: true,
    slots: {
      morning: ['06:00 AM', '07:00 AM', '08:30 AM'],
      afternoon: ['02:00 PM', '03:30 PM', '04:30 PM'],
      evening: ['06:00 PM', '07:30 PM', '09:00 PM', '10:30 PM', '11:45 PM']
    }
  },
  {
    id: 'grand-slam-tennis-koramangala',
    name: 'Grand Slam Tennis Club',
    tagline: 'US Open blue cushioned acrylic courts with automated ball machine rentals',
    sports: ['Tennis', 'Pickleball'],
    locality: 'Koramangala',
    address: '80 Feet Road, 4th Block, Koramangala, Bengaluru',
    distanceKm: 6.2,
    pricePerHour: 750,
    originalPricePerHour: 900,
    rating: 4.9,
    reviewsCount: 195,
    courtsCount: 4,
    surfaceType: 'DecoTurf 8-Layer Acrylic Hard Court',
    amenities: ['Floodlights', 'Ball Boy Support', 'Pro Coach on Call', 'Showers', 'Pro Shop', 'Parking'],
    imageUrl: tennisImg,
    operatingHours: '06:00 AM - 10:00 PM',
    isPopular: true,
    featured: true,
    slots: {
      morning: ['06:00 AM', '07:00 AM', '08:00 AM'],
      afternoon: ['03:00 PM', '04:00 PM'],
      evening: ['05:00 PM', '06:00 PM', '07:00 PM', '08:00 PM']
    }
  },
  {
    id: 'olympic-aquatics-sahakar-nagar',
    name: 'BlueZone Aquatics Center',
    tagline: 'Heated semi-Olympic 8-lane 25m swimming pool with automated ozone filtration',
    sports: ['Swimming'],
    locality: 'Sahakar Nagar',
    address: '60 Feet Road, F-Block, Sahakar Nagar, Bengaluru',
    distanceKm: 1.5,
    pricePerHour: 300,
    originalPricePerHour: 400,
    rating: 4.7,
    reviewsCount: 260,
    courtsCount: 8,
    surfaceType: 'Ozone-Purified Heated Tile Pool (Chlorine-Free)',
    amenities: ['Certified Lifeguards', 'Heated Water', 'Steam & Sauna', 'Separate Women Batches', 'Lockers & Hairdryers'],
    imageUrl: heroArenaImg,
    operatingHours: '06:00 AM - 09:30 PM',
    isPopular: false,
    featured: false,
    slots: {
      morning: ['06:00 AM', '07:00 AM', '08:00 AM', '09:00 AM'],
      afternoon: ['02:00 PM', '03:00 PM', '04:00 PM'],
      evening: ['06:00 PM', '07:00 PM', '08:00 PM']
    }
  },
  {
    id: 'whitefield-cricket-hub',
    name: 'Strikers Box Cricket & Nets',
    tagline: 'High-speed automated bowling machines with international standard astroturf pitches',
    sports: ['Cricket', 'Football'],
    locality: 'Whitefield',
    address: 'ITPL Main Road, Near Hope Farm Junction, Whitefield, Bengaluru',
    distanceKm: 11.4,
    pricePerHour: 800,
    originalPricePerHour: 1000,
    rating: 4.8,
    reviewsCount: 380,
    courtsCount: 4,
    surfaceType: 'Heavy-Density 35mm Astroturf with High Rebound Enclosure',
    amenities: ['Automated Bowling Machines', 'Full Net Enclosure', 'Speed Radar', 'Refreshment Cafe', 'Ample Parking'],
    imageUrl: footballImg,
    operatingHours: '06:00 AM - Midnight',
    isPopular: true,
    featured: false,
    slots: {
      morning: ['06:30 AM', '07:30 AM', '08:30 AM'],
      afternoon: ['01:30 PM', '03:00 PM', '04:30 PM'],
      evening: ['06:00 PM', '07:30 PM', '09:00 PM', '10:30 PM']
    }
  },
  {
    id: 'hsr-pickleball-sanctuary',
    name: 'Pulse Pickleball & Padel Hub',
    tagline: 'Dedicated tournament regulation pickleball courts with cushioned polymer deck',
    sports: ['Pickleball', 'Badminton'],
    locality: 'HSR Layout',
    address: 'Sector 2, 27th Main Road, HSR Layout, Bengaluru',
    distanceKm: 8.5,
    pricePerHour: 550,
    originalPricePerHour: 700,
    rating: 4.9,
    reviewsCount: 164,
    courtsCount: 6,
    surfaceType: 'Ultra-Flex Outdoor Polymer Tile Deck',
    amenities: ['Paddle & Ball Rental', 'Scoreboard Displays', 'Chilled Hydration Station', 'Floodlights', 'Community Lounge'],
    imageUrl: badmintonImg,
    operatingHours: '06:00 AM - 11:00 PM',
    isPopular: true,
    featured: true,
    slots: {
      morning: ['06:00 AM', '07:00 AM', '08:00 AM'],
      afternoon: ['02:00 PM', '03:00 PM', '04:00 PM'],
      evening: ['06:00 PM', '07:00 PM', '08:00 PM', '09:00 PM', '10:00 PM']
    }
  },
  {
    id: 'jayanagar-smash-badminton',
    name: 'Jayanagar Elite Badminton Club',
    tagline: 'Spacious 6-court wooden sprung badminton arena in the heart of South Bangalore',
    sports: ['Badminton'],
    locality: 'Jayanagar',
    address: '33rd Cross, 7th Block, Jayanagar, Bengaluru',
    distanceKm: 7.9,
    pricePerHour: 400,
    originalPricePerHour: 500,
    rating: 4.7,
    reviewsCount: 220,
    courtsCount: 6,
    surfaceType: 'Teak Wood Sprung Flooring with Non-Skid BWF Overlay',
    amenities: ['Floodlights', 'Wooden Flooring', 'Changing Rooms', 'Drinking Water', 'Two-Wheeler Parking'],
    imageUrl: badmintonImg,
    operatingHours: '05:00 AM - 10:30 PM',
    isPopular: false,
    featured: false,
    slots: {
      morning: ['06:00 AM', '07:00 AM', '08:00 AM', '09:00 AM'],
      afternoon: ['02:00 PM', '03:00 PM', '04:00 PM'],
      evening: ['06:00 PM', '07:00 PM', '08:00 PM', '09:00 PM']
    }
  },
  {
    id: 'malleshwaram-hoops-basketball',
    name: 'Sankey Multi-Sport Arena',
    tagline: 'FIBA standard wooden basketball court and multi-sport court beside Sankey Tank',
    sports: ['Basketball', 'Badminton', 'Tennis'],
    locality: 'Malleshwaram',
    address: '15th Cross, Near Sankey Tank, Malleshwaram, Bengaluru',
    distanceKm: 4.2,
    pricePerHour: 600,
    originalPricePerHour: 750,
    rating: 4.8,
    reviewsCount: 180,
    courtsCount: 3,
    surfaceType: 'FIBA Certified Hardwood Maple Surface',
    amenities: ['Breakaway Rims', 'Electronic Shot Clocks', 'First Aid Center', 'Spectator Bleachers', 'Parking'],
    imageUrl: tennisImg,
    operatingHours: '06:00 AM - 10:00 PM',
    isPopular: false,
    featured: false,
    slots: {
      morning: ['06:00 AM', '07:30 AM', '09:00 AM'],
      afternoon: ['03:00 PM', '04:30 PM'],
      evening: ['06:00 PM', '07:30 PM', '09:00 PM']
    }
  }
];

export const COACHES_DATA: Coach[] = [
  {
    id: 'coach-manjunath-badminton',
    name: 'Manjunath Gowda',
    academyName: 'Prakash Padukone Elite Academy Affiliate',
    role: 'Chief Badminton Coach & Ex-National Ranker',
    sport: 'Badminton',
    locality: 'Sahakar Nagar',
    experienceYears: 12,
    ageGroups: ['Junior', 'Youth', 'Adult'],
    levels: ['Beginner', 'Intermediate', 'Advanced'],
    monthlyFee: 3200,
    rating: 4.9,
    reviewsCount: 94,
    activeStudents: 48,
    certifications: ['BWF Level 2 Certified Coach', 'NIS Sports Authority of India Diploma'],
    highlights: ['Mentored 4 state under-15 medalists', 'Focus on biomechanics and footwork', 'Video analysis sessions included'],
    imageUrl: coachImg,
    batchSchedule: 'Mon, Wed, Fri · 06:30 AM & 05:00 PM'
  },
  {
    id: 'coach-ananya-tennis',
    name: 'Ananya Rao',
    academyName: 'Ace Velocity Tennis Academy',
    role: 'High-Performance Tennis Mentor',
    sport: 'Tennis',
    locality: 'Koramangala',
    experienceYears: 9,
    ageGroups: ['Junior', 'Youth', 'Adult'],
    levels: ['Beginner', 'Intermediate', 'Advanced'],
    monthlyFee: 4500,
    rating: 4.9,
    reviewsCount: 82,
    activeStudents: 34,
    certifications: ['ITF Level 2 Coach', 'PTR Professional Tennis Registry Member'],
    highlights: ['Former AITA Top 50 singles player', 'Specializes in topspin mechanics & match play', 'Personalized fitness conditioning'],
    imageUrl: coachImg,
    batchSchedule: 'Tue, Thu, Sat · 06:00 AM & 04:30 PM'
  },
  {
    id: 'coach-carlos-football',
    name: 'Carlos Fernandez & Team',
    academyName: 'Bengaluru Red Star Football Academy',
    role: 'Head Technical Director',
    sport: 'Football',
    locality: 'Indiranagar',
    experienceYears: 14,
    ageGroups: ['Junior', 'Youth'],
    levels: ['Beginner', 'Intermediate', 'Advanced'],
    monthlyFee: 2800,
    rating: 4.8,
    reviewsCount: 110,
    activeStudents: 75,
    certifications: ['AFC "A" Coaching License', 'UEFA "B" Certificate in Grassroots Tactics'],
    highlights: ['Curriculum modeled on European youth academies', 'Small-sided games & tactical positional sense', 'Weekend competitive matches'],
    imageUrl: coachImg,
    batchSchedule: 'Tue, Thu, Sat · 05:30 PM - 07:00 PM'
  },
  {
    id: 'coach-priya-swimming',
    name: 'Priya Sundaram',
    academyName: 'Dolphin Aquatics Guild',
    role: 'Senior Stroke & Endurance Specialist',
    sport: 'Swimming',
    locality: 'Yelahanka',
    experienceYears: 10,
    ageGroups: ['Junior', 'Youth', 'Adult'],
    levels: ['Beginner', 'Intermediate', 'Advanced'],
    monthlyFee: 2500,
    rating: 4.9,
    reviewsCount: 135,
    activeStudents: 60,
    certifications: ['ASCA Level 3 American Swimming Coaches Association', 'Red Cross Water Safety Instructor'],
    highlights: ['Adult fear-of-water elimination master', 'Individual underwater stroke correction', 'Safe heated ozone pool facility'],
    imageUrl: coachImg,
    batchSchedule: 'Mon to Fri · 06:00 AM & 06:30 PM'
  },
  {
    id: 'coach-vikram-cricket',
    name: 'Vikram Joshi',
    academyName: 'Karnataka Rising Stars Cricket Clinic',
    role: 'Bowling & Power-Hitting Coach',
    sport: 'Cricket',
    locality: 'Whitefield',
    experienceYears: 15,
    ageGroups: ['Junior', 'Youth'],
    levels: ['Intermediate', 'Advanced'],
    monthlyFee: 3500,
    rating: 4.8,
    reviewsCount: 78,
    activeStudents: 52,
    certifications: ['BCCI Level 1 Certified', 'Former Ranji Trophy Squad Member'],
    highlights: ['Bowling machine drills against pace & spin', 'Match simulations on natural turf wickets', 'Mental toughness conditioning'],
    imageUrl: coachImg,
    batchSchedule: 'Wed, Fri, Sun · 04:00 PM - 06:30 PM'
  },
  {
    id: 'coach-nikhil-pickleball',
    name: 'Nikhil Kashyap',
    academyName: 'Bengaluru Pickleball Collective',
    role: 'Pickleball Lead Instructor & Tournament Director',
    sport: 'Pickleball',
    locality: 'HSR Layout',
    experienceYears: 6,
    ageGroups: ['Youth', 'Adult'],
    levels: ['Beginner', 'Intermediate'],
    monthlyFee: 2200,
    rating: 4.9,
    reviewsCount: 64,
    activeStudents: 40,
    certifications: ['IPTP Professional Certified Pickleball Coach', 'All India Pickleball Association Official'],
    highlights: ['Learn dinking, third-shot drops & kitchen rules', 'Fun high-cardio adult fitness sessions', 'Paddle demo try-outs included'],
    imageUrl: coachImg,
    batchSchedule: 'Sat & Sun · 07:00 AM - 09:00 AM'
  }
];

export const MATCH_LOBBIES_DATA: MatchLobby[] = [
  {
    id: 'lobby-1',
    title: '5v5 Rooftop Football · Fast Pace',
    sport: 'Football',
    locality: 'Indiranagar',
    venueName: 'Apex Sky Turf & Arena',
    dateTime: 'Tonight · 08:30 PM - 09:30 PM',
    hostName: 'Aditya Shenoy',
    hostAvatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Aditya',
    skillLevel: 'Intermediate',
    currentPlayers: 8,
    maxPlayers: 10,
    priceSharePerPerson: 120,
    notes: 'Need 2 solid midfield or striker players. Bibs and match balls provided. Please wear turf shoes only (no metal studs).'
  },
  {
    id: 'lobby-2',
    title: 'Badminton Doubles Matchup (Level B/C)',
    sport: 'Badminton',
    locality: 'Sahakar Nagar',
    venueName: 'Velocity Sports Arena (Court 3)',
    dateTime: 'Tomorrow · 07:00 AM - 08:30 AM',
    hostName: 'Dr. Rohan Murthy',
    hostAvatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Rohan',
    skillLevel: 'Intermediate',
    currentPlayers: 3,
    maxPlayers: 4,
    priceSharePerPerson: 160,
    notes: 'Looking for 1 doubles partner for 1.5 hours of rally games. Yonex Mavis 350 shuttles used.'
  },
  {
    id: 'lobby-3',
    title: 'Weekend Morning Pickleball Social Round-Robin',
    sport: 'Pickleball',
    locality: 'HSR Layout',
    venueName: 'Pulse Pickleball & Padel Hub',
    dateTime: 'Saturday · 07:30 AM - 09:30 AM',
    hostName: 'Kavita Nair',
    hostAvatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Kavita',
    skillLevel: 'Casual / Beginner',
    currentPlayers: 5,
    maxPlayers: 8,
    priceSharePerPerson: 180,
    notes: 'Friendly rotating doubles mixer. Great for newcomers and recreational players! Spare paddles available if you need one.'
  },
  {
    id: 'lobby-4',
    title: 'Tennis Rally & Set Play (Hard Court)',
    sport: 'Tennis',
    locality: 'Koramangala',
    venueName: 'Grand Slam Tennis Club (Court 2)',
    dateTime: 'Sunday · 06:30 AM - 08:00 AM',
    hostName: 'Tanvi Agarwal',
    hostAvatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Tanvi',
    skillLevel: 'Advanced Competitive',
    currentPlayers: 1,
    maxPlayers: 2,
    priceSharePerPerson: 375,
    notes: 'Looking for an AITA rated or solid NTRP 4.0+ player for 2 competitive sets. Fresh can of Wilson US Open balls ready.'
  },
  {
    id: 'lobby-5',
    title: 'Box Cricket 8-a-Side Match & Under-Arm Bowling',
    sport: 'Cricket',
    locality: 'Whitefield',
    venueName: 'Strikers Box Cricket & Nets',
    dateTime: 'Friday · 09:00 PM - 11:00 PM',
    hostName: 'Prateek Jain',
    hostAvatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Prateek',
    skillLevel: 'Casual / Beginner',
    currentPlayers: 12,
    maxPlayers: 16,
    priceSharePerPerson: 110,
    notes: 'Office group friendly match. Heavy tennis ball, quick boundaries, chill vibes. All skill levels welcome.'
  }
];
