import { Link } from "react-router-dom";
import { FileText } from "lucide-react";
import { textMuted } from "../styles/theme";

function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 py-6">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">

          {/* ── Logo ────────────────────────────────────── */}
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-blue-600 p-1.5 rounded-lg">
              <FileText className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-slate-900">
              Resume<span className="text-blue-600">AI</span>
            </span>
          </Link>

          {/* ── Copy ────────────────────────────────────── */}
          <p className={`text-sm ${textMuted}`}>
            © {new Date().getFullYear()} ResumeAI. All rights reserved.
          </p>

        </div>
      </div>
    </footer>
  );
}

export default Footer;