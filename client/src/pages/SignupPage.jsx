import React, { useState } from "react";
import "../App.css"; // external stylesheet;
import api from "../api/api.js";

const SignupPage = () => {
  const [role, setRole] = useState("Donor");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/signup", { ...formData, role });
      alert("Signup successful!");
      localStorage.setItem("userRole", role);
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="signup-page">

      {/* Sign Up Form */}
      <div className="signup-container">
        <h1 className="signup-title">Sign Up</h1>

        {/* Role Tabs */}
        <div className="role-tabs">
          {["Donor", "Orphanage", "Admin"].map((r) => (
            <button
              key={r}
              className={`role-tab ${role === r ? "active" : ""}`}
              onClick={() => setRole(r)}
            >
              {r}
            </button>
          ))}
        </div>

        {/* Form */}
        <form className="signup-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button type="submit" className="submit-btn">
            Submit
          </button>
        </form>

        <p className="login-link">
          Already have an account?{" "}
          <a href="/login" className="login-anchor">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
