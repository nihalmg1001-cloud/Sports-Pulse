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
  CheckCircle2
} from 'lucide-react';
import { Venue, VENUES_DATA, SPORTS, LOCALITIES, COACHES_DATA } from '../data/sportsData';
import { VenueCard } from '../components/VenueCard';

interface HomeProps {
  onBookVenue: (venue: Venue) => void;
  onLocalityChange: (locality: string) => void;
}

export const Home: React.FC<HomeProps> = ({ onBookVenue, onLocalityChange }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSport, setSelectedSport] = useState('all');
  const [selectedLocality, setSelectedLocality] = useState('All Localities');

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
    navigate(`/venues?${params.toString()}`);
  };

  const handleQuickLocalitySelect = (loc: string) => {
    setSelectedLocality(loc);
    onLocalityChange(loc);
  };

  // Filter featured venues
  const featuredVenues = VENUES_DATA.filter((venue) => {
    const matchesLocality = selectedLocality === 'All Localities' || venue.locality === selectedLocality;
    const matchesSport = selectedSport === 'all' || venue.sports.includes(selectedSport);
    return matchesLocality && matchesSport;
  });

  return (
    <div className="space-y-20 pb-16">
      
      {/* Hero Section */}
      <section className="relative pt-8 sm:pt-14 pb-12 overflow-hidden">
        {/* Subtle glow background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-[500px] h-[300px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Column: Headlines & Search */}
            <div className="lg:col-span-7 space-y-6 text-left">
              
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span>Bengaluru&apos;s Dedicated Sports Booking Engine</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold tracking-tight text-white leading-[1.15]" style={{ textWrap: 'balance' }}>
                Find & Book Premium Sports Courts Across <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">Bengaluru</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-xl">
                Real-time slot availability, verified BWF synthetic mats & FIFA-certified turfs. Zero surge fees, instant slot lock, and active player match lobbies.
              </p>

              {/* Main Search Bar Form */}
              <form 
                onSubmit={handleSearchSubmit}
                className="p-2 sm:p-2.5 rounded-2xl glass-modal border border-slate-700/80 shadow-2xl flex flex-col sm:flex-row gap-2"
              >
                <div className="flex-1 flex items-center gap-2.5 px-3 py-2 bg-slate-900/80 rounded-xl border border-slate-800">
                  <Search className="w-4 h-4 text-emerald-400 shrink-0" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search venue name, sport, or landmark..."
                    className="w-full bg-transparent text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-bold text-sm shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-[1.02] shrink-0"
                >
                  <span>Explore Courts</span>
                  <ArrowRight className="w-4 h-4 text-slate-950" />
                </button>
              </form>

              {/* Quick Sport Chips */}
              <div className="space-y-2 pt-1">
                <span className="text-xs font-semibold text-slate-400 tracking-wider uppercase block">
                  Quick Sport Filters:
                </span>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedSport('all')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      selectedSport === 'all'
                        ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm'
                        : 'bg-slate-900/80 text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    All
                  </button>
                  {quickSports.map((sport) => (
                    <button
                      key={sport.id}
                      onClick={() => setSelectedSport(sport.id === selectedSport ? 'all' : sport.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        selectedSport === sport.id
                          ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm'
                          : 'bg-slate-900/80 text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      {sport.name}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Column: Hero Visual Asset (Cinematic Arena) */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden glass-card p-2 border border-slate-700/60 shadow-2xl group">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                  <img
                    src="/src/assets/images/hero_bengaluru_sports_complex_1792030417535.jpg"
                    alt="Premier sports arena complex in Bengaluru"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                  
                  {/* Floating Live Badge */}
                  <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-xl glass-modal border border-slate-700/80 text-left">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-bold text-white">Velocity Sports Arena</span>
                      <span className="text-emerald-400 font-mono font-bold">From ₹450/hr</span>
                    </div>
                    <div className="text-[11px] text-slate-400 flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Yelahanka · 8 BWF Synthetic Courts</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* KPI / Proof Strip */}
          <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 p-5 rounded-2xl glass-card border border-slate-800/80 text-left">
            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums">64+</div>
              <div className="text-xs text-slate-400 font-medium">Verified BLR Venues</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-mono tabular-nums">18,500+</div>
              <div className="text-xs text-slate-400 font-medium">Hours Booked</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-extrabold text-cyan-400 font-mono tabular-nums">4.9 ★</div>
              <div className="text-xs text-slate-400 font-medium">Player Review Average</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-extrabold text-teal-300 font-mono tabular-nums">0%</div>
              <div className="text-xs text-slate-400 font-medium">Surge or Convenience Fees</div>
            </div>
          </div>

        </div>
      </section>

      {/* Locality Quick-Picks Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <div className="text-xs text-emerald-400 font-semibold tracking-wider uppercase mb-1">
              Bengaluru Neighborhood Hubs
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Locality Quick-Picks
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Select your area to find courts within 5-15 minutes of your location.
            </p>
          </div>

          <Link
            to="/venues"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
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
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                selectedLocality === loc
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-lg shadow-emerald-500/20'
                  : 'glass-card text-slate-300 hover:text-white hover:border-slate-700'
              }`}
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>{loc}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Featured Venues Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs text-emerald-400 font-semibold tracking-wider uppercase mb-1">
              Verified Arenas & Pitches
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Featured Venues in Bengaluru
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Showing {featuredVenues.length} top-rated venues matching your preferences.
            </p>
          </div>

          <Link
            to="/venues"
            className="px-4 py-2 rounded-xl glass-card text-xs sm:text-sm font-semibold text-slate-200 hover:text-emerald-400 hover:border-emerald-500/40 transition-colors"
          >
            Open Full Venue Directory →
          </Link>
        </div>

        {featuredVenues.length > 0 ? (
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
          <div className="p-12 text-center rounded-2xl glass-card border border-slate-800">
            <Layers className="w-10 h-10 text-slate-600 mx-auto mb-3" />
            <h3 className="text-base font-semibold text-white">No courts found matching this filter</h3>
            <p className="text-xs text-slate-400 mt-1 mb-4">Try selecting &apos;All Localities&apos; or reset your sport selection.</p>
            <button
              onClick={() => {
                setSelectedLocality('All Localities');
                setSelectedSport('all');
              }}
              className="px-4 py-2 text-xs font-semibold rounded-lg bg-emerald-400 text-slate-950"
            >
              Reset Filters
            </button>
          </div>
        )}
      </section>

      {/* Academies & Coaching Highlight Teaser */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl glass-card border border-slate-800 p-8 sm:p-12 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-semibold tracking-wider uppercase">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Accredited Sports Academies</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Level Up with Certified NIS & BWF Coaches
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                Whether you are starting from scratch or training for tournament play, our verified Bengaluru coaches offer structured batches for juniors (under 14) and adults. Complimentary stroke assessment included.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  to="/coaches"
                  className="px-5 py-2.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-xs sm:text-sm shadow-md transition-all inline-flex items-center gap-2"
                >
                  <span>Explore Academies & Batches</span>
                  <ArrowRight className="w-4 h-4 text-slate-950" />
                </Link>
                <Link
                  to="/estimator"
                  className="px-5 py-2.5 rounded-xl glass-panel text-slate-200 hover:text-white font-semibold text-xs sm:text-sm border border-slate-700 transition-all inline-flex items-center gap-2"
                >
                  <span>Calculate Monthly Coaching Cost</span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] border border-slate-700/80 shadow-xl">
                <img
                  src="/src/assets/images/academy_training_coach_1792030419195.jpg"
                  alt="Certified badminton coach mentoring junior players"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 text-xs text-slate-300">
                  <div className="font-bold text-white">Coach Manjunath Gowda</div>
                  <div className="text-[11px] text-emerald-400">NIS & BWF Level 2 · Sahakar Nagar</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Community Matchmaker Teaser */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="text-xs text-emerald-400 font-semibold tracking-wider uppercase mb-1">
              Player Community Lobbies
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Looking for a Game Tonight?
            </h2>
          </div>
          <Link
            to="/matchmaker"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-emerald-400 hover:text-emerald-300"
          >
            <span>Open Matchmaker Hub</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl glass-card border border-slate-800 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-emerald-400 font-semibold">Football 5v5</span>
              <span className="text-slate-400">Tonight · 8:30 PM</span>
            </div>
            <h3 className="font-bold text-white text-sm">Apex Sky Turf (Indiranagar)</h3>
            <p className="text-xs text-slate-400">2 slots open for midfielders. Bibs and ball provided.</p>
            <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-xs">
              <span className="text-slate-300 font-mono">₹120 / person</span>
              <Link to="/matchmaker" className="text-emerald-400 font-semibold hover:underline">
                Join Match →
              </Link>
            </div>
          </div>

          <div className="p-5 rounded-2xl glass-card border border-slate-800 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-teal-400 font-semibold">Badminton Doubles</span>
              <span className="text-slate-400">Tomorrow · 7:00 AM</span>
            </div>
            <h3 className="font-bold text-white text-sm">Velocity Arena (Sahakar Nagar)</h3>
            <p className="text-xs text-slate-400">Looking for 1 intermediate partner for fast rally games.</p>
            <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-xs">
              <span className="text-slate-300 font-mono">₹160 / person</span>
              <Link to="/matchmaker" className="text-emerald-400 font-semibold hover:underline">
                Join Match →
              </Link>
            </div>
          </div>

          <div className="p-5 rounded-2xl glass-card border border-slate-800 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-cyan-400 font-semibold">Pickleball Mixer</span>
              <span className="text-slate-400">Saturday · 7:30 AM</span>
            </div>
            <h3 className="font-bold text-white text-sm">Pulse Hub (HSR Layout)</h3>
            <p className="text-xs text-slate-400">Friendly round-robin doubles. Beginners welcome.</p>
            <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-xs">
              <span className="text-slate-300 font-mono">₹180 / person</span>
              <Link to="/matchmaker" className="text-emerald-400 font-semibold hover:underline">
                Join Match →
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
