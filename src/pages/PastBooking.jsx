import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import DetailedCarCard from '../components/specific/DetailedCarCard';
import { useAuth } from '../context/AuthContext';
import bookingService from '../services/bookingService';

const PastBooking = () => {
    const [bookings, setBookings] = useState([]);
    const [error, setError] = useState(null);
    const UPCOMING_BOOKING_API_URL = `http://localhost:8080/booking/past_booking`;
    const { user } = useAuth(); const userId = user.id;

    useEffect(() => {
        const getBookings = async () => {
            try {
                const data = await bookingService.fetchBookings(UPCOMING_BOOKING_API_URL, user.token);
                setBookings(data);
            } catch (error) {
                setError(error.response.data.message);
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
                <h1>My Past Bookings</h1>
            </div>
            {error && <div className="alert alert-danger">{error}</div>}
            {!error &&  <div className="border p-4 rounded">
                {
                    bookings.map((booking) => (
                        <DetailedCarCard key={booking.id} booking={booking} />
                    ))
                }
            </div>}
           
        </div>
    );
};

export default PastBooking;