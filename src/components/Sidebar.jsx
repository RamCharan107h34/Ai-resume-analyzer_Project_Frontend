import { NavLink } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import {
  sidebarClass,
  sidebarItemClass,
  sidebarItemActiveClass,
  sidebarLabelClass,
  divider,
} from "../styles/theme";
import {
  LayoutDashboard,
  History,
  ShieldCheck,
  LogOut,
} from "lucide-react";

function Sidebar() {
  const user   = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const isAdmin = user?.role === "ADMIN";

  const handleLogout = async () => {
    await logout();
  };

  return (
    <aside className={`${sidebarClass} hidden md:flex`}>

      {/* ── Main nav ────────────────────────────────────── */}
      <div className="flex-1">
        <p className={sidebarLabelClass}>Main</p>

        <nav className="space-y-1">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive ? sidebarItemActiveClass : sidebarItemClass
            }
          >
            <LayoutDashboard className="w-4 h-4" />
            Dashboard
          </NavLink>

          <NavLink
            to="/history"
            className={({ isActive }) =>
              isActive ? sidebarItemActiveClass : sidebarItemClass
            }
          >
            <History className="w-4 h-4" />
            History
          </NavLink>

          {/* Admin only */}
          {isAdmin && (
            <>
              <p className={sidebarLabelClass}>Admin</p>
              <NavLink
                to="/admin"
                className={({ isActive }) =>
                  isActive ? sidebarItemActiveClass : sidebarItemClass
                }
              >
                <ShieldCheck className="w-4 h-4" />
                Admin Panel
              </NavLink>
            </>
          )}
        </nav>
      </div>

      {/* ── Logout ──────────────────────────────────────── */}
      <div className={`pt-4 ${divider}`}>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-2.5 rounded-lg text-sm text-red-500 hover:bg-red-50 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>

    </aside>
  );
}

export default Sidebar;