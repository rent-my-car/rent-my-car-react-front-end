import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import CarInfo from './CarInfo'; 
import BookingTime from './BookingTime'; 

const DetailedCarCard = ({ booking }) => {
  const [pickupTime, setPickupTime] = useState('');
  const [dropoffTime, setDropoffTime] = useState('');

  useEffect(() => {
    // Retrieve pickup and dropoff dates from localStorage
    const storedPickupDate = localStorage.getItem('pickupDate');
    const storedDropoffDate = localStorage.getItem('dropoffDate');

    if (storedPickupDate) setPickupTime(storedPickupDate);
    if (storedDropoffDate) setDropoffTime(storedDropoffDate);
  }, []);

  return (
    <div className="border p-4 rounded mb-4">
      {booking ? (
        <>
          <CarInfo booking={booking} />
          <BookingTime pickupTime={pickupTime} dropoffTime={dropoffTime} />
        </>
      ) : (
        <p>Loading car details...</p> // Fallback message
      )}
    </div>
  );
};

export default DetailedCarCard;