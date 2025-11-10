import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AUTH_API } from "../api";
import "./Signup.css";

function AdminSignup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const signup = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validation
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    setLoading(true);

    // Debug: Check API configuration
    console.log("Using AUTH_API.SIGNUP:", AUTH_API.SIGNUP);
    
    if (!AUTH_API.SIGNUP) {
      console.error("API configuration error: AUTH_API.SIGNUP is not defined");
      setError("Configuration error: API endpoint not found. Please check your api.js configuration.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(AUTH_API.SIGNUP, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create account");
      }

      // Store token and admin info
      localStorage.setItem("admin_token", data.token);
      localStorage.setItem("admin_profile", JSON.stringify(data.admin));

      setSuccess("Admin account created successfully! Redirecting...");
      
      setTimeout(() => {
        navigate("/admin", { replace: true });
      }, 1500);
      
    } catch (err) {
      console.error("Signup Error:", err);
      setError(err.message || "Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <form className="auth-card" onSubmit={signup}>
        <h2><img src="/images/logo.png" alt="" style={{width:"100px",margin:"auto"}}/> Create Admin Account</h2>

        {error && <div className="error">{error}</div>}
        {success && <div className="success">{success}</div>}

        <label>Full Name</label>
        <input
          name="name" 
          type="text"
          value={form.name}
          onChange={handleChange}
          placeholder="Enter your full name"
          required
        />

        <label>Email</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="admin@sihs.edu"
          required
        />

        <label>Password</label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Minimum 6 characters"
          required
        />

        <label>Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={handleChange}
          placeholder="Re-enter your password"
          required
        />

        <button type="submit" className="btn-auth" disabled={loading}>
          {loading ? "Creating Account..." : "Sign Up"}
        </button>

        <div className="auth-links">
          <Link to="/admin/login">Already have an account? Login</Link>
          <Link to="/">← Back to site</Link>
        </div>
      </form>
    </div>
  );
}

export default AdminSignup;