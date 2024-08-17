import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const AddCarPricing = () => {
    return (
        <div className="container mt-5">
            <div className="border p-4 rounded">
                <h4 className="text-center">Car Pricing</h4>
                <div className="row mb-3">
                    <div className="col">
                        <input type="text" className="form-control" placeholder="Price Per Hr" />
                    </div>
                    <div className="col">
                        <input type="text" className="form-control" placeholder="Price Per Day" />
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col">
                        <input type="text" className="form-control" placeholder="Deposit" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddCarPricing;