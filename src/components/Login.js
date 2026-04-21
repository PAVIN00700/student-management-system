import { useState } from "react";
import { motion } from "framer-motion";
import { User, Lock, ArrowRight, GraduationCap } from "lucide-react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

function Login() {
  const [data, setData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await API.post("/auth/login", data);
      localStorage.removeItem("token"); // Clear old
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {

      setError(err.response?.data?.message || "Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-bg-blobs">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
      </div>
      
      <motion.div 
        className="auth-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="auth-header">
          <div className="auth-logo">
            <GraduationCap size={40} />
          </div>
          <h1>Welcome Back</h1>
          <p>Login to your administrator account</p>
        </div>

        <form onSubmit={handleLogin} className="auth-form">
          {error && (
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="error-message"
            >
              {error}
            </motion.div>
          )}
          
          <div className="auth-input-group">
            <label>Username</label>
            <div className="input-field">
              <User size={20} className="input-icon" />
              <input
                type="text"
                placeholder="Enter username"
                required
                onChange={(e) =>
                  setData({ ...data, username: e.target.value })
                }
              />
            </div>
          </div>

          <div className="auth-input-group">
            <label>Password</label>
            <div className="input-field">
              <Lock size={20} className="input-icon" />
              <input
                type="password"
                placeholder="••••••••"
                required
                onChange={(e) =>
                  setData({ ...data, password: e.target.value })
                }
              />
            </div>
          </div>

          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? "Verifying..." : (
              <>
                <span>Sign In</span>
                <ArrowRight size={20} />
              </>
            )}
          </button>
        </form>

        <div className="auth-footer">
          <p>Don't have an account? <Link to="/signup">Register now</Link></p>
        </div>
      </motion.div>
    </div>
  );
}

export default Login;