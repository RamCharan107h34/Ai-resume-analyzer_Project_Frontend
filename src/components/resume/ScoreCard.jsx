import { cardClass, textPrimary, textMuted } from "../../styles/theme";

const ScoreRing = ({ score, label }) => {
  const size        = 72;
  const radius      = 28;
  const circumference = 2 * Math.PI * radius;
  const offset      = circumference - (score / 100) * circumference;

  const color = score >= 80 ? "#16a34a" : score >= 60 ? "#f59e0b" : "#ef4444";

  return (
    <div className="flex flex-col items-center gap-1">
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={36} cy={36} r={radius} fill="none" stroke="#e2e8f0" strokeWidth={6} />
        <circle
          cx={36} cy={36} r={radius}
          fill="none"
          stroke={color}
          strokeWidth={6}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 1s ease-in-out" }}
        />
      </svg>
      <div className="text-center">
        <p className="text-lg font-bold" style={{ color }}>{score}</p>
        <p className={`text-xs ${textMuted}`}>{label}</p>
      </div>
    </div>
  );
};

function ScoreCard({ result }) {
  if (!result) return null;

  return (
    <div className={cardClass}>
      <p className={`text-sm font-semibold ${textPrimary} mb-4`}>Score Overview</p>
      <div className="flex justify-around">
        <ScoreRing score={result.overallScore} label="Overall"  />
        <ScoreRing score={result.atsScore}     label="ATS"      />
        <ScoreRing score={result.matchScore}   label="Job Match" />
      </div>
    </div>
  );
}

export default ScoreCard;