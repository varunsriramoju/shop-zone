import React, { useState } from "react";
import { register } from "../../api/authApi";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "../../context/ToastContext";
import "./Auth.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await register(name, email, password);
      showToast("Account created successfully! Please login.", "success");
      navigate("/login");
    } catch (err) {
      console.error(err);
      showToast(err.response?.data?.message || "Registration failed", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-glow"></div>
      <div className="auth-card glass">
        <h2 className="text-gradient">Get Started</h2>
        <p className="auth-subtitle">Create a free account to start shopping premium goods</p>
        
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input 
              type="text" 
              placeholder="John Doe" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              className="form-input" 
              required 
            />
          </div>

          <div className="form-group">
            <label className="form-label">Email</label>
            <input 
              type="email" 
              placeholder="name@domain.com" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              className="form-input" 
              required 
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Password</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              className="form-input" 
              required 
            />
          </div>
          
          <button type="submit" className="btn btn-primary auth-btn" disabled={loading}>
            {loading ? 'Creating...' : 'Register'}
          </button>
        </form>
        
        <p className="auth-footer-text">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
