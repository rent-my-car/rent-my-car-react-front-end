import React from 'react';

const CarAddress = ({ address }) => {
  return (
    <div className="card mb-4">
      <div className="card-body">
        <h5 className="card-title">Car Address</h5>
        <p>{`${address.adrLine1}, ${address.city}, ${address.state}, ${address.country}`}</p>
        <p>{`Pincode: ${address.pincode}`}</p>
      </div>
    </div>
  );
};

export default CarAddress;