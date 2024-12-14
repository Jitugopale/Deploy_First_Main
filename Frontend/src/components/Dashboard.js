import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css'; // You can use this for custom styles
import ApiVerification from './ApiVerification'; // Import the new component
import UserProfile from './UserProfile'; // Import your UserProfile component


const Dashboard = () => {
  const navigate = useNavigate();
  const [view, setView] = useState('dashboard'); // 'dashboard' as the default view
  const [activeMenu, setActiveMenu] = useState('dashboard'); // Track active menu item
  
  // Initial count for each verification item
  const [verificationCounts, setVerificationCounts] = useState({
    pancard: 0,
    aadhar: 0,
    udyancard: 0,
    pandetail: 0,
    voter: 0,
    passport: 0,
    credit: 0,
    gst: 0
  });

  // Function to update the count when verification is done
  const updateVerificationCount = (item) => {
    setVerificationCounts((prevCounts) => ({
      ...prevCounts,
      [item]: prevCounts[item] + 1, // Increase count by 1 for the respective verification item
    }));
  };

  const renderMainContent = () => {
    if (view === 'dashboard') {
      return (
        <div className="dashboard-view">
          <div className="d-flex align-items-center justify-content-between p-3 bg-white shadow rounded">
            <div>
              <h4>Hi, WALMIK DARADE</h4>
              <p className="text-muted">Cheers, and happy activities.</p>
              <p className="font-weight-bold">Wallet Balance: <span>Rs. 47445.56</span></p>
              <button className="btn btn-warning">Add Credit</button>
            </div>
            <div>
              <p>PAN Verification</p>
              <h2 className="text-center">1</h2>
            </div>
          </div>

          {/* Cards Section - Display the verification counts */}
          <div className="card-container d-flex justify-content-start mt-4">
            {Object.keys(verificationCounts).map((key) => (
              <div className="card" key={key}>
                <h6>{key.charAt(0).toUpperCase() + key.slice(1)}</h6>
                <div className="card-count">{verificationCounts[key]}</div>
                <button className="btn btn-primary mt-2" onClick={() => updateVerificationCount(key)}>
                  Verify
                </button>
              </div>
            ))}
          </div>
          
          <div className="mt-4">
            <h5>Average API Hit</h5>
            <div className="bg-light rounded p-4 shadow">
              <p>Chart placeholder</p>
            </div>
          </div>
          <div className="mt-4">
            <h5>Most Utilized API's</h5>
            <div className="bg-light rounded p-4 shadow">
              <p>Chart placeholder</p>
            </div>
          </div>
        </div>
      );
    } else if (view === 'apiVerification') {
      return <ApiVerification />; // Render API Verification component
    }
    return <p>Unknown view!</p>;
  };

  const handleMenuClick = (menu) => {
    setView(menu);
    setActiveMenu(menu); // Update active menu state when clicked
  };

  return (
    <div className="d-flex vh-100">
      {/* Sidebar */}
      <aside className="bg-danger text-white p-3">
      <div className="text-center mb-4">
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', font:"bold", famliy:"Monotype Corsiva"  }}>AVS Verify</h1>
        <h3 style={{ fontSize: '1.2rem', fontWeight: 'normal', color: 'blue' }}>
          On Boarding Solution
        </h3>
      </div>

        <ul className="list-unstyled">
          <li className="mb-2">
            <button
              className={`btn ${activeMenu === 'dashboard' ? 'active' : ''}`}
              onClick={() => handleMenuClick('dashboard')}
            >
              Dashboard
            </button>
          </li>
          <li className="mb-2">
            <button
              className={`btn ${activeMenu === 'apiVerification' ? 'active' : ''}`}
              onClick={() => handleMenuClick('apiVerification')}
            >
              API Verification
            </button>
          </li>
          <li className="mb-2">
            <button className="btn">Reports</button>
          </li>
          <li className="mb-2">
            <button className="btn">My Services</button>
          </li>
          <li className="mb-2">
            <button className="btn">Settings</button>
          </li>
          <li className="mb-2">
            <button className="btn">Funding</button>
          </li>
          <li className="mb-2">
            <button className="btn">Onboarding Suit</button>
          </li>
          <li>
            <button className="btn">Complaint</button>
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      {/* Main Content */}
      <main className="flex-grow-1 bg-light p-4">
        <header className="d-flex justify-content-end mb-4">
          {/* Replace the img with UserProfile */}
          <UserProfile />
        </header>
        {renderMainContent()}
      </main>
    </div>
  );
};

export default Dashboard;
