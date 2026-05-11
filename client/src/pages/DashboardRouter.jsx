import React from "react";
import OrphanageDashboard from "./orphanageDashboard";
import DonorDashboard from "./DonorDashboard";
import AdminDashboard from "./AdminDashboard";


const DashboardRouter = () => {
  const role = localStorage.getItem("userRole");

  if (role === "Orphanage") {
    return <OrphanageDashboard />;
  } else if (role === "Donor") {
    return <DonorDashboard />;
  }  else if (role === "Admin") {
    return <AdminDashboard />;
  }else {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h2>Unauthorized Access</h2>
        <p>Please log in to access your dashboard.</p>
        <button onClick={() => (window.location.href = "/login")}>Go to Login</button>
      </div>
    );
  }
};

export default DashboardRouter;
