import React, { useState } from 'react';
import { 
  X, 
  Calendar, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  CreditCard, 
  Sparkles, 
  Share2, 
  ShieldCheck 
} from 'lucide-react';
import { Venue, VENUES_DATA } from '../data/sportsData';

interface BookingModalProps {
  venue: Venue | null;
  isOpen: boolean;
  onClose: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  venue,
  isOpen,
  onClose
}) => {
  const [selectedVenueId, setSelectedVenueId] = useState<string>(venue ? venue.id : VENUES_DATA[0].id);
  const [selectedDate, setSelectedDate] = useState<string>('Today');
  const [selectedSlot, setSelectedSlot] = useState<string>('07:00 PM');
  const [selectedCourt, setSelectedCourt] = useState<number>(1);
  const [durationHours, setDurationHours] = useState<number>(1);
  const [needEquipmentRental, setNeedEquipmentRental] = useState<boolean>(false);
  const [isBooked, setIsBooked] = useState<boolean>(false);
  const [bookingRef, setBookingRef] = useState<string>('');

  if (!isOpen) return null;

  const currentVenue = venue || VENUES_DATA.find(v => v.id === selectedVenueId) || VENUES_DATA[0];

  const dates = [
    { label: 'Today', date: 'Wed, Oct 15' },
    { label: 'Tomorrow', date: 'Thu, Oct 16' },
    { label: 'Friday', date: 'Fri, Oct 17' },
    { label: 'Saturday', date: 'Sat, Oct 18' },
    { label: 'Sunday', date: 'Sun, Oct 19' },
  ];

  const baseRate = currentVenue.pricePerHour;
  const equipmentRate = needEquipmentRental ? 120 : 0;
  const subtotal = Math.round(baseRate * durationHours);
  const totalAmount = subtotal + equipmentRate;

  const handleConfirmBooking = () => {
    const randomCode = 'BLR-' + Math.floor(100000 + Math.random() * 900000);
    setBookingRef(randomCode);
    setIsBooked(true);
  };

  const handleResetAndClose = () => {
    setIsBooked(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity" 
        onClick={handleResetAndClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-xl glass-modal rounded-2xl shadow-2xl border border-slate-700/80 p-6 sm:p-8 text-slate-100 z-10 my-8">
        
        {/* Close Button */}
        <button
          onClick={handleResetAndClose}
          className="absolute top-5 right-5 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {!isBooked ? (
          <div>
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold tracking-wider uppercase mb-1">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>Instant Court Reservation</span>
            </div>
            
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Book Court at {currentVenue.name}
            </h2>
            
            <div className="flex items-center gap-2 text-xs text-slate-400 mt-1 mb-6">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              <span>{currentVenue.locality}, Bengaluru</span>
              <span aria-hidden="true">·</span>
              <span className="text-emerald-400 font-medium">₹{currentVenue.pricePerHour}/hr</span>
            </div>

            {/* If opened without a specific venue, let user switch */}
            {!venue && (
              <div className="mb-5">
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Select Venue
                </label>
                <select
                  value={selectedVenueId}
                  onChange={(e) => setSelectedVenueId(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700/70 text-slate-200 text-sm focus:outline-none focus:border-emerald-500"
                >
                  {VENUES_DATA.map((v) => (
                    <option key={v.id} value={v.id}>
                      {v.name} ({v.locality}) - ₹{v.pricePerHour}/hr
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Date Selection */}
            <div className="mb-5">
              <label className="block text-xs font-semibold text-slate-300 mb-2">
                1. Select Play Date
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                {dates.map((d) => (
                  <button
                    key={d.label}
                    type="button"
                    onClick={() => setSelectedDate(d.label)}
                    className={`py-2 px-2 rounded-xl text-center border transition-all cursor-pointer ${
                      selectedDate === d.label
                        ? 'border-emerald-500 bg-emerald-500/15 text-emerald-300 shadow-sm shadow-emerald-500/20'
                        : 'border-slate-800 bg-slate-900/60 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className="text-xs font-semibold">{d.label}</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">{d.date.split(',')[1]}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Slot Selection */}
            <div className="mb-5">
              <label className="block text-xs font-semibold text-slate-300 mb-2">
                2. Select Preferred Time Slot
              </label>
              <div className="space-y-2">
                <div>
                  <span className="text-[11px] text-slate-400 uppercase tracking-wider block mb-1">Evening Prime Slots</span>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                    {currentVenue.slots.evening.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setSelectedSlot(slot)}
                        className={`py-1.5 px-2 rounded-lg text-xs font-medium border text-center transition-all ${
                          selectedSlot === slot
                            ? 'border-emerald-500 bg-emerald-500/20 text-emerald-300'
                            : 'border-slate-800 bg-slate-900/60 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-1">
                  <span className="text-[11px] text-slate-400 uppercase tracking-wider block mb-1">Morning Slots</span>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                    {currentVenue.slots.morning.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setSelectedSlot(slot)}
                        className={`py-1.5 px-2 rounded-lg text-xs font-medium border text-center transition-all ${
                          selectedSlot === slot
                            ? 'border-emerald-500 bg-emerald-500/20 text-emerald-300'
                            : 'border-slate-800 bg-slate-900/60 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Duration and Court Options */}
            <div className="grid grid-cols-2 gap-4 mb-5">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Duration
                </label>
                <div className="flex rounded-lg bg-slate-900/80 p-1 border border-slate-800">
                  {[1, 1.5, 2].map((dur) => (
                    <button
                      key={dur}
                      type="button"
                      onClick={() => setDurationHours(dur)}
                      className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                        durationHours === dur
                          ? 'bg-emerald-500 text-slate-950 shadow-sm'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {dur} hr
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Court Assignment
                </label>
                <select
                  value={selectedCourt}
                  onChange={(e) => setSelectedCourt(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-emerald-500"
                >
                  {Array.from({ length: currentVenue.courtsCount }, (_, i) => i + 1).map((num) => (
                    <option key={num} value={num}>
                      Court #{num} ({currentVenue.surfaceType.split(' ')[0]})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Equipment Addon */}
            <div className="mb-6 p-3 rounded-xl bg-slate-900/70 border border-slate-800 flex items-center justify-between">
              <div>
                <div className="text-xs font-medium text-slate-200">Need Equipment Rental?</div>
                <div className="text-[11px] text-slate-400">Rackets, tournament balls/shuttles, or bibs (+₹120)</div>
              </div>
              <input
                type="checkbox"
                id="rental-check"
                checked={needEquipmentRental}
                onChange={(e) => setNeedEquipmentRental(e.target.checked)}
                className="w-4 h-4 rounded border-slate-700 bg-slate-900 text-emerald-500 focus:ring-emerald-500"
              />
            </div>

            {/* Pricing Summary */}
            <div className="border-t border-slate-800 pt-4 mb-6 space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Court Fee ({durationHours} hr @ ₹{baseRate}/hr)</span>
                <span className="font-mono tabular-nums text-slate-200">₹{subtotal}</span>
              </div>
              {needEquipmentRental && (
                <div className="flex justify-between text-slate-400">
                  <span>Equipment Rental Kit</span>
                  <span className="font-mono tabular-nums text-slate-200">₹{equipmentRate}</span>
                </div>
              )}
              <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-slate-800/60">
                <span>Total Payable</span>
                <span className="font-mono tabular-nums text-emerald-400 text-base">₹{totalAmount}</span>
              </div>
              <div className="text-[11px] text-emerald-500/90 flex items-center gap-1 pt-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Zero cancellation fee up to 2 hours before game time</span>
              </div>
            </div>

            {/* Action Button */}
            <button
              onClick={handleConfirmBooking}
              className="w-full py-3 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-sm shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <CreditCard className="w-4 h-4 text-slate-950" />
              <span>Confirm & Lock Slot (₹{totalAmount})</span>
            </button>
          </div>
        ) : (
          /* Success Confirmation View */
          <div className="text-center py-4 space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div>
              <h3 className="text-2xl font-bold text-white">Court Reserved Successfully!</h3>
              <p className="text-xs text-slate-400 mt-1">
                Your slot is locked at {currentVenue.name}. A confirmation SMS has been dispatched.
              </p>
            </div>

            {/* Booking Details Card */}
            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-left space-y-2.5 text-xs">
              <div className="flex justify-between items-center border-b border-slate-800/80 pb-2">
                <span className="text-slate-400">Booking Reference</span>
                <span className="font-mono font-bold text-emerald-400">{bookingRef}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Venue & Court</span>
                <span className="font-medium text-slate-200">{currentVenue.name} · Court {selectedCourt}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Date & Slot</span>
                <span className="font-medium text-slate-200">{selectedDate} · {selectedSlot} ({durationHours} hr)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Location</span>
                <span className="text-slate-300">{currentVenue.locality}, Bengaluru</span>
              </div>
              <div className="flex justify-between items-center border-t border-slate-800/80 pt-2 font-semibold">
                <span className="text-slate-300">Amount Paid</span>
                <span className="font-mono tabular-nums text-emerald-400">₹{totalAmount}</span>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={handleResetAndClose}
                className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => {
                  navigator.clipboard?.writeText(`Sports Pulse Booking ${bookingRef} at ${currentVenue.name} on ${selectedDate} at ${selectedSlot}`);
                  alert('Booking details copied to clipboard!');
                }}
                className="flex-1 py-2.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Share with Team</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
