import React, { useEffect, useState } from 'react';
import CarCard from '../components/common/CarCard';
import carService from '../services/carService';

const CarListingPage = () => {
    const [carData, setCarData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getCarListings = async () => {
            try {
                const userId = localStorage.getItem("userId");
                const data = await carService.fetchConfirmedCarListings(userId); // Call the service function
                setCarData(data);
                console.log()
            } catch (error) {
                setError(error.message);
            }
        };

        getCarListings();
    }, []); // Empty dependency array to run only on mount

    return (
        <div className="container">
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="d-flex flex-wrap justify-content-center">
                {carData.length > 0 ? (
                    carData.map(car => (
                        <div className="m-2" key={car.id}>
                            <CarCard car={car} />
                        </div>
                    ))
                ) : (
                    <p>No car listings available.</p>
                )}
            </div>
        </div>
    );
};

export default CarListingPage;