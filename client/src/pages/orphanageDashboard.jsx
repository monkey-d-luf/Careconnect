import React, { useState ,useEffect } from "react";
import "../App.css";
import { FaCheckCircle, FaHourglassHalf, FaUpload ,FaTrash } from "react-icons/fa";

const OrphanageDashboard = () => {
  // ✅ Dummy stored requests
  const [requests, setRequests] = useState(() => {
    // ✅ Load existing from localStorage if available
    const saved = localStorage.getItem("donationRequests");
    return saved ? JSON.parse(saved) : [];
  });

  const [newRequest, setNewRequest] = useState({
    title: "",
    organization:"",
    description: "",
    amount: "",
    type: "",
    location: "",
  });
  useEffect(() => {
  const role = localStorage.getItem("userRole");

  // Combine role info with requests
  const dataToStore = requests.map((req) => ({
    ...req,
    role, // attach the user’s role to each donation request
  }));

  localStorage.setItem("donationRequests", JSON.stringify(dataToStore));
}, [requests]);

  // ✅ Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewRequest({ ...newRequest, [name]: value });
  };
    const handleLogout = () => {
    // Remove authentication data
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userName");
    localStorage.removeItem("donorId"); // if you use this

    alert("You have been logged out!");
    navigate("/login");
  };

  // ✅ Add new request
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      newRequest.title &&
      newRequest.organization &&
      newRequest.description &&
      newRequest.amount &&
      newRequest.type &&
      newRequest.location
    ) {
      const newEntry = {
        ...newRequest,
        amountNeeded: parseInt(newRequest.amount),
        status: "open",
        organization: "Your Organization Name", // Replace with logged-in org later
        image: "/default-donation.png", // Placeholder (optional)
      };
      setRequests([...requests, newEntry]);

      // Clear form
      setNewRequest({
        title: "",
        organization:"",
        description: "",
        amount: "",
        type: "",
        location: "",
      });

      alert("✅ Donation request added successfully!");
    } else {
      alert("⚠️ Please fill all fields before submitting.");
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this request?")) {
      const updated = requests.filter((req) => req.id !== id);
      setRequests(updated);
    }
  };

  return (
    <div className="dashboard-page">
      <h1>Orphanage / Old Age Home Dashboard</h1>
      <button className="donate-btn" onClick={handleLogout}>Logout</button>

      {/* --- Upload New Donation Request --- */}
      <div className="dashboard-section">
        <h2>Upload New Donation Request</h2>
        <form className="new-request-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Request Title"
            value={newRequest.title}
            onChange={handleChange}
          />
          <input
            type="text"
            name="organization"
            placeholder="Organization Name"
            value={newRequest.organization}
            onChange={handleChange}
          />
          <textarea
            name="description"
            placeholder="Description"
            value={newRequest.description}
            onChange={handleChange}
          />
          <input
            type="number"
            name="amount"
            placeholder="Amount Needed (₹)"
            value={newRequest.amount}
            onChange={handleChange}
          />
          <select
            name="type"
            value={newRequest.type}
            onChange={handleChange}
          >
            <option value="">Select Type</option>
            <option value="orphanage">Orphanage</option>
            <option value="oldage">Old Age Home</option>
          </select>
          <select
            name="location"
            value={newRequest.location}
            onChange={handleChange}
          >
            <option value="">Select Location</option>
            <option value="Chennai">Chennai</option>
            <option value="Madurai">Madurai</option>
            <option value="Coimbatore">Coimbatore</option>
            <option value="Trichy">Trichy</option>
            <option value="Salem">Salem</option>
          </select>
          <button type="submit">Submit Request</button>
        </form>
      </div>

      {/* --- Previous Requests --- */}
      <div className="dashboard-section">
        <h2>Previous Requests</h2>
        <div className="requests-list">
          {requests.map((req, index) => (
            <div key={index} className="request-card">
             <div className="request-header">
              <h3>{req.title}</h3>
               {/* 🗑 Delete button */}
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(req.id)}
                    title="Delete Request"
                  >
                    <FaTrash />
                  </button>
                </div>
              <p>{req.description}</p>
              <p>
                <strong>Amount:</strong> ₹{req.amount}
              </p>
              <p>
                Status:{" "}
                {req.status === "closed" ? (
                  <span className="status closed">
                    <FaCheckCircle /> Closed
                  </span>
                ) : (
                  <span className="status open">
                    <FaHourglassHalf /> Open
                  </span>
                )}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* --- Verification Documents --- */}
      <div className="dashboard-section">
        <h2>Verification Documents</h2>
        <div className="verification-section">
          <p>Organization Registration Certificate</p>
          <p>Address Proof</p>
          <p>Government Approval Letter</p>
          <button className="donate-btn">
            <FaUpload /> Upload More
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrphanageDashboard;
