import React, { useState } from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";
import axios from "axios"; 

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [activeTab, setActiveTab] = useState("Donor");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // ✅ Send login request to backend
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        ...form,
        role: activeTab, // include role so backend can verify if needed
      });

      //  If login successful, save token & redirect
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userRole", activeTab);
        alert("✅ Login successful!");

        // Redirect based on role
      if (activeTab === "Orphanage") {
        navigate("/orphanage"); // organization dashboard
      } else if (activeTab === "Donor") {
        navigate("/orphanage");
      } else if (activeTab === "Admin") {
        navigate("/orphanage");
      } else {
        navigate("/");
      }
        
      } else {
        alert("❌ Invalid credentials!");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert(err.response?.data?.msg || " Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Welcome Back</h2>
        <div className="login-tabs">
          {["Donor", "Orphanage", "Admin"].map((tab) => (
            <button
              key={tab}
              className={`tab-btn ${activeTab === tab ? "active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <form className="login-form">
          <label>Email</label>
          <input type="email" placeholder="Enter your email" 
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <label>Password</label>
          <input type="password" placeholder="Enter your password" 
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          <a href="/forgot" className="forgot-link">
            Forgot Password?
          </a>

          <button className="submit-btn" onClick={handleSubmit}>Login</button>

          <p className="signup-text">
            Don’t have an account? <a href="/signup">Sign Up</a>
          </p>
        </form>
      </div>
    </div>
    
  );
}


