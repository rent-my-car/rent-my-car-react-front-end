import React, { useState, useEffect } from 'react';
import addressService from '../../services/addressService';

const BookYourRide = ({ onSearch }) => {
  const [city, setCity] = useState('');
  const [pickupDate, setPickupDate] = useState('');
  const [dropoffDate, setDropoffDate] = useState('');
  const [cities, setCities] = useState([]); // State to hold city names
  const [loadingCities, setLoadingCities] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = () => {
    if (!city) {
      setError('Please select a city.');
      return;
    }

    if (!pickupDate || !dropoffDate) {
      setError('Please provide both pickup and dropoff dates.');
      return;
    }

    if (new Date(dropoffDate) <= new Date(pickupDate)) {
      setError('Dropoff date must be after pickup date.');
      return;
    }

    // Clear any existing errors
    setError('');

    // Call the onSearch function passed from HomePage
    onSearch({ city, pickupDate, dropoffDate });
  };

  const fetchCities = async () => {
    setLoadingCities(true);
    try {
      const cityNames = await addressService.fetchCities();
      setCities(cityNames);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoadingCities(false);
    }
  };

  useEffect(() => {
    fetchCities(); // Fetch cities when the component mounts
  }, []);

  return (
    <div className="text-center my-4">
      <h2>Book Your Ride</h2>
      <div className="container">
        <div className="row">
          <div className="col-md-4 mb-3">
            <label htmlFor="citySelect" className="form-label">Select City</label>
            <select
              id="citySelect"
              className="form-select"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              disabled={loadingCities}
            >
              <option value="">Select City</option>
              {loadingCities ? (
                <option>Loading cities...</option>
              ) : (
                cities.map((cityName, index) => (
                  <option key={index} value={cityName}>
                    {cityName}
                  </option>
                ))
              )}
            </select>
          </div>
          <div className="col-md-4 mb-3">
            <label htmlFor="pickupDate" className="form-label">Pickup Date</label>
            <input
              id="pickupDate"
              type="datetime-local"
              className="form-control"
              value={pickupDate}
              onChange={(e) => setPickupDate(e.target.value)}
            />
          </div>
          <div className="col-md-4 mb-3">
            <label htmlFor="dropoffDate" className="form-label">Dropoff Date</label>
            <input
              id="dropoffDate"
              type="datetime-local"
              className="form-control"
              value={dropoffDate}
              onChange={(e) => setDropoffDate(e.target.value)}
            />
          </div>
        </div>
        <button className="btn btn-primary" onClick={handleSearch} disabled={loadingCities}>
          Search
        </button>
        {error && <p className="text-danger">{error}</p>} {/* Display error message */}
      </div>
    </div>
  );
};

export default BookYourRide;
