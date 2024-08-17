import React, { useEffect, useState } from 'react';
import CarCard from './CarCard';
import carService from '../../services/host/carService';

const CarListing = ({ carListingId }) => {
  const [carData, setCarData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCarListing = async () => {
      setLoading(true);
      setError('');

      try {
        const userId = localStorage.getItem("userId");
        const data = await carService.fetchConfirmedCarListings(userId);
        setCarData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCarListing();
  }, [carListingId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="d-flex flex-wrap justify-content-center">
      {carData.length > 0 ? (
        carData.map(car => (
          <div className="m-2" key={car.id}>
            <CarCard car={car} />
          </div>
        ))
      ) : (
        <p>No car listing available.</p>
      )}
    </div>
  );
};

export default CarListing;