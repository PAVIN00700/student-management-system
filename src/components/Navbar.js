import { useNavigate } from "react-router-dom";
import { GraduationCap, LogOut, User } from "lucide-react";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand" onClick={() => navigate("/dashboard")}>
          <div className="brand-icon-wrapper">
            <GraduationCap className="brand-icon" size={28} />
          </div>
          <span className="brand-name">STUDENT DASHBOARD</span>
        </div>
        
        <div className="navbar-actions">
          <div 
            className="user-profile" 
            onClick={() => alert("Profile Settings: You are logged in as Administrator.")}
            title="View Profile"
          >
            <div className="user-avatar-mini">
              <User size={18} />
            </div>
            <span>Admin</span>
          </div>
          <button className="logout-button" onClick={handleLogout} title="Sign Out">
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;

