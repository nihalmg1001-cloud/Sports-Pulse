import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  Search, 
  MapPin, 
  SlidersHorizontal, 
  RotateCcw, 
  Check, 
  Sparkles, 
  Layers,
  ChevronDown,
  Navigation,
  Zap,
  CalendarCheck
} from 'lucide-react';
import { Venue, VENUES_DATA, SPORTS, LOCALITIES } from '../data/sportsData';
import { VenueCard } from '../components/VenueCard';

interface FindVenuesProps {
  onBookVenue: (venue: Venue) => void;
  currentLocality: string;
  onLocalityChange: (locality: string) => void;
}

export const FindVenues: React.FC<FindVenuesProps> = ({
  onBookVenue,
  currentLocality,
  onLocalityChange
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Read initial query params
  const initialSport = searchParams.get('sport') || 'all';
  const initialLocality = searchParams.get('locality') || (currentLocality !== 'All Localities' ? currentLocality : 'All Localities');
  const initialQuery = searchParams.get('q') || '';

  const [selectedSport, setSelectedSport] = useState<string>(initialSport);
  const [selectedLocality, setSelectedLocality] = useState<string>(initialLocality);
  const [searchQuery, setSearchQuery] = useState<string>(initialQuery);
  const [maxPrice, setMaxPrice] = useState<number>(1500);
  const [sortBy, setSortBy] = useState<'rating' | 'price-asc' | 'price-desc' | 'distance'>('rating');
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  const availableAmenities = [
    'Floodlights',
    'Ample Parking',
    'Showers',
    'Locker Rooms',
    'Pro Shop',
    'Equipment Rental',
    'Drinking Water'
  ];

  // Sync with prop if changed from Navbar
  useEffect(() => {
    if (currentLocality !== 'All Localities') {
      setSelectedLocality(currentLocality);
    }
  }, [currentLocality]);

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities(prev =>
      prev.includes(amenity) ? prev.filter(a => a !== amenity) : [...prev, amenity]
    );
  };

  const handleResetFilters = () => {
    setSelectedSport('all');
    setSelectedLocality('All Localities');
    setSearchQuery('');
    setMaxPrice(1500);
    setSortBy('rating');
    setSelectedAmenities([]);
    setSearchParams({});
    onLocalityChange('All Localities');
  };

  // Filter and Sort calculation
  const filteredVenues = useMemo(() => {
    return VENUES_DATA.filter((venue) => {
      // Sport Dual-filter
      if (selectedSport !== 'all' && !venue.sports.includes(selectedSport)) {
        return false;
      }

      // Locality Dual-filter
      if (selectedLocality !== 'All Localities' && venue.locality !== selectedLocality) {
        return false;
      }

      // Price slider filter (₹200 - ₹2000/hr)
      if (venue.pricePerHour > maxPrice) {
        return false;
      }

      // Search keyword filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = venue.name.toLowerCase().includes(query);
        const matchesTagline = venue.tagline.toLowerCase().includes(query);
        const matchesAddress = venue.address.toLowerCase().includes(query);
        const matchesLocality = venue.locality.toLowerCase().includes(query);
        const matchesSport = venue.sports.some(s => s.toLowerCase().includes(query));
        if (!matchesName && !matchesTagline && !matchesAddress && !matchesLocality && !matchesSport) {
          return false;
        }
      }

      // Amenities filter
      if (selectedAmenities.length > 0) {
        const hasAllAmenities = selectedAmenities.every(a => venue.amenities.includes(a));
        if (!hasAllAmenities) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'price-asc') return a.pricePerHour - b.pricePerHour;
      if (sortBy === 'price-desc') return b.pricePerHour - a.pricePerHour;
      if (sortBy === 'distance') return a.distanceKm - b.distanceKm;
      return 0;
    });
  }, [selectedSport, selectedLocality, maxPrice, searchQuery, selectedAmenities, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* MODE BANNER: COURT SLOT BOOKING (Requirement 2) */}
      <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-sm">
            <CalendarCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-extrabold text-blue-900 uppercase tracking-wider flex items-center gap-1.5">
              <span>Mode 1: Court Slot Booking (Casual Play)</span>
            </div>
            <div className="text-xs text-blue-700">
              Renting courts for self-play without a trainer. Looking for a coach or academy batch instead?
            </div>
          </div>
        </div>

        <Link
          to="/coaches"
          className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-orange-50 text-orange-600 hover:text-orange-700 text-xs font-bold border border-orange-200 transition-colors shadow-2xs whitespace-nowrap self-start sm:self-auto"
        >
          Switch to Coaching & Academies →
        </Link>
      </div>

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="text-xs text-blue-600 font-bold tracking-wider uppercase mb-1 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-orange-500" />
            <span>Bengaluru Sports Directory</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Find Sports Venues & Courts
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Filter by sport discipline, Bengaluru neighborhood, hourly price, and tournament-grade amenities.
          </p>
        </div>

        <button
          onClick={handleResetFilters}
          className="self-start md:self-auto flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 hover:bg-slate-100 transition-colors cursor-pointer shadow-2xs"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset All Filters</span>
        </button>
      </div>

      {/* Main Dual-Filter Bar & Controls Panel (Light & Vibrant) */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-6">
        
        {/* Top Search Bar & Sort */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          <div className="md:col-span-8 flex items-center gap-2.5 px-3.5 py-2.5 bg-slate-50 rounded-xl border border-slate-200">
            <Search className="w-4 h-4 text-blue-600 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by court name, turf, street, or landmark (e.g., Indiranagar, BWF, floodlights)..."
              className="w-full bg-transparent text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none font-medium"
            />
          </div>

          <div className="md:col-span-4 flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-500 whitespace-nowrap">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-semibold focus:outline-none focus:border-blue-600 cursor-pointer"
            >
              <option value="rating">Top Rated (Highest First)</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="distance">Nearest Distance</option>
            </select>
          </div>
        </div>

        {/* Dual Filter Row 1: Sport Selection */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            Sport Discipline
          </label>
          <div className="flex flex-wrap gap-2">
            {SPORTS.map((sport) => (
              <button
                key={sport.id}
                onClick={() => setSelectedSport(sport.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedSport === sport.id
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-slate-50 text-slate-700 hover:text-slate-900 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {sport.name}
              </button>
            ))}
          </div>
        </div>

        {/* Dual Filter Row 2: Locality Area Selection */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            Locality / Neighborhood in Bengaluru
          </label>
          <div className="flex flex-wrap gap-2">
            {LOCALITIES.map((loc) => (
              <button
                key={loc}
                onClick={() => {
                  setSelectedLocality(loc);
                  onLocalityChange(loc);
                }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  selectedLocality === loc
                    ? 'bg-orange-500 text-white shadow-sm'
                    : 'bg-slate-50 text-slate-700 hover:text-slate-900 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                <MapPin className="w-3 h-3 text-orange-400" />
                <span>{loc}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Dual Filter Row 3: Price Slider & Amenities */}
        <div className="pt-4 border-t border-slate-100 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          
          {/* Price Range Slider (₹200 - ₹2000/hr) */}
          <div className="md:col-span-5 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-700">Max Hourly Price Range</span>
              <span className="font-mono font-extrabold text-blue-700 text-sm">Up to ₹{maxPrice}/hr</span>
            </div>
            <input
              type="range"
              min="200"
              max="2000"
              step="50"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-500 font-mono font-semibold">
              <span>₹200/hr</span>
              <span>₹1,100/hr</span>
              <span>₹2,000/hr</span>
            </div>
          </div>

          {/* Amenities Multi-Select Filter */}
          <div className="md:col-span-7 space-y-2">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
              Amenities & Court Features
            </span>
            <div className="flex flex-wrap gap-1.5">
              {availableAmenities.map((amenity) => {
                const active = selectedAmenities.includes(amenity);
                return (
                  <button
                    key={amenity}
                    onClick={() => toggleAmenity(amenity)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1 cursor-pointer ${
                      active
                        ? 'bg-blue-50 text-blue-700 border border-blue-300 font-bold'
                        : 'bg-slate-50 text-slate-600 border border-slate-200 hover:text-slate-900'
                    }`}
                  >
                    {active && <Check className="w-3 h-3 text-blue-600 stroke-[3]" />}
                    <span>{amenity}</span>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

      </div>

      {/* Results Count summary */}
      <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
        <div>
          Showing <span className="font-extrabold text-slate-900 font-mono">{filteredVenues.length}</span> verified venues in Bengaluru
          {selectedLocality !== 'All Localities' && ` in ${selectedLocality}`}
          {selectedSport !== 'all' && ` for ${selectedSport}`}
        </div>
      </div>

      {/* Venues Grid */}
      {filteredVenues.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVenues.map((venue) => (
            <VenueCard
              key={venue.id}
              venue={venue}
              onBook={onBookVenue}
              onSelectLocality={(loc) => {
                setSelectedLocality(loc);
                onLocalityChange(loc);
              }}
            />
          ))}
        </div>
      ) : (
        <div className="p-16 rounded-3xl bg-white border border-slate-200 text-center space-y-3 shadow-sm">
          <Layers className="w-12 h-12 text-slate-400 mx-auto" />
          <h3 className="text-lg font-extrabold text-slate-900">No Venues Found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            We couldn&apos;t find any courts matching your exact combination of sport, locality, and price limit.
          </p>
          <button
            onClick={handleResetFilters}
            className="px-4 py-2 rounded-xl bg-blue-600 text-white font-bold text-xs shadow-sm hover:bg-blue-700"
          >
            Reset All Filters
          </button>
        </div>
      )}

    </div>
  );
};
