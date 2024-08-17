import React, { useState } from 'react';
import NewAdr from '../components/common/NewAdr';
import CarDetails from '../components/specific/car/CarDetails';
import CarPricing from '../components/specific/car/CarPricing';
import CarFeatures from '../components/specific/car/CarFeatures';
import addCar from '../services/host/carService';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './AddCar.css'; // Import the CSS file

const AddCar = ({ hostId, hostAddressId }) => {
    const [carData, setCarData] = useState({
        brand: '',
        model: '',
        fuelType: '',
        kmDriven: '',
        spareTyres: '',
        seats: '',
        registrationNo: '',
        transmissionTypeEnum: '',
        pricePerHr: '',
        pricePerDay: '',
        deposit: '',
        hasUsbCharger: false,
        hasBluetooth: false,
        hasPowerSteering: false,
        hasAirBags: false,
        hasAbs: false,
        hasAc: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setCarData({
            ...carData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addCar(hostId, hostAddressId, carData);
            toast.success('Car added successfully!');
            setCarData({
                brand: '',
                model: '',
                fuelType: '',
                kmDriven: '',
                spareTyres: '',
                seats: '',
                registrationNo: '',
                transmissionTypeEnum: '',
                pricePerHr: '',
                pricePerDay: '',
                deposit: '',
                hasUsbCharger: false,
                hasBluetooth: false,
                hasPowerSteering: false,
                hasAirBags: false,
                hasAbs: false,
                hasAc: false,
            });
        } catch (error) {
            toast.error('Failed to add car. Please try again.');
        }
    };

    return (
        <div className="add-car-container">
            <h1>Add Car</h1>
            <form onSubmit={handleSubmit} className="add-car-form">
                <NewAdr />
                <CarDetails handleChange={handleChange} carData={carData} />
                <CarPricing handleChange={handleChange} carData={carData} />
                <CarFeatures handleChange={handleChange} carData={carData} />
                <div className="button-container">
                    <button type="submit" className="submit-button">Submit</button>
                    <button type="button" onClick={() => setCarData({})} className="cancel-button">Cancel</button>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
};

export default AddCar;