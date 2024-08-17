import React from 'react';
import carImage from '../../assets/images/car-logo.png';

const CarImage = () => {
  return (
    <div className="text-center mb-4">
      <img src={carImage} alt="Car" className="img-fluid" style={{ maxHeight: '300px', objectFit: 'cover' }} />
    </div>
  );
};

export default CarImage;