import React, { useEffect, useState } from 'react';
import CarDetails from '../components/specific/CarDetails';
import CarPricing from '../components/specific/AddCarPricing';
import CarFeatures from '../components/specific/CarFeatures copy';
import userService from '../services/userService'; // Import userService to fetch addresses
import carService from '../services/carService';
import AddressList from '../components/specific/AddressList';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './AddCar.css'; // Import the CSS file

const AddCar = () => {
    const userId = localStorage.getItem("userId"); // Get userId from local storage
    const [carData, setCarData] = useState({
        brand: '',
        model: '',
        fuelTypeEnum: 'PETROL', // Default value
        seatingCapacity: 0,
        transmissionTypeEnum: 'AUTOMATIC', // Default value
        spareTyreCount: 0,
        kmDriven: 0,
        registrationNo: '',
        fuelMeter: 0,
        hasUsbCharger: false,
        hasBluetooth: false,
        hasPowerSteering: false,
        hasAirBags: false,
        hasAbs: false,
        hasAc: false,
    });
    const [addresses, setAddresses] = useState([]); // State to hold addresses
    const [selectedAddress, setSelectedAddress] = useState(null); // State to hold selected address

    useEffect(() => {
        const fetchUserAddresses = async () => {
            try {
                const userAddresses = await userService.fetchUserAddressDetails(userId); // Call service to fetch addresses
                setAddresses(userAddresses); // Set addresses in state
            } catch (err) {
                toast.error(err.message || "Failed to fetch addresses."); // Show error message from the service
            }
        };

        if (userId) { // Only fetch if userId is available
            fetchUserAddresses();
        }
    }, [userId]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setCarData({
            ...carData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedAddress) {
            toast.error("Please select an address.");
            return;
        }

        const payload = {
            carDetailsDto: {
                brand: carData.brand,
                model: carData.model,
                fuelTypeEnum: carData.fuelTypeEnum,
                seatingCapacity: carData.seatingCapacity,
                transmissionTypeEnum: carData.transmissionTypeEnum,
                spareTyreCount: carData.spareTyreCount,
                kmDriven: carData.kmDriven,
                registrationNo: carData.registrationNo,
                fuelMeter: carData.fuelMeter,
            },
            carPricingDto: {
                pricePerHr: 100, // Example value, replace with actual input
                pricePerDay: 500, // Example value, replace with actual input
                securityDeposit: 2000, // Example value, replace with actual input
            },
            carFeaturesDto: {
                hasUsbCharger: carData.hasUsbCharger,
                hasBluetooth: carData.hasBluetooth,
                hasPowerSteering: carData.hasPowerSteering,
                hasAirBags: carData.hasAirBags,
                hasAbs: carData.hasAbs,
                hasAc: carData.hasAc,
            },
        };

        try {
            const response = await carService.addCar(userId, selectedAddress.id, payload); // Call your add car service
            toast.success("Car added successfully!");
            setCarData({
                brand: '',
                model: '',
                fuelTypeEnum: 'PETROL',
                seatingCapacity: 0,
                transmissionTypeEnum: 'AUTOMATIC',
                spareTyreCount: 0,
                kmDriven: 0,
                registrationNo: '',
                fuelMeter: 0,
                hasUsbCharger: false,
                hasBluetooth: false,
                hasPowerSteering: false,
                hasAirBags: false,
                hasAbs: false,
                hasAc: false,
            });
            setSelectedAddress(null); // Reset selected address
        } catch (error) {
            toast.error(error.message || "Failed to add car. Please try again.");
        }
    };

    return (
        <div className="add-car-container">
            <h1>Add Car</h1>
            <AddressList 
                addresses={addresses} 
                onAddressSelect={setSelectedAddress} 
                onAddAddress={() => console.log("Add New Address")} 
            />
            <form onSubmit={handleSubmit} className="add-car-form">
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
