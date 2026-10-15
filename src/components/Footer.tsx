import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, MapPin, Mail, Phone, ShieldCheck, Heart } from 'lucide-react';
import { LOCALITIES, SPORTS } from '../data/sportsData';

interface FooterProps {
  onSelectLocality?: (loc: string) => void;
  onSelectSport?: (sport: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectLocality, onSelectSport }) => {
  return (
    <footer className="mt-20 border-t border-slate-800/80 bg-slate-950/90 backdrop-blur-md relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-slate-950 font-bold shadow-sm shadow-emerald-500/20">
                <Activity className="w-4 h-4 text-slate-950 stroke-[2.5]" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Sports<span className="text-emerald-400">Pulse</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Bengaluru&apos;s premier network for sports enthusiasts. Discover verified indoor courts, accredited coaching academies, and connect with passionate players across every neighborhood.
            </p>
            <div className="flex flex-col gap-2 pt-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Headquarters: Indiranagar, Bengaluru, KA 560038</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-teal-400 shrink-0" />
                <span>concierge@sportspulse.blr</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>+91 80 4920 8800 (Mon - Sun, 6 AM - 11 PM)</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-slate-200 tracking-wider uppercase">
              Platform
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link to="/venues" className="hover:text-emerald-400 transition-colors">
                  Find Venues & Courts
                </Link>
              </li>
              <li>
                <Link to="/coaches" className="hover:text-emerald-400 transition-colors">
                  Academies & Coaches
                </Link>
              </li>
              <li>
                <Link to="/matchmaker" className="hover:text-emerald-400 transition-colors">
                  Player Matchmaker
                </Link>
              </li>
              <li>
                <Link to="/estimator" className="hover:text-emerald-400 transition-colors">
                  Cost & Budget Estimator
                </Link>
              </li>
              <li>
                <span className="text-slate-500">Corporate Leagues</span>
              </li>
            </ul>
          </div>

          {/* Localities Directory */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-slate-200 tracking-wider uppercase">
              Top Localities
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {LOCALITIES.filter(l => l !== 'All Localities').map((locality) => (
                <Link
                  key={locality}
                  to={`/venues?locality=${encodeURIComponent(locality)}`}
                  onClick={() => onSelectLocality?.(locality)}
                  className="text-xs text-slate-400 hover:text-emerald-300 hover:underline transition-colors py-1 px-1.5"
                >
                  {locality}
                </Link>
              ))}
            </div>
          </div>

          {/* Sports Categories */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-slate-200 tracking-wider uppercase">
              Sports Hubs
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {SPORTS.filter(s => s.id !== 'all').map((sport) => (
                <Link
                  key={sport.id}
                  to={`/venues?sport=${encodeURIComponent(sport.id)}`}
                  onClick={() => onSelectSport?.(sport.id)}
                  className="text-xs text-slate-400 hover:text-teal-300 hover:underline transition-colors py-1 px-1.5"
                >
                  {sport.name}
                </Link>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>100% Verified Courts & Certified NIS / BWF / ITF Coaches across Bengaluru</span>
          </div>
          <div className="flex items-center gap-1">
            <span>Built with precision for Bengaluru sports enthusiasts</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
