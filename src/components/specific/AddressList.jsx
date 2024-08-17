import React from 'react';
import './AddressList.css';

const AddressList = ({ addresses, onAddressSelect, onAddAddress }) => {
  return (
    <div className="address-list">
      <h4>Select Address for Booking:</h4>
      {addresses.length > 0 ? (
        addresses.map((address) => (
          <div key={address.id} className="address-item">
            <input
              type="radio"
              name="address"
              value={address.id}
              id={`address-${address.id}`}
              className="form-check-input"
              onChange={() => onAddressSelect(address)}
            />
            <label className="form-check-label" htmlFor={`address-${address.id}`}>
              <div className="address-details">
                <p>{address.adrLine1}, {address.adrLine2 ? `${address.adrLine2}, ` : ''}{address.city}, {address.state}, {address.pincode}</p>
              </div>
            </label>
          </div>
        ))
      ) : (
        <p>No addresses found. Please add one in your profile.</p>
      )}
      <button
        className="btn btn-secondary mt-3"
        onClick={onAddAddress}
      >
        Add New Address
      </button>
    </div>
  );
};

export default AddressList;
