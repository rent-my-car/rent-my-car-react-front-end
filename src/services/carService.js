import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

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
const fetchConfirmedCarListings = async (token) => {
  try {
    const response = await axios.get(API_URL2, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    return response.data; // Assuming the response is in the format of a list of confirmed car listings
  } catch (error) {
    if (error.response) {
      throw new Error('Error fetching confirmed car listings: ' + error.response.data.message);
    } else {
      throw new Error('Error: ' + error.message);
    }
  }
};

const API_URL4 = 'http://localhost:8080/car_listing/pending_approvals';
const fetchPendingCarListings = async (token) => {
  try {
    const response = await axios.get(API_URL4, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error('Error fetching pending car listings: ' + error.response.data.message);
    } else {
      throw new Error('Error: ' + error.message);
    }
  }
};

const URL = 'http://localhost:8080/car_listing';

const addCar = async (token, hostAddressId, carData) => {
  try {

    console.log(jwtDecode(token));
    console.log(hostAddressId);
    const response = await axios.post(URL, carData, {
      headers: {
        Authorization: `Bearer ${token}`,
        hostAddressId: hostAddressId
      }
    }
    );
    return response.data; // Return the response data
  } catch (error) {
    throw error; // Rethrow the error for handling in the component
  }
};

export default {
  fetchCarListings,
  fetchPendingCarListings,
  fetchConfirmedCarListings,
  addCar, fetchCarListingById
};
