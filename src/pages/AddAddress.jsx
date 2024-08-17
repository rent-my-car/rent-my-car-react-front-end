import React, { useState } from 'react';

const AddAddressPage = () => {
  const [address, setAddress] = useState({
    adrLine1: '',
    adrLine2: '',
    pincode: '',
    city: '',
    state: '',
    country: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress({ ...address, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to handle address submission
    console.log('Address submitted:', address);
  };

  const handleCancel = () => {
    // Logic to handle cancel action
    console.log('Address addition canceled');
  };

  return (
    <div className="container text-center my-4">
      <h2>Add New Address</h2>
      <form onSubmit={handleSubmit} className="my-4">
        <div className="mb-3">
          <input
            type="text"
            name="adrLine1"
            placeholder="Flat no, house no, building, company, apartment *"
            value={address.adrLine1}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            name="adrLine2"
            placeholder="Area, street, sector, village"
            value={address.adrLine2}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="row mb-3">
          <div className="col">
            <input
              type="text"
              name="pincode"
              placeholder="Pin Code"
              value={address.pincode}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="col">
            <input
              type="text"
              name="city"
              placeholder="City"
              value={address.city}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="col">
            <input
              type="text"
              name="state"
              placeholder="State"
              value={address.state}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="col">
            <input
              type="text"
              name="country"
              placeholder="Country"
              value={address.country}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
        </div>
        <button type="submit" className="btn btn-primary me-2">
          Submit
        </button>
        <button type="button" className="btn btn-secondary" onClick={handleCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default AddAddressPage;