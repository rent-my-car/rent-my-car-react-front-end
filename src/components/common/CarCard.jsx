import React from 'react';
import PropTypes from 'prop-types';
import carLogo from '../../assets/images/car-logo.png'; // Ensure the path is correct

const CarCard = ({ car }) => {
    return (
        <div className="card text-center my-2 bg-secondary" style={{ width: '16rem', color: 'white' }}>
            <div className="card-header p-1">
                <img src={carLogo} alt="Car" className="card-img-top" style={{ height: '100px', objectFit: 'cover' }} />
            </div>
            <div className="card-body p-2">
                <h5 className="card-title" style={{ fontSize: '1.2rem' }}>{`${car.brand} ${car.model}`}</h5>
                <p className="card-text" style={{ margin: '0.2rem 0' }}>
                    {`${car.transmissionTypeEnum} - ${car.fuelTypeEnum} - ${car.seatingCapacity} Seats`}
                </p>
                <p style={{ margin: '0.2rem 0' }}>{`${car.noOfTrips} Trips`}</p>
                <p className="card-text" style={{ margin: '0.2rem 0' }}>
                    {`₹ ${car.pricePerHr} / Hr - ₹ ${car.pricePerDay} / Day`}
                </p>
            </div>
        </div>
    );
};

// PropTypes for type checking
CarCard.propTypes = {
    car: PropTypes.shape({
        brand: PropTypes.string.isRequired,
        model: PropTypes.string.isRequired,
        fuelTypeEnum: PropTypes.string.isRequired,
        seatingCapacity: PropTypes.number.isRequired,
        noOfTrips: PropTypes.number.isRequired,
        transmissionTypeEnum: PropTypes.string.isRequired,
        pricePerHr: PropTypes.number.isRequired,
        pricePerDay: PropTypes.number.isRequired,
    }).isRequired,
};

export default CarCard;