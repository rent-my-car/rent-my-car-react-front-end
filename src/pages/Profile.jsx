import React from "react";
import UserProfileForm from "../components/specific/UserProfileForm";
import AddressList from "../components/specific/AddressList";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from "react";

const Profile = () => {
    const [selectedAddress, setSelectedAddress] = useState(null);
    return (
        <>
            <div className="container mt-3 ">
                <div className="row justify-content-center mb-2">
                    <div className="col-md-6"> 
                        <UserProfileForm />
                    </div>
                </div>
                <div className="row justify-content-center mb-2">
                    <div className="col-md-6">
                        <h4>Your Address List :</h4>
                        <AddressList  onAddressSelect ={setSelectedAddress} />
                    </div>
                </div>

            </div>
        </>


    );
};

export default Profile;