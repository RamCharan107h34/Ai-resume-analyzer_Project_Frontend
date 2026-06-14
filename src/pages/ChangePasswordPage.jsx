import { useState } from "react";
import { changePasswordAPI } from "../services/api";
import toast from "react-hot-toast";
import { KeyRound, Eye, EyeOff } from "lucide-react";
import {
  cardClass,
  inputClass,
  btnPrimary,
  textPrimary,
  textSecondary,
  textMuted,
} from "../styles/theme";

// ✅ outside ChangePasswordPage — never recreated on render
const PasswordField = ({ label, name, value, onChange, show, onToggle }) => (
  <div>
    <label className={`block text-sm font-medium ${textSecondary} mb-1.5`}>
      {label}
    </label>
    <div className="relative">
      <input
        type={show ? "text" : "password"}
        name={name}
        value={value}
        onChange={onChange}
        placeholder="••••••••"
        required
        className={`${inputClass} pr-10`}
      />
      <button
        type="button"
        onClick={onToggle}
        className={`absolute right-3 top-1/2 -translate-y-1/2 ${textMuted} hover:text-slate-700 transition-colors`}
      >
        {show
          ? <EyeOff className="w-4 h-4" />
          : <Eye    className="w-4 h-4" />
        }
      </button>
    </div>
  </div>
);

function ChangePasswordPage() {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword:     "",
    confirmPassword: "",
  });

  const [show, setShow] = useState({
    current: false,
    new:     false,
    confirm: false,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleShow = (field) => {
    setShow((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }

    if (formData.newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    try {
      await changePasswordAPI({
        currentPassword: formData.currentPassword,
        newPassword:     formData.newPassword,
      });
      toast.success("Password changed successfully");
      setFormData({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to change password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto space-y-6">

      <div>
        <h1 className={`text-2xl font-bold ${textPrimary} flex items-center gap-2`}>
          <KeyRound className="w-6 h-6 text-blue-600" />
          Change Password
        </h1>
        <p className={`text-sm ${textMuted} mt-1`}>
          Make sure your new password is strong and unique
        </p>
      </div>

      <div className={cardClass}>
        <form onSubmit={handleSubmit} className="space-y-5">

          <PasswordField
            label="Current Password"
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleChange}
            show={show.current}
            onToggle={() => toggleShow("current")}
          />
          <PasswordField
            label="New Password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            show={show.new}
            onToggle={() => toggleShow("new")}
          />
          <PasswordField
            label="Confirm New Password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            show={show.confirm}
            onToggle={() => toggleShow("confirm")}
          />

          <p className={`text-xs ${textMuted}`}>
            Password must be at least 6 characters
          </p>

          <button
            type="submit"
            disabled={loading}
            className={`${btnPrimary} w-full disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {loading ? "Updating..." : "Update Password"}
          </button>

        </form>
      </div>

    </div>
  );
}

export default ChangePasswordPage;