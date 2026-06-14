import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { cardClass, textPrimary, textMuted } from "../../styles/theme";

function ResumeRadarChart({ result }) {
  if (!result?.feedback?.sectionScores) return null;

  const { sectionScores } = result.feedback;

  const data = [
    { section: "Contact",    score: sectionScores.contactInfo },
    { section: "Summary",    score: sectionScores.summary     },
    { section: "Experience", score: sectionScores.experience  },
    { section: "Education",  score: sectionScores.education   },
    { section: "Skills",     score: sectionScores.skills      },
  ];

  return (
    <div className={cardClass}>
      <h2 className={`text-lg font-semibold ${textPrimary} mb-2`}>
        Section Breakdown
      </h2>
      <p className={`text-sm ${textMuted} mb-4`}>
        Score breakdown across resume sections
      </p>
      <ResponsiveContainer width="100%" height={260}>
        <RadarChart data={data}>
          <PolarGrid stroke="#e2e8f0" />
          <PolarAngleAxis
            dataKey="section"
            tick={{ fontSize: 12, fill: "#64748b" }}
          />
          <Tooltip
            contentStyle={{
              background: "#fff",
              border: "1px solid #e2e8f0",
              borderRadius: "8px",
              fontSize: "12px",
            }}
          />
          <Radar
            name="Score"
            dataKey="score"
            stroke="#2563eb"
            fill="#2563eb"
            fillOpacity={0.15}
            strokeWidth={2}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ResumeRadarChart;