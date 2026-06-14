import { cardClass, textPrimary, textMuted } from "../../styles/theme";

const ScoreRing = ({ score, label }) => {
  const size         = 100;
  const radius       = 40;
  const circumference = 2 * Math.PI * radius;
  const offset       = circumference - (score / 100) * circumference;

  const color = score >= 80
    ? "#16a34a"
    : score >= 60
    ? "#f59e0b"
    : "#ef4444";

  return (
    <div className="flex flex-col items-center gap-2">
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={50} cy={50} r={radius} fill="none" stroke="#e2e8f0" strokeWidth={8} />
        <circle
          cx={50} cy={50} r={radius}
          fill="none"
          stroke={color}
          strokeWidth={8}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 1s ease-in-out" }}
        />
      </svg>
      <div className="text-center -mt-1">
        <p className="text-2xl font-bold" style={{ color }}>{score}</p>
        <p className={`text-xs ${textMuted}`}>{label}</p>
      </div>
    </div>
  );
};

function ScoreCard({ result }) {
  if (!result) return null;

  return (
    <div className={cardClass}>
      <h2 className={`text-lg font-semibold ${textPrimary} mb-6`}>
        Score Overview
      </h2>
      <div className="flex justify-around flex-wrap gap-6">
        <ScoreRing score={result.overallScore} label="Overall"  />
        <ScoreRing score={result.atsScore}     label="ATS"      />
        <ScoreRing score={result.matchScore}   label="Job Match" />
      </div>
    </div>
  );
}

export default ScoreCard;