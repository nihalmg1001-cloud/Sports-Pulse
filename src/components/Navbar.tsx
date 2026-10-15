import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { 
  MapPin, 
  Menu, 
  X, 
  Activity, 
  ChevronDown,
  CalendarCheck
} from 'lucide-react';
import { LOCALITIES } from '../data/sportsData';

interface NavbarProps {
  currentLocality: string;
  onLocalityChange: (locality: string) => void;
  onOpenQuickBook: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentLocality,
  onLocalityChange,
  onOpenQuickBook
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [localityDropdownOpen, setLocalityDropdownOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Find Venues', path: '/venues' },
    { name: 'Academies & Coaches', path: '/coaches' },
    { name: 'Matchmaker', path: '/matchmaker' },
    { name: 'Cost Estimator', path: '/estimator' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-6">
        
        {/* Zone 1: Brand Wordmark */}
        <Link to="/" className="flex items-center gap-2.5 shrink-0 group focus:outline-none">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-slate-950 font-bold shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
            <Activity className="w-5 h-5 text-slate-950 stroke-[2.5]" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-extrabold tracking-tight text-white group-hover:text-emerald-400 transition-colors">
              Sports<span className="text-emerald-400">Pulse</span>
            </span>
          </div>
        </Link>

        {/* Zone 2: Navigation Links (Desktop) */}
        <nav className="hidden lg:flex items-center gap-1.5 xl:gap-2">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `px-3.5 py-1.5 text-sm font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/20'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </nav>

        {/* Zone 3: Location Indicator & Action */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Locality Switcher */}
          <div className="relative">
            <button
              onClick={() => setLocalityDropdownOpen(!localityDropdownOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg bg-slate-900/90 border border-slate-800 text-slate-200 hover:border-emerald-500/40 hover:text-emerald-400 transition-all cursor-pointer whitespace-nowrap"
              aria-label="Select locality in Bengaluru"
            >
              <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span className="max-w-[110px] sm:max-w-[130px] truncate">
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
                <div className="absolute right-0 mt-2 w-52 glass-modal rounded-xl shadow-2xl py-1.5 z-40 border border-slate-700/60 divide-y divide-slate-800/60">
                  <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    Select Locality (BLR)
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
                            ? 'text-emerald-400 bg-emerald-500/10 font-medium'
                            : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                        }`}
                      >
                        <span>{loc}</span>
                        {currentLocality === loc && (
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
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
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg shadow-md shadow-emerald-500/20 transition-all hover:scale-[1.02] cursor-pointer whitespace-nowrap shrink-0"
          >
            <CalendarCheck className="w-4 h-4 text-slate-950" />
            <span>Book Court</span>
          </button>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Open mobile menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-800/80 bg-slate-950/95 backdrop-blur-2xl px-4 pt-3 pb-6 space-y-2">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `block px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/20'
                    : 'text-slate-300 hover:text-white hover:bg-slate-900'
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuickBook();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-slate-950 bg-emerald-400 rounded-lg shadow-md shadow-emerald-500/20"
            >
              <CalendarCheck className="w-4 h-4 text-slate-950" />
              <span>Book Court Now</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
