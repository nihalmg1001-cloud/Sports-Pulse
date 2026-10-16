import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { 
  MapPin, 
  Menu, 
  X, 
  Activity, 
  ChevronDown,
  CalendarCheck,
  Compass,
  Trophy,
  GraduationCap
} from 'lucide-react';
import { LOCALITIES } from '../data/sportsData';

interface NavbarProps {
  currentLocality: string;
  onLocalityChange: (locality: string) => void;
  onOpenQuickBook: () => void;
  appMode?: 'booking' | 'coaching';
  onModeChange?: (mode: 'booking' | 'coaching') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentLocality,
  onLocalityChange,
  onOpenQuickBook,
  appMode = 'booking',
  onModeChange
}) => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [localityDropdownOpen, setLocalityDropdownOpen] = useState(false);

  const handleModeSwitch = (mode: 'booking' | 'coaching') => {
    onModeChange?.(mode);
    if (mode === 'booking') {
      navigate('/venues');
    } else {
      navigate('/coaches');
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Book Courts', path: '/venues' },
    { name: 'Coaching & Training', path: '/coaches' },
    { name: 'Find Your Sport', path: '/finder', highlight: true },
    { name: '4-Week Plan', path: '/plan' },
    { name: 'Matchmaker', path: '/matchmaker' },
    { name: 'Cost Estimator', path: '/estimator' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        
        {/* Zone 1: Brand Wordmark */}
        <Link to="/" className="flex items-center gap-2.5 shrink-0 group focus:outline-none">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-orange-500 flex items-center justify-center text-white font-bold shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
            <Activity className="w-5 h-5 text-white stroke-[2.5]" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-extrabold tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
              Sports<span className="text-orange-500">Pulse</span>
            </span>
          </div>
        </Link>

        {/* PROMINENT TOP-LEVEL MODE SWITCHER: Court Booking vs. Coaching & Training (Requirement 2) */}
        <div className="hidden md:flex items-center p-1 bg-slate-100 rounded-xl border border-slate-200/80 shadow-inner">
          <button
            onClick={() => handleModeSwitch('booking')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              appMode === 'booking'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <CalendarCheck className="w-3.5 h-3.5" />
            <span>Book a Court</span>
          </button>

          <button
            onClick={() => handleModeSwitch('coaching')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              appMode === 'coaching'
                ? 'bg-orange-500 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>Coaching & Training</span>
          </button>
        </div>

        {/* Zone 2: Navigation Links (Desktop) */}
        <nav className="hidden xl:flex items-center gap-1">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `px-3 py-1.5 text-xs font-bold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'text-blue-600 bg-blue-50 font-extrabold'
                    : link.highlight
                    ? 'text-orange-600 hover:bg-orange-50 font-extrabold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </nav>

        {/* Zone 3: Location Indicator & Action */}
        <div className="flex items-center gap-2.5 shrink-0">
          
          {/* Locality Switcher */}
          <div className="relative">
            <button
              onClick={() => setLocalityDropdownOpen(!localityDropdownOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-lg bg-slate-50 border border-slate-200 text-slate-700 hover:border-blue-400 hover:text-blue-600 transition-all cursor-pointer whitespace-nowrap"
              aria-label="Select locality in Bengaluru"
            >
              <MapPin className="w-3.5 h-3.5 text-orange-500 shrink-0" />
              <span className="max-w-[100px] sm:max-w-[130px] truncate">
                {currentLocality === 'All Localities' ? 'Bengaluru 📍' : `${currentLocality}`}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            </button>

            {localityDropdownOpen && (
              <>
                <div 
                  className="fixed inset-0 z-30" 
                  onClick={() => setLocalityDropdownOpen(false)}
                />
                <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-xl py-1.5 z-40 border border-slate-200 divide-y divide-slate-100">
                  <div className="px-3 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Select Locality (Bengaluru)
                  </div>
                  <div className="max-h-60 overflow-y-auto py-1">
                    {LOCALITIES.map((loc) => (
                      <button
                        key={loc}
                        onClick={() => {
                          onLocalityChange(loc);
                          setLocalityDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3 py-1.5 text-xs transition-colors flex items-center justify-between ${
                          currentLocality === loc
                            ? 'text-blue-600 bg-blue-50 font-bold'
                            : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                        }`}
                      >
                        <span>{loc}</span>
                        {currentLocality === loc && (
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Primary Action Button */}
          <button
            onClick={onOpenQuickBook}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md shadow-blue-500/20 transition-all hover:scale-[1.02] cursor-pointer whitespace-nowrap shrink-0"
          >
            <CalendarCheck className="w-4 h-4 text-white" />
            <span>Book Court</span>
          </button>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            aria-label="Open mobile menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-lg">
          
          {/* Mobile Mode Switcher */}
          <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-xl">
            <button
              onClick={() => {
                handleModeSwitch('booking');
                setMobileMenuOpen(false);
              }}
              className={`py-2 text-xs font-bold rounded-lg ${
                appMode === 'booking' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600'
              }`}
            >
              Book a Court
            </button>
            <button
              onClick={() => {
                handleModeSwitch('coaching');
                setMobileMenuOpen(false);
              }}
              className={`py-2 text-xs font-bold rounded-lg ${
                appMode === 'coaching' ? 'bg-orange-500 text-white shadow-xs' : 'text-slate-600'
              }`}
            >
              Coaching & Training
            </button>
          </div>

          <div className="space-y-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `block px-3.5 py-2.5 rounded-xl text-sm font-bold transition-colors ${
                    isActive
                      ? 'text-blue-600 bg-blue-50 border border-blue-200'
                      : link.highlight
                      ? 'text-orange-600 bg-orange-50/60 font-extrabold'
                      : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuickBook();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-bold text-white bg-blue-600 rounded-xl shadow-md shadow-blue-500/20"
            >
              <CalendarCheck className="w-4 h-4 text-white" />
              <span>Book Court Slot</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
