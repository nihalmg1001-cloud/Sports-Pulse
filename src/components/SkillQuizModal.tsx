import React, { useState } from 'react';
import { 
  X, 
  HelpCircle, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  Award, 
  RotateCcw,
  Zap,
  TrendingUp,
  ShieldCheck
} from 'lucide-react';

export type SkillLevel = 'Beginner' | 'Intermediate' | 'Advanced';

interface QuizQuestion {
  id: number;
  question: string;
  subtitle?: string;
  options: {
    text: string;
    description: string;
    points: number; // 1, 2, or 3 points
  }[];
}

interface SkillQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  sport?: string;
  onSelectLevel: (level: SkillLevel, score: number) => void;
}

const QUIZ_DATA_BY_SPORT: Record<string, QuizQuestion[]> = {
  Badminton: [
    {
      id: 1,
      question: "How sustained are your rallies during continuous play?",
      subtitle: "Rally control & consistency under speed",
      options: [
        { text: "1 to 3 shots", description: "Frequently miss contact, struggle with timing or net the shuttle", points: 1 },
        { text: "4 to 10 shots", description: "Consistent medium-pace rallies with basic high clears and defensive drops", points: 2 },
        { text: "12+ sustained shots", description: "High-tempo attacking rallies with jump smashes, net kills, and recovery", points: 3 },
      ]
    },
    {
      id: 2,
      question: "How would you describe your court movement and footwork?",
      subtitle: "Base recovery & multi-corner reach",
      options: [
        { text: "Flat-footed / Running", description: "I sprint directly toward the shuttle and often get caught off balance", points: 1 },
        { text: "Basic Split-Step & Chassé", description: "Recover to center court and can reach deep corners with moderate speed", points: 2 },
        { text: "Dynamic Multi-Corner Footwork", description: "Fluid split-steps, scissor kicks, deep lunges, and effortless recovery", points: 3 },
      ]
    },
    {
      id: 3,
      question: "Which serving & return techniques do you execute comfortably?",
      subtitle: "Service accuracy and first-shot advantage",
      options: [
        { text: "High Underhand Serve Only", description: "Struggle with low backhand serves or returning fast flat drives", points: 1 },
        { text: "Consistent Low Backhand Serve", description: "Good height over the tape and basic flick variations in doubles", points: 2 },
        { text: "Tactical Deceptive Serves", description: "Pinpoint drive, tumbling net spins, and aggressive attacking returns", points: 3 },
      ]
    },
    {
      id: 4,
      question: "How frequently do you play competitive or organized badminton?",
      subtitle: "Match experience & game tempo",
      options: [
        { text: "Casual / Occasional", description: "Play once a month or just getting started with friends", points: 1 },
        { text: "Weekly Games (1-2x/week)", description: "Play weekly matches, understand doubles positioning and scoring rules", points: 2 },
        { text: "Tournament / Ranked League", description: "Regular corporate tournament, club league, or structured academy training", points: 3 },
      ]
    },
    {
      id: 5,
      question: "What is your primary training goal with an academy coach?",
      subtitle: "Coaching trajectory & focus area",
      options: [
        { text: "Fundamentals & Grip", description: "Learn correct forehand/backhand grip, stroke mechanics, and injury prevention", points: 1 },
        { text: "Tactics & Shot Consistency", description: "Add power to backhand clears, sharpen net play, and master match tactics", points: 2 },
        { text: "Elite Tournament Conditioning", description: "Biomechanical precision, match temperament, deceptive slicing, and peak fitness", points: 3 },
      ]
    }
  ],
  Football: [
    {
      id: 1,
      question: "How reliable is your first touch when receiving a pass?",
      subtitle: "Ball control & initial direction",
      options: [
        { text: "Inconsistent Control", description: "The ball often bounces 2-3 yards away or requires multiple touches to settle", points: 1 },
        { text: "Dependable First Touch", description: "Can cushion ground balls and open my body into space comfortably", points: 2 },
        { text: "First-Time Master", description: "Effortless aerial control, chest control, and one-touch distribution under pressure", points: 3 },
      ]
    },
    {
      id: 2,
      question: "What is your passing range and weak-foot capability?",
      subtitle: "Distribution & dual-foot accuracy",
      options: [
        { text: "Dominant Foot Only", description: "Can only pass short distances comfortably using my stronger foot", points: 1 },
        { text: "Solid Short/Medium Passing", description: "Accurate ground balls and moderate ability with my weaker foot", points: 2 },
        { text: "Complete Passing Range", description: "Driven passes, lofted cross-field diagonals, and through-balls with either foot", points: 3 },
      ]
    },
    {
      id: 3,
      question: "How do you handle match awareness and tactical positioning?",
      subtitle: "Spatial awareness in 5v5 / 11v11",
      options: [
        { text: "Follow the Ball", description: "Tend to get drawn toward the ball rather than holding designated zone", points: 1 },
        { text: "Basic Tactical Shape", description: "Understand defensive line discipline and spreading out when attacking", points: 2 },
        { text: "Vocal Organizer", description: "Coordinate pressing traps, execute overlapping runs, and dictate game tempo", points: 3 },
      ]
    },
    {
      id: 4,
      question: "What is your regular playing frequency and competitive background?",
      subtitle: "Stamina & game frequency",
      options: [
        { text: "Occasional Kickabout", description: "Casual play once or twice a month with friends or office mates", points: 1 },
        { text: "Weekly Turf Matches", description: "Play 1-2 times weekly on Bengaluru astro-turfs with solid stamina", points: 2 },
        { text: "League / Academy Squad", description: "Compete in amateur divisions, 5v5 tournaments, or structured team training", points: 3 },
      ]
    },
    {
      id: 5,
      question: "What is your primary coaching focus?",
      subtitle: "Skill enhancement target",
      options: [
        { text: "Basic Striking & Stamina", description: "Learn proper ball striking with laces and build 60-min match stamina", points: 1 },
        { text: "1v1 Dribbling & Decision Making", description: "Sharpen change of pace, transition recovery, and goal-scoring composure", points: 2 },
        { text: "High-Performance Match Mastery", description: "Position-specific tactical drills, set-piece execution, and elite fitness", points: 3 },
      ]
    }
  ],
  Tennis: [
    {
      id: 1,
      question: "How consistent are your baseline groundstroke rallies?",
      subtitle: "Rally depth & baseline control",
      options: [
        { text: "1 to 2 Shots", description: "Struggle with timing; balls often fly long into the fence or dump into the net", points: 1 },
        { text: "Moderate Topspin Rallies", description: "Can sustain 5-8 shot rallies at medium pace with consistent depth", points: 2 },
        { text: "Heavy Penetrating Rallies", description: "Dictate pace with deep heavy topspin or slice with precise directional control", points: 3 },
      ]
    },
    {
      id: 2,
      question: "How dependable is your serve motion?",
      subtitle: "First & second serve reliability",
      options: [
        { text: "Inconsistent Push Serve", description: "Frequently double fault or tap the ball gently just to start the point", points: 1 },
        { text: "Reliable First & Spin Second", description: "Solid flat first serve and dependable slice/kick second serve (rarely double fault)", points: 2 },
        { text: "Weaponized Serve", description: "Can hit aggressive kick, slice, and flat serves hitting specific corners on command", points: 3 },
      ]
    },
    {
      id: 3,
      question: "How comfortable are you moving forward to the net for volleys?",
      subtitle: "Net play & transition game",
      options: [
        { text: "Avoid Net Completely", description: "Feel vulnerable at the net and strictly prefer staying behind baseline", points: 1 },
        { text: "Solid Punch Volleys", description: "Can put away floating volleys and execute basic overhead smashes", points: 2 },
        { text: "All-Court Attacker", description: "Comfortable serve-and-volleying, drop volleys, and closing out points at the net", points: 3 },
      ]
    },
    {
      id: 4,
      question: "What is your tennis tournament or match background?",
      subtitle: "NTRP rating / playing history",
      options: [
        { text: "Beginner (< 2.5 NTRP)", description: "Brand new or have taken fewer than 5-10 lessons total", points: 1 },
        { text: "Club Player (3.0 - 3.5 NTRP)", description: "Play weekly matches with friends, understand tiebreaks and court strategies", points: 2 },
        { text: "Tournament Competitor (4.0+ NTRP)", description: "Active in AITA tournaments, ranking ladders, or advanced academy squads", points: 3 },
      ]
    },
    {
      id: 5,
      question: "What would you like a coach to help you unlock?",
      subtitle: "Coaching development priority",
      options: [
        { text: "Grip & Swing Fundamentals", description: "Master eastern/semi-western grip, preparation turn, and fluid kinetic chain", points: 1 },
        { text: "Second Serve & Weapon Development", description: "Strengthen backhand, develop reliable spin second serve, and point construction", points: 2 },
        { text: "Competitive Edge & Mental Toughness", description: "Tactical counter-strategies, high-pressure execution, and explosive footwork", points: 3 },
      ]
    }
  ],
  Cricket: [
    {
      id: 1,
      question: "What bowling pace do you comfortably face in the nets?",
      subtitle: "Reaction time & leather ball comfort",
      options: [
        { text: "Underarm / Tennis Ball", description: "Comfortable with casual tennis ball feeds; haven't faced hard leather bowling", points: 1 },
        { text: "Medium Pace (90 - 110 km/h)", description: "Comfortable facing regular leather-ball medium pacers with protective kit", points: 2 },
        { text: "Fast Bowling (115 - 130+ km/h)", description: "Confidently negotiate genuine pace, bouncers, and high-quality spin variations", points: 3 },
      ]
    },
    {
      id: 2,
      question: "How extensive is your batting stroke repertoire?",
      subtitle: "Shot selection & 360-degree scoring",
      options: [
        { text: "Basic Forward Defense & Swing", description: "Mostly front-foot forward defense and agricultural cross-bat swipes", points: 1 },
        { text: "Classical Ground Strokes", description: "Solid cover drives, straight lofts, on-drives, and standard backfoot punch", points: 2 },
        { text: "Dynamic Modern Repertoire", description: "Pull shots against short balls, sweep shots, ramps, and death-over power hitting", points: 3 },
      ]
    },
    {
      id: 3,
      question: "If you bowl, what is your line, length, and variation control?",
      subtitle: "Bowling discipline & execution",
      options: [
        { text: "Erratic / Learning", description: "Tend to bowl multiple wides or full tosses per over", points: 1 },
        { text: "Consistent Stock Delivery", description: "Consistently land top of off-stump with natural swing or basic spin break", points: 2 },
        { text: "Tactical Match Bowler", description: "Execute yorkers under pressure, disguised slower balls, and subtle seam/spin tricks", points: 3 },
      ]
    },
    {
      id: 4,
      question: "What is your competitive cricket experience?",
      subtitle: "Match background & league play",
      options: [
        { text: "Gully / Box Cricket", description: "Casual weekend box cricket with friends for pure recreation", points: 1 },
        { text: "Corporate / Tennis-Ball League", description: "Regular team player in weekend tournaments and corporate leagues", points: 2 },
        { text: "KSCA League / Club Trials", description: "Division league experience, formal club training, or district representative trials", points: 3 },
      ]
    },
    {
      id: 5,
      question: "What is your top academy coaching goal?",
      subtitle: "Training roadmap",
      options: [
        { text: "Stance, Head Alignment & Grip", description: "Master classical balance, bat lift, and solid defensive foundation", points: 1 },
        { text: "Power Generation & Shot Placement", description: "Clear boundaries cleanly, improve footwork against spin, and build match fitness", points: 2 },
        { text: "Match Simulation & Mental Temperament", description: "High-pressure situation management, video biomechanics, and KSCA league prep", points: 3 },
      ]
    }
  ],
  General: [
    {
      id: 1,
      question: "How familiar are you with the fundamental mechanics of this sport?",
      subtitle: "Foundational techniques and rules",
      options: [
        { text: "Beginner / Just Starting", description: "Unfamiliar with technical grips, footwork rules, or standard tournament scoring", points: 1 },
        { text: "Intermediate / Solid Basics", description: "Know the rules, execute standard movements, and play weekly recreational games", points: 2 },
        { text: "Advanced / High Proficiency", description: "Fluent biomechanics, advanced spin/pace control, and deep tactical understanding", points: 3 },
      ]
    },
    {
      id: 2,
      question: "How is your sport-specific stamina and physical endurance?",
      subtitle: "Cardiovascular and muscular stamina",
      options: [
        { text: "Fatigued within 20 mins", description: "Lose energy and form quickly during intense physical drills", points: 1 },
        { text: "Sustain 45 - 60 mins", description: "Can comfortably play a full hour with standard hydration breaks", points: 2 },
        { text: "High-Intensity 90+ mins", description: "Conditioned for grueling 3-set matches, overtime periods, and rapid recovery", points: 3 },
      ]
    },
    {
      id: 3,
      question: "How well do you anticipate opponent movements and court positioning?",
      subtitle: "Game reading and anticipation",
      options: [
        { text: "Reactive", description: "React only after the ball/shuttle is already in flight toward me", points: 1 },
        { text: "Good Court Awareness", description: "Read obvious cues and position myself in time for most standard plays", points: 2 },
        { text: "Proactive Chessmaster", description: "Anticipate shot selection, set strategic traps, and dictate game tempo", points: 3 },
      ]
    },
    {
      id: 4,
      question: "How regularly do you play or train in this sport?",
      subtitle: "Weekly volume and consistency",
      options: [
        { text: "Once a month or less", description: "Casual hobby or completely new interest", points: 1 },
        { text: "1 to 2 times every week", description: "Consistent weekly court time and steady recreational games", points: 2 },
        { text: "3+ times weekly with drills", description: "Dedicated training schedule, gym conditioning, and competitive matches", points: 3 },
      ]
    },
    {
      id: 5,
      question: "What do you want most out of coaching sessions?",
      subtitle: "Personal development goal",
      options: [
        { text: "Solid Foundation & Safety", description: "Learn injury-free mechanics, proper equipment handling, and core rules", points: 1 },
        { text: "Consistency & Tactical Depth", description: "Eliminate unforced errors, increase shot power, and outplay friends", points: 2 },
        { text: "Tournament Podium Readiness", description: "Peak athletic conditioning, psychological edge, and ranking progression", points: 3 },
      ]
    }
  ]
};

export const SkillQuizModal: React.FC<SkillQuizModalProps> = ({
  isOpen,
  onClose,
  sport = 'Badminton',
  onSelectLevel
}) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  if (!isOpen) return null;

  // Pick matching sport questions or fallback to general
  const questions = QUIZ_DATA_BY_SPORT[sport] || QUIZ_DATA_BY_SPORT['Badminton'] || QUIZ_DATA_BY_SPORT['General'];
  const totalQuestions = questions.length;
  const currentQ = questions[currentStep];

  const handleSelectOption = (points: number) => {
    const updated = [...answers];
    updated[currentStep] = points;
    setAnswers(updated);

    if (currentStep < totalQuestions - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setAnswers([]);
    setIsCompleted(false);
  };

  // Calculate total score: 5 to 15 points
  const totalScore = answers.reduce((acc, p) => acc + (p || 0), 0);

  // Exact scoring breakdown from specification:
  // 5 to 8 points: Beginner
  // 9 to 12 points: Intermediate
  // 13 to 15 points: Advanced
  let calculatedLevel: SkillLevel = 'Beginner';
  let levelColor = 'text-blue-600 bg-blue-50 border-blue-200';
  let levelBadge = 'bg-blue-600 text-white';
  let recommendationSummary = '';

  if (totalScore >= 13) {
    calculatedLevel = 'Advanced';
    levelColor = 'text-purple-700 bg-purple-50 border-purple-200';
    levelBadge = 'bg-purple-600 text-white';
    recommendationSummary = 'You possess strong technical execution, tournament awareness, and match fitness. You are ready for high-performance academy batches, ranking ladders, and advanced tactical drills.';
  } else if (totalScore >= 9) {
    calculatedLevel = 'Intermediate';
    levelColor = 'text-orange-700 bg-orange-50 border-orange-200';
    levelBadge = 'bg-orange-600 text-white';
    recommendationSummary = 'You have solid fundamentals and rally consistency. Coaching will help you eliminate unforced errors, master deceptive variations, and level up your competitive match strategy.';
  } else {
    calculatedLevel = 'Beginner';
    levelColor = 'text-blue-700 bg-blue-50 border-blue-200';
    levelBadge = 'bg-blue-600 text-white';
    recommendationSummary = 'You are beginning your journey! Personalized coaching will establish injury-free grip fundamentals, court footwork, and confidence so you can quickly enjoy sustained rallies.';
  }

  const handleApplyResult = () => {
    onSelectLevel(calculatedLevel, totalScore);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose} 
      />

      {/* Dialog Container */}
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 p-6 sm:p-8 text-slate-900 z-10 my-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors"
          aria-label="Close skill assessment quiz"
        >
          <X className="w-5 h-5" />
        </button>

        {!isCompleted ? (
          <div>
            {/* Header Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-orange-700 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-orange-600" />
              <span>2-Minute Skill Assessment · {sport}</span>
            </div>

            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Evaluate Your Play Level
            </h2>
            <p className="text-xs text-slate-500 mt-1 mb-5">
              Answer 5 quick questions to match you with the ideal coaching batch and certified mentor.
            </p>

            {/* Progress Bar & Indicators */}
            <div className="mb-6 space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-slate-600">
                <span>Question {currentStep + 1} of {totalQuestions}</span>
                <span className="text-orange-600 font-mono">{Math.round(((currentStep + 1) / totalQuestions) * 100)}% Complete</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blue-600 to-orange-500 rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${((currentStep + 1) / totalQuestions) * 100}%` }}
                />
              </div>
            </div>

            {/* Question Card */}
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                <div className="text-[11px] font-bold text-orange-600 uppercase tracking-wider mb-1">
                  {currentQ.subtitle || 'Skill Assessment'}
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                  {currentQ.question}
                </h3>
              </div>

              {/* 3 Answer Options */}
              <div className="space-y-2.5">
                {currentQ.options.map((opt, idx) => {
                  const isSelected = answers[currentStep] === opt.points;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSelectOption(opt.points)}
                      className={`w-full text-left p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 group ${
                        isSelected 
                          ? 'border-orange-500 bg-orange-50/70 text-orange-950 shadow-xs ring-1 ring-orange-400' 
                          : 'border-slate-200 bg-white hover:border-blue-400 hover:bg-blue-50/30 text-slate-800'
                      }`}
                    >
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold transition-colors ${
                        isSelected 
                          ? 'bg-orange-500 text-white' 
                          : 'bg-slate-100 text-slate-600 group-hover:bg-blue-600 group-hover:text-white'
                      }`}>
                        {String.fromCharCode(65 + idx)}
                      </div>

                      <div className="flex-1">
                        <div className="text-sm font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                          {opt.text}
                        </div>
                        <div className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                          {opt.description}
                        </div>
                      </div>

                      <div className="text-[11px] font-bold font-mono px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 group-hover:bg-blue-100 group-hover:text-blue-800 shrink-0">
                        {opt.points} {opt.points === 1 ? 'pt' : 'pts'}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step Navigation Bar */}
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
              <button
                type="button"
                disabled={currentStep === 0}
                onClick={handlePrev}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900 disabled:opacity-30 disabled:pointer-events-none transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              <div className="text-xs text-slate-400 font-medium">
                Select an option to proceed
              </div>
            </div>

          </div>
        ) : (
          /* RESULT SCREEN */
          <div className="py-2 space-y-6 text-center animate-in fade-in duration-300">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-orange-500 text-white flex items-center justify-center mx-auto shadow-lg shadow-orange-500/25">
              <Award className="w-9 h-9" />
            </div>

            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Evaluation Complete</span>
              </div>
              <h3 className="text-2xl font-extrabold text-slate-900">
                Your Assessment Result
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Based on your answers, here is your calculated skill level:
              </p>
            </div>

            {/* Calculated Level Banner */}
            <div className={`p-6 rounded-3xl border ${levelColor} text-left space-y-3 shadow-xs`}>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                    Calculated Skill Level
                  </span>
                  <div className="text-2xl font-black text-slate-900 mt-0.5">
                    {calculatedLevel}
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                    Total Score
                  </span>
                  <div className="text-2xl font-black font-mono text-orange-600 mt-0.5">
                    {totalScore} / 15
                  </div>
                </div>
              </div>

              <div className="text-xs leading-relaxed text-slate-700 pt-2 border-t border-slate-200/80">
                {recommendationSummary}
              </div>

              {/* Score Range Legend */}
              <div className="pt-2 border-t border-slate-200/80 grid grid-cols-3 gap-2 text-[10px] text-center font-bold">
                <div className={`p-1.5 rounded-lg ${calculatedLevel === 'Beginner' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                  5 - 8 pts: Beginner
                </div>
                <div className={`p-1.5 rounded-lg ${calculatedLevel === 'Intermediate' ? 'bg-orange-500 text-white' : 'bg-slate-100 text-slate-600'}`}>
                  9 - 12 pts: Intermediate
                </div>
                <div className={`p-1.5 rounded-lg ${calculatedLevel === 'Advanced' ? 'bg-purple-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                  13 - 15 pts: Advanced
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-2">
              <button
                type="button"
                onClick={handleApplyResult}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold text-sm shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Zap className="w-4 h-4 text-orange-400" />
                <span>Auto-Select &ldquo;{calculatedLevel}&rdquo; in Form</span>
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="w-full py-2.5 rounded-xl text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors flex items-center justify-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retake Quiz</span>
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
