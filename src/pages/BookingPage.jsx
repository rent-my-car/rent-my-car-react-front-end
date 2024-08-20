import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CarImage from '../components/common/CarImage';
import DetailedCarCard from '../components/specific/DetailedCarCard';
import BillingDetails from '../components/specific/BillingDetails';
import AddressList from '../components/specific/AddressList';
import carService from '../services/carService';
import bookingService from '../services/bookingService'; // Import the booking service
import { useAuth } from '../context/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import PricingDetails from '../components/specific/PricingDetails';
import CarFeatures from '../components/specific/CarFeatures';
import CarAddress from '../components/specific/CarAddress';

const BookingPage = () => {
  const navigate = useNavigate();
  const { isLoggedIn, user } = useAuth(); // Retrieve login status and user details

  // State variables for storing car data, loading status, errors, addresses, and selected address
  const [carData, setCarData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedAddress, setSelectedAddress] = useState(null);
 
  const [bookingError, setBookingError] = useState(''); // Track booking errors

  // Retrieve car ID, pickup date, and dropoff date from localStorage
  const carId = localStorage.getItem('carId');
  const pickupDate = localStorage.getItem('pickupDate');
  const dropoffDate = localStorage.getItem('dropoffDate');

  // useEffect hook to fetch car data when the component mounts or carId changes
  useEffect(() => {
    const fetchCarData = async () => {
      setLoading(true); // Set loading state to true while fetching data
      setError(''); // Clear previous errors

      try {
        if (!carId || isNaN(carId)) {
          throw new Error('Invalid car ID.');
        }
        
        // Fetch car data from car service
        const response = await carService.fetchCarListingById(carId);
        setCarData(response); // Store fetched car data
      } catch (err) {
        setError(err.message); // Set error message if there's an issue
      } finally {
        setLoading(false); // Set loading state to false after data fetching
      }
    };

    fetchCarData(); // Call the function to fetch car data
  }, [carId]); // Dependency array ensures this effect runs when carId changes


  if (!pickupDate || !dropoffDate) {
    return <p className="text-danger">Missing booking details. Please go back and try again.</p>;
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  // Destructure car data
  const {
    carDetailsDto,
    carPricingDto,
    carFeaturesDto,
    carAddressDto,
  } = carData;

  // Calculate trip amount based on pricing and dates
  const tripAmount = carPricingDto ? calculateTripAmount(pickupDate, dropoffDate, carPricingDto) : 0;
  const securityDeposit = carPricingDto?.securityDeposit || 0; // Use security deposit from car pricing
  const finalAmount = tripAmount + securityDeposit;
  localStorage.setItem("totalAmmount", finalAmount );

  // Determine car features
  const features = [
    carFeaturesDto?.hasUsbCharger ? 'USB Charger' : null,
    carFeaturesDto?.hasBluetooth ? 'Bluetooth' : null,
    carFeaturesDto?.hasPowerSteering ? 'Power Steering' : null,
    carFeaturesDto?.hasAirBags ? 'Air Bags' : null,
    carFeaturesDto?.hasAbs ? 'ABS' : null,
    carFeaturesDto?.hasAc ? 'AC' : null,
  ].filter(Boolean);

  // Redirect to login page if not logged in
  const handleLoginRedirect = () => {
    navigate('/login', { state: { redirectPath: `/booking/${carId}`}});
  };

  // Proceed to payment
  const handleProceedToPay = async () => {
    if (selectedAddress) {
      try {
        // Create booking DTO with necessary details
        const bookingDto = {
          pickUp: pickupDate,
          dropOff: dropoffDate,
          amount: finalAmount,
        };

        // Construct the booking URL
        const url = `http://localhost:8080/booking/${user.id}/${carId}/${selectedAddress.id}`;
        
        // Call the booking service to create a new booking
        const response = await bookingService.createBooking(url, bookingDto);

        // Store the booking ID in local storage
        localStorage.setItem('bookingId', response.id);

        // Navigate to payment page after successful booking
        navigate("/payment");
      } catch (err) {
        // Display error message from the backend or a generic error message
        setBookingError(err.response?.data?.message || 'An error occurred while booking.');
      }
    } else {
      setBookingError('Please select an address before proceeding.');
    }
  };

  return (
    <div className="container my-4">
      <h2>Booking Details</h2>

      {/* First Row: Car Image and Billing Details */}
      <div className="row mb-4">
        <div className="col-md-8">
          <CarImage />
        </div>
        <div className="col-md-4">
          <div className="d-flex flex-column h-100">
            <BillingDetails
              tripAmount={tripAmount}
              securityDeposit={securityDeposit}
              finalAmount={finalAmount}
            />
            <div className="text-center mt-4">
              {!isLoggedIn ? (
                <button className="btn btn-primary" onClick={handleLoginRedirect}>Login to Continue</button>
              ) : (
                <button
                  className={`btn btn-success ${!selectedAddress ? 'disabled' : ''}`}
                  onClick={handleProceedToPay}
                >
                  Proceed to Pay
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Second Row: Address List */}
      {isLoggedIn && (
        <div className="row mb-4">
          <div className="col-md-12">
          <h4>Select Address for Booking:</h4>
              <AddressList onAddressSelect ={setSelectedAddress}/>
            {bookingError && <p className="text-danger">{bookingError}</p>} {/* Display booking errors */}
          </div>
        </div>
      )}

      {/* Car Details */}
      <DetailedCarCard
        booking={carDetailsDto}
        pickupTime={pickupDate}
        dropoffTime={dropoffDate}
      />
      <CarFeatures features={features} />
      <PricingDetails pricing={carPricingDto} />
      <CarAddress address={carAddressDto} />
    </div>
  );
};

// Helper function to calculate the trip amount
const calculateTripAmount = (pickUp, dropOff, carPricingDto) => {
  const pickUpDate = new Date(pickUp);
  const dropOffDate = new Date(dropOff);

  // Calculate total hours and days
  const totalHours = Math.ceil((dropOffDate - pickUpDate) / (1000 * 60 * 60));
  const totalDays = Math.ceil(totalHours / 24);

  // Calculate amounts
  const pricePerDay = carPricingDto.pricePerDay || 0;
  const pricePerHour = carPricingDto.pricePerHr || 0;

  const tripAmount = (totalDays * pricePerDay) + (totalHours * pricePerHour);
  return tripAmount;
};

export default BookingPage;