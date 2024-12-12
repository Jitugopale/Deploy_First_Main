import React from 'react';
import Logout from './Logout';  
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const styles = {
    container: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)', 
      gap: '20px',
      justifyContent: 'center',
      alignItems: 'center',
      width: '90%', 
      maxWidth: '700px',
      margin: 'auto', 
      backgroundColor: '#ffffff', 
      borderRadius: '15px', 
      padding: '30px',
    },
    wrapper: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh', 
    },
    card: {
      backgroundColor: '#ffffff',
      borderRadius: '15px',
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)', 
      padding: '20px',
      textAlign: 'center',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      cursor: 'pointer',
    },
    cardHover: {
      transform: 'scale(1.05)',
      boxShadow: '0 6px 15px rgba(0, 0, 0, 0.3)', 
    },
    button: {
      backgroundColor: 'transparent',
      border: 'none',
      outline: 'none',
      cursor: 'pointer',
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '10px',
    },
    icon: {
      width: '60px',
      height: '60px',
      backgroundColor: '#ffffff',
      borderRadius: '10px',
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
      padding: '10px',
    },
    label: {
      fontSize: '16px',
      fontWeight: 'bold',
      color: '#333',
    },
    description: {
      fontSize: '14px',
      color: '#555',
    },
    start: {
      position: 'absolute',
      top: '7px', 
      left: '3%',
      transform: 'translateX(-50%)', 
      zIndex: 10, 
    },
  };

  const buttonData = [
    {
      label: 'Aadhaar Verification',
      description: 'Verify your Aadhaar card details',
      icon: '/path-to-aadhaar-icon.png',
      onClick: () => navigate('/aadhaar-verification'),
    },
    {
      label: 'Passport Verification',
      description: 'Verify your passport details',
      icon: '/path-to-passport-icon.png',
      onClick: () => navigate('/passport-verification'),
    },
    {
      label: 'PAN Verification',
      description: 'Verify your PAN card details',
      icon: '../src/images/WIN_20240922_17_06_18_Pro.jpg',
      onClick: () => navigate('/pancard-verification'),
    },
    {
      label: 'GST Verification',
      description: 'Verify GST details',
      icon: '/path-to-gst-icon.png',
      onClick: () => navigate('/gst-verification'),
    },
    {
      label: 'Voter ID Verification',
      description: 'Verify your voter ID',
      icon: '/path-to-voter-icon.png',
      onClick: () => navigate('/voter-verification'),
    },
    {
      label: 'Udyan Aadhaar Verification',
      description: 'Verify your Udyan Aadhaar details',
      icon: '/path-to-udyan-icon.png',
      onClick: () => navigate('/udyan-verification'),
    },
    {
      label: 'PAN Link Aadhaar',
      description: 'Link your PAN card to Aadhaar',
      icon: '/path-to-panlink-icon.png',
      onClick: () => navigate('/panlink-verification'),
    },
  ];

  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100">
      <Logout style={styles.start} />
      <div className="row w-75 mx-auto">
        {buttonData.map((btn, index) => (
          <div
            key={index}
            className="col-12 col-sm-6 col-md-3 mb-4"
            style={styles.card}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = styles.cardHover.transform;
              e.currentTarget.style.boxShadow = styles.cardHover.boxShadow;
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'none';
              e.currentTarget.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.2)';
            }}
            onClick={btn.onClick}
          >
            <button style={styles.button}>
              <img src={btn.icon} alt={`${btn.label} Icon`} style={styles.icon} />
              <div style={styles.label}>{btn.label}</div>
              <div style={styles.description}>{btn.description}</div>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
