import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


const CarDetails = ({ handleDetailsChange  }) => {
    return (

        <div className='container border p-4 rounded '>
            <h2>Car Details</h2>
            <div className='form'>
            <div className="row">
                <div className="col-md-5">
                    <input type="text" name="brand" placeholder="Brand"  onChange={handleDetailsChange} required />
                </div>
                <div className="col-md-5">
                    <input type="text" name="model" placeholder="Model"  onChange={handleDetailsChange} required />
                </div>
            </div>
            </div>
            <div className="row">
                <div className="col-md-5">
                    <select
                        className="form-select"
                        name="fuelTypeEnum"
                        placeholder="fuelType"
                        onChange={handleDetailsChange}
                    >
                        <option value="">Select Fuel Type</option>
                        <option value="PETROL">Petrol</option>
                        <option value="DIESEL">Diesel</option>
                        <option value="CNG">CNG</option>
                        <option value="ELECTRIC">Electric</option>
                    </select>
                </div>
                <div className="col-md-5">
                    <select
                        className="form-select"
                        name="transmissionTypeEnum"
                        placeholder="Transmission"
                        onChange={handleDetailsChange}
                    >
                        <option value="">Transmission Type</option>
                        <option value="AUTOMATIC">Automatic</option>
                        <option value="MANUAL">Manual</option>
                        <option value="SEMI_AUTOMATIC">Semi-Automatic</option>
                    </select>
                </div>
            </div>

            <div className="row">
                <div className="col-md-5">
                    <input type="number" name="kmDriven" placeholder="Km Driven" onChange={handleDetailsChange} required />
                </div>
                <div className="col-md-5">
                    <input type="number" name="spareTyreCount" placeholder="Spare Tyres"  onChange={handleDetailsChange} required />
                </div>
            </div>

            <div className="row">
                <div className="col-md-5">
                    <input type="text" name="registrationNo" placeholder="RC No"  onChange={handleDetailsChange} required />
                </div>
                <div className="col-md-5">
                    <input type="number" name="seatingCapacity" placeholder="Seats"  onChange={handleDetailsChange} required />
                </div>
            </div>
        </div>


    );
};

export default CarDetails;