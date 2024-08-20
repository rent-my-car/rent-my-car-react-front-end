import React, { useEffect, useState } from 'react';
import CarCard from '../components/common/CarCard';
import carService from '../services/carService';
import { useAuth } from '../context/AuthContext';

const CarListingPage = ({listingType}) => {
    const [carData, setCarData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { user } = useAuth();

    useEffect(() => {
        const fetchCarListing = async () => {
            setLoading(true);
            setError('');

            try {
                let data;
                if (listingType === 'confirmed') {
                    data = await carService.fetchConfirmedCarListings(user.token);
                } else if (listingType === 'pending') {
                    data = await carService.fetchPendingCarListings(user.token);
                } else {
                    throw new Error('Invalid listing type');
                }
                setCarData(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCarListing();
    }, [listingType, user.token]);

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