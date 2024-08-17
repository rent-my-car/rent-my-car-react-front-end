import React from 'react';
import BookYourRide from '../components/common/BookYourRide';
import ReviewList from '../components/CarImage.jsx/ReviewList';

const HomePage = () => {
    return (
            <div className="container text-center my-4">
              <BookYourRide />
              <div className="mt-4"> {/* Add margin-top for spacing */}
                <br/>
                <br/>
                <br/>
                <br/> <br/> <br/> 
                <ReviewList />
              </div>
            </div>
    );
};

export default HomePage;