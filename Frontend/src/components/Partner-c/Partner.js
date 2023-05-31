import React from 'react';
import './Partners.css';


const Partners = () => {
  return (
    <div className="partners-container">
      <h2 className="partners-title">Our Partners</h2>
      <div className="partners-images">
        <img className='image' src="https://www.shutterstock.com/image-vector/fitness-gym-logo-260nw-705978943.jpg" alt="Partner 1" />
        <img className='image' src="https://www.shutterstock.com/image-vector/fitness-logo-gym-vector-260nw-1635156196.jpg" alt="Partner 2" />
        <img className='image' src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/gym-fitness-center-video-logo-social-media-design-template-f9566537b0445b719d2c9ae5b4264d3c_screen.jpg?ts=1589533347" alt="Partner 2" />
        <img className='image' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIJMVbpiHRyaeqm4V0NAVO9C-fCTotOYYKCtVdS9NMGhPjU0xI04I9nH4NXGBE5ypvoxg&usqp=CAU" alt="Partner 2" />
      </div>
    </div>
  );
};

export default Partners;
