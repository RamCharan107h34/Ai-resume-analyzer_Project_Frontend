import { cardClass, textPrimary, textMuted, badgeGreen, badgeRed, badgeBlue } from "../../styles/theme";
import { CheckCircle, XCircle, Lightbulb, Tag } from "lucide-react";

function AnalysisCard({ result }) {
  if (!result?.feedback) return null;

  const { strengths, weaknesses, suggestions, matchedKeywords, missingKeywords } = result.feedback;

  return (
    <div className="space-y-4">

      {/* ── Strengths ──────────────────────────────────── */}
      <div className={cardClass}>
        <h3 className={`flex items-center gap-2 text-base font-semibold ${textPrimary} mb-3`}>
          <CheckCircle className="w-4 h-4 text-green-600" /> Strengths
        </h3>
        <ul className="space-y-2">
          {strengths.map((s, i) => (
            <li key={i} className={`flex items-start gap-2 text-sm ${textMuted}`}>
              <span className="text-green-600 mt-0.5">✓</span> {s}
            </li>
          ))}
        </ul>
      </div>

      {/* ── Weaknesses ─────────────────────────────────── */}
      <div className={cardClass}>
        <h3 className={`flex items-center gap-2 text-base font-semibold ${textPrimary} mb-3`}>
          <XCircle className="w-4 h-4 text-red-500" /> Weaknesses
        </h3>
        <ul className="space-y-2">
          {weaknesses.map((w, i) => (
            <li key={i} className={`flex items-start gap-2 text-sm ${textMuted}`}>
              <span className="text-red-500 mt-0.5">✗</span> {w}
            </li>
          ))}
        </ul>
      </div>

      {/* ── Suggestions ────────────────────────────────── */}
      <div className={cardClass}>
        <h3 className={`flex items-center gap-2 text-base font-semibold ${textPrimary} mb-3`}>
          <Lightbulb className="w-4 h-4 text-amber-500" /> Suggestions
        </h3>
        <ol className="space-y-2">
          {suggestions.map((s, i) => (
            <li key={i} className={`flex items-start gap-2 text-sm ${textMuted}`}>
              <span className="text-blue-600 font-mono text-xs mt-0.5 shrink-0">
                {String(i + 1).padStart(2, "0")}
              </span>
              {s}
            </li>
          ))}
        </ol>
      </div>

      {/* ── Keywords ───────────────────────────────────── */}
      {(matchedKeywords?.length > 0 || missingKeywords?.length > 0) && (
        <div className={cardClass}>
          <h3 className={`flex items-center gap-2 text-base font-semibold ${textPrimary} mb-4`}>
            <Tag className="w-4 h-4 text-blue-600" /> Keywords
          </h3>

          {matchedKeywords?.length > 0 && (
            <div className="mb-3">
              <p className={`text-xs font-medium ${textMuted} mb-2`}>Matched</p>
              <div className="flex flex-wrap gap-2">
                {matchedKeywords.map((k, i) => (
                  <span key={i} className={badgeGreen}>{k}</span>
                ))}
              </div>
            </div>
          )}

          {missingKeywords?.length > 0 && (
            <div>
              <p className={`text-xs font-medium ${textMuted} mb-2`}>Missing</p>
              <div className="flex flex-wrap gap-2">
                {missingKeywords.map((k, i) => (
                  <span key={i} className={badgeRed}>{k}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

    </div>
  );
}

export default AnalysisCard;