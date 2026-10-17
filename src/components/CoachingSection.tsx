import React, { useState } from 'react';
import { 
  GraduationCap, 
  Sparkles, 
  HelpCircle, 
  Award, 
  MapPin, 
  Calendar, 
  ChevronRight, 
  CheckCircle2,
  Users,
  Search
} from 'lucide-react';
import { Coach, COACHES_DATA, SPORTS, LOCALITIES } from '../data/sportsData';
import { CoachCard } from './CoachCard';
import { CoachTrialModal } from './CoachTrialModal';
import { SkillQuizModal, SkillLevel } from './SkillQuizModal';

interface CoachingSectionProps {
  onSelectCoach?: (coach: Coach) => void;
  selectedLocality?: string;
  initialSport?: string;
}

export const CoachingSection: React.FC<CoachingSectionProps> = ({
  onSelectCoach,
  selectedLocality = 'All Localities',
  initialSport = 'all'
}) => {
  const [selectedSport, setSelectedSport] = useState<string>(initialSport);
  const [selectedSkillLevel, setSelectedSkillLevel] = useState<string>('all');
  const [activeTrialCoach, setActiveTrialCoach] = useState<Coach | null>(null);
  const [isTrialOpen, setIsTrialOpen] = useState(false);
  
  // Standalone quiz modal trigger
  const [isHeaderQuizOpen, setIsHeaderQuizOpen] = useState(false);
  const [quizAssessedLevel, setQuizAssessedLevel] = useState<SkillLevel | null>(null);
  const [quizScore, setQuizScore] = useState<number | null>(null);

  const handleOpenTrial = (coach: Coach) => {
    setActiveTrialCoach(coach);
    setIsTrialOpen(true);
    onSelectCoach?.(coach);
  };

  const handleHeaderQuizComplete = (level: SkillLevel, score: number) => {
    setQuizAssessedLevel(level);
    setQuizScore(score);
    setSelectedSkillLevel(level);
  };

  const filteredCoaches = COACHES_DATA.filter((coach) => {
    const matchesLocality = selectedLocality === 'All Localities' || coach.locality === selectedLocality;
    const matchesSport = selectedSport === 'all' || coach.sport === selectedSport;
    const matchesLevel = selectedSkillLevel === 'all' || coach.levels.includes(selectedSkillLevel as any);
    return matchesLocality && matchesSport && matchesLevel;
  });

  return (
    <section className="space-y-6">
      {/* Quiz Banner & Callout Strip */}
      <div className="p-5 rounded-3xl bg-gradient-to-r from-orange-50 via-amber-50 to-orange-100/60 border border-orange-200/90 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start sm:items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-orange-500 text-white flex items-center justify-center shrink-0 shadow-md shadow-orange-500/20">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-extrabold text-slate-900">
                Not sure which coaching batch suits your game?
              </h3>
              <span className="text-[10px] font-bold bg-orange-600 text-white px-2 py-0.5 rounded-full uppercase tracking-wider">
                2-Min Quiz
              </span>
            </div>
            <p className="text-xs text-slate-600 mt-0.5">
              Answer 5 sport-specific questions. We will calculate your exact rating (Beginner, Intermediate, or Advanced) and auto-fill your coaching requests.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 shrink-0 self-start md:self-auto">
          {quizAssessedLevel && (
            <div className="px-3 py-1.5 rounded-xl bg-white border border-emerald-300 text-emerald-800 text-xs font-bold flex items-center gap-1.5 shadow-2xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Assessed: {quizAssessedLevel} ({quizScore}/15 pts)</span>
            </div>
          )}

          <button
            type="button"
            onClick={() => setIsHeaderQuizOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs shadow-md shadow-orange-500/20 transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
          >
            <HelpCircle className="w-4 h-4 text-white" />
            <span>Unsure? Take 2-min Quiz</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs & Skill Level Filter */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        {/* Sport selection pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          <button
            onClick={() => setSelectedSport('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer whitespace-nowrap ${
              selectedSport === 'all'
                ? 'bg-orange-500 text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            All Disciplines
          </button>
          {SPORTS.map((sport) => (
            <button
              key={sport.id}
              onClick={() => setSelectedSport(sport.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer whitespace-nowrap ${
                selectedSport === sport.id
                  ? 'bg-orange-500 text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {sport.name}
            </button>
          ))}
        </div>

        {/* Skill Level Selection Pills (Beginner, Intermediate, Advanced) */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-bold">
          <span className="text-[10px] text-slate-500 uppercase tracking-wider px-2 font-bold">Level:</span>
          {(['all', 'Beginner', 'Intermediate', 'Advanced'] as const).map((lvl) => (
            <button
              key={lvl}
              onClick={() => setSelectedSkillLevel(lvl)}
              className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer capitalize ${
                selectedSkillLevel === lvl
                  ? 'bg-white text-orange-600 shadow-2xs font-extrabold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {lvl}
            </button>
          ))}
        </div>
      </div>

      {/* Coaches Card Grid */}
      {filteredCoaches.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCoaches.map((coach) => (
            <CoachCard
              key={coach.id}
              coach={coach}
              onBookTrial={handleOpenTrial}
            />
          ))}
        </div>
      ) : (
        <div className="p-12 text-center rounded-3xl bg-white border border-slate-200 shadow-xs">
          <GraduationCap className="w-10 h-10 text-slate-400 mx-auto mb-3" />
          <h4 className="text-base font-bold text-slate-900">No academy coaches found for this level</h4>
          <p className="text-xs text-slate-500 mt-1 mb-4">
            Try switching skill levels or disciplines to see all Bengaluru trainers.
          </p>
          <button
            onClick={() => {
              setSelectedSport('all');
              setSelectedSkillLevel('all');
            }}
            className="px-4 py-2 text-xs font-bold rounded-xl bg-orange-500 text-white"
          >
            Reset Coaching Filters
          </button>
        </div>
      )}

      {/* Coach Trial Request Modal with Skill Quiz */}
      <CoachTrialModal
        coach={activeTrialCoach}
        isOpen={isTrialOpen}
        onClose={() => {
          setIsTrialOpen(false);
          setActiveTrialCoach(null);
        }}
      />

      {/* Standalone Skill Quiz Modal */}
      <SkillQuizModal
        isOpen={isHeaderQuizOpen}
        onClose={() => setIsHeaderQuizOpen(false)}
        sport={selectedSport !== 'all' ? selectedSport : 'Badminton'}
        onSelectLevel={handleHeaderQuizComplete}
      />
    </section>
  );
};
