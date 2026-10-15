import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Search, 
  MapPin, 
  SlidersHorizontal, 
  RotateCcw, 
  Check, 
  Sparkles, 
  Layers,
  ChevronDown,
  Navigation
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
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="text-xs text-emerald-400 font-semibold tracking-wider uppercase mb-1 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Bengaluru Sports Directory</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Find Sports Venues & Courts
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Filter by sport type, Bengaluru locality, price, and tournament-grade amenities.
          </p>
        </div>

        <button
          onClick={handleResetFilters}
          className="self-start md:self-auto flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-400 hover:text-white glass-card transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset All Filters</span>
        </button>
      </div>

      {/* Main Dual-Filter Bar & Controls Panel */}
      <div className="glass-panel rounded-2xl p-5 sm:p-6 border border-slate-800 space-y-6">
        
        {/* Top Search Bar & Sort */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          <div className="md:col-span-8 flex items-center gap-2.5 px-3.5 py-2.5 bg-slate-900 rounded-xl border border-slate-700/60">
            <Search className="w-4 h-4 text-emerald-400 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by court name, turf, street, or landmark (e.g., 100ft road, BWF, floodlights)..."
              className="w-full bg-transparent text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none"
            />
          </div>

          <div className="md:col-span-4 flex items-center gap-2">
            <span className="text-xs text-slate-400 whitespace-nowrap">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700/60 text-slate-200 text-xs focus:outline-none focus:border-emerald-500 cursor-pointer"
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
          <label className="block text-xs font-semibold text-slate-300 mb-2">
            Sport Discipline
          </label>
          <div className="flex flex-wrap gap-2">
            {SPORTS.map((sport) => (
              <button
                key={sport.id}
                onClick={() => setSelectedSport(sport.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                  selectedSport === sport.id
                    ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20'
                    : 'bg-slate-900/80 text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700'
                }`}
              >
                {sport.name}
              </button>
            ))}
          </div>
        </div>

        {/* Dual Filter Row 2: Locality Area Selection */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-2">
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
                className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                  selectedLocality === loc
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                    : 'bg-slate-900/80 text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700'
                }`}
              >
                <MapPin className="w-3 h-3" />
                <span>{loc}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Dual Filter Row 3: Price Slider & Amenities */}
        <div className="pt-2 border-t border-slate-800/80 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          
          {/* Price Range Slider (₹200 - ₹2000/hr) */}
          <div className="md:col-span-5 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-slate-300">Max Hourly Price Range</span>
              <span className="font-mono font-bold text-emerald-400">Up to ₹{maxPrice}/hr</span>
            </div>
            <input
              type="range"
              min="200"
              max="2000"
              step="50"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-emerald-400 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>₹200/hr</span>
              <span>₹1,100/hr</span>
              <span>₹2,000/hr</span>
            </div>
          </div>

          {/* Amenities Multi-Select Filter */}
          <div className="md:col-span-7 space-y-2">
            <span className="text-xs font-semibold text-slate-300 block">
              Amenities & Court Features
            </span>
            <div className="flex flex-wrap gap-1.5">
              {availableAmenities.map((amenity) => {
                const active = selectedAmenities.includes(amenity);
                return (
                  <button
                    key={amenity}
                    onClick={() => toggleAmenity(amenity)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors flex items-center gap-1 cursor-pointer ${
                      active
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50'
                        : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200'
                    }`}
                  >
                    {active && <Check className="w-3 h-3 text-emerald-400" />}
                    <span>{amenity}</span>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

      </div>

      {/* Results Count & Active Pills summary */}
      <div className="flex items-center justify-between text-xs text-slate-400">
        <div>
          Showing <span className="font-bold text-white font-mono">{filteredVenues.length}</span> verified venues in Bengaluru
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
        <div className="p-16 rounded-2xl glass-card border border-slate-800 text-center space-y-3">
          <Layers className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="text-lg font-bold text-white">No Venues Found</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            We couldn&apos;t find any courts matching your exact combination of sport, locality, and price limit.
          </p>
          <button
            onClick={handleResetFilters}
            className="px-4 py-2 rounded-xl bg-emerald-400 text-slate-950 font-bold text-xs"
          >
            Reset All Filters
          </button>
        </div>
      )}

    </div>
  );
};
