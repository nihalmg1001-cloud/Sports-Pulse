import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { AiConcierge } from './components/AiConcierge';
import { Home } from './pages/Home';
import { FindVenues } from './pages/FindVenues';
import { Coaches } from './pages/Coaches';
import { Matchmaker } from './pages/Matchmaker';
import { CostEstimator } from './pages/CostEstimator';
import { SportFinder } from './pages/SportFinder';
import { StarterPlan } from './pages/StarterPlan';
import { Venue, VENUES_DATA } from './data/sportsData';

export default function App() {
  const [currentLocality, setCurrentLocality] = useState<string>('All Localities');
  const [appMode, setAppMode] = useState<'booking' | 'coaching'>('booking');
  const [bookingVenue, setBookingVenue] = useState<Venue | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState<boolean>(false);

  const handleOpenBooking = (venue?: Venue) => {
    setBookingVenue(venue || VENUES_DATA[0]);
    setIsBookingOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingOpen(false);
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-blue-600/20 selection:text-blue-700">
        
        {/* Modern Navbar with Top-Level Mode Switcher */}
        <Navbar
          currentLocality={currentLocality}
          onLocalityChange={setCurrentLocality}
          onOpenQuickBook={() => handleOpenBooking()}
          appMode={appMode}
          onModeChange={setAppMode}
        />

        {/* Page Content Routing */}
        <main className="flex-1">
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  onBookVenue={handleOpenBooking}
                  onLocalityChange={setCurrentLocality}
                  appMode={appMode}
                  onModeChange={setAppMode}
                />
              }
            />
            <Route
              path="/venues"
              element={
                <FindVenues
                  onBookVenue={handleOpenBooking}
                  currentLocality={currentLocality}
                  onLocalityChange={setCurrentLocality}
                />
              }
            />
            <Route
              path="/coaches"
              element={<Coaches />}
            />
            {/* Find Your Sport Grid (Requirement 3) */}
            <Route
              path="/finder"
              element={<SportFinder />}
            />
            <Route
              path="/find-your-sport"
              element={<SportFinder />}
            />
            {/* 4-Week Starter Plan (Requirement 4) */}
            <Route
              path="/plan"
              element={<StarterPlan />}
            />
            <Route
              path="/my-journey"
              element={<StarterPlan />}
            />
            <Route
              path="/matchmaker"
              element={<Matchmaker />}
            />
            <Route
              path="/estimator"
              element={<CostEstimator />}
            />
            {/* Catch-all route redirects to Home */}
            <Route
              path="*"
              element={
                <Home
                  onBookVenue={handleOpenBooking}
                  onLocalityChange={setCurrentLocality}
                  appMode={appMode}
                  onModeChange={setAppMode}
                />
              }
            />
          </Routes>
        </main>

        {/* Responsive Footer */}
        <Footer
          onSelectLocality={setCurrentLocality}
        />

        {/* Universal Court Reservation Modal */}
        <BookingModal
          venue={bookingVenue}
          isOpen={isBookingOpen}
          onClose={handleCloseBooking}
        />

        {/* Floating AI Concierge Widget ("Ask Pulse AI 🤖") */}
        <AiConcierge
          onBookCourt={handleOpenBooking}
        />

      </div>
    </BrowserRouter>
  );
}
