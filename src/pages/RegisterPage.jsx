import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import toast from "react-hot-toast";
import {
  cardClass,
  inputClass,
  btnPrimary,
  textPrimary,
  textSecondary,
  textMuted,
  pageBg,
} from "../styles/theme";

function RegisterPage() {
  const register = useAuthStore((state) => state.register);
  const loading  = useAuthStore((state) => state.loading);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email:    "",
    password: "",
  });

  const [profileImage, setProfileImage] = useState(null);
  const [preview,      setPreview]      = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setProfileImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // build FormData for multipart upload
    const data = new FormData();
    data.append("username", formData.username);
    data.append("email",    formData.email);
    data.append("password", formData.password);
    if (profileImage) data.append("profileImage", profileImage);

    const result = await register(data);
    if (result.success) {
      toast.success("Account created! Please log in.");
      navigate("/login");
    } else {
      toast.error(result.message);
    }
  };

  return (
    <div className={`min-h-screen ${pageBg} flex items-center justify-center px-4 py-10`}>
      <div className={`${cardClass} w-full max-w-md`}>

        {/* ── Header ──────────────────────────────────────── */}
        <div className="text-center mb-8">
          <h1 className={`text-2xl font-bold ${textPrimary} mb-1`}>
            Create account
          </h1>
          <p className={`text-sm ${textMuted}`}>
            Start scoring your resume today
          </p>
        </div>

        {/* ── Form ────────────────────────────────────────── */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* profile image */}
          <div className="flex flex-col items-center gap-3">
            <div className="w-20 h-20 rounded-full bg-slate-100 border-2 border-slate-200 overflow-hidden flex items-center justify-center">
              {preview
                ? <img src={preview} alt="preview" className="w-full h-full object-cover" />
                : <span className="text-slate-400 text-sm">Photo</span>
              }
            </div>
            <label className="cursor-pointer text-sm text-blue-600 hover:text-blue-700 font-medium">
              Upload photo (optional)
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>

          <div>
            <label className={`block text-sm font-medium ${textSecondary} mb-1.5`}>
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="johndoe"
              required
              className={inputClass}
            />
          </div>

          <div>
            <label className={`block text-sm font-medium ${textSecondary} mb-1.5`}>
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
              className={inputClass}
            />
          </div>

          <div>
            <label className={`block text-sm font-medium ${textSecondary} mb-1.5`}>
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
              minLength={6}
              className={inputClass}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`${btnPrimary} w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {loading ? "Creating account..." : "Create account"}
          </button>

        </form>

        {/* ── Footer ──────────────────────────────────────── */}
        <p className={`text-sm text-center ${textMuted} mt-6`}>
          Already have an account?{" "}
          <NavLink
            to="/login"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Sign in
          </NavLink>
        </p>

      </div>
    </div>
  );
}

export default RegisterPage;