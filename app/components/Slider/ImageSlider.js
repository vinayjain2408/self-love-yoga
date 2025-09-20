import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { casino } from '@/utils/constant';

export default function ImageSlider() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  return (
    <div className="max-w-lg gap-2 mx-auto">
      <Slider {...settings}>
        {casino.map((item, index) => (
          <div key={index} className="flex px-1 justify-center">
            <img
              src={item?.img}
              alt={`Casino ${index + 1}`}
              className="w-full h-auto rounded-lg shadow-lg object-contain "
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}
