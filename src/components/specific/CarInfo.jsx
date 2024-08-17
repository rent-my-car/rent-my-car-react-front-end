import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const CarInfo = ({ booking }) => {
    if (!booking) {
      return <p>No car information available.</p>; // Fallback message
    }
  
    return (
      <div className="d-flex justify-content-between align-items-center">
        <div className="text-left">
          <h4>{booking.brand} {booking.model}</h4>
          <h4>{booking.fuelTypeEnum} - {booking.seatingCapacity} Seats - {booking.kmDriven} km Driven</h4>
          <h4>{booking.transmissionTypeEnum}</h4>
          <p>{booking.carDetails}</p>
        </div>
        <div className="car-logo" style={{ width: '100px', height: '100px', border: '1px solid #ccc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          Car Logo
        </div>
      </div>
    );
  };
  
  export default CarInfo;