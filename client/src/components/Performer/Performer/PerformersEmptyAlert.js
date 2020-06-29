import React from 'react';

//error for nothing to show
export const PerformersEmptyAlert = () => {
  const image = require('../../../assets/performers.png');

  return (
    <div className="d-flex justify-content-center align-items-center flex-column w-100 mt-5">
      <h4>No performers to show :\</h4>
      <h6>Add a performer to see table.</h6>
      <img
        className="w-50 mt-3"
        src={image}
        title="no content to show"
        alt="no content"
      />
    </div>
  );
};
