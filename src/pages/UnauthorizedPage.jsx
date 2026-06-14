import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { ShieldOff } from "lucide-react";
import { btnPrimary, btnSecondary, textPrimary, textMuted, pageBg } from "../styles/theme";

function UnauthorizedPage() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const navigate        = useNavigate();

  return (
    <div className={`min-h-screen ${pageBg} flex items-center justify-center px-4`}>
      <div className="text-center max-w-md">

        {/* ── Icon ────────────────────────────────────────── */}
        <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <ShieldOff className="w-12 h-12 text-red-500" />
        </div>

        {/* ── Text ────────────────────────────────────────── */}
        <h1 className={`text-6xl font-bold text-red-500 mb-4`}>403</h1>
        <h2 className={`text-xl font-semibold ${textPrimary} mb-2`}>
          Access denied
        </h2>
        <p className={`text-sm ${textMuted} mb-8`}>
          You don't have permission to view this page.
        </p>

        {/* ── Actions ─────────────────────────────────────── */}
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className={btnSecondary}
          >
            Go Back
          </button>
          <Link
            to={isAuthenticated ? "/dashboard" : "/login"}
            className={btnPrimary}
          >
            {isAuthenticated ? "Dashboard" : "Login"}
          </Link>
        </div>

      </div>
    </div>
  );
}

export default UnauthorizedPage;