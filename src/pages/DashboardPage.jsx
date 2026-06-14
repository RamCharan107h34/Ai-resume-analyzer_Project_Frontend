import { useState } from "react";
import ResumeUpload     from "../components/resume/ResumeUpload";
import ScoreCard        from "../components/resume/ScoreCard";
import ResumeRadarChart from "../components/resume/RadarChart";
import AnalysisCard     from "../components/resume/AnalysisCard";
import { textPrimary, textMuted } from "../styles/theme";
import { FileText } from "lucide-react";

function DashboardPage() {
  const [result, setResult] = useState(null);

  const handleUploadSuccess = (data) => {
    setResult(data);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">

      {/* ── Page title ──────────────────────────────────── */}
      <div>
        <h1 className={`text-2xl font-bold ${textPrimary}`}>Dashboard</h1>
        <p className={`text-sm ${textMuted} mt-1`}>
          Upload your resume and get instant AI-powered feedback
        </p>
      </div>

      {/* ── Upload + scores ─────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ResumeUpload onUploadSuccess={handleUploadSuccess} />
        {result
          ? <ScoreCard result={result} />
          : (
            <div className="border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center p-10 text-center">
              <FileText className="w-10 h-10 text-slate-200 mb-3" />
              <p className={`text-sm font-medium ${textMuted}`}>
                Score overview appears here
              </p>
              <p className="text-xs text-slate-400 mt-1">
                Upload a resume to get started
              </p>
            </div>
          )
        }
      </div>

      {/* ── Radar + Analysis ────────────────────────────── */}
      {result && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ResumeRadarChart result={result} />
          <AnalysisCard     result={result} />
        </div>
      )}

    </div>
  );
}

export default DashboardPage;