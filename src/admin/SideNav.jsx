import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { LogOut } from "lucide-react";
import "./SideNav.css";

function SideNav() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("admin_token");
    navigate("/admin/login", { replace: true });
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      {/* 🟦 Top Mobile Header */}
   
        <button className="menu-btn" onClick={toggleMenu}>
          
        </button>

      {/* 🟩 Desktop + Mobile Sidenav */}
      <AnimatePresence>
        {(isOpen || window.innerWidth > 900) && (
          <motion.aside
            className="admin-sidenav"
            initial={{ x: -250 }}
            animate={{ x: 0 }}
            exit={{ x: -250 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
          >
            <div className="sidenav-brand">SIHS Admin</div>
            <nav className="sidenav-menu">
              <NavLink to="/admin/slider" className={({ isActive }) => (isActive ? "active" : "")}>
                Slider Settings
              </NavLink>
              <NavLink to="/admin/news" className={({ isActive }) => (isActive ? "active" : "")}>
                News & Events
              </NavLink>
              <NavLink to="/admin/downloads" className={({ isActive }) => (isActive ? "active" : "")}>
                Downloads
              </NavLink>
              <NavLink to="/admin/notifications" className={({ isActive }) => (isActive ? "active" : "")}>
                Notifications
              </NavLink>
              <NavLink to="/admin/research" className={({ isActive }) => (isActive ? "active" : "")}>
                Research
              </NavLink>
              <NavLink to="/admin/settings" className={({ isActive }) => (isActive ? "active" : "")}>
                Site Settings
              </NavLink>
              <NavLink to="/admin/profile" className={({ isActive }) => (isActive ? "active" : "")}>
                Profile
              </NavLink>
            </nav>

            <div className="sidenav-footer">
              <button className="btn-logout" onClick={logout}>
                <LogOut size={18} style={{ marginRight: "6px" }} />
                Log Out
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}

export default SideNav;
