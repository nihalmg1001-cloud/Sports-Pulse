import React, { useState } from 'react';
import { 
  X, 
  Calendar, 
  User, 
  Phone, 
  CheckCircle2, 
  Award, 
  Clock, 
  GraduationCap, 
  Sparkles,
  HelpCircle,
  Zap
} from 'lucide-react';
import { Coach } from '../data/sportsData';
import { SkillQuizModal, SkillLevel } from './SkillQuizModal';

interface CoachTrialModalProps {
  coach: Coach | null;
  isOpen: boolean;
  onClose: () => void;
}

export const CoachTrialModal: React.FC<CoachTrialModalProps> = ({
  coach,
  isOpen,
  onClose
}) => {
  const [playerName, setPlayerName] = useState('');
  const [playerAgeGroup, setPlayerAgeGroup] = useState<string>('Junior (Under 14)');
  const [skillLevel, setSkillLevel] = useState<SkillLevel>('Beginner');
  const [contactPhone, setContactPhone] = useState('');
  const [preferredSlot, setPreferredSlot] = useState('Weekend Morning Batch (07:00 AM)');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [quizScore, setQuizScore] = useState<number | null>(null);

  if (!isOpen || !coach) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!playerName || !contactPhone) {
      alert('Please enter player name and mobile number.');
      return;
    }
    setIsSubmitted(true);
  };

  const handleResetAndClose = () => {
    setIsSubmitted(false);
    setPlayerName('');
    setContactPhone('');
    setSkillLevel('Beginner');
    setQuizScore(null);
    onClose();
  };

  const handleQuizComplete = (level: SkillLevel, score: number) => {
    setSkillLevel(level);
    setQuizScore(score);
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <div 
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity" 
          onClick={handleResetAndClose} 
        />

        <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 p-6 sm:p-8 text-slate-900 z-10 my-8 animate-in fade-in zoom-in-95 duration-200">
          
          <button
            onClick={handleResetAndClose}
            className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>

          {!isSubmitted ? (
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-orange-50 border border-orange-200 text-orange-700 text-xs font-bold uppercase tracking-wider mb-2">
                <GraduationCap className="w-3.5 h-3.5 text-orange-600" />
                <span>Academy Trial Evaluation</span>
              </div>

              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                Request Trial Class with {coach.name}
              </h2>

              <p className="text-xs text-slate-500 mt-1 mb-6">
                {coach.academyName} · {coach.locality}, Bengaluru · Monthly Fee: <span className="text-orange-600 font-bold">₹{coach.monthlyFee.toLocaleString('en-IN')}</span>
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Player Name */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Player Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      value={playerName}
                      onChange={(e) => setPlayerName(e.target.value)}
                      placeholder="e.g. Aryan Sharma"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-orange-500 font-medium"
                    />
                  </div>
                </div>

                {/* SKILL LEVEL SELECTION FIELD & QUIZ BUTTON (Requirements 1, 4, 5) */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                      <span>Player Skill Level *</span>
                      {quizScore !== null && (
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded-full inline-flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>Quiz verified ({quizScore}/15 pts)</span>
                        </span>
                      )}
                    </label>

                    {/* Unsure? Take 2-min Quiz Button */}
                    <button
                      type="button"
                      onClick={() => setIsQuizOpen(true)}
                      className="inline-flex items-center gap-1.5 text-xs font-extrabold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 hover:border-blue-300 px-2.5 py-1 rounded-xl transition-all cursor-pointer shadow-2xs group"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-orange-500 group-hover:scale-110 transition-transform" />
                      <span>Unsure? Take 2-min Quiz</span>
                    </button>
                  </div>

                  {/* 3 Skill Level Options */}
                  <div className="grid grid-cols-3 gap-2">
                    {(['Beginner', 'Intermediate', 'Advanced'] as SkillLevel[]).map((level) => {
                      const isSelected = skillLevel === level;
                      return (
                        <button
                          key={level}
                          type="button"
                          onClick={() => setSkillLevel(level)}
                          className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all text-center flex flex-col items-center justify-center gap-0.5 cursor-pointer ${
                            isSelected
                              ? 'border-orange-500 bg-orange-50 text-orange-950 shadow-xs ring-1 ring-orange-500'
                              : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300 hover:bg-slate-100'
                          }`}
                        >
                          <span className="font-extrabold">{level}</span>
                          <span className="text-[10px] text-slate-400 font-normal">
                            {level === 'Beginner' ? '5-8 pts' : level === 'Intermediate' ? '9-12 pts' : '13-15 pts'}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Age Group & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Age Group
                    </label>
                    <select
                      value={playerAgeGroup}
                      onChange={(e) => setPlayerAgeGroup(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-semibold focus:outline-none focus:border-orange-500"
                    >
                      <option value="Junior (Under 14)">Junior (Under 14)</option>
                      <option value="Youth (15 - 18)">Youth (15 - 18)</option>
                      <option value="Adult (18+)">Adult (18+)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      WhatsApp / Mobile *
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="tel"
                        required
                        value={contactPhone}
                        onChange={(e) => setContactPhone(e.target.value)}
                        placeholder="+91 98450 XXXXX"
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-orange-500 font-medium"
                      />
                    </div>
                  </div>
                </div>

                {/* Preferred Slot */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Preferred Batch Timing
                  </label>
                  <div className="relative">
                    <Clock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <select
                      value={preferredSlot}
                      onChange={(e) => setPreferredSlot(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-semibold focus:outline-none focus:border-orange-500"
                    >
                      <option value="Morning Batch (06:30 AM - 08:00 AM)">Morning Batch (06:30 AM - 08:00 AM)</option>
                      <option value="Evening Batch (05:00 PM - 06:30 PM)">Evening Batch (05:00 PM - 06:30 PM)</option>
                      <option value="Weekend Special (Sat & Sun 08:00 AM)">Weekend Special (Sat & Sun 08:00 AM)</option>
                    </select>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">
                    Standard Academy Schedule: {coach.batchSchedule}
                  </div>
                </div>

                {/* Complimentary Evaluation Info */}
                <div className="p-3.5 rounded-2xl bg-orange-50/70 border border-orange-200/80 text-xs text-orange-950">
                  <span className="font-bold text-orange-700">Complimentary Evaluation:</span> The 45-minute trial includes stroke biomechanics review, footwork speed test, and personalized batch recommendation tailored to your <strong className="text-orange-900">{skillLevel}</strong> level.
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-sm shadow-md shadow-orange-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer mt-4"
                >
                  <Calendar className="w-4 h-4 text-white" />
                  <span>Confirm Trial Session Request</span>
                </button>
              </form>
            </div>
          ) : (
            <div className="text-center py-4 space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div>
                <h3 className="text-2xl font-extrabold text-slate-900">Trial Request Confirmed!</h3>
                <p className="text-xs text-slate-500 mt-1">
                  {coach.name}&apos;s academy coordinator will reach out to <span className="text-slate-900 font-bold">{contactPhone}</span> to confirm your slot.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">Player</span>
                  <span className="text-slate-900 font-bold">{playerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Assigned Skill Level</span>
                  <span className="text-orange-600 font-bold">
                    {skillLevel} {quizScore !== null ? `(${quizScore}/15 pts)` : ''}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Academy</span>
                  <span className="text-slate-900 font-semibold">{coach.academyName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Batch Timing</span>
                  <span className="text-orange-600 font-bold">{preferredSlot}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Locality</span>
                  <span className="text-slate-700">{coach.locality}, Bengaluru</span>
                </div>
              </div>

              <button
                onClick={handleResetAndClose}
                className="w-full py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs transition-colors shadow-md cursor-pointer"
              >
                Done
              </button>
            </div>
          )}

        </div>
      </div>

      {/* Interactive 5-Question Skill Quiz Modal (Requirements 2, 3, 4, 5) */}
      <SkillQuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        sport={coach.sport}
        onSelectLevel={handleQuizComplete}
      />
    </>
  );
};
