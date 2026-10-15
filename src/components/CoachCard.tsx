import React, { useState } from 'react';
import { 
  Star, 
  MapPin, 
  Award, 
  Users, 
  Calendar, 
  Check, 
  Clock,
  Sparkles
} from 'lucide-react';
import { Coach } from '../data/sportsData';

interface CoachCardProps {
  coach: Coach;
  onBookTrial: (coach: Coach) => void;
}

export const CoachCard: React.FC<CoachCardProps> = ({
  coach,
  onBookTrial
}) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="glass-card glass-card-hover rounded-2xl overflow-hidden flex flex-col h-full border border-slate-800/80 group">
      
      {/* Top Banner & Photo */}
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-900">
        {!imageError ? (
          <img
            src={coach.imageUrl}
            alt={`${coach.name} coaching session at ${coach.academyName}`}
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950/40 p-4">
            <Award className="w-8 h-8 text-emerald-400 mb-2" />
            <span className="text-xs font-semibold text-slate-200">{coach.name}</span>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent opacity-95" />

        {/* Top Badges */}
        <div className="absolute top-3 inset-x-3 flex items-center justify-between pointer-events-none">
          <div className="px-2.5 py-1 rounded-md bg-slate-950/80 backdrop-blur-md border border-slate-700/50 text-[11px] font-medium text-emerald-300">
            {coach.sport} Academy
          </div>

          <div className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-950/80 backdrop-blur-md border border-slate-700/50 text-[11px] font-semibold text-white">
            <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
            <span className="font-mono tabular-nums">{coach.rating}</span>
            <span className="text-slate-400 text-[10px]">({coach.reviewsCount})</span>
          </div>
        </div>

        {/* Coach Name Overlay */}
        <div className="absolute bottom-3 left-4 right-4">
          <h3 className="text-lg font-bold text-white tracking-tight group-hover:text-emerald-300 transition-colors">
            {coach.name}
          </h3>
          <p className="text-xs text-emerald-400 font-medium">
            {coach.role}
          </p>
        </div>
      </div>

      {/* Body Info */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
        
        {/* Academy and Locality */}
        <div className="space-y-1.5">
          <div className="text-xs font-semibold text-slate-200">
            {coach.academyName}
          </div>
          <div className="flex items-center justify-between text-xs text-slate-400">
            <div className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>{coach.locality}, Bengaluru</span>
            </div>
            <div className="flex items-center gap-1 font-mono tabular-nums text-slate-300 text-[11px]">
              <Users className="w-3.5 h-3.5 text-slate-400" />
              <span>{coach.activeStudents} Active Trainees</span>
            </div>
          </div>
        </div>

        {/* Highlights & Scope */}
        <div className="space-y-2 pt-2 border-t border-slate-800/60 text-xs">
          <div className="flex items-center gap-1.5 text-slate-300 text-[11px]">
            <Award className="w-3.5 h-3.5 text-teal-400 shrink-0" />
            <span className="font-medium text-slate-200">{coach.experienceYears} Years Coaching</span>
            <span className="text-slate-500">·</span>
            <span className="text-slate-400">{coach.certifications[0]}</span>
          </div>

          <div className="space-y-1">
            {coach.highlights.slice(0, 2).map((item, idx) => (
              <div key={idx} className="flex items-start gap-1.5 text-[11px] text-slate-400">
                <Check className="w-3 h-3 text-emerald-400 shrink-0 mt-0.5" />
                <span className="line-clamp-1">{item}</span>
              </div>
            ))}
          </div>

          <div className="pt-1 flex items-center gap-1 text-[11px] text-slate-400">
            <Clock className="w-3 h-3 text-cyan-400 shrink-0" />
            <span className="truncate">{coach.batchSchedule}</span>
          </div>
        </div>

        {/* Pricing & Trial CTA */}
        <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-3">
          <div>
            <div className="text-[10px] text-slate-500 uppercase tracking-wider">Monthly Training Fee</div>
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-extrabold text-white font-mono tabular-nums">
                ₹{coach.monthlyFee.toLocaleString('en-IN')}
              </span>
              <span className="text-xs text-slate-400">/mo</span>
            </div>
          </div>

          <button
            onClick={() => onBookTrial(coach)}
            className="px-3.5 py-2 text-xs font-semibold rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 shadow-md shadow-emerald-500/20 transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
          >
            <Calendar className="w-3.5 h-3.5 text-slate-950" />
            <span>Book Trial Class</span>
          </button>
        </div>

      </div>
    </div>
  );
};
