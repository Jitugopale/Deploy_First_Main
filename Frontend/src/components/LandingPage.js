import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="container d-flex flex-column justify-content-center align-items-center min-vh-100" role="main">
      <div className="card p-4 shadow-sm" style={{ maxWidth: '500px', width: '100%' }}>
        <h1 className="heading-landing mb-4 text-center">Welcome to TrueVerify</h1>
        <p className="text-center mb-4">Securely verify various documents online with ease and reliability</p>
        <div className="d-flex justify-content-center mt-4">
          <Link 
            to="/login" 
            className="btn btn-primary mx-2" 
            aria-label="Login to your account">
            Login
          </Link>
          <Link 
            to="/register" 
            className="btn btn-secondary mx-2" 
            aria-label="Create a new account">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
