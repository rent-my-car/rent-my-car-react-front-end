import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './AddCarFeatures.css'; // Import custom CSS

const AddCarFeatures = ({ carData, handleChange }) => {
    return (
        <div className="container mt-5">
            <div className="border p-4 rounded">
                <h4 className="text-center">Car Features</h4>
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-check feature-item">
                            <input
                                type="checkbox"
                                name="hasUsbCharger"
                                checked={carData.hasUsbCharger || false}
                                onChange={handleChange}
                                className="form-check-input"
                                id="hasUsbCharger"
                            />
                            <label className="form-check-label" htmlFor="hasUsbCharger">
                                USB Charger
                            </label>
                        </div>
                        <div className="form-check feature-item">
                            <input
                                type="checkbox"
                                name="hasBluetooth"
                                checked={carData.hasBluetooth || false}
                                onChange={handleChange}
                                className="form-check-input"
                                id="hasBluetooth"
                            />
                            <label className="form-check-label" htmlFor="hasBluetooth">
                                Bluetooth
                            </label>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-check feature-item">
                            <input
                                type="checkbox"
                                name="hasPowerSteering"
                                checked={carData.hasPowerSteering || false}
                                onChange={handleChange}
                                className="form-check-input"
                                id="hasPowerSteering"
                            />
                            <label className="form-check-label" htmlFor="hasPowerSteering">
                                Power Steering
                            </label>
                        </div>
                        <div className="form-check feature-item">
                            <input
                                type="checkbox"
                                name="hasAirBags"
                                checked={carData.hasAirBags || false}
                                onChange={handleChange}
                                className="form-check-input"
                                id="hasAirBags"
                            />
                            <label className="form-check-label" htmlFor="hasAirBags">
                                Air Bags
                            </label>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-check feature-item">
                            <input
                                type="checkbox"
                                name="hasAbs"
                                checked={carData.hasAbs || false}
                                onChange={handleChange}
                                className="form-check-input"
                                id="hasAbs"
                            />
                            <label className="form-check-label" htmlFor="hasAbs">
                                ABS
                            </label>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-check feature-item">
                            <input
                                type="checkbox"
                                name="hasAc"
                                checked={carData.hasAc || false}
                                onChange={handleChange}
                                className="form-check-input"
                                id="hasAc"
                            />
                            <label className="form-check-label" htmlFor="hasAc">
                                AC
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddCarFeatures;
