import { FileText, Trash2, Calendar, Award } from "lucide-react";
import {
  cardHoverClass,
  textPrimary,
  textSecondary,
  textMuted,
  badgeGreen,
  badgeAmber,
  badgeRed,
  badgeBlue,
} from "../../styles/theme";
import RescoreModal from "./RescoreModal";


const getScoreBadge = (score) => {
  if (score >= 80) return badgeGreen;
  if (score >= 60) return badgeAmber;
  return badgeRed;
};


const getScoreLabel = (score) => {
  if (score >= 80) return "Excellent";
  if (score >= 60) return "Good";
  return "Needs Work";
};

const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-IN", {
    day:   "numeric",
    month: "short",
    year:  "numeric",
  });
};

function HistoryCard({ resume, onDelete, onView, onRescore }) {
  return (
    <div className={cardHoverClass}>
      <div className="flex items-start justify-between gap-4">

        {/* ── File info ───────────────────────────────────── */}
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <div className="p-2 bg-blue-50 rounded-lg shrink-0">
            <FileText className="w-5 h-5 text-blue-600" />
          </div>
          <div className="min-w-0">
            <p className={`text-sm font-medium ${textPrimary} truncate`}>
              {resume.fileName}
            </p>
            <div className={`flex items-center gap-1.5 text-xs ${textMuted} mt-0.5`}>
              <Calendar className="w-3 h-3" />
              {formatDate(resume.createdAt)}
            </div>
          </div>
        </div>

        {/* ── Scores ──────────────────────────────────────── */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="text-center">
            <p className={`text-lg font-bold ${textPrimary}`}>{resume.overallScore}</p>
            <p className={`text-xs ${textMuted}`}>Overall</p>
          </div>
          <div className="text-center hidden sm:block">
            <p className={`text-lg font-bold ${textPrimary}`}>{resume.atsScore}</p>
            <p className={`text-xs ${textMuted}`}>ATS</p>
          </div>
          <div className="text-center hidden sm:block">
            <p className={`text-lg font-bold ${textPrimary}`}>{resume.matchScore}</p>
            <p className={`text-xs ${textMuted}`}>Match</p>
          </div>
        </div>

        {/* ── Status badge ────────────────────────────────── */}
        <span className={`${getScoreBadge(resume.overallScore)} shrink-0 hidden md:inline-flex`}>
          {getScoreLabel(resume.overallScore)}
        </span>

      </div>

      {/* ── Actions ─────────────────────────────────────────── */}
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100">

        {/* file type badge */}
        <span className={badgeBlue}>{resume.fileType?.toUpperCase()}</span>

        <div className="flex items-center gap-2">

          {/* view analysis */}
          <button
            onClick={() => onView(resume)}
            className="flex items-center gap-1.5 text-xs text-slate-600 hover:text-blue-600 font-medium px-3 py-1.5 rounded-lg hover:bg-slate-50 transition-colors"
          >
            <Award className="w-3.5 h-3.5" />
            View Analysis
          </button>

          {/* re-score */}
          <RescoreModal
            resume={resume}
            onRescore={(updated) => onRescore(updated)}
          />

          {/* delete */}
          <button
            onClick={() => onDelete(resume._id)}
            className="flex items-center gap-1.5 text-xs text-red-500 hover:text-red-600 font-medium px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Delete
          </button>
        </div>

      </div>
    </div>
  );
}

export default HistoryCard;