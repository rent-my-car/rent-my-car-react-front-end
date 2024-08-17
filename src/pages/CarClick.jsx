import React from "react";
import CarDetails from '../components/specific/car/CarDetails';
import CarPricing from '../components/specific/car/CarPricing';
import CarAddress from "../components/specific/car/CarAddress";
import CarFeaturesExBtn from "../components/specific/car/CarFeaturesExBtn";

const CarClick = () =>{
    return (
        <div>
            <CarDetails/>
            <CarPricing/>
            <CarFeaturesExBtn/>
            <CarAddress/>
        </div>
    );
};
export default CarClick;