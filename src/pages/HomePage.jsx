import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { pageBg, textMuted } from "../styles/theme";
const heroImage = "https://media.istockphoto.com/id/1138171094/photo/professional-headhunter-reviewing-resume-at-the-desk-and-making-decision-before-hiring.jpg?s=170667a&w=0&k=20&c=vjhr6t4zcBwrDvpkQnOYhSisP3MDAgpZSfLdlpJIHaE="; // ← add your image here

function HomePage() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <div className={pageBg}>
      <div className="max-w-6xl mx-auto px-6 py-16 sm:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          {/* left — text */}
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 leading-tight mb-4">
              We analyze your{" "}
              <span className="text-blue-600">Resume</span>{" "}
              with AI
            </h1>
            <p className={`text-base ${textMuted} mb-8 max-w-md leading-relaxed`}>
              Upload your resume and get instant ATS scores, keyword
              analysis and actionable feedback to land more interviews.
            </p>
            <div className="flex items-center gap-3">
              {isAuthenticated ? (
                <Link
                  to="/dashboard"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-lg transition-colors text-sm"
                >
                  Go to Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    to="/register"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-lg transition-colors text-sm"
                  >
                    Get Started
                  </Link>
                  <Link
                    to="/login"
                    className="border border-slate-300 hover:border-blue-600 text-slate-700 hover:text-blue-600 font-semibold px-6 py-2.5 rounded-lg transition-colors text-sm"
                  >
                    Sign in
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* right — image */}
          <div className="flex items-center justify-center">
            <img
              src={heroImage}
              alt="Resume analysis"
              className="w-full max-w-md object-contain"
            />
          </div>

        </div>
      </div>
    </div>
  );
}

export default HomePage;