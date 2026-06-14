import { useState, useEffect } from "react";
import {
  getAdminStatsAPI,
  getAllUsersAPI,
  getAllResumesAPI,
  toggleUserAPI,
  deleteUserAPI,
} from "../services/api";
import toast from "react-hot-toast";
import {
  Users,
  FileText,
  BarChart2,
  ShieldCheck,
  Trash2,
  ToggleLeft,
  ToggleRight,
  Calendar,
} from "lucide-react";
import {
  cardClass,
  textPrimary,
  textSecondary,
  textMuted,
  badgeGreen,
  badgeRed,
  badgeBlue,
  badgeSlate,
  badgeAmber,
  btnSecondary,
  divider,
} from "../styles/theme";

// ── Stat Card ────────────────────────────────────────────────
const StatCard = ({ icon: Icon, label, value, color }) => (
  <div className={cardClass}>
    <div className="flex items-center justify-between">
      <div>
        <p className={`text-sm ${textMuted} mb-1`}>{label}</p>
        <p className={`text-3xl font-bold ${textPrimary}`}>{value}</p>
      </div>
      <div className={`p-3 rounded-xl ${color}`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
    </div>
  </div>
);

// ── Format date ──────────────────────────────────────────────
const formatDate = (date) =>
  new Date(date).toLocaleDateString("en-IN", {
    day:   "numeric",
    month: "short",
    year:  "numeric",
  });

function AdminPage() {
  const [stats,   setStats]   = useState(null);
  const [users,   setUsers]   = useState([]);
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab,     setTab]     = useState("users"); // "users" | "resumes"

  // ── Fetch all data on mount ──────────────────────────────
  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [statsRes, usersRes, resumesRes] = await Promise.all([
          getAdminStatsAPI(),
          getAllUsersAPI(),
          getAllResumesAPI(),
        ]);
        setStats(statsRes.data.data);
        setUsers(usersRes.data.data);
        setResumes(resumesRes.data.data);
      } catch (err) {
        toast.error("Failed to load admin data");
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  // ── Toggle user active status ────────────────────────────
  const handleToggle = async (id) => {
    try {
      const res = await toggleUserAPI(id);
      setUsers((prev) =>
        prev.map((u) =>
          u._id === id ? { ...u, isUserActive: res.data.data.isUserActive } : u
        )
      );
      toast.success(res.data.message);
    } catch (err) {
      toast.error("Failed to update user status");
    }
  };

  // ── Delete user ──────────────────────────────────────────
  const handleDeleteUser = async (id) => {
    if (!window.confirm("Delete this user and all their resumes?")) return;
    try {
      await deleteUserAPI(id);
      setUsers((prev) => prev.filter((u) => u._id !== id));
      toast.success("User deleted");
    } catch (err) {
      toast.error("Failed to delete user");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className={`text-sm ${textMuted}`}>Loading admin data...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">

      {/* ── Page title ──────────────────────────────────── */}
      <div>
        <h1 className={`text-2xl font-bold ${textPrimary} flex items-center gap-2`}>
          <ShieldCheck className="w-6 h-6 text-blue-600" />
          Admin Panel
        </h1>
        <p className={`text-sm ${textMuted} mt-1`}>
          Manage users and monitor resume activity
        </p>
      </div>

      {/* ── Stats grid ──────────────────────────────────── */}
      {stats && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            icon={Users}
            label="Total Users"
            value={stats.users.total}
            color="bg-blue-600"
          />
          <StatCard
            icon={ShieldCheck}
            label="Active Users"
            value={stats.users.active}
            color="bg-green-600"
          />
          <StatCard
            icon={FileText}
            label="Total Resumes"
            value={stats.resumes.total}
            color="bg-amber-500"
          />
          <StatCard
            icon={BarChart2}
            label="Avg Score"
            value={stats.averageScores.overall}
            color="bg-purple-600"
          />
        </div>
      )}

      {/* ── Tabs ────────────────────────────────────────── */}
      <div className={`flex gap-1 border-b ${divider}`}>
        <button
          onClick={() => setTab("users")}
          className={`px-4 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-px
            ${tab === "users"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-slate-500 hover:text-slate-700"
            }`}
        >
          Users ({users.length})
        </button>
        <button
          onClick={() => setTab("resumes")}
          className={`px-4 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-px
            ${tab === "resumes"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-slate-500 hover:text-slate-700"
            }`}
        >
          Resumes ({resumes.length})
        </button>
      </div>

      {/* ── Users tab ───────────────────────────────────── */}
      {tab === "users" && (
        <div className={cardClass}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className={`border-b ${divider} text-left`}>
                  <th className={`pb-3 font-medium pt-3 ${textSecondary}`}>User</th>
                  <th className={`pb-3 font-medium pt-3 ${textSecondary} hidden sm:table-cell`}>Role</th>
                  <th className={`pb-3 font-medium pt-3 ${textSecondary} hidden md:table-cell`}>Joined</th>
                  <th className={`pb-3 font-medium pt-3 ${textSecondary}`}>Status</th>
                  <th className={`pb-3 font-medium pt-3 ${textSecondary} text-right`}>Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {users.map((user) => (
                  <tr key={user._id} className="hover:bg-slate-50 transition-colors">

                    {/* user info */}
                    <td className="py-3 pr-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-semibold overflow-hidden shrink-0">
                          {user.profileImgurl
                            ? <img src={user.profileImgurl} alt="avatar" className="w-full h-full object-cover" />
                            : user.username?.charAt(0).toUpperCase()
                          }
                        </div>
                        <div className="min-w-0">
                          <p className={`font-medium ${textPrimary} truncate`}>{user.username}</p>
                          <p className={`text-xs ${textMuted} truncate`}>{user.email}</p>
                        </div>
                      </div>
                    </td>

                    {/* role */}
                    <td className="py-3 pr-4 hidden sm:table-cell">
                      <span className={user.role === "ADMIN" ? badgeAmber : badgeBlue}>
                        {user.role}
                      </span>
                    </td>

                    {/* joined */}
                    <td className={`py-3 pr-4 ${textMuted} text-xs hidden md:table-cell`}>
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3 h-3" />
                        {formatDate(user.createdAt)}
                        {console.log(user.createdAt)}
                      </div>
                    </td>

                    {/* status */}
                    <td className="py-3 pr-4">
                      <span className={user.isUserActive ? badgeGreen : badgeRed}>
                        {user.isUserActive ? "Active" : "Inactive"}
                      </span>
                    </td>

                    {/* actions */}
                    <td className="py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleToggle(user._id)}
                          className={`${btnSecondary} text-xs flex items-center gap-1.5 py-1.5`}
                        >
                          {user.isUserActive
                            ? <><ToggleRight className="w-3.5 h-3.5 text-green-600" /> Deactivate</>
                            : <><ToggleLeft  className="w-3.5 h-3.5 text-slate-400" /> Activate</>
                          }
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user._id)}
                          className="flex items-center gap-1.5 text-xs text-red-500 hover:text-red-600 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" /> Delete
                        </button>
                      </div>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── Resumes tab ─────────────────────────────────── */}
      {tab === "resumes" && (
        <div className={cardClass}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className={`border-b ${divider} text-left`}>
                  <th className={`pb-3 font-medium pt-3 ${textSecondary}`}>File</th>
                  <th className={`pb-3 font-medium pt-3 ${textSecondary} hidden sm:table-cell`}>User</th>
                  <th className={`pb-3 font-medium pt-3 ${textSecondary} hidden md:table-cell`}>Scores</th>
                  <th className={`pb-3 font-medium pt-3 ${textSecondary} hidden lg:table-cell`}>Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {resumes.map((resume) => (
                  <tr key={resume._id} className="hover:bg-slate-50 transition-colors">

                    {/* filename */}
                    <td className="py-3 pr-4">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-blue-600 shrink-0" />
                        <span className={`${textPrimary} truncate max-w-[160px]`}>
                          {resume.fileName}
                        </span>
                      </div>
                      <span className={`${badgeBlue} mt-1 inline-block`}>
                        {resume.fileType?.toUpperCase()}
                      </span>
                    </td>

                    {/* user */}
                    <td className={`py-3 pr-4 ${textSecondary} hidden sm:table-cell`}>
                      <p className="font-medium">{resume.userId?.username}</p>
                      <p className={`text-xs ${textMuted}`}>{resume.userId?.email}</p>
                    </td>

                    {/* scores */}
                    <td className="py-3 pr-4 hidden md:table-cell">
                      <div className="flex items-center gap-3">
                        <div className="text-center">
                          <p className={`font-bold ${textPrimary}`}>{resume.overallScore}</p>
                          <p className={`text-xs ${textMuted}`}>Overall</p>
                        </div>
                        <div className="text-center">
                          <p className={`font-bold ${textPrimary}`}>{resume.atsScore}</p>
                          <p className={`text-xs ${textMuted}`}>ATS</p>
                        </div>
                        <div className="text-center">
                          <p className={`font-bold ${textPrimary}`}>{resume.matchScore}</p>
                          <p className={`text-xs ${textMuted}`}>Match</p>
                        </div>
                      </div>
                    </td>

                    {/* date */}
                    <td className={`py-3 pr-4 text-xs ${textMuted} hidden lg:table-cell`}>
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3 h-3" />
                        {formatDate(resume.createdAt)}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
}

export default AdminPage;