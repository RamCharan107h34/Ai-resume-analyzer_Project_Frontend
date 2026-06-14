import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { FileText, Brain, BarChart2 } from "lucide-react";
import { pageBg, cardClass, textPrimary, textMuted } from "../styles/theme";

function HomePage() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <div>

      {/* ── Hero ──────────────────────────────────────────── */}
      <div className="bg-blue-600 text-white">
        <div className="max-w-2xl mx-auto px-4 py-14 text-center">

          <h1 className="text-3xl sm:text-4xl font-bold mb-3 leading-tight">
            Get your resume scored by AI
          </h1>

          <p className="text-blue-100 text-base mb-7 max-w-lg mx-auto">
            Upload your resume and get instant feedback on your ATS score,
            keyword gaps and what to improve.
          </p>

          {isAuthenticated ? (
            <Link
              to="/dashboard"
              className="inline-block bg-white text-blue-600 font-semibold px-6 py-2.5 rounded-lg hover:bg-blue-50 transition-colors text-sm"
            >
              Go to Dashboard
            </Link>
          ) : (
            <div className="flex items-center justify-center gap-3">
              <Link
                to="/register"
                className="inline-block bg-white text-blue-600 font-semibold px-6 py-2.5 rounded-lg hover:bg-blue-50 transition-colors text-sm"
              >
                Get started free
              </Link>
              <Link
                to="/login"
                className="inline-block border border-white text-white font-semibold px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-colors text-sm"
              >
                Sign in
              </Link>
            </div>
          )}

        </div>
      </div>

      {/* ── Feature cards ─────────────────────────────────── */}
      <div className={pageBg}>
        <div className="max-w-xl mx-auto px-4 py-10 space-y-3">

          <div className={`${cardClass} flex items-start gap-4 p-4`}>
            <div className="bg-blue-50 p-2.5 rounded-lg shrink-0">
              <FileText className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className={`text-sm font-semibold ${textPrimary} mb-0.5`}>
                PDF and DOCX
              </h3>
              <p className={`text-xs ${textMuted}`}>
                Upload your resume in any format. We handle the text extraction automatically.
              </p>
            </div>
          </div>

          <div className={`${cardClass} flex items-start gap-4 p-4`}>
            <div className="bg-blue-50 p-2.5 rounded-lg shrink-0">
              <Brain className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className={`text-sm font-semibold ${textPrimary} mb-0.5`}>
                AI Feedback
              </h3>
              <p className={`text-xs ${textMuted}`}>
                Powered by Cohere. Get strengths, weaknesses and suggestions in seconds.
              </p>
            </div>
          </div>

          <div className={`${cardClass} flex items-start gap-4 p-4`}>
            <div className="bg-blue-50 p-2.5 rounded-lg shrink-0">
              <BarChart2 className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className={`text-sm font-semibold ${textPrimary} mb-0.5`}>
                Score breakdown
              </h3>
              <p className={`text-xs ${textMuted}`}>
                See your overall score, ATS score and how each section of your resume performs.
              </p>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}

export default HomePage;