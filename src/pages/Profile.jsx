import React, { useEffect, useState } from "react";
import AddressDetailsTable from "../components/specific/AddressDetailsTable";
import UserProfileForm from "../components/specific/UserProfileForm";
import userService from "../services/userService";
import { toast } from 'react-toastify';

const Profile = () => {
    const userId = localStorage.getItem("userId"); 
    const addressId = localStorage.getItem("addressId");
    const [userDetails, setUserDetails] = useState(null);
    const [addresses, setAddresses] = useState([]);

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const data = await userService.fetchUserDetails(userId); // Ensure this API call is correct
                setUserDetails(data);
                //toast.success("User details fetched successfully!");
            } catch (err) {
                toast.error(err.message || "Failed to fetch user details."); // Enhanced error handling
            }
        };

        const fetchUserAddresses = async () => {
            try {
                const userAddresses = await userService.fetchUserAddressDetails(userId);
                setAddresses(userAddresses);
            } catch (err) {
                toast.error(err.message || "Failed to fetch addresses."); // Enhanced error handling
            }
        };

        if (userId) { // Only fetch if userId is available
            fetchUserDetails();
            fetchUserAddresses();
        }
    }, [userId]);

    const handleUpdateUser = async (updatedUser) => {
        try {
            const response = await userService.updateUserDetails(userId, updatedUser); // Ensure this API call is correct
            setUserDetails(response);
            //toast.success("User details updated successfully!");
        } catch (error) {
            toast.error(error.message || "Failed to update user details.");
        }
    };

    const handleUpdateAddress = async (updatedAddress) => {
        try {
          const response = await userService.updateAddressDetails(updatedAddress.id, updatedAddress);
          setAddresses((prev) => prev.map(addr => addr.id === updatedAddress.id ? response : addr));
        } catch (error) {
          setAddresses((prev) => prev.map(addr => addr.id === updatedAddress.id ? updatedAddress : addr));
          toast.error(error.message || "Failed to update address.");
        }
      };
    

    const handleDeleteAddress = (addressId) => {
        setAddresses((prev) => prev.filter(addr => addr.id !== addressId));
        toast.success("Address deleted successfully!");
    };

    return (
        <div>
            {userDetails && <UserProfileForm user={userDetails} onUpdate={handleUpdateUser} />}
            <AddressDetailsTable 
                addresses={addresses} 
                onUpdate={handleUpdateAddress} 
                onDelete={handleDeleteAddress} 
            />
        </div>
    );
};

export default Profile;
