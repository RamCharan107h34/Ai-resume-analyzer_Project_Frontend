import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { FileText, Brain, BarChart2 } from "lucide-react";

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
      <div className="bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 py-20">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">

            <div className="bg-white border border-slate-200 rounded-xl p-6">
              <FileText className="w-7 h-7 text-blue-600 mb-4" />
              <h3 className="font-semibold text-slate-900 mb-2">
                PDF and DOCX
              </h3>
              <p className="text-sm text-slate-500">
                Upload your resume in any format. We handle the text extraction.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-6">
              <Brain className="w-7 h-7 text-blue-600 mb-4" />
              <h3 className="font-semibold text-slate-900 mb-2">
                AI Feedback
              </h3>
              <p className="text-sm text-slate-500">
                Powered by Cohere. Get strengths, weaknesses and suggestions in seconds.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-6">
              <BarChart2 className="w-7 h-7 text-blue-600 mb-4" />
              <h3 className="font-semibold text-slate-900 mb-2">
                Score breakdown
              </h3>
              <p className="text-sm text-slate-500">
                See your overall score, ATS score and how each section performs.
              </p>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}

export default HomePage;