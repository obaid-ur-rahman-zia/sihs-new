import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AUTH_API, authHeaders } from "../api";
import "./AdminProfile.css";

function AdminProfile() {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    const token = localStorage.getItem("admin_token");
    
    if (!token) {
      navigate("/admin/login");
      return;
    }

    try {
      const response = await fetch(AUTH_API.PROFILE, {
        headers: authHeaders(token),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch profile");
      }

      setAdmin(data.admin);
    } catch (err) {
      console.error("Profile fetch error:", err);
      setError(err.message);
      
      // If token is invalid, redirect to login
      if (err.message.includes("token") || err.message.includes("Invalid")) {
        localStorage.removeItem("admin_token");
        navigate("/admin/login");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_profile");
    navigate("/admin/login", { replace: true });
  };

  if (loading) {
    return (
      <div className="admin-profile">
        <div className="loading">Loading profile...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-profile">
        <div className="error">{error}</div>
      </div>
    );
  }

  if (!admin) {
    return (
      <div className="admin-profile">
        <div className="error">No profile data available</div>
      </div>
    );
  }

  // Get initials for avatar
  const getInitials = (name) => {
    return name
      .split(" ")
      .map(word => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="admin-profile">
      <h2>Profile</h2>
      <div className="profile-card">
        <div className="avatar">{getInitials(admin.name)}</div>
        <div className="info">
          <h3>{admin.name}</h3>
          <p>{admin.email}</p>
          <div className="meta">
            <span>Role: Administrator</span>
            <span>ID: {admin._id?.slice(-8) || "N/A"}</span>
          </div>
        </div>
      </div>
      
      <div className="profile-actions">
        <button onClick={handleLogout} className="btn-logout">
          🚪 Logout
        </button>
      </div>
    </div>
  );
}

export default AdminProfile;