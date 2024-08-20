import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import DetailedCarCard from '../components/specific/DetailedCarCard';
import bookingService from '../services/bookingService';
import { useAuth } from '../context/AuthContext';

const Booking = ({ bookingType }) => {
    const { user } = useAuth();
    const [bookings, setBookings] = useState([]);
    const [error, setError] = useState(null);
    const userId = user.id;


    const BOOKING_API_URL = (bookingType === 'upcoming-booking')
        ? `http://localhost:8080/booking/upcoming_booking`
        : `http://localhost:8080/booking/past_booking`; // Your API URL

    let bookingTitle = bookingType.replace(/-booking/g, '');
    bookingTitle = bookingTitle.charAt(0).toUpperCase() + bookingTitle.slice(1);
    console.log(bookingTitle);
    useEffect(() => {
        const getBookings = async () => {
            try {
                console.log(`inside ${bookingType} ` + user);
                const data = await bookingService.fetchBookings(BOOKING_API_URL, user.token);
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
    }, [userId,bookingType]);

    return (
        <div className="container mt-5">
            <div className="text-center">
                <h1>My {bookingTitle} Bookings</h1>
            </div>
            {error &&
                <div className="alert alert-danger">
                    {error}
                </div>
            }

            {!error &&
                <div className="border p-4 rounded">
                    {
                        bookings.map((booking) => (
                            <DetailedCarCard key={booking.id} booking={booking} />
                        ))
                    }
                </div>
            }
        </div>
    );
};

export default Booking;