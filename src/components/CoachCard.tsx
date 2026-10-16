import React, { useState } from 'react';
import { 
  Star, 
  MapPin, 
  Award, 
  Users, 
  Calendar, 
  Check, 
  Clock,
  GraduationCap
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
    <div className="bg-white rounded-2xl overflow-hidden flex flex-col h-full border border-slate-200 shadow-xs hover:shadow-xl hover:border-orange-500 transition-all duration-300 group">
      
      {/* Top Banner & Photo */}
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100">
        {!imageError ? (
          <img
            src={coach.imageUrl}
            alt={`${coach.name} coaching session at ${coach.academyName}`}
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-slate-100 p-4">
            <Award className="w-8 h-8 text-orange-500 mb-2" />
            <span className="text-xs font-semibold text-slate-800">{coach.name}</span>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20" />

        {/* Top Badges */}
        <div className="absolute top-3 inset-x-3 flex items-center justify-between pointer-events-none">
          <div className="px-2.5 py-1 rounded-md bg-white/95 backdrop-blur-md border border-slate-200 text-[11px] font-extrabold text-orange-600 shadow-xs">
            {coach.sport} Academy
          </div>

          <div className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-white/95 backdrop-blur-md border border-slate-200 text-[11px] font-bold text-slate-900 shadow-xs">
            <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
            <span className="font-mono tabular-nums">{coach.rating}</span>
            <span className="text-slate-500 text-[10px]">({coach.reviewsCount})</span>
          </div>
        </div>

        {/* Coach Name Overlay */}
        <div className="absolute bottom-3 left-4 right-4">
          <h3 className="text-lg font-extrabold text-white tracking-tight drop-shadow-sm">
            {coach.name}
          </h3>
          <p className="text-xs text-orange-300 font-semibold drop-shadow-sm">
            {coach.role}
          </p>
        </div>
      </div>

      {/* Body Info */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
        
        {/* CLEAR SEPARATION BADGE: COACHING PROGRAM (Requirement 2) */}
        <div className="flex items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-orange-50 border border-orange-200 text-orange-800 text-[11px] font-extrabold tracking-wide">
            <GraduationCap className="w-3.5 h-3.5 text-orange-600" />
            <span>Structured Coaching & Academy Batches</span>
          </span>
          <span className="text-[11px] text-slate-500 font-mono font-semibold">
            {coach.activeStudents} Trainees
          </span>
        </div>

        {/* Academy and Locality */}
        <div className="space-y-1.5">
          <div className="text-xs font-bold text-slate-900">
            {coach.academyName}
          </div>
          <div className="flex items-center justify-between text-xs text-slate-600">
            <div className="flex items-center gap-1 font-medium">
              <MapPin className="w-3.5 h-3.5 text-orange-500 shrink-0" />
              <span>{coach.locality}, Bengaluru</span>
            </div>
            <div className="flex items-center gap-1 font-semibold text-slate-600 text-[11px]">
              <Users className="w-3.5 h-3.5 text-blue-600" />
              <span>{coach.ageGroups.join(' · ')}</span>
            </div>
          </div>
        </div>

        {/* Highlights & Scope */}
        <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
          <div className="flex items-center gap-1.5 text-slate-700 text-[11px] font-semibold">
            <Award className="w-3.5 h-3.5 text-orange-500 shrink-0" />
            <span className="text-slate-900">{coach.experienceYears} Years Exp</span>
            <span className="text-slate-400">·</span>
            <span className="text-slate-600 truncate">{coach.certifications[0]}</span>
          </div>

          <div className="space-y-1">
            {coach.highlights.slice(0, 2).map((item, idx) => (
              <div key={idx} className="flex items-start gap-1.5 text-[11px] text-slate-600">
                <Check className="w-3 h-3 text-emerald-600 shrink-0 mt-0.5" />
                <span className="line-clamp-1">{item}</span>
              </div>
            ))}
          </div>

          <div className="pt-1 flex items-center gap-1 text-[11px] text-slate-500">
            <Clock className="w-3 h-3 text-blue-600 shrink-0" />
            <span className="truncate">{coach.batchSchedule}</span>
          </div>
        </div>

        {/* Pricing & Trial CTA */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
          <div>
            <div className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Monthly Training Fee</div>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-extrabold text-orange-600 font-mono tabular-nums">
                ₹{coach.monthlyFee.toLocaleString('en-IN')}
              </span>
              <span className="text-xs text-slate-500 font-medium">/mo</span>
            </div>
          </div>

          <button
            onClick={() => onBookTrial(coach)}
            className="px-4 py-2 text-xs font-bold rounded-xl bg-orange-500 hover:bg-orange-600 text-white shadow-md shadow-orange-500/20 transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap group-hover:scale-102"
          >
            <Calendar className="w-3.5 h-3.5 text-white" />
            <span>Book Trial</span>
          </button>
        </div>

      </div>
    </div>
  );
};
