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
  ShieldCheck,
  Zap
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
    { label: 'Today', date: 'Fri, Oct 16' },
    { label: 'Tomorrow', date: 'Sat, Oct 17' },
    { label: 'Sunday', date: 'Sun, Oct 18' },
    { label: 'Monday', date: 'Mon, Oct 19' },
    { label: 'Tuesday', date: 'Tue, Oct 20' },
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
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity" 
        onClick={handleResetAndClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 p-6 sm:p-8 text-slate-900 z-10 my-8">
        
        {/* Close Button */}
        <button
          onClick={handleResetAndClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {!isBooked ? (
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider mb-2">
              <Zap className="w-3.5 h-3.5 text-blue-600" />
              <span>Court Slot Booking (Self-Play · No Trainer)</span>
            </div>
            
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Reserve Slot at {currentVenue.name}
            </h2>
            
            <div className="flex items-center gap-2 text-xs text-slate-500 mt-1 mb-6">
              <MapPin className="w-3.5 h-3.5 text-orange-500" />
              <span>{currentVenue.locality}, Bengaluru</span>
              <span aria-hidden="true">·</span>
              <span className="text-blue-700 font-bold font-mono">₹{currentVenue.pricePerHour}/hr</span>
            </div>

            {/* If opened without a specific venue, let user switch */}
            {!venue && (
              <div className="mb-5">
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Select Venue
                </label>
                <select
                  value={selectedVenueId}
                  onChange={(e) => setSelectedVenueId(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-blue-600"
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
              <label className="block text-xs font-bold text-slate-700 mb-2">
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
                        ? 'border-blue-600 bg-blue-50 text-blue-800 shadow-xs font-bold'
                        : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <div className="text-xs font-bold">{d.label}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">{d.date.split(',')[1]}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Slot Selection */}
            <div className="mb-5">
              <label className="block text-xs font-bold text-slate-700 mb-2">
                2. Select Preferred Time Slot
              </label>
              <div className="space-y-3">
                <div>
                  <span className="text-[11px] text-slate-500 font-bold uppercase tracking-wider block mb-1">Evening Prime Slots</span>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                    {currentVenue.slots.evening.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setSelectedSlot(slot)}
                        className={`py-1.5 px-2 rounded-lg text-xs font-semibold border text-center transition-all ${
                          selectedSlot === slot
                            ? 'border-blue-600 bg-blue-600 text-white font-bold shadow-xs'
                            : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-[11px] text-slate-500 font-bold uppercase tracking-wider block mb-1">Morning Off-Peak Slots</span>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                    {currentVenue.slots.morning.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setSelectedSlot(slot)}
                        className={`py-1.5 px-2 rounded-lg text-xs font-semibold border text-center transition-all ${
                          selectedSlot === slot
                            ? 'border-blue-600 bg-blue-600 text-white font-bold shadow-xs'
                            : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
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
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Duration
                </label>
                <div className="flex rounded-xl bg-slate-100 p-1 border border-slate-200">
                  {[1, 1.5, 2].map((dur) => (
                    <button
                      key={dur}
                      type="button"
                      onClick={() => setDurationHours(dur)}
                      className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-colors ${
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
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Court Assignment
                </label>
                <select
                  value={selectedCourt}
                  onChange={(e) => setSelectedCourt(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-semibold focus:outline-none focus:border-blue-600"
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
            <div className="mb-6 p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-slate-900">Need Equipment Rental?</div>
                <div className="text-[11px] text-slate-500">Racquets, tournament shuttles, or team bibs (+₹120)</div>
              </div>
              <input
                type="checkbox"
                id="rental-check"
                checked={needEquipmentRental}
                onChange={(e) => setNeedEquipmentRental(e.target.checked)}
                className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
              />
            </div>

            {/* Pricing Summary */}
            <div className="border-t border-slate-200 pt-4 mb-6 space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Court Fee ({durationHours} hr @ ₹{baseRate}/hr)</span>
                <span className="font-mono tabular-nums text-slate-900 font-bold">₹{subtotal}</span>
              </div>
              {needEquipmentRental && (
                <div className="flex justify-between text-slate-600">
                  <span>Equipment Rental Kit</span>
                  <span className="font-mono tabular-nums text-slate-900 font-bold">₹{equipmentRate}</span>
                </div>
              )}
              <div className="flex justify-between text-sm font-extrabold text-slate-900 pt-2 border-t border-slate-200">
                <span>Total Amount Payable</span>
                <span className="font-mono tabular-nums text-blue-700 text-lg">₹{totalAmount}</span>
              </div>
              <div className="text-[11px] text-emerald-700 flex items-center gap-1 pt-1 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Zero cancellation fee up to 2 hours before game time</span>
              </div>
            </div>

            {/* Action Button */}
            <button
              onClick={handleConfirmBooking}
              className="w-full py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <CreditCard className="w-4 h-4 text-white" />
              <span>Confirm & Lock Court Slot (₹{totalAmount})</span>
            </button>
          </div>
        ) : (
          /* Success Confirmation View */
          <div className="text-center py-4 space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div>
              <h3 className="text-2xl font-extrabold text-slate-900">Court Reserved Successfully!</h3>
              <p className="text-xs text-slate-500 mt-1">
                Your court slot is locked at {currentVenue.name}. A confirmation SMS has been dispatched.
              </p>
            </div>

            {/* Booking Details Card */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left space-y-2.5 text-xs">
              <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                <span className="text-slate-500">Booking Reference</span>
                <span className="font-mono font-extrabold text-blue-700">{bookingRef}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Venue & Court</span>
                <span className="font-bold text-slate-900">{currentVenue.name} · Court {selectedCourt}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Date & Slot</span>
                <span className="font-bold text-slate-900">{selectedDate} · {selectedSlot} ({durationHours} hr)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Location</span>
                <span className="text-slate-700">{currentVenue.locality}, Bengaluru</span>
              </div>
              <div className="flex justify-between items-center border-t border-slate-200 pt-2 font-bold">
                <span className="text-slate-700">Amount Paid</span>
                <span className="font-mono tabular-nums text-blue-700 text-sm">₹{totalAmount}</span>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={handleResetAndClose}
                className="flex-1 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => {
                  navigator.clipboard?.writeText(`Sports Pulse Booking ${bookingRef} at ${currentVenue.name} on ${selectedDate} at ${selectedSlot}`);
                  alert('Booking details copied to clipboard!');
                }}
                className="flex-1 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-md shadow-orange-500/20"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Share with Squad</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
