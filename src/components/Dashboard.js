import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  UserPlus,
  Trash2,
  Users,
  User,
  Mail,
  BookOpen,
  Plus,
  Loader2
} from "lucide-react";

import API from "../services/api";
import Navbar from "./Navbar";
import "./Dashboard.css";

function Dashboard() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    department: "",
  });

  const fetchStudents = async () => {
    try {
      const res = await API.get("/students");
      setStudents(res.data);
    } catch (err) {
      console.error("Error fetching students", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleAddStudent = async (e) => {
    e.preventDefault();
    try {
      await API.post("/students", form);
      setForm({ name: "", email: "", department: "" });
      fetchStudents();
    } catch (err) {
      alert("Error adding student. Check backend connection.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/students/${id}`);
      fetchStudents();
    } catch (err) {
      alert("Error deleting student");
    }
  };

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="dashboard-wrapper">
      <Navbar />

      <main className="container dashboard-container">
        <div className="dashboard-header animate-fade-in">
          <div>
            <h1>Dashboard Overview</h1>
            <p className="subtitle">Manage and monitor student records</p>
          </div>
          <div className="stat-pills">
            <div className="stat-pill">
              <Users size={16} />
              <span>{students.length} Total Students</span>
            </div>
          </div>
        </div>

        <div className="dashboard-grid">
          <motion.section
            className="registration-panel"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="glass-card">
              <div className="card-header">
                <div className="icon-box">
                  <UserPlus size={20} />
                </div>
                <h3>New Registration</h3>
              </div>

              <form onSubmit={handleAddStudent} className="registration-form">
                <div className="form-group-premium">
                  <label>Full Name</label>
                  <div className="input-wrapper">
                    <User size={18} className="input-icon" />
                    <input
                      placeholder="e.g. Your Name"
                      value={form.name}
                      required
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group-premium">
                  <label>Email Address</label>
                  <div className="input-wrapper">
                    <Mail size={18} className="input-icon" />
                    <input
                      type="email"
                      placeholder="e.g. Your@mail.com"
                      value={form.email}
                      required
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group-premium">
                  <label>Department</label>
                  <div className="input-wrapper">
                    <BookOpen size={18} className="input-icon" />
                    <input
                      placeholder="e.g. Department"
                      value={form.department}
                      required
                      onChange={(e) => setForm({ ...form, department: e.target.value })}
                    />
                  </div>
                </div>

                <button type="submit" className="prime-btn">
                  <Plus size={20} />
                  <span>Register Student</span>
                </button>
              </form>
            </div>
          </motion.section>

          <section className="list-panel">
            <div className="list-controls">
              <div className="search-bar-premium">
                <Search className="search-icon" size={18} />
                <input
                  type="text"
                  placeholder="Search students or departments..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {loading ? (
              <div className="loading-state-premium">
                <Loader2 className="spinner" size={40} />
                <p>Synchronizing student database...</p>
              </div>
            ) : (
              <motion.div
                className="student-list-grid"
                layout
              >
                <AnimatePresence mode="popLayout">
                  {filteredStudents.map((student, index) => (
                    <motion.div
                      key={student.id}
                      className="student-card-premium"
                      layout
                      initial={{ opacity: 0, scale: 0.9, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9, x: -20 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ y: -5, boxShadow: "var(--shadow-lg)" }}
                    >
                      <div className="card-top">
                        <div className="avatar">
                          {student.name.charAt(0)}
                        </div>
                        <button
                          className="delete-btn-premium"
                          onClick={() => handleDelete(student.id)}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>

                      <div className="card-mid">
                        <h4>{student.name}</h4>
                        <div className="info-row">
                          <Mail size={14} />
                          <span>{student.email}</span>
                        </div>
                      </div>

                      <div className="card-bottom">
                        <div className="dept-tag">
                          {student.department}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {filteredStudents.length === 0 && !loading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="empty-state-premium"
                  >
                    <Search size={48} className="empty-icon" />
                    <p>No matching student records found</p>
                  </motion.div>
                )}
              </motion.div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;