import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const CarFeatures = () => {
    return (
        <div className="container mt-5">
            <div className="border p-4 rounded">
                <h4 className="text-center">Car Features</h4>
                <div className="row mb-3">
                    <div className="col">
                        <input type="text" className="form-control" placeholder="hasUsbCharger" />
                    </div>
                    <div className="col">
                        <input type="text" className="form-control" placeholder="hasBluetooth" />
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col">
                        <input type="text" className="form-control" placeholder="hasPowerSteering" />
                    </div>
                    <div className="col">
                        <input type="text" className="form-control" placeholder="hasAirBags" />
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col">
                        <input type="text" className="form-control" placeholder="hasAbs" />
                    </div>
                    <div className="col">
                        <input type="text" className="form-control" placeholder="hasAc" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CarFeatures;