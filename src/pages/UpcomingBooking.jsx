import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import DetailedCarCard from '../components/specific/DetailedCarCard';
 // Adjusted path
import bookingService from '../services/bookingService';

const UpcomingBooking = () => {
    const [bookings, setBookings] = useState([]);
    const [error, setError] = useState(null);
    const userId = localStorage.getItem('userId'); // Get userId from localStorage
    const UPCOMING_BOOKING_API_URL = `http://localhost:8080/booking/past_booking/${userId}`; // Your API URL

    useEffect(() => {
        const getBookings = async () => {
            try {
                const data = await bookingService.fetchBookings(UPCOMING_BOOKING_API_URL);
                setBookings(data);
            } catch (error) {
                setError(error.message);
            }
        };

        if (userId) {
            getBookings(); // Fetch bookings if userId exists
        } else {
            setError('User ID not found.');
        }
    }, [userId]);

    return (
        <div className="container mt-5">
            <div className="text-center">
                <h1>My Upcoming Bookings</h1>
            </div>
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="border p-4 rounded">
                {bookings.length > 0 ? (
                    bookings.map((booking) => (
                        <DetailedCarCard key={booking.id} booking={booking} />
                    ))
                ) : (
                    <p>No bookings found.</p>
                )}
            </div>
        </div>
    );
};

export default UpcomingBooking;