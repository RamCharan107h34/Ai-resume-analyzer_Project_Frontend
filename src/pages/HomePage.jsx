import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { FileText, BarChart2, Brain } from "lucide-react";
import {
  btnPrimary,
  btnSecondary,
  textPrimary,
  textMuted,
  pageBg,
} from "../styles/theme";

function HomePage() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <div className={`${pageBg} min-h-screen`}>
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">

        {/* ── Hero ────────────────────────────────────────── */}
        <h1 className={`text-4xl sm:text-5xl font-bold ${textPrimary} mb-4`}>
          Score your resume with <span className="text-blue-600">AI</span>
        </h1>

        <p className={`text-lg ${textMuted} mb-10 max-w-xl mx-auto`}>
          Upload your resume and get instant ATS scores, keyword
          analysis and feedback in seconds.
        </p>

        {/* ── CTA ─────────────────────────────────────────── */}
        <div className="flex items-center justify-center gap-3 mb-20">
          {isAuthenticated ? (
            <Link to="/dashboard" className={btnPrimary}>
              Go to Dashboard
            </Link>
          ) : (
            <>
              <Link to="/register" className={btnPrimary}>
                Get started free
              </Link>
              <Link to="/login" className={btnSecondary}>
                Sign in
              </Link>
            </>
          )}
        </div>

        {/* ── Features ────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">

          <div className="bg-white border border-slate-200 rounded-xl p-6">
            <FileText className="w-8 h-8 text-blue-600 mb-3" />
            <h3 className={`font-semibold ${textPrimary} mb-1`}>
              Upload PDF or DOCX
            </h3>
            <p className={`text-sm ${textMuted}`}>
              Supports both PDF and DOCX resume formats up to 5MB.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-6">
            <Brain className="w-8 h-8 text-blue-600 mb-3" />
            <h3 className={`font-semibold ${textPrimary} mb-1`}>
              AI Analysis
            </h3>
            <p className={`text-sm ${textMuted}`}>
              Powered by Cohere AI to give you accurate resume feedback.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-6">
            <BarChart2 className="w-8 h-8 text-blue-600 mb-3" />
            <h3 className={`font-semibold ${textPrimary} mb-1`}>
              Instant Scores
            </h3>
            <p className={`text-sm ${textMuted}`}>
              Get overall, ATS and job match scores with detailed feedback.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}

export default HomePage;