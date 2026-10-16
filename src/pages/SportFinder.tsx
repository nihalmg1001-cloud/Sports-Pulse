import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Trophy, 
  Sparkles, 
  Flame, 
  Clock, 
  CreditCard, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  Info, 
  Layers, 
  SlidersHorizontal, 
  X,
  Compass
} from 'lucide-react';
import { SPORT_FINDER_DATA, SportRecommendation } from '../data/sportsData';

export const SportFinder: React.FC = () => {
  const navigate = useNavigate();

  const [selectedBudget, setSelectedBudget] = useState<string>('all');
  const [selectedConfidence, setSelectedConfidence] = useState<string>('all');
  const [selectedFormat, setSelectedFormat] = useState<string>('all');
  const [activeLearnMore, setActiveLearnMore] = useState<SportRecommendation | null>(null);

  const filteredSports = useMemo(() => {
    return SPORT_FINDER_DATA.filter((item) => {
      if (selectedBudget !== 'all' && item.budgetCategory !== selectedBudget) return false;
      if (selectedConfidence !== 'all' && item.fitnessConfidence !== selectedConfidence) return false;
      if (selectedFormat !== 'all' && item.playFormat !== selectedFormat) return false;
      return true;
    });
  }, [selectedBudget, selectedConfidence, selectedFormat]);

  const handleChooseSport = (sportName: string) => {
    navigate(`/plan?sport=${encodeURIComponent(sportName)}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
        {/* Subtle decorative circles */}
        <div className="absolute -top-12 -right-12 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-12 right-1/3 w-64 h-64 bg-orange-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-white text-xs font-semibold tracking-wide border border-white/20">
            <Compass className="w-3.5 h-3.5 text-orange-300" />
            <span>Bengaluru Sport Recommendation Engine</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Find Your Sport
          </h1>

          <p className="text-base sm:text-lg text-blue-50 leading-relaxed font-normal">
            Not sure where to begin? We ranked the best sports in Bengaluru by learning curve, community presence, joint impact, and estimated first-month costs.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-blue-100">
            <span className="flex items-center gap-1.5 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-300" />
              <span>Real First-Month Budgets in INR</span>
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-300" />
              <span>Direct Link into 4-Week Starter Plans</span>
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-300" />
              <span>Bengaluru Court Verification</span>
            </span>
          </div>
        </div>
      </div>

      {/* Filter Matrix Bar */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-sm space-y-5">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
            <SlidersHorizontal className="w-4 h-4 text-blue-600" />
            <span>Customize Your Match Preferences</span>
          </div>
          {(selectedBudget !== 'all' || selectedConfidence !== 'all' || selectedFormat !== 'all') && (
            <button
              onClick={() => {
                setSelectedBudget('all');
                setSelectedConfidence('all');
                setSelectedFormat('all');
              }}
              className="text-xs font-semibold text-orange-600 hover:text-orange-700 underline"
            >
              Reset Filters
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-1 border-t border-slate-100">
          
          {/* Budget Filter */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              1. First Month Budget
            </label>
            <div className="flex flex-wrap gap-1.5">
              {[
                { id: 'all', label: 'Any Budget' },
                { id: 'Under ₹4,000', label: 'Under ₹4k' },
                { id: '₹4,000 - ₹8,000', label: '₹4k - ₹8k' },
                { id: '₹8,000+', label: '₹8k+' }
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setSelectedBudget(opt.id)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                    selectedBudget === opt.id
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Fitness Confidence Filter */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              2. Fitness Confidence
            </label>
            <div className="flex flex-wrap gap-1.5">
              {[
                { id: 'all', label: 'All Levels' },
                { id: 'Gentle', label: 'Gentle / Low-Impact' },
                { id: 'Moderate', label: 'Moderate' },
                { id: 'High Intensity', label: 'High Intensity' }
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setSelectedConfidence(opt.id)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                    selectedConfidence === opt.id
                      ? 'bg-orange-500 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Play Format */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              3. Play Format
            </label>
            <div className="flex flex-wrap gap-1.5">
              {[
                { id: 'all', label: 'All Formats' },
                { id: 'Pairs', label: 'Pairs / Doubles' },
                { id: 'Solo', label: 'Solo Lanes' },
                { id: 'Team', label: 'Squad / Team' }
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setSelectedFormat(opt.id)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                    selectedFormat === opt.id
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Grid of Ranked Sport Recommendation Cards (Matches Screenshot 2) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
          <span>Showing {filteredSports.length} ranked sport options</span>
          <span>Ranked by Bengaluru popularity & accessibility</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSports.map((rec) => (
            <div
              key={rec.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
            >
              <div>
                {/* Visual Header with Image */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                  <img
                    src={rec.imageUrl}
                    alt={rec.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20" />

                  {/* Rank Badge */}
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-xs font-extrabold text-blue-700 shadow-sm border border-slate-200 flex items-center gap-1.5">
                    <Trophy className="w-3.5 h-3.5 text-orange-500" />
                    <span>#{rec.rank} Recommended</span>
                  </div>

                  {/* Calories metric */}
                  <div className="absolute top-3 right-3 bg-slate-900/85 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-semibold text-white shadow-sm flex items-center gap-1">
                    <Flame className="w-3 h-3 text-orange-400" />
                    <span>~{rec.caloriesPerHour} kcal/hr</span>
                  </div>

                  {/* Bottom Title overlay */}
                  <div className="absolute bottom-3 left-4 right-4">
                    <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight drop-shadow-sm">
                      {rec.title}
                    </h2>
                    <div className="text-xs text-blue-200 font-medium">
                      {rec.courtType}
                    </div>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-5 space-y-4">
                  {/* Summary */}
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {rec.shortSummary}
                  </p>

                  {/* Estimated Cost Callout (Matches Screenshot 2 requirement) */}
                  <div className="p-3 rounded-xl bg-orange-50 border border-orange-200/80 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-orange-600 shrink-0" />
                      <span className="text-xs font-bold text-orange-950">
                        {rec.estimatedFirstMonthText}
                      </span>
                    </div>
                    <span className="text-[10px] font-semibold text-orange-700 bg-white px-2 py-0.5 rounded-full border border-orange-200">
                      Gear + 8 slots
                    </span>
                  </div>

                  {/* Practical Suitability Tags */}
                  <div className="space-y-1.5 pt-1">
                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      Suitability Analysis
                    </div>
                    <div className="space-y-1">
                      {rec.suitabilityTags.map((tag, idx) => (
                        <div
                          key={idx}
                          className={`text-xs px-2.5 py-1 rounded-lg flex items-start gap-1.5 font-medium leading-tight ${
                            tag.type === 'positive'
                              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                              : tag.type === 'warning'
                              ? 'bg-amber-50 text-amber-800 border border-amber-200'
                              : 'bg-blue-50 text-blue-800 border border-blue-200'
                          }`}
                        >
                          <span className="shrink-0 font-bold">{tag.text.charAt(0)}</span>
                          <span>{tag.text.substring(2)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons (Matches Screenshot 2) */}
              <div className="p-5 pt-0 border-t border-slate-100 flex items-center gap-2 mt-2">
                <button
                  onClick={() => handleChooseSport(rec.sport)}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs sm:text-sm shadow-md shadow-orange-500/20 transition-all flex items-center justify-center gap-1.5 cursor-pointer hover:scale-[1.02]"
                >
                  <span>Choose {rec.sport}</span>
                  <ArrowRight className="w-4 h-4 text-white" />
                </button>

                <button
                  onClick={() => setActiveLearnMore(rec)}
                  className="py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs sm:text-sm transition-colors cursor-pointer"
                >
                  Learn more
                </button>
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* Learn More Details Modal */}
      {activeLearnMore && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div 
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm"
            onClick={() => setActiveLearnMore(null)}
          />

          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 sm:p-8 z-10 text-slate-900 space-y-5 my-8">
            <button
              onClick={() => setActiveLearnMore(null)}
              className="absolute top-4 right-4 p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-xs font-bold text-orange-600 uppercase tracking-wider">
              <Trophy className="w-4 h-4 text-orange-500" />
              <span>#{activeLearnMore.rank} Ranked Sport in Bengaluru</span>
            </div>

            <h3 className="text-2xl font-extrabold text-slate-900">
              {activeLearnMore.title} Comprehensive Guide
            </h3>

            <p className="text-sm text-slate-600 leading-relaxed">
              {activeLearnMore.shortSummary}
            </p>

            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-2 gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs">
              <div>
                <span className="text-slate-500 block">Learning Curve:</span>
                <span className="font-bold text-slate-900">{activeLearnMore.learningCurve}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Calorie Burn:</span>
                <span className="font-bold text-orange-600 font-mono">~{activeLearnMore.caloriesPerHour} kcal / hr</span>
              </div>
              <div>
                <span className="text-slate-500 block">Court Surface:</span>
                <span className="font-bold text-slate-900">{activeLearnMore.courtType}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Format:</span>
                <span className="font-bold text-blue-600">{activeLearnMore.playFormat}</span>
              </div>
            </div>

            {/* Gear Essentials */}
            <div>
              <div className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                Starter Equipment Essentials
              </div>
              <ul className="space-y-1.5 text-xs text-slate-600">
                {activeLearnMore.gearEssentials.map((gear, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{gear}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-2 flex gap-3">
              <button
                onClick={() => {
                  const sport = activeLearnMore.sport;
                  setActiveLearnMore(null);
                  handleChooseSport(sport);
                }}
                className="flex-1 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
              >
                <span>Start 4-Week Plan for {activeLearnMore.sport}</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
