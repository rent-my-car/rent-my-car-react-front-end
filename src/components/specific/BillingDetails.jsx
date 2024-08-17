import React from 'react';

const BillingDetails = ({ tripAmount, securityDeposit, finalAmount }) => {
  return (
    <div className="card mb-4" style={{ minHeight: '200px' }}> {/* Adjust the height as needed */}
      <div className="card-body">
        <h5 className="card-title">Billing Details</h5>
        <p>{`Trip Amount: ₹ ${tripAmount}`}</p>
        <p>{`Convenience Fee: ₹ ${securityDeposit}`}</p>
        <h6>{`Final Amount: ₹ ${finalAmount}`}</h6>
      </div>
    </div>
  );
};

export default BillingDetails;