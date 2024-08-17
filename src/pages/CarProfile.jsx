import React, { useState } from 'react';
import BookYourRide from '../components/common/BookYourRide';
import { useNavigate } from 'react-router-dom';
import CarCard from '../components/common/CarCard';
import carService from '../services/carService';

const HomePage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useState({
    city: '',
    pickupDate: '',
    dropoffDate: '',
  });
  const [carData, setCarData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (params) => {
    setSearchParams(params);
    setLoading(true);
    setError('');
    setCarData([]); // Reset car data

    try {
      const data = await carService.fetchCarListings(
        params.pickupDate,
        params.dropoffDate,
        params.city
      );
      setCarData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCardClick = (carId) => {
    // Save data in localStorage
    localStorage.setItem('carId', carId);
    localStorage.setItem('pickupDate', searchParams.pickupDate);
    localStorage.setItem('dropoffDate', searchParams.dropoffDate);

    // Navigate to booking page
    navigate(`/booking/${carId}`);
  };

  return (
    <div className="container text-center my-4">
      <BookYourRide onSearch={handleSearch} />
      {loading && <p>Loading cars...</p>}
      {error && <p className="text-danger">{error}</p>}
      {!loading && carData.length === 0 && !error && (
        <p>No cars found. Please try a different search.</p>
      )}
      {carData.length > 0 && (
        <div className="d-flex flex-wrap justify-content-center mt-4">
          {carData.map(car => (
            <div className="m-2" key={car.id} onClick={() => handleCardClick(car.id)} style={{ cursor: 'pointer' }}>
              <CarCard car={car} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;