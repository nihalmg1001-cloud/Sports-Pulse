import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  Award, 
  MapPin, 
  Search, 
  Sparkles, 
  Users, 
  ShieldCheck, 
  Calendar, 
  Check, 
  RotateCcw,
  BookOpen,
  GraduationCap
} from 'lucide-react';
import { Coach, COACHES_DATA, SPORTS, LOCALITIES } from '../data/sportsData';
import { CoachCard } from '../components/CoachCard';
import { CoachTrialModal } from '../components/CoachTrialModal';
import { SkillQuiz, SkillQuizModal, SkillLevel } from '../components/SkillQuiz';
import { CoachingSection } from '../components/CoachingSection';

export const Coaches: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'match' | 'browse'>('match');
  const [selectedSport, setSelectedSport] = useState<string>('all');
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<string>('all');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [selectedLocality, setSelectedLocality] = useState<string>('All Localities');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Standalone skill assessment quiz
  const [isQuizModalOpen, setIsQuizModalOpen] = useState<boolean>(false);
  const [evaluatedScore, setEvaluatedScore] = useState<number | null>(null);

  // Selected coach for trial modal
  const [activeTrialCoach, setActiveTrialCoach] = useState<Coach | null>(null);
  const [isTrialModalOpen, setIsTrialModalOpen] = useState<boolean>(false);

  const handleOpenTrial = (coach: Coach) => {
    setActiveTrialCoach(coach);
    setIsTrialModalOpen(true);
  };

  const handleResetFilters = () => {
    setSelectedSport('all');
    setSelectedAgeGroup('all');
    setSelectedLevel('all');
    setSelectedLocality('All Localities');
    setSearchQuery('');
  };

  const filteredCoaches = useMemo(() => {
    return COACHES_DATA.filter((coach) => {
      if (selectedSport !== 'all' && coach.sport !== selectedSport) {
        return false;
      }
      if (selectedAgeGroup !== 'all' && !coach.ageGroups.includes(selectedAgeGroup as any)) {
        return false;
      }
      if (selectedLevel !== 'all' && !coach.levels.includes(selectedLevel as any)) {
        return false;
      }
      if (selectedLocality !== 'All Localities' && coach.locality !== selectedLocality) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = coach.name.toLowerCase().includes(q);
        const matchesAcademy = coach.academyName.toLowerCase().includes(q);
        const matchesRole = coach.role.toLowerCase().includes(q);
        const matchesSport = coach.sport.toLowerCase().includes(q);
        if (!matchesName && !matchesAcademy && !matchesRole && !matchesSport) return false;
      }
      return true;
    });
  }, [selectedSport, selectedAgeGroup, selectedLevel, selectedLocality, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* MODE BANNER: COACHING & TRAINING (Requirement 2) */}
      <div className="p-4 rounded-2xl bg-orange-50 border border-orange-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-orange-500 text-white flex items-center justify-center shrink-0 shadow-sm">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-extrabold text-orange-950 uppercase tracking-wider flex items-center gap-1.5">
              <span>Mode 2: Coaching & Training Academies</span>
            </div>
            <div className="text-xs text-orange-800">
              Enrolling in structured training programs and hiring certified mentors. Looking to casually book an empty court instead?
            </div>
          </div>
        </div>

        <Link
          to="/venues"
          className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-blue-50 text-blue-600 hover:text-blue-700 text-xs font-bold border border-blue-200 transition-colors shadow-2xs whitespace-nowrap self-start sm:self-auto"
        >
          Switch to Court Slot Booking →
        </Link>
      </div>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="text-xs text-orange-600 font-bold tracking-wider uppercase mb-1 flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-orange-500" />
            <span>Bengaluru Coaching Guild</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Academies & Certified Coaches
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Learn from state champions, NIS diploma holders, and BWF/ITF certified instructors with monthly fee breakdowns and trial evaluations.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto">
          {/* Tab Switcher: Coach Matching & Skill Assessment vs Browse Directory */}
          <div className="flex items-center p-1 rounded-2xl bg-slate-100 border border-slate-200">
            <button
              onClick={() => setActiveTab('match')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                activeTab === 'match'
                  ? 'bg-orange-500 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Coach Match & Quiz
            </button>
            <button
              onClick={() => setActiveTab('browse')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                activeTab === 'browse'
                  ? 'bg-orange-500 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Academies
            </button>
          </div>

          {activeTab === 'browse' && (
            <button
              onClick={handleResetFilters}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 hover:bg-slate-100 transition-colors cursor-pointer shadow-2xs"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {activeTab === 'match' ? (
        <CoachingSection
          onSelectCoach={handleOpenTrial}
          selectedLocality={selectedLocality !== 'All Localities' ? selectedLocality : 'Sahakar Nagar'}
          initialSport={selectedSport !== 'all' ? selectedSport : 'Badminton'}
        />
      ) : (
        <>
          {/* Filter Matrix Card (Light Theme) */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-5">
        
        {/* Search */}
        <div className="flex items-center gap-2.5 px-3.5 py-2.5 bg-slate-50 rounded-xl border border-slate-200">
          <Search className="w-4 h-4 text-orange-500 shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search coach name, academy, or specialty (e.g., footwork, biomechanics, junior)..."
            className="w-full bg-transparent text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none font-medium"
          />
        </div>

        {/* Sport selection */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            Sport Discipline
          </label>
          <div className="flex flex-wrap gap-2">
            {SPORTS.map((sport) => (
              <button
                key={sport.id}
                onClick={() => setSelectedSport(sport.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedSport === sport.id
                    ? 'bg-orange-500 text-white shadow-sm'
                    : 'bg-slate-50 text-slate-700 hover:text-slate-900 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {sport.name}
              </button>
            ))}
          </div>
        </div>

        {/* Age Group & Level Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-3 border-t border-slate-100">
          
          {/* Age Group */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Target Age Group
            </label>
            <div className="flex rounded-xl bg-slate-100 p-1 border border-slate-200">
              {['all', 'Junior', 'Adult'].map((age) => (
                <button
                  key={age}
                  onClick={() => setSelectedAgeGroup(age)}
                  className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                    selectedAgeGroup === age
                      ? 'bg-orange-500 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {age === 'all' ? 'All Ages' : age}
                </button>
              ))}
            </div>
          </div>

          {/* Experience / Skill Level */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Player Skill Level
              </label>
              {evaluatedScore !== null && (
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-md border border-emerald-200">
                  Quiz: {selectedLevel} ({evaluatedScore}/15)
                </span>
              )}
            </div>
            <div className="flex rounded-xl bg-slate-100 p-1 border border-slate-200">
              {['all', 'Beginner', 'Intermediate', 'Advanced'].map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setSelectedLevel(lvl)}
                  className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                    selectedLevel === lvl
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {lvl === 'all' ? 'All' : lvl}
                </button>
              ))}
            </div>
          </div>

          {/* Locality */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Bengaluru Locality
            </label>
            <select
              value={selectedLocality}
              onChange={(e) => setSelectedLocality(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-semibold focus:outline-none focus:border-orange-500 cursor-pointer"
            >
              {LOCALITIES.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>

        </div>

      </div>

      {/* Grid of Coaches */}
      <div className="space-y-4">
        <div className="text-xs font-semibold text-slate-600">
          Showing <span className="font-extrabold text-slate-900 font-mono">{filteredCoaches.length}</span> accredited coaching programs in Bengaluru
        </div>

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
          <div className="p-14 text-center rounded-3xl bg-white border border-slate-200 shadow-sm">
            <BookOpen className="w-10 h-10 text-slate-400 mx-auto mb-3" />
            <h3 className="text-base font-extrabold text-slate-900">No Coaches Match Current Filters</h3>
            <p className="text-xs text-slate-500 mt-1 mb-4">
              Try choosing &apos;All Ages&apos; or changing your locality to explore options across Bengaluru.
            </p>
            <button
              onClick={handleResetFilters}
              className="px-4 py-2 text-xs font-bold rounded-xl bg-orange-500 text-white shadow-sm"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
      </>
      )}

      {/* Trial Session Modal */}
      <CoachTrialModal
        coach={activeTrialCoach}
        isOpen={isTrialModalOpen}
        onClose={() => {
          setIsTrialModalOpen(false);
          setActiveTrialCoach(null);
        }}
      />

      {/* Standalone 2-Minute Skill Quiz Modal */}
      <SkillQuizModal
        isOpen={isQuizModalOpen}
        onClose={() => setIsQuizModalOpen(false)}
        sport={selectedSport !== 'all' ? selectedSport : 'Badminton'}
        onSelectLevel={(level: SkillLevel, score: number) => {
          setSelectedLevel(level);
          setEvaluatedScore(score);
        }}
      />

    </div>
  );
};
