import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function NavBar() {
  const navigate = useNavigate();
  return (
    // <header style={{ padding: 16, borderBottom: '1px solid #eee', display:'flex', justifyContent:'space-between' }}>
    //   <div style={{display:'flex', gap:16, alignItems:'center'}}>
        
      <nav className="navbar">
        <div className="navbar-left">
          <h1>CareConnect</h1>
        </div>

        <div className="navbar-links">
          <a href="/">Home</a>
          <a href="/orphanage">Dashboard</a>
          <a href="/browse">Browse</a>
          <a href="/contact">Contact</a>
        </div>
 
        <div className="navbar-buttons">
          <button className="donate-btn" onClick={() => navigate('/amount')}>Donate</button>
          <button className="donate-btn" onClick={() => navigate('/login')}>Login/Signup</button> 
        </div>
      </nav>
    //   </div>
    // </header>
  );
}
