import React, { useEffect, useState } from 'react';
import CarDetails from '../components/specific/CarDetails';
import CarPricing from '../components/specific/AddCarPricing';
import userService from '../services/userService'; // Import userService to fetch addresses
import carService from '../services/carService';
import AddressList from '../components/specific/AddressList';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './AddCar.css'; // Import the CSS file
import AddCarFeatures from '../components/specific/AddCarFeatures';
import { useAuth } from '../context/AuthContext';
import AddCarPricing from '../components/specific/AddCarPricing';
import { useNavigate } from 'react-router-dom';

const AddCar = () => {
    const { user } = useAuth();
    //const userId = localStorage.getItem("userId"); // Get userId from local storage

   
    const [carDetailsDto, setCarDetailsDto] = useState({
        brand: '',
        model: '',
        fuelTypeEnum: '',
        seatingCapacity: 0,
        transmissionTypeEnum: 'MANUAL',
        spareTyreCount: 0,
        kmDriven: 0,
        registrationNo: '',
        fuelMeter: 0,
    });

    const [carPricingDto, setCarPricingDto] = useState({
        pricePerHr: 0, // Example value, replace with actual input
        pricePerDay: 0, // Example value, replace with actual input
        securityDeposit: 0, // Example value, replace with actual input
    });

    const [carFeaturesDto, setcarFeaturesDto] = useState({
        hasUsbCharger: false,
        hasBluetooth: false,
        hasPowerSteering: false,
        hasAirBags: false,
        hasAbs: false,
        hasAc: false,
    });
    const handleDetailsChange = (e) => {
        const { name, value, type, checked } = e.target;
        setCarDetailsDto((prevDetails) => ({
            ...prevDetails, // Spread the previous state
            [name]: type === 'checkbox' ? checked : value, // Update the specific field
        }))
    };
   


    const handlePriceChange = (e) => {
        const { name, value, type, checked } = e.target;
        setCarPricingDto((prevDetails) => ({
            ...prevDetails, // Spread the previous state
            [name]: type === 'checkbox' ? checked : value, // Update the specific field
        }))
    };

    

    


    const handleFeatureChange = (e) => {
        const { name, value, type, checked } = e.target;
        setcarFeaturesDto((prevDetails) => ({
            ...prevDetails, // Spread the previous state
            [name]: type === 'checkbox' ? checked : value, // Update the specific field
        }))
    };

    const [addresses, setAddresses] = useState([]); // State to hold addresses
    const [selectedAddress, setSelectedAddress] = useState(null); // State to hold selected address
    const userId = user.id; 
    useEffect(() => {
        const fetchUserAddresses = async () => {
            try {
                const userAddresses = await userService.fetchUserAddressDetails(user.token); // Call service to fetch addresses
                setAddresses(userAddresses); // Set addresses in state
            } catch (err) {
                toast.error(err.message || "Failed to fetch addresses."); // Show error message from the service
            }
        };

        if (userId) { // Only fetch if userId is available
            fetchUserAddresses();
        }
    }, [userId]);



    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedAddress) {
            toast.error("Please select an address.");
            return;
        }

        try {
            console.log(selectedAddress);
            const response = await carService.addCar(user.token, selectedAddress.id, {carDetailsDto, carFeaturesDto , carPricingDto});
            toast.success("Car added successfully!");
        
            setSelectedAddress(null);
        } catch (error) {
            toast.error(error.message || "Failed to add car. Please try again.");
        }
    };

    const navigate = useNavigate();

    const onCancel = () =>
    {
       navigate("/add-car");
    }

    return (
        <div className="add-car-container">
            <h1>Add Car</h1>
            <AddressList
                addresses={addresses}
                onAddressSelect={setSelectedAddress}
                onAddAddress={() => console.log("Add New Address")}
            />

            <div className='mt-5'><CarDetails className="mt-4" handleDetailsChange={handleDetailsChange} /></div>
            <AddCarPricing handlePriceChange={handlePriceChange} />
            <AddCarFeatures handleFeatureChange={handleFeatureChange} />
            <div className="button-container">
                <button className="btn btn-success" onClick={handleSubmit} >Submit</button>
                <button className="btn btn-danger" onClick={onCancel} > Cancel</button>
            </div>

            <ToastContainer />
        </div>
    );
};

export default AddCar;
