import React from 'react';

const PricingDetails = ({ pricing }) => {
  return (
    <div className="card mb-4">
      <div className="card-body">
        <h5 className="card-title">Pricing Details</h5>
        <p>{`Price per Hour: ₹ ${pricing.pricePerHr}`}</p>
        <p>{`Price per Day: ₹ ${pricing.pricePerDay}`}</p>
        <p>{`Security Deposit: ₹ ${pricing.securityDeposit}`}</p>
      </div>
    </div>
  );
};

export default PricingDetails;