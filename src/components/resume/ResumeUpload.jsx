import { useState } from "react";
import { uploadResumeAPI } from "../../services/api";
import { useResumeStore } from "../../store/resumeStore";
import toast from "react-hot-toast";
import { Upload, FileText, X } from "lucide-react";
import {
  cardClass,
  btnPrimary,
  btnSecondary,
  inputClass,
  textPrimary,
  textSecondary,
  textMuted,
} from "../../styles/theme";

function ResumeUpload({ onUploadSuccess }) {
  const [file,           setFile]           = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [uploading,      setUploading]      = useState(false);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;
    setFile(selected);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const dropped = e.dataTransfer.files[0];
    if (!dropped) return;
    const allowed = ["application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
    if (!allowed.includes(dropped.type)) {
      toast.error("Only PDF and DOCX files allowed");
      return;
    }
    setFile(dropped);
  };

  const handleRemoveFile = () => setFile(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) { toast.error("Please upload a resume first"); return; }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("resume", file);
      if (jobDescription) formData.append("jobDescription", jobDescription);

      const res = await uploadResumeAPI(formData);
      toast.success("Resume analyzed successfully!");
      onUploadSuccess(res.data.data);
      setFile(null);
      setJobDescription("");
    } catch (err) {
      toast.error(err.response?.data?.error || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className={cardClass}>
      <h2 className={`text-lg font-semibold ${textPrimary} mb-4`}>
        Upload Resume
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* ── Drop zone ─────────────────────────────────── */}
        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors
            ${file ? "border-blue-300 bg-blue-50" : "border-slate-200 hover:border-blue-300 hover:bg-slate-50"}`}
        >
          {file ? (
            <div className="flex items-center justify-center gap-3">
              <FileText className="w-6 h-6 text-blue-600" />
              <span className={`text-sm font-medium ${textPrimary}`}>{file.name}</span>
              <button
                type="button"
                onClick={handleRemoveFile}
                className="text-slate-400 hover:text-red-500 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <>
              <Upload className="w-8 h-8 text-slate-300 mx-auto mb-3" />
              <p className={`text-sm font-medium ${textSecondary} mb-1`}>
                Drag and drop your resume here
              </p>
              <p className={`text-xs ${textMuted} mb-4`}>PDF or DOCX · max 5MB</p>
              <label className={`${btnSecondary} text-sm cursor-pointer inline-block`}>
                Browse file
                <input
                  type="file"
                  accept=".pdf,.docx"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            </>
          )}
        </div>

        {/* ── Job description ───────────────────────────── */}
        <div>
          <label className={`block text-sm font-medium ${textSecondary} mb-1.5`}>
            Job Description
            <span className={`${textMuted} font-normal ml-1`}>(optional — improves match score)</span>
          </label>
          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste the job description here..."
            rows={4}
            className={`${inputClass} resize-none`}
          />
        </div>

        {/* ── Submit ────────────────────────────────────── */}
        <button
          type="submit"
          disabled={uploading || !file}
          className={`${btnPrimary} w-full disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {uploading ? "Analyzing..." : "Analyze Resume"}
        </button>

      </form>
    </div>
  );
}

export default ResumeUpload;