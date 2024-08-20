import axios from 'axios';

const BASE_URL = 'http://localhost:8080'; // Set the correct base URL


const registerUser = async (userData) => {
    try {
        const response = await axios.post(`${BASE_URL}/user/register_basic`, userData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

const loginUser = async (LOGIN_API_URL, email, password, roleEnum) => {
    try {
        const response = await axios.post(LOGIN_API_URL, { email, password, roleEnum });
        return response.data;
    } catch (error) {
       throw error;
    }
};

const activateUser = async (ACTIVATION_API_URL, email, password, roleEnum) => {
    try {
        const response = await axios.patch(ACTIVATION_API_URL, { email, password, roleEnum });
        return response.data;
    } catch (error) {
        throw(error);
    }
};

const fetchUserDetails = async (userId) => {
    try {
        const response = await axios.get(`${BASE_URL}/user/profile/${userId}`);
        return response.data;
    } catch (error) {
        throw(error);
    }
};

const fetchUserAddressDetails = async (token) => {
    try {
        const response = await axios.get(`${BASE_URL}/address/get_all`, {
            headers : {
                Authorization : `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw(error);
    }
};

const addUserAddress = async (userId) => {
    try {
        const response = await axios.post(`${BASE_URL}/address/{$userId}`);
        return response.data;
    } catch (error) {
        throw(error);
    }
};

const updateUserDetails = async (userId, updatedUser) => {
    try {
        const response = await axios.put(`${BASE_URL}/user/update/${userId}`, updatedUser);
        return response.data;
    } catch (error) {
        throw(error);
    }
};


const updateAddressDetails = async (userId, updatedAddress) => {
    try {
        const response = await axios.put(`${BASE_URL}/address/${userId}`, updatedAddress);
        return response.data;
    } catch (error) {
        throw(error);
    }
};

export default {
    registerUser, loginUser, activateUser, fetchUserDetails, fetchUserAddressDetails, addUserAddress, updateUserDetails, updateAddressDetails
};