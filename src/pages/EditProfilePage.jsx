import { useState } from "react";
import { useAuthStore } from "../store/authStore";
import { updateProfileAPI } from "../services/api";
import toast from "react-hot-toast";
import { User, Camera } from "lucide-react";
import {
  cardClass,
  inputClass,
  btnPrimary,
  btnSecondary,
  textPrimary,
  textSecondary,
  textMuted,
  pageBg,
} from "../styles/theme";

function EditProfilePage() {
  const user    = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);

  const [username,      setUsername]      = useState(user?.username || "");
  const [profileImage,  setProfileImage]  = useState(null);
  const [preview,       setPreview]       = useState(user?.profileImgurl || null);
  const [loading,       setLoading]       = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setProfileImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("username", username);
      if (profileImage) formData.append("profileImage", profileImage);

      const res = await updateProfileAPI(formData);
      // update user in store
      setUser(res.data.data);
      toast.success("Profile updated successfully");
    } catch (err) {
      toast.error(err.response?.data?.error || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto space-y-6">

      {/* ── Page title ──────────────────────────────────── */}
      <div>
        <h1 className={`text-2xl font-bold ${textPrimary}`}>Edit Profile</h1>
        <p className={`text-sm ${textMuted} mt-1`}>
          Update your username and profile photo
        </p>
      </div>

      <div className={cardClass}>
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* ── Avatar ────────────────────────────────────── */}
          <div className="flex flex-col items-center gap-3">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-blue-600 flex items-center justify-center text-white text-2xl font-bold overflow-hidden border-4 border-slate-100">
                {preview
                  ? <img src={preview} alt="avatar" className="w-full h-full object-cover" />
                  : <User className="w-10 h-10" />
                }
              </div>
              {/* camera button */}
              <label className="absolute bottom-0 right-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-700 transition-colors border-2 border-white">
                <Camera className="w-4 h-4 text-white" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>
            <p className={`text-xs ${textMuted}`}>
              Click the camera icon to change photo
            </p>
          </div>

          {/* ── Username ──────────────────────────────────── */}
          <div>
            <label className={`block text-sm font-medium ${textSecondary} mb-1.5`}>
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Your username"
              required
              className={inputClass}
            />
          </div>

          {/* ── Email (read only) ─────────────────────────── */}
          <div>
            <label className={`block text-sm font-medium ${textSecondary} mb-1.5`}>
              Email
            </label>
            <input
              type="email"
              value={user?.email || ""}
              disabled
              className={`${inputClass} bg-slate-50 text-slate-400 cursor-not-allowed`}
            />
            <p className={`text-xs ${textMuted} mt-1`}>Email cannot be changed</p>
          </div>

          {/* ── Actions ───────────────────────────────────── */}
          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={loading}
              className={`${btnPrimary} flex-1 disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>

        </form>
      </div>

    </div>
  );
}

export default EditProfilePage;