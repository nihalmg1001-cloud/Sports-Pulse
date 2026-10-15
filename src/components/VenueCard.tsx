import React, { useState } from 'react';
import { 
  Star, 
  MapPin, 
  Navigation, 
  Layers, 
  Clock, 
  CalendarCheck,
  Check
} from 'lucide-react';
import { Venue } from '../data/sportsData';

interface VenueCardProps {
  venue: Venue;
  onBook: (venue: Venue) => void;
  onSelectLocality?: (locality: string) => void;
}

export const VenueCard: React.FC<VenueCardProps> = ({
  venue,
  onBook,
  onSelectLocality
}) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="glass-card glass-card-hover rounded-2xl overflow-hidden flex flex-col h-full border border-slate-800/80 group">
      
      {/* Image Container with measured scrim */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900">
        {!imageError ? (
          <img
            src={venue.imageUrl}
            alt={`${venue.name} court facility in ${venue.locality}`}
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950/40 p-4 text-center">
            <Layers className="w-8 h-8 text-emerald-400/80 mb-2" />
            <span className="text-xs font-semibold text-slate-300">{venue.name}</span>
            <span className="text-[11px] text-slate-500">{venue.surfaceType}</span>
          </div>
        )}

        {/* Gradient Scrim for Contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-90" />

        {/* Top Badges: Distance & Featured */}
        <div className="absolute top-3 inset-x-3 flex items-center justify-between gap-2 pointer-events-none">
          <div className="px-2.5 py-1 rounded-md bg-slate-950/80 backdrop-blur-md border border-slate-700/50 text-[11px] font-medium text-slate-200 flex items-center gap-1 shadow-sm">
            <Navigation className="w-3 h-3 text-emerald-400" />
            <span>{venue.distanceKm} km away</span>
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-950/80 backdrop-blur-md border border-slate-700/50 text-[11px] font-semibold text-emerald-300">
            <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
            <span className="font-mono tabular-nums">{venue.rating}</span>
            <span className="text-slate-400 text-[10px]">({venue.reviewsCount})</span>
          </div>
        </div>

        {/* Bottom Court Type Indicator */}
        <div className="absolute bottom-3 left-3 right-3 text-left">
          <div className="text-[11px] font-medium text-emerald-400 tracking-wide">
            {venue.sports.join(' · ')}
          </div>
          <h3 className="text-base sm:text-lg font-bold text-white tracking-tight line-clamp-1 group-hover:text-emerald-300 transition-colors">
            {venue.name}
          </h3>
        </div>
      </div>

      {/* Body Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
        
        {/* Locality & Address */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <button
              onClick={() => onSelectLocality?.(venue.locality)}
              className="flex items-center gap-1 text-slate-300 hover:text-emerald-400 transition-colors text-left"
            >
              <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span className="font-medium underline-offset-2 hover:underline">{venue.locality}</span>
            </button>
            <span className="text-[11px] text-slate-500 font-mono tabular-nums">
              {venue.courtsCount} {venue.courtsCount > 1 ? 'Courts' : 'Court'}
            </span>
          </div>

          <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
            {venue.tagline}
          </p>
        </div>

        {/* Surface & Key Amenities */}
        <div className="space-y-2 pt-2 border-t border-slate-800/60">
          <div className="text-[11px] text-slate-300 flex items-start gap-1.5">
            <Layers className="w-3.5 h-3.5 text-teal-400 shrink-0 mt-0.5" />
            <span className="line-clamp-1 text-slate-300">{venue.surfaceType}</span>
          </div>

          <div className="flex items-center gap-1.5 text-[11px] text-slate-400 flex-wrap">
            {venue.amenities.slice(0, 3).map((amenity) => (
              <span key={amenity} className="inline-flex items-center gap-1 text-slate-400">
                <Check className="w-3 h-3 text-emerald-500" />
                <span>{amenity}</span>
              </span>
            ))}
            {venue.amenities.length > 3 && (
              <span className="text-slate-500 text-[10px]">
                +{venue.amenities.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Pricing & Booking CTA Footer */}
        <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-3">
          <div>
            <div className="text-[10px] text-slate-500 uppercase tracking-wider">Hourly Rate</div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-extrabold text-white font-mono tabular-nums">
                ₹{venue.pricePerHour}
              </span>
              <span className="text-xs text-slate-400">/hr</span>
              {venue.originalPricePerHour && (
                <span className="text-xs text-slate-500 line-through font-mono tabular-nums">
                  ₹{venue.originalPricePerHour}
                </span>
              )}
            </div>
          </div>

          <button
            onClick={() => onBook(venue)}
            className="px-4 py-2 text-xs font-semibold rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 shadow-md shadow-emerald-500/20 transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap group-hover:scale-102"
          >
            <CalendarCheck className="w-3.5 h-3.5 text-slate-950" />
            <span>Book Court</span>
          </button>
        </div>

      </div>
    </div>
  );
};
