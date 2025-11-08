import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AUTH_API, REQUEST_CONFIG } from "../api";
import "./Auth.css";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(AUTH_API.LOGIN, REQUEST_CONFIG.POST({ email, password }));

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");

      localStorage.setItem("admin_token", data.token);
      navigate("/admin", { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <form className="auth-card" onSubmit={login}>
        <h2><img src="/images/logo.png" alt="" style={{width:"100px",margin:"auto"}}/>  Admin Login</h2>
        {error && <div className="error">{error}</div>}

        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" className="btn-auth" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        <div className="auth-links">
          <Link to="/">← Back to site</Link>
        </div>
      </form>
    </div>
  );
}

export default AdminLogin;
