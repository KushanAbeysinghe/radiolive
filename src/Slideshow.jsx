import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const images = [
  process.env.PUBLIC_URL + '/images/image1.png',
  process.env.PUBLIC_URL + '/images/image2.png',
  process.env.PUBLIC_URL + '/images/image3.png',
  process.env.PUBLIC_URL + '/images/image4.png'
];

const Slideshow = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000
  };

  return (
    <div className="slideshow-container" style={{ width: '100%', maxWidth: '800px' }}>
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index}>
            <img src={image} alt={`Slide ${index + 1}`} style={{ width: '100%', height: 'auto', maxHeight: '600px', objectFit: 'cover' }} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Slideshow;
