import { useState } from "react";
import ResumeUpload from "../components/resume/ResumeUpload";
import ScoreCard from "../components/resume/ScoreCard";
import ResumeRadarChart from "../components/resume/RadarChart";
import AnalysisCard from "../components/resume/AnalysisCard";
import { textPrimary, textMuted } from "../styles/theme";
import { FileText } from "lucide-react";

function DashboardPage() {
  const [result, setResult] = useState(null);

  const handleUploadSuccess = (data) => {
    setResult(data);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className={`text-3xl font-bold ${textPrimary}`}>
          Dashboard
        </h1>

        <p className={`mt-1 ${textMuted}`}>
          Upload your resume and get instant AI-powered feedback
        </p>
      </div>

      {/* Upload + Score */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        <ResumeUpload onUploadSuccess={handleUploadSuccess} />

        {result ? (
          <ScoreCard result={result} />
        ) : (
          <div className="border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center p-10 text-center min-h-[300px]">
            <FileText className="w-10 h-10 text-slate-300 mb-3" />

            <p className={`font-medium ${textMuted}`}>
              Score overview appears here
            </p>

            <p className="text-sm text-slate-400 mt-1">
              Upload a resume to get started
            </p>
          </div>
        )}
      </div>

      {/* Analysis + Radar */}
      {result && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          <div className="lg:col-span-2">
            <AnalysisCard result={result} />
          </div>

          <div>
            <ResumeRadarChart result={result} />
          </div>
        </div>
      )}
    </div>
  );
}

export default DashboardPage;