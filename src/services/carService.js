import axios from 'axios';

const API_URL1 = 'http://localhost:8080/car_listing/get_cars_by_city';

const fetchCarListings = async (pickupDate, dropoffDate, city) => {
  try {
    const response = await axios.get(API_URL1, {
      params: {
        pickupDateTime: pickupDate,
        dropOffDateTime: dropoffDate,
        city: city,
      },
    });
    return response.data; // Return the car listings data
  } catch (error) {
    console.log(error);
    console.error(error.response.data.message);
    throw new Error(error.response.data.message);
  }
};

const fetchCarListingById = async (carListingId) => {
  const API_URL = 'http://localhost:8080/car_listing';
  try {
      const response = await axios.get(`${API_URL}/${carListingId}`);
      return response.data; // Return the car listings data
  } catch (error) {
      console.log(error);
      console.error(error.response.data.message);
      throw new Error(error.response.data.message);
  }
};

const API_URL2 = 'http://localhost:8080/car_listing/confirmed_approvals';
const fetchConfirmedCarListings = async (userId) => {
  try {
    const response = await axios.get(`${API_URL2}/${userId}`);
    return response.data; // Assuming the response is in the format of a list of confirmed car listings
  } catch (error) {
    if (error.response) {
      throw new Error('Error fetching confirmed car listings: ' + error.response.data.message);
    } else {
      throw new Error('Error: ' + error.message);
    }
  }
};


const API_URL3 = 'http://localhost:8080/car_listing';

const addCar = async (hostId, hostAddressId, carData) => {
  try {
    console.log(hostId);
    console.log(hostAddressId);
    const response = await axios.post(`${API_URL3}/${hostId}/${hostAddressId}`, carData);
    return response.data; // Return the response data
  } catch (error) {
    throw error; // Rethrow the error for handling in the component
  }
};

export default {
  fetchCarListings,
  fetchConfirmedCarListings,
  addCar,fetchCarListingById
};
