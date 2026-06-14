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
  navLinkActiveClass,
  navLinkClass,
} from "../styles/theme";

function LoginPage() {
  const login   = useAuthStore((state) => state.login);
  const loading = useAuthStore((state) => state.loading);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email:    "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(formData);
    if (result.success) {
      toast.success("Welcome back!");
      navigate("/dashboard");
    } else {
      toast.error(result.message);
    }
  };

  return (
    <div className={`min-h-screen ${pageBg} flex items-center justify-center px-4`}>
      <div className={`${cardClass} w-full max-w-md`}>

        {/* ── Header ──────────────────────────────────────── */}
        <div className="text-center mb-8">
          <h1 className={`text-2xl font-bold ${textPrimary} mb-1`}>
            Welcome back
          </h1>
          <p className={`text-sm ${textMuted}`}>
            Sign in to your account
          </p>
        </div>

        {/* ── Form ────────────────────────────────────────── */}
        <form onSubmit={handleSubmit} className="space-y-5">

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
              className={inputClass}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`${btnPrimary} w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>

        </form>

        {/* ── Footer ──────────────────────────────────────── */}
        <p className={`text-sm text-center ${textMuted} mt-6`}>
          Don't have an account?{" "}
          <NavLink
            to="/register"
            className={({ isActive }) => isActive ? navLinkActiveClass : `text-blue-600 hover:text-blue-700 font-medium`}
          >
            Register
          </NavLink>
        </p>

      </div>
    </div>
  );
}

export default LoginPage;