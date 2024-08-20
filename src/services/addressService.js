import axios from 'axios';

const API_URL = 'http://localhost:8080/address/cities';

const fetchCities = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data; // Return the city names
  } catch (error) {
    throw new Error('Failed to fetch cities'); // Throw an error if the request fails
  }
};

const fetchUserAddresses = async (token) => {
  try {
    const response = await axios.get(`http://localhost:8080/address/get_all`, {
      headers: {
        Authorization: `Bearer ${localStorage['token']}`,
      }
    });
    return response.data; // Return the array of addresses
  } catch (error) {
    if (error.response && error.response.status === 400) {
      throw new Error('Invalid user ID.'); // Handle specific error
    } else {
      throw new Error('Failed to fetch user addresses.');
    }
  }
};

const updateUserAddress = async (updatedAddress) => {
  try {
    console.log(updatedAddress);
    const response = await axios.put(`http://localhost:8080/address`, updatedAddress, {
      headers: {
        'addressId': updatedAddress.id // Custom header to send the addressId
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error updating user address:", error);
    throw new Error(error.response?.data?.message || "Failed to update address.");
  }
};

const deleteUserAddress = async (addressId) => {
  try {
    console.log(addressId);
    const response = await axios.patch(`http://localhost:8080/address/delete/${addressId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting user address:", error);
    throw new Error(error.response?.data?.message || "Failed to delete address.");
  }
};


const addUserAddress = async (token, newAddress) => {
  const API_URL = 'http://localhost:8080/address';
  try {
    const response = await axios.post(API_URL, newAddress, {
      headers: {
        Authorization: `Bearer ${localStorage['token']}`,
      }
    });
    return response.data; // Return the response data
  } catch (error) {
    throw error; // Rethrow the error for handling in the component
  }
};


export default {
  fetchUserAddresses, fetchCities, addUserAddress, updateUserAddress, deleteUserAddress
};