import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { FileSearch } from "lucide-react";
import { btnPrimary, btnSecondary, textPrimary, textMuted, pageBg } from "../styles/theme";

function NotFoundPage() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <div className={`min-h-screen ${pageBg} flex items-center justify-center px-4`}>
      <div className="text-center max-w-md">

        {/* ── Icon ────────────────────────────────────────── */}
        <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <FileSearch className="w-12 h-12 text-blue-600" />
        </div>

        {/* ── Text ────────────────────────────────────────── */}
        <h1 className={`text-6xl font-bold text-blue-600 mb-4`}>404</h1>
        <h2 className={`text-xl font-semibold ${textPrimary} mb-2`}>
          Page not found
        </h2>
        <p className={`text-sm ${textMuted} mb-8`}>
          The page you're looking for doesn't exist or has been moved.
        </p>

        {/* ── Actions ─────────────────────────────────────── */}
        <div className="flex items-center justify-center gap-3">
          <Link
            to={isAuthenticated ? "/dashboard" : "/"}
            className={btnPrimary}
          >
            {isAuthenticated ? "Go to Dashboard" : "Go Home"}
          </Link>
          <Link to="/" className={btnSecondary}>
            Home
          </Link>
        </div>

      </div>
    </div>
  );
}

export default NotFoundPage;