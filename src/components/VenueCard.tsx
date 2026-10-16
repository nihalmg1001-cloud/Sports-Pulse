import React, { useState } from 'react';
import { 
  Star, 
  MapPin, 
  Navigation, 
  Layers, 
  CalendarCheck,
  Check,
  Zap
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
    <div className="bg-white rounded-2xl overflow-hidden flex flex-col h-full border border-slate-200 shadow-xs hover:shadow-xl hover:border-blue-500 transition-all duration-300 group">
      
      {/* Image Container with measured scrim */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
        {!imageError ? (
          <img
            src={venue.imageUrl}
            alt={`${venue.name} court facility in ${venue.locality}`}
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-slate-100 p-4 text-center">
            <Layers className="w-8 h-8 text-blue-600 mb-2" />
            <span className="text-xs font-semibold text-slate-800">{venue.name}</span>
            <span className="text-[11px] text-slate-500">{venue.surfaceType}</span>
          </div>
        )}

        {/* Gradient Scrim for Contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20" />

        {/* Top Badges: Distance & Rating */}
        <div className="absolute top-3 inset-x-3 flex items-center justify-between gap-2 pointer-events-none">
          <div className="px-2.5 py-1 rounded-md bg-white/95 backdrop-blur-md border border-slate-200 text-[11px] font-bold text-slate-800 flex items-center gap-1 shadow-xs">
            <Navigation className="w-3 h-3 text-blue-600" />
            <span>{venue.distanceKm} km away</span>
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/95 backdrop-blur-md border border-slate-200 text-[11px] font-bold text-slate-900 shadow-xs">
            <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
            <span className="font-mono tabular-nums">{venue.rating}</span>
            <span className="text-slate-500 text-[10px]">({venue.reviewsCount})</span>
          </div>
        </div>

        {/* Bottom Title Overlay */}
        <div className="absolute bottom-3 left-3 right-3 text-left">
          <div className="text-[11px] font-bold text-orange-400 tracking-wide uppercase">
            {venue.sports.join(' · ')}
          </div>
          <h3 className="text-base sm:text-lg font-extrabold text-white tracking-tight line-clamp-1 drop-shadow-sm">
            {venue.name}
          </h3>
        </div>
      </div>

      {/* Body Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
        
        {/* CLEAR SEPARATION BADGE: COURT SLOT ONLY (Requirement 2) */}
        <div className="flex items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-50 border border-blue-200 text-blue-700 text-[11px] font-extrabold tracking-wide">
            <Zap className="w-3 h-3 text-blue-600" />
            <span>Court Slot Booking (Self-Play · No Trainer)</span>
          </span>
          <span className="text-[11px] text-slate-500 font-mono font-semibold">
            {venue.courtsCount} {venue.courtsCount > 1 ? 'Courts' : 'Court'}
          </span>
        </div>

        {/* Locality & Address */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs text-slate-600">
            <button
              onClick={() => onSelectLocality?.(venue.locality)}
              className="flex items-center gap-1 text-slate-700 hover:text-blue-600 font-semibold transition-colors text-left cursor-pointer"
            >
              <MapPin className="w-3.5 h-3.5 text-orange-500 shrink-0" />
              <span className="underline-offset-2 hover:underline">{venue.locality}, Bengaluru</span>
            </button>
          </div>

          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
            {venue.tagline}
          </p>
        </div>

        {/* Surface & Key Amenities */}
        <div className="space-y-2 pt-2 border-t border-slate-100">
          <div className="text-[11px] text-slate-700 flex items-start gap-1.5 font-medium">
            <Layers className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
            <span className="line-clamp-1">{venue.surfaceType}</span>
          </div>

          <div className="flex items-center gap-1.5 text-[11px] text-slate-600 flex-wrap">
            {venue.amenities.slice(0, 3).map((amenity) => (
              <span key={amenity} className="inline-flex items-center gap-1">
                <Check className="w-3 h-3 text-emerald-600" />
                <span>{amenity}</span>
              </span>
            ))}
            {venue.amenities.length > 3 && (
              <span className="text-slate-400 text-[10px]">
                +{venue.amenities.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Pricing & Booking CTA Footer */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
          <div>
            <div className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Hourly Court Slot</div>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-extrabold text-blue-700 font-mono tabular-nums">
                ₹{venue.pricePerHour}
              </span>
              <span className="text-xs text-slate-500 font-medium">/hr</span>
              {venue.originalPricePerHour && (
                <span className="text-xs text-slate-400 line-through font-mono tabular-nums ml-1">
                  ₹{venue.originalPricePerHour}
                </span>
              )}
            </div>
          </div>

          <button
            onClick={() => onBook(venue)}
            className="px-4 py-2 text-xs font-bold rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20 transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap group-hover:scale-102"
          >
            <CalendarCheck className="w-3.5 h-3.5 text-white" />
            <span>Book Slot</span>
          </button>
        </div>

      </div>
    </div>
  );
};
