import React, { useState } from 'react';
import axios from 'axios';

const Pan = () => {
  const [panNumber, setPanNumber] = useState('');
  const [verificationResult, setVerificationResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    setError(null); // Reset any errors
    setSuccessMessage(''); // Reset success message

    try {
      // Make an API call
      const response = await axios.post('http://localhost:5000/api/pan/verifyPanCard', {
        pannumber: panNumber,
      });

      // Handle successful verification
      setVerificationResult(response.data.verifiedData);
      setSuccessMessage('PAN Card verified successfully!');
    } catch (error) {
      // Handle errors
      console.error('Error verifying PAN card:', error);
      setError(
        error.response?.data?.message || 'Something went wrong while verifying the PAN card.'
      );
      setVerificationResult(null);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card p-4 shadow-sm" style={{ width: '100%', maxWidth: '500px' }}>
        <h2 className="text-center mb-4">PAN Verification</h2>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="panNumber" className="form-label">
              PAN Number
            </label>
            <input
              id="panNumber"
              type="text"
              value={panNumber}
              onChange={(e) => setPanNumber(e.target.value)}
              className="form-control"
              placeholder="Enter PAN Number"
              required
            />
          </div>
          <button type="submit" className="btn btn-warning w-100" disabled={loading}>
            {loading ? 'Verifying...' : 'Submit'}
          </button>
        </form>

        {/* Loading Indicator */}
        {loading && <p className="text-center mt-3">Loading...</p>}

        {/* Success Message */}
        {successMessage && (
          <div className="alert alert-success mt-3 text-center" role="alert">
            {successMessage}
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="alert alert-danger mt-3 text-center" role="alert">
            {error}
          </div>
        )}

        {/* Verification Result */}
        {verificationResult && (
          <div className="mt-4">
            <h3 className="text-success text-center">Verification Result</h3>
            <p className="text-center">Name: {verificationResult.full_name}</p>
            <p className="text-center">PAN Number: {verificationResult.pan_number}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Pan;
