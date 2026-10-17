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
  },
  {
    id: 'coach-sharath-athletics',
    name: 'Sharath Kumar',
    academyName: 'Stride Elite Athletics & Track Guild',
    role: 'Head Athletics & Sprint/Endurance Coach',
    sport: 'Athletics',
    locality: 'Hebbal',
    experienceYears: 11,
    ageGroups: ['Junior', 'Youth', 'Adult'],
    levels: ['Beginner', 'Intermediate', 'Advanced'],
    monthlyFee: 2600,
    rating: 4.9,
    reviewsCount: 76,
    activeStudents: 45,
    certifications: ['AFI Level 2 Certified Coach', 'World Athletics Continuous Education Diploma'],
    highlights: ['Gait analysis & stride cadence tuning', 'Targeted 5K/10K & half marathon pacing plans', 'Injury prevention strength conditioning'],
    imageUrl: coachImg,
    batchSchedule: 'Mon, Wed, Fri · 06:00 AM - 07:30 AM'
  },
  {
    id: 'coach-rajesh-cricket',
    name: 'Rajesh Rao',
    academyName: 'Malleshwaram Premier Cricket Academy',
    role: 'Batting & All-Round Development Coach',
    sport: 'Cricket',
    locality: 'Malleshwaram',
    experienceYears: 13,
    ageGroups: ['Junior', 'Youth', 'Adult'],
    levels: ['Beginner', 'Intermediate', 'Advanced'],
    monthlyFee: 3000,
    rating: 4.8,
    reviewsCount: 92,
    activeStudents: 58,
    certifications: ['BCCI Level 2 Coach', 'Former State Ranji Player'],
    highlights: ['Straight-bat fundamentals & backfoot punch', 'Turf net practice with bowling machines', 'Junior & adult beginner batches available'],
    imageUrl: coachImg,
    batchSchedule: 'Tue, Thu, Sat · 04:30 PM - 06:30 PM'
  },
  {
    id: 'coach-sneha-tennis',
    name: 'Sneha Kulkarni',
    academyName: 'North Bengaluru Tennis Guild',
    role: 'Head Tennis Professional',
    sport: 'Tennis',
    locality: 'Sahakar Nagar',
    experienceYears: 8,
    ageGroups: ['Junior', 'Youth', 'Adult'],
    levels: ['Beginner', 'Intermediate', 'Advanced'],
    monthlyFee: 4000,
    rating: 4.9,
    reviewsCount: 68,
    activeStudents: 36,
    certifications: ['ITF Level 1 Coach', 'PTR Certified Instructor'],
    highlights: ['Topspin biomechanics & rally consistency', 'Personalized adult beginner & intermediate clinics', 'Dedicated clay and hard court sessions'],
    imageUrl: coachImg,
    batchSchedule: 'Mon, Wed, Fri · 07:00 AM & 05:00 PM'
  },
  {
    id: 'coach-deepak-swimming',
    name: 'Deepak Hegde',
    academyName: 'AquaSplash Swim Academy',
    role: 'Aquatic Director & Stroke Specialist',
    sport: 'Swimming',
    locality: 'Hebbal',
    experienceYears: 12,
    ageGroups: ['Junior', 'Youth', 'Adult'],
    levels: ['Beginner', 'Intermediate', 'Advanced'],
    monthlyFee: 2800,
    rating: 4.9,
    reviewsCount: 114,
    activeStudents: 64,
    certifications: ['ASCA Level 2 Certified', 'FINA Registered Coach'],
    highlights: ['Adult water confidence & fear elimination', 'Bilateral freestyle breathing & flip-turn drills', 'Heated 25m semi-indoor pool'],
    imageUrl: coachImg,
    batchSchedule: 'Tue to Sun · 06:30 AM & 06:00 PM'
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

export interface SportRecommendation {
  id: string;
  rank: number;
  title: string;
  sport: string;
  shortSummary: string;
  estimatedFirstMonthCost: number;
  estimatedFirstMonthText: string;
  suitabilityTags: {
    text: string;
    type: 'positive' | 'warning' | 'info';
  }[];
  fitnessConfidence: 'Gentle' | 'Moderate' | 'High Intensity';
  budgetCategory: 'Under ₹4,000' | '₹4,000 - ₹8,000' | '₹8,000+';
  playFormat: 'Solo' | 'Pairs' | 'Team';
  imageUrl: string;
  courtType: string;
  learningCurve: 'Fast (1-2 weeks)' | 'Moderate (2-4 weeks)' | 'Technical (1-2 months)';
  caloriesPerHour: number;
  gearEssentials: string[];
}

export const SPORT_FINDER_DATA: SportRecommendation[] = [
  {
    id: 'rec-badminton',
    rank: 1,
    title: 'Badminton',
    sport: 'Badminton',
    shortSummary: 'High-energy indoor racquet sport with exceptional court density across Bengaluru. Perfect balance of agility, tactical fun, and weather-proof play.',
    estimatedFirstMonthCost: 5800,
    estimatedFirstMonthText: 'Estimated first month ₹5,800',
    suitabilityTags: [
      { text: '✓ Matches beginner & intermediate fitness confidence', type: 'positive' },
      { text: '✓ 40+ verified BWF indoor courts in Bengaluru', type: 'positive' },
      { text: '! Prime evening slots (7-9 PM) book out 2 days early', type: 'warning' },
      { text: '✓ Low gear barrier to entry', type: 'info' }
    ],
    fitnessConfidence: 'Moderate',
    budgetCategory: '₹4,000 - ₹8,000',
    playFormat: 'Pairs',
    imageUrl: badmintonImg,
    courtType: 'Indoor BWF Teak Sprung & Synthetic Cushion',
    learningCurve: 'Fast (1-2 weeks)',
    caloriesPerHour: 450,
    gearEssentials: ['Non-marking gum sole shoes', 'Even-balance graphite racquet', 'Nylon shuttles (Yonex Mavis 350)']
  },
  {
    id: 'rec-swimming',
    rank: 2,
    title: 'Swimming',
    sport: 'Swimming',
    shortSummary: 'Zero-impact full-body cardiovascular workout. Great for low back health, stamina conditioning, and beating the afternoon heat in Bengaluru.',
    estimatedFirstMonthCost: 4500,
    estimatedFirstMonthText: 'Estimated first month ₹4,500',
    suitabilityTags: [
      { text: '✓ Matches gentle & low-impact joint recovery', type: 'positive' },
      { text: '✓ Heated ozone semi-Olympic pools in North BLR', type: 'positive' },
      { text: '✓ Certified ASCA stroke coaches available', type: 'info' },
      { text: '! Requires initial comfort in deep water', type: 'warning' }
    ],
    fitnessConfidence: 'Gentle',
    budgetCategory: '₹4,000 - ₹8,000',
    playFormat: 'Solo',
    imageUrl: heroArenaImg,
    courtType: '25m / 50m Ozone Temperature-Controlled Pools',
    learningCurve: 'Moderate (2-4 weeks)',
    caloriesPerHour: 520,
    gearEssentials: ['Anti-fog silicone goggles', 'Silicone swim cap', 'Quick-dry microfiber towel']
  },
  {
    id: 'rec-pickleball',
    rank: 3,
    title: 'Pickleball',
    sport: 'Pickleball',
    shortSummary: 'The fastest-growing community sport globally and across Bengaluru. Smaller courts, slower perforated plastic ball, and intuitive underarm serves make rallies instant.',
    estimatedFirstMonthCost: 3800,
    estimatedFirstMonthText: 'Estimated first month ₹3,800',
    suitabilityTags: [
      { text: '✓ Easiest learning curve for all age groups', type: 'positive' },
      { text: '✓ Matches beginner fitness confidence', type: 'positive' },
      { text: '✓ Rapidly growing social match lobbies in HSR & Indiranagar', type: 'positive' },
      { text: '! Fewer dedicated courts than badminton', type: 'warning' }
    ],
    fitnessConfidence: 'Gentle',
    budgetCategory: 'Under ₹4,000',
    playFormat: 'Pairs',
    imageUrl: badmintonImg,
    courtType: 'Polymer Modular Deck & Cushioned Acrylic',
    learningCurve: 'Fast (1-2 weeks)',
    caloriesPerHour: 380,
    gearEssentials: ['Polymer honeycomb core paddle', 'Outdoor pickleballs (Dura Fast 40)', 'Court sneakers']
  },
  {
    id: 'rec-football',
    rank: 4,
    title: '5v5 Rooftop Football',
    sport: 'Football',
    shortSummary: 'Fast-paced small-sided football on high-grade artificial turf. Fantastic camaraderie, team tactics, and high calorie burn under evening floodlights.',
    estimatedFirstMonthCost: 3200,
    estimatedFirstMonthText: 'Estimated first month ₹3,200',
    suitabilityTags: [
      { text: '✓ Extremely cost-effective with 10-player split (~₹120/game)', type: 'positive' },
      { text: '✓ High social community and weekly pickup lobbies', type: 'positive' },
      { text: '! Requires higher sprint endurance & agility', type: 'warning' },
      { text: '✓ Rooftop floodlit arenas with city skyline views', type: 'info' }
    ],
    fitnessConfidence: 'High Intensity',
    budgetCategory: 'Under ₹4,000',
    playFormat: 'Team',
    imageUrl: footballImg,
    courtType: '50mm Monofilament FIFA Quality Pro Turf',
    learningCurve: 'Fast (1-2 weeks)',
    caloriesPerHour: 620,
    gearEssentials: ['Turf shoes with rubber studs (no metal)', 'Shin guards', 'Breathable moisture-wicking kit']
  },
  {
    id: 'rec-tennis',
    rank: 5,
    title: 'Tennis',
    sport: 'Tennis',
    shortSummary: 'Classic racquet sport delivering complete athletic conditioning. Outstanding clubs in Koramangala and Malleshwaram featuring hard and clay court options.',
    estimatedFirstMonthCost: 8400,
    estimatedFirstMonthText: 'Estimated first month ₹8,400',
    suitabilityTags: [
      { text: '! Estimated cost is above casual budget (coach + court)', type: 'warning' },
      { text: '✓ Elite club infrastructure & automated ball machines', type: 'positive' },
      { text: '✓ Technical mastery and competitive satisfaction', type: 'info' },
      { text: '! Demands solid baseline technique practice', type: 'warning' }
    ],
    fitnessConfidence: 'High Intensity',
    budgetCategory: '₹8,000+',
    playFormat: 'Pairs',
    imageUrl: tennisImg,
    courtType: 'DecoTurf Acrylic Hard Court & Red Clay',
    learningCurve: 'Technical (1-2 months)',
    caloriesPerHour: 580,
    gearEssentials: ['100 sq inch graphite tennis racquet', 'Can of pressure-sealed tournament balls', 'Herringbone tread tennis shoes']
  },
  {
    id: 'rec-basketball',
    rank: 6,
    title: 'Basketball',
    sport: 'Basketball',
    shortSummary: 'High-octane court action focusing on vertical jump power, tactical spacing, dribbling handles, and cardiovascular endurance.',
    estimatedFirstMonthCost: 3500,
    estimatedFirstMonthText: 'Estimated first month ₹3,500',
    suitabilityTags: [
      { text: '✓ Matches moderate & high intensity fitness confidence', type: 'positive' },
      { text: '✓ Hardwood maple courts available at Sankey & Malleshwaram', type: 'positive' },
      { text: '! Requires ankle support and landing mechanics', type: 'warning' },
      { text: '✓ Easy pickup 3v3 half-court culture', type: 'info' }
    ],
    fitnessConfidence: 'High Intensity',
    budgetCategory: 'Under ₹4,000',
    playFormat: 'Team',
    imageUrl: tennisImg,
    courtType: 'FIBA Hardwood Maple & Cushioned Polymer Courts',
    learningCurve: 'Moderate (2-4 weeks)',
    caloriesPerHour: 560,
    gearEssentials: ['High-top basketball shoes with ankle support', 'Size 7 composite leather basketball', 'Knee pads & compression gear']
  },
  {
    id: 'rec-running',
    rank: 7,
    title: 'Road & Trail Running',
    sport: 'Running',
    shortSummary: 'The purest endurance builder with an iconic Bengaluru culture at Cubbon Park and Lalbagh. Highly accessible with zero court fee barriers.',
    estimatedFirstMonthCost: 2400,
    estimatedFirstMonthText: 'Estimated first month ₹2,400',
    suitabilityTags: [
      { text: '✓ Zero court booking fees needed', type: 'positive' },
      { text: '✓ Thriving Bengaluru running communities (Jayanagar, Indiranagar)', type: 'positive' },
      { text: '! Requires cushioned shoes to avoid shin splints', type: 'warning' },
      { text: '✓ Ideal for progressive 5K / 10K goal setting', type: 'info' }
    ],
    fitnessConfidence: 'Moderate',
    budgetCategory: 'Under ₹4,000',
    playFormat: 'Solo',
    imageUrl: heroArenaImg,
    courtType: 'Cubbon Park Botanical Loops & Synthetic Running Tracks',
    learningCurve: 'Fast (1-2 weeks)',
    caloriesPerHour: 600,
    gearEssentials: ['Cushioned running shoes (neutral or stability)', 'GPS running app or sports watch', 'Breathable anti-chafe socks']
  },
  {
    id: 'rec-cycling',
    rank: 8,
    title: 'Cycling & Weekend Gran Fondos',
    sport: 'Cycling',
    shortSummary: 'Explore the scenic routes of Bengaluru, from Nandi Hills to airport road sprints. Low joint impact with phenomenal leg endurance and cardiovascular output.',
    estimatedFirstMonthCost: 7500,
    estimatedFirstMonthText: 'Estimated first month ₹7,500',
    suitabilityTags: [
      { text: '✓ Low joint impact with exceptional cardio capacity', type: 'positive' },
      { text: '✓ Great Sunday morning community pelotons', type: 'positive' },
      { text: '! Initial bike purchase or rental gear investment', type: 'warning' },
      { text: '✓ Excellent for weekend exploring outside city traffic', type: 'info' }
    ],
    fitnessConfidence: 'Moderate',
    budgetCategory: '₹4,000 - ₹8,000',
    playFormat: 'Solo',
    imageUrl: heroArenaImg,
    courtType: 'Paved Highway Loops, Green Belts & Velodromes',
    learningCurve: 'Fast (1-2 weeks)',
    caloriesPerHour: 500,
    gearEssentials: ['Hybrid or road bicycle (rental or owned)', 'Certified CPSC cycling helmet', 'Padded cycling shorts & front/rear LED lights']
  },
  {
    id: 'rec-yoga',
    rank: 9,
    title: 'Athletic Yoga & Mobility',
    sport: 'Yoga',
    shortSummary: 'Holistic mind-body conditioning that improves core stability, joint mobility, injury resilience, and mental focus for athletes of all sports.',
    estimatedFirstMonthCost: 2200,
    estimatedFirstMonthText: 'Estimated first month ₹2,200',
    suitabilityTags: [
      { text: '✓ Matches gentle & restorative fitness confidence', type: 'positive' },
      { text: '✓ Eliminates lower back stiffness & enhances flexibility', type: 'positive' },
      { text: '✓ Low equipment footprint and tranquil studio spaces', type: 'positive' },
      { text: '✓ Perfect complement to badminton, football or running', type: 'info' }
    ],
    fitnessConfidence: 'Gentle',
    budgetCategory: 'Under ₹4,000',
    playFormat: 'Solo',
    imageUrl: heroArenaImg,
    courtType: 'Wooden Studio Floors & Outdoor Park Greenery',
    learningCurve: 'Fast (1-2 weeks)',
    caloriesPerHour: 280,
    gearEssentials: ['High-density 6mm non-slip yoga mat', 'Yoga cork blocks & strap', 'Stretchable cotton activewear']
  },
  {
    id: 'rec-cricket',
    rank: 10,
    title: 'Box Cricket & Nets',
    sport: 'Cricket',
    shortSummary: 'India\'s heartbeat adapted for rapid city play. Enclosed astroturf box pitches with automated bowling speed machines in Whitefield and Indiranagar.',
    estimatedFirstMonthCost: 2800,
    estimatedFirstMonthText: 'Estimated first month ₹2,800',
    suitabilityTags: [
      { text: '✓ Lowest cost barrier per person in team play', type: 'positive' },
      { text: '✓ Instant fun with office and neighborhood friends', type: 'positive' },
      { text: '✓ Heavy tennis ball play (minimal protective gear needed)', type: 'info' }
    ],
    fitnessConfidence: 'Moderate',
    budgetCategory: 'Under ₹4,000',
    playFormat: 'Team',
    imageUrl: footballImg,
    courtType: 'Enclosed Astroturf Pitches with Rebound Netting',
    learningCurve: 'Fast (1-2 weeks)',
    caloriesPerHour: 350,
    gearEssentials: ['Kashmir willow tennis-ball bat', 'Heavy tennis balls', 'Supportive cross trainers']
  }
];

export interface StarterPlanWeek {
  weekNumber: number;
  title: string;
  focus: string;
  tasks: {
    id: string;
    text: string;
    subtext: string;
    completed: boolean;
  }[];
  coachingTip: string;
  reflectionPrompt: string;
}

export interface StarterPlan {
  sport: string;
  tagline: string;
  totalWeeks: number;
  estimatedWeeklyHours: string;
  weeks: StarterPlanWeek[];
  equipmentList: {
    name: string;
    required: boolean;
    notes: string;
    checked: boolean;
  }[];
}

export const STARTER_PLANS: Record<string, StarterPlan> = {
  Badminton: {
    sport: 'Badminton',
    tagline: 'From your first court booking to confident doubles rally play in 4 weeks.',
    totalWeeks: 4,
    estimatedWeeklyHours: '2.5 - 3 hours / week',
    weeks: [
      {
        weekNumber: 1,
        title: 'Arrive & Explore',
        focus: 'Get comfortable with the court environment, shoe grip, and relaxed racquet hold.',
        tasks: [
          { id: 'w1-t1', text: 'Book your first non-marking court session', subtext: 'Pick an off-peak morning or afternoon slot at Velocity Arena or local club.', completed: false },
          { id: 'w1-t2', text: 'Equip gum-sole shoes & basic graphite racquet', subtext: 'Ensure non-marking soles to protect the synthetic BWF court mats.', completed: false },
          { id: 'w1-t3', text: 'Practice relaxed basic forehand & backhand grip', subtext: 'Hold the racquet handle like a loose handshake — avoid a clenched fist.', completed: false },
          { id: 'w1-t4', text: 'Log 45 minutes of cooperative rally time', subtext: 'Aim for continuous 10-shot cooperative rallies with a friend.', completed: false }
        ],
        coachingTip: 'Do not worry about power smashes this week. 80% of badminton consistency comes from relaxed wrist cocking and soft footwork split-steps.',
        reflectionPrompt: 'How did your wrists and ankles feel after your first 45-minute court session?'
      },
      {
        weekNumber: 2,
        title: 'Build the Basics',
        focus: 'Understand court boundary lines, legal underarm serves, and overhead clears.',
        tasks: [
          { id: 'w2-t1', text: 'Learn singles vs doubles legal service lines', subtext: 'Doubles: short & wide service box; Singles: long & narrow.', completed: false },
          { id: 'w2-t2', text: 'Drill 30 legal high & low backhand serves', subtext: 'Keep shuttle contact below 1.15m waist line.', completed: false },
          { id: 'w2-t3', text: 'Execute cross-court overhead clears', subtext: 'Push the shuttle to the back 2 feet of your opponent court.', completed: false },
          { id: 'w2-t4', text: 'Complete a dynamic 10-minute ankle/knee warm-up', subtext: 'Lunge steps, side shuffles, and calf raises before stepping on court.', completed: false }
        ],
        coachingTip: 'Split-step just as your opponent contacts the shuttlecock. This gives you a spring-loaded push in any direction.',
        reflectionPrompt: 'What percentage of your serves landed in the legal service zone during drills?'
      },
      {
        weekNumber: 3,
        title: 'Find Your Rhythm',
        focus: 'Introduce front-court drop shots, net taps, and doubles court rotation.',
        tasks: [
          { id: 'w3-t1', text: 'Practice soft sliced drop shots from the rear court', subtext: 'Deceive opponent by mimicking clear swing but decelerating at contact.', completed: false },
          { id: 'w3-t2', text: 'Play 3 practice sets to 15 points with a partner', subtext: 'Rotate attack (front-and-back) and defense (side-by-side).', completed: false },
          { id: 'w3-t3', text: 'Join or inspect a casual match lobby on Matchmaker', subtext: 'Connect with a Bengaluru player at intermediate/casual level.', completed: false },
          { id: 'w3-t4', text: 'Incorporate 15 minutes of cool-down stretching', subtext: 'Focus on hamstrings, calves, and rotator cuff mobility.', completed: false }
        ],
        coachingTip: 'In doubles, communicate loudly with "Mine!" or "Yours!" before high center shuttles drop between you and your partner.',
        reflectionPrompt: 'How confident did you feel calling shots with your partner during doubles rallies?'
      },
      {
        weekNumber: 4,
        title: 'First Friendly Match & Benchmark',
        focus: 'Play full BWF 21-point competitive games and celebrate your consistency milestone.',
        tasks: [
          { id: 'w4-t1', text: 'Play a standard best-of-3 sets (21 points) friendly match', subtext: 'Apply tournament scoring: rally point system with deuce rules.', completed: false },
          { id: 'w4-t2', text: 'Count your unforced error rate in rally play', subtext: 'Notice improvement in footwork recovery compared to Week 1.', completed: false },
          { id: 'w4-t3', text: 'Book next month’s recurring weekly slot or coach batch', subtext: 'Lock in your preferred Bengaluru time slot before it books out.', completed: false },
          { id: 'w4-t4', text: 'Celebrate completion of your 4-Week Starter Plan!', subtext: 'You now possess the foundational fitness & technique to play regularly.', completed: false }
        ],
        coachingTip: 'Consistency beats raw power every single time. Keep the shuttlecock in play and let opponents make errors on low-percentage shots.',
        reflectionPrompt: 'What is your biggest personal win from 4 weeks of consistent court play?'
      }
    ],
    equipmentList: [
      { name: 'Non-marking gum-sole badminton shoes', required: true, notes: 'Mandatory at all indoor Bengaluru BWF courts', checked: true },
      { name: 'Isometric graphite racquet (82-85g, 4U weight)', required: true, notes: 'Yonex Nanoflare, Astrox, or Li-Ning beginner models', checked: true },
      { name: 'Nylon shuttlecock tube (Yonex Mavis 350 yellow)', required: true, notes: 'Durable for practice sessions', checked: false },
      { name: 'Cotton wristbands & replacement grip tape', required: false, notes: 'Helps with palm sweat during high-intensity games', checked: false },
      { name: '1L insulated water bottle + electrolytes', required: true, notes: 'Hydration is crucial for 60-min indoor sessions', checked: false }
    ]
  },
  Swimming: {
    sport: 'Swimming',
    tagline: 'Gentle, zero-impact endurance: from water comfort to continuous 500m laps.',
    totalWeeks: 4,
    estimatedWeeklyHours: '2 hours / week',
    weeks: [
      {
        weekNumber: 1,
        title: 'Arrive & Explore',
        focus: 'Acclimatize to the pool, rhythmic breathing, and relaxed buoyancy balance.',
        tasks: [
          { id: 'sw1-t1', text: 'Book lane slot at BlueZone Aquatics or ozone pool', subtext: 'Choose early morning or warm afternoon timing.', completed: false },
          { id: 'sw1-t2', text: 'Fit anti-fog silicone goggles & snug swim cap', subtext: 'Prevents eye sting and reduces hair drag.', completed: false },
          { id: 'sw1-t3', text: 'Practice submerged bubble blowing & side inhalation', subtext: 'Breathe out underwater through nose, breathe in quickly through mouth.', completed: false },
          { id: 'sw1-t4', text: 'Complete 10x gentle push-and-glide from pool wall', subtext: 'Streamline arms overhead in arrow position.', completed: false }
        ],
        coachingTip: 'Relax your neck and gaze straight down at the pool tile line, not forward. Looking forward makes your hips and legs sink.',
        reflectionPrompt: 'Did you feel comfortable keeping your face fully submerged while breathing out bubbles?'
      },
      {
        weekNumber: 2,
        title: 'Build the Basics',
        focus: 'Kickboard propulsion drills and freestyle arm rotation mechanics.',
        tasks: [
          { id: 'sw2-t1', text: 'Do 8x 25m flutter kick with kickboard', subtext: 'Kick from your hips with relaxed floppy ankles, not bent knees.', completed: false },
          { id: 'sw2-t2', text: 'Practice high-elbow freestyle catch & pull', subtext: 'Fingertips enter water first, pulling water back toward your hip.', completed: false },
          { id: 'sw2-t3', text: 'Integrate bilateral breathing (every 3 strokes)', subtext: 'Ensures symmetrical stroke balance and neck comfort.', completed: false },
          { id: 'sw2-t4', text: 'Log 200m total accumulated yardage in a session', subtext: 'Take 30-second rests at the wall between 25m lengths.', completed: false }
        ],
        coachingTip: 'Think of pushing the water behind you rather than slapping the surface.',
        reflectionPrompt: 'Which side felt more natural when practicing bilateral breathing?'
      },
      {
        weekNumber: 3,
        title: 'Find Your Rhythm',
        focus: 'Introduce breaststroke or backstroke recovery laps and longer continuous intervals.',
        tasks: [
          { id: 'sw3-t1', text: 'Swim 4x 50m continuous freestyle lengths', subtext: 'Maintain steady pacing without gasping for breath at the turn.', completed: false },
          { id: 'sw3-t2', text: 'Learn relaxed backstroke recovery breathing', subtext: 'Great for opening up your chest and catching breath.', completed: false },
          { id: 'sw3-t3', text: 'Consult with poolside coach for quick stroke check', subtext: 'Ensure hip alignment is horizontal.', completed: false },
          { id: 'sw3-t4', text: 'Complete a 350m cumulative endurance workout', subtext: 'Rest interval reduced to 15-20 seconds.', completed: false }
        ],
        coachingTip: 'Rotate your torso like a rotisserie skewer with each arm stroke — do not swim flat on your belly.',
        reflectionPrompt: 'How did your lung capacity feel during the continuous 50m laps?'
      },
      {
        weekNumber: 4,
        title: 'Milestone 500m Benchmark',
        focus: 'Continuous lap stamina and establishing your ongoing fitness routine.',
        tasks: [
          { id: 'sw4-t1', text: 'Complete 500m total continuous workout', subtext: 'e.g. 5x 100m sets with short controlled rests.', completed: false },
          { id: 'sw4-t2', text: 'Track your 100m benchmark time without fatigue', subtext: 'Record baseline pace for future fitness tracking.', completed: false },
          { id: 'sw4-t3', text: 'Sign up for monthly pool pass or structured batch', subtext: 'Save 25% with 30-day recurring aquatic membership.', completed: false },
          { id: 'sw4-t4', text: 'Celebrate completing your 4-week swimming starter!', subtext: 'Your lung capacity and cardio endurance have officially leveled up.', completed: false }
        ],
        coachingTip: 'Consistent 30-minute swim sessions 2-3 times per week deliver more cardiovascular gains than one exhausting long weekend swim.',
        reflectionPrompt: 'How has your overall energy and posture improved over these 4 weeks?'
      }
    ],
    equipmentList: [
      { name: 'Anti-fog UV protection swim goggles', required: true, notes: 'Speedo or Arena training goggles', checked: true },
      { name: 'Silicone swim cap', required: true, notes: 'Protects hair from chlorine and keeps hair out of face', checked: true },
      { name: 'Training kickboard', required: false, notes: 'Usually provided free at BlueZone Aquatics', checked: false },
      { name: 'Chlorine-removal body wash & shampoo', required: false, notes: 'Keeps skin moisturized after swimming', checked: false }
    ]
  },
  Tennis: {
    sport: 'Tennis',
    tagline: 'Master clean topspin rallies, footwork splits, and baseline point play.',
    totalWeeks: 4,
    estimatedWeeklyHours: '3 hours / week',
    weeks: [
      {
        weekNumber: 1,
        title: 'Arrive & Explore',
        focus: 'Court orientation, sweet-spot contact, and Eastern/Semi-Western forehand grip.',
        tasks: [
          { id: 'tn1-t1', text: 'Book hard court slot at Grand Slam Tennis Club', subtext: 'Rent an automated ball machine for 30 minutes of clean contact.', completed: false },
          { id: 'tn1-t2', text: 'Identify your semi-western forehand grip bevel', subtext: 'Index knuckle resting on bevel 4 for natural topspin.', completed: false },
          { id: 'tn1-t3', text: 'Hit 40 low-to-high mini-tennis service box balls', subtext: 'Focus on brush-up topspin motion rather than flat swatting.', completed: false },
          { id: 'tn1-t4', text: 'Practice proper split-step timing on bounce', subtext: 'Land on the balls of your feet.', completed: false }
        ],
        coachingTip: 'Hit the ball in front of your lead hip. Striking the ball late behind your body causes spray and wrist strain.',
        reflectionPrompt: 'Did you notice a cleaner contact sound when striking the ball in front of your hip?'
      },
      {
        weekNumber: 2,
        title: 'Build the Basics',
        focus: 'Two-handed backhand drive, baseline rally depth, and basic slice.',
        tasks: [
          { id: 'tn2-t1', text: 'Drill 30 two-handed backhand groundstrokes', subtext: 'Non-dominant left hand drives the racquet through contact.', completed: false },
          { id: 'tn2-t2', text: 'Learn high-percentage cross-court baseline shape', subtext: 'Net clearance 2 to 3 feet above white tape.', completed: false },
          { id: 'tn2-t3', text: 'Practice trophy pose & continental grip for serving', subtext: 'Toss ball slightly into the court at 1 o’clock.', completed: false },
          { id: 'tn2-t4', text: 'Achieve an 8-ball cooperative baseline rally', subtext: 'Keep the ball deep past the service line.', completed: false }
        ],
        coachingTip: 'Aim high over the net. Gravity and topspin will pull the tennis ball down into the court.',
        reflectionPrompt: 'Which side felt more consistent during cross-court rallies: forehand or backhand?'
      },
      {
        weekNumber: 3,
        title: 'Find Your Rhythm',
        focus: 'Approach shots, punch volleys at the net, and full service rhythm.',
        tasks: [
          { id: 'tn3-t1', text: 'Drill forehand & backhand punch volleys', subtext: 'Short block motion with continental grip — no backswing.', completed: false },
          { id: 'tn3-t2', text: 'Practice first & second serve consistency', subtext: 'Target 60% first serve in percentage.', completed: false },
          { id: 'tn3-t3', text: 'Play 4 tiebreak games to 7 points with a player', subtext: 'Simulate pressure and scoring sequences.', completed: false },
          { id: 'tn3-t4', text: 'Cardio footwork ladder & cone sprint drills', subtext: 'Build lateral recovery speed for 3-set matches.', completed: false }
        ],
        coachingTip: 'Never look up early to see where your shot is going. Keep your eyes locked on the contact point for an extra split second.',
        reflectionPrompt: 'How comfortable did you feel stepping up to the net for punch volleys?'
      },
      {
        weekNumber: 4,
        title: 'First Full Set Match & Evaluation',
        focus: 'Play a full 6-game competitive tennis set and test rally tolerance.',
        tasks: [
          { id: 'tn4-t1', text: 'Play a complete 6-game match set with ad scoring', subtext: 'Execute planned shot patterns: serve out wide, attack open court.', completed: false },
          { id: 'tn4-t2', text: 'Analyze first-serve percentage & rally length', subtext: 'Note tactical patterns that generated points.', completed: false },
          { id: 'tn4-t3', text: 'Connect with Coach Ananya Rao or group clinic batch', subtext: 'Schedule bi-weekly drills to maintain technical growth.', completed: false },
          { id: 'tn4-t4', text: 'Celebrate completing your 4-week tennis plan!', subtext: 'You now possess dependable groundstrokes and match competence.', completed: false }
        ],
        coachingTip: 'Play to high-percentage targets on big points. Avoid aiming for the sidelines when you are under pressure.',
        reflectionPrompt: 'What key adjustment helped you maintain longer rallies during match play?'
      }
    ],
    equipmentList: [
      { name: '100 sq in graphite tennis racquet (280-300g)', required: true, notes: 'Babolat Pure Drive, Wilson Clash, or Head Speed', checked: true },
      { name: 'All-court or hard-court tennis shoes', required: true, notes: 'Non-slip reinforced toe cap and lateral support', checked: true },
      { name: 'Can of pressurized tennis balls (Wilson US Open)', required: true, notes: 'Fresh bounce for accurate rally drills', checked: false },
      { name: 'Overgrips pack & vibration dampener', required: false, notes: 'Absorbs sweat and reduces string buzz', checked: false }
    ]
  },
  Football: {
    sport: 'Football',
    tagline: 'From neighborhood turf pickup to tactical 5v5 passing fluency and team positioning.',
    totalWeeks: 4,
    estimatedWeeklyHours: '2.5 hours / week',
    weeks: [
      {
        weekNumber: 1,
        title: 'Arrive & Explore',
        focus: 'First touch cushioning, inside-of-foot passing, and turf shoe grip.',
        tasks: [
          { id: 'fb1-t1', text: 'Book evening slot at Apex Sky Turf Indiranagar', subtext: 'Experience playing under high-illumination LED floodlights.', completed: false },
          { id: 'fb1-t2', text: 'Equip rubber-stud turf shoes (TF sole)', subtext: 'Avoid bladed FG or metal studs which can slip on 50mm synthetic turf.', completed: false },
          { id: 'fb1-t3', text: 'Complete 100 two-touch wall passes (left & right foot)', subtext: 'Cushion on first touch, return crisp with inside of foot.', completed: false },
          { id: 'fb1-t4', text: 'Join a 30-minute casual small-sided rondo drill', subtext: 'Keep ball moving in 4v2 passing circle.', completed: false }
        ],
        coachingTip: 'Keep your chest leaning slightly forward over the ball on passes to prevent it from skying into the perimeter nets.',
        reflectionPrompt: 'How did your touch feel on both your dominant and non-dominant foot?'
      },
      {
        weekNumber: 2,
        title: 'Build the Basics',
        focus: 'Vision off the ball, wall-pass one-twos, and defensive jockeying.',
        tasks: [
          { id: 'fb2-t1', text: 'Practice scanning over shoulder before receiving pass', subtext: 'Know where defender and open teammates are located.', completed: false },
          { id: 'fb2-t2', text: 'Drill give-and-go (one-two) sprint combinations', subtext: 'Pass into space, sprint past marker for return ball.', completed: false },
          { id: 'fb2-t3', text: 'Practice defensive jockey stance', subtext: 'Stay on your toes at a 45-degree angle, forcing attacker wide.', completed: false },
          { id: 'fb2-t4', text: 'Play 2x 20-minute practice halves with friends', subtext: 'Focus on defensive tracking back.', completed: false }
        ],
        coachingTip: 'In 5-a-side turf football, constant movement creates lanes. Standing still suffocates your team\'s passing options.',
        reflectionPrompt: 'Did you remember to check your shoulder before receiving the ball in tight spaces?'
      },
      {
        weekNumber: 3,
        title: 'Find Your Rhythm',
        focus: 'Quick transition counter-attacks, low-driven finishing, and communication.',
        tasks: [
          { id: 'fb3-t1', text: 'Practice low driven toe-pokes and instep strikes', subtext: 'Aim for low bottom corners of 5-a-side goal.', completed: false },
          { id: 'fb3-t2', text: 'Run 10 counter-attack fast-break scenarios', subtext: 'Two touches maximum before releasing pass or shooting.', completed: false },
          { id: 'fb3-t3', text: 'RSVP to a Bengaluru player lobby on the Matchmaker tab', subtext: 'Connect with a local neighborhood squad.', completed: false },
          { id: 'fb3-t4', text: 'Incorporate quad, groin, and hamstring dynamic stretches', subtext: 'Essential prevention for explosive turf sprints.', completed: false }
        ],
        coachingTip: 'Shoot low on turf goalkeepers. Dropping down quickly to block low ground shots is hardest on artificial turf.',
        reflectionPrompt: 'How comfortable did you feel communicating and calling for the ball?'
      },
      {
        weekNumber: 4,
        title: 'Play Full Match & Milestone',
        focus: 'Compete in a full 60-minute 5v5 fixture with organized substitutions.',
        tasks: [
          { id: 'fb4-t1', text: 'Participate in a competitive 60-minute 5v5 match', subtext: 'Track your sprint recoveries and defensive interceptions.', completed: false },
          { id: 'fb4-t2', text: 'Calculate your team’s court fee share (~₹120/player)', subtext: 'Enjoy one of the most cost-effective sports in Bengaluru.', completed: false },
          { id: 'fb4-t3', text: 'Establish weekly recurring turf night with your squad', subtext: 'Consistent Thursday or Friday evening team tradition.', completed: false },
          { id: 'fb4-t4', text: 'Celebrate completing your 4-week football starter!', subtext: 'You now possess great match sharpness, stamina, and camaraderie.', completed: false }
        ],
        coachingTip: 'Hydrate well before kickoff. Bengaluru evening turf humidity requires at least 500ml water intake with pinch of salt.',
        reflectionPrompt: 'What was your favorite team passing sequence from the full 60-minute match?'
      }
    ],
    equipmentList: [
      { name: 'Turf football shoes (multi-stud TF rubber outsole)', required: true, notes: 'Non-slip traction on synthetic turf', checked: true },
      { name: 'Shin guards with compression sleeves', required: true, notes: 'Essential protection against stray kicks', checked: true },
      { name: 'Breathable sports team kit / jersey', required: true, notes: 'Lightweight moisture-wicking fabric', checked: false },
      { name: 'Training Size 5 football (low-bounce or standard)', required: false, notes: 'Venues provide balls; good for solo wall practice', checked: false }
    ]
  },
  Basketball: {
    sport: 'Basketball',
    tagline: 'Develop crisp handles, jump shot form, court spacing, and 3v3 team IQ.',
    totalWeeks: 4,
    estimatedWeeklyHours: '3 hours / week',
    weeks: [
      {
        weekNumber: 1,
        title: 'Arrive & Explore',
        focus: 'Dribbling rhythm, stationary ball handling, and basic BEEF shooting form.',
        tasks: [
          { id: 'bb1-t1', text: 'Book wooden court slot at Sankey Arena Malleshwaram', subtext: 'Enjoy true bounce and grip of FIBA maple hardwood.', completed: false },
          { id: 'bb1-t2', text: 'Equip high-top basketball sneakers with traction grip', subtext: 'Protects lateral ankle stability during crossover cuts.', completed: false },
          { id: 'bb1-t3', text: 'Practice 15 minutes of right & left hand pound dribbles', subtext: 'Eyes up off the floor, feeling ball recoil into fingertips.', completed: false },
          { id: 'bb1-t4', text: 'Make 30 one-hand form shots 5 feet from the basket', subtext: 'Balance, Eyes, Elbow under ball, Follow-through (BEEF).', completed: false }
        ],
        coachingTip: 'Keep your eyes up while dribbling. Looking at the basketball blinds you to open passing lanes.',
        reflectionPrompt: 'Were you able to dribble with your weak hand without constantly looking down?'
      },
      {
        weekNumber: 2,
        title: 'Build the Basics',
        focus: 'Triple threat stance, right/left layups off the glass, and chest passes.',
        tasks: [
          { id: 'bb2-t1', text: 'Drill 20 Mikan drill layups off right & left foot', subtext: 'Bank ball softly into the upper corner of the backboard square.', completed: false },
          { id: 'bb2-t2', text: 'Practice triple threat (pass, shoot, drive) stance', subtext: 'Knees bent, ball protected at hip level.', completed: false },
          { id: 'bb2-t3', text: 'Drill 50 two-handed chest and bounce passes against wall', subtext: 'Snap wrists with thumbs pointing down on release.', completed: false },
          { id: 'bb2-t4', text: 'Complete 30 free throws aiming for 60% accuracy', subtext: 'Establish a consistent pre-shot breath and dribble routine.', completed: false }
        ],
        coachingTip: 'Aim for the top corner of the backboard inner square on layups. It absorbs ball speed and drops it cleanly into the net.',
        reflectionPrompt: 'How consistent was your follow-through wrist snap on free throws?'
      },
      {
        weekNumber: 3,
        title: 'Find Your Rhythm',
        focus: 'Pick-and-roll fundamentals, perimeter jump shots, and defensive sliding.',
        tasks: [
          { id: 'bb3-t1', text: 'Practice pick-and-roll timing with a teammate', subtext: 'Set solid screen, roll hard toward basket with hands ready.', completed: false },
          { id: 'bb3-t2', text: 'Shoot 50 mid-range jump shots from elbow spots', subtext: 'Jump straight up and land on the same spot without drifting.', completed: false },
          { id: 'bb3-t3', text: 'Drill defensive lateral shuffles without crossing feet', subtext: 'Stay low in defensive stance, active hands in passing lane.', completed: false },
          { id: 'bb3-t4', text: 'Play 3 half-court games to 11 points (1s and 2s)', subtext: 'Practice spatial awareness and off-ball cuts.', completed: false }
        ],
        coachingTip: 'Do not cross your feet on defense. Slide your lead foot and bring your trailing foot up to maintain balance.',
        reflectionPrompt: 'Did you feel in control of your defensive balance against quick drives?'
      },
      {
        weekNumber: 4,
        title: 'First Full Half-Court / Full-Court Match',
        focus: 'Compete in organized 3v3 or 5v5 games and test stamina and playmaking.',
        tasks: [
          { id: 'bb4-t1', text: 'Play a full 3v3 tournament-style pickup session', subtext: 'Apply FIBA 3v3 clearing rules behind arc on rebounds.', completed: false },
          { id: 'bb4-t2', text: 'Record your field goal percentage and assist count', subtext: 'Celebrate team-first passing and smart shot selection.', completed: false },
          { id: 'bb4-t3', text: 'Join a weekly Bengaluru pickup hoop group', subtext: 'Stay connected for weekly court runs in Malleshwaram or Koramangala.', completed: false },
          { id: 'bb4-t4', text: 'Celebrate completing your 4-week basketball roadmap!', subtext: 'You now possess solid court fundamentals, handles, and shooting form.', completed: false }
        ],
        coachingTip: 'Good shot selection is the mark of an experienced player. An open pass to a teammate beats a contested hero shot.',
        reflectionPrompt: 'What was your most satisfying play from this week’s pickup games?'
      }
    ],
    equipmentList: [
      { name: 'Cushioned high-top basketball shoes', required: true, notes: 'Superior ankle collar and herringbone traction', checked: true },
      { name: 'Size 7 composite leather basketball', required: true, notes: 'Spalding TF-250 or Wilson Evolution', checked: true },
      { name: 'Breathable basketball shorts with deep pockets', required: false, notes: 'Unrestricted knee flexion for jump shots', checked: false },
      { name: 'Padded ankle brace or compression socks', required: false, notes: 'Recommended for prior ankle roll recovery', checked: false }
    ]
  },
  Yoga: {
    sport: 'Yoga',
    tagline: 'Restore joint mobility, strengthen core balance, and build peaceful athletic longevity.',
    totalWeeks: 4,
    estimatedWeeklyHours: '2 hours / week',
    weeks: [
      {
        weekNumber: 1,
        title: 'Arrive & Explore',
        focus: 'Breath connection, basic alignment, and Sun Salutation A (Surya Namaskar).',
        tasks: [
          { id: 'yg1-t1', text: 'Set up quiet practice space with non-slip 6mm mat', subtext: 'Find a well-ventilated room or tranquil park corner.', completed: false },
          { id: 'yg1-t2', text: 'Learn Ujjayi (ocean breath) pranayama technique', subtext: 'Slow rhythmic inhalations and exhalations through the nose.', completed: false },
          { id: 'yg1-t3', text: 'Practice 5 rounds of gentle Surya Namaskar A', subtext: 'Mountain pose, forward fold, plank, cobra, downward dog.', completed: false },
          { id: 'yg1-t4', text: 'Hold Child’s Pose (Balasana) for 3 full minutes', subtext: 'Decompress lower back and open tight hips.', completed: false }
        ],
        coachingTip: 'Never force or bounce into a stretch. Meet your edge with smooth breaths and let tight fascia release naturally.',
        reflectionPrompt: 'Did you notice tension releasing from your lower back during Child’s Pose?'
      },
      {
        weekNumber: 2,
        title: 'Build the Basics',
        focus: 'Standing balance poses, hamstring extension, and warrior sequences.',
        tasks: [
          { id: 'yg2-t1', text: 'Master Warrior I (Virabhadrasana I) & Warrior II', subtext: 'Front knee tracked over ankle, back foot grounded at 45 degrees.', completed: false },
          { id: 'yg2-t2', text: 'Hold Tree Pose (Vrksasana) for 45s on each leg', subtext: 'Fix your visual gaze (Drishti) on an unmoving spot ahead.', completed: false },
          { id: 'yg2-t3', text: 'Use yoga blocks for Triangle Pose (Trikonasana)', subtext: 'Keep spine lengthened rather than rounding toward the floor.', completed: false },
          { id: 'yg2-t4', text: 'Log 2x 30-minute morning yoga flows this week', subtext: 'Notice morning joint stiffness easing up.', completed: false }
        ],
        coachingTip: 'Spread your toes wide to build a wide stable tripod base on balance poses.',
        reflectionPrompt: 'Which balance pose challenged your stability the most, and how did your breath help?'
      },
      {
        weekNumber: 3,
        title: 'Find Your Rhythm',
        focus: 'Core vinyasa flows, hip opening (Pigeon pose), and gentle thoracic twists.',
        tasks: [
          { id: 'yg3-t1', text: 'Hold Pigeon Pose (Eka Pada Rajakapotasana) for 90s', subtext: 'Deep release for hip flexors and glutes tight from desk sitting.', completed: false },
          { id: 'yg3-t2', text: 'Execute Boat Pose (Navasana) core hold for 30s', subtext: 'Engage transverse abdominals with straight spine.', completed: false },
          { id: 'yg3-t3', text: 'Attend a community studio session or park group', subtext: 'Experience group breath energy in Indiranagar or Cubbon Park.', completed: false },
          { id: 'yg3-t4', text: 'Practice seated spinal twist to detox thoracic spine', subtext: 'Lengthen upward on inhale, gently deepen twist on exhale.', completed: false }
        ],
        coachingTip: 'If your hips are lifted in Pigeon pose, place a folded blanket or yoga block under your sit bone for safe joint support.',
        reflectionPrompt: 'How did your hips feel after holding Pigeon pose for 90 seconds?'
      },
      {
        weekNumber: 4,
        title: 'Integrate Full Practice & Longevity',
        focus: 'A complete 60-minute balancing flow ending in peaceful Savasana.',
        tasks: [
          { id: 'yg4-t1', text: 'Complete a continuous 60-minute Vinyasa flow', subtext: 'Seamless transition between breath and movement.', completed: false },
          { id: 'yg4-t2', text: 'Rest in full Savasana (corpse pose) for 10 minutes', subtext: 'Allow your nervous system to absorb the benefits of practice.', completed: false },
          { id: 'yg4-t3', text: 'Combine yoga with your court sport routine', subtext: 'Use 10-minute yoga warm-ups before badminton or running.', completed: false },
          { id: 'yg4-t4', text: 'Celebrate completing your 4-week Yoga starter!', subtext: 'You now possess lifelong mobility, flexibility, and stress resilience.', completed: false }
        ],
        coachingTip: 'Savasana is not just resting; it is the most important posture where your brain rewires your motor pathways and lowers cortisol.',
        reflectionPrompt: 'What mental or physical difference do you feel compared to 4 weeks ago?'
      }
    ],
    equipmentList: [
      { name: 'Eco-friendly 6mm high-density yoga mat', required: true, notes: 'Non-slip grip for hands and knees', checked: true },
      { name: 'Set of 2 lightweight foam or cork yoga blocks', required: true, notes: 'Brings the floor closer during standing poses', checked: false },
      { name: 'Cotton yoga stretching strap', required: false, notes: 'Helps with hamstring and shoulder flexibility', checked: false }
    ]
  },
  Running: {
    sport: 'Running',
    tagline: 'From couch to continuous 5K non-stop running through Bengaluru greenery.',
    totalWeeks: 4,
    estimatedWeeklyHours: '2 - 2.5 hours / week',
    weeks: [
      {
        weekNumber: 1,
        title: 'Arrive & Explore',
        focus: 'Walk/run intervals, cadence awareness, and choosing proper running shoes.',
        tasks: [
          { id: 'rn1-t1', text: 'Run 1 minute / walk 1.5 minutes for 20 minutes', subtext: 'Keep running pace conversational where you could chat in sentences.', completed: false },
          { id: 'rn1-t2', text: 'Visit Cubbon Park early morning loop (6:30 AM)', subtext: 'Fresh tree canopy air, vehicle-free paved road.', completed: false },
          { id: 'rn1-t3', text: 'Check running shoes for proper thumb-width toe space', subtext: 'Prevents black toenails on longer training runs.', completed: false },
          { id: 'rn1-t4', text: 'Post-run calf and Achilles tendon stretching', subtext: '30 seconds per side against park bench or curb.', completed: false }
        ],
        coachingTip: 'Run slow to run fast later. 80% of your training should feel easy enough to speak without gasping.',
        reflectionPrompt: 'Did you manage to keep your pace conversational during the 1-minute running intervals?'
      },
      {
        weekNumber: 2,
        title: 'Build the Basics',
        focus: 'Lengthening run intervals to 3 minutes and landing with midfoot strike.',
        tasks: [
          { id: 'rn2-t1', text: 'Run 3 minutes / walk 1 minute for 24 minutes', subtext: 'Maintain relaxed dropped shoulders and loose fists.', completed: false },
          { id: 'rn2-t2', text: 'Focus on 170-180 steps per minute cadence', subtext: 'Short, quick strides prevent overstriding and knee impact.', completed: false },
          { id: 'rn2-t3', text: 'Add 10 minutes of runner core strengthening', subtext: 'Planks, glute bridges, and bird-dogs.', completed: false },
          { id: 'rn2-t4', text: 'Log 8 km of accumulated weekly running volume', subtext: 'Track progress via Strava or phone GPS app.', completed: false }
        ],
        coachingTip: 'Avoid heavy heel striking far out in front of your knee. Land with your feet directly beneath your hips.',
        reflectionPrompt: 'How did your knees and shins feel after increasing the run intervals to 3 minutes?'
      },
      {
        weekNumber: 3,
        title: 'Find Your Rhythm',
        focus: 'Continuous 15-20 minute run segment and breathing rhythm.',
        tasks: [
          { id: 'rn3-t1', text: 'Run 2 km continuous without stopping to walk', subtext: 'Pace yourself evenly without sprinting the first 500m.', completed: false },
          { id: 'rn3-t2', text: 'Practice 2:2 breathing rhythm (2 steps inhale, 2 steps exhale)', subtext: 'Synchronizes diaphragmatic breathing with footstrike.', completed: false },
          { id: 'rn3-t3', text: 'Try Lalbagh botanical garden or lake perimeter track', subtext: 'Enjoy soft mud or gravel trails that reduce joint impact.', completed: false },
          { id: 'rn3-t4', text: 'Do 4x 100m gentle uphill striders for calf power', subtext: 'Run tall, drive knees upward with springy ankles.', completed: false }
        ],
        coachingTip: 'When you feel like stopping, slow your running pace down by 15% instead of walking immediately.',
        reflectionPrompt: 'Did the 2:2 breathing rhythm help you relax during the continuous 2 km run?'
      },
      {
        weekNumber: 4,
        title: 'Complete 5K Milestone Run',
        focus: 'Cross the finish line of your first continuous 5,000-meter run!',
        tasks: [
          { id: 'rn4-t1', text: 'Complete a full continuous 5K (5.0 km) outdoor run', subtext: 'Celebrate running 5 km non-stop without walking!', completed: false },
          { id: 'rn4-t2', text: 'Log finish time and celebrate your achievement', subtext: 'Share your milestone with the Bengaluru running community.', completed: false },
          { id: 'rn4-t3', text: 'Sign up for a local Bengaluru 10K or timed parkrun event', subtext: 'Keep the momentum going with a goal on your calendar.', completed: false },
          { id: 'rn4-t4', text: 'Celebrate completing your 4-week running starter plan!', subtext: 'You are officially a consistent runner with boundless stamina.', completed: false }
        ],
        coachingTip: 'Reward your milestone with a relaxing recovery walk and electrolyte breakfast at an iconic Bengaluru breakfast spot!',
        reflectionPrompt: 'What was your total 5K time and how did crossing that milestone feel?'
      }
    ],
    equipmentList: [
      { name: 'Cushioned daily trainer running shoes', required: true, notes: 'Nike Pegasus, Asics Gel-Nimbus, or Brooks Ghost', checked: true },
      { name: 'Anti-blister running socks (synthetic or merino)', required: true, notes: 'Seamless toe box prevents friction blisters', checked: true },
      { name: 'Phone running arm band or waist running belt', required: false, notes: 'Hands-free convenience for phone and keys', checked: false }
    ]
  },
  Cycling: {
    sport: 'Cycling',
    tagline: 'Ride smoothly: from neighborhood gear shifts to completing a 25 km weekend loop.',
    totalWeeks: 4,
    estimatedWeeklyHours: '3 hours / week',
    weeks: [
      {
        weekNumber: 1,
        title: 'Arrive & Explore',
        focus: 'Saddle height adjustment, helmet fit, and relaxed brake modulation.',
        tasks: [
          { id: 'cy1-t1', text: 'Set bicycle saddle height to slight knee bend (25-30 deg)', subtext: 'Prevents knee patella compression while maximizing pedaling power.', completed: false },
          { id: 'cy1-t2', text: 'Fit certified helmet sitting two finger-widths above eyebrows', subtext: 'Snug chin strap with zero rocking on your head.', completed: false },
          { id: 'cy1-t3', text: 'Ride 8 km at conversational pace in quiet morning hours', subtext: 'Get comfortable with smooth progressive braking with both levers.', completed: false },
          { id: 'cy1-t4', text: 'Check tire pressures to recommended PSI on sidewall', subtext: 'Reduces rolling friction and prevents pinch flats.', completed: false }
        ],
        coachingTip: 'Never brake with only your front brake lever during high speed. Squeeze both brakes smoothly together with emphasis on the rear.',
        reflectionPrompt: 'Did your saddle height feel comfortable for your knees during the 8 km ride?'
      },
      {
        weekNumber: 2,
        title: 'Build the Basics',
        focus: 'Cadence (80-90 RPM), gear shifting before hills, and hydration on the bike.',
        tasks: [
          { id: 'cy2-t1', text: 'Practice shifting into easier gears before inclines', subtext: 'Spin at 80-90 RPM rather than grinding heavy gears at 50 RPM.', completed: false },
          { id: 'cy2-t2', text: 'Practice drinking from water bottle cage while rolling', subtext: 'Keep one hand firmly centered on handlebars while drinking.', completed: false },
          { id: 'cy2-t3', text: 'Ride a continuous 15 km route along scenic outer ring loops', subtext: 'Maintain aerodynamic and relaxed elbow posture.', completed: false },
          { id: 'cy2-t4', text: 'Clean and lube your bicycle drive chain with dry lube', subtext: 'Extends drivetrain life and ensures silent pedaling.', completed: false }
        ],
        coachingTip: 'Spin, don’t grind. A cadence of 85 RPM uses your aerobic heart and lungs instead of burning out your thigh muscles.',
        reflectionPrompt: 'Were you able to smoothly downshift before uphill stretches without chain clatter?'
      },
      {
        weekNumber: 3,
        title: 'Find Your Rhythm',
        focus: 'Group drafting etiquette, hand signals, and continuous 20 km tempo.',
        tasks: [
          { id: 'cy3-t1', text: 'Learn essential road hand signals (left, right, stopping, pothole)', subtext: 'Point down at road hazards to alert riders behind you.', completed: false },
          { id: 'cy3-t2', text: 'Complete a 20 km morning ride toward Kempegowda airport road', subtext: 'Wide smooth shoulders perfect for sustained cruising speeds.', completed: false },
          { id: 'cy3-t3', text: 'Incorporate electrolyte hydration and banana at halfway mark', subtext: 'Prevent late-ride leg cramps.', completed: false },
          { id: 'cy3-t4', text: 'Carry mini-pump, spare tube, and tire levers in saddle bag', subtext: 'Self-sufficiency on longer weekend adventures.', completed: false }
        ],
        coachingTip: 'Ride predictably in a straight line. Avoid swerving suddenly; glance over your shoulder before changing road position.',
        reflectionPrompt: 'How comfortable did you feel using hand signals for turning and road hazards?'
      },
      {
        weekNumber: 4,
        title: 'Complete 25-30 km Weekend Gran Fondo',
        focus: 'Achieve your first epic 25-30 km continuous weekend endurance tour.',
        tasks: [
          { id: 'cy4-t1', text: 'Complete a continuous 25 to 30 km weekend ride', subtext: 'Celebrate reaching high sustained speeds and endurance milestones.', completed: false },
          { id: 'cy4-t2', text: 'Track average speed and elevation gain on Strava', subtext: 'Notice how effortlessly your legs turn over compared to Week 1.', completed: false },
          { id: 'cy4-t3', text: 'Join a weekly Sunday morning Bengaluru cycling club', subtext: 'Connect with local cyclists for early breakfast rides.', completed: false },
          { id: 'cy4-t4', text: 'Celebrate completing your 4-week cycling starter plan!', subtext: 'You now possess great leg strength, endurance, and road confidence.', completed: false }
        ],
        coachingTip: 'Celebrate your 30 km ride with hot idlis and filter coffee with your riding buddies — the quintessential Bengaluru cyclist tradition!',
        reflectionPrompt: 'What was your average speed on the 25-30 km ride, and how did your legs feel?'
      }
    ],
    equipmentList: [
      { name: 'Certified bicycle helmet with dial fit system', required: true, notes: 'Non-negotiable safety item', checked: true },
      { name: 'Bicycle front white LED headlight & rear red flasher', required: true, notes: 'Essential visibility in dawn and dusk light', checked: true },
      { name: 'Padded cycling shorts (bib or regular)', required: false, notes: 'Chafing protection for rides over 15 km', checked: false },
      { name: 'Water bottle with frame-mounted cage', required: true, notes: 'Hydration on the go', checked: true }
    ]
  }
};


