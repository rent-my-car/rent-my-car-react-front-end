import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './PaymentSuccessPage.css'; // Assuming you have a separate CSS file for styling

const PaymentSuccessPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { paymentResponse } = location.state || {};

  if (!paymentResponse) {
    return <div>Error: No payment details available.</div>;
  }

  const handleOkClick = () => {
    // Navigate to another page or perform other actions as needed
    navigate('/upcoming-booking'); // Example: Navigate to the home page
  };

  return (
    <div className="confirmation-container">
      <div className="confirmation-item">
        <label>Status</label>
        <div className="confirmation-value">{paymentResponse.bookingStatusEnum}</div>
      </div>
      <div className="confirmation-item">
        <label>Transaction Time</label>
        <div className="confirmation-value">{new Date(paymentResponse.paymentDateTime).toLocaleString()}</div>
      </div>
      <div className="confirmation-item">
        <label>Transaction Id</label>
        <div className="confirmation-value">{paymentResponse.transactionId}</div>
      </div>
      <div className="confirmation-item">
        <label>Amount</label>
        <div className="confirmation-value">${paymentResponse.amount.toFixed(2)}</div>
      </div>
      <button className="confirmation-button" onClick={handleOkClick}>
        OK
      </button>
    </div>
  );
};

export default PaymentSuccessPage;