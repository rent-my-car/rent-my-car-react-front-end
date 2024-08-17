import axios from 'axios';
import { toast } from 'react-toastify';


const createBooking = async (URL, bookingData) => {
    try {
        const response = await axios.post(
            URL,
            bookingData
        );
        return response.data;
    } catch (error) {
        if (error.response) {
            const statusCode = error.response.status;
            const errorMessage = error.response.data.message || 'An unexpected error occurred';

            switch (statusCode) {
                case 400:
                    if (errorMessage.includes("Pickup Date is invalid")) {
                        toast.error("Invalid pickup date. Please check your dates.");
                    } else if (errorMessage.includes("Guest Not Found")) {
                        toast.error("Guest not found. Please ensure you are logged in.");
                    } else if (errorMessage.includes("Address not found")) {
                        toast.error("Address not found. Please select a valid address.");
                    } else if (errorMessage.includes("Car Listing not found")) {
                        toast.error("Car listing not found. Please select a valid car.");
                    } else {
                        toast.error(errorMessage);
                    }
                    break;
                default:
                    toast.error("An unexpected error occurred. Please try again later.");
                    break;
            }
        } else if (error.request) {
            toast.error("No response from the server. Please check your network connection.");
        } else {
            toast.error("Error in setting up the request. Please try again.");
        }
        return Promise.reject(error);
    }
};


export const fetchBookings = async (URL) => {
  try {
    const response = await axios.get(URL);
    return response.data; // Return the car listings data

  } catch (error) {
    console.log(error);
    console.error(error.response.data.message);
    throw new Error(error.response.data.message);
  }
};



export default {
  fetchBookings,createBooking,
};


