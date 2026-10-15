import React, { useState, useMemo } from 'react';
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
  BookOpen
} from 'lucide-react';
import { Coach, COACHES_DATA, SPORTS, LOCALITIES } from '../data/sportsData';
import { CoachCard } from '../components/CoachCard';
import { CoachTrialModal } from '../components/CoachTrialModal';

export const Coaches: React.FC = () => {
  const [selectedSport, setSelectedSport] = useState<string>('all');
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<string>('all');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [selectedLocality, setSelectedLocality] = useState<string>('All Localities');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
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
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="text-xs text-emerald-400 font-semibold tracking-wider uppercase mb-1 flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5" />
            <span>Bengaluru Coaching Guild</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Academies & Certified Coaches
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Learn from state champions, NIS diploma holders, and BWF/ITF certified instructors with structured monthly programs.
          </p>
        </div>

        <button
          onClick={handleResetFilters}
          className="self-start md:self-auto flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-400 hover:text-white glass-card transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Filters</span>
        </button>
      </div>

      {/* Filter Matrix Card */}
      <div className="glass-panel rounded-2xl p-5 sm:p-6 border border-slate-800 space-y-5">
        
        {/* Search */}
        <div className="flex items-center gap-2.5 px-3.5 py-2.5 bg-slate-900 rounded-xl border border-slate-700/60">
          <Search className="w-4 h-4 text-emerald-400 shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search coach name, academy, or specialty (e.g., footwork, biomechanics, junior)..."
            className="w-full bg-transparent text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none"
          />
        </div>

        {/* Sport selection */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-2">
            Sport Discipline
          </label>
          <div className="flex flex-wrap gap-2">
            {SPORTS.map((sport) => (
              <button
                key={sport.id}
                onClick={() => setSelectedSport(sport.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  selectedSport === sport.id
                    ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20'
                    : 'bg-slate-900/80 text-slate-300 hover:text-white border border-slate-800'
                }`}
              >
                {sport.name}
              </button>
            ))}
          </div>
        </div>

        {/* Age Group & Level Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-slate-800/80">
          
          {/* Age Group */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Target Age Group
            </label>
            <div className="flex rounded-lg bg-slate-900 p-1 border border-slate-800">
              {['all', 'Junior', 'Adult'].map((age) => (
                <button
                  key={age}
                  onClick={() => setSelectedAgeGroup(age)}
                  className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-colors ${
                    selectedAgeGroup === age
                      ? 'bg-emerald-500 text-slate-950 font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {age === 'all' ? 'All Ages' : age}
                </button>
              ))}
            </div>
          </div>

          {/* Experience / Skill Level */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Player Skill Level
            </label>
            <div className="flex rounded-lg bg-slate-900 p-1 border border-slate-800">
              {['all', 'Beginner', 'Advanced'].map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setSelectedLevel(lvl)}
                  className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-colors ${
                    selectedLevel === lvl
                      ? 'bg-cyan-500 text-slate-950 font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {lvl === 'all' ? 'All Levels' : lvl}
                </button>
              ))}
            </div>
          </div>

          {/* Locality */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Bengaluru Locality
            </label>
            <select
              value={selectedLocality}
              onChange={(e) => setSelectedLocality(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-emerald-500"
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
        <div className="text-xs text-slate-400">
          Showing <span className="font-bold text-white font-mono">{filteredCoaches.length}</span> accredited coaching programs in Bengaluru
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
          <div className="p-14 text-center rounded-2xl glass-card border border-slate-800">
            <BookOpen className="w-10 h-10 text-slate-600 mx-auto mb-3" />
            <h3 className="text-base font-bold text-white">No Coaches Match Current Filters</h3>
            <p className="text-xs text-slate-400 mt-1 mb-4">
              Try choosing &apos;All Ages&apos; or changing your locality to explore options across Bengaluru.
            </p>
            <button
              onClick={handleResetFilters}
              className="px-4 py-2 text-xs font-semibold rounded-lg bg-emerald-400 text-slate-950"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Trial Session Modal */}
      <CoachTrialModal
        coach={activeTrialCoach}
        isOpen={isTrialModalOpen}
        onClose={() => {
          setIsTrialModalOpen(false);
          setActiveTrialCoach(null);
        }}
      />

    </div>
  );
};
