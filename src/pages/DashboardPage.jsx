import { useState } from "react";
import ResumeUpload from "../components/resume/ResumeUpload";
import ScoreCard from "../components/resume/ScoreCard";
import ResumeRadarChart from "../components/resume/RadarChart";
import AnalysisCard from "../components/resume/AnalysisCard";
import { textPrimary, textMuted } from "../styles/theme";

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

      {/* Upload Section */}
      <ResumeUpload onUploadSuccess={handleUploadSuccess} />

      {/* Score Overview */}
      {result && <ScoreCard result={result} />}

      {/* Analysis + Radar */}
      {result && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <AnalysisCard result={result} />
          <ResumeRadarChart result={result} />
        </div>
      )}
    </div>
  );
}

export default DashboardPage;