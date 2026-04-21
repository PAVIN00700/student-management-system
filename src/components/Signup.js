import { useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, Lock, ArrowRight, GraduationCap } from "lucide-react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css"; // Reuse login styles

function Signup() {
  const [data, setData] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await API.post("/auth/signup", data);
      alert("Registration successful! Please login.");
      navigate("/");
    } catch (err) {
      const serverMsg = err.response?.data?.message || err.response?.data;
      setError(typeof serverMsg === 'string' ? serverMsg : "Registration failed. Ensure backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-bg-blobs">
        <div className="blob blob-1"></div>
        <div className="blob blob-2" style={{ background: '#c084fc' }}></div>
      </div>

      <motion.div
        className="auth-card"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="auth-header">
          <div className="auth-logo">
            <GraduationCap size={40} />
          </div>
          <h1>Create Account</h1>
          <p>Join our student management portal</p>
        </div>

        <form onSubmit={handleSignup} className="auth-form">
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
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
                placeholder="username"
                required
                onChange={(e) =>
                  setData({ ...data, username: e.target.value })
                }
              />
            </div>
          </div>

          <div className="auth-input-group">
            <label>Email Address</label>
            <div className="input-field">
              <Mail size={20} className="input-icon" />
              <input
                type="email"
                placeholder="your@mail.com"
                required
                onChange={(e) =>
                  setData({ ...data, email: e.target.value })
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
            {loading ? "Creating Account..." : (
              <>
                <span>Sign Up</span>
                <ArrowRight size={20} />
              </>
            )}
          </button>
        </form>

        <div className="auth-footer">
          <p>Already have an account? <Link to="/">Login</Link></p>
        </div>
      </motion.div>
    </div>
  );
}

export default Signup;

