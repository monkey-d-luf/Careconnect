import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import BrowserPage from './pages/BrowserPage';
import AmtPage from './pages/AmtPage';
import DonationSuccPage from './pages/DonationSuccPage';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardRouter from './pages/DashboardRouter';
import ContactUs from './pages/ContactUs';

export default function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/browse" 
        element={
          <ProtectedRoute>
            <BrowserPage />
          </ProtectedRoute>
        } />

        <Route path="/orphanage" 
        element={
          <DashboardRouter/>
        } />

        <Route path="/amount" 
        element={
          <ProtectedRoute>
            <AmtPage />
        </ProtectedRoute>
        } 
        />
        <Route path="/success" 
        element={
          <ProtectedRoute>
            <DonationSuccPage />
          </ProtectedRoute>
          } />
          <Route path="/contact" 
        element={
          <ProtectedRoute>
            <ContactUs />
          </ProtectedRoute>
          } />
      </Routes>
    </div>

  );
}
