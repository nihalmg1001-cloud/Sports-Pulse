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
import { Venue, VENUES_DATA } from './data/sportsData';

export default function App() {
  const [currentLocality, setCurrentLocality] = useState<string>('All Localities');
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
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500/30 selection:text-emerald-300">
        
        {/* Modern Glassmorphic Top Navbar */}
        <Navbar
          currentLocality={currentLocality}
          onLocalityChange={setCurrentLocality}
          onOpenQuickBook={() => handleOpenBooking()}
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

        {/* Floating AI Concierge Widget ("Ask Sports Pulse AI 🤖") */}
        <AiConcierge
          onBookCourt={handleOpenBooking}
        />

      </div>
    </BrowserRouter>
  );
}
