import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  CheckCircle2, 
  Circle, 
  Download, 
  Calendar, 
  RotateCcw, 
  Sparkles, 
  Trophy, 
  Check, 
  ArrowRight,
  Flame,
  Info,
  ChevronRight,
  Share2
} from 'lucide-react';
import { STARTER_PLANS, StarterPlan as PlanType } from '../data/sportsData';

export const StarterPlan: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlSport = searchParams.get('sport') || 'Badminton';
  
  const [selectedSport, setSelectedSport] = useState<string>(
    STARTER_PLANS[urlSport] ? urlSport : 'Badminton'
  );

  const [planState, setPlanState] = useState<PlanType>(() => {
    const base = STARTER_PLANS[selectedSport] || STARTER_PLANS['Badminton'];
    return JSON.parse(JSON.stringify(base));
  });

  const [weekOffset, setWeekOffset] = useState<number>(0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Weekly reflection notes state (persisted per sport)
  const [reflectionNotes, setReflectionNotes] = useState<Record<number, string>>(() => {
    try {
      const saved = localStorage.getItem(`sportspulse_reflections_${urlSport || 'Badminton'}`);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const handleUpdateReflection = (weekNumber: number, note: string) => {
    setReflectionNotes((prev) => {
      const updated = { ...prev, [weekNumber]: note };
      try {
        localStorage.setItem(`sportspulse_reflections_${selectedSport}`, JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  // Sync when URL param changes
  useEffect(() => {
    if (urlSport && STARTER_PLANS[urlSport]) {
      setSelectedSport(urlSport);
      setPlanState(JSON.parse(JSON.stringify(STARTER_PLANS[urlSport])));
      try {
        const saved = localStorage.getItem(`sportspulse_reflections_${urlSport}`);
        setReflectionNotes(saved ? JSON.parse(saved) : {});
      } catch {
        setReflectionNotes({});
      }
    }
  }, [urlSport]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Switch sport
  const handleSportChange = (newSport: string) => {
    setSelectedSport(newSport);
    setSearchParams({ sport: newSport });
    const nextPlan = STARTER_PLANS[newSport] || STARTER_PLANS['Badminton'];
    setPlanState(JSON.parse(JSON.stringify(nextPlan)));
    try {
      const saved = localStorage.getItem(`sportspulse_reflections_${newSport}`);
      setReflectionNotes(saved ? JSON.parse(saved) : {});
    } catch {
      setReflectionNotes({});
    }
    showToast(`Switched plan to ${newSport}!`);
  };

  // Toggle task
  const toggleTask = (weekNumber: number, taskId: string) => {
    setPlanState((prev) => {
      const next = { ...prev };
      const week = next.weeks.find((w) => w.weekNumber === weekNumber);
      if (week) {
        const task = week.tasks.find((t) => t.id === taskId);
        if (task) {
          task.completed = !task.completed;
        }
      }
      return { ...next };
    });
  };

  // Toggle gear
  const toggleGear = (index: number) => {
    setPlanState((prev) => {
      const next = { ...prev };
      next.equipmentList[index].checked = !next.equipmentList[index].checked;
      return { ...next };
    });
  };

  // Progress metrics calculation
  const allTasks = planState.weeks.flatMap((w) => w.tasks);
  const totalTasks = allTasks.length;
  const completedTasks = allTasks.filter((t) => t.completed).length;
  const progressPercent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Actions
  const handleDownloadPlan = () => {
    const textData = `SPORTS PULSE - 4-WEEK STARTER PLAN (${planState.sport})\n` +
      `Progress: ${completedTasks}/${totalTasks} steps completed (${progressPercent}%)\n\n` +
      planState.weeks.map(w => 
        `WEEK ${w.weekNumber}: ${w.title.toUpperCase()}\n` +
        `Focus: ${w.focus}\n` +
        w.tasks.map(t => ` [${t.completed ? 'X' : ' '}] ${t.text} (${t.subtext})`).join('\n') +
        `\nTip: ${w.coachingTip}\n` +
        (reflectionNotes[w.weekNumber] ? `Reflection: ${reflectionNotes[w.weekNumber]}\n` : '')
      ).join('\n') +
      `\nEQUIPMENT CHECKLIST:\n` +
      planState.equipmentList.map(e => ` [${e.checked ? 'X' : ' '}] ${e.name}: ${e.notes}`).join('\n');

    const element = document.createElement("a");
    const file = new Blob([textData], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `SportsPulse_${planState.sport}_Starter_Plan.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    showToast('Plan downloaded successfully!');
  };

  const handleShiftWeek = () => {
    setWeekOffset((prev) => prev + 1);
    showToast(`Plan calendar shifted by +${weekOffset + 1} week(s)!`);
  };

  const handleResetPlan = () => {
    const base = STARTER_PLANS[selectedSport] || STARTER_PLANS['Badminton'];
    setPlanState(JSON.parse(JSON.stringify(base)));
    setWeekOffset(0);
    setReflectionNotes({});
    try {
      localStorage.removeItem(`sportspulse_reflections_${selectedSport}`);
    } catch {}
    showToast('Plan reset to initial steps.');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 border border-slate-700 animate-in fade-in slide-in-from-top-4 text-xs font-semibold">
          <Sparkles className="w-4 h-4 text-orange-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header with Progress Metrics (Matches Screenshot 3) */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-6">
        
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold">
              <Trophy className="w-3.5 h-3.5 text-orange-500" />
              <span>Personalized Habit & Skill Roadmap</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              Four weeks. Small wins.
            </h1>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              {planState.tagline} Practice at verified Bengaluru courts, log your milestones, and build lasting athletic habits.
            </p>
          </div>

          {/* Action Buttons at the Top (Matches Screenshot 3) */}
          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              onClick={handleDownloadPlan}
              className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs sm:text-sm transition-colors flex items-center gap-2 cursor-pointer border border-slate-200 shadow-sm"
            >
              <Download className="w-4 h-4 text-slate-700" />
              <span>Download plan</span>
            </button>

            <button
              onClick={handleShiftWeek}
              className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs sm:text-sm transition-colors flex items-center gap-2 cursor-pointer border border-slate-200 shadow-sm"
            >
              <Calendar className="w-4 h-4 text-slate-700" />
              <span>Shift plan +1 week</span>
            </button>

            <button
              onClick={handleResetPlan}
              className="px-4 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs sm:text-sm transition-colors flex items-center gap-2 cursor-pointer shadow-md shadow-orange-500/20"
            >
              <RotateCcw className="w-4 h-4 text-white" />
              <span>Restart / reset</span>
            </button>
          </div>

        </div>

        {/* Progress Status Bar (Matches Screenshot 3) */}
        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Plan Completion Status:
              </span>
              <span className="text-sm font-extrabold text-blue-700 font-mono">
                {completedTasks}/{totalTasks} steps complete
              </span>
              <span className="text-xs font-semibold text-slate-500">
                ({progressPercent}%)
              </span>
            </div>

            {/* Sport Switcher Chips */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-xs text-slate-500 font-medium">Switch discipline:</span>
              {Object.keys(STARTER_PLANS).map((sp) => (
                <button
                  key={sp}
                  onClick={() => handleSportChange(sp)}
                  className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
                    selectedSport === sp
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'
                  }`}
                >
                  {sp}
                </button>
              ))}
            </div>
          </div>

          {/* Dual Accent Progress Bar */}
          <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden p-0.5">
            <div
              className="bg-gradient-to-r from-blue-600 via-indigo-600 to-orange-500 h-full rounded-full transition-all duration-500 shadow-sm"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

      </div>

      {/* 4 Weekly Interactive Milestone Columns (Matches Screenshot 3) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {planState.weeks.map((week) => {
          const weekDone = week.tasks.every((t) => t.completed);
          const weekCompletedCount = week.tasks.filter((t) => t.completed).length;

          return (
            <div
              key={week.weekNumber}
              className={`bg-white rounded-2xl border transition-all duration-200 flex flex-col justify-between shadow-sm ${
                weekDone
                  ? 'border-emerald-300 ring-2 ring-emerald-400/20 shadow-md'
                  : 'border-slate-200 hover:border-blue-400'
              }`}
            >
              <div className="p-5 space-y-4">
                
                {/* Column Header */}
                <div className="space-y-1 pb-3 border-b border-slate-100">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-orange-600 bg-orange-50 px-2 py-0.5 rounded-md border border-orange-200">
                      Week {week.weekNumber} {weekOffset > 0 ? `(+${weekOffset}w)` : ''}
                    </span>
                    <span className="text-xs font-bold text-slate-500 font-mono">
                      {weekCompletedCount}/{week.tasks.length}
                    </span>
                  </div>

                  <h2 className="text-base font-extrabold text-slate-900 tracking-tight pt-1">
                    {week.title}
                  </h2>

                  <p className="text-xs text-slate-500 leading-snug">
                    {week.focus}
                  </p>
                </div>

                {/* Step-by-Step Checkable Tasks */}
                <div className="space-y-2.5">
                  {week.tasks.map((task) => (
                    <div
                      key={task.id}
                      onClick={() => toggleTask(week.weekNumber, task.id)}
                      className={`p-3 rounded-xl border text-left cursor-pointer transition-all flex items-start gap-2.5 select-none ${
                        task.completed
                          ? 'bg-emerald-50/70 border-emerald-200 text-slate-900'
                          : 'bg-slate-50 hover:bg-slate-100 border-slate-200/80 text-slate-800'
                      }`}
                    >
                      <button
                        type="button"
                        className="mt-0.5 shrink-0 focus:outline-none"
                        aria-label="Toggle step completion"
                      >
                        {task.completed ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <Circle className="w-4 h-4 text-slate-400 hover:text-blue-600" />
                        )}
                      </button>

                      <div className="space-y-0.5">
                        <div className={`text-xs font-bold ${task.completed ? 'line-through text-slate-500' : 'text-slate-900'}`}>
                          {task.text}
                        </div>
                        <div className="text-[11px] text-slate-500 leading-snug">
                          {task.subtext}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Weekly Reflection Notes (Requirement 4) */}
                <div className="pt-2 border-t border-slate-100 space-y-1.5">
                  <div className="flex items-center justify-between text-[11px] font-bold text-slate-700">
                    <span className="flex items-center gap-1 text-orange-600">
                      <span>Weekly Reflection</span>
                    </span>
                    {reflectionNotes[week.weekNumber] && (
                      <span className="text-[10px] text-emerald-600 font-semibold">Saved ✓</span>
                    )}
                  </div>
                  <p className="text-[10px] text-slate-500 italic">
                    {week.reflectionPrompt || 'How did your practice feel this week?'}
                  </p>
                  <textarea
                    rows={2}
                    value={reflectionNotes[week.weekNumber] || ''}
                    onChange={(e) => handleUpdateReflection(week.weekNumber, e.target.value)}
                    placeholder="Log your thoughts, energy, or small wins..."
                    className="w-full p-2 text-xs rounded-xl bg-slate-50 border border-slate-200 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 resize-none font-sans"
                  />
                </div>

              </div>

              {/* Coaching Tip Footer Box */}
              <div className="p-4 bg-slate-50/90 rounded-b-2xl border-t border-slate-100 text-[11px] text-slate-600">
                <span className="font-bold text-blue-700 block mb-0.5">Coach Pro-Tip:</span>
                <span>{week.coachingTip}</span>
              </div>

            </div>
          );
        })}
      </div>

      {/* Equipment Essentials Checklist Section */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">
              Gear Readiness
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              Starter Gear & Court Essentials ({planState.sport})
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Verified gear required before your first session in Bengaluru venues.
            </p>
          </div>

          <Link
            to="/venues"
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <span>Book a court to test gear</span>
            <ArrowRight className="w-4 h-4 text-white" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {planState.equipmentList.map((item, idx) => (
            <div
              key={idx}
              onClick={() => toggleGear(idx)}
              className={`p-4 rounded-xl border flex items-start gap-3 cursor-pointer select-none transition-all ${
                item.checked
                  ? 'bg-blue-50/60 border-blue-200'
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="mt-0.5 shrink-0">
                {item.checked ? (
                  <CheckCircle2 className="w-5 h-5 text-blue-600" />
                ) : (
                  <Circle className="w-5 h-5 text-slate-300 hover:text-blue-600" />
                )}
              </div>
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-bold ${item.checked ? 'text-blue-950 font-extrabold' : 'text-slate-900'}`}>
                    {item.name}
                  </span>
                  {item.required && (
                    <span className="text-[10px] font-bold text-orange-600 bg-orange-50 px-1.5 py-0.5 rounded border border-orange-200">
                      Required
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-500 leading-snug">
                  {item.notes}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
