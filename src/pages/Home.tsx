import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Search, 
  MapPin, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  Users, 
  Clock, 
  Layers, 
  Calendar,
  CheckCircle2,
  Trophy,
  GraduationCap,
  CalendarCheck,
  Compass,
  CreditCard
} from 'lucide-react';
import { 
  Venue, 
  VENUES_DATA, 
  SPORTS, 
  LOCALITIES, 
  COACHES_DATA, 
  Coach,
  heroArenaImg, 
  coachImg,
  SPORT_FINDER_DATA
} from '../data/sportsData';
import { VenueCard } from '../components/VenueCard';
import { CoachCard } from '../components/CoachCard';
import { CoachTrialModal } from '../components/CoachTrialModal';
import { SkillQuiz, SkillQuizModal, SkillLevel } from '../components/SkillQuiz';
import { CoachingSection } from '../components/CoachingSection';

interface HomeProps {
  onBookVenue: (venue: Venue) => void;
  onLocalityChange: (locality: string) => void;
  appMode?: 'booking' | 'coaching';
  onModeChange?: (mode: 'booking' | 'coaching') => void;
}

export const Home: React.FC<HomeProps> = ({ 
  onBookVenue, 
  onLocalityChange,
  appMode = 'booking',
  onModeChange
}) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSport, setSelectedSport] = useState('all');
  const [selectedLocality, setSelectedLocality] = useState('All Localities');

  // Coaching trial modal state
  const [activeTrialCoach, setActiveTrialCoach] = useState<Coach | null>(null);
  const [isTrialOpen, setIsTrialOpen] = useState(false);
  const [isHomeQuizOpen, setIsHomeQuizOpen] = useState(false);

  // Hero Quick Sport Chips
  const quickSports = [
    { name: 'Badminton', id: 'Badminton' },
    { name: 'Football', id: 'Football' },
    { name: 'Tennis', id: 'Tennis' },
    { name: 'Swimming', id: 'Swimming' },
    { name: 'Cricket', id: 'Cricket' },
    { name: 'Pickleball', id: 'Pickleball' }
  ];

  // Locality Quick-Picks requested: Yelahanka, Indiranagar, Koramangala, Sahakar Nagar, Whitefield, HSR Layout
  const quickLocalities = [
    'All Localities',
    'Yelahanka',
    'Indiranagar',
    'Koramangala',
    'Sahakar Nagar',
    'Whitefield',
    'HSR Layout'
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery) params.set('q', searchQuery);
    if (selectedSport !== 'all') params.set('sport', selectedSport);
    if (selectedLocality !== 'All Localities') params.set('locality', selectedLocality);
    
    if (appMode === 'coaching') {
      navigate(`/coaches?${params.toString()}`);
    } else {
      navigate(`/venues?${params.toString()}`);
    }
  };

  const handleQuickLocalitySelect = (loc: string) => {
    setSelectedLocality(loc);
    onLocalityChange(loc);
  };

  // Filter venues
  const featuredVenues = VENUES_DATA.filter((venue) => {
    const matchesLocality = selectedLocality === 'All Localities' || venue.locality === selectedLocality;
    const matchesSport = selectedSport === 'all' || venue.sports.includes(selectedSport);
    return matchesLocality && matchesSport;
  });

  // Filter coaches
  const featuredCoaches = COACHES_DATA.filter((coach) => {
    const matchesLocality = selectedLocality === 'All Localities' || coach.locality === selectedLocality;
    const matchesSport = selectedSport === 'all' || coach.sport === selectedSport;
    return matchesLocality && matchesSport;
  });

  return (
    <div className="space-y-16 pb-16 bg-slate-50">
      
      {/* Hero Section (Vibrant Light) */}
      <section className="relative pt-8 sm:pt-12 pb-12 overflow-hidden border-b border-slate-200 bg-white">
        
        {/* Subtle decorative glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-blue-500/5 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-[500px] h-[300px] bg-orange-500/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* TOP-LEVEL MODE SEPARATION SWITCHER (Requirement 2) */}
          <div className="mb-6 inline-flex p-1.5 rounded-2xl bg-slate-100 border border-slate-200/90 shadow-inner">
            <button
              onClick={() => onModeChange?.('booking')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer whitespace-nowrap ${
                appMode === 'booking'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <CalendarCheck className="w-4 h-4" />
              <span>Mode 1: Book a Court (Self-Play · No Trainer)</span>
            </button>

            <button
              onClick={() => onModeChange?.('coaching')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer whitespace-nowrap ${
                appMode === 'coaching'
                  ? 'bg-orange-500 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>Mode 2: Coaching & Training (Academy Batches)</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Column: Headlines & Search */}
            <div className="lg:col-span-7 space-y-6 text-left">
              
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5 text-orange-500" />
                <span>Bengaluru&apos;s Sports Infrastructure & Training Platform</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.15]" style={{ textWrap: 'balance' }}>
                {appMode === 'booking' ? (
                  <>
                    Find & Book Premium Courts Across <span className="text-blue-600">Bengaluru</span>
                  </>
                ) : (
                  <>
                    Train with Certified NIS & BWF Coaches in <span className="text-orange-500">Bengaluru</span>
                  </>
                )}
              </h1>

              <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-xl">
                {appMode === 'booking' 
                  ? "Real-time court slot booking. Verified BWF synthetic mats, FIFA rooftop turfs, zero surge fees, and instant slot locks across 9 neighborhoods."
                  : "Structured monthly training programs, certified NIS/BWF mentors, beginner evaluations, and junior/adult batches across Bengaluru."}
              </p>

              {/* Main Search Bar Form */}
              <form 
                onSubmit={handleSearchSubmit}
                className="p-2 sm:p-2.5 rounded-2xl bg-white border border-slate-300 shadow-md flex flex-col sm:flex-row gap-2"
              >
                <div className="flex-1 flex items-center gap-2.5 px-3 py-2 bg-slate-50 rounded-xl border border-slate-200">
                  <Search className="w-4 h-4 text-blue-600 shrink-0" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={appMode === 'booking' ? "Search court name, turf, or locality (e.g. Indiranagar, BWF)..." : "Search coach name, academy, or sport (e.g. badminton, tennis)..."}
                    className="w-full bg-transparent text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none font-medium"
                  />
                </div>

                <button
                  type="submit"
                  className={`px-6 py-3 rounded-xl font-bold text-sm shadow-md text-white flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-[1.02] shrink-0 ${
                    appMode === 'booking'
                      ? 'bg-blue-600 hover:bg-blue-700 shadow-blue-500/20'
                      : 'bg-orange-500 hover:bg-orange-600 shadow-orange-500/20'
                  }`}
                >
                  <span>{appMode === 'booking' ? 'Explore Courts' : 'Find Coaches'}</span>
                  <ArrowRight className="w-4 h-4 text-white" />
                </button>
              </form>

              {/* Quick Sport Chips */}
              <div className="space-y-2 pt-1">
                <span className="text-xs font-bold text-slate-500 tracking-wider uppercase block">
                  Quick Sport Filters:
                </span>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedSport('all')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      selectedSport === 'all'
                        ? 'bg-slate-900 text-white shadow-xs'
                        : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    All
                  </button>
                  {quickSports.map((sport) => (
                    <button
                      key={sport.id}
                      onClick={() => setSelectedSport(sport.id === selectedSport ? 'all' : sport.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        selectedSport === sport.id
                          ? 'bg-blue-600 text-white shadow-xs'
                          : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      {sport.name}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Column: Hero Visual Asset */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden bg-white p-2 border border-slate-200 shadow-xl group">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                  <img
                    src={appMode === 'booking' ? heroArenaImg : coachImg}
                    alt={appMode === 'booking' ? "Premier sports arena complex in Bengaluru" : "Professional sports coach in Bengaluru"}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/10" />
                  
                  {/* Floating Live Badge */}
                  <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200 text-left shadow-lg">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-extrabold text-slate-900">
                        {appMode === 'booking' ? 'Velocity Sports Arena' : 'Prakash Padukone Elite Affiliate'}
                      </span>
                      <span className={`font-mono font-extrabold ${appMode === 'booking' ? 'text-blue-700' : 'text-orange-600'}`}>
                        {appMode === 'booking' ? 'From ₹450/hr' : '₹3,200/mo'}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-600 flex items-center gap-2 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-orange-500" />
                      <span>{appMode === 'booking' ? 'Yelahanka · 8 BWF Synthetic Courts' : 'Sahakar Nagar · BWF Level 2 Head Coach'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Quick Shortcuts: "Find Your Sport" and "4-Week Plan" Callout Cards */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Shortcut 1: Find Your Sport Finder Grid */}
            <Link
              to="/finder"
              className="p-5 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50/60 border border-blue-200 hover:border-blue-400 transition-all shadow-xs hover:shadow-md flex items-center justify-between group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
                  <Compass className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors">
                      Find Your Sport
                    </h3>
                    <span className="text-[10px] font-bold bg-blue-600 text-white px-2 py-0.5 rounded-full">New</span>
                  </div>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Ranked sports by budget, learning curve & fitness confidence.
                  </p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-blue-600 group-hover:translate-x-1 transition-transform shrink-0" />
            </Link>

            {/* Shortcut 2: 4-Week Starter Plan */}
            <Link
              to="/plan"
              className="p-5 rounded-2xl bg-gradient-to-r from-orange-50 to-amber-50/60 border border-orange-200 hover:border-orange-400 transition-all shadow-xs hover:shadow-md flex items-center justify-between group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-orange-500 text-white flex items-center justify-center shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform">
                  <Trophy className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-extrabold text-slate-900 group-hover:text-orange-600 transition-colors">
                      4-Week Starter Plan
                    </h3>
                    <span className="text-[10px] font-bold bg-orange-500 text-white px-2 py-0.5 rounded-full">Step-by-Step</span>
                  </div>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Interactive weekly roadmap & equipment checklist for beginners.
                  </p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-orange-600 group-hover:translate-x-1 transition-transform shrink-0" />
            </Link>

          </div>

          {/* KPI / Proof Strip */}
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 p-5 rounded-2xl bg-white border border-slate-200 shadow-xs text-left">
            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono tabular-nums">64+</div>
              <div className="text-xs text-slate-500 font-semibold">Verified BLR Venues</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-extrabold text-blue-600 font-mono tabular-nums">18,500+</div>
              <div className="text-xs text-slate-500 font-semibold">Hours Booked</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-extrabold text-orange-500 font-mono tabular-nums">4.9 ★</div>
              <div className="text-xs text-slate-500 font-semibold">Player Review Average</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-extrabold text-indigo-600 font-mono tabular-nums">0%</div>
              <div className="text-xs text-slate-500 font-semibold">Surge or Booking Fees</div>
            </div>
          </div>

        </div>
      </section>

      {/* Locality Quick-Picks Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <div className="text-xs text-orange-600 font-bold tracking-wider uppercase mb-1">
              Bengaluru Neighborhood Hubs
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Locality Quick-Picks
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
              Select your neighborhood to find courts within 5-15 minutes of your location.
            </p>
          </div>

          <Link
            to={appMode === 'booking' ? '/venues' : '/coaches'}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors"
          >
            <span>View all 9 localities</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          {quickLocalities.map((loc) => (
            <button
              key={loc}
              onClick={() => handleQuickLocalitySelect(loc)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 shadow-2xs ${
                selectedLocality === loc
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-white text-slate-700 hover:text-slate-900 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              <MapPin className="w-3.5 h-3.5 text-orange-500" />
              <span>{loc}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Featured Section: Toggles depending on active mode (Court Booking vs Coaching) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className={`text-xs font-bold tracking-wider uppercase mb-1 ${appMode === 'booking' ? 'text-blue-600' : 'text-orange-600'}`}>
              {appMode === 'booking' ? '⚡ Hourly Slot Rentals (Self-Play · No Trainer)' : '🎓 Academy Batches & Certified Mentors'}
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {appMode === 'booking' ? 'Verified Courts in Bengaluru' : 'Top Coaches & Academies in Bengaluru'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
              Showing {appMode === 'booking' ? featuredVenues.length : featuredCoaches.length} verified listings matching your area.
            </p>
          </div>

          <Link
            to={appMode === 'booking' ? '/venues' : '/coaches'}
            className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm font-bold text-slate-800 hover:text-blue-600 hover:border-blue-400 transition-colors shadow-2xs"
          >
            {appMode === 'booking' ? 'Open Court Directory →' : 'Open Academy Directory →'}
          </Link>
        </div>

        {appMode === 'booking' ? (
          featuredVenues.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredVenues.map((venue) => (
                <VenueCard
                  key={venue.id}
                  venue={venue}
                  onBook={onBookVenue}
                  onSelectLocality={handleQuickLocalitySelect}
                />
              ))}
            </div>
          ) : (
            <div className="p-12 text-center rounded-2xl bg-white border border-slate-200 shadow-sm">
              <Layers className="w-10 h-10 text-slate-400 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-900">No courts found matching this filter</h3>
              <p className="text-xs text-slate-500 mt-1 mb-4">Try selecting &apos;All Localities&apos; or reset your sport selection.</p>
              <button
                onClick={() => {
                  setSelectedLocality('All Localities');
                  setSelectedSport('all');
                }}
                className="px-4 py-2 text-xs font-bold rounded-xl bg-blue-600 text-white"
              >
                Reset Filters
              </button>
            </div>
          )
        ) : (
          <CoachingSection
            selectedLocality={selectedLocality !== 'All Localities' ? selectedLocality : 'Sahakar Nagar'}
            initialSport={selectedSport !== 'all' ? selectedSport : 'Badminton'}
            onSelectCoach={(c) => {
              setActiveTrialCoach(c);
              setIsTrialOpen(true);
            }}
          />
        )}
      </section>

      {/* Trial Session Modal */}
      <CoachTrialModal
        coach={activeTrialCoach}
        isOpen={isTrialOpen}
        onClose={() => {
          setIsTrialOpen(false);
          setActiveTrialCoach(null);
        }}
      />

      {/* Skill Quiz Modal */}
      <SkillQuizModal
        isOpen={isHomeQuizOpen}
        onClose={() => setIsHomeQuizOpen(false)}
        sport={selectedSport !== 'all' ? selectedSport : 'Badminton'}
        onSelectLevel={(level: SkillLevel) => {
          setIsHomeQuizOpen(false);
          // Navigate to coaches with the evaluated level
          navigate(`/coaches?level=${level}`);
        }}
      />

    </div>
  );
};
