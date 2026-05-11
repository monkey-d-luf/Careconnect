import React, { useState } from "react";
import "../App.css";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import childrenImg from "../assets/images/childrenImg.png";
import elderlyImg from "../assets/images/elderlyImg.png";
import youthCenterImg from "../assets/images/youthCenterImg.png";
import educationImg from "../assets/images/educationImg.png";
import medicalImg from "../assets/images/medicalImg.png";


const BrowsePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [amountFilter, setAmountFilter] = useState("");
  const navigate = useNavigate();
  const savedRequests = JSON.parse(localStorage.getItem("donationRequests")) || [];
  const donationRequests = [
    ...[
    {
      title: "Support the Children's Haven",
      organization: "Hope Children’s Orphanage",
      description:
        "Help us provide educational materials and recreational activities for the children at our orphanage.",
      image: childrenImg,
      location: "Chennai",
      type: "orphanage",
      amountNeeded: 15000,
    },
    {
      title: "Elderly Care Home Assistance",
      organization: "Golden Age Old Age Home",
      description:
        "Your donation will help us provide better care and medical assistance for the elderly residents.",
      image: elderlyImg,
      location: "Madurai",
      type: "oldage",
      amountNeeded: 30000,
    },
    {
      title: "Renovation for the Youth Center",
      organization: "Bright Futures Youth Center",
      description:
        "We need funds to renovate our youth center to create a more comfortable and safe environment for the children.",
      image: youthCenterImg,
      location: "Coimbatore",
      type: "orphanage",
      amountNeeded: 80000,
    },
    {
      title: "Educational Support for Orphans",
      organization: "Sunrise Orphanage",
      description:
        "Help us provide scholarships and educational resources for orphans to pursue their dreams.",
      image: educationImg,
      location: "Trichy",
      type: "orphanage",
      amountNeeded: 20000,
    },
    {
      title: "Medical Supplies for Senior Citizens",
      organization: "Silver Care Home",
      description:
        "Your donation will help us purchase essential medical supplies and equipment for the elderly residents.",
      image: medicalImg,
      location: "Salem",
      type: "oldage",
      amountNeeded: 120000,
    },
    ],
    ...savedRequests,
  ];

  // ✅ Filter logic
  const filteredRequests = donationRequests.filter((req) => {
    const matchesSearch =
      req.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.organization.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesLocation = locationFilter
      ? req.location.toLowerCase() === locationFilter.toLowerCase()
      : true;

    const matchesType = typeFilter
      ? req.type.toLowerCase() === typeFilter.toLowerCase()
      : true;

    const matchesAmount =
      !amountFilter ||
      (amountFilter === "0-10000" && req.amountNeeded <= 10000) ||
      (amountFilter === "10000-20000" &&
        req.amountNeeded > 10000 &&
        req.amountNeeded <= 20000) ||
      (amountFilter === "20000-50000" &&
        req.amountNeeded > 20000 &&
        req.amountNeeded <= 50000) ||
      (amountFilter === "50000-100000" &&
        req.amountNeeded > 50000 &&
        req.amountNeeded <= 100000) ||
      (amountFilter === ">100000" && req.amountNeeded > 100000);

    return matchesSearch && matchesLocation && matchesType && matchesAmount;
  });

  return (
    <div className="browse-page">
      {/* Page Header */}
      <div className="browse-header">
        <h1>Browse Donation Requests</h1>
        <p>
          Support orphanages and old age homes by donating to their specific needs.
        </p>
      </div>

      {/* Filters */}
      <div className="filters">
        <select onChange={(e) => setLocationFilter(e.target.value)}>
          <option value="">Location</option>
          <option value="chennai">Chennai</option>
          <option value="madurai">Madurai</option>
          <option value="coimbatore">Coimbatore</option>
          <option value="trichy">Trichy</option>
          <option value="salem">Salem</option>
          <option value="tirunelveli">Tirunelveli</option>
        </select>

        <select onChange={(e) => setTypeFilter(e.target.value)}>
          <option value="">Type</option>
          <option value="orphanage">Orphanage</option>
          <option value="oldage">Old-Age Homes</option>
        </select>

        <select onChange={(e) => setAmountFilter(e.target.value)}>
          <option value="">Amount Needed</option>
          <option value="0-10000">₹0 – ₹10,000</option>
          <option value="10000-20000">₹10,000 – ₹20,000</option>
          <option value="20000-50000">₹20,000 – ₹50,000</option>
          <option value="50000-100000">₹50,000 – ₹1,00,000</option>
          <option value=">100000">₹1,00,000+</option>
        </select>

        <input
          type="text"
          placeholder="Search"
          className="search-box"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Donation Cards */}
      <div className="donation-list">
        {filteredRequests.length > 0 ? (
          filteredRequests.map((req, index) => (
            <div className="donation-card" key={index}>
              <div className="donation-info">
                <h3>{req.title}</h3>
                <div className="donation-org">
                  <FaMapMarkerAlt className="org-icon" />
                  <span>{req.organization}</span>
                </div>
                <p>{req.description}</p>
                <button
                  className="donate-card-btn"
                  onClick={() =>
                navigate("/amount", {
                  state: {
                    organization: req.organization,
                    title: req.title,
                  },
                })
              }
                >
                  Donate
                </button>
              </div>
              <img src={req.image} alt={req.title} className="donation-image" />
            </div>
          ))
        ) : (
          <p className="no-results">No matching donation requests found.</p>
        )}
      </div>
    </div>
  );
};

export default BrowsePage;
