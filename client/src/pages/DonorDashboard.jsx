import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import "../App.css"; // for styling

const DonorDashboard = () => {
  const [donations, setDonations] = useState([]);
  const [userName, setUserName] = useState("User");

  // ✅ Load user info & donation history
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user")) || {};
    const storedDonations = JSON.parse(localStorage.getItem("donations")) || [];

    setUserName(storedUser.name || "User");
    setDonations(storedDonations);
  }, []);
    const handleLogout = () => {
    // Remove authentication data
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userName");
    localStorage.removeItem("donorId"); // if you use this

    alert("You have been logged out!");
    navigate("/login");
  };

  // ✅ Calculate donations by day for the current month
  const currentMonth = new Date().getMonth();
  const currentMonthDonations = donations.filter((d) => {
    const donationDate = new Date(d.date);
    return donationDate.getMonth() === currentMonth;
  });

  const dailyData = Array.from({ length: 30 }, (_, i) => ({
    day: i + 1,
    amount: currentMonthDonations
      .filter((d) => new Date(d.date).getDate() === i + 1)
      .reduce((sum, d) => sum + d.amount, 0),
  }));

  return (
    <div className="dashboard-container">
      {/* Greeting */}
      <h2 className="dashboard-greeting">Hi, {userName} 👋</h2>
      <button className="donate-btn" onClick={handleLogout}>Logout</button>
      <p className="dashboard-subtext">Here’s your donation summary for this month</p>

      {/* Graph Section */}
      <div className="dashboard-graph">
        <h3>Monthly Donations Overview</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={dailyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" label={{ value: "Day", position: "insideBottom", offset: -5 }} />
            <YAxis label={{ value: "Amount (₹)", angle: -90, position: "insideLeft" }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="amount" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Donation History Section */}
      <div className="dashboard-history">
        <h3>Your Donation History</h3>

        {donations.length > 0 ? (
          <table className="donation-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Organization</th>
                <th>Title</th>
                <th>Amount (₹)</th>
              </tr>
            </thead>
            <tbody>
              {donations.map((don, index) => (
                <tr key={index}>
                  <td>{new Date(don.date).toLocaleDateString()}</td>
                  <td>{don.organization}</td>
                  <td>{don.title}</td>
                  <td>₹{don.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="no-history">You haven't made any donations yet.</p>
        )}
      </div>
    </div>
  );
};

export default DonorDashboard;
