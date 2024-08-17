import React from 'react';

const CarFeatures = ({ features }) => {
  return (
    <div className="card mb-4">
      <div className="card-body">
        <h5 className="card-title">Car Features</h5>
        <div className="row">
          {features.map((feature, index) => (
            <div className="col-md-4 mb-2" key={index}>
              <div className="p-2 border bg-light text-center">{feature}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CarFeatures;