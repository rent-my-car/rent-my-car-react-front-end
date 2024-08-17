import { useState, useEffect } from "react";

const UserProfileForm = ({ user, onUpdate }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({ ...user });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (typeof onUpdate === 'function') {
            onUpdate(formData);
            setIsEditing(false); // Exit editing mode after updating
        } else {
            console.error('onUpdate is not a function');
        }
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
                            value={formData.firstName}
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
                            value={formData.lastName}
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
                            value={formData.email}
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
                            value={formData.mobile}
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
                            value={formData.password}
                            onChange={handleChange}
                            readOnly={!isEditing}
                        />
                    </div>
                </div>
                <div className="text-center">
                    {isEditing ? (
                        <>
                            <button type="submit" className="btn btn-primary">Update</button>
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
                            onClick={() => setIsEditing(true)}
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
