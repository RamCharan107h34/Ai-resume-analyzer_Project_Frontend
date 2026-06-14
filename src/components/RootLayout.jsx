import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useAuthStore } from "../store/authStore";

function RootLayout() {
  const checkAuth = useAuthStore((state) => state.checkAuth);

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />         {/* h-16 = 64px */}
      <Outlet />         {/* AppLayout or page */}
      <Footer />         {/* h-16 = 64px */}
    </div>
  );
}

export default RootLayout;