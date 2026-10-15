import React, { useState } from 'react';
import { X, Calendar, User, Phone, CheckCircle2, Award, Clock } from 'lucide-react';
import { Coach } from '../data/sportsData';

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
  const [contactPhone, setContactPhone] = useState('');
  const [preferredSlot, setPreferredSlot] = useState('Weekend Morning Batch (07:00 AM)');
  const [isSubmitted, setIsSubmitted] = useState(false);

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
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div 
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity" 
        onClick={handleResetAndClose} 
      />

      <div className="relative w-full max-w-lg glass-modal rounded-2xl shadow-2xl border border-slate-700/80 p-6 sm:p-8 text-slate-100 z-10 my-8">
        
        <button
          onClick={handleResetAndClose}
          className="absolute top-5 right-5 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <div>
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold tracking-wider uppercase mb-1">
              <Award className="w-4 h-4 text-emerald-400" />
              <span>Academy Trial Session</span>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Request Trial Class with {coach.name}
            </h2>

            <p className="text-xs text-slate-400 mt-1 mb-6">
              {coach.academyName} · {coach.locality}, Bengaluru · Monthly Fee: <span className="text-emerald-400 font-medium">₹{coach.monthlyFee}</span>
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Player Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={playerName}
                    onChange={(e) => setPlayerName(e.target.value)}
                    placeholder="e.g. Aryan Sharma"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700/70 text-slate-200 text-sm focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Age Group
                  </label>
                  <select
                    value={playerAgeGroup}
                    onChange={(e) => setPlayerAgeGroup(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700/70 text-slate-200 text-xs focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Junior (Under 14)">Junior (Under 14)</option>
                    <option value="Youth (15 - 18)">Youth (15 - 18)</option>
                    <option value="Adult (18+)">Adult (18+)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    WhatsApp / Phone *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                    <input
                      type="tel"
                      required
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      placeholder="+91 98450 XXXXX"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700/70 text-slate-200 text-xs focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Preferred Batch Timing
                </label>
                <div className="relative">
                  <Clock className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <select
                    value={preferredSlot}
                    onChange={(e) => setPreferredSlot(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700/70 text-slate-200 text-xs focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Morning Batch (06:30 AM - 08:00 AM)">Morning Batch (06:30 AM - 08:00 AM)</option>
                    <option value="Evening Batch (05:00 PM - 06:30 PM)">Evening Batch (05:00 PM - 06:30 PM)</option>
                    <option value="Weekend Special (Sat & Sun 08:00 AM)">Weekend Special (Sat & Sun 08:00 AM)</option>
                  </select>
                </div>
                <div className="text-[11px] text-slate-400 mt-1">
                  Standard Academy Schedule: {coach.batchSchedule}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-400">
                <span className="text-emerald-400 font-semibold">Complimentary Evaluation:</span> The 45-minute trial session includes stroke analysis, fitness assessment, and level placement by the head coach.
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-sm shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer mt-4"
              >
                <Calendar className="w-4 h-4 text-slate-950" />
                <span>Confirm Trial Session Request</span>
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center py-4 space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div>
              <h3 className="text-2xl font-bold text-white">Trial Request Confirmed!</h3>
              <p className="text-xs text-slate-400 mt-1">
                {coach.name}&apos;s academy coordinator will reach out to <span className="text-white font-medium">{contactPhone}</span> to confirm your session slot.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-left space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Player</span>
                <span className="text-slate-200 font-semibold">{playerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Academy</span>
                <span className="text-slate-200">{coach.academyName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Batch Timing</span>
                <span className="text-emerald-400 font-medium">{preferredSlot}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Locality</span>
                <span className="text-slate-300">{coach.locality}, Bengaluru</span>
              </div>
            </div>

            <button
              onClick={handleResetAndClose}
              className="w-full py-2.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-xs transition-colors"
            >
              Done
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
