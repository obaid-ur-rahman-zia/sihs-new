import React from "react";
import { Link } from "react-router-dom";
import "./AdminDashboard.css";

function AdminDashboard() {
  const dashboardItems = [
    { title: "Profile", path: "/admin/profile", icon: "👤" },
    { title: "Slider Settings", path: "/admin/slider", icon: "🖼️" },
    { title: "News & Events", path: "/admin/news", icon: "📰" },
    { title: "Downloads", path: "/admin/downloads", icon: "📥" },
    { title: "Notifications", path: "/admin/notifications", icon: "🔔" },
    { title: "Faculty Manager", path: "/admin/faculty", icon: "👥" },
    { title: "Departments", path: "/admin/departments", icon: "🏢" },
    { title: "Research", path: "/admin/research", icon: "🔬" },
    { title: "Site Settings", path: "/admin/settings", icon: "⚙️" },
  ];

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <p>Welcome to SIHS Admin Panel</p>
      </div>
      
      <div className="dashboard-grid">
        {dashboardItems.map((item, index) => (
          <Link key={index} to={item.path} className="dashboard-card">
            <div className="card-icon">{item.icon}</div>
            <h3>{item.title}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default AdminDashboard;