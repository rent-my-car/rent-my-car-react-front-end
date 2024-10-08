import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import userService from "../../services/userService";
import { toast } from 'react-toastify';

const UserProfileForm = () => {
    const { user } = useAuth(); // Get the user from the authentication context
    const [isEditing, setIsEditing] = useState(false); // State to track if the form is in editing mode
    const [userDetails, setUserDetails] = useState(null); // State to hold user details

    const userId = user?.id; // Use optional chaining to avoid errors if user is null

    console.log("User ID:", userId); // Debugging: Check if userId is available

    useEffect(() => {
        const fetchUserDetails = async () => {
            if (!userId) return; // Exit if userId is not available
            try {
                console.log("Fetching user details for ID:", userId);
                const data = await userService.fetchUserDetails(userId); // Fetch user details
                console.log("Fetched User Details:", data); // Debugging: Check fetched data
                setUserDetails(data); // Set the fetched user details
            } catch (err) {
                toast.error(err.message || "Failed to fetch user details."); // Show error message
            }
        };

        fetchUserDetails(); // Call the function to fetch user details
    }, [userId]); // Dependency on userId

    if (!userDetails) {
        return <p>Loading...</p>; // Show loading state
    }

    const handleUpdateUser = async (updatedUser) => {
        try {
            console.log("Updating user details for ID:", userId);
            const response = await userService.updateUserDetails(userId, updatedUser); // Update user details
            setUserDetails(response); // Update state with the new user details
            toast.success("User details updated successfully!"); // Show success message
        } catch (error) {
            toast.error(error.message || "Failed to update user details."); // Show error message
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target; // Get the name and value of the input
        setUserDetails({ ...userDetails, [name]: value }); // Update userDetails state
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission
        handleUpdateUser(userDetails); // Call the update function
        setIsEditing(false); // Exit editing mode after updating
    };

    return (
        <div className="container mt-2">
            <h2 className="text-center">User Profile</h2>
          
                <div className="mb-3 row">
                    <label htmlFor="firstName" className="col-sm-2 col-form-label">First Name</label>
                    <div className="col-sm-4">
                        <input
                            type="text"
                            className="form-control"
                            id="firstName"
                            name="firstName"
                            value={userDetails.firstName} // Accessing userDetails
                            onChange={handleChange}
                            readOnly={!isEditing} // Make input read-only if not editing
                        />
                    </div>
                    <label htmlFor="lastName" className="col-sm-2 col-form-label">Last Name</label>
                    <div className="col-sm-4">
                        <input
                            type="text"
                            className="form-control"
                            id="lastName"
                            name="lastName"
                            value={userDetails.lastName} // Accessing userDetails
                            onChange={handleChange}
                            readOnly={!isEditing} // Make input read-only if not editing
                        />
                    </div>
                </div>
                <div className="mb-3 row">
                    <label htmlFor="email" className="col-sm-2 col-form-label">Email</label>
                    <div className="col-sm-10">
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            value={userDetails.email} // Accessing userDetails
                            onChange={handleChange}
                            readOnly={!isEditing} // Make input read-only if not editing
                        />
                    </div>
                </div>
                <div className="mb-3 row">
                    <label htmlFor="mobile" className="col-sm-2 col-form-label">Mobile</label>
                    <div className="col-sm-10">
                        <input
                            type="tel"
                            className="form-control"
                            id="mobile"
                            name="mobile"
                            value={userDetails.mobile} // Accessing userDetails
                            onChange={handleChange}
                            readOnly={!isEditing} // Make input read-only if not editing
                        />
                    </div>
                </div>
                <div className="mb-3 row">
                    <label htmlFor="password" className="col-sm-2 col-form-label">Password</label>
                    <div className="col-sm-10">
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            name="password"
                            value={userDetails.password} // Accessing userDetails
                            onChange={handleChange}
                            readOnly={!isEditing} // Make input read-only if not editing
                        />
                    </div>
                </div>
                <div className="text-center">
                    {isEditing ? (
                        <>
                            <button type="button" className="btn btn-primary" onClick={handleSubmit}>Update</button>
                            <button
                                type="button"
                                className="btn btn-secondary ms-2"
                                onClick={() => setIsEditing(false)} // Cancel editing
                            >
                                Cancel
                            </button>
                        </>
                    ) : (
                        <button
                            type="button"  // Changed this line
                            className="btn btn-primary"
                            onClick={() => setIsEditing(true)} // Start editing
                        >
                            Edit
                        </button>
                    )}
                </div>
        </div>
    );
};

export default UserProfileForm;