// ManageHosts.jsx
import React, { useEffect, useState } from 'react';

const ManageHosts = () => {
    const [hosts, setHosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchHosts = async () => {
            try {
                const response = await fetch('http://localhost:8080/get_all_host'); // Adjust the URL as necessary
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setHosts(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchHosts();
    }, []);

    const removeHost = async (id) => {
        try {
            const response = await fetch(`http://localhost:8080/user/delete/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete the host');
            }
            // Update the state to remove the host from the UI
            setHosts(hosts.filter(host => host.id !== id));
        } catch (error) {
            setError(error.message);
        }
    };
   

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="container">
            <h2>Manage Host</h2>
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
                    {hosts.map(host => (
                        <tr key={host.id}>
                            <td>{host.firstName}</td>
                            <td>{host.lastName}</td>
                            <td>{host.email}</td>
                            <td>{host.mobile}</td>
                            <td>
                                <button 
                                    className="btn btn-danger" 
                                    onClick={() => removeHost(host.id)}
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

export default ManageHosts;