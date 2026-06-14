import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { FileText, Brain, BarChart2 } from "lucide-react";
import {
  pageBg,
  cardClass,
  textPrimary,
  textMuted,
} from "../styles/theme";

function HomePage() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <div>

      {/* ── Hero ──────────────────────────────────────────── */}
      <div className="bg-blue-600 text-white">
        <div className="max-w-3xl mx-auto px-4 py-24 text-center">

          <h1 className="text-4xl sm:text-5xl font-bold mb-4 leading-tight">
            Get your resume scored by AI
          </h1>

          <p className="text-blue-100 text-lg mb-10 max-w-xl mx-auto">
            Upload your resume and get instant feedback on your ATS score,
            keyword gaps and what to improve.
          </p>

          {isAuthenticated ? (
            <Link
              to="/dashboard"
              className="inline-block bg-white text-blue-600 font-semibold px-8 py-3 rounded-xl hover:bg-blue-50 transition-colors"
            >
              Go to Dashboard
            </Link>
          ) : (
            <div className="flex items-center justify-center gap-3">
              <Link
                to="/register"
                className="inline-block bg-white text-blue-600 font-semibold px-8 py-3 rounded-xl hover:bg-blue-50 transition-colors"
              >
                Get started free
              </Link>
              <Link
                to="/login"
                className="inline-block border border-white text-white font-semibold px-8 py-3 rounded-xl hover:bg-blue-700 transition-colors"
              >
                Sign in
              </Link>
            </div>
          )}

        </div>
      </div>

      {/* ── Feature cards ─────────────────────────────────── */}
      <div className={pageBg}>
        <div className="max-w-2xl mx-auto px-4 py-20 space-y-4">

          <div className={`${cardClass} flex items-start gap-5`}>
            <div className="bg-blue-50 p-3 rounded-lg shrink-0">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className={`font-semibold ${textPrimary} mb-1`}>
                PDF and DOCX
              </h3>
              <p className={`text-sm ${textMuted}`}>
                Upload your resume in any format. We handle the text extraction automatically.
              </p>
            </div>
          </div>

          <div className={`${cardClass} flex items-start gap-5`}>
            <div className="bg-blue-50 p-3 rounded-lg shrink-0">
              <Brain className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className={`font-semibold ${textPrimary} mb-1`}>
                AI Feedback
              </h3>
              <p className={`text-sm ${textMuted}`}>
                Powered by Cohere. Get strengths, weaknesses and suggestions in seconds.
              </p>
            </div>
          </div>

          <div className={`${cardClass} flex items-start gap-5`}>
            <div className="bg-blue-50 p-3 rounded-lg shrink-0">
              <BarChart2 className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className={`font-semibold ${textPrimary} mb-1`}>
                Score breakdown
              </h3>
              <p className={`text-sm ${textMuted}`}>
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