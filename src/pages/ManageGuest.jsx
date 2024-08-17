// ManageGuests.jsx
import React, { useEffect, useState } from 'react';

const ManageGuests = () => {
    const [guests, setGuests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchGuests = async () => {
            try {
                const response = await fetch('http://localhost:8080/guest/get_all_guests'); // Adjust the URL as necessary
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setGuests(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchGuests();
    }, []);

    const removeGuest = async (id) => {
        try {
            const response = await fetch(`http://localhost:8080/user/delete/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete the host');
            }
            // Update the state to remove the guest from the UI
            setGuests(guests.filter(host => host.id !== id));
        } catch (error) {
            setError(error.message);
        }
    };
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="container">
            <h2>Manage Guest</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Mobile</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {guests.map(guest => (
                        <tr key={guest.id}>
                            <td>{guest.firstName}</td>
                            <td>{guest.lastName}</td>
                            <td>{guest.email}</td>
                            <td>{guest.mobile}</td>
                            <td>
                                <button 
                                    className="btn btn-danger" 
                                    onClick={() => removeGuest(guest.id)}
                                >
                                    Remove
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManageGuests;