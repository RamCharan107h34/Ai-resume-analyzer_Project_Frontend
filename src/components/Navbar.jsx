import { NavLink, useNavigate } from "react-router-dom";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useAuthStore } from "../store/authStore";
import { FileText, User, KeyRound, LogOut, ChevronDown } from "lucide-react";
import {
  navbarClass,
  navContainerClass,
  navBrandClass,
  navLinksClass,
  navLinkClass,
  navLinkActiveClass,
  dropdownClass,
  dropdownItemClass,
  dropdownDangerClass,
} from "../styles/theme";

function Navbar() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user            = useAuthStore((state) => state.user);
  const logout          = useAuthStore((state) => state.logout);
  const navigate        = useNavigate();

  const handleLogout = async (close) => {
    close();
    await logout();
    navigate("/");
  };

  const getInitials = (name) => {
    if (!name) return "U";
    return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
  };

  return (
    <nav className={navbarClass}>
      <div className={navContainerClass}>

        {/* ── Logo ──────────────────────────────────────────── */}
        <NavLink to="/" className={navBrandClass}>
          <div className="bg-blue-600 p-1.5 rounded-lg">
            <FileText className="w-5 h-5 text-white" />
          </div>
          Resume<span className="text-blue-600">AI</span>
        </NavLink>

        {/* ── Nav links ─────────────────────────────────────── */}
        <ul className={navLinksClass}>

          {/* Home — always visible */}
          <li>
            <NavLink
              to="/"
              end
              className={({ isActive }) => isActive ? navLinkActiveClass : navLinkClass}
            >
              Home
            </NavLink>
          </li>

          {/* Guest links */}
          {!isAuthenticated && (
            <>
              <li>
                <NavLink
                  to="/register"
                  className={({ isActive }) => isActive ? navLinkActiveClass : navLinkClass}
                >
                  Register
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/login"
                  className={({ isActive }) => isActive ? navLinkActiveClass : navLinkClass}
                >
                  Login
                </NavLink>
              </li>
            </>
          )}

          {/* Auth — avatar popup dropdown */}
          {isAuthenticated && (
            <li>
              <Popup
                trigger={
                  <button className={`${navLinkClass} flex items-center gap-2`}>
                    {/* avatar */}
                    <span className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-semibold overflow-hidden">
                      {user?.profileImgurl
                        ? <img src={user.profileImgurl} alt="avatar" className="w-full h-full object-cover" />
                        : getInitials(user?.username)
                      }
                    </span>
                    <span className="text-sm font-medium text-slate-900">{user?.username}</span>
                    <ChevronDown className="w-4 h-4 text-slate-500" />
                  </button>
                }
                position="bottom right"
                on="click"
                closeOnDocumentClick
                arrow={false}
                contentStyle={{
                  padding: 0,
                  border: "none",
                  borderRadius: "0.75rem",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                  width: "210px",
                }}
              >
                {(close) => (
                  <div className={dropdownClass}>

                    {/* user info */}
                    <div className="px-4 py-3 border-b border-slate-200">
                      <p className="text-sm font-medium text-slate-900">{user?.username}</p>
                      <p className="text-xs text-slate-500 truncate">{user?.email}</p>
                      <span className="bg-blue-50 text-blue-600 text-xs font-medium px-2 py-0.5 rounded-full mt-1 inline-block">
                        {user?.role}
                      </span>
                    </div>

                    {/* links */}
                    <div className="py-1">
                      <NavLink
                        to="/profile/edit"
                        onClick={close}
                        className={dropdownItemClass}
                      >
                        <User className="w-4 h-4" /> Edit Profile
                      </NavLink>
                      <NavLink
                        to="/profile/change-password"
                        onClick={close}
                        className={dropdownItemClass}
                      >
                        <KeyRound className="w-4 h-4" /> Change Password
                      </NavLink>
                    </div>

                    {/* logout */}
                    <div className="border-t border-slate-200 py-1">
                      <button
                        onClick={() => handleLogout(close)}
                        className={dropdownDangerClass}
                      >
                        <LogOut className="w-4 h-4" /> Logout
                      </button>
                    </div>

                  </div>
                )}
              </Popup>
            </li>
          )}

        </ul>
      </div>
    </nav>
  );
}

export default Navbar;