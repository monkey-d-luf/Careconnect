import React, { useState } from "react";
import "../App.css";
import { useNavigate ,useLocation } from "react-router-dom";
import axios from "axios";

const AmtPage = () => {
  const [selectedAmount, setSelectedAmount] = useState("");
  const [customAmount, setCustomAmount] = useState("");
  const navigate = useNavigate();

  const location = useLocation();
  const { organization, title } = location.state || {};

  const amounts = [500, 1000, 2000, 5000];

  const handleSelect = (amount) => {
    setSelectedAmount(amount);
    setCustomAmount("");
  };

  const handleCustomChange = (e) => {
    setCustomAmount(e.target.value);
    setSelectedAmount("");
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const finalAmount = selectedAmount || customAmount;

    if (!finalAmount) {
      alert("Please enter or select an amount!");
      return;
    }

    // TODO: integrate payment API or navigate to payment page
    try {
      // ✅ Send donation to backend
      await axios.post("http://localhost:5000/api/amount", {
        amount: finalAmount,
        donorId: localStorage.getItem("donorId") || "guest",
        organization: organization || "Unknown Organization",
        title: title || "General Donation",
      });
      const existingDonations =
        JSON.parse(localStorage.getItem("donations")) || [];

      const newDonation = {
        organization: organization || "Unknown Organization",
        title: title || "General Donation",
        amount: Number(finalAmount),
        date: new Date().toISOString(),
      };

      localStorage.setItem(
        "donations",
        JSON.stringify([...existingDonations, newDonation])
      );

      alert("🎉 Donation successful!");
      navigate("/success");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.msg || "❌ Donation failed!");
    }
  };

  return (
    <div className="amount-page">

      {/* Content */}
      <div className="amount-container">
        <h1 className="amount-title">Enter Donation Amount</h1>

        <div className="preset-amounts">
          {amounts.map((amt) => (
            <button
              key={amt}
              className={`amount-btn ${
                selectedAmount === amt ? "selected" : ""
              }`}
              onClick={() => handleSelect(amt)}
            >
              ₹{amt}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="amount-form">
          <input
            type="number"
            placeholder="Custom Amount"
            value={customAmount}
            onChange={handleCustomChange}
            className="custom-input"
          />
          <button type="submit" className="proceed-btn" 
          // onClick={() => (window.location.href = "/success")}
          >
            Proceed to Payment
          </button>
        </form>
      </div>
    </div>
  );
};

export default AmtPage;
