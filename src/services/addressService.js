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

const fetchUserAddresses = async (userId) => {
  try {
    const response = await axios.get(`http://localhost:8080/address/get_all/${userId}`);
    return response.data; // Return the array of addresses
  } catch (error) {
    if (error.response && error.response.status === 400) {
      throw new Error('Invalid user ID.'); // Handle specific error
    } else {
      throw new Error('Failed to fetch user addresses.');
    }
  }
};

export default {
  fetchUserAddresses,fetchCities,
};