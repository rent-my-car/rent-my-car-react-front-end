import React, { useEffect, useState } from 'react';
import CarCard from '../components/common/CarCard';// Adjust the import path as necessary

const PendingApprovalPage = () => {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Sample data for demonstration
    useEffect(() => {
        const fetchCars = async () => {
            try {
                const response = await fetch('http://localhost:8080/admin/pending_approvals'); // Adjust the URL as necessary
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setCars(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCars();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="container">
            <h2 className="text-center my-4">Pending Approvals:</h2>
            <div className="row">
                {cars.map((car, index) => (
                    <div className="col-md-4" key={index}>
                        <CarCard car={car} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PendingApprovalPage;
