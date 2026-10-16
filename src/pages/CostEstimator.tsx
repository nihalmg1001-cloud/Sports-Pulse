import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calculator, 
  Sparkles, 
  CreditCard, 
  Calendar, 
  Users, 
  Clock, 
  ShieldCheck, 
  HelpCircle,
  ArrowRight,
  TrendingDown,
  Layers,
  Zap,
  GraduationCap
} from 'lucide-react';
import { SPORTS, VENUES_DATA, COACHES_DATA } from '../data/sportsData';

export const CostEstimator: React.FC = () => {
  const [selectedSport, setSelectedSport] = useState<string>('Badminton');
  const [sessionType, setSessionType] = useState<'booking' | 'coaching' | 'hybrid'>('booking');
  const [frequencyPerWeek, setFrequencyPerWeek] = useState<number>(3);
  const [durationHours, setDurationHours] = useState<number>(1);
  const [groupSplitCount, setGroupSplitCount] = useState<number>(4); // doubles for badminton default
  const [includeEquipment, setIncludeEquipment] = useState<boolean>(true);
  const [isPeakHour, setIsPeakHour] = useState<boolean>(true); // evenings in Bengaluru

  // Sport base benchmark rates in Bengaluru
  const sportBenchmarks: Record<string, { hourlyCourt: number; monthlyAcademy: number; defaultSplit: number }> = {
    Badminton: { hourlyCourt: 450, monthlyAcademy: 3200, defaultSplit: 4 },
    Football: { hourlyCourt: 1100, monthlyAcademy: 2800, defaultSplit: 10 },
    Tennis: { hourlyCourt: 750, monthlyAcademy: 4500, defaultSplit: 2 },
    Swimming: { hourlyCourt: 300, monthlyAcademy: 2500, defaultSplit: 1 },
    Cricket: { hourlyCourt: 850, monthlyAcademy: 3500, defaultSplit: 12 },
    Pickleball: { hourlyCourt: 550, monthlyAcademy: 2200, defaultSplit: 4 },
    Basketball: { hourlyCourt: 600, monthlyAcademy: 2600, defaultSplit: 8 }
  };

  const currentBenchmark = sportBenchmarks[selectedSport] || { hourlyCourt: 500, monthlyAcademy: 3000, defaultSplit: 4 };

  const calculation = useMemo(() => {
    const weeksInMonth = 4.3;
    const totalSessionsPerMonth = Math.round(frequencyPerWeek * weeksInMonth);
    
    // Hourly rate adjustments
    let hourlyRate = currentBenchmark.hourlyCourt;
    if (isPeakHour) {
      hourlyRate = Math.round(hourlyRate * 1.15); // Peak hour 15% bump
    }
    const sessionCourtTotal = hourlyRate * durationHours;

    // Equipment rental
    const equipmentPerSession = includeEquipment ? 100 : 0;
    
    // Total per session for whole court
    const fullSessionCost = sessionCourtTotal + equipmentPerSession;
    
    // Per person per session
    const perPersonSession = Math.round(fullSessionCost / Math.max(1, groupSplitCount));
    
    // Monthly booking cost per person
    const monthlyBookingCost = perPersonSession * totalSessionsPerMonth;

    // Coaching monthly fee (standard academy is typically 3 sessions/wk)
    const baseCoaching = currentBenchmark.monthlyAcademy;
    const coachingRatio = frequencyPerWeek / 3;
    const monthlyCoachingCost = Math.round(baseCoaching * (0.6 + 0.4 * coachingRatio));

    let finalMonthlyBudget = 0;
    if (sessionType === 'booking') {
      finalMonthlyBudget = monthlyBookingCost;
    } else if (sessionType === 'coaching') {
      finalMonthlyBudget = monthlyCoachingCost;
    } else {
      // Hybrid: coaching sessions + weekend practice games
      finalMonthlyBudget = Math.round(monthlyCoachingCost * 0.8 + monthlyBookingCost * 0.6);
    }

    const quarterlyBudget = Math.round(finalMonthlyBudget * 3 * 0.92); // 8% quarterly discount
    const annualBudget = Math.round(finalMonthlyBudget * 12 * 0.85); // 15% annual membership discount

    return {
      totalSessionsPerMonth,
      perPersonSession,
      finalMonthlyBudget,
      quarterlyBudget,
      annualBudget,
      fullSessionCost
    };
  }, [selectedSport, sessionType, frequencyPerWeek, durationHours, groupSplitCount, includeEquipment, isPeakHour, currentBenchmark]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header */}
      <div className="max-w-3xl space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider">
          <Calculator className="w-3.5 h-3.5 text-orange-500" />
          <span>Interactive Sports Financial Planner</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Bengaluru Sports Budget & Cost Estimator
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed">
          Estimate realistic monthly and quarterly sports expenses based on actual venue rates, court sharing splits, and academy batch fees across Bengaluru.
        </p>
      </div>

      {/* Main Grid: Controls vs Live Financial Projection */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Form & Adjustments */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          
          {/* 1. Sport Selection */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              1. Choose Sport Discipline
            </label>
            <div className="flex flex-wrap gap-2">
              {Object.keys(sportBenchmarks).map((sport) => (
                <button
                  key={sport}
                  onClick={() => {
                    setSelectedSport(sport);
                    setGroupSplitCount(sportBenchmarks[sport].defaultSplit);
                  }}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedSport === sport
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-slate-50 text-slate-700 hover:text-slate-900 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {sport}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Plan Type Toggle (Mode Separation Aware) */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              2. Activity Format (Court Slot vs Coaching)
            </label>
            <div className="grid grid-cols-3 gap-2 p-1 bg-slate-100 rounded-xl border border-slate-200">
              <button
                type="button"
                onClick={() => setSessionType('booking')}
                className={`py-2 px-2 text-xs font-bold rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
                  sessionType === 'booking'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Zap className="w-3.5 h-3.5" />
                <span>Court Slots</span>
              </button>
              <button
                type="button"
                onClick={() => setSessionType('coaching')}
                className={`py-2 px-2 text-xs font-bold rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
                  sessionType === 'coaching'
                    ? 'bg-orange-500 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <GraduationCap className="w-3.5 h-3.5" />
                <span>Academy Batch</span>
              </button>
              <button
                type="button"
                onClick={() => setSessionType('hybrid')}
                className={`py-2 px-2 text-xs font-bold rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
                  sessionType === 'hybrid'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Hybrid (Both)</span>
              </button>
            </div>
          </div>

          {/* 3. Frequency Slider */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-700">3. Weekly Playing Frequency</span>
              <span className="font-mono font-extrabold text-blue-700 text-sm">
                {frequencyPerWeek} {frequencyPerWeek === 1 ? 'session' : 'sessions'} / week (~{calculation.totalSessionsPerMonth} / month)
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="5"
              step="1"
              value={frequencyPerWeek}
              onChange={(e) => setFrequencyPerWeek(Number(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-500 font-mono font-semibold">
              <span>1x (Weekend Casual)</span>
              <span>3x (Fitness Regular)</span>
              <span>5x (Athlete Training)</span>
            </div>
          </div>

          {/* 4. Duration & Group Split (if booking) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-slate-100">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Session Duration
              </label>
              <div className="flex rounded-xl bg-slate-100 p-1 border border-slate-200">
                {[1, 1.5, 2].map((dur) => (
                  <button
                    key={dur}
                    type="button"
                    onClick={() => setDurationHours(dur)}
                    className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                      durationHours === dur
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {dur} hr
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Players Splitting Court Fee
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="1"
                  max="20"
                  value={groupSplitCount}
                  onChange={(e) => setGroupSplitCount(Math.max(1, Number(e.target.value)))}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-mono font-bold tabular-nums focus:outline-none focus:border-blue-600"
                />
                <span className="text-xs text-slate-500 font-semibold whitespace-nowrap">
                  ({groupSplitCount === 1 ? 'Solo' : `${groupSplitCount} players`})
                </span>
              </div>
            </div>
          </div>

          {/* 5. Toggles: Equipment & Peak Hour */}
          <div className="pt-3 border-t border-slate-100 space-y-3 text-xs">
            <label className="flex items-center justify-between text-slate-700 cursor-pointer font-semibold p-2.5 rounded-xl bg-slate-50 border border-slate-200 hover:bg-slate-100 transition-colors">
              <span>Include Racquet / Shuttles / Ball Rentals (+₹100/session)</span>
              <input
                type="checkbox"
                checked={includeEquipment}
                onChange={(e) => setIncludeEquipment(e.target.checked)}
                className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between text-slate-700 cursor-pointer font-semibold p-2.5 rounded-xl bg-slate-50 border border-slate-200 hover:bg-slate-100 transition-colors">
              <span>Prime Evening / Weekend Peak Slot (+15% venue differential)</span>
              <input
                type="checkbox"
                checked={isPeakHour}
                onChange={(e) => setIsPeakHour(e.target.checked)}
                className="w-4 h-4 rounded border-slate-300 text-orange-500 focus:ring-orange-500 cursor-pointer"
              />
            </label>
          </div>

        </div>

        {/* Right Column: Dynamic Price Summary Card */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl relative overflow-hidden">
            <div className="text-xs text-orange-600 font-bold tracking-wider uppercase mb-1">
              Estimated Bengaluru Expenditure
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight mb-4">
              {selectedSport} Budget Summary
            </h3>

            {/* Big Headline Monthly Metric */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/80 space-y-1 mb-5">
              <span className="text-xs text-blue-900 font-bold uppercase tracking-wider">Estimated Monthly Outlay</span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-extrabold text-blue-700 font-mono tabular-nums">
                  ₹{calculation.finalMonthlyBudget.toLocaleString('en-IN')}
                </span>
                <span className="text-xs text-blue-800 font-medium">/ player / month</span>
              </div>
              <p className="text-[11px] text-blue-700 pt-1 font-medium">
                Based on {calculation.totalSessionsPerMonth} sessions/month ({frequencyPerWeek}x weekly)
              </p>
            </div>

            {/* Breakdown Stats */}
            <div className="space-y-3 text-xs border-t border-slate-100 pt-4 mb-6">
              <div className="flex justify-between text-slate-600 font-medium">
                <span>Per Session Share</span>
                <span className="font-mono font-bold text-slate-900">
                  ₹{calculation.perPersonSession} / person
                </span>
              </div>

              <div className="flex justify-between text-slate-600 font-medium">
                <span>Total Court Fee per Game</span>
                <span className="font-mono text-slate-800">
                  ₹{calculation.fullSessionCost} (Full Court)
                </span>
              </div>

              <div className="flex justify-between text-slate-600 font-medium">
                <span>Estimated Quarterly Pass (8% bundle off)</span>
                <span className="font-mono font-bold text-orange-600">
                  ₹{calculation.quarterlyBudget.toLocaleString('en-IN')}
                </span>
              </div>

              <div className="flex justify-between text-slate-600 font-medium">
                <span>Annual Sports Health Investment</span>
                <span className="font-mono text-slate-800">
                  ₹{calculation.annualBudget.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Direct Links */}
            <div className="space-y-2">
              <Link
                to={`/venues?sport=${encodeURIComponent(selectedSport)}`}
                className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Find {selectedSport} Courts Now</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </Link>
              
              <Link
                to="/coaches"
                className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
              >
                <span>View {selectedSport} Academy Coaches</span>
              </Link>
            </div>

          </div>

          {/* Cost Saving Tips Box for Bengaluru */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
              <TrendingDown className="w-4 h-4 text-orange-500" />
              <span>Bengaluru Local Cost-Optimization Tips</span>
            </div>
            <ul className="text-xs text-slate-600 space-y-2 leading-relaxed">
              <li className="flex items-start gap-1.5">
                <span className="text-blue-600 font-bold">·</span>
                <span><strong className="text-slate-900">Morning 6 AM - 8 AM Slots:</strong> Venues like Velocity Arena offer 20-30% lower hourly rates before 10 AM compared to evening prime times.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-blue-600 font-bold">·</span>
                <span><strong className="text-slate-900">Matchmaker Splitting:</strong> Join community lobbies on our Matchmaker page to split 5v5 turf football or doubles badminton with verified players.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-blue-600 font-bold">·</span>
                <span><strong className="text-slate-900">Bring Your Own Gear:</strong> Owning your own shuttlecocks (e.g. Yonex Mavis 350) saves approximately ₹400-₹600 every month on rental kits.</span>
              </li>
            </ul>
          </div>

        </div>

      </div>

    </div>
  );
};
