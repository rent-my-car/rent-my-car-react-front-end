import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import userService from "../../services/userService";
import { toast } from 'react-toastify';

const UserProfileForm = () => {
    const { user } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [userDetails, setUserDetails] = useState(null);
    const userId = user?.id; // Use optional chaining

    console.log("User ID:", userId);

    useEffect(() => {
        const fetchUserDetails = async () => {
            if (!userId) return; // Exit if userId is not available
            try {
                console.log("Fetching user details for ID:", userId);
                const data = await userService.fetchUserDetails(userId);
                console.log("Fetched User Details:", data);
                setUserDetails(data);
            } catch (err) {
                toast.error(err.message || "Failed to fetch user details.");
            }
        };

        fetchUserDetails();
    }, [userId]); // Dependency on userId

    if (!userDetails) {
        return <p>Loading...</p>; // Loading state
    }

    const handleUpdateUser = async (updatedUser) => {
        try {
            console.log("Updating user details for ID:", userId);
            const response = await userService.updateUserDetails(userId, updatedUser);
            setUserDetails(response);
            toast.success("User details updated successfully!");
        } catch (error) {
            toast.error(error.message || "Failed to update user details.");
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserDetails({ ...userDetails, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleUpdateUser(userDetails);
        setIsEditing(false); // Exit editing mode after updating
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center">User Profile</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3 row">
                    <label htmlFor="firstName" className="col-sm-2 col-form-label">First Name</label>
                    <div className="col-sm-4">
                        <input
                            type="text"
                            className="form-control"
                            id="firstName"
                            name="firstName"
                            value={userDetails.firstName}
                            onChange={handleChange}
                            readOnly={!isEditing}
                        />
                    </div>
                    <label htmlFor="lastName" className="col-sm-2 col-form-label">Last Name</label>
                    <div className="col-sm-4">
                        <input
                            type="text"
                            className="form-control"
                            id="lastName"
                            name="lastName"
                            value={userDetails.lastName}
                            onChange={handleChange}
                            readOnly={!isEditing}
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
                            value={userDetails.email}
                            onChange={handleChange}
                            readOnly={!isEditing}
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
                            value={userDetails.mobile}
                            onChange={handleChange}
                            readOnly={!isEditing}
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
                            value={userDetails.password}
                            onChange={handleChange}
                            readOnly={!isEditing}
                        />
                    </div>
                </div>
                <div className="text-center">
                    {isEditing ? (
                        <>
                            <button type="submit" className="btn btn-primary"  onClick={handleUpdateUser}>Update</button>
                            <button
                                type="button"
                                className="btn btn-secondary ms-2"
                                onClick={() => setIsEditing(false)}
                            >
                                Cancel
                            </button>
                        </>
                    ) : (
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={() => {setIsEditing(true);
                                console.log(isEditing);
                            }}
                        >
                            Edit
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default UserProfileForm;