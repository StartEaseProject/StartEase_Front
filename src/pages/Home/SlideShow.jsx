import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const SliderSlideshow = ({ strings }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 2000,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 440,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const renderSlides = () => {
    return strings.map((string, index) => (
      <div key={index} className="slide text-thirdColor">
        <img src={string} alt="logo" className='h-14 object-cover' />
      </div>
    ));
  };

  return (
    <div className='ml-[5rem] font-medium'>
      <Slider {...settings} className="mx-40 slider">
      {renderSlides()}
    </Slider>   
    </div>
   
  );
};

export default SliderSlideshow;
