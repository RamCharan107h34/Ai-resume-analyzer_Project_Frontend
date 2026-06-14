import { useState, useEffect } from "react";
import { getHistoryAPI, deleteResumeAPI } from "../services/api";
import HistoryCard  from "../components/resume/HistoryCard";
import ScoreCard    from "../components/resume/ScoreCard";
import AnalysisCard from "../components/resume/AnalysisCard";
import ResumeRadarChart from "../components/resume/RadarChart";
import { Award } from "lucide-react";
import toast from "react-hot-toast";
import { History, X } from "lucide-react";
import {
  textPrimary,
  textMuted,
  cardClass,
  btnSecondary,
} from "../styles/theme";

function HistoryPage() {
  const [resumes,  setResumes]  = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [selected, setSelected] = useState(null); // for analysis panel

  // ── Fetch history on mount ─────────────────────────────────
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await getHistoryAPI();
        setResumes(res.data.data);
      } catch (err) {
        toast.error("Failed to load history");
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  // ── Delete resume ──────────────────────────────────────────
  const handleDelete = async (id) => {
    try {
      await deleteResumeAPI(id);
      setResumes((prev) => prev.filter((r) => r._id !== id));
      if (selected?._id === id) setSelected(null);
      toast.success("Resume deleted");
    } catch (err) {
      toast.error("Failed to delete resume");
    }
  };

  // ── View analysis ──────────────────────────────────────────
  const handleView = (resume) => {
    setSelected((prev) => prev?._id === resume._id ? null : resume);
  };

  const handleRescore = (updated) => {
    // replace the old resume in the list with updated scores
    setResumes((prev) => prev.map((r) => r._id === updated.resumeId ? { ...r, ...updated } : r));
    // if this resume is currently selected in the analysis panel, update it too
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
    <div className="max-w-6xl mx-auto space-y-6">

      {/* ── Page title ────────────────────────────────────── */}
      <div>
        <h1 className={`text-2xl font-bold ${textPrimary}`}>History</h1>
        <p className={`text-sm ${textMuted} mt-1`}>
          All your previously analyzed resumes
        </p>
      </div>

      {/* ── Empty state ───────────────────────────────────── */}
      {resumes.length === 0 ? (
        <div className={`${cardClass} flex flex-col items-center justify-center py-16 text-center`}>
          <History className="w-12 h-12 text-slate-200 mb-4" />
          <p className={`text-base font-medium ${textPrimary} mb-1`}>
            No resumes yet
          </p>
          <p className={`text-sm ${textMuted}`}>
            Upload a resume from the dashboard to get started
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* ── Resume list ─────────────────────────────── */}
          <div className="space-y-4">
            <p className={`text-sm ${textMuted}`}>
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
          <div>
            {selected ? (
              <div className="space-y-4 sticky top-24">

                {/* header */}
                <div className="flex items-center justify-between">
                  <p className={`text-sm font-medium ${textPrimary} truncate`}>
                    {selected.fileName}
                  </p>
                  <button
                    onClick={() => setSelected(null)}
                    className={`${btnSecondary} text-xs flex items-center gap-1.5`}
                  >
                    <X className="w-3.5 h-3.5" /> Close
                  </button>
                </div>

                <ScoreCard        result={selected} />
                <ResumeRadarChart result={selected} />
                <AnalysisCard     result={selected} />

              </div>
            ) : (
              <div className="border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center p-10 text-center h-64 sticky top-24">
                <Award className="w-8 h-8 text-slate-200 mb-3" />
                <p className={`text-sm font-medium ${textMuted}`}>
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