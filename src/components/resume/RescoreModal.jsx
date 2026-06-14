import { useState } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { rescoreResumeAPI } from "../../services/api";
import toast from "react-hot-toast";
import { RotateCcw } from "lucide-react";
import {
  inputClass,
  btnPrimary,
  btnSecondary,
  textPrimary,
  textMuted,
  textSecondary,
} from "../../utils/theme";

function RescoreModal({ resume, onRescore }) {
  const [jobDescription, setJobDescription] = useState(
    resume.jobDescription || ""
  );
  const [loading, setLoading] = useState(false);

  const handleRescore = async (close) => {
    setLoading(true);
    try {
      const res = await rescoreResumeAPI(resume._id, { jobDescription });
      toast.success("Resume re-scored successfully");
      onRescore(res.data.data); // update parent with new scores
      close();
    } catch (err) {
      toast.error(err.response?.data?.error || "Re-score failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Popup
      trigger={
        <button className="flex items-center gap-1.5 text-xs text-blue-600 hover:text-blue-700 font-medium px-3 py-1.5 rounded-lg hover:bg-blue-50 transition-colors">
          <RotateCcw className="w-3.5 h-3.5" />
          Re-score
        </button>
      }
      modal
      closeOnDocumentClick={false}
      contentStyle={{
        padding:      0,
        border:       "none",
        borderRadius: "0.75rem",
        boxShadow:    "0 8px 30px rgba(0,0,0,0.12)",
        width:        "90%",
        maxWidth:     "500px",
      }}
    >
      {(close) => (
        <div className="p-6">

          {/* ── Header ──────────────────────────────────── */}
          <div className="mb-5">
            <h2 className={`text-lg font-semibold ${textPrimary}`}>
              Re-score Resume
            </h2>
            <p className={`text-sm ${textMuted} mt-1`}>
              {resume.fileName}
            </p>
          </div>

          {/* ── Job description ──────────────────────────── */}
          <div className="mb-5">
            <label className={`block text-sm font-medium ${textSecondary} mb-1.5`}>
              Job Description
              <span className={`${textMuted} font-normal ml-1`}>
                (optional — improves match score)
              </span>
            </label>
            <textarea
              rows={5}
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste a new job description to get an updated match score..."
              className={`${inputClass} resize-none`}
            />
            {resume.jobDescription && (
              <p className={`text-xs ${textMuted} mt-1`}>
                Pre-filled with your previous job description — update or clear it.
              </p>
            )}
          </div>

          {/* ── Actions ─────────────────────────────────── */}
          <div className="flex gap-3">
            <button
              onClick={() => handleRescore(close)}
              disabled={loading}
              className={`${btnPrimary} flex-1 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              <RotateCcw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
              {loading ? "Analyzing..." : "Re-score"}
            </button>
            <button
              onClick={close}
              disabled={loading}
              className={btnSecondary}
            >
              Cancel
            </button>
          </div>

        </div>
      )}
    </Popup>
  );
}

export default RescoreModal;