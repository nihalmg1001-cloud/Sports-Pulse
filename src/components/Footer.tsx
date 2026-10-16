import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, MapPin, Mail, Phone, ShieldCheck, Trophy, Sparkles } from 'lucide-react';
import { LOCALITIES, SPORTS } from '../data/sportsData';

interface FooterProps {
  onSelectLocality?: (loc: string) => void;
  onSelectSport?: (sport: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectLocality, onSelectSport }) => {
  return (
    <footer className="mt-20 border-t border-slate-200 bg-white relative overflow-hidden text-slate-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-orange-500 flex items-center justify-center text-white font-bold shadow-md shadow-blue-500/20">
                <Activity className="w-5 h-5 text-white stroke-[2.5]" />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-slate-900">
                Sports<span className="text-orange-500">Pulse</span>
              </span>
            </Link>
            <p className="text-sm text-slate-600 leading-relaxed max-w-sm">
              Bengaluru&apos;s premier platform for court slot bookings and accredited coaching academies. Discover verified BWF synthetic courts, FIFA turfs, and certified NIS/BWF trainers across town.
            </p>
            <div className="flex flex-col gap-2 pt-2 text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-orange-500 shrink-0" />
                <span>Indiranagar 100ft Road, Bengaluru, KA 560038</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-600 shrink-0" />
                <span>concierge@sportspulse.blr</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-indigo-600 shrink-0" />
                <span>+91 80 4920 8800 (Mon - Sun, 6 AM - 11 PM)</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-900 tracking-wider uppercase">
              Platform Features
            </h4>
            <ul className="space-y-2 text-sm text-slate-600 font-medium">
              <li>
                <Link to="/venues" className="hover:text-blue-600 transition-colors">
                  Book Court Slots
                </Link>
              </li>
              <li>
                <Link to="/coaches" className="hover:text-orange-600 transition-colors">
                  Coaching & Academies
                </Link>
              </li>
              <li>
                <Link to="/finder" className="hover:text-blue-600 transition-colors font-bold text-blue-600">
                  Find Your Sport Grid
                </Link>
              </li>
              <li>
                <Link to="/plan" className="hover:text-orange-600 transition-colors font-bold text-orange-600">
                  4-Week Starter Plan
                </Link>
              </li>
              <li>
                <Link to="/matchmaker" className="hover:text-blue-600 transition-colors">
                  Player Matchmaker
                </Link>
              </li>
              <li>
                <Link to="/estimator" className="hover:text-blue-600 transition-colors">
                  Cost & Budget Estimator
                </Link>
              </li>
            </ul>
          </div>

          {/* Localities Directory */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-900 tracking-wider uppercase">
              Bengaluru Localities
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {LOCALITIES.filter(l => l !== 'All Localities').map((locality) => (
                <Link
                  key={locality}
                  to={`/venues?locality=${encodeURIComponent(locality)}`}
                  onClick={() => onSelectLocality?.(locality)}
                  className="text-xs text-slate-600 hover:text-blue-600 hover:underline transition-colors py-1 px-1.5"
                >
                  {locality}
                </Link>
              ))}
            </div>
          </div>

          {/* Sports Categories */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-900 tracking-wider uppercase">
              Sports Hubs
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {SPORTS.filter(s => s.id !== 'all').map((sport) => (
                <Link
                  key={sport.id}
                  to={`/venues?sport=${encodeURIComponent(sport.id)}`}
                  onClick={() => onSelectSport?.(sport.id)}
                  className="text-xs text-slate-600 hover:text-orange-600 hover:underline transition-colors py-1 px-1.5"
                >
                  {sport.name}
                </Link>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>100% Verified Courts & Certified NIS / BWF / ITF Coaches across Bengaluru</span>
          </div>
          <div>
            <span>© {new Date().getFullYear()} Sports Pulse Bengaluru. All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
