import React, { useState, useId } from 'react';
import { 
  GraduationCap, 
  Sparkles, 
  MapPin, 
  Search, 
  CheckCircle2, 
  User, 
  Target, 
  Trophy, 
  Award,
  Zap,
  Activity,
  Waves,
  Shield,
  Flame,
  ArrowRight
} from 'lucide-react';
import { Coach, COACHES_DATA } from '../data/sportsData';
import { CoachCard } from './CoachCard';
import { CoachTrialModal } from './CoachTrialModal';
import { SkillQuiz, SkillLevel } from './SkillQuiz';

interface CoachingSectionProps {
  onSelectCoach?: (coach: Coach) => void;
  selectedLocality?: string;
  initialSport?: string;
}

// Sports requested for the card grid
const MATCHING_SPORTS = [
  { id: 'Football', name: 'Football', icon: Flame, emoji: '⚽', desc: 'Turf 5v5 & 11v11 academies' },
  { id: 'Cricket', name: 'Cricket', icon: Shield, emoji: '🏏', desc: 'Turf nets & leather match play' },
  { id: 'Tennis', name: 'Tennis', icon: Zap, emoji: '🎾', desc: 'Clay & hard court academies' },
  { id: 'Badminton', name: 'Badminton', icon: Activity, emoji: '🏸', desc: 'BWF synthetic court training' },
  { id: 'Swimming', name: 'Swimming', icon: Waves, emoji: '🏊', desc: 'Stroke & endurance clinics' },
  { id: 'Athletics', name: 'Athletics', icon: Trophy, emoji: '🏃', desc: 'Sprints, 5K/10K & marathons' }
];

// Target localities requested
const TARGET_LOCALITIES = [
  'Sahakar Nagar',
  'Yelahanka',
  'Indiranagar',
  'Koramangala',
  'Hebbal',
  'Malleshwaram',
  'Whitefield'
];

// Who is it for options
const WHO_FOR_OPTIONS = ['Myself', 'My child', 'Another adult'] as const;
type WhoForType = typeof WHO_FOR_OPTIONS[number];

// Your goal options
const GOAL_OPTIONS = ['Fitness', 'Just for fun', 'Compete'] as const;
type GoalType = typeof GOAL_OPTIONS[number];

// Skill Level card definitions
const SKILL_LEVEL_CARDS: { level: SkillLevel; tag: string; detail: string }[] = [
  { level: 'Beginner', tag: 'Just starting', detail: 'Learning fundamentals, basic rules, and injury-free mechanics' },
  { level: 'Intermediate', tag: 'Know the basics', detail: 'Sustained rallies, tactical positioning, and regular weekly play' },
  { level: 'Advanced', tag: 'Compete regularly', detail: 'High match tempo, tournaments, deceptive shots, and power' }
];

export const CoachingSection: React.FC<CoachingSectionProps> = ({
  onSelectCoach,
  selectedLocality = 'Sahakar Nagar',
  initialSport = 'Badminton'
}) => {
  // 1. Name input field ("e.g. Ananya")
  const [name, setName] = useState('');
  
  // 2. "Who is it for?" pill selector (Myself, My child, Another adult)
  const [whoFor, setWhoFor] = useState<WhoForType>('Myself');
  
  // 3. "Your goal" pill selector (Fitness, Just for fun, Compete)
  const [goal, setGoal] = useState<GoalType>('Fitness');
  
  // 4. "Target localities" pill grid (Sahakar Nagar, Yelahanka, Indiranagar, Koramangala, Hebbal, Malleshwaram, Whitefield)
  const [targetLocality, setTargetLocality] = useState<string>(
    TARGET_LOCALITIES.includes(selectedLocality) ? selectedLocality : 'Sahakar Nagar'
  );
  
  // 5. "Select sport" card grid with icons (Football, Cricket, Tennis, Badminton, Swimming, Athletics)
  const [selectedSport, setSelectedSport] = useState<string>(
    MATCHING_SPORTS.some(s => s.id.toLowerCase() === initialSport.toLowerCase()) 
      ? MATCHING_SPORTS.find(s => s.id.toLowerCase() === initialSport.toLowerCase())!.id
      : 'Badminton'
  );
  
  // 6. "Skill level" card grid (Beginner - Just starting, Intermediate - Know the basics, Advanced - Compete regularly)
  const [skillLevel, setSkillLevel] = useState<SkillLevel>('Beginner');
  
  // Quiz evaluation state
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [quizScore, setQuizScore] = useState<number | null>(null);
  const [quizSportAssessed, setQuizSportAssessed] = useState<string | null>(null);

  // Matched coaches state
  const [hasSearched, setHasSearched] = useState(false);
  const [activeTrialCoach, setActiveTrialCoach] = useState<Coach | null>(null);
  const [isTrialOpen, setIsTrialOpen] = useState(false);

  const matchedResultsRef = React.useRef<HTMLDivElement>(null);
  const nameInputId = useId();

  // Handle quiz completion: auto-populate skill level and close modal cleanly
  const handleQuizComplete = (assessedLevel: SkillLevel, score: number) => {
    setSkillLevel(assessedLevel);
    setQuizScore(score);
    setQuizSportAssessed(selectedSport);
    setIsQuizOpen(false);
  };

  // Find matching coaches
  const findMatchingCoaches = () => {
    return COACHES_DATA.filter((coach) => {
      // Sport match
      const sportMatch = 
        coach.sport.toLowerCase() === selectedSport.toLowerCase() ||
        (selectedSport === 'Athletics' && (coach.sport.toLowerCase() === 'athletics' || coach.sport.toLowerCase() === 'running'));
      
      // Skill level match
      const levelMatch = coach.levels.includes(skillLevel);

      return sportMatch && levelMatch;
    });
  };

  const matchedCoaches = findMatchingCoaches();

  const handleFindCoaches = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(true);

    // Smooth scroll down to matched results
    setTimeout(() => {
      matchedResultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleOpenTrial = (coach: Coach) => {
    setActiveTrialCoach(coach);
    setIsTrialOpen(true);
    onSelectCoach?.(coach);
  };

  return (
    <section className="space-y-10">
      
      {/* COACH MATCHING FORM CARD */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden">
        
        {/* Form Header */}
        <div className="bg-gradient-to-r from-orange-600 via-amber-600 to-orange-700 px-6 sm:px-8 py-6 text-white">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-xs text-xs font-bold uppercase tracking-wider mb-2">
            <GraduationCap className="w-4 h-4 text-orange-200" />
            <span>Bengaluru Coach Matching & Skill Assessment</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
            Find Your Certified Academy Coach
          </h2>
          <p className="text-xs sm:text-sm text-orange-100 mt-1 max-w-2xl">
            Custom matching based on your location, age group, goals, and sport-specific skill level.
          </p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleFindCoaches} className="p-6 sm:p-8 space-y-8">
          
          {/* 1. Name input field */}
          <div className="space-y-2">
            <label htmlFor={nameInputId} className="block text-xs font-extrabold uppercase tracking-wider text-slate-700">
              Player Name <span className="text-orange-500">*</span>
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                id={nameInputId}
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Ananya"
                className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all"
              />
            </div>
          </div>

          {/* 2. "Who is it for?" pill selector */}
          <div className="space-y-2">
            <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700">
              Who is it for?
            </label>
            <div className="flex flex-wrap gap-2">
              {WHO_FOR_OPTIONS.map((option) => {
                const isSelected = whoFor === option;
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setWhoFor(option)}
                    className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20 ring-2 ring-orange-500/30'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200/80'
                    }`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. "Your goal" pill selector */}
          <div className="space-y-2">
            <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700">
              Your Goal
            </label>
            <div className="flex flex-wrap gap-2">
              {GOAL_OPTIONS.map((g) => {
                const isSelected = goal === g;
                return (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setGoal(g)}
                    className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20 ring-2 ring-orange-500/30'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200/80'
                    }`}
                  >
                    {g}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4. "Target localities" pill grid */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700">
                Target Localities
              </label>
              <span className="text-[11px] text-slate-400 font-medium">Select your preferred training hub</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {TARGET_LOCALITIES.map((loc) => {
                const isSelected = targetLocality === loc;
                return (
                  <button
                    key={loc}
                    type="button"
                    onClick={() => setTargetLocality(loc)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-slate-900 text-white shadow-sm ring-2 ring-slate-900/20'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200/80'
                    }`}
                  >
                    <MapPin className={`w-3.5 h-3.5 ${isSelected ? 'text-orange-400' : 'text-slate-400'}`} />
                    <span>{loc}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 5. "Select sport" card grid with icons */}
          <div className="space-y-2.5">
            <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700">
              Select Sport
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {MATCHING_SPORTS.map((sport) => {
                const isSelected = selectedSport === sport.id;
                const IconComponent = sport.icon;
                return (
                  <button
                    key={sport.id}
                    type="button"
                    onClick={() => {
                      setSelectedSport(sport.id);
                      // If sport changed, clear the old quiz verification if it was for a different sport
                      if (quizSportAssessed && quizSportAssessed !== sport.id) {
                        setQuizScore(null);
                        setQuizSportAssessed(null);
                      }
                    }}
                    className={`p-3.5 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-2 group ${
                      isSelected
                        ? 'border-orange-500 bg-orange-50/70 text-orange-950 shadow-md ring-2 ring-orange-500/20'
                        : 'border-slate-200 bg-white hover:border-orange-300 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg transition-colors ${
                      isSelected 
                        ? 'bg-orange-500 text-white shadow-xs' 
                        : 'bg-slate-100 text-slate-600 group-hover:bg-orange-100 group-hover:text-orange-600'
                    }`}>
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-black text-slate-900 leading-tight">
                        {sport.name}
                      </div>
                      <div className="text-[10px] text-slate-400 mt-0.5 line-clamp-1">
                        {sport.emoji} Training
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 6. "Skill level" card grid (Beginner - Just starting, Intermediate - Know the basics, Advanced - Compete regularly) */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700">
                Skill Level
              </label>
              {quizScore !== null && (
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full inline-flex items-center gap-1 shadow-2xs">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Verified via Quiz: {skillLevel} ({quizScore}/15 pts)</span>
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {SKILL_LEVEL_CARDS.map(({ level, tag, detail }) => {
                const isSelected = skillLevel === level;
                return (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setSkillLevel(level)}
                    className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'border-orange-500 bg-orange-50/70 text-orange-950 shadow-md ring-2 ring-orange-500/20'
                        : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/80 text-slate-700'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-black text-slate-900">{level}</span>
                        <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                          isSelected 
                            ? 'bg-orange-500 text-white' 
                            : 'bg-slate-100 text-slate-600'
                        }`}>
                          {tag}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 leading-relaxed mt-1">
                        {detail}
                      </p>
                    </div>

                    <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-slate-400">
                      <span>Matches {selectedSport} batch</span>
                      {isSelected && <CheckCircle2 className="w-4 h-4 text-orange-600" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* POSITIONING REQUIREMENT:
              Place the "💡 Unsure of your exact skill level? Don't guess! Click here to take our 5-Question Adaptive Sport Quiz." banner 
              DIRECTLY BELOW the Skill Level cards, right above the "Find My Matched Coaches" main action button.
          */}
          <button
            type="button"
            onClick={() => setIsQuizOpen(true)}
            className="w-full text-left p-4 rounded-2xl bg-amber-50 hover:bg-amber-100/90 border border-amber-300 text-amber-950 transition-all cursor-pointer shadow-xs flex items-center justify-between gap-3 group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                <span className="text-lg">💡</span>
              </div>
              <div>
                <p className="text-xs sm:text-sm font-extrabold text-amber-950">
                  💡 Unsure of your exact skill level? Don&apos;t guess! Click here to take our 5-Question Adaptive Sport Quiz.
                </p>
                <p className="text-[11px] text-amber-800 mt-0.5">
                  Takes only 2 mins for {selectedSport}. Evaluates Beginner, Intermediate, or Advanced and auto-populates this matching form.
                </p>
              </div>
            </div>

            <div className="shrink-0 self-center">
              {quizScore !== null ? (
                <span className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-extrabold shadow-xs inline-flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{skillLevel} ({quizScore}/15)</span>
                </span>
              ) : (
                <span className="text-xs font-black text-amber-900 bg-white px-3.5 py-2 rounded-xl border border-amber-300 group-hover:border-amber-400 shadow-2xs whitespace-nowrap">
                  Start Quiz →
                </span>
              )}
            </div>
          </button>

          {/* MAIN ACTION BUTTON: Right above matched results */}
          <button
            type="submit"
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-orange-500 via-amber-600 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-black text-sm sm:text-base shadow-lg shadow-orange-500/25 transition-all flex items-center justify-center gap-2.5 cursor-pointer"
          >
            <Search className="w-5 h-5 text-white" />
            <span>Find My Matched Coaches</span>
            <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full font-mono">
              {matchedCoaches.length} Available
            </span>
          </button>

        </form>

      </div>

      {/* MATCHED COACHES RESULTS */}
      <div ref={matchedResultsRef} className="space-y-5 pt-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-orange-600 flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5" />
              <span>Matched Coaching Guild · Bengaluru</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5">
              Recommended {selectedSport} Mentors ({matchedCoaches.length})
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Filtered for <span className="font-bold text-slate-800">{skillLevel}</span> players targeting <span className="font-bold text-slate-800">{targetLocality}</span> & surrounding Bengaluru hubs.
            </p>
          </div>

          <div className="text-xs text-slate-600 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200 self-start sm:self-auto font-semibold">
            Goal: <span className="font-bold text-orange-600">{goal}</span> · For: <span className="font-bold text-slate-900">{whoFor}</span>
          </div>
        </div>

        {matchedCoaches.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {matchedCoaches.map((coach) => (
              <CoachCard
                key={coach.id}
                coach={coach}
                onBookTrial={handleOpenTrial}
              />
            ))}
          </div>
        ) : (
          <div className="p-12 text-center rounded-3xl bg-white border border-slate-200 shadow-xs">
            <GraduationCap className="w-12 h-12 text-slate-400 mx-auto mb-3" />
            <h4 className="text-base font-extrabold text-slate-900">
              No exact match for {selectedSport} in {skillLevel} Level
            </h4>
            <p className="text-xs text-slate-500 mt-1 mb-5 max-w-md mx-auto">
              We couldn&apos;t find an academy coach for this exact combination. Try switching skill levels or explore other nearby Bengaluru localities.
            </p>
            <button
              type="button"
              onClick={() => {
                setSkillLevel('Beginner');
                setTargetLocality('Sahakar Nagar');
              }}
              className="px-5 py-2.5 text-xs font-black rounded-xl bg-orange-500 text-white shadow-sm cursor-pointer"
            >
              Reset to Beginner Batches
            </button>
          </div>
        )}
      </div>

      {/* COACH TRIAL MODAL with pre-filled name & evaluated level */}
      <CoachTrialModal
        coach={activeTrialCoach}
        isOpen={isTrialOpen}
        onClose={() => {
          setIsTrialOpen(false);
          setActiveTrialCoach(null);
        }}
        initialPlayerName={name}
        initialSkillLevel={skillLevel}
        initialQuizScore={quizScore}
      />

      {/* 2-MINUTE ADAPTIVE SPORT QUIZ MODAL */}
      <SkillQuiz
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        sport={selectedSport}
        onSelectLevel={handleQuizComplete}
      />

    </section>
  );
};

export default CoachingSection;
