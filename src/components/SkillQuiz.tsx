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

export interface QuizQuestion {
  id: number;
  question: string;
  subtitle?: string;
  options: {
    text: string;
    description: string;
    points: number; // 1, 2, or 3 points
  }[];
}

export interface SkillQuizProps {
  isOpen: boolean;
  onClose: () => void;
  sport?: string;
  onSelectLevel: (level: SkillLevel, score: number) => void;
}

export const QUIZ_DATA_BY_SPORT: Record<string, QuizQuestion[]> = {
  Swimming: [
    {
      id: 1,
      question: "How many continuous 25m or 50m pool laps can you swim without stopping to rest on the lane rope or wall?",
      subtitle: "Lap Endurance & Aerobic Stamina",
      options: [
        { text: "Under 1 lap (< 25m)", description: "Need to pause frequently, catch my breath, or stand at the shallow end", points: 1 },
        { text: "2 to 8 continuous laps", description: "Comfortably swim 100m to 200m at a steady pace before taking a short rest", points: 2 },
        { text: "10+ non-stop laps (500m+)", description: "Sustain continuous aerobic swim sets with steady flip turns and pace control", points: 3 },
      ]
    },
    {
      id: 2,
      question: "How would you evaluate your freestyle head positioning and bilateral breathing technique?",
      subtitle: "Breathing & Freestyle Technique",
      options: [
        { text: "Lifting head forward", description: "I lift my head completely out of the water to breathe, causing hips and legs to sink", points: 1 },
        { text: "Side breathing on dominant side", description: "Turn head sideways with one eye/goggle in the water, breathing mostly to preferred side", points: 2 },
        { text: "Bilateral rhythmic breathing & high elbow", description: "Effortless alternate 3-stroke breathing, efficient catch, and streamlined body rotation", points: 3 },
      ]
    },
    {
      id: 3,
      question: "Which swimming strokes do you comfortably perform with legal form?",
      subtitle: "Stroke Comfort (Breaststroke, Backstroke, Butterfly)",
      options: [
        { text: "Basic dog paddle / rough freestyle only", description: "Struggle with whip kicks, floating on my back, or coordinated arm pulls", points: 1 },
        { text: "Freestyle & Breaststroke", description: "Reliable breaststroke glide, comfortable backstroke floating, developing back kick", points: 2 },
        { text: "3 or 4 Competitive Strokes (IM)", description: "Fluent breaststroke, backstroke, and butterfly with strong dolphin kicks and turns", points: 3 },
      ]
    },
    {
      id: 4,
      question: "How comfortable are you treading water in deep pool areas (7 to 10+ feet)?",
      subtitle: "Treading Deep Water & Water Safety",
      options: [
        { text: "Anxious in deep water", description: "Feel panic if my feet cannot touch the bottom; stay strictly in the shallow section", points: 1 },
        { text: "Can tread for 1 to 2 minutes", description: "Can stay afloat in the deep end using breaststroke scissor kicks or arm sculling", points: 2 },
        { text: "Effortless Eggbeater kick (5+ mins)", description: "Completely relaxed, efficient water polo eggbeater kick, and confident deep diving", points: 3 },
      ]
    },
    {
      id: 5,
      question: "What is your competitive or open-water background and primary target with a coach?",
      subtitle: "Competitive & Open-Water Experience",
      options: [
        { text: "Water safety & fundamental strokes", description: "Overcome fear, master buoyancy, water confidence, and learn relaxed breathing", points: 1 },
        { text: "Fitness laps & stroke refinement", description: "Build 1,000m workout stamina, eliminate drag, and improve lap splits", points: 2 },
        { text: "Competitive / Open-Water & Triathlon", description: "Pace-clock training, interval lactate sets, open-water navigation, or gala events", points: 3 },
      ]
    }
  ],
  Badminton: [
    {
      id: 1,
      question: "How would you describe your court movement, split-steps, and base recovery?",
      subtitle: "Footwork & Split-Steps",
      options: [
        { text: "Flat-footed / Running after shuttle", description: "Direct chase without split-step, frequently caught wrong-footed or off balance", points: 1 },
        { text: "Basic split-step & chassé recovery", description: "Time the split-step on opponent hit and recover to center base in moderate rallies", points: 2 },
        { text: "Fluid multi-corner dynamic footwork", description: "Explosive split-steps, scissor kicks, deep lunges, and rapid transition recovery", points: 3 },
      ]
    },
    {
      id: 2,
      question: "How consistent and deep are your baseline-to-baseline overhead clears?",
      subtitle: "Baseline Clears & Overhead Power",
      options: [
        { text: "Falls short in mid-court", description: "Cannot reach opponent baseline; arm gets fatigued quickly from improper wrist pronation", points: 1 },
        { text: "Consistent forehand deep clears", description: "Reach opponent rear court comfortably with forehand; working on backhand power", points: 2 },
        { text: "Effortless offensive & defensive clears", description: "High defensive clears and fast flat punching attacking clears from both forehand and backhand", points: 3 },
      ]
    },
    {
      id: 3,
      question: "How effectively do you execute smashes, sliced drops, and net tumbling shots?",
      subtitle: "Smashes, Drops & Net Deception",
      options: [
        { text: "Basic flat hits or defensive lifts", description: "Smash lacks steep angle or power; drop shots frequently hit the tape", points: 1 },
        { text: "Reliable steep smash & controlled drops", description: "Good smash pace with sharp downward angle; consistent fast drop shots", points: 2 },
        { text: "Deceptive slices, jump smashes & kills", description: "Steep jump smashes, hair-pin tumbling net shots, and deceptive cross slices", points: 3 },
      ]
    },
    {
      id: 4,
      question: "How do your court coverage and stamina hold up across continuous fast-paced rallies?",
      subtitle: "Court Coverage & Match Stamina",
      options: [
        { text: "Fatigued after 3 to 4 fast rallies", description: "Struggle to cover the four corners; breathing heavily early in games", points: 1 },
        { text: "Sustain 8 to 12 shot rallies", description: "Solid stamina for standard games; maintain defensive posture and reach corners", points: 2 },
        { text: "High-octane rubber match stamina", description: "Conditioned for grueling 3-set matches with rapid physical recovery between points", points: 3 },
      ]
    },
    {
      id: 5,
      question: "How comfortable are you with doubles rotation, attacking formation, and shot placement?",
      subtitle: "Doubles Rotation & Tactical Positioning",
      options: [
        { text: "Unsure of positioning / Clash rackets", description: "Often caught in between front and back or side-by-side during fast exchanges", points: 1 },
        { text: "Standard front-back & side-side rotation", description: "Switch to side-by-side on defense and attack front-and-back when creating a lift", points: 2 },
        { text: "Tactical match strategist", description: "Anticipate third-shot replies, exploit opponent seam gaps, and dictate rally tempo", points: 3 },
      ]
    }
  ],
  Football: [
    {
      id: 1,
      question: "How dependable is your first touch when receiving driven passes or aerial balls under pressure?",
      subtitle: "First Touch Control",
      options: [
        { text: "Heavy first touch", description: "The ball often bounces 2-3 yards away or requires multiple touches to settle", points: 1 },
        { text: "Reliable directional touch", description: "Cushion ground balls cleanly and open body into space away from defenders", points: 2 },
        { text: "Velvet first-time control", description: "Effortless aerial traps, chest control, and instant one-touch distribution", points: 3 },
      ]
    },
    {
      id: 2,
      question: "What is your comfortable passing range and distribution accuracy?",
      subtitle: "Passing Range & Delivery Precision",
      options: [
        { text: "Short safe passes only (5-10 yards)", description: "Struggle with lofted long balls or passing into running teammates' stride", points: 1 },
        { text: "Solid 15-25 yard ground passes", description: "Crisp ground passing, quick one-twos, and dependable switch of play", points: 2 },
        { text: "Pinpoint 40+ yard diagonals & through-balls", description: "Driven cross-field diagonals, weighted through-balls between defensive lines", points: 3 },
      ]
    },
    {
      id: 3,
      question: "How comfortable are you controlling, passing, and shooting with your weak foot?",
      subtitle: "Weak Foot Comfort",
      options: [
        { text: "Strictly one-footed", description: "Avoid using my weak foot; constantly twist body to favor my stronger side", points: 1 },
        { text: "Basic passes with weak foot", description: "Can make short layoff passes and safe clearances with my non-dominant foot", points: 2 },
        { text: "Dual-footed confidence", description: "Comfortably shoot on target, cross, and distribute under pressure with either foot", points: 3 },
      ]
    },
    {
      id: 4,
      question: "What is your physical work rate and match stamina on full turf or pitch?",
      subtitle: "Match Stamina & Work Rate",
      options: [
        { text: "Tired after 15 to 20 minutes", description: "Struggle to sprint back defensively after attacking runs; need frequent breaks", points: 1 },
        { text: "Sustain 45 to 60 minute match tempo", description: "Consistent work rate in 5v5 / 7v7 turf games with steady recovery", points: 2 },
        { text: "High-intensity 90-minute engine", description: "Repeat sprint ability, sustained high-pressing, and peak match conditioning", points: 3 },
      ]
    },
    {
      id: 5,
      question: "How do you evaluate your tactical positioning and spatial awareness during matches?",
      subtitle: "Tactical Positioning & Spatial Awareness",
      options: [
        { text: "Ball-watching / Drift out of position", description: "Tend to follow the ball rather than holding my designated tactical zone", points: 1 },
        { text: "Maintain shape & track runners", description: "Understand defensive line discipline, covering teammates, and spreading wide", points: 2 },
        { text: "Vocal organizer & tempo conductor", description: "Coordinate pressing triggers, exploit half-spaces, and dictate team tempo", points: 3 },
      ]
    }
  ],
  Cricket: [
    {
      id: 1,
      question: "How disciplined is your batting shot selection or bowling line & length?",
      subtitle: "Batting Shot Selection & Bowling Consistency",
      options: [
        { text: "Cross-bat swings / Inconsistent radar", description: "Often swipe across the line or bowl multiple wides/full tosses per over", points: 1 },
        { text: "Straight-bat defense & steady stock ball", description: "Solid forward defense, crisp cover drive, or consistent off-stump channel bowling", points: 2 },
        { text: "360-degree shot making & tactical variations", description: "Score in all quadrants; bowl pinpoint yorkers and disguised slower deliveries", points: 3 },
      ]
    },
    {
      id: 2,
      question: "What type of ball and bowling pace do you comfortably face in match conditions?",
      subtitle: "Leather / Hardball Experience",
      options: [
        { text: "Tennis / Rubber ball only", description: "Never faced hard leather balls with full protective pads and helmet", points: 1 },
        { text: "Club leather ball (95 - 115 km/h)", description: "Comfortable facing seasoned leather ball bounce, swing, and medium pace in nets", points: 2 },
        { text: "Fast bowling & league spin (120+ km/h)", description: "Confidently handle bouncers, reverse swing, and turning red/white balls", points: 3 },
      ]
    },
    {
      id: 3,
      question: "What is your competitive cricket background and match exposure?",
      subtitle: "Match Format & Competitive Exposure",
      options: [
        { text: "Casual gully / Box cricket", description: "Recreational weekend matches with friends without formal cricket rules", points: 1 },
        { text: "Corporate & Weekend turf leagues", description: "Regular 20-over matches, corporate tournaments, and seasonal turf cups", points: 2 },
        { text: "KSCA Division League / Club cricket", description: "Official league matches, multi-day trials, or structured club academy squads", points: 3 },
      ]
    },
    {
      id: 4,
      question: "If bowling, how consistently can you execute variations and tight spells?",
      subtitle: "Bowling Pace, Spin & Variation Control",
      options: [
        { text: "Working on basic run-up & grip", description: "Struggle with landing length or no-balls during match pressure", points: 1 },
        { text: "Consistent seam / spin & tight economy", description: "Can land 4-5 balls in good length channel with natural swing or spin break", points: 2 },
        { text: "Death-over specialist & match winner", description: "Deliver yorkers on demand, knuckleballs, arm balls, and seam cutters", points: 3 },
      ]
    },
    {
      id: 5,
      question: "How dependable are your fielding, catching, and throwing arm from deep positions?",
      subtitle: "Fielding Depth & Catching Under Pressure",
      options: [
        { text: "Hesitant on high balls or hard hits", description: "Struggle to judge aerial skiers or throw accurately over long distances", points: 1 },
        { text: "Dependable ring fielder", description: "Clean pick-and-throw, secure regulation catches, and confident ground fielding", points: 2 },
        { text: "Direct-hit specialist & agile boundary rider", description: "Flat bullet throws over the stumps, diving stops, and sharp slip catches", points: 3 },
      ]
    }
  ],
  Tennis: [
    {
      id: 1,
      question: "How consistent are your baseline groundstroke rallies at match tempo?",
      subtitle: "Baseline Groundstroke Rally Consistency",
      options: [
        { text: "1 to 2 shots before error", description: "Struggle with timing; balls often fly long into fence or dump into the net", points: 1 },
        { text: "Moderate topspin rallies (5-8 shots)", description: "Can sustain consistent medium pace rallies with controlled depth and shape", points: 2 },
        { text: "Heavy penetrating rallies (10+ shots)", description: "Dictate pace with deep topspin or slice with precise directional placement", points: 3 },
      ]
    },
    {
      id: 2,
      question: "How dependable is your serve motion under match pressure?",
      subtitle: "Serve Motion & Second Serve Reliability",
      options: [
        { text: "Inconsistent push serve", description: "Frequently double fault or tap the ball gently just to start the point", points: 1 },
        { text: "Reliable flat first & spin second", description: "Solid first serve and dependable slice/kick second serve with low double faults", points: 2 },
        { text: "Weaponized first & kicking second", description: "Can hit aggressive kick, slice, and flat serves hitting specific corners on command", points: 3 },
      ]
    },
    {
      id: 3,
      question: "How comfortable are you moving forward to the net for volleys?",
      subtitle: "Net Play & Volley Comfort",
      options: [
        { text: "Avoid net completely", description: "Feel vulnerable at the net and strictly prefer staying behind baseline", points: 1 },
        { text: "Solid punch volleys & overheads", description: "Can put away floating volleys and execute basic overhead smashes", points: 2 },
        { text: "All-court attacking volleyer", description: "Comfortable with serve-and-volley, touch drop volleys, and closing points out", points: 3 },
      ]
    },
    {
      id: 4,
      question: "What is your tennis tournament or match background?",
      subtitle: "Match Experience & NTRP Rating",
      options: [
        { text: "Beginner (< 2.5 NTRP)", description: "Brand new or have taken fewer than 5-10 lessons total", points: 1 },
        { text: "Club player (3.0 - 3.5 NTRP)", description: "Play weekly matches with friends, understand tiebreaks and court strategies", points: 2 },
        { text: "Tournament competitor (4.0+ NTRP)", description: "Active in AITA tournaments, ranking ladders, or advanced academy squads", points: 3 },
      ]
    },
    {
      id: 5,
      question: "How would you describe your footwork, split-steps, and court recovery?",
      subtitle: "Footwork & Court Movement",
      options: [
        { text: "Late preparation / Off balance", description: "Reach for balls with arm rather than setting feet into athletic stance", points: 1 },
        { text: "Reliable split-step & open stance", description: "Recover to center hashmark and slide/step smoothly into wide groundstrokes", points: 2 },
        { text: "Explosive multi-directional movement", description: "Fast first-step acceleration, rapid recovery crossover steps, and supreme balance", points: 3 },
      ]
    }
  ],
  Athletics: [
    {
      id: 1,
      question: "How would you describe your running posture, foot-strike, and stride cadence?",
      subtitle: "Running Form & Stride Cadence",
      options: [
        { text: "Heavy heel-striking / Overstriding", description: "Prone to shin splints or knee stiffness; struggle with running posture", points: 1 },
        { text: "Consistent midfoot strike (165-175 spm)", description: "Comfortable upright posture, steady cadence, and smooth arm drive", points: 2 },
        { text: "Optimized biomechanics (180+ spm)", description: "High-cadence efficiency, explosive toe-off, and low ground contact time", points: 3 },
      ]
    },
    {
      id: 2,
      question: "What continuous running distance can you sustain comfortably without stopping?",
      subtitle: "Cardiovascular Endurance & Distance",
      options: [
        { text: "Under 1 to 2 km", description: "Need walking intervals; building initial aerobic cardiovascular base", points: 1 },
        { text: "5k to 10k continuous runs", description: "Can run 5k in under 30 mins or complete 10k without walking stops", points: 2 },
        { text: "Half / Full marathon runner (21k - 42k)", description: "Conditioned for long endurance runs, tempo thresholds, and weekly mileage", points: 3 },
      ]
    },
    {
      id: 3,
      question: "How would you rate your sprint acceleration and top-end speed mechanics?",
      subtitle: "Sprint Mechanics & Explosive Acceleration",
      options: [
        { text: "Casual jogger / Low sprint experience", description: "Rarely sprint at maximum effort; unfamiliar with track start stances", points: 1 },
        { text: "Solid interval speed & strides", description: "Regularly incorporate 100m - 400m intervals and fartlek speed training", points: 2 },
        { text: "Track sprinter / Explosive drive phase", description: "Trained block starts, powerful knee drive, and high maximum velocity", points: 3 },
      ]
    },
    {
      id: 4,
      question: "What is your cross-training, hip mobility, and core strength routine?",
      subtitle: "Strength, Mobility & Injury Prevention",
      options: [
        { text: "Running only, no strength drills", description: "Rarely do foam rolling, hip mobility, or runner-specific strength training", points: 1 },
        { text: "Weekly core & mobility work", description: "Include squats, lunges, calf raises, and dynamic warm-up drills", points: 2 },
        { text: "Comprehensive athletic conditioning", description: "Plyometrics, single-leg stability, periodized resistance, and recovery protocols", points: 3 },
      ]
    },
    {
      id: 5,
      question: "What is your primary athletic goal with a certified coach?",
      subtitle: "Structured Training & Event Preparation",
      options: [
        { text: "Learn proper form & complete first 5K", description: "Build stamina safely without injury and develop consistent running habits", points: 1 },
        { text: "Set 10K / 21K Personal Bests", description: "Target specific pace splits, lactate threshold pacing, and race day fueling", points: 2 },
        { text: "Podium track finish / Elite qualification", description: "High-performance periodization, speed endurance, and championship preparation", points: 3 },
      ]
    }
  ]
};

// General fallback for any other sport
export const GENERAL_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "How familiar are you with the fundamental mechanics and rules of this sport?",
    subtitle: "Foundational Mechanics & Rules",
    options: [
      { text: "Beginner / Just starting", description: "Unfamiliar with technical grips, footwork rules, or standard tournament scoring", points: 1 },
      { text: "Intermediate / Solid basics", description: "Know the rules, execute standard movements, and play weekly recreational games", points: 2 },
      { text: "Advanced / High proficiency", description: "Fluent biomechanics, advanced spin/pace control, and deep tactical understanding", points: 3 },
    ]
  },
  {
    id: 2,
    question: "How is your sport-specific stamina and physical endurance?",
    subtitle: "Endurance & Work Rate",
    options: [
      { text: "Fatigued within 20 mins", description: "Lose energy and form quickly during fast continuous drills", points: 1 },
      { text: "Sustain 45 - 60 mins", description: "Can comfortably play a full hour with standard hydration breaks", points: 2 },
      { text: "High-intensity 90+ mins", description: "Conditioned for grueling 3-set matches, overtime periods, and rapid recovery", points: 3 },
    ]
  },
  {
    id: 3,
    question: "How well do you anticipate opponent movements and positioning?",
    subtitle: "Anticipation & Court/Field Awareness",
    options: [
      { text: "Reactive", description: "React only after the ball or opponent has already made their move", points: 1 },
      { text: "Good game awareness", description: "Read obvious cues and position myself in time for most standard plays", points: 2 },
      { text: "Proactive strategist", description: "Anticipate actions, set strategic traps, and dictate game tempo", points: 3 },
    ]
  },
  {
    id: 4,
    question: "How regularly do you play or train in this sport?",
    subtitle: "Weekly Training Frequency",
    options: [
      { text: "Once a month or less", description: "Casual hobby or completely new interest", points: 1 },
      { text: "1 to 2 times every week", description: "Consistent weekly court time and steady recreational games", points: 2 },
      { text: "3+ times weekly with drills", description: "Dedicated training schedule, gym conditioning, and competitive matches", points: 3 },
    ]
  },
  {
    id: 5,
    question: "What do you want most out of coaching sessions?",
    subtitle: "Primary Development Target",
    options: [
      { text: "Solid foundation & safety", description: "Learn injury-free mechanics, proper equipment handling, and core rules", points: 1 },
      { text: "Consistency & tactical depth", description: "Eliminate unforced errors, increase shot power, and outplay competitors", points: 2 },
      { text: "Tournament podium readiness", description: "Peak athletic conditioning, psychological edge, and ranking progression", points: 3 },
    ]
  }
];

export const SkillQuiz: React.FC<SkillQuizProps> = ({
  isOpen,
  onClose,
  sport = 'Badminton',
  onSelectLevel
}) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  if (!isOpen) return null;

  // Resolve sport key case-insensitively
  const normalizedSport = Object.keys(QUIZ_DATA_BY_SPORT).find(
    (key) => key.toLowerCase() === (sport || '').trim().toLowerCase()
  ) || (sport === 'Running' ? 'Athletics' : 'Badminton');

  const questions = QUIZ_DATA_BY_SPORT[normalizedSport] || GENERAL_QUIZ_QUESTIONS;
  const totalQuestions = questions.length;
  const currentQ = questions[currentStep] || questions[0];

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

  // Requirement:
  // 5 to 8 points: Automatically select "Beginner"
  // 9 to 12 points: Automatically select "Intermediate"
  // 13 to 15 points: Automatically select "Advanced"
  let calculatedLevel: SkillLevel = 'Beginner';
  let levelColor = 'text-blue-700 bg-blue-50 border-blue-200';
  let levelBadge = 'bg-blue-600 text-white';
  let recommendationSummary = '';

  if (totalScore >= 13) {
    calculatedLevel = 'Advanced';
    levelColor = 'text-purple-700 bg-purple-50 border-purple-200';
    levelBadge = 'bg-purple-600 text-white';
    recommendationSummary = `You possess strong technical execution, tournament awareness, and match fitness in ${normalizedSport}. You are ready for high-performance academy batches, competitive sparring, and advanced tactical drills.`;
  } else if (totalScore >= 9) {
    calculatedLevel = 'Intermediate';
    levelColor = 'text-orange-700 bg-orange-50 border-orange-200';
    levelBadge = 'bg-orange-600 text-white';
    recommendationSummary = `You have solid fundamentals and rally consistency in ${normalizedSport}. Coaching will help you eliminate unforced errors, master deceptive variations, and level up your competitive match strategy.`;
  } else {
    calculatedLevel = 'Beginner';
    levelColor = 'text-blue-700 bg-blue-50 border-blue-200';
    levelBadge = 'bg-blue-600 text-white';
    recommendationSummary = `You are beginning your journey in ${normalizedSport}! Personalized coaching will establish injury-free fundamentals, correct mechanics, and confidence so you can quickly enjoy sustained gameplay.`;
  }

  const handleApplyResult = () => {
    onSelectLevel(calculatedLevel, totalScore);
    onClose();
  };

  const activeSportDisplay = normalizedSport.toUpperCase();

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
            {/* DYNAMIC HEADER AS SPECIFIED: 2-MINUTE SKILL ASSESSMENT - [SELECTED SPORT] */}
            <div className="mb-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 border border-orange-300 text-orange-900 text-xs font-black tracking-wide uppercase mb-2 shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-orange-600" />
                <span>2-MINUTE SKILL ASSESSMENT - {activeSportDisplay}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Evaluate Your {normalizedSport} Level
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Answer 5 sport-specific questions. We will calculate your rating and auto-populate your coaching matching form.
              </p>
            </div>

            {/* Progress Bar & Indicators */}
            <div className="mb-6 space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-slate-600">
                <span>Question {currentStep + 1} of {totalQuestions}</span>
                <span className="text-orange-600 font-mono">{Math.round(((currentStep + 1) / totalQuestions) * 100)}% Complete</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-orange-500 to-amber-500 rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${((currentStep + 1) / totalQuestions) * 100}%` }}
                />
              </div>
            </div>

            {/* Question Card */}
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                <div className="text-[11px] font-bold text-orange-600 uppercase tracking-wider mb-1">
                  {currentQ.subtitle || `${normalizedSport} Skill Assessment`}
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
                          ? 'border-orange-500 bg-orange-50/80 text-orange-950 shadow-xs ring-1 ring-orange-400' 
                          : 'border-slate-200 bg-white hover:border-orange-400 hover:bg-orange-50/30 text-slate-800'
                      }`}
                    >
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold transition-colors ${
                        isSelected 
                          ? 'bg-orange-500 text-white' 
                          : 'bg-slate-100 text-slate-600 group-hover:bg-orange-600 group-hover:text-white'
                      }`}>
                        {String.fromCharCode(65 + idx)}
                      </div>

                      <div className="flex-1">
                        <div className="text-sm font-bold text-slate-900 group-hover:text-orange-950 transition-colors">
                          {opt.text}
                        </div>
                        <div className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                          {opt.description}
                        </div>
                      </div>

                      <div className="text-[11px] font-bold font-mono px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 group-hover:bg-orange-100 group-hover:text-orange-900 shrink-0">
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
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              <div className="text-xs text-slate-400 font-medium">
                Select an option to advance
              </div>
            </div>

          </div>
        ) : (
          /* RESULT SCREEN */
          <div className="py-2 space-y-6 text-center animate-in fade-in duration-300">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-orange-500 to-amber-500 text-white flex items-center justify-center mx-auto shadow-lg shadow-orange-500/25">
              <Award className="w-9 h-9" />
            </div>

            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>2-Minute Assessment Complete</span>
              </div>
              <h3 className="text-2xl font-black text-slate-900">
                {activeSportDisplay} Assessment Result
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
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-black text-sm shadow-md shadow-orange-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Zap className="w-4 h-4 text-white" />
                <span>Auto-Populate &ldquo;{calculatedLevel}&rdquo; in Matching Form</span>
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="w-full py-2.5 rounded-xl text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
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

// Also export as SkillQuizModal for backwards compatibility
export const SkillQuizModal = SkillQuiz;
export default SkillQuiz;
