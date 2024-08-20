import React, { useEffect, useState } from 'react';
import './AddressList.css';
import { useAuth } from '../../context/AuthContext';
import addressService from '../../services/addressService';
import { toast } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported

const AddressList = ({ onAddressSelect }) => {
  const [addresses, setAddresses] = useState([]);
  const [addressLoading, setAddressLoading] = useState(false);
  const [addressError, setAddressError] = useState('');
  const { user, isLoggedIn } = useAuth();
  const [enableUpdateEdit, setEnableUpdateEdit] = useState(false);

  // State for modal
  const [showModal, setShowModal] = useState(false);
  const [currentAddress, setCurrentAddress] = useState(null); // For editing
  const [newAddress, setNewAddress] = useState({
    adrLine1: '',
    adrLine2: '',
    pincode: '',
    city: '',
    state: '',
    country: ''
  });

  // Handle address selection
  const handleAddressSelect = (address) => {
    setEnableUpdateEdit(true);
    onAddressSelect(address); // Update selected address
  };

  // Fetch user addresses
  useEffect(() => {
    const fetchUserAddresses = async () => {
      if (isLoggedIn) {
        setAddressLoading(true);
        setAddressError('');

        try {
          const response = await addressService.fetchUserAddresses(user.id);
          setAddresses(response);
        } catch (err) {
          setAddressError(err.message);
        } finally {
          setAddressLoading(false);
        }
      }
    };

    fetchUserAddresses();
  }, [isLoggedIn, user.id]);

  // Handle adding a new address
  const handleAddAddress = async () => {
    try {
      // Ensure the newAddress object has all required fields filled
      if (!newAddress.adrLine1 || !newAddress.pincode || !newAddress.city || !newAddress.state || !newAddress.country) {
        toast.error("Please fill in all the required fields.");
        return;
      }

      const response = await addressService.addUserAddress(user.id, newAddress);

      if (response && response.addressDto.id) {  // Assuming response contains the new address with an ID
        setAddresses([...addresses, response.addressDto]);
        toast.success("Address added successfully!");

        // Reset form
        setNewAddress({
          adrLine1: '',
          adrLine2: '',
          pincode: '',
          city: '',
          state: '',
          country: ''
        });

        setShowModal(false); // Close modal
      } else {
        toast.error("Failed to add address.");
      }
    } catch (error) {
      toast.error(error.message || "Failed to add address.");
    }
  };


  // Handle updating an address
  const handleUpdateAddress = async () => {
    try {
      const response = await addressService.updateUserAddress(newAddress);
      setAddresses(addresses.map(addr => (addr.id === currentAddress.id ? response : addr)));
      toast.success("Address updated successfully!");
      setShowModal(false); // Close modal
    } catch (error) {
      toast.error(error.message || "Failed to update address.");
    }
  };

  // Handle deleting an address
  const handleDeleteAddress = async (addressId) => {
    try {
      await addressService.deleteUserAddress(addressId);
      setAddresses(addresses.filter(addr => addr.id !== addressId));
      toast.success("Address deleted successfully!");
    } catch (error) {
      toast.error(error.message || "Failed to delete address.");
    }
  };

  // Handle input change for new address
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewAddress({ ...newAddress, [name]: value });
  };

  // Open modal for adding a new address
  const openAddModal = () => {
    setNewAddress({ adrLine1: '', adrLine2: '', pincode: '', city: '', state: '', country: '' }); // Reset form
    setShowModal(true);
  };

  // Open modal for editing an address
  const openEditModal = (address) => {
    setCurrentAddress(address);
    setNewAddress({
      id: address.id,
      adrLine1: address.adrLine1,
      adrLine2: address.adrLine2 || '',
      pincode: address.pincode,
      city: address.city,
      state: address.state,
      country: address.country
    });
    setShowModal(true);
  };

  return (
    <div className="address-list">
      {addresses.length > 0 ? (
        addresses.map((address) => (
          <div key={address.id} className="address-item">
            <input
              type="radio"
              name="address"
              value={address.id}
              id={`address-${address.id}`}
              className="form-check-input"
              onChange={() => handleAddressSelect(address)}
            />
            <label className="form-check-label" htmlFor={`address-${address.id}`}>
              <div className="address-details">
                <p>{address.adrLine1}, {address.adrLine2 ? `${address.adrLine2}, ` : ''},{address.pincode},{address.city}, {address.state}, {address.country}</p>
                <p>
                  <button className={`btn btn-success mx-2 ${enableUpdateEdit === false ? 'disabled' : ''}`} onClick={() => openEditModal(address)}>Edit</button>
                  <button className='btn btn-danger mx-2' onClick={() => handleDeleteAddress(address.id)}>Delete</button>
                </p>
              </div>
            </label>
          </div>
        ))
      ) : (
        <p>No addresses found. Please add one in your profile.</p>
      )}
      <div className="container">
        <div className="row">
          <div className="col-md-6 m-auto mb-2 "> {/* This div will be centered horizontally */}
            <button
              className="btn btn-secondary text-center"
              onClick={openAddModal}
            >
              Add New Address
            </button>
          </div>
        </div>
      </div>

      {/* Modal for Adding/Editing Address */}
      {showModal && (
        <div className="modal show" style={{ display: 'block' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{currentAddress ? "Edit Address" : "Add New Address"}</h5>
                <button type="button" className="close" onClick={() => setShowModal(false)}>
                  &times;
                </button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    name="adrLine1"
                    placeholder="Address Line 1"
                    value={newAddress.adrLine1}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    name="adrLine2"
                    placeholder="Address Line 2 (optional)"
                    value={newAddress.adrLine2}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    name="pincode"
                    placeholder="Pincode"
                    value={newAddress.pincode}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    name="city"
                    placeholder="City"
                    value={newAddress.city}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    name="state"
                    placeholder="State"
                    value={newAddress.state}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    name="country"
                    placeholder="Country"
                    value={newAddress.country}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-primary" onClick={currentAddress ? handleUpdateAddress : handleAddAddress}>
                  {currentAddress ? "Update Address" : "Add Address"}
                </button>
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddressList;