import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// layouts
import RootLayout from "./components/RootLayout";
import AppLayout from "./components/AppLayout";

// pages
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import HistoryPage from "./pages/HistoryPage";
import EditProfilePage from "./pages/EditProfilePage";
import ChangePasswordPage from "./pages/ChangePasswordPage";
import AdminPage from "./pages/AdminPage";
import UnauthorizedPage from "./pages/UnauthorizedPage";
import NotFoundPage from "./pages/NotFoundPage";

// protected route
import ProtectedRoute from "./components/ui/ProtectedRoute";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [

        // ── Public ────────────────────────────────────────────
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: "login",
          element: <LoginPage />,
        },
        {
          path: "register",
          element: <RegisterPage />,
        },
        {
          path: "unauthorized",
          element: <UnauthorizedPage />,
        },

        // ── Protected (USER + ADMIN) ───────────────────────────
        {
          element: (
            <ProtectedRoute allowedRoles={["USER", "ADMIN"]}>
              <AppLayout />
            </ProtectedRoute>
          ),
          children: [
            {
              path: "dashboard",
              element: <DashboardPage />,
            },
            {
              path: "history",
              element: <HistoryPage />,
            },
            {
              path: "profile/edit",
              element: <EditProfilePage />,
            },
            {
              path: "profile/change-password",
              element: <ChangePasswordPage />,
            },
          ],
        },

        // ── Admin only ─────────────────────────────────────────
        {
          element: (
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <AppLayout />
            </ProtectedRoute>
          ),
          children: [
            {
              path: "admin",
              element: <AdminPage />,
            },
          ],
        },

        // ── 404 ───────────────────────────────────────────────
        {
          path: "*",
          element: <NotFoundPage />,
        },
      ],
    },
  ]);

  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;