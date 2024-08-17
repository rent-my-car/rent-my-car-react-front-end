import React from 'react';

const CarDetails = ({ handleChange, carData }) => {
    return (
        <div className="car-details">
            <h2>Car Details</h2>
            <input type="text" name="brand" placeholder="Brand" value={carData.brand} onChange={handleChange} required />
            <input type="text" name="model" placeholder="Model" value={carData.model} onChange={handleChange} required />
            <input type="text" name="fuelTypeEnum" placeholder="Fuel Type" value={carData.fuelType} onChange={handleChange} required />
            <input type="number" name="kmDriven" placeholder="Km Driven" value={carData.kmDriven} onChange={handleChange} required />
            <input type="number" name="spareTyres" placeholder="Spare Tyres" value={carData.spareTyres} onChange={handleChange} required />
            <input type="number" name="seats" placeholder="Seats" value={carData.seats} onChange={handleChange} required />
            <input type="text" name="registrationNo" placeholder="RC No" value={carData.rcNo} onChange={handleChange} required />
            <input type="text" name="transmissionTypeEnum" placeholder="Transmission" value={carData.transmission} onChange={handleChange} required />
        </div>
    );
};

export default CarDetails;