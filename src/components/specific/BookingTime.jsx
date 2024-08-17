import React from 'react';

const BookingTime = ({ pickupTime, dropoffTime }) => {
  return (
    <div className="card my-4">
      <div className="card-body">
        <h5 className="card-title">Booking Time</h5>
        <div className="row">
          <div className="col text-center">
            <h6>Pickup</h6>
            <p>{pickupTime}</p>
          </div>
          <div className="col text-center">
            <h6>Drop</h6>
            <p>{dropoffTime}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingTime;