import React from 'react';
import image from '../../assets/loader.svg';
const Loading = () => (
  <div>
    <img
      className="loader"
      src={image}
      title="loading"
      alt="loading..."
    ></img>
  </div>
);

export default Loading;
