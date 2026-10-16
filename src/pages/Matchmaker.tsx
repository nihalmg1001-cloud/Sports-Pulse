import React, { useState } from 'react';
import { 
  Users, 
  MapPin, 
  Clock, 
  Plus, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  Filter, 
  MessageSquare, 
  X,
  Share2,
  CalendarCheck
} from 'lucide-react';
import { MatchLobby, MATCH_LOBBIES_DATA, SPORTS, LOCALITIES } from '../data/sportsData';

export const Matchmaker: React.FC = () => {
  const [lobbies, setLobbies] = useState<MatchLobby[]>(MATCH_LOBBIES_DATA);
  const [selectedSport, setSelectedSport] = useState<string>('all');
  const [selectedLocality, setSelectedLocality] = useState<string>('All Localities');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);

  // New lobby form state
  const [newTitle, setNewTitle] = useState('');
  const [newSport, setNewSport] = useState('Football');
  const [newLocality, setNewLocality] = useState('Indiranagar');
  const [newVenueName, setNewVenueName] = useState('');
  const [newDateTime, setNewDateTime] = useState('');
  const [newSkillLevel, setNewSkillLevel] = useState<'Casual / Beginner' | 'Intermediate' | 'Advanced Competitive'>('Intermediate');
  const [newMaxPlayers, setNewMaxPlayers] = useState<number>(10);
  const [newSharePrice, setNewSharePrice] = useState<number>(150);
  const [newNotes, setNewNotes] = useState('');

  const handleToggleJoin = (id: string) => {
    setLobbies(prev => prev.map(lobby => {
      if (lobby.id === id) {
        const isJoined = lobby.isJoined;
        if (isJoined) {
          return {
            ...lobby,
            isJoined: false,
            currentPlayers: Math.max(1, lobby.currentPlayers - 1)
          };
        } else {
          if (lobby.currentPlayers >= lobby.maxPlayers) {
            alert('This lobby is already full!');
            return lobby;
          }
          return {
            ...lobby,
            isJoined: true,
            currentPlayers: lobby.currentPlayers + 1
          };
        }
      }
      return lobby;
    }));
  };

  const handleCreateLobby = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newVenueName || !newDateTime) {
      alert('Please fill in game title, venue name, and date/time.');
      return;
    }

    const created: MatchLobby = {
      id: 'lobby-' + Date.now(),
      title: newTitle,
      sport: newSport,
      locality: newLocality,
      venueName: newVenueName,
      dateTime: newDateTime,
      hostName: 'You (Organizer)',
      hostAvatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=You',
      skillLevel: newSkillLevel,
      currentPlayers: 1,
      maxPlayers: newMaxPlayers,
      priceSharePerPerson: newSharePrice,
      notes: newNotes || 'Join us for a friendly match!',
      isJoined: true
    };

    setLobbies([created, ...lobbies]);
    setIsCreateModalOpen(false);
    // Reset
    setNewTitle('');
    setNewVenueName('');
    setNewDateTime('');
    setNewNotes('');
  };

  const filteredLobbies = lobbies.filter(lobby => {
    if (selectedSport !== 'all' && lobby.sport !== selectedSport) return false;
    if (selectedLocality !== 'All Localities' && lobby.locality !== selectedLocality) return false;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="text-xs text-blue-600 font-bold tracking-wider uppercase mb-1 flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-orange-500" />
            <span>Bengaluru Sports Community</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Player Matchmaker & Lobbies
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Need an extra player for tonight&apos;s football turf or a doubles badminton partner in your locality? Connect and split court costs.
          </p>
        </div>

        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="self-start md:self-auto flex items-center gap-2 px-4 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs sm:text-sm shadow-md shadow-orange-500/20 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4 text-white stroke-[2.5]" />
          <span>Host a Game Lobby</span>
        </button>
      </div>

      {/* Filter Tabs (Light Theme) */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          
          {/* Sport buttons */}
          <div className="flex flex-wrap gap-2">
            {SPORTS.map((sport) => (
              <button
                key={sport.id}
                onClick={() => setSelectedSport(sport.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedSport === sport.id
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-slate-50 text-slate-700 hover:text-slate-900 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {sport.name}
              </button>
            ))}
          </div>

          {/* Locality dropdown */}
          <div className="flex items-center gap-2 text-xs">
            <MapPin className="w-3.5 h-3.5 text-orange-500" />
            <select
              value={selectedLocality}
              onChange={(e) => setSelectedLocality(e.target.value)}
              className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-semibold focus:outline-none focus:border-blue-600 cursor-pointer"
            >
              {LOCALITIES.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>

        </div>
      </div>

      {/* Lobbies List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredLobbies.map((lobby) => {
          const isFull = lobby.currentPlayers >= lobby.maxPlayers;
          const spotsLeft = lobby.maxPlayers - lobby.currentPlayers;

          return (
            <div
              key={lobby.id}
              className={`bg-white rounded-3xl p-6 sm:p-7 border flex flex-col justify-between transition-all shadow-sm ${
                lobby.isJoined
                  ? 'border-blue-500 ring-2 ring-blue-500/20 shadow-md'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="space-y-4">
                
                {/* Header row */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 text-[11px] text-slate-500 mb-1 font-semibold">
                      <span className="font-bold text-orange-600">{lobby.sport}</span>
                      <span>·</span>
                      <span className="text-slate-600">{lobby.skillLevel}</span>
                    </div>
                    <h3 className="text-lg font-extrabold text-slate-900 tracking-tight">
                      {lobby.title}
                    </h3>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="text-[10px] text-slate-400 uppercase font-bold">Share Per Player</div>
                    <div className="text-lg font-extrabold text-blue-700 font-mono tabular-nums">
                      ₹{lobby.priceSharePerPerson}
                    </div>
                  </div>
                </div>

                {/* Venue and Timing info */}
                <div className="space-y-1.5 text-xs text-slate-700 bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                    <span className="font-bold text-slate-900">{lobby.venueName}</span>
                    <span className="text-slate-500">({lobby.locality})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span className="font-medium text-slate-800">{lobby.dateTime}</span>
                  </div>
                </div>

                {/* Notes */}
                <p className="text-xs text-slate-600 leading-relaxed">
                  {lobby.notes}
                </p>

                {/* Host and Capacity Progress */}
                <div className="flex items-center justify-between text-xs pt-2">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-[10px] text-blue-700 font-extrabold">
                      {lobby.hostName.charAt(0)}
                    </div>
                    <span className="text-slate-500 text-[11px]">
                      Hosted by <strong className="text-slate-900">{lobby.hostName}</strong>
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 text-[11px]">
                    <span className={`font-mono font-bold ${spotsLeft <= 2 ? 'text-orange-600' : 'text-blue-700'}`}>
                      {lobby.currentPlayers}/{lobby.maxPlayers} Spots Filled
                    </span>
                  </div>
                </div>

                {/* Capacity Bar */}
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-blue-600 to-orange-500 h-full rounded-full transition-all"
                    style={{ width: `${(lobby.currentPlayers / lobby.maxPlayers) * 100}%` }}
                  />
                </div>

              </div>

              {/* Action Buttons */}
              <div className="pt-5 mt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                <div className="text-[11px] text-slate-500 font-medium">
                  {spotsLeft > 0 ? `${spotsLeft} spots remaining` : 'Lobby is full'}
                </div>

                <button
                  onClick={() => handleToggleJoin(lobby.id)}
                  disabled={!lobby.isJoined && isFull}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                    lobby.isJoined
                      ? 'bg-slate-100 hover:bg-slate-200 text-rose-600 border border-rose-200'
                      : isFull
                      ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20'
                  }`}
                >
                  {lobby.isJoined ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Joined · Leave</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-3.5 h-3.5" />
                      <span>RSVP & Join Match</span>
                    </>
                  )}
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {/* Host New Game Modal (Light Theme) */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div 
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm" 
            onClick={() => setIsCreateModalOpen(false)} 
          />

          <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 text-slate-900 z-10 my-8 border border-slate-200 shadow-2xl space-y-4">
            <button
              onClick={() => setIsCreateModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <h3 className="text-xl font-extrabold text-slate-900">Host a Game Lobby</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Publish a match invite for players in your Bengaluru neighborhood.
              </p>
            </div>

            <form onSubmit={handleCreateLobby} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Game Title *
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. 5v5 Football Turf Match"
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-blue-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Sport
                  </label>
                  <select
                    value={newSport}
                    onChange={(e) => setNewSport(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-semibold focus:outline-none focus:border-blue-600"
                  >
                    {SPORTS.filter(s => s.id !== 'all').map(s => (
                      <option key={s.id} value={s.id}>{s.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Locality
                  </label>
                  <select
                    value={newLocality}
                    onChange={(e) => setNewLocality(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-semibold focus:outline-none focus:border-blue-600"
                  >
                    {LOCALITIES.filter(l => l !== 'All Localities').map(l => (
                      <option key={l} value={l}>{l}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Venue Name & Court *
                </label>
                <input
                  type="text"
                  required
                  value={newVenueName}
                  onChange={(e) => setNewVenueName(e.target.value)}
                  placeholder="e.g. Apex Sky Turf (Court 2)"
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-blue-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Date & Time *
                  </label>
                  <input
                    type="text"
                    required
                    value={newDateTime}
                    onChange={(e) => setNewDateTime(e.target.value)}
                    placeholder="e.g. Tonight · 8:00 PM"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Skill Level
                  </label>
                  <select
                    value={newSkillLevel}
                    onChange={(e) => setNewSkillLevel(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-semibold focus:outline-none focus:border-blue-600"
                  >
                    <option value="Casual / Beginner">Casual / Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced Competitive">Advanced Competitive</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Max Total Players
                  </label>
                  <input
                    type="number"
                    min="2"
                    max="30"
                    value={newMaxPlayers}
                    onChange={(e) => setNewMaxPlayers(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-mono font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Share Per Person (₹)
                  </label>
                  <input
                    type="number"
                    min="50"
                    max="1000"
                    value={newSharePrice}
                    onChange={(e) => setNewSharePrice(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-mono font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Notes for Joining Players
                </label>
                <textarea
                  rows={2}
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  placeholder="e.g. Please bring extra shuttlecocks, turf shoes only, fun relaxed game."
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-blue-600"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs shadow-md transition-all mt-2 cursor-pointer"
              >
                Publish Lobby
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
