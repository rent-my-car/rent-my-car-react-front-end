import axios from 'axios';

const BASE_URL = 'http://localhost:8080'; // Set the correct base URL

const userService = {
    registerUser: async (userData) => {
        try {
            const response = await axios.post(`${BASE_URL}/user/register_basic`, userData);
            return response.data;
        } catch (error) {
            handleError(error);
        }
    },

    loginUser: async (LOGIN_API_URL, email, password, roleEnum) => {
        try {
            const response = await axios.post(LOGIN_API_URL, { email, password, roleEnum });
            return response.data;
        } catch (error) {
            handleError(error);
        }
    },

    activateUser: async (ACTIVATION_API_URL, email, password, roleEnum) => {
        try {
            const response = await axios.patch(ACTIVATION_API_URL, { email, password, roleEnum });
            return response.data;
        } catch (error) {
            handleError(error);
        }
    },

    fetchUserDetails: async (userId) => {
        try {
            const response = await axios.get(`${BASE_URL}/user/profile/${userId}`);
            return response.data;
        } catch (error) {
            handleError(error);
        }
    },

    fetchUserAddressDetails: async (userId) => {
        try {
            const response = await axios.get(`${BASE_URL}/address/get_all/${userId}`);
            return response.data;
        } catch (error) {
            handleError(error);
        }
    },

    /*updateUserDetails: async (userId, updatedUser) => {
        try {
            const response = await axios.put(`${BASE_URL}/user/update/${userId}`, updatedUser);
            return response.data;
        } catch (error) {
            handleError(error);
        }
    },*/

    updateAddressDetails: async (userId, updatedAddress) => {
        try {
            const response = await axios.put(`${BASE_URL}/address/${userId}`, updatedAddress);
            return response.data;
        } catch (error) {
            handleError(error);
        }
    }
};



// Error handling function
const handleError = (error) => {
    if (error.response) {
        console.error('Error response:', error.response.data);
        alert(error.response.data.message || 'An error occurred. Please try again.');
    } else if (error.request) {
        console.error('Error request:', error.request);
        alert('No response received from the server. Please try again later.');
    } else {
        console.error('Error message:', error.message);
        alert('An unexpected error occurred. Please try again.');
    }
};

export default userService;
