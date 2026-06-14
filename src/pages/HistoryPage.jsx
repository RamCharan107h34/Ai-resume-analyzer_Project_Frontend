import { useState, useEffect } from "react";
import { getHistoryAPI, deleteResumeAPI } from "../services/api";
import HistoryCard      from "../components/resume/HistoryCard";
import AnalysisCard     from "../components/resume/AnalysisCard";
import ResumeRadarChart from "../components/resume/RadarChart";
import toast from "react-hot-toast";
import { History, X, BarChart2, ClipboardList } from "lucide-react";
import {
  textPrimary,
  textMuted,
  cardClass,
  btnSecondary,
  badgeGreen,
  badgeAmber,
  badgeRed,
} from "../styles/theme";

// inline score row instead of big rings
const ScoreRow = ({ result }) => {
  const getColor = (s) => s >= 80 ? "text-green-600" : s >= 60 ? "text-amber-500" : "text-red-500";

  return (
    <div className="flex items-center gap-4 py-3 border-b border-slate-100">
      {[
        { label: "Overall",  value: result.overallScore },
        { label: "ATS",      value: result.atsScore     },
        { label: "Match",    value: result.matchScore   },
      ].map(({ label, value }) => (
        <div key={label} className="flex items-center gap-1.5">
          <span className={`text-lg font-bold ${getColor(value)}`}>{value}</span>
          <span className={`text-xs ${textMuted}`}>{label}</span>
        </div>
      ))}
    </div>
  );
};

function HistoryPage() {
  const [resumes,  setResumes]  = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [selected, setSelected] = useState(null);
  const [tab,      setTab]      = useState("analysis"); // "analysis" | "radar"

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await getHistoryAPI();
        setResumes(res.data.data);
      } catch {
        toast.error("Failed to load history");
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteResumeAPI(id);
      setResumes((prev) => prev.filter((r) => r._id !== id));
      if (selected?._id === id) setSelected(null);
      toast.success("Resume deleted");
    } catch {
      toast.error("Failed to delete resume");
    }
  };

  const handleView = (resume) => {
    setSelected((prev) => prev?._id === resume._id ? null : resume);
    setTab("analysis");
  };

  const handleRescore = (updated) => {
    setResumes((prev) =>
      prev.map((r) => r._id === updated.resumeId ? { ...r, ...updated } : r)
    );
    if (selected?._id === updated.resumeId) {
      setSelected((prev) => ({ ...prev, ...updated }));
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className={`text-sm ${textMuted}`}>Loading history...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-4">

      {/* ── Page title ──────────────────────────────────── */}
      <div>
        <h1 className={`text-2xl font-bold ${textPrimary}`}>History</h1>
        <p className={`text-sm ${textMuted} mt-1`}>
          All your previously analyzed resumes
        </p>
      </div>

      {/* ── Empty state ─────────────────────────────────── */}
      {resumes.length === 0 ? (
        <div className={`${cardClass} flex flex-col items-center justify-center py-12 text-center`}>
          <History className="w-10 h-10 text-slate-200 mb-3" />
          <p className={`text-sm font-medium ${textPrimary} mb-1`}>No resumes yet</p>
          <p className={`text-xs ${textMuted}`}>
            Upload a resume from the dashboard to get started
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

          {/* ── Resume list ─────────────────────────────── */}
          <div className="space-y-3">
            <p className={`text-xs ${textMuted}`}>
              {resumes.length} resume{resumes.length !== 1 ? "s" : ""} analyzed
            </p>
            {resumes.map((resume) => (
              <HistoryCard
                key={resume._id}
                resume={resume}
                onDelete={handleDelete}
                onView={handleView}
                onRescore={handleRescore}
              />
            ))}
          </div>

          {/* ── Analysis panel ──────────────────────────── */}
          <div className="sticky top-20 self-start">
            {selected ? (
              <div className={cardClass}>

                {/* header */}
                <div className="flex items-center justify-between mb-2">
                  <p className={`text-sm font-medium ${textPrimary} truncate`}>
                    {selected.fileName}
                  </p>
                  <button
                    onClick={() => setSelected(null)}
                    className={`${btnSecondary} text-xs flex items-center gap-1 py-1 px-2`}
                  >
                    <X className="w-3 h-3" /> Close
                  </button>
                </div>

                {/* inline scores */}
                <ScoreRow result={selected} />

                {/* tabs */}
                <div className="flex gap-1 mt-3 mb-3 border-b border-slate-100">
                  <button
                    onClick={() => setTab("analysis")}
                    className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium border-b-2 -mb-px transition-colors
                      ${tab === "analysis"
                        ? "border-blue-600 text-blue-600"
                        : "border-transparent text-slate-500 hover:text-slate-700"
                      }`}
                  >
                    <ClipboardList className="w-3.5 h-3.5" /> Analysis
                  </button>
                  <button
                    onClick={() => setTab("radar")}
                    className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium border-b-2 -mb-px transition-colors
                      ${tab === "radar"
                        ? "border-blue-600 text-blue-600"
                        : "border-transparent text-slate-500 hover:text-slate-700"
                      }`}
                  >
                    <BarChart2 className="w-3.5 h-3.5" /> Radar
                  </button>
                </div>

                {/* tab content */}
                {tab === "analysis"
                  ? <AnalysisCard     result={selected} />
                  : <ResumeRadarChart result={selected} />
                }

              </div>
            ) : (
              <div className="border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center p-8 text-center h-48">
                <BarChart2 className="w-7 h-7 text-slate-200 mb-2" />
                <p className={`text-xs font-medium ${textMuted}`}>
                  Select a resume to view analysis
                </p>
              </div>
            )}
          </div>

        </div>
      )}

    </div>
  );
}

export default HistoryPage;