import React, { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [donations, setDonations] = useState([]);
  const [requests, setRequests] = useState([]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalDonations: 0,
    totalAmount: 0,
    totalRequests: 0,
    recentDonations: [],
  });


//   useEffect(() => {
//     // Example: Fetch data from backend
//     const fetchData = async () => {
//       try {
//         const userRes = await axios.get("http://localhost:5000/api/admin/users");
//         const donationRes = await axios.get("http://localhost:5000/api/admin/donations");
//         const requestRes = await axios.get("http://localhost:5000/api/admin/requests");
//         setUsers(userRes.data);
//         setDonations(donationRes.data);
//         setRequests(requestRes.data);
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     fetchData();
//   }, []);
useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/admin/dashboard-summary");
        setStats(res.data);
      } catch (err) {
        console.error("Error fetching admin dashboard data:", err);
      }
    };
    fetchStats();
  }, []);

//   return (
//     <div className="admin-dashboard">
//       <h1>Welcome, Admin</h1>
//       <p>Manage users, donations, and requests from this dashboard.</p>

//       <div className="admin-stats">
//         <div className="stat-card">👥 Total Users: {users.length}</div>
//         <div className="stat-card">💸 Total Donations: {donations.length}</div>
//         <div className="stat-card">📦 Requests: {requests.length}</div>
//       </div>


//       <section className="admin-section">
//         <h2>All Users</h2>
//         <table className="admin-table">
//           <thead>
//             <tr>
//               <th>Name</th><th>Email</th><th>Role</th><th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {users.map((u, i) => (
//               <tr key={i}>
//                 <td>{u.name}</td>
//                 <td>{u.email}</td>
//                 <td>{u.role}</td>
//                 <td><button>Delete</button></td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </section>

//       <section className="admin-section">
//         <h2>All Donations</h2>
//         <table className="admin-table">
//           <thead>
//             <tr>
//               <th>Donor</th><th>Organization</th><th>Amount</th><th>Date</th>
//             </tr>
//           </thead>
//           <tbody>
//             {donations.map((d, i) => (
//               <tr key={i}>
//                 <td>{d.donor}</td>
//                 <td>{d.organization}</td>
//                 <td>₹{d.amount}</td>
//                 <td>{new Date(d.date).toLocaleDateString()}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </section>
//     </div>
//   );
  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>

      <div className="stats-grid">
        <div className="stat-card">Total Users: {stats.totalUsers}</div>
        <div className="stat-card">Total Donations: {stats.totalDonations}</div>
        <div className="stat-card">Total Amount Donated: ₹{stats.totalAmount}</div>
        <div className="stat-card">Total Requests: {stats.totalRequests}</div>
      </div>

      <h3>Recent Donations</h3>
      <table className="recent-donations">
        <thead>
          <tr>
            <th>Organization</th>
            <th>Donor</th>
            <th>Amount</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {stats.recentDonations.map((d, i) => (
            <tr key={i}>
              <td>{d.organization}</td>
              <td>{d.donorName}</td>
              <td>₹{d.amount}</td>
              <td>{new Date(d.date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
